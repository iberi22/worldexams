---
id: "CO-MAT-8-2026-W19-tecnicas-conteo-001-MASTERY-bundle"
country: "colombia"
grado: 8
asignatura: "matematicas"
tema: "tecnicas-conteo"
periodo: "weekly"
week: "W19"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 12
bundle_size: 12
alignment: "DBA MEN Colombia / Saber 11"
bundle_index: 19
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# Bundle MASTERY: Técnicas de Conteo - Grado 8

Este bundle contiene 12 preguntas sobre **tecnicas-conteo** para grado 8, alineadas con los DBA del MEN Colombia y el marco de evaluación ICFES Saber 11.

## Question 1 [D3-D4]
**ID:** CO-MAT-8-2026-W19-tecnicas-conteo-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Aleatorio
**Expected_Success:** 0.85
**Contexto:** En Medellín, la profesora explica cómo contar las combinaciones de uniformes del colegio sin escribirlas todas.
### Enunciado
¿Qué afirma el principio fundamental del conteo?
### Opciones
- [x] A) Si una tarea se hace en etapas sucesivas, el total de formas es el producto de las opciones de cada etapa.
  <!-- feedback: Correcto. Esa es la definición del principio multiplicativo del conteo. -->
- [ ] B) El total de formas siempre es la suma de las opciones de cada etapa.
  <!-- feedback: Incorrecto. La suma aplica a alternativas excluyentes, no a etapas sucesivas. -->
- [ ] C) El total de formas es el cociente entre las opciones de cada etapa.
  <!-- feedback: Incorrecto. El principio fundamental usa el producto, no el cociente. -->
- [ ] D) El total de formas es igual al número de etapas del proceso.
  <!-- feedback: Incorrecto. El número de etapas no es el total; se deben multiplicar las opciones. -->
### Explicacion Pedagogica
El principio fundamental del conteo, también llamado principio multiplicativo, establece que si la etapa 1 tiene $m$ opciones y la etapa 2 tiene $n$ opciones, el total es $m \times n$. Es la base de las permutaciones, las combinaciones y los diagramas de árbol.

## Question 2 [D3-D4]
**ID:** CO-MAT-8-2026-W19-tecnicas-conteo-001-MASTERY-bundle-v2
**Bloom:** Understand
**ICFES:** Aleatorio
**Expected_Success:** 0.85
**Contexto:** En Bogotá, Valentina tiene 3 blusas y 2 faldas del uniforme para combinar durante la semana.
### Enunciado
¿De cuántas formas distintas puede combinar una blusa con una falda?
### Opciones
- [ ] A) 5 formas, porque se suman las blusas y las faldas.
  <!-- feedback: Incorrecto. La suma cuenta prendas, no combinaciones entre blusa y falda. -->
- [x] B) 6 formas, porque se multiplica 3 por 2.
  <!-- feedback: Correcto. Cada blusa se puede usar con cada falda: 3 por 2 = 6. -->
- [ ] C) 9 formas, porque se multiplica 3 por 3.
  <!-- feedback: Incorrecto. El segundo factor debe ser 2, que es el número de faldas. -->
- [ ] D) 12 formas, porque se duplica el producto de 3 por 2.
  <!-- feedback: Incorrecto. No hay razón para duplicar; el producto directo ya da el total. -->
### Explicacion Pedagogica
Cada una de las 3 blusas se combina con cada una de las 2 faldas, así que el total es $3 \times 2 = 6$ formas. Un diagrama de árbol con 3 ramas iniciales y 2 ramas en cada una muestra las 6 combinaciones.

## Question 3 [D5-D6]
**ID:** CO-MAT-8-2026-W19-tecnicas-conteo-001-MASTERY-bundle-v3
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.80
**Contexto:** En Cali, entre 5 estudiantes del curso se deben elegir un presidente y un vicepresidente del comité cultural, cargos diferentes.
### Enunciado
¿De cuántas formas se pueden asignar los dos cargos?
### Opciones
- [ ] A) 10 formas, porque se suman 5 más 5.
  <!-- feedback: Incorrecto. La suma no modela la asignación de cargos distintos. -->
- [ ] B) 15 formas, porque se resta 5 de 20.
  <!-- feedback: Incorrecto. Ese cálculo no corresponde a ninguna técnica de conteo válida aquí. -->
- [x] C) 20 formas, porque se calcula 5 por 4.
  <!-- feedback: Correcto. Hay 5 opciones para presidente y 4 restantes para vicepresidente. -->
- [ ] D) 25 formas, porque se calcula 5 por 5.
  <!-- feedback: Incorrecto. La misma persona no puede ocupar los dos cargos a la vez. -->
### Explicacion Pedagogica
El orden importa porque los cargos son diferentes: es una permutación $P(5,2) = 5 \times 4 = 20$. Después de elegir al presidente quedan 4 candidatos para la vicepresidencia, por eso el segundo factor es 4 y no 5.

## Question 4 [D5-D6]
**ID:** CO-MAT-8-2026-W19-tecnicas-conteo-001-MASTERY-bundle-v4
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.75
**Contexto:** En Cartagena, de un grupo de 6 amigos se debe elegir una pareja para representarlos en el torneo de dominó, sin importar el orden.
### Enunciado
¿Cuántas parejas distintas se pueden formar?
### Opciones
- [ ] A) 12 parejas, porque se multiplica 6 por 2.
  <!-- feedback: Incorrecto. Multiplicar por 2 no descuenta las parejas repetidas por el orden. -->
- [ ] B) 30 parejas, porque se multiplica 6 por 5.
  <!-- feedback: Incorrecto. Ese producto cuenta cada pareja dos veces, una en cada orden. -->
- [ ] C) 6 parejas, porque cada estudiante sale una sola vez.
  <!-- feedback: Incorrecto. Cada estudiante puede formar pareja con otros 5 compañeros. -->
- [x] D) 15 parejas, porque se calcula (6 por 5) dividido entre 2.
  <!-- feedback: Correcto. Se divide entre 2 porque el orden de la pareja no importa. -->
### Explicacion Pedagogica
Como el orden no importa, es una combinación: $C(6,2) = \frac{6 \times 5}{2} = 15$. El producto $6 \times 5 = 30$ cuenta (Ana, Luis) y (Luis, Ana) como distintas, por eso se divide entre $2! = 2$.

## Question 5 [D5-D6]
**ID:** CO-MAT-8-2026-W19-tecnicas-conteo-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.75
**Contexto:** En Barranquilla, la maleta del laboratorio se abre con un candado de 3 dígitos, cada uno del 0 al 9, y los dígitos se pueden repetir.
### Enunciado
¿Cuántas claves distintas puede tener el candado?
### Opciones
- [x] A) 1000 claves, porque se calcula 10 por 10 por 10.
  <!-- feedback: Correcto. Cada posición tiene 10 opciones y la repetición está permitida. -->
- [ ] B) 300 claves, porque se multiplica 3 por 100.
  <!-- feedback: Incorrecto. Ese cálculo no refleja las 10 opciones de cada posición. -->
- [ ] C) 720 claves, porque se calcula 10 por 9 por 8.
  <!-- feedback: Incorrecto. Ese producto supone que no se repiten dígitos, lo cual es falso aquí. -->
- [ ] D) 120 claves, porque se calcula 10 por 6 por 2.
  <!-- feedback: Incorrecto. Esa descomposición no corresponde a las opciones por posición. -->
### Explicacion Pedagogica
Con repetición permitida, cada una de las 3 posiciones tiene 10 opciones: $10 \times 10 \times 10 = 10^3 = 1000$ claves. Si la repetición no estuviera permitida, el cálculo sería $10 \times 9 \times 8 = 720$.

## Question 6 [D7-D8]
**ID:** CO-MAT-8-2026-W19-tecnicas-conteo-001-MASTERY-bundle-v6
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.70
**Contexto:** En Bucaramanga, entre 8 atletas se van a entregar las medallas de oro, plata y bronce en la final intercolegiada.
### Enunciado
¿Qué técnica de conteo aplica y cuántos resultados posibles hay?
### Opciones
- [ ] A) Combinación, con 56 resultados posibles.
  <!-- feedback: Incorrecto. La combinación ignora que las medallas son distintas entre sí. -->
- [x] B) Permutación, con 336 resultados posibles.
  <!-- feedback: Correcto. El orden importa porque las medallas son diferentes: 8 por 7 por 6. -->
- [ ] C) Principio aditivo, con 24 resultados posibles.
  <!-- feedback: Incorrecto. Las etapas son sucesivas, no alternativas excluyentes. -->
- [ ] D) Conteo directo, con 11 resultados posibles.
  <!-- feedback: Incorrecto. Sumar 8 más 3 no modela la entrega de tres medallas distintas. -->
### Explicacion Pedagogica
Como el oro, la plata y el bronce son puestos distintos, el orden importa y se usa la permutación $P(8,3) = 8 \times 7 \times 6 = 336$. Analizar si el orden importa es la clave para elegir entre permutación y combinación.

## Question 7 [D7-D8]
**ID:** CO-MAT-8-2026-W19-tecnicas-conteo-001-MASTERY-bundle-v7
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.70
**Contexto:** En Medellín, de 8 estudiantes del curso se debe elegir un comité de 3 integrantes con los mismos derechos, sin importar el orden.
### Enunciado
¿Cuántos comités distintos se pueden formar?
### Opciones
- [ ] A) 24 comités, porque se multiplica 8 por 3.
  <!-- feedback: Incorrecto. Ese producto no descuenta los órdenes repetidos del comité. -->
- [ ] B) 336 comités, porque se calcula 8 por 7 por 6.
  <!-- feedback: Incorrecto. Ese producto trata como distintos a comités con los mismos integrantes. -->
- [x] C) 56 comités, porque se calcula (8 por 7 por 6) dividido entre 6.
  <!-- feedback: Correcto. Se divide entre 6 porque cada comité de 3 se ordena de 6 formas. -->
- [ ] D) 512 comités, porque se calcula 8 elevado a 3.
  <!-- feedback: Incorrecto. La potencia permite repetir integrantes, lo cual no tiene sentido en un comité. -->
### Explicacion Pedagogica
Es una combinación porque el orden no importa: $C(8,3) = \frac{8 \times 7 \times 6}{3!} = \frac{336}{6} = 56$. Cada trío aparece $3! = 6$ veces en el producto ordenado, por eso se divide entre 6.

## Question 8 [D7-D8]
**ID:** CO-MAT-8-2026-W19-tecnicas-conteo-001-MASTERY-bundle-v8
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.65
**Contexto:** En Bogotá, un restaurante ofrece 4 entradas, 3 platos fuertes y 2 postres para el almuerzo del paseo de curso.
### Enunciado
¿Cuántos menús completos distintos, con una entrada, un plato y un postre, se pueden armar?
### Opciones
- [ ] A) 9 menús, porque se suman 4 más 3 más 2.
  <!-- feedback: Incorrecto. La suma cuenta platos, no combinaciones de menú completo. -->
- [ ] B) 12 menús, porque se multiplica 4 por 3.
  <!-- feedback: Incorrecto. Ese producto olvida incluir la etapa del postre. -->
- [ ] C) 36 menús, porque se multiplica 4 por 3 por 3.
  <!-- feedback: Incorrecto. El tercer factor debe ser 2, que es el número de postres. -->
- [x] D) 24 menús, porque se multiplica 4 por 3 por 2.
  <!-- feedback: Correcto. Son tres etapas sucesivas y se aplica el principio multiplicativo. -->
### Explicacion Pedagogica
El menú se arma en tres etapas sucesivas: entrada, plato y postre. Por el principio fundamental del conteo, el total es $4 \times 3 \times 2 = 24$ menús. Un diagrama de árbol tendría 4 ramas iniciales, 3 en cada una y 2 en cada una de esas.

## Question 9 [D9-D10]
**ID:** CO-MAT-8-2026-W19-tecnicas-conteo-001-MASTERY-bundle-v9
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.60
**Contexto:** En Cali, un estudiante afirma que elegir un presidente y un vicepresidente entre 5 candidatos da 10 formas, porque calcula (5 por 4) dividido entre 2.
### Enunciado
¿Es correcto el procedimiento del estudiante?
### Opciones
- [x] A) No, porque confundió combinación con permutación: los cargos son distintos y el total es 20.
  <!-- feedback: Correcto. Dividir entre 2 solo aplica cuando el orden no importa. -->
- [ ] B) Sí, porque siempre se debe dividir entre 2 al elegir dos personas.
  <!-- feedback: Incorrecto. Solo se divide cuando el orden no genera resultados distintos. -->
- [ ] C) No, porque el total correcto es 10 dividido entre 2, es decir 5.
  <!-- feedback: Incorrecto. Esa operación adicional no tiene ningún fundamento en las técnicas de conteo. -->
- [ ] D) Sí, porque 5 por 4 es 20 y la mitad de 20 es 10.
  <!-- feedback: Incorrecto. Que la aritmética sea correcta no valida la técnica elegida. -->
### Explicacion Pedagogica
Presidente y vicepresidente son cargos distintos, así que (Ana, Luis) y (Luis, Ana) son resultados diferentes: es una permutación $P(5,2) = 20$. El estudiante aplicó la fórmula de la combinación $C(5,2) = 10$ a un caso ordenado. Evaluar un procedimiento exige verificar primero si el orden importa.

## Question 10 [D9-D10]
**ID:** CO-MAT-8-2026-W19-tecnicas-conteo-001-MASTERY-bundle-v10
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.60
**Contexto:** En Cartagena, de 10 estudiantes se debe formar una comisión de 3 personas que incluya obligatoriamente a la personerita del curso.
### Enunciado
¿Cuántas comisiones distintas cumplen la condición?
### Opciones
- [ ] A) 120 comisiones, porque se calcula 10 por 6 por 2.
  <!-- feedback: Incorrecto. Ese cálculo ignora que un puesto ya está ocupado por la personerita. -->
- [x] B) 36 comisiones, porque se eligen 2 entre los 9 restantes.
  <!-- feedback: Correcto. Fijar a la personerita deja elegir 2 de 9: (9 por 8) entre 2. -->
- [ ] C) 90 comisiones, porque se calcula 10 por 9.
  <!-- feedback: Incorrecto. Ese producto cuenta parejas ordenadas sin fijar a la personerita. -->
- [ ] D) 27 comisiones, porque se calcula 9 por 3.
  <!-- feedback: Incorrecto. Multiplicar 9 por 3 no descuenta los órdenes repetidos. -->
### Explicacion Pedagogica
Al fijar a la personerita, solo quedan 2 puestos libres entre los otros 9 estudiantes y el orden no importa: $C(9,2) = \frac{9 \times 8}{2} = 36$. Las condiciones de obligatoriedad reducen el problema antes de aplicar la fórmula.

## Question 11 [D9-D10]
**ID:** CO-MAT-8-2026-W19-tecnicas-conteo-001-MASTERY-bundle-v11
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.55
**Contexto:** En Barranquilla, 4 amigos van a cine y dos de ellos, Daniela y Santiago, quieren sentarse juntos en la misma fila de 4 sillas.
### Enunciado
¿De cuántas formas se pueden sentar cumpliendo esa condición?
### Opciones
- [ ] A) 24 formas, porque se calcula el factorial de 4.
  <!-- feedback: Incorrecto. Ese valor cuenta todas las formas sin exigir que los dos queden juntos. -->
- [ ] B) 6 formas, porque se calcula el factorial de 3.
  <!-- feedback: Incorrecto. Ese valor trata al bloque como fijo e ignora que Daniela y Santiago se pueden intercambiar. -->
- [x] C) 12 formas, porque se agrupan los dos como un bloque y se multiplican 6 por 2.
  <!-- feedback: Correcto. El bloque más los otros 2 da 3! = 6, por 2 órdenes internos = 12. -->
- [ ] D) 8 formas, porque se multiplica 4 por 2.
  <!-- feedback: Incorrecto. Ese producto no considera todas las posiciones posibles del bloque. -->
### Explicacion Pedagogica
Se usa la técnica del bloque: Daniela y Santiago forman un bloque, así que se ordenan 3 objetos (bloque + 2 amigos): $3! = 6$. Dentro del bloque hay 2 órdenes posibles, luego el total es $6 \times 2 = 12$ formas.

## Question 12 [D9-D10]
**ID:** CO-MAT-8-2026-W19-tecnicas-conteo-001-MASTERY-bundle-v12
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.55
**Contexto:** En Bucaramanga, en una cuadrícula de calles de 2 cuadras al norte por 2 cuadras al oriente, un mensajero solo puede avanzar al norte o al oriente desde la esquina suroccidental hasta la nororiental.
### Enunciado
¿Cuántas rutas distintas de 4 cuadras puede seguir el mensajero?
### Opciones
- [ ] A) 4 rutas, porque hay 4 cuadras por recorrer.
  <!-- feedback: Incorrecto. El número de cuadras no es el número de rutas; importa el orden de los avances. -->
- [ ] B) 8 rutas, porque se multiplica 4 por 2.
  <!-- feedback: Incorrecto. Ese producto no selecciona cuáles avances van al norte. -->
- [ ] C) 16 rutas, porque se calcula 2 elevado a 4.
  <!-- feedback: Incorrecto. Esa potencia permitiría cualquier cantidad de avances al norte, pero deben ser exactamente 2. -->
- [x] D) 6 rutas, porque se eligen las 2 cuadras al norte entre los 4 avances.
  <!-- feedback: Correcto. Es C(4,2) = 6: elegir las posiciones de los avances al norte. -->
### Explicacion Pedagogica
Toda ruta tiene 4 avances con exactamente 2 hacia el norte (N) y 2 hacia el oriente (O). Elegir en qué 2 de las 4 posiciones van las N determina la ruta: $C(4,2) = \frac{4 \times 3}{2} = 6$ rutas (NNOO, NONO, NOON, ONNO, ONON, OONN).
