---
id: "MX-MAT-11-2026-W23-calculo-integrales-basicas-001-MASTERY"
country: "mexico"
grado: 11
asignatura: "matematicas"
tema: "calculo-integrales-basicas"
periodo: "weekly"
week: 23
year: 2026
bundle_type: "mastery"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "SEP NEM Mexico 2026 / EXANI-II pensamiento matematico"
license: "CC-BY-NC-4.0"
tier: "pro"
creador: "jules"
---

## Question 1 [D3-D4]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v1`
**Bloom:** Remember
**EXANI-II:** Pensamiento Matemático
**Contexto:** Un estudiante de la Prepa Nacional repasa el concepto de antiderivada como la operación inversa de la derivación.
**Expected_Success:** 0.90

### Enunciado
¿Cuál es el valor de la integral indefinida de una constante $k$? $\int k \, dx$.

### Opciones
- [ ] A) $k + C$ <!-- feedback: Incorrecto. Olvidó incluir la variable de integración x. -->
- [x] B) $kx + C$ <!-- feedback: Correcto. Por definición, la integral de una constante k es kx más la constante de integración C. -->
- [ ] C) 0 <!-- feedback: Incorrecto. Cero es la derivada de una constante, no su integral. -->
- [ ] D) $x + C$ <!-- feedback: Incorrecto. Solo sería correcto si la constante k fuera igual a 1. -->

### Explicacion Pedagogica
La integración es el proceso inverso a la derivación. Dado que la derivada de $kx$ es $k$, entonces la integral de $k$ debe ser $kx$. Se añade $+ C$ porque cualquier constante desaparece al derivar.

---

## Question 2 [D3-D4]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v2`
**Bloom:** Remember
**EXANI-II:** Pensamiento Matemático
**Contexto:** Se requiere calcular el área bajo una recta que pasa por el origen.
**Expected_Success:** 0.85

### Enunciado
Aplique la regla de la potencia para integrar la función $f(x) = x$. $\int x \, dx$.

### Opciones
- [ ] A) $x^2 + C$ <!-- feedback: Incorrecto. Olvidó dividir por el nuevo exponente. -->
- [x] B) $\frac{x^2}{2} + C$ <!-- feedback: Correcto. Al exponente 1 le sumamos 1 (1+1=2) y dividimos por ese mismo resultado. -->
- [ ] C) 1 <!-- feedback: Incorrecto. Esta es la derivada de x, no su integral. -->
- [ ] D) $2x + C$ <!-- feedback: Incorrecto. Aplicó la regla de derivación en lugar de la de integración. -->

### Explicacion Pedagogica
La regla de la potencia para integrales establece que $\int x^n \, dx = \frac{x^{n+1}}{n+1} + C$. Para $x^1$, obtenemos $\frac{x^{1+1}}{1+1} = \frac{x^2}{2}$.

---

## Question 3 [D3-D4]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v3`
**Bloom:** Remember
**EXANI-II:** Pensamiento Matemático
**Contexto:** Un estudiante de ingeniería en Querétaro integra una función cuadrática básica.
**Expected_Success:** 0.85

### Enunciado
Determine la integral indefinida de $f(x) = x^2$.

### Opciones
- [ ] A) $2x + C$ <!-- feedback: Incorrecto. Esta es la derivada de x^2. -->
- [ ] B) $\frac{x^2}{3} + C$ <!-- feedback: Incorrecto. Sumó 1 al exponente en el denominador pero no en la variable. -->
- [x] C) $\frac{x^3}{3} + C$ <!-- feedback: Correcto. Aplicando la regla de la potencia: (x^(2+1))/(2+1) = x^3/3. -->
- [ ] D) $3x^3 + C$ <!-- feedback: Incorrecto. Multiplicó por el nuevo exponente en lugar de dividir. -->

### Explicacion Pedagogica
Siguiendo la regla de la potencia $\int x^n \, dx = \frac{x^{n+1}}{n+1} + C$, con $n=2$, el nuevo exponente es 3 y debemos dividir toda la expresión por ese mismo número 3.

---

## Question 4 [D3-D4]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v4`
**Bloom:** Understand
**EXANI-II:** Pensamiento Matemático
**Contexto:** Un profesor en el IPN explica la propiedad de linealidad de la integral indefinida.
**Expected_Success:** 0.80

### Enunciado
¿Cuál es el resultado de $\int [f(x) + g(x)] \, dx$?

### Opciones
- [x] A) $\int f(x) \, dx + \int g(x) \, dx$ <!-- feedback: Correcto. La integral de una suma es igual a la suma de las integrales individuales. -->
- [ ] B) $\int f(x) \, dx \cdot \int g(x) \, dx$ <!-- feedback: Incorrecto. La integral de un producto NO es el producto de las integrales. -->
- [ ] C) $f'(x) + g'(x)$ <!-- feedback: Incorrecto. Estas son las derivadas, no las integrales. -->
- [ ] D) $f(x) \cdot g(x) + C$ <!-- feedback: Incorrecto. Esta no es una propiedad general de la integración. -->

### Explicacion Pedagogica
La integral es un operador lineal, lo que significa que respeta la suma y la multiplicación por escalares. Esto permite integrar polinomios término a término.

---

## Question 5 [D5-D6]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v5`
**Bloom:** Apply
**EXANI-II:** Pensamiento Matemático
**Contexto:** Se desea encontrar la función de posición de un objeto en caída libre en la Ciudad de México dada su función de velocidad.
**Expected_Success:** 0.75

### Enunciado
Calcule la integral: $\int (3x^2 - 4x + 5) \, dx$.

### Opciones
- [ ] A) $x^3 - 2x^2 + 5$ <!-- feedback: Incorrecto. Olvidó la constante de integración C. -->
- [x] B) $x^3 - 2x^2 + 5x + C$ <!-- feedback: Correcto. Integrando término a término: 3(x^3/3) - 4(x^2/2) + 5x = x^3 - 2x^2 + 5x. -->
- [ ] C) $6x - 4 + C$ <!-- feedback: Incorrecto. Esta es la derivada de la función, no su integral. -->
- [ ] D) $3x^3 - 4x^2 + 5x + C$ <!-- feedback: Incorrecto. No simplificó los coeficientes al dividir por los nuevos exponentes. -->

### Explicacion Pedagogica
Integramos cada término por separado: para $3x^2$ queda $x^3$, para $-4x$ queda $-2x^2$, y para 5 queda $5x$. Finalmente, sumamos la constante $C$.

---

## Question 6 [D5-D6]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v6`
**Bloom:** Apply
**EXANI-II:** Pensamiento Matemático
**Contexto:** Un estudiante de arquitectura calcula el volumen de una columna modelada por una función de potencia negativa.
**Expected_Success:** 0.65

### Enunciado
Determine el valor de $\int \frac{1}{x^2} \, dx$.

### Opciones
- [ ] A) $\ln(x^2) + C$ <!-- feedback: Incorrecto. Solo la función 1/x tiene como integral al logaritmo natural. -->
- [x] B) $-\frac{1}{x} + C$ <!-- feedback: Correcto. x^(-2) integrado es x^(-1)/(-1) = -1/x. -->
- [ ] C) $\frac{1}{x} + C$ <!-- feedback: Incorrecto. Olvidó el signo negativo que surge de la división por el nuevo exponente -1. -->
- [ ] D) $-\frac{2}{x^3} + C$ <!-- feedback: Incorrecto. Esta es la derivada de la función. -->

### Explicacion Pedagogica
Expresamos la función como una potencia: $1/x^2 = x^{-2}$. Aplicamos la regla $\frac{x^{n+1}}{n+1}$ con $n=-2$. Obtenemos $x^{-1}/(-1)$, que simplificado es $-1/x$.

---

## Question 7 [D5-D6]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v7`
**Bloom:** Apply
**EXANI-II:** Pensamiento Matemático
**Contexto:** Un físico en Monterrey estudia la energía potencial asociada a una fuerza que varía inversamente con la distancia.
**Expected_Success:** 0.70

### Enunciado
Calcule la integral especial: $\int \frac{1}{x} \, dx$ para $x > 0$.

### Opciones
- [ ] A) $\frac{x^0}{0} + C$ <!-- feedback: Incorrecto. La regla de la potencia no aplica cuando n = -1 porque genera una división por cero. -->
- [ ] B) $1 + C$ <!-- feedback: Incorrecto. El resultado debe ser una función logarítmica. -->
- [x] C) $\ln(x) + C$ <!-- feedback: Correcto. Por definición, la antiderivada de 1/x es el logaritmo natural de x. -->
- [ ] D) $e^x + C$ <!-- feedback: Incorrecto. La exponencial es la integral de sí misma, no de 1/x. -->

### Explicacion Pedagogica
La función $f(x) = x^{-1}$ es el único caso donde la regla de la potencia falla. Su integral está definida como el logaritmo natural del valor absoluto de $x$.

---

## Question 8 [D5-D6]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v8`
**Bloom:** Apply
**EXANI-II:** Pensamiento Matemático
**Contexto:** Se requiere encontrar la función original de un crecimiento poblacional cuya tasa es exponencial.
**Expected_Success:** 0.75

### Enunciado
Determine $\int e^x \, dx$.

### Opciones
- [ ] A) $xe^x + C$ <!-- feedback: Incorrecto. No es necesario multiplicar por x. -->
- [x] B) $e^x + C$ <!-- feedback: Correcto. La función exponencial natural es la única función (distinta de cero) que es su propia integral y derivada. -->
- [ ] C) $\frac{e^{x+1}}{x+1} + C$ <!-- feedback: Incorrecto. No se aplica la regla de la potencia a funciones con base e y variable en el exponente. -->
- [ ] D) $\ln(e^x) + C$ <!-- feedback: Incorrecto. El logaritmo es la operación inversa de la exponencial, no su integral. -->

### Explicacion Pedagogica
La función $e^x$ es única en el cálculo porque su tasa de cambio es igual a su valor actual. Por lo tanto, tanto al derivar como al integrar $e^x$, el resultado (salvo la constante $C$) sigue siendo $e^x$.

---

## Question 9 [D5-D6]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v9`
**Bloom:** Apply
**EXANI-II:** Pensamiento Matemático
**Contexto:** Un ingeniero hidráulico integra una función senoidal para determinar el flujo de agua en un ciclo periódico.
**Expected_Success:** 0.65

### Enunciado
Calcule $\int \sin(x) \, dx$.

### Opciones
- [ ] A) $\cos(x) + C$ <!-- feedback: Incorrecto. Esta es la derivada de sen(x). La integral debe llevar signo negativo. -->
- [x] B) $-\cos(x) + C$ <!-- feedback: Correcto. Dado que d/dx [cos(x)] = -sen(x), entonces la integral de sen(x) es -cos(x). -->
- [ ] C) $\sin(x) + C$ <!-- feedback: Incorrecto. La función seno no es su propia integral. -->
- [ ] D) $-\sin(x) + C$ <!-- feedback: Incorrecto. Confundió las reglas de integración trigonométrica. -->

### Explicacion Pedagogica
Para integrar funciones trigonométricas, debemos recordar qué función al ser derivada produce la función original. Como la derivada del coseno es el seno negativo, la integral del seno debe ser el coseno negativo.

---

## Question 10 [D5-D6]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v10`
**Bloom:** Apply
**EXANI-II:** Pensamiento Matemático
**Contexto:** Un estudiante de física en la UNAM calcula el trabajo realizado por una fuerza que sigue una función coseno.
**Expected_Success:** 0.65

### Enunciado
Determine la integral de $\int \cos(x) \, dx$.

### Opciones
- [x] A) $\sin(x) + C$ <!-- feedback: Correcto. La derivada de sen(x) es cos(x), por lo tanto su integral es sen(x). -->
- [ ] B) $-\sin(x) + C$ <!-- feedback: Incorrecto. Esta es la derivada de cos(x), no su integral. -->
- [ ] C) $\cos(x) + C$ <!-- feedback: Incorrecto. La función coseno no es su propia integral. -->
- [ ] D) $\tan(x) + C$ <!-- feedback: Incorrecto. La tangente es la integral de la secante cuadrada, no del coseno. -->

### Explicacion Pedagogica
Recordando las derivadas básicas: $\frac{d}{dx}\sin(x) = \cos(x)$. Al integrar el resultado ($\cos x$), volvemos a la función original ($\sin x$) más la constante de integración.

---

## Question 11 [D7-D8]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v11`
**Bloom:** Analyze
**EXANI-II:** Pensamiento Matemático
**Contexto:** Un analista de datos en Guadalajara integra una función que requiere un ajuste de constante para aplicar la regla de la cadena inversa.
**Expected_Success:** 0.55

### Enunciado
Determine el resultado de $\int e^{2x} \, dx$.

### Opciones
- [ ] A) $2e^{2x} + C$ <!-- feedback: Incorrecto. Esta es la derivada de la función. -->
- [ ] B) $e^{2x} + C$ <!-- feedback: Incorrecto. Olvidó compensar el coeficiente 2 del exponente. -->
- [x] C) $\frac{1}{2}e^{2x} + C$ <!-- feedback: Correcto. Al integrar e^(ax), el resultado es (1/a)e^(ax). -->
- [ ] D) $\frac{e^{2x+1}}{2x+1} + C$ <!-- feedback: Incorrecto. Intentó aplicar la regla de la potencia a una función exponencial. -->

### Explicacion Pedagogica
Al integrar una función compuesta de la forma $f(ax+b)$, debemos dividir por la derivada del argumento ($a$). Para $e^{2x}$, la derivada de $2x$ es 2, por lo que multiplicamos por $1/2$.

---

## Question 12 [D7-D8]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v12`
**Bloom:** Analyze
**EXANI-II:** Pensamiento Matemático
**Contexto:** Un geólogo calcula el área de una sección transversal de un terreno modelado por una raíz cuadrada.
**Expected_Success:** 0.50

### Enunciado
Calcule la integral indefinida de $f(x) = \sqrt{x}$.

### Opciones
- [ ] A) $\frac{1}{2\sqrt{x}} + C$ <!-- feedback: Incorrecto. Esta es la derivada de la raíz de x. -->
- [ ] B) $\frac{2}{3}x^{2/3} + C$ <!-- feedback: Incorrecto. Invirtió el exponente fraccionario. -->
- [x] C) $\frac{2}{3}x^{3/2} + C$ <!-- feedback: Correcto. x^(1/2) integrado es x^(3/2) / (3/2) = 2/3 * x^(3/2). -->
- [ ] D) $x^{3/2} + C$ <!-- feedback: Incorrecto. Olvidó el coeficiente resultante de dividir por el nuevo exponente. -->

### Explicacion Pedagogica
Escribimos $\sqrt{x}$ como $x^{1/2}$. Aplicamos la regla de la potencia: el nuevo exponente es $1/2 + 1 = 3/2$. Dividimos entre $3/2$, lo que equivale a multiplicar por el recíproco $2/3$.

---

## Question 13 [D7-D8]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v13`
**Bloom:** Analyze
**EXANI-II:** Pensamiento Matemático
**Contexto:** Un técnico industrial utiliza la integración para hallar la velocidad a partir de una aceleración que depende de una potencia negativa.
**Expected_Success:** 0.45

### Enunciado
Evalúe $\int \frac{3}{x^4} \, dx$.

### Opciones
- [x] A) $-\frac{1}{x^3} + C$ <!-- feedback: Correcto. 3x^(-4) integrado es 3 * [x^(-3) / -3] = -x^(-3) = -1/x^3. -->
- [ ] B) $\frac{1}{x^3} + C$ <!-- feedback: Incorrecto. Olvidó el signo negativo de la integración de potencias negativas. -->
- [ ] C) $-\frac{12}{x^5} + C$ <!-- feedback: Incorrecto. Esta es la derivada de la función. -->
- [ ] D) $\frac{3}{3x^3} + C$ <!-- feedback: Incorrecto. Error en la simplificación algebraica. -->

### Explicacion Pedagogica
Convertimos a potencia negativa: $3x^{-4}$. Integramos: $3 \cdot \frac{x^{-3}}{-3}$. El 3 se cancela con el -3 dejando un signo negativo y $x^{-3}$, que se reescribe como $-1/x^3$.

---

## Question 14 [D7-D8]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v14`
**Bloom:** Analyze
**EXANI-II:** Pensamiento Matemático
**Contexto:** Un estudiante de economía en el Estado de México integra una función de costo marginal para obtener el costo total.
**Expected_Success:** 0.50

### Enunciado
Determine la integral de $\int (2x + 1)^3 \, dx$.

### Opciones
- [ ] A) $\frac{(2x+1)^4}{4} + C$ <!-- feedback: Incorrecto. Olvidó aplicar la compensación por la derivada del término interno (2x+1). -->
- [x] B) $\frac{(2x+1)^4}{8} + C$ <!-- feedback: Correcto. Aplicando cambio de variable u=2x+1, du=2dx, entonces dx=du/2. La integral queda (1/2) * (u^4/4) = u^4/8. -->
- [ ] C) $3(2x+1)^2 + C$ <!-- feedback: Incorrecto. Esta respuesta se parece a la derivada de la función. -->
- [ ] D) $\frac{(2x+1)^4}{2} + C$ <!-- feedback: Incorrecto. Solo dividió por la derivada interna pero olvidó la división del exponente. -->

### Explicacion Pedagogica
Para funciones de la forma $(ax+b)^n$, la integral es $\frac{(ax+b)^{n+1}}{a(n+1)} + C$. Aquí $a=2$ y $n=3$, por lo que dividimos entre $2 \cdot 4 = 8$.

---

## Question 15 [D7-D8]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v15`
**Bloom:** Analyze
**EXANI-II:** Pensamiento Matemático
**Contexto:** Un ingeniero civil en Puebla calcula la deflexión de una viga usando integrales de funciones trigonométricas con argumentos compuestos.
**Expected_Success:** 0.45

### Enunciado
Calcule $\int \cos(4x) \, dx$.

### Opciones
- [ ] A) $4\sin(4x) + C$ <!-- feedback: Incorrecto. Esta es la derivada de cos(4x). -->
- [x] B) $\frac{1}{4}\sin(4x) + C$ <!-- feedback: Correcto. La integral de cos(ax) es (1/a)sen(ax). -->
- [ ] C) $-\frac{1}{4}\sin(4x) + C$ <!-- feedback: Incorrecto. La integral del coseno es el seno positivo. El signo negativo es para la integral del seno. -->
- [ ] D) $\sin(4x) + C$ <!-- feedback: Incorrecto. Olvidó compensar el coeficiente del argumento. -->

### Explicacion Pedagogica
Al integrar funciones trigonométricas con un coeficiente en el argumento, el resultado debe dividirse por dicho coeficiente para contrarrestar el efecto de la regla de la cadena que ocurriría al derivar.

---

## Question 16 [D7-D8]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v16`
**Bloom:** Analyze
**EXANI-II:** Pensamiento Matemático
**Contexto:** Se requiere resolver una integral que resulta en una función trigonométrica inversa, común en problemas de física de partículas.
**Expected_Success:** 0.40

### Enunciado
Identifique el resultado de la integral: $\int \frac{1}{1 + x^2} \, dx$.

### Opciones
- [ ] A) $\ln(1 + x^2) + C$ <!-- feedback: Incorrecto. Esta sería la integral si el numerador fuera 2x. -->
- [x] B) $\arctan(x) + C$ <!-- feedback: Correcto. La función cuya derivada es 1/(1+x^2) es la arcotangente de x. -->
- [ ] C) $\arcsin(x) + C$ <!-- feedback: Incorrecto. La integral del arcoseno proviene de una raíz cuadrada en el denominador. -->
- [ ] D) $\tan(x) + C$ <!-- feedback: Incorrecto. La integral de la tangente es -ln|cos x|, no esta función racional. -->

### Explicacion Pedagogica
Existen integrales inmediatas que corresponden a las derivadas de las funciones trigonométricas inversas. La forma $\frac{1}{1+x^2}$ es la derivada de la función arcotangente.

---

## Question 17 [D9-D10]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v17`
**Bloom:** Evaluate
**EXANI-II:** Pensamiento Matemático
**Contexto:** Un estudiante de física avanzada en el Cinvestav resuelve una integral mediante el método de sustitución (cambio de variable).
**Expected_Success:** 0.30

### Enunciado
Calcule $\int x e^{x^2} \, dx$.

### Opciones
- [ ] A) $e^{x^2} + C$ <!-- feedback: Incorrecto. Al derivar e^(x^2) obtendría 2x e^(x^2), falta el factor 1/2. -->
- [x] B) $\frac{1}{2}e^{x^2} + C$ <!-- feedback: Correcto. Sea u = x^2, entonces du = 2x dx. La integral se convierte en (1/2) \int e^u du. -->
- [ ] C) $x^2 e^{x^2} + C$ <!-- feedback: Incorrecto. No se integra el factor x de esa manera en presencia de una exponencial compuesta. -->
- [ ] D) $\frac{x^2}{2} e^{x^3/3} + C$ <!-- feedback: Incorrecto. Error conceptual grave al integrar la base y el exponente por separado. -->

### Explicacion Pedagogica
Usamos el método de sustitución. Al elegir $u = x^2$, su diferencial $du = 2x \, dx$ está presente en la integral (salvo por la constante 2). Esto nos permite simplificar la integral a una forma básica.

---

## Question 18 [D9-D10]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v18`
**Bloom:** Evaluate
**EXANI-II:** Pensamiento Matemático
**Contexto:** Un matemático aplica la integración para hallar el área entre una función logarítmica y el eje de las abscisas.
**Expected_Success:** 0.25

### Enunciado
Determine $\int \ln(x) \, dx$ mediante el método de integración por partes.

### Opciones
- [ ] A) $\frac{1}{x} + C$ <!-- feedback: Incorrecto. Esta es la derivada de ln(x). -->
- [ ] B) $x \ln(x) + C$ <!-- feedback: Incorrecto. Falta el segundo término que surge de la fórmula de integración por partes. -->
- [x] C) $x \ln(x) - x + C$ <!-- feedback: Correcto. Usando u=ln x, dv=dx. Entonces du=dx/x, v=x. Integral = uv - \int v du = x ln x - \int 1 dx = x ln x - x. -->
- [ ] D) $\frac{(\ln x)^2}{2} + C$ <!-- feedback: Incorrecto. Esta sería la integral si la función fuera (ln x) / x. -->

### Explicacion Pedagogica
La integración por partes sigue la fórmula $\int u \, dv = uv - \int v \, du$. Al aplicarla a $\ln(x)$, tratamos a $\ln(x)$ como $u$ y a $dx$ como $dv$. El proceso requiere integrar el resultado del producto $v \cdot du$, que es 1.

---

## Question 19 [D9-D10]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v19`
**Bloom:** Evaluate
**EXANI-II:** Pensamiento Matemático
**Contexto:** Un investigador utiliza la regla de sustitución para integrar una función trigonométrica elevada a una potencia.
**Expected_Success:** 0.30

### Enunciado
Calcule $\int \sin^2(x) \cos(x) \, dx$.

### Opciones
- [x] A) $\frac{\sin^3(x)}{3} + C$ <!-- feedback: Correcto. Sea u = sen(x), entonces du = cos(x) dx. La integral es \int u^2 du = u^3/3. -->
- [ ] B) $\frac{\cos^3(x)}{3} + C$ <!-- feedback: Incorrecto. La sustitución correcta es u = sen(x) porque su derivada es cos(x). -->
- [ ] C) $-\frac{\sin^3(x)}{3} + C$ <!-- feedback: Incorrecto. El signo es positivo porque la derivada del seno es el coseno positivo. -->
- [ ] D) $\sin(x) \cos(x) + C$ <!-- feedback: Incorrecto. No aplicó ninguna regla de integración válida. -->

### Explicacion Pedagogica
Este es un caso ideal para el cambio de variable. Identificamos que una parte de la función ($\cos x$) es la derivada de otra parte que está elevada a una potencia ($\sin x$). Esto reduce el problema a integrar una potencia simple.

---

## Question 20 [D9-D10]

**ID:** `MX-MAT-11-2026-W23-calculo-integrales-basicas-001-v20`
**Bloom:** Evaluate
**EXANI-II:** Pensamiento Matemático
**Contexto:** Un ingeniero de procesos en una refinería de Tabasco resuelve una integral que involucra una función racional con denominador compuesto.
**Expected_Success:** 0.20

### Enunciado
¿Cuál es el valor de $\int \frac{x}{x^2 + 1} \, dx$?

### Opciones
- [ ] A) $\arctan(x) + C$ <!-- feedback: Incorrecto. Esta sería la integral si el numerador fuera 1, no x. -->
- [x] B) $\frac{1}{2}\ln(x^2 + 1) + C$ <!-- feedback: Correcto. Sea u = x^2+1, du = 2x dx. La integral queda (1/2) \int du/u = (1/2) ln|u|. -->
- [ ] C) $\ln(x^2 + 1) + C$ <!-- feedback: Incorrecto. Olvidó el factor 1/2 necesario para completar el diferencial de x^2+1. -->
- [ ] D) $\frac{x^2}{x^2+1} + C$ <!-- feedback: Incorrecto. No se integran fracciones dividiendo los términos de esa manera. -->

### Explicacion Pedagogica
Cuando el numerador de una fracción es (casi) la derivada del denominador, el resultado es el logaritmo natural del denominador. Aquí, la derivada de $x^2+1$ es $2x$. Como tenemos $x$, multiplicamos por $1/2$ para ajustar la constante.
