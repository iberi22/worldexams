# Auditoría de coherencia pedagógica — `sociales-ciudadanas` grado 11 (Colombia, Saber 11)

**Alcance leído (muestra de 5 bundles, 100 preguntas completas):**

| Bundle | Archivo |
|---|---|
| W01 | `questions_data/colombia/sociales-ciudadanas/grado-11/2026/weekly/CO-SOC-11-2026-W01-diagnostico-saber11-001-MASTERY-bundle.md` |
| W10 | `.../CO-SOC-11-2026-W10-acuerdo-de-paz-y-memoria-historica-001-MASTERY-bundle.md` |
| W20 | `.../CO-SOC-11-2026-W20-integracion-andina-001-MASTERY-bundle.md` |
| W30 | `.../CO-SOC-11-2026-W30-trabajo-decente-001-MASTERY-bundle.md` |
| W40 | `.../CO-SOC-11-2026-W40-justicia-transicional-001-MASTERY-bundle.md` |

El directorio tiene **40 bundles y 800 preguntas** en total. Leí completos 100 ítems (5 bundles × 20) y resolví cada uno por mi cuenta antes de comparar con la marca `- [x]`. Las cifras de corpus (distribución de clave, orden de letras, duplicados) se calcularon con scripts de solo lectura sobre los 40 archivos. **Las otras 35 bundles no las leí: no afirmo nada sobre su contenido.**

---

## Resumen (sociales-ciudadanas)

- **Preguntas revisadas:** 100 (5 bundles × 20).
- **Clave correcta y única:** **97 %** (97/100). Solo 3 ítems tienen la clave mal o la premisa inventada.
- **Defecto bloqueante (clave incorrecta / premisa falsa):** **3 %** (3/100) — los tres en W40.
- **Defecto menor (error factual en feedback/explicación, errata visible, premisa imprecisa):** **31 %** (31/100). De ese 31 %, **12 ítems son de W20 y 10 de ellos por la misma errata** ("Comunidad Andiana").
- **Sin defecto de contenido detectable:** **66 %** (66/100).
- **Defecto de formato (independiente del contenido):** 137/800 preguntas del corpus tienen las opciones rotuladas fuera de orden (B antes que A, etc.) y 132 tienen una línea en blanco doble entre opciones. W40 aporta 14 de esos 20 ítems.

| Bundle | Clave OK | Bloqueante | Menor | Sin defecto |
|---|---|---|---|---|
| W01 | 20/20 | 0 | 6 | 14 |
| W10 | 20/20 | 0 | 4 | 16 |
| W20 | 20/20 | 0 | 12 | 8 |
| W30 | 20/20 | 0 | 4 | 16 |
| W40 | 17/20 | 3 | 5 | 12 |
| **Total** | **97/100** | **3** | **31** | **66** |

**Estimación para toda el área (extrapolación, no medición):** entre **3 % y 5 % bloqueante** y **60–65 % usable en ranked sin cambios**. La muestra no es aleatoria (incluye 3 bundles de la misma vertiente temática: W10 y W40 son casi el mismo tema y W40 concentra todos los bloqueantes), así que el 3 % de bloqueantes puede estar sobre-representado y el 31 % de defectos menores sub-representado en otras zonas del corpus.

---

## Defectos bloqueantes

| Archivo | ID | Problema | Evidencia | Corrección sugerida |
|---|---|---|---|---|
| `CO-SOC-11-2026-W40-justicia-transicional-001-MASTERY-bundle.md` | `...-bundle-v1` (Q1, líneas 33-49) | **Clave incorrecta.** Pregunta dónde se firmó el Acuerdo Final el 24-nov-2016; la clave es "Cartagena de Indias". La firma del 24 de noviembre de 2016 fue en el **Teatro Colón de Bogotá** (la de Cartagena fue la del 26 de septiembre de 2016). | La explicación del propio ítem (línea 49) dice "Teatro Colón de Cartagena" y la del distractor A (línea 38) también. En cambio `CO-SOC-11-2026-W10-...-bundle.md` Q1 (línea 47) dice correctamente "el teatro Colón de Bogotá". Las dos bundles se contradicen sobre el mismo hecho. Confirmado en fuentes: la firma del acuerdo renegociado del 24-nov-2016 fue en el Teatro Colón de Bogotá (BAPP, "La firma del Acuerdo de Paz del Teatro Colón"). | Cambiar la clave a "Bogotá" (o reformular: "la firma del acuerdo renegociado de noviembre de 2016 se realizó en…"). Si se quiere conservar Cartagena, preguntar por la firma del **26 de septiembre de 2016**. |
| `...W40...-bundle.md` | `...-bundle-v7` (Q7, líneas 183-199) | **Clave con dos datos falsos.** La opción `[x]` afirma que el informe final se presentó el **29 de noviembre de 2022** y se titula **"Coexistir…"**. El Informe Final se entregó el **28 de junio de 2022** y se titula **"Hay futuro si hay verdad"**. Un estudiante informado descarta justamente la opción correcta. | Texto de la opción en línea 189 y explicación en línea 199 ("El informe 'Coexistir'…"). Fuentes: Informe Final CEV, 28 de junio de 2022, Bogotá ("Hay futuro si hay verdad"). | Reescribir la opción: "Un informe final entregado el 28 de junio de 2022 ('Hay futuro si hay verdad')…" y corregir las 3 menciones a "Coexistir" (Q7, Q16 feedback línea 413, Q19 explicación línea 499). |
| `...W40...-bundle.md` | `...-bundle-v10` (Q10, líneas 256-274) | **Premisa inventada.** El enunciado crea la figura "Áreas de Interés Transicional para la Paz con Enfoque Territorial, o **RIT**", que no corresponde a ninguna figura del Acuerdo Final. El contexto (línea 256) pregunta "qué es un 'acta 04' o un 'RIT'", que no significa nada. La opción correcta habla de PDET, es decir de otra figura. | Enunciado línea 259 y feedback de distractores línea 263 ("Las RIT son zonas de transformación estructural"). En el Acuerdo las figuras reales son PDET, PATR, ZVTN y ETCR; no encontré registro de "RIT / Áreas de Interés Transicional" en fuentes oficiales. | Sustituir el enunciado por uno sobre **PDET** ("Los Programas de Desarrollo con Enfoque Territorial buscan…") y borrar "RIT" y "acta 04". |

Ningún otro ítem de los 100 tiene doble respuesta defendible. Los casos dudosos que sí encontré están abajo como menores, porque la clave sigue siendo la única plausible aunque la premisa sea imprecisa.

---

## Defectos menores (agrupados por patrón)

### 1. Errores factuales en feedback o explicación (la clave está bien, el texto que la justifica no)

- **W10 Q2** (`...W10...-bundle-v2`, explicación línea 70): el texto está corrupto — *"La reforma rural integral —catalanes: catastro, infraestructura de riego,.vías terciarias…"* — y cita "Planes de Seguimiento Individual y Masivo (PSDI/PMI)" (línea 65), término que no existe; los instrumentos reales son PDET y PATR. El feedback del distractor C da por buena esa sigla inventada.
- **W10 Q7** (`-v7`, feedback de la opción correcta, línea 178): dice que la Comisión entregó el informe *"en noviembre de 2022"*; fue el 28 de junio de 2022.
- **W10 Q16** (`-v16`, feedback línea 385): afirma que el partido FARC tiene representación *"gracias a las curules de la circunscripción de paz"*. Su representación viene de las 5+5 curules del Acto Legislativo 01 de 2016; la circunscripción de paz son 16 curules territoriales elegidas por votación en esas zonas.
- **W30 Q13** (`...W30...-bundle-v13`, explicación línea 324): cita el **Decreto 2591 de 1991** (tutela) como norma que desarrolla el fuero sindical, y dice que este protege *"y sus cónyuges no separados"* — el fuero sindical no protege cónyuges.
- **W30 Q14** (`-v14`, explicación línea 347): llama al régimen de prima media *"prestación definida (RAIS/Colpensiones)"*. **RAIS** es el Régimen de Ahorro Individual con Solidaridad, es decir el régimen contrario.
- **W40 Q15** (`...W40...-v15`, explicación línea 399): usa el caso *"González y otras (Campo Algodonero) vs. México"* como referencia de la tipificación de los "falsos positivos"; ese caso es de feminicidios en Ciudad Juárez.
- **W01 Q18** (`...W01...-v18`, feedback D, línea 399): dice que "en 1991 se revirtió otorgando al Estado el monopolio de la educación oficial", formulación imprecisa: 1991 estableció la libertad de enseñanza y la laicidad, no un monopolio estatal.

### 2. Erratas y fugas de idioma visibles para el estudiante

- **W20, errata sistémica:** *"Comunidad **Andiana**"* aparece **21 veces y en 12 de las 20 preguntas** (Q1, 2, 3, 4, 5, 7, 8, 11, 12, 14, 16, 18), incluida la explicación de Q1 (línea 48) y los distractores de Q1 y Q11. En el mismo corpus, `W17` y `W13` escriben correctamente "Comunidad Andina".
- **W20 Q1**, explicación línea 48: *"**Conhecer** sus miembros es el primer paso…"* (palabra en portugués).
- **W20 Q3**, feedback B línea 89: *"el libre comercio **interna**"*; **W20 Q5**, feedback C línea 139: *"**La visado** de turista"*.
- **W10 Q9**, explicación línea 231: *"reconocer **citizenship** de las víctimas"* (inglés en bundle en español); **W10 Q16**, enunciado línea 379: *"…se cuenta **oor**"* (texto truncado, visible en el enunciado).
- **W30 Q9**, enunciado línea 219: *"competente para **vigelar**"* (por vigilar); **W30 Q15**, feedback D línea 367: *"**irrespective** de estado civil"* (inglés).
- **W40 Q3**, opción A (línea 89): *"que **un** sociedad adopta"*; **W40 Q5**, opción C: *"restricción efectiva de libertades**,**satisfacción"* (sin espacio) y *"**comparación de beneficios** con el rechazo de la verdad"* (frase sin sentido dentro de la opción correcta) y *"**extradicción**"* (dos veces); **W40 Q6**, explicación línea 174: *"**estimo**"*; **W40 Q19**, explicación línea 499: *"la semana temática **se cierre**"*.
- **W01 Q14**, explicación línea 318: *"El Estado **colombiana**"*.

### 3. Premisas imprecisas que un docente discutiría (clave defendible, marco normativo mal atribuido)

- **W20 Q8** (`...W20...-v8`): atribuye al marco de la CAN el "reconocimiento y convalidación de estudios". El reconocimiento de estudios y títulos en la subregión opera por el **Convenio Andrés Bello** y por los convenios regionales de la UNESCO, no por decisiones de la CAN. La clave A sigue siendo la única opción razonable, pero el alumno aprende una atribución incorrecta.
- **W01 Q5** (`...W01...-v5`): pide el mecanismo para derogar un **impuesto** aprobado por un Concejo y da como clave el "referendo derogatorio". El artículo 4 de la Ley 134 de 1994 sí admite el acuerdo municipal como objeto, pero la propia ley fija límites para los referendos territoriales (art. 29) que el ítem no menciona; conviene revisión jurídica antes de ranked.
- **W40 Q5** (`...W40...-v5`): la opción correcta mezcla "sanciones propias restaurativas" con "comparación de beneficios con el rechazo de la verdad", giro que no se entiende; es la única defendible, pero el ítem queda a medio redactar.

### 4. Formato de opciones roto (afecta la lectura, no la clave)

137 de 800 preguntas (17 %) presentan las opciones con **letras fuera de orden**. Ejemplos leídos:

- **W40 Q3** (`-v3`): el orden es **B, A, C, D**.
- **W40 Q5** (`-v5`): el orden es **A, C, B** y luego D.
- **W40 Q17** (`-v17`): el orden es **A, D, B, C**.
- **W40 Q19** (`-v19`): el orden es **B, C, A** y luego D.

Además, 132 preguntas en 7 bundles (**W34, W35, W36, W37, W38, W39, W40**) tienen una **línea en blanco doble** entre la opción C y la D. Los 7 archivos son justamente los que tienen la marca de modificación más reciente (`ls -l`: 30-sep). Conjunto de letras siempre completo ({A,B,C,D}): el keying por `[x]` no se rompe, pero sí la presentación.

### 5. Distractores de caricatura (el ítem no discrimina)

Tres opciones absurdas hacen que el ítem se resuelva por eliminación, sin conocimiento:

- **W20 Q14**: opción D *"el Tribunal de Justicia expulsó a Venezuela por incumplir un partido de fútbol"*.
- **W20 Q13**: opción D *"Fue declarado ilegal por el Parlamento Andino ese mismo año"*; **W20 Q10**: opción A *"Recibe petróleo gratis de sus vecinos"*; **W20 Q16**: opción D *"billetes de colección con los escudos"*.
- **W01 Q2**: opciones B *"El golpe de Estado militar"* y D *"El exilio voluntario"*; **W30 Q8**: opción C *"Seis meses… pagados por la ARL"*.

### 6. Contexto decorativo y demanda cognitiva baja

- **W01 Q1**: contexto "clase de historia en Tunja" y luego una pregunta de fecha (1819); el contexto no se usa.
- **W01 Q3**: "feria turística internacional" como marco de una pregunta de geografía memorística; **W01 Q10** y **W01 Q14** repiten el patrón (doctrinas de la Guerra Fría, ramas del poder).
- **W30 Q1** y **W30 Q4**: contexto de colegio/feria y pregunta literal del artículo 25 y de quién fija el salario mínimo.
- **W40 Q4** y **W40 Q6**: recuerdo directo de un artículo (Ley 1448 art. 3) y de un decreto (589 de 2017) sin caso que analizar.

No son triviales de primaria, pero sí de **recuerdo de dato único**, justo lo que el Saber 11 de Sociales y Ciudadanas evalúa menos.

### 7. Duplicados y solapamiento temático

- **Par casi idéntico entre bundles:** `W10 Q5` (*"El SIVJRNR está conformado por"*) y `W40 Q2` (*"El SIVJRNR NO está integrado por"*) evalúan el mismo hecho con la misma lista de opciones y polaridad invertida. Si un examen ranked de 8 preguntas toma ítems de ambos, el alumno ve la misma pregunta dos veces.
- **Mismo constructo, redacción distinta (6 pares entre W10 y W40):** definición de justicia transicional (W10 Q12 / W40 Q3), Comisión de la Verdad (W10 Q7 / W40 Q7), "¿la JEP es impunidad?" (W10 Q17 / W40 Q11), castigo restaurativo (W10 Q19 / W40 Q17), memoria histórica (W10 Q15 / W40 Q19), reparación integral (W10 Q9 / W40 Q8).
- **No hay enunciados idénticos ni "mismo enunciado con números cambiados"** en los 800 (verificado por comparación de tokens: 1 solo par con Jaccard ≥ 0,55, el de arriba).
- **Concentración temática por título** (solo nombres de archivo, no verificado en contenido): 8 bundles de 40 (W06, W15, W22, W24, W31, W33, W34, W35 = 160 preguntas, 20 % del área) giran alrededor de participación/acción colectiva, y 2 bundles completos (W10, W40 = 40 preguntas) sobre acuerdo de paz y justicia transicional.

---

## Patrones sistémicos

1. **Generación por plantilla con relleno de "Contexto".** Todos los ítems abren con `**Contexto:**` y una escena local ("en un colegio de <ciudad>", "un estudiante de <ciudad>") que en una parte importante de los casos no se usa para responder. La ciudad cambia, la estructura no. Diez bundles conservan incluso el encabezado de plantilla crudo: *"Este bundle contiene 20 preguntas sobre **trabajo-decente** para grado 11"* (W22 a W31, con el slug en crudo; W30 es el que leí).
2. **Etiqueta de eje no homologada.** Hay **17 valores distintos** en `**ICFES:**` en el área, y **511 de 800 preguntas (64 %) dicen "Ciudadano"**, que no es un componente del ICFES (los componentes son Pensamiento social, Interpretación y análisis de perspectivas, Pensamiento sistémico, y las competencias ciudadanas). Conviven variantes sin tilde ("Pensamiento sistemico", "Interpretacion y analisis de perspectivas") y taxonomías ajenas ("Globalización y comercio", "Sistema político y democracia", "Laboral"). En W10 y W40 **las 20 preguntas dicen "Ciudadano"**: el eje no distingue nada.
3. **Metadatos que no describen el contenido.** `calibration` está mal calibrada: W01 declara `difficulty_band: "D3-D4"` y contiene 4 ítems D9-D10; W40 declara `"D5-D8"` y contiene D3-D4 y D9-D10. Los cinco bundles son `tier: "legacy"` con `creador: "Jules-Agent"`.
4. **Clave sesgada hacia B y C.** Corpus completo: A 161, B 245, C 246, D 148 → **B+C = 61,4 %**. Por bundle el sesgo es mayor: W02 tiene 10 B y **0 D**; W38 tiene 9 A + 10 B, 1 C y **0 D**; W33 tiene **0 D**. En ranked, con 8 preguntas y sin penalización, conviene responder B/C y se acierta más de la mitad por azar estructural.
5. **Post-proceso de opciones que dejó basura.** Los 7 bundles tocados el 30-sep (W34-W40) tienen letras desordenadas y líneas en blanco dobles; W40 además tiene opciones con el texto cortado ("comparación de beneficios", "extradicción", "un sociedad"). Todo apunta a un reordenamiento automático de opciones sin control de calidad posterior.
6. **Hechos "de manual" repetidos sin verificación contra fuente.** El mes del informe de la Comisión (noviembre vs. 28 de junio), el nombre del informe ("Coexistir" vs. "Hay futuro si hay verdad"), el lugar de la firma (Cartagena vs. Bogotá), la sigla RAIS aplicada al régimen equivocado y el término "PSDI/PMI" muestran que los datos se generaron de memoria y no se contrastaron entre bundles. Dos bundles del mismo tema se contradicen entre sí (W10 Q1 vs. W40 Q1), y esa contradicción es detectable con un simple cruce.
7. **Distractor "caricatura" como relleno.** El patrón de tres opciones imposibles aparece en las cinco bundles; es lo que hace que ítems con clave correcta sigan midiendo poco.

---

## Recomendación

**Retirar del pool ranked (hasta corregir):**

- **W40 completo** (`CO-SOC-11-2026-W40-justicia-transicional-001-MASTERY-bundle`). Es el único bundle con bloqueantes y el de peor formato (14/20 con letras desordenadas). Corregir Q1 (Bogotá), Q7 (28-jun-2022, "Hay futuro si hay verdad") y Q10 (reemplazar "RIT" por PDET) antes de reingresarlo; el resto del bundle es de buena calidad conceptual.
- **W20 completo** (`CO-SOC-11-2026-W20-integracion-andina-001-MASTERY-bundle`). No tiene claves malas, pero un estudiante no debe leer "Comunidad Andiana" 21 veces ni "Conhecer": es un error de vergüenza pública, no de puntaje. Corregir la errata (21 ocurrencias), Q1 ("Conhecer"), Q3 ("interna"), Q5 ("La visado") y la premisa de Q8, y vuelve al pool.
- **W10** puede quedarse, con dos arreglos de texto: Q2 (borrar "catalanes:" y "PSDI/PMI") y Q16 (enunciado truncado "oor" y feedback sobre las curules). Su clave y sus explicaciones son las mejores de la muestra.

**Mantener en ranked con confianza:** W01 (salvo Q5, que conviene revisar jurídicamente) y W30 (salvo las tres explicaciones con norma mal citada). Son los dos bundles con clave sólida, explicaciones que justifican la respuesta y contexto que sí se usa para resolver.

**Regenerar o reescribir:**

- **Q10 de W40** y **Q8 de W20**: no son erratas, son premisas falsas; requieren redacción nueva, no corrección de palabra.
- **Los 132 ítems de W34-W40** con formato roto: pasar un normalizador que reordene las etiquetas A-D en secuencia y elimine las líneas en blanco, y volver a validar el keying por `[x]` después.
- **El campo `**ICFES:**`**: homologar a los componentes reales del examen. Con 17 valores y 64 % "Ciudadano" el campo no sirve ni para reportar cobertura por competencia ni para balancear el ranked.
- **La calibración**: `calibration.difficulty_band` debe reflejar los rangos `[D3-D4]…[D9-D10]` que realmente tienen las preguntas (W01 y W40 hoy no coinciden).

**Antes de un ranked con 8 preguntas de área:** aplicar un filtro de selección que (a) excluya los ítems con clave marcada como bloqueante, (b) limite a **máximo 2 preguntas por bundle** para que un examen no salga con 6 ítems de justicia transicional, y (c) no mezcle W10 Q5 con W40 Q2 en la misma prueba. Con 800 preguntas para 8 posiciones hay margen sobrado para usar solo el 60 % limpio.

**Nota de método y límites:** leí 100 de 800 preguntas; las cifras de corpus (distribución de clave, 137 ítems con letras fuera de orden, 132 con línea en blanco) provienen de scripts sobre los 40 archivos, no de lectura. Los hechos puntuales que contradicen a un bundle (firma del 24-nov-2016 en Bogotá; Informe Final de la CEV el 28-jun-2022 titulado "Hay futuro si hay verdad") los verifiqué en fuentes externas; el resto de mis juicios son sobre el texto del bundle.
