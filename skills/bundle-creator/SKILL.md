# SaberParaTodos Bundle Creator Skill - v5.2

## Purpose

Create weekly MASTERY bundles for SaberParaTodos using `protocol_version: "5.2"`.

This skill is country-aware. Always read the matching file in `skills/bundle-creator/rules/` before generating.

## Canonical ID

```text
{COUNTRY_CODE}-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle
```

Examples:

```text
CO-LEN-7-2026-W14-subordinacion-001-MASTERY-bundle
MX-MAT-11-2026-W01-algebra-numeros-reales-001-MASTERY-bundle
BR-MAT-3EM-2026-W01-conjuntos-numericos-001-MASTERY-bundle
```

The filename must be `{id}.md`.

## Required Route

```text
questions_data/{country}/{subject}/grado-{N}/2026/weekly/{id}.md
```

Brazil 3EM:

```text
questions_data/brasil/matematica/3o-ano/2026/weekly/{id}.md
```

## Required Frontmatter

```yaml
---
id: "{id}"
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

## Question Counts

- G3-G5: 8
- G6-G7: 10
- G8-G10: 12
- G11 and BR 3EM: 20

## Difficulty Distribution

For 10 questions:

- Q1-Q2: D3-D4
- Q3-Q5: D5-D6
- Q6-Q8: D7-D8
- Q9-Q10: D9-D10

For 20 questions:

- Q1-Q4: D3-D4
- Q5-Q10: D5-D6
- Q11-Q16: D7-D8
- Q17-Q20: D9-D10

## Bloom Distribution

For 10 questions:

- Remember: 2
- Understand: 2
- Apply: 3
- Analyze: 2
- Evaluate: 1

For 20 questions:

- Remember: 2
- Understand: 4
- Apply: 6
- Analyze: 4
- Evaluate: 4

For 8 or 12 questions, keep the same progression and avoid overloading expert questions.

## Exact Question Format

```markdown
## Question N [D{level}]
**ID:** {id}-v{N}
**Bloom:** {Remember|Understand|Apply|Analyze|Evaluate}
**ICFES:** {competency_or_exam_axis}
**Expected_Success:** 0.80
**Contexto:** Local country context.

### Enunciado
Question text.

### Opciones
- [ ] A) Distractor
  <!-- feedback: Explanation of the misconception. -->
- [x] B) Correct answer
  <!-- feedback: Explanation of why it is correct. -->
- [ ] C) Distractor
  <!-- feedback: Explanation of the misconception. -->
- [ ] D) Distractor
  <!-- feedback: Explanation of the misconception. -->

### Explicacion Pedagogica
Step-by-step pedagogical explanation.
```

## Critical Rules

1. Use exact Spanish structural labels: `Contexto`, `Enunciado`, `Opciones`, `Explicacion Pedagogica`.
2. Use `## Question`, not `## Pregunta`.
3. Exactly one `[x]`.
4. Four unique options A-D.
5. Feedback for every option.
6. No all/none-of-the-above options.
7. No prompt leakage or markdown code fences around the bundle.
8. Do not create scripts, logs, prompts or temporary generation directories in content PRs.
9. Do not delete unrelated bundles.

## Validation

Run:

```bash
npm run validate -- {generated_files}
```

The PR is not ready until validation passes.
