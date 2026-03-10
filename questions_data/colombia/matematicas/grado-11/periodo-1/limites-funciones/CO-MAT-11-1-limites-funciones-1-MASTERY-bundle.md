---
id: "CO-MAT-11-1-limites-funciones-1-MASTERY"
protocol_version: "5.0"
periodo: 1
bundle_index: 1
total_questions: 20
calibration:
  expected_success_rate: 0.65
  discrimination_index_target: ">= 0.2"
---

# Bundle: Límites de Funciones (Mastery Edition - Bundle 1)

## Question 1 (Concepto Intuitivo - Dificultad 4)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Interpretación y Representación

### Enunciado
En una clase de matemáticas en Bogotá, un estudiante observa que al acercarse al valor $x = 2$ en la función $f(x) = \frac{x^2 - 4}{x - 2}$, la calculadora muestra valores cada vez más cercanos a 4, aunque la función no esté definida en $x = 2$. ¿Qué representa el valor 4 en este contexto?

### Opciones
- [x] A) El límite de la función $f(x)$ cuando $x$ tiende a 2. <!-- feedback: Correcto. El límite describe el valor al que se aproxima la función, independientemente de si está definida allí. -->
- [ ] B) La imagen exacta de la función evaluada en $x = 2$. <!-- feedback: Incorrecto. La función presenta una indeterminación 0/0 en $x = 2$, por lo que no tiene imagen allí. -->
- [ ] C) El valor de la pendiente de la recta secante en toda la función. <!-- feedback: Incorrecto. La pendiente de la secante requiere dos puntos y no es el concepto que describe la aproximación puntual. -->
- [ ] D) Una asíntota vertical ubicada en el punto $x = 4$. <!-- feedback: Incorrecto. La asíntota sería en $x = 2$ si el límite fuera infinito, pero aquí el límite es finito. -->

**Rubrica:** El estudiante identifica la definición intuitiva de límite como aproximación.
**Justificación:** El límite captura el comportamiento local de la función cerca de un punto, permitiendo entender valores "prohibidos" por el dominio.

---

## Question 2 (Límites Laterales - Dificultad 5)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v2`
**Bloom:** Analyze
**ICFES:** Interpretación y Representación

### Enunciado
Un sensor de nivel de agua en el Embalse del Guavio registra la altura $h(t)$ en metros. Si el límite por la izquierda cuando $t \to 5$ es 120m ($\lim_{t \to 5^-} h(t) = 120$) y el límite por la derecha es 125m ($\lim_{t \to 5^+} h(t) = 125$), ¿qué se puede afirmar sobre el límite general $\lim_{t \to 5} h(t)$?

### Opciones
- [ ] A) El límite es el promedio de ambos valores, es decir, 122.5m. <!-- feedback: Incorrecto. Los límites no se promedian; deben ser iguales para que el límite general exista. -->
- [ ] B) El límite es 125m porque siempre se toma el valor mayor en ingeniería. <!-- feedback: Incorrecto. La existencia del límite es una propiedad matemática estricta de unicidad. -->
- [x] C) El límite general no existe porque los límites laterales son diferentes. <!-- feedback: Correcto. La condición necesaria y suficiente para la existencia del límite es que ambos laterales coincidan. -->
- [ ] D) El límite es 120m si el sensor es de tecnología Nequi antigua. <!-- feedback: Incorrecto. La tecnología del sensor no cambia la definición matemática de la discontinuidad de salto. -->

**Rubrica:** Reconoce la condición de unicidad de los límites laterales.
**Justificación:** Si los caminos de aproximación llevan a valores distintos, la función no tiene una tendencia única en ese punto.

---

## Question 3 (Sustitución Directa - Dificultad 4)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Calcule el valor del siguiente límite aplicando las propiedades de los límites:
$$\lim_{x \to 3} (2x^2 - 5x + 1)$$

### Opciones
- [ ] A) 1
- [x] B) 4 <!-- feedback: Correcto. Sustituyendo: 2(3)^2 - 5(3) + 1 = 18 - 15 + 1 = 4. -->
- [ ] C) 7
- [ ] D) 0

**Rubrica:** Aplica la sustitución directa en funciones polinómicas continuas.
**Justificación:** Para polinomios, el límite en un punto coincide con el valor de la función en dicho punto.

---

## Question 4 (Indeterminación 0/0 por Factorización - Dificultad 6)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Un analista financiero en Medellín modela el crecimiento de una startup con la función $G(t) = \frac{t^2 - 5t + 6}{t - 2}$. ¿Cuál es el límite del crecimiento cuando el tiempo $t$ se aproxima a 2 meses?

### Opciones
- [x] A) -1 <!-- feedback: Correcto. Factorizando (t-2)(t-3)/(t-2) = t-3. Evaluando en 2: 2 - 3 = -1. -->
- [ ] B) 1 <!-- feedback: Incorrecto. Error en los signos de la factorización o evaluación. -->
- [ ] C) 0 <!-- feedback: Incorrecto. El valor 0 es el resultado del numerador antes de simplificar, no el límite. -->
- [ ] D) No existe <!-- feedback: Incorrecto. La indeterminación 0/0 es removible mediante factorización. -->

**Rubrica:** Resuelve indeterminaciones algebraicas tipo 0/0 usando factorización de trinomios.
**Justificación:** La eliminación del factor crítico $(t-2)$ permite hallar el valor verdadero de la tendencia.

---

## Question 5 (Indeterminación 0/0 por Racionalización - Dificultad 7)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Halle el valor de:
$$\lim_{x \to 0} \frac{\sqrt{x+9} - 3}{x}$$

### Opciones
- [ ] A) 1/3
- [x] B) 1/6 <!-- feedback: Correcto. Multiplicando por el conjugado: (x+9-9) / (x(sqrt(x+9)+3)) = 1 / (sqrt(x+9)+3). En x=0 es 1/6. -->
- [ ] C) 0
- [ ] D) 6

**Rubrica:** Utiliza el método del conjugado para eliminar raíces cuadradas en límites indeterminados.
**Justificación:** La racionalización transforma la expresión en una forma donde la sustitución directa es posible.

---

## Question 6 (Límites al Infinito - Dificultad 6)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Interpretación y Representación

### Enunciado
El costo promedio de producir $n$ ruanas en Boyacá está dado por $C(n) = \frac{50n + 2000}{n}$. ¿A qué valor se aproxima el costo promedio por unidad cuando la producción aumenta indefinidamente ($n \to \infty$)?

### Opciones
- [ ] A) $0 <!-- feedback: Incorrecto. El costo no desaparece, los costos fijos se diluyen pero el costo variable permanece. -->
- [x] B) $50 <!-- feedback: Correcto. Al dividir por n, obtenemos 50 + 2000/n. Cuando n tiende a infinito, 2000/n tiende a 0. -->
- [ ] C) $2000 <!-- feedback: Incorrecto. Este es el costo fijo total, no la tendencia del costo unitario. -->
- [ ] D) Infinito <!-- feedback: Incorrecto. La función es racional con grados iguales, el límite es el cociente de los coeficientes líderes. -->

**Rubrica:** Interpreta el comportamiento asintótico de funciones en contextos económicos.
**Justificación:** El límite al infinito representa el costo variable unitario una vez que los costos fijos se vuelven insignificantes por el volumen.

---

## Question 7 (Límites al Infinito Racionales - Dificultad 5)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Calcule el límite:
$$\lim_{x \to \infty} \frac{3x^2 - 4x + 5}{7x^2 + 8}$$

### Opciones
- [ ] A) 0
- [ ] B) Infinito
- [x] C) 3/7 <!-- feedback: Correcto. Al ser el grado del numerador igual al del denominador, el límite es el cociente de los coeficientes de mayor grado. -->
- [ ] D) 5/8

**Rubrica:** Compara grados de polinomios para determinar límites en el infinito.
**Justificación:** La técnica de dividir por la mayor potencia de $x$ simplifica el análisis de crecimiento relativo.

---

## Question 8 (Asíntotas Verticales - Dificultad 6)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Interpretación y Representación

### Enunciado
Dada la función $f(x) = \frac{1}{x-4}$, ¿cuál es el comportamiento del límite cuando $x$ se acerca a 4 por la derecha ($x \to 4^+$)?

### Opciones
- [x] A) $+\infty$ <!-- feedback: Correcto. Para valores como 4.01, el denominador es un positivo muy pequeño, lo que hace que la fracción crezca sin límite. -->
- [ ] B) $-\infty$ <!-- feedback: Incorrecto. Este sería el comportamiento si x se acercara por la izquierda (x < 4). -->
- [ ] C) 0 <!-- feedback: Incorrecto. El denominador tiende a 0, por lo que la función no puede tender a 0. -->
- [ ] D) 4 <!-- feedback: Incorrecto. El valor 4 es donde ocurre la indeterminación, no el resultado del límite. -->

**Rubrica:** Determina el signo del infinito en límites que resultan en constantes sobre cero.
**Justificación:** La dirección de la aproximación determina si la función se dispara hacia valores positivos o negativos muy grandes.

---

## Question 9 (Funciones a Trozos - Dificultad 7)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v9`
**Bloom:** Evaluate
**ICFES:** Argumentación

### Enunciado
Considere la función:
$f(x) = \begin{cases} x + k & \text{si } x < 3 \\ 2x - 1 & \text{si } x \ge 3 \end{cases}$
¿Qué valor debe tener la constante $k$ para que el límite $\lim_{x \to 3} f(x)$ exista?

### Opciones
- [ ] A) $k = 1$
- [x] B) $k = 2$ <!-- feedback: Correcto. Igualamos laterales: 3 + k = 2(3) - 1 => 3 + k = 5 => k = 2. -->
- [ ] C) $k = 5$
- [ ] D) $k = 3$

**Rubrica:** Calcula parámetros desconocidos para garantizar la existencia de límites en funciones definidas por partes.
**Justificación:** La existencia del límite requiere que las dos ramas de la función se "encuentren" en el mismo valor de $y$ en el punto de cambio.

---

## Question 10 (Límite Especial Trigonométrico - Dificultad 7)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Utilizando el límite fundamental $\lim_{\theta \to 0} \frac{\sin \theta}{\theta} = 1$, halle el valor de:
$$\lim_{x \to 0} \frac{\sin(5x)}{3x}$$

### Opciones
- [ ] A) 1
- [ ] B) 0
- [x] C) 5/3 <!-- feedback: Correcto. Multiplicamos y dividimos por 5: (5/3) * [sin(5x) / 5x]. El término en corchetes tiende a 1. -->
- [ ] D) 3/5

**Rubrica:** Manipula expresiones trigonométricas para aplicar límites fundamentales.
**Justificación:** El ajuste de coeficientes permite transformar un límite desconocido en una forma estándar conocida.

---

## Question 11 (Continuidad en un Punto - Dificultad 5)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v11`
**Bloom:** Remember
**ICFES:** Interpretación y Representación

### Enunciado
Para que una función $f(x)$ sea continua en un punto $c$, se deben cumplir tres condiciones. ¿Cuál de las siguientes NO es una de esas condiciones?

### Opciones
- [ ] A) $f(c)$ debe estar definida. <!-- feedback: Incorrecto. Esta es una condición necesaria; si no hay punto, no hay continuidad. -->
- [ ] B) $\lim_{x \to c} f(x)$ debe existir. <!-- feedback: Incorrecto. Es vital; la tendencia debe ser única. -->
- [x] C) $f'(c)$ debe ser mayor que cero. <!-- feedback: Correcto. Esta condición se refiere a la derivabilidad y crecimiento, no a la continuidad básica. -->
- [ ] D) $\lim_{x \to c} f(x) = f(c)$. <!-- feedback: Incorrecto. Es la condición final que une la tendencia con el valor real. -->

**Rubrica:** Identifica los requisitos formales de la continuidad puntual.
**Justificación:** La continuidad solo requiere que la función no tenga saltos, huecos o asíntotas en el punto; su pendiente (derivada) no es relevante aquí.

---

## Question 12 (Teorema del Emparedado/Squeeze - Dificultad 8)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Argumentación

### Enunciado
Si para todo $x \neq 0$ se cumple que $2 - x^2 \le g(x) \le 2 + x^2$, ¿cuál es el valor de $\lim_{x \to 0} g(x)$ según el Teorema del Emparedado?

### Opciones
- [ ] A) 0
- [x] B) 2 <!-- feedback: Correcto. Como lim(x->0) (2 - x^2) = 2 y lim(x->0) (2 + x^2) = 2, la función atrapada en el medio también debe tender a 2. -->
- [ ] C) No se puede determinar.
- [ ] D) 4

**Rubrica:** Aplica el teorema de estricción para hallar límites de funciones complejas acotadas.
**Justificación:** Si dos funciones convergen al mismo punto, cualquier función atrapada entre ellas debe converger al mismo valor.

---

## Question 13 (Aplicación en Física - Velocidad - Dificultad 6)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v13`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
La posición de un bus de TransMilenio está dada por $s(t) = 5t^2 + 2t$ metros. La velocidad instantánea en $t = 1$ se define como $\lim_{h \to 0} \frac{s(1+h) - s(1)}{h}$. ¿Cuál es esa velocidad?

### Opciones
- [ ] A) 7 m/s
- [x] B) 12 m/s <!-- feedback: Correcto. s(1+h) = 5(1+h)^2 + 2(1+h) = 5 + 10h + 5h^2 + 2 + 2h = 7 + 12h + 5h^2. Restando s(1)=7: (12h + 5h^2)/h = 12 + 5h. Límite es 12. -->
- [ ] C) 10 m/s
- [ ] D) 5 m/s

**Rubrica:** Relaciona el concepto de límite con la razón de cambio instantánea en cinemática.
**Justificación:** El límite del cociente incremental es la definición formal de velocidad en un instante dado.

---

## Question 14 (Límites Infinitos y Gráficas - Dificultad 5)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Interpretación y Representación

### Enunciado
Al observar la gráfica de una función $f(x)$, se nota que cuando $x$ se acerca a 3, los valores de $y$ crecen sin control hacia arriba por la izquierda y bajan sin control hacia abajo por la derecha. ¿Cuál es el valor del límite general $\lim_{x \to 3} f(x)$?

### Opciones
- [ ] A) $+\infty$
- [ ] B) $-\infty$
- [ ] C) 0
- [x] D) No existe <!-- feedback: Correcto. Como las tendencias laterales son hacia infinitos de signos opuestos, no hay un comportamiento único. -->

**Rubrica:** Interpreta discontinuidades esenciales a partir de representaciones visuales.
**Justificación:** La divergencia en direcciones opuestas en una asíntota vertical confirma la inexistencia del límite general.

---

## Question 15 (Indeterminación $\infty - \infty$ - Dificultad 7)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v15`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Halle el valor de:
$$\lim_{x \to \infty} (\sqrt{x^2 + 5x} - x)$$

### Opciones
- [ ] A) 0
- [ ] B) Infinito
- [x] C) 5/2 <!-- feedback: Correcto. Multiplicando por el conjugado: (x^2+5x-x^2) / (sqrt(x^2+5x)+x) = 5x / (sqrt(x^2(1+5/x))+x) = 5x / (x(sqrt(1+5/x)+1)) = 5/2. -->
- [ ] D) 5

**Rubrica:** Resuelve límites con diferencias de radicales mediante racionalización.
**Justificación:** Este tipo de indeterminación requiere comparar las tasas de crecimiento de ambos términos mediante álgebra.

---

## Question 16 (Teorema del Valor Intermedio - Dificultad 8)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v16`
**Bloom:** Evaluate
**ICFES:** Argumentación

### Enunciado
Dada una función continua $f$ en el intervalo $[0, 2]$ tal que $f(0) = -3$ y $f(2) = 5$. ¿Qué asegura el Teorema del Valor Intermedio sobre esta función?

### Opciones
- [ ] A) Que la función tiene un valor máximo de 5. <!-- feedback: Incorrecto. El teorema no habla de máximos o mínimos, sino de valores alcanzados. -->
- [x] B) Que existe al menos un valor $c$ en $(0, 2)$ tal que $f(c) = 0$. <!-- feedback: Correcto. Como la función cambia de signo y es continua, debe cruzar el eje X. -->
- [ ] C) Que la función es una línea recta. <!-- feedback: Incorrecto. El teorema aplica a cualquier curva continua. -->
- [ ] D) Que la derivada de la función es siempre positiva. <!-- feedback: Incorrecto. El comportamiento de la derivada no es garantizado por la continuidad. -->

**Rubrica:** Utiliza teoremas de existencia basados en la continuidad.
**Justificación:** La continuidad garantiza que para pasar de un valor a otro, la función debe recorrer todos los valores intermedios.

---

## Question 17 (Límites con Valor Absoluto - Dificultad 7)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v17`
**Bloom:** Analyze
**ICFES:** Interpretación y Representación

### Enunciado
Calcule $\lim_{x \to 0^-} \frac{|x|}{x}$.

### Opciones
- [ ] A) 1
- [x] B) -1 <!-- feedback: Correcto. Por la izquierda (x < 0), |x| = -x. Entonces (-x)/x = -1. -->
- [ ] C) 0
- [ ] D) No existe

**Rubrica:** Analiza límites laterales en funciones con valor absoluto.
**Justificación:** El valor absoluto cambia de definición analítica según el signo del argumento, lo que afecta el resultado del límite lateral.

---

## Question 18 (Límite con Cambio de Variable - Dificultad 8)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v18`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Calcule $\lim_{x \to 1} \frac{\sqrt[3]{x} - 1}{x - 1}$.

### Opciones
- [ ] A) 1
- [x] B) 1/3 <!-- feedback: Correcto. Usando u = x^(1/3), cuando x->1, u->1. El límite es (u-1)/(u^3-1) = (u-1)/((u-1)(u^2+u+1)) = 1/3. -->
- [ ] C) 3
- [ ] D) 0

**Rubrica:** Aplica sustituciones algebraicas o identidades de cubos para resolver límites con raíces no cuadradas.
**Justificación:** La transformación de la variable facilita la simplificación de factores que causan la indeterminación.

---

## Question 19 (Continuidad y Discontinuidad Removible - Dificultad 6)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v19`
**Bloom:** Analyze
**ICFES:** Interpretación y Representación

### Enunciado
Si una función tiene una discontinuidad en $x = a$ tal que el límite existe pero no es igual a $f(a)$, ¿cómo se clasifica matemáticamente esta falla en la continuidad?

### Opciones
- [x] A) Discontinuidad Removible (o Evitable). <!-- feedback: Correcto. Se llama así porque bastaría redefinir f(a) para que la función sea continua. -->
- [ ] B) Discontinuidad de Salto. <!-- feedback: Incorrecto. En el salto, los límites laterales son diferentes. -->
- [ ] C) Discontinuidad Infinita. <!-- feedback: Incorrecto. Requiere que la función tienda a infinito. -->
- [ ] D) Discontinuidad Oscilante. <!-- feedback: Incorrecto. Se da cuando la función no tiene tendencia por oscilaciones extremas. -->

**Rubrica:** Clasifica tipos de discontinuidades según el comportamiento del límite y el valor puntual.
**Justificación:** La existencia del límite indica que hay un "hueco" en la gráfica, el cual es reparable conceptualmente.

---

## Question 20 (Mastery Integration: El Salto del Tequendama - Dificultad 10)
**ID:** `CO-MAT-11-1-limites-funciones-1-MASTERY-v20`
**Bloom:** Transfer
**ICFES:** Argumentación + Transferencia

### Enunciado
**MASTER CHALLENGE:** Un modelo matemático para la caída de agua en el Salto del Tequendama define la velocidad de impacto $v$ en función de la resistencia del aire $k$ como $v(k) = \frac{mg}{k}(1 - e^{-kt/m})$.

Si un físico desea saber cuál sería la velocidad teórica si la resistencia del aire fuera despreciable ($k \to 0$), ¿qué herramienta de cálculo debe usar y cuál es el resultado conceptual? (Nota: Use la regla de L'Hôpital o expansión en serie si es necesario).

### Opciones
- [ ] A) El límite es 0, porque sin aire no hay movimiento. <!-- feedback: Incorrecto. La falta de resistencia aumenta la velocidad. -->
- [ ] B) El límite es infinito, porque nada detiene al agua. <!-- feedback: Incorrecto. El tiempo y la gravedad son finitos. -->
- [x] C) Se debe aplicar el límite cuando $k \to 0$, resultando en $v = gt$ (caída libre pura). <!-- feedback: Correcto. Al aplicar el límite (L'Hôpital sobre k), la expresión converge a la fórmula clásica de caída libre. -->
- [ ] D) No se puede calcular porque dividir por $k=0$ es pecado matemático en Colombia. <!-- feedback: Incorrecto. El cálculo diferencial nació precisamente para manejar divisiones por "casi cero". -->

**Rubrica:** Integra conocimientos de física, límites e indeterminaciones en un escenario de alta fidelidad.
**Justificación:** El límite permite conectar modelos complejos de ingeniería con leyes fundamentales de la física cuando desaparecen las perturbaciones externas.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Bloom | ICFES | Tema | Validado |
|----|-----|------|-------|-------|------|----------|
| 1 | ...-v1 | 4 | Remember | Interpretación | Concepto Intuitivo | ✅ |
| 2 | ...-v2 | 5 | Analyze | Interpretación | Límites Laterales | ✅ |
| 3 | ...-v3 | 4 | Apply | Formulación | Sustitución Directa | ✅ |
| 4 | ...-v4 | 6 | Apply | Formulación | Factorización | ✅ |
| 5 | ...-v5 | 7 | Apply | Formulación | Racionalización | ✅ |
| 6 | ...-v6 | 6 | Analyze | Interpretación | Límites Infinito (Contexto) | ✅ |
| 7 | ...-v7 | 5 | Apply | Formulación | Límites Infinito (Racional) | ✅ |
| 8 | ...-v8 | 6 | Analyze | Interpretación | Asíntotas Verticales | ✅ |
| 9 | ...-v9 | 7 | Evaluate | Argumentación | Funciones a Trozos | ✅ |
| 10 | ...-v10 | 7 | Apply | Formulación | Límites Trigonométricos | ✅ |
| 11 | ...-v11 | 5 | Remember | Interpretación | Condic. Continuidad | ✅ |
| 12 | ...-v12 | 8 | Evaluate | Argumentación | Teorema Squeeze | ✅ |
| 13 | ...-v13 | 6 | Apply | Formulación | Física (Velocidad) | ✅ |
| 14 | ...-v14 | 5 | Analyze | Interpretación | Gráficas e Infinito | ✅ |
| 15 | ...-v15 | 7 | Apply | Formulación | Indeterminación inf-inf | ✅ |
| 16 | ...-v16 | 8 | Evaluate | Argumentación | Teorema Valor Intermedio | ✅ |
| 17 | ...-v17 | 7 | Analyze | Interpretación | Valor Absoluto | ✅ |
| 18 | ...-v18 | 8 | Apply | Formulación | Cambio Variable | ✅ |
| 19 | ...-v19 | 6 | Analyze | Interpretación | Clasif. Discontinuidad | ✅ |
| 20 | ...-v20 | 10 | Transfer | Argumentación | Integración Real | ✅ |
