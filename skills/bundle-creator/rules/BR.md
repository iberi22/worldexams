# BR - Brasil Bundle Creation Rules

## Official Exam Framework
- **Exam:** ENEM (Exame Nacional do Ensino Médio)
- **Agency:** INEP (Instituto Nacional de Estudos e Pesquisas Educacionais Anísio Teixeira) — under MEC (Ministério da Educação)
- **Subjects:** N/A
- **Grade:** 3° ano do Ensino Médio (12th grade equivalent)
- **Established:** 1998 (as diagnostic); 2009 (current format); BNCC-aligned changes from 2024 onward
- **Bundles Directory:** `questions_data/brasil/`

## Curriculum Alignment


## Bundle Directory Structure
```
questions_data/brasil/
  ├── grado-11/
  │   ├── periodo-1/
  │   │   ├── SUBJECT/
  │   │   │   └── CODE-SUBJ-11-P1-TOPIC-NNN-MASTERY-bundle.md
  │   │   └── ...
  │   └── ...
  └── ...
```

## Language & Cultural Rules
- Questions must use Brasil-specific spelling and terminology
- Use local cultural references in contexts
- Never reference ICFES or Colombian exam names; use the country's own exam name
- All questions must be in standard Portuguese (Brazilian) 

## Subject Bundle Strategy
Create bundles in order of priority:
1. Core mandatory subjects first
2. Most popular modular areas second
3. Progressive difficulty (basic → intermediate → advanced → expert)

## Canonical directory (REQUIRED — v5.2)
```
questions_data/[country-folder]/{asignatura}/grado-{N}/2026/weekly/
  BR-{SUBJ}-{GRADE}-2026-W{NN}-{tema}-001-MASTERY-bundle.md
```
Do **not** use `periodo-1` for new bundles. See `_TEMPLATE.md` and `AGENTS.md`.

## Anti-Error Checklist (v5.2, 2026-07-28)

Basado en la purga de contenido 2026-07-28 — ver `docs/specs/CONTENT_ERRORS.md`.
Antes de guardar CADA bundle de BR:

- **Eje por pregunta:** `**EJE:**` (ICFES está PROHIBIDO fuera de Colombia).
- **alignment:** "BNCC Brasil / ENEM" — nunca ICFES/Saber/DBA MEN.
- **Carpeta canónica:** `questions_data/brasil/{subject}/grado-{N}/2026/weekly/` (la carpeta es el nombre completo del país, no el código).
- **Frontmatter:** los 15 campos exactos de `AGENTS.md`; `week: "WNN"` (nunca `semana:`); `country: "brasil"`; `id` = filename sin `.md`.
- **Formato:** `## Question N [D#]` (nunca `## Pregunta`), `### Enunciado`/`### Opciones`/`### Explicacion Pedagogica`, `**Contexto:**` (nunca `**Context:**`).
- **Sin placeholders:** prohibidos los literales "Distractor N", "Opcion correcta", "Opcion B/C/D", "tema-semana-NN".
- **Opciones:** exactamente 4 (A-D), una sola `[x]`, textos únicos, feedback no vacío en todas.
- **Validación obligatoria:** `npm run validate -- {archivos}` en 0 fallos antes de comentar `[OK]` en el issue; después regenerar packs con `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` y verificar `npm run audit:country-readiness`.
