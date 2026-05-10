<think>
The user wants me to generate exactly 20 questions in markdown format for ICFES Saber 11 exam, specifically for Reading Critical (Lectura Crítica) on the topic of argumentative texts (textos argumentativos), grade 11, period 2.

Let me follow the strict format requirements:
- Include the YAML frontmatter block at the start
- 20 questions with progressive difficulty
- Questions 1-4: D3-D4 (Difficulty 3-4)
- Questions 5-10: D5-D6 (Difficulty 5-6)
- Questions 11-16: D7-D8 (Difficulty 7-8)
- Questions 17-20: D9-D10 (Difficulty 9-10)
- Each question must have: ID, Bloom level, ICFES competency, Context, Enunciado, 4 options (A,B,C,D), correct answer marked with [x], incorrect options have feedback, Explicación Pedagógica
- Context must be modern and relevant to Colombia
- Plausible distractors based on common student errors
- No "all of the above" or "none of the above" options
- Output ONLY the markdown content

Let me create this content now.

I need to be careful:
1. IDs must follow pattern CO-LEC-11-P2-textos-argumentativos-041-MASTERY-vN where N is question number
2. Bloom taxonomy levels
3. ICFES competencies for reading critical
4. Colombian context
5. Progressive difficulty

Let me start generating:

Questions 1-4 (D3-D4):
1. Basic identification of argument elements
2. Basic understanding of claim
3. Basic application of argument recognition
4. Basic analysis of simple arguments

Questions 5-10 (D5-D6):
5. Understanding thesis statements
6. Analyzing evidence
7. Evaluating simple arguments
8. Comparing arguments
9. Identifying bias in arguments
10. Understanding rhetorical strategies

Questions 11-16 (D7-D8):


11. Complex argument analysis
12. Evaluating logical fallacies
13. Comparing competing arguments
14. Assessing evidence quality
15. Analyzing persuasive techniques
16. Evaluating author positioning

Questions 17-20 (D9-D10):
17. Synthesizing multiple arguments
18. Critiquing complex argumentative structures
19. Evaluating multi-source arguments
20. Creating and defending original arguments

Now I'll write all 20 questions following the template precisely.

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
  timestamp: "2026-04-16T01:46:50.989214"
  prompt_version: "v2-direct"
quality_status: "UNREVISED"
generation_status: "RAW"
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

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Identifica elementos básicos del texto argumentativo
**Context:** Debate sobre educación virtual en Colombia post-pandemia

### Enunciado
En el siguiente fragmento: "El aprendizaje virtual llegó para quedarse en Colombia, pues ofrece flexibilidad y acceso a zonas rurales. Por tanto, las instituciones educativas deben fortalecer sus plataformas digitales." El elemento que sustenta la postura del autor se denomina:

### Options
- [ ] A) Tesis <!-- feedback: La tesis es la postura principal, no el sustento -->
- [x] B) Argumento <!-- feedback: Correcto. El argumento son las razones o evidencias que sustentan la tesis -->
- [ ] C) Conclusión <!-- feedback: La conclusión es el cierre del razonamiento, no el sustento -->
- [ ] D) Contraargumento <!-- feedback: El contraargumento presenta una posición opuesta, aquí solo hay un argumento que sostiene la tesis -->

### Explicación Pedagógica
El argumento es la estructura fundamental que sostiene una tesis. En este caso, "ofrece flexibilidad y acceso a zonas rurales" es la razón que apoya la afirmación principal. Los estudiantes frecuentemente confunden argumento (las razones) con tesis (la postura), o confunden argumento con la conclusión final.

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Comprende la intención comunicativa en textos argumentativos
**Context:** Artículo de periódico sobre regulacion de plataformas de streaming en Colombia

### Enunciado
Cuando un autor escribe: "Resulta evidente que Netflix y otras plataformas deberían pagar impuestos como cualquier empresa colombiana", la palabra "evidente" cumple una función persuasiva porque:

### Options
- [ ] A) Proporciona datos estadísticos verificables <!-- feedback: "Evidente" no es un dato, es una valoración subjetiva -->
- [ ] B) Busca que el lector acepte la premisa sin cuestionarla <!-- feedback: Correcto. "Evidente" elimina el espacio para el cuestionamiento, haciendo que la afirmación parezca incuestionable -->
- [ ] C) Indica que existe consenso universal sobre el tema <!-- feedback: No hay evidencia de que exista consenso, es solo una estrategia retórica -->
- [ ] D) Demuestra objetividad del autor frente al tema <!-- feedback: El uso de "evidente" es subjetivo y no objetivo -->

### Explicación Pedagógica
En textos argumentativos, los autores utilizan marcadores discursivos como "evidente", "obvio", "indudable" para presentar opiniones como hechos. Este recurso intenta evitar el análisis crítico del lector al presentar la postura como una verdad incuestionable en lugar de una posición argumentable.

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Diferencia entre hecho y opinión en textos argumentativos
**Context:** Debate sobre legalización de vehículos eléctricos en Bogotá

### Enunciado
¿Cuál de las siguientes afirmaciones presenta UNA OPINIÓN y no un hecho?

### Options
- [ ] A) "Bogotá tiene 1.7 millones de vehículos registrados según el Registro Único Nacional de Tránsito" <!-- feedback: Este es un dato verificable con fuente oficial -->
- [ ] B) "En 2023 se vendieron 3.200 vehículos eléctricos en Colombia" <!-- feedback: Dato estadístico verificable -->
- [ ] C) "Los vehículos eléctricos son demasiado costosos para la clase media bogotana" <!-- feedback: Correcto. La palabra "demasiado" indica una valoración subjetiva sobre qué es un precio aceptable, es una interpretación personal -->
- [ ] D) "La Universidad Nacional reveló que el aire en Bogotá empeoró un 12% en 2023" <!-- feedback: Afirmación basada en estudio institucional con datos verificables -->

### Explicación Pedagógica
La diferencia entre hecho y opinión es fundamental en lectura crítica. Los hechos pueden verificarse objetivamente; las opiniones implican juicios de valor subjetivos. La frase "demasiado costosos" contiene un juicio de valor implícito que depende de la perspectiva económica de cada persona.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Identifica la estructura básica de un texto argumentativo
**Context:** Editorial de revista Semana sobre violencia en el fútbol colombiano

### Enunciado
En un texto argumentativo sobre la violencia en los estadios colombianos, el autor presenta datos del Deportivo Pasto: "En 2024 se reportaron 15 incidentes violentos, la cifra más alta en cinco años." Posteriormente afirma: "Por esto, el gobierno debe implementar castigos más severos." Esta estructura corresponde a:

### Options
- [x] A) Premisa (dato) → Conclusión (postura) <!-- feedback: Correcto. Los datos sirven como premisa que lleva a una conclusión o acción propuesta -->
- [ ] B) Tesis → Contraargumento → Refutación <!-- feedback: No hay presentación de argumento opuesto ni refutación -->
- [ ] C) Introducción → Desarrollo → Cierre <!-- feedback: Estructura muy general que no especifica la relación lógica entre premisas y conclusión -->
- [ ] D) Causa → Efecto → Solución <!-- feedback: Aunque hay una relación causal implícita, la estructura principal es premisa-conclusión -->

### Explicación Pedagógica
La estructura básica del texto argumentativo presenta evidencia (premisa) que lleva a una conclusión o propuesta. Los datos sobre incidentes violentos sirven como premisa para sostener la conclusión sobre castigos más severos. Los estudiantes deben identificar cómo las premisas sostienen lógicamente las conclusiones.

---

## Question 5 (Variant Basic - Difficulty 5)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v5`
**Bloom:** Understand
**ICFES:** Identifica la tesis central en un texto argumentativo
**Context:** Artículo de El Tiempo sobre corrupción en contratos públicos

### Enunciado
Lee el siguiente fragmento: "El sistema de contratación pública en Colombia ha fallado sistemáticamente. Los casos de Vitalogic y Mintic lo demuestran. Los controles existentes son ineficaces porque permiten que los mismos actores reincidan. Por eso,，我们需要una auditoría ciudadana permanente." La tesis principal del texto es:

### Options
- [ ] A) Los casos Vitalogic y Mintic demuestran corrupción <!-- feedback: Esto es una premisa o evidencia, no la tesis central -->
- [ ] B) Los controles actuales son ineficaces <!-- feedback: También es una premisa que sustenta la tesis -->
- [x] C) Se necesita implementar una auditoría ciudadana permanente <!-- feedback: Correcto. La tesis es la postura principal que el autor defiende. Las demás oraciones son premisas que la sustentan -->
- [ ] D) El sistema de contratación ha fallado sistemáticamente <!-- feedback: Este es el diagnóstico inicial, no la propuesta central -->

### Explicación Pedagógica
La tesis es la afirmación principal que el autor defende. Aunque el texto presenta un diagnóstico (el sistema falló, los controles son ineficaces), la propuesta final ("auditoría ciudadana permanente") es lo que el autor realmente quiere defender. En textos argumentativos, la tesis suele aparecer al final como la solución propuesta.

---

## Question 6 (Variant Basic - Difficulty 5)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Analiza las relaciones entre premisas y conclusiones
**Context:** Debates sobre el uso del celular en clases en Colombia

### Enunciado
"Un estudio de la OCDE reveló que los estudiantes colombianos usan sus celulares en clase un promedio de 45 minutos diarios. Esto demuestra que la educación en Colombia está en crisis." ¿Cuál es la debilidad principal de este argumento?

### Options
- [ ] A) El estudio de la OCDE no es confiable <!-- feedback: No se cuestiona la veracidad del estudio -->
- [x] B) No hay relación lógica entre el tiempo de uso del celular y la calidad educativa <!-- feedback: Correcto. Usar celulares no implica necesariamente una crisis educativa. Faltan conexiones lógicas entre premisa y conclusión -->
- [ ] C) 45 minutos no es un tiempo excesivo de uso <!-- feedback: Cuestiona el dato pero no la estructura del argumento -->
- [ ] D) La OCDE no tiene autoridad para opinar sobre educación colombiana <!-- feedback: La autoridad no es el problema, sino la falta de relación lógica -->

### Explicación Pedagógica
Este argumento presenta una falacia lógica: saltar de un dato (uso de celulares) a una conclusión extrema (crisis educativa) sin establecer conexiones causales. El autor asume que más uso de celulares significa automáticamente peor educación, lo cual requiere论证 adicional. Esta es una debilidad argumentativa común.

---

## Question 7 (Variant Basic - Difficulty 6)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Evalúa la validez de las evidencias en textos argumentativos
**Context:** Artículo sobre seguridad alimentaria en Colombia

### Enunciado
El autor afirma: "Los cultivos transgenicocs son la solución al hambre en Colombia, ya que permiten rendimientos 30% superiores." Para evaluar críticamente este argumento, ¿cuál pregunta es MÁS relevante?

### Options
- [ ] A) ¿Los cultivos transgenéricos son legales en Colombia? <!-- feedback: Pregunta sobre legalidad, no sobre la validez del argumento sobre el hambre -->
- [x] B) ¿Los rendimientos superiores garantizan acceso a alimentos para poblaciones vulnerables? <!-- feedback: Correcto. El argumento asume que mayor producción significa解决了饥饿问题，但实际上获取和分配才是关键 -->
- [ ] C) ¿Cuántos países usan cultivos transgenéricos? <!-- feedback: Pregunta sobre popularidad, no sobre efectividad -->
- [ ] D) ¿Quién financió las investigaciones sobre rendimientos? <!-- feedback: Interesante pero secundario; primero debe evaluarse la lógica del argumento -->

### Explicación Pedagógica
Un argumento puede tener datos verdaderos pero conclusiones inválidas. Rendimientos superiores no garantizan acceso a alimentos si existen problemas de distribución, pobreza o infraestructura. La lectura crítica requiere evaluar no solo los datos sino cómo se conectan lógicamente con la conclusión.

---

## Question 8 (Variant Basic - Difficulty 6)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v8`
**Bloom:** Evaluate
**ICFES:** Evalúa estrategias persuasivas en textos argumentativos
**Context:** Debate sobre explotación minera en la Serranía de la Chiriquiquí

### Enunciado
En un texto que busca evitar la minería en Chiriquiquí, el autor escribe: "Si permitimos la minería en este ecosistema único,将是 el fin de miles de especies." Esta estrategia argumentativa se denomina:

### Options
- [ ] A) Analogía <!-- feedback: No hay comparación con otra situación similar -->
- [ ] B) Metáfora <!-- feedback: No hay uso de lenguaje figurado comparativo -->
- [x] C) Falsa dicotomía (falso dilema) <!-- feedback: Correcto. Se presenta solo dos opciones extremas (minería = fin de especies) omitiendo alternativas intermedias como minería sostenible o zonas de exclusión -->
- [ ] D) Generalización apresurada <!-- feedback: Aunque hay algo de esto, el problema principal es presentar solo dos opciones como si fueran las únicas -->

### Explicación Pedagógica
La falsa dicotomía presenta solo dos opciones cuando en realidad existen múltiples posibilidades. En este caso, se ignoran alternativas como tecnologías mineras sostenibles, zonas de protección parcial, o monitoreo estricto. Los estudiantes frecuentemente no detectan cómo los argumentos eliminan artificialmente opciones intermedias.

---

## Question 9 (Variant Basic - Difficulty 6)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Identifica sesgos y perspectivas en textos argumentativos
**Context:** Artículo sobre transporte público en Medellín

### Enunciado
Un artículo publicado por la Cámara de Comercio de Medellín argumenta que "el metro ligero es la mejor opción de transporte para la ciudad". ¿Cuál sesgo potencial debería considerar el lector crítico?

### Options
- [ ] A) Sesgo de confirmación: busca solo evidencia que respalde decisiones ya tomadas <!-- feedback: Posible pero no suficiente; se requiere analizar la fuente específicamente -->
- [x] B) Sesgo institucional: favorece intereses de los comerciantes que financiaeron el estudio <!-- feedback: Correcto. La Cámara de Comercio representa intereses comerciales específicos, no necesariamente los de todos los ciudadanos -->
- [ ] C) Sesgo generacional: ignora necesidades de adultos mayores <!-- feedback: No hay evidencia de esto en el enunciado -->
- [ ] D) Sesgo tecnológico: solo considera opciones modernas <!-- feedback: No se puede inferir de la información dada -->

### Explicación Pedagógica
Identificar la fuente de un texto argumentativo es esencial para evaluar posibles sesgos. Una Cámara de Comercio representa intereses empresariales, por lo que su postura sobre transporte público podría estar sesgada hacia soluciones que beneficien la actividad comercial. El lector crítico debe preguntarse: ¿quién habla y qué intereses representa?

---

## Question 10 (Variant Basic - Difficulty 6)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Comprende la función de los contraargumentos en textos argumentativos
**Context:** Ensayo sobre la venta de tierras productivas a extranjeros en Colombia

### Enunciado
En un texto que defiende la venta de tierras a inversionistas extranjeros, el autor primero presenta el contraargumento: "Es cierto que existe el riesgo de que se approprien tierras estratégicas." ¿Cuál es la función rhetórica de incluir este contraargumento?

### Options
- [ ] A) Demostrar que el autor no tiene información suficiente <!-- feedback: Al contrario, anticipar contraargumentos demuestra solidez -->
- [ ] B) Hacer el texto más largo sin necesidad <!-- feedback: El contraargumento cumple una función retórica específica -->
- [x] C) Fortalecer su posición al mostrar que la conoce y refutarla <!-- feedback: Correcto. Anticipar y refutar contraargumentos demuestra que el autor ha considerado la opposing view y tiene respuestas, lo cual fortalece su credibilidad -->
- [ ] D) Confundir al lector sobre la verdadera postura del autor <!-- feedback: El objetivo es exactamente el opuesto: clarificar la postura refutando objeciones -->

### Explicación Pedagógica
La inclusión de contraargumentos en textos argumentativos es una estrategia retórica llamada "refutación anticipada". Al reconocer objeciones potenciales y responderlas, el autor demuestra que ha considerado múltiples perspectivas, lo cual fortalece su posición y su credibilidad ante el lector.

---

## Question 11 (Variant Basic - Difficulty 7)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Analiza la coherencia argumentativa en textos complejos
**Context:** Debate sobre regulación de redes sociales en el Congreso colombiano

### Enunciado
Un representante afirma: "Las fake news sobre COVID causaron muertes. Por lo tanto, el gobierno debe regular las redes sociales." Analizando este argumento, el error lógico principal es:

### Options
- [ ] A) Apelar a la emoción en lugar de la razón <!-- feedback: No hay un apelo emocional directo -->
- [ ] B) Usar datos falsos sobre muertes por COVID <!-- feedback: No se cuestiona la veracidad de los datos -->
- [x] C) Asumir que regular redes sociales es la única solución para prevenir noticias falsas <!-- feedback: Correcto. El argumento salta de "las fake news causan muertes" a "hay que regular redes" sin considerar alternativas como educación mediática, autorregulación de plataformas, o campañas de verificación -->
- [ ] D) Atacar a las redes sociales como medio de comunicación <!-- feedback: No hay un ataque al medio, sino una propuesta -->

### Explicación Pedagógica
Este argumento presenta una falacia de falso dilema: se asume que solo existe la opción de regular las redes sociales. Entre la regulación gubernamental y la inacción hay múltiples alternativas: educación crítica, plataformas que verifiquen información, responsabilidad individual del usuario, o incentivos para fuentes confiables.

---

## Question 12 (Variant Basic - Difficulty 7)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Evalúa la validez de fuentes en textos argumentativos
**Context:** Artículo sobre cambio climático en los Andes colombianos

### Enunciado
Un autor cit a: "Según un estudio de una fundación ambiental, los glaciares del Ruiz podrían desaparecer en 20 años." ¿Cuál aspecto debe evaluarse para determinar la credibilidad de esta fuente?

### Options
- [ ] A) Si la fundación tiene personalidad jurídica en Colombia <!-- feedback: La personería legal no garantiza validez científica -->
- [ ] B) Si el autor está de acuerdo con la conclusión del estudio <!-- feedback: La credibilidad de la fuente no depende del acuerdo del autor -->
- [x] C) Si la metodología del estudio es rigurosa y reproducible <!-- feedback: Correcto. La credibilidad de cualquier fuente depende de su rigor metodológico, no de su nombre o alineación ideológica -->
- [ ] D) Si la fundación ha sido mencionada en medios nacionales <!-- feedback: La cobertura mediática no valida científicamente un estudio -->

### Explicación Pedagógica
La evaluación de fuentes en lectura crítica va más allá de la reputación o popularidad. Una fuente confiable debe poder verificación metodológica: ¿cómo se recopilaron los datos? ¿La muestra es representativa? ¿Las conclusiones se derivan lógicamente de los resultados? Estudiantes frecuentemente confunden "fuente conocida" con "fuente confiable".

---

## Question 13 (Variant Basic - Difficulty 7)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Analiza estructuras argumentativas con evidencia estadística
**Context:** Debate sobre rendimiento académico en pruebas PISA en Colombia

### Enunciado
"Un aumentó del gasto en educación del 2% del PIB ha logrado que Colombia suba 15 puntos en PISA desde 2018. Por lo tanto, invertir más dinero es la mejor estrategia para mejorar la educación." ¿Cuál debilidadArgumentativa presenta este texto?

### Options
- [ ] A) Los datos del PIB no son oficiales <!-- feedback: No se cuestiona la fuente de los datos -->
- [ ] B) Las pruebas PISA solo miden matemáticas y lectura <!-- feedback: Conocimiento parcial del exam PISA, pero no es la debilidad principal -->
- [x] C) Asume correlación como causalidad: más gasto = mejores resultados sin considerar otras variables <!-- feedback: Correcto. No se puede afirmar que el aumento del gasto sea la causa de la mejora en PISA; pudieron influir otros factores como políticas pedagógicas, formación de docentes, o cambios en la muestra de estudiantes evaluados -->
- [ ] D) 15 puntos no es una mejora significativa en PISA <!-- feedback: El texto no define qué es "significativo"; es una valoración subjetiva -->

### Explicación Pedagógica
La confusión entre correlación y causalidad es una falacia lógica común. Que dos fenómenos ocurran simultáneamente no significa que uno cause al otro. Para establecer causalidad se requieren estudios controlados que aíslen variables. Los estudiantes deben cuestionar: ¿qué otras variables podrían explicar los resultados?

---

## Question 14 (Variant Basic - Difficulty 7)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Evalúa argumentos que combinan datos y valores
**Context:** Discusión sobre eutanasia en Colombia (Ley 100 de 2023)

### Enunciado
El artículo afirma: "Los métodos actuales de eutanasia son incompatibles con la dignidad humana, porque permiten que el paciente firme un consentimiento informado sin la presencia de un psicólogo." El tipo de falacia presente es:

### Options
- [x] A) Apelación a la dignidad como concepto vago e indefinido que sustenta la conclusión sin evidencia <!-- feedback: Correcto. "Dignidad humana" es un concepto filosófico vago que se usa para sostener una conclusión sin definir qué significa operacionalmente ni cómo el consentimiento informado viola esa dignidad -->
- [ ] B) Ataque personal al paciente que solicita eutanasia <!-- feedback: No hay ataque directo a personas -->
- [ ] C) Uso de una autoridad no calificada <!-- feedback: No se cita ninguna autoridad -->
- [ ] D) Generalización de un caso individual <!-- feedback: No hay caso individual mencionado -->

### Explicación Pedagógica
La apelación a conceptos abstractos como "dignidad", "libertad", o "justicia" sin operacionalizarlos es una falacia argumentativa frecuente. El autor asume que el lector comparten la misma definición de dignidad, pero este concepto puede interpretarse de múltiples formas. Un argumento válido debe definir sus términos centrales.

---

## Question 15 (Variant Basic - Difficulty 8)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Compara argumentos con perspectivas opuestas
**Context:** Debate sobre matrimonio igualitario en fallos de la Corte Constitucional

### Enunciado
El texto A afirma: "El matrimonio igualitario fortalece la familia colombiana al permitir que parejas del mismo sexo formen hogares estables." El texto B afirma: "El matrimonio igualitario destruye los valores tradicionales de la familia colombiana." ¿Cuál análisis es más consistente con una lectura crítica rigurosa?

### Options
- [ ] A) Text A es correcto porque la Corte Constitucional lo respaldó <!-- feedback: El respaldo institucional no hace automáticamente correcta una posición ética -->
- [ ] B) Texto B es correcto porque representa la mayoría de colombianos <!-- feedback: La cantidad de personas que apoyan una posición no la hace éticamente correcta -->
- [x] C) Ambos textos presentan valores en conflicto y ninguno puede probar objetivamente cuál es "correcto" <!-- feedback: Correcto. Los valores (estabilidad familiar vs. tradición) son posiciones legítima y posiblemente inconmensurables donde no hay respuesta objetivamente verificable -->
- [ ] D) Ningún texto es correcto porque todos los argumentos son relativos <!-- feedback: El relativismo absoluto否认 cualquier posibilidad de evaluación ética, lo cual es una posición filosófica en sí misma, no una lectura crítica -->

### Explicación Pedagógica
En debates sobre valores, las posiciones pueden ser legítimamente diferentes sin que una sea objetivamente "correcta". La lectura crítica reconoce que ciertos temas involucran valores fundamentales que pueden estar en conflicto genuino. Esto no significa que todo sea igualmente válido, sino que requiere evaluación cuidadosa de los argumentos sin reducir la complejidad.

---

## Question 16 (Variant Basic - Difficulty 8)

**ID:** `CO-LEC-11-P2-textos-argumentativos-041-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Analiza cómo el contexto sociocultural influye en textos argumentativos
**Context:** Artículo sobre el uso del páramo de Sumapaz para agricultura

### Enunciado
Un periodista bogotano escribe: "Los campesinos que se oponen al cultivo sostenible en el páramo simplemente no entienden los protocolos ambientales modernos." La debilidad argumentativa principal es:

### Options
- [ ] A) No presenta datos sobre los protocolos mencionados <!-- feedback: Sí hay una debilidad, pero no es la principal -->
- [x] B) Descalifica a los campesinos sin considerar su conocimiento tradicional del territorio <!-- feedback: Correcto. El autor comete una falacia ad hominem al descalificar a los campesinos y dismiss su conocimiento ancestral por considerarlo inferior al conocimiento "moderno", sin engaging con sus argumentos substantivos -->
- [ ] C) Usa un tono demasiado formal para el tema <!-- feedback: El tono formal no es una debilidad argumentativa -->
- [ ] D) No menciona los daños ambientales del páramo <!-- feedback: Omisión posible pero no la debilidad principal del argumento -->

### Explicación Pedagógica
La falacia ad hominem ocurre cuando se ataca a la persona en lugar de sus argumentos. En este caso, se dismiss el conocimiento de los campesinos por ser "tradicional" frente al "moderno", sin engage con sus argumentos específicos. Una lectura
