-- ============================================================================
-- Party Mode Migration - Cloud-First Architecture
-- Fecha: 2025-12-11
-- Propósito: Agregar tabla party_sessions para exámenes sincronizados en tiempo real
-- ============================================================================

-- Crear tabla party_sessions
CREATE TABLE IF NOT EXISTS public.party_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Código único de party (6 caracteres alfanuméricos)
  party_code TEXT UNIQUE NOT NULL,

  -- Host
  host_name TEXT NOT NULL,
  host_device_id TEXT,              -- ID del dispositivo Android (opcional)

  -- Configuración del examen
  exam_config JSONB NOT NULL,       -- {subject, grade, num_questions, difficulty}

  -- Participantes
  students JSONB DEFAULT '[]',      -- [{id, name, joined_at, device_info}]
  max_students INT DEFAULT 50,

  -- Estado de la sesión
  status TEXT DEFAULT 'waiting',    -- waiting, active, paused, finished
  current_question INT DEFAULT 0,

  -- Preguntas del examen
  questions JSONB,                  -- [{id, question_data}]

  -- Resultados
  results JSONB DEFAULT '[]',       -- [{student_id, answers: [{q_id, answer, time_taken}]}]

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  finished_at TIMESTAMPTZ,

  -- TTL: auto-delete after 24 hours
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours'),

  -- Constraints
  CONSTRAINT valid_status CHECK (status IN ('waiting', 'active', 'paused', 'finished')),
  CONSTRAINT valid_party_code CHECK (party_code ~ '^[A-Z0-9]{6}$'),
  CONSTRAINT valid_max_students CHECK (max_students > 0 AND max_students <= 200)
);

-- Índices para party_sessions
CREATE INDEX IF NOT EXISTS idx_party_code ON public.party_sessions(party_code);
CREATE INDEX IF NOT EXISTS idx_party_status ON public.party_sessions(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_party_expires ON public.party_sessions(expires_at);
CREATE INDEX IF NOT EXISTS idx_party_active ON public.party_sessions(status) WHERE status IN ('waiting', 'active');

-- Habilitar RLS
ALTER TABLE public.party_sessions ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Public read active parties"
  ON public.party_sessions FOR SELECT
  TO public
  USING (status != 'finished' AND expires_at > NOW());

CREATE POLICY "Public create parties"
  ON public.party_sessions FOR INSERT
  TO public
  WITH CHECK (TRUE);

CREATE POLICY "Public update parties"
  ON public.party_sessions FOR UPDATE
  TO public
  USING (TRUE)
  WITH CHECK (TRUE);

-- Habilitar Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.party_sessions;

-- Comentarios para documentación
COMMENT ON TABLE public.party_sessions IS 'Sesiones de Party Mode (exámenes sincronizados en tiempo real)';
COMMENT ON COLUMN public.party_sessions.party_code IS 'Código único de 6 caracteres para unirse a la party';
COMMENT ON COLUMN public.party_sessions.exam_config IS 'Configuración del examen: {subject, grade, num_questions, difficulty, time_per_question}';
COMMENT ON COLUMN public.party_sessions.students IS 'Array de estudiantes unidos: [{id, name, joined_at, device_info}]';
COMMENT ON COLUMN public.party_sessions.status IS 'Estado de la sesión: waiting (lobby), active (en curso), paused (pausado), finished (finalizado)';
COMMENT ON COLUMN public.party_sessions.expires_at IS 'TTL: parties inactivas se eliminan automáticamente después de 24 horas';
