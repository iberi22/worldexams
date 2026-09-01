-- ============================================
-- WorldExams Migration: Community Threads (WX-302)
-- Feature: feat-community-explanations 50→65%
-- ============================================

-- Añadir threading a community_explanations (parent_id FK, depth)
ALTER TABLE community_explanations
  ADD COLUMN IF NOT EXISTS parent_id UUID REFERENCES community_explanations(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS depth INTEGER DEFAULT 0 NOT NULL CHECK (depth >= 0 AND depth <= 5);

CREATE INDEX IF NOT EXISTS idx_community_explanations_parent ON community_explanations(parent_id);
CREATE INDEX IF NOT EXISTS idx_community_explanations_thread ON community_explanations(question_id, parent_id, created_at DESC);

-- RLS: hilos heredan mismas políticas (SELECT approved, INSERT check parent exists)
-- No nueva política: las 4 existentes ya cubren parent_id (insert with check is_approved=false aplica igual)
