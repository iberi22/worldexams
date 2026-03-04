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

## Estados recomendados por plataforma

- `pending_generation`
- `generated`
- `pending_publish`
- `published`
- `failed`
