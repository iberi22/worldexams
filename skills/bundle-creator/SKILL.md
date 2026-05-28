# 🌎 SaberParaTodos Bundle Creator Skill

## Purpose
Create MASTERY bundles (protocol_version: "5.1") for the SaberParaTodos multi-tenant exam prep platform. Each bundle = 20 multiple-choice questions aligned to a specific country's official exam framework.

## Bundle Protocol (5.1) Format
```markdown
---
id: "CO-AREA-11-P1-topic-001-MASTERY"
country: "colombia"
grado: 11
asignatura: "area"
tema: "topic"
periodo: 1
protocol_version: "5.1"
bundle_index: 1
bundle_size: 20
alignment: "ICFES Saber 11°"
modern_context: true
distractor_profile: "misconception_based"
calibration:
  expected_success_rate: 0.50
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
---
...

## Question N [Difficulty]

**ID:** `CO-AREA-11-P1-topic-001-vN`
**Bloom:** [Remember|Understand|Apply|Analyze|Evaluate]
**Context:** Brief context.

### Enunciado
Question text.

### Options
- [ ] A) Option <!-- feedback: Explanation. -->
- [ ] B) Option <!-- feedback: Explanation. -->
- [x] C) Option <!-- feedback: CORRECT. Explanation. -->
- [ ] D) Option <!-- feedback: Explanation. -->

### Explicación Pedagógica
Step-by-step explanation.
```

## ID Convention
`{COUNTRY_CODE}-{SUBJECT}-{GRADE}-{PERIOD}-{TOPIC}-{INDEX}-MASTERY`
- COUNTRY_CODE: MX, AR, BR, CL, PE, EC, CO, ES, PR, GQ, PA, CR, GT, DO, SV, HN, NI, UY, PY, BO
- SUBJECT: MAT, LEN, CIE, SOC, etc.
- GRADE: 11 (last year), optionally 10, 9
- PERIOD: 1 (first semester/period)
- TOPIC: subtopic (algebra, geometria, biologia, lectura, etc.)
- INDEX: 001, 002, etc.

## Difficulty Distribution (per 20 questions)
- D3-D4 (Basic): 4 questions (Q1-Q4)
- D5-D6 (Intermediate): 6 questions (Q5-Q10)
- D7-D8 (Advanced): 6 questions (Q11-Q16)
- D9-D10 (Expert): 4 questions (Q17-Q20)

## Bloom's Taxonomy Distribution
- Remember: 2 questions
- Understand: 4 questions
- Apply: 6 questions
- Analyze: 4 questions
- Evaluate: 4 questions

## Critical Rules
1. EACH question MUST have EXACTLY ONE `[x]` answer (correct)
2. Never have two `[x]` in same question
3. Each question MUST have a `### Explicación Pedagógica` section
4. IDs must be UNIQUE across all bundles
5. 20 questions per bundle, no more, no less
6. feedback in HTML comments: correct goes to `[x]`, incorrect feedback explains the misconception
7. `context:` should reference real-life scenarios when possible

## Per-Country Rules
Each country has its own skill rule file in `skills/bundle-creator/rules/`. ALWAYS consult the corresponding rule file before creating bundles for that country.
