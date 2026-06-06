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
**EBAU:**  Razonamiento Matemático
**Context:** Definición de dominio de funciones racionales.

### Enunciado
Dada la función $f(x) = \frac{2x - 5}{x^2 - 9}$, ¿cuál es su dominio de definición en el conjunto de los números reales?

### Options
- [ ] A) $\mathbb{R} - \{3\}$ <!-- feedback: Incorrecto. Solo se excluye uno de los valores que anulan el denominador. -->
- [x] B) $\mathbb{R} - \{-3, 3\}$ <!-- feedback: Correcto. El denominador se anula para $x^2 - 9 = 0 \Rightarrow x = \pm 3$. -->
- [ ] C) $\mathbb{R} - \{2.5\}$ <!-- feedback: Incorrecto. Ese valor anula el numerador, no el denominador. -->
- [ ] D) $(3, +\infty)$ <!-- feedback: Incorrecto. Esto ignora todos los valores negativos y el intervalo entre -3 y 3 donde la función sí existe. -->

### Explicación Pedagógica
Identificación de los puntos de discontinuidad en funciones racionales mediante la resolución de ecuaciones cuadráticas en el denominador.

---

## Question 2 [D3-D4] (Difficulty 3)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v2`
**Bloom:** Understand
**EBAU:**  Modelización y Comunicación
**Context:** Interpretación de gráficas elementales.

### Enunciado
Si una función $g(x)$ es par, ¿qué tipo de simetría presenta su gráfica respecto a los ejes de coordenadas?

### Options
- [x] A) Simetría respecto al eje de ordenadas ($OY$). <!-- feedback: Correcto. Una función es par si $g(x) = g(-x)$, lo que implica simetría axial respecto al eje vertical. -->
- [ ] B) Simetría respecto al origen de coordenadas $(0,0)$. <!-- feedback: Incorrecto. Esa es la característica de las funciones impares. -->
- [ ] C) Simetría respecto al eje de abscisas ($OX$). <!-- feedback: Incorrecto. Si una gráfica fuera simétrica respecto al eje $OX$, no sería una función (un valor de $x$ tendría dos de $y$). -->
- [ ] D) No presenta ningún tipo de simetría. <!-- feedback: Incorrecto. Por definición, las funciones pares e impares presentan simetrías específicas. -->

### Explicación Pedagógica
Comprensión de las propiedades de simetría de las funciones y su representación geométrica.

---

## Question 3 [D3-D4] (Difficulty 4)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v3`
**Bloom:** Apply
**EBAU:**  Resolución de Problemas
**Context:** Composición de funciones.

### Enunciado
Dadas las funciones $f(x) = x + 2$ y $g(x) = x^2$, ¿cuál es la expresión de la función compuesta $(g \circ f)(x)$?

### Options
- [ ] A) $x^2 + 2$ <!-- feedback: Incorrecto. Esto es $g(x) + 2$, no la composición. -->
- [x] B) $(x + 2)^2$ <!-- feedback: Correcto. $(g \circ f)(x) = g(f(x)) = g(x+2) = (x+2)^2$. -->
- [ ] C) $x^2 + 4$ <!-- feedback: Incorrecto. Error común al elevar al cuadrado un binomio olvidando el término doble. -->
- [ ] D) $x^2 + 2x + 4$ <!-- feedback: Incorrecto. Aunque $(x+2)^2 = x^2 + 4x + 4$, esta opción tiene un error en el coeficiente del término lineal. -->

### Explicación Pedagógica
Aplicación de la regla de composición de funciones sustituyendo la función interna en la variable de la externa.

---

## Question 4 [D3-D4] (Difficulty 4)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v4`
**Bloom:** Analyze
**EBAU:**  Razonamiento Matemático
**Context:** Puntos de corte con los ejes.

### Enunciado
¿En qué punto corta al eje de abscisas ($OX$) la función $h(x) = \ln(x - 2)$?

### Options
- [ ] A) $(0, 0)$ <!-- feedback: Incorrecto. La función logaritmo no está definida para $x=0$ en este caso. -->
- [ ] B) $(2, 0)$ <!-- feedback: Incorrecto. En $x=2$, el argumento del logaritmo es 0, donde el logaritmo tiende a $-\infty$. -->
- [x] C) $(3, 0)$ <!-- feedback: Correcto. Corta al eje $OX$ cuando $h(x)=0 \Rightarrow \ln(x-2) = 0 \Rightarrow x-2 = e^0 = 1 \Rightarrow x=3$. -->
- [ ] D) $(e, 0)$ <!-- feedback: Incorrecto. Confusión con la base del logaritmo. -->

### Explicación Pedagógica
Cálculo de raíces de funciones logarítmicas mediante la aplicación de la definición de logaritmo.

---

## Bloque B — Nivel D5–D6: Límites, Continuidad y Asíntotas

---

## Question 5 [D5-D6] (Difficulty 5)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v5`
**Bloom:** Apply
**EBAU:**  Resolución de Problemas
**Context:** Cálculo de límites en el infinito.

### Enunciado
Calcula el valor del siguiente límite: $\lim_{x \to \infty} \frac{3x^2 - 5x + 1}{2x^2 + 7}$.

### Options
- [ ] A) $0$ <!-- feedback: Incorrecto. Los grados del numerador y denominador son iguales, por lo que el límite es el cociente de los coeficientes principales. -->
- [ ] B) $\infty$ <!-- feedback: Incorrecto. El grado del numerador no es mayor que el del denominador. -->
- [x] C) $3/2$ <!-- feedback: Correcto. Al ser del mismo grado, el límite es $3/2$. -->
- [ ] D) $3$ <!-- feedback: Incorrecto. Se ha olvidado el coeficiente del denominador. -->

### Explicación Pedagógica
Resolución de indeterminaciones del tipo $\infty/\infty$ comparando los grados de los polinomios.

---

## Question 6 [D5-D6] (Difficulty 5)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v6`
**Bloom:** Analyze
**EBAU:**  Razonamiento Matemático
**Context:** Identificación de asíntotas verticales.

### Enunciado
¿Cuál de las siguientes rectas es una asíntota vertical de la función $f(x) = \frac{x + 1}{x^2 - 1}$?

### Options
- [ ] A) $x = 1$ y $x = -1$ <!-- feedback: Incorrecto. En $x = -1$ hay una discontinuidad evitable, no una asíntota vertical. -->
- [x] B) $x = 1$ <!-- feedback: Correcto. $\lim_{x \to 1} f(x) = \infty$. En $x = -1$, el límite es finito ($-1/2$). -->
- [ ] C) $y = 0$ <!-- feedback: Incorrecto. Esta es la asíntota horizontal, no vertical. -->
- [ ] D) $x = -1$ <!-- feedback: Incorrecto. En este punto el numerador también se anula y el límite resulta finito. -->

### Explicación Pedagógica
Distinción entre discontinuidades evitables y asíntotas verticales mediante el estudio de límites laterales.

---

## Question 7 [D5-D6] (Difficulty 5)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v7`
**Bloom:** Apply
**EBAU:**  Resolución de Problemas
**Context:** Continuidad de funciones a trozos.

### Enunciado
Halla el valor de $k$ para que la función $f(x) = \begin{cases} x + k & \text{si } x < 2 \\ x^2 - 1 & \text{si } x \geq 2 \end{cases}$ sea continua en $x = 2$.

### Options
- [ ] A) $k = 2$ <!-- feedback: Incorrecto. Error de cálculo en el límite por la derecha. -->
- [x] B) $k = 1$ <!-- feedback: Correcto. Límite por la izquierda: $2+k$. Límite por la derecha: $2^2-1=3$. Igualando: $2+k=3 \Rightarrow k=1$. -->
- [ ] C) $k = 3$ <!-- feedback: Incorrecto. Valor obtenido al no considerar la sustitución de $x$. -->
- [ ] D) No existe ningún valor de $k$. <!-- feedback: Incorrecto. Es una discontinuidad de salto finito que se puede evitar igualando los límites. -->

### Explicación Pedagógica
Aplicación de las condiciones de continuidad en funciones definidas a trozos mediante límites laterales.

---

## Question 8 [D5-D6] (Difficulty 6)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v8`
**Bloom:** Analyze
**EBAU:**  Razonamiento Matemático
**Context:** Asíntotas oblicuas.

### Enunciado
¿Cuál es la condición necesaria para que una función racional $P(x)/Q(x)$ presente una asíntota oblicua?

### Options
- [ ] A) Que el grado de $P(x)$ sea igual al de $Q(x)$. <!-- feedback: Incorrecto. En ese caso tendría asíntota horizontal. -->
- [x] B) Que el grado de $P(x)$ sea exactamente una unidad mayor que el de $Q(x)$. <!-- feedback: Correcto. Esta condición permite obtener un cociente lineal en la división de polinomios. -->
- [ ] C) Que el grado de $Q(x)$ sea mayor que el de $P(x)$. <!-- feedback: Incorrecto. En ese caso la asíntota horizontal es $y=0$. -->
- [ ] D) Que la función no tenga asíntotas verticales. <!-- feedback: Incorrecto. Una función puede tener ambos tipos de asíntotas. -->

### Explicación Pedagógica
Identificación de las condiciones de existencia de asíntotas oblicuas basadas en el grado de los polinomios.

---

## Question 9 [D5-D6] (Difficulty 6)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v9`
**Bloom:** Apply
**EBAU:**  Resolución de Problemas
**Context:** Límites con indeterminación $0/0$.

### Enunciado
Calcula $\lim_{x \to 3} \frac{x^2 - 9}{x - 3}$.

### Options
- [ ] A) $0$ <!-- feedback: Incorrecto. Indeterminación no resuelta. -->
- [ ] B) $3$ <!-- feedback: Incorrecto. Error al simplificar la expresión. -->
- [x] C) $6$ <!-- feedback: Correcto. $\frac{(x-3)(x+3)}{x-3} = x+3$. El límite cuando $x \to 3$ es $3+3=6$. -->
- [ ] D) No existe. <!-- feedback: Incorrecto. Es una discontinuidad evitable. -->

### Explicación Pedagógica
Resolución de indeterminaciones $0/0$ mediante factorización y simplificación de fracciones algebraicas.

---

## Question 10 [D5-D6] (Difficulty 6)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v10`
**Bloom:** Understand
**EBAU:**  Comunicación
**Context:** Crecimiento y decrecimiento.

### Enunciado
Si una función $f(x)$ es estrictamente decreciente en todo su dominio, ¿qué podemos afirmar sobre su derivada $f'(x)$ (suponiendo que existe)?

### Options
- [ ] A) $f'(x) > 0$ para todo $x$. <!-- feedback: Incorrecto. Eso indicaría que es creciente. -->
- [x] B) $f'(x) < 0$ para todo $x$. <!-- feedback: Correcto. Una derivada negativa implica una pendiente negativa en la recta tangente, lo que corresponde a una función decreciente. -->
- [ ] C) $f'(x) = 0$ para todo $x$. <!-- feedback: Incorrecto. Eso indicaría que la función es constante. -->
- [ ] D) La derivada debe ser también decreciente. <!-- feedback: Incorrecto. El signo de la derivada indica el crecimiento de la función, no el de la propia derivada. -->

### Explicación Pedagógica
Relación entre el signo de la primera derivada y el comportamiento de crecimiento de una función.

---

## Bloque C — Nivel D7–D8: Derivación y Optimización

---

## Question 11 [D7-D8] (Difficulty 7)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v11`
**Bloom:** Apply
**EBAU:**  Resolución de Problemas
**Context:** Regla de la cadena.

### Enunciado
Calcula la derivada de la función $f(x) = \sin(x^2 + 1)$.

### Options
- [ ] A) $\cos(x^2 + 1)$ <!-- feedback: Incorrecto. Se ha olvidado multiplicar por la derivada del argumento (regla de la cadena). -->
- [x] B) $2x \cdot \cos(x^2 + 1)$ <!-- feedback: Correcto. Derivada de la externa ($\cos$) por la de la interna ($2x$). -->
- [ ] C) $x^2 \cdot \cos(x^2 + 1)$ <!-- feedback: Incorrecto. Error en la derivada de la función interna. -->
- [ ] D) $2x \cdot \sin(x^2 + 1)$ <!-- feedback: Incorrecto. No se ha cambiado la función seno por coseno. -->

### Explicación Pedagógica
Aplicación de la regla de la cadena para funciones compuestas trigonométricas.

---

## Question 12 [D7-D8] (Difficulty 7)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v12`
**Bloom:** Analyze
**EBAU:**  Razonamiento Matemático
**Context:** Recta tangente.

### Enunciado
Halla la pendiente de la recta tangente a la curva $y = x^2 - 4x + 5$ en el punto donde $x = 1$.

### Options
- [ ] A) $1$ <!-- feedback: Incorrecto. Ese es el valor de la función, no de su derivada. -->
- [ ] B) $2$ <!-- feedback: Incorrecto. Valor obtenido de una derivación incorrecta. -->
- [x] C) $-2$ <!-- feedback: Correcto. $y' = 2x - 4$. Para $x=1$, $y'(1) = 2(1) - 4 = -2$. -->
- [ ] D) $0$ <!-- feedback: Incorrecto. La pendiente es cero en el vértice ($x=2$), no en $x=1$. -->

### Explicación Pedagógica
Cálculo de la pendiente de la recta tangente mediante la evaluación de la primera derivada en un punto dado.

---

## Question 13 [D7-D8] (Difficulty 7)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v13`
**Bloom:** Analyze
**EBAU:**  Razonamiento Matemático
**Context:** Puntos críticos y extremos.

### Enunciado
¿En qué valor de $x$ presenta la función $f(x) = x^3 - 3x$ un máximo relativo?

### Options
- [ ] A) $x = 0$ <!-- feedback: Incorrecto. En $x=0$ hay un punto de corte, no un extremo. -->
- [x] B) $x = -1$ <!-- feedback: Correcto. $f'(x) = 3x^2 - 3 = 0 \Rightarrow x = \pm 1$. $f''(x) = 6x$. $f''(-1) = -6 < 0$, por lo que es un máximo. -->
- [ ] C) $x = 1$ <!-- feedback: Incorrecto. $f''(1) = 6 > 0$, por lo que es un mínimo relativo. -->
- [ ] D) $x = 3$ <!-- feedback: Incorrecto. No es un punto donde la derivada se anule. -->

### Explicación Pedagógica
Identificación y clasificación de extremos relativos mediante el uso de la primera y segunda derivada.

---

## Question 14 [D7-D8] (Difficulty 8)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v14`
**Bloom:** Evaluate
**EBAU:**  Razonamiento Matemático
**Context:** Curvatura e inflexión.

### Enunciado
¿Cuál es el intervalo de concavidad hacia arriba (convexa) de la función $g(x) = x^4 - 6x^2$?

### Options
- [ ] A) $(-\infty, \infty)$ <!-- feedback: Incorrecto. La curvatura cambia en los puntos de inflexión. -->
- [x] B) $(-\infty, -1) \cup (1, \infty)$ <!-- feedback: Correcto. $g'(x) = 4x^3 - 12x$; $g''(x) = 12x^2 - 12$. $g''(x) > 0 \Rightarrow 12(x^2 - 1) > 0 \Rightarrow |x| > 1$. -->
- [ ] C) $(-1, 1)$ <!-- feedback: Incorrecto. En este intervalo la segunda derivada es negativa (cóncava hacia abajo). -->
- [ ] D) $(0, \infty)$ <!-- feedback: Incorrecto. Ignora el comportamiento en los valores negativos. -->

### Explicación Pedagógica
Estudio de la curvatura de una función mediante el análisis del signo de la segunda derivada.

---

## Question 15 [D7-D8] (Difficulty 8)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v15`
**Bloom:** Apply
**EBAU:**  Resolución de Problemas
**Context:** Optimización básica.

### Enunciado
Queremos dividir un número 12 en dos sumandos tales que su producto sea máximo. ¿Cuáles son esos números?

### Options
- [ ] A) 4 y 8 <!-- feedback: Incorrecto. El producto es 32, no es el máximo posible. -->
- [x] B) 6 y 6 <!-- feedback: Correcto. Función a maximizar $P(x) = x(12-x) = 12x - x^2$. $P'(x) = 12 - 2x = 0 \Rightarrow x=6$. -->
- [ ] C) 1 y 11 <!-- feedback: Incorrecto. El producto es 11, el mínimo para sumandos enteros positivos. -->
- [ ] D) 5 y 7 <!-- feedback: Incorrecto. El producto es 35, cercano pero no el máximo. -->

### Explicación Pedagógica
Resolución de problemas de optimización mediante el planteamiento de funciones y búsqueda de extremos absolutos.

---

## Question 16 [D7-D8] (Difficulty 8)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v16`
**Bloom:** Evaluate
**EBAU:**  Razonamiento Matemático
**Context:** Regla de L'Hôpital.

### Enunciado
Calcula el límite $\lim_{x \to 0} \frac{e^x - 1 - x}{x^2}$.

### Options
- [ ] A) $0$ <!-- feedback: Incorrecto. Indeterminación $0/0$ no resuelta correctamente. -->
- [x] B) $1/2$ <!-- feedback: Correcto. Aplicando L'Hôpital dos veces: $\lim \frac{e^x - 1}{2x} = \lim \frac{e^x}{2} = 1/2$. -->
- [ ] C) $1$ <!-- feedback: Incorrecto. Error al aplicar la derivada del denominador. -->
- [ ] D) $\infty$ <!-- feedback: Incorrecto. El límite es finito. -->

### Explicación Pedagógica
Uso de la Regla de L'Hôpital para resolver límites con indeterminaciones persistentes del tipo $0/0$.

---

## Bloque D — Nivel D9–D10: Integración y Aplicaciones Avanzadas

---

## Question 17 [D9-D10] (Difficulty 9)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v17`
**Bloom:** Apply
**EBAU:**  Resolución de Problemas
**Context:** Integración por partes.

### Enunciado
Calcula la integral indefinida $\int x \cdot e^x \, dx$.

### Options
- [ ] A) $\frac{x^2}{2} e^x + C$ <!-- feedback: Incorrecto. Error al integrar un producto como si fuera el producto de las integrales. -->
- [x] B) $(x - 1)e^x + C$ <!-- feedback: Correcto. Usando integración por partes: $u=x, dv=e^x dx \Rightarrow du=dx, v=e^x$. $\int u dv = uv - \int v du = xe^x - e^x$. -->
- [ ] C) $xe^x + e^x + C$ <!-- feedback: Incorrecto. Error en el signo de la fórmula de integración por partes. -->
- [ ] D) $e^x + C$ <!-- feedback: Incorrecto. Falta considerar el factor $x$ en la integración. -->

### Explicación Pedagógica
Aplicación de la técnica de integración por partes en productos de funciones algebraicas y exponenciales.

---

## Question 18 [D9-D10] (Difficulty 9)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v18`
**Bloom:** Analyze
**EBAU:**  Razonamiento Matemático
**Context:** Área bajo una curva.

### Enunciado
Calcula el área del recinto limitado por la curva $y = x^2$, el eje $OX$ y las rectas $x = 0$ y $x = 3$.

### Options
- [ ] A) $3$ uds² <!-- feedback: Incorrecto. Error en la evaluación de la integral. -->
- [ ] B) $27$ uds² <!-- feedback: Incorrecto. Olvido del denominador al integrar $x^2$. -->
- [x] C) $9$ uds² <!-- feedback: Correcto. $\int_0^3 x^2 dx = [\frac{x^3}{3}]_0^3 = \frac{27}{3} - 0 = 9$. -->
- [ ] D) $18$ uds² <!-- feedback: Incorrecto. Error de cálculo aritmético. -->

### Explicación Pedagógica
Cálculo de áreas de recintos planos mediante la aplicación de la integral definida y la regla de Barrow.

---

## Question 19 [D9-D10] (Difficulty 10)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v19`
**Bloom:** Evaluate
**EBAU:**  Razonamiento Matemático
**Context:** Teorema Fundamental del Cálculo.

### Enunciado
Si $F(x) = \int_0^x \cos(t^2) \, dt$, ¿cuál es el valor de la derivada $F'(x)$?

### Options
- [x] A) $\cos(x^2)$ <!-- feedback: Correcto. Por el Teorema Fundamental del Cálculo, la derivada de una función integral es la función integrando evaluada en el límite superior. -->
- [ ] B) $-\sin(x^2) \cdot 2x$ <!-- feedback: Incorrecto. Esto sería la derivada de $\cos(x^2)$, no de su integral. -->
- [ ] C) $\sin(x^2)$ <!-- feedback: Incorrecto. No es necesario integrar la función interna para hallar la derivada de la función integral. -->
- [ ] D) $0$ <!-- feedback: Incorrecto. La función integral no es constante, depende de $x$. -->

### Explicación Pedagógica
Aplicación directa del Teorema Fundamental del Cálculo para la derivación de funciones definidas mediante integrales.

---

## Question 20 [D9-D10] (Difficulty 10)

**ID:** `ES-MAT-11-P1-analisis-funciones-001-v20`
**Bloom:** Create
**EBAU:**  Modelación
**Context:** Problema de optimización con geometría.

### Enunciado
Se desea construir un envase cilíndrico de 1 litro ($1000$ cm³) de capacidad. Para minimizar el material utilizado (área total), la relación entre la altura $h$ y el radio $r$ del cilindro debe ser:

### Options
- [ ] A) $h = r$ <!-- feedback: Incorrecto. El área no se minimiza cuando la altura es igual al radio. -->
- [x] B) $h = 2r$ <!-- feedback: Correcto. Tras plantear $A = 2\pi r^2 + 2\pi rh$ y sustituir $h = 1000/(\pi r^2)$, al derivar e igualar a cero se obtiene que el diámetro debe ser igual a la altura. -->
- [ ] C) $h = \pi r$ <!-- feedback: Incorrecto. Relación sin fundamento en la derivada del área. -->
- [ ] D) $h = r/2$ <!-- feedback: Incorrecto. Esta relación maximizaría el área para un volumen dado en comparación con la solución óptima. -->

### Explicación Pedagógica
Modelización y resolución de un problema de optimización aplicado a la ingeniería de empaques utilizando cálculo diferencial.
