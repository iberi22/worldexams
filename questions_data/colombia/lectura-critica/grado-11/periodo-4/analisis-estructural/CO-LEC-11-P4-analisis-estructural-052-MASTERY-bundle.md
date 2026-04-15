<think>
The user wants me to generate exactly 20 multiple-choice questions in the style of ICFES Saber 11 exam for Colombian state exams. The topic is "analisis-estructural" (structural analysis) for Critical Reading (Lectura Crítica), grade 11, period 4.

Let me follow the format exactly as specified:

1. I need to include the YAML frontmatter
2. Then 20 questions with progressive difficulty (D3-D4 for 1-4, D5-D6 for 5-10, D7-D8 for 11-16, D9-D10 for 17-20)
3. Each question needs: ID, Bloom level, ICFES competency, Context, Enunciado, Options (A, B, C, D with [x] on correct), Explicación Pedagógica
4. The correct answer should be marked with [x]
5. Include feedback for why distractors are plausible/errors

Let me create these 20 questions focusing on structural analysis in critical reading - this typically involves understanding text organization, coherence devices, discourse markers, paragraph structure, thesis-antecedent relationships, etc.

I need to make sure:
- Each question has unique ID with v1, v2, etc.
- Difficulty levels progress
- Colombian contexts
- Realistic student errors as distractors
- ICFES-style wording
- No "todas las anteriores" or "ninguna de las anteriores"

Let me generate these questions:

</think>

---
id: "CO-LEC-11-P4-analisis-estructural-052-MASTERY"
country: "colombia"
grado: 11
asignatura: "lectura-critica"
tema: "analisis-estructural"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 52
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T17:59:39.849460"
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

## Question 1 (Variant Basic - Difficulty 3)

**ID:** `CO-LEC-11-P4-analisis-estructural-052-MASTERY-v1`
**Bloom:** Understand
**ICFES:** Interpretar señales linguísticas en la organización textual
**Context:** Análisis de columnas de opinión en medios colombianos

### Enunciado
En el siguiente fragmento de una columna de opinión aparecida en El Tiempo, la expresión "Por otro lado" cumple la función de:

"La economía colombiana ha mostrado signos de recuperación tras la pandemia. Sin embargo, persisten las desigualdades regionales. **Por otro lado**, el sector tecnológico ha experimentado un crecimiento sostenido."

### Options
- [ ] A) Introducir un ejemplo que confirma la tesis principal <!-- feedback: "Por otro lado" no introduce ejemplos, sino ideas que contrastan o complementan -->
- [ ] B) Conectar dos ideas que presentan una relación de contraste o adición <!-- feedback: Correcto, pero se debe reconocer que la relación específica es de adición de información complementaria -->
- [x] C) Señalar una relación de adición complementaria entre la situación económica y el auge tecnológico <!-- feedback: La expresión funciona como marcador discursivo que introduce una información que complementa o suma a lo anterior -->
- [ ] D) Indicar una relación de causa-efecto entre ambos apartados <!-- feedback: No hay relación causal explícita; el marcador indica adición, no causalidad -->

### Explicación Pedagógica
El marcador discursivo "Por otro lado" funciona como elemento de cohesión textual que señala adición de información complementaria o contrastante. Los estudiantes frecuentemente confunden su función con la de introducir ejemplos o relaciones causales. La comprensión de marcadores es fundamental para el análisis estructural de textos argumentativos.

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-LEC-11-P4-analisis-estructural-052-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Identificar la organización explícita de la información en un texto
**Context:** Editoriales de prensa colombiana sobre políticas públicas

### Enunciado
En el siguiente texto, ¿qué función cumple la primera oración del tercer párrafo?

"El cambio climático representa uno de los desafíos más urgentes para Colombia. El gobierno ha implementado nuevas políticas de reforestación. **Estas medidas han sido cuestionadas por expertos del sector ambiental, quienes argumentan que los recursos asignados son insuficientes.** Sin embargo, el Ministerio de Ambiente defiende su gestión."

### Options
- [ ] A) Presentar la tesis principal del texto completo <!-- feedback: La tesis se enunció en el primer párrafo -->
- [x] B) Introducir un contraargumento que será refutado posteriormente <!-- feedback: El párrafo presenta una postura contraria (cuestionamiento de expertos) que el texto se dispône a refutar con la última oración -->
- [ ] C) Concluir el argumento desarrollado en los párrafos anteriores <!-- feedback: La conclusión aparece en la última oración del párrafo -->
- [ ] D) Ilustrar con un ejemplo la tesis inicial sobre el cambio climático <!-- feedback: No es un ejemplo, sino una presentación de posiciones contrapuestas -->

### Explicación Pedagógica
La estructura argumentativa típica presenta primero una tesis, luego contraargumentos y finalmente una refutación.识别 esta estructura permite comprender la postura del autor. El error común es no distinguir entre contraargumentos y conclusiones, o confundir ejemplos con contraargumentos.

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-LEC-11-P4-analisis-estructural-052-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Reconocer la estructura subyacente en textos de diferente naturaleza
**Context:** Artículo de divulgación científica en revista Semana

### Enunciado
La siguiente información aparece en un artículo sobre inteligencia artificial en Colombia:

"Los departamentos de Antioquia y Valle del Cauca concentran el 65% de las startups de tecnología del país. Bogotá representa el 40% restante. Esta concentración geográfica plantea interrogantes sobre equidad en el acceso a oportunidades."

La oración final mantiene relación estructural con las anteriores mediante:

### Options
- [ ] A) Un conector causal ("por lo tanto") aunque no esté explícito <!-- feedback: La conclusión no se deriva causalmente de los datos, sino que plantea una reflexión -->
- [ ] B) Un conector adversativo ("sin embargo") aunque no esté explícito <!-- feedback: No hay relación de contraste, sino de consecuencia interpretativa -->
- [x] C) Una relación de premisa a conclusión inferida <!-- feedback: Los datos numéricos sirven como premisa y la pregunta final es una conclusión que se infiere de ellos -->
- [ ] D) Una relación de ejemplo a regla general <!-- feedback: Los datos no ejemplifican una regla, sino que constituyen la evidencia para una inferencia -->

### Explicación Pedagógica
La estructura lógica de Premisa-Conclusión no siempre requiere conectores explícitos. Los estudiantes deben inferir las relaciones semánticas basadas en el contenido. Este tipo de pregunta evalúa la capacidad de reconocer relaciones argumentativas implícitas.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-LEC-11-P4-analisis-estructural-052-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Deducir relaciones entre partes de un texto mediante la organización explícita
**Context:** Ensayo académico sobre educación en Colombia

### Enunciado
En un ensayo sobre la crisis de la educación pública, el autor presenta la siguiente secuencia de argumentos:

1. "Los indicadores de calidad educativa han disminuido en los últimos cinco años."
2. "El gasto público por estudiante se ha reducido en un 15%."
3. "La carrera docente ha perdido atractivo para nuevos profesionales."

La relación lógica entre estas tres afirmaciones es de:

### Options
- [ ] A) Independencia, ya que cada afirmación presenta datos no relacionados entre sí
- [ ] B) Contraste, porque los datos muestran situaciones opuestas <!-- feedback: No hay oposición entre los datos, sino una cadena lógica de causalidad -->
- [x] C) Causa-efecto encadenado, donde la reducción del gasto explica la pérdida de atractivo y ambos factores contribuyen a la disminución de indicadores <!-- feedback: Hay una cadena causal implícita: menos gasto → menos atractivo profesional → peor calidad -->
- [ ] D) Complementariedad simple, donde cada dato suma información sin relación causal <!-- feedback: Existe una relación causal evidente que los estudiantes no suelen identificar -->

### Explicación Pedagógica
El reconocimiento de cadenas causales implícitas es esencial para la comprensión de textos argumentativos. Frecuentemente, los estudiantes no logran conectar información que tiene relaciones causales no explícitas con conectores.

---

## Question 5 (Variant Medium - Difficulty 5)

**ID:** `CO-LEC-11-P4-analisis-estructural-052-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Evaluar la coherencia y cohesión en textos de mediana complejidad
**Context:** Carta al director en El Espectador sobre política habitacional

### Enunciado
Una lectora escribe al periódico:

"He observado con preocupación cómo el programa de vivienda social en Medellín ha dejado de lado a miles de familias de estratos 2 y 3. **En primer lugar**, los criterios de selección no son transparentes. **Además**, los tiempos de espera se han extendido a más de cinco años. **En consecuencia**, muchas familias han recurrido a soluciones informales que aumentan el riesgo de asentamientos irregulares. **Por todo lo anterior**, solicito al gobierno municipal una revisión profunda de los criterios de asignación."

La fuerza argumentativa del texto depende principalmente de:

### Options
- [ ] A) La cantidad de datos estadísticos presentados <!-- feedback: El texto no presenta datos numéricos, sino testimonios y afirmaciones -->
- [ ] B) La progresión lógica que construye un caso acumulado contra la política actual <!-- feedback: Correcto, pero incomplete; falta identificar el recurso específico de construcción -->
- [x] C) El uso de marcadores discursivos que crean una progresión acumulativa de evidencias <!-- feedback: Los marcadores "en primer lugar", "además", "en consecuencia" y "por todo lo anterior" construyen una escalada argumentativa -->
- [ ] D) El tono emotivo que busca generar compasión en el lector <!-- feedback: El texto tiene un tono principalmente racional y demandas concretas, no emotivo -->

### Explicación Pedagógica
La fuerza argumentativa se construye mediante marcadores discursivos que señalizan la progresión del razonamiento.识别 esta técnica permite evaluar la solidez de los argumentos. Los estudiantes tienden a enfocarse en datos o emociones, pasando por alto la arquitectura discursiva.

---

## Question 6 (Variant Medium - Difficulty 5)

**ID:** `CO-LEC-11-P4-analisis-estructural-052-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Identificar la intención comunicativa a partir de la organización textual
**Context:** Entrevista en revista Cambio sobre problemática minera en Cesar

### Enunciado
En una entrevista sobre el impacto ambiental de la minería de carbón en el Cesar, el entrevistado afirma:

"Yo no soy antimina, pero los efectos sobre las fuentes de agua de los campesinos de la región han sido devastadores. **Primero**, las empresas desviaron los causes naturales. **Segundo**, la disposición de residuos tóxicos ha contaminado suelos. **Y tercero**, las comunidades han perdido sus medios de subsistencia sin compensación adecuada."

La estructura del discurso del entrevistado evidencia una intención de:

### Options
- [ ] A) Presentar una postura equilibrada que valide la actividad minera <!-- feedback: Aunque dice "no soy antimina", la estructura后半 es claramente crítica -->
- [ ] B) Atacar directamente a las empresas mineras sin procurar objetividad <!-- feedback: El lenguaje no es atacante, sino documental y acumulativo -->
- [x] C) Construir una argumentación aparentemente objetiva que desmiente su posición inicial de equilibrio <!-- feedback: La estructura de lista (primero, segundo, tercero) presenta evidencias que contradicen la apariencia de neutralidad inicial -->
- [ ] D) Sugerir alternativas sin criticar la actividad extractiva <!-- feedback: No hay propuesta de alternativas en el discurso -->

### Explicación Pedagógica
La técnica de "análisis estructural de la discrepancia" permite identificar cómo la organización discursiva puede contradecir las intenciones declaradas. La acumulación de evidencias en formato de lista crea un efecto retórico de objetividad que refuerza la crítica implícita.

---

## Question 7 (Variant Medium - Difficulty 6)

**ID:** `CO-LEC-11-P4-analisis-estructural-052-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Analizar la relación entre estructura formal y propósito comunicativo
**Context:** Artículo de investigación en revista Cienciay Nación sobre violencia electoral

### Enunciado
En un artículo académico sobre violencia electoral en regiones de Colombia, el autor utiliza la siguiente estructura: Introducción → Contexto histórico → Evidencias empíricas → Análisis de causas → Conclusiones → Recomendaciones de política pública.

Esta organización estructurada indica que el propósito del texto es:

### Options
- [ ] A) Narrar una historia de eventos violentos para generar indignación <!-- feedback: La estructura no es narrativa, sino analítica -->
- [ ] B) Defender una única postura política sobre el tema <!-- feedback: La estructura incluye recomendación pero no defendimiento de una postura única -->
- [x] C) Presentar un análisis sistemático que busca fundamentar recomendaciones de política pública basadas en evidencia <!-- feedback: La progresión lógica de evidencia a recomendaciones indica un propósito propositivo y fundamentado -->
- [ ] D) Comparar diferentes estudios sobre el tema sin emitir juicio <!-- feedback: El texto presenta análisis propio, no comparación de estudios -->

### Explicación Pedagógica
La estructura de un texto académico refleja su propósito comunicativo. Una progresión de contexto a evidencia a recomendaciones indica un texto con propósito propositivo. Los estudiantes deben vincular forma y función comunicativa.

---

## Question 8 (Variant Medium - Difficulty 6)

**ID:** `CO-LEC-11-P4-analisis-estructural-052-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Evaluar la efectividad estructural de textos argumentativos
**Context:** Editorial de El Colombiano sobre educación ambiental en colegios

### Enunciado
Considere el siguiente fragmento de un editorial:

"Los jóvenes de hoy serán los encargados de enfrentar las consecuencias del cambio climático. **Por lo tanto**, es urgente que los colegios incluyan la educación ambiental como eje transversal del currículo. **De hecho**, países como Finlandia y Japón ya han implementado programas exitosos de este tipo. **Sin embargo**, algunos críticos argumentan que agregar más contenido al currículo sobrecargará a los estudiantes."

El editorial presenta una debilidad argumentativa en su estructura porque:

### Options
- [ ] A) Utiliza ejemplos internacionales que no son aplicables al contexto colombiano
- [x] B) El conectivo "sin embargo" introduce un contraargumento que debilita la urgencia sin refutarlo adecuadamente <!-- feedback: El texto presenta un contraargumento pero no ofrece una respuesta convincente, dejando la impresión de que la urgencia es cuestionable -->
- [ ] C) El razonamiento "por lo tanto" no se deriva lógicamente de la premisa sobre los jóvenes <!-- feedback: La inferencia sí es válida: si los jóvenes enfrentarán las consecuencias, entonces deben prepararse -->
- [ ] D) Los ejemplos de Finlandia y Japón no constituyen evidencia suficiente <!-- feedback: Los ejemplos son ilustrativos, no la base del argumento; el problema es la falta de refutación del contraargumento -->

### Explicación Pedagógica
Una debilidad estructural común en textos argumentativos es abandonar el contraargumento sin refutación, lo que genera una impresión de incompletitud. Los estudiantes deben identificar no solo qué se argumenta, sino qué falta en la argumentación.

---

## Question 9 (Variant Medium - Difficulty 6)

**ID:** `CO-LEC-11-P4-analisis-estructural-052-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Describir la estructura subyacente en textos que combinan elementos narrativos y argumentativos
**Context:** Crónica en El País de Cali sobre violencia juvenil

### Enunciado
En una crónica sobre la violencia juvenil en Cali, el periodista estructura el texto así:

- Parágrafo 1: Descripción de un incidente específico de violencia
- Parágrafo 2: Contexto del barrio donde ocurrió el incidente
- Parágrafo 3: Datos estadísticos sobre violencia juvenil en la ciudad
- Parágrafo 4: Entrevista con un exintegrante de pandilla que narra su historia
- Parágrafo 5: Reflexión del periodista sobre las causas estructurales del problema

Esta estructura combina elementos narrativos y argumentativos para:

### Options
- [ ] A) Presentar información objetiva sin intervención del autor en el análisis <!-- feedback: Hay reflexión personal en el último párrafo, lo cual contradice la objetividad -->
- [ ] B) Entretener al lector con historias personales antes de presentar datos <!-- feedback: El propósito no es entretener, sino contextualizar datos con historias -->
- [x] C) Humanizar el problema estadístico mediante casos particulares que ilustran las estadísticas <!-- feedback: La estructura permite que las estadísticas y la historia personal se iluminen mutuamente, creando un argumento más potente -->
- [ ] D) Desviar la responsabilidad del Estado hacia factores individuales <!-- feedback: La reflexión final apunta a causas estructurales, no individuales -->

### Explicación Pedagógica
La combinación de narrativa y argumentación es una técnica retórica que busca generar tanto comprensión intelectual como empatía emocional. El análisis estructural debe identificar cómo ambas dimensiones se complementan para fortalecer el mensaje.

---

## Question 10 (Variant Medium - Difficulty 6)

**ID:** `CO-LEC-11-P4-analisis-estructural-052-MASTERY-v10`
**Bloom:** Analyze
**ICFES:** Identificar las funciones discursivas de los elementos paratextuales
**Context:** Artículo de divulgación en portafolio sobre economía naranja

### Enunciado
En un artículo sobre la economía naranja en Colombia, el autor incluye el siguiente recuadro al margen del texto principal:

**Datos clave:**
- El sector cultural aporta el 3.2% del PIB nacional
- Employ more than 600,000 direct jobs
- Crecimiento del 7% anual en los últimos tres años

Este elemento paratextual cumple la función de:

### Options
- [ ] A) Resumir la conclusión final del artículo <!-- feedback: El recuadro presenta datos, no conclusiones -->
- [x] B) Evidencia cuantitativa que respalda los argumentos presentados en el cuerpo del texto <!-- feedback: Los datos funcionan como evidencia de soporte para las afirmaciones del texto principal -->
- [ ] C) Contraargumento a la postura del autor del artículo <!-- feedback: Los datos son positivos, no contradictorios con el argumento del autor -->
- [ ] D) Introduce un tema nuevo que el texto principal no aborda <!-- feedback: El recuadro amplía datos sobre el mismo tema del artículo -->

### Explicación Pedagógica
Los elementos paratextuales (recuadros, gráficos, citas destacadas) cumplen funciones discursivas específicas. El reconocimiento de su propósito permite una comprensión más profunda del texto. Los estudiantes frecuentemente ignoran estos elementos al analizar la estructura argumentativa.

---

## Question 11 (Variant Advanced - Difficulty 7)

**ID:** `CO-LEC-11-P4-analisis-estructural-052-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Evaluar la coherencia global de un texto complejo
**Context:** Editorial de El Tiempo sobre reforma a la salud

### Enunciado
Considere la siguiente estructura de un editorial sobre la reforma al sistema de salud colombiano:

I. Se presenta una tesis: "La reforma proposed by el gobierno presenta fallas estructurales"
II. Se presentan tres evidencias de las fallas
III. Se presentan dos counterarguments de quienes defienden la reforma
IV. Se responde a los counterarguments
V. Se reitera la tesis inicial con mayor fuerza

Esta estructura corresponde a un patrón argumentativo clásico de:

### Options
- [ ] A) Silogismo deductivo donde la tesis se demuestra mediante premisas <!-- feedback: No hay deducción, hay un proceso de verificación y confirmación de la tesis -->
- [x] B) Tesis-antítesis-síntesis que busca validar la tesis inicial tras considerar objeciones <!-- feedback: El movimiento de tesis → evidencias → contraargumentos → refutación → reafirmación corresponde al modelo hegeliano de tesis-antítesis-síntesis -->
- [ ] C) Argumentación por autoridad que cita fuentes expertas <!-- feedback: No hay cite de autoridades, hay análisis de evidencias y refutación de objeciones -->
- [ ] D) Razonamiento inductivo que parte de casos particulares hacia una generalización <!-- feedback: El texto parte de una tesis general y la confirma, no induce desde casos -->

### Explicación Pedagógica
El modelo de tesis-antítesis-síntesis es fundamental en la comprensión de textos argumentativos académicos y de opinión. La estructura permite presentar una postura de manera sólida al anticipar y refutar objeciones. Los estudiantes deben reconocer este patrón para evaluar la solidez de los argumentos.

---

## Question 12 (Variant Advanced - Difficulty 7)

**ID:** `CO-LEC-11-P4-analisis-estructural-052-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Juzgar la pertinencia y suficiencia de las evidencias presentadas en un texto
**Context:** Artículo de investigación en Bulletin de la Academia de Medicina sobre telemedicina

### Enunciado
En un artículo académico sobre la implementación de la telemedicina en zonas rurales de Colombia, el autor presenta:

1. Datos de 15 centros de salud que implementaron telemedicina
2. Encuestas a 200 pacientes sobre satisfacción con el servicio
3. Entrevistas a 30 profesionales de la salud
4. Comparación con datos de países similares en Latinoamérica

El artículo presenta una debilidad en la estructura argumentativa porque:

### Options
- [ ] A) Utiliza demasiados tipos de evidencia, lo que confunde al lector <!-- feedback: La diversidad de evidencia es generalmente un punto fuerte, no una debilidad -->
- [ ] B) Omite completamente datos cuantitativos sobre resultados de salud <!-- feedback: Los datos de los centros y las encuestas son cuantitativos -->
- [ ] C) Presenta evidencia cuantitativa y cualitativa insuficiente para generalizar sobre todo el país sin reconocer las limitaciones del estudio <!-- feedback: Con 15 centros y 200 pacientes, más una comparación internacional, el estudio tiene limitaciones que deben reconocerse explícitamente para no sobregeneralizar -->
- [ ] D) No incluye la perspectiva de los pacientes rurales que reciben el servicio <!-- feedback: Las encuestas a 200 pacientes precisamente dan esa perspectiva -->

### Explicación Pedagógica
El análisis estructural debe evaluar si la evidencia presentada es suficiente y pertinente para las conclusiones alcanzadas. Un estudio con muestra limitada no puede generalizar sin reconocer sus alcances. Esta habilidad es fundamental para la evaluación crítica de textos académicos.

---

## Question 13 (Variant Advanced - Difficulty 7)

**ID:** `CO-LEC-11-P4-analisis-estructural-052-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Examinar las estrategias discursivas en textos multimodales
**Context:** Reportaje multimedia sobre violencia de género publicado por El Espectador

### Enunciado
En un reportaje digital sobre violencia de género en Colombia, el periodista complementa el texto escrito con:

- Videos de témoignages de víctimas
- Infografía con datos de violencia por departamento
- Línea de tiempo interactiva de hitos legislativos
- Audio de declaraciones de funcionarios públicos

La estructura multimodal del reportaje busca principalmente:

### Options
- [ ] A) Diversificar el contenido para atraer más publicidad <!-- feedback: El propósito comunicativo es periodístico, no comercial -->
- [ ] B) Presentar únicamente evidencia emocional para generar compasión <!-- feedback: También hay datos objetivos (infografía, línea de tiempo) -->
- [x] C) Combinar evidencia emocional y objetiva para generar tanto empatía como comprensión racional del problema <!-- feedback: Los vídeos generan empatía, mientras que la infografía y datos proporcionan comprensión racional; la multimodalidad sirve para atacar ambos frentes -->
- [ ] D) Cumplir con los estándares de redacción digital sin añadir valor real <!-- feedback: La estructura multimodal tiene un propósito comunicativo claro -->

### Explicación Pedagógica
Los textos multimodales combinan diferentes recursos semióticos para cumplir propósitos comunicativos complejos. El análisis estructural en estos casos debe considerar cómo los diferentes elementos se complementan para crear un efecto comunicativo particular.

---

## Question 14 (Variant Advanced - Difficulty 8)

**ID:** `CO-LEC-11-P4-analisis-estructural-052-MASTERY-v14`
**Bloom:** Evaluate
**ICFES:** Formular juicios críticos sobre la organización textual y sus efectos
**Context:** Ensayo en revista dinero sobre desigualdad económica

### Enunciado
En un ensayo sobre desigualdad económica en Colombia, el autor estructura el texto en cinco secciones sin subtítulos:

Sección 1: Contextualiza el problema históricamente (párrafos 1-3)
Sección 2: Presenta datos estadísticos sobre la desigualdad (párrafos 4-6)
Sección 3: Narra tres historias de familias afectadas (parrés 7-10)
Sección 4: Analiza las causas estructurales (párrafos 11-13)
Sección 5: Proponer soluciones políticas (párrafos 14-16)

La ausencia de subtítulos y la fusión de secciones en un texto continuo representa:

### Options
- [ ] A) Un error de edición que dificulta la lectura del texto <!-- feedback: La falta de subtítulos puede ser una decisión estilística deliberada -->
- [ ] B) Una estrategia para que el lector descubra la progresión argumentativa por sí mismo <!-- feedback: Puede ser parte de la estrategia, pero no es lo más notable -->
- [ ] C) Una decisión estilística que busca crear un flujo discursivo continuo que refuerza la conexión entre problemas históricos, datos, historias humanas, análisis y propuestas <!-- feedback: La estructura sin interrupciones busca crear una narrativa fluida donde las transiciones entre contexto, evidencia, historias y propuestas se perciban como parte de un continuum inseparable -->
- [ ] D) Una omisión grave que impide al lector identificar las partes clave del argumento <!-- feedback: La estructura es identificable aunque no tenga subtítulos -->

### Explicación Pedagógica
Las decisiones formales en la presentación de un texto (uso o ausencia de subtítulos, разделов) son estrategias comunicativas que afectan la experiencia de lectura y la recepción del mensaje. El análisis debe considerar estas decisiones como parte integral del propósito comunicativo.

---

## Question 15 (Variant Advanced - Difficulty 8)

**ID:** `CO-LEC-11-P4-analisis-estructural-052-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Evaluar la efectividad de las estrategias persuasivas en textos de opinión
**Context:** Columna de opinión en El Colombiano sobre política educativa

### Enunciado
En una columna sobre la falta de docentes en áreas rurales, el columnista utiliza la siguiente estructura:

1. Anécdota personal de su experiencia como docente rural hace 20 años
2. Datos sobre la actual escasez de docentes en zonas rurales
3. Comparación con la situación de otros países de la región
4. Entrevista con un docente actual que narra sus dificultades
5. Llamado a la acción para mejorar las condiciones laborales docentes

El columnista inicia con una anécdota personal en lugar de presentar directamente los datos. Esta decisión estructural tiene como propósito:

### Options
- [x] A) Establecer credibilidad y conexión emocional con el lector antes de presentar evidencia racional <!-- feedback: La