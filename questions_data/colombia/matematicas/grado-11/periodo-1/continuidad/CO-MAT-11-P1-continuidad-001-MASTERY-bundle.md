---
id: "CO-MAT-11-P1-continuidad-001-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "continuidad"
periodo: 1
protocol_version: "5.1"
bundle_index: 1
bundle_size: 20
alignment: "ICFES Saber 11 + MEN"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: 0.55
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "definicion_continuidad, tipos_discontinuidad, teorema_valor_intermedio"
---

# Bundle Mastery: Continuidad de Funciones

Este bundle explora el concepto de continuidad matemática, definiendo las condiciones necesarias para que una función sea continua en un punto o en un intervalo, clasificando los diferentes tipos de discontinuidades y aplicando teoremas fundamentales como el del Valor Intermedio.

---

## Question 1 (Difficulty D3)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comunicación y Representación

### Contexto
Un profesor de matemáticas en Cali explica que una función es continua "si se puede dibujar sin levantar el lápiz del papel".

### Enunciado
¿Cuál de las siguientes es una de las tres condiciones FORMALES para que una función sea continua en un punto $x = a$?

### Options
- [ ] A) La función debe ser siempre creciente. <!-- feedback: Incorrecto. La continuidad no depende de la dirección de crecimiento. -->
- [x] B) El límite $\lim_{x \to a} f(x)$ debe existir y ser igual a $f(a)$. <!-- feedback: Correcto. Esta condición integra la existencia del límite, la definición de la función y la igualdad entre ambas. -->
- [ ] C) La función debe tener una asíntota horizontal. <!-- feedback: Incorrecto. Las asíntotas suelen estar ligadas a discontinuidades o comportamientos infinitos, no a la continuidad local. -->
- [ ] D) El valor de $f(a)$ debe ser igual a cero. <!-- feedback: Incorrecto. La función puede ser continua en cualquier valor de y. -->

### Explicación Pedagógica
La continuidad formal requiere: 1) que $f(a)$ esté definido, 2) que el límite exista, y 3) que ambos valores coincidan.

---

## Question 2 (Difficulty D3)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentación

### Contexto
Observe una función que presenta un salto brusco de altura en $x = 3$. Por la izquierda la altura es $5$ y por la derecha es $10$.

### Enunciado
¿Qué tipo de discontinuidad presenta la función en este punto?

### Options
- [ ] A) Discontinuidad evitable (hueco). <!-- feedback: Incorrecto. Un hueco ocurre cuando los límites laterales son iguales pero la función no está definida o está en otro punto. -->
- [x] B) Discontinuidad de salto (inevitable). <!-- feedback: Correcto. Cuando los límites laterales existen pero son diferentes, se produce un escalón o salto en la gráfica. -->
- [ ] C) Discontinuidad infinita. <!-- feedback: Incorrecto. Ninguno de los límites laterales tiende a infinito en este caso. -->
- [ ] D) La función es continua. <!-- feedback: Incorrecto. Existe una ruptura clara en el trazo de la función. -->

### Explicación Pedagógica
Las discontinuidades de salto son típicas de las funciones por partes donde los tramos no "empalman" correctamente en el punto de unión.

---

## Question 3 (Difficulty D4)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Dada la función $f(x) = \frac{x^2 - 16}{x - 4}$.

### Enunciado
¿En qué valor de $x$ la función NO es continua?

### Options
- [ ] A) $x = -4$ <!-- feedback: Incorrecto. f(-4) = 0/-8 = 0. La función es continua allí. -->
- [x] B) $x = 4$ <!-- feedback: Correcto. El denominador se hace cero, lo que impide que la función esté definida en ese punto, rompiendo la primera condición de continuidad. -->
- [ ] C) $x = 0$ <!-- feedback: Incorrecto. f(0) = 4, punto definido y continuo. -->
- [ ] D) En ningún punto, es siempre continua. <!-- feedback: Incorrecto. Presenta una restricción clara en el dominio. -->

### Explicación Pedagógica
Las funciones racionales son discontinuas en todos los puntos donde el denominador se anula, ya que la función no está definida en esos valores.

---

## Question 4 (Difficulty D4)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Comunicación y Representación

### Contexto
Una función tiene una asíntota vertical en $x = -2$.

### Enunciado
¿Qué tipo de discontinuidad tiene la función en ese punto?

### Options
- [ ] A) Evitable. <!-- feedback: Incorrecto. Una asíntota no se puede "evitar" o rellenar con un solo punto. -->
- [ ] B) De salto. <!-- feedback: Incorrecto. El salto implica límites laterales finitos. -->
- [x] C) Infinita. <!-- feedback: Correcto. Si hay una asíntota vertical, los valores de la función crecen o decrecen sin límite, lo que define una discontinuidad infinita. -->
- [ ] D) No es una discontinuidad. <!-- feedback: Incorrecto. Toda asíntota vertical marca una ruptura en la continuidad de la función. -->

### Explicación Pedagógica
Las discontinuidades infinitas son aquellas donde al menos uno de los límites laterales de la función tiende a más o menos infinito.

---

## Question 5 (Difficulty D5)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Sea $f(x) = \begin{cases} 2x + 1 & \text{si } x < 3 \\ x + 4 & \text{si } x \geq 3 \end{cases}$.

### Enunciado
¿Es la función continua en $x = 3$?

### Options
- [x] A) Sí, porque ambos límites laterales son iguales a $7$ y $f(3) = 7$. <!-- feedback: Correcto. Límite izquierdo: 2(3)+1=7. Límite derecho: 3+4=7. f(3)=7. Se cumplen todas las condiciones. -->
- [ ] B) No, porque es una función por partes. <!-- feedback: Incorrecto. Ser una función por partes no impide la continuidad si los tramos se unen correctamente. -->
- [ ] C) No, porque el límite por la izquierda es diferente al de la derecha. <!-- feedback: Incorrecto. Ambos límites dan el mismo resultado (7). -->
- [ ] D) Sí, porque $f(3)$ está definido. <!-- feedback: Incompleto. Que esté definido es necesario pero no suficiente; los límites también deben coincidir. -->

### Explicación Pedagógica
La continuidad en funciones por partes se verifica igualando los límites laterales en los puntos de cambio de definición.

---

## Question 6 (Difficulty D5)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

### Contexto
El Teorema del Valor Intermedio establece que si una función es continua en $[a, b]$ y $k$ es un valor entre $f(a)$ y $f(b)$, entonces existe al menos un $c$ en $(a, b)$ tal que $f(c) = k$.

### Enunciado
¿Cuál de las siguientes es una aplicación práctica de este teorema?

### Options
- [ ] A) Hallar la pendiente de una recta. <!-- feedback: Incorrecto. No tiene relación directa con el teorema. -->
- [x] B) Demostrar que una ecuación tiene al menos una solución (raíz) en un intervalo. <!-- feedback: Correcto. Si f(a) es negativo y f(b) es positivo, por el teorema debe haber un punto donde f(c) = 0. -->
- [ ] C) Calcular el límite al infinito de una función. <!-- feedback: Incorrecto. El teorema se aplica a intervalos cerrados y finitos. -->
- [ ] D) Determinar la ecuación de una asíntota. <!-- feedback: Incorrecto. El teorema requiere continuidad, mientras que las asíntotas implican discontinuidad. -->

### Explicación Pedagógica
El Teorema del Valor Intermedio es una herramienta de existencia. Garantiza que una función continua "pasa" por todos los valores intermedios de su rango sin saltarse ninguno.

---

## Question 7 (Difficulty D5)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Un proceso de fabricación de cemento en Boyacá tiene una temperatura que sigue la función $T(t) = \frac{t^2 - 9}{t - 3}$ (en grados Celsius). El operario sabe que la función tiene una discontinuidad en $t = 3$.

### Enunciado
¿Qué valor de temperatura debería asignarse artificialmente a $t=3$ para "rellenar" el hueco y hacer que el proceso sea continuo?

### Options
- [ ] A) $0$ grados. <!-- feedback: Incorrecto. Este es el resultado del numerador, no el valor del límite. -->
- [ ] B) $3$ grados. <!-- feedback: Incorrecto. Este es el tiempo, no la temperatura. -->
- [x] C) $6$ grados. <!-- feedback: Correcto. El límite de la función simplificada (t+3) cuando t tiende a 3 es 6. Redefiniendo f(3)=6 la función se vuelve continua. -->
- [ ] D) Ninguno, es una discontinuidad infinita. <!-- feedback: Incorrecto. Es una discontinuidad evitable porque el factor (t-3) se cancela. -->

### Explicación Pedagógica
Las discontinuidades evitables se pueden "reparar" redefiniendo el valor de la función en el punto de interés para que coincida con el valor del límite.

---

## Question 8 (Difficulty D6)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación

### Contexto
Observe la función $f(x) = \frac{1}{x^2}$.

### Enunciado
¿Cuál es el comportamiento de la continuidad en el intervalo $(-1, 1)$?

### Options
- [ ] A) Es continua en todo el intervalo. <!-- feedback: Incorrecto. Presenta un problema grave en el centro del intervalo. -->
- [x] B) Es discontinua en $x = 0$ debido a una asíntota vertical. <!-- feedback: Correcto. La función no está definida en 0 y tiende a infinito, por lo que es discontinua allí. -->
- [ ] C) Es discontinua en $x = 1$ y $x = -1$. <!-- feedback: Incorrecto. En los extremos la función está definida y es continua. -->
- [ ] D) Tiene una discontinuidad evitable en $x = 0$. <!-- feedback: Incorrecto. El límite es infinito, no se puede rellenar con un punto. -->

### Explicación Pedagógica
La continuidad en un intervalo requiere que la función sea continua en cada uno de los puntos que lo integran. Un solo punto de discontinuidad invalida la continuidad del intervalo completo.

---

## Question 9 (Difficulty D6)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v9`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentación

### Contexto
Se afirma que la función $f(x) = \sin(x)$ es continua en todo el conjunto de los números reales.

### Enunciado
¿Qué propiedad geométrica de la gráfica del seno respalda esta afirmación?

### Options
- [ ] A) Se repite cada $2\pi$ unidades. <!-- feedback: Incorrecto. La periodicidad no garantiza la continuidad (ej. la función tangente). -->
- [x] B) Su trazo es una curva suave y sin interrupciones ni saltos en toda la recta numérica. <!-- feedback: Correcto. La función seno está definida para todo x y su límite siempre coincide con su valor. -->
- [ ] C) Nunca es mayor que 1 ni menor que -1. <!-- feedback: Incorrecto. Estar acotada no implica ser continua. -->
- [ ] D) Cruza el eje X infinitas veces. <!-- feedback: Incorrecto. Tener raíces no tiene relación directa con la continuidad. -->

### Explicación Pedagógica
Las funciones trigonométricas seno y coseno son ejemplos clásicos de funciones continuas globales, fundamentales para modelar ondas y ciclos naturales sin rupturas.

---

## Question 10 (Difficulty D6)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Dada la función $f(x) = \lfloor x \rfloor$ (función parte entera o mayor entero menor o igual a $x$).

### Enunciado
¿En qué conjunto de valores presenta esta función sus discontinuidades?

### Options
- [ ] A) En $x = 0$ solamente. <!-- feedback: Incompleto. -->
- [x] B) En todos los números enteros ($\mathbb{Z}$). <!-- feedback: Correcto. En cada número entero la función da un salto de unidad, por lo que los límites laterales no coinciden. -->
- [ ] C) En todos los números reales. <!-- feedback: Incorrecto. Entre dos enteros la función es constante y por tanto continua. -->
- [ ] D) En los números irracionales. <!-- feedback: Incorrecto. En los irracionales la función es constante localmente y continua. -->

### Explicación Pedagógica
La función parte entera es el ejemplo por excelencia de una función con infinitas discontinuidades de salto, situadas exactamente en los valores enteros del dominio.

---

## Question 11 (Difficulty D7)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Sea $f(x) = \begin{cases} a x^2 + 1 & \text{si } x \leq 1 \\ 3x - 1 & \text{si } x > 1 \end{cases}$.

### Enunciado
¿Qué valor debe tomar la constante $a$ para que la función sea continua en $x = 1$?

### Options
- [ ] A) $a = 2$ <!-- feedback: Incorrecto. Sustituyendo daría 3 en el primer tramo y 2 en el segundo. -->
- [x] B) $a = 1$ <!-- feedback: Correcto. Tramo 1: a(1)^2 + 1 = a + 1. Tramo 2: 3(1) - 1 = 2. Para continuidad a + 1 = 2 => a = 1. -->
- [ ] C) $a = 3$ <!-- feedback: Incorrecto. No igualaría los límites laterales. -->
- [ ] D) $a = 0$ <!-- feedback: Incorrecto. Resultaría en 1 != 2. -->

### Explicación Pedagógica
Los problemas de "ajuste de parámetros" para asegurar continuidad son comunes en ingeniería para garantizar que las transiciones entre estados de un sistema sean suaves.

---

## Question 12 (Difficulty D7)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Se sabe que $f(1) = -5$ y $f(4) = 10$. La función es continua en el intervalo $[1, 4]$.

### Enunciado
Según el Teorema del Valor Intermedio, ¿podemos asegurar que existe un valor $c$ tal que $f(c) = 0$?

### Options
- [x] A) Sí, porque el 0 está entre -5 y 10, y la función es continua. <!-- feedback: Correcto. Al cambiar de signo y ser continua, la función debe cruzar obligatoriamente el eje X en algún punto del intervalo. -->
- [ ] B) No, el teorema no garantiza el paso por el cero. <!-- feedback: Incorrecto. El cero es un valor intermedio válido. -->
- [ ] C) Solo si la función es una línea recta. <!-- feedback: Incorrecto. El teorema se aplica a cualquier función continua, sea recta o curva. -->
- [ ] D) Sí, y el valor de c debe ser exactamente $2.5$. <!-- feedback: Incorrecto. El teorema asegura la existencia, pero no da el valor exacto de c (a menos que conozcamos la fórmula). -->

### Explicación Pedagógica
El Teorema de Bolzano es un caso especial del Teorema del Valor Intermedio que se utiliza para confirmar la existencia de raíces en intervalos donde la función cambia de signo.

---

## Question 13 (Difficulty D7)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v13`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Determine los puntos de discontinuidad de $f(x) = \frac{x+2}{x^2 - 4}$.

### Enunciado
¿Cuál es la clasificación correcta de estos puntos?

### Options
- [ ] A) Asíntotas verticales en $x=2$ y $x=-2$. <!-- feedback: Incorrecto. Uno de los puntos es un hueco. -->
- [x] B) Hueco en $x=-2$, Asíntota vertical en $x=2$. <!-- feedback: Correcto. El factor (x+2) se cancela produciendo un hueco. El factor (x-2) queda en el denominador produciendo la asíntota. -->
- [ ] C) Hueco en $x=2$, Asíntota vertical en $x=-2$. <!-- feedback: Incorrecto. Error en la identificación del factor cancelado. -->
- [ ] D) Ambos son huecos. <!-- feedback: Incorrecto. Solo un factor es común al numerador. -->

### Explicación Pedagógica
La clasificación de discontinuidades en funciones racionales depende de si los ceros del denominador se cancelan o no con factores del numerador.

---

## Question 14 (Difficulty D8)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación

### Contexto
Una función $f(x)$ cumple que $\lim_{x \to a} f(x) = L$, pero $f(a)$ no está definido.

### Enunciado
¿Qué tipo de discontinuidad tiene y cómo se puede clasificar según su naturaleza?

### Options
- [ ] A) Discontinuidad de salto, es inevitable. <!-- feedback: Incorrecto. El límite existe, por lo que no hay salto. -->
- [x] B) Discontinuidad evitable, porque el límite existe y es finito. <!-- feedback: Correcto. Se llama evitable porque bastaría con definir f(a) = L para que la función fuera continua en ese punto. -->
- [ ] C) Discontinuidad infinita. <!-- feedback: Incorrecto. El límite es L, un valor finito, no infinito. -->
- [ ] D) La función es continua a pesar de no estar definida. <!-- feedback: Incorrecto. Estar definida es la primera condición indispensable para la continuidad. -->

### Explicación Pedagógica
La existencia de un límite finito en un punto donde la función falla es el rasgo distintivo de las discontinuidades evitables (huecos).

---

## Question 15 (Difficulty D8)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v15`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Se define $f(x) = \frac{\sin(x)}{x}$ para $x \neq 0$.

### Enunciado
¿Qué valor se debe asignar a $f(0)$ para que la función sea continua en el origen?

### Options
- [ ] A) $0$ <!-- feedback: Incorrecto. El límite no es cero. -->
- [x] B) $1$ <!-- feedback: Correcto. El límite fundamental trigonométrico establece que el límite de sin(x)/x cuando x tiende a 0 es 1. Por tanto, definiendo f(0)=1 la función es continua. -->
- [ ] C) $\pi$ <!-- feedback: Incorrecto. No corresponde al valor del límite. -->
- [ ] D) No se puede hacer continua. <!-- feedback: Incorrecto. Es un ejemplo clásico de discontinuidad evitable. -->

### Explicación Pedagógica
Incluso funciones trigonométricas complejas pueden presentar huecos que se resuelven mediante el conocimiento de límites fundamentales.

---

## Question 16 (Difficulty D8)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Un sistema de control de un ascensor en Bogotá usa una función de velocidad $v(t)$ que debe ser continua para evitar sacudidas bruscas a los pasajeros.

### Enunciado
Si la velocidad se define por tramos para aceleración, velocidad constante y frenado, ¿qué requisito físico se está cumpliendo al exigir continuidad matemática?

### Options
- [ ] A) Que el ascensor siempre se mueva a la misma velocidad. <!-- feedback: Incorrecto. El ascensor cambia su velocidad. -->
- [x] B) Que no haya cambios instantáneos de velocidad que impliquen aceleraciones infinitas. <!-- feedback: Correcto. Un salto en la velocidad (discontinuidad) implicaría una fuerza infinita en un tiempo cero, lo cual es físicamente imposible y peligroso. -->
- [ ] C) Que el ascensor nunca se detenga. <!-- feedback: Incorrecto. El ascensor debe detenerse en los pisos. -->
- [ ] D) Que la velocidad sea siempre positiva. <!-- feedback: Incorrecto. La velocidad puede ser negativa si baja, y seguir siendo continua. -->

### Explicación Pedagógica
La continuidad en física es un reflejo de la ley de inercia y la limitación de las fuerzas. Los modelos matemáticos continuos son esenciales para describir movimientos realistas.

---

## Question 17 (Difficulty D9)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Considere la función $f(x) = \sin(1/x)$ en la vecindad de $x = 0$.

### Enunciado
¿Por qué esta función presenta una discontinuidad inevitable de tipo oscilatorio en el origen?

### Options
- [ ] A) Porque tiende a infinito. <!-- feedback: Incorrecto. El seno siempre está entre -1 y 1. -->
- [x] B) Porque el límite no existe debido a que la función oscila infinitamente rápido entre -1 y 1 al acercarse a cero. <!-- feedback: Correcto. No se estabiliza en ningún valor, por lo que el límite no existe. -->
- [ ] C) Porque el valor en el origen es demasiado grande. <!-- feedback: Incorrecto. La función simplemente no está definida y no tiene tendencia fija. -->
- [ ] D) Porque tiene un hueco que se puede rellenar. <!-- feedback: Incorrecto. Al no existir el límite, la discontinuidad no es evitable. -->

### Explicación Pedagógica
Las discontinuidades oscilatorias son casos especiales donde la falta de límite no se debe a un salto o a un infinito, sino a una inestabilidad infinita en el valor de la función cerca del punto.

---

## Question 18 (Difficulty D9)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v18`
**Bloom:** Create
**ICFES:** Formulación y Ejecución

### Contexto
Halla los valores de $a$ y $b$ para que $f(x) = \begin{cases} x + 1 & \text{si } x < 1 \\ ax + b & \text{si } 1 \leq x < 2 \\ 3x & \text{si } x \geq 2 \end{cases}$ sea continua en todos los reales.

### Enunciado
¿Cuál es el sistema de ecuaciones resultante y sus soluciones?

### Options
- [x] A) $a+b=2$ y $2a+b=6$. Solución: $a=4, b=-2$. <!-- feedback: Correcto. En x=1: 1+1=a(1)+b => a+b=2. En x=2: a(2)+b=3(2) => 2a+b=6. Restando: a=4. Luego b=-2. -->
- [ ] B) $a+b=1$ y $2a+b=3$. Solución: $a=2, b=-1$. <!-- feedback: Incorrecto. Errores en el planteamiento de los límites laterales. -->
- [ ] C) $a=3, b=0$. <!-- feedback: Incorrecto. No satisface la unión en el primer punto (x=1). -->
- [ ] D) $a=1, b=1$. <!-- feedback: Incorrecto. Solo satisface la unión en el primer punto, pero no en el segundo (x=2). -->

### Explicación Pedagógica
La continuidad en múltiples puntos de unión genera un sistema de ecuaciones lineales que debe resolverse simultáneamente para hallar los parámetros que garantizan la suavidad de toda la curva.

---

## Question 19 (Difficulty D10)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
El Teorema del Valor Intermedio requiere que la función sea continua. Suponga que una función $f(x)$ tiene una discontinuidad de salto en el intervalo $[a, b]$.

### Enunciado
¿Qué consecuencia tiene esto respecto a la garantía de encontrar un valor $c$ tal que $f(c) = k$?

### Options
- [ ] A) Ninguna, el teorema sigue funcionando. <!-- feedback: Incorrecto. La continuidad es una hipótesis necesaria del teorema. -->
- [x] B) Se pierde la garantía; la función podría "saltarse" el valor $k$ sin pasar por él. <!-- feedback: Correcto. Al haber un salto, la función puede pasar de un valor menor a k a uno mayor a k instantáneamente sin tocar nunca el valor k. -->
- [ ] C) El valor c existirá pero será único. <!-- feedback: Incorrecto. Podría no existir en absoluto. -->
- [ ] D) Solo se puede asegurar si k es un número entero. <!-- feedback: Incorrecto. La naturaleza del valor k no compensa la falta de continuidad. -->

### Explicación Pedagógica
Este problema enfatiza la importancia de las hipótesis en los teoremas matemáticos. La continuidad es lo que "conecta" los valores del rango, asegurando que no queden huecos en la imagen.

---

## Question 20 (Difficulty D10)

**ID:** `CO-MAT-11-P1-continuidad-001-MASTERY-v20`
**Bloom:** Create
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Diseñe una función que tenga una discontinuidad evitable en $x = 0$, una discontinuidad de salto en $x = 2$ y una discontinuidad infinita en $x = 4$.

### Enunciado
¿Cuál de las siguientes propuestas cumple con este diseño de ingeniería de funciones?

### Options
- [x] A) Una función por partes que use $\frac{x}{x}$ en el primer tramo, cambie de valor bruscamente en 2, y tenga un denominador $(x-4)$ en el tramo final. <!-- feedback: Correcto. x/x tiene hueco en 0. El cambio de tramo en 2 genera el salto. El denominador (x-4) genera la asíntota infinita. -->
- [ ] B) $f(x) = \frac{1}{x(x-2)(x-4)}$ <!-- feedback: Incorrecto. Esta función tendría tres asíntotas infinitas, no cumpliría los otros tipos de discontinuidad. -->
- [ ] C) $f(x) = \sin(x) / x$ <!-- feedback: Incorrecto. Solo tiene la discontinuidad evitable en 0. -->
- [ ] D) $f(x) = |x - 2|$ <!-- feedback: Incorrecto. Esta función es continua en todos los puntos, solo tiene un cambio de pendiente (pico). -->

### Explicación Pedagógica
La síntesis de funciones con comportamientos específicos de discontinuidad es el nivel más alto de comprensión del análisis de funciones, permitiendo crear modelos que representan fallas, cambios de fase o límites críticos.
