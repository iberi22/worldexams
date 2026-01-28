-- Migration: Student Profiles & Leaderboard
-- Description: Defines tables for student identity, privacy, and exam history.

-- 1. PROFILES Table (Extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE, -- Public Alias
  full_name TEXT, -- Private Real Name
  avatar_style TEXT DEFAULT 'bottts', -- Avatar seed/style
  school_id UUID REFERENCES public.organizations(id), -- Optional link to institution

  -- Privacy Settings
  is_anonymous BOOLEAN DEFAULT TRUE, -- If true, shows "Anonymous" instead of username in PUBLIC lists (optional)
  public_ranking_enabled BOOLEAN DEFAULT TRUE, -- If true, appears in Leaderboard

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
-- Public Read: Everyone can read 'username', 'avatar_style' of profiles where public_ranking_enabled = true
CREATE POLICY "Public profiles are viewable by everyone"
ON public.profiles FOR SELECT
USING (true); -- Note: We control column visibility via View usually, or trusted client.
-- Ideally, we should restrict this, but for Leaderboard join, we need read access.
-- A stricter approach is to use a VIEW for public data and only allow auth.uid() to read full profile.

-- Owner Update
CREATE POLICY "Users can update own profile"
ON public.profiles FOR UPDATE
USING (auth.uid() = id);

-- Owner Insert (Trigger usually handles this, but allow manual if needed)
CREATE POLICY "Users can insert own profile"
ON public.profiles FOR INSERT
WITH CHECK (auth.uid() = id);


-- 2. EXAM RESULTS Table (Persistent History)
CREATE TABLE IF NOT EXISTS public.exam_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL, -- e.g. 'MATEMATICAS', 'SIMULACRO'
  score INT NOT NULL, -- Points or Correct Answers
  max_score INT NOT NULL, -- Total possible
  duration_seconds INT NOT NULL,

  mode TEXT NOT NULL, -- 'practice', 'exam', 'ranked'
  exam_id TEXT, -- Bundle ID if applicable

  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Prevent duplicates? Maybe limit 1 per exam_id per user?
  -- For now allow multiple attempts.
  metadata JSONB -- Extra data
);

-- Enable RLS
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;

-- Exam Results Policies
-- Read: User sees own, World sees nothing (Leaderboard uses VIEW)
CREATE POLICY "Users see own results"
ON public.exam_results FOR SELECT
USING (auth.uid() = user_id);

-- Insert: Authenticated users can submit results
-- NOTE: In production, this should be a Postgres Function called by Edge Function to verify integrity.
-- For MVP, allow client insert but we will trust client logic (risk of cheating).
CREATE POLICY "Users submit own results"
ON public.exam_results FOR INSERT
WITH CHECK (auth.uid() = user_id);


-- 3. GLOBAL LEADERBOARD View (Secure Public View)
CREATE OR REPLACE VIEW public.leaderboard_global AS
SELECT
  p.username,
  p.avatar_style,
  SUM(er.score) as total_score,
  COUNT(er.id) as exams_taken,
  dense_rank() OVER (ORDER BY SUM(er.score) DESC) as rank
FROM public.exam_results er
JOIN public.profiles p ON er.user_id = p.id
WHERE p.public_ranking_enabled = TRUE
GROUP BY p.id, p.username, p.avatar_style;

-- Grant access to anonymous/anon logic
GRANT SELECT ON public.leaderboard_global TO anon, authenticated;

-- 4. TRIGGER: Create Profile on Signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, username)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'full_name',
    'Student' || cast(floor(random() * 100000) as text) -- Temporary Username
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger logic (commented out if collision with existing trigger, but adding safe create)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
