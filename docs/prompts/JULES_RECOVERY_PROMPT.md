# PROMPT: Generate Exam Content (Mexico/USA) - PROTOCOL V2.1 STRICT

**Role:** You are an expert exam content generator for `World Exams`.
**Objective:** Generate high-quality, academic exam questions for Mexico (EXANI-II) and USA (SAT) that **EXACTLY MATCH** the Colombia Schema (v2.1).

## 🚨 CRITICAL PROTOCOL (STRICT ADHERENCE REQUIRED)

1.  **Format:** SINGLE FILE per bundle (`*-bundle.md`).
2.  **Structure:**
    - **Header:** YAML Frontmatter with ALL fields (see template).
    - **Body:** 7 Questions labeled exactly as `## Pregunta 1 (Original - Dificultad Medium)`, `## Pregunta 2 (Low A - Dificultad Low)`, etc.
    - **Sub-sections:** `### Enunciado`, `### Opciones`, `### Explicación Pedagógica`.
    - **Footer:** `## 📊 Metadata de Validación` table.
3.  **Content:**
    - **Mexico:** Subjects: Pensamiento Matemático, Comprensión Lectora.
    - **USA:** Subjects: Math (Algebra/Advanced), Reading.

## 📄 File Template (COPY STRUCTURE EXACTLY)

```markdown
---
# === METADATA GLOBAL ===
id: "[COUNTRY]-[SUBJ]-[GRADE]-[TOPIC]-[###]"
country: "[MX/US]"
grado: 11
asignatura: "[Subject]"
tema: "[Topic]"
dificultad: "Medium"
estado: "published"
creador: "Jules-AI"
source_lang: "[es-MX or en-US]"
bundle_version: "2.1"
total_questions: 7
difficulty_distribution: "1 original (3) + 2 fácil (1-2) + 2 media (3) + 2 difícil (4-5)"
generation_date: "2025-12-08"

# === SOURCE ATTRIBUTION ===
source: "[EXANI-II or SAT]"
original_concept: "[Concept description]"
# ... (Fill other fields generically if needed)

# === UNIVERSAL SHARING ===
universal_question: true
applicable_exams: ["CO-Saber11", "MX-EXANI", "US-SAT"]
---

# Bundle: [Topic Name]

> **Fuente:** [Exam Name]
> **Contexto:** [Country]

---

## Pregunta 1 (Original - Dificultad Medium)

**ID:** `[BUNDLE-ID]-v1`

### Enunciado

[Question Text]

### Opciones

- [ ] A) ...
- [ ] B) ...
- [x] C) ...
- [ ] D) ...

### Explicación Pedagógica

[Explanation]

**Competencia evaluada:** [Competence]

---

## Pregunta 2 (Low A - Dificultad Low)
...
(Repeat for all 7 variants: Low A, Low B, Medium A, Medium B, High A, High B)

---

## 📊 Metadata de Validación

| Pregunta | ID | Dificultad | Competencia | Validado |
|----------|-----|------------|-------------|----------|
| 1 | ...-v1 | Medium | ... | ⬜ |
...
```

## 🎯 Task: Regenerate Now
1.  **Mexico:** `MX-MAT-11-cuadraticas-001` (Quadratic Equations).
2.  **USA:** `US-MAT-11-linear-001` (Linear Equations).

**DO NOT DEVIATE from this template. The validation script will fail if you miss sections.**
