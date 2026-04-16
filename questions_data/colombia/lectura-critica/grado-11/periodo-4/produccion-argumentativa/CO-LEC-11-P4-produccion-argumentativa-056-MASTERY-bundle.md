<think>
The user wants me to generate exactly 20 multiple-choice questions in ICFES Saber 11 format for Colombian state exam. The topic is "produccion-argumentativa" (argumentative production) for Reading Critical (Lectura Crítica), grade 11, period 4.

Let me follow the strict format with:
- YAML frontmatter block
- 20 questions with progressive difficulty (D3-D4 for 1-4, D5-D6 for 5-10, D7-D8 for 11-16, D9-D10 for 17-20)
- Each question with ID, Bloom level, ICFES competency, context, enunciado, 4 options (A-D), correct marked with [x], explanation

Let me create these questions about argumentative production in reading critical context. Topics could include:
- Thesis statement development
- Argument structure (premise, argument, conclusion)
- Counterarguments
- Evidence and support
- Logical fallacies
- Persuasive techniques
- Text coherence and cohesion
- Audience consideration
- Rhetorical strategies
- Opinion vs argument distinction

Let me generate 20 questions with Colombian contexts.

</think>

```yaml
---
id: "CO-LEC-11-P4-produccion-argumentativa-056-MASTERY"
country: "colombia"
grado: 11
asignatura: "lectura-critica"
tema: "produccion-argumentativa"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 56
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-16T02:35:02.918339"
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

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Interpretativa
**Context:** Campaña de desinformación sobre vacunas en redes sociales colombianas

### Enunciado
En el siguiente fragmento: "Las vacunas son innecesarias porque el sistema inmune se fortalece naturalmente", el argumento presentado presenta una falacia lógica conocida como:

### Options
- [ ] A) Apelación a la autoridad sin credibilidad <!-- Esta describe una falacia diferente, pero en este caso no hay apelación a autoridad -->
- [x] B) Falsa dicotomía <!-- feedback: Se presenta solo dos opciones (vacunas vs. fortalecimiento natural) ignorando alternativas intermedias -->
- [ ] C) Ad hominem <!-- feedback: No se ataca a la persona que defiende las vacunas -->
- [ ] D) Causalidad falsa <!-- feedback: No se establece una relación causal incorrecta entre dos eventos -->

### Explicación Pedagógica
La falacia de falsa dicotomía (también llamada falso dilema) presenta solo dos opciones como si fueran las únicas posibles, cuando en realidad existen alternativas. En este caso, se ignora que las vacunas pueden complementar la respuesta inmune natural. Los estudiantes frecuentemente confunden esta falacia con otras como la causalidad falsa o la apelación a emociones.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Argumentativa
**Context:** Debate universitario sobre implementación de energía nuclear en Colombia

### Enunciado
Identifique cuál de las siguientes afirmaciones corresponde a una tesis argumentativa central:

### Options
- [ ] A) "Colombia debería explorar todas las fuentes de energía disponible" <!-- Esta es una afirmación general pero no toma posición clara -->
- [x] B) "Colombia debe implementar plantas de energía nuclear en zonas alejadas de centros urbanos para diversificar su matriz energética" <!-- feedback: Presenta una posición clara y específica con justificaciones -->
- [ ] C) "La energía nuclear tiene ventajas y desventajas" <!-- Esta es una observación neutral sin posición -->
- [ ] D) "Algunos expertos creen que la energía nuclear es segura" <!-- No presenta un argumento propio, solo cita opiniones -->

### Explicación Pedagógica
Una tesis argumentativa debe ser una afirmación clara que tome posición sobre un tema. La opción B presenta una postura específica con condiciones, mientras que las demás son ambiguas, neutrales o simplemente descriptivas. Los estudiantes suelen confundir tesis con generalidades o con afirmaciones que no toman partido.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Argumentativa
**Context:** Editorial de newspaper sobre problemática de basuras en Bogotá

### Enunciado
En el texto: "Los bogotanos generan 6.500 toneladas de basura diariamente, pero solo el 17% se recicla. Esto demuestra que los ciudadanos no tienen voluntad para reciclar", el argumento contiene un error de razonamiento porque:

### Options
- [ ] A) Utiliza datos falsos sobre la cantidad de basura <!-- Los datos son reales según reportes de la SDM -->
- [x] B) Establece una conclusión causal a partir de datos que no la sustentan <!-- feedback: Los datos muestran un hecho, pero no prueban que la causa sea "falta de voluntad" -->
- [ ] C) Critica a los bogotanos sin evidencia <!-- Esta es parte del error, pero no captura el error lógico principal -->
- [ ] D) Usa estadísticas obsoletas <!-- Los datos son actuales -->

### Explicación Pedagógica
El error principal es la saltar a una conclusión causal injustificada. Tener datos sobre reciclaje bajo no prueba que la causa sea "falta de voluntad" - podrían existir barreras como falta de infraestructura, educación o acceso. Este es un error frecuente en argumentos cuando se confunde correlación con causalidad.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Argumentativa
**Context:** Carta al director sobre problemática de inseguridad en Medellín

### Enunciado
¿Cuál de las siguientes afirmaciones funciona como contraargumento válido para la posición: "El toque de queda reduce la criminalidad en Medellín"?

### Options
- [ ] A) "El toque de queda es innecesario porque la criminalidad ya bajó" <!-- Esto no refuta la causa, solo el efecto -->
- [x] B) "Los datos muestran que los índices de criminalidad en municipios sin toque de queda son similares, lo que sugiere otros factores" <!-- feedback: Presenta evidencia contraria que cuestiona la relación causal propuesta -->
- [ ] C) "El toque de queda viola los derechos fundamentales" <!-- Es una objeción diferente, no un contraargumento basado en evidencia -->
- [ ] D) "La gente no respeta el toque de queda" <!-- No aborda la efectividad, solo el cumplimiento -->

### Explicación Pedagógica
Un contraargumento válido debe abordar directamente la premisa del argumento original. La opción B presenta evidencia comparativa que cuestiona la relación causal. Los estudiantes frecuentemente confunden contraargumentos con simplemente estar en desacuerdo o con objeciones que no abordan la lógica del argumento.

---

## Question 5 (Variant Medium - Difficulty D5)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v5`
**Bloom:** Understand
**ICFES:** Argumentativa
**Context:** Mesa de trabajo sobre educación virtual post-pandemia en colegio colombiano

### Enunciado
En un texto argumentativo sobre educación híbrida, el autor presenta datos del Ministerio de Educación y luego concluye que "por lo tanto, la educación virtual debería eliminarse". ¿Qué tipo de estrategia argumentativa incompleta se evidencia?

### Options
- [ ] A) Generalización apresurada <!-- No es el error principal, ya que hay datos -->
- [ ] B) Apelación emocional disfrazada de dato <!-- Los datos no son emocionales, son estadísticos -->
- [x] C) Conclusión que no se deriva lógicamente de las premisas <!-- feedback: Los datos del Ministerio respaldan la calidad, no la eliminación de la modalidad -->
- [ ] D) Estereotipo sobre profesores <!-- No se menciona a los profesores -->

### Explicación Pedagógica
El error consiste en que las premisas (datos del Ministerio) no llevan lógicamente a la conclusión (eliminar educación virtual). Podría argumentarse sobre mejorar la calidad, no necesariamente eliminar. Este tipo de salto lógico es común cuando el autor tiene una posición previa y fuerza los datos para confirmarla.

---

## Question 6 (Variant Medium - Difficulty D5)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Argumentativa
**Context:** Debate sobre si celulares deberían estar prohibidos en escuelas de Colombia

### Enunciado
Al escribir un ensayo argumentativo sobre el uso del celular en classrooms, un estudiante incluye la siguiente estructura: "Primero, expongo mi tesis. Luego presento las razones que la apoyan. Después, muestro los argumentos contrarios. Finalmente, respondo a esos argumentos contrarios con evidencia." Esta estructura corresponde a:

### Options
- [ ] A) Silogismo aristotélico <!-- Es un formato lógico pero diferente, no incluye la refutación de contrarios -->
- [x] B) Estructura de texto argumentativo con refutación preventiva <!-- feedback: Incluye todos los elementos mencionados: tesis, argumentos a favor, contraargumentos y contra-refutación -->
- [ ] C) Método científico <!-- No aplica a la argumentación académica -->
- [ ] D) Ensayo narrativo con反思 <!-- No corresponde a la estructura de un ensayo argumentativo -->

### Explicación Pedagógica
La estructura descrita corresponde a un modelo completo de argumentación que incluye la tesis, argumentos de apoyo, reconocimiento de opposing views y su refutación. Esta es una estrategia retórica que fortalece la credibilidad del autor al mostrar que ha considerado perspectivas diversas.

---

## Question 7 (Variant Medium - Difficulty D5)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v7`
**Bloom:** Understand
**ICFES:** Interpretativa
**Context:** Artículo de revista sobre el impacto del turismo en Parque Tayrona

### Enunciado
Identifique cuál de las siguientes es una premisa dentro de un argumento:

### Options
- [ ] A) "Por lo tanto, el turismo sostenibles debe promoverse" <!-- Esta es la conclusión del argumento -->
- [x] B) "Los ecosistemas del Parque Tayrona reciben más de 3.000 visitantes diarios durante temporada alta" <!-- feedback: Es un hecho utilizado para apoyar una conclusión -->
- [ ] C) "El turismo destruye el medio ambiente" <!-- Esta es una generalización sin sustentación -->
- [ ] D) "Todos los ecólogos están de acuerdo en que..." <!-- No es una premisa, es una apelación a la autoridad -->

### Explicación Pedagógica
Una premisa es una afirmación que sirve como base o fundamento para sustentar una conclusión. La opción B presenta un dato verificable que puede usarse como evidencia. Las otras opciones son conclusiones, generalizaciones o Apelaciones a autoridad, no premisas en sí mismas.

---

## Question 8 (Variant Medium - Difficulty D6)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Argumentativa
**Context:** Proyecto de ley sobre regulación de plataformas de delivery en Colombia

### Enunciado
Un congresista argumenta: "Los repartidores de Rappi y Uber Eats ganan menos que el salario mínimo, por lo tanto, debe prohibirse completamente estas plataformas." ¿Cuál es la debilidad principal de este argumento?

### Options
- [ ] A) No presenta datos exactos sobre los salarios <!-- Los datos son suficientes para el contexto -->
- [ ] B) La conclusión es demasiado moderada <!-- En realidad es muy extrema -->
- [x] C) La solución propuesta no corresponde al problema identificado <!-- feedback: El problema es salarial, pero la conclusión es prohibition total de las plataformas, no una mejora laboral -->
- [ ] D) Solo se basa en testimonios personales <!-- No, presenta una premisa general -->

### Explicación Pedagógica
Existe una desconexión lógica entre la premisa (salarios bajos) y la solución (prohibición total). El problema identificado es laboral, entonces la solución debería ser regulación salarial, no eliminación de la plataforma. Este error de concordancia problema-solución es común en argumentos donde el autor busca una solución drástica.

---

## Question 9 (Variant Medium - Difficulty D6)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Argumentativa
**Context:** Foro universitario sobre la implementación de inteligencia artificial en empresas colombianas

### Enunciado
En un ensayo argumentativo un estudiante escribe: "La inteligencia artificial reemplazará millones de empleos en Colombia, esto es innegable porque lo dicen expertos en tecnología." ¿Qué falacia presenta este argumento?

### Options
- [ ] A) Generalización apresurada <!-- No es el error principal -->
- [ ] B) Causalidad falsa <!-- No hay relación causal establecida -->
- [x] C) Apelación a la autoridad no calificada <!-- feedback: Los "expertos en tecnología" no son necesariamente expertos en impacto laboral o economía colombiana -->
- [ ] D) Ad populum <!-- No se apela a la mayoría -->

### Explicación Pedagógica
La apelación a la autoridad es legítima solo cuando el experto tiene credenciales relevantes al tema específico. En este caso, expertos en tecnología no son necesariamente expertos en impacto laboral o políticas económicas. Este es un error frecuente ya que los estudiantes asumen que cualquier "experto" puede opinar sobre cualquier tema.

---

## Question 10 (Variant Medium - Difficulty D6)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v10`
**Bloom:** Evaluate
**ICFES:** Argumentativa
**Context:** Análisis de carta de lector sobre proyecto de metro elevado en Bogotá

### Enunciado
Al evaluar la solidez de un argumento, un lector crítico debe prestar atención principalmente a:

### Options
- [ ] A) La cantidad de fuentes citadas <!-- Más fuentes no garantizan solidez -->
- [x] B) La relación lógica entre premisas y conclusión <!-- feedback: La coherencia interna del argumento es fundamental para evaluar su validez -->
- [ ] C) La extensión del texto argumentativo <!-- Longitud no equivale a calidad -->
- [ ] D) El prestigio del medio donde se publicó <!-- No garantiza la calidad del argumento específico -->

### Explicación Pedagógica
La solidez de un argumento depende fundamentalmente de la coherencia entre sus premisas y su conclusión, independientemente del prestigio del medio, la extensión o la cantidad de fuentes. Esta es una competencia central del pensamiento crítico que permite evaluar argumentos sin dejarse influir por factores externos.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Argumentativa
**Context:** Debate sobre飘飘污染 en la Sabana de Bogotá

### Enunciado
En el siguiente fragmento: "La contaminación del aire en Bogotá es grave. Investigadores de la Universidad Nacional han demostrado esto. Por lo tanto, deberíamos cerrar todas las factories en la ciudad", el argumento presenta falencias porque:

### Options
- [x] A) Las premisas no sustentan proporcionalmente la conclusión drastic <!-- feedback: Que haya contaminación y que investigadores lo confirmen no implica que cerrar TODAS las fábricas sea la solución -->
- [ ] B) Los investigadores de la Universidad Nacional no son confiables <!-- Son fuentes acreditadas -->
- [ ] C) La contaminación del aire no es grave <!-- Los datos la confirman -->
- [ ] D) Cerrar fábricas afectaría la economía de la ciudad <!-- Es un contraargumento, no una evaluación de la estructura -->

### Explicación Pedagógica
El argumento presenta un salto proporcional: la evidencia (contaminación existe y está documentada) no justifica la solución extrema (cerrar todas las fábricas). Podrían existir medidas intermedias como regulación de emisiones. Esta desproporcionalidad entre evidencia y conclusión es un error frecuente en argumentos con carga emocional.

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Argumentativa
**Context:** Proyecto de ley sobre regulación de influencers en publicidad colombiana

### Enunciado
Un argumento válido sobre la regulación de influencers debe incluir, excepto:

### Options
- [ ] A) Evidencia empirical sobre el impacto en consumidores <!-- Esto es necesario -->
- [ ] B) Comparación con marcos legales de otros países <!-- Esto fortalece el argumento -->
- [x] C) Apelación emocional a proteger a los niños <!-- feedback: Las apelaciones emocionales no son argumentos racionales válidos, son falacias -->
- [ ] D) Definición clara del problema que se busca resolver <!-- Esto es necesario -->

### Explicación Pedagógica
Las apelaciones emocionales, aunque puedan ser persuasivas, no constituyen argumentos racionales válidos en un texto argumentativo académico. Un argumento válido debe basarse en evidencia, lógica y definiciones claras. Los estudiantes frecuentemente confunden persuasión emocional con argumentación sólida.

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Interpretativa
**Context:** Análisis de columna de opinión sobre escasez de agua en La Guajira

### Enunciado
En el texto: "Los wayuu han vivido durante siglos sin acceder a agua potable y no se han extinguido, por lo tanto el acceso al agua no es un problema tan grave", se presenta un argumento con falacia conocida como:

### Options
- [ ] A) Generalización apresurada <!-- No aplica exactamente aquí -->
- [x] B) Normalización del sufrimiento <!-- feedback: Se justifica una situación problemática argumentando que "siempre ha sido así" o que "han sobrevivido" -->
- [ ] C) Apelación a la tradición <!-- Similar, pero la falacia central es la normalización del sufrimiento -->
- [ ] D) Causalidad falsa <!-- No se establece una relación causal -->

### Explicación Pedagógica
La falacia de normalización del sufrimiento ocurre cuando se usa como argumento el hecho de que alguien ha "sobrevivido" a una situación problemática para minimizar su gravedad. Esto ignora el sufrimiento real y las condiciones indignas. Es una falacia particularmente perniciosa en contextos de derechos humanos.

---

## Question 14 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Argumentativa
**Context:** Forum about migración desde Venezuela en frontera con Cúcuta

### Enunciado
¿Cuál de las siguientes estructuras representa correctamente un texto argumentativo tipo ensayo académico sobre migración?

### Options
- [ ] A) Introducción → Argumento 1 → Argumento 2 → Argumento 3 → Conclusión <!-- Falta refutación de opuestos -->
- [x] B) Introducción con tesis → Contraargumento y refutación → Argumentos de apoyo con evidencia → Conclusión <!-- feedback: Esta estructura reconoce la complejidad del tema -->
- [ ] C) Historia personal del autor → Datos estadísticos → Conclusión emotiva <!-- No es estructura argumentativa sólida -->
- [ ] D) Solamente datos y testimonios juxtapuestos sin análisis <!-- No hay estructura argumentativa -->

### Explicación Pedagógica
Un ensayo argumentativo académico robusto debe reconocer y refutar los argumentos opuestos. La opción B refleja la estructura canónica del ensayo argumentativo tipo UNIX, que incluye tanto la presentación de la tesis como el análisis crítico de perspectivas contrarias. Las demás opciones muestran estructuras incompletas o no argumentativas.

---

## Question 15 (Variant Advanced - Difficulty D8)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Argumentativa
**Context:** Debate sobrelegalización de cannabis en Colombia

### Enunciado
Al evaluar si el argumento "La legalización del cannabis reduciría el crimen organizado porque erosionaría su principal fuente de ingresos" es válido, un lector crítico debe considerar principalmente:

### Options
- [ ] A) Si el autor está a favor o en contra de la legalización <!-- No importa su posición, importa la lógica -->
- [ ] B) Cuántos países han legalizado el cannabis <!-- No es relevante para evaluar la lógica -->
- [x] C) Si la premisa de que el cannabis es la "principal" fuente de ingresos del crimen organizado es verificable y si la conclusión se deriva lógicamente <!-- feedback: La evaluación debe ser sobre la estructura lógica y las premisas -->
- [ ] D) La opinión de la policía sobre la legalización <!-- Las autoridades tienen sesgos institucionales -->

### Explicación Pedagógica
La evaluación de un argumento debe centrarse en su estructura lógica y la verificabilidad de sus premisas, no en las características personales del autor, la popularidad de la postura, o las opiniones de grupos con posibles intereses. Esta es la base del pensamiento crítico para evaluar argumentos independientemente del agree/disagree.

---

## Question 16 (Variant Advanced - Difficulty D8)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v16`
**Bloom:** Create
**ICFES:** Argumentativa
**Context:** Proyecto estudiantil sobre problema de ciclovías en Bogotá los domingos

### Enunciado
Un estudiante quiere argumentar que las ciclovías dominicales deberían ampliarse a toda la ciudad. ¿Cuál de las siguientes combinaciones de premisas presentaría el argumento más sólido?

### Options
- [ ] A) Son divertidas y mucha gente las disfruta <!-- Solo apelan al gusto personal -->
- [x] B) Reducen la contaminación del aire (datos de contaminación los domingos vs. lunes), mejoran la salud cardiovascular de los ciudadanos (estudios de la Secretaría de Salud), y descongestionan el tránsito (comparación de tráfico por hora) <!-- feedback: Incluye evidencia verificable, fuentes oficiales y múltiples dimensiones del problema -->
- [ ] C) Otras ciudades lo hacen y les funciona bien <!-- Comparación con otros contextos sin análisis de adaptabilidad -->
- [ ] D) Los mayors de otras ciudades lo han dicho <!-- Apelación a la autoridad en otro contexto -->

### Explicación Pedagógica
Un argumento sólido debe basarse en evidencia verificable, datos de fuentes confiables, y abordar múltiples dimensiones del problema. Las opciones A, C y D se basan en preferencias personales, comparaciones sin análisis de contexto, o autoridades en contextos no comparables. Esta es la base para construir argumentos académicos sólidos.

---

## Question 17 (Variant Mastery - Difficulty D9)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Argumentativa
**Context:** Analyse de ensayo universitario sobre violencia intrafamiliar en Colombia

### Enunciado
En un ensayo argumentativo sobre violencia intrafamiliar, un estudiante escribe: "Las mujeres víctimas de violencia deberían simplemente dejar a sus agresores, como sugiere la teoría del ciclo de la violencia." Al evaluar críticamente este argumento, el error principal es:

### Options
- [ ] A) Citar una teoría obsoleta <!-- La teoría sigue siendo válida -->
- [x] B) Simplificar una situación compleja sin considerar barreras estructurales como dependencia económica, miedo, o falta de recursos <!-- feedback: La solución parece simple pero ignora las condiciones reales que atrap a las víctimas -->
- [ ] C) No definir qué es violencia intrafamiliar <!-- Es un problema, pero no el principal -->
- [ ] D) Usar datos estadísticos sin contexto <!-- No es el problema central -->

### Explicación Pedagógica
Este argumento ejemplifica cómo soluciones aparentemente lógicas pueden fallar al ignorar realidades complejas. Las víctimas enfrentan barreras estructurales no elegidas: dependencia económica, amenazas, falta de redes de apoyo, etc. Este tipo de análisis muestra comprensión de la complejidad de los problemas sociales.

---

## Question 18 (Variant Mastery - Difficulty D9)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v18`
**Bloom:** Create
**ICFES:** Argumentativa
**Context:** Propuesta de políticas públicas sobre educación financiera en schools colombianas

### Enunciado
Un estudiante debe construir un argumento para convencer a la comunidad educativa sobre implementar educación financiera en el currículo escolar. El argumento más efectivo requeriría:

### Options
- [ ] A) Solo datos sobre el crecimiento del consumerism en Colombia <!-- Unidimensional, falta -->
- [x] B) Datos sobre mejora en decisiones financieras (evidencia internacional), razones pedagógicas (formación de ciudadanos autónomos), y respuesta a objeciones comunes (tiempo en currículo ya saturado) <!-- feedback: Aborda evidencia, valores y противор argumentos potenciales -->
- [ ] C) Testimonios emotivos de personas que sufriran por falta de educación financiera <!-- Solo apelaciones emocionales -->
- [ ] D) Comparación con el currículo de otros países sin adaptaciones al contexto colombiano <!-- Falta contextualización -->

### Explicación Pedagógica
Un argumento persuasivo de políticas públicas debe combinar evidencia empírica (datos), fundamento axiológico (valores), y anticipación de objeciones. Esto hace el argumento más robusto y muestra consideración por perspectivas diversas. Las opciones A, C y D son incompletas o sesgadas.

---

## Question 19 (Variant Mastery - Difficulty D9)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Argumentativa
**Context:** Análisis de columna de opinión sobre privatización de услуги públicos en Colombia

### Enunciado
Al leer un argumento que comienza con: "El agua es un derecho humano fundamental. Por lo tanto, su privatización es absolutamente inaceptable", un lector crítico debe identificar que:

### Options
- [ ] A) La premisa mayor es falsa porque el agua no es un derecho humano reconocido <!-- Es verdadera según la ONU -->
- [x] B) La conclusión no se deriva necesariamente porque un derecho puede protegerse de múltiples formas, incluyendo regulaciones en contextos privatizados <!-- feedback: La estructura lógica salta de "es un derecho" a "no puede privatizarse" sin论证 que la privatización sea incompatible con su protección -->
- [ ] C) El argumento es completamente válido y no tiene debilidades <!-- Ignora el salto lógico -->
- [ ] D) La conclusión debería ser opuesta porque la privatización siempre mejora el servicio <!-- Es una posición, no un análisis -->

### Explicación Pedagógica
Este argumento presenta una falacia lógica:跳过中间项. De "es un derecho" no se sigue automáticamente "no puede privatizarse". Puede existir regulación que proteja el derecho incluso en contextos privatizados. Reconocer estos saltos lógicos es esencial para la evaluación crítica de argumentos sobre políticas públicas.

---

## Question 20 (Variant Mastery - Difficulty D10)

**ID:** `CO-LEC-11-P4-produccion-argumentativa-056-MASTERY-v20`
**Bloom:** Create
**ICFES:** Argumentativa
**Context:** Foro intercolegiado sobre el futuro del trabajo en Colombia ante la automatización

### Enunciado
Un estudiante debe escribir un ensayo argumentativo completo sobre si el gobierno debería invertir en programas de reconversión laboral para trabajadores amenazados por la automatización. Para que el ensayo sea argument