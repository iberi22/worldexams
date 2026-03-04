---
id: "CO-MAT-11-counting-techniques-001-PRO"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Técnicas de Conteo: Permutaciones y Combinaciones"
periodo: 4
protocol_version: "4.1"
total_questions: 20
difficulty_range: "4-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["Interpretación", "Formulación", "Argumentación"]
cognitive_levels: ["Analyze", "Evaluate", "Synthesis", "Transfer"]
estado: "draft"
creador: "Antigravity (Protocol v4.1)"
generation_date: "2026-03-03"
source: "Saber 11 - Mathematics Framework"
source_license: "CC BY-SA 4.0"
---

## Contexto 1: El Arte de Contar Posibilidades
En un mundo lleno de datos, saber cuántas opciones existen es la base de la toma de decisiones informadas. Desde la creación de contraseñas seguras hasta la organización de un torneo deportivo o la secuenciación del ADN, el conteo sistemático nos permite entender la magnitud de los problemas que enfrentamos. Las técnicas de conteo se dividen principalmente en dos: las **Permutaciones**, donde el orden es vital (como en un código pin), y las **Combinaciones**, donde el orden no importa (como en los ingredientes de una ensalada o los números de una lotería). Este bundle explora las herramientas para cuantificar el azar.

---

## Question 1 (Analisis - Dificultad 4)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v1`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Un estudiante debe elegir una clave de 3 dígitos diferentes para su casillero usando los números del 1 al 9. ¿Qué técnica de conteo debe usar para saber cuántas claves posibles existen?

### Opciones
- [x] A) Permutación (porque el orden de los dígitos altera la clave).
- [ ] B) Combinación (porque los números son los mismos sin importar el orden).
- [ ] C) Principio Aditivo.
- [ ] D) Simetría.

### Explicación Pedagógica
En una clave, el orden es fundamental: la clave 1-2-3 no despeja el candado si la correcta es 3-2-1. Cuando el orden importa para definir el resultado, hablamos de una permutación.

---

## Question 2 (Evaluación - Dificultad 5)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v2`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
¿De cuántas maneras diferentes pueden sentarse 5 personas en una fila de 5 sillas?

### Opciones
- [ ] A) 5
- [ ] B) 25
- [x] C) 120 (Operación: $5! = 5 \cdot 4 \cdot 3 \cdot 2 \cdot 1$)
- [ ] D) 10

### Explicación Pedagógica
Este es un problema de permutación simple (factorial).
Para la primera silla hay 5 opciones, para la segunda 4, y así sucesivamente.
$5! = 120$. A medida que el número de personas sube, las posibilidades explotan rápidamente.

---

## Question 3 (Síntesis - Dificultad 7)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Un comité de 3 personas será elegido de un grupo de 10 voluntarios. Seleccione TODAS las afirmaciones correctas sobre este proceso de conteo.

### Opciones
- [x] A) Se debe usar una combinación porque el orden de los miembros no afecta al comité. <!-- weight: 1.0 -->
- [x] B) El número de formas es $C(10, 3) = \frac{10 \cdot 9 \cdot 8}{3 \cdot 2 \cdot 1} = 120$. <!-- weight: 1.0 -->
- [ ] C) El número de formas es $P(10, 3) = 720$.
- [x] D) Hay menos combinaciones que permutaciones para los mismos datos. <!-- weight: 1.0 -->
- [ ] E) Si una persona es el presidente y otra el secretario, seguiría siendo una combinación.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B) En un comité general, ser elegido primero o tercero da el mismo resultado (estás en el comité). Por tanto, es una combinación. C) Sería válido si los puestos tuvieran jerarquía. D) Siempre hay menos combinaciones porque al "ignorar el orden" estamos agrupando muchos resultados de permutación en uno solo.

---

## Question 4 (Análisis de Repetición - Dificultad 6)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v4`
### Enunciado
¿Cuántas "palabras" de 4 letras (con o sin sentido) se pueden formar con las letras de la palabra "CASA"? (Note que la letra A se repite).

### Opciones
- [ ] A) 24 ($4!$)
- [x] B) 12 ($4! / 2!$)
- [ ] C) 4
- [ ] D) 8

### Explicación Pedagógica
Es una permutación con repetición. Como hay dos letras 'A', intercambiarlas no produce una palabra nueva. Dividimos el total ($4! = 24$) por el número de formas de ordenar las letras repetidas ($2! = 2$).
$24 / 2 = 12$.

---

## Question 5 (Genio - Dificultad 8)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Un restaurante ofrece un menú con 4 entradas, 5 platos fuertes y 3 postres. ¿Cuántos almuerzos diferentes se pueden armar eligiendo uno de cada tipo?

### Opciones
- [x] A) 60 almuerzos. <!-- weight: 1.0 -->
- [x] B) $4 \cdot 5 \cdot 3 = 60$ (Principio Multiplicativo). <!-- weight: 1.0 -->
- [ ] C) 12 almuerzos (Principio Aditivo). <!-- weight: 0.0 -->
- [ ] D) 120 almuerzos. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Uso correcto del principio fundamental del conteo).

### Explicación Pedagógica
Cuando los eventos son independientes y ocurren uno tras otro (elijo entrada Y Plato Y Postre), las posibilidades se multiplican. $4 \times 5 = 20$ combinaciones de entrada/plato, y cada una tiene 3 opciones de postre: $20 \times 3 = 60$.

---

## Contexto 2: Probabilidad y Muestreo
Contar es el primer paso para calcular la probabilidad. La probabilidad clásica (de Laplace) se define como el número de casos favorables dividido por el total de casos posibles. Si un sistema tiene millones de combinaciones y solo una es ganadora, la probabilidad es extremadamente baja. Comprender el conteo permite a las personas evaluar riesgos, desde la seguridad informática (fuerza bruta en contraseñas) hasta la probabilidad de ganar un sorteo nacional.

---

## Question 6 (Transferencia - Dificultad 8)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v6`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Transfer

### Enunciado
En una baraja de 52 cartas, ¿de cuántas formas se puede elegir una mano de 5 cartas sin importar el orden?

### Opciones
- [ ] A) $52 \cdot 51 \cdot 50 \cdot 49 \cdot 48$
- [x] B) $\binom{52}{5} = \frac{52!}{5!47!}$ (Aproximadamente 2.6 millones)
- [ ] C) $52^5$
- [ ] D) 52

### Explicación Pedagógica
En el póker o juegos similares, el orden en que recibes las 5 cartas no cambia tu mano. Es una combinación de 52 elementos tomados de 5 en 5. La cifra es enorme (2'598.960), lo que explica por qué es tan difícil que salgan jugadas específicas como la escalera real.

---

## Question 7 (Análisis de Clasificación - Dificultad 5)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v7`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál es la diferencia lógica fundamental entre una permutación y una combinación?

### Opciones
- [ ] A) La permutación usa números más grandes.
- [ ] B) Solo la combinación usa factoriales.
- [x] C) En la permutación el orden de los elementos importa (distingue resultados), en la combinación no.
- [ ] D) La combinación solo se usa para personas y la permutación para objetos.

### Explicación Pedagógica
Es la distinción más importante del tema. Digitar "12" en un cajero no es lo mismo que "21" (Permutación). Pero si vas a invitar a dos amigos de un grupo, invitar a Juan y luego a Ana es lo mismo que invitar a Ana y luego a Juan (Combinación).

---

## Question 8 (Evaluación de Permutaciones Circulares - Dificultad 7)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v8`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
¿De cuántas maneras se pueden sentar 4 personas alrededor de una mesa circular (donde las rotaciones se consideran la misma disposición)?

### Opciones
- [ ] A) $4! = 24$
- [x] B) $(4-1)! = 3! = 6$
- [ ] C) 4
- [ ] D) 16

### Explicación Pedagógica
En arreglos circulares sin un lugar de referencia fijo (como "la cabecera"), fijamos a una persona para romper la simetría y permutamos a las demás. Si todos se corren un puesto a la derecha, la relación entre ellos no cambia. Por tanto, hay $(n-1)!$ formas.

---

## Question 9 (Técnica de Conteo Condicional - Dificultad 9)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v9`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
¿De cuántas maneras pueden alinearse 5 personas si dos de ellas (amigos inseparables) **deben** estar siempre juntas?

### Opciones
- [ ] A) 120
- [ ] B) 24
- [x] C) 48 ($4! \cdot 2!$)
- [ ] D) 12

### Explicación Pedagógica
1. Tratamos a los dos amigos como un solo bloque. Ahora tenemos 4 "objetos" para permutar: $4! = 24$.
2. Dentro del bloque, los dos amigos pueden cambiar de lugar entre ellos (el de la izquierda pasa a la derecha): $2! = 2$.
3. Multiplicamos: $24 \times 2 = 48$ formas.

---

## Question 10 (Síntesis Matemática - Dificultad 8)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v10`
**Type:** `multi-correct`
**ICFES:** Interpretación y Representación
**Bloom:** Synthesis

### Enunciado
Sobre el operador de combinación $\binom{n}{k} = C(n, k)$. Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) $\binom{n}{k} = \binom{n}{n-k}$ (Simetría del triángulo de Pascal). <!-- weight: 1.0 -->
- [x] B) $\binom{n}{0} = 1$ (Solo hay una forma de no elegir nada). <!-- weight: 1.0 -->
- [ ] C) El valor de una combinación puede ser un número decimal.
- [x] D) Aparecen como coeficientes en el binomio de Newton $(a+b)^n$. <!-- weight: 1.0 -->
- [ ] E) Siempre $\binom{n}{k}$ es mayor que $n \cdot k$.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A) Elegir a 2 personas para que se queden es lo mismo que elegir a 8 para que se vayan (de un grupo de 10). B) El factorial de 0 es 1 por definición. D) Las combinaciones nos dicen de cuántas formas se puede obtener un término específico al expandir un binomio.

---

## Question 11 (Análisis de Placas de Vehículos - Dificultad 7)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v11`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
En Colombia, las placas de los carros tienen 3 letras (de 26 posibles) y 3 números (del 0 al 9). Si las letras y números se pueden repetir, ¿cuántas placas diferentes se pueden fabricar?

### Opciones
- [ ] A) $26 \cdot 25 \cdot 24 \cdot 10 \cdot 9 \cdot 8$
- [x] B) $26^3 \cdot 10^3 = 17.576.000$ (Principio multiplicativo con repetición)
- [ ] C) $\binom{26}{3} \cdot \binom{10}{3}$
- [ ] D) $36^6$

### Explicación Pedagógica
Como hay repetición permitida, cada una de las 3 posiciones de letras tiene 26 opciones y cada una de las 3 posiciones de números tiene 10 opciones. Multiplicamos: $26 \cdot 26 \cdot 26 \cdot 10 \cdot 10 \cdot 10$. El resultado es más de 17 millones de placas únicas.

---

## Question 12 (Evaluación de Probabilidad de Lotería - Dificultad 9)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v12`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
En una lotería se eligen 6 números sin repetición de una tómbola con 45 balotas. ¿Cuál es la probabilidad exacta de acertar los 6 números?

### Opciones
- [ ] A) $1/45^6$
- [x] B) $1 / \binom{45}{6} \approx 1/8.145.060$
- [ ] C) $1/P(45, 6)$
- [ ] D) $6/45$

### Explicación Pedagógica
Los sorteos de lotería (como el Baloto) son combinaciones porque el orden en que salen las bolas no importa. El número total de combinaciones posibles es enorme ($\approx 8$ millones), lo que hace que la probabilidad de ganar con un solo tiquete sea bajísima.

---

## Question 13 (Genio Interdisciplinar - Dificultad 10)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Transfer

### Enunciado
**Seguridad Informática:** Un hacker intenta adivinar una contraseña de 8 caracteres que solo usa letras minúsculas (26 letras). Su computadora puede probar 1 millón de contraseñas por segundo.

¿Cuántas posibilidades hay y cuánto tiempo le tomaría (aproximadamente) cubrir todo el espacio de búsqueda?

### Opciones
- [x] A) $26^8$ posibilidades. Tardaría unos 2.4 días. <!-- weight: 1.0 -->
- [x] B) El crecimiento exponencial de las permutaciones es lo que garantiza la seguridad. <!-- weight: 1.0 -->
- [ ] C) $26 \cdot 8$ posibilidades. Tardaría menos de un segundo. <!-- weight: 0.0 -->
- [ ] D) Es una combinación porque al hacker no le importa el orden. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (A es el cálculo técnico, B es la implicación en seguridad).

### Explicación Pedagógica
$26^8$ es aproximadamente 208 mil millones. A un millón por segundo, son 208.000 segundos, lo que equivale a casi 58 horas o 2.4 días. Si añadimos mayúsculas y números, la base sube a 62, y $62^8$ daría quintillones de años. Este es el poder del cálculo combinatorio para proteger nuestra información.

---

## Question 14 (Análisis Lógico de Repetición Prohibida - Dificultad 5)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v14`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuántos números de 3 cifras se pueden formar con $\{1, 2, 3, 4, 5\}$ si **no se permiten** números repetidos?

### Opciones
- [ ] A) $5^3 = 125$
- [x] B) $5 \cdot 4 \cdot 3 = 60$ ($P(5, 3)$)
- [ ] C) $\binom{5}{3} = 10$
- [ ] D) 15

### Explicación Pedagógica
Para la primera cifra hay 5 opciones. Para la segunda, como ya usamos una, quedan 4. Para la tercera quedan 3. El resultado es 60. Si se permitieran repetidos, siempre tendríamos 5 opciones por posición.

---

## Question 15 (Análisis de Caminos - Dificultad 8)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v15`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
Para ir de la ciudad A a la B hay 3 caminos, y de B a C hay 4 caminos. ¿Cuántos caminos diferentes hay para ir de A a C pasando por B?

### Opciones
- [ ] A) 7 (Principio aditivo)
- [x] B) 12 (Principio multiplicativo)
- [ ] C) $4^3 = 64$
- [ ] D) 1

### Explicación Pedagógica
Para cada uno de los 3 primeros caminos, puedo elegir cualquiera de los 4 siguientes. $3 \times 4 = 12$. Es el diagrama de árbol básico del conteo.

---

## Question 16 (Análisis de Género en Comités - Dificultad 7)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v16`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Un grupo tiene 5 hombres y 5 mujeres. ¿De cuántas formas se puede elegir un comité de 2 personas que tenga **un hombre y una mujer**?

### Opciones
- [ ] A) $\binom{10}{2} = 45$
- [x] B) $5 \cdot 5 = 25$ ($C(5, 1) \cdot C(5, 1)$)
- [ ] C) 10
- [ ] D) 100

### Explicación Pedagógica
Elegimos un hombre (5 formas) Y una mujer (5 formas). Aplicamos el principio multiplicativo: $5 \times 5 = 25$. El orden no importa porque no tienen cargos distintos.

---

## Question 17 (Evaluación de Permutaciones de Palabras - Dificultad 5)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v17`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuántos anagramas (ordenar las letras) se pueden formar con la palabra "MESA"?

### Opciones
- [ ] A) 4
- [ ] B) 16
- [x] C) 24 ($4!$)
- [ ] D) 120

### Explicación Pedagógica
Todas las letras son distintas. Es una permutación de 4 elementos: $4 \cdot 3 \cdot 2 \cdot 1 = 24$.

---

## Question 18 (Técnica de Complemento - Dificultad 9)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v18`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
En una bolsa hay 4 balotas rojas y 6 azules. Sacamos 2 balotas al azar. Seleccione TODAS las afirmaciones correctas sobre el número de formas de elegir las balotas.

### Opciones
- [x] A) El número total de formas de sacar 2 balotas es $C(10, 2) = 45$. <!-- weight: 1.0 -->
- [x] B) Las formas de sacar 2 balotas del mismo color son $C(4, 2) + C(6, 2) = 6 + 15 = 21$. <!-- weight: 1.0 -->
- [x] C) Las formas de que al menos una sea roja es $45 - C(6, 2) = 30$. <!-- weight: 1.0 -->
- [ ] D) Es una permutación porque el orden en que salen de la bolsa importa.
- [ ] E) Hay más formas de sacar solo azules que de sacar solo rojas. <!-- weight: 1.0 -->

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B, C) El conteo permite resolver problemas de "pistas": a veces es más fácil calcular el total y restarle lo que NO queremos (C). E es intuitivo: como hay más azules, hay más formas de agruparlas de dos en dos.

---

## Question 19 (Interpretación de Coeficientes Binomiales - Dificultad 5)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v19`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
¿Cuál es el valor de $\binom{7}{2}$?

### Opciones
- [ ] A) 14
- [x] B) 21 ($\frac{7 \cdot 6}{2 \cdot 1}$)
- [ ] C) 42
- [ ] D) 7

### Explicación Pedagógica
$C(7, 2) = \frac{7!}{2!5!} = \frac{7 \cdot 6}{2} = 21$.

---

## Question 20 (Genio de Transferencia Total - Dificultad 10)

**ID:** `CO-MAT-11-counting-techniques-001-PRO-v20`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** synthesis

### Enunciado
**MASTER INTEGRATION:**

Un científico estudia las cadenas de ADN, compuestas por 4 bases (A, C, G, T). Si una secuencia tiene longitud 10 y se sabe que hay exactamente 3 bases 'A', 2 'C', 4 'G' y 1 'T'.

¿Bajo qué técnica de conteo se calcula el número de secuencias genéticas diferentes posibles con esos elementos?

### Options
- [x] A) Permutación con Repetición: $\frac{10!}{3! \cdot 2! \cdot 4! \cdot 1!}$. <!-- weight: 1.0 -->
- [x] B) Una variación de los anagramas donde el orden importa pero hay elementos idénticos. <!-- weight: 1.0 -->
- [ ] C) Combinación de 10 en 4. <!-- weight: 0.0 -->
- [ ] D) Simplemente $4^{10}$. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Identifica correctamente la necesidad de ajustar las permutaciones por los elementos repetidos de cada base).

### Explicación Pedagógica
Si todas las bases fueran distintas, tendríamos $10!$ formas. Pero como las 3 'A' son indistinguibles entre sí, debemos dividir por $3!$ (y así con las demás). Este cálculo es el corazón de la bioinformática y permite entender la diversidad de la vida.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Type | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 4 | single | Analyze | Interpretación | ✅ |
| 2 | ...-v2 | 5 | single | Evaluate | Formulación | ✅ |
| 3 | ...-v3 | 7 | multi-correct | Synthesis | Argumentación | ✅ |
| 4 | ...-v4 | 6 | single | Analyze | Interpretación | ✅ |
| 5 | ...-v5 | 8 | weighted | Evaluate | Argumentación | ✅ |
| 6 | ...-v6 | 8 | single | Transfer | Formulación | ✅ |
| 7 | ...-v7 | 5 | single | Analyze | Interpretación | ✅ |
| 8 | ...-v8 | 7 | single | Evaluate | Formulación | ✅ |
| 9 | ...-v9 | 9 | single | Apply | Formulación | ✅ |
| 10 | ...-v10| 8 | multi-correct | Synthesis | Interpretación | ✅ |
| 11 | ...-v11| 7 | single | Analyze | Formulación | ✅ |
| 12 | ...-v12| 9 | single | Evaluate | Formulación | ✅ |
| 13 | ...-v13| 10| weighted | Transfer | Argumentación | ✅ |
| 14 | ...-v14| 5 | single | Analyze | Interpretación | ✅ |
| 15 | ...-v15| 8 | single | Apply | Formulación | ✅ |
| 16 | ...-v16| 7 | single | Evaluate | Formulación | ✅ |
| 17 | ...-v17| 5 | single | Analyze | Interpretación | ✅ |
| 18 | ...-v18| 9 | multi-correct | Synthesis | Argumentación | ✅ |
| 19 | ...-v19| 5 | single | Analyze | Formulación | ✅ |
| 20 | ...-v20| 10| weighted | Synthesis | Argumentación | ✅ |
