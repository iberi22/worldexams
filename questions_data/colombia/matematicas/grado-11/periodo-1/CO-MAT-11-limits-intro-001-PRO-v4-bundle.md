---
id: "CO-MAT-11-limits-intro-001-PRO"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Límites: Concepto Intuitivo e Indeterminaciones Básicas"
periodo: 1
protocol_version: "4.1"
total_questions: 20
difficulty_range: "3-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["Interpretación", "Formulación", "Argumentación"]
cognitive_levels: ["Analyze", "Evaluate", "Synthesis", "Transfer"]
estado: "draft"
creador: "Antigravity (Protocol v4.1)"
generation_date: "2026-03-03"
source: "Saber 11 - Mathematics Framework"
source_license: "CC BY-SA 4.0"
---

## Contexto 1: La Paradoja de Zenón y el Concepto de Límite
Zenón de Elea propuso que para llegar a un punto $B$ desde un punto $A$, primero se debe recorrer la mitad de la distancia, luego la mitad de lo que queda, y así sucesivamente. Matemáticamente, esto se representa como la suma: $S = \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \dots + \frac{1}{2^n}$. El concepto de límite nos permite entender hacia qué valor se "acerca" esta suma cuando el número de pasos $n$ tiende al infinito.

---

## Question 1 (Análisis - Dificultad 3)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v1`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Considere la función $f(x) = \frac{x^2 - 1}{x - 1}$. Aunque la función no está definida en $x = 1$, ¿hacia qué valor se acercan las imágenes de $f(x)$ cuando $x$ se aproxima mucho a 1?

### Opciones
- [ ] A) 1
- [x] B) 2
- [ ] C) No existe el límite.
- [ ] D) $0/0$

### Explicación Pedagógica
Podemos simplificar la expresión factorizando el numerador (diferencia de cuadrados):
$f(x) = \frac{(x-1)(x+1)}{x-1}$
Para $x \neq 1$, podemos cancelar el término $(x-1)$, obteniendo $f(x) = x + 1$.
A medida que $x \to 1$, el valor de $x+1 \to 2$. Este es el concepto fundamental de límite: lo que sucede *cerca* del punto, no en el punto.

---

## Question 2 (Evaluación - Dificultad 5)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v2`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Calcule el valor del límite: $\lim_{x \to 4} \frac{\sqrt{x} - 2}{x - 4}$.

### Opciones
- [ ] A) 0
- [ ] B) 1/2
- [x] C) 1/4
- [ ] D) No existe.

### Explicación Pedagógica
Al sustituir $x=4$ obtenemos la indeterminación $0/0$. Para resolverlo, podemos racionalizar el numerador multiplicando por el conjugado:
$\frac{\sqrt{x} - 2}{x - 4} \cdot \frac{\sqrt{x} + 2}{\sqrt{x} + 2} = \frac{x - 4}{(x - 4)(\sqrt{x} + 2)}$
Cancelando $(x-4)$, nos queda $\frac{1}{\sqrt{x} + 2}$.
Evaluando el límite cuando $x \to 4$: $\frac{1}{\sqrt{4} + 2} = \frac{1}{2 + 2} = \frac{1}{4}$.

---

## Question 3 (Síntesis - Dificultad 7)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Dada la función $g(x) = \begin{cases} x + k & x < 3 \\ 2x - 1 & x \ge 3 \end{cases}$. Seleccione TODAS las afirmaciones correctas sobre la existencia del límite $\lim_{x \to 3} g(x)$.

### Opciones
- [x] A) Para que el límite exista, los límites laterales deben ser iguales. <!-- weight: 1.0 -->
- [x] B) El límite izquierdo es $3 + k$ y el límite derecho es $5$. <!-- weight: 1.0 -->
- [x] C) Si $k = 2$, el límite existe y su valor es $5$. <!-- weight: 1.0 -->
- [ ] D) El límite existe para cualquier valor de $k$ real.
- [ ] E) La función es siempre discontinua en $x=3$ sin importar el valor de $k$.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A) Definición fundamental de límite en un punto. B) Evaluando $x+k$ en 3 obtenemos $3+k$; evaluando $2x-1$ en 3 obtenemos $2(3)-1 = 5$. C) Si $3+k = 5 \to k=2$. En este caso, el límite es 5. D es falso porque si $k \neq 2$, los límites laterales difieren.

---

## Question 4 (Análisis de Indeterminaciones - Dificultad 6)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v4`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál es el valor de $\lim_{x \to 0} \frac{\sin(3x)}{x}$? (Use el límite notable $\lim_{\theta \to 0} \frac{\sin\theta}{\theta} = 1$).

### Opciones
- [ ] A) 1
- [ ] B) 0
- [x] C) 3
- [ ] D) 1/3

### Explicación Pedagógica
Para usar el límite notable, el argumento del seno y el denominador deben ser iguales.
Multiplicamos y dividimos por 3:
$3 \cdot \frac{\sin(3x)}{3x}$
Cuando $x \to 0$, también $3x \to 0$. Por lo tanto, $\lim_{x \to 0} \frac{\sin(3x)}{3x} = 1$.
El resultado final es $3 \cdot 1 = 3$.

---

## Question 5 (Genio - Dificultad 8)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Considere el límite $\lim_{x \to 2} \frac{x^3 - 8}{x^2 - 4}$. Determine el valor correcto del límite aplicando factorización de cubos.

### Opciones
- [x] A) 3 <!-- weight: 1.0 -->
- [x] B) 12/4 <!-- weight: 1.0 -->
- [x] C) 1.5 <!-- weight: 0.0 -->
- [ ] D) $0/0$ <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto.
- Respuesta C: 0.0 puntos (Indica error en el cálculo de la suma final).

### Explicación Pedagógica
Indeterminación $0/0$. Factorizamos:
Numerador (Diferencia de cubos): $x^3 - 2^3 = (x-2)(x^2 + 2x + 4)$.
Denominador (Diferencia de cuadrados): $x^2 - 4 = (x-2)(x+2)$.
El límite queda: $\lim_{x \to 2} \frac{(x-2)(x^2 + 2x + 4)}{(x-2)(x+2)} = \lim_{x \to 2} \frac{x^2 + 2x + 4}{x + 2}$.
Sustituyendo $x=2$: $\frac{4 + 4 + 4}{2 + 2} = \frac{12}{4} = 3$.

---

## Contexto 2: Límites y Velocidad Instantánea
En física, la velocidad instantánea de un objeto en el tiempo $t$ se define como el límite de la velocidad promedio cuando el intervalo de tiempo $\Delta t$ tiende a cero: $v(t) = \lim_{\Delta t \to 0} \frac{s(t + \Delta t) - s(t)}{\Delta t}$, donde $s(t)$ es la posición.

---

## Question 6 (Transferencia - Dificultad 9)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v6`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Transfer

### Enunciado
Si la posición de una partícula es $s(t) = t^2$ metros, calcule la velocidad instantánea en $t = 5$ segundos usando la definición de límite anterior.

### Opciones
- [ ] A) 5 m/s
- [x] B) 10 m/s
- [ ] C) 25 m/s
- [ ] D) 0 m/s

### Explicación Pedagógica
Evaluamos el límite:
$\lim_{\Delta t \to 0} \frac{(5 + \Delta t)^2 - 5^2}{\Delta t} = \lim_{\Delta t \to 0} \frac{25 + 10\Delta t + (\Delta t)^2 - 25}{\Delta t}$
$= \lim_{\Delta t \to 0} \frac{10\Delta t + (\Delta t)^2}{\Delta t} = \lim_{\Delta t \to 0} (10 + \Delta t)$
Cuando $\Delta t \to 0$, la velocidad es $10$ m/s. Este es el origen del cálculo diferencial.

---

## Question 7 (Análisis Infinito - Dificultad 5)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v7`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál es el comportamiento de $f(x) = \frac{1}{x^2}$ cuando $x$ se aproxima a 0?

### Opciones
- [ ] A) El límite es 0.
- [x] B) El límite tiende a $+\infty$.
- [ ] C) El límite tiende a $-\infty$.
- [ ] D) El límite es 1.

### Explicación Pedagógica
A medida que $x$ se acerca a 0 (ya sea por la izquierda o por la derecha), $x^2$ es un número positivo extremadamente pequeño. Dividir 1 por un número positivo tan pequeño resulta en un número inmensamente grande. Por lo tanto, $\lim_{x \to 0} \frac{1}{x^2} = \infty$.

---

## Question 8 (Evaluación de Errores - Dificultad 4)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v8`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Un estudiante afirma que $\lim_{x \to 0} \frac{|x|}{x} = 1$. ¿Es correcta esta afirmación?

### Opciones
- [ ] A) Sí, porque la distancia siempre es positiva.
- [ ] B) Sí, porque $x/x = 1$.
- [x] C) No, porque el límite por la izquierda es -1 y el límite por la derecha es 1.
- [ ] D) No, porque no se puede dividir por cero.

### Explicación Pedagógica
Analizando límites laterales:
- Si $x \to 0^+$, $|x| = x$, entonces $x/x = 1$.
- Si $x \to 0^-$, $|x| = -x$, entonces $-x/x = -1$.
Como los límites laterales son desiguales, el límite general no existe. La afirmación del estudiante es falsa.

---

## Question 9 (Técnica Avanzada - Dificultad 7)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v9`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
Resuelva el límite: $\lim_{x \to 0} \frac{\sqrt{x+1} - 1}{x}$.

### Opciones
- [ ] A) 1
- [x] B) 1/2
- [ ] C) 0
- [ ] D) 2

### Explicación Pedagógica
Indeterminación $0/0$. Racionalizamos:
$\frac{\sqrt{x+1} - 1}{x} \cdot \frac{\sqrt{x+1} + 1}{\sqrt{x+1} + 1} = \frac{(x+1) - 1}{x(\sqrt{x+1} + 1)} = \frac{x}{x(\sqrt{x+1} + 1)}$
$= \frac{1}{\sqrt{x+1} + 1}$.
Al evaluar en $x=0$: $\frac{1}{\sqrt{1} + 1} = \frac{1}{1 + 1} = 1/2$.

---

## Question 10 (Síntesis Matemática - Dificultad 8)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v10`
**Type:** `multi-correct`
**ICFES:** Interpretación y Representación
**Bloom:** Synthesis

### Enunciado
Considere la función $h(x) = \frac{x^2 - 5x + 6}{x^2 - 9}$. Seleccione TODAS las afirmaciones correctas sobre sus límites.

### Opciones
- [x] A) En $x=3$ hay una indeterminación $0/0$ que resulta en un límite de $1/6$. <!-- weight: 1.0 -->
- [x] B) En $x=-3$ el límite no existe (asíntota vertical). <!-- weight: 1.0 -->
- [ ] C) El límite cuando $x \to \infty$ es 0.
- [x] D) La función simplificada para $x \neq 3$ es $\frac{x-2}{x+3}$. <!-- weight: 1.0 -->
- [ ] E) En $x=2$ hay una asíntota vertical.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
Factorizamos: $\frac{(x-2)(x-3)}{(x-3)(x+3)}$. Simplificando (D), queda $\frac{x-2}{x+3}$.
A) Evaluando en 3: $(3-2)/(3+3) = 1/6$. Correcto.
B) En $x=-3$, el denominador es cero pero el numerador no, indicando una asíntota. Correcto.
C es falso: $\lim_{x \to \infty}$ es 1 (mismo grado). E es falso: $x=2$ es una raíz del numerador (cruce por el eje X).

---

## Question 11 (Análisis Gráfico - Dificultad 5)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v11`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si una función $f(x)$ cumple que $\lim_{x \to a} f(x) = L$, pero $f(a)$ no existe, ¿qué tipo de discontinuidad presenta la gráfica en ese punto?

### Opciones
- [ ] A) Discontinuidad infinita.
- [x] B) Discontinuidad evitable (o puntual).
- [ ] C) Discontinuidad de salto.
- [ ] D) La función es continua.

### Explicación Pedagógica
Si el límite existe ($L$), significa que los caminos desde ambos lados se encuentran en un punto "hueco". Como solo falta el punto o está desplazado, la discontinuidad se puede "evitar" redefiniendo $f(a) = L$.

---

## Question 12 (Evaluación Crítica - Dificultad 6)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v12`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Calcule $\lim_{x \to 0} \frac{1 - \cos x}{x}$. (Use la identidad $1 - \cos x = 2\sin^2(x/2)$).

### Opciones
- [x] A) 0
- [ ] B) 1
- [ ] C) 1/2
- [ ] D) No existe.

### Explicación Pedagógica
$\lim_{x \to 0} \frac{2\sin^2(x/2)}{x} = \lim_{x \to 0} \sin(x/2) \cdot \frac{\sin(x/2)}{x/2}$.
Sabemos que $\frac{\sin(x/2)}{x/2} \to 1$.
Entonces el límite es $0 \cdot 1 = 0$.
Este es un límite fundamental en la demostración de la derivada del coseno.

---

## Question 13 (Genio Interdisciplinar - Dificultad 10)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Transfer

### Enunciado
En la teoría de la relatividad especial, la masa de un objeto aumenta con su velocidad $v$ según: $m(v) = \frac{m_0}{\sqrt{1 - (v/c)^2}}$, donde $c$ es la velocidad de la luz. ¿Cuál es el límite de la masa cuando la velocidad del objeto se aproxima a la velocidad de la luz ($\lim_{v \to c^-} m(v)$)?

### Opciones
- [x] A) $+\infty$: Se requeriría energía infinita para alcanzar la velocidad de la luz. <!-- weight: 1.0 -->
- [x] B) La masa se vuelve imaginaria. <!-- weight: 0.2 --> (Solo si $v > c$)
- [ ] C) $m_0$: La masa no cambia. <!-- weight: 0.0 -->
- [ ] D) 0: La masa desaparece. <!-- weight: 0.0 -->

### Scoring
- Respuesta A: 1.0 punto. (Conclusión física y matemática correcta)
- Respuesta B: 0.2 puntos. (Identifica el problema del radical pero erra el límite lateral solicitado)

### Explicación Pedagógica
A medida que $v \to c$, $(v/c)^2 \to 1$.
El radical $\sqrt{1 - (v/c)^2} \to 0$.
Dividir la masa en reposo $m_0$ por un número infinitesimalmente pequeño hace que el resultado tienda a infinito. Esta es la razón física por la cual ningún objeto con masa puede viajar a la velocidad de la luz.

---

## Question 14 (Análisis Lógico - Dificultad 5)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v14`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
Si $\lim_{x \to 2} f(x) = 5$ y $\lim_{x \to 2} g(x) = -2$, ¿cuál es el valor de $\lim_{x \to 2} [f(x)^2 + 3g(x)]$?

### Opciones
- [ ] A) 25
- [ ] B) 19
- [x] C) 19 (Operación: $5^2 + 3(-2) = 25 - 6$)
- [ ] D) 31

### Explicación Pedagógica
Usamos las propiedades de los límites (suma, potencia y producto por escalar):
$L = (\lim f(x))^2 + 3(\lim g(x))$
$L = 5^2 + 3(-2) = 25 - 6 = 19$.

---

## Question 15 (Indeterminación Especial - Dificultad 8)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v15`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** synthesis

### Enunciado
Evalúe $\lim_{h \to 0} \frac{1/ (x+h) - 1/x}{h}$.

### Opciones
- [ ] A) $1/x^2$
- [x] B) $-1/x^2$
- [ ] C) 0
- [ ] D) No se puede simplificar.

### Explicación Pedagógica
Simplificamos la fracción del numerador:
$\frac{x - (x+h)}{x(x+h)} = \frac{-h}{x(x+h)}$.
Dividiendo entre $h$:
$\frac{-h}{h \cdot x(x+h)} = \frac{-1}{x(x+h)}$.
Tomando el límite cuando $h \to 0$:
$\frac{-1}{x(x+0)} = -1/x^2$.
Este límite es la definición de la derivada de $1/x$.

---

## Question 16 (Análisis de Racionalización - Dificultad 7)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v16`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
¿Cuál es el valor de $\lim_{x \to 7} \frac{\sqrt{x+2} - 3}{x - 7}$?

### Opciones
- [ ] A) 1/3
- [x] B) 1/6
- [ ] C) 1
- [ ] D) No existe.

### Explicación Pedagógica
Multiplicamos por el conjugado $\sqrt{x+2} + 3$:
$\frac{x+2 - 9}{(x-7)(\sqrt{x+2} + 3)} = \frac{x-7}{(x-7)(\sqrt{x+2} + 3)} = \frac{1}{\sqrt{x+2} + 3}$.
Sustituyendo $x=7$: $\frac{1}{\sqrt{9} + 3} = \frac{1}{3+3} = 1/6$.

---

## Question 17 (Evaluación Conceptual - Dificultad 4)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v17`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Dada la gráfica de una función que tiene un "salto" en $x=c$ (el valor de la izquierda es 4 y el de la derecha es 4.00001), ¿existe el límite en $c$?

### Opciones
- [ ] A) Sí, porque la diferencia es despreciable.
- [x] B) No, estrictamente los límites laterales deben ser exactamente iguales para que el límite exista.
- [ ] C) Sí, el límite es 4.
- [ ] D) Solo existe si $c$ es un número entero.

### Explicación Pedagógica
En matemáticas, la precisión es absoluta. Si $L_1 \neq L_2$, el límite no existe, sin importar cuán pequeña sea la diferencia. Un salto, por diminuto que sea, rompe la existencia del límite.

---

## Question 18 (Trigonometría y Límites - Dificultad 9)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v18`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** synthesis

### Enunciado
Sobre el límite $\lim_{x \to 0} \frac{\tan x}{x}$, seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) El resultado es 1. <!-- weight: 1.0 -->
- [x] B) Se puede resolver expresando $\tan x$ como $\frac{\sin x}{\cos x}$. <!-- weight: 1.0 -->
- [x] C) Es equivalente a $\lim_{x \to 0} \frac{\sin x}{x} \cdot \frac{1}{\cos x}$. <!-- weight: 1.0 -->
- [ ] D) El resultado es 0 porque $\tan(0) = 0$.
- [ ] E) Resulta en $+\infty$.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B y C son pasos lógicos correctos. $\frac{\tan x}{x} = \frac{\sin x}{x \cos x}$. Como $\frac{\sin x}{x} \to 1$ y $1/\cos x \to 1$, el producto es 1. D es un error común al no reconocer la indeterminación.

---

## Question 19 (Interpretación de Modelos - Dificultad 5)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v19`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
Un capacitor se carga según $V(t) = V_0(1 - e^{-t/RC})$. ¿Cuál es el voltaje máximo que alcanzará el capacitor teóricamente ($\lim_{t \to \infty} V(t)$)?

### Opciones
- [ ] A) 0
- [x] B) $V_0$
- [ ] C) $V_0/2$
- [ ] D) Se quemará antes de alcanzar un límite.

### Explicación Pedagógica
A medida que $t \to \infty$, el exponente $-t/RC \to -\infty$.
Sabemos que $e^{-\infty} \to 0$.
Entonces $V(t) \to V_0(1 - 0) = V_0$.
El voltaje de la fuente es el límite asintótico de la carga del capacitor.

---

## Question 20 (Genio Teórico - Dificultad 10)

**ID:** `CO-MAT-11-limits-intro-001-PRO-v20`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** evaluate

### Enunciado
La definición formal $(\epsilon, \delta)$ de límite establece que $\lim_{x \to c} f(x) = L$ si para todo $\epsilon > 0$ existe un $\delta > 0$ tal que si $0 < |x - c| < \delta$, entonces $|f(x) - L| < \epsilon$.

Si queremos probar que $\lim_{x \to 3} (2x - 1) = 5$, ¿cuál es la relación entre $\delta$ y $\epsilon$ que debemos encontrar?

### Opciones
- [x] A) $\delta = \epsilon/2$ <!-- weight: 1.0 -->
- [x] B) $\delta = \epsilon$ <!-- weight: 0.0 -->
- [x] C) $\delta = 2\epsilon$ <!-- weight: 0.0 -->
- [ ] D) No hay relación constante. <!-- weight: 0.0 -->

### Scoring
- Respuesta A: 1.0 punto. (Aislando la variable en la desigualdad)

### Explicación Pedagógica
Buscamos que $|(2x - 1) - 5| < \epsilon$.
Simplificamos: $|2x - 6| < \epsilon$.
Factorizamos el 2: $2|x - 3| < \epsilon$.
Dividimos por 2: $|x - 3| < \epsilon/2$.
Como la definición pide $|x - 3| < \delta$, concluimos que elegir $\delta = \epsilon/2$ garantiza que la función se mantenga dentro del margen de error $\epsilon$. Esto demuestra formalmente el límite.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Type | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 3 | single | Analyze | Interpretación | ✅ |
| 2 | ...-v2 | 5 | single | Evaluate | Formulación | ✅ |
| 3 | ...-v3 | 7 | multi-correct | Synthesis | Argumentación | ✅ |
| 4 | ...-v4 | 6 | single | Analyze | Interpretación | ✅ |
| 5 | ...-v5 | 8 | weighted | Evaluate | Argumentación | ✅ |
| 6 | ...-v6 | 9 | single | Transfer | Formulación | ✅ |
| 7 | ...-v7 | 5 | single | Analyze | Interpretación | ✅ |
| 8 | ...-v8 | 4 | single | Evaluate | Argumentación | ✅ |
| 9 | ...-v9 | 7 | single | Apply | Formulación | ✅ |
| 10 | ...-v10| 8 | multi-correct | Synthesis | Interpretación | ✅ |
| 11 | ...-v11| 5 | single | Analyze | Interpretación | ✅ |
| 12 | ...-v12| 6 | single | Evaluate | Formulación | ✅ |
| 13 | ...-v13| 10| weighted | Transfer | Argumentación | ✅ |
| 14 | ...-v14| 5 | single | Analyze | Argumentación | ✅ |
| 15 | ...-v15| 8 | single | synthesis | Formulación | ✅ |
| 16 | ...-v16| 7 | single | Apply | Formulación | ✅ |
| 17 | ...-v17| 4 | single | Analyze | Interpretación | ✅ |
| 18 | ...-v18| 9 | multi-correct | synthesis | Argumentación | ✅ |
| 19 | ...-v19| 5 | single | Analyze | Formulación | ✅ |
| 20 | ...-v20| 10| weighted | evaluate | Argumentación | ✅ |
