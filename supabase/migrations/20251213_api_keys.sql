-- Create api_keys table
create table if not exists api_keys (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references auth.users(id),
  key_hash text not null,
  name text,
  quota_limit int default 1000,
  quota_used int default 0,
  status text default 'active' check (status in ('active', 'revoked', 'suspended')),
  created_at timestamptz default now(),
  last_used_at timestamptz
);

-- Enable RLS
alter table api_keys enable row level security;

-- Policies
create policy "Users can view their own api keys"
  on api_keys for select
  using (auth.uid() = owner_id);

-- Index for faster lookups (though we usually lookup by hash)
create index if not exists idx_api_keys_key_hash on api_keys(key_hash);
