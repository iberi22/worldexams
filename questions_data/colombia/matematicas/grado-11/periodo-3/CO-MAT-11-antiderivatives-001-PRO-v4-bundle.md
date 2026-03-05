---
id: "CO-MAT-11-antiderivatives-001-PRO"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Antiderivadas e Integrales Indefinidas Básicas"
periodo: 3
protocol_version: "4.1"
total_questions: 20
difficulty_range: "5-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["Interpretación", "Formulación", "Argumentación"]
cognitive_levels: ["Analyze", "Evaluate", "Synthesis", "Transfer"]
estado: "draft"
creador: "Antigravity (Protocol v4.1)"
generation_date: "2026-03-03"
source: "Saber 11 - Mathematics Framework"
source_license: "CC BY-SA 4.0"
---

## Contexto 1: Reconstruyendo el Pasado (La Antiderivada)
Si la derivada nos permite conocer la velocidad a partir de la posición, la integral nos permite realizar el proceso inverso: reconstruir la trayectoria conociendo solo la velocidad. En la ciencia forense, conocer la tasa a la que se enfría un cuerpo permite "integrar" hacia atrás en el tiempo para determinar la hora del fallecimiento. Matemáticamente, buscar una antiderivada es resolver el problema: "¿Qué función, al ser derivada, produce este resultado?". Debido a que la derivada de una constante es cero, este proceso siempre introduce una "constante de integración" $+C$, representando una familia infinita de curvas posibles.

---

## Question 1 (Analisis - Dificultad 5)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v1`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál es la antiderivada general de $f(x) = 3x^2$?

### Opciones
- [ ] A) $6x + C$
- [x] B) $x^3 + C$
- [ ] C) $x^2 + C$
- [ ] D) $3x^3 + C$

### Explicación Pedagógica
Usamos la regla de la potencia invertida: $\int x^n dx = \frac{x^{n+1}}{n+1} + C$.
Para $3x^2$: $3 \cdot \frac{x^{2+1}}{2+1} = 3 \cdot \frac{x^3}{3} = x^3$.
Añadimos la constante $+C$ porque la derivada de $x^3 + 5$, $x^3 - 10$ o cualquier $x^3 + constante$ es siempre $3x^2$.

---

## Question 2 (Evaluación - Dificultad 6)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v2`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Halle la integral indefinida: $\int (4x^3 - 2x + 5) dx$.

### Opciones
- [ ] A) $x^4 - x^2 + 5$
- [x] B) $x^4 - x^2 + 5x + C$
- [ ] C) $12x^2 - 2 + C$
- [ ] D) $x^4 / 4 - x^2 / 2 + 5x + C$

### Explicación Pedagógica
Integramos término a término:
- $\int 4x^3 dx = 4(x^4/4) = x^4$.
- $\int -2x dx = -2(x^2/2) = -x^2$.
- $\int 5 dx = 5x$.
Sumando todo y añadiendo la constante: $x^4 - x^2 + 5x + C$.

---

## Question 3 (Síntesis - Dificultad 7)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre la integral indefinida $\int \frac{1}{x} dx$ (con $x \neq 0$), seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) El resultado es $\ln|x| + C$. <!-- weight: 1.0 -->
- [x] B) No se puede usar la regla de la potencia $\frac{x^{n+1}}{n+1}$ porque el denominador sería cero. <!-- weight: 1.0 -->
- [ ] C) El resultado es $-x^{-2} + C$.
- [x] D) Se utiliza el valor absoluto $|x|$ porque el logaritmo solo está definido para números positivos. <!-- weight: 1.0 -->
- [ ] E) La integral es siempre 0.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B, D) La integral de $1/x$ es la excepción a la regla de potencia ($n=-1$). Como la derivada de $\ln x$ es $1/x$, la integral es el logaritmo. El valor absoluto (D) extiende el dominio de la antiderivada a los números negativos, donde $1/x$ también existe.

---

## Question 4 (Análisis de Trigonométricas - Dificultad 6)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v4`
### Enunciado
¿Cuál es la integral indefinida de $f(x) = \sin x$?

### Opciones
- [ ] A) $\cos x + C$
- [x] B) $-\cos x + C$
- [ ] C) $\sin x + C$
- [ ] D) $-\sin x + C$

### Explicación Pedagógica
Sabemos que $\frac{d}{dx}(\cos x) = -\sin x$. Por lo tanto, para obtener $+\sin x$, debemos derivar $-\cos x$. El signo negativo es una de las fuentes de error más comunes en el cálculo integral básico.

---

## Question 5 (Genio - Dificultad 8)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Calcule $\int e^{2x} dx$.

### Opciones
- [x] A) $\frac{1}{2} e^{2x} + C$ <!-- weight: 1.0 -->
- [x] B) $0.5 e^{2x} + C$ <!-- weight: 1.0 -->
- [ ] C) $2 e^{2x} + C$ <!-- weight: 0.0 -->
- [ ] D) $e^{2x} + C$ <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Aplica correctamente la regla de sustitución simple o el inverso de la regla de la cadena).

### Explicación Pedagógica
Al derivar $e^{2x}$, obtenemos $2 e^{2x}$ (por la cadena). Para que el resultado de la derivada sea simplemente $e^{2x}$, la función original debió tener un $1/2$ que cancelara ese 2. En general, $\int e^{ax} dx = \frac{1}{a} e^{ax} + C$.

---

## Contexto 2: El Significado de la Constante C
En física, la constante de integración $+C$ representa las "Condiciones Iniciales". Si conocemos la aceleración de un cohete, podemos hallar su velocidad integrada, pero no sabremos qué tan rápido iba al principio sin un dato extra. Esa ambigüedad matemática se resuelve en el mundo real mediante la medición del estado inicial del sistema en $t=0$.

---

## Question 6 (Transferencia - Dificultad 9)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v6`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Transfer

### Enunciado
Un objeto se mueve con una velocidad $v(t) = 6t + 2$ m/s. Si en el tiempo $t=0$ el objeto estaba en la posición $s=10$ metros, halle la función de posición exacta $s(t)$.

### Opciones
- [ ] A) $s(t) = 3t^2 + 2t$
- [ ] B) $s(t) = 6t^2 + 2t + 10$
- [x] C) $s(t) = 3t^2 + 2t + 10$
- [ ] D) $s(t) = 3t^2 + 10$

### Explicación Pedagógica
1. Integramos la velocidad: $s(t) = \int (6t + 2) dt = 3t^2 + 2t + C$.
2. Usamos la condición inicial $s(0) = 10$:
   $10 = 3(0)^2 + 2(0) + C \rightarrow 10 = C$.
3. La función final es $s(t) = 3t^2 + 2t + 10$.

---

## Question 7 (Análisis de Integrales por Sustitución Simple - Dificultad 7)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v7`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
Halle $\int (2x + 1)^5 dx$.

### Opciones
- [ ] A) $\frac{(2x+1)^6}{6} + C$
- [x] B) $\frac{(2x+1)^6}{12} + C$ (Simplificación de $1/2 \cdot 1/6$)
- [ ] C) $(2x+1)^6 + C$
- [ ] D) $\frac{(2x+1)^4}{8} + C$

### Explicación Pedagógica
Usamos sustitución $u = 2x+1 \rightarrow du = 2dx \rightarrow dx = du/2$.
La integral queda: $\int u^5 \frac{du}{2} = \frac{1}{2} \cdot \frac{u^6}{6} = \frac{(2x+1)^6}{12} + C$.

---

## Question 8 (Evaluación de Raíces - Dificultad 5)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v8`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
¿Cuál es la integral de $\int \sqrt{x} dx$?

### Opciones
- [ ] A) $\frac{1}{2\sqrt{x}} + C$ (Esa es la derivada)
- [ ] B) $\frac{2x^2}{3} + C$
- [x] C) $\frac{2x^{3/2}}{3} + C$
- [ ] D) $x^{3/2} + C$

### Explicación Pedagógica
$x^{1/2}$ integrado: $\frac{x^{1/2 + 1}}{1/2 + 1} = \frac{x^{3/2}}{3/2} = \frac{2}{3} x^{3/2}$.

---

## Question 9 (Técnica de Linealidad - Dificultad 5)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v9`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Apply

### Enunciado
Si $\int f(x) dx = F(x) + C$ y $\int g(x) dx = G(x) + C$, ¿cuál es el resultado de $\int [3f(x) - 2g(x)] dx$?

### Opciones
- [ ] A) $F(3x) - G(2x) + C$
- [x] B) $3F(x) - 2G(x) + C$
- [ ] C) $F(x)^3 - G(x)^2 + C$
- [ ] D) 0

### Explicación Pedagógica
Al igual que la derivada, la integral es un operador lineal. Se puede separar en sumas/restas y las constantes multiplicativas pueden "salir" de la integral. Esto permite resolver problemas complejos dividiéndolos en partes más simples.

---

## Question 10 (Síntesis de Conceptos - Dificultad 8)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v10`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre la relación entre derivación e integración, seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) Según el Teorema Fundamental del Cálculo, son procesos inversos. <!-- weight: 1.0 -->
- [x] B) Si derivamos una integral indefinida, recuperamos la función original: $\frac{d}{dx} \int f(x) dx = f(x)$. <!-- weight: 1.0 -->
- [ ] C) Si integramos una derivada, recuperamos exactamente la función original sin cambios: $\int f'(x) dx = f(x)$. (Falla por la constante C)
- [x] D) $\int f'(x) dx = f(x) + C$. <!-- weight: 1.0 -->
- [ ] E) Todas las funciones tienen una antiderivada que se puede escribir con funciones elementales. (Falso, ej: $e^{-x^2}$)

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B, D) Establecen la conexión fundamental. C es falso porque al integrar perdemos la información de cualquier constante que el proceso de derivación haya borrado (la información se "aplana" a cero). Por eso necesitamos $+C$.

---

## Question 11 (Análisis de Integrales de Funciones Compuestas - Dificultad 9)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v11`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
Halle $\int \frac{x}{x^2 + 1} dx$.

### Opciones
- [ ] A) $\ln(x^2 + 1) + C$
- [x] B) $\frac{1}{2} \ln(x^2 + 1) + C$
- [ ] C) $\arctan(x) + C$
- [ ] D) $x \ln(x^2 + 1) + C$

### Explicación Pedagógica
Sustitución $u = x^2 + 1 \rightarrow du = 2x dx \rightarrow x dx = du/2$.
$\int \frac{du/2}{u} = \frac{1}{2} \ln|u| = \frac{1}{2} \ln(x^2 + 1) + C$.
Note que no necesitamos valor absoluto porque $x^2 + 1$ siempre es positivo.

---

## Question 12 (Evaluación de Trigonométricas Avanzadas - Dificultad 7)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v12`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
¿Cuál es la integral de $\sec^2 x dx$?

### Opciones
- [ ] A) $\sec x \tan x + C$
- [x] B) $\tan x + C$
- [ ] C) $\frac{\sec^3 x}{3} + C$
- [ ] D) $\cos^2 x + C$

### Explicación Pedagógica
Como la derivada de la tangente es la secante al cuadrado, la integral de la secante al cuadrado es la tangente. Conocer las derivadas de las funciones trigonométricas de memoria es la clave para resolver sus integrales.

---

## Question 13 (Genio Interdisciplinar - Dificultad 10)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Transfer

### Enunciado
**Física de la Gravedad:** Cerca de la superficie terrestre, la aceleración es constante $a = -g$. Integrando una vez obtenemos la velocidad $v(t) = -gt + v_0$. Integrando una segunda vez obtenemos la posición $y(t) = -\frac{1}{2}gt^2 + v_0t + y_0$.

¿Qué representan matemáticamente los términos $v_0$ y $y_0$ en este proceso de doble integración?

### Opciones
- [x] A) Son las constantes de integración $+C$ de cada paso, determinadas por las condiciones iniciales del lanzamiento. <!-- weight: 1.0 -->
- [x] B) Representan la velocidad y altura en el tiempo $t=0$. <!-- weight: 1.0 -->
- [ ] C) Son errores de medición que el cálculo intenta corregir. <!-- weight: 0.0 -->
- [ ] D) Son constantes universales como la gravedad. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (A es la respuesta matemática, B es su interpretación física).

### Explicación Pedagógica
Cada vez que integramos "hacia arriba" en la jerarquía del movimiento (Aceleración $\to$ Velocidad $\to$ Posición), perdemos un nivel de especificidad que debe ser recuperado con un dato externo (la $+C$). Sin esos datos ($v_0, y_0$), solo conocemos la *forma* de la trayectoria (parábola), pero no su ubicación exacta en el espacio.

---

## Question 14 (Análisis Lógico de Integrales de Funciones Recíprocas - Dificultad 5)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v14`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Halle $\int \frac{5}{x} dx$.

### Opciones
- [ ] A) $5x + C$
- [x] B) $5 \ln|x| + C$
- [ ] C) $\frac{5}{x^2} + C$
- [ ] D) $\ln|5x| + C$

### Explicación Pedagógica
La constante 5 sale de la integral: $5 \int \frac{1}{x} dx = 5 \ln|x| + C$.

---

## Question 15 (Indeterminación Especial - Dificultad 8)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v15`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Synthesis

### Enunciado
Calcule $\int \sin(3x) dx$.

### Opciones
- [ ] A) $3 \cos(3x) + C$
- [ ] B) $-3 \cos(3x) + C$
- [x] C) $-\frac{1}{3} \cos(3x) + C$
- [ ] D) $\frac{1}{3} \cos(3x) + C$

### Explicación Pedagógica
Sustitución $u = 3x \rightarrow du = 3dx \rightarrow dx = du/3$.
$\int \sin u \frac{du}{3} = \frac{1}{3} (-\cos u) = -\frac{1}{3} \cos(3x) + C$.
En derivación multiplicamos por la derivada interna; en integración dividimos por ella (para procesos lineales).

---

## Question 16 (Análisis de Integrales de Potencias Fraccionarias - Dificultad 7)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v16`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
Halle $\int \frac{1}{x^2} dx$.

### Opciones
- [ ] A) $\ln(x^2) + C$
- [ ] B) $2/x^3 + C$
- [x] C) $-1/x + C$
- [ ] D) $1/x + C$

### Explicación Pedagógica
$x^{-2}$ integrado: $\frac{x^{-2+1}}{-2+1} = \frac{x^{-1}}{-1} = -x^{-1} = -1/x$.

---

## Question 17 (Evaluación de Identidades en Integración - Dificultad 5)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v17`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Halle $\int (\sin^2 x + \cos^2 x) dx$.

### Opciones
- [ ] A) $\frac{\sin^3 x}{3} + \frac{\cos^3 x}{3} + C$
- [x] B) $x + C$
- [ ] C) $C$
- [ ] D) $\sin x + \cos x + C$

### Explicación Pedagógica
Antes de integrar, simplificamos usando la identidad pitagórica: $\sin^2 x + \cos^2 x = 1$.
La integral de $1 dx$ es simplemente $x + C$.

---

## Question 18 (Técnicas de Integración Combinada - Dificultad 9)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v18`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre la integral $\int e^{\sin x} \cos x dx$. Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) Se resuelve por el método de sustitución. <!-- weight: 1.0 -->
- [x] B) Haciendo $u = \sin x$, la integral se simplifica a $\int e^u du$. <!-- weight: 1.0 -->
- [x] C) El resultado es $e^{\sin x} + C$. <!-- weight: 1.0 -->
- [ ] D) El resultado es $\sin x \cdot e^{\cos x} + C$.
- [ ] E) No se puede resolver analíticamente.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B, C) Como la derivada de $\sin x$ ($\cos x$) está multiplicando afuera, la sustitución es perfecta y limpia la integral. Es un ejemplo de cómo identificar el patrón "función y su derivada" para aplicar el método de sustitución.

---

## Question 19 (Interpretación de Logaritmos - Dificultad 5)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v19`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
Halle $\int \frac{3}{2x + 5} dx$.

### Opciones
- [ ] A) $3 \ln|2x + 5| + C$
- [x] B) $1.5 \ln|2x + 5| + C$
- [ ] C) $\frac{3}{(2x+5)^2} + C$
- [ ] D) $3x / (x^2+5)$

### Explicación Pedagógica
Sustitución $u = 2x+5 \rightarrow du = 2dx \rightarrow dx = du/2$.
$\int \frac{3}{u} \frac{du}{2} = \frac{3}{2} \int \frac{1}{u} du = 1.5 \ln|u| + C$.

---

## Question 20 (Genio de Transferencia Total - Dificultad 10)

**ID:** `CO-MAT-11-antiderivatives-001-PRO-v20`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Evaluate

### Enunciado
**MASTER INTEGRATION:**

Una "función de error" en estadística (relacionada con la curva de Gauss) no tiene una antiderivada que se pueda escribir como suma o producto de funciones normales (senos, logaritmos, etc.). Sin embargo, la calculadora puede hallar su valor usando métodos numéricos.

¿Qué nos dice esto sobre el proceso de integración en comparación con la derivación?

### Options
- [x] A) Integrar es una operación "creativa" y reconstructiva mucho más difícil que derivar, ya que no siempre existe una fórmula cerrada para el resultado. <!-- weight: 1.0 -->
- [x] B) Derivar es como desarmar un reloj (siempre hay reglas); integrar es como intentar armar un reloj mezclando piezas de cajas distintas (no siempre encajan). <!-- weight: 1.0 -->
- [ ] C) Que la integración es inútil si no tiene fórmula. <!-- weight: 0.0 -->
- [ ] D) Que los matemáticos no han estudiado lo suficiente. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Aisla la naturaleza asimétrica del cálculo fundamental).

### Explicación Pedagógica
Cualquier función compuesta de piezas elementales ($x, \sin, e$) se puede derivar siguiendo las reglas. Pero no toda función elemental tiene una integral elemental. Esto eleva la integración a un arte de reconocimiento de patrones y búsqueda de formas, siendo uno de los desafíos intelectuales más altos del bachillerato avanzado.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Type | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 5 | single | Analyze | Interpretación | ✅ |
| 2 | ...-v2 | 6 | single | Evaluate | Formulación | ✅ |
| 3 | ...-v3 | 7 | multi-correct | Synthesis | Argumentación | ✅ |
| 4 | ...-v4 | 6 | single | Analyze | Interpretación | ✅ |
| 5 | ...-v5 | 8 | weighted | Evaluate | Argumentación | ✅ |
| 6 | ...-v6 | 9 | single | Transfer | Formulación | ✅ |
| 7 | ...-v7 | 7 | single | Apply | Formulación | ✅ |
| 8 | ...-v8 | 5 | single | Analyze | Formulación | ✅ |
| 9 | ...-v9 | 5 | single | Apply | Interpretación | ✅ |
| 10 | ...-v10| 8 | multi-correct | Synthesis | Argumentación | ✅ |
| 11 | ...-v11| 9 | single | Analyze | Formulación | ✅ |
| 12 | ...-v12| 7 | single | Evaluate | Formulación | ✅ |
| 13 | ...-v13| 10| weighted | Transfer | Argumentación | ✅ |
| 14 | ...-v14| 5 | single | Analyze | Interpretación | ✅ |
| 15 | ...-v15| 8 | single | Synthesis | Formulación | ✅ |
| 16 | ...-v16| 7 | single | Apply | Formulación | ✅ |
| 17 | ...-v17| 5 | single | Analyze | Interpretación | ✅ |
| 18 | ...-v18| 9 | multi-correct | Synthesis | Argumentación | ✅ |
| 19 | ...-v19| 5 | single | Analyze | Formulación | ✅ |
| 20 | ...-v20| 10| weighted | Evaluate | Argumentación | ✅ |
