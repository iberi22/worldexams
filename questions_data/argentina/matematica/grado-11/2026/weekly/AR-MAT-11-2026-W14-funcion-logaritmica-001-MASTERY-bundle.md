---
id: "AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle"
country: "argentina"
grado: 11
asignatura: "matematica"
tema: "funcion-logaritmica"
periodo: "weekly"
week: "W14"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "NAP Argentina 2026 / Aprender"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# Bundle MASTERY: Función Logarítmica - Grado 11

Bundle sobre la función logarítmica: definición, dominio, gráfico, propiedades, relación inversa con la exponencial y escalas logarítmicas (pH, decibeles y Richter) en contextos argentinos.

## Question 1 [D3-D4]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v1
**Bloom:** Remember
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.85
**Contexto:** Un programador de una empresa de software de Córdoba necesita saber cuántos bits hacen falta para codificar $32$ estados distintos, es decir, el exponente $n$ con $2^n = 32$.

### Enunciado
¿Cuál es el valor de $\log_2 32$?

### Opciones
- [x] A) $5$
  <!-- feedback: Correcto. Como $2^5 = 32$, el logaritmo en base $2$ de $32$ es el exponente $5$. -->
- [ ] B) $16$
  <!-- feedback: Incorrecto. Se dividió $32 : 2$; el logaritmo es el exponente al que hay que elevar la base, no un cociente. -->
- [ ] C) $30$
  <!-- feedback: Incorrecto. Se restó $32 - 2$; el logaritmo responde a qué potencia de $2$ da $32$. -->
- [ ] D) $\frac{1}{5}$
  <!-- feedback: Incorrecto. Se invirtió el resultado: $2^{1/5} = \sqrt[5]{2} \approx 1{,}15$, no $32$. -->

### Explicacion Pedagogica
Por definición, $\log_b a = c$ significa $b^c = a$. Buscamos $c$ con $2^c = 32$: como $2^1 = 2$, $2^2 = 4$, $2^3 = 8$, $2^4 = 16$, $2^5 = 32$, resulta $\log_2 32 = 5$. Se necesitan $5$ bits para $32$ estados.

## Question 2 [D3-D4]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v2
**Bloom:** Understand
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.83
**Contexto:** Un ingeniero de Bahía Blanca modela la presión en una tubería con $f(x) = \log(x - 3)$, donde $x$ es una medida en metros.

### Enunciado
¿Cuál es el dominio de $f(x) = \log(x - 3)$?

### Opciones
- [ ] A) $[3, +\infty)$
  <!-- feedback: Incorrecto. En $x = 3$ el argumento vale $0$ y $\log 0$ no está definido; el extremo debe quedar abierto. -->
- [ ] B) $(0, +\infty)$
  <!-- feedback: Incorrecto. Ese es el dominio de $\log x$; el $-3$ desplaza el dominio $3$ unidades hacia la derecha. -->
- [x] C) $(3, +\infty)$
  <!-- feedback: Correcto. El argumento de un logaritmo debe ser positivo: $x - 3 > 0$, o sea, $x > 3$. -->
- [ ] D) $(-3, +\infty)$
  <!-- feedback: Incorrecto. Error de signo al despejar: $x - 3 > 0$ da $x > 3$, no $x > -3$. -->

### Explicacion Pedagogica
El logaritmo solo está definido para argumentos positivos. Planteamos $x - 3 > 0$ y despejamos $x > 3$. Por eso $\text{Dom} f = (3, +\infty)$, con asíntota vertical $x = 3$.

## Question 3 [D3-D4]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v3
**Bloom:** Remember
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.81
**Contexto:** En una clase de un colegio de Mendoza se estudia la función $f(x) = 3^x$, que modela la cantidad de contactos en una cadena de mensajes, y se busca su inversa.

### Enunciado
¿Cuál es la función inversa de $f(x) = 3^x$?

### Opciones
- [x] A) $f^{-1}(x) = \log_3 x$
  <!-- feedback: Correcto. El logaritmo en base $3$ deshace la potencia de base $3$: $\log_3(3^x) = x$ y $3^{\log_3 x} = x$. -->
- [ ] B) $f^{-1}(x) = x^{1/3}$
  <!-- feedback: Incorrecto. La raíz cúbica es la inversa de $x^3$, donde la variable está en la base; aquí la variable está en el exponente. -->
- [ ] C) $f^{-1}(x) = \frac{1}{3^x}$
  <!-- feedback: Incorrecto. Ese es el recíproco $3^{-x}$, no la inversa; por ejemplo, no devuelve $x$ al componer con $3^x$. -->
- [ ] D) $f^{-1}(x) = \frac{x}{3}$
  <!-- feedback: Incorrecto. Dividir por $3$ deshace multiplicar por $3$; la inversa de elevar a la $x$ es tomar logaritmo. -->

### Explicacion Pedagogica
Para invertir $y = 3^x$ despejamos $x$: $x = \log_3 y$. Intercambiando los nombres de las variables, $f^{-1}(x) = \log_3 x$. Sus gráficos son simétricos respecto de la recta $y = x$; por ejemplo, $(2, 9)$ está en $f$ y $(9, 2)$ en $f^{-1}$.

## Question 4 [D3-D4]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v4
**Bloom:** Understand
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.79
**Contexto:** Un estudiante de Rosario prepara un resumen de propiedades de logaritmos para usarlo en problemas de acústica.

### Enunciado
¿Cuál de las siguientes propiedades es correcta para $a > 0$ y $b > 0$?

### Opciones
- [ ] A) $\log(a + b) = \log a + \log b$
  <!-- feedback: Incorrecto. No existe una regla para el logaritmo de una suma; con $a = b = 1$: $\log 2 \ne 0$. -->
- [ ] B) $\log\left(\frac{a}{b}\right) = \frac{\log a}{\log b}$
  <!-- feedback: Incorrecto. El logaritmo de un cociente es una resta, $\log a - \log b$, no un cociente de logaritmos. -->
- [x] C) $\log(ab) = \log a + \log b$
  <!-- feedback: Correcto. El logaritmo de un producto es la suma de los logaritmos, porque al multiplicar potencias de igual base se suman exponentes. -->
- [ ] D) $\log(a^n) = (\log a)^n$
  <!-- feedback: Incorrecto. El exponente baja multiplicando: $\log(a^n) = n\log a$; por ejemplo, $\log 100 = 2$ y $(\log 10)^2 = 1$. -->

### Explicacion Pedagogica
Si $a = 10^p$ y $b = 10^q$, entonces $ab = 10^{p+q}$ y $\log(ab) = p + q = \log a + \log b$. De la misma idea salen $\log\frac{a}{b} = \log a - \log b$ y $\log a^n = n\log a$. No hay regla para $\log(a+b)$.

## Question 5 [D5-D6]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v5
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.76
**Contexto:** En el laboratorio de química de una escuela técnica de Tucumán se mide en un jugo de limón una concentración $[\text{H}^+] = 2\cdot 10^{-3}$ mol/L, y se sabe que $\text{pH} = -\log[\text{H}^+]$.

### Enunciado
¿Cuál es aproximadamente el pH del jugo? (Usá $\log 2 \approx 0{,}30$.)

### Opciones
- [ ] A) $3{,}30$
  <!-- feedback: Incorrecto. Se sumó $\log 2$ en lugar de restarlo: $-\log(2\cdot 10^{-3}) = 3 - 0{,}30$. -->
- [x] B) $2{,}70$
  <!-- feedback: Correcto. Con $\text{pH} = -(\log 2 + \log 10^{-3}) = -(0{,}30 - 3) = 2{,}70$. -->
- [ ] C) $-2{,}70$
  <!-- feedback: Incorrecto. Se olvidó el signo menos de la definición de pH; $\log(2\cdot 10^{-3})$ es negativo y el pH queda positivo. -->
- [ ] D) $0{,}30$
  <!-- feedback: Incorrecto. Se tomó solo $\log 2$ y se ignoró el factor $10^{-3}$, que aporta $-3$ al logaritmo. -->

### Explicacion Pedagogica
Usamos la propiedad del producto: $\log(2\cdot 10^{-3}) = \log 2 + \log 10^{-3} \approx 0{,}30 - 3 = -2{,}70$. Entonces $\text{pH} = -(-2{,}70) = 2{,}70$, un valor ácido, como corresponde al limón.

## Question 6 [D5-D6]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v6
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.74
**Contexto:** Durante un recital en el estadio de River Plate, en Buenos Aires, se mide cerca de los parlantes una intensidad sonora $I = 10^{-1}$ W/m². El nivel sonoro es $L = 10\log\frac{I}{I_0}$, con $I_0 = 10^{-12}$ W/m².

### Enunciado
¿Cuál es el nivel sonoro en decibeles?

### Opciones
- [ ] A) $11$ dB
  <!-- feedback: Incorrecto. Se calculó $\log 10^{11} = 11$ pero se olvidó multiplicar por $10$ en la fórmula de decibeles. -->
- [ ] B) $130$ dB
  <!-- feedback: Incorrecto. Se sumaron los exponentes $1 + 12$; al dividir potencias de igual base se restan: $-1 - (-12) = 11$. -->
- [ ] C) $-110$ dB
  <!-- feedback: Incorrecto. Se invirtió el cociente, $\frac{I_0}{I}$; la fórmula usa $\frac{I}{I_0}$, que aquí es mayor que $1$. -->
- [x] D) $110$ dB
  <!-- feedback: Correcto. Con $\frac{I}{I_0} = \frac{10^{-1}}{10^{-12}} = 10^{11}$, se obtiene $L = 10\cdot 11 = 110$ dB. -->

### Explicacion Pedagogica
Calculamos el cociente: $\frac{10^{-1}}{10^{-12}} = 10^{-1+12} = 10^{11}$. Luego $L = 10\log 10^{11} = 10\cdot 11 = 110$ dB, un nivel que puede dañar el oído con exposición prolongada.

## Question 7 [D5-D6]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v7
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.72
**Contexto:** En San Juan, una estación sismológica registra dos sismos de magnitud $4$ y $6$ en la escala de Richter, donde $M = \log\frac{A}{A_0}$ y $A$ es la amplitud de la onda.

### Enunciado
¿Cuántas veces mayor es la amplitud del sismo de magnitud $6$ que la del de magnitud $4$?

### Opciones
- [ ] A) $2$ veces
  <!-- feedback: Incorrecto. Se tomó la diferencia de magnitudes como cociente de amplitudes; cada punto de magnitud multiplica la amplitud por $10$. -->
- [ ] B) $1{,}5$ veces
  <!-- feedback: Incorrecto. Se dividieron las magnitudes, $\frac{6}{4}$; la escala es logarítmica y hay que restar magnitudes y elevar $10$ a esa diferencia. -->
- [x] C) $100$ veces
  <!-- feedback: Correcto. La diferencia de magnitudes es $6 - 4 = 2$, y en escala logarítmica de base $10$ eso significa un cociente $10^2 = 100$. -->
- [ ] D) $20$ veces
  <!-- feedback: Incorrecto. Se calculó $10\cdot 2$; la diferencia $2$ es un exponente: $10^2 = 100$. -->

### Explicacion Pedagogica
Restando las magnitudes: $M_1 - M_2 = \log\frac{A_1}{A_0} - \log\frac{A_2}{A_0} = \log\frac{A_1}{A_2}$. Con $6 - 4 = 2$: $\log\frac{A_1}{A_2} = 2$, de modo que $\frac{A_1}{A_2} = 10^2 = 100$.

## Question 8 [D5-D6]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v8
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.70
**Contexto:** En una guía de ejercicios de una escuela de La Rioja se pide simplificar una expresión que aparece al calcular la memoria de un dispositivo.

### Enunciado
¿Cuánto vale $\log_2 48 - \log_2 3$?

### Opciones
- [ ] A) $\log_2 45$
  <!-- feedback: Incorrecto. Se restaron los argumentos; la resta de logaritmos corresponde al cociente de los argumentos, no a su diferencia. -->
- [x] B) $4$
  <!-- feedback: Correcto. Por la propiedad del cociente, $\log_2 48 - \log_2 3 = \log_2\frac{48}{3} = \log_2 16 = 4$. -->
- [ ] C) $16$
  <!-- feedback: Incorrecto. Se llegó a $\frac{48}{3} = 16$ pero faltó tomar $\log_2 16 = 4$. -->
- [ ] D) $\frac{\log_2 48}{\log_2 3}$
  <!-- feedback: Incorrecto. Se confundió la resta de logaritmos con un cociente de logaritmos, que es otra cantidad ($\approx 3{,}52$). -->

### Explicacion Pedagogica
Aplicamos $\log_b M - \log_b N = \log_b\frac{M}{N}$: $\log_2\frac{48}{3} = \log_2 16$. Como $2^4 = 16$, el resultado es $4$. Así se evita aproximar cada logaritmo por separado.

## Question 9 [D5-D6]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v9
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.68
**Contexto:** En un trabajo con GeoGebra en un colegio de Paraná se analiza el gráfico de $f(x) = \log_2(x + 4)$.

### Enunciado
¿Cuál es la asíntota vertical de $f$ y en qué punto corta al eje $x$?

### Opciones
- [x] A) Asíntota $x = -4$; corta al eje $x$ en $x = -3$
  <!-- feedback: Correcto. El argumento se anula en $x = -4$ (asíntota), y $\log_2(x + 4) = 0$ exige $x + 4 = 1$, o sea, $x = -3$. -->
- [ ] B) Asíntota $x = -4$; corta al eje $x$ en $x = 1$
  <!-- feedback: Incorrecto. Se usó $\log_2 1 = 0$ sin el desplazamiento: hay que pedir $x + 4 = 1$, no $x = 1$. -->
- [ ] C) Asíntota $x = 4$; corta al eje $x$ en $x = 5$
  <!-- feedback: Incorrecto. Error de signo: $x + 4 = 0$ da $x = -4$, y el gráfico se traslada hacia la izquierda. -->
- [ ] D) Asíntota $y = -4$; corta al eje $x$ en $x = -3$
  <!-- feedback: Incorrecto. La asíntota de un logaritmo es vertical; una recta $y = -4$ sería horizontal, y $f$ no la tiene. -->

### Explicacion Pedagogica
$f$ es $\log_2 x$ trasladada $4$ unidades a la izquierda. La asíntota vertical pasa de $x = 0$ a $x = -4$, y la raíz pasa de $x = 1$ a $x = 1 - 4 = -3$. Verificación: $f(-3) = \log_2 1 = 0$.

## Question 10 [D5-D6]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v10
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.66
**Contexto:** Una alumna de Santa Fe tiene una calculadora que solo trae las teclas $\ln$ y $\log$, y necesita $\log_5 30$ para un problema de crecimiento poblacional.

### Enunciado
¿Cuál es aproximadamente $\log_5 30$?

### Opciones
- [ ] A) $6$
  <!-- feedback: Incorrecto. Se dividió $30 : 5$; el logaritmo busca el exponente con $5^c = 30$, y $5^6$ es mucho mayor. -->
- [ ] B) $0{,}473$
  <!-- feedback: Incorrecto. Se invirtió el cambio de base, $\frac{\ln 5}{\ln 30}$; el logaritmo del argumento va en el numerador. -->
- [x] C) $2{,}113$
  <!-- feedback: Correcto. Por cambio de base, $\log_5 30 = \frac{\ln 30}{\ln 5} \approx \frac{3{,}401}{1{,}609} \approx 2{,}113$; además $5^2 = 25$ y $5^3 = 125$ lo ubican entre $2$ y $3$. -->
- [ ] D) $1{,}477$
  <!-- feedback: Incorrecto. Ese es $\log 30$ en base $10$; faltó dividir por $\log 5$ para pasar a base $5$. -->

### Explicacion Pedagogica
La fórmula de cambio de base es $\log_b a = \frac{\ln a}{\ln b} = \frac{\log a}{\log b}$. Con $a = 30$ y $b = 5$: $\frac{\ln 30}{\ln 5} \approx 2{,}113$. Control: $5^{2{,}113} \approx 30$.

## Question 11 [D7-D8]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v11
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.63
**Contexto:** En un examen de un instituto de Comodoro Rivadavia aparece la función $f(x) = \log_{1/2} x$ y se piden sus características.

### Enunciado
¿Cuál de estas afirmaciones sobre $f(x) = \log_{1/2} x$ es verdadera?

### Opciones
- [ ] A) Es creciente, porque todos los logaritmos crecen
  <!-- feedback: Incorrecto. Solo crecen los de base mayor que $1$; con base $\frac{1}{2}$, $f(2) = -1 < f(1) = 0$. -->
- [x] B) Es decreciente y $f(4) = -2$
  <!-- feedback: Correcto. Con base entre $0$ y $1$ el logaritmo decrece, y $\left(\frac{1}{2}\right)^{-2} = 4$, así que $f(4) = -2$. -->
- [ ] C) Es decreciente y $f(4) = 2$
  <!-- feedback: Incorrecto. Se calculó $\log_2 4$; en base $\frac{1}{2}$ hay que resolver $\left(\frac{1}{2}\right)^c = 4$, cuyo exponente es $-2$. -->
- [ ] D) Su dominio es el conjunto de todos los reales
  <!-- feedback: Incorrecto. El dominio de todo logaritmo es $(0, +\infty)$; el conjunto de todos los reales es su imagen. -->

### Explicacion Pedagogica
Para $0 < b < 1$, la función $\log_b x$ es decreciente, con dominio $(0, +\infty)$, imagen todos los reales y asíntota $x = 0$. Además $\log_{1/2} x = -\log_2 x$; por eso $f(4) = -\log_2 4 = -2$.

## Question 12 [D7-D8]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v12
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.61
**Contexto:** En un taller de carpintería de Rafaela una máquina produce $80$ dB. Se instala una segunda máquina idéntica funcionando al mismo tiempo, y las intensidades sonoras se suman.

### Enunciado
¿Cuál es el nivel sonoro aproximado con las dos máquinas encendidas?

### Opciones
- [ ] A) $160$ dB
  <!-- feedback: Incorrecto. Se sumaron los decibeles; lo que se suma son intensidades, y en la escala logarítmica eso agrega solo $10\log 2$. -->
- [ ] B) $80$ dB
  <!-- feedback: Incorrecto. Se supuso que el nivel no cambia, pero la intensidad total es el doble y $\log$ es creciente. -->
- [ ] C) $90$ dB
  <!-- feedback: Incorrecto. Sumar $10$ dB corresponde a multiplicar la intensidad por $10$, no por $2$. -->
- [x] D) $83$ dB
  <!-- feedback: Correcto. Duplicar la intensidad suma $10\log 2 \approx 3{,}01$ dB: $80 + 3 = 83$ dB. -->

### Explicacion Pedagogica
Si una máquina tiene intensidad $I$, con $80 = 10\log\frac{I}{I_0}$, dos máquinas dan $2I$: $L = 10\log\frac{2I}{I_0} = 10\log 2 + 10\log\frac{I}{I_0} \approx 3{,}01 + 80 = 83{,}01$ dB.

## Question 13 [D7-D8]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v13
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.59
**Contexto:** En un trabajo sobre crecimiento de levaduras en una panadería de Rosario se sabe que el punto $(3;\ 20{,}09)$ pertenece, en forma aproximada, al gráfico de $y = e^x$.

### Enunciado
¿Qué punto pertenece al gráfico de $y = \ln x$?

### Opciones
- [x] A) $(20{,}09;\ 3)$
  <!-- feedback: Correcto. Como $\ln x$ es la inversa de $e^x$, sus gráficos son simétricos respecto de $y = x$: se intercambian las coordenadas, y $\ln 20{,}09 \approx 3$. -->
- [ ] B) $(-3;\ 20{,}09)$
  <!-- feedback: Incorrecto. Eso refleja respecto del eje $y$; la inversa se obtiene reflejando respecto de la recta $y = x$. -->
- [ ] C) $(3;\ -20{,}09)$
  <!-- feedback: Incorrecto. Eso refleja respecto del eje $x$; además $\ln 3 \approx 1{,}10$, no $-20{,}09$. -->
- [ ] D) $(20{,}09;\ -3)$
  <!-- feedback: Incorrecto. Se intercambiaron las coordenadas pero se cambió el signo; $\ln 20{,}09$ es positivo porque $20{,}09 > 1$. -->

### Explicacion Pedagogica
Si $(a, b)$ está en el gráfico de $f$, entonces $(b, a)$ está en el de $f^{-1}$. Como $e^3 \approx 20{,}09$, se tiene $\ln 20{,}09 \approx 3$: el punto $(20{,}09;\ 3)$ pertenece a $y = \ln x$.

## Question 14 [D7-D8]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v14
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.57
**Contexto:** En una clase de un colegio de Viedma un alumno afirma que $f(x) = \log(x^2)$ y $g(x) = 2\log x$ son la misma función, porque $\log(a^n) = n\log a$.

### Enunciado
¿Cuál es el análisis correcto?

### Opciones
- [ ] A) Son la misma función en todos los reales
  <!-- feedback: Incorrecto. Ninguna de las dos está definida en $x = 0$, y $g$ tampoco lo está para $x < 0$. -->
- [x] B) Coinciden solo para $x > 0$: $f$ está definida para todo $x \ne 0$, y $g$ solo para $x > 0$
  <!-- feedback: Correcto. La propiedad $\log(a^n) = n\log a$ exige $a > 0$; para $x < 0$, $f(x)$ existe (por ejemplo, $f(-10) = 2$) y $g(x)$ no. -->
- [ ] C) Coinciden para todo $x \ne 0$
  <!-- feedback: Incorrecto. Para $x = -10$, $f(-10) = \log 100 = 2$, pero $g(-10) = 2\log(-10)$ no existe. -->
- [ ] D) No coinciden en ningún punto
  <!-- feedback: Incorrecto. Para $x > 0$ la propiedad vale: por ejemplo, $f(10) = g(10) = 2$. -->

### Explicacion Pedagogica
Dos funciones son iguales si tienen el mismo dominio y la misma regla. $\text{Dom} f = \{x : x^2 > 0\} = \mathbb{R} - \{0\}$, mientras que $\text{Dom} g = (0, +\infty)$. En $x > 0$ coinciden; en realidad $f(x) = 2\log|x|$.

## Question 15 [D7-D8]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v15
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.55
**Contexto:** El INPRES informa sismos en Mendoza usando la relación entre energía liberada y magnitud: $\log E = 4{,}8 + 1{,}5M$, con $E$ en joules.

### Enunciado
Si la magnitud aumenta en $1$ punto, ¿por cuánto se multiplica aproximadamente la energía liberada?

### Opciones
- [ ] A) Por $10$
  <!-- feedback: Incorrecto. Ese factor corresponde a la amplitud ($M = \log\frac{A}{A_0}$); para la energía el coeficiente es $1{,}5$, y $10^{1{,}5} \approx 31{,}6$. -->
- [ ] B) Por $1{,}5$
  <!-- feedback: Incorrecto. El $1{,}5$ es lo que aumenta $\log E$, no $E$; hay que elevar $10$ a esa diferencia. -->
- [x] C) Por $31{,}6$
  <!-- feedback: Correcto. Al aumentar $M$ en $1$, $\log E$ aumenta $1{,}5$, y entonces $E$ se multiplica por $10^{1{,}5} \approx 31{,}6$. -->
- [ ] D) Por $15$
  <!-- feedback: Incorrecto. Se multiplicó $10\cdot 1{,}5$; la diferencia de logaritmos $1{,}5$ se traduce en un factor $10^{1{,}5}$, no en un producto. -->

### Explicacion Pedagogica
Si $\log E_2 = 4{,}8 + 1{,}5(M + 1)$ y $\log E_1 = 4{,}8 + 1{,}5M$, restando queda $\log\frac{E_2}{E_1} = 1{,}5$. Por lo tanto $\frac{E_2}{E_1} = 10^{1{,}5} = 10\sqrt{10} \approx 31{,}6$. Un sismo de un punto más libera unas $32$ veces más energía.

## Question 16 [D7-D8]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v16
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.53
**Contexto:** Una empresa de Córdoba mide la eficiencia de un algoritmo con $f(x) = \log_2 x$ y quiere saber para qué tamaños $x$ de datos el costo es menor que $3$.

### Enunciado
¿Cuál es el conjunto solución de $\log_2 x < 3$?

### Opciones
- [ ] A) $(-\infty, 8)$
  <!-- feedback: Incorrecto. Se olvidó la condición de dominio: el logaritmo solo existe para $x > 0$. -->
- [ ] B) $(0, 6)$
  <!-- feedback: Incorrecto. Se calculó $2\cdot 3 = 6$; para despejar hay que elevar: $x < 2^3 = 8$. -->
- [ ] C) $(8, +\infty)$
  <!-- feedback: Incorrecto. Se invirtió el sentido de la desigualdad; eso solo ocurre con bases entre $0$ y $1$, y aquí la base es $2$. -->
- [x] D) $(0, 8)$
  <!-- feedback: Correcto. Como $\log_2$ es creciente, $\log_2 x < 3$ equivale a $x < 2^3 = 8$, y el dominio exige $x > 0$. -->

### Explicacion Pedagogica
Para una base mayor que $1$, el logaritmo es creciente, así que la desigualdad se conserva al pasar a potencias: $\log_2 x < 3 \iff x < 2^3 = 8$. Combinando con el dominio $x > 0$, la solución es $(0, 8)$.

## Question 17 [D9-D10]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.50
**Contexto:** En un foro de estudiantes de Santiago del Estero alguien sostiene que $\log_3 x > \log_5 x$ para todo $x > 0$, porque $3 < 5$ hace que la base $3$ alcance antes cada valor.

### Enunciado
¿Cuál es la evaluación correcta de esa afirmación?

### Opciones
- [x] A) Es verdadera solo para $x > 1$; en $x = 1$ son iguales y para $0 < x < 1$ ocurre lo contrario
  <!-- feedback: Correcto. Con $\log_3 x = \frac{\ln x}{\ln 3}$ y $\log_5 x = \frac{\ln x}{\ln 5}$, como $\ln 3 < \ln 5$, el orden depende del signo de $\ln x$. -->
- [ ] B) Es verdadera para todo $x > 0$, porque $3 < 5$
  <!-- feedback: Incorrecto. Falla para $x < 1$: $\log_3\frac{1}{9} = -2$, mientras que $\log_5\frac{1}{9} \approx -1{,}37$, que es mayor. -->
- [ ] C) Es falsa para todo $x > 0$, porque la base mayor da logaritmos mayores
  <!-- feedback: Incorrecto. Para $x = 9$: $\log_3 9 = 2$ y $\log_5 9 \approx 1{,}37$, así que la base menor da el valor mayor. -->
- [ ] D) Es verdadera solo para $0 < x < 1$
  <!-- feedback: Incorrecto. Es al revés: $\log_3\frac{1}{9} = -2 < \log_5\frac{1}{9} \approx -1{,}37$; en ese intervalo gana la base $5$. -->

### Explicacion Pedagogica
Escribimos ambos en base $e$: $\log_3 x - \log_5 x = \ln x\left(\frac{1}{\ln 3} - \frac{1}{\ln 5}\right)$. El paréntesis es positivo, así que el signo es el de $\ln x$: positivo si $x > 1$, cero si $x = 1$ y negativo si $0 < x < 1$. La afirmación solo vale para $x > 1$.

## Question 18 [D9-D10]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.48
**Contexto:** Una aplicación educativa de Buenos Aires modela la cantidad de palabras de inglés aprendidas con $N(t) = 20\log_2(t + 1)$, donde $t$ son los días de uso.

### Enunciado
¿Cuál de estas afirmaciones describe correctamente el modelo?

### Opciones
- [ ] A) $N$ aumenta $20$ palabras por día
  <!-- feedback: Incorrecto. Eso describe un modelo lineal $20t$; aquí de $t = 3$ a $t = 7$ pasan $4$ días para sumar $20$ palabras. -->
- [x] B) Cada vez que $t + 1$ se duplica, $N$ aumenta $20$ palabras, así que el aprendizaje se desacelera
  <!-- feedback: Correcto. Por ejemplo, $N(1) = 20$, $N(3) = 40$ y $N(7) = 60$: para sumar $20$ palabras se necesitan cada vez más días. -->
- [ ] C) $N$ tiene un valor máximo de $20$ palabras
  <!-- feedback: Incorrecto. El logaritmo no está acotado superiormente: $N(1023) = 20\cdot 10 = 200$. -->
- [ ] D) $N$ se duplica cada vez que $t$ se duplica
  <!-- feedback: Incorrecto. Con $t = 1$, $N = 20$, y con $t = 2$, $N = 20\log_2 3 \approx 31{,}7$, que no es el doble. -->

### Explicacion Pedagogica
Usamos $\log_2(2u) = 1 + \log_2 u$: duplicar $t + 1$ suma $1$ al logaritmo y $20$ a $N$. Así, $N(1) = 20$, $N(3) = 40$, $N(7) = 60$, $N(15) = 80$. El modelo crece sin límite, pero cada vez más despacio, típico del aprendizaje con rendimientos decrecientes.

## Question 19 [D9-D10]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.47
**Contexto:** En un laboratorio de un colegio de Corrientes se mezclan volúmenes iguales de dos soluciones de ácido fuerte, una de pH $2$ y otra de pH $4$; se supone que no hay otras reacciones.

### Enunciado
Un alumno afirma que la mezcla tendrá pH $3$, el promedio. ¿Cuál es la evaluación correcta?

### Opciones
- [ ] A) Es verdadera, porque el pH de una mezcla es el promedio de los pH
  <!-- feedback: Incorrecto. El pH es un logaritmo: promediar logaritmos no equivale a promediar concentraciones. -->
- [ ] B) Es falsa: el pH es $6$, porque se suman los pH
  <!-- feedback: Incorrecto. Sumar pH correspondería a multiplicar concentraciones, algo que no ocurre al mezclar. -->
- [ ] C) Es falsa: el pH es $4$, porque domina la solución más diluida
  <!-- feedback: Incorrecto. La solución de pH $2$ tiene $100$ veces más $\text{H}^+$, así que es la que domina la mezcla. -->
- [x] D) Es falsa: $[\text{H}^+] = \frac{10^{-2} + 10^{-4}}{2} \approx 5{,}05\cdot 10^{-3}$ y el pH es cercano a $2{,}30$
  <!-- feedback: Correcto. Lo que se promedia es la concentración, no el pH; $-\log(5{,}05\cdot 10^{-3}) \approx 2{,}30$. -->

### Explicacion Pedagogica
Al mezclar volúmenes iguales, la concentración de $\text{H}^+$ es el promedio: $\frac{0{,}01 + 0{,}0001}{2} = 0{,}00505$ mol/L. Entonces $\text{pH} = -\log 0{,}00505 \approx 2{,}30$, mucho más cerca de $2$ que de $3$, porque la escala es logarítmica.

## Question 20 [D9-D10]
**ID:** AR-MAT-11-2026-W14-funcion-logaritmica-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.45
**Contexto:** En una clase de un colegio de Posadas se discute si $f(x) = \log x$, que crece muy lentamente, tiene un techo, es decir, un valor que nunca supera.

### Enunciado
¿Cuál es la afirmación correcta sobre la imagen de $f(x) = \log x$?

### Opciones
- [ ] A) Tiene una asíntota horizontal, porque crece muy lentamente
  <!-- feedback: Incorrecto. Crecer lento no implica estar acotada: para superar cualquier $k$ basta tomar $x > 10^k$. -->
- [ ] B) Su imagen es $(0, +\infty)$, igual que su dominio
  <!-- feedback: Incorrecto. Para $0 < x < 1$ el logaritmo es negativo, por ejemplo $\log 0{,}01 = -2$. -->
- [ ] C) Su imagen es $[0, +\infty)$, porque $\log 1 = 0$
  <!-- feedback: Incorrecto. Que $\log 1 = 0$ no impide valores negativos: $\log 0{,}1 = -1$. -->
- [x] D) Su imagen es todo $\mathbb{R}$: para cualquier $k$ existe $x = 10^k$ con $\log x = k$
  <!-- feedback: Correcto. Por ser inversa de $10^x$, el logaritmo toma todos los valores reales; por ejemplo, $\log 10^6 = 6$. -->

### Explicacion Pedagogica
La imagen de $\log x$ coincide con el dominio de su inversa $10^x$, que es todo $\mathbb{R}$. Dado cualquier $k$, el número $x = 10^k > 0$ cumple $\log x = k$. La función crece sin límite, aunque lentamente: para llegar a $6$ hace falta $x = 1\,000\,000$.
