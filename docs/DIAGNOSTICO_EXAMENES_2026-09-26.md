# Diagnóstico de generación y entrega de exámenes — 2026-09-26

> Alcance: API (`apps/worldexams-api`), proxy y cliente de la app (`saberparatodos`), render de preguntas,
> bundles `.md` de Colombia (`questions_data/colombia`), packs JSON, validadores y CI de despliegue.
> Auditoría de solo lectura. Las pruebas en vivo contra producción se hicieron con `curl` el 2026-09-26.

## 0. Resumen ejecutivo

| # | Síntoma que ve el usuario | Causa raíz | Severidad |
|---|---|---|---|
| 1 | Consola llena de `404 /api/packs/...` y `[API] Returned 0 questions` | (a) El proxy `/api/packs/*` de la app **nunca llega** al worker API en producción. (b) `/v1/questions` responde `200` con 0 preguntas cuando la página se sale del rango, y el cliente pide de la página 1 a la 10 | 🔴 |
| 2 | "Las preguntas dejaron de llevar explicación/feedback" | **No es un problema del contenido; es del frontend.** `ResultsView.svelte` no lee `explanation` (0 referencias) y `transformQuestion` descarta `options[].feedback`, que es justo el campo que envían el API y los packs | 🔴 |
| 3 | Sociales, lectura, ciencias y otros países vacíos o con 404 | Los alias de materia y los prefijos de país del worker no coinciden con los nombres que genera el script de packs | 🔴 |
| 4 | Preguntas "Pregunta de prueba N" en grado 11 | Hay 3 bundles `W01-test` publicados. Como W01 es el fallback de todas las consultas, aparecen en todas partes | 🔴 |
| 5 | Examen fácil de "adivinar" | La respuesta correcta es la **A en el 55,5 %** de los casos (7386 de 13 312) y 469 bundles tienen todas las respuestas en A. La app no baraja las opciones | 🔴 |
| 6 | El banco completo es público | `/v1/packs/metadata.json` lista 5612 packs con respuestas y explicaciones en claro. `/v1/grades/co/11/bundle` entrega 880 preguntas de una vez | 🟠 |
| 7 | Siempre se vuelve al selector | El tipo de examen elegido no se guarda. No existe un hub por tipo de examen | 🟡 (producto) |
| 8 | La meta de 100 preguntas por periodo y materia no se cumple | 80 de 124 combinaciones la cumplen. En G3–G5 no se puede llegar por diseño (8 preguntas × 10 semanas = 80) | 🟡 |

**Nada de esto lo detectaron los controles actuales.** El smoke test de despliegue solo prueba W01, que es un asset estático y nunca pasa por el proxy. `validate_content.js` da 0 errores sobre contenido con fallas reales. No hay tests de UI que cubran feedback ni explicación.

---

## 1. API y red

### 1.1 El proxy `/api/packs/*` está roto en producción
- Evidencia: `https://saberparatodos.space/api/packs/co-week-39-grade-11-subject-matematicas.json` responde **404 con cuerpo vacío**, mientras que `https://api.saberparatodos.space/v1/packs/co-week-39-...json` responde **200**. Un pack inexistente devuelve exactamente la misma respuesta.
- Causa probable: la app y el API son dos Workers en la misma zona. Un `fetch()` a un hostname de la misma zona sin *service binding* ni `global_fetch_strictly_public` va al origen DNS y se salta la ruta del Worker API. Además, en un Worker no existe `fs`, así que el bloque "buscar en disco con alias" de `src/pages/api/packs/[...slug].ts:57-120` es código muerto en producción.
- Por qué W01 sí funciona: `prebuild` ejecuta `generate-static-packs.js` sin `--all-weekly`, que solo genera W01 dentro de `public/api/packs`. Eso se sirve como asset estático sin pasar por el proxy.
- Por qué no se detectó: `scripts/deploy-smoke.sh` solo valida `week-1...matematicas.json`.

### 1.2 Paginación que devuelve "0 preguntas" con código 200
- `apps/worldexams-api/src/index.ts`: `pageSize = 20` fijo e ignora `limit`. Una página fuera de rango devuelve `200 {success:true, questions:[]}`. `total_questions` cuenta las preguntas **de la página**; el total real solo aparece en `meta.deduplicated_questions`.
- Sin `period`, el API sirve un único pack (la semana actual, hoy la 39), es decir 20 preguntas. Por eso `page=2` ya da 0.
- El cliente (`lib/questions/pool.ts:19-36`, `api-service.ts:162-178`) recorre las páginas 1 a 10 de forma secuencial. Cada página vacía dispara el fallback estático.

### 1.3 La tormenta de requests del fallback (`saberparatodos/src/lib/pack-fetcher.ts`)
- `currentWeek` se calcula con ancla `2025-01-01` y `% 52` (`:66-68`), mientras que los bundles son 2026 W01–W40. El resultado es arbitrario.
- Número de URLs: alias × semanas × 4 variantes + legado, todo **en secuencia**. Con `period` nunca hace `break`. Peor caso: lectura_critica P2 da **625 requests por página**. Un simulacro completo puede sumar unas 2700 requests fallidas.
- Con `apiBaseUrl="/api"`, las variantes 3 y 4 son idénticas a la 1 y la 2.
- El fallback ignora `page`: devuelve siempre la misma pregunta guardada, así que el bucle de páginas nunca se corta antes.

### 1.4 Alias de materia y prefijos de país (worker)
- `sociales_ciudadanas` se normaliza a `sociales_y_ciudadanas`, pero los packs semanales reales se llaman `sociales_ciudadanas`. Consecuencia: **CO G11 sociales sirve siempre 20 preguntas** (las de prueba) en todos los periodos.
- `english` se normaliza a `ingles`, por lo que los packs llamados `english` y `ciencias` nunca coinciden.
- Prefijos: `cr` busca `costa-rica` (existen 208 packs `cr-`) y `sv` busca `el-salvador` (existen 240 `sv-`). Lo mismo pasa con ES, PA, GT, DO, NI, GQ, UY, PY y BO. En esos 10 países, `period=1` da 404 en matemáticas, inglés y ciencias.

### 1.5 CORS
- `ALLOWED_ORIGINS` no incluye `https://worldexam.swal.network`, que es el `PUBLIC_SITE_URL` canónico. En ese dominio, el 307 de `/api/questions` termina bloqueado por CORS.

### 1.6 Exposición total del banco
- `/v1/packs/metadata.json` lista 5612 packs públicos con `is_correct`, `feedback` y `explanation`.
- `/v1/grades/co/11/bundle` entrega 880 preguntas con respuestas (1,6 MB).
- La "rotación semanal anti-scraping" no protege nada.

### 1.7 Estado de la cobertura servida (CO)
| Grado 11 | Sin periodo | P1–P4 (preguntas únicas) |
|---|---|---|
| matemáticas | 20 | 220 / 240 / 240 / 220 |
| lectura crítica | 40 | 180–240 (incluye 20 de prueba) |
| sociales | 20 | **20** (bug de alias) |
| ciencias naturales | 20 | 220–240 |
| inglés | 12 | 110–126 (≈50 % duplicadas) |

Otros grados: G3 solo tiene inglés (8 preguntas repetidas en 40 semanas). G5–G10 sociales da 404. G9–G10 lectura da 404 y ciencias tiene un solo pack.

### 1.8 Packs y despliegue
- 4608 archivos (141,7 MB). **1387 son duplicados byte a byte** (41,8 MB): `ing/english/ingles`, `lengua/lenguaje/espanol`, `cr-/costa-rica-`, `matematica/matematicas`.
- `generate-static-packs.js`:
  - `--changed-only` usa `git diff origin/main...HEAD`, que queda vacío en `main` después del merge.
  - Si dos bundles comparten semana, sobrescribe el pack solo con el que cambió.
  - `metadata.json` nunca se poda.
  - `generated_at` conserva la fecha anterior.
  - El filtro de relleno no detecta los bundles `-test-`.
- 7 bundles `.md` no coinciden con su pack publicado (80 explicaciones y 61 respuestas correctas distintas; por ejemplo `CO-MAT-11-W37/W39/W40` y `CO-SOC-11-W16`).
- `sync-questions-to-api.yml` y `update-api.yml` están muertos: usan `.ps1` y rutas viejas.

---

## 2. Frontend: selección, almacenamiento y render

### 2.1 Por qué "desapareció" la explicación
- El API y los packs traen `explanation`, `context` y `options[].feedback` en el 100 % de las preguntas CO G11 que se muestrearon.
- `question-transformer.ts:309-313` solo extrae el feedback de un `<!-- feedback: -->` dentro de `opt.text` y **ignora `opt.feedback`**. Resultado: `hasOptionFeedback = false` y no se muestra el feedback de ninguna opción, ni correcta ni incorrecta.
- `ResultsView.svelte` **no lee `q.explanation`** (0 apariciones). Solo `ArticleView.svelte` la muestra.
- `offline-grade-storage.ts:111-115` pierde el feedback y el `periodo` al guardar para uso offline.
- El único test de feedback (`api-service.test.ts:339-350`) usa el formato con comentario embebido, por eso nunca falló.

### 2.2 Descarga y almacenamiento: se baja mucho más de lo que se usa
- Examen de una materia por periodo: descarga unas **200 preguntas para usar 10** (`pool.ts`, `maxQuestions` 200).
- `savePack` usa la clave `api-week-39-{grade}-{subject}` porque el API no envía `meta.pack_id`. Todas las páginas y periodos colisionan en esa clave y solo queda la página 1. El tooltip "acumularás todas las preguntas" es falso.
- IndexedDB `known_questions` guarda bulks completos sin límite.

### 2.3 El tipo de examen no se guarda
- `selectedGrade`, `selectedSubject`, el modo y el periodo viven solo en memoria. `App.svelte:119` arranca siempre en `LANDING`.
- El progreso (`saberparatodos_exam_progress`) no guarda las preguntas. Como el pool se re-sortea, las respuestas guardadas no coinciden y el examen no se reanuda.
- Inglés existe en dos formas: como materia dentro del flujo ICFES G11 y como tarjeta aparte "Inglés Diagnóstico" (`grade=0`, que descarga 9 grados en paralelo).
- Bug: `frances` se normaliza a `ingles` (`question-transformer.ts:74,232`).

### 2.4 Otros bugs de lógica
- `filters.ts:94`: el campo `periodo` que traen las preguntas es en realidad la **semana** (2, 3, 4…). Por eso las preguntas W02–W04 salen del P1 y se asignan mal a P2–P4.
- `MathRenderer`: `x$^2$` no renderiza. El bold/itálica se aplica sobre HTML de KaTeX (frágil). No hay soporte de listas ni tablas.
- Unos 40 specs en `tests/*.spec.ts` quedan fuera de `testDir: './tests/e2e'` y **no corren**.

---

## 3. Contenido `.md` (Colombia, 1133 bundles y 13 312 preguntas)

### 3.1 Explicaciones y feedback
- **Hoy ninguna pregunta carece de explicación.** La regresión que se ve en la app es del frontend (ver 2.1). En el histórico sí hubo contenido sin feedback ni explicación, y la purga #876 (2026-07-28) lo eliminó.
- Lo que sí es un problema de calidad actual:
  - **4819 opciones con feedback trivial** ("Incorrect.", "No.", "Correct!"). Casi todas son de inglés: G4 al 100 %, G10 ≈55 % y G6, G8, G9 entre 25 y 39 %.
  - **722 explicaciones plantilla** ("This question evaluates…"), repetidas hasta 240 veces.
  - Nota interna filtrada: `CO-ING-7-2026-W26-comparatives` → `### Explicacion Pedagogica (Manual fix for option letter out of order)`.

### 3.2 Sesgo de posición de la respuesta (el hallazgo más grave de calidad)
| Letra | A | B | C | D |
|---|---|---|---|---|
| Correcta | 7386 (55,5 %) | 3358 (25,2 %) | 1821 (13,7 %) | 747 (5,6 %) |

- 469 bundles (41 %) tienen todas las respuestas en A: Mat G11, Inglés G3 e Inglés G11 al 100 %, Mat G6 al 98 %. Los lotes de jul-2026 (100 %) y ago-2026 (92 %) son los peores.
- La correcta es además la opción más larga en el 55 % de los casos.

### 3.3 LaTeX corrompido
- `\frac`, `\times`, `\text` y `\rightarrow` quedaron convertidos en caracteres de control (`\f`, `\t`, `\r`) por un escape JSON/JS mal hecho durante la generación. Afecta a 26 archivos y 485 líneas (por ejemplo `CO-MAT-7-2026-W01-regla-tres`, `CO-CN-11-2026-W04-quimica-carbono`). Entraron entre el 08-29 y el 09-05 (#1139, #1267).

### 3.4 Otros
- 3 bundles `W01-test` en G11 (LEC, SOC, CIE) que están en producción.
- 13 semanas duplicadas (dos bundles para el mismo W).
- 2 casos de "todas/ninguna de las anteriores" que el validador no detectó.
- Basura versionada en carpetas de contenido: `__pycache__`, `_genlib_base64.txt`, `_gen_bundles/w08.json`, `CHECK.txt`.
- Nombres inconsistentes:
  - Las carpetas usan guion (`lectura-critica`) y los packs guion bajo (`lectura_critica`).
  - Los prefijos mezclan `CO-CIE`/`CO-CN` y `CO-LEC`/`CO-LC`.
  - Inglés se publica tres veces (`ingles`, `ing`, `english`).

### 3.5 Validadores
| | `scripts/validate-bundles-v52.mjs` (raíz) | `saberparatodos/scripts/validate_content.js` |
|---|---|---|
| CO | 12 archivos fallan (`**Context:**`, opciones de menos, `creador`) | **0 errores / 0 warnings**, incluso con `--strict-v3` |
| Explicación vacía, feedback trivial, sesgo de letra, caracteres de control, plantillas | no | no |

### 3.6 Meta de 100 preguntas por periodo y materia (CO)
- 80 de 124 combinaciones la cumplen.
- G3–G5 **no pueden** llegar a 100 con el protocolo actual (máximo 80). Hay que decidir entre 2 bundles por semana o bajar la meta a 80 para primaria.
- Huecos grandes:
  - Mat, CN, Lengua y Sociales G3–G4 no existen.
  - CN G9–G10 casi vacío.
  - Lengua G8 P3–P4 = 0.
  - Lengua G6 P2–P3 = 10.
  - Lengua y LC G9–G10 = 0.
  - Sociales G6–G10 = 0.

---

## 4. ¿La próxima generación de bundles debe ser JSON?

**Recomendación: sí.** Usar **JSON validado con JSON Schema como fuente de verdad** y generar automáticamente un `.md` legible para revisar en los PR.

| A favor (con evidencia de esta auditoría) | En contra / mitigación |
|---|---|
| Hoy hay dos validadores regex que no coinciden (12 fallos frente a 0). Con un schema (ajv) se exige directamente: 4 opciones, 1 correcta, `feedback.minLength ≥ 25`, `explanation.minLength ≥ 80` y un enum cerrado de materias (se acaban `ing`/`english`/`ingles`) | Los diffs de JSON con `\\frac` se leen peor en los PR. Se mitiga con un `.md` renderizado automáticamente en el PR, o con YAML de bloque `|` |
| Con `correct_index` explícito se puede controlar la distribución de letras y barajar las opciones al publicar | La corrupción de LaTeX es justamente un fallo de escape JSON. Hay que generar con *structured output* o tool-use, parsear con `JSON.parse` real, rechazar U+0008, U+000C y U+000D dentro de strings y hacer una prueba de ida y vuelta con KaTeX |
| Desaparecen el paso `.md` → pack y sus regex frágiles (comentarios HTML, dos layouts de feedback, cortes en `##`) | Hay que migrar parser, validador, skills de Jules, `AGENTS.md` y la auditoría de country-readiness. Se puede hacer por fases: los 1133 `.md` actuales se convierten una vez con el parser que ya funciona (0 pérdidas medidas) |

---

## 5. Plan de mejora

### Fase 0 — Hotfix de producción (1–2 días)
1. **Feedback y explicación visibles:** `transformQuestion` debe usar `opt.feedback ?? parsed.feedback`, y `ResultsView` debe renderizar `q.explanation` por pregunta. Agregar un test unitario con el payload real del API.
2. **Retirar los bundles `W01-test`** (3 `.md` y los 9 packs `co-week-1-grade-11-*` de prueba). Regenerar y desplegar.
3. **Arreglar el proxy de packs:** usar un *service binding* `API` en `saberparatodos/wrangler.toml` y hacer `env.API.fetch()` en `[...slug].ts`, o eliminar el proxy y que el cliente apunte directo a `api.saberparatodos.space/v1/packs` (ya tiene CORS). Borrar el bloque `fs`.
4. **Cortar la tormenta de requests:**
   - El cliente deja de paginar cuando `page > meta.total_pages`.
   - El fallback estático se limita a 1 URL por semana (sin duplicar `/api` y staticOrigin), en paralelo y con `break`.
   - Nunca se ejecuta el fallback si el API respondió 200.
5. Agregar `https://worldexam.swal.network` a `ALLOWED_ORIGINS`.
6. Corregir el alias `sociales_ciudadanas` y los prefijos ISO de país en el worker.

### Fase 1 — Contrato del API y exposición controlada (1 semana)
1. **Nuevo contrato de `/v1/questions`:** `country, grade, subject, period, limit (máx 20), seed`. Responde un **muestreo de N preguntas del periodo** en lugar de páginas enumerables. Incluye `meta.total_available`, `meta.pack_ids`, `meta.period`.
   - El total por periodo (100) queda disponible, pero **nunca se entrega entero en una sola respuesta ni se puede enumerar**.
2. **Respuestas diferidas:** el endpoint de examen envía las preguntas **sin** `is_correct/feedback/explanation`. La corrección se hace con `POST /v1/attempts/grade` (o `GET /v1/questions/{id}/review` después de responder) y devuelve feedback y explicación **solo de las preguntas que el usuario respondió**.
   - Para el modo offline, un pack cifrado por dispositivo o un modo explícito de "práctica offline" con respuestas.
3. Retirar `metadata.json` público y `/v1/grades/*/bundle` (o protegerlos con token). Rate-limit por IP en `/v1/questions`.
4. **El cliente guarda solo lo que el usuario seleccionó:**
   - `savePack` se reemplaza por un store `attempts` con las preguntas del examen activo y las respondidas.
   - Límite de tamaño y purga de `known_questions`.
   - Dejar de descargar 200 preguntas para usar 10.
5. Normalizar un **enum canónico de materias** (`matematicas`, `lectura_critica`, `sociales_ciudadanas`, `ciencias_naturales`, `ingles`) y de países (ISO-2). Los alias se resuelven solo en el borde (API) y los packs se publican **una sola vez** (se eliminan los 1387 duplicados, unos 42 MB).

### Fase 2 — UX: hub de examen persistente (1 semana)
1. Guardar la selección en `localStorage` como `worldexams_active_exam = {country, examType:'icfes', grade, subject?, period?}`.
2. Al entrar, si existe una selección, se abre directamente **el hub del examen (ICFES)**:
   - Tarjetas por área (Matemáticas, Lectura Crítica, Sociales, Ciencias, **Inglés**).
   - Periodo o simulacro, progreso y reanudar el intento en curso.
   - Botones "← Atrás / Cambiar tipo de examen" para volver al selector.
3. El módulo de Inglés queda **dentro** del hub ICFES (sección CEFR y diagnóstico) en lugar de ser una tarjeta suelta `grade=0`.
4. Reanudar el examen: persistir `attempt = {questionIds, answers, startedAt}` para que la recarga no pierda las respuestas.
5. Rutas propuestas: `/examen/icfes` (hub) y `/examen/icfes/[area]` (sesión). El selector de tipo de examen vive en `/`.

### Fase 3 — Calidad de contenido (2–3 semanas, en paralelo)
1. **Barajar las opciones** en el conversor a pack (determinista por `id`) y en el cliente. Rebalancear la letra correcta en los `.md` existentes con un script.
2. Reparar el LaTeX corrompido (26 archivos): reemplazar los caracteres de control por `\f`, `\t`, `\r` y revalidar con KaTeX.
3. Regenerar el feedback trivial de inglés (4819 opciones) y las 722 explicaciones plantilla.
4. Cerrar los huecos hacia 100 por periodo y materia en CO, priorizando G11 sociales (ya existe, solo falta el alias), CN G9–G10, Lengua/LC G8–G10 y Sociales G6–G10. Decidir la meta de G3–G5 (80 o 2 bundles por semana).
5. Limpiar la basura versionada y las 13 semanas duplicadas.

### Fase 4 — Formato JSON v6 (2 semanas)
1. `schemas/question-bundle.v6.schema.json` con los campos `id, country (ISO), grade, subject (enum), week, period, alignment, questions[{id, difficulty_band, bloom, eje, context, statement, options[4]{text, feedback≥25}, correct_index, explanation≥80}]`.
2. Convertidor único `.md` → JSON para los 1133 bundles actuales, con verificación de ida y vuelta sin pérdidas.
3. Jules y los generadores producen JSON con *structured output*. El PR incluye un `.md` renderizado solo para revisión.
4. El pack publicado es el mismo JSON sin campos internos; no hay conversión por regex.

### Fase 5 — Que no vuelva a pasar (gates en CI)
| Gate | Qué bloquea |
|---|---|
| **Validador único** (retirar `validate_content.js` como gate) | Explicación vacía o de menos de 80 caracteres, feedback de menos de 25 o trivial, caracteres de control, "todas/ninguna", plantillas repetidas, bundles `test`/relleno, más del 40 % de la misma letra correcta por bundle |
| **Paridad `.md` ↔ pack** | Regenerar todos los packs en CI y fallar si hay diferencias con lo commiteado (arregla `--changed-only`) |
| **Contrato del API (tests del worker)** | Para cada combinación país × materia × periodo de un manifiesto de cobertura: 200 con `total_available ≥ meta`, sin páginas vacías con 200, alias y prefijos correctos |
| **Smoke post-deploy real** | Probar packs **W≠1** a través del proxy, `/v1/questions` para 5 materias × 4 periodos en CO, CORS con los dos dominios, y que ninguna pregunta contenga "Pregunta de prueba" |
| **E2E de render** | Hacer un examen de 3 preguntas y verificar en Resultados el feedback de cada opción y la explicación |
| **Presupuesto de red** | E2E que falla si un examen genera más de 30 requests o cualquier 404 |
| **Tests huérfanos** | Mover los ~40 specs de `tests/*.spec.ts` a `tests/e2e` o eliminarlos |
| **Cobertura** | `npm run audit:country-readiness` en CI publicando la tabla de 100 por periodo, sin bloquear |
| **Workflows muertos** | Eliminar `sync-questions-to-api.yml` y `update-api.yml` |

### Orden sugerido de PRs
1. `fix(exam): render option feedback and explanation in results` (Fase 0.1)
2. `fix(content): remove W01 test bundles from G11 packs` (0.2)
3. `fix(api): service binding for packs proxy + pagination stop + fallback budget` (0.3–0.4)
4. `fix(api): subject/country alias + CORS canonical origin` (0.5–0.6)
5. `ci: post-deploy smoke W≠1 + render E2E + network budget` (Fase 5, parcial)
6. `feat(api): sampled questions contract + deferred answers` (Fase 1)
7. `feat(ui): persistent ICFES exam hub with english module` (Fase 2)
8. `chore(content): shuffle options + fix LaTeX control chars + english feedback` (Fase 3)
9. `feat(content): bundle format v6 JSON schema + migration` (Fase 4)
