# 📋 PLANNING.md - World Exams Organization

_Última actualización: 2025-11-30_

---

## 🌍 Visión del Proyecto

**World Exams** es una organización de código abierto que desarrolla plataformas de práctica para exámenes nacionales estandarizados. Cada país tiene su propio repositorio con identidad visual única, contenido educativo localizado, y acceso gratuito para estudiantes.

### Objetivos Principales

1. **Democratizar el acceso** a material de práctica para exámenes nacionales
2. **Automatizar la generación** de contenido educativo con IA
3. **Sincronizar y traducir** preguntas entre países manteniendo calidad pedagógica
4. **Mantener identidad cultural** única por país (colores, idioma, contexto)
5. **Open Source First** - Todo el código es público y contribuible

### Valores del Proyecto

- ✅ **Gratuito:** Sin costos para estudiantes
- ✅ **Accesible:** Funciona para todos, sin barreras (a11y)
- ✅ **Educativo:** Calidad pedagógica validada
- ✅ **Automatizado:** Generación de contenido por IA
- ✅ **Cultural:** Respeto a la identidad de cada país
- ✅ **Transparente:** Código abierto, comunidad activa

---

## 🏗️ Arquitectura Global

### Stack Tecnológico

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Astro** | 5.x | Static Site Generator (SSG) - Framework principal |
| **Svelte** | 5.x | Componentes interactivos (UI Islands) |
| **TailwindCSS** | 3.x | Estilos utility-first, mobile-first, dark mode |
| **Supabase** | Latest | Backend as a Service (PostgreSQL, Auth, Realtime, Edge Functions) |
| **TypeScript** | 5.x | Tipado estricto en todo el proyecto |
| **GitHub Pages** | - | Hosting gratuito por repo |
| **GitHub Actions** | - | CI/CD, sincronización, validación |
| **Gemini/GPT** | API | Generación y traducción de preguntas |

### Diseño Visual: Ciber-Minimalista

**Concepto:** Estética "hacker terminal" moderna, minimalista, con identidad cultural por país.

**Colores Base Globales:**
- Background: `#121212` (Negro profundo)
- Text Primary: `#F5F5DC` (Beige suave)
- Text Secondary: `#A0A0A0` (Gris medio)
- Card Background: `#1A1A1A` (Negro ligeramente más claro)

**Tipografía:**
- Monospace: `Fira Code` (código, títulos)
- Sans: `Inter` o `System UI` (cuerpo de texto)

**Flag Stripe:**
- Línea de 3px en la parte superior del viewport
- Colores únicos por país (representa la bandera nacional)
- Implementado en `src/layouts/Layout.astro`

**Colores por País (Flag Stripe + Accents):**

| País | Código | Primary | Secondary | Tertiary |
|------|--------|---------|-----------|----------|
| 🇨🇴 Colombia | `CO` | `#FCD116` | `#003893` | `#CE1126` |
| 🇲🇽 México | `MX` | `#006847` | `#FFFFFF` | `#CE1126` |
| 🇦🇷 Argentina | `AR` | `#74ACDF` | `#FFFFFF` | `#F6B40E` |
| 🇨🇱 Chile | `CL` | `#D52B1E` | `#FFFFFF` | `#0039A6` |
| 🇵🇪 Perú | `PE` | `#D91023` | `#FFFFFF` | `#FFD700` |
| 🇧🇷 Brasil | `BR` | `#009739` | `#FEDD00` | `#002776` |
| 🇺🇸 USA | `US` | `#3C3B6E` | `#B22234` | `#FFFFFF` |
| 🇨🇳 China | `CN` | `#DE2910` | `#FFDE00` | - |
| 🇮🇳 India | `IN` | `#FF9933` | `#FFFFFF` | `#138808` |
| 🇮🇩 Indonesia | `ID` | `#CE1126` | `#FFFFFF` | - |
| 🇰🇷 Korea | `KR` | `#003478` | `#CD2E3A` | `#FFFFFF` |
| 🇪🇬 Egypt | `EG` | `#CE1126` | `#FFFFFF` | `#000000` |
| 🇳🇬 Nigeria | `NG` | `#008751` | `#FFFFFF` | - |
| 🇷🇺 Russia | `RU` | `#0039A6` | `#FFFFFF` | `#D52B1E` |
| 🇫🇷 France | `FR` | `#0055A4` | `#FFFFFF` | `#EF4135` |
| 🇯🇵 Japan | `JP` | `#BC002D` | `#FFFFFF` | - |
| 🇩🇪 Germany | `DE` | `#000000` | `#DD0000` | `#FFCE00` |
| 🇵🇹 Portugal | `PT` | `#006600` | `#FF0000` | `#FFFF00` |
| 🇵🇰 Pakistan | `PK` | `#01411C` | `#FFFFFF` | - |
| 🇧🇩 Bangladesh | `BD` | `#006A4E` | `#F42A41` | - |

---

## 📁 Estructura Estándar de Repositorio

Cada repo de país sigue esta estructura **obligatoria**:

```text
[repo-name]/                           # Ej: exani-mx, enem-br, sat-us
├── .github/
│   ├── copilot-instructions.md        # Instrucciones locales del país
│   ├── workflows/
│   │   ├── deploy.yml                 # Deploy a GitHub Pages
│   │   ├── sync-pull.yml              # Pull traducciones desde question-sync
│   │   └── validate.yml               # Validar preguntas locales
│   └── prompts/
│       └── generar-pregunta.prompt.md # Prompt para generar preguntas locales
├── AGENTS.md                          # Roles AI locales (heredados de org)
├── README.md                          # En idioma local del país
├── config/
│   └── country.ts                     # Configuración del país (CRÍTICO)
├── src/
│   ├── content/
│   │   ├── config.ts                  # Configuración de colecciones Astro
│   │   └── questions/                 # Banco de preguntas local
│   │       └── [asignatura]/          # Ej: matematicas, lectura-critica
│   │           └── grado-[N]/         # Ej: grado-3, grado-11
│   │               └── [tema]/        # Ej: fracciones, algebra
│   │                   └── [id].md    # Pregunta individual
│   ├── components/                    # Componentes Svelte locales
│   │   ├── AdBanner.svelte
│   │   ├── ExamView.svelte
│   │   ├── FlashlightCard.svelte
│   │   ├── GradeSelector.svelte
│   │   ├── Leaderboard.svelte
│   │   ├── Login.svelte
│   │   ├── ResultsView.svelte
│   │   ├── Search.svelte
│   │   └── SubjectSelector.svelte
│   ├── layouts/
│   │   └── Layout.astro              # Layout principal con flag stripe
│   ├── lib/
│   │   ├── auth.ts                   # Cliente Supabase Auth
│   │   └── supabase.ts               # Cliente Supabase
│   ├── pages/
│   │   ├── index.astro               # Homepage
│   │   └── questions/
│   │       └── [...slug].astro       # Páginas dinámicas de preguntas
│   ├── styles/
│   │   └── global.css                # Estilos globales + accent colors
│   └── utils/
│       └── questionParser.ts         # Parser de preguntas Markdown
├── public/
│   ├── ads.txt                       # Google AdSense verification
│   ├── robots.txt                    # SEO
│   └── agent.json                    # Metadata para agentes
├── supabase/                         # Solo archivos locales
│   └── .env.local.example            # Template de variables de entorno
├── package.json                      # Dependencias (nombre por país)
├── astro.config.mjs                  # Config Astro (base path por país)
├── tailwind.config.mjs               # Config Tailwind
└── tsconfig.json                     # Config TypeScript
```

### Archivos Críticos por País

| Archivo | Propósito | Contenido Variable |
|---------|-----------|-------------------|
| `config/country.ts` | Configuración del país | Código, nombre, idioma, moneda, grados, asignaturas |
| `src/layouts/Layout.astro` | Layout con flag stripe | Colores del flag stripe (línea 3px) |
| `src/styles/global.css` | Accent colors | `--color-accent` del país |
| `src/pages/index.astro` | Homepage | SEO texts en idioma local |
| `README.md` | Documentación | Idioma local, contexto cultural |

---

## 🗄️ Base de Datos Supabase (Global Compartida)

**CRÍTICO:** Todos los países usan la **misma instancia de Supabase**. No hay bases de datos separadas por país.

### Schema Principal

```sql
-- Tabla global de preguntas (sincronizada)
CREATE TABLE questions_global (
  id TEXT PRIMARY KEY,              -- [COUNTRY]-[SUBJECT]-[GRADE]-[TOPIC]-[###]
  country_code TEXT NOT NULL,       -- CO, MX, BR, US, etc.
  source_lang TEXT NOT NULL,        -- es-CO, es-MX, pt-BR, en-US
  grado INT NOT NULL,
  asignatura TEXT NOT NULL,
  tema TEXT NOT NULL,
  enunciado TEXT NOT NULL,
  opciones JSONB NOT NULL,          -- Array de {id, text, correct}
  explicacion TEXT,
  dificultad INT CHECK (dificultad BETWEEN 1 AND 5),
  estado TEXT DEFAULT 'draft',      -- draft, review, approved
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Traducciones de preguntas
CREATE TABLE question_translations (
  id SERIAL PRIMARY KEY,
  question_id TEXT REFERENCES questions_global(id),
  target_lang TEXT NOT NULL,        -- Idioma destino
  enunciado TEXT NOT NULL,
  opciones JSONB NOT NULL,
  explicacion TEXT,
  translated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(question_id, target_lang)
);

-- Resultados de exámenes (por usuario)
CREATE TABLE exam_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id),
  country_code TEXT NOT NULL,
  exam_type TEXT NOT NULL,
  questions JSONB NOT NULL,         -- Array de IDs de preguntas
  answers JSONB NOT NULL,           -- Respuestas del usuario
  score INT NOT NULL,
  time_taken INT,                   -- Segundos
  completed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Configuración por país (estática)
CREATE TABLE country_config (
  country_code TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  language TEXT NOT NULL,
  currency TEXT NOT NULL,
  grades JSONB NOT NULL,            -- Array de grados disponibles
  subjects JSONB NOT NULL,          -- Array de asignaturas
  colors JSONB NOT NULL,            -- {primary, secondary, accent}
  exam_name TEXT NOT NULL           -- "ICFES Saber 11", "ENEM", "SAT", etc.
);
```

### RLS Policies (Row Level Security)

```sql
-- questions_global: Lectura pública, escritura via Edge Function
ALTER TABLE questions_global ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON questions_global FOR SELECT USING (true);

-- exam_results: Solo el usuario puede ver/editar sus resultados
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can CRUD own results" ON exam_results
  USING (auth.uid() = user_id);

-- country_config: Solo lectura pública
ALTER TABLE country_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read" ON country_config FOR SELECT USING (true);
```

### Variables de Entorno por Repo

En cada repo de país, solo se necesita:

```env
# .env.local
PUBLIC_SUPABASE_URL=https://xxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbG...
COUNTRY_CODE=CO
```

**NUNCA exponer `SUPABASE_SERVICE_ROLE_KEY` en repos de país.** Solo existe en:
- Repo `question-sync` (como secret de organización)
- Edge Functions en Supabase

---

## 🔄 Sistema de Sincronización (question-sync)

**Repo:** `worldexams/question-sync` (privado)

**Propósito:** Sincronizar preguntas entre repos de países, traducir con IA, y distribuir.

### Flujo de Nueva Pregunta

```
1. Developer crea pregunta en repo origen (ej: saber-co)
   └─> src/content/questions/matematicas/grado-5/fracciones/CO-MAT-05-fracciones-001.md

2. Push a main → GitHub Action trigger webhook

3. question-sync recibe evento
   ├─> Valida formato (frontmatter, ID, estructura)
   ├─> Inserta en questions_global (Supabase)
   └─> Trigger traducción

4. Gemini/GPT traduce a otros idiomas
   ├─> Adapta contexto cultural (moneda, ciudades, nombres)
   ├─> Mantiene integridad pedagógica
   └─> Inserta en question_translations

5. Event Bus (Supabase Realtime) notifica repos destino

6. GitHub Actions en repos destino:
   ├─> Pull nueva traducción
   ├─> Valida formato local
   ├─> Commit automático (bot)
   └─> Deploy a GitHub Pages
```

### Eventos del Event Bus

| Evento | Payload | Trigger |
|--------|---------|---------|
| `question.created` | `{id, country_code, source_lang}` | Nueva pregunta en repo origen |
| `question.translated` | `{question_id, target_lang}` | Traducción disponible |
| `question.approved` | `{id, reviewer}` | Revisión humana OK |
| `sync.completed` | `{repo, questions_synced}` | Sincronización exitosa |

---

## 🎭 Roles de Agentes IA

Consultar `AGENTS.md` para definición completa. Resumen:

| Rol | Trigger Keywords | Responsabilidades |
|-----|------------------|-------------------|
| 🏗️ **The Architect** | "Estructura", "Supabase", "Schema", "Arquitectura" | Decisiones de alto nivel, DB global, RLS policies |
| 🤖 **The Generator** | "Generar preguntas", "Contenido", "Automatizar" | Crear preguntas con IA, validar formato |
| 🎨 **The Frontend Artist** | "UI", "Diseño", "CSS", "Theme", "Componente" | Aplicar colores del país, Tailwind, Svelte |
| 🛡️ **The Guardian** | "Auth", "Seguridad", "Tests", "Validación" | Proteger secrets, RLS, validación |
| 📚 **The Librarian** | "Organizar", "Carpetas", "Estructura" | Mantener estructura limpia, naming conventions |
| 🌐 **The Translator** | "Traducir", "Localizar", "Adaptar" | Traducir preguntas, adaptar contexto cultural |
| 🔄 **The Synchronizer** | "Webhook", "Action", "Pipeline", "Deploy" | Gestionar GitHub Actions, Event Bus, CI/CD |

---

## 📝 Formato Estándar de Preguntas

**OBLIGATORIO** para todas las preguntas en todos los países:

```markdown
---
id: "[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[###]"
country: "[CO|MX|AR|CL|PE|BR|US|CN|IN|ID|KR|EG|NG|RU|FR|JP|DE|PT|PK|BD|VN]"
grado: [número según país]
asignatura: "[Asignatura en idioma local]"
tema: "[Tema específico]"
dificultad: [1-5]
estado: "draft"
creador: "[Nombre o AI-WorldExams]"
source_lang: "[es-CO|es-MX|pt-BR|en-US|zh-CN|hi-IN|...]"
---

# Pregunta

[Enunciado claro, máximo 150 palabras, con contexto cultural apropiado]

# Opciones

- [ ] A) [Distractor 1 - error común]
- [ ] B) [Distractor 2 - error común]
- [x] C) [RESPUESTA CORRECTA]
- [ ] D) [Distractor 3 - error común]

# Explicación

[Justificación pedagógica: por qué C es correcta y por qué A, B, D no lo son]
```

### Niveles de Dificultad

| Nivel | Descripción | Ejemplo |
|-------|-------------|---------|
| 1 | Reconocimiento básico | Identificar una figura geométrica |
| 2 | Comprensión simple | Calcular perímetro de rectángulo |
| 3 | Aplicación | Resolver ecuación lineal simple |
| 4 | Análisis | Comparar fracciones con diferente denominador |
| 5 | Síntesis/Evaluación | Problemas multi-paso con razonamiento complejo |

---

## 🚫 Reglas Críticas y Restricciones

### 1. NO Crear Archivos en la Raíz

**PROHIBIDO** crear nuevos archivos en la raíz del repositorio.

**Excepciones permitidas:**
- `README.md`, `AGENTS.md`, `PLANNING.md`, `TASK.md`, `LICENSE`
- `package.json`, `tsconfig.json`, `astro.config.mjs`, `tailwind.config.mjs`
- `.gitignore`, `.env.example`

**Ubicaciones correctas:**
- Documentación pública → `docs/`
- Documentación privada → `spec/`
- Prompts → `.github/prompts/`
- Workflows → `.github/workflows/`

### 2. Sistema de IDs por País

El ID de cada pregunta **DEBE** incluir el código de país:

```
Formato: [COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[###]

Ejemplos:
- CO-MAT-05-fracciones-001 (Colombia, Matemáticas, Grado 5)
- MX-ESP-06-comprension-001 (México, Español, Grado 6)
- BR-POR-09-gramatica-001 (Brasil, Português, Grado 9)
- US-ENG-10-reading-001 (USA, English, Grade 10)
```

### 3. Organización de Archivos

```
src/content/questions/[asignatura]/grado-[N]/[tema]/[archivo].md
```

**Convenciones de nombres:**
- Asignatura: `kebab-case`, sin tildes (ej: `matematicas`, `lectura-critica`)
- Grado: `grado-N` (ej: `grado-3`, `grado-11`)
- Tema: `kebab-case` (ej: `fracciones`, `revolucion-industrial`)
- Archivo: `[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[###].md`

### 4. Supabase - NO Modificar Schema Sin Coordinación

La base de datos es compartida por todos los países. Cambios al schema afectan **TODOS LOS REPOS**.

**Proceso para cambios de schema:**
1. Proponer en issue en `worldexams/.github`
2. Revisar con The Architect
3. Crear migration en `supabase/migrations/`
4. Aplicar en staging primero
5. Notificar a todos los repos

### 5. NO Exponer Service Role Key

```bash
# ✅ CORRECTO (repos de país)
PUBLIC_SUPABASE_URL=https://xxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbG...

# ❌ INCORRECTO (NUNCA en frontend)
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...
```

---

## 🎯 Estrategia de Crecimiento (Post-Flag)

**Contexto:** GitHub flagueó la organización por creación masiva de repos. Ahora debemos crecer **gradualmente y orgánicamente**.

### Principios de Crecimiento Gradual

1. **Máximo 2-3 repos nuevos por semana** (no 20 en 2 días)
2. **Contenido real desde día 1** (mínimo 10 preguntas por asignatura)
3. **Commits orgánicos** (no solo automatizados)
4. **Community engagement** (issues, PRs, contributors)
5. **Documentación completa** (README, LICENSE, CONTRIBUTING)

### Priorización de Países

| Prioridad | Países | Razón |
|-----------|--------|-------|
| 🔴 ALTA | CO, MX, BR, US, AR | Grandes poblaciones, mercado hispanohablante/anglófono |
| 🟠 MEDIA | CL, PE, CN, IN, ES | Mercados importantes, idiomas clave |
| 🟡 BAJA | FR, DE, JP, KR, EG, NG, RU | Expansión internacional gradual |

---

## 🧪 Testing y Validación

### Tests Obligatorios

1. **Validación de Formato** (todos los repos)
   - Frontmatter completo
   - ID válido con código de país
   - Estructura de opciones correcta
   - Explicación presente

2. **Tests de Integración Supabase**
   - Insertar pregunta en `questions_global`
   - Leer preguntas filtradas por `country_code`
   - Verificar RLS policies

3. **Tests de UI** (Playwright/Cypress)
   - Navegación por asignaturas/grados
   - Selección de preguntas
   - Submit de examen
   - Leaderboard

### Script de Validación

```bash
# En cada repo
npm run validate

# Valida:
# - Formato de preguntas
# - IDs únicos
# - Referencias rotas
# - Frontmatter completo
```

---

## 📚 Documentación y Comunicación

### Documentos Clave

| Documento | Ubicación | Propósito |
|-----------|-----------|-----------|
| `MASTER_PLAN.md` | `.github-org` | Plan maestro de organización |
| `AGENTS.md` | `.github-org` y repos | Roles de IA |
| `PLANNING.md` | Cada repo | Arquitectura y decisiones del proyecto |
| `TASK.md` | Cada repo | Gestión de tareas y progreso |
| `README.md` | Cada repo | Introducción y setup (idioma local) |
| `.github/copilot-instructions.md` | Cada repo | Instrucciones para GitHub Copilot |

### Convenciones de Commits

```
feat(country): añadir flag stripe para Indonesia
fix(questions): corregir ID de pregunta duplicada
docs(readme): actualizar instrucciones de setup
chore(deps): actualizar Astro a 5.1.0
```

---

## 🚀 Deployment

### GitHub Pages (Por Repo)

Cada repo se despliega independientemente a GitHub Pages:

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

**URL Pattern:** `https://worldexams.github.io/[repo-name]/`

---

## 🔗 Referencias Externas

- **Astro Docs:** https://docs.astro.build/
- **Svelte 5 Docs:** https://svelte.dev/docs/svelte/overview
- **Supabase Docs:** https://supabase.com/docs
- **TailwindCSS Docs:** https://tailwindcss.com/docs
- **GitHub Actions Docs:** https://docs.github.com/en/actions

---

_Este documento es la fuente de verdad para arquitectura y decisiones de World Exams._
