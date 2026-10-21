---
id: "AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle"
country: "argentina"
grado: 11
asignatura: "matematica"
tema: "polinomios-factorizacion"
periodo: "weekly"
week: "W17"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "NAP Argentina 2026 / Aprender"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# Bundle MASTERY: Polinomios y Factorización - Grado 11

Veinte ítems sobre operaciones con polinomios, teoremas del resto y del factor, Ruffini, Gauss, casos de factoreo, multiplicidad de raíces y signo de un polinomio.

## Question 1 [D3-D4]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v1
**Bloom:** Remember
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.85
**Contexto:** En una cátedra de ingeniería de Rosario se modela la deformación de una viga con el polinomio $P(x) = -3x^4 + 2x^5 - x + 7$.

### Enunciado
¿Cuál es el grado de $P(x)$ y cuál es su coeficiente principal?

### Opciones
- [ ] A) Grado 4 y coeficiente principal $-3$
  <!-- feedback: Incorrecto. Se tomó el primer término escrito, $-3x^4$, como término principal; el grado lo da el mayor exponente, que es 5 en $2x^5$. -->
- [ ] B) Grado 5 y coeficiente principal $-3$
  <!-- feedback: Incorrecto. El grado 5 es correcto, pero el coeficiente principal es el que acompaña a $x^5$, es decir 2, no el del primer término escrito. -->
- [ ] C) Grado 4 y coeficiente principal $2$
  <!-- feedback: Incorrecto. El coeficiente 2 corresponde a $x^5$, así que el grado no puede ser 4: el mayor exponente presente es 5. -->
- [x] D) Grado 5 y coeficiente principal $2$
  <!-- feedback: Correcto. El término de mayor exponente es $2x^5$; su exponente 5 define el grado y su coeficiente 2 es el coeficiente principal. -->

### Explicacion Pedagogica
Para leer un polinomio conviene ordenarlo de mayor a menor exponente: $P(x) = 2x^5 - 3x^4 - x + 7$. El término de mayor grado es $2x^5$, por lo tanto el grado es 5 y el coeficiente principal es 2. El orden en que aparecen los términos en el enunciado no cambia esto.

## Question 2 [D3-D4]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v2
**Bloom:** Remember
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.84
**Contexto:** Una empresa de Córdoba describe el costo de un proceso con $P(x) = x^3 - 2x^2 + 5x - 4$ y necesita el resto de dividirlo por $(x - 2)$.

### Enunciado
Según el teorema del resto, ¿cuál es el resto de la división $P(x) : (x - 2)$?

### Opciones
- [ ] A) $-30$
  <!-- feedback: Incorrecto. Ese número es $P(-2) = -8 - 8 - 10 - 4$: se evaluó en $-2$ en lugar de en la raíz de $x - 2$, que es $x = 2$. -->
- [ ] B) $0$
  <!-- feedback: Incorrecto. El resto sería 0 solo si $x = 2$ fuera raíz de $P$; como $P(2) = 6 \neq 0$, $(x - 2)$ no es factor. -->
- [ ] C) $-4$
  <!-- feedback: Incorrecto. $-4$ es el término independiente, que coincide con $P(0)$, no con $P(2)$; el resto se obtiene evaluando en $x = 2$. -->
- [x] D) $6$
  <!-- feedback: Correcto. Por el teorema del resto, el resto es $P(2) = 8 - 8 + 10 - 4 = 6$. -->

### Explicacion Pedagogica
El teorema del resto dice que el resto de dividir $P(x)$ por $(x - a)$ es $P(a)$. Aquí $a = 2$: $P(2) = 2^3 - 2 \cdot 2^2 + 5 \cdot 2 - 4 = 8 - 8 + 10 - 4 = 6$. No hace falta hacer la división completa para conocer el resto.

## Question 3 [D3-D4]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v3
**Bloom:** Understand
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.82
**Contexto:** En un taller de matemática de una escuela de Salta se estudia un polinomio $P(x)$ del que solo se sabe que $P(3) = 0$.

### Enunciado
¿Qué se puede afirmar con certeza a partir de $P(3) = 0$?

### Opciones
- [ ] A) $(x + 3)$ es un factor de $P(x)$.
  <!-- feedback: Incorrecto. Si $P(3)=0$ el factor asociado es $(x - 3)$; el factor $(x + 3)$ correspondería a $P(-3) = 0$. -->
- [ ] B) El término independiente de $P(x)$ es 3.
  <!-- feedback: Incorrecto. El término independiente es $P(0)$, que no tiene relación directa con que 3 sea raíz. -->
- [x] C) $(x - 3)$ es un factor de $P(x)$.
  <!-- feedback: Correcto. Por el teorema del factor, $P(a) = 0$ equivale a que $(x - a)$ divide a $P(x)$; con $a = 3$ el factor es $(x - 3)$. -->
- [ ] D) $P(x)$ es de grado 3.
  <!-- feedback: Incorrecto. Que 3 sea raíz no informa el grado: polinomios de cualquier grado mayor o igual a 1 pueden anularse en $x = 3$. -->

### Explicacion Pedagogica
El teorema del factor afirma que $x = a$ es raíz de $P$ si y solo si $(x - a)$ es factor de $P(x)$, es decir, $P(x) = (x - a) \cdot Q(x)$ con resto 0. Como $P(3) = 0$, se puede escribir $P(x) = (x - 3) \cdot Q(x)$. Nada se deduce sobre el grado ni sobre el término independiente.

## Question 4 [D3-D4]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v4
**Bloom:** Understand
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.80
**Contexto:** Para diseñar el volumen de un tanque en Mendoza se trabaja con $P(x) = 2x^3 - x^2 + 4x - 3$ y se buscan sus posibles raíces racionales.

### Enunciado
Según el teorema de Gauss, ¿cuál es el conjunto de candidatas a raíces racionales de $P(x)$?

### Opciones
- [ ] A) $\pm 1, \pm 2, \pm \frac{1}{3}, \pm \frac{2}{3}$
  <!-- feedback: Incorrecto. Se invirtieron los roles: los numeradores deben ser divisores del término independiente $-3$ y los denominadores divisores del coeficiente principal 2. -->
- [x] B) $\pm 1, \pm 3, \pm \frac{1}{2}, \pm \frac{3}{2}$
  <!-- feedback: Correcto. Las candidatas son $\frac{p}{q}$ con $p$ divisor de $-3$ ($\pm 1, \pm 3$) y $q$ divisor de 2 ($1, 2$). -->
- [ ] C) Solo $\pm 1, \pm 3$
  <!-- feedback: Incorrecto. Esas son las candidatas enteras; como el coeficiente principal es 2, también hay que dividir por 2 y aparecen $\pm \frac{1}{2}$ y $\pm \frac{3}{2}$. -->
- [ ] D) $\pm 1, \pm 2, \pm 3, \pm 6$
  <!-- feedback: Incorrecto. Se usaron los divisores de 6 (producto $2 \cdot 3$), pero Gauss pide cocientes $\frac{p}{q}$, no divisores del producto de los coeficientes. -->

### Explicacion Pedagogica
El teorema de Gauss dice que si $\frac{p}{q}$ (fracción irreducible) es raíz de un polinomio con coeficientes enteros, entonces $p$ divide al término independiente y $q$ divide al coeficiente principal. Divisores de $-3$: $\pm 1, \pm 3$; divisores de 2: $1, 2$. Las candidatas son $\pm 1, \pm 3, \pm \frac{1}{2}, \pm \frac{3}{2}$; después hay que probar cuáles anulan a $P$.

## Question 5 [D5-D6]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v5
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.76
**Contexto:** En un loteo de Villa Carlos Paz, el largo de un terreno es $x^2 - 3x + 1$ y el ancho es $2x - 1$ (en decámetros).

### Enunciado
¿Cuál es el polinomio que expresa el área del terreno, $(x^2 - 3x + 1)(2x - 1)$?

### Opciones
- [x] A) $2x^3 - 7x^2 + 5x - 1$
  <!-- feedback: Correcto. Distribuyendo: $2x^3 - x^2 - 6x^2 + 3x + 2x - 1 = 2x^3 - 7x^2 + 5x - 1$. -->
- [ ] B) $2x^3 - 7x^2 + 5x + 1$
  <!-- feedback: Incorrecto. El término independiente es $1 \cdot (-1) = -1$; se cometió un error de signo al multiplicar las constantes. -->
- [ ] C) $2x^3 - 6x^2 + 5x - 1$
  <!-- feedback: Incorrecto. Se olvidó el producto $x^2 \cdot (-1) = -x^2$, que sumado a $-6x^2$ da $-7x^2$. -->
- [ ] D) $2x^3 - 7x^2 + x - 1$
  <!-- feedback: Incorrecto. En el término lineal hay que sumar $(-3x)(-1) = 3x$ y $1 \cdot 2x = 2x$, que dan $5x$; se restaron en vez de sumarse. -->

### Explicacion Pedagogica
Se multiplica cada término del primer factor por cada término del segundo: $x^2 \cdot 2x = 2x^3$, $x^2 \cdot (-1) = -x^2$, $-3x \cdot 2x = -6x^2$, $-3x \cdot (-1) = 3x$, $1 \cdot 2x = 2x$, $1 \cdot (-1) = -1$. Agrupando términos semejantes: $2x^3 - 7x^2 + 5x - 1$.

## Question 6 [D5-D6]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v6
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.74
**Contexto:** Un estudiante de La Plata usa la regla de Ruffini para dividir $P(x) = x^3 - 4x^2 + x + 6$ por $(x - 2)$.

### Enunciado
¿Cuáles son el cociente y el resto de esa división?

### Opciones
- [x] A) Cociente $x^2 - 2x - 3$ y resto $0$
  <!-- feedback: Correcto. Con coeficientes $1, -4, 1, 6$ y el valor 2 se obtienen $1, -2, -3$ y resto $0$. -->
- [ ] B) Cociente $x^2 - 6x + 13$ y resto $-20$
  <!-- feedback: Incorrecto. Ese resultado sale de usar $-2$ en Ruffini, que corresponde a dividir por $(x + 2)$, no por $(x - 2)$. -->
- [ ] C) Cociente $x^2 - 2x - 3$ y resto $6$
  <!-- feedback: Incorrecto. El cociente es correcto, pero el resto es $6 + 2 \cdot (-3) = 0$; se copió el término independiente sin operar. -->
- [ ] D) Cociente $x^3 - 2x^2 - 3x$ y resto $0$
  <!-- feedback: Incorrecto. Al dividir un polinomio de grado 3 por uno de grado 1, el cociente es de grado 2; se subió un grado a cada término. -->

### Explicacion Pedagogica
Ruffini con $a = 2$ y coeficientes $1, -4, 1, 6$: bajamos el 1; $1 \cdot 2 = 2$, $-4 + 2 = -2$; $-2 \cdot 2 = -4$, $1 - 4 = -3$; $-3 \cdot 2 = -6$, $6 - 6 = 0$. El cociente es $x^2 - 2x - 3$ y el resto es 0, lo que confirma que $x = 2$ es raíz.

## Question 7 [D5-D6]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v7
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.72
**Contexto:** Un programador de Neuquén ajusta el parámetro $k$ del polinomio $P(x) = 2x^3 + kx^2 - 5x + 3$ que usa en una simulación.

### Enunciado
¿Qué valor de $k$ hace que $(x + 1)$ sea factor de $P(x)$?

### Opciones
- [ ] A) $k = 6$
  <!-- feedback: Incorrecto. Al despejar $k + 6 = 0$ se perdió el signo: la solución es $k = -6$, no $6$. -->
- [x] B) $k = -6$
  <!-- feedback: Correcto. Se necesita $P(-1) = 0$: $-2 + k + 5 + 3 = k + 6 = 0$, luego $k = -6$. -->
- [ ] C) $k = 4$
  <!-- feedback: Incorrecto. Se evaluó mal $-5x$ en $x = -1$: $-5 \cdot (-1) = +5$, no $-5$; con el signo correcto queda $k + 6 = 0$. -->
- [ ] D) $k = 0$
  <!-- feedback: Incorrecto. Ese valor sale de imponer $P(1) = 0$, que corresponde al factor $(x - 1)$, no a $(x + 1)$. -->

### Explicacion Pedagogica
Por el teorema del factor, $(x + 1)$ es factor si y solo si $P(-1) = 0$. Calculamos $P(-1) = 2(-1)^3 + k(-1)^2 - 5(-1) + 3 = -2 + k + 5 + 3 = k + 6$. Igualando a cero, $k = -6$. Con ese valor $P(x) = 2x^3 - 6x^2 - 5x + 3$ y efectivamente $P(-1) = 0$.

## Question 8 [D5-D6]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v8
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.70
**Contexto:** En Tucumán, el volumen de un recipiente se modela con $V(x) = x^3 - 9x$ y se quiere factorizar para hallar sus ceros.

### Enunciado
¿Cuál es la factorización completa de $x^3 - 9x$ en los reales?

### Opciones
- [ ] A) $x(x - 3)^2$
  <!-- feedback: Incorrecto. $x(x - 3)^2 = x^3 - 6x^2 + 9x$; se confundió la diferencia de cuadrados con un trinomio cuadrado perfecto. -->
- [ ] B) $(x - 3)(x + 3)$
  <!-- feedback: Incorrecto. Falta el factor común $x$: $(x - 3)(x + 3) = x^2 - 9$, que es de grado 2 y no de grado 3. -->
- [x] C) $x(x - 3)(x + 3)$
  <!-- feedback: Correcto. Primero se saca factor común $x$: $x(x^2 - 9)$, y luego $x^2 - 9$ es diferencia de cuadrados $(x - 3)(x + 3)$. -->
- [ ] D) $x(x - \sqrt{3})(x + \sqrt{3})$
  <!-- feedback: Incorrecto. Ese producto da $x(x^2 - 3)$; la raíz cuadrada de 9 es 3, no $\sqrt{3}$. -->

### Explicacion Pedagogica
Se combinan dos casos de factoreo. Factor común: $x^3 - 9x = x(x^2 - 9)$. Diferencia de cuadrados: $x^2 - 9 = (x - 3)(x + 3)$. Resultado: $x(x - 3)(x + 3)$, con ceros $x = 0$, $x = 3$ y $x = -3$.

## Question 9 [D5-D6]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v9
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.68
**Contexto:** Un ceramista de San Juan sabe que el área de una baldosa cuadrada es $4x^2 - 12x + 9$ (en dm²) y quiere expresar su lado.

### Enunciado
¿Cuál es la factorización de $4x^2 - 12x + 9$?

### Opciones
- [ ] A) $(4x - 3)^2$
  <!-- feedback: Incorrecto. $(4x - 3)^2 = 16x^2 - 24x + 9$; la base del primer cuadrado es $\sqrt{4x^2} = 2x$, no $4x$. -->
- [ ] B) $(2x + 3)^2$
  <!-- feedback: Incorrecto. $(2x + 3)^2 = 4x^2 + 12x + 9$; el doble producto es negativo, así que el binomio lleva signo menos. -->
- [ ] C) $(2x - 3)(2x + 3)$
  <!-- feedback: Incorrecto. Ese producto es una diferencia de cuadrados, $4x^2 - 9$, y no tiene término lineal. -->
- [x] D) $(2x - 3)^2$
  <!-- feedback: Correcto. Es un trinomio cuadrado perfecto: $(2x)^2 - 2 \cdot 2x \cdot 3 + 3^2 = 4x^2 - 12x + 9$. -->

### Explicacion Pedagogica
Para reconocer un trinomio cuadrado perfecto se buscan dos cuadrados, $4x^2 = (2x)^2$ y $9 = 3^2$, y se verifica el doble producto: $2 \cdot 2x \cdot 3 = 12x$. Como el término lineal es $-12x$, el binomio es $(2x - 3)$ y $4x^2 - 12x + 9 = (2x - 3)^2$. El lado de la baldosa es $2x - 3$ dm.

## Question 10 [D5-D6]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v10
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.66
**Contexto:** En una olimpíada de matemática de Santa Fe se pide factorizar $x^3 + 2x^2 - 4x - 8$ por grupos.

### Enunciado
¿Cuál es la factorización completa?

### Opciones
- [ ] A) $(x + 2)(x^2 + 4)$
  <!-- feedback: Incorrecto. Al agrupar, el segundo grupo es $-4(x + 2)$, por eso queda $(x + 2)(x^2 - 4)$; se cambió el signo de $-4$. -->
- [ ] B) $(x - 2)^2(x + 2)$
  <!-- feedback: Incorrecto. $(x - 2)^2(x + 2) = x^3 - 2x^2 - 4x + 8$; se intercambiaron las multiplicidades de las raíces $2$ y $-2$. -->
- [x] C) $(x + 2)^2(x - 2)$
  <!-- feedback: Correcto. $x^2(x + 2) - 4(x + 2) = (x + 2)(x^2 - 4) = (x + 2)(x + 2)(x - 2)$. -->
- [ ] D) $(x + 2)(x - 2)(x + 4)$
  <!-- feedback: Incorrecto. Ese producto da $x^3 + 4x^2 - 4x - 16$; el tercer factor no sale de ningún agrupamiento correcto. -->

### Explicacion Pedagogica
Agrupamos: $(x^3 + 2x^2) + (-4x - 8) = x^2(x + 2) - 4(x + 2)$. Sacamos factor común $(x + 2)$: $(x + 2)(x^2 - 4)$. Por diferencia de cuadrados $x^2 - 4 = (x - 2)(x + 2)$, así que el resultado es $(x + 2)^2(x - 2)$: raíz $-2$ doble y raíz $2$ simple.

## Question 11 [D7-D8]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v11
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.62
**Contexto:** Un equipo del Instituto Balseiro en Bariloche grafica $P(x) = (x - 1)^3 (x + 2)^2 (x - 4)$ para estudiar su comportamiento cerca de las raíces.

### Enunciado
¿Qué afirmación sobre el gráfico de $P$ es correcta?

### Opciones
- [ ] A) $P$ tiene 6 raíces reales distintas.
  <!-- feedback: Incorrecto. El grado es $3 + 2 + 1 = 6$, pero las raíces distintas son solo tres: $1$, $-2$ y $4$; las demás son repeticiones por multiplicidad. -->
- [ ] B) En $x = -2$ el gráfico atraviesa el eje $x$.
  <!-- feedback: Incorrecto. La raíz $-2$ tiene multiplicidad 2 (par), así que el factor $(x + 2)^2$ no cambia de signo y el gráfico solo toca el eje. -->
- [ ] C) En $x = 1$ el gráfico toca el eje sin atravesarlo.
  <!-- feedback: Incorrecto. La multiplicidad de $x = 1$ es 3 (impar), por lo que $(x - 1)^3$ sí cambia de signo y el gráfico atraviesa el eje. -->
- [x] D) En $x = -2$ el gráfico toca el eje sin atravesarlo y en $x = 1$ lo atraviesa.
  <!-- feedback: Correcto. Multiplicidad par (2 en $x = -2$) implica rebote sin cambio de signo; multiplicidad impar (3 en $x = 1$) implica cruce. -->

### Explicacion Pedagogica
La multiplicidad de una raíz indica cuántas veces aparece su factor. Si es impar, el factor cambia de signo y el gráfico cruza el eje; si es par, el factor no cambia de signo y el gráfico rebota. Aquí $x = 1$ (multiplicidad 3) y $x = 4$ (multiplicidad 1) se cruzan, mientras que en $x = -2$ (multiplicidad 2) el gráfico toca el eje y vuelve.

## Question 12 [D7-D8]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v12
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.60
**Contexto:** Una fábrica de cajas de Córdoba modela un volumen con $P(x) = x^3 - 2x^2 - 5x + 6$ y necesita todos sus ceros.

### Enunciado
Usando Gauss y Ruffini, ¿cuáles son las raíces de $P(x)$?

### Opciones
- [ ] A) $1$, $2$ y $-3$
  <!-- feedback: Incorrecto. $P(2) = 8 - 8 - 10 + 6 = -4 \neq 0$, así que 2 no es raíz; se invirtieron los signos de las raíces $-2$ y $3$. -->
- [x] B) $1$, $-2$ y $3$
  <!-- feedback: Correcto. $P(1) = 0$; con Ruffini queda $x^2 - x - 6 = (x - 3)(x + 2)$, que da las raíces $3$ y $-2$. -->
- [ ] C) $-1$, $2$ y $-3$
  <!-- feedback: Incorrecto. $P(-1) = -1 - 2 + 5 + 6 = 8 \neq 0$; esos valores son los opuestos de las raíces verdaderas. -->
- [ ] D) $1$, $2$ y $3$
  <!-- feedback: Incorrecto. El producto de las raíces debe ser $-6$ (opuesto del término independiente); $1 \cdot 2 \cdot 3 = 6$ tiene el signo equivocado. -->

### Explicacion Pedagogica
Candidatas de Gauss: divisores de 6, es decir $\pm 1, \pm 2, \pm 3, \pm 6$. Se prueba $P(1) = 1 - 2 - 5 + 6 = 0$. Ruffini con 1 sobre $1, -2, -5, 6$ da $1, -1, -6$ y resto 0, o sea $x^2 - x - 6 = (x - 3)(x + 2)$. Las raíces son $1$, $-2$ y $3$.

## Question 13 [D7-D8]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v13
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.58
**Contexto:** Una bodega de Mendoza modela su ganancia (en millones de ARS) con $G(x) = (x + 1)(x - 2)(x - 5)$, donde $G < 0$ significa pérdida.

### Enunciado
¿Para qué valores de $x$ el polinomio $G(x)$ es negativo?

### Opciones
- [ ] A) $(-1, 2) \cup (5, \infty)$
  <!-- feedback: Incorrecto. Esos son los intervalos donde $G > 0$: por ejemplo $G(0) = 1 \cdot (-2) \cdot (-5) = 10 > 0$. -->
- [x] B) $(-\infty, -1) \cup (2, 5)$
  <!-- feedback: Correcto. Con raíces simples $-1$, $2$ y $5$ y coeficiente principal positivo, el signo es $-, +, -, +$; es negativo en $(-\infty, -1)$ y en $(2, 5)$. -->
- [ ] C) Solo $(2, 5)$
  <!-- feedback: Incorrecto. Falta el intervalo $(-\infty, -1)$: allí los tres factores son negativos y su producto también, por ejemplo $G(-2) = -28$. -->
- [ ] D) Solo $(-\infty, -1)$
  <!-- feedback: Incorrecto. Falta el intervalo $(2, 5)$: por ejemplo $G(3) = 4 \cdot 1 \cdot (-2) = -8 < 0$. -->

### Explicacion Pedagogica
Las raíces $-1$, $2$ y $5$ dividen la recta en cuatro intervalos. Con un valor de prueba en cada uno: $G(-2) = -28 < 0$, $G(0) = 10 > 0$, $G(3) = -8 < 0$, $G(6) = 28 > 0$. Por lo tanto $G(x) < 0$ en $(-\infty, -1) \cup (2, 5)$.

## Question 14 [D7-D8]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v14
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.56
**Contexto:** Lucas, de Paraná, dividió $P(x) = x^3 + 2x - 1$ por $(x - 1)$ con Ruffini usando los coeficientes $1, 2, -1$ y obtuvo cociente $x + 3$ y resto 2.

### Enunciado
¿Qué error cometió Lucas?

### Opciones
- [x] A) Omitió el coeficiente 0 del término $x^2$; el cociente correcto es $x^2 + x + 3$.
  <!-- feedback: Correcto. Ruffini exige todos los coeficientes en orden: $1, 0, 2, -1$; así se obtiene $1, 1, 3$ y resto 2. -->
- [ ] B) Debía usar $-1$ en Ruffini porque el divisor es $(x - 1)$.
  <!-- feedback: Incorrecto. Para dividir por $(x - a)$ se usa $a$; con $(x - 1)$ el número que va en Ruffini es $1$, no $-1$. -->
- [ ] C) El resto debería ser 0 porque se divide por un binomio.
  <!-- feedback: Incorrecto. El resto es $P(1) = 1 + 2 - 1 = 2$; solo es 0 cuando 1 es raíz, y no lo es. -->
- [ ] D) No cometió ningún error: el cociente y el resto son correctos.
  <!-- feedback: Incorrecto. Un cociente de grado 1 no puede salir de dividir un polinomio de grado 3 por uno de grado 1: el grado del cociente debe ser 2. -->

### Explicacion Pedagogica
Al aplicar Ruffini hay que completar el polinomio con ceros: $x^3 + 0x^2 + 2x - 1$. Con $a = 1$: bajamos 1; $0 + 1 = 1$; $2 + 1 = 3$; $-1 + 3 = 2$. Cociente $x^2 + x + 3$, resto 2. Lucas obtuvo el resto bien de casualidad, pero su cociente tiene un grado menos del debido.

## Question 15 [D7-D8]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v15
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.54
**Contexto:** En un laboratorio de Bahía Blanca se busca un polinomio de grado 3 con raíces $2$, $-1$ y $3$ que cumpla $P(0) = 12$.

### Enunciado
¿Cuál es ese polinomio?

### Opciones
- [ ] A) $P(x) = (x - 2)(x + 1)(x - 3)$
  <!-- feedback: Incorrecto. Tiene las raíces pedidas pero $P(0) = (-2)(1)(-3) = 6 \neq 12$; falta el coeficiente principal. -->
- [x] B) $P(x) = 2(x - 2)(x + 1)(x - 3)$
  <!-- feedback: Correcto. Con $P(x) = a(x - 2)(x + 1)(x - 3)$, $P(0) = 6a = 12$ da $a = 2$. -->
- [ ] C) $P(x) = 2(x + 2)(x - 1)(x + 3)$
  <!-- feedback: Incorrecto. Sus raíces son $-2$, $1$ y $-3$ (signos invertidos) y además $P(0) = 2 \cdot 2 \cdot (-1) \cdot 3 = -12$. -->
- [ ] D) $P(x) = 12(x - 2)(x + 1)(x - 3)$
  <!-- feedback: Incorrecto. Se usó $a = 12$ sin tener en cuenta que el producto de los factores en $x = 0$ ya vale 6; así $P(0) = 72$. -->

### Explicacion Pedagogica
Un polinomio de grado 3 con raíces $2$, $-1$ y $3$ tiene la forma $P(x) = a(x - 2)(x + 1)(x - 3)$. Evaluando en 0: $P(0) = a \cdot (-2) \cdot 1 \cdot (-3) = 6a$. La condición $6a = 12$ da $a = 2$, de modo que $P(x) = 2(x - 2)(x + 1)(x - 3)$.

## Question 16 [D7-D8]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v16
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.52
**Contexto:** Un polinomio $P(x)$ usado en un sistema de riego de San Rafael deja resto 3 al dividirlo por $(x - 1)$ y resto $-6$ al dividirlo por $(x + 2)$.

### Enunciado
¿Cuál es el resto de dividir $P(x)$ por $(x - 1)(x + 2)$?

### Opciones
- [ ] A) $-18$
  <!-- feedback: Incorrecto. Se multiplicaron los dos restos; el resto de dividir por un polinomio de grado 2 es de la forma $ax + b$ y debe cumplir las dos condiciones. -->
- [ ] B) $3x - 6$
  <!-- feedback: Incorrecto. En $x = 1$ ese resto vale $-3$, no $3$; se sumaron los restos dados como si fueran coeficientes. -->
- [ ] C) $-3x$
  <!-- feedback: Incorrecto. En $x = 1$ vale $-3$ en lugar de $3$; hay un error de signo al despejar $a$. -->
- [x] D) $3x$
  <!-- feedback: Correcto. El resto $R(x) = ax + b$ cumple $R(1) = 3$ y $R(-2) = -6$: $a + b = 3$, $-2a + b = -6$, de donde $a = 3$ y $b = 0$. -->

### Explicacion Pedagogica
Al dividir por un polinomio de grado 2 el resto tiene grado menor que 2: $P(x) = (x - 1)(x + 2)Q(x) + ax + b$. Por el teorema del resto, $P(1) = a + b = 3$ y $P(-2) = -2a + b = -6$. Restando: $3a = 9$, $a = 3$ y $b = 0$. El resto es $3x$.

## Question 17 [D9-D10]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.50
**Contexto:** Valentina, estudiante de Ushuaia, analiza el polinomio bicuadrado $P(x) = x^4 - 5x^2 + 4$ y hace varias afirmaciones.

### Enunciado
¿Cuál de las siguientes afirmaciones sobre $P(x)$ es correcta?

### Opciones
- [ ] A) No tiene raíces reales porque todos los exponentes son pares.
  <!-- feedback: Incorrecto. Exponentes pares no impiden raíces: $P(1) = 1 - 5 + 4 = 0$, así que $x = 1$ es raíz real. -->
- [ ] B) Tiene solo dos raíces reales, $x = 1$ y $x = 4$.
  <!-- feedback: Incorrecto. Al sustituir $t = x^2$ se obtienen $t = 1$ y $t = 4$, pero luego hay que volver a $x$: $x = \pm 1$ y $x = \pm 2$. -->
- [x] C) Tiene cuatro raíces reales: $-2$, $-1$, $1$ y $2$.
  <!-- feedback: Correcto. $x^4 - 5x^2 + 4 = (x^2 - 1)(x^2 - 4) = (x - 1)(x + 1)(x - 2)(x + 2)$. -->
- [ ] D) Sus raíces son $1$ y $-1$, ambas dobles.
  <!-- feedback: Incorrecto. Raíces dobles darían $(x^2 - 1)^2 = x^4 - 2x^2 + 1$, que no es $P(x)$; las raíces son simples. -->

### Explicacion Pedagogica
Con el cambio $t = x^2$, $P$ se convierte en $t^2 - 5t + 4 = (t - 1)(t - 4)$. Volviendo a $x$: $x^2 = 1$ da $x = \pm 1$ y $x^2 = 4$ da $x = \pm 2$. La factorización completa es $(x - 1)(x + 1)(x - 2)(x + 2)$: cuatro raíces reales simples.

## Question 18 [D9-D10]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.48
**Contexto:** Martín, de Santa Rosa, afirma que el polinomio $P(x) = x^3 + x + 1$ no tiene raíces racionales.

### Enunciado
¿Cuál es la evaluación correcta de la afirmación de Martín?

### Opciones
- [x] A) Tiene razón: las únicas candidatas de Gauss son $\pm 1$ y ninguna anula a $P$; aun así $P$ tiene una raíz real irracional.
  <!-- feedback: Correcto. $P(1) = 3$ y $P(-1) = -1$, así que no hay raíces racionales; como es de grado impar, igual tiene al menos una raíz real. -->
- [ ] B) No tiene razón: $x = -1$ es raíz de $P$.
  <!-- feedback: Incorrecto. $P(-1) = -1 - 1 + 1 = -1 \neq 0$; se cometió un error de signo al evaluar. -->
- [ ] C) Tiene razón y además $P$ no tiene ninguna raíz real.
  <!-- feedback: Incorrecto. Un polinomio de grado impar siempre tiene alguna raíz real; como $P(-1) = -1 < 0 < 3 = P(1)$, hay una raíz entre $-1$ y $1$. -->
- [ ] D) No se puede saber, porque Gauss no se aplica si falta el término en $x^2$.
  <!-- feedback: Incorrecto. Gauss solo requiere coeficientes enteros; un coeficiente 0 en $x^2$ no impide aplicarlo. -->

### Explicacion Pedagogica
Por Gauss, las candidatas racionales son los cocientes de divisores de 1 por divisores de 1: solo $\pm 1$. Como $P(1) = 3$ y $P(-1) = -1$, ninguna es raíz: Martín tiene razón. Sin embargo, $P$ es de grado 3 y cambia de signo entre $-1$ y $1$, así que posee una raíz real, que necesariamente es irracional.

## Question 19 [D9-D10]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.46
**Contexto:** En un trabajo práctico de una escuela técnica de Rafaela se pide factorizar $P(x) = 2x^3 - 3x^2 - 11x + 6$.

### Enunciado
¿Cuál es la factorización correcta?

### Opciones
- [ ] A) $2(x - 3)(x - 1)(x + 2)$
  <!-- feedback: Incorrecto. Desarrollando da $2x^3 - 4x^2 - 10x + 12$; además $P(1) = -6 \neq 0$, así que 1 no es raíz. -->
- [ ] B) $(x + 3)(2x - 1)(x - 2)$
  <!-- feedback: Incorrecto. Desarrollando da $2x^3 + x^2 - 13x + 6$; los signos de las raíces $3$ y $-2$ quedaron invertidos. -->
- [x] C) $(x - 3)(2x - 1)(x + 2)$
  <!-- feedback: Correcto. $P(3) = 54 - 27 - 33 + 6 = 0$; Ruffini da $2x^2 + 3x - 2 = (2x - 1)(x + 2)$. -->
- [ ] D) $(x - 3)(2x + 1)(x - 2)$
  <!-- feedback: Incorrecto. Desarrollando da $2x^3 - 9x^2 + 7x + 6$; la cuadrática $2x^2 + 3x - 2$ se factorizó con los signos cambiados. -->

### Explicacion Pedagogica
Candidatas de Gauss: $\pm 1, \pm 2, \pm 3, \pm 6, \pm \frac{1}{2}, \pm \frac{3}{2}$. Probando, $P(3) = 0$. Ruffini con 3 sobre $2, -3, -11, 6$: $2, 3, -2$, resto 0. Luego $2x^2 + 3x - 2$ tiene raíces $\frac{1}{2}$ y $-2$, es decir $(2x - 1)(x + 2)$. Resultado: $(x - 3)(2x - 1)(x + 2)$, que al desarrollar devuelve $P(x)$.

## Question 20 [D9-D10]
**ID:** AR-MAT-11-2026-W17-polinomios-factorizacion-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.45
**Contexto:** Una fábrica de La Plata arma cajas sin tapa con una lámina de 20 cm por 12 cm, cortando cuadrados de lado $x$ en las esquinas: $V(x) = x(20 - 2x)(12 - 2x)$.

### Enunciado
¿Para qué valores de $x$ el modelo describe una caja real con volumen positivo?

### Opciones
- [x] A) $0 < x < 6$
  <!-- feedback: Correcto. Hacen falta $x > 0$, $20 - 2x > 0$ y $12 - 2x > 0$ a la vez; la condición más fuerte es $x < 6$. -->
- [ ] B) $0 < x < 10$
  <!-- feedback: Incorrecto. Para $6 < x < 10$ el ancho $12 - 2x$ es negativo, lo que no tiene sentido físico aunque se cumpla $20 - 2x > 0$. -->
- [ ] C) $x > 10$
  <!-- feedback: Incorrecto. Allí $V(x) > 0$ porque dos factores son negativos, pero ambas medidas de la base serían negativas: no hay caja real. -->
- [ ] D) $(0, 6) \cup (10, \infty)$
  <!-- feedback: Incorrecto. Ese es el conjunto donde el polinomio es positivo, pero para $x > 10$ los lados $20 - 2x$ y $12 - 2x$ son negativos y no representan medidas. -->

### Explicacion Pedagogica
El polinomio $V(x) = 4x(10 - x)(6 - x)$ es positivo en $(0, 6) \cup (10, \infty)$. Pero el problema exige además que cada dimensión sea positiva: $x > 0$, $12 - 2x > 0$ ($x < 6$) y $20 - 2x > 0$ ($x < 10$). La intersección es $0 < x < 6$; el intervalo $x > 10$ es una solución algebraica sin sentido en el contexto.
