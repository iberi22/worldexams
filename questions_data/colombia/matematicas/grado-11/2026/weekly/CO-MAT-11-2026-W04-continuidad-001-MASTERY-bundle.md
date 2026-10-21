---
id: "CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "continuidad"
periodo: "weekly"
week: "W04"
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

# Bundle MASTERY: Continuidad - Grado 11

Veinte situaciones colombianas para analizar la continuidad de funciones: sus tres condiciones, los tipos de discontinuidad, el teorema del valor intermedio y modelos de tarifas por tramos.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Variacional
**Expected_Success:** 0.85
**Contexto:** En un curso de cálculo de la Universidad de Antioquia se repasa la definición formal de continuidad de una función $f$ en un punto $x = a$.

### Enunciado
¿Qué condiciones debe cumplir $f$ para ser continua en $x = a$?

### Opciones
- [ ] A) Basta con que $f(a)$ esté definida.
  <!-- feedback: Incorrecto. Una función puede estar definida en $a$ y tener un salto allí; también se necesita que el límite exista y coincida con $f(a)$. -->
- [x] B) $f(a)$ está definida, $\lim_{x \to a} f(x)$ existe y $\lim_{x \to a} f(x) = f(a)$.
  <!-- feedback: Correcto. Son las tres condiciones de continuidad: valor definido, límite existente e igualdad entre ambos. -->
- [ ] C) Los límites laterales en $a$ existen.
  <!-- feedback: Incorrecto. Los laterales pueden existir y ser distintos (discontinuidad de salto); además deben coincidir con $f(a)$. -->
- [ ] D) Que $f(a) = 0$.
  <!-- feedback: Incorrecto. El valor de $f(a)$ puede ser cualquier número; lo que importa es que coincida con el límite en $a$. -->

### Explicacion Pedagogica
$f$ es continua en $a$ si: (1) $f(a)$ existe; (2) $\lim_{x \to a} f(x)$ existe, es decir, los laterales coinciden; (3) $\lim_{x \to a} f(x) = f(a)$. Si falla cualquiera, hay discontinuidad. Por ejemplo, $\frac{x^2-1}{x-1}$ falla la primera en $x = 1$.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v2
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.83
**Contexto:** Un ingeniero de Ecopetrol en Barrancabermeja debe elegir un modelo de presión que no tenga saltos ni cortes para ningún valor real de $x$.

### Enunciado
¿Cuál de estas funciones es continua en todo $\mathbb{R}$?

### Opciones
- [x] A) $f(x) = x^3 - 2x + 5$
  <!-- feedback: Correcto. Es un polinomio, y los polinomios son continuos en todos los números reales. -->
- [ ] B) $f(x) = \frac{1}{x - 1}$
  <!-- feedback: Incorrecto. No está definida en $x = 1$, donde el denominador se anula; allí tiene una discontinuidad infinita. -->
- [ ] C) $f(x) = \sqrt{x}$
  <!-- feedback: Incorrecto. Solo está definida para $x \ge 0$; en los negativos no hay valores reales, así que no es continua en todo $\mathbb{R}$. -->
- [ ] D) $f(x) = \frac{x^2 - 4}{x - 2}$
  <!-- feedback: Incorrecto. En $x = 2$ el denominador es 0 y $f(2)$ no existe; tiene una discontinuidad (removible) en ese punto. -->

### Explicacion Pedagogica
Los polinomios son continuos en todo $\mathbb{R}$ porque se construyen con sumas y productos de funciones continuas. Las funciones racionales fallan donde se anula el denominador (B en 1, D en 2) y la raíz cuadrada solo existe para $x \ge 0$. Por eso solo A es continua en todos los reales.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.80
**Contexto:** Un estudiante de Santa Marta grafica $f(x) = \frac{x^2 - 9}{x - 3}$ y observa un "hueco" en la recta que aparece.

### Enunciado
¿Qué tipo de discontinuidad tiene $f$ en $x = 3$?

### Opciones
- [x] A) Removible
  <!-- feedback: Correcto. $f(x) = x + 3$ para $x \neq 3$, el límite existe y vale 6, pero $f(3)$ no está definida. -->
- [ ] B) De salto
  <!-- feedback: Incorrecto. En un salto los laterales son distintos; aquí ambos laterales valen 6. -->
- [ ] C) Infinita
  <!-- feedback: Incorrecto. Sería infinita si $f$ creciera sin límite cerca de 3; el factor $x - 3$ se cancela y el límite es 6. -->
- [ ] D) Ninguna, $f$ es continua en $x = 3$.
  <!-- feedback: Incorrecto. En $x = 3$ el denominador es 0, así que $f(3)$ no existe y falla la primera condición. -->

### Explicacion Pedagogica
Factorizando, $f(x) = \frac{(x-3)(x+3)}{x-3} = x + 3$ para $x \neq 3$, de modo que $\lim_{x \to 3} f(x) = 6$. Como $f(3)$ no está definida, la discontinuidad es removible: se elimina definiendo $f(3) = 6$. La gráfica es la recta $y = x + 3$ con un hueco en $(3, 6)$.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Modelacion
**Expected_Success:** 0.78
**Contexto:** Un parqueadero de Bogotá cobra 4 000 pesos por cada hora o fracción: hasta 1 h paga 4 000, de más de 1 h hasta 2 h paga 8 000, de más de 2 h hasta 3 h paga 12 000, y así sucesivamente.

### Enunciado
¿Qué ocurre con la función costo en $t = 2$ horas?

### Opciones
- [ ] A) Tiene una discontinuidad removible.
  <!-- feedback: Incorrecto. Removible exige que los laterales coincidan; aquí por la izquierda el costo es 8 000 y por la derecha 12 000. -->
- [ ] B) Tiene una discontinuidad infinita.
  <!-- feedback: Incorrecto. El costo no crece sin límite cerca de 2 h; solo cambia de 8 000 a 12 000. -->
- [ ] C) Es continua porque el costo está definido en $t = 2$.
  <!-- feedback: Incorrecto. Estar definida es solo la primera condición; el límite en 2 no existe porque los laterales difieren. -->
- [x] D) Tiene una discontinuidad de salto.
  <!-- feedback: Correcto. El límite por la izquierda es 8 000 y por la derecha 12 000: un salto de 4 000 pesos. -->

### Explicacion Pedagogica
Cobro por hora o fracción: $C(t) = 8\,000$ para $1 < t \le 2$ y $C(t) = 12\,000$ para $2 < t \le 3$. En $t = 2$: $\lim_{t \to 2^-} C = 8\,000$ y $\lim_{t \to 2^+} C = 12\,000$. Los laterales existen pero son distintos, lo que define una discontinuidad de salto de 4 000 pesos.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.75
**Contexto:** Un modelo de demanda de energía en Cali usa $f(x) = 2x + 1$ si $x < 1$, $f(1) = 4$ y $f(x) = x^2 + 2$ si $x > 1$.

### Enunciado
¿Qué condición de continuidad falla en $x = 1$?

### Opciones
- [ ] A) La primera: $f(1)$ no está definida.
  <!-- feedback: Incorrecto. $f(1) = 4$ está dado explícitamente, así que esa condición se cumple. -->
- [x] B) La tercera: el límite vale 3 pero $f(1) = 4$.
  <!-- feedback: Correcto. Laterales: $2(1) + 1 = 3$ y $1^2 + 2 = 3$; el límite existe y es 3, distinto de $f(1)$. -->
- [ ] C) La segunda: el límite en $x = 1$ no existe.
  <!-- feedback: Incorrecto. Ambos laterales valen 3, así que el límite existe. -->
- [ ] D) Ninguna: $f$ es continua en $x = 1$.
  <!-- feedback: Incorrecto. Para ser continua se requiere $\lim_{x \to 1} f(x) = f(1)$, y $3 \neq 4$. -->

### Explicacion Pedagogica
Se revisan las tres condiciones. (1) $f(1) = 4$, definida. (2) $\lim_{x \to 1^-}(2x + 1) = 3$ y $\lim_{x \to 1^+}(x^2 + 2) = 3$, el límite existe y vale 3. (3) $3 \neq 4$, falla. Es una discontinuidad removible: bastaría redefinir $f(1) = 3$.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.72
**Contexto:** Una empresa de Medellín modela el desgaste de una pieza con $f(x) = kx + 3$ si $x < 2$ y $f(x) = x^2 + 5$ si $x \ge 2$, y necesita que el modelo no tenga saltos.

### Enunciado
¿Qué valor de $k$ hace que $f$ sea continua en $x = 2$?

### Opciones
- [ ] A) $k = 6$
  <!-- feedback: Incorrecto. Se pasó el 3 sumando: $2k = 9 + 3$; al despejar $2k + 3 = 9$ el 3 se resta. -->
- [ ] B) $k = \frac{9}{2}$
  <!-- feedback: Incorrecto. Se igualó $2k = 9$ olvidando el término $+3$ del primer trozo. -->
- [x] C) $k = 3$
  <!-- feedback: Correcto. Se igualan los valores en 2: $2k + 3 = 2^2 + 5 = 9$, luego $2k = 6$ y $k = 3$. -->
- [ ] D) $k = -3$
  <!-- feedback: Incorrecto. Se restó al revés: $2k = 3 - 9 = -6$; lo correcto es $2k = 9 - 3 = 6$. -->

### Explicacion Pedagogica
Para continuidad en 2 el límite por la izquierda debe igualar $f(2)$. Izquierda: $\lim_{x \to 2^-}(kx + 3) = 2k + 3$. Valor y límite derecho: $f(2) = 4 + 5 = 9$. Se resuelve $2k + 3 = 9 \Rightarrow k = 3$. Comprobación: $3(2) + 3 = 9$.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.70
**Contexto:** Una empresa de energía en Cali cobra 700 pesos por kWh hasta el consumo de subsistencia de 173 kWh y 900 pesos por cada kWh adicional: $C(x) = 700x$ si $0 \le x \le 173$ y $C(x) = 121\,100 + 900(x - 173)$ si $x > 173$.

### Enunciado
¿Qué se puede afirmar sobre $C$ en $x = 173$?

### Opciones
- [ ] A) Tiene un salto de 200 pesos.
  <!-- feedback: Incorrecto. 200 pesos es la diferencia de precio por kWh (la pendiente), no un salto en el valor de la factura; ambos trozos dan 121 100 en 173. -->
- [x] B) Es continua, y la factura en 173 kWh es 121 100 pesos.
  <!-- feedback: Correcto. $700 \cdot 173 = 121\,100$ y el segundo trozo tiende a $121\,100 + 0$; límite y valor coinciden. -->
- [ ] C) No es continua, porque la fórmula cambia en 173.
  <!-- feedback: Incorrecto. Un cambio de fórmula no implica discontinuidad; lo que importa es que los valores coincidan en el punto, y coinciden. -->
- [ ] D) Tiene una discontinuidad removible.
  <!-- feedback: Incorrecto. Removible exige que $C(173)$ falte o difiera del límite, y aquí $C(173) = 121\,100$ es igual al límite. -->

### Explicacion Pedagogica
Por la izquierda: $\lim_{x \to 173^-} 700x = 121\,100$. Por la derecha: $\lim_{x \to 173^+} [121\,100 + 900(x - 173)] = 121\,100$. Además $C(173) = 121\,100$. Las tres condiciones se cumplen, así que $C$ es continua: lo que cambia en 173 es la pendiente (de 700 a 900), no el valor.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.68
**Contexto:** En un laboratorio de física de Pasto se analiza la función $f(x) = \frac{x + 2}{x^2 - 4}$, que describe la respuesta de un circuito.

### Enunciado
¿Cómo se clasifican las discontinuidades de $f$?

### Opciones
- [ ] A) En $x = 2$ y $x = -2$ son ambas infinitas.
  <!-- feedback: Incorrecto. En $x = -2$ el factor $x + 2$ se cancela y el límite es $-\frac{1}{4}$, finito; esa es removible. -->
- [ ] B) En $x = 2$ es removible y en $x = -2$ es infinita.
  <!-- feedback: Incorrecto. Los tipos están intercambiados: el factor que se cancela es $x + 2$, así que la removible está en $-2$. -->
- [ ] C) Solo hay discontinuidad en $x = 2$.
  <!-- feedback: Incorrecto. En $x = -2$ el denominador también es 0, así que $f(-2)$ no existe y hay discontinuidad. -->
- [x] D) En $x = -2$ es removible y en $x = 2$ es infinita.
  <!-- feedback: Correcto. $f(x) = \frac{1}{x - 2}$ para $x \neq -2$: límite $-\frac{1}{4}$ en $-2$ y crecimiento sin límite en 2. -->

### Explicacion Pedagogica
$x^2 - 4 = (x - 2)(x + 2)$, así que $f$ no está definida en $\pm 2$. Para $x \neq -2$, $f(x) = \frac{1}{x - 2}$. En $x = -2$: $\lim f = \frac{1}{-4} = -\frac{1}{4}$, discontinuidad removible. En $x = 2$: $\frac{1}{x - 2} \to \pm\infty$, discontinuidad infinita (asíntota vertical).

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.66
**Contexto:** Un programador en Bogotá necesita que su función $g(x) = \frac{x^2 - 5x + 6}{x - 3}$ no tenga huecos, y para ello debe asignar un valor a $g(3)$.

### Enunciado
¿Qué valor debe tener $g(3)$ para que $g$ sea continua en $x = 3$?

### Opciones
- [ ] A) 0
  <!-- feedback: Incorrecto. 0 es el valor del numerador en 3 ($9 - 15 + 6$); el valor que se necesita es el límite del cociente simplificado. -->
- [ ] B) 3
  <!-- feedback: Incorrecto. Se tomó el valor de $x$; tras simplificar, $g(x) = x - 2$ y en 3 vale 1. -->
- [x] C) 1
  <!-- feedback: Correcto. $\frac{(x - 2)(x - 3)}{x - 3} = x - 2 \to 1$, y definiendo $g(3) = 1$ se cumplen las tres condiciones. -->
- [ ] D) Ninguno, porque en $x = 3$ hay una asíntota vertical.
  <!-- feedback: Incorrecto. El factor $x - 3$ se cancela; hay un hueco, no una asíntota, y se repara con $g(3) = 1$. -->

### Explicacion Pedagogica
Se factoriza: $x^2 - 5x + 6 = (x - 2)(x - 3)$. Para $x \neq 3$, $g(x) = x - 2$, así que $\lim_{x \to 3} g(x) = 1$. La discontinuidad es removible y se elimina definiendo $g(3) = 1$, igual al límite.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Razonamiento
**Expected_Success:** 0.64
**Contexto:** Un grupo de investigación en Tunja busca una raíz de $f(x) = x^3 - x - 1$ y quiere un intervalo donde el teorema del valor intermedio garantice que existe.

### Enunciado
¿En cuál intervalo se garantiza una raíz de $f$?

### Opciones
- [ ] A) $[-1, 0]$
  <!-- feedback: Incorrecto. $f(-1) = -1$ y $f(0) = -1$ tienen el mismo signo; el teorema no garantiza ninguna raíz allí. -->
- [ ] B) $[0, 1]$
  <!-- feedback: Incorrecto. $f(0) = -1$ y $f(1) = 1 - 1 - 1 = -1$; sin cambio de signo no hay garantía. -->
- [ ] C) $[2, 3]$
  <!-- feedback: Incorrecto. $f(2) = 5$ y $f(3) = 23$ son ambos positivos; no hay cambio de signo. -->
- [x] D) $[1, 2]$
  <!-- feedback: Correcto. $f(1) = -1 < 0$ y $f(2) = 8 - 2 - 1 = 5 > 0$; como $f$ es continua, se anula en algún punto de $(1, 2)$. -->

### Explicacion Pedagogica
El teorema del valor intermedio dice que si $f$ es continua en $[a, b]$ y $f(a)$, $f(b)$ tienen signos opuestos, existe $c$ en $(a, b)$ con $f(c) = 0$. $f$ es polinomio (continua). Valores: $f(-1) = -1$, $f(0) = -1$, $f(1) = -1$, $f(2) = 5$, $f(3) = 23$. El único cambio de signo está entre 1 y 2.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.62
**Contexto:** En un seminario de cálculo en Cartagena se sabe que $f$ es continua en $x = 2$ y que $g$ es discontinua en $x = 2$.

### Enunciado
¿Qué se puede concluir con certeza?

### Opciones
- [ ] A) $f + g$ es continua en $x = 2$.
  <!-- feedback: Incorrecto. Si $f + g$ fuera continua, entonces $g = (f + g) - f$ sería resta de continuas y también continua, lo cual contradice el dato. -->
- [ ] B) $f \cdot g$ es siempre discontinua en $x = 2$.
  <!-- feedback: Incorrecto. Si $f(x) = 0$ para todo $x$, el producto $f \cdot g = 0$ es continuo; el producto no tiene por qué ser discontinuo. -->
- [x] C) $f + g$ es discontinua en $x = 2$.
  <!-- feedback: Correcto. Si fuera continua, $g = (f+g) - f$ sería continua en 2 por ser resta de funciones continuas, contradicción. -->
- [ ] D) No se puede concluir nada sobre $f + g$.
  <!-- feedback: Incorrecto. Sí se puede: el argumento por contradicción con $g = (f + g) - f$ muestra que $f + g$ es necesariamente discontinua. -->

### Explicacion Pedagogica
La resta de funciones continuas en un punto es continua en ese punto. Supongamos que $f + g$ es continua en 2; entonces $g = (f + g) - f$ sería continua en 2, lo que contradice la hipótesis. Por tanto $f + g$ es discontinua en 2. Para el producto no hay conclusión fija: con $f = 0$ se obtiene $f \cdot g = 0$, continua.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.60
**Contexto:** En el aeropuerto El Dorado de Bogotá se registró 8 °C a las 6:00 a. m. y 19 °C a las 2:00 p. m. del mismo día.

### Enunciado
Si la temperatura es una función continua del tiempo, ¿qué se puede afirmar con certeza?

### Opciones
- [ ] A) A las 10:00 a. m. la temperatura era 13,5 °C.
  <!-- feedback: Incorrecto. 13,5 es el promedio de 8 y 19, pero la temperatura no tiene por qué subir de forma lineal. -->
- [ ] B) La temperatura nunca superó 19 °C entre las 6:00 a. m. y las 2:00 p. m.
  <!-- feedback: Incorrecto. La continuidad no impide que la temperatura suba a 20 °C y luego baje a 19 °C antes de las 2:00 p. m. -->
- [ ] C) La temperatura subió a ritmo constante.
  <!-- feedback: Incorrecto. La continuidad solo excluye saltos; no dice nada sobre la rapidez del cambio. -->
- [x] D) En algún momento entre las 6:00 a. m. y las 2:00 p. m. la temperatura fue exactamente 15 °C.
  <!-- feedback: Correcto. 15 está entre 8 y 19 y, por el teorema del valor intermedio, una función continua toma ese valor. -->

### Explicacion Pedagogica
Sea $T(t)$ la temperatura, continua en $[6, 14]$ (horas), con $T(6) = 8$ y $T(14) = 19$. El teorema del valor intermedio asegura que para cualquier valor $k$ entre 8 y 19, como $k = 15$, existe $c$ en $(6, 14)$ con $T(c) = 15$. No informa en qué momento ni sobre el ritmo de cambio.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.58
**Contexto:** Un analista de una empresa de logística en Cúcuta usa $f(x) = \frac{\sqrt{x - 1}}{x - 4}$ y necesita saber en qué intervalos el modelo es continuo.

### Enunciado
¿En qué conjunto es continua $f$?

### Opciones
- [ ] A) $\mathbb{R} - \{4\}$
  <!-- feedback: Incorrecto. Para $x < 1$ el radicando es negativo y $\sqrt{x - 1}$ no es real; $f$ ni siquiera está definida ahí. -->
- [ ] B) $(1, \infty)$
  <!-- feedback: Incorrecto. Incluye $x = 4$, donde el denominador es 0, y excluye $x = 1$, donde $f(1) = 0$ está definida. -->
- [ ] C) $[1, \infty)$
  <!-- feedback: Incorrecto. Olvida que en $x = 4$ el denominador se anula y $f$ no está definida. -->
- [x] D) $[1, 4) \cup (4, \infty)$
  <!-- feedback: Correcto. La raíz exige $x \ge 1$ y el denominador $x \neq 4$; en ese dominio $f$ es cociente de funciones continuas. -->

### Explicacion Pedagogica
Una función construida con raíces y cocientes de funciones continuas es continua en su dominio. Condiciones: $x - 1 \ge 0 \Rightarrow x \ge 1$ y $x - 4 \neq 0 \Rightarrow x \neq 4$. Por tanto $f$ es continua en $[1, 4) \cup (4, \infty)$; en $x = 1$ es continua por la derecha con $f(1) = 0$.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.56
**Contexto:** Santiago, estudiante de Armenia, afirma: "para $f(x) = \frac{1}{x}$ se tiene $f(-1) = -1$ y $f(1) = 1$; por el teorema del valor intermedio existe $c$ en $(-1, 1)$ con $f(c) = 0$".

### Enunciado
¿Qué evaluación del razonamiento es correcta?

### Opciones
- [ ] A) Es correcto, porque $f(-1)$ y $f(1)$ tienen signos opuestos.
  <!-- feedback: Incorrecto. El cambio de signo no basta; el teorema exige continuidad en todo $[-1, 1]$, y $\frac{1}{x}$ no está definida en 0. -->
- [x] B) Es incorrecto: $f$ no es continua en $[-1, 1]$ (falla en $x = 0$), y de hecho $\frac{1}{x} = 0$ no tiene solución.
  <!-- feedback: Correcto. Sin continuidad en todo el intervalo el teorema no aplica, y una fracción con numerador 1 nunca vale 0. -->
- [ ] C) Es incorrecto: la raíz es $c = 0$.
  <!-- feedback: Incorrecto. $f(0)$ no existe porque se dividiría entre 0; 0 no puede ser raíz. -->
- [ ] D) Es incorrecto: el teorema exige que $f(-1) = f(1)$.
  <!-- feedback: Incorrecto. El teorema pide continuidad en $[a, b]$ y un valor entre $f(a)$ y $f(b)$; no exige que los extremos sean iguales. -->

### Explicacion Pedagogica
El teorema del valor intermedio tiene una hipótesis esencial: continuidad en todo $[a, b]$. $f(x) = \frac{1}{x}$ tiene discontinuidad infinita en $x = 0$, dentro de $[-1, 1]$, por lo que el teorema no se puede usar. Además $\frac{1}{x} = 0$ no tiene solución, lo que confirma que la conclusión de Santiago es falsa.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.54
**Contexto:** Una empresa de mensajería en Colombia cobra por peso $w$ (kg): 8 000 pesos si $0 < w \le 1$, 12 000 si $1 < w \le 3$ y 15 000 si $3 < w \le 5$.

### Enunciado
¿Dónde es discontinua la tarifa y de cuánto es el salto en $w = 1$ kg?

### Opciones
- [ ] A) Es continua en todo $(0, 5]$, porque está definida para cada peso.
  <!-- feedback: Incorrecto. Estar definida no basta; en 1 y en 3 los laterales difieren y el límite no existe. -->
- [ ] B) En 1 y en 3 kg; el salto en 1 kg es de 12 000 pesos.
  <!-- feedback: Incorrecto. 12 000 es la tarifa después del salto; el salto es la diferencia $12\,000 - 8\,000 = 4\,000$. -->
- [x] C) En 1 y en 3 kg; el salto en 1 kg es de 4 000 pesos.
  <!-- feedback: Correcto. En 1 la tarifa pasa de 8 000 a 12 000 y en 3 de 12 000 a 15 000: dos discontinuidades de salto. -->
- [ ] D) Solo en 3 kg, con salto de 3 000 pesos.
  <!-- feedback: Incorrecto. En 3 sí hay salto de 3 000, pero también en 1 kg, donde la tarifa pasa de 8 000 a 12 000. -->

### Explicacion Pedagogica
En $w = 1$: $\lim_{w \to 1^-} T = 8\,000$ y $\lim_{w \to 1^+} T = 12\,000$, salto de 4 000. En $w = 3$: de 12 000 a 15 000, salto de 3 000. Dentro de cada tramo la tarifa es constante, por lo tanto continua. Las únicas discontinuidades, ambas de salto, están en 1 y 3 kg.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.52
**Contexto:** En un curso de la Universidad Nacional en Bogotá se estudia la función $g(x) = \frac{|x - 2|}{x - 2}$ y se discute si puede "repararse" en $x = 2$.

### Enunciado
¿Cuál afirmación es verdadera?

### Opciones
- [ ] A) Se vuelve continua definiendo $g(2) = 0$.
  <!-- feedback: Incorrecto. Redefinir un punto solo repara discontinuidades removibles; aquí el límite en 2 no existe porque los laterales son $-1$ y 1. -->
- [ ] B) Tiene una asíntota vertical en $x = 2$.
  <!-- feedback: Incorrecto. $g$ solo toma los valores $-1$ y 1; no crece sin límite cerca de 2. -->
- [x] C) Sus límites laterales en 2 son $-1$ y 1, así que ninguna redefinición de $g(2)$ la hace continua.
  <!-- feedback: Correcto. Es una discontinuidad de salto: el límite no existe, y la continuidad exige que exista. -->
- [ ] D) Es continua en todos los reales.
  <!-- feedback: Incorrecto. $g(2)$ no está definida (denominador 0) y además los laterales no coinciden. -->

### Explicacion Pedagogica
Para $x > 2$, $|x - 2| = x - 2$ y $g(x) = 1$; para $x < 2$, $|x - 2| = -(x - 2)$ y $g(x) = -1$. Como $\lim_{x \to 2^-} g = -1 \neq 1 = \lim_{x \to 2^+} g$, el límite no existe: la discontinuidad es de salto (de tamaño 2) y no se elimina asignando ningún valor a $g(2)$.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.50
**Contexto:** Un equipo de la Universidad del Norte en Barranquilla aplica bisección a $f(x) = x^3 - 4x + 1$ en $[0, 1]$: $f(0) = 1$, $f(1) = -2$ y en el punto medio $f(0{,}5) = -0{,}875$.

### Enunciado
¿En qué intervalo debe continuar la búsqueda de la raíz?

### Opciones
- [x] A) $[0;\ 0{,}5]$
  <!-- feedback: Correcto. $f(0) = 1 > 0$ y $f(0{,}5) = -0{,}875 < 0$: el cambio de signo, y por continuidad la raíz, está en esa mitad. -->
- [ ] B) $[0{,}5;\ 1]$
  <!-- feedback: Incorrecto. $f(0{,}5) = -0{,}875$ y $f(1) = -2$ tienen el mismo signo; en esa mitad no se garantiza raíz. -->
- [ ] C) No se puede concluir, porque $f(0{,}5)$ no es 0.
  <!-- feedback: Incorrecto. Que el punto medio no sea raíz es lo esperado; el signo de $f(0{,}5)$ indica en qué mitad hay cambio de signo. -->
- [ ] D) La raíz es exactamente 0,5.
  <!-- feedback: Incorrecto. $f(0{,}5) = 0{,}125 - 2 + 1 = -0{,}875 \neq 0$, así que 0,5 no es raíz. -->

### Explicacion Pedagogica
La bisección se basa en el teorema del valor intermedio: $f$ es continua (polinomio). Se evalúa el punto medio: $f(0{,}5) = 0{,}125 - 2 + 1 = -0{,}875$. Como $f(0) > 0$ y $f(0{,}5) < 0$, hay raíz en $(0;\ 0{,}5)$. En efecto, la raíz está cerca de $x \approx 0{,}254$.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.48
**Contexto:** Una plataforma de taxis en Medellín define la tarifa $T(d) = 5\,000$ si $0 < d \le 2$; $T(d) = 5\,000 + 1\,200(d - 2)$ si $2 < d \le 10$; y $T(d) = m + 1\,000(d - 10)$ si $d > 10$, con $d$ en km.

### Enunciado
¿Qué valor de $m$ hace que la tarifa sea continua en $d = 10$ km?

### Opciones
- [ ] A) 17 000 pesos
  <!-- feedback: Incorrecto. Se calculó $5\,000 + 1\,200 \cdot 10$, cobrando los primeros 2 km dos veces; el tramo variable usa $d - 2 = 8$. -->
- [x] B) 14 600 pesos
  <!-- feedback: Correcto. Por la izquierda en 10: $5\,000 + 1\,200 \cdot 8 = 14\,600$; por la derecha el valor tiende a $m$, así que $m = 14\,600$. -->
- [ ] C) 9 600 pesos
  <!-- feedback: Incorrecto. Solo se tomó el cobro por kilómetro $1\,200 \cdot 8$; faltó sumar los 5 000 del banderazo. -->
- [ ] D) 6 200 pesos
  <!-- feedback: Incorrecto. Se usó $5\,000 + 1\,200$, como si solo se hubiera recorrido un km adicional; hasta 10 km hay 8 km adicionales. -->

### Explicacion Pedagogica
Continuidad en 10 exige que el valor del segundo tramo en 10 coincida con el límite del tercero. Segundo tramo: $T(10) = 5\,000 + 1\,200(10 - 2) = 14\,600$. Tercer tramo: $\lim_{d \to 10^+} [m + 1\,000(d - 10)] = m$. Igualando, $m = 14\,600$ pesos.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.47
**Contexto:** Un sistema de riego en el Valle del Cauca mide la humedad $h(t)$, continua en $[1, 5]$ horas, con $h(1) = -3$ y $h(5) = 4$ (desviación respecto al nivel ideal).

### Enunciado
¿Cuál afirmación es necesariamente cierta?

### Opciones
- [x] A) Existe un $t$ en $(1, 5)$ con $h(t) = 2$.
  <!-- feedback: Correcto. 2 está entre $-3$ y 4, y el teorema del valor intermedio garantiza que la función continua toma ese valor. -->
- [ ] B) $h$ tiene exactamente un cero en $(1, 5)$.
  <!-- feedback: Incorrecto. El teorema garantiza al menos un cero, no exactamente uno; $h$ podría cruzar el 0 tres veces. -->
- [ ] C) $h$ es creciente en $[1, 5]$.
  <!-- feedback: Incorrecto. Que $h(5) > h(1)$ no implica crecimiento en todo el intervalo; $h$ podría bajar y luego subir. -->
- [ ] D) $h(3) = 0{,}5$.
  <!-- feedback: Incorrecto. 0,5 es el promedio de $-3$ y 4, pero la continuidad no fija el valor en el punto medio del intervalo. -->

### Explicacion Pedagogica
El teorema del valor intermedio: si $h$ es continua en $[1, 5]$, toma todo valor entre $h(1) = -3$ y $h(5) = 4$. Como $-3 < 2 < 4$, existe $t$ en $(1, 5)$ con $h(t) = 2$. El teorema garantiza existencia, no unicidad, monotonía ni valores en puntos específicos.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W04-continuidad-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.45
**Contexto:** El acueducto de Neiva evalúa dos tarifas por consumo $x$ (m³): $T_1(x) = 2\,800x$ si $x \le 20$ y $T_1(x) = 3\,500x$ si $x > 20$; $T_2(x) = 2\,800x$ si $x \le 20$ y $T_2(x) = 56\,000 + 3\,500(x - 20)$ si $x > 20$.

### Enunciado
¿Cuál evaluación de las tarifas es correcta?

### Opciones
- [x] A) $T_2$ es continua; $T_1$ salta 14 000 pesos en 20 m³, de modo que pasar de 20 a 20,1 m³ encarece mucho la factura.
  <!-- feedback: Correcto. $T_1$: izquierda 56 000 y derecha 70 000. $T_2$: ambos lados dan 56 000 en 20 m³. -->
- [ ] B) Ambas son continuas, porque cada tramo es lineal.
  <!-- feedback: Incorrecto. Tramos lineales no garantizan continuidad; en $T_1$, $3\,500 \cdot 20 = 70\,000 \neq 56\,000$. -->
- [ ] C) $T_1$ es continua y $T_2$ tiene un salto en 20 m³.
  <!-- feedback: Incorrecto. Es al revés: el segundo tramo de $T_2$ empieza en $56\,000 = 2\,800 \cdot 20$, mientras $T_1$ salta de 56 000 a 70 000. -->
- [ ] D) Ambas tienen un salto de 700 pesos en 20 m³.
  <!-- feedback: Incorrecto. 700 es la diferencia de precio por m³; en $T_1$ el salto en el valor es $20 \cdot 700 = 14\,000$ y en $T_2$ no hay salto. -->

### Explicacion Pedagogica
En $x = 20$: $T_1(20) = 56\,000$ y $\lim_{x \to 20^+} 3\,500x = 70\,000$, salto de 14 000. $T_2(20) = 56\,000$ y $\lim_{x \to 20^+} [56\,000 + 3\,500(x - 20)] = 56\,000$, continua. Una tarifa continua cobra el precio alto solo sobre el exceso, mientras $T_1$ lo aplica a todo el consumo.
