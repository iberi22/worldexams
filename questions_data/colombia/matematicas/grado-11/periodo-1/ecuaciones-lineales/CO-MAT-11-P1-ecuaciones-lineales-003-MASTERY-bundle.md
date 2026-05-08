---
id: "CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "ecuaciones-lineales"
periodo: 1
protocol_version: "5.1"
bundle_index: 3
bundle_size: 20
alignment: "ICFES Saber 11 + MEN"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: 0.70
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "sistemas_2x2, problemas_mezclas, modelado_costos_lineales"
---

# Bundle Mastery: Sistemas de Ecuaciones y Modelado Lineal

Este bundle se enfoca en la resolución de sistemas de ecuaciones lineales 2x2 y su aplicación en el modelado de situaciones financieras, mezclas y logística en Colombia. Se explora el análisis de soluciones (única, infinitas o ninguna) y la interpretación gráfica de los sistemas.

---

## Question 1 (Difficulty D3)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comunicación y Representación

### Contexto
Un estudiante en Medellín está aprendiendo sobre los diferentes tipos de soluciones de un sistema de dos ecuaciones lineales con dos incógnitas.

### Enunciado
¿Cuál es la interpretación geométrica de un sistema que **no tiene solución**?

### Options
- [ ] A) Las dos rectas se cortan en un punto. <!-- feedback: Incorrecto. Si se cortan en un punto, el sistema tiene una solución única. -->
- [x] B) Las dos rectas son paralelas y nunca se tocan. <!-- feedback: Correcto. Si las rectas mantienen la misma pendiente pero diferentes interceptos, no existe ningún punto común, por lo que el sistema es incompatible. -->
- [ ] C) Una recta está encima de la otra. <!-- feedback: Incorrecto. En este caso el sistema tiene infinitas soluciones. -->
- [ ] D) Las rectas forman un ángulo recto. <!-- feedback: Incorrecto. Las rectas perpendiculares se cortan en un punto, por lo que tienen solución única. -->

### Explicación Pedagógica
La relación geométrica entre las rectas en el plano cartesiano dicta la naturaleza de las soluciones del sistema: coincidencia (infinitas), paralelismo (ninguna) o intersección (única).

---

## Question 2 (Difficulty D3)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentación

### Contexto
Sea el sistema de ecuaciones:
$2x + 3y = 10$
$2x + 3y = 15$

### Enunciado
¿Qué se puede concluir sobre este sistema sin realizar cálculos complejos?

### Options
- [ ] A) Tiene una solución única. <!-- feedback: Incorrecto. Las partes izquierdas son idénticas pero las derechas no. -->
- [x] B) Es un sistema **inconsistente** (sin solución). <!-- feedback: Correcto. La misma combinación de x e y no puede sumar 10 y 15 simultáneamente. Geométricamente son rectas paralelas. -->
- [ ] C) Tiene infinitas soluciones. <!-- feedback: Incorrecto. Para infinitas soluciones, los términos independientes también deberían ser iguales. -->
- [ ] D) La solución es $x=0, y=0$. <!-- feedback: Incorrecto. El origen no satisface ninguna de las dos ecuaciones. -->

### Explicación Pedagógica
La consistencia de un sistema se valida verificando la proporcionalidad entre los coeficientes de las variables y los términos independientes.

---

## Question 3 (Difficulty D4)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
En una cafetería en Manizales, 2 tintos y 3 buñuelos cuestan $12.000$ pesos. Un tinto cuesta $1.500$ pesos más que un buñuelo.

### Enunciado
Si $x$ es el precio del tinto y $y$ el precio del buñuelo, ¿cuál es el sistema de ecuaciones correcto?

### Options
- [ ] A) $2x + 3y = 12000$; $x + y = 1500$ <!-- feedback: Incorrecto. La segunda ecuación dice que la suma es 1.500, no que uno sea mayor que el otro. -->
- [x] B) $2x + 3y = 12000$; $x - y = 1500$ <!-- feedback: Correcto. La primera representa el total de la compra y la segunda la diferencia de precios entre el tinto y el buñuelo. -->
- [ ] C) $2x + 3y = 12000$; $y - x = 1500$ <!-- feedback: Incorrecto. Esta diría que el buñuelo es más caro que el tinto. -->
- [ ] D) $5(x+y) = 12000$; $x = 1500$ <!-- feedback: Incorrecto. No modela correctamente la compra ni la relación de precios. -->

### Explicación Pedagógica
La traducción de problemas verbales a lenguaje algebraico es el primer paso crítico para el modelado matemático. Identificar las variables y sus relaciones es fundamental.

---

## Question 4 (Difficulty D4)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Resuelva el siguiente sistema por el método de sustitución:
$x + y = 20$
$x = 3y$

### Enunciado
¿Cuáles son los valores de $x$ e $y$?

### Options
- [ ] A) $x=10, y=10$ <!-- feedback: Incorrecto. No cumplen la relación x=3y. -->
- [x] B) $x=15, y=5$ <!-- feedback: Correcto. Sustituyendo x en la primera: 3y + y = 20 => 4y = 20 => y = 5. Luego x = 3(5) = 15. -->
- [ ] C) $x=5, y=15$ <!-- feedback: Incorrecto. Aquí y sería el triple de x, no al revés. -->
- [ ] D) $x=12, y=8$ <!-- feedback: Incorrecto. Suman 20 pero x no es el triple de y. -->

### Explicación Pedagógica
El método de sustitución es eficiente cuando una de las variables ya está despejada en una de las ecuaciones, permitiendo reducir el sistema a una sola variable rápidamente.

---

## Question 5 (Difficulty D5)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Un inversionista en la Bolsa de Valores de Colombia reparte $10$ millones de pesos en dos tipos de acciones. La acción A rinde el $5\%$ anual y la acción B el $8\%$ anual. Al final del año recibió $620.000$ pesos de intereses totales.

### Enunciado
¿Cuánto dinero invirtió en cada acción?

### Options
- [ ] A) 5 millones en cada una. <!-- feedback: Incorrecto. El interés total sería 0.05(5M) + 0.08(5M) = 250k + 400k = 650k, superando lo recibido. -->
- [x] B) 6 millones en acción A y 4 millones en acción B. <!-- feedback: Correcto. 0.05(6M) + 0.08(4M) = 300k + 320k = 620k. Además 6M + 4M = 10M. -->
- [ ] C) 4 millones en acción A y 6 millones en acción B. <!-- feedback: Incorrecto. El interés sería 0.05(4M) + 0.08(6M) = 200k + 480k = 680k. -->
- [ ] D) 2 millones en acción A y 8 millones en acción B. <!-- feedback: Incorrecto. Daría un rendimiento muy diferente al reportado. -->

### Explicación Pedagógica
Los problemas de inversión se modelan con sistemas donde una ecuación representa el capital total y la otra el rendimiento total de los intereses.

---

## Question 6 (Difficulty D5)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

### Contexto
Se analiza el sistema:
$ax + by = c$
$kx + ly = m$
Se observa que los coeficientes son proporcionales: $a/k = b/l = c/m$.

### Enunciado
¿Cuál es la conclusión sobre las soluciones de este sistema?

### Options
- [ ] A) El sistema no tiene solución. <!-- feedback: Incorrecto. La proporcionalidad total indica dependencia. -->
- [ ] B) El sistema tiene una solución única. <!-- feedback: Incorrecto. Esto requeriría que las pendientes fueran diferentes. -->
- [x] C) El sistema tiene **infinitas soluciones**. <!-- feedback: Correcto. Cuando los coeficientes y el término independiente guardan la misma razón, las dos ecuaciones representan la misma recta en el plano. -->
- [ ] D) El sistema solo tiene la solución trivial $(0,0)$. <!-- feedback: Incorrecto. Depende de los valores de c y m. -->

### Explicación Pedagógica
La proporcionalidad completa entre ecuaciones lineales indica que una es un múltiplo escalar de la otra, lo que significa que coinciden en todos sus puntos.

---

## Question 7 (Difficulty D5)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Un camión de carga sale de Bogotá hacia Cali a $60$ km/h. Dos horas después, una camioneta sale en la misma dirección a $90$ km/h.

### Enunciado
¿A qué distancia de Bogotá la camioneta alcanzará al camión?

### Options
- [ ] A) $180$ km <!-- feedback: Incorrecto. No considera correctamente el tiempo de ventaja del camión. -->
- [ ] B) $270$ km <!-- feedback: Incorrecto. Error en el cálculo del tiempo de alcance. -->
- [x] C) $360$ km <!-- feedback: Correcto. Camión: d = 60t. Camioneta: d = 90(t-2). Igualando: 60t = 90t - 180 => 30t = 180 => t = 6 horas. Distancia = 60 * 6 = 360 km. -->
- [ ] D) $450$ km <!-- feedback: Incorrecto. El tiempo de viaje no coincide con los datos. -->

### Explicación Pedagógica
Los problemas de alcance se resuelven planteando las ecuaciones de posición para cada vehículo e igualándolas para encontrar el tiempo y la distancia comunes.

---

## Question 8 (Difficulty D6)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación

### Contexto
Dada la gráfica de un sistema de ecuaciones donde las rectas se cruzan en el punto $(-2, 4)$.

### Enunciado
¿Cuál de las siguientes afirmaciones es FALSA respecto al punto de intersección?

### Options
- [ ] A) El punto satisface simultáneamente ambas ecuaciones. <!-- feedback: Verdadero. Es la definición de solución del sistema. -->
- [ ] B) Si sustituimos $x=-2$ en cualquiera de las dos ecuaciones, el resultado de $y$ debe ser $4$. <!-- feedback: Verdadero. Es un punto común a ambas gráficas. -->
- [x] C) El sistema es inconsistente. <!-- feedback: Falso. Un sistema inconsistente no tiene puntos de intersección; este sistema es consistente determinado. -->
- [ ] D) La solución única del sistema es el par ordenado $(-2, 4)$. <!-- feedback: Verdadero. Representa la intersección única. -->

### Explicación Pedagógica
La solución de un sistema es el conjunto de valores que hacen verdaderas todas las igualdades del sistema al mismo tiempo, representados por los puntos de contacto entre sus gráficas.

---

## Question 9 (Difficulty D6)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
Un laboratorio químico en Cúcuta necesita mezclar dos soluciones de ácido, una al $10\%$ y otra al $30\%$, para obtener $100$ litros de una solución al $15\%$.

### Enunciado
¿Cuántos litros de la solución al $10\%$ se necesitan?

### Options
- [ ] A) $25$ litros <!-- feedback: Incorrecto. Resultaría en una concentración diferente. -->
- [ ] B) $50$ litros <!-- feedback: Incorrecto. Daría una concentración del 20% (el promedio simple). -->
- [x] C) $75$ litros <!-- feedback: Correcto. Sea x litros al 10% e y litros al 30%. x+y=100; 0.10x + 0.30y = 15. Sustituyendo y=100-x: 0.1x + 0.3(100-x) = 15 => 0.1x + 30 - 0.3x = 15 => -0.2x = -15 => x = 75. -->
- [ ] D) $80$ litros <!-- feedback: Incorrecto. Error en los cálculos de la mezcla. -->

### Explicación Pedagógica
Los problemas de mezclas se modelan con un sistema de conservación: una ecuación para la cantidad total de líquido y otra para la cantidad total de la sustancia de interés (ácido).

---

## Question 10 (Difficulty D6)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentación

### Contexto
Se tiene el sistema:
$L1: y = 2x + 5$
$L2: y = 2x - 3$

### Enunciado
¿Cuál es la relación geométrica entre estas dos rectas?

### Options
- [ ] A) Son perpendiculares. <!-- feedback: Incorrecto. Sus pendientes son iguales, no recíprocas negativas. -->
- [x] B) Son paralelas. <!-- feedback: Correcto. Tienen la misma pendiente (2) pero diferentes interceptos con el eje Y (5 y -3). -->
- [ ] C) Se cortan en el punto $(0, 5)$. <!-- feedback: Incorrecto. Ese punto solo pertenece a L1. -->
- [ ] D) Son la misma recta. <!-- feedback: Incorrecto. Los interceptos son diferentes. -->

### Explicación Pedagógica
Dos rectas con la misma pendiente son paralelas. Si además tienen diferentes interceptos, son paralelas disjuntas, lo que implica que el sistema no tiene solución.

---

## Question 11 (Difficulty D7)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Determine el valor de $k$ para que el siguiente sistema tenga **infinitas soluciones**:
$x + 2y = 4$
$3x + ky = 12$

### Enunciado
¿Cuál debe ser el valor del parámetro $k$?

### Options
- [ ] A) $k = 2$ <!-- feedback: Incorrecto. El sistema tendría solución única. -->
- [ ] B) $k = 4$ <!-- feedback: Incorrecto. La proporción entre los coeficientes de x no se mantendría en y. -->
- [x] C) $k = 6$ <!-- feedback: Correcto. Para que sean la misma recta, la segunda ecuación debe ser el triple de la primera (ya que 3*1=3 y 12=3*4). Por tanto, k debe ser 3 * 2 = 6. -->
- [ ] D) $k = 1$ <!-- feedback: Incorrecto. No generaría dependencia lineal. -->

### Explicación Pedagógica
Para que un sistema tenga infinitas soluciones, las ecuaciones deben ser linealmente dependientes, lo que implica que todos sus coeficientes son proporcionales.

---

## Question 12 (Difficulty D7)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v12`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
En un corral con gallinas y cerdos en una finca en el Huila, se cuentan $60$ cabezas y $160$ patas en total.

### Enunciado
¿Cuántos cerdos hay en el corral?

### Options
- [ ] A) $30$ cerdos <!-- feedback: Incorrecto. 30 cerdos y 30 gallinas darían 180 patas (120+60). -->
- [x] B) $20$ cerdos <!-- feedback: Correcto. x+y=60 (cabezas), 2x+4y=160 (patas). Multiplicando la primera por -2: -2x-2y=-120. Sumando: 2y=40 => y=20 (cerdos). -->
- [ ] C) $40$ cerdos <!-- feedback: Incorrecto. Superaría el número total de patas permitido por las 60 cabezas. -->
- [ ] D) $10$ cerdos <!-- feedback: Incorrecto. Habría demasiadas gallinas y faltarían patas para llegar a 160. -->

### Explicación Pedagógica
Este es un problema clásico de sistemas 2x2. Requiere asignar una variable a cada tipo de animal y construir las ecuaciones basadas en las restricciones físicas proporcionadas.

---

## Question 13 (Difficulty D7)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v13`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Considere el sistema:
$3x - 4y = 12$
$6x - 8y = 20$

### Enunciado
Un estudiante afirma que el sistema tiene una solución única porque los números son diferentes. ¿Es correcta la afirmación? Justifique.

### Options
- [ ] A) Sí, mediante el método de reducción se encuentra la solución. <!-- feedback: Incorrecto. Al intentar reducir se eliminan ambas variables. -->
- [x] B) No, el sistema no tiene solución porque las rectas son paralelas. <!-- feedback: Correcto. Los coeficientes de x e y son proporcionales (6/3 = 8/4 = 2), pero los términos independientes no (20/12 != 2). -->
- [ ] C) No, el sistema tiene infinitas soluciones. <!-- feedback: Incorrecto. Para infinitas soluciones, el término independiente debería ser 24. -->
- [ ] D) Sí, la solución es el origen $(0,0)$. <!-- feedback: Incorrecto. El origen no satisface ninguna ecuación. -->

### Explicación Pedagógica
La identificación de paralelismo a simple vista ahorra tiempo en la resolución de sistemas. Si las pendientes son iguales pero los interceptos no, el sistema es inconsistente.

---

## Question 14 (Difficulty D8)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Formulación y Ejecución

### Contexto
Un avión comercial viaja de Bogotá a Barranquilla ($700$ km) con viento a favor en $1.5$ horas. El viaje de regreso, con viento en contra, tarda $2$ horas.

### Enunciado
¿Cuál es la velocidad del viento? (Suponga que ambas velocidades son constantes).

### Options
- [ ] A) $50$ km/h <!-- feedback: Incorrecto. Error en el planteamiento de las velocidades relativas. -->
- [x] B) $58.3$ km/h aprox. <!-- feedback: Correcto. v_a + v_v = 700/1.5 = 466.7. v_a - v_v = 700/2 = 350. Restando las ecuaciones: 2v_v = 116.7 => v_v = 58.3 km/h. -->
- [ ] C) $100$ km/h <!-- feedback: Incorrecto. Velocidad del viento excesiva para los tiempos dados. -->
- [ ] D) $25$ km/h <!-- feedback: Incorrecto. No compensa la diferencia de tiempos entre los trayectos. -->

### Explicación Pedagógica
Los problemas de navegación con corrientes se resuelven sumando la velocidad del medio a la del móvil en un sentido y restándola en el otro, formando un sistema 2x2.

---

## Question 15 (Difficulty D8)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v15`
**Bloom:** Create
**ICFES:** Formulación y Ejecución

### Contexto
Una fábrica de calzado en Bucaramanga produce dos modelos: Ejecutivo y Deportivo. El Ejecutivo requiere $2$ horas de corte y $3$ de costura. El Deportivo requiere $1$ hora de corte y $4$ de costura. Se dispone de $40$ horas de corte y $110$ de costura a la semana.

### Enunciado
¿Cuántos pares de cada modelo se deben producir para agotar exactamente las horas disponibles?

### Options
- [ ] A) $15$ Ejecutivos y $10$ Deportivos. <!-- feedback: Incorrecto. El tiempo de corte sería 2(15)+1(10)=40 (bien), pero el de costura sería 3(15)+4(10)=85, insuficiente para agotar las 110 horas. -->
- [x] B) $10$ Ejecutivos y $20$ Deportivos. <!-- feedback: Correcto. Satisface ambas restricciones: Corte 2(10)+20=40 y Costura 3(10)+4(20)=110. -->
- [ ] C) $20$ Ejecutivos y $10$ Deportivos. <!-- feedback: Incorrecto. Requeriría 50 horas de corte, superando la disponibilidad. -->
- [ ] D) $15$ Ejecutivos y $15$ Deportivos. <!-- feedback: Incorrecto. No agota las horas de costura de forma exacta. -->

### Explicación Pedagógica
Este es un problema de planeación de la producción, donde cada recurso (tiempo de corte, tiempo de costura) genera una restricción lineal que debe cumplirse simultáneamente.

---

## Question 16 (Difficulty D8)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v16`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación

### Contexto
Un sistema de ecuaciones lineales depende de un parámetro $m$:
$x + my = 1$
$mx + y = 1$

### Enunciado
¿Para qué valor de $m$ el sistema tiene infinitas soluciones?

### Options
- [ ] A) $m = 0$ <!-- feedback: Incorrecto. Daría solución única x=1, y=1. -->
- [x] B) $m = 1$ <!-- feedback: Correcto. Si m=1, ambas ecuaciones son x + y = 1, resultando en infinitas soluciones sobre esa recta. -->
- [ ] C) $m = -1$ <!-- feedback: Incorrecto. Daría x-y=1 y -x+y=1, que son paralelas disjuntas (sin solución). -->
- [ ] D) Cualquier valor de m. <!-- feedback: Incorrecto. Para la mayoría de los valores de m el sistema tiene solución única. -->

### Explicación Pedagógica
El análisis de sistemas paramétricos requiere estudiar los casos donde el determinante del sistema es cero, lo que lleva a situaciones de dependencia o inconsistencia.

---

## Question 17 (Difficulty D9)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Se tienen tres rectas en el plano:
$L1: x + y = 4$
$L2: 2x - y = 2$
$L3: x - 2y = -2$

### Enunciado
¿Existe un punto que sea solución para las tres ecuaciones simultáneamente?

### Options
- [x] A) Sí, el punto $(2, 2)$. <!-- feedback: Correcto. L1: 2+2=4. L2: 2(2)-2=2. L3: 2-2(2)=-2. El punto satisface las tres igualdades. -->
- [ ] B) No, tres rectas nunca se cortan en un mismo punto. <!-- feedback: Incorrecto. Es posible si las rectas son concurrentes. -->
- [ ] C) Sí, el punto $(0, 0)$. <!-- feedback: Incorrecto. El origen no satisface ninguna ecuación. -->
- [ ] D) Solo existe solución para L1 y L2. <!-- feedback: Incorrecto. L3 también pasa por el mismo punto de intersección. -->

### Explicación Pedagógica
Los sistemas de más de dos ecuaciones con dos incógnitas suelen estar sobre determinados. Sin embargo, si las rectas son concurrentes, existe una solución común para todo el conjunto.

---

## Question 18 (Difficulty D9)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v18`
**Bloom:** Create
**ICFES:** Formulación y Ejecución

### Contexto
Halla la ecuación de una recta que pase por el punto de intersección de $x + y = 5$ y $2x - y = 1$, y que además sea perpendicular a la recta $y = x$.

### Enunciado
¿Cuál es la ecuación de dicha recta?

### Options
- [ ] A) $y = x + 1$ <!-- feedback: Incorrecto. No es perpendicular a y=x. -->
- [x] B) $y = -x + 5$ <!-- feedback: Correcto. Intersección: 3x=6 => x=2, y=3. Perpendicular a y=x tiene pendiente -1. Recta: y-3 = -1(x-2) => y = -x + 5. -->
- [ ] C) $y = -x + 3$ <!-- feedback: Incorrecto. No pasa por el punto (2, 3). -->
- [ ] D) $y = 2x - 1$ <!-- feedback: Incorrecto. No cumple la condición de perpendicularidad. -->

### Explicación Pedagógica
Este problema integra la resolución de sistemas con conceptos de geometría analítica (pendientes y perpendicularidad), exigiendo un manejo fluido de múltiples herramientas matemáticas.

---

## Question 19 (Difficulty D10)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Un sistema dinámico lineal describe la evolución de dos poblaciones $x$ e $y$. Se busca un punto de equilibrio donde $x_{next} = x$ y $y_{next} = y$, dado por:
$x = 0.8x + 0.3y$
$y = 0.2x + 0.7y$

### Enunciado
¿Qué se puede afirmar sobre las soluciones de este sistema de equilibrio?

### Options
- [ ] A) Solo existe la solución $(0,0)$. <!-- feedback: Incorrecto. Aunque es una solución, no es la única. -->
- [x] B) Tiene infinitas soluciones que cumplen la relación $2x = 3y$. <!-- feedback: Correcto. Ambas ecuaciones se reducen a 0.2x = 0.3y, lo que significa que cualquier par en esa proporción es un punto de equilibrio. -->
- [ ] C) No tiene solución. <!-- feedback: Incorrecto. El sistema es dependiente, no inconsistente. -->
- [ ] D) Tiene una solución única en $(100, 100)$. <!-- feedback: Incorrecto. No hay una restricción adicional para fijar un valor único. -->

### Explicación Pedagógica
Los sistemas lineales dependientes en modelos de poblaciones (como las Cadenas de Markov) indican que el equilibrio no es un punto fijo, sino una distribución o proporción estable entre las variables.

---

## Question 20 (Difficulty D10)

**ID:** `CO-MAT-11-P1-ecuaciones-lineales-003-MASTERY-v20`
**Bloom:** Create
**ICFES:** Pensamiento Reflexivo y Sistémico

### Contexto
Diseñe un sistema de ecuaciones lineales $2x2$ tal que su única solución sea el punto $(\pi, e)$.

### Enunciado
¿Cuál de los siguientes sistemas tiene exactamente esa solución irracional?

### Options
- [ ] A) $x = \pi$; $y = e$ <!-- feedback: Correcto, pero es un sistema trivial. Buscamos uno más entrelazado. -->
- [x] B) $x + y = \pi + e$; $x - y = \pi - e$ <!-- feedback: Correcto. Sumando: 2x = 2pi => x = pi. Restando: 2y = 2e => y = e. Es un sistema consistente determinado con la solución exacta requerida. -->
- [ ] C) $x/y = \pi/e$; $x+y = 1$ <!-- feedback: Incorrecto. La suma no coincidiría con los valores buscados. -->
- [ ] D) $x = 3.14$; $y = 2.71$ <!-- feedback: Incorrecto. Estos son solo aproximaciones racionales, no los valores exactos. -->

### Explicación Pedagógica
La creación de sistemas a partir de soluciones predeterminadas ayuda a entender cómo las restricciones algebraicas "atrapan" a las variables en puntos específicos del espacio numérico, incluso si estos son irracionales.
