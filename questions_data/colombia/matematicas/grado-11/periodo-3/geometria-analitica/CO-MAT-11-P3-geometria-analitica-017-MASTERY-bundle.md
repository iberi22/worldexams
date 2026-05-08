<think>Generate 20 ICFES-style math questions for analytical geometry, grade 11, period 3.

Topics to cover:
- Conic sections (parabola, ellipse, hyperbola, circle)
- Equation of lines
- Distance between points
- Slope and angle
- Coordinate transformations
- Locus problems
- Optimization with geometry

Difficulty: D3-D10 progressive

I'll generate them in the exact format requested.
</think>

```yaml
---
id: "CO-MAT-11-P3-geometria-analitica-017-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "geometria-analitica"
periodo: 3
protocol_version: "5.1"
bundle_size: 20
bundle_index: 17
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-16T00:06:04.714489"
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

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Identifier el tipo de cónica a partir de su ecuación general
**Context:** Estudiante analiza la trayectoria de un dron de vigilancia en el Valle de Aburrá

### Enunciado
Una empresa de seguridad utiliza drones que siguen trayectorias modeladas por ecuaciones cartesianas. El dron sigue la trayectoria descrita por la ecuación x² + y² - 4x + 6y - 3 = 0. ¿Qué tipo de cónica representa esta trayectoria?

### Options
- [ ] A) Parábola
- [ ] B) Elipse
- [x] C) Circunferencia <!-- feedback: Al completar cuadrados, se obtiene (x-2)² + (y+3)² = 16, ecuación de una circunferencia con centro (2, -3) y radio 4 -->
- [ ] D) Hipérbola <!-- feedback: Una hipérbola tiene términos con signos opuestos (uno positivo y uno negativo), lo cual no ocurre aquí -->

### Explicación Pedagógica
Para identificar el tipo de cónica, analizamos la ecuación general. Cuando los coeficientes de x² e y² son iguales y del mismo signo, sin término xy, se trata de una circunferencia. Completando cuadrados: x² - 4x + y² + 6y = 3 → (x-2)² + (y+3)² = 4². El error común es confundirla con elipse (coeficientes desiguales) o no completar correctamente los cuadrados.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Interpretar el significado geométrico de la pendiente
**Context:** Ingeniero civil calcula la pendiente de una carretera en la vía al Llano

### Enunciado
En la construcción de un tramo de la vía Bogotá-Villavicencio, un ingeniero debe verificar que la pendiente de una sección no supere el 8%. Si la carretera asciende 40 metros en distancia horizontal de 500 metros, ¿cuál es el valor de la pendiente en porcentaje?

### Options
- [ ] A) 4%
- [x] B) 8% <!-- feedback: Pendiente = (Δy/Δx) × 100 = (40/500) × 100 = 8%. Es exactamente el límite permitido -->
- [ ] C) 12%
- [ ] D) 2% <!-- feedback: Error de cálculo: 40/500 = 0.08 = 8%, no 2%. Dividir incorrectamente da este resultado -->

### Explicación Pedagógica
La pendiente en porcentaje se calcula como (desplazamiento vertical / desplazamiento horizontal) × 100. En este caso: m = (40/500) × 100 = 8%. Un error frecuente es olvidar multiplicar por 100, reportando 0.08 en lugar de 8%. El distractor 12% resulta desumar 40+500=540 y luego dividir, error común en problemas de pendientes.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Aplicar la fórmula de distancia entre dos puntos
**Context:** Operador de logística calcula distancias en el puerto de Barranquilla

### Enunciado
Un operador de logística en el puerto de Barranquilla debe calcular la distancia más corta entre dos puntos de almacenamiento. Las coordenadas de los puntos son A(3, -2) y B(7, 5). ¿Cuál es la distancia en unidades del plano entre estos puntos?

### Options
- [ ] A) √53 unidades
- [ ] B) √45 unidades
- [x] C) √65 unidades <!-- feedback: d = √[(7-3)² + (5-(-2))²] = √[16 + 49] = √65 unidades -->
- [ ] D) √73 unidades <!-- feedback: Error común: sumar 4² + 7² = 16 + 7 = 23, sacando raíz de 23 en lugar de 49+16=65 -->

### Explicación Pedagógica
Aplicamos la fórmula de distancia: d = √[(x₂-x₁)² + (y₂-y₁)²]. Con A(3,-2) y B(7,5): diferencia en x = 4, diferencia en y = 7. Entonces d = √[4² + 7²] = √[16 + 49] = √65. El error frecuente es no elevar al cuadrado antes de sumar o confundir los signos de las diferencias.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Determinar el punto medio de un segmento
**Context:** Diseñador urbano planifica un parque lineal en la Avenida El Dorado de Bogotá

### Enunciado
La Secretaría de Movilidad de Bogotá quiere instalar postes de iluminación evenly espaciados en un tramo de la Avenida El Dorado entre dos intersecciones. Si las coordenadas de las intersecciones son P(-4, 6) y Q(8, -2), ¿cuáles son las coordenadas del punto medio de este tramo?

### Options
- [ ] A) (2, 2)
- [ ] B) (6, 4)
- [x] C) (2, 2) <!-- feedback: M = [(-4+8)/2, (6+(-2))/2] = (4/2, 4/2) = (2, 2) -->
- [ ] D) (-6, 4) <!-- feedback: Error de signo: (-4-8)/2 = -12/2 = -6 para x, pero debe ser (-4+8)/2 = 4/2 = 2 -->

### Explicación Pedagógica
El punto medio se calcula como M = ((x₁+x₂)/2, (y₁+y₂)/2). Para P(-4,6) y Q(8,-2): M = ((-4+8)/2, (6-2)/2) = (4/2, 4/2) = (2,2). Error común: restar en lugar de sumar las coordenadas, especialmente con signos negativos como en -4 + 8.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v5`
**Bloom:** Understand
**ICFES:** Reconocer los elementos de la ecuación de la parábola
**Context:** Estudiante diseña un espejo parabólico para un horno solar en el desierto de La Guajira

### Enunciado
Un horno solar experimental en Uribia, La Guajira, utiliza un espejo con forma parabólica. La ecuación del espejo en un sistema coordenado con vértice en el origen es y² = 12x. ¿Cuáles son las coordenadas del foco de esta parábola?

### Options
- [ ] A) F(3, 0)
- [x] B) F(3, 0) <!-- feedback: Para y² = 4px, tenemos 4p = 12, entonces p = 3. El foco es F(3, 0) porque la parábola abre hacia la derecha -->
- [ ] C) F(0, 3)
- [ ] D) F(-3, 0) <!-- feedback: Error de confundir la dirección de apertura. Si p = 3 > 0, abre hacia la derecha, no hacia la izquierda -->

### Explicación Pedagógica
Para una parábola vertical que abre a la derecha con ecuación y² = 4px, el parámetro p se obtiene de 4p = 12, entonces p = 3. El foco está en (p, 0) = (3, 0). Confundir el signo de p es un error frecuente. Si la ecuación fuera y² = -12x, entonces p = -3 y el foco sería (-3, 0).

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v6`
**Bloom:** Understand
**ICFES:** Identificar los elementos principales de una elipse
**Context:** Ingeniero diseña un domo con estructura elíptica para el Planetario de Medellín

### Enunciado
El domo del Planetario de Medellín tiene un corte transversal modelado por la elipse con ecuación x²/25 + y²/9 = 1. ¿Cuál es la longitud del eje mayor de esta elipse?

### Options
- [ ] A) 10 unidades
- [ ] B) 6 unidades
- [x] C) 10 unidades <!-- feedback: a² = 25, entonces a = 5. El eje mayor = 2a = 10. Como a > b, el eje mayor está en la dirección x -->
- [ ] D) 8 unidades <!-- feedback: Error de tomar solo 'a' en lugar de 2a. a = 5 es el semieje mayor, no el eje mayor completo -->

### Explicación Pedagógica
En la elipse x²/a² + y²/b² = 1, si a > b, el eje mayor tiene longitud 2a y está sobre el eje x. Aquí a² = 25, entonces a = 5. Por lo tanto, el eje mayor = 2(5) = 10. Un error frecuente es confundir a con el eje mayor completo. Similarmente, b² = 9 implica b = 3 para el eje menor de longitud 6.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Determinar la ecuación de una recta dados dos puntos
**Context:** Topógrafo determina la ecuación del terreno entre dos puntos de medición en el Eje Cafetero

### Enunciado
Un topógrafo en Pereira traza una línea de nivelación entre los puntos A(1, 3) y B(5, 11). ¿Cuál es la ecuación de la recta en forma punto-pendiente?

### Options
- [ ] A) y - 3 = 2(x - 1)
- [ ] B) y - 3 = 3(x - 1)
- [x] C) y - 3 = 2(x - 1) <!-- feedback: m = (11-3)/(5-1) = 8/4 = 2. Usando punto A(1,3): y - 3 = 2(x - 1) -->
- [ ] D) y - 5 = 2(x - 3) <!-- feedback: Error de promediar los puntos: M(3,7) y luego usar (3,7) como "punto" -->

### Explicación Pedagógica
Primero calculamos la pendiente: m = (y₂-y₁)/(x₂-x₁) = (11-3)/(5-1) = 8/4 = 2. Usando punto A(1,3), la forma punto-pendiente es y - y₁ = m(x - x₁), entonces y - 3 = 2(x - 1). Error común: calcular incorrectamente la pendiente (8/4 = 4 en lugar de 2) o confundir cuál punto usar.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Analizar la posición relativa de rectas mediante pendientes
**Context:** Arquitecto analiza la pendiente de dos calles que se cruzan en el centro de Cali

### Enunciado
Dos calles en el centro de Cali están representadas por las rectas L₁: 2x + 3y - 5 = 0 y L₂: 4x + 6y - 7 = 0. ¿Cuál es la posición relativa de estas dos calles?

### Options
- [x] A) Rectas paralelas <!-- feedback: L₁ tiene pendiente m₁ = -2/3. L₂ tiene pendiente m₂ = -4/6 = -2/3. Como m₁ = m₂ y las ordenadas en el origen son diferentes (-5/3 ≠ -7/6), son paralelas -->
- [ ] B) Rectas perpendiculares
- [ ] C) Rectas coincidentes
- [ ] D) Rectas que se cortan en un ángulo de 45° <!-- feedback: Error de confundir perpendicular con平行. Para perpendicular, m₁ × m₂ = -1, pero (-2/3)(-2/3) = 4/9 ≠ -1 -->

### Explicación Pedagógica
Convertimos ambas ecuaciones a forma pendiente: L₁: y = (-2/3)x + 5/3, entonces m₁ = -2/3. L₂: y = (-2/3)x + 7/6, entonces m₂ = -2/3. Como las pendientes son iguales pero las ordenadas en el origen son diferentes, las rectas son paralelas. Error frecuente: no convertir correctamente o confundir平行 con coincidente.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v9`
**Bloom:** Understand
**ICFES:** Interpretar los elementos de una hipérbola
**Context:** Analista de datos estudia la trayectoria hiperbólica de un cometa visible desde Villa de Leyva

### Enunciado
Un astrónomo del observatorio de Villa de Leyva analiza un cometa cuya trayectoria está modelada por la hipérbola x²/16 - y²/9 = 1. ¿Cuál es la distancia entre los vértices de esta hipérbola?

### Options
- [ ] A) 8 unidades
- [x] B) 8 unidades <!-- feedback: Para la hipérbola x²/a² - y²/b² = 1, los vértices están en (±a, 0). Como a² = 16, a = 4. La distancia entre vértices = 2a = 8 -->
- [ ] C) 6 unidades
- [ ] D) 10 unidades <!-- feedback: Error de confundir 'a' con la distancia total. a = 4 es la distancia del centro a cada vértice, no la distancia entre vértices -->

### Explicación Pedagógica
Para la hipérbola x²/16 - y²/9 = 1, identificamos a² = 16, entonces a = 4. Los vértices están en (±a, 0) = (±4, 0). La distancia entre los dos vértices es 4 - (-4) = 8. Error común: olvidar multiplicar por 2 y reportar solo a = 4, o confundir con la distancia focal (2c).

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Aplicar rotación de ejes para eliminar el término xy
**Context:** Estudiante resuelve un problema de óptica geométrica con cónicas rotadas en Popayán

### Enunciado
La ecuación 5x² + 4xy + 5y² = 9 representa una sección cónica rotada. ¿Cuál es el ángulo de rotación θ necesario para eliminar el término xy?

### Options
- [ ] A) θ = 30°
- [ ] B) θ = 45°
- [x] C) θ = 45° <!-- feedback: Para eliminar el término xy, usamos cot(2θ) = (A-C)/B. Aquí A=5, B=4, C=5. cot(2θ) = (5-5)/4 = 0. Entonces 2θ = 90°, θ = 45° -->
- [ ] D) θ = 60° <!-- feedback: Error de cálculo: cot(2θ) = 0 implica 2θ = 90° o 2θ = 270°, pero 270°/2 = 135°, no 60° -->

### Explicación Pedagógica
La fórmula para el ángulo de rotación es cot(2θ) = (A-C)/B. Con A = 5, B = 4, C = 5: cot(2θ) = (5-5)/4 = 0/4 = 0. Entonces 2θ = 90° (o 270°), resultando en θ = 45°. Error frecuente: aplicar incorrectamente la fórmula o confundir cuándo usar tangente vs cotangente.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Analizar condiciones de perpendicularidad entre rectas
**Context:** Diseñador de antenas verifica el ángulo de instalación en una torre de telecomunicaciones en Rionegro

### Enunciado
Una antena de telecomunicaciones en Rionegro debe instalarse perpendicular a una línea de transmisión eléctrico representada por la recta L: 3x - 4y + 7 = 0. ¿Cuál es la pendiente de la línea que representa la antena?

### Options
- [ ] A) -3/4
- [ ] B) 4/3
- [x] C) -4/3 <!-- feedback: La pendiente de L es m₁ = 3/4. Para rectas perpendiculares: m₂ = -1/m₁ = -1/(3/4) = -4/3 -->
- [ ] D) 3/4 <!-- feedback: Error de no invertir el signo. Tomar m₂ = m₁ directamente, confundiendo perpendicular con paralela -->

### Explicación Pedagógica
Primero encontramos la pendiente de L: 3x - 4y + 7 = 0 → y = (3/4)x + 7/4, entonces m₁ = 3/4. Dos rectas perpendiculares cumplen m₁ × m₂ = -1, por lo tanto m₂ = -1/(3/4) = -4/3. El distractor 4/3 aplica la condición de perpendicularidad sin el signo negativo.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Analizar el discriminante para clasificar cónicas
**Context:** Estudiante clasifica ecuaciones de cónicas para un proyecto de robótica en Bucaramanga

### Enunciado
Dada la ecuación general de segundo grado 2x² + 4xy + 8y² - 3x + 5y + 1 = 0, ¿qué tipo de cónica representa esta ecuación? Utilice el discriminante B² - 4AC.

### Options
- [ ] A) Parábola (B² - 4AC = 0)
- [ ] B) Elipse (B² - 4AC < 0)
- [x] C) Elipse (B² - 4AC < 0) <!-- feedback: A=2, B=4, C=8. B² - 4AC = 16 - 4(2)(8) = 16 - 64 = -48 < 0. Cuando B² - 4AC < 0 y A = C, es una circunferencia; cuando B² - 4AC < 0 y A ≠ C, es una elipse -->
- [ ] D) Hipérbola (B² - 4AC > 0) <!-- feedback: Error de cálculo: 4² = 16, pero 4AC = 4(2)(8) = 64, entonces B² - 4AC = 16 - 64 = -48, no positivo -->

### Explicación Pedagógica
El discriminante de una ecuación general de segundo grado es B² - 4AC. Con A=2, B=4, C=8: B² - 4AC = 16 - 64 = -48 < 0. Si B² - 4AC < 0, la cónica es elipse (o circunferencia si además A = C). Si B² - 4AC = 0, es parábola. Si B² - 4AC > 0, es hipérbola. Error común: calcular incorrectamente 4AC o malinterpretar el resultado.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v13`
**Bloom:** Apply
**ICFES:** Determinar la ecuación canónica de una parábola
**Context:** Ingeniero diseña un puente colgante donde los cables tienen forma parabólica en el Cañón del Chicamocha

### Enunciado
Un ingeniero diseña un modelo simplificado de puente colgante donde el cable principal sigue una parábola con vértice en (0, 4) y foco en (0, 9). ¿Cuál es la ecuación canónica de esta parábola?

### Options
- [ ] A) (x - 0)² = 20(y - 4)
- [ ] B) (x)² = 20(y - 9)
- [x] C) (x)² = 20(y - 4) <!-- feedback: El vértice es V(0,4) y el foco es F(0,9), entonces p = 9 - 4 = 5. La ecuación es (x - h)² = 4p(y - k) = (x)² = 20(y - 4) -->
- [ ] D) (x)² = 10(y - 4) <!-- feedback: Error de usar p en lugar de 4p: (x)² = 4(5)(y - 4) = 20(y - 4), pero有人说 10(y-4) confunde p con 2p -->

### Explicación Pedagógica
Para una parábola vertical con vértice en (h,k) = (0,4) y foco en (h, k+p) = (0,9), tenemos p = 9 - 4 = 5. La ecuación canónica es (x - h)² = 4p(y - k). Sustituyendo: (x)² = 4(5)(y - 4) = 20(y - 4). Error frecuente: olvidar que debe ser 4p, no p, y usar 10 en lugar de 20.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v14`
**Bloom:** Apply
**ICFES:** Calcular la distancia de un punto a una recta
**Context:** Operador de drone de vigilancia calcula la distancia de un dron a una cerca perimetral en una mina de Cerro Matoso

### Enunciado
Un drone de monitoreo en Cerro Matoso debe mantener una distancia mínima de 10 metros de una cerca de seguridad modelada por la recta 3x + 4y - 24 = 0. Si el drone está en el punto P(4, 8), ¿cumple con la distancia mínima?

### Options
- [ ] A) Sí, la distancia es aproximadamente 6.1 metros
- [x] B) No, la distancia es aproximadamente 4.4 metros <!-- feedback: d = |3(4) + 4(8) - 24|/√(3² + 4²) = |12 + 32 - 24|/5 = 20/5 = 4. El drone está a solo 4 metros, menos que los 10 metros requeridos -->
- [ ] C) Sí, la distancia es exactamente 4 metros
- [ ] D) No, la distancia es aproximadamente 6.5 metros <!-- feedback: Error en numerador: |12 + 8 - 24| = |-4| = 4, pero algunos suman incorrectamente: 12 + 8 + 24 = 44, dando d = 44/5 = 8.8 ≈ 6.5 -->

### Explicación Pedagógica
La distancia de un punto P(x₀,y₀) a una recta Ax + By + C = 0 es d = |Ax₀ + By₀ + C|/√(A² + B²). Para P(4,8) y la recta 3x + 4y - 24 = 0: d = |12 + 32 - 24|/5 = 20/5 = 4 metros. Como 4 < 10, el drone NO cumple la distancia mínima. Error común:error de signo en el numerador omal calculo de la raiz.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v15`
**Bloom:** Analyze
**ICFES:** Analizar la ecuación de la elipse con centro desplazado
**Context:** Estudiante analiza las órbitas planetarias para un proyecto de astronomía en la Universidad de los Andes

### Enunciado
La órbita de un satélite artificial alrededor de la Tierra se modela mediante una elipse con centro en C(3, -2), un vértice en (8, -2) y un foco en (5, -2). ¿Cuál es la ecuación canónica de esta elipse?

### Options
- [ ] A) (x - 3)²/25
