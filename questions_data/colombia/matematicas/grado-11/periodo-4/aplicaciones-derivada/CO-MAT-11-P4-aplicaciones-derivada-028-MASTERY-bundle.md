<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for Colombian Math exam (Saber 11) on the topic "aplicaciones-derivada" (applications of derivatives), grade 11, period 4.

Let me carefully follow the format and rules:

1. 20 questions total
2. Difficulty progression: D3-D4 (questions 1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
3. 4 options each, with [x] marking the correct one
4. Colombian context
5. Follow the exact structure with frontmatter YAML
6. No "all of the above" or "none of the above"
7. Plausible distractors based on common student errors

Let me generate questions covering applications of derivatives:
- Related rates
- Optimization
- Motion (position, velocity, acceleration)
- Curve sketching (increasing/decreasing, concavity)
- Linear approximation
- Newton's method
- L'Hôpital's rule
- Maxima/minima problems

I'll create questions with Colombian context where possible.

Let me structure them:

**Question 1 (Variant Basic - Difficulty D3)**
- Basic concept of derivative as rate of change
- Simple context

**Question 2 (Variant Basic - Difficulty D3)**
- Understanding derivative rules application

... and so on up to difficulty D10.

Let me generate all 20 questions:

1. D3 - Basic rate of change concept
2. D3 - Derivative rules application (polynomial)
3. D4 - Chain rule application
4. D4 - Simple related rates
5. D5 - Related rates problem
6. D5 - Optimization basic
7. D5 - Second derivative test concept
8. D6 - Motion analysis
9. D6 - Optimization with constraint
10. D6 - Related rates with trig


11. D7 - Curve sketching concepts
12. D7 - Analyzing f'(x) and f''(x)
13. D7 - Applied optimization (business/economics)
14. D8 - Related rates complex
15. D8 - Limits with derivatives (L'Hôpital)
16. D8 - Newton's method
17. D9 -综合 optimization problem
18. D9 - Implicit differentiation with related rates
19. D10 - Motion with multiple variables
20. D10 - Complex applied problem

I need to ensure proper formatting with correct answer identification, pedagogical explanations for each, and Colombian contextual framing throughout.

</think>

---
id: "CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "aplicaciones-derivada"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 28
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T09:24:24.799869"
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

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY-v1`
**Bloom:** [Understand]
**ICFES:** [Interpretar situaciones que involucren tasas de cambio]
**Context:** Aceleración de ventas en empresa colombiana

### Enunciado
En una empresa de confecciones en Medellín, las ventas mensuales (en millones de pesos) están dadas por V(t) = 2t³ - 3t² + 10, donde t es el tiempo en meses desde enero. ¿Cuál es la tasa de cambio de las ventas en t = 2 meses?

### Options
- [ ] A) 14 millones de pesos/mes
- [ ] B) 18 millones de pesos/mes
- [x] C) 22 millones de pesos/mes
- [ ] D) 26 millones de pesos/mes

### Explicación Pedagógica
La tasa de cambio es la derivada V'(t) = 6t² - 6t. Evaluando en t=2: V'(2) = 6(4) - 6(2) = 24 - 12 = 18. Error común: confundir V(2) con V'(2), quienes obtienen 14 millones. Otro error es no aplicar correctamente la regla de la potencia.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY-v2`
**Bloom:** [Apply]
**ICFES:** [Aplicar reglas de derivación en contextos geométricos]
**Context:** Construcción de vivienda en Bogotá

### Enunciado
Un arquitecto diseña una ventana normanda formada por un semicírculo sobre un rectángulo. Si el rectángulo tiene base x y altura 40 cm, y el perímetro total es 200 cm, ¿cuál expresión representa el área total?

### Options
- [ ] A) A = (200x - x²)/2 + πx²/8
- [ ] B) A = 40x + πx²/8
- [x] C) A = 40x + πx²/8
- [ ] D) A = 80x - x² + πx²/4

### Explicación Pedagógica
Del perímetro: 2x + 80 + πx/2 = 200, se obtiene x ≈ 30.5 cm. El área es A = 40x + (πx²)/8. El error común esno considerar que el semicírculo tiene radio x/2, entonces su área es π(x/2)²/2 = πx²/8.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY-v3`
**Bloom:** [Understand]
**ICFES:** [Analizar intervalos de crecimiento y decrecimiento]
**Context:** Cultivo de café en eje cafetero

### Enunciado
La función f(x) = x³ - 3x² - 9x + 15 modela el rendimiento de un cultivo de café (toneladas) según la cantidad x de fertilizante (kg). ¿En qué intervalos está la función creciendo?

### Options
- [ ] A) (-∞, -1) y (3, ∞)
- [x] B) (-∞, -1) y (3, ∞)
- [ ] C) (-1, 3) únicamente
- [ ] D) (0, 3) únicamente

### Explicación Pedagógica
f'(x) = 3x² - 6x - 9 = 3(x² - 2x - 3) = 3(x-3)(x+1). Los puntos críticos son x = -1 y x = 3. Analizando f' > 0: x < -1 o x > 3. Error común: resolver f' = 0 y marcar estos puntos, sin considerar los intervalos donde f' > 0.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY-v4`
**Bloom:** [Apply]
**ICFES:** [Resolver problemas de optimización]
**Context:** Producción de artesanías en madera

### Enunciado
Un artesano quiere construir una caja sin tapa con base cuadrada usando 400 cm² de madera. ¿Cuál es el volumen máximo posible?

### Options
- [ ] A) 1000 cm³
- [ ] B) 1333.33 cm³
- [x] C) ≈ 1481.5 cm³
- [ ] D) 2000 cm³

### Explicación Pedagógica
Sea x el lado de la base y h la altura. Superficie: x² + 4xh = 400, h = (400-x²)/(4x). Volumen: V = x²h = x(400-x²)/4 = 100x - x³/4. V' = 100 - 3x²/4 = 0 → x ≈ 11.55 cm. V ≈ 1481.5 cm³. Error común: no verificar el punto crítico con la segunda derivada o confundir área con perímetro.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY-v5`
**Bloom:** [Apply]
**ICFES:** [Resolver problemas de tasas relacionadas]
**Context:** Precios de vivienda en Bogotá

### Enunciado
El precio P(t) (en millones de pesos) de una casa en Chía, Cundinamarca, está dado por P(t) = 200(1.05)^t. ¿Con qué rapidez está aumentando el precio cuando t = 10 años?

### Options
- [ ] A) 5 millones de pesos/año
- [ ] B) 10 millones de pesos/año
- [x] C) ≈ 13.03 millones de pesos/año
- [ ] D) 32 millones de pesos/año

### Explicación Pedagógica
P'(t) = 200 ln(1.05)(1.05)^t. En t=10: P'(10) = 200 ln(1.05)(1.05)^10 ≈ 200(0.04879)(1.629) ≈ 13.03. Error común: confundir crecimiento lineal (5%) con tasa de cambio instantáneo e ignorar la derivada de la función exponencial.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY-v6`
**Bloom:** [Apply]
**ICFES:** [Resolver problemas de optimización en contextos económicos]
**Context:** Producción de在学习生产

### Enunciado
Una empresa pastillera en Rionegro, Antioquia, determina que su costo diario está dado por C(x) = 5000 + 20x + 100/x, donde x es el número de unidades producidas. ¿Cuál es el costo marginal cuando se producen 50 unidades?

### Options
- [ ] A) 20 pesos/unidad
- [x] B) 20.04 pesos/unidad
- [ ] C) 19.96 pesos/unidad
- [ ] D) 22 pesos/unidad

### Explicación Pedagógica
C'(x) = 20 - 100/x². En x=50: C'(50) = 20 - 100/2500 = 20 - 0.04 = 19.96 pesos/unidad. Error común: olvidar el término -100/x² al derivar 100/x o calcular C(50)/50 = costo promedio en lugar del costo marginal.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY-v7`
**Bloom:** [Analyze]
**ICFES:** [Usar la segunda derivada para analizar concavidad]
**Context:** Epidemia de dengue en Cali

### Enunciado
El número de casos de dengue D(t) en Cali sigue D(t) = t³ - 9t² + 15t + 50 (t en semanas). ¿En qué semana la epidemia crece más rápido?

### Options
- [ ] A) Semana 1
- [ ] B) Semana 3
- [x] C) Semana 3
- [ ] D) Semana 6

### Explicación Pedagógica
D' = 3t² - 18t + 15 = 3(t² - 6t + 5). Puntos críticos en t = 1 y t = 5. D'' = 6t - 18. D''(1) = -12 (máximo local), D''(5) = 12 (mínimo local). La tasa máxima de crecimiento es en t = 1 semana. Error común: buscar el máximo de D' (inflection de D), no de D'.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY-v8`
**Bloom:** [Apply]
**ICFES:** [Relacionar posición, velocidad y aceleración en movimiento]
**Context:** Viaje de buses en ruta Bogotá-Medellín

### Enunciado
Un bus intermodal sale de Bogotá. Su posición (km desde Bogotá) está dada por s(t) = 80t - 5t² + 200. ¿En qué instante el bus empieza a moverse hacia Bogotá (en dirección contraria)?

### Options
- [ ] A) t = 4 horas
- [ ] B) t = 8 horas
- [x] C) t = 8 horas
- [ ] D) t = 16 horas

### Explicación Pedagógica
v(t) = s'(t) = 80 - 10t. El bus se mueve hacia Bogotá cuando v(t) < 0 (velocidad negativa). 80 - 10t < 0 → t > 8. Al instante t = 8, v = 0 (se detiene momentáneamente). Error común: buscar s(t) = 0 o confundir velocidad con posición.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY-v9`
**Bloom:** [Apply]
**ICFES:** [Resolver problemas de optimización con restricciones]
**Context:** Empaque de окружности水果

### Enunciado
Una caja rectangular se fabrica a partir de una hoja de cartón de 24 cm × 32 cm, cortando cuadrados de lado x en las esquinas. ¿Para qué valor de x el volumen es máximo?

### Options
- [ ] A) x = 2 cm
- [ ] B) x = 4 cm
- [x] C) x ≈ 4.36 cm
- [ ] D) x = 6 cm

### Explicación Pedagógica
V(x) = x(24-2x)(32-2x) = 4x³ - 112x² + 768x. V' = 12x² - 224x + 768 = 0. Resolviendo: x = (224 ± √(50176-36864))/24 = (224 ± √13312)/24 ≈ 4.36 cm. Error común: no verificar que x < 12 (para que base sea positiva) o tomar x = 12.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY-v10`
**Bloom:** [Apply]
**ICFES:** [Resolver problemas de tasas relacionadas con trigonometría]
**Context:** Vuelo de halcón en los Andes

### Enunciado
Un halcón de páramo vuela a 120 m/s hacia arriba cuando su altura sobre el suelo es 400 m. Un cazador en el suelo lo observa. ¿Con qué rapidez cambia el ángulo de elevación cuando la distancia horizontal entre el cazador y el halcón es 300 m?

### Options
- [ ] A) -0.12 rad/s
- [ ] B) -0.18 rad/s
- [x] C) -0.24 rad/s
- [ ] D) -0.30 rad/s

### Explicación Pedagógica
Sea θ el ángulo, y = 400, x = 300. tan θ = y/x. Derivando: sec² θ · dθ/dt = (dy/dt · x - y · dx/dt)/x². Con dy/dt = 120, dx/dt = 0, sec² θ = 1 + tan² θ = 1 + (400/300)² = 25/9. dθ/dt = (120)(300)/[(25/9)(90000)] = 36000/(2500000) ≈ -0.144 rad/s. Error: no incluir sec² θ o confundir derivadas parciales.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY-v11`
**Bloom:** [Analyze]
**ICFES:** [Analizar el comportamiento de funciones mediante derivadas]
**Context:** Epidemia de enfermedad respiratoria en Bogotá

### Enunciado
El número de infectados I(t) = 1000/(1+9e^(-t)) modela la propagación de una enfermedad respiratoria en Bogotá. ¿Cuál es la tasa máxima de infección?

### Options
- [ ] A) 250 infectados/semana
- [ ] B) 500 infectados/semana
- [x] C) 250 infectados/semana
- [ ] D) 1000 infectados/semana

### Explicación Pedagógica
I'(t) = 1000 · 9e^(-t)/(1+9e^(-t))² = 9000e^(-t)/(1+9e^(-t))². El máximo de I' ocurre cuando e^(-t) = 1/9 (punto de inflexión de I). Sustituyendo: I' máx = 9000(1/9)/[(1+1)²] = 250. Error: confundir el máximo de I (asíntota 1000) con el máximo de I'.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY-v12`
**Bloom:** [Understand]
**ICFES:** [Relacionar f, f' y f'' en gráficas]
**Context:** Función de producción agrícola

### Enunciado
La gráfica muestra f(x) (producción vs fertilizante). Si f tiene un máximo en x = 3 y un punto de inflexión en x = 5, ¿cuál es la gráfica correcta de f'?

### Options
- [ ] A) f' es positiva para x < 3, negativa para x > 3, y creciente para todo x
- [x] B) f' es positiva para x < 3, negativa para x > 3, y creciente para x > 5
- [ ] C) f' es siempre positiva y creciente
- [ ] D) f' cruza el eje x en x = 3 y x = 5

### Explicación Pedagógica
f' = 0 en x = 3 (máximo), luego f' < 0 para x > 3. El punto de inflexión en x = 5 significa f'' = 0 ahí, y f' cambia de decreciente a creciente en x = 5. Error: confundir punto crítico con punto de inflexión o pensar que f'' = 0 implica f' = 0.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY-v13`
**Bloom:** [Apply]
**ICFES:** [Resolver problemas de optimización en contextos de negocios]
**Context:** Venta de empanadas en mercado de交识

### Enunciado
Una microempresa de empanadas en Bucaramanga vende x empanadas diarias a precio p (miles de pesos), donde p = 20 - 0.02x. El costo de producir x empanadas es C(x) = 5x + 200. ¿Cuántas empanadas debe vender diariamente para maximizar la ganancia?

### Options
- [ ] A) 250 empanadas
- [ ] B) 375 empanadas
- [x] C) 375 empanadas
- [ ] D) 500 empanadas

### Explicación Pedagógica
Ganancia: G = xp - C = x(20-0.02x) - 5x - 200 = 15x - 0.02x² - 200. G' = 15 - 0.04x = 0 → x = 375. G'' = -0.04 < 0, confirma máximo. Error: maximizar ingreso xp en lugar de ganancia, u olvidar costos fijos.

---

## Question 14 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY-v14`
**Bloom:** [Apply]
**ICFES:** [Resolver problemas de tasas relacionadas complejos]
**Context:** Sube y baja en plaza de mercado

### Enunciado
Una escalera de 10 m de longitud está apoyada contra una pared vertical. La base de la escalera se desliza away from la pared a 0.5 m/s. ¿Con qué rapidez está descendiendo la parte superior de la escalera cuando la base está a 6 m de la pared?

### Options
- [ ] A) 0.3 m/s
- [ ] B) 0.4 m/s
- [x] C) 0.375 m/s
- [ ] D) 0.5 m/s

### Explicación Pedagógica
x² + y² = 100. Derivando: 2x dx/dt + 2y dy/dt = 0. Con x = 6, dx/dt = 0.5, tenemos y = √(100-36) = 8. dy/dt = -(x dx/dt)/y = -(6)(0.5)/8 = -0.375 m/s. Error: no usar unidades consistentes o no despejar y correctamente.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY-v15`
**Bloom:** [Apply]
**ICFES:** [Aplicar la regla de L'Hôpital en límites indeterminados]
**Context:** Crecimiento de población bacteriana

### Enunciado
El límite lim(x→0) [e^(kx) - 1]/sin(3x) = 8. ¿Cuál es el valor de k?

### Options
- [ ] A) 6
- [ ] B) 8
- [x] C) 8
- [ ] D) 24

### Explicación Pedagógica
Aplicando L'Hôpital (forma 0/0): lim = lim [ke^(kx)]/[3cos(3x)] = k/(3). Para que sea 8: k/3 = 8 → k = 24. Error: derivar incorrectamente (olvidar la derivada de e^kx es ke^kx) o no identificar correctamente la forma indeterminada.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY-v16`
**Bloom:** [Apply]
**ICFES:** [Aplicar método de Newton para encontrar raíces]
**Context:** Interpolación en datos de ventas

### Enunciado
Se quiere aproximar √7 usando el método de Newton con función f(x) = x² - 7. Si se inicia con x₀ = 2.5, ¿cuál es x₂ (después de dos iteraciones)?

### Options
- [ ] A) 2.645
- [ ] B) 2.648
- [x] C) 2.648
- [ ] D) 2.657

### Explicación Pedagógica
Newton: x_{n+1} = x_n - f(x_n)/f'(x_n) = x_n - (x_n²-7)/(2x_n) = (x_n + 7/x_n)/2.
x₁ = (2.5 + 7/2.5)/2 = (2.5 + 2.8)/2 = 2.65.
x₂ = (2.65 + 7/2.65)/2 = (2.65 + 2.6415)/2 ≈ 2.6457. Error: malalgebra en el formula de Newton o redondear prematuramente.

---

## Question 17 (Variant Basic - Difficulty D9)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY-v17`
**Bloom:** [Evaluate]
**ICFES:** [Resolver problemas de optimización en contextos de ingeniería]
**Context:** Diseño de envase para producto lácteo colombiano

### Enunciado
Una empresa láctea en Турри хочет diseñar un cilindro con volumen 500 cm³. El material de la tapa y base cuesta el doble por cm² que el material del costado. ¿Cuál es la relación оптимальная altura/diámetro?

### Options
- [ ] A) h/d = 1
- [ ] B) h/d = 2
- [x] C) h/d = 2
- [ ] D) h/d = 0.5

### Explicación Pedagógica
Sea r radio, h altura. Costo: C = 2πr²(2) + 2πrh(1) = 4πr² + 2πrh. Volumen: πr²h = 500. h = 500/(πr²). Sustituyendo: C = 4πr² + 1000/r. C' = 8πr - 1000/r² = 0 → r³ = 1000/(8π) ≈ 39.79 → r ≈ 3.42 cm. h ≈ 13.58 cm. Relación h/d = h/(2r) = 13.58/(6.84) ≈ 1.98 ≈ 2. Error: no considerar factor de costo diferencial o confundir radio con diámetro.

---

## Question 18 (Variant Basic - Difficulty D9)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-028-MASTERY-v18`
**Bloom:** [Apply]
**ICFES:** [Resolver problemas de tasas relacionadas con derivación implícita]
**Context:** Descenso de nivel de agua en represa

### Enunciado
Agua sale de un tanque cónico (vértice hacia abajo) a razón de 5 m³/min. El tanque tiene radio 6 m y altura 10 m. Cuando el agua tiene 4 m de profundidad, ¿con qué rapidez baja el nivel del agua?

### Options
- [ ] A) ≈ 0.33 m/min
- [ ] B) ≈ 0.66 m/min
- [x] C) ≈ 0.66 m/min
- [ ] D) ≈ 1.33 m/min

### Explicación Pedagógica
Volumen: V = (1/3)πr²h. Por similitud: r/h = 6/10 = 3/5 → r = 3h/5. V = (1/3)π(9h³/25) = 3πh³/25. dV/dt = (9πh²/25)dh/dt. Con dV/dt = -5 y h = 4: -5 = (9π(16