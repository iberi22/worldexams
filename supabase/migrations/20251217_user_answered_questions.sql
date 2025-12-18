-- ═══════════════════════════════════════════════════════════════════════════════
-- MIGRACIÓN: Tabla para tracking de preguntas contestadas
-- Propósito: Evitar repetición de preguntas para usuarios registrados
-- Fecha: 17 de diciembre de 2025
-- ═══════════════════════════════════════════════════════════════════════════════

-- 1. Crear tabla principal
CREATE TABLE IF NOT EXISTS user_answered_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Usuario que contestó (FK a auth.users)
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- ID de la pregunta (formato: CO-MAT-11-algebra-001-v1)
  question_id TEXT NOT NULL,

  -- Timestamp de cuándo se contestó
  answered_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Metadata de la respuesta
  was_correct BOOLEAN,
  time_taken_seconds INTEGER,

  -- Metadata de la pregunta (para analytics)
  grade INTEGER,
  subject TEXT,
  difficulty INTEGER,

  -- Constraint: Un usuario no puede contestar la misma pregunta 2 veces
  CONSTRAINT unique_user_question UNIQUE(user_id, question_id)
);

COMMENT ON TABLE user_answered_questions IS
  'Tracking de preguntas contestadas por usuarios registrados. Auto-limpieza de 30 días.';

COMMENT ON COLUMN user_answered_questions.question_id IS
  'ID único de la pregunta (ej: CO-MAT-11-algebra-001-v2)';

COMMENT ON COLUMN user_answered_questions.time_taken_seconds IS
  'Tiempo que tardó el usuario en responder (en segundos)';

-- ═══════════════════════════════════════════════════════════════════════════════
-- 2. Índices para performance
-- ═══════════════════════════════════════════════════════════════════════════════

-- Índice para consultas por usuario (query más común)
CREATE INDEX idx_user_answered_questions_user_id
  ON user_answered_questions(user_id);

-- Índice para consultas por pregunta específica
CREATE INDEX idx_user_answered_questions_question_id
  ON user_answered_questions(question_id);

-- Índice para consultas por fecha (para auto-cleanup)
CREATE INDEX idx_user_answered_questions_answered_at
  ON user_answered_questions(answered_at);

-- Índice compuesto para filtrado en Edge Function
CREATE INDEX idx_user_answered_questions_user_recent
  ON user_answered_questions(user_id, answered_at DESC);

-- Índice para analytics por materia
CREATE INDEX idx_user_answered_questions_subject_grade
  ON user_answered_questions(subject, grade);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 3. Row Level Security (RLS) Policies
-- ═══════════════════════════════════════════════════════════════════════════════

ALTER TABLE user_answered_questions ENABLE ROW LEVEL SECURITY;

-- Policy: Usuarios pueden ver solo sus propias preguntas contestadas
CREATE POLICY "Users can view own answered questions"
  ON user_answered_questions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Usuarios pueden insertar solo sus propias respuestas
CREATE POLICY "Users can insert own answered questions"
  ON user_answered_questions
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: No se permite UPDATE (respuestas son inmutables)
-- Si un usuario contesta mal, se considera contestada de todas formas

-- Policy: Usuarios pueden eliminar su historial (GDPR compliance)
CREATE POLICY "Users can delete own answered questions"
  ON user_answered_questions
  FOR DELETE
  USING (auth.uid() = user_id);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 4. Función de Auto-Cleanup (Borrar registros mayores a 30 días)
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION cleanup_old_answered_questions()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM user_answered_questions
  WHERE answered_at < NOW() - INTERVAL '30 days';

  GET DIAGNOSTICS deleted_count = ROW_COUNT;

  RAISE NOTICE 'Deleted % old answered question records', deleted_count;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION cleanup_old_answered_questions IS
  'Borra registros de preguntas contestadas mayores a 30 días. Ejecutar diariamente via cron.';

-- ═══════════════════════════════════════════════════════════════════════════════
-- 5. Configurar Cron Job (Supabase pg_cron)
-- ═══════════════════════════════════════════════════════════════════════════════

-- Ejecutar limpieza todos los días a las 3 AM
SELECT cron.schedule(
  'cleanup-answered-questions', -- Nombre del job
  '0 3 * * *',                  -- Cron expression (diario 3 AM)
  'SELECT cleanup_old_answered_questions()'
);

-- ═══════════════════════════════════════════════════════════════════════════════
-- 6. Función Helper: Obtener preguntas NO contestadas
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE FUNCTION get_unanswered_question_ids(
  p_user_id UUID,
  p_days_back INTEGER DEFAULT 30
)
RETURNS TABLE(question_id TEXT) AS $$
BEGIN
  RETURN QUERY
  SELECT uaq.question_id
  FROM user_answered_questions uaq
  WHERE uaq.user_id = p_user_id
    AND uaq.answered_at > NOW() - (p_days_back || ' days')::INTERVAL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

COMMENT ON FUNCTION get_unanswered_question_ids IS
  'Retorna lista de IDs de preguntas que el usuario YA contestó en los últimos N días';

-- ═══════════════════════════════════════════════════════════════════════════════
-- 7. Vista para Analytics (opcional)
-- ═══════════════════════════════════════════════════════════════════════════════

CREATE OR REPLACE VIEW user_question_stats AS
SELECT
  user_id,
  COUNT(*) AS total_answered,
  COUNT(*) FILTER (WHERE was_correct = true) AS correct_count,
  COUNT(*) FILTER (WHERE was_correct = false) AS incorrect_count,
  ROUND(AVG(time_taken_seconds)::NUMERIC, 2) AS avg_time_seconds,
  subject,
  grade,
  difficulty,
  DATE_TRUNC('day', answered_at) AS date
FROM user_answered_questions
GROUP BY user_id, subject, grade, difficulty, DATE_TRUNC('day', answered_at);

COMMENT ON VIEW user_question_stats IS
  'Estadísticas agregadas de preguntas contestadas por usuario, materia, grado y dificultad';

-- ═══════════════════════════════════════════════════════════════════════════════
-- 8. Trigger para auto-actualizar stats (opcional - para gamificación)
-- ═══════════════════════════════════════════════════════════════════════════════

-- Crear tabla de stats si no existe
CREATE TABLE IF NOT EXISTS user_stats (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  total_questions_answered INTEGER DEFAULT 0,
  total_correct INTEGER DEFAULT 0,
  current_streak INTEGER DEFAULT 0,
  longest_streak INTEGER DEFAULT 0,
  last_answer_date DATE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Función para actualizar stats
CREATE OR REPLACE FUNCTION update_user_stats()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_stats (user_id, total_questions_answered, total_correct, last_answer_date)
  VALUES (
    NEW.user_id,
    1,
    CASE WHEN NEW.was_correct THEN 1 ELSE 0 END,
    CURRENT_DATE
  )
  ON CONFLICT (user_id) DO UPDATE SET
    total_questions_answered = user_stats.total_questions_answered + 1,
    total_correct = user_stats.total_correct + CASE WHEN NEW.was_correct THEN 1 ELSE 0 END,
    last_answer_date = CURRENT_DATE,
    updated_at = NOW();

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger que ejecuta después de cada INSERT
CREATE TRIGGER trigger_update_user_stats
  AFTER INSERT ON user_answered_questions
  FOR EACH ROW
  EXECUTE FUNCTION update_user_stats();

-- ═══════════════════════════════════════════════════════════════════════════════
-- 9. Grants de permisos
-- ═══════════════════════════════════════════════════════════════════════════════

-- Permitir a usuarios autenticados usar la tabla
GRANT SELECT, INSERT, DELETE ON user_answered_questions TO authenticated;
GRANT SELECT ON user_question_stats TO authenticated;
GRANT SELECT ON user_stats TO authenticated;

-- ═══════════════════════════════════════════════════════════════════════════════
-- 10. Datos de prueba (comentar en producción)
-- ═══════════════════════════════════════════════════════════════════════════════

/*
-- Insertar datos de prueba para un usuario
INSERT INTO user_answered_questions (user_id, question_id, was_correct, time_taken_seconds, grade, subject, difficulty)
VALUES
  ('00000000-0000-0000-0000-000000000001', 'CO-MAT-11-algebra-001-v1', true, 45, 11, 'matematicas', 3),
  ('00000000-0000-0000-0000-000000000001', 'CO-MAT-11-algebra-002-v1', false, 60, 11, 'matematicas', 4),
  ('00000000-0000-0000-0000-000000000001', 'CO-CIE-11-biologia-001-v1', true, 30, 11, 'ciencias_naturales', 2);
*/

-- ═══════════════════════════════════════════════════════════════════════════════
-- FIN DE LA MIGRACIÓN
-- ═══════════════════════════════════════════════════════════════════════════════

-- Verificar que todo se creó correctamente
DO $$
BEGIN
  RAISE NOTICE '✅ Migración completada exitosamente';
  RAISE NOTICE '📊 Tabla: user_answered_questions creada';
  RAISE NOTICE '🔒 RLS policies configuradas';
  RAISE NOTICE '📈 Índices creados para performance';
  RAISE NOTICE '🤖 Cron job configurado (cleanup diario)';
  RAISE NOTICE '📊 Vistas y triggers creados';
END $$;
