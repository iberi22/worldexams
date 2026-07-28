---
title: "[JULES] Chile - historia 11 - W01-W10 (10 bundles)"
labels: ["jules", "generate-questions", "ai-agent", "stage:planning"]
---

## Reglas criticas para Jules

- Maximo 15 bundles; este lote tiene **10**.
- No regenerar existentes salvo `REPLACE`.
- Solo archivos `.md` en `questions_data/chile/historia/grado-11/2026/weekly/`.
- Validar: `npm run validate -- {archivos}` en **0 fallos** antes de comentar.
- Comentar: `[OK] Generados N bundles: ...`.

## Anti-errores (purga 2026-07-28 — docs/specs/CONTENT_ERRORS.md)

1. Eje por pregunta: `**EJE:**` — ICFES PROHIBIDO fuera de Colombia.
2. `alignment`: entidad oficial del país (ver regla CL); NUNCA ICFES/Saber/DBA.
3. Ruta EXACTA `questions_data/chile/historia/grado-11/2026/weekly/` — carpeta = nombre completo del país; no crear variantes.
4. Frontmatter: 15 campos de AGENTS.md; `week: "WNN"` (nunca `semana:`); `id` = filename sin `.md`.
5. `## Question N [D#]` (nunca `## Pregunta`); `### Enunciado/Opciones/Explicacion Pedagogica`; `**Contexto:**` (nunca `Context`).
6. Sin placeholders ("Distractor N", "Opcion correcta", "tema-semana-NN"); opciones únicas; feedback en las 4 opciones.
7. Tras validar: `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` + `npm run audit:country-readiness`.

## Skills y protocolo (obligatorio)

1. `AGENTS.md` (v5.2)
2. `skills/worldexams-bundle-generator/SKILL.md`
3. `skills/bundle-creator/SKILL.md`
4. `skills/bundle-creator/rules/CL.md` (incluye Anti-Error Checklist del país)
5. `docs/specs/curriculums/chile/README.md` (si existe)
6. `docs/HERMES_JULES_WORKFLOW.md`
7. `docs/specs/ACTIVE_PROTOCOLS.md`
8. `docs/specs/CONTENT_ERRORS.md`

## Configuracion

| Campo | Valor |
|-------|-------|
| Pais | Chile |
| Codigo | CL |
| Asignatura | historia |
| Subject code | HIS |
| Grado | 11 |
| Ano | 2026 |
| Protocolo | v5.2 |
| Preguntas/bundle | 20 |
| Ruta | `questions_data/chile/historia/grado-11/2026/weekly/` |

## Bundles a generar

| # | Week | Tema | Archivo |
|---|------|------|---------|
| 1 | W01 | tema-w01 | `CL-HIS-11-2026-W01-tema-w01-001-MASTERY-bundle.md` |
| 2 | W02 | tema-w02 | `CL-HIS-11-2026-W02-tema-w02-001-MASTERY-bundle.md` |
| 3 | W03 | tema-w03 | `CL-HIS-11-2026-W03-tema-w03-001-MASTERY-bundle.md` |
| 4 | W04 | tema-w04 | `CL-HIS-11-2026-W04-tema-w04-001-MASTERY-bundle.md` |
| 5 | W05 | tema-w05 | `CL-HIS-11-2026-W05-tema-w05-001-MASTERY-bundle.md` |
| 6 | W06 | tema-w06 | `CL-HIS-11-2026-W06-tema-w06-001-MASTERY-bundle.md` |
| 7 | W07 | tema-w07 | `CL-HIS-11-2026-W07-tema-w07-001-MASTERY-bundle.md` |
| 8 | W08 | tema-w08 | `CL-HIS-11-2026-W08-tema-w08-001-MASTERY-bundle.md` |
| 9 | W09 | tema-w09 | `CL-HIS-11-2026-W09-tema-w09-001-MASTERY-bundle.md` |
| 10 | W10 | tema-w10 | `CL-HIS-11-2026-W10-tema-w10-001-MASTERY-bundle.md` |

## Ownership path (anti-conflicto)

Jules solo toca archivos listados bajo `questions_data/chile/historia/grado-11/2026/weekly/`. No mezclar otros paises/materias/grados.

<agent-state>
  <intent>Generate CL historia G11 W01-W10</intent>
  <step>planning</step>
  <plan>
    - [pending] Read skills + country rule
    - [pending] Generate 10 weekly MASTERY bundles
    - [pending] npm run validate
    - [pending] Comment [OK] and open PR
  </plan>
</agent-state>
