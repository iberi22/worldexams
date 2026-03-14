---
id: "CO-MAT-11-P1-limites-002-MASTERY"
protocol_version: "5.0"
alignment: "ICFES Saber 11 / Marcos Técnicos"
periodo: 1
bundle_index: 2
modern_context: true
calibration:
  expected_success_rate: 0.55
  discrimination_index_target: ">= 0.2"
  simulated_responses: 100
rubric_baseline: "calculo_limites_indeterminados, interpretacion_de_tendencias, analisis_asintotico"
---

# Bundle Mastery: Límites, Continuidad e Infinito

Este bundle profundiza en el comportamiento asintótico de las funciones, la resolución de indeterminaciones complejas y la fundamentación teórica de la continuidad como base del cálculo diferencial.

---

## Question 1 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v1`
**Bloom:** Understand
**ICFES:** Comunicación y Representación

### Contexto
Un estudiante observa que a medida que $x$ se acerca a 5 por la derecha ($x \to 5^+$), la función $f(x)$ crece sin límite hacia $+\infty$.

### Enunciado
¿Cuál es la interpretación gráfica correcta de este comportamiento?

### Options
- [ ] A) Hay un hueco en $(5, \infty)$. <!-- feedback: Incorrecto. Un hueco es una discontinuidad puntual, no una tendencia al infinito. -->
- [x] B) Existe una **asíntota vertical** en $x = 5$. <!-- feedback: Correcto. Si la función tiende al infinito en un punto fijo, existe una barrera vertical. -->
- [ ] C) La función es continua en $x = 5$. <!-- feedback: Incorrecto. Si tiende a infinito, la función no está definida en ese punto, luego es discontinua. -->
- [ ] D) Hay una asíntota horizontal en $y = 5$. <!-- feedback: Incorrecto. Las asíntotas horizontales describen el comportamiento cuando x tiende al infinito, no en un valor fijo. -->

### Explicación Pedagógica
El concepto de límite al infinito en un punto define las asíntotas verticales. Es el comportamiento de funciones racionales donde el denominador se anula pero el numerador no.

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v2`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Calcula el siguiente límite mediante sustitución directa: $\lim_{x \to -1} (x^3 - 2x + 5)$.

### Enunciado
¿Cuál es el valor del límite?

### Options
- [x] A) 6 <!-- feedback: Correcto. (-1)^3 - 2(-1) + 5 = -1 + 2 + 5 = 6. -->
- [ ] B) 4 <!-- feedback: Incorrecto. Cometiste un error de signos al elevar -1 al cubo o al multiplicar -2 por -1. -->
- [ ] C) 8 <!-- feedback: Incorrecto. Sumaste los valores sin respetar los signos negativos de la expresión. -->
- [ ] D) 2 <!-- feedback: Incorrecto. Fallaste en la aritmética básica de la sustitución. -->

### Explicación Pedagógica
Para funciones polinómicas, que son continuas en todos los reales, el límite en un punto es simplemente el valor de la función evaluada en dicho punto.

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentación

### Contexto
Se sabe que $\lim_{x \to 2^-} f(x) = 10$ y $\lim_{x \to 2^+} f(x) = 4$.

### Enunciado
¿Cuál de las siguientes afirmaciones sobre $\lim_{x \to 2} f(x)$ es verdadera?

### Options
- [ ] A) El límite es 7 (el promedio). <!-- feedback: Incorrecto. Los límites no se promedian cuando son distintos. -->
- [x] B) El límite **no existe**. <!-- feedback: Correcto. Para que un límite bilateral exista, los laterales deben ser iguales. -->
- [ ] C) El límite es 10. <!-- feedback: Incorrecto. Este es solo el límite por la izquierda. -->
- [ ] D) El límite es 4. <!-- feedback: Incorrecto. Este es solo el límite por la derecha. -->

### Explicación Pedagógica
Unicidad del límite: Si una función "llega" a dos alturas distintas según el lado por el que te acerques, el límite global en ese punto no puede ser definido.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Resuelve el límite al infinito: $\lim_{x \to \infty} \frac{5}{x^2 + 1}$.

### Enunciado
¿A qué valor tiende la expresión?

### Options
- [x] A) 0 <!-- feedback: Correcto. Una constante dividida por una cantidad que crece infinitamente siempre tiende a cero. -->
- [ ] B) 5 <!-- feedback: Incorrecto. El 5 solo es el numerador; el denominador lo hace infinitesimal. -->
- [ ] C) Infinito <!-- feedback: Incorrecto. Solo sería infinito si el x estuviera en el numerador. -->
- [ ] D) 1 <!-- feedback: Incorrecto. Ignoraste el efecto de la x en el denominador. -->

### Explicación Pedagógica
Análisis de "pesos": cuando el denominador tiene un grado mayor que el numerador, la función se "aplasta" contra el eje X a medida que avanzamos hacia el infinito.

---

## Question 5 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v5`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Dada la expresión $\lim_{x \to 3} \frac{x^2 - 9}{x - 3}$. Al sustituir $x=3$ se obtiene la forma indeterminada $0/0$.

### Enunciado
Tras simplificar la expresión mediante factorización, ¿cuál es el valor real del límite?

### Options
- [ ] A) 0 <!-- feedback: Incorrecto. Aunque obtengas 0/0, el límite tiene un valor definido tras simplificar. -->
- [x] B) 6 <!-- feedback: Correcto. (x-3)(x+3)/(x-3) simplifica a x+3. Al evaluar en 3 da 6. -->
- [ ] C) 3 <!-- feedback: Incorrecto. Evaluaste incorrectamente la expresión simplificada. -->
- [ ] D) No existe <!-- feedback: Incorrecto. Las indeterminaciones 0/0 suelen ocultar límites finitos. -->

### Explicación Pedagógica
Técnica de cancelación de factores: La forma $0/0$ indica que tanto arriba como abajo hay un "culpable" ($(x-3)$) que causa la nulidad. Al eliminarlo, descubrimos la tendencia real de la función.

---

## Question 6 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Calcula $\lim_{x \to 0} \frac{x^2 + 2x}{x}$.

### Enunciado
¿Cuál es el resultado de este límite?

### Options
- [x] A) 2 <!-- feedback: Correcto. Factorizando x(x+2)/x simplifica a x+2. Al evaluar en 0 da 2. -->
- [ ] B) 0 <!-- feedback: Incorrecto. Aunque sustituir directamente da 0/0, la simplificación da otro valor. -->
- [ ] C) Infinito <!-- feedback: Incorrecto. El denominador se cancela completamente con un término del numerador. -->
- [ ] D) 1 <!-- feedback: Incorrecto. Olvidaste el término lineal 2x al realizar la factorización. -->

### Explicación Pedagógica
Similar al caso anterior, extraemos factor común para limpiar la indeterminación generada por el monomio $x$.

---

## Question 7 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v7`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentación

### Contexto
El límite de una función cuando $x \to \infty$ es $L$.

### Enunciado
¿Qué significa este hecho en términos de la gráfica de la función?

### Options
- [ ] A) La función tiene un valor máximo en L. <!-- feedback: No necesariamente; puede cruzar L y seguir tendiendo a él. -->
- [x] B) Existe una **asíntota horizontal** en $y = L$. <!-- feedback: Correcto. L es el valor hacia el cual se estabiliza la función a largo plazo. -->
- [ ] C) La función cruza el eje Y en el punto L. <!-- feedback: Esto sería f(0), no tiene relación con el límite al infinito. -->
- [ ] D) El dominio de la función termina en L. <!-- feedback: Los límites al infinito hablan del comportamiento, no del fin del dominio. -->

### Explicación Pedagógica
Las asíntotas horizontales describen la "meta" de la función para valores extremadamente grandes o pequeños de X.

---

## Question 8 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Halla el límite: $\lim_{x \to \infty} \frac{2x^2 + 4x - 1}{5x^2 - 7}$.

### Enunciado
¿Cuál es el valor del límite al infinito?

### Options
- [ ] A) 0 <!-- feedback: Incorrecto. Esto pasaría si el grado del denominador fuera mayor. -->
- [ ] B) Infinito <!-- feedback: Incorrecto. Esto pasaría si el grado del numerador fuera mayor. -->
- [x] C) $2/5$ <!-- feedback: Correcto. Cuando los grados son iguales, el límite es el cociente de los coeficientes principales. -->
- [ ] D) $4/7$ <!-- feedback: Incorrecto. Tomaste coeficientes que no pertenecen al término de mayor grado. -->

### Explicación Pedagógica
Regla de los grados: Para límites al infinito de funciones racionales, el comportamiento está dominado por los términos de mayor potencia ($x^n$).

---

## Question 9 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Resuelve el límite trigonométrico fundamental: $\lim_{x \to 0} \frac{\sin(4x)}{x}$.

### Enunciado
¿Cuál es el valor correcto?

### Options
- [ ] A) 1 <!-- feedback: Incorrecto. Te falta considerar el factor interno 4x. -->
- [x] B) 4 <!-- feedback: Correcto. Usando el límite notable sen(u)/u -> 1 cuando u -> 0, multiplicamos y dividimos por 4. -->
- [ ] C) 0 <!-- feedback: Incorrecto. Aunque sustituir de sen(0)/0, no es un límite nulo. -->
- [ ] D) 1/4 <!-- feedback: Incorrecto. El factor 4 está en el numerador del ángulo, multiplicando la tendencia. -->

### Explicación Pedagógica
Propiedad de linealidad: $\lim_{x \to 0} \frac{\sin(ax)}{bx} = \frac{a}{b}$. Es uno de los límites más evaluados en pruebas de estado.

---

## Question 10 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v10`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Calcula $\lim_{x \to \infty} \frac{x^3 + 1}{x^2 + 100}$.

### Enunciado
¿Cuál es el resultado?

### Options
- [ ] A) 0 <!-- feedback: Incorrecto. El numerador crece más rápido que el denominador. -->
- [ ] B) 1 <!-- feedback: Incorrecto. Los grados no son iguales. -->
- [x] C) Infinito <!-- feedback: Correcto. Como el grado del numerador (3) es mayor que el del denominador (2), la función no tiene techo. -->
- [ ] D) 1/100 <!-- feedback: Incorrecto. Te dejaste distraer por la constante grande del denominador. -->

### Explicación Pedagógica
Dominancia de potencias: A largo plazo, el término $x^3$ se vuelve inmensamente más grande que $x^2$, haciendo que la fracción estalle hacia el infinito.

---

## Question 11 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v11`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Dada la función $f(x) = \frac{|x|}{x}$.

### Enunciado
¿Qué se puede afirmar sobre el $\lim_{x \to 0} f(x)$?

### Options
- [ ] A) El límite es 1. <!-- feedback: Solo por la derecha f(x) = x/x = 1. -->
- [ ] B) El límite es -1. <!-- feedback: Solo por la izquierda f(x) = -x/x = -1. -->
- [ ] C) El límite es 0. <!-- feedback: Incorrecto. La función nunca vale cero cerca de cero. -->
- [x] D) **No existe**, porque los límites laterales son distintos. <!-- feedback: Correcto. Al ser 1 por la derecha y -1 por la izquierda, hay un salto. -->

### Explicación Pedagógica
Análisis del valor absoluto en el origen. El cambio brusco de signo en la definición de $|x|$ produce una discontinuidad de salto inevitable.

---

## Question 12 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v12`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Resuelve el límite racional irracional: $\lim_{x \to 4} \frac{\sqrt{x} - 2}{x - 4}$.

### Enunciado
¿Cuál es el valor del límite tras aplicar racionalización o factorización?

### Options
- [x] A) $1/4$ <!-- feedback: Correcto. Multiplicando por el conjugado (sqrt(x)+2) queda 1/(sqrt(x)+2). Evaluando en 4 da 1/4. -->
- [ ] B) $1/2$ <!-- feedback: Incorrecto. Olvidaste sumar los dos términos del denominador tras racionalizar (2+2=4). -->
- [ ] C) 0 <!-- feedback: Incorrecto. La indeterminación se rompe a favor de un valor finito. -->
- [ ] D) 4 <!-- feedback: Incorrecto. Realizaste un despeje invertido. -->

### Explicación Pedagógica
Técnica del conjugado: Multiplicar por $(\sqrt{x} + 2)$ permite usar la diferencia de cuadrados para eliminar la raíz del numerador y cancelar el factor crítico $(x-4)$.

---

## Question 13 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v13`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Considera la función $f(x) = \frac{x^2 - x - 2}{x^2 - 4}$. Se desea saber si tiene una asíntota vertical o un hueco en $x = 2$.

### Enunciado
¿Cuál es la naturaleza de la discontinuidad en $x = 2$?

### Options
- [ ] A) Asíntota vertical. <!-- feedback: Incorrecto. Al evaluar 2 en el numerador también da cero (4-2-2=0), lo que sugiere un hueco. -->
- [x] B) Punto vacío (**hueco**). <!-- feedback: Correcto. (x-2)(x+1)/(x-2)(x+2) cancela el (x-2). -->
- [ ] C) Es continua. <!-- feedback: Incorrecto. Sigue sin estar definida en f(2). -->
- [ ] D) Salto infinito negativo. <!-- feedback: Incorrecto. Al cancelarse el denominador cero, el límite es finito (3/4). -->

### Explicación Pedagógica
Criterio de clasificación: Si el valor anula solo el denominador, hay asíntota. Si anula ambos y se puede cancelar, hay hueco.

---

## Question 14 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v14`
**Bloom:** Create
**ICFES:** Formulación y Ejecución

### Contexto
Calcula el límite al infinito: $\lim_{x \to \infty} (\sqrt{x^2 + x} - x)$.

### Enunciado
Tras aplicar racionalización, ¿cuál es el resultado?

### Options
- [ ] A) 0 <!-- feedback: Incorrecto. Aunque parezca que es "infinito menos infinito", los términos no crecen a la misma tasa exacta. -->
- [ ] B) Infinito <!-- feedback: Incorrecto. La resta de los términos líderes x - x estabiliza la función. -->
- [x] C) $1/2$ <!-- feedback: Correcto. Racionalizando queda x / (sqrt(x^2+x) + x). Al dividir por x tiende a 1/(1+1) = 1/2. -->
- [ ] D) 1 <!-- feedback: Incorrecto. Olvidaste el factor del denominador en la tendencia al infinito. -->

### Explicación Pedagógica
Límites de tipo $(\infty - \infty)$. Se requiere "arrastrar" la diferencia hacia una forma racional mediante el conjugado para poder comparar sus tasas de crecimiento.

---

## Question 15 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Una función $f(x)$ cumple que $|f(x) - 5| \leq (x-2)^2$ para todo $x$.

### Enunciado
¿Cuál es el valor del $\lim_{x \to 2} f(x)$ basado en el Teorema del Sándwich (o del encaje)?

### Options
- [x] A) 5 <!-- feedback: Correcto. Como (x-2)^2 tiende a 0 cuando x->2, la distancia entre f(x) y 5 debe tender a 0. -->
- [ ] B) 2 <!-- feedback: Incorrecto. 2 es el valor al que se acerca x, no la función. -->
- [ ] C) 0 <!-- feedback: Incorrecto. Es el límite de la diferencia, lo que hace que f(x) se acerque a 5. -->
- [ ] D) No se puede determinar. <!-- feedback: Incorrecto. El teorema del sándwich garantiza precisamente este tipo de límites por acotación. -->

### Explicación Pedagógica
Teorema del Sándwich: Si una función está "atrapada" entre dos funciones que tienden al mismo valor en un punto, la función del medio se ve obligada a converger al mismo valor.

---

## Question 16 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Halla el valor de la constante $k$ para que el límite $\lim_{x \to 1} \frac{x^2 + kx - 5}{x - 1}$ exista y sea finito.

### Enunciado
¿Qué valor debe tener $k$?

### Options
- [ ] A) $k = 5$ <!-- feedback: Incorrecto. El numerador debe ser 0 en x=1 para poder cancelar el (x-1). -->
- [x] B) $k = 4$ <!-- feedback: Correcto. 1^2 + k(1) - 5 = 0 => 1 + k - 5 = 0 => k = 4. -->
- [ ] C) $k = 0$ <!-- feedback: Incorrecto. El numerador quedaría como x^2-5, que no es divisible por x-1. -->
- [ ] D) Cualquier valor. <!-- feedback: Incorrecto. Para la mayoría de los valores de k, el límite sería infinito. -->

### Explicación Pedagógica
Ingeniería de límites: Un límite racional en un punto que anula el denominador solo puede existir si el numerador también se anula en dicho punto (indeterminación evitable).

---

## Question 17 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Se define la función $f(x) = \sin(1/x)$ cerca de $x = 0$.

### Enunciado
¿Cuál es la razón técnica por la cual el $\lim_{x \to 0} \sin(1/x)$ **no existe**?

### Options
- [ ] A) Porque tiende al infinito. <!-- feedback: Incorrecto. El seno está acotado entre -1 y 1. -->
- [x] B) Debido a la **oscilación infinita**. <!-- feedback: Correcto. A medida que x se acerca a 0, el ángulo 1/x crece e hace que el seno oscile entre -1 y 1 cada vez más rápido sin estabilizarse. -->
- [ ] C) Porque no está definida en 0. <!-- feedback: Estar definida o no no impide que un límite exista (ej: huecos). -->
- [ ] D) Porque los límites laterales son infinitos de signo opuesto. <!-- feedback: Incorrecto. El seno nunca puede ser infinito. -->

### Explicación Pedagógica
Límite por oscilación. A diferencia de las asíntotas, aquí el límite no existe porque la función nunca "se decide" por un único valor, rebotando infinitamente en el intervalo acotado.

---

## Question 18 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v18`
**Bloom:** Create
**ICFES:** Formulación y Ejecución

### Contexto
Calcula $\lim_{x \to 0} \frac{x - \sin(x)}{x^3}$. (Requiere regla de L'Hôpital repetida o series de Taylor).

### Enunciado
¿Cuál es el valor del límite?

### Options
- [x] A) $1/6$ <!-- feedback: Correcto. Aplicando L'Hopital tres veces: (1-cos x)/3x^2 -> (sen x)/6x -> (cos x)/6 -> 1/6. -->
- [ ] B) 0 <!-- feedback: Incorrecto. Aunque las tasas de cambio de x y sen(x) son iguales en primer orden, no lo son en órdenes superiores. -->
- [ ] C) $1/3$ <!-- feedback: Incorrecto. Fallaste en un coeficiente de las derivadas sucesivas. -->
- [ ] D) Infinito <!-- feedback: Incorrecto. El x^3 en el denominador es compensado por la lentitud de crecimiento de x-sen(x). -->

### Explicación Pedagógica
Análisis de orden de infinitésimos. Este límite muestra cómo funciones que parecen iguales cerca del origen tienen sutiles diferencias de curvatura que solo se revelan al comparar potencias superiores.

---

## Question 19 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v19`
**Bloom:** Create
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Un modelo financiero describe el valor de una inversión con interés compuesto continuado como $V(t) = P \cdot e^{rt}$. Se sabe que $e^r = \lim_{n \to \infty} (1 + \frac{r}{n})^n$.

### Enunciado
Si el interés $r$ tiende a ser muy grande (infinito), ¿qué sucede con la tasa de crecimiento del valor $V$ respecto al tiempo?

### Options
- [x] A) Crece de forma **super-exponencial**. <!-- feedback: Correcto. El exponente rt crece linealmente con r, pero la función exponencial lo eleva a un orden superior de magnitud. -->
- [ ] B) Se estabiliza en un valor máximo. <!-- feedback: Incorrecto. No hay saturación en el modelo exponencial puro sin frenos externos. -->
- [ ] C) Se vuelve lineal. <!-- feedback: Incorrecto. El aumento del interés acelera la curva, no la aplana. -->
- [ ] D) Se vuelve negativa. <!-- feedback: Absurdo en un contexto de interés positivo. -->

### Explicación Pedagógica
Modelado de límites en finanzas exponenciales. Entender el límite que define a 'e' permite comprender por qué el interés compuesto es la fuerza más poderosa del crecimiento acumulativo.

---

## Question 20 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P1-limites-002-MASTERY-v20`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Se define una función $f$ tal que para todo $x > 0$, $\frac{2x - \sin(x)}{x} < f(x) < \frac{2x + 1}{x}$.

### Enunciado
¿Cuál es el valor exacto de $\lim_{x \to \infty} f(x)$?

### Options
- [ ] A) 0 <!-- feedback: Incorrecto. Las funciones que acotan tienden a 2, no a 0. -->
- [x] B) 2 <!-- feedback: Correcto. Por la izquierda: 2 - sen(x)/x tiende a 2 (sen(x)/x -> 0). Por la derecha: 2 + 1/x tiende a 2. Por sándwich, f(x) -> 2. -->
- [ ] C) 1 <!-- feedback: Incorrecto. Fallaste al calcular el límite de las funciones de borde. -->
- [ ] D) No se puede determinar porque sen(x) oscila. <!-- feedback: Incorrecto. Aunque sen(x) oscila, al dividir por x tendiendo al infinito, su efecto se anula. -->

### Explicación Pedagógica
Sándwich en el infinito. Demuestra cómo acotar una función desconocida entre dos tendencias conocidas permite fijar su comportamiento asintótico con precisión absoluta.

---

### Rúbrica de Justificación de Maestría (D9-10)
1. **Manipulación de Infinitésimos:** Maneja con precisión límites trigonométricos y comparaciones de órdenes de magnitud ($x$ vs $\sin x$ vs $x^3$).
2. **Abstracción Asintótica:** Identifica comportamientos sutiles como la oscilación infinita o el encaje por sándwich en contextos no triviales.
3. **Rigurosidad Teórica:** Diferencia correctamente entre tipos de discontinuidades y condiciones de existencia de límites en funciones compuestas.
4. **Aplicación Trascendente:** Conecta límites fundamentales (como la definición de $e$) con modelos del mundo real (finanzas o física).
