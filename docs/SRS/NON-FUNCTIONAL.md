# Requisitos No Funcionales

**Proyecto:** WorldExams
**Versión:** 3.0
**Fecha:** 2026-07-10

---

## Rendimiento

| Métrica | Objetivo | Límite | Medición |
|---------|----------|--------|----------|
| Latencia API pública p95 | <200ms | <500ms | Cloudflare Analytics |
| Latencia API premium p95 | <150ms | <300ms | Cloudflare Analytics |
| Tiempo de generación de bundle | <30min | <60min | Pipeline tracking |
| Tiempo de validación (npm run validate) | <5s | <15s | CI log |
| Requests concurrentes free | 10 req/min | 30 req/min | API Gateway |
| Requests concurrentes premium | 60-300 req/min | según tier | API Gateway + usage_logs |

## Seguridad

| Requisito | Descripción | Estado |
|-----------|-------------|--------|
| Autenticación | Supabase Auth con magic links + OAuth | ✅ Implementado |
| API Keys | Hash SHA-256 para storage, prefijo `wx_xxxx` visible | ✅ Implementado |
| Rate Limiting | Por IP (guest) y por API Key (premium) | ✅ Implementado |
| CORS | Restringido a `saberparatodos.space` y `www.saberparatodos.space` | ⚠️ Pendiente (actualmente `*`) |
| Secrets | SUPABASE_SERVICE_ROLE_KEY nunca expuesto en frontend | ✅ Implementado |
| Encriptación | TLS 1.3 en todos los endpoints Cloudflare | ✅ Implementado |
| RLS (Row Level Security) | Políticas por organización en Supabase | ✅ Implementado |
| Git History | Limpieza de secrets expuestos en git history (#221) | 🔄 En progreso |

## Disponibilidad

| Métrica | Objetivo |
|---------|----------|
| Uptime API | 99.9% (8.76h downtime/año) |
| RTO (Recovery Time Objective) | 1 hora |
| RPO (Recovery Point Objective) | 15 minutos |
| Backup DB | Diario automatizado vía Supabase |
| SLA para partners premium | 99.5% |

## Escalabilidad

| Dimensión | Estrategia | Estado |
|-----------|-----------|--------|
| Contenido | Escritura directa a `questions_data/` + generación de packs JSON | ✅ Operacional |
| API free | Static JSON API en Cloudflare Pages (escalado automático) | ✅ Implementado |
| API premium | Cloudflare Workers con Supabase backend (escalado horizontal) | ✅ Implementado |
| Base de datos | Supabase PostgreSQL con índices + partitioning | ✅ Implementado |
| Multi-país | Monorepo con lógica compartida + config por país | ✅ Implementado |

## Mantenibilidad

| Práctica | Estado |
|----------|--------|
| Tests E2E (Playwright) | ✅ 48 tests |
| Validación de bundles (v5.2) | ✅ npm run validate |
| Pre-commit hooks | ✅ .pre-commit-config.yaml |
| CI/CD GitHub Actions | ✅ Activo |
| Revisión automática cada 6h | ✅ Activo |
| Documentación en .gitcore/ | ✅ Actualizada |
| Skills de agente (12 skills) | ✅ Activo |

## Portabilidad

- Bundles en formato markdown estándar con frontmatter YAML
- Packs JSON estáticos servidos desde CDN
- Sin dependencias de vendor lock-in (Cloudflare elegido por conveniencia, no por requisito)
- Supabase PostgreSQL exportable a cualquier PostgreSQL vanilla

---

*Actualizado: 2026-07-10*
