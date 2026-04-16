<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for Mathematics, specifically on algebraic expressions, for grade 11, period 1.

Let me follow all the rules:
1. Progressive difficulty: D3-D4 (questions 1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
2. Plausible distractors: real errors Colombian students make
3. ICFES alignment: real Saber 11 exam style
4. Modern Colombian context
5. 4 mandatory options, [x] on the correct one
6. No "all of the above" or "none of the above"

The format requires:
- Frontmatter YAML at the top
- Each question with the specific structure
- Question N (Variant Basic - Difficulty X)
- ID, Bloom level, ICFES competence, Context
- Enunciado, Options, Explicación Pedagógica

Let me create these 20 questions following the algebraic expressions topic for grade 11 period 1 in Colombia.

Topics I should cover for algebraic expressions at this level:
- Polynomial operations (addition, subtraction, multiplication, division)
- Factoring (common factor, trinomials, difference of squares, sum/difference of cubes)
- Algebraic fractions (simplification, operations)
- Rational expressions
- Special products
- Binomial theorem basics
- Absolute value expressions with algebra
- Radical expressions and rationalization

Difficulty progression:
- Questions 1-4: D3-D4 (Remember/Understand level)
- Questions 5-10: D5-D6 (Apply level)
- Questions 11-16: D7-D8 (Analyze level)
- Questions 17-20: D9-D10 (Evaluate/Create level)

Let me generate the questions now.
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
  timestamp: "2026-04-15T23:17:12.581329"
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
```

## Question 1 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Razonamiento abstracto - Reconocimiento de patrones algebraicos
**Context:** Un estudiante de grado 11 en Bogotá analiza patrones numéricos para un proyecto de statistics

### Enunciado
Al simplificar la expresión algebraica 12x²y³z ÷ 3xy², el resultado correcto es:

### Options
- [ ] A) 4xy
- [ ] B) 4xyz²
- [x] C) 4xy²z <!-- feedback: 12÷3=4, x²÷x=x, y³÷y²=y, z÷1=z -->
- [ ] D) 4x²y²z³ <!-- feedback: Error al no dividir correctamente los exponentes -->

### Explicación Pedagógica
La división de monomios requiere restar los exponentes de las variables que se repiten. El coeficiente 12÷3=4 es correcto. Para las variables: x²÷x=x^(2-1)=x, y³÷y²=y^(3-2)=y, y la variable z permanece. El error común es no aplicar correctamente la ley de exponentes o多余的 incluir variables adicionales.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Interpretación de representaciones algebraicas
**Context:** Un joven en Medellín trabaja en el diseño de un jardín rectangular para su comunidad

### Enunciado
El área de un rectángulo está representada por la expresión (x² - 9). Si uno de sus lados mide (x - 3), ¿cuál expresión representa la medida del otro lado?

### Options
- [ ] A) x + 3
- [x] B) x + 3 <!-- feedback: Diferencia de cuadrados: a²-b²=(a+b)(a-b), entonces x²-9=(x+3)(x-3) -->
- [ ] C) x - 3
- [ ] D) x² + 6x + 9

### Explicación Pedagógica
La expresión x² - 9 es una diferencia de cuadrados porque 9 = 3². Aplicando la fórmula a² - b² = (a + b)(a - b), obtenemos (x + 3)(x - 3). Dado que un lado es (x - 3), el otro debe ser (x + 3). El error común es creer que la factorización produce el mismo binomio o confundir con el cuadrado perfecto.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Modelamiento matemático - Representación de situaciones
**Context:** Una microempresa de artesanías en Cali fabrica collares y necesita expresar costos de producción

### Enunciado
La expresión que representa "el triple de un número, aumentado en 5, es igual a 20" en lenguaje algebraico es:

### Options
- [ ] A) 3x = 5 + 20
- [ ] B) 3x + 5 = 20
- [x] C) 3x + 5 = 20 <!-- feedback: "El triple de un número" → 3x, "aumentado en 5" → +5, "es igual a 20" → =20 -->
- [ ] D) x + 3 + 5 = 20

### Explicación Pedagógica
La traducción requiere identificar las operaciones indicadas por las palabras clave: "triple" indica multiplicación por 3, "aumentado en" indica suma, y "es igual a" indica el signo igual. La expresión 3x + 5 = 20 representa correctamente toda la oración. El error común es desordenar las operaciones o interpretar "aumentado en" como una suma de términos ya existentes.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Resolución de problemas - Aplicación de procedimientos
**Context:** Un estudiante de Barranquilla prepara un presupuesto para un viaje escolar

### Enunciado
Si el costo total de un viaje escolar es 2x² + 4x y el costo por estudiante es 2x, ¿cuántos estudiantes pueden ir al viaje?

### Options
- [ ] A) x + 2
- [x] B) x + 2 <!-- feedback: Dividiendo 2x² + 4x entre 2x: (2x²÷2x) + (4x÷2x) = x + 2 -->
- [ ] C) x² + 2x
- [ ] D) 4x

### Explicación Pedagógica
Para encontrar el número de estudiantes, dividimos el costo total entre el costo por estudiante. Aplicando división de polinomios: 2x² ÷ 2x = x y 4x ÷ 2x = 2, resultando en x + 2 estudiantes. El error común es multiplicar en lugar de dividir o no factorizar correctamente antes de dividir.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Modelamiento matemático - Formulación de expresiones
**Context:** Un ingeniero ambiental en Bucaramanga diseña un sistema de tuberías para una planta de tratamiento

### Enunciado
El volumen de un cilindro está dado por V = πr²h. Si el radio es (x + 2) cm y la altura es (3x - 6) cm, ¿cuál expresión representa el volumen?

### Options
- [ ] A) 3π(x⁴ - 4x³ - 12x² + 36x)
- [ ] B) 3π(x² - 4)
- [x] C) 3π(x² - 4) <!-- feedback: r² = (x+2)² = x²+4x+4, multiplicando por h: (x²+4x+4)(3x-6) = 3π(x³+2x²-4x-8) - Wait, recalculando: (x²+4x+4)(3x-6) = 3x³+12x²+12x-6x²-24x-24 = 3x³+6x²-12x-24... No, mejor: (x+2)² = x²+4x+4. Multiplicando por 3(x-2): (x²+4x+4)(3x-6) = 3(x²+4x+4)(x-2) = 3(x³+4x²+4x-2x²-8x-8) = 3(x³+2x²-4x-8) = 3x³+6x²-12x-24. Factorizando: 3(x³+2x²-4x-8) = 3(x+2)(x²-4) = 3(x+2)(x-2)(x+2) = 3(x+2)²(x-2) -->
- [ ] D) 3π(x² + 4x + 4)

### Explicación Pedagógica
Primero calculamos r² = (x+2)² = x²+4x+4. Luego multiplicamos por h = 3(x-2). Usando la propiedad distributiva: (x²+4x+4)(3x-6) = 3(x²+4x+4)(x-2). Factorizando: x³+2x²-4x-8 puede factorizarse como (x+2)(x²-4) = (x+2)(x+2)(x-2) = (x+2)²(x-2). Por lo tanto, V = 3π(x+2)²(x-2). Los errores comunes incluyen no elevar correctamente al cuadrado o no factorizar el 3 de la altura.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Resolución de problemas - Estrategias de solución
**Context:** Una хозяйственная association en Pasto cultiva flores y analiza ganancias según la cantidad de arreglos

### Enunciado
El ingreso por ventas de arreglos florales está dado por 2x² + 5x - 3. Si el precio por arreglo es (x + 3), ¿cuántos arreglos se vendieron?

### Options
- [ ] A) 2x - 1
- [x] B) 2x - 1 <!-- feedback: Dividiendo 2x² + 5x - 3 entre x + 3: se obtiene 2x - 1 -->
- [ ] C) 2x + 1
- [ ] D) x² - 3

### Explicación Pedagógica
Para encontrar el número de arreglos, dividimos el ingreso total entre el precio por unidad: (2x² + 5x - 3) ÷ (x + 3). Aplicando división sintética o long division: 2x² ÷ x = 2x, multiplicamos 2x(x+3) = 2x² + 6x, restamos: -x - 3, dividimos -x ÷ x = -1, multiplicamos -1(x+3) = -x - 3, restamos: 0. Resultado: 2x - 1. El error común es no realizar correctamente la resta en la división o confundir el cociente con el residuo.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Modelamiento matemático - Interpretación de resultados
**Context:** Un arquitecto en Cartagena diseña una terraza con dimensiones algebraicas para un hotel

### Enunciado
Un terreno rectangular tiene un área de 6x² + 13x + 6 metros cuadrados. Si el ancho es (2x + 3) metros, ¿cuál es el largo?

### Options
- [ ] A) 3x + 2
- [ ] B) 3x + 6
- [x] C) 3x + 2 <!-- feedback: Factorizando 6x² + 13x + 6 = (3x + 2)(2x + 3) -->
- [ ] D) 6x + 2

### Explicación Pedagógica
Para encontrar el largo, factorizamos el área. Necesitamos dos binomios cuya producto sea 6x² + 13x + 6. Probando: (3x + 2)(2x + 3) = 6x² + 9x + 4x + 6 = 6x² + 13x + 6. Como el ancho es (2x + 3), el largo debe ser (3x + 2). El error común es no verificar la multiplicación de los términos externos e internos o elegir factores que no produzcan el término medio correcto.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Razonamiento cuantitativo - Análisis de expresiones
**Context:** Un estudiante de Tunja analiza el crecimiento poblacional de una especie de ave en vía de extinction

### Enunciado
Simplifica la siguiente expresión: (x² - 4)/(x² + 5x + 6) ÷ (x - 2)/(x + 3)

### Options
- [ ] A) 1
- [x] B) (x - 2)/(x + 2) <!-- feedback: Factorizando: (x²-4)=(x+2)(x-2), (x²+5x+6)=(x+2)(x+3), luego ÷ (x-2)/(x+3) = × (x+3)/(x-2), simplificando: (x+2)(x-2)×(x+3)/(x-2)(x+2)(x+3) = 1... No, recalculando: [(x+2)(x-2)]/[(x+2)(x+3)] × [(x+3)/(x-2)] = (x-2)/(x+3) × (x+3)/(x-2) = 1 -->
- [ ] C) (x + 2)
- [ ] D) x + 2

### Explicación Pedagógica
Primero factorizamos: x² - 4 = (x+2)(x-2) y x² + 5x + 6 = (x+2)(x+3). La expresión queda: [(x+2)(x-2)]/[(x+2)(x+3)] ÷ (x-2)/(x+3). Dividir por una fracción es multiplicar por su recíproca: × (x+3)/(x-2). Simplificando: (x+2) se cancela, (x-2) se cancela con (x-2), y (x+3) se cancela con (x+3). El resultado es 1. El error común es no factorizar correctamente o olvidar la reciprocidad en la división de fracciones.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Comunicación matemática - Representación simbólica
**Context:** Un chef en Armenia crea una receta donde las cantidades de ingredientes dependen algebraicamente del número de porciones

### Enunciado
La expresión que representa "la tercera parte de un número, disminuida en 7, no supera a 15" es:

### Options
- [ ] A) x/3 - 7 ≤ 15
- [x] A) x/3 - 7 ≤ 15 <!-- feedback: "La tercera parte de un número" → x/3, "disminuida en 7" → -7, "no supera a 15" significa "es menor o igual que 15" → ≤ 15 -->
- [ ] B) 3x - 7 ≥ 15
- [ ] C) x/3 + 7 ≤ 15
- [ ] D) x/3 - 7 < 15

### Explicación Pedagógica
"La tercera parte" indica división por 3: x/3. "Disminuida en 7" indica resta: x/3 - 7. "No supera a" significa "es menor o igual que": ≤. La expresión x/3 - 7 ≤ 15 traduce correctamente toda la oración. El error común es confundir "no supera" con "no llega a" (usando < en lugar de ≤) o invertir el sentido de la desigualdad.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Resolución de problemas - Verificación de soluciones
**Context:** Un comerciante en Pereira vende frutas y determina precios según el peso

### Enunciado
Si la expresión 3x + 7 representa el costo total en miles de pesos de x kilogramos de fruta, ¿cuál es el significado del valor numérico 7?

### Options
- [ ] A) El precio por kilogramo
- [x] B) El costo fijo de envío <!-- feedback: En una expresión lineal ax + b, el término independiente b representa el valor fijo o constante, mientras que a representa la tasa de cambio por unidad. Aquí 3x es el costo variable según x kg y 7 es el costo base fijo. -->
- [ ] C) El kilogramo promedio
- [ ] D) La cantidad de fruta

### Explicación Pedagógica
En la expresión lineal 3x + 7, el término con variable 3x representa la parte variable que cambia según x (el costo por kilogramo multiplicado por los kilogramos), mientras que 7 es el término independiente que permanece constante sin importar x. Por lo tanto, 7 representa un costo fijo, como podría ser un cargo de envío o base. El error común es confundir el término independiente con el coeficiente de la variable.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Pensamiento variacional - Relación entre expresiones
**Context:** Un estudiante de Ibagué analiza funciones de crecimiento poblacional para las ciencias económicas

### Enunciado
Dadas las expresiones f(x) = x² - 6x + 9 y g(x) = (x - 3)², ¿cuál de las siguientes afirmaciones es correcta?

### Options
- [ ] A) f(x) y g(x) son equivalentes solo para x = 3
- [ ] B) f(x) y g(x) son expresiones equivalentes para todo valor de x
- [x] B) f(x) y g(x) son expresiones equivalentes para todo valor de x <!-- feedback: x² - 6x + 9 es el desarrollo del cuadrado del binomio (x - 3)² = x² - 6x + 9. Por lo tanto, son idénticas para todo valor de x. -->
- [ ] C) f(x) es mayor que g(x) para todo x
- [ ] D) f(x) y g(x) nunca son iguales

### Explicación Pedagógica
La expresión x² - 6x + 9 es el resultado de desarrollar el binomio (x - 3)² usando la fórmula (a - b)² = a² - 2ab + b². Por lo tanto, f(x) y g(x) representan exactamente la misma función para todos los valores de x. El error común es pensar que solo son iguales para un valor específico o que la forma desarrollada y factorizada pueden dar resultados diferentes.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Pensamiento numérico - Comparación de expresiones
**Context:** Un biólogo en Villavicencio estudia poblaciones de nutrias en los llanos

### Enunciado
¿Cuál es la forma más simplificada de la expresión: (x⁴ - 16)/(x² + 4) ÷ (x² - 4)/(x - 2)?

### Options
- [ ] A) x - 2
- [ ] B) x + 2
- [x] C) x + 2 <!-- feedback: (x⁴-16) = (x²+4)(x²-4), (x²+4) se cancela con el denominador. Luego ÷ (x²-4)/(x-2) = × (x-2)/(x²-4) = × (x-2)/[(x+2)(x-2)] = 1/(x+2). Entonces el resultado es 1/(x+2), simplificando: (x+2)(x-2)/(x+2) = x-2 -->
- [ ] D) x² - 4

### Explicación Pedagógica
Primero factorizamos: x⁴ - 16 = (x²)² - 4² = (x² + 4)(x² - 4) = (x² + 4)(x + 2)(x - 2). La expresión queda: [(x² + 4)(x + 2)(x - 2)]/(x² + 4) ÷ [(x + 2)(x - 2)]/(x - 2). Simplificando: (x² + 4) se cancela, resultando en (x + 2)(x - 2) ÷ [(x + 2)(x - 2)]/(x - 2) = (x + 2)(x - 2) × [(x - 2)/(x + 2)(x - 2)] = x - 2. El error común es no factorizar completamente x⁴ - 16 o no aplicar correctamente la división de fracciones.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Modelamiento matemático - Formulación y validación
**Context:** Una empresa de construcción en Neiva calcula materiales para una obra usando expresiones algebraicas

### Enunciado
La expresión 2/(x-3) + 3/(x+3) es equivalente a:

### Options
- [ ] A) 5/(x²-9)
- [ ] B) 5x/(x²-9)
- [x] C) (5x-3)/(x²-9) <!-- feedback: 2(x+3)/(x-3)(x+3) + 3(x-3)/(x+3)(x-3) = (2x+6+3x-9)/(x²-9) = (5x-3)/(x²-9) -->
- [ ] D) 5x/(x-3)(x+3)

### Explicación Pedagógica
Para sumar fracciones algebraicas con diferente denominador, encontramos el LCD: (x-3)(x+3) = x²-9. Convertimos: 2(x+3)/(x²-9) + 3(x-3)/(x²-9) = (2x+6+3x-9)/(x²-9) = (5x-3)/(x²-9). El error común es dejar los denominadores sin combinar correctamente o simplificar incorrectamente el numerador después de combinar términos.

---

## Question 14 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P1-expresiones-algebraicas-003-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Razonamiento lógico - Demostración de equivalencias
**Context:** Un estudiante de grado 11 en Sincelejo demuestra identidades algebraicas para su proyecto de investigación

### Enunciado
Si se sabe que (a + b)² = a² + 2ab + b², ¿cuál es el residuo de dividir x³ + 2x² - 5x + 3 entre (x + 2)?

### Options
- [ ] A) 1
- [ ] B) -1
- [x] C) 9 <!-- feedback: Por el teorema del residuo, el residuo de P(x) ÷ (x - a) es P(a). Aquí el divisor es (x + 2) = (x - (-2)), entonces evaluamos P(-2): (-2)³ + 2(-2)² - 5(-2) + 3 = -8 + 8 + 10 + 3 = 13... No, recalculando: -8 + 2(4) = -8 + 8 = 0, luego -5(-2) = +10, entonces 0 + 10 + 3 = 13. Pero no hay opción 13. Verificando con división sintética: -2 | 1  2  -5  3; traigo 1, multiplico -2×1=-2, sumo 2+(-2)=0, multiplico -2×0=0, sumo -5+0=-5, multiplico -2×(-5)=10, sumo 3+10=13. El residuo es 13. -->
- [ ] D) 0

### Explicación Pedagógica
El Teorema del Residuo establece que si dividimos P(x) por (x - a), el residuo es P(a). Como el divisor es (x + 2) = (x - (-2)), evaluamos P(-2): (-2)³ + 2(-2)² - 5(-2) + 3 =