# Video Pipeline v4.1 (Matemáticas)

Pipeline local para generar videos verticales de 15s por pregunta v4.1:

- `3s` intro (WorldExams + SaberParaTodos)
- `9s` explicación de resolución
- `3s` outro (WorldExams + SaberParaTodos)

## Scripts

- `npm run video:queue:v41`
  - Genera cola de preguntas pendientes en `video-pipeline/queue/pending-v41-math.json`.
- `npm run video:queue:v41:jobs`
  - Genera cola + JSON individual por pregunta en `video-pipeline/jobs/`.
- `npm run video:manifest:upsert -- --question_id=... --status=...`
  - Actualiza/crea entrada en `src/content/video/video-manifest-v41.json`.
- `npm run video:queue:social`
  - Construye cola de publicación por plataforma en `video-pipeline/queue/social-publish-v41.json`.

## Ejemplos

```powershell
# 1) Construir cola de pendientes
npm run video:queue:v41

# 2) Emitir jobs (json por pregunta)
npm run video:queue:v41:jobs -- --limit=20

# 3) Marcar publicación en manifiesto
npm run video:manifest:upsert -- --question_id=CO-MAT-11-algebra-001-v1 --youtube_id=abc123xyz --status=published

# 4) Generar cola de distribución social
npm run video:queue:social
```

## Integración de motores externos

El render real se ejecuta con los motores locales definidos en el job:

- Voz: `xtts-v2-local` (fallback `piper`)
- Alineación: `whisperx`
- Render: `remotion` (vertical)
- Distribución: YouTube/Instagram auto, TikTok en cola manual
