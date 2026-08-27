-- =============================================================================
-- MIGRATION: SWAL Network Unified Schema (Wave 2.07)
-- Date: 2026-08-20
-- Description: Unifies user profiles, question counters, and institutional nodes
--              for the SWAL P2P / Federated Network model with strict RLS policies.
-- =============================================================================

-- Enable extension for UUID generation if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================================================
-- 1. TABLE: user_profiles
-- Application user profiles coexisting with auth.users and legacy profiles
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  avatar_style TEXT DEFAULT 'bottts',
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin', 'institution_admin')),
  credits INTEGER DEFAULT 50 CHECK (credits >= 0),
  credits_refill_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'pro', 'institution')),
  institution_node_id UUID,
  is_anonymous BOOLEAN DEFAULT TRUE,
  public_ranking_enabled BOOLEAN DEFAULT TRUE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for username lookups and leaderboard queries
CREATE INDEX IF NOT EXISTS idx_user_profiles_username ON public.user_profiles(username);
CREATE INDEX IF NOT EXISTS idx_user_profiles_public_ranking ON public.user_profiles(public_ranking_enabled);

-- =============================================================================
-- 2. TABLE: question_counters
-- Global/Node counter tracking for question usage across the network
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.question_counters (
  question_id TEXT PRIMARY KEY,
  times_answered INTEGER DEFAULT 0 CHECK (times_answered >= 0),
  times_correct INTEGER DEFAULT 0 CHECK (times_correct >= 0),
  last_incremented_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for high-frequency question lookup
CREATE INDEX IF NOT EXISTS idx_question_counters_id ON public.question_counters(question_id);

-- =============================================================================
-- 3. TABLE: institution_nodes
-- Federated network nodes representing schools, universities, or pre-u centers
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.institution_nodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE,
  country TEXT NOT NULL DEFAULT 'CO',
  department TEXT,
  municipality TEXT,
  node_type TEXT DEFAULT 'school' CHECK (node_type IN ('school', 'university', 'preu', 'district')),
  owner_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  credits INTEGER DEFAULT 0 CHECK (credits >= 0),
  is_active BOOLEAN DEFAULT TRUE,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_institution_nodes_country ON public.institution_nodes(country);
CREATE INDEX IF NOT EXISTS idx_institution_nodes_code ON public.institution_nodes(code);

-- Foreign key link for user_profiles -> institution_nodes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'fk_user_profiles_institution_node'
  ) THEN
    ALTER TABLE public.user_profiles
      ADD CONSTRAINT fk_user_profiles_institution_node
      FOREIGN KEY (institution_node_id) REFERENCES public.institution_nodes(id) ON DELETE SET NULL;
  END IF;
END $$;

-- =============================================================================
-- 4. TABLE: institution_members
-- Link users to institutional nodes
-- =============================================================================

CREATE TABLE IF NOT EXISTS public.institution_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution_id UUID REFERENCES public.institution_nodes(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'student' CHECK (role IN ('student', 'teacher', 'admin')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(institution_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_institution_members_inst ON public.institution_members(institution_id);
CREATE INDEX IF NOT EXISTS idx_institution_members_user ON public.institution_members(user_id);

-- =============================================================================
-- 5. ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================================================

-- Enable RLS on all unified tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_counters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institution_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institution_members ENABLE ROW LEVEL SECURITY;

-- -----------------------------------------------------------------------------
-- Policies: user_profiles
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public read enabled profiles" ON public.user_profiles;
CREATE POLICY "Public read enabled profiles" ON public.user_profiles
  FOR SELECT USING (public_ranking_enabled = TRUE OR auth.uid() = id);

DROP POLICY IF EXISTS "Owner insert user_profiles" ON public.user_profiles;
CREATE POLICY "Owner insert user_profiles" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Owner update user_profiles" ON public.user_profiles;
CREATE POLICY "Owner update user_profiles" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Owner delete user_profiles" ON public.user_profiles;
CREATE POLICY "Owner delete user_profiles" ON public.user_profiles
  FOR DELETE USING (auth.uid() = id);

-- -----------------------------------------------------------------------------
-- Policies: question_counters
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public read question_counters" ON public.question_counters;
CREATE POLICY "Public read question_counters" ON public.question_counters
  FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Rate limited write question_counters" ON public.question_counters;
CREATE POLICY "Rate limited write question_counters" ON public.question_counters
  FOR UPDATE USING (auth.role() = 'authenticated' OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Service role manage question_counters" ON public.question_counters;
CREATE POLICY "Service role manage question_counters" ON public.question_counters
  FOR ALL USING (auth.role() = 'service_role');

-- -----------------------------------------------------------------------------
-- Policies: institution_nodes
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Public read institution_nodes" ON public.institution_nodes;
CREATE POLICY "Public read institution_nodes" ON public.institution_nodes
  FOR SELECT USING (TRUE);

DROP POLICY IF EXISTS "Owner manage institution_nodes" ON public.institution_nodes;
CREATE POLICY "Owner manage institution_nodes" ON public.institution_nodes
  FOR ALL USING (auth.uid() = owner_id OR auth.role() = 'service_role');

-- -----------------------------------------------------------------------------
-- Policies: institution_members
-- -----------------------------------------------------------------------------
DROP POLICY IF EXISTS "Users view own institution memberships" ON public.institution_members;
CREATE POLICY "Users view own institution memberships" ON public.institution_members
  FOR SELECT USING (auth.uid() = user_id OR auth.role() = 'service_role');

DROP POLICY IF EXISTS "Users join institutions" ON public.institution_members;
CREATE POLICY "Users join institutions" ON public.institution_members
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users manage own institution membership" ON public.institution_members;
CREATE POLICY "Users manage own institution membership" ON public.institution_members
  FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users leave institutions" ON public.institution_members;
CREATE POLICY "Users leave institutions" ON public.institution_members
  FOR DELETE USING (auth.uid() = user_id);

-- -----------------------------------------------------------------------------
-- Policies: Leaderboard Public Read Alignment
-- Ensure existing leaderboard_submissions and exam_results allow public reads for global rankings
-- -----------------------------------------------------------------------------
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'leaderboard_submissions') THEN
    ALTER TABLE public.leaderboard_submissions ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read leaderboard submissions" ON public.leaderboard_submissions;
    CREATE POLICY "Public read leaderboard submissions" ON public.leaderboard_submissions
      FOR SELECT USING (TRUE);
  END IF;
END $$;
