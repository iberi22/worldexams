---
id: "CO-MAT-11-trigonometry-001-PRO"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Trigonometría Avanzada e Identidades Fundamentales"
periodo: 1
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
quarantine: true
bundle_status: "quarantined"
---

## Contexto 1: El Movimiento de la Tierra y la Trigonometría
La distancia de la Tierra al Sol varía ligeramente a lo largo del año debido a su órbita elíptica. Sin embargo, un modelo simplificado utiliza funciones seno y coseno para describir la posición angular y la radiación solar recibida. Por ejemplo, la intensidad de luz $I$ en una latitud específica puede modelarse como $I(t) = I_0 \sin(\omega t + \phi)$. Comprender las identidades trigonométricas permite a los astrónomos simplificar estos modelos y predecir solsticios y equinoccios con precisión matemática milenaria.

---

## Question 1 (Analisis - Dificultad 5)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v1`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Dada la identidad fundamental $\sin^2\theta + \cos^2\theta = 1$, ¿cuál es la expresión equivalente para $\tan^2\theta + 1$?

### Opciones
- [ ] A) $\cot^2\theta$
- [x] B) $\sec^2\theta$
- [ ] C) $\csc^2\theta$
- [ ] D) $\sin^2\theta$

### Explicación Pedagógica
Si tomamos la identidad fundamental $\sin^2\theta + \cos^2\theta = 1$ y dividimos todos los términos por $\cos^2\theta$:
$\frac{\sin^2\theta}{\cos^2\theta} + \frac{\cos^2\theta}{\cos^2\theta} = \frac{1}{\cos^2\theta}$
$\tan^2\theta + 1 = \sec^2\theta$.
Esta es una identidad pitagórica secundaria esencial para resolver integrales y simplificar ecuaciones trigonométricas complejas.

---

## Question 2 (Evaluación - Dificultad 6)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v2`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Si $\cos\theta = 4/5$ y el ángulo $\theta$ se encuentra en el IV cuadrante, ¿cuál es el valor exacto de $\sin\theta$?

### Opciones
- [ ] A) 3/5
- [x] B) -3/5
- [ ] C) -4/5
- [ ] D) 1

### Explicación Pedagógica
Usamos $\sin^2\theta = 1 - \cos^2\theta = 1 - (16/25) = 9/25$.
Extrayendo la raíz: $\sin\theta = \pm 3/5$.
En el IV cuadrante, la función seno es **negativa** (eje Y negativo). Por lo tanto, $\sin\theta = -3/5$.

---

## Question 3 (Síntesis - Dificultad 7)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Analice la función $f(x) = 3\sin(2x - \pi) + 4$. Seleccione TODAS las afirmaciones correctas sobre sus propiedades trigonométricas.

### Opciones
- [x] A) La amplitud de la función es 3. <!-- weight: 1.0 -->
- [x] B) El periodo de la función es $\pi$. <!-- weight: 1.0 -->
- [ ] C) El rango de la función es $[1, 7]$. <!-- weight: 1.0 --> (Corregido: $4-3$ a $4+3$)
- [x] D) Hay un desplazamiento horizontal (fase) de $\pi/2$ hacia la derecha. <!-- weight: 1.0 -->
- [ ] E) La función tiene un valor mínimo de 0.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A) El multiplicador del seno es 3. B) Periodo $= 2\pi / B = 2\pi / 2 = \pi$. C) Rango $= [4-3, 4+3] = [1, 7]$. D) Factorizando el 2 dentro del paréntesis: $2(x - \pi/2)$. El desplazamiento es $\pi/2$. Todas las mencionadas son correctas. E es falso, el mínimo es 1.

---

## Question 4 (Análisis de Identidades - Dificultad 6)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v4`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Simplifique la expresión: $\frac{\sin(2\theta)}{\sin\theta}$.

### Opciones
- [ ] A) $\sin\theta$
- [x] B) $2\cos\theta$
- [ ] C) $2$
- [ ] D) $\cos(2\theta)$

### Explicación Pedagógica
Usamos la identidad del ángulo doble: $\sin(2\theta) = 2\sin\theta\cos\theta$.
Sustituyendo: $\frac{2\sin\theta\cos\theta}{\sin\theta} = 2\cos\theta$.

---

## Question 21 (Genio - Dificultad 8)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
¿Cuál es el valor exacto de $\sin(15^\circ)$? (Use la identidad de la resta de ángulos $\sin(A-B) = \sin A\cos B - \cos A\sin B$, con $A=45^\circ$ y $B=30^\circ$).

### Opciones
- [x] A) $\frac{\sqrt{6} - \sqrt{2}}{4}$ <!-- weight: 1.0 -->
- [x] B) $\frac{\sqrt{2}(\sqrt{3} - 1)}{4}$ <!-- weight: 1.0 -->
- [ ] C) 0.25 <!-- weight: 0.0 -->
- [ ] D) $\frac{\sqrt{3} - 1}{2}$ <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (A es la forma expandida, B es factorizada).

### Explicación Pedagógica
$\sin(45-30) = \sin 45\cos 30 - \cos 45\sin 30$
$= (\frac{\sqrt{2}}{2})(\frac{\sqrt{3}}{2}) - (\frac{\sqrt{2}}{2})(\frac{1}{2})$
$= \frac{\sqrt{6}}{4} - \frac{\sqrt{2}}{4} = \frac{\sqrt{6} - \sqrt{2}}{4}$.

---

## Contexto 2: El Teorema del Seno y del Coseno en Navegación
Un barco sale de un puerto $A$ y navega 40 km hacia el puerto $B$. Luego gira 60 grados y navega 30 km hacia el puerto $C$. La distancia directa entre $A$ y $C$ es esencial para calcular el combustible de retorno.

---

## Question 6 (Transferencia - Dificultad 9)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v6`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Transfer

### Enunciado
En un triángulo con lados $a=40$, $b=30$ y el ángulo entre ellos $\gamma=120^\circ$ (debido al giro de 60 grados desde la línea recta), ¿cuál es la distancia $c$ entre los puertos $A$ y $C$? (Use el Teorema del Coseno: $c^2 = a^2 + b^2 - 2ab\cos\gamma$).

### Opciones
- [ ] A) 50 km (Solo si fuera ángulo recto)
- [x] B) $\sqrt{3700}$ km (Aprox 60.8 km)
- [ ] C) 70 km
- [ ] D) 10 km

### Explicación Pedagógica
$c^2 = 40^2 + 30^2 - 2(40)(30)\cos(120^\circ)$
$c^2 = 1600 + 900 - 2400(-1/2)$
$c^2 = 2500 + 1200 = 3700$
$c = \sqrt{3700} \approx 60.8$ km. El teorema del coseno generaliza a Pitágoras para ángulos no rectos.

---

## Question 7 (Análisis de Series - Dificultad 5)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v7`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál es el periodo de la función $f(x) = \tan(x/2)$?

### Opciones
- [ ] A) $\pi$
- [x] B) $2\pi$
- [ ] C) $\pi/2$
- [ ] D) $4\pi$

### Explicación Pedagógica
El periodo de la función tangente base es $\pi$. Para una función $\tan(Bx)$, el periodo es $\pi/|B|$.
Aquí $B = 1/2$.
Periodo $= \pi / (1/2) = 2\pi$. La función se repite cada $2\pi$ unidades.

---

## Question 8 (Evaluación de Ecuaciones - Dificultad 6)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v8`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Resuelva la ecuación trigonométrica $2\sin(x) - 1 = 0$ para el intervalo $[0, 2\pi]$.

### Opciones
- [ ] A) $\pi/6$ únicamente.
- [x] B) $\pi/6$ y $5\pi/6$.
- [ ] C) $\pi/3$ y $2\pi/3$.
- [ ] D) $\pi/6$ y $7\pi/6$.

### Explicación Pedagógica
$2\sin x = 1 \rightarrow \sin x = 1/2$.
El seno es positivo en el I y II cuadrante.
En el I: $\arcsin(1/2) = 30^\circ = \pi/6$.
En el II: $180^\circ - 30^\circ = 150^\circ = 5\pi/6$.

---

## Question 9 (Identidades de Suma a Producto - Dificultad 8)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v9`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** synthesis

### Enunciado
Exprese el producto $2\sin(3x)\cos(x)$ como una suma de funciones seno.

### Opciones
- [ ] A) $\sin(4x) - \sin(2x)$
- [x] B) $\sin(4x) + \sin(2x)$
- [ ] C) $\sin(3x) + \sin x$
- [ ] D) $\cos(4x) + \cos(2x)$

### Explicación Pedagógica
Usamos la identidad de suma a producto inversa: $2\sin A\cos B = \sin(A+B) + \sin(A-B)$.
Con $A=3x$ y $B=x$:
$\sin(3x+x) + \sin(3x-x) = \sin(4x) + \sin(2x)$.

---

## Question 10 (Síntesis de Comportamiento - Dificultad 8)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v10`
**Type:** `multi-correct`
**ICFES:** Interpretación y Representación
**Bloom:** Synthesis

### Enunciado
Dada la gráfica de $f(x) = \sec(x)$, seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) La función no está definida en múltiplos impares de $\pi/2$. <!-- weight: 1.0 -->
- [x] B) El rango de la función es $(-\infty, -1] \cup [1, \infty)$. <!-- weight: 1.0 -->
- [ ] C) El rango es $[-1, 1]$.
- [x] D) Es una función par ($f(x) = f(-x)$). <!-- weight: 1.0 -->
- [ ] E) Tiene un periodo de $\pi$.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
$\sec x = 1/\cos x$. A) Como $\cos x = 0$ en $\pi/2, 3\pi/2$, etc., la secante tiene asíntotas allí. B) Como $|\cos x| \le 1$, entonces $1/|\cos x| \ge 1$. El rango excluye el intervalo $(-1, 1)$. D) Como el coseno es par, su recíproca también lo es. El periodo es $2\pi$ (E es falso).

---

## Question 11 (Análisis de Inversas - Dificultad 7)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v11`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál es el dominio restringido de la función seno para que su inversa $\arcsin(x)$ sea una función?

### Opciones
- [ ] A) $[0, \pi]$
- [x] B) $[-\pi/2, \pi/2]$
- [ ] C) $[-\pi, \pi]$
- [ ] D) Todo $\mathbb{R}$

### Explicación Pedagógica
La función seno es periódica y no inyectiva. Para definir su inversa, debemos elegir un tramo donde sea monótona (creciente o decreciente) y cubra todo el rango $[-1, 1]$. El estándar matemático es el intervalo $[-\pi/2, \pi/2]$.

---

## Question 12 (Evaluación de Identidades Cuadráticas - Dificultad 6)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v12`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Halle el valor de $\sin^2(30^\circ) + \cos^2(60^\circ)$.

### Opciones
- [ ] A) 1
- [x] B) 1/2 (Dado que $(1/2)^2 + (1/2)^2 = 1/4 + 1/4$)
- [ ] C) $\sqrt{3} / 2$
- [ ] D) 0

### Explicación Pedagógica
$\sin(30^\circ) = 1/2 \to (1/2)^2 = 1/4$.
$\cos(60^\circ) = 1/2 \to (1/2)^2 = 1/4$.
Suma: $1/4 + 1/4 = 1/2$. (¡Cuidado! No confundir con la identidad fundamental donde los ángulos deben ser iguales).

---

## Question 13 (Genio Interdisciplinar - Dificultad 10)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Transfer

### Enunciado
En mecánica clásica, un proyectil lanzado con velocidad $v$ y ángulo $\theta$ tiene un alcance horizontal $R = \frac{v^2 \sin(2\theta)}{g}$. ¿Bajo qué ángulo $\theta$ se obtiene el alcance máximo, y qué identidad trigonométrica lo demuestra?

### Opciones
- [x] A) $\theta = 45^\circ$, porque $\sin(2\theta) = \sin(90^\circ) = 1$, que es el máximo valor de la función seno. <!-- weight: 1.0 -->
- [x] B) $\theta = 0.785$ rad, por la misma razón. <!-- weight: 1.0 -->
- [ ] C) $\theta = 90^\circ$, porque es el ángulo más alto. <!-- weight: 0.0 -->
- [ ] D) No importa el ángulo, solo la velocidad. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Identifica correctamente el máximo de la función dependiente).

### Explicación Pedagógica
El alcance $R$ es proporcional a $\sin(2\theta)$. El valor máximo de la función seno es 1, lo cual ocurre cuando su argumento es $90^\circ$. Por lo tanto, $2\theta = 90^\circ \to \theta = 45^\circ$. Esta aplicación de la identidad del ángulo doble es fundamental en balística básica.

---

## Question 14 (Análisis Lógico - Dificultad 5)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v14`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
Si $\tan\theta = 1$, ¿cuál es el valor de $\theta$ en el tercer cuadrante?

### Opciones
- [ ] A) $45^\circ$
- [x] B) $225^\circ$ (Operación: $180^\circ + 45^\circ$)
- [ ] C) $135^\circ$
- [ ] D) $315^\circ$

### Explicación Pedagógica
La tangente es positiva en el I y III cuadrante.
En el I, $\arctan(1) = 45^\circ$.
En el III, el ángulo es $180^\circ + \theta_{referencia} = 180 + 45 = 225^\circ$.

---

## Question 15 (Simplificación Compleja - Dificultad 8)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v15`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** synthesis

### Enunciado
Simplifique la expresión: $\frac{1}{1 - \sin\theta} + \frac{1}{1 + \sin\theta}$.

### Opciones
- [ ] A) $2$
- [x] B) $2\sec^2\theta$
- [ ] C) $2\csc^2\theta$
- [ ] D) $\cos^2\theta$

### Explicación Pedagógica
Buscamos un denominador común: $(1-\sin\theta)(1+\sin\theta) = 1 - \sin^2\theta = \cos^2\theta$.
Numerador: $(1+\sin\theta) + (1-\sin\theta) = 2$.
Resultado: $\frac{2}{\cos^2\theta} = 2\sec^2\theta$.

---

## Question 16 (Análisis de Ondas - Dificultad 7)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v16`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
Dos ondas sonoras interfieren según la expresión $y = \sin(x) + \cos(x)$. Use identidades para expresar esta suma como una única función seno con un desfase.

### Opciones
- [ ] A) $y = 2\sin(x + \pi/4)$
- [x] B) $y = \sqrt{2}\sin(x + \pi/4)$
- [ ] C) $y = \sin(2x)$
- [ ] D) $y = \sqrt{2}\cos(x)$

### Explicación Pedagógica
Usamos la forma $A \sin(x + \phi)$.
$A = \sqrt{1^2 + 1^2} = \sqrt{2}$.
$\tan\phi = \frac{coef\ cos}{coef\ sin} = 1/1 = 1 \to \phi = \pi/4$.
Soberia: $y = \sqrt{2}\sin(x + \pi/4)$. Esto explica por qué el volumen de dos altavoces no es simplemente el doble, sino que depende de la fase.

---

## Question 17 (Evaluación de Límites Trigonométricos - Dificultad 9)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v17`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Evaluate

### Enunciado
Calcule el valor de $\cos(75^\circ)$ usando la identidad de la suma de ángulos.

### Opciones
- [ ] A) $\frac{\sqrt{6} + \sqrt{2}}{4}$
- [x] B) $\frac{\sqrt{6} - \sqrt{2}}{4}$
- [ ] C) $\frac{\sqrt{2} - \sqrt{6}}{4}$
- [ ] D) 0.5

### Explicación Pedagógica
$\cos(45+30) = \cos 45\cos 30 - \sin 45\sin 30$
$= (\frac{\sqrt{2}}{2})(\frac{\sqrt{3}}{2}) - (\frac{\sqrt{2}}{2})(\frac{1}{2})$
$= \frac{\sqrt{6}}{4} - \frac{\sqrt{2}}{4} = \frac{\sqrt{6} - \sqrt{2}}{4}$.
Dato curioso: $\cos(75^\circ) = \sin(15^\circ)$ debido a que son ángulos complementarios.

---

## Question 18 (Trigonometría Esférica Básica - Dificultad 10)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v18`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** synthesis

### Enunciado
En un triángulo sobre una superficie esférica (como la Tierra), la suma de los ángulos internos NO es $180^\circ$. Sobre esto, seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) La suma de los ángulos de un triángulo esférico siempre es mayor a $180^\circ$. <!-- weight: 1.0 -->
- [x] B) Esto ocurre porque las "líneas rectas" en una esfera son círculos máximos (geodésicas). <!-- weight: 1.0 -->
- [x] C) Un triángulo con tres ángulos de $90^\circ$ es posible en una esfera. <!-- weight: 1.0 -->
- [ ] D) Las identidades pitagóricas planos siguen funcionando perfectamente en una esfera.
- [ ] E) La suma es siempre $360^\circ$.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B y C son propiedades de la geometría elíptica (esférica). Un ejemplo es un triángulo que va del Polo Norte al ecuador, recorre un cuarto del ecuador y sube de nuevo al Polo Norte; tiene 3 ángulos rectos (suma $270^\circ$). D es falso por la curvatura del espacio, requiriendo trigonometría esférica.

---

## Question 19 (Interpretación de Modelos - Dificultad 5)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v19`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
¿Cuál es la frecuencia angular $\omega$ de la función $y = 5\cos(100\pi t)$?

### Opciones
- [ ] A) 5
- [ ] B) $2\pi$
- [x] C) $100\pi$
- [ ] D) 50 Hz

### Explicación Pedagógica
En la forma estándar $y = A\cos(\omega t + \phi)$, el coeficiente del tiempo $t$ es la frecuencia angular $\omega$. Aquí $\omega = 100\pi$ rad/s. Si quisiéramos frecuencia en ciclos/segundo (Hz), dividiríamos por $2\pi$, obteniendo 50 Hz.

---

## Question 20 (Genio de Transferencia Total - Dificultad 10)

**ID:** `CO-MAT-11-trigonometry-001-PRO-v20`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** evaluate

### Enunciado
Dada la identidad de Euler $e^{ix} = \cos x + i\sin x$, ¿cómo se puede expresar el valor de $\cos x$ usando números complejos?

### Opciones
- [x] A) $\cos x = \frac{e^{ix} + e^{-ix}}{2}$ <!-- weight: 1.0 -->
- [x] B) $\cos x = Re(e^{ix})$ (Parte real de e a la ix) <!-- weight: 0.6 -->
- [ ] C) $\cos x = \frac{e^{ix} - e^{-ix}}{2i}$ <!-- weight: 0.0 --> (Esto es $\sin x$)
- [ ] D) $\cos x = e^{ix} - i\sin x$ <!-- weight: 0.0 --> (Es redundante)

### Scoring
- Respuesta A: 1.0 punto. (Forma completa e independiente).
- Respuesta B: 0.6 puntos. (Usa definición de parte real).

### Explicación Pedagógica
Si $e^{ix} = \cos x + i\sin x$ y $e^{-ix} = \cos x - i\sin x$, sumamos ambas:
$e^{ix} + e^{-ix} = 2\cos x$.
Despejando: $\cos x = \frac{e^{ix} + e^{-ix}}{2}$. Esta relación es el puente fundamental entre el álgebra exponencial y la trigonometría circular en el análisis complejo.

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
| 7 | ...-v7 | 5 | single | Analyze | Interpretación | ✅ |
| 8 | ...-v8 | 6 | single | Evaluate | Formulación | ✅ |
| 9 | ...-v9 | 8 | single | synthesis | Formulación | ✅ |
| 10 | ...-v10| 8 | multi-correct | Synthesis | Interpretación | ✅ |
| 11 | ...-v11| 7 | single | Analyze | Interpretación | ✅ |
| 12 | ...-v12| 6 | single | Evaluate | Formulación | ✅ |
| 13 | ...-v13| 10| weighted | Transfer | Argumentación | ✅ |
| 14 | ...-v14| 5 | single | Analyze | Argumentación | ✅ |
| 15 | ...-v15| 8 | single | synthesis | Formulación | ✅ |
| 16 | ...-v16| 7 | single | Apply | Formulación | ✅ |
| 17 | ...-v17| 9 | single | Evaluate | Formulación | ✅ |
| 18 | ...-v18| 10| multi-correct | synthesis | Argumentación | ✅ |
| 19 | ...-v19| 5 | single | Analyze | Formulación | ✅ |
| 20 | ...-v20| 10| weighted | evaluate | Argumentación | ✅ |
