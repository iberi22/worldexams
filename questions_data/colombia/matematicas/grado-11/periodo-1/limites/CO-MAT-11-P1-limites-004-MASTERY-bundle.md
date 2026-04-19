---
id: "CO-MAT-11-P1-limites-004-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "limites"
periodo: 1
protocol_version: "5.1"
bundle_index: 4
bundle_size: 20
alignment: "ICFES Saber 11 + MEN"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: 0.50
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "limites_infinitos, limites_al_infinito, asintotas_oblicuas, continuidad_avanzada"
---

# Bundle Mastery: Límites Infinitos y Comportamiento Asintótico

Este bundle aborda el estudio avanzado de los límites, centrándose en el comportamiento de las funciones cuando tienden al infinito y cuando sus valores crecen sin límite. Se analizan las asíntotas horizontales, verticales y oblicuas, así como su relevancia en el modelado de fenómenos a largo plazo.

---

## Question 1 (Difficulty D3)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comunicación y Representación

### Contexto
Un estudiante está graficando la función $f(x) = \frac{1}{x-5}$ y nota que la curva "se pega" a la línea vertical $x=5$ sin tocarla.

### Enunciado
¿Cuál es la interpretación de este comportamiento en términos de límites?

### Options
- [ ] A) El límite cuando $x \to 5$ es igual a $1$. <!-- feedback: Incorrecto. El valor de la función crece indefinidamente, no se acerca a 1. -->
- [x] B) Existe una asíntota vertical en $x=5$ porque el límite tiende a infinito. <!-- feedback: Correcto. Cuando el denominador se anula y el numerador no, la función presenta un comportamiento asintótico vertical. -->
- [ ] C) El límite cuando $x \to 5$ es igual a $0$. <!-- feedback: Incorrecto. El valor 0 sería el límite cuando x tiende a infinito (asíntota horizontal). -->
- [ ] D) La función es continua en $x=5$. <!-- feedback: Incorrecto. La función está indefinida en ese punto y presenta un salto infinito. -->

### Explicación Pedagógica
Las asíntotas verticales ocurren en los valores donde la función no está definida y sus valores crecen o decrecen sin límite a medida que se acerca a dicho punto.

---

## Question 2 (Difficulty D3)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentación

### Contexto
Se evalúa el límite $\lim_{x \to \infty} \frac{1}{x}$.

### Enunciado
¿Cuál es el valor resultante de esta tendencia al infinito?

### Options
- [x] A) $0$ <!-- feedback: Correcto. A medida que el denominador crece indefinidamente, el valor de la fracción se hace cada vez más pequeño, aproximándose a cero. -->
- [ ] B) $1$ <!-- feedback: Incorrecto. La fracción disminuye, no se estabiliza en 1. -->
- [ ] C) $Infinity$ <!-- feedback: Incorrecto. El crecimiento del denominador reduce el valor total, no lo aumenta. -->
- [ ] D) No existe. <!-- feedback: Incorrecto. El límite está bien definido y es la base para encontrar asíntotas horizontales. -->

### Explicación Pedagógica
El límite fundamental $\lim_{x \to \infty} \frac{1}{x} = 0$ es la herramienta clave para simplificar límites de funciones racionales de mayor complejidad.

---

## Question 3 (Difficulty D4)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Dada la función racional $f(x) = \frac{4x^2 + 7}{2x^2 - 5}$.

### Enunciado
¿Cuál es el valor de $\lim_{x \to \infty} f(x)$?

### Options
- [ ] A) $0$ <!-- feedback: Incorrecto. Esto pasaría si el grado del denominador fuera mayor. -->
- [x] B) $2$ <!-- feedback: Correcto. Al dividir por x^2, el límite es el cociente de los coeficientes principales: 4 / 2 = 2. -->
- [ ] C) $4$ <!-- feedback: Incorrecto. Olvidaste considerar el coeficiente del denominador. -->
- [ ] D) $Infinity$ <!-- feedback: Incorrecto. Como los grados son iguales, la función tiende a un valor constante. -->

### Explicación Pedagógica
Para límites al infinito de funciones racionales con el mismo grado, el resultado es siempre la razón entre los coeficientes de los términos de mayor potencia.

---

## Question 4 (Difficulty D4)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Comunicación y Representación

### Contexto
Una función $f(x)$ tiene una asíntota horizontal en $y = -3$.

### Enunciado
¿Qué significa esta afirmación gráficamente?

### Options
- [ ] A) La función cruza el eje Y en -3. <!-- feedback: Incorrecto. El intercepto con Y y la asíntota horizontal son conceptos distintos. -->
- [x] B) A medida que $x$ crece o decrece mucho, los valores de la función se acercan a -3. <!-- feedback: Correcto. Las asíntotas horizontales describen el "techo" o "piso" al que tiende la función a largo plazo. -->
- [ ] C) La función no puede tomar el valor de -3. <!-- feedback: Incorrecto. Una función puede cruzar su propia asíntota horizontal, a diferencia de las verticales. -->
- [ ] D) La función tiene un hueco en la altura -3. <!-- feedback: Incorrecto. Las asíntotas describen tendencias infinitas, no puntos específicos faltantes. -->

### Explicación Pedagógica
Las asíntotas horizontales son rectas que describen el límite de una función cuando la variable independiente tiende a más o menos infinito.

---

## Question 5 (Difficulty D5)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Calcule el límite $\lim_{x \to \infty} \frac{100x + 5}{x^2 + 1}$.

### Enunciado
¿Cuál es el resultado?

### Options
- [ ] A) $100$ <!-- feedback: Incorrecto. Solo consideraste los coeficientes lineales, ignorando el grado cuadrático del denominador. -->
- [x] B) $0$ <!-- feedback: Correcto. Como el grado del denominador (2) es mayor que el del numerador (1), el denominador crece más rápido y la fracción tiende a cero. -->
- [ ] C) $Infinity$ <!-- feedback: Incorrecto. El término dominante está en el denominador. -->
- [ ] D) $5$ <!-- feedback: Incorrecto. Solo consideraste los términos constantes. -->

### Explicación Pedagógica
En el infinito, los términos de mayor grado dominan el comportamiento. Si el denominador tiene mayor grado, la función siempre tiende a cero.

---

## Question 6 (Difficulty D5)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

### Contexto
Se evalúa el límite lateral $\lim_{x \to 3^+} \frac{5}{x-3}$.

### Enunciado
¿Cuál es el comportamiento de la función por la derecha de $3$?

### Options
- [x] A) Tiende a $+\infty$. <!-- feedback: Correcto. Al acercarse a 3 por valores mayores (ej 3.1), el denominador es positivo y muy pequeño, haciendo la fracción positiva y muy grande. -->
- [ ] B) Tiende a $-\infty$. <!-- feedback: Incorrecto. Esto pasaría si nos acercáramos por la izquierda (ej 2.9). -->
- [ ] C) Es igual a $0$. <!-- feedback: Incorrecto. El denominador se hace pequeño, no grande. -->
- [ ] D) Es igual a $5$. <!-- feedback: Incorrecto. No se puede realizar sustitución directa porque el denominador es cero. -->

### Explicación Pedagógica
Los límites laterales infinitos determinan el signo con el que la función "escapa" hacia la asíntota vertical. Es crucial distinguir si el denominador se acerca a cero por valores positivos o negativos.

---

## Question 7 (Difficulty D5)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Dada la función $f(x) = \frac{x^2 - 1}{x}$.

### Enunciado
¿Cuál es el valor de $\lim_{x \to \infty} f(x)$?

### Options
- [ ] A) $1$ <!-- feedback: Incorrecto. No se debe dividir solo los coeficientes ya que los grados son distintos. -->
- [ ] B) $0$ <!-- feedback: Incorrecto. El numerador crece más rápido que el denominador. -->
- [x] C) $Infinity$ <!-- feedback: Correcto. Como el grado del numerador (2) es mayor que el del denominador (1), la función crece sin límite. -->
- [ ] D) $-1$ <!-- feedback: Incorrecto. Resultado sin base matemática en el límite al infinito. -->

### Explicación Pedagógica
Si el grado del numerador es mayor que el del denominador, la función racional no tiene asíntota horizontal y su límite al infinito es siempre divergente ($\pm\infty$).

---

## Question 8 (Difficulty D6)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación

### Contexto
En un modelo de crecimiento poblacional en el Chocó, la población $P$ en el tiempo $t$ sigue la función $P(t) = \frac{5000t}{t+10}$.

### Enunciado
¿Cuál es el límite de población que puede soportar este entorno según el modelo ($t \to \infty$)?

### Options
- [ ] A) $10$ habitantes. <!-- feedback: Incorrecto. Este es el valor de la constante de tiempo, no el límite de población. -->
- [ ] B) Infinitos habitantes. <!-- feedback: Incorrecto. El modelo se estabiliza debido a la presencia de una asíntota horizontal. -->
- [x] C) $5.000$ habitantes. <!-- feedback: Correcto. El límite al infinito de (5000t)/(t+10) es 5000, que representa la capacidad de carga del modelo. -->
- [ ] D) $500$ habitantes. <!-- feedback: Incorrecto. Error en la división de los parámetros del modelo. -->

### Explicación Pedagógica
Muchos fenómenos naturales y económicos se modelan con funciones que presentan saturación, representada matemáticamente por una asíntota horizontal.

---

## Question 9 (Difficulty D6)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Calcule el límite $\lim_{x \to \infty} (\sqrt{x+1} - \sqrt{x})$.

### Enunciado
¿A qué valor tiende la diferencia entre estas dos raíces cuando $x$ es muy grande?

### Options
- [ ] A) $1$ <!-- feedback: Incorrecto. Aunque la diferencia interna es 1, la resta de las raíces tiende a disminuir. -->
- [x] B) $0$ <!-- feedback: Correcto. Al racionalizar (multiplicar por el conjugado), obtenemos 1 / (sqrt(x+1) + sqrt(x)). Al tender x a infinito, el denominador crece y la fracción tiende a cero. -->
- [ ] C) $Infinity$ <!-- feedback: Incorrecto. Las funciones crecen, pero la distancia entre ellas se reduce. -->
- [ ] D) No existe. <!-- feedback: Incorrecto. Es un límite determinado y muy importante en análisis. -->

### Explicación Pedagógica
Este límite demuestra que aunque dos funciones crezcan indefinidamente, la diferencia entre ellas puede converger a un valor específico (en este caso, cero).

---

## Question 10 (Difficulty D6)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentación

### Contexto
Considere la función $f(x) = \frac{x^2 - 4}{x-2}$.

### Enunciado
¿Cuál es el comportamiento de $\lim_{x \to \infty} f(x)$ comparado con $\lim_{x \to 2} f(x)$?

### Options
- [ ] A) Ambos son iguales a infinito. <!-- feedback: Incorrecto. El comportamiento en el punto y en el infinito es distinto. -->
- [x] B) El límite al infinito es infinito, pero el límite en 2 es 4. <!-- feedback: Correcto. Al simplificar queda x+2. Cuando x va a infinito, x+2 va a infinito. Cuando x va a 2, x+2 va a 4. -->
- [ ] C) El límite al infinito es 1, y en 2 no existe. <!-- feedback: Incorrecto. El grado del numerador es mayor, por lo que no tiende a 1. -->
- [ ] D) Ambos límites son iguales a 4. <!-- feedback: Incorrecto. El límite al infinito no puede ser un valor constante si el grado del numerador es mayor. -->

### Explicación Pedagógica
Este problema destaca la importancia de distinguir entre el comportamiento local (límites en un punto) y el comportamiento global o asintótico (límites al infinito).

---

## Question 11 (Difficulty D7)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Identifique la ecuación de la asíntota horizontal de la función $f(x) = \frac{\sqrt{9x^2 + 2}}{x - 1}$ para $x > 0$.

### Enunciado
¿Cuál es la recta a la que se aproxima la función?

### Options
- [ ] A) $y = 9$ <!-- feedback: Incorrecto. Olvidaste extraer la raíz cuadrada del coeficiente principal del numerador. -->
- [x] B) $y = 3$ <!-- feedback: Correcto. sqrt(9x^2)/x = 3x/x = 3. La raíz cuadrada afecta al término dominante x^2. -->
- [ ] C) $y = 0$ <!-- feedback: Incorrecto. Los grados efectivos son iguales (sqrt(x^2) es grado 1). -->
- [ ] D) No tiene asíntota horizontal. <!-- feedback: Incorrecto. La función está acotada al tender al infinito. -->

### Explicación Pedagógica
Al trabajar con raíces en límites al infinito, es fundamental considerar el "grado efectivo" del término bajo la raíz para comparar correctamente con el denominador.

---

## Question 12 (Difficulty D7)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Un estudiante dice que si $\lim_{x \to \infty} f(x) = \infty$ y $\lim_{x \to \infty} g(x) = \infty$, entonces $\lim_{x \to \infty} [f(x) - g(x)]$ debe ser necesariamente cero.

### Enunciado
¿Es correcta la afirmación del estudiante?

### Options
- [ ] A) Sí, porque infinito menos infinito es cero. <!-- feedback: Incorrecto. Infinito menos infinito es una forma indeterminada, no es una operación aritmética directa. -->
- [x] B) No, el resultado depende de qué función crezca más rápido. <!-- feedback: Correcto. Puede ser cero, una constante, o infinito (ej: x^2 - x tiende a infinito). -->
- [ ] C) Sí, porque ambas funciones tienden al mismo lugar. <!-- feedback: Incorrecto. Tender a infinito no significa tener la misma tasa de crecimiento. -->
- [ ] D) No, el resultado siempre será infinito. <!-- feedback: Incorrecto. No siempre, como se vio en el caso de las raíces (sqrt(x+1)-sqrt(x)). -->

### Explicación Pedagógica
La resta de infinitos es una de las formas indeterminadas más comunes. Requiere un análisis detallado de la jerarquía de crecimiento de las funciones involucradas.

---

## Question 13 (Difficulty D7)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v13`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Calcule el límite $\lim_{x \to \infty} \frac{e^x}{x^2}$.

### Enunciado
¿Cuál es el comportamiento predominante en este límite?

### Options
- [ ] A) El límite es $0$. <!-- feedback: Incorrecto. El numerador (exponencial) crece mucho más rápido que la potencia del denominador. -->
- [x] B) El límite tiende a $+\infty$. <!-- feedback: Correcto. Las funciones exponenciales dominan sobre cualquier función polinómica en el infinito. -->
- [ ] C) El límite es $1$. <!-- feedback: Incorrecto. No hay equilibrio entre las tasas de crecimiento. -->
- [ ] D) El límite es constante. <!-- feedback: Incorrecto. La expresión diverge debido al crecimiento explosivo de e^x. -->

### Explicación Pedagógica
La jerarquía de funciones en el infinito establece que las exponenciales crecen más rápido que las potencias, las cuales crecen más rápido que los logaritmos.

---

## Question 14 (Difficulty D8)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación

### Contexto
Considere la función racional $f(x) = \frac{x^2 + 1}{x + 1}$.

### Enunciado
¿Qué tipo de asíntota presenta esta función además de la vertical en $x = -1$?

### Options
- [ ] A) Una asíntota horizontal en $y = 1$. <!-- feedback: Incorrecto. El grado del numerador es mayor al del denominador. -->
- [x] B) Una asíntota oblicua. <!-- feedback: Correcto. Cuando el grado del numerador es exactamente uno más que el del denominador, existe una asíntota oblicua (inclinada). -->
- [ ] C) Ninguna otra asíntota. <!-- feedback: Incorrecto. La función tiene un comportamiento lineal a largo plazo. -->
- [ ] D) Una asíntota horizontal en $y = 0$. <!-- feedback: Incorrecto. Esto requeriría un denominador de mayor grado. -->

### Explicación Pedagógica
Las asíntotas oblicuas se encuentran realizando la división sintética o larga de los polinomios. El cociente de la división es la ecuación de la recta asíntota.

---

## Question 15 (Difficulty D8)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v15`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Determine la ecuación de la asíntota oblicua para $f(x) = \frac{2x^2 + 3x - 1}{x - 2}$.

### Enunciado
¿Cuál es la recta resultante tras realizar la división de polinomios?

### Options
- [ ] A) $y = 2x$ <!-- feedback: Incorrecto. Incompleto, falta el término constante del cociente. -->
- [x] B) $y = 2x + 7$ <!-- feedback: Correcto. Al dividir: (2x^2 + 3x - 1) / (x - 2) = 2x + 7 con un resto de 13. La recta asíntota es el cociente 2x + 7. -->
- [ ] C) $y = 2x - 3$ <!-- feedback: Incorrecto. Error en los signos durante la división larga. -->
- [ ] D) $y = x + 2$ <!-- feedback: Incorrecto. El coeficiente principal debe ser 2. -->

### Explicación Pedagógica
La asíntota oblicua $y = mx + b$ representa el comportamiento lineal al que tiende una función racional cuando los términos de menor grado y el resto de la división se vuelven insignificantes en el infinito.

---

## Question 16 (Difficulty D8)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v16`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Una función $f(x)$ satisface que $\lim_{x \to 4^-} f(x) = \infty$ y $\lim_{x \to 4^+} f(x) = \infty$.

### Enunciado
¿Cuál es la descripción más precisa de la gráfica en la vecindad de $x = 4$?

### Options
- [ ] A) Hay un hueco en la altura infinito. <!-- feedback: Incorrecto. Un hueco implica un límite finito. -->
- [x] B) Hay una asíntota vertical y la curva sube por ambos lados del punto. <!-- feedback: Correcto. Si ambos límites laterales son +infinito, la función presenta una "punta" infinita hacia arriba en la asíntota. -->
- [ ] C) La función es continua pero muy empinada. <!-- feedback: Incorrecto. La divergencia al infinito implica discontinuidad. -->
- [ ] D) Los límites laterales son contradictorios. <!-- feedback: Incorrecto. Son consistentes en su dirección, lo que indica que no hay cambio de signo en la asíntota. -->

### Explicación Pedagógica
El análisis de límites laterales en asíntotas verticales permite conocer la forma de la gráfica: si sube por ambos lados, baja por ambos, o si tiene comportamientos opuestos (cambio de signo).

---

## Question 17 (Difficulty D9)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Se analiza el límite $\lim_{x \to \infty} \frac{\sin(x)}{x}$.

### Enunciado
¿Cuál es el valor del límite y qué teorema se utiliza para demostrarlo?

### Options
- [ ] A) $1$, por el límite fundamental trigonométrico. <!-- feedback: Incorrecto. Ese límite es cuando x tiende a CERO, no a infinito. -->
- [x] B) $0$, por el Teorema del Sándwich. <!-- feedback: Correcto. Como -1 <= sin(x) <= 1, entonces -1/x <= sin(x)/x <= 1/x. Como ambos extremos van a 0, el del medio también. -->
- [ ] C) No existe, porque el seno oscila. <!-- feedback: Incorrecto. Aunque el seno oscile, está siendo dividido por un valor que crece sin límite, "aplastando" la oscilación hacia cero. -->
- [ ] D) $Infinity$, porque x crece. <!-- feedback: Incorrecto. El crecimiento de x en el denominador reduce el valor de la fracción. -->

### Explicación Pedagógica
El Teorema del Sándwich es la herramienta definitiva para tratar con funciones oscilatorias acotadas (como seno y coseno) cuando se combinan con tendencias al infinito.

---

## Question 18 (Difficulty D9)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v18`
**Bloom:** Create
**ICFES:** Formulación y Ejecución

### Contexto
Halla el valor de $k$ para que la función $f(x) = \frac{kx^2 + 5x}{3x^2 + 2}$ tenga una asíntota horizontal en $y = 4$.

### Enunciado
¿Cuál es el valor del parámetro $k$?

### Options
- [ ] A) $k = 4$ <!-- feedback: Incorrecto. Olvidaste el coeficiente del denominador. -->
- [x] B) $k = 12$ <!-- feedback: Correcto. El límite es k / 3. Para que k/3 = 4, k debe ser igual a 12. -->
- [ ] C) $k = 3/4$ <!-- feedback: Incorrecto. Invertiste la relación de división. -->
- [ ] D) $k = 2$ <!-- feedback: Incorrecto. Este valor no produciría la asíntota requerida. -->

### Explicación Pedagógica
Este problema requiere un razonamiento inverso: a partir del comportamiento asintótico deseado, se deben ajustar los parámetros algebraicos de la función.

---

## Question 19 (Difficulty D10)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Considere la función $f(x) = \frac{x}{\sqrt{x^2 + 1}}$.

### Enunciado
Determine los límites cuando $x \to \infty$ y cuando $x \to -\infty$.

### Options
- [ ] A) Ambos límites son $1$. <!-- feedback: Incorrecto. Olvidas que la raíz de x^2 es el valor absoluto de x, lo cual afecta el signo en el infinito negativo. -->
- [x] B) El límite a $+\infty$ es $1$ y a $-\infty$ es $-1$. <!-- feedback: Correcto. Para x positivo sqrt(x^2)=x, dando 1. Para x negativo sqrt(x^2)=-x, dando x/-x = -1. -->
- [ ] C) El límite a $+\infty$ es $1$ y a $-\infty$ es $0$. <!-- feedback: Incorrecto. No hay razón para que el límite sea cero en el infinito negativo. -->
- [ ] D) No tiene asíntotas horizontales. <!-- feedback: Incorrecto. Tiene dos asíntotas horizontales diferentes. -->

### Explicación Pedagógica
Algunas funciones pueden tener dos asíntotas horizontales distintas dependiendo de si la tendencia es hacia el infinito positivo o negativo, algo común en funciones con raíces pares y potencias.

---

## Question 20 (Difficulty D10)

**ID:** `CO-MAT-11-P1-limites-004-MASTERY-v20`
**Bloom:** Create
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Diseñe una función racional que tenga una asíntota vertical en $x = 2$, una asíntota horizontal en $y = 0$, y que pase por el punto $(1, -1)$.

### Enunciado
¿Cuál de las siguientes opciones cumple con los tres requisitos?

### Options
- [x] A) $f(x) = \frac{1}{x-2}$ <!-- feedback: Correcto. AV en x=2. AH en y=0. Punto: f(1) = 1/(1-2) = 1/-1 = -1. Cumple todo. -->
- [ ] B) $f(x) = \frac{x}{x-2}$ <!-- feedback: Incorrecto. Tiene AH en y=1, no en y=0. -->
- [ ] C) $f(x) = \frac{1}{x+2}$ <!-- feedback: Incorrecto. Tiene AV en x=-2. -->
- [ ] D) $f(x) = \frac{-1}{x-2}$ <!-- feedback: Incorrecto. f(1) daría -1/-1 = 1, no -1. -->

### Explicación Pedagógica
La síntesis de funciones a partir de sus límites y puntos específicos es la máxima demostración de comprensión de la relación entre álgebra y geometría de funciones.
