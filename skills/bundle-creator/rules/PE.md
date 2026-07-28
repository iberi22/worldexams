# PE - Peru Bundle Creation Rules (v5.2)

## Official Exam Framework
- **Exam:** No single centralized university entrance exam — each university (UNMSM, UNI, PUCP, etc.) administers its own. National diagnostic: ECE (Evaluación Censal de Estudiantes).
- **Agency:** MINEDU (Ministerio de Educación del Perú) · UMC for ECE
- **Curriculum:** CNEB (Currículo Nacional de la Educación Básica) — 2016
- **Grade:** Primaria 1°–6° and Secundaria 1°–5° mapped to WorldExams `grado-3` … `grado-11` (5° secundaria ≈ G11)
- **Reference:** https://www.minedu.gob.pe/curriculo/
- **Curriculum notes:** `docs/specs/curriculums/peru/README.md`
- **Bundles Directory:** `questions_data/peru/`
- **Authority:** `AGENTS.md` Bundle Protocol v5.2 · `npm run validate`

## Subjects (folder keys)
| Area | Subject key | Notes |
|------|-------------|-------|
| Matemática | `matematicas` (prefer) / `matematica` | Prefer plural folder for new weekly packs |
| Comunicación | `comunicacion` | CNEB language area |
| Ciencia y Tecnología | `ciencia` / `ciencias-naturales` | Prefer `ciencias-naturales` for new packs when aligning cross-country |
| Ciencias Sociales | `sociales` | Historia, geografía, economía (admisión) |
| Inglés | `ingles` | Optional / elective |

## Curriculum Alignment (CNEB stubs)

### Grado 6° (fin de primaria / inicio transición)
- **Matemáticas:** Números naturales y decimales, fracciones, perímetro/área, datos e incertidumbre básicos.
- **Comunicación:** Comprensión de textos narrativos e informativos; producción escrita breve.
- **Ciencia:** Ecosistemas locales (costa/sierra/selva), materia y energía introductoria.

### Grado 9° (2° secundaria ≈ ciclos VI)
- **Matemáticas:** Racionales, proporciones, ecuaciones lineales, estadística descriptiva.
- **Comunicación:** Textos argumentativos, tipologías textuales, oralidad formal.
- **Ciencia:** Célula, sistemas del cuerpo, mezcla/separación, fuerza y movimiento.

### Grado 11° (5° secundaria — foco admisión)
- **Matemáticas / Razonamiento Matemático:** Números reales, álgebra, geometría, trigonometría, funciones.
- **Comunicación / Razonamiento Verbal:** Comprensión lectora, analogías, tipologías, literatura peruana/latinoamericana.
- **Ciencias:** Biología, física y química a nivel admisión (UNMSM/UNI-style topics).
- **Sociales:** Historia del Perú, geografía, economía, filosofía (según carrera).

Competencias CNEB (matemática): cantidad; regularidad, equivalencia y cambio; forma, movimiento y localización; gestión de datos e incertidumbre.

## Canonical Path (Protocol v5.2)

```text
questions_data/peru/{subject}/grado-{N}/2026/weekly/
  PE-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

Example:

```text
questions_data/peru/matematicas/grado-11/2026/weekly/
  PE-MAT-11-2026-W01-numeros-reales-001-MASTERY-bundle.md
```

Obsolete: `grado-11/periodo-1/...` and `PE-*-P1-*` IDs — do not use for new weekly generation.

## Calendar Notes (W ↔ periods)
- School year (EBR): typically **March–December** (vacations Dec–Feb; mid-year winter break ~July).
- Many schools use **4 bimestres** or 2 semesters; W01–W40 is an internal sequence, not an official MINEDU week index.
- Stub mapping: W01–W10 ≈ Bimestre 1 (Mar–May), W11–W20 ≈ B2 (May–Jul), W21–W30 ≈ B3 (Aug–Oct), W31–W40 ≈ B4 (Oct–Dec).
- ECE windows vary by year (historically late-year diagnostic); do not hardcode ECE dates into stems.
- Sources: `docs/specs/curriculums/peru/README.md`; schedule stubs in `config/countries.config.ts`.

## Language & Cultural Rules
- Standard Peruvian Spanish (tú; avoid Argentine voseo).
- Currency: Sol (**PEN S/**).
- Cities: Lima, Arequipa, Cusco, Trujillo, Chiclayo, Piura, Iquitos.
- Names: Carlos, María, José, Carmen, Diego, Andrea, Luis, Rosa.
- Geography/contexts: costa–sierra–selva, Machu Picchu, Andes, Amazonía, ceviche, quipu (as cultural context, not pseudoscience claims).
- Never reference ICFES, Saber, or Colombian exam brands in content.

## Subject Bundle Strategy
1. **Priority 1:** Grado 11 matemáticas + comunicación (admisión / CNEB cierre).
2. **Priority 2:** Grado 6–9 (ECE-aligned competencies).
3. Bundle sizes (v5.2): G3–G5 = 8q · G6–G7 = 10q · G8–G10 = 12q · G11 = 20q.

## Anti-Error Checklist (v5.2, 2026-07-28)

Basado en la purga de contenido 2026-07-28 — ver `docs/specs/CONTENT_ERRORS.md`.
Antes de guardar CADA bundle de PE:

- **Eje por pregunta:** `**EJE:**` (ICFES está PROHIBIDO fuera de Colombia).
- **alignment:** "CNEB MINEDU Peru" — nunca ICFES/Saber/DBA MEN.
- **Carpeta canónica:** `questions_data/peru/{subject}/grado-{N}/2026/weekly/` (la carpeta es el nombre completo del país, no el código).
- **Frontmatter:** los 15 campos exactos de `AGENTS.md`; `week: "WNN"` (nunca `semana:`); `country: "peru"`; `id` = filename sin `.md`.
- **Formato:** `## Question N [D#]` (nunca `## Pregunta`), `### Enunciado`/`### Opciones`/`### Explicacion Pedagogica`, `**Contexto:**` (nunca `**Context:**`).
- **Sin placeholders:** prohibidos los literales "Distractor N", "Opcion correcta", "Opcion B/C/D", "tema-semana-NN".
- **Opciones:** exactamente 4 (A-D), una sola `[x]`, textos únicos, feedback no vacío en todas.
- **Validación obligatoria:** `npm run validate -- {archivos}` en 0 fallos antes de comentar `[OK]` en el issue; después regenerar packs con `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` y verificar `npm run audit:country-readiness`.
