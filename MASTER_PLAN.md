# 🌍 World Exams - Plan Maestro

> Plataforma global de exámenes de estado, código abierto y gratuita para todos.

---

## 📋 Visión General

**World Exams** es una organización de GitHub que agrupa repositorios de plataformas de práctica para exámenes nacionales estandarizados de cada país. Cada país tiene su propio repositorio con identidad visual única basada en su cultura, pero comparte la misma arquitectura técnica.

### Principios Fundamentales

| Principio | Descripción |
|-----------|-------------|
| 🔓 **Open Source** | Todo el código es público y contribuible |
| 🌐 **Multi-País** | Un repo por país, identidad cultural única |
| 🔄 **Sincronizado** | Preguntas traducidas y sincronizadas automáticamente |
| 🆓 **Gratuito** | Hosting con GitHub Pages, sin costo |
| 🤖 **Automatizado** | Generación de contenido con IA |

---

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      ORGANIZACIÓN: github.com/world-exams                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐            │
│  │ saber-co   │  │ saber-mx   │  │ saber-ar   │  │ saber-br   │   ...      │
│  │ 🇨🇴 Colombia │  │ 🇲🇽 México  │  │ 🇦🇷 Argentina│  │ 🇧🇷 Brasil  │            │
│  │            │  │            │  │            │  │            │            │
│  │ icfes.world│  │planea.world│  │aprender.ar │  │ enem.world │            │
│  │ exams.co   │  │ exams.mx   │  │            │  │            │            │
│  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘            │
│        │               │               │               │                   │
│        └───────────────┴───────────────┴───────────────┘                   │
│                                │                                            │
│                    ┌───────────▼────────────┐                              │
│                    │   📡 question-sync     │                              │
│                    │   Repo Central         │                              │
│                    │   • GitHub Actions     │                              │
│                    │   • Webhooks listener  │                              │
│                    │   • Translation API    │                              │
│                    └───────────┬────────────┘                              │
│                                │                                            │
│                    ┌───────────▼────────────┐                              │
│                    │   🗄️ Supabase Único    │                              │
│                    │   • PostgreSQL         │                              │
│                    │   • Realtime (Event Bus)│                             │
│                    │   • Edge Functions     │                              │
│                    │   • Auth unificado     │                              │
│                    └────────────────────────┘                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📦 Repositorios de la Organización

### Repositorios por País

| Repo | País | Examen | Idioma | Estado |
|------|------|--------|--------|--------|
| `saber-co` | 🇨🇴 Colombia | ICFES Saber | Español | ✅ Activo |
| `saber-mx` | 🇲🇽 México | PLANEA | Español | 🔄 Próximo |
| `saber-ar` | 🇦🇷 Argentina | APRENDER | Español | 📋 Planeado |
| `saber-cl` | 🇨🇱 Chile | SIMCE | Español | 📋 Planeado |
| `saber-pe` | 🇵🇪 Perú | ECE | Español | 📋 Planeado |
| `saber-ec` | 🇪🇨 Ecuador | Ser Bachiller | Español | 📋 Planeado |
| `saber-br` | 🇧🇷 Brasil | ENEM | Portugués | 📋 Planeado |
| `saber-us` | 🇺🇸 USA | SAT/ACT | Inglés | 📋 Planeado |

### Repositorios de Infraestructura

| Repo | Propósito |
|------|-----------|
| `question-sync` | Sincronización, traducción, event bus |
| `shared-components` | Componentes UI compartidos (Svelte) |
| `exam-schema` | Esquemas de validación y tipos |
| `.github` | Archivos de organización, templates |

---

## 🎨 Identidad Visual por País

Cada país tiene una paleta de colores única basada en su cultura, bandera y tradiciones.

### 🇨🇴 Colombia - Saber Colombia

```css
/* Inspirado en la biodiversidad colombiana */
--primary: #FCD116;      /* Amarillo - Oro, riqueza */
--secondary: #003893;    /* Azul - Cielos, océanos */
--accent: #CE1126;       /* Rojo - Sangre de héroes */
--bg-dark: #1a1a2e;      /* Fondo oscuro */
--text: #ffffff;
```

**Elementos culturales:** Orquídeas, café, esmeraldas, sombrero vueltiao

### 🇲🇽 México - Saber México

```css
/* Inspirado en arte mexicano y cultura prehispánica */
--primary: #006847;      /* Verde - Independencia */
--secondary: #CE1126;    /* Rojo - Sangre de héroes */
--accent: #FFD700;       /* Dorado - Sol azteca */
--bg-dark: #1e1e2f;      /* Fondo oscuro */
--text: #ffffff;
```

**Elementos culturales:** Águila, serpiente, alebrijes, cempasúchil

### 🇦🇷 Argentina - Saber Argentina

```css
/* Inspirado en el cielo argentino y tradiciones */
--primary: #74ACDF;      /* Celeste - Cielo */
--secondary: #FFFFFF;    /* Blanco - Sol de Mayo */
--accent: #F6B40E;       /* Dorado - Sol */
--bg-dark: #1a1a2e;
--text: #ffffff;
```

**Elementos culturales:** Sol de Mayo, gaucho, mate, tango

### 🇨🇱 Chile - Saber Chile

```css
/* Inspirado en los Andes y el Pacífico */
--primary: #D52B1E;      /* Rojo - Sangre mapuche */
--secondary: #FFFFFF;    /* Blanco - Nieve andina */
--accent: #0039A6;       /* Azul - Océano Pacífico */
--bg-dark: #1a1a2e;
```

**Elementos culturales:** Cóndor, copihue, huaso, cordillera

### 🇵🇪 Perú - Saber Perú

```css
/* Inspirado en cultura inca y tradiciones */
--primary: #D91023;      /* Rojo - Sangre incaica */
--secondary: #FFFFFF;    /* Blanco */
--accent: #FFD700;       /* Dorado - Oro inca */
--bg-dark: #1a1a2e;
```

**Elementos culturales:** Llama, Machu Picchu, vicuña, quipu

### 🇧🇷 Brasil - Saber Brasil

```css
/* Inspirado en la selva y alegría brasileña */
--primary: #009739;      /* Verde - Selva amazónica */
--secondary: #FEDD00;    /* Amarillo - Riqueza */
--accent: #002776;       /* Azul - Cielo */
--bg-dark: #1a1a2e;
```

**Elementos culturales:** Tucán, carnaval, Amazonas, Cristo Redentor

### 🇺🇸 USA - World Exams US

```css
/* Inspirado en colores institucionales */
--primary: #3C3B6E;      /* Azul - Unión */
--secondary: #B22234;    /* Rojo - Valor */
--accent: #FFFFFF;       /* Blanco - Pureza */
--bg-dark: #1a1a2e;
```

---

## 🔄 Sistema de Sincronización

### Flujo de Sincronización de Preguntas

```
┌──────────────────────────────────────────────────────────────────────┐
│                    FLUJO DE SINCRONIZACIÓN                           │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  1. GENERACIÓN                                                        │
│  ┌─────────────┐                                                     │
│  │ saber-co    │──── GitHub Action ────► Nueva pregunta (ES-CO)     │
│  │ (Colombia)  │      genera pregunta                                │
│  └─────────────┘                                                     │
│         │                                                             │
│         ▼                                                             │
│  2. WEBHOOK TRIGGER                                                   │
│  ┌─────────────┐                                                     │
│  │ GitHub      │──── push event ───────► question-sync repo         │
│  │ Webhook     │                                                      │
│  └─────────────┘                                                     │
│         │                                                             │
│         ▼                                                             │
│  3. PROCESAMIENTO CENTRAL                                            │
│  ┌─────────────────────────────────────────────────┐                │
│  │ question-sync                                    │                │
│  │ ┌───────────┐  ┌───────────┐  ┌───────────┐   │                │
│  │ │ Validar   │─►│ Traducir  │─►│ Adaptar   │   │                │
│  │ │ formato   │  │ (Gemini/  │  │ contexto  │   │                │
│  │ │           │  │  GPT)     │  │ cultural  │   │                │
│  │ └───────────┘  └───────────┘  └───────────┘   │                │
│  └─────────────────────────────────────────────────┘                │
│         │                                                             │
│         ▼                                                             │
│  4. DISTRIBUCIÓN                                                      │
│  ┌─────────────────────────────────────────────────┐                │
│  │           Supabase Event Bus (Realtime)          │                │
│  │                                                   │                │
│  │  question_created ──► INSERT en questions_global │                │
│  │                                                   │                │
│  └─────────────────────────────────────────────────┘                │
│         │                                                             │
│         ▼                                                             │
│  5. PULL EN REPOS DESTINO                                            │
│  ┌───────────┐  ┌───────────┐  ┌───────────┐                       │
│  │ saber-mx  │  │ saber-ar  │  │ saber-br  │                       │
│  │ (México)  │  │(Argentina)│  │ (Brasil)  │                       │
│  │           │  │           │  │           │                       │
│  │ GitHub    │  │ GitHub    │  │ GitHub    │                       │
│  │ Action    │  │ Action    │  │ Action    │                       │
│  │ pull-sync │  │ pull-sync │  │ pull-sync │                       │
│  └───────────┘  └───────────┘  └───────────┘                       │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

### Eventos del Event Bus

| Evento | Payload | Trigger |
|--------|---------|---------|
| `question.created` | `{id, source_repo, lang, content}` | Nueva pregunta |
| `question.translated` | `{id, target_lang, translations[]}` | Traducción lista |
| `question.approved` | `{id, approved_by, country}` | Revisión humana |
| `sync.requested` | `{target_repo, questions[]}` | Sincronización manual |

---

## 🗄️ Schema de Base de Datos Unificada

### Tablas Principales

```sql
-- Tabla global de preguntas (fuente de verdad)
CREATE TABLE questions_global (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_repo TEXT NOT NULL,           -- 'saber-co', 'saber-mx', etc.
  source_lang TEXT NOT NULL,           -- 'es-CO', 'es-MX', 'pt-BR'
  original_id TEXT NOT NULL,           -- ID en el repo origen

  -- Contenido original
  content_original JSONB NOT NULL,

  -- Metadata
  subject TEXT NOT NULL,
  grade INTEGER NOT NULL,
  topic TEXT NOT NULL,
  difficulty INTEGER CHECK (difficulty BETWEEN 1 AND 5),

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Sync status
  sync_status TEXT DEFAULT 'pending',  -- pending, syncing, synced, error

  UNIQUE(source_repo, original_id)
);

-- Tabla de traducciones
CREATE TABLE question_translations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID REFERENCES questions_global(id) ON DELETE CASCADE,
  target_lang TEXT NOT NULL,           -- 'es-MX', 'pt-BR', 'en-US'

  -- Contenido traducido
  content_translated JSONB NOT NULL,

  -- Metadata de traducción
  translator TEXT NOT NULL,            -- 'gemini-2.0', 'gpt-4', 'human'
  confidence FLOAT,                    -- 0.0 - 1.0
  human_reviewed BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(question_id, target_lang)
);

-- Tabla de sync events (event bus)
CREATE TABLE sync_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  payload JSONB NOT NULL,
  source_repo TEXT,
  target_repos TEXT[],
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  processed_at TIMESTAMPTZ
);

-- Tabla de resultados por país
CREATE TABLE exam_results (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),

  -- Usuario
  user_id UUID REFERENCES auth.users(id),
  user_name TEXT NOT NULL,
  country_code TEXT NOT NULL,          -- 'CO', 'MX', 'AR', etc.

  -- Examen
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  subject TEXT NOT NULL,
  grade INTEGER,
  time_taken INTEGER,                  -- segundos

  -- Calculado
  percentage INTEGER GENERATED ALWAYS AS
    ((score::float / total_questions::float) * 100) STORED
);

-- Configuración por país
CREATE TABLE country_config (
  country_code TEXT PRIMARY KEY,
  country_name TEXT NOT NULL,
  exam_name TEXT NOT NULL,
  locale TEXT NOT NULL,
  timezone TEXT NOT NULL,
  grades JSONB NOT NULL,               -- [{id: 3, name: "3° Primaria"}]
  subjects JSONB NOT NULL,             -- [{id: "math", name: "Matemáticas"}]
  theme JSONB NOT NULL,                -- {primary: "#FCD116", ...}
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE sync_events;
ALTER PUBLICATION supabase_realtime ADD TABLE questions_global;

-- RLS Policies
ALTER TABLE questions_global ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_translations ENABLE ROW LEVEL SECURITY;
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE country_config ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read questions" ON questions_global
  FOR SELECT TO public USING (true);

CREATE POLICY "Public read translations" ON question_translations
  FOR SELECT TO public USING (true);

CREATE POLICY "Public read config" ON country_config
  FOR SELECT TO public USING (active = true);

CREATE POLICY "Public insert results" ON exam_results
  FOR INSERT TO public WITH CHECK (true);

CREATE POLICY "Public read results" ON exam_results
  FOR SELECT TO public USING (true);
```

---

## 📁 Estructura de Cada Repositorio País

```
saber-[pais]/
├── .github/
│   ├── copilot-instructions.md    # Instrucciones locales
│   ├── workflows/
│   │   ├── deploy.yml             # Deploy a GitHub Pages
│   │   ├── sync-pull.yml          # Pull traducciones desde central
│   │   └── validate.yml           # Validar preguntas
│   └── prompts/
│       └── generar-pregunta.prompt.md
├── AGENTS.md                      # Roles adaptados al país
├── README.md                      # Documentación en idioma local
├── config/
│   └── country.ts                 # Configuración del país
├── src/
│   ├── content/
│   │   └── questions/
│   │       ├── [asignatura]/
│   │       │   └── grado-[N]/
│   │       │       └── [tema]/
│   └── styles/
│       └── theme.css              # Colores del país
└── supabase/
    └── .env.local                 # Solo SUPABASE_URL y ANON_KEY
```

---

## 🚀 Plan de Implementación

### Fase 1: Infraestructura Base (Semana 1-2)

- [ ] Crear organización `worldexams` en GitHub
- [ ] Migrar `saberparatodos` → `saber-co`
- [ ] Crear repo `.github` con templates
- [ ] Crear repo `question-sync` básico
- [ ] Actualizar schema de Supabase

### Fase 2: Sistema de Sincronización (Semana 3-4)

- [ ] Implementar GitHub Actions en `question-sync`
- [ ] Configurar webhooks entre repos
- [ ] Integrar API de traducción (Gemini/GPT)
- [ ] Configurar Supabase Realtime

### Fase 3: Primer País Adicional (Semana 5-6)

- [ ] Crear `saber-mx` (México) como primer fork
- [ ] Implementar theme mexicano
- [ ] Adaptar contenido al currículo mexicano
- [ ] Probar sincronización bidireccional

### Fase 4: Escalamiento (Semana 7+)

- [ ] Crear `saber-ar` (Argentina)
- [ ] Crear `saber-br` (Brasil - portugués)
- [ ] Documentar proceso de contribución
- [ ] Reclutar colaboradores locales

---

## 📞 Contacto y Contribución

- **Organización:** [github.com/world-exams](https://github.com/world-exams)
- **Proyecto Principal:** [saber-co](https://github.com/world-exams/saber-co)
- **Sincronización:** [question-sync](https://github.com/world-exams/question-sync)

Para contribuir a un país específico, abre un issue en el repo correspondiente.

---

## 📜 Licencia

- **Código:** MIT License
- **Contenido (preguntas):** CC BY-SA 4.0

---

*Última actualización: Noviembre 2025*
