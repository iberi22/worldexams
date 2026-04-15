<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for Critical Reading (Lectura Crítica) on the topic of argumentative texts (textos-argumentativos), for grade 11, period 2.

I need to follow:
- Progressive difficulty: D3-D4 (questions 1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
- Plausible distractors based on common errors Colombian students make
- ICFES alignment with real exam style
- Modern Colombian context
- 4 mandatory options with [x] on the correct one
- No "all of the above" or "none of the above"
- Output format: YAML frontmatter + 20 questions in markdown

Let me create these questions focusing on argumentative texts - this includes identifying thesis, arguments, evidence, counterarguments, logical fallacies, persuasive techniques, text structure, author's position, etc.

I'll create a variety of questions that test different skills within this topic area.
</think>

---
id: "CO-LEC-11-P2-textos-argumentativos-041-MASTERY"
country: "colombia"
grado: 11
asignatura: "lectura-critica"
tema: "textos-argumentativos"
periodo: 2
protocol_version: "5.1"
bundle_size: 20
bundle_index: 41
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T17:22:20.616001"
  prompt_version: "v2-direct"
quality_status: "UNREVISED"
generation_status: "RAW"
needs_human_review: true
curation:
  human_review_required: true
  human_reviewed: false
  agent_curated: false
  community_curated: false
  community_curation_count: 0
license: "CC BY-NC-SA 4.0"
open_source: false
---

## Question 1 (Variant Basic - Difficulty D3)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v1`
**Bloom:** Understand
**ICFES:** Identifica la tesis central de un texto argumentativo
**Context:** Debate sobre educación virtual en Colombia post-pandemia

### Enunciado
Lee el siguiente fragmento:

"En Colombia, la educación virtual llegó para quedarse. Desde 2020, más de 12 millones de estudiantes han tenido que adaptarse a plataformas digitales. Sin embargo, esta modalidad no ha sido igual de efectiva en todas las regiones del país. Mientras que en las grandes ciudades como Bogotá y Medellín los estudiantes cuentan con buena conectividad, en muchas zonas rurales la falta de internet convierte la educación a distancia en un desafío casi imposible."

La tesis principal que defiende el autor es:

### Options
- [ ] A) La educación virtual ha sido un completo fracaso en Colombia
- [ ] B) La educación virtual llegó para quedarse, pero presenta desigualdades regionales
- [x] C) La educación virtual tiene ventajas y desventajas dependiendo de la región <!-- feedback: La tesis presenta una posición matizada: reconoce que llegó para quedarse, pero señala las desigualdades regionales como problema -->
- [ ] D) Los estudiantes de zonas rurales prefieren la educación presencial

### Explicación Pedagógica
La tesis se identifica porque presenta una posición equilibrada del autor. La opción C capture la complejidad de la postura: reconoce un hecho (la educación virtual llegó para quedarse) y al mismo tiempo señala una problemática (desigualdad regional). Las opciones A y D son extremas y no reflejan la posición del texto, mientras que la B reduce la tesis a solo una de sus partes.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Reconoce elementos básicos de la estructura argumentativa
**Context:** Discusión sobre el uso del celular en escuelas colombianas

### Enunciado
En un texto argumentativo, el párrafo que presenta la siguiente afirmación:

"Según datos del Ministerio de Salud, el 78% de los adolescentes colombianos pasan más de 4 horas diarias conectados a redes sociales, lo que representa un riesgo para su salud mental"

corresponde a un ejemplo de:

### Options
- [ ] A) Una tesis principal
- [ ] B) Un contraargumento
- [x] C) Un dato estadístico que sirve como evidencia <!-- feedback: El párrafo presenta datos estadísticos del Ministerio de Salud para respaldar un posible argumento sobre el uso excesivo de celulares -->
- [ ] D) Una conclusión del autor

### Explicación Pedagógica
Las estadísticas y datos de fuentes oficiales son tipos de evidencia que se utilizan para respaldar argumentos. No es una tesis (que sería la postura principal), ni un contraargumento (que objectionaría la posición del autor), ni una conclusión (que cerraría el razonamiento). Los estudiantes frecuentemente confunden evidencia con tesis porque ambas son afirmaciones, pero cumplen funciones distintas.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Distingue argumentos de opiniones en textos argumentativos
**Context:** Debate sobre transporte público en Bogotá

### Enunciado
Lee los siguientes enunciados de un texto sobre el sistema de transporte masivo Transmilenio:

1. "Los buses azules de Transmilenio tienen aire acondicionado"
2. "A mi parecer, Transmilenio es el mejor sistema de transporte del país"
3. "Un estudio de la Universidad Nacional demostró que Transmilenio mueve 2,5 millones de pasajeros diarios"
4. "Es vergonzoso que el sistema funcione tan mal"

De estos enunciados, ¿cuáles corresponden específicamente a opiniones y no a argumentos?

### Options
- [ ] A) 1 y 3
- [ ] B) Solo el 2
- [ ] C) 2 y 4 <!-- feedback: El 2 usa "a mi parecer" marcando subjetividad, y el 4 es una expresión emocional ("vergonzoso") sin fundamentación -->
- [ ] D) 1, 2, 3 y 4

### Explicación Pedagógica
Las opiniones se caracterizan por ser expresiones subjetivas que no requieren fundamentación. El enunciado 2 incluye "a mi parecer", marcando claramente la subjetividad. El 4 usa lenguaje emocional ("vergonzoso") sin presentar razones. Los enunciados 1 y 3 son datos verificables. Un error común es creer que todo lo que expresa una preferencia es automáticamente un argumento, cuando en realidad solo los argumentos bien construidos con razones verificables lo son.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Identifica la función de los conectores en textos argumentativos
**Context:** Discusión sobre energías renovables en Colombia

### Enunciado
En el siguiente fragmento: "Colombia tiene un potencial enorme para la energía solar. **Por consiguiente**, varias empresas han comenzado a invertir en paneles fotovoltaicos. **Sin embargo**, aún persisten obstáculos regulatorios. **Además**, la transición energética podría generar miles de empleos en zonas rurales."

La palabra "Sin embargo" cumple la función de:

### Options
- [ ] A) Introducir un ejemplo adicional
- [ ] B) Presentar un contraargumento o matiz en el razonamiento <!-- feedback: "Sin embargo" introduce una objeción o limitación al argumento positivo presentado anteriormente sobre la energía solar -->
- [ ] C) Concluir el párrafo
- [ ] D) Reforzar el argumento principal

### Explicación Pedagógica
Los conectores en textos argumentativos señalan la relación lógica entre las ideas. "Sin embargo" indica una adversidad o contraargumento: después de afirmar el potencial de la energía solar, se introduce una limitación (obstáculos regulatorios). Los estudiantes a menudo confunden "sin embargo" con "además" porque ambos son conectores de adición, pero "sin embargo" específicamente introduce una idea opuesta o que contradice parcialmente lo anterior.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v5`
**Bloom:** Analyze
**ICFES:** Analiza la estructura de textos argumentativos identificando sus partes
**Context:** Editorial de periódico colombiano sobre la política de bilingüismo

### Enunciado
Lee el siguiente texto:

"TITULAR: El bilingüismo en Colombia: un sueño incumplido

EDITORIAL: Después de décadas de invertir en programas de inglés en escuelas públicas, los resultados siguen siendo insatisfactorios. Según el ICFES, solo el 8% de los estudiantes alcanza un nivel B1 en inglés al finalizar bachillerato.

Esta situación se debe a varios factores: la falta de docentes cualificados, la sobrecarga curricular y la ausenciade prácticas de inmersión lingüística. El gobierno debería implementar un programa nacional de formación docente con estándares internacionales.

Urge una transformación profunda del sistema educativo si queremos que Colombia sea competitiva en la economía global."

El texto presenta una estructura argumentativa clásica. ¿Cuál es la secuencia correcta de sus componentes?

### Options
- [ ] A) Tesis → Argumentos → Contraargumento → Conclusión
- [ ] B) Conclusión → Antecedentes → Argumentos → Tesis
- [x] C) Contexto/Problema → Argumentos → Propuesta → Llamado a la acción <!-- feedback: El texto presenta primero la problemática (resultados insatisfactorios), luego los argumentos (factores), después una propuesta (programa de formación docente) y finalmente un llamado a la acción -->
- [ ] D) Datos estadísticos → Definiciones → Comparación → Síntesis

### Explicación Pedagógica
Los textos argumentativos en formato editorial siguen una estructura típica: contextualizan un problema, presentan razones que lo explican, proponen soluciones y finalmente apelan a la acción. En este caso, el texto sigue esa secuencia. La opción C es correcta. Un error frecuente es confundir la estructura con modelos simplificados como tesis-argumentos-conclusión, sin reconocer las variantes del género argumentativo como los editoriales.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Evalúa la validez de los argumentos utilizados en un texto
**Context:** Discusión sobre la legalización del cannabis en Colombia

### Enunciado
Lee el siguiente fragmento de un texto argumentativo:

"La legalización del cannabis medicinal traería beneficios económicos significativos para Colombia. Uruguay, que legalizó la marijuana en 2013, reporto ingresos de 40 millones de dólares anuales por concepto de impuestos. Si Colombia implementara una política similar, podría duplicar esa cifra dado nuestro clima favorable y la extensión de tierras cultivables."

El tipo de argumento que predomina en este fragmento es:

### Options
- [ ] A) Argumento de autoridad
- [ ] B) Argumento por analogía o comparación <!-- feedback: Se compara la situación de Colombia con Uruguay para sustentar la decisión, usando la experiencia del segundo país como referente -->
- [ ] C) Argumento lógico-deductivo
- [ ] D) Argumento emocional

### Explicación Pedagógica
El argumento por analogía establece una comparación entre situaciones similares para inferir que lo que funcionó o no en un caso podría repetirse en otro. En este fragmento, se compara a Colombia con Uruguay. Este es un argumento válido pero que requiere cuidado porque las situaciones nunca son completamente equivalentes (el clima y la extensión de tierras no son los únicos factores relevantes). Los estudiantes suelen confundir este tipo con el argumento de autoridad, que se basaría en la opinión de un experto.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Identifica falacias lógicas en textos argumentativos
**Context:** Debate sobre videojuegos y violencia en jóvenes colombianos

### Enunciado
En un programa de televisión colombiana, un invitado afirma:

"Mi hijo empezó a jugar Fortnite y se volvió agresivo. El juego lo volvió violento. Por lo tanto, todos los videojuegos violentos vuelven agresivos a los niños."

Esta argumentación contiene la falacia de:

### Options
- [ ] A) Falsa causa (post hoc ergo propter hoc)
- [x] B) Generalización apresurada <!-- feedback: De un solo caso particular (su hijo) se extrae una conclusión general que aplica a "todos los videojuegos violentos" y "todos los niños" -->
- [ ] C) Apelación a la mayoría
- [ ] D) Ataque personal (ad hominem)

### Explicación Pedagógica
La generalización apresurada ocurre cuando se pasa de casos particulares insuficientes a una conclusión universal. En este caso, de un solo hijo se concluye que TODOS los videojuegos vuelven agresivos a TODOS los niños. Esta es una falacia muy común en debates sobre medios y tecnología. Los estudiantes tienden a identificar la "falsa causa" aquí, pero en realidad no hay una secuencia temporal compleja; el error principal es la extrapolación injustificada de un caso a todos los casos.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Evalúa la calidad de evidencia en textos argumentativos
**Context:** Discusión sobre desarrollo urbano en Medellín

### Enunciado
Lee el siguiente argumento:

"Las Ciclo-rutas de Medellín son un modelo a seguir para otras ciudades colombianas porque promueve un transporte sostenible y reduce las emisiones de CO2. Los desarrolladores inmobiliarios han aumentado sus proyectos cerca de las ciclo-rutas, lo que indica que el modelo tiene aceptación."

¿Cuál es la principal debilidad argumentativa de este texto?

### Options
- [ ] A) No presenta ninguna evidencia
- [x] B) Utiliza un indicador económico (proyectos inmobiliarios) como evidencia de aceptación de política pública de transporte sostenible <!-- feedback: La increase de proyectos inmobiliarios cerca de las ciclo-rutas no demuestra que el modelo sea exitoso en sus objetivos de transporte sostenible; es un indicador de valorización inmobiliaria, no de impacto ambiental o de movilidad -->
- [ ] C) Usa datos falsos
- [ ] D) No tiene contraargumentos

### Explicación Pedagógica
El texto utiliza una evidencia irrelevante para el argumento que quiere sostener. La increase de proyectos inmobiliarios es evidencia de atractivo comercial, no de éxito en objetivos ambientales o de movilidad. Este error se llama "prueba irrelevante" o "non sequitur". Los estudiantes frecuentemente no detectan este problema porque asumen que toda evidencia numérica o de mercado es automáticamente válida, sin cuestionar si responde al argumento central.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Reconoce estrategias persuasivas en textos argumentativos
**Context:** Campanha de donación de órganos en Colombia

### Enunciado
Lee el siguiente fragmento de una campaña institucional:

"¿Sabías que más de 3.000 colombianos mueren cada año esperando un trasplante? Cada persona puede salvar hasta 8 vidas. No seas parte de las estadísticas. ¡Únete a la campaña y firma tu consentimiento hoy! El amor no se mide, se dona."

Identifica las estrategias persuasivas predominantes en este texto:

### Options
- [ ] A) Solo datos estadísticos
- [x] B) Apelación emocional (miedo a ser estadística, amor) y llamado a la acción inmediata <!-- feedback: El texto combina el dato de 3.000 muertes (uso del miedo), la frase "no seas parte de las estadísticas" (culpa), y "el amor no se mide, se dona" (apelación emocional al altruismo) -->
- [ ] C) Solo argumentos racionales
- [ ] D) Solo amenazas al lector

### Explicación Pedagógica
Los textos persuasivos combinan múltiples estrategias. Este fragmento usa tres: primero apela al miedo con las muertes, luego a la culpa con "no seas parte de las estadísticas", y finalmente al altruismo emocional con "el amor no se mide, se dona". Los estudiantes frecuentemente identifican solo una estrategia o confunden las apelaciones emocionales con manipulación cuando en realidad son herramientas retóricas legítimas que deben saber reconocer.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v10`
**Bloom:** Analyze
**ICFES:** Evalúa la coherencia argumentativa en un texto
**Context:** Debate sobre trabajo remoto en empresas colombianas

### Enunciado
Lee el siguiente texto:

"Las empresas colombianas deberían implementar el trabajo remoto de forma permanente. Primero, aumenta la productividad según estudios de Stanford. Segundo, reduce costos de oficina. Tercero, mejora la conciliación entre vida laboral y personal. Cuarto, genera sentido de pertenencia en los empleados.

Por otro lado, los empleados que trabajan desde casa reportan sentirse aislados y desarrollan problemas de salud mental."

El problema principal de coherencia en este texto es:

### Options
- [ ] A) Faltan datos estadísticos
- [x] B) Los argumentos positivos presentados contradicen el contraargumento final sin que este sea refutado <!-- feedback: Los primeros cuatro argumentos presentan ventajas del trabajo remoto, pero el contraargumento sobre aislamiento y salud mental queda sin respuesta, dejando el texto con una conclusión débil -->
- [ ] C) El texto es muy corto
- [ ] D) No tiene estructura clara

### Explicación Pedagógica
Un texto argumentativo de calidad debe responder a los contraargumentos, no simplemente presentarlos. En este caso, después de enumerar ventajas, se introduce el aislamiento como problema pero no se ofrece ninguna solución o refutación. Este es un problema de coherencia argumentativa: la conclusión no se sostiene porque no se ha dialogar con las objeciones. Los estudiantes frecuentemente no detectan este problema porque se enfocan en identificar contraargumentos sin evaluar si están siendo atendidos.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v11`
**Bloom:** Evaluate
**ICFES:** Evalúa críticamente textos argumentativos identificando presupuestos implícitos
**Context:** Discusión sobre inteligencia artificial en la educación colombiana

### Enunciado
Lee el siguiente fragmento de un ensayo:

"Es evidente que la inteligencia artificial transformará la educación en Colombia. Los docentes que no se adapten a estas nuevas herramientas quedarán obsoletos. Las universidades deben incorporar urgentemente el uso de ChatGPT y herramientas similares en sus currículos, o se arriesgan a perder competitividad."

El presupuesto implícito que subyace en este argumento es:

### Options
- [ ] A) La inteligencia artificial siempre mejora la educación
- [x] B) La incorporación de tecnología es automáticamente beneficiosa y necesaria <!-- feedback: El texto presupone que usar IA es inherentemente positivo sin cuestionarlo, y que las instituciones educativas deben adaptarse ciegamente a cualquier tecnología nueva -->
- [ ] C) Los docentes actuales son incapaces de enseñar
- [ ] D) Las universidades colombianas están en crisis

### Explicación Pedagógica
Los presupuestos son ideas implícitas que el autor asume como verdaderas sin demostrarlas. En este texto, se da por hecho que incorporar tecnología es automáticamente bueno ("deben incorporar urgentemente") y que no adaptarse es negativo. Este presupuesto es problemático porque no considera posibles desventajas ni evalúa críticamente la relación tecnología-calidad educativa. Los estudiantes frecuentemente aceptan estos presupuestos sin cuestionarlos, lo cual es clave para la lectura crítica.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Identifica y evalúa el uso de falacias retóricas en argumentos complejos
**Context:** Debate sobre minería ilegal en Colombia

### Enunciado
En una carta al director de un diario colombiano, un lector escribe:

"La minería ilegal es un problema que todos los colombianos deberíamos rechazar. Mi abuelo era minero artesanal y trabajó toda su vida sin causar ningún daño al medio ambiente. Los que defienden la minería actual son personas sin escrúpulos que solo buscan el dinero fácil. Si usted vive en una zona urbana y no depende de la minería, no tiene derecho a opinar sobre el tema."

¿Qué falacias presenta este texto?

### Options
- [ ] A) Solo apela a la tradición
- [ ] B) Ataque personal y falsa autoridad
- [x] C) Apelación emocional (nostalgia), ataque al adversario (ad hominem) y argumentos de autoridad inapropiada <!-- feedback: "Mi abuelo" es nostalgia emocional, "personas sin escrúpulos" es ataque personal, y "no tiene derecho a opinar" es una falacia que ignora argumentos por su origen -->
- [ ] D) Solo generalización

### Explicación Pedagógica
Este texto acumula varias falacias: primero usa nostalgia para conectar emocionalmente ("mi abuelo"), luego ataca a quienes defienden la minería actual llamándolos "sin escrúpulos" (ad hominem), y finalmente invalida opiniones por el origen del opinante en lugar de evaluar sus argumentos (falacia geneticista). Los textos del mundo real frecuentemente combinan múltiples falacias. Los estudiantes deben aprender a identificar cada una por separado y en conjunto.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v13`
**Bloom:** Evaluate
**ICFES:** Evalúa la solidez de cadenas argumentativas
**Context:** Debate sobre regulación de redes sociales para menores en Colombia

### Enunciado
Analiza la siguiente cadena argumentativa:

Premisa 1: Los adolescentes colombianos pasan en promedio 6 horas diarias en redes sociales.
Premisa 2: Estudios de Harvard indican que el uso excesivo de redes sociales correlaciona con síntomas de depresión.
Premisa 3: Colombia tiene una de las tasas más altas de depresión juvenil en Latinoamérica.
Conclusión: Por lo tanto, regular las redes sociales para menores de 14 años es la mejor solución.

¿Cuál es la principal debilidad de esta cadena argumentativa?

### Options
- [ ] A) Las premisas son falsas
- [x] B) La conclusión no se sigue lógicamente de las premisas: la correlación no implica causación y hay un salto injustificado a la regulación como única solución <!-- feedback: Hay un salto lógico: de "correlación" no se puede concluir "causación", y de "hay un problema" no se deduce "esta solución es la mejor" -->
- [ ] C) Los datos son irrelevantes
- [ ] D) No hay conclusión

### Explicación Pedagógica
Esta cadena argumentativa tiene dos problemas: primero, confunde correlación con causación (Premisa 2), y segundo, salta de identificar un problema a proponer una solución sin evaluar alternativas ni justificar por qué esa solución es la "mejor". Los estudiantes frecuentemente aceptan conclusiones de cadenas argumentativas sin revisar la inferencia lógica, especialmente cuando las premisas parecen verdaderas.

---

## Question 14 (Variant Basic - Difficulty D8)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Compara las estrategias argumentativas de diferentes textos sobre el mismo tema
**Context:** Dos columnas de opinión colombianas sobre el programa "Jornada Única" escolar

### Enunciado
Columna A: "La Jornada Única es un acierto del gobierno. Los estudiantes pasan menos tiempo en casa sin supervisión, lo que reduce el riesgo de exposición a pandillas y sustancias. Además, más horas en el colegio significan más oportunidades de aprendizaje."

Columna B: "La Jornada Única beneficia principalmente a las familias de mayores ingresos. Los niños de familias vulnerables dependen de los programas de Alimentación Escolar durante toda la jornada. Sin estos programas, muchos niños no tendrían almuerzo en todo el día."

¿Cuál es la diferencia principal en las estrategias argumentativas de ambas columnas?

### Options
- [x] A) La columna A usa argumentos de conveniencia social mientras que la B usa argumentos de inequidad estructural <!-- feedback: A justifica la política por beneficios sociales (seguridad), B la critica revelando cómo afecta estructuralmente a los más vulnerables -->
- [ ] B) La columna A tiene más datos que la B
- [ ] C) La columna B está mejor escrita que la A
- [ ] D) Ambas defienden la misma posición

### Explicación Pedagógica
Ambas columnas abordan el mismo tema (Jornada Única) pero desde marcos argumentativos distintos: una la defiende con argumentos de orden social, la otra la critica revelando un problema de inequidad. Esta comparación permite entender cómo diferentes posiciones pueden usar estructuras argumentativas igualmente válidas pero llegar a conclusiones opuestas. Los estudiantes deben evitar juzgar textos solo por su conclusión y analizar cómo construyen sus argumentos.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Evalúa el papel del tono y registro en textos argumentativos
**Context:** Debate sobre pena de muerte en el contexto colombiano

### Enunciado
Lee dos fragmentos sobre el mismo tema:

Fragmento 1: "La implementación de la pena de muerte en Colombia representa una violación flagrante de los derechos humanos fundamentales reconocidos en nuestra Constitución y en tratados internacionales ratificados por el Estado."

Fragmento 2: "Matar a los asesinos es lo justo. Si el Estado no puede proteger a los ciudadanos, entonces la ley del Talión debe aplicarse. Los violentos merecen lo mismo que hicieron."

¿Cuál es la función del registro lingüístico en la evaluación crítica de estos argumentos?

### Options
- [ ] A) El registro no tiene importancia; solo importan los datos
- [ ] B) El Fragmento 1 es más válido porque usa palabras más complejas
- [x] C) El registro revela el compromiso ideológico del autor y permite evaluar si es apropiado para el tipo de texto argumentativo que pretende ser <!-- feedback: El Fragmento 1 usa registro formal propio de textos académicos/jurídicos; el Fragmento 2 usa registro coloquial y emocional propio de pamfletos. El registro apropiado construye credibilidad; el inapropiado puede debilitar un argumento -->
- [ ] D) El Fragmento 2 es más válido porque es más directo

### Explicación Pedagógica
El tono y registro lingüístico son estrategias argumentativas que construyen (o destruyen) la ethos del autor. Un registro formal construye autoridad; uno emocional puede ser válido en algunos contextos pero no en argumentos que aspiran a ser racionales. Los estudiantes frecuentemente ignoran este aspecto pensando que solo importan los datos o las ideas, sin entender que la forma comunica tanto como el contenido.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Identifica y analiza contraargumentos en textos argumentativos
**Context:** Discusión sobre el uso de mascotas en universidades colombianas

### Enunciado
Lee el siguiente texto:

"TITLE: Por qué las universidades deberían permitir mascotas en sus campus

La presencia de mascotas en entornos universitarios ha demostrado beneficios terapéuticos. Sin embargo, algunos argumentan que esto podría generar problemas de higiene y alergias. Otros mencionan el riesgo de accidentes con animales grandes.

No obstante, estudios de universidades como Texas A&M demuestran que con políticas adecuadas de registro, vacunación obligatoria y áreas design