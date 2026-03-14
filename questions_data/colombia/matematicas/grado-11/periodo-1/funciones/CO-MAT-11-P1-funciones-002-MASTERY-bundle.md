---
id: "CO-MAT-11-P1-funciones-002-MASTERY"
protocol_version: "5.0"
alignment: "ICFES Saber 11 / Marcos Técnicos"
periodo: 1
bundle_index: 2
modern_context: true
calibration:
  expected_success_rate: 0.58
  discrimination_index_target: ">= 0.2"
  simulated_responses: 100
rubric_baseline: "analisis_funcional, modelamiento_de_fenomenos, interpretacion_grafica"
---

# Bundle Mastery: Funciones y Modelado de Fenómenos

Este bundle explora el comportamiento de funciones reales, profundizando en el análisis de funciones compuestas, inversas y el modelado de situaciones biológicas y físicas mediante funciones trascendentes.

---

## Question 1 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v1`
**Bloom:** Understand
**ICFES:** Comunicación y Representación

### Contexto
Un estudiante observa la gráfica de una relación y nota que una línea vertical corta a la gráfica en dos puntos distintos.

### Enunciado
¿Cuál es la conclusión correcta sobre esta relación según el criterio de la línea vertical?

### Options
- [ ] A) Es una función inyectiva. <!-- feedback: Incorrecto. El criterio de la línea vertical no determina inyectividad, sino si es función o no. -->
- [x] B) **No** es una función. <!-- feedback: Correcto. Si una X tiene más de una Y asociada, la relación no cumple la definición de función. -->
- [ ] C) Es una función constante. <!-- feedback: Incorrecto. Una función constante pasaría el criterio de la línea vertical sin problemas. -->
- [ ] D) Es una función lineal. <!-- feedback: Incorrecto. Una línea lineal nunca sería cortada dos veces por una vertical. -->

### Explicación Pedagógica
La definición de función exige que a cada elemento del dominio le corresponda un **único** elemento del rango. El criterio visual de la línea vertical es la prueba rápida para validar esta unicidad.

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Comunicación y Representación

### Contexto
Se define una función $f(x)$ como "inyectiva" (o uno a uno).

### Enunciado
¿Qué propiedad geométrica debe cumplir la gráfica de una función para ser considerada inyectiva?

### Options
- [ ] A) Cualquier línea vertical debe cortarla solo una vez. <!-- feedback: Esto solo prueba que es una función, no que es inyectiva. -->
- [x] B) Cualquier línea **horizontal** debe cortarla máximo una vez. <!-- feedback: Correcto. Esto garantiza que valores distintos de X tengan resultados distintos en Y. -->
- [ ] C) Debe pasar por el origen (0,0). <!-- feedback: La inyectividad no depende de los cortes con los ejes coordenados. -->
- [ ] D) Debe ser siempre creciente. <!-- feedback: Aunque muchas funciones inyectivas son monótonas, el criterio general es el de la línea horizontal. -->

### Explicación Pedagógica
La inyectividad asegura que no hay "colisiones" de resultados; es decir, $f(a) = f(b) \Rightarrow a = b$. Visualmente, esto significa que no hay dos puntos con la misma altura en la gráfica.

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Dada la función $f(x) = \sqrt{3x - 12}$.

### Enunciado
¿Cuál es el dominio restringido en el conjunto de los números reales para esta función?

### Options
- [ ] A) $x > 4$ <!-- feedback: Casi correcto, pero el valor 4 sí es válido ya que la raíz de cero existe. -->
- [x] B) $x \geq 4$ <!-- feedback: Correcto. El radicando debe ser mayor o igual a cero: 3x - 12 >= 0 => 3x >= 12 => x >= 4. -->
- [ ] C) $x \geq 12$ <!-- feedback: Incorrecto. Olvidaste dividir por el coeficiente 3 al despejar la x. -->
- [ ] D) Todos los reales ($\mathbb{R}$) <!-- feedback: Incorrecto. Un valor como x=0 daría raíz de -12, lo cual no es un número real. -->

### Explicación Pedagógica
Las funciones con raíces de índice par imponen una restricción: el argumento interno no puede ser negativo. Esto se resuelve mediante una inecuación lineal simple.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Comunicación y Representación

### Contexto
Considera la función exponencial $f(x) = a^x + k$, con $a > 1$.

### Enunciado
Si el valor de $k$ aumenta, ¿qué sucede con la gráfica de la función?

### Options
- [x] A) Se desplaza verticalmente hacia arriba. <!-- feedback: Correcto. Al sumar una constante a toda la función, cada punto de la gráfica sube k unidades. -->
- [ ] B) Se desplaza horizontalmente hacia la derecha. <!-- feedback: Incorrecto. Para desplazamientos horizontales, la constante debería sumarse directamente a la x: a^(x+k). -->
- [ ] C) Se vuelve más pronunciada (crece más rápido). <!-- feedback: Incorrecto. Esto dependería del valor de la base 'a', no de la constante k. -->
- [ ] D) Gira 90 grados. <!-- feedback: Incorrecto. Las transformaciones aditivas externas solo producen traslaciones. -->

### Explicación Pedagógica
Las transformaciones de funciones son herramientas potentes para el modelado. Sumar una constante externa ($f(x) + k$) afecta directamente los valores del rango (eje Y).

---

## Question 5 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v5`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

### Contexto
Una función $f(x)$ tiene como dominio el intervalo $[0, 10]$ y como rango el intervalo $[20, 50]$. Se define una nueva función $g(x) = f(x) - 10$.

### Enunciado
¿Cuál es el nuevo rango de la función $g(x)$?

### Options
- [ ] A) $[-10, 0]$ <!-- feedback: Incorrecto. Estas restando 10 al rango original [20, 50]. -->
- [x] B) $[10, 40]$ <!-- feedback: Correcto. El rango se desplaza restando 10 a los límites del rango original. -->
- [ ] C) $[0, 10]$ <!-- feedback: Incorrecto. Este es el dominio, el cual no cambió. -->
- [ ] D) $[30, 60]$ <!-- feedback: Incorrecto. Sumaste 10 en lugar de restar. -->

### Explicación Pedagógica
Entender la diferencia entre dominio (X) y rango (Y). Operaciones externas a la función como $f(x) - 10$ solo modifican los valores de salida, manteniendo intactos los de entrada.

---

## Question 6 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Halla la función inversa $f^{-1}(x)$ para la función lineal $f(x) = 4x - 8$.

### Enunciado
¿Cuál es la expresión correcta resultante?

### Options
- [x] A) $f^{-1}(x) = \frac{x + 8}{4}$ <!-- feedback: Correcto. Despejando x: y + 8 = 4x => x = (y + 8) / 4. -->
- [ ] B) $f^{-1}(x) = \frac{x - 8}{4}$ <!-- feedback: Incorrecto. Al pasar el -8 al otro lado, su signo cambia a positivo. -->
- [ ] C) $f^{-1}(x) = 4x + 8$ <!-- feedback: Incorrecto. No realizaste el despeje completo de la variable original. -->
- [ ] D) $f^{-1}(x) = \frac{4}{x - 8}$ <!-- feedback: Incorrecto. Esta sería una función recíproca, no la inversa. -->

### Explicación Pedagógica
El proceso de inversión consiste en intercambiar los roles de la variable dependiente e independiente, reflejando la gráfica respecto a la línea $y = x$.

---

## Question 7 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Se tienen dos funciones: $f(x) = x^2$ y $g(x) = x + 3$.

### Enunciado
¿Cuál es la expresión para la función compuesta $(f \circ g)(x)$?

### Options
- [x] A) $(x + 3)^2$ <!-- feedback: Correcto. f(g(x)) significa usar la función g como entrada de f. -->
- [ ] B) $x^2 + 3$ <!-- feedback: Incorrecto. Esto representa (g o f)(x). -->
- [ ] C) $x^2 + 9$ <!-- feedback: Incorrecto. Olvidaste el término medio del binomio al cuadrado (2ab). -->
- [ ] D) $x^2 + x + 3$ <!-- feedback: Incorrecto. Esto es la suma de funciones, no la composición. -->

### Explicación Pedagógica
La composición de funciones es una operación donde el resultado de una función se convierte en la materia prima de la siguiente. El orden es vital: $f(g(x)) \neq g(f(x))$.

---

## Question 8 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación

### Contexto
Considera la función logarítmica $f(x) = \log_b(x)$ con base $b > 0$ y $b \neq 1$.

### Enunciado
¿Cuál es la afirmación verdadera respecto a las asíntotas de esta función?

### Options
- [x] A) Tiene una **asíntota vertical** en $x = 0$. <!-- feedback: Correcto. El logaritmo no está definido para cero y tiende a -infinito cuando x se acerca a él. -->
- [ ] B) Tiene una asíntota horizontal en $y = 0$. <!-- feedback: Incorrecto. Esto es típico de las exponenciales, no de las logarítmicas. -->
- [ ] C) No tiene asíntotas. <!-- feedback: Incorrecto. Se vuelve indefinida en el límite del dominio (x=0). -->
- [ ] D) Tiene una asíntota oblicua. <!-- feedback: Incorrecto. Su crecimiento es lento pero no sigue una línea inclinada. -->

### Explicación Pedagógica
Las funciones logarítmicas son las inversas de las exponenciales. Mientras la exponencial no puede ser cero en Y (asíntota horizontal), el logaritmo no puede recibir un cero en X (asíntota vertical).

---

## Question 9 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Se define una función por tramos:
$f(x) = \begin{cases} x + 1 & \text{si } x < 0 \\ x^2 + 1 & \text{si } x \geq 0 \end{cases}$

### Enunciado
¿Cuál es el valor de $f(2) + f(-2)$?

### Options
- [ ] A) 6 <!-- feedback: Incorrecto. Calculaste f(2)=5 pero f(-2) no es 1. -->
- [x] B) 4 <!-- feedback: Correcto. f(2) usa el tramo inferior: 2^2 + 1 = 5. f(-2) usa el tramo superior: -2 + 1 = -1. 5 + (-1) = 4. -->
- [ ] C) 10 <!-- feedback: Incorrecto. Evaluaste ambos valores en el tramo de x^2 + 1. -->
- [ ] D) 2 <!-- feedback: Incorrecto. Cometiste un error de signos en la suma final. -->

### Explicación Pedagógica
En funciones definidas por partes, lo primero es verificar en qué intervalo cae la entrada para seleccionar la regla de correspondencia adecuada.

---

## Question 10 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentación

### Contexto
Una función $f(x)$ se dice que es **par** si cumple que $f(-x) = f(x)$ para todo $x$.

### Enunciado
¿Qué tipo de simetría presenta la gráfica de una función par?

### Options
- [x] A) Simetría respecto al **eje Y**. <!-- feedback: Correcto. Funciona como un espejo vertical. -->
- [ ] B) Simetría respecto al origen (0,0). <!-- feedback: Incorrecto. Esto es característico de las funciones impares: f(-x) = -f(x). -->
- [ ] C) Simetría respecto al eje X. <!-- feedback: Incorrecto. Si tuviera esta simetría, no sería una función (fallaría el criterio de la línea vertical). -->
- [ ] D) No tiene simetría. <!-- feedback: Incorrecto. La definición matemática de paridad implica una estructura geométrica equilibrada. -->

### Explicación Pedagógica
La paridad es una propiedad de regularidad. La función $x^2$ es el ejemplo clásico de función par (reflejo en el eje Y), mientras que $x^3$ es impar (simetría de rotación respecto al origen).

---

## Question 11 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Se requiere hallar el dominio de la función combinada $h(x) = \frac{\sqrt{x+5}}{x-1}$.

### Enunciado
¿Cuál es el conjunto de valores permitidos para $x$?

### Options
- [ ] A) $x \geq -5$ <!-- feedback: Incompleto. No consideraste la restricción del denominador (no puede ser 0). -->
- [ ] B) $x \neq 1$ <!-- feedback: Incompleto. Olvidaste que el radicando dentro de la raíz cuadrada debe ser positivo. -->
- [x] C) $[-5, 1) \cup (1, \infty)$ <!-- feedback: Correcto. Combinas x >= -5 (raíz) con x != 1 (denominador). -->
- [ ] D) $(-5, 1)$ <!-- feedback: Incorrecto. Esta es solo una pequeña porción del dominio real. -->

### Explicación Pedagógica
El dominio de una función compleja es la intersección de los dominios de sus partes. Debemos satisfacer simultáneamente todas las restricciones matemáticas presentes.

---

## Question 12 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Si $f(g(x)) = x$ para todo $x$ en el dominio, ¿qué relación existe necesariamente entre las funciones $f$ y $g$?

### Options
- [ ] A) Son funciones iguales. <!-- feedback: No necesariamente. Esto solo ocurre si la función es su propia inversa (como 1/x). -->
- [x] B) Son funciones **inversas** entre sí. <!-- feedback: Correcto. La propiedad fundamental de la inversión es que una "deshace" lo que hace la otra. -->
- [ ] C) Son funciones lineales paralelas. <!-- feedback: Incorrecto. Las paralelas nunca se anularían de esa forma en composición. -->
- [ ] D) Una es la derivada de la otra. <!-- feedback: Incorrecto. La composición de una función con su derivada no da necesariamente x. -->

### Explicación Pedagógica
La identidad $f(g(x)) = x$ es la prueba formal de que $f$ es la función inversa de $g$. En el plano cartesiano, sus gráficas son simétricas respecto a la recta $y = x$.

---

## Question 13 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v13`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Un modelo biológico predice que la cantidad de bacterias $B$ en un cultivo después de $t$ horas sigue la función logarítmica $t = \log_{1.5}(\frac{B}{100})$.

### Enunciado
Si queremos saber cuánto tiempo debe pasar para que existan 225 bacterias, ¿cuál es el cálculo correcto?

### Options
- [x] A) 2 horas <!-- feedback: Correcto. t = log_{1.5}(225/100) = log_{1.5}(2.25). Como 1.5^2 = 2.25, el resultado es 2. -->
- [ ] B) 1.5 horas <!-- feedback: Incorrecto. 1.5 elevado a la 1.5 no da 2.25. -->
- [ ] C) 10 horas <!-- feedback: Incorrecto. Este valor no tiene relación lógica con los parámetros de la función. -->
- [ ] D) Logaritmo natural de 2. <!-- feedback: Incorrecto. El logaritmo está en base 1.5, no en base 'e'. -->

### Explicación Pedagógica
Uso de funciones logarítmicas para medir el tiempo en procesos de crecimiento exponencial. La base del logaritmo representa el factor de crecimiento por unidad de tiempo.

---

## Question 14 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación

### Contexto
Considera la función racional $f(x) = \frac{x^2 - x - 6}{x - 3}$.

### Enunciado
¿Cuál es el comportamiento de la gráfica en $x = 3$?

### Options
- [ ] A) Hay una asíntota vertical. <!-- feedback: Incorrecto. Aunque el denominador es cero, el numerador también lo es, lo que genera una indeterminación 0/0. -->
- [x] B) Hay un **punto vacío (hueco)** en la gráfica. <!-- feedback: Correcto. Al factorizar el numerador como (x-3)(x+2), el término (x-3) se cancela, simplificándose a una recta con un hueco. -->
- [ ] C) La función es continua en ese punto. <!-- feedback: Incorrecto. Un valor que anula el denominador original siempre genera una discontinuidad. -->
- [ ] D) La gráfica cruza el eje Y. <!-- feedback: El cruce con el eje Y ocurre en f(0), no tiene relación con el punto crítico x=3. -->

### Explicación Pedagógica
Diferenciación entre saltos infinitos (asíntotas) y discontinuidades evitables (huecos). Se produce un hueco cuando el factor que causa el cero en el denominador también está presente en el numerador.

---

## Question 15 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v15`
**Bloom:** Create
**ICFES:** Formulación y Ejecución

### Contexto
Dada la función cuadrática en forma estándar $f(x) = 2(x - 3)^2 + 5$.

### Enunciado
Identifica las coordenadas del **Vértice** y determina si la parábola abre hacia arriba o hacia abajo.

### Options
- [x] A) Vértice en $(3, 5)$; abre hacia **arriba**. <!-- feedback: Correcto. La forma (x-h)^2 + k pone el vértice en (h,k). El coeficiente positivo (2) indica apertura hacia arriba. -->
- [ ] B) Vértice en $(-3, 5)$; abre hacia arriba. <!-- feedback: Incorrecto. Recuerda que la fórmula es (x - h), por lo que h = 3. -->
- [ ] C) Vértice en $(3, 5)$; abre hacia abajo. <!-- feedback: Incorrecto. Para abrir hacia abajo el coeficiente debería ser negativo. -->
- [ ] D) Vértice en $(0, 5)$; abre hacia arriba. <!-- feedback: Incorrecto. Olvidaste el desplazamiento horizontal de 3 unidades. -->

### Explicación Pedagógica
La forma canónica de la parábola revela información crucial sobre su extremo (máximo o mínimo) y su orientación sin necesidad de graficar punto por punto.

---

## Question 16 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v16`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Un observador nota que para una función desconocida $f(x)$, se cumple que $f(2) = 10$, $f(4) = 20$ y $f(8) = 40$. El observador concluye que la función es **lineal**.

### Enunciado
¿Es correcta la conclusión del observador? Justifica tu respuesta.

### Options
- [x] A) Sí, porque la razón de cambio (pendiente) es constante e igual a 5. <!-- feedback: Correcto. (20-10)/(4-2) = 5; (40-20)/(8-4) = 5. -->
- [ ] B) No, porque los valores de entrada se duplican. <!-- feedback: Incorrecto. El hecho de que las entradas se dupliquen no impide que la relación sea lineal si las salidas también guardan la proporción aditiva. -->
- [ ] C) No, la función debe ser exponencial. <!-- feedback: Incorrecto. Una exponencial tendría razones constantes (20/10 = 2), pero aquí la relación es aditiva-constante (pendiente). -->
- [ ] D) Sí, porque la función pasa por el origen. <!-- feedback: No tenemos información suficiente para asegurar que pasa por (0,0), aunque el modelo f(x)=5x sí lo haría. -->

### Explicación Pedagógica
Análisis de proporcionalidad. Una función es lineal si la tasa de cambio entre cualquier par de puntos es idéntica ($\Delta y / \Delta x = k$).

---

## Question 17 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Se requiere modelar el nivel de agua en un tanque cilíndrico que se llena a una tasa constante, pero el tanque tiene una fuga que aumenta proporcionalmente a la presión (altura del agua).

### Enunciado
¿Qué tipo de función describiría mejor la altura del agua $h(t)$ a medida que pasa el tiempo largo plazo, si se sabe que llegará a un punto de equilibrio donde el llenado iguala a la fuga?

### Options
- [ ] A) Función lineal creciente. <!-- feedback: Incorrecto. La linealidad no permitiría un punto de equilibrio constante a largo plazo. -->
- [x] B) Función con **asíntota horizontal** (tipo logística o exponencial saturada). <!-- feedback: Correcto. Al acercarse el llenado a la fuga, el crecimiento se detiene y la altura se estabiliza. -->
- [ ] C) Función cuadrática descendente. <!-- feedback: Incorrecto. El tanque se está llenando, no vaciando inicialmente. -->
- [ ] D) Función periódica (senoidal). <!-- feedback: Incorrecto. El nivel no oscila, sino que busca un equilibrio estable. -->

### Explicación Pedagógica
Modelado de sistemas dinámicos. El equilibrio entre una entrada constante y una salida dependiente del estado genera comportamientos asintóticos característicos en las funciones de transferencia.

---

## Question 18 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v18`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Dada la función $f(x) = \frac{ax + b}{cx + d}$. Se sabe que tiene una asíntota horizontal en $y = 3$ y una asíntota vertical en $x = -2$.

### Enunciado
¿Cuál de las siguientes relaciones entre los coeficientes debe ser verdadera?

### Options
- [x] A) $a/c = 3$ y $d/c = 2$ <!-- feedback: Correcto. La AH es el cociente de los coeficientes principales (a/c=3). La AV es el valor que anula el denominador (cx+d=0 -> x=-d/c=-2 -> d/c=2). -->
- [ ] B) $a = 3$ y $d = -2$ <!-- feedback: Incorrecto. Estos son casos específicos, pero la relación depende de los cocientes con 'c'. -->
- [ ] C) $b/d = 3$ <!-- feedback: Incorrecto. El corte con el eje Y no define la asíntota horizontal. -->
- [ ] D) $a \cdot c = 3$ <!-- feedback: Incorrecto. La relación es de división, no de multiplicación. -->

### Explicación Pedagógica
Análisis avanzado de funciones racionales. El estudiante debe conectar los parámetros algebraicos de la expresión con el comportamiento asintótico observado en la gráfica.

---

## Question 19 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v19`
**Bloom:** Create
**ICFES:** Formulación y Ejecución

### Contexto
Determina la función inversa de $f(x) = \frac{e^x - e^{-x}}{2}$. Esta función es conocida como el seno hiperbólico $\sinh(x)$.

### Enunciado
¿Cuál es la expresión para $f^{-1}(x)$ en términos de logaritmos naturales?

### Options
- [x] A) $f^{-1}(x) = \ln(x + \sqrt{x^2 + 1})$ <!-- feedback: Correcto. Esta es la expresión deducida al resolver la ecuación cuadrática resultante al sustituir u = e^x. -->
- [ ] B) $f^{-1}(x) = \ln(x - 1)$ <!-- feedback: Incorrecto. Esta función es mucho más simple y no corresponde a la inversión de una combinación de exponenciales. -->
- [ ] C) $f^{-1}(x) = e^x + e^{-x}$ <!-- feedback: Incorrecto. No puedes tener x y e^x mezclados de esa forma en el resultado final simplificado. -->
- [ ] D) $f^{-1}(x) = \frac{1}{\sinh(x)}$ <!-- feedback: Incorrecto. Confundes función inversa con función recíproca (cosecante hiperbólica). -->

### Explicación Pedagógica
Reto de alta complejidad algebraica. Requiere transformar una expresión exponencial en una ecuación cuadrática latente ($u^2 - 2xu - 1 = 0$) y resolver para la variable original mediante logaritmación.

---

## Question 20 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P1-funciones-002-MASTERY-v20`
**Bloom:** Create
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Un diseñador gráfico quiere crear un patrón que se repita cada 2 unidades en el eje X, que nunca supere la altura de 1 y que sea simétrico respecto al eje Y.

### Enunciado
¿Cuál de las siguientes funciones modelaría mejor este comportamiento deseado?

### Options
- [x] A) $f(x) = \cos(\pi x)$ <!-- feedback: Correcto. Es periódica, su periodo es 2pi/pi = 2, su altura máxima es 1 y la función coseno es par (simetría eje Y). -->
- [ ] B) $f(x) = \sin(2x)$ <!-- feedback: Incorrecto. El periodo no es 2 y es una función impar (no simétrica respecto al eje Y). -->
- [ ] C) $f(x) = x^2$ <!-- feedback: Incorrecto. No es periódica y crece sin límite. -->
- [ ] D) $f(x) = 2^x$ <!-- feedback: Incorrecto. No es periódica ni simétrica. -->

### Explicación Pedagógica
Síntesis de propiedades funcionales. Integrar conceptos de periodicidad, acotación y paridad para seleccionar el modelo matemático que satisface un conjunto de restricciones estéticas y técnicas.
