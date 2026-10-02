---
id: "PY-MAT-11-2026-W03-tema-w03-001-MASTERY-bundle"
country: "paraguay"
grado: 11
asignatura: "matematicas"
tema: "tema-w03"
periodo: "weekly"
week: "W03"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "MEC - Curriculo Nacional Base / SNEPE"
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
bundle_index: 1
calibration: {difficulty_band: "D3-D10", expected_success: 0.65}
---
# Weekly Pack W03: Logaritmos y sus Propiedades (Grado 11)

Este bundle evalúa conceptos clave de Logaritmos y sus Propiedades alineados al currículo oficial del MEC de Paraguay.

---

## Question 1 [D3-D4]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v1
**Bloom:** Remember
**EJE:** Álgebra y funciones
**Expected_Success:** 0.82
**Contexto:** En Asunción, un grupo de estudiantes analiza la definición formal del logaritmo antes de resolver ejercicios de cálculo.

### Enunciado
¿Cómo se define formalmente el logaritmo $\log_b(a) = c$ para $b > 0$, $b \neq 1$ y $a > 0$?

### Opciones
- [ ] A) $a^c = b$ <!-- feedback: Incorrecto. Intercambió la base y el argumento: en la definición el argumento es el resultado de la potencia. -->
- [ ] B) $b^a = c$ <!-- feedback: Incorrecto. Esta relación coloca el resultado como exponente, y eso describe otra operación, no el logaritmo. -->
- [x] C) $b^c = a$ <!-- feedback: ¡Correcto! $b^c = a$ es la forma exponencial equivalente, porque $c$ es el exponente al que se eleva la base $b$ para obtener el argumento. -->
- [ ] D) $c^b = a$ <!-- feedback: Incorrecto. El exponente debe ser $c$ y la base $b$; invirtiéndolos se obtiene una potencia distinta de la buscada. -->

### Explicacion Pedagogica
Por definición, $\log_b(a) = c$ significa que $c$ es el exponente al que hay que elevar la base $b$ para obtener el argumento $a$; por eso la única escritura equivalente es $b^c = a$.

---

## Question 2 [D3-D4]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v2
**Bloom:** Understand
**EJE:** Álgebra y funciones
**Expected_Success:** 0.80
**Contexto:** En San Lorenzo, un grupo de estudiantes demuestra por qué el logaritmo de un producto se puede transformar en una suma.

### Enunciado
¿A qué es igual el logaritmo de un producto, es decir, $\log_b(x \cdot y)$?

### Opciones
- [ ] A) $\log_b(x) \cdot \log_b(y)$ <!-- feedback: Incorrecto. Los exponentes se suman, no se multiplican: $b^{p} \cdot b^{q} = b^{p+q}$. -->
- [x] B) $\log_b(x) + \log_b(y)$ <!-- feedback: ¡Correcto! El logaritmo de un producto es la suma de los logaritmos de los factores, porque $b^p \cdot b^q = b^{p+q}$. -->
- [ ] C) $\log_b(x + y)$ <!-- feedback: Incorrecto. La suma no es un producto, y no existe una propiedad que transforme $\log_b(x + y)$ de esa forma. -->
- [ ] D) $\log_b(x) - \log_b(y)$ <!-- feedback: Incorrecto. La resta de logaritmos corresponde al cociente, donde $b^p / b^q = b^{p-q}$. -->

### Explicacion Pedagogica
Como $b^{\log_b x} \cdot b^{\log_b y} = b^{\log_b x + \log_b y}$ y ambos productos valen $x \cdot y$, el logaritmo de un producto es la suma de los logaritmos de los factores, con $x > 0$ e $y > 0$.

---

## Question 3 [D3-D4]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v3
**Bloom:** Understand
**EJE:** Álgebra y funciones
**Expected_Success:** 0.77
**Contexto:** En Luque, un curso de matemática aplicada repasa las propiedades del cociente antes de usarlas en el cálculo de intereses bancarios.

### Enunciado
¿A qué es igual el logaritmo de un cociente, $\log_b\left(\frac{x}{y}\right)$, con $x > 0$ e $y > 0$?

### Opciones
- [x] A) $\log_b(x) - \log_b(y)$ <!-- feedback: ¡Correcto! Al dividir se restan los exponentes: $b^{p-q} = \dfrac{b^p}{b^q}$, por eso el cociente es una resta. -->
- [ ] B) $\log_b(x) + \log_b(y)$ <!-- feedback: Incorrecto. La suma corresponde al producto: $b^{p} \cdot b^{q} = b^{p+q}$, no a una división. -->
- [ ] C) $\dfrac{\log_b(x)}{\log_b(y)}$ <!-- feedback: Incorrecto. Ese cociente mide el exponente de $x$ respecto de $y$, no el logaritmo de la división. -->
- [ ] D) $\log_b(x - y)$ <!-- feedback: Incorrecto. El logaritmo de una resta no se separa: $x - y$ no es un producto de factores. -->

### Explicacion Pedagogica
Como $b^p / b^q = b^{p - q}$, el logaritmo de un cociente es la resta de los logaritmos: $\log_b\left(\frac{x}{y}\right) = \log_b(x) - \log_b(y)$. La suma queda reservada para los productos.

---

## Question 4 [D3-D4]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v4
**Bloom:** Apply
**EJE:** Álgebra y funciones
**Expected_Success:** 0.75
**Contexto:** En Encarnación, Liz administra una cuenta de ahorros cuyo capital se modela por $10^t$ y necesita saber cuándo llega a $10000$ guaraníes.

### Enunciado
En una cooperativa de Encarnación, Liz evalúa una cuenta de ahorros cuyo capital se modela por $10^t = 10000$. ¿En cuántos años se alcanza ese valor aplicando logaritmo común de base 10?

### Opciones
- [ ] A) 3 años <!-- feedback: Incorrecto. $\log_{10}(1000) = 3$ corresponde a mil, y el argumento del enunciado es diez mil. -->
- [ ] B) 5 años <!-- feedback: Incorrecto. $10^5 = 100000$, o sea cien mil, un orden de magnitud mayor que el valor solicitado. -->
- [ ] C) 2 años <!-- feedback: Incorrecto. $10^2 = 100$ es solo cien, dos órdenes de magnitud por debajo del capital modelado. -->
- [x] D) 4 años <!-- feedback: ¡Correcto! $\log_{10}(10000) = 4$ porque $10^4 = 10000$, y el argumento tiene cuatro ceros. -->

### Explicacion Pedagogica
Aplicando logaritmo en base 10 a $10^t = 10000$ se obtiene $t = \log_{10}(10000) = 4$ años, porque $10^4 = 10000$. El número de ceros del argumento da directamente el exponente.

---

## Question 5 [D5-D6]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v5
**Bloom:** Apply
**EJE:** Álgebra y funciones
**Expected_Success:** 0.72
**Contexto:** En Ciudad del Este, un laboratorio municipal sigue el crecimiento de un cultivo con el modelo $2^t = 64$ horas.

### Enunciado
Un cultivo de bacterias de Ciudad del Este se modela por $2^t = 64$, donde $t$ es el número de horas. ¿Cuántas horas se necesitan para alcanzar esa población?

### Opciones
- [ ] A) 8 horas <!-- feedback: Incorrecto. $2^8 = 256$ y $2^{10} = 1024$: un exponente de 8 se pasa con creces del objetivo de 64. -->
- [x] B) 6 horas <!-- feedback: ¡Correcto! $\log_2(64) = 6$ porque $2^6 = 64$, y ese exponente reconstruye exactamente el argumento. -->
- [ ] C) 3 horas <!-- feedback: Incorrecto. $2^3 = 8$ y $2^4 = 16$, todavía muy por debajo de las 64 unidades del modelo. -->
- [ ] D) 12 horas <!-- feedback: Incorrecto. $2^{12} = 4096$ multiplica por 64 la meta pedida, así que el tiempo es mucho menor. -->

### Explicacion Pedagogica
Como $2^6 = 2^2 \cdot 2^4 = 4 \cdot 16 = 64$, el tiempo buscado es $t = \log_2(64) = 6$ horas. Sirve el exponente exacto, el que reproduce el argumento sin residuo.

---

## Question 6 [D5-D6]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v6
**Bloom:** Apply
**EJE:** Álgebra y funciones
**Expected_Success:** 0.70
**Contexto:** En Caacupé, un vivero mide el crecimiento de una planta con el modelo $5^t = 125$ semanas.

### Enunciado
Si el crecimiento de una planta de Caacupé se modela por $5^t = 125$, ¿cuántas semanas tarda en alcanzar el factor indicado por el modelo?

### Opciones
- [x] A) 3 semanas <!-- feedback: ¡Correcto! $\log_5(125) = 3$ porque $5^3 = 125$, y $125$ es potencia exacta de la base. -->
- [ ] B) 4 semanas <!-- feedback: Incorrecto. $5^4 = 625$ supera las 125 unidades que pide el modelo de crecimiento. -->
- [ ] C) 5 semanas <!-- feedback: Incorrecto. $5^5 = 3125$ multiplica por 25 el valor solicitado, así que el tiempo es menor. -->
- [ ] D) 2 semanas <!-- feedback: Incorrecto. $5^2 = 25$ se queda muy por debajo de las 125 unidades exigidas por la ecuación. -->

### Explicacion Pedagogica
Como $125 = 5^3$, la ecuación $5^t = 125$ se reduce a $5^t = 5^3$ y por tanto $t = \log_5(125) = 3$ semanas. La clave es reconocer el argumento como potencia de la misma base.

---

## Question 7 [D5-D6]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v7
**Bloom:** Apply
**EJE:** Álgebra y funciones
**Expected_Success:** 0.67
**Contexto:** En Pilar, una industria metalúrgica registra la depreciación de un equipo con el modelo $3^t = 81$ años.

### Enunciado
La depreciación de un equipo industrial de Pilar sigue el modelo $3^t = 81$. ¿Cuántos años deben pasar para que el factor alcance ese valor?

### Opciones
- [ ] A) 3 años <!-- feedback: Incorrecto. $3^3 = 27$ queda por debajo de las 81 unidades que pide el modelo de depreciación. -->
- [ ] B) 6 años <!-- feedback: Incorrecto. $3^6 = 729$ ya supera con mucho el factor buscado, de modo que el tiempo es menor. -->
- [x] C) 4 años <!-- feedback: ¡Correcto! $\log_3(81) = 4$ porque $3^4 = 81$, y ese producto de potencias reproduce el argumento. -->
- [ ] D) 9 años <!-- feedback: Incorrecto. $3^9 = 19683$ equivale a $81^2 \cdot 3$, muy por encima del factor del enunciado. -->

### Explicacion Pedagogica
Escribiendo $81 = 3 \cdot 27 = 3^3 \cdot 3 = 3^4$, la ecuación $3^t = 81$ tiene $t = \log_3(81) = 4$ años. Se reconoce el argumento como potencia entera de la base.

---

## Question 8 [D5-D6]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v8
**Bloom:** Evaluate
**EJE:** Álgebra y funciones
**Expected_Success:** 0.65
**Contexto:** En Coronel Oviedo, un laboratorio registra una concentración modelada por $10^t = 0.001$.

### Enunciado
Una concentración de Coronel Oviedo sigue el modelo $10^t = 0.001$. ¿Qué valor de $t$ corresponde a esa medida?

### Opciones
- [ ] A) 3 <!-- feedback: Incorrecto. $10^{3} = 1000$ es mil veces mayor que el argumento $0.001$ de la ecuación. -->
- [ ] B) $-4$ <!-- feedback: Incorrecto. $10^{-4} = 0.0001$ es diez veces menor que el $0.001$ que pide la concentración. -->
- [ ] C) $0.3$ <!-- feedback: Incorrecto. $10^{0.3}$ vale $2$ aproximadamente, y el argumento es una potencia entera de diez. -->
- [x] D) $-3$ <!-- feedback: ¡Correcto! $\log_{10}(0.001) = -3$ porque $10^{-3} = 0.001$, y un argumento menor que 1 da exponente negativo. -->

### Explicacion Pedagogica
Como $0.001 = \frac{1}{1000} = \frac{1}{10^3} = 10^{-3}$, se tiene $t = \log_{10}(0.001) = -3$. Todo número entre 0 y 1 tiene logaritmo negativo en base 10.

---

## Question 9 [D5-D6]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v9
**Bloom:** Evaluate
**EJE:** Álgebra y funciones
**Expected_Success:** 0.62
**Contexto:** En Concepción, un taller de álgebra compara logaritmos de bases distintas para consolidar el concepto de exponente.

### Enunciado
¿Qué valor tiene la expresión $\log_2(8) + \log_5(25)$?

### Opciones
- [x] A) 5 <!-- feedback: ¡Correcto! $\log_2(8) = 3$ y $\log_5(25) = 2$, y la suma es $3 + 2 = 5$. -->
- [ ] B) 6 <!-- feedback: Incorrecto. La suma correcta es $3 + 2 = 5$; un 6 exigiría que $\log_5(25)$ valiera 3. -->
- [ ] C) 3 <!-- feedback: Incorrecto. $3$ es solo el valor de $\log_2(8)$, y el segundo término de la suma se está omitiendo. -->
- [ ] D) 15 <!-- feedback: Incorrecto. $15$ es $3 \cdot 5$, el producto de los argumentos, no la suma de sus logaritmos. -->

### Explicacion Pedagogica
Cada logaritmo es un exponente exacto: $\log_2(8) = 3$ porque $2^3 = 8$ y $\log_5(25) = 2$ porque $5^2 = 25$, de modo que la suma es $3 + 2 = 5$.

---

## Question 10 [D5-D6]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v10
**Bloom:** Evaluate
**EJE:** Álgebra y funciones
**Expected_Success:** 0.60
**Contexto:** En Villarrica, un curso de preparación evalúa el logaritmo de una fracción con base $3$.

### Enunciado
¿Qué valor tiene el logaritmo $\log_3\left(\frac{1}{81}\right)$?

### Opciones
- [ ] A) $-3$ <!-- feedback: Incorrecto. $3^{-3} = \frac{1}{27} = 0.037$ es mayor que $\frac{1}{81} = 0.012$, y el argumento es menor. -->
- [x] B) $-4$ <!-- feedback: ¡Correcto! $\log_3\left(\frac{1}{81}\right) = -4$ porque $3^{-4} = \frac{1}{81}$, y $81 = 3^4$. -->
- [ ] C) 4 <!-- feedback: Incorrecto. $3^4 = 81$ da el argumento $81$, no su inverso $\frac{1}{81}$. -->
- [ ] D) $\frac{1}{4}$ <!-- feedback: Incorrecto. $\frac{1}{4}$ es el resultado de dividir entre cuatro, no un exponente de base 3. -->

### Explicacion Pedagogica
Como $81 = 3^4$, su inverso es $\frac{1}{81} = 3^{-4}$ y por tanto $\log_3\left(\frac{1}{81}\right) = -4$. Invertir el argumento invierte el signo del exponente.

---

## Question 11 [D7-D8]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v11
**Bloom:** Apply
**EJE:** Álgebra y funciones
**Expected_Success:** 0.57
**Contexto:** En Asunción, un centro de capacitación resuelve ecuaciones del tipo $\log_2(x) = 6$ para encontrar la población inicial.

### Enunciado
En un taller de Asunción se plantea la ecuación $\log_2(x) = 6$. ¿Qué valor de $x$ la resuelve?

### Opciones
- [ ] A) 32 <!-- feedback: Incorrecto. $2^5 = 32$ corresponde a $\log_2(x) = 5$ y no al exponente 6 del enunciado. -->
- [ ] B) 128 <!-- feedback: Incorrecto. $2^7 = 128$ corresponde a $\log_2(x) = 7$, un exponente mayor que el dado. -->
- [x] C) 64 <!-- feedback: ¡Correcto! La ecuación equivale a $2^6 = 64$, y por eso $x = 64$ es la única solución positiva. -->
- [ ] D) 12 <!-- feedback: Incorrecto. $12$ es el doble del exponente $6$ y no una potencia de la base $2$ del modelo. -->

### Explicacion Pedagogica
Pasando $\log_2(x) = 6$ a su forma exponencial se obtiene $x = 2^6 = 64$. El logaritmo ya venía resuelto, así que solo había que reconstruir el argumento.

---

## Question 12 [D7-D8]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v12
**Bloom:** Apply
**EJE:** Álgebra y funciones
**Expected_Success:** 0.55
**Contexto:** En San Lorenzo, un grupo de estudiantes resuelve $\log_5(x) = 3$ aplicando la definición de logaritmo.

### Enunciado
Sabiendo que $\log_5(x) = 3$, determine el valor de $x$ que satisface la igualdad.

### Opciones
- [x] A) 125 <!-- feedback: ¡Correcto! $\log_5(x) = 3$ equivale a $5^3 = 125$, de modo que $x = 125$ es la solución. -->
- [ ] B) 25 <!-- feedback: Incorrecto. $5^2 = 25$ corresponde a $\log_5(x) = 2$ y no al exponente 3 del enunciado. -->
- [ ] C) 625 <!-- feedback: Incorrecto. $5^4 = 625$ corresponde a $\log_5(x) = 4$, un exponente mayor que el dado. -->
- [ ] D) 15 <!-- feedback: Incorrecto. $15$ es $5 \cdot 3$, un producto, y no una potencia de la base $5$. -->

### Explicacion Pedagogica
La definición $\log_b(x) = c \iff b^c = x$ convierte el enunciado en $x = 5^3 = 125$. Reconstruir la potencia es el paso inverso a calcular un logaritmo.

---

## Question 13 [D7-D8]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v13
**Bloom:** Analyze
**EJE:** Álgebra y funciones
**Expected_Success:** 0.52
**Contexto:** En Luque, un ejercicio de práctica combina logaritmos de bases distintas que deben restarse.

### Enunciado
Calcule el valor de $\log_2(32) - \log_4(16)$ teniendo en cuenta que las bases son diferentes.

### Opciones
- [ ] A) 5 <!-- feedback: Incorrecto. $5$ es solo el valor de $\log_2(32)$; falta restar $\log_4(16) = 2$. -->
- [ ] B) 2 <!-- feedback: Incorrecto. $2$ es solo $\log_4(16)$, y el resultado debe ser mayor porque $5 > 2$. -->
- [ ] C) 7 <!-- feedback: Incorrecto. Una suma $5 + 2 = 7$ corresponde a un producto de argumentos, no a la resta pedida. -->
- [x] D) 3 <!-- feedback: ¡Correcto! $\log_2(32) = 5$ y $\log_4(16) = 2$, y la resta es $5 - 2 = 3$. -->

### Explicacion Pedagogica
Cada término se resuelve por separado: $\log_2(32) = 5$ porque $2^5 = 32$ y $\log_4(16) = 2$ porque $4^2 = 16$. Como las bases difieren, la resta se efectúa al final y da $3$.

---

## Question 14 [D7-D8]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v14
**Bloom:** Analyze
**EJE:** Álgebra y funciones
**Expected_Success:** 0.50
**Contexto:** En Encarnación, un club de cálculo simplifica $\log_{10}(2 \cdot 50)$ reduciendo primero el producto.

### Enunciado
Usando que $\log_b(x \cdot y) = \log_b(x) + \log_b(y)$, simplifique el valor de $\log_{10}(2 \cdot 50)$.

### Opciones
- [ ] A) 52 <!-- feedback: Incorrecto. $52$ son los dos factores sumados, y lo que se suman son sus logaritmos, no los factores. -->
- [x] B) 2 <!-- feedback: ¡Correcto! $\log_{10}(2) + \log_{10}(50) = \log_{10}(100) = 2$, porque $2 \cdot 50 = 100$. -->
- [ ] C) 100 <!-- feedback: Incorrecto. $100$ es el resultado del producto $2 \cdot 50$ y no su logaritmo en base 10. -->
- [ ] D) 0.5 <!-- feedback: Incorrecto. $0.5$ es el logaritmo de $10^{-0.5}$; el producto del enunciado supera la unidad. -->

### Explicacion Pedagogica
Como $2 \cdot 50 = 100$ y $\log_{10}(100) = 2$, se tiene $\log_{10}(2) + \log_{10}(50) = 2$. Reducir el producto antes evita calcular logaritmos decimales aproximados.

---

## Question 15 [D7-D8]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v15
**Bloom:** Evaluate
**EJE:** Álgebra y funciones
**Expected_Success:** 0.47
**Contexto:** En Ciudad del Este, un curso de preparación aplica cambio de base para calcular $\log_4(8)$.

### Enunciado
Usando el cambio de base, determine el valor exacto de $\log_4(8)$.

### Opciones
- [ ] A) 2 <!-- feedback: Incorrecto. Un exponente $2$ da $4^2 = 16$, y un exponente $3$ da $4^3 = 64$; ninguno vale 8. -->
- [ ] B) 3 <!-- feedback: Incorrecto. Un exponente $3$ da $4^3 = 64$, que es ocho veces mayor que el argumento buscado. -->
- [x] C) $\frac{3}{2}$ <!-- feedback: ¡Correcto! $\log_4(8) = \dfrac{\log_2(8)}{\log_2(4)} = \dfrac{3}{2}$, y $4^{3/2} = 8$. -->
- [ ] D) $\frac{2}{3}$ <!-- feedback: Incorrecto. $\frac{2}{3}$ invierte el cociente correcto y da $4^{2/3} = 2.52$, no 8. -->

### Explicacion Pedagogica
El cambio de base entrega $\log_4(8) = \frac{\log_2(8)}{\log_2(4)} = \frac{3}{2}$, porque $8 = 2^3$ y $4 = 2^2$. El resultado no es entero: el argumento no es potencia entera de la base.

---

## Question 16 [D7-D8]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v16
**Bloom:** Evaluate
**EJE:** Álgebra y funciones
**Expected_Success:** 0.45
**Contexto:** En Caacupé, un estudio compara una base grande con un argumento pequeño mediante $\log_{16}(4)$.

### Enunciado
¿Qué valor tiene el logaritmo $\log_{16}(4)$?

### Opciones
- [ ] A) 2 <!-- feedback: Incorrecto. Un exponente $2$ da $16^2 = 256$, y un exponente $1$ da $16^1 = 16$, no 4. -->
- [x] B) $\frac{1}{2}$ <!-- feedback: ¡Correcto! $\log_{16}(4) = \dfrac{\log_2 4}{\log_2 16} = \dfrac{2}{4} = \dfrac{1}{2}$. -->
- [ ] C) 4 <!-- feedback: Incorrecto. Un exponente $4$ da $16^4 = 65536$, mucho mayor que el argumento de la expresión. -->
- [ ] D) $\frac{1}{4}$ <!-- feedback: Incorrecto. $\frac{1}{4}$ daría $16^{1/4} = 2$, que es la raíz cuarta de 16 y no 4. -->

### Explicacion Pedagogica
Como $16 = 2^4$ y $4 = 2^2$, el cambio de base a base 2 produce $\log_{16}(4) = \frac{2}{4} = \frac{1}{2}$. Una base grande con argumento pequeño da un logaritmo entre 0 y 1.

---

## Question 17 [D9-D10]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v17
**Bloom:** Analyze
**EJE:** Álgebra y funciones
**Expected_Success:** 0.42
**Contexto:** En Pilar, un laboratorio de soluciones define $\mathrm{pH} = -\log_{10}[\mathrm{H}^+]$ y mide $[\mathrm{H}^+] = 10^{-3}$ mol/L.

### Enunciado
En un laboratorio de Pilar, la concentración de iones de hidrógeno cumple $[\mathrm{H}^+] = 10^{-3}$ mol/L. Si el pH se define como $\mathrm{pH} = -\log_{10}[\mathrm{H}^+]$, ¿qué pH tiene la solución?

### Opciones
- [x] A) 3 <!-- feedback: ¡Correcto! $\log_{10}(10^{-3}) = -3$ y el signo negativo de la definición da $\mathrm{pH} = 3$. -->
- [ ] B) $-3$ <!-- feedback: Incorrecto. El signo menos pertenece a la definición del pH y no al resultado del logaritmo. -->
- [ ] C) 0.003 <!-- feedback: Incorrecto. $0.003$ es la concentración $[10^{-3}]$ en mol/L, no el logaritmo de ese valor. -->
- [ ] D) 0.3 <!-- feedback: Incorrecto. $0.3$ es el cociente entre los exponentes, y el pH de una solución es siempre mayor que cero. -->

### Explicacion Pedagogica
Con $[\mathrm{H}^+] = 10^{-3}$, el logaritmo común es exactamente $\log_{10}(10^{-3}) = -3$ y, por la definición, $\mathrm{pH} = -(-3) = 3$. Por eso esta solución ácida tiene pH igual a 3.

---

## Question 18 [D9-D10]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v18
**Bloom:** Apply
**EJE:** Álgebra y funciones
**Expected_Success:** 0.40
**Contexto:** En Coronel Oviedo, una colonia de bacterias parte de 2000 individuos y se duplica cada hora con $N(t) = 2000 \cdot 2^t$.

### Enunciado
Una colonia de bacterias de Coronel Oviedo parte de 2000 individuos y se duplica cada hora según $N(t) = 2000 \cdot 2^t$. ¿Cuántas horas deben pasar para alcanzar 64000 bacterias?

### Opciones
- [ ] A) 3 horas <!-- feedback: Incorrecto. $2^3 = 8$ y $2000 \cdot 8 = 16000$, exactamente la mitad de la población pedida. -->
- [ ] B) 6 horas <!-- feedback: Incorrecto. $2000 \cdot 2^6 = 128000$, que dobla con exceso el total solicitado de 64000. -->
- [x] C) 5 horas <!-- feedback: ¡Correcto! $\dfrac{64000}{2000} = 32 = 2^5$ y por eso $t = \log_2(32) = 5$ horas. -->
- [ ] D) 8 horas <!-- feedback: Incorrecto. $2^8 = 256$ y $2000 \cdot 256 = 512000$, muy por encima de las 64000 bacterias. -->

### Explicacion Pedagogica
Hay que despejar el factor de crecimiento: $\frac{64000}{2000} = 32 = 2^5$. Como el modelo es $N(t) = 2000 \cdot 2^t$, el tiempo buscado es $t = \log_2(32) = 5$ horas.

---

## Question 19 [D9-D10]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v19
**Bloom:** Evaluate
**EJE:** Álgebra y funciones
**Expected_Success:** 0.37
**Contexto:** En Concepción, una muestra de 4800 átomos radiactivos pierde la mitad cada 10 años con $N(t) = 4800 \cdot 2^{-t/10}$.

### Enunciado
Una muestra de Concepción tiene 4800 átomos radiactivos y pierde la mitad cada 10 años, según $N(t) = 4800 \cdot 2^{-t/10}$. ¿Cuántos años deben pasar para que queden 300 átomos?

### Opciones
- [ ] A) 4 años <!-- feedback: Incorrecto. $4$ es la cantidad de periodos de desintegración, no los años transcurridos. -->
- [ ] B) 10 años <!-- feedback: Incorrecto. $10$ es la duración de un solo periodo; en ese tiempo la muestra baja a 2400 átomos. -->
- [ ] C) 20 años <!-- feedback: Incorrecto. $20$ años son dos periodos, y quedarían $4800 / 4 = 1200$ átomos sin desintegrar. -->
- [x] D) 40 años <!-- feedback: ¡Correcto! $\dfrac{300}{4800} = \dfrac{1}{16} = 2^{-4}$, de donde $t/10 = 4$ y $t = 40$ años. -->

### Explicacion Pedagogica
Dividiendo por la cantidad inicial se obtiene $2^{-t/10} = \frac{300}{4800} = \frac{1}{16} = 2^{-4}$. De ahí $-t/10 = -4$ y $t = 40$ años, es decir cuatro periodos completos de 10 años.

---

## Question 20 [D9-D10]
**ID:** PY-MAT-11-2026-W03-tema-w03-001-MASTERY-v20
**Bloom:** Evaluate
**EJE:** Álgebra y funciones
**Expected_Success:** 0.33
**Contexto:** En Villarrica, el nivel sonoro de una máquina cumple $L = 10\log_{10}\left(\frac{I}{I_0}\right)$ con $L = 70$ e $I_0 = 10^{-12}$.

### Enunciado
El nivel sonoro de una máquina de Villarrica cumple $L = 10\log_{10}\left(\frac{I}{I_0}\right)$. Si el nivel medido es $L = 70$ y la intensidad de referencia es $I_0 = 10^{-12}$, ¿qué intensidad $I$ tiene la máquina?

### Opciones
- [ ] A) $10^{7}$ <!-- feedback: Incorrecto. $10^{7}$ es el cociente $I / I_0$, no la intensidad expresada en la unidad de referencia. -->
- [ ] B) $10^{-12}$ <!-- feedback: Incorrecto. $10^{-12}$ es la intensidad de referencia $I_0$, que es igual para todas las máquinas. -->
- [ ] C) 7 <!-- feedback: Incorrecto. $7$ es solo el logaritmo del cociente, que se obtiene al dividir $70$ entre $10$ en la ecuación. -->
- [x] D) $10^{-5}$ <!-- feedback: ¡Correcto! $\log_{10}(I/10^{-12}) = 7$ y por tanto $I = 10^{7} \cdot 10^{-12} = 10^{-5}$. -->

### Explicacion Pedagogica
De $L = 10\log_{10}\left(\frac{I}{I_0}\right)$ se obtiene $\log_{10}\left(\frac{I}{I_0}\right) = \frac{70}{10} = 7$, luego $\frac{I}{I_0} = 10^7$ y $I = 10^{7} \cdot 10^{-12} = 10^{-5}$.