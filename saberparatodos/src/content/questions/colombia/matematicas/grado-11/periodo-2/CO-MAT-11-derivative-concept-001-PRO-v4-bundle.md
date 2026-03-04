---
id: "CO-MAT-11-derivative-concept-001-PRO"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Concepto de Derivada como Razón de Cambio"
periodo: 2
protocol_version: "4.1"
total_questions: 20
difficulty_range: "4-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["Interpretación", "Formulación", "Argumentación"]
cognitive_levels: ["Analyze", "Evaluate", "Synthesis", "Transfer"]
estado: "draft"
creador: "Antigravity (Protocol v4.1)"
generation_date: "2026-03-03"
source: "Saber 11 - Mathematics Framework"
source_license: "CC BY-SA 4.0"
---

## Contexto 1: La Recta Tangente y la Velocidad Instantánea
Imagine que conduce un automóvil y mira el velocímetro en un instante exacto. Ese número no representa la distancia total recorrida, sino la "velocidad instantánea". Matemáticamente, si la posición es $f(t)$, la velocidad en el instante $a$ es la pendiente de la recta tangente a la curva en ese punto. Se define mediante el límite de la pendiente de las rectas secantes: $f'(a) = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}$. Este concepto es el corazón del Cálculo Diferencial y permite modelar cambios en tiempo real en física, biología y economía.

---

## Question 1 (Analisis - Dificultad 4)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v1`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Geométricamente, ¿qué representa la derivada de una función $f(x)$ evaluada en un punto $x = a$?

### Opciones
- [ ] A) El área bajo la curva desde el origen hasta $a$.
- [x] B) La pendiente de la recta tangente a la gráfica de $f$ en el punto $(a, f(a))$.
- [ ] C) El eje de simetría de la función.
- [ ] D) El valor máximo absoluto de la función.

### Explicación Pedagógica
La derivada mide la tasa de cambio instantánea. En una gráfica, esto se visualiza como la inclinación (pendiente) de la línea que toca a la curva en un solo punto (recta tangente). Las rectas secantes se aproximan a esta tangente a medida que la distancia entre los dos puntos tiende a cero.

---

## Question 2 (Evaluación - Dificultad 5)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v2`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Use la definición de límite ($f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$) para hallar la derivada de $f(x) = x^2$.

### Opciones
- [ ] A) $x$
- [x] B) $2x$
- [ ] C) $x^2 + h$
- [ ] D) 2

### Explicación Pedagógica
$\lim_{h \to 0} \frac{(x+h)^2 - x^2}{h} = \lim_{h \to 0} \frac{x^2 + 2xh + h^2 - x^2}{h}$
$= \lim_{h \to 0} \frac{2xh + h^2}{h} = \lim_{h \to 0} (2x + h) = 2x$.
Por lo tanto, la pendiente de la tangente en cualquier punto $x$ de una parábola es siempre el doble de $x$.

---

## Question 3 (Síntesis - Dificultad 7)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Dada la gráfica de una función con un "pico" (como $f(x) = |x|$ en $x=0$). Seleccione TODAS las afirmaciones correctas sobre su derivabilidad.

### Opciones
- [x] A) La función es continua en $x=0$. <!-- weight: 1.0 -->
- [x] B) La función NO es derivable en $x=0$ porque la pendiente por la izquierda (-1) es diferente a la de la derecha (1). <!-- weight: 1.0 -->
- [ ] C) La función es derivable en $x=0$ y su derivada es 0.
- [x] D) Un requisito para la derivabilidad es que la curva sea "suave" (sin picos o esquinas). <!-- weight: 1.0 -->
- [ ] E) No puede ser continua si no es derivable.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A) Puedes dibujar $|x|$ sin levantar el lápiz. B) Para que la derivada exista, el límite de la pendiente debe ser el mismo desde ambos lados. Aquí, a la izquierda la pendiente es -1 y a la derecha es 1; no hay una tangente única. D) Este es el concepto intuitivo de derivabilidad. E es un error común: la continuidad es necesaria para la derivada, pero no garantiza su existencia.

---

## Question 4 (Análisis de Razón de Cambio - Dificultad 6)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v4`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Una bacteria crece según $N(t) = t^2 + 5t$ (donde $t$ es en horas). ¿Cuál es la razón de cambio instantánea del crecimiento (velocidad de crecimiento) a las 3 horas?

### Opciones
- [ ] A) 24 bacterias/hora (Es el valor de N(3))
- [ ] B) 5 bacterias/hora
- [x] C) 11 bacterias/hora (Derivada $N'(t) = 2t + 5$ evaluada en 3)
- [ ] D) 9 bacterias/hora

### Explicación Pedagógica
La razón de cambio instantánea es la derivada: $N'(t) = 2t + 5$.
Evaluando en $t=3$: $N'(3) = 2(3) + 5 = 6 + 5 = 11$.
Esto significa que exactamente a las 3 horas, la población está aumentando a un ritmo de 11 bacterias por hora.

---

## Question 5 (Genio - Dificultad 8)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Considere la función $f(x) = \sqrt[3]{x}$. ¿Qué sucede con su derivada en $x = 0$?

### Opciones
- [x] A) La derivada no existe porque la recta tangente es vertical (pendiente infinita). <!-- weight: 1.0 -->
- [x] B) $\lim_{h \to 0} \frac{\sqrt[3]{h}}{h} = \lim_{h \to 0} \frac{1}{h^{2/3}} = \infty$. <!-- weight: 1.0 -->
- [ ] C) La derivada es 0 porque la función pasa por el origen. <!-- weight: 0.0 -->
- [ ] D) La función no es continua en 0. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (A es la interpretación gráfica, B es la demostración analítica).

### Explicación Pedagógica
Aunque la función es continua y "suave" visualmente, al acercarse al origen la curva se vuelve tan empinada que se vuelve vertical por un instante. Una recta vertical tiene una pendiente indefinida (infinita). Por tanto, la función no es derivable en el origen.

---

## Contexto 2: Derivabilidad y Continuidad
Existe una jerarquía lógica en el cálculo: si una función es derivable en un punto, entonces **obligatoriamente** es continua en ese punto. Sin embargo, lo contrario no es cierto (como vimos con el valor absoluto). Esta distinción es vital para ingenieros que diseñan montañas rusas o carreteras: la pista debe ser continua (sin saltos) Y derivable (para evitar picos que destruirían el vehículo).

---

## Question 6 (Transferencia - Dificultad 9)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v6`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Transfer

### Enunciado
Si sabemos que una función $g(x)$ es **discontinua** en $x = 5$, ¿qué podemos concluir con absoluta certeza sobre su derivada $g'(5)$?

### Opciones
- [ ] A) $g'(5) = 0$.
- [ ] B) $g'(5)$ es infinita.
- [x] C) $g'(5)$ no existe.
- [ ] D) $g'(5)$ es una constante positiva.

### Explicación Pedagógica
Por el contrarrecíproco del teorema de derivabilidad: "Si no es continua, no puede ser derivable". Si hay un salto o un hueco en la gráfica, es imposible trazar una recta tangente coherente en ese punto. La falta de continuidad "mata" automáticamente la posibilidad de la derivada.

---

## Question 7 (Análisis de Modelos - Dificultad 5)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v7`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
En una gráfica de Posición vs Tiempo, ¿qué magnitud física representa la pendiente de la recta secante entre dos puntos?

### Opciones
- [ ] A) La velocidad instantánea.
- [x] B) La velocidad promedio durante ese intervalo de tiempo.
- [ ] C) La aceleración.
- [ ] D) La distancia total.

### Explicación Pedagógica
La recta secante conecta dos puntos distintos ($t_1, t_2$). Su pendiente es $\frac{\Delta s}{\Delta t}$, que es la definición de velocidad promedio. Solo cuando esos dos puntos se fusionan en uno solo (límite), obtenemos la velocidad instantánea (derivada).

---

## Question 8 (Evaluación de Notación - Dificultad 4)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v8`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Quiénes fueron los dos matemáticos que desarrollaron de forma independiente el cálculo diferencial y cuyas notaciones ($f'(x)$ y $dy/dx$) seguimos usando hoy?

### Opciones
- [ ] A) Pitágoras y Euclides.
- [ ] B) Einstein y Hawking.
- [x] C) Isaac Newton y Gottfried Wilhelm Leibniz.
- [ ] D) René Descartes y Blaise Pascal.

### Explicación Pedagógica
Newton desarrolló el cálculo enfocado en la física (flucciones), usando la notación de punto. Leibniz lo desarrolló con un enfoque más simbólico y lógico, creando la notación diferencial ($d/dx$) que es muy útil en cambios de variables y derivadas de orden superior.

---

## Question 9 (Técnica de la Potencia - Dificultad 5)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v9`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
Aplicando la regla básica $\frac{d}{dx}(x^n) = nx^{n-1}$, halle la derivada de $f(x) = \frac{1}{x^3}$.

### Opciones
- [ ] A) $3x^2$
- [ ] B) $-3x^4$
- [x] C) $-3x^{-4} = \frac{-3}{x^4}$
- [ ] D) $\frac{1}{3x^2}$

### Explicación Pedagógica
Reescribimos la función como una potencia: $f(x) = x^{-3}$.
Aplicamos la regla: $(-3)x^{-3-1} = -3x^{-4}$.
Esto se puede escribir como $-3/x^4$. Nota que la pendiente es negativa para $x>0$, lo cual es lógico ya que $1/x^3$ es una función decreciente.

---

## Question 10 (Síntesis de Comportamiento - Dificultad 8)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v10`
**Type:** `multi-correct`
**ICFES:** Interpretación y Representación
**Bloom:** Synthesis

### Enunciado
Dada la función $f(x) = x|x|$. Analice su comportamiento en $x=0$ y seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) La función es continua en $x=0$. <!-- weight: 1.0 -->
- [x] B) La función es derivable en $x=0$. <!-- weight: 1.0 -->
- [x] C) $f'(0) = 0$. <!-- weight: 1.0 -->
- [ ] D) No es derivable debido al valor absoluto.
- [ ] E) La derivada en $x=0$ es indefinida como en $|x|$.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A trozos: $f(x) = x^2$ si $x \ge 0$ y $f(x) = -x^2$ si $x < 0$.
Derivando tramos: $f'(x) = 2x$ si $x > 0$ y $f'(x) = -2x$ si $x < 0$.
Evaluando el límite de la derivada en 0: $2(0)=0$ y $-2(0)=0$.
Como los límites de las pendientes coinciden ($0 = 0$), la función es derivable en el punto central, a pesar de contener un valor absoluto. Se comporta de forma "suave" en el origen.

---

## Question 11 (Análisis de Costo Marginal - Dificultad 6)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v11`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
En economía, el costo total de producir $q$ artículos es $C(q) = 0.5q^2 + 10q + 100$. ¿Cuál es el "Costo Marginal" (la tasa a la que aumenta el costo) cuando se han producido 20 artículos?

### Opciones
- [ ] A) $C(20) = 500$
- [x] B) $C'(20) = 30$ (Derivada $C'(q) = q + 10$, evaluada en 20)
- [ ] C) $C'(20) = 20$
- [ ] D) 10

### Explicación Pedagógica
El costo marginal es la derivada de la función de costo: $C'(q) = 1.0q + 10$.
Para $q=20$: $C'(20) = 20 + 10 = 30$.
Esto significa que producir la unidad número 21 costará aproximadamente \$30. La derivada nos da el costo de la "siguiente unidad".

---

## Question 12 (Evaluación Crítica de Gráficas - Dificultad 7)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v12`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Si una función $f(x)$ tiene una derivada $f'(x)$ que es siempre positiva en el intervalo $(a, b)$, ¿qué podemos afirmar sobre la gráfica de $f$ en ese intervalo?

### Opciones
- [ ] A) La gráfica está por encima del eje X.
- [x] B) La función es estrictamente creciente.
- [ ] C) La función es cóncava hacia arriba.
- [ ] D) La función tiene un valor máximo en el centro del intervalo.

### Explicación Pedagógica
La derivada es la pendiente. Si la pendiente siempre es positiva ($f'(x) > 0$), la gráfica siempre está "subiendo" de izquierda a derecha. Ser positivo no garantiza estar arriba del eje X (puedes crecer desde -100 a -50), pero sí garantiza el crecimiento.

---

## Question 13 (Genio Teórico - Dificultad 10)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Evaluate

### Enunciado
La definición oficial de derivada requiere la existencia de un límite. ¿Qué ocurre con la derivabilidad en el punto de un "conjunto de Cantor" o una función fractal (como el copo de nieve de Koch)?

### Opciones
- [x] A) No son derivables en muchos puntos debido a que poseen infinitas rugosidades y picos en escalas infinitamente pequeñas. <!-- weight: 1.0 -->
- [x] B) Poseen una derivada fraccionaria (Cálculo fraccionario). <!-- weight: 0.3 -->
- [ ] C) Son derivables solo en el infinito. <!-- weight: 0.0 -->
- [ ] D) La derivada siempre es 0. <!-- weight: 0.0 -->

### Scoring
- Respuesta A: 1.0 punto. (Conexión correcta entre geometría fractal y falta de suavidad diferencial).

### Explicación Pedagógica
Los fractales son objetos que no tienen una "línea tangente" porque al hacer zoom, siempre aparecen más detalles y picos. La derivada asume que a escala microscópica la curva se ve como una línea recta. En un fractal, esto nunca ocurre. Son el ejemplo máximo de funciones continuas en todas partes pero derivables en ninguna parte.

---

## Question 14 (Análisis Lógico - Dificultad 5)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v14`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si calculamos el límite de la pendiente de la recta secante cuando la distancia entre los puntos es fija y NO tiende a cero, ¿qué estamos obteniendo?

### Opciones
- [ ] A) La derivada.
- [ ] B) La velocidad instantánea.
- [x] C) La tasa de cambio promedio.
- [ ] D) La aceleración constante.

### Explicación Pedagógica
Sin el proceso de límite ($\Delta x \to 0$), simplemente estamos haciendo una división de desplazamientos finito sobre tiempo finito. Eso es un promedio, no un valor instantáneo. Solo el límite "convierte" el promedio en derivada.

---

## Question 15 (Indeterminación Especial - Dificultad 8)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v15`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Calcule $f'(1)$ para $f(x) = \frac{1}{\sqrt{x}}$.

### Opciones
- [ ] A) 1/2
- [x] B) -1/2
- [ ] C) -1
- [ ] D) 0

### Explicación Pedagógica
$f(x) = x^{-1/2}$.
Derivada: $f'(x) = (-1/2)x^{-1/2 - 1} = -1/2 x^{-3/2}$.
Evaluando en $x=1$: $-1/2 (1)^{-3/2} = -1/2 (1) = -1/2$.
Esto indica que en $x=1$, la función está decreciendo con una inclinación de $-0.5$.

---

## Question 16 (Análisis de Recta Normal - Dificultad 7)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v16`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
La recta **normal** a una curva es la línea perpendicular a la recta tangente en el punto de contacto. Si la derivada de una función en $x=3$ es $f'(3) = 1/4$, ¿cuál es la pendiente de la recta normal en ese mismo punto?

### Opciones
- [ ] A) 1/4
- [ ] B) -1/4
- [x] C) -4
- [ ] D) 4

### Explicación Pedagógica
Dos rectas son perpendiculares si el producto de sus pendientes es -1 ($m_1 \cdot m_2 = -1$).
Si la tangente tiene $m = 1/4$, entonces la normal tiene $m = -1 / (1/4) = -4$.

---

## Question 17 (Evaluación de Paridad - Dificultad 5)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v17`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si una función $f(x)$ es **par** (simétrica respecto al eje Y), ¿cómo es su derivada $f'(x)$?

### Opciones
- [ ] A) También es par.
- [x] B) Es una función impar.
- [ ] C) Es una constante.
- [ ] D) No tiene derivada.

### Explicación Pedagógica
Piense en una parábola $x^2$ (par): su derivada es $2x$ (impar). Gráficamente, si la función sube a la derecha (pendiente +), debe bajar a la izquierda (pendiente -) para mantener la simetría de espejo. Ese cambio de signo en la pendiente define una función impar.

---

## Question 18 (Cálculo Avanzado - Dificultad 9)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v18`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre la función $f(x) = x^2 \sin(1/x)$ para $x \neq 0$ y $f(0) = 0$. Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) Es continua en $x=0$. <!-- weight: 1.0 -->
- [x] B) Es derivable en $x=0$. <!-- weight: 1.0 -->
- [x] C) $f'(0) = \lim_{h \to 0} h \sin(1/h) = 0$. <!-- weight: 1.0 -->
- [ ] D) No es derivable en 0 debido a la oscilación infinita de $\sin(1/x)$.
- [ ] E) La derivada $f'(x)$ es continua en $x=0$.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
Aunque $1/x$ oscila locamente cerca de 0, el término $x^2$ la "aplasta" lo suficiente para que la pendiente converja a 0. B y C son correctas. Sin embargo, la derivada $f'(x)$ para $x \neq 0$ contiene un término $\cos(1/x)$ que NO tiene límite en 0, por lo que la derivada existe pero es una función discontinua (E es falso). Este es un contraejemplo clásico en análisis real.

---

## Question 19 (Interpretación de Modelos - Dificultad 5)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v19`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
Un globo esférico se infla. El volumen es $V(r) = \frac{4}{3}\pi r^3$. ¿A qué tasa cambia el volumen respecto al radio cuando $r=3$ cm?

### Opciones
- [ ] A) $36\pi$
- [x] B) $36\pi$ (Derivada $V'(r) = 4\pi r^2$ evaluada en 3)
- [ ] C) $12\pi$
- [ ] D) $4\pi$

### Explicación Pedagógica
La derivada del volumen respecto al radio es $V'(r) = 4\pi r^2$ (que curiosamente es la fórmula del área superficial).
Para $r=3$: $4\pi(3^2) = 4\pi(9) = 36\pi$.
Esto significa que por cada cm extra de radio, el volumen aumenta en $36\pi$ $cm^3$ en ese instante.

---

## Question 20 (Genio de Transferencia Total - Dificultad 10)

**ID:** `CO-MAT-11-derivative-concept-001-PRO-v20`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Synthesis

### Enunciado
**MASTER INTEGRATION:**

En la física de partículas, el principio de incertidumbre de Heisenberg sugiere que no podemos conocer la posición y el momento de una partícula simultáneamente con precisión infinita. En términos de cálculo, si una "trayectoria" de una partícula fuera tan irregular que no fuera derivable en ningún punto (como un movimiento browniano puro):

¿Qué concepto físico fundamental dejaría de tener un valor definido en cualquier instante?

### Options
- [x] A) La velocidad instantánea. <!-- weight: 1.0 -->
- [x] B) El momento lineal ($p = mv$). <!-- weight: 1.0 -->
- [ ] C) La masa en reposo. <!-- weight: 0.0 -->
- [ ] D) La carga eléctrica. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Ambas dependen de la derivada de la posición respecto al tiempo).

### Explicación Pedagógica
La velocidad es la derivada de la posición. Si la trayectoria no es derivable, la derivada no existe. Por lo tanto, el concepto de "velocidad" en un punto exacto pierde sentido matemático y físico. Esto obliga a los físicos a usar funciones de probabilidad en lugar de trayectorias exactas derivables. Es la unión definitiva entre la falta de "suavidad" matemática y la naturaleza de la realidad cuántica.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Type | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 4 | single | Analyze | Interpretación | ✅ |
| 2 | ...-v2 | 5 | single | Evaluate | Formulación | ✅ |
| 3 | ...-v3 | 7 | multi-correct | Synthesis | Argumentación | ✅ |
| 4 | ...-v4 | 6 | single | Analyze | Interpretación | ✅ |
| 5 | ...-v5 | 8 | weighted | Evaluate | Argumentación | ✅ |
| 6 | ...-v6 | 9 | single | Transfer | Argumentación | ✅ |
| 7 | ...-v7 | 5 | single | Analyze | Interpretación | ✅ |
| 8 | ...-v8 | 4 | single | Analyze | Interpretación | ✅ |
| 9 | ...-v9 | 5 | single | Apply | Formulación | ✅ |
| 10 | ...-v10| 8 | multi-correct | Synthesis | Interpretación | ✅ |
| 11 | ...-v11| 6 | single | Analyze | Formulación | ✅ |
| 12 | ...-v12| 7 | single | Evaluate | Argumentación | ✅ |
| 13 | ...-v13| 10| weighted | Evaluate | Argumentación | ✅ |
| 14 | ...-v14| 5 | single | Analyze | Interpretación | ✅ |
| 15 | ...-v15| 8 | single | Evaluate | Formulación | ✅ |
| 16 | ...-v16| 7 | single | Apply | Formulación | ✅ |
| 17 | ...-v17| 5 | single | Analyze | Interpretación | ✅ |
| 18 | ...-v18| 9 | multi-correct | Synthesis | Argumentación | ✅ |
| 19 | ...-v19| 5 | single | Analyze | Formulación | ✅ |
| 20 | ...-v20| 10| weighted | Synthesis | Argumentación | ✅ |
