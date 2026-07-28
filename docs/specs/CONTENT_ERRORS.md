# Catálogo de errores de contenido — purga 2026-07-28

> Documento de aprendizaje post-purga. Cada clase de error incluye causa raíz, detección
> automatizada actual y regla de prevención para Jules/generadores.
> Resultado de la purga: 5306 bundles `.md` eliminados, 5601 packs huérfanos eliminados,
> corpus final **958/958 válido** (`npm run validate`).

## E1 — Marca de examen de otro país (ICFES/Saber/DBA fuera de Colombia)

- **Síntoma:** `**ICFES:**` por pregunta en bundles CL/PE/MX/BR/…; `alignment: "ICFES Saber 11 2026 + DBA MEN 2026"` en archivos de Chile/Argentina/Ecuador.
- **Causa raíz:** plantilla v5.2 nacida en Colombia; el validador exigía `**ICFES:**` para todos los países.
- **Fix aplicado:** `**ICFES:**` exclusivo de Colombia; todos los demás países usan `**EJE:**`. Validadores country-aware con guarda anti-regresión (rechazan ICFES fuera de CO y en `alignment`).
- **Prevención:** la entidad de cada país (PAES, EXANI, ENEM, CNEB, Aprender, MINERD, ANEP…) va SOLO en `alignment`. Ver tabla en `_TEMPLATE.md`.

## E2 — Placeholders / dummies

- **Síntoma:** opciones literales "Distractor 1/2/3", "Opcion correcta", "Opcion B"; temas genéricos "tema-semana-NN-de-{materia}".
- **Causa raíz:** generadores masivos con plantillas sin contenido real (156 bundles CR, cientos CO).
- **Detección:** `validate-bundles-v52.mjs` rechaza esos literales; el generador de packs los salta.
- **Prevención:** todo distractor debe ser un error conceptual plausible del currículo del país; prohibido texto de plantilla.

## E3 — Ruta no canónica

- **Síntoma:** bundles en `costarica/` (vs `costa-rica`), `uy/` `py/` `bo/` `es/` `pr/` `gq/` `do/` `gt/` (códigos en vez de nombre), `{pais}/grado-11/weekly/` (sin materia ni año), `3o-EM/` (vs `3o-ano/`), carpetas `periodo-1/…/`.
- **Causa raíz:** pipelines antiguos anteriores a la ruta canónica v5.2.
- **Fix aplicado:** migración de 1205 semanales rescatables a `questions_data/{pais}/{materia}/grado-{N}/2026/weekly/` con frontmatter normalizado; el resto eliminado.
- **Prevención:** el validador exige la ruta canónica exacta; Jules solo escribe en la ruta del issue.

## E4 — Frontmatter no canónico

- **Síntoma:** `semana: 1` en vez de `week: "W01"`, `country: "uy"` (código en vez de nombre), campos extra (`exam:`), faltantes (`periodo`, `bundle_type`, `total_questions`, `license`, `tier`, `creador`), `id` sin sufijo `-bundle`.
- **Fix aplicado:** normalización en la migración; validador exige los 15 campos exactos.
- **Prevención:** copiar el frontmatter exacto de `AGENTS.md`; `semana` está prohibido.

## E5 — Formato de pregunta legacy

- **Síntoma:** `## Pregunta N` (en vez de `## Question N [D#]`), sin `**EJE:**`/`**Expected_Success:**`, sin `### Explicacion Pedagogica`, opciones sin feedback.
- **Causa raíz:** protocolo anterior a v5.2 (UY/PY/BO: 481 bundles irrecuperables, eliminados).
- **Prevención:** formato exacto de `AGENTS.md` § Question Format; validación obligatoria antes de PR.

## E6 — Opciones duplicadas

- **Síntoma:** mismo texto en 2+ opciones de la misma pregunta (SV lengua/matematicas: 105 bundles eliminados).
- **Detección:** validador (`duplicate option text`).
- **Prevención:** revisar unicidad de distractores antes de guardar.

## E7 — Fuentes fuera de formato canónico

- **Síntoma:** bundles fuente en JSON (`elsalvador/**/SV-*.json`) en vez de markdown.
- **Fix aplicado:** conversión determinista JSON→md (200 archivos; 95 válidos tras filtrar E6, =1900 preguntas SV).
- **Prevención:** la fuente de verdad es SIEMPRE `.md` en `questions_data/`; los JSON del API son artefactos derivados.

## E8 — Carpetas junk / países no soportados

- **Eliminadas:** `australia/`, `gb/`, `india/`, `newzealand/`, `southafrica/`, `usa/`, `ingles/` (stray CO), `test_weekly_validation/`.
- **Prevención:** solo los 20 países de `AGENTS.md` § Supported Countries.

## E9 — Packs huérfanos

- **Síntoma:** packs JSON cuyos `bundle_id` ya no existen en fuentes (5601 tras la purga).
- **Fix aplicado:** script de limpieza cruzada pack↔fuente; regeneración completa.
- **Prevención:** tras borrar bundles, SIEMPRE regenerar packs (`node scripts/generate-static-packs.js --all-weekly`) y correr `npm run audit:country-readiness`.

## Estado final (2026-07-28)

- `npm run validate`: **958 archivos, 0 fallos**.
- 17/20 países `published_validated`; **CO (224%) y SV (110%) listos**; PE 76%, CL 69%, ES 60%, EC 50%.
- UY/PY/BO en `missing` → regeneración vía issues Jules.
