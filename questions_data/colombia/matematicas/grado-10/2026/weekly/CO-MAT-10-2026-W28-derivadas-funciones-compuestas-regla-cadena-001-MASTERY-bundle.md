---
id: "CO-MAT-10-2026-W28-derivadas-funciones-compuestas-regla-cadena-001-MASTERY-bundle"
country: "colombia"
grado: 10
asignatura: "matematicas"
tema: "derivadas-funciones-compuestas-regla-cadena"
periodo: "weekly"
week: "W28"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 12
bundle_size: 12
alignment: "DBA MEN Colombia / Saber 11"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# Bundle MASTERY: Derivadas de Funciones Compuestas y Regla de la Cadena - Grado 10

Este bundle contiene 12 preguntas sobre **derivadas de funciones compuestas y la regla de la cadena** para grado 10, alineadas con los DBA del MEN Colombia y el marco de evaluación Saber 11.

## Question 1 [D3-D4]
**ID:** CO-MAT-10-2026-W28-derivadas-funciones-compuestas-regla-cadena-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Variacional
**Expected_Success:** 0.90
**Contexto:** En Bogotá, en una clase de cálculo, la profesora introduce la regla de la cadena.
### Enunciado
Si $h(x) = f(g(x))$, ¿cuál es la expresión correcta de $h'(x)$ según la regla de la cadena?
### Opciones
- [ ] A) $f'(x) \cdot g'(x)$
  <!-- feedback: Incorrecto. La derivada de la composición no es el producto de las derivadas evaluadas en $x$. -->
- [x] B) $f'(g(x)) \cdot g'(x)$
  <!-- feedback: Correcto. La regla de la cadena establece que la derivada de la composición es la derivada externa evaluada en la interna, multiplicada por la derivada de la interna. -->
- [ ] C) $f(g'(x))$
  <!-- feedback: Incorrecto. Falta multiplicar por la derivada de la función externa $f'$. -->
- [ ] D) $f'(x) + g'(x)$
  <!-- feedback: Incorrecto. La composición no se deriva como una suma. -->

### Explicacion Pedagogica
La regla de la cadena establece que si $h(x) = f(g(x))$ y ambas funciones son derivables, entonces $h'(x) = f'(g(x)) \cdot g'(x)$. Es decir, se multiplica la derivada de la función externa evaluada en la función interna por la derivada de la interna.

## Question 2 [D3-D4]
**ID:** CO-MAT-10-2026-W28-derivadas-funciones-compuestas-regla-cadena-001-MASTERY-bundle-v2
**Bloom:** Remember
**ICFES:** Variacional
**Expected_Success:** 0.88
**Contexto:** En Medellín, una estudiante analiza la composición $h(x) = (3x+5)^4$.
### Enunciado
Para $h(x) = (3x+5)^4$, ¿cuál es la identificación correcta de la función interna $g(x)$ y la externa $f(u)$?
### Opciones
- [x] A) $g(x) = 3x+5$ y $f(u) = u^4$
  <!-- feedback: Correcto. La interna es el argumento $3x+5$ y la externa eleva a la cuarta potencia. -->
- [ ] B) $g(x) = x^4$ y $f(u) = 3x+5$
  <!-- feedback: Incorrecto. Invertiste las funciones interna y externa. -->
- [ ] C) $g(x) = 3x$ y $f(u) = (x+5)^4$
  <!-- feedback: Incorrecto. La interna debe ser toda la expresión $3x+5$, no solo $3x$. -->
- [ ] D) $g(x) = 4$ y $f(u) = 3x+5$
  <!-- feedback: Incorrecto. El exponente $4$ pertenece a la función externa, no a la interna. -->

### Explicacion Pedagogica
Para escribir $h(x) = (3x+5)^4$ como $h(x) = f(g(x))$, se toma $g(x) = 3x+5$ como la función interna y $f(u) = u^4$ como la externa. Identificar correctamente ambas funciones es el primer paso para aplicar la regla de la cadena.

## Question 3 [D3-D4]
**ID:** CO-MAT-10-2026-W28-derivadas-funciones-compuestas-regla-cadena-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.86
**Contexto:** En Cali, un profesor explica cuándo es indispensable aplicar la regla de la cadena.
### Enunciado
¿Para cuál de las siguientes funciones es estrictamente necesaria la regla de la cadena para calcular su derivada?
### Opciones
- [ ] A) $f(x) = x^3$
  <!-- feedback: Incorrecto. Es una potencia simple y basta con la regla de la potencia. -->
- [ ] B) $f(x) = 5x + 2$
  <!-- feedback: Incorrecto. Es un polinomio de grado 1 y se deriva término a término. -->
- [ ] C) $f(x) = \sin(x)$
  <!-- feedback: Incorrecto. La derivada de $\sin(x)$ es $\cos(x)$ sin composición. -->
- [x] D) $f(x) = (x^2+1)^5$
  <!-- feedback: Correcto. Es una composición de $u^5$ con $u = x^2+1$, así que se requiere la regla de la cadena. -->

### Explicacion Pedagogica
La regla de la cadena se aplica cuando una función es composición de otras dos o más funciones. En $f(x) = (x^2+1)^5$, la función interna $g(x) = x^2+1$ está compuesta con la externa $u^5$; derivar sin la regla de la cadena perdería la derivada de la interna.

## Question 4 [D5-D6]
**ID:** CO-MAT-10-2026-W28-derivadas-funciones-compuestas-regla-cadena-001-MASTERY-bundle-v4
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.82
**Contexto:** En Barranquilla, una estudiante debe derivar $h(x) = (2x+1)^5$.
### Enunciado
¿Cuál es la derivada de $h(x) = (2x+1)^5$?
### Opciones
- [ ] A) $5(2x+1)^4$
  <!-- feedback: Incorrecto. Olvidaste multiplicar por la derivada del argumento $2x+1$, que vale $2$. -->
- [ ] B) $10(2x+1)^5$
  <!-- feedback: Incorrecto. El exponente no cambia al derivar. -->
- [x] C) $10(2x+1)^4$
  <!-- feedback: Correcto. Por regla de la cadena: $5(2x+1)^4 \cdot 2 = 10(2x+1)^4$. -->
- [ ] D) $5(2x+1)^3$
  <!-- feedback: Incorrecto. Al aplicar la regla de la potencia, el exponente se multiplica por $4$ y se resta $1$. -->

### Explicacion Pedagogica
Con $g(x) = 2x+1$ y $f(u) = u^5$, se tiene $h'(x) = f'(g(x)) \cdot g'(x) = 5(2x+1)^4 \cdot 2 = 10(2x+1)^4$.

## Question 5 [D5-D6]
**ID:** CO-MAT-10-2026-W28-derivadas-funciones-compuestas-regla-cadena-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.80
**Contexto:** En Bucaramanga, una estudiante calcula la derivada de $f(x) = \sin(3x^2)$.
### Enunciado
¿Cuál es la derivada de $f(x) = \sin(3x^2)$?
### Opciones
- [x] A) $6x \cos(3x^2)$
  <!-- feedback: Correcto. Por regla de la cadena: $\cos(3x^2) \cdot 6x = 6x\cos(3x^2)$. -->
- [ ] B) $\cos(3x^2)$
  <!-- feedback: Incorrecto. Falta multiplicar por la derivada del argumento $3x^2$, que es $6x$. -->
- [ ] C) $3\cos(3x^2)$
  <!-- feedback: Incorrecto. La derivada de $3x^2$ es $6x$, no $3$. -->
- [ ] D) $-6x \sin(3x^2)$
  <!-- feedback: Incorrecto. La derivada de $\sin(u)$ es $\cos(u)$, no $-\sin(u)$. -->

### Explicacion Pedagogica
Con $g(x) = 3x^2$ y $f(u) = \sin(u)$, se obtiene $f'(x) = \cos(3x^2) \cdot (6x) = 6x \cos(3x^2)$.

## Question 6 [D5-D6]
**ID:** CO-MAT-10-2026-W28-derivadas-funciones-compuestas-regla-cadena-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.78
**Contexto:** En Pereira, se estudia la derivada de la función exponencial compuesta $g(x) = e^{5x}$.
### Enunciado
¿Cuál es la derivada de $g(x) = e^{5x}$?
### Opciones
- [ ] A) $e^{5x}$
  <!-- feedback: Incorrecto. Falta multiplicar por la derivada del exponente $5x$. -->
- [x] B) $5e^{5x}$
  <!-- feedback: Correcto. Por regla de la cadena: $e^{5x} \cdot 5 = 5e^{5x}$. -->
- [ ] C) $e^{5}$
  <!-- feedback: Incorrecto. La derivada de una exponencial con variable en el exponente no es constante. -->
- [ ] D) $5x e^{5x}$
  <!-- feedback: Incorrecto. La derivada del exponente es $5$, no $5x$. -->

### Explicacion Pedagogica
Para $g(x) = e^{u}$ con $u = 5x$, se tiene $g'(x) = e^{5x} \cdot 5 = 5e^{5x}$. La regla general es $\frac{d}{dx}e^{u} = e^{u} \cdot u'$.

## Question 7 [D7-D8]
**ID:** CO-MAT-10-2026-W28-derivadas-funciones-compuestas-regla-cadena-001-MASTERY-bundle-v7
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.74
**Contexto:** En Cartagena, se conocen los valores $f(1) = 3$, $f'(1) = 5$, $g(2) = 1$ y $g'(2) = -2$.
### Enunciado
Si $h(x) = f(g(x))$, ¿cuál es el valor de $h'(2)$?
### Opciones
- [x] A) $-10$
  <!-- feedback: Correcto. $h'(2) = f'(g(2)) \cdot g'(2) = f'(1) \cdot (-2) = 5 \cdot (-2) = -10$. -->
- [ ] B) $10$
  <!-- feedback: Incorrecto. No tuviste en cuenta que $g'(2) = -2$, no $+2$. -->
- [ ] C) $3$
  <!-- feedback: Incorrecto. Ese es el valor de $f(1)$, no de $h'(2)$. -->
- [ ] D) $-2$
  <!-- feedback: Incorrecto. Ese es solo el factor $g'(2)$, falta multiplicar por $f'(g(2))$. -->

### Explicacion Pedagogica
Por la regla de la cadena, $h'(x) = f'(g(x)) \cdot g'(x)$. Evaluando en $x = 2$: $h'(2) = f'(g(2)) \cdot g'(2) = f'(1) \cdot (-2) = 5 \cdot (-2) = -10$.

## Question 8 [D7-D8]
**ID:** CO-MAT-10-2026-W28-derivadas-funciones-compuestas-regla-cadena-001-MASTERY-bundle-v8
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.72
**Contexto:** En Santa Marta, una estudiante debe derivar $f(x) = \ln(2x^3+1)$.
### Enunciado
¿Cuál es la derivada de $f(x) = \ln(2x^3+1)$?
### Opciones
- [ ] A) $\dfrac{1}{2x^3+1}$
  <!-- feedback: Incorrecto. Falta multiplicar por la derivada del argumento $2x^3+1$, que vale $6x^2$. -->
- [ ] B) $\dfrac{1}{3x^2+2}$
  <!-- feedback: Incorrecto. Ese denominador no corresponde al argumento de la función. -->
- [ ] C) $\dfrac{2x^3}{2x^3+1}$
  <!-- feedback: Incorrecto. Es la derivada del argumento dividida por el argumento, pero te faltó el factor $3$. -->
- [x] D) $\dfrac{6x^2}{2x^3+1}$
  <!-- feedback: Correcto. Por regla de la cadena: $\frac{1}{2x^3+1} \cdot 6x^2 = \frac{6x^2}{2x^3+1}$. -->

### Explicacion Pedagogica
Para $f(x) = \ln(u)$ con $u = 2x^3+1$, se cumple $f'(x) = \frac{1}{u} \cdot u' = \frac{6x^2}{2x^3+1}$.

## Question 9 [D7-D8]
**ID:** CO-MAT-10-2026-W28-derivadas-funciones-compuestas-regla-cadena-001-MASTERY-bundle-v9
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.70
**Contexto:** En Manizales, se calcula la derivada del producto $f(x) = x^2 (x+1)^3$ usando regla del producto y de la cadena.
### Enunciado
¿Cuál es la derivada de $f(x) = x^2 (x+1)^3$?
### Opciones
- [ ] A) $2x (x+1)^3$
  <!-- feedback: Incorrecto. Solo aplicaste la derivada al primer factor y olvidaste el segundo. -->
- [ ] B) $3x^2 (x+1)^2$
  <!-- feedback: Incorrecto. Solo derivaste el segundo factor; falta el primer sumando de la regla del producto. -->
- [x] C) $2x (x+1)^3 + 3x^2 (x+1)^2$
  <!-- feedback: Correcto. Por regla del producto y de la cadena: $f'(x) = 2x(x+1)^3 + x^2 \cdot 3(x+1)^2 = 2x(x+1)^3 + 3x^2(x+1)^2$. -->
- [ ] D) $5x^2 (x+1)^2$
  <!-- feedback: Incorrecto. Sumaste los coeficientes en lugar de mantener los dos sumandos de la regla del producto. -->

### Explicacion Pedagogica
Aplicando la regla del producto a $u(x) = x^2$ y $v(x) = (x+1)^3$, se obtiene $f'(x) = u'v + uv'$. Como $v'(x) = 3(x+1)^2 \cdot 1$, el resultado es $2x(x+1)^3 + 3x^2(x+1)^2$.

## Question 10 [D9-D10]
**ID:** CO-MAT-10-2026-W28-derivadas-funciones-compuestas-regla-cadena-001-MASTERY-bundle-v10
**Bloom:** Evaluate
**ICFES:** Variacional
**Expected_Success:** 0.65
**Contexto:** En Armenia, se calcula la derivada de la composición $f(x) = \sin(\cos(2x))$, que aplica la regla de la cadena dos veces seguidas.
### Enunciado
¿Cuál es la derivada de $f(x) = \sin(\cos(2x))$?
### Opciones
- [ ] A) $\cos(\cos(2x))$
  <!-- feedback: Incorrecto. Solo aplicaste la derivada del seno externo, sin la derivada del argumento $\cos(2x)$. -->
- [x] B) $-2\sin(2x) \cos(\cos(2x))$
  <!-- feedback: Correcto. La derivada de $\cos(2x)$ es $-2\sin(2x)$, y por la regla de la cadena se multiplica por $\cos(\cos(2x))$. -->
- [ ] C) $2\cos(2x) \sin(\cos(2x))$
  <!-- feedback: Incorrecto. La derivada de $\cos(2x)$ es $-2\sin(2x)$, con signo negativo. -->
- [ ] D) $-\sin(2x) \cos(\cos(2x))$
  <!-- feedback: Incorrecto. Te faltó el factor $2$ que viene de derivar $2x$. -->

### Explicacion Pedagogica
Sea $u = \cos(2x)$ y $f(x) = \sin(u)$. Entonces $f'(x) = \cos(u) \cdot u'$. Como $u' = -2\sin(2x)$, se obtiene $f'(x) = -2\sin(2x) \cos(\cos(2x))$.

## Question 11 [D9-D10]
**ID:** CO-MAT-10-2026-W28-derivadas-funciones-compuestas-regla-cadena-001-MASTERY-bundle-v11
**Bloom:** Evaluate
**ICFES:** Variacional
**Expected_Success:** 0.62
**Contexto:** En Bogotá, la posición en metros de un auto en $t$ segundos está dada por $p(t) = (t^2+1)^3$.
### Enunciado
¿Cuál es la velocidad del auto cuando $t = 1$ segundo?
### Opciones
- [x] A) $24$ m/s
  <!-- feedback: Correcto. $p'(t) = 3(t^2+1)^2 \cdot 2t = 6t(t^2+1)^2$; en $t=1$: $6 \cdot 1 \cdot 4 = 24$ m/s. -->
- [ ] B) $16$ m/s
  <!-- feedback: Incorrecto. Probablemente sustituyiste mal el valor de $t$ en la derivada. -->
- [ ] C) $4$ m/s
  <!-- feedback: Incorrecto. Ese es $(t^2+1)^2$ en $t=1$, falta multiplicar por $6t$. -->
- [ ] D) $12$ m/s
  <!-- feedback: Incorrecto. Usaste $6t$ pero olvidaste elevar al cuadrado el argumento. -->

### Explicacion Pedagogica
La velocidad instantánea es $v(t) = p'(t)$. Por regla de la cadena, $p'(t) = 3(t^2+1)^2 \cdot 2t = 6t(t^2+1)^2$. Evaluando en $t = 1$: $v(1) = 6 \cdot 1 \cdot (1+1)^2 = 6 \cdot 4 = 24$ m/s.

## Question 12 [D9-D10]
**ID:** CO-MAT-10-2026-W28-derivadas-funciones-compuestas-regla-cadena-001-MASTERY-bundle-v12
**Bloom:** Evaluate
**ICFES:** Variacional
**Expected_Success:** 0.58
**Contexto:** En Medellín, una estudiante calcula la derivada de $f(x) = \dfrac{x^2}{(2x+1)^3}$ usando regla del cociente y de la cadena.
### Enunciado
¿Cuál es la derivada de $f(x) = \dfrac{x^2}{(2x+1)^3}$?
### Opciones
- [ ] A) $\dfrac{2x}{(2x+1)^3}$
  <!-- feedback: Incorrecto. Solo consideraste la derivada del numerador y olvidaste el denominador. -->
- [ ] B) $\dfrac{2x(2x+1)^3 - x^2 \cdot 6(2x+1)^2}{(2x+1)^6}$
  <!-- feedback: Incorrecto. La regla del cociente no requiere multiplicar los factores en una sola fracción de sexto grado. -->
- [x] C) $\dfrac{2x(2x+1) - 6x^2}{(2x+1)^4}$
  <!-- feedback: Correcto. Por regla del cociente y de la cadena: $f'(x) = \frac{2x(2x+1)^3 - x^2 \cdot 3(2x+1)^2 \cdot 2}{(2x+1)^6} = \frac{2x(2x+1) - 6x^2}{(2x+1)^4}$. -->
- [ ] D) $\dfrac{2x}{(2x+1)^4}$
  <!-- feedback: Incorrecto. No aplicaste correctamente la regla del cociente al numerador. -->

### Explicacion Pedagogica
Con $u = x^2$ y $v = (2x+1)^3$, la regla del cociente da $f'(x) = \frac{u'v - uv'}{v^2}$. Como $u' = 2x$ y $v' = 3(2x+1)^2 \cdot 2 = 6(2x+1)^2$, simplificando $(2x+1)^2$ en numerador y denominador se obtiene $\frac{2x(2x+1) - 6x^2}{(2x+1)^4}$.
