---
id: "CO-MAT-11-P3-calculo-derivadas-001-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "calculo-derivadas"
protocol_version: "5.1"
bundle_size: 20
alignment: "ICFES Saber 11 + MEN"
competencia_icfes: "Formulación y Ejecución"
afirmacion_icfes: "El estudiante interpreta límites y derivadas para describir cambio, justificar procedimientos y resolver problemas de optimización."
referente_men: "Análisis de variación, razones de cambio, interpretación gráfica y uso de derivadas en situaciones funcionales."
periodo: 3
bundle_index: 1
modern_context: true
distractor_profile: "misconception_based"
calibration:
  expected_success_rate: 0.45
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "limites, razon_de_cambio_promedio, derivada_como_limite, reglas_de_derivacion, optimizacion"
---

# Bundle Mastery: Cálculo y Derivadas

Este bundle trabaja límites, razones de cambio promedio e instantánea, derivación básica, interpretación gráfica y optimización elemental en contextos algebraicos y aplicados.

---

## Question 1 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comunicación y Representación
**Expected_Success:** 0.84

### Enunciado
¿Qué representa geométricamente la derivada de una función en un punto?

### Options
- [ ] A) El área acumulada bajo la curva. <!-- feedback: Incorrecto. Esa interpretación se asocia a la integral, no a la derivada. -->
- [x] B) La pendiente de la recta tangente en ese punto. <!-- feedback: Correcto. La derivada mide la inclinación local de la gráfica. -->
- [ ] C) El valor máximo de la función. <!-- feedback: Incorrecto. La derivada no es, por sí sola, un extremo. -->
- [ ] D) La distancia al origen. <!-- feedback: Incorrecto. Esa magnitud no define la derivada. -->

### Explicación Pedagógica
La derivada conecta el cambio local de una función con la pendiente de la tangente.

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Comunicación y Representación
**Expected_Success:** 0.8

### Enunciado
Si una función tiene tangente horizontal en un punto interior, ¿qué valor suele tener la derivada en ese punto?

### Options
- [ ] A) 1 <!-- feedback: Incorrecto. Una tangente horizontal no tiene pendiente 1. -->
- [x] B) 0 <!-- feedback: Correcto. Una tangente horizontal tiene pendiente cero. -->
- [ ] C) Infinita <!-- feedback: Incorrecto. Una pendiente infinita correspondería a una tangente vertical. -->
- [ ] D) Igual al valor de la función. <!-- feedback: Incorrecto. La derivada y la función cumplen roles distintos. -->

### Explicación Pedagógica
La horizontalidad de la tangente es un indicador clásico de pendiente nula.

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.74

### Contexto
La función es $f(x)=x^2$.

### Enunciado
¿Cuál es la razón de cambio promedio de $f$ entre $x=1$ y $x=3$?

### Options
- [ ] A) 2 <!-- feedback: Incorrecto. Ese valor solo toma la diferencia en x. -->
- [ ] B) 3 <!-- feedback: Incorrecto. El cambio en la función no se procesó completamente. -->
- [x] C) 4 <!-- feedback: Correcto. $(9-1)/(3-1)=8/2=4$. -->
- [ ] D) 8 <!-- feedback: Incorrecto. Ese es el cambio en y, pero falta dividir entre el cambio en x. -->

### Explicación Pedagógica
La razón de cambio promedio compara la variación de salida con la variación de entrada.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Comunicación y Representación
**Expected_Success:** 0.7

### Enunciado
En la expresión $f'(x)=\\lim_{h \\to 0}\\frac{f(x+h)-f(x)}{h}$, ¿qué representa $h$?

### Options
- [ ] A) El valor máximo de la función. <!-- feedback: Incorrecto. h no describe un extremo. -->
- [x] B) Un cambio pequeño en la variable de entrada. <!-- feedback: Correcto. La definición compara valores cercanos de x. -->
- [ ] C) El resultado final de la derivada. <!-- feedback: Incorrecto. El resultado es el límite completo, no h. -->
- [ ] D) El área del rectángulo bajo la curva. <!-- feedback: Incorrecto. El área no participa en esta definición. -->

### Explicación Pedagógica
La derivada surge al estudiar qué ocurre con una razón de cambio cuando la variación en la entrada se hace muy pequeña.

---

## Question 5 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.64

### Contexto
Se quiere derivar $f(x)=5x^3-2x^2+7x-9$.

### Enunciado
¿Cuál es la expresión correcta para $f'(x)$?

### Options
- [ ] A) $15x^3-4x^2+7$ <!-- feedback: Incorrecto. Se dejaron intactos exponentes que debían disminuir. -->
- [ ] B) $15x^2-4x^2+7$ <!-- feedback: Incorrecto. El segundo término debe quedar lineal, no cuadrático. -->
- [x] C) $15x^2-4x+7$ <!-- feedback: Correcto. Se aplicó correctamente la regla de la potencia. -->
- [ ] D) $5x^2-2x+7$ <!-- feedback: Incorrecto. Faltó multiplicar por cada exponente original. -->

### Explicación Pedagógica
En polinomios, la derivada se obtiene multiplicando cada coeficiente por su exponente y reduciendo ese exponente en una unidad.

---

## Question 6 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.62

### Contexto
La posición de un móvil está dada por $s(t)=3t^2+2t$, con $s$ en metros y $t$ en segundos.

### Enunciado
¿Qué representa $s'(t)=6t+2$?

### Options
- [ ] A) La posición total del móvil en el instante $t$. <!-- feedback: Incorrecto. Esa interpretación corresponde a s(t), no a su derivada. -->
- [x] B) La velocidad instantánea del móvil en el instante $t$. <!-- feedback: Correcto. La derivada de la posición respecto al tiempo es la velocidad. -->
- [ ] C) El tiempo total de movimiento. <!-- feedback: Incorrecto. La derivada no entrega directamente la duración total. -->
- [ ] D) La aceleración media entre dos instantes. <!-- feedback: Incorrecto. La aceleración se obtiene derivando nuevamente la velocidad. -->

### Explicación Pedagógica
En modelos de posición-tiempo, la derivada describe qué tan rápido cambia la posición en cada instante.

---

## Question 7 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación
**Expected_Success:** 0.58

### Contexto
La función es $f(x)=|x|$.

### Enunciado
¿Por qué $f$ no es derivable en $x=0$?

### Options
- [ ] A) Porque no es continua en ese punto. <!-- feedback: Incorrecto. La función sí es continua en 0. -->
- [ ] B) Porque su valor no existe en ese punto. <!-- feedback: Incorrecto. $f(0)=0$. -->
- [x] C) Porque las pendientes laterales son distintas. <!-- feedback: Correcto. A la izquierda la pendiente es -1 y a la derecha es 1. -->
- [ ] D) Porque corta al eje x. <!-- feedback: Incorrecto. Cortar el eje x no impide derivar una función. -->

### Explicación Pedagógica
La derivabilidad exige que la pendiente lateral izquierda y la derecha coincidan en el punto estudiado.

---

## Question 8 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.56

### Enunciado
¿Qué diferencia conceptual existe entre la razón de cambio promedio y la razón de cambio instantánea?

### Options
- [ ] A) La primera usa áreas y la segunda usa perímetros. <!-- feedback: Incorrecto. Esa no es la diferencia entre ambos conceptos. -->
- [x] B) La primera usa una secante entre dos puntos y la segunda una tangente en un punto. <!-- feedback: Correcto. La razón de cambio instantánea surge como límite de razones de cambio promedio. -->
- [ ] C) La primera solo sirve para rectas y la segunda solo para parábolas. <!-- feedback: Incorrecto. Ambas ideas aplican a muchas funciones. -->
- [ ] D) La primera no necesita números y la segunda sí. <!-- feedback: Incorrecto. Ambas pueden expresarse numéricamente. -->

### Explicación Pedagógica
La secante resume un cambio en un intervalo; la tangente describe el cambio local en un punto.

---

## Question 9 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.54

### Contexto
Sea $f(x)=x^3-3x$.

### Enunciado
¿Cuáles son los números críticos de la función?

### Options
- [ ] A) $x=0$ y $x=3$ <!-- feedback: Incorrecto. Esos valores no anulan correctamente la derivada. -->
- [x] B) $x=-1$ y $x=1$ <!-- feedback: Correcto. $f'(x)=3x^2-3$ y al igualarla a cero se obtiene $x^2=1$. -->
- [ ] C) $x=-3$ y $x=3$ <!-- feedback: Incorrecto. Se confundieron coeficientes con soluciones. -->
- [ ] D) Solo $x=1$ <!-- feedback: Incorrecto. Falta la solución simétrica negativa. -->

### Explicación Pedagógica
Los números críticos aparecen donde la derivada vale cero o no existe, siempre que el punto pertenezca al dominio.

---

## Question 10 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.52

### Contexto
Para $f(x)=x^2-4x+1$ se tiene $f'(x)=2x-4$.

### Enunciado
¿En qué valor de $x$ la función tiene tangente horizontal?

### Options
- [ ] A) 1 <!-- feedback: Incorrecto. En x=1 la derivada vale -2. -->
- [ ] B) 4 <!-- feedback: Incorrecto. En x=4 la derivada vale 4. -->
- [x] C) 2 <!-- feedback: Correcto. La tangente horizontal ocurre cuando $2x-4=0$. -->
- [ ] D) -2 <!-- feedback: Incorrecto. En x=-2 la derivada no vale cero. -->

### Explicación Pedagógica
La condición de tangente horizontal se obtiene al igualar la derivada a cero.

---

## Question 11 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación
**Expected_Success:** 0.48

### Contexto
La función $f(x)=\\frac{x^2-9}{x-3}$ no está definida en $x=3$.

### Enunciado
¿Cuál es el límite de $f(x)$ cuando $x$ tiende a 3?

### Options
- [ ] A) 0 <!-- feedback: Incorrecto. El cociente no se acerca a cero. -->
- [x] B) 6 <!-- feedback: Correcto. Al simplificar se obtiene $x+3$ para $x\\neq 3$, y el valor límite es 6. -->
- [ ] C) Infinito <!-- feedback: Incorrecto. Aquí no aparece una asíntota vertical. -->
- [ ] D) No existe porque la función no está definida en 3. <!-- feedback: Incorrecto. Una función puede tener límite en un punto aunque no esté definida allí. -->

### Explicación Pedagógica
El límite describe el comportamiento cercano al punto, no necesariamente el valor exacto de la función en ese punto.

---

## Question 12 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v12`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.46

### Contexto
La demanda de un producto se modela con $D(x)=100-2x$, donde $x$ es el precio en miles de pesos.

### Enunciado
¿Qué indica la derivada $D'(x)=-2$?

### Options
- [ ] A) Que la demanda siempre vale 2 unidades. <!-- feedback: Incorrecto. La derivada no es el valor de la demanda. -->
- [x] B) Que por cada aumento de una unidad en el precio, la demanda disminuye aproximadamente en 2 unidades. <!-- feedback: Correcto. La derivada mide la razón de cambio de la demanda respecto al precio. -->
- [ ] C) Que el precio mínimo posible es 2. <!-- feedback: Incorrecto. La derivada no fija un mínimo de precio. -->
- [ ] D) Que la demanda tiene un máximo cuando x=2. <!-- feedback: Incorrecto. Un valor constante negativo no implica eso. -->

### Explicación Pedagógica
Interpretar el signo de la derivada ayuda a leer cómo se relacionan dos magnitudes en un modelo.

---

## Question 13 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.44

### Contexto
Una gráfica muestra que la derivada de una función cambia de positiva a negativa al pasar por $x=c$.

### Enunciado
¿Qué se concluye sobre la función en $x=c$?

### Options
- [ ] A) Tiene un mínimo local. <!-- feedback: Incorrecto. El cambio de positiva a negativa describe una subida seguida de una bajada. -->
- [x] B) Tiene un máximo local. <!-- feedback: Correcto. La función aumenta antes de c y disminuye después de c. -->
- [ ] C) Tiene una asíntota vertical. <!-- feedback: Incorrecto. Ese comportamiento no se deduce del cambio de signo de la derivada. -->
- [ ] D) Es constante en todo su dominio. <!-- feedback: Incorrecto. Un único cambio de signo no implica constancia global. -->

### Explicación Pedagógica
El criterio del signo de la primera derivada permite clasificar extremos locales.

---

## Question 14 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v14`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.42

### Contexto
El área de un rectángulo de base $x$ y altura $12-x$ está dada por $A(x)=x(12-x)$.

### Enunciado
¿Para qué valor de $x$ el área es máxima?

### Options
- [ ] A) 4 <!-- feedback: Incorrecto. Ese valor no anula la derivada de la función área. -->
- [x] B) 6 <!-- feedback: Correcto. $A'(x)=12-2x$ y al igualar a cero se obtiene $x=6$. -->
- [ ] C) 8 <!-- feedback: Incorrecto. En ese valor el área ya está disminuyendo. -->
- [ ] D) 12 <!-- feedback: Incorrecto. Allí la altura sería cero y el área también. -->

### Explicación Pedagógica
La optimización se resuelve modelando la magnitud y buscando sus puntos críticos dentro del dominio válido.

---

## Question 15 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v15`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.4

### Contexto
La función $f(x)=x^3$ tiene derivada $f'(x)=3x^2$.

### Enunciado
¿Qué se puede afirmar sobre la monotonía de $f$?

### Options
- [ ] A) Decrece para todo x. <!-- feedback: Incorrecto. La derivada no es negativa. -->
- [x] B) Crece para todo x, aunque en x=0 la tangente sea horizontal. <!-- feedback: Correcto. La derivada es no negativa y solo se anula en 0. -->
- [ ] C) Tiene un máximo local en x=0. <!-- feedback: Incorrecto. La función sigue creciendo a ambos lados. -->
- [ ] D) Es constante cerca de x=0. <!-- feedback: Incorrecto. Una tangente horizontal no implica constancia local. -->

### Explicación Pedagógica
Que la derivada sea cero en un punto no basta para afirmar máximo o mínimo; importa cómo cambia el signo alrededor de ese punto.

---

## Question 16 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v16`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.38

### Contexto
La función es $f(x)=\\sqrt{x}$.

### Enunciado
¿Cuál es la derivada de $f$ para $x>0$?

### Options
- [ ] A) $\\frac{1}{\\sqrt{x}}$ <!-- feedback: Incorrecto. Falta el factor 1/2 que aparece al derivar una potencia de exponente 1/2. -->
- [x] B) $\\frac{1}{2\\sqrt{x}}$ <!-- feedback: Correcto. $\\sqrt{x}=x^{1/2}$ y su derivada es $\\frac{1}{2}x^{-1/2}$. -->
- [ ] C) $2\\sqrt{x}$ <!-- feedback: Incorrecto. Ese resultado invierte el procedimiento correcto. -->
- [ ] D) $\\sqrt{x}/2$ <!-- feedback: Incorrecto. No se aplicó bien la regla de la potencia. -->

### Explicación Pedagógica
Reescribir radicales como potencias facilita la derivación.

---

## Question 17 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.34

### Contexto
Un tanque contiene agua según el modelo $V(t)=50+8t-t^2$, con $t$ en minutos.

### Enunciado
¿En qué instante el volumen deja de aumentar y empieza a disminuir?

### Options
- [ ] A) En $t=2$ <!-- feedback: Incorrecto. Allí la derivada sigue siendo positiva. -->
- [x] B) En $t=4$ <!-- feedback: Correcto. $V'(t)=8-2t$ y cambia de signo en $t=4$. -->
- [ ] C) En $t=8$ <!-- feedback: Incorrecto. En ese punto el volumen ya viene disminuyendo. -->
- [ ] D) Nunca, porque la función tiene término positivo 8t. <!-- feedback: Incorrecto. El término $-t^2$ cambia el comportamiento global. -->

### Explicación Pedagógica
El cambio de crecimiento a decrecimiento se localiza donde la derivada pasa por cero y cambia de signo.

---

## Question 18 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v18`
**Bloom:** Evaluate
**ICFES:** Comunicación y Representación
**Expected_Success:** 0.32

### Contexto
Se sabe que una función es derivable en un punto.

### Enunciado
¿Qué afirmación necesariamente es verdadera?

### Options
- [ ] A) La función tiene un máximo local en ese punto. <!-- feedback: Incorrecto. Ser derivable no implica tener un extremo. -->
- [x] B) La función es continua en ese punto. <!-- feedback: Correcto. La derivabilidad implica continuidad. -->
- [ ] C) La derivada en ese punto es positiva. <!-- feedback: Incorrecto. La derivada podría ser negativa o cero. -->
- [ ] D) La función es lineal en todo el dominio. <!-- feedback: Incorrecto. La derivabilidad local no determina la forma global de la función. -->

### Explicación Pedagógica
La continuidad es una condición necesaria para que exista la derivada en un punto.

---

## Question 19 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.3

### Contexto
Una empresa modela su costo total por $C(x)=x^2-12x+80$, donde $x$ es el número de lotes producidos.

### Enunciado
¿Qué interpretación tiene el hecho de que $C'(6)=0$ y $C''(6)>0$?

### Options
- [ ] A) Que en $x=6$ el costo total es cero. <!-- feedback: Incorrecto. La derivada cero no implica que el costo sea cero. -->
- [ ] B) Que en $x=6$ el costo alcanza un máximo. <!-- feedback: Incorrecto. Segunda derivada positiva indica concavidad hacia arriba. -->
- [x] C) Que en $x=6$ el costo tiene un mínimo local. <!-- feedback: Correcto. La primera derivada identifica el punto crítico y la segunda lo clasifica como mínimo. -->
- [ ] D) Que producir 6 lotes hace lineal la función. <!-- feedback: Incorrecto. La forma cuadrática de la función no cambia por evaluar un punto. -->

### Explicación Pedagógica
El criterio de la segunda derivada permite clasificar puntos críticos cuando la función es suficientemente suave.

---

## Question 20 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P3-calculo-derivadas-001-MASTERY-v20`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.28

### Contexto
Una partícula se mueve sobre una recta con posición $s(t)=t^3-6t^2+9t$.

### Enunciado
¿Cuál afirmación describe mejor el significado de que $s'(t)$ sea negativa en un intervalo?

### Options
- [ ] A) Que la partícula está detenida en todo el intervalo. <!-- feedback: Incorrecto. Estar detenida implicaría velocidad cero, no negativa. -->
- [x] B) Que la posición está disminuyendo con respecto al tiempo en ese intervalo. <!-- feedback: Correcto. Una derivada negativa indica movimiento en sentido opuesto al elegido como positivo. -->
- [ ] C) Que la aceleración es necesariamente nula. <!-- feedback: Incorrecto. La aceleración depende de la segunda derivada. -->
- [ ] D) Que la posición también es negativa. <!-- feedback: Incorrecto. El signo de la velocidad no obliga al signo de la posición. -->

### Explicación Pedagógica
La derivada de la posición interpreta la dirección instantánea del movimiento, no el valor absoluto de la posición.
