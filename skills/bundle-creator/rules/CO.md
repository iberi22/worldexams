# CO - Colombia Bundle Creation Rules (v5.2)

## Official Exam Framework
- **Exam:** Saber 3°, 5°, 7°, 9°, 11°
- **Agency:** ICFES (Instituto Colombiano para la Evaluación de la Educación) — under MEN (Ministerio de Educación Nacional)
- **Grade:** 3° to 11° (WorldExams `grado-3` … `grado-11`)
- **Established:** 1968 (ICFES). Current standards: Estándares Básicos de Competencias (EBC) — 2006 and DBA (Derechos Básicos de Aprendizaje) — 2017.
- **Bundles Directory:** `questions_data/colombia/`
- **Authority:** `AGENTS.md` Bundle Protocol v5.2 · `npm run validate`

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

## Canonical Path (Protocol v5.2)

```text
questions_data/colombia/{subject}/grado-{N}/2026/weekly/
  CO-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

Legacy `periodo-[1-4]/` and `P[P]` IDs are historical (see `skills/colombia-assessment-protocol-v6`). Do **not** create new bundles under `periodo-*` for weekly 2026 work.

## Calendar Notes (W ↔ periods)
- Colombia academic year (Calendario A, majority): roughly Feb–Nov with four periods.
- Internal mapping stub: W01–W10 ≈ P1, W11–W20 ≈ P2, W21–W30 ≈ P3, W31–W40 ≈ P4.
- `W01-W40` is a curricular sequence compatible with ~40 academic weeks; not an ISO week claim.
- Saber 11 calendar A/B exam windows: see `config/countries.config.ts` schedules.

## Language & Cultural Rules
- Use local context: Pesos Colombianos (COP), landmarks (Bogotá, Cartagena, Monserrate), local names (Juan, Valentina).
- Spelling: Use "seseo" and standard Colombian vocabulary.
- Never mention "ICFES" in question content; only in metadata / `alignment`.

## Subject Bundle Strategy
1. **Priority 1:** Grado 6°–7° (gap closing).
2. **Priority 2:** Grado 3°–5° (primary baseline).
3. **Priority 3:** Grado 11° (Saber 11 / PREU).
4. Bundle sizes (v5.2): G3–G5 = 8q · G6–G7 = 10q · G8–G10 = 12q · G11 = 20q.

## Anti-Error Checklist (v5.2, 2026-07-28)

Basado en la purga de contenido 2026-07-28 — ver `docs/specs/CONTENT_ERRORS.md`.
Antes de guardar CADA bundle de CO:

- **Eje por pregunta:** `**ICFES:**` (exclusivo de Colombia; prohibido `**EJE:**` aquí).
- **alignment:** "DBA MEN Colombia / Saber 11" — nunca ICFES/Saber/DBA MEN.
- **Carpeta canónica:** `questions_data/colombia/{subject}/grado-{N}/2026/weekly/` (la carpeta es el nombre completo del país, no el código).
- **Frontmatter:** los 15 campos exactos de `AGENTS.md`; `week: "WNN"` (nunca `semana:`); `country: "colombia"`; `id` = filename sin `.md`.
- **Formato:** `## Question N [D#]` (nunca `## Pregunta`), `### Enunciado`/`### Opciones`/`### Explicacion Pedagogica`, `**Contexto:**` (nunca `**Context:**`).
- **Sin placeholders:** prohibidos los literales "Distractor N", "Opcion correcta", "Opcion B/C/D", "tema-semana-NN".
- **Opciones:** exactamente 4 (A-D), una sola `[x]`, textos únicos, feedback no vacío en todas.
- **Validación obligatoria:** `npm run validate -- {archivos}` en 0 fallos antes de comentar `[OK]` en el issue; después regenerar packs con `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` y verificar `npm run audit:country-readiness`.
