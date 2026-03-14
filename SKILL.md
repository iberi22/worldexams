# SKILL.md - WorldExams Video Quality Orchestrator (Jules)

Este skill extiende `AGENTS.md` para tareas de validacion/mejora de videos educativos (Protocol v4.1) y define un estandar operativo comun para agentes.

## Objetivo

Asegurar que cada video de pregunta:
- Sea vertical (`1080x1920`), entendible y profesional.
- Tenga explicacion pedagogica clara en menos de `60s` (recomendado `35s-55s`).
- Pase control visual por frames antes de escalar generacion/publicacion.

## Activacion

Usar este skill cuando una tarea incluya:
- `video`, `remotion`, `subtitulos`, `frames`, `qa visual`, `youtube shorts`, `reels`, `tiktok`.
- Validacion de calidad audiovisual o mejora de retencion.

## Lectura obligatoria previa

1. `AGENTS.md` (raiz).
2. `docs/VIDEO_V41_PIPELINE.md`.
3. `saberparatodos/video-pipeline/README.md`.
4. `saberparatodos/scripts/video/generate-videos-fallback.py` (o pipeline activo equivalente).
5. `saberparatodos/tests/video-frame-review.spec.ts`.

## Fuentes estandar externas (base tecnica)

1. Jules - correr tareas desde GitHub Issues:  
   `https://jules.google/docs/running-tasks/#starting-tasks-from-github-issues`
2. Remotion (compositions/timeline/captions):  
   `https://www.remotion.dev/docs`
3. WhisperX (word-level timing/alignment):  
   `https://github.com/m-bain/whisperX`
4. Coqui XTTS v2 (voz/clonacion local):  
   `https://docs.coqui.ai/en/latest/models/xtts.html`
5. YouTube Data API uploads (publicacion controlada):  
   `https://developers.google.com/youtube/v3/guides/uploading_a_video`

## Flujo operativo obligatorio

1. `Scope control`
- Trabajar solo con un lote pequeno inicial (`3` videos, max `5`) hasta aprobar calidad.
- No escalar lotes sin validacion visual.

2. `Generacion`
- Mantener formato vertical y branding WorldExams/SaberParaTodos.
- Explicacion en pasos (no bloque unico de texto).
- Duracion dinamica pedagogica `< 60s`.

3. `QA visual por frames`
- Ejecutar E2E de frames con Playwright.
- Generar reporte JSON para analisis LLM.
- Revisar legibilidad, jerarquia, continuidad visual y claridad matematica.

4. `Gate de calidad`
- Si falla legibilidad o continuidad, refinar plantilla y regenerar solo lote pequeno.
- Publicar/encolar solo cuando el gate sea aprobado.

## Criterios de aceptacion de video

Un video pasa si cumple todo:
- Texto legible en mobile (sin simbolos corruptos, sin recorte de lineas criticas).
- Estructura clara: intro -> pasos -> verificacion -> CTA.
- Consistencia visual de marca (color, tipografia, layout).
- Subtitulos/timing alineados de forma razonable.
- Duracion entre `35s` y `55s` (si el problema es simple, minimo `30s`).

## Norma de reportes tecnicos

Cada ejecucion debe dejar:
- Resumen: videos procesados, aprobados, rechazados.
- Evidencia: rutas de `mp4`, capturas de frames, `report.json`.
- Problemas: lista de hallazgos por severidad.
- Cambios aplicados: archivos tocados y decisiones de diseno.

Formato minimo:
- `Estado`
- `Resultados QA`
- `Problemas`
- `Acciones tomadas`
- `Siguiente lote`

## Norma de notificacion para agentes

- Notificar al iniciar lote, al terminar QA y antes de escalar volumen.
- Si hay bloqueo (archivo lock, codec, auth, API), detener escalado y reportar.
- Nunca asumir calidad por render exitoso; siempre validar frames.

## Restricciones criticas

- No exponer secretos/API keys en frontend.
- No usar GitHub Actions para deploy en este proyecto (seguir `AGENTS.md`).
- No generar masivo sin gate de calidad aprobado.

## Comandos referencia

```powershell
cd saberparatodos
npm run video:generate:fallback -- --job="<path-job>.json" --force
$env:CI='1'; npx playwright test tests/video-frame-review.spec.ts
```
