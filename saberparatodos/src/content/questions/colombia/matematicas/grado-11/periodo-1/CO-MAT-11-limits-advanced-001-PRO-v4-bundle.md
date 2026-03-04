---
id: "CO-MAT-11-limits-advanced-001-PRO"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Límites al infinito y Asíntotas"
periodo: 1
protocol_version: "4.1"
total_questions: 20
difficulty_range: "4-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["Interpretación", "Formulación", "Argumentación"]
cognitive_levels: ["Analyze", "Evaluate", "Synthesis", "Transfer"]
estado: "draft"
creador: "Antigravity (Protocol v4.1)"
generation_date: "2026-03-03"
source: "Saber 11 - Mathematics Framework"
source_license: "CC BY-SA 4.0"
---

## Contexto 1: Comportamiento a Largo Plazo
En economía y ecología, es fundamental entender el "estado estacionario" de un sistema. Si la población de una especie está modelada por $P(t) = \frac{5000t}{t + 100}$, donde $t$ es el tiempo en años, los científicos necesitan saber qué sucederá con la especie si el tiempo transcurre indefinidamente. El cálculo de límites al infinito permite predecir este comportamiento asintótico.

---

## Question 1 (Analisis - Dificultad 4)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v1`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Basado en el modelo $P(t) = \frac{5000t}{t + 100}$, ¿cuál es la población máxima teórica que la especie puede alcanzar a muy largo plazo ($\lim_{t \to \infty} P(t)$)?

### Opciones
- [ ] A) 100 individuos
- [x] B) 5,000 individuos
- [ ] C) 50,000 individuos
- [ ] D) La población crecerá infinitamente.

### Explicación Pedagógica
Para límites al infinito de funciones racionales con el mismo grado en el numerador y el denominador, el límite es el cociente de los coeficientes principales.
$\lim_{t \to \infty} \frac{5000t}{1t + 100} = \frac{5000}{1} = 5000$.
A medida que el tiempo crece, el término "+100" se vuelve insignificante comparado con $t$, y la población se estabiliza cerca de 5000.

---

## Question 2 (Evaluación - Dificultad 5)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v2`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Calcule el valor del límite: $\lim_{x \to \infty} \frac{2x^2 - 3x + 1}{5x^2 + 7}$.

### Opciones
- [ ] A) 0
- [ ] B) $\infty$
- [x] C) 2/5
- [ ] D) 1/7

### Explicación Pedagógica
Dividimos todos los términos por la mayor potencia de $x$ presente ($x^2$):
$\lim_{x \to \infty} \frac{2 - 3/x + 1/x^2}{5 + 7/x^2}$
Cuando $x \to \infty$, los términos $3/x$, $1/x^2$ y $7/x^2$ tienden a cero.
El límite es $\frac{2 - 0 + 0}{5 + 0} = 2/5$.

---

## Question 3 (Síntesis - Dificultad 7)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Analice la función $f(x) = \frac{4x - 1}{2x + 6}$. Seleccione TODAS las afirmaciones correctas sobre sus asíntotas.

### Opciones
- [x] A) La función tiene una asíntota horizontal en $y = 2$. <!-- weight: 1.0 -->
- [x] B) La función tiene una asíntota vertical en $x = -3$. <!-- weight: 1.0 -->
- [ ] C) La función tiene una asíntota oblicua.
- [x] D) El límite $\lim_{x \to -3^+} f(x)$ tiende a $-\infty$ (Evaluando un valor como -2.9). <!-- weight: 1.0 -->
- [ ] E) La gráfica cruza su asíntota horizontal en $x = 1/4$.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A) $\lim_{x \to \infty} \frac{4x}{2x} = 2$. B) El denominador es cero en $x = -3$. C) No hay oblicua porque el grado del numerador no es mayor que el del denominador. D) Evaluando cerca de -3 por la derecha: Numerador $4(-2.9)-1 = -12.6$ (negativo), Denominador $2(-2.9)+6 = 0.2$ (positivo). Negativo/Positivo = Negativo. E es falso, en $x=1/4$ la función vale 0, no 2.

---

## Question 4 (Análisis de Crecimiento - Dificultad 6)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v4`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Determine el valor de $\lim_{x \to \infty} \frac{x^3 + 5x}{x^2 - 1000}$.

### Opciones
- [ ] A) 1
- [ ] B) 0
- [x] C) $+\infty$
- [ ] D) -1

### Explicación Pedagógica
Dado que el grado del numerador (3) es mayor que el del denominador (2), la función crece sin límites a medida que $x$ aumenta. La potencia cúbica domina sobre la cuadrática, haciendo que el cociente tienda al infinito.

---

## Question 5 (Genio - Dificultad 8)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Evalúe el límite $\lim_{x \to \infty} (\sqrt{x^2 + x} - x)$.

### Opciones
- [x] A) 1/2 <!-- weight: 1.0 -->
- [x] B) 0.5 <!-- weight: 1.0 -->
- [ ] C) 0 <!-- weight: 0.0 -->
- [ ] D) $\infty$ <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Requiere racionalización correcta)

### Explicación Pedagógica
Indeterminación $\infty - \infty$. Racionalizamos:
$(\sqrt{x^2 + x} - x) \cdot \frac{\sqrt{x^2 + x} + x}{\sqrt{x^2 + x} + x} = \frac{(x^2 + x) - x^2}{\sqrt{x^2 + x} + x} = \frac{x}{\sqrt{x^2 + x} + x}$
Dividimos entre $x$:
$\frac{1}{\sqrt{\frac{x^2}{x^2} + \frac{x}{x^2}} + \frac{x}{x}} = \frac{1}{\sqrt{1 + 1/x} + 1}$
Cuando $x \to \infty$, $1/x \to 0$. El límite es $\frac{1}{\sqrt{1} + 1} = 1/2$.

---

## Contexto 2: La Función Exponencial en el Límite
El número $e$ se define como el resultado de un límite fundamental que aparece en el interés compuesto continuo y en modelos de crecimiento poblacional: $e = \lim_{n \to \infty} (1 + \frac{1}{n})^n$.

---

## Question 6 (Transferencia - Dificultad 9)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v6`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Transfer

### Enunciado
Un banco ofrece un interés compuesto de tal manera que el capital $C$ después de un año es $C = C_0 \lim_{n \to \infty} (1 + \frac{0.05}{n})^n$. ¿A qué expresión es equivalente este capital final si $C_0 = 1000$?

### Opciones
- [ ] A) $1000 \cdot (1.05)$
- [x] B) $1000 \cdot e^{0.05}$
- [ ] C) $1000 \cdot e^5$
- [ ] D) $1000 \cdot \ln(1.05)$

### Explicación Pedagógica
Usamos la generalización del límite de $e$: $\lim_{x \to \infty} (1 + \frac{k}{x})^x = e^k$.
Aquí $k = 0.05$, por lo que el límite es $e^{0.05}$. Este es el modelo de interés compuesto continuo.

---

## Question 7 (Análisis de Asíntotas Verticales - Dificultad 5)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v7`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Dada la función $f(x) = \frac{x^2 - 4}{x^2 - 5x + 6}$, ¿cuántas asíntotas verticales reales tiene?

### Opciones
- [ ] A) 2 (en $x=2$ y $x=3$)
- [x] B) 1 (solo en $x=3$)
- [ ] C) 0
- [ ] D) Infinita cantidad.

### Explicación Pedagógica
Factorizamos: $\frac{(x-2)(x+2)}{(x-2)(x-3)}$.
En $x=2$, tanto el numerador como el denominador son cero ($0/0$), lo que indica una discontinuidad evitable (un hueco), no una asíntota.
En $x=3$, solo el denominador es cero, lo que genera una asíntota vertical. Por lo tanto, solo hay 1 asíntota vertical.

---

## Question 8 (Evaluación de Funciones Trigonométricas - Dificultad 4)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v8`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Determine el valor de $\lim_{x \to \infty} \frac{\sin x}{x}$.

### Opciones
- [x] A) 0 (Por el Teorema del Sándwich o del Estricto)
- [ ] B) 1
- [ ] C) No existe porque el seno oscila.
- [ ] D) $\infty$

### Explicación Pedagógica
Sabemos que $-1 \le \sin x \le 1$.
Dividiendo todo por $x$ (con $x > 0$): $-\frac{1}{x} \le \frac{\sin x}{x} \le \frac{1}{x}$.
Como $\lim_{x \to \infty} -\frac{1}{x} = 0$ y $\lim_{x \to \infty} \frac{1}{x} = 0$, por el Teorema del Sándwich, el límite central debe ser 0. A pesar de que el numerador oscila, el denominador crece indefinidamente, "aplastando" la función hacia 0.

---

## Question 9 (Técnica de Asíntotas Oblicuas - Dificultad 7)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v9`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
Halle la ecuación de la asíntota oblicua de la función $f(x) = \frac{x^2 + x}{x - 1}$.

### Opciones
- [ ] A) $y = x$
- [x] B) $y = x + 2$
- [ ] C) $y = x - 1$
- [ ] D) No tiene.

### Explicación Pedagógica
Las asíntotas oblicuas ocurren cuando el grado del numerador es exactamente uno más que el del denominador. Realizamos la división sintética o larga:
$(x^2 + x) \div (x - 1) = x + 2$ con un residuo de 2.
La función se puede escribir como $f(x) = x + 2 + \frac{2}{x-1}$.
Cuando $x \to \infty$, el término $\frac{2}{x-1} \to 0$. La función se comporta como la recta $y = x + 2$.

---

## Question 10 (Síntesis de Comportamiento - Dificultad 8)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v10`
**Type:** `multi-correct`
**ICFES:** Interpretación y Representación
**Bloom:** Synthesis

### Enunciado
Considere la función $g(x) = \frac{\sqrt{4x^2 + 1}}{x - 2}$. Seleccione TODAS las afirmaciones correctas sobre sus límites al infinito.

### Opciones
- [x] A) $\lim_{x \to +\infty} g(x) = 2$. <!-- weight: 1.0 -->
- [x] B) $\lim_{x \to -\infty} g(x) = -2$. <!-- weight: 1.0 -->
- [ ] C) Tiene una única asíntota horizontal en $y = 2$.
- [x] D) Tiene dos asíntotas horizontales diferentes. <!-- weight: 1.0 -->
- [ ] E) No tiene asíntota vertical.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
Al dividir por $x$: $\frac{\frac{\sqrt{4x^2 + 1}}{x}}{\frac{x - 2}{x}}$.
Para $x > 0$, $x = \sqrt{x^2}$, por lo que queda $\sqrt{4 + 1/x^2} \to 2$.
Para $x < 0$, $x = -\sqrt{x^2}$, por lo que queda $-\sqrt{4 + 1/x^2} \to -2$.
Esto demuestra que algunas funciones (especialmente con raíces) pueden tener dos asíntotas horizontales diferentes (A, B y D). Tiene vertical en $x=2$.

---

## Question 11 (Análisis de Rango Infinito - Dificultad 5)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v11`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si $\lim_{x \to \infty} f(x) = L$, ¿qué se puede afirmar sobre el rango de la función?

### Opciones
- [ ] A) El rango es siempre el intervalo $(-\infty, L]$.
- [ ] B) El valor $L$ nunca pertenece al rango.
- [x] C) La función se acerca a $L$ pero no necesariamente lo alcanza (aunque puede cruzar la asíntota en otros puntos).
- [ ] D) El rango es necesariamente finito.

### Explicación Pedagógica
Una asíntota horizontal describe la tendencia al infinito. Muchos estudiantes creen erróneamente que la función no puede cruzar su asíntota; sin embargo, esto solo es cierto para algunas funciones simples (como $1/x$). La respuesta C captura la esencia de la tendencia asintótica.

---

## Question 12 (Evaluación Crítica de Modelos - Dificultad 6)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v12`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Un modelo de enfriamiento dice que la temperatura $T$ de un café es $T(t) = 20 + 70e^{-0.1t}$. ¿Cuál es la temperatura ambiente según este modelo?

### Opciones
- [ ] A) 70°C
- [x] B) 20°C (Es el valor de $\lim_{t \to \infty} T(t)$)
- [ ] C) 90°C
- [ ] D) 0°C

### Explicación Pedagógica
A medida que pasa el tiempo ($t \to \infty$), el café se enfriará hasta alcanzar la temperatura del entorno.
$\lim_{t \to \infty} (20 + 70e^{-0.1t}) = 20 + 70(0) = 20$.
El café nunca bajará de 20 grados, que es la asíntota horizontal del modelo.

---

## Question 13 (Genio Teórico - Dificultad 10)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Evaluate

### Enunciado
En matemáticas avanzadas, el "crecimiento relativo" compara qué función crece más rápido hacia el infinito. Si ordenamos las siguientes funciones según su velocidad de crecimiento (de menor a mayor), ¿cuál es el orden correcto?

### Opciones
- [x] A) $\ln(x) \ll x^n \ll e^x \ll x! \ll x^x$ <!-- weight: 1.0 -->
- [x] B) Logarítmica, Polinómica, Exponencial. <!-- weight: 0.5 -->
- [ ] C) Exponencial, Polinómica, Logarítmica. <!-- weight: 0.0 -->
- [ ] D) Todas crecen a la misma velocidad porque todas llegan al infinito. <!-- weight: 0.0 -->

### Scoring
- Respuesta A: 1.0 punto. (Jerarquía completa de crecimiento)
- Respuesta B: 0.5 puntos. (Jerarquía básica correcta)

### Explicación Pedagógica
Aunque todas tienden a infinito, la tasa a la que lo hacen varía drásticamente. $\lim_{x \to \infty} \frac{x^n}{e^x} = 0$, lo que significa que la exponencial "gana" a cualquier potencia polinómica. A su vez, el factorial $x!$ gana a la exponencial $e^x$, y $x^x$ es el crecimiento más rápido de todos. Este concepto es vital en ciencias de la computación (Complejidad Algorítmica).

---

## Question 14 (Análisis de Logaritmos - Dificultad 5)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v14`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál es el valor de $\lim_{x \to 0^+} \ln(x)$?

### Opciones
- [ ] A) 0
- [ ] B) 1
- [ ] C) $+\infty$
- [x] D) $-\infty$

### Explicación Pedagógica
La función logaritmo natural tiene una asíntota vertical en el eje Y ($x=0$). A medida que nos acercamos a 0 desde la derecha, los valores de $\ln(x)$ se vuelven negativos y crecen en magnitud sin límites. Gráficamente, la curva desciende verticalmente hacia abajo.

---

## Question 15 (Indeterminación Especial - Dificultad 8)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v15`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Synthesis

### Enunciado
Evalúe $\lim_{x \to \infty} (\frac{x+5}{x+2})^x$.

### Opciones
- [ ] A) 1
- [ ] B) $e$
- [x] C) $e^3$
- [ ] D) $\infty$

### Explicación Pedagógica
Reescribimos la fracción: $\frac{x+5}{x+2} = \frac{x+2+3}{x+2} = 1 + \frac{3}{x+2}$.
El límite se convierte en $\lim_{x \to \infty} (1 + \frac{3}{x+2})^x$.
Esto tiene la forma $\lim (1 + k/u)^u = e^k$.
Aunque el exponente es $x$ y no $x+2$, el comportamiento al infinito es el mismo (el desfase de 2 no afecta). El resultado es $e^3$.

---

## Question 16 (Análisis de Radicales en el Infinito - Dificultad 7)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v16`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
¿Cuál es el valor de $\lim_{x \to \infty} \frac{x}{\sqrt{x^2 + 1} + x}$?

### Opciones
- [ ] A) 1
- [x] B) 1/2
- [ ] C) 0
- [ ] D) $\infty$

### Explicación Pedagógica
Dividimos numerador y denominador por $x$:
$\frac{1}{\frac{\sqrt{x^2 + 1}}{x} + 1} = \frac{1}{\sqrt{\frac{x^2}{x^2} + \frac{1}{x^2}} + 1} = \frac{1}{\sqrt{1 + 1/x^2} + 1}$.
Cuando $x \to \infty$, $1/x^2 \to 0$. El límite es $\frac{1}{\sqrt{1} + 1} = 1/2$.

---

## Question 17 (Evaluación de Paridad y Asíntotas - Dificultad 4)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v17`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si una función par $f(x)$ tiene una asíntota horizontal en $y=3$ cuando $x \to \infty$, ¿qué se puede decir del límite cuando $x \to -\infty$?

### Opciones
- [ ] A) No se puede saber.
- [ ] B) Es $y = -3$.
- [x] C) También es $y = 3$.
- [ ] D) Es $y = 0$.

### Explicación Pedagógica
Una función par es simétrica respecto al eje Y, lo que significa que $f(x) = f(-x)$. Si la gráfica se estabiliza en 3 por la derecha, debe estabilizarse en el mismo valor 3 por la izquierda debido a la simetría de espejo.

---

## Question 18 (Cálculo de Límites Trigonométricos - Dificultad 9)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v18`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre el comportamiento de $f(x) = x \sin(1/x)$ cuando $x \to \infty$, seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) El límite es 1. <!-- weight: 1.0 -->
- [x] B) Se puede resolver mediante el cambio de variable $u = 1/x$. <!-- weight: 1.0 -->
- [x] C) Es equivalente al límite notable $\lim_{u \to 0} \frac{\sin u}{u}$. <!-- weight: 1.0 -->
- [ ] D) El límite es 0 porque $1/x \to 0$ y $\sin(0) = 0$.
- [ ] E) Resulta en $+\infty$.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
Sea $u = 1/x$. Si $x \to \infty$, entonces $u \to 0^+$.
La expresión se convierte en $\frac{1}{u} \sin u = \frac{\sin u}{u}$.
Sabemos que este límite es 1. Las opciones A, B y C describen este proceso correctamente. D es un error común al multiplicar $0 \cdot \infty$ sin analizar la velocidad.

---

## Question 19 (Interpretación de Costos - Dificultad 5)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v19`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
El costo promedio de producir cada unidad está dado por $C_p(x) = \frac{1000 + 5x}{x}$. ¿Cuál es el costo mínimo al que se puede aproximar la empresa si produce una cantidad masiva de unidades?

### Opciones
- [ ] A) 1000
- [ ] B) 0
- [x] C) 5
- [ ] D) No tiene límite.

### Explicación Pedagógica
Dividimos: $C_p(x) = \frac{1000}{x} + 5$.
Cuando $x \to \infty$ (producción masiva), el costo fijo unitario $\frac{1000}{x}$ tiende a 0.
El costo promedio se estabiliza en 5, que representa el costo variable por unidad.

---

## Question 20 (Transferencia a Probabilidad - Dificultad 10)

**ID:** `CO-MAT-11-limits-advanced-001-PRO-v20`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Transfer

### Enunciado
En estadística, la distribución normal no toca el eje X, pero se acerca infinitamente. Si la función de densidad está dada por $f(x) = \frac{1}{\sigma \sqrt{2\pi}} e^{-\frac{1}{2}(\frac{x-\mu}{\sigma})^2}$, ¿cuál es el límite de la probabilidad $\lim_{x \to \infty} f(x)$?

### Opciones
- [x] A) 0: Lo cual significa que eventos extremadamente lejanos al promedio tienen probabilidad casi nula. <!-- weight: 1.0 -->
- [x] B) 1: Porque el área total debe ser 1. <!-- weight: 0.0 -->
- [ ] C) $\mu$: Porque el límite tiende al promedio. <!-- weight: 0.0 -->
- [ ] D) $\infty$: Porque la campana crece. <!-- weight: 0.0 -->

### Scoring
- Respuesta A: 1.0 punto. (A es el valor del límite de la función de densidad)
- Respuesta B: 0.0 punto. (Confunde el valor puntual con la integral total)

### Explicación Pedagógica
A medida que $x \to \infty$, el término exponencial tiene un exponente que tiende a $-\infty$ ($e^{-\infty}$). Sabemos que este límite es 0. Matemáticamente, esto significa que la campana de Gauss tiene una asíntota horizontal en $y=0$. Físicamente, esto implica que encontrarse a 100 desviaciones estándar del promedio es posible pero infinitamente improbable.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Type | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 4 | single | Analyze | Interpretación | ✅ |
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
| 12 | ...-v12| 6 | single | Evaluate | Argumentación | ✅ |
| 13 | ...-v13| 10| weighted | Evaluate | Argumentación | ✅ |
| 14 | ...-v14| 5 | single | Analyze | Interpretación | ✅ |
| 15 | ...-v15| 8 | single | Synthesis | Formulación | ✅ |
| 16 | ...-v16| 7 | single | Analyze | Formulación | ✅ |
| 17 | ...-v17| 4 | single | Analyze | Interpretación | ✅ |
| 18 | ...-v18| 9 | multi-correct | Synthesis | Argumentación | ✅ |
| 19 | ...-v19| 5 | single | Analyze | Formulación | ✅ |
| 20 | ...-v20| 10| weighted | Transfer | Argumentación | ✅ |
