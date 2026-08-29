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

Este bundle contiene 20 preguntas sobre **combinatoria avanzada, teorema del binomio, principio de inclusiÃ³n-exclusiÃ³n y particiones** para Grado 11, alineadas con los DBA y marcos conceptuales del ICFES Saber 11.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Aleatorio
**Expected_Success:** 0.85
**Contexto:** En la expansiÃ³n del binomio de Newton $(a + b)^n$, el nÃºmero total de tÃ©rminos resultantes sigue una regla algebraica directa.

### Enunciado
Â¿CuÃ¡ntos tÃ©rminos tiene el desarrollo completo del binomio $(a + b)^6$?

### Opciones
- [x] A) 7
  <!-- feedback: La expansiÃ³n de un binomio de grado n contiene exactamente n + 1 tÃ©rminos. Para n = 6, hay 6 + 1 = 7 tÃ©rminos. -->
- [ ] B) 6
  <!-- feedback: ConfundiÃ³ el nÃºmero de tÃ©rminos con el exponente n del binomio. -->
- [ ] C) 12
  <!-- feedback: MultiplicÃ³ el exponente 6 por 2. -->
- [ ] D) 64
  <!-- feedback: CalculÃ³ 2^6 en lugar del nÃºmero de tÃ©rminos de la suma polinomial. -->

### Explicacion Pedagogica
El desarrollo $(a+b)^n = sum_{k=0}^n \binom{n}{k} a^{n-k} b^k$ abarca los Ã­ndices desde $k=0$ hasta $k=n$, sumando un total de $n+1$ tÃ©rminos.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v2
**Bloom:** Remember
**ICFES:** Aleatorio
**Expected_Success:** 0.85
**Contexto:** En la fila nÃºmero 4 del TriÃ¡ngulo de Pascal (comenzando desde la fila 0 con valor 1), los coeficientes binomiales son 1, 4, 6, 4, 1.

### Enunciado
Â¿CuÃ¡l es la suma de todos los coeficientes de esta fila del TriÃ¡ngulo de Pascal?

### Opciones
- [x] A) 16
  <!-- feedback: La suma de los coeficientes binomiales de la n-Ã©sima fila es 2^n. Para n = 4, 2^4 = 16. -->
- [ ] B) 12
  <!-- feedback: SumÃ³ incorrectamente los tÃ©rminos centrales. -->
- [ ] C) 8
  <!-- feedback: CalculÃ³ 2^3 en lugar de 2^4. -->
- [ ] D) 32
  <!-- feedback: CalculÃ³ 2^5 en lugar de 2^4. -->

### Explicacion Pedagogica
Evaluando $(1+1)^n = sum_{k=0}^n \binom{n}{k}$, la suma de la fila $n$ del TriÃ¡ngulo de Pascal es siempre $2^n$. Para $n=4$, $2^4 = 16$.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Aleatorio
**Expected_Success:** 0.80
**Contexto:** Se analiza el coeficiente del tÃ©rmino $x^3 y^2$ en el desarrollo de $(x + y)^5$ en BogotÃ¡.

### Enunciado
Â¿QuÃ© coeficiente binomial $\binom{n}{k}$ corresponde a este tÃ©rmino en el desarrollo?

### Opciones
- [x] A) $\binom{5}{2} = 10$
  <!-- feedback: El coeficiente del tÃ©rmino x^(5-2) y^2 es C(5,2) = 10 (igual a C(5,3) por simetrÃ­a). -->
- [ ] B) $\binom{5}{1} = 5$
  <!-- feedback: Corresponde al coeficiente de x^4 y^1. -->
- [ ] C) $\binom{5}{0} = 1$
  <!-- feedback: Corresponde al primer tÃ©rmino x^5. -->
- [ ] D) $\binom{5}{4} = 5$
  <!-- feedback: Corresponde al tÃ©rmino x^1 y^4. -->

### Explicacion Pedagogica
En el Teorema del Binomio, el tÃ©rmino general es $\binom{n}{k} x^{n-k} y^k$. Para $x^3 y^2$, tenemos $n=5$ y $k=2$, por lo que el coeficiente es $\binom{5}{2} = \frac{5   imes 4}{2} = 10$.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Aleatorio
**Expected_Success:** 0.80
**Contexto:** El principio de Palomar (Pigeonhole Principle) establece que si se distribuyen $n$ objetos en $k$ recipientes y $n > k$, al menos un recipiente contendrÃ¡ mÃ¡s de un objeto.

### Enunciado
En un grupo de 13 personas en MedellÃ­n, Â¿cuÃ¡l es la conclusiÃ³n garantizada por el principio de Palomar respecto a sus meses de nacimiento?

### Opciones
- [x] A) Al menos dos personas nacieron en el mismo mes del aÃ±o.
  <!-- feedback: Hay 13 personas (objetos) y 12 meses (recipientes). Como 13 > 12, obligatoriamente al menos 2 comparten mes de nacimiento. -->
- [ ] B) Todas las personas nacieron en meses distintos.
  <!-- feedback: Contradice el principio de Palomar dado que hay solo 12 meses posibles. -->
- [ ] C) Exactamente tres personas nacieron en el mes de enero.
  <!-- feedback: El principio garantiza al menos 2 en algÃºn mes, no especifica quÃ© mes ni que sean 3. -->
- [ ] D) Ninguna persona naciÃ³ en diciembre.
  <!-- feedback: El principio no excluye meses del aÃ±o. -->

### Explicacion Pedagogica
Con $n=13$ personas y $k=12$ meses en un aÃ±o, al aplicar el principio de Dirichlet o de Palomar ($lceil 13/12 ceil = 2$), se garantiza que al menos 2 personas cumplen con haber nacido en el mismo mes.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.75
**Contexto:** En una empresa en Cali, 50 empleados juegan fÃºtbol, 40 juegan baloncesto y 15 practican ambos deportes.

### Enunciado
Â¿CuÃ¡ntos empleados practican AL MENOS uno de los dos deportes?

### Opciones
- [x] A) 75
  <!-- feedback: Aplicando inclusiÃ³n-exclusiÃ³n: N(F U B) = N(F) + N(B) - N(F n B) = 50 + 40 - 15 = 75. -->
- [ ] B) 90
  <!-- feedback: SumÃ³ las dos categorÃ­as sin restar los empleados que practican ambos deportes. -->
- [ ] C) 65
  <!-- feedback: RestÃ³ dos veces el grupo de la intersecciÃ³n. -->
- [ ] D) 35
  <!-- feedback: RestÃ³ 50 - 15 Ãºnicamente. -->

### Explicacion Pedagogica
Por el principio de inclusiÃ³n-exclusiÃ³n para dos conjuntos: $|A cup B| = |A| + |B| - |A cap B| = 50 + 40 - 15 = 75$.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.75
**Contexto:** Â¿De cuÃ¡ntas maneras se pueden repartir 8 dulces idÃ©nticos entre 4 niÃ±os en Barranquilla de modo que CADA NIÃO reciba AL MENOS 1 dulce?

### Enunciado
Considere las tÃ©cnicas de combinaciÃ³n con repeticiÃ³n (barras y estrellas).

### Opciones
- [x] A) 35
  <!-- feedback: Damos 1 dulce a cada uno de los 4 niÃ±os (se usan 4 dulces). Quedan 4 dulces idÃ©nticos para repartir libremente entre 4 niÃ±os: C(4+4-1, 4) = C(7,4) = 35. -->
- [ ] B) 165
  <!-- feedback: CalculÃ³ C(4+8-1, 8) = C(11,8) sin asegurar que cada niÃ±o recibiera al menos un dulce. -->
- [ ] C) 70
  <!-- feedback: CalculÃ³ C(8,4) por error. -->
- [ ] D) 24
  <!-- feedback: MultiplicÃ³ 4! en lugar de usar combinaciones de objetos indistinguibles. -->

### Explicacion Pedagogica
Al entregar primero 1 dulce a cada uno de los $k=4$ niÃ±os, restan $n' = 8 - 4 = 4$ dulces para distribuir sin restricciones: $\binom{n' + k - 1}{n'} = \binom{4 + 4 - 1}{4} = \binom{7}{4} = \frac{7   imes 6   imes 5}{6} = 35$.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.75
**Contexto:** Se quiere formar una clave de 5 letras utilizando las letras del conjunto {A, B, C, D, E} donde se permite repetir letras.

### Enunciado
Â¿CuÃ¡ntas claves contienen la letra 'A' al menos una vez?

### Opciones
- [x] A) 2097
  <!-- feedback: Total de claves posibles: 5^5 = 3125. Claves sin ninguna 'A' (usando B,C,D,E): 4^5 = 1024. Claves con al menos una 'A': 3125 - 1024 = 2097. -->
- [ ] B) 1024
  <!-- feedback: Corresponde a las claves que NO contienen la letra 'A'. -->
- [ ] C) 3125
  <!-- feedback: Corresponde al total de claves sin descontar la restricciÃ³n. -->
- [ ] D) 625
  <!-- feedback: CalculÃ³ 5^4 asumiendo que la 'A' estÃ¡ fija en la primera posiciÃ³n Ãºnicamente. -->

### Explicacion Pedagogica
Por el complemento: Total de claves con repeticiÃ³n $= 5^5 = 3125$. Claves formadas solo con las otras 4 letras $= 4^5 = 1024$. Claves con al menos una 'A' $= 3125 - 1024 = 2097$.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.70
**Contexto:** Â¿De cuÃ¡ntas formas se pueden organizar 7 personas en una fila si dos personas en particular, Juan y MarÃ­a, NO pueden estar juntas?

### Enunciado
Calcule el nÃºmero total de arreglos posibles bajo esta restricciÃ³n.

### Opciones
- [x] A) 3600
  <!-- feedback: Total sin restricciÃ³n: 7! = 5040. Arreglos con Juan y MarÃ­a juntos: 6! * 2! = 720 * 2 = 1440. Arreglos no juntos: 5040 - 1440 = 3600. -->
- [ ] B) 1440
  <!-- feedback: Corresponde al nÃºmero de arreglos en que Juan y MarÃ­a SÃ estÃ¡n juntos. -->
- [ ] C) 5040
  <!-- feedback: Es el total de permutaciones 7! sin aplicar ninguna restricciÃ³n. -->
- [ ] D) 2520
  <!-- feedback: DividiÃ³ 5040 entre 2 por error. -->

### Explicacion Pedagogica
Total de permutaciones de 7 personas $= 7! = 5040$.
Permutaciones con Juan y MarÃ­a juntos $= 6!   imes 2! = 1440$.
Permutaciones separadas $= 5040 - 1440 = 3600$.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.70
**Contexto:** En el desarrollo del binomio $(2x - 1)^4$.

### Enunciado
Â¿CuÃ¡l es el tÃ©rmino independiente (constante sin la variable $x$) de esta expansiÃ³n?

### Opciones
- [x] A) 1
  <!-- feedback: El tÃ©rmino independiente es (-1)^4 = 1. -->
- [ ] B) -1
  <!-- feedback: OlvidÃ³ que la potencia par (-1)^4 resulta positiva. -->
- [ ] C) 16
  <!-- feedback: Corresponde al coeficiente del primer tÃ©rmino (2x)^4 = 16x^4. -->
- [ ] D) -4
  <!-- feedback: CalculÃ³ 4 * (-1). -->

### Explicacion Pedagogica
El Ãºltimo tÃ©rmino del binomio $(2x - 1)^4$ ocurre para $k=4$: $\binom{4}{4} (2x)^0 (-1)^4 = 1 cdot 1 cdot 1 = 1$.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.70
**Contexto:** Una cuadrÃ­cula de 4 calles por 3 carreras en el centro de Bucaramanga. Un peatÃ³n camina desde la esquina (0,0) hasta la esquina (4,3) desplazÃ¡ndose Ãºnicamente hacia el Este (E) o hacia el Norte (N).

### Enunciado
Â¿CuÃ¡ntos caminos de longitud mÃ­nima distintos puede elegir el peatÃ³n?

### Opciones
- [x] A) 35
  <!-- feedback: Requiere 4 pasos E y 3 pasos N (total 7 pasos). El nÃºmero de caminos es C(7,4) = C(7,3) = (7 * 6 * 5) / 6 = 35. -->
- [ ] B) 12
  <!-- feedback: MultiplicÃ³ 4 * 3. -->
- [ ] C) 24
  <!-- feedback: CalculÃ³ 4! por error. -->
- [ ] D) 70
  <!-- feedback: MultiplicÃ³ 35 por 2. -->

### Explicacion Pedagogica
Cualquier trayecto consta de $4+3=7$ pasos en total. La cantidad de ordenamientos Ãºnicos de 4 pasos al Este y 3 al Norte es $\binom{7}{4} = \frac{7   imes 6   imes 5}{3   imes 2   imes 1} = 35$.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.65
**Contexto:** Tres colegios A, B y C de Cartagena participan en una competencia cultural. Hay 100 estudiantes que participan en A, 80 en B y 70 en C. 30 estÃ¡n en A y B, 25 en B y C, 20 en A y C, y 10 participan en los tres colegios simultÃ¡neamente.

### Enunciado
Â¿CuÃ¡l es el nÃºmero total de estudiantes distintos que participan en la competencia?

### Opciones
- [x] A) 185
  <!-- feedback: Por inclusiÃ³n-exclusiÃ³n de 3 conjuntos: |A U B U C| = (100+80+70) - (30+25+20) + 10 = 250 - 75 + 10 = 185. -->
- [ ] B) 250
  <!-- feedback: SumÃ³ las listas simples sin descontar las intersecciones dobles y triples. -->
- [ ] C) 175
  <!-- feedback: RestÃ³ la triple intersecciÃ³n en lugar de sumarla al final. -->
- [ ] D) 200
  <!-- feedback: CalculÃ³ mal la suma de las intersecciones dobles. -->

### Explicacion Pedagogica
FÃ³rmula de inclusiÃ³n-exclusiÃ³n para 3 conjuntos:
$|A cup B cup C| = (|A|+|B|+|C|) - (|Acap B|+|Bcap C|+|Acap C|) + |Acap Bcap C|$
$= (100 + 80 + 70) - (30 + 25 + 20) + 10 = 250 - 75 + 10 = 185$.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.65
**Contexto:** Se define un desarreglo (o permutaciÃ³n caÃ³tica) $D_n$ como una permutaciÃ³n de $n$ elementos donde ningÃºn elemento aparece en su posiciÃ³n original. La fÃ³rmula es $D_n = n! sum_{k=0}^n \frac{(-1)^k}{k!}$.

### Enunciado
Â¿CuÃ¡ntos desarreglos $D_4$ existen para un grupo de 4 elementos ${1, 2, 3, 4}$?

### Opciones
- [x] A) 9
  <!-- feedback: D4 = 4! * (1 - 1 + 1/2 - 1/6 + 1/24) = 24 * (12/24 - 4/24 + 1/24) = 24 * (9/24) = 9. -->
- [ ] B) 24
  <!-- feedback: Corresponde al total de permutaciones 4! sin restricciÃ³n. -->
- [ ] C) 12
  <!-- feedback: DividiÃ³ 24 entre 2. -->
- [ ] D) 6
  <!-- feedback: ConfundiÃ³ D4 con D3 = 2 o calculÃ³ 3!. -->

### Explicacion Pedagogica
Aplicando la fÃ³rmula de desarreglos para $n=4$:
$D_4 = 4! left( \frac{1}{0!} - \frac{1}{1!} + \frac{1}{2!} - \frac{1}{3!} + \frac{1}{4!} ight) = 24 left( 1 - 1 + \frac{1}{2} - \frac{1}{6} + \frac{1}{24} ight) = 12 - 4 + 1 = 9$.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.60
**Contexto:** Â¿CuÃ¡ntas soluciones compuestas por enteros NO NEGATIVOS $(x_1, x_2, x_3)$ satisfacen la ecuaciÃ³n $x_1 + x_2 + x_3 = 10$?

### Enunciado
Aplique el concepto de combinaciones con repeticiÃ³n.

### Opciones
- [x] A) 66
  <!-- feedback: CR(3, 10) = C(3 + 10 - 1, 10) = C(12, 10) = C(12, 2) = (12 * 11) / 2 = 66. -->
- [ ] B) 36
  <!-- feedback: CalculÃ³ C(10, 2) por error. -->
- [ ] C) 120
  <!-- feedback: CalculÃ³ C(10, 3) sin aplicar la fÃ³rmula de barras y estrellas. -->
- [ ] D) 30
  <!-- feedback: MultiplicÃ³ 10 * 3. -->

### Explicacion Pedagogica
El nÃºmero de soluciones en enteros no negativos a $x_1 + x_2 + dots + x_k = n$ es $\binom{n+k-1}{n}$. Para $n=10, k=3$: $\binom{10+3-1}{10} = \binom{12}{2} = \frac{12   imes 11}{2} = 66$.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.60
**Contexto:** En la expansiÃ³n de $left(x^2 + \frac{1}{x}ight)^9$.

### Enunciado
Â¿CuÃ¡l es el tÃ©rmino independiente (el tÃ©rmino que no contiene a la variable $x$)?

### Opciones
- [x] A) 84
  <!-- feedback: TÃ©rmino general: C(9,k) * (x^2)^(9-k) * (x^(-1))^k = C(9,k) * x^(18 - 3k). Para tÃ©rmino independiente: 18 - 3k = 0 -> k = 6. C(9,6) = C(9,3) = (9*8*7)/6 = 84. -->
- [ ] B) 36
  <!-- feedback: Corresponde a C(9,2). -->
- [ ] C) 126
  <!-- feedback: Corresponde a C(9,4). -->
- [ ] D) 9
  <!-- feedback: Corresponde a C(9,1). -->

### Explicacion Pedagogica
El exponente de $x$ en el $k$-Ã©simo tÃ©rmino es $2(9-k) - k = 18 - 3k$. Igualando a cero para hallar el tÃ©rmino constante: $18 - 3k = 0 Rightarrow k = 6$.
El coeficiente es $\binom{9}{6} = \binom{9}{3} = \frac{9   imes 8   imes 7}{3   imes 2   imes 1} = 84$.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.60
**Contexto:** Se quiere distribuir un conjunto de 6 estudiantes en 2 grupos no vacÃ­os e indistinguibles para un taller en Manizales.

### Enunciado
Â¿De cuÃ¡ntas maneras se puede realizar esta particiÃ³n del conjunto (NÃºmero de Stirling de segunda especie $S(6,2)$)?

### Opciones
- [x] A) 31
  <!-- feedback: S(6,2) = (2^5 - 1) = 32 - 1 = 31. O dividiendo (2^6 - 2)/2 = 62/2 = 31. -->
- [ ] B) 64
  <!-- feedback: CalculÃ³ 2^6 sin descontar los grupos vacÃ­os ni la indistinguibilidad. -->
- [ ] C) 32
  <!-- feedback: OlvidÃ³ restar el caso de grupo vacÃ­o antes de dividir entre 2. -->
- [ ] D) 15
  <!-- feedback: Corresponde a C(6,2). -->

### Explicacion Pedagogica
Particionar un conjunto de $n$ elementos en 2 grupos no vacÃ­os viene dado por $S(n,2) = \frac{2^n - 2}{2} = 2^{n-1} - 1$. Para $n=6$: $2^5 - 1 = 32 - 1 = 31$.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.60
**Contexto:** En un torneo de ajedrez con $n$ participantes en Armenia, cada jugador enfrenta a todos los demÃ¡s exactamente una vez. Se disputan en total 66 partidas.

### Enunciado
Â¿CuÃ¡ntos jugadores $n$ estÃ¡n inscritos en el torneo?

### Opciones
- [x] A) 12
  <!-- feedback: C(n,2) = n(n-1)/2 = 66 -> n(n-1) = 132. Como 12 * 11 = 132, n = 12. -->
- [ ] B) 11
  <!-- feedback: Si n=11, C(11,2) = 55 partidas. -->
- [ ] C) 13
  <!-- feedback: Si n=13, C(13,2) = 78 partidas. -->
- [ ] D) 66
  <!-- feedback: ConfundiÃ³ el nÃºmero de partidas con el nÃºmero de jugadores. -->

### Explicacion Pedagogica
$\binom{n}{2} = \frac{n(n-1)}{2} = 66 Rightarrow n(n-1) = 132$. Resolviendo la ecuaciÃ³n cuadrÃ¡tica $n^2 - n - 132 = 0 Rightarrow (n-12)(n+11) = 0 Rightarrow n = 12$.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.50
**Contexto:** Se busca determinar el nÃºmero de soluciones enteras estrictamente POSITIVAS ($x_i ge 1$) a la ecuaciÃ³n $x_1 + x_2 + x_3 + x_4 = 12$.

### Enunciado
Â¿CuÃ¡ntas soluciones enteras positivas existen para esta ecuaciÃ³n?

### Opciones
- [x] A) 165
  <!-- feedback: Hacemos y_i = x_i - 1 >= 0. La ecuaciÃ³n queda y_1 + y_2 + y_3 + y_4 = 12 - 4 = 8. C(8 + 4 - 1, 8) = C(11, 8) = C(11, 3) = (11 * 10 * 9) / 6 = 165. -->
- [ ] B) 455
  <!-- feedback: CalculÃ³ C(12+4-1, 12) = C(15,3) para enteros no negativos sin exigir x_i >= 1. -->
- [ ] C) 220
  <!-- feedback: CalculÃ³ C(12, 3) por error. -->
- [ ] D) 84
  <!-- feedback: CalculÃ³ C(9, 3) por error. -->

### Explicacion Pedagogica
Para soluciones en enteros estrictamente positivos, asignamos 1 a cada una de las 4 variables. Quedan $12 - 4 = 8$ unidades por repartir entre 4 variables en enteros no negativos: $\binom{8 + 4 - 1}{8} = \binom{11}{3} = \frac{11   imes 10   imes 9}{6} = 165$.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.50
**Contexto:** Un grupo de 4 parejas de cartas numeradas del 1 al 4 (total 8 cartas) se mezclan en una mesa.

### Enunciado
Â¿De cuÃ¡ntas maneras se pueden seleccionar 4 cartas de modo que NO HAYA NINGUNA PAREJA completa en la selecciÃ³n?

### Opciones
- [x] A) 16
  <!-- feedback: Para evitar parejas completas, debemos elegir exactamente 1 carta de cada una de las 4 parejas distintas. Como cada pareja tiene 2 cartas, hay 2^4 = 16 formas. -->
- [ ] B) 70
  <!-- feedback: Corresponde a C(8,4) total sin restricciones. -->
- [ ] C) 48
  <!-- feedback: CalculÃ³ C(4,1) * C(4,3) * 2 por error. -->
- [ ] D) 32
  <!-- feedback: MultiplicÃ³ 16 por 2. -->

### Explicacion Pedagogica
Para no tener parejas completas al elegir 4 cartas de 4 parejas, debemos seleccionar exactamente una carta de cada pareja. Hay 4 decisiones independientes con 2 opciones cada una: $2   imes 2   imes 2   imes 2 = 2^4 = 16$.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.45
**Contexto:** Evaluando la identidad combinatoria $sum_{k=0}^n \binom{n}{k}^2 = \binom{2n}{n}$.

### Enunciado
Para $n = 3$, verifique la suma de los cuadrados de la fila 3 del TriÃ¡ngulo de Pascal e identifique el valor equivalente $\binom{6}{3}$.

### Opciones
- [x] A) $1^2 + 3^2 + 3^2 + 1^2 = 20$, que es igual a $\binom{6}{3} = 20$.
  <!-- feedback: 1 + 9 + 9 + 1 = 20. C(6,3) = (6 * 5 * 4) / 6 = 20. La identidad combinatoria de Vandermonde se cumple perfectamente. -->
- [ ] B) $1^2 + 3^2 + 3^2 + 1^2 = 18$, diferente de $\binom{6}{3} = 20$.
  <!-- feedback: ErrÃ³ en la suma de 1 + 9 + 9 + 1. -->
- [ ] C) $1 + 3 + 3 + 1 = 8$, que es igual a $2^3$.
  <!-- feedback: SumÃ³ los coeficientes simples sin elevarlos al cuadrado. -->
- [ ] D) $1^2 + 3^2 + 3^2 + 1^2 = 36$, que es igual a $6^2$.
  <!-- feedback: ErrÃ³ gravemente en la elevaciÃ³n de los tÃ©rminos. -->

### Explicacion Pedagogica
Fila $n=3$: coeficientes $1, 3, 3, 1$. Suma de cuadrados: $1^2 + 3^2 + 3^2 + 1^2 = 1 + 9 + 9 + 1 = 20$.
Por el otro lado: $\binom{2(3)}{3} = \binom{6}{3} = \frac{6   imes 5   imes 4}{3   imes 2   imes 1} = 20$.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W37-combinatoria-avanzada-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.45
**Contexto:** Cuatro secretarias en una oficina de BogotÃ¡ escriben 4 cartas distintas y preparan 4 sobres con las direcciones correspondientes. Si las cartas se colocan en los sobres al azar.

### Enunciado
Â¿CuÃ¡l es la probabilidad de que NINGUNA carta llegue a su destinatario correcto (desarreglo completo $D_4$)?

### Opciones
- [x] A) $\frac{3}{8}$
  <!-- feedback: D4 = 9 desarreglos. Total de formas de meter 4 cartas en 4 sobres: 4! = 24. P = 9/24 = 3/8 = 0.375. -->
- [ ] B) $\frac{1}{24}$
  <!-- feedback: Corresponde a la probabilidad de que TODAS las cartas lleguen a su destinatario correcto. -->
- [ ] C) $\frac{1}{4}$
  <!-- feedback: EstimÃ³ 1/4 por intuiciÃ³n simple. -->
- [ ] D) $\frac{1}{2}$
  <!-- feedback: AsumiÃ³ un 50% de probabilidad sin calcular los desarreglos. -->

### Explicacion Pedagogica
NÃºmero de casos favorables (desarreglos $D_4$) $= 9$. NÃºmero de casos posibles ($4!$) $= 24$.
$P(	ext{ninguna correcta}) = \frac{9}{24} = \frac{3}{8} = 0.375$.
