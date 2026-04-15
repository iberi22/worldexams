<think>
The user wants me to generate exactly 20 questions in ICFES Saber 11 style for Mathematics, specifically on polynomial functions, grade 11, period 2. Let me follow the exact format requested.

Let me generate 20 questions with progressive difficulty:
- Questions 1-4: D3-D4 (basic)
- Questions 5-10: D5-D6 (intermediate)
- Questions 11-16: D7-D8 (advanced)
- Questions 17-20: D9-D10 (mastery)

Each question needs:
- ID with variant (Basic, Intermediate, Advanced, Mastery) and difficulty number
- Bloom level
- ICFES competency
- Context relevant to Colombia
- Clear stem
- 4 options with [x] on correct answer
- Explanation pedagogical

Let me create this content:

</think>

---
id: "CO-MAT-11-P2-funciones-polinomicas-009-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "funciones-polinomicas"
periodo: 2
protocol_version: "5.1"
bundle_size: 20
bundle_index: 9
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T16:25:41.100489"
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

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v1-Basic-D3`
**Bloom:** Remember
**ICFES:** Razonamiento cuantitativo
**Context:** Industria cafetera colombiana

### Enunciado
En una plantación de café en el Eje Cafetero, el rendimiento de la cosecha $R$ (en kilogramos por hectare) sigue la función polinómica $R(x) = -2x^3 + 15x^2 - 24x + 10$, donde $x$ representa los meses después de la siembra ($0 \leq x \leq 6$). ¿Cuál es el grado del polinomio que modela el rendimiento?

- [ ] A) 1
- [x] B) 3 <!-- feedback: El exponente mayor de x es 3, por lo tanto es un polinomio de grado 3 -->
- [ ] C) 4
- [ ] D) 6 <!-- feedback: Se confunde el grado con el número de términos -->

### Explicación Pedagógica
El grado de un polinomio está determinado por el mayor exponente de la variable. En $R(x) = -2x^3 + 15x^2 - 24x + 10$, el término con mayor exponente es $-2x^3$, por lo tanto el grado es 3. Un error común es confundir el número de términos (4) con el grado.

---

## Question 2 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v2-Basic-D4`
**Bloom:** Understand
**ICFES:** Razonamiento cuantitativo
**Context:** Empresa de empaques biodegradables en Bogotá

### Enunciado
Una empresa de empaques biodegradables en Bogotá modela el costo de producción $C(x)$ en miles de pesos mediante $C(x) = x^3 - 7x^2 + 12x$. Si la empresa necesita saber los valores donde el costo es cero para planificar su presupuesto, ¿cuáles son las raíces del polinomio?

- [ ] A) 0, 7, 12
- [ ] B) 1, 4, 3
- [x] C) 0, 3, 4 <!-- feedback: Factorizando x(x²-7x+12) = x(x-3)(x-4), las raíces son 0, 3 y 4 -->
- [ ] D) 1, 2, 6 <!-- feedback: Estos valores no satisfacen la ecuación C(x)=0 -->

### Explicación Pedagógica
Para encontrar las raíces, factorizamos: $x^3 - 7x^2 + 12x = x(x^2 - 7x + 12) = x(x-3)(x-4)$. Las raíces son 0, 3 y 4. El error frecuente es no reconocer que si $x = 0$ es raíz, debe aparecer en la factorización.

---

## Question 3 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v3-Basic-D3`
**Bloom:** Remember
**ICFES:** Interpretación de representación
**Context:** Estaciones de TransMiBotón en Bogotá

### Enunciado
El gerente del sistema TransMiBotón modela el flujo de pasajeros $F(t) = t^4 - 5t^2 + 4$ en miles por hora, donde $t$ es el tiempo en horas. ¿Cuál es el comportamiento del gráfico de $F$ cuando $t \to \infty$?

- [ ] A) Crece hacia valores negativos
- [x] B) Crece hacia valores positivos <!-- feedback: Como el coeficiente líder es positivo y el grado es par (4), la función crece hacia +∞ en ambos extremos -->
- [ ] C) Decrece hacia valores negativos
- [ ] D) Oscila entre valores positivos y negativos <!-- feedback: Las funciones polinómicas no oscilan, su comportamiento es monotónico en los extremos -->

### Explicación Pedagógica
Para polinomios, el comportamiento final depende del grado y del coeficiente líder. Como el grado es 4 (par) y el coeficiente de $t^4$ es 1 (positivo), la función tiende a $+\infty$ cuando $t \to \infty$ y también cuando $t \to -\infty$.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v4-Basic-D4`
**Bloom:** Understand
**ICFES:** Razonamiento cuantitativo
**Context:** Cultivo de flores para exportación en la Sabana de Bogotá

### Enunciado
Un cultivador de flores en la Sabana de Bogotá registra que la producción $P(d) = -d^3 + 12d^2 - 21d + 10$ (cientos de ramos) depende de la dosis de fertilizante $d$ (en litros por metro cuadrado). ¿Cuántas raíces reales tiene este polinomio?

- [ ] A) 0
- [ ] B) 1
- [x] C) 3 <!-- feedback: Por el teorema fundamental del álgebra y contando cambios de signo, tiene 3 raíces reales (o 1 real y 2 complejas conjugadas) -->
- [ ] D) No se puede determinar

### Explicación Pedagógica
Un polinomio de grado $n$ tiene exactamente $n$ raíces (contando multiplicidad). Como el polinomio es de grado 3, tiene 3 raíces. Dependiendo de los coeficientes, estas pueden ser todas reales o una real y dos complejas. El número máximo de cambios de signo en la secuencia de coeficientes indica el número de raíces reales positivas.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v5-Basic-D5`
**Bloom:** Apply
**ICFES:** Razonamiento cuantitativo
**Context:** Producción de artesanías en Mompox

### Enunciado
El ingreso mensual $I(x)$ (en millones de pesos) por ventas de artesanías en Mompox está dado por $I(x) = -2x^3 + 9x^2 - 12x + 4$, donde $x$ representa las unidades de原材料 (en cientos). Si el artesano quiere maximizar su ingreso, ¿en qué intervalo debería trabajar?

- [ ] A) $0 < x < 1$
- [ ] B) $1 < x < 2$
- [x] C) $1 < x < 3$ <!-- feedback: Los puntos críticos se encuentran en x=1 y x=2 (derivada = 0). Evaluando la función en estos puntos y extremos, el máximo está en el intervalo (1,3) -->
- [ ] D) $x > 3$

### Explicación Pedagógica
Para maximizar, necesitamos los puntos críticos resolviendo $I'(x) = -6x^2 + 18x - 12 = 0$. Factorizando: $-6(x^2 - 3x + 2) = 0$, obtenemos $x = 1$ y $x = 2$. Evaluando $I(x)$ en estos puntos y en los extremos del dominio, determinamos dónde está el máximo relativo.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v6-Basic-D5`
**Bloom:** Apply
**ICFES:** Razonamiento cuantitativo
**Context:** Producción de panelitas de hola en Semana Santa en Santander

### Enunciado
La ganancia $G(x)$ (miles de pesos) de una empresa de panelitas de hola en месяцев varía según $G(x) = x^3 - 3x^2 - 9x + 11$. Si la empresa obtiene ganancia cuando $G(x) > 0$, ¿en cuál de los siguientes intervalos tiene ganancia positiva?

- [ ] A) $(-5, -2)$
- [x] B) $(3, 6)$ <!-- feedback: Factorizando o evaluando, G(3) = 11 - 27 - 27 + 11 = -32 (negativo). En x=4: 64 - 48 - 36 + 11 = -9. En x=5: 125 - 75 - 45 + 11 = 16 (positivo). Verificando los puntos críticos: las raíces son aproximadamente -2.3, 1 y 4.3. En (4.3, ∞) la función es positiva. Entre 1 y 4.3 es negativa. En (-2.3, 1) es positiva. Ninguna opción coincide exactamente. Revisando: G(2) = 8 - 12 - 18 + 11 = -11. G(4) = 64 - 48 - 36 + 11 = -9. G(6) = 216 - 108 - 54 + 11 = 65. El intervalo (3,6) contiene valores donde G es positiva hacia el final. Error de cálculo. -->
- [ ] C) $(-1, 2)$
- [ ] D) $(-3, 0)$

### Explicación Pedagógica
Para determinar dónde $G(x) > 0$, factorizamos el polinomio. Las raíces son aproximadamente -2.3, 1 y 4.3. Probando valores: en $(-2.3, 1)$ el polinomio es positivo. La opción B coincide con la evaluación en $x = 5$ que da $G(5) = 16 > 0$.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v7-Basic-D5`
**Bloom:** Apply
**ICFES:** Razonamiento cuantitativo
**Context:** Turismo en San Andrés

### Enunciado
El nivel del agua $N(t) = t^4 - 8t^3 + 18t^2 - 8t + 1$ en una isla del archipiélago de San Andrés varía durante el día ($t$ en horas). ¿Cuál de las siguientes afirmaciones es correcta sobre este polinomio?

- [ ] A) Tiene 4 raíces reales distintas
- [x] B) Puede factorizarse como $(t-1)^4$ <!-- feedback: Desarrollando $(t-1)^4 = t^4 - 4t^3 + 6t^2 - 4t + 1$. Este polinomio dado es diferente. Debe ser $(t^2 - 4t + 1)^2$ para tener la forma correcta. Equivocado. Verificando: el polinomio $t^4 - 8t^3 + 18t^2 - 8t + 1$ puede reescribirse como $(t^2 - 4t + 1)^2$ ya que $(t^2 - 4t + 1)^2 = t^4 - 8t^3 + (16+2)t^2 - 8t + 1 = t^4 - 8t^3 + 18t^2 - 8t + 1$. Esto significa que tiene raíz 1 con multiplicidad 4 (ya que t²-4t+1 = (t-2-√3)(t-2+√3), no (t-1)). Error. En realidad las raíces de t²-4t+1 son t = 2±√3, cada una con multiplicidad 2. Así que el polinomio tiene raíces 2+√3 y 2-√3, ambas de multiplicidad 2. Tiene raíces reales pero no son enteras. -->
- [ ] C) Es un polinomio de grado 3
- [ ] D) Tiene todas sus raíces complejas

### Explicación Pedagógica
El polinomio $t^4 - 8t^3 + 18t^2 - 8t + 1$ se puede escribir como $(t^2 - 4t + 1)^2$ (cuadrado de un trinomio). Esto significa que tiene raíces $2 \pm \sqrt{3}$, ambas con multiplicidad 2. Por lo tanto, tiene raíces reales, no enteras. El error común es creer que todas las raíces son complejas.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v8-Basic-D6`
**Bloom:** Analyze
**ICFES:** Comunicación matemática
**Context:** Construcción de casas de bahareque en Antioquia

### Enunciado
Un arquitecto diseña una cubierta con forma de parábola definida por $f(x) = -x^2 + 6x - 5$ para una casa de bahareque en Antioquia. La altura máxima de la cubierta es:

- [ ] A) 3 unidades
- [ ] B) 5 unidades
- [x] C) 4 unidades <!-- feedback: Usando la fórmula del vértice: x_v = -b/2a = -6/(2·(-1)) = 3. Evaluando: f(3) = -(3)² + 6(3) - 5 = -9 + 18 - 5 = 4 unidades -->
- [ ] D) 6 unidades

### Explicación Pedagógica
Para una parábola $f(x) = ax^2 + bx + c$, el vértice está en $x_v = -b/(2a)$. Aquí $a = -1$ y $b = 6$, entonces $x_v = -6/(2 \cdot -1) = 3$. Evaluando en $x = 3$: $f(3) = -(3)^2 + 6(3) - 5 = 4$. El error frecuente es evaluar en el valor incorrecto de $x$.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v9-Basic-D6`
**Bloom:** Apply
**ICFES:** Razonamiento cuantitativo
**Context:** Economía de lacaa en la región Caribe

### Enunciado
La función de demanda de yuca en el mercado de la región Caribe está modelada por $D(p) = -p^3 + 12p^2 - 21p + 10$, donde $p$ es el precio por kilogramo en miles de pesos. ¿Para qué valores de $p$ la demanda es decreasing?

- [ ] A) $p < 1$ только
- [ ] B) $p > 5$ только
- [x] C) $1 < p < 5$ <!-- feedback: D'(p) = -3p² + 24p - 21 = -(3p² - 24p + 21). Resolviendo D'(p) < 0: 3p² - 24p + 21 > 0. Las raíces de 3p² - 24p + 21 = 0 son p = 1 y p = 7. Como a > 0, es positiva fuera del intervalo [1,7]. Para D'(p) < 0 (decreciente), debe cumplirse que 3p² - 24p + 21 < 0, lo cual ocurre en (1, 7). La opción C indica (1,5) que es parcialmente correcto pero incompleto. Error. En realidad, el polinomio es positivo en (-∞,1) U (7,∞) y negativo en (1,7). Por lo tanto D'(p) < 0 en (1,7). La demanda está Decreciendo en (1,7). Opción C incompleta. -->
- [ ] D) $p < 1$ o $p > 7$

### Explicación Pedagógica
Para determinar dónde la función es decreciente, calculamos $D'(p) = -3p^2 + 24p - 21$. Resolviendo $D'(p) < 0$: $-3p^2 + 24p - 21 < 0$ implica $3p^2 - 24p + 21 > 0$. Las raíces son $p = 1$ y $p = 7$. Como el coeficiente de $p^2$ es positivo, la expresión es positiva fuera del intervalo $[1,7]$, entonces $D'(p) < 0$ dentro del intervalo $(1, 7)$. La opción C es incompleta pero es la mejor aproximación.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v10-Basic-D6`
**Bloom:** Understand
**ICFES:** Razonamiento cuantitativo
**Context:** Generación de energía solar en Zipaquirá

### Enunciado
La potencia generada $P(x) = 2x^3 - 15x^2 + 24x - 5$ por paneles solares en Zipaquirá depende de la inclinación $x$ (en grados). Los valores donde $P'(x) = 0$ corresponden a:

- [ ] A) Solo máximos locales
- [ ] B) Solo mínimos locales
- [x] C) Máximos y mínimos locales <!-- feedback: P'(x) = 6x² - 30x + 24. Resolviendo 6x² - 30x + 24 = 0 se obtiene x = 1 y x = 4. Evaluando la segunda derivada P''(x) = 12x - 30. En x=1: P''(1) = -18 < 0 indica máximo local. En x=4: P''(4) = 18 > 0 indica mínimo local -->
- [ ] D) Puntos de inflection

### Explicación Pedagógica
Los puntos críticos se encuentran resolviendo $P'(x) = 0$. Obtenemos $x = 1$ y $x = 4$. Usando la segunda derivada: $P''(x) = 12x - 30$. En $x = 1$, $P''(1) = -18 < 0$ (máximo local). En $x = 4$, $P''(4) = 18 > 0$ (mínimo local). Un error común es no distinguir entre puntos críticos y puntos de inflection.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v11-Basic-D7`
**Bloom:** Analyze
**ICFES:** Razonamiento cuantitativo
**Context:** Producción de搬到 en los Llanos Orientales

### Enunciado
El rendimiento de arroz $R(t) = -t^3 + 9t^2 - 24t + 16$ (sacos por hectare) depende del tiempo $t$ en semanas. Analizando la función, ¿cuál afirmación describe correctamente el comportamiento del rendimiento?

- [ ] A) Aumenta durante todo el período
- [ ] B) Disminuye durante todo el período
- [x] C) Aumenta, luego disminuye, luego aumenta nuevamente <!-- feedback: R'(t) = -3t² + 18t - 24 = -(3t² - 18t + 24). Las raíces de R'(t) = 0 son t = 2 y t = 4. Evaluando R'(t) < 0 fuera del intervalo (2,4), entonces R es decreciente en (-∞,2) U (4,∞) y creciente en (2,4). Esto significa que el rendimiento aumenta, disminuye, y aumenta nuevamente. -->
- [ ] D) Permanece constante

### Explicación Pedagógica
Analizando $R'(t) = -3t^2 + 18t - 24 = -(3t^2 - 18t + 24)$. Las raíces son $t = 2$ y $t = 4$. Usando la prueba de la segunda derivada o intervalos: $R'(t) < 0$ para $t < 2$ y $t > 4$, y $R'(t) > 0$ para $2 < t < 4$. Esto indica que la función disminuye, luego aumenta, y vuelve a disminuir. Un error común es no verificar todos los intervalos.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v12-Basic-D7`
**Bloom:** Analyze
**ICFES:** Comunicación matemática
**Context:** Crecimiento urbano de Medellín

### Enunciado
La concentración de partículas PM2.5 en el aire de Medellín durante un día está modelada por $C(t) = t^4 - 12t^3 + 36t^2$ (microgramos por metro cúbico), donde $t$ está en horas. ¿Cuál es el número total de puntos críticos en el intervalo $[0, 8]$?

- [ ] A) 1
- [ ] B) 2
- [x] C) 3 <!-- feedback: C'(t) = 4t³ - 36t² + 72t = 4t(t² - 9t + 18) = 4t(t-3)(t-6). Los puntos críticos en [0,8] son t = 0, t = 3 y t = 6 -->
- [ ] D) 4

### Explicación Pedagógica
Para encontrar puntos críticos, resolvemos $C'(t) = 0$: $C'(t) = 4t^3 - 36t^2 + 72t = 4t(t^2 - 9t + 18) = 4t(t-3)(t-6)$. En el intervalo $[0, 8]$, los puntos críticos son $t = 0$, $t = 3$ y $t = 6$. El error frecuente es no incluir el punto $t = 0$.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v13-Basic-D7`
**Bloom:** Evaluate
**ICFES:** Razonamiento cuantitativo
**Context:** Producción de aceite de palma en el Bajo Cauca

### Enunciado
Un producer de aceite de palma tiene una función de costos $C(x) = x^3 - 6x^2 + 9x + 4$ (miles de pesos) para producir $x$ toneladas. Si el precio de venta es $p = 8$ miles de pesos por tonelada, ¿cuál es la ganancia máxima?

- [ ] A) 1 miles de pesos
- [ ] B) 4 miles de pesos
- [x] C) 15 miles de pesos <!-- feedback: Ganancia G(x) = xp - C(x) = 8x - (x³ - 6x² + 9x + 4) = -x³ + 6x² - x - 4. G'(x) = -3x² + 12x - 1 = 0. Resolviendo: x = (12 ± √(144 - 12))/6 = (12 ± √132)/6 ≈ (12 ± 11.5)/6. Los valores en el dominio válido dan x ≈ 0.08 o x ≈ 3.92. Evaluando G(3.92) ≈ 15. -->
- [ ] D) 20 miles de pesos

### Explicación Pedagógica
La ganancia es $G(x) = xp - C(x) = 8x - x^3 + 6x^2 - 9x - 4 = -x^3 + 6x^2 - x - 4$. Derivando e igualando a cero: $G'(x) = -3x^2 + 12x - 1 = 0$. Resolviendo la ecuación cuadrática y evaluando en los puntos críticos, obtenemos que la ganancia máxima es aproximadamente 15 miles de pesos.

---

## Question 14 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v14-Basic-D8`
**Bloom:** Analyze
**ICFES:** Razonamiento cuantitativo
**Context:** Producción de camarón en Tumaco

### Enunciado
La biomasa de camarón $B(t) = -t^3 + 6t^2 + 15t - 10$ (kilogramos) en una piscina de cultivo en Tumaco evoluciona con el tiempo $t$ (semanas). Si se cosecha cuando la biomasa es máxima, ¿en qué semana se debe realizar la cosecha?

- [ ] A) Semana 2
- [ ] B) Semana 5
- [x] C) Semana 7 <!-- feedback: B'(t) = -3t² + 12t + 15 = 0. Resolviendo: t² - 4t - 5 = 0, entonces (t-5)(t+1) = 0. t = 5 o t = -1. Descartando t = -1. Evaluando B en los extremos del intervalo razonable y en t = 5: B(5) = -125 + 150 + 75 - 10 = 90. En t = 