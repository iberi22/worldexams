# Interfaces del Sistema

**Proyecto:** WorldExams
**Versión:** 3.0
**Fecha:** 2026-07-28

---

## Interfaces de Usuario (Frontend)

### SaberParaTodos (saberparatodos.space)

| Pantalla | Descripción | Tech | Estado |
|----------|-------------|------|--------|
| Home/Landing | Página principal con selector de país y grado | Astro + TailwindCSS | ✅ Activo |
| Examen | Simulacro de preguntas con temporizador | Astro SSR + React | ✅ Activo |
| Resultados | Dashboard de resultados por intento | Astro + Chart.js | ✅ Activo |
| Preparación | Guías de estudio por país y materia | Astro + MDX | ✅ Activo |
| Premium | Portal de gestión de API Keys y suscripción | Astro + Supabase | ✅ Activo |
| Admin | Panel de administración de contenido | Astro + RLS | 🔄 Desarrollo (feat-admin-ui 20%) |

### WorldExams Landing (worldexams.com)

| Pantalla | Descripción | Tech | Estado |
|----------|-------------|------|--------|
| Landing global | Presentación multi-país del producto | Astro | ✅ Activo |
| Página por país | Landing localizada por país (CO, MX, AR, etc.) | Astro + i18n | ✅ Activo |
| Blog/Recursos | Contenido educativo y novedades | Astro + MDX | 🔄 Desarrollo (BlogView implementado; contenido parcial — ver features.json) |

---

## Interfaces de API

### Endpoints Públicos (Free Tier)

| Método | Endpoint | Descripción | Auth | Rate Limit |
|--------|----------|-------------|------|-----------|
| GET | `/v1/questions` | Obtener preguntas gratis | None (guest) | 10 req/min, 100 req/hora |
| GET | `/v1/packs/{country}-week-{N}-grade-{G}-subject-{S}.json` | Packs semanales estáticos | None | Ilimitado (CDN) |

### Endpoints Premium

| Método | Endpoint | Descripción | Auth | Rate Limit |
|--------|----------|-------------|------|-----------|
| GET | `/v1/premium/questions` | Preguntas premium con cuotas | API Key | Según tier |
| POST | `/v1/analyze` | Analizar respuestas con IA | API Key | Según tier |

### Edge Functions (Supabase)

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| GET | `/functions/v1/get-questions` | Backend público de preguntas | Bearer anon o sesión |
| GET | `/functions/v1/get-questions-bulk` | Obtención masiva de preguntas | API Key |
| GET | `/functions/v1/api-gateway` | Enforcement premium | API Key |
| POST | `/functions/v1/generate-key` | Emisión de API Keys | Sesión autenticada |

### Query Parameters Comunes

| Parámetro | Tipo | Obligatorio | Descripción | Ejemplo |
|-----------|------|-------------|-------------|---------|
| `country` | string | Sí | Código ISO del país (2 chars) | `co`, `mx`, `ar` |
| `grade` | integer | Sí | Grado escolar | `6`, `11` |
| `subject` | string | Depende | Asignatura | `matematicas`, `lengua` |
| `limit` | integer | No | Máximo de preguntas | `10` (default), `50` (premium) |
| `week` | string | No | Semana específica | `W01`, `W14` |
| `difficulty` | string | No | Rango D3-D10 | `D3` |

---

## Integraciones Externas

| Sistema | Tipo | Propósito | Estado |
|---------|------|-----------|--------|
| Gemini API | REST API | Generación de preguntas con IA | ✅ Activo |
| Claude API | REST API | Revisión y validación de bundles | ✅ Activo |
| Supabase | PostgreSQL + Edge Functions | Base de datos, auth, API gateway | ✅ Activo |
| Cloudflare Workers | Edge Runtime | API Gateway y hosting | ✅ Activo |
| Cloudflare Pages | Static Hosting | Landing sites y packs JSON | ✅ Activo |
| Telegram Bot | Bot API | Notificaciones y reportes automáticos | ✅ Activo |
| GitHub Actions | CI/CD | Tests E2E y validaciones | ✅ Activo |
| Jules Agent | Google Agent | Generación autónoma de bundles | ✅ Activo |

### Diagrama de Integraciones

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│  Gemini AI   │────▶│   Claude AI  │────▶│  Jules Agent │
│ (Generation) │     │  (Review)    │     │ (Autonomous) │
└──────┬───────┘     └──────┬───────┘     └──────┬───────┘
       │                    │                     │
       ▼                    ▼                     ▼
┌──────────────────────────────────────────────────────┐
│                 questions_data/ bundles .md           │
│          (Git push → npm run validate → PR)          │
└──────────────────────┬───────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────┐
│          generate-static-packs.js → .json            │
│          (Cloudflare Pages public dir)               │
└──────────────────────┬───────────────────────────────┘
                       │
                       ▼
               ┌───────────────┐
               │  API Gateway  │
               │  (Worker)     │
               └───────┬───────┘
                      ╱╲
                     ╱  ╲
                    ╱    ╲
                   ▼      ▼
          ┌──────────┐ ┌──────────┐
          │  Free     │ │ Premium  │
          │ (Static)  │ │ (Supabase│
          │           │ │ + Worker)│
          └──────────┘ └──────────┘
```

---

## Interfaces Internas (entre componentes)

| Origen | Destino | Protocolo | Datos | Frecuencia |
|--------|---------|-----------|-------|-----------|
| Generator Service | Gemini API | HTTPS/REST | Prompt + contexto curricular | Por demanda |
| Review System | Claude API | HTTPS/REST | Bundle markdown + checklist | Cada 6h |
| Review System | Supabase | HTTPS/REST | Historial de revisiones | Cada 6h |
| API Gateway | Supabase | HTTPS/REST | Auth + API keys + usage | Por request |
| API Gateway | Static JSON | HTTPS/HTTP2 | Packs de preguntas | Por request |
| Deploy Script | Cloudflare API | HTTPS/REST | Wrangler deploy | Manual |

---

*Actualizado: 2026-07-28*
