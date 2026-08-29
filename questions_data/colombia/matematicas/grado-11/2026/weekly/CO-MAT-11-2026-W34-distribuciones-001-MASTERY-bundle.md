---
id: "CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "distribuciones"
periodo: "weekly"
week: "W34"
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

# Bundle MASTERY: Distribuciones de Probabilidad - Grado 11

Este bundle contiene 20 preguntas sobre **distribuciones discreta, binomial, normal y valor esperado** para Grado 11, alineadas con los DBA y marcos conceptuales del ICFES Saber 11.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Aleatorio
**Expected_Success:** 0.85
**Contexto:** En una variable aleatoria discreta $X$, la suma de las probabilidades de todos los valores posibles debe cumplir con la propiedad fundamental de las distribuciones.

### Enunciado
Â¿CuÃ¡l es la suma total de las probabilidades $sum P(X = x_i)$ para cualquier distribuciÃ³n de probabilidad vÃ¡lida?

### Opciones
- [x] A) 1
  <!-- feedback: Por axiÃ³matica de la probabilidad, la suma de las probabilidades sobre todo el espacio muestral es siempre igual a 1. -->
- [ ] B) 100
  <!-- feedback: Se confundiÃ³ el valor 1 de la probabilidad teÃ³rica con el porcentaje del 100%. -->
- [ ] C) 0
  <!-- feedback: La suma no puede ser 0 ya que indicarÃ­a un evento imposible en todo el espacio muestral. -->
- [ ] D) Depende de la variable
  <!-- feedback: La suma es siempre 1 independientemente de la variable aleatoria. -->

### Explicacion Pedagogica
Toda funciÃ³n de probabilidad cumple $sum_{i} P(X = x_i) = 1$, lo que garantiza que la probabilidad del espacio muestral completo sea del 100% (o 1 en escala unitaria).

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v2
**Bloom:** Remember
**ICFES:** Aleatorio
**Expected_Success:** 0.85
**Contexto:** Se presenta una tabla de distribuciÃ³n de probabilidad para la cantidad de carros vendidos en un dÃ­a en un concesionario de BogotÃ¡:
$X = 0 Rightarrow P = 0.5$, $X = 1 Rightarrow P = 0.3$, $X = 2 Rightarrow P = 0.2$.

### Enunciado
Â¿CuÃ¡l es la probabilidad de vender al menos 1 carro en un dÃ­a determinado?

### Opciones
- [x] A) 0.5
  <!-- feedback: P(X >= 1) = P(X=1) + P(X=2) = 0.3 + 0.2 = 0.5. O tambiÃ©n 1 - P(X=0) = 1 - 0.5 = 0.5. -->
- [ ] B) 0.3
  <!-- feedback: Corresponde a la probabilidad de vender EXACTAMENTE 1 carro. -->
- [ ] C) 0.2
  <!-- feedback: Corresponde a la probabilidad de vender EXACTAMENTE 2 carros. -->
- [ ] D) 0.8
  <!-- feedback: Se sumÃ³ P(X=0) + P(X=1) = 0.8. -->

### Explicacion Pedagogica
"Al menos 1" abarca $X=1$ y $X=2$. Sumando sus probabilidades: $P(X ge 1) = 0.3 + 0.2 = 0.5$.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Aleatorio
**Expected_Success:** 0.80
**Contexto:** La estatura de los estudiantes de grado 11 de un colegio en MedellÃ­n sigue una distribuciÃ³n normal con media $mu = 165$ cm y desviaciÃ³n estÃ¡ndar $sigma = 5$ cm.

### Enunciado
Â¿Alrededor de quÃ© porcentaje de estudiantes tiene una estatura comprendida entre 160 cm y 170 cm ($mu pm 1sigma$)?

### Opciones
- [x] A) 68%
  <!-- feedback: SegÃºn la regla empÃ­rica de la distribuciÃ³n normal, el intervalo (mu - sigma, mu + sigma) concentra aproximadamente el 68% de los datos. -->
- [ ] B) 95%
  <!-- feedback: Corresponde al intervalo mu +/- 2 sigma (155 cm a 175 cm). -->
- [ ] C) 99.7%
  <!-- feedback: Corresponde al intervalo mu +/- 3 sigma (150 cm a 180 cm). -->
- [ ] D) 50%
  <!-- feedback: Representa el Ã¡rea a un solo lado de la media en una distribuciÃ³n simÃ©trica. -->

### Explicacion Pedagogica
En la regla empÃ­rica (o 68-95-99.7) de una distribuciÃ³n normal, el $68.27%$ de la poblaciÃ³n se encuentra dentro de $pm 1$ desviaciÃ³n estÃ¡ndar alrededor de la media.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Aleatorio
**Expected_Success:** 0.80
**Contexto:** En un experimento binomial de 10 ensayos independientes con probabilidad de Ã©xito $p = 0.4$ en cada ensayo.

### Enunciado
Â¿CuÃ¡l es la fÃ³rmula para calcular el valor esperado (o media) $mu$ de esta distribuciÃ³n binomial?

### Opciones
- [x] A) $mu = n cdot p$
  <!-- feedback: En una distribuciÃ³n binomial B(n, p), la media o valor esperado es mu = n * p = 10 * 0.4 = 4. -->
- [ ] B) $mu = n cdot p cdot (1-p)$
  <!-- feedback: Esta fÃ³rmula corresponde a la varianza sigma^2 de la distribuciÃ³n binomial. -->
- [ ] C) $mu = sqrt{n cdot p cdot (1-p)}$
  <!-- feedback: Esta fÃ³rmula corresponde a la desviaciÃ³n estÃ¡ndar sigma de la distribuciÃ³n binomial. -->
- [ ] D) $mu = \frac{p}{n}$
  <!-- feedback: Es una razÃ³n sin significado probabilÃ­stico en el modelo binomial. -->

### Explicacion Pedagogica
Para una variable aleatoria binomial $X sim B(n,p)$, el valor esperado se calcula mediante la multiplicaciÃ³n del nÃºmero de ensayos por la probabilidad de Ã©xito en cada ensayo: $E[X] = n cdot p$.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.75
**Contexto:** En un juego de loterÃ­a en Cali, un billete cuesta 5,000 COP. La probabilidad de ganar un premio de 100,000 COP es 0.02, y la probabilidad de no ganar nada es 0.98.

### Enunciado
Â¿CuÃ¡l es el valor esperado de la ganancia neta para un comprador de un billete?

### Opciones
- [x] A) -3,000 COP
  <!-- feedback: E[Ganancia Neta] = (100000 - 5000)*0.02 + (-5000)*0.98 = 95000*0.02 - 4900 = 1900 - 4900 = -3000 COP. -->
- [ ] B) 2,000 COP
  <!-- feedback: Se calculÃ³ el valor esperado del premio (0.02 * 100000 = 2000 COP) sin restar el costo del billete. -->
- [ ] C) -5,000 COP
  <!-- feedback: Se asumiÃ³ que siempre se pierde el costo total del billete. -->
- [ ] D) 0 COP
  <!-- feedback: Se asumiÃ³ incorrectamente que el juego es totalmente justo. -->

### Explicacion Pedagogica
El valor esperado de la ganancia neta es $E[X] = (95,000)(0.02) + (-5,000)(0.98) = 1,900 - 4,900 = -3,000$ COP. El comprador pierde en promedio 3,000 COP por juego.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.75
**Contexto:** Un estudiante responde al azar una prueba corta de 5 preguntas de verdadero o falso ($p = 0.5$).

### Enunciado
Â¿CuÃ¡l es la probabilidad de que responda correctamente exactamente 4 preguntas?

### Opciones
- [x] A) $\frac{5}{32}$
  <!-- feedback: P(X=4) = C(5,4) * (0.5)^4 * (0.5)^1 = 5 * (1/16) * (1/2) = 5/32 = 0.15625. -->
- [ ] B) $\frac{1}{32}$
  <!-- feedback: Corresponde a la probabilidad de acertar las 5 preguntas P(X=5). -->
- [ ] C) $\frac{10}{32}$
  <!-- feedback: Corresponde a la probabilidad de acertar exactamente 2 o 3 preguntas (C(5,2)/32). -->
- [ ] D) $\frac{1}{5}$
  <!-- feedback: Se dividiÃ³ 1 entre el nÃºmero total de preguntas. -->

### Explicacion Pedagogica
Usando la fÃ³rmula binomial $P(X=k) = \binom{n}{k} p^k (1-p)^{n-k}$ con $n=5, k=4, p=0.5$:
$P(X=4) = 5 cdot (0.5)^4 cdot (0.5)^1 = \frac{5}{32}$.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.75
**Contexto:** Los puntajes de un simulacro PreICFES en Barranquilla siguen una distribuciÃ³n normal con media $mu = 300$ y desviaciÃ³n estÃ¡ndar $sigma = 40$.

### Enunciado
Â¿QuÃ© porcentaje aproximado de estudiantes obtuvo un puntaje entre 220 y 380 ($mu pm 2sigma$)?

### Opciones
- [x] A) 95%
  <!-- feedback: De acuerdo con la regla empÃ­rica 68-95-99.7, el rango mu +/- 2 sigma engloba aproximadamente el 95% de la distribuciÃ³n normal. -->
- [ ] B) 68%
  <!-- feedback: Corresponde al rango entre 260 y 340 (mu +/- 1 sigma). -->
- [ ] C) 99.7%
  <!-- feedback: Corresponde al rango entre 180 y 420 (mu +/- 3 sigma). -->
- [ ] D) 80%
  <!-- feedback: Valor arbitrario no correspondiente a las propiedades estÃ¡ndar de la curva gaussiana. -->

### Explicacion Pedagogica
El intervalo $[300 - 2(40), 300 + 2(40)] = [220, 380]$ representa 2 desviaciones estÃ¡ndar a cada lado de la media. Por regla empÃ­rica, abarca el $95%$ de los datos.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.70
**Contexto:** En una distribuciÃ³n binomial con $n = 100$ ensayos y probabilidad de Ã©xito $p = 0.2$.

### Enunciado
Â¿CuÃ¡l es la desviaciÃ³n estÃ¡ndar $sigma$ de esta distribuciÃ³n?

### Opciones
- [x] A) 4
  <!-- feedback: Varianza sigma^2 = n*p*(1-p) = 100 * 0.2 * 0.8 = 16. La desviaciÃ³n estÃ¡ndar sigma = sqrt(16) = 4. -->
- [ ] B) 16
  <!-- feedback: Corresponde a la varianza sigma^2, faltÃ³ extraer la raÃ­z cuadrada. -->
- [ ] C) 20
  <!-- feedback: Corresponde a la media mu = n*p = 100 * 0.2 = 20. -->
- [ ] D) 2
  <!-- feedback: Se dividiÃ³ 4 entre 2 sin justificaciÃ³n probabilÃ­stica. -->

### Explicacion Pedagogica
La varianza binomial es $sigma^2 = n p (1-p) = 100(0.2)(0.8) = 16$. Por ende, la desviaciÃ³n estÃ¡ndar es $sigma = sqrt{16} = 4$.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.70
**Contexto:** Una variable aleatoria discreta $X$ representa el nÃºmero de fallas en un equipo en Bucaramanga y tiene la siguiente tabla:
$X = 0 Rightarrow 0.6$, $X = 1 Rightarrow 0.3$, $X = 2 Rightarrow 0.1$.

### Enunciado
Â¿CuÃ¡l es el valor esperado $E[X]$ del nÃºmero de fallas del equipo?

### Opciones
- [x] A) 0.5
  <!-- feedback: E[X] = (0 * 0.6) + (1 * 0.3) + (2 * 0.1) = 0 + 0.3 + 0.2 = 0.5. -->
- [ ] B) 1.0
  <!-- feedback: Se sumÃ³ 0.6 + 0.3 + 0.1 en lugar de ponderar por los valores de X. -->
- [ ] C) 0.3
  <!-- feedback: Se eligiÃ³ solo el tÃ©rmino correspondiente a X = 1. -->
- [ ] D) 0.6
  <!-- feedback: Se seleccionÃ³ la probabilidad mÃ¡s alta (el valor modal de X). -->

### Explicacion Pedagogica
El valor esperado es la suma ponderada de cada valor por su probabilidad: $E[X] = 0(0.6) + 1(0.3) + 2(0.1) = 0.5$.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.70
**Contexto:** En un proceso de control de calidad en Cartagena, el 10% de los productos presenta imperfecciones. Se toma una muestra de 3 productos al azar.

### Enunciado
Â¿CuÃ¡l es la probabilidad de que NINGUNO de los 3 productos presente imperfecciones?

### Opciones
- [x] A) 0.729
  <!-- feedback: La probabilidad de no tener imperfecciÃ³n es q = 0.9. P(X=0) = (0.9)^3 = 0.729. -->
- [ ] B) 0.900
  <!-- feedback: Se tomÃ³ solo la probabilidad de un producto individual no imperfecto. -->
- [ ] C) 0.271
  <!-- feedback: Corresponde al complemento 1 - 0.729 (probabilidad de que al menos uno estÃ© imperfecto). -->
- [ ] D) 0.001
  <!-- feedback: Corresponde a la probabilidad de que TODOS los 3 productos estÃ©n imperfectos (0.10)^3. -->

### Explicacion Pedagogica
Al ser elecciones independientes, la probabilidad de que los 3 salgan sin imperfecciones es $P(X=0) = (1 - 0.10)^3 = (0.90)^3 = 0.729$.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.65
**Contexto:** Las estaturas de una poblaciÃ³n en Pereira se distribuyen normalmente con $mu = 170$ cm y $sigma = 10$ cm. Un estudiante tiene una estatura de 185 cm.

### Enunciado
Â¿CuÃ¡l es la puntuaciÃ³n Z (puntaje estandarizado) correspondiente a la estatura de este estudiante?

### Opciones
- [x] A) 1.5
  <!-- feedback: Z = (X - mu) / sigma = (185 - 170) / 10 = 15 / 10 = 1.5. -->
- [ ] B) 1.0
  <!-- feedback: Se calculÃ³ (185 - 170) / 15. -->
- [ ] C) 15.0
  <!-- feedback: Se restÃ³ 185 - 170 pero se olvidÃ³ dividir entre la desviaciÃ³n estÃ¡ndar sigma. -->
- [ ] D) -1.5
  <!-- feedback: Se restÃ³ en orden inverso (170 - 185) obteniendo un signo negativo errÃ³neo. -->

### Explicacion Pedagogica
El puntaje estandarizado $Z$ mide cuÃ¡ntas desviaciones estÃ¡ndar estÃ¡ un dato por encima o por debajo de la media: $Z = \frac{X - mu}{sigma} = \frac{185 - 170}{10} = 1.5$.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.65
**Contexto:** Una variable aleatoria $X$ tiene un valor esperado $E[X] = 5$ y $E[X^2] = 29$.

### Enunciado
Â¿CuÃ¡l es la varianza $Var(X)$ de esta variable aleatoria?

### Opciones
- [x] A) 4
  <!-- feedback: Usando la fÃ³rmula de la varianza Var(X) = E[X^2] - (E[X])^2 = 29 - 5^2 = 29 - 25 = 4. -->
- [ ] B) 24
  <!-- feedback: Se restÃ³ 29 - 5 sin elevar E[X] al cuadrado. -->
- [ ] C) 2
  <!-- feedback: Se extrajo la raÃ­z cuadrada de la varianza (obteniendo la desviaciÃ³n estÃ¡ndar). -->
- [ ] D) 54
  <!-- feedback: Se sumaron E[X^2] + (E[X])^2 = 29 + 25 = 54. -->

### Explicacion Pedagogica
La varianza se define computacionalmente como $Var(X) = E[X^2] - (E[X])^2$. Sustituyendo los valores: $Var(X) = 29 - 5^2 = 29 - 25 = 4$.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.60
**Contexto:** En una distribuciÃ³n normal estÃ¡ndar $Z sim N(0,1)$, se sabe que $P(Z < 1) approx 0.8413$.

### Enunciado
Â¿CuÃ¡l es la probabilidad de que $Z$ se encuentre entre -1 y 1 ($P(-1 < Z < 1)$)?

### Opciones
- [x] A) 0.6826
  <!-- feedback: P(-1 < Z < 1) = P(Z < 1) - P(Z < -1) = 0.8413 - (1 - 0.8413) = 0.8413 - 0.1587 = 0.6826. -->
- [ ] B) 0.3413
  <!-- feedback: Corresponde solo al Ã¡rea entre 0 y 1 (mitad del intervalo deseado). -->
- [ ] C) 0.1587
  <!-- feedback: Corresponde a la probabilidad en la cola superior P(Z > 1). -->
- [ ] D) 0.9544
  <!-- feedback: Corresponde al Ã¡rea dentro de 2 desviaciones estÃ¡ndar en lugar de 1. -->

### Explicacion Pedagogica
Por simetrÃ­a, $P(Z < -1) = 1 - P(Z < 1) = 1 - 0.8413 = 0.1587$. Por lo tanto, $P(-1 < Z < 1) = 0.8413 - 0.1587 = 0.6826$.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.60
**Contexto:** Una prueba de 4 preguntas de opciÃ³n mÃºltiple tiene 4 opciones por pregunta ($p = 0.25$).

### Enunciado
Â¿CuÃ¡l es la probabilidad de obtener AL MENOS 1 respuesta correcta si se contesta al azar?

### Opciones
- [x] A) $\frac{175}{256}$
  <!-- feedback: P(X >= 1) = 1 - P(X=0). P(X=0) = (3/4)^4 = 81/256. 1 - 81/256 = 175/256. -->
- [ ] B) $\frac{81}{256}$
  <!-- feedback: Corresponde a la probabilidad de obtener 0 respuestas correctas P(X=0). -->
- [ ] C) $\frac{1}{256}$
  <!-- feedback: Corresponde a la probabilidad de acertar las 4 preguntas P(X=4). -->
- [ ] D) $\frac{3}{4}$
  <!-- feedback: Se restÃ³ 1 - 0.25 sin elevar a la potencia correspondiente al nÃºmero de preguntas. -->

### Explicacion Pedagogica
Mediante el evento complementario: $P(X ge 1) = 1 - P(X = 0) = 1 - left(\frac{3}{4}ight)^4 = 1 - \frac{81}{256} = \frac{175}{256}$.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.60
**Contexto:** La duraciÃ³n en horas de un componente electrÃ³nico fabricado en Manizales tiene distribuciÃ³n normal con $mu = 1000$ h y $sigma = 100$ h.

### Enunciado
Â¿CuÃ¡l es el porcentaje de componentes que se espera que duren MÃS de 1200 horas?

### Opciones
- [x] A) 2.5%
  <!-- feedback: Z = (1200 - 1000)/100 = 2. Por la regla 68-95-99.7, mu +/- 2 sigma cubre el 95%. Las colas exteriores suman 5%, por lo que la cola superior Z > 2 es el 2.5%. -->
- [ ] B) 5.0%
  <!-- feedback: Se sumaron las dos colas externas (Z > 2 y Z < -2) sin dividir entre 2. -->
- [ ] C) 16.0%
  <!-- feedback: Corresponde a la cola superior Z > 1 (mÃ¡s de 1100 horas). -->
- [ ] D) 97.5%
  <!-- feedback: Corresponde a la probabilidad acumulada P(X < 1200) en lugar de la cola superior. -->

### Explicacion Pedagogica
$Z = \frac{1200 - 1000}{100} = 2$. Dado que $P(-2 < Z < 2) approx 95%$, el Ã¡rea en las colas fuera del intervalo es $100% - 95% = 5%$. Por simetrÃ­a, la cola superior $P(Z > 2) = \frac{5%}{2} = 2.5%$.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.60
**Contexto:** En una distribuciÃ³n de probabilidad discreta dada por $P(X = x) = k cdot x$ para $x in {1, 2, 3, 4}$.

### Enunciado
Â¿CuÃ¡l debe ser el valor constante de $k$ para que sea una funciÃ³n de probabilidad vÃ¡lida?

### Opciones
- [x] A) $\frac{1}{10}$
  <!-- feedback: La suma de probabilidades k*(1 + 2 + 3 + 4) = 10k = 1 -> k = 1/10 = 0.1. -->
- [ ] B) $\frac{1}{4}$
  <!-- feedback: Se dividiÃ³ 1 entre la cantidad de valores posibles (4) sin considerar la suma ponderada por x. -->
- [ ] C) $\frac{1}{24}$
  <!-- feedback: Se multiplicaron los valores 1 * 2 * 3 * 4 = 24 en lugar de sumarlos. -->
- [ ] D) 1
  <!-- feedback: Se asumiÃ³ k=1 ignorando que la suma de probabilidades superarÃ­a ampliamente 1. -->

### Explicacion Pedagogica
CondiciÃ³n de normalizaciÃ³n: $sum P(X=x) = k(1) + k(2) + k(3) + k(4) = 10k = 1 Rightarrow k = \frac{1}{10}$.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.50
**Contexto:** Un inversionista en BogotÃ¡ analiza un proyecto. Si la economÃ­a crece, ganarÃ¡ 50 millones COP con probabilidad 0.4. Si permanece estable, ganarÃ¡ 10 millones con probabilidad 0.4. Si entra en recesiÃ³n, perderÃ¡ 30 millones con probabilidad 0.2.

### Enunciado
Â¿CuÃ¡l es el valor esperado y la decisiÃ³n financiera mÃ¡s adecuada si el costo del proyecto es de 20 millones COP?

### Opciones
- [x] A) El valor esperado es 18 millones COP, por lo que el proyecto NO recupera el costo inicial de 20 millones COP.
  <!-- feedback: E[X] = (50*0.4) + (10*0.4) + (-30*0.2) = 20 + 4 - 6 = 18 millones. Como 18 < 20, la inversiÃ³n esperada genera pÃ©rdida neta. -->
- [ ] B) El valor esperado es 24 millones COP, por lo que el proyecto es rentable.
  <!-- feedback: Se olvidÃ³ incluir el signo negativo en la pÃ©rdida de 30 millones durante la recesiÃ³n. -->
- [ ] C) El valor esperado es 30 millones COP, superando ampliamente la inversiÃ³n.
  <!-- feedback: Se realizÃ³ un cÃ¡lculo errÃ³neo sumando directamente las ganancias sin ponderar por probabilidades. -->
- [ ] D) El valor esperado es 0 millones COP, quedando en punto de equilibrio.
  <!-- feedback: Se restaron de forma incorrecta los valores monetarios. -->

### Explicacion Pedagogica
$E[X] = 50(0.4) + 10(0.4) + (-30)(0.2) = 20 + 4 - 6 = 18$ millones COP. Como el ingreso esperado de 18 millones es menor que el costo de inversiÃ³n de 20 millones, el rendimiento neto esperado es negativo ($-2$ millones).

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.50
**Contexto:** El tiempo de atenciÃ³n en una taquilla de banco en Armenia se aproxima a una distribuciÃ³n normal con $mu = 6$ minutos y $sigma = 1.5$ minutos.

### Enunciado
Si un usuario es atendido en la taquilla, Â¿cuÃ¡l es la probabilidad de que su atenciÃ³n demore ENTRE 4.5 y 7.5 minutos?

### Opciones
- [x] A) 0.68
  <!-- feedback: Z1 = (4.5 - 6)/1.5 = -1. Z2 = (7.5 - 6)/1.5 = 1. El rango entre -1 y 1 desviaciones estÃ¡ndar abarca aproximadamente el 68% de los casos. -->
- [ ] B) 0.95
  <!-- feedback: Corresponde al intervalo de +/- 2 desviaciones estÃ¡ndar (3 a 9 minutos). -->
- [ ] C) 0.34
  <!-- feedback: Corresponde a medio intervalo (de 6 a 7.5 minutos Ãºnicamente). -->
- [ ] D) 0.50
  <!-- feedback: Se asumiÃ³ arbitrariamente la mitad de la poblaciÃ³n. -->

### Explicacion Pedagogica
Estandarizando la variable: $Z_1 = \frac{4.5 - 6}{1.5} = -1.0$ y $Z_2 = \frac{7.5 - 6}{1.5} = 1.0$. Por la regla empÃ­rica de la normal, el Ã¡rea comprendida entre $Z = -1$ y $Z = 1$ es aproximadamente $0.683$ (68%).

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.45
**Contexto:** Una variable aleatoria binomial $X$ tiene una media $mu = 12$ y una varianza $sigma^2 = 3$.

### Enunciado
Â¿CuÃ¡les son los valores del nÃºmero de ensayos $n$ y la probabilidad de Ã©xito $p$?

### Opciones
- [x] A) $n = 16, p = 0.75$
  <!-- feedback: mu = n*p = 12 y sigma^2 = n*p*(1-p) = 3 -> 12*(1-p) = 3 -> 1 - p = 3/12 = 0.25 -> p = 0.75. Luego n = 12 / 0.75 = 16. -->
- [ ] B) $n = 24, p = 0.50$
  <!-- feedback: Si n=24 y p=0.5, la varianza serÃ­a 24*0.5*0.5 = 6, no 3. -->
- [ ] C) $n = 12, p = 1.00$
  <!-- feedback: Si p=1 la varianza serÃ­a 0, contradiciendo sigma^2 = 3. -->
- [ ] D) $n = 20, p = 0.60$
  <!-- feedback: Si n=20 y p=0.6, la media serÃ­a 12 pero la varianza serÃ­a 20*0.6*0.4 = 4.8. -->

### Explicacion Pedagogica
Sustituyendo $mu = n p = 12$ en $sigma^2 = n p (1-p) = 3$:
$12(1-p) = 3 Rightarrow 1-p = \frac{3}{12} = 0.25 Rightarrow p = 0.75$.
Por ende, $n = \frac{12}{0.75} = 16$.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W34-distribuciones-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.45
**Contexto:** Se analiza el nÃºmero de caras obtenidas al lanzar 4 monedas equilibradas. La variable aleatoria $X$ representa el nÃºmero de caras.

### Enunciado
Â¿CuÃ¡l es la varianza $sigma^2$ de la distribuciÃ³n de esta variable aleatoria $X$?

### Opciones
- [x] A) 1.0
  <!-- feedback: Para una binomial con n=4 y p=0.5: sigma^2 = n*p*(1-p) = 4 * 0.5 * 0.5 = 1.0. -->
- [ ] B) 2.0
  <!-- feedback: Corresponde a la media mu = n*p = 4 * 0.5 = 2.0. -->
- [ ] C) 0.5
  <!-- feedback: Se dividiÃ³ 1 entre 2 errÃ³neamente. -->
- [ ] D) 4.0
  <!-- feedback: Corresponde al nÃºmero total de ensayos n. -->

### Explicacion Pedagogica
Para la variable binomial $X sim B(4, 0.5)$, la varianza viene dada por $sigma^2 = n p q = 4(0.5)(0.5) = 1.0$.
