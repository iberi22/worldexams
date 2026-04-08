---
id: "CO-MAT-11-P2-aplicaciones-001-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "aplicaciones-derivada"
protocol_version: "5.1"
bundle_size: 20
alignment: "ICFES Saber 11 + MEN"
competencia_icfes: "Formulación y Ejecución"
afirmacion_icfes: "El estudiante usa derivadas para interpretar variación, optimizar magnitudes y modelar situaciones geométricas, físicas y económicas."
referente_men: "Análisis de cambio, extremos, optimización y modelación con funciones."
periodo: 2
bundle_index: 2
modern_context: true
distractor_profile: "misconception_based"
calibration:
  expected_success_rate: 0.45
  discrimination_index_target: ">= 0.28"
  simulated_responses: 100
rubric_baseline: "maximos_minimos, optimizacion_geometrica, analisis_marginal, razon_de_cambio, criterio_primera_derivada"
---

# Bundle Mastery: Aplicaciones de la Derivada

Este bundle trabaja el uso de la derivada para interpretar puntos críticos, resolver problemas de optimización y analizar tasas de cambio en contextos geométricos, físicos y económicos.

---

## Question 1 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.84

### Enunciado
¿Cuándo se dice que un número $c$ es un punto crítico de una función $f$?

### Options
- [ ] A) Cuando $f(c)=0$ exclusivamente. <!-- feedback: Incorrecto. Que la función valga cero solo indica una raíz, no un punto crítico. -->
- [x] B) Cuando $f'(c)=0$ o la derivada no existe en $c$, siempre que $c$ pertenezca al dominio. <!-- feedback: Correcto. Esa es la definición operativa de número crítico. -->
- [ ] C) Cuando $f''(c)=0$ siempre. <!-- feedback: Incorrecto. La segunda derivada puede ayudar a clasificar, pero no define por sí sola un punto crítico. -->
- [ ] D) Cuando la función cruza el eje y. <!-- feedback: Incorrecto. El corte con el eje y no determina extremos ni puntos críticos. -->

### Explicación Pedagógica
Los puntos críticos son candidatos a máximos o mínimos locales. Se buscan donde la pendiente se hace cero o donde la derivada falla.

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Comunicación y Representación
**Expected_Success:** 0.76

### Contexto
En un punto crítico de una función se sabe que $f''(c)<0$.

### Enunciado
¿Qué interpretación es correcta?

### Options
- [ ] A) La función tiene un mínimo local en $c$. <!-- feedback: Incorrecto. Una segunda derivada negativa indica concavidad hacia abajo, no un valle. -->
- [x] B) La función tiene un máximo local en $c$. <!-- feedback: Correcto. Si la curva es cóncava hacia abajo en el punto crítico, ese punto es un máximo local. -->
- [ ] C) La función no tiene extremos en $c$. <!-- feedback: Incorrecto. Precisamente la información dada permite clasificar el extremo. -->
- [ ] D) La función es lineal en $c$. <!-- feedback: Incorrecto. La linealidad no se deduce de la segunda derivada negativa. -->

### Explicación Pedagógica
El criterio de la segunda derivada relaciona la concavidad con la clasificación del punto crítico. Concavidad hacia abajo significa cima.

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.7

### Contexto
El costo total de producir $x$ cuadernos está dado por $C(x)=x^2-100x+5000$.

### Enunciado
¿Cuál es la función de costo marginal?

### Options
- [ ] A) $C'(x)=x-100$ <!-- feedback: Incorrecto. Al derivar $x^2$ se obtiene $2x$, no $x$. -->
- [x] B) $C'(x)=2x-100$ <!-- feedback: Correcto. El costo marginal es la derivada del costo total. -->
- [ ] C) $C'(x)=2x+100$ <!-- feedback: Incorrecto. El signo del término lineal cambia al derivar, pero aquí debe conservarse negativo. -->
- [ ] D) $C'(x)=x^2-100$ <!-- feedback: Incorrecto. Esa expresión no corresponde a la derivada del polinomio dado. -->

### Explicación Pedagógica
En análisis marginal, la derivada del costo total representa cuánto cambia el costo cuando la producción aumenta ligeramente.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.66

### Contexto
Para la función $f(x)=x^3-3x+2$, se tiene $f'(x)=3x^2-3$.

### Enunciado
¿Cuáles son los números críticos de $f$?

### Options
- [ ] A) $x=0$ y $x=2$ <!-- feedback: Incorrecto. Esos valores pueden aparecer en la función original, pero no satisfacen la ecuación de la derivada igual a cero. -->
- [x] B) $x=-1$ y $x=1$ <!-- feedback: Correcto. Resolver 3x^2-3=0 lleva a x^2=1 y por tanto x=±1. -->
- [ ] C) $x=-3$ y $x=3$ <!-- feedback: Incorrecto. Se confundieron coeficientes de la derivada con soluciones de la ecuación. -->
- [ ] D) Solo $x=1$ <!-- feedback: Incorrecto. Falta la segunda solución simétrica. -->

### Explicación Pedagógica
Para hallar números críticos se iguala la derivada a cero y se resuelve la ecuación resultante. Aquí aparecen dos valores.

---

## Question 5 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v5`
**Bloom:** Analyze
**ICFES:** Modelación
**Expected_Success:** 0.6

### Contexto
Con 200 metros de cerca se quiere construir un corral rectangular. Si los lados son $x$ e $y$, entonces $2x+2y=200$ y el área queda modelada por $A(x)=x(100-x)$.

### Enunciado
¿Qué dimensiones maximizan el área del corral?

### Options
- [ ] A) $x=100$ y $y=0$ <!-- feedback: Incorrecto. Esa elección produce área cero, no un máximo. -->
- [x] B) $x=50$ y $y=50$ <!-- feedback: Correcto. A'(x)=100-2x y al igualarla a cero se obtiene x=50, luego y=50. -->
- [ ] C) $x=25$ y $y=75$ <!-- feedback: Incorrecto. Son dimensiones válidas, pero no maximizan el área. -->
- [ ] D) $x=80$ y $y=20$ <!-- feedback: Incorrecto. Tampoco corresponde al punto crítico del modelo de área. -->

### Explicación Pedagógica
La optimización transforma el problema geométrico en una función de una sola variable. Luego se usa la derivada para encontrar el valor que hace máxima el área.

---

## Question 6 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Modelación
**Expected_Success:** 0.58

### Contexto
La posición de una partícula está dada por $s(t)=2t^3-24t+5$.

### Enunciado
¿En qué instante la partícula tiene velocidad instantánea igual a cero para $t>0$?

### Options
- [ ] A) $t=0$ <!-- feedback: Incorrecto. Ese valor no satisface la ecuación de la velocidad nula obtenida al derivar. -->
- [x] B) $t=2$ <!-- feedback: Correcto. s'(t)=6t^2-24 y al resolver s'(t)=0 se obtiene t^2=4, luego t=2 si se toma tiempo positivo. -->
- [ ] C) $t=4$ <!-- feedback: Incorrecto. Se confundió el resultado de t^2=4 con el valor final de t. -->
- [ ] D) Nunca se detiene. <!-- feedback: Incorrecto. El modelo sí presenta un instante con velocidad cero. -->

### Explicación Pedagógica
En física, la velocidad es la derivada de la posición. Para hallar cuándo se detiene una partícula, se iguala la velocidad a cero.

---

## Question 7 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.52

### Contexto
Para una función $f$, la derivada cambia de signo de positiva a negativa al pasar por $x=c$.

### Enunciado
¿Qué se concluye sobre $f$ en $x=c$?

### Options
- [x] A) Tiene un máximo local. <!-- feedback: Correcto. La función pasa de crecer a decrecer, lo cual caracteriza un máximo local. -->
- [ ] B) Tiene un mínimo local. <!-- feedback: Incorrecto. Un mínimo ocurre cuando la derivada cambia de negativa a positiva. -->
- [ ] C) Tiene una asíntota vertical. <!-- feedback: Incorrecto. El cambio de signo de la derivada no describe asíntotas verticales. -->
- [ ] D) Es constante en todo el intervalo. <!-- feedback: Incorrecto. La constancia requeriría derivada cero sostenida, no cambio de signo. -->

### Explicación Pedagógica
El criterio de la primera derivada clasifica extremos observando el paso entre crecimiento y decrecimiento.

---

## Question 8 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.5

### Contexto
Una caja sin tapa se construye cortando cuadrados de lado $x$ en las esquinas de una lámina cuadrada de 12 cm de lado. El volumen se modela por $V(x)=x(12-2x)^2$.

### Enunciado
¿Qué valor de $x$ produce el volumen máximo?

### Options
- [ ] A) $x=0$ <!-- feedback: Incorrecto. Si no se corta nada, no se forma caja y el volumen es cero. -->
- [ ] B) $x=6$ <!-- feedback: Incorrecto. Ese valor anula la base de la caja y deja volumen cero. -->
- [x] C) $x=2$ <!-- feedback: Correcto. Al derivar y analizar el dominio físico, x=2 es el punto crítico que maximiza el volumen. -->
- [ ] D) $x=3$ <!-- feedback: Incorrecto. Produce un volumen positivo, pero no el máximo del modelo. -->

### Explicación Pedagógica
En problemas de optimización geométrica hay que encontrar puntos críticos y luego descartar soluciones que no tengan sentido físico dentro del dominio.

---

## Question 9 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Modelación
**Expected_Success:** 0.48

### Contexto
El ingreso total de una empresa está dado por $R(x)=50x-0.5x^2$.

### Enunciado
¿Qué interpreta mejor la derivada $R'(x)$?

### Options
- [ ] A) El ingreso total acumulado por vender x unidades. <!-- feedback: Incorrecto. Eso corresponde a la función R(x), no a su derivada. -->
- [x] B) El ingreso marginal, es decir, el cambio aproximado del ingreso al vender una unidad adicional cerca de x. <!-- feedback: Correcto. La derivada del ingreso total se interpreta como ingreso marginal. -->
- [ ] C) La ganancia fija de la empresa. <!-- feedback: Incorrecto. La derivada no representa un valor fijo ni un costo fijo. -->
- [ ] D) El número de trabajadores de la empresa. <!-- feedback: Incorrecto. Ese dato no aparece en el modelo. -->

### Explicación Pedagógica
La derivada en economía permite pasar de cantidades totales a tasas marginales, útiles para tomar decisiones de producción.

---

## Question 10 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.46

### Contexto
La función de ingresos es $R(x)=50x-0.5x^2$.

### Enunciado
¿Cuántas unidades deben venderse para que el ingreso marginal sea cero?

### Options
- [ ] A) $25$ <!-- feedback: Incorrecto. Ese valor no anula la derivada del ingreso. -->
- [x] B) $50$ <!-- feedback: Correcto. R'(x)=50-x y al resolver R'(x)=0 se obtiene x=50. -->
- [ ] C) $75$ <!-- feedback: Incorrecto. Surge de sustituir sin derivar o de un despeje equivocado. -->
- [ ] D) $100$ <!-- feedback: Incorrecto. Ese valor hace negativo el ingreso marginal, pero no lo anula. -->

### Explicación Pedagógica
Para hallar cuándo una magnitud marginal vale cero se deriva el modelo total y se resuelve la ecuación correspondiente.

---

## Question 11 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.4

### Contexto
Un estudiante afirma: Si $f'(c)=0$, entonces en $c$ siempre hay un máximo o un mínimo.

### Enunciado
¿Cómo debe evaluarse esa afirmación?

### Options
- [ ] A) Es verdadera porque toda derivada cero produce un extremo. <!-- feedback: Incorrecto. Puede haber puntos críticos que no sean extremos, como algunos puntos de inflexión horizontales. -->
- [x] B) Es falsa porque derivada cero solo indica un candidato a extremo. <!-- feedback: Correcto. Hace falta analizar el cambio de signo de la derivada o usar otra información para clasificar. -->
- [ ] C) Es falsa porque una derivada nunca puede ser cero en una función real. <!-- feedback: Incorrecto. Muchas funciones tienen derivada cero en algunos puntos. -->
- [ ] D) Es verdadera solo en funciones cuadráticas. <!-- feedback: Incorrecto. La validez o invalidez no depende de que la función sea cuadrática. -->

### Explicación Pedagógica
La igualdad $f'(c)=0$ identifica puntos críticos, pero no basta para decidir si hay máximo, mínimo o ningún extremo.

---

## Question 12 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v12`
**Bloom:** Apply
**ICFES:** Modelación
**Expected_Success:** 0.38

### Contexto
Se quiere construir un rectángulo adosado a un muro usando 40 metros de cerca, de modo que solo se cercan tres lados. Si los lados perpendiculares al muro miden $x$, el lado paralelo mide $40-2x$.

### Enunciado
¿Cuál es el área máxima posible?

### Options
- [ ] A) $100 \text{ m}^2$ <!-- feedback: Incorrecto. Ese valor no corresponde al máximo del modelo de área. -->
- [ ] B) $150 \text{ m}^2$ <!-- feedback: Incorrecto. Puede aparecer por sustitución errónea en el punto crítico. -->
- [x] C) $200 \text{ m}^2$ <!-- feedback: Correcto. A(x)=x(40-2x), el máximo ocurre en x=10 y allí el área es 10·20=200. -->
- [ ] D) $400 \text{ m}^2$ <!-- feedback: Incorrecto. Ese valor excede lo posible con la restricción dada. -->

### Explicación Pedagógica
La optimización puede pedir no solo la variable que maximiza, sino también el valor máximo alcanzado por la magnitud estudiada.

---

## Question 13 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación
**Expected_Success:** 0.36

### Contexto
La función de beneficio de una empresa es $B(x)=-x^2+40x-300$.

### Enunciado
¿Qué indica el signo de $B'(x)$ cuando $x<20$?

### Options
- [ ] A) Que el beneficio está disminuyendo antes de x=20. <!-- feedback: Incorrecto. Antes del vértice, la derivada es positiva y el beneficio crece. -->
- [x] B) Que el beneficio está aumentando antes de x=20. <!-- feedback: Correcto. B'(x)=-2x+40 es positiva cuando x<20. -->
- [ ] C) Que el beneficio es siempre nulo antes de x=20. <!-- feedback: Incorrecto. El valor de la función no se deduce así del signo de la derivada. -->
- [ ] D) Que el beneficio es constante antes de x=20. <!-- feedback: Incorrecto. Si la derivada es positiva, la función no es constante. -->

### Explicación Pedagógica
El signo de la derivada informa sobre el sentido de variación de la función. Derivada positiva significa crecimiento.

---

## Question 14 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v14`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.34

### Contexto
El radio de un círculo aumenta a razón de 3 cm/s.

### Enunciado
Si $A=\pi r^2$, ¿cuál es la razón de cambio del área cuando $r=5$ cm?

### Options
- [ ] A) $15\pi$ cm²/s <!-- feedback: Incorrecto. Se multiplicó solo una vez por el radio y se omitió un factor de la derivación. -->
- [x] B) $30\pi$ cm²/s <!-- feedback: Correcto. dA/dt = 2\pi r·dr/dt = 2\pi(5)(3)=30\pi. -->
- [ ] C) $75\pi$ cm²/s <!-- feedback: Incorrecto. Ese valor surge al confundir área con razón de cambio del área. -->
- [ ] D) $10\pi$ cm²/s <!-- feedback: Incorrecto. Falta incorporar correctamente la razón de cambio del radio. -->

### Explicación Pedagógica
En razones relacionadas se deriva respecto al tiempo y luego se sustituyen los valores conocidos del instante.

---

## Question 15 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Modelación
**Expected_Success:** 0.32

### Contexto
Una empresa modela su beneficio con una función que tiene un punto crítico en $x=120$ y se sabe que $B''(120)>0$.

### Enunciado
¿Qué decisión es más consistente con esta información?

### Options
- [ ] A) Producir exactamente 120 unidades porque allí el beneficio es máximo. <!-- feedback: Incorrecto. La segunda derivada positiva indica mínimo local, no máximo. -->
- [x] B) Revisar el entorno de 120 unidades porque allí el beneficio tiene un mínimo local. <!-- feedback: Correcto. Si el punto crítico es un mínimo local, conviene analizar otras cantidades de producción. -->
- [ ] C) Concluir que el beneficio es constante para toda producción. <!-- feedback: Incorrecto. Un mínimo local no implica constancia global. -->
- [ ] D) Afirmar que en 120 unidades la función no es derivable. <!-- feedback: Incorrecto. Se está usando precisamente información sobre derivadas en ese punto. -->

### Explicación Pedagógica
La segunda derivada positiva en un punto crítico indica concavidad hacia arriba, es decir, un valle local.

---

## Question 16 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.3

### Contexto
Sea $f(x)=x^3$. Entonces $f'(x)=3x^2$.

### Enunciado
¿Por qué $x=0$ no es un máximo ni un mínimo local, aunque sea un punto crítico?

### Options
- [ ] A) Porque la función no está definida en x=0. <!-- feedback: Incorrecto. La función sí está definida en ese punto. -->
- [ ] B) Porque la derivada en x=0 no existe. <!-- feedback: Incorrecto. La derivada existe y vale cero. -->
- [x] C) Porque la derivada no cambia de signo al pasar por x=0. <!-- feedback: Correcto. 3x^2 es no negativa a ambos lados, así que no hay paso de crecimiento a decrecimiento ni al revés. -->
- [ ] D) Porque x=0 es una raíz de la función. <!-- feedback: Incorrecto. Ser raíz no impide ni garantiza extremos. -->

### Explicación Pedagógica
No todo punto crítico es extremo. En algunos casos la derivada se anula pero no cambia el comportamiento creciente/decreciente de la función.

---

## Question 17 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Modelación
**Expected_Success:** 0.27

### Contexto
El ingreso total de una empresa es $R(x)=100x-x^2$ y el costo total es $C(x)=20x+100$.

### Enunciado
¿Para qué valor de $x$ se maximiza la ganancia $G(x)=R(x)-C(x)$?

### Options
- [ ] A) $20$ <!-- feedback: Incorrecto. Ese valor no anula la derivada de la ganancia. -->
- [x] B) $40$ <!-- feedback: Correcto. G(x)=80x-x^2-100, entonces G'(x)=80-2x y al igualar a cero se obtiene x=40. -->
- [ ] C) $50$ <!-- feedback: Incorrecto. Ese valor maximiza el ingreso, pero no necesariamente la ganancia porque no incorpora el costo. -->
- [ ] D) $80$ <!-- feedback: Incorrecto. Ese valor corresponde al coeficiente lineal, no al punto crítico. -->

### Explicación Pedagógica
En optimización económica se debe construir primero la función objetivo correcta. Aquí la ganancia no es el ingreso, sino ingreso menos costo.

---

## Question 18 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v18`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación
**Expected_Success:** 0.24

### Contexto
Una función presenta un punto crítico en $x=c$. Además:
- $f'(x)<0$ si $x<c$
- $f'(x)>0$ si $x>c$

### Enunciado
¿Cuál es la clasificación correcta del punto crítico?

### Options
- [ ] A) Máximo local. <!-- feedback: Incorrecto. Un máximo tendría cambio de signo de positivo a negativo. -->
- [x] B) Mínimo local. <!-- feedback: Correcto. La función pasa de decrecer a crecer al atravesar x=c. -->
- [ ] C) Punto de inflexión horizontal sin extremo. <!-- feedback: Incorrecto. El cambio de signo sí describe un extremo local. -->
- [ ] D) Asíntota oblicua. <!-- feedback: Incorrecto. La información dada corresponde a un criterio de extremos, no a asíntotas. -->

### Explicación Pedagógica
El criterio de la primera derivada permite reconocer un mínimo local cuando la función pasa de decrecer a crecer.

---

## Question 19 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Modelación
**Expected_Success:** 0.2

### Contexto
Una escalera de 13 m está apoyada contra una pared. La base se aleja del muro a razón de 5 m/s. Si $x$ es la distancia de la base al muro y $y$ la altura en la pared, entonces $x^2+y^2=169$.

### Enunciado
Cuando la base está a 12 m del muro, ¿a qué razón cambia la altura?

### Options
- [ ] A) $-\frac{60}{13}$ m/s <!-- feedback: Incorrecto. Ese resultado usa una sustitución inconsistente con el triángulo de lados 5, 12 y 13. -->
- [ ] B) $-20$ m/s <!-- feedback: Incorrecto. Ese valor no sale del reemplazo correcto de x=12, y=5 y dx/dt=5 en la ecuación derivada. -->
- [x] C) $-12$ m/s <!-- feedback: Correcto. Derivando implícitamente y sustituyendo x=12, y=5, dx/dt=5 se obtiene dy/dt = -12 m/s. -->
- [ ] D) $12$ m/s <!-- feedback: Incorrecto. La altura está disminuyendo, por lo que la razón debe ser negativa. -->

### Explicación Pedagógica
En razones relacionadas es esencial derivar implícitamente, identificar la geometría del instante y cuidar el signo físico del cambio.

---

## Question 20 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v20`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.18

### Contexto
Se modela el área de un rectángulo con perímetro fijo mediante una función cuadrática cóncava hacia abajo.

### Enunciado
¿Por qué basta encontrar un único punto crítico interior para asegurar que allí se alcanza el área máxima?

### Options
- [ ] A) Porque toda función cuadrática tiene dos máximos. <!-- feedback: Incorrecto. Una cuadrática cóncava hacia abajo tiene un solo vértice, no dos máximos. -->
- [x] B) Porque la concavidad hacia abajo garantiza que el punto crítico corresponde al vértice máximo de la parábola. <!-- feedback: Correcto. En una cuadrática cóncava hacia abajo, el único punto crítico interior es el máximo. -->
- [ ] C) Porque el perímetro fijo hace que el área sea lineal. <!-- feedback: Incorrecto. El modelo de área resultante es cuadrático, no lineal. -->
- [ ] D) Porque el valor de la derivada nunca puede cambiar de signo. <!-- feedback: Incorrecto. Precisamente el cambio de signo alrededor del punto crítico ayuda a justificar el máximo. -->

### Explicación Pedagógica
La forma global del modelo también importa. Si la función objetivo es una parábola abierta hacia abajo, su vértice representa el máximo.
