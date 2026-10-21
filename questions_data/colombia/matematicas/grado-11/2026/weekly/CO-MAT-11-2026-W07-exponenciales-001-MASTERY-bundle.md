---
id: "CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "exponenciales"
periodo: "weekly"
week: "W07"
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

# Bundle MASTERY: Funciones Exponenciales - Grado 11

Este bundle evalúa las leyes de los exponentes, las ecuaciones exponenciales, los modelos de crecimiento y decaimiento (interés compuesto en COP, vida media, tiempo de duplicación) y las características de la gráfica exponencial, con el estilo de Saber 11.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Algebraico
**Expected_Success:** 0.85
**Contexto:** En un repaso de álgebra en Pasto, el profesor pide simplificar una expresión con potencias de la misma base $a > 0$.

### Enunciado
¿Cuál es la forma simplificada de $\frac{a^{7} \cdot a^{-2}}{a^{3}}$?

### Opciones
- [ ] A) $a^{6}$
  <!-- feedback: Incorrecto. Se ignoró el signo del exponente $-2$ y se sumó $7 + 2 = 9$; luego $9 - 3 = 6$. -->
- [ ] B) $a^{12}$
  <!-- feedback: Incorrecto. Se sumaron todos los exponentes, $7 + 2 + 3$; al dividir, el exponente del denominador se resta. -->
- [x] C) $a^{2}$
  <!-- feedback: Correcto. Numerador: $a^{7 + (-2)} = a^{5}$; cociente: $a^{5 - 3} = a^{2}$. -->
- [ ] D) $a^{\frac{5}{3}}$
  <!-- feedback: Incorrecto. Se dividieron los exponentes, $\frac{5}{3}$; en un cociente de potencias de igual base los exponentes se restan. -->

### Explicacion Pedagogica
Se aplican dos leyes: $a^m \cdot a^n = a^{m+n}$ y $\frac{a^m}{a^n} = a^{m-n}$. Primero $a^{7} \cdot a^{-2} = a^{5}$; después $\frac{a^{5}}{a^{3}} = a^{2}$. Comprobación con $a = 2$: $\frac{128 \cdot \frac{1}{4}}{8} = \frac{32}{8} = 4 = 2^2$.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v2
**Bloom:** Understand
**ICFES:** Numerico
**Expected_Success:** 0.83
**Contexto:** En una clase de Ibagué se repasa el significado de los exponentes fraccionarios con el número $8^{2/3}$.

### Enunciado
¿Cuál es el valor de $8^{\frac{2}{3}}$?

### Opciones
- [x] A) 4
  <!-- feedback: Correcto. $8^{2/3} = \left(\sqrt[3]{8}\right)^{2} = 2^{2} = 4$. -->
- [ ] B) $\frac{16}{3}$
  <!-- feedback: Incorrecto. Se multiplicó la base por el exponente, $8 \cdot \frac{2}{3}$; un exponente indica potencia y raíz, no producto. -->
- [ ] C) 6
  <!-- feedback: Incorrecto. Se restó $8 - 2$; el denominador 3 es el índice de la raíz y el numerador 2 la potencia. -->
- [ ] D) $\sqrt{512}$
  <!-- feedback: Incorrecto. Se invirtió la fracción: $\sqrt{8^3} = 8^{3/2}$; en $8^{2/3}$ la raíz es cúbica y la potencia es 2. -->

### Explicacion Pedagogica
Un exponente fraccionario $\frac{m}{n}$ significa raíz de índice $n$ y potencia $m$: $b^{m/n} = (\sqrt[n]{b})^{m}$. Aquí $\sqrt[3]{8} = 2$ porque $2^3 = 8$, y $2^2 = 4$. También $(8^{2})^{1/3} = \sqrt[3]{64} = 4$.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v3
**Bloom:** Remember
**ICFES:** Variacional
**Expected_Success:** 0.81
**Contexto:** Un emprendimiento de café en Salento modela sus seguidores en redes, en miles, con $f(x) = 3 \cdot 2^{x}$, donde $x$ es el número de meses.

### Enunciado
¿Cuál afirmación sobre la gráfica de $f(x) = 3 \cdot 2^{x}$ es correcta?

### Opciones
- [ ] A) Corta el eje $y$ en $(0, 6)$
  <!-- feedback: Incorrecto. Se calculó $3 \cdot 2$; en $x = 0$ la potencia vale $2^0 = 1$, no 2. -->
- [ ] B) Tiene asíntota vertical $x = 0$
  <!-- feedback: Incorrecto. Una exponencial está definida para todo real; no tiene asíntotas verticales, su asíntota es horizontal. -->
- [ ] C) Es decreciente porque el coeficiente 3 es mayor que la base 2
  <!-- feedback: Incorrecto. El crecimiento lo decide la base: como $2 > 1$ y el coeficiente es positivo, la función es creciente. -->
- [x] D) Corta el eje $y$ en $(0, 3)$ y tiene asíntota horizontal $y = 0$
  <!-- feedback: Correcto. $f(0) = 3 \cdot 2^0 = 3$, y cuando $x \to -\infty$, $2^x \to 0$, así que $f(x) \to 0$ sin tocar el eje $x$. -->

### Explicacion Pedagogica
Para $f(x) = c \cdot b^{x}$ con $c > 0$ y $b > 1$: el corte con el eje $y$ es $f(0) = c = 3$; la función es creciente; y como $b^x > 0$ y tiende a 0 cuando $x \to -\infty$, la recta $y = 0$ es asíntota horizontal. El dominio es $\mathbb{R}$ y el rango $(0, \infty)$.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Modelacion
**Expected_Success:** 0.79
**Contexto:** En Cartagena, el valor de una motocicleta de 5 millones de pesos pierde el 20% de su valor cada año.

### Enunciado
¿Cuál función modela el valor $V$, en miles de pesos, después de $t$ años?

### Opciones
- [x] A) $V(t) = 5000(0.8)^{t}$
  <!-- feedback: Correcto. Perder 20% cada año significa conservar el 80%: se multiplica por $0.8$ una vez por año. -->
- [ ] B) $V(t) = 5000(1.8)^{t}$
  <!-- feedback: Incorrecto. Un factor $1.8 > 1$ representa crecimiento del 80%, no una pérdida del 20%. -->
- [ ] C) $V(t) = 5000 - 0.8t$
  <!-- feedback: Incorrecto. Es lineal y resta 0.8 miles por año; la pérdida es un porcentaje del valor actual, lo que da un modelo exponencial. -->
- [ ] D) $V(t) = 0.8(5000)^{t}$
  <!-- feedback: Incorrecto. Se intercambiaron coeficiente y base: el valor inicial 5000 no se eleva a $t$, se eleva el factor 0.8. -->

### Explicacion Pedagogica
Si cada año el valor queda en el $100\% - 20\% = 80\%$ del anterior, tras $t$ años se ha multiplicado $t$ veces por $0.8$: $V(t) = 5000 \cdot 0.8^{t}$. Por ejemplo, $V(1) = 4000$ y $V(2) = 3200$ miles de pesos. Como $0 < 0.8 < 1$, el modelo es de decaimiento exponencial.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.76
**Contexto:** En una competencia de matemáticas en Neiva se propone resolver una ecuación exponencial sin calculadora.

### Enunciado
¿Cuál es la solución de $3^{x + 1} = 81$?

### Opciones
- [ ] A) $x = 4$
  <!-- feedback: Incorrecto. 4 es el exponente total $x + 1$; falta restar 1 para despejar $x$. -->
- [ ] B) $x = 26$
  <!-- feedback: Incorrecto. Se dividió $81 \div 3 = 27$ y se restó 1; la incógnita está en el exponente, no multiplicando a 3. -->
- [ ] C) $x = 2$
  <!-- feedback: Incorrecto. Se escribió $81 = 3^3$, pero $3^3 = 27$; en realidad $81 = 3^4$. -->
- [x] D) $x = 3$
  <!-- feedback: Correcto. $81 = 3^4$, así que $x + 1 = 4$ y $x = 3$; verificación: $3^{4} = 81$. -->

### Explicacion Pedagogica
Se expresan ambos lados en la misma base: $3^{x+1} = 3^{4}$. Como la función $3^{t}$ es inyectiva, los exponentes deben ser iguales: $x + 1 = 4$, luego $x = 3$. Comprobación: $3^{3+1} = 3^4 = 81$.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.74
**Contexto:** Una cooperativa de Medellín ofrece un CDT con interés del 1% mensual compuesto; Luisa invierte 2 000 000 COP durante 12 meses.

### Enunciado
¿Cuánto dinero tendrá Luisa al final de los 12 meses, aproximadamente?

### Opciones
- [ ] A) 2 240 000 COP
  <!-- feedback: Incorrecto. Ese es el interés simple: $2\,000\,000 \cdot (1 + 0.01 \cdot 12)$; en el compuesto los intereses también generan intereses. -->
- [ ] B) 2 020 000 COP
  <!-- feedback: Incorrecto. $2\,000\,000 \cdot 1.01$ es el saldo después de un solo mes, no de 12. -->
- [x] C) 2 253 650 COP
  <!-- feedback: Correcto. $2\,000\,000 \cdot 1.01^{12} \approx 2\,000\,000 \cdot 1.126825 \approx 2\,253\,650$ COP. -->
- [ ] D) 24 240 000 COP
  <!-- feedback: Incorrecto. Se multiplicó $2\,000\,000 \cdot 12 \cdot 1.01$; el 12 es un exponente, no un factor. -->

### Explicacion Pedagogica
Con interés compuesto, $C(n) = C_0(1 + i)^{n}$. Aquí $C_0 = 2\,000\,000$, $i = 0.01$ y $n = 12$: $C(12) = 2\,000\,000 \cdot 1.01^{12} \approx 2\,253\,650$ COP. Comparado con el interés simple (2 240 000 COP), el compuesto da unos 13 650 COP más.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.72
**Contexto:** En un hospital de Cali se aplica un medicamento radiactivo de 80 mg cuya vida media es de 6 horas.

### Enunciado
¿Cuántos miligramos quedan después de 24 horas?

### Opciones
- [ ] A) 20 mg
  <!-- feedback: Incorrecto. Se dividió $80 \div 4$; en cada vida media la cantidad se reduce a la mitad, así que se divide entre $2^4 = 16$. -->
- [x] B) 5 mg
  <!-- feedback: Correcto. 24 h son $\frac{24}{6} = 4$ vidas medias: $80 \cdot \left(\frac{1}{2}\right)^{4} = \frac{80}{16} = 5$ mg. -->
- [ ] C) 10 mg
  <!-- feedback: Incorrecto. Corresponde a 3 vidas medias ($80 \div 8$), que son 18 horas, no 24. -->
- [ ] D) 2.5 mg
  <!-- feedback: Incorrecto. Corresponde a 5 vidas medias ($80 \div 32$), es decir, 30 horas. -->

### Explicacion Pedagogica
El modelo es $m(t) = m_0\left(\frac{1}{2}\right)^{t/T}$, con $T$ la vida media. Con $m_0 = 80$, $T = 6$ y $t = 24$: $m = 80 \cdot \left(\frac{1}{2}\right)^{4} = 5$ mg. Secuencia: 80, 40, 20, 10 y 5 mg a las 0, 6, 12, 18 y 24 horas.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.70
**Contexto:** En una panadería de Santa Marta, un cultivo de levadura de 10 000 células duplica su número cada 3 horas.

### Enunciado
¿Cuántas células habrá después de 12 horas?

### Opciones
- [ ] A) 40 000
  <!-- feedback: Incorrecto. Se multiplicó por 4, el número de periodos; duplicar 4 veces es multiplicar por $2^4 = 16$. -->
- [ ] B) 80 000
  <!-- feedback: Incorrecto. Son $10\,000 \cdot 2^3$, es decir, 3 duplicaciones (9 horas), no 4. -->
- [ ] C) 120 000
  <!-- feedback: Incorrecto. Se multiplicó $10\,000 \cdot 12$ horas; el crecimiento depende de cuántas veces se duplica, no de las horas directamente. -->
- [x] D) 160 000
  <!-- feedback: Correcto. 12 h son 4 periodos de duplicación: $10\,000 \cdot 2^{4} = 160\,000$. -->

### Explicacion Pedagogica
Si la población se duplica cada $d$ horas, $N(t) = N_0 \cdot 2^{t/d}$. Con $N_0 = 10\,000$, $d = 3$ y $t = 12$: $N = 10\,000 \cdot 2^{4} = 160\,000$ células. Se puede seguir paso a paso: 20 000, 40 000, 80 000 y 160 000.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.68
**Contexto:** En un semillero de matemáticas en Tunja se resuelven ecuaciones exponenciales con bases distintas que son potencias de 2.

### Enunciado
¿Cuál es la solución de $4^{x} = 8^{x - 1}$?

### Opciones
- [x] A) $x = 3$
  <!-- feedback: Correcto. $2^{2x} = 2^{3(x - 1)}$, así que $2x = 3x - 3$ y $x = 3$; verificación: $4^3 = 64 = 8^2$. -->
- [ ] B) $x = 1$
  <!-- feedback: Incorrecto. Se escribió $3x - 1$ en lugar de $3(x - 1) = 3x - 3$: faltó distribuir el 3. -->
- [ ] C) $x = -3$
  <!-- feedback: Incorrecto. Error de signo al despejar: de $2x = 3x - 3$ se obtiene $-x = -3$, es decir $x = 3$. -->
- [ ] D) No tiene solución, porque las bases son distintas
  <!-- feedback: Incorrecto. Las bases 4 y 8 son potencias de 2; al reescribirlas en base 2 la ecuación sí tiene solución. -->

### Explicacion Pedagogica
Se reescriben las bases: $4 = 2^2$ y $8 = 2^3$. Queda $2^{2x} = 2^{3(x-1)} = 2^{3x - 3}$. Igualando exponentes: $2x = 3x - 3 \Rightarrow x = 3$. Comprobación: $4^{3} = 64$ y $8^{3-1} = 8^2 = 64$.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.66
**Contexto:** En una planta de Duitama, un indicador técnico se modela con $f(x) = 2^{x} - 5$ y se quiere saber hacia qué valor tiende cuando $x$ es muy negativo.

### Enunciado
¿Cuál es la asíntota horizontal de la gráfica de $f(x) = 2^{x} - 5$?

### Opciones
- [ ] A) $y = 0$
  <!-- feedback: Incorrecto. $y = 0$ es la asíntota de $2^x$; el término $-5$ traslada la gráfica y también la asíntota. -->
- [ ] B) $y = 5$
  <!-- feedback: Incorrecto. Error de signo: restar 5 desplaza la gráfica hacia abajo, no hacia arriba. -->
- [ ] C) $x = -5$
  <!-- feedback: Incorrecto. Las exponenciales no tienen asíntotas verticales; la recta buscada es horizontal, de la forma $y = k$. -->
- [x] D) $y = -5$
  <!-- feedback: Correcto. Cuando $x \to -\infty$, $2^x \to 0$ y $f(x) \to 0 - 5 = -5$; la gráfica de $2^x$ se trasladó 5 unidades hacia abajo. -->

### Explicacion Pedagogica
La función básica $y = 2^{x}$ tiene asíntota $y = 0$ y rango $(0, \infty)$. Restar 5 desplaza toda la gráfica 5 unidades hacia abajo: la asíntota pasa a ser $y = -5$ y el rango es $(-5, \infty)$. Se confirma con el límite $\lim_{x \to -\infty}(2^{x} - 5) = -5$.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.63
**Contexto:** En Manizales, la temperatura de una taza de café, en °C, se modela con $T(t) = 20 + 70e^{-0.1t}$, con $t$ en minutos.

### Enunciado
¿Cuál es la interpretación correcta de los números 20 y 70 en el modelo?

### Opciones
- [ ] A) 20 °C es la temperatura inicial del café y 70 °C la temperatura final
  <!-- feedback: Incorrecto. $T(0) = 20 + 70e^{0} = 90$ °C; la temperatura inicial es 90, no 20, y el límite es 20, no 70. -->
- [x] B) 20 °C es la temperatura ambiente a la que tiende el café y 70 °C es la diferencia inicial entre el café y el ambiente
  <!-- feedback: Correcto. $T(0) = 20 + 70 = 90$ °C y, como $e^{-0.1t} \to 0$, $T(t) \to 20$ °C con el paso del tiempo. -->
- [ ] C) 70 °C es la temperatura a la que se estabiliza el café
  <!-- feedback: Incorrecto. El término $70e^{-0.1t}$ tiende a 0, así que la temperatura se estabiliza en 20 °C, no en 70. -->
- [ ] D) El café pierde 20 °C cada minuto hasta llegar a 70 °C
  <!-- feedback: Incorrecto. El modelo no es lineal; la diferencia con el ambiente se multiplica por $e^{-0.1} \approx 0.905$ cada minuto. -->

### Explicacion Pedagogica
En $T(t) = 20 + 70e^{-0.1t}$, el término exponencial decrece hacia 0. Por eso $\lim_{t \to \infty} T(t) = 20$: es la temperatura ambiente (asíntota horizontal). En $t = 0$, $T = 90$ °C, y la diferencia inicial con el ambiente es $90 - 20 = 70$ °C. Es el modelo de enfriamiento de Newton.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.61
**Contexto:** En Bogotá se rastrea una cadena de mensajes de WhatsApp: el día 0 la reciben 5 personas, el día 1 la reciben 15, el día 2 la reciben 45 y el día 3 la reciben 135.

### Enunciado
¿Qué función describe el número de personas $y$ que reciben la cadena el día $x$?

### Opciones
- [ ] A) $y = 3 \cdot 5^{x}$
  <!-- feedback: Incorrecto. Se intercambiaron valor inicial y factor: en $x = 0$ daría 3, no 5, y en $x = 1$ daría 15 pero en $x = 2$ daría 75. -->
- [ ] B) $y = 5 + 10x$
  <!-- feedback: Incorrecto. Es lineal: daría 25 en $x = 2$; las diferencias 10, 30, 90 no son constantes, así que no es lineal. -->
- [x] C) $y = 5 \cdot 3^{x}$
  <!-- feedback: Correcto. El cociente entre días consecutivos es constante: $\frac{15}{5} = \frac{45}{15} = \frac{135}{45} = 3$, y el valor inicial es 5. -->
- [ ] D) $y = 5x^{3}$
  <!-- feedback: Incorrecto. Coincide en $x = 3$ (135) pero en $x = 0$ da 0 y en $x = 1$ da 5; además la variable está en la base, no en el exponente. -->

### Explicacion Pedagogica
Una tabla es exponencial si los cocientes consecutivos son constantes. Aquí $\frac{15}{5} = \frac{45}{15} = \frac{135}{45} = 3$, así que $b = 3$; el valor en $x = 0$ es $c = 5$. Entonces $y = 5 \cdot 3^{x}$. Comprobación: $5 \cdot 3^2 = 45$ y $5 \cdot 3^3 = 135$.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.59
**Contexto:** En Barranquilla, Jorge quiere invertir 1 000 000 COP por un año: el banco A paga 12% anual simple y el banco B paga 1% mensual compuesto.

### Enunciado
¿Qué banco le conviene más a Jorge y por qué?

### Opciones
- [x] A) El banco B: obtiene $1\,000\,000 \cdot 1.01^{12} \approx 1\,126\,825$ COP, frente a 1 120 000 COP del banco A
  <!-- feedback: Correcto. El compuesto mensual da $1.01^{12} \approx 1.1268$, una tasa efectiva anual de 12.68%, mayor que 12%. -->
- [ ] B) Da lo mismo, porque 1% mensual equivale exactamente a 12% anual
  <!-- feedback: Incorrecto. Eso solo vale en interés simple; con capitalización mensual los intereses generan intereses y el factor es $1.01^{12} \approx 1.1268$. -->
- [ ] C) El banco A, porque 12% es mayor que 1%
  <!-- feedback: Incorrecto. Se compararon tasas con distinto periodo; hay que llevarlas al mismo plazo de un año. -->
- [ ] D) El banco A: obtiene 1 120 000 COP, frente a 1 010 000 COP del banco B
  <!-- feedback: Incorrecto. 1 010 000 COP es el saldo de B tras un solo mes; en 12 meses el 1% se aplica 12 veces. -->

### Explicacion Pedagogica
Banco A: $1\,000\,000(1 + 0.12) = 1\,120\,000$ COP. Banco B: $1\,000\,000(1.01)^{12} \approx 1\,126\,825$ COP. La diferencia, unos 6 825 COP, se debe a que en B cada mes se ganan intereses sobre los intereses anteriores. Por eso la tasa efectiva anual de B es $1.01^{12} - 1 \approx 12.68\%$.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.57
**Contexto:** Un analista de Pereira usa el modelo $f(x) = (k - 2)^{x}$ y necesita que la función sea exponencial y decreciente.

### Enunciado
¿Para qué valores de $k$ la función $f(x) = (k - 2)^{x}$ es una exponencial decreciente?

### Opciones
- [x] A) $2 < k < 3$
  <!-- feedback: Correcto. Una exponencial $b^x$ es decreciente si $0 < b < 1$; con $b = k - 2$ queda $0 < k - 2 < 1$, es decir $2 < k < 3$. -->
- [ ] B) $k < 3$
  <!-- feedback: Incorrecto. Incluye valores como $k = 2$ (base 0) o $k = 1$ (base $-1$), que no dan una función exponencial. -->
- [ ] C) $k > 3$
  <!-- feedback: Incorrecto. Con $k > 3$ la base $k - 2$ es mayor que 1 y la función es creciente. -->
- [ ] D) $0 < k < 1$
  <!-- feedback: Incorrecto. Se aplicó la condición $0 < b < 1$ a $k$ en vez de a la base $k - 2$; con $k = 0.5$ la base sería $-1.5$. -->

### Explicacion Pedagogica
Para que $b^{x}$ sea exponencial se exige $b > 0$ y $b \ne 1$; es decreciente si además $b < 1$. Con $b = k - 2$: $0 < k - 2 < 1$. Sumando 2: $2 < k < 3$. Por ejemplo, $k = 2.5$ da $f(x) = 0.5^{x}$, que es decreciente.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.55
**Contexto:** En un laboratorio de Bucaramanga, una muestra de una sustancia radiactiva pasa de 200 g a 25 g en 15 días.

### Enunciado
¿Cuál es la vida media de la sustancia?

### Opciones
- [ ] A) 7.5 días
  <!-- feedback: Incorrecto. Se dividió 15 entre 2, como si hubieran sido 2 reducciones a la mitad; $200 \to 100 \to 50$ no llega a 25. -->
- [ ] B) 1.875 días
  <!-- feedback: Incorrecto. Se dividió 15 entre 8, el factor de reducción; hay que dividir entre el número de mitades, $\log_{2} 8 = 3$. -->
- [ ] C) 3 días
  <!-- feedback: Incorrecto. 3 es el número de vidas medias transcurridas, no la duración de cada una. -->
- [x] D) 5 días
  <!-- feedback: Correcto. $\frac{25}{200} = \frac{1}{8} = \left(\frac{1}{2}\right)^3$: hubo 3 vidas medias en 15 días, cada una de $\frac{15}{3} = 5$ días. -->

### Explicacion Pedagogica
Se compara la cantidad final con la inicial: $\frac{25}{200} = \frac{1}{8} = \left(\frac{1}{2}\right)^{3}$. Así, en 15 días ocurrieron 3 reducciones a la mitad ($200 \to 100 \to 50 \to 25$). La vida media es $T = \frac{15}{3} = 5$ días. Con el modelo: $200 \cdot \left(\frac{1}{2}\right)^{15/T} = 25 \Rightarrow \frac{15}{T} = 3$.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.53
**Contexto:** En una clase de Armenia se comparan las funciones $f(x) = 2^{x}$ y $g(x) = x^{2}$ para $x > 0$.

### Enunciado
¿Para qué valores positivos de $x$ se cumple $2^{x} < x^{2}$?

### Opciones
- [ ] A) Para $0 < x < 2$
  <!-- feedback: Incorrecto. Ahí ocurre lo contrario: con $x = 1$, $2^1 = 2 > 1 = 1^2$. -->
- [x] B) Para $2 < x < 4$
  <!-- feedback: Correcto. Las gráficas se cortan en $x = 2$ ($4 = 4$) y $x = 4$ ($16 = 16$); entre ellas, por ejemplo $2^3 = 8 < 9 = 3^2$. -->
- [ ] C) Para $x > 4$
  <!-- feedback: Incorrecto. Después de $x = 4$ la exponencial supera a la cuadrática: con $x = 5$, $32 > 25$. -->
- [ ] D) Para ningún $x > 0$, porque una exponencial siempre es mayor que una potencia
  <!-- feedback: Incorrecto. La exponencial domina solo a largo plazo; con $x = 3$ se tiene $8 < 9$. -->

### Explicacion Pedagogica
Se buscan los cortes: $2^2 = 4 = 2^2$ y $2^4 = 16 = 4^2$. Se prueba un valor en cada tramo: $x = 1$: $2 > 1$; $x = 3$: $8 < 9$; $x = 5$: $32 > 25$. Por lo tanto $2^x < x^2$ solo en $(2, 4)$. A partir de $x = 4$ la exponencial crece más rápido y nunca vuelve a quedar por debajo.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.50
**Contexto:** En Valledupar, Kevin resuelve $2 \cdot 3^{x} = 18$ escribiendo primero $6^{x} = 18$ y luego $x = \log_{6} 18 \approx 1.61$.

### Enunciado
¿Cuál evaluación del procedimiento de Kevin es correcta?

### Opciones
- [ ] A) Es correcto; la solución es $x = \log_{6} 18$
  <!-- feedback: Incorrecto. Con $x \approx 1.61$: $2 \cdot 3^{1.61} \approx 11.7 \ne 18$; el resultado no verifica la ecuación. -->
- [ ] B) Es incorrecto: debía escribir $3^{2x} = 18$
  <!-- feedback: Incorrecto. El 2 multiplica a la potencia; no se convierte en exponente. $3^{2x}$ sería $(3^x)^2$. -->
- [x] C) Es incorrecto: $2 \cdot 3^{x} \ne 6^{x}$; dividiendo entre 2 queda $3^{x} = 9$, así que $x = 2$
  <!-- feedback: Correcto. El 2 no está elevado a la $x$; solo se pueden multiplicar bases si ambas tienen el mismo exponente. Con $x = 2$: $2 \cdot 9 = 18$. -->
- [ ] D) Es incorrecto: la solución es $x = \frac{18}{6} = 3$
  <!-- feedback: Incorrecto. Con $x = 3$: $2 \cdot 27 = 54 \ne 18$; además se mantuvo el error de juntar $2 \cdot 3$. -->

### Explicacion Pedagogica
La ley $a^{x} b^{x} = (ab)^{x}$ exige que ambos factores tengan exponente $x$; en $2 \cdot 3^{x}$ el 2 tiene exponente 1. Lo correcto es aislar la potencia: $3^{x} = \frac{18}{2} = 9 = 3^{2}$, de donde $x = 2$. Verificación: $2 \cdot 3^2 = 18$.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.48
**Contexto:** Un periódico de Cúcuta afirma que una población que crece 5% anual se duplica en 20 años, "porque $5\% \times 20 = 100\%$".

### Enunciado
¿Cuál evaluación de la afirmación es correcta?

### Opciones
- [ ] A) Es verdadera, porque 5% durante 20 años suma 100%
  <!-- feedback: Incorrecto. Sumar porcentajes supone crecimiento lineal; el 5% se aplica cada año sobre una población cada vez mayor. -->
- [x] B) Es falsa: con crecimiento compuesto, $1.05^{t} = 2$ da $t = \frac{\ln 2}{\ln 1.05} \approx 14.2$ años
  <!-- feedback: Correcto. En 20 años el factor sería $1.05^{20} \approx 2.65$, más del doble; el doble se alcanza hacia los 14.2 años. -->
- [ ] C) Es falsa: tarda unos 40 años
  <!-- feedback: Incorrecto. Al crecer de forma compuesta tarda menos, no más, que el cálculo lineal de 20 años. -->
- [ ] D) Es falsa: se duplica en 10 años
  <!-- feedback: Incorrecto. $1.05^{10} \approx 1.63$; en 10 años la población solo aumenta 63%. -->

### Explicacion Pedagogica
El modelo es $P(t) = P_0 \cdot 1.05^{t}$. Se duplica cuando $1.05^{t} = 2$: $t = \frac{\ln 2}{\ln 1.05} \approx \frac{0.6931}{0.0488} \approx 14.2$ años. El razonamiento del periódico trata el porcentaje como si se sumara sobre la población inicial; en realidad se compone, y $1.05^{20} \approx 2.65$.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Variacional
**Expected_Success:** 0.47
**Contexto:** En Neiva, el saldo de una inversión al final de cada año fue: 100, 110, 121 y 133.1 (en miles de pesos).

### Enunciado
¿Cuál modelo describe los datos y con qué argumento?

### Opciones
- [ ] A) Lineal, porque el saldo aumenta 10 cada año
  <!-- feedback: Incorrecto. Los aumentos son 10, 11 y 12.1; no son constantes, así que el modelo no es lineal. -->
- [x] B) Exponencial, porque el cociente entre años consecutivos es constante e igual a 1.1
  <!-- feedback: Correcto. $\frac{110}{100} = \frac{121}{110} = \frac{133.1}{121} = 1.1$: cada año el saldo se multiplica por 1.1. -->
- [ ] C) Lineal con pendiente 11, el aumento promedio de cada año
  <!-- feedback: Incorrecto. Un promedio de aumentos no hace lineal un modelo cuyos aumentos crecen; la razón constante 1.1 indica exponencial. -->
- [ ] D) Cuadrático, porque las diferencias segundas son constantes
  <!-- feedback: Incorrecto. Las diferencias son 10, 11, 12.1 y las segundas 1 y 1.1; no son constantes. -->

### Explicacion Pedagogica
Para decidir el modelo se revisan diferencias y cocientes. Diferencias: $10, 11, 12.1$ (no constantes, no es lineal); diferencias segundas: $1, 1.1$ (no constantes, no es cuadrático). Cocientes: $1.1, 1.1, 1.1$ (constantes). El modelo es $S(n) = 100 \cdot 1.1^{n}$, un crecimiento del 10% anual.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W07-exponenciales-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.45
**Contexto:** En un hospital de Medellín se administran 100 mg de dos medicamentos: A tiene vida media de 4 horas y B pierde el 15% de la cantidad presente cada hora.

### Enunciado
¿Cuál medicamento conserva más cantidad en el cuerpo después de 8 horas?

### Opciones
- [ ] A) A, con 25 mg, porque B pierde $8 \times 15\% = 120\%$ y se elimina por completo
  <!-- feedback: Incorrecto. El 15% se calcula sobre lo que queda cada hora, no sobre los 100 mg iniciales; B nunca llega a 0. -->
- [ ] B) A, con 50 mg, frente a 27.2 mg de B
  <!-- feedback: Incorrecto. En 8 horas hay dos vidas medias de A, no una: $100 \to 50 \to 25$ mg. -->
- [x] C) B, con unos 27.2 mg, frente a 25 mg de A
  <!-- feedback: Correcto. A: $100 \cdot \left(\frac{1}{2}\right)^{2} = 25$ mg. B: $100 \cdot 0.85^{8} \approx 27.25$ mg. -->
- [ ] D) Ambos igual, porque perder 15% por hora equivale a perder 50% cada 4 horas
  <!-- feedback: Incorrecto. $0.85^4 \approx 0.522$: en 4 horas B conserva 52.2%, no 50%. -->

### Explicacion Pedagogica
A: 8 horas son 2 vidas medias, $100 \cdot \left(\frac{1}{2}\right)^{2} = 25$ mg. B: cada hora queda el 85%, $100 \cdot 0.85^{8} \approx 27.25$ mg. Como $27.25 > 25$, B conserva más. La clave es comparar los factores: en 4 horas B conserva $0.85^{4} \approx 0.522$ del medicamento y A conserva $0.5$.
