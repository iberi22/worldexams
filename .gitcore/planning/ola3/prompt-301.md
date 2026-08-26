Tarea WX-301 — Leaderboard red privada de NOTAS (D-103/D4)

REPO: /home/belal/proyectosSWAL/apps/worldexams (worktree wx/ola3-301)
LEE: AGENTS.md + src/lib/mesh/ (WX-204 crea el cliente de sync).

ISLA (SOLO): src/pages/leaderboard.astro, src/pages/ranking.astro, src/components/leaderboard/**

CONTEXTO (BR-03/BR-04/BR-06): Leaderboard es una RED PRIVADA DE NOTAS. Por protección de menores: la app queda EXCLUIDA de tokens $SWAL/karma/telemetría. Al instalar PWA y opt-in solo se comparten notas y promedios ANÓNIMOS (node_hash + subject + week + score + avg) con la red de worldexams. Nombre/puesto/métricas detalladas visibles SOLO en el dispositivo del propio nodo. Sin ancla de identidad en Supabase (solo agregados). Opt-in revocable (BR-06).

PASOS:
1. src/components/leaderboard/LeaderboardGlobal.astro: Muestra posiciones anónimas globales (solo hashes, sin nombres). Orden por avg score global. Tabla paginada (top 50). Datos vienen del mesh sync (WX-204 provee fetchAggregateStats()).
2. src/components/leaderboard/LeaderboardLocal.astro: Panel privado SOLO local (en el dispositivo): muestra nombre del propio nodo (customizable), subjects, rank local, score promedio. Datos de IndexedDB local + opt-in consent.
3. src/components/leaderboard/OptInManager.ts: Borde de privacidad: gestiona consentimiento (localStorage 'wx-opt-in' = true/false). Antes de enviar datos por mesh, verifica opt-in. revokeOptIn() limpia datos compartidos y envía señal de revocación.
4. src/pages/leaderboard.astro: Ruta /leaderboard, renderiza LeaderboardGlobal + LeaderboardLocal (condicional por opt-in).
5. src/pages/ranking.astro: Alias redirect a /leaderboard (para compatibilidad con enlaces existentes).
6. Tests: tests/leaderboard/OptInManager.test.ts (revocación efectiva), tests/leaderboard/LeaderboardGlobal.test.ts (renderiza tabla con datos mock).

CIERRE:
- git add src/pages/leaderboard.astro src/pages/ranking.astro src/components/leaderboard tests/leaderboard
- git commit -m "feat(leaderboard): ranking anónimo global + panel local privado + opt-in revocable BR-06 (#301)"
