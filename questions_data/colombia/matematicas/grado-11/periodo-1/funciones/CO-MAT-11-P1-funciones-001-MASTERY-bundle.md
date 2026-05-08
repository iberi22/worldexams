---
id: "CO-MAT-11-P1-funciones-001-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "funciones"
periodo: 1
protocol_version: "5.1"
bundle_index: 1
bundle_size: 20
alignment: "ICFES Saber 11 + MEN"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: 0.65
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "definicion_funcion, dominio_rango, transformaciones, funciones_lineales"
---

# Bundle Mastery: Introducción a las Funciones Reales

Este bundle introduce los conceptos fundamentales de las funciones en el conjunto de los números reales, incluyendo su definición, identificación, dominio, rango y las transformaciones básicas aplicadas a contextos prácticos en Colombia.

---

## Question 1 (Difficulty D3)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comunicación y Representación

### Contexto
Un analista de datos en Bogotá está revisando diferentes conjuntos de pares ordenados que representan la relación entre el número de galones de gasolina y el precio total pagado en diferentes estaciones de servicio.

### Enunciado
¿Cuál de las siguientes condiciones define matemáticamente que una relación entre dos conjuntos sea una **función**?

### Options
- [ ] A) A cada elemento del conjunto de llegada le corresponde uno del conjunto de partida. <!-- feedback: Incorrecto. Esta es una descripción invertida; la definición de función se centra en los elementos del dominio (partida). -->
- [x] B) A cada elemento del conjunto de partida le corresponde **exactamente un** elemento del conjunto de llegada. <!-- feedback: Correcto. Esta es la definición formal de función: unicidad de la imagen para cada preimagen. -->
- [ ] C) El conjunto de partida debe ser igual al conjunto de llegada. <!-- feedback: Incorrecto. El dominio y el rango pueden ser conjuntos totalmente diferentes. -->
- [ ] D) La relación debe poder graficarse siempre como una línea recta. <!-- feedback: Incorrecto. Las funciones pueden tener infinitas formas (curvas, parábolas, etc.), no solo líneas rectas. -->

### Explicación Pedagógica
La esencia de una función es la predictibilidad: para una entrada específica, solo hay una salida posible. Esto separa a las funciones de las relaciones generales.

---

## Question 2 (Difficulty D3)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Comunicación y Representación

### Contexto
En un examen de matemáticas, se presentan cuatro gráficas diferentes.

### Enunciado
¿Cuál de los siguientes métodos visuales permite determinar rápidamente si una gráfica en el plano cartesiano representa una función de $x$?

### Options
- [ ] A) La prueba de la línea horizontal. <!-- feedback: Incorrecto. La línea horizontal se usa para determinar si una función es inyectiva (uno a uno), no si es función. -->
- [x] B) La prueba de la línea vertical. <!-- feedback: Correcto. Si cualquier línea vertical corta la gráfica en más de un punto, significa que una X tiene varias Y, por lo que no es función. -->
- [ ] C) Verificar si la gráfica cruza el eje Y en el origen. <!-- feedback: Incorrecto. Muchas funciones no pasan por el punto (0,0). -->
- [ ] D) Observar si la gráfica es creciente en todo su dominio. <!-- feedback: Incorrecto. Una función puede ser decreciente, constante o cambiar de comportamiento y seguir siendo función. -->

### Explicación Pedagógica
La prueba de la línea vertical es una aplicación geométrica directa de la definición de función: garantiza que cada valor de entrada $x$ tenga una única salida $y$.

---

## Question 3 (Difficulty D4)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Una empresa de mensajería en Cali cobra una tarifa base de $5.000$ pesos por envío más $2.000$ pesos por cada kilogramo de peso del paquete.

### Enunciado
¿Cuál es la función $f(x)$ que representa el costo total del envío en términos del peso $x$ en kilogramos?

### Options
- [ ] A) $f(x) = 5000x + 2000$ <!-- feedback: Incorrecto. Aquí estarías multiplicando la tarifa fija por el peso, lo cual no es lo que dice el enunciado. -->
- [x] B) $f(x) = 2000x + 5000$ <!-- feedback: Correcto. El costo variable ($2.000 por kilo) se multiplica por $x$ y se le suma el costo fijo ($5.000). -->
- [ ] C) $f(x) = 7000x$ <!-- feedback: Incorrecto. Esto asumiría que los $5.000 también dependen del peso, lo cual es falso ya que es una "tarifa base". -->
- [ ] D) $f(x) = 5000 - 2000x$ <!-- feedback: Incorrecto. El costo debe aumentar con el peso, no disminuir. -->

### Explicación Pedagógica
Este es un modelo de función lineal $f(x) = mx + b$, donde $m$ es la pendiente (razón de cambio) y $b$ es el intercepto (valor inicial).

---

## Question 4 (Difficulty D4)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Comunicación y Representación

### Contexto
Se define la función $f(x) = \frac{1}{x-3}$.

### Enunciado
¿Cuál es el dominio de esta función en el conjunto de los números reales?

### Options
- [ ] A) Todos los números reales. <!-- feedback: Incorrecto. Hay un valor de x que hace que el denominador sea cero, lo cual es indefinido. -->
- [ ] B) $\{x \in \mathbb{R} \mid x > 3\}$ <!-- feedback: Incompleto. Los valores menores a 3 también son válidos para esta función. -->
- [x] C) $\{x \in \mathbb{R} \mid x \neq 3\}$ <!-- feedback: Correcto. El único valor que no se puede usar es 3, porque 3-3=0 y la división por cero no existe. -->
- [ ] D) $\{x \in \mathbb{R} \mid x \neq -3\}$ <!-- feedback: Incorrecto. Al sustituir x=-3 el denominador es -6, lo cual es perfectamente válido. -->

### Explicación Pedagógica
El dominio de una función racional está restringido por los valores que anulan el denominador. Identificar estas asíntotas verticales es crucial para el análisis de funciones.

---

## Question 5 (Difficulty D5)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Un tanque de agua en una finca en el Eje Cafetero tiene inicialmente $100$ litros y se llena a una tasa constante de $15$ litros por minuto.

### Enunciado
Si el tanque tiene una capacidad máxima de $1.000$ litros, ¿cuál es el **rango** de la función que describe el volumen de agua $V(t)$ en el tiempo?

### Options
- [ ] A) $[0, 60]$ <!-- feedback: Incorrecto. Este sería aproximadamente el dominio (tiempo), no el rango (volumen). -->
- [ ] B) $[0, 1000]$ <!-- feedback: Incorrecto. Aunque 1.000 es el máximo, el volumen no empieza en 0 sino en 100 litros. -->
- [x] C) $[100, 1000]$ <!-- feedback: Correcto. El volumen mínimo es el inicial (100) y el máximo es la capacidad del tanque (1000). -->
- [ ] D) $[15, 100]$ <!-- feedback: Incorrecto. Estos valores corresponden a la tasa de llenado y al volumen inicial, no definen los límites del rango. -->

### Explicación Pedagógica
El rango representa todos los valores posibles de salida de la función. En problemas aplicados, el rango está limitado por las condiciones físicas del sistema (estado inicial y capacidad máxima).

---

## Question 6 (Difficulty D5)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

### Contexto
Considere la función $f(x) = x^2$. Se aplica una transformación para obtener $g(x) = (x - 4)^2$.

### Enunciado
¿Cómo se desplaza la gráfica de $g(x)$ con respecto a la de $f(x)$?

### Options
- [ ] A) 4 unidades hacia la izquierda. <!-- feedback: Incorrecto. Cuando se resta una constante dentro del argumento (x-c), el desplazamiento es hacia la derecha. -->
- [x] B) 4 unidades hacia la derecha. <!-- feedback: Correcto. Las traslaciones horizontales funcionan con el signo opuesto al esperado dentro del paréntesis. -->
- [ ] C) 4 unidades hacia arriba. <!-- feedback: Incorrecto. Para subir, el 4 debería estar sumando por fuera del paréntesis: x^2 + 4. -->
- [ ] D) 4 unidades hacia abajo. <!-- feedback: Incorrecto. Para bajar, el 4 debería estar restando por fuera del paréntesis: x^2 - 4. -->

### Explicación Pedagógica
Las transformaciones de funciones permiten entender cómo cambios en la ecuación afectan la posición y forma de la gráfica. $f(x-h)$ es una traslación horizontal de $h$ unidades.

---

## Question 7 (Difficulty D5)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Dadas las funciones $f(x) = 2x + 1$ y $g(x) = 3x - 2$.

### Enunciado
¿Cuál es el valor de la función compuesta $(f \circ g)(2)$?

### Options
- [ ] A) 13 <!-- feedback: Incorrecto. Este es el resultado de g(f(2)). -->
- [x] B) 9 <!-- feedback: Correcto. Primero evaluamos g(2) = 3(2)-2 = 4. Luego evaluamos f(4) = 2(4)+1 = 9. -->
- [ ] C) 5 <!-- feedback: Incorrecto. Error en los cálculos intermedios. -->
- [ ] D) 10 <!-- feedback: Incorrecto. Sumaste los resultados de f(2) y g(2) en lugar de componer las funciones. -->

### Explicación Pedagógica
La composición de funciones requiere evaluar la función interna primero y usar ese resultado como entrada para la función externa. El orden de composición es fundamental.

---

## Question 8 (Difficulty D6)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación

### Contexto
Se tiene la gráfica de una función $f(x)$ que pasa por el punto $(2, 5)$. Se define una nueva función $h(x) = 2f(x)$.

### Enunciado
¿Por qué punto pasará necesariamente la gráfica de $h(x)$?

### Options
- [ ] A) $(4, 5)$ <!-- feedback: Incorrecto. La multiplicación externa por 2 afecta a la Y, no a la X. -->
- [x] B) $(2, 10)$ <!-- feedback: Correcto. Al multiplicar toda la función por 2, los valores de salida (Y) se duplican, mientras que la entrada (X) se mantiene igual. -->
- [ ] C) $(2, 7)$ <!-- feedback: Incorrecto. Esto pasaría si estuviéramos sumando 2 a la función, no multiplicando. -->
- [ ] D) $(4, 10)$ <!-- feedback: Incorrecto. Solo se debe ver afectada la coordenada vertical. -->

### Explicación Pedagógica
La multiplicación de una función por una constante $a \cdot f(x)$ produce un estiramiento vertical si $a > 1$. Las coordenadas $(x, y)$ se transforman en $(x, a \cdot y)$.

---

## Question 9 (Difficulty D6)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v9`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentación

### Contexto
Un estudiante en Barranquilla observa que la temperatura $T$ en grados Celsius se puede expresar como una función del tiempo $t$ en horas. Nota que $T(t) = T(-t)$ para todo $t$.

### Enunciado
¿Qué propiedad de simetría tiene la función de temperatura observada por el estudiante?

### Options
- [x] A) Es una función **par**, simétrica respecto al eje Y. <!-- feedback: Correcto. La condición f(x) = f(-x) define a las funciones pares, que son espejos respecto al eje vertical. -->
- [ ] B) Es una función **impar**, simétrica respecto al origen. <!-- feedback: Incorrecto. Las funciones impares cumplen f(-x) = -f(x). -->
- [ ] C) Es una función lineal con pendiente positiva. <!-- feedback: Incorrecto. No hay información que sugiera linealidad, solo simetría. -->
- [ ] D) Es una función periódica. <!-- feedback: Incorrecto. La simetría par no implica necesariamente que la función se repita en ciclos regulares. -->

### Explicación Pedagógica
La paridad es una característica estructural de las funciones que permite simplificar cálculos y entender el comportamiento de la gráfica a ambos lados del eje de ordenadas.

---

## Question 10 (Difficulty D6)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Halla la función inversa $f^{-1}(x)$ para la función $f(x) = \frac{x+1}{2}$.

### Enunciado
¿Cuál es la expresión correcta para la función inversa?

### Options
- [x] A) $f^{-1}(x) = 2x - 1$ <!-- feedback: Correcto. Despejando: y = (x+1)/2 => 2y = x + 1 => x = 2y - 1. Intercambiando variables obtenemos 2x - 1. -->
- [ ] B) $f^{-1}(x) = \frac{2}{x+1}$ <!-- feedback: Incorrecto. Esta es la función recíproca, no la inversa. -->
- [ ] C) $f^{-1}(x) = \frac{x-1}{2}$ <!-- feedback: Incorrecto. Realizaste mal el despeje algebraico. -->
- [ ] D) $f^{-1}(x) = 2x + 1$ <!-- feedback: Incorrecto. Error de signo al pasar el 1 al otro lado de la igualdad. -->

### Explicación Pedagógica
El proceso para encontrar la función inversa consiste en despejar la variable independiente y luego intercambiar los nombres de las variables, reflejando la relación original.

---

## Question 11 (Difficulty D7)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

### Contexto
Un biólogo en el Amazonas modela el crecimiento de una población de insectos con la función $P(t) = 500 \cdot (1,2)^t$, donde $t$ está en semanas.

### Enunciado
¿Cuál es el significado del valor $500$ en este modelo funcional?

### Options
- [ ] A) La tasa de crecimiento semanal. <!-- feedback: Incorrecto. La tasa de crecimiento está dada por la base (1,2), que indica un aumento del 20% semanal. -->
- [x] B) La población inicial al tiempo $t=0$. <!-- feedback: Correcto. Al evaluar P(0) = 500 * (1,2)^0 = 500 * 1 = 500. Es el valor inicial de la función. -->
- [ ] C) El tiempo máximo que sobrevive la población. <!-- feedback: Incorrecto. El modelo no indica un límite de tiempo. -->
- [ ] D) El límite máximo de población que soporta el ecosistema. <!-- feedback: Incorrecto. Este es un modelo exponencial simple, no tiene una asíntota de capacidad de carga. -->

### Explicación Pedagógica
En las funciones exponenciales de la forma $f(t) = A \cdot b^t$, la constante $A$ siempre representa el valor de la función en el origen ($y$-intercepto), interpretado usualmente como el estado inicial.

---

## Question 12 (Difficulty D7)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v12`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Considere la función por partes:
$f(x) = \begin{cases} 2x & \text{si } x < 1 \\ x^2 + 1 & \text{si } x \geq 1 \end{cases}$

### Enunciado
¿Cuál es el valor de $f(0) + f(2)$?

### Options
- [ ] A) 3 <!-- feedback: Incorrecto. Evaluaste mal alguno de los dos valores en el tramo correspondiente. -->
- [x] B) 5 <!-- feedback: Correcto. f(0) se evalúa en el primer tramo: 2(0) = 0. f(2) se evalúa en el segundo tramo: 2^2 + 1 = 5. La suma es 0 + 5 = 5. -->
- [ ] C) 4 <!-- feedback: Incorrecto. Error de cálculo en la evaluación del segundo tramo. -->
- [ ] D) 6 <!-- feedback: Incorrecto. Probablemente evaluaste ambos valores en el segundo tramo. -->

### Explicación Pedagógica
Para evaluar funciones definidas por partes, el primer paso es identificar a qué intervalo pertenece el valor de entrada para seleccionar la regla de correspondencia adecuada.

---

## Question 13 (Difficulty D7)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación

### Contexto
Una función racional $f(x) = \frac{3x - 6}{x + 4}$ tiene una asíntota horizontal.

### Enunciado
¿Cuál es la ecuación de dicha asíntota horizontal?

### Options
- [ ] A) $x = -4$ <!-- feedback: Incorrecto. Esta es la ecuación de la asíntota vertical, donde el denominador se hace cero. -->
- [x] B) $y = 3$ <!-- feedback: Correcto. Para funciones racionales donde el grado del numerador y denominador es igual, la AH es el cociente de los coeficientes principales (3/1). -->
- [ ] C) $y = -6/4$ <!-- feedback: Incorrecto. Este valor corresponde al intercepto con el eje Y, no a la asíntota horizontal. -->
- [ ] D) $y = 0$ <!-- feedback: Incorrecto. Esto solo ocurre si el grado del denominador es mayor que el del numerador. -->

### Explicación Pedagógica
Las asíntotas horizontales describen el comportamiento de la función a largo plazo (cuando $x$ tiende a infinito). Son fundamentales para entender los límites del rango en funciones racionales.

---

## Question 14 (Difficulty D8)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v14`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Un estudiante afirma que toda función inyectiva debe ser necesariamente una función creciente en todo su dominio.

### Enunciado
¿Es verdadera la afirmación del estudiante? Proporcione una justificación.

### Options
- [ ] A) Sí, porque si no crece, los valores de Y se repetirían. <!-- feedback: Incorrecto. Una función puede ser decreciente y ser inyectiva (no repite valores de Y). -->
- [x] B) No, porque una función estrictamente decreciente también es inyectiva. <!-- feedback: Correcto. La inyectividad solo requiere que cada X tenga una Y única; la monotonicidad (crecer o decrecer) garantiza esto. -->
- [ ] C) Sí, por la prueba de la línea horizontal. <!-- feedback: Incorrecto. La prueba de la línea horizontal valida la inyectividad, pero no exige crecimiento. -->
- [ ] D) No, porque las funciones constantes son inyectivas. <!-- feedback: Incorrecto. Las funciones constantes NO son inyectivas (todos los valores de X tienen la misma Y). -->

### Explicación Pedagógica
La inyectividad está ligada a la monotonicidad estricta. Una función que siempre crece o siempre decrece pasará la prueba de la línea horizontal, cumpliendo con ser uno a uno.

---

## Question 15 (Difficulty D8)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v15`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Determine el dominio de la función $f(x) = \sqrt{25 - x^2}$.

### Enunciado
¿Cuál es el intervalo de valores permitidos para $x$?

### Options
- [ ] A) $(-\infty, 25]$ <!-- feedback: Incorrecto. Por ejemplo, si x=10, el resultado bajo la raíz sería negativo. -->
- [x] B) $[-5, 5]$ <!-- feedback: Correcto. El radicando debe ser mayor o igual a cero: 25 - x^2 >= 0 => x^2 <= 25 => |x| <= 5. -->
- [ ] C) $[0, 5]$ <!-- feedback: Incompleto. Los valores negativos entre -5 y 0 también son válidos ya que al elevarlos al cuadrado se vuelven positivos. -->
- [ ] D) $(-\infty, \infty)$ <!-- feedback: Incorrecto. Esta función tiene restricciones claras para evitar números imaginarios. -->

### Explicación Pedagógica
En funciones con raíces cuadradas, el conjunto de números permitidos (dominio) está definido por la inecuación que garantiza que el interior de la raíz sea no negativo.

---

## Question 16 (Difficulty D8)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Una función $f(x)$ tiene como dominio el intervalo $[0, 10]$. Se define una nueva función $g(x) = f(2x)$.

### Enunciado
¿Cuál es el dominio de la nueva función $g(x)$?

### Options
- [ ] A) $[0, 20]$ <!-- feedback: Incorrecto. Multiplicar por 2 dentro del argumento produce una compresión horizontal, no una expansión. -->
- [x] B) $[0, 5]$ <!-- feedback: Correcto. Para que 2x esté entre 0 y 10, x debe estar entre 0 y 5. La gráfica se comprime a la mitad. -->
- [ ] C) $[0, 10]$ <!-- feedback: Incorrecto. El dominio debe cambiar debido a la transformación de la variable independiente. -->
- [ ] D) $[2, 12]$ <!-- feedback: Incorrecto. Esto correspondería a una traslación, no a un cambio de escala. -->

### Explicación Pedagógica
Las transformaciones dentro del argumento $f(c \cdot x)$ afectan horizontalmente a la función. Si $c > 1$, la gráfica se comprime hacia el eje Y por un factor de $1/c$.

---

## Question 17 (Difficulty D9)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Dada la función racional $f(x) = \frac{x^2 - 9}{x - 3}$.

### Enunciado
¿Cuál es la diferencia fundamental entre el comportamiento de esta función en $x = 3$ comparada con una función que tiene una asíntota vertical en ese mismo punto?

### Options
- [ ] A) No hay diferencia, ambas son indefinidas. <!-- feedback: Aunque ambas son indefinidas, el tipo de discontinuidad es radicalmente distinto. -->
- [x] B) Esta función tiene un **hueco (punto vacío)**, mientras que la otra tiende al infinito. <!-- feedback: Correcto. Al simplificar (x-3)(x+3)/(x-3) queda x+3. El factor se cancela, eliminando la asíntota pero dejando un hueco. -->
- [ ] C) Esta función es continua en x = 3. <!-- feedback: Incorrecto. Sigue siendo indefinida en el punto original porque el denominador se anula. -->
- [ ] D) Esta función tiene una asíntota horizontal en y = 3. <!-- feedback: Incorrecto. El comportamiento en un punto específico x=3 define discontinuidades locales, no asíntotas horizontales. -->

### Explicación Pedagógica
Las discontinuidades evitables (huecos) ocurren cuando un factor se cancela entre el numerador y el denominador. Visualmente es un punto faltante en una línea continua, no un salto al infinito.

---

## Question 18 (Difficulty D9)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v18`
**Bloom:** Evaluate
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Un sistema de control de temperatura industrial en Medellín sigue la función $T(t) = A + B \cos(Ct)$.

### Enunciado
¿Qué propiedad de las funciones trigonométricas permite que este modelo sea útil para describir procesos que se repiten diariamente?

### Options
- [ ] A) Su dominio es limitado. <!-- feedback: Incorrecto. El dominio de la función coseno es todos los reales. -->
- [x] B) Su **periodicidad**. <!-- feedback: Correcto. Las funciones trigonométricas repiten sus valores en intervalos regulares, ideal para ciclos de 24 horas. -->
- [ ] C) Que siempre son positivas. <!-- feedback: Incorrecto. Las funciones seno y coseno oscilan entre valores positivos y negativos. -->
- [ ] D) Su crecimiento exponencial. <!-- feedback: Incorrecto. Son funciones acotadas, no crecen indefinidamente. -->

### Explicación Pedagógica
La periodicidad es la característica clave de las funciones que modelan fenómenos cíclicos (clima, mareas, ritmos biológicos). El parámetro $C$ ajusta el periodo al ciclo deseado.

---

## Question 19 (Difficulty D10)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v19`
**Bloom:** Create
**ICFES:** Formulación y Ejecución

### Contexto
Encuentre la función inversa de $f(x) = \frac{e^x}{1 + e^x}$.

### Enunciado
¿Cuál es la expresión resultante para $f^{-1}(x)$?

### Options
- [x] A) $f^{-1}(x) = \ln(\frac{x}{1-x})$ <!-- feedback: Correcto. Al despejar x se llega a e^x = y/(1-y), y al aplicar logaritmo natural se obtiene el resultado. -->
- [ ] B) $f^{-1}(x) = e^x + 1$ <!-- feedback: Incorrecto. La inversa de una función exponencial suele involucrar logaritmos. -->
- [ ] C) $f^{-1}(x) = \frac{1+e^x}{e^x}$ <!-- feedback: Incorrecto. Esta es la función recíproca. -->
- [ ] D) $f^{-1}(x) = \ln(x + 1)$ <!-- feedback: Incorrecto. No captura la estructura de la función original en el despeje. -->

### Explicación Pedagógica
Invertir funciones que mezclan términos exponenciales requiere un manejo algebraico avanzado de logaritmos y la resolución de ecuaciones donde la variable de interés está "atrapada" en el exponente.

---

## Question 20 (Difficulty D10)

**ID:** `CO-MAT-11-P1-funciones-001-MASTERY-v20`
**Bloom:** Create
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Un diseñador de software quiere crear una función que transforme una entrada de datos $x$ de tal manera que cualquier valor negativo se convierta en cero, y cualquier valor positivo se mantenga igual.

### Enunciado
¿Cuál de las siguientes combinaciones de funciones básicas modela exactamente este comportamiento (conocido como función ReLU en inteligencia artificial)?

### Options
- [ ] A) $f(x) = |x|$ <!-- feedback: Incorrecto. Esto convertiría los negativos en positivos, no en cero. -->
- [x] B) $f(x) = \frac{x + |x|}{2}$ <!-- feedback: Correcto. Si x es negativo, x + (-x) = 0. Si x es positivo, x + x = 2x, que al dividir por 2 da x. -->
- [ ] C) $f(x) = x^2$ <!-- feedback: Incorrecto. Esto hace que todos los valores sean positivos y cambia su magnitud original. -->
- [ ] D) $f(x) = \sqrt{x}$ <!-- feedback: Incorrecto. Esto dejaría a los números negativos fuera del dominio (indefinidos), no los convertiría en cero. -->

### Explicación Pedagógica
Este problema reta al estudiante a construir una función compleja (por partes) utilizando operaciones aritméticas y funciones elementales como el valor absoluto, demostrando una comprensión profunda de sus propiedades.
