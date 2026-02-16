// In-memory rate limiting — effective for Node.js runtime.
// On edge runtime, each isolate has its own store, so limits are per-isolate.
// Replace with Upstash Redis for production-grade distributed rate limiting.

const store = new Map<string, { count: number; resetAt: number }>();

// Periodically clean expired entries to prevent memory leaks
const CLEANUP_INTERVAL = 60_000;
let lastCleanup = Date.now();

function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < CLEANUP_INTERVAL) return;
  lastCleanup = now;
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

export async function checkRateLimit(
  identifier: string,
  limit: number,
  windowMs: number,
): Promise<{ allowed: boolean; remaining: number }> {
  cleanup();
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now > entry.resetAt) {
    store.set(identifier, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
}
