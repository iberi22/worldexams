---
id: "ES-MAT-11-P1-analisis-funciones-001-MASTERY"
country: "spain"
grado: 11
asignatura: "matematicas"
tema: "analisis-funciones"
periodo: 1
protocol_version: "5.1"
bundle_index: 1
bundle_size: 20
alignment: "LOMLOE + EBAU"
modern_context: true
distractor_profile: "misconception_based"
calibration:
  expected_success_rate: 0.50
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
---

# MASTERY Bundle — Análisis de Funciones (ES-001)

## Bloque A — Nivel D3–D4: Conceptos Básicos y Operaciones con Funciones

---

## Question 1 [D3-D4] (Difficulty 3)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v1`
**Bloom:** Remember
**EBAU:** Razonamiento Matemático
**Context:** Definición de dominio de funciones racionales.
**Expected_Success:** 0.60

### Enunciado
Dada la función $f(x) = \frac{2x - 5}{x^2 - 9}$, ¿cuál es su dominio de definición en el conjunto de los números reales?

### Options
- [ ] A) $\mathbb{R} - \{3\}$ <!-- feedback: Incorrecto. Solo se excluye uno de los valores que anulan el denominador ($x=3$), olvidando que $(-3)^2$ también es 9. -->
- [x] B) $\mathbb{R} - \{-3, 3\}$ <!-- feedback: Correcto. El dominio de una función racional son todos los reales excepto los que anulan el denominador: $x^2 - 9 = 0 \Rightarrow x = \pm 3$. -->
- [ ] C) $\mathbb{R} - \{2.5\}$ <!-- feedback: Incorrecto. El valor 2.5 anula el numerador, lo cual es perfectamente válido; la restricción ocurre solo cuando el denominador es cero. -->
- [ ] D) $(3, +\infty)$ <!-- feedback: Incorrecto. Este intervalo excluye valores negativos y el rango entre -3 y 3 donde la función está perfectamente definida y es continua. -->

### Explicación Pedagógica
Identificación de los puntos de discontinuidad en funciones racionales mediante la resolución de ecuaciones cuadráticas en el denominador para determinar el dominio.

---

## Question 2 [D3-D4] (Difficulty 3)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v2`
**Bloom:** Understand
**EBAU:** Modelización y Comunicación
**Context:** Interpretación de gráficas elementales.
**Expected_Success:** 0.60

### Enunciado
Si una función $g(x)$ es par, ¿qué tipo de simetría presenta su gráfica respecto a los ejes de coordenadas?

### Options
- [x] A) Simetría respecto al eje de ordenadas ($OY$). <!-- feedback: Correcto. Una función es par si $g(x) = g(-x)$, lo que se traduce gráficamente en una simetría especular respecto al eje vertical. -->
- [ ] B) Simetría respecto al origen de coordenadas $(0,0)$. <!-- feedback: Incorrecto. La simetría respecto al origen es la característica definitoria de las funciones impares, donde $g(-x) = -g(x)$. -->
- [ ] C) Simetría respecto al eje de abscisas ($OX$). <!-- feedback: Incorrecto. Si una gráfica presentara simetría respecto al eje horizontal, no sería una función, ya que un valor de $x$ tendría dos imágenes distintas. -->
- [ ] D) No presenta ningún tipo de simetría. <!-- feedback: Incorrecto. Las funciones pares e impares se definen precisamente por presentar simetrías geométricas específicas que facilitan su estudio. -->

### Explicación Pedagógica
Comprensión de las propiedades de simetría de las funciones algebraicas y su interpretación geométrica en el plano cartesiano.

---

## Question 3 [D3-D4] (Difficulty 4)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v3`
**Bloom:** Apply
**EBAU:** Resolución de Problemas
**Context:** Composición de funciones.
**Expected_Success:** 0.60

### Enunciado
Dadas las funciones $f(x) = x + 2$ y $g(x) = x^2$, ¿cuál es la expresión de la función compuesta $(g \circ f)(x)$?

### Options
- [ ] A) $x^2 + 2$ <!-- feedback: Incorrecto. Esto corresponde a la operación $g(x) + 2$, no a la composición de las funciones donde una actúa sobre el resultado de la otra. -->
- [x] B) $(x + 2)^2$ <!-- feedback: Correcto. Por definición, $(g \circ f)(x) = g(f(x))$. Sustituyendo $f(x)$ en $g$, obtenemos $g(x+2) = (x+2)^2$. -->
- [ ] C) $x^2 + 4$ <!-- feedback: Incorrecto. Representa el error común de elevar al cuadrado los términos de un binomio individualmente, omitiendo el término del doble producto. -->
- [ ] D) $x^2 + 2x + 4$ <!-- feedback: Incorrecto. Aunque se acerca al desarrollo de $(x+2)^2$, el término lineal correcto es $4x$, no $2x$, fruto de una expansión incompleta. -->

### Explicación Pedagógica
Aplicación de la regla de composición de funciones mediante la sustitución algebraica de la función interna en la variable de la función externa.

---

## Question 4 [D3-D4] (Difficulty 4)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v4`
**Bloom:** Analyze
**EBAU:** Razonamiento Matemático
**Context:** Puntos de corte con los ejes.
**Expected_Success:** 0.60

### Enunciado
¿En qué punto corta al eje de abscisas ($OX$) la gráfica de la función $h(x) = \ln(x - 2)$?

### Options
- [ ] A) $(0, 0)$ <!-- feedback: Incorrecto. El punto $(0,0)$ no pertenece a la función, ya que el logaritmo solo está definido para argumentos estrictamente mayores que cero. -->
- [ ] B) $(2, 0)$ <!-- feedback: Incorrecto. En $x=2$ el argumento es cero, y el logaritmo tiende a menos infinito; es una asíntota vertical, no un punto de corte. -->
- [x] C) $(3, 0)$ <!-- feedback: Correcto. El corte con $OX$ ocurre cuando $h(x)=0$. $\ln(x-2)=0 \Rightarrow x-2 = e^0 = 1 \Rightarrow x=3$. El punto es $(3,0)$. -->
- [ ] D) $(e, 0)$ <!-- feedback: Incorrecto. Confusión conceptual entre la base del logaritmo ($e$) y el valor de la variable que hace que la función valga cero. -->

### Explicación Pedagógica
Cálculo de las raíces o ceros de una función logarítmica aplicando la definición de logaritmo y resolviendo la ecuación resultante.

---

## Bloque B — Nivel D5–D6: Límites, Continuidad y Asíntotas

---

## Question 5 [D5-D6] (Difficulty 5)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v5`
**Bloom:** Apply
**EBAU:** Resolución de Problemas
**Context:** Cálculo de límites en el infinito.
**Expected_Success:** 0.60

### Enunciado
Calcula el valor del siguiente límite: $\lim_{x \to \infty} \frac{3x^2 - 5x + 1}{2x^2 + 7}$.

### Options
- [ ] A) $0$ <!-- feedback: Incorrecto. El límite sería cero si el grado del denominador fuera mayor que el del numerador, pero aquí ambos son de grado 2. -->
- [ ] B) $\infty$ <!-- feedback: Incorrecto. El límite tendería a infinito solo si el grado del numerador fuera superior al del denominador, lo cual no sucede. -->
- [x] C) $3/2$ <!-- feedback: Correcto. Al ser polinomios del mismo grado, el límite al infinito es el cociente de los coeficientes de los términos de mayor grado. -->
- [ ] D) $3$ <!-- feedback: Incorrecto. Se ha tomado el coeficiente del numerador pero se ha omitido el coeficiente del término principal del denominador. -->

### Explicación Pedagógica
Resolución de indeterminaciones del tipo $\infty/\infty$ mediante la comparación de los grados de los polinomios involucrados en la función racional.

---

## Question 6 [D5-D6] (Difficulty 5)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v6`
**Bloom:** Analyze
**EBAU:** Razonamiento Matemático
**Context:** Identificación de asíntotas verticales.
**Expected_Success:** 0.60

### Enunciado
¿Cuál de las siguientes rectas es una asíntota vertical de la función $f(x) = \frac{x + 1}{x^2 - 1}$?

### Options
- [ ] A) $x = 1$ y $x = -1$ <!-- feedback: Incorrecto. Aunque ambos anulan el denominador, en $x = -1$ existe una discontinuidad evitable ya que también anula el numerador. -->
- [x] B) $x = 1$ <!-- feedback: Correcto. En $x=1$ el límite es infinito ($\frac{2}{0}$), cumpliendo la definición de asíntota vertical. En $x=-1$, el límite es finito. -->
- [ ] C) $y = 0$ <!-- feedback: Incorrecto. La recta $y=0$ es la asíntota horizontal de la función, no una vertical; describe el comportamiento a largo plazo, no en puntos críticos. -->
- [ ] D) $x = -1$ <!-- feedback: Incorrecto. En este punto el numerador también se anula. Al simplificar la función queda $\frac{1}{x-1}$, cuyo límite en -1 es $-1/2$. -->

### Explicación Pedagógica
Distinción entre discontinuidades evitables (puntos donde el límite es finito) y asíntotas verticales basándose en el estudio de los límites laterales.

---

## Question 7 [D5-D6] (Difficulty 5)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v7`
**Bloom:** Apply
**EBAU:** Resolución de Problemas
**Context:** Continuidad de funciones a trozos.
**Expected_Success:** 0.60

### Enunciado
Halla el valor de $k$ para que la función $f(x) = \begin{cases} x + k & \text{si } x < 2 \\ x^2 - 1 & \text{si } x \geq 2 \end{cases}$ sea continua en el punto $x = 2$.

### Options
- [ ] A) $k = 2$ <!-- feedback: Incorrecto. Este valor no iguala los límites laterales; al sustituir obtendríamos un salto en la gráfica de la función. -->
- [x] B) $k = 1$ <!-- feedback: Correcto. Límite por la izquierda ($2+k$) debe ser igual al límite por la derecha ($2^2-1=3$). Por tanto, $2+k=3 \Rightarrow k=1$. -->
- [ ] C) $k = 3$ <!-- feedback: Incorrecto. Valor obtenido por un error en la evaluación de la segunda rama de la función o en el despeje de la ecuación. -->
- [ ] D) No existe ningún valor de $k$. <!-- feedback: Incorrecto. Se trata de una discontinuidad de salto que puede evitarse igualando las expresiones de ambas ramas en el punto de unión. -->

### Explicación Pedagógica
Aplicación de las condiciones de continuidad en funciones definidas a trozos asegurando la igualdad de los límites laterales y el valor de la función.

---

## Question 8 [D5-D6] (Difficulty 6)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v8`
**Bloom:** Analyze
**EBAU:** Razonamiento Matemático
**Context:** Asíntotas oblicuas.
**Expected_Success:** 0.60

### Enunciado
¿Cuál es la condición necesaria para que una función racional $P(x)/Q(x)$ presente una asíntota oblicua cuando $x$ tiende a infinito?

### Options
- [ ] A) Que el grado de $P(x)$ sea igual al de $Q(x)$. <!-- feedback: Incorrecto. Bajo esta condición la función presenta una asíntota horizontal, no una oblicua. -->
- [x] B) Que el grado de $P(x)$ sea exactamente una unidad mayor que el de $Q(x)$. <!-- feedback: Correcto. Al realizar la división de polinomios, el cociente resulta ser una expresión lineal de la forma $mx+n$. -->
- [ ] C) Que el grado de $Q(x)$ sea mayor que el de $P(x)$. <!-- feedback: Incorrecto. En este caso la función tiene una asíntota horizontal en el eje de abscisas ($y=0$). -->
- [ ] D) Que la función no tenga asíntotas verticales. <!-- feedback: Incorrecto. La existencia de asíntotas oblicuas es independiente de la presencia o ausencia de asíntotas verticales. -->

### Explicación Pedagógica
Identificación de las condiciones algebraicas de existencia de asíntotas oblicuas basándose en la relación de grados entre numerador y denominador.

---

## Question 9 [D5-D6] (Difficulty 6)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v9`
**Bloom:** Apply
**EBAU:** Resolución de Problemas
**Context:** Límites con indeterminación $0/0$.
**Expected_Success:** 0.60

### Enunciado
Calcula el valor del límite: $\lim_{x \to 3} \frac{x^2 - 9}{x - 3}$.

### Options
- [ ] A) $0$ <!-- feedback: Incorrecto. Sustituir directamente da $0/0$. Es necesario simplificar la expresión antes de dar por concluido el cálculo. -->
- [ ] B) $3$ <!-- feedback: Incorrecto. Error común al intentar simplificar la fracción sin aplicar correctamente las reglas de factorización de polinomios. -->
- [x] C) $6$ <!-- feedback: Correcto. Factorizando el numerador: $\frac{(x-3)(x+3)}{x-3} = x+3$. Evaluando en $x \to 3$, el resultado es $3+3=6$. -->
- [ ] D) No existe. <!-- feedback: Incorrecto. Aunque la función no está definida en $x=3$, el límite existe y es finito, indicando un punto hueco en la gráfica. -->

### Explicación Pedagógica
Resolución de indeterminaciones del tipo $0/0$ mediante técnicas de factorización y simplificación de expresiones algebraicas racionales.

---

## Question 10 [D5-D6] (Difficulty 6)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v10`
**Bloom:** Understand
**EBAU:** Comunicación y Razonamiento
**Context:** Crecimiento y decrecimiento.
**Expected_Success:** 0.60

### Enunciado
Si una función $f(x)$ es estrictamente decreciente en un intervalo dado, ¿qué podemos afirmar sobre su derivada $f'(x)$ en dicho intervalo (suponiendo que existe)?

### Options
- [ ] A) $f'(x) > 0$ para todo $x$. <!-- feedback: Incorrecto. Una derivada positiva indica que la pendiente de la tangente es positiva, lo que caracteriza a funciones crecientes. -->
- [x] B) $f'(x) < 0$ para todo $x$. <!-- feedback: Correcto. El signo negativo de la derivada refleja una pendiente descendente, correspondiente al comportamiento decreciente de la función. -->
- [ ] C) $f'(x) = 0$ para todo $x$. <!-- feedback: Incorrecto. Si la derivada fuera cero en todo el intervalo, la función sería constante (una recta horizontal). -->
- [ ] D) La derivada debe ser también decreciente. <!-- feedback: Incorrecto. El signo de la derivada indica el crecimiento de la función original, no hay una relación directa obligatoria con el crecimiento de la propia derivada. -->

### Explicación Pedagógica
Relación fundamental entre el signo de la primera derivada y el comportamiento monótono (crecimiento o decrecimiento) de una función continua.

---

## Bloque C — Nivel D7–D8: Derivación y Optimización

---

## Question 11 [D7-D8] (Difficulty 7)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v11`
**Bloom:** Apply
**EBAU:** Resolución de Problemas
**Context:** Regla de la cadena.
**Expected_Success:** 0.60

### Enunciado
Calcula la derivada de la función $f(x) = \sin(x^2 + 1)$.

### Options
- [ ] A) $\cos(x^2 + 1)$ <!-- feedback: Incorrecto. Se ha derivado la función externa pero se ha omitido multiplicar por la derivada del argumento, violando la regla de la cadena. -->
- [x] B) $2x \cdot \cos(x^2 + 1)$ <!-- feedback: Correcto. Aplicando la regla de la cadena: derivada de la función externa ($\cos$) evaluada en la interna, multiplicada por la derivada de la interna ($2x$). -->
- [ ] C) $x^2 \cdot \cos(x^2 + 1)$ <!-- feedback: Incorrecto. Error en el cálculo de la derivada de la función polinómica interna $x^2+1$. -->
- [ ] D) $2x \cdot \sin(x^2 + 1)$ <!-- feedback: Incorrecto. No se ha realizado el cambio de la función seno a su derivada, que es el coseno. -->

### Explicación Pedagógica
Aplicación de la regla de la cadena para la derivación de funciones compuestas que involucran funciones trigonométricas y polinómicas.

---

## Question 12 [D7-D8] (Difficulty 7)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v12`
**Bloom:** Analyze
**EBAU:** Razonamiento Matemático
**Context:** Interpretación geométrica de la derivada.
**Expected_Success:** 0.60

### Enunciado
Halla la pendiente de la recta tangente a la curva $y = x^2 - 4x + 5$ en el punto exacto donde la abscisa es $x = 1$.

### Options
- [ ] A) $1$ <!-- feedback: Incorrecto. Este es el valor de la coordenada $y$ de la función en ese punto ($1-4+5=2$, espera, es 2), no su pendiente. -->
- [ ] B) $2$ <!-- feedback: Incorrecto. Valor que no se corresponde con la evaluación de la derivada en el punto solicitado. -->
- [x] C) $-2$ <!-- feedback: Correcto. La derivada es $y' = 2x - 4$. Al sustituir $x=1$, obtenemos $y'(1) = 2(1) - 4 = -2$, que es la pendiente buscada. -->
- [ ] D) $0$ <!-- feedback: Incorrecto. La pendiente es nula solo en los puntos críticos; en esta parábola, eso ocurre en el vértice ($x=2$), no en $x=1$. -->

### Explicación Pedagógica
Cálculo de la pendiente de la recta tangente a una curva en un punto dado mediante la evaluación numérica de su primera derivada.

---

## Question 13 [D7-D8] (Difficulty 7)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v13`
**Bloom:** Analyze
**EBAU:** Razonamiento Matemático
**Context:** Puntos críticos y extremos.
**Expected_Success:** 0.60

### Enunciado
¿En qué valor de la variable $x$ presenta la función $f(x) = x^3 - 3x$ un máximo relativo?

### Options
- [ ] A) $x = 0$ <!-- feedback: Incorrecto. En este punto la función vale cero, pero la derivada no es nula, por lo que no puede ser un extremo relativo. -->
- [x] B) $x = -1$ <!-- feedback: Correcto. $f'(x) = 3x^2 - 3 = 0 \Rightarrow x = \pm 1$. Dado que $f''(x) = 6x$, y $f''(-1) = -6 < 0$, se confirma que en $x=-1$ hay un máximo. -->
- [ ] C) $x = 1$ <!-- feedback: Incorrecto. En $x=1$ la segunda derivada es positiva ($+6$), lo que indica la presencia de un mínimo relativo, no un máximo. -->
- [ ] D) $x = 3$ <!-- feedback: Incorrecto. Este valor no anula la primera derivada, por lo que no es un punto crítico candidato a extremo. -->

### Explicación Pedagógica
Identificación y clasificación de extremos relativos mediante el criterio de la primera derivada (anulación) y la segunda derivada (curvatura).

---

## Question 14 [D7-D8] (Difficulty 8)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v14`
**Bloom:** Evaluate
**EBAU:** Razonamiento Matemático
**Context:** Curvatura e inflexión.
**Expected_Success:** 0.60

### Enunciado
¿Cuál de los siguientes es el intervalo donde la función $g(x) = x^4 - 6x^2$ es convexa (cóncava hacia arriba, $g''(x)>0$)?

### Options
- [ ] A) $(-\infty, \infty)$ <!-- feedback: Incorrecto. La curvatura de esta función de cuarto grado cambia de signo en sus puntos de inflexión. -->
- [x] B) $(-\infty, -1) \cup (1, \infty)$ <!-- feedback: Correcto. $g''(x) = 12x^2 - 12$. Resolviendo $12(x^2 - 1) > 0$, obtenemos que la función es convexa cuando el valor absoluto de $x$ es mayor que 1. -->
- [ ] C) $(-1, 1)$ <!-- feedback: Incorrecto. En este intervalo central la segunda derivada es negativa, lo que significa que la función es cóncava hacia abajo. -->
- [ ] D) $(0, \infty)$ <!-- feedback: Incorrecto. Esta opción ignora el comportamiento simétrico de la función para valores negativos de $x$. -->

### Explicación Pedagógica
Estudio de la curvatura de una función polinómica mediante el análisis del signo de su segunda derivada en diferentes intervalos del dominio.

---

## Question 15 [D7-D8] (Difficulty 8)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v15`
**Bloom:** Apply
**EBAU:** Resolución de Problemas
**Context:** Optimización.
**Expected_Success:** 0.60

### Enunciado
Deseamos descomponer el número 12 en dos sumandos positivos tales que su producto sea el máximo posible. ¿Cuáles son dichos números?

### Options
- [ ] A) 4 y 8 <!-- feedback: Incorrecto. El producto es 32; aunque suman 12, no es la combinación que maximiza el resultado según el análisis diferencial. -->
- [x] B) 6 y 6 <!-- feedback: Correcto. Sea $x$ un sumando, el producto es $P(x) = x(12-x) = 12x - x^2$. Derivando: $12-2x = 0 \Rightarrow x=6$. -->
- [ ] C) 1 y 11 <!-- feedback: Incorrecto. El producto es apenas 11, siendo la combinación que minimiza el producto para sumandos enteros positivos. -->
- [ ] D) 5 y 7 <!-- feedback: Incorrecto. El producto es 35, un valor cercano al máximo pero inferior al obtenido con dos sumandos iguales. -->

### Explicación Pedagógica
Resolución de problemas de optimización clásica mediante el planteamiento de funciones objetivo y la búsqueda de sus extremos absolutos.

---

## Question 16 [D7-D8] (Difficulty 8)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v16`
**Bloom:** Evaluate
**EBAU:** Razonamiento Matemático
**Context:** Regla de L'Hôpital.
**Expected_Success:** 0.60

### Enunciado
Calcula el valor del siguiente límite: $\lim_{x \to 0} \frac{e^x - 1 - x}{x^2}$.

### Options
- [ ] A) $0$ <!-- feedback: Incorrecto. Se ha llegado a esta conclusión sin resolver adecuadamente la indeterminación $0/0$ que presenta la función original. -->
- [x] B) $1/2$ <!-- feedback: Correcto. Aplicando la regla de L'Hôpital dos veces: primero $\lim \frac{e^x - 1}{2x}$, y tras otra aplicación $\lim \frac{e^x}{2} = 1/2$. -->
- [ ] C) $1$ <!-- feedback: Incorrecto. Error en el proceso de derivación sucesiva, probablemente al omitir el factor constante del denominador. -->
- [ ] D) $\infty$ <!-- feedback: Incorrecto. El límite es finito y determinado, reflejando el comportamiento de segundo orden del numerador cerca de cero. -->

### Explicación Pedagógica
Uso sistemático de la Regla de L'Hôpital para la resolución de límites indeterminados complejos que requieren múltiples derivaciones.

---

## Bloque D — Nivel D9–D10: Integración y Aplicaciones Avanzadas

---

## Question 17 [D9-D10] (Difficulty 9)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v17`
**Bloom:** Apply
**EBAU:** Resolución de Problemas
**Context:** Integración por partes.
**Expected_Success:** 0.60

### Enunciado
Calcula la integral indefinida de la función producto: $\int x \cdot e^x \, dx$.

### Options
- [ ] A) $\frac{x^2}{2} e^x + C$ <!-- feedback: Incorrecto. Error conceptual grave al intentar integrar el producto de funciones como si fuera el producto de sus integrales individuales. -->
- [x] B) $(x - 1)e^x + C$ <!-- feedback: Correcto. Aplicando integración por partes con $u=x, dv=e^x dx$: $\int u dv = uv - \int v du = xe^x - \int e^x dx = xe^x - e^x$. -->
- [ ] C) $xe^x + e^x + C$ <!-- feedback: Incorrecto. Se ha cometido un error de signo al aplicar la fórmula fundamental de la integración por partes. -->
- [ ] D) $e^x + C$ <!-- feedback: Incorrecto. La expresión resultante es incompleta al ignorar la contribución del término polinómico durante el proceso de integración. -->

### Explicación Pedagógica
Aplicación de la técnica de integración por partes para resolver integrales de productos de funciones algebraicas y trascendentes.

---

## Question 18 [D9-D10] (Difficulty 9)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v18`
**Bloom:** Analyze
**EBAU:** Razonamiento Matemático
**Context:** Aplicación de la integral definida al cálculo de áreas.
**Expected_Success:** 0.60

### Enunciado
Calcula el área de la región del plano limitada por la curva $y = x^2$, el eje de abscisas ($OX$) y las rectas verticales $x = 0$ y $x = 3$.

### Options
- [ ] A) $3$ uds² <!-- feedback: Incorrecto. Resultado numérico derivado de una integración o evaluación errónea de la función primitiva. -->
- [ ] B) $27$ uds² <!-- feedback: Incorrecto. Se ha omitido dividir por el exponente al calcular la primitiva de $x^2$, que es $x^3/3$. -->
- [x] C) $9$ uds² <!-- feedback: Correcto. El área es $\int_0^3 x^2 dx = [\frac{x^3}{3}]_0^3 = \frac{27}{3} - 0 = 9$ unidades cuadradas. -->
- [ ] D) $18$ uds² <!-- feedback: Incorrecto. Error de cálculo aritmético final tras haber planteado correctamente la integral definida. -->

### Explicación Pedagógica
Cálculo de áreas de recintos planos mediante la aplicación de la integral definida y el uso de la Regla de Barrow para la evaluación de primitivas.

---

## Question 19 [D9-D10] (Difficulty 10)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v19`
**Bloom:** Evaluate
**EBAU:** Razonamiento Matemático
**Context:** Teorema Fundamental del Cálculo.
**Expected_Success:** 0.60

### Enunciado
Sea la función definida integralmente $F(x) = \int_0^x \cos(t^2) \, dt$. ¿Cuál es el valor de su derivada $F'(x)$ según el Teorema Fundamental del Cálculo?

### Options
- [x] A) $\cos(x^2)$ <!-- feedback: Correcto. Según el Teorema Fundamental del Cálculo, si $F(x)$ es la función integral de $f(t)$, entonces $F'(x) = f(x)$. -->
- [ ] B) $-\sin(x^2) \cdot 2x$ <!-- feedback: Incorrecto. Esta expresión corresponde a la derivada de la función interna $\cos(x^2)$, no a la derivada de su integral. -->
- [ ] C) $\sin(x^2)$ <!-- feedback: Incorrecto. No es necesario realizar la integración de la función coseno para hallar la derivada de la función integral resultante. -->
- [ ] D) $0$ <!-- feedback: Incorrecto. La función integral depende del límite superior $x$, por lo que su derivada no es nula a menos que el integrando sea cero. -->

### Explicación Pedagógica
Aplicación directa del Teorema Fundamental del Cálculo para determinar la tasa de cambio de funciones definidas mediante procesos de integración.

---

## Question 20 [D9-D10] (Difficulty 10)
**ID:** `ES-MAT-11-P1-analisis-funciones-001-v20`
**Bloom:** Create
**EBAU:** Modelación y Resolución de Problemas
**Context:** Optimización geométrica aplicada.
**Expected_Success:** 0.60

### Enunciado
Se desea diseñar un envase cilíndrico con una capacidad de 1 litro ($1000$ cm³). Para minimizar la cantidad de material (área total), ¿qué relación debe existir entre la altura $h$ y el radio $r$ del cilindro?

### Options
- [ ] A) $h = r$ <!-- feedback: Incorrecto. Esta proporción no minimiza el área superficial; el cilindro resultaría "demasiado ancho" para ser óptimo. -->
- [x] B) $h = 2r$ <!-- feedback: Correcto. Al derivar la función de área $A = 2\pi r^2 + 2\pi rh$ sujeta a volumen constante, se obtiene que la altura debe ser igual al diámetro. -->
- [ ] C) $h = \pi r$ <!-- feedback: Incorrecto. Esta relación no surge del análisis diferencial de la función de coste de material. -->
- [ ] D) $h = r/2$ <!-- feedback: Incorrecto. Proporción ineficiente que aumentaría el material necesario para contener el mismo volumen de un litro. -->

### Explicación Pedagógica
Modelización y resolución de problemas complejos de optimización industrial utilizando herramientas de cálculo diferencial aplicadas a la geometría.

---

### Explicación Pedagógica Final
Este bundle de Análisis de Funciones proporciona una cobertura integral del currículo de 2º de Bachillerato en España, alineado con los estándares de la EBAU. A través de las 20 preguntas, el estudiante recorre desde conceptos fundamentales de dominio y simetría hasta aplicaciones avanzadas del cálculo diferencial e integral, como la optimización de volúmenes y el Teorema Fundamental del Cálculo. El diseño de distractores permite identificar y corregir errores comunes en la simplificación algebraica, la aplicación de reglas de derivación y la interpretación geométrica de los resultados, consolidando una base sólida para las pruebas de acceso a la universidad.
