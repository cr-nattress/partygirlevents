-- Inquiries table in the party schema
-- If this table already exists in the public schema, migrate it with:
--   ALTER TABLE public.inquiries SET SCHEMA party;
-- Otherwise, create it fresh:

create table if not exists party.inquiries (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  wedding_type text not null,
  guest_count text,
  preferred_date text,
  venue_status text,
  planning_status text,
  event_description text,
  locations text[] not null,
  budget_range text not null,
  notes text,
  referral_source text,
  status text not null default 'new',
  ai_insight jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_inquiries_email on party.inquiries (email);
create index if not exists idx_inquiries_status on party.inquiries (status);

alter table party.inquiries enable row level security;

create policy "Service role full access" on party.inquiries
  for all using (auth.role() = 'service_role');

create policy "Anon can insert" on party.inquiries
  for insert with check (true);
