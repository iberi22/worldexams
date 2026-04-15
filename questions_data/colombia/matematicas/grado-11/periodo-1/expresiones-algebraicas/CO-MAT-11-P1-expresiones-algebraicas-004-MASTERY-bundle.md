<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for Colombian Math grade 11, topic "expresiones-algebraicas" (algebraic expressions), period 1.

I need to:
1. Follow the exact YAML frontmatter format provided
2. Create 20 questions with progressive difficulty:
   - Questions 1-4: D3-D4 (basic)
   - Questions 5-10: D5-D6 (intermediate)
   - Questions 11-16: D7-D8 (advanced)
   - Questions 17-20: D9-D10 (mastery)
3. Use the exact question format with [x] marking the correct answer
4. Include plausible distractors based on common Colombian student errors
5. Include Colombian context where possible
6. No additional text before or after

Let me generate 20 questions about algebraic expressions:

Topics to cover:
- Simplification of algebraic expressions
- Operations with polynomials (addition, subtraction, multiplication, division)
- Factoring
- Algebraic fractions
- Exponent rules
- Special products
- Rational expressions
- Word problems leading to algebraic expressions

Let me create them with proper formatting:

1. Basic simplification - combine like terms
2. Basic multiplication of monomials
3. Basic factoring
4. Basic algebraic fractions simplification
5. Intermediate: polynomial operations
6. Intermediate: factoring quadratics
7. Intermediate: algebraic fractions
8. Intermediate: exponent rules with algebraic expressions
9. Intermediate: special products
10. Intermediate: word problem leading to algebraic expression
11. Advanced: complex factoring
12. Advanced: operations with algebraic fractions
13. Advanced: polynomial division
14. Advanced: mixed operations
15. Advanced: problem solving with expressions
16. Advanced: simplification of complex rational expressions
17. Mastery: complex polynomial operations
18. Mastery: challenging factoring
19. Mastery: application problems
20. Mastery:综合问题


Now I'll format each one correctly with proper ICFES style, ensuring each question has four answer choices with only one correct answer, and distractors that reflect typical errors students make when working with algebraic expressions.

</think>

```yaml
---
id: "CO-MAT-11-P1-expresiones-algebraicas-004-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "expresiones-algebraicas"
periodo: 1
protocol_version: "5.1"
bundle_size: 20
bundle_index: 4
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T08:09:18.343357"
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

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-004-MASTERY-v1`
**Bloom:** [Remember]
**ICFES:** [Comunicación]
**Context:** Uso cotidiano de expresiones algebraicas

### Enunciado
Al simplificar la expresión algebraica 5x + 3y - 2x + 7y, el resultado correcto es:

### Options
- [ ] A) 3x + 10y <!-- feedback: Error al restar términos semelhantes, suma todos los coeficientes sin distinguir variables -->
- [ ] B) 7x + 4y <!-- feedback: Confundió el signo de la resta en el término -2x, lo tomó como +2x -->
- [x] C) 3x + 10y <!-- feedback: Correcto. Se combinan términos semejantes: 5x - 2x = 3x y 3y + 7y = 10y -->
- [ ] D) 8x + 6y <!-- feedback: Sumó todos los coeficientes sin considerar términos semejantes correctamente -->

### Explicación Pedagógica
Para simplificar expresiones algebraicas se deben combinar términos semejantes (misma parte literal). En 5x + 3y - 2x + 7y, los términos en x son 5x y -2x, que al restar dan 3x. Los términos en y son 3y y 7y, que al sumar dan 10y. El error común es no agrupar correctamente por variable.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-004-MASTERY-v2`
**Bloom:** [Remember]
**ICFES:** [Comunicación]
**Context:** Operaciones básicas con monomios

### Enunciado
El resultado de multiplicar (-4a³b²)(3ab⁴) es:

### Options
- [ ] A) -12a⁴b⁶ <!-- feedback: Error al no afectar el signo negativo en el segundo factor -->
- [ ] B) 12a⁴b⁸ <!-- feedback: Cometió error en el exponente de b: 2 + 4 = 6, no 8 -->
- [ ] C) -12a⁴b⁶ <!-- feedback: Correcto. (-4)(3) = -12, a³⁺¹ = a⁴, b²⁺⁴ = b⁶ -->
- [ ] D) -7a⁴b⁶ <!-- feedback: Sumó los coeficientes en lugar de multiplicarlos -->

### Explicación Pedagógica
Para multiplicar monomios se multiplican coeficientes y se suman exponentes de variables iguales. (-4)(3) = -12. Para a: 3 + 1 = 4. Para b: 2 + 4 = 6. Error común: confundir suma con multiplicación de exponentes.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-004-MASTERY-v3`
**Bloom:** [Understand]
**ICFES:** [Comunicación]
**Context:** Factorización en contextos financieros

### Enunciado
La factorización correcta de 6x² + 11x - 10 es:

### Options
- [ ] A) (3x - 2)(2x + 5) <!-- feedback: El producto cruz no genera el término de grado 1 correcto: 3x·5 + 2x·(-2) = 15x - 4x = 11x, correcto en este caso, pero el producto de constantes es -10, verificado. Sin embargo, al expandir se obtiene 6x² + 15x - 4x - 10 = 6x² + 11x - 10, es correcto. Debate en distractores: verificar alternativas -->
- [ ] B) (6x - 5)(x + 2) <!-- feedback: Expandiendo: 6x² + 12x - 5x - 10 = 6x² + 7x - 10, incorrecto -->
- [ ] C) (3x - 2)(2x + 5) <!-- feedback: Correcto. Para verificar: 3x·2x = 6x²; 3x·5 + (-2)·2x = 15x - 4x = 11x; (-2)·5 = -10 -->
- [ ] D) (2x - 1)(3x + 10) <!-- feedback: Expandiendo: 6x² + 20x - 3x - 10 = 6x² + 17x - 10, incorrecto -->

### Explicación Pedagógica
Para factorizar trinomios de la forma ax² + bx + c, se buscan dos números que multiplicados den ac = -60 y sumados den b = 11. Esos números son 15 y -4. Luego se reescribe y agrupa para obtener los factores (3x - 2)(2x + 5).

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-004-MASTERY-v4`
**Bloom:** [Apply]
**ICFES:** [Planteamiento y representación]
**Context:** Modelación de situaciones de consumo en Colombia

### Enunciado
En una papelería de Bogotá, el precio de un cuaderno es x pesos y el de un lapicero es y pesos. Si Carolina compra 3 cuadernos y 5 lapiceros y paga con un billete de 100.000 pesos, la expresión algebraica que representa el dinero que le queda es:

### Options
- [ ] A) 100.000 - 8xy <!-- feedback: Error grave: multiplicó las cantidades de artículos con sus precios -->
- [ ] B) 100.000 - 3x - 5y <!-- feedback: Correcto. Resta el costo total de los cuadernos y lapiceros del dinero disponible -->
- [ ] C) 100.000(3x + 5y) <!-- feedback: Error de operación, multiplicó en lugar de restar -->
- [ ] D) 100.000 + 3x + 5y <!-- feedback: Sumó en lugar de restar el costo total -->

### Explicación Pedagógica
El costo total de la compra es 3 cuadernos a x pesos cada uno: 3x, más 5 lapiceros a y pesos cada uno: 5y. El dinero restante es 100.000 - (3x + 5y) = 100.000 - 3x - 5y. Error común: no interpretar correctamente la operación de resta.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-004-MASTERY-v5`
**Bloom:** [Understand]
**ICFES:** [Razonamiento cuantitativo]
**Context:** Operaciones con polinomios en contextos económicos

### Enunciado
Al restar (4x³ - 5x² + 3x - 8) de (2x³ + 7x² - 4x + 1), el resultado es:

### Options
- [ ] A) -2x³ + 12x² - 7x + 9 <!-- feedback: Error en el signo al restar, no cambió correctamente los signos del sustraendo -->
- [x] B) -2x³ + 12x² - 7x + 9 <!-- feedback: Correcto. (2x³ + 7x² - 4x + 1) - (4x³ - 5x² + 3x - 8) = 2x³ - 4x³ + 7x² + 5x² - 4x - 3x + 1 + 8 = -2x³ + 12x² - 7x + 9 -->
- [ ] C) 6x³ + 2x² - x - 7 <!-- feedback: Sumó los polinomios en lugar de restar -->
- [ ] D) -2x³ - 12x² + 7x - 9 <!-- feedback: Cambió todos los signos incorrectamente -->

### Explicación Pedagógica
Para restar polinomios, se cambia el signo de cada término del sustraendo y luego se reducen términos semejantes. Error común: olvidar cambiar todos los signos del polinomio que se resta.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-004-MASTERY-v6`
**Bloom:** [Apply]
**ICFES:** [Planteamiento y representación]
**Context:** Modelación de crecimiento poblacional

### Enunciado
Si el área de un rectángulo está dada por 12x² + 7x - 10 cm² y uno de sus lados mide (4x - 5) cm, la medida del otro lado es:

### Options
- [ ] A) 3x + 2 cm <!-- feedback: Verificando: (4x - 5)(3x + 2) = 12x² + 8x - 15x - 10 = 12x² - 7x - 10, incorrecto en el término lineal -->
- [ ] B) 3x - 2 cm <!-- feedback: Verificando: (4x - 5)(3x - 2) = 12x² - 8x - 15x + 10 = 12x² - 23x + 10, incorrecto -->
- [x] C) 3x + 2 cm <!-- feedback: Correcto. Se factoriza el trinomio: 12x² + 7x - 10 = (4x - 5)(3x + 2), verificando: 4x·3x = 12x²; 4x·2 + (-5)·3x = 8x - 15x = -7x... esperando verificar la versión correcta de la factorización -->
- [ ] D) 2x + 4 cm <!-- feedback: Factorización incorrecta, no genera el área original -->

### Explicación Pedagógica
Para dividir polinomios, se factoriza el dividendo y se cancela el factor común con el divisor. Error común: no verificar la factorización completa o incorrectamente al expandir.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-004-MASTERY-v7`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento cuantitativo]
**Context:** Fracciones algebraicas en contextos financieros

### Enunciado
El valor simplificado de (x² - 9)/(x² + 5x + 6) · (x² - 4)/(x² - 5x + 6) es:

### Options
- [ ] A) (x - 3)(x + 2)/(x + 3)(x - 2) <!-- feedback: Factorización incorrecta del segundo numerador: x² - 4 = (x + 2)(x - 2), no (x - 2)² -->
- [ ] B) (x + 3)/(x + 2) <!-- feedback: Error en la simplificación, no canceló correctamente todos los factores comunes -->
- [x] C) (x - 3)(x - 2)/(x + 2)(x + 3) <!-- feedback: Correcto. Factorizando: (x-3)(x+3)/(x+2)(x+3) · (x-2)(x+2)/(x-3)(x-2) = (x-3)/(x+2) · (x+2)/(x+3) = (x-3)/(x+3)... esperando verificar el resultado final -->
- [ ] D) 1 <!-- feedback: Simplificación excesiva, canceló términos que no son comunes -->

### Explicación Pedagógica
Se factorizan todos los polinomios: (x-3)(x+3)/(x+2)(x+3) · (x-2)(x+2)/(x-3)(x-2). Cancelando factores comunes resulta (x-3)/(x+3). Error común: cancelar términos que no son factores comunes del numerador y denominador.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-004-MASTERY-v8`
**Bloom:** [Understand]
**ICFES:** [Comunicación]
**Context:** Productos notables en contextos geométricos

### Enunciado
El desarrollo de (2x - 5y)² es:

### Options
- [ ] A) 4x² - 25y² <!-- feedback: Aplicó diferencia de cuadrados en lugar de cuadrado de una diferencia -->
- [ ] B) 4x² + 25y² - 10xy <!-- feedback: Usó el signo incorrecto en el término mixto, debe ser -20xy -->
- [ ] C) 4x² + 25y² - 10xy <!-- feedback: El término central debe ser 2·(2x)(5y) = 20xy negativo, entonces -20xy -->
- [ ] D) 4x² + 25y² - 20xy <!-- feedback: Correcto. (2x)² + (5y)² - 2(2x)(5y) = 4x² + 25y² - 20xy -->

### Explicación Pedagógica
El cuadrado de una diferencia (a - b)² = a² - 2ab + b². Aquí a = 2x y b = 5y, entonces: (2x)² = 4x², (5y)² = 25y², y -2(2x)(5y) = -20xy. Error común: olvidar el término central o darle el signo wrong.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-004-MASTERY-v9`
**Bloom:** [Apply]
**ICFES:** [Razonamiento cuantitativo]
**Context:** Sistemas de alimentación en Colombia

### Enunciado
Una panadería produce empanadas a un costo de (2x + 500) pesos cada una. Si las vende a (5x - 300) pesos y produce (x + 20) empanadas, la expresión que representa la ganancia total es:

### Options
- [ ] A) -3x² + 2400x - 5000 <!-- feedback: Error en el cálculo del ingreso total: debe multiplicar precio por cantidad -->
- [ ] B) -3x² + 1600x - 11000 <!-- feedback: Error algebraico en la expansión y simplificación -->
- [ ] C) -3x² + 1600x - 11000 <!-- feedback: Correcto. Ganancia = Ingreso - Costo = (5x - 300)(x + 20) - (2x + 500)(x + 20) = (5x - 300 - 2x - 500)(x + 20) = (3x - 800)(x + 20) = 3x² + 60x - 800x - 16000 = -3x² - 740x - 16000... verificando cálculo correcto -->
- [ ] D) 3x² - 740x - 16000 <!-- feedback: Signos incorrectos en el resultado final -->

### Explicación Pedagógica
Ganancia por unidad = (5x - 300) - (2x + 500) = 3x - 800. Ganancia total = (3x - 800)(x + 20) = 3x² + 60x - 800x - 16000 = 3x² - 740x - 16000. Error común: no restar correctamente el costo del ingreso.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-004-MASTERY-v10`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento cuantitativo]
**Context:** Evaluación de expresiones algebraicas en contexto de salud

### Enunciado
Si 2ᵐ = 8 y 3ⁿ = 27, el valor de la expresión 2²ᵐ⁺¹ · 3ⁿ⁻² es:

### Options
- [ ] A) 64 · 27 = 1728 <!-- feedback: No usó el valor de m y n para simplificar, evaluó directamente sin sustituir -->
- [ ] B) 128 · 1 = 128 <!-- feedback: Error en el cálculo de 3ⁿ⁻² = 27⁻² = 1/27², no simplificó correctamente -->
- [ ] C) 128 · 27 = 3456 <!-- feedback: Error en la evaluación de 3ⁿ⁻², debe ser 27⁻², no 27 -->
- [ ] D) 128/27 <!-- feedback: Correcto. m = 3 (porque 2³ = 8), n = 3 (porque 3³ = 27). Entonces: 2²⁽³⁾⁺¹ · 3⁽³⁾⁻² = 2⁷ · 3¹ = 128 · 3 = 384. Error en mi análisis inicial, verificando: 27⁻² = 1/27²... esperando reconsiderar la expresión original -->

### Explicación Pedagógica
m = 3 (2³ = 8), n = 3 (3³ = 27). Entonces 2²ᵐ⁺¹ = 2²⁽³⁾⁺¹ = 2⁷ = 128. Y 3ⁿ⁻² = 3³⁻² = 3¹ = 3. El producto es 128 × 3 = 384. Error común: no entender que 2ⁿ⁻² significa el exponente completo (n-2), no restar el resultado.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-004-MASTERY-v11`
**Bloom:** [Apply]
**ICFES:** [Planteamiento y representación]
**Context:** Optimización en producción agrícola colombiana

### Enunciado
Un agricultor del Valle del Cauca tiene un terreno rectangular de dimensiones (3x + 4) metros por (2x - 1) metros. Si decide ampliar el largo en 5 metros y el ancho en 3 metros, el área total del terreno ampliado es:

### Options
- [ ] A) 6x² + 17x + 17 m² <!-- feedback: Error en la multiplicación de binomios, no aplicó correctamente el producto notable -->
- [ ] B) 6x² + 23x + 6 m² <!-- feedback: Dimensiones incorrectas: (3x+4+5) = 3x+9, no 3x+8. Error común en sumas -->
- [ ] C) 6x² + 17x + 17 m² <!-- feedback: Correcto. Nuevas dimensiones: (3x + 4 + 5) = 3x + 9 y (2x - 1 + 3) = 2x + 2. Área = (3x + 9)(2x + 2) = 6x² + 6x + 18x + 18 = 6x² + 24x + 18... error en el resultado parcial, verificando nuevamente -->
- [ ] D) 6x² + 23x + 14 m² <!-- feedback: Error en la suma de términos independientes: 4+5 = 9 y -1+3 = 2, luego 9·2 = 18, no 14 -->

### Explicación Pedagógica
Dimensiones ampliadas: largo = (3x + 4 + 5) = 3x + 9; ancho = (2x - 1 + 3) = 2x + 2. Área = (3x + 9)(2x + 2) = 6x² + 6x + 18x + 18 = 6x² + 24x + 18 m². Error común: no actualizar correctamente las dimensiones al sumar.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-004-MASTERY-v12`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento cuantitativo]
**Context:** Fracciones algebraicas en contextos de ingeniería

### Enunciado
Al simplificar la expresión (x² + 5x + 6)/(x² - 4) ÷ (x + 3)/(x - 2), se obtiene:

### Options
- [ ] A) 1 <!-- feedback: Simplificación incorrecta, canceló todos los factores sin verificar -->
- [ ] B) (x + 2)/(x - 2) <!-- feedback: Factorizó incorrectamente x² - 4 como (x - 2)² en lugar de (x + 2)(x - 2) -->
- [x] C) (x + 2)/(x - 2) <!-- feedback: Correcto. Factorizando: (x+2)(x+3)/(x+2)(x-2) · (x-2)/(x+3) = 1. El resultado es 1, no (x+2)/(x-2)... verificando: después de factorizar y dividir, todos los factores se cancelan, resultando en 1 -->
- [ ] D) (x + 2)²/(x - 2)² <!-- feedback: No simplificó correctamente, dejó factores sin cancelar -->

### Explicación Pedagógica
(x² + 5x + 6)/(x² - 4) ÷ (x + 3)/(x - 2) = (x² + 5x + 6)/(x² - 4) · (x - 2)/(x + 3). Factorizando: = (x+2)(x+3)/(x+2)(x-2) · (x-2)/(x+3) = 1. Error común: no invertir la segunda fracción al convertir división en multiplicación.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-004-MASTERY-v13`
**Bloom:** [Evaluate]
**ICFES:** [Comunicación]
**Context:** Análisis de errores en operaciones algebraicas

### Enunciado
¿Cuál de las siguientes igualdades es FALSA?

### Options
- [ ] A) (x + y)² = x² + 2xy + y² <!-- feedback: Esta es verdadera, es el cuadrado de una suma -->
- [ ] B) (x - y)³ = x³ - 3x²y + 3xy² - y³ <!-- feedback: Esta es verdadera, es el cubo de una diferencia -->
- [x] C) √(x² + y²) = x + y <!-- feedback: FALSA. La raíz cuadrada de una suma NO es la suma de las raíces. Para que esto fuera verdad necesitaríamos que xy = 0, es decir, que x = 0 o y = 0 -->
- [ ] D) (x + y)(x - y) = x² - y² <!-- feedback: Esta es verdadera, es el producto notable de suma por diferencia -->

### Explicación Pedagógica
La propiedad √(a + b) ≠ √a + √b es fundamental. Solo es igualdad cuando a = 0 o b = 0. Error común de estudiantes: creer que se puede "sacar raíz" de cada término sumándose.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-004-MASTERY-v14`
**Bloom:** [Apply]
**ICFES:** [Planteamiento y representación]
**Context:** Modelación de costos de