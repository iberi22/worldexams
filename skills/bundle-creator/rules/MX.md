# MX - Mexico Bundle Creation Rules (v5.2)

## Official Exam Framework
- **Exam:** EXANI-II (CENEVAL, ingreso universidad); COMIPEMS (ingreso bachillerato CDMX/ZMVM); PLANE/PLANEA (Plan Nacional para la Evaluación de los Aprendizajes, histórico) y diagnósticos NEM
- **Curriculum:** SEP (Secretaría de Educación Pública) · NEM (Nueva Escuela Mexicana) · Planes y programas 2022
- **Agency:** CENEVAL (EXANI) · SEP (Secretaría de Educación Pública) · NEM (Nueva Escuela Mexicana)
- **Grade:** Primaria 1°–6°, Secundaria 1°–3° (G7–G9), Media Superior 1°–3° (often WorldExams `grado-10`–`grado-12`; weekly packs commonly use `grado-11` for EMS)
- **Established:** EXANI long-running; SEP Plan de Estudios / MCCEMS updates under NEM (2022+)
- **Reference:** https://www.ceneval.edu.mx · https://www.gob.mx/sep
- **Curriculum notes:** `docs/specs/curriculums/mexico/README.md`
- **Bundles Directory:** `questions_data/mexico/`
- **Authority:** `AGENTS.md` Bundle Protocol v5.2 · `npm run validate`

## Subjects (folder keys)
*Only these subjects exist in the Mexico filesystem under `questions_data/mexico/` and are supported:*
| Area | Subject key | Notes |
|------|-------------|-------|
| Matemáticas / Pensamiento Matemático | `matematicas` | Core transversal EXANI |
| Lectura Crítica / Comprensión Lectora | `lectura-critica` | EXANI transversal |

*Note: The subjects `lengua`, `ciencias-naturales`, `sociales-ciudadanas`, and `ingles` do not exist under `questions_data/mexico/` and are currently not supported.*

## Curriculum Alignment (SEP/NEM + EXANI stubs)

### Grado 6° (fin de primaria)
- **Matemáticas:** Números naturales y decimales, fracciones, perímetro/área, tablas y gráficas.
- **Lengua:** Comprensión literal; tipologías narrativas e informativas; ortografía básica.
- **Ciencias:** Ecosistemas mexicanos, cuerpo humano, materia y energía introductoria.
- **Civismo:** Derechos de niñas/niños, convivencia, símbolos patrios (sin adoctrinamiento).

### Grado 9° (3° secundaria)
- **Matemáticas:** Proporcionalidad, ecuaciones lineales, geometría, probabilidad introductoria.
- **Lengua:** Argumentación breve, textos discontinuos, gramática funcional.
- **Ciencias:** Célula, reacciones químicas básicas, movimiento; salud ambiental.
- **Historia:** México independiente / siglo XX (nivel secundaria; hechos verificables).

### Grado 11° (Media Superior — EXANI-II prep)
- **Pensamiento Matemático:** Aritmética, álgebra, geometría, trigonometría, estadística, probabilidad.
- **Comprensión Lectora:** Textos continuos/discontinuos, inferencias, vocabulario en contexto.
- **Redacción Indirecta:** Cohesión, coherencia, puntuación, concordancia.
- **Módulos electivos (alta demanda):** Biología, Química, Física, Historia, Cálculo, Economía, etc.
- Do **not** claim W01–W40 is the official SEP ciclo escolar calendar.

### EXANI-II structure (generation awareness)
- Transversales (~65%): Comprensión Lectora, Redacción Indirecta, Pensamiento Matemático.
- Módulos (~35%): career-specific blocks.
- Inglés diagnóstico often present but not always scored — treat as optional packs.

## Canonical Path (Protocol v5.2)

```text
questions_data/mexico/{subject}/grado-{N}/2026/weekly/
  MX-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

Example:

```text
questions_data/mexico/matematicas/grado-11/2026/weekly/
  MX-MAT-11-2026-W01-numeros-reales-001-MASTERY-bundle.md
```

Obsolete: `grado-11/periodo-1/...`, root `grado-11/` without `2026/weekly/`, and `MX-*-P1-*` IDs — do not use for new weekly generation.

## Calendar Notes (W ↔ periods)
- SEP **ciclo escolar** typically runs ~**mid-August → early July** (not calendar-year aligned).
- Common EMS/secundaria organization: **3 periodos** or school-defined blocks within the ciclo.
- Stub mapping (internal only): W01–W14 ≈ Periodo 1 (Aug–Nov), W15–W28 ≈ Periodo 2 (Dec–Mar), W29–W40 ≈ Periodo 3 (Mar–Jun).
- EXANI-II application windows vary by institution/process (often spring for many licenciatura admissions); never invent Exact CENEVAL dates in stems.
- Sources: `docs/specs/curriculums/mexico/README.md`; AGENTS.md Mexico calendar note; stubs in `config/countries.config.ts`.

## Language & Cultural Rules
- Mexican Spanish (tú; ustedes plural). **Tuteo estandar: NUNCA voseo ("vos")** — eso es Argentina/Uruguay.
- Registros neutros educativos: prohibido "güey", "chido" y analogos coloquiales en enunciados y explicaciones.
- Currency: Peso mexicano (**MXN $**) con formato `$1,234.50`.
- Cities: Ciudad de México, Guadalajara, Monterrey, Puebla, Cancún, Mérida, Oaxaca, Tijuana.
- Names: José, María, Guadalupe, Luis, Fernanda, Diego, Ximena, Carlos.
- Institutions as context (not endorsement): UNAM, IPN, IMSS, SEP — factual only.
- Contexts: Día de Muertos, 15/16 de septiembre, gastronomía, geografía diversa — no historical/legal hallucinations.
- Never reference ICFES; do not put "EXANI"/"CENEVAL" inside stems (metadata/`alignment` only).

## Bloom & Difficulty Mapping (igual que CO)
- G6–G7 (10q): Q1–Q2 D3-D4 Remember/Understand · Q3–Q5 D5-D6 Apply · Q6–Q8 D7-D8 Analyze · Q9–Q10 D9-D10 Evaluate.
- G3–G5 (8q): Q1–Q2 D3-D4 Remember/Understand · Q3–Q5 D5-D6 Apply · Q6–Q7 D7-D8 Analyze · Q8 D9-D10 Evaluate.
- G8–G10 (12q) y G11 (20q): progresion creciente segun AGENTS.md; nunca saltar de basico a experto al inicio.
- Eje evaluado por pregunta: `**EJE:**` con ejes NEM ("Numero, Algebra y Variacion", "Forma, Espacio y Medida", "Datos, Probabilidad y Variacion") o "Pensamiento matematico" / "Numerico" / "Variacion y cambio".

## Subject Bundle Strategy
1. **Priority 1:** G11 transversales EXANI (matemáticas, lectura-crítica, lengua).
2. **Priority 2:** G6–G9 SEP/NEM core; then high-demand modules.
3. Bundle sizes (v5.2): G3–G5 = 8q · G6–G7 = 10q · G8–G10 = 12q · G11 = 20q.

## Anti-Error Checklist (v5.2, 2026-07-28)

Basado en la purga de contenido 2026-07-28 — ver `docs/specs/CONTENT_ERRORS.md`.
Antes de guardar CADA bundle de MX:

- **Eje por pregunta:** `**EJE:**` (ICFES está PROHIBIDO fuera de Colombia).
- **alignment:** "SEP/NEM Mexico / EXANI CENEVAL" — nunca ICFES/Saber/DBA MEN.
- **Carpeta canónica:** `questions_data/mexico/{subject}/grado-{N}/2026/weekly/` (la carpeta es el nombre completo del país, no el código).
- **Frontmatter:** los 15 campos exactos de `AGENTS.md`; `week: "WNN"` (nunca `semana:`); `country: "mexico"`; `id` = filename sin `.md`.
- **Formato:** `## Question N [D#-D#] (rango, ej. [D3-D4])` (nunca `## Pregunta`), `### Enunciado`/`### Opciones`/`### Explicacion Pedagogica`, `**Contexto:**` (nunca `**Context:**`).
- **Dificultad en RANGO:** cada encabezado `## Question N` DEBE llevar el rango exacto `[D3-D4]`, `[D5-D6]`, `[D7-D8]` o `[D9-D10]` (nunca `[D3]` individual — el validador falla con `[D#]` suelto).
- **Frontmatter `bundle_index`:** incluir SIEMPRE `bundle_index: 1` (obligatorio v5.2, el validador emite ERROR si falta).
- **Bloque `calibration`:** incluir SIEMPRE `calibration:` en el frontmatter (el validador emite warning si falta).
- **Sin placeholders:** prohibidos los literales "Distractor N", "Opcion correcta", "Opcion B/C/D", "tema-semana-NN".
- **Opciones:** exactamente 4 (A-D), una sola `[x]`, textos únicos, feedback no vacío en todas.
- **Validación obligatoria:** `npm run validate -- {archivos}` en 0 fallos antes de comentar `[OK]` en el issue; después regenerar packs con `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` y verificar `npm run audit:country-readiness`.
