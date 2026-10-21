---
id: "CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "logaritmos"
periodo: "weekly"
week: "W06"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "DBA MEN Colombia"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# Bundle MASTERY: Logaritmos - Grado 11

Este bundle evalúa la definición y las propiedades de los logaritmos, el cambio de base, las ecuaciones logarítmicas con verificación del dominio y las escalas de pH, decibeles y magnitud sísmica, con el estilo de Saber 11.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Numerico
**Expected_Success:** 0.85
**Contexto:** En un torneo de ajedrez por eliminación directa en Bogotá participan 32 jugadores y en cada ronda queda eliminada la mitad.

### Enunciado
El número de rondas necesarias para tener un campeón es $\log_{2} 32$. ¿Cuántas rondas se juegan?

### Opciones
- [ ] A) 16
  <!-- feedback: Incorrecto. 16 es $32 \div 2$, el número de partidas de la primera ronda, no el exponente al que se eleva 2 para obtener 32. -->
- [ ] B) 6
  <!-- feedback: Incorrecto. $2^6 = 64$, no 32; se contó una ronda de más. -->
- [x] C) 5
  <!-- feedback: Correcto. $2^5 = 32$, por lo tanto $\log_{2} 32 = 5$: hay que dividir 32 entre 2 cinco veces para llegar a 1. -->
- [ ] D) $\frac{1}{5}$
  <!-- feedback: Incorrecto. $\log_{2} 32$ es el exponente $y$ tal que $2^y = 32$; $2^{1/5} \approx 1.15$, muy lejos de 32. -->

### Explicacion Pedagogica
Por definición, $\log_{b} N = y$ significa $b^y = N$. Como $2^1 = 2$, $2^2 = 4$, $2^3 = 8$, $2^4 = 16$ y $2^5 = 32$, se tiene $\log_{2} 32 = 5$. En el torneo: 32, 16, 8, 4, 2 y 1 jugador, es decir, 5 rondas.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v2
**Bloom:** Understand
**ICFES:** Algebraico
**Expected_Success:** 0.83
**Contexto:** En una clase de Manizales, la profesora escribe en el tablero la igualdad $\log_{3} 81 = 4$ y pide reescribirla.

### Enunciado
¿Cuál igualdad exponencial es equivalente a $\log_{3} 81 = 4$?

### Opciones
- [ ] A) $4^{3} = 81$
  <!-- feedback: Incorrecto. Se intercambiaron base y exponente; además $4^3 = 64 \ne 81$. -->
- [ ] B) $81^{4} = 3$
  <!-- feedback: Incorrecto. La base del logaritmo (3) es la base de la potencia, no el resultado; $81^4$ es un número enorme. -->
- [ ] C) $3^{81} = 4$
  <!-- feedback: Incorrecto. El argumento 81 es el resultado de la potencia, no el exponente. -->
- [x] D) $3^{4} = 81$
  <!-- feedback: Correcto. $\log_{b} N = y$ equivale a $b^y = N$; con $b = 3$, $y = 4$ y $N = 81$ queda $3^4 = 81$. -->

### Explicacion Pedagogica
En $\log_{3} 81 = 4$ la base es 3, el argumento es 81 y el valor del logaritmo, 4, es un exponente. La forma exponencial es base elevada al logaritmo igual al argumento: $3^4 = 81$. Se comprueba: $3 \cdot 3 \cdot 3 \cdot 3 = 81$.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v3
**Bloom:** Remember
**ICFES:** Algebraico
**Expected_Success:** 0.81
**Contexto:** En un preuniversitario de Cartagena, los estudiantes repasan las propiedades de los logaritmos antes del simulacro.

### Enunciado
¿Cuál de las siguientes igualdades es correcta para todo $a > 0$ y $b > 0$?

### Opciones
- [x] A) $\log(ab) = \log a + \log b$
  <!-- feedback: Correcto. Es la propiedad del producto: el logaritmo de un producto es la suma de los logaritmos de los factores. -->
- [ ] B) $\log(a + b) = \log a + \log b$
  <!-- feedback: Incorrecto. No hay regla para el logaritmo de una suma; con $a = b = 1$ queda $\log 2 \ne 0$. -->
- [ ] C) $\log\left(\frac{a}{b}\right) = \frac{\log a}{\log b}$
  <!-- feedback: Incorrecto. El logaritmo de un cociente es una resta: $\log a - \log b$, no un cociente de logaritmos. -->
- [ ] D) $\log(a^{n}) = (\log a)^{n}$
  <!-- feedback: Incorrecto. El exponente sale multiplicando: $\log(a^n) = n \log a$; elevar el logaritmo a la $n$ es otra cosa. -->

### Explicacion Pedagogica
Si $a = 10^p$ y $b = 10^q$, entonces $ab = 10^{p+q}$ y $\log(ab) = p + q = \log a + \log b$. Las demás opciones confunden las reglas: $\log\frac{a}{b} = \log a - \log b$ y $\log a^n = n\log a$; para $\log(a + b)$ no existe simplificación general.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Numerico
**Expected_Success:** 0.79
**Contexto:** En un concurso de cálculo mental en Neiva se pide calcular sin calculadora una suma de logaritmos.

### Enunciado
¿Cuál es el valor de $\log_{2} 8 + \log_{10} 0.01$?

### Opciones
- [ ] A) 5
  <!-- feedback: Incorrecto. Se tomó $\log_{10} 0.01 = 2$; como 0.01 es menor que 1, su logaritmo decimal es negativo: $-2$. -->
- [x] B) 1
  <!-- feedback: Correcto. $\log_{2} 8 = 3$ porque $2^3 = 8$, y $\log_{10} 0.01 = -2$ porque $10^{-2} = 0.01$; $3 + (-2) = 1$. -->
- [ ] C) 3
  <!-- feedback: Incorrecto. Se tomó $\log_{10} 0.01 = 0$; solo $\log 1 = 0$, y $10^{-2} = 0.01$. -->
- [ ] D) $-6$
  <!-- feedback: Incorrecto. Se multiplicaron los logaritmos, $3 \times (-2)$, cuando el enunciado pide sumarlos. -->

### Explicacion Pedagogica
Cada término se calcula con la definición. $\log_{2} 8$: $2^y = 8 \Rightarrow y = 3$. $\log_{10} 0.01$: $0.01 = \frac{1}{100} = 10^{-2}$, entonces vale $-2$. La suma es $3 + (-2) = 1$. Un logaritmo de base mayor que 1 es negativo cuando el argumento está entre 0 y 1.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.76
**Contexto:** Un grupo ambiental de Soacha toma una muestra del río Bogotá y mide una concentración de iones hidrógeno $[H^{+}] = 1 \times 10^{-6}$ mol/L.

### Enunciado
Si $\text{pH} = -\log[H^{+}]$, ¿cuál es el pH de la muestra?

### Opciones
- [ ] A) $-6$
  <!-- feedback: Incorrecto. Se olvidó el signo menos de la fórmula: $\log(10^{-6}) = -6$, pero el pH es su opuesto. -->
- [x] B) 6
  <!-- feedback: Correcto. $\text{pH} = -\log(10^{-6}) = -(-6) = 6$. -->
- [ ] C) $10^{6}$
  <!-- feedback: Incorrecto. El pH es un exponente (un logaritmo), no la concentración invertida $\frac{1}{10^{-6}}$. -->
- [ ] D) 8
  <!-- feedback: Incorrecto. Se calculó $14 - 6$, que corresponde al pOH, no al pH. -->

### Explicacion Pedagogica
La escala de pH es logarítmica: $\text{pH} = -\log[H^{+}]$. Con $[H^{+}] = 10^{-6}$: $\log(10^{-6}) = -6$ y el signo menos lo vuelve positivo, $\text{pH} = 6$. Un pH de 6 indica una muestra ligeramente ácida (el agua neutra tiene pH 7 a 25 °C).

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Numerico
**Expected_Success:** 0.74
**Contexto:** En Bucaramanga, una estudiante solo tiene en su calculadora las teclas $\ln$ y $\log$, y necesita calcular $\log_{2} 50$.

### Enunciado
Usando cambio de base, ¿cuál es el valor aproximado de $\log_{2} 50$?

### Opciones
- [ ] A) 25
  <!-- feedback: Incorrecto. Se dividió el argumento entre la base, $50 \div 2$; el logaritmo es un exponente, no un cociente de esos números. -->
- [ ] B) 0.18
  <!-- feedback: Incorrecto. Se invirtió la fórmula: $\frac{\ln 2}{\ln 50} \approx 0.18$ es $\log_{50} 2$. -->
- [x] C) 5.64
  <!-- feedback: Correcto. $\log_{2} 50 = \frac{\ln 50}{\ln 2} = \frac{3.912}{0.693} \approx 5.64$; y en efecto $2^{5.64} \approx 50$. -->
- [ ] D) 1.70
  <!-- feedback: Incorrecto. $1.70 \approx \log_{10} 50$; se calculó el logaritmo decimal sin dividir entre $\log 2$. -->

### Explicacion Pedagogica
La fórmula de cambio de base es $\log_{b} N = \frac{\log N}{\log b} = \frac{\ln N}{\ln b}$. Así $\log_{2} 50 = \frac{\log 50}{\log 2} = \frac{1.69897}{0.30103} \approx 5.644$. Es razonable porque $2^5 = 32 < 50 < 64 = 2^6$, de modo que el resultado debe estar entre 5 y 6.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.72
**Contexto:** En un taller de olimpiadas en Cúcuta se resuelve una ecuación logarítmica y se insiste en verificar las soluciones.

### Enunciado
¿Cuál es el conjunto solución de $\log_{2} x + \log_{2}(x - 2) = 3$?

### Opciones
- [x] A) $x = 4$
  <!-- feedback: Correcto. $x(x - 2) = 8$ da $x = 4$ o $x = -2$; solo $x = 4$ cumple $x > 0$ y $x - 2 > 0$. -->
- [ ] B) $x = 4$ o $x = -2$
  <!-- feedback: Incorrecto. $x = -2$ hace negativo el argumento de $\log_{2} x$; hay que descartarla al revisar el dominio. -->
- [ ] C) $x = -2$
  <!-- feedback: Incorrecto. Con $x = -2$ aparecen $\log_{2}(-2)$ y $\log_{2}(-4)$, que no existen en los reales. -->
- [ ] D) $x = 5$
  <!-- feedback: Incorrecto. Se sumaron los argumentos, $x + (x - 2) = 2^3$, pero la suma de logaritmos es el logaritmo del producto. -->

### Explicacion Pedagogica
Dominio: $x > 0$ y $x > 2$, es decir $x > 2$. Por la propiedad del producto: $\log_{2}[x(x - 2)] = 3 \Rightarrow x^2 - 2x = 8 \Rightarrow x^2 - 2x - 8 = 0 \Rightarrow (x - 4)(x + 2) = 0$. Los candidatos son 4 y $-2$; como $-2 < 2$, solo queda $x = 4$. Verificación: $\log_{2} 4 + \log_{2} 2 = 2 + 1 = 3$.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.70
**Contexto:** En un concierto en Medellín, el nivel de sonido es 70 dB y, al acercarse a los parlantes, la intensidad se multiplica por 100.

### Enunciado
Si $L = 10 \log\left(\frac{I}{I_0}\right)$, ¿cuál es el nuevo nivel de sonido?

### Opciones
- [ ] A) 7000 dB
  <!-- feedback: Incorrecto. Se multiplicó el nivel por 100; la escala es logarítmica, así que un factor en la intensidad se convierte en una suma de decibeles. -->
- [ ] B) 170 dB
  <!-- feedback: Incorrecto. Se sumó 100 directamente; lo que se suma es $10 \log 100 = 20$, no el factor 100. -->
- [ ] C) 72 dB
  <!-- feedback: Incorrecto. Se sumó $\log 100 = 2$ pero se olvidó el factor 10 de la fórmula. -->
- [x] D) 90 dB
  <!-- feedback: Correcto. Multiplicar $I$ por 100 suma $10 \log 100 = 10 \cdot 2 = 20$ dB: $70 + 20 = 90$ dB. -->

### Explicacion Pedagogica
Nuevo nivel: $L_2 = 10\log\left(\frac{100 I}{I_0}\right) = 10\left[\log 100 + \log\frac{I}{I_0}\right] = 10 \cdot 2 + L_1 = 20 + 70 = 90$ dB. En la escala de decibeles, cada vez que la intensidad se multiplica por 10 el nivel aumenta 10 dB.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.68
**Contexto:** En un grupo de estudio de Santa Marta se pide expandir una expresión logarítmica para simplificar un cálculo.

### Enunciado
¿Cuál es la expansión correcta de $\log\left(\frac{x^{2}\sqrt{y}}{z^{3}}\right)$, con $x, y, z > 0$?

### Opciones
- [x] A) $2\log x + \frac{1}{2}\log y - 3\log z$
  <!-- feedback: Correcto. Producto en suma, cociente en resta y exponentes como coeficientes, con $\sqrt{y} = y^{1/2}$. -->
- [ ] B) $2\log x + \frac{1}{2}\log y + 3\log z$
  <!-- feedback: Incorrecto. $z^3$ está en el denominador, así que su logaritmo se resta, no se suma. -->
- [ ] C) $2\log x + 2\log y - 3\log z$
  <!-- feedback: Incorrecto. Se tomó $\sqrt{y}$ como $y^2$; la raíz cuadrada es el exponente $\frac{1}{2}$. -->
- [ ] D) $\frac{2\log x \cdot \frac{1}{2}\log y}{3\log z}$
  <!-- feedback: Incorrecto. Se conservaron el producto y el cociente; las propiedades los convierten en suma y resta de logaritmos. -->

### Explicacion Pedagogica
Primero el cociente: $\log(x^2\sqrt{y}) - \log(z^3)$. Luego el producto: $\log x^2 + \log y^{1/2} - \log z^3$. Por último los exponentes: $2\log x + \frac{1}{2}\log y - 3\log z$. Se comprueba con $x = 10$, $y = 100$, $z = 10$: ambos lados valen $2 + 1 - 3 = 0$.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.66
**Contexto:** En un laboratorio de la Universidad del Valle en Cali, un cultivo de bacterias duplica su tamaño cada hora.

### Enunciado
¿Cuántas horas, aproximadamente, tarda el cultivo en multiplicarse por 20? (Se resuelve $2^{t} = 20$.)

### Opciones
- [ ] A) 10 horas
  <!-- feedback: Incorrecto. Se dividió $20 \div 2$, como si el crecimiento fuera lineal; al duplicar, en 4 horas ya se multiplica por 16. -->
- [x] B) 4.32 horas
  <!-- feedback: Correcto. $t = \log_{2} 20 = \frac{\log 20}{\log 2} = \frac{1.301}{0.301} \approx 4.32$ h. -->
- [ ] C) 3.00 horas
  <!-- feedback: Incorrecto. $3.00 \approx \ln 20$; se olvidó dividir entre $\ln 2$ para cambiar a base 2. -->
- [ ] D) 1.30 horas
  <!-- feedback: Incorrecto. $1.30 \approx \log 20$; falta dividir entre $\log 2 \approx 0.301$. -->

### Explicacion Pedagogica
Se aplica logaritmo a ambos lados de $2^t = 20$: $t \log 2 = \log 20$, entonces $t = \frac{\log 20}{\log 2} \approx \frac{1.3010}{0.3010} \approx 4.32$ horas. El resultado es coherente: $2^4 = 16 < 20 < 32 = 2^5$, de modo que el tiempo está entre 4 y 5 horas.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.63
**Contexto:** Un sismógrafo del Servicio Geológico en el Eje Cafetero registra dos sismos: uno de magnitud 6.5 y otro de magnitud 4.5.

### Enunciado
En la escala de magnitud $M = \log\left(\frac{A}{A_0}\right)$, donde $A$ es la amplitud de la onda, ¿cuántas veces mayor es la amplitud del primer sismo que la del segundo?

### Opciones
- [ ] A) 2 veces
  <!-- feedback: Incorrecto. 2 es la diferencia de magnitudes, que es el logaritmo del cociente; el cociente es $10^2$. -->
- [ ] B) 20 veces
  <!-- feedback: Incorrecto. Se multiplicó $2 \times 10$; la relación es exponencial, $10^2$, no un producto. -->
- [ ] C) 1.44 veces
  <!-- feedback: Incorrecto. Se dividieron las magnitudes, $6.5 \div 4.5$; en una escala logarítmica se comparan restando y luego elevando 10 a esa diferencia. -->
- [x] D) 100 veces
  <!-- feedback: Correcto. $M_1 - M_2 = \log\frac{A_1}{A_2} = 2$, luego $\frac{A_1}{A_2} = 10^2 = 100$. -->

### Explicacion Pedagogica
Restando las magnitudes: $6.5 - 4.5 = \log\frac{A_1}{A_0} - \log\frac{A_2}{A_0} = \log\frac{A_1}{A_2}$. Entonces $\log\frac{A_1}{A_2} = 2$ y $\frac{A_1}{A_2} = 10^{2} = 100$. Cada unidad de magnitud multiplica la amplitud por 10.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.61
**Contexto:** En Valledupar, Carlos resolvió $\log_{3}(x - 4) = 2$ así: $x - 4 = 6$, luego $x = 10$.

### Enunciado
¿Cuál es el error de Carlos y cuál es la solución correcta?

### Opciones
- [ ] A) No hay error; la solución es $x = 10$
  <!-- feedback: Incorrecto. Con $x = 10$ queda $\log_{3} 6$, que no es 2, porque $3^2 = 9 \ne 6$. -->
- [ ] B) Debía escribir $x - 4 = 2^{3} = 8$, así que $x = 12$
  <!-- feedback: Incorrecto. Se invirtieron base y exponente; la base del logaritmo es 3 y el valor 2 es el exponente. -->
- [ ] C) La ecuación no tiene solución porque $x - 4$ puede ser negativo
  <!-- feedback: Incorrecto. El dominio pide $x > 4$, y $x = 13$ lo cumple; la ecuación sí tiene solución. -->
- [x] D) Calculó $3 \cdot 2$ en lugar de $3^{2}$; debe ser $x - 4 = 9$, así que $x = 13$
  <!-- feedback: Correcto. Por definición $\log_{3}(x - 4) = 2$ significa $3^2 = x - 4$, es decir, $9 = x - 4$. -->

### Explicacion Pedagogica
Pasando a forma exponencial: $\log_{3}(x - 4) = 2 \iff x - 4 = 3^{2} = 9$, entonces $x = 13$. Se verifica el dominio ($13 - 4 = 9 > 0$) y el valor: $\log_{3} 9 = 2$. Carlos confundió la potencia $3^2$ con el producto $3 \cdot 2$.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.59
**Contexto:** Un programa de simulación de una empresa de Barranquilla usa la función $f(x) = \log_{2}(x^{2} - 9)$ y rechaza las entradas fuera de su dominio.

### Enunciado
¿Cuál es el dominio de $f(x) = \log_{2}(x^{2} - 9)$?

### Opciones
- [ ] A) $(3, \infty)$
  <!-- feedback: Incorrecto. Se olvidaron los negativos: con $x = -4$, $x^2 - 9 = 7 > 0$, así que $-4$ también está en el dominio. -->
- [ ] B) $(-3, 3)$
  <!-- feedback: Incorrecto. En ese intervalo $x^2 - 9 < 0$ (por ejemplo, $x = 0$ da $-9$) y el logaritmo no está definido. -->
- [x] C) $(-\infty, -3) \cup (3, \infty)$
  <!-- feedback: Correcto. Se necesita $x^2 - 9 > 0$, es decir $x^2 > 9$, lo que ocurre si $x < -3$ o $x > 3$. -->
- [ ] D) $(-\infty, -3] \cup [3, \infty)$
  <!-- feedback: Incorrecto. En $x = \pm 3$ el argumento vale 0 y $\log_{2} 0$ no existe; los extremos deben quedar abiertos. -->

### Explicacion Pedagogica
El argumento de un logaritmo debe ser estrictamente positivo: $x^2 - 9 > 0 \iff (x - 3)(x + 3) > 0$. El producto es positivo cuando ambos factores tienen el mismo signo: $x > 3$ o $x < -3$. Por eso el dominio es $(-\infty, -3) \cup (3, \infty)$, sin incluir $\pm 3$.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.57
**Contexto:** Una aplicación creada en Pereira asigna a cada video un puntaje $P = \log(D)$, donde $D$ es el número de descargas.

### Enunciado
¿Cuál afirmación describe correctamente cómo cambia el puntaje $P$ cuando aumentan las descargas?

### Opciones
- [ ] A) El puntaje se duplica cada vez que las descargas se duplican
  <!-- feedback: Incorrecto. $\log(2D) = \log 2 + \log D$: el puntaje aumenta $\log 2 \approx 0.301$, no se duplica. -->
- [ ] B) El puntaje crece cada vez más rápido a medida que aumentan las descargas
  <!-- feedback: Incorrecto. La función logaritmo es cóncava: para lograr el mismo aumento de puntaje se necesitan cada vez más descargas. -->
- [x] C) Cada vez que las descargas se multiplican por 10, el puntaje aumenta 1 unidad, así que el puntaje crece cada vez más despacio
  <!-- feedback: Correcto. $\log(10D) = 1 + \log D$; pasar de 100 a 1000 descargas suma 1, igual que pasar de 10 a 100, aunque son 900 descargas frente a 90. -->
- [ ] D) El puntaje aumenta 10 unidades cada vez que las descargas aumentan en 10
  <!-- feedback: Incorrecto. Ese sería un modelo lineal; con $\log$, pasar de 10 a 20 descargas solo suma $\log 2 \approx 0.30$. -->

### Explicacion Pedagogica
Con $P = \log D$: $D = 10 \Rightarrow P = 1$, $D = 100 \Rightarrow P = 2$, $D = 1000 \Rightarrow P = 3$. Los aumentos iguales del puntaje requieren multiplicar (no sumar) las descargas por 10. Por eso el crecimiento del logaritmo es lento: es una función creciente cuya razón de cambio disminuye.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Numerico
**Expected_Success:** 0.55
**Contexto:** En un examen de admisión en Tunja aparece el cálculo exacto de $\log_{4} 8$, sin calculadora.

### Enunciado
¿Cuál es el valor exacto de $\log_{4} 8$?

### Opciones
- [ ] A) 2
  <!-- feedback: Incorrecto. 2 es $8 \div 4$; el logaritmo pide el exponente, y $4^2 = 16 \ne 8$. -->
- [ ] B) $\frac{2}{3}$
  <!-- feedback: Incorrecto. Se invirtió la razón: $\frac{2}{3}$ es $\log_{8} 4$, porque $8^{2/3} = 4$. -->
- [ ] C) 4
  <!-- feedback: Incorrecto. Se restó $8 - 4$; $4^4 = 256$, que no es 8. -->
- [x] D) $\frac{3}{2}$
  <!-- feedback: Correcto. $4 = 2^2$ y $8 = 2^3$; si $4^y = 8$, entonces $2^{2y} = 2^3$, así que $y = \frac{3}{2}$. -->

### Explicacion Pedagogica
Se buscan base y argumento como potencias de una misma base: $4 = 2^2$ y $8 = 2^3$. La ecuación $4^y = 8$ se convierte en $2^{2y} = 2^{3}$; igualando exponentes, $2y = 3$ y $y = \frac{3}{2}$. Verificación: $4^{3/2} = (\sqrt{4})^3 = 2^3 = 8$.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Numerico
**Expected_Success:** 0.53
**Contexto:** En una prueba de Saber 11 en Popayán se dan los valores $\log 2 \approx 0.301$ y $\log 3 \approx 0.477$ para estimar otros logaritmos.

### Enunciado
Con esos valores, ¿cuál es la mejor aproximación de $\log 12$?

### Opciones
- [ ] A) 0.778
  <!-- feedback: Incorrecto. $0.301 + 0.477 = 0.778$ es $\log 6$; falta otro factor 2, porque $12 = 2 \cdot 6$. -->
- [ ] B) 0.144
  <!-- feedback: Incorrecto. Se multiplicaron $0.301 \times 0.477$; el logaritmo de un producto es la suma de logaritmos. -->
- [x] C) 1.079
  <!-- feedback: Correcto. $12 = 2^2 \cdot 3$, entonces $\log 12 = 2\log 2 + \log 3 = 0.602 + 0.477 = 1.079$. -->
- [ ] D) 1.204
  <!-- feedback: Incorrecto. $4 \times 0.301 = 1.204$ es $\log 16$; se usó $2^4$ en lugar de $2^2 \cdot 3$. -->

### Explicacion Pedagogica
Se descompone en factores primos: $12 = 4 \cdot 3 = 2^2 \cdot 3$. Por las propiedades del producto y de la potencia, $\log 12 = \log 2^2 + \log 3 = 2(0.301) + 0.477 = 1.079$. Con calculadora $\log 12 = 1.0792$, lo que confirma la estimación.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.50
**Contexto:** En Villavicencio, cuatro estudiantes proponen procedimientos distintos para resolver $3 \cdot 5^{x} = 75$.

### Enunciado
¿Cuál procedimiento es válido y lleva a la solución correcta?

### Opciones
- [x] A) Dividir entre 3 para obtener $5^{x} = 25$ y concluir que $x = \log_{5} 25 = 2$
  <!-- feedback: Correcto. Primero se aísla la potencia: $5^x = \frac{75}{3} = 25 = 5^2$, de donde $x = 2$; verificación $3 \cdot 25 = 75$. -->
- [ ] B) Multiplicar las bases para obtener $15^{x} = 75$ y concluir que $x = \log_{15} 75$
  <!-- feedback: Incorrecto. $3 \cdot 5^x \ne 15^x$; el 3 no está elevado a la $x$, así que no se puede juntar con la base 5. -->
- [ ] C) Tomar logaritmos así: $\log 3 \cdot x\log 5 = \log 75$
  <!-- feedback: Incorrecto. El logaritmo de un producto es una suma: $\log 3 + x\log 5 = \log 75$, no un producto de logaritmos. -->
- [ ] D) Dividir 75 entre 5 para obtener $3^{x} = 15$
  <!-- feedback: Incorrecto. La $x$ es exponente de 5, no de 3; dividir entre 5 no elimina la potencia $5^x$. -->

### Explicacion Pedagogica
En $3 \cdot 5^x = 75$ el factor 3 multiplica a la potencia, así que se despeja dividiendo: $5^x = 25$. Como $25 = 5^2$, $x = 2$ (equivalente a $x = \log_{5} 25$). Con logaritmos también funciona si se aplica bien: $\log 3 + x\log 5 = \log 75 \Rightarrow x = \frac{\log 25}{\log 5} = 2$.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.48
**Contexto:** En Sibaté, un agrónomo trata el suelo de un cultivo de fresas y su pH pasa de 6 a 3. Un trabajador dice: "la acidez se duplicó, porque 3 es la mitad de 6".

### Enunciado
Sabiendo que $\text{pH} = -\log[H^{+}]$, ¿cuál evaluación de la afirmación es correcta?

### Opciones
- [ ] A) Es verdadera, porque al reducirse el pH a la mitad la concentración se duplica
  <!-- feedback: Incorrecto. El pH es un logaritmo; reducirlo a la mitad no duplica $[H^+]$, sino que la cambia en un factor $10^{3}$. -->
- [x] B) Es falsa: $[H^{+}]$ pasa de $10^{-6}$ a $10^{-3}$ mol/L, es decir, se multiplica por 1000
  <!-- feedback: Correcto. $\frac{10^{-3}}{10^{-6}} = 10^{3} = 1000$; bajar 3 unidades de pH multiplica la concentración por $10^3$. -->
- [ ] C) Es falsa: la concentración se multiplica por 3
  <!-- feedback: Incorrecto. 3 es la diferencia de pH; la concentración cambia en $10^{3}$, no en 3. -->
- [ ] D) Es falsa: la concentración se divide entre 1000 porque el pH bajó
  <!-- feedback: Incorrecto. Un pH menor significa más iones hidrógeno: $10^{-3}$ es mayor que $10^{-6}$. -->

### Explicacion Pedagogica
Con $\text{pH} = 6$, $[H^{+}] = 10^{-6}$ mol/L; con $\text{pH} = 3$, $[H^{+}] = 10^{-3}$ mol/L. El cociente es $\frac{10^{-3}}{10^{-6}} = 10^{3} = 1000$. En la escala logarítmica cada unidad de pH que baja multiplica la acidez por 10, así que 3 unidades la multiplican por 1000, no por 2.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.47
**Contexto:** En Montería, Ana y Bruno resuelven $\log(x^{2}) = 2$. Ana escribe $x^{2} = 100$; Bruno escribe $2\log x = 2$.

### Enunciado
Ana obtiene $x = 10$ o $x = -10$; Bruno obtiene solo $x = 10$. ¿Quién tiene razón?

### Opciones
- [x] A) Ana, porque $x^{2} = 100$ y ambos valores cumplen $x^{2} > 0$; la regla $\log(x^{2}) = 2\log x$ solo vale para $x > 0$
  <!-- feedback: Correcto. Con $x = -10$: $\log((-10)^2) = \log 100 = 2$; Bruno perdió esa solución al usar una regla que exige $x > 0$. -->
- [ ] B) Bruno, porque un número negativo nunca puede aparecer en un logaritmo
  <!-- feedback: Incorrecto. Lo que debe ser positivo es el argumento $x^2$, y $(-10)^2 = 100 > 0$; $x$ sí puede ser negativo. -->
- [ ] C) Ambos, porque las dos ecuaciones son equivalentes
  <!-- feedback: Incorrecto. No son equivalentes: $2\log x$ exige $x > 0$, mientras que $\log(x^2)$ está definido para todo $x \ne 0$. -->
- [ ] D) Ninguno: de $\log(x^{2}) = 2$ sale $x^{2} = 20$, así que $x = \pm\sqrt{20}$
  <!-- feedback: Incorrecto. Se multiplicó $10 \times 2$; la forma exponencial es $x^2 = 10^2 = 100$. -->

### Explicacion Pedagogica
$\log(x^2) = 2$ está definida para todo $x \ne 0$, y su forma exponencial es $x^2 = 10^2 = 100$, con soluciones $x = 10$ y $x = -10$. Ambas se verifican. La propiedad $\log(x^2) = 2\log x$ solo es válida si $x > 0$; en general $\log(x^2) = 2\log|x|$. Por eso Bruno perdió la solución negativa.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W06-logaritmos-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.45
**Contexto:** Un estudio hipotético para Bucaramanga modela la población como $P(t) = 2\,000\,000 \cdot (1.02)^{t}$, con $t$ en años.

### Enunciado
Un concejal afirma que la ciudad llegará a 3 000 000 de habitantes en 25 años "porque crece 2% al año y le falta 50%". ¿Cuál evaluación es correcta?

### Opciones
- [ ] A) Es correcta: $50\% \div 2\% = 25$ años
  <!-- feedback: Incorrecto. Esa cuenta supone crecimiento lineal; con 2% compuesto cada año se gana un 2% sobre una población mayor. -->
- [x] B) Es incorrecta: $1.02^{t} = 1.5$ da $t = \frac{\log 1.5}{\log 1.02} \approx 20.5$ años
  <!-- feedback: Correcto. $\log 1.5 \approx 0.1761$ y $\log 1.02 \approx 0.0086$; su cociente es $\approx 20.5$, menos de 25 por el crecimiento compuesto. -->
- [ ] C) Es incorrecta: tarda unos 0.40 años, porque $\frac{\ln 1.5}{1.02} \approx 0.40$
  <!-- feedback: Incorrecto. Se dividió entre 1.02 en lugar de entre $\ln 1.02$; ambos logaritmos deben tener la misma base. -->
- [ ] D) Es incorrecta: tarda 75 años, porque $1.5 \div 0.02 = 75$
  <!-- feedback: Incorrecto. Se dividió el factor total 1.5 entre la tasa; lo que se busca es el exponente $t$ con $1.02^t = 1.5$. -->

### Explicacion Pedagogica
Se plantea $2\,000\,000 \cdot 1.02^{t} = 3\,000\,000$, es decir $1.02^{t} = 1.5$. Tomando logaritmos: $t\log 1.02 = \log 1.5$ y $t = \frac{0.17609}{0.00860} \approx 20.5$ años. El argumento lineal ($50 \div 2 = 25$) sobreestima el tiempo porque ignora que el 2% se aplica sobre una base que crece.
