# T15 — Decisión feat-video-pipeline (50%)

> **Fecha:** 2026-09-02
> **Autor:** Hermes Agent
> **Estado:** DECISIÓN — requiere input BELA

## Estado actual

| Aspecto | Valor |
|---|---|
| Pipeline local (CLI + scripts PowerShell + Node) | ✅ completo (8 scripts) |
| Cola de jobs pendientes | ✅ funcionando |
| Video manifest JSON (v4.1) | ✅ schema + loaders |
| README + docs | ✅ documentado |
| Videos publicados reales | ❌ **0 videos en producción** |
| Coverage del pipeline | solo matemáticas G11 (no sociales, no lectura, no ciencias) |
| Tasa de éxito de render | desconocida (no se ha ejecutado end-to-end con un bundle real) |

## Archivos clave

- `saberparatodos/video-pipeline/pipeline/render_math_video.py` — render Python
- `saberparatodos/video-pipeline/pipeline/render-ssr.mjs` — render SSR Node
- `saberparatodos/video-pipeline/pipeline/render-cli.mjs` — CLI orquestador
- `saberparatodos/video-pipeline/pipeline/generate_tts.ps1` — TTS Windows
- `saberparatodos/video-pipeline/pipeline/qa_video.py` — QA post-render
- `saberparatodos/src/lib/video-manifest.ts` — TS loader del manifest

## 3 opciones

### Opción A — Scale (expandir a todos los subjects y grados)
- **Esfuerzo:** 2-3 semanas
- **Impacto %:** 50→80% (+30 puntos)
- **Riesgo:** medio-alto (depende de TTS engines locales + YouTube API keys + 30 videos piloto)
- **Hacer:**
  -1. Extender `render_math_video.py` → `render_subject_video.py` parametrizable
  -2. Adaptar `video-pipeline/config/` para lectura, ciencias, sociales
  -3. Renderizar + publicar 30 videos piloto (5 por materia × 6 grados)
  -4. Wire analytics de YouTube/Instagram/TikTok
- **Costo:** ~150GB storage, ~30 horas compute (Remotion SSR local)

### Opción B — Mantener (status quo 50%)
- **Esfuerzo:** 0 (ya está)
- **Impacto %:** 50% (sin cambio)
- **Riesgo:** bajo
- **Hacer:** solo bugfixes eventuales; no invertir más
- **Justificación:** video es nice-to-have, no bloquea el producto core (bundles + salones)

### Opción C — Archivar (mover a archivo, marcar feat-video-pipeline deprecated)
- **Esfuerzo:** 30 min (git mv a `archivo/`)
- **Impacto %:** 50→25% (-25 puntos, refleja realidad)
- **Riesgo:** bajo
- **Hacer:**
  1. `git mv saberparatodos/video-pipeline/ archivo/worldexams-video-pipeline-2026/`
  2. Marcar `feat-video-pipeline` como `passes: false, progress_pct: 25, note: "archivado 2026-09-02 — no hay demanda real, recursos reasignados a NeuroGym"`
  3. Cerrar #993 higiene relacionado si aplica

## Recomendación Hermes

**Opción B (mantener)** si tu prioridad es contenido educativo (bundles, salones, NeuroGym).
**Opción A (scale)** si quieres lanzar marketing viral en TikTok/Reels/Shorts en Q4 2026.
**Opción C (archivar)** si no hay plan de marketing video en los próximos 6 meses.

## Acción requerida

Marca una opción en este archivo o responde con la letra. Si no respondes en 24h, mantengo Opción B (status quo) — el pipeline sigue siendo útil si alguien lo necesita después.