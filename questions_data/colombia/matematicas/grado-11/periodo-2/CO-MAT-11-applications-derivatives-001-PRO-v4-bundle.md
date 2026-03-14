---
id: "CO-MAT-11-applications-derivatives-001-PRO"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Aplicaciones de la Derivada: Optimización y Extremos"
periodo: 2
protocol_version: "4.1"
total_questions: 20
difficulty_range: "6-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["Interpretación", "Formulación", "Argumentación"]
cognitive_levels: ["Analyze", "Evaluate", "Synthesis", "Transfer"]
estado: "draft"
creador: "Antigravity (Protocol v4.1)"
generation_date: "2026-03-03"
source: "Saber 11 - Mathematics Framework"
source_license: "CC BY-SA 4.0"
---

## Contexto 1: La Eficiencia de la Naturaleza y la Industria
Optimizar significa encontrar "lo mejor": el costo más bajo, la ganancia más alta o el material mínimo necesario. En la naturaleza, la luz siempre viaja por el camino que toma menos tiempo (Principio de Fermat). En la industria, un fabricante de latas de refresco desea usar la menor cantidad de aluminio posible para contener un volumen fijo. La herramienta matemática para resolver estos dilemas es la derivada, ya que en los puntos máximos o mínimos de una función suave, la pendiente de la recta tangente es exactamente cero ($f'(x) = 0$).

---

## Question 1 (Analisis - Dificultad 6)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v1`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Por qué para hallar los candidatos a máximos o mínimos de una función $f(x)$ buscamos los puntos donde $f'(x) = 0$?

### Opciones
- [ ] A) Porque en esos puntos la función cruza el eje X.
- [ ] B) Porque la derivada siempre es cero en cualquier punto de la función.
- [x] C) Porque una pendiente de cero indica que la función ha dejado de subir para empezar a bajar (o viceversa), representando un "tope" o fondo horizontal.
- [ ] D) Porque así se simplifica el álgebra.

### Explicación Pedagógica
Imagine una montaña: en la cima, por un instante, el terreno es plano. Esa horizontalidad matemática se traduce como una pendiente nula ($m=0$). Estos puntos se llaman "puntos críticos". Aunque no todos los puntos críticos son extremos (pueden ser puntos de silla), todos los extremos de una función derivable deben ocurrir en puntos críticos.

---

## Question 2 (Evaluación - Dificultad 7)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v2`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Halle el valor de $x$ donde la función $f(x) = x^2 - 8x + 15$ alcanza su valor mínimo.

### Opciones
- [ ] A) $x = 0$
- [ ] B) $x = 8$
- [x] C) $x = 4$ (Operación: $2x - 8 = 0 \rightarrow x = 4$)
- [ ] D) $x = -1$

### Explicación Pedagógica
Derivamos: $f'(x) = 2x - 8$.
Igualamos a cero para hallar el punto crítico: $2x - 8 = 0 \rightarrow 2x = 8 \rightarrow x = 4$.
Como es una parábola que abre hacia arriba ($a > 0$), este punto crítico es obligatoriamente el mínimo. El valor mínimo de la función sería $f(4) = 16 - 32 + 15 = -1$.

---

## Question 3 (Síntesis - Dificultad 8)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Dada la función $g(x) = x^3 - 3x^2 + 2$. Seleccione TODAS las afirmaciones correctas sobre sus extremos relativos.

### Opciones
- [x] A) Tiene puntos críticos en $x = 0$ y $x = 2$. <!-- weight: 1.0 -->
- [x] B) En $x = 0$ hay un máximo relativo (porque $g''(0) = -6 < 0$). <!-- weight: 1.0 -->
- [x] C) En $x = 2$ hay un mínimo relativo (porque $g''(2) = 6 > 0$). <!-- weight: 1.0 -->
- [ ] D) La función siempre es creciente.
- [ ] E) No tiene puntos de inflexión.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
$g'(x) = 3x^2 - 6x = 3x(x - 2) \rightarrow$ Críticos en 0 y 2.
$g''(x) = 6x - 6$.
Criterio de la segunda derivada:
- $g''(0) = -6 \rightarrow$ Cóncava hacia abajo (Máximo).
- $g''(2) = 6 \rightarrow$ Cóncava hacia arriba (Mínimo).
D es falso (cambia dirección). E es falso (en $x=1$ cambia concavidad).

---

## Question 4 (Análisis de Productividad - Dificultad 7)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v4`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
El beneficio de una empresa depende del precio $p$ según $B(p) = -20p^2 + 1200p - 5000$. ¿A qué precio se maximiza el beneficio?

### Opciones
- [ ] A) \$20
- [x] B) \$30 (Derivada $-40p + 1200 = 0 \rightarrow p = 1200/40$)
- [ ] C) \$60
- [ ] D) \$5000

### Explicación Pedagógica
Buscamos el máximo derivando el beneficio respecto al precio: $B'(p) = -40p + 1200$.
$-40p + 1200 = 0 \rightarrow 1200 = 40p \rightarrow p = 30$.
Este es el "punto dulce" donde el precio no es tan alto como para espantar clientes, ni tan bajo como para no generar margen.

---

## Question 5 (Genio - Dificultad 9)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Un granjero tiene 120 metros de valla para encerrar un corral rectangular junto a un río (no necesita valla en el lado del río). ¿Cuáles deben ser las dimensiones del corral para que el área sea máxima?

### Opciones
- [x] A) 30 m de ancho ($x$) y 60 m de largo ($y$, paralelo al río). <!-- weight: 1.0 -->
- [x] B) El largo debe ser el doble del ancho. <!-- weight: 1.0 -->
- [ ] C) 40 m por 40 m. <!-- weight: 0.0 -->
- [ ] D) 20 m por 80 m. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (A es numérico, B es la relación geométrica óptima).

### Explicación Pedagógica
Perímetro: $2x + y = 120 \rightarrow y = 120 - 2x$.
Área: $A = x \cdot y = x(120 - 2x) = 120x - 2x^2$.
Derivamos el área: $A' = 120 - 4x$.
$120 - 4x = 0 \rightarrow 120 = 4x \rightarrow x = 30$.
Si $x = 30$, entonces $y = 120 - 2(30) = 60$. Las dimensiones óptimas son 30x60.

---

## Contexto 2: Puntos de Inflexión y Cambio de Tendencia
En el análisis de datos (como el crecimiento de una pandemia o una tendencia en redes sociales), es crucial identificar no solo el pico, sino el momento en que la velocidad de crecimiento empieza a disminuir. Matemáticamente, esto ocurre cuando la segunda derivada es cero ($f''(x) = 0$). Este es el "Punto de Inflexión", donde la curva cambia su concavidad de "feliz" (cóncava hacia arriba) a "triste" (cóncava hacia abajo), o viceversa.

---

## Question 6 (Transferencia - Dificultad 8)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v6`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Transfer

### Enunciado
Dada la función $f(x) = x^3 - 6x^2 + 9x$. ¿En qué valor de $x$ se encuentra el punto de inflexión?

### Opciones
- [ ] A) $x = 1$
- [ ] B) $x = 3$
- [x] C) $x = 2$ (Segunda derivada $6x - 12 = 0$)
- [ ] D) $x = 0$

### Explicación Pedagógica
1ra Derivada: $f'(x) = 3x^2 - 12x + 9$.
2da Derivada: $f''(x) = 6x - 12$.
Igualamos a cero: $6x = 12 \rightarrow x = 2$.
En $x=2$ la función deja de desacelerar su caída (o acelerar su subida) y cambia su curvatura. Es el punto de "rendimiento decreciente".

---

## Question 7 (Análisis de Concavidad - Dificultad 6)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v7`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si en un intervalo la segunda derivada es positiva ($f''(x) > 0$), ¿qué forma tiene la gráfica?

### Opciones
- [ ] A) Es una línea recta.
- [x] B) Es cóncava hacia arriba (forma de "U").
- [ ] C) Es cóncava hacia abajo (forma de "n").
- [ ] D) Está por debajo del eje X.

### Explicación Pedagógica
Una segunda derivada positiva significa que la pendiente de la función está *aumentando*. Si la pendiente aumenta, la curva se abre hacia arriba, acumulando "agua" si lloviera sobre ella. Es la característica de los valles o mínimos.

---

## Question 8 (Evaluación de Extremos Absolutos - Dificultad 7)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v8`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Para hallar el valor máximo de una función en un intervalo cerrado $[a, b]$, ¿qué puntos debemos comparar obligatoriamente?

### Opciones
- [ ] A) Solo los puntos donde $f'(x) = 0$.
- [ ] B) Solo el centro del intervalo.
- [x] C) Los valores de la función en los puntos críticos internos Y en los extremos del intervalo ($f(a)$ y $f(b)$).
- [ ] D) Solo los puntos donde la función cruza el eje Y.

### Explicación Pedagógica
El máximo absoluto puede estar en un pico interno (donde la derivada es cero) o simplemente ser el valor más alto alcanzado en los bordes del dominio permitido. Ignorar los extremos del intervalo es un error común que lleva a perder el verdadero óptimo global.

---

## Question 9 (Técnica de L'Hôpital - Dificultad 8)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v9`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
Use la Regla de L'Hôpital (derivando numerador y denominador por separado) para hallar $\lim_{x \to 0} \frac{1 - \cos x}{x^2}$.

### Opciones
- [ ] A) 0
- [ ] B) 1
- [x] C) 1/2
- [ ] D) $\infty$

### Explicación Pedagógica
Es una indeterminación $0/0$. Aplicamos L'Hôpital:
1ra vez: $\lim_{x \to 0} \frac{\sin x}{2x}$. (Sigue siendo $0/0$).
2da vez: $\lim_{x \to 0} \frac{\cos x}{2}$.
Evaluando en 0: $\frac{\cos(0)}{2} = 1/2$.
La derivada es una herramienta poderosa para resolver límites que fallan por métodos algebraicos simples.

---

## Question 10 (Síntesis Matemática - Dificultad 8)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v10`
**Type:** `multi-correct`
**ICFES:** Interpretación y Representación
**Bloom:** Synthesis

### Enunciado
Sobre un punto crítico $x = c$ donde $f'(c) = 0$. Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) Si $f'(x)$ cambia de $+$ a $-$ en $c$, hay un máximo local. <!-- weight: 1.0 -->
- [x] B) Si $f'(x)$ cambia de $-$ a $+$ en $c$, hay un mínimo local. <!-- weight: 1.0 -->
- [ ] C) Siempre hay un extremo relativo en un punto crítico.
- [x] D) Si $f'(x)$ no cambia de signo (ej. $f(x)=x^3$ en $x=0$), no hay un extremo. <!-- weight: 1.0 -->
- [ ] E) Un punto crítico es siempre una asíntota.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
Este es el "Criterio de la primera derivada". A y B describen el comportamiento de subir/bajar. D es fundamental: para que haya un pico o valle, el carro debe cambiar de dirección. Si sigue subiendo después de la "meseta" de pendiente cero, no es un extremo relativo (punto de silla).

---

## Question 11 (Análisis de Razón de Cambio Ligada - Dificultad 9)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v11`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
Una escalera de 5 metros está apoyada contra una pared. Si la base de la escalera se resbala alejándose de la pared a 2 m/s, ¿a qué velocidad cae el extremo superior cuando la base está a 3 metros de la pared? (Use $x^2 + y^2 = 25$ y derive respecto al tiempo).

### Opciones
- [ ] A) 2 m/s
- [x] B) 1.5 m/s (Derivada implícita $2x \dot{x} + 2y \dot{y} = 0$)
- [ ] C) 3 m/s
- [ ] D) 0.5 m/s

### Explicación Pedagógica
Relación: $x^2 + y^2 = 25$.
Derivando respecto a $t$: $2x \frac{dx}{dt} + 2y \frac{dy}{dt} = 0 \rightarrow x \frac{dx}{dt} + y \frac{dy}{dt} = 0$.
Datos: $x = 3, \frac{dx}{dt} = 2$. Por Pitágoras, $y = \sqrt{25-9} = 4$.
Sustituyendo: $3(2) + 4 \frac{dy}{dt} = 0 \rightarrow 6 + 4 \frac{dy}{dt} = 0 \rightarrow \frac{dy}{dt} = -6/4 = -1.5$ m/s.
El signo negativo indica que el extremo superior está bajando.

---

## Question 12 (Evaluación de Diseño - Dificultad 8)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v12`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Se desea fabricar una caja abierta con una pieza cuadrada de material de 12 cm de lado, cortando cuadrados iguales de las esquinas y doblando los lados. ¿Cuál debe ser el tamaño del corte de la esquina para maximizar el volumen?

### Opciones
- [ ] A) 1 cm
- [x] B) 2 cm (Volumen $V = x(12-2x)^2$)
- [ ] C) 3 cm
- [ ] D) 4 cm

### Explicación Pedagógica
$V = x(12 - 2x)^2 = x(144 - 48x + 4x^2) = 4x^3 - 48x^2 + 144x$.
$V' = 12x^2 - 96x + 144$.
Dividiendo entre 12: $x^2 - 8x + 12 = 0 \rightarrow (x-6)(x-2) = 0$.
Los puntos críticos son 6 y 2. Sin embargo, $x=6$ es físicamente imposible (cortarías todo el material). Por lo tanto, $x = 2$ cm es el corte óptimo.

---

## Question 13 (Genio Interdisciplinar - Dificultad 10)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Transfer

### Enunciado
**Física y Optimización:** La velocidad de una onda de sonido en el agua es $v_w$ y en el aire es $v_a$. Según la Ley de Snell, la luz viaja entre dos medios siguiendo el camino de **tiempo mínimo**. Esto implica que el ángulo de incidencia $\theta_1$ y el de refracción $\theta_2$ cumplen $\frac{\sin\theta_1}{v_1} = \frac{\sin\theta_2}{v_2}$.

Si resolviéramos este problema usando derivadas (minimizando el tiempo $T = d/v$):

### Opciones
- [x] A) Estamos aplicando el "Principio de Fermat", que es una optimización global de la trayectoria. <!-- weight: 1.0 -->
- [x] B) La derivada del tiempo total respecto a la posición de entrada debe ser cero. <!-- weight: 1.0 -->
- [ ] C) La luz toma el camino más corto en distancia, no en tiempo. <!-- weight: 0.0 -->
- [ ] D) La derivada no aplica a la luz porque es demasiado rápida. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (A es conceptual, B es analítico).

### Explicación Pedagógica
El camino geométricamente más corto (una línea recta) no es el más rápido si las velocidades en los medios son distintas. La luz "sabe" cálculo y se quiebra exactamente en el punto que minimiza el tiempo total. Este es uno de los usos más elegantes de la optimización en la física clásica.

---

## Question 14 (Análisis Lógico de Cero Derivada - Dificultad 5)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v14`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
¿Puede una función continua tener un máximo absoluto sin que su derivada sea cero?

### Opciones
- [ ] A) No, por definición la derivada debe ser cero.
- [x] B) Sí, si el máximo ocurre en un extremo del intervalo cerrado o en un punto donde la derivada no existe (pico).
- [ ] C) Solo si la función es una constante.
- [ ] D) No, todas las funciones tienen derivada en sus máximos.

### Explicación Pedagógica
El Teorema de Fermat dice que *si* la derivada existe y hay un extremo relativo, entonces es cero. Sin embargo, existen máximos en esquinas (como el pico de $|x|$) o en los bordes de la tabla de dibujo. Un buscador de máximos debe mirar tres lugares: donde $f'=0$, donde $f'$ no existe y los límites del dominio ($a, b$).

---

## Question 15 (Indeterminación de Potencias - Dificultad 8)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v15`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** evaluate

### Enunciado
Halle $\lim_{x \to \infty} \frac{\ln x}{x}$.

### Opciones
- [ ] A) $\infty$
- [ ] B) 1
- [x] C) 0 (Por L'Hôpital: $\lim_{x \to \infty} \frac{1/x}{1}$)
- [ ] D) $e$

### Explicación Pedagógica
Es una indeterminación $\infty / \infty$. Según la jerarquía de crecimiento, el logaritmo crece mucho más lento que cualquier potencia lineal. L'Hôpital lo confirma: derivando arriba queda $1/x$, abajo queda 1. El límite de $1/x$ al infinito es cero.

---

## Question 16 (Análisis de Productividad de Suelo - Dificultad 7)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v16`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
La producción de una hectárea de papas en función del fertilizante $f$ es $P(f) = -f^2 + 10f + 20$. ¿Cuál es la cantidad de fertilizante que produce la cosecha máxima?

### Opciones
- [ ] A) 10 unidades
- [x] B) 5 unidades (Derivada $-2f+10=0$)
- [ ] C) 20 unidades
- [ ] D) No tiene máximo.

### Explicación Pedagógica
Derivamos la producción: $P'(f) = -2f + 10$.
Igualamos a cero: $10 = 2f \rightarrow f = 5$.
Un exceso de fertilizante (más de 5 unidades) empezaría a "quemar" la cosecha, disminuyendo la producción total. La optimización ayuda a encontrar el equilibrio biológico.

---

## Question 17 (Evaluación de Puntos de Inflexión Críticos - Dificultad 5)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v17`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si una función modela el número de suscriptores de un canal y el punto de inflexión ocurre hoy, ¿qué significa esto para el dueño del canal?

### Opciones
- [ ] A) Que hoy alcanzó el número máximo de suscriptores y empezará a perderlos.
- [ ] B) Que el canal dejó de crecer.
- [x] C) Que hoy fue el día de mayor crecimiento, y aunque seguirá ganando suscriptores, mañana será a un ritmo un poco más lento.
- [ ] D) Que el canal está estancado.

### Explicación Pedagógica
El punto de inflexión es el momento de máxima velocidad. Después de este punto, la curva se vuelve cóncava hacia abajo: sigues subiendo, pero cada vez subes menos. En marketing, es la señal de que la campaña de publicidad ha llegado a su máxima efectividad y el mercado se está saturando.

---

## Question 18 (Análisis de Teorema del Valor Medio - Dificultad 9)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v18`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre el **Teorema del Valor Medio (TVM)**, seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) Establece que hay un punto $c$ donde la pendiente instantánea es igual a la pendiente promedio del intervalo. <!-- weight: 1.0 -->
- [x] B) Físicamente: si viajas de Bogotá a Medellín (400 km) en 8 horas, en algún momento tu velocímetro marcó exactamente 50 km/h. <!-- weight: 1.0 -->
- [ ] C) Solo aplica si la función es discontinua.
- [x] D) Requiere que la función sea continua en $[a, b]$ y derivable en $(a, b)$. <!-- weight: 1.0 -->
- [ ] E) Es lo mismo que el Teorema de Rolle pero más general.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B, D) El TVM conecta el promedio (secante) con lo instantáneo (tangente). Si tu promedio fue 50, no pudiste saltar de 40 a 60 sin pasar por el 50 en el medio. El Teorema de Rolle es un caso específico donde el promedio es cero (A y B son la misma altura).

---

## Question 19 (Interpretación de Costos y Beneficios - Dificultad 5)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v19`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
Para una función de beneficio, si un valor de $x$ cumple $B'(x) = 0$ y $B''(x) < 0$, ¿qué tipo de extremo hemos encontrado?

### Opciones
- [ ] A) Un mínimo relativo.
- [x] B) Un máximo relativo.
- [ ] C) Un punto de inflexión.
- [ ] D) Un punto de silla.

### Explicación Pedagógica
Derivada cero = Punto plano. Segunda derivada negativa = Cóncava hacia abajo (forma de "n"). Si un punto es plano y la curva baja por ambos lados, obligatoriamente es el punto más alto del sector: un máximo.

---

## Question 20 (Genio de Transferencia Total - Dificultad 10)

**ID:** `CO-MAT-11-applications-derivatives-001-PRO-v20`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Synthesis

### Enunciado
**MASTER INTEGRATION:**

En economía, la "Ley de Rendimientos Decrecientes" describe que al añadir factores de producción, el incremento productivo tiende a disminuir. Matemáticamente, esto se modela con la concavidad de la función de producción $P(L)$.

Si $P$ es la producción y $L$ el trabajo, y sabemos que $P'(L) > 0$ pero $P''(L) < 0$ para toda $L$:

### Options
- [x] A) La empresa siempre está creciendo, pero cada nuevo trabajador aporta menos que el anterior al total de la producción. <!-- weight: 1.0 -->
- [x] B) La productividad marginal es decreciente. <!-- weight: 1.0 -->
- [ ] C) La empresa debería contratar trabajadores infinitamente para maximizar beneficios. <!-- weight: 0.0 -->
- [ ] D) La empresa está quebrando porque la segunda derivada es negativa. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (A es la interpretación práctica, B es el término técnico económico).

### Explicación Pedagógica
Este escenario describe la mayoría de los negocios reales. Añadir un trabajador a una cocina pequeña ayuda (crecimiento positivo), pero añadir el trabajador número 10 en el mismo espacio estorba (crecimiento disminuyendo). El uso de la segunda derivada permite a los gerentes saber cuándo dejar de contratar antes de que el costo de un nuevo empleado supere lo que él es capaz de producir.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Type | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 6 | single | Analyze | Interpretación | ✅ |
| 2 | ...-v2 | 7 | single | Evaluate | Formulación | ✅ |
| 3 | ...-v3 | 8 | multi-correct | Synthesis | Argumentación | ✅ |
| 4 | ...-v4 | 7 | single | Analyze | Interpretación | ✅ |
| 5 | ...-v5 | 9 | weighted | Evaluate | Argumentación | ✅ |
| 6 | ...-v6 | 8 | single | Transfer | Formulación | ✅ |
| 7 | ...-v7 | 6 | single | Analyze | Interpretación | ✅ |
| 8 | ...-v8 | 7 | single | Evaluate | Argumentación | ✅ |
| 9 | ...-v9 | 8 | single | Apply | Formulación | ✅ |
| 10 | ...-v10| 8 | multi-correct | Synthesis | Interpretación | ✅ |
| 11 | ...-v11| 9 | single | Analyze | Formulación | ✅ |
| 12 | ...-v12| 8 | single | Evaluate | Formulación | ✅ |
| 13 | ...-v13| 10| weighted | Transfer | Argumentación | ✅ |
| 14 | ...-v14| 5 | single | Analyze | Argumentación | ✅ |
| 15 | ...-v15| 8 | single | Evaluate | Formulación | ✅ |
| 16 | ...-v16| 7 | single | Apply | Formulación | ✅ |
| 17 | ...-v17| 5 | single | Analyze | Interpretación | ✅ |
| 18 | ...-v18| 9 | multi-correct | Synthesis | Argumentación | ✅ |
| 19 | ...-v19| 5 | single | Analyze | Formulación | ✅ |
| 20 | ...-v20| 10| weighted | Synthesis | Argumentación | ✅ |
