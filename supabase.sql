-- Schemat dla aplikacji WP Panel
create table if not exists public.sites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  url text not null,
  wp_user text not null,
  app_password_enc text not null,
  created_at timestamptz not null default now()
);

alter table public.sites enable row level security;

-- Użytkownik widzi/zarządza tylko swoimi rekordami
create policy if not exists "select own sites" on public.sites
  for select using (auth.uid() = user_id);

create policy if not exists "insert own sites" on public.sites
  for insert with check (auth.uid() = user_id);

create policy if not exists "update own sites" on public.sites
  for update using (auth.uid() = user_id);

create policy if not exists "delete own sites" on public.sites
  for delete using (auth.uid() = user_id);
