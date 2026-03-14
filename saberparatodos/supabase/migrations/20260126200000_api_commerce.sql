-- Migration: API & Commerce Schema
-- Description: Adds tables for Organizations, API Keys, and Usage Logging
-- Date: 2026-01-26

-- 1. Organizations (B2B / Institutional Clients)
create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  plan_tier text not null default 'free' check (plan_tier in ('free', 'pro', 'enterprise')),
  billing_email text,
  stripe_customer_id text,
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Link users to organizations (Many-to-Many or One-to-Many depending on model.
-- For now, simple One-to-Many: User belongs to one Org, or Org has many admins)
-- Let's create a membership table for flexibility
create table public.organization_members (
  organization_id uuid references public.organizations(id) on delete cascade,
  user_id uuid references auth.users(id) on delete cascade,
  role text not null default 'member' check (role in ('owner', 'admin', 'member')),
  created_at timestamptz default now(),
  primary key (organization_id, user_id)
);

-- 2. API Keys
create table public.api_keys (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid references public.organizations(id) on delete cascade,
  key_prefix text not null, -- Store first 8 chars for display
  key_hash text not null, -- Store bcrypt/argon2 hash of the actual key
  name text, -- e.g. "Production App", "Test Key"
  tier text not null default 'free' check (tier in ('free', 'pro', 'enterprise')),
  monthly_limit bigint not null default 100,
  current_usage bigint not null default 0,
  is_active boolean default true,
  last_used_at timestamptz,
  created_by uuid references auth.users(id),
  created_at timestamptz default now(),
  expires_at timestamptz
);

-- Index for fast lookup during auth
create index idx_api_keys_hash on public.api_keys(key_hash);
create index idx_api_keys_org on public.api_keys(organization_id);

-- 3. Usage Logs (Aggregated or Raw)
-- Note: High volume logs should ideally go to ClickHouse or Tinybird,
-- but for MVP Supabase is fine with periodic cleanup.
create table public.usage_logs (
  id uuid primary key default gen_random_uuid(),
  api_key_id uuid references public.api_keys(id) on delete set null,
  endpoint text not null,
  status_code int not null,
  ip_address text, -- Anonymized if needed
  user_agent text,
  response_time_ms int,
  created_at timestamptz default now()
);

-- === RLS Policies ===

alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.api_keys enable row level security;
alter table public.usage_logs enable row level security;

-- Org Members can view their own org
create policy "Members can view their own organization"
  on public.organizations for select
  using (
    exists (
      select 1 from public.organization_members
      where organization_id = organizations.id
      and user_id = auth.uid()
    )
  );

-- Only Owners/Admins can update org details
create policy "Admins can update organization"
  on public.organizations for update
  using (
    exists (
      select 1 from public.organization_members
      where organization_id = organizations.id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
    )
  );

-- API Keys visibility
create policy "Members can view org keys"
  on public.api_keys for select
  using (
    exists (
      select 1 from public.organization_members
      where organization_id = api_keys.organization_id
      and user_id = auth.uid()
    )
  );

create policy "Admins can manage keys"
  on public.api_keys for all
  using (
    exists (
      select 1 from public.organization_members
      where organization_id = api_keys.organization_id
      and user_id = auth.uid()
      and role in ('owner', 'admin')
    )
  );

-- Helpers
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language 'plpgsql';

create trigger update_organizations_modtime
    before update on public.organizations
    for each row execute procedure update_updated_at_column();
