-- ============================================================================
-- Supabase Migration: Leaderboard Submissions Tracking
--
-- Esta tabla se usa para:
-- 1. Rate limiting (máximo 10 submissions por hora por usuario)
-- 2. Logging de submissions para debugging
-- 3. Análisis de uso del sistema
-- ============================================================================

-- Tabla de submissions al leaderboard
CREATE TABLE IF NOT EXISTS leaderboard_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Identificación del usuario (anónimo)
  anonymous_id TEXT NOT NULL,
  display_name TEXT NOT NULL,

  -- Datos del examen
  grade INT NOT NULL CHECK (grade >= 1 AND grade <= 12),
  region TEXT NOT NULL,
  total_points INT NOT NULL DEFAULT 0,
  questions_answered INT NOT NULL DEFAULT 0,
  correct_answers INT NOT NULL DEFAULT 0,

  -- Estado
  success BOOLEAN NOT NULL DEFAULT false,

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Índice para rate limiting (búsquedas por usuario + tiempo)
CREATE INDEX IF NOT EXISTS idx_leaderboard_submissions_rate_limit
  ON leaderboard_submissions (anonymous_id, created_at DESC);

-- Índice para análisis por región
CREATE INDEX IF NOT EXISTS idx_leaderboard_submissions_region
  ON leaderboard_submissions (region, created_at DESC);

-- Índice para análisis por grado
CREATE INDEX IF NOT EXISTS idx_leaderboard_submissions_grade
  ON leaderboard_submissions (grade, created_at DESC);

-- RLS: Solo service role puede escribir
ALTER TABLE leaderboard_submissions ENABLE ROW LEVEL SECURITY;

-- Policy: Edge Functions con service role pueden insertar
CREATE POLICY "Service role can insert submissions"
  ON leaderboard_submissions
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- Policy: Service role puede leer para rate limiting
CREATE POLICY "Service role can read submissions"
  ON leaderboard_submissions
  FOR SELECT
  TO service_role
  USING (true);

-- Función para limpiar submissions antiguas (retención 30 días)
CREATE OR REPLACE FUNCTION cleanup_old_submissions()
RETURNS void AS $$
BEGIN
  DELETE FROM leaderboard_submissions
  WHERE created_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Comentarios para documentación
COMMENT ON TABLE leaderboard_submissions IS
  'Registro de submissions al leaderboard para rate limiting y análisis';

COMMENT ON COLUMN leaderboard_submissions.anonymous_id IS
  'ID anónimo generado del usuario (hash de nombre+ciudad+colegio+grado)';

COMMENT ON COLUMN leaderboard_submissions.success IS
  'Si la submission fue procesada exitosamente por el GitHub Action';
