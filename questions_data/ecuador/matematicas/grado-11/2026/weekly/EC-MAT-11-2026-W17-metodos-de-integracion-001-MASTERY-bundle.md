---
id: "EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle"
country: "ecuador"
grado: 11
asignatura: "matematicas"
tema: "metodos-de-integracion"
periodo: "weekly"
week: "W17"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "Bases Curriculares Ecuador + BGU"
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# MASTERY Bundle — Métodos de Integración (W17)

## Bloque A — Nivel D3–D4: Integración por Partes Básica

---

## Question 1 [D3]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v1
**Bloom:** Remember
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.85
**Contexto:** Un estudiante en la Escuela Politécnica Nacional (EPN) revisa las técnicas para integrar productos de funciones.

### Enunciado
¿Cuál es la fórmula fundamental de la integración por partes?

### Opciones
- [ ] A) $\int u \, dv = uv + \int v \, du$
  <!-- feedback: Incorrecto. El signo del segundo término debe ser negativo. -->
- [x] B) $\int u \, dv = uv - \int v \, du$
  <!-- feedback: Correcto. Esta fórmula se deriva de la regla del producto para derivadas. -->
- [ ] C) $\int u \, dv = u'v - uv'$
  <!-- feedback: Incorrecto. Confundió con la regla del cociente para derivadas. -->
- [ ] D) $\int u \, dv = \frac{u}{v} - \int \frac{du}{dv}$
  <!-- feedback: Incorrecto. Estructura de fórmula totalmente errónea. -->

### Explicacion Pedagogica
La integración por partes es una técnica basada en la inversión de la regla del producto, permitiendo resolver integrales donde el integrando es un producto de dos funciones de distinta naturaleza.

---

## Question 2 [D3]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v2
**Bloom:** Remember
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.80
**Contexto:** Elección de variables en integración por partes.

### Enunciado
En la regla mnemotécnica "LIATE" para elegir $u$, ¿qué representa la letra "A"?

### Opciones
- [ ] A) Funciones Arcos (Trigonométricas inversas).
  <!-- feedback: Incorrecto. Eso es la "I". -->
- [x] B) Funciones Algebráicas (Polinomios).
  <!-- feedback: Correcto. Los polinomios suelen elegirse como $u$ para que su grado disminuya al derivar. -->
- [ ] C) Funciones Angulares (Seno, Coseno).
  <!-- feedback: Incorrecto. Eso es la "T". -->
- [ ] D) Funciones Analíticas.
  <!-- feedback: Incorrecto. No es una categoría estándar en la regla LIATE. -->

### Explicacion Pedagogica
La regla LIATE (Logarítmicas, Inversas, Algebráicas, Trigonométricas, Exponenciales) ayuda a jerarquizar qué función es más conveniente derivar ($u$) y cuál integrar ($dv$).

---

## Question 3 [D4]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v3
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.75
**Contexto:** Integración de un producto simple de un polinomio y una exponencial.

### Enunciado
Calcule $\int x e^x \, dx$.

### Opciones
- [ ] A) $x e^x + C$
  <!-- feedback: Incorrecto. Olvidó el término negativo resultante de la fórmula. -->
- [x] B) $x e^x - e^x + C$
  <!-- feedback: Correcto. $u=x, dv=e^x dx \Rightarrow du=dx, v=e^x$. Entonces $uv - \int v du = x e^x - \int e^x dx = x e^x - e^x$. -->
- [ ] C) $\frac{1}{2}x^2 e^x + C$
  <!-- feedback: Incorrecto. Trató de integrar ambos términos por separado, lo cual es inválido. -->
- [ ] D) $e^x(x + 1) + C$
  <!-- feedback: Incorrecto. Error de signo en la factorización final. -->

### Explicacion Pedagogica
Aplicación básica de la integración por partes donde un factor polinómico se reduce a una constante tras la primera derivación.

---

## Question 4 [D4]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v4
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.70
**Contexto:** Integral del logaritmo natural.

### Enunciado
Halle $\int \ln(x) \, dx$ utilizando integración por partes con $u = \ln(x)$ y $dv = dx$.

### Opciones
- [ ] A) $1/x + C$
  <!-- feedback: Incorrecto. Esta es la derivada del logaritmo. -->
- [ ] B) $x \ln(x) + C$
  <!-- feedback: Incorrecto. Olvidó restar la integral de $v du$. -->
- [x] C) $x \ln(x) - x + C$
  <!-- feedback: Correcto. $u=\ln x, dv=dx \Rightarrow du=1/x dx, v=x$. $uv - \int v du = x \ln x - \int x(1/x) dx = x \ln x - x$. -->
- [ ] D) $\frac{(\ln x)^2}{2} + C$
  <!-- feedback: Incorrecto. Esta sería la integral de $\ln(x)/x$. -->

### Explicacion Pedagogica
Uso de la integración por partes para encontrar la antiderivada de funciones cuya integral no es inmediata pero cuya derivada es sencilla.

---

## Bloque B — Nivel D5–D6: Fracciones Parciales y Sustituciones Trigonométricas

---

## Question 5 [D5]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v5
**Bloom:** Understand
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.65
**Contexto:** Un ingeniero ambiental en el Parque Nacional Yasuní analiza la degradación de un compuesto químico mediante fracciones parciales.

### Enunciado
¿Para qué tipo de funciones es más útil el método de descomposición en fracciones parciales?

### Opciones
- [ ] A) Para productos de funciones exponenciales y trigonométricas.
  <!-- feedback: Incorrecto. Para eso se usa integración por partes. -->
- [x] B) Para funciones racionales donde el denominador puede factorizarse en factores lineales o cuadráticos.
  <!-- feedback: Correcto. Permite separar una fracción compleja en una suma de fracciones más simples de integrar. -->
- [ ] C) Para funciones que contienen raíces cuadradas de sumas de cuadrados.
  <!-- feedback: Incorrecto. Para eso se usa sustitución trigonométrica. -->
- [ ] D) Únicamente para polinomios de grado impar.
  <!-- feedback: Incorrecto. Se aplica a cualquier función racional propia (grado numerador < grado denominador). -->

### Explicacion Pedagogica
El método de fracciones parciales es una técnica algebraica que simplifica la integración de funciones racionales complejas convirtiéndolas en sumas de logaritmos o funciones racionales simples.

---

## Question 6 [D5]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v6
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.60
**Contexto:** Descomposición básica de factores lineales.

### Enunciado
¿Cuál es la forma de la descomposición en fracciones parciales de $\frac{1}{(x-2)(x+3)}$?

### Opciones
- [ ] A) $\frac{A}{(x-2)^2} + \frac{B}{(x+3)^2}$
  <!-- feedback: Incorrecto. Solo se usan cuadrados si los factores están repetidos. -->
- [x] B) $\frac{A}{x-2} + \frac{B}{x+3}$
  <!-- feedback: Correcto. Para factores lineales distintos, se asigna una constante a cada uno. -->
- [ ] C) $\frac{Ax+B}{(x-2)(x+3)}$
  <!-- feedback: Incorrecto. Esta es la forma original, no una descomposición. -->
- [ ] D) $\frac{A}{x-2} \cdot \frac{B}{x+3}$
  <!-- feedback: Incorrecto. La descomposición debe ser una suma, no un producto. -->

### Explicacion Pedagogica
Identificación de la estructura de la suma de fracciones parciales para denominadores con factores lineales no repetidos.

---

## Question 7 [D5]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v7
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.60
**Contexto:** Integral por sustitución trigonométrica.

### Enunciado
Para integrar $\int \sqrt{9 - x^2} \, dx$, ¿cuál es la sustitución trigonométrica más adecuada?

### Opciones
- [ ] A) $x = 3 \tan(\theta)$
  <!-- feedback: Incorrecto. Esto se usaría para $9 + x^2$. -->
- [x] B) $x = 3 \sin(\theta)$
  <!-- feedback: Correcto. Aprovecha la identidad $1 - \sin^2 = \cos^2$, lo cual elimina la raíz cuadrada. -->
- [ ] C) $x = 3 \sec(\theta)$
  <!-- feedback: Incorrecto. Esto se usaría para $x^2 - 9$. -->
- [ ] D) $x = 9 \sin(\theta)$
  <!-- feedback: Incorrecto. El coeficiente debe ser la raíz cuadrada de la constante 9. -->

### Explicacion Pedagogica
Selección del cambio de variable trigonométrico correcto basado en la estructura del radical presente en el integrando.

---

## Question 8 [D6]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v8
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.55
**Contexto:** Un sensor de flujo en una central hidroeléctrica en los Andes ecuatorianos mide una tasa dada por $f(x) = \frac{x+1}{x^2-1}$ para $x > 1$.

### Enunciado
Simplifique e integre $\int \frac{x+1}{x^2-1} \, dx$.

### Opciones
- [ ] A) $\ln(x^2 - 1) + C$
  <!-- feedback: Incorrecto. Olvidó simplificar la expresión racional primero. -->
- [x] B) $\ln|x - 1| + C$
  <!-- feedback: Correcto. $\frac{x+1}{(x-1)(x+1)} = \frac{1}{x-1}$. La integral es $\ln|x-1|$. -->
- [ ] C) $\frac{1}{2} \ln|x^2 - 1| + C$
  <!-- feedback: Incorrecto. Aplicó una sustitución directa ignorando la simplificación posible. -->
- [ ] D) $\ln|x + 1| + C$
  <!-- feedback: Incorrecto. El factor $(x+1)$ se cancela, quedando el denominador $(x-1)$. -->

### Explicacion Pedagogica
Importancia de la simplificación algebraica previa a la aplicación de métodos de integración complejos para evitar trabajo innecesario.

---

## Question 9 [D6]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v9
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.55
**Contexto:** Integración por partes aplicada dos veces (proceso cíclico o de reducción).

### Enunciado
Al integrar $\int x^2 \cos(x) \, dx$, ¿qué sucede con el término polinómico tras dos aplicaciones de integración por partes?

### Opciones
- [ ] A) El grado aumenta a $x^4$.
  <!-- feedback: Incorrecto. La derivación reduce el grado de los polinomios. -->
- [x] B) Se convierte en una constante, permitiendo una integración inmediata.
  <!-- feedback: Correcto. Primera derivada: $2x$. Segunda derivada: $2$. Esto simplifica el integrando final. -->
- [ ] C) Desaparece completamente de la expresión final.
  <!-- feedback: Incorrecto. Permanece en los términos $uv$ ya calculados. -->
- [ ] D) Se convierte en un logaritmo.
  <!-- feedback: Incorrecto. Los polinomios no se transforman en logaritmos al derivar. -->

### Explicacion Pedagogica
Comprensión del proceso de reducción de orden en la integración por partes para integrandos con factores polinómicos de grado superior.

---

## Question 10 [D6]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v10
**Bloom:** Analyze
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.50
**Contexto:** Identificación del método correcto.

### Enunciado
¿Cuál es el mejor método para resolver $\int \frac{x}{x^2 + 4} \, dx$?

### Opciones
- [x] A) Sustitución simple con $u = x^2 + 4$.
  <!-- feedback: Correcto. Como el numerador es (casi) la derivada del denominador, es el método más rápido. -->
- [ ] B) Sustitución trigonométrica con $x = 2 \tan(\theta)$.
  <!-- feedback: Incorrecto. Aunque funciona, es mucho más largo que la sustitución simple. -->
- [ ] C) Fracciones parciales.
  <!-- feedback: Incorrecto. El denominador $x^2+4$ es irreducible en los reales. -->
- [ ] D) Integración por partes.
  <!-- feedback: Incorrecto. No es una técnica eficiente para esta estructura de cociente. -->

### Explicacion Pedagogica
Jerarquización de métodos: siempre se debe buscar una sustitución simple antes de recurrir a técnicas más avanzadas.

---

## Bloque C — Nivel D7–D8: Técnicas Combinadas e Integración de Potencias Trigonométricas

---

## Question 11 [D7]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v11
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.45
**Contexto:** Un arquitecto en Quito diseña una cúpula cuya curva lateral sigue la función que resulta de integrar $f(x) = \frac{1}{x^2 - 1}$.

### Enunciado
Calcule $\int \frac{1}{x^2 - 1} \, dx$ usando fracciones parciales.

### Opciones
- [ ] A) $\ln|x^2 - 1| + C$
  <!-- feedback: Incorrecto. No consideró la descomposición del denominador. -->
- [x] B) $\frac{1}{2} \ln\left|\frac{x-1}{x+1}\right| + C$
  <!-- feedback: Correcto. $\frac{1}{(x-1)(x+1)} = \frac{1/2}{x-1} - \frac{1/2}{x+1}$. Al integrar: $\frac{1}{2}(\ln|x-1| - \ln|x+1|)$. -->
- [ ] C) $\arctan(x) + C$
  <!-- feedback: Incorrecto. Confundió con $x^2+1$ en el denominador. -->
- [ ] D) $\frac{1}{2} \ln|x^2 - 1| + C$
  <!-- feedback: Incorrecto. Esta sería la integral de $x/(x^2-1)$. -->

### Explicacion Pedagogica
Aplicación de fracciones parciales para integrar funciones con denominadores cuadráticos factorizables.

---

## Question 12 [D7]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v12
**Bloom:** Analyze
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.45
**Contexto:** Integración de potencias impares de seno y coseno.

### Enunciado
¿Cuál es el primer paso recomendado para resolver $\int \sin^3(x) \, dx$?

### Opciones
- [ ] A) Usar la identidad de ángulo doble.
  <!-- feedback: Incorrecto. Es mejor para potencias pares. -->
- [x] B) Separar un factor $\sin(x)$ y convertir el resto usando $\sin^2(x) = 1 - \cos^2(x)$.
  <!-- feedback: Correcto. Esto permite usar la sustitución $u = \cos x$. -->
- [ ] C) Integración por partes con $u = \sin^2(x)$.
  <!-- feedback: Incorrecto. Proceso más tedioso que la sustitución trigonométrica. -->
- [ ] D) Usar sustitución trigonométrica con $x = \arcsin(u)$.
  <!-- feedback: Incorrecto. Método circular que no simplifica el problema. -->

### Explicacion Pedagogica
Uso de identidades pitagóricas para preparar integrandos trigonométricos de potencia impar para una sustitución simple.

---

## Question 13 [D7]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v13
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.40
**Contexto:** Integral de producto de funciones cíclicas (Exponencial x Trigonométrica).

### Enunciado
Al integrar $\int e^x \sin(x) \, dx$ por partes dos veces, se vuelve a obtener la integral original multiplicada por una constante. ¿Qué técnica se usa para finalizar el cálculo?

### Opciones
- [ ] A) Se descarta el resultado por ser circular.
  <!-- feedback: Incorrecto. La circularidad es precisamente lo que permite resolverla. -->
- [x] B) Se despeja la integral de la ecuación resultante como si fuera una incógnita algebraica.
  <!-- feedback: Correcto. Si $I = \text{bloque} - I$, entonces $2I = \text{bloque} \Rightarrow I = \text{bloque}/2$. -->
- [ ] C) Se utiliza una tabla de integrales directamente.
  <!-- feedback: Incorrecto. El objetivo es conocer el procedimiento analítico. -->
- [ ] D) Se cambia a coordenadas polares.
  <!-- feedback: Incorrecto. No simplifica este tipo de integral de una variable. -->

### Explicacion Pedagogica
Resolución de integrales "recurrentes" mediante el despeje algebraico del término integral tras aplicaciones sucesivas de integración por partes.

---

## Question 14 [D8]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v14
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.40
**Contexto:** Fracciones parciales con factores lineales repetidos.

### Enunciado
Halle la forma de la descomposición de $\frac{x}{(x-1)^2(x+2)}$.

### Opciones
- [ ] A) $\frac{A}{x-1} + \frac{B}{x+2}$
  <!-- feedback: Incorrecto. Falta considerar la repetición del factor $(x-1)$. -->
- [x] B) $\frac{A}{x-1} + \frac{B}{(x-1)^2} + \frac{C}{x+2}$
  <!-- feedback: Correcto. Por cada potencia del factor repetido se debe incluir un término en la suma. -->
- [ ] C) $\frac{Ax+B}{(x-1)^2} + \frac{C}{x+2}$
  <!-- feedback: Incorrecto. Aunque es posible, la forma estándar para integración usa solo constantes en el numerador para factores lineales. -->
- [ ] D) $\frac{A}{(x-1)^2} + \frac{B}{x+2}$
  <!-- feedback: Incorrecto. Se pierde información del término de primer grado $(x-1)$. -->

### Explicacion Pedagogica
Reglas de descomposición para factores del denominador que aparecen con multiplicidad mayor a uno.

---

## Question 15 [D8]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v15
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.35
**Contexto:** Un modelo de crecimiento de peces en una laguna en Esmeraldas sigue una tasa $R(t) = \frac{100}{\sqrt{t^2+1}}$.

### Enunciado
¿Qué tipo de sustitución trigonométrica se requiere para integrar esta función?

### Opciones
- [ ] A) $t = \sin(\theta)$
  <!-- feedback: Incorrecto. Para $1-t^2$. -->
- [x] B) $t = \tan(\theta)$
  <!-- feedback: Correcto. Usa la identidad $1 + \tan^2 = \sec^2$ para eliminar la raíz. -->
- [ ] C) $t = \cos(\theta)$
  <!-- feedback: Incorrecto. No es una sustitución estándar para sumas de cuadrados. -->
- [ ] D) $t = \sec(\theta)$
  <!-- feedback: Incorrecto. Para $t^2-1$. -->

### Explicacion Pedagogica
Identificación de sustituciones basadas en identidades trigonométricas fundamentales para resolver integrandos con formas irracionales.

---

## Question 16 [D8]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v16
**Bloom:** Analyze
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.35
**Contexto:** Integración por partes con una función inversa y un polinomio.

### Enunciado
¿Cuál es la elección óptima de $u$ y $dv$ para $\int x \arctan(x) \, dx$?

### Opciones
- [ ] A) $u = x, dv = \arctan(x) dx$
  <!-- feedback: Incorrecto. No conocemos la integral de arcotangente de forma inmediata. -->
- [x] B) $u = \arctan(x), dv = x dx$
  <!-- feedback: Correcto. La derivada de arcotangente es algebraica ($1/(1+x^2)$), lo que simplifica la segunda integral. -->
- [ ] C) $u = x \arctan(x), dv = dx$
  <!-- feedback: Incorrecto. La derivada de $u$ se vuelve demasiado compleja. -->
- [ ] D) Se debe usar fracciones parciales directamente.
  <!-- feedback: Incorrecto. No es una función racional. -->

### Explicacion Pedagogica
Priorización de funciones trascendentes inversas como $u$ en la integración por partes para transformar el problema en una integral de funciones algebraicas.

---

## Bloque D — Nivel D9–D10: Desafíos de Sustitución y Fracciones Irreducibles

---

## Question 17 [D9]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.30
**Contexto:** Integración de una función racional con denominador cuadrático irreducible.

### Enunciado
Determine $\int \frac{1}{x^2 + 2x + 5} \, dx$. (Sugerencia: complete el cuadrado).

### Opciones
- [ ] A) $\ln(x^2 + 2x + 5) + C$
  <!-- feedback: Incorrecto. El numerador no es la derivada del denominador. -->
- [x] B) $\frac{1}{2} \arctan\left(\frac{x+1}{2}\right) + C$
  <!-- feedback: Correcto. $x^2+2x+5 = (x+1)^2 + 4$. La integral de $\frac{1}{u^2+a^2}$ es $\frac{1}{a}\arctan(u/a)$. -->
- [ ] C) $\arctan(x+1) + C$
  <!-- feedback: Incorrecto. Olvidó el factor $1/a = 1/2$. -->
- [ ] D) $\frac{1}{x+1} + C$
  <!-- feedback: Incorrecto. Error en la forma de la antiderivada de funciones cuadráticas positivas. -->

### Explicacion Pedagogica
Uso de la técnica de completar el cuadrado para transformar integrandos cuadráticos en formas estándar de arcotangente.

---

## Question 18 [D9]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v18
**Bloom:** Analyze
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.25
**Contexto:** Sustitución trigonométrica con cambio de límites (o retorno a variable original). Al resolver $\int \frac{1}{x^2\sqrt{x^2+4}} \, dx$ con $x=2\tan\theta$.

### Enunciado
¿A qué expresión equivale $\sin(\theta)$ en términos de $x$ tras realizar la sustitución?

### Opciones
- [ ] A) $\frac{x}{2}$
  <!-- feedback: Incorrecto. Esta es la tangente. -->
- [x] B) $\frac{x}{\sqrt{x^2+4}}$
  <!-- feedback: Correcto. Como $\tan\theta = x/2$, el cateto opuesto es $x$ y el adyacente es 2. La hipotenusa es $\sqrt{x^2+4}$. Luego $\sin\theta = \text{opuesto}/\text{hipotenusa}$. -->
- [ ] C) $\frac{2}{x}$
  <!-- feedback: Incorrecto. Esta es la cotangente. -->
- [ ] D) $\frac{2}{\sqrt{x^2+4}}$
  <!-- feedback: Incorrecto. Este es el coseno. -->

### Explicacion Pedagogica
Uso de triángulos rectángulos para retornar a la variable original $x$ tras aplicar sustituciones trigonométricas.

---

## Question 19 [D10]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.20
**Contexto:** Integración de una función racional impropia.

### Enunciado
Halle $\int \frac{x^3}{x-1} \, dx$.

### Opciones
- [ ] A) $\frac{x^4}{4(x-1)} + C$
  <!-- feedback: Incorrecto. No se integra el numerador y denominador por separado. -->
- [x] B) $\frac{x^3}{3} + \frac{x^2}{2} + x + \ln|x-1| + C$
  <!-- feedback: Correcto. Por división larga: $x^2+x+1 + \frac{1}{x-1}$. Al integrar da el resultado. -->
- [ ] C) $x^2 + x + 1 + C$
  <!-- feedback: Incorrecto. Olvidó el residuo de la división. -->
- [ ] D) $\frac{x^3}{3} + \ln|x-1| + C$
  <!-- feedback: Incorrecto. Omitió términos intermedios de la división polinómica. -->

### Explicacion Pedagogica
Necesidad de realizar la división de polinomios cuando el grado del numerador es mayor o igual al del denominador antes de integrar.

---

## Question 20 [D10]
**ID:** EC-MAT-11-2026-W17-metodos-de-integracion-001-MASTERY-bundle-v20
**Bloom:** Analyze
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.15
**Contexto:** Un problema de física teórica en la Politécnica Nacional sobre el trabajo realizado por una fuerza variable $F(x) = \frac{1}{(x^2+1)^2}$.

### Enunciado
¿Qué método o identidad se recomienda para resolver $\int \frac{1}{(x^2+1)^2} \, dx$?

### Opciones
- [ ] A) Sustitución simple $u = x^2+1$.
  <!-- feedback: Incorrecto. Falta el factor $x$ en el numerador. -->
- [x] B) Sustitución trigonométrica $x = \tan\theta$ seguido de identidades de reducción.
  <!-- feedback: Correcto. Transforma la integral en $\int \cos^2\theta \, d\theta$, que es fácil de resolver. -->
- [ ] C) Fracciones parciales directas.
  <!-- feedback: Incorrecto. El factor es cuadrático irreducible y ya está en su forma más simple. -->
- [ ] D) Integración por partes eligiendo $u = (x^2+1)^{-2}$.
  <!-- feedback: Incorrecto. Conduce a una integral más complicada. -->

### Explicacion Pedagogica
Resolución de potencias de factores cuadráticos irreducibles en el denominador mediante el uso de sustituciones trigonométricas avanzadas.
