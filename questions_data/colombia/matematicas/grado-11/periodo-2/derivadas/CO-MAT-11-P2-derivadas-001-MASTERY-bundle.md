---
id: "CO-MAT-11-P2-derivadas-001-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "derivadas"
protocol_version: "5.1"
bundle_size: 20
alignment: "ICFES Saber 11 + MEN"
competencia_icfes: "Formulación y Ejecución"
afirmacion_icfes: "El estudiante interpreta, calcula y usa derivadas para describir variación y resolver problemas."
referente_men: "Modelación de cambio, razón de cambio y análisis de funciones."
periodo: 2
bundle_index: 1
modern_context: true
distractor_profile: "misconception_based"
calibration:
  expected_success_rate: 0.48
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "razon_de_cambio, derivada_como_limite, interpretacion_grafica, reglas_de_derivacion, optimizacion"
---

# Bundle Mastery: Derivadas y Razón de Cambio

Este bundle desarrolla la idea de derivada como razón de cambio y pendiente de la recta tangente, integrando cálculo algebraico, interpretación gráfica y modelación básica.

---

## Question 1 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comunicación y Representación
**Expected_Success:** 0.82

### Enunciado
¿Qué representa geométricamente la derivada de una función en un punto?

### Options
- [ ] A) El área bajo la curva hasta ese punto. <!-- feedback: Incorrecto. El área acumulada se relaciona con la integral, no con la derivada. -->
- [ ] B) La coordenada exacta donde la función corta el eje y. <!-- feedback: Incorrecto. El corte con el eje y es un valor particular de la función, no una razón de cambio. -->
- [x] C) La pendiente de la recta tangente a la gráfica en ese punto. <!-- feedback: Correcto. La derivada mide cómo cambia localmente la función y eso se interpreta como pendiente tangente. -->
- [ ] D) El promedio de todos los valores de la función alrededor del punto. <!-- feedback: Incorrecto. La derivada no es un promedio de salidas sino una tasa de cambio instantánea. -->

### Explicación Pedagógica
La interpretación geométrica básica de la derivada es la pendiente de la recta tangente. Esa idea conecta el cambio local de una función con su comportamiento gráfico.

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Comunicación y Representación
**Expected_Success:** 0.78

### Contexto
En una gráfica de posición contra tiempo, la recta tangente en cierto instante es horizontal.

### Enunciado
¿Qué se puede concluir sobre la razón de cambio instantánea en ese instante?

### Options
- [ ] A) Que es máxima. <!-- feedback: Incorrecto. Una tangente horizontal no significa necesariamente un máximo; también puede ser un mínimo o un punto estacionario. -->
- [ ] B) Que es infinita. <!-- feedback: Incorrecto. Una recta horizontal tiene pendiente cero, no infinita. -->
- [x] C) Que es igual a cero. <!-- feedback: Correcto. Una tangente horizontal indica pendiente nula y por tanto razón de cambio instantánea igual a cero. -->
- [ ] D) Que la función deja de existir. <!-- feedback: Incorrecto. La existencia de una tangente horizontal no implica que la función sea indefinida. -->

### Explicación Pedagógica
Si la tangente es horizontal, su pendiente es cero. En términos de variación, eso significa que en ese instante la magnitud no está aumentando ni disminuyendo.

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.72

### Contexto
Se estudia la función $f(x)=x^2$.

### Enunciado
¿Cuál es la razón de cambio promedio de $f$ en el intervalo $[1,3]$?

### Options
- [ ] A) $2$ <!-- feedback: Incorrecto. Ese valor aparece al restar 3-1 en el denominador, pero falta calcular correctamente el cambio en la función. -->
- [ ] B) $3$ <!-- feedback: Incorrecto. Corresponde a una operación parcial con los extremos, no a la razón de cambio promedio completa. -->
- [x] C) $4$ <!-- feedback: Correcto. Se calcula como (f(3)-f(1))/(3-1) = (9-1)/2 = 4. -->
- [ ] D) $8$ <!-- feedback: Incorrecto. Ese valor es el cambio en la función, pero no la razón de cambio porque falta dividir por la variación en x. -->

### Explicación Pedagógica
La razón de cambio promedio compara el cambio en la variable dependiente con el cambio en la variable independiente. Es la pendiente de la secante entre los extremos del intervalo.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Comunicación y Representación
**Expected_Success:** 0.7

### Contexto
La derivada se define a partir de un límite del cociente incremental.

### Enunciado
¿Qué expresa el parámetro $h$ en la definición $f'(x)=\lim_{h\to 0}\frac{f(x+h)-f(x)}{h}$?

### Options
- [ ] A) El valor máximo que puede tomar la función. <!-- feedback: Incorrecto. h no describe un extremo de la función. -->
- [ ] B) El área del rectángulo bajo la curva. <!-- feedback: Incorrecto. El área no interviene en esta definición de derivada. -->
- [x] C) Un pequeño cambio en la variable de entrada. <!-- feedback: Correcto. h representa una variación en x que se hace cada vez más pequeña. -->
- [ ] D) El resultado final de la derivada. <!-- feedback: Incorrecto. El resultado de la derivada es el límite del cociente, no el valor de h. -->

### Explicación Pedagógica
La derivada surge al estudiar qué pasa con una razón de cambio promedio cuando el cambio en la entrada se acerca a cero. Por eso h representa una variación pequeña en x.

---

## Question 5 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.64

### Contexto
Se quiere derivar la función polinómica $f(x)=5x^3-2x^2+7x-9$.

### Enunciado
¿Cuál es la expresión correcta para $f'(x)$?

### Options
- [ ] A) $15x^3-4x^2+7$ <!-- feedback: Incorrecto. Se mantuvieron los exponentes originales, cuando en la derivada de potencias deben disminuir en una unidad. -->
- [ ] B) $15x^2-4x^2+7$ <!-- feedback: Incorrecto. El término derivado de $-2x^2$ debe ser $-4x$, no $-4x^2$. -->
- [x] C) $15x^2-4x+7$ <!-- feedback: Correcto. Se aplicó correctamente la regla de la potencia y la derivada de una constante es cero. -->
- [ ] D) $5x^2-2x+7$ <!-- feedback: Incorrecto. Falta multiplicar cada coeficiente por su exponente original. -->

### Explicación Pedagógica
En la derivación de polinomios se multiplica el coeficiente por el exponente y luego se reduce el exponente en una unidad. Las constantes desaparecen porque su razón de cambio es cero.

---

## Question 6 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.62

### Contexto
Un tanque se llena según el modelo $V(t)=3t^2+2t$, donde $V$ está en litros y $t$ en minutos.

### Enunciado
¿Qué representa $V'(t)=6t+2$ en este contexto?

### Options
- [ ] A) La cantidad total de agua acumulada hasta el minuto t. <!-- feedback: Incorrecto. Esa interpretación corresponde a V(t), no a su derivada. -->
- [x] B) La rapidez instantánea con que cambia el volumen en el minuto t. <!-- feedback: Correcto. La derivada expresa la tasa instantánea de llenado en litros por minuto. -->
- [ ] C) El tiempo total que dura el llenado. <!-- feedback: Incorrecto. La derivada no entrega de forma directa la duración total del proceso. -->
- [ ] D) El volumen inicial del tanque. <!-- feedback: Incorrecto. El volumen inicial se obtiene evaluando V(0), no derivando. -->

### Explicación Pedagógica
Cuando una función modela una magnitud física, su derivada describe cómo cambia esa magnitud en cada instante. En este caso, indica la rapidez de llenado.

---

## Question 7 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.56

### Contexto
Para la función $f(x)=\frac{1}{x}$ se sabe que:
- $\lim_{x\to 0^+}f(x)=+\infty$
- $\lim_{x\to 0^-}f(x)=-\infty$

### Enunciado
¿Qué se concluye sobre $\lim_{x\to 0}\frac{1}{x}$?

### Options
- [ ] A) Existe y vale $0$. <!-- feedback: Incorrecto. Los límites laterales no se acercan a cero ni coinciden entre sí. -->
- [ ] B) Existe y vale infinito. <!-- feedback: Incorrecto. Decir simplemente infinito no resuelve la diferencia entre los laterales. -->
- [x] C) No existe como límite bilateral porque los laterales no coinciden. <!-- feedback: Correcto. Para que exista el límite bilateral, ambos laterales deben tender al mismo comportamiento. -->
- [ ] D) Existe solo porque la función está definida para x distinta de 0. <!-- feedback: Incorrecto. Estar definida alrededor del punto no garantiza la existencia del límite. -->

### Explicación Pedagógica
La existencia de un límite bilateral exige acuerdo entre el comportamiento por la izquierda y por la derecha. Si ese acuerdo no existe, el límite no existe.

---

## Question 8 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación
**Expected_Success:** 0.52

### Contexto
Se analiza la función $f(x)=|x|$ en $x=0$.

### Enunciado
¿Por qué la función no es derivable en $x=0$?

### Options
- [ ] A) Porque no es continua en $x=0$. <!-- feedback: Incorrecto. La función sí es continua en ese punto. -->
- [ ] B) Porque su valor en $x=0$ no existe. <!-- feedback: Incorrecto. f(0)=0 está perfectamente definido. -->
- [x] C) Porque las pendientes laterales son distintas y no hay una única tangente. <!-- feedback: Correcto. La derivada por la izquierda vale -1 y por la derecha vale 1, así que no coinciden. -->
- [ ] D) Porque la gráfica corta al eje x. <!-- feedback: Incorrecto. Cortar el eje x no impide derivar una función. -->

### Explicación Pedagógica
Una función puede ser continua y aun así no ser derivable. En el valor absoluto aparece una punta donde las pendientes laterales no coinciden.

---

## Question 9 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.5

### Contexto
Se tienen las funciones $u(x)=x^2+1$ y $v(x)=3x-2$.

### Enunciado
Si $f(x)=u(x)\cdot v(x)$, ¿cuál es $f'(x)$?

### Options
- [ ] A) $6x$ <!-- feedback: Incorrecto. Eso resulta de derivar solo parcialmente y omitir términos de la regla del producto. -->
- [ ] B) $6x^2-4x+3$ <!-- feedback: Incorrecto. Falta el aporte del segundo producto o la simplificación correcta. -->
- [x] C) $9x^2-4x+3$ <!-- feedback: Correcto. (u'v + uv') = 2x(3x-2) + (x^2+1)(3), que simplifica a 9x^2 - 4x + 3. -->
- [ ] D) $3x^2-2x+1$ <!-- feedback: Incorrecto. Esa expresión mezcla coeficientes de la función original sin aplicar bien la regla del producto. -->

### Explicación Pedagógica
La regla del producto combina dos contribuciones: derivar la primera y dejar intacta la segunda, más dejar intacta la primera y derivar la segunda.

---

## Question 10 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.48

### Contexto
Se estudia la función compuesta $H(x)=(4x^2-7)^5$.

### Enunciado
¿Cuál es la derivada correcta de $H(x)$?

### Options
- [ ] A) $5(4x^2-7)^4$ <!-- feedback: Incorrecto. Se derivó la capa externa, pero faltó multiplicar por la derivada de la expresión interna. -->
- [x] B) $40x(4x^2-7)^4$ <!-- feedback: Correcto. Se aplicó la regla de la cadena: 5(4x^2-7)^4 por 8x. -->
- [ ] C) $8x(4x^2-7)^5$ <!-- feedback: Incorrecto. Se derivó la parte interna, pero no se modificó correctamente la potencia externa. -->
- [ ] D) $20x(4x^2-7)^4$ <!-- feedback: Incorrecto. Falta un factor 2 al multiplicar 5 por 8x. -->

### Explicación Pedagógica
La regla de la cadena dice que se deriva la función de afuera y luego se multiplica por la derivada de la función de adentro.

---

## Question 11 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación
**Expected_Success:** 0.44

### Contexto
La gráfica de una función tiene pendiente positiva y cada vez más empinada en un intervalo.

### Enunciado
¿Cuál afirmación describe mejor el comportamiento de la función en ese intervalo?

### Options
- [ ] A) La función decrece y se aplana. <!-- feedback: Incorrecto. Una pendiente positiva indica crecimiento, no decrecimiento. -->
- [x] B) La función crece y su razón de cambio también aumenta. <!-- feedback: Correcto. Pendiente positiva y creciente significa aumento de la función y de su tasa de variación. -->
- [ ] C) La función es constante con derivada nula. <!-- feedback: Incorrecto. Una función constante tendría pendiente cero. -->
- [ ] D) La función cambia de signo necesariamente. <!-- feedback: Incorrecto. El signo de la función no se deduce solo de la pendiente. -->

### Explicación Pedagógica
Leer derivadas desde la gráfica implica distinguir entre el valor de la función y la pendiente. Una pendiente positiva cada vez mayor indica crecimiento acelerado.

---

## Question 12 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v12`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.42

### Contexto
La altura de una pelota, en metros, está dada por $h(t)=-5t^2+20t+1$.

### Enunciado
¿Cuál es la velocidad instantánea de la pelota en $t=2$ segundos?

### Options
- [ ] A) $1$ m/s <!-- feedback: Incorrecto. Ese valor corresponde a evaluar la altura en otro paso, no la derivada en t=2. -->
- [ ] B) $5$ m/s <!-- feedback: Incorrecto. La derivada es lineal y al evaluar en t=2 no da ese resultado. -->
- [x] C) $0$ m/s <!-- feedback: Correcto. h'(t) = -10t + 20 y h'(2) = 0, lo que indica un instante de cambio de sentido. -->
- [ ] D) $20$ m/s <!-- feedback: Incorrecto. 20 es parte del coeficiente lineal original, pero no la velocidad en t=2. -->

### Explicación Pedagógica
La velocidad es la derivada de la posición respecto al tiempo. Cuando la velocidad vale cero en un movimiento parabólico, se identifica un punto de altura máxima o mínima.

---

## Question 13 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.4

### Contexto
Un estudiante afirma: Si la derivada de una función es cero en un punto, entonces allí siempre hay un máximo.

### Enunciado
¿Cuál es la mejor evaluación de esa afirmación?

### Options
- [ ] A) Es verdadera porque pendiente cero significa punto más alto. <!-- feedback: Incorrecto. Una pendiente cero también puede aparecer en mínimos o puntos de inflexión horizontales. -->
- [ ] B) Es falsa porque una derivada nunca puede ser cero. <!-- feedback: Incorrecto. Muchas funciones tienen derivada nula en ciertos puntos. -->
- [x] C) Es falsa porque una derivada cero solo garantiza un punto crítico, no necesariamente un máximo. <!-- feedback: Correcto. Hace falta más información sobre el cambio de signo de la derivada o la concavidad. -->
- [ ] D) Es verdadera solo en funciones lineales. <!-- feedback: Incorrecto. En funciones lineales la derivada es constante y, salvo la función constante, no toma valor cero. -->

### Explicación Pedagógica
La condición $f'(x)=0$ identifica candidatos a extremos, pero no clasifica por sí sola el tipo de punto. Se requiere análisis adicional.

---

## Question 14 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación
**Expected_Success:** 0.36

### Contexto
Se sabe que $f'(x)>0$ para todo $x$ de un intervalo $I$.

### Enunciado
¿Qué implica esta información sobre la función $f$ en $I$?

### Options
- [x] A) Que la función es creciente en todo el intervalo. <!-- feedback: Correcto. Derivada positiva en un intervalo indica pendiente positiva y crecimiento. -->
- [ ] B) Que la función es decreciente en todo el intervalo. <!-- feedback: Incorrecto. El signo positivo de la derivada contradice el decrecimiento. -->
- [ ] C) Que la función tiene un máximo absoluto en todo el intervalo. <!-- feedback: Incorrecto. El crecimiento no garantiza por sí solo la existencia de un máximo absoluto. -->
- [ ] D) Que la función corta el eje x exactamente una vez. <!-- feedback: Incorrecto. El comportamiento creciente no determina cuántas raíces tiene. -->

### Explicación Pedagógica
El signo de la derivada permite describir monotonicidad. Una derivada positiva se interpreta como crecimiento local sostenido en el intervalo analizado.

---

## Question 15 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.34

### Contexto
Se quiere aproximar la pendiente de la tangente a $f(x)=x^2$ en $x=2$ usando secantes.

### Enunciado
¿Qué valor debería aproximarse al calcular la pendiente entre $(2,f(2))$ y $(2+h,f(2+h))$ cuando $h$ se hace muy pequeño?

### Options
- [ ] A) $2$ <!-- feedback: Incorrecto. Ese valor coincide con la entrada x, pero no con la derivada de x^2 en ese punto. -->
- [ ] B) $2.5$ <!-- feedback: Incorrecto. Puede aparecer en una aproximación parcial, pero no es el límite correcto del cociente incremental. -->
- [x] C) $4$ <!-- feedback: Correcto. La derivada de x^2 es 2x y en x=2 vale 4. -->
- [ ] D) $8$ <!-- feedback: Incorrecto. Ese valor corresponde a una confusión con f(2+h) o con el doble del resultado correcto. -->

### Explicación Pedagógica
La derivada es el límite de las pendientes de las secantes cuando el segundo punto se acerca al primero. En x=2, esa pendiente límite es 4.

---

## Question 16 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v16`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.32

### Contexto
Se desea hallar la ecuación de la recta tangente a $f(x)=x^2+1$ en el punto donde $x=1$.

### Enunciado
¿Cuál es la ecuación correcta de la recta tangente?

### Options
- [ ] A) $y=x+2$ <!-- feedback: Incorrecto. La pendiente en x=1 no es 1 sino 2. -->
- [x] B) $y=2x$ <!-- feedback: Correcto. f(1)=2 y f'(1)=2, por lo que la tangente es y-2 = 2(x-1), equivalente a y = 2x. -->
- [ ] C) $y=2x+1$ <!-- feedback: Incorrecto. Esa recta no pasa por el punto de tangencia (1,2). -->
- [ ] D) $y=x^2+2$ <!-- feedback: Incorrecto. Esa expresión sigue siendo una parábola, no una recta tangente. -->

### Explicación Pedagógica
Para construir la tangente se necesitan dos elementos: el punto de contacto y la pendiente dada por la derivada en ese punto.

---

## Question 17 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Modelación
**Expected_Success:** 0.28

### Contexto
El costo total de producir $x$ artículos está modelado por $C(x)=x^2+10x+100$.

### Enunciado
¿Qué interpreta mejor la derivada $C'(x)$ en este contexto?

### Options
- [ ] A) El costo fijo de iniciar la producción. <!-- feedback: Incorrecto. El costo fijo está asociado al término constante, no a la derivada. -->
- [x] B) El costo marginal, es decir, cómo cambia el costo al producir una unidad adicional alrededor de x. <!-- feedback: Correcto. La derivada de la función de costo modela la variación instantánea del costo total. -->
- [ ] C) El número total de artículos producidos. <!-- feedback: Incorrecto. x representa la cantidad producida, no la derivada. -->
- [ ] D) La ganancia total obtenida por vender x artículos. <!-- feedback: Incorrecto. No se dio una función de ingresos o utilidad. -->

### Explicación Pedagógica
En modelación económica, la derivada de una función de costo se interpreta como costo marginal. Describe la variación del costo total frente a pequeños cambios en la producción.

---

## Question 18 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v18`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.24

### Contexto
Sea $f(x)=x^3-3x$.

### Enunciado
¿En cuál de los siguientes intervalos la función es decreciente?

### Options
- [ ] A) Para todo número real. <!-- feedback: Incorrecto. La función cambia de comportamiento porque su derivada no mantiene el mismo signo en todo el dominio. -->
- [x] B) En $(-1,1)$ <!-- feedback: Correcto. f'(x)=3x^2-3=3(x^2-1)$ es negativa cuando x^2<1, es decir, entre -1 y 1. -->
- [ ] C) En $(-\infty,-1)\cup(1,\infty)$ <!-- feedback: Incorrecto. En esos intervalos la derivada es positiva, así que allí la función crece. -->
- [ ] D) Solo en $x=0$. <!-- feedback: Incorrecto. La monotonicidad se describe en intervalos, no en un solo punto. -->

### Explicación Pedagógica
Para analizar crecimiento y decrecimiento se estudia el signo de la derivada. La función decrece exactamente donde su derivada es negativa.

---

## Question 19 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Modelación
**Expected_Success:** 0.2

### Contexto
Se dispone de 40 metros de cerca para delimitar un corral rectangular pegado a un muro, de modo que solo se cercan tres lados. Si los lados perpendiculares al muro miden $x$, el área queda modelada por $A(x)=x(40-2x)$.

### Enunciado
¿Qué valor de $x$ maximiza el área del corral?

### Options
- [ ] A) $5$ m <!-- feedback: Incorrecto. Al evaluar la derivada, ese valor no hace cero la tasa de cambio del área. -->
- [x] B) $10$ m <!-- feedback: Correcto. A'(x)=40-4x y al resolver A'(x)=0 se obtiene x=10. -->
- [ ] C) $15$ m <!-- feedback: Incorrecto. Ese valor da un área válida, pero no el máximo. -->
- [ ] D) $20$ m <!-- feedback: Incorrecto. Si x=20, el lado paralelo al muro sería cero y el área desaparece. -->

### Explicación Pedagógica
La optimización con derivadas busca puntos críticos y luego interpreta el modelo. Aquí la derivada permite identificar la medida que hace máxima el área.

---

## Question 20 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P2-derivadas-001-MASTERY-v20`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.18

### Contexto
Un estudiante afirma: Si una función es derivable en un punto, entonces automáticamente es continua en ese punto.

### Enunciado
¿Cómo debe evaluarse esa afirmación?

### Options
- [ ] A) Es falsa, porque hay funciones derivables y discontinuas en el mismo punto. <!-- feedback: Incorrecto. La derivabilidad implica continuidad, por lo que ese caso no puede ocurrir. -->
- [x] B) Es verdadera, porque la derivabilidad es una condición más fuerte que la continuidad. <!-- feedback: Correcto. Si existe la derivada en un punto, la función necesariamente es continua allí. -->
- [ ] C) Es falsa, porque continuidad y derivabilidad son conceptos sin relación. <!-- feedback: Incorrecto. Sí hay relación: la derivabilidad exige continuidad previa. -->
- [ ] D) Es verdadera solo para funciones polinómicas. <!-- feedback: Incorrecto. No es una propiedad exclusiva de polinomios, sino una implicación general del cálculo diferencial. -->

### Explicación Pedagógica
La derivabilidad exige un comportamiento local suficientemente regular como para garantizar continuidad. La implicación inversa no siempre se cumple, pero esta sí.
