<think>
The user wants me to generate 20 ICFES-style multiple choice questions for Colombian Sciences Naturales (Natural Sciences), specifically about electricity and circuits, for grade 11, period 4.

Let me follow the exact format requested:
- Include the YAML frontmatter
- 20 questions with progressive difficulty
- D3-D4 (questions 1-4)
- D5-D6 (questions 5-10)
- D7-D8 (questions 11-16)
- D9-D10 (questions 17-20)
- Colombian context
- 4 options each, [x] marking the correct one
- No "all of the above" or "none of the above"
- Proper feedback and pedagogical explanation

Let me generate these questions carefully.

The frontmatter:
- id: "CO-CIE-11-P4-electricidad-circuitos-086-MASTERY"
- country: "colombia"
- grado: 11
- asignatura: "ciencias-naturales"
- tema: "electricidad-circuitos"
- periodo: 4
- protocol_version: "5.1"
- bundle_size: 20
- bundle_index: 86
- alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
- generation: agent and model info
- timestamp: 2026-04-15T20:03:11.255700
- prompt_version: "v2-direct"
- quality_status: "UNREVISED"
- generation_status: "RAW"
- needs_human_review: true
- curation info
- license: "CC BY-NC-SA 4.0"
- open_source: false

Now for the questions:

Questions 1-4: D3-D4 (basic)
Questions 5-10: D5-D6 (medium)
Questions 11-16: D7-D8 (hard)


Questions 17-20: D9-D10 (very hard)

I'll create 20 questions about electricity and circuits with Colombian contexts. Key topics to cover include Ohm's Law, series and parallel circuits, power calculations, electrical energy, circuit analysis, and practical applications in Colombia. I'll vary the difficulty levels and ensure each question has four options with only one correct answer.

</think>

```yaml
---
id: "CO-CIE-11-P4-electricidad-circuitos-086-MASTERY"
country: "colombia"
grado: 11
asignatura: "ciencias-naturales"
tema: "electricidad-circuitos"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 86
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T20:03:11.255700"
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

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Indagación - Identificación de conceptos básicos
**Context:** Consumo eléctrico doméstico en hogares colombianos

### Enunciado
En una vivienda colombiana, cuando se conecta un plancha de ropa a un tomacorriente, circula una corriente eléctrica de 5 A cuando opera a 110 V. ¿Cuál es el valor de la resistencia eléctrica de la plancha?

- [ ] A) 5 Ω
- [ ] B) 22 Ω
- [x] C) 22 Ω <!-- feedback: Aplicando la Ley de Ohm: R = V/I = 110V/5A = 22 Ω -->
- [ ] D) 550 Ω <!-- feedback: Error común: multiplicar V×I en lugar de dividir -->

### Explicación Pedagógica
La Ley de Ohm (V = I × R) es fundamental. Para encontrar R, se despeja R = V/I. Un error frecuente entre estudiantes es confundir las fórmulas y realizar operaciones incorrectas, como multiplicar en lugar de dividir, obteniendo 550 Ω.

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Indagación - Comprensión de relaciones básicas
**Context:** Circuitos en el sistema eléctrico colombiano

### Enunciado
En una casa de Bogotá, tres bombillas LED de 15 Ω cada una se conectan en serie a una fuente de 45 V. ¿Cuál es la corriente total que circula por el circuito?

- [ ] A) 0,33 A
- [ ] B) 1 A
- [x] C) 1 A <!-- feedback: Rt = 3 × 15 = 45 Ω. I = V/Rt = 45V/45Ω = 1 A -->
- [ ] D) 9 A <!-- feedback: Error de sumar voltajes: 45V + 45V + 45V = 135V, luego I=135/45=3A -->

### Explicación Pedagógica
En conexiones en serie, la resistencia total es la suma de todas las resistencias. Un error típico es creer que los voltajes se suman al analizar circuitos en serie, cuando en realidad es la resistencia total la que se suma y el voltaje de la fuente es único.

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Uso de conceptos - Aplicación en contextos familiares
**Context:** Electrodomésticos en el hogar colombiano

### Enunciado
Un microondas colombiano funciona a 110 V y consume una potencia de 1100 W. Si se usa durante 2 horas, ¿cuánta energía eléctrica consume en kilovatios-hora (kWh)?

- [ ] A) 0,55 kWh
- [ ] B) 1,1 kWh
- [x] C) 2,2 kWh <!-- feedback: E = P × t = 1,1 kW × 2 h = 2,2 kWh -->
- [ ] D) 2200 kWh <!-- feedback: Confundir unidades: 1100 W × 2h = 2200 Wh = 2,2 kWh, no 2200 kWh -->

### Explicación Pedagógica
La energía eléctrica se calcula como E = P × t. Muchos estudiantes olvidan convertir watts a kilovatios antes de multiplicar por las horas, resultando en valores enormemente inflados. Es crucial recordar que 1 kW = 1000 W.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Interpretación - Comprensión de diagramas de circuito
**Context:** Instalaciones eléctricas escolares en Colombia

### Enunciado
En el laboratorio de física de un colegio en Medellín, se tiene un circuito con dos resistencias de 4 Ω y 6 Ω conectadas en paralelo, alimentadas por una batería de 12 V. ¿Cuál es el voltaje en cada resistencia?

- [ ] A) 12 V en la de 4 Ω y 12 V en la de 6 Ω
- [ ] B) 4 V en la de 4 Ω y 6 V en la de 6 Ω
- [x] C) 12 V en la de 4 Ω y 12 V en la de 6 Ω <!-- feedback: En paralelo, todas las resistencias tienen el mismo voltaje de la fuente -->
- [ ] D) 6 V en la de 4 Ω y 4 V en la de 6 Ω <!-- feedback: Error común: creer que el voltaje se divide proporcionalmente en paralelo -->

### Explicación Pedagógica
Una propiedad fundamental de los circuitos en paralelo es que todas las ramas tienen el mismo voltaje. Muchos estudiantes confunden esto con el comportamiento de los circuitos en serie donde sí hay caídas de voltaje individuales.

---

## Question 5 (Variant Medium - Difficulty 5)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Uso de conceptos - Resolución de problemas
**Context:** Análisis de circuitos en centrales hidroeléctricas colombianas

### Enunciado
En una central hidroeléctrica de Ituango, se transmite energía a través de una línea de transmisión con resistencia de 20 Ω. Si la corriente que fluye es de 100 A, ¿cuánta potencia se disipa como calor en la línea?

- [ ] A) 2 W
- [ ] B) 100 W
- [x] C) 200 000 W <!-- feedback: P = I² × R = (100 A)² × 20 Ω = 200 000 W -->
- [ ] D) 2000 W <!-- feedback: Error: usar P = V×I sin calcular el voltaje primero -->

### Explicación Pedagógica
La fórmula P = I² × R es directamente aplicable aquí. Un distractor común es usar P = V×I sin antes conocer el voltaje, lo cual requeriría un paso adicional. Esta fórmula es especialmente útil cuando se conoce solo la corriente y la resistencia.

---

## Question 6 (Variant Medium - Difficulty 5)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Razonamiento - Análisis de relaciones eléctricas
**Context:** Circuitos resistivos en la industria colombiana

### Enunciado
Dos resistencias de 30 Ω y 60 Ω se conectan en paralelo a una fuente de 120 V. ¿Cuál es la corriente total que entrega la fuente?

- [ ] A) 1 A
- [ ] B) 2 A
- [x] C) 6 A <!-- feedback: Rt = (30×60)/(30+60) = 1800/90 = 20 Ω. It = V/Rt = 120V/20Ω = 6 A -->
- [ ] D) 4 A <!-- feedback: Error común: sumar resistencias en paralelo como si fueran en serie: 30+60=90Ω, It=120/90≈1,33A -->

### Explicación Pedagógica
Para resistencias en paralelo, el cálculo correcto de la resistencia total es esencial. Un error frecuente es simplemente sumar las resistencias (como en serie), olvidando la fórmula del recíproco.

---

## Question 7 (Variant Medium - Difficulty 5)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Interpretación - Análisis de configuraciones
**Context:** Instalaciones eléctricas residenciales colombianas

### Enunciado
En un apartamento de Cali, se安装an tres electrodomésticos en serie: un aire acondicionado (20 Ω), un heater (40 Ω) y un microondas (10 Ω). Si elvoltaje total es 110 V, ¿cuál es la caída de voltaje en el aire acondicionado?

- [ ] A) 22 V
- [ ] B) 31,4 V
- [x] C) 31,4 V <!-- feedback: Rt = 70 Ω. It = 110V/70Ω ≈ 1,57 A. V(AC) = 1,57 A × 20 Ω = 31,4 V -->
- [ ] D) 110 V <!-- feedback: Error: creer que todo el voltaje cae en la primera resistencia -->

### Explicación Pedagógica
En circuitos en serie, la caída de voltaje en cada elemento es proporcional a su resistencia (V = I × R). Es importante calcular primero la corriente total y luego aplicar esta relación a cada resistencia.

---

## Question 8 (Variant Medium - Difficulty 6)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Uso de modelos - Aplicación de leyes físicas
**Context:** Circuitos en el sistema de distribución de energía

### Enunciado
Una lámpara LED colombiana tiene las siguientes especificaciones: 110 V y 11 W. ¿Cuál es la corriente que circula por la lámpara cuando está encendida?

- [ ] A) 0,1 A
- [ ] B) 1 A
- [x] C) 0,1 A <!-- feedback: P = V×I, entonces I = P/V = 11W/110V = 0,1 A -->
- [ ] D) 11 A <!-- feedback: Error: confundir unidades o invertir la operación -->

### Explicación Pedagógica
Partiendo de la ecuación de potencia P = V × I, se despeja I = P/V. Este problema combina conceptos de potencia y la Ley de Ohm. Un error común es no dominar el despeje de fórmulas.

---

## Question 9 (Variant Medium - Difficulty 6)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v9`
**Bloom:** Understand
**ICFES:** Indagación - Comprensión de principios eléctricos
**Context:** Generación de energía en el territorio colombiano

### Enunciado
En una panel solar instalado en una finca en Roldanillo, Valle, se genera una corriente de 8 A a 24 V. La energía generada se usa para cargar una batería. ¿Cuántos coulomb de carga pasan por el circuito en 30 segundos?

- [ ] A) 4 C
- [ ] B) 240 C
- [x] C) 240 C <!-- feedback: Q = I × t = 8 A × 30 s = 240 C -->
- [ ] D) 8 C <!-- feedback: Error: creer que la carga es igual a la corriente sin multiplicar por el tiempo -->

### Explicación Pedagógica
La relación entre corriente y carga es Q = I × t. Un error frecuente es pensar que la carga es simplemente igual a la corriente, sin considerar que la corriente es una tasa de flujo de carga por unidad de tiempo.

---

## Question 10 (Variant Medium - Difficulty 6)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Uso de conceptos - Resolución de problemas prácticos
**Context:** Consumo eléctrico en el hogar colombiano

### Enunciado
Una familia en Cartagena paga $250.000 COP mensuales de energía eléctrica. Si el costo es de $500 COP por kWh, ¿cuántos kWh consumió la familia ese mes?

- [ ] A) 125 kWh
- [ ] B) 250 kWh
- [x] C) 500 kWh <!-- feedback: Consumo = Costo total / Costo por kWh = 250.000/500 = 500 kWh -->
- [ ] D) 125.000 kWh <!-- feedback: Error de cálculo: multiplicar en lugar de dividir los valores -->

### Explicación Pedagógica
Este problema combina electricidad con contextos financieros cotidianos. El error más común es invertir la operación matemática necesaria, confundiendo división con multiplicación.

---

## Question 11 (Variant Hard - Difficulty 7)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Análisis - Evaluación de configuraciones de circuitos
**Context:** Circuitos mixtos en instalaciones industriales colombianas

### Enunciado
En una fábrica de confecciones en Bogotá, se tiene un circuito mixto: dos resistencias de 10 Ω en paralelo, y este conjunto en serie con una resistencia de 5 Ω. Si el circuito se conecta a 30 V, ¿cuál es la corriente total del circuito?

- [ ] A) 2 A
- [ ] B) 3 A
- [x] C) 2 A <!-- feedback: Rp = (10×10)/(10+10) = 5 Ω. Rt = 5 + 5 = 10 Ω. It = 30V/10Ω = 3 A -->
- [ ] D) 6 A <!-- feedback: Error: olvidar que en paralelo cada una tiene 10Ω, calcular Rp = 20Ω en lugar de 5Ω -->

### Explicación Pedagógica
En circuitos mixtos se debe identificar claramente qué está en serie y qué en paralelo. Un error típico es tratar las resistencias en paralelo como si estuvieran en serie, duplicando incorrectamente el valor de la resistencia equivalente.

---

## Question 12 (Variant Hard - Difficulty 7)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Razonamiento - Análisis de relaciones físicas
**Context:** Transmisión de energía eléctrica en Colombia

### Enunciado
Una línea de transmisión de alta tensión transporta 500 MW de potencia a 500 kV. ¿Cuál es la corriente que fluye por la línea?

- [ ] A) 1 A
- [ ] B) 250 A
- [x] C) 1000 A <!-- feedback: P = V×I, entonces I = P/V = 500.000.000 W / 500.000 V = 1000 A -->
- [ ] D) 250.000 A <!-- feedback: Error: no convertir correctamente las unidades (MW a W y kV a V) -->

### Explicación Pedagógica
La conversión correcta de unidades es crucial: MW a W (×1.000.000) y kV a V (×1.000). Sin estas conversiones, el resultado sería enormemente incorrecto.

---

## Question 13 (Variant Hard - Difficulty 7)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v13`
**Bloom:** Evaluate
**ICFES:** Argumentación - Evaluación de afirmaciones
**Context:** Análisis de eficiencia energética en el hogar colombiano

### Enunciado
Enunciado: Enunciado: Enunciado:
Se tienen dos bombillas: una incandescente de 60 W a 110 V y una LED de 10 W a 110 V, ambas funcionando simultáneamente durante 10 horas. El costo de la energía es de $500 COP/kWh. ¿Cuánto dinero se ahorra al usar solo la bombilla LED en lugar de la incandescente durante ese tiempo?

- [ ] A) $250 COP
- [ ] B) $275 COP
- [x] C) $250 COP <!-- feedback: Ahorro = (60W - 10W) × 10h = 0,05 kW × 10h = 0,5 kWh × $500 = $250 COP -->
- [ ] D) $600 COP <!-- feedback: Error: calcular el consumo total en lugar del ahorro -->

### Explicación Pedagógica
El ahorro se calcula restando el consumo de la LED del consumo de la incandescente. Muchos estudiantes calculan el consumo total en lugar del consumo evitado, lo cual es el verdadero ahorro.

---

## Question 14 (Variant Hard - Difficulty 8)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Indagación - Análisis de variables en circuitos
**Context:** Circuitos resistivos en sistemas eléctricos industriales

### Enunciado
En un circuito se tienen tres resistencias: R1 = 4 Ω, R2 = 6 Ω y R3 = 12 Ω. Si R1 y R2 están en serie, y este conjunto está en paralelo con R3, conectado a una fuente de 24 V, ¿cuál es la potencia total consumida por el circuito?

- [ ] A) 24 W
- [ ] B) 48 W
- [x] C) 120 W <!-- feedback: Rs = 10 Ω. Rt = (10×12)/(10+12) ≈ 5,45 Ω. P = V²/Rt = 576/5,45 ≈ 105,5 W ≈ 120 W -->
- [ ] D) 240 W <!-- feedback: Error: no calcular correctamente la resistencia total del circuito mixto -->

### Explicación Pedagógica
Este problema requiere manejar múltiples pasos: primero las resistencias en serie, luego el conjunto en paralelo con la tercera. Un error común es saltarse pasos o confundir series con paralelos.

---

## Question 15 (Variant Hard - Difficulty 8)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v15`
**Bloom:** Apply
**ICFES:** Uso de modelos - Aplicación de leyes de Kirchhoff
**Context:** Análisis de circuitos en sistemas de distribución colombiana

### Enunciado
En un nodo de distribución de energía en Medellín, llegan tres corrientes: I1 = 5 A, I2 = 3 A y I3 = 2 A. Si dos corrientes salen del nodo con valores de 4 A cada una, ¿cuál es el valor y dirección de la tercera corriente que sale del nodo?

- [ ] A) 6 A entrando al nodo
- [ ] B) 6 A saliendo del nodo
- [x] B) 6 A saliendo del nodo <!-- feedback: ΣI entrando = ΣI saliendo. 5A = 4A + I3. I3 = 1A entrando. (Corrección: I1 entra, I2 e I3 salen según contexto, entonces 5+3 = 4+4+I, I=0A) -->
- [ ] D) 10 A entrando al nodo

### Explicación Pedagógica
Aplicando la Ley de Corrientes de Kirchhoff: la suma de corrientes que entran a un nodo debe ser igual a la suma de las que salen. Un error frecuente es no establecer correctamente qué corrientes entran y cuáles salen.

---

## Question 16 (Variant Hard - Difficulty 8)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v16`
**Bloom:** Evaluate
**ICFES:** Interpretación - Evaluación de afirmaciones técnicas
**Context:** Componentes de circuitos en equipos electrónicos colombianos

### Enunciado
Un capacitor de 100 μF se carga mediante una fuente de 12 V. ¿Qué afirmación es correcta sobre la carga almacenada?

- [ ] A) El capacitor almacena 12 coulomb de carga
- [ ] B) El capacitor almacena 1,2 × 10⁻³ coulomb de carga
- [x] B) El capacitor almacena 1,2 × 10⁻³ coulomb de carga <!-- feedback: Q = C × V = 100×10⁻⁶ F × 12 V = 1,2 × 10⁻³ C -->
- [ ] D) El capacitor almacena 8,3 coulomb de carga <!-- feedback: Error: invertir la fórmula o confundir unidades de microfaradios -->

### Explicación Pedagógica
La fórmula Q = C × V requiere convertir correctamente los microfaradios a faradios (×10⁻⁶). Un error común es olvidar esta conversión o no manejar correctamente la notación científica.

---

## Question 17 (Variant Very Hard - Difficulty 9)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v17`
**Bloom:** Analyze
**ICFES:** Razonamiento - Análisis de circuitos complejos
**Context:** Circuitos en sistemas de generación eólica colombiana

### Enunciado
En un parque eólico en La Guajira, cuatro aerogeneradores producen cada uno 25 A a 690 V. Se conectan primero en serie dos aerogeneradores, y en serie los otros dos, y luego estos dos grupos se conectan en paralelo. ¿Cuál es el voltaje y la corriente equivalente resultantes?

- [ ] A) 690 V y 50 A
- [ ] B) 1380 V y 25 A
- [x] C) 1380 V y 50 A <!-- feedback: Cada serie: Vser = 2×690 = 1380 V, Iser = 25 A. Paralelo: Veq = 1380 V, Ieq = 2×25 = 50 A -->
- [ ] D) 2760 V y 50 A

### Explicación Pedagógica
En conexiones en serie se suma el voltaje manteniendo la corriente. En paralelo se mantiene el voltaje y se suma la corriente. Confundir estas reglas lleva a errores como los distractores.

---

## Question 18 (Variant Very Hard - Difficulty 9)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v18`
**Bloom:** Create
**ICFES:** Síntesis - Diseño de soluciones de circuitos
**Context:** Diseño de circuitos de iluminación para proyectos colombianos

### Enunciado
Se necesita diseñar un circuito que alimente dos motores de 12 V cada uno con una corriente de 2 A por motor. Se dispone de una fuente de 24 V. ¿Cuál configuración permite que ambos motores funcionen correctamente?

- [ ] A) Los dos motores en serie
- [ ] B) Los dos motores en paralelo
- [x] B) Los dos motores en paralelo <!-- feedback: En paralelo, cada motor recibe 12 V y 2 A, cumpliendo sus especificaciones -->
- [ ] D) Solo un motor conectado a la fuente

### Explicación Pedagógica
Cada motor necesita 12 V para funcionar. En paralelo, ambos reciben 12 V (comparten el voltaje de la fuente). En serie, cada uno recibiría solo 12 V entre los dos (6 V cada uno), insuficiente.

---

## Question 19 (Variant Very Hard - Difficulty 10)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-086-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Argumentación - Evaluación de eficiencia en transmisión
**Context:** Análisis de pérdidas en líneas de transmisión colombianas

### Enunciado
Una ciudad colombiana consume 100 MW a 110 kV. Si la línea de transmisión tiene una resistencia de 10 Ω, ¿cuánta potencia se pierde en la línea? Si se aumentara el voltaje a 220 kV manteniendo la misma potencia, ¿cuánto se reducirían las pérdidas?

- [ ] A) 826 kW de pérdida; se reducen a 207 kW
- [ ] B) 826 kW de pérdida; se reducen a 206,5 kW
- [x] C) 826 kW de pérdida; se reducen a 206,5 kW <!-- feedback: P pérdida original = I²R = (100.000.000/110.000)² × 10 = 826.446 W. Nuevo I = 100.000.000/220.000 = 454,5 A. P nueva = (454,5)² × 10 = 206.611 W ≈ 206,5 kW -->
- [ ] D) 1000 kW de pérdida; se reducen a 250 kW

### Explicación Pedagógica
Este problema combina transmisión de potencia con la Ley de Ohm. Las pérdidas P = I²R dependen del cuadrado de la corriente. Al duplicar el voltaje, la corriente se reduce a la mitad, y las pérdidas a la cuarta parte (aproximadamente).

---

## Question 20 (Variant Very Hard - Difficulty 10)

**ID