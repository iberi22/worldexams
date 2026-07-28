# AR - Argentina Bundle Creation Rules (v5.2)

## Official Exam Framework
- **Exam:** Aprender (Operativo Nacional de Evaluación); university entry is mostly open (UBA CBC, UTN seminars, etc. — not a single national entrance exam)
- **Agency:** Ministerio de Educación de la Nación · Secretaría de Evaluación e Información Educativa
- **Curriculum:** NAP (Núcleos de Aprendizajes Prioritarios) + jurisdiccional overlays
- **Grade:** Primaria 1°–6°/7° and Secundaria 1°–5°/6° depending on jurisdiction; WorldExams commonly maps último año secundaria to `grado-11`/`grado-12`
- **Reference:** https://www.argentina.gob.ar/educacion/aprender
- **Curriculum notes:** `docs/specs/curriculums/argentina/README.md`
- **Bundles Directory:** `questions_data/argentina/`
- **Authority:** `AGENTS.md` Bundle Protocol v5.2 · `npm run validate`

## Subjects (folder keys)
| Area | Subject key | Notes |
|------|-------------|-------|
| Matemática | `matematicas` (prefer) / `matematica` | Prefer plural for new weekly packs |
| Lengua | `lengua` | Aprender core |
| Lectura Crítica | `lectura-critica` | Practice overlay |
| Ciencias Naturales | `ciencias-naturales` | Rotating Aprender area |
| Ciencias Sociales | `sociales-ciudadanas` | Rotating Aprender area |
| Inglés | `ingles` | Jurisdictional |

## Curriculum Alignment (NAP stubs)

### Grado 6°
- **Matemática:** Números naturales/racionales intro, operaciones, geometría, medición, datos.
- **Lengua:** Cuentos/fábulas, comprensión narrativa, ortografía y gramática básica.

### Grado 9° (≈ 3° secundaria)
- **Matemática:** Proporcionalidad, ecuaciones, geometría, estadística introductoria.
- **Lengua:** Textos expositivos/argumentativos; tipologías; coherencia.
- **Cs. Naturales / Sociales:** According to NAP ciclo — keep claims factual.

### Grado 11° (cierre secundaria / pre-CBC)
- **Matemática:** Reales, álgebra, funciones, trigonometría, estadística/probabilidad; intro análisis según orientación.
- **Lengua:** Comprensión argumentativa, producción académica, literatura argentina/latinoamericana.
- **Cs. Naturales:** Genética, química general, mecánica básica — nivel secundario.
- Do **not** claim a single national W01–W40 calendar (jurisdictions differ).

## Canonical Path (Protocol v5.2)

```text
questions_data/argentina/{subject}/grado-{N}/2026/weekly/
  AR-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

Example:

```text
questions_data/argentina/matematicas/grado-11/2026/weekly/
  AR-MAT-11-2026-W01-numeros-reales-001-MASTERY-bundle.md
```

Obsolete: `grado-11/periodo-1/...` and `AR-*-P1-*` IDs — do not use for new weekly generation.

## Calendar Notes (W ↔ periods)
- School year typically **March–December**, but **calendars vary by jurisdicción** (CABA, PBA, etc.).
- Common patterns: **3 trimestres** or 2 cuatrimestres — treat W-bands as internal only.
- Stub mapping (non-official): W01–W13 ≈ T1, W14–W26 ≈ T2, W27–W40 ≈ T3.
- Aprender administration windows vary by year (often second semester); do not invent dates in stems.
- Sources: `docs/specs/curriculums/argentina/README.md`; AGENTS.md Argentina calendar note.

## Language & Cultural Rules
- **Voseo** required: "vos tenés", "calculá", "mirá" — not tú forms as default.
- Currency: Peso argentino (**ARS $**).
- Cities: Buenos Aires, Córdoba, Rosario, Mendoza, La Plata, Mar del Plata, Salta.
- Names: Matías, Facundo, Lucía, Valentina, Martín, Camila, Sofía, Agustín.
- Contexts: mate, asado, fútbol, 25 de Mayo, 9 de Julio — factual only.
- Never reference ICFES; do not put "Aprender" brand inside stems (metadata/`alignment` only).

## Subject Bundle Strategy
1. **Priority 1:** Lengua + Matemática G6/G11 (Aprender-style).
2. **Priority 2:** Cs. Naturales / Sociales; inglés.
3. Bundle sizes (v5.2): G3–G5 = 8q · G6–G7 = 10q · G8–G10 = 12q · G11 = 20q.

## Anti-Error Checklist (v5.2, 2026-07-28)

Basado en la purga de contenido 2026-07-28 — ver `docs/specs/CONTENT_ERRORS.md`.
Antes de guardar CADA bundle de AR:

- **Eje por pregunta:** `**EJE:**` (ICFES está PROHIBIDO fuera de Colombia).
- **alignment:** "NAP Argentina / Aprender" — nunca ICFES/Saber/DBA MEN.
- **Carpeta canónica:** `questions_data/argentina/{subject}/grado-{N}/2026/weekly/` (la carpeta es el nombre completo del país, no el código).
- **Frontmatter:** los 15 campos exactos de `AGENTS.md`; `week: "WNN"` (nunca `semana:`); `country: "argentina"`; `id` = filename sin `.md`.
- **Formato:** `## Question N [D#]` (nunca `## Pregunta`), `### Enunciado`/`### Opciones`/`### Explicacion Pedagogica`, `**Contexto:**` (nunca `**Context:**`).
- **Sin placeholders:** prohibidos los literales "Distractor N", "Opcion correcta", "Opcion B/C/D", "tema-semana-NN".
- **Opciones:** exactamente 4 (A-D), una sola `[x]`, textos únicos, feedback no vacío en todas.
- **Validación obligatoria:** `npm run validate -- {archivos}` en 0 fallos antes de comentar `[OK]` en el issue; después regenerar packs con `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` y verificar `npm run audit:country-readiness`.
