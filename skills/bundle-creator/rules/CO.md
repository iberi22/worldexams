# CO - Colombia Bundle Creation Rules (v6.0)

## Official Exam Framework
- **Exam:** Saber 3°, 5°, 7°, 9°, 11°
- **Agency:** ICFES (Instituto Colombiano para la Evaluación de la Educación) — under MEN (Ministerio de Educación Nacional)
- **Grade:** 3° to 11°
- **Established:** 1968 (ICFES). Current standards: Estándares Básicos de Competencias (EBC) — 2006 and DBA (Derechos Básicos de Aprendizaje) — 2017.
- **Bundles Directory:** `questions_data/colombia/`

## Curriculum Alignment (DBA + Standards)

### Grado 3°
- **Matemáticas:** Números 0-10,000, Multiplicación, Geometría básica, Medición.
- **Lenguaje:** Comprensión literal, secuencias narrativas, textos discontinuos básicos.
- **Inglés:** Saludos, colores, números 1-50, cuerpo humano, animales.

### Grado 6°
- **Matemáticas:** Números enteros (Z), Racionales (Q), Razones y proporciones, Geometría (prismas).
- **Lenguaje:** Situación comunicativa, textos narrativos (mito, leyenda), oraciones complejas.
- **Ciencias Naturales:** Clasificación reinos, ecosistemas, mezclas, Sistema Solar.
- **Ciudadanas:** Derechos humanos, democracia escolar, resolución de conflictos.
- **Inglés (A1+):** Presente simple, continuo, pasado simple (regulares), comparativos.

### Grado 11°
- **Lectura Crítica:** Análisis de textos argumentativos, filosóficos, multiperspectivismo.
- **Matemáticas:** Funciones, límites, derivadas, estadística compleja.
- **Ciencias Naturales:** Genética, cinemática, estequiometría, evolución.
- **Sociales y Ciudadanas:** Geopolítica, conflictos contemporáneos, economía, Constitución 1991.
- **Inglés (B1-B2):** Conditionals, Passive voice, Relative clauses, Reading comprehension.

## Bundle Directory Structure
```
questions_data/colombia/
  ├── [asignatura]/
  │   ├── grado-[N]/
  │   │   ├── periodo-[P]/
  │   │   │   ├── [tema]/
  │   │   │   │   └── CO-[SUBJ]-[GRADO]-P[P]-[TOPIC]-NNN-MASTERY-bundle.md
```

## Language & Cultural Rules
- Use local context: Pesos Colombianos, landmarks (Bogotá, Cartagena, Monserrate), local names (Juan, Valentina).
- Spelling: Use "seseo" and standard Colombian vocabulary.
- Never mention "ICFES" in question content; only in metadata.

## Subject Bundle Strategy
1. **Priority 1:** Grado 6° (Gap closing).
2. **Priority 2:** Grado 3° (Primary baseline).
3. **Priority 3:** Grado 5° (Key primary assessment).
4. Bundle sizes: 10 (Grades 3-4), 15 (Grades 5-7), 20 (Grades 8-11).
