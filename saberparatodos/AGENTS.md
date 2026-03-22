# 🤖 SaberParaTodos Agent Deltas

Este archivo ya no redefine las reglas globales del repositorio.

## Autoridad

- La autoridad global vive en `../AGENTS.md`.
- La arquitectura global vive en `../.gitcore/ARCHITECTURE.md`.
- El routing global de agentes vive en `../.gitcore/AGENT_INDEX.md`.
- La estructura objetivo del repo y la migración a monorepo viven en:
  - `../docs/monorepo/MONOREPO_MIGRATION_PLAN.md`
  - `../docs/monorepo/REPO_MAP.md`
  - `../docs/monorepo/REPO_AUTHORITY_MATRIX.md`
- Este archivo solo agrega restricciones locales de `saberparatodos`.

## Contexto Local

- Producto: Colombia / ICFES / `SaberParaTodos`
- Stack: Astro 5 + Svelte 5 + TailwindCSS + Supabase + Cloudflare Workers SSR
- Deploy: manual por CLI

## Reglas Locales

### Frontend

- Respetar el lenguaje visual existente del producto.
- No usar `shared-components` como área editable si se declaran como inmutables en documentación futura.
- Mantener compatibilidad con mobile-first y accesibilidad.

### Preguntas y Contenido

- La estructura vigente de preguntas para Colombia sigue siendo la referencia operativa local.
- Mantener naming normalizado: minúsculas, sin tildes, con guiones.
- Aplicar contexto colombiano cuando la tarea toque contenido, UI o copy del producto.

### Supabase y Seguridad

- Nunca exponer `SUPABASE_SERVICE_ROLE_KEY` al cliente.
- Solo variables públicas seguras en frontend.
- Validar inputs antes de insertar o mutar datos.
- Tratar `supabase/functions/` dentro de este paquete como el árbol canónico para Edge Functions del producto.
- Tratar `../supabase/functions/` como legacy salvo instrucción explícita de migración o recuperación.
- Antes de deploys o auditorías de funciones, correr `pwsh -File ../scripts/audit-supabase-functions.ps1`.

### Deploy

- No crear flujos nuevos de GitHub Actions para deploy productivo.
- Preferir deploy manual por CLI y scripts del paquete.
- No usar `wrangler pages deploy` para producción de `saberparatodos`.
- El comando canónico es `npx wrangler deploy --config dist/server/wrangler.json --name=saberparatodos`.
- Antes de deployar, ejecutar `node scripts/normalize-wrangler-config.mjs`.
- El routing productivo esperado es por Worker routes en `saberparatodos.space/*` y `www.saberparatodos.space/*`.
- Si una doc histórica contradice esto, manda `../AGENTS.md` y `PROTOCOLO_DEPLOY_CLI.md`.
