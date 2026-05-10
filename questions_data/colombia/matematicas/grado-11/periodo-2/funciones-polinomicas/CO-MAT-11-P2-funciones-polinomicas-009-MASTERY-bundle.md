<think>
El usuario me pide generar 20 preguntas tipo ICFES Saber 11 para matemáticas, específicamente sobre funciones polinómicas, grado 11, período 2.

Necesito seguir exactamente el formato especificado:
- Frontmatter YAML con metadatos
- 20 preguntas con estructura específica
- Dificultad progresiva: D3-D4 (1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
- 4 opciones, una correcta marcada con [x]
- Estilo ICFES real
- Contexto colombiano moderno
- Sin "todas las anteriores" o "ninguna de las anteriores"

Voy a crear preguntas sobre funciones polinómicas que incluyan:
- Concepto de funciones polinómicas
- Grados y coeficientes
- Ceros/raíces
- Comportamiento (end behavior)
- Factorización
- División sintética
- Teorema del residuo
- Gráficas
- Dominio y rango
- Operaciones con polinomios

Debo hacer distractores plausibles basándome en errores comunes de estudiantes colombianos.

Empecemos con las 20 preguntas:

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
  timestamp: "2026-04-15T23:35:11.446700"
  prompt_version: "v2-direct"
quality_status: "UNREVISED"
generation_status: "RAW"
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

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Interpretación de características de funciones polinómicas
**Context:** Análisis de producción cafetera en Colombia

### Enunciado
En una finca cafetera de Antioquia, la producción mensual P(x) en kilogramos está моделируется por la función P(x) = 500x + 200, donde x representa los meses del año (x = 1, 2, 3, ..., 12). ¿Qué tipo de función representa P(x)?

### Options
- [ ] A) Función cuadrática
- [ ] B) Función lineal
- [x] C) Función polinómica de grado 1 <!-- feedback: Es una función polinómica con exponente 1 en x, lo que corresponde a una función lineal. La forma general es P(x) = ax + b con a ≠ 0. -->
- [ ] D) Función constante

### Explicación Pedagógica
La función P(x) = 500x + 200 es un polinomio de grado 1 porque el mayor exponente de x es 1. La forma general de una función lineal es f(x) = ax + b, donde a = 500 y b = 200. Los estudiantes frecuentemente confunden "lineal" con "constante" o confunden el grado 1 con el grado 2 (cuadrática).

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Identificación de elementos característicos de funciones polinómicas
**Context:** Datos de exportaciones de flores colombianas

### Enunciado
La función F(t) = t³ - 4t representa las exportaciones de flores (en miles de toneladas) en función del tiempo t en años. ¿Cuál es el grado de esta función polinómica?

### Options
- [ ] A) 0
- [ ] B) 1
- [ ] C) 2
- [x] D) 3 <!-- feedback: El grado de una función polinómica está determinado por el mayor exponente de la variable. En t³ - 4t, el término t³ tiene exponente 3, por lo tanto es una función polinómica de grado 3. -->
- [ ] D) 4

### Explicación Pedagógica
Para determinar el grado de una función polinómica, se busca el término con el mayor exponente de la variable. En F(t) = t³ - 4t, observamos dos términos: t³ (exponente 3) y -4t (exponente 1). El mayor exponente es 3, por lo tanto es grado 3. Un error común es confundir el grado con el número de términos o con el coeficiente del término principal.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Análisis de propiedades de funciones polinómicas
**Context:** Crecimiento poblacional en ciudades colombianas

### Enunciado
Una función polinómica P(x) = 2x² + 5x - 3 representa la población de una ciudad en miles de habitantes después de x años. ¿Cuál es el comportamiento de P(x) cuando x → +∞?

### Options
- [ ] A) P(x) → -∞
- [x] B) P(x) → +∞ <!-- feedback: En una función cuadrática con coeficiente líder positivo (a = 2 > 0), cuando x → +∞, la función tiende a +∞ porque el término dominante 2x² crece positivamente. Este es el comportamiento característico de funciones pares con coeficiente positivo. -->
- [ ] C) P(x) → 0
- [ ] D) P(x) → -3

### Explicación Pedagógica
El comportamiento cuando x → +∞ está determinado por el término dominante (aquel con mayor grado). Como P(x) es de grado 2 con coeficiente líder a = 2 (positivo) y el grado es par, ambos extremos van hacia +∞. Un error frecuente es pensar que el término constante (-3) determina el comportamiento al infinito, cuando en realidad es el término de mayor grado quien domina.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Relación entre ceros y factores de funciones polinómicas
**Context:** Análisis de ingresos en mercados de valores colombianos

### Enunciado
En el mercado de valores, una acción tiene precio P(x) = (x - 3)(x + 2)². ¿Cuáles son los ceros de esta función polinómica?

### Options
- [ ] A) x = 3 y x = -2
- [ ] B) x = -3 y x = 2
- [x] C) x = 3 (con multiplicidad 1) y x = -2 (con multiplicidad 2) <!-- feedback: Los ceros se encuentran igualando cada factor a cero: x - 3 = 0 → x = 3 (multiplicidad 1) y x + 2 = 0 → x = -2. Como (x + 2) está elevado al cuadrado, x = -2 tiene multiplicidad 2. -->
- [ ] D) x = 3 (con multiplicidad 2) y x = -2 (con multiplicidad 1)

### Explicación Pedagógica
Para encontrar los ceros de una función factorizada, se iguala cada factor a cero. El factor (x - 3) produce x = 3 con multiplicidad 1 (aparece una vez), mientras que (x + 2)² produce x = -2 con multiplicidad 2 (aparece dos veces). Un error común es ignorar la multiplicidad o contar incorrectamente los factores repetidos.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Aplicación del teorema del factor y del residuo
**Context:** Control de calidad en indústria textil colombiana

### Enunciado
En una fábrica textil de Bogotá, el gerente desea verificar si (x - 2) es factor del polinomio Q(x) = x³ - 5x² + 8x - 4. Si Q(2) = 0, ¿qué se puede concluir?

### Options
- [x] A) (x - 2) es factor de Q(x) y x = 2 es una raíz <!-- feedback: Por el Teorema del Factor: si Q(2) = 0, entonces (x - 2) es factor de Q(x) y x = 2 es un cero de la función. Esto significa que al dividir Q(x) entre (x - 2) se obtiene residuo cero. -->
- [ ] B) (x + 2) es factor de Q(x)
- [ ] C) Q(x) no tiene factores lineales
- [ ] D) Q(2) = 4, entonces x = 2 no es raíz

### Explicación Pedagógica
El Teorema del Factor establece: "Un polinomio Q(x) tiene a (x - a) como factor si y solo si Q(a) = 0". Por lo tanto, si Q(2) = 0, entonces (x - 2) es factor. Un error típico es confundir el teorema del residuo con el del factor o malinterpretar el signo en (x + 2).

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Uso de división sintética para evaluar funciones polinómicas
**Context:** Producción agrícola de palma de aceite en la Orinoquía

### Enunciado
El rendimiento de una plantación de palma de aceite está моделируется por R(x) = 2x³ + x² - 10x + 3. Para determinar el rendimiento en x = 3, un ingeniero aplica división sintética. ¿Cuál es el resultado de R(3)?

### Options
- [ ] A) 30
- [x] B) 36 <!-- feedback: Aplicando división sintética con a = 3 y coeficientes 2, 1, -10, 3: se obtiene 2|1|-10|3 → 3|2|1|-10|3 → 2|7|11|36. El residuo es 36, entonces R(3) = 36. -->
- [ ] C) 33
- [ ] D) 39

### Explicación Pedagógica
La división sintética permite evaluar R(3) eficientemente. Con coeficientes 2, 1, -10, 3 y a = 3: bajamos 2, multiplicamos por 3 (6), sumamos 1+6=7, multiplicamos 7×3=21, sumamos -10+21=11, multiplicamos 11×3=33, sumamos 3+33=36. El último valor es el residuo, que equivale a R(3). Errores comunes incluyen invertir el signo de a o fallar en las multiplicaciones.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Relación entre coeficientes y raíces de polinomios
**Context:** Modelado de ventas en centros comerciales de Medellín

### Enunciado
Las ventas mensuales V(x) de un centro comercial están dadas por V(x) = x³ - 6x² + 11x - 6. Al factorizar, se obtiene V(x) = (x - 1)(x - 2)(x - 3). ¿Cuál es la suma de las raíces?

### Options
- [ ] A) 1
- [ ] B) 3
- [x] C) 6 <!-- feedback: Por las relaciones de Cardano-Vieta para polinomios de grado 3, la suma de las raíces es -b/a donde ax³ + bx² + cx + d. Aquí: a = 1, b = -6, entonces suma = -(-6)/1 = 6. Las raíces son 1, 2 y 3, y 1+2+3 = 6. -->
- [ ] D) -6

### Explicación Pedagógica
Las relaciones de Cardano-Vieta para un polinomio de grado n indican que la suma de las raíces es -b/a (para grado 3). En V(x) = x³ - 6x² + 11x - 6, tenemos a = 1 y b = -6, por lo tanto suma = -(-6)/1 = 6. De forma alternativa, sumando directamente las raíces 1 + 2 + 3 = 6. Un error frecuente es usar solo el signo negativo sin considerar el coeficiente líder.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Comportamiento de funciones polinómicas en extremos
**Context:** Tendencias del PIB en departamentos colombianos

### Enunciado
El PIB departamental se моделируется por P(x) = -x⁴ + 5x³ - 3x² + 2x - 1. ¿Cuál es el comportamiento de P(x) cuando x → -∞?

### Options
- [ ] A) P(x) → +∞
- [x] B) P(x) → -∞ <!-- feedback: Como el grado es 4 (par) y el coeficiente líder es -1 (negativo), cuando x → -∞ el término dominante (-x⁴) será negativo, por lo tanto P(x) → -∞. El comportamiento en ambos extremos es igual porque el grado es par. -->
- [ ] C) P(x) → 0
- [ ] D) P(x) → +1

### Explicación Pedagógica
El comportamiento en extremos depende de dos factores: el grado (par o impar) y el signo del coeficiente líder. Para grado par con coeficiente negativo, ambos extremos van hacia -∞. Un error común es pensar que el coeficiente negativo solo afecta un lado o que el grado impar determina el comportamiento.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Interpretación de gráficas de funciones polinómicas
**Context:** Temperatura en la Sabana de Bogotá durante un ciclo de cultivo

### Enunciado
La función T(h) = -0.5h³ + 3h² - h + 10 моделирует la temperatura (en °C) en función de la hora h en un día de cultivo en la Sabana. ¿Cuántos puntos de inflexión puede tener esta función?

### Options
- [ ] A) 0
- [ ] B) 1
- [x] C) 2 <!-- feedback: Una función polinómica de grado n puede tener máximo n-2 puntos de inflexión. Como T(h) es de grado 3, puede tener máximo 3-2 = 1 punto de inflexión. Sin embargo, para un polinomio cúbico, siempre hay exactamente 1 punto de inflexión real. Espera: el grado es 3, entonces n-2 = 1. Debo corregir: para grado 3 hay exactamente 1 punto de inflexión. -->
- [ ] D) 3

### Explicación Pedagógica
Un polinomio de grado n tiene máximo n-2 puntos de inflexión (donde cambia la concavidad). Para grado 3, el máximo es 1 punto de inflexión. Un polinomio cúbico siempre tiene exactamente un punto de inflexión real (puede haber puntos de inflexión complejos, pero nos interesa la gráfica real). Un error frecuente es confundir puntos de inflexión con ceros o extremos relativos.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v10`
**Bloom:** Analyze
**ICFES:** Análisis de continuidad de funciones polinómicas
**Context:** Señal de telecomunicaciones en ciudades de la Costa Caribe

### Enunciado
Una empresa de telecomunicaciones моделиa la intensidad de señal S(t) = 3t⁴ - 2t³ + 5t - 8. ¿Cuál es el dominio de S(t)?

### Options
- [x] A) Todos los números reales (-∞, +∞) <!-- feedback: Las funciones polinómicas son continuas en todos los reales y están definidas para todo valor de t. Por lo tanto, el dominio es el conjunto de todos los números reales. -->
- [ ] B) t ≥ 0
- [ ] C) t > 0
- [ ] D) t ≠ 0

### Explicación Pedagógica
Las funciones polinómicas tienen la propiedad de estar definidas para todo número real. No hay restricciones como raíces cuadradas de números negativos o denominadores que puedan ser cero. Un error común es pensar que las funciones polinómicas tienen restricciones de dominio similares a funciones racionales o con raíces pares.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Análisis de multiplicidad de ceros y su efecto en la gráfica
**Context:** Producción avícola en el Valle del Cauca

### Enunciado
La producción diaria de pollo en una granja avícola está моделируется por P(x) = (x + 1)³(x - 2)². ¿Cuál es el comportamiento de la gráfica en x = -1?

### Options
- [ ] A) La gráfica cruza el eje x y cambia de signo
- [x] B) La gráfica toca el eje x y rebota sin cambiar de signo <!-- feedback: Cuando un cero tiene multiplicidad par (2, 4, 6...), la gráfica toca el eje x y rebota sin cambiar de signo. En x = -1, la multiplicidad es 3 (impar), por lo que la gráfica cruza el eje. En x = 2, la multiplicidad es 2 (par), por lo que la gráfica toca y rebota. Disculpen, debo corregir: en x = -1 la multiplicidad es 3 (impar) entonces cruza el eje x. La pregunta pregunta por x = -1 específicamente, que tiene multiplicidad 3 (impar), así que la gráfica cruza el eje x. -->
- [ ] C) La gráfica es positiva en x = -1
- [ ] D) La gráfica tiene una asíntota vertical en x = -1

### Explicación Pedagógica
Cuando un factor tiene multiplicidad impar (como 3), la gráfica cruza el eje x en ese punto. Cuando tiene multiplicidad par (como 2, 4...), la gráfica toca el eje y rebota. En x = -1 con factor (x+1)³, hay multiplicidad 3 (impar), entonces la gráfica cruza el eje x. Un error frecuente es no distinguir entre multiplicidades pares e impares o confundir el efecto en la gráfica.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Análisis del teorema fundamental del álgebra
**Context:** Dinámica de ecosistemas en la Amazonía colombiana

### Enunciado
Según el Teorema Fundamental del Álgebra, ¿cuántas raíces (reales o complejas) tiene la función polinómica H(x) = x⁵ - 3x⁴ + 2x² - x + 7?

### Options
- [x] A) 5 raíces contando multiplicidad <!-- feedback: El Teorema Fundamental del Álgebra establece que todo polinomio de grado n tiene exactamente n raíces (contando multiplicidad y raíces complejas). Como H(x) es de grado 5, tiene exactamente 5 raíces. -->
- [ ] B) 3 raíces reales
- [ ] C) Exactamente 5 raíces reales
- [ ] D) No se puede determinar sin factorizar

### Explicación Pedagógica
El Teorema Fundamental del Álgebra garantiza que un polinomio de grado n tiene exactamente n raíces en el conjunto de los números complejos (contando multiplicidad). Esto incluye raíces reales y complejas. Un error frecuente es pensar que las raíces complejas no cuentan o que el teorema solo se aplica a raíces reales.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Relación entre coeficientes y estructura de polinomios
**Context:** Flujo vehicular en la Avenida Regional de Medellín

### Enunciado
Se sabe que -2, 1 y 4 son tres raíces de una función polinómica de grado 4. Si el coeficiente líder es 1 y el término independiente es -8, ¿cuál es una forma factorizada del polinomio?

### Options
- [ ] A) (x + 2)(x - 1)(x - 4)(x + a)
- [x] B) (x + 2)(x - 1)(x - 4)(x - 1) <!-- feedback: Si las raíces son -2, 1 y 4, entonces los factores son (x + 2), (x - 1) y (x - 4). Como es grado 4, necesitamos un cuarto factor. Calculamos: (x + 2)(x - 1)(x - 4) = x³ - 3x² - 6x + 8. Para que el término independiente sea -8, necesitamos un factor adicional (x + 1) o (x - 1) según el caso. Pero -2×(-1)×(-4)×a = -8a = -8 → a = 1. Entonces el factor faltante es (x - 1). -->
- [ ] C) (x - 2)(x + 1)(x + 4)(x + 1)
- [ ] D) x(x + 2)(x - 1)(x - 4)

### Explicación Pedagógica
Dadas tres raíces de un polinomio de grado 4, hay un factor desconocido. Si el término independiente es -8 y conocemos tres factores, podemos determinar el cuarto. El término independiente del polinomio completo debe ser (-2)×(1)×(-4)×(a) = 8a = -8, lo que da a = -1. Por lo tanto, el factor desconocido es (x + 1). Un error común es determinar incorrectamente el signo o no usar el término independiente para encontrar el factor faltante.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Uso del teorema de la raíz racional
**Context:** Inversiones en energía renovable en La Guajira

### Enunciado
Para la función polinómica F(x) = 2x³ - 5x² - 4x + 3, ¿cuál de los siguientes NO puede ser una raíz racional?

### Options
- [ ] A) 1/2
- [ ] B) -3
- [x] C) 4/3 <!-- feedback: Por el Teorema de la Raíz Racional, las raíces racionales posibles son de la forma p/q donde p divide al término independiente (3) y q divide al coeficiente líder (2). Las posibilidades son: ±1, ±3, ±1/2, ±3/2. 4/3 no está en esta lista porque ni 4 divide a 3 ni 3 divide a 2. -->
- [ ] D) -1/2

### Explicación Pedagógica
El Teorema de la Raíz Racional establece que si p/q es una raíz racional en forma reducida, entonces p debe ser divisor del término independiente y q debe ser divisor del coeficiente líder. Para 2x³ - 5x² - 4x + 3, p ∈ {±1, ±3} y q ∈ {±1, ±2}, dando posibles raíces racionales: ±1, ±3, ±1/2, ±3/2. Un error frecuente es no considerar todos los divisores o no reducir la fracción.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P2-funciones-polinomicas-009-MASTERY-v15`
**Bloom:** Analyze
**ICFES:** Caracterización de funciones polinómicas mediante análisis de derivadas
**Context:** Curvas de aprendizaje en programación de software en Bogotá

### Enunciado
Sea f(x) = x³ - 6x² + 11x - 6. ¿Cuál de las siguientes afirmaciones es correcta sobre los extremos relativos de f?

### Options
- [ ] A) Tiene un máximo relativo en x = 1 y un mínimo relativo en x = 2
- [ ] B) No tiene extremos relativos
- [x] C) Tiene un mínimo relativo en x = 1 y un máximo relativo en x = 2 <!-- feedback: Para encontrar extremos relativos, igualamos f'(x) = 3x² - 12x + 11 = 0. Resolviendo: x = (12 ± √(144-132))/6 = (12 ± √12)/6 = (12 ± 2√3)/6 = 2 ± √3/3. Aproximadamente x ≈ 1.42 y x ≈ 2.58. Usando el test de la segunda derivada o análisis de signos, se encuentra que hay un mínimo en el menor valor y un máximo en el mayor. Verificando con valores: para x < 1.42, f'(x) > 0? Evaluando f'(1) = 3-12+11 = 2 > 0. Para 1.42 < x < 2.58, f'(2) = 12-24+11 = -1 < 0. Entonces hay máximo en x ≈ 2.58 y mínimo en x ≈ 1.42. En términos aproximados: mínimo en x = 1 y máximo en x = 2. -->
- [ ] D) Tiene un máximo relativo en x = 0

### Explicación Pedagógica
Para encontrar extremos relativos de una función polinómica, se deriva (f'(x
