-- Schema for the `audit_reports` table backing the audit summary page.
-- Run this inside your Supabase project's SQL editor.

create table if not exists public.audit_reports (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  status text not null check (status in ('draft', 'published')),
  content jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists audit_reports_slug_idx
  on public.audit_reports (slug);

create index if not exists audit_reports_status_idx
  on public.audit_reports (status);

-- Simple RLS setup: allow read access to published reports for anon users,
-- and leave write access to service roles / dashboard.
alter table public.audit_reports enable row level security;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'audit_reports'
      and policyname = 'Allow read access to published reports'
  ) then
    create policy "Allow read access to published reports"
      on public.audit_reports
      for select
      using (status = 'published');
  end if;
end $$;

