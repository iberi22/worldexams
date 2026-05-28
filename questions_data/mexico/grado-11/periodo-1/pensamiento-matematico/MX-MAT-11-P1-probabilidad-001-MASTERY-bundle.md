---
id: "MX-MAT-11-P1-probabilidad-001-MASTERY"
country: "mexico"
grado: 11
asignatura: "pensamiento-matematico"
tema: "probabilidad"
periodo: 1
protocol_version: "5.1"
bundle_index: 1
bundle_size: 20
alignment: "EXANI-II CENEVAL"
modern_context: true
distractor_profile: "misconception_based"
calibration:
  expected_success_rate: 0.65
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
---

# MASTERY Bundle — Probabilidad (001)

## Bloque A — Nivel D3–D4: Conceptos Básicos y Espacio Muestral

---

## Question 1 [D3-D4]

**ID:** `MX-MAT-11-P1-probabilidad-001-v1`
**Bloom:** Remember
**Competencia:** Pensamiento Matemático
**Context:** Definición de probabilidad clásica.

### Enunciado
¿Cómo se calcula la probabilidad clásica de que ocurra un evento A?

### Options
- [ ] A) Dividiendo los casos favorables entre los casos imposibles. <!-- feedback: Incorrecto. Los casos imposibles no son parte del cálculo de probabilidad. -->
- [x] B) Dividiendo el número de resultados favorables entre el número total de resultados posibles. <!-- feedback: Correcto. Esta es la Regla de Laplace. -->
- [ ] C) Multiplicando los resultados favorables por los resultados posibles. <!-- feedback: Incorrecto. La probabilidad es una razón, no un producto. -->
- [ ] D) Restando los casos desfavorables de los favorables. <!-- feedback: Incorrecto. Esto no define la probabilidad. -->

### Explicación Pedagógica
La probabilidad clásica o de Laplace es la base del estudio del azar en el nivel medio superior.

---

## Question 2 [D3-D4]

**ID:** `MX-MAT-11-P1-probabilidad-001-v2`
**Bloom:** Understand
**Competencia:** Pensamiento Matemático
**Context:** Lanzamiento de dados en una feria local.

### Enunciado
Al lanzar un dado justo de seis caras, ¿cuál es el espacio muestral del experimento?

### Options
- [ ] A) {1, 3, 5} <!-- feedback: Incorrecto. Este es el evento de obtener un número impar. -->
- [x] B) {1, 2, 3, 4, 5, 6} <!-- feedback: Correcto. El espacio muestral incluye todos los resultados posibles del experimento. -->
- [ ] C) {6} <!-- feedback: Incorrecto. Este es solo uno de los posibles resultados. -->
- [ ] D) {0, 1, 2, 3, 4, 5} <!-- feedback: Incorrecto. Los dados estándar no tienen cara con el número 0. -->

### Explicación Pedagógica
Identificar correctamente el espacio muestral es el primer paso para calcular cualquier probabilidad.

---

## Question 3 [D3-D4]

**ID:** `MX-MAT-11-P1-probabilidad-001-v3`
**Bloom:** Understand
**Competencia:** Pensamiento Matemático
**Context:** Eventos complementarios.

### Enunciado
Si la probabilidad de que llueva hoy en la Ciudad de México es de 0.35, ¿cuál es la probabilidad de que NO llueva?

### Options
- [ ] A) 0.35 <!-- feedback: Incorrecto. Esta es la probabilidad de que sí llueva. -->
- [x] B) 0.65 <!-- feedback: Correcto. P(A') = 1 - P(A) = 1 - 0.35 = 0.65. -->
- [ ] C) 1.35 <!-- feedback: Incorrecto. La probabilidad nunca puede ser mayor a 1. -->
- [ ] D) 0.00 <!-- feedback: Incorrecto. No hay evidencia de que sea un evento imposible. -->

### Explicación Pedagógica
La suma de la probabilidad de un evento y su complemento siempre es igual a 1.

---

## Question 4 [D3-D4]

**ID:** `MX-MAT-11-P1-probabilidad-001-v4`
**Bloom:** Apply
**Competencia:** Pensamiento Matemático
**Context:** Urna con pelotas de colores.

### Enunciado
En una urna hay 5 pelotas rojas, 3 azules y 2 verdes. Si se extrae una pelota al azar, ¿cuál es la probabilidad de que sea azul?

### Options
- [ ] A) 1/3 <!-- feedback: Incorrecto. Hay 3 azules, pero el total no es 9. -->
- [x] B) 0.3 <!-- feedback: Correcto. Total = 5+3+2 = 10. Probabilidad = 3/10 = 0.3. -->
- [ ] C) 0.5 <!-- feedback: Incorrecto. Esta es la probabilidad de que sea roja. -->
- [ ] D) 3 <!-- feedback: Incorrecto. La probabilidad debe estar entre 0 y 1. -->

### Explicación Pedagógica
Aplicación directa de la regla de Laplace dividiendo casos favorables (3 azules) entre el total (10 pelotas).

---

## Bloque B — Nivel D5–D6: Eventos Compuestos y Conteo

---

## Question 5 [D5-D6]

**ID:** `MX-MAT-11-P1-probabilidad-001-v5`
**Bloom:** Understand
**Competencia:** Pensamiento Matemático
**Context:** Eventos independientes (moneda y dado).

### Enunciado
Se lanza una moneda y un dado. ¿Cuál es la probabilidad de obtener "águila" en la moneda y un número "4" en el dado?

### Options
- [ ] A) 1/2 <!-- feedback: Incorrecto. Esta es solo la probabilidad de la moneda. -->
- [ ] B) 1/6 <!-- feedback: Incorrecto. Esta es solo la probabilidad del dado. -->
- [x] C) 1/12 <!-- feedback: Correcto. Como son independientes: P(A y B) = P(A) * P(B) = (1/2) * (1/6) = 1/12. -->
- [ ] D) 2/8 <!-- feedback: Incorrecto. Sumó los denominadores en lugar de multiplicarlos. -->

### Explicación Pedagógica
Para eventos independientes, la probabilidad de que ocurran ambos simultáneamente es el producto de sus probabilidades individuales.

---

## Question 6 [D5-D6]

**ID:** `MX-MAT-11-P1-probabilidad-001-v6`
**Bloom:** Understand
**Competencia:** Pensamiento Matemático
**Context:** Eventos mutuamente excluyentes.

### Enunciado
En una baraja de 52 cartas, ¿cuál es la probabilidad de extraer una carta que sea un "As" o un "Rey"?

### Options
- [ ] A) 1/52 <!-- feedback: Incorrecto. Esta es la probabilidad de una carta específica. -->
- [x] B) 2/13 <!-- feedback: Correcto. P(As o Rey) = P(As) + P(Rey) = 4/52 + 4/52 = 8/52 = 2/13. -->
- [ ] C) 1/26 <!-- feedback: Incorrecto. Olvidó sumar uno de los tipos de cartas. -->
- [ ] D) 8/104 <!-- feedback: Incorrecto. Error al manejar el denominador común. -->

### Explicación Pedagógica
Los eventos son mutuamente excluyentes porque una carta no puede ser As y Rey al mismo tiempo; por ello, se suman las probabilidades.

---

## Question 7 [D5-D6]

**ID:** `MX-MAT-11-P1-probabilidad-001-v7`
**Bloom:** Apply
**Competencia:** Pensamiento Matemático
**Context:** Principio multiplicativo de conteo.

### Enunciado
Un estudiante tiene 3 pantalones diferentes, 4 camisas y 2 pares de zapatos. ¿De cuántas formas distintas puede vestirse usando una prenda de cada tipo?

### Options
- [ ] A) 9 <!-- feedback: Incorrecto. Sumó las opciones en lugar de multiplicarlas. -->
- [x] B) 24 <!-- feedback: Correcto. 3 * 4 * 2 = 24 combinaciones posibles. -->
- [ ] C) 12 <!-- feedback: Incorrecto. Olvidó multiplicar por el número de zapatos. -->
- [ ] D) 48 <!-- feedback: Incorrecto. Error en la multiplicación. -->

### Explicación Pedagógica
El principio fundamental del conteo establece que si un evento ocurre de "n" formas y otro de "m" formas, ambos ocurren de "n * m" formas.

---

## Question 8 [D5-D6]

**ID:** `MX-MAT-11-P1-probabilidad-001-v8`
**Bloom:** Apply
**Competencia:** Pensamiento Matemático
**Context:** Probabilidad sin reemplazo.

### Enunciado
En una caja hay 4 canicas verdes y 6 amarillas. Si se extraen dos canicas una tras otra SIN reemplazo, ¿cuál es la probabilidad de que ambas sean verdes?

### Options
- [ ] A) 16/100 <!-- feedback: Incorrecto. Esto sería si hubiera reemplazo. -->
- [x] B) 2/15 <!-- feedback: Correcto. P(G1) = 4/10. P(G2|G1) = 3/9. Producto = (4/10) * (3/9) = 12/90 = 2/15. -->
- [ ] C) 4/10 <!-- feedback: Incorrecto. Esta es solo la probabilidad de la primera extracción. -->
- [ ] D) 12/100 <!-- feedback: Incorrecto. Usó el total original para la segunda extracción. -->

### Explicación Pedagógica
En el muestreo sin reemplazo, el total de elementos y el número de elementos favorables disminuyen para la segunda extracción.

---

## Question 9 [D5-D6]

**ID:** `MX-MAT-11-P1-probabilidad-001-v9`
**Bloom:** Apply
**Competencia:** Pensamiento Matemático
**Context:** Permutaciones simples.

### Enunciado
¿De cuántas maneras se pueden sentar 5 amigos en una fila de 5 butacas en el cine?

### Options
- [ ] A) 5 <!-- feedback: Incorrecto. No consideró todas las posiciones. -->
- [ ] B) 25 <!-- feedback: Incorrecto. Elevó al cuadrado en lugar de usar factorial. -->
- [x] C) 120 <!-- feedback: Correcto. P = 5! = 5 * 4 * 3 * 2 * 1 = 120. -->
- [ ] D) 60 <!-- feedback: Incorrecto. Error en el cálculo del factorial. -->

### Explicación Pedagógica
Cuando importa el orden y se usan todos los elementos, se aplica la fórmula de permutación (n!).

---

## Question 10 [D5-D6]

**ID:** `MX-MAT-11-P1-probabilidad-001-v10`
**Bloom:** Understand
**Competencia:** Pensamiento Matemático
**Context:** Probabilidad de la unión (eventos no excluyentes).

### Enunciado
En un grupo de 20 personas, 10 hablan inglés, 8 hablan francés y 4 hablan ambos idiomas. ¿Cuál es la probabilidad de elegir a alguien que hable inglés o francés?

### Options
- [ ] A) 0.9 <!-- feedback: Incorrecto. Sumó todas las cantidades sin restar la intersección. -->
- [x] B) 0.7 <!-- feedback: Correcto. P(A o B) = P(A) + P(B) - P(A y B) = 10/20 + 8/20 - 4/20 = 14/20 = 0.7. -->
- [ ] C) 0.5 <!-- feedback: Incorrecto. Solo consideró a los que hablan inglés. -->
- [ ] D) 0.4 <!-- feedback: Incorrecto. Solo consideró a los que hablan francés. -->

### Explicación Pedagógica
Para eventos no excluyentes, se debe restar la intersección para no contar dos veces a las mismas personas.

---

## Bloque C — Nivel D7–D8: Combinatoria y Probabilidad Condicional

---

## Question 11 [D7-D8]

**ID:** `MX-MAT-11-P1-probabilidad-001-v11`
**Bloom:** Apply
**Competencia:** Pensamiento Matemático
**Context:** Combinaciones en un equipo deportivo.

### Enunciado
¿Cuántos equipos diferentes de 3 jugadores se pueden formar a partir de un grupo de 7 interesados?

### Options
- [ ] A) 210 <!-- feedback: Incorrecto. Este es el número de permutaciones (importa el orden). -->
- [x] B) 35 <!-- feedback: Correcto. C(7,3) = 7! / (3! * 4!) = (7*6*5) / (3*2*1) = 35. -->
- [ ] C) 21 <!-- feedback: Incorrecto. Error de cálculo en la fórmula de combinaciones. -->
- [ ] D) 7 <!-- feedback: Incorrecto. No aplicó la lógica de selección de grupos. -->

### Explicación Pedagógica
Se utiliza la fórmula de combinaciones porque el orden de los jugadores en el equipo no altera al equipo mismo.

---

## Question 12 [D7-D8]

**ID:** `MX-MAT-11-P1-probabilidad-001-v12`
**Bloom:** Analyze
**Competencia:** Pensamiento Matemático
**Context:** Probabilidad condicional en estudios médicos.

### Enunciado
En una población, el 40% son hombres. Se sabe que el 10% de los hombres fuman, mientras que el 5% de las mujeres fuman. Si se elige una persona al azar y resulta ser fumadora, ¿cuál es la probabilidad de que sea hombre?

### Options
- [ ] A) 0.4 <!-- feedback: Incorrecto. Esta es la probabilidad de ser hombre en general. -->
- [x] B) 0.57 <!-- feedback: Correcto. P(H|F) = P(H y F) / P(F). P(H y F) = 0.4 * 0.1 = 0.04. P(M y F) = 0.6 * 0.05 = 0.03. P(F) = 0.07. P(H|F) = 0.04/0.07 ≈ 0.57. -->
- [ ] C) 0.1 <!-- feedback: Incorrecto. Esta es la probabilidad de que un hombre fume. -->
- [ ] D) 0.04 <!-- feedback: Incorrecto. Esta es la probabilidad de ser hombre y fumador. -->

### Explicación Pedagógica
Aplicación del Teorema de Bayes o probabilidad condicional para invertir la condición dada.

---

## Question 13 [D7-D8]

**ID:** `MX-MAT-11-P1-probabilidad-001-v13`
**Bloom:** Apply
**Competencia:** Pensamiento Matemático
**Context:** Lanzamiento de dos dados (suma de puntos).

### Enunciado
Al lanzar dos dados estándar, ¿cuál es la probabilidad de que la suma de sus puntos sea igual a 7?

### Options
- [ ] A) 1/12 <!-- feedback: Incorrecto. Solo consideró 3 casos favorables. -->
- [x] B) 1/6 <!-- feedback: Correcto. Casos favorables: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). Total 6. Total posibles 36. 6/36 = 1/6. -->
- [ ] C) 7/36 <!-- feedback: Incorrecto. Confundió el valor de la suma con el número de casos. -->
- [ ] D) 5/36 <!-- feedback: Incorrecto. Olvidó algunos casos favorables. -->

### Explicación Pedagógica
Para problemas de dos dados, es útil visualizar el espacio muestral de 6x6 (36 resultados).

---

## Question 14 [D7-D8]

**ID:** `MX-MAT-11-P1-probabilidad-001-v14`
**Bloom:** Analyze
**Competencia:** Pensamiento Matemático
**Context:** Distribución binomial (conceptos).

### Enunciado
Un examen consta de 5 preguntas de opción múltiple con 4 opciones cada una. Si un estudiante responde al azar, ¿cuál es la probabilidad de que acierte exactamente a todas las preguntas?

### Options
- [ ] A) 1/4 <!-- feedback: Incorrecto. Esta es la probabilidad de una sola pregunta. -->
- [ ] B) 1/20 <!-- feedback: Incorrecto. Multiplicó 4 * 5 en lugar de elevar a la potencia. -->
- [x] C) 1/1024 <!-- feedback: Correcto. P = (1/4)^5 = 1/1024. -->
- [ ] D) 1/5 <!-- feedback: Incorrecto. No consideró el número de opciones. -->

### Explicación Pedagógica
Cada pregunta es un evento independiente con probabilidad 1/4. La probabilidad conjunta es el producto.

---

## Question 15 [D7-D8]

**ID:** `MX-MAT-11-P1-probabilidad-001-v15`
**Bloom:** Apply
**Competencia:** Pensamiento Matemático
**Context:** Permutaciones con repetición.

### Enunciado
¿Cuántas palabras diferentes (con o sin sentido) se pueden formar reordenando las letras de la palabra "MEXICO"?

### Options
- [ ] A) 120 <!-- feedback: Incorrecto. La palabra tiene 6 letras, no 5. -->
- [x] B) 720 <!-- feedback: Correcto. 6! = 720. No hay letras repetidas. -->
- [ ] C) 36 <!-- feedback: Incorrecto. Elevó 6 al cuadrado. -->
- [ ] D) 24 <!-- feedback: Incorrecto. Error de cálculo. -->

### Explicación Pedagógica
Como todas las letras son distintas, se trata de una permutación lineal de 6 elementos.

---

## Question 16 [D7-D8]

**ID:** `MX-MAT-11-P1-probabilidad-001-v16`
**Bloom:** Analyze
**Competencia:** Pensamiento Matemático
**Context:** Probabilidad de "al menos uno".

### Enunciado
Si lanzas una moneda 3 veces, ¿cuál es la probabilidad de obtener al menos un "sol"?

### Options
- [ ] A) 1/8 <!-- feedback: Incorrecto. Esta es la probabilidad de obtener "cero" soles (todas águilas). -->
- [ ] B) 1/2 <!-- feedback: Incorrecto. Estimación intuitiva errónea. -->
- [x] C) 7/8 <!-- feedback: Correcto. P(al menos 1) = 1 - P(ninguno) = 1 - (1/2)^3 = 1 - 1/8 = 7/8. -->
- [ ] D) 3/8 <!-- feedback: Incorrecto. Confundió con la probabilidad de obtener exactamente 1 sol. -->

### Explicación Pedagógica
Calcular el complemento (ningún sol) suele ser más sencillo que sumar todos los casos favorables.

---

## Bloque D — Nivel D9–D10: Modelado y Problemas Complejos

---

## Question 17 [D9-D10]

**ID:** `MX-MAT-11-P1-probabilidad-001-v17`
**Bloom:** Evaluate
**Competencia:** Pensamiento Matemático
**Context:** Selección de subgrupos con restricciones.

### Enunciado
En un salón hay 6 hombres y 4 mujeres. Se desea formar un comité de 3 personas donde al menos una sea mujer. ¿De cuántas formas se puede elegir dicho comité?

### Options
- [ ] A) 120 <!-- feedback: Incorrecto. Total de combinaciones sin restricciones. -->
- [x] B) 100 <!-- feedback: Correcto. Total combinaciones = C(10,3) = 120. Combinaciones sin mujeres (solo hombres) = C(6,3) = 20. Al menos una mujer = 120 - 20 = 100. -->
- [ ] C) 20 <!-- feedback: Incorrecto. Este es el número de comités formados solo por hombres. -->
- [ ] D) 60 <!-- feedback: Incorrecto. Error en la aplicación del principio aditivo/sustractivo. -->

### Explicación Pedagógica
Se utiliza la técnica de conteo por complemento para simplificar el cálculo de la condición "al menos una".

---

## Question 18 [D9-D10]

**ID:** `MX-MAT-11-P1-probabilidad-001-v18`
**Bloom:** Evaluate
**Competencia:** Pensamiento Matemático
**Context:** Probabilidad condicional avanzada.

### Enunciado
Se tienen dos cajas. La caja A contiene 2 canicas rojas y 1 azul. La caja B contiene 1 roja y 2 azules. Se elige una caja al azar y luego se extrae una canica. Si la canica es roja, ¿cuál es la probabilidad de que provenga de la caja A?

### Options
- [ ] A) 1/2 <!-- feedback: Incorrecto. No considera que la probabilidad de extraer roja es distinta en cada caja. -->
- [x] B) 2/3 <!-- feedback: Correcto. P(A|R) = P(A y R) / P(R). P(A y R) = 1/2 * 2/3 = 1/3. P(B y R) = 1/2 * 1/3 = 1/6. P(R) = 1/3 + 1/6 = 3/6 = 1/2. P(A|R) = (1/3) / (1/2) = 2/3. -->
- [ ] C) 1/3 <!-- feedback: Incorrecto. Probabilidad de que sea de la caja B dado que es roja. -->
- [ ] D) 3/4 <!-- feedback: Incorrecto. Error en el cálculo de las probabilidades totales. -->

### Explicación Pedagógica
Este problema requiere el uso sistemático de la probabilidad total y la definición de probabilidad condicional.

---

## Question 19 [D9-D10]

**ID:** `MX-MAT-11-P1-probabilidad-001-v19`
**Bloom:** Analyze
**Competencia:** Pensamiento Matemático
**Context:** Esperanza matemática (juegos de azar).

### Enunciado
En un juego de feria en Zapopan, pagas $10 pesos por participar. Giras una ruleta donde tienes 1/10 de probabilidad de ganar $50 pesos y 9/10 de no ganar nada. ¿Cuál es la ganancia esperada por juego para el jugador?

### Options
- [ ] A) $5 pesos <!-- feedback: Incorrecto. Este es el valor esperado del premio, pero no resta el costo de entrada. -->
- [x] B) -$5 pesos <!-- feedback: Correcto. Esperanza = (1/10 * 50) + (9/10 * 0) - 10 = 5 - 10 = -5. -->
- [ ] C) $0 pesos <!-- feedback: Incorrecto. El juego no es justo. -->
- [ ] D) $40 pesos <!-- feedback: Incorrecto. Solo restó el costo del premio sin ponderar. -->

### Explicación Pedagógica
La esperanza matemática ayuda a determinar si un juego es favorable, desfavorable o justo para el participante.

---

## Question 20 [D9-D10]

**ID:** `MX-MAT-11-P1-probabilidad-001-v20`
**Bloom:** Evaluate
**Competencia:** Pensamiento Matemático
**Context:** Caminos en una red (combinatoria).

### Enunciado
En una cuadrícula de 3x3 calles, ¿cuántas rutas diferentes existen para ir de la esquina inferior izquierda a la superior derecha moviéndose solo hacia el Norte o hacia el Este?

### Options
- [ ] A) 9 <!-- feedback: Incorrecto. Sumó las dimensiones. -->
- [ ] B) 12 <!-- feedback: Incorrecto. Error en el razonamiento de caminos. -->
- [x] C) 20 <!-- feedback: Correcto. Se deben dar 6 pasos totales (3N, 3E). Caminos = C(6,3) = 6! / (3! * 3!) = 720 / 36 = 20. -->
- [ ] D) 36 <!-- feedback: Incorrecto. Error en el cálculo de la combinación. -->

### Explicación Pedagógica
Este problema clásico de combinatoria se resuelve mediante permutaciones con repetición o combinaciones, modelando los movimientos como una secuencia de pasos.
