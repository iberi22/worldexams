---
id: "CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "conteo-combinatoria"
periodo: "weekly"
week: "W33"
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

# Bundle MASTERY: Conteo y Combinatoria - Grado 11

Este bundle contiene 20 preguntas sobre **principios de conteo, permutaciones y combinaciones** para Grado 11, alineadas con los DBA y marcos conceptuales del ICFES Saber 11.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Aleatorio
**Expected_Success:** 0.85
**Contexto:** Camilo tiene 4 camisas distintas y 3 pantalones distintos para vestir en una reunión familiar en Bogotá.

### Enunciado
¿De cuántas maneras diferentes puede combinar una camisa y un pantalón?

### Opciones
- [x] A) 12
  <!-- feedback: Por el principio multiplicativo, el total de combinaciones es 4 * 3 = 12. -->
- [ ] B) 7
  <!-- feedback: Se sumaron las opciones (4 + 3) en lugar de multiplicarlas. -->
- [ ] C) 14
  <!-- feedback: Se realizó un cálculo erróneo sumando y multiplicando. -->
- [ ] D) 9
  <!-- feedback: Se elevó 3 al cuadrado. -->

### Explicacion Pedagogica
El principio fundamental del conteo establece que si un evento ocurre de $m$ maneras y otro de $n$ maneras, la combinación de ambos ocurre de $m   imes n$ maneras. En este caso, $4   imes 3 = 12$.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v2
**Bloom:** Remember
**ICFES:** Aleatorio
**Expected_Success:** 0.85
**Contexto:** Un restaurante en Medellín ofrece un menú del día compuesto por 3 entradas, 4 platos fuertes y 2 postres.

### Enunciado
¿Cuántos almuerzos diferentes compuestos por una entrada, un plato fuerte y un postre se pueden elegir?

### Opciones
- [x] A) 24
  <!-- feedback: Aplicando el principio multiplicativo: 3 * 4 * 2 = 24 opciones distintas de almuerzo. -->
- [ ] B) 9
  <!-- feedback: Se sumaron las opciones disponibles de cada categoría (3 + 4 + 2 = 9). -->
- [ ] C) 18
  <!-- feedback: Se omitió multiplicar por los 4 platos fuertes correctamente. -->
- [ ] D) 12
  <!-- feedback: Se multiplicaron solo dos de las categorías disponibles. -->

### Explicacion Pedagogica
Multiplicando la cantidad de opciones de cada plato: $3   imes 4   imes 2 = 24$ almuerzos posibles.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Aleatorio
**Expected_Success:** 0.80
**Contexto:** En una carrera atletica en Cali compiten 5 atletas y no hay empates.

### Enunciado
¿De cuántas maneras diferentes pueden ocupar las 5 posiciones en la meta?

### Opciones
- [x] A) 120
  <!-- feedback: Es una permutación de 5 elementos: 5! = 5 * 4 * 3 * 2 * 1 = 120. -->
- [ ] B) 25
  <!-- feedback: Se calculó 5 al cuadrado (5^2). -->
- [ ] C) 60
  <!-- feedback: Se dividió 5! entre 2. -->
- [ ] D) 15
  <!-- feedback: Se multiplicó 5 por 3. -->

### Explicacion Pedagogica
El número de ordenamientos posibles de $n$ elementos distintos es dado por el factorial $n!$. Para $n=5$, $5! = 120$.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Aleatorio
**Expected_Success:** 0.80
**Contexto:** Un código de seguridad en una tienda de Barranquilla está formado por 2 letras distintas seleccionadas del conjunto {A, B, C, D}.

### Enunciado
Si el orden de las letras importa, ¿cuántos códigos diferentes se pueden crear?

### Opciones
- [x] A) 12
  <!-- feedback: Es una variación de 4 elementos tomados de a 2: V(4,2) = 4 * 3 = 12. -->
- [ ] B) 6
  <!-- feedback: Corresponde a la combinación C(4,2) donde el orden no importa. -->
- [ ] C) 16
  <!-- feedback: Se asumió que las letras podían repetirse (4^2 = 16). -->
- [ ] D) 8
  <!-- feedback: Se multiplicó 4 por 2. -->

### Explicacion Pedagogica
Dado que el orden de las letras importa y no hay repetición, es una permutación de 4 elementos tomados de a 2: $P(4,2) = \frac{4!}{(4-2)!} = 4   imes 3 = 12$.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.75
**Contexto:** Un comité estudiantil de 8 personas en Bucaramanga debe seleccionar una delegación de 3 integrantes sin cargos específicos.

### Enunciado
¿De cuántas formas se puede seleccionar esta delegación?

### Opciones
- [x] A) 56
  <!-- feedback: Es una combinación C(8,3) = 8! / (3! * 5!) = (8 * 7 * 6) / 6 = 56. -->
- [ ] B) 336
  <!-- feedback: Se calculó la permutación P(8,3) = 8 * 7 * 6, pero el orden no importa en una delegación. -->
- [ ] C) 24
  <!-- feedback: Se multiplicó 8 por 3. -->
- [ ] D) 112
  <!-- feedback: Se multiplicó 56 por 2 por un error de simplificación. -->

### Explicacion Pedagogica
Al no importar el orden de los integrantes, se usa la fórmula de combinaciones: $C(n,k) = \frac{n!}{k!(n-k)!}$. Para $C(8,3) = \frac{8   imes 7   imes 6}{3   imes 2   imes 1} = 56$.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.75
**Contexto:** De un grupo de 6 hombres y 5 mujeres en una empresa de Cartagena, se va a formar un equipo de trabajo de 4 personas.

### Enunciado
¿De cuántas maneras se puede formar el equipo si debe haber exactamente 2 hombres y 2 mujeres?

### Opciones
- [x] A) 150
  <!-- feedback: C(6,2) = 15 maneras para los hombres; C(5,2) = 10 maneras para las mujeres. Total = 15 * 10 = 150. -->
- [ ] B) 25
  <!-- feedback: Se sumaron las combinaciones C(6,2) + C(5,2) = 15 + 10 = 25. -->
- [ ] C) 330
  <!-- feedback: Se calculó C(11,4) en lugar de separar por géneros. -->
- [ ] D) 60
  <!-- feedback: Se multiplicaron 6 * 5 * 2. -->

### Explicacion Pedagogica
Seleccionar 2 hombres de 6 se hace de $C(6,2) = 15$ formas. Seleccionar 2 mujeres de 5 se hace de $C(5,2) = 10$ formas. Por principio multiplicativo: $15   imes 10 = 150$.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.75
**Contexto:** Se quieren acomodar 6 libros distintos en un estante de una biblioteca en Pereira.

### Enunciado
Si 2 libros específicos deben estar siempre juntos, ¿de cuántas maneras se pueden organizar los 6 libros?

### Opciones
- [x] A) 240
  <!-- feedback: Consideramos los 2 libros como 1 solo bloque: 5! = 120 formas. Los 2 libros se pueden ordenar entre sí de 2! = 2 maneras. Total = 120 * 2 = 240. -->
- [ ] B) 120
  <!-- feedback: Se olvidó multiplicar por las 2! formas de permutar los 2 libros entre sí dentro del bloque. -->
- [ ] C) 720
  <!-- feedback: Se calculó 6! ignorando la restricción de que deben estar juntos. -->
- [ ] D) 480
  <!-- feedback: Se multiplicó 5! por 4 por error. -->

### Explicacion Pedagogica
Tratamos a los 2 libros juntos como un único elemento. Así agrupamos 5 elementos: $5! = 120$ formas. Como los 2 libros internos se permutan de $2! = 2$ formas, el total es $120   imes 2 = 240$.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.70
**Contexto:** ¿Cuántas palabras con o sin sentido de 4 letras se pueden formar usando las letras de la palabra "LIMA"?

### Enunciado
No se permite repetir ninguna letra en la palabra formada.

### Opciones
- [x] A) 24
  <!-- feedback: Las letras son 4 distintas (L, I, M, A). El número de permutaciones es 4! = 4 * 3 * 2 * 1 = 24. -->
- [ ] B) 256
  <!-- feedback: Se asumió que las letras podían repetirse (4^4 = 256). -->
- [ ] C) 16
  <!-- feedback: Se calculó 4 * 4. -->
- [ ] D) 12
  <!-- feedback: Se dividió 4! entre 2. -->

### Explicacion Pedagogica
Al ser 4 letras distintas y formar palabras de 4 letras sin repetición, se permutan todas: $P_4 = 4! = 24$.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.70
**Contexto:** Una placa vehicular en Colombia consta de 3 letras seguidas de 3 dígitos.

### Enunciado
Si se utilizan 26 letras del alfabeto y los dígitos del 0 al 9, ¿cuántas placas diferentes se pueden fabricar si se permite la repetición de letras y dígitos?

### Opciones
- [x] A) $26^3   imes 10^3$
  <!-- feedback: Hay 26 opciones para cada una de las 3 letras y 10 opciones para cada uno de los 3 dígitos: 26^3 * 10^3 = 17,576,000. -->
- [ ] B) $26   imes 3 + 10   imes 3$
  <!-- feedback: Se aplicó principio aditivo en lugar de multiplicativo. -->
- [ ] C) $26   imes 25   imes 24   imes 10   imes 9   imes 8$
  <!-- feedback: Se asumió erróneamente que no se permitía la repetición de letras y dígitos. -->
- [ ] D) $36^6$
  <!-- feedback: Se combinaron letras y dígitos en un solo conjunto de 36 elementos sin mantener el formato estructurado. -->

### Explicacion Pedagogica
Cada posición es independiente y permite repetición. Para 3 letras hay $26^3$ posibilidades y para 3 dígitos hay $10^3$. En total $26^3   imes 10^3 = 17,576,000$.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.70
**Contexto:** En un torneo de fútbol de 10 equipos en Pasto, todos juegan contra todos a una sola vuelta.

### Enunciado
¿Cuántos partidos se disputan en total durante el torneo?

### Opciones
- [x] A) 45
  <!-- feedback: Cada partido es una combinación de 2 equipos tomados de 10: C(10,2) = (10 * 9) / 2 = 45. -->
- [ ] B) 90
  <!-- feedback: Se calculó P(10,2) = 10 * 9, contando ida y vuelta (el orden importa). -->
- [ ] C) 100
  <!-- feedback: Se multiplicó 10 * 10. -->
- [ ] D) 20
  <!-- feedback: Se multiplicó 10 por 2. -->

### Explicacion Pedagogica
Un partido no depende del orden de selección de los equipos. El número de enfrentamientos a una sola vuelta es $C(10,2) = \frac{10   imes 9}{2} = 45$.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.65
**Contexto:** ¿Cuántas palabras distintas de 6 letras se pueden formar permutando las letras de la palabra "BANANA"?

### Enunciado
Tenga en cuenta que la palabra tiene letras repetidas (1 'B', 3 'A', 2 'N').

### Opciones
- [x] A) 60
  <!-- feedback: Permutación con repetición: 6! / (1! * 3! * 2!) = 720 / (1 * 6 * 2) = 720 / 12 = 60. -->
- [ ] B) 720
  <!-- feedback: Se calculó 6! sin descontar las permutaciones de las letras repetidas. -->
- [ ] C) 120
  <!-- feedback: Se dividió 6! solo entre 3! o solo entre 2!. -->
- [ ] D) 30
  <!-- feedback: Se dividió 60 entre 2 erróneamente. -->

### Explicacion Pedagogica
Fórmula de permutación con elementos repetidos: $P_n^{n_1, n_2, dots} = \frac{n!}{n_1! n_2! dots}$. Para BANANA: $\frac{6!}{1! 3! 2!} = \frac{720}{12} = 60$.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.65
**Contexto:** Un grupo de 5 personas se va a sentar alrededor de una mesa circular en un restaurante de Santa Marta.

### Enunciado
¿De cuántas maneras diferentes se pueden ubicar respecto a la mesa?

### Opciones
- [x] A) 24
  <!-- feedback: Las permutaciones circulares de n elementos vienen dadas por (n-1)! = (5-1)! = 4! = 24. -->
- [ ] B) 120
  <!-- feedback: Se calculó 5! en línea recta en lugar de una disposición circular. -->
- [ ] C) 60
  <!-- feedback: Se dividió 5! entre 2 en lugar de 5. -->
- [ ] D) 12
  <!-- feedback: Se calculó (5-2)!. -->

### Explicacion Pedagogica
En permutaciones circulares, una posición fija elimina la simetría por rotación. Por ello $PC_n = (n-1)!$. Para $n=5$, $PC_5 = 4! = 24$.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.60
**Contexto:** Se requiere formar un código de 4 dígitos utilizando únicamente los números {1, 2, 3, 4, 5}.

### Enunciado
¿Cuántos códigos de 4 dígitos se pueden formar de modo que tengan AL MENOS un dígito repetido?

### Opciones
- [x] A) 505
  <!-- feedback: Total sin restricción: 5^4 = 625. Códigos con todos los dígitos distintos: P(5,4) = 5*4*3*2 = 120. Con al menos un repetido: 625 - 120 = 505. -->
- [ ] B) 120
  <!-- feedback: Corresponde a los códigos que NO tienen dígitos repetidos. -->
- [ ] C) 625
  <!-- feedback: Corresponde al total de códigos sin descontar aquellos con dígitos todos distintos. -->
- [ ] D) 380
  <!-- feedback: Se realizó una resta incorrecta entre 625 y 245. -->

### Explicacion Pedagogica
Utilizando el principio del complemento: Total de códigos $= 5^4 = 625$. Códigos sin repetición $= P(5,4) = 120$. Códigos con al menos una repetición $= 625 - 120 = 505$.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.60
**Contexto:** Un examen consta de 10 preguntas. Un estudiante debe responder exactamente 7 preguntas.

### Enunciado
Si las 3 primeras preguntas son obligatorias, ¿de cuántas maneras distintas puede elegir las preguntas a responder?

### Opciones
- [x] A) 35
  <!-- feedback: Como las 3 primeras son obligatorias, le falta elegir 4 preguntas entre las 7 restantes: C(7,4) = C(7,3) = (7 * 6 * 5) / 6 = 35. -->
- [ ] B) 120
  <!-- feedback: Se calculó C(10,7) ignorando que las 3 primeras preguntas son obligatorias. -->
- [ ] C) 21
  <!-- feedback: Se calculó C(7,2) en lugar de C(7,4). -->
- [ ] D) 70
  <!-- feedback: Se multiplicó 35 por 2. -->

### Explicacion Pedagogica
Al ser obligatorias las 3 primeras, el estudiante solo selecciona $7 - 3 = 4$ preguntas adicionales de las $10 - 3 = 7$ disponibles. $C(7,4) = \frac{7   imes 6   imes 5}{3   imes 2   imes 1} = 35$.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.60
**Contexto:** En un plano hay 8 puntos marcados, de los cuales ningún trío está alineado.

### Enunciado
¿Cuántos triángulos diferentes se pueden formar con sus vértices en estos puntos?

### Opciones
- [x] A) 56
  <!-- feedback: Para formar un triángulo se eligen 3 puntos sin importar el orden: C(8,3) = (8 * 7 * 6) / 6 = 56. -->
- [ ] B) 336
  <!-- feedback: Se calculó P(8,3) = 8 * 7 * 6 considerando el orden de los vértices. -->
- [ ] C) 28
  <!-- feedback: Corresponde a la cantidad de segmentos (líneas) formados por 2 puntos: C(8,2) = 28. -->
- [ ] D) 24
  <!-- feedback: Se multiplicó 8 por 3. -->

### Explicacion Pedagogica
Un triángulo queda determinado por 3 puntos no colineales independientemente del orden de los vértices. Número de triángulos $= C(8,3) = \frac{8   imes 7   imes 6}{6} = 56$.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.60
**Contexto:** Se quiere repartir 4 premios distintos entre 3 estudiantes en un evento escolar en Ibagué.

### Enunciado
Si cada estudiante puede recibir más de un premio (incluso los 4 premios), ¿de cuántas maneras se pueden distribuir los premios?

### Opciones
- [x] A) 81
  <!-- feedback: Cada uno de los 4 premios tiene 3 opciones de estudiante a quien asignarlo: 3^4 = 81. -->
- [ ] B) 64
  <!-- feedback: Se calculó 4^3 asignando estudiantes a premios por error. -->
- [ ] C) 12
  <!-- feedback: Se multiplicó 4 por 3. -->
- [ ] D) 24
  <!-- feedback: Se calculó 4! asumiendo permutación de 4 premios entre 4 personas. -->

### Explicacion Pedagogica
Dado que los premios son distintos, para el primer premio hay 3 opciones, para el segundo 3, para el tercero 3 y para el cuarto 3. Total $= 3   imes 3   imes 3   imes 3 = 3^4 = 81$.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.50
**Contexto:** ¿Cuántos números enteros impares de 3 cifras significativas se pueden formar con los dígitos {0, 1, 2, 3, 4, 5} sin repetir ningún dígito?

### Enunciado
Tenga en cuenta que la primera cifra no puede ser cero y la última cifra debe ser impar.

### Opciones
- [x] A) 48
  <!-- feedback: Última cifra (impar {1,3,5}): 3 opciones. Primera cifra (no 0 ni la usada al final): 4 opciones. Segunda cifra (cualquiera no usada): 4 opciones. Total = 4 * 4 * 3 = 48. -->
- [ ] B) 60
  <!-- feedback: Se consideraron 5 opciones para la primera cifra sin descontar que el cero no puede ir al inicio o que la cifra final ya fue elegida. -->
- [ ] C) 36
  <!-- feedback: Se limitaron erróneamente las opciones de la cifra intermedia. -->
- [ ] D) 72
  <!-- feedback: Se calculó 6 * 4 * 3 ignorando la restricción de la primera cifra diferente de cero. -->

### Explicacion Pedagogica
1. Elegimos la última cifra (debe ser 1, 3 o 5): 3 posibilidades.
2. Elegimos la primera cifra (no puede ser 0 ni la cifra elegida al final): de 6 dígitos restamos 2 $Rightarrow 4$ posibilidades.
3. Elegimos la cifra central (cualquiera restante): 4 posibilidades.
Total $= 4   imes 4   imes 3 = 48$.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.50
**Contexto:** En un torneo de ajedrez en Villavicencio hay 12 participantes. Se seleccionan 4 finalistas y de estos se premia a los 3 primeros lugares (oro, plata y bronce).

### Enunciado
¿De cuántas maneras diferentes se pueden otorgar las medallas de oro, plata y bronce entre los 12 participantes?

### Opciones
- [x] A) 1320
  <!-- feedback: Es una variación de 12 elementos tomados de a 3: V(12,3) = 12 * 11 * 10 = 1320. -->
- [ ] B) 220
  <!-- feedback: Corresponde a la combinación C(12,3) donde el orden de las medallas no importa. -->
- [ ] C) 495
  <!-- feedback: Corresponde a la combinación C(12,4) de seleccionar los 4 finalistas sin asignar medallas. -->
- [ ] D) 1728
  <!-- feedback: Se calculó 12^3 con repetición de ganadores. -->

### Explicacion Pedagogica
Asignar 3 medallas distintas (oro, plata, bronce) entre 12 personas es una variación de 12 elementos tomados de 3 en 3: $P(12,3) = 12   imes 11   imes 10 = 1320$.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.45
**Contexto:** Un grupo de 4 parejas de esposos (8 personas) asiste a una función de teatro.

### Enunciado
¿De cuántas maneras se pueden sentar en una fila de 8 sillas de modo que cada pareja permanezca sentada junta?

### Opciones
- [x] A) 384
  <!-- feedback: Ordenar las 4 parejas como bloques: 4! = 24. Cada una de las 4 parejas puede ordenarse internamente de 2! formas: 2^4 = 16. Total = 24 * 16 = 384. -->
- [ ] B) 576
  <!-- feedback: Se multiplicó 24 por 24 por un error de exponenciación. -->
- [ ] C) 40320
  <!-- feedback: Se calculó 8! ignorando que las parejas deben estar juntas. -->
- [ ] D) 96
  <!-- feedback: Se multiplicó 24 * 4 en lugar de 24 * 16. -->

### Explicacion Pedagogica
Consideramos cada pareja como un bloque. Hay $4! = 24$ formas de ordenar las parejas. Dentro de cada bloque, los 2 esposos se acomodan de $2! = 2$ formas. Por lo tanto, el total es $4!   imes 2^4 = 24   imes 16 = 384$.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W33-conteo-combinatoria-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.45
**Contexto:** Se dispone de 6 monedas idénticas de 500 pesos para repartir entre 3 niños en Popayán.

### Enunciado
¿De cuántas maneras se pueden distribuir las 6 monedas entre los 3 niños si se permite que algún niño no reciba ninguna moneda?

### Opciones
- [x] A) 28
  <!-- feedback: Es una combinación con repetición CR(n,k) = C(n+k-1, k) = C(3+6-1, 6) = C(8,6) = C(8,2) = 28. -->
- [ ] B) 18
  <!-- feedback: Se multiplicó 6 por 3. -->
- [ ] C) 216
  <!-- feedback: Se calculó 6^3 como si las monedas fueran distinguibles. -->
- [ ] D) 56
  <!-- feedback: Se calculó C(8,3). -->

### Explicacion Pedagogica
Al ser objetos idénticos (monedas) repartidos entre contenedores distinguibles (niños), se usa combinaciones con repetición (barras y estrellas): $C(n+k-1, k) = C(3+6-1, 6) = C(8,6) = \frac{8   imes 7}{2} = 28$.
