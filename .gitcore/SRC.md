# SRC.md - WorldExams (SWAL Node)

> **Parte del ecosistema SWAL — Software Agentic Layer**
> Proyecto multi-país de exámenes educativos. Monorepo Node.js + Supabase.
>
> 📍 **Actualizado:** 2026-07-28
> **Repositorio:** https://github.com/iberi22/worldexams
> **Protocolo:** GitCore v3.8 · MASTERY v5.2

---

## Estructura Actualizada

```
worldexams/
├── apps/
│   ├── landing-worldexams/   # Landing page (Astro)
│   └── worldexams-api/       # API pública (Hono/Cloudflare)
├── saberparatodos/           # App principal de evaluaciones (SvelteKit)
├── questions_data/           # Banco de preguntas (fuente de verdad en .md)
│   ├── colombia/
│   ├── mexico/
│   ├── peru/
│   ├── ecuador/
│   ├── chile/
│   ├── argentina/
│   ├── brasil/
│   ├── uruguay/
│   ├── paraguay/
│   ├── bolivia/
│   ├── costa-rica/
│   ├── el-salvador/
│   └── honduras/
├── docs/
│   ├── SRS/                  # Software Requirements Specification
│   ├── SWAL/                 # Documentación del ecosistema SWAL
│   └── agent-docs/          # Documentación para agentes
├── scripts/                  # Scripts de automatización (solo .mjs/.sh)
├── services/                 # Microservicios
│   └── social-orchestrator/  # Servicio Rust (social media)
├── skills/                   # Skills de agente (bundle-creator, etc.)
├── tools/                    # Herramientas CLI
├── supabase/                 # Configuración Supabase (legacy/migratorio)
├── config/                   # Configuraciones compartidas
├── tests/                    # Suite E2E (Playwright)
├── .gitcore/                 # GitCore protocol v3.8
│   ├── SRC.md               # Este archivo
│   ├── ARCHITECTURE.md       # Arquitectura
│   ├── features.json         # Features activas
│   ├── detailsFeatures.json  # Detalle técnico de features
│   ├── planning/             # Planificación
│   └── scripts/              # Scripts GitCore
├── features.json             # Feature flags maestro
├── README.md
├── ROADMAP.md
├── RULES.md
└── AGENTS.md
```

---

## Módulos

### apps/worldexams-api
- **Estado:** ACTIVE
- **Propósito:** Cloudflare Worker API Gateway para preguntas
- **Tecnología:** TypeScript, Hono.js, Cloudflare Workers, Wrangler
- **Entry:** `apps/worldexams-api/src/index.ts`
- **Endpoints:**
  - `GET /v1/questions` — Preguntas gratuitas
  - `GET /v1/premium/questions` — Preguntas premium (API Key)
  - `POST /v1/analyze` — Analizar respuestas (API Key)

### apps/landing-worldexams
- **Estado:** ACTIVE
- **Propósito:** Landing page multi-país de WorldExams
- **Tecnología:** Astro, TailwindCSS

### saberparatodos
- **Estado:** ACTIVE
- **Propósito:** Aplicación principal de evaluaciones (SvelteKit)
- **Tecnología:** SvelteKit, Supabase Auth + DB
- **Edge Functions canónicas:** `saberparatodos/supabase/functions/`
  - `get-questions` — Backend público
  - `get-questions-bulk` — Consultas masivas
  - `api-gateway` — Enforcement premium
  - `generate-key` — Emisión de API keys

### questions_data
- **Estado:** ACTIVE
- **Propósito:** Banco de preguntas en formato markdown (fuente de verdad)
- **Formato:** Bundles MASTERY v5.2 con frontmatter YAML
- **Países con contenido:** CO, MX, AR, BR, CL, PE, EC, UY, PY, BO, CR, SV, HN y más
- **Protocolo:** v5.2 (WEEKLY + MASTERY bundles)

### skills/
- **Estado:** ACTIVE
- **Propósito:** Comportamientos especializados para agentes IA
- **Skills principales:**
  - `bundle-creator/rules/` — Reglas de generación por país
  - `worldexams-bundle-generator/` — Generación MASTERY v5.2
  - `worldexams-quality-review/` — Revisión automática de calidad

### scripts/
- **Estado:** ACTIVE
- **Propósito:** Automatización de pipelines de contenido
- **Scripts clave:**
  - `validate-bundles-v52.mjs` — Validador estricto v5.2
  - `audit-country-readiness.mjs` — Auditoría de readiness por país
  - `generate-static-packs.js` — Publicación de packs JSON
  - `review-bundle.ts` — Revisión de bundles

### tests/
- **Estado:** NEEDS MAINTENANCE
- **Propósito:** Tests E2E con Playwright
- **Nota (2026-07-28):** vitest y playwright están rotos en el checkout actual (dependencias/config no resuelven); 48 tests E2E declarados no ejecutables localmente. Issue #408 — cobertura ~20%, meta 70%. Ver `feat-tests` en features.json.

### services/social-orchestrator
- **Estado:** ACTIVE
- **Propósito:** Automatización de redes sociales
- **Tecnología:** Rust

---

## Tech Stack

| Capa | Tecnología | Versión |
|------|------------|---------|
| **Runtime** | Node.js | 22+ |
| **Frontend (app principal)** | SvelteKit | — |
| **Frontend (landing)** | Astro + TailwindCSS | 5.x |
| **API** | Hono.js + Cloudflare Workers | ES2022 |
| **Database** | Supabase (Postgres + Auth) | 15.x |
| **Testing** | Playwright E2E, Vitest | latest |
| **CI/CD** | GitHub Actions | — |
| **AI Generation** | Gemini API + Claude | — |
| **Agentes de Contenido** | Jules AI agent (protocol v5.2) | — |
| **Agentic Layer** | SWAL ecosystem via Xavier mesh | — |
| **Content Generation** | Jules AI agent, protocol v5.2 MASTERY bundles | — |
| **Hosting** | Cloudflare Pages + Workers | — |
| **Monitoreo** | Telegram Bot API | — |
| **Memoria persistente** | Xavier (http://192.168.1.2:8006) | — |

---

## Build & Deploy

```bash
# Development
npm run dev                    # Landing
npm run dev:saberparatodos     # App principal
npm run dev:worldexams-api     # API

# Build
npm run build                  # Todo
npm run build:workspaces       # Todos los workspaces

# Validate
npm run validate               # Validar bundles v5.2
npm run audit:country-readiness -- --json  # Auditoría por país
npm run test:e2e               # Tests E2E

# Lint
npm run lint                   # ESLint + Prettier

# Deploy API
cd apps/worldexams-api
npx wrangler deploy
```

---

## Países Activos (auditado 2026-07-28)

Bundles canónicos en `questions_data/{country}/{subject}/grado-*/2026/weekly/`:

| País | Código | Bundles canónicos | Estado |
|------|--------|-------------------|--------|
| Colombia | CO | 2447 | ✅ Producción (ready) |
| Costa Rica | CR | 200 | ⚠️ legacy_or_invalid (mayoría dummy placeholders) |
| Honduras | HN | 200 | 🟡 validated_not_published |
| Argentina | AR | 66 | 🚧 En desarrollo |
| Chile | CL | 50 | 🚧 En desarrollo (producción parcial G11 inglés) |
| México | MX | 40 | 🚧 Piloto (issues #808-816 wave0) |
| Perú | PE | 21 | 🚧 En desarrollo |
| España | ES | 20 | 🚧 En desarrollo |
| Ecuador | EC | 12 | 🚧 En desarrollo |
| Brasil | BR | 11 | 🚧 En desarrollo |
| Panamá | PA | 10 | 🚧 En desarrollo |
| Guatemala | GT | 10 | 🚧 En desarrollo |
| Rep. Dominicana | DO | 10 | 🚧 En desarrollo |
| Nicaragua | NI | 10 | 🚧 En desarrollo |
| Guinea Ecuatorial | GQ | 10 | 🚧 En desarrollo |
| Bolivia | BO | 1 | ⚪ Planeado |
| El Salvador | SV | 0 | ⚪ Planeado (legacy_or_invalid) |
| Puerto Rico | PR | 0 | ⚪ Planeado (legacy_or_invalid) |
| Uruguay | UY | 0 | ⚪ Planeado (solo legacy G11, canonical weekly = 0) |
| Paraguay | PY | 0 | ⚪ Planeado (solo legacy G11, canonical weekly = 0) |

Packs JSON publicados: 4868 en `apps/worldexams-api/public/v1/packs`.
KPI country-readiness: 0/20 países con 2000 preguntas publicadas.

---

## Entry Points

| Componente | Entry Point | Comando |
|-----------|------------|---------|
| API Gateway | `apps/worldexams-api/src/index.ts` | `wrangler deploy` |
| Landing | `apps/landing-worldexams/src/pages/index.ts` | `npm run dev` |
| SaberParaTodos | `saberparatodos/src/pages/index.ts` | `npm run dev:saberparatodos` |
| Review Script | `scripts/review-bundle.ts` | `node scripts/review-bundle.ts --bundle=<path>` |
| Validate Bundles | `scripts/validate-bundles-v52.mjs` | `npm run validate` |
| Country Audit | `scripts/audit-country-readiness.mjs` | `npm run audit:country-readiness` |

---

## Environment Variables (no committear)

```bash
# API Keys
ANTHROPIC_API_KEY=sk-...
GEMINI_API_KEY=...
OPENAI_API_KEY=...

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=yyy
SUPABASE_SERVICE_ROLE_KEY=zzz

# Cortex / Xavier (Memory System)
CORTEX_URL=http://localhost:8003
CORTEX_TOKEN=dev-token

# Deploy
CLOUDFLARE_API_TOKEN=...
```

---

## Cross-references

| Documento | Ruta | Propósito |
|-----------|------|-----------|
| SRS (requisitos) | `docs/SRS/index.md` | Qué debe hacer el sistema |
| Arquitectura | `.gitcore/ARCHITECTURE.md` | Diagramas, data flows, ADRs |
| Planning | `.gitcore/planning/PLANNING.md` | Visión, prioridades, constraints |
| Tareas activas | `.gitcore/planning/TASK.md` | Tracking de tareas y progreso |
| Feature registry | `.gitcore/features.json` | Estado y % de cada feature |
| Feature details | `.gitcore/detailsFeatures.json` | Detalle por feature |
| Reglas de código | `RULES.md` | Convenciones, DoD, documentación |
| Instrucciones agentes | `AGENTS.md` | Protocolo v5.2 para bundles |
| Roadmap | `ROADMAP.md` | Visión a largo plazo |
| Memoria persistente | Xavier (http://192.168.1.2:8006) | Decisiones, sesiones, contexto |
| SWAL ecosystem | `docs/SWAL/` | Documentación SWAL |

---

*Mantenido por GitCore Auto-Maintainer · `gitcore-update` para refrescar*
*Última actualización: 2026-07-28*
