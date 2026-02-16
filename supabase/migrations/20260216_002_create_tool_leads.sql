-- Tool leads: captured from AI tools (budget estimator, vibe translator, timeline, chat)
create table if not exists party.tool_leads (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  first_name text,
  source text not null,
  metadata jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_tool_leads_email on party.tool_leads (email);
create index if not exists idx_tool_leads_source on party.tool_leads (source);

alter table party.tool_leads enable row level security;

create policy "Service role full access" on party.tool_leads
  for all using (auth.role() = 'service_role');

create policy "Anon can insert" on party.tool_leads
  for insert with check (true);
