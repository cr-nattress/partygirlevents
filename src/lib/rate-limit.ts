// Rate limiting utility — to be implemented with Upstash Redis
// Used for: AI chat (20/session), form submissions (5/IP/hour), AI tools (5/IP/day)

export async function checkRateLimit(
  _identifier: string,
  limit: number,
  _window: number // eslint-disable-line @typescript-eslint/no-unused-vars
): Promise<{ allowed: boolean; remaining: number }> {
  // TODO: Implement with Upstash Redis
  return { allowed: true, remaining: limit };
}
