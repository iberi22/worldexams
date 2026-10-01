# Un bundle puede pasar todos los gates y no tratar su propio tema

> Hallazgo del 2026-10-01, verificado leyendo los ficheros. No es un bug del
> validador: es un tipo de defecto que ningún gate de forma puede detectar.

## El caso

`questions_data/el-salvador/ingles/grado-11/2026/weekly/SV-ING-11-2026-W12-passive-voice-001-MASTERY-bundle.md`

El nombre del fichero dice `passive-voice` y el campo `**EJE:**` declara
`passive voice`. Las 20 preguntas del bundle no trataban de pasiva. Eran:

- `Choose the correct option: 'I ___ reading a book right now.'`
- `What does 'benevolent' mean?`
- `Identify the main idea: 'The text describes how bees help pollinate flowers'`
- `Which is the correct past form of 'go'?`
- `Which sentence uses the present simple correctly?`

Cinco preguntas únicas, repetidas cuatro veces cada una. Cero pasiva.

## Por qué ningún gate lo atrapa

El validador comprueba **forma**: cuatro opciones, un `[x]`, feedback que
explica, letra no sesgada, plantilla no repetida. Ese bundle cumplía todo eso.
Su contenido era gramaticalmente correcto y pedagógicamente inútil para quien
estudia pasiva, y no hay forma de distinguirlo de una pregunta válida sin
leer el enunciado y preguntarse de qué debería hablar.

`duplicate-question` sí lo marcó, pero por el motivo equivocado: avisaba de
que había preguntas repetidas, no de que el tema estaba equivocado. Un bundle
puede tener 20 preguntas únicas sobre el tema equivocado y ningún gate lo nota.

## La lección operativa

Cuando un bundle falla `duplicate-question` **y su tema es un eje concreto
(idiomas, asignaturas técnicas)**, el defecto real suele ser peor que la
duplicación: el generador que lo produjo tenía una plantilla y la plantilla
no se llenó del tema correcto. Reparar sólo las duplicadas deja un bundle con
19 preguntas buenas y 1 mala, cuando lo correcto es reescribir las 20.

Por eso el brief de reparación incluye: "verifica que el contenido realmente
trata del tema que el título declara".

## Y la medición que casi me engaña

Al contar enunciados repetidos con `### Enunciado` obtuve 219 bundles y 690
preguntas duplicadas. Era falso. Reconté con el mismo criterio que el
validador (contexto + enunciado + las cuatro opciones) y salieron **59 bundles
y 88 preguntas**, que es exactamente lo que el gate reporta. Coincidencia
exacta, cero diferencias en ambos sentidos.

Los 690 venían de que muchos bundles repiten la fórmula del enunciado y variación
está en la línea siguiente: veinte preguntas de inecuaciones que comparten
«Resuelve la siguiente inecuación de primer grado» pero cuyas ecuaciones son
`2x + 3 < 7`, `3x + 5 < 14`, `4x + 7 < 15`. Son veinte preguntas distintas.

Un enunciado repetido no es una pregunta repetida. La unidad de duplicado es
la pregunta completa, no su primera línea.

## Qué se hizo

Las 20 preguntas se reescribieron como pasiva real: presente simple, presente
continuo, pasado, pasado continuo, pasado perfecto (`had been` + participio),
futuro, modales (`must be`, `can be`, `must not be`), `need + to be`, pasiva
en estilo indirecto, doble objeto, verbo irregular, by-phrase, y tres ítems de
análisis (qué frase no puede pasivizarse porque el verbo es intransitivo, por
qué un periódico usa pasiva, y qué cláusula es pasiva dentro de una oración con
dos). Verificado: `quality: 0 errors, 0 warnings`, `Failures: 0`.
