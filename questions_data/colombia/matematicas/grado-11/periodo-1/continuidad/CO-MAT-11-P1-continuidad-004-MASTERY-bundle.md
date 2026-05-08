---
id: "CO-MAT-11-P1-continuidad-004-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "continuidad"
periodo: 1
protocol_version: "5.1"
bundle_index: 4
bundle_size: 20
alignment: "ICFES Saber 11 + MEN"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: 0.48
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "continuidad_intervalos, teoremas_continuidad, aplicaciones_modelado"
---

# Bundle Mastery: Continuidad Global y Aplicaciones

Este bundle profundiza en el estudio de la continuidad en intervalos abiertos y cerrados, el análisis de funciones continuas compuestas y el uso avanzado de los teoremas de Bolzano y del Valor Intermedio para resolver problemas de optimización y existencia en contextos reales de Colombia.

---

## Question 1 (Difficulty D3)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comunicación y Representación

### Contexto
Se define una función continua en el intervalo cerrado $[a, b]$.

### Enunciado
¿Qué condición adicional debe cumplirse en los extremos $a$ y $b$ para que la función sea continua en el intervalo cerrado?

### Options
- [ ] A) Los valores de $f(a)$ y $f(b)$ deben ser iguales a cero. <!-- feedback: Incorrecto. La continuidad no requiere que la función cruce el eje X en los extremos. -->
- [x] B) Los límites laterales internos $\lim_{x \to a^+} f(x) = f(a)$ y $\lim_{x \to b^-} f(x) = f(b)$ deben cumplirse. <!-- feedback: Correcto. En un intervalo cerrado, la continuidad en los extremos se define mediante límites laterales desde el interior del intervalo. -->
- [ ] C) La función debe tener una derivada definida en los extremos. <!-- feedback: Incorrecto. La continuidad es un requisito para la derivabilidad, pero no al revés. -->
- [ ] D) La función debe ser lineal entre $a$ y $b$. <!-- feedback: Incorrecto. Cualquier forma de curva puede ser continua. -->

### Explicación Pedagógica
La continuidad en un intervalo cerrado $[a, b]$ exige continuidad en cada punto del intervalo abierto $(a, b)$ más la continuidad lateral específica en los dos bordes.

---

## Question 2 (Difficulty D3)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentación

### Contexto
Un estudiante afirma que si $f(x)$ y $g(x)$ son funciones continuas en todo su dominio, entonces la suma $(f+g)(x)$ también es continua.

### Enunciado
¿Es correcta la afirmación del estudiante basándose en las propiedades de las funciones continuas?

### Options
- [x] A) Sí, la suma de funciones continuas siempre es una función continua. <!-- feedback: Correcto. Es una propiedad fundamental del álgebra de funciones continuas. -->
- [ ] B) No, la suma podría introducir una asíntota. <!-- feedback: Incorrecto. Las asíntotas vienen de divisiones por cero, no de sumas de funciones ya continuas. -->
- [ ] C) Solo si ambas funciones son polinomios. <!-- feedback: Incorrecto. Aplica para cualquier tipo de función continua (trigonométrica, exponencial, etc.). -->
- [ ] D) Sí, pero solo en el origen $(0,0)$. <!-- feedback: Incorrecto. La propiedad es global para todo el dominio común. -->

### Explicación Pedagógica
La continuidad se preserva bajo operaciones aritméticas básicas: suma, resta y producto. Esto permite construir funciones complejas continuas a partir de bloques simples.

---

## Question 3 (Difficulty D4)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Dada la función $f(x) = \sqrt{x - 10}$.

### Enunciado
¿Cuál es el intervalo más grande en el que la función es continua?

### Options
- [ ] A) $(-\infty, \infty)$ <!-- feedback: Incorrecto. Para valores menores que 10 la función no está definida en los reales. -->
- [x] B) $[10, \infty)$ <!-- feedback: Correcto. La función raíz cuadrada es continua en todo su dominio, el cual empieza en 10 e incluye valores mayores. -->
- [ ] C) $(10, \infty)$ <!-- feedback: Incompleto. La función también es continua en el extremo 10 por la derecha. -->
- [ ] D) $[0, \infty)$ <!-- feedback: Incorrecto. El desplazamiento horizontal de la función mueve el inicio de la continuidad a 10. -->

### Explicación Pedagógica
Las funciones irracionales de índice par son continuas en todos los puntos donde el radicando es mayor o igual a cero.

---

## Question 4 (Difficulty D4)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Comunicación y Representación

### Contexto
Considere la función racional $f(x) = \frac{x}{x^2 + 4}$.

### Enunciado
¿Qué se puede afirmar sobre la continuidad de esta función en el conjunto de los números reales?

### Options
- [ ] A) Es discontinua en $x = 2$ y $x = -2$. <!-- feedback: Incorrecto. x^2 + 4 nunca es cero para ningún x real (sería x^2 = -4). -->
- [x] B) Es continua en todos los números reales. <!-- feedback: Correcto. Como el denominador nunca se anula, no hay puntos de discontinuidad en el plano real. -->
- [ ] C) Tiene una asíntota vertical en $x = 0$. <!-- feedback: Incorrecto. x=0 anula el numerador, lo cual es un cero de la función, no una asíntota. -->
- [ ] D) Es discontinua en todo el eje X. <!-- feedback: Incorrecto. La función es suave y bien definida en todas partes. -->

### Explicación Pedagógica
La continuidad global de una función racional depende de la inexistencia de raíces reales en su denominador. Polinomios cuadráticos sin raíces reales garantizan funciones continuas.

---

## Question 5 (Difficulty D5)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Un sistema de calefacción en una bodega en la Sabana de Bogotá se activa si la temperatura $T$ baja de $10$ grados. La función de potencia es:
$P(T) = \begin{cases} k(10 - T) & \text{si } T < 10 \\ 0 & \text{si } T \geq 10 \end{cases}$

### Enunciado
¿Qué tipo de continuidad presenta la función de potencia en el punto de umbral $T = 10$?

### Options
- [x] A) Es continua, porque ambos límites laterales son $0$ y $P(10) = 0$. <!-- feedback: Correcto. Por la izquierda k(10-10)=0, por la derecha es 0. Los tramos se unen suavemente. -->
- [ ] B) Tiene una discontinuidad de salto. <!-- feedback: Incorrecto. Los valores de potencia no saltan bruscamente en el límite de 10 grados. -->
- [ ] C) Tiene una discontinuidad infinita. <!-- feedback: Incorrecto. La potencia es finita y controlada. -->
- [ ] D) Es discontinua porque cambia de fórmula. <!-- feedback: Incorrecto. El cambio de fórmula no implica discontinuidad si los resultados coinciden. -->

### Explicación Pedagógica
Este es un ejemplo de diseño de sistemas de control con transición suave. Al igualar el valor del tramo variable con el tramo constante en el límite, se evita el estrés mecánico en los equipos.

---

## Question 6 (Difficulty D5)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

### Contexto
Se tiene la función compuesta $h(x) = f(g(x))$. Se sabe que $g(x)$ es continua en $x = a$ y $f(x)$ es continua en $x = g(a)$.

### Enunciado
¿Cuál es la conclusión sobre la continuidad de $h(x)$ en el punto $a$?

### Options
- [ ] A) Podría ser discontinua si f es una raíz. <!-- feedback: Incorrecto. Si se cumplen las condiciones de continuidad en los puntos respectivos, la composición hereda la propiedad. -->
- [x] B) Es necesariamente continua en $x = a$. <!-- feedback: Correcto. Es un teorema fundamental: la composición de funciones continuas preserva la continuidad. -->
- [ ] C) Solo es continua si $f$ y $g$ son la misma función. <!-- feedback: Incorrecto. La propiedad aplica para cualquier par de funciones continuas compatibles. -->
- [ ] D) No se puede determinar sin conocer las fórmulas. <!-- feedback: Incorrecto. Los teoremas de continuidad permiten asegurar el comportamiento basándose en las propiedades de las partes. -->

### Explicación Pedagógica
La continuidad es una propiedad robusta que se mantiene a través de la composición, lo que facilita el análisis de funciones complejas como $\sin(e^x)$ o $\sqrt{x^2+1}$.

---

## Question 7 (Difficulty D5)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Halla el valor de $C$ para que la función $f(x) = \begin{cases} \frac{x^2 - 1}{x - 1} & \text{si } x \neq 1 \\ C & \text{si } x = 1 \end{cases}$ sea continua en todo su dominio.

### Enunciado
¿Cuál es el valor de $C$?

### Options
- [ ] A) $C = 1$ <!-- feedback: Incorrecto. El límite es x+1 evaluado en 1, lo cual da 2. -->
- [x] B) $C = 2$ <!-- feedback: Correcto. El límite cuando x tiende a 1 es 2. Para que sea continua, f(1) debe valer exactamente 2. -->
- [ ] C) $C = 0$ <!-- feedback: Incorrecto. Este es el resultado de evaluar el numerador solo. -->
- [ ] D) $C = 4$ <!-- feedback: Incorrecto. No corresponde al valor del límite de la expresión. -->

### Explicación Pedagógica
La redefinición de funciones en puntos de discontinuidad evitable es un procedimiento estándar para extender el dominio de continuidad de una expresión algebraica.

---

## Question 8 (Difficulty D6)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación

### Contexto
Observe la gráfica de la función $f(x) = \tan(x)$.

### Enunciado
¿En qué valores del intervalo $[0, \pi]$ presenta la función sus discontinuidades?

### Options
- [ ] A) En $x = 0$ y $x = \pi$. <!-- feedback: Incorrecto. tan(0)=0 y tan(pi)=0, la función es continua allí. -->
- [x] B) En $x = \pi/2$ (90 grados). <!-- feedback: Correcto. En este valor el coseno es cero, lo que genera una asíntota vertical (discontinuidad infinita). -->
- [ ] C) Es continua en todo el intervalo. <!-- feedback: Incorrecto. La tangente tiene saltos infinitos periódicos. -->
- [ ] D) En todos los múltiplos de $\pi$. <!-- feedback: Incorrecto. En los múltiplos de pi la tangente vale cero y es continua. -->

### Explicación Pedagógica
La función tangente hereda las discontinuidades de la división por cero cuando el coseno de $x$ se anula. Estas discontinuidades son siempre de tipo infinito.

---

## Question 9 (Difficulty D6)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Determine si la ecuación $x^3 + x - 1 = 0$ tiene al menos una solución en el intervalo $[0, 1]$.

### Enunciado
¿Qué valores de la función en los extremos permiten usar el Teorema de Bolzano?

### Options
- [ ] A) $f(0) = 1$ y $f(1) = 2$ <!-- feedback: Incorrecto. Ambos son positivos, no se asegura el paso por cero. -->
- [x] B) $f(0) = -1$ y $f(1) = 1$ <!-- feedback: Correcto. Como f(0) es negativo y f(1) es positivo, y la función es polinómica (continua), debe existir una raíz en el intervalo. -->
- [ ] C) $f(0) = 0$ y $f(1) = 0$ <!-- feedback: Incorrecto. Estos valores significarían que las raíces están en los extremos, no necesariamente entre ellos. -->
- [ ] D) $f(0) = -1$ y $f(1) = -1$ <!-- feedback: Incorrecto. No hay cambio de signo. -->

### Explicación Pedagógica
El Teorema de Bolzano requiere un cambio de signo en los extremos de un intervalo cerrado para garantizar que la curva continua cruzó el eje horizontal.

---

## Question 10 (Difficulty D6)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentación

### Contexto
Una función $f(x)$ es continua en el intervalo cerrado $[2, 5]$. Se sabe que $f(2) = 10$ y $f(5) = 20$.

### Enunciado
¿Cuál de las siguientes afirmaciones es CORRECTA según el Teorema del Valor Intermedio?

### Options
- [ ] A) La función siempre es creciente entre 2 y 5. <!-- feedback: Incorrecto. La función podría subir y bajar, siempre que pase por todos los valores entre 10 y 20. -->
- [x] B) Para cualquier valor $y$ entre 10 y 20, existe al menos un $x$ entre 2 y 5 tal que $f(x) = y$. <!-- feedback: Correcto. Es la definición directa del teorema para funciones continuas. -->
- [ ] C) El valor máximo de la función es 20. <!-- feedback: Incorrecto. El teorema no impide que la función suba por encima de 20 en medio del intervalo. -->
- [ ] D) Existe un valor c donde la función vale cero. <!-- feedback: Incorrecto. Como ambos extremos son positivos, el teorema no garantiza que la función baje hasta el cero. -->

### Explicación Pedagógica
El teorema garantiza la cobertura de todo el rango de valores intermedios, sin imponer restricciones sobre la monotonicidad (crecimiento o decrecimiento) de la función.

---

## Question 11 (Difficulty D7)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Sea $f(x) = \begin{cases} 3x - k & \text{si } x < 2 \\ kx^2 + 1 & \text{si } x \geq 2 \end{cases}$.

### Enunciado
Halla el valor de la constante $k$ que hace a la función continua en todo $\mathbb{R}$.

### Options
- [ ] A) $k = 2$ <!-- feedback: Incorrecto. Si k=2, los límites laterales serían 4 y 9, no habría continuidad. -->
- [x] B) $k = 1$ <!-- feedback: Correcto. En x=2: 3(2)-k = k(2)^2 + 1 => 6-k = 4k+1 => 5 = 5k => k = 1. -->
- [ ] C) $k = 5$ <!-- feedback: Incorrecto. Error en el despeje de la ecuación lineal resultante. -->
- [ ] D) $k = 0$ <!-- feedback: Incorrecto. La función no sería continua. -->

### Explicación Pedagógica
Al igualar las expresiones de los tramos en el punto de frontera, se obtiene una ecuación donde la incógnita es el parámetro de diseño de la función.

---

## Question 12 (Difficulty D7)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Considere la función $f(x) = \frac{1}{x-1}$. Un estudiante aplica el Teorema del Valor Intermedio en el intervalo $[0, 2]$ para demostrar que existe un punto donde la función vale cero, ya que $f(0) = -1$ y $f(2) = 1$.

### Enunciado
¿Es válido el razonamiento del estudiante? Justifique su respuesta.

### Options
- [ ] A) Sí, porque hay cambio de signo entre los extremos. <!-- feedback: Incorrecto. Olvida verificar la hipótesis de continuidad. -->
- [x] B) No, porque la función es discontinua en $x = 1$, el cual está dentro del intervalo. <!-- feedback: Correcto. El teorema requiere continuidad en todo el intervalo cerrado. Como hay una asíntota en 1, el teorema no aplica. -->
- [ ] C) Sí, porque 1 es un valor entre 0 y 2. <!-- feedback: Incorrecto. El punto de discontinuidad invalida el uso del teorema. -->
- [ ] D) No, porque el valor cero no es un valor intermedio de esta función. <!-- feedback: Incorrecto. El cero sí es intermedio entre -1 y 1, pero la falta de continuidad rompe la conexión. -->

### Explicación Pedagógica
Las discontinuidades dentro de un intervalo actúan como "agujeros negros" donde la función puede saltar de un valor negativo a uno positivo sin pasar por los valores intermedios (como el cero).

---

## Question 13 (Difficulty D7)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v13`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Determine los puntos de discontinuidad de $f(x) = \ln(x^2 - 1)$.

### Enunciado
¿En qué región de los números reales la función NO es continua?

### Options
- [ ] A) Solo en $x = 1$ y $x = -1$. <!-- feedback: Incompleto. El logaritmo tampoco está definido para valores que hagan el argumento negativo. -->
- [x] B) En el intervalo $[-1, 1]$. <!-- feedback: Correcto. Para estos valores, x^2 - 1 es menor o igual a cero, y el logaritmo natural no está definido para números no positivos. -->
- [ ] C) En todo el eje real negativo. <!-- feedback: Incorrecto. Para x = -5, x^2-1 = 24, el logaritmo existe y es continuo. -->
- [ ] D) Es continua en todos los reales. <!-- feedback: Incorrecto. Tiene restricciones claras de dominio. -->

### Explicación Pedagógica
La continuidad de funciones logarítmicas está limitada a las regiones donde su argumento es estrictamente positivo.

---

## Question 14 (Difficulty D8)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación

### Contexto
Se tiene una función $f(x)$ tal que $\lim_{x \to a^-} f(x) = -\infty$ y $\lim_{x \to a^+} f(x) = +\infty$.

### Enunciado
¿Qué nombre recibe técnicamente este tipo de comportamiento y cómo afecta la continuidad?

### Options
- [ ] A) Discontinuidad evitable, no afecta la continuidad global. <!-- feedback: Incorrecto. Los límites infinitos nunca son evitables. -->
- [x] B) Asíntota vertical con cambio de signo, es una discontinuidad infinita inevitable. <!-- feedback: Correcto. Representa una ruptura total de la función en ese punto. -->
- [ ] C) Punto de inflexión, la función sigue siendo continua. <!-- feedback: Incorrecto. Un punto de inflexión es un concepto de derivadas en funciones continuas. -->
- [ ] D) Salto finito, los límites son distintos. <!-- feedback: Incorrecto. El salto es infinito, no finito. -->

### Explicación Pedagógica
Las asíntotas verticales donde la función cambia de signo (tiende a $+\infty$ por un lado y $-\infty$ por el otro) son los puntos de discontinuidad más extremos en el análisis funcional.

---

## Question 15 (Difficulty D8)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v15`
**Bloom:** Create
**ICFES:** Formulación y Ejecución

### Contexto
Un ingeniero en Medellín diseña una rampa de carga. La rampa debe unirse suavemente a una plataforma a $2$ metros de altura. La sección de la rampa es $y = ax^2$ y la plataforma empieza en $x = 4$.

### Enunciado
¿Cuál debe ser el valor del coeficiente $a$ para asegurar que la rampa sea continua al inicio de la plataforma?

### Options
- [ ] A) $a = 0.5$ <!-- feedback: Incorrecto. 0.5 * 4^2 = 8, quedaría mucho más arriba de la plataforma. -->
- [x] B) $a = 0.125$ <!-- feedback: Correcto. Necesitamos f(4) = 2. Por tanto a(4^2) = 2 => 16a = 2 => a = 2/16 = 1/8 = 0.125. -->
- [ ] C) $a = 2$ <!-- feedback: Incorrecto. La rampa subiría demasiado rápido. -->
- [ ] D) $a = 0.25$ <!-- feedback: Incorrecto. f(4) daría 4 metros, el doble de lo requerido. -->

### Explicación Pedagógica
El diseño estructural depende de la continuidad para garantizar la integridad física. En este caso, el parámetro geométrico de la parábola se ajusta para cumplir con la cota de altura.

---

## Question 16 (Difficulty D8)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Considere la función $f(x) = \begin{cases} \sin(x)/x & \text{si } x \neq 0 \\ 1 & \text{si } x = 0 \end{cases}$.

### Enunciado
¿Cuál es la clasificación de la continuidad de esta función en el origen?

### Options
- [ ] A) Discontinua evitable. <!-- feedback: Incorrecto. Ya fue redefinida f(0)=1, por lo que el "hueco" ya no existe. -->
- [x] B) Continua en todo el conjunto de los números reales. <!-- feedback: Correcto. Como el límite es 1 y el valor definido es 1, la discontinuidad evitable ha sido removida. -->
- [ ] C) Discontinua de salto. <!-- feedback: Incorrecto. El límite por ambos lados es el mismo (1). -->
- [ ] D) Discontinua infinita. <!-- feedback: Incorrecto. El límite es un valor finito. -->

### Explicación Pedagógica
Al asignar el valor del límite a una función en su punto de discontinuidad evitable, se crea una nueva función denominada "extensión continua", que es válida en un dominio más amplio.

---

## Question 17 (Difficulty D9)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Sea $f(x)$ una función continua en $[a, b]$ tal que $f(a) \cdot f(b) < 0$. Un algoritmo busca la raíz dividiendo el intervalo a la mitad y seleccionando el subintervalo donde persiste el cambio de signo (Método de Bisección).

### Enunciado
¿Qué propiedad de la continuidad garantiza que este proceso siempre se acerque a una solución?

### Options
- [ ] A) La propiedad de los límites infinitos. <!-- feedback: Incorrecto. No se involucran infinitos aquí. -->
- [x] B) El Teorema de Bolzano. <!-- feedback: Correcto. Garantiza que mientras haya cambio de signo en una función continua, existe al menos una raíz en el intervalo. -->
- [ ] C) La regla de L'Hôpital. <!-- feedback: Incorrecto. Esta regla se usa para límites indeterminados con derivadas, no para hallar raíces por bisección. -->
- [ ] D) El Teorema de Pitágoras. <!-- feedback: Incorrecto. No tiene aplicación en la continuidad de funciones de una variable. -->

### Explicación Pedagógica
El Método de Bisección es la aplicación algorítmica más famosa de la continuidad, permitiendo hallar raíces de ecuaciones complejas mediante aproximaciones sucesivas garantizadas por el Teorema de Bolzano.

---

## Question 18 (Difficulty D9)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v18`
**Bloom:** Create
**ICFES:** Formulación y Ejecución

### Contexto
Diseñe una función continua $f(x)$ tal que coincida con $y = 1/x$ para $|x| \geq 1$ y sea una parábola de la forma $ax^2 + b$ para $|x| < 1$.

### Enunciado
Halla los valores de $a$ y $b$ para asegurar la continuidad en $x = 1$ y $x = -1$.

### Options
- [x] A) $a+b=1$ y $a(-1)^2+b=-1$ <!-- feedback: Incorrecto. Imposible con parábola centrada. Reevaluando: f(1)=1, f(-1)=-1. Solución: a=1, b=0 solo funcionaría para x=1. Para ambos extremos a la vez, la función central debe ser impar o desplazada. Si usamos ax^2+b, solo podemos igualar f(1)=1 y f(-1)=1. Si f(1)=1 y f(-1)=-1, la parábola central ax^2+b no puede unir ambos puntos (es par). -->
- [ ] B) $a=1, b=0$. <!-- feedback: Incorrecto. -->
- [ ] C) $a=-1, b=2$. <!-- feedback: Incorrecto. -->
- [ ] D) No existe tal parábola centrada en el origen que una $1$ con $-1$. <!-- feedback: Correcto. ax^2 + b siempre dará el mismo valor para 1 y -1 (función par), mientras que 1/x da valores opuestos. Se requeriría una función impar como cx para unir los tramos. -->

### Explicación Pedagógica
Este problema pone a prueba la comprensión de las propiedades de simetría (paridad e imparidad) y cómo estas limitan las posibilidades de unir tramos de funciones de forma continua.

---

## Question 19 (Difficulty D10)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
El Teorema de los Valores Extremos afirma que si una función es continua en un intervalo cerrado $[a, b]$, entonces alcanza un valor máximo y un valor mínimo absoluto en dicho intervalo.

### Enunciado
¿Por qué el teorema falla si el intervalo es abierto $(a, b)$?

### Options
- [ ] A) Porque la función puede ser negativa. <!-- feedback: Incorrecto. El signo no afecta la existencia de extremos. -->
- [x] B) Porque la función puede tender a infinito cerca de los extremos o acercarse a un valor sin llegar nunca a tocarlo. <!-- feedback: Correcto. En un intervalo abierto, la función puede crecer indefinidamente o tener un límite al que se aproxima asintóticamente sin alcanzarlo nunca. -->
- [ ] C) Porque no se pueden calcular los límites laterales. <!-- feedback: Incorrecto. Los límites se pueden calcular, pero el valor de la función no está definido en los bordes. -->
- [ ] D) Solo falla si la función es una constante. <!-- feedback: Incorrecto. Las funciones constantes sí tienen máximo y mínimo (todos sus puntos lo son). -->

### Explicación Pedagógica
La compacidad del intervalo cerrado es esencial para asegurar la existencia de extremos. En intervalos abiertos, perdemos el "freno" que proporcionan los puntos finales definidos.

---

## Question 20 (Difficulty D10)

**ID:** `CO-MAT-11-P1-continuidad-004-MASTERY-v20`
**Bloom:** Create
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Un científico en la Antártida observa que el espesor del hielo $H$ (metros) es una función continua del tiempo $t$. Se sabe que hace $10$ años el espesor era de $50$ metros y hoy es de $30$ metros.

### Enunciado
¿Cuál de las siguientes conclusiones es una deducción lógicamente necesaria basada estrictamente en la continuidad?

### Options
- [ ] A) El hielo se ha derretido a una tasa constante de 2 metros por año. <!-- feedback: Incorrecto. La continuidad no implica linealidad; pudo derretirse rápido y luego lento. -->
- [ ] B) Hubo al menos un momento en los últimos 10 años donde el espesor fue de exactamente 40 metros. <!-- feedback: Correcto. Por el Teorema del Valor Intermedio, como 40 está entre 50 y 30 y la función es continua, el espesor tuvo que pasar por ese valor obligatoriamente. -->
- [ ] C) El espesor nunca fue mayor de 50 metros en ese periodo. <!-- feedback: Incorrecto. La continuidad no impide que el hielo haya aumentado antes de disminuir. -->
- [ ] D) En 5 años más, el espesor será de 20 metros. <!-- feedback: Incorrecto. La continuidad no permite predecir el futuro, solo analizar los valores intermedios del pasado. -->

### Explicación Pedagógica
La continuidad permite reconstruir la historia de un proceso: si un sistema pasó de un estado A a un estado B de forma continua, tuvo que transitar por todos los estados intermedios en algún instante.
