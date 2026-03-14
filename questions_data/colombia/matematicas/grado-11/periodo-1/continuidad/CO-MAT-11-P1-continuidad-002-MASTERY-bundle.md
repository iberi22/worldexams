---
id: "CO-MAT-11-P1-continuidad-002-MASTERY"
protocol_version: "5.0"
alignment: "ICFES Saber 11 / Marcos Técnicos"
periodo: 1
bundle_index: 2
modern_context: true
calibration:
  expected_success_rate: 0.57
  discrimination_index_target: ">= 0.2"
  simulated_responses: 100
rubric_baseline: "analisis_de_continuidad, teoremas_de_existencia, funciones_a_trozos"
---

# Bundle Mastery: Continuidad y Teoremas de Existencia

Este bundle aborda la continuidad desde una perspectiva formal, integrando el análisis de funciones a trozos con parámetros desconocidos y las consecuencias teóricas como el Teorema de Bolzano y el Teorema de los Valores Intermedios.

---

## Question 1 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comunicación y Representación

### Contexto
Un estudiante afirma que toda función definida en un intervalo $[a, b]$ es continua en dicho intervalo.

### Enunciado
¿Cuál de los siguientes ejemplos desmiente la afirmación del estudiante?

### Options
- [ ] A) $f(x) = x^2$ <!-- feedback: Incorrecto. Los polinomios son continuos en todo su dominio. -->
- [x] B) $f(x) = \frac{1}{x-5}$ en el intervalo $[0, 10]$ <!-- feedback: Correcto. En x=5 la función no está definida, por lo que es discontinua dentro del intervalo dado. -->
- [ ] C) $f(x) = e^x$ <!-- feedback: Incorrecto. La función exponencial es continua en todos los reales. -->
- [ ] D) $f(x) = \sin(x)$ <!-- feedback: Incorrecto. Las funciones trigonométricas básicas son continuas en sus dominios naturales. -->

### Explicación Pedagógica
La continuidad no es solo una propiedad de la fórmula, sino de la interacción entre la fórmula y el dominio. Si hay un punto de "explosión" (asíntota) en el intervalo, la continuidad se rompe.

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Comunicación y Representación

### Contexto
Se define la función $f$ con una discontinuidad evitable en $x = 2$.

### Enunciado
¿Cuál de las siguientes condiciones es necesaria para que la discontinuidad sea clasificada como "evitable"?

### Options
- [x] A) El límite $\lim_{x \to 2} f(x)$ debe existir y ser un número finito. <!-- feedback: Correcto. Si el límite existe pero la función no o vale otra cosa, podemos "rellenar" el punto. -->
- [ ] B) El límite debe ser infinito. <!-- feedback: Incorrecto. Esto indicaría una discontinuidad esencial (asíntota). -->
- [ ] C) Los límites laterales deben ser distintos. <!-- feedback: Incorrecto. Esto indicaría una discontinuidad de salto. -->
- [ ] D) La función debe ser creciente en ambos lados. <!-- feedback: La inyectividad o el crecimiento no definen el tipo de discontinuidad. -->

### Explicación Pedagógica
Una discontinuidad es evitable si el "hueco" se puede tapar simplemente asignando f(a) = Límite. Si los caminos no llegan al mismo lugar, el daño es estructural y no se puede evitar.

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Considera la función:
$f(x) = \begin{cases} 3x - 1 & \text{si } x < 2 \\ 5 & \text{si } x = 2 \\ x + 3 & \text{si } x > 2 \end{cases}$

### Enunciado
Evaluando las tres condiciones de continuidad, ¿es $f(x)$ continua en $x=2$?

### Options
- [x] A) Sí, porque $f(2) = 5$ y el límite cuando tiende a 2 por ambos lados también es 5. <!-- feedback: Correcto. 3(2)-1 = 5 y 2+3 = 5. Límite = Valor = 5. -->
- [ ] B) No, porque hay un salto en x=2. <!-- feedback: Incorrecto. Al calcular los límites laterales verás que ambos convergen al mismo punto (5). -->
- [ ] C) No, porque las fórmulas son distintas. <!-- feedback: Incorrecto. Diferentes fórmulas pueden encontrarse en el mismo punto de contacto. -->
- [ ] D) No sé puede determinar. <!-- feedback: Incorrecto. Tenemos toda la información necesaria para aplicar la definición formal. -->

### Explicación Pedagógica
La continuidad exige un acuerdo perfecto: el camino por la izquierda, el punto exacto y el camino por la derecha deben coincidir en la misma altura.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Comunicación y Representación

### Contexto
Dada una función racional $f(x) = \frac{p(x)}{q(x)}$.

### Enunciado
¿En qué valores de $x$ podemos asegurar que la función tendrá puntos de discontinuidad?

### Options
- [ ] A) Cuando $p(x) = 0$. <!-- feedback: Incorrecto. Estas son las raíces de la función, donde cruza el eje x, pero sigue siendo continua. -->
- [x] B) Cuando $q(x) = 0$. <!-- feedback: Correcto. La división por cero no está definida en los reales, rompiendo la continuidad. -->
- [ ] C) Cuando $x$ es negativo. <!-- feedback: Incorrecto. Muchas funciones son perfectamente continuas en el lado negativo del plano. -->
- [ ] D) Solo en $x = 0$. <!-- feedback: Incorrecto. La discontinuidad depende de las raíces del denominador, no del valor cero de x necesariamente. -->

### Explicación Pedagógica
Las funciones racionales son continuas en todo su dominio. Su discontinuidad ocurre precisamente donde el dominio se "rompe" por una división por cero.

---

## Question 5 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v5`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

### Contexto
Una función $f$ es continua en el intervalo cerrado $[1, 5]$. Se sabe que $f(1) = -10$ y $f(5) = 10$.

### Enunciado
Según el Teorema de Bolzano, ¿qué podemos afirmar con total seguridad sobre el intervalo $(1, 5)$?

### Options
- [ ] A) La función tiene un valor máximo de 10. <!-- feedback: No necesariamente; puede subir hasta 100 y luego bajar a 10. -->
- [x] B) Existe al menos un valor de $c$ tal que $f(c) = 0$. <!-- feedback: Correcto. Para pasar de un negativo a un positivo sin saltos, debes cruzar el cero. -->
- [ ] C) La función es siempre creciente. <!-- feedback: Incorrecto. Podría oscilar mientras se mantenga continua. -->
- [ ] D) El límite en x=3 es 0. <!-- feedback: Incorrecto. Sabemos que cruza el cero en algún lugar, pero no necesariamente en el punto medio. -->

### Explicación Pedagógica
El Teorema de Bolzano es una aplicación directa de la continuidad: garantiza la existencia de raíces (cruces por el eje X) en intervalos con cambio de signo.

---

## Question 6 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Halla el valor de la constante $k$ para que la función sea continua en todo su dominio:
$f(x) = \begin{cases} kx^2 & \text{si } x \leq 2 \\ 2x + 4 & \text{si } x > 2 \end{cases}$

### Enunciado
¿Qué valor de $k$ "pega" ambos tramos en $x=2$?

### Options
- [x] A) $k = 2$ <!-- feedback: Correcto. k(2^2) = 2(2) + 4 => 4k = 8 => k = 2. -->
- [ ] B) $k = 4$ <!-- feedback: Incorrecto. 4(4) = 16, que es distinto de 8. -->
- [ ] C) $k = 1$ <!-- feedback: Incorrecto. 1(4) = 4, que es distinto de 8. -->
- [ ] D) $k = 0$ <!-- feedback: Incorrecto. 0 = 8 es una contradicción. -->

### Explicación Pedagógica
Problema clásico de ingeniería de funciones. Se igualan las expresiones en el punto de frontera para garantizar que el límite bilateral exista y coincida con el valor de la función.

---

## Question 7 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación

### Contexto
Se presenta la gráfica de la función "escalón" o "parte entera".

### Enunciado
¿Cuál de las siguientes afirmaciones describe mejor sus discontinuidades?

### Options
- [ ] A) Tiene infinitos huecos evitables. <!-- feedback: Incorrecto. Los saltos son de una unidad entera, no son huecos que se puedan rellenar. -->
- [x] B) Tiene discontinuidades de **salto finito** en cada número entero. <!-- feedback: Correcto. La función salta bruscamente de valor en cada entero. -->
- [ ] C) Es continua en los reales. <!-- feedback: Evidentemente falso al observar los escalones de la gráfica. -->
- [ ] D) Tiene asíntotas verticales en cada entero. <!-- feedback: Incorrecto. El valor de la función es finito en todo momento. -->

### Explicación Pedagógica
Las funciones escalonadas son el ejemplo por excelencia de discontinuidad de salto. El límite lateral izquierdo es distinto al derecho, pero ambos son números reales finitos.

---

## Question 8 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Analiza la continuidad de $f(x) = \frac{x^2 - 1}{x^2 - x}$.

### Enunciado
¿Cuáles son los puntos donde la función NO es continua?

### Options
- [ ] A) Solo en $x = 1$. <!-- feedback: Incompleto. El denominador también se anula en x = 0. -->
- [ ] B) Solo en $x = 0$. <!-- feedback: Incompleto. El punto x = 1 también genera una división por cero. -->
- [x] C) En $x = 0$ y $x = 1$. <!-- feedback: Correcto. x(x-1) = 0 implica x=0 o x=1. -->
- [ ] D) Es continua en todos los reales. <!-- feedback: Incorrecto. Las funciones racionales fallan en las raíces de su denominador. -->

### Explicación Pedagógica
Para hallar las discontinuidades de una función racional, debemos factorizar el denominador completamente. En este caso, $x=0$ produce una asíntota y $x=1$ produce un hueco (evitable).

---

## Question 9 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

### Contexto
Un termostato regula la temperatura $T$ de un horno. El modelo original era $T(t) = 200$, pero por un error de programación, a los 30 minutos ($t=30$), la temperatura pasa a ser $T(t) = 100$ instantáneamente.

### Enunciado
Desde el punto de vista del cálculo, ¿cómo se describe este fenómeno físico?

### Options
- [x] A) Como una discontinuidad de salto finito que indica un cambio no gradual en la variable. <!-- feedback: Correcto. Los cambios instantáneos rompen la continuidad de las trayectorias físicas. -->
- [ ] B) Como un proceso continuo pero muy rápido. <!-- feedback: Incorrecto. Si el cambio es en un instante t exacto hacia dos valores distintos, es discontinuo. -->
- [ ] C) Como una asíntota vertical de calor. <!-- feedback: Incorrecto. La temperatura no se vuelve infinita. -->
- [ ] D) Como una función inyectiva de tiempo. <!-- feedback: No guarda relación con la continuidad del proceso térmico. -->

### Explicación Pedagógica
En la realidad física, los procesos suelen ser continuos (la temperatura no salta de 200 a 100 sin pasar por 150). Por eso, los modelos discontinuos suelen representar fallas, cortes o decisiones lógicas binarias.

---

## Question 10 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v10`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Determina el tipo de discontinuidad de $f(x) = \frac{\sin(x)}{x}$ en $x = 0$.

### Enunciado
¿Qué sucede en el origen para esta función?

### Options
- [ ] A) Hay una asíntota vertical. <!-- feedback: Incorrecto. El límite es 1, lo que impide que la tendencia sea infinita. -->
- [x] B) Hay una discontinuidad **evitable**. <!-- feedback: Correcto. El límite existe (es 1), pero la función no está definida en 0. -->
- [ ] C) Hay un salto finito de 0 a 1. <!-- feedback: Incorrecto. Los límites por ambos lados coinciden en 1. -->
- [ ] D) La función es continua. <!-- feedback: Incorrecto. No está definida en el punto exacto x=0. -->

### Explicación Pedagógica
Este es un "clásico" académico. Un hueco en (0, 1). Si definimos arbitrariamente que f(0) = 1, la función se vuelve perfectamente continua.

---

## Question 11 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v11`
**Bloom:** Evaluate
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Una función $f$ es continua en $[-2, 2]$. Se sabe que $f(-2) = 5$ y $f(2) = 5$.

### Enunciado
¿Garantiza el Teorema de Bolzano que la función cruza el eje X en algún punto del intervalo?

### Options
- [ ] A) Sí, porque es continua. <!-- feedback: Solo con continuidad no basta; se requiere cambio de signo. -->
- [x] B) No, porque no hay cambio de signo entre los extremos. <!-- feedback: Correcto. La función podría estar siempre por encima del eje X. -->
- [ ] C) Sí, por el teorema del valor medio. <!-- feedback: Incorrecto. El teorema del valor medio habla de derivadas, no de raíces necesariamente. -->
- [ ] D) No sé puede saber sin la fórmula. <!-- feedback: Aunque no se puede asegurar que cruce, sí se puede asegurar que el teorema de Bolzano NO lo garantiza en este caso. -->

### Explicación Pedagógica
Para aplicar Bolzano, los signos de los extremos deben ser opuestos. Si ambos son positivos, la función "podría" cruzar el eje X (bajando y subiendo), pero el teorema no puede asegurarlo.

---

## Question 12 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Se quiere que la función $f(x) = \begin{cases} \frac{x^2 - a^2}{x - a} & \text{si } x \neq a \\ 8 & \text{si } x = a \end{cases}$ sea continua.

### Enunciado
¿Cuál debe ser el valor del parámetro **a**?

### Options
- [ ] A) $a = 2$ <!-- feedback: Incorrecto. El límite simplificado es 2a. Si a=2, el límite sería 4, distinto de 8. -->
- [x] B) $a = 4$ <!-- feedback: Correcto. El límite es x+a -> 2a. Si 2a = 8, entonces a = 4. -->
- [ ] C) $a = 8$ <!-- feedback: Incorrecto. Daría un límite de 16. -->
- [ ] D) $a = 0$ <!-- feedback: Incorrecto. Daría un límite de 0. -->

### Explicación Pedagógica
Combinamos límites por cancelación con la condición de continuidad. El valor "parche" (8) debe coincidir con la tendencia de la "recta con hueco" (2a).

---

## Question 13 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v13`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Sea $f(x) = \lfloor x \rfloor$ (parte entera) y $g(x) = \sin(x)$.

### Enunciado
¿Es la función compuesta $g(f(x))$ continua en $x=1$?

### Options
- [ ] A) Sí, porque sin(1) existe. <!-- feedback: Incorrecto. El problema es la función interna f(x) que salta en 1. -->
- [x] B) No, porque $f(x)$ tiene un salto en 1 y la función externa $g$ no lo compensa. <!-- feedback: Correcto. El límite por la izquierda es sin(0)=0 y por la derecha sin(1). -->
- [ ] C) Sí, porque las funciones trigonométricas son continuas. <!-- feedback: Incorrecto. La continuidad de la externa no salva la discontinuidad de la interna. -->
- [ ] D) No se puede definir la composición. <!-- feedback: Incorrecto. Se puede definir, pero no es continua. -->

### Explicación Pedagógica
La continuidad de una composición requiere que la función interna sea continua en el punto y la externa sea continua en el resultado de la primera. Aquí, la interna falla.

---

## Question 14 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Un sistema de control de temperatura industrial debe ser "suave" (continuo). La salida de potencia $P$ en vatios depende de la temperatura $T$.
$P(T) = \begin{cases} 400 & \text{si } T < 50 \\ aT + b & \text{si } 50 \leq T \leq 100 \\ 0 & \text{si } T > 100 \end{cases}$

### Enunciado
Halla los valores de $a$ y $b$ para asegurar la transición suave en ambos puntos de frontera ($T=50$ y $T=100$).

### Options
- [x] A) $a = -8$ y $b = 800$ <!-- feedback: Correcto. En T=50: 400 = 50a + b. En T=100: 0 = 100a + b. Restando: 400 = -50a => a = -8. Sustituyendo: 0 = -800 + b => b = 800. -->
- [ ] B) $a = 8$ y $b = 0$ <!-- feedback: Incorrecto. No cumple la condición en T=50. -->
- [ ] C) $a = -4$ y $b = 600$ <!-- feedback: Incorrecto. No cumple la condición en T=100. -->
- [ ] D) $a = 0$ y $b = 400$ <!-- feedback: Incorrecto. Crearía un salto brusco en T=100 (de 400 a 0). -->

### Explicación Pedagógica
Modelado mediante sistemas de ecuaciones lineales para garantizar continuidad global. Es la base del diseño de controladores que evitan picos de potencia perjudiciales.

---

## Question 15 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v15`
**Bloom:** Create
**ICFES:** Razonamiento y Argumentación

### Contexto
Considera la función $f(x) = \frac{x-1}{|x-1|}$.

### Enunciado
Describe técnicamente por qué no existe una forma de definir $f(1)$ que haga que la función sea continua.

### Options
- [x] A) Porque los límites laterales son **opuestos** (-1 y 1), lo que implica una discontinuidad de salto inevitable. <!-- feedback: Correcto. Ningún punto puede conectar dos caminos que terminan a alturas distintas. -->
- [ ] B) Porque la función tiende al infinito. <!-- feedback: Incorrecto. La función solo vale 1 o -1, nunca es infinita. -->
- [ ] C) Porque el valor absoluto siempre es positivo. <!-- feedback: Aunque es cierto, no explica por sí solo la falta de límite lateral único. -->
- [ ] D) Porque es una función cuadrática. <!-- feedback: Incorrecto. Es una función racional con valor absoluto. -->

### Explicación Pedagógica
Identificación de discontinuidades esenciales. Cuando los límites laterales difieren, no hay "parche" puntual que valga; la función está rota por un salto finito.

---

## Question 16 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v16`
**Bloom:** Evaluate
**ICFES:** Formulación y Ejecución

### Contexto
Halla el valor de $k$ para que $f(x) = \begin{cases} \frac{\sin(kx)}{x} & \text{si } x \neq 0 \\ 5 & \text{si } x = 0 \end{cases}$ sea continua.

### Enunciado
¿Qué valor debe tener la frecuencia $k$?

### Options
- [ ] A) $k = 1$ <!-- feedback: Incorrecto. El límite sería 1, distinto de 5. -->
- [x] B) $k = 5$ <!-- feedback: Correcto. El límite notable sen(kx)/x tiende a k. Para continuidad, k debe ser igual al valor en el origen (5). -->
- [ ] C) $k = 0$ <!-- feedback: Incorrecto. La función sería nula. -->
- [ ] D) No existe tal valor. <!-- feedback: Incorrecto. El límite existe para cualquier k finito. -->

### Explicación Pedagógica
Sincronización de límites trigonométricos con definiciones puntuales. Una aplicación elegante de las propiedades de los límites senoidales.

---

## Question 17 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Un matemático afirma que si una función es continua en un intervalo abierto $(a, b)$, entonces está acotada (tiene un máximo y un mínimo). 

### Enunciado
¿Es correcta esta afirmación? Si no lo es, proporciona un contraejemplo.

### Options
- [x] A) No. Contraejemplo: $f(x) = 1/x$ en el intervalo $(0, 1)$. Es continua en ese rango pero no está acotada superiormente. <!-- feedback: Correcto. La acotación requiere intervalos CERRADOS según el Teorema de Weierstrass. -->
- [ ] B) Sí, por el Teorema de Weierstrass. <!-- feedback: Incorrecto. Weierstrass exige un intervalo cerrado y acotado. -->
- [ ] C) No, porque las funciones continuas siempre crecen. <!-- feedback: Incorrecto. Pueden ser decrecientes o constantes. -->
- [ ] D) Sí, porque una función sin saltos no puede irse al infinito. <!-- feedback: Incorrecto. Puede acercarse a una asíntota sin "saltar". -->

### Explicación Pedagógica
Análisis de extremos. Diferencia fundamental entre intervalos abiertos y cerrados. La continuidad sola no garantiza extremos globales si el dominio no está acotado.

---

## Question 18 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v18`
**Bloom:** Create
**ICFES:** Razonamiento y Argumentación

### Contexto
Usa el Teorema de los Valores Intermedios para demostrar que la ecuación $x^5 - 3x + 1 = 0$ tiene al menos una raíz en el intervalo $[0, 1]$.

### Enunciado
¿Cuál es la secuencia lógica correcta de la demostración?

### Options
- [x] A) 1. La función es continua (polinomio). 2. $f(0)=1$ y $f(1)=-1$. 3. Como $1 > 0 > -1$, el cero debe tocarse en el intervalo. <!-- feedback: Correcto. Verificación de hipótesis y conclusión del TVI (Bolzano). -->
- [ ] B) 1. Evaluar f(0.5). 2. Si es 0, terminamos. <!-- feedback: Incorrecto. El azar de evaluar un punto no es una demostración general de existencia. -->
- [ ] C) 1. Derivar la función. 2. Buscar ceros en la derivada. <!-- feedback: Incorrecto. Esto buscaría máximos/mínimos, no raíces necesariamente. -->
- [ ] D) No se puede demostrar porque el grado es impar. <!-- feedback: Incorrecto. De hecho, las funciones de grado impar siempre cruzan el eje x al menos una vez. -->

### Explicación Pedagógica
Método de bisección conceptual. La continuidad permite asegurar la existencia de soluciones en ecuaciones que son imposibles de resolver por métodos algebraicos simples (como una quintica).

---

## Question 19 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v19`
**Bloom:** Create
**ICFES:** Formulación y Ejecución

### Contexto
Se define la función de Dirichlet: $f(x) = \begin{cases} 1 & \text{si } x \in \mathbb{Q} \\ 0 & \text{si } x \notin \mathbb{Q} \end{cases}$.

### Enunciado
¿Qué se puede decir sobre la continuidad de esta función en cualquier número real $a$?

### Options
- [x] A) Es **discontinua en todos los puntos**, porque entre dos racionales siempre hay un irracional y viceversa. <!-- feedback: Correcto. No existe ningún intervalo donde la función se mantenga en 1 o 0 sin saltar. -->
- [ ] B) Es continua en los racionales. <!-- feedback: Incorrecto. Incluso cerca de un racional, hay infinitos irracionales con valor 0. -->
- [ ] C) Es discontinua solo en el origen. <!-- feedback: Incorrecto. El problema de la densidad de los reales ocurre en toda la recta. -->
- [ ] D) Es continua en el sentido de Lebesgue. <!-- feedback: Aunque avanzado, esto no cambia la falta de continuidad puntual clásica. -->

### Explicación Pedagógica
Análisis de densidad. Esta función desafía la intuición de "trazo continuo" y demuestra que existen objetos matemáticos definidos en todos los reales que son imposibles de graficar o considerar continuos.

---

## Question 20 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P1-continuidad-002-MASTERY-v20`
**Bloom:** Evaluate
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Un científico modela el despegue de un cohete. Para que la estructura no se destruya, la aceleración debe ser una función continua del tiempo. 
$\text{Aceleración}(t) = \begin{cases} t^2 & \text{si } t < 10 \\ 100 \cdot e^{k(t-10)} & \text{si } t \geq 10 \end{cases}$

### Enunciado
¿Cuál es el valor de $k$ que permite cualquier tipo de transición (incluida la suave) al menos asegurando la continuidad básica en $t=10$?

### Options
- [x] A) Cualquier valor de $k$ es válido para asegurar la **continuidad básica**. <!-- feedback: Correcto. En t=10, el tramo 1 da 100 y el tramo 2 siempre da 100*e^0 = 100, independientemente de k. -->
- [ ] B) Solo $k = 0.02$. <!-- feedback: Incorrecto. La continuidad básica no impone restricciones sobre la tasa de crecimiento posterior. -->
- [ ] C) Solo $k = 0$. <!-- feedback: Incorrecto. k=0 haría la aceleración constante después de 10, pero la continuidad se cumple para cualquier k. -->
- [ ] D) No hay valor de k que funcione. <!-- feedback: Incorrecto. La función ya es continua en t=10 por construcción de los términos constantes. -->

### Explicación Pedagógica
Análisis de diseño crítico. Identificar que en ciertos modelos, el valor de "empalme" ($10^2 = 100$) coincide con el valor inicial de la siguiente fase ($100 \cdot 1$), lo que otorga libertad en el parámetro de crecimiento $k$ sin romper la estructura.
