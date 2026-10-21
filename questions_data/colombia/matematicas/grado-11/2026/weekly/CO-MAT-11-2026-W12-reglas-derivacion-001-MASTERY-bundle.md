---
id: "CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "reglas-derivacion"
periodo: "weekly"
week: "W12"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "DBA MEN Colombia"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# Bundle MASTERY: Reglas de Derivación - Grado 11

Veinte preguntas sobre las reglas de la potencia, suma, producto, cociente y cadena, y las derivadas de $e^x$, $\ln x$, $\sin x$ y $\cos x$, incluyendo la detección de errores al aplicarlas.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Algebraico
**Expected_Success:** 0.85
**Contexto:** En el club de cálculo de un colegio de Neiva, el primer ejercicio del día es derivar la potencia $f(x) = x^7$.

### Enunciado
¿Cuál es $f'(x)$?

### Opciones
- [ ] A) $7x^7$
  <!-- feedback: Incorrecto. Se bajó el exponente como coeficiente pero no se le restó 1. -->
- [x] B) $7x^6$
  <!-- feedback: Correcto. Regla de la potencia: $\frac{d}{dx}x^n = nx^{n - 1}$, con $n = 7$ da $7x^6$. -->
- [ ] C) $x^6$
  <!-- feedback: Incorrecto. Se restó 1 al exponente pero faltó multiplicar por el exponente original, 7. -->
- [ ] D) $\frac{x^8}{8}$
  <!-- feedback: Incorrecto. Eso es una antiderivada de $x^7$ (se sumó 1 al exponente); derivar resta 1. -->

### Explicacion Pedagogica
La regla de la potencia dice que $\frac{d}{dx}x^n = nx^{n - 1}$ para cualquier exponente real $n$. Con $n = 7$, el exponente baja como factor y el nuevo exponente es $7 - 1 = 6$: $f'(x) = 7x^6$.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v2
**Bloom:** Remember
**ICFES:** Algebraico
**Expected_Success:** 0.83
**Contexto:** En una clase de física en Tuluá, la posición horizontal de un péndulo se modela con $p(t) = \cos t$ y se necesita su derivada.

### Enunciado
¿Cuál es $\frac{d}{dt}\cos t$?

### Opciones
- [ ] A) $\sin t$
  <!-- feedback: Incorrecto. Se olvidó el signo negativo; quien tiene derivada $+\cos t$ es el seno, no al revés. -->
- [ ] B) $-\cos t$
  <!-- feedback: Incorrecto. $-\cos t$ es la segunda derivada de $\cos t$; se derivó dos veces. -->
- [ ] C) $-t\sin t$
  <!-- feedback: Incorrecto. Se multiplicó por $t$ como si fuera la derivada interna; en $\cos t$ la derivada interna es 1. -->
- [x] D) $-\sin t$
  <!-- feedback: Correcto. La derivada del coseno es menos el seno: $\frac{d}{dt}\cos t = -\sin t$. -->

### Explicacion Pedagogica
Las derivadas básicas son $\frac{d}{dt}\sin t = \cos t$ y $\frac{d}{dt}\cos t = -\sin t$. Por eso la velocidad del péndulo es $p'(t) = -\sin t$: cuando $\cos t$ decrece desde 1 (para $t$ entre 0 y $\pi$), la derivada es negativa.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Algebraico
**Expected_Success:** 0.81
**Contexto:** Un estudiante de Sogamoso modela el costo de una obra con el polinomio $f(x) = 5x^4 - 3x + 8$.

### Enunciado
¿Cuál es $f'(x)$?

### Opciones
- [ ] A) $20x^3 + 5$
  <!-- feedback: Incorrecto. Se sumó $-3 + 8$; la constante 8 no se conserva al derivar, su derivada es 0. -->
- [x] B) $20x^3 - 3$
  <!-- feedback: Correcto. Se deriva término a término: $5 \cdot 4x^3 = 20x^3$, $-3x \to -3$ y la constante 8 tiene derivada 0. -->
- [ ] C) $20x^4 - 3$
  <!-- feedback: Incorrecto. Se multiplicó por el exponente pero no se le restó 1: debe quedar $x^3$. -->
- [ ] D) $5x^3 - 3$
  <!-- feedback: Incorrecto. Se redujo el exponente, pero faltó multiplicar el coeficiente 5 por el exponente 4. -->

### Explicacion Pedagogica
La derivada de una suma es la suma de las derivadas y las constantes multiplicativas se conservan: $\frac{d}{dx}(5x^4) = 5 \cdot 4x^3 = 20x^3$, $\frac{d}{dx}(-3x) = -3$ y $\frac{d}{dx}(8) = 0$. Resultado: $f'(x) = 20x^3 - 3$.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Razonamiento
**Expected_Success:** 0.79
**Contexto:** En una tutoría en Popayán, Mariana deriva $g(x) = x^2\sin x$ y escribe $g'(x) = 2x\cos x$, multiplicando la derivada de cada factor.

### Enunciado
¿Cuál es la evaluación correcta del procedimiento de Mariana?

### Opciones
- [x] A) Es incorrecto: por la regla del producto $g'(x) = 2x\sin x + x^2\cos x$
  <!-- feedback: Correcto. $(uv)' = u'v + uv'$ con $u = x^2$ y $v = \sin x$ da $2x\sin x + x^2\cos x$. -->
- [ ] B) Es correcto: la derivada de un producto es el producto de las derivadas
  <!-- feedback: Incorrecto. Esa regla no existe; por ejemplo $(x \cdot x)' = 2x$, mientras que $1 \cdot 1 = 1$. -->
- [ ] C) Es incorrecto: debería ser $2x\sin x - x^2\cos x$
  <!-- feedback: Incorrecto. En la regla del producto los dos términos se suman; la resta aparece en el numerador de la regla del cociente. -->
- [ ] D) Es incorrecto: debería ser $2x + \cos x$
  <!-- feedback: Incorrecto. Se derivó como si fuera una suma $x^2 + \sin x$; los factores están multiplicados. -->

### Explicacion Pedagogica
La regla del producto es $(uv)' = u'v + uv'$. Con $u = x^2$ ($u' = 2x$) y $v = \sin x$ ($v' = \cos x$): $g'(x) = 2x\sin x + x^2\cos x$. Multiplicar las derivadas de los factores es un error frecuente; con $(x \cdot x)' = 2x \neq 1$ se ve que falla.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.77
**Contexto:** En un laboratorio de Bucaramanga, una medición se ajusta con $f(x) = \sqrt{x} + \frac{4}{x}$ para $x > 0$.

### Enunciado
¿Cuál es $f'(x)$?

### Opciones
- [ ] A) $\frac{1}{2\sqrt{x}} + \frac{4}{x^2}$
  <!-- feedback: Incorrecto. Se perdió el signo: al derivar $x^{-1}$ el exponente $-1$ baja como factor, dando $-4x^{-2}$. -->
- [ ] B) $\frac{1}{2\sqrt{x}} - \frac{4}{x}$
  <!-- feedback: Incorrecto. No se restó 1 al exponente de $x^{-1}$; el resultado debe tener $x^{-2}$. -->
- [x] C) $\frac{1}{2\sqrt{x}} - \frac{4}{x^2}$
  <!-- feedback: Correcto. $\sqrt{x} = x^{1/2} \to \frac{1}{2}x^{-1/2}$ y $4x^{-1} \to -4x^{-2}$. -->
- [ ] D) $2\sqrt{x} - \frac{4}{x^2}$
  <!-- feedback: Incorrecto. La derivada de $x^{1/2}$ es $\frac{1}{2}x^{-1/2}$; se multiplicó por 2 en vez de por $\frac{1}{2}$. -->

### Explicacion Pedagogica
Se reescriben los términos como potencias: $f(x) = x^{1/2} + 4x^{-1}$. Por la regla de la potencia: $\frac{1}{2}x^{-1/2} + 4(-1)x^{-2} = \frac{1}{2\sqrt{x}} - \frac{4}{x^2}$.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.75
**Contexto:** En un curso de modelación en Medellín aparece la función $f(x) = x^3e^{x}$, que describe el crecimiento de un cultivo de levaduras.

### Enunciado
¿Cuál es $f'(x)$?

### Opciones
- [ ] A) $3x^2e^{x}$
  <!-- feedback: Incorrecto. Es el producto de las derivadas de cada factor; falta el término $x^3e^x$ de la regla del producto. -->
- [ ] B) $x^3e^{x} + 3x^2$
  <!-- feedback: Incorrecto. En el término $u'v$ faltó multiplicar $3x^2$ por $e^x$. -->
- [x] C) $e^{x}(x^3 + 3x^2)$
  <!-- feedback: Correcto. Regla del producto: $3x^2e^x + x^3e^x = e^x(x^3 + 3x^2)$. -->
- [ ] D) $3x^2e^{x - 1}$
  <!-- feedback: Incorrecto. Se aplicó la regla de la potencia a $e^x$, pero $e^x$ no es una potencia de $x$: su derivada es $e^x$. -->

### Explicacion Pedagogica
Con $u = x^3$ y $v = e^x$: $u' = 3x^2$ y $v' = e^x$ (la exponencial natural es su propia derivada). Por la regla del producto, $f'(x) = 3x^2e^x + x^3e^x = e^x(x^3 + 3x^2) = x^2e^x(x + 3)$.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.73
**Contexto:** En una empresa de Villavicencio, la eficiencia de una máquina se modela con $f(x) = \frac{2x + 1}{x - 3}$ para $x \neq 3$.

### Enunciado
¿Cuál es $f'(x)$?

### Opciones
- [ ] A) $\frac{7}{(x - 3)^2}$
  <!-- feedback: Incorrecto. Se invirtió el orden del numerador ($uv' - u'v$); la regla del cociente es $\frac{u'v - uv'}{v^2}$. -->
- [ ] B) $2$
  <!-- feedback: Incorrecto. Se dividieron las derivadas $\frac{2}{1}$; la derivada de un cociente no es el cociente de las derivadas. -->
- [ ] C) $\frac{-5}{(x - 3)^2}$
  <!-- feedback: Incorrecto. No se distribuyó el signo menos sobre $2x + 1$: $-6 - 1 = -7$, no $-6 + 1$. -->
- [x] D) $\frac{-7}{(x - 3)^2}$
  <!-- feedback: Correcto. $\frac{2(x - 3) - (2x + 1)(1)}{(x - 3)^2} = \frac{2x - 6 - 2x - 1}{(x - 3)^2} = \frac{-7}{(x - 3)^2}$. -->

### Explicacion Pedagogica
Regla del cociente: $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$, con $u = 2x + 1$, $u' = 2$, $v = x - 3$, $v' = 1$. Numerador: $2(x - 3) - (2x + 1) = -7$. Entonces $f'(x) = \frac{-7}{(x - 3)^2}$, siempre negativa: la función decrece en cada intervalo de su dominio.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.71
**Contexto:** En un simulacro en Santa Marta se pide derivar $f(x) = (3x^2 - 1)^5$ sin desarrollar la potencia.

### Enunciado
¿Cuál es $f'(x)$?

### Opciones
- [ ] A) $5(3x^2 - 1)^4$
  <!-- feedback: Incorrecto. Se derivó la función externa pero se olvidó multiplicar por la derivada interna $6x$. -->
- [ ] B) $30x(3x^2 - 1)^5$
  <!-- feedback: Incorrecto. Se multiplicó por $5 \cdot 6x$ pero no se redujo el exponente de 5 a 4. -->
- [x] C) $30x(3x^2 - 1)^4$
  <!-- feedback: Correcto. Regla de la cadena: $5(3x^2 - 1)^4 \cdot 6x = 30x(3x^2 - 1)^4$. -->
- [ ] D) $5(6x)^4$
  <!-- feedback: Incorrecto. Se derivó primero la base y luego se elevó; la cadena evalúa la derivada externa en $3x^2 - 1$ y multiplica por $6x$. -->

### Explicacion Pedagogica
Con $u = 3x^2 - 1$, $f = u^5$. Regla de la cadena: $f'(x) = 5u^4 \cdot u' = 5(3x^2 - 1)^4 \cdot 6x = 30x(3x^2 - 1)^4$. Desarrollar la quinta potencia daría el mismo resultado con mucho más trabajo.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.69
**Contexto:** En un estudio de acústica en Pereira se usa $L(x) = \ln(x^2 + 4)$ y se necesita su razón de cambio.

### Enunciado
¿Cuál es $L'(x)$?

### Opciones
- [ ] A) $\frac{1}{x^2 + 4}$
  <!-- feedback: Incorrecto. Se aplicó $\frac{1}{u}$ pero faltó multiplicar por la derivada interna $2x$. -->
- [x] B) $\frac{2x}{x^2 + 4}$
  <!-- feedback: Correcto. $\frac{d}{dx}\ln u = \frac{u'}{u}$ con $u = x^2 + 4$ y $u' = 2x$. -->
- [ ] C) $\frac{1}{2x}$
  <!-- feedback: Incorrecto. Se tomó el recíproco de la derivada interna; la fórmula es $\frac{u'}{u}$, no $\frac{1}{u'}$. -->
- [ ] D) $2x\ln(x^2 + 4)$
  <!-- feedback: Incorrecto. La derivada del logaritmo no conserva el logaritmo; $\ln u$ se convierte en $\frac{1}{u}$. -->

### Explicacion Pedagogica
Por la regla de la cadena, $\frac{d}{dx}\ln(u) = \frac{1}{u} \cdot u'$. Aquí $u = x^2 + 4$ y $u' = 2x$, de modo que $L'(x) = \frac{2x}{x^2 + 4}$. Como $x^2 + 4 > 0$ siempre, el signo de $L'$ es el signo de $x$.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.67
**Contexto:** En un laboratorio de microbiología de Bogotá, una colonia tiene $N(t) = 200e^{0{,}3t}$ bacterias a las $t$ horas.

### Enunciado
¿A qué ritmo crece la colonia en $t = 10$ horas, aproximadamente?

### Opciones
- [x] A) $60e^{3} \approx 1205$ bacterias por hora
  <!-- feedback: Correcto. $N'(t) = 200 \cdot 0{,}3e^{0{,}3t} = 60e^{0{,}3t}$, y $N'(10) = 60e^{3} \approx 1205$. -->
- [ ] B) $200e^{3} \approx 4017$ bacterias por hora
  <!-- feedback: Incorrecto. $200e^{3}$ es $N(10)$, la población; la derivada multiplica además por 0,3. -->
- [ ] C) $600e^{3} \approx 12\,051$ bacterias por hora
  <!-- feedback: Incorrecto. Se multiplicó por el exponente evaluado, $0{,}3 \cdot 10 = 3$; la cadena multiplica por la constante 0,3. -->
- [ ] D) $60$ bacterias por hora
  <!-- feedback: Incorrecto. 60 es $N'(0)$; faltó evaluar $e^{0{,}3t}$ en $t = 10$. -->

### Explicacion Pedagogica
Para $e^{kt}$ la regla de la cadena da $\frac{d}{dt}e^{kt} = ke^{kt}$. Así $N'(t) = 200(0{,}3)e^{0{,}3t} = 60e^{0{,}3t}$ y $N'(10) = 60e^{3} \approx 1205$ bacterias por hora. Nótese que $N'(t) = 0{,}3N(t)$: crece en proporción a su tamaño.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.65
**Contexto:** En un examen de Ibagué se pide derivar $f(x) = \sin^2 x$, es decir $(\sin x)^2$, y algunos estudiantes la confunden con $\sin(x^2)$.

### Enunciado
¿Cuál es $f'(x)$?

### Opciones
- [ ] A) $2x\cos(x^2)$
  <!-- feedback: Incorrecto. Esa es la derivada de $\sin(x^2)$; en $\sin^2 x$ la potencia se aplica al seno, no a $x$. -->
- [ ] B) $\cos^2 x$
  <!-- feedback: Incorrecto. Se derivó el seno y se conservó el cuadrado; falta bajar el exponente 2 y usar la regla de la cadena. -->
- [x] C) $2\sin x\cos x$
  <!-- feedback: Correcto. Con $u = \sin x$: $f = u^2$ y $f' = 2u \cdot u' = 2\sin x\cos x$. -->
- [ ] D) $2\cos x$
  <!-- feedback: Incorrecto. Se bajó el 2 y se derivó el seno, pero se perdió el factor $\sin x$ que deja $u^1$. -->

### Explicacion Pedagogica
$\sin^2 x$ es una composición: la externa eleva al cuadrado y la interna es $\sin x$. Regla de la cadena: $f'(x) = 2(\sin x)^1 \cdot \cos x = 2\sin x\cos x$, que también es igual a $\sin(2x)$. En cambio, para $\sin(x^2)$ la interna es $x^2$ y se obtiene $2x\cos(x^2)$.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Geometrico
**Expected_Success:** 0.63
**Contexto:** Una diseñadora de Cali estudia el perfil $h(x) = x\ln x$ de una pieza y necesita la pendiente de la tangente en $x = e$.

### Enunciado
¿Cuál es $h'(e)$?

### Opciones
- [ ] A) $\frac{1}{e}$
  <!-- feedback: Incorrecto. Se multiplicaron las derivadas de los factores ($1 \cdot \frac{1}{x}$); hay que usar la regla del producto. -->
- [ ] B) $1$
  <!-- feedback: Incorrecto. Solo se conservó uno de los términos de la regla del producto; $\ln e + 1 = 2$. -->
- [ ] C) $e$
  <!-- feedback: Incorrecto. $e$ es $h(e) = e\ln e$, el valor de la función, no la pendiente. -->
- [x] D) $2$
  <!-- feedback: Correcto. $h'(x) = 1 \cdot \ln x + x \cdot \frac{1}{x} = \ln x + 1$; en $x = e$ vale $1 + 1 = 2$. -->

### Explicacion Pedagogica
Con $u = x$ y $v = \ln x$: $u' = 1$ y $v' = \frac{1}{x}$. Regla del producto: $h'(x) = \ln x + x \cdot \frac{1}{x} = \ln x + 1$. Evaluando, $h'(e) = \ln e + 1 = 2$.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Numerico
**Expected_Success:** 0.61
**Contexto:** En un informe de una cooperativa de Tunja se tienen dos funciones con $f(2) = 3$, $f'(2) = -1$, $g(2) = 4$ y $g'(2) = 5$.

### Enunciado
Si $P(x) = f(x)g(x)$, ¿cuánto vale $P'(2)$?

### Opciones
- [ ] A) $-5$
  <!-- feedback: Incorrecto. Es $f'(2)g'(2) = (-1)(5)$, el producto de las derivadas, que no es la regla del producto. -->
- [ ] B) $-19$
  <!-- feedback: Incorrecto. Se restaron los términos, $-4 - 15$; en la regla del producto los términos se suman. -->
- [ ] C) $12$
  <!-- feedback: Incorrecto. 12 es $P(2) = f(2)g(2) = 3 \cdot 4$, el valor del producto, no su derivada. -->
- [x] D) $11$
  <!-- feedback: Correcto. $P'(2) = f'(2)g(2) + f(2)g'(2) = (-1)(4) + (3)(5) = -4 + 15 = 11$. -->

### Explicacion Pedagogica
Por la regla del producto, $P'(x) = f'(x)g(x) + f(x)g'(x)$. En $x = 2$ se reemplazan los valores de la tabla: $(-1)(4) + (3)(5) = -4 + 15 = 11$. No se necesita la fórmula de $f$ ni de $g$, solo sus valores y derivadas en el punto.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Numerico
**Expected_Success:** 0.59
**Contexto:** En un modelo de tráfico de Medellín, $H(x) = f(g(x))$ con $g(1) = 2$, $g'(1) = 3$, $f'(2) = -4$ y $f'(1) = 7$.

### Enunciado
¿Cuánto vale $H'(1)$?

### Opciones
- [x] A) $-12$
  <!-- feedback: Correcto. Regla de la cadena: $H'(1) = f'(g(1))g'(1) = f'(2) \cdot 3 = -4 \cdot 3 = -12$. -->
- [ ] B) $21$
  <!-- feedback: Incorrecto. Se evaluó $f'$ en 1 en lugar de en $g(1) = 2$: $f'(1)g'(1) = 7 \cdot 3$. -->
- [ ] C) $-4$
  <!-- feedback: Incorrecto. Se tomó $f'(g(1)) = -4$ pero faltó multiplicar por la derivada interna $g'(1) = 3$. -->
- [ ] D) $-8$
  <!-- feedback: Incorrecto. Se multiplicó por $g(1) = 2$ en lugar de por $g'(1) = 3$. -->

### Explicacion Pedagogica
Para una composición, $H'(x) = f'(g(x)) \cdot g'(x)$. En $x = 1$: primero se calcula $g(1) = 2$, luego $f'(2) = -4$, y se multiplica por $g'(1) = 3$. Resultado: $H'(1) = -12$. El dato $f'(1) = 7$ es un distractor.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.57
**Contexto:** En una revisión de tareas en Cartagena, el profesor encuentra cuatro derivadas hechas por distintos estudiantes.

### Enunciado
¿Cuál de las derivadas está calculada correctamente?

### Opciones
- [x] A) $\frac{d}{dx}e^{3x} = 3e^{3x}$
  <!-- feedback: Correcto. Regla de la cadena: la exponencial se conserva y se multiplica por la derivada de $3x$, que es 3. -->
- [ ] B) $\frac{d}{dx}\ln(5x) = \frac{5}{x}$
  <!-- feedback: Incorrecto. $\frac{5}{5x} = \frac{1}{x}$; se olvidó dividir entre $5x$ (o usar $\ln 5 + \ln x$). -->
- [ ] C) $\frac{d}{dx}2^{x} = x \cdot 2^{x - 1}$
  <!-- feedback: Incorrecto. Se aplicó la regla de la potencia a una exponencial; lo correcto es $2^x\ln 2$. -->
- [ ] D) $\frac{d}{dx}\cos(2x) = -\sin(2x)$
  <!-- feedback: Incorrecto. Falta la derivada interna 2: el resultado es $-2\sin(2x)$. -->

### Explicacion Pedagogica
Cada caso exige identificar la regla: $e^{3x}$ es una composición, $(e^{u})' = e^{u}u' = 3e^{3x}$. $\ln(5x) = \ln 5 + \ln x$ tiene derivada $\frac{1}{x}$. $2^x$ es exponencial: $(2^x)' = 2^x\ln 2$. $\cos(2x)$ requiere cadena: $-2\sin(2x)$.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Geometrico
**Expected_Success:** 0.55
**Contexto:** En una práctica de diseño vial en Manizales, una curva se modela con $f(x) = x^2 - 3x$ y se busca la recta tangente en $x = 4$.

### Enunciado
¿Cuál es la ecuación de esa recta tangente?

### Opciones
- [ ] A) $y = 5x + 4$
  <!-- feedback: Incorrecto. Se usó $f(4) = 4$ como intercepto con el eje $y$; el punto de tangencia es $(4, 4)$, no $(0, 4)$. -->
- [x] B) $y = 5x - 16$
  <!-- feedback: Correcto. $f(4) = 4$ y $f'(4) = 2 \cdot 4 - 3 = 5$; entonces $y - 4 = 5(x - 4)$, es decir $y = 5x - 16$. -->
- [ ] C) $y = 8x - 28$
  <!-- feedback: Incorrecto. Se derivó $x^2 - 3x$ como $2x$, olvidando el $-3$; la pendiente correcta es 5. -->
- [ ] D) $y = 4x - 12$
  <!-- feedback: Incorrecto. Se usó $f(4) = 4$ como pendiente; la pendiente de la tangente es $f'(4) = 5$. -->

### Explicacion Pedagogica
La tangente en $x = a$ es $y = f(a) + f'(a)(x - a)$. Con $f(4) = 16 - 12 = 4$ y $f'(x) = 2x - 3$, $f'(4) = 5$. Entonces $y = 4 + 5(x - 4) = 5x - 16$. Comprobación: en $x = 4$ la recta da $20 - 16 = 4$.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.53
**Contexto:** Un dron de vigilancia en Barrancabermeja se mueve sobre una línea recta con posición $s(t) = t^3 - 6t^2 + 9t$ (metros, $t$ en segundos).

### Enunciado
¿Cuál afirmación sobre el instante $t = 2$ es correcta?

### Opciones
- [ ] A) Está detenido, pues la velocidad solo se anula en $t = 2$
  <!-- feedback: Incorrecto. $v(t) = 3(t - 1)(t - 3)$ se anula en $t = 1$ y $t = 3$; en $t = 2$ vale $-3$ m/s. -->
- [ ] B) Su velocidad es $2$ m/s
  <!-- feedback: Incorrecto. 2 m es la posición $s(2) = 8 - 24 + 18$; la velocidad es $s'(2) = -3$ m/s. -->
- [ ] C) Su aceleración es $-3$ m/s²
  <!-- feedback: Incorrecto. $-3$ m/s es la velocidad en $t = 2$; la aceleración es $s''(2) = 6 \cdot 2 - 12 = 0$. -->
- [x] D) Se mueve en sentido negativo y su aceleración es 0
  <!-- feedback: Correcto. $v(t) = 3t^2 - 12t + 9$ da $v(2) = -3$ m/s y $a(t) = 6t - 12$ da $a(2) = 0$. -->

### Explicacion Pedagogica
Derivando, $v(t) = s'(t) = 3t^2 - 12t + 9 = 3(t - 1)(t - 3)$ y $a(t) = v'(t) = 6t - 12$. En $t = 2$: $v(2) = -3$ m/s (sentido negativo) y $a(2) = 0$. El dron se detiene en $t = 1$ y $t = 3$, y entre esos instantes retrocede.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.51
**Contexto:** En Montería, Sebastián deriva $q(x) = \frac{x^2}{e^{x}}$ con la regla del cociente y Daniela la reescribe como $x^2e^{-x}$ y usa la regla del producto.

### Enunciado
¿Cuál evaluación es correcta?

### Opciones
- [ ] A) El método del cociente da $\frac{x^2 - 2x}{e^{x}}$
  <!-- feedback: Incorrecto. Ese resultado invierte el orden $u'v - uv'$; el numerador correcto es $2xe^x - x^2e^x$. -->
- [x] B) Ambos métodos son válidos y dan $\frac{2x - x^2}{e^{x}}$
  <!-- feedback: Correcto. Cociente: $\frac{2xe^x - x^2e^x}{e^{2x}} = \frac{2x - x^2}{e^x}$. Producto: $2xe^{-x} - x^2e^{-x}$, que es igual. -->
- [ ] C) Daniela se equivoca: la regla del producto no sirve para cocientes
  <!-- feedback: Incorrecto. Todo cociente $\frac{u}{v}$ puede escribirse como $u \cdot v^{-1}$; ambas reglas dan el mismo resultado. -->
- [ ] D) Ambos deben obtener $\frac{2x}{e^{x}}$
  <!-- feedback: Incorrecto. Ese valor es el cociente de derivadas $\frac{2x}{e^x}$; falta el término con $-x^2$. -->

### Explicacion Pedagogica
Con el cociente: $\frac{2x \cdot e^x - x^2 \cdot e^x}{(e^x)^2} = \frac{e^x(2x - x^2)}{e^{2x}} = \frac{2x - x^2}{e^x}$. Con el producto y $(e^{-x})' = -e^{-x}$: $2xe^{-x} - x^2e^{-x} = \frac{2x - x^2}{e^x}$. Dos caminos correctos llevan al mismo resultado.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.49
**Contexto:** En un preuniversitario de Pasto, Felipe escribe: $\frac{d}{dx}\sqrt{1 + \cos x} = \frac{1}{2\sqrt{1 + \cos x}}$.

### Enunciado
¿Cuál es la evaluación correcta del resultado de Felipe?

### Opciones
- [x] A) Es incorrecto: falta multiplicar por la derivada interna $-\sin x$; el resultado es $\frac{-\sin x}{2\sqrt{1 + \cos x}}$
  <!-- feedback: Correcto. Para $\sqrt{u}$ la regla es $\frac{u'}{2\sqrt{u}}$, y aquí $u' = -\sin x$. -->
- [ ] B) Es correcto, porque la derivada de $\sqrt{u}$ es $\frac{1}{2\sqrt{u}}$
  <!-- feedback: Incorrecto. Eso vale solo si $u = x$; si $u$ depende de $x$ hay que multiplicar por $u'$ (regla de la cadena). -->
- [ ] C) Es incorrecto: el resultado es $\frac{1}{2\sqrt{1 - \sin x}}$
  <!-- feedback: Incorrecto. Derivar no cambia la función interna dentro de la raíz; se multiplica por su derivada. -->
- [ ] D) Es incorrecto: el resultado es $\frac{1}{2}\sqrt{1 + \cos x} \cdot (-\sin x)$
  <!-- feedback: Incorrecto. Se multiplicó por $u'$, pero no se redujo el exponente: $u^{1/2}$ pasa a $\frac{1}{2}u^{-1/2}$. -->

### Explicacion Pedagogica
Se escribe $\sqrt{1 + \cos x} = u^{1/2}$ con $u = 1 + \cos x$. Regla de la cadena: $\frac{1}{2}u^{-1/2} \cdot u' = \frac{1}{2\sqrt{1 + \cos x}} \cdot (-\sin x) = \frac{-\sin x}{2\sqrt{1 + \cos x}}$. Felipe derivó la raíz pero olvidó la función interna.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.47
**Contexto:** En Valledupar, tres estudiantes derivan $f(x) = \ln(x^3)$ para $x > 0$. Andrés escribe $\frac{1}{x^3}$. Beatriz reescribe $3\ln x$ y obtiene $\frac{3}{x}$. Camila usa la cadena: $\frac{1}{x^3} \cdot 3x^2 = \frac{3}{x}$.

### Enunciado
¿Cuál evaluación es correcta?

### Opciones
- [ ] A) Solo Andrés tiene razón, porque $(\ln u)' = \frac{1}{u}$
  <!-- feedback: Incorrecto. Con $u = x^3$ falta el factor $u' = 3x^2$; $\frac{1}{x^3}$ no es la derivada. -->
- [ ] B) Solo Camila tiene razón: no se permite usar propiedades de logaritmos antes de derivar
  <!-- feedback: Incorrecto. Reescribir con una identidad válida para $x > 0$ no cambia la función, así que su derivada es la misma. -->
- [x] C) Beatriz y Camila tienen razón; Andrés olvidó multiplicar por la derivada interna $3x^2$
  <!-- feedback: Correcto. Ambos caminos dan $\frac{3}{x}$: la propiedad $\ln(x^3) = 3\ln x$ y la cadena son equivalentes. -->
- [ ] D) Andrés y Beatriz tienen razón, aunque den resultados distintos
  <!-- feedback: Incorrecto. Una función tiene una sola derivada; $\frac{1}{x^3} \neq \frac{3}{x}$, así que no pueden ser correctos ambos. -->

### Explicacion Pedagogica
Para $x > 0$, $\ln(x^3) = 3\ln x$, cuya derivada es $\frac{3}{x}$ (camino de Beatriz). Por la cadena, $\frac{1}{x^3} \cdot 3x^2 = \frac{3}{x}$ (camino de Camila). Andrés aplicó $\frac{1}{u}$ sin el factor $u'$, por eso su resultado es incorrecto.
