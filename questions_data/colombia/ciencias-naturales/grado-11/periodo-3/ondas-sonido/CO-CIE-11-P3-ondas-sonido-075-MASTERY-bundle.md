<think>
The user wants me to generate 20 ICFES-style multiple choice questions for Colombian Sciences Naturales (Natural Sciences) about waves and sound, for grade 11, period 3. I need to follow the exact format specified with YAML frontmatter and then 20 questions with progressive difficulty.

Let me generate these questions with proper difficulty progression:
- Questions 1-4: Difficulty D3-D4 (Remember, Understand)
- Questions 5-10: Difficulty D5-D6 (Apply, Analyze)
- Questions 11-16: Difficulty D7-D8 (Analyze, Evaluate)
- Questions 17-20: Difficulty D9-D10 (Evaluate, Create)

The questions should be in Spanish, aligned with ICFES Saber 11 style, with Colombian contexts, covering waves and sound topics.

Wave and sound topics to cover:
- Wave properties (wavelength, frequency, period, amplitude)
- Wave types (mechanical/electromagnetic, longitudinal/transverse)
- Sound properties (intensity, pitch, timbre)
- Sound propagation (speed in different media)
- Reflection, refraction, diffraction
- Doppler effect
- Standing waves
- Sound intensity and decibels
- Ultrasound applications in Colombia

Let me create these 20 questions now.
</think>

```yaml
---
id: "CO-CIE-11-P3-ondas-sonido-075-MASTERY"
country: "colombia"
grado: 11
asignatura: "ciencias-naturales"
tema: "ondas-sonido"
periodo: 3
protocol_version: "5.1"
bundle_size: 20
bundle_index: 75
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T19:27:34.964221"
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
```

## Question 1 (Variant Basic - Difficulty D3)

**ID:** `CO-CIE-11-P3-ondas-sonido-075-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Identifico características del movimiento ondulatorio
**Context:** Fenómenos cotidianos en entornos colombianos

### Enunciado
En una playa del Caribe colombiano, un turista observa las olas del mar acercándose a la orilla con un patrón repetitivo. Si la distancia entre dos crestas sucesivas de ola es de 4 metros y en un minuto pasan 30 crestas por un punto fijo, ¿cuál es la frecuencia y la longitud de onda de estas olas?

### Options
- [ ] A) Frecuencia = 0,5 Hz; Longitud de onda = 4 m
- [ ] B) Frecuencia = 30 Hz; Longitud de onda = 4 m
- [x] C) Frecuencia = 0,5 Hz; Longitud de onda = 4 m <!-- feedback: Frecuencia = 30 crestas/minuto = 0,5 Hz (30/60). La distancia entre crestas es por definición la longitud de onda = 4 m. -->
- [ ] D) Frecuencia = 0,5 Hz; Longitud de onda = 2 m <!-- feedback: La longitud de onda es directamente la distancia entre crestas sucesivas, no la mitad. -->

### Explicación Pedagógica
La frecuencia se calcula dividiendo el número de eventos (crestas) entre el tiempo en segundos: 30/60 = 0,5 Hz. La longitud de onda (λ) es por definición la distancia entre dos puntos consecutivos en fase, como crestas sucesivas, que es 4 m. Un error común es confundir la mitad de la distancia entre crestas con la longitud de onda completa.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-CIE-11-P3-ondas-sonido-075-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Reconozco tipos de ondas en situaciones reales
**Context:** Comunicación y tecnología en Colombia

### Enunciado
En un experimento de laboratorio en Bogotá, un estudiante分类ifica diferentes fenómenos ondulatorios. Relaciona correctamente: Onda de radio FM (1), Onda de sonido en el aire (2), Onda de luz visible (3), Onda sísmica en la corteza (4). ¿Cuál de las siguientes opciones presenta correctamente las ondas clasificadas como mecánica y electromagnética?

### Options
- [ ] A) Mecánica: 1 y 2; Electromagnética: 3 y 4
- [ ] B) Mecánica: 2 y 4; Electromagnética: 1 y 3 <!-- feedback: Correcto. Las ondas de sonido son mecánicas (requieren medio material) y las ondas de radio FM y luz visible son electromagnéticas. -->
- [x] C) Mecánica: 2 y 4; Electromagnética: 1 y 3 <!-- feedback: Las ondas sonoras y sísmicas requieren medio material para propagarse (mecánicas), mientras que las ondas de radio y luz no lo requieren (electromagnéticas). -->
- [ ] D) Mecánica: 1 y 3; Electromagnética: 2 y 4

### Explicación Pedagógica
Las ondas mecánicas necesitan un medio material para propagarse (sonido requiere aire, las ondas sísmicas requieren la Tierra). Las ondas electromagnéticas pueden viajar en el vacío (ondas de radio y luz). Confundir ambos tipos es un error frecuente.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P3-ondas-sonido-075-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Comprendo relaciones entre variables de ondas
**Context:** Construcción y seguridad en Colombia

### Enunciado
Un ingeniero de sonido trabaja en el diseño acústico de una estación del sistema integrado de transporte de Bogotá. Necesita calcular la velocidad de una onda de sonido que se propaga en el aire a 25°C. Si sabe que la velocidad del sonido en el aire a 0°C es 331 m/s y que aumenta aproximadamente 0,6 m/s por cada grado Celsius, ¿cuál es el valor correcto?

### Options
- [ ] A) 331 m/s
- [ ] B) 346 m/s
- [x] C) 346 m/s <!-- feedback: v = 331 + (0,6 × 25) = 331 + 15 = 346 m/s. El incremento es proporcional a la temperatura. -->
- [ ] D) 361 m/s

### Explicación Pedagógica
La velocidad del sonido aumenta con la temperatura porque las moléculas del aire tienen mayor energía cinética y chocan más frecuentemente. El cálculo directo es: 331 + (0,6 × 25) = 346 m/s. Error común: no realizar la multiplicación o confundir la relación directa con una inversa.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P3-ondas-sonido-075-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Identifico propiedades del sonido (intensidad, tono, timbre)
**Context:** Música tradicional colombiana

### Enunciado
En un festival de música vallenata en Valledupar, un cantante interpreta una nota musical mientras otro canta la misma nota pero con mayor "volumen". ¿Cuál propiedad del sonido está variando principalmente?

### Options
- [ ] A) Frecuencia
- [ ] B) Longitud de onda
- [x] C) Amplitud <!-- feedback: El "volumen" o sonoridad percibida está directamente relacionado con la amplitud de la onda sonora. Mayor amplitud = mayor intensidad = sonido más fuerte. -->
- [ ] D) Velocidad de propagación

### Explicación Pedagógica
La sonoridad (volumen) percibida depende principalmente de la amplitud de la onda sonora. Mayor amplitud genera mayor presión sobre el tímpano, percibiéndose como sonido más fuerte. Frecuencia determina el tono (más grave o agudo). Error común: asociar "nota sama" con frecuencia cuando lo que cambia es la intensidad.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P3-ondas-sonido-075-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Aplico la ecuación fundamental de ondas
**Context:** Tecnología de comunicaciones en Colombia

### Enunciado
Una estación de radio en Medellín transmite en FM a una frecuencia de 100 MHz. Si la velocidad de la luz es 3×10⁸ m/s, ¿cuál es la longitud de onda de esta onda electromagnética?

### Options
- [ ] A) 0,3 m
- [ ] B) 3 m
- [x] B) 3 m <!-- feedback: λ = v/f = (3×10⁸ m/s)/(100×10⁶ Hz) = 3 m. La ecuación fundamental v = λf se aplica también a ondas electromagnéticas. -->
- [ ] C) 30 m
- [ ] D) 300 m

### Explicación Pedagógica
Usando v = λf, despejamos λ = v/f. Con v = 3×10⁸ m/s y f = 100×10⁶ Hz, obtenemos λ = 3 m. Error frecuente: no convertir correctamente los MHz a Hz o confundir la fórmula con otras expresiones de ondas.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P3-ondas-sonido-075-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Aplico conceptos de reflexión y eco en contextos reales
**Context:** Ecografía médica en Colombia

### Enunciado
En un hospital de Cali se utiliza ultrasonido diagnóstico con frecuencia de 3 MHz para examinar un órgano. Si la velocidad del sonido en tejidos blandos es aproximadamente 1540 m/s, ¿cuál es la longitud de onda utilizada?

### Options
- [ ] A) 0,51 mm
- [ ] B) 5,1 mm
- [x] C) 0,51 mm <!-- feedback: λ = v/f = 1540 m/s / (3×10⁶ Hz) = 0,000513 m = 0,51 mm. Ondas de alta frecuencia tienen longitudes de onda muy pequeñas, permitiendo mejor resolución. -->
- [ ] D) 51 mm

### Explicación Pedagógica
Longitudes de onda pequeñas permiten mejor resolución en imágenes de ultrasonido. El cálculo requiere convertir MHz a Hz correctamente: 3 MHz = 3×10⁶ Hz. Error común: no convertir las unidades o realizar cálculos con exponentes incorrectos.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P3-ondas-sonido-075-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Resuelvo problemas de propagación del sonido
**Context:** Tormentas eléctricas en los Llanos Orientales

### Enunciado
Un pastor en los Llanos Orientales observa un rayo y 5 segundos después escucha el trueno. Sabiendo que la velocidad del sonido en el aire es 340 m/s, ¿a qué distancia aproximada cayó el rayo?

### Options
- [ ] A) 340 m
- [ ] B) 680 m
- [x] C) 1700 m <!-- feedback: d = v × t = 340 m/s × 5 s = 1700 m. La luz del rayo se ve prácticamente instantáneamente, mientras el sonido tarda 5 segundos. -->
- [ ] D) 170 m

### Explicación Pedagógica
La distancia se calcula directamente con d = v × t. La velocidad del sonido en aire es 340 m/s. Error frecuente: dividir en lugar de multiplicar o confundir el tiempo de retardo con la distancia real.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P3-ondas-sonido-075-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Analizo la relación entre frecuencia y percepción auditiva
**Context:** Industria musical y tecnología en Bogotá

### Enunciado
Un joven bogotano usa auriculares con un reproductor que puede generar tonos desde 20 Hz hasta 20.000 Hz. ¿Cuál afirmación es correcta respecto al rango audible del ser humano?

### Options
- [ ] A) 20 Hz es un tono ultra-agudo y 20.000 Hz es un tono infra-sonoro
- [ ] B) El rango audible completo está entre 20 Hz y 20.000 Hz, donde frecuencias menores son infrasonido y mayores ultrasonido
- [x] B) El rango audible completo está entre 20 Hz y 20.000 Hz, donde frecuencias menores son infrasonido y mayores ultrasonido <!-- feedback: Correcto. Frecuencias menores de 20 Hz son infrasonido (no audibles), mayores de 20.000 Hz son ultrasonido (no audibles para humanos). -->
- [ ] C) 20 Hz y 20.000 Hz están ambos fuera del rango audible
- [ ] D) Solo las frecuencias entre 1000 Hz y 5000 Hz son audibles

### Explicación Pedagógica
El rango audible humano convencionalmente está entre 20 Hz y 20.000 Hz. Frecuencias menores son infrasonido (usado en sismología) y mayores son ultrasonido (usado en medicina). Error común: no conocer los límites exactos o invertirlos.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P3-ondas-sonido-075-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Analizo fenómenos ondulatorios (Doppler)
**Context:** Control de velocidad en carreteras colombianas

### Enunciado
Un policía de tránsito en la Vía al Llano usa un radar que emite microondas con frecuencia de 10 GHz hacia un vehículo que se acerca. El radar recibe la onda reflejada con frecuencia de 10.010 GHz. Si la velocidad de la luz es 3×10⁸ m/s, ¿cuál es la velocidad aproximada del vehículo?

### Options
- [ ] A) 30 m/s (108 km/h)
- [ ] B) 150 m/s (540 km/h)
- [x] C) 150 m/s (540 km/h) <!-- feedback: Δf/f = 2v/c (efecto Doppler), entonces v = (Δf × c)/(2f) = (0,01×10⁹ × 3×10⁸)/(2×10×10⁹) ≈ 150 m/s. Error posible: no aplicar el factor 2 del reflejo. -->
- [ ] D) 300 m/s (1080 km/h)

### Explicación Pedagógica
El efecto Doppler para radar (movimiento relativo) usa Δf/f = 2v/c, donde el factor 2 aparece porque la onda se refleja. Despejando: v = (Δf × c)/(2f). Error frecuente: omitir el factor 2 o no manejar correctamente las unidades GHz.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P3-ondas-sonido-075-MASTERY-v10`
**Bloom:** Analyze
**ICFES:** Comparo propagación del sonido en diferentes medios
**Context:** Buceo en el Caribe colombiano y océano Pacífico

### Enunciado
Un buzo en el Parque Nacional Natural Tayrona quiere comunicarse por señales sonoras underwater. Sabe que la velocidad del sonido en el agua de mar es aproximadamente 1500 m/s, mientras que en el aire es 340 m/s. ¿Cuál de las siguientes afirmaciones es correcta?

### Options
- [ ] A) El sonido recorre mayor distancia en el aire porque las moléculas están más separadas
- [ ] B) El sonido viaja más rápido en el agua porque las moléculas están más cerca y transmiten la perturbación más eficientemente
- [x] B) El sonido viaja más rápido en el agua porque las moléculas están más cerca y transmiten la perturbación más eficientemente <!-- feedback: En medios más densos y con mayor módulo de elasticidad, la velocidad del sonido aumenta. El agua es más densa que el aire y transmite mejor la onda. -->
- [ ] C) El sonido recorre la misma distancia en ambos medios en el mismo tiempo
- [ ] D) En el vacío, el sonido viajaría más rápido que en el agua

### Explicación Pedagógica
La velocidad del sonido depende de la densidad del medio y del módulo de elasticidad. En general, medios más rígidos y densos transmiten mejor las ondas mecánicas. Error común: pensar que mayor separación molecular facilita la transmisión.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P3-ondas-sonido-075-MASTERY-v11`
**Bloom:** Evaluate
**ICFES:** Evalúo aplicaciones del efecto Doppler en Colombia
**Context:** Medicina diagnóstica y astronomía en Colombia

### Enunciado
Un médico cardiólogo en Bucaramanga utiliza ultrasonido Doppler para medir la velocidad del flujo sanguíneo. Si la frecuencia del ultrasonido es 5 MHz, la velocidad del sonido en tejido es 1540 m/s, y el corrimiento Doppler es 2 kHz, ¿cuál es aproximadamente la velocidad de la sangre? (Considere que la sangre se aleja del transductor)

### Options
- [ ] A) 0,31 m/s
- [ ] B) 0,62 m/s
- [x] C) 0,62 m/s <!-- feedback: fD = 2(v/c)f₀cosθ ≈ 2(v/1540)(5×10⁶), despejando v ≈ 0,62 m/s. El factor 2 considera que la onda se refleja en eritrocitos en movimiento. -->
- [ ] D) 1,24 m/s

### Explicación Pedagógica
En ecografía Doppler, el corrimiento de frecuencia es proporcional a la velocidad del flujo. El factor 2 aparece porque hay un movimiento relativo doble (onda incidente + onda reflejada). Error frecuente: no incluir el factor 2 en el cálculo.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P3-ondas-sonido-075-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Evalúo niveles de intensidad sonora y sus efectos
**Context:** Contaminación acústica en centros urbanos colombianos

### Enunciado
El nivel de intensidad sonora en una discoteca en Medellín alcanza 100 dB, mientras que una conversación normal en una oficina es de 60 dB. ¿Cuántas veces mayor es la intensidad del sonido en la discoteca comparada con la conversación?

### Options
- [ ] A) 40 veces
- [ ] B) 100 veces
- [x] C) 10.000 veces <!-- feedback: β = 10 log(I/I₀), entonces Δβ = 40 dB = 10 log(I₁/I₂). Entonces I₁/I₂ = 10^(40/10) = 10⁴ = 10.000. Cada 10 dB representa un factor de 10 en intensidad. -->
- [ ] D) 1.000.000 veces

### Explicación Pedagógica
La escala de decibelios es logarítmica: cada 10 dB representan un factor de 10 en intensidad. 40 dB de diferencia = 4 factores de 10 = 10⁴. Error común: pensar que 40 dB de diferencia = 40 veces más intensidad (error lineal vs logarítmico).

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P3-ondas-sonido-075-MASTERY-v13`
**Bloom:** Evaluate
**ICFES:** Evalúo condiciones para formación de ondas estacionarias
**Context:** Instrumentos musicales tradicionales colombianos

### Enunciado
Un estudiante de música en lbagué construye una cuerda de guitarra de 1 metro de largo, fija en ambos extremos. Si desea que la nota fundamental tenga una frecuencia de 440 Hz (La estándar), ¿cuál debe ser la velocidad de propagación de la onda en la cuerda?

### Options
- [ ] A) 220 m/s
- [ ] B) 440 m/s
- [x] C) 880 m/s <!-- feedback: Para cuerda fija en ambos extremos, f₁ = v/(2L). Despejando: v = f₁ × 2L = 440 Hz × 2(1 m) = 880 m/s. El modo fundamental tiene media longitud de onda en la cuerda. -->
- [ ] D) 1760 m/s

### Explicación Pedagógica
En ondas estacionarias en cuerdas con extremos fijos, el modo fundamental (primer armónico) tiene longitud de onda λ = 2L. Usando v = λf, v = 2Lf. Error frecuente: usar L en lugar de 2L o confundir con tubo abierto.

---

## Question 14 (Variant Basic - Difficulty D8)

**ID:** `CO-CIE-11-P3-ondas-sonido-075-MASTERY-v14`
**Bloom:** Evaluate
**ICFES:** Evalúo el fenómeno de difracción del sonido
**Context:** Acústica arquitectónica en teatros colombianos

### Enunciado
En el Teatro Colón de Bogotá, un arquitecto debe diseñar la distribución de butacas considerando que el sonido puede rodear obstáculos. Si la longitud de onda del sonido es 1 m y una butaca tiene 0,5 m de ancho, ¿qué fenómeno acústico esperaría observar?

### Options
- [ ] A) Difracción mínima, la butaca blockingá completamente el sonido
- [ ] B) Difracción significativa, el sonido rodeará la butaca porque λ ≈ tamaño del obstáculo
- [x] C) Difracción significativa, el sonido rodeará la butaca porque λ ≈ tamaño del obstáculo <!-- feedback: La difracción es notable cuando λ es del orden o mayor que el tamaño del obstáculo. Con λ = 1 m y obstáculo de 0,5 m, la difracción será apreciable. -->
- [ ] D) Reflexión total, el sonido rebotará completamente

### Explicación Pedagógica
La difracción ocurre cuando una onda encuentra un obstáculo de tamaño comparable a su longitud de onda. Cuando λ ≥ obstáculo, las ondas se esparcen significativamente. Error común: pensar que objetos pequeños siempre bloquean completamente el sonido.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-CIE-11-P3-ondas-sonido-075-MASTERY-v15`
**Bloom:** Analyze
**ICFES:** Analizo la relación entre timbre y espectro armónico
**Context:** Análisis de instrumentos andinos colombianos

### Enunciado
Dos estudiantes en Calianalizan el sonido de una flute de millo (instrumento de viento tradicional) y un piano reproduciendo la misma nota musical. Si ambos instrumentos producen la misma frecuencia fundamental (tono), ¿por qué percibimos sonidos diferentes (timbre)?

### Options
- [ ] A) Porque tienen diferente amplitud de onda
- [ ] B) Porque tienen diferente velocidad de propagación
- [x] C) Porque tienen diferentes armónicos (sobretonos) superimposed sobre la frecuencia fundamental <!-- feedback: El timbre depende de la mezcla única de armónicos y sus amplitudes relativas. Cada instrumento tiene un patrón distintivo de armónicos que lo caracteriza. -->
- [ ] D) Porque tienen diferente longitud de onda

### Explicación Pedagógica
El timbre es la cualidad que permite diferenciar fuentes sonoras con igual frecuencia fundamental. Depende del espectro de frecuencias (armónicos presentes y sus amplitudes). Error común: confundir timbre con intensidad o frecuencia.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-CIE-11-P3-ondas-sonido-075-MASTERY-v16`
**Bloom:** Evaluate
**ICFES:** Evalúo el principio de superposición e interferencia
**Context:** Control de ruido en industrias antioqueñas

### Enunciado
En una zona industrial de Medellín, dos fábricas emiten ondas sonoras coherentes de frecuencia 100 Hz con amplitudes iguales. En un punto específico, las ondas llegan en fase (interferencia constructiva). Si una fábrica aumenta su fase en π/2 rad, ¿qué tipo de interferencia resulta?

### Options
- [ ] A) Interferencia constructiva total (amplitud doble)
- [ ] B) Interferencia constructiva parcial (amplitud mayor)
- [x] C) Interferencia destructiva parcial (amplitud reducida) <!-- feedback: Con diferencia de fase π/2, hay superposición parcial. La amplitud resultante es A·√2 < 2A, resultando en interferencia parcialmente destructiva respecto al máximo. -->
- [ ] D) Interferencia destructiva total (amplitud cero)

### Explicación Pedagógica
Cuando dos ondas de igual amplitud están en fase, la resultante es máxima. Si una cambia fase π/2, la resultant no es máxima ni mínima, sino un valor intermedio (interferencia parcialmente destructiva). Error común: pensar que cualquier desfase genera interferencia destructiva total.

---

## Question 17 (Variant Advanced - Difficulty D9)

**ID:** `CO-CIE-11-P3-ondas-sonido-075-MASTERY-v17`
**Bloom:** Create
**ICFES:** Diseño soluciones basadas en propiedades de ondas
**Context:** Sistemas de sonar en la Armada colombiana

### Enunciado
La Armada Nacional utiliza sonar activo para detectar submarinos en el Caribe. El sonar emite pulsos de ultrasonido de frecuencia 40 kHz hacia el fondo oceánico (profundidad ~100 m). Si la velocidad del sonido en agua de mar es 1530 m/s, ¿cuál es el tiempo total que tarda el eco en regresar al barco?

### Options
- [ ] A) 0,13 s
- [ ] B) 0,065 s
- [x] C) 0,13 s <!-- feedback: El sonido viaja ida y vuelta: distancia total = 2 × 100 m = 200 m. Tiempo = distancia/velocidad = 200 m / 1530 m/s ≈ 0,13 s. Error frecuente: no considerar el recorrido de regreso. -->
- [ ] D) 0,26 s

### Explicación Pedagógica
En sonar activo, el tiempo medido es de ida y vuelta. La distancia total recorrida es 2 × profundidad. Error común: calcular solo el tiempo de ida o confundir con aplicaciones unidireccionales.

---

## Question 18 (Variant Advanced - Difficulty D9)

**ID:** `CO-CIE-11-P3-ondas-sonido-075-MASTERY-v18`
**Bloom:** Create
**ICFES:** Predigo comportamiento de ondas en tubos abiertos y cerrados
**Context:** Diseño de instrumentos de viento en bandas de gaita

### Enunciado
Un luthier en San Jacinto de Montería fabrica una gaita (instrumento de viento) con un tubo abierto de 50 cm de largo. Si la velocidad del sonido es 340 m/s, ¿cuál es la frecuencia del tercer armónico (tercer sobretono)?

### Options
- [ ] A) 510 Hz
- [ ] B) 1020 Hz
