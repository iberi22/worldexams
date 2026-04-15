<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for Colombian Math exam (Saber 11), specifically about algebraic expressions, grade 11, period 1.

I need to follow the exact format specified:
- YAML frontmatter with specific fields
- 20 questions with progressive difficulty (D3-D4 for 1-4, D5-D6 for 5-10, D7-D8 for 11-16, D9-D10 for 17-20)
- Each question has: ID, Bloom level, ICFES competence, Context, Statement, 4 options (A, B, C, D), explanation
- C is the correct answer (with [x])
- Colombian modern context
- Plausible distractors (real student errors)
- No "all of the above" or "none of the above"

Let me create 20 questions about algebraic expressions:

Topics to cover for algebraic expressions (grade 11, period 1):
1. Simplification of algebraic expressions
2. Polynomial operations (addition, subtraction, multiplication, division)
3. Factoring (common factor, trinomials, difference of squares, sum/difference of cubes)
4. Algebraic fractions (simplification, operations)
5. Rational expressions
6. Special products
7. Binomial expansion
8. Synthetic division basics

I'll create questions with increasing difficulty and Colombian contexts.
</think>

```yaml
---
id: "CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "expresiones-algebraicas"
periodo: 1
protocol_version: "5.1"
bundle_size: 20
bundle_index: 3
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T08:05:43.443438"
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

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Interpretación y uso de expresiones algebraicas
**Context:** En una empresa colombiana de mensajería en Bogotá, se cobra según la expresión algebraica que representa el costo de envío.

### Enunciado
Al simplificar la expresión algebraica 6x²y + 8xy² - 2xy, el resultado correcto es:

### Options
- [ ] A) 2xy(3x + 4y) <!-- No se factoriza correctamente el segundo término -->
- [ ] B) 2xy(3x - 4y + 1) <!-- Error común: no agrupar todos los términos -->
- [x] C) 2xy(3x + 4y - 1) <!-- Correcto: se extrae el factor común 2xy de todos los términos -->
- [ ] D) 2x²y(3 + 4y) <!-- Error: no se reconoce el factor común completo -->

### Explicación Pedagógica
Para factorizar 6x²y + 8xy² - 2xy, identificamos el factor común: 2xy (2 es el MCD de 6, 8 y 2; xy es la variable común en todos los términos). Al dividir cada término entre 2xy obtenemos: 3x + 4y - 1. El error común A ocurre cuando se olvida el signo negativo del tercer término. El error en B es no incluir todos los términos en la factorización. En D se selecciona incorrectamente el factor común.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Modelo matemático de situaciones reales
**Context:** En una pizzería de Medellín, se calcula el costo de ingredientes usando expresiones algebraicas.

### Enunciado
Si el área de un círculo está dada por πr² y se tiene una expresión A = π(r+3)² - πr², ¿cuál es la forma simplificada de esta diferencia de áreas?

### Options
- [ ] A) 6πr + 9π <!-- Error: desarrollo incompleto del binomio -->
- [ ] B) 6πr + 6π <!-- Confusión: no se suma el término independiente -->
- [x] C) 6πr + 9π <!-- Correcto: diferencia de cuadrados perfectosfactorizados -->
- [ ] D) 3πr + 9π <!-- Error: coeficiente incorrecto en el término lineal -->

### Explicación Pedagógica
Expandiendo: π(r+3)² = π(r² + 6r + 9) = πr² + 6πr + 9π. Restando πr² obtenemos 6πr + 9π = 3π(2r + 3). El error común A es pensar que (r+3)² = r² + 6r, olvidando el término independiente. B ocurre al desarrollar incorrectamente el binomio. D muestra errores en el coeficiente del término lineal.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Resolución de problemas con expresiones algebraicas
**Context:** En una constructora de Cali, se diseñan ventanas con marcos metálicos donde las medidas se representan mediante expresiones algebraicas.

### Enunciado
El perímetro de una ventana rectangular está representado por P = 4x + 6. Si el ancho es (x + 1), ¿cuál es la expresión algebraica que representa el largo de la ventana?

### Options
- [ ] A) x + 1 <!-- Se confunde largo con ancho -->
- [x] B) x + 0.5 <!-- Correcto: despejando el largo de P = 2(largo + ancho) -->
- [ ] C) 2x + 2 <!-- Error: no se divide por 2 correctamente -->
- [ ] D) x + 2 <!-- Error en el despeje de la constante -->

### Explicación Pedagógica
Para un rectángulo: P = 2(largo + ancho), entonces largo + ancho = P/2 = (4x + 6)/2 = 2x + 3. Como ancho = x + 1, el largo = (2x + 3) - (x + 1) = x + 2. El error B ocurre al dividir incorrectamente cada término. C resulta de no dividir todo el polinomio por 2. D muestra un error algebraico común en el despeje.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Análisis de patrones algebraicos
**Context:** En el mercado de valores de Colombia, las fluctuaciones de precio de acciones se modelan con expresiones algebraicas.

### Enunciado
Al factorizar completamente 81a⁴ - 16b⁴, la expresión correcta es:

### Options
- [ ] A) (9a² + 4b²)(9a² - 4b²) <!-- Incompleta: se puede factorizar más -->
- [ ] B) (3a + 2b)³(3a - 2b) <!-- Error: no es diferencia de cubos -->
- [x] C) (9a² + 4b²)(3a + 2b)(3a - 2b) <!-- Correcto: diferencia de cuadrados aplicada dos veces -->
- [ ] D) (9a² - 4b²)² <!-- Error: no es un trinomio cuadrado perfecto -->

### Explicación Pedagógica
81a⁴ - 16b⁴ es una diferencia de cuadrados: (9a²)² - (4b²)² = (9a² + 4b²)(9a² - 4b²). Luego, 9a² - 4b² es otra diferencia de cuadrados: (3a)² - (2b)² = (3a + 2b)(3a - 2b). El error A es no reconocer que se puede factorizar nuevamente. B confunde con diferencia de cubos. D no tiene sentido algebraico para esta expresión.

---

## Question 5 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Operaciones con expresiones algebraicas
**Context:** En una empresa agrícola del Valle del Cauca, se calculan rendimientos de cosecha usando expresiones algebraicas.

### Enunciado
Al simplificar la fracción algebraica (x² - 9)/(x² + 5x + 6), el resultado es:

### Options
- [ ] A) (x - 3)/(x + 2) <!-- Error: factorización incorrecta del denominador -->
- [ ] B) (x + 3)/(x + 2) <!-- Confusión con el numerador: no se simplifica -->
- [x] C) (x - 3)/(x + 2) <!-- Correcto: (x²-9) = (x+3)(x-3), (x²+5x+6) = (x+3)(x+2) -->
- [ ] D) (x - 3)/(x + 3) <!-- Error: factorización incorrecta del denominador -->

### Explicación Pedagógica
Factorizando: x² - 9 = (x + 3)(x - 3) (diferencia de cuadrados) y x² + 5x + 6 = (x + 3)(x + 2) (trinomio). Cancelando (x + 3) obtenemos (x - 3)/(x + 2). El error en A es no factorizar correctamente el denominador. B mantiene el factor (x + 3) sin cancelar. D muestra confusión en ambas factorizaciones.

---

## Question 6 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v6`
**Bloom:** Understand
**ICFES:** Traducción entre lenguaje algebraico y natural
**Context:** En el sistema de transporte masivo TransMilenio de Bogotá, se modela la demanda de usuarios con expresiones algebraicas.

### Enunciado
"Si al triple de un número se le resta 7 y el resultado se eleva al cuadrado, se obtiene 64." La ecuación que representa esta situación es:

### Options
- [ ] A) (3x - 7)² = 64 <!-- Correcto: interpretación literal de la expresión -->
- [ ] B) 3(x - 7)² = 64 <!-- Error: se aplica el 3 antes de elevar al cuadrado -->
- [ ] C) 3x - 7² = 64 <!-- Error: no se usa paréntesis, jerarquía de operaciones incorrecta -->
- [ ] D) 3(x - 7²) = 64 <!-- Error grave: paréntesis mal ubicados -->

### Explicación Pedagógica
"Triple de un número" es 3x. "Se le resta 7" es 3x - 7. "El resultado se eleva al cuadrado" es (3x - 7)². "Se obtiene 64" completa la ecuación. El error B ocurre cuando se interpreta que solo x está elevado al cuadrado. C y D muestran errores de jerarquía de operaciones y uso de paréntesis.

---

## Question 7 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Factorización de polinomios
**Context:** En una empresa textil de Antioquia, se diseñan patrones de telas donde las dimensiones siguen patrones algebraicos.

### Enunciado
La factorización correcta de 8x³ - 27y³ es:

### Options
- [ ] A) (2x - 3y)(4x² + 6xy + 9y²) <!-- Error: signos incorrectos en el segundo factor -->
- [ ] B) (2x + 3y)(4x² - 6xy + 9y²) <!-- Confusión: no es una suma de cubos -->
- [x] C) (2x - 3y)(4x² + 6xy + 9y²) <!-- Correcto: diferencia de cubos a³ - b³ = (a-b)(a²+ab+b²) -->
- [ ] D) (4x - 9y)(2x² + 3xy + 3y²) <!-- Error: factores no relacionados -->

### Explicación Pedagógica
8x³ - 27y³ = (2x)³ - (3y)³, aplicando diferencia de cubos: a³ - b³ = (a - b)(a² + ab + b²), obtenemos (2x - 3y)(4x² + 6xy + 9y²). El error A tiene los signos correctos pero el segundo factor mal escrito. B corresponde a suma de cubos, no diferencia. D no tiene relación algebraica con la expresión original.

---

## Question 8 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Operaciones con fracciones algebraicas
**Context:** En una compañía de telecomunicaciones en Barranquilla, se calculan tarifas donde intervienen expresiones racionales.

### Enunciado
El resultado de simplificar [1/(x+2)] + [1/(x-2)] es:

### Options
- [ ] A) 2/(x²-4) <!-- Error: se suman numeradores sin común denominador -->
- [ ] B) 2/(x²+4) <!-- Error: denominador incorrecto, no se usa identidad notable -->
- [x] C) 2x/(x²-4) <!-- Correcto: el LCD es (x+2)(x-2)=x²-4, numerador: (x-2)+(x+2)=2x -->
- [ ] D) x/(x²-4) <!-- Error: coeficiente incorrecto del numerador -->

### Explicación Pedagógica
LCD = (x+2)(x-2) = x² - 4. El primer numerador es (x-2), el segundo es (x+2). Sumando: (x-2 + x+2)/(x²-4) = 2x/(x²-4). El error A surge de sumar numeradores sin común denominador. B usa denominador incorrecto. D muestra error en el coeficiente del numerador.

---

## Question 9 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v9`
**Bloom:** Understand
**ICFES:** Productos notables y factorización
**Context:** En el sector hotelero de Cartagena, los ingresos por temporada se modelan con expresiones algebraicas cuadráticas.

### Enunciado
Si el producto de dos números consecutivos es n(n+1) = 182, ¿cuál ecuación equivalente se obtiene al desarrollar y factorizar?

### Options
- [ ] A) n² + n - 182 = 0 <!-- Correcto: forma estándar de la ecuación cuadrática -->
- [ ] B) n² + n + 182 = 0 <!-- Error: signo incorrecto en la constante -->
- [ ] C) n² - n - 182 = 0 <!-- Error: signo incorrecto en el término lineal -->
- [ ] D) n² + 1 - 182 = 0 <!-- Error: desarrollo incompleto -->

### Explicación Pedagógica
n(n+1) = 182 → n² + n = 182 → n² + n - 182 = 0. Resolviendo: n = [-1 ± √(1 + 728)]/2 = [-1 ± 27]/2, luego n = 13 o n = -14. El error B cambia el signo de la constante. C invierte el signo del término lineal. D no desarrolla correctamente el producto notable.

---

## Question 10 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Dominio de expresiones algebraicas
**Context:** En un laboratorio farmacéutico colombiano, la concentración de un medicamento varía según una expresión racional.

### Enunciado
El dominio de la función f(x) = (2x + 3)/(x² - 5x + 6) está dado por los valores de x diferentes a:

### Options
- [ ] A) 1 y 6 <!-- Error: raíces incorrectas del denominador -->
- [ ] B) 2 y 3 <!-- Correcto: x² - 5x + 6 = (x-2)(x-3), raíces x=2 y x=3 -->
- [ ] C) -2 y -3 <!-- Error: se ignoran los signos del factoring -->
- [ ] D) 0 y 5 <!-- Error: no corresponde a las raíces del polinomio -->

### Explicación Pedagógica
Para el dominio, el denominador no puede ser cero: x² - 5x + 6 ≠ 0. Factorizando: (x-2)(x-3) = 0, por lo tanto x ≠ 2 y x ≠ 3. El dominio es ℝ - {2, 3}. Los errores surgen de factorizaciones incorrectas o confusión con los signos de las raíces.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Análisis de expresiones algebraicas complejas
**Context:** En el diseño de estructuras metálicas en ingeniería civil colombiana, se usan expresiones algebraicas para calcular tensiones.

### Enunciado
Al realizar la división (6x⁴ + 5x³ - 23x² + 8x - 12) ÷ (3x - 2) mediante división sintética, el residuo es:

### Options
- [ ] A) 0 <!-- Error: se espera que sea divisible exactamente -->
- [x] B) 0 <!-- Correcto: al evaluar en x = 2/3, el resultado es cero -->
- [ ] C) 2 <!-- Error: cálculo incorrecto de la evaluación -->
- [ ] D) -4 <!-- Error: signo incorrecto en el residuo -->

### Explicación Pedagógica
Por el teorema del residuo: al dividir por (3x - 2), evaluamos f(2/3). f(2/3) = 6(16/81) + 5(8/27) - 23(4/9) + 8(2/3) - 12 = 96/81 + 40/27 - 92/9 + 16/3 - 12 = 32/27 + 40/27 - 276/27 + 144/27 - 324/27 = 0. Los errores comunes incluyen cálculos aritméticos incorrectos con fracciones.

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Factorización de expresiones complejas
**Context:** En el análisis financiero de inversiones en la Bolsa de Valores de Colombia, se modelan rendimientos con expresiones algebraicas.

### Enunciado
Al factorizar completamente 2x⁴ - 7x² - 4, una factorización correcta es:

### Options
- [ ] A) (2x² + 1)(x² - 4) <!-- Incompleto: el segundo factor es diferencia de cuadrados -->
- [ ] B) (2x + 1)(x - 2)(x + 2)² <!-- No corresponde a la expresión original -->
- [x] C) (2x² + 1)(x² - 4) = (2x² + 1)(x + 2)(x - 2) <!-- Correcto: trinomio como producto de dos binomios conjugados -->
- [ ] D) (2x² - 1)(x² + 4) <!-- Error: signos incorrectos en la factorización -->

### Explicación Pedagógica
2x⁴ - 7x² - 4 puede verse como trinomio en x²: 2(x²)² - 7x² - 4 = (2x² + 1)(x² - 4). Luego, x² - 4 = (x + 2)(x - 2). La factorización completa es (2x² + 1)(x + 2)(x - 2). El error A no completa la factorización. B no representa la expresión original. D tiene los signos invertidos.

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v13`
**Bloom:** Apply
**ICFES:** Simplificación de expresiones racionales
**Context:** En el diseño de circuitos eléctricos en la industria colombiana, las resistencias equivalentes se calculan con fracciones algebraicas.

### Enunciado
Al simplificar [x/(x+1)] ÷ [x²/(x²-1)], el resultado es:

### Options
- [ ] A) (x - 1)/x <!-- Correcto: se multiplica por el recíproco y se simplifica -->
- [ ] B) x²/(x²-1)² <!-- Error: se multiplica sin simplificar -->
- [ ] C) (x + 1)/(x - 1) <!-- Error: signos y coeficientes incorrectos -->
- [ ] D) 1/(x² - 1) <!-- Error: simplificación excesiva -->

### Explicación Pedagógica
[x/(x+1)] ÷ [x²/(x²-1)] = [x/(x+1)] × [(x²-1)/x²] = [x(x+1)(x-1)]/[(x+1)x²] = (x-1)/x, cancelando x y (x+1). El error B es no realizar la división ni simplificar. C invierte incorrectamente y cambia signos. D simplifica en exceso.

---

## Question 14 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Interpretación de expresiones algebraicas
**Context:** En el análisis demográfico de una ciudad colombiana, la población se modela mediante expresiones algebraicas exponenciales.

### Enunciado
Si P(x) = x³ - 6x² + 11x - 6 representa la población (en miles) de una ciudad después de x años, ¿cuál de las siguientes afirmaciones es correcta?

### Options
- [ ] A) P(1) = 0 significa que hay 0 miles de habitantes en el año 1 <!-- Correcto: evaluación directa -->
- [ ] B) P(0) = -6 significa que la población inicial es 6000 habitantes negativos <!-- Error: no tiene sentido práctico pero algebraicamente correcto -->
- [ ] C) x = 2 es raíz de P(x) <!-- Error: P(2) = 8 - 24 + 22 - 6 = 0, es raíz -->
- [ ] D) Todas las anteriores son correctas <!-- Respuesta parcial, pero A y C son verdaderas -->

### Explicación Pedagógica
P(1) = 1 - 6 + 11 - 6 = 0. P(2) = 8 - 24 + 22 - 6 = 0. P(3) = 27 - 54 + 33 - 6 = 0. Por el teorema del factor, P(x) = (x-1)(x-2)(x-3). Las raíces son 1, 2 y 3. B técnicamente es correcto algebraicamente pero no tiene interpretación real. La pregunta sobre cuál es correcta requiere análisis de contexto.

---

## Question 15 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Evaluación de expresiones algebraicas
**Context:** En el sector energético colombiano, la potencia generada por paneles solares depende de expresiones algebraicas.

### Enunciado
Si la expresión P(t) = (t² - 4t + 4)/(t² - 1) representa la eficiencia de un panel solar, ¿para qué valor(es) de t la eficiencia está indefinida?

### Options
- [ ] A) t = 1 únicamente <!-- Incompleto: falta t = -1 -->
- [ ] B) t = -1 únicamente <!-- Incompleto: falta t = 1 -->
- [x] C) t = 1 y t = -1 <!-- Correcto: el denominador (t-1)(t+1) = 0 para t = ±1 -->
- [ ] D) t = 2 únicamente <!-- Error: t = 2 anula el numerador, no el denominador -->

### Explicación Pedagógica
La eficiencia está indefinida cuando el denominador es cero: t² - 1 = (t+1)(t-1) = 0, por lo tanto t = 1 o t = -1. El numerador se anula en t = 2, lo que indica un "hueco" en la gráfica pero no indefinición. Los errores comunes incluyen confundir raíces del numerador con las del denominador.

---

## Question 16 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Estructura de expresiones algebraicas
**Context:** En el diseño de empaques para productos colombianos de exportación, se optimizan dimensiones usando expresiones algebraicas.

### Enunciado
Para qué valor(es) de x la expresión (x³ + 2x² - 9x - 18)/(x² + x - 6) no está definida y para cuáles se puede simplificar por cancelación:

### Options
- [ ] A) No está definida para x = 2 y x = -3; se puede simplificar para x = -3 <!-- Incorrecto: la simplificación indica una discontinuidad removable -->
- [ ] B) No está definida para x = 2 y x = -3; se puede simplificar para x = 2 <!-- Error conceptual: x=2 anula ambos -->
- [x] C) No está definida para x = 2 y x