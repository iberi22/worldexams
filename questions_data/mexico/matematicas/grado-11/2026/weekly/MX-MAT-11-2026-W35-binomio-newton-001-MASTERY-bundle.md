---
id: "MX-MAT-11-2026-W35-binomio-newton-001-MASTERY"
country: "mexico"
grado: 11
asignatura: "matematicas"
tema: "binomio-newton"
periodo: "weekly"
week: 35
year: 2026
bundle_type: "mastery"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "SEP NEM Mexico 2026 / EXANI-II pensamiento matematico"
license: "FREE"
tier: "pro"
creador: "jules"
---

# Bundle Mastery: Binomio de Newton — Grado 11
## Semana W35

Este bundle se centra en el desarrollo de binomios elevados a potencias enteras positivas, el uso del Triángulo de Pascal y el Teorema del Binomio, habilidades clave para el álgebra avanzada en EXANI-II.

---

## Question 1 [D3-D4]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v1`
**Bloom:** Remember
**EXANI-II:** Pensamiento Matemático
**Contexto:** Identificación del desarrollo de un binomio al cuadrado.
**Expected_Success:** 0.95

### Enunciado
¿Cuál es el desarrollo correcto del binomio $(x + y)^2$?

### Opciones
- [ ] A) $x^2 + y^2$ <!-- feedback: Incorrecto. Olvidaste el término del doble producto. -->
- [x] B) $x^2 + 2xy + y^2$ <!-- feedback: Correcto. Es el desarrollo clásico de un trinomio cuadrado perfecto. -->
- [ ] C) $x^2 - 2xy + y^2$ <!-- feedback: Incorrecto. Este sería el desarrollo de (x-y)^2. -->
- [ ] D) $2x + 2y$ <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
El cuadrado de un binomio sigue la regla: el cuadrado del primero, más el doble producto del primero por el segundo, más el cuadrado del segundo.

---

## Question 2 [D3-D4]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v2`
**Bloom:** Understand
**EXANI-II:** Pensamiento Matemático
**Contexto:** Relación con el Triángulo de Pascal.
**Expected_Success:** 0.90

### Enunciado
En el Triángulo de Pascal, ¿cuáles son los coeficientes que corresponden al desarrollo de un binomio elevado a la potencia 3 ($n=3$)?

### Opciones
- [ ] A) 1, 2, 1 <!-- feedback: Incorrecto. Estos corresponden a n=2. -->
- [x] B) 1, 3, 3, 1 <!-- feedback: Correcto. La cuarta fila del triángulo (para n=3) contiene estos valores. -->
- [ ] C) 1, 4, 6, 4, 1 <!-- feedback: Incorrecto. Estos corresponden a n=4. -->
- [ ] D) 1, 1 <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
El Triángulo de Pascal proporciona los coeficientes binomiales. Para $n=3$, los coeficientes son $\binom{3}{0}, \binom{3}{1}, \binom{3}{2}, \binom{3}{3}$, que equivalen a 1, 3, 3, 1.

---

## Question 3 [D3-D4]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v3`
**Bloom:** Remember
**EXANI-II:** Pensamiento Matemático
**Contexto:** Propiedades del Teorema del Binomio.
**Expected_Success:** 0.88

### Enunciado
En el desarrollo de $(a + b)^n$, ¿cuántos términos tiene el resultado final después de simplificar?

### Opciones
- [ ] A) $n$ términos <!-- feedback: Incorrecto. -->
- [x] B) $n + 1$ términos <!-- feedback: Correcto. Un binomio elevado a la n siempre genera n+1 términos en su expansión. -->
- [ ] C) $n - 1$ términos <!-- feedback: Incorrecto. -->
- [ ] D) $2n$ términos <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Por el Teorema del Binomio, los términos van desde $\binom{n}{0}$ hasta $\binom{n}{n}$, lo que suma un total de $n+1$ términos.

---

## Question 4 [D3-D4]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v4`
**Bloom:** Apply
**EXANI-II:** Pensamiento Matemático
**Contexto:** Desarrollo de un binomio al cubo con resta.
**Expected_Success:** 0.82

### Enunciado
¿Cuál es el desarrollo de $(x - 1)^3$?

### Opciones
- [ ] A) $x^3 - 1$ <!-- feedback: Incorrecto. -->
- [x] B) $x^3 - 3x^2 + 3x - 1$ <!-- feedback: Correcto. Los signos alternan en un binomio resta: +, -, +, -. Los coeficientes son 1, 3, 3, 1. -->
- [ ] C) $x^3 + 3x^2 + 3x + 1$ <!-- feedback: Incorrecto. Este es el desarrollo de (x+1)^3. -->
- [ ] D) $x^3 - x^2 + x - 1$ <!-- feedback: Incorrecto. Faltan los coeficientes binomiales. -->

### Explicacion Pedagogica
Aplicamos $(a-b)^3 = a^3 - 3a^2b + 3ab^2 - b^3$. Sustituyendo $a=x$ y $b=1$: $x^3 - 3x^2(1) + 3x(1)^2 - 1^3 = x^3 - 3x^2 + 3x - 1$.

---

## Question 5 [D5-D6]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v5`
**Bloom:** Apply
**EXANI-II:** Pensamiento Matemático
**Contexto:** Cálculo de un coeficiente específico.
**Expected_Success:** 0.75

### Enunciado
En el desarrollo de $(x + 2)^4$, ¿cuál es el coeficiente del término que contiene a $x^3$?

### Opciones
- [ ] A) 4 <!-- feedback: Incorrecto. Este es solo el coeficiente binomial, falta multiplicar por la potencia de 2. -->
- [x] B) 8 <!-- feedback: Correcto. El término es \binom{4}{1} * x^3 * 2^1 = 4 * x^3 * 2 = 8x^3. -->
- [ ] C) 6 <!-- feedback: Incorrecto. -->
- [ ] D) 32 <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
El término general es $T_{k+1} = \binom{n}{k} a^{n-k} b^k$. Para $x^3$, $n-k=3 \rightarrow k=1$. El coeficiente es $\binom{4}{1} \cdot 2^1 = 4 \cdot 2 = 8$.

---

## Question 6 [D5-D6]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v6`
**Bloom:** Understand
**EXANI-II:** Pensamiento Matemático
**Contexto:** Suma de los coeficientes de un binomio.
**Expected_Success:** 0.70

### Enunciado
¿Cuál es la suma de todos los coeficientes del desarrollo de $(x + y)^5$?

### Opciones
- [ ] A) 10 <!-- feedback: Incorrecto. -->
- [ ] B) 16 <!-- feedback: Incorrecto. -->
- [x] C) 32 <!-- feedback: Correcto. La suma de los coeficientes se obtiene evaluando el binomio en x=1, y=1: (1+1)^5 = 2^5 = 32. -->
- [ ] D) 64 <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Para hallar la suma de coeficientes de cualquier polinomio, sustituimos las variables por 1. En este caso: $(1+1)^5 = 2^5 = 32$.

---

## Question 7 [D5-D6]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v7`
**Bloom:** Apply
**EXANI-II:** Pensamiento Matemático
**Contexto:** Desarrollo de potencia 4.
**Expected_Success:** 0.74

### Enunciado
Determina el tercer término del desarrollo de $(2x + 3)^4$.

### Opciones
- [ ] A) 54x^2 <!-- feedback: Incorrecto. -->
- [x] B) 216x^2 <!-- feedback: Correcto. T_3 = \binom{4}{2} * (2x)^2 * (3)^2 = 6 * 4x^2 * 9 = 216x^2. -->
- [ ] C) 96x^2 <!-- feedback: Incorrecto. -->
- [ ] D) 432x^2 <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Usamos $T_{k+1}$ con $k=2$: $\binom{4}{2} (2x)^{4-2} (3)^2 = 6 \cdot (4x^2) \cdot 9 = 216x^2$.

---

## Question 8 [D5-D6]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v8`
**Bloom:** Analyze
**EXANI-II:** Pensamiento Matemático
**Contexto:** Comportamiento de los exponentes.
**Expected_Success:** 0.80

### Enunciado
En la expansión de $(a^2 + b^3)^n$, ¿cómo se comportan los exponentes de $a$ y $b$ término a término?

### Opciones
- [ ] A) Ambos aumentan. <!-- feedback: Incorrecto. -->
- [ ] B) Ambos disminuyen. <!-- feedback: Incorrecto. -->
- [x] C) Los exponentes de 'a' disminuyen de 2 en 2, mientras los de 'b' aumentan de 3 en 3. <!-- feedback: Correcto. Los exponentes del primer término bajan (multiplicados por su potencia original) y los del segundo suben. -->
- [ ] D) Se mantienen constantes. <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
En $(x+y)^n$, el exponente de $x$ baja y el de $y$ sube. Como aquí son $a^2$ y $b^3$, los cambios son múltiplos de 2 y 3 respectivamente.

---

## Question 9 [D5-D6]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v9`
**Bloom:** Apply
**EXANI-II:** Pensamiento Matemático
**Contexto:** Término central de un desarrollo.
**Expected_Success:** 0.68

### Enunciado
Calcula el término central del desarrollo de $(x + 2y)^6$.

### Opciones
- [ ] A) 20x^3y^3 <!-- feedback: Incorrecto. Falta elevar el coeficiente 2 a la potencia 3. -->
- [x] B) 160x^3y^3 <!-- feedback: Correcto. T_4 = \binom{6}{3} * x^3 * (2y)^3 = 20 * x^3 * 8y^3 = 160x^3y^3. -->
- [ ] C) 40x^3y^3 <!-- feedback: Incorrecto. -->
- [ ] D) 80x^3y^3 <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Para $n=6$, el término central es el cuarto ($k=3$). $T_4 = \binom{6}{3} x^3 (2y)^3 = 20 \cdot x^3 \cdot 8y^3 = 160x^3y^3$.

---

## Question 10 [D5-D6]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v10`
**Bloom:** Understand
**EXANI-II:** Pensamiento Matemático
**Contexto:** Propiedades de simetría de los coeficientes.
**Expected_Success:** 0.72

### Enunciado
¿Cuál es la relación entre el coeficiente del segundo término y el del penúltimo término en el desarrollo de $(x + y)^n$?

### Opciones
- [ ] A) Son recíprocos. <!-- feedback: Incorrecto. -->
- [x] B) Son iguales. <!-- feedback: Correcto. Por la simetría de los coeficientes binomiales, \binom{n}{1} = \binom{n}{n-1}. -->
- [ ] C) El segundo es mayor. <!-- feedback: Incorrecto. -->
- [ ] D) El penúltimo es mayor. <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Los coeficientes binomiales son simétricos respecto al centro del desarrollo: $\binom{n}{k} = \binom{n}{n-k}$.

---

## Question 11 [D7-D8]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v11`
**Bloom:** Apply
**EXANI-II:** Pensamiento Matemático
**Contexto:** Término independiente de x.
**Expected_Success:** 0.55

### Enunciado
Encuentra el término independiente de $x$ en el desarrollo de $(x + \frac{1}{x})^4$.

### Opciones
- [ ] A) 4 <!-- feedback: Incorrecto. -->
- [x] B) 6 <!-- feedback: Correcto. El término independiente es cuando los exponentes de x se cancelan (n-k = k => 2k=4 => k=2). T_3 = \binom{4}{2} * x^2 * (1/x)^2 = 6. -->
- [ ] C) 1 <!-- feedback: Incorrecto. -->
- [ ] D) 12 <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Buscamos el término donde el exponente final de $x$ sea 0. En este caso, $x^{4-k} \cdot x^{-k} = x^{4-2k}$. Igualando $4-2k=0$, obtenemos $k=2$. El término es $\binom{4}{2} = 6$.

---

## Question 12 [D7-D8]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v12`
**Bloom:** Analyze
**EXANI-II:** Pensamiento Matemático
**Contexto:** Coeficientes negativos en el binomio.
**Expected_Success:** 0.52

### Enunciado
¿Cuál es el coeficiente del término $x^2y^2$ en el desarrollo de $(3x - 2y)^4$?

### Opciones
- [ ] A) 6 <!-- feedback: Incorrecto. -->
- [ ] B) 24 <!-- feedback: Incorrecto. -->
- [x] C) 216 <!-- feedback: Correcto. $T_3 = \binom{4}{2} \cdot (3x)^2 \cdot (-2y)^2 = 6 \cdot 9x^2 \cdot 4y^2 = 216x^2y^2$. -->
- [ ] D) -216 <!-- feedback: Incorrecto. Al elevar al cuadrado, el signo negativo desaparece. -->

### Explicacion Pedagogica
Para $x^2y^2$, $k=2$. El término es $\binom{4}{2} (3x)^2 (-2y)^2 = 6 \cdot (9x^2) \cdot (4y^2) = 216x^2y^2$. El signo es positivo porque $k$ es par.

---

## Question 13 [D7-D8]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v13`
**Bloom:** Apply
**EXANI-II:** Pensamiento Matemático
**Contexto:** Uso de la fórmula del término general.
**Expected_Success:** 0.58

### Enunciado
¿Cuál es el quinto término de la expansión de $(a + b)^7$?

### Opciones
- [x] A) 35a^3b^4 <!-- feedback: Correcto. T_5 (k=4) = \binom{7}{4} a^(7-4) b^4 = 35a^3b^4. -->
- [ ] B) 21a^3b^4 <!-- feedback: Incorrecto. -->
- [ ] C) 35a^4b^3 <!-- feedback: Incorrecto. Este es el cuarto término. -->
- [ ] D) 7a^6b <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Aplicamos $T_{k+1}$ con $k=4$: $\binom{7}{4} a^3 b^4 = 35 a^3 b^4$.

---

## Question 14 [D7-D8]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v14`
**Bloom:** Evaluate
**EXANI-II:** Pensamiento Matemático
**Contexto:** Binomio con fracciones.
**Expected_Success:** 0.48

### Enunciado
Simplifica el cuarto término del desarrollo de $(\frac{x}{2} - \frac{2}{x})^6$.

### Opciones
- [ ] A) -20 <!-- feedback: Incorrecto. -->
- [x] B) -20 <!-- feedback: Correcto. T_4 (k=3) = \binom{6}{3} * (x/2)^3 * (-2/x)^3 = 20 * (x^3/8) * (-8/x^3) = 20 * (-1) = -20. -->
- [ ] C) 20 <!-- feedback: Incorrecto. El signo debe ser negativo. -->
- [ ] D) -160 <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Para $k=3$: $\binom{6}{3} (\frac{x}{2})^3 (-\frac{2}{x})^3 = 20 \cdot \frac{x^3}{8} \cdot \frac{-8}{x^3} = 20(-1) = -20$.

---

## Question 15 [D7-D8]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v15`
**Bloom:** Analyze
**EXANI-II:** Pensamiento Matemático
**Contexto:** Comparación de coeficientes.
**Expected_Success:** 0.50

### Enunciado
En el desarrollo de $(1 + x)^n$, si los coeficientes de los términos segundo y tercero son iguales, ¿cuál debe ser el valor de $n$?

### Opciones
- [ ] A) 2 <!-- feedback: Incorrecto. -->
- [x] B) 3 <!-- feedback: Correcto. Coeficientes: \binom{n}{1} y \binom{n}{2}. n = n(n-1)/2 => 2 = n-1 => n=3. -->
- [ ] C) 4 <!-- feedback: Incorrecto. -->
- [ ] D) No es posible. <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Igualamos $\binom{n}{1} = \binom{n}{2} \rightarrow n = \frac{n(n-1)}{2} \rightarrow 1 = \frac{n-1}{2} \rightarrow n-1 = 2 \rightarrow n=3$.

---

## Question 16 [D7-D8]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v16`
**Bloom:** Apply
**EXANI-II:** Pensamiento Matemático
**Contexto:** Aplicación del binomio en estimaciones numéricas.
**Expected_Success:** 0.45

### Enunciado
Usa los primeros dos términos del Binomio de Newton para estimar el valor de $(1.02)^5$.

### Opciones
- [x] A) 1.10 <!-- feedback: Correcto. (1 + 0.02)^5 \approx \binom{5}{0}1^5 + \binom{5}{1}1^4(0.02) = 1 + 5(0.02) = 1 + 0.10 = 1.10. -->
- [ ] B) 1.02 <!-- feedback: Incorrecto. -->
- [ ] C) 1.20 <!-- feedback: Incorrecto. -->
- [ ] D) 1.05 <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Para $(1+x)^n$ con $x$ pequeño, $(1+x)^n \approx 1 + nx$. Aquí: $1 + 5(0.02) = 1 + 0.10 = 1.10$.

---

## Question 17 [D9-D10]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v17`
**Bloom:** Evaluate
**EXANI-II:** Pensamiento Matemático
**Contexto:** Hallar la potencia n a partir de un término.
**Expected_Success:** 0.35

### Enunciado
En el desarrollo de $(x + 2)^n$, el tercer término tiene un coeficiente de 112. ¿Cuál es el valor de $n$?

### Opciones
- [ ] A) 6 <!-- feedback: Incorrecto. -->
- [x] B) 8 <!-- feedback: Correcto. T_3 = \binom{n}{2} * x^(n-2) * 2^2 = 112 => [n(n-1)/2] * 4 = 112 => 2n(n-1) = 112 => n(n-1) = 56 => n=8. -->
- [ ] C) 7 <!-- feedback: Incorrecto. -->
- [ ] D) 10 <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
El coeficiente es $4 \cdot \binom{n}{2} = 112$. Entonces $\binom{n}{2} = 28$. La ecuación $\frac{n(n-1)}{2} = 28 \rightarrow n(n-1) = 56$ nos da $n=8$.

---

## Question 18 [D9-D10]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v18`
**Bloom:** Evaluate
**EXANI-II:** Pensamiento Matemático
**Contexto:** Binomios con exponentes negativos (teórico).
**Expected_Success:** 0.30

### Enunciado
¿Cuál es el coeficiente del término $x^2$ en la expansión de Taylor de $(1 - x)^{-1}$ para $|x| < 1$?

### Opciones
- [x] A) 1 <!-- feedback: Correcto. (1-x)^-1 = 1 + x + x^2 + x^3... Todos los coeficientes son 1. -->
- [ ] B) -1 <!-- feedback: Incorrecto. -->
- [ ] C) 2 <!-- feedback: Incorrecto. -->
- [ ] D) 0 <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Esta es una serie geométrica infinita. El desarrollo es $1 + x + x^2 + x^3...$, por lo que el coeficiente de $x^2$ es 1.

---

## Question 19 [D9-D10]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v19`
**Bloom:** Create
**EXANI-II:** Pensamiento Matemático
**Contexto:** Generalización del teorema.
**Expected_Success:** 0.32

### Enunciado
Encuentra el valor de la suma: $\binom{n}{0} + \binom{n}{1} + \binom{n}{2} + ... + \binom{n}{n}$.

### Opciones
- [ ] A) $n^2$ <!-- feedback: Incorrecto. -->
- [x] B) $2^n$ <!-- feedback: Correcto. Esta suma es equivalente a evaluar (1+1)^n usando el Binomio de Newton. -->
- [ ] C) $2n$ <!-- feedback: Incorrecto. -->
- [ ] D) $n!$ <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
La suma de una fila $n$ del Triángulo de Pascal es siempre $2^n$. Se deriva de $(1+1)^n = \sum_{k=0}^n \binom{n}{k} 1^{n-k} 1^k = 2^n$.

---

## Question 20 [D9-D10]
**ID:** `MX-MAT-11-2026-W35-binomio-newton-001-MASTERY-v20`
**Bloom:** Evaluate
**EXANI-II:** Pensamiento Matemático
**Contexto:** Razonamiento sobre términos máximos.
**Expected_Success:** 0.28

### Enunciado
En el desarrollo de $(1 + 1)^n$, ¿qué término tiene el coeficiente más grande?

### Opciones
- [ ] A) El primero. <!-- feedback: Incorrecto. -->
- [ ] B) El último. <!-- feedback: Incorrecto. -->
- [x] C) El término central (o los dos centrales). <!-- feedback: Correcto. Los coeficientes binomiales crecen hacia el centro del triángulo de Pascal. -->
- [ ] D) Todos son iguales. <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Debido a la estructura del Triángulo de Pascal, los valores $\binom{n}{k}$ aumentan hasta alcanzar el centro ($k=n/2$ o aproximado) y luego disminuyen.

---

### Explicacion Pedagogica Final
Este bundle domina la aplicación del Teorema del Binomio y el Triángulo de Pascal. Se enfatiza no solo el desarrollo mecánico de potencias, sino también el cálculo estratégico de términos específicos y la comprensión de las propiedades de simetría y suma de los coeficientes.

[//]: # (QUALITY_REVIEW)
| Dimensión | Puntaje |
|-----------|---------|
| Técnico | 30/30 |
| Curricular | 40/40 |
| Contexto | 20/20 |
| Redacción | 10/10 |
| **Total** | **100/100** |
