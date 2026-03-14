---
id: "CO-MAT-11-differential-integration-001-PRO"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Integración de Conceptos Diferenciales (Problemas Maestros)"
periodo: 2
protocol_version: "4.1"
total_questions: 20
difficulty_range: "6-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["Interpretación", "Formulación", "Argumentación"]
cognitive_levels: ["Analyze", "Evaluate", "Synthesis", "Transfer"]
estado: "draft"
creador: "Antigravity (Protocol v4.1)"
generation_date: "2026-03-03"
source: "Saber 11 - Mathematics Framework"
source_license: "CC BY-SA 4.0"
---

## Contexto 1: La Dinámica de los Sistemas Complejos
El cálculo no es solo un conjunto de reglas, es un lenguaje para describir el cambio. Al integrar conceptos como límites, continuidad y derivabilidad, podemos modelar sistemas donde múltiples variables interactúan simultáneamente. Por ejemplo, en la ingeniería aeroespacial, el diseño de un cohete requiere que su trayectoria no solo sea continua (sin saltos en el espacio) y derivable (sin cambios bruscos de velocidad), sino que optimice el consumo de combustible bajo restricciones de fricción atmosférica y gravedad variable. Este bundle integra todos los conocimientos del Periodo 2 en problemas de alta complejidad.

---

## Question 1 (Analisis/Sintesis - Dificultad 7)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v1`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Dada la función $f(x)$ que es continua en $[a, b]$ y derivable en $(a, b)$, si sabemos que $f(a) = f(b) = 0$, ¿qué teorema nos asegura la existencia de un punto $c$ tal que el objeto se detenga momentáneamente o cambie de dirección ($f'(c) = 0$)?

### Opciones
- [ ] A) Teorema de Pitágoras.
- [ ] B) Teorema del Valor Intermedio.
- [x] C) Teorema de Rolle (Caso especial del Teorema del Valor Medio).
- [ ] D) Regla de L'Hôpital.

### Explicación Pedagógica
El Teorema de Rolle dice: si una función "sale" de un punto y "regresa" a la misma altura, obligatoriamente debió dar la vuelta en algún lugar. En ese punto de vuelta, la tangente es horizontal ($m=0$). Es la base para demostrar que entre dos raíces de una función siempre hay al menos un máximo o un mínimo local.

---

## Question 2 (Evaluación - Dificultad 8)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v2`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Calcule el valor de $c$ que satisface el Teorema del Valor Medio para $f(x) = x^2$ en el intervalo $[0, 2]$.

### Opciones
- [ ] A) $c = 0.5$
- [x] B) $c = 1$ (Pendiente promedio: $\frac{4-0}{2-0} = 2$. Derivada $2c = 2 \rightarrow c = 1$)
- [ ] C) $c = 1.5$
- [ ] D) $c = \sqrt{2}$

### Explicación Pedagógica
1. Pendiente de la secante (promedio): $\frac{f(2) - f(0)}{2 - 0} = \frac{4 - 0}{2} = 2$.
2. Derivada de la función: $f'(x) = 2x$.
3. Buscamos $c$ tal que $f'(c) = 2 \rightarrow 2c = 2 \rightarrow c = 1$.
Esto significa que en $x=1$, la pendiente de la curva es exactamente igual a la pendiente promedio de todo el viaje.

---

## Question 3 (Sintesis de Optimización - Dificultad 9)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Interpretación y Representación
**Bloom:** Synthesis

### Enunciado
Considere una función de costo $C(x) = x^2 + 5x + 100$. Seleccione TODAS las afirmaciones correctas sobre el "Costo Promedio Mínimo".

### Opciones
- [x] A) El costo promedio es $\bar{C}(x) = x + 5 + 100/x$. <!-- weight: 1.0 -->
- [x] B) El mínimo del costo promedio ocurre cuando el costo marginal es igual al costo promedio. <!-- weight: 1.0 -->
- [ ] C) El costo promedio mínimo ocurre en $x = 5$.
- [x] D) El costo promedio mínimo ocurre en $x = 10$ ($x^2 = 100$). <!-- weight: 1.0 -->
- [ ] E) No tiene mínimo porque el costo marginal siempre sube.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A) Dividimos el costo total por $x$. D) Derivamos $\bar{C}(x)$ e igualamos a 0: $1 - 100/x^2 = 0 \rightarrow x^2 = 100 \rightarrow x = 10$. B) Es una propiedad económica fundamental: si la siguiente unidad cuesta menos que el promedio, el promedio baja; si cuesta más, sube. Por tanto, el mínimo está justo donde se cruzan.

---

## Question 4 (Análisis de Concavidad y Raíces - Dificultad 7)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v4`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál es el número máximo de puntos de inflexión que puede tener un polinomio de grado $n=4$?

### Opciones
- [ ] A) 4
- [ ] B) 3
- [x] C) 2 (La segunda derivada es un polinomio de grado 2)
- [ ] D) 1

### Explicación Pedagógica
Si $f(x)$ es de grado 4, $f'(x)$ es de grado 3 y $f''(x)$ es de grado 2. Un polinomio de grado 2 puede tener como máximo 2 raíces reales (puntos donde la concavidad puede cambiar). Geométricamente, una curva de grado 4 puede tener forma de "W" o "M", cambiando de curvatura dos veces.

---

## Question 5 (Genio de Aproximación - Dificultad 8)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Use diferenciales ($dy \approx f'(x)dx$) para aproximar el valor de $\sqrt{26}$ usando el valor conocido $\sqrt{25} = 5$.

### Opciones
- [x] A) $5.1$ <!-- weight: 1.0 -->
- [x] B) $5 + 1/10$ <!-- weight: 1.0 -->
- [ ] C) $5.2$ <!-- weight: 0.0 -->
- [ ] D) $5.05$ <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Uso correcto de la linealización).

### Explicación Pedagógica
Sea $f(x) = \sqrt{x}$. Entonces $f'(x) = \frac{1}{2\sqrt{x}}$.
Para $x=25$ y $dx=1$:
$dy = f'(25) \cdot 1 = \frac{1}{2(5)} \cdot 1 = 1/10 = 0.1$.
Valor aproximado: $f(25) + dy = 5 + 0.1 = 5.1$.
(El valor real es 5.099, ¡una precisión asombrosa para un cálculo mental!).

---

## Reading Text 2: Los Newtonianos vs. Los Leibnizianos
La historia del cálculo está marcada por la "Guerra de Prioridad". Mientras Newton veía el cálculo como una herramienta para el movimiento (sus "flucciones"), calculando la velocidad del universo, Leibniz buscaba un lenguaje universal (su "característica") para la lógica. Leibniz introdujo el símbolo integral $\int$ (una S alargada para "summa") y el diferencial $dx$.

Aunque Newton publicó después, su enfoque en la física permitió avances inmediatos en la balística y la astronomía. Sin embargo, la notación de Leibniz fue la que triunfó en el continente europeo por su flexibilidad para tratar con funciones de varias variables y ecuaciones diferenciales. Hoy, un estudiante de grado 11 es el heredero de ambas mentes, usando la geometría de Newton para visualizar la tangente y el álgebra de Leibniz para operar con las reglas que hoy llamamos "automáticas".

---

## Question 6 (Análisis Conceptual - Dificultad 6)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v6`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál fue el principal aporte de Leibniz según el texto en contraste con Newton?

### Opciones
- [ ] A) El descubrimiento de la gravedad.
- [x] B) La creación de una notación simbólica superior ($\int y\ dx$) que facilitó el desarrollo del cálculo como lenguaje.
- [ ] C) La invención de la calculadora mecánica.
- [ ] D) La prioridad absoluta en la publicación de los resultados.

### Explicación Pedagógica
El texto destaca que la notación de Leibniz "triunfó" por su flexibilidad. Una buena notación no es solo cosmética; permite pensar en problemas complejos de forma más estructurada (como la regla de la cadena $dy/dx = dy/du \cdot du/dx$).

---

## Question 7 (Evaluación de Funciones Monótonas - Dificultad 7)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v7`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Si para toda $x$ se cumple que $f'(x) = \frac{e^x}{1 + x^2}$, ¿qué se puede afirmar sobre el número de raíces de $f(x)$?

### Opciones
- [ ] A) Tiene infinitas raíces por ser exponencial.
- [x] B) Puede tener como máximo una raíz (porque la función es estrictamente creciente).
- [ ] C) Tiene al menos dos raíces.
- [ ] D) No tiene raíces.

### Explicación Pedagógica
Como $e^x > 0$ y $1+x^2 > 0$ para toda $x$ real, la derivada $f'(x)$ es siempre positiva. Esto significa que la función es estrictamente creciente (siempre sube). Una función que siempre sube solo puede cruzar el eje X una vez.

---

## Question 8 (Transferencia a la Física Cuántica - Dificultad 10)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v8`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Transfer

### Enunciado
En mecánica cuántica, la "incertidumbre" en la posición de una partícula se relaciona con el ancho de su función de onda. Si intentamos medir el momento lineal derivando la función, encontramos que funciones muy "puntiagudas" (continuas pero con gran derivada en un punto) tienen un momento muy alto.

¿Qué propiedad de la derivada causa que la "energía" de un sistema sea infinita si la función tiene un salto brusco?

### Opciones
- [x] A) La falta de derivabilidad en el punto de discontinuidad, lo que hace que la tasa de cambio tienda al infinito. <!-- weight: 1.0 -->
- [b] B) El hecho de que la integral del cuadrado de la derivada diverge. <!-- weight: 0.8 -->
- [ ] C) Que la función sea siempre positiva. <!-- weight: 0.0 -->
- [ ] D) Que la función sea par. <!-- weight: 0.0 -->

### Scoring
- Respuesta A: 1.0 punto. (Conexión directa entre "salto" y "derivada infinita").
- Respuesta B: 0.8 puntos. (Referencia técnica a la energía cinética en mecánica cuántica).

### Explicación Pedagógica
La energía cinética en física cuántica es proporcional al cuadrado de la derivada. Una función con un salto tiene una pendiente infinita. Elevar infinito al cuadrado y tratar de operarlo resulta en una energía físicamente imposible. Por eso, en el universo real, todas las transiciones deben ser suaves y derivables.

---

## Question 9 (Técnica de Optimización con Restricciones - Dificultad 9)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v9`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Synthesis

### Enunciado
Halle el punto en la recta $y = 2x + 1$ que se encuentra más cerca del origen $(0, 0)$. (Hint: Minimice el cuadrado de la distancia $D^2 = x^2 + y^2$).

### Opciones
- [ ] A) $(0, 1)$
- [x] B) $(-2/5, 1/5)$
- [ ] C) $(1, 3)$
- [ ] D) $(-1/2, 0)$

### Explicación Pedagógica
$D^2 = x^2 + (2x + 1)^2 = x^2 + 4x^2 + 4x + 1 = 5x^2 + 4x + 1$.
Derivamos respecto a $x$: $(D^2)' = 10x + 4$.
Igualamos a cero: $10x = -4 \rightarrow x = -2/5$.
Sustituyendo en la recta $y = 2(-2/5) + 1 = -4/5 + 5/5 = 1/5$.
El punto óptimo es $(-0.4, 0.2)$.

---

## Question 10 (Síntesis de Conceptos de Periodo 2 - Dificultad 8)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v10`
**Type:** `multi-correct`
**ICFES:** Interpretación y Representación
**Bloom:** Synthesis

### Enunciado
Considere una función $f(x)$ que es derivable en todo su dominio. Seleccione TODAS las afirmaciones que son SIEMPRE verdaderas.

### Opciones
- [x] A) $f(x)$ debe ser continua. <!-- weight: 1.0 -->
- [x] B) El límite $\lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$ existe para todo $x$. <!-- weight: 1.0 -->
- [ ] C) La función debe tener al menos un máximo o mínimo.
- [x] D) La gráfica no puede tener "picos" o esquinas. <!-- weight: 1.0 -->
- [ ] E) La segunda derivada debe existir.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B, D) Son las definiciones y consecuencias básicas de la derivabilidad. C es falso (una recta $y=x$ no tiene extremos). E es falso (existen funciones con primera derivada suave pero cuya segunda derivada tiene saltos o no existe, como una carretera compuesta de arcos de círculo y rectas).

---

## Question 11 (Análisis de Razón de Cambio de Volumen - Dificultad 7)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v11`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
El radio de un círculo aumenta a razón de $3$ cm/s. ¿A qué ritmo está aumentando el área cuando el radio es de $10$ cm? (Use $A = \pi r^2$).

### Opciones
- [ ] A) $30\pi$
- [x] B) $60\pi$ cm²/s (Derivada temporal $\frac{dA}{dt} = 2\pi r \frac{dr}{dt}$)
- [ ] C) $100\pi$
- [ ] D) 30

### Explicación Pedagógica
$\frac{dA}{dt} = \frac{d}{dt} (\pi r^2) = 2\pi r \frac{dr}{dt}$.
Con $r=10$ y $\frac{dr}{dt}=3$:
$\frac{dA}{dt} = 2\pi(10)(3) = 60\pi$.

---

## Question 12 (Evaluación de Estabilidad - Dificultad 6)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v12`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
En ingeniería, un sistema está en "Equilibrio Estable" si se encuentra en un mínimo de la función de energía potencial. Si la energía es $E(x) = x^3 - 3x$, ¿en qué punto el sistema es estable?

### Opciones
- [ ] A) $x = 0$ (Punto de inflexión)
- [ ] B) $x = -1$ (Máximo local)
- [x] C) $x = 1$ (Mínimo local)
- [ ] D) En ningún punto.

### Explicación Pedagógica
$E'(x) = 3x^2 - 3 \rightarrow$ Críticos en $\pm 1$.
$E''(x) = 6x$.
- En $x = -1$, $E'' < 0 \rightarrow$ Máximo (Inestable: como una pelota en la cima).
- En $x = 1$, $E'' > 0 \rightarrow$ Mínimo (Estable: como una pelota en el fondo del tazón).

---

## Question 13 (Genio Interdisciplinar - Dificultad 10)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Synthesis

### Enunciado
**Economía Avanzada:** Un monopolio enfrenta una curva de demanda $p = 100 - q$ y un costo $C = 20q + 10$. Si el gobierno impone un impuesto $t$ por cada unidad vendida, el costo se vuelve $C = (20+t)q + 10$.

¿Cómo cambia el precio óptimo que el monopolista cobra al consumidor por cada dólar que sube el impuesto? (Derive el precio respecto a $t$).

### Opciones
- [x] A) El precio sube $\$0.5$ por cada $\$1$ de impuesto (El monopolista traslada la mitad del impuesto). <!-- weight: 1.0 -->
- [ ] B) El precio sube $\$1$ por cada $\$1$ de impuesto. <!-- weight: 0.0 -->
- [ ] C) El precio no cambia porque el costo fijo se mantiene. <!-- weight: 0.0 -->
- [ ] D) El precio baja para atraer clientes. <!-- weight: 0.0 -->

### Scoring
- Respuesta A: 1.0 punto. (Aplicación de optimización paramétrica).

### Explicación Pedagógica
Beneficio: $\pi = q(100-q) - (20+t)q - 10 = 100q - q^2 - 20q - tq - 10$.
Derivamos respecto a $q$: $100 - 2q - 20 - t = 0 \rightarrow 80 - t = 2q \rightarrow q = 40 - t/2$.
Precio: $p = 100 - q = 100 - (40 - t/2) = 60 + t/2$.
La derivada del precio respecto al impuesto $t$ es $dp/dt = 1/2$. Esto demuestra que el poder del monopolio no es total; debe "absorber" la mitad del impuesto para maximizar su propia ganancia.

---

## Question 14 (Análisis de Integral y Derivada - Dificultad 6)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v14`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si definimos una función como el área acumulada $F(x) = \int_0^x (t^2 + 1) dt$. Según el Teorema Fundamental del Cálculo, ¿cuál es la derivada $F'(x)$?

### Opciones
- [ ] A) $\frac{x^3}{3} + x$
- [x] B) $x^2 + 1$
- [ ] C) $2x$
- [ ] D) 0

### Explicación Pedagógica
La derivada de la integral es la función original. Imagina que la integral es una cubeta llenándose: la "velocidad" a la que sube el nivel (derivada) es exactamente el flujo de agua que entra en ese instante ($f(x)$). Esta es la conexión suprema entre el Periodo 2 (derivadas) y el Periodo 3 (integrales).

---

## Question 15 (Indeterminación de Cero por Infinito - Dificultad 8)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v15`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Halle $\lim_{x \to 0^+} x^x$. (Hint: Use $x^x = e^{x \ln x}$ y L'Hôpital).

### Opciones
- [ ] A) 0
- [x] B) 1
- [ ] C) $e$
- [ ] D) No existe.

### Explicación Pedagógica
Límite de la potencia: $\lim x \ln x$. Es $0 \cdot (-\infty)$.
Reescribimos: $\frac{\ln x}{1/x}$. Ahora es $-\infty / \infty$.
L'Hôpital: $\frac{1/x}{-1/x^2} = -x$.
$\lim_{x \to 0} -x = 0$.
Por lo tanto, $\lim e^{x \ln x} = e^0 = 1$.
Cualquier número (excepto 0) elevado a 0 es 1; el cálculo demuestra que incluso $0^0$ "tiende" a ser 1.

---

## Question 16 (Análisis de Productividad de Suelo - Dificultad 7)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v16`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Dada la gráfica de una función de producción, si el punto crítico es un máximo, ¿qué indica el valor de la segunda derivada en ese punto sobre la sensibilidad del sistema?

### Opciones
- [ ] A) Nada, solo que es un máximo.
- [x] B) Cuanto más negativa sea la segunda derivada, más "puntiagudo" es el pico, lo que significa que alejarse del óptimo causa una caída drástica en la producción.
- [ ] C) Indica que el sistema es infinito.
- [ ] D) Indica que la ganancia es cero.

### Explicación Pedagógica
La segunda derivada mide la "curvatura". Un valor muy grande (en magnitud) de $f''$ indica mucha sensibilidad. En diseño industrial, preferimos picos "chatos" ($f''$ cerca de cero), donde errores pequeños en la operación no arruinan el resultado final catastróficamente.

---

## Question 17 (Evaluación de Límites en el Infinito de Fracciones Trigonométricas - Dificultad 4)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v17`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál es la asíntota horizontal de $f(x) = \frac{\arctan(x)}{x}$?

### Opciones
- [ ] A) $y = \pi/2$
- [ ] B) $y = 1$
- [x] C) $y = 0$ (Numerador finito, denominador infinito)
- [ ] D) No tiene.

### Explicación Pedagógica
$\arctan(x)$ está acotado entre $-\pi/2$ y $\pi/2$. Al dividir por $x$ que tiende a infinito, el resultado obligatoriamente tiende a 0. No se requiere L'Hôpital porque no es de la forma $\infty/\infty$.

---

## Question 18 (Cálculo de Inflexión y Optimización Conjunta - Dificultad 9)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v18`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre la función $f(x) = x^4 - 4x^3$, seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) Tiene un mínimo absoluto en $x=3$. <!-- weight: 1.0 -->
- [x] B) Tiene puntos de inflexión en $x=0$ y $x=2$. <!-- weight: 1.0 -->
- [ ] C) El punto $x=0$ es un máximo local. (Es un punto de silla con pendiente cero).
- [x] D) Es cóncava hacia abajo solo en el intervalo $(0, 2)$. <!-- weight: 1.0 -->
- [ ] E) No tiene raíces reales.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
$f'(x) = 4x^3 - 12x^2 = 4x^2(x - 3) \rightarrow$ Críticos 0 y 3.
$f''(x) = 12x^2 - 24x = 12x(x - 2) \rightarrow$ Inflexión 0 y 2.
En $x=3$: $f'' > 0 \rightarrow$ Mínimo. En $x=0$: $f'$ es cero pero $f''$ cambia signo (Silla). Concavidad negativa entre 0 y 2.

---

## Question 19 (Interpretación de Energía y Fuerzas - Dificultad 5)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v19`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si la fuerza es la derivada negativa del potencial ($F = -V'(x)$), y tenemos un potencial en forma de valle $V(x) = x^2$. ¿Hacia dónde apunta la fuerza en $x=1$?

### Opciones
- [ ] A) Hacia afuera (derecha).
- [x] B) Hacia el centro (izquierda, $F = -2x = -2$).
- [ ] C) Hacia arriba.
- [ ] D) Es cero.

### Explicación Pedagógica
La derivada nos da la dirección de subida. Como el potencial sube a la derecha, la fuerza (negativo de la derivada) "empuja" hacia abajo, de regreso al centro. Esto explica por qué los sistemas físicos siempre buscan el mínimo de energía (el "fondo del tazón").

---

## Question 20 (Genio de Transferencia Total - Dificultad 10)

**ID:** `CO-MAT-11-differential-integration-001-PRO-v20`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Evaluate

### Enunciado
**MASTER INTEGRATION:**

Una función $f(x)$ es de clase $C^\infty$ (tiene infinitas derivadas continuas) y se sabe que $f(0)=0$ y todas sus derivadas en el origen son cero ($f'(0)=0, f''(0)=0, \dots$). Un ejemplo es $f(x) = e^{-1/x^2}$ para $x \neq 0$ y $f(0)=0$.

¿Qué nos dice esto sobre la capacidad de los polinomios (como las Series de Taylor) para representar ciertas funciones reales?

### Options
- [x] A) Que existen funciones tan "planas" cerca del origen que ningún polinomio puede capturar su crecimiento, ya que el polinomio de Taylor sería simplemente 0. <!-- weight: 1.0 -->
- [x] B) Que la propiedad de ser derivable no garantiza que la función sea "analítica" (representable por su serie). <!-- weight: 1.0 -->
- [ ] C) Que todas las funciones son polinomios disfrazados. <!-- weight: 0.0 -->
- [ ] D) Que la derivada en 0 no sirve para nada. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Identifica el límite del cálculo diferencial clásico frente a funciones no analíticas).

### Explicación Pedagógica
Incluso con toda la información de las derivadas en un punto (velocidad, aceleración, tirón...), no siempre podemos predecir el futuro de la función si es una de estas funciones "patológicas". El cálculo diferencial tiene límites, y hay información que solo la visión global de la función puede dar. Es una lección de humildad matemática frente a la complejidad de la realidad.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Type | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 7 | single | Synthesis | Argumentación | ✅ |
| 2 | ...-v2 | 8 | single | Evaluate | Formulación | ✅ |
| 3 | ...-v3 | 9 | multi-correct | Synthesis | Interpretación | ✅ |
| 4 | ...-v4 | 7 | single | Analyze | Interpretación | ✅ |
| 5 | ...-v5 | 8 | weighted | Evaluate | Argumentación | ✅ |
| 6 | ...-v6 | 6 | single | Analyze | Interpretación | ✅ |
| 7 | ...-v7 | 7 | single | Evaluate | Formulación | ✅ |
| 8 | ...-v8 | 10| weighted | Transfer | Argumentación | ✅ |
| 9 | ...-v9 | 9 | single | Synthesis | Formulación | ✅ |
| 10 | ...-v10| 8 | multi-correct | Synthesis | Interpretación | ✅ |
| 11 | ...-v11| 7 | single | Analyze | Formulación | ✅ |
| 12 | ...-v12| 6 | single | Evaluate | Argumentación | ✅ |
| 13 | ...-v13| 10| weighted | Synthesis | Argumentación | ✅ |
| 14 | ...-v14| 6 | single | Analyze | Interpretación | ✅ |
| 15 | ...-v15| 8 | single | Evaluate | Formulación | ✅ |
| 16 | ...-v16| 7 | single | Analyze | Interpretación | ✅ |
| 17 | ...-v17| 4 | single | Analyze | Interpretación | ✅ |
| 18 | ...-v18| 9 | multi-correct | Synthesis | Argumentación | ✅ |
| 19 | ...-v19| 5 | single | Analyze | Interpretación | ✅ |
| 20 | ...-v20| 10| weighted | Evaluate | Argumentación | ✅ |
