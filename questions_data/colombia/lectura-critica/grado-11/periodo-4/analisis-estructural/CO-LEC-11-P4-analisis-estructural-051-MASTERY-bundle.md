<think>
The user wants me to generate exactly 20 multiple-choice questions in ICFES Saber 11 format for Colombian state exam, specifically for "Lectura Crítica" (Critical Reading) on the topic "análisis-estructural" (structural analysis), grade 11, period 4.

I need to follow these rules:
1. Progressive difficulty: D3-D4 (questions 1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
2. Plausible distractors: real errors Colombian students make
3. ICFES alignment: real Saber 11 exam style
4. Modern Colombian context
5. 4 mandatory options, [x] on the correct one
6. No "all of the above" or "none of the above"

I need to output ONLY the markdown content (YAML frontmatter + 20 questions), no additional text before or after.

Let me create this bundle starting from bundle_index 51.

For Critical Reading - Structural Analysis, I need to focus on:
- Identifying text structure (narrative, argumentative, descriptive, expositive, dialogical)
- Recognizing organizational patterns (cause-effect, problem-solution, chronological, compare-contrast)
- Analyzing how structure contributes to meaning
- Identifying cohesive devices and their function
- Recognizing narrative techniques (flashback, foreshadowing, in medias res)
- Analyzing discourse markers and their role in coherence

Let me create 20 questions with the proper format:

Format:
---
id: "CO-LEC-11-P4-analisis-estructural-051-MASTERY"
country: "colombia"
grado: 11
asignatura: "lectura-critica"
tema: "analisis-estructural"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 51
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"


generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-16T02:20:24.948122"
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

## Question N (Variant Basic - Difficulty X)

**ID:** `CO-LEC-11-P4-analisis-estructural-051-MASTERY-vN`
**Bloom:** [Remember|Understand|Apply|Analyze|Evaluate|Create]
**ICFES:** [Competencia ICFES específica]
**Context:** [Contexto moderno relevante para Colombia]

### Enunciado
[Pregunta clara y completa]

### Options
- [ ] A) [Opción incorrecta]
- [ ] B) [Opción incorrecta]
- [x] C) [Opción CORRECTA] <!-- feedback: razón por la cual es correcta -->
- [ ] D) [Opción incorrecta] <!-- feedback: razón por la cual es incorrecta -->

### Explicación Pedagógica
[Explicación de por qué la respuesta es correcta y por qué los distractores son plausibles]

Now I'll structure the questions with appropriate difficulty progression and authentic ICFES styling, ensuring each has clear pedagogical rationale and plausible distractors based on common Colombian student errors.

</think>

---
id: "CO-LEC-11-P4-analisis-estructural-051-MASTERY"
country: "colombia"
grado: 11
asignatura: "lectura-critica"
tema: "analisis-estructural"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 51
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-16T02:20:24.948122"
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

## Question 1 (Variant Basic - Difficulty D3)

**ID:** `CO-LEC-11-P4-analisis-estructural-051-MASTERY-v1`
**Bloom:** Understand
**ICFES:** Comprensión textual - Identificación de estructuras básicas
**Context:** Contexto cultural colombiano - Lectura sobre tradiciones vallenatas

### Enunciado
El siguiente texto presenta una estructura narrativa. Identifique el elemento que define esta organización:

"En el pueblo de Valledupar, los grandparents mantenían viva la tradición del vallenato. Cada diciembre, los acordeones salían de sus cajas mientras las historias de los mayores se tejían con las melodías."

- [ ] A) Predominio de funciones del lenguaje centradas en el emisor
- [x] B) Secuencia temporal que sigue un orden cronológico de datos <!-- feedback: La estructura presenta una organización cronológica/simple secuencial donde los eventos se desarrollan en un orden natural desde el pueblo hasta la tradición y luego la práctica mensual -->
- [ ] C) Exposición de argumentos que defienden una tesis central
- [ ] D) Descripción detallada de características sin relación jerárquica

### Explicación Pedagógica
La respuesta correcta es B porque el texto presenta una organización secuencial simple donde se expone una situación inicial (el pueblo), una tradición (los grandparents), y una práctica cíclica (cada diciembre). Esta estructura es típica de textos narrativos-descriptivos. Los distractores A y C corresponden a funciones del lenguaje y estructuras argumentativas respectivamente, categorías no aplicables a este texto. El distractor D podría confundirse con una descripción, pero la presencia de verbos en pasado indica secuencia temporal.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-LEC-11-P4-analisis-estructural-051-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Comprensión textual - Reconocimiento de marcadores discursivos
**Context:** Contexto educativo colombiano - Artículo sobre educación rural

### Enunciado
En el texto: "Los estudiantes del Chocó primero aprenden sobre los ecosistemas acuáticos; **además**, estudian los terrestres; **finalmente**, realizan trabajo de campo", ¿qué función cumple el marcador "además"?

- [ ] A) Establece una relación de contraste entre las ideas
- [x] B) Indica adición y progresión en el desarrollo temático <!-- feedback: El marcador "además" funciona como conectivo aditivo que suma información y establece progresión en la exposición de temas educativos -->
- [ ] C) Introduce una idea que contradice lo anterior
- [ ] D) Señala una relación de causa-consecuencia

### Explicación Pedagógica
La respuesta correcta es B. El marcador "además" cumple una función aditiva en la estructura del texto, agregando información que se suma a lo ya presentado (ecosistemas acuáticos) y avanzando hacia el siguiente elemento (terrestres). Los estudiantes frecuentemente confunden los marcadores aditivos con otros tipos de relaciones: el distractor A corresponde a marcadores de contraste (pero, sin embargo), el C a adversativos, y D a marcadores causales (porque, por lo tanto).

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-LEC-11-P4-analisis-estructural-051-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Comprensión textual - Clasificación de estructuras textuales
**Context:** Contexto social colombiano - Editorial sobre migración venezolana

### Enunciado
Identifique el tipo de estructura textual que predomina en el siguiente fragmento:

"**Por un lado**, la migración venezolana ha generado presiones sobre los servicios de salud en Cúcuta. **Por otro lado**, muchos profesionales venezolanos han contribué a fortalecer el tejido económico de la ciudad. **En conclusión**, se requiere una política integral que contemple ambos aspectos."

- [ ] A) Narrativa
- [ ] B) Descriptiva
- [x] C) Argumentativa con estructura contrastiva <!-- feedback: El texto presenta una estructura argumentativa que utiliza marcadores de contraste (por un lado/por otro lado) para exponer dos perspectivas opuestas antes de llegar a una conclusión -->
- [ ] D) Expositiva secuencial

### Explicación Pedagógica
La respuesta correcta es C. El texto utiliza una estructura argumentativa contrastiva, presentando dos posiciones opuestas (presiones vs. beneficios) mediante marcadores discursivos específicos. El uso de "por un lado/por otro lado" indica la intención del autor decontrastar ideas antes de ofrecer una síntesis en la conclusión. Los estudiantes frecuentemente confunden esta estructura con la expositiva simple, pero la presencia de marcadores contrastivos y una tesis de cierre diferencian la estructura argumentativa.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-LEC-11-P4-analisis-estructural-051-MASTERY-v4`
**Bloom:** Analyze
**ICFES:** Pensamiento variacional - Análisis de organización textual
**Context:** Contexto tecnológico colombiano - Artículo sobre trabajo remoto

### Enunciado
En el texto: "El trabajo remoto en Bogotá presenta ventajas como la flexibilidad horaria. **Sin embargo**, también implica desafíos como el aislamiento profesional. **No obstante**, estas dificultades pueden mitigarse con políticas adecuadas.", ¿qué tipo de relación textual predomina?

- [ ] A) Aditiva
- [x] B) Adversativa con potencial resolución <!-- feedback: Los marcadores "sin embargo" y "no obstante" establecen relaciones adversativas donde se presenta un problema seguido de una posible solución, estructurando el texto de manera problemática-resolutiva -->
- [ ] C) Causal
- [ ] D) Temporal

### Explicación Pedagógica
La respuesta correcta es B. La secuencia "sin embargo" (presenta problema) + "no obstante" (sugiere solución) conforma una estructura adversativa con resolución progresiva. Los marcadores adversativos indican que el autor está contrapunteando perspectivas: mientras la estructura adversativa simple solo presentaría la tensión, aquí se añade un movimiento hacia la resolución. Los distractores: A corresponde a marcadores como "además", C a "porque/por lo tanto", y D a "primero/luego/entonces".

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-LEC-11-P4-analisis-estructural-051-MASTERY-v5`
**Bloom:** Understand
**ICFES:** Comprensión textual - Análisis de elementos cohesivos
**Context:** Contexto económico colombiano - Reportaje sobre emprendimiento en Medellín

### Enunciado
En el siguiente fragmento, identifique la función del conector resaltado:

"Los jóvenes paisas han desarrollado iniciativas de emprendimiento tecnológico. **Este fenómeno** se explica por la presencia de incubadoras y la cultura empresarial de la región."

- [ ] A) Conectar dos oraciones sin relación semántica
- [x] B) Establecer cohesión mediante referencia anafórica <!-- feedback: "Este fenómeno" funciona como elemento catafórico que retoma y sintetiza el contenido del primer enunciado (iniciativas de emprendimiento), estableciendo cohesión текстовая -->
- [ ] C) Introducir una idea nueva completamente desconectada
- [ ] D) Indicar una relación de subordinación entre oraciones

### Explicación Pedagógica
La respuesta correcta es B. El término "Este fenómeno" cumple una función cohesiva anafórica (desde el final hacia el inicio del texto) al referirse al contenido del enunciado anterior. Este tipo de mecanismo de cohesión es fundamental en textos argumentativos y expositivos para mantener coherencia. Los estudiantes frecuentemente no identifican las referencias catafóricas/anafóricas como mecanismos de cohesión, confundiéndolas con conectores de otro tipo.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-LEC-11-P4-analisis-estructural-051-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Pensamiento sistémico - Identificación de patrones estructurales
**Context:** Contexto ambiental colombiano - Informe sobre deforestación en la Amazonía

### Enunciado
¿Qué tipo de estructura predomina en el siguiente texto?

"**Primero**, la expansión de la frontera agrícola ha reducido la cobertura boscosa. **En segundo lugar**, la minería ilegal acelera la degradación de los suelos. **Como consecuencia**, la Biodiversidad disminuye exponencialmente. **Por lo tanto**, se requieren estrategias de conservación urgentes."

- [ ] A) Descriptive并列
- [x] B) Secuencial-causal con cierre resolutivo <!-- feedback: La estructura presenta una secuencia de causas que progresan hacia una consecuencia final, y termina con una propuesta de solución, lo cual corresponde a una estructura causal-resolutiva -->
- [ ] C) Narrativa con protagonist
- [ ] D) Comparativa entre dos fenómenos

### Explicación Pedagógica
La respuesta correcta es B. El texto sigue un patrón secuencial-causal donde se enumerate multiple causes (expansión agrícola, minería) que llevan a una consecuencia (pérdida de biodiversidad), culminating in a resolutive proposal (estrategias de conservación). Esta estructura es común en informes técnicos y textos de opinión. El distractor A podría confundir porque hay enumeración, pero esta no es arbitraria sino causalmente concatenada. La estructura narrativa (C) requiere personajes y eventos, y la comparativa (D) necesita al menos dos elementos enfrentados.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-LEC-11-P4-analisis-estructural-051-MASTERY-v7`
**Bloom:** Understand
**ICFES:** Comprensión textual - Análisis de señales discursivas
**Context:** Contexto urbano colombiano - Artículo sobre movilidad en Cartagena

### Enunciado
En el texto sobre movilidad en Cartagena, el autor emplea la siguiente organización: presentación del problema, causas identificadas, consecuencias descritas y posibles soluciones. ¿Qué tipo de estructura es esta?

- [ ] A) Inductiva
- [x] B) Problema-solución (problemática-resolutiva) <!-- feedback: La secuencia problema→causas→consecuencias→soluciones corresponde a la estructura problem-solution, común en textos periodísticos de análisis -->
- [ ] C) Deductiva
- [ ] D) Lineal simple

### Explicación Pedagógica
La respuesta correcta es B. La estructura problema-solución se caracteriza por identificar una situación problemática, analizar sus causas y consecuencias, y proponer alternativas de solución. Esta organización es frecuente en textos periodísticos de análisis social. Los estudiantes frecuentemente confunden las estructuras deductiva e inductiva: la deductiva parte de la tesis general hacia ejemplos particulares, mientras que la inductiva hace el proceso inverso.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-LEC-11-P4-analisis-estructural-051-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Comprensión textual - Evaluación de coherencia textual
**Context:** Contexto cultural colombiano - Reseña sobre teatro en Cali

### Enunciado
En el texto: "La obra 'La Gota de Oro' comienza con los actores en silencio. **A continuación**, se escuchan los primeros acordes de música salsa. **Seguidamente**, el escenario se ilumina con tonos cálidos. **Este inicio** establece el ambiente festivo de la obra.", ¿qué tipo de marcadorpredomina y qué función cumple?

- [ ] A) Marcador adversativo - genera tensión argumentativa
- [ ] B) Marcador causal - explica las razones del fenómeno descrito
- [x] C) Marcador顺序 temporal - indica progresión cronológica de la secuencia dramática <!-- feedback: Los marcadores "a continuación", "seguidamente" y "este inicio" establecen una secuencia temporal que estructura el relato de los eventos en orden cronológico, creando cohesión narrativa -->
- [ ] D) Marcador condicional - establece una hipótesis sobre la obra

### Explicación Pedagógica
La respuesta correcta es C. Los marcadores "a continuación" y "seguidamente" son marcadores temporales que indican el orden cronológico de los eventos en la narrativa teatral. Además, "este inicio" funciona como referencia anafórica que sintetiza lo descrito. Los estudiantes frecuentemente confunden los marcadores temporales con los causales cuando hay relación semántica, pero la función primaria de estos conectores es ordenar temporalmente los eventos.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-LEC-11-P4-analisis-estructural-051-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Pensamiento variacional - Interpretación de señales cohesionadoras
**Context:** Contexto deportivo colombiano - Entrevista sobre el自行车 en Colombia

### Enunciado
En el texto: "Los recorridos por la Vía Parque los realizan tanto ciclistas profesionales **como** aficionados. **De hecho**, muchos de estos aficionados han desarrollado habilidades que los llevan a competir en categoria profesional. **Así**, el amateurismo se convierte en semillero de talentos.", ¿qué relación existe entre las ideas?

- [ ] A) Relación de negación entre los elementos
- [ ] B) Relación de duda o hipótesis sobre lo expuesto
- [x] C) Relación de reafirmación y consecuencia progresiva <!-- feedback: "De hecho" reitera y refuerza lo presentado en la primera oración, mientras "así" introduce una consecuencia que resulta de la situación descrita, estableciendo una progresión argumentativa -->
- [ ] D) Relación de temporalidad cronológica pura

### Explicación Pedagógica
La respuesta correcta es C. La estructura muestra cómo "de hecho" funciona como reafirmador que intensifica lo expuesto, mientras "así" introduce una consecuencia lógica que se deriva de la situ described. Esta combinación de reafirmación y progresión causal es común en textos argumentativos. Los estudiantes frecuentemente no reconocen los matices entre marcadores de énfasis y los clasifican como meros aditivos, perdiendo la riqueza argumentativa del texto.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-LEC-11-P4-analisis-estructural-051-MASTERY-v10`
**Bloom:** Evaluate
**ICFES:** Comprensión textual - Evaluación de estructuras textuales
**Context:** Contexto histórico colombiano - Texto sobre la independencia en Cartagena

### Enunciado
El texto presenta la siguiente organización: primero se describe el contexto colonial de Cartagena; luego se explican las tensiones internas entre criollos y españoles peninsulares; después se narran los eventos del 11 de noviembre de 1810; finalmente se evalúan las consecuencias del movimiento independentista. ¿Cuál es la estructura predominante?

- [x] A) Cronológica con reflexión analítica al cierre <!-- feedback: La estructura sigue un orden cronológico (contexto→tensiones→evento→consecuencias) pero incorpora un elemento analítico-reflexivo en la evaluación final, lo que la convierte en una estructura mixta cronológico-analítica -->
- [ ] B) Puramente cronológica sin análisis
- [ ] C) Argumentativa con tesis central explícita
- [ ] D) Descriptiva con enumeración de características

### Explicación Pedagógica
La respuesta correcta es A. La presencia del orden cronológico es evidente, pero la inclusión de la evaluación final (analizar consecuencias) introduce un componente reflexivo que transforma la estructura de meramente cronológica a cronológico-analítica. Esta estructura mixta es común en textos históricos académicos. Los estudiantes tienden a encasillar las estructuras en categorías puras, sin reconocer los textos que combinan elementos de diferentes tipos.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-LEC-11-P4-analisis-estructural-051-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Pensamiento sistémico - Análisis de coherencia global
**Context:** Contexto social colombiano - Artículo de opinión sobre violencia en Buenaventura

### Enunciado
En el siguiente texto, identifique la estrategia estructural que permite al autor establecer su posición:

"**Si bien** la violencia en Buenaventura ha disminuido un 15% según estadísticas oficiales, **es necesario reconocer** que muchas comunidades siguen afectadas por el conflicto. **Frente a este panorama**, las autoridades deben implementar programas de reconciliación comunitaria. **De lo contrario**, los avances将被摧毁."

- [ ] A) Estructura meramente expositiva sin postura clara
- [x] B) Estructura argumentativa con marcador de oposición y propuesta resolutiva <!-- feedback: El texto utiliza "si bien" para introducir un reconocimiento parcial (disminución), seguido de una oposición mediante "es necesario reconocer", y cierra con una propuesta ("frente a este panorama") y una advertencia condicional ("de lo contrario"), configurando una estructura argumentativa completa -->
- [ ] C) Estructura descriptiva organizada por áreas geográficas
- [ ] D) Estructura narrativa con protagonista colectivo

### Explicación Pedagógica
La respuesta correcta es B. La estructura argumentativa se identifica por: 1) reconocimiento parcial del adversario (si bien), 2) establecimiento de la postura del autor (es necesario reconocer), 3) propuesta de acción (frente a este panorama), y 4) consecuencia de no actuar (de lo contrario). Esta secuencia constituye un esquema argumentativo completo con premisa, tesis, propuesta y advertencia. Los estudiantes frecuentemente confunden la estructura argumentativa con la expositiva cuando no identifican los marcadores valorativos.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-LEC-11-P4-analisis-estructural-051-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Comprensión textual - Análisis de funciones discursivas
**Context:** Contexto económico colombiano - Editorial sobre economía naranja en Barranquilla

### Enunciado
En el texto: "La economía creativa en Barranquilla ha generado 50.000 empleos en el último año. **Esta cifra** representa un aumento del 20% respecto a la vigencia anterior. **Tal crecimiento** se atribuye principalmente al impulso del sector audiovisual y las artesanías.",
¿qué tipo de recurso cohesionador predomina y qué función tiene?

- [ ] A) Conector lógico que establece relación de causa-efecto
- [x] B) Referencia dêctica/anafórica que sintetiza información previa <!-- feedback: Las expresiones "esta cifra" y "tal crecimiento" funcionan como elementos dêicticos-anfóricos que retoman y sintetizan la información cuantitativa del enunciado anterior, funcion作為 cohesionante textual -->
- [ ] C) Marcador temporal que indica sucesión de eventos
- [ ] D) Recurso estilístico sin función textual cohesiva

### Explicación Pedagógica
La respuesta correcta es B. Las expresiones "esta cifra" y "tal crecimiento" funcionan como elementos dêicticos contextuales que retoman y sintetizan los datos numéricos anteriores, sirviendo como mecanismo de cohesión. Este tipo de recurso es típico en textos informativos y académicos donde se manejan datos específicos. Los estudiantes frecuentemente no identifican estos elementos como mecanismos cohesivos porque no son conectores en sentido estricto, sino sustituciones léxicas que permiten evitar repeticiones.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-LEC-11-P4-analisis-estructural-051-MASTERY-v13`
**Bloom:** Evaluate
**ICFES:** Pensamiento crítico - Evaluación de organización textual
**Context:** Contexto político colombiano - Artículo sobre descentralización en municipios de Nariño

### Enunciado
El autor de un texto sobre descentralización municipal presenta primero los argumentos a favor de la autonomía local, luego presenta los argumentos en contra, y finalmente expone su propia posición equilibrando ambos lados. ¿Qué estructura sigue este texto?

- [x] A) Estructura dialógica con cierre epistémico <!-- feedback: La organización presenta dos perspectivas opuestas (a favor/en contra) en diálogo, y concluye con una posición que surge del contraste, lo que constituye una estructura dialógica con resolución epistémica del autor -->
- [ ] B) Estructura inductiva que parte de casos hacia la conclusión
- [ ] C) Estructura deductiva que parte de la tesis hacia los ejemplos
- [ ] D) Estructura cronológica que sigue el orden de los eventos históricos

### Explicación Pedagógica
La respuesta correcta es A. La estructura dialógica se caracteriza por presentar dos o más posiciones en contraste, creando un espacio de debate argumentativo. El cierre epistémico ocurre cuando el autor construye su propia posición a partir del análisis de las perspectivas enfrentadas. Este tipo de estructura es común en textos académicos y de opinión. Los estudiantes frecuentemente confunden la estructura dialógica con la argumentativa simple, sin reconocer que en la dialógica hay una interacción real entre perspectivas opuestas.

---

## Question 14 (Variant Basic - Difficulty D8)

**ID:** `CO-LEC-11-P4-analisis-estructural-051-MASTERY-v14`
**Bloom:** Create
**ICFES:** Pensamiento sistémico - Síntesis de patrones estructurales
**Context:** Contexto científico colombiano - Artículo sobre investigación en la Universidad Nacional

### Enunciado
Analice el siguiente texto y determine qué tipo de estructura predomina:

"La investigación sobre secuestro de carbono en los páramos de Boyacá arroja resultados significativos. **En efecto**, los ecosistemas de alta montaña almacenan mayores cantidades de CO2 que los bosques tropicales. **No obstante**, estos resultados deben interpretarse con cautela porque **por un lado** la muestra analizada es limitada, **por otro lado** las condiciones climáticas están cambiando rápidamente."

- [ ] A) Estructura expositiva lineal sin matices
- [x] B) Estructura argumentativa con matiz precaución epistémica <!-- feedback: El texto presenta una утверждение inicial (resultados significativos), lo refuerza con evidencia (en efecto), pero luego introduce matices cautelares usando marcadores de oposición y contraste (no obstante, por un lado, por otro lado), mostrando una estructura argumentativa con gestión de incertidumbre -->
- [ ] C) Estructura narrativa de proceso investigativo
- [ ] D) Estructura descriptiva de características del ecosistema

### Explicación Pedagógica
La respuesta correcta es B. La estructura argumentativa con matiz precaución epistémica se caracteriza por presentar una утверждение backed by evidence, pero inmediatamente introducir cautelas y limitaciones mediante marcadores de oposición. Este tipo de estructura es típico en textos científicos donde se reconoce la complejidad de los fenómenos. Los estudiantes frecuentemente no reconocen las estructuras argumentativas complejas que incluyen matices y cautelas, clasificándolas erroneous como expositivas.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-LEC-11-P4-analisis-estructural-051-MASTERY-v15`
**Bloom:** Analyze
**ICFES:** Comprensión textual - Análisis de funciones textuales
**Context:** Contexto filosófico colombiano - Ensayo sobre el pensamiento de Estanislao Zuleta

### Enunciado
En el siguiente fragmento, identifique la relación estructural entre las premisas y la conclusión:

"Para Estanislao Zuleta, el pensamiento crítico requiere la capacidad de tolerate la incertidumbre. **En primer lugar**, cuestionarse las certezas propias es fundamental. **En segundo lugar**, escuchar al diferente permite ampliar la perspectiva. **Por lo tanto**, la formación del pensamiento crítico implica reconocer los límites del conocimiento."

- [x] A) Relación deductiva donde las premisas sostienen la conclusión <!-- feedback: La estructura sigue un patrón deductivo donde las premisas (cuestionarse, escuchar) funcionan como fundamentos que sostienen logically la conclusión (formación del pensamiento crítico), estableciendo una
