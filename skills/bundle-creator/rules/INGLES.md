# INGLES - Global English Bundle Creation Rules

## Framework
- **Type:** Global English Proficiency (CEFR-aligned)
- **Levels:** A1, A2, B1, B2, C1, C2
- **Grades:** 3-12 (mapped to CEFR)
- **Reference:** Common European Framework of Reference for Languages (CEFR)

## CEFR Mapping by Grade
| Grade | CEFR Level | Description |
|-------|-----------|-------------|
| 3-4 | A1 | Beginner |
| 5-6 | A2 | Elementary |
| 7-8 | B1 | Intermediate |
| 9-10 | B2 | Upper Intermediate |
| 11-12 | C1+ | Advanced |

## Subject Areas
- Reading Comprehension
- Vocabulary & Grammar
- Listening (scenario-based)
- Writing (guided tasks)
- Speaking (dialogue scenarios)

## Bundle Directory Structure
```
questions_data/ingles/
  ├── grado-03/
  │   └── periodo-1/
  │       └── subject/
  │           └── INGLES-ENG-03-P1-TOPIC-NNN-MASTERY-bundle.md
  ├── grado-04/
  └── ... (through grado-12)
```

## Language & Cultural Rules
- All instructions and questions in English
- Contexts should be culturally neutral or globally relevant
- Use diverse names from various cultures
- No country-specific exam references
- **CRITICAL CEFR TAG**: The CEFR alignment MUST BE EXPLICIT in the bundle frontmatter (e.g., `cefr_level: "B2+"`). A bundle without this field is invalid.
- **GRAMMAR ENFORCEMENT**: The grammar and vocabulary of the questions MUST strictly match the CEFR Level of the Grade.
  - **Grades 10-11 (B2/C1)**: NEVER use basic grammar like "She goes to school". You must use advanced structures: Mixed Conditionals, Advanced Passive Voice, Reported Speech, Phrasal Verbs, Modals of Deduction, Inversion, etc.
  - **Grades 8-9 (B1/B2)**: Use Present Perfect, Past Perfect, First/Second Conditionals, Relative Clauses.
  - **Grades 5-7 (A2/B1)**: Simple Past, Present Continuous, Comparatives/Superlatives, Basic Modals.
  - **Grades 3-4 (A1)**: Present Simple, To Be, Basic Vocabulary.
- Focus on communicative competence, not grammar memorization
- **Country in frontmatter**: `"colombia"` (or target country)
