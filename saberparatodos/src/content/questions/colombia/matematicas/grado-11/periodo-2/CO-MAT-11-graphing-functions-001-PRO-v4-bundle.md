---
id: "CO-MAT-11-graphing-functions-001-PRO"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Análisis de Gráficas usando Derivadas"
periodo: 2
protocol_version: "4.1"
total_questions: 20
difficulty_range: "5-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["Interpretación", "Formulación", "Argumentación"]
cognitive_levels: ["Analyze", "Evaluate", "Synthesis", "Transfer"]
estado: "draft"
creador: "Antigravity (Protocol v4.1)"
generation_date: "2026-03-03"
source: "Saber 11 - Mathematics Framework"
source_license: "CC BY-SA 4.0"
---

## Contexto 1: Visualizando el Comportamiento de las Funciones
Antes de las calculadoras gráficas, los matemáticos dependían totalmente del cálculo para "dibujar" el mundo. La primera derivada nos dice si una función sube o baja (crecimiento), mientras que la segunda derivada nos revela la curvatura (concavidad). Combinando esto con el estudio de raíces y asíntotas, podemos construir un mapa preciso de cualquier fenómeno modelado matemáticamente, desde la trayectoria de un proyectil hasta las fluctuaciones del mercado de valores.

---

## Question 1 (Analisis - Dificultad 5)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v1`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Dada una función $f(x)$ tal que en el intervalo $(2, 5)$ se cumple que $f'(x) < 0$ y $f''(x) > 0$. ¿Cómo es la gráfica en ese tramo?

### Opciones
- [ ] A) La función está subiendo y es cóncava hacia abajo.
- [ ] B) La función está bajando y es cóncava hacia abajo.
- [x] C) La función está bajando y es cóncava hacia arriba (frenando su caída).
- [ ] D) Es una línea recta horizontal.

### Explicación Pedagógica
$f'(x) < 0$ implica que la función es decreciente (baja).
$f''(x) > 0$ implica que la función es cóncava hacia arriba (forma de "U").
La combinación de ambas describe una curva que baja pero que cada vez baja con menos inclinación, preparándose posiblemente para un mínimo.

---

## Question 2 (Evaluación - Dificultad 6)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v2`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Considere la función $f(x) = x^3 - 3x^2$. ¿Cuáles son los intervalos de crecimiento y decrecimiento de esta función?

### Opciones
- [ ] A) Crece en todo su dominio.
- [x] B) Crece en $(-\infty, 0) \cup (2, \infty)$ y decrece en $(0, 2)$.
- [ ] C) Decrece en $(-\infty, 1)$ y crece en $(1, \infty)$.
- [ ] D) Crece solo para $x > 0$.

### Explicación Pedagógica
$f'(x) = 3x^2 - 6x = 3x(x - 2)$.
Puntos críticos: 0 y 2.
Evaluamos signos en los intervalos:
- $(-\infty, 0)$: $(-)(-)=(+)$ $\rightarrow$ Crece.
- $(0, 2)$: $(+)(-)=(-)$ $\rightarrow$ Decrece (de 0 a 2 la función baja).
- $(2, \infty)$: $(+)(+)=(+)$ $\rightarrow$ Crece.

---

## Question 3 (Síntesis - Dificultad 7)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Analice la función $g(x) = \frac{x^2}{x - 1}$. Seleccione TODAS las afirmaciones correctas para realizar su gráfica.

### Opciones
- [x] A) Tiene una asíntota vertical en $x = 1$. <!-- weight: 1.0 -->
- [x] B) Tiene una asíntota oblicua en $y = x + 1$. <!-- weight: 1.0 -->
- [ ] C) Tiene una asíntota horizontal en $y = 0$.
- [x] D) Tiene un mínimo local en $x = 2$. <!-- weight: 1.0 -->
- [ ] E) Es siempre creciente en su dominio.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A) El denominador se anula en 1. B) Dividiendo $x^2 \div (x-1)$ obtenemos $x+1 + 1/(x-1)$. D) $g'(x) = \frac{2x(x-1) - x^2}{(x-1)^2} = \frac{x^2 - 2x}{(x-1)^2}$. Críticos: 0 y 2. En $x=2$, $g'(x)$ pasa de negativo a positivo (mínimo). En $x=0$, hay un máximo local.

---

## Question 4 (Análisis de Concavidad - Dificultad 6)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v4`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿En qué intervalo la función $f(x) = x^4 - 6x^2$ es cóncava hacia abajo?

### Opciones
- [ ] A) $(-\infty, -1) \cup (1, \infty)$
- [x] B) $(-1, 1)$
- [ ] C) $(-\infty, \infty)$
- [ ] D) Solo en $x = 0$.

### Explicación Pedagógica
$f'(x) = 4x^3 - 12x$.
$f''(x) = 12x^2 - 12 = 12(x^2 - 1)$.
La concavidad es hacia abajo donde $f''(x) < 0$.
$x^2 - 1 < 0 \rightarrow x^2 < 1 \rightarrow -1 < x < 1$.
En el intervalo $(-1, 1)$, la gráfica tiene forma de "n".

---

## Question 5 (Genio - Dificultad 8)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Identifique la característica principal de la gráfica de $f(x) = \frac{1}{1 + e^{-x}}$ (función logística).

### Opciones
- [x] A) Tiene dos asíntotas horizontales en $y=0$ y $y=1$. <!-- weight: 1.0 -->
- [x] B) Es siempre creciente y tiene un punto de inflexión en $x=0$. <!-- weight: 1.0 -->
- [ ] C) Tiene una asíntota vertical en $x = 0$. <!-- weight: 0.0 -->
- [ ] D) Su rango es de $-\infty$ a $+\infty$. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (A describe sus límites, B describe su forma interna).

### Explicación Pedagógica
A medida que $x \to -\infty$, $e^{-x} \to \infty$, entonces $f(x) \to 0$.
A medida que $x \to \infty$, $e^{-x} \to 0$, entonces $f(x) \to 1$.
La función nunca baja de 0 ni sube de 1, y su crecimiento es más rápido justo en 0 (inflexión), dándole la clásica forma de "S".

---

## Contexto 2: El Análisis Crítico de la Información Visual
En las noticias y reportes económicos, las gráficas pueden ser engañosas si no se comprenden conceptos como la aceleración o los puntos de retorno. Decir que "la inflación está bajando" puede significar que los precios bajan (derivada negativa) o que suben pero menos rápido (segunda derivada negativa). El estudio de las funciones permite a un ciudadano discernir entre un crecimiento insostenible y una estabilización saludable de los procesos sociales.

---

## Question 6 (Transferencia - Dificultad 9)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v6`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Transfer

### Enunciado
Un titular dice: "La velocidad de aumento de la deuda pública se ha reducido a la mitad". En términos de una función $D(t)$ que representa la deuda, ¿qué magnitud ha disminuido?

### Opciones
- [ ] A) El valor de $D(t)$ (La deuda bajó).
- [ ] B) El valor de $D'(t)$ (El interés bajó).
- [x] C) El valor de $D''(t)$ (La aceleración del crecimiento de la deuda bajó).
- [ ] D) La asíntota de la deuda.

### Explicación Pedagógica
Si la deuda sigue aumentando, $D'(t)$ sigue siendo positivo. Si la "velocidad de aumento" se reduce, significa que el cambio en la velocidad ($D''(t)$) es negativo. La deuda crece cada vez menos rápido. Gráficamente, la curva pasó de ser cóncava hacia arriba a empezar a curvarse hacia abajo.

---

## Question 7 (Análisis de Asíntotas en Funciones con Raíces - Dificultad 7)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v7`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Determine las asíntotas horizontales de $f(x) = \frac{\sqrt{x^2 + 1}}{x}$.

### Opciones
- [ ] A) Solo $y = 1$.
- [x] B) $y = 1$ y $y = -1$.
- [ ] C) No tiene asíntotas horizontales.
- [ ] D) $y = 0$.

### Explicación Pedagógica
Para $x \to \infty$: $\frac{\sqrt{x^2}}{x} = \frac{x}{x} = 1$.
Para $x \to -\infty$: $\frac{\sqrt{x^2}}{x} = \frac{|x|}{x} = \frac{-x}{x} = -1$.
La gráfica se estabiliza en 1 por la derecha y en -1 por la izquierda. Esto ocurre frecuentemente en funciones que involucran el valor absoluto implícito en las raíces cuadradas de cuadrados.

---

## Question 8 (Evaluación de Puntos de Silla - Dificultad 5)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v8`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
En la función $f(x) = x^3$, ¿qué sucede en el punto $x = 0$?

### Opciones
- [ ] A) Hay un máximo local.
- [ ] B) Hay un mínimo local.
- [x] C) Hay un punto de inflexión donde la pendiente es cero pero no hay extremo relativo.
- [ ] D) Hay una asíntota vertical.

### Explicación Pedagógica
$f'(0) = 3(0)^2 = 0$. El punto es plano.
Sin embargo, a la izquierda de 0 la pendiente es positiva y a la derecha también. La función sube, se aplana y sigue subiendo. No es ni pico ni valle, sino un descanso o "punto de silla".

---

## Question 9 (Técnica de Dominio y Concavidad - Dificultad 8)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v9`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
¿En qué punto la función $f(x) = x \ln x$ alcanza su valor mínimo?

### Opciones
- [ ] A) $x = 1$
- [x] B) $x = 1/e$ (Derivada $\ln x + 1 = 0 \rightarrow \ln x = -1$)
- [ ] C) $x = 0$
- [ ] D) $x = e$

### Explicación Pedagógica
Dominio: $x > 0$.
$f'(x) = 1(\ln x) + x(1/x) = \ln x + 1$.
$\ln x + 1 = 0 \rightarrow \ln x = -1 \rightarrow x = e^{-1} = 1/e$.
Para verificar que es mínimo: $f''(x) = 1/x$. Como $x > 0$, la segunda derivada siempre es positiva (siempre cóncava hacia arriba). Por lo tanto, el punto crítico es un mínimo absoluto en su dominio.

---

## Question 10 (Síntesis Matemática - Dificultad 8)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v10`
**Type:** `multi-correct`
**ICFES:** Interpretación y Representación
**Bloom:** Synthesis

### Enunciado
Considere una función racional $f(x) = \frac{P(x)}{Q(x)}$. Seleccione TODAS las condiciones que garantizan la existencia de una asíntota oblicua.

### Opciones
- [x] A) El grado de $P(x)$ debe ser exactamente uno mayor que el grado de $Q(x)$. <!-- weight: 1.0 -->
- [ ] B) El grado de $P(x)$ debe ser menor que el de $Q(x)$.
- [x] C) No debe existir asíntota horizontal hacia el infinito correspondiente. <!-- weight: 1.0 -->
- [ ] D) El denominador debe ser siempre constante.
- [x] E) La división larga de los polinomios debe resultar en un cociente de la forma $ax + b$. <!-- weight: 1.0 -->

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
Las asíntotas oblicuas son "rectas inclinadas" que la función sigue al alejarse al infinito. Ocurren cuando al dividir, el término dominante es una línea recta (A y E). Si existiera horizontal, la función se aplanaría, impidiendo seguir una inclinación constante (C).

---

## Question 11 (Análisis de Simetría - Dificultad 5)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v11`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si una función es impar ($f(-x) = -f(x)$), ¿qué tipo de simetría presenta su gráfica?

### Opciones
- [ ] A) Simetría respecto al eje Y.
- [x] B) Simetría respecto al origen $(0, 0)$ (Simetría rotacional de 180°).
- [ ] C) Simetría respecto al eje X.
- [ ] D) No tiene simetría.

### Explicación Pedagógica
Funciones impares como $x^3$ o $\sin x$ tienen la propiedad de que lo que ocurre arriba a la derecha se refleja abajo a la izquierda. Si rotas la gráfica media vuelta sobre el centro, queda idéntica.

---

## Question 12 (Evaluación de Puntos Críticos y Concavidad - Dificultad 7)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v12`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Dada $f(x) = \frac{x^2 - 4}{x^2 + 4}$, ¿cuántos puntos de inflexión tiene su gráfica?

### Opciones
- [ ] A) 0
- [ ] B) 1
- [x] C) 2 (La concavidad cambia en dos puntos simétricos)
- [ ] D) 4

### Explicación Pedagógica
Al calcular la segunda derivada, encontraremos que el signo de $f''(x)$ depende de un polinomio cuadrático en el numerador que tiene dos raíces reales. Esto significa que la gráfica pasa de cóncava hacia abajo a hacia arriba y viceversa dos veces. Es una función en forma de "campana" o "pozo" muy suave.

---

## Question 13 (Genio Interdisciplinar - Dificultad 10)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Transfer

### Enunciado
**Física de Relatividad:** El factor de Lorentz $\gamma = \frac{1}{\sqrt{1 - v^2/c^2}}$ es fundamental para entender cómo se dilata el tiempo. ¿Qué característica gráfica de esta función impide que cualquier objeto con masa alcance la velocidad de la luz $c$?

### Opciones
- [x] A) Posee una asíntota vertical en $v = c$. <!-- weight: 1.0 -->
- [x] B) El límite cuando $v \to c^-$ es $+\infty$, lo que implica energía infinita. <!-- weight: 1.0 -->
- [ ] C) Posee una asíntota horizontal en $y = c$. <!-- weight: 0.0 -->
- [ ] D) La función es decreciente, indicando que el tiempo se detiene. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (A es la descripción geométrica, B es la interpretación física).

### Explicación Pedagógica
Al acercarse a $c$, el denominador de la función tiende a 0. Gráficamente, la curva se dispara verticalmente hacia el cielo. Como la energía es proporcional a $\gamma$, necesitarías una cantidad infinita de energía para mover un objeto un solo km/h más rápido cuando ya estás muy cerca de la luz. El límite vertical de la gráfica es la barrera física del universo.

---

## Question 14 (Análisis de Concavidad y Discontinuidad - Dificultad 6)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v14`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
¿Puede cambiar la concavidad de una función en un punto donde NO existe un punto de inflexión?

### Opciones
- [ ] A) No, por definición solo cambia en puntos de inflexión.
- [x] B) Sí, en las asíntotas verticales (donde la función es discontinua).
- [ ] C) Solo si la función es trigonométrica.
- [ ] D) No, la concavidad es constante entre raíces.

### Explicación Pedagógica
Considere $f(x) = 1/x$. A la izquierda de 0 es cóncava hacia abajo. A la derecha de 0 es cóncava hacia arriba. La concavidad cambió, pero en el punto de cambio ($x=0$) no hay punto de la función, sino una asíntota. El análisis de concavidad debe incluir tanto los ceros de $f''$ como los puntos de discontinuidad.

---

## Question 15 (Análisis de la Función Exponencial Negativa - Dificultad 5)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v15`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál es la forma general de la gráfica de $f(x) = e^{-x^2}$ (Curva de Gauss)?

### Opciones
- [ ] A) Una línea recta descendente.
- [ ] B) Una parábola invertida.
- [x] C) Una campana simétrica respecto al eje Y, con asíntota horizontal en $y=0$.
- [ ] D) Una "S" que crece desde $-\infty$.

### Explicación Pedagógica
Para $x=0$, $f(0)=1$ (pico). Como $x^2$ siempre es positivo, $e^{-positivo}$ es siempre menor que 1. Al alejarse de 0 (tanto a izquierda como derecha), el valor decae rápidamente hacia cero sin tocarlo nunca. Es la base de toda la estadística moderna.

---

## Question 16 (Técnica de Gráficas por Tramos - Dificultad 7)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v16`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
Dada $f(x) = \begin{cases} x^2 & x \le 1 \\ 2 - x & x > 1 \end{cases}$. ¿Se produce un pico o una curva suave en la unión?

### Opciones
- [ ] A) Curva suave porque es continua.
- [ ] B) Pico porque las derivadas laterales en 1 son 2 y -1 respectivamente.
- [x] C) Pico (esquina) debido a que la función es continua pero no derivable en $x=1$.
- [ ] D) Hay un salto (discontinuidad).

### Explicación Pedagógica
Es continua ($1^2 = 1$ y $2-1 = 1$). Sin embargo, la derivada por la izquierda es $2x \to 2$, y por la derecha es $-1$. Como las pendientes no "encajan" suavemente, la gráfica tiene una esquina afilada en $(1, 1)$.

---

## Question 17 (Evaluación de Rango y Asíntotas - Dificultad 5)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v17`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cómo se refleja una asíntota horizontal en la vida real de una cuenta de ahorros si la función es el saldo en el tiempo?

### Opciones
- [ ] A) La persona está gastando todo lo que gana.
- [ ] B) El dinero se acaba en un tiempo determinado.
- [x] C) El saldo tiende a estabilizarse en un valor fijo (el dinero ahorrado no crece ni disminuye significativamente).
- [ ] D) El banco ha cerrado.

### Explicación Pedagógica
La asíntota representa el "techo" o "suelo" de supervivencia. En finanzas, indica que el sistema ha llegado a un equilibrio donde las tasas de interés y los retiros se compensan mutuamente.

---

## Question 18 (Cálculo de Inflexión Trigonométrica - Dificultad 8)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v18`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre la función $f(x) = \sin(x)$ en el intervalo $[0, 2\pi]$, seleccione TODAS las afirmaciones correctas sobre su curvatura.

### Opciones
- [x] A) Es cóncava hacia abajo en $(0, \pi)$. <!-- weight: 1.0 -->
- [x] B) Es cóncava hacia arriba en $(\pi, 2\pi)$. <!-- weight: 1.0 -->
- [x] C) Tiene un punto de inflexión en $x = \pi$. <!-- weight: 1.0 -->
- [ ] D) Tiene un máximo en $x = \pi$.
- [ ] E) Nunca cambia su concavidad.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
Segunda derivada: $f''(x) = -\sin x$.
- En $(0, \pi)$, $\sin x$ es $+$, por lo tanto $-\sin x$ es $-$. Cóncava hacia abajo.
- En $(\pi, 2\pi)$, $\sin x$ es $-$, por lo tanto $-\sin x$ es $+$. Cóncava hacia arriba.
- En $x = \pi$, la segunda derivada es 0 y cambia de signo: Inflexión.

---

## Question 19 (Interpretación de Gráficas de Derivadas - Dificultad 6)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v19`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si la gráfica de la **derivada** $f'(x)$ es una línea recta que cruza el eje X en $x=2$ pasando de valores negativos a positivos, ¿qué tiene la función original $f(x)$ en ese punto?

### Opciones
- [ ] A) Una asíntota vertical.
- [ ] B) Un máximo local.
- [x] C) Un mínimo local.
- [ ] D) Un punto de inflexión.

### Explicación Pedagógica
Si $f'$ pasa de $-$ a $+$, significa que la función $f$ venía bajando y ahora empieza a subir. Ese cambio describe un "valle" o fondo de la gráfica: un mínimo local. Este es el uso de la gráfica de la derivada para entender la función original.

---

## Question 20 (Genio de Transferencia Total - Dificultad 10)

**ID:** `CO-MAT-11-graphing-functions-001-PRO-v20`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Synthesis

### Enunciado
**MASTER INTEGRATION:**

Imagine que está diseñando la sección final de una montaña rusa que debe terminar en una línea recta horizontal ($y=0$). Para que los pasajeros no sientan un sacudón brusco (un cambio infinito en la fuerza), la pista no solo debe ser continua, sino que su derivada (pendiente) y su segunda derivada (concavidad/aceleración centrípeta) deben unirse suavemente con los valores de la recta horizontal ($m=0, f''=0$).

¿Bajo qué nombre se conoce este nivel de suavidad en ingeniería y diseño de curvas?

### Options
- [x] A) Continuidad de Clase $C^2$ (Dos veces continuamente derivable). <!-- weight: 1.0 -->
- [x] B) Empalme de curvatura nula. <!-- weight: 1.0 -->
- [ ] C) Empalme simple o de primer orden. <!-- weight: 0.0 -->
- [ ] D) Asíntota de seguridad. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (A es el término matemático formal, B es la aplicación física en diseño de vías).

### Explicación Pedagógica
Diseñar una gráfica "bonita" no es solo estética; es seguridad. Si la pista es continua pero tiene un pico ($C^0$), el carro choca. Si tiene un cambio brusco de pendiente ($C^1$), hay un cambio brusco de dirección. Solo si la segunda derivada (concavidad) se une suavemente ($C^2$), el cambio de fuerzas sobre el pasajero es fluido. Este es el pináculo de la aplicación del análisis gráfico de funciones en el mundo real.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Type | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 5 | single | Analyze | Interpretación | ✅ |
| 2 | ...-v2 | 6 | single | Evaluate | Formulación | ✅ |
| 3 | ...-v3 | 7 | multi-correct | Synthesis | Argumentación | ✅ |
| 4 | ...-v4 | 6 | single | Analyze | Interpretación | ✅ |
| 5 | ...-v5 | 8 | weighted | Evaluate | Argumentación | ✅ |
| 6 | ...-v6 | 9 | single | Transfer | Argumentación | ✅ |
| 7 | ...-v7 | 7 | single | Analyze | Interpretación | ✅ |
| 8 | ...-v8 | 5 | single | Analyze | Interpretación | ✅ |
| 9 | ...-v9 | 8 | single | Apply | Formulación | ✅ |
| 10 | ...-v10| 8 | multi-correct | Synthesis | Interpretación | ✅ |
| 11 | ...-v11| 5 | single | Analyze | Interpretación | ✅ |
| 12 | ...-v12| 7 | single | Evaluate | Formulación | ✅ |
| 13 | ...-v13| 10| weighted | Transfer | Argumentación | ✅ |
| 14 | ...-v14| 6 | single | Analyze | Argumentación | ✅ |
| 15 | ...-v15| 5 | single | Analyze | Interpretación | ✅ |
| 16 | ...-v16| 7 | single | Apply | Formulación | ✅ |
| 17 | ...-v17| 5 | single | Analyze | Interpretación | ✅ |
| 18 | ...-v18| 8 | multi-correct | Synthesis | Argumentación | ✅ |
| 19 | ...-v19| 6 | single | Analyze | Interpretación | ✅ |
| 20 | ...-v20| 10| weighted | Synthesis | Argumentación | ✅ |
