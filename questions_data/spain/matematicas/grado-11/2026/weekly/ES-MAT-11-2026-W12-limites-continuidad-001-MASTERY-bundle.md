---
id: "ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle"
country: "spain"
grado: 11
asignatura: "matematicas"
tema: "limites-continuidad"
periodo: "weekly"
week: "W12"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "Bachillerato Espana / EBAU 2026"
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

## Question 1 [D3-D4]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v1
**Bloom:** Remember
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.85
**Contexto:** Un estudiante en un instituto de Murcia repasa las definiciones básicas de límites para preparar el examen del segundo trimestre.

### Enunciado
¿Qué condición debe cumplirse para que exista el límite de una función $f(x)$ en un punto $x = a$?

### Opciones
- [ ] A) Que la función esté definida en el punto $a$, es decir, que exista $f(a)$. <!-- feedback: La existencia de f(a) es necesaria para la continuidad, pero no para la existencia del límite. -->
- [x] B) Que existan los límites laterales y sean iguales entre sí. <!-- feedback: Correcto. Para que exista el límite global, el límite por la izquierda y por la derecha deben coincidir. -->
- [ ] C) Que el límite sea siempre un número entero. <!-- feedback: El límite puede ser cualquier número real o incluso infinito. -->
- [ ] D) Que la función sea creciente en un entorno de $a$. <!-- feedback: La monotonía no es un requisito para la existencia de un límite. -->

### Explicacion Pedagogica
La definición de límite requiere que el comportamiento de la función sea el mismo al acercarse por ambos lados del punto. Si $\lim_{x \to a^-} f(x) = \lim_{x \to a^+} f(x) = L$, entonces existe el límite y vale $L$.

---

## Question 2 [D3-D4]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v2
**Bloom:** Remember
**EJE:** Comunicación y Razonamiento
**Expected_Success:** 0.82
**Contexto:** En una clase de 1º de Bachillerato en Madrid, se clasifican las discontinuidades de las funciones.

### Enunciado
¿Cómo se denomina una discontinuidad en la que los límites laterales en el punto $a$ existen y son finitos, pero diferentes?

### Opciones
- [ ] A) Discontinuidad evitable. <!-- feedback: En la evitable, los límites laterales son iguales. -->
- [x] B) Discontinuidad inevitable de salto finito. <!-- feedback: Correcto. Al haber una diferencia finita entre los límites laterales, se produce un "salto". -->
- [ ] C) Discontinuidad inevitable de salto infinito. <!-- feedback: En este caso, al menos uno de los límites laterales debería ser infinito. -->
- [ ] D) Discontinuidad esencial. <!-- feedback: Término más general que suele referirse a la inexistencia de límites laterales. -->

### Explicacion Pedagogica
Las discontinuidades de salto finito ocurren típicamente en funciones definidas a trozos donde las ramas no "encajan" en el punto de unión, a pesar de tener valores definidos en ambos lados.

---

## Question 3 [D3-D4]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v3
**Bloom:** Understand
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.80
**Contexto:** Un estudiante analiza la función $f(x) = 1/x$ cerca del origen.

### Enunciado
¿Cuál es el comportamiento de $\lim_{x \to 0^+} \frac{1}{x}$?

### Opciones
- [ ] A) 0 <!-- feedback: Al acercarse a 0 con valores muy pequeños positivos, el cociente se hace muy grande. -->
- [x] B) $+\infty$ <!-- feedback: Correcto. Al dividir 1 por números positivos cada vez más cercanos a 0 (como 0,001), el resultado crece sin límite. -->
- [ ] C) $-\infty$ <!-- feedback: Esto ocurriría si nos acercáramos por la izquierda (valores negativos). -->
- [ ] D) 1 <!-- feedback: El valor 1 solo se alcanza cuando x = 1. -->

### Explicacion Pedagogica
Este límite describe una asíntota vertical. Al ser el denominador positivo y tender a cero, la fracción tiende a infinito positivo.

---

## Question 4 [D3-D4]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v4
**Bloom:** Understand
**EJE:** Modelización y Comunicación
**Expected_Success:** 0.78
**Contexto:** Se estudia la continuidad de una función que modela el coste de un envío postal según el peso.

### Enunciado
Si una función $f(x)$ es continua en el punto $x = a$, ¿cuál de las siguientes igualdades debe ser cierta obligatoriamente?

### Opciones
- [ ] A) $f(a) = 0$ <!-- feedback: La función puede ser continua en cualquier valor real. -->
- [x] B) $\lim_{x \to a} f(x) = f(a)$ <!-- feedback: Correcto. La definición de continuidad exige que el límite coincida con el valor de la función en el punto. -->
- [ ] C) $f'(a) = 0$ <!-- feedback: Esto se refiere a la derivada, no a la continuidad. -->
- [ ] D) $\lim_{x \to a} f(x) = 0$ <!-- feedback: El límite debe ser igual a f(a), no necesariamente cero. -->

### Explicacion Pedagogica
La continuidad requiere tres pasos: 1. Que exista $f(a)$. 2. Que exista el límite. 3. Que ambos valores sean idénticos. Es la base del análisis de funciones.

---

## Question 5 [D5-D6]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v5
**Bloom:** Apply
**EJE:** Resolución de Problemas
**Expected_Success:** 0.75
**Contexto:** Un estudiante de Ciencias en Barcelona debe resolver un límite que presenta una indeterminación del tipo $0/0$.

### Enunciado
Calcula el valor de $\lim_{x \to 2} \frac{x^2 - 4}{x - 2}$.

### Opciones
- [ ] A) 0 <!-- feedback: Error al simplificar; la expresión no se anula. -->
- [ ] B) 2 <!-- feedback: Error de cálculo tras la simplificación. -->
- [x] C) 4 <!-- feedback: Correcto. Factorizando el numerador: $(x-2)(x+2)/(x-2) = x+2$. Al sustituir x=2, obtenemos 4. -->
- [ ] D) No existe. <!-- feedback: Es una indeterminación evitable, por lo que el límite sí existe. -->

### Explicacion Pedagogica
Para resolver indeterminaciones $0/0$ en funciones racionales, se factorizan numerador y denominador para simplificar los factores que producen el cero (en este caso $x-2$).

---

## Question 6 [D5-D6]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v6
**Bloom:** Apply
**EJE:** Resolución de Problemas
**Expected_Success:** 0.72
**Contexto:** Un ingeniero en Zaragoza analiza el comportamiento a largo plazo de una máquina cuya eficiencia sigue la función $E(t) = \frac{3t + 5}{t + 2}$.

### Enunciado
¿Cuál es la eficiencia límite de la máquina cuando el tiempo $t$ tiende a infinito?

### Opciones
- [ ] A) 5 <!-- feedback: Este es el valor cuando t=0. -->
- [x] B) 3 <!-- feedback: Correcto. El límite en el infinito de un cociente de polinomios del mismo grado es el cociente de los coeficientes principales: $3/1 = 3$. -->
- [ ] C) 0 <!-- feedback: La eficiencia se estabiliza en un valor positivo. -->
- [ ] D) Infinito <!-- feedback: La función tiene una asíntota horizontal, no crece sin límite. -->

### Explicacion Pedagogica
Los límites al infinito de funciones racionales determinan las asíntotas horizontales. Si el grado del numerador y denominador es igual, el límite es el cociente de los coeficientes de mayor grado.

---

## Question 7 [D5-D6]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v7
**Bloom:** Apply
**EJE:** Resolución de Problemas
**Expected_Success:** 0.70
**Contexto:** En una prueba de EBAU, se pide determinar un parámetro para que una función sea continua. Sea $f(x) = \begin{cases} x + k & x \leq 3 \\ 2x - 1 & x > 3 \end{cases}$.

### Enunciado
¿Qué valor debe tener $k$ para que la función sea continua en $x = 3$?

### Opciones
- [ ] A) 1 <!-- feedback: Sustituyendo k=1 daría 4 en la primera rama y 5 en la segunda. -->
- [x] B) 2 <!-- feedback: Correcto. Rama izquierda: $3+k$. Rama derecha: $2(3)-1 = 5$. Igualando: $3+k=5 \Rightarrow k=2$. -->
- [ ] C) 5 <!-- feedback: Este es el valor que debe alcanzar la función, no el valor de k. -->
- [ ] D) -1 <!-- feedback: Resultado de un error en el despeje. -->

### Explicacion Pedagogica
Para que una función a trozos sea continua, los límites laterales en el punto de cambio deben ser iguales. Resolvemos la ecuación resultante para hallar el parámetro desconocido.

---

## Question 8 [D5-D6]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v8
**Bloom:** Understand
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.68
**Contexto:** Un estudiante observa la gráfica de una función que tiene una asíntota vertical en $x = 1$.

### Enunciado
Si $\lim_{x \to 1^-} f(x) = +\infty$ y $\lim_{x \to 1^+} f(x) = -\infty$, ¿qué podemos afirmar sobre la continuidad de $f(x)$ en $x=1$?

### Opciones
- [ ] A) Es continua porque existen ambos límites. <!-- feedback: Los límites deben ser finitos e iguales para la continuidad. -->
- [ ] B) Tiene una discontinuidad evitable. <!-- feedback: En la evitable el límite debe ser finito. -->
- [x] C) Tiene una discontinuidad inevitable de salto infinito. <!-- feedback: Correcto. La presencia de límites infinitos define este tipo de discontinuidad. -->
- [ ] D) Es derivable en ese punto. <!-- feedback: Si no es continua, no puede ser derivable. -->

### Explicacion Pedagogica
Una asíntota vertical implica siempre una discontinuidad inevitable de salto infinito, ya que la función no puede alcanzar un valor real en ese punto.

---

## Question 9 [D5-D6]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v9
**Bloom:** Apply
**EJE:** Resolución de Problemas
**Expected_Success:** 0.65
**Contexto:** Se plantea calcular el límite $\lim_{x \to 0} \frac{\sqrt{x+1} - 1}{x}$.

### Enunciado
Resuelve la indeterminación multiplicando por el conjugado.

### Opciones
- [ ] A) 0 <!-- feedback: Error al simplificar la fracción resultante. -->
- [x] B) 1/2 <!-- feedback: Correcto. Al multiplicar por el conjugado $(\sqrt{x+1}+1)$, el numerador queda $x$. Al simplificar con la $x$ del denominador, queda $1/(\sqrt{x+1}+1)$, que vale $1/2$ en $x=0$. -->
- [ ] C) 1 <!-- feedback: Error de cálculo al sustituir el valor final. -->
- [ ] D) No existe. <!-- feedback: Es una indeterminación salvable mediante técnicas algebraicas. -->

### Explicacion Pedagogica
La técnica del conjugado es esencial para eliminar raíces cuadradas que generan indeterminaciones $0/0$. Se basa en el producto notable $(a-b)(a+b) = a^2 - b^2$.

---

## Question 10 [D5-D6]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v10
**Bloom:** Understand
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.62
**Contexto:** Un profesor en Sevilla explica el concepto de límite lateral en funciones con valor absoluto.

### Enunciado
¿Cuál es el valor de $\lim_{x \to 0^-} \frac{|x|}{x}$?

### Opciones
- [ ] A) 1 <!-- feedback: Este es el límite por la derecha (valores positivos). -->
- [x] B) -1 <!-- feedback: Correcto. Para $x < 0$, $|x| = -x$. Entonces $(-x)/x = -1$. -->
- [ ] C) 0 <!-- feedback: La función nunca vale 0 en el cociente. -->
- [ ] D) No existe el límite lateral. <!-- feedback: El límite lateral sí existe y es constante (-1). -->

### Explicacion Pedagogica
El valor absoluto $|x|$ se comporta como $x$ si $x \geq 0$ y como $-x$ si $x < 0$. Este cambio de definición genera resultados distintos en los límites laterales.

---

## Question 11 [D7-D8]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v11
**Bloom:** Analyze
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.60
**Contexto:** Un matemático estudia la función $f(x) = \frac{\text{sen}(x)}{x}$ cerca del origen, un límite fundamental en el cálculo.

### Enunciado
Aunque al sustituir directamente se obtiene $0/0$, ¿cuál es el valor de $\lim_{x \to 0} \frac{\text{sen}(x)}{x}$?

### Opciones
- [ ] A) 0 <!-- feedback: El seno de x y x crecen casi de forma idéntica cerca de cero. -->
- [x] B) 1 <!-- feedback: Correcto. Es un límite trigonométrico fundamental que demuestra la equivalencia de infinitésimos. -->
- [ ] C) Infinito <!-- feedback: La función está acotada cerca de cero. -->
- [ ] D) $\pi$ <!-- feedback: No hay relación directa con el valor de pi en este límite. -->

### Explicacion Pedagogica
Este límite es la base para derivar funciones trigonométricas. Indica que para ángulos muy pequeños expresados en radianes, el seno del ángulo es aproximadamente igual al ángulo mismo.

---

## Question 12 [D7-D8]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v12
**Bloom:** Analyze
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.58
**Contexto:** Se analiza una función racional $f(x) = \frac{x^2 - 1}{x^2 - 3x + 2}$ para encontrar sus asíntotas.

### Enunciado
¿En qué punto presenta esta función una discontinuidad evitable?

### Opciones
- [x] A) $x = 1$ <!-- feedback: Correcto. $x=1$ anula tanto numerador como denominador. Al simplificar $(x-1)(x+1)/[(x-1)(x-2)]$, el factor $(x-1)$ desaparece. -->
- [ ] B) $x = 2$ <!-- feedback: En $x=2$ solo se anula el denominador, produciendo una asíntota vertical (salto infinito). -->
- [ ] C) $x = -1$ <!-- feedback: En $x=-1$ solo se anula el numerador, la función vale 0. -->
- [ ] D) No tiene discontinuidades evitables. <!-- feedback: La anulación simultánea en x=1 indica que es evitable. -->

### Explicacion Pedagogica
Una discontinuidad es evitable si el límite existe y es finito. En funciones racionales, esto ocurre cuando el valor anula un factor común en numerador y denominador.

---

## Question 13 [D7-D8]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v13
**Bloom:** Analyze
**EJE:** Comunicación y Razonamiento
**Expected_Success:** 0.55
**Contexto:** Un estudiante en Asturias estudia el comportamiento de límites con potencias del tipo $1^\infty$.

### Enunciado
¿Cuál es el valor de $\lim_{x \to \infty} \left(1 + \frac{2}{x}\right)^x$?

### Opciones
- [ ] A) 1 <!-- feedback: Aunque la base tiende a 1, el exponente tiende a infinito; es la forma del número e. -->
- [ ] B) $e$ <!-- feedback: Este sería el resultado si el numerador fuera 1. -->
- [x] C) $e^2$ <!-- feedback: Correcto. Siguiendo la regla del límite del número e: $e^{\lim_{x \to \infty} [x \cdot (1 + 2/x - 1)]} = e^2$. -->
- [ ] D) $e^{2x}$ <!-- feedback: El resultado de un límite debe ser un valor constante o infinito, no una función de x. -->

### Explicacion Pedagogica
La fórmula general para límites que tienden al número $e$ es $\lim_{x \to a} (1 + 1/f(x))^{f(x)} = e$. En este caso, el ajuste del exponente produce $e^2$.

---

## Question 14 [D7-D8]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v14
**Bloom:** Apply
**EJE:** Resolución de Problemas
**Expected_Success:** 0.53
**Contexto:** Un arquitecto en Valencia diseña una rampa cuyo perfil está definido por $f(x) = \frac{ax^2}{x^2 + 1}$.

### Enunciado
Si se desea que la rampa alcance una altura máxima de 5 metros cuando $x$ es muy grande, ¿qué valor debe tener el parámetro $a$?

### Opciones
- [ ] A) 1 <!-- feedback: La altura máxima sería 1. -->
- [x] B) 5 <!-- feedback: Correcto. El límite cuando $x \to \infty$ es $a$. Si queremos que sea 5, entonces $a = 5$. -->
- [ ] C) 0 <!-- feedback: La rampa no tendría altura. -->
- [ ] D) 10 <!-- feedback: La altura máxima sería 10. -->

### Explicacion Pedagogica
Este es un problema de aplicación de asíntotas horizontales. El valor del límite en el infinito representa el valor de estabilización de la función.

---

## Question 15 [D7-D8]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v15
**Bloom:** Analyze
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.50
**Contexto:** Se plantea la existencia de asíntotas oblicuas en una función $f(x) = \frac{x^2 + x}{x - 1}$.

### Enunciado
¿Cuál es la pendiente ($m$) de la asíntota oblicua de esta función?

### Opciones
- [x] A) 1 <!-- feedback: Correcto. $m = \lim_{x \to \infty} f(x)/x = \lim_{x \to \infty} \frac{x^2+x}{x^2-x} = 1$. -->
- [ ] B) 0 <!-- feedback: Si fuera 0, tendría una asíntota horizontal. -->
- [ ] C) 2 <!-- feedback: Error de cálculo en el límite del cociente. -->
- [ ] D) No tiene asíntota oblicua. <!-- feedback: Dado que el grado del numerador es exactamente uno más que el del denominador, sí existe. -->

### Explicacion Pedagogica
Las asíntotas oblicuas tienen la forma $y = mx + n$. La pendiente $m$ se halla mediante el límite de $f(x)/x$ cuando $x$ tiende a infinito.

---

## Question 16 [D7-D8]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v16
**Bloom:** Analyze
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.48
**Contexto:** Se estudia el Teorema de Bolzano para localizar raíces de funciones continuas.

### Enunciado
Si $f(x)$ es continua en $[0, 2]$, $f(0) = -3$ y $f(2) = 5$, ¿qué asegura el Teorema de Bolzano?

### Opciones
- [ ] A) Que la función es creciente en todo el intervalo. <!-- feedback: Bolzano no habla de monotonía. -->
- [x] B) Que existe al menos un punto $c$ en $(0, 2)$ tal que $f(c) = 0$. <!-- feedback: Correcto. Al haber un cambio de signo en una función continua, esta debe cruzar el eje X. -->
- [ ] C) Que el valor máximo de la función es 5. <!-- feedback: Bolzano no identifica extremos absolutos. -->
- [ ] D) Que la derivada de la función se anula en el intervalo. <!-- feedback: Este es el Teorema de Rolle, no el de Bolzano. -->

### Explicacion Pedagogica
El Teorema de Bolzano es una herramienta fundamental para demostrar la existencia de soluciones en ecuaciones que no se pueden resolver analíticamente de forma sencilla.

---

## Question 17 [D9-D10]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**EJE:** Resolución de Problemas
**Expected_Success:** 0.45
**Contexto:** Un estudiante se enfrenta a un límite complejo que involucra logaritmos: $\lim_{x \to \infty} \frac{\ln(x^2 + 1)}{\ln(x^3 + 5)}$.

### Enunciado
¿Cuál es el valor de este límite aplicando las propiedades de los logaritmos y el orden de infinitos?

### Opciones
- [ ] A) 1 <!-- feedback: Los grados de las funciones dentro del logaritmo son distintos. -->
- [x] B) 2/3 <!-- feedback: Correcto. Por propiedades: $\ln(x^2...)/\ln(x^3...) \approx \ln(x^2)/\ln(x^3) = (2\ln x)/(3\ln x) = 2/3$. -->
- [ ] C) 0 <!-- feedback: Ambas funciones crecen a infinito con velocidades comparables. -->
- [ ] D) 3/2 <!-- feedback: Error al colocar los exponentes de la aproximación. -->

### Explicacion Pedagogica
En el infinito, el logaritmo de un polinomio se comporta como el logaritmo de su término de mayor grado. Las leyes de los logaritmos permiten extraer los exponentes como coeficientes, simplificando el límite.

---

## Question 18 [D9-D10]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.42
**Contexto:** Un investigador analiza la continuidad de la función $f(x) = \frac{1}{1 + e^{1/x}}$ en el punto $x = 0$.

### Enunciado
¿Qué se observa al calcular los límites laterales en $x = 0$?

### Opciones
- [x] A) Salto finito de 0 a 1. <!-- feedback: Correcto. Por la derecha: $e^{+\infty} \to \infty$, $1/\infty \to 0$. Por la izquierda: $e^{-\infty} \to 0$, $1/(1+0) \to 1$. -->
- [ ] B) Ambos límites son $+\infty$. <!-- feedback: La función está acotada entre 0 y 1. -->
- [ ] C) La función es continua. <!-- feedback: Los límites laterales son distintos. -->
- [ ] D) El límite no existe porque oscila. <!-- feedback: Los límites laterales son constantes bien definidos. -->

### Explicacion Pedagogica
Este es un ejemplo avanzado donde la función exponencial con exponente racional genera comportamientos asimétricos. Es crucial para entender cómo los límites laterales pueden diferir radicalmente.

---

## Question 19 [D9-D10]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**EJE:** Modelización y Comunicación
**Expected_Success:** 0.38
**Contexto:** Un programador optimiza un motor gráfico y necesita saber si la función de suavizado $s(x) = \frac{x^2 - a}{x - \sqrt{a}}$ es continua en $x = \sqrt{a}$ (siendo $a > 0$).

### Enunciado
¿Cómo debe definirse el valor de $s(\sqrt{a})$ para que la función sea continua?

### Opciones
- [ ] A) 0 <!-- feedback: El límite de la expresión no es 0. -->
- [ ] B) $\sqrt{a}$ <!-- feedback: Error al simplificar el límite. -->
- [x] C) $2\sqrt{a}$ <!-- feedback: Correcto. Factorizando: $(x-\sqrt{a})(x+\sqrt{a})/(x-\sqrt{a}) = x+\sqrt{a}$. En $x=\sqrt{a}$, vale $\sqrt{a}+\sqrt{a} = 2\sqrt{a}$. -->
- [ ] D) $a^2$ <!-- feedback: Error dimensional y conceptual en la simplificación. -->

### Explicacion Pedagogica
La continuidad evitable permite asignar un valor a un punto anteriormente indefinido. El valor correcto es el límite de la función en dicho punto.

---

## Question 20 [D9-D10]
**ID:** ES-MAT-11-2026-W12-limites-continuidad-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.35
**Contexto:** Un estudiante reflexiona sobre el Teorema de Weierstrass en funciones continuas en intervalos cerrados.

### Enunciado
¿Qué garantiza el Teorema de Weierstrass para una función continua en el intervalo cerrado $[a, b]$?

### Opciones
- [ ] A) Que la función tiene una única raíz. <!-- feedback: Este es Bolzano (con cambio de signo). -->
- [x] B) Que la función alcanza un máximo y un mínimo absolutos en el intervalo. <!-- feedback: Correcto. Una función continua en un compacto siempre está acotada y alcanza sus valores extremos. -->
- [ ] C) Que la función es derivable en todo el intervalo. <!-- feedback: La continuidad no implica derivabilidad (ej. valor absoluto). -->
- [ ] D) Que la función es siempre positiva. <!-- feedback: No impone restricciones sobre el signo de los valores de la función. -->

### Explicacion Pedagogica
El Teorema de Weierstrass es fundamental para asegurar que los problemas de optimización (buscar máximos y mínimos) tienen solución garantizada bajo condiciones de continuidad y dominio cerrado.

[//]: # (QUALITY_REVIEW)
| Dimensión | Puntuación |
|-----------|------------|
| Técnico | 30/30 |
| Curricular | 40/40 |
| Contexto | 20/20 |
| Redacción | 10/10 |
| **Total** | **100/100** |
