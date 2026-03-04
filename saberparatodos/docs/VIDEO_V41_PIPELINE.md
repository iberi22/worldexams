# Video Pipeline v4.1 - Matemáticas

Implementación base para generar videos explicativos por pregunta v4.1 en formato vertical.

## Alcance actual

- Soporte v4.1 en parseo de packs:
  - Opciones `A-E`
  - Múltiples correctas
  - Pesos por opción (`<!-- weight: x -->`)
- Manifiesto canónico de videos:
  - `src/content/video/video-manifest-v41.json`
- Integración en reportes:
  - `ResultsView.svelte`
  - `BotPracticeReport.svelte`

## Scripts operativos

```powershell
cd saberparatodos
npm run video:queue:v41
npm run video:queue:v41:jobs -- --limit=20
npm run video:init:period1:g11
npm run video:jobs:run -- --limit=5
npm run video:publish:sync
npm run video:social:keys:check
npm run video:manifest:upsert -- --question_id=CO-MAT-11-algebra-001-v1 --status=pending_generation
```

## Política de formato

- Resolución: `1080x1920`
- Duración total: `15s`
- Intro: `3s`
- Explicación: `9s`
- Outro: `3s`

## Gestión de llaves API (redes sociales)

- Guardar secretos fuera del frontend.
- Usar archivo local no versionado para credenciales reales.
- Referencia de estructura:
  - `video-pipeline/config/social-keys.example.json`
  - `video-pipeline/config/social-keys.local.json` (ignorado por git)
  - `video-pipeline/config/local-engines.local.json` (ignorado por git)

## Estados recomendados por plataforma

- `pending_generation`
- `generated`
- `pending_publish`
- `published`
- `failed`

## Decisiones tecnicas validadas (Web)

- YouTube:
  - Usar `videos.insert` con upload resumable y luego `videos.list` para validar procesamiento.
  - Considerar cuota por upload y auditoria para proyectos no verificados.
- TikTok:
  - Mantener `manual_queue` por defecto para cumplir requisitos de UX/consentimiento y limites de API.
  - Cuando se use API, seguir flujo `init` + transferencia de video + polling de estado.
- Voz local:
  - XTTS v2 es adecuado para clonacion multilenguaje en espanol con muestra corta.
  - WhisperX se mantiene para timestamps a nivel palabra y subtitulos sincronizados.

Fuentes:
- https://developers.google.com/youtube/v3/guides/uploading_a_video
- https://developers.google.com/youtube/v3/getting-started
- https://developers.google.com/youtube/v3/docs/videos
- https://developers.tiktok.com/doc/content-posting-api-reference-upload-video
- https://developers.tiktok.com/doc/content-posting-api-media-transfer-guide
- https://developers.tiktok.com/doc/content-sharing-guidelines/
- https://docs.coqui.ai/en/latest/models/xtts.html
- https://github.com/m-bain/whisperX
