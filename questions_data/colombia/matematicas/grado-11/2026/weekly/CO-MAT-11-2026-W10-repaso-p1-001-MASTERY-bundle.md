---
id: "CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "repaso-p1"
periodo: "weekly"
week: "W10"
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

# Bundle MASTERY: Repaso Primer Periodo - Grado 11

Veinte preguntas de repaso del primer periodo: funciones, inecuaciones, límites, continuidad, números reales, logaritmos, exponenciales, álgebra y trigonometría, en contextos colombianos.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Variacional
**Expected_Success:** 0.85
**Contexto:** En una hoja de cálculo de un colegio de Sincelejo se programa la función $f(x) = \frac{\sqrt{x - 3}}{x - 5}$ y solo se aceptan entradas para las que $f$ da un número real.

### Enunciado
¿Cuál es el dominio de $f$?

### Opciones
- [ ] A) $(3, \infty)$
  <!-- feedback: Incorrecto. Se excluyó $x = 3$ sin razón ($\sqrt{0} = 0$ es válido) y se dejó $x = 5$, donde el denominador se anula. -->
- [x] B) $[3, 5) \cup (5, \infty)$
  <!-- feedback: Correcto. La raíz exige $x - 3 \ge 0$, es decir $x \ge 3$, y el denominador exige $x \neq 5$. -->
- [ ] C) $[3, \infty)$
  <!-- feedback: Incorrecto. Se olvidó la restricción del denominador: en $x = 5$ se divide entre cero. -->
- [ ] D) $(-\infty, 3] \cup (5, \infty)$
  <!-- feedback: Incorrecto. Se invirtió la desigualdad de la raíz; para $x < 3$ el radicando $x - 3$ es negativo. -->

### Explicacion Pedagogica
Hay dos condiciones: el radicando debe ser no negativo, $x - 3 \ge 0 \Rightarrow x \ge 3$, y el denominador no puede ser cero, $x - 5 \neq 0 \Rightarrow x \neq 5$. Al intersectarlas se obtiene $[3, 5) \cup (5, \infty)$.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v2
**Bloom:** Remember
**ICFES:** Numerico
**Expected_Success:** 0.83
**Contexto:** En un concurso de matemáticas en Riohacha, los participantes deben clasificar números como racionales o irracionales.

### Enunciado
¿Cuál de los siguientes números es irracional?

### Opciones
- [ ] A) $\sqrt{49}$
  <!-- feedback: Incorrecto. $\sqrt{49} = 7$ es entero y, por tanto, racional. -->
- [ ] B) $0{,}\overline{12}$
  <!-- feedback: Incorrecto. Un decimal periódico es racional: $0{,}\overline{12} = \frac{12}{99} = \frac{4}{33}$. -->
- [x] C) $\sqrt{50}$
  <!-- feedback: Correcto. $\sqrt{50} = 5\sqrt{2}$ y $\sqrt{2}$ no puede escribirse como cociente de enteros, así que es irracional. -->
- [ ] D) $\frac{22}{7}$
  <!-- feedback: Incorrecto. Es un cociente de enteros, luego racional; solo aproxima a $\pi$, no es igual a él. -->

### Explicacion Pedagogica
Un número es racional si se puede escribir como $\frac{p}{q}$ con enteros $p, q$ y $q \neq 0$; equivalentemente, si su expansión decimal es finita o periódica. $\sqrt{49} = 7$, $0{,}\overline{12} = \frac{4}{33}$ y $\frac{22}{7}$ son racionales; $\sqrt{50} = 5\sqrt{2}$ no lo es.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Numerico
**Expected_Success:** 0.81
**Contexto:** Un técnico de sonido en Medellín simplifica cálculos de niveles con la expresión $\log_{2} 32 - \log_{2} 4$.

### Enunciado
¿Cuál es el valor de la expresión?

### Opciones
- [x] A) $3$
  <!-- feedback: Correcto. Por la propiedad del cociente, $\log_{2} 32 - \log_{2} 4 = \log_{2} \frac{32}{4} = \log_{2} 8 = 3$. -->
- [ ] B) $\log_{2} 28$
  <!-- feedback: Incorrecto. Se restaron los argumentos; la resta de logaritmos corresponde al logaritmo del cociente, no de la diferencia. -->
- [ ] C) $\frac{5}{2}$
  <!-- feedback: Incorrecto. Se dividieron los logaritmos ($\frac{5}{2}$); la propiedad convierte la resta en cociente de argumentos, no de logaritmos. -->
- [ ] D) $8$
  <!-- feedback: Incorrecto. 8 es el argumento $\frac{32}{4}$; faltó calcular $\log_{2} 8 = 3$. -->

### Explicacion Pedagogica
Como $\log_{2} 32 = 5$ (porque $2^5 = 32$) y $\log_{2} 4 = 2$, la diferencia es $5 - 2 = 3$. Lo mismo se obtiene con $\log_{b} M - \log_{b} N = \log_{b} \frac{M}{N}$: $\log_{2} 8 = 3$.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Modelacion
**Expected_Success:** 0.79
**Contexto:** En un laboratorio de la Universidad de Antioquia, un cultivo empieza con 500 bacterias y su población se duplica cada 3 horas.

### Enunciado
¿Cuántas bacterias habrá a las 12 horas?

### Opciones
- [ ] A) $500 \cdot 2^{12}$
  <!-- feedback: Incorrecto. Se usó el número de horas como exponente; el exponente es el número de periodos de 3 horas, que es 4. -->
- [x] B) $8000$
  <!-- feedback: Correcto. En 12 horas hay $\frac{12}{3} = 4$ duplicaciones: $500 \cdot 2^4 = 500 \cdot 16 = 8000$. -->
- [ ] C) $4000$
  <!-- feedback: Incorrecto. Se contaron 3 duplicaciones ($500 \cdot 2^3$); en 12 horas hay 4 periodos de 3 horas. -->
- [ ] D) $2000$
  <!-- feedback: Incorrecto. Se creció de forma lineal ($500 \cdot 4$); duplicar repetidamente es multiplicar por 2 cada periodo. -->

### Explicacion Pedagogica
El modelo es $N(t) = 500 \cdot 2^{t/3}$ con $t$ en horas. Para $t = 12$: $N(12) = 500 \cdot 2^{4} = 8000$. La secuencia es 500, 1000, 2000, 4000, 8000: cada 3 horas el valor se multiplica por 2.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.77
**Contexto:** En una fábrica de tornillos de Itagüí, la longitud $x$ (en mm) de una pieza es aceptable si cumple $|2x - 3| \le 7$.

### Enunciado
¿Cuál es el conjunto de longitudes aceptables?

### Opciones
- [x] A) $[-2, 5]$
  <!-- feedback: Correcto. $-7 \le 2x - 3 \le 7 \Rightarrow -4 \le 2x \le 10 \Rightarrow -2 \le x \le 5$. -->
- [ ] B) $[-5, 2]$
  <!-- feedback: Incorrecto. Se cambió el signo de las soluciones; al sumar 3 en $-7 \le 2x - 3 \le 7$ queda $-4 \le 2x \le 10$. -->
- [ ] C) $(-\infty, 5]$
  <!-- feedback: Incorrecto. Solo se resolvió $2x - 3 \le 7$; el valor absoluto también exige $2x - 3 \ge -7$. -->
- [ ] D) $(-\infty, -2] \cup [5, \infty)$
  <!-- feedback: Incorrecto. Ese es el conjunto de $|2x - 3| \ge 7$; con $\le$ la solución es un intervalo acotado. -->

### Explicacion Pedagogica
La desigualdad $|u| \le 7$ equivale a $-7 \le u \le 7$. Con $u = 2x - 3$: sumamos 3 para obtener $-4 \le 2x \le 10$ y dividimos entre 2: $-2 \le x \le 5$. En el contexto físico solo tienen sentido las longitudes positivas de ese intervalo.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.75
**Contexto:** Al analizar datos de un sensor en Cali, se necesita el valor al que tiende $\frac{x^2 - x - 6}{x - 3}$ cuando $x$ se acerca a 3.

### Enunciado
¿Cuánto vale $\lim_{x \to 3} \frac{x^2 - x - 6}{x - 3}$?

### Opciones
- [ ] A) No existe, porque se obtiene $\frac{0}{0}$
  <!-- feedback: Incorrecto. $\frac{0}{0}$ es una forma indeterminada, no una prueba de que el límite no exista; hay que factorizar. -->
- [ ] B) $0$
  <!-- feedback: Incorrecto. Se evaluó solo el numerador en 3; el cociente queda $\frac{0}{0}$ y requiere simplificar. -->
- [x] C) $5$
  <!-- feedback: Correcto. $x^2 - x - 6 = (x - 3)(x + 2)$; al cancelar $x - 3$ queda $x + 2$, que en $x = 3$ vale 5. -->
- [ ] D) $1$
  <!-- feedback: Incorrecto. Se factorizó mal como $(x - 3)(x - 2)$; el producto correcto es $(x - 3)(x + 2)$, que da $x^2 - x - 6$. -->

### Explicacion Pedagogica
Al sustituir $x = 3$ resulta $\frac{9 - 3 - 6}{0} = \frac{0}{0}$, indeterminación. Se factoriza: $x^2 - x - 6 = (x - 3)(x + 2)$. Para $x \neq 3$ la expresión es $x + 2$, y $\lim_{x \to 3}(x + 2) = 5$.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.73
**Contexto:** La tarifa de un parqueadero en Pereira se modela con $f(x) = kx + 1$ si $x < 2$ y $f(x) = x^2 - 1$ si $x \ge 2$, donde $x$ son horas.

### Enunciado
¿Para qué valor de $k$ la función es continua en $x = 2$?

### Opciones
- [ ] A) $k = \frac{3}{2}$
  <!-- feedback: Incorrecto. Se usó $2^2 = 4$ olvidando el $-1$ de la segunda rama: $2k + 1 = 4$. -->
- [ ] B) $k = -1$
  <!-- feedback: Incorrecto. Error de signo al despejar: $2k = 3 - 1 = 2$, no $1 - 3$. -->
- [ ] C) $k = 2$
  <!-- feedback: Incorrecto. Se igualó $2k$ con $2^2 = 4$, ignorando los términos $+1$ y $-1$. -->
- [x] D) $k = 1$
  <!-- feedback: Correcto. Se igualan los límites laterales: $2k + 1 = 2^2 - 1 = 3$, luego $k = 1$. -->

### Explicacion Pedagogica
Para la continuidad en $x = 2$, el límite por izquierda $\lim_{x \to 2^-}(kx + 1) = 2k + 1$ debe ser igual a $f(2) = 2^2 - 1 = 3$. Resolviendo $2k + 1 = 3$ se obtiene $k = 1$.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.71
**Contexto:** En un taller de álgebra en Montería se pide simplificar la expresión racional $\frac{x^2 - 9}{x^2 + x - 6}$ para $x \neq -3$ y $x \neq 2$.

### Enunciado
¿Cuál es la forma simplificada?

### Opciones
- [ ] A) $\frac{x + 3}{x - 2}$
  <!-- feedback: Incorrecto. Se canceló el factor equivocado; el factor común es $x + 3$, así que queda $x - 3$ en el numerador. -->
- [x] B) $\frac{x - 3}{x - 2}$
  <!-- feedback: Correcto. $\frac{(x - 3)(x + 3)}{(x + 3)(x - 2)}$; al cancelar $x + 3$ queda $\frac{x - 3}{x - 2}$. -->
- [ ] C) $\frac{-9}{x - 6}$
  <!-- feedback: Incorrecto. Se tachó $x^2$ arriba y abajo; solo se cancelan factores, nunca términos de una suma. -->
- [ ] D) $\frac{x - 3}{x + 2}$
  <!-- feedback: Incorrecto. $x^2 + x - 6 = (x + 3)(x - 2)$, no $(x + 3)(x + 2)$, cuyo producto sería $x^2 + 5x + 6$. -->

### Explicacion Pedagogica
Se factorizan numerador y denominador: $x^2 - 9 = (x - 3)(x + 3)$ (diferencia de cuadrados) y $x^2 + x - 6 = (x + 3)(x - 2)$ (dos números que suman 1 y multiplican $-6$). El factor común $x + 3$ se cancela y queda $\frac{x - 3}{x - 2}$.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Geometrico
**Expected_Success:** 0.69
**Contexto:** En el puerto de Buenaventura, el brazo de una grúa mide $20\text{ m}$ y forma un ángulo de $60^\circ$ con la horizontal desde su punto de giro.

### Enunciado
¿A qué altura sobre el punto de giro está el extremo del brazo?

### Opciones
- [ ] A) $10\text{ m}$
  <!-- feedback: Incorrecto. Se usó $20\cos 60^\circ$, que da el alcance horizontal del brazo, no su altura. -->
- [ ] B) $20\sqrt{3}\text{ m}$
  <!-- feedback: Incorrecto. Se usó $20\tan 60^\circ$, como si 20 m fuera el cateto horizontal; el brazo es la hipotenusa. -->
- [ ] C) $\frac{20\sqrt{3}}{3}\text{ m}$
  <!-- feedback: Incorrecto. Se calculó $\frac{20}{\tan 60^\circ}$; esa razón no relaciona la hipotenusa con el cateto opuesto. -->
- [x] D) $10\sqrt{3}\text{ m} \approx 17{,}3\text{ m}$
  <!-- feedback: Correcto. El brazo es la hipotenusa: $h = 20\sin 60^\circ = 20 \cdot \frac{\sqrt{3}}{2} = 10\sqrt{3}$ m. -->

### Explicacion Pedagogica
El brazo, su proyección horizontal y la altura forman un triángulo rectángulo con hipotenusa 20 m. La altura es el cateto opuesto al ángulo de $60^\circ$, así que $h = 20\sin 60^\circ = 10\sqrt{3} \approx 17{,}3$ m.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.67
**Contexto:** En una tienda de Bogotá, el precio con recargo es $f(x) = 2x + 1$ y el ajuste por inventario es $g(x) = x^2 - 3$ (en miles de pesos).

### Enunciado
¿Cuál es el valor de $(f \circ g)(2)$?

### Opciones
- [x] A) $3$
  <!-- feedback: Correcto. Primero $g(2) = 4 - 3 = 1$ y luego $f(1) = 2 \cdot 1 + 1 = 3$. -->
- [ ] B) $22$
  <!-- feedback: Incorrecto. Se calculó $(g \circ f)(2) = g(5) = 22$; en $f \circ g$ se aplica primero $g$. -->
- [ ] C) $5$
  <!-- feedback: Incorrecto. $5 = f(2) \cdot g(2) = 5 \cdot 1$ es un producto de funciones, no una composición. -->
- [ ] D) $6$
  <!-- feedback: Incorrecto. $6 = f(2) + g(2)$ es una suma; componer significa evaluar $f$ en el resultado de $g$. -->

### Explicacion Pedagogica
La composición $(f \circ g)(x) = f(g(x))$ se evalúa de adentro hacia afuera. $g(2) = 2^2 - 3 = 1$; después $f(g(2)) = f(1) = 2(1) + 1 = 3$. El orden importa: $g(f(2)) = g(5) = 22$.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Algebraico
**Expected_Success:** 0.65
**Contexto:** Un estudiante de Tunja resuelve la ecuación $\log_{3}(x + 1) + \log_{3}(x - 1) = 1$ para un problema de acústica.

### Enunciado
¿Cuál es el conjunto solución?

### Opciones
- [ ] A) $\{-2, 2\}$
  <!-- feedback: Incorrecto. No se verificó el dominio: con $x = -2$ aparecen $\log_{3}(-1)$ y $\log_{3}(-3)$, que no existen en los reales. -->
- [ ] B) $\{-2\}$
  <!-- feedback: Incorrecto. Se descartó la solución válida; $x = 2$ da $\log_{3} 3 + \log_{3} 1 = 1$. -->
- [x] C) $\{2\}$
  <!-- feedback: Correcto. $\log_{3}(x^2 - 1) = 1 \Rightarrow x^2 - 1 = 3 \Rightarrow x = \pm 2$, pero $x = -2$ hace negativos los argumentos. -->
- [ ] D) $\{\sqrt{2}\}$
  <!-- feedback: Incorrecto. Se igualó $x^2 - 1$ a 1 en lugar de a $3^1 = 3$; la forma exponencial de $\log_{3} A = 1$ es $A = 3$. -->

### Explicacion Pedagogica
Se unen los logaritmos: $\log_{3}[(x + 1)(x - 1)] = 1$, de modo que $x^2 - 1 = 3$ y $x = \pm 2$. El dominio exige $x + 1 > 0$ y $x - 1 > 0$, es decir $x > 1$, así que solo sirve $x = 2$. Comprobación: $\log_{3} 3 + \log_{3} 1 = 1 + 0 = 1$.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Algebraico
**Expected_Success:** 0.63
**Contexto:** En un ejercicio de crecimiento de seguidores de un canal de Barranquilla aparece la ecuación $4^{x} = 8^{x - 1}$.

### Enunciado
¿Cuál es la solución?

### Opciones
- [ ] A) $x = 1$
  <!-- feedback: Incorrecto. Se escribió $3(x - 1)$ como $3x - 1$, sin distribuir el 3 sobre el $-1$. -->
- [x] B) $x = 3$
  <!-- feedback: Correcto. $2^{2x} = 2^{3(x - 1)} = 2^{3x - 3}$, luego $2x = 3x - 3$ y $x = 3$. -->
- [ ] C) $x = -3$
  <!-- feedback: Incorrecto. Error de signo al trasponer: de $2x - 3x = -3$ sale $-x = -3$, es decir $x = 3$. -->
- [ ] D) No tiene solución porque las bases son distintas
  <!-- feedback: Incorrecto. Ambas bases son potencias de 2 ($4 = 2^2$, $8 = 2^3$), así que se pueden igualar exponentes. -->

### Explicacion Pedagogica
Se expresan ambos lados en base 2: $4^x = (2^2)^x = 2^{2x}$ y $8^{x - 1} = (2^3)^{x - 1} = 2^{3x - 3}$. Como la exponencial es inyectiva, $2x = 3x - 3$, de donde $x = 3$. Comprobación: $4^3 = 64 = 8^2$.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Algebraico
**Expected_Success:** 0.61
**Contexto:** En un análisis de rentabilidad de una cooperativa de Popayán se requiere que el cociente $\frac{x - 1}{x + 2}$ no sea negativo.

### Enunciado
¿Cuál es el conjunto solución de $\frac{x - 1}{x + 2} \ge 0$?

### Opciones
- [ ] A) $(-\infty, -2] \cup [1, \infty)$
  <!-- feedback: Incorrecto. Se incluyó $x = -2$, donde el denominador es cero y el cociente no existe. -->
- [x] B) $(-\infty, -2) \cup [1, \infty)$
  <!-- feedback: Correcto. El cociente es positivo si ambos factores tienen igual signo y vale 0 en $x = 1$; en $x = -2$ no está definido. -->
- [ ] C) $[-2, 1]$
  <!-- feedback: Incorrecto. Ese es el intervalo donde el cociente es negativo (y además incluye $-2$); se invirtió el análisis de signos. -->
- [ ] D) $[1, \infty)$
  <!-- feedback: Incorrecto. Se olvidó el caso en que numerador y denominador son ambos negativos, que ocurre para $x < -2$. -->

### Explicacion Pedagogica
Los puntos críticos son $x = 1$ (anula el numerador) y $x = -2$ (anula el denominador). Tabla de signos: para $x < -2$ ambos factores son negativos y el cociente es positivo; entre $-2$ y $1$ es negativo; para $x > 1$ es positivo. Se incluye $x = 1$ por el $\ge$ y se excluye $x = -2$.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.59
**Contexto:** El costo promedio por unidad de una empresa de confecciones de Medellín se modela con $C(x) = \frac{3x^2 - 5}{6x^2 + x}$ para producciones muy grandes.

### Enunciado
¿Cuánto vale $\lim_{x \to \infty} \frac{3x^2 - 5}{6x^2 + x}$?

### Opciones
- [x] A) $\frac{1}{2}$
  <!-- feedback: Correcto. Numerador y denominador tienen grado 2; el límite es el cociente de coeficientes principales $\frac{3}{6} = \frac{1}{2}$. -->
- [ ] B) $\infty$
  <!-- feedback: Incorrecto. Aunque el numerador crece sin cota, el denominador crece al mismo ritmo ($x^2$), así que el cociente se estabiliza. -->
- [ ] C) $0$
  <!-- feedback: Incorrecto. El límite es 0 solo si el grado del denominador es mayor; aquí ambos grados son 2. -->
- [ ] D) $3$
  <!-- feedback: Incorrecto. Se tomó solo el coeficiente principal del numerador, olvidando dividir entre el 6 del denominador. -->

### Explicacion Pedagogica
Al dividir numerador y denominador entre $x^2$: $\frac{3 - \frac{5}{x^2}}{6 + \frac{1}{x}}$. Cuando $x \to \infty$, $\frac{5}{x^2} \to 0$ y $\frac{1}{x} \to 0$, así que el límite es $\frac{3}{6} = \frac{1}{2}$.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.57
**Contexto:** En un seminario en Cartago se estudia $f(x) = \frac{x^2 - 1}{x - 1}$, que no está definida en $x = 1$.

### Enunciado
¿Cuál afirmación sobre $f$ en $x = 1$ es correcta?

### Opciones
- [ ] A) $f$ es continua en 1 porque el límite existe
  <!-- feedback: Incorrecto. La continuidad exige además que $f(1)$ esté definido e igual al límite; aquí $f(1)$ no existe. -->
- [ ] B) $f$ tiene una asíntota vertical en $x = 1$, discontinuidad no evitable
  <!-- feedback: Incorrecto. No hay asíntota: el factor $x - 1$ se cancela y la función se acerca a 2, no a $\pm\infty$. -->
- [x] C) $f$ no es continua en 1, pero la discontinuidad es evitable: basta definir $f(1) = 2$
  <!-- feedback: Correcto. $\lim_{x \to 1} \frac{(x - 1)(x + 1)}{x - 1} = \lim_{x \to 1}(x + 1) = 2$; existe el límite pero no $f(1)$. -->
- [ ] D) La discontinuidad es evitable definiendo $f(1) = 0$
  <!-- feedback: Incorrecto. El valor que repara la continuidad es el límite, 2; con $f(1) = 0$ la función seguiría siendo discontinua. -->

### Explicacion Pedagogica
Hay tres condiciones de continuidad: $f(a)$ existe, $\lim_{x \to a} f(x)$ existe y ambos coinciden. Aquí $f(1)$ no existe, pero $\lim_{x \to 1}(x + 1) = 2$. Como el límite es finito, la discontinuidad es removible: definiendo $f(1) = 2$ la función queda continua.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.55
**Contexto:** Al revisar una tarea en Valledupar, el profesor encuentra la afirmación de un estudiante: para todo número real $a$, $\sqrt{a^2} = a$.

### Enunciado
¿Cuál es la mejor evaluación de esa afirmación?

### Opciones
- [ ] A) Es verdadera, porque la raíz y el cuadrado se cancelan
  <!-- feedback: Incorrecto. Solo se cancelan si $a \ge 0$; con $a = -3$ se obtiene $\sqrt{9} = 3$, no $-3$. -->
- [ ] B) Es falsa, porque $\sqrt{a^2} = \pm a$
  <!-- feedback: Incorrecto. El símbolo $\sqrt{\ }$ denota un único valor no negativo; $\pm$ aparece al resolver $x^2 = a^2$, no al evaluar la raíz. -->
- [ ] C) Es verdadera solo para números enteros
  <!-- feedback: Incorrecto. El contraejemplo $a = -3$ es entero y la igualdad falla, así que tampoco vale para enteros. -->
- [x] D) Es falsa: $\sqrt{(-3)^2} = 3 \neq -3$; en general $\sqrt{a^2} = |a|$
  <!-- feedback: Correcto. La raíz cuadrada principal nunca es negativa, así que para $a < 0$ da $-a$, que es $|a|$. -->

### Explicacion Pedagogica
La raíz cuadrada principal de un número no negativo es el único valor no negativo cuyo cuadrado da ese número. Si $a = -3$, $a^2 = 9$ y $\sqrt{9} = 3 = |-3|$. Por eso la regla correcta es $\sqrt{a^2} = |a|$, que coincide con $a$ solo cuando $a \ge 0$.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.53
**Contexto:** En una panadería de Cali, 3 empanadas y 2 jugos cuestan $13\,000$ pesos, y 2 empanadas y 1 jugo cuestan $8\,000$ pesos.

### Enunciado
¿Cuál propuesta de precios es coherente con ambas compras?

### Opciones
- [ ] A) Empanada a $2\,000$ y jugo a $3\,500$
  <!-- feedback: Incorrecto. Cumple la primera compra ($6000 + 7000 = 13\,000$) pero la segunda da $4000 + 3500 = 7\,500 \neq 8\,000$. -->
- [ ] B) Empanada a $4\,000$ y jugo a $500$
  <!-- feedback: Incorrecto. Cumple la primera ($12\,000 + 1000$) pero la segunda da $8000 + 500 = 8\,500 \neq 8\,000$. -->
- [x] C) Empanada a $3\,000$ y jugo a $2\,000$
  <!-- feedback: Correcto. $3(3000) + 2(2000) = 13\,000$ y $2(3000) + 2000 = 8\,000$: cumple las dos ecuaciones. -->
- [ ] D) Empanada a $2\,500$ y jugo a $2\,500$
  <!-- feedback: Incorrecto. La primera compra daría $5 \cdot 2500 = 12\,500 \neq 13\,000$, así que no satisface el sistema. -->

### Explicacion Pedagogica
Sea $e$ el precio de la empanada y $j$ el del jugo: $3e + 2j = 13\,000$ y $2e + j = 8\,000$. De la segunda, $j = 8000 - 2e$; sustituyendo: $3e + 16\,000 - 4e = 13\,000$, luego $e = 3000$ y $j = 2000$. Una propuesta es válida solo si satisface ambas ecuaciones.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.51
**Contexto:** En un simulacro en Ibagué, Laura resolvió $2\sin x = 1$ en el intervalo $[0, 2\pi)$ y respondió únicamente $x = \frac{\pi}{6}$.

### Enunciado
¿Cuál es la mejor evaluación de la respuesta de Laura?

### Opciones
- [ ] A) Es completa, porque el seno toma cada valor una sola vez
  <!-- feedback: Incorrecto. En $[0, 2\pi)$ el seno toma cada valor de $(-1, 1)$ dos veces; no es inyectivo en ese intervalo. -->
- [ ] B) Es incompleta: falta $x = \frac{7\pi}{6}$
  <!-- feedback: Incorrecto. $\sin\frac{7\pi}{6} = -\frac{1}{2}$; en el tercer cuadrante el seno es negativo y no cumple la ecuación. -->
- [ ] C) Es incorrecta: la solución es $x = \frac{\pi}{3}$
  <!-- feedback: Incorrecto. $\sin\frac{\pi}{3} = \frac{\sqrt{3}}{2} \neq \frac{1}{2}$; el ángulo cuyo seno es $\frac{1}{2}$ es $\frac{\pi}{6}$. -->
- [x] D) Es incompleta: también $x = \frac{5\pi}{6}$ cumple, pues el seno es positivo en el segundo cuadrante
  <!-- feedback: Correcto. $\sin\frac{5\pi}{6} = \frac{1}{2}$, así que $2\sin\frac{5\pi}{6} = 1$; el conjunto solución es $\{\frac{\pi}{6}, \frac{5\pi}{6}\}$. -->

### Explicacion Pedagogica
La ecuación equivale a $\sin x = \frac{1}{2}$. El ángulo de referencia es $\frac{\pi}{6}$ y el seno es positivo en los cuadrantes I y II, así que en $[0, 2\pi)$ las soluciones son $\frac{\pi}{6}$ y $\pi - \frac{\pi}{6} = \frac{5\pi}{6}$.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.49
**Contexto:** Don Hernán, en Bucaramanga, invierte $2\,000\,000$ de pesos en un CDT que paga $10\%$ anual con interés compuesto, capitalizado una vez al año.

### Enunciado
¿Cuál es el menor número entero de años para que su dinero llegue al menos a $4\,000\,000$ de pesos?

### Opciones
- [x] A) $8$ años
  <!-- feedback: Correcto. Se necesita $1{,}1^t \ge 2$: $1{,}1^7 \approx 1{,}949 < 2$ y $1{,}1^8 \approx 2{,}144 \ge 2$. -->
- [ ] B) $7$ años
  <!-- feedback: Incorrecto. $t = \frac{\ln 2}{\ln 1{,}1} \approx 7{,}27$ se redondeó hacia abajo; con 7 años se tienen unos $3\,897\,000$ pesos, menos de lo pedido. -->
- [ ] C) $10$ años
  <!-- feedback: Incorrecto. Se usó interés simple ($10\%$ fijo cada año); con interés compuesto los intereses también generan intereses y se llega antes. -->
- [ ] D) $5$ años
  <!-- feedback: Incorrecto. $1{,}1^5 \approx 1{,}61$, es decir unos $3\,221\,000$ pesos; todavía no se duplica. -->

### Explicacion Pedagogica
El capital tras $t$ años es $2\,000\,000 \cdot 1{,}1^{t}$. Se busca $1{,}1^t \ge 2$, es decir $t \ge \frac{\ln 2}{\ln 1{,}1} \approx 7{,}27$. Como los intereses se pagan por años completos, el menor entero es $t = 8$: $2\,000\,000 \cdot 1{,}1^8 \approx 4\,287\,000$ pesos.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W10-repaso-p1-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Algebraico
**Expected_Success:** 0.47
**Contexto:** En un curso de nivelación en Manizales, Tomás afirma que la inversa de $f(x) = \frac{2x + 1}{x - 3}$ (con $x \neq 3$) es $f^{-1}(x) = \frac{3x + 1}{x - 2}$.

### Enunciado
¿Qué se puede concluir sobre la propuesta de Tomás?

### Opciones
- [ ] A) Es incorrecta: la inversa es $\frac{x - 3}{2x + 1}$
  <!-- feedback: Incorrecto. $\frac{x - 3}{2x + 1}$ es el recíproco $\frac{1}{f(x)}$, que no deshace la acción de $f$. -->
- [ ] B) Es incorrecta: la inversa es $\frac{3x - 1}{x - 2}$
  <!-- feedback: Incorrecto. Error de signo al despejar: de $xy - 3y = 2x + 1$ sale $xy - 2x = 3y + 1$, con $+1$. -->
- [ ] C) Es incorrecta: la inversa es $\frac{3x + 1}{x + 2}$
  <!-- feedback: Incorrecto. Al agrupar $xy - 2x = x(y - 2)$ el denominador es $y - 2$, no $y + 2$. -->
- [x] D) Es correcta: al despejar $x$ de $y = \frac{2x + 1}{x - 3}$ se obtiene $x = \frac{3y + 1}{y - 2}$
  <!-- feedback: Correcto. $y(x - 3) = 2x + 1 \Rightarrow x(y - 2) = 3y + 1$; además $f(f^{-1}(x)) = x$ se comprueba. -->

### Explicacion Pedagogica
Se escribe $y = \frac{2x + 1}{x - 3}$ y se despeja $x$: $xy - 3y = 2x + 1$, luego $xy - 2x = 3y + 1$, $x(y - 2) = 3y + 1$ y $x = \frac{3y + 1}{y - 2}$. Intercambiando variables, $f^{-1}(x) = \frac{3x + 1}{x - 2}$, que es lo que propuso Tomás. Comprobación: $f(0) = -\frac{1}{3}$ y $f^{-1}(-\frac{1}{3}) = 0$.
