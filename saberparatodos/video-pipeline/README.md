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
- `npm run video:init:period1:g11`
  - Crea estructura `.md.assets` en `src/content/questions/colombia/matematicas/grado-11/periodo-1/` con jobs y trazabilidad por bundle.
- `npm run video:jobs:run -- --limit=5`
  - Ejecuta jobs locales (TTS, alineación, render) usando comandos de `video-pipeline/config/local-engines.local.json`.
- `npm run video:publish:sync`
  - Sincroniza URLs de `publish/*.json` de cada `.md.assets` hacia `src/content/video/video-manifest-v41.json`.
- `npm run video:social:keys:check`
  - Valida que los API keys locales de redes sociales estén completos.

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

# 5) Inicializar assets por bundle (grado 11, periodo 1)
npm run video:init:period1:g11

# 6) Procesar jobs locales (requiere local-engines.local.json)
npm run video:jobs:run -- --limit=3

# 7) Sincronizar links publicados al manifest
npm run video:publish:sync

# 8) Validar llaves API de redes
npm run video:social:keys:check
```

## Integración de motores externos

El render real se ejecuta con los motores locales definidos en el job:

- Voz: `xtts-v2-local` (fallback `piper`)
- Alineación: `whisperx`
- Render: `remotion` (vertical)
- Distribución: YouTube/Instagram auto, TikTok en cola manual

## Configuracion local requerida

- Copiar `video-pipeline/config/local-engines.example.json` a `video-pipeline/config/local-engines.local.json` y ajustar comandos reales de tu entorno.
- Copiar `video-pipeline/config/social-keys.example.json` a `video-pipeline/config/social-keys.local.json`.
- Los archivos `*.local.json` estan ignorados por git.
