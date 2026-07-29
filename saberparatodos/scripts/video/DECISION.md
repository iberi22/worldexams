# video pipeline — DECISIÓN (F6)

Scripts CLI locales (Remotion, colas de trabajos, generación de tutoriales y videos por
pregunta). No son superficie de runtime de la PWA: los videos se consumen vía
`video-manifest` cuando existen, con estado "pendiente" en caso contrario.

Decisión: **tooling local opcional**. Se mantienen los scripts `npm run video:*` para
generación bajo demanda; no hay automatización CI (workflows deshabilitados por política
SWAL). La experiencia de examen nunca debe bloquearse por la ausencia de video.

Fecha: 2026-07-28.
