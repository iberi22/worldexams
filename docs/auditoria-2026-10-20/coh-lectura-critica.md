# Auditoría de coherencia pedagógica — `lectura-critica` grado 11 (Colombia, ranked ICFES)

**Directorio auditado:** `questions_data/colombia/lectura-critica/grado-11/2026/weekly/`
**Fecha:** 2026-10-20 · **Modo:** solo lectura (no se modificó ni creó nada dentro del repo)

| Métrica | Valor |
|---|---|
| Bundles en el directorio | 44 (`CO-LC-11-2026-W01…W40`, con **dos** bundles en W37, W38, W39 y W40) |
| Preguntas totales del área | 880 (20 × 44) |
| Bundles leídos **completos** | 7 → W01, W10, W20, W30, W31, W35, W40-repaso-final-p4 = **140 ítems** |
| Bundles leídos **parcialmente** | W32 (v1–v4) y W38-editorial (v1–v4) |
| Bundles donde solo se leyeron **enunciados** | W33, W36, W39-satira |
| Métricas de corpus (44 bundles, 880 ítems) | calculadas por script de solo lectura |
| Evidencia de publicación | packs `co-week-*-grade-11-subject-lectura_critica.json` |

---

## Resumen (lectura-critica)

- **Claves incorrectas o con segunda respuesta defendible: 1/140 (0,7 %).** Solo `CO-LC-11-2026-W31-…-v12`. La calidad de la clave **no** es el problema de esta área.
- **Ítems que no miden lectura (sin estímulo o pregunta de definición): 48/140 (34,3 %).** Aquí está el problema real: el ítem no es "difícil" ni "ambiguo", simplemente **no hay texto que leer**. La pregunta pide la tesis del autor de un ensayo que no se reproduce, o pide la definición de "crónica" sin ningún texto. Un ítem así no puede puntuar comprensión lectora y no es defendible en un examen oficial.
- **% bloqueante total (clave mala + ítem inválido): 35,0 %** (49/140), que deja un techo de 65 % (91/140).
- **% usable para ranked sin cambios: ≈ 57 %** (≈ 80/140). El techo del 65 % baja unos 8 puntos porque parte de los ítems sobrevivientes tienen defectos de forma verificados que un revisor rechazaría tal cual: opción compuesta `C) Metáfora / Hipérbole` (`W01-v3`), `de corré` dentro de una opción (`W10-v20`), `imperfeto` y `engolosina` en feedback (`W20-v8`/`-v17`).
- **Estimación al área completa: ≈ 55–60 % usable**, con el 30–40 % restante repartido entre la familia degenerada W30–W40 y los defectos de forma de W19–W29.
- **Sesgos de formato medidos en el corpus completo (880 ítems):**
  - **789/880 (89,7 %)** tienen la respuesta correcta en la **primera** opción del archivo; en 36 de 44 bundles es 20/20.
  - **808/880 (91,8 %)** tienen la correcta como la opción **más larga**.
  - **633/880 (71,9 %)** imprimen las opciones fuera de orden A, B, C, D (aparecen como B, A, D, C…).
  - La distribución de letras sí está balanceada (A=200, B=247, C=210, D=223): el sesgo es **posicional, no de letra**.

> **El banco de lectura crítica no falla por las respuestas: falla porque una de cada tres preguntas no tiene texto.** La segunda falla, casi tan grave, es que el 90 % de las claves se puede adivinar sin leer: la correcta es la primera y la más larga.

---

## Defectos bloqueantes

> Se separan dos clases porque el efecto en ranked es distinto. **B1** = la clave es incorrecta o hay dos respuestas defendibles (el ítem califica mal). **B2** = el ítem no es una pregunta de lectura (no hay estímulo, o es una definición de glosario): el ítem no puede medir lo que dice medir y no debe entrar a un examen.
>
> Convención de ID: el identificador completo de cada ítem es el `id` del frontmatter del bundle + `-vN`.

### B1 — Clave incorrecta o ambigua

| Archivo | ID | Problema | Evidencia breve | Corrección sugerida |
|---|---|---|---|---|
| `CO-LC-11-2026-W31-simulacro-saber11-lectura-001-MASTERY-bundle.md` | `…-v12` | **Dos respuestas defendibles y feedback que se contradice con la clave.** En la deixis, `aquella` remite al antecedente **más lejano** = "norma A"; la clave marca lo contrario y su propio feedback dice lo contrario. | Enunciado: "¿A qué referente alude 'aquella' en *La norma A deroga a la norma B; aquella quedará sin vigencia*?" Clave `[x] A) A la 'norma B', por ser el antecedente femenino más cercano…` con feedback: *"'aquella' remite al **primer término nombrado** o antecedente previo distante"*. La opción B dice *"A la 'norma A'"* y su feedback repite *"'aquella' remite al primero de la relación (norma A)"*. Dos ítems distintos del mismo archivo afirman cosas opuestas sobre la misma regla. | Cambiar la clave a **norma A** y reescribir el feedback de A para que nombre la regla correcta (`este` = término más próximo; `aquel` = término más distante), o reemplazar el ítem. Corregir de paso el feedback de B. |
| `…W10-repaso-p1-001-MASTERY-bundle.md` | `…-v9` | **Feedback de la opción correcta con error gramatical y de sentido**: "ejercer una justicia" sin complemento. No invalida la clave, pero el feedback es la única retroalimentación que recibe el estudiante. | `<!-- feedback: … ejercer una justicia … -->` (registrado en el ítem sobre función de la argumentación). | Reescribir: "aplicar la justicia" / "administrar justicia". Se lista aquí solo porque afecta la defendibilidad del ítem ante revisión. |

### B2 — Ítems que no miden lectura (sin estímulo o de definición)

Estos ítems tienen clave correcta. El problema es que **no hay texto**: el campo `Contexto` es una **etiqueta de unidad**, no un estímulo. El estudiante no puede "inferir la tesis del autor" de un ensayo que nunca se le muestra.

| Archivo | ID | Problema | Evidencia breve | Corrección sugerida |
|---|---|---|---|---|
| `CO-LC-11-2026-W30-repaso-p3-001-MASTERY-bundle.md` | `…-v1` … `-v20` (**20 ítems**) | **El ítem pide la tesis / el presupuesto / la intención de un texto que no existe.** El `Contexto` es un rótulo de repaso. | `Contexto: "Repaso Periodo 3: Tesis en ensayos de opinión contemporáneos (Bogotá)."` + `v1`: *"¿Cuál es la tesis central que defiende el autor sobre el impacto de las redes sociales en el debate público?"*. No hay autor, no hay ensayo. Igual `v2` ("¿Qué presupuesto no declarado sostiene la frase…?" — la frase sí está, pero el resto del texto no), `v3`, `v4`, `v19`. | Insertar el estímulo (150–300 palabras) dentro del ítem o en un bloque de texto compartido, y anclar cada pregunta a una línea concreta del texto. |
| `CO-LC-11-2026-W35-cronica-periodistica-001-MASTERY-bundle.md` | `…-v1` … `-v20` (**20 ítems**) | **Cuestionario de definiciones de glosario, no de lectura.** Pregunta qué es una crónica, qué es una metáfora, etc., sin texto. Los distractores son deliberadamente absurdos, así que se responde sin saber. | `v1` Enunciado: *"¿Qué es una crónica periodística?"*; opciones `[x] A) Un texto narrativo que relata hechos reales con recursos literarios.`, `B) Una novela de ficción completa.`, `C) Una receta culinaria.`. `Contexto` = *"En una redacción en Bogotá, Andrea lee crónicas de Gabriel García Márquez."* — Andrea no lee nada en el ítem. | Sustituir por crónicas reales (fragmento de 200 palabras) y preguntar por el efecto del detalle sensorial, la voz del cronista o el contraste hecho/opinión **en ese fragmento**. |
| `CO-LC-11-2026-W40-repaso-final-p4-001-MASTERY-bundle.md` | `…-v1` … `-v20` (**20 ítems**) | **Mismo patrón que W35**, con distractores igual de absurdos. Varios ítems ni siquiera fingen tener texto. | `v1`: *"¿Cuál es la función de la tesis en un ensayo argumentativo?"*; `v3`: *"¿Qué elemento es esencial en un texto teatral?"* con `B) La descripción detallada del paisaje natural.`; `v6`: *"Todos lo dicen, así que es verdad. ¿Qué tipo de razonamiento es?"*. `Contexto` = *"En un simulacro Saber 11 en Bogotá, se presenta un fragmento narrativo corto."* — el fragmento no se presenta. | Regenerar como simulacro real: un texto por bloque temático y 4–6 preguntas ancladas a él. |
| `CO-LC-11-2026-W31-simulacro-saber11-lectura-001-MASTERY-bundle.md` | `…-v6` | **Pide comparar dos textos inexistentes.** | *"¿En qué coinciden y en qué difieren el Autor A (empresarial) y el Autor B (sindical) sobre la jornada de trabajo?"*. Contexto: *"Comparación de posturas contrapuestas en dos textos sobre la reforma laboral (Bucaramanga)"*. Ningún Autor A/B aparece en el archivo. | Incluir los dos fragmentos (80–120 palabras cada uno) antes del enunciado. |
| `…W31-…md` | `…-v8` | **Pide contrastar un texto con un mapa/tabla que no se entrega.** | *"Al contrastar un texto sobre la Amazonia con un mapa de deforestación por hectáreas, ¿qué conclusión es correcta?"*; contexto: *"Interpretación de textos discontinuos (tablas e infografías sobre deforestación) (Pereira)."* Ni tabla ni infografía. | Adjuntar la tabla/infografía (o su descripción tabulada en texto) dentro del ítem. |
| `…W31-…md` | `…-v1`, `-v3`, `-v19` | **Piden la tesis, la intención o el propósito de un texto ausente**, igual que W30. | `v1`: *"¿Cuál de las siguientes afirmaciones sintetiza la postura de un autor que critica el tecnocentrismo moderno?"*; `v3`: *"¿Cuál es la intención principal de un articulista al exponer las contradicciones…?"*; `v19`: *"¿Cuál es la tesis implícita de un editorial que denuncia la falta de agua en Quibdó…?"*. | Cada uno necesita su texto. Si no se quiere cargar el bundle, convertir el ítem en una pregunta sobre un fragmento breve citado en el enunciado. |

> **Por qué B2 bloquea y no es "menor":** en un examen de comprensión lectora el estímulo *es* el constructo. Sin él, el ítem mide vocabulario o cultura general, y la respuesta correcta se puede elegir por descarte de los distractores absurdos ("Una receta culinaria"). Un ítem así infla el puntaje de quien no leyó nada y no discrimina. En ranked, donde el puntaje se compara entre usuarios, esto es peor que un ítem difícil.

---

## Defectos menores (agrupados por patrón)

### P1. Feedback que no explica nada (1–6 palabras)
El gate v5.2 lo deja pasar porque solo rechaza el veredicto desnudo (`"Incorrecto."`) y el reenvío (`"Revisa el concepto."`); una frase corta con contenido laxo pasa. Medido: **332/3520 feedbacks (9,4 %) tienen menos de 25 caracteres**, y están concentrados en la familia W32–W40 (W40-simulacro 69/80, W39-satira 56/80, W38-discurso 51/80).

- `CO-LC-11-2026-W35-cronica-periodistica-001-MASTERY-bundle.md` `-v1`, clave: `<!-- feedback: Combina información y estilo. -->` — no dice qué se combina ni por qué eso define una crónica.
- `…W35-…md` `-v1`, opción B: `<!-- feedback: Abarca hechos verificables. -->` — no explica **por qué** una novela de ficción no es una crónica.
- `CO-LC-11-2026-W40-simulacro-cierre-saber11-001-MASTERY-bundle.md` `-v1`, clave: `<!-- feedback: Es el motor del relato. -->`; opción B: `<!-- feedback: Es dato, no núcleo. -->`.

Verificado en código: `scripts/validate-bundles-v52.mjs`, `feedbackProblem()`, devuelve `null` (acepta) para `"Sí lo es."`, `"Es dato formal."`, `"Es plagio."` y `"Combina información y estilo."`.

### P2. Inglés y errores de ortografía dentro de contenido en español
- `…W35-…md` `-v6`, **opción correcta**: `[x] A) Recrear ambientes, personajes y atmospheres con detalle sensorial.` — el estudiante lee una palabra en inglés en la respuesta que debe marcar.
- `…W35-…md` `-v19`: `atmosferas` (sin tilde, y el término correcto en el contexto es "atmósferas").
- `CO-LC-11-2026-W20-repaso-p2-001-MASTERY-bundle.md` `-v8` feedback: `imperfeto` (por "imperfecto"); `-v17` feedback: `engolosina` (por "engolosinan"/"seduce").
- `CO-LC-11-2026-W22-ensayo-critico-…md`, `…W28-…md`, `…W31-…-v7` feedback: `meidante` (por "mediante").

### P3. Opciones mal formadas o con contenido ajeno a la pregunta
- `CO-LC-11-2026-W01-diagnostico-saber11-001-MASTERY-bundle.md` `-v3`: opción compuesta `C) Metáfora / Hipérbole` — dos figuras en una sola opción; la clave sigue siendo única, pero la opción no es una alternativa limpia.
- `CO-LC-11-2026-W10-repaso-p1-001-MASTERY-bundle.md` `-v20`: opción con `de corré` (palabra partida/tilde sobrante).
- `CO-LC-11-2026-W10-…md` `-v19`: cita *"Canto a Colombia"* atribuyéndolo a *"una poeta afrodescendiente"* sin nombre — no es verificable y no permite evaluar la interpretación.

### P4. Clasificación ICFES inconsistente y dificultad declarada falsa
- **Siete taxonomías mezcladas** en el mismo grado: `Pragmático` (242), `Semántico` (199), `Textual` (124), `Sintáctico` (122), `Discursivo` (96), `Evaluativo` (77), más `Lectura inferencial` (9), `Lectura critica` (6, sin tilde) y `Lectura literal` (5). No son el mismo sistema de ejes, así que el campo no sirve para analítica ni para balancear el examen.
- **Los 44 frontmatters declaran `calibration: {difficulty_band: "D3-D4"}`** mientras los ítems van de `[D3-D4]` a `[D9-D10]`. La etiqueta global no describe al bundle.

### P5. Estímulos de menos de una línea
**486/880 contextos (55,2 %) tienen menos de 120 caracteres**; el más largo del área es de 384 (`W12-infografia`) y **ninguno supera 400**. Un texto de 120 caracteres no permite preguntar por estructura argumentativa, presupuestos ni intertextualidad. Es el mismo defecto que en B2, en su versión "hay algo de texto pero no alcanza".

### P6. Colisión de `week` entre bundles distintos
W37, W38, W39 y W40 tienen **dos bundles cada uno** con el mismo `week` (`W37-literatura-testimonial` + `W37-novela-historica-colombiana`, etc.). Los packs publicados de esas semanas contienen **40 preguntas** en lugar de 20, lo que rompe el supuesto de tamaño de pack del modo ranked.

---

## Patrones sistémicos

1. **El banco está partido en dos mitades de calidad distinta.** W01–W29 tiene estímulos (cortos, pero los tiene) y distractores plausibles. W30–W40 es otra cosa: rótulos de unidad en el campo `Contexto`, preguntas de definición y feedback de tres palabras. El corte no es gradual, es un cambio de generador.
2. **La respuesta se puede adivinar sin leer, en 9 de cada 10 ítems.** Correcta en primera posición 89,7 %, correcta = opción más larga 91,8 %. `apps/worldexams-api/src/ranked.ts` **sí reordena las opciones en el servidor** (líneas 330-341), así que el sesgo posicional no llega a ranked — pero **el sesgo de longitud sí**, porque reordenar no cambia cuál es la más larga. Un estudiante que marque siempre la opción más larga acierta ~92 % sin leer.
3. **El gate no ve ninguno de estos defectos.** Ejecutado sobre los 44 bundles: `quality: 0 errors, 83 warnings (explanation-short: 81, answer-letter-bias: 2)` → `Validated 44 bundle file(s). Failures: 0.` (exit 0). El validador cuenta presencia de campos, no validez del ítem: no comprueba que exista estímulo, ni que el feedback explique, ni que la clave no sea la más larga.
4. **Lo defectuoso ya está publicado.** `apps/worldexams-api/public/v1/packs/co-week-30-grade-11-subject-lectura_critica.json` contiene los 20 ítems de W30 con `context: "Repaso Periodo 3: Tesis en ensayos de opinión contemporáneos (Bogotá)."` — es decir, la etiqueta sin estímulo se sirve tal cual al usuario. El filtro de ranked solo descarta `PLACEHOLDER_RE` (`Pregunta de prueba \d+`, `Explicación detallada de la pregunta`) y exige 4 opciones y 1 correcta: **ninguno de los bundles defectuosos se filtra**.
5. **Impacto en ranked:** con `RANKED_PACKS_PER_AREA = 3` y `RANKED_MIN_POOL_PER_AREA = 24`, cada área carga 1–2 packs de semana (20 ítems < 24 → carga un segundo). Si se retiran ~15 de los 44 bundles, la probabilidad de que una sesión de ranked incluya al menos una semana mala es **≈ 57 %** (`1 − C(29,2)/C(44,2)`). Como las semanas 37–40 ya traen 40 ítems por pack, el daño es mayor de lo que sugiere el conteo de bundles.
6. **El sesgo de muestra juega a favor del banco, no en contra.** Leí completos W01, W10 y W20 —los mejores— junto con W30, W31, W35 y W40 —los peores—. La extrapolación de ~57 % de usabilidad es una **estimación**, no una medición: solo son mediciones los 140 ítems leídos; de W32–W39 tengo enunciados (W33, W36, W39) o los primeros 4 ítems (W32, W38-editorial), y el resto se infiere de las métricas de feedback corto y de la etiqueta `Contexto`. Para convertirla en medición hay que leer W19, W22–W29 y W32–W39 completos.

---

## Recomendación

**Corto plazo — sacar lo roto de ranked (no requiere escribir contenido):**
1. **Retirar del pool de ranked los 13 bundles de W32–W40** (260 ítems, 29,5 % del área): son la familia de definiciones con estímulo-rótulo. No se borran del repo; se excluyen del pool hasta regenerarlos.
2. **Retirar W30 completo** (20 ítems): pide la tesis de textos inexistentes y ya está publicado con el rótulo como contexto.
3. **Reparar W31 antes de usarlo**: los 5 ítems B2 (`v1`, `v3`, `v6`, `v8`, `v19`) y el B1 (`v12`). Los otros 15 son los mejores ítems del área.
4. **Cuarentena W19 y W22–W29** hasta leerlos: no los verifiqué ítem por ítem y concentran los `meidante`; usarlos a ciegas contradice el criterio de este informe.

**Mediano plazo — arreglar el generador, no los ítems:**
5. **Estímulo obligatorio:** un ítem de lectura sin al menos 250 caracteres de texto (o un estímulo referenciado y presente en el bundle) debe ser **error**, no warning. Es la regla que habría detenido los 260 ítems de W32–W40.
6. **Cerrar el hueco de `feedbackProblem()`**: exigir cláusula causal (verbo conjugado + conector o cifra/término concreto), no solo "que no sea el veredicto desnudo". Hoy `"Es plagio."` pasa.
7. **Dos gates de sesgo medibles:** clave en primera posición **≤ 30 %** (hoy 89,7 %) y clave = opción más larga **≤ 40 %** (hoy 91,8 %). El reordenamiento del servidor ya resuelve la posición en ranked; el de longitud no lo arregla nada.
8. **Un solo vocabulario ICFES cerrado** (`Pragmático`, `Semántico`, `Textual`, `Sintáctico`, `Discursivo`, `Evaluativo`) validado contra lista, y `difficulty_band` calculado del rango real de los ítems en lugar de copiado.
9. **Resolver la colisión de `week` en W37–W40** (dos bundles con el mismo `week`): o se renumeran, o se acepta formalmente el pack de 40 y se ajusta `RANKED_MIN_POOL_PER_AREA`/el generador de packs en consecuencia.

**Orden de ejecución sugerido:** (1) y (2) hoy, porque bajan el riesgo de ranked de ≈57 % a menos del 10 % sin escribir una línea de contenido (lo que queda es la incertidumbre de W19 y W22–W29, que no leí). (5) y (6) antes de la próxima ola de generación, para que la ola no vuelva a producir lo mismo. (3), (4) y (9) en la misma ola de contenido.

**Una advertencia sobre el número final:** el ≈57 % de usabilidad sin cambios describe los 140 ítems que leí, no los 880 del área. La cifra que sí está medida y no depende de la muestra es la del formato: **89,7 % de claves en primera posición y 91,8 % de claves en la opción más larga sobre los 880 ítems**, y **0 errores del validador** sobre los 44 bundles. Un banco donde la respuesta se adivina sin leer no está listo para ranked, aunque cada clave sea correcta.
