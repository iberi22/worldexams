# [CODE] - [COUNTRY] Bundle Creation Rules

## Official Exam Framework
- **Exam:** [e.g., Pruebas Nacionales de Bachillerato]
- **Agency:** [e.g., MEDUCA]
- **Subjects:** [list]
- **Grade:** [range mapped to WorldExams grado-N]
- **Reference:** [URL]
- **Bundles Directory:** `questions_data/[country-folder]/
- **Axis field:** `**EJE:**` (todos los países excepto Colombia, que usa `**ICFES:**`)
- **alignment:** [entidad oficial del país, p.ej. "MEDUCA - Pruebas Nacionales" — NUNCA ICFES/Saber/DBA]

## Curriculum Alignment
Research the country's official curriculum and exam framework before creating bundles.
Stub grade-level topics for at least one primary and one upper-secondary grade.

## Canonical Path (Protocol v5.2)

Authority: `AGENTS.md`. Do **not** use obsolete `periodo-[N]/` trees for new weekly generation.

```text
questions_data/{country}/{subject}/grado-{N}/2026/weekly/
  {CODE}-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

Example:

```text
questions_data/[country-folder]/[subject]/grado-11/2026/weekly/
  CODE-SUBJ-11-2026-W01-topic-slug-001-MASTERY-bundle.md
```

Validate with:

```bash
npm run validate -- questions_data/[country-folder]/[subject]/grado-11/2026/weekly/*.md
```

## Anti-Error Checklist (obligatorio antes de guardar)

Basado en la purga 2026-07-28 (`docs/specs/CONTENT_ERRORS.md`). Revisar CADA bundle:

1. **Marca correcta:** `**EJE:**` por pregunta (no ICFES salvo Colombia); `alignment` con la entidad del país; cero menciones ICFES/Saber/DBA en todo el archivo.
2. **Sin placeholders:** ningún literal "Distractor N", "Opcion correcta", "Opcion B/C/D", "Pregunta sobre", "tema-semana-NN".
3. **Ruta exacta:** `questions_data/{country-folder-nombre-completo}/{subject}/grado-{N}/2026/weekly/` — códigos de país (`uy`, `py`, `es`, `do`...) NO son carpetas válidas; Brasil usa `3o-ano` (no `3o-EM`).
4. **Frontmatter exacto:** los 15 campos de `AGENTS.md`; `week: "WNN"` (nunca `semana:`); `country` = nombre completo en minúsculas; `id` = nombre de archivo sin `.md`; sin campos extra como `exam:`.
5. **Formato de pregunta:** `## Question N [D#-D#]` con RANGO de dificultad (nunca `## Pregunta`, nunca `[D3]` individual — el validador exige `[D3-D4]`, `[D5-D6]`, `[D7-D8]`, `[D9-D10]` según la banda de AGENTS.md), `### Enunciado`, `### Opciones`, `### Explicacion Pedagogica`, `**Bloom:**`, `**EJE:**`, `**Expected_Success:**`, `**Contexto:**` (nunca `**Context:**`).
5b. **Bloque `calibration`:** incluir SIEMPRE el bloque YAML `calibration:` al final del frontmatter (el validador emite warning si falta). Formato: `calibration: {difficulty_band: "D3-D4", expected_success: 0.8}` o similar.
5c. **Frontmatter `bundle_index`:** incluir SIEMPRE el campo `bundle_index: 1` (el validador emite ERROR si falta — es obligatorio en v5.2).
6. **Opciones únicas:** mismo texto en 2+ opciones = inválido; exactamente 4 opciones A-D, una sola `[x]`.
7. **Feedback completo:** toda opción tiene `<!-- feedback: ... -->` no vacío.
8. **Sin opciones prohibidas:** "todas/ninguna de las anteriores", "A y B" → inválido.
9. **Validar antes de PR:** `npm run validate -- {archivos}` en 0 fallos; después `node scripts/generate-static-packs.js --all-weekly --changed-only` y `npm run audit:country-readiness`.

## Calendar Notes (W ↔ periods)
- `W01-W40` is an internal curricular sequence, not necessarily an official national calendar week.
- Map approximate school periods / semesters / ciclo escolar to W-bands in comments when known.
- Do not claim W01-W40 is the official ministry calendar unless documented.

## Language & Cultural Rules
- Use country-specific spelling and terminology
- Use local cultural references (cities, currency, names)
- Never reference ICFES or Colombia-specific exam names unless the country is Colombia
- Never put the official exam brand name inside question stems (metadata / alignment only)

## Subject Bundle Strategy
1. Core curriculum subjects first
2. High-stakes assessment grades second
3. Progressive difficulty per AGENTS.md bands (G3-G5: 8q, G6-G7: 10q, G8-G10: 12q, G11: 20q)
