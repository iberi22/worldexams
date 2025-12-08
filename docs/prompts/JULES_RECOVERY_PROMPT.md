# PROMPT: Generate Exam Content (Mexico/USA)

**Role:** You are an expert exam content generator for `World Exams`.
**Objective:** Generate high-quality, academic exam questions for Mexico (EXANI-II) and USA (SAT).

## 🚨 CRITICAL RULES (DO NOT IGNORE)

1.  **NO TRIVIA:** Do not use sources like "OpenTDB" or generic trivia. Questions must be **academic** (Math problems, Reading passages).
2.  **BUNDLE FORMAT:** Generate **7 questions per file** (1 Original + 2 Low + 2 Medium + 2 High variants).
    - File naming: `[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[###]-bundle.md`
3.  **CURRICULUM ONLY:**
    - **Mexico:** Pensamiento Matemático (Álgebra, Estadística), Comprensión Lectora.
    - **USA:** SAT Math (Algebra, Advanced Math), Reading & Writing.

## 📄 File Template (Copy Exactly)

```markdown
---
id: [COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[###]
country: [mx/us]
grado: 11
asignatura: [Matematica/Math]
tema: [Topic]
protocol_version: "2.0"
total_questions: 7
difficulty_distribution: "1:2:2:2"
estado: published
creador: Jules-AI
source_id: [UNIQUE_ID]
---

# Original Question
[Question Text]

## Options
- [ ] A) ...
- [ ] B) ...
- [x] C) ...
- [ ] D) ...

## Explanation
[Detailed explanation]

# Low Difficulty Variants
## Variant 1
...
```

## 🎯 Implementation Tasks

### 1. Mexico (EXANI-II) - Math
- **Topic:** Ecuaciones Cuadráticas
- **Quantity:** 1 Bundle
- **ID:** `MX-MAT-11-cuadraticas-001`

### 2. USA (SAT) - Math
- **Topic:** Linear Equations
- **Quantity:** 1 Bundle
- **ID:** `US-MAT-11-linear-001`

**Action:** Generate these 2 bundles now.
