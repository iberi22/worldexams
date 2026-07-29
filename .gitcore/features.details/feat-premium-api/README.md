# 🔒 feat-premium-api — API Premium

**Estado:** ✅ Activo | **Prioridad:** P0 | **Progreso:** 85%

## Descripción

API Premium con sistema de API Keys, cuotas por tier, rate limits y analytics de uso.
Soporta Free (10 req/min), Pro (60 req/min) y Enterprise (300 req/min).

## Componentes

| Componente | Archivo | Estado |
|-----------|---------|--------|
| API Gateway | `apps/worldexams-api/src/index.ts` | ✅ |
| Edge Function: api-gateway | `saberparatodos/supabase/functions/api-gateway/` | ✅ |
| Edge Function: generate-key | `saberparatodos/supabase/functions/generate-key/` | ✅ |
| Edge Function: get-questions | `saberparatodos/supabase/functions/get-questions/` | ✅ |
| Edge Function: get-questions-bulk | `saberparatodos/supabase/functions/get-questions-bulk/` | ✅ |
| Tabla: api_keys | Supabase | ✅ |
| Tabla: usage_logs | Supabase | ✅ |
| Tabla: organizations | Supabase | ✅ |
| CORS restringido | — | ⚠️ Pendiente (actualmente `*`) |
| Deploy Edge Functions corregidas | — | ⚠️ Pendiente |

## Endpoints

Ver `docs/SRS/INTERFACES.md` para lista completa de endpoints.

## Cross-references

- SRS: `docs/SRS/INTERFACES.md` (endpoints)
- SRS: `docs/SRS/DATABASE.md` (modelo de datos: api_keys, usage_logs, organizations)
- SRC: `.gitcore/SRC.md` (apps/worldexams-api)
- ARCHITECTURE: `.gitcore/ARCHITECTURE.md` (data flow premium)

---

*Ver también: [features.json](../features.json) | [TASK.md](../planning/TASK.md)*
