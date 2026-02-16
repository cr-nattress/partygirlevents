export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY,
  posthogHost:
    process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
  openaiApiKey: process.env.OPENAI_API_KEY,
  resendApiKey: process.env.RESEND_API_KEY,
  revalidationSecret: process.env.REVALIDATION_SECRET,
} as const;
