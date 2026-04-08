# SRC.md - Source Code Reference

**Project:** WorldExams
**Generated:** 2026-04-02
**Repository:** https://github.com/iberi22/worldexams
**Status:** ACTIVE

---

## Directory Structure

```
worldexams/
├── apps/                           # Aplicaciones desplegables
│   ├── worldexams-api/            # Cloudflare Worker API Gateway
│   │   ├── src/
│   │   │   ├── index.ts          # Entry point
│   │   │   └── question-generator/
│   │   ├── wrangler.toml
│   │   └── package.json
│   └── landing-worldexams/        # Landing site (worldexams.com)
│
├── saberparatodos/                 # Producto reutilizable (runtime)
│   ├── src/
│   │   ├── content/questions/    # Bundles de preguntas Colombia
│   │   └── lib/
│   ├── supabase/functions/        # Edge Functions (fuente canónica)
│   │   ├── get-questions/
│   │   ├── get-questions-bulk/
│   │   ├── api-gateway/
│   │   └── generate-key/
│   └── scripts/
│
├── questions_data/                 # Banco de preguntas (formato markdown)
│   ├── colombia/                  # Activo
│   │   ├── matematicas/
│   │   ├── lectura-critica/
│   │   ├── ciencias-naturales/
│   │   ├── sociales-ciudadanas/
│   │   ├── ingles/
│   │   ├── tecnologia-informatica/
│   │   └── preuniversitario/
│   ├── mexico/                   # Por desarrollar
│   ├── argentina/                 # Por desarrollar
│   ├── chile/                    # Por desarrollar
│   ├── peru/                     # Por desarrollar
│   └── brasil/                   # Por desarrollar
│
├── skills/                        # Skills de agentes IA
│   ├── math_short_remotion_architect/
│   ├── create_bundles_manually/
│   ├── colombia-assessment-protocol-v6/
│   └── worldexams-question-reviewer/  # NUEVO: Sistema de revisión
│
├── src/                           # Librerías compartidas
│   ├── lib/
│   │   └── telegram-renderer.ts
│   ├── middleware/
│   │   └── security.ts
│   └── question-generator/
│       ├── index.ts
│       ├── services/
│       │   ├── generate.service.ts
│       │   └── evaluate.service.ts
│       └── types/
│           └── question.types.ts
│
├── supabase/                      # Árbol legacy / migratorio
│   └── functions/                # Legacy - no usar para deploy activo
│
├── tests/                        # Suite E2E (Playwright)
│   ├── playwright.config.ts
│   ├── e2e-security-performance.test.ts
│   └── test-results/
│
├── docs/                         # Documentación del proyecto
│   ├── SRC/                      # Especificación de software
│   ├── ARCHITECTURE/             # Documentos de arquitectura
│   ├── specs/                    # Protocolos funcionales
│   ├── agent-docs/               # Docs para agentes
│   ├── monorepo/                 # Estrategia monorepo
│   └── reports/                  # Reportes de trabajo
│
├── .gitcore/                     # Gobernanza del repo
│   ├── ARCHITECTURE.md           # Arquitectura del sistema
│   ├── AGENT_INDEX.md            # Índice de agentes
│   ├── PLANNING.md               # Planificación activa
│   ├── STATE.md                  # Estado del proyecto
│   └── planning/                 # Protocolos de planning
│
├── scripts/                       # Scripts de automatización
│   └── review-bundle.ts          # NUEVO: Script de revisión
│
├── services/                      # Servicios externos
│   └── social-orchestrator/      # Servicio Rust (social media)
│
├── config/                        # Configuraciones
│
└── .env                          # Variables de entorno (NO publicAR)
```

---

## Modules

### apps/worldexams-api
- **Status:** ACTIVE
- **Purpose:** Cloudflare Worker que sirve como API Gateway para preguntas
- **Technology:** TypeScript, Cloudflare Workers, Wrangler
- **Entry:** `apps/worldexams-api/src/index.ts`

### apps/landing-worldexams
- **Status:** ACTIVE
- **Purpose:** Landing page principal de WorldExams
- **Technology:** Astro, TailwindCSS

### saberparatodos
- **Status:** ACTIVE
- **Purpose:** Runtime reutilizable del producto de exámenes
- **Technology:** Astro SSR sobre Cloudflare Workers

### questions_data
- **Status:** ACTIVE
- **Purpose:** Banco de preguntas en formato markdown
- **Format:** Bundles de 10-20 preguntas con frontmatter
- **Countries:** Colombia (activo), México/Argentina/Chile/Perú/Brasil (en desarrollo)

### skills
- **Status:** ACTIVE
- **Purpose:** Definiciones de comportamiento para agentes IA
- **Skills activos:**
  - `colombia-assessment-protocol-v6` - Protocolo de generación para Colombia
  - `worldexams-question-reviewer` - Sistema de revisión de calidad
  - `create_bundles_manually` - Creación manual de bundles
  - `math_short_remotion_architect` - Videos Remotion para explicaciones

### src/question-generator
- **Status:** ACTIVE
- **Purpose:** Agentes y servicios para generación de preguntas con IA
- **Services:**
  - `generate.service.ts` - Generación automática de preguntas
  - `evaluate.service.ts` - Evaluación de calidad de preguntas

### supabase
- **Status:** ACTIVE
- **Purpose:** Base de datos, Edge Functions, Auth
- **Edge Functions (fuente canónica):** `saberparatodos/supabase/functions/`
- **Nota:** `supabase/` raíz permanece como árbol legacy/migratorio

### tests
- **Status:** NEEDS MAINTENANCE
- **Purpose:** Tests E2E con Playwright
- **Issue:** 16/30 tests fallando (revisar suite)

### Premium backend
- **Status:** ACTIVE WITH DEPLOY DRIFT
- **Purpose:** API keys, quotas, rate limiting y acceso premium
- **Components:** `apps/worldexams-api`, `saberparatodos/supabase/functions/api-gateway`, `saberparatodos/supabase/functions/generate-key`
- **Issue:** `/v1/questions` sigue desalineado en producción hasta desplegar fixes de Worker y Edge Functions

---

## Build Commands

```bash
# Install dependencies (raíz)
npm install

# Build (worldexams-api)
cd apps/worldexams-api
npm run build

# Lint
npm run lint

# Test E2E
cd tests
npx playwright test

# Deploy API (CLI manual - NO GitHub Actions)
cd apps/worldexams-api
npx wrangler deploy
```

---

## Entry Points

| Component | Entry Point | Command |
|-----------|------------|---------|
| API Gateway | `apps/worldexams-api/src/index.ts` | `wrangler deploy` |
| Review Script | `scripts/review-bundle.ts` | `node scripts/review-bundle.ts --bundle=<path>` |
| Landing | `apps/landing-worldexams/src/pages/index.ts` | `npm run build` |
| Saberparatodos | `saberparatodos/src/pages/index.ts` | `wrangler deploy --config dist/server/wrangler.json` |

---

## Environment Variables

```bash
# API Keys
ANTHROPIC_API_KEY=sk-...
GEMINI_API_KEY=...
OPENAI_API_KEY=...

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=yyy
SUPABASE_SERVICE_ROLE_KEY=zzz

# Cortex (Memory System)
CORTEX_URL=http://localhost:8003
CORTEX_TOKEN=dev-token

# Deploy
CLOUDFLARE_API_TOKEN=...
```

---

## API Endpoints

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/v1/questions` | GET | None (guest) | Obtener preguntas gratis (límite 10) |
| `/v1/premium/questions` | GET | API Key | Preguntas premium con quotas y rate limits |
| `/functions/v1/get-questions` | GET | Bearer anon o sesión | Backend público en Supabase |
| `/functions/v1/api-gateway` | GET | API Key | Enforcement premium en Supabase |
| `/functions/v1/generate-key` | POST | Sesión autenticada | Emisión de API keys para organizaciones |
| `/v1/analyze` | POST | API Key | Analizar respuestas |

---

## Key Files

| File | Purpose |
|------|---------|
| `AGENTS.md` | Definición de roles y comportamiento de agentes |
| `skills/colombia-assessment-protocol-v6/SKILL.md` | Protocolo de generación Colombia |
| `skills/worldexams-question-reviewer/SKILL.md` | Sistema de revisión de bundles |
| `docs/specs/ACTIVE_PROTOCOLS.md` | Protocolos funcionales vigentes |
| `ARCHITECTURE_PREMIUM_API.md` | Diseño de API premium |

---

*Auto-generated by GitCore Auto-Maintainer*
*Last updated: 2026-04-02*
