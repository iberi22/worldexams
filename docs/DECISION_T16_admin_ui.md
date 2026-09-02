# T16 — Decisión feat-admin-ui (20%) — Scope MVP

> **Fecha:** 2026-09-02
> **Autor:** Hermes Agent
> **Estado:** DECISIÓN — pendiente aprobación BELA

## Estado actual

| Aspecto | Valor |
|---|---|
| `saberparatodos/src/components/admin/` | 1 archivo: `MalocaAdminEmbed.svelte` |
| SRS lineamiento | "Panel de administración de contenido" (genérico) |
| Multi-país | implicado por SWAL (Maloca backoffice es admin general SWAL) |
| Auth | RLS ya configurado (Supabase) |
| feat-admin-ui progress | 20% |

## 3 scopes posibles (de menos a más)

### Scope A — Bundles CRUD mínimo (40% → 50%)
- Lista de bundles por país/grado/materia (tabla con filtros)
- Ver/editar 1 bundle individual (markdown editor)
- Buscar bundles por tema o ID
- **Esfuerzo:** 1 día (opencode mid)
- **Riesgo:** bajo

### Scope B — Bundles CRUD + métricas + alertas (50% → 75%)
- Todo de A +
- Dashboard: bundles por país, score de calidad (errores validate), bundles huérfanos
- Alertas Telegram si validate falla nightly
- Export CSV/MD de bundles
- **Esfuerzo:** 2-3 días
- **Riesgo:** medio

### Scope C — Backoffice SWAL completo (75% → 95%)
- Todo de B +
- Multi-app (saberparatodos + landing + worldexams-api)
- Gestión de usuarios (premium API keys, roles)
- Gestión de issues GH desde el panel
- Audit log + GDPR tools
- **Esfuerzo:** 1-2 semanas
- **Riesgo:** alto (requiere coordinación con `apps/swal-backoffice` que es multi-repo)

## Recomendación Hermes

**Scope A** es el sweet spot: bajo riesgo, alto valor (los creadores de contenido necesitan ver/editar bundles), no requiere coordinación cross-repo. Cubre el 80% de los casos de uso reales (editor revisa bundles generados por Jules).

## Acción requerida

Marca A, B, o C. Si no respondes en 24h, implemento Scope A por defecto.