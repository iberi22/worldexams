<think>
The user wants me to generate exactly 20 multiple-choice questions in ICFES Saber 11 format for Colombian Sciences Naturales, topic "ondas-sonido" (waves-sound), grade 11, period 3.

Let me follow the exact format requested:

1. First, I need to include the YAML frontmatter block
2. Then generate 20 questions with progressive difficulty:
   - Questions 1-4: D3-D4 (basic)
   - Questions 5-10: D5-D6 (intermediate)
   - Questions 11-16: D7-D8 (advanced)
   - Questions 17-20: D9-D10 (complex)

Let me create questions about waves and sound that are relevant to Colombian context.

Key concepts for ICFES waves-sound:
- Wave properties (wavelength, frequency, amplitude, period)
- Wave types (mechanical, electromagnetic, transverse, longitudinal)
- Sound properties and behavior
- Doppler effect
- Wave interference and superposition
- Reflection and refraction of waves
- Standing waves
- Resonance
- Speed of sound in different media

Let me create 20 well-crafted questions:

1. Basic wave properties
2. Basic sound concepts
3. Wave classification
4. Basic calculations
5-6. Intermediate wave behavior
7-10. More complex sound/wave analysis
11-16. Advanced analysis
17-20. Complex application problems

I'll make sure to:
- Include Colombian context where possible (Andean region, Caribbean coast, Amazon)
- Use real ICFES style
- Create plausible distractors based on common student errors
- Vary the competencies (interpretation, analysis, evaluation, etc.)
- Include proper feedback in options
- Add pedagogical explanation for each question

Let me write this out:

</think>

---
id: "CO-CIE-11-P3-ondas-sonido-076-MASTERY"
country: "colombia"
grado: 11
asignatura: "ciencias-naturales"
tema: "ondas-sonido"
periodo: 3
protocol_version: "5.1"
bundle_size: 20
bundle_index: 76
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2"
  model: "minimax/MiniMax-M2"
  timestamp: "2026-04-15T19:29:15.051817"
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

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Análisis de информации
**Context:** Fenómenos cotidianos en la vida rural colombiana

### Enunciado
Un joven-boyacá-boyacaense observa cómo las ondas en un lago se propagan después de que una piedra cae en el agua. Si la frecuencia de las ondas es de 2 Hz y la longitud de onda es de 0,5 m, ¿cuál es la velocidad de propagación de las ondas en el agua?

### Options
- [ ] A) 0,25 m/s
- [ ] B) 1 m/s <!-- feedback: Error al dividir frecuencia entre longitud de onda en lugar de multiplicar -->
- [x] C) 1 m/s <!-- feedback: Correcto: v = f × λ = 2 Hz × 0,5 m = 1 m/s -->
- [ ] D) 4 m/s <!-- feedback: Error al sumar frecuencia y longitud de onda -->

### Explicación Pedagógica
La velocidad de una onda se calcula mediante v = f × λ. Un error común es dividir en lugar de multiplicar, confundir la relación o realizar operaciones incorrectas con las unidades. La comprensión de la fórmula fundamental de ondas es esencial para el análisis de fenómenos ondulatorios.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Interpretación de condiciones
**Context:** instrumentOS musicales tradicionales de Colombia

### Enunciado
En un municipio de Santander, un artesano fabrica cucos (cucos tradicionales). Al tensar más la membrana del coco, ¿qué propiedad de la onda sonora produceda cambiará principalmente?

### Options
- [ ] A) La longitud de onda
- [ ] B) El período
- [x] C) La frecuencia <!-- feedback: Al aumentar la tensión, la膜 vibrante oscila más rápido, aumentando la frecuencia del sonido producido. Esto concuerda con la relación f = (1/2π)√(T/μ) para cuerdas y membranas. -->
- [ ] D) La amplitud <!-- feedback: La amplitud se relaciona con la intensidad, no directamente con la tensión en términos de frecuencia -->

### Explicación Pedagógica
La tensión en una membrana o cuerda vibrante aumenta la velocidad de oscilación, lo que produce una frecuencia más alta. Los estudiantes frecuentemente confunden frecuencia con amplitud o no reconocen que la tensión modifica la frecuencia fundamental.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Identificación de relaciones
**Context:** Comunicación en la selva del Chocó

### Enunciado
Un guía indigenous del Chocó biogeográfico quiere atravesar un río ancho para comunicarse con otro grupo. Si el agua del río tiene una corriente rápida, ¿cómo se verán afectadas las ondas de sonido que viajan paralelas a la superficie del agua?

### Options
- [ ] A) La velocidad del sonido aumentará significativamente
- [ ] B) El sonido se propagará más rápido corriente abajo y más lento corriente arriba
- [x] C) El movimiento del medio afecta la velocidad efectiva de propagación relative al observador <!-- feedback: Cuando el medio está en movimiento, la velocidad del sonido respecto a un observador en reposo se ve modificada. Este es el principio del efecto Doppler acústico generado por el movimiento del medio. -->
- [ ] D) No tendrá ningún efecto sobre la propagación del sonido

### Explicación Pedagógica
En un medio en movimiento, la velocidad del sonido respecto a un observador depende de la velocidad del medio. Este fenómeno es la base del efecto Doppler cuando tanto el observador como la fuente están en movimiento relativo al medio. Los estudiantes a menudo olvidan que el sonido necesita un medio de propagación.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Análisis de información
**Context:** Sistemas de alertas tempranas en la zona andina

### Enunciado
Un sistema de monitoreo volcánico en el Eje Cafetero detecta ondas sísmicas. Si la frecuencia de las ondas P (primarias) es de 5 Hz y se propagan con una velocidad de 8 km/s a través de las capas geológicas, ¿cuál es la longitud de onda de estas ondas?

### Options
- [ ] A) 0,625 km
- [ ] B) 1,6 km
- [x] C) 1,6 km <!-- feedback: Correcto: λ = v/f = 8 km/s / 5 Hz = 1,6 km. La onda sísmica recorre 1,6 km por cada ciclo. -->
- [ ] D) 40 km <!-- feedback: Error de cálculo: 8 × 5 = 40, confundiendo velocidad con distancia recorrida en un período -->

### Explicación Pedagógica
El cálculo de longitud de onda a partir de velocidad y frecuencia (λ = v/f) es fundamental. El error común es invertir la fórmula o realizar conversiones incorrectas de unidades. En contextos geofísicos, es crucial mantener consistencia en las unidades.

---

## Question 5 (Variant Medium - Difficulty D5)

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v5`
**Bloom:** Understand
**ICFES:** Evaluación de relaciones
**Context:** Infraestructura vial en Colombia

### Enunciado
En la construcción de un puente sobre el río Magdalena, los ingenieros utilizan análisis de vibraciones para detectar posibles resonancias. Si una fuerza periódica tiene una frecuencia cercana a la frecuencia natural del puente, ¿qué fenómeno ondulatorio podría causar daños estructurales?

### Options
- [ ] A) Reflexión
- [x] B) Resonancia <!-- feedback: Cuando la frecuencia de una fuerza externa coincide con la frecuencia natural de un sistema, la amplitud de las oscilaciones aumenta significativamente, causando resonancia. Este fenómeno ha causado colapsos de puentes en la historia. -->
- [ ] C) Difracción
- [ ] D) Polarización <!-- feedback: La polarización no aplica directamente a ondas mecánicas transversales en estructuras -->

### Explicación Pedagógica
La resonancia ocurre cuando la frecuencia de excitación coincide con la frecuencia natural del sistema, causando transferencia máxima de energía. Es fundamental en ingeniería estructural y ha sido responsable de colapsos históricos (Puente de Tacoma Narrows). Los estudiantes deben entender que no todas las ondas causan resonancia.

---

## Question 6 (Variant Medium - Difficulty D5)

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Interpretación de situaciones
**Context:** Música tradicional andina - tiple y bandola

### Enunciado
Un músico de bambuco en Antioquia rasga una cuerda de tiple que tiene una longitud de 0,4 m. Si la velocidad de la onda en la cuerda es de 240 m/s, ¿Cuál es la frecuencia del sonido fundamental producedo?

### Options
- [ ] A) 100 Hz
- [ ] B) 600 Hz
- [x] C) 300 Hz <!-- feedback: Correcto: Para el modo fundamental, λ = 2L = 0,8 m. Entonces f = v/λ = 240/0,8 = 300 Hz. La longitud de onda del fundamental es el doble de la longitud de la cuerda. -->
- [ ] D) 150 Hz <!-- feedback: Error común: usar λ = L directamente en lugar de λ = 2L para el primer armónico -->

### Explicación Pedagógica
Para una cuerda con ambos extremos fijos, el armónico fundamental tiene una longitud de onda igual al doble de la longitud de la cuerda. Un error frecuente es usar directamente la longitud de la cuerda como longitud de onda, sin considerar las condiciones de frontera.

---

## Question 7 (Variant Medium - Difficulty D5)

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Análisis de información
**Context:** Ecología acústica en el Páramo de Sumapaz

### Enunciado
Un investigador del páramo de Sumapaz registra los sonidos emittedos por anfibios endémicos. El gráfico muestra la variación de presión versus tiempo para dos sonidos diferentes. Si ambas ondas tienen la misma amplitud pero diferente frecuencia, ¿cómo se relaciona el número de ciclos por unidad de tiempo?

### Options
- [ ] A) El sonido con mayor frecuencia tendrá menos ciclos en el mismo intervalo de tiempo
- [x] B) El sonido con mayor frecuencia tendrá más ciclos en el mismo intervalo de tiempo <!-- feedback: La frecuencia mide el número de ciclos por unidad de tiempo. Mayor frecuencia = más ciclos en el mismo período. -->
- [ ] C) La frecuencia no está relacionada con el número de ciclos
- [ ] D) Ambos sonidos tendrán el mismo número de ciclos independientemente de su frecuencia

### Explicación Pedagógica
La frecuencia es, por definición, el número de oscilaciones o ciclos completos por unidad de tiempo. Este concepto es fundamental pero a menudo confundido con otras propiedades ondulatorias. La representación gráfica de una onda permite visualizar directamente esta relación.

---

## Question 8 (Variant Medium - Difficulty D6)

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v8`
**Bloom:** Understand
**ICFES:** Análisis de información
**Context:** Acústica en templos coloniales de Cartagena

### Enunciado
En la catedral de Cartagena de Indias, un guía explica que las ondas sonoras pueden sufrir eco y reverberación. ¿Cuál es la diferencia fundamental entre estos dos fenómenos?

### Options
- [ ] A) El eco ocurre solo con frecuencias altas, la reverberación solo con frecuencias bajas
- [ ] B) El eco requiere un obstáculo reflectante, mientras que la reverberación no lo requiere
- [x] C) El eco permite distinguir el sonido original del reflejado porque hay un intervalo temporal perceptible, mientras que la reverberación superpone múltiples reflexiones indistinguibles <!-- feedback: El eco requiere que el intervalo entre sonido directo y reflejado sea mayor a 0,1 s, permitiendo percibirlos como sonidos separados. La reverberación ocurre cuando las reflexiones llegan tan rápido que se superponen. -->
- [ ] D) La reverberación es un tipo de absorción, no de reflexión

### Explicación Pedagógica
El eco y la reverberación son ambos fenómenos de reflexión, pero difieren en el intervalo temporal entre el sonido directo y las reflexiones. Los estudiantes frecuentemente confunden ambos fenómenos o no comprenden que ambos involucran reflexión de ondas.

---

## Question 9 (Variant Medium - Difficulty D6)

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Interpretación de situaciones
**Context:** Industria salmonera en el Altiplano Cundiboyacense

### Enunciado
Un tanque de cultivo de trucha en Villavicencio tiene una profundidad de 2 m. Si se golpea el tanque, las ondas generadas en el agua tienen una velocidad de 1.480 m/s. ¿Cuál es la frecuencia de las ondas que tienen una longitud de onda de 0,74 m?

### Options
- [ ] A) 1.000 Hz
- [x] B) 2.000 Hz <!-- feedback: Correcto: f = v/λ = 1480/0,74 = 2000 Hz. Este valor está dentro del rango audible humano. -->
- [ ] C) 500 Hz <!-- feedback: Error al invertir la fórmula: f = λ/v = 0,74/1480 -->
- [ ] D) 4.000 Hz

### Explicación Pedagógica
El cálculo de frecuencia usando la relación fundamental f = v/λ es directo. Los errores comunes incluyen invertir la fórmula o realizar cálculos aritméticos incorrectos. Este problema también conecta la física con aplicaciones prácticas en la industria.

---

## Question 10 (Variant Medium - Difficulty D6)

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Evaluación de condiciones
**Context:** Redes de comunicación en los Andes

### Enunciado
Una torre de telecomunicaciones en Rionegro, Antioquia, emite ondas electromagnéticas con una frecuencia de 700 MHz. Si estas ondas se propagan a la velocidad de la luz (3 × 10⁸ m/s), ¿cuál es la longitud de onda de la señal?

### Options
- [ ] A) 0,43 m
- [x] B) 0,43 m <!-- feedback: Correcto: λ = c/f = (3×10⁸)/(700×10⁶) = 3/0,7 ≈ 0,43 m. Esta es una onda decimétrica típica de comunicaciones móviles. -->
- [ ] C) 4,3 m
- [ ] D) 2,1 × 10¹⁷ m

### Explicación Pedagógica
El cálculo de longitud de onda para ondas electromagnéticas sigue la misma relación λ = c/f. La conversión de MHz a Hz (multiplicar por 10⁶) es crucial. Errores comunes incluyen no convertir unidades o confundir prefixes metric.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Análisis de información
**Context:** Gestión de riesgo en la Sierra Nevada de Santa Marta

### Enunciado
Un sistema de alertas tempranas en la Sierra Nevada detecta una onda sonora traveling hacia un précipicio. Cuando la onda encuentra el precipicio, ¿qué fenómeno explica que la onda pueda pasar la esquina del precipicio y ser hearda del otro lado, incluso cuando no hay línea de visión directa?

### Options
- [ ] A) Reflexión
- [ ] B) Refracción
- [x] C) Difracción <!-- feedback: La difracción es el fenómeno por el cual las ondas se extienden al pasar por una abertura o alrededor de obstáculos. Este fenómeno explica por qué el sonido puede "doblar" esquinas y llegar a zonas de sombra acústica. -->
- [ ] D) Absorción

### Explicación Pedagógica
La difracción permite que las ondas绕过 obstáculos y se propaguen hacia regiones que no están en línea de visión directa. Este fenómeno es más pronunciado cuando la longitud de onda es comparable al tamaño del obstáculo. En acústica, explica por qué podemos escuchar sonidos aunque haya paredes intermedias.

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Interpretación de situaciones
**Context:** Estudios de movilidad en Bogotá

### Enunciado
Una ambulancia con la sirena activada se acerca a un puente en Bogotá mientras un conmemoropeat (peatón) camina hacia la ambulancia. Si la sirena tiene una frecuencia de 500 Hz y la velocidad del sonido en el aire es 343 m/s, ¿qué fenómeno explica el cambio en la frecuencia percibida por el peatón cuando la ambulancia pasa?

### Options
- [ ] A) Interferencia destructiva
- [ ] B) Efecto fotoeléctrico
- [x] C) Efecto Doppler <!-- feedback: El efecto Doppler causa que la frecuencia percibida sea mayor cuando la fuente se acerca al observador y menor cuando se aleja, respecto a la frecuencia real de la fuente. -->
- [ ] D) resonancia acústica

### Explicación Pedagógica
El efecto Doppler es fundamental para entender fenómenos cotidianos como sirenas de emergencia, radar de velocidad y astronomía. La frecuencia percibida depende de las velocidades relativas del observador y la fuente respecto al medio (el aire). Este fenómeno no depende de interferencia o resonancia.

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v13`
**Bloom:** Evaluate
**ICFES:** Análisis de relaciones
**Context:** Música de marimba en el Pacífico colombiano

### Enunciado
En un conjunto de marimba de chonta en el Chocó, lasvarillas de diferentes longitudes producen sonidos de diferentes tonos. Si una varilla más corta produce un tono más agudo (mayor frecuencia), ¿cómo se relaciona la longitud de la varilla con la frecuencia del sonido producedo?

### Options
- [ ] A) La frecuencia es directamente proporcional a la longitud
- [ ] B) La frecuencia es independiente de la longitud
- [x] C) La frecuencia es inversamente proporcional a la longitud <!-- feedback: Para sistemas vibratorios como varillas, la frecuencia fundamental disminuye al aumentar la longitud. Sistemas más largos tienen menor frecuencia natural. -->
- [ ] D) La frecuencia depende solo del material, no de la geometría

### Explicación Pedagógica
En sistemas vibratorios onde la masa y la elasticidad determinan la frecuencia natural, longitudes mayores generalmente producen frecuencias menores. Este principio aplica a cuerdas, varillas, tubos y otros sistemas. Los estudiantes deben distinguir entre las diferentes relaciones de frecuencia en distintos sistemas físicos.

---

## Question 14 (Variant Advanced - Difficulty D8)

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Análisis de información
**Context:** Estudios oceanográficos en el Caribe colombiano

### Enunciado
Un investigador del Instituto de Investigaciones Marinas de Colombia estudia las ondas en el Mar Caribe. Si la velocidad de las olas aumenta de 4 m/s a 8 m/s mientras se acercan a la costa, permaneciendo la frecuencia constante, ¿qué sucede con la longitud de onda?

### Options
- [ ] A) Se reduce a la mitad
- [x] B) Se duplica <!-- feedback: Como v = fλ y f es constante, si v se duplica, λ también se duplica. Esto es consistente con las olas marinas que se hacen más largas al acercarse a la costa donde la profundidad disminuye. -->
- [ ] C) Permanece constante
- [ ] D) Se cuadruplica

### Explicación Pedagógica
La relación v = fλ implica que si la frecuencia permanece constante, la longitud de onda es directamente proporcional a la velocidad. En el caso de olas acercándose a la costa, la reducción de profundidad causa un aumento en velocidad, y por lo tanto, un aumento en longitud de onda.

---

## Question 15 (Variant Advanced - Difficulty D8)

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Interpretación de situaciones
**Context:** Diagnóstico médico por ultrasonido en hospitales de Colombia

### Enunciado
En un hospital de Medellín, un equipo de ultrasonido emite ondas con frecuencia de 3 MHz hacia un tejido. Si la velocidad del sonido en el tejido es de 1.500 m/s, ¿Cuál es la longitud de onda en el tejido?

### Options
- [ ] A) 0,5 × 10⁻³ m
- [ ] B) 2 × 10⁻³ m
- [x] C) 0,5 × 10⁻³ m <!-- feedback: Correcto: λ = v/f = 1500/(3×10⁶) = 0,5×10⁻³ m = 0,5 mm. Este orden de magnitud es típico para imágenes por ultrasonido de alta resolución. -->
- [ ] D) 5 × 10⁻³ m

### Explicación Pedagógica
El ultrasonido médico usa frecuencias muy altas para obtener buena resolución espacial. La longitud de onda determina el límite de detalle que puede resolverse. Este problema combina la aplicación de la ecuación de ondas con contextos tecnológicos y médicos relevantes.

---

## Question 16 (Variant Advanced - Difficulty D8)

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Análisis de información
**Context:** Acústica de teatros coloniales en Popayán

### Enunciado
En el teatro Guillermo Valencia en Popayán, un arquitecto acústico analiza cómo las ondas sonoras se reflejan en las paredes. Si una onda sonora incide sobre una superficie con un ángulo de 30° respecto a la normal, ¿con qué ángulo se reflectará la onda?

### Options
- [ ] A) 15°
- [x] B) 30° <!-- feedback: Según la ley de la reflexión, el ángulo de reflexión es igual al ángulo de incidencia. Por lo tanto, ambas son 30°. -->
- [ ] C) 60°
- [ ] D) 90°

### Explicación Pedagógica
La ley de la reflexión establece que el ángulo de incidencia es igual al ángulo de reflexión, ambos medidos respecto a la normal. Este principio es fundamental en diseño acústico y optimización de espacios para audiencia. Los errores comunes incluyen confundir ángulo con ángulo respecto a la superficie.

---

## Question 17 (Variant Complex - Difficulty D9)

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Análisis de información
**Context:** Estudios de impacto ambiental en projetos extractivos en la Amazonia

### Enunciado
Un estudio ambiental en Putumayo analiza cómo el ruido de maquinaria pesada afecta la comunicación de delfines rosados en el río putumayo. Si la maquinaria produce un sonido de 140 dB y los delfines pueden detectar sonidos de 40 dB, ¿cuál es la reducción en decibeles necesaria para que el sonido alcance el umbral de detección de los delfines en el agua?

### Options
- [ ] A) 100 dB
- [x] B) 100 dB <!-- feedback: La diferencia es 140 dB - 40 dB = 100 dB. En la escala logarítmica de decibelios, la diferencia representa el número de unidades. Sin embargo, en la práctica, atenuaciones de más de 80 dB son extremadamente difíciles de lograr. -->
- [ ] C) 10 dB
- [ ] D) 140 dB

### Explicación Pedagógica
La escala de decibeles es logarítmica: cada 10 dB representa un factor de 10 en intensidad. La resta de valores de dB representa el factor de reducción necesario. Sin embargo, la pregunta indaga sobre la diferencia teórica, que es simplemente la resta algebraica de los valores.

---

## Question 18 (Variant Complex - Difficulty D9)

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v18`
**Bloom:** Apply
**ICFES:** Interpretación de situaciones
**Context:** Comunicaciones en la exploración de hidrocarburos en la Orinoquía

### Enunciado
Una empresa de exploración petrolera en los LLanos Orientales utiliza ondas sísmicas para detectar estructuras geológicas. Si las ondas sísmicas tienen una frecuencia de 25 Hz y deben atravesar capas de roca con velocidades promedio de 2.000 m/s, 3.500 m/s y 5.000 m/s, ¿en cuál capa la longitud de onda es mayor?

### Options
- [ ] A) En la capa de 2.000 m/s, porque tiene la menor velocidad
- [x] B) En la capa de 5.000 m/s, porque mayor velocidad con frecuencia constante produce mayor longitud de onda <!-- feedback: λ = v/f. Como f es constante (25 Hz), a mayor velocidad, mayor longitud de onda. La capa con v = 5000 m/s tiene λ = 200 m, la mayor de todas. -->
- [ ] C) En la capa de 3.500 m/s, porque es un valor intermedio
- [ ] D) Todas tendrán la misma longitud de onda porque la frecuencia es la misma

### Explicación Pedagógica
La relación λ = v/f muestra que, con frecuencia constante, la longitud de onda es directamente proporcional a la velocidad. En geofísica sísmica, diferentes capas geológicas pueden identificarse por sus velocidades de propagación, lo que afecta la longitud de onda correspondiente.

---

## Question 19 (Variant Complex - Difficulty D10)

**ID:** `CO-CIE-11-P3-ondas-sonido-076-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Análisis de relaciones
**Context:** Física del sonido en la música tropical colombiana

### Enunciado
En una salsa bar en Cali, dos ondas sonoras de frecuencias ligeramente diferentes (f₁ = 440 Hz y f₂ = 442 Hz) interfieren. ¿Cuál es la frecuencia del batimiento (pulsación)
