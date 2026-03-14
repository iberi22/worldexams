create table if not exists public.preu_institutions (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  city text,
  official_url text,
  admissions_url text,
  ranking_year integer,
  ranking_position integer,
  ranking_basis text,
  research_status text not null default 'queued' check (research_status in ('verified', 'in_research', 'queued')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.preu_exam_cycles (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.preu_institutions(id) on delete cascade,
  cycle_label text not null,
  exam_year integer not null,
  registration_window text,
  exam_window text,
  cost_cop numeric(12,2),
  docs_required jsonb not null default '[]'::jsonb,
  status text not null default 'pending' check (status in ('verified', 'pending', 'stale')),
  last_verified_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.preu_exam_components (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.preu_institutions(id) on delete cascade,
  code text not null,
  name text not null,
  description text,
  weight numeric(6,3),
  question_count integer,
  duration_minutes integer,
  component_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (institution_id, code)
);

create table if not exists public.preu_program_overlays (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.preu_institutions(id) on delete cascade,
  slug text not null,
  program_name text not null,
  faculty text,
  priority integer not null default 0,
  overlay_status text not null default 'queued' check (overlay_status in ('verified', 'in_research', 'queued')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (institution_id, slug)
);

create table if not exists public.preu_source_documents (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.preu_institutions(id) on delete cascade,
  exam_cycle_id uuid references public.preu_exam_cycles(id) on delete set null,
  title text not null,
  source_type text not null check (source_type in ('ranking', 'admissions', 'calendar', 'guide', 'news')),
  url text not null,
  published_at timestamptz,
  last_verified_at timestamptz,
  evidence_level text not null default 'official' check (evidence_level in ('official', 'secondary', 'reference')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.preu_blueprints (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.preu_institutions(id) on delete cascade,
  program_overlay_id uuid references public.preu_program_overlays(id) on delete set null,
  exam_cycle_id uuid references public.preu_exam_cycles(id) on delete set null,
  title text not null,
  protocol_version text not null,
  status text not null default 'draft' check (status in ('draft', 'verified', 'published')),
  blueprint jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.preu_catalog_entries (
  id uuid primary key default gen_random_uuid(),
  institution_id uuid not null references public.preu_institutions(id) on delete cascade,
  program_overlay_id uuid references public.preu_program_overlays(id) on delete set null,
  exam_cycle_id uuid references public.preu_exam_cycles(id) on delete set null,
  blueprint_id uuid references public.preu_blueprints(id) on delete set null,
  slug text not null unique,
  display_name text not null,
  entry_type text not null check (entry_type in ('core', 'overlay')),
  catalog_year integer not null,
  position integer,
  publication_status text not null default 'draft' check (publication_status in ('draft', 'published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.preu_institutions enable row level security;
alter table public.preu_exam_cycles enable row level security;
alter table public.preu_exam_components enable row level security;
alter table public.preu_program_overlays enable row level security;
alter table public.preu_source_documents enable row level security;
alter table public.preu_blueprints enable row level security;
alter table public.preu_catalog_entries enable row level security;

create policy "public can read verified preu institutions"
  on public.preu_institutions
  for select
  using (research_status = 'verified');

create policy "public can read active preu cycles"
  on public.preu_exam_cycles
  for select
  using (status = 'verified');

create policy "public can read preu components"
  on public.preu_exam_components
  for select
  using (
    exists (
      select 1
      from public.preu_institutions i
      where i.id = institution_id
        and i.research_status = 'verified'
    )
  );

create policy "public can read verified overlays"
  on public.preu_program_overlays
  for select
  using (overlay_status = 'verified');

create policy "public can read official preu docs"
  on public.preu_source_documents
  for select
  using (evidence_level = 'official');

create policy "public can read published preu blueprints"
  on public.preu_blueprints
  for select
  using (status = 'published');

create policy "public can read published preu catalog"
  on public.preu_catalog_entries
  for select
  using (publication_status = 'published');
