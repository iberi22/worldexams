---
name: worldexams-bundle-generator
description: Sistema de generacion de bundles semanales WorldExams v5.2 para Jules (skill PROPIO del repo — fuente: skills/worldexams-bundle-generator/).
---

# WorldExams Bundle Generator Skill — Protocol v5.2 (repo-owned)

Este skill reemplaza cualquier instruccion v5.1 anterior. Jules debe generar bundles semanales v5.2, no bundles por periodo `P1`. Skill PROPIO del proyecto (no global `~/.hermes/skills`).

## Objective

Generar bundles MASTERY semanales de alta calidad para WorldExams/SaberParaTodos, alineados al pais, grado, asignatura y semana solicitados en el issue. La fuente de verdad es `AGENTS.md` Bundle Protocol v5.2; este skill es su espejo operativo para Jules.

## Canonical Output

Un bundle final debe estar en:

```text
questions_data/{country}/{subject}/grado-{N}/2026/weekly/{CODE}-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

Brasil 3o ano usa:

```text
questions_data/brasil/matematica/3o-ano/2026/weekly/BR-MAT-3EM-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

No crear scripts, prompts, logs ni archivos temporales en el PR final.

## Required Frontmatter — EXACTO AGENTS.md (18 campos)

Copiar literal; `id` = basename sin `.md`. Campos obligatorios del validador v5.2:

```yaml
---
id: "CO-MAT-6-2026-W01-numeros-enteros-001-MASTERY-bundle"
country: "colombia"
grado: 6
asignatura: "matematicas"
tema: "numeros-enteros"
periodo: "weekly"
week: "W01"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 10
bundle_size: 10
alignment: "DBA MEN Colombia"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---
```

Reglas criticas (sincronizadas con `saberparatodos/scripts/validate_content.js`):
- `bundle_index: 1` SIEMPRE presente — ERROR si falta.
- `calibration:` SIEMPRE presente — warning si falta. Formato `{difficulty_band: "D3-D4", expected_success: 0.8}`.
- Dificultad SIEMPRE en RANGO `[D3-D4]`|`[D5-D6]`|`[D7-D8]`|`[D9-D10]` en el header `## Question N [RANGO]` — `[D3]` suelto = warning.
- `week: "WNN"` (nunca `semana:`), `periodo: "weekly"` para semanales. `id` incluye `-bundle`.

## Question Counts (AGENTS.md)

- G3-G5: 8
- G6-G7: 10
- G8-G10: 12
- G11 and Brazil 3EM: 20

`total_questions` = `bundle_size` = numero real de bloques `## Question N`.

## Difficulty & Bloom Distribution

Para 10 preguntas: Q1-Q2 D3-D4 Remember/Understand · Q3-Q5 D5-D6 Apply · Q6-Q8 D7-D8 Analyze · Q9-Q10 D9-D10 Evaluate.
Para 20 preguntas: Q1-Q4 D3-D4 · Q5-Q10 D5-D6 · Q11-Q16 D7-D8 · Q17-Q20 D9-D10.
Para 8 o 12 preguntas, mantener progresion creciente sin saltar de basico a experto.

## Exact Question Anatomy

```markdown
## Question 1 [D3-D4]
**ID:** CO-MAT-6-2026-W01-numeros-enteros-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Numerico
**Expected_Success:** 0.90
**Contexto:** Escenario local, util para resolver o interpretar la pregunta.
### Enunciado
Texto de la pregunta.

### Opciones
- [x] A) Respuesta correcta
  <!-- feedback: Explica por que esta opcion es correcta. -->
- [ ] B) Distractor 1
  <!-- feedback: Explica el error conceptual. -->
- [ ] C) Distractor 2
  <!-- feedback: Explica el error conceptual. -->
- [ ] D) Distractor 3
  <!-- feedback: Explica el error conceptual. -->

### Explicacion Pedagogica
Explicacion completa del concepto evaluado.
```

Reglas:
- `## Question N [D#-D#]` con RANGO (nunca `## Pregunta`, nunca `[D3]` suelto).
- `### Enunciado` / `### Opciones` / `### Explicacion Pedagogica`; `**Contexto:**` (nunca `Context`/`Options`).
- `**ICFES:**` EXCLUSIVO de Colombia; resto de paises `**EJE:**`.
- Exactamente 4 opciones A-D, una sola `[x]`, todas con feedback `<!-- feedback: ... -->`.
- Sin "Todas las anteriores" / "Ninguna" / "A y B".

Mandatory exact labels:
- `## Question`, not `## Pregunta`
- `**Contexto:**`, not `**Context:**`
- `### Opciones`, not `### Options`
- `### Explicacion Pedagogica`, not bold text

## Quality Rules

1. Exactly one `[x]` option per question.
2. Exactly four options A-D.
3. Every option has `<!-- feedback: ... -->`.
4. No duplicated option text inside a question.
5. No "all/none of the above" patterns in any language.
6. No `<think>`, `<process>`, prompt text, markdown fences around the bundle, or internal notes.
7. No unverified formulas, dates, constants, laws or exam claims.
8. Contexts must fit the target country and language.
9. Do not delete existing bundles unless the issue explicitly says replace and lists the files.

## Validation

Before opening a PR, run:

```bash
npm run validate -- {generated_file_1} {generated_file_2}
# filtro por pais/grado:
npm run validate -- --only questions_data/colombia --grade=11
```

If validation fails, fix the files and run it again. Ver tambien `npm run audit:country-readiness` para OkPct por pais.

## Jules Issue Workflow

1. Read `AGENTS.md`.
2. Read this skill (`skills/worldexams-bundle-generator/SKILL.md`).
3. Read `skills/bundle-creator/SKILL.md`.
4. Read the target country rule file (`skills/bundle-creator/rules/{CO}.md`).
5. Generate only the requested `.md` files.
6. Validate (`npm run validate -- {files}` → 0 errores).
7. Regenerar packs: `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only`.
8. Comment the issue with `[OK] Generados N bundles: ...` and generated IDs.

## Historial relevante (por que hoy falta cobertura)

- Purga 2026-07-28 (#876, `docs/specs/CONTENT_ERRORS.md`): 5.545 `.md` y 5.601 packs eliminados — NO fue perdida, fueron bundles no-v5.2 (E1 marca ICFES fuera de CO, E3 ruta no canonica, E4 `semana:` vs `week:`, E5 `## Pregunta [D1]` sin rango, E6 opciones duplicadas, etc.). CO weekly paso 2.680 → 402 bundles (G11 240 → 45). Los borrados tenian `semana: "W15"` + `## Pregunta 1 [D1]` + sin `calibration` — no reparables sin regeneracion.
- El hueco que hoy rompe "Periodo 4" en prod: CO solo `ingles` conserva W02-W40 (40/40); `matematicas`/`lectura-critica`/`ciencias-naturales`/`sociales-ciudadanas` solo W01 (1-2/40). Periodos 2-4 vacios → re-generar con ESTE protocolo v5.2 (rango, calibration, bundle_index, Question).
