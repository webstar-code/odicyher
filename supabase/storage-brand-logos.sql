-- Brand logo uploads (Supabase Storage).
-- Public bucket so audit pages can load logos via URL in audit_reports.content (brandLogoSrc).
--
-- Option A — Dashboard: Storage → bucket id `assets` → enable "Public bucket".
--
-- Option B — SQL (Supabase SQL editor):

insert into storage.buckets (id, name, public)
values ('assets', 'assets', true)
on conflict (id) do update set public = excluded.public;

-- Public read so anonymous visitors can render the logo on /audit/... pages.
drop policy if exists "Public read brand logos" on storage.objects;
create policy "Public read brand logos"
  on storage.objects
  for select
  to public
  using (bucket_id = 'assets');

-- Uploads use SUPABASE_SERVICE_ROLE_KEY from the app (bypasses RLS).
