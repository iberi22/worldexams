# Protocol v6.0 - Multi-Grade Mastery Bundles (Colombia)

Last updated: 2026-06-04
Status: active for all grades (3-11) in `questions_data/colombia/`

## Purpose

This protocol extends Protocol v5.1 to support the full K-11 spectrum in Colombia, aligning with MEN DBA (Derechos Básicos de Aprendizaje) and ICFES Saber frameworks for 3°, 5°, 7°, 9°, and 11°.

## Storage Rule

All new bundles must follow the grade-period structure:

```text
questions_data/colombia/[asignatura]/grado-[N]/periodo-[P]/[tema]/[ID]-MASTERY-bundle.md
```

## Bundle Size & Difficulty by Grade

| Grade | Bundle Size | Difficulty Range | Bloom Taxonomy Focus |
|-------|-------------|------------------|----------------------|
| 3-4 | 10 questions | D2-D7 | Remember, Understand, Apply |
| 5-7 | 15 questions | D3-D9 | Understand, Apply, Analyze |
| 8-11 | 20 questions | D3-D10 | Apply, Analyze, Evaluate, Create |

## Required Frontmatter (v6.0)

```yaml
---
id: "CO-[AREA]-[GRADO]-P[PERIODO]-[TOPIC]-[INDEX]-MASTERY"
country: "colombia"
grado: [3-11]
asignatura: "[asignatura-kebab-case]"
tema: "[tema-kebab-case]"
periodo: [1-4]
protocol_version: "6.0"
bundle_index: [1-3]
bundle_size: [10/15/20]
alignment: "MEN DBA + ICFES Saber [Grade]"
target_cefr: "A1-B2" # for ingles
modern_context: true
distractor_profile: "plausible_peer_set"
---
```

## Question Structure

Each question must follow the v5.1 structure:
- `## Question N [DX-DY]` (Header with difficulty)
- `**ID:**` Unique ID
- `**Bloom:**` Taxonomy level
- `**ICFES:**` Competency alignment
- `**Expected_Success:**` Probability (0.0-1.0)
- `**Contexto:**` (Optional)
- `**Enunciado:**` Question text
- **4 Options** (A, B, C, D) with embedded `<!-- feedback: ... -->`
- **Explicación:** Short pedagogical explanation

## Area Alignment

### Grades 3-5 (Primary)
- Focus on concrete situations, local community context, and fundamental operations/concepts.
- Language should be clear, avoiding overly complex vocabulary.

### Grades 6-9 (Lower Secondary)
- Increase abstraction, introduce formal logic, and socio-scientific issues.
- Prepare for Saber 7 and Saber 9 transition.

### Grades 10-11 (Upper Secondary)
- Full Saber 11 alignment.
- High cognitive demand, multi-step reasoning, and professional/academic contexts.

## Validation Gate

1. Must pass `validate_content.js` (updated for v6.0 size rules).
2. Must include mandatory per-option feedback.
3. No references to "ICFES" in the content body itself (use local context).
