---
id: "CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "combinatoria-avanzada"
periodo: "weekly"
week: "W37"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "DBA MEN Colombia / Saber 11"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# Bundle MASTERY: Combinatoria Avanzada - Grado 11

Este bundle contiene 20 preguntas sobre **combinatoria avanzada, teorema del binomio, principio de inclusión-exclusión y particiones** para Grado 11, alineadas con los DBA y marcos conceptuales del ICFES Saber 11.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Aleatorio
**Expected_Success:** 0.85
**Contexto:** En la expansión del binomio de Newton $(a + b)^n$, el número total de términos resultantes sigue una regla algebraica directa.

### Enunciado
¿Cuántos términos tiene el desarrollo completo del binomio $(a + b)^6$?

### Opciones
- [x] A) 7
  <!-- feedback: La expansión de un binomio de grado n contiene exactamente n + 1 términos. Para n = 6, hay 6 + 1 = 7 términos. -->
- [ ] B) 6
  <!-- feedback: Confundió el número de términos con el exponente n del binomio. -->
- [ ] C) 12
  <!-- feedback: Multiplicó el exponente 6 por 2. -->
- [ ] D) 64
  <!-- feedback: Calculó 2^6 en lugar del número de términos de la suma polinomial. -->

### Explicacion Pedagogica
El desarrollo $(a+b)^n = sum_{k=0}^n \binom{n}{k} a^{n-k} b^k$ abarca los índices desde $k=0$ hasta $k=n$, sumando un total de $n+1$ términos.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v2
**Bloom:** Remember
**ICFES:** Aleatorio
**Expected_Success:** 0.85
**Contexto:** En la fila número 4 del Triángulo de Pascal (comenzando desde la fila 0 con valor 1), los coeficientes binomiales son 1, 4, 6, 4, 1.

### Enunciado
¿Cuál es la suma de todos los coeficientes de esta fila del Triángulo de Pascal?

### Opciones
- [x] A) 16
  <!-- feedback: La suma de los coeficientes binomiales de la n-ésima fila es 2^n. Para n = 4, 2^4 = 16. -->
- [ ] B) 12
  <!-- feedback: Sumó incorrectamente los términos centrales. -->
- [ ] C) 8
  <!-- feedback: Calculó 2^3 en lugar de 2^4. -->
- [ ] D) 32
  <!-- feedback: Calculó 2^5 en lugar de 2^4. -->

### Explicacion Pedagogica
Evaluando $(1+1)^n = sum_{k=0}^n \binom{n}{k}$, la suma de la fila $n$ del Triángulo de Pascal es siempre $2^n$. Para $n=4$, $2^4 = 16$.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Aleatorio
**Expected_Success:** 0.80
**Contexto:** Se analiza el coeficiente del término $x^3 y^2$ en el desarrollo de $(x + y)^5$ en Bogotá.

### Enunciado
¿Qué coeficiente binomial $\binom{n}{k}$ corresponde a este término en el desarrollo?

### Opciones
- [x] A) $\binom{5}{2} = 10$
  <!-- feedback: El coeficiente del término x^(5-2) y^2 es C(5,2) = 10 (igual a C(5,3) por simetría). -->
- [ ] B) $\binom{5}{1} = 5$
  <!-- feedback: Corresponde al coeficiente de x^4 y^1. -->
- [ ] C) $\binom{5}{0} = 1$
  <!-- feedback: Corresponde al primer término x^5. -->
- [ ] D) $\binom{5}{4} = 5$
  <!-- feedback: Corresponde al término x^1 y^4. -->

### Explicacion Pedagogica
En el Teorema del Binomio, el término general es $\binom{n}{k} x^{n-k} y^k$. Para $x^3 y^2$, tenemos $n=5$ y $k=2$, por lo que el coeficiente es $\binom{5}{2} = \frac{5   imes 4}{2} = 10$.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Aleatorio
**Expected_Success:** 0.80
**Contexto:** El principio de Palomar (Pigeonhole Principle) establece que si se distribuyen $n$ objetos en $k$ recipientes y $n > k$, al menos un recipiente contendrá más de un objeto.

### Enunciado
En un grupo de 13 personas en Medellín, ¿cuál es la conclusión garantizada por el principio de Palomar respecto a sus meses de nacimiento?

### Opciones
- [x] A) Al menos dos personas nacieron en el mismo mes del año.
  <!-- feedback: Hay 13 personas (objetos) y 12 meses (recipientes). Como 13 > 12, obligatoriamente al menos 2 comparten mes de nacimiento. -->
- [ ] B) Todas las personas nacieron en meses distintos.
  <!-- feedback: Contradice el principio de Palomar dado que hay solo 12 meses posibles. -->
- [ ] C) Exactamente tres personas nacieron en el mes de enero.
  <!-- feedback: El principio garantiza al menos 2 en algún mes, no especifica qué mes ni que sean 3. -->
- [ ] D) Ninguna persona nació en diciembre.
  <!-- feedback: El principio no excluye meses del año. -->

### Explicacion Pedagogica
Con $n=13$ personas y $k=12$ meses en un año, al aplicar el principio de Dirichlet o de Palomar ($lceil 13/12
ceil = 2$), se garantiza que al menos 2 personas cumplen con haber nacido en el mismo mes.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.75
**Contexto:** En una empresa en Cali, 50 empleados juegan fútbol, 40 juegan baloncesto y 15 practican ambos deportes.

### Enunciado
¿Cuántos empleados practican AL MENOS uno de los dos deportes?

### Opciones
- [x] A) 75
  <!-- feedback: Aplicando inclusión-exclusión: N(F U B) = N(F) + N(B) - N(F n B) = 50 + 40 - 15 = 75. -->
- [ ] B) 90
  <!-- feedback: Sumó las dos categorías sin restar los empleados que practican ambos deportes. -->
- [ ] C) 65
  <!-- feedback: Restó dos veces el grupo de la intersección. -->
- [ ] D) 35
  <!-- feedback: Restó 50 - 15 únicamente. -->

### Explicacion Pedagogica
Por el principio de inclusión-exclusión para dos conjuntos: $|A cup B| = |A| + |B| - |A cap B| = 50 + 40 - 15 = 75$.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.75
**Contexto:** ¿De cuántas maneras se pueden repartir 8 dulces idénticos entre 4 niños en Barranquilla de modo que CADA NIÑO reciba AL MENOS 1 dulce?

### Enunciado
Considere las técnicas de combinación con repetición (barras y estrellas).

### Opciones
- [x] A) 35
  <!-- feedback: Damos 1 dulce a cada uno de los 4 niños (se usan 4 dulces). Quedan 4 dulces idénticos para repartir libremente entre 4 niños: C(4+4-1, 4) = C(7,4) = 35. -->
- [ ] B) 165
  <!-- feedback: Calculó C(4+8-1, 8) = C(11,8) sin asegurar que cada niño recibiera al menos un dulce. -->
- [ ] C) 70
  <!-- feedback: Calculó C(8,4) por error. -->
- [ ] D) 24
  <!-- feedback: Multiplicó 4! en lugar de usar combinaciones de objetos indistinguibles. -->

### Explicacion Pedagogica
Al entregar primero 1 dulce a cada uno de los $k=4$ niños, restan $n' = 8 - 4 = 4$ dulces para distribuir sin restricciones: $\binom{n' + k - 1}{n'} = \binom{4 + 4 - 1}{4} = \binom{7}{4} = \frac{7   imes 6   imes 5}{6} = 35$.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.75
**Contexto:** Se quiere formar una clave de 5 letras utilizando las letras del conjunto {A, B, C, D, E} donde se permite repetir letras.

### Enunciado
¿Cuántas claves contienen la letra 'A' al menos una vez?

### Opciones
- [x] A) 2097
  <!-- feedback: Total de claves posibles: 5^5 = 3125. Claves sin ninguna 'A' (usando B,C,D,E): 4^5 = 1024. Claves con al menos una 'A': 3125 - 1024 = 2097. -->
- [ ] B) 1024
  <!-- feedback: Corresponde a las claves que NO contienen la letra 'A'. -->
- [ ] C) 3125
  <!-- feedback: Corresponde al total de claves sin descontar la restricción. -->
- [ ] D) 625
  <!-- feedback: Calculó 5^4 asumiendo que la 'A' está fija en la primera posición únicamente. -->

### Explicacion Pedagogica
Por el complemento: Total de claves con repetición $= 5^5 = 3125$. Claves formadas solo con las otras 4 letras $= 4^5 = 1024$. Claves con al menos una 'A' $= 3125 - 1024 = 2097$.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.70
**Contexto:** ¿De cuántas formas se pueden organizar 7 personas en una fila si dos personas en particular, Juan y María, NO pueden estar juntas?

### Enunciado
Calcule el número total de arreglos posibles bajo esta restricción.

### Opciones
- [x] A) 3600
  <!-- feedback: Total sin restricción: 7! = 5040. Arreglos con Juan y María juntos: 6! * 2! = 720 * 2 = 1440. Arreglos no juntos: 5040 - 1440 = 3600. -->
- [ ] B) 1440
  <!-- feedback: Corresponde al número de arreglos en que Juan y María SÍ están juntos. -->
- [ ] C) 5040
  <!-- feedback: Es el total de permutaciones 7! sin aplicar ninguna restricción. -->
- [ ] D) 2520
  <!-- feedback: Dividió 5040 entre 2 por error. -->

### Explicacion Pedagogica
Total de permutaciones de 7 personas $= 7! = 5040$.
Permutaciones con Juan y María juntos $= 6!   imes 2! = 1440$.
Permutaciones separadas $= 5040 - 1440 = 3600$.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.70
**Contexto:** En el desarrollo del binomio $(2x - 1)^4$.

### Enunciado
¿Cuál es el término independiente (constante sin la variable $x$) de esta expansión?

### Opciones
- [x] A) 1
  <!-- feedback: El término independiente es (-1)^4 = 1. -->
- [ ] B) -1
  <!-- feedback: Olvidó que la potencia par (-1)^4 resulta positiva. -->
- [ ] C) 16
  <!-- feedback: Corresponde al coeficiente del primer término (2x)^4 = 16x^4. -->
- [ ] D) -4
  <!-- feedback: Calculó 4 * (-1). -->

### Explicacion Pedagogica
El último término del binomio $(2x - 1)^4$ ocurre para $k=4$: $\binom{4}{4} (2x)^0 (-1)^4 = 1 cdot 1 cdot 1 = 1$.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.70
**Contexto:** Una cuadrícula de 4 calles por 3 carreras en el centro de Bucaramanga. Un peatón camina desde la esquina (0,0) hasta la esquina (4,3) desplazándose únicamente hacia el Este (E) o hacia el Norte (N).

### Enunciado
¿Cuántos caminos de longitud mínima distintos puede elegir el peatón?

### Opciones
- [x] A) 35
  <!-- feedback: Requiere 4 pasos E y 3 pasos N (total 7 pasos). El número de caminos es C(7,4) = C(7,3) = (7 * 6 * 5) / 6 = 35. -->
- [ ] B) 12
  <!-- feedback: Multiplicó 4 * 3. -->
- [ ] C) 24
  <!-- feedback: Calculó 4! por error. -->
- [ ] D) 70
  <!-- feedback: Multiplicó 35 por 2. -->

### Explicacion Pedagogica
Cualquier trayecto consta de $4+3=7$ pasos en total. La cantidad de ordenamientos únicos de 4 pasos al Este y 3 al Norte es $\binom{7}{4} = \frac{7   imes 6   imes 5}{3   imes 2   imes 1} = 35$.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.65
**Contexto:** Tres colegios A, B y C de Cartagena participan en una competencia cultural. Hay 100 estudiantes que participan en A, 80 en B y 70 en C. 30 están en A y B, 25 en B y C, 20 en A y C, y 10 participan en los tres colegios simultáneamente.

### Enunciado
¿Cuál es el número total de estudiantes distintos que participan en la competencia?

### Opciones
- [x] A) 185
  <!-- feedback: Por inclusión-exclusión de 3 conjuntos: |A U B U C| = (100+80+70) - (30+25+20) + 10 = 250 - 75 + 10 = 185. -->
- [ ] B) 250
  <!-- feedback: Sumó las listas simples sin descontar las intersecciones dobles y triples. -->
- [ ] C) 175
  <!-- feedback: Restó la triple intersección en lugar de sumarla al final. -->
- [ ] D) 200
  <!-- feedback: Calculó mal la suma de las intersecciones dobles. -->

### Explicacion Pedagogica
Fórmula de inclusión-exclusión para 3 conjuntos:
$|A cup B cup C| = (|A|+|B|+|C|) - (|Acap B|+|Bcap C|+|Acap C|) + |Acap Bcap C|$
$= (100 + 80 + 70) - (30 + 25 + 20) + 10 = 250 - 75 + 10 = 185$.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.65
**Contexto:** Se define un desarreglo (o permutación caótica) $D_n$ como una permutación de $n$ elementos donde ningún elemento aparece en su posición original. La fórmula es $D_n = n! sum_{k=0}^n \frac{(-1)^k}{k!}$.

### Enunciado
¿Cuántos desarreglos $D_4$ existen para un grupo de 4 elementos ${1, 2, 3, 4}$?

### Opciones
- [x] A) 9
  <!-- feedback: D4 = 4! * (1 - 1 + 1/2 - 1/6 + 1/24) = 24 * (12/24 - 4/24 + 1/24) = 24 * (9/24) = 9. -->
- [ ] B) 24
  <!-- feedback: Corresponde al total de permutaciones 4! sin restricción. -->
- [ ] C) 12
  <!-- feedback: Dividió 24 entre 2. -->
- [ ] D) 6
  <!-- feedback: Confundió D4 con D3 = 2 o calculó 3!. -->

### Explicacion Pedagogica
Aplicando la fórmula de desarreglos para $n=4$:
$D_4 = 4! left( \frac{1}{0!} - \frac{1}{1!} + \frac{1}{2!} - \frac{1}{3!} + \frac{1}{4!}
ight) = 24 left( 1 - 1 + \frac{1}{2} - \frac{1}{6} + \frac{1}{24}
ight) = 12 - 4 + 1 = 9$.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.60
**Contexto:** ¿Cuántas soluciones compuestas por enteros NO NEGATIVOS $(x_1, x_2, x_3)$ satisfacen la ecuación $x_1 + x_2 + x_3 = 10$?

### Enunciado
Aplique el concepto de combinaciones con repetición.

### Opciones
- [x] A) 66
  <!-- feedback: CR(3, 10) = C(3 + 10 - 1, 10) = C(12, 10) = C(12, 2) = (12 * 11) / 2 = 66. -->
- [ ] B) 36
  <!-- feedback: Calculó C(10, 2) por error. -->
- [ ] C) 120
  <!-- feedback: Calculó C(10, 3) sin aplicar la fórmula de barras y estrellas. -->
- [ ] D) 30
  <!-- feedback: Multiplicó 10 * 3. -->

### Explicacion Pedagogica
El número de soluciones en enteros no negativos a $x_1 + x_2 + dots + x_k = n$ es $\binom{n+k-1}{n}$. Para $n=10, k=3$: $\binom{10+3-1}{10} = \binom{12}{2} = \frac{12   imes 11}{2} = 66$.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.60
**Contexto:** En la expansión de $left(x^2 + \frac{1}{x}
ight)^9$.

### Enunciado
¿Cuál es el término independiente (el término que no contiene a la variable $x$)?

### Opciones
- [x] A) 84
  <!-- feedback: Término general: C(9,k) * (x^2)^(9-k) * (x^(-1))^k = C(9,k) * x^(18 - 3k). Para término independiente: 18 - 3k = 0 -> k = 6. C(9,6) = C(9,3) = (9*8*7)/6 = 84. -->
- [ ] B) 36
  <!-- feedback: Corresponde a C(9,2). -->
- [ ] C) 126
  <!-- feedback: Corresponde a C(9,4). -->
- [ ] D) 9
  <!-- feedback: Corresponde a C(9,1). -->

### Explicacion Pedagogica
El exponente de $x$ en el $k$-ésimo término es $2(9-k) - k = 18 - 3k$. Igualando a cero para hallar el término constante: $18 - 3k = 0 Rightarrow k = 6$.
El coeficiente es $\binom{9}{6} = \binom{9}{3} = \frac{9   imes 8   imes 7}{3   imes 2   imes 1} = 84$.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.60
**Contexto:** Se quiere distribuir un conjunto de 6 estudiantes en 2 grupos no vacíos e indistinguibles para un taller en Manizales.

### Enunciado
¿De cuántas maneras se puede realizar esta partición del conjunto (Número de Stirling de segunda especie $S(6,2)$)?

### Opciones
- [x] A) 31
  <!-- feedback: S(6,2) = (2^5 - 1) = 32 - 1 = 31. O dividiendo (2^6 - 2)/2 = 62/2 = 31. -->
- [ ] B) 64
  <!-- feedback: Calculó 2^6 sin descontar los grupos vacíos ni la indistinguibilidad. -->
- [ ] C) 32
  <!-- feedback: Olvidó restar el caso de grupo vacío antes de dividir entre 2. -->
- [ ] D) 15
  <!-- feedback: Corresponde a C(6,2). -->

### Explicacion Pedagogica
Particionar un conjunto de $n$ elementos en 2 grupos no vacíos viene dado por $S(n,2) = \frac{2^n - 2}{2} = 2^{n-1} - 1$. Para $n=6$: $2^5 - 1 = 32 - 1 = 31$.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.60
**Contexto:** En un torneo de ajedrez con $n$ participantes en Armenia, cada jugador enfrenta a todos los demás exactamente una vez. Se disputan en total 66 partidas.

### Enunciado
¿Cuántos jugadores $n$ están inscritos en el torneo?

### Opciones
- [x] A) 12
  <!-- feedback: C(n,2) = n(n-1)/2 = 66 -> n(n-1) = 132. Como 12 * 11 = 132, n = 12. -->
- [ ] B) 11
  <!-- feedback: Si n=11, C(11,2) = 55 partidas. -->
- [ ] C) 13
  <!-- feedback: Si n=13, C(13,2) = 78 partidas. -->
- [ ] D) 66
  <!-- feedback: Confundió el número de partidas con el número de jugadores. -->

### Explicacion Pedagogica
$\binom{n}{2} = \frac{n(n-1)}{2} = 66 Rightarrow n(n-1) = 132$. Resolviendo la ecuación cuadrática $n^2 - n - 132 = 0 Rightarrow (n-12)(n+11) = 0 Rightarrow n = 12$.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.50
**Contexto:** Se busca determinar el número de soluciones enteras estrictamente POSITIVAS ($x_i ge 1$) a la ecuación $x_1 + x_2 + x_3 + x_4 = 12$.

### Enunciado
¿Cuántas soluciones enteras positivas existen para esta ecuación?

### Opciones
- [x] A) 165
  <!-- feedback: Hacemos y_i = x_i - 1 >= 0. La ecuación queda y_1 + y_2 + y_3 + y_4 = 12 - 4 = 8. C(8 + 4 - 1, 8) = C(11, 8) = C(11, 3) = (11 * 10 * 9) / 6 = 165. -->
- [ ] B) 455
  <!-- feedback: Calculó C(12+4-1, 12) = C(15,3) para enteros no negativos sin exigir x_i >= 1. -->
- [ ] C) 220
  <!-- feedback: Calculó C(12, 3) por error. -->
- [ ] D) 84
  <!-- feedback: Calculó C(9, 3) por error. -->

### Explicacion Pedagogica
Para soluciones en enteros estrictamente positivos, asignamos 1 a cada una de las 4 variables. Quedan $12 - 4 = 8$ unidades por repartir entre 4 variables en enteros no negativos: $\binom{8 + 4 - 1}{8} = \binom{11}{3} = \frac{11   imes 10   imes 9}{6} = 165$.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.50
**Contexto:** Un grupo de 4 parejas de cartas numeradas del 1 al 4 (total 8 cartas) se mezclan en una mesa.

### Enunciado
¿De cuántas maneras se pueden seleccionar 4 cartas de modo que NO HAYA NINGUNA PAREJA completa en la selección?

### Opciones
- [x] A) 16
  <!-- feedback: Para evitar parejas completas, debemos elegir exactamente 1 carta de cada una de las 4 parejas distintas. Como cada pareja tiene 2 cartas, hay 2^4 = 16 formas. -->
- [ ] B) 70
  <!-- feedback: Corresponde a C(8,4) total sin restricciones. -->
- [ ] C) 48
  <!-- feedback: Calculó C(4,1) * C(4,3) * 2 por error. -->
- [ ] D) 32
  <!-- feedback: Multiplicó 16 por 2. -->

### Explicacion Pedagogica
Para no tener parejas completas al elegir 4 cartas de 4 parejas, debemos seleccionar exactamente una carta de cada pareja. Hay 4 decisiones independientes con 2 opciones cada una: $2   imes 2   imes 2   imes 2 = 2^4 = 16$.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.45
**Contexto:** Evaluando la identidad combinatoria $sum_{k=0}^n \binom{n}{k}^2 = \binom{2n}{n}$.

### Enunciado
Para $n = 3$, verifique la suma de los cuadrados de la fila 3 del Triángulo de Pascal e identifique el valor equivalente $\binom{6}{3}$.

### Opciones
- [x] A) $1^2 + 3^2 + 3^2 + 1^2 = 20$, que es igual a $\binom{6}{3} = 20$.
  <!-- feedback: 1 + 9 + 9 + 1 = 20. C(6,3) = (6 * 5 * 4) / 6 = 20. La identidad combinatoria de Vandermonde se cumple perfectamente. -->
- [ ] B) $1^2 + 3^2 + 3^2 + 1^2 = 18$, diferente de $\binom{6}{3} = 20$.
  <!-- feedback: Erró en la suma de 1 + 9 + 9 + 1. -->
- [ ] C) $1 + 3 + 3 + 1 = 8$, que es igual a $2^3$.
  <!-- feedback: Sumó los coeficientes simples sin elevarlos al cuadrado. -->
- [ ] D) $1^2 + 3^2 + 3^2 + 1^2 = 36$, que es igual a $6^2$.
  <!-- feedback: Erró gravemente en la elevación de los términos. -->

### Explicacion Pedagogica
Fila $n=3$: coeficientes $1, 3, 3, 1$. Suma de cuadrados: $1^2 + 3^2 + 3^2 + 1^2 = 1 + 9 + 9 + 1 = 20$.
Por el otro lado: $\binom{2(3)}{3} = \binom{6}{3} = \frac{6   imes 5   imes 4}{3   imes 2   imes 1} = 20$.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.45
**Contexto:** Cuatro secretarias en una oficina de Bogotá escriben 4 cartas distintas y preparan 4 sobres con las direcciones correspondientes. Si las cartas se colocan en los sobres al azar.

### Enunciado
¿Cuál es la probabilidad de que NINGUNA carta llegue a su destinatario correcto (desarreglo completo $D_4$)?

### Opciones
- [x] A) $\frac{3}{8}$
  <!-- feedback: D4 = 9 desarreglos. Total de formas de meter 4 cartas en 4 sobres: 4! = 24. P = 9/24 = 3/8 = 0.375. -->
- [ ] B) $\frac{1}{24}$
  <!-- feedback: Corresponde a la probabilidad de que TODAS las cartas lleguen a su destinatario correcto. -->
- [ ] C) $\frac{1}{4}$
  <!-- feedback: Estimó 1/4 por intuición simple. -->
- [ ] D) $\frac{1}{2}$
  <!-- feedback: Asumió un 50% de probabilidad sin calcular los desarreglos. -->

### Explicacion Pedagogica
Número de casos favorables (desarreglos $D_4$) $= 9$. Número de casos posibles ($4!$) $= 24$.
$P(	ext{ninguna correcta}) = \frac{9}{24} = \frac{3}{8} = 0.375$.
