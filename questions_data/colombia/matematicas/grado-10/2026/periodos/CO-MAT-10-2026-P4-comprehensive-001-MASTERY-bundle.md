---
id: "CO-MAT-10-2026-P4-comprehensive-001-MASTERY-bundle"
country: "colombia"
grado: 10
asignatura: "matematicas"
tema: "derivadas-basicas, probabilidad-distribuciones, geometria-vectorial"
periodo: 4
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
rubric_baseline: "derivadas_basicas, reglas_derivacion, distribucion_normal, probabilidad_binomial, geometria_vectorial, secciones_conicas"
license: "FREE"
tier: "legacy"

bundle_type: "weekly"
total_questions: 20
year: 2026
creador: "Jules-Agent"
---


# Bundle MASTERY: Derivadas Básicas, Probabilidad y Distribuciones, Geometría Vectorial

Bundle de periodo 4 para grado 10, alineado con DBA MEN y preparación Pre-Saber 11. Cubre reglas básicas de derivación, distribuciones de probabilidad (normal, binomial) y geometría vectorial incluyendo secciones cónicas.

---

## Question 1 (Difficulty D3)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comunicación y Representación

**Contexto:** En una clase de probabilidad en el Colegio San José de Sincelejo, el profesor explica la distribución binomial.

### Enunciado
¿Cuáles son los parámetros de una distribución binomial?

### Opciones
- [ ] A) Media y desviación estándar. <!-- feedback: Incorrecto. Esos son parámetros de la distribución normal, no de la binomial. -->
- [x] B) n (número de ensayos) y p (probabilidad de éxito). <!-- feedback: Correcto. La distribución binomial está completamente determinada por n y p. -->
- [ ] C) λ (tasa promedio) y t (tiempo). <!-- feedback: Incorrecto. Esos son parámetros de la distribución Poisson. -->
- [ ] D) α y β <!-- feedback: Incorrecto. α y β son parámetros de la distribución beta, no de la binomial. -->

### Explicación Pedagógica
La distribución binomial modela el número de éxitos en n ensayos independientes, cada uno con probabilidad p de éxito. Sus parámetros son n y p.

---

## Question 2 (Difficulty D3)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Comunicación y Representación

**Contexto:** En cálculo diferencial, se presentan las reglas básicas de derivación a los estudiantes de grado 10.

### Enunciado
¿Cuál es la derivada de f(x) = 3x⁵?

### Opciones
- [ ] A) 5x⁴ <!-- feedback: Incorrecto. Olvidaste multiplicar por el coeficiente 3. -->
- [ ] B) 3x⁴ <!-- feedback: Incorrecto. Aplicaste mal la regla de la potencia: d/dx(xⁿ) = nxⁿ⁻¹, no xⁿ⁻¹. -->
- [x] C) 15x⁴ <!-- feedback: Correcto. f'(x) = 3·5x⁴ = 15x⁴. -->
- [ ] D) 15x⁵ <!-- feedback: Incorrecto. No restaste 1 al exponente. -->

### Explicación Pedagógica
La regla de la potencia establece que d/dx(cxⁿ) = c·n·xⁿ⁻¹. Se multiplica el coeficiente por el exponente y se reduce el exponente en 1.

---

## Question 3 (Difficulty D4)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

**Contexto:** Una empresa en Bogotá sabe que el 5% de sus productos tiene defectos. El control de calidad inspecciona una muestra de 20 productos.

### Enunciado
Usando la distribución binomial, ¿cuál es la probabilidad de que exactamente 2 productos sean defectuosos?

### Opciones
- [ ] A) C(20,1)·(0.05)¹·(0.95)¹⁹ <!-- feedback: Incorrecto. Esta fórmula corresponde a exactamente 1 defectuoso. -->
- [x] B) C(20,2)·(0.05)²·(0.95)¹⁸ <!-- feedback: Correcto. P(X=2) = C(20,2)·(0.05)²·(0.95)¹⁸. -->
- [ ] C) C(20,2)·(0.95)²·(0.05)¹⁸ <!-- feedback: Incorrecto. La probabilidad de éxito (defecto) es 0.05, no 0.95. -->
- [ ] D) (0.05)²·(0.95)¹⁸ <!-- feedback: Incorrecto. Falta el coeficiente binomial C(20,2) que cuenta las formas de elegir los 2 productos defectuosos. -->

### Explicación Pedagógica
La probabilidad binomial es P(X=k) = C(n,k)·pᵏ·(1-p)ⁿ⁻ᵏ, donde C(n,k)=n!/(k!(n-k)!) cuenta las combinaciones posibles.

---

## Question 4 (Difficulty D4)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Comunicación y Representación

**Contexto:** En geometría vectorial, se estudia la ecuación de una circunferencia.

### Enunciado
La ecuación (x - 2)² + (y + 3)² = 25 representa una circunferencia. ¿Cuáles son su centro y radio?

### Opciones
- [ ] A) Centro (2, -3), radio 25 <!-- feedback: Incorrecto. El radio es la raíz cuadrada del término derecho: √25 = 5. -->
- [ ] B) Centro (-2, 3), radio 5 <!-- feedback: Incorrecto. El centro se determina cambiando el signo: (x-h)² → h=2, (y-k)² → k=-3. Centro (2,-3). -->
- [x] C) Centro (2, -3), radio 5 <!-- feedback: Correcto. (x-2)²+(y+3)²=25, centro (2, -3), radio = √25 = 5. -->
- [ ] D) Centro (2, 3), radio 25 <!-- feedback: Incorrecto. y+3 implica k=-3, no 3. El radio es 5, no 25. -->

### Explicación Pedagógica
La ecuación canónica de la circunferencia es (x-h)²+(y-k)²=r², con centro (h,k) y radio r. El signo dentro del paréntesis se invierte al leer las coordenadas.

---

## Question 5 (Difficulty D5)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

**Contexto:** Un estudiante calcula la derivada de f(x) = x⁴ + 3x² - 2x + 7 en el Colegio Jorge Isaacs de Cali.

### Enunciado
¿Cuál es f'(x)?

### Opciones
- [ ] A) 4x³ + 6x - 2 + 7 <!-- feedback: Incorrecto. La derivada de una constante (7) es 0, no se mantiene. -->
- [ ] B) 4x³ + 3x² - 2x <!-- feedback: Incorrecto. Error en las reglas: d/dx(3x²)=6x, no 3x². -->
- [x] C) 4x³ + 6x - 2 <!-- feedback: Correcto. d/dx(x⁴)=4x³, d/dx(3x²)=6x, d/dx(-2x)=-2, d/dx(7)=0. -->
- [ ] D) x⁵/5 + x³ - x² + 7x <!-- feedback: Incorrecto. Esto sería la integral (antiderivada), no la derivada. -->

### Explicación Pedagógica
La derivación es lineal: la derivada de una suma es la suma de las derivadas. Se aplica la regla de la potencia a cada término.

---

## Question 6 (Difficulty D5)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

**Contexto:** Las calificaciones de un examen de matemáticas en un colegio de Bucaramanga siguen una distribución normal con media 65 y desviación estándar 10.

### Enunciado
Usando la regla empírica (68-95-99.7), ¿aproximadamente qué porcentaje de estudiantes obtuvo entre 55 y 85 puntos?

### Opciones
- [ ] A) 68% <!-- feedback: Incorrecto. 68% corresponde a μ±σ = [55,75], no [55,85]. -->
- [ ] B) 95% <!-- feedback: Incorrecto. 95% corresponde a μ±2σ = [45,85]. El intervalo [55,85] va de μ-σ a μ+2σ. -->
- [x] C) 81.5% <!-- feedback: Correcto. [55,85] = [μ-σ, μ+2σ]. Dentro de μ±σ: 68%. Entre μ+σ y μ+2σ: 13.5%. Total: 34% (de μ a μ+σ) + 34% (μ-σ a μ) + 13.5% (μ+σ a μ+2σ) = 81.5%. -->
- [ ] D) 99.7% <!-- feedback: Incorrecto. 99.7% corresponde a μ±3σ = [35,95], un intervalo mucho más amplio. -->

### Explicación Pedagógica
La regla empírica de la distribución normal: 68% de los datos están a 1σ de la media, 95% a 2σ y 99.7% a 3σ. Las áreas parciales se calculan por simetría.

---

## Question 7 (Difficulty D5)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

**Contexto:** Se quiere encontrar la ecuación de la recta tangente a f(x) = x² en x = 3.

### Enunciado
¿Cuál es la ecuación de la recta tangente a f(x) = x² en x = 3?

### Opciones
- [ ] A) y = 2x - 9 <!-- feedback: Incorrecto. Pendiente f'(3)=6. f(3)=9. y-9=6(x-3), y=6x-9. -->
- [x] B) y = 6x - 9 <!-- feedback: Correcto. f'(x)=2x, f'(3)=6. f(3)=9. Ecuación: y-9=6(x-3) → y=6x-9. -->
- [ ] C) y = 6x + 9 <!-- feedback: Incorrecto. Error en el intercepto: y-9=6(x-3) → y=6x-18+9=6x-9. -->
- [ ] D) y = 3x - 9 <!-- feedback: Incorrecto. Pendiente incorrecta. f'(3)=6, no 3. -->

### Explicación Pedagógica
La recta tangente en x=a tiene pendiente f'(a) y pasa por (a, f(a)). Su ecuación es y - f(a) = f'(a)(x - a).

---

## Question 8 (Difficulty D6)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

**Contexto:** Se lanza una moneda 10 veces. X = número de caras obtenidas.

### Enunciado
¿Cuál es la probabilidad de obtener exactamente 6 caras?

### Opciones
- [ ] A) 0.1172 <!-- feedback: Incorrecto. Este valor corresponde a P(X=5) o P(X=6) mal calculado. -->
- [x] B) 0.2051 <!-- feedback: Correcto. P(X=6) = C(10,6)·(0.5)¹⁰ = 210·(0.5)¹⁰ = 210/1024 = 0.2051. -->
- [ ] C) 0.3760 <!-- feedback: Incorrecto. Probabilidad sobreestimada. -->
- [ ] D) 0.5000 <!-- feedback: Incorrecto. La probabilidad de exactamente 6 caras es menor que 0.5. -->

### Explicación Pedagógica
Para una moneda justa (p=0.5), la probabilidad binomial simplifica a P(X=k)=C(n,k)/2ⁿ. C(10,6)=210, 2¹⁰=1024, P=210/1024≈0.2051.

---

## Question 9 (Difficulty D6)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

**Contexto:** La ecuación x² + y² + 6x - 4y - 12 = 0 representa una circunferencia. Se debe transformar a su forma canónica.

### Enunciado
Al completar cuadrados en x² + y² + 6x - 4y - 12 = 0, ¿cuál es la ecuación canónica resultante?

### Opciones
- [ ] A) (x+3)² + (y-2)² = 25 <!-- feedback: Correcto. (x²+6x+9) + (y²-4y+4) = 12+9+4 → (x+3)²+(y-2)²=25. -->
- [ ] B) (x+3)² + (y-2)² = 12 <!-- feedback: Incorrecto. Faltan los términos añadidos al completar cuadrados en el lado derecho. -->
- [ ] C) (x-3)² + (y+2)² = 25 <!-- feedback: Incorrecto. Signos incorrectos en el centro: x²+6x → (x+3)², no (x-3)². -->
- [ ] D) (x+6)² + (y-4)² = 12 <!-- feedback: Incorrecto. No completaste los cuadrados correctamente. -->

### Explicación Pedagógica
Para completar cuadrados: agrupa términos en x y en y. (x²+6x) → (x+3)²-9, (y²-4y) → (y-2)²-4. Luego despeja para obtener (x+3)²+(y-2)²=25.

---

## Question 10 (Difficulty D6)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Comunicación y Representación

**Contexto:** En un laboratorio de biología en la Universidad del Cauca, se analiza la velocidad de crecimiento de una bacteria con ecuación de posición s(t) = t³ - 6t² + 9t.

### Enunciado
¿Cuál es la función velocidad v(t) = s'(t)?

### Opciones
- [ ] A) v(t) = t² - 12t + 9 <!-- feedback: Incorrecto. Error: d/dt(t³)=3t², no t². -->
- [x] B) v(t) = 3t² - 12t + 9 <!-- feedback: Correcto. v(t)=ds/dt=3t²-12t+9. -->
- [ ] C) v(t) = 3t² - 12t <!-- feedback: Incorrecto. La derivada de 9t es 9, no 0. -->
- [ ] D) v(t) = 3t² + 12t + 9 <!-- feedback: Incorrecto. Error de signo: el término cuadrático es -6t², cuya derivada es -12t. -->

### Explicación Pedagógica
En cinemática, la velocidad es la derivada de la posición respecto al tiempo. Se aplican las reglas de derivación a cada término.

---

## Question 11 (Difficulty D7)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v11`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

**Contexto:** Un fabricante de llantas en Medellín sabe que el 2% de sus llantas tiene defectos. Se venden 100 llantas.

### Enunciado
Usando la aproximación de Poisson a la binomial (λ=np=2), ¿cuál es la probabilidad aproximada de que exactamente 3 llantas tengan defectos?

### Opciones
- [ ] A) 0.1353 <!-- feedback: Incorrecto. P(X=3)=e⁻²·(2³/3!) = e⁻²·8/6 = 0.1353·1.333=0.1804. -->
- [x] B) 0.1804 <!-- feedback: Correcto. λ=2. P(X=3) = e⁻²·2³/3! = 0.1353·8/6 = 0.1804. -->
- [ ] C) 0.2707 <!-- feedback: Incorrecto. Probablemente P(X=2)=e⁻²·2²/2! = 0.2707, no P(X=3). -->
- [ ] D) 0.0902 <!-- feedback: Incorrecto. Posible error: e⁻²·2³/3! con λ=2 mal calculado. -->

### Explicación Pedagógica
La distribución de Poisson aproxima la binomial cuando n es grande y p pequeño. λ = np = 2. P(X=k) = e⁻λ·λᵏ/k!.

---

## Question 12 (Difficulty D7)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

**Contexto:** Se analiza el comportamiento de la función f(x) = x³ - 3x² + 2.

### Enunciado
¿En qué puntos la recta tangente a f(x) = x³ - 3x² + 2 tiene pendiente 0?

### Opciones
- [ ] A) x = 0 y x = 3 <!-- feedback: Incorrecto. f'(x)=3x²-6x=3x(x-2)=0 → x=0, x=2. -->
- [x] B) x = 0 y x = 2 <!-- feedback: Correcto. f'(x)=3x²-6x=3x(x-2)=0. Las soluciones son x=0 y x=2. -->
- [ ] C) x = 1 <!-- feedback: Incorrecto. f'(1)=3-6=-3≠0. -->
- [ ] D) x = -2 y x = 2 <!-- feedback: Incorrecto. f'(-2)=12+12=24≠0. -->

### Explicación Pedagógica
Los puntos donde la recta tangente es horizontal corresponden a los puntos críticos de la función, donde f'(x)=0. Se resuelve f'(x)=0.

---

## Question 13 (Difficulty D7)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v13`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

**Contexto:** Las estaturas de los estudiantes de grado 10 en un colegio de Pasto siguen una distribución normal con μ=165 cm y σ=8 cm.

### Enunciado
¿Qué porcentaje de estudiantes mide más de 173 cm? (z=(173-165)/8=1.0, P(Z>1.0)=0.1587)

### Opciones
- [ ] A) 34.13% <!-- feedback: Incorrecto. 34.13% es el área entre la media y z=1. -->
- [x] B) 15.87% <!-- feedback: Correcto. z=1. P(Z>1)=0.5-P(0<Z<1)=0.5-0.3413=0.1587. -->
- [ ] C) 84.13% <!-- feedback: Incorrecto. Este es P(Z<1)=0.8413, el complemento. -->
- [ ] D) 2.5% <!-- feedback: Incorrecto. 2.5% correspondería a z≈1.96 (2 desviaciones). -->

### Explicación Pedagógica
Para calcular probabilidades en la normal, estandarizamos: z=(x-μ)/σ. Luego se usa la tabla normal estándar. P(X>173)=P(Z>1)=0.1587.

---

## Question 14 (Difficulty D8)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v14`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

**Contexto:** Un estudiante afirma que la ecuación 4x² + 9y² = 36 representa una circunferencia.

### Enunciado
Evalúa la afirmación del estudiante. ¿Qué representa realmente la ecuación 4x² + 9y² = 36?

### Opciones
- [ ] A) Sí, es una circunferencia de radio 6. <!-- feedback: Incorrecto. Una circunferencia requiere coeficientes iguales para x² e y². -->
- [ ] B) Es una hipérbola. <!-- feedback: Incorrecto. La hipérbola tiene signo menos entre los términos cuadráticos. -->
- [x] C) Es una elipse. <!-- feedback: Correcto. x²/9 + y²/4 = 1. Los coeficientes son positivos pero diferentes, formando una elipse con semiejes a=3, b=2. -->
- [ ] D) Es una parábola. <!-- feedback: Incorrecto. Una parábola tiene solo un término cuadrático. -->

### Explicación Pedagógica
Dividiendo por 36: x²/9 + y²/4 = 1. Es una elipse con centro en (0,0), semieje mayor a=3 en x y semieje menor b=2 en y.

---

## Question 15 (Difficulty D8)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v15`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

**Contexto:** Se define la variable aleatoria X = número de caras al lanzar 3 monedas. Se pide analizar su distribución de probabilidad.

### Enunciado
¿Cuál es el valor esperado E[X] y la varianza Var(X)?

### Opciones
- [ ] A) E[X]=1.5, Var(X)=0.75 <!-- feedback: Correcto. n=3, p=0.5. E[X]=np=1.5. Var(X)=np(1-p)=3·0.5·0.5=0.75. -->
- [ ] B) E[X]=1.5, Var(X)=1.5 <!-- feedback: Incorrecto. Var(X)=np(1-p)=0.75, no 1.5. -->
- [ ] C) E[X]=3, Var(X)=0.75 <!-- feedback: Incorrecto. np=3·0.5=1.5, no 3. -->
- [ ] D) E[X]=0.5, Var(X)=0.25 <!-- feedback: Incorrecto. n=3, p=0.5, E[X]=1.5, Var=0.75. -->

### Explicación Pedagógica
Para una variable binomial: E[X] = np y Var(X) = np(1-p). Con n=3 y p=0.5, E[X]=1.5 y Var=0.75.

---

## Question 16 (Difficulty D8)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v16`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

**Contexto:** En un examen, los estudiantes deben determinar si la función f(x) = x³/3 - 4x tiene un máximo o mínimo local en x=2.

### Enunciado
Usando la derivada, ¿qué tipo de punto crítico tiene f(x)=x³/3-4x en x=2?

### Opciones
- [ ] A) Máximo local. <!-- feedback: Incorrecto. f'(x)=x²-4=0 → x=±2. f''(x)=2x. f''(2)=4>0 → mínimo local. -->
- [x] B) Mínimo local. <!-- feedback: Correcto. f'(x)=x²-4=0 en x=±2. f''(x)=2x. f''(2)=4>0, cóncava hacia arriba → mínimo local. -->
- [ ] C) Punto de inflexión. <!-- feedback: Incorrecto. f''(2)=4≠0, no es punto de inflexión. El punto de inflexión está en x=0 donde f''(x)=0. -->
- [ ] D) No es un punto crítico. <!-- feedback: Incorrecto. f'(2)=4-4=0, sí es un punto crítico. -->

### Explicación Pedagógica
La prueba de la segunda derivada: si f'(c)=0 y f''(c)>0, es mínimo local. Si f'(c)=0 y f''(c)<0, es máximo local. Si f''(c)=0, la prueba es inconclusa.

---

## Question 17 (Difficulty D9)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

**Contexto:** Estudiantes debaten sobre la veracidad de: "La derivada de f(x)g(x) es f'(x)g'(x)".

### Enunciado
Evalúa la afirmación. ¿Cuál es la regla correcta para derivar el producto de dos funciones?

### Opciones
- [ ] A) (fg)' = f'g' <!-- feedback: Incorrecto. Esta es una creencia errónea común. La derivada del producto no es el producto de las derivadas. -->
- [ ] B) (fg)' = f'g + fg' <!-- feedback: Correcto. Esta es la regla del producto. Ejemplo: (x²·x³)' = 2x·x³ + x²·3x² = 2x⁴+3x⁴=5x⁴, y la derivada de x⁵=5x⁴. -->
- [ ] C) (fg)' = f' + g' <!-- feedback: Incorrecto. Eso es la derivada de la suma, no del producto. -->
- [ ] D) (fg)' = (f/g)' <!-- feedback: Incorrecto. No hay relación entre ambas reglas. -->

### Explicación Pedagógica
La regla del producto: (f·g)' = f'·g + f·g'. No confundir con la regla de la suma ni con el falso producto de derivadas.

---

## Question 18 (Difficulty D9)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v18`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

**Contexto:** Un estudio afirma que el 30% de los estudiantes de grado 10 en Colombia tiene acceso a internet de alta velocidad. Se encuesta a 50 estudiantes y 10 tienen acceso.

### Enunciado
Con α=0.05, ¿hay evidencia para rechazar la afirmación de que p=0.30? (z*₁.₉₆)

### Opciones
- [ ] A) Sí, porque p̂=0.2 < 0.3. <!-- feedback: Incorrecto. La evidencia no es solo por el valor puntual. -->
- [ ] B) No, porque z = -1.54 está en la región de no rechazo. <!-- feedback: Correcto. z=(0.2-0.3)/√(0.3·0.7/50) = -0.1/0.0648 = -1.543. |-1.543|<1.96 → no se rechaza H₀. -->
- [ ] C) Sí, porque el valor p es 0.06 > 0.05. <!-- feedback: Incorrecto. Si valor p > α, no se rechaza H₀. -->
- [ ] D) No, porque z = -2.5 está fuera del rango. <!-- feedback: Incorrecto. El cálculo da z=-1.543, no -2.5. -->

### Explicación Pedagógica
En prueba de hipótesis para proporción: z=(p̂-p₀)/√(p₀(1-p₀)/n). Si |z|<z*, no hay evidencia suficiente para rechazar H₀ al nivel α.

---

## Question 19 (Difficulty D9)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v19`
**Bloom:** Create
**ICFES:** Formulación y Ejecución

**Contexto:** Un diseñador gráfico en Bogotá necesita crear una curva parabólica que pase por (0, 0) y (4, 0) con vértice en (2, 8).

### Enunciado
Determina la ecuación de la parábola que pasa por (0,0) y (4,0) con vértice en (2,8).

### Opciones
- [x] A) y = -2(x-2)² + 8 <!-- feedback: Correcto. Forma canónica y=a(x-h)²+k. Vértice (2,8). Con (0,0): 0=a(0-2)²+8 → 0=4a+8 → a=-2. -->
- [ ] B) y = 2(x-2)² + 8 <!-- feedback: Incorrecto. a positiva da parábola abierta hacia arriba, pero el vértice es el máximo, así que a debe ser negativa. -->
- [ ] C) y = -(x-2)² + 8 <!-- feedback: Incorrecto. Con a=-1, en x=0: y=-(4)+8=4≠0. -->
- [ ] D) y = -2(x+2)² + 8 <!-- feedback: Incorrecto. El vértice es (h,k)=(2,8), por lo que (x-2), no (x+2). -->

### Explicación Pedagógica
La ecuación canónica de la parábola es y = a(x-h)² + k con vértice (h,k). Se sustituye un punto conocido para encontrar el valor de a.

---

## Question 20 (Difficulty D10)

**ID:** `CO-MAT-10-2026-P4-comprehensive-001-MASTERY-v20`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

**Contexto:** Una empresa de logística en Barranquilla modela sus costos de producción como C(x)=1000+50x-0.1x², donde x es el número de unidades. El ingreso es I(x)=120x-0.2x².

### Enunciado
¿Cuál es el nivel de producción que maximiza la ganancia G(x) = I(x) - C(x)?

### Opciones
- [ ] A) x=100 unidades <!-- feedback: Incorrecto. G(x)=120x-0.2x²-1000-50x+0.1x² = -0.1x²+70x-1000. G'(x)=-0.2x+70=0 → x=350. -->
- [ ] B) x=200 unidades <!-- feedback: Incorrecto. G'(x)=0 → x=350. -->
- [x] C) x=350 unidades <!-- feedback: Correcto. G(x)=120x-0.2x²-1000-50x+0.1x² = -0.1x²+70x-1000. G'(x)=-0.2x+70=0 → x=350. G''(350)=-0.2<0 → máximo. -->
- [ ] D) x=500 unidades <!-- feedback: Incorrecto. G'(500)=-100+70=-30<0, la ganancia ya está decreciendo. -->


[//]: # (QUALITY_REVIEW)
[//]: # (STATUS: LEGACY - FREE USE)
[//]: # (SCORE: N/A - Pre-QR era)
