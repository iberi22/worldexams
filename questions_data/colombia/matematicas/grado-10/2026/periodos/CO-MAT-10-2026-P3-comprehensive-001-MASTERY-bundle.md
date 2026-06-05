---
id: "CO-MAT-10-2026-P3-comprehensive-001-MASTERY"
country: "colombia"
grado: 10
asignatura: "matematicas"
tema: "trigonometria-analitica, estadistica-inferencial, derivada-intro"
periodo: 3
protocol_version: "5.2"
bundle_index: 1
bundle_size: 20
alignment: "DBA MEN + Pre-ICFES"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: 0.65
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "trigonometria_analitica, estadistica_inferencial, derivada_intro, tasa_cambio, IC_interpretacion"
---

# Bundle MASTERY: Trigonometría Analítica, Estadística Inferencial y Derivada Intro

Bundle de periodo 3 para grado 10, alineado con DBA MEN y preparación Pre-Saber 11. Cubre resolución de ecuaciones trigonométricas, fundamentos de estadística inferencial y el concepto introductorio de derivada como tasa de cambio.

---

## Question 1 (Difficulty D3)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comunicación y Representación

**Context:** En una clase de estadística en el Colegio San Francisco de Asís en Popayán, el profesor explica conceptos básicos de inferencia estadística.

### Enunciado
¿Qué es un parámetro en estadística inferencial?

### Options
- [ ] A) Un valor calculado a partir de una muestra. <!-- feedback: Incorrecto. Eso es un estadístico o estadígrafo, no un parámetro. -->
- [x] B) Un valor numérico que describe una característica de la población. <!-- feedback: Correcto. El parámetro es un valor verdadero de la población, generalmente desconocido. -->
- [ ] C) Un intervalo de confianza. <!-- feedback: Incorrecto. Un intervalo de confianza es una estimación, no un parámetro. -->
- [ ] D) Un error muestral. <!-- feedback: Incorrecto. El error muestral es la diferencia entre el estadístico y el parámetro. -->

### Explicación Pedagógica
En inferencia, el parámetro es el valor verdadero en la población (ej: media poblacional μ), mientras que el estadístico es el valor estimado desde la muestra (ej: media muestral x̄).

---

## Question 2 (Difficulty D3)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Comunicación y Representación

**Context:** Un estudiante en Cúcuta ve por primera vez el concepto de derivada como la pendiente de la recta tangente.

### Enunciado
Geométricamente, la derivada de una función f en un punto x = a representa:

### Options
- [ ] A) El área bajo la curva de f en el intervalo [a, a+h]. <!-- feedback: Incorrecto. El área bajo la curva se relaciona con la integral, no con la derivada. -->
- [x] B) La pendiente de la recta tangente a la gráfica de f en el punto (a, f(a)). <!-- feedback: Correcto. La derivada en un punto es el límite de las pendientes de las rectas secantes cuando h→0, que es la pendiente de la recta tangente. -->
- [ ] C) El valor máximo de la función en el intervalo. <!-- feedback: Incorrecto. La derivada puede ser cero en un máximo, pero no es su definición. -->
- [ ] D) La intersección de la gráfica con el eje y. <!-- feedback: Incorrecto. La intersección con el eje y es f(0), no la derivada. -->

### Explicación Pedagógica
La derivada f'(a) = lim_{h→0} (f(a+h)-f(a))/h es la pendiente instantánea de la recta tangente a la curva en el punto (a, f(a)).

---

## Question 3 (Difficulty D4)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

**Context:** En una clase de trigonometría analítica en el Colegio Los Andes de Bogotá, se debe resolver la ecuación trigonométrica: 2 cos θ - 1 = 0.

### Enunciado
¿Cuál es la solución general para θ en la ecuación 2 cos θ = 1?

### Options
- [x] A) θ = π/3 + 2πn o θ = 5π/3 + 2πn, n ∈ ℤ <!-- feedback: Correcto. cos θ = 1/2. cos⁻¹(1/2) = π/3. La solución general incluye el ángulo de referencia y su simétrico en [0,2π), más los múltiplos del período. -->
- [ ] B) θ = π/6 + 2πn, n ∈ ℤ <!-- feedback: Incorrecto. cos(π/6) = √3/2, no 1/2. -->
- [ ] C) θ = π/3 + πn, n ∈ ℤ <!-- feedback: Incorrecto. El período del coseno es 2π, no π. Agregar π da soluciones donde el coseno es -1/2. -->
- [ ] D) θ = π/2 + 2πn, n ∈ ℤ <!-- feedback: Incorrecto. cos(π/2) = 0, no 1/2. -->

### Explicación Pedagógica
Para resolver cos θ = k, primero encontramos el ángulo principal θ₀ = cos⁻¹(k). La solución general es θ = ±θ₀ + 2πn, que da dos familias de soluciones en cada período.

---

## Question 4 (Difficulty D4)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Comunicación y Representación

**Context:** El DANE publica que la estatura promedio de los hombres colombianos es 170.6 cm con una desviación estándar de 6.5 cm. Una muestra de 100 hombres en Medellín tiene una media de 171.2 cm.

### Enunciado
¿Cuál es el error estándar de la media muestral?

### Options
- [ ] A) 6.5 cm <!-- feedback: Incorrecto. 6.5 es la desviación estándar poblacional, no el error estándar. -->
- [x] B) 0.65 cm <!-- feedback: Correcto. Error estándar = σ/√n = 6.5/√100 = 6.5/10 = 0.65 cm. -->
- [ ] C) 0.065 cm <!-- feedback: Incorrecto. Dividiste 6.5 entre 100, pero el error estándar usa √n, no n. -->
- [ ] D) 1.3 cm <!-- feedback: Incorrecto. Error: usaste √50 o un cálculo incorrecto. Recuerda: σ/√n. -->

### Explicación Pedagógica
El error estándar de la media (SEM) mide la variabilidad esperada de las medias muestrales. A mayor tamaño de muestra, menor error estándar: SEM = σ/√n.

---

## Question 5 (Difficulty D5)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

**Context:** Un ingeniero en Bogotá calcula la tasa de cambio instantánea del volumen de agua en un tanque según V(t) = 10 + 5t - 0.5t², donde t está en minutos.

### Enunciado
Usando la definición de derivada, calcula V'(2) (la tasa de cambio instantánea en t=2 minutos).

### Options
- [ ] A) 5 L/min <!-- feedback: Incorrecto. V'(t) = 5 - t, V'(2) = 5-2 = 3. -->
- [x] B) 3 L/min <!-- feedback: Correcto. V'(t) = 5 - t. Evaluando en t=2: V'(2) = 5 - 2 = 3 L/min. -->
- [ ] C) 1 L/min <!-- feedback: Incorrecto. Error de cálculo. La derivada directa de V(t) = 10 + 5t - 0.5t² es V'(t) = 5 - t. -->
- [ ] D) 0 L/min <!-- feedback: Incorrecto. La tasa de cambio no es 0 en t=2. -->

### Explicación Pedagógica
La derivada de una función cuadrática f(x) = ax² + bx + c es f'(x) = 2ax + b. Luego se evalúa en el punto deseado.

---

## Question 6 (Difficulty D5)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

**Context:** En una encuesta del DANE sobre desempleo en Barranquilla, se entrevistaron 400 personas. El 12% estaba desempleada. Se construye un intervalo de confianza del 95%.

### Enunciado
¿Cuál es el margen de error aproximado (usando z* = 1.96) para la proporción de desempleados?

### Options
- [ ] A) 1.2% <!-- feedback: Incorrecto. Este es el valor de la proporción (12%), no el margen de error. -->
- [x] B) 3.2% <!-- feedback: Correcto. ME = 1.96 × √(0.12 × 0.88/400) = 1.96 × √(0.1056/400) = 1.96 × √0.000264 = 1.96 × 0.01625 = 0.0318 ≈ 3.2%. -->
- [ ] C) 5.0% <!-- feedback: Incorrecto. Sobreestimaste el error. Usaste un z* o cálculo incorrecto. -->
- [ ] D) 0.8% <!-- feedback: Incorrecto. Subestimaste el error. Probablemente dividiste la proporción entre n en lugar de usar la fórmula correcta. -->

### Explicación Pedagógica
El margen de error para una proporción es ME = z* × √(p̂(1-p̂)/n). Depende del nivel de confianza, la proporción estimada y el tamaño de la muestra.

---

## Question 7 (Difficulty D5)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

**Context:** Un estudiante resuelve la ecuación trigonométrica 2 sen²θ + sen θ - 1 = 0 en el intervalo [0, 2π).

### Enunciado
¿Cuántas soluciones tiene la ecuación 2 sen²θ + sen θ - 1 = 0 en [0, 2π)?

### Options
- [ ] A) 1 <!-- feedback: Incorrecto. Hay más de una solución. -->
- [ ] B) 2 <!-- feedback: Incorrecto. Hay 3 soluciones. Factoriza: (2 sen θ - 1)(sen θ + 1) = 0. -->
- [x] C) 3 <!-- feedback: Correcto. (2 senθ-1)(senθ+1)=0 → senθ=1/2 (soluciones: π/6, 5π/6) y senθ=-1 (solución: 3π/2). Total: 3 soluciones. -->
- [ ] D) 4 <!-- feedback: Incorrecto. Hay 3 soluciones, no 4. La ecuación cuadrática en senθ da dos factores que producen 3 ángulos en [0,2π). -->

### Explicación Pedagógica
Las ecuaciones trigonométricas cuadráticas se resuelven factorizando como una ecuación algebraica y luego encontrando los ángulos para cada factor.

---

## Question 8 (Difficulty D6)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

**Context:** Se analiza la función f(x) = x². Se calcula la derivada usando la definición de límite.

### Enunciado
Usando la definición de derivada por límite, ¿cuál es f'(x) para f(x) = x²?

### Options
- [ ] A) x <!-- feedback: Incorrecto. f'(x) = 2x, no x. -->
- [x] B) 2x <!-- feedback: Correcto. f'(x) = lim_{h→0} ((x+h)² - x²)/h = lim (x²+2xh+h²-x²)/h = lim (2x+h) = 2x. -->
- [ ] C) 2 <!-- feedback: Incorrecto. f'(x) = 2x, no 2. f'(x) sería constante si f(x) fuera lineal. -->
- [ ] D) x²/2 <!-- feedback: Incorrecto. La derivada de x² es 2x, no x²/2. -->

### Explicación Pedagógica
La definición de derivada con el límite del cociente diferencial permite encontrar f'(x) = lim_{h→0} (f(x+h)-f(x))/h. Es la forma fundamental de calcular derivadas.

---

## Question 9 (Difficulty D6)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

**Context:** Una empresa de transporte en Cali monitorea el consumo de combustible de su flota. De una muestra de 36 vehículos, el consumo medio es 8.5 km/L con desviación estándar muestral de 1.2 km/L.

### Enunciado
Calcula el intervalo de confianza del 95% (t* con 35 gl ≈ 2.03) para el consumo medio de combustible.

### Options
- [ ] A) [7.3, 9.7] km/L <!-- feedback: Incorrecto. El margen de error es 2.03 × (1.2/6) = 2.03 × 0.2 = 0.406, más pequeño que 1.2. -->
- [x] B) [8.094, 8.906] km/L <!-- feedback: Correcto. IC = x̄ ± t* × (s/√n) = 8.5 ± 2.03 × (1.2/6) = 8.5 ± 0.406 = [8.094, 8.906]. -->
- [ ] C) [8.1, 8.9] km/L aproximadamente <!-- feedback: Correcto también pero con menos precisión. El valor exacto del IC es [8.094, 8.906]. -->
- [ ] D) [6.5, 10.5] km/L <!-- feedback: Incorrecto. El margen de error es mucho menor; la estimación es más precisa de lo que este intervalo sugiere. -->

### Explicación Pedagógica
Cuando se desconoce la desviación estándar poblacional, se usa la distribución t de Student con s/√n y n-1 grados de libertad para construir el intervalo de confianza.

---

## Question 10 (Difficulty D6)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Comunicación y Representación

**Context:** En clase de matemáticas, se define la derivada y se muestran varios conceptos relacionados.

### Enunciado
¿Cuál de las siguientes afirmaciones sobre la derivada es FALSA?

### Options
- [ ] A) La derivada de una función constante es 0. <!-- feedback: Correcto, es verdadero. Las funciones constantes no cambian, su derivada es 0. -->
- [ ] B) La derivada representa una tasa de cambio instantánea. <!-- feedback: Correcto, es verdadero. -->
- [x] C) Si f'(a) = 0, entonces f tiene un máximo o mínimo en x = a. <!-- feedback: FALSO. f'(a)=0 es una condición necesaria pero no suficiente. Puede ser un punto de inflexión. Ej: f(x)=x³ en x=0. -->
- [ ] D) La derivada de la suma es la suma de las derivadas. <!-- feedback: Correcto, es verdadero. La derivación es un operador lineal. -->

### Explicación Pedagógica
La condición f'(a)=0 (punto crítico) es necesaria para extremos locales, pero no suficiente. f(x)=x³ tiene f'(0)=0 pero no es un extremo, es un punto de inflexión.

---

## Question 11 (Difficulty D7)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v11`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

**Context:** Un ecólogo en el Amazonas colombiano estudia la población de una especie. La población sigue P(t) = 500 + 20t - t², donde t está en meses.

### Enunciado
¿En qué momento la población deja de crecer y comienza a decrecer?

### Options
- [ ] A) En t=5 meses <!-- feedback: Incorrecto. P'(t) = 20 - 2t. P'(t)=0 → t=10. En t=5, P'(5)=10 > 0, sigue creciendo. -->
- [x] B) En t=10 meses <!-- feedback: Correcto. P'(t) = 20 - 2t. P'(t)=0 → t=10. Para t<10, P'(t)>0 (crece); para t>10, P'(t)<0 (decrece). En t=10 hay un máximo. -->
- [ ] C) En t=20 meses <!-- feedback: Incorrecto. P'(20)=20-40=-20, ya está decreciendo desde t=10. -->
- [ ] D) En t=2 meses <!-- feedback: Incorrecto. P'(2)=20-4=16, la población crece rápidamente. -->

### Explicación Pedagógica
El punto donde una función deja de crecer y empieza a decrecer corresponde a un máximo local, donde la derivada cambia de positiva a negativa (f'(t)=0).

---

## Question 12 (Difficulty D7)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

**Context:** Se quiere resolver la ecuación trigonométrica sen(2θ) = cos θ en [0, 2π).

### Enunciado
¿Cuáles son las soluciones de sen(2θ) = cos θ en [0, 2π)?

### Options
- [ ] A) θ = 0, π/2, π, 3π/2 <!-- feedback: Incorrecto. En θ=0, sen(0)=0 y cos(0)=1, no son iguales. -->
- [ ] B) θ = π/6, 5π/6 <!-- feedback: Incorrecto. Hay más soluciones. sen(2θ)=2senθcosθ, la ecuación se factoriza. -->
- [x] C) θ = π/6, π/2, 5π/6, 3π/2 <!-- feedback: Correcto. sen(2θ)=cosθ → 2senθcosθ=cosθ → cosθ(2senθ-1)=0 → cosθ=0 (θ=π/2, 3π/2) o senθ=1/2 (θ=π/6, 5π/6). -->
- [ ] D) θ = π/3, 2π/3, 4π/3, 5π/3 <!-- feedback: Incorrecto. Estas son soluciones de otras ecuaciones trigonométricas. -->

### Explicación Pedagógica
Para resolver ecuaciones con ángulos múltiples, usa identidades para expresar todo en términos del mismo ángulo. Luego factoriza e iguala cada factor a cero.

---

## Question 13 (Difficulty D7)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v13`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

**Context:** En un estudio del SISBEN en Bogotá, 400 hogares fueron encuestados. 240 reportaron ingresos por debajo de la línea de pobreza.

### Enunciado
Construye un intervalo de confianza del 90% (z* = 1.645) para la proporción de hogares en pobreza.

### Options
- [ ] A) [0.55, 0.65] <!-- feedback: Incorrecto. p̂=0.6, no 0.55-0.65. -->
- [x] B) [0.5596, 0.6404] <!-- feedback: Correcto. p̂=240/400=0.6. ME=1.645×√(0.6×0.4/400)=1.645×√(0.24/400)=1.645×0.0245=0.0403. IC=0.6±0.0403=[0.5597, 0.6403]. -->
- [ ] C) [0.56, 0.64] <!-- feedback: Correcto también, aproximando el cálculo. -->
- [ ] D) [0.50, 0.70] <!-- feedback: Incorrecto. El margen de error no es tan grande con n=400. -->

### Explicación Pedagógica
Para construir un IC de proporción: p̂ ± z* × √(p̂(1-p̂)/n). El nivel de confianza determina el valor crítico z*.

---

## Question 14 (Difficulty D8)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v14`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

**Context:** Cuatro estudiantes dan diferentes interpretaciones de la derivada f'(a).

### Enunciado
Estudiante A: "Es la pendiente de la recta secante en [a, a+h] para h muy pequeño."
Estudiante B: "Es la pendiente de la recta tangente en x=a."
Estudiante C: "Es la tasa de cambio promedio de f en [a, a+h]."
Estudiante D: "Es la tasa de cambio instantánea de f en x=a."
¿Quién tiene razón?

### Options
- [ ] A) Solo B y D. <!-- feedback: Incorrecto. A también está parcialmente correcto si consideramos que es el límite de la pendiente secante. -->
- [ ] B) Solo B. <!-- feedback: Incorrecto. D también es una interpretación correcta. -->
- [x] C) A, B y D. <!-- feedback: Correcto. A describe la pendiente secante que tiende a la derivada. B describe la interpretación geométrica. D describe la interpretación física. -->
- [ ] D) Todos. <!-- feedback: Incorrecto. C es falsa: la derivada es la tasa de cambio instantánea, no la promedio. -->

### Explicación Pedagógica
La derivada tiene múltiples interpretaciones equivalentes: geométrica (pendiente tangente), física (tasa instantánea de cambio) y analítica (límite del cociente diferencial).

---

## Question 15 (Difficulty D8)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v15`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

**Context:** Se quiere probar si el ingreso promedio en Bucaramanga difiere del promedio nacional de $1,200,000. Una muestra de 100 hogares tiene media de $1,235,000 y desviación estándar de $180,000.

### Enunciado
¿Cuál es el estadístico de prueba t para contrastar H₀: μ = $1,200,000 vs H₁: μ ≠ $1,200,000?

### Options
- [ ] A) t = 1.75 <!-- feedback: Incorrecto. t = (x̄-μ)/(s/√n) = (1235000-1200000)/(180000/10) = 35000/18000 = 1.944. -->
- [x] B) t = 1.94 <!-- feedback: Correcto. t = (x̄-μ₀)/(s/√n) = (1,235,000-1,200,000)/(180,000/10) = 35,000/18,000 = 1.944. -->
- [ ] C) t = 2.50 <!-- feedback: Incorrecto. Sobreestimaste el estadístico. -->
- [ ] D) t = 0.19 <!-- feedback: Incorrecto. Probablemente usaste la fórmula invertida o con √ en lugar de /√. -->

### Explicación Pedagógica
El estadístico de prueba t mide cuántos errores estándar está la media muestral del valor hipotético. t = (x̄ - μ₀)/(s/√n).

---

## Question 16 (Difficulty D8)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v16`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

**Context:** Un estudiante afirma: "Si la derivada de una función es positiva en todo el intervalo (a, b), entonces la función es creciente en [a, b]."

### Enunciado
Evalúa la afirmación del estudiante.

### Options
- [x] A) Es correcta: si f'(x) > 0 para todo x en (a, b), entonces f es estrictamente creciente en [a, b]. <!-- feedback: Correcto. El teorema del valor medio garantiza que si f'(x)>0 en (a,b), la función es creciente. -->
- [ ] B) Es falsa porque la derivada positiva no implica crecimiento. <!-- feedback: Incorrecto. Sí implica crecimiento según el teorema del valor medio. -->
- [ ] C) Es correcta solo si f es continua en [a, b]. <!-- feedback: Incorrecto. Para que f sea derivable en (a,b) y tenga f'(x)>0, f debe ser continua en [a,b] y derivable en (a,b). -->
- [ ] D) Es falsa porque necesitamos que f'(x) ≥ 0, no > 0. <!-- feedback: Incorrecto. >0 implica crecimiento estricto; ≥0 implicaría no decreciente. -->

### Explicación Pedagógica
El teorema del valor medio establece: si f'(x) > 0 para todo x en (a,b), entonces para cualesquiera x₁ < x₂ en [a,b], existe c en (x₁,x₂) con f(x₂)-f(x₁) = f'(c)(x₂-x₁) > 0.

---

## Question 17 (Difficulty D9)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

**Context:** Una empresa de encuestas afirma que el 55% de los colombianos apoya una reforma. En una muestra de 500 personas, 260 apoyan la reforma.

### Enunciado
Con un nivel de significancia α=0.05 (z*₁.₉₆), ¿hay evidencia suficiente para rechazar la afirmación de que p=0.55?

### Options
- [ ] A) Sí, porque p̂=0.52 < 0.55. <!-- feedback: Incorrecto. No se rechaza solo por el valor puntual; hay que calcular el estadístico de prueba. -->
- [ ] B) No, porque el valor p es menor que 0.05. <!-- feedback: Incorrecto. Primero calcula p̂=0.52, z=(0.52-0.55)/√(0.55·0.45/500)=(-0.03)/0.0222=-1.35. P(|Z|>1.35)=0.177>0.05. -->
- [x] C) No, porque z = -1.35, que está dentro de la región de no rechazo [-1.96, 1.96]. <!-- feedback: Correcto. z = (0.52-0.55)/√(0.55·0.45/500) = -0.03/0.0222 = -1.35. Como |z| < 1.96, no se rechaza H₀. -->
- [ ] D) Sí, porque la diferencia es mayor al margen de error. <!-- feedback: Incorrecto. La diferencia de 3% está dentro del margen de error muestral. -->

### Explicación Pedagógica
En una prueba de hipótesis para proporción, se calcula z = (p̂-p₀)/√(p₀(1-p₀)/n). Si |z| < z*, no se rechaza H₀: no hay evidencia suficiente contra la afirmación.

---

## Question 18 (Difficulty D9)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v18`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

**Context:** Un grupo de estudiantes debate si la función f(x) = |x| es derivable en x=0.

### Enunciado
¿Es f(x) = |x| derivable en x = 0?

### Options
- [ ] A) Sí, porque está definida en x=0. <!-- feedback: Incorrecto. Estar definida no implica ser derivable. -->
- [ ] B) Sí, f'(0) = 0 porque la gráfica toca el eje x en 0. <!-- feedback: Incorrecto. La derivada no es 0. La función tiene un pico en x=0. -->
- [ ] C) No, porque el límite por la izquierda del cociente diferencial es -1 y por la derecha es 1. <!-- feedback: Correcto. lim_{h→0-} (|0+h|-0)/h = -1, lim_{h→0+} h/h = 1. Los límites laterales son diferentes, por lo que la derivada no existe. -->
- [ ] D) No, porque la función no es continua en x=0. <!-- feedback: Incorrecto. |x| es continua en x=0. La continuidad es necesaria pero no suficiente para la derivabilidad. -->

### Explicación Pedagógica
La derivabilidad implica continuidad, pero el recíproco no es cierto. |x| es continua pero no derivable en x=0 debido al "pico" (cambio brusco de pendiente).

---

## Question 19 (Difficulty D9)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v19`
**Bloom:** Create
**ICFES:** Formulación y Ejecución

**Context:** Un gerente en una cadena de supermercados en Medellín necesita construir un modelo para la tasa de crecimiento de ventas.

### Enunciado
Las ventas mensuales S(t) en millones de pesos siguen S(t) = -t² + 12t + 50, donde t=0 corresponde a enero. Determina la función que representa la tasa de cambio de las ventas y calcula en qué mes las ventas crecen más rápido.

### Options
- [ ] A) S'(t) = -2t + 12, las ventas crecen más rápido en t=0 (enero). <!-- feedback: Correcto. S'(t) = -2t + 12. S'(0)=12 (máximo porque es lineal decreciente). En t=0 la tasa de cambio es máxima. -->
- [ ] B) S'(t) = 2t + 12, las ventas crecen más rápido en t=6. <!-- feedback: Incorrecto. La derivada de -t² es -2t, no 2t. -->
- [ ] C) S'(t) = -2t + 12, las ventas crecen más rápido en t=6. <!-- feedback: Incorrecto. S'(6) = 0, las ventas no crecen ni decrecen en t=6 (es el máximo de la función S). -->
- [ ] D) S'(t) = -t + 6, las ventas crecen más rápido en t=0. <!-- feedback: Incorrecto. Error al derivar: d/dt(-t²+12t+50) = -2t+12. -->

### Explicación Pedagógica
La derivada S'(t) es la tasa de cambio instantánea. Para S(t) = -t² + 12t + 50, S'(t) = -2t + 12. Como es lineal decreciente, el máximo de S'(t) está en el extremo izquierdo del dominio.

---

## Question 20 (Difficulty D10)

**ID:** `CO-MAT-10-2026-P3-comprehensive-001-MASTERY-v20`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

**Context:** Se debe diseñar un experimento para estimar la media de una población con un intervalo de confianza del 95% de ancho máximo 0.5 unidades. Un estudio piloto sugiere σ ≈ 2.1.

### Enunciado
¿Cuál es el tamaño de muestra mínimo necesario? (z*₀.₉₅ = 1.96)

### Options
- [ ] A) n = 100 <!-- feedback: Incorrecto. n = (z*·σ/ME)² = (1.96·2.1/0.25)² = (4.116/0.25)² = (16.464)² = 271.03. -->
- [ ] B) n = 150 <!-- feedback: Incorrecto. El cálculo da aproximadamente 271. -->
- [x] C) n = 272 <!-- feedback: Correcto. n = (z*·σ/ME)² = (1.96·2.1/0.25)² = (16.464)² = 271.03. Se redondea a 272. -->
- [ ] D) n = 68 <!-- feedback: Incorrecto. Probablemente usaste ME=0.5 en lugar de ME=0.25 (porque ancho 0.5 → margen 0.25). -->
