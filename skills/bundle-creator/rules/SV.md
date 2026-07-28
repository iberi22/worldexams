# SV - El Salvador Bundle Creation Rules

## Official Exam Framework
- **Exam:** PAES (Pruebas de Aprendizaje y Aptitudes) — modified assessment system
- **Agency:** MINED (Ministerio de Educación, Ciencia y Tecnología de El Salvador)
- **Subjects:** Matemáticas, Lenguaje y Literatura, Estudios Sociales y Cívica, Ciencias Naturales
- **Grade:** 2° año de Bachillerato (12th grade — last year of 2-year Bachillerato)
- **Reference:** https://www.mined.gob.sv/

## Bundle Directory Structure
```
questions_data/sv/
  └── grado-11/
      └── periodo-1/
          └── [subject]/
              └── SV-SUBJ-11-P1-TOPIC-NNN-MASTERY-bundle.md
```

## Language & Cultural Rules
- Use standard Salvadoran Spanish
- Use USD $ for currency (El Salvador uses US Dollar)
- Reference Salvadoran cities: San Salvador, Santa Ana, San Miguel, Soyapango
- Use common Salvadoran names: José, Francisco, María, Rosa, Carlos, Ana
- Never reference ICFES or Colombian exam names

## Canonical directory (REQUIRED — v5.2)
```
questions_data/[country-folder]/{asignatura}/grado-{N}/2026/weekly/
  SV-{SUBJ}-{GRADE}-2026-W{NN}-{tema}-001-MASTERY-bundle.md
```
Do **not** use `periodo-1` for new bundles. See `_TEMPLATE.md` and `AGENTS.md`.

## Anti-Error Checklist (v5.2, 2026-07-28)

Basado en la purga de contenido 2026-07-28 — ver `docs/specs/CONTENT_ERRORS.md`.
Antes de guardar CADA bundle de SV:

- **Eje por pregunta:** `**EJE:**` (ICFES está PROHIBIDO fuera de Colombia).
- **alignment:** "MINED - PAES El Salvador" — nunca ICFES/Saber/DBA MEN.
- **Carpeta canónica:** `questions_data/el-salvador/{subject}/grado-{N}/2026/weekly/` (la carpeta es el nombre completo del país, no el código).
- **Frontmatter:** los 15 campos exactos de `AGENTS.md`; `week: "WNN"` (nunca `semana:`); `country: "el-salvador"`; `id` = filename sin `.md`.
- **Formato:** `## Question N [D#]` (nunca `## Pregunta`), `### Enunciado`/`### Opciones`/`### Explicacion Pedagogica`, `**Contexto:**` (nunca `**Context:**`).
- **Sin placeholders:** prohibidos los literales "Distractor N", "Opcion correcta", "Opcion B/C/D", "tema-semana-NN".
- **Opciones:** exactamente 4 (A-D), una sola `[x]`, textos únicos, feedback no vacío en todas.
- **Validación obligatoria:** `npm run validate -- {archivos}` en 0 fallos antes de comentar `[OK]` en el issue; después regenerar packs con `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` y verificar `npm run audit:country-readiness`.
