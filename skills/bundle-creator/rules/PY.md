# PY - Paraguay Bundle Creation Rules

## Official Exam Framework
- **Exam:** SNEPE (Sistema Nacional de Evaluación del Proceso Educativo) — Pruebas Nacionales de Bachillerato
- **Agency:** MEC (Ministerio de Educación y Ciencias del Paraguay)
- **Subjects:** Comunicación (Lengua Castellana y Literatura, Lengua Guaraní), Matemática, Ciencias Sociales (Historia, Geografía, Ciudadanía), Ciencias Naturales (Biología, Física, Química)
- **Grade:** 3° de la Educación Media / Último año de Bachillerato (12th grade)
- **Reference:** https://www.mec.gov.py/

## Bundle Directory Structure
```
questions_data/py/
  └── grado-11/
      └── periodo-1/
          └── [subject]/
              └── PY-SUBJ-11-P1-TOPIC-NNN-MASTERY-bundle.md
```

## Language & Cultural Rules
- Use standard Paraguayan Spanish (Guaraní-influenced)
- Use PYG ₲ (Guaraní) for currency references
- Reference Paraguayan cities: Asunción, Ciudad del Este, Encarnación, San Lorenzo
- Note: Paraguay has both Spanish and Guaraní as official languages
- Never reference ICFES or Colombian exam names

## Canonical directory (REQUIRED — v5.2)
```
questions_data/[country-folder]/{asignatura}/grado-{N}/2026/weekly/
  PY-{SUBJ}-{GRADE}-2026-W{NN}-{tema}-001-MASTERY-bundle.md
```
Do **not** use `periodo-1` for new bundles. See `_TEMPLATE.md` and `AGENTS.md`.

## Anti-Error Checklist (v5.2, 2026-07-28)

Basado en la purga de contenido 2026-07-28 — ver `docs/specs/CONTENT_ERRORS.md`.
Antes de guardar CADA bundle de PY:

- **Eje por pregunta:** `**EJE:**` (ICFES está PROHIBIDO fuera de Colombia).
- **alignment:** "MEC Paraguay" — nunca ICFES/Saber/DBA MEN.
- **Carpeta canónica:** `questions_data/paraguay/{subject}/grado-{N}/2026/weekly/` (la carpeta es el nombre completo del país, no el código).
- **Frontmatter:** los 15 campos exactos de `AGENTS.md`; `week: "WNN"` (nunca `semana:`); `country: "paraguay"`; `id` = filename sin `.md`.
- **Formato:** `## Question N [D#]` (nunca `## Pregunta`), `### Enunciado`/`### Opciones`/`### Explicacion Pedagogica`, `**Contexto:**` (nunca `**Context:**`).
- **Sin placeholders:** prohibidos los literales "Distractor N", "Opcion correcta", "Opcion B/C/D", "tema-semana-NN".
- **Opciones:** exactamente 4 (A-D), una sola `[x]`, textos únicos, feedback no vacío en todas.
- **Validación obligatoria:** `npm run validate -- {archivos}` en 0 fallos antes de comentar `[OK]` en el issue; después regenerar packs con `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` y verificar `npm run audit:country-readiness`.
