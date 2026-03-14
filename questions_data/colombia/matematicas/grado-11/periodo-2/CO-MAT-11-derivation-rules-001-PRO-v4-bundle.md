---
id: "CO-MAT-11-derivation-rules-001-PRO"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Reglas de Derivación y Regla de la Cadena"
periodo: 2
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

## Contexto 1: Automatización del Cálculo
Calcular la derivada por definición de límites es un proceso lento y propenso a errores para funciones complejas. Los matemáticos han desarrollado "reglas de derivación" (suma, producto, cociente y cadena) que permiten hallar la tasa de cambio de cualquier función algebraica o trascendente de forma mecánica. Estas reglas son la base detrás de los algoritmos de optimización en inteligencia artificial, como el *Backpropagation*, que ajusta los pesos de una red neuronal derivando el error respecto a cada parámetro.

---

## Question 1 (Analisis - Dificultad 5)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v1`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
Calcule la derivada de $f(x) = (3x^2 + 5)(2x - 1)$ usando la regla del producto.

### Opciones
- [ ] A) $12x^2 + 10$
- [x] B) $18x^2 - 6x + 10$
- [ ] C) $6x^3 - 3x^2 + 10x - 5$
- [ ] D) $6x$

### Explicación Pedagógica
Regla del producto: $(u \cdot v)' = u'v + uv'$.
$u = 3x^2 + 5 \rightarrow u' = 6x$.
$v = 2x - 1 \rightarrow v' = 2$.
$f'(x) = (6x)(2x - 1) + (3x^2 + 5)(2) = 12x^2 - 6x + 6x^2 + 10 = 18x^2 - 6x + 10$.

---

## Question 2 (Evaluación - Dificultad 6)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v2`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Dada la función $g(x) = \frac{x^2 + 1}{x - 3}$, halle $g'(x)$ mediante la regla del cociente.

### Opciones
- [ ] A) $2x$
- [x] B) $\frac{x^2 - 6x - 1}{(x-3)^2}$
- [ ] C) $\frac{x^2 + 6x + 1}{(x-3)^2}$
- [ ] D) $\frac{2x}{1}$

### Explicación Pedagógica
Regla del cociente: $(\frac{u}{v})' = \frac{u'v - uv'}{v^2}$.
$u = x^2 + 1 \rightarrow u' = 2x$.
$v = x - 3 \rightarrow v' = 1$.
$g'(x) = \frac{(2x)(x-3) - (x^2+1)(1)}{(x-3)^2} = \frac{2x^2 - 6x - x^2 - 1}{(x-3)^2} = \frac{x^2 - 6x - 1}{(x-3)^2}$.

---

## Question 3 (Síntesis - Dificultad 7)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre la derivada de la función compuesta $h(x) = \sin(x^2 + 5)$, seleccione TODAS las afirmaciones correctas sobre la aplicación de la regla de la cadena.

### Opciones
- [x] A) La función externa es $\sin(u)$ y la interna es $u = x^2 + 5$. <!-- weight: 1.0 -->
- [x] B) La derivada de la externa es $\cos(u)$ y la de la interna es $2x$. <!-- weight: 1.0 -->
- [x] C) El resultado final de la derivada es $2x\cos(x^2 + 5)$. <!-- weight: 1.0 -->
- [ ] D) La derivada es simplemente $\cos(x^2 + 5)$.
- [ ] E) No se puede derivar porque tiene un exponente dentro del seno.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
Regla de la cadena: $\frac{dy}{dx} = \frac{dy}{du} \cdot \frac{du}{dx}$.
A, B, C) Dividimos el proceso en capas. Primero derivamos el seno (se vuelve coseno manteniendo lo de adentro igual) y multiplicamos por la derivada del "corazón" de la función ($2x$). D es un error común: olvidar la derivada de la función interna.

---

## Question 4 (Análisis de Potencias Negativas - Dificultad 6)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v4`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Halle la derivada de $f(x) = \sqrt{2x + 1}$.

### Opciones
- [ ] A) $\frac{1}{\sqrt{2x + 1}}$
- [x] B) $\frac{1}{\sqrt{2x + 1}}$ (Simplificación: $\frac{2}{2\sqrt{2x+1}}$)
- [ ] C) $2(2x+1)^{-1/2}$
- [ ] D) $1/2$

### Explicación Pedagógica
$f(x) = (2x + 1)^{1/2}$.
Derivada: $(1/2)(2x + 1)^{-1/2} \cdot (2)$.
Los doses se cancelan: $(2x + 1)^{-1/2} = \frac{1}{\sqrt{2x + 1}}$.

---

## Question 5 (Genio - Dificultad 8)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
¿Cuál es la derivada de $f(x) = e^{3x} \ln(x)$?

### Opciones
- [x] A) $3e^{3x}\ln(x) + \frac{e^{3x}}{x}$ <!-- weight: 1.0 -->
- [x] B) $e^{3x} (3\ln(x) + 1/x)$ <!-- weight: 1.0 -->
- [ ] C) $3e^{3x} \cdot 1/x$ <!-- weight: 0.0 -->
- [ ] D) $e^{3x}$ <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (A es expandida, B es factorizada).

### Explicación Pedagógica
Combinamos regla del producto y la cadena para el exponencial.
$u = e^{3x} \rightarrow u' = 3e^{3x}$.
$v = \ln x \rightarrow v' = 1/x$.
$f'(x) = 3e^{3x}\ln x + e^{3x}(1/x) = e^{3x}(3\ln x + 1/x)$.

---

## Contexto 2: Derivación Implícita en la Ingeniería
No todas las curvas se pueden escribir como $y = f(x)$. Por ejemplo, la trayectoria de una órbita circular es $x^2 + y^2 = r^2$. Para hallar la pendiente en un punto de este círculo, usamos "derivación implícita", tratando a $y$ como una función de $x$ y derivando ambos lados de la ecuación utilizando la regla de la cadena cada vez que derivamos un término con $y$.

---

## Question 6 (Transferencia - Dificultad 9)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v6`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Transfer

### Enunciado
Dada la curva $x^2 + y^2 = 25$ (un círculo de radio 5), halle la pendiente de la recta tangente en el punto $(3, 4)$ usando derivación implícita.

### Opciones
- [ ] A) 3/4
- [x] B) -3/4
- [ ] C) -4/3
- [ ] D) 0

### Explicación Pedagógica
Derivamos respecto a $x$:
$2x + 2y \frac{dy}{dx} = 0$.
Aislamos $dy/dx$: $2y \frac{dy}{dx} = -2x \rightarrow \frac{dy}{dx} = -x/y$.
Evaluando en $(3, 4)$: Pendiente $= -3/4$.
Geométricamente, tiene sentido: en el primer cuadrante de un círculo, la tangente debe tener pendiente negativa.

---

## Question 7 (Análisis de Derivadas de Orden Superior - Dificultad 5)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v7`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si la posición de un objeto es $s(t) = 5t^3$, ¿cuál es su **aceleración** en el tiempo $t$? (Recuerde que la aceleración es la segunda derivada de la posición).

### Opciones
- [ ] A) $15t^2$ (Velocidad)
- [x] B) $30t$ (Aceleración)
- [ ] C) 30
- [ ] D) 5

### Explicación Pedagógica
Primera derivada (Velocidad): $s'(t) = 15t^2$.
Segunda derivada (Aceleración): $s''(t) = 30t$.
La aceleración aumenta de forma lineal con el tiempo.

---

## Question 8 (Evaluación de ReglasTrigonométricas - Dificultad 7)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v8`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Calcule la derivada de $f(x) = \tan(x^2)$.

### Opciones
- [ ] A) $\sec^2(x^2)$
- [x] B) $2x\sec^2(x^2)$
- [ ] C) $2x\tan(x^2)$
- [ ] D) $2\sec^2(x)$

### Explicación Pedagógica
Aplicamos regla de la cadena.
Derivada de la externa ($\tan u$): $\sec^2 u$.
Derivada de la interna ($x^2$): $2x$.
Resultado: $\sec^2(x^2) \cdot 2x = 2x\sec^2(x^2)$.

---

## Question 9 (Técnica de Logaritmos - Dificultad 8)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v9`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** synthesis

### Enunciado
Halle la derivada de $y = \ln(\sin x)$.

### Opciones
- [ ] A) $1/\sin x$
- [x] B) $\cot x$
- [ ] C) $\tan x$
- [ ] D) $\cos x / x$

### Explicación Pedagógica
Cadena: $\frac{1}{\sin x} \cdot (\cos x) = \frac{\cos x}{\sin x} = \cot x$.

---

## Question 10 (Síntesis de Comportamiento - Dificultad 8)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v10`
**Type:** `multi-correct`
**ICFES:** Interpretación y Representación
**Bloom:** Synthesis

### Enunciado
Considere la función $f(x) = x e^x$. Seleccione TODAS las afirmaciones correctas sobre sus derivadas.

### Opciones
- [x] A) $f'(x) = e^x(x + 1)$. <!-- weight: 1.0 -->
- [x] B) $f''(x) = e^x(x + 2)$. <!-- weight: 1.0 -->
- [ ] C) $f'(0) = 0$.
- [x] D) La enésima derivada $f^{(n)}(x) = e^x(x + n)$. <!-- weight: 1.0 -->
- [ ] E) La derivada de $f$ es siempre negativa.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A) Regla producto: $1(e^x) + x(e^x) = e^x(x+1)$. B) Derivando A: $e^x(x+1) + e^x(1) = e^x(x+2)$. D) Siguiendo el patrón, cada derivada suma 1 al término constante. C es falso: $f'(0) = e^0(0+1) = 1$.

---

## Question 11 (Análisis de Funciones Inversas - Dificultad 9)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v11`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
¿Cuál es la derivada de $f(x) = \arcsin(x)$?

### Opciones
- [ ] A) $\frac{1}{\sqrt{1+x^2}}$
- [x] B) $\frac{1}{\sqrt{1-x^2}}$
- [ ] C) $\frac{-1}{\sqrt{1-x^2}}$
- [ ] D) $\arccos(x)$

### Explicación Pedagógica
Se obtiene mediante derivación implícita de $x = \sin y$:
$1 = \cos y \frac{dy}{dx} \rightarrow \frac{dy}{dx} = \frac{1}{\cos y} = \frac{1}{\sqrt{1-\sin^2 y}} = \frac{1}{\sqrt{1-x^2}}$.

---

## Question 12 (Evaluación de Regla de la Cadena Múltiple - Dificultad 8)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v12`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Halle la derivada de $y = \sin^3(4x)$.

### Opciones
- [ ] A) $3\sin^2(4x)\cos(4x)$
- [x] B) $12\sin^2(4x)\cos(4x)$
- [ ] C) $12\cos^2(4x)$
- [ ] D) $4\cos^3(4x)$

### Explicación Pedagógica
Tres capas: 1) Potencia $u^3$, 2) Seno $\sin v$, 3) Lineal $4x$.
$y' = 3(\sin(4x))^2 \cdot \cos(4x) \cdot 4 = 12\sin^2(4x)\cos(4x)$.

---

## Question 13 (Genio Interdisciplinar - Dificultad 10)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Transfer

### Enunciado
En termodinámica, la presión $P$, volumen $V$ y temperatura $T$ de un gas ideal se relacionan por $PV = nRT$. Si mantenemos la temperatura constante y el volumen aumenta, la presión debe disminuir. ¿Cuál es la relación entre las tasas de cambio $dP/dt$ y $dV/dt$ según la derivación implícita (respecto al tiempo)?

### Opciones
- [x] A) $\frac{dP}{dt} = -\frac{P}{V} \frac{dV}{dt}$ <!-- weight: 1.0 -->
- [x] B) $V \frac{dP}{dt} + P \frac{dV}{dt} = 0$ <!-- weight: 1.0 -->
- [ ] C) $\frac{dP}{dt} = \frac{dV}{dt}$ <!-- weight: 0.0 -->
- [ ] D) $P = -V$ <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (A es despejada, B es la derivada directa del producto).

### Explicación Pedagógica
Derivamos el producto $PV$ respecto al tiempo $t$ (asumiendo temperatura $T$ constante, así que $nRT$ es constante):
$\frac{d}{dt}(PV) = \frac{d}{dt}(constante) \rightarrow P \frac{dV}{dt} + V \frac{dP}{dt} = 0$.
Esto demuestra que las tasas de cambio son inversamente proporcionales: si el volumen crece ($dV/dt > 0$), la presión debe caer ($dP/dt < 0$) para mantener el equilibrio.

---

## Question 14 (Análisis Lógico de la Regla de la Cadena - Dificultad 5)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v14`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
Si $f(x) = |x|$, un estudiante intenta usar la regla de la potencia escribiendo $f(x) = \sqrt{x^2}$. Aplicando la regla de la cadena, ¿qué resultado obtiene para la derivada (donde $x \neq 0$)?

### Opciones
- [ ] A) 1
- [ ] B) -1
- [x] C) $x/|x|$ (es decir, el signo de $x$)
- [ ] D) No se puede hacer.

### Explicación Pedagógica
$\frac{d}{dx} (x^2)^{1/2} = \frac{1}{2}(x^2)^{-1/2} \cdot 2x = \frac{x}{\sqrt{x^2}} = \frac{x}{|x|}$.
Para $x>0$ da $1$; para $x<0$ da $-1$. Concuerda perfectamente con el análisis gráfico de la función valor absoluto.

---

## Question 15 (Simplificación con Logaritmos - Dificultad 7)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v15`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** synthesis

### Enunciado
Halle la derivada de $y = \ln(\sqrt{x})$.

### Opciones
- [ ] A) $\frac{1}{\sqrt{x}}$
- [x] B) $\frac{1}{2x}$
- [ ] C) $\frac{1}{2\sqrt{x}}$
- [ ] D) $x/2$

### Explicación Pedagógica
Propiedad de logaritmos: $\ln(x^{1/2}) = \frac{1}{2}\ln x$.
Derivando: $\frac{1}{2} \cdot \frac{1}{x} = \frac{1}{2x}$.
Las propiedades de los logaritmos simplifican enormemente las derivadas.

---

## Question 16 (Análisis de Segunda Derivada - Dificultad 7)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v16`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
Halle la segunda derivada de $f(x) = \sin(x)$.

### Opciones
- [ ] A) $\cos x$
- [x] B) $-\sin x$
- [ ] C) $-\cos x$
- [ ] D) $\sin x$

### Explicación Pedagógica
$f'(x) = \cos x$.
$f''(x) = -\sin x$.
En física, esto indica que para un resorte (oscilador armónico), la fuerza restauradora es proporcional y opuesta a la posición (Ley de Hooke).

---

## Question 17 (Evaluación de Constantes - Dificultad 5)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v17`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál es la derivada de $f(x) = \pi^2 + e^3$?

### Opciones
- [ ] A) $2\pi + 3e^2$
- [x] B) 0
- [ ] C) $2\pi e^2$
- [ ] D) $\pi^2 + e^3$

### Explicación Pedagógica
Tanto $\pi^2$ como $e^3$ son números constantes (no dependen de $x$). La tasa de cambio de cualquier constante es siempre 0. Muchos estudiantes se confunden aplicando reglas de potencia a bases constantes.

---

## Question 18 (Derivación de Exponenciales de Base Genérica - Dificultad 9)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v18`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre la derivada de $f(x) = 2^x$. Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) El resultado es $2^x \ln(2)$. <!-- weight: 1.0 -->
- [x] B) Se puede resolver reescribiendo la función como $e^{x \ln(2)}$. <!-- weight: 1.0 -->
- [ ] C) El resultado es $x 2^{x-1}$. (Regla de potencia mal aplicada).
- [x] D) La tasa de cambio es proporcional al valor de la función en cada punto. <!-- weight: 1.0 -->
- [ ] E) La derivada es negativa para todo $x$.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B) Para bases distintas de $e$, aparece el factor corrector $\ln(base)$. C es un error destructivo: confundir función potencia ($x^n$) con exponencial ($a^x$). D) Esto es lo que define el crecimiento exponencial: cuanto más tienes, más rápido creces.

---

## Question 19 (Interpretación de Pendientes Negativas - Dificultad 5)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v19`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
Halle la pendiente de la recta tangente a la curva $y = x^3 - 4x$ en el punto $x=1$.

### Opciones
- [ ] A) -3
- [x] B) -1 (Derivada $3x^2 - 4$, evaluada en 1)
- [ ] C) 0
- [ ] D) 1

### Explicación Pedagógica
$y' = 3x^2 - 4$.
En $x=1$: $y'(1) = 3(1)^2 - 4 = 3 - 4 = -1$.
La función está descendiendo en ese punto con una inclinación de 45 grados hacia abajo.

---

## Question 20 (Genio de Transferencia Total - Dificultad 10)

**ID:** `CO-MAT-11-derivation-rules-001-PRO-v20`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** synthesis

### Enunciado
**MASTER INTEGRATION:**

Imagine que una empresa de streaming modela su cantidad de usuarios como $N(t)$ y su ingreso por usuario como $I(t)$. El ingreso total es $R(t) = N(t)I(t)$.

Debido a la competencia, la cantidad de usuarios está **creciendo** ($N'(t) > 0$) pero el ingreso por usuario está **cayendo** ($I'(t) < 0$). ¿Bajo qué condición matemática exacta el ingreso total de la empresa seguirá aumentando a pesar de la caída del precio por usuario?

### Options
- [x] A) El crecimiento porcentual de usuarios debe ser mayor a la caída porcentual del ingreso: $\frac{N'(t)}{N(t)} > \frac{|I'(t)|}{I(t)}$. <!-- weight: 1.0 -->
- [x] B) $N'(t)I(t) > N(t)|I'(t)|$. (La ganancia por nuevos usuarios compensa la pérdida por precios bajos). <!-- weight: 1.0 -->
- [ ] C) Siempre aumentará porque $N(t)$ siempre es positivo. <!-- weight: 0.0 -->
- [ ] D) El ingreso se mantendrá igual por la ley de oferta y demanda. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (B es la aplicación directa de la regla del producto, A es la interpretación económica de elasticidad).

### Explicación Pedagógica
Derivamos el ingreso total: $R'(t) = N'(t)I(t) + N(t)I'(t)$.
Para que el ingreso aumente, $R'(t) > 0$.
$N'(t)I(t) + N(t)I'(t) > 0 \rightarrow N'(t)I(t) > -N(t)I'(t)$.
Esto significa que el incremento generado por traer más personas al sistema ($N'I$) debe ser mayor que el "desangre" financiero provocado por cobrarles menos a todos los que ya estaban ($NI'$). Es el dilema fundamental de las empresas de bajo costo.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Type | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 5 | single | Analyze | Formulación | ✅ |
| 2 | ...-v2 | 6 | single | Evaluate | Formulación | ✅ |
| 3 | ...-v3 | 7 | multi-correct | Synthesis | Argumentación | ✅ |
| 4 | ...-v4 | 6 | single | Analyze | Interpretación | ✅ |
| 5 | ...-v5 | 8 | weighted | Evaluate | Argumentación | ✅ |
| 6 | ...-v6 | 9 | single | Transfer | Formulación | ✅ |
| 7 | ...-v7 | 5 | single | Analyze | Interpretación | ✅ |
| 8 | ...-v8 | 7 | single | Evaluate | Formulación | ✅ |
| 9 | ...-v9 | 8 | single | synthesis | Formulación | ✅ |
| 10 | ...-v10| 8 | multi-correct | Synthesis | Interpretación | ✅ |
| 11 | ...-v11| 9 | single | Analyze | Formulación | ✅ |
| 12 | ...-v12| 8 | single | Evaluate | Formulación | ✅ |
| 13 | ...-v13| 10| weighted | Transfer | Argumentación | ✅ |
| 14 | ...-v14| 5 | single | Analyze | Argumentación | ✅ |
| 15 | ...-v15| 7 | single | synthesis | Formulación | ✅ |
| 16 | ...-v16| 7 | single | Analyze | Formulación | ✅ |
| 17 | ...-v17| 5 | single | Analyze | Interpretación | ✅ |
| 18 | ...-v18| 9 | multi-correct | Synthesis | Argumentación | ✅ |
| 19 | ...-v19| 5 | single | Analyze | Formulación | ✅ |
| 20 | ...-v20| 10| weighted | synthesis | Argumentación | ✅ |
