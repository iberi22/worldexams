---
id: "EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle"
country: "ecuador"
grado: 11
asignatura: "matematicas"
tema: "derivada-definicion-y-reglas"
periodo: "weekly"
week: "W12"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "Bases Curriculares Ecuador + BGU"
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
bundle_index: 1
---

# MASTERY Bundle — La Derivada: Definición y Reglas Básicas (W12)

## Bloque A — Nivel D3–D4: Concepto y Definición de Derivada

---

## Question 1 [D3]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v1
**Bloom:** Remember
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.90
**Contexto:** Un estudiante de ingeniería en la Escuela Politécnica del Litoral (ESPOL) estudia la interpretación geométrica del cálculo.

### Enunciado
¿Cuál es la interpretación geométrica fundamental de la derivada de una función en un punto dado?

### Opciones
- [ ] A) El área bajo la curva en ese punto.
  <!-- feedback: Incorrecto. El área bajo la curva se asocia con la integral. -->
- [x] B) La pendiente de la recta tangente a la curva en ese punto.
  <!-- feedback: Correcto. La derivada representa la tasa de cambio instantánea, que gráficamente es la pendiente de la tangente. -->
- [ ] C) La intersección de la función con el eje de las ordenadas.
  <!-- feedback: Incorrecto. Eso es el valor de $f(0)$. -->
- [ ] D) La curvatura o concavidad de la función.
  <!-- feedback: Incorrecto. La concavidad se relaciona con la segunda derivada. -->

### Explicacion Pedagogica
La derivada es el límite de la pendiente de las rectas secantes, lo que resulta en la pendiente de la recta tangente en el punto de tangencia.

---

## Question 2 [D3]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v2
**Bloom:** Remember
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.85
**Contexto:** Definición formal de la derivada mediante límites.

### Enunciado
¿Cuál de las siguientes expresiones representa la definición formal de la derivada $f'(x)$?

### Opciones
- [ ] A) $\lim_{h \to 0} \frac{f(x+h) + f(x)}{h}$
  <!-- feedback: Incorrecto. El numerador debe ser una resta para representar el cambio. -->
- [x] B) $\lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$
  <!-- feedback: Correcto. Esta es la definición de la derivada como el límite del cociente incremental. -->
- [ ] C) $\lim_{x \to 0} \frac{f(x) - f(a)}{x - a}$
  <!-- feedback: Incorrecto. El límite debería ser cuando $x \to a$. -->
- [ ] D) $\frac{f(x) - f(a)}{x - a}$
  <!-- feedback: Incorrecto. Sin el límite, es solo la pendiente de una recta secante. -->

### Explicacion Pedagogica
La derivada se define como el límite del cociente de la diferencia (cambio en $y$ sobre cambio en $x$) cuando el incremento de $x$ tiende a cero.

---

## Question 3 [D4]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v3
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.80
**Contexto:** Aplicación de la regla de la potencia.

### Enunciado
Dada la función $f(x) = x^5$, ¿cuál es su derivada $f'(x)$?

### Opciones
- [ ] A) $5x^6$
  <!-- feedback: Incorrecto. Sumó 1 al exponente en lugar de restarlo. -->
- [x] B) $5x^4$
  <!-- feedback: Correcto. Según la regla de la potencia $\frac{d}{dx}x^n = nx^{n-1}$. -->
- [ ] C) $x^4$
  <!-- feedback: Incorrecto. Olvidó multiplicar por el exponente original. -->
- [ ] D) $4x^5$
  <!-- feedback: Incorrecto. Intercambió los valores de la base y el exponente en la regla. -->

### Explicacion Pedagogica
La regla de la potencia establece que para derivar $x^n$, se baja el exponente como coeficiente y se disminuye el grado en una unidad.

---

## Question 4 [D4]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v4
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.75
**Contexto:** Derivada de una función constante.

### Enunciado
Si $f(x) = \pi^2$, ¿cuál es el valor de $f'(x)$?

### Opciones
- [x] A) 0
  <!-- feedback: Correcto. La derivada de cualquier constante es cero, ya que no hay cambio en su valor. -->
- [ ] B) $2\pi$
  <!-- feedback: Incorrecto. Aplicó la regla de la potencia a una constante como si fuera una variable. -->
- [ ] C) $\pi$
  <!-- feedback: Incorrecto. La derivada no mantiene el valor de la base constante. -->
- [ ] D) 1
  <!-- feedback: Incorrecto. Error conceptual sobre la tasa de cambio de las constantes. -->

### Explicacion Pedagogica
Dado que una función constante representa una línea horizontal, su pendiente (derivada) es siempre cero.

---

## Bloque B — Nivel D5–D6: Reglas de Suma, Producto y Cociente

---

## Question 5 [D5]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v5
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.70
**Contexto:** Un arquitecto en Cuenca diseña un arco parabólico cuya altura sigue la función $h(x) = -2x^2 + 8x$.

### Enunciado
¿Cuál es la función que representa la pendiente de la tangente en cualquier punto del arco?

### Opciones
- [ ] A) $h'(x) = -4x^2 + 8$
  <!-- feedback: Incorrecto. Olvidó restar 1 al exponente en el primer término. -->
- [x] B) $h'(x) = -4x + 8$
  <!-- feedback: Correcto. Derivando término a término: $-2(2x^{2-1}) + 8(1x^{1-1}) = -4x + 8$. -->
- [ ] C) $h'(x) = -2x + 8$
  <!-- feedback: Incorrecto. No multiplicó el coeficiente por el exponente original. -->
- [ ] D) $h'(x) = -4x$
  <!-- feedback: Incorrecto. Omitió la derivada del término lineal $8x$. -->

### Explicacion Pedagogica
Uso de la linealidad de la derivada (regla de la suma y del múltiplo constante) para polinomios sencillos.

---

## Question 6 [D5]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v6
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.65
**Contexto:** Derivada de una función con potencias negativas.

### Enunciado
Halle la derivada de $f(x) = \frac{3}{x^2}$.

### Opciones
- [ ] A) $\frac{3}{2x}$
  <!-- feedback: Incorrecto. No se deriva el denominador directamente. -->
- [ ] B) $-\frac{3}{x^3}$
  <!-- feedback: Incorrecto. Olvidó multiplicar por el exponente -2. -->
- [x] C) $-\frac{6}{x^3}$
  <!-- feedback: Correcto. Reescrito como $3x^{-2}$, la derivada es $3(-2)x^{-3} = -6x^{-3} = -6/x^3$. -->
- [ ] D) $\frac{6}{x}$
  <!-- feedback: Incorrecto. Error de signo y de exponente. -->

### Explicacion Pedagogica
Para derivar funciones recíprocas, es conveniente expresarlas como potencias con exponentes negativos y aplicar la regla general.

---

## Question 7 [D6]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v7
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.60
**Contexto:** Aplicación de la regla del producto.

### Enunciado
Si $f(x) = (x^2 + 1)(x - 3)$, calcule $f'(x)$.

### Opciones
- [ ] A) $2x$
  <!-- feedback: Incorrecto. Solo derivó el primer factor. -->
- [x] B) $3x^2 - 6x + 1$
  <!-- feedback: Correcto. Expandiendo: $x^3 - 3x^2 + x - 3$. Derivando: $3x^2 - 6x + 1$. También se obtiene por regla del producto: $(2x)(x-3) + (x^2+1)(1)$. -->
- [ ] C) $2x^2 - 6x$
  <!-- feedback: Incorrecto. Error en la expansión o aplicación de la regla. -->
- [ ] D) $3x^2 - 6x$
  <!-- feedback: Incorrecto. Olvidó la derivada del término lineal $x$. -->

### Explicacion Pedagogica
La derivada de un producto no es el producto de las derivadas. Se debe aplicar la regla del producto: $(uv)' = u'v + uv'$.

---

## Question 8 [D6]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v8
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.60
**Contexto:** Aplicación de la regla del cociente.

### Enunciado
Halle la derivada de $y = \frac{x}{x + 1}$.

### Opciones
- [ ] A) 1
  <!-- feedback: Incorrecto. No se simplifican las derivadas del numerador y denominador. -->
- [x] B) $\frac{1}{(x + 1)^2}$
  <!-- feedback: Correcto. Aplicando la regla del cociente: $\frac{(1)(x+1) - (x)(1)}{(x+1)^2} = \frac{x+1-x}{(x+1)^2} = \frac{1}{(x+1)^2}$. -->
- [ ] C) $\frac{2x + 1}{(x + 1)^2}$
  <!-- feedback: Incorrecto. Error de signo en la fórmula del numerador. -->
- [ ] D) $\frac{1}{x^2 + 1}$
  <!-- feedback: Incorrecto. El denominador debe ser el cuadrado del original. -->

### Explicacion Pedagogica
La regla del cociente es esencial para funciones racionales: $(\frac{u}{v})' = \frac{u'v - uv'}{v^2}$.

---

## Question 9 [D6]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v9
**Bloom:** Understand
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.55
**Contexto:** Un vehículo de transporte público en Quito se desplaza con una posición dada por $s(t) = t^3 - 6t^2 + 9t$.

### Enunciado
¿En qué tiempo $t$ la velocidad del vehículo es cero?

### Opciones
- [ ] A) $t = 2$ s
  <!-- feedback: Incorrecto. Valor donde la aceleración es cero, no la velocidad. -->
- [x] B) $t = 1$ s y $t = 3$ s
  <!-- feedback: Correcto. Velocidad $v(t) = s'(t) = 3t^2 - 12t + 9$. Igualando a cero: $3(t^2 - 4t + 3) = 0 \Rightarrow 3(t-1)(t-3) = 0$. -->
- [ ] C) $t = 3$ s solamente
  <!-- feedback: Incorrecto. Omitió una de las raíces de la ecuación cuadrática. -->
- [ ] D) $t = 0$ s
  <!-- feedback: Incorrecto. En $t=0$ la velocidad es 9 m/s. -->

### Explicacion Pedagogica
La velocidad es la primera derivada de la función de posición respecto al tiempo. Los puntos donde la velocidad es cero se llaman puntos de reposo instantáneo.

---

## Question 10 [D6]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v10
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.55
**Contexto:** Derivada de funciones con raíces.

### Enunciado
¿Cuál es la derivada de $f(x) = \sqrt{x}$?

### Opciones
- [ ] A) $\frac{1}{\sqrt{x}}$
  <!-- feedback: Incorrecto. Olvidó el factor 1/2. -->
- [x] B) $\frac{1}{2\sqrt{x}}$
  <!-- feedback: Correcto. $x^{1/2}$ derivado es $\frac{1}{2}x^{-1/2} = \frac{1}{2\sqrt{x}}$. -->
- [ ] C) $2\sqrt{x}$
  <!-- feedback: Incorrecto. Multiplicó en lugar de dividir. -->
- [ ] D) $\frac{1}{2x}$
  <!-- feedback: Incorrecto. Error al manejar la potencia fraccionaria. -->

### Explicacion Pedagogica
Las raíces se tratan como potencias fraccionarias para aplicar la regla de la potencia de manera consistente.

---

## Bloque C — Nivel D7–D8: Derivadas de Orden Superior y Rectas Tangentes

---

## Question 11 [D7]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v11
**Bloom:** Analyze
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.50
**Contexto:** Encontrar la ecuación de la recta tangente a una curva en el sector financiero de Quito.

### Enunciado
Halle la ecuación de la recta tangente a $f(x) = x^2 + 3x$ en el punto donde $x = 1$.

### Opciones
- [ ] A) $y = 5x + 4$
  <!-- feedback: Incorrecto. Punto de intersección con el eje y calculado erróneamente. -->
- [x] B) $y = 5x - 1$
  <!-- feedback: Correcto. $f(1) = 4$. Pendiente $f'(x) = 2x + 3 \Rightarrow f'(1) = 5$. Recta: $y - 4 = 5(x - 1) \Rightarrow y = 5x - 1$. -->
- [ ] C) $y = 3x + 1$
  <!-- feedback: Incorrecto. Usó mal la derivada evaluada. -->
- [ ] D) $y = 5x + 1$
  <!-- feedback: Incorrecto. Error de signo al despejar la ecuación. -->

### Explicacion Pedagogica
La ecuación de la recta tangente requiere el valor de la función (punto) y el valor de la derivada (pendiente) en $x=c$.

---

## Question 12 [D7]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v12
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.50
**Contexto:** Segunda derivada y aceleración.

### Enunciado
Dada la función de posición $s(t) = 2t^3 - 5t^2 + 4$, calcule la aceleración en $t = 2$.

### Opciones
- [ ] A) 4 m/s²
  <!-- feedback: Incorrecto. Valor de la velocidad, no de la aceleración. -->
- [ ] B) 12 m/s²
  <!-- feedback: Incorrecto. Error en la evaluación de la segunda derivada. -->
- [x] C) 14 m/s²
  <!-- feedback: Correcto. $v(t) = 6t^2 - 10t$; $a(t) = 12t - 10$. En $t=2$: $12(2) - 10 = 14$. -->
- [ ] D) 24 m/s²
  <!-- feedback: Incorrecto. Olvidó restar el término constante de la aceleración. -->

### Explicacion Pedagogica
La aceleración instantánea es la segunda derivada de la posición con respecto al tiempo, o la primera derivada de la velocidad.

---

## Question 13 [D7]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v13
**Bloom:** Analyze
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.45
**Contexto:** Puntos donde la derivada no existe.

### Enunciado
¿En qué valor de $x$ la función $f(x) = |x - 4|$ no es derivable?

### Opciones
- [ ] A) $x = 0$
  <!-- feedback: Incorrecto. La función es suave en 0. -->
- [x] B) $x = 4$
  <!-- feedback: Correcto. En $x=4$ hay un "pico" o esquina donde los límites laterales de la pendiente no coinciden. -->
- [ ] C) $x = -4$
  <!-- feedback: Incorrecto. La función es suave en -4. -->
- [ ] D) Es derivable en todos los reales.
  <!-- feedback: Incorrecto. Las funciones con valor absoluto suelen tener puntos de no derivabilidad en sus raíces. -->

### Explicacion Pedagogica
La derivabilidad requiere que la curva sea suave. Los "puntos angulosos" o cúspides son lugares donde la derivada no existe a pesar de que la función sea continua.

---

## Question 14 [D8]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v14
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.45
**Contexto:** Derivada de una función con potencias fraccionarias negativas.

### Enunciado
Halle $f'(x)$ si $f(x) = \frac{1}{\sqrt[3]{x}}$.

### Opciones
- [ ] A) $-\frac{1}{3x^{2/3}}$
  <!-- feedback: Incorrecto. Error en el exponente resultante. -->
- [x] B) $-\frac{1}{3x^{4/3}}$
  <!-- feedback: Correcto. $x^{-1/3}$ derivado es $(-1/3)x^{-4/3}$. -->
- [ ] C) $\frac{1}{3}x^{2/3}$
  <!-- feedback: Incorrecto. Error de signo y de operación con el exponente. -->
- [ ] D) $-\frac{3}{x^4}$
  <!-- feedback: Incorrecto. Confundió la regla de la potencia con la de raíces. -->

### Explicacion Pedagogica
La aplicación rigurosa de la regla de la potencia $nx^{n-1}$ funciona para cualquier número real $n$, incluyendo fracciones negativas.

---

## Question 15 [D8]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v15
**Bloom:** Analyze
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.40
**Contexto:** Derivada de una función compuesta simple (preámbulo a regla de la cadena).

### Enunciado
Si $f(x) = (3x + 2)^2$, calcule $f'(1)$ expandiendo primero el binomio.

### Opciones
- [ ] A) 6
  <!-- feedback: Incorrecto. Solo derivó el interior. -->
- [ ] B) 10
  <!-- feedback: Incorrecto. Error en la evaluación. -->
- [ ] C) 25
  <!-- feedback: Incorrecto. Valor de la función, no de la derivada. -->
- [x] D) 30
  <!-- feedback: Correcto. $f(x) = 9x^2 + 12x + 4$. Derivada $f'(x) = 18x + 12$. En $x=1$: $18+12 = 30$. -->

### Explicacion Pedagogica
Verificación de resultados mediante expansión algebraica antes de introducir reglas de composición más complejas.

---

## Question 16 [D8]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v16
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.40
**Contexto:** Relación entre derivabilidad y continuidad.

### Enunciado
Si una función $f$ es derivable en $x = c$, ¿cuál de las siguientes afirmaciones es SIEMPRE verdadera?

### Opciones
- [x] A) $f$ es continua en $x = c$.
  <!-- feedback: Correcto. La derivabilidad implica continuidad. -->
- [ ] B) $f'$ es continua en $x = c$.
  <!-- feedback: Incorrecto. Una función puede ser derivable pero su derivada puede no ser continua. -->
- [ ] C) $f$ tiene un valor máximo o mínimo en $x = c$.
  <!-- feedback: Incorrecto. La derivada puede ser distinta de cero. -->
- [ ] D) $f''(c)$ existe.
  <!-- feedback: Incorrecto. La existencia de la primera derivada no garantiza la de la segunda. -->

### Explicacion Pedagogica
Teorema fundamental del cálculo diferencial: la derivabilidad es una condición más fuerte que la continuidad.

---

## Bloque D — Nivel D9–D10: Aplicaciones Críticas y Rigurosidad

---

## Question 17 [D9]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.35
**Contexto:** Una función de producción en una fábrica de Ambato está dada por $P(x) = \frac{100x^2}{x^2 + 1}$.

### Enunciado
Determine la tasa de cambio de la producción cuando se emplean $x = 1$ unidades de insumo.

### Opciones
- [ ] A) 100
  <!-- feedback: Incorrecto. No consideró la regla del cociente. -->
- [x] B) 50
  <!-- feedback: Correcto. $P'(x) = \frac{200x(x^2+1) - 100x^2(2x)}{(x^2+1)^2} = \frac{200x^3+200x-200x^3}{(x^2+1)^2} = \frac{200x}{(x^2+1)^2}$. En $x=1$: $200/4 = 50$. -->
- [ ] C) 0
  <!-- feedback: Incorrecto. La producción sigue aumentando en ese punto. -->
- [ ] D) 25
  <!-- feedback: Incorrecto. Error en la simplificación del numerador. -->

### Explicacion Pedagogica
Aplicación de la regla del cociente para determinar la productividad marginal en un modelo económico racional.

---

## Question 18 [D9]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v18
**Bloom:** Analyze
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.30
**Contexto:** Un sensor en una estación meteorológica en el Chimborazo registra la temperatura $T(t)$ tal que su derivada es $T'(t) = k(25 - T(t))$.

### Enunciado
Si en un instante dado la temperatura es de 15°C y la constante $k = 0.1$, ¿cuál es la tasa de cambio de la temperatura en ese momento?

### Opciones
- [ ] A) 0.1 °C/unidad de tiempo
  <!-- feedback: Incorrecto. No multiplicó por la diferencia de temperatura. -->
- [x] B) 1.0 °C/unidad de tiempo
  <!-- feedback: Correcto. $T' = 0.1(25 - 15) = 0.1(10) = 1.0$. -->
- [ ] C) 2.5 °C/unidad de tiempo
  <!-- feedback: Incorrecto. Usó mal los valores de la fórmula. -->
- [ ] D) -1.0 °C/unidad de tiempo
  <!-- feedback: Incorrecto. La temperatura está aumentando hacia el equilibrio. -->

### Explicacion Pedagogica
Interpretación de ecuaciones diferenciales sencillas como tasas de cambio instantáneas proporcionales a una diferencia de valores.

---

## Question 19 [D10]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v19
**Bloom:** Analyze
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.25
**Contexto:** Cálculo de la n-ésima derivada.

### Enunciado
Dada $f(x) = \frac{1}{x}$, ¿cuál es la expresión general para la $n$-ésima derivada $f^{(n)}(x)$?

### Opciones
- [ ] A) $\frac{n!}{x^{n+1}}$
  <!-- feedback: Incorrecto. Olvidó la alternancia de signos. -->
- [x] B) $\frac{(-1)^n n!}{x^{n+1}}$
  <!-- feedback: Correcto. $f' = -1/x^2$, $f'' = 2/x^3$, $f''' = -6/x^4$. El patrón es $(-1)^n n! x^{-(n+1)}$. -->
- [ ] C) $(-1)^n \frac{1}{x^n}$
  <!-- feedback: Incorrecto. Omitió el factorial en el numerador. -->
- [ ] D) $\frac{1}{x^{n+1}}$
  <!-- feedback: Incorrecto. No consideró ni los coeficientes ni los signos. -->

### Explicacion Pedagogica
Reconocimiento de patrones inductivos en derivadas sucesivas de funciones potencia con exponentes negativos.

---

## Question 20 [D10]
**ID:** EC-MAT-11-2026-W12-derivada-definicion-y-reglas-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.20
**Contexto:** Un problema de física teórica en la Politécnica Nacional sobre el movimiento de una partícula donde la posición $s(t)$ satisface $s'(t) = [s(t)]^2$.

### Enunciado
Si $s(0) = 1$, ¿cuál es el valor de la aceleración de la partícula en $t = 0$?

### Opciones
- [ ] A) 1
  <!-- feedback: Incorrecto. Ese es el valor de la velocidad instantánea. -->
- [ ] B) -1
  <!-- feedback: Incorrecto. Error de signo al aplicar la regla de la cadena. -->
- [x] C) 2
  <!-- feedback: Correcto. La aceleración es $a(t) = s''(t)$. Derivando $s'(t) = [s(t)]^2$ se obtiene $s''(t) = 2s(t) \cdot s'(t)$. En $t=0$, $s'(0) = 1^2 = 1$, por lo tanto $s''(0) = 2(1)(1) = 2$. -->
- [ ] D) 0
  <!-- feedback: Incorrecto. La aceleración es no nula ya que la velocidad depende de la posición. -->

### Explicacion Pedagogica
Uso de la regla de la cadena para derivar funciones definidas en términos de sí mismas (ecuaciones diferenciales autónomas).
