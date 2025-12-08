# Expansion Plan: Mexico & USA

**Target Audience:** Jules (Content Generator Agent)
**Date:** 2025-12-08
**Objective:** Prepare `worldexams` for production release in Mexico and USA.

## 1. 🇲🇽 México (EXANI / CENEVAL)

**Current State:** 10 questions (Static count was 10, real dynamic count pending verification).
**Goal:** 50+ questions validated.

### 1.1 Identity & Culture
- **Colors:** Green `#006847`, White `#FFFFFF`, Red `#CE1126`.
- **Exam Name:** EXANI-II (Ceneval).
- **Currency:** Pesos Mexicanos ($ MXN).
- **Context:** CDMX, Guadalajara, Monterrey, Tacos, Mariachi references (subtle), Benito Juárez history.

### 1.2 Curriculum Map (EXANI-II)
- **Pensamiento Matemático:**
  - Álgebra, Aritmética, Geometría, Estadística.
- **Comprensión Lectora:**
  - Identificación de información, interpretación, evaluación.
- **Redacción Indirecta:**
  - Ortografía, gramática, cohesión.

### 1.3 Task for Jules
1.  **Generate Bundles:** Create 5 bundles (7 questions each) for each subject.
2.  **Format:** Use `MX-[SUBJ]-[GRADE]-[TOPIC]-[###]` ID format.
3.  **Validate:** Ensure language is "Español de México" (avoid "coger", use "tomar/agarrar", etc.).

## 2. 🇺🇸 United States (SAT / ACT)

**Current State:** 10 questions.
**Goal:** 50+ questions validated.

### 2.1 Identity & Culture
- **Colors:** Navy Blue `#3C3B6E`, Red `#B22234`, White `#FFFFFF`.
- **Exam Name:** SAT (Digital).
- **Context:** New York, California, Dollars ($ USD), Imperial units (feet, pounds).

### 2.2 Curriculum Map (SAT)
- **Reading & Writing:**
  - Craft and Structure, Information and Ideas, Standard English Conventions.
- **Math:**
  - Algebra, Advanced Math, Problem-Solving and Data Analysis, Geometry and Trigonometry.

### 2.3 Task for Jules
1.  **Generate Bundles:** Focus on Math (Algebra) and Reading (Command of Evidence).
2.  **Format:** Use `US-[SUBJ]-[GRADE]-[TOPIC]-[###]` ID format.
3.  **Style:** Questions must be concise, matching the new Digital SAT format (shorter passages).
4.  **Code:** Use `US-MAT-11-...` and `US-ENG-11-...`.

## 3. Handover Protocol

**For Jules:**
1.  Check `docs/sources/SOURCES_REGISTRY.md` before generating to avoid duplicates.
2.  Run `scripts/generate-questions.ps1` (if available) or use the standard prompt in `docs/prompts/`.
3.  Commit questions to `src/content/questions/mexico/` and `src/content/questions/usa/`.
