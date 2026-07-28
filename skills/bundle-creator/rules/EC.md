# EC - Ecuador Bundle Creation Rules

## Official Exam Framework
- **Exam:** Ser Bachiller (2016–2022, transitioning to new system)
- **Agency:** Ministerio de Educación (formerly Senescyt)
- **Subjects:** Lengua y Literatura, Matemática, Ciencias Naturales (Biología, Física, Química), Estudios Sociales (Historia, Filosofía, Ciudadanía)
- **Grade:** 3° de Bachillerato (12th grade)
- **Reference:** https://educacion.gob.ec/

## Curriculum Notes
- Ser Bachiller phased out; Ecuador transitioning to new evaluation model
- Bachillerato General Unificado (BGU) curriculum remains the standard
- Some universities now use their own admission tests
- Focus on BGU-aligned content

## Bundle Directory Structure
```
questions_data/ecuador/
  └── grado-11/
      └── periodo-1/
          └── [subject]/
              └── EC-SUBJ-11-P1-TOPIC-NNN-MASTERY-bundle.md
```

## Language & Cultural Rules
- Use standard Ecuadorian Spanish
- Use USD $ for currency (Ecuador uses US Dollar)
- Reference Ecuadorian cities: Quito, Guayaquil, Cuenca, Ambato, Manta
- Use common Ecuadorian names: Ana, Luis, Patricia, Fernando, María, José
- Never reference ICFES or Colombian exam names

## Canonical directory (REQUIRED — v5.2)
```
questions_data/[country-folder]/{asignatura}/grado-{N}/2026/weekly/
  EC-{SUBJ}-{GRADE}-2026-W{NN}-{tema}-001-MASTERY-bundle.md
```
Do **not** use `periodo-1` for new bundles. See `_TEMPLATE.md` and `AGENTS.md`.

## Anti-Error Checklist (v5.2, 2026-07-28)

Basado en la purga de contenido 2026-07-28 — ver `docs/specs/CONTENT_ERRORS.md`.
Antes de guardar CADA bundle de EC:

- **Eje por pregunta:** `**EJE:**` (ICFES está PROHIBIDO fuera de Colombia).
- **alignment:** "BGU Ministerio de Educacion Ecuador / SENESCYT" — nunca ICFES/Saber/DBA MEN.
- **Carpeta canónica:** `questions_data/ecuador/{subject}/grado-{N}/2026/weekly/` (la carpeta es el nombre completo del país, no el código).
- **Frontmatter:** los 15 campos exactos de `AGENTS.md`; `week: "WNN"` (nunca `semana:`); `country: "ecuador"`; `id` = filename sin `.md`.
- **Formato:** `## Question N [D#]` (nunca `## Pregunta`), `### Enunciado`/`### Opciones`/`### Explicacion Pedagogica`, `**Contexto:**` (nunca `**Context:**`).
- **Sin placeholders:** prohibidos los literales "Distractor N", "Opcion correcta", "Opcion B/C/D", "tema-semana-NN".
- **Opciones:** exactamente 4 (A-D), una sola `[x]`, textos únicos, feedback no vacío en todas.
- **Validación obligatoria:** `npm run validate -- {archivos}` en 0 fallos antes de comentar `[OK]` en el issue; después regenerar packs con `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` y verificar `npm run audit:country-readiness`.
