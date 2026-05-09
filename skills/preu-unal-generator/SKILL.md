# Skill: PREU UNAL Question Generator (v5.2)

This skill specializes in generating high-quality admission questions for the Universidad Nacional de Colombia (UNAL), following the institutional blueprint and Protocol v5.2.

## Core Competencies

### 1. Análisis de la Imagen (Critical)
UNAL requires 20/120 questions in this area. The generator must be able to describe:
- **Spatial Folding/Unfolding:** Describing 2D nets that form 3D solids.
- **Views & Projections:** Top, front, and side views (monge system).
- **Symmetry & Patterns:** Identifying axes of symmetry and rotation in complex icons.

### 2. Análisis Textual
- Focus on argumentative fragments.
- Evaluate the relationship between evidence and thesis.
- Distractors must exploit partial comprehension or over-literal interpretation.

### 3. Matemáticas (Mastery)
- Topics: Functional reasoning, limits, derivatives (basic), probability, and geometric theorems (Euler).
- Context: Real-world modeling or abstract geometric structures.

## Generation Protocol (v5.2)

### Required Frontmatter
```yaml
---
id: "CO-PREU-UNAL-P1-[TOPIC]-[###]-MASTERY"
country: "colombia"
grado: 11
asignatura: "preuniversitario"
tema: "[tema-kebab-case]"
protocol_version: "5.2"
institution_id: "unal"
alignment: "Admission UNAL (v4.1+ Blueprint)"
quarantine: false # Set to true if bundle is incomplete
---
```

### Feedback Requirement
Every question must include educational feedback for ALL 4 options using the `<!-- feedback: ... -->` syntax.

### Distribution per Bundle (Standard 20)
- 4 Textual
- 4 Math
- 4 Natural Sciences
- 4 Social Sciences
- 4 Image Analysis
*(This ensures a balanced "Simulacro Compacto")*

## Example Prompting
"Generate a UNAL Image Analysis question about a 3D solid rotation. The solid is a T-shaped block made of 6 cubes. Ask for the lateral view after a 270-degree vertical rotation. Include plausible distractors based on 90-degree confusion."
