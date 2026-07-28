# GQ - Equatorial Guinea Bundle Creation Rules

## Official Exam Framework
- **Exam:** Pruebas Nacionales de Bachillerato (Examen de Acceso a la Universidad)
- **Agency:** Ministerio de Educación, Ciencia y Deportes (MEC)
- **Subjects:** Lengua Española y Literatura, Matemáticas, Geografía e Historia, Ciencias Naturales (Biología, Física, Química), Lengua Extranjera (Francés / Inglés)
- **Grade:** Último año de Educación Secundaria (2° Bachillerato español, 12th grade)
- **Reference:** Ministerio de Educación, Ciencia y Deportes de Guinea Ecuatorial

## Curriculum Notes
- System closely follows Spanish educational model
- Students can also access UNED
- UNGE (Universidad Nacional de Guinea Ecuatorial) since 1995
- Note: Subjects and content align closely with ES (Spain) bundles

## Bundle Directory Structure
```
questions_data/gq/
  └── grado-11/
      └── periodo-1/
          └── [subject]/
              └── GQ-SUBJ-11-P1-TOPIC-NNN-MASTERY-bundle.md
```

## Language & Cultural Rules
- Use standard Spanish
- Reference Equatorial Guinean cities: Malabo, Bata, Mongomo, Ebebiyín
- Reference local cultural contexts (tropical geography, local economy, etc.)
- Never reference ICFES or Colombian exam names

## Canonical directory (REQUIRED — v5.2)
```
questions_data/[country-folder]/{asignatura}/grado-{N}/2026/weekly/
  GQ-{SUBJ}-{GRADE}-2026-W{NN}-{tema}-001-MASTERY-bundle.md
```
Do **not** use `periodo-1` for new bundles. See `_TEMPLATE.md` and `AGENTS.md`.

## Anti-Error Checklist (v5.2, 2026-07-28)

Basado en la purga de contenido 2026-07-28 — ver `docs/specs/CONTENT_ERRORS.md`.
Antes de guardar CADA bundle de GQ:

- **Eje por pregunta:** `**EJE:**` (ICFES está PROHIBIDO fuera de Colombia).
- **alignment:** "Ministerio de Educacion Guinea Ecuatorial" — nunca ICFES/Saber/DBA MEN.
- **Carpeta canónica:** `questions_data/guinea-ecuatorial/{subject}/grado-{N}/2026/weekly/` (la carpeta es el nombre completo del país, no el código).
- **Frontmatter:** los 15 campos exactos de `AGENTS.md`; `week: "WNN"` (nunca `semana:`); `country: "guinea-ecuatorial"`; `id` = filename sin `.md`.
- **Formato:** `## Question N [D#]` (nunca `## Pregunta`), `### Enunciado`/`### Opciones`/`### Explicacion Pedagogica`, `**Contexto:**` (nunca `**Context:**`).
- **Sin placeholders:** prohibidos los literales "Distractor N", "Opcion correcta", "Opcion B/C/D", "tema-semana-NN".
- **Opciones:** exactamente 4 (A-D), una sola `[x]`, textos únicos, feedback no vacío en todas.
- **Validación obligatoria:** `npm run validate -- {archivos}` en 0 fallos antes de comentar `[OK]` en el issue; después regenerar packs con `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` y verificar `npm run audit:country-readiness`.
