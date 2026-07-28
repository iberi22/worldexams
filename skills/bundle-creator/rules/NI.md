# NI - Nicaragua Bundle Creation Rules

## Official Exam Framework
- **Exam:** Pruebas Nacionales de Bachillerato / Evaluación de los Aprendizajes
- **Agency:** MINED (Ministerio de Educación de Nicaragua)
- **Subjects:** Lengua y Literatura, Matemáticas, Ciencias Sociales, Ciencias Naturales
- **Grade:** 5° año de Secundaria / Último año de Educación Secundaria (11th grade equivalent)
- **Reference:** https://www.mined.gob.ni/

## Bundle Directory Structure
```
questions_data/ni/
  └── grado-11/
      └── periodo-1/
          └── [subject]/
              └── NI-SUBJ-11-P1-TOPIC-NNN-MASTERY-bundle.md
```

## Language & Cultural Rules
- Use standard Nicaraguan Spanish
- Use NIO C$ (Córdoba) for currency references
- Reference Nicaraguan cities: Managua, León, Granada, Masaya
- Never reference ICFES or Colombian exam names

## Canonical directory (REQUIRED — v5.2)
```
questions_data/[country-folder]/{asignatura}/grado-{N}/2026/weekly/
  NI-{SUBJ}-{GRADE}-2026-W{NN}-{tema}-001-MASTERY-bundle.md
```
Do **not** use `periodo-1` for new bundles. See `_TEMPLATE.md` and `AGENTS.md`.

## Anti-Error Checklist (v5.2, 2026-07-28)

Basado en la purga de contenido 2026-07-28 — ver `docs/specs/CONTENT_ERRORS.md`.
Antes de guardar CADA bundle de NI:

- **Eje por pregunta:** `**EJE:**` (ICFES está PROHIBIDO fuera de Colombia).
- **alignment:** "MINED Nicaragua" — nunca ICFES/Saber/DBA MEN.
- **Carpeta canónica:** `questions_data/nicaragua/{subject}/grado-{N}/2026/weekly/` (la carpeta es el nombre completo del país, no el código).
- **Frontmatter:** los 15 campos exactos de `AGENTS.md`; `week: "WNN"` (nunca `semana:`); `country: "nicaragua"`; `id` = filename sin `.md`.
- **Formato:** `## Question N [D#]` (nunca `## Pregunta`), `### Enunciado`/`### Opciones`/`### Explicacion Pedagogica`, `**Contexto:**` (nunca `**Context:**`).
- **Sin placeholders:** prohibidos los literales "Distractor N", "Opcion correcta", "Opcion B/C/D", "tema-semana-NN".
- **Opciones:** exactamente 4 (A-D), una sola `[x]`, textos únicos, feedback no vacío en todas.
- **Validación obligatoria:** `npm run validate -- {archivos}` en 0 fallos antes de comentar `[OK]` en el issue; después regenerar packs con `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` y verificar `npm run audit:country-readiness`.
