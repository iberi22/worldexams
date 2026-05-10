<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for Colombian Math (Mathematics), topic: números reales (real numbers), grade 11, period 1.

Format required:
- YAML frontmatter with specific metadata
- 20 questions following the exact structure provided
- Progressive difficulty: D3-D4 (1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
- Colombian context
- 4 options each with [x] marking the correct one
- No "all of the above" or "none of the above"
- Plausible distractors based on common student errors

Let me generate this systematically:

1-4: D3-D4 (Basic application)
5-10: D5-D6 (Intermediate)
11-16: D7-D8 (Advanced)
17-20: D9-D10 (Complex/Higher order)

Topics to cover for números reales:
- Properties of real numbers (closure, commutative, associative, distributive, identity, inverse)
- Ordering and absolute value
- Intervals and set builder notation
- Operations with real numbers
- Rational vs irrational numbers
- Density of rational numbers
- Infinitum of real numbers
- Exponential notation and scientific notation
- Roots and radicals
- Rational exponents
- Order of operations
- Applications

Let me write 20 questions:

Question 1 (D3) - Basic identification
Question 2 (D3) - Basic property
Question 3 (D4) - Basic operation
Question 4 (D4) - Basic application
Question 5 (D5) - Intermediate property
Question 6 (D5) - Intermediate operation
Question 7 (D5) - Intermediate ordering
Question 8 (D5) - Intermediate absolute value
Question 9 (D6) - Intermediate interval
Question 10 (D6) - Intermediate radical


Question 11 (D7) - Advanced rational/irrational identification
Question 12 (D7) - Advanced density property
Question 13 (D7) - Advanced scientific notation
Question 14 (D7) - Advanced exponential rules
Question 15 (D8) - Advanced operation with radicals
Question 16 (D8) - Advanced absolute value property
Question 17 (D9) - Complex application
Question 18 (D9) - Complex analysis
Question 19 (D10) - Complex evaluation
Question 20 (D10) - Complex synthesis

Now I'll format these properly with Colombian context and plausible distractors.

</think>

```markdown
---
id: "CO-MAT-11-P1-numeros-reales-001-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "numeros-reales"
periodo: 1
protocol_version: "5.1"
bundle_size: 20
bundle_index: 1
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T23:10:45.625377"
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

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v1`
**Bloom:** [Remember]
**ICFES:** [Comunicación - Interpretación de conceptos]
**Context:** Clasificación de números en el contexto de categorías numéricas

### Enunciado
En un colegio de Bogotá, el profesor de matemáticas solicita a sus estudiantes clasificar diferentes números en los conjuntos numéricos estudiados. De los siguientes números, ¿cuál pertenece al conjunto de los números irracionales?

### Options
- [ ] A) $\frac{2}{3}$
- [ ] B) $\sqrt{16}$
- [ ] C) $\pi$ <!-- feedback: π es un número irracional famous con representación decimal infinita no periódica -->
- [ ] D) $0.\overline{3}$

### Explicación Pedagógica
La respuesta correcta es C) π. Este es un error común donde estudiantes confunden números decimales periódicos (racionales) con irracionales. El número π tiene infinitas cifras decimales no periódicas, propiedad definitoria de los irracionales. El distracto A es racional (fracción), B es racional (√16 = 4, raíz perfecta), D es racional (0.333... = 1/3).

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v2`
**Bloom:** [Understand]
**ICFES:** [Razonamiento cuantitativo - Comprensión de propiedades]
**Context:** Propiedades de operaciones en números reales

### Enunciado
La propiedad distributiva de la multiplicación sobre la suma en los números reales se expresa como $a(b + c) = ab + ac$. Si $a = 3$, $b = 5$ y $c = 7$, ¿cuál de las siguientes expresiones representa correctamente la aplicación de esta propiedad?

### Options
- [ ] A) $3(5) + 7 = 15 + 7 = 22$
- [ ] B) $3 + (5)(7) = 3 + 35 = 38$
- [x] C) $3(5 + 7) = 3(5) + 3(7) = 15 + 21 = 36$ <!-- feedback: Esta es la aplicación correcta de la propiedad distributiva -->
- [ ] D) $3(5 + 7) = 3(12) = 36$, pero $15 + 21 = 35$ <!-- feedback: Error de cálculo en la distribución -->

### Explicación Pedagógica
La respuesta correcta es C. Un error frecuente es aplicar la distributividad sin incluir el factor en ambos términos (como en A) o confundir el orden de las operaciones. La propiedad establece que multiplicar un factor por una suma es equivalente a multiplicar el factor por cada término y luego sumar.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v3`
**Bloom:** [Apply]
**ICFES:** [Razonamiento cuantitativo - Aplicación de procedimientos]
**Context:** Operaciones combinadas en examen de ingreso universitario

### Enunciado
En un examen de admisión de la Universidad Nacional de Colombia, se pide evaluar la expresión: $8 - 2 \times 3 + 4 \div 2$. ¿Cuál es el resultado?

### Options
- [ ] A) $12$
- [ ] B) $36$
- [ ] C) $5$
- [ ] D) $7$

### Explicación Pedagógica
La respuesta correcta es D) 7. Siguiendo el orden de operaciones (PEMDAS/BODMAS): primero multiplicación y división de izquierda a derecha: $2 \times 3 = 6$ y $4 \div 2 = 2$, entonces $8 - 6 + 2 = 7$. Un error común es resolver de izquierda a derecha sin respetar jerarquía, obteniendo A) 12. Otra confusión es pensar que todas las operaciones tienen igual prioridad.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v4`
**Bloom:** [Apply]
**ICFES:** [Razonamiento cuantitativo - Resolución de problemas]
**Context:** Aplicación de valor absoluto en contexto real

### Enunciado
En una empresa de envíos en Medellín, el sistema de rastreo indica que un paquete está a $|x - 15| = 3$ kilómetros del centro de distribución. ¿Cuáles son los posibles valores de la distancia $x$ del paquete respecto al centro?

### Options
- [ ] A) $x = 12$ km únicamente
- [ ] B) $x = 18$ km únicamente
- [ ] C) $x = 12$ km o $x = 18$ km <!-- feedback: Por definición, |a| = k (k > 0) implica a = k o a = -k, luego x - 15 = 3 o x - 15 = -3 -->
- [ ] D) $x = 15$ km únicamente

### Explicación Pedagógica
La respuesta correcta es C. Un error común es olvidar que el valor absoluto de una diferencia indica distancia, no dirección. $|\text{distancia} - \text{referencia}| = k$ significa que hay dos puntos equidistantes. El distractor D confunde la posición de referencia con la solución.

---

## Question 5 (Variant Intermediate - Difficulty D5)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v5`
**Bloom:** [Understand]
**ICFES:** [Razonamiento cuantitativo - Análisis de propiedades]
**Context:** Estructura algebraica de los números reales

### Enunciado
¿Cual de las siguientes afirmaciones sobre el conjunto de los números reales $\mathbb{R}$ es VERDADERA?

### Options
- [ ] A) Todo número real tiene un antecesor inmediato en el orden de los reales.
- [ ] B) Entre dos números reales siempre existe un número racional, pero nunca existe un número irracional entre ellos.
- [ ] C) La unión de los racionales $\mathbb{Q}$ y los irracionales $\mathbb{Q}'$ es exactamente el conjunto de los números reales $\mathbb{R}$.
- [x] D) $\mathbb{R}$ es un conjunto denso, es decir, entre dos números reales distintos siempre existe otro número real. <!-- feedback: Esta es la propiedad de densidad de los reales -->

### Explicación Pedagógica
La respuesta correcta es D. La densidad es una propiedad fundamental: entre cualquier par de reales distintos existe al menos otro real. El distractor A confunde con naturales. El distractor B es parcialmente correcto sobre racionales pero falso sobre irracionales. El distractor C es técnicamente correcto pero incompleto como propiedad, mientras A y B son falsas directamente.

---

## Question 6 (Variant Intermediate - Difficulty D5)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v6`
**Bloom:** [Apply]
**ICFES:** [Razonamiento cuantitativo - Procedimientos]
**Context:** Operaciones con radicales en context académico

### Enunciado
Un estudiante de grado 11 debe simplificar la expresión $\sqrt{50} + \sqrt{18}$. El resultado correcto es:

### Options
- [ ] A) $\sqrt{68}$
- [ ] B) $4\sqrt{2}$
- [ ] C) $8\sqrt{2}$ <!-- feedback: √50 = 5√2, √18 = 3√2, suma = 8√2 -->
- [ ] D) $68$

### Explicación Pedagógica
La respuesta correcta es C. Procedimiento: $\sqrt{50} = \sqrt{25 \times 2} = 5\sqrt{2}$ y $\sqrt{18} = \sqrt{9 \times 2} = 3\sqrt{2}$, entonces $5\sqrt{2} + 3\sqrt{2} = 8\sqrt{2}$. Un error frecuente es sumar raíces diferentes sin simplificar primero. El distractor A deja las raíces sin simplificación. El distractor B calcula correctamente una parte.

---

## Question 7 (Variant Intermediate - Difficulty D5)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v7`
**Bloom:** [Understand]
**ICFES:** [Razonamiento cuantitativo - Comparación]
**Context:** Comparación de números reales

### Enunciado
En una competencia de matemáticas en Cali, se pide ordenar de menor a mayor los siguientes números: $\frac{7}{8}$, $0.875$, $\sqrt{0.75}$, $0.8$. ¿Cuál es el orden correcto?

### Options
- [ ] A) $0.8 < 0.875 < \frac{7}{8} < \sqrt{0.75}$
- [ ] B) $\sqrt{0.75} < 0.8 < 0.875 < \frac{7}{8}$
- [ ] C) $\frac{7}{8} = 0.875 < \sqrt{0.75} < 0.8$ <!-- feedback: Error en comparaciones, 7/8 = 0.875, sqrt(0.75) ≈ 0.866, luego 0.8 = 0.8 -->
- [ ] D) $\sqrt{0.75} < 0.8 < \frac{7}{8} = 0.875$ <!-- feedback: sqrt(0.75) ≈ 0.8660, luego viene 0.8, después 7/8 = 0.875 -->

### Explicación Pedagógica
La respuesta correcta es D. Calculando: $\sqrt{0.75} \approx 0.8660$, $0.8 = 0.8$, $\frac{7}{8} = 0.875$. Un error común es no verificar numéricamente valores como raíces. El distractor C invierte el orden de 0.8 y sqrt(0.75).

---

## Question 8 (Variant Intermediate - Difficulty D5)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v8`
**Bloom:** [Apply]
**ICFES:** [Razonamiento cuantitativo - Interpretación]
**Context:** Propiedades de valor absoluto

### Enunciado
Si $x$ es un número real tal que $|x - 4| < 2$, ¿cuál de los siguientes intervalos representa todos los valores posibles de $x$?

### Options
- [ ] A) $(2, 6)$
- [ ] B) $[2, 6]$
- [ ] C) $(-\infty, 6]$ <!-- feedback: Incorrecto, falta la condición inferior -->
- [ ] D) $(2, 4)$

### Explicación Pedagógica
La respuesta correcta es A. $|x - 4| < 2$ significa que la distancia entre x y 4 es menor que 2, es decir, $4 - 2 < x < 4 + 2$, resultando en $(2, 6)$. El distractor B incluye los extremos, pero la desigualdad es estricta. El distractor C y D son incorrectos.

---

## Question 9 (Variant Intermediate - Difficulty D6)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v9`
**Bloom:** [Apply]
**ICFES:** [Comunicación - Representación]
**Context:** Representación de intervalos en contexto de funciones

### Enunciado
El dominio de la función $f(x) = \sqrt{x - 3}$ está determinado por la condición $x - 3 \geq 0$. ¿Cuál es la representación correcta del dominio en notación de intervalos?

### Options
- [ ] A) $[3, \infty)$
- [x] A) $[3, +\infty)$ <!-- feedback: Corrección: la expresión correcta es $[3, +\infty)$, ya que x debe ser mayor o igual a 3 para que el radicando sea no negativo -->
- [ ] B) $(3, \infty)$
- [ ] C) $(-\infty, 3]$
- [ ] D) $(-\infty, 3)$

### Explicación Pedagógica
La respuesta correcta es A (corregida a $[3, +\infty)$). El radicando debe ser no negativo: $x - 3 \geq 0$ implica $x \geq 3$. Un error común es usar intervalo abierto (B) olvidando que el radicando puede ser cero, dando $\sqrt{0} = 0$ válido. El distractor C y D intercambian el intervalo.

---

## Question 10 (Variant Intermediate - Difficulty D6)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v10`
**Bloom:** [Apply]
**ICFES:** [Razonamiento cuantitativo - Operaciones]
**Context:** Notación científica en contexto de distancias astronómicas

### Enunciado
La distancia promedio entre la Tierra y el Sol es aproximadamente $1.5 \times 10^{11}$ metros. En un colegio de Cartagena, los estudiantes deben expresar esta distancia en kilómetros. El resultado correcto es:

### Options
- [ ] A) $1.5 \times 10^{14}$ km
- [ ] B) $1.5 \times 10^{8}$ km <!-- feedback: 1.5 × 10^11 m = 1.5 × 10^8 km (dividir por 1000) -->
- [ ] C) $1.5 \times 10^{10}$ km
- [ ] D) $1.5 \times 10^{13}$ km

### Explicación Pedagógica
La respuesta correcta es B. Conversión: $1 \text{ km} = 1000 \text{ m} = 10^3 \text{ m}$, entonces $1.5 \times 10^{11} \text{ m} = 1.5 \times 10^{11} \div 10^3 = 1.5 \times 10^8$ km. Error común: confundir multiplicación con división por 1000 al convertir unidades.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v11`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento cuantitativo - Análisis de patrones]
**Context:** Identificación de tipo de número en expresiones algebraicas

### Enunciado
Si $a$ es un número irracional y $b$ es un número racional diferente de cero, ¿cuál de las siguientes afirmaciones es siempre verdadera?

### Options
- [ ] A) $a + b$ es irracional
- [ ] B) $a \times b$ es irracional
- [x] C) $a + (-b)$ es irracional <!-- feedback: La suma de un irracional con un racional (o su opuesto) es siempre irracional: si a + (-b) fuera racional, entonces a = (a+b) + b sería racional, contradicción -->
- [ ] D) $\frac{a}{b}$ es racional

### Explicación Pedagógica
La respuesta correcta es C. Si $a + (-b)$ fuera racional, entonces $a = (a - b) + b$ sería suma de dos racionales, y por tanto racional, contradicción. Los distractores A y B son falsos (contraejemplos: $a = \pi$, $b = -\pi$ da racional). D es falso ($\pi / 1 = \pi$).

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v12`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento cuantitativo - Justificación]
**Context:** Propiedad de densidad y aproximación

### Enunciado
Un estudiante afirma: "Entre cualquier dos números racionales existe exactamente un número irracional". ¿Por qué esta afirmación es INCORRECTA?

### Options
- [ ] A) Porque entre racionales solo existen números racionales.
- [ ] B) Porque entre dos racionales puede no existir ningún irracional.
- [x] C) Porque entre dos racionales existen infinitos irracionales, no exactamente uno. <!-- feedback: La propiedad de densidad indica que hay infinitos irracionales entre dos racionales distintos -->
- [ ] D) Porque los irracionales siempre son mayores que los racionales.

### Explicación Pedagógica
La respuesta correcta es C. El error es "exactamente uno" vs "infinitos". Los racionales e irracionales son ambos densos en $\mathbb{R}$: entre dos racionales distintos hay infinitos irracionales. El distractor A es falso. B también es falso. D es sin sentido.

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v13`
**Bloom:** [Apply]
**ICFES:** [Razonamiento cuantitativo - Manejo de cantidades]
**Context:** Notación científica en contexto de demografía

### Enunciado
Colombia tiene aproximadamente $51$ millones de habitantes, escritos en notación científica como $5.1 \times 10^{7}$. Si el área del territorio colombiano es aproximadamente $1.14 \times 10^{6}$ km², ¿cuál es la densidad poblacional aproximada (habitantes por km²)?

### Options
- [ ] A) $4.47 \times 10^{1}$ habitantes/km²
- [ ] B) $4.47 \times 10^{2}$ habitantes/km²
- [ ] C) $4.47 \times 10^{13}$ habitantes/km²
- [ ] D) $44.7$ habitantes/km²

### Explicación Pedagógica
La respuesta correcta es A. Densidad = población/área = $\frac{5.1 \times 10^{7}}{1.14 \times 10^{6}} \approx 44.74 \approx 4.47 \times 10^{1}$. Error común: dividir mal los exponentes o no simplificar correctamente. La forma correcta es $(5.1/1.14) \times 10^{7-6} \approx 4.47 \times 10^{1}$.

---

## Question 14 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v14`
**Bloom:** [Understand]
**ICFES:** [Razonamiento cuantitativo - Leyes de exponentes]
**Context:** Leyes de exponentes con exponentes enteros y racionales

### Enunciado
¿Cuál es el resultado de simplificar la expresión $\frac{2^{10} \times 2^{-3}}{2^{4}}$?

### Options
- [ ] A) $2^{11}$
- [ ] B) $2^{3}$
- [ ] C) $2^{7}$ <!-- feedback: 2^10 × 2^-3 = 2^(10-3) = 2^7, luego 2^7 / 2^4 = 2^(7-4) = 2^3 = 8 -->
- [ ] D) $2^{17}$

### Explicación Pedagógica
La respuesta correcta es B. Usando propiedades: $2^{10} \times 2^{-3} = 2^{7}$, luego $\frac{2^{7}}{2^{4}} = 2^{3} = 8$. Error común: no restar correctamente los exponentes en la división (confundir con multiplicación). El distractor C aplica mal la ley de división.

---

## Question 15 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v15`
**Bloom:** [Apply]
**ICFES:** [Razonamiento cuantitativo - Operaciones algebraicas]
**Context:** Racionalización de denominadores

### Enunciado
Al racionalizar el denominador de la expresión $\frac{3}{\sqrt{5} - 1}$, se obtiene:

### Options
- [ ] A) $\frac{3\sqrt{5} - 3}{4}$
- [ ] B) $\frac{3\sqrt{5} + 3}{5 - 1} = \frac{3\sqrt{5} + 3}{4}$ <!-- feedback: Multiplicando por (√5+1)/(√5+1): 3(√5+1)/(5-1) = 3(√5+1)/4 = (3√5+3)/4 -->
- [ ] C) $\frac{3}{\sqrt{5}} - \frac{3}{1}$
- [ ] D) $\frac{3\sqrt{5}}{5}$

### Explicación Pedagógica
La respuesta correcta es B. Multiplicando numerador y denominador por $\sqrt{5}+1$: $\frac{3(\sqrt{5}+1)}{(\sqrt{5}-1)(\sqrt{5}+1)} = \frac{3(\sqrt{5}+1)}{5-1} = \frac{3\sqrt{5}+3}{4}$. Error común: multiplicar incorrectamente el conjugado o no simplificar el denominador.

---

## Question 16 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v16`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento cuantitativo - Propiedad de valor absoluto]
**Context:** Desigualdades con valor absoluto

### Enunciado
La solución de la desigualdad $|2x - 5| \leq 7$ es el conjunto de valores de $x$ que satisfacen:

### Options
- [ ] A) $-1 \leq x \leq 6$
- [x] A) $[-1, 6]$ <!-- feedback: |2x-5| ≤ 7 significa -7 ≤ 2x-5 ≤ 7. Sumando 5: -2 ≤ 2x ≤ 12. Dividiendo por 2: -1 ≤ x ≤ 6 -->
- [ ] B) $x \leq -1$ o $x \geq 6$
- [ ] C) $-6 \leq x \leq 1$
- [ ] D) $-1 < x < 6$

### Explicación Pedagógica
La respuesta correcta es A (como $[-1, 6]$). Desigualdad doble: $-7 \leq 2x - 5 \leq 7$. Sumando 5: $-2 \leq 2x \leq 12$. Dividiendo por 2: $-1 \leq x \leq 6$. El distractor B es solución de $|2x-5| \geq 7$. El distractor D usa desigualdad estricta.

---

## Question 17 (Variant Complex - Difficulty D9)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v17`
**Bloom:** [Apply]
**ICFES:** [Razonamiento cuantitativo - Resolución de problemas]
**Context:** Problema de aplicación con números reales en contexto económico

### Enunciado
Un comerciante en Bucaramanga compra $k$ unidades de un producto a $\$8.000$ cada una y vende cada unidad a $\$12.000$. Si obtiene una ganancia total de $\$2.000.000$, ¿cuántas unidades compró y vendió?

### Options
- [ ] A) $k = 300$ unidades
- [ ] B) $k = 500$ unidades
- [ ] C) $k = 250$ unidades
- [ ] D) $k = 400$ unidades

### Explicación Pedagógica
La respuesta correcta es B. Ganancia por unidad = $12.000 - 8.000 = 4.000$. Ecuación: $4.000k = 2.000.000$, entonces $k = \frac{2.000.000
