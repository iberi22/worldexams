# HN - Honduras Bundle Creation Rules

## Official Exam Framework
- **Exam:** Pruebas Nacionales de Bachillerato / Evaluación de la Calidad Educativa
- **Agency:** SE (Secretaría de Educación de Honduras) — Dirección General de Evaluación de la Calidad Educativa
- **Subjects:** Español, Matemáticas, Ciencias Sociales, Ciencias Naturales
- **Grade:** 3° de Bachillerato Técnico o 2° de Bachillerato en Ciencias y Letras (12th grade)
- **Reference:** https://www.se.gob.hn/

## Bundle Directory Structure
```
questions_data/hn/
  └── grado-11/
      └── periodo-1/
          └── [subject]/
              └── HN-SUBJ-11-P1-TOPIC-NNN-MASTERY-bundle.md
```

## Language & Cultural Rules
- Use standard Honduran Spanish
- Use HNL L (Lempira) for currency references
- Reference Honduran cities: Tegucigalpa, San Pedro Sula, La Ceiba, Comayagua
- Never reference ICFES or Colombian exam names

## Canonical directory (REQUIRED — v5.2)
```
questions_data/[country-folder]/{asignatura}/grado-{N}/2026/weekly/
  HN-{SUBJ}-{GRADE}-2026-W{NN}-{tema}-001-MASTERY-bundle.md
```
Do **not** use `periodo-1` for new bundles. See `_TEMPLATE.md` and `AGENTS.md`.

## Anti-Error Checklist (v5.2, 2026-07-28)

Basado en la purga de contenido 2026-07-28 — ver `docs/specs/CONTENT_ERRORS.md`.
Antes de guardar CADA bundle de HN:

- **Eje por pregunta:** `**EJE:**` (ICFES está PROHIBIDO fuera de Colombia).
- **alignment:** "CNB Honduras / Secretaria de Educacion" — nunca ICFES/Saber/DBA MEN.
- **Carpeta canónica:** `questions_data/honduras/{subject}/grado-{N}/2026/weekly/` (la carpeta es el nombre completo del país, no el código).
- **Frontmatter:** los 15 campos exactos de `AGENTS.md`; `week: "WNN"` (nunca `semana:`); `country: "honduras"`; `id` = filename sin `.md`.
- **Formato:** `## Question N [D#]` (nunca `## Pregunta`), `### Enunciado`/`### Opciones`/`### Explicacion Pedagogica`, `**Contexto:**` (nunca `**Context:**`).
- **Sin placeholders:** prohibidos los literales "Distractor N", "Opcion correcta", "Opcion B/C/D", "tema-semana-NN".
- **Opciones:** exactamente 4 (A-D), una sola `[x]`, textos únicos, feedback no vacío en todas.
- **Validación obligatoria:** `npm run validate -- {archivos}` en 0 fallos antes de comentar `[OK]` en el issue; después regenerar packs con `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` y verificar `npm run audit:country-readiness`.
