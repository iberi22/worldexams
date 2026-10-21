---
id: "AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle"
country: "argentina"
grado: 11
asignatura: "matematica"
tema: "sucesiones-aritmeticas-geometricas"
periodo: "weekly"
week: "W16"
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

# Bundle MASTERY: Sucesiones Aritméticas y Geométricas - Grado 11

Bundle sobre sucesiones aritméticas y geométricas: término general, sumas parciales, identificación del tipo, series geométricas infinitas y situaciones de ahorro, préstamos e inflación en pesos.

## Question 1 [D3-D4]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v1
**Bloom:** Remember
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.85
**Contexto:** En una campaña solidaria de un colegio de Rosario, cada día se juntan alimentos: $5$, $15$, $45$ y $135$ paquetes en los cuatro primeros días.

### Enunciado
¿Qué tipo de sucesión forman $5, 15, 45, 135, \ldots$?

### Opciones
- [ ] A) Aritmética de diferencia $10$
  <!-- feedback: Incorrecto. Solo la primera diferencia es $10$; las siguientes son $30$ y $90$, así que no hay diferencia constante. -->
- [x] B) Geométrica de razón $3$
  <!-- feedback: Correcto. Cada término es el anterior multiplicado por $3$: $\frac{15}{5} = \frac{45}{15} = \frac{135}{45} = 3$. -->
- [ ] C) Geométrica de razón $10$
  <!-- feedback: Incorrecto. Se tomó la primera diferencia como razón; la razón es el cociente $\frac{15}{5} = 3$. -->
- [ ] D) Aritmética de diferencia $3$
  <!-- feedback: Incorrecto. El $3$ es un factor multiplicativo, no una cantidad que se suma: $5 + 3 = 8 \ne 15$. -->

### Explicacion Pedagogica
Para clasificar una sucesión se comparan diferencias y cocientes entre términos consecutivos. Las diferencias ($10$, $30$, $90$) no son constantes, pero los cocientes sí: todos valen $3$. Es geométrica con $a_1 = 5$ y $r = 3$, y su término general es $a_n = 5\cdot 3^{n-1}$.

## Question 2 [D3-D4]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v2
**Bloom:** Understand
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.83
**Contexto:** En una pileta municipal de Córdoba se registra la cantidad de socios por semana: $7$, $11$, $15$, $19$, y el patrón se mantiene.

### Enunciado
¿Cuál es el término general de la sucesión $7, 11, 15, 19, \ldots$?

### Opciones
- [ ] A) $a_n = 7 + 4n$
  <!-- feedback: Incorrecto. Con esa fórmula $a_1 = 11$; en el término general aritmético se suma $(n - 1)d$, no $nd$. -->
- [x] B) $a_n = 4n + 3$
  <!-- feedback: Correcto. Es aritmética con $a_1 = 7$ y $d = 4$: $a_n = 7 + 4(n - 1) = 4n + 3$; por ejemplo, $a_1 = 7$ y $a_4 = 19$. -->
- [ ] C) $a_n = 7\cdot 4^{n-1}$
  <!-- feedback: Incorrecto. Esa fórmula es geométrica y da $7, 28, 112$; aquí se suma $4$ en cada paso, no se multiplica. -->
- [ ] D) $a_n = 3n + 4$
  <!-- feedback: Incorrecto. Se intercambiaron coeficientes: da $7, 10, 13$, con diferencia $3$ en lugar de $4$. -->

### Explicacion Pedagogica
Las diferencias son constantes: $11 - 7 = 15 - 11 = 19 - 15 = 4$, así que es aritmética con $d = 4$. Usamos $a_n = a_1 + (n - 1)d = 7 + 4(n - 1) = 4n + 3$. Verificación: $a_3 = 4\cdot 3 + 3 = 15$.

## Question 3 [D3-D4]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v3
**Bloom:** Remember
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.81
**Contexto:** Una cadena de mensajes en un grupo de estudiantes de Salta empieza con $2$ personas, y cada día el número de personas que la reenvían se triplica.

### Enunciado
En la sucesión geométrica con $a_1 = 2$ y $r = 3$, ¿cuánto vale $a_5$?

### Opciones
- [x] A) $162$
  <!-- feedback: Correcto. Por la fórmula $a_n = a_1 r^{n-1}$: $a_5 = 2\cdot 3^4 = 2\cdot 81 = 162$. -->
- [ ] B) $486$
  <!-- feedback: Incorrecto. Se usó el exponente $5$: $2\cdot 3^5$; del primer al quinto término hay $4$ multiplicaciones. -->
- [ ] C) $14$
  <!-- feedback: Incorrecto. Se trató como aritmética: $2 + 4\cdot 3$; en una geométrica se multiplica por la razón. -->
- [ ] D) $30$
  <!-- feedback: Incorrecto. Se calculó $2\cdot 3\cdot 5$; la razón se eleva al exponente $n - 1$, no se multiplica por $n$. -->

### Explicacion Pedagogica
En una sucesión geométrica $a_n = a_1\cdot r^{n-1}$. Los términos son $2, 6, 18, 54, 162$: para llegar al quinto se multiplica $4$ veces por $3$, así que $a_5 = 2\cdot 3^4 = 162$.

## Question 4 [D3-D4]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v4
**Bloom:** Understand
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.79
**Contexto:** Un tanque de agua de una escuela rural de Chaco tiene $12$ cm de nivel sobre una marca y cada hora baja $3$ cm; el primer registro es la hora $1$.

### Enunciado
En la sucesión aritmética con $a_1 = 12$ y $d = -3$, ¿cuánto vale $a_{10}$?

### Opciones
- [ ] A) $-18$
  <!-- feedback: Incorrecto. Se usó $10d$ en lugar de $9d$: $12 - 30$; del término $1$ al $10$ hay $9$ saltos. -->
- [ ] B) $39$
  <!-- feedback: Incorrecto. Se sumó $27$ en lugar de restarlo: la diferencia es negativa, así que la sucesión decrece. -->
- [ ] C) $15$
  <!-- feedback: Incorrecto. El cálculo $12 - 27$ da $-15$; se perdió el signo del resultado. -->
- [x] D) $-15$
  <!-- feedback: Correcto. Con $a_{10} = 12 + 9\cdot(-3) = 12 - 27 = -15$. -->

### Explicacion Pedagogica
La fórmula es $a_n = a_1 + (n - 1)d$. Con $a_1 = 12$, $d = -3$ y $n = 10$: $a_{10} = 12 + 9\cdot(-3) = -15$. El nivel quedó $15$ cm por debajo de la marca: $12, 9, 6, 3, 0, -3, \ldots, -15$.

## Question 5 [D5-D6]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v5
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.76
**Contexto:** Lucía, de Mendoza, ahorra 1.000 pesos el primer mes y cada mes agrega 500 pesos más que el mes anterior.

### Enunciado
¿Cuánto habrá ahorrado en total al cabo de $12$ meses?

### Opciones
- [ ] A) 6.500 pesos
  <!-- feedback: Incorrecto. Ese es el ahorro del mes $12$, $a_{12} = 1000 + 11\cdot 500$, no el total acumulado. -->
- [x] B) 45.000 pesos
  <!-- feedback: Correcto. Es una suma aritmética: $S_{12} = \frac{12}{2}(2\cdot 1000 + 11\cdot 500) = 6\cdot 7500 = 45\,000$. -->
- [ ] C) 48.000 pesos
  <!-- feedback: Incorrecto. Se usó $12\cdot 500$ en lugar de $11\cdot 500$: el último término es $a_{12} = a_1 + 11d$. -->
- [ ] D) 12.000 pesos
  <!-- feedback: Incorrecto. Se multiplicó $12\cdot 1000$ ignorando que cada mes ahorra $500$ pesos más. -->

### Explicacion Pedagogica
Los ahorros mensuales forman una sucesión aritmética con $a_1 = 1000$ y $d = 500$. El último término es $a_{12} = 1000 + 11\cdot 500 = 6500$. La suma es $S_{12} = \frac{12(a_1 + a_{12})}{2} = 6\cdot 7500 = 45\,000$ pesos.

## Question 6 [D5-D6]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v6
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.74
**Contexto:** En una campaña de vacunación en Tucumán, $3$ promotores capacitan cada uno a $3$ personas nuevas, que a su vez capacitan a otras $3$, durante $5$ niveles.

### Enunciado
Si en el primer nivel hay $3$ personas, en el segundo $9$, y así sucesivamente, ¿cuántas personas hay en total en los $5$ niveles?

### Opciones
- [ ] A) $243$
  <!-- feedback: Incorrecto. Esa es la cantidad del quinto nivel, $3^5$; se pide el total de los cinco niveles. -->
- [ ] B) $15$
  <!-- feedback: Incorrecto. Se calculó $3\cdot 5$, como si cada nivel tuviera $3$ personas; la cantidad se triplica en cada nivel. -->
- [ ] C) $729$
  <!-- feedback: Incorrecto. Ese es $3^6$, que no corresponde a ningún nivel ni a la suma; la suma geométrica es $\frac{a_1(r^n - 1)}{r - 1}$. -->
- [x] D) $363$
  <!-- feedback: Correcto. Con $S_5 = \frac{3(3^5 - 1)}{3 - 1} = \frac{3\cdot 242}{2} = 363$, que es $3 + 9 + 27 + 81 + 243$. -->

### Explicacion Pedagogica
Los niveles forman una sucesión geométrica con $a_1 = 3$ y $r = 3$. La suma de los $5$ primeros términos es $S_5 = a_1\frac{r^5 - 1}{r - 1} = 3\cdot\frac{242}{2} = 363$. Se puede comprobar sumando: $3 + 9 + 27 + 81 + 243 = 363$.

## Question 7 [D5-D6]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v7
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.72
**Contexto:** En el gimnasio de un colegio de Bariloche se deja caer una pelota desde $2$ m de altura; en cada rebote sube el $60\,\%$ de la altura anterior.

### Enunciado
Si rebota indefinidamente, ¿qué distancia vertical total recorre la pelota?

### Opciones
- [ ] A) $5$ m
  <!-- feedback: Incorrecto. Ese es $\frac{2}{1 - 0{,}6}$, que solo cuenta las bajadas; después de cada rebote la pelota también sube. -->
- [ ] B) $3{,}2$ m
  <!-- feedback: Incorrecto. Se sumaron solo la caída inicial y el primer rebote, $2 + 1{,}2$; hay infinitos rebotes. -->
- [ ] C) $6$ m
  <!-- feedback: Incorrecto. Se contaron las subidas y bajadas de los rebotes, $2\cdot 3$, pero se olvidó la caída inicial de $2$ m. -->
- [x] D) $8$ m
  <!-- feedback: Correcto. Baja $2$ m y luego sube y baja en cada rebote: $2 + 2\cdot\frac{1{,}2}{1 - 0{,}6} = 2 + 2\cdot 3 = 8$ m. -->

### Explicacion Pedagogica
Alturas de los rebotes: $1{,}2$; $0{,}72$; $0{,}432$; $\ldots$, una serie geométrica con $a_1 = 1{,}2$ y $r = 0{,}6$, cuya suma es $\frac{1{,}2}{0{,}4} = 3$ m. Cada rebote se recorre dos veces (subida y bajada), y se agrega la caída inicial: $2 + 2\cdot 3 = 8$ m.

## Question 8 [D5-D6]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v8
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.70
**Contexto:** Un club de Paraná numera las butacas de su tribuna con la sucesión $4, 9, 14, 19, \ldots$ y quiere saber qué posición ocupa la butaca $249$.

### Enunciado
¿Qué número de término de la sucesión $4, 9, 14, \ldots$ es igual a $249$?

### Opciones
- [x] A) El término $50$
  <!-- feedback: Correcto. Con $a_n = 4 + 5(n - 1) = 249$ queda $5(n - 1) = 245$, es decir, $n - 1 = 49$ y $n = 50$. -->
- [ ] B) El término $49$
  <!-- feedback: Incorrecto. Se obtuvo $n - 1 = 49$ y faltó sumar $1$ para hallar $n$. -->
- [ ] C) El término $51$
  <!-- feedback: Incorrecto. Se sumó $1$ de más; con $n = 51$ resulta $a_{51} = 4 + 250 = 254$. -->
- [ ] D) El término $245$
  <!-- feedback: Incorrecto. Se restó $249 - 4$ sin dividir por la diferencia $5$; ese número es $(n - 1)d$, no $n$. -->

### Explicacion Pedagogica
La sucesión es aritmética con $a_1 = 4$ y $d = 5$, así que $a_n = 4 + 5(n - 1) = 5n - 1$. Planteamos $5n - 1 = 249$: $5n = 250$ y $n = 50$. Verificación: $a_{50} = 5\cdot 50 - 1 = 249$.

## Question 9 [D5-D6]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v9
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.68
**Contexto:** En un experimento de un laboratorio de San Luis, una población sigue una sucesión geométrica; se sabe que el segundo registro es $6$ y el quinto es $162$.

### Enunciado
Si $a_2 = 6$ y $a_5 = 162$ en una sucesión geométrica, ¿cuánto valen $a_1$ y $r$?

### Opciones
- [x] A) $a_1 = 2$ y $r = 3$
  <!-- feedback: Correcto. De $\frac{a_5}{a_2} = r^3 = \frac{162}{6} = 27$ sale $r = 3$, y $a_1 = \frac{a_2}{r} = 2$. -->
- [ ] B) $a_1 = 6$ y $r = 3$
  <!-- feedback: Incorrecto. Se tomó $a_2$ como primer término; con $a_1 = 6$ el segundo sería $18$. -->
- [ ] C) $a_1 = 2$ y $r = 52$
  <!-- feedback: Incorrecto. Se trató como aritmética: $\frac{162 - 6}{3} = 52$ es una diferencia, no una razón. -->
- [ ] D) $a_1 = -2$ y $r = -3$
  <!-- feedback: Incorrecto. Con esos valores $a_2 = 6$, pero $a_5 = -2\cdot(-3)^4 = -162$; $r^3 = 27$ solo tiene la raíz real $3$. -->

### Explicacion Pedagogica
Entre $a_2$ y $a_5$ hay $3$ multiplicaciones por $r$: $a_5 = a_2 r^3$. Entonces $r^3 = \frac{162}{6} = 27$ y $r = 3$. Retrocediendo un término: $a_1 = \frac{6}{3} = 2$. La sucesión es $2, 6, 18, 54, 162$.

## Question 10 [D5-D6]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v10
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.66
**Contexto:** Un comerciante de La Plata paga una deuda de 360.000 pesos en cuotas mensuales que forman una sucesión aritmética: 10.000 pesos la primera y 2.000 pesos más cada mes.

### Enunciado
¿En cuántos meses termina de pagar exactamente la deuda?

### Opciones
- [ ] A) $24$ meses
  <!-- feedback: Incorrecto. Las raíces de $n^2 + 9n - 360 = 0$ son $15$ y $-24$; se tomó el valor absoluto de la raíz negativa, que no tiene sentido. -->
- [ ] B) $36$ meses
  <!-- feedback: Incorrecto. Se dividió $360\,000 : 10\,000$, como si todas las cuotas fueran iguales; las cuotas aumentan $2000$ por mes. -->
- [x] C) $15$ meses
  <!-- feedback: Correcto. Con $S_n = \frac{n}{2}(20\,000 + 2000(n - 1)) = 1000n(n + 9) = 360\,000$ queda $n^2 + 9n - 360 = 0$, con raíz positiva $n = 15$. -->
- [ ] D) $180$ meses
  <!-- feedback: Incorrecto. Se dividió la deuda por el aumento mensual, $360\,000 : 2000$; hay que plantear la suma aritmética. -->

### Explicacion Pedagogica
Las cuotas son $a_1 = 10\,000$, $d = 2000$. La suma de $n$ cuotas es $S_n = \frac{n}{2}[2\cdot 10\,000 + (n - 1)2000] = 1000n(n + 9)$. Igualando a $360\,000$: $n^2 + 9n - 360 = 0$, que da $n = 15$ (se descarta $n = -24$). Control: la última cuota es $38\,000$ y $\frac{15(10\,000 + 38\,000)}{2} = 360\,000$.

## Question 11 [D7-D8]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v11
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.63
**Contexto:** En una clase de un colegio de Neuquén se analizan cuatro series infinitas para decidir cuál tiene suma finita.

### Enunciado
¿Cuál de las siguientes afirmaciones es correcta?

### Opciones
- [ ] A) $5 + 5 + 5 + \ldots$ converge a $5$
  <!-- feedback: Incorrecto. Sumar infinitas veces $5$ crece sin límite: tras $n$ términos la suma parcial es $5n$. -->
- [ ] B) $1 - 2 + 4 - 8 + \ldots$ converge a $\frac{1}{3}$
  <!-- feedback: Incorrecto. Se aplicó $\frac{a_1}{1 - r}$ con $r = -2$, pero esa fórmula solo vale si $|r| < 1$; las sumas parciales oscilan sin acotarse. -->
- [x] C) $8 + 4 + 2 + 1 + \ldots$ converge a $16$
  <!-- feedback: Correcto. Es geométrica con $a_1 = 8$ y $r = \frac{1}{2}$; como $|r| < 1$, su suma es $\frac{8}{1 - 1/2} = 16$. -->
- [ ] D) $1 + 1{,}1 + 1{,}21 + \ldots$ converge a $10$
  <!-- feedback: Incorrecto. Con $r = 1{,}1 > 1$ los términos crecen; la fórmula $\frac{1}{1 - 1{,}1} = -10$ no se aplica. -->

### Explicacion Pedagogica
Una serie geométrica $\sum a_1 r^{n-1}$ converge si y solo si $|r| < 1$, y entonces su suma es $\frac{a_1}{1 - r}$. En $8 + 4 + 2 + \ldots$, $r = \frac{1}{2}$ y la suma es $16$. Con $r = 1$, $r = -2$ o $r = 1{,}1$ la serie diverge.

## Question 12 [D7-D8]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v12
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.61
**Contexto:** Una estudiante de Santa Fe deposita 100.000 pesos al final de cada mes durante $12$ meses en una cuenta que capitaliza al $3\,\%$ mensual.

### Enunciado
¿Cuál es aproximadamente el saldo justo después del último depósito?

### Opciones
- [ ] A) 1.200.000 pesos
  <!-- feedback: Incorrecto. Se sumaron los $12$ depósitos sin intereses; cada depósito anterior al último sí gana intereses. -->
- [x] B) 1.419.203 pesos
  <!-- feedback: Correcto. Es una suma geométrica: $100\,000\cdot\frac{1{,}03^{12} - 1}{0{,}03} \approx 1\,419\,203$, porque cada depósito capitaliza durante distinta cantidad de meses. -->
- [ ] C) 1.710.913 pesos
  <!-- feedback: Incorrecto. Se capitalizó todo como si los 1.200.000 se hubieran depositado el primer día: $1\,200\,000\cdot 1{,}03^{12}$. -->
- [ ] D) 1.461.779 pesos
  <!-- feedback: Incorrecto. Ese valor multiplica por $1{,}03$ una vez más: corresponde a depósitos al inicio de cada mes, no al final. -->

### Explicacion Pedagogica
El último depósito no gana interés, el anterior gana un mes ($\cdot 1{,}03$), y el primero once meses ($\cdot 1{,}03^{11}$). El saldo es $100\,000(1 + 1{,}03 + \ldots + 1{,}03^{11}) = 100\,000\cdot\frac{1{,}03^{12} - 1}{0{,}03} \approx 1\,419\,203$ pesos.

## Question 13 [D7-D8]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v13
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.59
**Contexto:** En una sucesión aritmética que modela la cantidad de árboles plantados por semana en un vivero de Misiones, se sabe que $a_3 = 10$ y $a_7 = 22$.

### Enunciado
¿Cuál es la suma de los $10$ primeros términos, $S_{10}$?

### Opciones
- [ ] A) $310$
  <!-- feedback: Incorrecto. Se calculó $10\cdot a_{10}$, como si todos los términos valieran $31$; hay que promediar el primero y el último. -->
- [x] B) $175$
  <!-- feedback: Correcto. De $a_7 - a_3 = 4d = 12$ sale $d = 3$ y $a_1 = 4$; entonces $a_{10} = 31$ y $S_{10} = \frac{10(4 + 31)}{2} = 175$. -->
- [ ] C) $235$
  <!-- feedback: Incorrecto. Se tomó $a_1 = 10$, que es el tercer término; con $d = 3$ el primero es $10 - 2\cdot 3 = 4$. -->
- [ ] D) $350$
  <!-- feedback: Incorrecto. Se calculó $10(a_1 + a_{10})$ y se olvidó dividir por $2$ en la fórmula de la suma aritmética. -->

### Explicacion Pedagogica
Entre $a_3$ y $a_7$ hay $4$ diferencias: $4d = 22 - 10 = 12$, así que $d = 3$. Luego $a_1 = a_3 - 2d = 4$ y $a_{10} = 4 + 9\cdot 3 = 31$. La suma es $S_{10} = \frac{10(a_1 + a_{10})}{2} = 5\cdot 35 = 175$.

## Question 14 [D7-D8]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v14
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.57
**Contexto:** En un examen de un instituto de Río Gallegos se pide escribir como fracción el número periódico $0{,}363636\ldots$ usando series geométricas.

### Enunciado
¿Qué fracción es igual a $0{,}\overline{36}$?

### Opciones
- [ ] A) $\frac{9}{25}$
  <!-- feedback: Incorrecto. Esa fracción es $0{,}36$ exacto: se tomó solo el primer término y se ignoraron las infinitas repeticiones. -->
- [ ] B) $\frac{2}{5}$
  <!-- feedback: Incorrecto. Se usó razón $r = 0{,}1$; el período tiene dos cifras, así que cada bloque es $\frac{1}{100}$ del anterior. -->
- [x] C) $\frac{4}{11}$
  <!-- feedback: Correcto. Como serie geométrica, $0{,}36 + 0{,}0036 + \ldots = \frac{0{,}36}{1 - 0{,}01} = \frac{36}{99} = \frac{4}{11}$. -->
- [ ] D) $\frac{400}{11}$
  <!-- feedback: Incorrecto. Se tomó $a_1 = 36$ en lugar de $0{,}36$; esa fracción vale más de $36$, no menos de $1$. -->

### Explicacion Pedagogica
Escribimos $0{,}\overline{36} = 0{,}36 + 0{,}0036 + 0{,}000036 + \ldots$, serie geométrica con $a_1 = 0{,}36$ y $r = 0{,}01$. Como $|r| < 1$: $S = \frac{0{,}36}{0{,}99} = \frac{36}{99} = \frac{4}{11}$. Comprobación: $4 : 11 = 0{,}3636\ldots$

## Question 15 [D7-D8]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v15
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.55
**Contexto:** Una familia de Rosario gasta 100.000 pesos en alimentos el primer mes y, por la inflación, el gasto aumenta un $5\,\%$ cada mes respecto del anterior.

### Enunciado
¿Cuánto gastará aproximadamente en total durante los $12$ meses?

### Opciones
- [ ] A) 1.200.000 pesos
  <!-- feedback: Incorrecto. Se supuso un gasto constante de 100.000 pesos, ignorando el aumento mensual del $5\,\%$. -->
- [ ] B) 1.530.000 pesos
  <!-- feedback: Incorrecto. Se sumó un aumento fijo de 5.000 pesos por mes (modelo aritmético); el $5\,\%$ se aplica sobre el gasto ya aumentado. -->
- [ ] C) 171.034 pesos
  <!-- feedback: Incorrecto. Ese es el gasto del mes $12$, $100\,000\cdot 1{,}05^{11}$, no la suma de los doce meses. -->
- [x] D) 1.591.713 pesos
  <!-- feedback: Correcto. Los gastos forman una geométrica con $r = 1{,}05$: $S_{12} = 100\,000\cdot\frac{1{,}05^{12} - 1}{0{,}05} \approx 1\,591\,713$. -->

### Explicacion Pedagogica
El gasto del mes $k$ es $100\,000\cdot 1{,}05^{k-1}$, una sucesión geométrica. Su suma es $S_{12} = a_1\frac{r^{12} - 1}{r - 1} = 100\,000\cdot\frac{1{,}7959 - 1}{0{,}05} \approx 1\,591\,713$ pesos, más que los $1\,530\,000$ del modelo aritmético.

## Question 16 [D7-D8]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v16
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.53
**Contexto:** Un programa de una empresa de logística de Córdoba registra el total acumulado de envíos con la fórmula $S_n = n^2 + 2n$, donde $S_n$ es la suma de los $n$ primeros días.

### Enunciado
¿Cuál es el término general $a_n$ (envíos del día $n$) y qué tipo de sucesión es?

### Opciones
- [ ] A) $a_n = n^2 + 2n$; no es aritmética ni geométrica
  <!-- feedback: Incorrecto. Se confundió la suma acumulada $S_n$ con el término $a_n$; los envíos de un día son la diferencia entre sumas consecutivas. -->
- [ ] B) $a_n = 2n + 2$; es aritmética de diferencia $2$
  <!-- feedback: Incorrecto. Se derivó $S_n$ como si fuera continua; con $a_n = 2n + 2$ resultaría $a_1 = 4 \ne S_1 = 3$. -->
- [x] C) $a_n = 2n + 1$; es aritmética de diferencia $2$
  <!-- feedback: Correcto. Con $a_n = S_n - S_{n-1} = n^2 + 2n - [(n - 1)^2 + 2(n - 1)] = 2n + 1$, y además $a_1 = S_1 = 3$. -->
- [ ] D) $a_n = 2n - 1$; es aritmética de diferencia $2$
  <!-- feedback: Incorrecto. Error de signo al desarrollar $S_{n-1}$; con esa fórmula $a_1 = 1$, pero $S_1 = 3$. -->

### Explicacion Pedagogica
El término $n$ es lo que se agrega al pasar de $S_{n-1}$ a $S_n$: $a_n = S_n - S_{n-1}$. Desarrollando: $(n^2 + 2n) - (n^2 - 2n + 1 + 2n - 2) = 2n + 1$. Los términos son $3, 5, 7, \ldots$: aritmética con $d = 2$. Control: $3 + 5 = 8 = S_2$.

## Question 17 [D9-D10]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.50
**Contexto:** En un foro de matemática de estudiantes de Tandil, alguien afirma que la serie $3 - \frac{3}{2} + \frac{3}{4} - \frac{3}{8} + \ldots$ no puede tener suma finita porque sus signos alternan.

### Enunciado
¿Cuál es la evaluación correcta de esa afirmación?

### Opciones
- [x] A) Es falsa: es geométrica con $r = -\frac{1}{2}$, $|r| < 1$, y converge a $\frac{3}{1 + 1/2} = 2$
  <!-- feedback: Correcto. La convergencia depende de $|r|$, no del signo; $\frac{a_1}{1 - r} = \frac{3}{3/2} = 2$. -->
- [ ] B) Es verdadera: una serie con signos alternados nunca converge
  <!-- feedback: Incorrecto. Los signos alternados no impiden la convergencia; las sumas parciales $3;\ 1{,}5;\ 2{,}25;\ 1{,}875$ se acercan a $2$. -->
- [ ] C) Es falsa: converge a $6$
  <!-- feedback: Incorrecto. Se usó $r = \frac{1}{2}$ y no $-\frac{1}{2}$: $\frac{3}{1 - 1/2} = 6$ es la suma de la serie sin signos alternados. -->
- [ ] D) Es falsa: converge a $0$, porque los términos tienden a $0$
  <!-- feedback: Incorrecto. Que los términos tiendan a $0$ no significa que la suma sea $0$; la suma es el límite de las sumas parciales, $2$. -->

### Explicacion Pedagogica
El cociente entre términos consecutivos es $\frac{-3/2}{3} = -\frac{1}{2}$: es geométrica con $a_1 = 3$, $r = -\frac{1}{2}$. Como $|r| < 1$, converge a $\frac{a_1}{1 - r} = \frac{3}{1{,}5} = 2$. Las sumas parciales oscilan alrededor de $2$ acercándose cada vez más.

## Question 18 [D9-D10]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.48
**Contexto:** Una empresa de Córdoba ofrece a una ingeniera dos esquemas de sueldo para el primer año: A, 800.000 pesos el primer mes con aumento fijo de 40.000 pesos por mes; B, 800.000 pesos el primer mes con aumento del $4\,\%$ mensual.

### Enunciado
¿Qué esquema paga más en total durante los $12$ primeros meses?

### Opciones
- [ ] A) El B, porque un crecimiento porcentual siempre supera a uno fijo
  <!-- feedback: Incorrecto. A largo plazo el geométrico supera al aritmético, pero en $12$ meses todavía no: el aumento del B empieza en $32\,000$, menos que $40\,000$. -->
- [ ] B) El A: 14.880.000 pesos contra unos 12.020.644 pesos del B
  <!-- feedback: Incorrecto. Para A se multiplicó el sueldo del último mes, $1\,240\,000$, por $12$; la suma aritmética usa el promedio entre el primero y el último. -->
- [ ] C) Pagan lo mismo: 12.240.000 pesos cada uno
  <!-- feedback: Incorrecto. El esquema B no suma una cantidad fija; su total es una suma geométrica, unos $12\,020\,644$ pesos. -->
- [x] D) El A: 12.240.000 pesos contra unos 12.020.644 pesos del B
  <!-- feedback: Correcto. A es aritmético: $\frac{12}{2}(1\,600\,000 + 11\cdot 40\,000) = 12\,240\,000$; B es geométrico: $800\,000\cdot\frac{1{,}04^{12} - 1}{0{,}04} \approx 12\,020\,644$. -->

### Explicacion Pedagogica
Esquema A: $a_1 = 800\,000$, $d = 40\,000$, $a_{12} = 1\,240\,000$, total $\frac{12(800\,000 + 1\,240\,000)}{2} = 12\,240\,000$. Esquema B: $a_1 = 800\,000$, $r = 1{,}04$, total $800\,000\cdot\frac{1{,}04^{12} - 1}{0{,}04} \approx 12\,020\,644$. El primer año conviene A; con más tiempo, B terminaría superándolo.

## Question 19 [D9-D10]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.47
**Contexto:** En una clase de filosofía y matemática de un colegio de Buenos Aires se discute la paradoja de Zenón, y un alumno afirma que la suma de infinitos números positivos siempre es infinita.

### Enunciado
¿Cuál es la evaluación correcta de la afirmación?

### Opciones
- [ ] A) Es verdadera: si se suman infinitos positivos, el resultado crece sin límite
  <!-- feedback: Incorrecto. Las sumas parciales de $\frac{1}{2} + \frac{1}{4} + \ldots$ son $1 - \frac{1}{2^n}$, siempre menores que $1$. -->
- [ ] B) Es falsa: $1 + \frac{1}{2} + \frac{1}{3} + \ldots$ tiene suma finita
  <!-- feedback: Incorrecto. El contraejemplo no sirve: la serie armónica diverge aunque sus términos tiendan a $0$. -->
- [x] C) Es falsa: $\frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \ldots = 1$
  <!-- feedback: Correcto. Es una serie geométrica con $r = \frac{1}{2}$ y suma $\frac{1/2}{1 - 1/2} = 1$: infinitos términos positivos con suma finita. -->
- [ ] D) Es verdadera, salvo que algunos términos sean negativos
  <!-- feedback: Incorrecto. No hacen falta términos negativos para obtener suma finita, como muestra $\sum \left(\frac{1}{2}\right)^n = 1$. -->

### Explicacion Pedagogica
Una serie de términos positivos puede converger si sus términos decrecen lo suficientemente rápido. La serie geométrica $\frac{1}{2} + \frac{1}{4} + \ldots$ tiene sumas parciales $1 - \frac{1}{2^n}$, que tienden a $1$. En cambio, la armónica diverge: que los términos tiendan a $0$ es necesario pero no suficiente.

## Question 20 [D9-D10]
**ID:** AR-MAT-11-2026-W16-sucesiones-aritmeticas-geometricas-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.45
**Contexto:** Un comerciante de San Juan debe 1.000.000 de pesos; la deuda crece un $5\,\%$ mensual y él paga 80.000 pesos al final de cada mes.

### Enunciado
¿Cuál es la evaluación correcta sobre si la deuda se cancela?

### Opciones
- [x] A) Se cancela: el saldo es $1\,600\,000 - 600\,000\cdot 1{,}05^n$, que llega a $0$ entre los meses $20$ y $21$; el último pago es en el mes $21$
  <!-- feedback: Correcto. Como el interés inicial ($50\,000$) es menor que el pago ($80\,000$), el saldo baja; en el mes $20$ quedan unos $8\,021$ pesos. -->
- [ ] B) Nunca se cancela, porque la deuda crece en forma exponencial
  <!-- feedback: Incorrecto. La deuda crecería sola, pero el pago de $80\,000$ supera el interés de $50\,000$ del primer mes, y el saldo disminuye. -->
- [ ] C) Se cancela en $12{,}5$ meses, porque $1\,000\,000 : 80\,000 = 12{,}5$
  <!-- feedback: Incorrecto. Esa cuenta ignora los intereses: cada mes una parte del pago se usa para cubrir el $5\,\%$. -->
- [ ] D) Se cancela exactamente en el mes $20$
  <!-- feedback: Incorrecto. Con $n = 20$ el saldo es $1\,600\,000 - 600\,000\cdot 1{,}05^{20} \approx 8\,021 > 0$; hace falta un pago más. -->

### Explicacion Pedagogica
Saldo tras $n$ meses: $B_n = 1\,000\,000\cdot 1{,}05^n - 80\,000\cdot\frac{1{,}05^n - 1}{0{,}05} = 1\,600\,000 - 600\,000\cdot 1{,}05^n$. Se anula cuando $1{,}05^n = \frac{8}{3}$, es decir, $n = \frac{\ln(8/3)}{\ln 1{,}05} \approx 20{,}1$. En el mes $20$ quedan unos $8\,021$ pesos, que se cancelan en el mes $21$.
