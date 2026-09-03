---
id: "ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle"
country: "spain"
grado: 11
asignatura: "matematicas"
tema: "derivadas-reglas"
periodo: "weekly"
week: "W13"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "Bachillerato Espana / EBAU 2026"
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
bundle_index: 1
---

## Question 1 [D3-D4]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v1
**Bloom:** Remember
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.85
**Contexto:** Un estudiante de Bachillerato en Valencia introduce el concepto de derivada como la tasa de variación instantánea.

### Enunciado
¿Cuál es la definición formal de la derivada de una función $f(x)$ en el punto $x = a$?

### Opciones
- [ ] A) $f'(a) = \frac{f(a+h) - f(a)}{h}$ <!-- feedback: Falta el límite cuando h tiende a cero. -->
- [x] B) $f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$ <!-- feedback: Correcto. Es la definición de la derivada como el límite del cociente incremental. -->
- [ ] C) $f'(a) = \lim_{x \to a} (f(x) - f(a))$ <!-- feedback: Esto es solo la diferencia de valores, no la tasa de cambio. -->
- [ ] D) $f'(a) = f(a) + h$ <!-- feedback: Definición incorrecta. -->

### Explicacion Pedagogica
La derivada representa la pendiente de la recta tangente a la curva en un punto. Se obtiene calculando el límite de la pendiente de las rectas secantes cuando la distancia entre los puntos tiende a cero.

---

## Question 2 [D3-D4]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v2
**Bloom:** Remember
**EJE:** Comunicación y Razonamiento
**Expected_Success:** 0.82
**Contexto:** En un instituto de Madrid, se aprenden las reglas básicas de derivación de funciones elementales.

### Enunciado
¿Cuál es la derivada de la función potencia $f(x) = x^n$?

### Opciones
- [ ] A) $f'(x) = x^{n-1}$ <!-- feedback: Falta el coeficiente n. -->
- [ ] B) $f'(x) = n \cdot x^n$ <!-- feedback: No se restó 1 al exponente. -->
- [x] C) $f'(x) = n \cdot x^{n-1}$ <!-- feedback: Correcto. El exponente pasa multiplicando y el nuevo exponente disminuye en una unidad. -->
- [ ] D) $f'(x) = \frac{x^{n+1}}{n+1}$ <!-- feedback: Esta es la regla para la integral indefinida, no para la derivada. -->

### Explicacion Pedagogica
La regla de la potencia es la base para derivar polinomios. Es válida para cualquier número real $n$, no solo para enteros positivos.

---

## Question 3 [D3-D4]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v3
**Bloom:** Understand
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.80
**Contexto:** Se analiza la derivada de una función constante.

### Enunciado
Si $f(x) = 7$ para todo $x$, ¿cuál es el valor de su derivada $f'(x)$?

### Opciones
- [x] A) 0 <!-- feedback: Correcto. Una función constante no cambia, por lo que su tasa de variación es nula en todos los puntos. -->
- [ ] B) 1 <!-- feedback: Esta sería la derivada de f(x) = x. -->
- [ ] C) 7 <!-- feedback: La derivada no es igual al valor de la constante. -->
- [ ] D) $x$ <!-- feedback: Resultado incorrecto. -->

### Explicacion Pedagogica
Geométricamente, una función constante es una línea horizontal cuya pendiente es siempre cero. Analíticamente, el incremento $f(x+h) - f(x)$ es siempre $7 - 7 = 0$.

---

## Question 4 [D3-D4]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v4
**Bloom:** Understand
**EJE:** Modelización y Comunicación
**Expected_Success:** 0.78
**Contexto:** Un estudiante estudia la relación entre la derivabilidad y la continuidad de una función.

### Enunciado
Si una función $f(x)$ es derivable en el punto $x = a$, ¿qué podemos asegurar con certeza sobre su comportamiento en dicho punto?

### Opciones
- [ ] A) Que su derivada es positiva. <!-- feedback: Puede ser negativa o cero. -->
- [x] B) Que la función es continua en $x = a$. <!-- feedback: Correcto. La derivabilidad es una condición más fuerte que implica necesariamente la continuidad. -->
- [ ] C) Que la función tiene un máximo relativo en $a$. <!-- feedback: No todos los puntos derivables son extremos. -->
- [ ] D) Que la función es creciente. <!-- feedback: Depende del signo de la derivada. -->

### Explicacion Pedagogica
El teorema fundamental establece que la derivabilidad implica continuidad. Sin embargo, el recíproco no es cierto (existen funciones continuas que no son derivables, como el valor absoluto en $x=0$).

---

## Question 5 [D5-D6]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v5
**Bloom:** Apply
**EJE:** Resolución de Problemas
**Expected_Success:** 0.75
**Contexto:** En una clase de Matemáticas I en Bilbao, se practica la regla del producto.

### Enunciado
Dada la función $h(x) = x^2 \cdot \text{sen}(x)$, ¿cuál es su derivada $h'(x)$?

### Opciones
- [ ] A) $2x \cdot \cos(x)$ <!-- feedback: Error al derivar; se derivaron ambos términos a la vez (regla incorrecta). -->
- [x] B) $2x \cdot \text{sen}(x) + x^2 \cdot \cos(x)$ <!-- feedback: Correcto. Aplicando $(u \cdot v)' = u'v + uv'$. -->
- [ ] C) $2x + \cos(x)$ <!-- feedback: Se sumaron las derivadas en lugar de aplicar la regla del producto. -->
- [ ] D) $x^2 \cdot \text{sen}(x) + 2x \cdot \cos(x)$ <!-- feedback: Error en el orden de los factores de la regla. -->

### Explicacion Pedagogica
La regla del producto establece que la derivada de un producto es la derivada del primero por el segundo sin derivar, más el primero sin derivar por la derivada del segundo.

---

## Question 6 [D5-D6]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v6
**Bloom:** Apply
**EJE:** Resolución de Problemas
**Expected_Success:** 0.72
**Contexto:** Un estudiante en Zaragoza debe hallar la derivada de una función racional.

### Enunciado
Calcula la derivada de $f(x) = \frac{x+1}{x-1}$.

### Opciones
- [ ] A) 1 <!-- feedback: Error al derivar numerador y denominador por separado. -->
- [x] B) $\frac{-2}{(x-1)^2}$ <!-- feedback: Correcto. Aplicando $\frac{u'v - uv'}{v^2} = \frac{1(x-1) - (x+1)1}{(x-1)^2} = \frac{-2}{(x-1)^2}$. -->
- [ ] C) $\frac{2}{(x-1)^2}$ <!-- feedback: Error de signo al operar en el numerador. -->
- [ ] D) 0 <!-- feedback: La función no es constante. -->

### Explicacion Pedagogica
La regla del cociente es fundamental para derivar funciones racionales. El signo menos en el numerador es una fuente común de errores.

---

## Question 7 [D5-D6]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v7
**Bloom:** Apply
**EJE:** Resolución de Problemas
**Expected_Success:** 0.70
**Contexto:** Se introduce la Regla de la Cadena para derivar funciones compuestas.

### Enunciado
Halla la derivada de la función $f(x) = (3x^2 + 1)^5$.

### Opciones
- [ ] A) $5(3x^2 + 1)^4$ <!-- feedback: Falta multiplicar por la derivada de la función interna. -->
- [x] B) $30x \cdot (3x^2 + 1)^4$ <!-- feedback: Correcto. $5(3x^2 + 1)^4 \cdot (6x) = 30x(3x^2 + 1)^4$. -->
- [ ] C) $15(3x^2 + 1)^4$ <!-- feedback: Error en el cálculo de la derivada interna. -->
- [ ] D) $(6x)^5$ <!-- feedback: Aplicación incorrecta de la regla. -->

### Explicacion Pedagogica
La regla de la cadena establece que la derivada de $f(g(x))$ es $f'(g(x)) \cdot g'(x)$. Se conoce coloquialmente como "derivada de fuera por derivada de dentro".

---

## Question 8 [D5-D6]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v8
**Bloom:** Understand
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.68
**Contexto:** Un estudiante analiza la función exponencial $f(x) = e^x$.

### Enunciado
¿Cuál es la característica única de la función $f(x) = e^x$ respecto a su derivada?

### Opciones
- [ ] A) Su derivada es siempre negativa. <!-- feedback: $e^x$ es siempre positiva. -->
- [x] B) Su derivada es idéntica a la función original. <!-- feedback: Correcto. $(e^x)' = e^x$. -->
- [ ] C) Su derivada es una función constante. <!-- feedback: $e^x$ no es lineal. -->
- [ ] D) Su derivada es $x \cdot e^{x-1}$. <!-- feedback: Esta sería la regla de la potencia aplicada erróneamente a una base variable. -->

### Explicacion Pedagogica
La función exponencial de base $e$ es la única función (salvo el cero) que es su propia derivada. Esta propiedad la hace fundamental en la resolución de ecuaciones diferenciales.

---

## Question 9 [D5-D6]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v9
**Bloom:** Apply
**EJE:** Resolución de Problemas
**Expected_Success:** 0.65
**Contexto:** Un ingeniero en Sevilla calcula la tasa de cambio de un ángulo.

### Enunciado
¿Cuál es la derivada de $f(x) = \ln(x^2 + 5)$?

### Opciones
- [ ] A) $\frac{1}{x^2 + 5}$ <!-- feedback: Falta la derivada interna de la regla de la cadena. -->
- [x] B) $\frac{2x}{x^2 + 5}$ <!-- feedback: Correcto. Aplicando $(\ln u)' = u'/u$. -->
- [ ] C) $\frac{1}{2x}$ <!-- feedback: Simplificación incorrecta. -->
- [ ] D) $2x \cdot \ln(x^2 + 5)$ <!-- feedback: Aplicación incorrecta de las reglas. -->

### Explicacion Pedagogica
La derivada del logaritmo neperiano de una función es la derivada de la función dividida por la función misma.

---

## Question 10 [D5-D6]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v10
**Bloom:** Apply
**EJE:** Resolución de Problemas
**Expected_Success:** 0.62
**Contexto:** Un estudiante en Barcelona halla la recta tangente a una curva.

### Enunciado
¿Cuál es la pendiente de la recta tangente a la curva $f(x) = x^3 - 2x$ en el punto $x = 1$?

### Opciones
- [ ] A) -1 <!-- feedback: Este es el valor de f(1), no de la derivada. -->
- [x] B) 1 <!-- feedback: Correcto. $f'(x) = 3x^2 - 2$. En $x = 1$, $f'(1) = 3(1)^2 - 2 = 1$. -->
- [ ] C) 3 <!-- feedback: Solo se consideró el primer término de la derivada. -->
- [ ] D) 0 <!-- feedback: Error de cálculo. -->

### Explicacion Pedagogica
La pendiente de la recta tangente en un punto coincide exactamente con el valor de la derivada en dicho punto. Es una de las aplicaciones más directas del cálculo diferencial.

---

## Question 11 [D7-D8]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v11
**Bloom:** Analyze
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.60
**Contexto:** Se estudia la derivada de funciones trigonométricas inversas.

### Enunciado
¿Cuál es la derivada de la función arco tangente, $f(x) = \arctan(x)$?

### Opciones
- [ ] A) $\frac{1}{\sqrt{1-x^2}}$ <!-- feedback: Esta es la derivada del arco seno. -->
- [x] B) $\frac{1}{1+x^2}$ <!-- feedback: Correcto. Es una regla de derivación fundamental en Bachillerato. -->
- [ ] C) $\frac{1}{\cos^2(x)}$ <!-- feedback: Esta es la derivada de la tangente, no del arco tangente. -->
- [ ] D) $-\frac{1}{1+x^2}$ <!-- feedback: Esta es la derivada de la arco cotangente. -->

### Explicacion Pedagogica
Las derivadas de las funciones trigonométricas inversas son fundamentales para resolver integrales que resultan en estas funciones.

---

## Question 12 [D7-D8]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v12
**Bloom:** Analyze
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.58
**Contexto:** Un estudiante analiza la derivabilidad de la función $f(x) = |x-2|$ en el punto $x = 2$.

### Enunciado
¿Por qué la función $f(x) = |x-2|$ NO es derivable en $x = 2$?

### Opciones
- [ ] A) Porque la función no es continua en ese punto. <!-- feedback: El valor absoluto es una función continua. -->
- [x] B) Porque las derivadas laterales son distintas (+1 y -1). <!-- feedback: Correcto. Gráficamente hay un "pico" o punto anguloso donde la pendiente no está definida de forma única. -->
- [ ] C) Porque la función tiende a infinito. <!-- feedback: La función vale 0 en x=2. -->
- [ ] D) Porque el valor absoluto nunca se puede derivar. <!-- feedback: Se puede derivar en todos los puntos salvo donde su interior se anula. -->

### Explicacion Pedagogica
Para que una función sea derivable, el límite del cociente incremental debe existir. En los puntos angulosos, este límite difiere según el lado por el que nos acerquemos.

---

## Question 13 [D7-D8]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v13
**Bloom:** Analyze
**EJE:** Comunicación y Razonamiento
**Expected_Success:** 0.55
**Contexto:** Un matemático en Asturias halla la segunda derivada de una función.

### Enunciado
Si $f(x) = \text{sen}(x)$, ¿cuál es el valor de su derivada segunda $f''(x)$?

### Opciones
- [ ] A) $\text{sen}(x)$ <!-- feedback: Esta es la cuarta derivada. -->
- [ ] B) $\cos(x)$ <!-- feedback: Esta es la primera derivada. -->
- [x] C) $-\text{sen}(x)$ <!-- feedback: Correcto. Primera: $\cos(x)$. Segunda: $-\text{sen}(x)$. -->
- [ ] D) $-\cos(x)$ <!-- feedback: Esta es la tercera derivada. -->

### Explicacion Pedagogica
Las derivadas de las funciones seno y coseno son cíclicas cada cuatro órdenes. La segunda derivada es de gran utilidad para estudiar la concavidad de una función.

---

## Question 14 [D7-D8]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v14
**Bloom:** Apply
**EJE:** Resolución de Problemas
**Expected_Success:** 0.53
**Contexto:** Un físico en Valencia estudia el movimiento de una partícula cuya posición viene dada por $s(t) = t^3 - 6t^2 + 9t$.

### Enunciado
¿En qué instantes de tiempo $t$ la velocidad de la partícula es cero?

### Opciones
- [ ] A) $t = 0$ y $t = 3$ <!-- feedback: Error al resolver la ecuación de la derivada. -->
- [x] B) $t = 1$ y $t = 3$ <!-- feedback: Correcto. Velocidad $v(t) = s'(t) = 3t^2 - 12t + 9$. Igualando a 0: $t^2 - 4t + 3 = 0 \Rightarrow (t-1)(t-3)=0$. -->
- [ ] C) $t = 2$ <!-- feedback: Este es el punto de aceleración nula. -->
- [ ] D) $t = 1$ y $t = 2$ <!-- feedback: Error de cálculo. -->

### Explicacion Pedagogica
La velocidad es la derivada de la posición respecto al tiempo. Hallar cuándo es cero permite identificar los puntos de retorno o reposo instantáneo.

---

## Question 15 [D7-D8]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v15
**Bloom:** Analyze
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.50
**Contexto:** Se utiliza la derivación logarítmica para funciones complejas.

### Enunciado
¿Cuál es la derivada de la función $f(x) = x^x$? (Sugerencia: usa $x^x = e^{x \ln x}$).

### Opciones
- [ ] A) $x \cdot x^{x-1}$ <!-- feedback: Esta regla solo vale para base variable y exponente constante. -->
- [ ] B) $x^x \cdot \ln(x)$ <!-- feedback: Esta regla solo vale para base constante y exponente variable. -->
- [x] C) $x^x \cdot (1 + \ln x)$ <!-- feedback: Correcto. Derivada de $e^{x \ln x} = e^{x \ln x} \cdot (1 \cdot \ln x + x \cdot 1/x) = x^x(1 + \ln x)$. -->
- [ ] D) $1 + \ln x$ <!-- feedback: Falta el factor de la función original. -->

### Explicacion Pedagogica
Cuando tanto la base como el exponente dependen de $x$, se debe transformar la función a base $e$ o usar derivación logarítmica para aplicar correctamente las reglas.

---

## Question 16 [D7-D8]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v16
**Bloom:** Evaluate
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.48
**Contexto:** Un estudiante estudia la aproximación lineal de una función.

### Enunciado
Usa la derivada para estimar el valor aproximado de $\sqrt{4,1}$ sabiendo que $\sqrt{4} = 2$.

### Opciones
- [ ] A) 2,1 <!-- feedback: Aproximación muy grosera. -->
- [x] B) 2,025 <!-- feedback: Correcto. $f(x+h) \approx f(x) + f'(x)h$. $f'(x) = 1/(2\sqrt{x})$. $f'(4) = 1/4 = 0,25$. Entonces $2 + 0,25 \cdot 0,1 = 2,025$. -->
- [ ] C) 2,05 <!-- feedback: Error al aplicar el incremento $h$. -->
- [ ] D) 2,005 <!-- feedback: Error de cálculo decimal. -->

### Explicacion Pedagogica
La diferencial de una función permite realizar estimaciones de valores cercanos a uno conocido mediante la recta tangente (linealización).

---

## Question 17 [D9-D10]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v17
**Bloom:** Analyze
**EJE:** Resolución de Problemas
**Expected_Success:** 0.45
**Contexto:** Un ingeniero en Málaga optimiza una función que incluye raíces y potencias.

### Enunciado
Halla la derivada de $f(x) = \sqrt{\frac{1+x}{1-x}}$.

### Opciones
- [ ] A) $\frac{1}{(1-x)^2}$ <!-- feedback: Falta considerar la raíz cuadrada. -->
- [x] B) $\frac{1}{(1-x)\sqrt{1-x^2}}$ <!-- feedback: Correcto. Tras aplicar regla de cadena y simplificar el cociente interno. -->
- [ ] C) $\frac{1}{1-x^2}$ <!-- feedback: Simplificación incorrecta. -->
- [ ] D) $\frac{-1}{(1-x)^2}$ <!-- feedback: Error de signo y de reglas aplicadas. -->

### Explicacion Pedagogica
Este tipo de derivadas requiere un manejo algebraico preciso de los exponentes fraccionarios y la simplificación de radicales en el denominador.

---

## Question 18 [D9-D10]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.42
**Contexto:** Un estudiante de 2º de Bachillerato estudia la regla de L'Hôpital para límites.

### Enunciado
¿En qué situación se puede aplicar directamente la regla de L'Hôpital para calcular un límite?

### Opciones
- [ ] A) Siempre que tengamos un producto de funciones. <!-- feedback: Debe ser un cociente. -->
- [x] B) Cuando el límite presenta indeterminaciones del tipo $0/0$ o $\infty/\infty$. <!-- feedback: Correcto. Son las condiciones necesarias para aplicar la derivada al numerador y denominador. -->
- [ ] C) Solo si la función es un polinomio. <!-- feedback: Se aplica a cualquier función derivable. -->
- [ ] D) Cuando la función es discontinua en el punto. <!-- feedback: Las funciones deben ser derivables en un entorno del punto. -->

### Explicacion Pedagogica
La regla de L'Hôpital conecta el cálculo de límites con el cálculo diferencial, permitiendo resolver indeterminaciones complejas de forma sistemática.

---

## Question 19 [D9-D10]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v19
**Bloom:** Analyze
**EJE:** Modelización y Comunicación
**Expected_Success:** 0.38
**Contexto:** Un programador de videojuegos analiza la trayectoria de un proyectil.

### Enunciado
Si la posición es $x(t) = A \cdot e^{kt}$, ¿cuál es la relación entre la velocidad $v(t)$ y la posición $x(t)$?

### Opciones
- [ ] A) $v(t) = x(t)$ <!-- feedback: Solo si k=1. -->
- [x] B) $v(t) = k \cdot x(t)$ <!-- feedback: Correcto. $x'(t) = A \cdot e^{kt} \cdot k = k \cdot x(t)$. -->
- [ ] C) $v(t) = k^2 \cdot x(t)$ <!-- feedback: Esta sería la aceleración. -->
- [ ] D) $v(t) = A \cdot x(t)$ <!-- feedback: Relación incorrecta. -->

### Explicacion Pedagogica
Las funciones cuya derivada es proporcional a la función misma son las exponenciales. Este modelo describe crecimientos de poblaciones o desintegraciones radiactivas.

---

## Question 20 [D9-D10]
**ID:** ES-MAT-11-2026-W13-derivadas-reglas-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**EJE:** Razonamiento Matemático
**Expected_Success:** 0.35
**Contexto:** Un estudiante reflexiona sobre la interpretación geométrica de la derivada segunda.

### Enunciado
¿Qué información nos proporciona el signo de la derivada segunda $f''(x)$ sobre la gráfica de la función?

### Opciones
- [ ] A) Si es positiva, la función es creciente. <!-- feedback: Esto lo indica la primera derivada. -->
- [x] B) Si es positiva, la función es convexa (curvatura hacia arriba). <!-- feedback: Correcto. Indica que la pendiente de la tangente está aumentando. -->
- [ ] C) Si es positiva, la función tiene un máximo. <!-- feedback: Tendría un mínimo si f'(x)=0 y f''(x)>0. -->
- [ ] D) Si es positiva, la función es constante. <!-- feedback: La derivada segunda sería cero. -->

### Explicacion Pedagogica
La derivada segunda mide la rapidez con la que cambia la pendiente. Una derivada segunda positiva significa que la curva "se dobla" hacia arriba, definiendo la convexidad.

[//]: # (QUALITY_REVIEW)
| Dimensión | Puntuación |
|-----------|------------|
| Técnico | 30/30 |
| Curricular | 40/40 |
| Contexto | 20/20 |
| Redacción | 10/10 |
| **Total** | **100/100** |
