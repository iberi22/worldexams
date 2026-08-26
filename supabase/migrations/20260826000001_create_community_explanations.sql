-- Migration: WX-203 Backend social capa 2 - community_explanations + votos firmados
-- Decision D3: capa 2 explicaciones comunitarias (capa 1 = Giscus discusión, capa 3 = hilos por explicación WX-302)
-- BR-03: sin karma/tokens, reputación local pura via votos firmados (node_hash + ML-DSA-65 placeholder)
-- Date: 2026-08-26

-- =============================================================================
-- TABLA: community_explanations
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.community_explanations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id TEXT NOT NULL,
  node_hash TEXT NOT NULL,
  content TEXT NOT NULL CHECK (char_length(content) > 0 AND char_length(content) <= 5000),
  vote_count INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'flagged')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índices para queries frecuentes
CREATE INDEX IF NOT EXISTS idx_community_explanations_question_id ON public.community_explanations(question_id);
CREATE INDEX IF NOT EXISTS idx_community_explanations_node_hash ON public.community_explanations(node_hash);
CREATE INDEX IF NOT EXISTS idx_community_explanations_status ON public.community_explanations(status);
CREATE INDEX IF NOT EXISTS idx_community_explanations_vote_count ON public.community_explanations(vote_count DESC);
CREATE INDEX IF NOT EXISTS idx_community_explanations_question_status_votes ON public.community_explanations(question_id, status, vote_count DESC);
CREATE INDEX IF NOT EXISTS idx_community_explanations_created_at ON public.community_explanations(created_at DESC);

COMMENT ON TABLE public.community_explanations IS 'WX-203 Capa 2: explicaciones comunitarias por pregunta (D3). BR-03 sin tokens.';
COMMENT ON COLUMN public.community_explanations.question_id IS 'ID de pregunta origen (bundle weekly, ej CO-MAT-6-...-v1)';
COMMENT ON COLUMN public.community_explanations.node_hash IS 'Hash del nodo emisor (identificador SWAL edge-mesh, sin wallet)';
COMMENT ON COLUMN public.community_explanations.vote_count IS 'Suma de votos (+1/-1) denormalizada, actualizada por trigger';
COMMENT ON COLUMN public.community_explanations.status IS 'draft=pendiente moderación, published=visible público, flagged=reportada';

-- =============================================================================
-- TABLA: community_votes
-- =============================================================================
CREATE TABLE IF NOT EXISTS public.community_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  explanation_id UUID NOT NULL REFERENCES public.community_explanations(id) ON DELETE CASCADE,
  voter_node_hash TEXT NOT NULL,
  signature TEXT NOT NULL CHECK (char_length(signature) > 0),
  vote INTEGER NOT NULL CHECK (vote IN (-1, 1)),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (explanation_id, voter_node_hash)
);

CREATE INDEX IF NOT EXISTS idx_community_votes_explanation ON public.community_votes(explanation_id);
CREATE INDEX IF NOT EXISTS idx_community_votes_voter ON public.community_votes(voter_node_hash);
CREATE INDEX IF NOT EXISTS idx_community_votes_created_at ON public.community_votes(created_at DESC);

COMMENT ON TABLE public.community_votes IS 'Votos firmados sobre explicaciones (ML-DSA-65 placeholder text). Único por voter+explanation.';
COMMENT ON COLUMN public.community_votes.signature IS 'Firma ML-DSA-65 (placeholder text por ahora, valida no vacío)';
COMMENT ON COLUMN public.community_votes.vote IS 'Voto reputación pura: +1 o -1 (BR-03 sin karma)';

-- =============================================================================
-- TRIGGERS: mantener vote_count sincronizado
-- =============================================================================
CREATE OR REPLACE FUNCTION public.update_explanation_vote_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.community_explanations
    SET vote_count = vote_count + NEW.vote
    WHERE id = NEW.explanation_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.community_explanations
    SET vote_count = vote_count - OLD.vote
    WHERE id = OLD.explanation_id;
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    -- Si cambia el valor del voto, ajustar delta
    IF OLD.vote IS DISTINCT FROM NEW.vote OR OLD.explanation_id IS DISTINCT FROM NEW.explanation_id THEN
      UPDATE public.community_explanations
      SET vote_count = vote_count - OLD.vote
      WHERE id = OLD.explanation_id;
      UPDATE public.community_explanations
      SET vote_count = vote_count + NEW.vote
      WHERE id = NEW.explanation_id;
    END IF;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public, pg_catalog;

DROP TRIGGER IF EXISTS trg_community_votes_vote_count ON public.community_votes;
CREATE TRIGGER trg_community_votes_vote_count
  AFTER INSERT OR DELETE OR UPDATE OF vote, explanation_id ON public.community_votes
  FOR EACH ROW EXECUTE FUNCTION public.update_explanation_vote_count();

-- =============================================================================
-- ROW LEVEL SECURITY
-- =============================================================================
ALTER TABLE public.community_explanations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.community_votes ENABLE ROW LEVEL SECURITY;

-- community_explanations policies
DROP POLICY IF EXISTS "Public read published explanations" ON public.community_explanations;
CREATE POLICY "Public read published explanations"
  ON public.community_explanations FOR SELECT
  TO public
  USING (status = 'published');

DROP POLICY IF EXISTS "Service role full access explanations" ON public.community_explanations;
CREATE POLICY "Service role full access explanations"
  ON public.community_explanations FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Anonymous/authenticated pueden leer published y crear con node_hash; RLS de update/delete propia se refuerza en capa API
-- Permitimos insert para anon/public con check básico (node_hash no vacío) — la validación fina es en API
DROP POLICY IF EXISTS "Public insert explanations" ON public.community_explanations;
CREATE POLICY "Public insert explanations"
  ON public.community_explanations FOR INSERT
  TO public
  WITH CHECK (char_length(node_hash) > 0 AND char_length(content) > 0);

DROP POLICY IF EXISTS "Public update own explanations" ON public.community_explanations;
CREATE POLICY "Public update own explanations"
  ON public.community_explanations FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public delete own explanations" ON public.community_explanations;
CREATE POLICY "Public delete own explanations"
  ON public.community_explanations FOR DELETE
  TO public
  USING (true);

-- community_votes policies
DROP POLICY IF EXISTS "Public read votes" ON public.community_votes;
CREATE POLICY "Public read votes"
  ON public.community_votes FOR SELECT
  TO public
  USING (true);

DROP POLICY IF EXISTS "Service role full access votes" ON public.community_votes;
CREATE POLICY "Service role full access votes"
  ON public.community_votes FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Public insert votes" ON public.community_votes;
CREATE POLICY "Public insert votes"
  ON public.community_votes FOR INSERT
  TO public
  WITH CHECK (char_length(voter_node_hash) > 0 AND char_length(signature) > 0 AND vote IN (-1, 1));

DROP POLICY IF EXISTS "Public delete own votes" ON public.community_votes;
CREATE POLICY "Public delete own votes"
  ON public.community_votes FOR DELETE
  TO public
  USING (true);

-- Realtime opcional (no requerido para capa 2, pero útil para WX-302 hilos)
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.community_explanations;
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.community_votes;
