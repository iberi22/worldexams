# Protocol v5.1 - Mastery Bundles

Last updated: 2026-03-17
Status: active for Saber 11 generation in `questions_data/`

## Purpose

This protocol governs new Grade 11 bundle generation for the active Colombia bank.
It replaces ad hoc v5.0 notes with a repo-valid version aligned to:

- ICFES Saber 11 reference frameworks updated in March 2025
- MEN standards and DBA guidance used as curriculum floor
- the active runtime and validators in this repository

## Official Alignment Baseline

New bundles must align with both layers:

1. Curriculum floor
- MEN Basic Competency Standards
- MEN DBA or equivalent curricular guidance when available for the area
- institutional period/topic planning already reflected in `questions_data/colombia/**/grado-11/periodo-[1-4]/`

2. Assessment target
- ICFES Saber 11 reference frameworks by test area
- competency wording and cognitive demand should resemble Saber 11, not textbook trivia

## Storage Rule

All new active bundles must be created under:

```text
questions_data/colombia/[asignatura]/grado-11/periodo-[N]/[tema]/[ID]-MASTERY-bundle.md
```

Do not create new Grade 11 bundles under `src/content/questions/`.

## Bundle Size

- Grade 11 uses 20 questions per bundle
- `single` answer by default
- difficulty progression: 3 to 10
- bundle density target: 3 bundles per topic-period when the topic is active

## Required Frontmatter

```yaml
---
id: "CO-[AREA]-11-P[PERIODO]-[TOPIC]-[INDEX]-MASTERY"
country: "colombia"
grado: 11
asignatura: "[asignatura-kebab-case]"
tema: "[tema-kebab-case]"
periodo: [1-4]
protocol_version: "5.1"
bundle_index: [1-3]
bundle_size: 20
alignment: "ICFES Saber 11 + MEN"
target_cefr: "B1-B2" # only for ingles
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: 0.45-0.65
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "campo_1, campo_2, campo_3"
---
```

## Question Structure

Each question must include:

- `ID`
- `Bloom`
- `ICFES`
- `Expected_Success`
- optional `Contexto` when needed
- `Enunciado`
- 4 options
- feedback comment per option
- short pedagogical explanation

## Distractor Rules

Distractors must be:

- same semantic category as the correct answer
- same grammatical role in English
- close in length and specificity
- based on plausible student errors
- defensible from partial reading, incomplete procedure, or common misconception

Distractors must not be:

- absurd, comic, decorative, or category-breaking
- the only technical or only precise option in the set
- eliminated by obvious unit mismatch or register mismatch
- visibly wrong because of tense, number, or syntax alone unless grammar is the exact construct being tested

## Grade 11 Subject Guidance for Period 1

Use the active period-1 folders as topic anchors:

- `matematicas`
  - `funciones`
  - `continuidad`
  - `limites`
  - `inecuaciones`
- `lectura-critica`
  - `textos-continuos`
  - `textos-discontinuos`
  - `ensayo-filosofico`
- `ciencias-naturales`
  - `fisicoquimica-genetica`
- `sociales-ciudadanas`
  - `pensamiento-social`
  - `multiperspectivismo`
  - `geopolitica-contemporanea`
- `ingles`
  - `uso-del-lenguaje`
  - `global-issues`

## Difficulty Distribution

Recommended 20-question spread:

- 4 questions: D3-D4
- 6 questions: D5-D6
- 6 questions: D7-D8
- 4 questions: D9-D10

The last quarter of the bundle should require evidence integration, conditional reasoning, or multi-step evaluation.

## Area Notes

### Matematicas

- prioritize modeling, interpretation, and functional reasoning
- distractors should come from real algebraic or graphical errors
- avoid pure symbol manipulation with no context unless the topic requires it

### Lectura Critica

- use short texts or fragments with a clear argumentative task
- wrong answers should reflect partial interpretation, overgeneralization, or confusion of thesis/evidence

### Ciencias Naturales

- ask about phenomena, models, variables, evidence, and conclusions
- avoid sci-fi distractors or inflated pseudo-technical options

### Sociales Ciudadanas

- connect constitutional, historical, political, and civic reasoning
- distractors should reflect realistic confusions between institutions, mechanisms, rights, and perspectives

### Ingles

- keep CEFR target between B1 and B2 for Grade 11
- options must share part of speech, register, and sentence role
- reading tasks must resemble Saber 11 style: main idea, inference, reference, vocabulary in context, organization, author purpose

## Validation Gate

Before accepting a new bundle:

1. It must pass `validate_content.js`
2. It must avoid `critical` flags in `audit_question_quality.js`
3. It must not contain placeholder text, unfinished numbering, or partial bundles

## Migration Rule

- New generation for Grade 11 should use `protocol_version: "5.1"`
- Existing v5.0 bundles may remain active, but when they are rewritten they must be normalized to v5.1 frontmatter and distractor rules
