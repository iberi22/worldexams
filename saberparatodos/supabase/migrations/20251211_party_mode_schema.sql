-- Party Mode Schema

-- 1. Parties Table
create table if not exists public.parties (
  id uuid default gen_random_uuid() primary key,
  pin text not null,
  host_id uuid references auth.users(id) not null,
  status text not null default 'waiting', -- waiting, playing, finished
  config jsonb default '{}'::jsonb,
  total_questions integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  ended_at timestamp with time zone
);

-- 2. Party Players Table (History/Results)
create table if not exists public.party_players (
  id uuid default gen_random_uuid() primary key,
  party_id uuid references public.parties(id) on delete cascade not null,
  player_id text not null, -- client_id or user_id
  nickname text not null,
  score integer default 0,
  rank integer,
  correct_answers integer default 0,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable RLS
alter table public.parties enable row level security;
alter table public.party_players enable row level security;

-- 4. Policies

-- Parties: Hosts can do everything with their own parties
create policy "Hosts can all on own parties"
  on public.parties for all
  using (auth.uid() = host_id);

-- Party Players: Hosts can manage players in their parties
create policy "Hosts can all on own party players"
  on public.party_players for all
  using (
    exists (
      select 1 from public.parties
      where id = party_players.party_id
      and host_id = auth.uid()
    )
  );

-- Indexes
create index parties_host_id_idx on public.parties(host_id);
create index party_players_party_id_idx on public.party_players(party_id);
