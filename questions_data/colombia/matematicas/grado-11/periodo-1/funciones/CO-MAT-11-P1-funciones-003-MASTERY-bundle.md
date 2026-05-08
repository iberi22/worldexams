---
id: "CO-MAT-11-P1-funciones-003-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "funciones"
periodo: 1
protocol_version: "5.1"
bundle_index: 3
bundle_size: 20
alignment: "ICFES Saber 11 + MEN"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: 0.55
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "funciones_racionales, funciones_por_partes, modelamiento_complejo"
---

# Bundle Mastery: Funciones Racionales y por Partes

Este bundle profundiza en el análisis de funciones racionales, incluyendo sus asíntotas y puntos de discontinuidad, así como en el modelado mediante funciones definidas por tramos aplicadas a sistemas de tarifas y procesos industriales en Colombia.

---

## Question 1 (Difficulty D3)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comunicación y Representación

### Contexto
Un estudiante está analizando la función racional $f(x) = \frac{5}{x+2}$.

### Enunciado
¿En qué valor de $x$ presenta esta función una asíntota vertical?

### Options
- [ ] A) $x = 2$ <!-- feedback: Incorrecto. Si x=2, el denominador es 4. La asíntota ocurre donde el denominador se anula. -->
- [x] B) $x = -2$ <!-- feedback: Correcto. Cuando x=-2, el denominador es cero, lo que genera una indeterminación de tipo salto infinito (asíntota vertical). -->
- [ ] C) $x = 0$ <!-- feedback: Incorrecto. f(0) = 5/2, es un punto definido en la función. -->
- [ ] D) $x = 5$ <!-- feedback: Incorrecto. Este es el valor del numerador, no influye en la posición de la asíntota vertical. -->

### Explicación Pedagógica
Las asíntotas verticales en funciones racionales simples ocurren en los valores de $x$ que hacen que el denominador sea igual a cero, ya que la función tiende a infinito en esos puntos.

---

## Question 2 (Difficulty D3)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Comunicación y Representación

### Contexto
Se define una función por partes que representa el costo de un estacionamiento en un centro comercial de Bogotá:
$C(t) = \begin{cases} 3000 & \text{si } 0 < t \leq 1 \\ 3000 + 1000(t-1) & \text{si } t > 1 \end{cases}$
donde $t$ es el tiempo en horas.

### Enunciado
¿Cuál es el costo de parquear durante 45 minutos?

### Options
- [x] A) $3.000$ pesos <!-- feedback: Correcto. 45 minutos es 0.75 horas, lo cual cae en el primer tramo (t <= 1). -->
- [ ] B) $4.000$ pesos <!-- feedback: Incorrecto. Este sería el costo si se pasara de la primera hora. -->
- [ ] C) $2.250$ pesos <!-- feedback: Incorrecto. No se cobra proporcionalmente por minutos en este tramo, es una tarifa fija por la primera hora. -->
- [ ] D) $0$ pesos <!-- feedback: Incorrecto. El parqueo tiene un costo desde el primer minuto según la función definida. -->

### Explicación Pedagógica
Las funciones por partes permiten modelar sistemas de tarifas donde el comportamiento del costo cambia después de cumplir ciertas condiciones o umbrales de tiempo.

---

## Question 3 (Difficulty D4)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Considere la función racional $f(x) = \frac{2x + 8}{x - 4}$.

### Enunciado
¿Cuál es el valor del intercepto con el eje Y de esta función?

### Options
- [ ] A) $(4, 0)$ <!-- feedback: Incorrecto. Este es el valor de la asíntota vertical, no el intercepto con Y. -->
- [x] B) $(0, -2)$ <!-- feedback: Correcto. Para hallar el intercepto con Y evaluamos f(0) = (2(0)+8)/(0-4) = 8/-4 = -2. -->
- [ ] C) $(0, 2)$ <!-- feedback: Incorrecto. Olvidaste el signo negativo del denominador al realizar la división. -->
- [ ] D) $(-4, 0)$ <!-- feedback: Incorrecto. Este es el intercepto con el eje X (donde el numerador se hace cero). -->

### Explicación Pedagógica
El intercepto con el eje Y es el punto donde la gráfica cruza la línea vertical $x=0$. Se obtiene evaluando la función en cero, siempre que cero esté en el dominio.

---

## Question 4 (Difficulty D4)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Comunicación y Representación

### Contexto
Una función racional $f(x)$ tiene el mismo grado en el numerador que en el denominador. El coeficiente principal del numerador es $10$ y el del denominador es $2$.

### Enunciado
¿Cuál es la ecuación de la asíntota horizontal de esta función?

### Options
- [ ] A) $y = 0$ <!-- feedback: Incorrecto. Esto solo ocurre si el grado del denominador es mayor que el del numerador. -->
- [x] B) $y = 5$ <!-- feedback: Correcto. La asíntota horizontal es el cociente de los coeficientes principales: 10 / 2 = 5. -->
- [ ] C) $y = 2$ <!-- feedback: Incorrecto. El coeficiente del denominador por sí solo no define la asíntota. -->
- [ ] D) No tiene asíntota horizontal. <!-- feedback: Incorrecto. Al tener grados iguales, la función se estabiliza en un valor constante para x muy grandes. -->

### Explicación Pedagógica
El comportamiento asintótico horizontal de una función racional depende de la relación entre los grados de los polinomios. Si son iguales, la función tiende al cociente de los términos de mayor grado.

---

## Question 5 (Difficulty D5)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
En un laboratorio de química en Medellín, se mide la concentración de una sustancia $C$ en el tiempo $t$ (minutos) mediante la función $C(t) = \frac{40t}{t+2}$.

### Enunciado
¿A qué valor se aproxima la concentración de la sustancia si el experimento se deja correr por un tiempo muy largo ($t \to \infty$)?

### Options
- [ ] A) $0$ <!-- feedback: Incorrecto. La concentración aumenta con el tiempo, no desaparece. -->
- [ ] B) $20$ <!-- feedback: Incorrecto. Este valor no corresponde al límite de la función racional. -->
- [x] C) $40$ <!-- feedback: Correcto. El límite cuando t tiende a infinito de (40t)/(t+2) es 40, que es el valor de la asíntota horizontal. -->
- [ ] D) $Infinity$ <!-- feedback: Incorrecto. La función está acotada superiormente por su asíntota. -->

### Explicación Pedagógica
El análisis de límites al infinito en funciones racionales permite predecir el estado de equilibrio o saturación de un sistema físico o químico a largo plazo.

---

## Question 6 (Difficulty D5)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

### Contexto
Sea la función por partes $f(x) = \begin{cases} kx + 3 & \text{si } x < 2 \\ x^2 - 1 & \text{si } x \geq 2 \end{cases}$.

### Enunciado
¿Cuál debe ser el valor de la constante $k$ para que la función sea continua en $x = 2$?

### Options
- [x] A) $k = 0$ <!-- feedback: Correcto. Para que sea continua, los tramos deben coincidir en x=2: k(2)+3 = 2^2-1 => 2k+3 = 3 => 2k = 0 => k = 0. -->
- [ ] B) $k = 1$ <!-- feedback: Incorrecto. Si k=1, el primer tramo valdría 5 y el segundo 3, habiendo un salto. -->
- [ ] C) $k = 3$ <!-- feedback: Incorrecto. Los límites laterales no coincidirían con este valor. -->
- [ ] D) $k = -1$ <!-- feedback: Incorrecto. No satisface la igualdad de los límites laterales en el punto de unión. -->

### Explicación Pedagógica
La continuidad en un punto requiere que los límites por la izquierda y por la derecha existan y sean iguales al valor de la función en ese punto.

---

## Question 7 (Difficulty D5)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Dadas las funciones $f(x) = \frac{1}{x}$ y $g(x) = x^2 + 4$.

### Enunciado
¿Cuál es el dominio de la función compuesta $(f \circ g)(x)$?

### Options
- [x] A) Todos los números reales ($\mathbb{R}$). <!-- feedback: Correcto. f(g(x)) = 1/(x^2 + 4). Como x^2 + 4 nunca es cero para ningún x real, no hay restricciones. -->
- [ ] B) $\{x \in \mathbb{R} \mid x \neq 0\}$ <!-- feedback: Incorrecto. Aunque f(x) tiene restricción en 0, g(x) nunca devuelve 0, por lo que la composición es siempre válida. -->
- [ ] C) $\{x \in \mathbb{R} \mid x \neq -4\}$ <!-- feedback: Incorrecto. Este valor no anula el denominador del resultado de la composición. -->
- [ ] D) $\{x \in \mathbb{R} \mid x > 2\}$ <!-- feedback: Incorrecto. No hay ninguna razón para restringir el dominio a valores positivos o mayores a 2. -->

### Explicación Pedagógica
El dominio de una composición $f(g(x))$ consiste en los valores de $x$ en el dominio de $g$ tales que $g(x)$ está en el dominio de $f$. En este caso, el "filtro" de $f$ no bloquea ninguna salida de $g$.

---

## Question 8 (Difficulty D6)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación

### Contexto
Observe la función $f(x) = \frac{x^2 - 1}{x - 1}$.

### Enunciado
¿Cuál es la diferencia técnica entre el comportamiento de esta función en $x = 1$ y el de la función $g(x) = \frac{1}{x - 1}$?

### Options
- [ ] A) Ambas tienen una asíntota vertical en $x = 1$. <!-- feedback: Incorrecto. Solo g(x) tiene asíntota; f(x) se puede simplificar. -->
- [x] B) $f(x)$ tiene un hueco en $x = 1$, mientras que $g(x)$ tiene una asíntota vertical. <!-- feedback: Correcto. f(x) = (x-1)(x+1)/(x-1) = x+1 (con x != 1). Al cancelarse el factor, la discontinuidad es evitable (un hueco). -->
- [ ] C) $f(x)$ es continua en $x = 1$. <!-- feedback: Incorrecto. Sigue siendo indefinida en la expresión original, por lo que no es continua. -->
- [ ] D) $g(x)$ tiene un hueco en $x = 1$. <!-- feedback: Incorrecto. En g(x) el factor del denominador no se cancela con nada en el numerador, generando una asíntota. -->

### Explicación Pedagógica
Las funciones racionales pueden presentar discontinuidades de dos tipos: infinitas (asíntotas) o evitables (huecos). Los huecos ocurren cuando un factor que anula el denominador también está en el numerador.

---

## Question 9 (Difficulty D6)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Una empresa de energía eléctrica en el Caribe cobra una tarifa fija de $15.000$ pesos y un costo por kWh de $600$ pesos si el consumo es menor a $200$ kWh. Si el consumo supera los $200$ kWh, cada unidad adicional cuesta $800$ pesos.

### Enunciado
¿Cuál de las siguientes funciones por partes representa el costo total $C(x)$ para un consumo $x > 200$?

### Options
- [ ] A) $C(x) = 600x + 15000$ <!-- feedback: Incorrecto. Esta fórmula no aplica el cambio de tarifa para los excedentes de 200 kWh. -->
- [ ] B) $C(x) = 800x + 15000$ <!-- feedback: Incorrecto. Esto cobraría todas las unidades a 800, no solo las adicionales a 200. -->
- [x] C) $C(x) = 15000 + 600(200) + 800(x - 200)$ <!-- feedback: Correcto. Suma el cargo fijo, el costo de los primeros 200 kWh a tarifa base y los excedentes a la nueva tarifa. -->
- [ ] D) $C(x) = 800(x - 200)$ <!-- feedback: Incorrecto. Olvida el cargo fijo y el costo de los primeros 200 kWh consumidos. -->

### Explicación Pedagógica
El modelado de tarifas por bloques requiere el uso de funciones por partes donde se acumulan los costos de los rangos anteriores antes de aplicar la nueva tasa marginal.

---

## Question 10 (Difficulty D6)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentación

### Contexto
Se define la función racional $f(x) = \frac{x+5}{x^2 - 25}$.

### Enunciado
¿Cuál es el dominio de esta función?

### Options
- [ ] A) $\mathbb{R} \setminus \{5\}$ <!-- feedback: Incompleto. El valor -5 también anula el denominador original (x^2 - 25 = 0). -->
- [x] B) $\mathbb{R} \setminus \{5, -5\}$ <!-- feedback: Correcto. Ambos valores hacen que el denominador sea cero, por lo que deben excluirse del dominio de los reales. -->
- [ ] C) $\mathbb{R} \setminus \{-5\}$ <!-- feedback: Incompleto. El valor 5 genera una asíntota vertical clara y debe ser excluido. -->
- [ ] D) $(-\infty, 5]$ <!-- feedback: Incorrecto. No hay ninguna razón para excluir todos los valores mayores a 5 ni para incluir el 5. -->

### Explicación Pedagógica
El dominio de una función racional está determinado por **todos** los valores que anulan el denominador, independientemente de si producen una asíntota o un hueco.

---

## Question 11 (Difficulty D7)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Halla el valor de la asíntota horizontal para la función $f(x) = \frac{4x^2 + 3x - 1}{2x^2 - 8}$.

### Enunciado
¿Cuál es la recta que describe el comportamiento final de la función?

### Options
- [ ] A) $y = 0$ <!-- feedback: Incorrecto. Los grados de los polinomios son iguales, por lo que la asíntota no es el eje X. -->
- [x] B) $y = 2$ <!-- feedback: Correcto. El cociente de los coeficientes principales es 4 / 2 = 2. -->
- [ ] C) $x = 2$ <!-- feedback: Incorrecto. Esta es una asíntota vertical, no horizontal. -->
- [ ] D) $y = 4$ <!-- feedback: Incorrecto. Solo consideraste el coeficiente del numerador sin dividirlo por el del denominador. -->

### Explicación Pedagógica
Para funciones racionales con el mismo grado en numerador y denominador, la asíntota horizontal es la recta constante $y = \frac{a_n}{b_n}$, donde $a_n$ y $b_n$ son los coeficientes principales.

---

## Question 12 (Difficulty D7)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Un sistema de bombeo en una mina de carbón en el Cesar se activa según la profundidad $d$:
$P(d) = \begin{cases} 0 & \text{si } d < 50 \\ 0.5(d - 50)^2 & \text{si } d \geq 50 \end{cases}$

### Enunciado
¿Cuál es la potencia de bombeo si la profundidad es de $60$ metros?

### Options
- [ ] A) $5$ unidades <!-- feedback: Incorrecto. Olvidaste elevar al cuadrado la diferencia de profundidad (10). -->
- [x] B) $50$ unidades <!-- feedback: Correcto. P(60) = 0.5(60-50)^2 = 0.5(10)^2 = 0.5(100) = 50. -->
- [ ] C) $100$ unidades <!-- feedback: Incorrecto. Olvidaste multiplicar por el factor 0.5 al final. -->
- [ ] D) $0$ unidades <!-- feedback: Incorrecto. Como 60 > 50, se debe usar la fórmula del segundo tramo donde la potencia es positiva. -->

### Explicación Pedagógica
La evaluación de funciones por tramos requiere una selección cuidadosa del intervalo de decisión. Una vez seleccionado, se aplican las operaciones aritméticas estándar.

---

## Question 13 (Difficulty D7)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v13`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Sea $f(x) = x^2 - 1$. Encuentre una función $g(x)$ tal que $(g \circ f)(x) = \sqrt{x^2 - 1}$.

### Enunciado
¿Cuál es la expresión para $g(x)$?

### Options
- [ ] A) $g(x) = x^2$ <!-- feedback: Incorrecto. g(f(x)) sería (x^2-1)^2. -->
- [x] B) $g(x) = \sqrt{x}$ <!-- feedback: Correcto. g(f(x)) = sqrt(f(x)) = sqrt(x^2 - 1). -->
- [ ] C) $g(x) = \sqrt{x^2 - 1}$ <!-- feedback: Incorrecto. Esto daría como resultado sqrt((x^2-1)^2 - 1). -->
- [ ] D) $g(x) = x - 1$ <!-- feedback: Incorrecto. No incluye la operación de raíz cuadrada necesaria. -->

### Explicación Pedagógica
La descomposición de funciones compuestas ayuda a identificar las operaciones elementales que se aplican sucesivamente a una variable independiente.

---

## Question 14 (Difficulty D8)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación

### Contexto
Considere la gráfica de la función racional $f(x) = \frac{x}{x^2 + 1}$.

### Enunciado
¿Cuántas asíntotas verticales tiene esta función en el plano cartesiano real?

### Options
- [x] A) Ninguna. <!-- feedback: Correcto. El denominador x^2 + 1 nunca es cero para valores reales de x, por lo que no hay saltos al infinito. -->
- [ ] B) Una, en $x = 0$. <!-- feedback: Incorrecto. x=0 anula el numerador, no el denominador. -->
- [ ] C) Dos, en $x = 1$ y $x = -1$. <!-- feedback: Incorrecto. 1^2 + 1 = 2 y (-1)^2 + 1 = 2. No se anula el denominador. -->
- [ ] D) Una, en $y = 0$. <!-- feedback: Incorrecto. y=0 es una asíntota horizontal, no vertical. -->

### Explicación Pedagógica
No todas las funciones racionales tienen asíntotas verticales. Si el denominador es un polinomio que no tiene raíces reales, la función será continua para todos los números reales.

---

## Question 15 (Difficulty D8)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v15`
**Bloom:** Create
**ICFES:** Formulación y Ejecución

### Contexto
Se desea diseñar una función de costos para una aplicación de transporte en Medellín. Los primeros $2$ km cuestan $6.000$ pesos fijos. A partir de ahí, cada kilómetro adicional cuesta $2.500$ pesos.

### Enunciado
¿Cuál es la expresión de la función de costo $C(x)$ para $x \geq 2$ km?

### Options
- [ ] A) $C(x) = 2500x + 6000$ <!-- feedback: Incorrecto. Esto cobraría los primeros 2 km dos veces (en la base y en el variable). -->
- [x] B) $C(x) = 2500(x - 2) + 6000$ <!-- feedback: Correcto. El costo variable de $2.500 solo aplica a la distancia que excede los 2 km iniciales. -->
- [ ] C) $C(x) = 2500x$ <!-- feedback: Incorrecto. Ignora el costo base de los primeros 2 km. -->
- [ ] D) $C(x) = 6000x + 2500$ <!-- feedback: Incorrecto. Intercambiaste el costo fijo por el variable de forma errónea. -->

### Explicación Pedagógica
El modelado de situaciones con costos de arranque o tarifas por tramos requiere el uso de desplazamientos en la variable independiente $(x - x_0)$ para aplicar tasas solo a los excedentes.

---

## Question 16 (Difficulty D8)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v16`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Un estudiante propone que si una función racional tiene un hueco en $x=c$, entonces al evaluar el límite cuando $x \to c$ el resultado debe ser necesariamente cero.

### Enunciado
¿Es correcta la afirmación del estudiante?

### Options
- [ ] A) Sí, porque el factor se cancela. <!-- feedback: Incorrecto. Que el factor se cancele permite que el límite exista, pero no obliga a que sea cero. -->
- [x] B) No, el límite será el valor de la función simplificada evaluada en $c$. <!-- feedback: Correcto. Por ejemplo, en (x^2-1)/(x-1), el hueco está en x=1 pero el límite es 2 (1+1). -->
- [ ] C) Sí, porque la función no está definida en ese punto. <!-- feedback: Incorrecto. La falta de definición no dicta el valor del límite en una discontinuidad evitable. -->
- [ ] D) No, el límite siempre será infinito si hay un hueco. <!-- feedback: Incorrecto. Si el límite fuera infinito, tendríamos una asíntota, no un hueco. -->

### Explicación Pedagógica
El valor de un hueco en la gráfica de una función racional es la altura a la que se encontraría el punto si la función fuera continua, lo cual se calcula mediante el límite.

---

## Question 17 (Difficulty D9)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Un economista modela la eficiencia de una planta de producción en Cali como $E(p) = \frac{100p^2}{p^2 + k}$. Se sabe que cuando la inversión $p$ es muy alta, la eficiencia se estabiliza en el $100\%$.

### Enunciado
¿Qué tipo de comportamiento matemático garantiza que la eficiencia no supere el $100\%$ a pesar de que la inversión aumente indefinidamente?

### Options
- [ ] A) La presencia de una asíntota vertical. <!-- feedback: Incorrecto. Una asíntota vertical haría que la eficiencia fuera al infinito cerca de un punto. -->
- [x] B) La presencia de una asíntota horizontal en $y = 100$. <!-- feedback: Correcto. Las asíntotas horizontales actúan como límites o techos para el crecimiento de funciones que modelan procesos de saturación. -->
- [ ] C) Que el grado del numerador sea mayor que el del denominador. <!-- feedback: Incorrecto. Si el grado del numerador fuera mayor, la función crecería sin límite. -->
- [ ] D) Que la función sea periódica. <!-- feedback: Incorrecto. La eficiencia no debería oscilar de forma senoidal en este modelo de inversión. -->

### Explicación Pedagógica
Las funciones racionales con asíntotas horizontales son herramientas fundamentales en economía y biología para representar rendimientos decrecientes y capacidades de carga.

---

## Question 18 (Difficulty D9)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v18`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Dada la función $f(x) = \frac{x^2 - 4}{x^2 - 5x + 6}$.

### Enunciado
Identifique la ubicación de la asíntota vertical y del hueco de esta función.

### Options
- [ ] A) Asíntota en $x=2$, Hueco en $x=3$. <!-- feedback: Incorrecto. Intercambiaste el comportamiento de las raíces del denominador. -->
- [x] B) Asíntota en $x=3$, Hueco en $x=2$. <!-- feedback: Correcto. Denominador: (x-3)(x-2). Numerador: (x+2)(x-2). El factor (x-2) se cancela (hueco), el factor (x-3) queda en el denominador (asíntota). -->
- [ ] C) Asíntotas en $x=2$ y $x=3$. <!-- feedback: Incorrecto. El factor x-2 se cancela con el numerador, por lo que no produce una asíntota. -->
- [ ] D) Huecos en $x=2$ y $x=3$. <!-- feedback: Incorrecto. Solo el factor x-2 está presente en el numerador para ser cancelado. -->

### Explicación Pedagógica
El análisis exhaustivo de una función racional requiere factorizar completamente tanto el numerador como el denominador para distinguir entre los diferentes tipos de discontinuidad.

---

## Question 19 (Difficulty D10)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v19`
**Bloom:** Create
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Un ingeniero eléctrico en Bogotá diseña un filtro de señal cuya respuesta en frecuencia es $H(f) = \frac{f^2}{f^2 + 100}$.

### Enunciado
¿Cuál es la función inversa $H^{-1}(y)$ que permite calcular la frecuencia $f$ necesaria para obtener una respuesta $y$ específica?

### Options
- [x] A) $f = \sqrt{\frac{100y}{1 - y}}$ <!-- feedback: Correcto. Al despejar: y(f^2 + 100) = f^2 => yf^2 + 100y = f^2 => 100y = f^2(1 - y) => f^2 = 100y/(1-y). -->
- [ ] B) $f = \frac{y^2 + 100}{y^2}$ <!-- feedback: Incorrecto. Esta es una manipulación errónea de los términos de la función original. -->
- [ ] C) $f = \sqrt{100y - 1}$ <!-- feedback: Incorrecto. No considera la división por (1-y) necesaria en el despeje. -->
- [ ] D) $f = \log(y)$ <!-- feedback: Incorrecto. No hay componentes exponenciales que justifiquen el uso de logaritmos. -->

### Explicación Pedagógica
La inversión de funciones racionales cuadráticas requiere un manejo preciso del álgebra para agrupar los términos de la variable deseada y luego extraer la raíz cuadrada.

---

## Question 20 (Difficulty D10)

**ID:** `CO-MAT-11-P1-funciones-003-MASTERY-v20`
**Bloom:** Create
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Diseñe una función racional $f(x)$ que cumpla simultáneamente:
1. Tenga una asíntota vertical en $x = 4$.
2. Tenga una asíntota horizontal en $y = 0$.
3. Pase por el punto $(0, 1)$.

### Enunciado
¿Cuál de las siguientes funciones satisface todos los requisitos?

### Options
- [ ] A) $f(x) = \frac{x}{x-4}$ <!-- feedback: Incorrecto. f(0)=0, no cumple el punto (0,1). Además su AH es y=1. -->
- [x] B) $f(x) = \frac{-4}{x-4}$ <!-- feedback: Correcto. AV en x=4. AH en y=0 (grado num < grado den). Punto: f(0) = -4/-4 = 1. -->
- [ ] C) $f(x) = \frac{1}{x-4}$ <!-- feedback: Incorrecto. f(0) = -1/4, no cumple el punto (0,1). -->
- [ ] D) $f(x) = \frac{4}{x+4}$ <!-- feedback: Incorrecto. La asíntota vertical estaría en x = -4. -->

### Explicación Pedagógica
La síntesis de funciones a partir de sus propiedades geométricas (asíntotas y puntos de paso) demuestra un dominio completo de los parámetros algebraicos que rigen su comportamiento.
