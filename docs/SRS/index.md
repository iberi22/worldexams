# Software Requirements Specification (SRS)

**Proyecto:** WorldExams
**Versión:** 3.0
**Fecha:** 2026-07-24
**Estado:** ACTIVE

---

## Tabla de Contenidos

1. [REQUIREMENTS.md](REQUIREMENTS.md) — Requisitos Funcionales y Casos de Uso
2. [NON-FUNCTIONAL.md](NON-FUNCTIONAL.md) — Requisitos No Funcionales
3. [INTERFACES.md](INTERFACES.md) — Interfaces de Sistema y API
4. [DATABASE.md](DATABASE.md) — Modelo de Datos
5. [GLOSSARY.md](GLOSSARY.md) — Glosario de Términos

---

## Resumen Ejecutivo

WorldExams es una plataforma SaaS de simulación de exámenes educativos multi-país para Latinoamérica. Genera, valida y distribuye preguntas alineadas a currículos nacionales (ICFES Colombia, ENEM Brasil, EXANI México, etc.) mediante un pipeline automatizado de agentes de IA.

### Misión

Democratizar el acceso a contenido educativo de alta calidad para estudiantes de Latinoamérica, proporcionando simulacros de examen gratuitos y premium alineados a los currículos nacionales de cada país.

### Características Principales

| Feature | Descripción | Prioridad | Estado |
|---------|-------------|-----------|--------|
| Banco de preguntas multi-país | Bundles MASTERY + WEEKLY en markdown con frontmatter | 🔴 Crítica | 🟢 Activo |
| Generación IA con Gemini | Preguntas automáticas alineadas a currículos nacionales | 🔴 Crítica | 🟢 Activo |
| Revisión automática de calidad | Sub-agentes cada 6h con checklist de 12 checks | 🔴 Crítica | 🟢 Activo |
| API REST pública | Endpoints free + premium para consumo de preguntas | 🔴 Crítica | 🟢 Activo |
| Publicación a producción | Pipeline bundle .md → validar → JSON estático → deploy | 🔴 Crítica | 🟢 Activo |
| Multi-país | Soporte para CO, MX, AR, CL, PE, BR, y más | 🟡 Alta | 🟡 En desarrollo |
| Premium API | API Keys, cuotas, rate limits, analytics | 🟡 Alta | 🟢 Activo |
| Country Readiness Audit | Score de 2000 preguntas por país con dashboard | 🟡 Alta | 🟢 Activo |
| Monitoreo Telegram | Reportes automáticos de estado y alertas | 🔵 Media | 🟢 Activo |

---

## Documentación Relacionada

| Documento | Ubicación |
|-----------|-----------|
| Arquitectura del Sistema | `.gitcore/ARCHITECTURE.md` |
| Plan de Trabajo Activo | `.gitcore/planning/TASK.md` |
| Roadmap del Proyecto | `ROADMAP.md` |
| Reglas de Codificación | `RULES.md` |
| Feature Registry | `.gitcore/features.json` |
| Detalle de Features | `.gitcore/detailsFeatures.json` |

---

## Stack Tecnológico

| Capa | Tecnología | Versión |
|------|------------|---------|
| Frontend | Astro + TailwindCSS | 5.x |
| API Gateway | Cloudflare Workers | ES2022 |
| Database | Supabase PostgreSQL | 15.x |
| AI Generation | Gemini API + Claude | — |
| Agentes de Contenido | Jules (Google) | — |
| Hosting | Cloudflare Pages + Workers | — |
| Tests E2E | Playwright | latest |
| Validación | Protocolo v5.2 (npm run validate) | — |
| Monitoreo | Telegram Bot API | — |
| Despliegue | Wrangler CLI (manual) | — |

---

## Modelo de Negocio

### Tiered Access

| Plan | Precio | Requests/min | Preguntas/req | AI Analysis | Rate Limit |
|------|--------|-------------|---------------|-------------|------------|
| **Free** | $0 | 10 req/min | 10 | ❌ | 100 req/hora guest |
| **Pro** | Por organización | 60 req/min | 50 | Basic | API Key |
| **Enterprise** | Por organización | 300 req/min | 100 | Full | API Key |

### Monetización

- **API como producto**: Venta de acceso premium al banco de preguntas vía API Keys
- **White-label**: Licenciamiento a instituciones educativas y gobiernos
- **Freemium**: Captación con tier gratuito, conversión a planes pagos
- **País como unidad**: Expansión por país con metadata curricular específica

---

## Calidad de Servicio (SLAs)

| Métrica | Objetivo | Medición |
|---------|----------|----------|
| Uptime API | 99.9% | Uptime checks cada 5min |
| Latencia API p95 | <200ms | Cloudflare Analytics |
| Quality Score mínimo | >= 0.70 | evaluate.service.ts |
| Bundle Pass Rate | >= 80% | Revisión automática |
| Country Readiness | 2000 preguntas/pais | `audit:country-readiness` |
| Tiempo de generación | <30min por bundle | Pipeline tracking |

---

## Metadata

```yaml
project: "WorldExams"
version: "3.0"
created: "2026-03-13"
last_updated: "2026-07-24"
status: "ACTIVE"
repository: "https://github.com/iberi22/worldexams"
protocol_version: "5.2"
countries_active: ["CO", "MX", "UY", "PY", "CL"]
countries_planned: ["AR", "PE", "EC", "BR", "BO", "CR", "SV", "HN"]
total_bundles: 200+
total_skills: 12
```

---

*Documento generado y mantenido por GitCore Auto-Maintainer*
*Última actualización: 2026-07-24*
