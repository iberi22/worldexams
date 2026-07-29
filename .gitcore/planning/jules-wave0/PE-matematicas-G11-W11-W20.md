---
title: "[JULES] Peru - matematicas 11 - W11-W20 (10 bundles)"
labels: ["jules", "generate-questions", "ai-agent", "stage:planning"]
---

## Reglas criticas para Jules

- Maximo 15 bundles; este lote tiene **10**.
- No regenerar existentes salvo `REPLACE`.
- Solo archivos `.md` en `questions_data/peru/matematicas/grado-11/2026/weekly/`.
- Validar: `npm run validate -- {archivos}` en **0 fallos** antes de comentar.
- Comentar: `[OK] Generados N bundles: ...`.

## Anti-errores (purga 2026-07-28 — docs/specs/CONTENT_ERRORS.md)

1. Eje por pregunta: `**EJE:**` — ICFES PROHIBIDO fuera de Colombia.
2. `alignment`: entidad oficial del país (ver regla PE); NUNCA ICFES/Saber/DBA.
3. Ruta EXACTA `questions_data/peru/matematicas/grado-11/2026/weekly/` — carpeta = nombre completo del país; no crear variantes.
4. Frontmatter: 15 campos de AGENTS.md; `week: "WNN"` (nunca `semana:`); `id` = filename sin `.md`.
5. `## Question N [D#]` (nunca `## Pregunta`); `### Enunciado/Opciones/Explicacion Pedagogica`; `**Contexto:**` (nunca `Context`).
6. Sin placeholders ("Distractor N", "Opcion correcta", "tema-semana-NN"); opciones únicas; feedback en las 4 opciones.
7. Tras validar: `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` + `npm run audit:country-readiness`.

## Skills y protocolo (obligatorio)

1. `AGENTS.md` (v5.2)
2. `skills/worldexams-bundle-generator/SKILL.md`
3. `skills/bundle-creator/SKILL.md`
4. `skills/bundle-creator/rules/PE.md` (incluye Anti-Error Checklist del país)
5. `docs/specs/curriculums/peru/README.md` (si existe)
6. `docs/HERMES_JULES_WORKFLOW.md`
7. `docs/specs/ACTIVE_PROTOCOLS.md`
8. `docs/specs/CONTENT_ERRORS.md`

## Configuracion

| Campo | Valor |
|-------|-------|
| Pais | Peru |
| Codigo | PE |
| Asignatura | matematicas |
| Subject code | MAT |
| Grado | 11 |
| Ano | 2026 |
| Protocolo | v5.2 |
| Preguntas/bundle | 20 |
| Ruta | `questions_data/peru/matematicas/grado-11/2026/weekly/` |

## Bundles a generar

| # | Week | Tema | Archivo |
|---|------|------|---------|
| 1 | W11 | tema-w11 | `PE-MAT-11-2026-W11-tema-w11-001-MASTERY-bundle.md` |
| 2 | W12 | tema-w12 | `PE-MAT-11-2026-W12-tema-w12-001-MASTERY-bundle.md` |
| 3 | W13 | tema-w13 | `PE-MAT-11-2026-W13-tema-w13-001-MASTERY-bundle.md` |
| 4 | W14 | tema-w14 | `PE-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle.md` |
| 5 | W15 | tema-w15 | `PE-MAT-11-2026-W15-tema-w15-001-MASTERY-bundle.md` |
| 6 | W16 | tema-w16 | `PE-MAT-11-2026-W16-tema-w16-001-MASTERY-bundle.md` |
| 7 | W17 | tema-w17 | `PE-MAT-11-2026-W17-tema-w17-001-MASTERY-bundle.md` |
| 8 | W18 | tema-w18 | `PE-MAT-11-2026-W18-tema-w18-001-MASTERY-bundle.md` |
| 9 | W19 | tema-w19 | `PE-MAT-11-2026-W19-tema-w19-001-MASTERY-bundle.md` |
| 10 | W20 | tema-w20 | `PE-MAT-11-2026-W20-tema-w20-001-MASTERY-bundle.md` |

## Ownership path (anti-conflicto)

Jules solo toca archivos listados bajo `questions_data/peru/matematicas/grado-11/2026/weekly/`. No mezclar otros paises/materias/grados.

<agent-state>
  <intent>Generate PE matematicas G11 W11-W20</intent>
  <step>planning</step>
  <plan>
    - [pending] Read skills + country rule
    - [pending] Generate 10 weekly MASTERY bundles
    - [pending] npm run validate
    - [pending] Comment [OK] and open PR
  </plan>
</agent-state>
