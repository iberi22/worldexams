# UY - Uruguay Bundle Creation Rules

## Official Exam Framework
- **Exam:** No centralized national exit exam — Bachillerato Diversificado with subject-specific final exams per school (ANEP)
- **Agency:** ANEP (Administración Nacional de Educación Pública) — CES (Consejo de Educación Secundaria)
- **Subjects (Bachillerato Diversificado orientations):**
  - Humanístico: Literatura, Historia, Filosofía, Sociología
  - Biológico: Biología, Química, Física, Matemática
  - Científico: Matemática, Física, Química, Dibujo
  - Artístico: Expression Plástica, Música, Teatro
  - Core for all: Idioma Español, Inglés
- **Grade:** 6° año de Educación Media Superior (12th grade — 3° año Bachillerato Diversificado)
- **Reference:** https://www.anep.edu.uy/ | https://www.ces.edu.uy/

## Bundle Directory Structure
```
questions_data/uy/
  └── grado-11/
      └── periodo-1/
          └── [subject]/
              └── UY-SUBJ-11-P1-TOPIC-NNN-MASTERY-bundle.md
```

## Language & Cultural Rules
- Use Uruguayan Spanish (use voseo)
- Use UYU $U (Peso uruguayo) for currency references
- Reference Uruguayan cities: Montevideo, Salto, Punta del Este, Colonia del Sacramento
- Never reference ICFES or Colombian exam names

## Canonical directory (REQUIRED — v5.2)
```
questions_data/[country-folder]/{asignatura}/grado-{N}/2026/weekly/
  UY-{SUBJ}-{GRADE}-2026-W{NN}-{tema}-001-MASTERY-bundle.md
```
Do **not** use `periodo-1` for new bundles. See `_TEMPLATE.md` and `AGENTS.md`.

## Anti-Error Checklist (v5.2, 2026-07-28)

Basado en la purga de contenido 2026-07-28 — ver `docs/specs/CONTENT_ERRORS.md`.
Antes de guardar CADA bundle de UY:

- **Eje por pregunta:** `**EJE:**` (ICFES está PROHIBIDO fuera de Colombia).
- **alignment:** "ANEP Uruguay" — nunca ICFES/Saber/DBA MEN.
- **Carpeta canónica:** `questions_data/uruguay/{subject}/grado-{N}/2026/weekly/` (la carpeta es el nombre completo del país, no el código).
- **Frontmatter:** los 15 campos exactos de `AGENTS.md`; `week: "WNN"` (nunca `semana:`); `country: "uruguay"`; `id` = filename sin `.md`.
- **Formato:** `## Question N [D#]` (nunca `## Pregunta`), `### Enunciado`/`### Opciones`/`### Explicacion Pedagogica`, `**Contexto:**` (nunca `**Context:**`).
- **Sin placeholders:** prohibidos los literales "Distractor N", "Opcion correcta", "Opcion B/C/D", "tema-semana-NN".
- **Opciones:** exactamente 4 (A-D), una sola `[x]`, textos únicos, feedback no vacío en todas.
- **Validación obligatoria:** `npm run validate -- {archivos}` en 0 fallos antes de comentar `[OK]` en el issue; después regenerar packs con `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` y verificar `npm run audit:country-readiness`.
