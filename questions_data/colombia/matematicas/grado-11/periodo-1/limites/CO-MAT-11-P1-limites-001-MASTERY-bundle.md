---
id: "CO-MAT-11-P1-limites-001-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "limites"
periodo: 1
protocol_version: "5.1"
bundle_index: 1
bundle_size: 20
alignment: "ICFES Saber 11 + MEN"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: 0.58
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "concepto_limite, limites_laterales, indeterminaciones_basicas"
---

# Bundle Mastery: Introducción al Concepto de Límite

Este bundle introduce la noción fundamental de límite de una función, explorando el comportamiento de las funciones cerca de puntos específicos, el uso de límites laterales para determinar la existencia del límite y la resolución de las primeras indeterminaciones algebraicas.

---

## Question 1 (Difficulty D3)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comunicación y Representación

### Contexto
Un estudiante observa que a medida que el valor de $x$ se acerca a $2$ por la derecha y por la izquierda, los valores de la función $f(x)$ se acercan cada vez más a $7$.

### Enunciado
¿Cuál es la notación matemática correcta para expresar esta observación?

### Options
- [ ] A) $f(2) = 7$ <!-- feedback: Incorrecto. Esta notación indica el valor de la función en el punto, no el comportamiento de aproximación (límite). -->
- [x] B) $\lim_{x \to 2} f(x) = 7$ <!-- feedback: Correcto. La notación de límite describe a qué valor se aproxima la función cuando la variable independiente se acerca a un punto dado. -->
- [ ] C) $f(x) \to 2$ cuando $x \to 7$ <!-- feedback: Incorrecto. Los valores de x y f(x) están intercambiados en esta expresión. -->
- [ ] D) $\lim_{x \to 7} f(x) = 2$ <!-- feedback: Incorrecto. Indica que x se acerca a 7, lo cual contradice el enunciado. -->

### Explicación Pedagógica
El concepto de límite se centra en la tendencia o aproximación de los valores de una función, independientemente de si la función está definida o no en el punto exacto.

---

## Question 2 (Difficulty D3)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentación

### Contexto
Se tiene una función $f(x)$ tal que el límite por la izquierda es $\lim_{x \to 3^-} f(x) = 5$ y el límite por la derecha es $\lim_{x \to 3^+} f(x) = 8$.

### Enunciado
¿Qué se puede concluir sobre la existencia del límite general $\lim_{x \to 3} f(x)$?

### Options
- [ ] A) El límite es igual a $5$. <!-- feedback: Incorrecto. Solo coincide con uno de los lados. -->
- [ ] B) El límite es igual a $6.5$ (el promedio). <!-- feedback: Incorrecto. Los límites no se promedian para hallar el límite general. -->
- [x] C) El límite general **no existe**. <!-- feedback: Correcto. Para que un límite exista, los límites laterales por izquierda y derecha deben ser iguales. -->
- [ ] D) El límite es igual a $8$. <!-- feedback: Incorrecto. Solo coincide con el límite por la derecha. -->

### Explicación Pedagógica
La existencia del límite bilateral está condicionada a la coincidencia de los límites laterales. Si los caminos por izquierda y derecha llevan a valores distintos, hay un salto y el límite no existe.

---

## Question 3 (Difficulty D4)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Calcule el límite de la función constante $f(x) = 15$ cuando $x$ tiende a $4$.

### Enunciado
¿Cuál es el valor resultante?

### Options
- [ ] A) $4$ <!-- feedback: Incorrecto. 4 es el valor al que tiende x, no el valor de la función. -->
- [x] B) $15$ <!-- feedback: Correcto. El límite de una constante es la misma constante, sin importar a qué valor tienda x. -->
- [ ] C) $60$ <!-- feedback: Incorrecto. No se debe multiplicar la constante por el valor de tendencia. -->
- [ ] D) $0$ <!-- feedback: Incorrecto. La función mantiene su valor de 15 en todo momento. -->

### Explicación Pedagógica
Una de las propiedades básicas de los límites es que el límite de una constante es igual a la constante misma, ya que su valor no cambia ante variaciones de $x$.

---

## Question 4 (Difficulty D4)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Dada la función polinómica $f(x) = 3x^2 - 5x + 2$.

### Enunciado
Evalúe $\lim_{x \to 1} f(x)$.

### Options
- [ ] A) $3$ <!-- feedback: Incorrecto. Error en la sustitución o cálculo aritmético. -->
- [x] B) $0$ <!-- feedback: Correcto. Por sustitución directa: 3(1)^2 - 5(1) + 2 = 3 - 5 + 2 = 0. -->
- [ ] C) $10$ <!-- feedback: Incorrecto. Sumaste los términos en lugar de respetar los signos negativos. -->
- [ ] D) $2$ <!-- feedback: Incorrecto. Solo consideraste el término independiente del polinomio. -->

### Explicación Pedagógica
Para funciones continuas como los polinomios, el límite se puede hallar mediante la sustitución directa del valor de tendencia en la variable $x$.

---

## Question 5 (Difficulty D5)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v5`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

### Contexto
Un estudiante intenta calcular $\lim_{x \to 5} \frac{x-5}{x^2 - 25}$ y obtiene el resultado $0/0$.

### Enunciado
¿Qué representa matemáticamente el resultado $0/0$ en el contexto de límites?

### Options
- [ ] A) Que el límite es igual a cero. <!-- feedback: Incorrecto. 0/0 no significa que el resultado final sea 0. -->
- [ ] B) Que el límite no existe. <!-- feedback: Incorrecto. 0/0 es una indeterminación, lo que significa que aún no conocemos el valor del límite. -->
- [x] C) Es una **indeterminación** que requiere manipulación algebraica. <!-- feedback: Correcto. Indica que hay un factor común que debe ser simplificado para encontrar el valor real del límite. -->
- [ ] D) Que la función es infinita en ese punto. <!-- feedback: Incorrecto. Un valor dividido por cero (k/0) sugeriría infinito, pero 0/0 es distinto. -->

### Explicación Pedagógica
Las indeterminaciones son situaciones donde la evaluación directa no proporciona información suficiente. Requieren técnicas como factorización o racionalización para ser resueltas.

---

## Question 6 (Difficulty D5)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Resuelva el límite indeterminado: $\lim_{x \to 3} \frac{x^2 - 9}{x - 3}$.

### Enunciado
¿Cuál es el valor del límite?

### Options
- [ ] A) $3$ <!-- feedback: Incorrecto. Olvidaste evaluar el valor de tendencia en la expresión simplificada. -->
- [x] B) $6$ <!-- feedback: Correcto. Factorizando el numerador: (x-3)(x+3)/(x-3) = x+3. Evaluando en 3: 3 + 3 = 6. -->
- [ ] C) $0$ <!-- feedback: Incorrecto. Este fue el resultado de la sustitución inicial sin simplificar. -->
- [ ] D) Indefinido. <!-- feedback: Incorrecto. Aunque la función no existe en x=3, el límite sí existe y es un valor real. -->

### Explicación Pedagógica
La técnica de factorización permite eliminar el factor que causa el cero en el denominador, revelando el valor al que se aproxima la función.

---

## Question 7 (Difficulty D5)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Calcule el límite $\lim_{x \to -2} \frac{2x + 4}{x + 2}$.

### Enunciado
¿Cuál es el resultado?

### Options
- [ ] A) $0$ <!-- feedback: Incorrecto. Este es el resultado del numerador solamente. -->
- [x] B) $2$ <!-- feedback: Correcto. Factorizando el 2 en el numerador: 2(x+2)/(x+2) = 2. El límite de una constante 2 es 2. -->
- [ ] C) $-2$ <!-- feedback: Incorrecto. Error de signo en la factorización. -->
- [ ] D) $Infinity$ <!-- feedback: Incorrecto. El denominador y el numerador se anulan simultáneamente con el mismo factor. -->

### Explicación Pedagógica
Identificar factores comunes constantes en el numerador permite simplificar expresiones racionales y resolver indeterminaciones básicas de forma rápida.

---

## Question 8 (Difficulty D6)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación

### Contexto
Observe la gráfica de una función que tiene un hueco en el punto $(4, 10)$ y un punto sólido (definido) en $(4, 15)$.

### Enunciado
¿Cuál es el valor de $\lim_{x \to 4} f(x)$ según la gráfica?

### Options
- [ ] A) $15$ <!-- feedback: Incorrecto. Este es el valor de f(4), pero el límite depende de la aproximación de la curva (hueco). -->
- [x] B) $10$ <!-- feedback: Correcto. El límite es el valor al que tiende la gráfica por ambos lados, que en este caso es la altura del hueco. -->
- [ ] C) No existe. <!-- feedback: Incorrecto. Si la curva llega a la misma altura por ambos lados, el límite existe aunque la función sea discontinua. -->
- [ ] D) $25$ <!-- feedback: Incorrecto. No se deben sumar los valores del hueco y del punto definido. -->

### Explicación Pedagógica
Visualmente, el límite es el "destino" al que apuntan los trazos de la gráfica. No importa si el destino está vacío o si hay un punto saltado en otra ubicación.

---

## Question 9 (Difficulty D6)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Dadas las funciones con límites conocidos: $\lim_{x \to a} f(x) = 4$ y $\lim_{x \to a} g(x) = -3$.

### Enunciado
Calcule $\lim_{x \to a} [2f(x) - g(x)]$.

### Options
- [ ] A) $5$ <!-- feedback: Incorrecto. Error en la aplicación de los signos. -->
- [x] B) $11$ <!-- feedback: Correcto. Por propiedades de los límites: 2(4) - (-3) = 8 + 3 = 11. -->
- [ ] C) $1$ <!-- feedback: Incorrecto. Restaste 3 de 4 sin multiplicar por el coeficiente ni considerar el doble negativo. -->
- [ ] D) $-2$ <!-- feedback: Incorrecto. Error de cálculo aritmético básico. -->

### Explicación Pedagógica
Las propiedades operacionales de los límites (suma, resta, producto por escalar) permiten hallar el límite de expresiones combinadas de forma modular.

---

## Question 10 (Difficulty D6)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentación

### Contexto
Se define la función valor absoluto como $f(x) = \frac{|x|}{x}$.

### Enunciado
¿Cuál es el valor de $\lim_{x \to 0^+} f(x)$?

### Options
- [ ] A) $-1$ <!-- feedback: Incorrecto. Este sería el límite por la izquierda (0-). -->
- [x] B) $1$ <!-- feedback: Correcto. Para x > 0, |x| = x, por lo que f(x) = x/x = 1. El límite de la constante 1 es 1. -->
- [ ] C) $0$ <!-- feedback: Incorrecto. f(x) nunca se acerca a cero, siempre vale 1 o -1. -->
- [ ] D) No existe. <!-- feedback: Incorrecto. El límite POR LA DERECHA sí existe; es el límite general el que no existiría. -->

### Explicación Pedagógica
El análisis de límites laterales es esencial en funciones con saltos o cambios bruscos de definición, como las que involucran valores absolutos o funciones por partes.

---

## Question 11 (Difficulty D7)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v11`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Calcule el límite indeterminado $\lim_{x \to 2} \frac{x^2 - 4}{x^2 - 2x}$.

### Enunciado
¿Cuál es el valor resultante tras simplificar?

### Options
- [ ] A) $1$ <!-- feedback: Incorrecto. Error en la simplificación de los factores. -->
- [x] B) $2$ <!-- feedback: Correcto. Numerador: (x-2)(x+2). Denominador: x(x-2). Simplificando: (x+2)/x. Evaluando en 2: (2+2)/2 = 4/2 = 2. -->
- [ ] C) $0$ <!-- feedback: Incorrecto. Resultado de la sustitución sin simplificar. -->
- [ ] D) $Infinity$ <!-- feedback: Incorrecto. Tras cancelar el factor x-2, el denominador ya no tiende a cero. -->

### Explicación Pedagógica
A veces tanto el numerador como el denominador requieren factorización (por diferencia de cuadrados y por factor común respectivamente) para resolver la indeterminación.

---

## Question 12 (Difficulty D7)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

### Contexto
Un ingeniero en Bogotá estudia una señal eléctrica cuya intensidad $I$ depende del tiempo $t$ según la función $I(t) = \frac{\sqrt{t+1} - 1}{t}$.

### Enunciado
¿A qué valor tiende la intensidad cuando el tiempo se acerca a cero segundos ($t \to 0$)?

### Options
- [ ] A) $0$ <!-- feedback: Incorrecto. Sustitución directa da 0/0. -->
- [ ] B) $1$ <!-- feedback: Incorrecto. Requiere racionalización para encontrar el valor correcto. -->
- [x] C) $1/2$ <!-- feedback: Correcto. Multiplicando por el conjugado (sqrt(t+1)+1), obtenemos t / [t(sqrt(t+1)+1)] = 1 / (sqrt(t+1)+1). Evaluando en 0: 1/(1+1) = 1/2. -->
- [ ] D) $2$ <!-- feedback: Incorrecto. Invertiste el resultado final del límite. -->

### Explicación Pedagógica
La racionalización (multiplicar por el conjugado) es la técnica estándar para resolver indeterminaciones $0/0$ que involucran raíces cuadradas.

---

## Question 13 (Difficulty D7)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v13`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentación

### Contexto
Considere la función $f(x) = \frac{1}{x^2}$.

### Enunciado
¿Cuál es el comportamiento de $\lim_{x \to 0} f(x)$?

### Options
- [ ] A) El límite es $0$. <!-- feedback: Incorrecto. Al acercarse a cero, los valores de 1/x^2 crecen enormemente. -->
- [x] B) El límite tiende a $+\infty$. <!-- feedback: Correcto. Como el denominador es x al cuadrado, siempre es positivo y muy pequeño, haciendo que la fracción crezca sin límite por ambos lados. -->
- [ ] C) No existe porque los límites laterales son diferentes. <!-- feedback: Incorrecto. En este caso ambos lados van a +infinito, por lo que el límite infinito es consistente. -->
- [ ] D) El límite es $1$. <!-- feedback: Incorrecto. f(0) es indefinido y no tiende a 1. -->

### Explicación Pedagógica
Los límites infinitos describen asíntotas verticales donde la función crece o decrece sin límite a medida que se acerca a un punto.

---

## Question 14 (Difficulty D8)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v14`
**Bloom:** Evaluate
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Un estudiante afirma que si $f(a)$ está definida, entonces $\lim_{x \to a} f(x)$ siempre debe ser igual a $f(a)$.

### Enunciado
¿Cuál de las siguientes funciones sirve como contraejemplo para demostrar que el estudiante está equivocado?

### Options
- [ ] A) $f(x) = x + 1$ <!-- feedback: Incorrecto. Esta función es continua, por lo que el límite sí es igual al valor de la función. -->
- [x] B) Una función con un punto desplazado (discontinuidad evitable). <!-- feedback: Correcto. Si f(2)=10 pero la curva llega a la altura 5 por ambos lados, el límite es 5 y la función es 10. No coinciden. -->
- [ ] C) $f(x) = 1/x$ <!-- feedback: Incorrecto. Aquí f(0) ni siquiera está definido, por lo que no cumple la premisa inicial del estudiante. -->
- [ ] D) $f(x) = x^2$ <!-- feedback: Incorrecto. Es una función continua donde el límite y el valor coinciden siempre. -->

### Explicación Pedagógica
La igualdad entre el límite y el valor de la función es la definición de **continuidad**. Existen funciones donde el límite existe pero no coincide con el valor puntual definido.

---

## Question 15 (Difficulty D8)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v15`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Calcule el límite $\lim_{x \to 1} \frac{x^3 - 1}{x - 1}$.

### Enunciado
¿Cuál es el valor del límite?

### Options
- [ ] A) $1$ <!-- feedback: Incorrecto. Error al simplificar la diferencia de cubos. -->
- [ ] B) $2$ <!-- feedback: Incorrecto. Sustitución errónea tras la simplificación. -->
- [x] C) $3$ <!-- feedback: Correcto. (x-1)(x^2 + x + 1) / (x-1) = x^2 + x + 1. Evaluando en 1: 1^2 + 1 + 1 = 3. -->
- [ ] D) $0$ <!-- feedback: Incorrecto. Resultado de la sustitución inicial sin factorizar. -->

### Explicación Pedagógica
La resolución de límites a menudo requiere el uso de productos notables más complejos, como la diferencia de cubos: $a^3 - b^3 = (a-b)(a^2 + ab + b^2)$.

---

## Question 16 (Difficulty D8)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación

### Contexto
En un proceso de enfriamiento en una industria en Cali, la temperatura $T$ sigue la función $T(t) = \frac{80t + 200}{2t + 5}$.

### Enunciado
¿Cuál es la temperatura límite a la que se estabilizará el proceso después de mucho tiempo ($t \to \infty$)?

### Options
- [ ] A) $80$ grados. <!-- feedback: Incorrecto. Solo consideraste el coeficiente del numerador. -->
- [x] B) $40$ grados. <!-- feedback: Correcto. El límite al infinito de una función racional con grados iguales es el cociente de los coeficientes principales: 80/2 = 40. -->
- [ ] C) $200$ grados. <!-- feedback: Incorrecto. Este es un valor inicial, no el comportamiento a largo plazo. -->
- [ ] D) $0$ grados. <!-- feedback: Incorrecto. La función se estabiliza en una asíntota horizontal positiva. -->

### Explicación Pedagógica
Los límites al infinito en modelos de procesos industriales permiten identificar los estados de equilibrio térmico o mecánico del sistema.

---

## Question 17 (Difficulty D9)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Determine la existencia del límite $\lim_{x \to 0} \frac{\sin(x)}{x}$. (Asuma que los ángulos están en radianes).

### Enunciado
¿Cuál es el valor de este límite fundamental?

### Options
- [ ] A) $0$ <!-- feedback: Incorrecto. Aunque sin(0)=0, la razón entre el seno y el ángulo cuando este es muy pequeño tiende a la unidad. -->
- [x] B) $1$ <!-- feedback: Correcto. Es un límite trigonométrico fundamental que demuestra que para ángulos pequeños, el seno de x es aproximadamente igual a x. -->
- [ ] C) No existe. <!-- feedback: Incorrecto. El límite está bien definido y es la base de muchas derivadas trigonométricas. -->
- [ ] D) $\pi$ <!-- feedback: Incorrecto. No hay relación directa con el valor de pi en este límite específico. -->

### Explicación Pedagógica
El límite $\lim_{x \to 0} \frac{\sin(x)}{x} = 1$ es una piedra angular del cálculo, fundamental para derivar las funciones trigonométricas y entender el comportamiento local de las ondas.

---

## Question 18 (Difficulty D9)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v18`
**Bloom:** Create
**ICFES:** Formulación y Ejecución

### Contexto
Halla el valor de los límites laterales para $f(x) = \frac{x-4}{|x-4|}$ cuando $x$ tiende a $4$.

### Enunciado
¿Cuáles son los valores de $L^-$ (izquierda) y $L^+$ (derecha)?

### Options
- [ ] A) $L^- = 1, L^+ = 1$ <!-- feedback: Incorrecto. Los límites laterales no coinciden en esta función. -->
- [x] B) $L^- = -1, L^+ = 1$ <!-- feedback: Correcto. Para x < 4, el numerador es negativo y el denominador positivo, dando -1. Para x > 4, ambos son positivos, dando 1. -->
- [ ] C) $L^- = 0, L^+ = 0$ <!-- feedback: Incorrecto. La función nunca se acerca a cero. -->
- [ ] D) $L^- = -4, L^+ = 4$ <!-- feedback: Incorrecto. Los valores están normalizados por la división del mismo valor absoluto. -->

### Explicación Pedagógica
Las funciones que implican la razón entre una expresión lineal y su valor absoluto generan saltos finitos. Estas funciones se usan para modelar cambios de estado binarios en sistemas de control.

---

## Question 19 (Difficulty D10)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v19`
**Bloom:** Create
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Un matemático diseña una función $f(x)$ tal que $\lim_{x \to \infty} [f(x) - (2x + 3)] = 0$.

### Enunciado
¿Qué se puede afirmar sobre el comportamiento gráfico de $f(x)$ para valores muy grandes de $x$?

### Options
- [ ] A) Tiene una asíntota horizontal en $y = 2$. <!-- feedback: Incorrecto. La función no se estabiliza en un valor constante. -->
- [x] B) Tiene una **asíntota oblicua** con ecuación $y = 2x + 3$. <!-- feedback: Correcto. Si la diferencia entre la función y una recta tiende a cero, la recta es la asíntota oblicua de la función. -->
- [ ] C) Tiene una asíntota vertical en $x = -3/2$. <!-- feedback: Incorrecto. No hay evidencia de saltos infinitos en puntos específicos. -->
- [ ] D) La función crece más rápido que cualquier recta. <!-- feedback: Incorrecto. La función crece exactamente a la misma tasa que la recta 2x + 3. -->

### Explicación Pedagógica
Las asíntotas oblicuas ocurren en funciones racionales donde el grado del numerador es exactamente uno mayor que el del denominador, indicando una tendencia lineal a largo plazo.

---

## Question 20 (Difficulty D10)

**ID:** `CO-MAT-11-P1-limites-001-MASTERY-v20`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Dada la función $f(x) = x \sin(1/x)$.

### Enunciado
¿Cuál es el valor de $\lim_{x \to 0} f(x)$ utilizando el Teorema del Sándwich (o de estricción)?

### Options
- [ ] A) No existe debido a la oscilación infinita de $\sin(1/x)$. <!-- feedback: Incorrecto. Aunque el seno oscila, está multiplicado por x, que tiende a cero. -->
- [x] B) $0$ <!-- feedback: Correcto. Como -1 <= sin(1/x) <= 1, entonces -|x| <= x*sin(1/x) <= |x|. Como los extremos tienden a 0, la función del medio también. -->
- [ ] C) $1$ <!-- feedback: Incorrecto. Confundes este límite con el de sin(x)/x. -->
- [ ] D) $Infinity$ <!-- feedback: Incorrecto. El factor x "aplasta" la oscilación del seno hacia el origen. -->

### Explicación Pedagógica
El Teorema del Sándwich es una herramienta poderosa para hallar límites de funciones que oscilan pero están atrapadas entre dos funciones que convergen al mismo punto.
