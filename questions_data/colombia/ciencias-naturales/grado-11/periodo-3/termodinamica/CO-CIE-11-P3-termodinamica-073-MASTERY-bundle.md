<think>
The user wants me to generate exactly 20 multiple-choice questions in ICFES Saber 11 format for Colombian Sciences Naturales (Natural Sciences), topic: thermodynamics, grade 11, period 3. I need to follow the specific format with frontmatter YAML and the question structure provided.

Let me generate 20 questions with progressive difficulty:
- Questions 1-4: D3-D4 difficulty
- Questions 5-10: D5-D6 difficulty
- Questions 11-16: D7-D8 difficulty
- Questions 17-20: D9-D10 difficulty

I need to include Colombian context, align with ICFES style, and ensure the correct answer is marked with [x] and include feedback.

Let me create these questions about thermodynamics covering topics like:
- Heat and temperature
- Thermodynamic processes (isothermal, adiabatic, isobaric, isochoric)
- Laws of thermodynamics
- Entropy
- Heat engines and refrigerators
- Phase transitions
- Calorimetry
- Ideal gas laws
- Thermal expansion

Let me write all 20 questions following the structure precisely.

</think>

```markdown
---
id: "CO-CIE-11-P3-termodinamica-073-MASTERY"
country: "colombia"
grado: 11
asignatura: "ciencias-naturales"
tema: "termodinamica"
periodo: 3
protocol_version: "5.1"
bundle_size: 20
bundle_index: 73
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T19:18:51.427306"
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

**ID:** `CO-CIE-11-P3-termodinamica-073-MASTERY-v1`
**Bloom:** [Remember]
**ICFES:** [Comunicación científica]
**Context:** Fenómenos cotidianos en la vida cotidiana colombiana

### Enunciado
En un día caluroso en Cartagena, un padre abre la puerta del refrigerador para que su hijo tome un jugo frío. Si se consideran el refrigerador y la cocina como un sistema cerrado, ¿qué tipo de intercambio de energía ocurre entre el interior del refrigerador y el ambiente de la cocina?

- [ ] A) El interior del refrigerador cede calor al ambiente de la cocina
- [ ] B) El ambiente de la cocina cede trabajo al interior del refrigerador
- [x] C) El interior del refrigerador cede calor al ambiente de la cocina <!-- feedback: El refrigerador extrae calor de su interior (espacio frío) y lo transfiere al ambiente externo (cocina) mediante su motor. Este es el principio básico de operación de cualquier refrigerador. -->
- [ ] D) No ocurre ningún intercambio de energía porque el sistema está cerrado <!-- feedback: Un sistema cerrado permite intercambio de energía pero no de masa. El refrigerador claramente intercambia calor con su entorno. -->

### Explicación Pedagógica
La segunda ley de la termodinámica establece que el calor fluye espontáneamente de cuerpos calientes a fríos. En un refrigerador, el motor realiza trabajo para forzar el flujo de calor en dirección contraria (de frío a caliente). El error común es pensar que "cerrado" significa "sin intercambio", confusión que se resuelve entendiendo la diferencia entre sistema cerrado (solo intercambia energía) y sistema aislado (no intercambia nada).

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-CIE-11-P3-termodinamica-073-MASTERY-v2`
**Bloom:** [Remember]
**ICFES:** [Interpretación de conceptos]
**Context:** Situación doméstica colombiana

### Enunciado
En un pueblo de clima frío en la zona andina colombiana, una panela se derrite lentamente sobre una estufa. Respecto a la temperatura y el calor durante este proceso, ¿cuál afirmación es correcta?

- [ ] A) La temperatura de la panela aumenta mientras se derrite
- [x] B) La temperatura permanece constante mientras cambia de fase <!-- feedback: Durante un cambio de fase (sólido a líquido), la energía térmica se usa para vencer las fuerzas de atracción entre moléculas, no para aumentar la temperatura. Por eso la temperatura se mantiene en el punto de fusión. -->
- [ ] C) El calor hace que la panela se vuelva más dulce mientras se derrite
- [ ] D) La panela absorbe calor pero su temperatura disminuye

### Explicación Pedagógica
Durante el cambio de fase, la energía absorbed se utiliza para el cambio de estado (calor latente) y no para aumentar la temperatura. Este es un concepto fundamental frecuentemente malinterpretado. Los estudiantes frecuentemente creen que agregar calor siempre aumenta la temperatura, olvidando que durante los cambios de fase la energía se destina a modificar la estructura molecular.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P3-termodinamica-073-MASTERY-v3`
**Bloom:** [Understand]
**ICFES:** [Uso de conceptos]
**Context:** Actividades recreativas colombianas

### Enunciado
Un pêcheador en el Río Magdalena necesita enfriarse un agua con la que preparará una aguapanela. Coloca el agua caliente en un recipiente metálico y lo pone dentro de una poza del río. Después de un tiempo, el agua se enfrió. Respecto a los procesos termodinámicos involucrados, ¿cuál es la descripción correcta?

- [ ] A) El río realizó trabajo sobre el sistema agua-recipiente
- [ ] B) El agua caliente realizó trabajo sobre el río al transferir calor
- [x] C) El calor fluyó del agua caliente al río más frío por convección y conducción <!-- feedback: El agua caliente transfiere calor al río más frío a través de las paredes del recipiente (conducción) y por el movimiento del agua alrededor del recipiente (convección). Este flujo de calor continúa hasta alcanzar equilibrio térmico. -->
- [ ] D) No se puede determinar la dirección del flujo de calor sin conocer la masa de agua

### Explicación Pedagógica
El calor siempre fluye espontáneamente desde el cuerpo de mayor temperatura hacia el de menor temperatura hasta alcanzar el equilibrio térmico. El error frecuente es pensar que el frío es una sustancia que "entra" en lugar de entender que es ausencia de energía térmica. La conducción y convección son los mecanismos predominantes en este escenario.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P3-termodinamica-073-MASTERY-v4`
**Bloom:** [Understand]
**ICFES:** [Comunicación científica]
**Context:** Construcción tradicional colombiana

### Enunciado
En una construcción tradicional de la zona cafetera, se usa un material como el bareque (adobe con rastrojos) que tiene baja conductividad térmica. ¿Cuál de las siguientes afirmaciones explica mejor por qué este material proporciona buen aislamiento térmico?

- [ ] A) Los materiales con baja conductividad térmica tienen muchos electrones libres que reflejan el calor
- [x] B) Los espacios de aire atrapados entre las fibras del material dificultan la transferencia de calor por conducción y convección <!-- feedback: Los materiales porosos o con fibras contienen aire atrapado, el cual tiene baja conductividad térmica. El aire es mal conductor y los espacios pequeños dificultan las corrientes de convección, reduciendo significativamente la transferencia de calor. -->
- [ ] C) Los materiales aislantes no permiten que las moléculas del material se muevan
- [ ] D) Los materiales con baja conductividad térmica tienen mayor densidad que los conductores

### Explicación Pedagógica
El aire es uno de los mejores aislantes térmicos naturales. Los materiales con estructura porosa o fibrosa atrapan aire, reduciendo tanto la conducción (el aire es mal conductor) como la convección (los espacios pequeños previenen el flujo de aire). El error común es pensar que los aislantes "bloquean" el calor cuando en realidad reducen la velocidad de transferencia de energía térmica.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P3-termodinamica-073-MASTERY-v5`
**Bloom:** [Apply]
**ICFES:** [Uso de conceptos]
**Context:** Industria panelera colombiana

### Enunciado
En una trapiche panelero tradicional del Valle del Cauca, el jugo de caña se calienta de 25°C a 85°C para convertirse en panela. Si se usan 2 kg de jugo de caña (calor específico aproximadamente 4,2 kJ/(kg·°C)), ¿cuál es la cantidad de calor aproximada requerida?

- [ ] A) 84 kJ
- [x] B) 504 kJ <!-- feedback: Q = m·c·ΔT = 2 kg × 4200 J/(kg·°C) × (85-25)°C = 2 × 4200 × 60 = 504.000 J = 504 kJ. El cálculo directo del calor transferido usando la fórmula de calorimetría es fundamental. -->
- [ ] C) 170 kJ
- [ ] D) 840 kJ

### Explicación Pedagógica
La calorimetría básica requiere identificar correctamente las variables: masa (m), calor específico (c) y cambio de temperatura (ΔT). Un error frecuente es usar el calor específico del agua (4,2 kJ/(kg·°C) = 4200 J/(kg·°C)) directamente sin convertir las unidades o calcular mal el ΔT restando en lugar de medir el cambio correcto.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P3-termodinamica-073-MASTERY-v6`
**Bloom:** [Apply]
**ICFES:** [Uso de conceptos]
**Context:** Sistemas termodinámicos industriales

### Enunciado
En una máquina térmica que opera entre una fuente caliente a 500 K y una fuente fría a 300 K, ¿cuál es la máxima eficiencia teórica según el ciclo de Carnot?

- [ ] A) 17%
- [x] B) 40% <!-- feedback: La eficiencia de Carnot es η = 1 - (Tc/Th) = 1 - (300K/500K) = 1 - 0,6 = 0,4 = 40%. Esta es la eficiencia máxima teórica que ninguna máquina térmica real puede superar. -->
- [ ] C) 60%
- [ ] D) 100%

### Explicación Pedagógica
La eficiencia de Carnot representa el límite máximo teórico para cualquier máquina térmica que opera entre dos temperaturas. Ninguna máquina real puede alcanzar el 100% de eficiencia porque siempre habrá algo de calor que no se convierte en trabajo útil (segunda ley). Un error frecuente es invertir las temperaturas o restarlas directamente.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P3-termodinamica-073-MASTERY-v7`
**Bloom:** [Understand]
**ICFES:** [Interpretación de conceptos]
**Context:** Ingeniería térmica colombiana

### Enunciado
En una turbina de una hidroeléctrica colombiana, el agua passa por un proceso donde su energía potencial se convierte en energía cinética y posteriormente en energía eléctrica. Si se considera el agua como sistema termodinámico, ¿qué tipo de proceso ocurre cuando el agua pasa por la turbina y se expansiona sin intercambiar calor significativo con el exterior?

- [ ] A) Isotérmico
- [x] B) Adiabático <!-- feedback: Un proceso adiabático es aquel en el que no hay transferencia de calor entre el sistema y sus alrededores (Q = 0). En una expansión rápida en una turbina, el tiempo es insuficiente para que haya intercambio de calor significativo, por lo tanto, el proceso se considera adiabático. -->
- [ ] C) Isobárico
- [ ] D) Isocórico

### Explicación Pedagógica
Un proceso adiabático se caracteriza por Q = 0. Esto puede ocurrir ya sea porque el sistema está perfectamente aislado o porque el proceso ocurre tan rápidamente que no hay tiempo para intercambio de calor. En turbinas, la expansión es suficientemente rápida para considerarla adiabática. El error común es confundir "adiabático" con "isotérmico".

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P3-termodinamica-073-MASTERY-v8`
**Bloom:** [Apply]
**ICFES:** [Uso de conceptos]
**Context:** Clima andino colombiano

### Enunciado
En Bogotá (presión atmosférica aproximada de 0,75 atm debido a la altitud), un estudiante calienta agua desde 20°C hasta 90°C. Si el agua tiene una masa de 1 kg y el calor específico es 4186 J/(kg·K), ¿cuál es el calor total requerido en kJ?

- [ ] A) 71,6 kJ
- [ ] B) 293 kJ
- [x] C) 293 kJ <!-- feedback: ΔT = 90°C - 20°C = 70°C = 70 K (ya que los cambios en Celsius y Kelvin son iguales). Q = m·c·ΔT = 1 kg × 4186 J/(kg·K) × 70 K = 293.020 J ≈ 293 kJ. La presión atmosférica diferente no afecta el cálculo de calor para calentamiento sin cambio de fase. -->
- [ ] D) 418,6 kJ

### Explicación Pedagógica
El cálculo de calor para calentamiento sensible usa Q = mcΔT. La presión atmosférica más baja en Bogotá no afecta la capacidad calorífica del agua ni el cálculo del calor requerido para elevar la temperatura. El error frecuente es intentar incorporar la presión en el cálculo cuando no es necesario para este tipo de problema.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P3-termodinamica-073-MASTERY-v9`
**Bloom:** [Understand]
**ICFES:** [Interpretación de conceptos]
**Context:** Propulsión y máquinas

### Enunciado
Un refrigerador domestico en Colombia funciona con un Coeficiente de Desempeño (COP) de 4,0. Si el compressor realiza un trabajo de 150 J sobre el refrigerante, ¿cuánto calor se extrae del compartimento frío?

- [ ] A) 150 J
- [x] B) 600 J <!-- feedback: COP = Q_frio / W_entrada. Despejando: Q_frio = COP × W_entrada = 4,0 × 150 J = 600 J. El COP indica cuántos julios de calor se extraen por cada julio de trabajo invertido. -->
- [ ] C) 750 J
- [ ] D) 37,5 J

### Explicación Pedagógica
El Coeficiente de Desempeño (COP) de un refrigerador mide su eficiencia: COP = Q_frio / W_entrada. Un COP de 4 significa que por cada joule de trabajo eléctrico invertido, se extraen 4 joules de calor del espacio frío. El error común es confundir el COP con la eficiencia y aplicar la fórmula de manera incorrecta.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P3-termodinamica-073-MASTERY-v10`
**Bloom:** [Apply]
**ICFES:** [Uso de conceptos]
**Context:** Termodinámica básica

### Enunciado
Un gas ideal experimenta un proceso isobárico, donde su presión se mantiene constante en 2 atm mientras absorbe 500 J de calor. Si el gas se expande de 2 L a 5 L, ¿cuál es el trabajo realizado por el gas?

- [ ] A) 0 J, porque no hay cambio de temperatura
- [ ] B) 400 J
- [x] C) 600 J <!-- feedback: W = P·ΔV. Primero convertimos: P = 2 atm × 101325 Pa/atm = 202650 Pa. ΔV = (5-2)L = 3 L = 0,003 m³. W = 202650 Pa × 0,003 m³ = 607,95 J ≈ 600 J. En proceso isobárico, el trabajo es PΔV. -->
- [ ] D) 1000 J

### Explicación Pedagógica
En un proceso isobárico (presión constante), el trabajo realizado por el gas es W = P·ΔV. Es crucial identificar que la presión debe estar en Pascal y el volumen en metros cúbicos para obtener el trabajo en Joules. El error frecuente es no convertir las unidades de atm a Pa y litros a m³ correctamente.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P3-termodinamica-073-MASTERY-v11`
**Bloom:** [Analyze]
**ICFES:** [Análisis de situaciones]
**Context:** Energías alternativas colombianas

### Enunciado
En una planta de biocombustibles en la región de la Orinoquía colombiana, se utiliza biomasa como fuente de energía. Si la planta tiene una eficiencia del 35% y produce 700 kW de potencia eléctrica útil, ¿cuál es la cantidad de energía térmica (en kW) que se disipa al ambiente?

- [ ] A) 245 kW
- [x] B) 1300 kW <!-- feedback: η = P_util / P_total. Despejando: P_total = P_util / η = 700 kW / 0,35 = 2000 kW. La energía disipada como calor es P_total - P_util = 2000 kW - 700 kW = 1300 kW. El 65% de la energía se convierte en calor residual. -->
- [ ] C) 465 kW
- [ ] D) 2000 kW

### Explicación Pedagógica
La eficiencia de una máquina térmica relaciona la potencia útil con la potencia total consumida. Despejando se encuentra la potencia total y por diferencia se obtiene el calor residual. Un error frecuente es confundir eficiencia con la fracción de energía que se pierde, o restar en lugar de dividir para encontrar el total.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P3-termodinamica-073-MASTERY-v12`
**Bloom:** [Analyze]
**ICFES:** [Uso de conceptos]
**Context:** Procesos industriales

### Enunciado
En una industria colombiana de alimentos, un proceso de esterilización requiere elevar la temperatura de 5 kg de conservas desde 25°C hasta 121°C. Si el calor específico promedio del producto es 3,5 kJ/(kg·°C), ¿cuál es el calor requerido?

- [ ] A) 875 kJ
- [ ] B) 1680 kJ
- [x] C) 1680 kJ <!-- feedback: Q = m·c·ΔT = 5 kg × 3500 J/(kg·°C) × (121-25)°C = 5 × 3500 × 96 = 1.680.000 J = 1680 kJ. El cambio de temperatura es 96°C, no simplemente usar la temperatura final. -->
- [ ] D) 21175 kJ

### Explicación Pedagógica
El cambio de temperatura (ΔT) es la diferencia entre temperatura final e inicial, no la temperatura final misma. Este es un error común que resulta en respuestas muy alejadas del valor correcto. Además, debe usarse el calor específico en J/(kg·°C) si se quiere el resultado en Joules, o convertir a kJ/(kg·°C) para obtener kJ directamente.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P3-termodinamica-073-MASTERY-v13`
**Bloom:** [Understand]
**ICFES:** [Comunicación científica]
**Context:** Termodinámica ambiental

### Enunciado
La segunda ley de la termodinámica establece que la entropía del universo tiende a aumentar. ¿Cuál de las siguientes situaciones representa un ejemplo de disminución de entropía en un sistema que no contradice esta ley?

- [ ] A) Un vaso que se rompe en pedazos espontáneamente
- [ ] B) El crecimiento de un cristal de sal cuando se evapora el agua
- [x] C) La formación de hielo cuando el agua se congela en un freezer, ya que la entropía del sistema disminuye pero la entropía del entorno aumenta aún más, haciendo que la entropía total del universo aumente <!-- feedback: La entropía del sistema agua puede disminuir (pasar de líquido a sólido ordenado), pero el motor del freezer libera calor al entorno, aumentando la entropía del ambiente más de lo que disminuye la del sistema. La entropía total del universo aumenta. -->
- [ ] D) El flujo de calor de un cuerpo frío a uno caliente sin trabajo externo

### Explicación Pedagógica
La entropía puede disminuir localmente en un sistema, pero siempre a costa de un aumento mayor en los alrededores, de modo que la entropía total del universo aumenta. El error común es pensar que "la entropía siempre aumenta" significa que no puede haber orden local, sin considerar el balance total con el entorno.

---

## Question 14 (Variant Basic - Difficulty D8)

**ID:** `CO-CIE-11-P3-termodinamica-073-MASTERY-v14`
**Bloom:** [Analyze]
**ICFES:** [Uso de conceptos]
**Context:** Máquinas térmicas

### Enunciado
Una máquina térmica real tiene una eficiencia del 28% mientras opera entre las mismas temperaturas que una máquina de Carnot que tiene eficiencia del 40%. Si la máquina real rechaza 900 J de calor al sumidero frío, ¿cuánto trabajo produce?

- [ ] A) 280 J
- [ ] B) 360 J
- [x] C) 350 J <!-- feedback: Para la máquina real: η = 0,28. Si Q_rechazado = 900 J es el calor al sumidero frío, entonces Q_recibido = Q_frio/(1-η) = 900 J/0,72 = 1250 J. El trabajo es W = Q_recibido - Q_rechazado = 1250 - 900 = 350 J. También se puede verificar: W = η × Q_recibido = 0,28 × 1250 J = 350 J. -->
- [ ] D) 1250 J

### Explicación Pedagógica
En una máquina térmica: W = Q_caliente - Q_frio, y η = W/Q_caliente. Conociendo η y Q_frio, se puede encontrar Q_caliente = Q_frio/(1-η) y luego calcular W. El error frecuente es no distinguir entre calor recibido y calor rechazado, o usar la eficiencia de Carnot en lugar de la eficiencia real.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-CIE-11-P3-termodinamica-073-MASTERY-v15`
**Bloom:** [Analyze]
**ICFES:** [Interpretación de conceptos]
**Context:** Sistemas biológicos

### Enunciado
En un ecosistema de páramo colombiano, un colibrí de páramo (ave de alta montaña) necesita regular su temperatura corporal mediante procesos metabólicos. Si el ave tiene una masa de 8 g y su calor específico corporal es aproximadamente 3,5 kJ/(kg·°C), ¿cuánta energía en joules requiere para aumentar su temperatura corporal en 5°C durante el vuelo?

- [ ] A) 28 J
- [x] B) 140 J <!-- feedback: Convertir masa: 8 g = 0,008 kg. Q = m·c·ΔT = 0,008 kg × 3500 J/(kg·°C) × 5°C = 140 J. La energía requerida es relativamente pequeña, lo cual tiene sentido ya que los procesos metabólicos del ave proporcionan esta energía continuamente. -->
- [ ] C) 280 J
- [ ] D) 1400 J

### Explicación Pedagógica
Aunque los números parezcan pequeños, la correcta conversión de unidades (gramos a kilogramos) es crucial. El error frecuente es mantener la masa en gramos sin convertirla, resultando en valores 1000 veces mayores. Los seres vivos regularmente generan y transfieren calor como parte de su metabolismo normal.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-CIE-11-P3-termodinamica-073-MASTERY-v16`
**Bloom:** [Evaluate]
**ICFES:** [Análisis de situaciones]
**Context:** Ingeniería de procesos

### Enunciado
Un ingeniero diseña un sistema de calefacción solar pasivo para una vivienda en el Eje Cafetero colombiano. El sistema usa agua como fluido de transferencia de calor. Si el agua fría entra a 18°C y debe salir a 65°C con un flujo másico de 2 kg/s, ¿cuál es la potencia térmica transferida al agua?

- [ ] A) 36 W
- [x] B) 394,4 kW <!-- feedback: P = Q̇ = ṁ·c·ΔT = (2 kg/s) × (4186 J/(kg·°C)) × (65-18)°C = 2 × 4186 × 47 = 393.484 W ≈ 394 kW. La potencia térmica transferida al agua es aproximadamente 394 kW. Note que 4186 J/(kg·°C) se puede aproximar como 4200 J/(kg·°C) para cálculos rápidos. -->
- [ ] C) 94 W
- [ ] D) 47 W

### Explicación Pedagógica
La potencia térmica (vatios = joules/segundo) se calcula con la fórmula P = ṁ·c·ΔT donde ṁ es el flujo másico en kg/s. El error frecuente es olvidar que el flujo másico ya es por unidad de tiempo, por lo que no se necesita dividir por el tiempo adicionalmente. 2 kg/s significa que cada segundo pasan 2 kg de agua.

---

## Question 17 (Variant Basic - Difficulty D9)

**ID:** `CO-CIE-11-P3-termodinamica-073-MASTERY-v17`
**Bloom:** [Analyze]
**ICFES:** [Uso de conceptos]
**Context:** Máquinas reales vs ideales

### Enunciado
Una máquina térmica funciona entre 500 K y 300 K con una eficiencia real del 32%. El estudiante Juan afirma que la máquina violaría la segunda ley porque su eficiencia es menor que la eficiencia de Carnot (40%). ¿Cuál análisis es correcto?

- [ ] A) Juan tiene razón, cualquier máquina con eficiencia menor a Carnot viola la segunda ley
- [x] B) Juan está equivocado; la eficiencia real siempre debe ser menor que la de Carnot, y el 32% es consistente con la segunda ley <!-- feedback: La segunda ley establece que ninguna máquina térmica real puede tener mayor eficiencia que una máquina de Carnot operando entre las mismas temperaturas. Una eficiencia del 32% es menor que el 40% de Carnot, lo cual cumple con la ley. Es imposible que sea mayor, no
