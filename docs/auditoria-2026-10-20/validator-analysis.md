# Auditoría del validador estricto (WorldExams)

**Fuente analizada:** `/tmp/claude-1000/-home-belal-proyectosSWAL-apps-worldexams/c7c23317-94f4-4b34-ac61-e227f0b9dada/scratchpad/audit/validate.txt`
(salida de `node scripts/validate-bundles-v52.mjs --strict-quality` sobre `questions_data`, 3.027 bundles).
**Código de reglas:** `scripts/validate-bundles-v52.mjs`.
**Método:** parseo del dump + recómputo directo sobre los `.md` (solo lectura) con
`/tmp/.../audit/aggregate.py`, `scan.py` y `cluster.py`. No se modificó nada dentro del repo.

## Resumen

1. **El universo es de 3.027 bundles y 43.408 preguntas.** 704 bundles fallan (23,3%) con 1.549 líneas de error, y 605 cabeceras de archivo llevan 644 líneas de *warning*. Al recomputar la regla `repeated-answer-key` desde los `.md` el número real es **78 grupos / 646 bundles**. La unión de bundles afectados (error + clave repetida) es **1.311 de 3.027 = 43,3%**.

2. **Solo tres reglas producen error en modo `--strict-quality`:** `explanation-short` (1.076), `answer-letter-bias` (361) y `explanation-template` (112). Ninguna otra regla de forma/feedback falla: el corpus pasó limpio las reglas de estructura, `[x]` único, feedback con razón y `answer-key-inverted`/`ambiguous-correct-options`.

3. **Matiz importante sobre "704 fallos":** en modo normal (sin `--strict-quality`) esas tres reglas son *warnings* (`validate-bundles-v52.mjs:926, 981, 987`), igual que `repeated-answer-key` (`:1057`, sólo es error si la corrida tiene *positionals* y la clave no está en `scripts/repeated-answer-key-baseline.json`). Es decir: **con `npm run validate` a secas el repo sale en verde; los 704 fallos existen solo porque se invocó el modo estricto.** Son deuda de calidad real, pero hoy no bloquean CI.

4. **La concentración es colombiana y de grado 11 / grado 5.** Colombia aporta 478 de los 704 fallos (68%); `grado-11` aporta 291. Inglés y matemáticas son las materias más castigadas (184 y 186 bundles).

5. **No hay una letra dominante en el corpus**: A 25,1% · B 26,2% · C 26,0% · D 22,7%. El defecto real es *por bundle* (`bias-zero`: 286 bundles con una letra nunca usada; `bias-over-50`: 75) y la letra sistemáticamente castigada es **D** (ausente en 36 bundles de lengua, 30 de matemáticas, 27 de inglés).

6. **Hallazgo de fiabilidad del dump:** en `validate.txt` las líneas de `repeated-answer-key` **no cuadran con su cabecera**. Ejemplo: `validate.txt:2993-3002` abre el archivo `questions_data/bolivia/lengua/grado-11/2026/weekly/BO-LEN-11-2026-W10-tema-w10-001-MASTERY-bundle.md` y le cuelga 8 líneas idénticas de "8 bundles of **CL** grado 11 **lenguaje**". Eso no puede salir del código (`:1048-1059` emite una línea por bundle de su propio grupo), así que ese dump fue capturado/mezclado de forma que desalinea archivo y mensaje. Por eso el apartado «Causa raíz claves repetidas» se resolvió recomputando las claves desde los `.md` (78 grupos / 646 bundles), no leyendo la atribución del dump.

## Tabla por regla

| Regla | Severidad real (strict) | Bundles | Ocurrencias | % de 3.027 | Unidad | Qué mide exactamente (código) |
|---|---|---|---|---|---|---|
| `explanation-short` | ERROR en `--strict-quality`; *warning* por defecto | **289** | **1.076** | 9,5% | preguntas | `checkExplanation` (`:219-229`): `40 ≤ len < 80` ⇒ short. Bajo 40 solo pasa si es cálculo completo (`IS_COMPLETE_EXPLANATION`, `:213`) |
| `answer-letter-bias` | ERROR en strict; *warning* por defecto | **361** | **361** | 11,9% | bundles | `checkAnswerLetterBias` (`:451-468`): con ≥8 preguntas, una letra con `>50%` (`bias-over-50`) o una letra con **0 usos** (`bias-zero`) |
| `explanation-template` | ERROR en strict; *warning* por defecto | **112** | **112** | 3,7% | bundles | `checkExplanationTemplate` (`:330-340`): la misma explicación normalizada (lowercase + espacios colapsados) aparece **≥3 veces** en el bundle |
| `repeated-answer-key` | WARNING (corrida de corpus completo) | **646** (dump: 605 cabeceras / 644 líneas) | 78 grupos | 21,3% | grupos | `detectRepeatedAnswerKeys` (`:627-665`): ≥3 bundles del mismo `país|grado|asignatura` comparten la **secuencia completa** de letras correctas |

**Desglose de `answer-letter-bias`:** `bias-zero` 286 bundles · `bias-over-50` 75 bundles.

**Solapamientos (bundles):** `short ∩ bias` 50 · `bias ∩ template` 6 · `short ∩ template` 2 · `repeated ∩ error` 39.
112 + 289 + 361 − (50+6+2) = **704** ✔ (cuadra con el dump).

## Top 20 país/materia/grado con más fallos

| # | País | Materia | Grado | Bundles que fallan | template | short | bias |
|---|---|---|---|---|---|---|---|
| 1 | colombia | ingles | grado-11 | **40** | 40 | 0 | 0 |
| 2 | colombia | ingles | grado-7 | **36** | 0 | 28 | 18 |
| 3 | chile | ingles | grado-11 | **27** | 0 | 25 | 4 |
| 4 | colombia | sociales-ciudadanas | grado-5 | **26** | 0 | 12 | 21 |
| 5 | colombia | ingles | grado-5 | **24** | 0 | 16 | 15 |
| 6 | colombia | lectura-critica | grado-5 | **24** | 0 | 12 | 15 |
| 7 | colombia | lengua | grado-7 | **23** | 0 | 0 | 23 |
| 8 | colombia | matematicas | grado-5 | **19** | 0 | 11 | 8 |
| 9 | colombia | matematicas | grado-7 | **19** | 0 | 13 | 8 |
| 10 | colombia | ingles | grado-6 | **18** | 18 | 0 | 2 |
| 11 | colombia | matematicas | grado-9 | **18** | 0 | 15 | 5 |
| 12 | colombia | matematicas | grado-6 | **17** | 0 | 6 | 11 |
| 13 | colombia | ciencias-naturales | grado-11 | **16** | 0 | 15 | 2 |
| 14 | colombia | ciencias-naturales | grado-5 | **16** | 0 | 8 | 8 |
| 15 | colombia | lengua | grado-6 | **15** | 0 | 0 | 15 |
| 16 | el-salvador | sociales | grado-11 | **15** | 0 | 15 | 2 |
| 17 | colombia | matematicas | grado-10 | **14** | 0 | 7 | 7 |
| 18 | colombia | ciencias-naturales | grado-6 | **13** | 0 | 3 | 10 |
| 19 | brasil | matematica | grado-11 | **12** | 0 | 8 | 6 |
| 20 | colombia | ciencias-naturales | grado-8 | **12** | 0 | 3 | 10 |

Totales por país (bundles que fallan): colombia 478 · chile 48 · el-salvador 30 · brasil 20 · peru 19 · paraguay 17 · argentina 14 · costarica 13 · ecuador 11 · dominican_republic 10 · mexico 10 · bolivia 8 · panama 6 · uruguay 6 · puerto-rico 5 · spain 5 · nicaragua 2 · guatemala 1 · guinea-ecuatorial 1.

Por materia: matematicas 186 · ingles 184 · ciencias-naturales 96 · lengua 75 · lectura-critica 49 · sociales-ciudadanas 42 · matematica (AR) 20 · sociales 16 · historia 8 · lenguaje 8 · ciencias-sociales 6 · comunicacion 5 · espanol 5 · portugues 4.
Por grado: grado-11 291 · grado-5 122 · grado-7 85 · grado-6 74 · grado-3 30 · grado-9 30 · grado-10 27 · grado-8 26 · grado-4 15 · 3o-ano 4.

## Ranked CO-11

Pools del endpoint ranked (`apps/worldexams-api/src/ranked.ts:258-264`):
`matematicas`, `lectura_critica`, `sociales_ciudadanas`, `ciencias_naturales`, `ingles` → packs `matematicas`, `lectura-critica`, `sociales-ciudadanas`, `ciencias-naturales`, `ingles`, grado 11.

| Pool (CO, grado 11) | Bundles en el pool | Fallan (strict) | % | `explanation-template` | `explanation-short` (preguntas) | `answer-letter-bias` | Clave repetida |
|---|---|---|---|---|---|---|---|
| matematicas | 40 | **8** | 20,0% | 0 | 29 | 1 | 0 |
| lectura-critica | 44 | **12** | 27,3% | 0 | 81 | 2 | 0 |
| sociales-ciudadanas | 40 | **3** | 7,5% | 0 | 0 | 3 | 0 |
| ciencias-naturales | 40 | **16** | 40,0% | 0 | 41 | 2 | **10** (`ABCDABCDABCDABCDABCD`) |
| ingles | 40 | **40** | **100%** | **40** | 0 | 0 | 0 |
| **Total** | **204** | **79** | **38,7%** | 40 | 151 | 8 | 10 |

**Bundles distintos afectados en los 5 pools: 83 de 204 (40,7%)** — los 79 que fallan más 4 bundles de ciencias-naturales que solo tienen clave repetida (W25 `enzimas-catalisis`, W27 `cinatica-quimica`, W30 `repaso-p3`, W31 `fisica-moderna`).

Detalle verificable:

- **inglés 40/40 por `explanation-template`.** En `CO-ING-11-2026-W01-global-issues-001-MASTERY-bundle.md` la explicación *"This question requires inferential reading skills to understand how complex structures convey deeper meaning."* aparece **6 veces** (preguntas 5, 6, 7, 8, 9, 10) y *"Pragmatic competence at C1+ involves understanding and using idiomatic expressions…"* **3 veces** (preguntas 17, 18, 19). El patrón se repite en las 40 semanas (W01…W40), incluidos los `repaso`/`comprehensive-review`.
- **lectura-critica**, peores casos por nº de preguntas cortas: `CO-LC-11-2026-W35-cronica-periodistica-001-MASTERY-bundle.md` (16 preguntas), `CO-LC-11-2026-W36-novela-grafica-001-MASTERY-bundle.md` (16), `CO-LC-11-2026-W33-poesia-contemporanea` (10), `CO-LC-11-2026-W34-teatro-colombiano` (9), `CO-LC-11-2026-W40-simulacro-cierre-saber11` (8).
- **matematicas**, peor caso `CO-MAT-11-2026-W30-repaso-p3-001-MASTERY-bundle.md`: 14 de 20 preguntas con explicación <80 caracteres (Q1, Q2, Q3, Q5, Q7, Q9, Q10, Q11, Q12, Q14, Q15, Q16, Q18, Q19).
- **ciencias-naturales**, peor caso `CO-CN-11-2026-W14-potencia-eficiencia-001-MASTERY-bundle.md` (6) y clave mecánica en W22…W31.
- **sociales-ciudadanas**: solo sesgo de letra — `CO-SOC-11-2026-W02-colonia-y-independencia`, `W33-accion-colectiva`, `W38-derechos-deberes`. En este pool la distribución es A 20,1% · B 30,6% · C 30,8% · **D 18,5%**.

## Causa raíz claves repetidas

**1) El campo `creador` no sirve para discriminar.** `creador: "Jules-Agent"` aparece en **3.027 de 3.027** bundles. No hay ningún otro valor en el corpus, así que atribuir la clave a un generador por frontmatter es imposible.

**2) El mecanismo está en los generadores del repo: banco de plantillas con letra fija + selección determinista por índice.** Los cuatro scripts de generación semanal comparten exactamente el mismo patrón:

```python
t = templates[qnum % len(templates)]   # la plantilla decide la letra correcta
```

- `scripts/gen_cl_pe_ec_weekly.py:82` y `:108`
- `scripts/gen_es_pr_gq_weekly.py:169` y `:226`
- `scripts/gen_uy_py_bo_weekly.py:175` y `:231`
- `scripts/gen_ca_caribbean_generator.py:63, 112, 165, 223, 272`

Con ese patrón, **todas las semanas del mismo `asignatura+grado` reutilizan el mismo banco en el mismo orden**, de modo que la secuencia de letras correctas es idéntica en las 40 semanas: no es una coincidencia estadística, es una función determinista del índice de pregunta. Verificado además que en `gen_cl_pe_ec_weekly.py` las 10 plantillas de lenguaje marcan la opción **A** (mi parseo: `letras correctas: AAAAAAAAAA`), es decir el banco nativo es 100% A — cualquier secuencia variada posterior viene de una pasada mecánica encima, no de elección por pregunta.

**3) La firma de las secuencias lo confirma.** De los 78 grupos repetidos, **45 tienen clave exactamente periódica** (383 de 646 bundles):

| Secuencia | Grupos | Bundles |
|---|---|---|
| `ABCDABCDABCDABCDABCD` | 8 | 134 |
| `ABCDABCD` | 5 | 77 |
| `ABCDABCDABCD` | 11 | 70 |
| `ABCDABCDAB` | 2 | 19 |
| `BDACBDACBDAC` | 3 | 18 |
| `ACBDACBDACBD` | 4 | 18 |

**312 bundles del corpus tienen la clave `ABCDABCD…` exacta.** Un generador que elige la respuesta por contenido no produce eso; lo produce asignar la letra por posición (`i % 4`). El caso extremo es `colombia|grado-11|lengua` con `AAAAABBBBBCCCCCDDDDD` (10 bundles): una letra por bloque de dificultad.

**4) Procedencia por commit (evidencia dura, `git log --diff-filter=A`):**

| Grupo | Commit que creó los archivos | Qué pasó |
|---|---|---|
| `honduras|grado-11|ingles` (36 bundles, `ABCDABCD…`×20) | `0c37ffac63` (2026-06-09) *"feat(honduras): generate 200 MASTERY weekly bundles for Grade 11 Bachillerato"* — 5 materias × 40 semanas, script `generate_hn_bundles.py` (hoy borrado) que escribía **siempre** `- [x] A)` (línea 392 de ese archivo en el commit) | Generación en lote; la rotación posterior deja la correcta en posición `i % 4`: Q1 `ABCD`→A, Q2 `BACD`→B, Q3 `CABD`→C, Q4 `DABC`→D, Q5 `ABCD`→A |
| `colombia|grado-11|ciencias-naturales` (10, `ABCD…`×20) | `a421ee0203` (2026-08-29) *"integration: CO G11 wave — 8 content PRs (79 bundles MAT/CN/LC)"* (#1139) | Ola de contenido; W22–W31 con la correcta ciclando A,B,C,D |
| `colombia|grado-11|lengua` (18 con `ABCD…`×20 + 10 con `AAAAABBBBBCCCCCDDDDD`) | `63dbee6ed` (2026-09-27) *"CO lengua G11 W01-W10 weekly bundles v5.2 (200 preguntas)"* (#1525) | Serie de 10 semanas con dos claves mecánicas distintas |
| `chile|grado-11|lenguaje` (8, `BBAACCDDABBBAACCDDAB`) | `571569ebfe` (2026-08-25) *"fix(content-cl-pe): parcheo contentErrors v5.2"* | Los archivos nacieron antes; este commit los parcheó. Contienen marcadores `(P1)` en las opciones y `tema: tema-w03` (topic placeholder) — firma de generación por plantilla |

**5) La herramienta de reparación del propio repo documenta el mismo diagnóstico.** `scripts/rebalance_answer_letter.py` (añadido el **2026-09-30**, después de la mayoría de estos bundles) dice en su docstring: *"agents emit the correct option wherever their template put it, so a whole country can end up with 99% of its answers on A"*, y su `target_key` añade ruido a propósito *"so a 20-question bundle does not become a mechanical A,B,C,D,A,B,C,D cycle that a student could learn"*. Es decir: el repo ya sabía que el ciclo mecánico era el defecto y la herramienta se diseñó para **no** producirlo. Los 646 bundles con clave repetida son anteriores a esa herramienta (o no pasaron por ella).

**6) Distribución por país de los 646 bundles con clave repetida:** colombia 429 · honduras 36 · puerto-rico 34 · spain 33 · el-salvador 26 · peru 26 · costarica 19 · bolivia 13 · ecuador 12 · mexico 10 · chile 8. Coincide con el mapa de países de los cuatro generadores (`cl/pe/ec`, `es/pr/gq`, `uy/py/bo`, `ca/caribe`) más las olas de contenido de Colombia.

**Lo que NO puedo afirmar:** de los 33 grupos con clave repetida **no periódica** (p. ej. `ABCDDCBABDCADBACBACD` en `el-salvador|grado-11|ingles`, 17 bundles) no encontré un script que los reproduzca; la hipótesis más consistente es un lote de agente con banco de letras fijo, pero no lo verifiqué contra el generador exacto.

## ¿Importa el sesgo de letra en runtime?

**Depende del endpoint, y la respuesta corta es: en el examen normal sí importa; en ranked no.**

1. **Ranked SÍ baraja opciones.** `apps/worldexams-api/src/ranked.ts:330-341` copia las opciones, `shuffle(shuffledOptions, prng)`, reasigna letras `A,B,C,D` por posición y **recalcula la `answerKey`** con la letra resultante, que guarda en la sesión (`:326-359`). En ranked, el orden del archivo es irrelevante y la clave repetida tampoco ayuda al estudiante: la sesión sirve la misma secuencia de preguntas con letras distintas.

2. **`GET /v1/questions` NO baraja opciones.** En `apps/worldexams-api/src/index.ts` el modo `sample` (`:440-451`) baraja **preguntas** (`shuffle(pool, mulberry32(seed))`), nunca las opciones; el modo `page` (`:485-486`) hace un `slice` directo. Las opciones salen con su `letter` y su `is_correct` tal como están en el pack.
3. **Los packs preservan el orden y la letra del `.md`.** `saberparatodos/scripts/generate-static-packs.js:253-282` construye `options.push({ letter, text, is_correct, feedback })` en el orden del archivo. Verificado en `apps/worldexams-api/public/v1/packs/co-week-1-grade-7-subject-matematicas.json`: la primera opción es `{"letter":"B","text":"$7$ galones","is_correct":true,...}`.
4. **El cliente renderiza en el orden recibido.** `saberparatodos/src/components/ExamView.svelte:158`: `safeOptions = (question?.options || []).map((opt, idx) => ...)`, sin reordenar. Los `shuffle` del frontend (`src/utils/universalQuestions.ts`, `src/lib/adaptive-exam-service.ts`, `src/lib/smart-exam-service.ts`) barajan **preguntas**, no opciones. Búsqueda de `shuffleOptions|options.sort(` en `saberparatodos/src` y `worldexams-api/src`: sin resultados.

**Conclusión operativa:** el sesgo de letra **sí llega al estudiante** en el examen normal (y en cualquier PDF/impresión generada del pack), y además el pack JSON expone `is_correct`, así que el orden de las opciones no protege la clave de nadie. En ranked no importa. Y como ranked sólo cubre grado 11 de 5 materias, la mayor parte del corpus se sirve sin barajar.

**Sobre "qué letra domina":** no domina ninguna a nivel corpus — A 25,1% · B 26,2% · C 26,0% · D 22,7% (43.408 preguntas). El sesgo es local:

| Materia | A | B | C | D |
|---|---|---|---|---|
| sociales-ciudadanas | 23,7% | 28,1% | 28,1% | **20,0%** |
| lengua | 24,7% | 25,9% | 26,5% | **22,9%** |
| matematicas | 25,3% | 25,8% | 25,7% | **23,2%** |
| ciencias-naturales | 25,9% | 26,3% | 25,5% | **22,4%** |
| ingles | 25,2% | 25,4% | 25,4% | 24,0% |
| matematica (AR) | 27,3% | 29,2% | 25,6% | **17,9%** |
| comunicacion | 21,2% | 26,8% | **34,0%** | 18,0% |
| portugues | 18,8% | 28,0% | **30,5%** | 22,8% |

En los 75 bundles `bias-over-50` la letra dominante se reparte: **A 27 · D 20 · B 17 · C 11** — no hay un "todo A" sistémico. El patrón dominante es el opuesto: **D se queda sin usar** (`bias-zero` por materia: lengua-D 36 · matematicas-D 30 · ingles-D 27 · sociales-ciudadanas-D 20 · ciencias-naturales-D 19 · lectura-critica-D 16). Un estudiante que nunca marque D acierta de más.

## Plan de remediación

Tres acciones cubren el 100% de los 1.311 bundles afectados. Orden por ratio beneficio/riesgo.

### P0 — Arreglar el gate antes de reparar contenido (120 bundles, 325 preguntas, coste: 1 cambio + tests)

`checkExplanation` (`scripts/validate-bundles-v52.mjs:223-228`) exime del umbral a los cálculos **solo por debajo de 40 caracteres**; entre 40 y 79 los rechaza siempre. Medido sobre las 1.076 preguntas que reporta el validador: **325 son cálculos completos** (`=`, unidades, `$…$` o "es/son/equivale") en **120 bundles** que fallan únicamente por el suelo de 80. Es exactamente el bug que el comentario de `:206-212` dice haber corregido para <40, sin propagar a 40-79.

- Acción: aplicar `IS_COMPLETE_EXPLANATION` también en el rango 40-79.
- Verificación: `node scripts/test-feedback-gate.mjs` + `npm run validate -- <bundle con fórmula de 60 chars>`.
- Efecto: −325 preguntas y −120 bundles de la lista de fallos sin tocar contenido.

### P1 — Rebalanceo determinista de claves (999 bundles / 13.200 preguntas, coste: 1 script, 0 contenido nuevo)

`answer-letter-bias` (361) y `repeated-answer-key` (646) se solapan en 8 bundles, así que son **999 bundles / 13.200 preguntas**, y todos se arreglan permutando **solo la etiqueta A-D**, sin tocar texto, feedback ni explicación. De esos 999, **912 no tienen ningún otro defecto** (305 solo-bias + 607 solo-clave) y se pueden cerrar en una sola pasada; los 87 restantes tienen además un defecto de contenido y se rebalancean después de P0/P2.

- Herramienta existente: `scripts/rebalance_answer_letter.py` (permutación pura, idempotente, `--dry-run`) + driver `scripts/rebalance_corpus.py` (snapshot, verifica que la única diferencia textual sea la letra, re-corre el validador, reporta antes/después).
- Cambio necesario: sembrar **por archivo** (`seed = hash(ruta)`) para que dos bundles de la misma serie no converjan a la misma secuencia; el driver actual usa una semilla, que es justo lo que vuelve a crear familias de claves iguales.
- **Excluir 53 bundles**: los que citan una letra en la explicación ("la opción A…", "Option C…"). Conteo medido sobre los 999 bundles del dump: 53. Ahí la permutación rompe la pedagogía; van a mano.
- Verificación: `npm run validate --strict-quality <país>` antes/después; luego **regenerar `scripts/repeated-answer-key-baseline.json`** (con `detectRepeatedAnswerKeys` sobre el corpus ya reparado) o cualquier corrida con *positionals* volverá a marcar los bundles restantes como clave nueva.
- Efecto: −361 bias, −646 clave repetida.

### P2 — Reescritura con agente (279 bundles)

- `explanation-template`: **112 bundles**. El texto duplicado es contenido real, no un formato: no hay script que lo arregle. Peor lote: `colombia|ingles|grado-11` (40/40, la frase "This question requires inferential reading skills…" repetida en Q5-Q10 y Q17-Q19 de cada semana), más `colombia|ingles|grado-6` (18), `ecuador|matematicas|grado-11` (10), `el-salvador|matematicas|grado-11` (10), `costarica|matematicas|grado-11` (7), `peru|ciencias-naturales|grado-11` (7).
- `explanation-short` restante: 289 − 120 (los que limpia P0) = **169 bundles** (~750 explicaciones).
- Formato de la delegación: una issue por lote país+materia, isla de archivos cerrada, criterio "explicación ≥80 caracteres o cálculo completo", y `npm run validate --strict-quality <carpeta>` como AC.

### P3 — Prevención (lo que evita que vuelva)

1. Corregir el patrón `t = templates[qnum % len(templates)]` con letra fija en `gen_cl_pe_ec_weekly.py`, `gen_es_pr_gq_weekly.py`, `gen_uy_py_bo_weekly.py` y `gen_ca_caribbean_generator.py`: o barajar dentro de cada bundle, o asignar la letra con semilla por bundle.
2. Añadir `--strict-quality` al CI **solo sobre archivos cambiados** (el dump ya advierte que sobre el corpus completo son 704 fallos heredados) y `node scripts/test-feedback-gate.mjs` al pipeline.
3. Gate nuevo que falle si dos bundles consecutivos de la misma serie comparten la secuencia de letras — eso caza el defecto en el PR que lo introduce, no 40 semanas después.

### Resumen de impacto del plan

| Acción | Bundles | Preguntas | Tipo |
|---|---|---|---|
| P0 gate (fórmula 40-79) | 120 | 325 | determinista, 1 cambio |
| P1 rebalanceo de clave | 999 (912 de forma aislada) | 13.200 | determinista, script existente |
| P1 excluidos (letra citada) | 53 (dentro de P1) | — | manual |
| P2 agente | 279 | ~1.500 | reescritura LLM |
| **Total distinto** | **1.311** | — | 43,3% del corpus |
