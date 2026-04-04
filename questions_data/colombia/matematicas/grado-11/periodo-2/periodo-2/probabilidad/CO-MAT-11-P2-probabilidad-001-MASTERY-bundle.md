---
id: "CO-MAT-11-P2-probabilidad-001-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "probabilidad"
protocol_version: "5.1"
bundle_size: 20
alignment: "ICFES Saber 11 + MEN"
competencia_icfes: "Formulación y Ejecución"
afirmacion_icfes: "El estudiante modela eventos aleatorios, calcula probabilidades condicionadas y usa información parcial para sustentar inferencias."
referente_men: "Uso de conteo, relaciones entre eventos y análisis de información en experimentos aleatorios discretos."
periodo: 2
bundle_index: 3
modern_context: true
distractor_profile: "misconception_based"
calibration:
  expected_success_rate: 0.46
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "probabilidad_condicional, independencia, probabilidad_total, bayes, tablas_y_arboles"
---

# Bundle Mastery: Probabilidad

Este bundle desarrolla probabilidad condicional, independencia, eventos sucesivos, ley de probabilidad total y teorema de Bayes en situaciones cercanas al estilo de razonamiento del ICFES.

---

## Question 1 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.84

### Enunciado
¿Cuál expresión define la probabilidad condicional de A dado B, siempre que P(B) sea distinta de cero?

### Options
- [x] A) $P(A|B)=\\frac{P(A \\cap B)}{P(B)}$ <!-- feedback: Correcto. La probabilidad condicional restringe el espacio muestral al evento B. -->
- [ ] B) $P(A|B)=P(A)+P(B)$ <!-- feedback: Incorrecto. Esa suma no define probabilidad condicional. -->
- [ ] C) $P(A|B)=\\frac{P(A)}{P(B)}$ <!-- feedback: Incorrecto. Falta la intersección entre ambos eventos. -->
- [ ] D) $P(A|B)=P(A \\cup B)$ <!-- feedback: Incorrecto. La unión es otra operación entre eventos. -->

### Explicación Pedagógica
En la probabilidad condicional se analiza qué tan probable es A cuando ya se sabe que ocurrió B.

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Comunicación y Representación
**Expected_Success:** 0.8

### Enunciado
Si dos eventos A y B son independientes, ¿qué ocurre con $P(A|B)$?

### Options
- [x] A) Es igual a $P(A)$. <!-- feedback: Correcto. Si B no aporta información sobre A, la probabilidad de A no cambia. -->
- [ ] B) Siempre vale 0. <!-- feedback: Incorrecto. Eso solo ocurriría si fueran incompatibles y A no pudiera suceder con B. -->
- [ ] C) Siempre vale 1. <!-- feedback: Incorrecto. La independencia no implica certeza. -->
- [ ] D) Es igual a $P(B)-P(A)$. <!-- feedback: Incorrecto. Esa resta no corresponde a una regla válida. -->

### Explicación Pedagógica
La independencia expresa que conocer B no modifica la probabilidad de A.

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.74

### Contexto
En una bolsa hay 4 fichas rojas y 6 azules. Se extrae una ficha al azar.

### Enunciado
¿Cuál es la probabilidad de obtener una ficha roja?

### Options
- [x] A) $4/10$ <!-- feedback: Correcto. Hay 4 casos favorables entre 10 posibles. -->
- [ ] B) $6/10$ <!-- feedback: Incorrecto. Ese valor corresponde a la probabilidad de obtener azul. -->
- [ ] C) $4/6$ <!-- feedback: Incorrecto. El denominador debe ser el total de fichas. -->
- [ ] D) $1/4$ <!-- feedback: Incorrecto. Esa fracción no representa el experimento dado. -->

### Explicación Pedagógica
La probabilidad simple se construye con casos favorables sobre casos posibles.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.7

### Contexto
Se lanza un dado equilibrado de seis caras.

### Enunciado
¿Cuál es la probabilidad de obtener un número par?

### Options
- [ ] A) $2/6$ <!-- feedback: Incorrecto. Hay tres resultados pares posibles: 2, 4 y 6. -->
- [x] B) $3/6$ <!-- feedback: Correcto. La mitad de las caras del dado son pares. -->
- [ ] C) $4/6$ <!-- feedback: Incorrecto. Ese valor incluiría un resultado adicional que no es par. -->
- [ ] D) $1/6$ <!-- feedback: Incorrecto. Ese valor corresponde a un solo resultado específico. -->

### Explicación Pedagógica
Listar el espacio muestral ayuda a no perder casos favorables.

---

## Question 5 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.64

### Contexto
En un curso hay 20 estudiantes. Doce practican fútbol y, entre ellos, 5 también practican baloncesto.

### Enunciado
Si se elige al azar un estudiante que practica fútbol, ¿cuál es la probabilidad de que también practique baloncesto?

### Options
- [ ] A) $5/20$ <!-- feedback: Incorrecto. Ese denominador usa a todo el curso, no solo a quienes practican fútbol. -->
- [x] B) $5/12$ <!-- feedback: Correcto. El universo se restringe a los 12 estudiantes que practican fútbol. -->
- [ ] C) $12/20$ <!-- feedback: Incorrecto. Esa es la probabilidad de practicar fútbol, no la condicional pedida. -->
- [ ] D) $7/12$ <!-- feedback: Incorrecto. Ese valor corresponde a quienes practican fútbol pero no baloncesto. -->

### Explicación Pedagógica
En una condicional, el denominador cambia y solo cuenta los casos compatibles con la condición dada.

---

## Question 6 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.62

### Contexto
Una urna contiene 3 bolas blancas y 2 negras. Se extraen dos bolas sin reemplazo.

### Enunciado
¿Cuál es la probabilidad de sacar primero una blanca y luego una negra?

### Options
- [ ] A) $\\frac{3}{5}\\cdot\\frac{2}{5}$ <!-- feedback: Incorrecto. En la segunda extracción el total ya no es 5 porque no hay reemplazo. -->
- [x] B) $\\frac{3}{5}\\cdot\\frac{2}{4}$ <!-- feedback: Correcto. Después de sacar una blanca quedan 4 bolas, de las cuales 2 son negras. -->
- [ ] C) $\\frac{2}{5}\\cdot\\frac{3}{4}$ <!-- feedback: Incorrecto. Ese orden corresponde a negra y luego blanca. -->
- [ ] D) $\\frac{3}{4}$ <!-- feedback: Incorrecto. Esa fracción solo describe la segunda extracción y no el evento completo. -->

### Explicación Pedagógica
Cuando no hay reemplazo, cada extracción modifica el número total y la composición de la urna.

---

## Question 7 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.58

### Contexto
En un colegio, el 40% de los estudiantes participa en un club. El 30% toca un instrumento. El 15% cumple ambas condiciones.

### Enunciado
¿Cuál es la probabilidad de que un estudiante pertenezca al club o toque un instrumento?

### Options
- [ ] A) 0,25 <!-- feedback: Incorrecto. Ese resultado surge de restar en vez de combinar correctamente los eventos. -->
- [x] B) 0,55 <!-- feedback: Correcto. Se usa $P(A \\cup B)=P(A)+P(B)-P(A \\cap B)=0,40+0,30-0,15$. -->
- [ ] C) 0,70 <!-- feedback: Incorrecto. Esa suma cuenta dos veces a quienes cumplen ambas condiciones. -->
- [ ] D) 0,15 <!-- feedback: Incorrecto. Ese valor es la intersección, no la unión. -->

### Explicación Pedagógica
En la unión de eventos no excluyentes hay que evitar contar dos veces la parte común.

---

## Question 8 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.56

### Contexto
Una ruta escolar A se usa el 70% de los días y tiene 10% de probabilidad de retraso. La ruta B se usa el 30% de los días y tiene 20% de probabilidad de retraso.

### Enunciado
¿Cuál es la probabilidad total de que haya retraso en un día cualquiera?

### Options
- [ ] A) 0,30 <!-- feedback: Incorrecto. Ese valor suma porcentajes sin ponderarlos por su frecuencia de uso. -->
- [x] B) 0,13 <!-- feedback: Correcto. Se calcula $0,70\\cdot0,10 + 0,30\\cdot0,20 = 0,13$. -->
- [ ] C) 0,17 <!-- feedback: Incorrecto. Ese resultado altera uno de los productos parciales. -->
- [ ] D) 0,20 <!-- feedback: Incorrecto. Ese valor solo coincide con la tasa de la ruta B. -->

### Explicación Pedagógica
La probabilidad total combina distintos caminos posibles ponderando cada uno por su frecuencia.

---

## Question 9 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Comunicación y Representación
**Expected_Success:** 0.54

### Contexto
Se sabe que dos eventos son mutuamente excluyentes y que $P(B)>0$.

### Enunciado
¿Cuánto vale $P(A|B)$?

### Options
- [ ] A) $P(A)$ <!-- feedback: Incorrecto. Eso correspondería a independencia, no a exclusión mutua. -->
- [x] B) 0 <!-- feedback: Correcto. Si A y B no pueden ocurrir al mismo tiempo, la intersección es cero. -->
- [ ] C) 1 <!-- feedback: Incorrecto. La exclusión mutua no implica certeza de A cuando ocurre B. -->
- [ ] D) No se puede calcular nunca. <!-- feedback: Incorrecto. Sí se puede porque $P(B)$ es distinta de cero. -->

### Explicación Pedagógica
Si B ya ocurrió y A es incompatible con B, entonces A no puede ocurrir en ese escenario.

---

## Question 10 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.52

### Contexto
Se lanzan dos dados equilibrados.

### Enunciado
¿Cuál es la probabilidad de que la suma sea 7?

### Options
- [ ] A) $1/12$ <!-- feedback: Incorrecto. Hay más de un par ordenado que produce suma 7. -->
- [x] B) $6/36$ <!-- feedback: Correcto. Las parejas favorables son (1,6), (2,5), (3,4), (4,3), (5,2) y (6,1). -->
- [ ] C) $7/36$ <!-- feedback: Incorrecto. Ese valor cuenta un caso adicional inexistente. -->
- [ ] D) $1/6$ porque 7 es un solo número. <!-- feedback: Incorrecto. El experimento depende de parejas ordenadas, no solo del resultado final. -->

### Explicación Pedagógica
Cuando se combinan dos dados, el espacio muestral tiene 36 resultados equiprobables.

---

## Question 11 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.48

### Contexto
En una tabla de contingencia, 80 estudiantes usan celular en clase y 50 usan computador. Treinta usan ambos dispositivos.

### Enunciado
Si se elige al azar un estudiante que usa celular, ¿cuál es la probabilidad de que también use computador?

### Options
- [ ] A) $30/50$ <!-- feedback: Incorrecto. Ese denominador restringe a quienes usan computador, no a quienes usan celular. -->
- [x] B) $30/80$ <!-- feedback: Correcto. La condición fija el universo en quienes usan celular. -->
- [ ] C) $30/130$ <!-- feedback: Incorrecto. Ese denominador suma usuarios de ambos dispositivos sin corregir la intersección. -->
- [ ] D) $50/80$ <!-- feedback: Incorrecto. Ese valor no corresponde a la intersección requerida. -->

### Explicación Pedagógica
En una condicional, el denominador se toma del grupo definido por la condición.

---

## Question 12 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v12`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.46

### Contexto
Una fábrica recibe piezas de dos proveedores. El proveedor A entrega el 60% de las piezas y el proveedor B el 40%. El 3% de las piezas de A sale defectuosa y el 5% de las de B también.

### Enunciado
¿Cuál es la probabilidad de escoger una pieza defectuosa del total producido?

### Options
- [ ] A) 0,08 <!-- feedback: Incorrecto. Esa suma ignora las proporciones de aporte de cada proveedor. -->
- [x] B) 0,038 <!-- feedback: Correcto. Se calcula $0,60\\cdot0,03 + 0,40\\cdot0,05 = 0,038$. -->
- [ ] C) 0,03 <!-- feedback: Incorrecto. Ese valor solo corresponde al proveedor A. -->
- [ ] D) 0,05 <!-- feedback: Incorrecto. Ese valor solo corresponde al proveedor B. -->

### Explicación Pedagógica
Cuando hay varias fuentes posibles, la probabilidad total exige ponderar cada probabilidad parcial.

---

## Question 13 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.44

### Contexto
Un estudiante afirma: "Si la probabilidad de lluvia es 0,3 y la de tráfico es 0,8, entonces la probabilidad de lluvia y tráfico es 1,1".

### Enunciado
¿Cuál es el error principal de esa afirmación?

### Options
- [ ] A) Que 1,1 es imposible como probabilidad, aunque eso no corrige por sí solo la regla para calcular la intersección. <!-- feedback: Incorrecto. Superar 1 muestra una alerta, pero el error conceptual central es sumar probabilidades simples para una conjunción. -->
- [ ] B) Que el tráfico no puede tener probabilidad 0,8. <!-- feedback: Incorrecto. Una probabilidad de 0,8 sí es posible. -->
- [x] C) Que una intersección no se obtiene sumando probabilidades simples. <!-- feedback: Correcto. Para una conjunción se necesita información de dependencia o una condicional. -->
- [ ] D) Que 0,3 y 0,8 nunca pueden aparecer en el mismo problema. <!-- feedback: Incorrecto. Esos valores sí pueden coexistir. -->

### Explicación Pedagógica
La intersección entre eventos requiere una relación multiplicativa, no una suma directa.

---

## Question 14 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v14`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.42

### Contexto
En una caja hay 5 tarjetas numeradas del 1 al 5. Se extraen dos sin reemplazo.

### Enunciado
¿Cuál es la probabilidad de obtener primero un número impar y luego un número par?

### Options
- [ ] A) $\\frac{3}{5}\\cdot\\frac{2}{5}$ <!-- feedback: Incorrecto. En la segunda extracción quedan 4 tarjetas, no 5. -->
- [x] B) $\\frac{3}{5}\\cdot\\frac{2}{4}$ <!-- feedback: Correcto. Hay 3 impares inicialmente y, tras sacar uno, quedan 2 pares entre 4 tarjetas. -->
- [ ] C) $\\frac{2}{5}\\cdot\\frac{3}{4}$ <!-- feedback: Incorrecto. Ese orden corresponde a par y luego impar. -->
- [ ] D) $\\frac{1}{2}$ <!-- feedback: Incorrecto. Ese valor no surge del árbol del experimento. -->

### Explicación Pedagógica
En eventos sucesivos sin reemplazo importa el orden y cambia la composición del conjunto.

---

## Question 15 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.4

### Contexto
En una encuesta, el 25% de las personas prefiere estudiar en la mañana. De quienes prefieren la mañana, el 60% también trabaja.

### Enunciado
¿Qué representa el producto $0,25\\cdot0,60$?

### Options
- [ ] A) La probabilidad de trabajar dada la preferencia por la mañana. <!-- feedback: Incorrecto. Esa condicional ya es 0,60. -->
- [x] B) La probabilidad de que una persona prefiera la mañana y además trabaje. <!-- feedback: Correcto. Se trata de una probabilidad conjunta. -->
- [ ] C) La probabilidad de que una persona trabaje o prefiera la mañana. <!-- feedback: Incorrecto. La unión no se obtiene con ese producto. -->
- [ ] D) La probabilidad de que una persona no trabaje. <!-- feedback: Incorrecto. No corresponde al complemento. -->

### Explicación Pedagógica
Multiplicar una probabilidad base por una condicional permite construir una intersección.

---

## Question 16 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v16`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.38

### Contexto
Un examen tiene 4 preguntas de verdadero o falso, contestadas al azar.

### Enunciado
¿Cuál es la probabilidad de acertar todas las preguntas?

### Options
- [ ] A) $1/8$ <!-- feedback: Incorrecto. Ese valor correspondería a acertar 3 decisiones binarias, no 4. -->
- [x] B) $1/16$ <!-- feedback: Correcto. La probabilidad es $(1/2)^4$. -->
- [ ] C) $1/4$ <!-- feedback: Incorrecto. Esa fracción solo corresponde a acertar dos decisiones binarias. -->
- [ ] D) $4/16$ <!-- feedback: Incorrecto. No basta contar preguntas; se requiere multiplicar probabilidades independientes. -->

### Explicación Pedagógica
Cuando cada decisión es binaria e independiente, se multiplican las probabilidades de acierto en cada paso.

---

## Question 17 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v17`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.34

### Contexto
Una prueba detecta una enfermedad con sensibilidad del 90%. Entre las personas sanas, arroja positivo en el 5%. La prevalencia de la enfermedad es 1%.

### Enunciado
Si una persona obtiene resultado positivo, ¿qué valor se necesita en el denominador para aplicar Bayes y calcular la probabilidad de estar realmente enferma?

### Options
- [ ] A) Solo $0,90$ <!-- feedback: Incorrecto. Falta incluir los falsos positivos. -->
- [ ] B) Solo $0,05$ <!-- feedback: Incorrecto. Ese valor solo representa positivos entre sanos. -->
- [x] C) La probabilidad total de obtener positivo. <!-- feedback: Correcto. Bayes requiere dividir por todos los positivos posibles, verdaderos y falsos. -->
- [ ] D) La prevalencia, es decir, 0,01. <!-- feedback: Incorrecto. La prevalencia es parte del numerador, no el denominador final. -->

### Explicación Pedagógica
En Bayes, el denominador recoge todos los caminos que producen la evidencia observada.

---

## Question 18 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v18`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.32

### Contexto
Con los datos del problema anterior, la probabilidad de un positivo verdadero es $0,01\\cdot0,90=0,009$ y la de un falso positivo es $0,99\\cdot0,05=0,0495$.

### Enunciado
¿Cuál es la probabilidad aproximada de estar enfermo dado que el resultado fue positivo?

### Options
- [ ] A) 90% <!-- feedback: Incorrecto. Esa es la sensibilidad, no la probabilidad posterior. -->
- [x] B) $0,009/(0,009+0,0495)$, aproximadamente 15,4% <!-- feedback: Correcto. Se divide la cantidad de positivos verdaderos entre todos los positivos. -->
- [ ] C) 1% <!-- feedback: Incorrecto. Ese valor es la prevalencia inicial antes de ver el resultado. -->
- [ ] D) 5% <!-- feedback: Incorrecto. Ese valor es la tasa de falsos positivos entre sanos. -->

### Explicación Pedagógica
Bayes muestra que un resultado positivo no siempre implica una probabilidad alta cuando la enfermedad es poco frecuente.

---

## Question 19 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.3

### Contexto
En un salón, 14 estudiantes aprobaron Matemáticas, 10 aprobaron Física y 6 aprobaron ambas. El grupo tiene 25 estudiantes.

### Enunciado
Si se elige al azar un estudiante que aprobó Física, ¿qué interpretación es correcta para la razón $6/10$?

### Options
- [ ] A) La probabilidad de aprobar Matemáticas en todo el salón. <!-- feedback: Incorrecto. Ese valor no usa el total del grupo. -->
- [x] B) La probabilidad de que un estudiante haya aprobado Matemáticas dado que aprobó Física. <!-- feedback: Correcto. La condición fija el universo en los 10 que aprobaron Física. -->
- [ ] C) La probabilidad de aprobar al menos una de las dos asignaturas. <!-- feedback: Incorrecto. La unión requiere otra cuenta. -->
- [ ] D) La probabilidad de no aprobar ninguna. <!-- feedback: Incorrecto. Ese valor no se obtiene de la fracción dada. -->

### Explicación Pedagógica
Una razón del tipo intersección sobre grupo condicionado representa una probabilidad condicional.

---

## Question 20 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v20`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación
**Expected_Success:** 0.28

### Contexto
Un estudiante dice: "Como en un juego salieron tres veces seguidas caras, ahora es más probable que salga sello".

### Enunciado
Si la moneda es equilibrada y cada lanzamiento es independiente, ¿qué respuesta corrige mejor esa afirmación?

### Options
- [ ] A) Tiene razón, porque la moneda necesita compensar los resultados anteriores. <!-- feedback: Incorrecto. La independencia impide esa compensación. -->
- [x] B) No tiene razón; la probabilidad de sello sigue siendo 1/2 en el siguiente lanzamiento. <!-- feedback: Correcto. Los resultados previos no alteran la probabilidad de un lanzamiento independiente. -->
- [ ] C) Tiene razón solo si la cara salió exactamente tres veces. <!-- feedback: Incorrecto. El número de repeticiones no cambia la independencia del siguiente lanzamiento. -->
- [ ] D) No se puede hablar de probabilidad porque ya ocurrió una secuencia. <!-- feedback: Incorrecto. Sí se puede analizar la probabilidad del siguiente evento. -->

### Explicación Pedagógica
La llamada falacia del jugador consiste en creer que los resultados pasados fuerzan una compensación en experimentos independientes.
