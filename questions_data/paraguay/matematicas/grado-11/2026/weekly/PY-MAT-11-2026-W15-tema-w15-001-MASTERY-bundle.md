---
id: "PY-MAT-11-2026-W15-tema-w15-001-MASTERY-bundle"
country: "paraguay"
grado: 11
asignatura: "matematicas"
tema: "tema-w15"
periodo: "weekly"
week: "W15"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "MEC - Curriculo Nacional Base / SNEPE"
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
bundle_index: 1
calibration: {difficulty_band: "D3-D10", expected_success: 0.65}
---
# Weekly Pack W15: Cálculo Diferencial (Grado 11)

Este bundle evalúa conceptos fundamentales de Límites y Derivadas elementales alineados al currículo oficial del MEC de Paraguay.

---

## Question 1 [D3-D4]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v1
**Bloom:** Remember
**EJE:** Cálculo y análisis
**Expected_Success:** 0.85
**Contexto:** En Asunción, los estudiantes evalúan el comportamiento de una función lineal cerca de un punto dado.

### Enunciado
¿Cuál es el valor del límite $\lim_{x \to 2} (3x + 4)$?

### Opciones
- [x] A) $10$ <!-- feedback: ¡Correcto! Por sustitución directa: $\lim_{x \to 2} (3x + 4) = 3(2) + 4 = 6 + 4 = 10$. -->
- [ ] B) $7$ <!-- feedback: Incorrecto. Evaluó $3 + 4 = 7$ ignorando la multiplicación por $x=2$. -->
- [ ] C) $6$ <!-- feedback: Incorrecto. Solo multiplicó $3 \cdot 2 = 6$ olvidando sumar 4. -->
- [ ] D) $12$ <!-- feedback: Incorrecto. Sumó $2+4=6$ y luego multiplicó por 2 por error. -->

### Explicacion Pedagogica
Para funciones polinómicas continuas en un punto $a$, el límite cuando $x \to a$ se calcula evaluando directamente $x = a$: $f(2) = 3(2) + 4 = 10$.

---

## Question 2 [D3-D4]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v2
**Bloom:** Remember
**EJE:** Cálculo y análisis
**Expected_Success:** 0.82
**Contexto:** En San Lorenzo, se repasa la regla de la potencia para la derivada de una función polinómica.

### Enunciado
¿Cuál es la derivada de la función $f(x) = x^n$ con respecto a $x$?

### Opciones
- [x] A) $f'(x) = n \cdot x^{n-1}$ <!-- feedback: ¡Correcto! Es la regla básica de la potencia para derivadas algebraicas. -->
- [ ] B) $f'(x) = n \cdot x^n$ <!-- feedback: Incorrecto. Olvidó restar 1 al exponente. -->
- [ ] C) $f'(x) = x^{n-1}$ <!-- feedback: Incorrecto. Olvidó multiplicar por el exponente original $n$. -->
- [ ] D) $f'(x) = \frac{x^{n+1}}{n+1}$ <!-- feedback: Incorrecto. Esa es la fórmula de la antiderivada (integral indefinida). -->

### Explicacion Pedagogica
La regla de la potencia para la derivación establece que para cualquier número real $n$, la derivada de $f(x) = x^n$ es $f'(x) = n x^{n-1}$.

---

## Question 3 [D3-D4]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v3
**Bloom:** Understand
**EJE:** Cálculo y análisis
**Expected_Success:** 0.80
**Contexto:** En Luque, se determina la velocidad instantánea como la derivada de la posición respecto al tiempo.

### Enunciado
Si la posición de una partícula viene dada por $s(t) = 5t^2$, ¿cuál es su velocidad instantánea $v(t) = s'(t)$?

### Opciones
- [x] A) $v(t) = 10t$ <!-- feedback: ¡Correcto! Derivando $s(t) = 5t^2$: $s'(t) = 5 \cdot (2t) = 10t$. -->
- [ ] B) $v(t) = 5t$ <!-- feedback: Incorrecto. Olvidó multiplicar el coeficiente 5 por el exponente 2. -->
- [ ] C) $v(t) = 10$ <!-- feedback: Incorrecto. Eliminó la variable $t$ del resultado de la derivada. -->
- [ ] D) $v(t) = 2.5t^3$ <!-- feedback: Incorrecto. Aplicó una integración en vez de la derivada. -->

### Explicacion Pedagogica
Derivando término a término mediante la regla de la constante por la potencia: $\frac{d}{dt}(5t^2) = 5 \cdot (2t^{2-1}) = 10t$.

---

## Question 4 [D3-D4]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v4
**Bloom:** Apply
**EJE:** Cálculo y análisis
**Expected_Success:** 0.77
**Contexto:** En Encarnación, los alumnos evalúan el límite en el origen de una función constante.

### Enunciado
¿Cuál es la derivada de la función constante $f(x) = 15$?

### Opciones
- [x] A) $f'(x) = 0$ <!-- feedback: ¡Correcto! La derivada de cualquier constante numérica es igual a cero. -->
- [ ] B) $f'(x) = 15$ <!-- feedback: Incorrecto. La tasa de cambio de una constante no es la misma constante. -->
- [ ] C) $f'(x) = 1$ <!-- feedback: Incorrecto. 1 es la derivada de $f(x) = x$, no de una constante. -->
- [ ] D) $f'(x) = 15x$ <!-- feedback: Incorrecto. Esa sería la antiderivada de la constante. -->

### Explicacion Pedagogica
Como una función constante $f(x) = c$ no cambia su valor ante variaciones en $x$, su tasa de cambio instantánea (derivada) es siempre $0$.

---

## Question 5 [D5-D6]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v5
**Bloom:** Apply
**EJE:** Cálculo y análisis
**Expected_Success:** 0.74
**Contexto:** En Ciudad del Este, se resuelve una indeterminación de la forma $\frac{0}{0}$ mediante factorización.

### Enunciado
¿Cuál es el valor del límite $\lim_{x \to 3} \frac{x^2 - 9}{x - 3}$?

### Opciones
- [x] A) $6$ <!-- feedback: ¡Correcto! Factorizando el numerador: $\frac{(x-3)(x+3)}{x-3} = x + 3$. Al evaluar cuando $x \to 3$: $3 + 3 = 6$. -->
- [ ] B) $0$ <!-- feedback: Incorrecto. Al evaluar directamente se obtiene $0/0$ que es una indeterminación, no la respuesta final. -->
- [ ] C) Indefinido / $\infty$ <!-- feedback: Incorrecto. Es una indeterminación removible al cancelar el factor $(x-3)$. -->
- [ ] D) $3$ <!-- feedback: Incorrecto. Evaluó erróneamente el límite simplificado. -->

### Explicacion Pedagogica
Al evaluar $x=3$ se presenta la indeterminación $\frac{0}{0}$. Factorizamos la diferencia de cuadrados en el numerador:
$\lim_{x \to 3} \frac{(x - 3)(x + 3)}{x - 3} = \lim_{x \to 3} (x + 3) = 3 + 3 = 6$.

---

## Question 6 [D5-D6]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v6
**Bloom:** Apply
**EJE:** Cálculo y análisis
**Expected_Success:** 0.71
**Contexto:** En Coronel Oviedo, se halla la pendiente de la recta tangente a una curva en un punto específico.

### Enunciado
¿Cuál es la pendiente de la recta tangente a la parábola $f(x) = x^2 - 4x + 1$ en el punto donde $x = 3$?

### Opciones
- [x] A) $2$ <!-- feedback: ¡Correcto! La derivada es $f'(x) = 2x - 4$. Evaluando en $x=3$: $f'(3) = 2(3) - 4 = 6 - 4 = 2$. -->
- [ ] B) $6$ <!-- feedback: Incorrecto. Olvidó restar 4 al evaluar la derivada. -->
- [ ] C) $-2$ <!-- feedback: Incorrecto. Evaluó la función original $f(3) = -2$ en lugar de la derivada. -->
- [ ] D) $4$ <!-- feedback: Incorrecto. Asumió como pendiente el coeficiente de $x$. -->

### Explicacion Pedagogica
1) Obtenemos la derivada de la función: $f'(x) = 2x - 4$.
2) La pendiente de la recta tangente en $x = 3$ es el valor de la derivada en dicho punto: $m = f'(3) = 2(3) - 4 = 2$.

---

## Question 7 [D5-D6]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v7
**Bloom:** Apply
**EJE:** Cálculo y análisis
**Expected_Success:** 0.68
**Contexto:** En Villarrica, se aplica la regla de la suma para encontrar la derivada de un polinomio.

### Enunciado
¿Cuál es la derivada de la función polinómica $f(x) = 4x^3 - 2x^2 + 5x - 7$?

### Opciones
- [x] A) $f'(x) = 12x^2 - 4x + 5$ <!-- feedback: ¡Correcto! Derivando término a término: $4(3x^2) - 2(2x) + 5(1) - 0 = 12x^2 - 4x + 5$. -->
- [ ] B) $f'(x) = 12x^2 - 4x$ <!-- feedback: Incorrecto. Olvidó la derivada del término lineal $+5x$. -->
- [ ] C) $f'(x) = 4x^2 - 2x + 5$ <!-- feedback: Incorrecto. Olvidó multiplicar los coeficientes por los exponentes originales. -->
- [ ] D) $f'(x) = 12x^3 - 4x^2 + 5x$ <!-- feedback: Incorrecto. No redujo en 1 los exponentes. -->

### Explicacion Pedagogica
Derivando término a término:
$\frac{d}{dx}(4x^3) = 12x^2$
$\frac{d}{dx}(-2x^2) = -4x$
$\frac{d}{dx}(5x) = 5$
$\frac{d}{dx}(-7) = 0$
Por tanto, $f'(x) = 12x^2 - 4x + 5$.

---

## Question 8 [D5-D6]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v8
**Bloom:** Analyze
**EJE:** Cálculo y análisis
**Expected_Success:** 0.65
**Contexto:** En Caacupé, se analiza el límite en el infinito de una función racional.

### Enunciado
¿Cuál es el valor del límite al infinito $\lim_{x \to \infty} \frac{5x^2 + 3}{2x^2 - 1}$?

### Opciones
- [x] A) $\frac{5}{2}$ (o $2,5$) <!-- feedback: ¡Correcto! Como los grados del numerador y denominador son iguales (grado 2), el límite es la razón de sus coeficientes principales: $5/2$. -->
- [ ] B) $\infty$ <!-- feedback: Incorrecto. El límite es finito porque el grado del numerador no es strictly mayor que el del denominador. -->
- [ ] C) $0$ <!-- feedback: Incorrecto. El límite sería 0 si el grado del denominador fuese mayor. -->
- [ ] D) $-3$ <!-- feedback: Incorrecto. Dividió los términos independientes $3 / (-1)$ erróneamente. -->

### Explicacion Pedagogica
Dividiendo numerador y denominador entre $x^2$:
$\lim_{x \to \infty} \frac{5 + \frac{3}{x^2}}{2 - \frac{1}{x^2}} = \frac{5 + 0}{2 - 0} = \frac{5}{2}$.

---

## Question 9 [D5-D6]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v9
**Bloom:** Remember
**EJE:** Cálculo y análisis
**Expected_Success:** 0.62
**Contexto:** En Pilar, se estudia la relación entre continuidad y diferenciabilidad de una función.

### Enunciado
Si una función $f(x)$ es derivable en un punto $x = a$, ¿qué se puede afirmar con certeza sobre su continuidad en dicho punto?

### Opciones
- [x] A) La función $f(x)$ es necesariamente continua en $x = a$. <!-- feedback: ¡Correcto! Teorema fundamental: La derivabilidad en un punto implica la continuidad en ese mismo punto. -->
- [ ] B) La función $f(x)$ no es continua en $x = a$. <!-- feedback: Incorrecto. Al contrario, la derivabilidad garantiza la continuidad. -->
- [ ] C) La función $f(x)$ puede tener una discontinuidad de salto. <!-- feedback: Incorrecto. Si fuese discontinua, no podría existir la derivada en ese punto. -->
- [ ] D) No se puede determinar la continuidad sin más datos. <!-- feedback: Incorrecto. La implicación derivabilidad $\Rightarrow$ continuidad es directa e inequívoca. -->

### Explicacion Pedagogica
Es un teorema clásico del cálculo diferencial: "Si una función $f$ es derivable en $x=a$, entonces $f$ es continua en $x=a$". (Cabe remarcar que el recíproco no siempre es cierto).

---

## Question 10 [D5-D6]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v10
**Bloom:** Apply
**EJE:** Cálculo y análisis
**Expected_Success:** 0.60
**Contexto:** En Concepción, se aplica la regla del producto para derivar $f(x) = x \cdot \sin(x)$.

### Enunciado
Sabiendo que la derivada de $\sin(x)$ es $\cos(x)$, ¿cuál es la derivada de la función $f(x) = x \sin(x)$?

### Opciones
- [x] A) $f'(x) = \sin(x) + x \cos(x)$ <!-- feedback: ¡Correcto! Por regla del producto: $(u \cdot v)' = u'v + uv' = (1)\sin(x) + x\cos(x) = \sin(x) + x\cos(x)$. -->
- [ ] B) $f'(x) = \cos(x)$ <!-- feedback: Incorrecto. Derivó sólo el término $\sin(x)$ ignorando la variable $x$. -->
- [ ] C) $f'(x) = x \cos(x)$ <!-- feedback: Incorrecto. Multiplicó las derivadas de cada factor sin usar la regla del producto. -->
- [ ] D) $f'(x) = \sin(x) - x \cos(x)$ <!-- feedback: Incorrecto. Colocó un signo menos en la fórmula del producto. -->

### Explicacion Pedagogica
Aplicando la regla del producto $(u \cdot v)' = u'v + uv'$ con $u = x$ y $v = \sin(x)$:
$u' = 1$, $v' = \cos(x) \Rightarrow f'(x) = 1 \cdot \sin(x) + x \cdot \cos(x) = \sin(x) + x \cos(x)$.

---

## Question 11 [D7-D8]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v11
**Bloom:** Analyze
**EJE:** Cálculo y análisis
**Expected_Success:** 0.57
**Contexto:** En Asunción, se encuentra el punto crítico de una función cuadrática de costo para hallar el costo mínimo.

### Enunciado
Dada la función de costo $C(x) = 2x^2 - 12x + 50$, determine el valor de $x$ que minimiza el costo (punto crítico donde $C'(x) = 0$).

### Opciones
- [x] A) $x = 3$ <!-- feedback: ¡Correcto! $C'(x) = 4x - 12 = 0 \Rightarrow 4x = 12 \Rightarrow x = 3$. -->
- [ ] B) $x = 6$ <!-- feedback: Incorrecto. Olvidó el factor 2 de la potencia al derivar $2x^2$. -->
- [ ] C) $x = 12$ <!-- feedback: Incorrecto. Tomó el coeficiente del término lineal. -->
- [ ] D) $x = 0$ <!-- feedback: Incorrecto. Evaluó el costo en el origen en lugar de hallar el mínimo. -->

### Explicacion Pedagogica
Derivamos la función de costo: $C'(x) = 4x - 12$. Igualando a cero para buscar el punto crítico: $4x - 12 = 0 \Rightarrow 4x = 12 \Rightarrow x = 3$. Dado que $C''(x) = 4 > 0$, en $x = 3$ se alcanza un mínimo relativo.

---

## Question 12 [D7-D8]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v12
**Bloom:** Apply
**EJE:** Cálculo y análisis
**Expected_Success:** 0.54
**Contexto:** En San Lorenzo, se utiliza la regla de la cadena para derivar una función compuesta.

### Enunciado
¿Cuál es la derivada de la función compuesta $f(x) = (3x^2 + 1)^4$?

### Opciones
- [x] A) $f'(x) = 24x(3x^2 + 1)^3$ <!-- feedback: ¡Correcto! Por regla de la cadena: $f'(x) = 4(3x^2 + 1)^3 \cdot \frac{d}{dx}(3x^2 + 1) = 4(3x^2 + 1)^3 \cdot 6x = 24x(3x^2 + 1)^3$. -->
- [ ] B) $f'(x) = 4(3x^2 + 1)^3$ <!-- feedback: Incorrecto. Olvidó multiplicar por la derivada interna del argumento $6x$. -->
- [ ] C) $f'(x) = 12x(3x^2 + 1)^3$ <!-- feedback: Incorrecto. Error al multiplicar el exponente 4 por la derivada interna $6x$. -->
- [ ] D) $f'(x) = 24x^3(3x^2 + 1)^3$ <!-- feedback: Incorrecto. La derivada interna de $3x^2$ es $6x$, no $6x^2$. -->

### Explicacion Pedagogica
Por la regla de la cadena $\frac{d}{dx}[u(x)^n] = n \cdot u(x)^{n-1} \cdot u'(x)$:
Con $u(x) = 3x^2 + 1$ y $u'(x) = 6x$:
$f'(x) = 4(3x^2 + 1)^3 \cdot (6x) = 24x (3x^2 + 1)^3$.

---

## Question 13 [D7-D8]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v13
**Bloom:** Apply
**EJE:** Cálculo y análisis
**Expected_Success:** 0.51
**Contexto:** En Luque, se aplica la regla del cociente para hallar la derivada de la función $f(x) = \frac{2x}{x + 1}$.

### Enunciado
¿Cuál es la derivada de la función $f(x) = \frac{2x}{x + 1}$?

### Opciones
- [x] A) $f'(x) = \frac{2}{(x + 1)^2}$ <!-- feedback: ¡Correcto! Regla del cociente: $\frac{u'v - uv'}{v^2} = \frac{2(x+1) - 2x(1)}{(x+1)^2} = \frac{2x + 2 - 2x}{(x+1)^2} = \frac{2}{(x+1)^2}$. -->
- [ ] B) $f'(x) = \frac{2}{1} = 2$ <!-- feedback: Incorrecto. Derivó numerador y denominador por separado sin aplicar la regla del cociente. -->
- [ ] C) $f'(x) = \frac{4x + 2}{(x + 1)^2}$ <!-- feedback: Incorrecto. Sumó los términos en el numerador en lugar de restarlos. -->
- [ ] D) $f'(x) = -\frac{2}{(x + 1)^2}$ <!-- feedback: Incorrecto. Error de signo al simplificar el numerador. -->

### Explicacion Pedagogica
Aplicando la regla del cociente $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$ con $u = 2x$ y $v = x + 1$:
$u' = 2$, $v' = 1$.
$f'(x) = \frac{2(x + 1) - 2x(1)}{(x + 1)^2} = \frac{2x + 2 - 2x}{(x + 1)^2} = \frac{2}{(x + 1)^2}$.

---

## Question 14 [D7-D8]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v14
**Bloom:** Analyze
**EJE:** Cálculo y análisis
**Expected_Success:** 0.48
**Contexto:** En Encarnación, los alumnos resuelven el límite trigonométrico fundamental $\lim_{x \to 0} \frac{\sin(4x)}{x}$.

### Enunciado
¿Cuál es el valor del límite $\lim_{x \to 0} \frac{\sin(4x)}{x}$?

### Opciones
- [x] A) $4$ <!-- feedback: ¡Correcto! Usando la propiedad del límite trigonométrico fundamental $\lim_{u \to 0} \frac{\sin(k u)}{u} = k$. Por tanto, el límite es 4. -->
- [ ] B) $1$ <!-- feedback: Incorrecto. 1 es el resultado de $\lim_{x \to 0} \frac{\sin(x)}{x}$, pero aquí tenemos el coeficiente $k=4$. -->
- [ ] C) $0$ <!-- feedback: Incorrecto. No evaluó correctamente la tasa de cambio en la indeterminación $0/0$. -->
- [ ] D) Indefinido <!-- feedback: Incorrecto. Es un límite trigonométrico notable de valor finito 4. -->

### Explicacion Pedagogica
Multiplicando y dividiendo por 4:
$\lim_{x \to 0} 4 \cdot \frac{\sin(4x)}{4x} = 4 \cdot \lim_{u \to 0} \frac{\sin(u)}{u} = 4 \cdot 1 = 4$.

---

## Question 15 [D7-D8]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v15
**Bloom:** Evaluate
**EJE:** Cálculo y análisis
**Expected_Success:** 0.45
**Contexto:** En Ciudad del Este, se calcula la segunda derivada $f''(x)$ para estudiar la concavidad de una función.

### Enunciado
Dada la función $f(x) = x^4 - 2x^3 + 5x$, ¿cuál es su segunda derivada $f''(x)$?

### Opciones
- [x] A) $f''(x) = 12x^2 - 12x$ <!-- feedback: ¡Correcto! $f'(x) = 4x^3 - 6x^2 + 5 \Rightarrow f''(x) = 12x^2 - 12x$. -->
- [ ] B) $f''(x) = 4x^3 - 6x^2 + 5$ <!-- feedback: Incorrecto. Corresponde a la primera derivada $f'(x)$. -->
- [ ] C) $f''(x) = 24x - 12$ <!-- feedback: Incorrecto. Corresponde a la tercera derivada $f'''(x)$. -->
- [ ] D) $f''(x) = 12x^2 - 6x$ <!-- feedback: Incorrecto. Olvidó multiplicar $6 \cdot 2 = 12$ en la segunda derivación. -->

### Explicacion Pedagogica
1) Primera derivada: $f'(x) = 4x^3 - 6x^2 + 5$.
2) Segunda derivada: $f''(x) = \frac{d}{dx}(4x^3 - 6x^2 + 5) = 12x^2 - 12x$.

---

## Question 16 [D7-D8]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v16
**Bloom:** Apply
**EJE:** Cálculo y análisis
**Expected_Success:** 0.43
**Contexto:** En Coronel Oviedo, se halla la ecuación completa de la recta tangente a la curva $y = x^3$ en el punto $(2, 8)$.

### Enunciado
¿Cuál es la ecuación de la recta tangente a la función $y = x^3$ en el punto $(2, 8)$?

### Opciones
- [x] A) $y = 12x - 16$ <!-- feedback: ¡Correcto! Pendiente $m = y'(2) = 3(2)^2 = 12$. Recta: $y - 8 = 12(x - 2) \Rightarrow y - 8 = 12x - 24 \Rightarrow y = 12x - 16$. -->
- [ ] B) $y = 12x + 16$ <!-- feedback: Incorrecto. Error de signo al trasponer $-24 + 8$. -->
- [ ] C) $y = 6x - 4$ <!-- feedback: Incorrecto. Derivó $x^3$ como $3x$ o calculó mal la pendiente. -->
- [ ] D) $y = 3x + 2$ <!-- feedback: Incorrecto. Tomó como pendiente el coeficiente exponente 3. -->

### Explicacion Pedagogica
1) Derivada: $y' = 3x^2$.
2) Pendiente en $x=2$: $m = 3(2^2) = 12$.
3) Forma punto-pendiente en $(2,8)$: $y - 8 = 12(x - 2) \Rightarrow y = 12x - 24 + 8 = 12x - 16$.

---

## Question 17 [D9-D10]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v17
**Bloom:** Evaluate
**EJE:** Cálculo y análisis
**Expected_Success:** 0.40
**Contexto:** En Villarrica, se halla el límite lateral o la asíntota vertical de una función racional en sus puntos de discontinuidad.

### Enunciado
Considere la función $f(x) = \frac{x + 2}{x^2 - 4}$. ¿Cuáles son las asíntotas verticales y los puntos de discontinuidad evitable (removible)?

### Opciones
- [x] A) Asíntota vertical en $x = 2$, discontinuidad evitable en $x = -2$ <!-- feedback: ¡Correcto! $f(x) = \frac{x+2}{(x+2)(x-2)} = \frac{1}{x-2}$ para $x \neq -2$. En $x=-2$ el factor se cancela (hueco o discontinuidad evitable) y en $x=2$ el denominador se anula (asíntota vertical). -->
- [ ] B) Asíntotas verticales en $x = 2$ y $x = -2$ <!-- feedback: Incorrecto. En $x=-2$ la discontinuidad se puede remover por cancelación. -->
- [ ] C) Asíntota vertical en $x = -2$, discontinuidad evitable en $x = 2$ <!-- feedback: Incorrecto. Invirtió las posiciones del hueco y la asíntota. -->
- [ ] D) Sin asíntotas verticales <!-- feedback: Incorrecto. En $x=2$ la función tiende a $\pm \infty$. -->

### Explicacion Pedagogica
Simplificando la expresión para $x \neq -2$: $f(x) = \frac{x + 2}{(x + 2)(x - 2)} = \frac{1}{x - 2}$.
- En $x = -2$, la discontinuidad es **evitable** o removible (se elimina el factor $(x+2)$).
- En $x = 2$, el denominador se hace cero con numerador no nulo, lo que genera una **asíntota vertical**.

---

## Question 18 [D9-D10]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v18
**Bloom:** Analyze
**EJE:** Cálculo y análisis
**Expected_Success:** 0.38
**Contexto:** En Caacupé, se analiza la optimización de un área rectangular cercada de $100\text{ m}$ de perímetro total.

### Enunciado
Se quiere construir un corral rectangular con $100\text{ m}$ de malla de alambre disponible. ¿Cuáles deben ser las dimensiones para maximizar el área encerrada?

### Opciones
- [x] A) $25\text{ m} \times 25\text{ m}$ (un cuadrado de $25\text{ m}$ de lado) <!-- feedback: ¡Correcto! Con perímetro $2x + 2y = 100 \Rightarrow y = 50 - x$. Área $A(x) = x(50 - x) = 50x - x^2$. Derivando: $A'(x) = 50 - 2x = 0 \Rightarrow x = 25\text{ m}$, luego $y = 25\text{ m}$. -->
- [ ] B) $10\text{ m} \times 40\text{ m}$ <!-- feedback: Incorrecto. Área $400\text{ m}^2$, menor que la superficie máxima $625\text{ m}^2$. -->
- [ ] C) $20\text{ m} \times 30\text{ m}$ <!-- feedback: Incorrecto. Área $600\text{ m}^2$, inferior al óptimo. -->
- [ ] D) $50\text{ m} \times 50\text{ m}$ <!-- feedback: Incorrecto. Eso sumaría un perímetro de $200\text{ m}$, sobrepasando la malla disponible. -->

### Explicacion Pedagogica
1) Condición de perímetro: $2x + 2y = 100 \Rightarrow x + y = 50 \Rightarrow y = 50 - x$.
2) Función de área: $A(x) = x(50 - x) = 50x - x^2$.
3) Derivada primera: $A'(x) = 50 - 2x$. Igualando a cero: $50 - 2x = 0 \Rightarrow x = 25$.
4) Como $A''(x) = -2 < 0$, en $x = 25\text{ m}$ (y $y = 25\text{ m}$) se maximiza el área ($625\text{ m}^2$).

---

## Question 19 [D9-D10]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v19
**Bloom:** Evaluate
**EJE:** Cálculo y análisis
**Expected_Success:** 0.35
**Contexto:** En Pilar, se aplica la Regla de L'Hôpital para resolver el límite indeterminado $\lim_{x \to 0} \frac{e^x - 1 - x}{x^2}$.

### Enunciado
¿Cuál es el valor del límite $\lim_{x \to 0} \frac{e^x - 1 - x}{x^2}$?

### Opciones
- [x] A) $\frac{1}{2}$ (o $0,5$) <!-- feedback: ¡Correcto! Al evaluar $x=0$ da $0/0$. L'Hôpital una vez: $\lim_{x \to 0} \frac{e^x - 1}{2x}$ ($0/0$). L'Hôpital segunda vez: $\lim_{x \to 0} \frac{e^x}{2} = \frac{1}{2}$. -->
- [ ] B) $1$ <!-- feedback: Incorrecto. Resultado obtenido tras aplicar L'Hôpital una sola vez sin evaluar nuevamente la indeterminación. -->
- [ ] C) $0$ <!-- feedback: Incorrecto. Evaluó erróneamente los numeradores en las derivadas sucesivas. -->
- [ ] D) $\infty$ <!-- feedback: Incorrecto. El límite es convergente y finito igual a $1/2$. -->

### Explicacion Pedagogica
Aplicando la Regla de L'Hôpital sucesivamente a la indeterminación $\frac{0}{0}$:
1.ª derivación: $\lim_{x \to 0} \frac{e^x - 1}{2x}$ (sigue siendo $\frac{0}{0}$).
2.ª derivación: $\lim_{x \to 0} \frac{e^x}{2} = \frac{e^0}{2} = \frac{1}{2}$.

---

## Question 20 [D9-D10]
**ID:** PY-MAT-11-2026-W15-tema-w15-001-MASTERY-v20
**Bloom:** Evaluate
**EJE:** Cálculo y análisis
**Expected_Success:** 0.32
**Contexto:** En Concepción, se determinan los puntos de inflexión de la función cúbica $f(x) = x^3 - 6x^2 + 9x + 1$.

### Enunciado
¿Cuál es la abscisa del punto de inflexión (donde $f''(x) = 0$ y cambia la concavidad) de la función $f(x) = x^3 - 6x^2 + 9x + 1$?

### Opciones
- [x] A) $x = 2$ <!-- feedback: ¡Correcto! $f'(x) = 3x^2 - 12x + 9 \Rightarrow f''(x) = 6x - 12 = 0 \Rightarrow 6x = 12 \Rightarrow x = 2$. -->
- [ ] B) $x = 1$ <!-- feedback: Incorrecto. $x=1$ es una raíz de $f'(x)=0$ (un máximo local). -->
- [ ] C) $x = 3$ <!-- feedback: Incorrecto. $x=3$ es otra raíz de $f'(x)=0$ (un mínimo local). -->
- [ ] D) $x = 0$ <!-- feedback: Incorrecto. Evaluó la función en el eje de ordenadas. -->

### Explicacion Pedagogica
1) Primera derivada: $f'(x) = 3x^2 - 12x + 9$.
2) Segunda derivada: $f''(x) = 6x - 12$.
3) Punto de inflexión: $6x - 12 = 0 \Rightarrow x = 2$.
Al cambiar de signo $f''(x)$ alrededor de $x = 2$ (negativa a la izquierda y positiva a la derecha), se confirma el punto de inflexión.
