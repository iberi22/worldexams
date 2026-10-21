---
id: "AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle"
country: "argentina"
grado: 11
asignatura: "matematica"
tema: "funcion-exponencial"
periodo: "weekly"
week: "W13"
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

# Bundle MASTERY: Función Exponencial - Grado 11

Bundle sobre la función exponencial: reconocimiento, gráfico, asíntota, crecimiento y decrecimiento, interés compuesto en pesos, modelos de inflación y vida media, con situaciones argentinas.

## Question 1 [D3-D4]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v1
**Bloom:** Remember
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.85
**Contexto:** En un laboratorio de la Universidad Nacional de Córdoba se comparan cuatro fórmulas para describir el número de bacterias de un cultivo según las horas $x$.

### Enunciado
¿Cuál de las siguientes funciones es exponencial?

### Opciones
- [x] A) $f(x) = 3\cdot 2^x$
  <!-- feedback: Correcto. La variable está en el exponente y la base $2$ es positiva y distinta de $1$: es de la forma $a\cdot b^x$. -->
- [ ] B) $g(x) = 3x^2$
  <!-- feedback: Incorrecto. Aquí la variable es la base y el exponente es fijo: es una función cuadrática, no exponencial. -->
- [ ] C) $h(x) = 2x + 3$
  <!-- feedback: Incorrecto. Es una función lineal: aumenta siempre $2$ unidades por cada unidad de $x$, no se multiplica por un factor constante. -->
- [ ] D) $k(x) = x^3$
  <!-- feedback: Incorrecto. Es una función potencia (cúbica) porque el exponente $3$ es constante y la variable está en la base. -->

### Explicacion Pedagogica
Una función exponencial tiene la forma $f(x) = a\cdot b^x$ con $a \ne 0$, $b > 0$ y $b \ne 1$: la variable aparece en el exponente. En $3\cdot 2^x$ cada hora el valor se multiplica por $2$; en $3x^2$, $2x+3$ y $x^3$ la variable está en la base.

## Question 2 [D3-D4]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v2
**Bloom:** Understand
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.83
**Contexto:** Una concesionaria de Buenos Aires estima que el valor de un auto usado, en millones de pesos, sigue $V(t) = 5\cdot(0{,}8)^t$, con $t$ en años.

### Enunciado
¿Qué describe el factor $0{,}8$ del modelo $V(t) = 5\cdot(0{,}8)^t$?

### Opciones
- [x] A) Un decrecimiento del $20\,\%$ por año
  <!-- feedback: Correcto. Cada año el valor se multiplica por $0{,}8 = 1 - 0{,}2$, es decir, conserva el $80\,\%$ y pierde el $20\,\%$. -->
- [ ] B) Un crecimiento del $80\,\%$ por año
  <!-- feedback: Incorrecto. Como $0 < 0{,}8 < 1$ la función decrece; un crecimiento del $80\,\%$ exigiría el factor $1{,}8$. -->
- [ ] C) Un decrecimiento del $80\,\%$ por año
  <!-- feedback: Incorrecto. Perder el $80\,\%$ dejaría el $20\,\%$, es decir, factor $0{,}2$; el factor $0{,}8$ indica lo que se conserva. -->
- [ ] D) Un crecimiento del $20\,\%$ por año
  <!-- feedback: Incorrecto. Un crecimiento del $20\,\%$ corresponde al factor $1{,}2$; con base menor que $1$ el valor baja. -->

### Explicacion Pedagogica
En $V(t) = a\cdot b^t$, si $b = 1 + r$ hay crecimiento con tasa $r$ y si $b = 1 - r$ hay decrecimiento con tasa $r$. Aquí $b = 0{,}8 = 1 - 0{,}2$: el auto pierde el $20\,\%$ de su valor por año. Por ejemplo, $V(1) = 4$ millones.

## Question 3 [D3-D4]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v3
**Bloom:** Remember
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.81
**Contexto:** En un trabajo práctico de una escuela de Rosario se grafica $f(x) = 2^x + 3$ para estudiar sus elementos.

### Enunciado
¿Cuál es la ordenada al origen y cuál es la asíntota horizontal de $f(x) = 2^x + 3$?

### Opciones
- [ ] A) Ordenada al origen $(0, 3)$; asíntota $y = 0$
  <!-- feedback: Incorrecto. Se tomó $2^0 = 0$; en realidad $2^0 = 1$, y el $+3$ desplaza la asíntota de $y = 0$ a $y = 3$. -->
- [ ] B) Ordenada al origen $(0, 5)$; asíntota $y = 3$
  <!-- feedback: Incorrecto. Se calculó $2^0$ como $2$; todo número no nulo elevado a $0$ vale $1$, así que $f(0) = 4$. -->
- [x] C) Ordenada al origen $(0, 4)$; asíntota $y = 3$
  <!-- feedback: Correcto. Con $f(0) = 2^0 + 3 = 1 + 3 = 4$, y cuando $x \to -\infty$, $2^x \to 0$, así que $f(x) \to 3$. -->
- [ ] D) Ordenada al origen $(0, 4)$; asíntota $y = 0$
  <!-- feedback: Incorrecto. La ordenada es correcta, pero el $+3$ traslada todo el gráfico, incluida la asíntota, $3$ unidades hacia arriba. -->

### Explicacion Pedagogica
La ordenada al origen se obtiene con $x = 0$: $f(0) = 2^0 + 3 = 4$. La asíntota horizontal de $2^x$ es $y = 0$ (para $x \to -\infty$); sumar $3$ traslada el gráfico hacia arriba, por lo que la asíntota pasa a ser $y = 3$.

## Question 4 [D3-D4]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v4
**Bloom:** Understand
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.79
**Contexto:** Un biólogo de Ushuaia ajusta un modelo $f(x) = a\cdot b^x$ a la cantidad de algas (en miles) en una muestra: hay $3$ mil al inicio y $6$ mil al día siguiente.

### Enunciado
Si $f(0) = 3$ y $f(1) = 6$, ¿cuál es la fórmula de $f(x) = a\cdot b^x$?

### Opciones
- [ ] A) $f(x) = 3\cdot 3^x$
  <!-- feedback: Incorrecto. Se tomó $b = 6 - 3 = 3$ como si fuera una diferencia; en un modelo exponencial $b$ es el cociente $\frac{f(1)}{f(0)} = 2$. -->
- [x] B) $f(x) = 3\cdot 2^x$
  <!-- feedback: Correcto. De $f(0) = a = 3$ y $f(1) = 3b = 6$ sale $b = 2$. -->
- [ ] C) $f(x) = 2\cdot 3^x$
  <!-- feedback: Incorrecto. Se intercambiaron los parámetros: con esa fórmula $f(0) = 2$, pero el dato inicial es $3$. -->
- [ ] D) $f(x) = 6\cdot 2^x$
  <!-- feedback: Incorrecto. Se usó $f(1)$ como valor inicial; el coeficiente $a$ es $f(0)$, porque $b^0 = 1$. -->

### Explicacion Pedagogica
En $f(x) = a\cdot b^x$ el valor inicial es $f(0) = a\cdot b^0 = a$, de modo que $a = 3$. Luego $f(1) = a\cdot b = 3b = 6$ da $b = 2$. El modelo es $f(x) = 3\cdot 2^x$: las algas se duplican cada día.

## Question 5 [D5-D6]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v5
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.76
**Contexto:** Una familia de Mendoza deposita 500.000 pesos en una inversión que capitaliza intereses al $3\,\%$ mensual durante $6$ meses.

### Enunciado
¿Cuál es el monto aproximado al cabo de $6$ meses con interés compuesto?

### Opciones
- [ ] A) 590.000 pesos
  <!-- feedback: Incorrecto. Ese es el interés simple, $500\,000\cdot(1 + 0{,}03\cdot 6)$; con capitalización los intereses también generan intereses. -->
- [ ] B) 579.637,04 pesos
  <!-- feedback: Incorrecto. Se usó el exponente $5$: $500\,000\cdot 1{,}03^5$; son $6$ capitalizaciones, una por mes. -->
- [ ] C) 97.026,15 pesos
  <!-- feedback: Incorrecto. Ese número es solo el interés ganado, $597\,026{,}15 - 500\,000$, no el monto final. -->
- [x] D) 597.026,15 pesos
  <!-- feedback: Correcto. El monto es $500\,000\cdot 1{,}03^6 \approx 597\,026{,}15$, porque cada mes se aplica el $3\,\%$ sobre el saldo acumulado. -->

### Explicacion Pedagogica
Con interés compuesto, $M = C\cdot(1 + i)^n$. Aquí $C = 500\,000$, $i = 0{,}03$ y $n = 6$: $M = 500\,000\cdot 1{,}03^6 \approx 500\,000\cdot 1{,}194052 \approx 597\,026{,}15$ pesos. El interés simple daría solo $590\,000$.

## Question 6 [D5-D6]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v6
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.74
**Contexto:** En un almacén de Tucumán, un paquete de yerba cuesta 12.000 pesos y se supone una inflación constante del $4\,\%$ mensual.

### Enunciado
Según el modelo $P(t) = 12\,000\cdot 1{,}04^t$ ($t$ en meses), ¿cuánto costará aproximadamente el paquete dentro de $12$ meses?

### Opciones
- [ ] A) 17.760 pesos
  <!-- feedback: Incorrecto. Se sumó $12\cdot 4\,\% = 48\,\%$ como si los aumentos no se acumularan; eso es crecimiento lineal, no exponencial. -->
- [x] B) 19.212,39 pesos
  <!-- feedback: Correcto. El cálculo es $12\,000\cdot 1{,}04^{12} \approx 12\,000\cdot 1{,}601032 \approx 19\,212{,}39$, porque cada aumento se aplica sobre el precio ya aumentado. -->
- [ ] C) 149.760 pesos
  <!-- feedback: Incorrecto. Se multiplicó $12\,000\cdot 1{,}04\cdot 12$; el $12$ es el exponente, no un factor. -->
- [ ] D) 18.473,45 pesos
  <!-- feedback: Incorrecto. Se usó $1{,}04^{11}$; en $12$ meses hay $12$ aumentos, así que el exponente es $12$. -->

### Explicacion Pedagogica
La inflación mensual constante se modela con un factor $1{,}04$ por mes: $P(12) = 12\,000\cdot 1{,}04^{12}$. Como $1{,}04^{12} \approx 1{,}601$, el precio sube cerca de un $60\,\%$ en el año y llega a unos $19\,212{,}39$ pesos, más que el $48\,\%$ que daría sumar los porcentajes.

## Question 7 [D5-D6]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v7
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.72
**Contexto:** El servicio de medicina nuclear de un hospital de Córdoba recibe $80$ mg de yodo-131, cuyo período de semidesintegración es de $8$ días.

### Enunciado
¿Qué cantidad de yodo-131 queda después de $24$ días?

### Opciones
- [x] A) $10$ mg
  <!-- feedback: Correcto. En $24$ días hay $\frac{24}{8} = 3$ vidas medias: $80\cdot\left(\frac{1}{2}\right)^3 = 10$ mg. -->
- [ ] B) $20$ mg
  <!-- feedback: Incorrecto. Se aplicaron solo dos vidas medias, $80\cdot\frac{1}{4}$; en $24$ días caben tres períodos de $8$ días. -->
- [ ] C) $26{,}7$ mg
  <!-- feedback: Incorrecto. Se dividió $80$ por $3$; cada vida media divide la cantidad por $2$, no se reparte en partes iguales. -->
- [ ] D) $5$ mg
  <!-- feedback: Incorrecto. Se aplicaron cuatro vidas medias, $80\cdot\frac{1}{16}$, una de más: $\frac{24}{8} = 3$. -->

### Explicacion Pedagogica
La cantidad restante es $Q(t) = Q_0\left(\frac{1}{2}\right)^{t/T}$, donde $T$ es la vida media. Con $Q_0 = 80$, $T = 8$ y $t = 24$: $Q = 80\cdot\left(\frac{1}{2}\right)^3 = 80\cdot\frac{1}{8} = 10$ mg. Cada $8$ días la cantidad se reduce a la mitad: $80 \to 40 \to 20 \to 10$.

## Question 8 [D5-D6]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v8
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.70
**Contexto:** En una clase de Santa Rosa se usa un graficador para comparar $f(x) = 2^x$ con $g(x) = 2^{x-3}$.

### Enunciado
¿Cómo se obtiene el gráfico de $g(x) = 2^{x-3}$ a partir del de $f(x) = 2^x$?

### Opciones
- [ ] A) Trasladándolo $3$ unidades hacia la izquierda
  <!-- feedback: Incorrecto. Restar $3$ dentro del exponente retrasa el gráfico; la izquierda correspondería a $2^{x+3}$. -->
- [ ] B) Trasladándolo $3$ unidades hacia arriba
  <!-- feedback: Incorrecto. Un desplazamiento vertical se escribe fuera del exponente, $2^x + 3$; aquí el $-3$ afecta a la variable. -->
- [ ] C) Trasladándolo $3$ unidades hacia abajo
  <!-- feedback: Incorrecto. Eso sería $2^x - 3$, que cambia la asíntota a $y = -3$; en $2^{x-3}$ la asíntota sigue siendo $y = 0$. -->
- [x] D) Trasladándolo $3$ unidades hacia la derecha
  <!-- feedback: Correcto. Como $g(x) = f(x - 3)$, el valor que $f$ toma en $x$ lo toma $g$ en $x + 3$: por ejemplo, $g(3) = 2^0 = 1 = f(0)$. -->

### Explicacion Pedagogica
Si $g(x) = f(x - h)$ con $h > 0$, el gráfico se traslada $h$ unidades a la derecha. Aquí $g(x) = 2^{x-3} = f(x - 3)$: el punto $(0, 1)$ de $f$ pasa a $(3, 1)$. La asíntota $y = 0$ no cambia, porque es una traslación horizontal.

## Question 9 [D5-D6]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v9
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.68
**Contexto:** En un laboratorio de microbiología de La Plata, un cultivo empieza con $500$ bacterias y la población se duplica cada $20$ minutos.

### Enunciado
¿Cuántas bacterias habrá al cabo de $2$ horas?

### Opciones
- [ ] A) $6\,000$
  <!-- feedback: Incorrecto. Se calculó $500\cdot 2\cdot 6$; las duplicaciones se encadenan, así que el factor es $2^6 = 64$, no $12$. -->
- [ ] B) $16\,000$
  <!-- feedback: Incorrecto. Se contaron $5$ duplicaciones en lugar de $6$: $\frac{120}{20} = 6$. -->
- [x] C) $32\,000$
  <!-- feedback: Correcto. En $120$ minutos hay $\frac{120}{20} = 6$ duplicaciones: $500\cdot 2^6 = 500\cdot 64 = 32\,000$. -->
- [ ] D) $64\,000$
  <!-- feedback: Incorrecto. Ese es $500\cdot 2^7$; se agregó una duplicación de más respecto de las $6$ que ocurren en $2$ horas. -->

### Explicacion Pedagogica
El modelo es $N(t) = 500\cdot 2^{t/20}$ con $t$ en minutos. Para $t = 120$: $N = 500\cdot 2^{6} = 32\,000$ bacterias. Pasar las horas a minutos es clave: $2$ horas son $120$ minutos, es decir, $6$ períodos de duplicación.

## Question 10 [D5-D6]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v10
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.66
**Contexto:** Un auto que hoy vale 20.000.000 de pesos en Neuquén se tasó en 12.800.000 pesos dos años después, y se supone depreciación exponencial $V(t) = V_0\cdot b^t$.

### Enunciado
¿Cuál es la tasa de depreciación anual?

### Opciones
- [ ] A) $36\,\%$
  <!-- feedback: Incorrecto. Esa es la pérdida total en los dos años, $1 - 0{,}64$; la tasa anual sale de $b = \sqrt{0{,}64}$. -->
- [x] B) $20\,\%$
  <!-- feedback: Correcto. De $b^2 = \frac{12\,800\,000}{20\,000\,000} = 0{,}64$ sale $b = 0{,}8$: el auto pierde el $20\,\%$ por año. -->
- [ ] C) $18\,\%$
  <!-- feedback: Incorrecto. Se dividió $36\,\%$ por $2$, como si la depreciación fuera lineal; en un modelo exponencial se toma raíz cuadrada. -->
- [ ] D) $64\,\%$
  <!-- feedback: Incorrecto. El valor $0{,}64$ es lo que se conserva en dos años, no lo que se pierde por año. -->

### Explicacion Pedagogica
Con $V(2) = V_0 b^2$: $b^2 = \frac{12\,800\,000}{20\,000\,000} = 0{,}64$, por lo que $b = 0{,}8$ (positiva). Un factor anual $0{,}8$ significa conservar el $80\,\%$ y perder el $20\,\%$ cada año: $20 \to 16 \to 12{,}8$ millones.

## Question 11 [D7-D8]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v11
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.63
**Contexto:** Un club de Rosario compara dos opciones para invertir 1.000.000 de pesos durante $12$ meses: el plan A capitaliza al $5\,\%$ mensual; el plan B paga 60.000 pesos fijos por mes sin capitalizar.

### Enunciado
¿Qué plan conviene al cabo de $12$ meses y por qué?

### Opciones
- [ ] A) El plan B: el A termina con 1.600.000 pesos
  <!-- feedback: Incorrecto. Para el plan A se sumó $12\cdot 5\,\% = 60\,\%$ como interés simple; al capitalizar, el factor es $1{,}05^{12} \approx 1{,}796$. -->
- [ ] B) El plan B: el A termina con 1.050.000 pesos
  <!-- feedback: Incorrecto. Se aplicó el $5\,\%$ una sola vez; el plan A capitaliza durante $12$ meses, con exponente $12$. -->
- [x] C) El plan A: termina con unos 1.795.856 pesos frente a 1.720.000 del B
  <!-- feedback: Correcto. A da $1\,000\,000\cdot 1{,}05^{12} \approx 1\,795\,856$ y B da $1\,000\,000 + 12\cdot 60\,000 = 1\,720\,000$. -->
- [ ] D) El plan A: termina con 1.795.856 pesos frente a 1.060.000 del B
  <!-- feedback: Incorrecto. El monto del A está bien, pero el B paga $60\,000$ durante $12$ meses, no uno: $1\,000\,000 + 720\,000$. -->

### Explicacion Pedagogica
Plan A (compuesto): $M_A = 1\,000\,000\cdot 1{,}05^{12} \approx 1\,795\,856$ pesos. Plan B (lineal): $M_B = 1\,000\,000 + 12\cdot 60\,000 = 1\,720\,000$ pesos. Aunque el B paga más que el $5\,\%$ inicial (50.000 pesos), el crecimiento exponencial del A lo supera en un año.

## Question 12 [D7-D8]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v12
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.61
**Contexto:** En un ejercicio de una escuela de Salta se analiza la función $f(x) = -2\cdot 3^x + 1$, que modela la variación de temperatura de una sustancia.

### Enunciado
¿Cuál de estas afirmaciones sobre $f(x) = -2\cdot 3^x + 1$ es verdadera?

### Opciones
- [ ] A) Es creciente y su imagen es $(1, +\infty)$
  <!-- feedback: Incorrecto. Se ignoró el coeficiente $-2$, que refleja el gráfico respecto del eje horizontal y lo vuelve decreciente. -->
- [x] B) Es decreciente y su imagen es $(-\infty, 1)$
  <!-- feedback: Correcto. Como $3^x > 0$, $-2\cdot 3^x < 0$ y $f(x) < 1$; además $-2\cdot 3^x$ disminuye cuando $x$ aumenta. -->
- [ ] C) Es decreciente y su imagen es $(-\infty, -1)$
  <!-- feedback: Incorrecto. Se confundió $f(0) = -1$ con la asíntota; la asíntota es $y = 1$, y valores como $f(-1) = \frac{1}{3}$ superan a $-1$. -->
- [ ] D) Corta al eje $x$ en $x = 0$
  <!-- feedback: Incorrecto. En $x = 0$: $f(0) = -2 + 1 = -1 \ne 0$; el cero está en $3^x = \frac{1}{2}$, un $x$ negativo. -->

### Explicacion Pedagogica
Partimos de $3^x$, creciente con imagen $(0, +\infty)$. Multiplicar por $-2$ da imagen $(-\infty, 0)$ y la vuelve decreciente; sumar $1$ traslada hacia arriba: imagen $(-\infty, 1)$ con asíntota $y = 1$. La ordenada al origen es $f(0) = -1$.

## Question 13 [D7-D8]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v13
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.59
**Contexto:** Una cooperativa de Entre Ríos registra la producción de miel en cuatro años consecutivos y quiere saber cuál de sus tablas sigue un modelo exponencial ($x = 0, 1, 2, 3$).

### Enunciado
¿Cuál de estas secuencias de valores, para $x = 0, 1, 2, 3$, corresponde a una función exponencial?

### Opciones
- [x] A) $4;\ 6;\ 9;\ 13{,}5$
  <!-- feedback: Correcto. El cociente entre valores consecutivos es constante: $\frac{6}{4} = \frac{9}{6} = \frac{13{,}5}{9} = 1{,}5$. -->
- [ ] B) $4;\ 6;\ 8;\ 10$
  <!-- feedback: Incorrecto. Aquí la diferencia es constante ($+2$), lo que corresponde a una función lineal, no exponencial. -->
- [ ] C) $4;\ 6;\ 9;\ 12$
  <!-- feedback: Incorrecto. Los primeros cocientes valen $1{,}5$, pero $\frac{12}{9} \approx 1{,}33$; el factor no es constante. -->
- [ ] D) $4;\ 5;\ 8;\ 13$
  <!-- feedback: Incorrecto. Las diferencias $1, 3, 5$ crecen de a $2$: es un patrón cuadrático, y los cocientes no son iguales. -->

### Explicacion Pedagogica
Una función exponencial $f(x) = a\cdot b^x$ multiplica por el mismo factor $b$ cada vez que $x$ aumenta en $1$. Por eso se comparan cocientes: en $4, 6, 9, 13{,}5$ todos valen $1{,}5$, y el modelo es $f(x) = 4\cdot 1{,}5^x$. Las diferencias constantes indican un modelo lineal.

## Question 14 [D7-D8]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v14
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.57
**Contexto:** Un informe de precios de Buenos Aires indica una inflación mensual constante del $3\,\%$ durante todo un año.

### Enunciado
¿Cuál es aproximadamente la inflación acumulada en el año?

### Opciones
- [ ] A) $36\,\%$
  <!-- feedback: Incorrecto. Se sumaron los porcentajes, $12\cdot 3\,\%$; cada aumento se aplica sobre precios que ya subieron, por eso el total es mayor. -->
- [ ] B) $3\,\%$
  <!-- feedback: Incorrecto. El $3\,\%$ es la tasa de un mes; en el año hay $12$ aumentos sucesivos. -->
- [x] C) $42{,}6\,\%$
  <!-- feedback: Correcto. Los aumentos se encadenan: $1{,}03^{12} \approx 1{,}4258$, es decir, un aumento acumulado del $42{,}6\,\%$. -->
- [ ] D) $142{,}6\,\%$
  <!-- feedback: Incorrecto. El factor $1{,}426$ indica que el precio final es el $142{,}6\,\%$ del inicial, pero el aumento es $142{,}6 - 100 = 42{,}6\,\%$. -->

### Explicacion Pedagogica
Si los precios suben un $3\,\%$ por mes, al cabo de $12$ meses quedan multiplicados por $1{,}03^{12} \approx 1{,}4258$. La inflación acumulada es $1{,}4258 - 1 = 0{,}4258$, cerca del $42{,}6\,\%$. Sumar $12\cdot 3 = 36\,\%$ subestima porque ignora el efecto compuesto.

## Question 15 [D7-D8]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v15
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.55
**Contexto:** En un laboratorio de la CNEA en Bariloche, una muestra radiactiva de $120$ g se reduce a $15$ g en $30$ años.

### Enunciado
¿Cuál es el período de semidesintegración (vida media) de la sustancia?

### Opciones
- [ ] A) $15$ años
  <!-- feedback: Incorrecto. Se contaron solo dos mitades en $30$ años; con vida media de $15$ años quedarían $120\cdot\frac{1}{4} = 30$ g, no $15$ g. -->
- [ ] B) $7{,}5$ años
  <!-- feedback: Incorrecto. Con vida media de $7{,}5$ años habría $4$ semividas en $30$ años y quedarían $120\cdot\frac{1}{16} = 7{,}5$ g, no $15$ g. -->
- [ ] C) $3{,}75$ años
  <!-- feedback: Incorrecto. Se dividió $30$ por el factor $8$; hay que contar cuántas mitades hay en $\frac{1}{8}$, que son $3$, y dividir $30$ por $3$. -->
- [x] D) $10$ años
  <!-- feedback: Correcto. De $120$ a $15$ el factor es $\frac{15}{120} = \frac{1}{8} = \left(\frac{1}{2}\right)^3$: tres vidas medias en $30$ años, cada una de $10$ años. -->

### Explicacion Pedagogica
Planteamos $15 = 120\cdot\left(\frac{1}{2}\right)^{30/T}$, de donde $\left(\frac{1}{2}\right)^{30/T} = \frac{1}{8} = \left(\frac{1}{2}\right)^3$. Igualando exponentes, $\frac{30}{T} = 3$ y $T = 10$ años. Comprobación: $120 \to 60 \to 30 \to 15$ en $10$, $20$ y $30$ años.

## Question 16 [D7-D8]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v16
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.53
**Contexto:** En un debate de la clase de matemática de un colegio de Mar del Plata se compara el crecimiento de $f(x) = 2^x$ con el de $g(x) = x^2$.

### Enunciado
¿Cuál de estas afirmaciones es verdadera?

### Opciones
- [ ] A) Para todo $x > 0$ se cumple $x^2 > 2^x$
  <!-- feedback: Incorrecto. Falla en $x = 1$: $1^2 = 1 < 2^1 = 2$, y también para todo $x > 4$. -->
- [ ] B) Los gráficos se cortan solo en $x = 2$
  <!-- feedback: Incorrecto. También se cortan en $x = 4$, pues $2^4 = 16 = 4^2$, y en un valor negativo cercano a $x \approx -0{,}77$. -->
- [ ] C) Para todo número real $x$ se cumple $2^x > x^2$
  <!-- feedback: Incorrecto. Falla en $x = 3$: $2^3 = 8 < 3^2 = 9$; entre $2$ y $4$ la cuadrática es mayor. -->
- [x] D) Para todo $x > 4$ se cumple $2^x > x^2$
  <!-- feedback: Correcto. Las curvas se cortan en $x = 2$ y $x = 4$ (y en un $x$ negativo); a partir de $x = 4$ la exponencial supera siempre a la cuadrática, por ejemplo $2^5 = 32 > 25$. -->

### Explicacion Pedagogica
Calculamos algunos valores: en $x = 2$ y $x = 4$ ambas valen $4$ y $16$; en $x = 3$, $8 < 9$; en $x = 5$, $32 > 25$. Hay un tercer corte en $x \approx -0{,}77$. Para $x > 4$ la exponencial crece más rápido, ya que se multiplica por $2$ en cada paso, y la desigualdad $2^x > x^2$ se mantiene.

## Question 17 [D9-D10]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.50
**Contexto:** Un estudiante de San Luis afirma que $f(x) = \left(\frac{1}{2}\right)^x$ y $g(x) = 2^{-x}$ son funciones distintas porque una tiene base menor que $1$ y la otra base mayor que $1$.

### Enunciado
¿Cuál es la evaluación correcta de esa afirmación?

### Opciones
- [ ] A) Es correcta: $f$ decrece y $g$ crece
  <!-- feedback: Incorrecto. Ambas decrecen: $g(x) = 2^{-x}$ baja al aumentar $x$, por ejemplo $g(1) = \frac{1}{2}$ y $g(2) = \frac{1}{4}$. -->
- [x] B) Es incorrecta: $\left(\frac{1}{2}\right)^x = \frac{1}{2^x} = 2^{-x}$, así que son la misma función
  <!-- feedback: Correcto. Por las propiedades de las potencias, $\left(\frac{1}{2}\right)^x = (2^{-1})^x = 2^{-x}$ para todo $x$ real. -->
- [ ] C) Es correcta: $g$ es la reflexión de $f$ respecto del eje $y$
  <!-- feedback: Incorrecto. La reflexión de $f$ respecto del eje $y$ es $f(-x) = 2^x$, que no es $g$; $g$ coincide con $f$. -->
- [ ] D) Es correcta: difieren en $x = 0$
  <!-- feedback: Incorrecto. En $x = 0$ ambas valen $1$, porque toda base positiva elevada a $0$ da $1$. -->

### Explicacion Pedagogica
Usando $(a^m)^n = a^{mn}$: $\left(\frac{1}{2}\right)^x = (2^{-1})^x = 2^{-x}$. Son dos escrituras de la misma función decreciente, con $f(0) = g(0) = 1$ y asíntota $y = 0$. Una base menor que $1$ equivale siempre a una base mayor que $1$ con exponente opuesto.

## Question 18 [D9-D10]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.48
**Contexto:** Una emprendedora de Córdoba registra los seguidores de su tienda en línea: $1000$, $1500$, $2250$ y $3375$ en los meses $t = 0, 1, 2, 3$. Un socio propone el modelo $S(t) = 1000 + 500t$.

### Enunciado
¿Qué modelo describe mejor los datos y qué predice para $t = 6$?

### Opciones
- [x] A) El exponencial $S(t) = 1000\cdot 1{,}5^t$, que predice unos $11\,391$ seguidores
  <!-- feedback: Correcto. Los cocientes son constantes ($1{,}5$), y $1000\cdot 1{,}5^6 = 11\,390{,}625$. -->
- [ ] B) El lineal del socio, que predice $4000$ seguidores
  <!-- feedback: Incorrecto. El modelo lineal solo acierta en $t = 0$ y $t = 1$: para $t = 2$ predice $2000$ y el dato es $2250$. -->
- [ ] C) El exponencial, que predice $9000$ seguidores
  <!-- feedback: Incorrecto. Se calculó $1000\cdot 1{,}5\cdot 6$; el $6$ es exponente: $1{,}5^6 \approx 11{,}39$. -->
- [ ] D) El exponencial, que predice unos $7594$ seguidores
  <!-- feedback: Incorrecto. Ese es $1000\cdot 1{,}5^5$, la predicción para $t = 5$, no para $t = 6$. -->

### Explicacion Pedagogica
Para decidir el modelo comparamos diferencias y cocientes. Las diferencias ($500$, $750$, $1125$) no son constantes, pero los cocientes sí: $1{,}5$. Por eso $S(t) = 1000\cdot 1{,}5^t$ y $S(6) = 1000\cdot 11{,}390625 \approx 11\,391$. El modelo lineal subestima mucho el crecimiento.

## Question 19 [D9-D10]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.47
**Contexto:** Un banco de Buenos Aires ofrece un plazo fijo con TNA del $60\,\%$ capitalizable mensualmente (es decir, $5\,\%$ por mes), y otra entidad ofrece un $75\,\%$ efectivo anual pagado una sola vez.

### Enunciado
Si se reinvierten los intereses todos los meses, ¿qué opción rinde más en un año y por qué?

### Opciones
- [ ] A) La del $75\,\%$, porque $75 > 60$
  <!-- feedback: Incorrecto. Se compararon tasas que no son equivalentes: la TNA no incluye el efecto de capitalizar mes a mes. -->
- [ ] B) Son equivalentes, porque $60 : 12 = 5$
  <!-- feedback: Incorrecto. Dividir la TNA da la tasa mensual, pero al capitalizar el efecto anual es $1{,}05^{12} - 1$, no $60\,\%$ ni $75\,\%$. -->
- [ ] C) La del $75\,\%$, porque la mensual equivale a $1{,}05^{12} - 1 \approx 17{,}96\,\%$ anual
  <!-- feedback: Incorrecto. Se leyó mal el factor $1{,}796$: significa un aumento del $79{,}6\,\%$, no del $17{,}96\,\%$. -->
- [x] D) La TNA del $60\,\%$ mensual, porque su tasa efectiva anual es $1{,}05^{12} - 1 \approx 79{,}6\,\%$
  <!-- feedback: Correcto. Capitalizar $12$ veces al $5\,\%$ da el factor $1{,}05^{12} \approx 1{,}796$, mayor que el factor $1{,}75$ de la otra opción. -->

### Explicacion Pedagogica
Para comparar hay que pasar a tasa efectiva anual (TEA). Con $5\,\%$ mensual capitalizado, $TEA = 1{,}05^{12} - 1 \approx 0{,}796$, o sea, $79{,}6\,\%$. Como $79{,}6\,\% > 75\,\%$, conviene el plazo fijo con capitalización mensual, aunque su TNA nominal sea menor.

## Question 20 [D9-D10]
**ID:** AR-MAT-11-2026-W13-funcion-exponencial-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.45
**Contexto:** En una planta de tratamiento de agua de Rosario, la concentración de un contaminante (en mg/L) sigue $C(t) = 100\cdot(0{,}5)^{t/5}$, con $t$ en horas.

### Enunciado
¿Cuál de estas conclusiones sobre el modelo es correcta?

### Opciones
- [ ] A) Llega a $0$ en $t = 10$, porque pierde $50$ mg/L cada $5$ horas
  <!-- feedback: Incorrecto. Esa lectura es lineal; el modelo reduce a la mitad lo que queda, así que en $t = 10$ hay $25$ mg/L. -->
- [ ] B) En $t = 10$ queda $50$ mg/L
  <!-- feedback: Incorrecto. Ese valor corresponde a $t = 5$; en $t = 10$ hay dos reducciones a la mitad. -->
- [x] C) En $t = 10$ queda $25$ mg/L y la concentración nunca llega exactamente a $0$
  <!-- feedback: Correcto. Con $C(10) = 100\cdot 0{,}5^2 = 25$, y como $0{,}5^{t/5} > 0$ para todo $t$, la curva se acerca a la asíntota $y = 0$ sin tocarla. -->
- [ ] D) Queda $25$ mg/L en $t = 10$ y llega a $0$ en $t = 20$
  <!-- feedback: Incorrecto. En $t = 20$ quedan $100\cdot 0{,}5^4 = 6{,}25$ mg/L; una potencia de base positiva nunca vale $0$. -->

### Explicacion Pedagogica
Evaluamos: $C(5) = 50$, $C(10) = 25$, $C(20) = 6{,}25$. Cada $5$ horas la concentración se reduce a la mitad, pero siempre es positiva: $b^t > 0$ para toda base $b > 0$. Por eso el gráfico tiene asíntota horizontal $y = 0$ y el contaminante nunca desaparece por completo en el modelo.
