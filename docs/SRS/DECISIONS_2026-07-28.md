# Decisiones de alcance — 2026-07-28 (F6)

## Admin UI (INTERFACES: "Desarrollo")

**Fuera de alcance del programa end-to-end actual.** No hay pantalla Admin en el tree de
`saberparatodos/src/pages` más allá de `/developers/*` (keys, docs, dashboard de uso).
El dashboard de developers cubre el caso operativo actual (API keys + métricas de uso).
Si se requiere un Admin de contenido/usuarios, se abrirá como feature nuevo con diseño propio.

## Blog/Recursos (INTERFACES: "Planeado")

**Cubierto parcialmente por `/novedades`** (content collections + `BlogView.svelte`) y la
tarjeta "Revisar" habilitada en home. No se construye un sitio de recursos separado;
si crece, se migra a content collections adicionales dentro de la PWA actual.

## question-generator (apps/worldexams-api)

Tooling offline, no superficie del Worker. Ver `apps/worldexams-api/src/question-generator/DECISION.md`.

## video pipeline y social-orchestrator

Tooling local opcional, fuera del camino crítico. Ver `DECISION.md` en cada carpeta.
