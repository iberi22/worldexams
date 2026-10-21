---
id: "AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle"
country: "argentina"
grado: 11
asignatura: "matematica"
tema: "ecuaciones-exponenciales-logaritmicas"
periodo: "weekly"
week: "W15"
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

# Bundle MASTERY: Ecuaciones Exponenciales y Logarítmicas - Grado 11

Bundle de resolución de ecuaciones exponenciales y logarítmicas: igualación de bases, uso de logaritmos, sustitución $u = a^x$, control de dominio y soluciones extrañas, y modelos de tiempo en contextos argentinos.

## Question 1 [D3-D4]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v1
**Bloom:** Remember
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.85
**Contexto:** En un juego de mesa diseñado por estudiantes de Córdoba, la cantidad de fichas se triplica en cada ronda, y se busca la ronda $x$ en que $3^{x+1} = 81$.

### Enunciado
¿Cuál es la solución de $3^{x+1} = 81$?

### Opciones
- [x] A) $x = 3$
  <!-- feedback: Correcto. Como $81 = 3^4$, igualando exponentes $x + 1 = 4$, de donde $x = 3$. -->
- [ ] B) $x = 4$
  <!-- feedback: Incorrecto. Se igualó $x = 4$ olvidando el $+1$ del exponente: $3^{4+1} = 243 \ne 81$. -->
- [ ] C) $x = 26$
  <!-- feedback: Incorrecto. Se dividió $81 : 3 = 27$ y se restó $1$; la incógnita está en el exponente, así que hay que escribir $81$ como potencia de $3$. -->
- [ ] D) $x = 2$
  <!-- feedback: Incorrecto. Se tomó $81 = 3^3$, pero $3^3 = 27$; en realidad $81 = 3^4$. -->

### Explicacion Pedagogica
Escribimos ambos miembros como potencias de la misma base: $3^{x+1} = 3^4$. Como la función $3^t$ es inyectiva, los exponentes son iguales: $x + 1 = 4$, así que $x = 3$. Verificación: $3^{3+1} = 81$.

## Question 2 [D3-D4]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v2
**Bloom:** Understand
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.83
**Contexto:** Un técnico de Mar del Plata calibra un sensor cuyo registro cumple $\log_3(x - 1) = 2$, con $x$ en voltios.

### Enunciado
¿Cuál es la solución de $\log_3(x - 1) = 2$?

### Opciones
- [ ] A) $x = 7$
  <!-- feedback: Incorrecto. Se calculó $3\cdot 2 + 1$; pasar del logaritmo a la potencia exige elevar: $x - 1 = 3^2$. -->
- [ ] B) $x = 9$
  <!-- feedback: Incorrecto. Se obtuvo $x - 1 = 9$ pero faltó sumar $1$ para despejar $x$. -->
- [x] C) $x = 10$
  <!-- feedback: Correcto. Por definición, $x - 1 = 3^2 = 9$, y entonces $x = 10$. -->
- [ ] D) $x = 5$
  <!-- feedback: Incorrecto. Se sumó la base y el resultado, $3 + 2$; el logaritmo dice que $3$ elevado a $2$ es el argumento. -->

### Explicacion Pedagogica
La igualdad $\log_3(x - 1) = 2$ equivale a $3^2 = x - 1$. Así $x - 1 = 9$ y $x = 10$. Comprobamos el dominio: $x - 1 = 9 > 0$, y $\log_3 9 = 2$.

## Question 3 [D3-D4]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v3
**Bloom:** Remember
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.81
**Contexto:** Una distribuidora de Rosario modela la cantidad de pedidos con $5^x$ y necesita el valor de $x$ para el cual $5^x = 12$, que no es potencia exacta de $5$.

### Enunciado
¿Cuál es la solución exacta de $5^x = 12$?

### Opciones
- [ ] A) $x = \frac{12}{5}$
  <!-- feedback: Incorrecto. Se dividió $12$ por la base; $5^{12/5} \approx 47{,}6$, así que no cumple la ecuación. -->
- [ ] B) $x = \log\frac{12}{5}$
  <!-- feedback: Incorrecto. Se aplicó el logaritmo al cociente; la propiedad correcta lleva a un cociente de logaritmos, no al logaritmo de un cociente. -->
- [ ] C) $x = \log 12 - \log 5$
  <!-- feedback: Incorrecto. Esa resta es $\log\frac{12}{5} \approx 0{,}38$; despejar $x\log 5 = \log 12$ requiere dividir, no restar. -->
- [x] D) $x = \frac{\log 12}{\log 5}$
  <!-- feedback: Correcto. Tomando logaritmo en ambos miembros, $x\log 5 = \log 12$, y se despeja dividiendo por $\log 5$. -->

### Explicacion Pedagogica
Cuando las bases no se pueden igualar se toman logaritmos: $\log 5^x = \log 12 \Rightarrow x\log 5 = \log 12 \Rightarrow x = \frac{\log 12}{\log 5} = \log_5 12 \approx 1{,}544$. Control: $5^{1{,}544} \approx 12$.

## Question 4 [D3-D4]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v4
**Bloom:** Understand
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.79
**Contexto:** En un ejercicio de informática de una escuela de Santa Fe, la memoria de un sistema cumple $4^x = 8$ y hay que hallar $x$.

### Enunciado
¿Cuál es la solución de $4^x = 8$?

### Opciones
- [x] A) $x = \frac{3}{2}$
  <!-- feedback: Correcto. Escribiendo $4^x = 2^{2x}$ y $8 = 2^3$, queda $2x = 3$, y entonces $x = \frac{3}{2}$. -->
- [ ] B) $x = 2$
  <!-- feedback: Incorrecto. Se dividió $8 : 4$; con $x = 2$ resulta $4^2 = 16 \ne 8$. -->
- [ ] C) $x = \frac{2}{3}$
  <!-- feedback: Incorrecto. Se invirtió el cociente: de $2x = 3$ sale $x = \frac{3}{2}$, no $\frac{2}{3}$. -->
- [ ] D) $x = 3$
  <!-- feedback: Incorrecto. Se igualó $x = 3$ olvidando que $4^x = 2^{2x}$; hay que dividir por $2$. -->

### Explicacion Pedagogica
Llevamos todo a base $2$: $4^x = (2^2)^x = 2^{2x}$ y $8 = 2^3$. Igualando exponentes, $2x = 3$ y $x = \frac{3}{2}$. Verificación: $4^{3/2} = (\sqrt{4})^3 = 2^3 = 8$.

## Question 5 [D5-D6]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v5
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.76
**Contexto:** Un analista de una empresa de Neuquén obtiene, al modelar dos procesos que se combinan, la ecuación $2^{2x} - 6\cdot 2^x + 8 = 0$.

### Enunciado
¿Cuál es el conjunto solución de $2^{2x} - 6\cdot 2^x + 8 = 0$?

### Opciones
- [ ] A) $\{2, 4\}$
  <!-- feedback: Incorrecto. Esos son los valores de $u = 2^x$; faltó volver a la variable original: $2^x = 2$ y $2^x = 4$. -->
- [ ] B) $\{1\}$
  <!-- feedback: Incorrecto. Se perdió la raíz $u = 4$ de la cuadrática, que aporta $x = 2$. -->
- [x] C) $\{1, 2\}$
  <!-- feedback: Correcto. Con $u = 2^x$ queda $u^2 - 6u + 8 = 0$, con raíces $u = 2$ y $u = 4$; entonces $2^x = 2$ da $x = 1$ y $2^x = 4$ da $x = 2$. -->
- [ ] D) $\{1, 3\}$
  <!-- feedback: Incorrecto. Se usó el término independiente $8 = 2^3$ como si fuera una raíz; las raíces de $u^2 - 6u + 8$ son $2$ y $4$. -->

### Explicacion Pedagogica
Como $2^{2x} = (2^x)^2$, la sustitución $u = 2^x$ (con $u > 0$) transforma la ecuación en $u^2 - 6u + 8 = 0$, es decir, $(u - 2)(u - 4) = 0$. Ambas raíces son positivas, y al volver: $2^x = 2 \Rightarrow x = 1$; $2^x = 4 \Rightarrow x = 2$.

## Question 6 [D5-D6]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v6
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.74
**Contexto:** En un problema de áreas de un terreno en San Rafael, una alumna llega a la ecuación $\log x + \log(x - 3) = 1$ (logaritmos decimales).

### Enunciado
¿Cuál es el conjunto solución de $\log x + \log(x - 3) = 1$?

### Opciones
- [ ] A) $\{5, -2\}$
  <!-- feedback: Incorrecto. Con $x = -2$ aparece $\log(-2)$, que no existe; hay que descartar las soluciones fuera del dominio. -->
- [ ] B) $\{-2\}$
  <!-- feedback: Incorrecto. Se descartó la solución válida y se conservó la que da logaritmos de negativos. -->
- [ ] C) $\left\{\frac{13}{2}\right\}$
  <!-- feedback: Incorrecto. Se escribió $\log(x + x - 3)$; la suma de logaritmos es el logaritmo del producto, no de la suma. -->
- [x] D) $\{5\}$
  <!-- feedback: Correcto. De $x(x - 3) = 10$ salen $x = 5$ y $x = -2$; solo $x = 5$ cumple $x > 3$, que es el dominio de la ecuación. -->

### Explicacion Pedagogica
Dominio: $x > 0$ y $x - 3 > 0$, o sea, $x > 3$. Por la propiedad del producto, $\log[x(x - 3)] = 1$, así que $x^2 - 3x = 10$, es decir, $(x - 5)(x + 2) = 0$. La raíz $-2$ es extraña; la solución es $x = 5$: $\log 5 + \log 2 = \log 10 = 1$.

## Question 7 [D5-D6]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v7
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.72
**Contexto:** Un estudiante de Salta deposita 100.000 pesos en una cuenta que capitaliza al $4\,\%$ mensual y quiere saber cuándo el saldo llegará al doble.

### Enunciado
¿Cuántos meses completos deben pasar, como mínimo, para que el saldo alcance los 200.000 pesos?

### Opciones
- [ ] A) $25$ meses
  <!-- feedback: Incorrecto. Se usó interés simple: $\frac{100\,000}{4\,000} = 25$; con capitalización el capital se duplica antes. -->
- [ ] B) $17$ meses
  <!-- feedback: Incorrecto. Se redondeó $17{,}67$ hacia abajo; $100\,000\cdot 1{,}04^{17} \approx 194\,790$, que no alcanza. -->
- [ ] C) $50$ meses
  <!-- feedback: Incorrecto. Se calculó $\frac{2}{0{,}04}$, que no tiene sentido en el modelo; hay que resolver $1{,}04^t = 2$ con logaritmos. -->
- [x] D) $18$ meses
  <!-- feedback: Correcto. De $1{,}04^t = 2$ sale $t = \frac{\ln 2}{\ln 1{,}04} \approx 17{,}67$; como en el mes $17$ todavía no se llega, hacen falta $18$. -->

### Explicacion Pedagogica
Planteamos $100\,000\cdot 1{,}04^t = 200\,000$, es decir, $1{,}04^t = 2$. Tomando logaritmos: $t = \frac{\ln 2}{\ln 1{,}04} \approx 17{,}67$. Como los intereses se acreditan a fin de cada mes, se necesita el mes $18$: $1{,}04^{18} \approx 2{,}026$.

## Question 8 [D5-D6]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v8
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.70
**Contexto:** Una farmacéutica de Córdoba estudia una reacción química en la que la concentración cumple $e^{2x} = 7$, con $x$ en horas.

### Enunciado
¿Cuál es el valor de $x$ que cumple $e^{2x} = 7$?

### Opciones
- [ ] A) $x = \ln 14 \approx 2{,}639$
  <!-- feedback: Incorrecto. Se multiplicó $2\cdot 7$ dentro del logaritmo; el $2$ multiplica a $x$ en el exponente, no al $7$. -->
- [ ] B) $x = \frac{7}{2}$
  <!-- feedback: Incorrecto. Se dividió $7$ por $2$ sin tomar logaritmo; con $x = 3{,}5$ resulta $e^{7} \approx 1097$. -->
- [x] C) $x = \frac{\ln 7}{2} \approx 0{,}973$
  <!-- feedback: Correcto. Aplicando $\ln$: $2x = \ln 7$, y dividiendo por $2$ queda $x = \frac{\ln 7}{2} \approx 0{,}973$. -->
- [ ] D) $x = 2\ln 7 \approx 3{,}892$
  <!-- feedback: Incorrecto. Se multiplicó por $2$ en lugar de dividir al despejar $2x = \ln 7$. -->

### Explicacion Pedagogica
Como $\ln$ es la inversa de $e^t$, aplicamos $\ln$ a ambos lados: $\ln e^{2x} = \ln 7$, de modo que $2x = \ln 7 \approx 1{,}946$. Entonces $x \approx 0{,}973$ horas, unos $58$ minutos.

## Question 9 [D5-D6]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v9
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.68
**Contexto:** En un ejercicio de una olimpíada matemática en Jujuy se plantea la ecuación $\log_2(x + 1) - \log_2(x - 1) = 2$.

### Enunciado
¿Cuál es la solución de $\log_2(x + 1) - \log_2(x - 1) = 2$?

### Opciones
- [x] A) $x = \frac{5}{3}$
  <!-- feedback: Correcto. De $\frac{x + 1}{x - 1} = 2^2 = 4$ sale $x + 1 = 4x - 4$, o sea, $x = \frac{5}{3}$, que cumple $x > 1$. -->
- [ ] B) No tiene solución
  <!-- feedback: Incorrecto. Se restaron los argumentos, $(x + 1) - (x - 1) = 2$, y se llegó a $\log_2 2 = 1 \ne 2$; la resta de logaritmos es el logaritmo del cociente. -->
- [ ] C) $x = 3$
  <!-- feedback: Incorrecto. Se igualó el cociente a $2$ en lugar de a $2^2 = 4$: el logaritmo $2$ indica el exponente. -->
- [ ] D) $x = -\frac{5}{3}$
  <!-- feedback: Incorrecto. Error de signo al despejar; además ese valor da $x - 1 < 0$ y queda fuera del dominio. -->

### Explicacion Pedagogica
Dominio: $x + 1 > 0$ y $x - 1 > 0$, es decir, $x > 1$. Por la propiedad del cociente: $\log_2\frac{x + 1}{x - 1} = 2$, así que $\frac{x + 1}{x - 1} = 4$. Despejando: $x + 1 = 4x - 4$, $3x = 5$, $x = \frac{5}{3}$, que pertenece al dominio.

## Question 10 [D5-D6]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v10
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.66
**Contexto:** Un equipo de arqueología del CONICET encuentra en Catamarca restos que conservan el $30\,\%$ del carbono-14 original; la vida media del carbono-14 es de $5730$ años.

### Enunciado
¿Cuál es la antigüedad aproximada de los restos?

### Opciones
- [ ] A) Unos $1719$ años
  <!-- feedback: Incorrecto. Se multiplicó $5730\cdot 0{,}3$, como si la desintegración fuera proporcional; hay que resolver una ecuación exponencial. -->
- [ ] B) Unos $4011$ años
  <!-- feedback: Incorrecto. Se multiplicó $5730\cdot 0{,}7$, una relación lineal; además, con menos de una vida media quedaría más del $50\,\%$. -->
- [ ] C) Unos $2949$ años
  <!-- feedback: Incorrecto. Se usó $0{,}7$ en lugar de $0{,}3$: se planteó lo que se perdió y no lo que se conserva. -->
- [x] D) Unos $9953$ años
  <!-- feedback: Correcto. De $\left(\frac{1}{2}\right)^{t/5730} = 0{,}3$ sale $t = 5730\cdot\frac{\ln 0{,}3}{\ln 0{,}5} \approx 9953$ años. -->

### Explicacion Pedagogica
El modelo es $Q = Q_0\left(\frac{1}{2}\right)^{t/5730}$. Con $\frac{Q}{Q_0} = 0{,}3$: $\frac{t}{5730}\ln 0{,}5 = \ln 0{,}3$, así que $t = 5730\cdot\frac{\ln 0{,}3}{\ln 0{,}5} \approx 5730\cdot 1{,}737 \approx 9953$ años. Es razonable: quedan menos del $50\,\%$ (más de una vida media) y más del $25\,\%$ (menos de dos).

## Question 11 [D7-D8]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v11
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.63
**Contexto:** Al estudiar el crecimiento de dos colonias de bacterias en un laboratorio de La Plata se llega a $9^x - 3^{x+1} - 54 = 0$.

### Enunciado
¿Cuál es el análisis correcto de la ecuación $9^x - 3^{x+1} - 54 = 0$?

### Opciones
- [ ] A) Tiene dos soluciones: $x = 2$ y $x = \log_3(-6)$
  <!-- feedback: Incorrecto. El logaritmo de un número negativo no existe: ninguna potencia de $3$ da $-6$. -->
- [ ] B) Sus soluciones son $x = 9$ y $x = -6$
  <!-- feedback: Incorrecto. Esos son los valores de $u = 3^x$; faltó volver a la variable $x$ y descartar $u < 0$. -->
- [ ] C) No tiene solución, porque una de las raíces es negativa
  <!-- feedback: Incorrecto. Que una raíz en $u$ sea negativa no anula la otra: $u = 9$ da $x = 2$, y $81 - 27 - 54 = 0$. -->
- [x] D) Tiene una única solución, $x = 2$, porque $3^x = -6$ es imposible
  <!-- feedback: Correcto. Con $u = 3^x$: $u^2 - 3u - 54 = 0$, con raíces $u = 9$ y $u = -6$; como $3^x > 0$, solo vale $3^x = 9$, es decir, $x = 2$. -->

### Explicacion Pedagogica
Reescribimos $9^x = (3^x)^2$ y $3^{x+1} = 3\cdot 3^x$. Con $u = 3^x > 0$: $u^2 - 3u - 54 = 0$, es decir, $(u - 9)(u + 6) = 0$. Se descarta $u = -6$ porque una exponencial es siempre positiva; $3^x = 9$ da $x = 2$.

## Question 12 [D7-D8]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v12
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.61
**Contexto:** Un alumno de Río Cuarto resuelve $2\log x = \log(x + 6)$: pasa a $x^2 = x + 6$, obtiene $x = 3$ y $x = -2$, y da ambas como respuesta.

### Enunciado
¿Cuál es la evaluación correcta de su respuesta?

### Opciones
- [ ] A) Ambas son soluciones, porque $(-2)^2 = 4 > 0$
  <!-- feedback: Incorrecto. Se verificó en $\log(x^2)$, pero la ecuación original tiene $2\log x$, que exige $x > 0$. -->
- [x] B) Solo $x = 3$ es solución: con $x = -2$ aparece $\log(-2)$ en la ecuación original
  <!-- feedback: Correcto. La ecuación original exige $x > 0$ y $x + 6 > 0$; la raíz $-2$ surge al pasar a $x^2$, que amplía el dominio. -->
- [ ] C) Solo $x = -2$ es solución
  <!-- feedback: Incorrecto. Para $x = 3$: $2\log 3 = \log 9 = \log(3 + 6)$, así que $3$ sí es solución; y $-2$ no está en el dominio. -->
- [ ] D) Ninguna es solución, porque la ecuación es absurda
  <!-- feedback: Incorrecto. La ecuación tiene solución: $x = 3$ verifica $\log 9 = \log 9$. -->

### Explicacion Pedagogica
Al aplicar $2\log x = \log x^2$ el dominio pasa de $x > 0$ a $x \ne 0$, y pueden aparecer soluciones extrañas. Por eso siempre se verifica en la ecuación original: $x = 3$ funciona, $x = -2$ no, porque $\log(-2)$ no está definido. Solución: $\{3\}$.

## Question 13 [D7-D8]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v13
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.59
**Contexto:** Según un modelo del municipio, en la provincia de Buenos Aires el pueblo A tiene $20\,000$ habitantes y crece al $5\,\%$ anual, mientras que el pueblo B tiene $30\,000$ y crece al $2\,\%$ anual.

### Enunciado
¿En cuántos años, aproximadamente, tendrán la misma población?

### Opciones
- [ ] A) En unos $25$ años
  <!-- feedback: Incorrecto. Se usó crecimiento lineal ($1000$ y $600$ habitantes por año); el enunciado describe crecimiento porcentual compuesto. -->
- [x] B) En unos $14$ años
  <!-- feedback: Correcto. De $20\,000\cdot 1{,}05^t = 30\,000\cdot 1{,}02^t$ sale $\left(\frac{1{,}05}{1{,}02}\right)^t = 1{,}5$ y $t = \frac{\ln 1{,}5}{\ln(1{,}05/1{,}02)} \approx 13{,}99$. -->
- [ ] C) En unos $8{,}3$ años
  <!-- feedback: Incorrecto. Se ignoró que B también crece: $\frac{\ln 1{,}5}{\ln 1{,}05} \approx 8{,}3$ es el tiempo para que A llegue a $30\,000$. -->
- [ ] D) En unos $50$ años
  <!-- feedback: Incorrecto. Se dividió $1{,}5$ por la diferencia de tasas $0{,}03$; hay que igualar los dos modelos y tomar logaritmos. -->

### Explicacion Pedagogica
Igualamos: $20\,000\cdot 1{,}05^t = 30\,000\cdot 1{,}02^t$. Dividiendo, $\left(\frac{1{,}05}{1{,}02}\right)^t = 1{,}5$. Tomando logaritmos: $t = \frac{\ln 1{,}5}{\ln 1{,}0294} \approx \frac{0{,}4055}{0{,}0290} \approx 14$ años. Control: $20\,000\cdot 1{,}05^{14} \approx 39\,599$ y $30\,000\cdot 1{,}02^{14} \approx 39\,584$.

## Question 14 [D7-D8]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v14
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.57
**Contexto:** En una competencia de matemática en Resistencia se pregunta cuántas soluciones tiene $\log_2 x = 3 - x$ sin resolverla algebraicamente.

### Enunciado
¿Cuántas soluciones reales tiene $\log_2 x = 3 - x$?

### Opciones
- [x] A) Exactamente una, $x = 2$, porque un miembro es creciente y el otro decreciente
  <!-- feedback: Correcto. El gráfico de $\log_2 x$ (creciente) y el de $3 - x$ (decreciente) se cortan a lo sumo una vez, y en $x = 2$: $\log_2 2 = 1 = 3 - 2$. -->
- [ ] B) Dos soluciones, como en una ecuación cuadrática
  <!-- feedback: Incorrecto. No es cuadrática: una función creciente y una decreciente no pueden cortarse dos veces. -->
- [ ] C) Ninguna, porque no se puede despejar $x$
  <!-- feedback: Incorrecto. Que no haya despeje algebraico no impide la solución: $x = 2$ verifica la igualdad. -->
- [ ] D) Infinitas, porque ambos miembros toman todos los valores reales
  <!-- feedback: Incorrecto. Que dos funciones tengan la misma imagen no significa que coincidan en infinitos puntos; aquí solo coinciden en $x = 2$. -->

### Explicacion Pedagogica
Sea $h(x) = \log_2 x - (3 - x)$, definida para $x > 0$. Es suma de dos funciones crecientes, así que es estrictamente creciente y tiene a lo sumo un cero. Como $h(2) = 1 - 1 = 0$, la única solución es $x = 2$.

## Question 15 [D7-D8]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v15
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.55
**Contexto:** Un economista de Córdoba compara un índice que crece como $3^x$ con otro que crece como $2^{x+1}$ y busca el valor de $x$ en que se igualan.

### Enunciado
¿Cuál es la solución de $3^x = 2^{x+1}$?

### Opciones
- [ ] A) $x = \frac{\ln 2}{\ln 3 + \ln 2} \approx 0{,}39$
  <!-- feedback: Incorrecto. Error de signo al agrupar: al pasar $x\ln 2$ al primer miembro se resta, no se suma. -->
- [ ] B) $x = \frac{\ln 2}{\ln 3} \approx 0{,}63$
  <!-- feedback: Incorrecto. Se olvidó el término $x\ln 2$ que aparece al distribuir $(x + 1)\ln 2$. -->
- [x] C) $x = \frac{\ln 2}{\ln 3 - \ln 2} \approx 1{,}71$
  <!-- feedback: Correcto. Con logaritmos: $x\ln 3 = (x + 1)\ln 2$, así que $x(\ln 3 - \ln 2) = \ln 2$. -->
- [ ] D) $x = \frac{\ln 3}{\ln 3 - \ln 2} \approx 2{,}71$
  <!-- feedback: Incorrecto. El numerador debe ser $\ln 2$, el término sin $x$; con $\ln 3$ no se cumple $3^x = 2^{x+1}$. -->

### Explicacion Pedagogica
Tomamos $\ln$: $x\ln 3 = (x + 1)\ln 2 = x\ln 2 + \ln 2$. Agrupamos: $x(\ln 3 - \ln 2) = \ln 2$, y $x = \frac{\ln 2}{\ln 1{,}5} \approx \frac{0{,}693}{0{,}405} \approx 1{,}71$. Control: $3^{1{,}71} \approx 6{,}54 \approx 2^{2{,}71}$.

## Question 16 [D7-D8]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v16
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.53
**Contexto:** En un hospital de Rosario la concentración de un medicamento en sangre es $C(t) = 50\,e^{-0{,}2t}$ mg/L, con $t$ en horas, y se repite la dosis cuando baja a $10$ mg/L.

### Enunciado
¿Después de cuánto tiempo, aproximadamente, la concentración baja a $10$ mg/L?

### Opciones
- [x] A) $8{,}05$ horas
  <!-- feedback: Correcto. De $e^{-0{,}2t} = \frac{10}{50} = 0{,}2$ sale $-0{,}2t = \ln 0{,}2$, es decir, $t = \frac{\ln 5}{0{,}2} \approx 8{,}05$. -->
- [ ] B) $0{,}32$ horas
  <!-- feedback: Incorrecto. Se multiplicó $\ln 5$ por $0{,}2$ en lugar de dividir al despejar $t$. -->
- [ ] C) $11{,}51$ horas
  <!-- feedback: Incorrecto. Se usó $\ln 10$; el cociente que hay que despejar es $\frac{50}{10} = 5$, no el $10$ final. -->
- [ ] D) $-8{,}05$ horas
  <!-- feedback: Incorrecto. Se perdió un signo: como $\ln 0{,}2 < 0$ y se divide por $-0{,}2$, el tiempo resulta positivo. -->

### Explicacion Pedagogica
Planteamos $50e^{-0{,}2t} = 10$, así que $e^{-0{,}2t} = 0{,}2$. Aplicando $\ln$: $-0{,}2t = \ln 0{,}2 = -\ln 5$, y $t = \frac{\ln 5}{0{,}2} \approx \frac{1{,}609}{0{,}2} \approx 8{,}05$ horas. Control: $50e^{-1{,}61} \approx 10$.

## Question 17 [D9-D10]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.50
**Contexto:** Para resolver $2^x + 2^x = 2^5$ en una clase de Ushuaia, Ana escribe $2^{2x} = 2^5$ y obtiene $x = \frac{5}{2}$; Bruno escribe $2\cdot 2^x = 2^{x+1} = 2^5$ y obtiene $x = 4$.

### Enunciado
¿Quién resolvió correctamente?

### Opciones
- [ ] A) Ana, porque al sumar potencias de igual base se suman los exponentes
  <!-- feedback: Incorrecto. Los exponentes se suman al multiplicar potencias, no al sumarlas: $2^x\cdot 2^x = 2^{2x}$, pero $2^x + 2^x = 2^{x+1}$. -->
- [x] B) Bruno, porque $2^x + 2^x = 2\cdot 2^x = 2^{x+1}$
  <!-- feedback: Correcto. Sumar dos términos iguales es multiplicar por $2$, y $2\cdot 2^x = 2^{x+1}$; con $x = 4$: $16 + 16 = 32 = 2^5$. -->
- [ ] C) Los dos, porque llegan a ecuaciones equivalentes
  <!-- feedback: Incorrecto. No son equivalentes: con $x = \frac{5}{2}$, $2^{2{,}5} + 2^{2{,}5} \approx 11{,}3 \ne 32$. -->
- [ ] D) Ninguno: la solución es $x = 5$
  <!-- feedback: Incorrecto. Con $x = 5$ queda $32 + 32 = 64 \ne 32$; se olvidó que hay dos términos. -->

### Explicacion Pedagogica
Hay que distinguir suma y producto de potencias. $2^x + 2^x = 2\cdot 2^x = 2^{1 + x}$, mientras que $2^x\cdot 2^x = 2^{2x}$. La ecuación queda $2^{x+1} = 2^5$, así que $x + 1 = 5$ y $x = 4$. Verificación: $2^4 + 2^4 = 32$.

## Question 18 [D9-D10]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.48
**Contexto:** Una estudiante de Mendoza invierte 500.000 pesos al $2{,}5\,\%$ mensual capitalizable y quiere llegar a 800.000 pesos; calcula $t = \frac{\ln 1{,}6}{\ln 1{,}025} \approx 19{,}03$ y concluye que le alcanza con $19$ meses.

### Enunciado
¿Cuál es la evaluación correcta de su conclusión?

### Opciones
- [ ] A) Es correcta: $19{,}03$ se redondea a $19$
  <!-- feedback: Incorrecto. Redondear hacia abajo deja el monto por debajo de la meta: $500\,000\cdot 1{,}025^{19} \approx 799\,325 < 800\,000$. -->
- [x] B) No alcanza: a los $19$ meses tiene unos 799.325 pesos; recién en el mes $20$ supera los 800.000
  <!-- feedback: Correcto. Como $t \approx 19{,}03 > 19$, hay que redondear hacia arriba: $500\,000\cdot 1{,}025^{20} \approx 819\,308$. -->
- [ ] C) No alcanza: necesita $24$ meses
  <!-- feedback: Incorrecto. Ese resultado viene del interés simple, $\frac{0{,}6}{0{,}025} = 24$; con capitalización se llega antes. -->
- [ ] D) No alcanza: necesita $9$ meses
  <!-- feedback: Incorrecto. Se calculó $\frac{\log 1{,}6}{0{,}025} \approx 8{,}2$, dividiendo por la tasa y no por $\log 1{,}025$. -->

### Explicacion Pedagogica
Resolvemos $500\,000\cdot 1{,}025^t = 800\,000$: $1{,}025^t = 1{,}6$ y $t = \frac{\ln 1{,}6}{\ln 1{,}025} \approx 19{,}03$. Como los intereses se acreditan por mes entero, en el mes $19$ el saldo es $\approx 799\,325$ y no llega; en el mes $20$ es $\approx 819\,308$. En problemas de tiempo para alcanzar una meta se redondea hacia arriba.

## Question 19 [D9-D10]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.47
**Contexto:** En una evaluación de un colegio de Bahía Blanca, un alumno resuelve $\log(x + 3) = \log x + \log 3$ escribiendo $x + 3 = x + 3$ y concluye que vale para todo $x > 0$.

### Enunciado
¿Cuál es la evaluación correcta?

### Opciones
- [ ] A) Es correcta: la igualdad vale para todo $x > 0$
  <!-- feedback: Incorrecto. Con $x = 1$: $\log 4 \approx 0{,}60$ y $\log 1 + \log 3 \approx 0{,}48$; no coinciden. -->
- [ ] B) Es incorrecta: la ecuación no tiene solución
  <!-- feedback: Incorrecto. Sí tiene: con $x = \frac{3}{2}$, $\log 4{,}5 = \log 1{,}5 + \log 3$, porque $1{,}5\cdot 3 = 4{,}5$. -->
- [x] C) Es incorrecta: $\log x + \log 3 = \log(3x)$, así que $x + 3 = 3x$ y $x = \frac{3}{2}$
  <!-- feedback: Correcto. La suma de logaritmos es el logaritmo del producto; resolviendo, $2x = 3$, y $x = \frac{3}{2}$ cumple $x > 0$. -->
- [ ] D) Es incorrecta: la solución es $x = 3$
  <!-- feedback: Incorrecto. Con $x = 3$: $\log 6 \ne \log 9 = \log 3 + \log 3$; se igualó mal el producto. -->

### Explicacion Pedagogica
El alumno usó una propiedad falsa, $\log x + \log 3 = \log(x + 3)$. La correcta es $\log x + \log 3 = \log(3x)$. Entonces $\log(x + 3) = \log(3x)$, y como $\log$ es inyectiva, $x + 3 = 3x$, de donde $x = \frac{3}{2}$.

## Question 20 [D9-D10]
**ID:** AR-MAT-11-2026-W15-ecuaciones-exponenciales-logaritmicas-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.45
**Contexto:** En una clase de Santiago del Estero, una alumna resuelve $\log_2(x^2) = 4$ escribiendo $2\log_2 x = 4$ y responde $x = 4$ como única solución.

### Enunciado
¿Cuál es la evaluación correcta de su resolución?

### Opciones
- [ ] A) Es correcta: la única solución es $x = 4$
  <!-- feedback: Incorrecto. Para $x = -4$: $\log_2 16 = 4$, así que $-4$ también cumple la ecuación original. -->
- [x] B) Le falta $x = -4$: $\log_2(x^2)$ está definido para $x \ne 0$, y $(-4)^2 = 16 = 2^4$
  <!-- feedback: Correcto. Al pasar a $2\log_2 x$ se restringió el dominio a $x > 0$; de $x^2 = 16$ salen $x = 4$ y $x = -4$, ambas válidas. -->
- [ ] C) Las soluciones son $\pm 4$, pero $-4$ se descarta por el dominio
  <!-- feedback: Incorrecto. El argumento es $x^2 = 16 > 0$, de modo que $x = -4$ está en el dominio de $\log_2(x^2)$. -->
- [ ] D) Las soluciones son $2$ y $-2$
  <!-- feedback: Incorrecto. Se resolvió $x^2 = 4$; el logaritmo dice $x^2 = 2^4 = 16$. -->

### Explicacion Pedagogica
La ecuación $\log_2(x^2) = 4$ equivale a $x^2 = 2^4 = 16$, con dominio $x \ne 0$, y da $x = 4$ y $x = -4$. Usar $\log_2(x^2) = 2\log_2 x$ solo es válido para $x > 0$, y por eso se perdió una solución. Lo correcto es $\log_2(x^2) = 2\log_2|x|$.
