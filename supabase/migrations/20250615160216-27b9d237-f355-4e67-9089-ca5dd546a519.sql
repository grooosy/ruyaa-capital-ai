
/* =======================================================================
   USER-CENTRIC SCHEMA (NO DUPLICATES) – paste once, re-running is safe
   ======================================================================= */

/* 0. EXTENSION (if not yet installed) */
create extension if not exists "uuid-ossp";

/*-----------------------------------------------------------------------
  1. PROFILES — already exists. Only add missing cols if they aren’t there
------------------------------------------------------------------------*/
alter table public.profiles
  add column if not exists phone text;

/*-----------------------------------------------------------------------
  2. FEATURES — which agents/features a user has activated
------------------------------------------------------------------------*/
create table if not exists public.user_features (
  user_id uuid references auth.users(id) on delete cascade,
  feature text  check (feature in ('arbitrage','mt4mt5','crypto')),
  activated_at  timestamp with time zone default now(),
  primary key (user_id, feature)
);

/*-----------------------------------------------------------------------
  3. AGENT USAGE LOG — each time a user chats with an agent
------------------------------------------------------------------------*/
create table if not exists public.agent_usage (
  id        bigint generated always as identity primary key,
  user_id   uuid references auth.users(id) on delete cascade,
  agent     text check (agent in ('arbitrage','mt4mt5','crypto','support')),
  msg_role  text check (msg_role in ('user','assistant')),
  content   text,
  ts        timestamp with time zone default now()
);

/*-----------------------------------------------------------------------
  4. DEPOSITS & ARBITRAGE SESSIONS
------------------------------------------------------------------------*/
create table if not exists public.deposits (
  id         uuid default uuid_generate_v4() primary key,
  user_id    uuid references auth.users(id) on delete cascade,
  amount_usd numeric,
  chain      text,
  tx_hash    text,
  status     text default 'pending',  -- pending | confirmed
  created_at timestamp with time zone default now()
);

create table if not exists public.arbitrage_sessions (
  id            uuid default uuid_generate_v4() primary key,
  user_id       uuid references auth.users(id) on delete cascade,
  amount_usd    numeric,
  duration_days int,         -- 7 or 30
  mode          text,        -- auto | manual
  status        text default 'pending', -- pending | active | closed
  created_at    timestamp with time zone default now()
);

/*-----------------------------------------------------------------------
  5. RLS — one “own-rows” policy for every new table
------------------------------------------------------------------------*/
do $$
declare
  tbl text;
begin
  foreach tbl in array
    ARRAY['user_features','agent_usage','deposits','arbitrage_sessions']
  loop
    execute format('alter table public.%I enable row level security;', tbl);
    execute format($pol$
      create policy "own rows" on public.%I
      for all using (auth.uid() = user_id)
      with check (auth.uid() = user_id);
    $pol$, tbl);
  end loop;
end$$;

/*-----------------------------------------------------------------------
  6. TRIGGERS
------------------------------------------------------------------------*/

-- 6.1  Auto-insert an empty profile
create or replace function public.handle_new_user()
returns trigger language plpgsql
security definer
set search_path = public
as $$
begin
  -- Use the existing function to populate full_name and avatar_url
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

-- 6.2  When a deposit is confirmed activate pending arbitrage
create or replace function public.activate_arbitrage()
returns trigger language plpgsql as $$
begin
  if new.status = 'confirmed' then
    update public.arbitrage_sessions
       set status = 'active'
     where user_id = new.user_id
       and status   = 'pending';
  end if;
  return new;
end$$;

drop trigger if exists deposit_confirmed on public.deposits;
create trigger deposit_confirmed
after update on public.deposits
for each row
when (new.status = 'confirmed')
execute procedure public.activate_arbitrage();

/*-----------------------------------------------------------------------
  7. INDEXES FOR SPEED
------------------------------------------------------------------------*/
create index if not exists idx_user_features_user on public.user_features(user_id);
create index if not exists idx_agent_usage_user   on public.agent_usage(user_id);
create index if not exists idx_deposits_user      on public.deposits(user_id);
create index if not exists idx_sessions_user      on public.arbitrage_sessions(user_id);

/* ================================   DONE   ============================ */
