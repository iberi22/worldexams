# ES - España Bundle Creation Rules

## Official Exam Framework
- **Exam:** EBAU (Evaluación de Bachillerato para el Acceso a la Universidad) / EvAU (Evaluación para el Acceso a la Universidad) — known regionally as PAU, ABAU, etc.
- **Agency:** Each Autonomous Community + UNED (Universidad Nacional de Educación a Distancia); national framework by Ministerio de Educación y Formación Profesional
- **Subjects:** `ingles`, `matematicas` (Note: Only these subjects exist in the Spain filesystem under `questions_data/spain/`)
- **Grade:** 2° de Bachillerato (12th grade)
- **Established:** 2017 (LOMCE — current EBAU); replaced PAU; LOMLOE modifications from 2022–2024
- **Bundles Directory:** `questions_data/espana/`

## Curriculum Alignment


## Bundle Directory Structure
```
questions_data/espana/
  ├── grado-11/
  │   ├── periodo-1/
  │   │   ├── SUBJECT/
  │   │   │   └── CODE-SUBJ-11-P1-TOPIC-NNN-MASTERY-bundle.md
  │   │   └── ...
  │   └── ...
  └── ...
```

## Language & Cultural Rules
- Questions must use España-specific spelling and terminology
- Use local cultural references in contexts
- Never reference ICFES or Colombian exam names; use the country's own exam name
- All questions must be in standard Spanish 

## Subject Bundle Strategy
Create bundles in order of priority:
1. Core mandatory subjects first
2. Most popular modular areas second
3. Progressive difficulty (basic → intermediate → advanced → expert)

## Canonical directory (REQUIRED — v5.2)
```
questions_data/[country-folder]/{asignatura}/grado-{N}/2026/weekly/
  ES-{SUBJ}-{GRADE}-2026-W{NN}-{tema}-001-MASTERY-bundle.md
```
Do **not** use `periodo-1` for new bundles. See `_TEMPLATE.md` and `AGENTS.md`.

## Anti-Error Checklist (v5.2, 2026-07-28)

Basado en la purga de contenido 2026-07-28 — ver `docs/specs/CONTENT_ERRORS.md`.
Antes de guardar CADA bundle de ES:

- **Eje por pregunta:** `**EJE:**` (ICFES está PROHIBIDO fuera de Colombia).
- **alignment:** "EBAU/EVAU + LOMLOE" — nunca ICFES/Saber/DBA MEN.
- **Carpeta canónica:** `questions_data/spain/{subject}/grado-{N}/2026/weekly/` (la carpeta es el nombre completo del país, no el código).
- **Frontmatter:** los 15 campos exactos de `AGENTS.md`; `week: "WNN"` (nunca `semana:`); `country: "spain"`; `id` = filename sin `.md`.
- **Formato:** `## Question N [D#-D#] (rango, ej. [D3-D4])` (nunca `## Pregunta`), `### Enunciado`/`### Opciones`/`### Explicacion Pedagogica`, `**Contexto:**` (nunca `**Context:**`).
- **Dificultad en RANGO:** cada encabezado `## Question N` DEBE llevar el rango exacto `[D3-D4]`, `[D5-D6]`, `[D7-D8]` o `[D9-D10]` (nunca `[D3]` individual — el validador falla con `[D#]` suelto).
- **Frontmatter `bundle_index`:** incluir SIEMPRE `bundle_index: 1` (obligatorio v5.2, el validador emite ERROR si falta).
- **Bloque `calibration`:** incluir SIEMPRE `calibration:` en el frontmatter (el validador emite warning si falta).
- **Sin placeholders:** prohibidos los literales "Distractor N", "Opcion correcta", "Opcion B/C/D", "tema-semana-NN".
- **Opciones:** exactamente 4 (A-D), una sola `[x]`, textos únicos, feedback no vacío en todas.
- **Validación obligatoria:** `npm run validate -- {archivos}` en 0 fallos antes de comentar `[OK]` en el issue; después regenerar packs con `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` y verificar `npm run audit:country-readiness`.
