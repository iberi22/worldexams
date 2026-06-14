---
name: worldexams-bundle-generator
description: Sistema de generacion de bundles semanales WorldExams v5.2 para Jules.
---

# WorldExams Bundle Generator Skill - Protocol v5.2

Este skill reemplaza cualquier instruccion v5.1 anterior. Jules debe generar bundles semanales v5.2, no bundles por periodo `P1`.

## Objective

Generar bundles MASTERY semanales de alta calidad para WorldExams/SaberParaTodos, alineados al pais, grado, asignatura y semana solicitados en el issue.

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

## Required Frontmatter

```yaml
---
id: "{CODE}-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle"
country: "{country}"
grado: {grade}
asignatura: "{subject}"
tema: "{topic}"
periodo: "weekly"
week: "W{NN}"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: {question_count}
bundle_size: {question_count}
alignment: "{official_alignment}"
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---
```

Do not use `semana` instead of `week`. The `id` includes `-bundle` and must match the file basename without `.md`.

## Question Counts

- G3-G5: 8
- G6-G7: 10
- G8-G10: 12
- G11 and Brazil 3EM: 20

## Exact Question Anatomy

```markdown
## Question N [D3]
**ID:** {BUNDLE_ID}-v{N}
**Bloom:** Remember
**ICFES:** Numerico
**Expected_Success:** 0.90
**Contexto:** Local, useful scenario.

### Enunciado
Question text.

### Opciones
- [x] A) Correct answer
  <!-- feedback: Why this is correct. -->
- [ ] B) Distractor
  <!-- feedback: Misconception explanation. -->
- [ ] C) Distractor
  <!-- feedback: Misconception explanation. -->
- [ ] D) Distractor
  <!-- feedback: Misconception explanation. -->

### Explicacion Pedagogica
Pedagogical explanation.
```

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
```

If validation fails, fix the files and run it again.

## Jules Issue Workflow

1. Read `AGENTS.md`.
2. Read this skill.
3. Read `skills/bundle-creator/SKILL.md`.
4. Read the target country rule file.
5. Generate only the requested `.md` files.
6. Validate.
7. Comment the issue with generated IDs.
