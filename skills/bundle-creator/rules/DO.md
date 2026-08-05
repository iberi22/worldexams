# DO - Dominican Republic Bundle Creation Rules

## Official Exam Framework
- **Exam:** Pruebas Nacionales (Evaluaciones Diagnósticas / Pruebas de Finalización)
- **Agency:** MINERD (Ministerio de Educación de la República Dominicana)
- **Subjects:** Lengua Española, Matemáticas, Ciencias Sociales, Ciencias de la Naturaleza
- **Grade:** 6° de Secundaria / Último año de Educación Secundaria (12th grade equivalent)
- **Reference:** https://www.minerd.gob.do/

## Bundle Directory Structure
```
questions_data/do/
  └── grado-11/
      └── periodo-1/
          └── [subject]/
              └── DO-SUBJ-11-P1-TOPIC-NNN-MASTERY-bundle.md
```

## Language & Cultural Rules
- Use Dominican Spanish
- Use DOP RD$ (Peso dominicano) for currency references
- Reference Dominican cities: Santo Domingo, Santiago, La Romana, San Pedro de Macorís
- Use common Dominican names: Juan, María, Pedro, Ana, Luis, Carmen
- Never reference ICFES or Colombian exam names

## Canonical directory (REQUIRED — v5.2)
```
questions_data/[country-folder]/{asignatura}/grado-{N}/2026/weekly/
  DO-{SUBJ}-{GRADE}-2026-W{NN}-{tema}-001-MASTERY-bundle.md
```
Do **not** use `periodo-1` for new bundles. See `_TEMPLATE.md` and `AGENTS.md`.

## Anti-Error Checklist (v5.2, 2026-07-28)

Basado en la purga de contenido 2026-07-28 — ver `docs/specs/CONTENT_ERRORS.md`.
Antes de guardar CADA bundle de DO:

- **Eje por pregunta:** `**EJE:**` (ICFES está PROHIBIDO fuera de Colombia).
- **alignment:** "MINERD - Pruebas Nacionales RD" — nunca ICFES/Saber/DBA MEN.
- **Carpeta canónica:** `questions_data/dominican_republic/{subject}/grado-{N}/2026/weekly/` (la carpeta es el nombre completo del país, no el código).
- **Frontmatter:** los 15 campos exactos de `AGENTS.md`; `week: "WNN"` (nunca `semana:`); `country: "dominican_republic"`; `id` = filename sin `.md`.
- **Formato:** `## Question N [D#-D#] (rango, ej. [D3-D4])` (nunca `## Pregunta`), `### Enunciado`/`### Opciones`/`### Explicacion Pedagogica`, `**Contexto:**` (nunca `**Context:**`).
- **Dificultad en RANGO:** cada encabezado `## Question N` DEBE llevar el rango exacto `[D3-D4]`, `[D5-D6]`, `[D7-D8]` o `[D9-D10]` (nunca `[D3]` individual — el validador falla con `[D#]` suelto).
- **Frontmatter `bundle_index`:** incluir SIEMPRE `bundle_index: 1` (obligatorio v5.2, el validador emite ERROR si falta).
- **Bloque `calibration`:** incluir SIEMPRE `calibration:` en el frontmatter (el validador emite warning si falta).
- **Sin placeholders:** prohibidos los literales "Distractor N", "Opcion correcta", "Opcion B/C/D", "tema-semana-NN".
- **Opciones:** exactamente 4 (A-D), una sola `[x]`, textos únicos, feedback no vacío en todas.
- **Validación obligatoria:** `npm run validate -- {archivos}` en 0 fallos antes de comentar `[OK]` en el issue; después regenerar packs con `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` y verificar `npm run audit:country-readiness`.
