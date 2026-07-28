# CR - Costa Rica Bundle Creation Rules

## Official Exam Framework
- **Exam:** Pruebas Nacionales de Bachillerato (Pruebas FARO — previously Pruebas de Bachillerato)
- **Agency:** MEP (Ministerio de Educación Pública de Costa Rica)
- **Subjects:** Español, Matemáticas, Ciencias (Biología, Física, Química), Estudios Sociales (Historia, Geografía, Cívica), Inglés (comprensión lectora), Educación Cívica
- **Grade:** 11° (Último año de Educación Diversificada / Bachillerato — 5 years: 7°–11°)
- **Reference:** https://www.mep.go.cr/

## Bundle Directory Structure
```
questions_data/cr/
  └── grado-11/
      └── periodo-1/
          └── [subject]/
              └── CR-SUBJ-11-P1-TOPIC-NNN-MASTERY-bundle.md
```

## Language & Cultural Rules
- Use standard Costa Rican Spanish (use "usted" more frequently than "vos")
- Use CRC ₡ (Colón) for currency references
- Reference Costa Rican cities: San José, Alajuela, Cartago, Heredia, Liberia
- Use common Costa Rican names: Carlos, María, José, Ana, Javier, Sofía
- Never reference ICFES or Colombian exam names

## Canonical directory (REQUIRED — v5.2)
```
questions_data/[country-folder]/{asignatura}/grado-{N}/2026/weekly/
  CR-{SUBJ}-{GRADE}-2026-W{NN}-{tema}-001-MASTERY-bundle.md
```
Do **not** use `periodo-1` for new bundles. See `_TEMPLATE.md` and `AGENTS.md`.

## Anti-Error Checklist (v5.2, 2026-07-28)

Basado en la purga de contenido 2026-07-28 — ver `docs/specs/CONTENT_ERRORS.md`.
Antes de guardar CADA bundle de CR:

- **Eje por pregunta:** `**EJE:**` (ICFES está PROHIBIDO fuera de Colombia).
- **alignment:** "MEP Costa Rica / Bachillerato" — nunca ICFES/Saber/DBA MEN.
- **Carpeta canónica:** `questions_data/costarica/{subject}/grado-{N}/2026/weekly/` (la carpeta es el nombre completo del país, no el código).
- **Frontmatter:** los 15 campos exactos de `AGENTS.md`; `week: "WNN"` (nunca `semana:`); `country: "costa-rica"`; `id` = filename sin `.md`.
- **Formato:** `## Question N [D#]` (nunca `## Pregunta`), `### Enunciado`/`### Opciones`/`### Explicacion Pedagogica`, `**Contexto:**` (nunca `**Context:**`).
- **Sin placeholders:** prohibidos los literales "Distractor N", "Opcion correcta", "Opcion B/C/D", "tema-semana-NN".
- **Opciones:** exactamente 4 (A-D), una sola `[x]`, textos únicos, feedback no vacío en todas.
- **Validación obligatoria:** `npm run validate -- {archivos}` en 0 fallos antes de comentar `[OK]` en el issue; después regenerar packs con `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` y verificar `npm run audit:country-readiness`.
