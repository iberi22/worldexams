---
id: CO-MAT-9-2026-W38-tecnicas-conteo-permutaciones-001-MASTERY-bundle
country: colombia
grado: 9
asignatura: matematicas
tema: tecnicas-conteo-permutaciones
periodo: weekly
week: W38
year: 2026
bundle_type: weekly
protocol_version: 5.2
total_questions: 12
bundle_size: 12
alignment: "DBA MEN Colombia / Saber 11"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: FREE
tier: legacy
creador: "Jules-Agent"
---

# Bundle MASTERY: Tecnicas de Conteo y Permutaciones - Grado 9

Este bundle contiene 12 preguntas sobre **tecnicas de conteo, principio multiplicativo y aditivo, factorial, permutaciones lineales y con repeticion, diagramas de arbol, contrasenas, placas y formacion de comites** para grado 9, alineadas con los DBA del MEN Colombia y el marco de evaluacion ICFES Saber 11.

## Question 1 [D3-D4]
**ID:** CO-MAT-9-2026-W38-tecnicas-conteo-permutaciones-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Aleatorio
**Expected_Success:** 0.90
**Contexto:** Una profesora de matematicas de un colegio publico de Bogota introduce a sus estudiantes de noveno la notacion factorial durante una clase sobre tecnicas de conteo.
### Enunciado
Que expresa el simbolo $n!$ cuando $n$ es un numero entero positivo?
### Opciones
- [x] A) El producto de todos los numeros enteros positivos desde $1$ hasta $n$, es decir, $n! = 1 \times 2 \times 3 \times \cdots \times n$.
  <!-- feedback: Correcto. Por definicion, $n!$ es el producto de los enteros positivos consecutivos desde $1$ hasta $n$, con el caso especial $0! = 1$. -->
- [ ] B) La suma de los numeros enteros positivos desde $1$ hasta $n$.
  <!-- feedback: Incorrecto. Eso corresponde a la suma $1+2+\dots+n$, que no tiene relacion con el factorial. -->
- [ ] C) El producto de $n$ por $(n-1)$ solamente.
  <!-- feedback: Incorrecto. Esa expresion equivale a $n \times (n-1)$, que es solo un paso intermedio del factorial, no el factorial completo. -->
- [ ] D) La division de $n$ entre $(n-1)$.
  <!-- feedback: Incorrecto. La operacion inversa del factorial no es una division simple sino la funcion Gamma o el factorial del entero anterior. -->
### Explicacion Pedagogica
La notacion factorial se define como $n! = 1 \times 2 \times 3 \times \cdots \times n$ para todo entero $n \ge 1$ y $0! = 1$. Reconocer esta definicion es la base para comprender permutaciones y combinaciones en grados posteriores.

## Question 2 [D3-D4]
**ID:** CO-MAT-9-2026-W38-tecnicas-conteo-permutaciones-001-MASTERY-bundle-v2
**Bloom:** Understand
**ICFES:** Aleatorio
**Expected_Success:** 0.88
**Contexto:** En un restaurante tradicional de Medellin, la carta ofrece $3$ tipos de bandeja paisa y $4$ clases de jugo natural; el mesero toma cada pedido de forma independiente.
### Enunciado
Por que el numero total de combinaciones posibles de bandeja con jugo se calcula multiplicando $3 \times 4$ y no sumando $3 + 4$?
### Opciones
- [ ] A) Es un capricho del profesor, pues sumar o multiplicar daria el mismo resultado siempre.
  <!-- feedback: Incorrecto. La suma y el producto son operaciones distintas y solo coinciden en casos muy especificos. -->
- [x] B) Porque cada una de las $3$ bandejas puede acompanarse con cualquiera de los $4$ jugos, formando parejas independientes, y eso se cuenta con el principio multiplicativo.
  <!-- feedback: Correcto. Cuando las decisiones son independientes, el conteo se hace con el principio multiplicativo: $3 \times 4 = 12$ combinaciones posibles. -->
- [ ] C) Porque sumando se obtiene exactamente el mismo resultado cuando los numeros son pequenos.
  <!-- feedback: Incorrecto. $3+4=7$ y $3 \times 4 = 12$ son distintos; no coinciden por ser pequenos. -->
- [ ] D) Solo se aplica la multiplicacion cuando hay mas de $5$ elementos en total.
  <!-- feedback: Incorrecto. El principio multiplicativo se aplica siempre que las elecciones sean independientes, sin importar la cantidad. -->
### Explicacion Pedagogica
El principio multiplicativo establece que si una decision puede tomarse de $m$ formas y otra decision independiente de $n$ formas, entonces hay $m \times n$ formas de tomar ambas. Sumar seria incorrecto porque eso contaria las opciones como excluyentes, cuando aqui pueden combinarse libremente.

## Question 3 [D5-D6]
**ID:** CO-MAT-9-2026-W38-tecnicas-conteo-permutaciones-001-MASTERY-bundle-v3
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.82
**Contexto:** En Bogota, las placas de los vehiculos particulares tienen el formato de $3$ letras seguidas de $3$ digitos, sin restricciones adicionales sobre las letras ni sobre los digitos.
### Enunciado
Cuantas placas distintas pueden emitirse bajo ese formato?
### Opciones
- [ ] A) $26 \times 10 = 260$ placas, una por cada combinacion simple de una letra y un digito.
  <!-- feedback: Incorrecto. Esa cuenta corresponderia a placas con una sola letra y un solo digito, no al formato completo de seis posiciones. -->
- [x] B) $26^3 \times 10^3 = 17576000$ placas, porque cada posicion se elige de manera independiente.
  <!-- feedback: Correcto. En cada una de las $3$ posiciones de letra hay $26$ opciones y en cada una de las $3$ posiciones de digito hay $10$ opciones, y el principio multiplicativo da $26^3 \times 10^3$. -->
- [ ] C) $26 + 10 = 36$ placas, una por cada simbolo distinto del alfabeto alfanumerico.
  <!-- feedback: Incorrecto. Sumar seria valido solo si letras y digitos fueran opciones excluyentes para la misma posicion, lo cual no es el caso. -->
- [ ] D) $3 \times 26 \times 3 \times 10 = 2340$ placas, contando letras y digitos multiplicados por la cantidad de cada uno.
  <!-- feedback: Incorrecto. Multiplicar por $3$ repite las letras o los digitos, lo que duplica cuentas que ya estan contempladas en las potencias. -->
### Explicacion Pedagogica
Aplicar el principio multiplicativo a un problema de varios caracteres equivale a elevar la cantidad de simbolos de cada tipo al numero de posiciones disponibles. Asi, $26^3$ cubre las letras y $10^3$ los digitos, y el producto final es el numero total de placas posibles.

## Question 4 [D5-D6]
**ID:** CO-MAT-9-2026-W38-tecnicas-conteo-permutaciones-001-MASTERY-bundle-v4
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.80
**Contexto:** En la cafeteria de un colegio de Cartagena el menu de postres ofrece $3$ opciones de torta, $4$ opciones de helado y $2$ opciones de fruta. Cada estudiante debe elegir exactamente un postre.
### Enunciado
Cuantas formas distintas tiene un estudiante de elegir su postre, sabiendo que torta, helado y fruta son categorias excluyentes entre si?
### Opciones
- [ ] A) $3 \times 4 \times 2 = 24$ formas, una por cada combinacion simultanea de las tres categorias.
  <!-- feedback: Incorrecto. Multiplicar asume que se elige una torta, un helado y una fruta a la vez, cuando en realidad solo se escoge un postre. -->
- [x] B) $3 + 4 + 2 = 9$ formas, sumando las opciones excluyentes de cada categoria.
  <!-- feedback: Correcto. Como las categorias son excluyentes, se aplica el principio aditivo y se obtiene $3+4+2 = 9$ formas posibles. -->
- [ ] C) $3 + 4 \times 2 = 11$ formas, mezclando un producto parcial con una suma.
  <!-- feedback: Incorrecto. Multiplicar helado por fruta y luego sumar tortas no corresponde a ninguna regla valida del conteo. -->
- [ ] D) $3^4 \times 2^4 = 1296$ formas, elevando cada categoria a sus sub-opciones.
  <!-- feedback: Incorrecto. Las potencias $3^4$ y $2^4$ no tienen sentido porque ninguna categoria tiene $4$ sub-opciones. -->
### Explicacion Pedagogica
El principio aditivo dice que cuando las opciones son mutuamente excluyentes, el total se obtiene sumando los conteos de cada categoria. En este caso torta, helado y fruta no se eligen a la vez, asi que el total es $3+4+2 = 9$ formas posibles de pedir un postre.

## Question 5 [D5-D6]
**ID:** CO-MAT-9-2026-W38-tecnicas-conteo-permutaciones-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.78
**Contexto:** En una carrera atletica interescolar realizada en el estadio El Campin de Bogota participan $5$ estudiantes. El orden de llegada a la meta define los puntos que cada uno obtiene.
### Enunciado
De cuantas formas distintas pueden llegar a la meta los $5$ corredores si todos tienen la misma probabilidad de quedar en cualquier posicion?
### Opciones
- [ ] A) $5^5 = 3125$ formas, porque cada corredor puede ubicarse en cualquiera de las $5$ posiciones independientemente.
  <!-- feedback: Incorrecto. $5^5$ describe colocaciones con repeticion donde un mismo corredor podria estar en varios lugares a la vez. -->
- [x] B) $5! = 120$ formas, aplicando una permutacion sin repeticion de los $5$ corredores.
  <!-- feedback: Correcto. Como cada corredor ocupa exactamente una posicion, se trata de una permutacion de $5$ elementos distintos y el total es $5! = 120$. -->
- [ ] C) $5 \times 4 = 20$ formas, contando solo el primero y el segundo lugar.
  <!-- feedback: Incorrecto. Esa cuenta ignora el tercer, cuarto y quinto lugar, que tambien son posiciones distintas. -->
- [ ] D) $5 + 4 = 9$ formas, sumando el numero de participantes y de posiciones.
  <!-- feedback: Incorrecto. Sumar cantidades no relacionadas no produce el numero de ordenamientos posibles. -->
### Explicacion Pedagogica
Una permutacion de $n$ elementos distintos es el numero de formas de ordenarlos sin repetir ninguno, que es $n!$. Para $n=5$, se obtiene $5! = 120$ posibles llegadas, una cifra clave para calcular probabilidades en competencias con todos los resultados igualmente probables.

## Question 6 [D5-D6]
**ID:** CO-MAT-9-2026-W38-tecnicas-conteo-permutaciones-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.74
**Contexto:** Una familia de Medellin esta planeando las vacaciones y debe elegir: $2$ posibles fechas de salida, $3$ posibles destinos dentro de Colombia y $2$ tipos de hospedaje (hotel o finca).
### Enunciado
Al dibujar el diagrama de arbol que representa estas tres decisiones independientes, cuantas ramas finales aparecen?
### Opciones
- [x] A) $2 \times 3 \times 2 = 12$ ramas, una por cada combinacion completa de las tres decisiones.
  <!-- feedback: Correcto. Cada nivel del arbol multiplica el numero de opciones, dando $2 \times 3 \times 2 = 12$ combinaciones finales, una por hoja del diagrama. -->
- [ ] B) $2 + 3 + 2 = 7$ ramas, una por cada decision sumada.
  <!-- feedback: Incorrecto. La suma seria valida solo si las decisiones fueran excluyentes, lo que no ocurre porque se toman en paralelo. -->
- [ ] C) $2 \times 3 + 2 = 8$ ramas, mezclando una multiplicacion parcial con una suma final.
  <!-- feedback: Incorrecto. La operacion $2 \times 3 + 2$ no corresponde a ninguna regla valida del conteo. -->
- [ ] D) $3! = 6$ ramas, una permutacion de los destinos.
  <!-- feedback: Incorrecto. $3!$ solo reordena los destinos, pero aqui no se trata de ordenar sino de combinarlos con fechas y hospedaje. -->
### Explicacion Pedagogica
Un diagrama de arbol permite visualizar todas las combinaciones cuando las decisiones son independientes: cada nivel aporta un factor multiplicativo. Por eso, con $2$ fechas, $3$ destinos y $2$ hospedajes, las hojas del arbol son exactamente $12$ combinaciones posibles.

## Question 7 [D7-D8]
**ID:** CO-MAT-9-2026-W38-tecnicas-conteo-permutaciones-001-MASTERY-bundle-v7
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.70
**Contexto:** En un club juvenil de Medellin hay $8$ candidatos para ocupar los cargos de presidente, vicepresidente y tesorero. Cada cargo lo ocupa una persona distinta y nadie puede tener dos cargos a la vez.
### Enunciado
De cuantas formas distintas se pueden asignar los tres cargos?
### Opciones
- [ ] A) $8^3 = 512$ formas, porque en cada cargo puede caer cualquiera de los $8$ candidatos.
  <!-- feedback: Incorrecto. $8^3$ permitiria que la misma persona ocupara varios cargos, lo que viola la condicion del problema. -->
- [x] B) $8 \times 7 \times 6 = 336$ formas, aplicando una permutacion sin repeticion $P(8,3)$.
  <!-- feedback: Correcto. Para presidente hay $8$ opciones, para vicepresidente quedan $7$ y para tesorero $6$, dando $8 \times 7 \times 6 = 336$ asignaciones. -->
- [ ] C) $\binom{8}{3} = 56$ formas, una combinacion sin importar el orden.
  <!-- feedback: Incorrecto. La combinacion ignora que los cargos son distintos; aqui presidente, vicepresidente y tesorero importan. -->
- [ ] D) $3! = 6$ formas, una por cada orden posible de los tres cargos.
  <!-- feedback: Incorrecto. $3!$ solo reordena los cargos entre si, sin considerar cuantos candidatos hay para cada uno. -->
### Explicacion Pedagogica
Cuando se asignan cargos distintos a partir de un conjunto de personas y nadie puede repetirse, se trata de una permutacion sin repeticion $P(n,k) = n!/(n-k)!$. Con $n=8$ y $k=3$, se obtiene $P(8,3) = 8 \times 7 \times 6 = 336$ formas validas de asignacion.

## Question 8 [D7-D8]
**ID:** CO-MAT-9-2026-W38-tecnicas-conteo-permutaciones-001-MASTERY-bundle-v8
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.68
**Contexto:** Una profesora de noveno grado en Bogota reparte a cada uno letras moviles de cartulina con las letras B, O, G, O, T, A y les pide formar cadenas de seis letras, considerando que las dos letras O son identicas entre si.
### Enunciado
Cuantas cadenas distintas de seis letras pueden formarse con esas letras, teniendo en cuenta que las dos O no se distinguen?
### Opciones
- [ ] A) $6! = 720$ cadenas, como si todas las letras fueran distintas.
  <!-- feedback: Incorrecto. $6!$ sobrecuenta porque intercambia las dos O identicas como si fueran letras diferentes. -->
- [x] B) $\dfrac{6!}{2!} = 360$ cadenas, dividiendo por las repeticiones de la letra O.
  <!-- feedback: Correcto. Como las dos O son identicas, cada ordenamiento se cuenta dos veces en $6!$, asi que el numero correcto de cadenas distintas es $6!/2! = 360$. -->
- [ ] C) $6! \times 2 = 1440$ cadenas, duplicando para incluir las O en ambos sentidos.
  <!-- feedback: Incorrecto. Multiplicar por $2$ amplia el conteo en lugar de corregir la doble contabilidad de las O. -->
- [ ] D) $6^6 = 46656$ cadenas, una permutacion con repeticion donde cada posicion tiene seis opciones.
  <!-- feedback: Incorrecto. $6^6$ corresponde a un arreglo con repeticion sobre $6$ simbolos posibles, no a usar las letras dadas. -->
### Explicacion Pedagogica
Para calcular permutaciones con repeticion se divide el factorial total entre el factorial de cada grupo de letras repetidas. En BOGOTA solo se repite la O dos veces, por lo que el numero de ordenamientos distintos es $6!/2! = 360$.

## Question 9 [D7-D8]
**ID:** CO-MAT-9-2026-W38-tecnicas-conteo-permutaciones-001-MASTERY-bundle-v9
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.65
**Contexto:** El cajero automatico de una sucursal bancaria en Cali exige al usuario crear una clave de $4$ digitos. La politica del banco prohibe que un mismo digito se repita dentro de la clave y exige que el primer digito no sea $0$.
### Enunciado
Cuantas claves distintas puede crear el cliente bajo esas dos restricciones?
### Opciones
- [ ] A) $10^4 = 10000$ claves, una por cada cadena de cuatro digitos.
  <!-- feedback: Incorrecto. $10^4$ no aplica la prohibicion de repetir digitos ni la restriction sobre el cero. -->
- [ ] B) $10 \times 10 \times 10 \times 10 = 10000$ claves, equivalente al conteo anterior sin restricciones.
  <!-- feedback: Incorrecto. Es la misma cuenta que la opcion A y omite las dos restricciones. -->
- [x] C) $9 \times 9 \times 8 \times 7 = 4536$ claves, aplicando la primera restriction al primer digito y la no repeticion a los demas.
  <!-- feedback: Correcto. El primer digito tiene $9$ opciones ($1$ a $9$), el segundo $9$ opciones (cualquier digito excepto el primero), el tercero $8$ y el cuarto $7$, dando $9 \times 9 \times 8 \times 7 = 4536$. -->
- [ ] D) $9 \times 8 \times 7 \times 6 = 3024$ claves, ignorando que el cero si puede aparecer despues del primer digito.
  <!-- feedback: Incorrecto. Esa cuenta prohibe el cero en todas las posiciones, lo que es mas estricto de lo pedido y reduce las claves. -->
### Explicacion Pedagogica
El problema combina dos restricciones: el primer digito no puede ser cero, lo que reduce las opciones a $9$, y la no repeticion reduce las opciones en cada paso siguiente. Asi, la cuenta correcta es una permutacion parcial $P(10,4)$ con la primera restriction adicional: $9 \times 9 \times 8 \times 7 = 4536$.

## Question 10 [D7-D8]
**ID:** CO-MAT-9-2026-W38-tecnicas-conteo-permutaciones-001-MASTERY-bundle-v10
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.62
**Contexto:** En una empresa textil de Medellin se quiere conformar un comite de $3$ personas a partir de $10$ empleados aptos. Dentro del comite todos tienen la misma jerarquia, asi que el orden de los elegidos no importa, solo quienes lo conforman.
### Enunciado
Cuantos comites diferentes de $3$ personas pueden formarse?
### Opciones
- [ ] A) $10 \times 9 \times 8 = 720$ comites, como si los cargos dentro del comite fueran distintos.
  <!-- feedback: Incorrecto. Esa cuenta distingue el orden de los miembros, pero aqui el orden no importa, asi que sobrecuenta. -->
- [x] B) $\dfrac{10!}{3! \cdot 7!} = \binom{10}{3} = 120$ comites, aplicando una combinacion.
  <!-- feedback: Correcto. Como el orden dentro del comite no importa, se divide la permutacion entre las $3!$ reordenaciones posibles de los elegidos, quedando $\binom{10}{3} = 120$ comites. -->
- [ ] C) $\dfrac{10!}{7!} = 720$ comites, una permutacion que no corrige el orden interno.
  <!-- feedback: Incorrecto. $10!/7!$ es $10 \times 9 \times 8$ y sobrecuenta cada comite $3!$ veces. -->
- [ ] D) $3 \times 10 = 30$ comites, multiplicando el tamano del comite por el total de empleados.
  <!-- feedback: Incorrecto. Multiplicar asi no es una regla de conteo valida para elegir grupos sin orden. -->
### Explicacion Pedagogica
La combinacion $\binom{n}{k} = \frac{n!}{k!(n-k)!}$ cuenta cuantos subconjuntos de $k$ elementos pueden formarse a partir de $n$ elementos sin importar el orden. Para $n=10$ y $k=3$, el resultado es $\binom{10}{3} = 120$ comites posibles.

## Question 11 [D9-D10]
**ID:** CO-MAT-9-2026-W38-tecnicas-conteo-permutaciones-001-MASTERY-bundle-v11
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.58
**Contexto:** Una estudiante de noveno grado en Bogota presenta la siguiente argumentacion: para calcular cuantas contrasenas de $5$ caracteres (formadas solo por letras minusculas y digitos) pueden crearse, calculo $36^5$ porque en cada una de las $5$ posiciones puedo colocar cualquiera de los $36$ simbolos y son posiciones independientes.
### Enunciado
Cual es la valoracion correcta del razonamiento de la estudiante?
### Opciones
- [x] A) El razonamiento es correcto siempre que se permitan letras y digitos repetidos y el orden importe, produciendo $36^5 = 60466176$ contrasenas.
  <!-- feedback: Correcto. El principio multiplicativo con $36$ opciones por posicion y $5$ posiciones independientes da exactamente $36^5 = 60466176$, valido si no hay restricciones adicionales. -->
- [ ] B) El razonamiento es incorrecto porque las letras y los digitos no pueden mezclarse dentro de una misma contrasena.
  <!-- feedback: Incorrecto. Las contrasenas usualmente si mezclan letras y digitos, por eso el alfabeto de $36$ simbolos es valido. -->
- [ ] C) El razonamiento es incorrecto porque faltan los simbolos especiales como espacios o signos.
  <!-- feedback: Incorrecto. El problema delimita explicitamente el alfabeto a letras y digitos, asi que no hay simbolos adicionales que agregar. -->
- [ ] D) El razonamiento es incorrecto porque deberia usarse $5^{36}$ en su lugar.
  <!-- feedback: Incorrecto. $5^{36}$ invierte base y exponente, lo cual no corresponde a ninguna regla de conteo. -->
### Explicacion Pedagogica
Evaluar un argumento de conteo implica verificar si se cumplen las hipotesis del principio aplicado. Aqui cada posicion es independiente, los simbolos pueden repetirse y el orden importa, por lo que $36^5$ es efectivamente la cantidad de contrasenas. La regla clave es reconocer que la estrategia es valida bajo las condiciones dadas.

## Question 12 [D9-D10]
**ID:** CO-MAT-9-2026-W38-tecnicas-conteo-permutaciones-001-MASTERY-bundle-v12
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.55
**Contexto:** En un torneo de baloncesto escolar en Cartagena se deben asignar los tres primeros lugares (oro, plata y bronce) entre $8$ clubes inscritos. Cada club puede recibir como maximo uno de esos lugares.
### Enunciado
Que estrategia de conteo es la mas adecuada para determinar el numero total de podios posibles?
### Opciones
- [ ] A) Aplicar combinaciones $\binom{8}{3}$ porque el podio es solo un grupo de tres clubes.
  <!-- feedback: Incorrecto. Esa combinacion ignora que los lugares del podio son posiciones ordenadas y no intercambiables. -->
- [ ] B) Aplicar combinaciones con repeticion porque los lugares son distintos pero los clubes pueden repetirse.
  <!-- feedback: Incorrecto. El problema prohibe que un club reciba dos lugares, asi que no hay repeticion. -->
- [x] C) Aplicar una permutacion $P(8,3) = 8 \times 7 \times 6$ porque los lugares del podio son posiciones ordenadas.
  <!-- feedback: Correcto. Como oro, plata y bronce son posiciones distintas y cada club aparece a lo sumo una vez, se trata de una permutacion sin repeticion $P(8,3) = 336$ podios posibles. -->
- [ ] D) Aplicar el principio aditivo con $8 + 7 + 6 = 21$ porque se suman las opciones por lugar.
  <!-- feedback: Incorrecto. El principio aditivo se usa para opciones excluyentes, no para lugares que deben asignarse de manera consistente. -->
### Explicacion Pedagogica
Evaluar la mejor estrategia de conteo exige distinguir si el orden importa y si hay repeticion. En un podio los lugares son posiciones ordenadas y los clubes no pueden repetirse, por lo que la herramienta adecuada es la permutacion sin repeticion $P(8,3) = 8 \times 7 \times 6 = 336$ podios validos.