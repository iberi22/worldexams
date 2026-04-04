---
id: "CO-MAT-11-P1-inecuaciones-002-MASTERY"
protocol_version: "5.0"
alignment: "ICFES Saber 11 / Marcos Técnicos"
periodo: 1
bundle_index: 2
modern_context: true
calibration:
  expected_success_rate: 0.60
  discrimination_index_target: ">= 0.2"
  simulated_responses: 100
rubric_baseline: "modelamiento_algebraico, analisis_de_intervalos, toma_de_decisiones_financieras"
---

# Bundle Mastery: Inecuaciones y Modelamiento Algebraico

Este bundle profundiza en la resolución de inecuaciones lineales y cuadráticas aplicadas a contextos de optimización, costos de producción y análisis de rentabilidad.

---

## Question 1 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v1`
**Bloom:** Apply
**ICFES:** Modelación y Razonamiento

### Contexto
Una empresa de mensajería cobra una tarifa básica de $5,000 COP más $2,000 COP por cada kilogramo de peso del paquete. Un cliente desea que el costo total de envío no supere los $25,000 COP.

### Enunciado
¿Cuál es la inecuación que representa correctamente el peso máximo $x$ (en kg) que puede tener el paquete para cumplir con el presupuesto del cliente?

### Options
- [x] A) $5,000 + 2,000x \leq 25,000$ <!-- feedback: Correcto. La suma del cargo fijo y el cargo variable debe ser menor o igual al tope. -->
- [ ] B) $5,000x + 2,000 \leq 25,000$ <!-- feedback: Incorrecto. Aquí estás multiplicando el peso por la tarifa fija, lo cual no tiene sentido en este contexto. -->
- [ ] C) $5,000 + 2,000x < 25,000$ <!-- feedback: Casi correcto, pero el término "no supere" incluye la posibilidad de ser igual a $25,000. -->
- [ ] D) $2,000x - 5,000 \leq 25,000$ <!-- feedback: Incorrecto. Estás restando la tarifa fija en lugar de sumarla al costo variable. -->

### Explicación Pedagógica
El costo total se compone de una parte constante ($5,000) y una proporcional al peso ($2,000 \times x$). La restricción "no superar" se modela con el signo $\leq$.

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Comunicación y Representación

### Contexto
En el conjunto de los números reales, se define el intervalo solución de una inecuación como $S = (-3, 5]$.

### Enunciado
Representada en lenguaje simbólico, ¿cuál de las siguientes opciones describe exactamente los valores de $x$ incluidos en $S$?

### Options
- [ ] A) $-3 < x < 5$ <!-- feedback: Incorrecto. El corchete en el 5 indica que el 5 está incluido. -->
- [x] B) $-3 < x \leq 5$ <!-- feedback: Correcto. Paréntesis significa exclusión (<) y corchete significa inclusión (<=). -->
- [ ] C) $-3 \leq x \leq 5$ <!-- feedback: Incorrecto. El paréntesis en el -3 indica que el -3 no pertenece al conjunto. -->
- [ ] D) $x \in \mathbb{R} \setminus \{-3, 5\}$ <!-- feedback: Incorrecto. Esto describe todos los reales excepto esos dos puntos, no un intervalo continuo. -->

### Explicación Pedagógica
La notación de intervalos es fundamental para la interpretación de resultados en desigualdades. El extremo con paréntesis es abierto (excluido) y el extremo con corchete es cerrado (incluido).

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Se requiere despejar la variable $x$ en la inecuación lineal: $\frac{2x - 6}{4} > 2$.

### Enunciado
¿Cuál es el conjunto solución para los valores de $x$ que satisfacen la expresión?

### Options
- [ ] A) $x > 4$ <!-- feedback: Incorrecto. Al multiplicar 4 por 2 obtienes 8, luego sumas 6 para obtener 14. Finalmente 14/2 = 7. -->
- [ ] B) $x < 7$ <!-- feedback: Incorrecto. El sentido de la desigualdad no debe cambiar ya que el 4 es positivo. -->
- [x] C) $x > 7$ <!-- feedback: Correcto. $2x - 6 > 8 \Rightarrow 2x > 14 \Rightarrow x > 7$. -->
- [ ] D) $x \geq 14$ <!-- feedback: Incorrecto. Olvidaste dividir por el coeficiente de x al final. -->

### Explicación Pedagógica
El proceso implica eliminar el denominador multiplicando ambos lados, sumar el término constante y dividir por el coeficiente de la incógnita.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Resuelve la inecuación con valor absoluto: $|x + 2| \leq 4$.

### Enunciado
¿Cuál es el intervalo de números reales que satisface la desigualdad anterior?

### Options
- [ ] A) $[-4, 4]$ <!-- feedback: Incorrecto. Esta sería la solución para |x| <= 4. No consideraste el desplazamiento de +2. -->
- [ ] B) $[2, 6]$ <!-- feedback: Incorrecto. Los valores se desplazan hacia la izquierda en la recta numérica. -->
- [x] C) $[-6, 2]$ <!-- feedback: Correcto. $-4 \leq x + 2 \leq 4$. Al restar 2 en todos lados: $-6 \leq x \leq 2$. -->
- [ ] D) $(-\infty, -6] \cup [2, \infty)$ <!-- feedback: Incorrecto. Esta sería la solución para |x + 2| >= 4. -->

### Explicación Pedagógica
La propiedad $|u| \leq a \iff -a \leq u \leq a$ permite transformar la desigualdad con valor absoluto en una inecuación lineal doble.

---

## Question 5 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v5`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Una fábrica de calzado tiene costos mensuales fijos de $12,000,000 COP y un costo de producción de $40,000 COP por cada par de zapatos. El precio de venta por unidad es de $80,000 COP.

### Enunciado
¿Qué cantidad mínima de pares de zapatos debe producir y vender la fábrica al mes para comenzar a generar utilidades (es decir, que los ingresos sean estrictamente mayores que los costos totales)?

### Options
- [ ] A) 150 pares <!-- feedback: Incorrecto. Con 150 pares el ingreso es igual al costo variable, pero falta cubrir el costo fijo. -->
- [x] B) 301 pares <!-- feedback: Correcto. El punto de equilibrio es 300 pares ($80,000x = 40,000x + 12M \Rightarrow 40,000x = 12M \Rightarrow x = 300$). Para utilidades reales requerimos x > 300. -->
- [ ] C) 300 pares <!-- feedback: Incorrecto. En 300 pares la utilidad es exactamente cero. Se requiere "empezar a generar", lo que implica superar ese valor. -->
- [ ] D) 200 pares <!-- feedback: Incorrecto. Con 200 pares la fábrica aún presenta pérdidas. -->

### Explicación Pedagógica
Se plantea la inecuación: Ingreso ($80,000x$) > Costo Total ($40,000x + 12,000,000$). Al resolver, el resultado es $x > 300$. Por ser una variable discreta (pares de zapatos), el primer entero que satisface es 301.

---

## Question 6 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Considera la inecuación cuadrática: $x^2 - 5x + 6 < 0$.

### Enunciado
Analizando los signos de los factores, ¿cuál es el intervalo solución?

### Options
- [ ] A) $(-\infty, 2) \cup (3, \infty)$ <!-- feedback: Incorrecto. Esto sería la solución si buscáramos que el trinomio fuera positivo (> 0). -->
- [x] B) $(2, 3)$ <!-- feedback: Correcto. Los ceros son 2 y 3. Entre ellos, el producto de (x-2)(x-3) es negativo. -->
- [ ] C) $[2, 3]$ <!-- feedback: Incorrecto. La desigualdad es estricta (<), por lo que los extremos no deben incluirse. -->
- [ ] D) $\mathbb{R}$ <!-- feedback: Incorrecto. Solo una porción pequeña de la parábola está por debajo del eje x. -->

### Explicación Pedagógica
Factorizamos como $(x-2)(x-3) < 0$. Realizamos un cementerio o tabla de signos confirmando que el valor negativo se da cuando $2 < x < 3$.

---

## Question 7 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

### Contexto
Para que una inecuación de la forma $ax + b < c$ cambie el sentido de la desigualdad al despejar $x$:

### Enunciado
¿Cuál de las siguientes condiciones sobre los coeficientes debe cumplirse necesariamente?

### Options
- [ ] A) El valor de $c$ debe ser negativo. <!-- feedback: El signo de la constante a la derecha no afecta el sentido de la desigualdad. -->
- [x] B) El coeficiente $a$ debe ser negativo. <!-- feedback: Correcto. Multiplicar o dividir por un número negativo invierte la relación de orden. -->
- [ ] C) El valor absoluto de $b$ debe ser mayor que $c$. <!-- feedback: Esto solo afecta el punto de corte, no la dirección de la solución. -->
- [ ] D) La constante $b$ debe restarse en ambos lados. <!-- feedback: La resta no cambia el sentido de la desigualdad. -->

### Explicación Pedagógica
Es una propiedad fundamental de los reales: si $x < y \Rightarrow -x > -y$. Por lo tanto, cualquier operación que divida o multiplique por un negativo "voltea" el símbolo.

---

## Question 8 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Un agricultor sabe que para que su cultivo crezca óptimamente, la temperatura $T$ (en °C) debe cumplir con la inecuación: $|T - 22| \leq 5$.

### Enunciado
¿Entre qué valores de temperatura se garantiza el crecimiento óptimo del cultivo?

### Options
- [ ] A) Entre 15°C y 25°C <!-- feedback: Incorrecto. Los límites son calculados a partir de 22 +/- 5. -->
- [x] B) Entre 17°C y 27°C <!-- feedback: Correcto. $-5 \leq T - 22 \leq 5 \Rightarrow 17 \leq T \leq 27$. -->
- [ ] C) Solo a los 22°C <!-- feedback: Incorrecto. El valor absoluto indica un rango de tolerancia, no un valor único. -->
- [ ] D) Por debajo de 17°C <!-- feedback: Incorrecto. Las bajas temperaturas también quedan excluidas por ser una desigualdad de "menor o igual". -->

### Explicación Pedagógica
Situación práctica de tolerancia. El "valor ideal" es 22 y el error máximo permitido es 5 hacia arriba o hacia abajo.

---

## Question 9 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Resuelve la inecuación racional funcional: $\frac{x}{x-2} > 0$.

### Enunciado
¿Cuál es el conjunto solución?

### Options
- [ ] A) $(2, \infty)$ <!-- feedback: Incompleto. Olvidaste la zona donde ambos (numerador y denominador) son negativos. -->
- [ ] B) $(-\infty, 0)$ <!-- feedback: Incompleto. Olvidaste la zona donde ambos son positivos. -->
- [x] C) $(-\infty, 0) \cup (2, \infty)$ <!-- feedback: Correcto. La fracción es positiva si ambos tienen el mismo signo. -->
- [ ] D) $(0, 2)$ <!-- feedback: Incorrecto. En este rango la fracción es negativa (ej: x=1 -> 1/-1 = -1). -->

### Explicación Pedagógica
En inecuaciones racionales se analizan los puntos críticos (0 y 2). Probamos intervalos: $(-\infty, 0)$ ambos (-), resultado (+). $(0, 2)$ signos distintos, resultado (-). $(2, \infty)$ ambos (+), resultado (+).

---

## Question 10 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v10`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

### Contexto
Un estudiante afirma que si $a < b$, entonces $a^2 < b^2$ para cualquier par de números reales.

### Enunciado
Representa un contraejemplo que demuestre que esta afirmación es FALSA.

### Options
- [ ] A) $a = 1, b = 2$ <!-- feedback: Esto cumple la premisa y la conclusión (1 < 4), por lo tanto NO es un contraejemplo. -->
- [x] B) $a = -5, b = 2$ <!-- feedback: Correcto. -5 < 2 es verdadero, pero (-5)^2 < (2)^2 (25 < 4) es FALSO. -->
- [ ] C) $a = -2, b = -1$ <!-- feedback: Aunque -2 < -1, (-2)^2 < (-1)^2 (4 < 1) es falso, pero la opción B es más drástica y común para ilustrarlo. -->
- [ ] D) $a = 0, b = 1$ <!-- feedback: Esto confirma la regla, no la contradice. -->

### Explicación Pedagógica
La función cuadrado no es monótona creciente en todos los reales. Al elevar números negativos al cuadrado, su magnitud (valor absoluto) determina el orden final, invirtiendo la relación original.

---

## Question 11 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v11`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Se propone la inecuación $x^2 + 1 \leq 0$. Un matemático observa la expresión y concluye inmediatamente su solución.

### Enunciado
¿Cuál es la conclusión correcta y por qué?

### Options
- [ ] A) La solución es $x = \pm \sqrt{-1}$. <!-- feedback: Estamos trabajando en el conjunto de los números reales (Saber 11), no complejos. -->
- [x] B) No tiene solución en los reales, ya que un número al cuadrado más 1 siempre es positivo. <!-- feedback: Correcto. x^2 >= 0, por lo tanto x^2 + 1 >= 1 para todo x real. -->
- [ ] C) La solución es $x \leq -1$. <!-- feedback: Incorrecto. Si x = -2, (-2)^2 + 1 = 5, que no es <= 0. -->
- [ ] D) La solución es el conjunto vacío porque se trata de una asíntota. <!-- feedback: Aunque la solución es vacía, la razón no es una asíntota, sino la naturaleza de los cuadrados en R. -->

### Explicación Pedagógica
Evaluar la existencia de soluciones antes de operar. El conocimiento de que $x^2 \geq 0$ permite descartar resultados absurdos en contextos reales.

---

## Question 12 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Formulación y Ejecución

### Contexto
Se define el conjunto $A = \{x \in \mathbb{R} : \frac{1}{x} < 1\}$.

### Enunciado
¿Cuál de los siguientes intervalos representa correctamente al conjunto A?

### Options
- [ ] A) $(-\infty, 1)$ <!-- feedback: Incorrecto. Incluye el valor 0 donde la función no está definida, y excluye valores negativos donde 1/x SI es menor que 1. -->
- [ ] B) $(1, \infty)$ <!-- feedback: Incompleto. Olvidaste todos los números negativos. Si x=-2, 1/-2 = -0.5, que es < 1. -->
- [x] C) $(-\infty, 0) \cup (1, \infty)$ <!-- feedback: Correcto. Si x < 0, la fracción es negativa y por tanto menor a 1. Si x > 1, la fracción es positiva pero menor a 1. -->
- [ ] D) $(0, 1)$ <!-- feedback: Incorrecto. En este rango 1/x es mayor que 1 (ej: x=0.5 -> 1/0.5 = 2). -->

### Explicación Pedagógica
Análisis sistémico de funciones recíprocas. Es crucial separar el caso de números negativos ($x < 0$) del caso positivo donde al invertir la inecuación cambia el sentido ($x > 1$).

---

## Question 13 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Un proyectil es lanzado y su altura $h$ (en metros) respecto al tiempo $t$ (en segundos) está dada por la función $h(t) = -5t^2 + 20t + 25$.

### Enunciado
¿Durante qué intervalo de tiempo el proyectil se encuentra a una altura superior a 40 metros ($h > 40$)?

### Options
- [ ] A) Entre 0 y 5 segundos <!-- feedback: Este es el tiempo total de vuelo hasta que toca el suelo (h=0). -->
- [x] B) Entre 1 y 3 segundos <!-- feedback: Correcto. -5t^2 + 20t + 25 > 40 => -5t^2 + 20t - 15 > 0. Dividiendo por -5: t^2 - 4t + 3 < 0 => (t-1)(t-3) < 0. -->
- [ ] C) Solo al segundo 2 <!-- feedback: En t=2 alcanza su máxima altura (45m), pero a los 1.5s también está por encima de 40m. -->
- [ ] D) Entre 1 y 4 segundos <!-- feedback: Incorrecto. A los 4 segundos la altura es -5(16) + 80 + 25 = 25m, que es menor a 40m. -->

### Explicación Pedagógica
Aplicación de inecuaciones cuadráticas a la cinemática. Se requiere transformar la condición física en una desigualdad algebraica y resolver extrayendo las raíces.

---

## Question 14 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v14`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Un contratista debe cercar un terreno rectangular. El largo del terreno es 5 metros más que el ancho. Por restricciones de costo, el área del terreno no puede ser menor a 50 metros cuadrados ni mayor a 150 metros cuadrados.

### Enunciado
Si representamos el ancho como $x$, ¿qué sistema de inecuaciones modela correctamente esta situación?

### Options
- [x] A) $50 \leq x(x + 5) \leq 150$ <!-- feedback: Correcto. El área (largo por ancho) debe estar entre los dos límites permitidos. -->
- [ ] B) $50 \leq 2x + 2(x + 5) \leq 150$ <!-- feedback: Incorrecto. Esto modela el perímetro, no el área. -->
- [ ] C) $x + (x + 5) \leq 150$ <!-- feedback: Incorrecto. Esto sumaría simplemente las longitudes de dos lados. -->
- [ ] D) $x^2 + 5x = 100$ <!-- feedback: Incorrecto. Esto es una ecuación para un área específica de 100, no una restricción de rango. -->

### Explicación Pedagógica
Modelamiento geométrico. Identificar las variables y aplicar la fórmula de área ($A = b \cdot h$) dentro de una desigualdad compuesta (sándwich).

---

## Question 15 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v15`
**Bloom:** Create
**ICFES:** Formulación y Ejecución

### Contexto
Resuelve la inecuación compuesta: $x - 3 < 2x - 5 \leq x + 4$.

### Enunciado
¿Cuál es el conjunto de valores de $x$ que satisface ambas desigualdades simultáneamente?

### Options
- [ ] A) $(2, \infty)$ <!-- feedback: Incompleto. Esta solo satisface la primera parte (x > 2). -->
- [ ] B) $(-\infty, 9]$ <!-- feedback: Incompleto. Esta solo satisface la segunda parte (x <= 9). -->
- [x] C) $(2, 9]$ <!-- feedback: Correcto. De x-3 < 2x-5 surge x > 2. De 2x-5 <= x+4 surge x <= 9. -->
- [ ] D) $[2, 9]$ <!-- feedback: Incorrecto. La primera desigualdad es estricta (<), por lo tanto el 2 no se incluye. -->

### Explicación Pedagógica
Resolución de sistemas de inecuaciones. Una inecuación triple se separa en dos expresiones unidas por el conector lógico "Y" (intersección de conjuntos).

---

## Question 16 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Se tiene la inecuación racional $\frac{x^2 - 1}{x + 3} \geq 0$.

### Enunciado
Considerando que el denominador no puede ser cero, ¿cuál es el conjunto solución?

### Options
- [x] A) $(-3, -1] \cup [1, \infty)$ <!-- feedback: Correcto. Analizando puntos críticos -3, -1, 1. Probando intervalos obtenemos la validez de estos rangos. -->
- [ ] B) $(-\infty, -3) \cup [-1, 1]$ <!-- feedback: Incorrecto. En este rango los signos no favorecen el resultado positivo (ej: x=-4 -> 15/-1 = -15). -->
- [ ] C) $[-1, 1]$ <!-- feedback: Incompleto. Te faltó toda la zona después del 1. -->
- [ ] D) $\mathbb{R} \setminus \{-3\}$ <!-- feedback: Incorrecto. Hay zonas donde la expresión es negativa. -->

### Explicación Pedagógica
Análisis de signos en expresiones racionales con términos cuadráticos. Se deben identificar todos los factores $(x-1)(x+1)/(x+3)$ y evaluar sus signos zonales.

---

## Question 17 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Un inversor tiene dos opciones de portafolio para colocar sus ahorros de $10,000 USD. El portafolio A rinde un interés anual fijo del 8%. El portafolio B rinde un 5% fijo más una bonificación de 200 USD si el ahorro supera los 5,000 USD. 

### Enunciado
Desde una perspectiva puramente matemática, ¿bajo qué condición de ahorro inicial $x$ (donde $x \leq 10,000$) el portafolio A es siempre mejor que el B ($A > B$)?

### Options
- [ ] A) Para cualquier valor de $x$ mayor a 500. <!-- feedback: Incorrecto. No consideras el cambio en la regla de B a partir de los 5,000. -->
- [x] B) Para cuando $x > 6,666.67$ USD. <!-- feedback: Correcto. 0.08x > 0.05x + 200 => 0.03x > 200 => x > 6,666.67. (Nota: por debajo de 5,000 A siempre es mejor porque B no tiene bono). -->
- [ ] C) Siempre es mejor el portafolio A independientemente de $x$. <!-- feedback: Incorrecto. Si x es pequeño pero mayor a 5000, el bono de 200 puede pesar más que el 3% de diferencia. -->
- [ ] D) Nunca es mejor el portafolio A. <!-- feedback: Evidentemente falso dado que tiene una tasa base mayor. -->

### Explicación Pedagógica
Transferencia de inecuaciones a finanzas. El estudiante debe modelar condiciones discontinuas (bono condicional) y comparar funciones lineales por tramos mediante desigualdades.

---

## Question 18 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v18`
**Bloom:** Create
**ICFES:** Formulación y Ejecución

### Contexto
Un cilindro debe tener un volumen de al menos 500 cm³ y una altura fija de 10 cm. 

### Enunciado
¿Cuál es la restricción correcta para el radio $r$ de dicho cilindro? (Usa $\pi \approx 3$).

### Options
- [x] A) $r \geq \sqrt{16.67} \approx 4.08$ cm <!-- feedback: Correcto. V = pi * r^2 * h >= 500 => 3 * r^2 * 10 >= 500 => 30r^2 >= 500 => r^2 >= 16.67. -->
- [ ] B) $r \leq 4.08$ cm <!-- feedback: Incorrecto. Buscamos un volumen MÍNIMO, por lo tanto el radio debe superar un límite, no estar por debajo. -->
- [ ] C) $r \geq 16.67$ cm <!-- feedback: Incorrecto. Olvidaste sacar la raíz cuadrada del radio al despejar el área del círculo. -->
- [ ] D) $r = 4$ cm <!-- feedback: Esto es un valor específico, no una inecuación de restricción. -->

### Explicación Pedagógica
Integración de geometría y álgebra. El uso de inecuaciones para definir parámetros de diseño industrial bajo estándares mínimos de capacidad.

---

## Question 19 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Se afirma que para dos números reales positivos $a$ y $b$, la media aritmética es siempre mayor o igual a la media geométrica ($\frac{a+b}{2} \geq \sqrt{ab}$).

### Enunciado
¿Cuál de las siguientes expresiones algebraicas demuestra la veracidad de esta inecuación para todo $a, b > 0$?

### Options
- [x] A) $(\sqrt{a} - \sqrt{b})^2 \geq 0$ <!-- feedback: Correcto. Al desarrollar: a - 2*sqrt(ab) + b >= 0 => a + b >= 2*sqrt(ab) => (a+b)/2 >= sqrt(ab). -->
- [ ] B) $a^2 + b^2 \geq 2ab$ <!-- feedback: Aunque es cierta, no es la prueba directa de la relación entre media aritmética y geométrica sin pasos adicionales complejos. -->
- [ ] C) $a + b \geq ab$ <!-- feedback: Falso. Si a=1, b=1 -> 2 >= 1 (ok). Si a=10, b=10 -> 20 >= 100 (falso). -->
- [ ] D) $\sqrt{a} + \sqrt{b} \geq \sqrt{a+b}$ <!-- feedback: Cierto para positivos, pero no prueba la desigualdad de las medias. -->

### Explicación Pedagógica
Demostración analítica de desigualdades clásicas. Se requiere que el estudiante reconozca que un cuadrado perfecto en los reales nunca es negativo y pueda manipular dicha expresión para llegar a la tesis.

---

## Question 20 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P1-inecuaciones-002-MASTERY-v20`
**Bloom:** Create
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Un sistema de riego inteligente activa la bomba solo si la humedad $H$ es menor al 40% **Y** la probabilidad de lluvia $P$ es menor al 20%, o si la humedad es menor al 10% sin importar la lluvia.

### Enunciado
¿Cuál es la expresión lógica/algebraica que define cuándo la bomba se mantiene APAGADA (descomponiendo la negación de las condiciones de encendido)?

### Options
- [x] A) $(H \geq 10) \land [(H \geq 40) \lor (P \geq 20)]$ <!-- feedback: Correcto. Usando leyes de De Morgan sobre la condición de encendido. -->
- [ ] B) $(H > 40) \land (P > 20)$ <!-- feedback: Incompleto. No considera el caso de humedad extrema entre 10 y 40. -->
- [ ] C) $(H < 10) \lor (H < 40 \land P < 20)$ <!-- feedback: Esta es la condición de ENCENDIDO, no de apagado. -->
- [ ] D) $H + P > 60$ <!-- feedback: Incorrecto. Intenta sumar magnitudes de naturaleza distinta (humedad y probabilidad) sin lógica sistémica. -->

### Explicación Pedagógica
Lógica booleana aplicada a sistemas de control mediante inecuaciones. El estudiante debe ser capaz de modelar un sistema complejo y, más difícil aún, derivar su estado complementario (negación).

---

### Rúbrica de Justificación de Maestría (D9-10)
1. **Modelamiento:** El estudiante traduce correctamente el lenguaje natural/técnico a expresiones algebraicas y lógicas (Inecuaciones).
2. **Análisis de Casos:** Identifica puntos críticos, discontinuidades y dominios válidos en funciones finacieras o físicas.
3. **Rigurosidad:** Demuestra teoremas o propiedades estructurales de las desigualdades mediante manipulación simbólica precisa.
4. **Pensamiento Sistémico:** Integra múltiples restricciones para definir estados de un sistema o tomar decisiones óptimas.
