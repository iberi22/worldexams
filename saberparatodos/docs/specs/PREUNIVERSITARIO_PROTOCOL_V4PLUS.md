# PREUNIVERSITARIO_PROTOCOL_V4PLUS.md

Last update: 2026-03-07
Scope: Colombia preuniversitario admission mocks and institutional research pipeline.

## 1. Purpose
Define the canonical workflow for building preuniversitario mocks from official university admissions evidence.

The protocol is split into 2 mandatory artifacts per entry:
1. `research dossier`
2. `exam blueprint`

No bundle may be published without both artifacts in `verified` status.

## 2. Catalog unit
- Primary unit: one institutional core mock.
- Fallback unit: one career overlay when the Top 10 pipeline cannot be completed with distinct institutions that have a documentable admissions exam.

Examples:
- `CO-PREU-UNAL-core-001-v4-bundle.md`
- `CO-PREU-UNAL-medicina-001-v4-bundle.md`

## 3. Research dossier requirements
Each dossier must capture:
- Institution name and slug
- Career overlay, if any
- Official admissions portal
- Exam existence and exam name
- Components evaluated
- Question counts, section weights, and duration
- Required documentation
- Cost of the exam in COP
- Current year calendar
- Official source URLs
- `last_verified_at`
- Evidence quality
- Known uncertainties

Source precedence:
1. Official admissions portal
2. Official PDF guide or calendar
3. Official university news page
4. Everything else is reference-only and cannot unlock publication

## 4. Blueprint requirements
The blueprint translates the dossier into the mock specification:
- Component map
- Weight map
- Difficulty ladder
- Question type mix
- Program overlays
- Scoring profile
- Source references per component

## 5. Bundle schema
Default frontmatter:

```yaml
---
id: "CO-PREU-UNAL-core-001"
track: "preuniversitario"
institution_id: "unal"
institution_slug: "unal"
program_overlay: null
exam_year: 2026
exam_cycle: "2026-2"
protocol_version: "4.1+"
total_questions: 20
difficulty_range: "1-10"
question_types: ["single", "multi-correct", "weighted"]
exam_components: ["analisis-textual", "matematicas", "ciencias"]
scoring_profile: "institutional-default"
research_dossier_id: "co-preu-unal-core"
ranking_basis: "icfes-saber-pro-2024"
last_verified_at: "2026-03-07"
source_refs:
  - title: "UNAL - Admisiones pregrado"
    url: "https://admisiones.unal.edu.co/pregrado/"
licenses:
  v1-v20: "CC BY-NC-SA 4.0"
---
```

Default type mix:
- Questions 1-15: `single`
- Questions 16-17: `multi-correct`
- Questions 18-20: `weighted`

Institution-specific blueprints may override the mix if the real exam format requires it.

## 6. Question body contract
Every question must include:
- `ID`
- `Type`
- `Bloom`
- `Competencia`
- `Componente institucional`
- `Fuente base`
- `Contexto`
- `Enunciado`
- `Opciones`
- `Scoring` when `multi-correct` or `weighted`
- `Explicacion pedagogica`

## 7. Validation gates
- Bundle metadata complete
- Source freshness valid for the active year
- At least 1 official source per institutional component
- Scoring metadata present for non-single questions
- IDs unique
- Reactives mapped to blueprint sections
- Publication blocked when dossier or cycle is `pending` or `stale`

## 8. Operational notes
- This repository currently consumes question packs via API and external `questions_data`; do not assume `src/content/questions` is the active source root.
- Dates and fees must remain outside the bundle body in institutional metadata so that yearly refreshes do not force question rewrites.
- Focus training should be authored as `packs de 5 .md` per university and academic focus, following `PREUNIVERSITARIO_PACKS_V41.md`.
- Public internet materials may be used only as pattern references; questions must be newly written and source-attributed, not copied.
