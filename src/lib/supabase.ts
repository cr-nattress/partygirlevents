import { createBrowserClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";

const DB_SCHEMA = "party";

export function createBrowserSupabaseClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { db: { schema: DB_SCHEMA } },
  );
}

export function createServerSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY ??
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { db: { schema: DB_SCHEMA } },
  );
}
