<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for Colombian Mathematics exam (Saber 11), specifically on the topic of "funciones-elementales" (elementary functions), for grade 11, period 1.

Let me follow the strict format requirements:

1. Need to include YAML frontmatter with specific fields
2. 20 questions with progressive difficulty:
   - Questions 1-4: D3-D4 (Basic)
   - Questions 5-10: D5-D6 (Medium)
   - Questions 11-16: D7-D8 (Advanced)
   - Questions 17-20: D9-D10 (Mastery)
3. Each question needs:
   - Specific ID format
   - Bloom taxonomy level
   - ICFES competency
   - Modern Colombian context
   - Clear statement
   - 4 options (A, B, C, D) with exactly one marked as correct [x]
   - Explanatory pedagogy section
4. Plausible distractors based on common Colombian student errors
5. No "all of the above" or "none of the above"
6. No additional text before or after

Let me create these questions covering elementary functions:
- Linear functions
- Quadratic functions
- Rational functions
- Exponential functions
- Logarithmic functions
- Absolute value functions
- Piecewise functions

I'll make sure to include Colombian contexts like:
- Colombian peso exchange rates
- Population growth in Colombian cities
- Cricket populations
- Telecommunications plans
- Transportation costs
- Agricultural production
- Sports statistics
- Educational statistics

Let me generate each question carefully with proper distractors.

</think>

```markdown
---
id: "CO-MAT-11-P1-funciones-elementales-008-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "funciones-elementales"
periodo: 1
protocol_version: "5.1"
bundle_size: 20
bundle_index: 8
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T23:30:04.381326"
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

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Interpretación de expresiones matemáticas
**Context:** Precios en supermercados de Bogotá

### Enunciado
En un supermercado de Bogotá, el precio de un kilogramo de arroz viene dado por la expresión f(x) = 3.500x, donde x representa los kilogramos comprados y f(x) el precio en pesos colombianos. ¿Cuál es el precio de 4 kilogramos de arroz?

- [ ] A) 3.504 pesos
- [ ] B) 14.000 pesos
- [x] C) 14.000 pesos
- [ ] D) 7.000 pesos

### Explicación Pedagógica
La función f(x) = 3.500x es una función lineal donde 3.500 es la constante de proporcionalidad (precio por kilogramo). Al reemplazar x = 4: f(4) = 3.500 × 4 = 14.000. El distractor A) es incorrecto porque suma 3.500 + 4 en lugar de multiplicar. El distractor D) es incorrecto porque divide 3.500 entre 2 (error común en operaciones con variable).

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Modelo matemático de situaciones reales
**Context:** Viaje en taxi en Medellín

### Enunciado
Un servicio de taxi en Medellín cobra $4.200 de banderazo más $280 por cada 100 metros recorridos. Si f(d) representa el costo total en función de la distancia d (en hectómetros), ¿cuál es la expresión correcta?

- [ ] A) f(d) = 280d + 4.200
- [x] B) f(d) = 280d + 4.200
- [ ] C) f(d) = 4.200d + 280
- [ ] D) f(d) = 280d - 4.200

### Explicación Pedagógica
La función tiene la forma f(d) = md + b, donde m es la tarifa variable (280 por hectómetro) y b es el banderazo (4.200). El distractor C) invierte los coeficientes, asignando el valor fijo a la variable y viceversa. El distractor D) resta el banderazo, lo cual no tiene sentido en un contexto de cobro mínimo.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Análisis de gráficas
**Context:** Temperatura en la Sierra Nevada de Santa Marta

### Enunciado
En la Sierra Nevada de Santa Marta, la temperatura (en °C) a distintas alturas sobre el nivel del mar viene dada por T(h) = 25 - 0.006h, donde h es la altura en metros. ¿Qué representa el número 0.006 en este contexto?

- [ ] A) La temperatura máxima registrada
- [ ] B) La altura sobre el nivel del mar
- [x] C) El descenso promedio de temperatura por cada metro de ascenso
- [ ] D) El valor inicial de la temperatura

### Explicación Pedagógica
En la función lineal T(h) = 25 - 0.006h, el coeficiente de h (-0.006) indica la tasa de cambio o pendiente. En este contexto, significa que por cada metro que se asciende, la temperatura disminuye aproximadamente 0.006°C. El número 25 es la temperatura a nivel del mar (intercepto). Los distractores A) y D) confunden intercepto con pendiente.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Resolución de problemas
**Context:** Plan de datos móviles en Colombia

### Enunciado
Una compañía de telefonía celular ofrece un plan definido por la función C(x) = 25.000 + 120x, donde x son los gigabytes consumidos y C(x) el costo total mensual. Si un usuario tiene un presupuesto máximo de $85.000, ¿cuántos gigabytes puede consumir como máximo?

- [ ] A) 500 GB
- [ ] B) 600 GB
- [x] C) 500 GB
- [ ] D) 708,3 GB

### Explicación Pedagógica
Se resuelve la inecuación: 25.000 + 120x ≤ 85.000 → 120x ≤ 60.000 → x ≤ 500. El distractor B) resulta de dividir 85.000 entre 120 olvidando restar el costo fijo. El distractor D) usa la expresión 85.000/120 sin restar 25.000, error frecuente en problemas de optimización.

---

## Question 5 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Interpretación de relaciones funcionales
**Context:** Producción de café en el Eje Cafetero

### Enunciado
La producción de café en una finca del Eje Cafetero (en quintales) está modelada por P(t) = 50 + 8t - 0.5t², donde t es el tiempo en años desde el inicio del cultivo. ¿En qué año la producción alcanza su máximo?

- [ ] A) En el año 0
- [x] B) En el año 8
- [ ] C) En el año 50
- [ ] D) En el año 0,5

### Explicación Pedagógica
Como P(t) es una función cuadrática con coeficiente a = -0.5 < 0 (cóncava hacia abajo), el vértice representa el máximo. El tiempo del vértice es t = -b/(2a) = -8/(2×-0.5) = -8/-1 = 8. El distractor A) confunde el valor inicial con el máximo. El distractor C) usa el término constante (50) como variable. El distractor D) calcula el inverso del coeficiente.

---

## Question 6 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v6`
**Bloom:** Understand
**ICFES:** Análisis de funciones
**Context:** Distancia de frenado en carreteras colombianas

### Enunciado
La distancia de frenado D (en metros) de un vehículo que viaja a velocidad v (en km/h) en una carretera seca de Colombia se aproxima por D(v) = 0.005v² + 0.8v. ¿Cuál es la distancia de frenado cuando el vehículo circula a 60 km/h?

- [ ] A) 24,8 m
- [ ] B) 48,8 m
- [x] C) 48 m
- [ ] D) 36,8 m

### Explicación Pedagógica
Se evalúa: D(60) = 0.005(60)² + 0.8(60) = 0.005(3600) + 48 = 18 + 48 = 66 m. El distractor B) calcula 0.005×60² + 60 sin el 0.8. El distractor A) obtiene 0.8×60 + 0.005, invirtiendo los términos. El distractor D) usa solo 0.005v.

---

## Question 7 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Resolución de problemas
**Context:** Venta de artesanías en Villa de Leyva

### Enunciado
Un artesano de Villa de Leyva vende sus productos con la función ingreso I(x) = -5x² + 200x, donde x es el número de piezas vendidas. ¿Cuántas piezas debe vender para maximizar su ingreso?

- [ ] A) 200 piezas
- [x] B) 20 piezas
- [ ] C) 40 piezas
- [ ] D) 10 piezas

### Explicación Pedagógica
Para una parábola que abre hacia abajo (a = -5 < 0), el vértice da el máximo. x = -b/(2a) = -200/(2×-5) = -200/-10 = 20. El distractor A) usa el coeficiente lineal. El distractor C) calcula -b/a (omitiendo el 2). El distractor D) usa b/(2a) positivo sin el signo de a.

---

## Question 8 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Comparación de funciones
**Context:** Comparación de planes de telefonía en Colombia

### Enunciado
Dos empresas de telefonía ofrecen los siguientes planes:
- Empresa A: C₁(x) = 35.000 + 80x
- Empresa B: C₂(x) = 20.000 + 150x
donde x son los minutos consumidos. ¿A partir de cuántos minutos es más económico el plan B?

- [ ] A) Menos de 150 minutos
- [ ] B) Exactamente 150 minutos
- [x] C) Más de 150 minutos
- [ ] D) Nunca es más económico

### Explicación Pedagógica
Se resuelve C₁(x) = C₂(x): 35.000 + 80x = 20.000 + 150x → 15.000 = 70x → x ≈ 214,3 minutos. Para x > 214,3, el plan B es más económico. El distractor A) invierte la desigualdad. El distractor B) confunde el punto de equilibrio con la solución. El distractor D) ignora que las funciones son lineales con diferentes pendientes.

---

## Question 9 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v9`
**Bloom:** Understand
**ICFES:** Identificación de características de funciones
**Context:** Crecimiento poblacional en Barranquilla

### Enunciado
La población P(t) de Barranquilla (en miles de habitantes) está modelada por P(t) = 500 · 2^(t/20), donde t es el tiempo en años desde 2020. ¿Cuál es la interpretación correcta del número 20 en la función?

- [ ] A) La población inicial
- [x] B) El tiempo en años para que la población se duplique
- [ ] C) El crecimiento anual en miles de habitantes
- [ ] D) El factor multiplicativo de la población

### Explicación Pedagógica
En P(t) = 500 · 2^(t/20), cuando t = 20: P(20) = 500 · 2^(20/20) = 500 · 2 = 1000, exactamente el doble de la población inicial. Por lo tanto, 20 representa el tiempo de duplicación. El distractor A) confunde con la población inicial (500). El distractor C) no tiene relación con el modelo exponencial. El distractor D) confunde con la base 2.

---

## Question 10 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Modelamiento matemático
**Context:** Radio de cobertura de una estación de radio en Colombia

### Enunciado
El área de cobertura A(r) de una estación de radio en Colombia viene dada por A(r) = πr², donde r es el radio de cobertura en kilómetros. Si el radio aumenta de 10 km a 20 km, ¿en qué factor aumenta el área?

- [ ] A) 2
- [ ] B) π
- [x] C) 4
- [ ] D) 10

### Explicación Pedagógica
A₁ = π(10)² = 100π; A₂ = π(20)² = 400π. El factor de aumento es 400π/100π = 4. Este resultado ilustra que el área aumenta con el cuadrado del radio (relación cuadrática). El distractor A) sería correcto si fuera una relación lineal. El distractor B) confunde con π. El distractor D) es el factor de aumento del radio.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Análisis de gráficas
**Context:** Funciones definidas por tramos en tarifas de servicios públicos

### Enunciado
La tarifa de energía eléctrica en cierto estrato está definida por:
f(x) = { 150x, si 0 ≤ x ≤ 200; 30.000 + 200(x-200), si x > 200 }
donde x es el consumo en kWh y f(x) el costo en pesos. Si el consumo fue de 350 kWh, ¿cuál es el valor a pagar?

- [ ] A) 52.500 pesos
- [ ] B) 45.000 pesos
- [x] C) 60.000 pesos
- [ ] D) 73.000 pesos

### Explicación Pedagógica
Como 350 > 200, se usa la segunda expresión: f(350) = 30.000 + 200(350-200) = 30.000 + 200(150) = 30.000 + 30.000 = 60.000. El distractor A) usa f(x) = 150x para todo el consumo. El distractor B) calcula 30.000 + 150(350-200). El distractor D) aplica 200x sin ajustar los 200 kWh iniciales.

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Interpretación de funciones inversas
**Context:** Equivalencia de temperatura entre escalas Celsius y Fahrenheit en Bogotá

### Enunciado
La relación entre la temperatura en °C (C) y en °F (F) viene dada por F(C) = (9/5)C + 32. Si la temperatura en Bogotá es de 20°C, ¿cuál temperatura en Fahrenheit corresponde a esta medida?

- [ ] A) 68°F
- [ ] B) 36°F
- [x] C) 68°F
- [ ] D) 52°F

### Explicación Pedagógica
Se evalúa F(20) = (9/5)(20) + 32 = 9×4 + 32 = 36 + 32 = 68°F. El distractor B) obtiene (5/9)(20) + 32, usando incorrectamente la inversa. El distractor D) calcula (9/5)(20-32) = (9/5)(-12) = -21.6, error en la estructura algebraica.

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Análisis de funciones
**Context:** Concentración de contaminante en el Río Magdalena

### Enunciado
La concentración C(t) de un contaminante (en ppm) en el Río Magdalena está modelada por C(t) = 100/(t+1), donde t es el tiempo en días después de un derrame. ¿Qué sucede con la concentración a medida que pasan los días?

- [ ] A) Aumenta indefinidamente
- [x] B) Disminuye y se acerca a cero sin alcanzarlo
- [ ] C) Permanece constante
- [ ] D) Disminuye hasta llegar a cero exactamente

### Explicación Pedagógica
Como C(t) es una función racional decreciente con asíntota horizontal y = 0, los valores siempre son positivos y se acercan a cero sin alcanzarlo jamás (t > 0 siempre da C > 0). El distractor A) describe comportamiento opuesto. El distractor C) no corresponde a la función. El distractor D) confunde "acercarse" con "alcanzar" la asíntota.

---

## Question 14 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v14`
**Bloom:** Understand
**ICFES:** Reconocimiento de operaciones
**Context:** Degradación de medicamento en el cuerpo humano

### Enunciado
La cantidad Q(t) de un medicamento (en mg) en el torrente sanguíneo se modela por Q(t) = 80 · (1/2)^(t/4), donde t es el tiempo en horas. ¿Después de cuántas horas la cantidad del medicamento se reduce a la mitad de la dosis inicial?

- [ ] A) 4 horas
- [x] B) 4 horas
- [ ] C) 8 horas
- [ ] D) 2 horas

### Explicación Pedagógica
La vida media del medicamento es 4 horas: cuando t = 4, Q(4) = 80 · (1/2)^(4/4) = 80 · (1/2)¹ = 40 mg, exactamente la mitad. El distractor C) corresponde a una reducción a un cuarto. El distractor D) calcula la reducción después de 2 horas: Q(2) = 80 · (1/2)^(0.5) ≈ 56.6 mg.

---

## Question 15 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v15`
**Bloom:** Analyze
**ICFES:** Análisis de funciones
**Context:** Altura de un proyectil lanzado desde el Cañón del Chicamocha

### Enunciado
La altura h(t) (en metros) de un proyectil lanzado desde el Cañón del Chicamocha está dada por h(t) = -5t² + 40t + 15. ¿Cuál es la altura máxima que alcanza el proyectil?

- [ ] A) 40 m
- [ ] B) 55 m
- [x] C) 95 m
- [ ] D) 15 m

### Explicación Pedagógica
El vértice de la parábola está en t = -b/(2a) = -40/(2×-5) = 4 segundos. La altura máxima es h(4) = -5(16) + 40(4) + 15 = -80 + 160 + 15 = 95 m. El distractor A) confunde la velocidad inicial con la altura. El distractor B) calcula h(2) en lugar del vértice. El distractor D) toma solo la altura inicial.

---

## Question 16 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Composición de funciones
**Context:** Transformación del valor del dólar en Colombia

### Enunciado
Si f(x) = 2x + 500 representa el valor del dólar en pesos hace x meses, y g(y) = 1.05y representa el efecto de una devaluación sobre un valor en pesos, ¿cuál expresión representa el valor del dólar después de la devaluación?

- [ ] A) f(g(x)) = 2x + 525
- [ ] B) g(f(x)) = 2.1x + 525
- [x] C) g(f(x)) = 2.1x + 1.025
- [ ] D) f(f(x)) = 4x + 1.500

### Explicación Pedagógica
g(f(x)) = 1.05(2x + 500) = 1.05×2x + 1.05×500 = 2.1x + 525. Es importante notar que la composicion g∘f es diferente de f∘g. El distractor A) aplica g solo a la constante. El distractor B) calcula mal 1.05×500 = 525 correcto pero 1.05×2 = 2.05 incorrecto. El distractor D) aplica f dos veces, confusión entre composición e iteración.

---

## Question 17 (Variant Mastery - Difficulty D9)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Evaluación de modelos
**Context:** Análisis de préstamos bancarios en Colombia

### Enunciado
Un banco ofrece un préstamo con la función monto M(t) = 1.000.000 · (1.02)^t, donde t son los años. ¿Cuál afirmación es correcta sobre este modelo?

- [ ] A) El préstamo se duplica cada año
- [x] B) La tasa de interés efectiva anual es 2%
- [ ] C) El interés se calcula solo sobre el capital inicial
- [ ] D) Después de 10 años el monto es 1.200.000 pesos

### Explicación Pedagógica
La función M(t) = P(1+i)^t modela interés compuesto. El factor (1.02) indica i = 0.02 = 2%. El distractor A) sería verdadero si fuera 2^t. El distractor C) describe interés simple, no compuesto. El distractor D) calcula 1.000.000 + 10×20.000 = 1.200.000, confundiendo interés simple con compuesto.

---

## Question 18 (Variant Mastery - Difficulty D9)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v18`
**Bloom:** Create
**ICFES:** Modelamiento y predicción
**Context:** Propagación de información en redes sociales en Colombia

### Enunciado
El número de usuarios N(t) que ven una publicación viral en Twitter/X en Colombia sigue N(t) = 1.000 · (1 - 0.1)^t. ¿Cuál es el dominio apropiado para este modelo?

- [ ] A) Todos los números reales
- [x] B) t ≥ 0, t entero
- [ ] C) 0 < t ≤ 10
- [ ] D) t > 1

### Explicación Pedagógica
En el contexto de redes sociales, t representa tiempo (medido en períodos como horas o días) desde la publicación. Solo tiene sentido t ≥ 0. Además, como modela personas, t debe ser entero. El distractor A) incluye valores negativos de tiempo, sin sentido en el contexto. El distractor C) limita artificialmente. El distractor D) excluye t = 0.

---

## Question 19 (Variant Mastery - Difficulty D10)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Análisis crítico de modelos
**Context:** Efectividad de campaña de vacunación contra el dengue en Cartagena

### Enunciado
La cantidad de personas inmunizadas I(p) después de aplicar una campaña está modelada por I(p) = 500.000 · log(p) + 50.000, donde p es el presupuesto en millones de pesos. Si se invierten 10 millones, ¿cuántas personas se inmunizan?

- [ ] A) 500.000
- [ ] B) 500.010
- [x] C) 550.000
- [ ] D) 550.010

### Explicación Pedagógica
I(10) = 500.000 · log(10) + 50.000 = 500.000 · 1 + 50.000 = 550.000 personas. El distractor A) ignora el término constante. El distractor B) suma log(10) = 1 incorrectamente a 500.000. El distractor D) calcula log(10) + 50.010, error en la operación de logaritmo.

---

## Question 20 (Variant Mastery - Difficulty D10)

**ID:** `CO-MAT-11-P1-funciones-elementales-008-MASTERY-v20`
**Bloom:** Create
**ICFES:** Síntesis y evaluación
**Context:** Análisis integral de funciones