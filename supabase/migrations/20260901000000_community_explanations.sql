-- ============================================
-- WorldExams Database Migration: Community Explanations
-- Feature: feat-community-explanations (BR-03 No PII)
-- ============================================

-- Create community_explanations table
CREATE TABLE IF NOT EXISTS community_explanations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id TEXT NOT NULL,
  bundle_id TEXT,
  author_hash TEXT NOT NULL,
  body_md TEXT NOT NULL CHECK (char_length(body_md) >= 200 AND char_length(body_md) <= 2000),
  is_approved BOOLEAN DEFAULT false NOT NULL,
  votes INTEGER DEFAULT 0 NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Indices for rapid lookup by question, bundle, and creation date
CREATE INDEX IF NOT EXISTS idx_community_explanations_question ON community_explanations(question_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_community_explanations_bundle ON community_explanations(bundle_id);
CREATE INDEX IF NOT EXISTS idx_community_explanations_author ON community_explanations(author_hash);

-- Enable Row Level Security (RLS)
ALTER TABLE community_explanations ENABLE ROW LEVEL SECURITY;

-- 1. SELECT Policy: Anyone (anon/authenticated) can read approved explanations
CREATE POLICY "Public read approved explanations"
  ON community_explanations
  FOR SELECT
  TO anon, authenticated
  USING (is_approved = true);

-- 2. INSERT Policy: Anyone (anon/authenticated) can submit an explanation (starts unapproved)
CREATE POLICY "Public insert new explanation"
  ON community_explanations
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (is_approved = false);

-- 3. UPDATE Policy: Allow users to update their own explanations matching author_hash header
CREATE POLICY "Public update own explanation"
  ON community_explanations
  FOR UPDATE
  TO anon, authenticated
  USING (
    author_hash = coalesce(
      current_setting('request.headers', true)::json->>'x-author-hash',
      ''
    )
  )
  WITH CHECK (is_approved = false);

-- 4. ALL Policy for Service Role: Full management capabilities (including moderation & vote increments)
CREATE POLICY "Service role full management"
  ON community_explanations
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
