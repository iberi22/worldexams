# Visión General de Arquitectura

**Proyecto:** WorldExams  
**Fecha:** 2026-04-02  
**Versión:** 2.0

---

## Arquitectura del Sistema

WorldExams es una plataforma SaaS de simulación de exámenes que utiliza:

- **Cloudflare Workers + Pages** para el frontend y API
- **Supabase** para base de datos, auth y Edge Functions
- **TypeScript** en todo el stack
- **Monorepo** para compartir lógica entre países

---

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────────────┐
│                              USERS                                       │
│   Estudiante ──────► Web App ──────► Mobile App ──────► API Client      │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         CLOUDFLARE EDGE                                 │
│                                                                          │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │  Cloudflare Pages                                                │  │
│   │  ├── saberparatodos.space (Astro SSR)                          │  │
│   │  ├── worldexams.com (Landing)                                   │  │
│   │  └── Static JSON API (questions_data)                          │  │
│   └─────────────────────────────────────────────────────────────────┘  │
│                                                                          │
│   ┌─────────────────────────────────────────────────────────────────┐  │
│   │  Cloudflare Workers                                             │  │
│   │  └── worldexams-api (routing, CORS, proxy premium/public)       │  │
│   └─────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                           SUPABASE                                       │
│                                                                          │
│   PostgreSQL + Auth + Realtime + Edge Functions                         │
│                                                                          │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐       │
│   │ questions       │  │ users           │  │ sessions         │       │
│   │ metadata        │  │ profiles        │  │ quiz sessions    │       │
│   └──────────────────┘  └──────────────────┘  └──────────────────┘       │
│                                                                          │
│   ┌──────────────────────────────────────────────────────────────────┐  │
│   │ Edge Functions (fuente canónica: saberparatodos/supabase/)       │  │
│   │ • get-questions • get-questions-bulk • api-gateway • generate-key│  │
│   └──────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         AI SERVICES                                      │
│                                                                          │
│   ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐       │
│   │ Gemini           │  │ Claude (Codex)   │  │ kimi-k2.5        │       │
│   │ (generación)     │  │ (code review)    │  │ (sub-agents)     │       │
│   └──────────────────┘  └──────────────────┘  └──────────────────┘       │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         QUESTION BANK                                    │
│                                                                          │
│   questions_data/                                                        │
│   ├── colombia/     (~200 bundles)  ✅ ACTIVO                           │
│   ├── mexico/       (en desarrollo) 🔄                                   │
│   ├── argentina/    (planeado)     📋                                    │
│   ├── chile/        (planeado)     📋                                    │
│   ├── peru/         (planeado)     📋                                    │
│   └── brasil/       (planeado)     📋                                    │
│                                                                          │
│   Formato: Markdown bundles con frontmatter YAML                         │
│   Contenido: 10-20 preguntas por bundle                                 │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Componentes Principales

| Componente | Tecnología | Responsabilidad | Estado |
|------------|-----------|----------------|--------|
| **Frontend (Landing)** | Astro | Marketing, landing pages | ✅ Activo |
| **Frontend (Producto)** | Astro SSR | Quiz interactivo, UI de exámenes | ✅ Activo |
| **API Gateway** | Cloudflare Worker | Routing, rate limiting, CORS | ✅ Activo |
| **Premium API** | Worker + Supabase Functions | API keys, quotas, rate limits | ✅ Activo |
| **Static API** | Cloudflare Pages | Preguntas gratuitas JSON | ✅ Activo |
| **Database** | Supabase PostgreSQL | Datos, auth, edge functions | ✅ Activo |
| **Question Generator** | TypeScript + Gemini | Generación automatizada | ✅ Activo |
| **Review System** | TypeScript + Sub-agents | Validación de calidad | ✅ Nuevo |

---

## Estado Operativo

- Premium API: implementada y validada a nivel de esquema, API keys y logging.
- Preproducción canónica para `saberparatodos`: `workers.dev` o entorno local; `page.dev` no aplica para el runtime SSR actual.
- Drift activo de deploy:
  - `generate-key` sí quedó actualizado en remoto.
  - `get-questions` y `api-gateway` siguen desfasadas en producción respecto al repo.
- Impacto actual:
  - `/v1/premium/questions` responde correctamente `401` sin API key.
  - `/v1/questions` sigue roto en producción hasta desplegar el Worker y las Edge Functions corregidas.
  - E2E local contra `apps/worldexams-api` ya no falla por auth pública; ahora falla por `404` aguas arriba en `get-questions`, que confirma drift remoto.

## Flujo de Datos Principal

### 1. Consumo de Preguntas (Gratis)
```
Usuario → Frontend → API Gateway → Static JSON → questions_data/*.json
         ←────────── JSON (≤10 preg) ──────────
```

### 2. Consumo de Preguntas (Premium)
```
Usuario/API client → worldexams-api → api-gateway → api_keys + usage_logs + packs
         ←────────── JSON (ilimitado según plan) ──────────
```

### 3. Generación de Preguntas
```
Agente IA → Question Generator → Gemini API → Bundle Markdown → questions_data/
                                                    ↓
                                           Review System (auto)
```

### 4. Revisión Automática
```
Cron (6h) → Sub-agent → review-bundle.ts → 10 bundles → Report + Regeneration
```

---

## Modelo de Datos Simplificado

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│   User      │       │  Session    │       │   Result    │
├─────────────┤       ├─────────────┤       ├─────────────┤
│ id          │──┐    │ id          │       │ id          │
│ email       │  │    │ user_id     │───────│ session_id  │
│ plan        │  │    │ country     │       │ question_id │
│ api_key     │  │    │ grade       │       │ answer      │
└─────────────┘  │    │ score      │       │ is_correct  │
                 │    │ started_at │       │ time_spent  │
                 │    └─────────────┘       └─────────────┘
                 │
                 ▼
┌─────────────┐       ┌─────────────┐
│ Question    │       │RevisionHist │
├─────────────┤       ├─────────────┤
│ id          │       │ bundle_id   │
│ bundle_id   │       │ errors      │
│ country     │       │ decision    │
│ grade       │       │ reviewer    │
│ quality_scr │       │ timestamp   │
└─────────────┘       └─────────────┘
```

---

## Seguridad

| Capa | Implementación |
|------|---------------|
| Rate Limiting | Cloudflare Worker (100 req/hr guest) |
| API Keys | SHA-256 hash + prefijo visible + tiers `free/pro/enterprise` |
| CORS | Por dominio (actual: `*` - needs fix) |
| Auth | Supabase Auth (magic link, Google) |
| RLS | Row Level Security en Supabase |

---

## Expansión Multi-País

```
┌─────────────────────────────────────────────────────────────┐
│                   MONOREPO SHARED LOGIC                     │
├─────────────────────────────────────────────────────────────┤
│  UI Components    │  Quiz Logic    │  Scoring System        │
│  (Astro/Tailwind) │  (TypeScript)  │  (multi-country)      │
├─────────────────────────────────────────────────────────────┤
│                    CONFIG BY COUNTRY                        │
├─────────────────────────────────────────────────────────────┤
│  config/countries.config.ts                                 │
│  • Colombia (CO)  • México (MX)  • Argentina (AR)          │
│  • Chile (CL)     • Perú (PE)    • Brasil (BR)              │
├─────────────────────────────────────────────────────────────┤
│                  CONTENT BY COUNTRY                         │
├─────────────────────────────────────────────────────────────┤
│  questions_data/[country]/[asignatura]/grado-N/            │
│  • Paleta de colores local                                  │
│  • Currículo nacional                                       │
│  • Examen de referencia                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Métricas del Sistema

| Métrica | Valor |
|---------|-------|
| Bundles Colombia | ~200 |
| Preguntas totales | ~4,000+ |
| Países activos | 1 (Colombia) |
| Países en desarrollo | 1 (México) |
| Tests E2E | 30 (16 fallando - necesita fix) |
| Premium API backend | Implementado, con drift de deploy |
| Uptime API | 99.9% (Cloudflare) |

---

## Roadmap Técnico

| Fase | Item | Prioridad | Estado |
|------|------|-----------|--------|
| 1 | Arreglar deploy de `/v1/questions` y CORS/API routing | 🔴 Alta | 🔄 En curso |
| 2 | Consolidar ownership premium backend | 🔴 Alta | 🔄 En curso |
| 3 | Revisión automática bundles | 🔴 Alta | ✅ Implementado |
| 4 | México curriculum SEP | 🟡 Media | 📋 Planeado |
| 5 | Argentina/Chile/Perú/Brasil | 🟢 Baja | 📋 Planeado |
| 6 | SDK cliente (npm) | 🟢 Baja | 📋 Ideado |
| 7 | Framework OSS | 🟢 Baja | 📋 Ideado |

---

*Última actualización: 2026-04-02*
