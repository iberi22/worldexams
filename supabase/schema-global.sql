-- =============================================================================
-- World Exams - Schema Global Unificado
-- =============================================================================
-- Este schema es compartido por todos los países de la organización.
-- Cualquier modificación debe coordinarse globalmente.
-- =============================================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- Para búsqueda de texto

-- =============================================================================
-- ENUM TYPES
-- =============================================================================

CREATE TYPE country_code AS ENUM ('CO', 'MX', 'AR', 'CL', 'PE', 'EC', 'BR', 'US');
CREATE TYPE language_code AS ENUM ('es-CO', 'es-MX', 'es-AR', 'es-CL', 'es-PE', 'es-EC', 'pt-BR', 'en-US');
CREATE TYPE question_status AS ENUM ('draft', 'published', 'archived', 'pending_review');
CREATE TYPE sync_status AS ENUM ('pending', 'syncing', 'synced', 'error', 'skipped');
CREATE TYPE event_status AS ENUM ('pending', 'processing', 'completed', 'failed');
CREATE TYPE translator_type AS ENUM ('gemini-2.0', 'gpt-4', 'gpt-4o', 'human', 'deepl');

-- =============================================================================
-- TABLA: country_config
-- Configuración de cada país (datos estáticos, cacheables)
-- =============================================================================

CREATE TABLE public.country_config (
  country_code country_code PRIMARY KEY,
  country_name TEXT NOT NULL,
  country_name_english TEXT NOT NULL,
  flag TEXT NOT NULL,

  -- Info del examen
  exam_name TEXT NOT NULL,
  exam_full_name TEXT NOT NULL,
  exam_authority TEXT NOT NULL,

  -- Localización
  locale language_code NOT NULL,
  timezone TEXT NOT NULL,

  -- Estructura educativa (JSON para flexibilidad)
  grades JSONB NOT NULL DEFAULT '[]',
  subjects JSONB NOT NULL DEFAULT '[]',

  -- Tema visual
  theme JSONB NOT NULL DEFAULT '{}',

  -- Contexto cultural
  culture JSONB NOT NULL DEFAULT '{}',

  -- URLs y repositorio
  domain TEXT,
  github_repo TEXT NOT NULL,

  -- Estado
  active BOOLEAN DEFAULT TRUE,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsqueda rápida de países activos
CREATE INDEX idx_country_config_active ON public.country_config(active) WHERE active = TRUE;

-- =============================================================================
-- TABLA: questions_global
-- Fuente de verdad para todas las preguntas (originales)
-- =============================================================================

CREATE TABLE public.questions_global (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Origen
  source_repo TEXT NOT NULL,           -- 'saber-co', 'saber-mx', etc.
  source_country country_code NOT NULL,
  source_lang language_code NOT NULL,
  original_id TEXT NOT NULL,           -- ID en el repo origen (CO-MAT-05-fracciones-001)

  -- Contenido original (estructura completa en JSONB)
  content_original JSONB NOT NULL,
  /*
    Estructura esperada de content_original:
    {
      "question": "Texto del enunciado...",
      "options": [
        {"letter": "A", "text": "Opción A", "isCorrect": false},
        {"letter": "B", "text": "Opción B", "isCorrect": false},
        {"letter": "C", "text": "Opción C", "isCorrect": true},
        {"letter": "D", "text": "Opción D", "isCorrect": false}
      ],
      "explanation": "Explicación pedagógica...",
      "metadata": {
        "creador": "AI-WorldExams",
        "llm_model": "gemini-2.0-flash"
      }
    }
  */

  -- Clasificación
  subject_global_id TEXT NOT NULL,     -- 'math', 'language', 'science', etc.
  subject_local_name TEXT NOT NULL,    -- Nombre en idioma origen
  grade INTEGER NOT NULL,
  topic TEXT NOT NULL,
  difficulty INTEGER NOT NULL CHECK (difficulty BETWEEN 1 AND 5),

  -- Estado
  status question_status DEFAULT 'draft',
  sync_status sync_status DEFAULT 'pending',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  synced_at TIMESTAMPTZ,

  -- Constraint único para evitar duplicados
  UNIQUE(source_repo, original_id)
);

-- Índices para búsqueda eficiente
CREATE INDEX idx_questions_source ON public.questions_global(source_country, source_lang);
CREATE INDEX idx_questions_subject ON public.questions_global(subject_global_id, grade);
CREATE INDEX idx_questions_status ON public.questions_global(status, sync_status);
CREATE INDEX idx_questions_topic ON public.questions_global(topic);
CREATE INDEX idx_questions_created ON public.questions_global(created_at DESC);

-- Índice GIN para búsqueda en contenido JSON
CREATE INDEX idx_questions_content ON public.questions_global USING GIN (content_original);

-- =============================================================================
-- TABLA: question_translations
-- Traducciones de preguntas a otros idiomas
-- =============================================================================

CREATE TABLE public.question_translations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID NOT NULL REFERENCES public.questions_global(id) ON DELETE CASCADE,

  -- Destino
  target_lang language_code NOT NULL,
  target_country country_code NOT NULL,

  -- Contenido traducido (misma estructura que content_original)
  content_translated JSONB NOT NULL,

  -- Metadata de traducción
  translator translator_type NOT NULL,
  confidence FLOAT CHECK (confidence BETWEEN 0 AND 1),
  human_reviewed BOOLEAN DEFAULT FALSE,
  reviewed_by TEXT,
  reviewed_at TIMESTAMPTZ,

  -- Estado
  sync_status sync_status DEFAULT 'pending',

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Solo una traducción por idioma/país
  UNIQUE(question_id, target_lang, target_country)
);

-- Índices
CREATE INDEX idx_translations_question ON public.question_translations(question_id);
CREATE INDEX idx_translations_target ON public.question_translations(target_country, target_lang);
CREATE INDEX idx_translations_pending ON public.question_translations(sync_status) WHERE sync_status = 'pending';

-- =============================================================================
-- TABLA: sync_events
-- Event Bus para sincronización entre repositorios
-- =============================================================================

CREATE TABLE public.sync_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Tipo de evento
  event_type TEXT NOT NULL,
  /*
    Tipos de eventos:
    - 'question.created'      : Nueva pregunta creada
    - 'question.updated'      : Pregunta modificada
    - 'question.translated'   : Traducción completada
    - 'question.approved'     : Revisión humana aprobada
    - 'sync.requested'        : Solicitud de sincronización manual
    - 'sync.completed'        : Sincronización exitosa
    - 'sync.failed'           : Error en sincronización
  */

  -- Payload del evento
  payload JSONB NOT NULL DEFAULT '{}',
  /*
    Ejemplo payload para 'question.created':
    {
      "question_id": "uuid",
      "original_id": "CO-MAT-05-fracciones-001",
      "source_repo": "saber-co",
      "source_lang": "es-CO"
    }
  */

  -- Routing
  source_repo TEXT,
  target_repos TEXT[],                 -- Array de repos destino

  -- Estado del procesamiento
  status event_status DEFAULT 'pending',
  error_message TEXT,
  retry_count INTEGER DEFAULT 0,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ,

  -- TTL: eventos viejos se pueden archivar
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days')
);

-- Índices para procesamiento eficiente
CREATE INDEX idx_sync_events_pending ON public.sync_events(status, created_at) WHERE status = 'pending';
CREATE INDEX idx_sync_events_type ON public.sync_events(event_type);
CREATE INDEX idx_sync_events_source ON public.sync_events(source_repo);

-- =============================================================================
-- TABLA: exam_results
-- Resultados de exámenes por país
-- =============================================================================

CREATE TABLE public.exam_results (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,

  -- Usuario
  user_id UUID REFERENCES auth.users(id),
  user_name TEXT NOT NULL,
  country_code country_code NOT NULL,

  -- Examen
  score INTEGER NOT NULL CHECK (score >= 0),
  total_questions INTEGER NOT NULL CHECK (total_questions > 0),
  subject TEXT NOT NULL,
  grade INTEGER,
  time_taken INTEGER,                  -- segundos

  -- Calculado
  percentage INTEGER GENERATED ALWAYS AS
    (ROUND((score::NUMERIC / total_questions::NUMERIC) * 100)) STORED,

  -- Detalles (opcional, para análisis)
  question_ids UUID[],                 -- IDs de preguntas respondidas
  answers JSONB,                       -- Respuestas del usuario

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para leaderboards y analytics
CREATE INDEX idx_results_country ON public.exam_results(country_code, created_at DESC);
CREATE INDEX idx_results_subject ON public.exam_results(country_code, subject, percentage DESC);
CREATE INDEX idx_results_user ON public.exam_results(user_id);

-- =============================================================================
-- TABLA: sync_log
-- Log detallado de operaciones de sincronización (para debugging)
-- =============================================================================

CREATE TABLE public.sync_log (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,

  event_id UUID REFERENCES public.sync_events(id),
  operation TEXT NOT NULL,
  details JSONB,
  success BOOLEAN NOT NULL,
  error_message TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índice para búsqueda por evento
CREATE INDEX idx_sync_log_event ON public.sync_log(event_id);

-- =============================================================================
-- VISTAS MATERIALIZADAS
-- =============================================================================

-- Vista: Leaderboard global por país
CREATE MATERIALIZED VIEW public.leaderboard_by_country AS
SELECT
  country_code,
  user_name,
  COUNT(*) as total_exams,
  ROUND(AVG(percentage), 2) as avg_percentage,
  SUM(score) as total_score,
  MAX(percentage) as best_score
FROM public.exam_results
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY country_code, user_name
ORDER BY country_code, avg_percentage DESC;

-- Índice único para refresh concurrent
CREATE UNIQUE INDEX idx_leaderboard_country_user ON public.leaderboard_by_country(country_code, user_name);

-- Vista: Estadísticas de preguntas por país
CREATE MATERIALIZED VIEW public.question_stats AS
SELECT
  source_country,
  subject_global_id,
  COUNT(*) as total_questions,
  COUNT(*) FILTER (WHERE status = 'published') as published,
  COUNT(*) FILTER (WHERE status = 'draft') as drafts,
  AVG(difficulty) as avg_difficulty
FROM public.questions_global
GROUP BY source_country, subject_global_id;

CREATE UNIQUE INDEX idx_question_stats ON public.question_stats(source_country, subject_global_id);

-- =============================================================================
-- FUNCIONES DE UTILIDAD
-- =============================================================================

-- Función: Actualizar timestamp de updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para updated_at
CREATE TRIGGER trigger_country_config_updated
  BEFORE UPDATE ON public.country_config
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_questions_updated
  BEFORE UPDATE ON public.questions_global
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_translations_updated
  BEFORE UPDATE ON public.question_translations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Función: Crear evento de sincronización
CREATE OR REPLACE FUNCTION create_sync_event(
  p_event_type TEXT,
  p_payload JSONB,
  p_source_repo TEXT DEFAULT NULL,
  p_target_repos TEXT[] DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  v_event_id UUID;
BEGIN
  INSERT INTO public.sync_events (event_type, payload, source_repo, target_repos)
  VALUES (p_event_type, p_payload, p_source_repo, p_target_repos)
  RETURNING id INTO v_event_id;

  RETURN v_event_id;
END;
$$ LANGUAGE plpgsql;

-- Función: Trigger para crear evento cuando se inserta pregunta
CREATE OR REPLACE FUNCTION on_question_created()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM create_sync_event(
    'question.created',
    jsonb_build_object(
      'question_id', NEW.id,
      'original_id', NEW.original_id,
      'source_repo', NEW.source_repo,
      'source_lang', NEW.source_lang,
      'subject', NEW.subject_global_id,
      'grade', NEW.grade
    ),
    NEW.source_repo,
    NULL  -- target_repos se determina en el procesamiento
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_question_created
  AFTER INSERT ON public.questions_global
  FOR EACH ROW EXECUTE FUNCTION on_question_created();

-- Función: Trigger para evento cuando se completa traducción
CREATE OR REPLACE FUNCTION on_translation_created()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM create_sync_event(
    'question.translated',
    jsonb_build_object(
      'translation_id', NEW.id,
      'question_id', NEW.question_id,
      'target_lang', NEW.target_lang,
      'target_country', NEW.target_country,
      'translator', NEW.translator
    ),
    NULL,
    ARRAY[
      CASE NEW.target_country
        WHEN 'CO' THEN 'saber-co'
        WHEN 'MX' THEN 'saber-mx'
        WHEN 'AR' THEN 'saber-ar'
        WHEN 'CL' THEN 'saber-cl'
        WHEN 'PE' THEN 'saber-pe'
        WHEN 'BR' THEN 'saber-br'
        WHEN 'US' THEN 'saber-us'
      END
    ]
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_translation_created
  AFTER INSERT ON public.question_translations
  FOR EACH ROW EXECUTE FUNCTION on_translation_created();

-- =============================================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE public.country_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions_global ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sync_log ENABLE ROW LEVEL SECURITY;

-- Políticas: country_config (lectura pública)
CREATE POLICY "Public read country config"
  ON public.country_config FOR SELECT
  TO public
  USING (active = TRUE);

-- Políticas: questions_global (lectura pública, escritura via service_role)
CREATE POLICY "Public read questions"
  ON public.questions_global FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Service role full access to questions"
  ON public.questions_global FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

-- Políticas: question_translations (lectura pública)
CREATE POLICY "Public read translations"
  ON public.question_translations FOR SELECT
  TO public
  USING (TRUE);

CREATE POLICY "Service role full access to translations"
  ON public.question_translations FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

-- Políticas: sync_events (solo service_role)
CREATE POLICY "Service role only for sync events"
  ON public.sync_events FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

-- Políticas: exam_results (lectura pública, escritura pública)
CREATE POLICY "Public read exam results"
  ON public.exam_results FOR SELECT
  TO public
  USING (TRUE);

CREATE POLICY "Public insert exam results"
  ON public.exam_results FOR INSERT
  TO public
  WITH CHECK (TRUE);

-- Políticas: sync_log (solo service_role)
CREATE POLICY "Service role only for sync log"
  ON public.sync_log FOR ALL
  TO service_role
  USING (TRUE)
  WITH CHECK (TRUE);

-- Políticas: party_sessions (lectura/escritura pública con restricciones)
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

-- =============================================================================
-- REALTIME
-- =============================================================================

-- Habilitar Realtime para Event Bus
ALTER PUBLICATION supabase_realtime ADD TABLE public.sync_events;

-- Habilitar Realtime para Party Sessions
ALTER PUBLICATION supabase_realtime ADD TABLE public.party_sessions;

-- Opcional: Realtime para preguntas (útil para dashboards)
-- ALTER PUBLICATION supabase_realtime ADD TABLE public.questions_global;

-- =============================================================================
-- TABLA: party_sessions (Party Mode - Cloud-First Architecture)
-- Sesiones de exámenes sincronizados en tiempo real
-- =============================================================================

CREATE TABLE public.party_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Código único de party (6 caracteres alfanuméricos)
  party_code TEXT UNIQUE NOT NULL,

  -- Host
  host_name TEXT NOT NULL,
  host_device_id TEXT,              -- ID del dispositivo Android (opcional)

  -- Configuración del examen
  exam_config JSONB NOT NULL,       -- {subject, grade, num_questions, difficulty}
  /*
    Ejemplo exam_config:
    {
      "subject": "matematicas",
      "grade": 11,
      "num_questions": 20,
      "difficulty": "mixed",
      "time_per_question": 60
    }
  */

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
CREATE INDEX idx_party_code ON public.party_sessions(party_code);
CREATE INDEX idx_party_status ON public.party_sessions(status, created_at DESC);
CREATE INDEX idx_party_expires ON public.party_sessions(expires_at);
CREATE INDEX idx_party_active ON public.party_sessions(status) WHERE status IN ('waiting', 'active');

-- =============================================================================
-- DATOS INICIALES
-- =============================================================================

-- Insertar configuración de Colombia (país base)
INSERT INTO public.country_config (
  country_code, country_name, country_name_english, flag,
  exam_name, exam_full_name, exam_authority,
  locale, timezone,
  grades, subjects, theme, culture,
  github_repo, active
) VALUES (
  'CO', 'Colombia', 'Colombia', '🇨🇴',
  'ICFES Saber', 'Pruebas Saber del Instituto Colombiano para la Evaluación de la Educación', 'ICFES',
  'es-CO', 'America/Bogota',
  '[{"id": 3, "name": "3° Primaria"}, {"id": 5, "name": "5° Primaria"}, {"id": 7, "name": "7° Secundaria"}, {"id": 9, "name": "9° Secundaria"}, {"id": 11, "name": "11° Media"}]'::jsonb,
  '[{"id": "matematicas", "name": "Matemáticas", "icon": "🔢", "globalId": "math"}, {"id": "lenguaje", "name": "Lenguaje", "icon": "📖", "globalId": "language"}, {"id": "ciencias", "name": "Ciencias Naturales", "icon": "🔬", "globalId": "science"}, {"id": "sociales", "name": "Ciencias Sociales", "icon": "🌍", "globalId": "social"}, {"id": "ingles", "name": "Inglés", "icon": "🇬🇧", "globalId": "english"}]'::jsonb,
  '{"primary": "#FCD116", "secondary": "#003893", "accent": "#CE1126", "bgDark": "#1a1a2e", "bgCard": "#16213e"}'::jsonb,
  '{"currency": {"code": "COP", "symbol": "$", "name": "Pesos colombianos"}, "cities": ["Bogotá", "Medellín", "Cali", "Barranquilla"]}'::jsonb,
  'worldexams/saber-co',
  TRUE
);

-- =============================================================================
-- COMENTARIOS DE DOCUMENTACIÓN
-- =============================================================================

COMMENT ON TABLE public.country_config IS 'Configuración de cada país de la organización World Exams';
COMMENT ON TABLE public.questions_global IS 'Banco global de preguntas, fuente de verdad';
COMMENT ON TABLE public.question_translations IS 'Traducciones de preguntas a otros idiomas/países';
COMMENT ON TABLE public.sync_events IS 'Event Bus para sincronización entre repositorios';
COMMENT ON TABLE public.exam_results IS 'Resultados de exámenes de usuarios por país';
COMMENT ON TABLE public.sync_log IS 'Log detallado de operaciones de sincronización';

COMMENT ON FUNCTION create_sync_event IS 'Crea un evento de sincronización en el Event Bus';
COMMENT ON FUNCTION on_question_created IS 'Trigger que crea evento cuando se inserta una pregunta';
COMMENT ON FUNCTION on_translation_created IS 'Trigger que crea evento cuando se completa una traducción';
