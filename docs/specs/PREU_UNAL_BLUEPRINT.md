# Blueprint: Universidad Nacional de Colombia (UNAL) Admission

**Status:** Draft / Active for Protocol v5.2
**Target:** 2026 Admission Cycle
**Official Source:** [admisiones.unal.edu.co](https://admisiones.unal.edu.co)

## 1. Exam Structure

The UNAL exam is a 120-question, 3.5-hour test evaluating 5 core competencies. It focuses on **Reasoning** and **Representation Transfer** rather than technical memorization.

| Component | Questions | Key Skills |
| :--- | :---: | :--- |
| **Análisis Textual** | 25 | Literal, inferential, and critical reading. |
| **Matemáticas** | 25 | Functional reasoning, modeling, geometry, and probability. |
| **Ciencias Naturales** | 25 | Physics, Chemistry, Biology (integrated phenomena). |
| **Ciencias Sociales** | 25 | History, Geography, Philosophy, Civic reasoning. |
| **Análisis de la Imagen** | 20 | Spatial reasoning, symmetry, logic of sequences, projections. |

## 2. Component Depth

### Análisis de la Imagen (Unique to UNAL)
- **Spatial Reasoning:** 3D rotation of solids.
- **Projections:** Matching 2D views (top, side, front) to 3D models.
- **Logic of Sequences:** Finding patterns in visual changes.
- **Image Context:** Interpreting diagrams and complex visual representations.

### Matemáticas
- Focus on "Pensamiento Variacional" (functions, limits, continuity).
- Geometric problem solving (Euler's theorem, volumes).
- Data analysis and probability.

### Ciencias Naturales / Sociales
- Highly contextualized questions.
- Requires synthesis of multiple data points (graphs + text).

## 3. Protocol v5.2 Standard for UNAL

- **Bundle Size:** 20 questions (Mastery).
- **ID Pattern:** `CO-PREU-UNAL-P[N]-[TOPIC]-[###]-MASTERY`
- **Mandatory Metadata:**
  ```yaml
  institution_id: "unal"
  alignment: "Admission UNAL (v4.1+ Blueprint)"
  rubric_baseline: "analisis_textual, matematicas, ciencias_naturales, ciencias_sociales, analisis_imagen"
  ```
- **Feedback Rule:** Every option must have `<!-- feedback: ... -->` explaining the specific misconception or correct reasoning.
