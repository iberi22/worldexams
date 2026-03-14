# 🎯 Refined Generation Prompt for Jules-AI (Colombia) - MASTERY v5.0

**Role:** Expert Academic Content Generator for World Exams.
**Objective:** Generate high-quality question bundles for Colombia (Saber 11/DBA) following strictly **Protocol v5.0 (MASTERY)**.

## 🚨 CRITICAL RULES
1. **Output Path:** `questions_data/colombia/[asignatura]/grado-[N]/periodo-[P]/[tema-kebab-case]/[id]-MASTERY-bundle.md`.
2. **Context Analysis:**
   - **PROTOCOL ONLY:** ONLY use **Protocol v4.1** bundles as style references (Ignore v2.0, v3.0).
   - **Reference File:** Analyze `questions_data/colombia/matematicas/grado-11/periodo-2/CO-MAT-11-derivative-concept-001-PRO-v4-bundle.md` for context complexity and 20-question density.
3. **Format:** Output MUST be a single Markdown file.
4. **Academic Period:** Use `periodo: [1-4]` according to Mineducación.
5. **Optimal Hierarchy:** Subject -> Grade -> Period -> Topic (kebab-case) -> File.
6. **Bundle Density:** Generate **3 bundles per topic/period** (use `bundle_index: 1|2|3`).

## 📄 Mastery High-Fidelity Standards
Each question MUST include:
- **Bloom Objective:** Specific cognitive goal (Remember to Transfer).
- **ICFES Competency:** Align with Mineducación/ICFES technical frameworks.
- **Difficulty:** Precisely calibrated **4 to 10**.
- **Mastery Options:** Distractors must be defendible/logical (no absurdity). Include conditional options ("siempre que...", "solo cuando...").
- **Feedback per Choice:** Provide 1 line of feedback for EVERY incorrect option.
- **Rubric & Short Justification:** Definition of criteria for a 2-3 sentence justification.

## 🛠️ Execution Steps
1. **Source:** Research a real base question (v1) from past exams (ICFES/Pre-ICFES).
2. **Simulation:** Mentally simulate 100 responses to adjust distractors for high discrimination (>= 0.2).
3. **Draft 20 Variants:** Difficulty 4 to 10.
4. **Localization:** Use Colombian flavor (Nequi, Torre Colpatria, $ COP).
5. **Validation:** Include the `## 📊 Metadata de Validación` table at the end.

## 📝 Template Fragment (Protocol v5.0 Mastery)
```markdown
---
id: "CO-[SUBJ]-11-[PERIOD]-[TOPIC]-[INDEX]-MASTERY"
protocol_version: "5.0"
periodo: [1-4]
bundle_index: [1-3]
total_questions: 20
calibration:
  expected_success_rate: 0.65
  discrimination_index_target: ">= 0.2"
---

# Bundle: [Topic] (Mastery Edition - Bundle [Index])

## Question 1 (Variant Base - Difficulty 4)
**ID:** `CO-[SUBJ]-11-[PERIOD]-[TOPIC]-[INDEX]-MASTERY-v1`
**Bloom:** Remember
**ICFES:** [Competencia]

### Enunciado
[Contexto de Alta Fidelidad] ...

### Opciones
- [x] A) [Correcta] <!-- feedback: Correcto porque... -->
- [ ] B) [Defendible] <!-- feedback: Plausible pero incorrecto dada la norma X... -->
...
```

**Launch now for [TOPIC] Grade 11 (Colombia).**
