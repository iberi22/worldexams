---
id: "CO-MAT-11-P1-continuidad-003-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "continuidad"
periodo: 1
protocol_version: "5.1"
bundle_index: 3
bundle_size: 20
alignment: "ICFES Saber 11 + MEN"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: 0.47
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "continuidad_local, limites_laterales, modelacion_funcional"

# REVIEW METADATA
review:
  agent: "curation-agent"
  timestamp: "2026-04-04T02:17:13.433Z"
  quality_score: 100
  decision: "APPROVE"
  errors: []
  warnings: []
---

# Bundle Matematicas G11 - Periodo 1: Continuidad y Analisis Local

Este bundle trabaja continuidad, límites laterales, funciones a trozos e interpretación de discontinuidades en contextos de modelación.

---

## Question 1 (Basic - Difficulty 3)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v1`
**Bloom:** Comprender
**ICFES:** Comunicación y representación
**Expected_Success:** 0.70

### Enunciado
¿Cuál condición es indispensable para que una función sea continua en $x=a$?

### Options
- [ ] A) Que $f(a)$ sea negativa. <!-- feedback: El signo del valor no determina continuidad. -->
- [x] B) Que exista $f(a)$ y coincida con el límite cuando $x$ tiende a $a$. <!-- feedback: Correcto. Esa es la condición central de continuidad. -->
- [ ] C) Que la gráfica sea creciente en todo su dominio. <!-- feedback: Una función puede ser continua sin ser creciente. -->
- [ ] D) Que el dominio contenga solo números enteros. <!-- feedback: La continuidad no exige ese tipo de dominio. -->

### Explicación Pedagógica
La continuidad en un punto requiere valor definido, límite existente y coincidencia entre ambos.

---

## Question 2 (Basic - Difficulty 3)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v2`
**Bloom:** Comprender
**ICFES:** Comunicación y representación
**Expected_Success:** 0.68

### Enunciado
Si una función racional tiene denominador cero en $x=4$, entonces en ese punto

### Options
- [ ] A) necesariamente es creciente. <!-- feedback: El crecimiento no se deduce de esa información. -->
- [ ] B) necesariamente toma el valor 0. <!-- feedback: De hecho, allí suele no estar definida. -->
- [x] C) puede presentarse una discontinuidad porque la expresión no está definida. <!-- feedback: Correcto. La división por cero rompe el dominio. -->
- [ ] D) siempre existe una discontinuidad evitable. <!-- feedback: A veces puede ser evitable, pero no siempre. -->

### Explicación Pedagógica
En funciones racionales, las raíces del denominador son puntos críticos para el dominio y la continuidad.

---

## Question 3 (Basic - Difficulty 4)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v3`
**Bloom:** Aplicar
**ICFES:** Formulación y ejecución
**Expected_Success:** 0.64

### Enunciado
Sea
$$
f(x)=
\begin{cases}
2x+1 & \text{si } x<3 \\
7 & \text{si } x=3 \\
x+4 & \text{si } x>3
\end{cases}
$$
¿Es continua en $x=3$?

### Options
- [x] A) Sí, porque ambos límites laterales valen 7 y coinciden con $f(3)$. <!-- feedback: Correcto. Izquierda y derecha llegan al mismo valor. -->
- [ ] B) No, porque se usan dos fórmulas distintas. <!-- feedback: Diferentes fórmulas pueden unirse de manera continua. -->
- [ ] C) No, porque $f(3)$ debería ser 3. <!-- feedback: Ese valor no sigue de la definición. -->
- [ ] D) No se puede decidir sin una gráfica. <!-- feedback: La definición algebraica ya da la información necesaria. -->

### Explicación Pedagógica
La continuidad se verifica comparando valor de la función y límites laterales en el punto.

---

## Question 4 (Basic - Difficulty 4)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v4`
**Bloom:** Aplicar
**ICFES:** Comunicación y representación
**Expected_Success:** 0.61

### Enunciado
Si los límites laterales en $x=a$ existen pero son diferentes, la discontinuidad se clasifica como

### Options
- [ ] A) evitable <!-- feedback: La discontinuidad evitable requiere que el límite exista y sea único. -->
- [x] B) de salto <!-- feedback: Correcto. Los dos lados llegan a valores distintos. -->
- [ ] C) periódica <!-- feedback: La periodicidad no describe ese comportamiento. -->
- [ ] D) derivable <!-- feedback: La derivabilidad es otra propiedad. -->

### Explicación Pedagógica
Cuando izquierda y derecha no coinciden, la gráfica presenta un salto.

---

## Question 5 (Intermediate - Difficulty 5)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v5`
**Bloom:** Analizar
**ICFES:** Razonamiento y argumentación
**Expected_Success:** 0.57

### Enunciado
Una función tiene un "hueco" en $x=2$, pero el límite en ese punto existe y vale 5. ¿Qué debe hacerse para volverla continua allí?

### Options
- [ ] A) Cambiar todos los valores de la función por 5. <!-- feedback: Solo importa el punto crítico, no toda la función. -->
- [ ] B) Hacer que el límite deje de existir. <!-- feedback: Eso empeoraría el comportamiento. -->
- [x] C) Definir o redefinir $f(2)=5$. <!-- feedback: Correcto. Así se corrige una discontinuidad evitable. -->
- [ ] D) Multiplicar la función por $x-2$. <!-- feedback: Esa operación no garantiza continuidad en ese punto. -->

### Explicación Pedagógica
Si el límite existe, basta ajustar el valor del punto para "rellenar" el hueco.

---

## Question 6 (Intermediate - Difficulty 5)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v6`
**Bloom:** Analizar
**ICFES:** Comunicación y representación
**Expected_Success:** 0.55

### Enunciado
La función $f(x)=|x|$ es continua en $x=0$ porque

### Options
- [ ] A) sus límites laterales son infinito e infinito. <!-- feedback: Ese no es el comportamiento de la función. -->
- [x] B) sus límites laterales coinciden en 0 y ese valor es también $f(0)$. <!-- feedback: Correcto. Cumple la definición formal. -->
- [ ] C) no tiene valor absoluto en los números negativos. <!-- feedback: El valor absoluto sí está definido allí. -->
- [ ] D) es derivable en todo punto del plano. <!-- feedback: En $x=0$ no es derivable, aunque sí es continua. -->

### Explicación Pedagógica
Continuidad y derivabilidad no son equivalentes: una función puede ser continua sin ser derivable.

---

## Question 7 (Intermediate - Difficulty 6)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v7`
**Bloom:** Analizar
**ICFES:** Formulación y ejecución
**Expected_Success:** 0.50

### Enunciado
¿Para qué valor de $k$ es continua en $x=1$ la función
$$
f(x)=
\begin{cases}
kx+2 & \text{si } x<1 \\
5 & \text{si } x=1 \\
3x+2 & \text{si } x>1
\end{cases}
$$

### Options
- [ ] A) 1 <!-- feedback: No iguala el límite lateral izquierdo al valor del punto. -->
- [x] B) 3 <!-- feedback: Correcto. Con $k=3$, ambos lados valen 5 en $x=1$. -->
- [ ] C) 5 <!-- feedback: Genera un valor lateral izquierdo distinto de 5. -->
- [ ] D) 7 <!-- feedback: No satisface la condición de continuidad. -->

### Explicación Pedagógica
En funciones a trozos, el parámetro se determina haciendo coincidir los valores de ambos lados con el punto.

---

## Question 8 (Intermediate - Difficulty 6)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v8`
**Bloom:** Aplicar
**ICFES:** Modelación
**Expected_Success:** 0.48

### Contexto
Una empresa cobra por paquetes así: hasta 1 kg cobra una tarifa fija y, al superar 1 kg, aplica otra expresión lineal.

### Enunciado
¿Qué condición debe cumplir el modelo para no generar un salto artificial justo en 1 kg?

### Options
- [ ] A) Que la segunda tarifa sea siempre más alta que la primera. <!-- feedback: Puede ser más alta y aun así tener continuidad o no. -->
- [ ] B) Que el dominio se reduzca a pesos enteros. <!-- feedback: Eso no resuelve el posible salto. -->
- [x] C) Que el costo calculado por ambos tramos coincida exactamente en 1 kg. <!-- feedback: Correcto. La continuidad evita un cambio brusco injustificado. -->
- [ ] D) Que ambas expresiones tengan distinta pendiente. <!-- feedback: Las pendientes pueden ser iguales o distintas; el punto clave es el empalme. -->

### Explicación Pedagógica
La continuidad en modelos reales evita cambios abruptos no justificados en una frontera.

---

## Question 9 (Intermediate - Difficulty 6)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v9`
**Bloom:** Analizar
**ICFES:** Razonamiento y argumentación
**Expected_Success:** 0.46

### Enunciado
Si una función es continua en el intervalo cerrado $[a,b]$ y además $f(a)$ y $f(b)$ tienen signos opuestos, entonces puede afirmarse que

### Options
- [ ] A) la función es necesariamente lineal. <!-- feedback: El teorema no exige linealidad. -->
- [ ] B) la función alcanza su valor máximo en el punto medio. <!-- feedback: Eso no se deduce de las hipótesis. -->
- [x] C) existe al menos un punto $c$ entre $a$ y $b$ donde $f(c)=0$. <!-- feedback: Correcto. Esa es la conclusión del teorema de Bolzano. -->
- [ ] D) la función es derivable en todo el intervalo. <!-- feedback: La continuidad no garantiza derivabilidad. -->

### Explicación Pedagógica
Bolzano conecta continuidad y cambio de signo con existencia de una raíz intermedia.

---

## Question 10 (Intermediate - Difficulty 6)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v10`
**Bloom:** Analizar
**ICFES:** Comunicación y representación
**Expected_Success:** 0.44

### Enunciado
Una gráfica se acerca al mismo valor por izquierda y derecha en $x=2$, pero el punto dibujado en $x=2$ está en otra altura. Esto representa

### Options
- [ ] A) una discontinuidad de salto. <!-- feedback: En el salto, los límites laterales difieren. -->
- [x] B) una discontinuidad evitable. <!-- feedback: Correcto. El límite existe, pero el valor del punto no coincide. -->
- [ ] C) una asíntota horizontal. <!-- feedback: Ese concepto describe comportamiento al infinito. -->
- [ ] D) una periodicidad escondida. <!-- feedback: La periodicidad no describe este caso. -->

### Explicación Pedagógica
Si el límite existe y el punto falla, la discontinuidad puede corregirse redefiniendo el valor.

---

## Question 11 (Advanced - Difficulty 7)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v11`
**Bloom:** Evaluar
**ICFES:** Razonamiento y argumentación
**Expected_Success:** 0.40

### Enunciado
¿Por qué la función $f(x)=1/x$ no es continua en $x=0$?

### Options
- [ ] A) Porque su numerador es constante. <!-- feedback: El numerador no explica la ruptura. -->
- [x] B) Porque no está definida en 0 y los valores crecen sin límite al acercarse a ese punto. <!-- feedback: Correcto. Falla el dominio y no hay límite finito. -->
- [ ] C) Porque cruza el eje x en dos lugares. <!-- feedback: De hecho no cruza el eje x. -->
- [ ] D) Porque es decreciente en números positivos. <!-- feedback: El comportamiento monótono no explica la discontinuidad en 0. -->

### Explicación Pedagógica
La continuidad falla cuando no existe valor del punto y el límite tampoco es finito.

---

## Question 12 (Advanced - Difficulty 7)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v12`
**Bloom:** Evaluar
**ICFES:** Formulación y ejecución
**Expected_Success:** 0.38

### Enunciado
Si
$$
f(x)=
\begin{cases}
x^2-1 & \text{si } x<2 \\
m & \text{si } x=2 \\
3x-3 & \text{si } x>2
\end{cases}
$$
¿puede elegirse algún valor de $m$ para hacer continua la función en $x=2$?

### Options
- [ ] A) Sí, con $m=1$. <!-- feedback: Los límites laterales no coinciden en 1. -->
- [ ] B) Sí, con $m=3$. <!-- feedback: Cambiar solo el punto no arregla límites laterales distintos. -->
- [ ] C) Sí, con $m=4$. <!-- feedback: El problema no está solo en el valor del punto. -->
- [x] D) Sí, con $m=3$, porque ambos límites laterales coinciden en 3. <!-- feedback: Correcto. Si el límite común es 3, el valor del punto debe ser 3. -->

### Explicación Pedagógica
Para poder corregir la continuidad con un solo valor, primero deben coincidir los dos límites laterales.

---

## Question 13 (Advanced - Difficulty 7)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v13`
**Bloom:** Analizar
**ICFES:** Formulación y ejecución
**Expected_Success:** 0.37

### Enunciado
En la pregunta anterior, los límites laterales en $x=2$ son

### Options
- [ ] A) 1 y 1 <!-- feedback: Al reemplazar 2 no se obtiene ese valor. -->
- [ ] B) 3 y 5 <!-- feedback: El segundo valor está mal calculado. -->
- [x] C) 3 y 3 <!-- feedback: Correcto. Por izquierda $2^2-1=3$ y por derecha $3(2)-3=3$. -->
- [ ] D) 4 y 4 <!-- feedback: Ese valor no corresponde a ninguna de las expresiones. -->

### Explicación Pedagógica
Antes de decidir continuidad conviene calcular explícitamente ambos límites laterales.

---

## Question 14 (Advanced - Difficulty 8)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v14`
**Bloom:** Evaluar
**ICFES:** Comunicación y representación
**Expected_Success:** 0.34

### Enunciado
Si en la pregunta 12 los límites laterales coinciden en 3, entonces la afirmación correcta es

### Options
- [ ] A) la función nunca puede ser continua en 2. <!-- feedback: Sí puede serlo ajustando el valor del punto. -->
- [x] B) basta elegir $m=3$ para garantizar continuidad en 2. <!-- feedback: Correcto. El valor del punto debe igualar el límite común. -->
- [ ] C) hay que hacer $m=2$ porque ese es el valor de x. <!-- feedback: Se confunde entrada con salida. -->
- [ ] D) cualquier valor de m sirve si la gráfica es creciente. <!-- feedback: El crecimiento no reemplaza la condición puntual. -->

### Explicación Pedagógica
Cuando los límites laterales coinciden, el parámetro correcto es ese mismo valor común.

---

## Question 15 (Advanced - Difficulty 8)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v15`
**Bloom:** Evaluar
**ICFES:** Modelación
**Expected_Success:** 0.32

### Contexto
La temperatura de un equipo se modela con una función continua del tiempo durante una hora de operación.

### Enunciado
Si al inicio estaba en 40°C y al final en 70°C, ¿qué asegura el teorema de los valores intermedios?

### Options
- [ ] A) Que la temperatura subió exactamente al mismo ritmo todo el tiempo. <!-- feedback: La continuidad no implica tasa constante. -->
- [ ] B) Que el equipo tuvo temperatura máxima en 55°C. <!-- feedback: El teorema no afirma eso. -->
- [x] C) Que en algún instante alcanzó cualquier valor intermedio entre 40°C y 70°C, como 55°C. <!-- feedback: Correcto. Esa es la idea central del teorema. -->
- [ ] D) Que la temperatura fue lineal porque no hubo saltos. <!-- feedback: Continuidad no equivale a linealidad. -->

### Explicación Pedagógica
La continuidad garantiza que no se "saltan" valores intermedios en el recorrido.

---

## Question 16 (Advanced - Difficulty 8)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v16`
**Bloom:** Evaluar
**ICFES:** Razonamiento y argumentación
**Expected_Success:** 0.30

### Enunciado
¿Cuál error conceptual comete quien afirma que toda función continua es derivable?

### Options
- [ ] A) Confunde dominio con rango. <!-- feedback: Ese no es el problema aquí. -->
- [x] B) Supone que una gráfica sin saltos no puede tener puntas o cambios bruscos de dirección. <!-- feedback: Correcto. Ejemplos como $|x|$ muestran continuidad sin derivabilidad. -->
- [ ] C) Cree que todas las funciones son racionales. <!-- feedback: Esa idea no es necesaria para cometer este error. -->
- [ ] D) Piensa que un límite siempre es infinito. <!-- feedback: No es la confusión específica del enunciado. -->

### Explicación Pedagógica
La derivabilidad es más exigente que la continuidad.

---

## Question 17 (Mastery - Difficulty 9)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v17`
**Bloom:** Evaluar
**ICFES:** Modelación
**Expected_Success:** 0.27

### Contexto
Una aplicación calcula el costo de un servicio con una función por tramos. Al pasar de 59 a 60 minutos, el valor sube abruptamente sin razón contractual.

### Enunciado
Matemáticamente, la crítica más fuerte al modelo es que

### Options
- [ ] A) usa números reales en vez de enteros. <!-- feedback: El uso de reales no es el problema central. -->
- [ ] B) debería ser cuadrático para ser más moderno. <!-- feedback: La forma cuadrática no resuelve por sí misma el problema. -->
- [x] C) introduce una discontinuidad no justificada en el punto de cambio de tarifa. <!-- feedback: Correcto. El salto arbitrario hace inconsistente el modelo. -->
- [ ] D) debería tener derivada negativa en todo su dominio. <!-- feedback: Eso no sigue del contexto. -->

### Explicación Pedagógica
En contextos reales, una discontinuidad injustificada puede volver el modelo poco razonable.

---

## Question 18 (Mastery - Difficulty 9)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v18`
**Bloom:** Evaluar
**ICFES:** Formulación y ejecución
**Expected_Success:** 0.25

### Enunciado
Si una función es continua en $[1,4]$, toma valor -2 en $x=1$ y valor 5 en $x=4$, entonces respecto a la ecuación $f(x)=1$ se puede asegurar que

### Options
- [ ] A) no tiene solución porque 1 no es extremo del intervalo. <!-- feedback: El teorema de valores intermedios contradice eso. -->
- [x] B) tiene al menos una solución en $(1,4)$. <!-- feedback: Correcto. El valor 1 está entre -2 y 5. -->
- [ ] C) tiene exactamente una solución. <!-- feedback: Puede tener una o varias; no se puede asegurar exactitud. -->
- [ ] D) solo tiene solución si la función es lineal. <!-- feedback: La linealidad no es requisito. -->

### Explicación Pedagógica
El teorema de valores intermedios asegura existencia, no unicidad.

---

## Question 19 (Mastery - Difficulty 10)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v19`
**Bloom:** Crear
**ICFES:** Razonamiento y argumentación
**Expected_Success:** 0.23

### Enunciado
¿Cuál estrategia permite decidir si una discontinuidad en una función a trozos es evitable o de salto?

### Options
- [ ] A) Revisar solo el valor que toma la función en el punto. <!-- feedback: Eso no basta sin analizar los límites. -->
- [ ] B) Mirar si la gráfica sube o baja antes del punto. <!-- feedback: La monotonicidad no clasifica la discontinuidad. -->
- [x] C) Comparar los límites laterales y luego verificar si coinciden o no con el valor de la función. <!-- feedback: Correcto. Esa secuencia distingue los casos principales. -->
- [ ] D) Derivar cada tramo y comparar las pendientes. <!-- feedback: La clasificación básica puede hacerse sin derivadas. -->

### Explicación Pedagógica
Primero se estudian límites laterales; después se contrasta con el valor del punto.

---

## Question 20 (Mastery - Difficulty 10)
**ID:** `CO-MAT-11-P1-continuidad-003-MASTERY-v20`
**Bloom:** Evaluar
**ICFES:** Modelación
**Expected_Success:** 0.21

### Contexto
Un sensor registra la altura de agua en un tanque. El ingeniero afirma que el nivel del agua siguió una función continua durante el llenado.

### Enunciado
Si a las 2:00 p.m. marcaba 120 L y a las 2:30 p.m. marcaba 180 L, ¿qué conclusión es matemáticamente válida?

### Options
- [ ] A) El tanque necesariamente se llenó a razón constante de 2 L por minuto. <!-- feedback: La continuidad no impone tasa constante. -->
- [ ] B) El sensor no pudo marcar nunca 150 L porque ese valor no es extremo. <!-- feedback: La continuidad contradice esa afirmación. -->
- [x] C) En algún instante entre 2:00 y 2:30 p.m. el nivel fue exactamente 150 L. <!-- feedback: Correcto. Es una aplicación directa del teorema de valores intermedios. -->
- [ ] D) El tanque alcanzó un máximo local precisamente en 150 L. <!-- feedback: La continuidad no permite afirmar eso. -->

### Explicación Pedagógica
La continuidad permite asegurar el paso por valores intermedios del proceso registrado.
