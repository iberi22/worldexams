# Software Requirements Specification (SRC)

**Proyecto:** WorldExams  
**Versión:** 2.0  
**Fecha:** 2026-04-02  
**Estado:** ACTIVE

---

## Tabla de Contenidos

1. [REQUIREMENTS.md](REQUIREMENTS.md) - Requisitos Funcionales
2. [NON-FUNCTIONAL.md](NON-FUNCTIONAL.md) - Requisitos No Funcionales
3. [INTERFACES.md](INTERFACES.md) - Interfaces de Sistema
4. [DATABASE.md](DATABASE.md) - Modelo de Datos
5. [GLOSSARY.md](GLOSSARY.md) - Glosario de Términos

---

## Resumen Ejecutivo

WorldExams es una plataforma SaaS de simulación de exámenes que permite:

- **Generar** preguntas de alta calidad alineadas a currículos nacionales
- **Validar** contenido automáticamente mediante revisión de agentes
- **Distribuir** preguntas via API (gratis con límite, premium con suscripción)
- **Escalar** a múltiples países mediante configuración monorepo

### Características Principales

| Feature | Descripción | Prioridad |
|---------|-------------|-----------|
| Banco de preguntas | ~200 bundles en formato MASTERY | 🔴 Crítica |
| Generación IA | Preguntas automáticas con Gemini | 🔴 Crítica |
| Revisión automática | Validación con sub-agentes cada 6h | 🔴 Crítica |
| API REST | Endpoints para consumo de preguntas | 🔴 Crítica |
| Multi-country | Soporte para CO, MX, AR, CL, PE, BR | 🟡 Alta |
| Premium API | Acceso con API keys, cuotas y rate limits | ✅ Activo con consolidación |
| Framework OSS | Paquete npm para terceros | 📋 Ideado |

---

## Modelo de Negocio

### Tiered Access

| Plan | Precio | Requests | Preguntas/Request | AI Analysis |
|------|--------|-------------|-----------------|-------------|
| **Free** | $0 | 10 req/min | 10 | ❌ |
| **Pro** | Definido por organización | 60 req/min | 50 | Basic |
| **Enterprise** | Definido por organización | 300 req/min | 100 | Full |

### Monetización

- **API como producto**: Venta de acceso premium al banco de preguntas
- **White-label**: Licenciar tecnología a instituciones educativas
- **Freemium**: Captación con tier gratuito, conversión a paid

---

## Metadata

```yaml
project: "WorldExams"
version: "2.0"
created: "2026-03-13"
last_updated: "2026-04-02"
status: "ACTIVE"
repository: "https://github.com/iberi22/worldexams"
```

---

## Stack Tecnológico

| Capa | Tecnología |
|------|------------|
| Frontend | Astro, TailwindCSS |
| API Gateway | Cloudflare Workers |
| Database | Supabase PostgreSQL |
| AI Generation | Gemini API |
| AI Agents | Claude (Codex), kimi-k2.5 |
| Hosting | Cloudflare Pages + Workers |
| Monitoring | Telegram (reports) |

---

## Calidad de Servicio

| Métrica | Objetivo |
|---------|---------|
| Uptime | 99.9% |
| API Latency | <200ms p95 |
| Question Quality | qualityScore >= 0.70 |
| Bundle Pass Rate | >= 80% pass review |

---

*Documento generado y mantenido por GitCore Auto-Maintainer*
## Nota Operativa

- El backend premium real usa `worldexams-api` + `api-gateway` + `api_keys`/`usage_logs`.
- No existe hoy una tabla activa `premium_questions`.
- Hay drift de deploy pendiente en `/v1/questions` hasta desplegar las versiones corregidas de `worldexams-api`, `get-questions` y `api-gateway`.

*Última actualización: 2026-04-03*
