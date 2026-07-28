# CL - Chile Bundle Creation Rules (v5.2)

## Official Exam Framework
- **Exam:** PAES (Prueba de Acceso a la Educación Superior); school quality: SIMCE (Agencia de Calidad)
- **Agency:** DEMRE (Universidad de Chile) for PAES · MINEDUC · Agencia de Calidad for SIMCE
- **Grade:** Educación Básica 1°–8° and Enseñanza Media 1°–4°; PAES focus **4° Medio** (WorldExams often `grado-11`/`grado-12` — prefer `grado-11` for weekly pack parity unless issue specifies otherwise)
- **Established:** PAES 2022 (replaced PSU/PDT); content draws from 7° básico–2° medio bases for compulsory tests
- **Reference:** https://www.demre.cl · https://www.mineduc.cl
- **Curriculum notes:** `docs/specs/curriculums/chile/README.md`
- **Bundles Directory:** `questions_data/chile/`
- **Authority:** `AGENTS.md` Bundle Protocol v5.2 · `npm run validate`

## Subjects (folder keys)
| Area | Subject key | PAES / school note |
|------|-------------|--------------------|
| Matemática | `matematicas` (prefer) / `matematica` | M1 obligatoria; M2 electiva |
| Lenguaje / Competencia Lectora | `lengua` / `lenguaje` | Prefer `lengua` for new weekly packs |
| Ciencias Naturales | `ciencias-naturales` | Biología, Física, Química (electiva) |
| Historia y Cs. Sociales | `sociales` / `sociales-ciudadanas` | Electiva PAES |
| Inglés | `ingles` | School curriculum; not PAES core |

## Curriculum Alignment (Bases + PAES stubs)

### Grado 6° (6° básico)
- **Matemática:** Números naturales/decimales, fracciones, geometría plana, datos.
- **Lenguaje:** Comprensión literal e inferencial; textos narrativos e informativos.
- **Ciencias:** Ecosistemas chilenos, materia, energía solar/térmica introductoria.

### Grado 10° (2° medio)
- **Matemática:** Álgebra, funciones lineales/cuadráticas, probabilidad introductoria (base M1).
- **Lenguaje:** Textos argumentativos, multimodales; vocabulario académico.
- **Historia:** Procesos republicanos, geografía de Chile, ciudadanía.

### Grado 11° / 4° Medio (PAES prep)
- **Competencia Lectora:** Inferencias, propósito, estructuras argumentativas, textos discontinuos.
- **Matemática M1:** Números, álgebra, geometría, datos y azar (currículo hasta 2° medio).
- **Matemática M2:** Funciones, cálculo introductorio, geometría analítica (electiva).
- **Ciencias / Historia:** Según electiva DEMRE.

## Canonical Path (Protocol v5.2)

```text
questions_data/chile/{subject}/grado-{N}/2026/weekly/
  CL-{SUBJ}-{GRADE}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
```

Example:

```text
questions_data/chile/matematicas/grado-11/2026/weekly/
  CL-MAT-11-2026-W01-algebra-lineal-basica-001-MASTERY-bundle.md
```

Obsolete: `grado-11/periodo-1/...` and `CL-*-P1-*` IDs — do not use for new weekly generation.

## Calendar Notes (W ↔ periods)
- School year: typically **March–December** (summer break Dec–Feb; winter break ~July).
- Common structure: **2 semestres** (1°: Mar–Jun/Jul; 2°: Jul/Aug–Dec).
- Stub mapping: W01–W20 ≈ 1° semestre, W21–W40 ≈ 2° semestre.
- PAES regular process is typically late-year (Nov–Dic windows vary by process year); winter/especial processes exist — verify DEMRE calendar before asserting dates in content.
- `W01-W40` is internal; not an official MINEDUC week claim.
- Sources: `docs/specs/curriculums/chile/README.md`; stubs in `config/countries.config.ts`.

## Language & Cultural Rules
- Chilean Spanish (tú; informal register ok in contexts, not slang-heavy stems).
- Currency: Peso chileno (**CLP $**).
- Cities: Santiago, Valparaíso, Concepción, Antofagasta, Viña del Mar, Temuco, La Serena.
- Names: Sebastián, Benjamín, Sofía, Martina, Vicente, Isidora, Catalina, Matías.
- Contexts: cordillera, Pacífico, Atacama, Patagonia, Fiestas Patrias (18), minería, empanadas, cueca — avoid inventing legal/regulatory facts.
- Never reference ICFES or Colombian exam brands; do not put "PAES"/"SIMCE" inside stems (metadata/`alignment` only).

## Subject Bundle Strategy
1. **Priority 1:** Competencia Lectora + Matemática M1 (G11).
2. **Priority 2:** Ciencias / Historia electivas; G6–G10 school reinforcement.
3. Bundle sizes (v5.2): G3–G5 = 8q · G6–G7 = 10q · G8–G10 = 12q · G11 = 20q.

## Anti-Error Checklist (v5.2, 2026-07-28)

Basado en la purga de contenido 2026-07-28 — ver `docs/specs/CONTENT_ERRORS.md`.
Antes de guardar CADA bundle de CL:

- **Eje por pregunta:** `**EJE:**` (ICFES está PROHIBIDO fuera de Colombia).
- **alignment:** "PAES DEMRE + MINEDUC Bases Curriculares" — nunca ICFES/Saber/DBA MEN.
- **Carpeta canónica:** `questions_data/chile/{subject}/grado-{N}/2026/weekly/` (la carpeta es el nombre completo del país, no el código).
- **Frontmatter:** los 15 campos exactos de `AGENTS.md`; `week: "WNN"` (nunca `semana:`); `country: "chile"`; `id` = filename sin `.md`.
- **Formato:** `## Question N [D#]` (nunca `## Pregunta`), `### Enunciado`/`### Opciones`/`### Explicacion Pedagogica`, `**Contexto:**` (nunca `**Context:**`).
- **Sin placeholders:** prohibidos los literales "Distractor N", "Opcion correcta", "Opcion B/C/D", "tema-semana-NN".
- **Opciones:** exactamente 4 (A-D), una sola `[x]`, textos únicos, feedback no vacío en todas.
- **Validación obligatoria:** `npm run validate -- {archivos}` en 0 fallos antes de comentar `[OK]` en el issue; después regenerar packs con `node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only` y verificar `npm run audit:country-readiness`.
