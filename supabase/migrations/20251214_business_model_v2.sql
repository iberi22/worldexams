-- =============================================================================
-- MIGRATION: Business Model v2 - AI Credits & Adaptive Learning
-- Date: 2025-12-14
-- Description: Updates schema for weekly credit regeneration, user preferences,
--              and training sessions with generative content.
-- =============================================================================

-- =============================================================================
-- ENUM TYPES
-- =============================================================================

CREATE TYPE user_role AS ENUM ('student', 'teacher', 'admin');
CREATE TYPE institution_plan AS ENUM ('free', 'basic', 'premium');
CREATE TYPE transaction_type AS ENUM ('purchase', 'usage', 'refund', 'bonus', 'weekly_refill');
CREATE TYPE subscription_tier AS ENUM ('free', 'pro');
CREATE TYPE content_type AS ENUM ('infographic', 'explanation', 'quiz');

-- =============================================================================
-- TABLE: profiles
-- Extends auth.users with application-specific data
-- =============================================================================

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Identity
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'student',

  -- Economy (AI Credits)
  credits INTEGER DEFAULT 50 CHECK (credits >= 0),
  credits_refill_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '7 days'),
  subscription_tier subscription_tier DEFAULT 'free',

  -- Adaptive Learning
  learning_preferences JSONB DEFAULT '{}',
  /*
     Example: { "visual_style": "anime", "difficulty_preference": "adaptive" }
  */

  -- Legal
  accepted_terms_at TIMESTAMPTZ,

  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =============================================================================
-- TABLE: institutions
-- Schools, Universities, etc.
-- =============================================================================

CREATE TABLE public.institutions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL, -- for URLs

  -- Subscription
  plan_type institution_plan DEFAULT 'free',
  credits INTEGER DEFAULT 0 CHECK (credits >= 0),

  -- Ownership
  owner_id UUID REFERENCES public.profiles(id),

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABLE: institution_members
-- Link users to institutions
-- =============================================================================

CREATE TABLE public.institution_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  institution_id UUID REFERENCES public.institutions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

  role user_role DEFAULT 'student',

  joined_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(institution_id, user_id)
);

-- =============================================================================
-- TABLE: training_sessions
-- Adaptive learning sessions ("Salas de Entrenamiento")
-- =============================================================================

CREATE TABLE public.training_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,

  -- Context
  subject TEXT NOT NULL, -- e.g., 'math'
  topic TEXT,            -- e.g., 'algebra'

  -- Algorithm State
  current_difficulty INTEGER DEFAULT 1,
  questions_answered INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,

  status TEXT DEFAULT 'active', -- active, completed

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABLE: generated_content
-- Content created by AI (Infographics, Explanations)
-- =============================================================================

CREATE TABLE public.generated_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Context
  training_session_id UUID REFERENCES public.training_sessions(id),
  user_id UUID REFERENCES public.profiles(id),

  -- Content
  type content_type NOT NULL,
  prompt_used TEXT,
  content_payload JSONB NOT NULL, -- URL of image or text content

  -- Economics
  cost INTEGER NOT NULL DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- TABLE: transactions
-- Ledger for credit history
-- =============================================================================

CREATE TABLE public.transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Who
  user_id UUID REFERENCES public.profiles(id),
  institution_id UUID REFERENCES public.institutions(id),

  -- What
  amount INTEGER NOT NULL, -- Positive for purchase/refill, negative for usage
  type transaction_type NOT NULL,
  description TEXT,
  reference_id TEXT, -- Payment gateway ID or Content ID

  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Constraint: Must belong to user OR institution
  CONSTRAINT chk_owner CHECK (
    (user_id IS NOT NULL AND institution_id IS NULL) OR
    (user_id IS NULL AND institution_id IS NOT NULL)
  )
);

-- =============================================================================
-- RLS POLICIES
-- =============================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institutions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.institution_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.training_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.generated_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- Profiles
CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Institutions
CREATE POLICY "Public view institutions" ON public.institutions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Owner manage institution" ON public.institutions
  FOR ALL USING (auth.uid() = owner_id);

-- Training Sessions
CREATE POLICY "Users manage own sessions" ON public.training_sessions
  FOR ALL USING (user_id = auth.uid());

-- Generated Content
CREATE POLICY "Users view own content" ON public.generated_content
  FOR SELECT USING (user_id = auth.uid());

-- Transactions
CREATE POLICY "Users view own transactions" ON public.transactions
  FOR SELECT USING (user_id = auth.uid());
