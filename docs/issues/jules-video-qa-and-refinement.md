## Contexto

Necesitamos que Jules valide y afine la calidad de videos de matematicas (Protocol v4.1) antes de escalar la generacion/publicacion.

Este issue se ejecuta **desde GitHub Issues** segun:
- https://jules.google/docs/running-tasks/#starting-tasks-from-github-issues

## Skill obligatorio

Usar **SKILL.md (raiz)**: `WorldExams Video Quality Orchestrator (Jules)`.

Ruta:
- `SKILL.md`

Tambien leer:
- `AGENTS.md`
- `docs/VIDEO_V41_PIPELINE.md`
- `saberparatodos/video-pipeline/README.md`

## Alcance (estricto)

1. Trabajar solo con lote pequeno: **3 videos** (maximo 5 si se aprueban).
2. Validar calidad visual por frames (E2E).
3. Afinar plantilla/render hasta lograr calidad profesional.
4. No escalar generacion masiva sin gate de calidad aprobado.

## Entregables tecnicos

1. Videos refinados del lote.
2. Reporte de QA por frames:
   - `saberparatodos/test-results/video-frame-review/report.json`
3. Evidencias de capturas:
   - `saberparatodos/public/video-frame-analysis/e2e-latest/`
4. Resumen tecnico:
   - Problemas detectados
   - Ajustes aplicados
   - Riesgos pendientes
   - Recomendacion de continuar/no continuar con lote mayor

## Criterios de aceptacion

- Duracion por video: `35s-55s` (si es simple, minimo 30s), nunca > 60s.
- Legibilidad en mobile (texto y ecuaciones sin corrupcion).
- Flujo claro por pasos (no bloque unico de texto).
- Branding consistente WorldExams/SaberParaTodos.
- E2E de frames en verde para lote revisado.

## Checklist de ejecucion

- [ ] Regenerar lote de 3 videos objetivo.
- [ ] Ejecutar `video-frame-review.spec.ts`.
- [ ] Documentar hallazgos y correcciones.
- [ ] Confirmar gate de calidad aprobado para decidir siguiente lote.
