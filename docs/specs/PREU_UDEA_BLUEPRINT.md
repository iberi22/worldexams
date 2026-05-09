# Blueprint: Universidad de Antioquia (UdeA) Admission

**Status:** Draft / Active for Protocol v5.2
**Target:** 2026 Admission Cycle
**Official Source:** [udea.edu.co](https://www.udea.edu.co)

## 1. Exam Structure

The UdeA exam is an 80-question, 3-hour test divided into two equal parts. It is highly competitive and focuses on logic and literacy.

| Component | Questions | Key Skills |
| :--- | :---: | :--- |
| **Razonamiento Lógico** | 40 | Logical, quantitative, abstract, and geometric reasoning. |
| **Competencia Lectora** | 40 | Literal, inferential, and critical/intertextual reading. |

## 2. Component Depth

### Razonamiento Lógico
- **Proportionality:** Percentages, direct/inverse relations, probability.
- **Abstract Reasoning:** Alphanumeric and graphic series, symbolic logic.
- **Geometric Reasoning:** Areas, volumes, spatial relationships.
- **Logical Synthesis:** Inference from statements, control of variables.

### Competencia Lectora
- Complex text analysis (scientific, literary, philosophical).
- Intertextuality: Comparing two texts on the same topic.
- Author intention and semantic cohesion.

## 3. Protocol v5.2 Standard for UdeA

- **Bundle Size:** 20 questions (Mastery).
- **ID Pattern:** `CO-PREU-UDEA-P[N]-[TOPIC]-[###]-MASTERY`
- **Mandatory Metadata:**
  ```yaml
  institution_id: "udea"
  alignment: "Admission UdeA Standard"
  rubric_baseline: "razonamiento_logico, competencia_lectora"
  ```
- **Feedback Rule:** Every option must have `<!-- feedback: ... -->` explaining the specific misconception or correct reasoning.
