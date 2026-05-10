---
id: "CO-MAT-11-P1-limites-002"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "limites"
periodo: 1
protocol_version: "5.1"
bundle_size: 20
alignment: "ICFES Saber 11 + MEN"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-03T20:00:00.000Z"
quality_status: "UNREVISED"
generation_status: "RAW"
needs_human_review: true
curation:
  human_review_required: true
  human_reviewed: false
  agent_curated: false
license: "CC BY-NC-SA 4.0"
---

# MASTERY Bundle 002 — Límites y Continuidad — Grado 11

## Question 1 (Variant Basic - Difficulty 3)
**ID:** `CO-MAT-11-P1-limites-002-v1`
**Bloom:** Remember
**ICFES:** Identificación de límites laterales
**Context:** Clase de matemáticas en Colegio Departamental de Antioquia

### Enunciado
¿Qué representa lim_(x→a⁺) f(x)?

### Options
- [ ] A) El valor de f(x) cuando x = a
- [x] B) El límite de f(x) cuando x se aproxima a a desde la derecha (valores mayores que a) <!-- feedback: La notación con superíndice + indica que nos aproximamos por valores mayores que a, es decir, por la derecha en la recta numérica -->
- [ ] C) El límite de f(x) cuando x tiende a infinito positivo
- [ ] D) El valor máximo de f(x) en el punto a

### Explicación Pedagógica
Los límites laterales son fundamentales para determinar si existe el límite de una función. El superíndice "+" indica aproximación por la derecha (x > a), mientras que "-" indica aproximación por la izquierda (x < a). Un error común es confundir la notación con exponentes.

---

## Question 2 (Variant Basic - Difficulty 3)
**ID:** `CO-MAT-11-P1-limites-002-v2`
**Bloom:** Remember
**ICFES:** Concepto de continuidad en un punto
**Context:** Introducción al concepto de continuidad en Textbook MEN

### Enunciado
¿Una función f(x) es continua en x = a si y solo si se cumplen TODAS las siguientes condiciones, EXCEPTO una. ¿Cuál es la excepción?

### Options
- [ ] A) f(a) existe (la función está definida en a)
- [ ] B) Existe lim_(x→a) f(x) (el límite existe)
- [ ] C) lim_(x→a) f(x) = f(a) (el límite equals al valor en el punto)
- [x] D) f(a) > 0 (el valor de la función debe ser positivo) <!-- feedback: La positividad del valor de la función no es condición de continuidad. Una función puede ser continua y tomar valores negativos, cero o positivos. Esto es una condición innecesaria y falsa -->

### Explicación Pedagógica
Las tres condiciones de continuidad son: existencia de f(a), existencia del límite, e igualdad entre ambos. Cualquier otra condición es spurious. Un error frecuente es agregar condiciones falsas como "ser positiva" o "ser creciente".

---

## Question 3 (Variant Basic - Difficulty 4)
**ID:** `CO-MAT-11-P1-limites-002-v3`
**Bloom:** Understand
**ICFES:** Cálculo de límites de polinomios
**Context:** Ejercicio básico del módulo de matemáticas delICFES

### Enunciado
Calcula: lim_(x→2) (x³ - 8)

### Options
- [ ] A) 8
- [x] B) 0 <!-- feedback: Evaluando directamente: x³ - 8 = 2³ - 8 = 8 - 8 = 0. Alternativamente, x³ - 8 = (x-2)(x²+2x+4), así que en x=2 el valor es 0. En polinomios, el límite se calcula sustituyendo directamente porque son funciones continuas -->
- [ ] C) 16
- [ ] D) 2

### Explicación Pedagógica
Los polinomios son funciones continuas en todos los reales, por lo que lim_(x→a) p(x) = p(a). El error común es complicar innecesariamente factorizando cuando se puede evaluar directamente.

---

## Question 4 (Variant Basic - Difficulty 4)
**ID:** `CO-MAT-11-P1-limites-002-v4`
**Bloom:** Understand
**ICFES:** Evaluación de límites en funciones racionales
**Context:** Estudiante resolviendo tarea en Universidad del Rosario

### Enunciado
¿Cuál es el valor de lim_(x→-1) (x² - 1)/(x + 1)?

### Options
- [ ] A) -1
- [ ] B) 1
- [x] C) -2 <!-- feedback: Factorizando: (x²-1)/(x+1) = (x-1)(x+1)/(x+1) = x-1 para x ≠ -1. Cuando x→-1, x-1→-2. El límite es -2. Note que f(-1) no está definida (indeterminación 0/0), pero el límite existe -->
- [ ] D) 0

### Explicación Pedagógica
Cuando hay indeterminación 0/0 en un cociente, hay que factorizar para cancelar el factor problemático. Un error común es concluir que el límite no existe simplemente porque la función no está definida en el punto.

---

## Question 5 (Variant Basic - Difficulty 5)
**ID:** `CO-MAT-11-P1-limites-002-v5`
**Bloom:** Apply
**ICFES:** Límites de cocientes de polinomios cuando x→∞
**Context:** Problema del texto "Cálculo con Geometría Analítica" de Purcell

### Enunciado
Calcula lim_(x→∞) (2x³ - 5x² + 3)/(3x³ + 7x - 1)

### Options
- [x] A) 2/3 <!-- feedback: Dividiendo numerador y denominador por x³: (2 - 5/x + 3/x³)/(3 + 7/x² - 1/x³). Cuando x→∞, todos los términos con x en el denominador tienden a 0, quedando 2/3 -->
- [ ] B) 0
- [ ] C) ∞
- [ ] D) 1

### Explicación Pedagógica
Para límites de polinomios entre polinomios cuando x→∞, siempre dividir por la mayor potencia. El resultado es el cociente de los coeficientes principales. Errores comunes: no dividir uniformemente o confundir qué término domina.

---

## Question 6 (Variant Basic - Difficulty 5)
**ID:** `CO-MAT-11-P1-limites-002-v6`
**Bloom:** Apply
**ICFES:** Aplicación de propiedades de límites
**Context:** Problema de tarea en Colegio San Bartolomé

### Enunciado
Si lim_(x→3) f(x) = 4 y lim_(x→3) g(x) = -2, ¿cuál es lim_(x→3) [f(x) · g(x)]?

### Options
- [ ] A) 8
- [x] B) -8 <!-- feedback: Por la propiedad del producto de límites: lim[f·g] = lim f · lim g = 4 · (-2) = -8 -->
- [ ] C) -2
- [ ] D) 2

### Explicación Pedagógica
Las propiedades de límites incluyen: suma, resta, producto por constante, producto y cociente. Aquí se aplica la propiedad del producto. Un error frecuente es confundir el signo o intentar sumar términos que no son límites.

---

## Question 7 (Variant Basic - Difficulty 5)
**ID:** `CO-MAT-11-P1-limites-002-v7`
**Bloom:** Apply
**ICFES:** Límites trigonométricos fundamentales
**Context:** Ejercicio del módulo ICFES sobre trigonometría

### Enunciado
¿Cuál es el valor de lim_(x→0) (tan x)/x?

### Options
- [ ] A) 0
- [ ] B) ∞
- [x] C) 1 <!-- feedback: Como tan x = sin x / cos x, tenemos (tan x)/x = (sin x)/(x·cos x) = [sin x/x] · [1/cos x]. Cuando x→0, sin x/x → 1 y 1/cos x → 1, por lo tanto el producto es 1. También se puede obtener derivando: por L'Hôpital, 1 -->
- [ ] D) -1

### Explicación Pedagógica
Este límite notable se deduce del límite fundamental sin x/x. Usando tan x = sin x/cos x, separamos el producto y evaluamos cada factor. El error frecuente es olvidar que 1/cos x → 1 cuando x→0.

---

## Question 8 (Variant Basic - Difficulty 6)
**ID:** `CO-MAT-11-P1-limites-002-v8`
**Bloom:** Apply
**ICFES:** Límites exponenciales fundamentales
**Context:** Universidad de los Andes, sección de cálculo

### Enunciado
¿Cuál es el valor de lim_(x→∞) (1 + 1/x)^x?

### Options
- [x] A) e ≈ 2.71828 <!-- feedback: Este es el límite fundamental que define el número e. Cuando x→∞, (1 + 1/x)^x → e. Se puede demostrar usando ln: ln[(1+1/x)^x] = x·ln(1+1/x) → x·(1/x) = 1 cuando x→∞, entonces el límite del logaritmo es 1, así que el límite original es e -->
- [ ] B) 1
- [ ] C) ∞
- [ ] D) 0

### Explicación Pedagógica
Este es el límite más importante en cálculo junto con sin x/x. Aparece en模型 de crecimiento continuo, interés compuesto continuo, y decaimiento exponencial. Un error frecuente es confundirlo con lim_(x→0) (1+x)^(1/x) = e, que es equivalente bajo el cambio de variable.

---

## Question 9 (Variant Basic - Difficulty 6)
**ID:** `CO-MAT-11-P1-limites-002-v9`
**Bloom:** Apply
**ICFES:** Análisis de continuidad de funciones elementales
**Context:** Clasificación de funciones en examen delICFES

### Enunciado
¿Cuál de las siguientes funciones es continua en todos los reales?

### Options
- [ ] A) f(x) = 1/x
- [ ] B) f(x) = ln|x|
- [x] C) f(x) = x³ - 2x² + 5x - 7 <!-- feedback: Los polinomios son continuos en todo ℝ. Las funciones racionales como 1/x son continuas en su dominio (ℝ\{0}) pero no en x=0. ln|x| es continua en ℝ\{0} también. La respuesta correcta es cualquier polinomio -->
- [ ] D) f(x) = 1/(x² - 4)

### Explicación Pedagógica
Los polinomios son continuos en todo ℝ. Las funciones racionales, logarítmicas, trigonométricas (excepto en puntos de discontinuidad esencial) son continuas en sus dominios. El error común es olvidar que funciones "simples" pueden tener restricciones de dominio.

---

## Question 10 (Variant Basic - Difficulty 6)
**ID:** `CO-MAT-11-P1-limites-002-v10`
**Bloom:** Apply
**ICFES:** Uso de racionalización para calcular límites
**Context:** Problema tipoICFES en Institución Educativa de Cali

### Enunciado
Calcula lim_(x→4) (√x - 2)/(x - 4)

### Options
- [ ] A) 0
- [ ] B) 1/4
- [x] C) 1/4 <!-- feedback: Racionalizando: (√x - 2)/(x - 4) · (√x + 2)/(√x + 2) = (x - 4)/[(x - 4)(√x + 2)] = 1/(√x + 2). Cuando x→4, esto es 1/(2+2) = 1/4. También se puede ver como la derivada de √x en x=4: f'(x) = 1/(2√x), entonces f'(4) = 1/4 -->
- [ ] D) 4

### Explicación Pedagógica
La racionalización es una herramienta fundamental para límites con raíces. Multiplicar por el conjugado transforma diferencias de raíces en productos. Alternativamente, este límite representa la derivada de √x en x=4, lo cual es una interpretación geométrica importante.

---

## Question 11 (Variant Basic - Difficulty 7)
**ID:** `CO-MAT-11-P1-limites-002-v11`
**Bloom:** Analyze
**ICFES:** Análisis de límites mediante gráficas
**Context:** Interpretación de gráficas en prueba ICFES tipo

### Enunciado
Una función f tiene la siguiente gráfica: una curva suave que se aproxima a y = 2 cuando x→±∞, con f(0) = 1. ¿Cuál afirmación es correcta sobre lim_(x→±∞) f(x)?

### Options
- [x] A) lim_(x→+∞) f(x) = 2 y lim_(x→-∞) f(x) = 2 <!-- feedback: Cuando x→±∞, la gráfica tiende a la asíntota horizontal y = 2. Por lo tanto, ambos límites laterales son iguales a 2, aunque los valores de f(x) sean diferentes para valores finitos de x -->
- [ ] B) Los límites no existen porque f(x) nunca equals 2
- [ ] C) lim_(x→+∞) f(x) = 1 porque f(0) = 1
- [ ] D) Solo existe lim_(x→+∞) f(x) = 2, pero no lim_(x→-∞) f(x)

### Explicación Pedagógica
Las asíntotas horizontales describen el comportamiento de la función cuando x→±∞. Un error frecuente es confundir el valor de la función en un punto finito (f(0) = 1) con el límite cuando x→∞.

---

## Question 12 (Variant Basic - Difficulty 7)
**ID:** `CO-MAT-11-P1-limites-002-v12`
**Bloom:** Analyze
**ICFES:** Identificación de tipos de discontinuidad
**Context:** Clasificación de discontinuidades en problemas de análisis

### Enunciado
La función f(x) = { x + 2 si x < 1; x - 2 si x ≥ 1 } tiene discontinuidad en x = 1. ¿Qué tipo de discontinuidad es?

### Options
- [x] A) Discontinuidad de salto <!-- feedback: Calculando límites laterales: lim_(x→1⁻) f(x) = 1+2 = 3. lim_(x→1⁺) f(x) = 1-2 = -1. Como los límites laterales son diferentes (3 ≠ -1), hay una discontinuidad de salto. La "altura" de la función cambia abruptamente en x=1 -->
- [ ] B) Discontinuidad removible
- [ ] C) Discontinuidad esencial
- [ ] D) No hay discontinuidad

### Explicación Pedagógica
La discontinuidad de salto ocurre cuando los límites laterales existen pero son diferentes. La gráfica "salta" de un valor a otro. A diferencia de la discontinuidad removible, no se puede "arreglar" redefiniendo un solo punto.

---

## Question 13 (Variant Basic - Difficulty 7)
**ID:** `CO-MAT-11-P1-limites-002-v13`
**Bloom:** Analyze
**ICFES:** Análisis de continuidad en intervalos cerrados
**Context:** Problema del teorema del valor intermedio en Universidad Nacional

### Enunciado
Sea f(x) = x² - 4x + 3 en [0, 4]. ¿Se puede aplicar el Teorema del Valor Intermedio para garantizar una raíz en (0, 4)?

### Options
- [ ] A) No, porque f no es continua en [0, 4]
- [x] B) Sí, porque f es continua en [0, 4] (polinomio) y f(0) = 3 > 0, f(4) = 3 > 0 <!-- feedback: Para aplicar el TVI se necesitan: continuidad en [0,4] ✓ (polinomio, siempre continuo), y valores de signos opuestos en los extremos. Aquí f(0)=3 y f(4)=3, ambos positivos, así que NO hay garantía de raíz por TVI. Aunque en este caso f(x) = (x-1)(x-3) sí tiene raíces en x=1 y x=3, el TVI no las garantiza porque no hay cambio de signo -->
- [ ] C) Sí, porque todo polinomio tiene raíces
- [ ] D) No, porque f(0) = f(4)

### Explicación Pedagógica
El TVI requiere continuidad (dada) Y valores de signos opuestos en los extremos para garantizar una raíz. En este caso, f(0) = f(4) = 3, ambos positivos, así que el teorema no garantiza ninguna raíz aunque existan. El TVI solo dice "existe c" si f(a)·f(b) < 0.

---

## Question 14 (Variant Basic - Difficulty 7)
**ID:** `CO-MAT-11-P1-limites-002-v14`
**Bloom:** Analyze
**ICFES:** Demostración de no existencia de límites
**Context:** Problema sobre unicidad del límite en curso de análisis

### Enunciado
Si lim_(x→a) f(x) = L₁ y lim_(x→a) f(x) = L₂, ¿qué se puede concluir sobre L₁ y L₂?

### Options
- [ ] A) L₁ y L₂ pueden ser diferentes
- [x] B) L₁ = L₂; el límite, si existe, es único <!-- feedback: Este es el teorema de unicidad del límite: si el límite de f(x) cuando x→a existe, entonces es único. No puede haber dos límites diferentes para la misma función en el mismo punto. La demostración usa la definición epsilon-delta -->
- [ ] C) L₁ = -L₂
- [ ] D) No se puede concluir nada

### Explicación Pedagógica
La unicidad del límite es un teorema fundamental. Un error común en estudiantes es pensar que una función puede aproximarse a dos valores diferentes simultáneamente. Esto es imposible: si existe, el límite es único.

---

## Question 15 (Variant Basic - Difficulty 8)
**ID:** `CO-MAT-11-P1-limites-002-v15`
**Bloom:** Analyze
**ICFES:** Uso de la definición epsilon-delta
**Context:** Taller de demostraciones en Universidad de los Andes

### Enunciado
Demuestra que lim_(x→3) (2x - 1) = 5 usando la definición ε-δ.

### Options
- [ ] A) Se evalúa directamente: 2(3) - 1 = 5
- [x] B) Dado ε > 0, queremos |(2x-1) - 5| < ε cuando |x-3| < δ. Como |2x-1-5| = |2x-6| = 2|x-3| < ε, elegimos δ = ε/2 <!-- feedback: Para demostrar con ε-δ: necesitamos encontrar δ explícitamente en términos de ε. Aquí |f(x)-L| = 2|x-3|. Para que 2|x-3| < ε, necesitamos |x-3| < ε/2, así que δ = ε/2 funciona -->
- [ ] C) Como 2x - 1 es continua, el límite es 5
- [ ] D) Se verifica que f(3) = 5

### Explicación Pedagógica
La demostración ε-δ requiere encontrar explícitamente δ = ε/2. Los errores incluyen: no establecer la relación entre |x-a| y |f(x)-L|, elegir δ incorrectamente (como δ = ε), o simplemente evaluar sin justificación formal.

---

## Question 16 (Variant Basic - Difficulty 8)
**ID:** `CO-MAT-11-P1-limites-002-v16`
**Bloom:** Analyze
**ICFES:** Límites de funciones compuestas
**Context:** Problema avanzado de continuidad en Universidad Javeriana

### Enunciado
Calcula lim_(x→0) sin(cos x), donde cos x está en radianes.

### Options
- [ ] A) sin(0) = 0
- [ ] B) sin(1)
- [x] C) sin(1) <!-- feedback: Primero, lim_(x→0) cos x = cos(0) = 1 (por continuidad de cos). Luego, lim_(x→0) sin(cos x) = sin(lim_(x→0) cos x) = sin(1). Por el teorema de continuidad de funciones compuestas: si g es continua en f(a), entonces lim g(f(x)) = g(lim f(x)) -->
- [ ] D) No existe

### Explicación Pedagógica
Este problema usa el teorema de continuidad de funciones compuestas. Un error frecuente es intentar evaluar sin(cos x) directamente sin darse cuenta de que hay que evaluar primero el límite interior.

---

## Question 17 (Variant Basic - Difficulty 9)
**ID:** `CO-MAT-11-P1-limites-002-v17`
**Bloom:** Analyze
**ICFES:** Análisis de asíntotas verticales
**Context:** Problema de asíntotas en curso de cálculo

### Enunciado
Analiza las asíntotas verticales de f(x) = (x² - 9)/(x² - 4x + 3).

### Options
- [ ] A) Hay una asíntota vertical en x = 3
- [x] B) Hay una asíntota vertical en x = 1, y x = 3 es una discontinuidad removible <!-- feedback: Factorizando: (x+3)(x-3)/[(x-1)(x-3)]. En x = 3 hay 0/0 (discontinuidad removible, "hueco"). En x = 1 hay numerador = 12 ≠ 0, denominador = 0, así que hay asíntota vertical en x = 1. El signo de la asíntota depende de los límites laterales -->
- [ ] C) Hay dos asíntotas verticales en x = 1 y x = 3
- [ ] D) No hay asíntotas verticales

### Explicación Pedagógica
Para determinar asíntotas verticales en funciones racionales: los ceros del denominador que NO cancelan con ceros del numerador son asíntotas verticales. Los que SÍ cancelan son discontinuidades removibles (hoyos). Un error común es marcar todos los ceros del denominador como asíntotas.

---

## Question 18 (Variant Basic - Difficulty 9)
**ID:** `CO-MAT-11-P1-limites-002-v18`
**Bloom:** Analyze
**ICFES:** Aplicación del teorema del sandwich
**Context:** Demostración de límites en Universidad del Valle

### Enunciado
Si para todo x cerca de a se cumple que g(x) ≤ f(x) ≤ h(x) y lim_(x→a) g(x) = lim_(x→a) h(x) = L, ¿cuál es lim_(x→a) f(x)?

### Options
- [ ] A) No existe
- [x] B) L (por el Teorema del Sandwich o del Emparedado) <!-- feedback: Este es el Teorema del Sandwich (o del Emparedado, o de las tres funciones): si f está "atrapada" entre g y h, y g y h tienen el mismo límite L, entonces f también tiende a L. Es útil cuando no se puede evaluar f directamente -->
- [ ] C) El valor máximo entre L_g y L_h
- [ ] D) El valor mínimo entre L_g y L_h

### Explicación Pedagógica
El teorema del sandwich es útil para límites difíciles de calcular directamente. Un ejemplo clásico: lim_(x→0) x²sin(1/x) = 0, porque -x² ≤ x²sin(1/x) ≤ x² y ambos extremos tienden a 0.

---

## Question 19 (Variant Basic - Difficulty 9)
**ID:** `CO-MAT-11-P1-limites-002-v19`
**Bloom:** Analyze
**ICFES:** Límites con indeterminación 1^∞
**Context:** Problema de modelamiento con interés compuesto continuo

### Enunciado
Un banco ofrece un interés del 100% anual capitalizado continuamente. ¿Cuánto dinero habrá después de 1 año si se invierten $1,000,000 COP?

### Options
- [ ] A) $1,000,000 COP
- [ ] B) $2,000,000 COP
- [x] C) $e · 1,000,000 ≈ $2,718,280 COP <!-- feedback: El modelo de capitalización continua es A = P·e^(rt). Con P = 1,000,000, r = 1 (100%), t = 1 año: A = 1,000,000·e^1 ≈ $2,718,280 COP. Esto viene de lim_(n→∞) (1 + 1/n)^n = e -->
- [ ] D) $3,000,000 COP

### Explicación Pedagógica
La capitalización continua usa el límite fundamental lim_(n→∞) (1 + 1/n)^n = e. Cuando el número de períodos tiende a infinito, el monto converge a P·e^(rt). Un error común es confundir capitalización continua con simple (que sería $2,000,000).

---

## Question 20 (Variant Basic - Difficulty 10)
**ID:** `CO-MAT-11-P1-limites-002-v20`
**Bloom:** Analyze
**ICFES:** Análisis de continuidad de funciones especiales
**Context:** Problema de olimpiadas matemáticas Colombian

### Enunciado
Sea f(x) = { x²·sin(1/x) si x ≠ 0; 0 si x = 0 }. ¿Es f continua en x = 0?

### Options
- [ ] A) No es continua porque sin(1/x) no está definido en x = 0
- [ ] B) Es continua, pero no es derivable
- [x] C) Es continua y derivable en x = 0 <!-- feedback: Para continuidad: |f(x) - f(0)| = |x²sin(1/x)| ≤ x² → 0 cuando x→0, así que lim_(x→0) f(x) = 0 = f(0), es continua. Para derivabilidad: f'(0) = lim_(h→0) [h²sin(1/h)]/h = lim_(h→0) h·sin(1/h) = 0. Existe y es 0, así que es derivable. Ambas propiedades se demuestran usando el teorema del sandwich -->
- [ ] D) No es continua porque sin(1/x) oscila infinitamente cuando x→0

### Explicación Pedagógica
Este es un ejemplo fundamental: una función puede ser continua y derivable en un punto a pesar de que su derivada no tenga un límite directo. La clave es que x² "domina" a sin(1/x) porque |x²sin(1/x)| ≤ x² → 0. El error común es pensar que la oscilación infinita de sin(1/x) impide la continuidad.

---
