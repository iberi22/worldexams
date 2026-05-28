# MX - Mexico Bundle Creation Rules

## Official Exam Framework
- **Exam:** EXANI-II (Examen Nacional de Ingreso a la Educación Superior)
- **Agency:** CENEVAL (Centro Nacional de Evaluación para la Educación Superior)
- **Subjects:** Comprensión Lectora, Redacción Indirecta, Pensamiento Matemático, Inglés (diagnóstico)
- **Grade:** 12 (Último año de preparatoria / Educación Media Superior)
- **Established:** 2022 (SEP Plan de Estudios — Marco Curricular Común); EXANI-II itself is older
- **Bundles Directory:** `questions_data/mexico/`

## Curriculum Alignment
### EXANI-II (CENEVAL) - Mexico
- **Core Transversal (65%):**
  - Comprensión Lectora (30 questions)
  - Redacción Indirecta (30 questions)
  - Pensamiento Matemático (30 questions) - Aritmética, Álgebra, Estadística, Probabilidad, Geometría, Trigonometría
- **Modular (35% - 24 questions each):**
  - 16 modules: Administración, Aritmética, Biología, Cálculo Diferencial e Integral, Ciencias de la Salud, Ciencias Experimentales, Ciencias Sociales, Derecho, Economía, Filosofía, Física, Historia, Literatura, Matemáticas Financieras, Probabilidad y Estadística, Psicología, Química
- **Diagnóstico:** Inglés (30 questions, not scored)
- **Format:** 168 questions + 20 pilot, 4.5 hours
- **Bundle Strategy:** Create 3-5 bundles per transversal subject + modular bundles for high-demand careers

## Bundle Directory Structure
```
questions_data/mexico/
  ├── grado-11/
  │   ├── periodo-1/
  │   │   ├── SUBJECT/
  │   │   │   └── CODE-SUBJ-11-P1-TOPIC-NNN-MASTERY-bundle.md
  │   │   └── ...
  │   └── ...
  └── ...
```

## Language & Cultural Rules
- Questions must use Mexico-specific spelling and terminology
- Use local cultural references in contexts
- Never reference ICFES or Colombian exam names; use the country's own exam name
- All questions must be in standard Spanish 

## Subject Bundle Strategy
Create bundles in order of priority:
1. Core mandatory subjects first
2. Most popular modular areas second
3. Progressive difficulty (basic → intermediate → advanced → expert)
