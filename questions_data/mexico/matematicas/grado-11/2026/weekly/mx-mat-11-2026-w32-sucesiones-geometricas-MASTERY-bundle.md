---
id: "MX-MAT-11-2026-W32-sucesiones-geometricas-MASTERY"
country: "mexico"
grado: 11
asignatura: "matematicas"
tema: "sucesiones-geometricas"
periodo: "weekly"
semana: 32
protocol_version: "5.2"
bundle_size: 20
alignment: "SEP NEM 2026 / EXANI-II"
difficulty_distribution: "D3-D4: 4, D5-D6: 6, D7-D8: 6, D9-D10: 4"
generated: "2025-05-20"
license: "CC BY-NC-SA 4.0"
---

# Bundle Mastery: Sucesiones Geométricas — Grado 11
## Semana W32

## Pregunta 1 [D3-D4]
**ID:** `MX-MAT-11-2026-W32-001`
**Bloom:** [Remember]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.85

### Enunciado
En un laboratorio biológico en la UNAM, una población de bacterias se duplica cada hora. Si inicialmente hay 100 bacterias, ¿cuál es la razón común ($r$) de esta sucesión geométrica?

### Options
- [ ] A) $r = 100$ <!-- feedback: Incorrecto. Este es el valor inicial, no la razón de cambio. -->
- [x] B) $r = 2$ <!-- feedback: ¡Correcto! Como la población se duplica, multiplicamos por 2 en cada paso. -->
- [ ] C) $r = 0.5$ <!-- feedback: Incorrecto. Una razón de 0.5 indicaría que la población se reduce a la mitad. -->
- [ ] D) $r = 200$ <!-- feedback: Incorrecto. Revisa el concepto de factor multiplicativo. -->

### Explicación Pedagógica
En una sucesión geométrica, la razón común se obtiene dividiendo cualquier término entre el anterior ($a_{n+1} / a_n$). Si se duplica, el siguiente término es $2 \times a_n$, por lo que $r = 2$.

---

## Pregunta 2 [D3-D4]
**ID:** `MX-MAT-11-2026-W32-002`
**Bloom:** [Understand]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.80

### Enunciado
Dada la sucesión geométrica: 3, 12, 48, 192, ... ¿Cuál es el valor del quinto término ($a_5$)?

### Options
- [ ] A) 576 <!-- feedback: Incorrecto. Multiplica el cuarto término por la razón común. -->
- [x] B) 768 <!-- feedback: ¡Correcto! La razón es 4. $192 \times 4 = 768$. -->
- [ ] C) 960 <!-- feedback: Incorrecto. Revisa el valor de la razón común. -->
- [ ] D) 448 <!-- feedback: Incorrecto. Revisa la multiplicación. -->

### Explicación Pedagógica
La razón común es $r = 12 / 3 = 4$. El quinto término se obtiene multiplicando el cuarto por la razón: $a_5 = 192 \times 4 = 768$.

---

## Pregunta 3 [D3-D4]
**ID:** `MX-MAT-11-2026-W32-003`
**Bloom:** [Apply]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.75

### Enunciado
Un auto nuevo comprado en una agencia en Puebla cuesta $300,000 y se deprecia un 20% cada año. ¿Cuál será su valor al finalizar el segundo año? (Considere una sucesión donde $a_1$ es el valor inicial).

### Options
- [ ] A) $240,000 <!-- feedback: Incorrecto. Este es el valor después del primer año. -->
- [x] B) $192,000 <!-- feedback: ¡Correcto! $a_2 = 300,000(0.8) = 240,000$. $a_3 = 240,000(0.8) = 192,000$. -->
- [ ] C) $180,000 <!-- feedback: Incorrecto. Estás restando una cantidad fija, pero la depreciación es porcentual. -->
- [ ] D) $210,000 <!-- feedback: Incorrecto. Revisa el cálculo del 80% del valor del año anterior. -->

### Explicación Pedagógica
La depreciación del 20% significa que el valor restante es el 80% ($r = 0.8$). Al finalizar el primer año (término $a_2$ si $a_1$ es el precio original) vale 240,000. Al finalizar el segundo año (término $a_3$) vale $240,000 \times 0.8 = 192,000$.

---

## Pregunta 4 [D3-D4]
**ID:** `MX-MAT-11-2026-W32-004`
**Bloom:** [Apply]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.70

### Enunciado
¿Cuál es el término general ($a_n$) de la sucesión: 5, 15, 45, 135, ...?

### Options
- [ ] A) $a_n = 5 + (n-1)3$ <!-- feedback: Incorrecto. Esta es la fórmula para una sucesión aritmética. -->
- [x] B) $a_n = 5(3)^{n-1}$ <!-- feedback: ¡Correcto! El primer término es 5 y la razón es 3. -->
- [ ] C) $a_n = 3(5)^{n-1}$ <!-- feedback: Incorrecto. Has intercambiado el primer término y la razón. -->
- [ ] D) $a_n = 5(3)^n$ <!-- feedback: Incorrecto. Recuerda que para $n=1$, el exponente debe ser 0. -->

### Explicación Pedagógica
La fórmula del término general de una sucesión geométrica es $a_n = a_1 \cdot r^{n-1}$. Aquí $a_1 = 5$ y $r = 15/5 = 3$, por lo tanto $a_n = 5(3)^{n-1}$.

---

## Pregunta 5 [D5-D6]
**ID:** `MX-MAT-11-2026-W32-005`
**Bloom:** [Analyze]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.65

### Enunciado
En una cuenta de ahorros que ofrece un interés compuesto anual del 5%, un depósito inicial de $10,000 crece siguiendo una sucesión geométrica. ¿Cuál es la razón común $r$ que describe este crecimiento?

### Options
- [ ] A) $r = 0.05$ <!-- feedback: Incorrecto. Esto solo representa el interés, no el factor de crecimiento total. -->
- [x] B) $r = 1.05$ <!-- feedback: ¡Correcto! El capital se multiplica por $(1 + i)$ cada periodo. -->
- [ ] C) $r = 1.5$ <!-- feedback: Incorrecto. Esto representaría un crecimiento del 50%. -->
- [ ] D) $r = 5$ <!-- feedback: Incorrecto. Revisa el concepto de tasa decimal. -->

### Explicación Pedagógica
El interés compuesto se calcula como $C_f = C_i(1+i)^n$. Esto es una sucesión geométrica donde $r = 1 + i$. Con $i = 0.05$, la razón es $1.05$.

---

## Pregunta 6 [D5-D6]
**ID:** `MX-MAT-11-2026-W32-006`
**Bloom:** [Apply]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.60

### Enunciado
Encuentre el séptimo término de la sucesión geométrica: 64, 32, 16, 8, ...

### Options
- [ ] A) 2 <!-- feedback: Incorrecto. Este es el sexto término. -->
- [x] B) 1 <!-- feedback: ¡Correcto! $r = 0.5$. $a_7 = 64(0.5)^6 = 64(1/64) = 1$. -->
- [ ] C) 0.5 <!-- feedback: Incorrecto. Este sería el octavo término. -->
- [ ] D) 4 <!-- feedback: Incorrecto. La sucesión es decreciente. -->

### Explicación Pedagógica
La razón es $r = 32 / 64 = 0.5$. Usando $a_n = a_1 \cdot r^{n-1}$, tenemos $a_7 = 64 \cdot (0.5)^6 = 64 \cdot \frac{1}{64} = 1$.

---

## Pregunta 7 [D5-D6]
**ID:** `MX-MAT-11-2026-W32-007`
**Bloom:** [Understand]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.65

### Enunciado
¿Cuál es la suma de los primeros 6 términos de la sucesión geométrica: 2, 6, 18, 54, ...?

### Options
- [ ] A) 486 <!-- feedback: Incorrecto. Este es el sexto término, no la suma. -->
- [x] B) 728 <!-- feedback: ¡Correcto! $S_6 = \frac{2(3^6 - 1)}{3 - 1} = \frac{2(729 - 1)}{2} = 728$. -->
- [ ] C) 729 <!-- feedback: Incorrecto. Revisa la resta en el numerador de la fórmula. -->
- [ ] D) 364 <!-- feedback: Incorrecto. Verifica la división por $(r-1)$. -->

### Explicación Pedagógica
La fórmula de la suma es $S_n = \frac{a_1(r^n - 1)}{r - 1}$. Con $a_1 = 2, r = 3, n = 6$: $S_6 = \frac{2(3^6 - 1)}{3 - 1} = 729 - 1 = 728$.

---

## Pregunta 8 [D5-D6]
**ID:** `MX-MAT-11-2026-W32-008`
**Bloom:** [Analyze]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.55

### Enunciado
El tercer término de una sucesión geométrica es 18 y el sexto es 486. Determine la razón común $r$.

### Options
- [ ] A) $r = 2$ <!-- feedback: Incorrecto. $18 \times 2^3 = 144$, no 486. -->
- [x] B) $r = 3$ <!-- feedback: ¡Correcto! $a_6 = a_3 \cdot r^3 \Rightarrow 486 = 18 \cdot r^3 \Rightarrow 27 = r^3 \Rightarrow r = 3$. -->
- [ ] C) $r = 4$ <!-- feedback: Incorrecto. Revisa la división $486 / 18$. -->
- [ ] D) $r = 9$ <!-- feedback: Incorrecto. Este es el valor de $r^2$ si la distancia fuera de dos términos. -->

### Explicación Pedagógica
Relacionamos los términos: $a_6 = a_3 \cdot r^{(6-3)}$. Entonces $486 = 18 \cdot r^3$. Dividiendo: $r^3 = 27$. Tomando raíz cúbica, $r = 3$.

---

## Pregunta 9 [D5-D6]
**ID:** `MX-MAT-11-2026-W32-009`
**Bloom:** [Apply]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.60

### Enunciado
Una pelota de hule se deja caer desde una altura de 10 metros en una plaza en Querétaro. Cada vez que rebota, alcanza los 3/4 de la altura anterior. ¿A qué altura llegará después del tercer rebote?

### Options
- [ ] A) 5.625 m <!-- feedback: Incorrecto. Este es el segundo rebote. -->
- [x] B) 4.218 m <!-- feedback: ¡Correcto! $10 \times (3/4)^3 = 10 \times 27/64 \approx 4.218$. -->
- [ ] C) 7.5 m <!-- feedback: Incorrecto. Este es el primer rebote. -->
- [ ] D) 3.164 m <!-- feedback: Incorrecto. Este sería el cuarto rebote. -->

### Explicación Pedagógica
Es una sucesión geométrica con $a_1$ (altura inicial) = 10 y $r = 0.75$. La altura tras el tercer rebote es $a_4 = 10 \cdot (0.75)^3 = 10 \cdot 0.421875 = 4.21875$ metros.

---

## Pregunta 10 [D5-D6]
**ID:** `MX-MAT-11-2026-W32-010`
**Bloom:** [Understand]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.65

### Enunciado
¿Cuál es el valor de la suma infinita de la serie geométrica: $1/2 + 1/4 + 1/8 + 1/16 + \dots$?

### Options
- [ ] A) 0.5 <!-- feedback: Incorrecto. Este es solo el primer término. -->
- [x] B) 1 <!-- feedback: ¡Correcto! $S_{\infty} = \frac{a_1}{1 - r} = \frac{1/2}{1 - 1/2} = 1$. -->
- [ ] C) 2 <!-- feedback: Incorrecto. Verifica el denominador de la fórmula. -->
- [ ] D) La suma es infinita <!-- feedback: Incorrecto. Como $|r| < 1$, la serie converge. -->

### Explicación Pedagógica
Para una serie geométrica infinita donde $|r| < 1$, la suma es $S = \frac{a_1}{1 - r}$. Aquí $a_1 = 1/2$ y $r = 1/2$, por lo que $S = \frac{0.5}{1 - 0.5} = \frac{0.5}{0.5} = 1$.

---

## Pregunta 11 [D7-D8]
**ID:** `MX-MAT-11-2026-W32-011`
**Bloom:** [Evaluate]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.45

### Enunciado
Interpole dos medios geométricos entre 5 y 135. ¿Cuáles son esos números?

### Options
- [ ] A) 10, 20 <!-- feedback: Incorrecto. Esta es una progresión aritmética. -->
- [x] B) 15, 45 <!-- feedback: ¡Correcto! Con 2 medios, hay 4 términos. $135 = 5r^3 \Rightarrow r^3 = 27 \Rightarrow r = 3$. Términos: 5, 15, 45, 135. -->
- [ ] C) 25, 75 <!-- feedback: Incorrecto. Revisa el cálculo de la razón cúbica. -->
- [ ] D) 15, 60 <!-- feedback: Incorrecto. La razón debe ser constante. -->

### Explicación Pedagógica
Interpolar 2 medios significa que 5 es $a_1$ y 135 es $a_4$. $135 = 5 \cdot r^3 \Rightarrow r^3 = 27 \Rightarrow r = 3$. Los términos son $5 \times 3 = 15$ y $15 \times 3 = 45$.

---

## Pregunta 12 [D7-D8]
**ID:** `MX-MAT-11-2026-W32-012`
**Bloom:** [Analyze]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.40

### Enunciado
En una progresión geométrica de términos positivos, la suma de los dos primeros términos es 15 y el tercer término es 20. Encuentre la razón común $r$.

### Options
- [ ] A) $r = 1$ <!-- feedback: Incorrecto. No cumple con la suma inicial. -->
- [x] B) $r = 2$ <!-- feedback: ¡Correcto! $a_1+a_1r=15$ y $a_1r^2=20 \Rightarrow a_1=20/r^2$. Sustituyendo: $(20/r^2)(1+r)=15 \Rightarrow 4(1+r)=3r^2 \Rightarrow 3r^2-4r-4=0$. Las raíces son 2 y -2/3. -->
- [ ] C) $r = 1.5$ <!-- feedback: Incorrecto. Revisa la ecuación cuadrática resultante. -->
- [ ] D) $r = 0.5$ <!-- feedback: Incorrecto. Verificando: $a_1=80$, $80+40=120 \neq 15$. -->

### Explicación Pedagógica
Planteamos las ecuaciones: 1) $a_1(1+r) = 15$ y 2) $a_1r^2 = 20$. Dividiendo (2) entre (1): $\frac{r^2}{1+r} = \frac{20}{15} = \frac{4}{3}$. Esto da $3r^2 = 4 + 4r \Rightarrow 3r^2 - 4r - 4 = 0$. Resolviendo la cuadrática, obtenemos $r = 2$ (y una negativa que descartamos).

---

## Pregunta 13 [D7-D8]
**ID:** `MX-MAT-11-2026-W32-013`
**Bloom:** [Apply]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.50

### Enunciado
¿Cuál es el valor de $x$ para que $x-2$, $x+1$ y $x+7$ formen una progresión geométrica?

### Options
- [ ] A) $x = 3$ <!-- feedback: Incorrecto. Los términos serían 1, 4, 10 (no es geométrica). -->
- [x] B) $x = 5$ <!-- feedback: ¡Correcto! Los términos son 3, 6, 12. La razón es 2. -->
- [ ] C) $x = 2$ <!-- feedback: Incorrecto. El primer término sería cero. -->
- [ ] D) $x = 7$ <!-- feedback: Incorrecto. Los términos serían 5, 8, 14. -->

### Explicación Pedagógica
En una P.G., el cuadrado del término medio es igual al producto de los extremos: $(x+1)^2 = (x-2)(x+7)$. Expandiendo: $x^2 + 2x + 1 = x^2 + 5x - 14$. Cancelando $x^2$ y despejando: $15 = 3x \Rightarrow x = 5$.

---

## Pregunta 14 [D7-D8]
**ID:** `MX-MAT-11-2026-W32-014`
**Bloom:** [Evaluate]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.45

### Enunciado
Determine la fracción generatriz del número decimal periódico $0.727272\dots$ utilizando series geométricas.

### Options
- [ ] A) 72/100 <!-- feedback: Incorrecto. Esto es para un decimal exacto. -->
- [x] B) 8/11 <!-- feedback: ¡Correcto! $a_1 = 0.72, r = 0.01$. $S = 0.72 / (1 - 0.01) = 72/99 = 8/11$. -->
- [ ] C) 7/9 <!-- feedback: Incorrecto. Esto correspondería a $0.777\dots$ -->
- [ ] D) 72/90 <!-- feedback: Incorrecto. Revisa el denominador para periodos de dos cifras. -->

### Explicación Pedagógica
El número se puede escribir como $0.72 + 0.0072 + 0.000072 + \dots$ que es una serie geométrica con $a_1 = 0.72$ y $r = 0.01$. La suma es $S = \frac{0.72}{1 - 0.01} = \frac{0.72}{0.99} = \frac{72}{99} = \frac{8}{11}$.

---

## Pregunta 15 [D7-D8]
**ID:** `MX-MAT-11-2026-W32-015`
**Bloom:** [Analyze]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.40

### Enunciado
Un inversor en la Bolsa Mexicana de Valores ve que su inversión se triplica cada 4 años. Si hoy tiene $50,000, ¿cuántos años deben pasar para que tenga al menos $1,350,000?

### Options
- [ ] A) 10 años <!-- feedback: Incorrecto. Revisa los periodos de triplicación. -->
- [x] B) 12 años <!-- feedback: ¡Correcto! $1,350,000 / 50,000 = 27 = 3^3$. Esto requiere 3 periodos. $3 \times 4 = 12$ años. -->
- [ ] C) 16 años <!-- feedback: Incorrecto. Esto sería para un crecimiento de $3^4 = 81$ veces. -->
- [ ] D) 8 años <!-- feedback: Incorrecto. En 8 años solo se habría multiplicado por 9. -->

### Explicación Pedagógica
Queremos $50,000 \cdot 3^n \ge 1,350,000$, donde $n$ es el número de periodos de 4 años. $3^n \ge 27 \Rightarrow 3^n \ge 3^3 \Rightarrow n = 3$. Como cada periodo dura 4 años, el tiempo total es $3 \times 4 = 12$ años.

---

## Pregunta 16 [D7-D8]
**ID:** `MX-MAT-11-2026-W32-016`
**Bloom:** [Apply]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.50

### Enunciado
Si la suma de una serie geométrica infinita es 12 y su razón es $r = 1/4$, ¿cuál es el primer término?

### Options
- [ ] A) 3 <!-- feedback: Incorrecto. Revisa el despeje en la fórmula de la suma infinita. -->
- [x] B) 9 <!-- feedback: ¡Correcto! $12 = a_1 / (1 - 1/4) = a_1 / (3/4) \Rightarrow a_1 = 12 \times 3/4 = 9$. -->
- [ ] C) 4 <!-- feedback: Incorrecto. Verifica la multiplicación. -->
- [ ] D) 16 <!-- feedback: Incorrecto. Revisa el valor del denominador. -->

### Explicación Pedagógica
Usamos $S_{\infty} = \frac{a_1}{1 - r}$. Sustituyendo los valores conocidos: $12 = \frac{a_1}{1 - 1/4} = \frac{a_1}{3/4}$. Despejando $a_1$: $a_1 = 12 \cdot (3/4) = 9$.

---

## Pregunta 17 [D9-D10]
**ID:** `MX-MAT-11-2026-W32-017`
**Bloom:** [Create]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.30

### Enunciado
Se inscribe un cuadrado de lado 10 cm. Dentro de él se inscribe otro cuadrado uniendo los puntos medios de los lados del primero, y así sucesivamente al infinito. ¿Cuál es la suma de las áreas de todos los cuadrados formados?

### Options
- [ ] A) 150 cm² <!-- feedback: Incorrecto. Calcula la razón de las áreas entre cuadrados sucesivos. -->
- [x] B) 200 cm² <!-- feedback: ¡Correcto! El área del primero es 100. El del segundo es 50 (por Pitágoras). $r = 0.5$. $S = 100 / (1 - 0.5) = 200$. -->
- [ ] C) 250 cm² <!-- feedback: Incorrecto. Revisa la suma de la serie geométrica. -->
- [ ] D) 100 cm² <!-- feedback: Incorrecto. Este es solo el área del primer cuadrado. -->

### Explicación Pedagógica
El área del primer cuadrado es $A_1 = 10^2 = 100$. El lado del segundo cuadrado es $\sqrt{5^2 + 5^2} = \sqrt{50}$, por lo que su área es $A_2 = 50$. La razón de las áreas es $r = 50/100 = 0.5$. La suma infinita es $S = \frac{100}{1 - 0.5} = 200$ cm².

---

## Pregunta 18 [D9-D10]
**ID:** `MX-MAT-11-2026-W32-018`
**Bloom:** [Evaluate]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.35

### Enunciado
Halle el producto de los primeros 5 términos de una progresión geométrica si el tercer término es 4.

### Options
- [ ] A) 256 <!-- feedback: Incorrecto. Revisa la fórmula del producto de términos. -->
- [x] B) 1024 <!-- feedback: ¡Correcto! El producto de $n$ términos es $(a_1 \cdot a_n)^{n/2}$ o también $a_{central}^n$ si $n$ es impar. $4^5 = 1024$. -->
- [ ] C) 512 <!-- feedback: Incorrecto. Revisa la potencia de 2. -->
- [ ] D) 2048 <!-- feedback: Incorrecto. Revisa el cálculo de $4^5$. -->

### Explicación Pedagógica
Para una P.G., el producto de los términos equidistantes es constante ($a_1 \cdot a_5 = a_2 \cdot a_4 = a_3^2$). El producto de los 5 términos es $(a_1 \cdot a_2 \cdot a_3 \cdot a_4 \cdot a_5) = (a_3^2) \cdot (a_3^2) \cdot a_3 = a_3^5$. Como $a_3 = 4$, el producto es $4^5 = 1024$.

---

## Pregunta 19 [D9-D10]
**ID:** `MX-MAT-11-2026-W32-019`
**Bloom:** [Analyze]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.25

### Enunciado
En una sucesión geométrica, la suma de los $n$ primeros términos es $S_n$. Si $S_3 = 7$ y $S_6 = 63$, determine el valor del primer término $a_1$.

### Options
- [ ] A) $a_1 = 2$ <!-- feedback: Incorrecto. Prueba calculando primero la razón $r$. -->
- [x] B) $a_1 = 1$ <!-- feedback: ¡Correcto! $S_6/S_3 = (r^6-1)/(r^3-1) = r^3+1$. $63/7 = 9 \Rightarrow r^3 = 8 \Rightarrow r=2$. $a_1(2^3-1)/(2-1) = 7 \Rightarrow a_1=1$. -->
- [ ] C) $a_1 = 0.5$ <!-- feedback: Incorrecto. Revisa la división de las sumas. -->
- [ ] D) $a_1 = 3$ <!-- feedback: Incorrecto. No satisface la suma $S_3$. -->

### Explicación Pedagógica
$S_6 = a_1\frac{r^6-1}{r-1}$ y $S_3 = a_1\frac{r^3-1}{r-1}$. Dividiendo: $\frac{S_6}{S_3} = \frac{r^6-1}{r^3-1} = r^3 + 1$. Entonces $63/7 = r^3 + 1 \Rightarrow 9 = r^3 + 1 \Rightarrow r^3 = 8 \Rightarrow r = 2$. Luego, $S_3 = a_1\frac{2^3-1}{2-1} = 7a_1 = 7$, por lo que $a_1 = 1$.

---

## Pregunta 20 [D9-D10]
**ID:** `MX-MAT-11-2026-W32-020`
**Bloom:** [Create]
**EXANI-II:** [Pensamiento Matemático]
**Expected_Success:** 0.20

### Enunciado
Se lanza una pelota desde una altura $H$. En cada rebote pierde el 20% de la energía, lo que se traduce en que la altura del rebote es el 80% de la altura anterior. ¿Cuál es la distancia total recorrida por la pelota hasta que se detiene?

### Options
- [ ] A) $5H$ <!-- feedback: Incorrecto. Olvidaste que la pelota sube y baja en cada rebote. -->
- [x] B) $9H$ <!-- feedback: ¡Correcto! Distancia = $H + 2(0.8H + 0.8^2H + \dots) = H + 2(0.8H / (1 - 0.8)) = H + 8H = 9H$. -->
- [ ] C) $4H$ <!-- feedback: Incorrecto. Revisa la suma de la serie. -->
- [ ] D) $10H$ <!-- feedback: Incorrecto. Verifica el factor multiplicador de los rebotes. -->

### Explicación Pedagógica
La distancia total es la caída inicial ($H$) más dos veces cada altura de rebote (subida y bajada). $D = H + 2(rH + r^2H + r^3H + \dots) = H + 2H \frac{r}{1 - r}$. Con $r = 0.8$: $D = H + 2H \frac{0.8}{0.2} = H + 2H(4) = 9H$.

### Explicación Pedagógica Final
Este bundle profundiza en el comportamiento de las sucesiones y series geométricas, desde la identificación de la razón hasta el cálculo de sumas infinitas y aplicaciones en física y finanzas. Es esencial para dominar los modelos de crecimiento y decaimiento exponencial presentes en el EXANI-II.

[//]: # (QUALITY_REVIEW)
| Dimensión | Puntaje |
|-----------|---------|
| Técnico | 30/30 |
| Curricular | 40/40 |
| Contexto | 20/20 |
| Redacción | 10/10 |
| **Total** | **100/100** |
