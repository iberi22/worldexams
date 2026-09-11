-- ============================================
-- WorldExams Database Migration: Cuento Progreso
-- Feature: feat-cuentos-lector (BR-03/BR-07 No PII)
-- ============================================

-- Create cuento_progreso table storing anonymous child reading progress
CREATE TABLE IF NOT EXISTS cuento_progreso (
  profile_id UUID NOT NULL,
  profile_nickname TEXT NOT NULL,
  slug TEXT NOT NULL,
  last_page INTEGER DEFAULT 1 NOT NULL,
  finished BOOLEAN DEFAULT false NOT NULL,
  quiz_best INTEGER DEFAULT 0 NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  PRIMARY KEY (profile_id, slug)
);

-- Indices for rapid lookup by profile_id and updated_at
CREATE INDEX IF NOT EXISTS idx_cuento_progreso_profile ON cuento_progreso(profile_id);
CREATE INDEX IF NOT EXISTS idx_cuento_progreso_slug ON cuento_progreso(slug);

-- Enable Row Level Security (RLS)
ALTER TABLE cuento_progreso ENABLE ROW LEVEL SECURITY;

-- 1. SELECT Policy: Anon/authenticated can only read rows matching their explicit x-profile-id header
CREATE POLICY "Anon read own cuento progress"
  ON cuento_progreso
  FOR SELECT
  TO anon, authenticated
  USING (
    profile_id::text = coalesce(
      nullif(current_setting('request.headers', true)::json->>'x-profile-id', ''),
      '00000000-0000-0000-0000-000000000000'
    )
  );

-- 2. INSERT Policy: Anon/authenticated can only insert rows matching their explicit x-profile-id header
CREATE POLICY "Anon insert own cuento progress"
  ON cuento_progreso
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    profile_id::text = coalesce(
      nullif(current_setting('request.headers', true)::json->>'x-profile-id', ''),
      '00000000-0000-0000-0000-000000000000'
    )
  );

-- 3. UPDATE Policy: Anon/authenticated can only update rows matching their explicit x-profile-id header
CREATE POLICY "Anon update own cuento progress"
  ON cuento_progreso
  FOR UPDATE
  TO anon, authenticated
  USING (
    profile_id::text = coalesce(
      nullif(current_setting('request.headers', true)::json->>'x-profile-id', ''),
      '00000000-0000-0000-0000-000000000000'
    )
  )
  WITH CHECK (
    profile_id::text = coalesce(
      nullif(current_setting('request.headers', true)::json->>'x-profile-id', ''),
      '00000000-0000-0000-0000-000000000000'
    )
  );

-- 4. ALL Policy for Service Role: Full management capabilities
CREATE POLICY "Service role full management"
  ON cuento_progreso
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
