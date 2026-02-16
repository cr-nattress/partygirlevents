-- Create the party schema for all Party Girl Events database objects
create schema if not exists party;

-- Grant usage to Supabase roles so RLS and API access work
grant usage on schema party to anon, authenticated, service_role;
grant all on all tables in schema party to anon, authenticated, service_role;
alter default privileges in schema party grant all on tables to anon, authenticated, service_role;

-- NOTE: You must also expose the party schema through the PostgREST API.
-- In Supabase Dashboard: API Settings > Exposed schemas > add "party"
-- Or in config.toml: [api] schemas = ["public", "party"]
