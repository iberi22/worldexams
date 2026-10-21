# Auditoría de coherencia pedagógica — `matematicas` grado 11 (Colombia, ranked ICFES)

**Directorio auditado:** `questions_data/colombia/matematicas/grado-11/2026/weekly/`
**Fecha:** 2026-10-20 · **Modo:** solo lectura (no se modificó ningún archivo del repo)

| Métrica | Valor |
|---|---|
| Bundles en el directorio | 40 (`CO-MAT-11-2026-W01…W40`) |
| Preguntas totales del área | 800 (20 × 40) |
| Bundles leídos **completos** | 5 (W01, W10, W20, W30, W40) |
| Preguntas revisadas una por una | **100** (12,5 % del área) |
| Verificación estructural de los 40 bundles | sí (patrones de enunciado, LaTeX, metadatos, packs publicados) |

---

## Resumen (matematicas)

- **Claves correctas: 100/100 (100 %).** Resolví a mano las 100 preguntas de los cinco bundles; ninguna opción `[x]` está mal.
- **Respuesta correcta ambigua o segunda opción defendible: 0/100 (0 %).** En todos los ítems solo una opción es matemáticamente válida.
- **% con defecto bloqueante en el sentido estricto (clave incorrecta / ambigua): 0 %.**
- **% no apto para ranked sin cambios: 60 %** (60 ítems de W01, W10 y W20).
  - W01: 20 ítems **mal planteados** (el enunciado pide "una función", las opciones son números).
  - W10 y W20: 40 ítems **clones** de una sola familia (el ítem es válido, pero no aporta 20 preguntas independientes).
- **% con defecto menor (usable tras corregir forma): 40 %** (W30 y W40). El defecto dominante es LaTeX corrupto en la explicación/feedback, no la matemática.
- **Estimación de usable para ranked sin cambios: ≈ 18–20 %** (los 20 ítems de W30, de los que 2 tienen LaTeX crudo en explicación/opciones).
- **Extrapolación al área completa:** 21 de 40 bundles (W01–W21, **420 ítems = 52,5 %**) salen de una única plantilla parametrizada y no sirven para ranked; los otros 19 (W22–W40, 380 ítems) tienen 20 enunciados distintos cada uno y son candidatos, con defectos de formato.

> **El problema de este banco no son las respuestas: es la ausencia de preguntas distintas.** La matemática está bien resuelta; lo que falla es la generación por plantilla, que convierte 20 ítems en el mismo ítem con otro número.

---

## Defectos bloqueantes

> No hay ninguna clave incorrecta ni ninguna opción doblemente defendible en la muestra. Los bloqueantes son de **planteamiento** y de **duplicación de pool**: hacen que el ítem no pueda entrar a un examen oficial, aunque su respuesta sea correcta.

| Archivo | ID | Problema | Evidencia breve | Corrección sugerida |
|---|---|---|---|---|
| `CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle.md` | `CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v1` … `-v20` (20 ítems) | **Enunciado no coincide con el tipo de opción.** Pregunta por "la función" y las opciones son números ⇒ ninguna opción responde lo preguntado. | Enunciado v1: "¿Cuál es **la función** que representa el modelo lineal $f(x) = 2x + 1$ si $x = 1$?" Opciones: `A) 2`, `[x] B) 3`, `C) 4`, `D) 5`. | Reescribir: "Si $f(x)=2x+1$, ¿cuál es el valor de $f(1)$?" (o "evalúe $f$ en $x=1$"). Aplicar a los 20. |
| `…W01-funciones…md` | `…-v1` … `-v20` | **20 clones**: mismo enunciado, solo cambia $x=1,2,\dots,20$. No son 20 preguntas, es 1 pregunta repetida 20 veces. | v1 `$x=1$`→3; v2 `$x=2$`→5; … v20 `$x=20$`→41. Explicación idéntica salvo el número. | Regenerar con 20 ítems de contenido distinto (dominio, rango, composición, inversa, gráfica). |
| `…W01-funciones…md` | `…-v1` … `-v20` | **Nivel primaria.** Evaluar $2x+1$ en enteros 1–20 no es grado 11 ni ICFES Saber 11. | Todo el bundle es aritmética de una operación. | Sustituir por funciones cuadráticas/exponenciales/logarítmicas con interpretación. |
| `CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle.md` | `CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v1` … `-v20` (20 ítems) | **20 clones**: "dominio de $f(x)=\sqrt{x-k}$" con $k=3..22$. La respuesta es siempre $[k,\infty)$; el patrón es adivinable sin resolver. | v1 `\sqrt{x-3}`→`[3,\infty)`; v2 `\sqrt{x-4}`→`[4,\infty)`; … v20 `\sqrt{x-22}`→`[22,\infty)`. Las 4 opciones son siempre las mismas 4 formas. | Dejar 1–2 ítems así y completar con dominio de racionales, logaritmos, composición y dominio restringido por contexto. |
| `…W10-repaso-p1…md` | idem | **Nivel por debajo de grado 11** y rotulado `[D9-D10]` en v17–v20 sin que la tarea cambie. | v17–v20 suben la etiqueta de dificultad pero el ítem es idéntico en estructura a v1 `[D3-D4]`. | Recalibrar o reemplazar; la etiqueta D9-D10 debe implicar demanda cognitiva real. |
| `CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle.md` | `CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v1` … `-v20` (20 ítems) | **20 clones**: $B(x)=-x^2+2kx-10$ maximizado en $x=k$, con $k=1..20$. La respuesta es el coeficiente dividido entre 2, siempre. | v1 $B=-x^2+4x-10$→$x=2$; v2 $-x^2+6x-10$→$x=3$; … v20 $-x^2+42x-10$→$x=21$. | Regenerar: optimización con costo/ingreso distintos, restricciones, interpretación del vértice en contexto. |
| `…W20-repaso-p2…md` | `…-v1` … `-v20` | **Contexto incoherente con la pregunta** en al menos 6 ítems: el contexto habla de otra cosa y la pregunta de beneficio/producción. | v2 contexto: "laboratorio farmacéutico… concentración de un medicamento en el torrente sanguíneo"; pregunta: "¿en qué nivel de producción $x$ se maximiza el beneficio?" (igual v5 buses/aceleración, v8 energía solar, v10 meteorología). | Hacer que el modelo $B(x)$ sea el del contexto (concentración, velocidad, radiación) o cambiar el contexto por uno de producción. |

**Sobre el impacto real en ranked** (`apps/worldexams-api/src/ranked.ts`): `RANKED_PACKS_PER_AREA = 3` y `RANKED_MIN_POOL_PER_AREA = 24`; con packs de 20 preguntas el bucle carga **2 packs (40 ≥ 24) y corta** (línea 294). El único filtro es `seenIds` (id exacto, línea 287) y `PLACEHOLDER_RE` (línea 19-20): **no hay deduplicación de enunciados**. Con 21 de 40 semanas plantilla:

- P(la sección de matemáticas carga ≥1 pack plantilla) = **78,1 %** (1 − C(19,2)/C(40,2)).
- Condicionado a eso: P(≥2 de las 8 preguntas de matemáticas son clones del mismo enunciado) = **97,8 %**; P(≥4 clones) = **65,3 %**.
- **P(matemáticas con ≥2 clones idénticos) ≈ 76 %** por examen.

Eso es lo que rompe el modo ranked: no la clave, sino que 8 preguntas pueden ser 4–8 veces la misma pregunta con otro número.

---

## Defectos menores (agrupados por patrón)

### P1. LaTeX corrupto: se perdió el backslash del comando
Confirmado también en los **packs publicados** (`apps/worldexams-api/public/v1/packs/co-week-40-grade-11-subject-matematicas.json`), así que el estudiante lo ve.

| ID | Texto publicado |
|---|---|
| `…W40-…-v3` | `$\binom{6}{2} = \frac{6   imes 5}{2   imes 1} = 15$` (debía ser `\times`) |
| `…W40-…-v8` | `$a_{10} = a_1 + 9d Rightarrow 41 = 5 + 9d…` (debía ser `\Rightarrow`) |
| `…W40-…-v16` | `1 - left(\frac{1}{2}` + salto de línea + `ight)^4` (debía ser `\left( … \right)`) |
| `…W40-…-v5` | `$|\text{Fútbol} cup\text{Voleibol}| = 25 + 20 - 10$` (debía ser `\cup`) |
| `…W40-…-v20` | `= sum_{n=1}^infty n x^{n-1}` (debía ser `\sum`, `\infty`) |

Afecta a **11 de 20 ítems del pack de W40** (v3, v4, v5, v7, v8, v14, v15, v16, v17, v19, v20) y a **15 de 40 archivos del área** (`imes` en 15 archivos, `left(`/`ight)` en 13).

### P2. LaTeX fuera de delimitadores `$` (se muestra el comando crudo)
| ID | Evidencia |
|---|---|
| `CO-MAT-11-2026-W10-…-v1` … `-v20` | Opción D (o C según el ítem): `- [ ] D) \mathbb{R}` — 20 veces, sin `$…$`. |
| `CO-MAT-11-2026-W30-…-v13` | Opciones `- [x] D) \pi`, `- [ ] A) 3\pi`, `- [ ] C) \frac{\pi}{3}` — sin `$…$`. |
| `CO-MAT-11-2026-W30-…-v7` | Explicación completa sin `$`: `\lim \frac{6n+1}{2n-3} = \frac{6}{2} = 3.` |
| `CO-MAT-11-2026-W30-…-v11` | Explicación sin `$`: `\lim_{b \to \infty} \left[ -\frac{1}{x} \right]_1^b = 1.` |

### P3. Feedback que no explica su propio distractor (o se contradice)
| ID | Evidencia |
|---|---|
| `CO-MAT-11-2026-W40-…-v1` | Distractor `D) 9`: *"Calculó el promedio aritmético (40/5 = 8) pero lo confundió con 9"*. La suma real es **50**, no 40 (la media es 10, y el propio feedback de `B) 10` lo dice bien). Enseña una suma falsa. |
| `CO-MAT-11-2026-W01-…-v1` … `-v20` | Distractor `D` con feedback fijo *"No se multiplicó por 2"*, pero los valores no corresponden (v1 D=5, v20 D=24: sin multiplicar por 2 daría 21). |
| `CO-MAT-11-2026-W20-…-v1` … `-v20` | `A` con feedback *"falta dividir entre 2 al despejar x"*, pero la opción es $2k+5$ (v1: 9 con $k=2$), no $2k$. `D` con *"se tomó el término constante"* y valor $100+k$ (v1: 102): no se deduce de ningún error. |
| `CO-MAT-11-2026-W30-…-v2` | `D) \frac{4}{3}\pi` con feedback *"Error al calcular $2^3$"*: ese valor no proviene de $2^3$ (es el volumen del cono de altura 1). |

### P4. Contexto decorativo o incoherente (no aporta información necesaria)
- `…W01-…-v1`…`-v20`: "En la ciudad de Bogotá, se analiza el crecimiento de una población de bacterias" para evaluar $2x+1$ en $x=1$. El contexto no se usa ni es coherente con un modelo lineal sin término de crecimiento.
- `…W20-…-v2` (farmacéutico/concentración), `-v5` (buses/aceleración), `-v8` (solar/radiación), `-v10` (meteorología/temperatura): pregunta siempre de beneficio y producción.
- `…W10-…-v1`…`-v20`: "Camila en Medellín repasa los temas fundamentales del Periodo 1" — relleno puro, 20 contextos distintos para el mismo ítem.

### P5. Metadatos inconsistentes
- **Campo `**ICFES:**` fuera de taxonomía**: los componentes ICFES son numérico, geométrico-métrico, aleatorio y variacional; el campo mezcla componentes con competencias y añade una etiqueta inexistente. En el área: `Numerico` 154, `Aleatorio` 140, `Razonamiento` 120, `Resolucion` 110, `Variacional` 90, `Formulacion` 70, `Modelacion` 50, **`Algebraico` 50**, `Geométrico/Geometrico` 16 → **400 de 800 (50 %) no es un componente válido**. Ejemplos: `W20-…-v1` = `Algebraico`; `W30-…-v1` = `Formulacion`; `W40-…-v3` = `Aleatorio`.
- **`calibration` del frontmatter contradice el bundle**: los 5 bundles declaran `calibration: {difficulty_band: "D3-D4", expected_success: 0.8}` aunque dentro van de `[D3-D4]` a `[D9-D10]` con `Expected_Success` 0.85 → 0.45 (W40).
- **`tier: "legacy"`** en el frontmatter de los 5, mientras el nombre del archivo dice `-MASTERY-bundle`.
- **`Bloom` fijo**: `W01-…-v1`…`-v20` todos `Remember`, incluidos los rotulados `[D9-D10]`.

### P6. Artefactos de plantilla (`{{ }}` dobles llaves)
`CO-MAT-11-2026-W30-…-v6` (`$\vec{{v}}$` — visible en el pack), `-v7` (`\frac{{6n + 1}}{{2n - 3}}`), `-v8`, `-v10`, `-v11`, `-v14`, `-v15`, `-v18`: 7 contextos. En KaTeX renderiza igual, pero delata el generador y ensucia el markdown.

### P7. Estructura del ítem: la pregunta no está en `Enunciado`
`CO-MAT-11-2026-W40-repaso-p4-integrador-001-MASTERY-bundle-v6`: el `**Contexto:**` contiene la pregunta ("¿De cuántas maneras diferentes se pueden ordenar las letras de la palabra COLOMBIA?") y el `### Enunciado` es una nota ("Tenga en cuenta que la letra 'O' se repite 2 veces"). Publicado así en el pack: `statement` = la nota, `context` = la pregunta. En ranked no rompe porque `ranked.ts` envía `context` (línea 356), pero cualquier vista que muestre solo `statement` presenta un ítem irresoluble.

### P8. Duplicado entre bundles (bajo)
`CO-MAT-11-2026-W24-geometria-analitica-001-MASTERY-bundle-v2` y `CO-MAT-11-2026-W30-repaso-p3-001-MASTERY-bundle-v3` son el mismo ítem con otros puntos (P(−2,4),Q(6,8)→(2,6) y A(−4,2),B(6,8)→(1,5)). Es el **único** enunciado normalizado que se repite entre dos archivos del grado.

---

## Patrones sistémicos

### 1. Generación por plantilla única (el defecto principal: 52,5 % del área)
Contando enunciados distintos tras normalizar números:

| Familia | Bundles | Patrones distintos / 20 | Consecuencia |
|---|---|---|---|
| **Plantilla única (1 patrón)** | W01, W02, W03, W04, W05, W06, W07, W08, W10, W11, W13, W14, W15, W16, W17, W18, W19, W20, W21 (**19 bundles, 380 ítems**) | 1 | 20 clones por bundle |
| Casi-plantilla | W09 (3), W12 (4) (**2 bundles, 40 ítems**) | 3–4 | 5–9 clones por patrón |
| Variados | W22–W29, W30–W40 (**19 bundles, 380 ítems**) | 20 | sin duplicación interna |

Evidencia del parámetro secuencial (el estudiante puede responder sin leer):
- `W03-…-v1`…`-v6`: $\lim_{x\to a}\frac{x^2-a^2}{x-a}$ con $a=2,3,4,5,6,7$ → claves 4, 6, 8, 10, 12, 14 (siempre $2a$).
- `W02-…-v1`…`-v6`: $2x+k \le \dots$ → claves $x\le 7, 9, 11, 13, 15, 17$ (siempre impar creciente).
- `W13-…-v1`…`-v4`: $f(x)=kx^3+\dots$ → derivada trivial término a término.

### 2. LaTeX manipulado por el generador
`imes` (15/40 archivos), `left(`/`ight)` (13/40), `Rightarrow` (7/40), `cup` (6/40), `dots` (4/40), `sum_` (7/40): el pipeline que inserta variables rompió `\times`, `\left`, `\right`, `\Rightarrow`, `\cup`, `\dots`, `\sum`. **Llega a los packs publicados**, no es solo cosmética del markdown.

### 3. Metadatos de plantilla
`ICFES` mezclando componentes y competencias (50 % inválido), `calibration` fija en D3-D4/0.8, `Bloom` fijo en `Remember`, `tier: legacy` bajo nombre `MASTERY`.

### 4. Selección de ranked sin deduplicación
`ranked.ts` deduplica por `id`, no por enunciado, y toma 2 packs por área. Números arriba: ≈76 % de exámenes con ≥2 clones idénticos en matemáticas.

---

## Recomendación

**Retirar del pool ranked (inmediato, sin tocar contenido): W01–W21.**
Son 21 bundles / 420 ítems (52,5 % del área) de plantilla única. En ranked basta un filtro temporal por `id`/`week` en `ranked.ts` o marcar esos packs fuera del manifiesto de ranked; no requiere regenerar para dejar de contaminar exámenes.

**Mantener, corrigiendo formato antes de ranked:**
- `CO-MAT-11-2026-W30-repaso-p3-001-MASTERY-bundle.md`: 20/20 claves correctas y 20 enunciados distintos (el mejor bundle del grado). Corregir solo `-v13` (opciones `\pi` sin `$`), `-v7` y `-v11` (explicación sin `$`), y las 7 llaves dobles.
- `CO-MAT-11-2026-W40-repaso-p4-integrador-001-MASTERY-bundle.md`: 20/20 claves correctas y 20 ítems distintos. Corregir el LaTeX de v3, v4, v5, v7, v8, v14, v15, v16, v17, v19, v20, el feedback de `-v1` (suma 50, no 40) y mover la pregunta de `-v6` de `context` a `statement`.

**Regenerar (no parchear): W01, W10, W20.** Parchear 20 clones no tiene sentido: hay que producir 20 ítems distintos por bundle, con contexto que el ítem realmente use y nivel D5-D10 real.

**Añadir dos gates al validador** (`scripts/validate-bundles-v52.mjs`), porque ninguno de los defectos anteriores es detectable hoy:
1. **Gate de duplicación**: hash del enunciado normalizado (sin números) por bundle; fallar si hay más de 2 ítems con el mismo hash. Habría bloqueado 21 bundles de 40.
2. **Gate de LaTeX**: fallar si aparece `imes`, `left(`, `ight)`, `Rightarrow`, `cup`, `dots`, `sum_` fuera de un comando, o si un `\comando` queda sin `$…$` que lo envuelva. Habría bloqueado 15 archivos y 11 ítems del pack de W40.

**No hay que tocar claves**: 0 errores de respuesta en 100 ítems revisados. El riesgo de este banco para ranked es la degeneración del examen (preguntas repetidas y triviales), no que la respuesta marcada sea falsa.

---

### Límites de esta auditoría (declaración explícita)
- Verifiqué matemáticamente **100 ítems** (W01, W10, W20, W30, W40), no los 800.
- Sobre los otros 35 bundles solo afirmo lo que medí con búsquedas: patrones de enunciado, presencia de LaTeX corrupto, valores de metadatos y contenido de los packs publicados. **No afirmo que sus claves sean correctas o incorrectas.**
- No ejecuté el validador ni el pipeline; no modifiqué ni generé archivos dentro del repo.
