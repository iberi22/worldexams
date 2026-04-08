# ARCHITECTURE.md - System Architecture

**Project:** WorldExams
**Generated:** 2026-04-02
**Repository:** https://github.com/iberi22/worldexams
**Status:** ACTIVE

---

## Overview

WorldExams es una plataforma SaaS de simulación de exámenes con:
- Banco de preguntas en múltiples países (formato markdown)
- API para consumo de preguntas (Cloudflare Workers)
- Sistema de revisión automatizada de calidad
- Modelo freemium con API premium

---

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENTS                                         │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐       │
│   │ saberparatodos   │  │ worldexams.com   │  │ API Clients      │       │
│   │ .space (Astro)   │  │ (Landing)         │  │ (Mobile/3rd party)│       │
│   └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘       │
└────────────┼────────────────────┼────────────────────┼───────────────────┘
             │                    │                    │
             │                    │                    │
             ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          CLOUDFLARE EDGE                                     │
│  ┌──────────────────┐  ┌──────────────────┐                                 │
│  │ worldexams-api   │  │ landing-worldex. │                                 │
│  │ (Worker)         │  │ (Pages)          │                                 │
│  │ - CORS           │  │ - Landing pages  │                                 │
│  │ - Routing        │  │ - Marketing      │                                 │
│  │ - Premium proxy  │  │                  │                                 │
│  └────────┬─────────┘  └──────────────────┘                                 │
│           │                                                                  │
│           │         ┌──────────────────┐                                     │
│           └────────►│ Static JSON API  │                                     │
│                     │ (CF Pages)        │                                    │
│                     │ - questions/      │                                    │
│                     │ - Free tier       │                                    │
│                     └──────────────────┘                                    │
└─────────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                            SUPABASE                                          │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │ questions        │  │ users            │  │ API commerce     │          │
│  │ (preguntas meta) │  │ (auth + profiles)│  │ api_keys/usage   │          │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘          │
│                                                                              │
│  ┌──────────────────────────────────────────────────────────────────┐      │
│  │ Edge Functions (saberparatodos/supabase/functions/)             │      │
│  │ - get-questions - get-questions-bulk - api-gateway - generate-key│      │
│  └──────────────────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          AI SERVICES                                         │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐          │
│  │ Gemini API        │  │ Claude (Codex)  │  │ Question Gen     │          │
│  │ (Generation)      │  │ (Code review)   │  │ (kimi-k2.5)      │          │
│  └──────────────────┘  └──────────────────┘  └──────────────────┘          │
└─────────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          QUESTION BANK                                       │
│                                                                              │
│  questions_data/                                                            │
│  ├── colombia/        # ~200 bundles, ACTIVO                                │
│  │   ├── matematicas/                                                       │
│  │   ├── lectura-critica/                                                   │
│  │   ├── ciencias-naturales/                                               │
│  │   ├── sociales-ciudadanas/                                               │
│  │   ├── ingles/                                                           │
│  │   └── preuniversitario/                                                 │
│  ├── mexico/         # EN DESARROLLO                                        │
│  ├── argentina/       # PLANEADO                                            │
│  ├── chile/          # PLANEADO                                             │
│  ├── peru/           # PLANEADO                                             │
│  └── brasil/         # PLANEADO                                             │
│                                                                              │
│  Formato: Bundles markdown con frontmatter (MASTERY format)                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Key Components

### 1. API Gateway (`apps/worldexams-api/`)
- **Responsabilidad:** Routing de requests, rate limiting, CORS
- **Tecnología:** Cloudflare Workers, TypeScript
- **Puerto:** 8787 (local), desplegado en Cloudflare
- **Dependencias:** Supabase (auth), Static JSON API

### 2. Question Bank (`questions_data/`)
- **Responsabilidad:** Almacenamiento de preguntas en formato markdown
- **Formato:** Bundles con frontmatter YAML + contenido estructurado
- **Estructura:**
  - País → Asignatura → Grado → Periodo → Tema → [bundle].md
- **Metadata en frontmatter:**
  ```yaml
  id: "CO-MAT-11-P1-funciones-001-MASTERY"
  country: "colombia"
  grado: 11
  asignatura: "matematicas"
  tema: "funciones"
  periodo: 1
  bundle_size: 20
  alignment: "ICFES Saber 11 + MEN"
  competencia_icfes: "..."
  ```

### 3. Question Generator (`src/question-generator/`)
- **Responsabilidad:** Generación automatizada de preguntas con IA
- **Servicios:**
  - `generate.service.ts` - Genera preguntas usando Gemini
  - `evaluate.service.ts` - Evalúa calidad (clarity, difficulty, accuracy)
- **Output:** Bundles en formato MASTERY

### 4. Review System (`skills/worldexams-question-reviewer/`)
- **Responsabilidad:** Validación automática de calidad de bundles
- **Workflow:**
  1. Revisa 10 bundles por tanda (cada 6 horas)
  2. Aplica checklist de 12 checks por pregunta
  3. Si 2+ errores → REGENERAR_BUNDLE
  4. Guarda historial en Supabase + archivos locales
- **Script:** `scripts/review-bundle.ts`

### 5. Supabase Backend
- **Responsabilidad:** Database, Auth, Edge Functions
- **Tablas principales:**
  - `questions` - Metadata de preguntas
  - `users` - Auth y profiles
  - `sessions` - Sesiones de quiz
  - `results` - Resultados por usuario
- **Premium/API commerce:** `organizations`, `organization_members`, `api_keys`, `usage_logs`
- **Edge Functions (fuente canónica):** `saberparatodos/supabase/functions/`

### 6. Saberparatodos Product (`saberparatodos/`)
- **Responsabilidad:** Producto reutilizable para exámenes
- **Tecnología:** Astro SSR sobre Cloudflare Workers
- **Deploy:** `wrangler deploy --config dist/server/wrangler.json --name=saberparatodos`

---

## Data Flow

### Flujo 1: Usuario consume preguntas gratis
```
1. User → Frontend (saberparatodos.space)
2. Frontend → API Gateway (/v1/questions?country=CO&grade=11)
3. API Gateway → Static JSON API (Cloudflare Pages)
4. Static JSON API → questions_data/colombia/matematicas/grado-11/
5. Return JSON con máximo 10 preguntas
```

### Flujo 2: Usuario premium consume preguntas
```
1. User → Frontend (con API key)
2. Frontend/API client → apps/worldexams-api (/v1/premium/questions)
3. worldexams-api → api-gateway (Supabase Edge Function)
4. api-gateway → valida API key en api_keys y registra usage_logs
5. api-gateway → obtiene preguntas desde packs semanales
6. Return preguntas según tier, quota y rate limit
```

### Flujo 3: Generación de nuevas preguntas
```
1. Agent → Generate Service (tema, grado, país)
2. Generate Service → Gemini API (prompt con contexto curricular)
3. Gemini API → Raw questions JSON
4. Evaluate Service → Quality check
5. Save → questions_data/[country]/[asignatura]/[tema]/bundle.md
```

### Flujo 4: Revisión automática de calidad
```
1. Cron Job (cada 6h) → Lanza sub-agente
2. Sub-agente → review-bundle.ts (10 bundles)
3. review-bundle.ts → Parse bundle + validate
4. If errors >= 2 → Create regeneration brief
5. Save → .worldexams/revision-history/[bundle]/[revision].json
6. Send report → Telegram CEO
```

---

## Security Considerations

### Rate Limiting
- **Guest:** 100 requests/hora
- **Free plan:** 10 preguntas/hora
- **Pro:** 60 requests/min
- **Enterprise:** 300 requests/min

### API Keys (Premium activo)
- Hash SHA-256 para storage
- Prefijo visible para identificación: `wx_xxxx`
- Rate limits por key

### CORS
-Actualmente: `*` (demasiado permisivo)
-Recomendado: `https://saberparatodos.space`, `https://www.saberparatodos.space`

### Secrets
- ❌ NUNCA publicar `SUPABASE_SERVICE_ROLE_KEY`
- ✅ Usar `SUPABASE_URL` + `SUPABASE_ANON_KEY` en frontend
- ✅ Rate limits en Edge Functions

---

## Multi-Country Strategy

**Monorepo con lógica compartida:**
- UI base: `saberparatodos/src/`
- Config: `config/countries.config.ts`
- Contenido: `questions_data/[country]/`
- Branding: Paletas de colores por país

**Países soportados:**
| País | Código | Examen | Estado |
|------|--------|--------|--------|
| Colombia | CO | ICFES Saber | ✅ ACTIVO |
| México | MX | COMIPEMS/PLANEA | 🔄 EN DESARROLLO |
| Argentina | AR | APRENDER | 📋 PLANEADO |
| Chile | CL | PSU/PDT | 📋 PLANEADO |
| Perú | PE | ECE | 📋 PLANEADO |
| Brasil | BR | ENEM | 📋 PLANEADO |

---

## Future Architecture (Optional)

```
Ideas futuras válidas, no implementadas:
- worker premium separado
- billing Stripe completo
- catálogo de preguntas premium exclusivas
- tabla `premium_questions`
```

---

## ADR (Architecture Decision Records)

| ID | Decision | Date | Status |
|----|----------|------|--------|
| ADR-001 | Usar Cloudflare Workers para API | 2026-03 | Accepted |
| ADR-002 | Formato MASTERY para bundles | 2026-03 | Accepted |
| ADR-003 | Monorepo single-repo | 2026-03 | Accepted |
| ADR-004 | Preguntas en markdown + JSON API | 2026-03 | Accepted |
| ADR-005 | Revisión automática con sub-agentes | 2026-04 | Accepted |

---

*Last updated: 2026-04-02*
*Auto-generated by GitCore Auto-Maintainer*
