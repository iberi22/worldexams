# GT - Guatemala Bundle Creation Rules

## Official Exam Framework
- **Exam:** Pruebas de Graduandos / Evaluación de Graduandos
- **Agency:** MINEDUC (Ministerio de Educación de Guatemala) — Dirección General de Evaluación e Investigación Educativa (DIGEDUCA)
- **Subjects:** Lectura, Matemáticas, Ciencias Naturales, Ciencias Sociales, Comunicación y Lenguaje
- **Grade:** 5° Bachillerato / Último año de Educación Diversificada (varies by track: 11th or 12th)
- **Reference:** https://www.mineduc.gob.gt/digeduca/

## Bundle Directory Structure
```
questions_data/gt/
  └── grado-11/
      └── periodo-1/
          └── [subject]/
              └── GT-SUBJ-11-P1-TOPIC-NNN-MASTERY-bundle.md
```

## Language & Cultural Rules
- Use standard Guatemalan Spanish
- Use GTQ Q (Quetzal) for currency references
- Reference Guatemalan cities: Ciudad de Guatemala, Quetzaltenango, Antigua, Escuintla
- Cultural references may include Maya heritage contexts
- Never reference ICFES or Colombian exam names

## Canonical directory (REQUIRED — v5.2)
```
questions_data/[country-folder]/{asignatura}/grado-{N}/2026/weekly/
  GT-{SUBJ}-{GRADE}-2026-W{NN}-{tema}-001-MASTERY-bundle.md
```
Do **not** use `periodo-1` for new bundles. See `_TEMPLATE.md` and `AGENTS.md`.

## Anti-Error Checklist (v5.2, 2026-07-28)

Basado en la purga de contenido 2026-07-28 — ver `docs/specs/CONTENT_ERRORS.md`.
Antes de guardar CADA bundle de GT:

- **Eje por pregunta:** `**EJE:**` (ICFES está PROHIBIDO fuera de Colombia).
- **alignment:** "MINEDUC Guatemala / CNB" — nunca ICFES/Saber/DBA MEN.
- **Carpeta canónica:** `questions_data/guatemala/{subject}/grado-{N}/2026/weekly/` (la carpeta es el nombre completo del país, no el código).
- **Frontmatter:** los 15 campos exactos de `AGENTS.md`; `week: "WNN"` (nunca `semana:`); `country: "guatemala"`; `id` = filename sin `.md`.
- **Formato:** `## Question N [D#]` (nunca `## Pregunta`), `### Enunciado`/`### Opciones`/`### Explicacion Pedagogica`, `**Contexto:**` (nunca `**Context:**`).
- **Sin placeholders:** prohibidos los literales "Distractor N", "Opcion correcta", "Opcion B/C/D", "tema-semana-NN".
- **Opciones:** exactamente 4 (A-D), una sola `[x]`, textos únicos, feedback no vacío en todas.
- **Validación obligatoria:** `npm run validate -- {archivos}` en 0 fallos antes de comentar `[OK]` en el issue; después regenerar packs con `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` y verificar `npm run audit:country-readiness`.
