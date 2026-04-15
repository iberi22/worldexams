<think>
The user wants me to generate exactly 20 multiple-choice questions in ICFES Saber 11 format for Mathematics - Trigonometry, Grade 11, Period 2.

Let me follow the specific format requirements:
- Frontmatter YAML with specific fields
- 20 questions with progressive difficulty:
  - Questions 1-4: Difficulty D3-D4 (Basic)
  - Questions 5-10: Difficulty D5-D6 (Medium)
  - Questions 11-16: Difficulty D7-D8 (Advanced)
  - Questions 17-20: Difficulty D9-D10 (Expert)
- Each question must have: ID, Bloom level, ICFES competency, Context, Enunciado, 4 options (A, B, C, D), correct answer marked with [x], incorrect options with plausible distractors
- Explanación Pedagógica section
- Colombian modern contexts
- No "all of the above" or "none of the above"
- Only markdown output

Let me create these questions covering trigonometry topics appropriate for grade 11 period 2 in Colombia:

Topics to cover:
1. Trigonometric identities (fundamental, Pythagorean)
2. Sum and difference formulas
3. Double angle formulas
4. Solving trigonometric equations
5. Inverse trigonometric functions
6. Applications of trigonometry
7. Graphs of trigonometric functions
8. Law of sines and cosines

Let me generate 20 questions with increasing difficulty.

I'll structure them properly following the format with proper IDs, Bloom taxonomy levels, ICFES competencies, and Colombian contexts.
</think>

---
id: "CO-MAT-11-P2-trigonometria-013-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "trigonometria"
periodo: 2
protocol_version: "5.1"
bundle_size: 20
bundle_index: 13
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T08:36:07.736935"
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

**ID:** `CO-MAT-11-P2-trigonometria-013-MASTERY-v1`
**Bloom:** [Remember]
**ICFES:** [Interpretación y uso de expresiones algebraicas]
**Context:** [Sistema de transporte masivo de Bogotá]

### Enunciado
En el sistema TransMilenio de Bogotá, una escalera mecánica tiene una inclinación respecto al suelo horizontal tal que sen(θ) = 0,6. Si se sabe que la escalera tiene una longitud de 10 metros, ¿cuál es la altura vertical recorrida por un usuario?

### Options
- [ ] A) 5 metros
- [ ] B) 6 metros
- [x] C) 6 metros <!-- feedback: Por la identidad trigonométrica fundamental, si sen(θ) = 0,6 = 6/10, entonces la altura es 10 × 0,6 = 6 metros. La relación sen(θ) = opuesto/hipotenusa directamente nos da el resultado. -->
- [ ] D) 8 metros <!-- feedback: Error común al confundir sen(θ) con cos(θ). Si sen(θ) = 0,6, el cos(θ) sería la proyección horizontal, no la altura. -->

### Explicación Pedagógica
La pregunta evalúa el recuerdo de la definición del seno en un triángulo rectángulo: sen(θ) = cateto opuesto/hipotenusa. El distractor más común es confundir esta relación con la del coseno o calcular el cuadrado del valor, error frecuente cuando los estudiantes memorizan fórmulas sin comprender su significado geométrico.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P2-trigonometria-013-MASTERY-v2`
**Bloom:** [Remember]
**ICFES:** [Interpretación y uso de expresiones algebraicas]
**Context:** [Arquitectura colonial en Cartagena]

### Enunciado
Una torre colonial en el Centro Histórico de Cartagena proyecta una sombra de 15 metros cuando el sol forma un ángulo de elevación de 30° con el suelo. ¿Cuál es la altura aproximada de la torre?

### Options
- [ ] A) 8,66 metros
- [x] B) 8,66 metros <!-- feedback: Usando tan(30°) = altura/sombra, donde tan(30°) = √3/3 ≈ 0,577, entonces altura = 15 × 0,577 ≈ 8,66 metros. La torre mide aproximadamente 8,66 metros. -->
- [ ] C) 7,5 metros <!-- feedback: Error al usar sen(30°) en lugar de tan(30°). sen(30°) = 0,5, dando 15 × 0,5 = 7,5 metros, que corresponde a la hipotenusa, no a la altura. -->
- [ ] D) 15√3 metros <!-- feedback: Confusión entre los valores de las funciones trigonométricas para 30° y 60°. -->

### Explicación Pedagógica
Se evalúa la identificación de la función trigonométrica adecuada para el contexto. El error típico es usar sen(θ) en lugar de tan(θ) cuando se tiene el ángulo de elevación y la sombra (adyacente), sin considerar que se necesita la razón entre opuesto y adyacente.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P2-trigonometria-013-MASTERY-v3`
**Bloom:** [Understand]
**ICFES:** [Modelamiento de situaciones problema mediante funciones]
**Context:** [Festival de música en Medellín]

### Enunciado
En el Festival de las Flores de Medellín, un drone de filmación asciende formando un ángulo de 45° con la horizontal. Después de recorrer 100 metros a lo largo de su trayectoria, ¿a qué altura se encuentra el drone respecto al punto de despegue?

### Options
- [ ] A) 70,7 metros
- [x] B) 70,7 metros <!-- feedback: En un triángulo con ángulo de 45°, las componentes vertical y horizontal son iguales. La altura = 100 × sen(45°) = 100 × (√2/2) ≈ 70,7 metros. Es un caso especial de triángulo isósceles rectángulo. -->
- [ ] C) 100√2 metros <!-- feedback: Error al confundir la relación. sen(45°) = √2/2, no √2. Multiplicar por √2 en lugar de dividir produce este resultado incorrecto. -->
- [ ] D) 50 metros <!-- feedback: Confusión con el valor de sen(30°). Algunos estudiantes recuerdas que sen(30°) = 0,5 y aplican incorrectamente este valor. -->

### Explicación Pedagógica
La pregunta verifica la comprensión del significado geométrico del seno en términos de componentes vectoriales. El error común es no recordar el valor exacto de sen(45°) o confundir la fórmula de la componente vertical (hipotenusa × sen(θ)).

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P2-trigonometria-013-MASTERY-v4`
**Bloom:** [Understand]
**ICFES:** [Interpretación y uso de expresiones algebraicas]
**Context:** [Producción de café en Colombia]

### Enunciado
En una finca cafetera del Eje Cafetero, un terreno inclinado forma un ángulo de 60° con la horizontal. Si un productor recorre 200 metros por la pendiente, ¿cuál es el desplazamiento horizontal aproximado?

### Options
- [ ] A) 100 metros
- [ ] B) 150 metros
- [x] C) 100 metros <!-- feedback: El desplazamiento horizontal = 200 × cos(60°) = 200 × 0,5 = 100 metros. Se usa cos(θ) = adyacente/hipotenusa para obtener la proyección horizontal. -->
- [ ] D) 173,2 metros <!-- feedback: Error al usar sen(60°) en lugar de cos(60°). sen(60°) = √3/2 ≈ 0,866, dando 200 × 0,866 ≈ 173,2 metros, que sería la altura vertical, no el desplazamiento horizontal. -->

### Explicación Pedagógica
Se evalúa la distinción entre las funciones seno y coseno para calcular componentes de un vector. El distractor más plausible representa el error típico de confundir cuándo usar sen(θ) (componente vertical) y cos(θ) (componente horizontal).

---

## Question 5 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P2-trigonometria-013-MASTERY-v5`
**Bloom:** [Apply]
**ICFES:** [Modelamiento de situaciones problema mediante funciones]
**Context:** [Turismo en el Parque Nacional Los Nevados]

### Enunciado
Un grupo de turistas asciende por una pendiente en el Parque Nacional Los Nevados. Si la pendiente forma un ángulo de 30° con la horizontal y el grupo recorre 500 metros por el sendero, ¿cuál es el incremento en altitud obtenido?

### Options
- [ ] A) 250√3 metros
- [ ] B) 250√3/3 metros
- [x] C) 250 metros <!-- feedback: Altura = 500 × sen(30°) = 500 × 0,5 = 250 metros. Este es el incremento en altitud por el ascenso. -->
- [ ] D) 500√3 metros <!-- feedback: Confusión con la fórmula de 30°-60°-90°. sen(30°) = 0,5, no √3/2. Este resultado correspondería a sen(60°). -->

### Explicación Pedagógica
La pregunta aplica la relación entre el seno y la componente vertical de un vector inclinado. El distractor más elaborado (250√3) corresponde al error de usar el valor de sen(60°) en lugar de sen(30°), error frecuente en problemas con ángulos de 30° y 60°.

---

## Question 6 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P2-trigonometria-013-MASTERY-v6`
**Bloom:** [Apply]
**ICFES:** [Razonamiento lógico y argumentación]
**Context:** [Ingeniería de telecomunicaciones en Colombia]

### Enunciado
Una torre de telecomunicaciones en Bucaramanga emite una señal que viaja en línea recta hacia un receptor ubicado a 120 metros de la base de la torre, formando un ángulo de depresión de 35°. ¿A qué altura aproximada está el receptor respecto a la base de la torre?

### Options
- [ ] A) 84 metros
- [x] A) 84 metros <!-- feedback: El ángulo de depresión es igual al ángulo de elevación (alternos internos). Altura = 120 × tan(35°) ≈ 120 × 0,7 ≈ 84 metros. Se usa la función tangente porque tenemos el ángulo y el cateto adyacente. -->
- [ ] B) 69 metros <!-- feedback: Error al usar sen(35°) en lugar de tan(35°). 120 × 0,574 ≈ 69 metros, que sería si se pidiera la hipotenusa. -->
- [ ] C) 143 metros <!-- feedback: Error al usar el ángulo complementario. Se calcula tan(55°) en lugar de tan(35°). -->
- [ ] D) 97 metros <!-- feedback: Confusión con cos(35°). 120 × cos(35°) ≈ 120 × 0,819 ≈ 98 metros, valor cercano pero incorrecto. -->

### Explicación Pedagógica
Se evalúa la aplicación del concepto de ángulos alternos internos en ángulo de depresión. El distractor 69 m representa el error de usar sen(θ) incorrectamente, mientras que 97 m muestra confusión entre tangente y coseno.

---

## Question 7 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P2-trigonometria-013-MASTERY-v7`
**Bloom:** [Apply]
**ICFES:** [Interpretación y uso de expresiones algebraicas]
**Context:** [Construcción de vivienda en Bogotá]

### Enunciado
Una escalera de emergencia en un edificio de apartamentos en Bogotá está apoyada contra una pared formando un ángulo de 70° con el suelo. Si la base de la escalera está a 1,5 metros de la pared, ¿cuál es la longitud aproximada de la escalera?

### Options
- [ ] A) 2,0 metros
- [ ] B) 2,8 metros
- [x] C) 4,4 metros <!-- feedback: cos(70°) = adyacente/hipotenusa = 1,5/L, entonces L = 1,5/cos(70°) = 1,5/0,342 ≈ 4,4 metros. Se despeja la hipotenusa usando coseno. -->
- [ ] D) 1,6 metros <!-- feedback: Error al multiplicar por cos(70°) en lugar de dividir. 1,5 × 0,342 ≈ 0,51 metros, o confusión similar. El valor 1,6 no corresponde a ningún cálculo correcto. -->

### Explicación Pedagógica
La pregunta requiere identificar la función trigonométrica correcta y despejar la variable deseada. El error típico es no recordar que para encontrar la hipotenusa se divide el cateto adyacente por el coseno del ángulo.

---

## Question 8 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P2-trigonometria-013-MASTERY-v8`
**Bloom:** [Apply]
**ICFES:** [Razonamiento lógico y argumentación]
**Context:** [Navegación en el Río Magdalena]

### Enunciado
Un barco de carga navega por el Río Magdalena formando un ángulo de 40° con la orilla. Si la distancia entre dos puntos a lo largo de la orilla es de 800 metros, ¿cuál es la distancia recorrida por el barco entre esos dos puntos?

### Options
- [ ] A) 618 metros
- [ ] B) 800√3/2 metros
- [x] C) 1044 metros <!-- feedback: La distancia en la orilla es el cateto adyacente (800). El recorrido del barco es la hipotenusa: H = 800/cos(40°) ≈ 800/0,766 ≈ 1044 metros. Se usa cos(θ) = adyacente/hipotenusa. -->
- [ ] D) 514 metros <!-- feedback: Error al usar sen(40°) = 0,643, dando 800 × 0,643 ≈ 514 metros, que sería el cateto opuesto, no la hipotenusa. -->

### Explicación Pedagógica
La pregunta involucra el cálculo de la hipotenusa cuando se conoce el ángulo y un cateto. El distractor 514 m representa el error común de confundir qué función trigonométrica usar cuando se tiene la hipotenusa como incógnita.

---

## Question 9 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P2-trigonometria-013-MASTERY-v9`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento lógico y argumentación]
**Context:** [Agricultura en la Sabana de Bogotá]

### Enunciado
Un agricultor de la Sabana de Bogotá quiere instalar un sistema de riego por aspersión. El aspersor debe cubrir un radio de 8 metros desde su posición. Si el terreno tiene una pendiente uniforme de 15°, ¿cuál es el alcance real del aspersor considerando la inclinación?

### Options
- [ ] A) 8 metros
- [ ] B) 8 × cos(15°) metros
- [x] C) 8 metros <!-- feedback: El alcance del aspersor es la distancia sobre la superficie inclinada. radio = 8 metros es la distancia medida sobre la pendiente (la hipotenusa del triángulo formado por la pendiente). El alcance real sobre la pendiente ya es 8 metros. -->
- [ ] D) 8/sen(15°) metros <!-- feedback: Confusión conceptual. Algunos estudiantes creen que se debe "corregir" la distancia por la pendiente, pero el problema indica que el radio de 8 metros ya está sobre la superficie inclinada. -->

### Explicación Pedagógica
Esta pregunta evalúa la comprensión lectora y la identificación de qué información es relevante. El distractor 8/sen(15°) representa el error de sobrepensar el problema y aplicar correcciones innecesarias cuando el dato ya es el requerido.

---

## Question 10 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P2-trigonometria-013-MASTERY-v10`
**Bloom:** [Analyze]
**ICFES:** [Modelamiento de situaciones problema mediante funciones]
**Context:** [Geografía andina colombiana]

### Enunciado
Desde un mirador en el Nevado del Tolima, un investigador observa una formación rocosa en el valle a un ángulo de depresión de 25°. Si el mirador está a 3500 metros sobre el nivel del valle y el investigador está a 2 km (2000 metros) horizontalmente del punto directamente debajo de la formación, ¿cuál es la altura aproximada de la formación rocosa?

### Options
- [ ] A) 932 metros
- [ ] B) 932 metros
- [x] B) 932 metros <!-- feedback: Primero se calcula la diferencia de alturas usando tan(25°) = altura/2000, entonces altura = 2000 × tan(25°) ≈ 2000 × 0,466 ≈ 932 metros. La altura total de la formación = 3500 + 932 = 4432 metros. Se suman porque el mirador está por encima. -->
- [ ] C) 2570 metros <!-- feedback: Error al restar en lugar de sumar. Solo se calculó 3500 - 932 = 2568 metros. El investigador está por encima, no por debajo. -->
- [ ] D) 3500 metros <!-- feedback: Se ignora completamente el ángulo de depresión y se asume que la altura es simplemente la elevación del mirador. -->

### Explicación Pedagógica
La pregunta requiere analizar el contexto geográfico y determinar cuándo sumar o restar alturas. El distractor 2570 m muestra el error de restar cuando debería sumarse, y 3500 m evidencia la falta de uso de la información del ángulo.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P2-trigonometria-013-MASTERY-v11`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento lógico y argumentación]
**Context:** [Sismología en Colombia]

### Enunciado
En el Laboratorio de Sismología de la Universidad Nacional de Colombia, se analiza la propagación de ondas sísmicas. Una onda travela a lo largo de una falla geológica que forma un ángulo de 30° con la horizontal. Si la componente horizontal de la velocidad es de 6 km/s, ¿cuál es la velocidad total de la onda?

### Options
- [ ] A) 3√3 km/s
- [ ] B) 6√3 km/s
- [x] C) 4√3 km/s <!-- feedback: cos(30°) = 6/V, entonces V = 6/cos(30°) = 6/(√3/2) = 12/√3 = 4√3 km/s ≈ 6,93 km/s. La velocidad total es mayor que la componente horizontal. -->
- [ ] D) 12 km/s <!-- feedback: Error al multiplicar en lugar de dividir. Algunos estudiantes hacen 6 × 2 = 12 sin considerar la función trigonométrica. -->

### Explicación Pedagógica
La pregunta analiza la relación entre las componentes de un vector y su magnitud. El distractor 12 km/s representa el error de duplicar el valor sin aplicar la relación trigonométrica correcta, mientras que los otros distractores muestran diferentes confusiones con los valores de 30° y 60°.

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P2-trigonometria-013-MASTERY-v12`
**Bloom:** [Apply]
**ICFES:** [Interpretación y uso de expresiones algebraicas]
**Context:** [Producción bananera en Urabá]

### Enunciado
Un avión de fumigación en las plantaciones de banano de Urabá vuela a una altitud de 200 metros sobre el nivel de las plantas. El piloto observa las plantas con un ángulo de depresión de 35°. ¿A qué distancia horizontal del punto directamente debajo del avión se encuentran las plantas observadas?

### Options
- [ ] A) 143 metros
- [x] B) 286 metros <!-- feedback: tan(35°) = 200/d, entonces d = 200/tan(35°) ≈ 200/0,7 ≈ 286 metros. El ángulo de depresión es igual al ángulo de elevación alterno, así que se usa tangente con altura y distancia horizontal. -->
- [ ] C) 286√3 metros <!-- feedback: Confusión con valores de ángulos. Se usa la relación incorrecta. -->
- [ ] D) 400 metros <!-- feedback: Error al usar sen(35°) = 0,574 y calcular 200/0,574 ≈ 348, que no coincide exactamente con 400. O confusión similar. -->

### Explicación Pedagógica
La pregunta requiere aplicar el concepto de ángulos alternos internos y la función tangente. El distractor 143 m representa el error de invertir la división (usar la altura como base y viceversa), mostrando falta de comprensión de qué variable representa cada función trigonométrica.

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P2-trigonometria-013-MASTERY-v13`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento lógico y argumentación]
**Context:** [Industria textil en Antioquia]

### Enunciado
En una fábrica textil de Medellín, una cinta transportadora sube bultos de tela formando un ángulo de 20° con la horizontal. Un bulto asciende 15 metros a lo largo de la cinta. ¿Cuánto tiempo tarda el bulto en subir si la velocidad de la cinta es de 2 m/s?

### Options
- [ ] A) 7,5 segundos
- [ ] B) 7,07 segundos
- [x] C) 7,5 segundos <!-- feedback: La distancia recorrida a lo largo de la cinta es 15 metros (la hipotenusa del triángulo). A velocidad constante de 2 m/s, el tiempo = distancia/velocidad = 15/2 = 7,5 segundos. No se necesitan cálculos trigonométricos adicionales porque ya se da la distancia a lo largo de la pendiente. -->
- [ ] D) 14,1 segundos <!-- feedback: Error al calcular primero la componente horizontal (15 × cos(20°) ≈ 14,1) y usar ese valor como el tiempo, sin relación lógica con la velocidad. -->

### Explicación Pedagógica
Esta pregunta evalúa la capacidad de identificar información relevante. El distractor 14,1 s evidencia el error de aplicar operaciones innecesarias con trigonometría cuando el problema ya proporciona directamente la distancia a lo largo de la pendiente.

---

## Question 14 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P2-trigonometria-013-MASTERY-v14`
**Bloom:** [Analyze]
**ICFES:** [Modelamiento de situaciones problema mediante funciones]
**Context:** [Industria petrolera en Casanare]

### Enunciado
Un oleoducto en los llanos orientales de Casanare atraviesa una colina con una pendiente de 25°. La diferencia de altura entre la base y la cima de la colina es de 45 metros. ¿Cuál es la longitud del tramo del oleoducto sobre la colina?

### Options
- [ ] A) 45/tan(25°) metros
- [ ] B) 45/sen(25°) metros
- [x] C) 45/sen(25°) metros <!-- feedback: La longitud del oleoducto es la hipotenusa del triángulo. sen(25°) = altura/L, entonces L = 45/sen(25°) ≈ 45/0,423 ≈ 106,4 metros. Se usa seno porque se tiene la altura (opuesto) y se busca la hipotenusa. -->
- [ ] D) 45/cos(25°) metros <!-- feedback: Error al usar coseno en lugar de seno. cos(25°) = 0,906, lo cual es mayor que sen(25°), resultando en una longitud menor incorrecta. -->

### Explicación Pedagógica
La pregunta analiza qué función trigonométrica usar según qué variables se conocen y cuál se busca. El distractor 45/tan(25°) representa confusión entre las funciones, mientras que el error de usar coseno en lugar de seno es particularmente común.

---

## Question 15 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P2-trigonometria-013-MASTERY-v15`
**Bloom:** [Evaluate]
**ICFES:** [Razonamiento lógico y argumentación]
**Context:** [Telecomunicaciones en la Sierra Nevada de Santa Marta]

### Enunciado
Una antena de telefonía celular en la Sierra Nevada de Santa Marta transmite una señal a un dispositivo que se encuentra a 500 metros de la base de la antena, medidos horizontalmente, y a una elevación de 150 metros sobre el nivel de la base. Un técnico necesita determinar el ángulo de elevación para configurar la antena. ¿Cuál es el valor correcto del ángulo?

### Options
- [ ] A) arctan(0,3)
- [x] A) arctan(0,3) <!-- feedback: tan(θ) = opuesto/adyacente = 150/500 = 0,3. Por lo tanto, θ = arctan(0,3) ≈ 16,7°. Esta es la expresión correcta del ángulo de elevación. -->
- [ ] B) arctan(3,33) <!-- feedback: Error al invertir la fracción. Se calcula 500/150 ≈ 3,33 en lugar de 150/500. -->
- [ ] C) arctan(5) <!-- feedback: Confusión con el recíproco. Se calcula 500/100 o similar. -->
- [ ] D) arcsen(0,3) <!-- feedback: Se usa arcsen en lugar de arctan. Si bien arcsen(150/500) ≠ arctan(150/500), este distractor muestra confusión sobre qué función inversa usar según el contexto. -->

### Explicación Pedagógica
La pregunta evalúa la capacidad de identificar la función trigonométrica inversa correcta. El distractor arctan(3,33) representa el error de inversión de fracciones, mientras que arcsen(0,3) evidencia confusión sobre cuándo usar cada función inversa.

---

## Question 16 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P2-trigonometria-013-MASTERY-v16`
**Bloom:** [Evaluate]
**ICFES:** [