---
id: "CO-MAT-10-2026-W25-continuidad-funciones-001-MASTERY-bundle"
country: "colombia"
grado: 10
asignatura: "matematicas"
tema: "continuidad-funciones"
periodo: "weekly"
week: "W25"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 12
bundle_size: 12
alignment: "DBA MEN Colombia / Saber 11"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# Bundle MASTERY: Continuidad de Funciones - Grado 10

Este bundle contiene 12 preguntas sobre **continuidad-funciones** para grado 10, alineadas con los DBA del MEN Colombia y el marco de evaluación Saber 11.

## Question 1 [D3-D4]
**ID:** CO-MAT-10-2026-W25-continuidad-funciones-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Variacional
**Expected_Success:** 0.90
**Contexto:** En Bogotá, Juan estudia cuándo una función puede considerarse continua en un punto.
### Enunciado
¿Cuál es la condición para que $f$ sea continua en $x=a$?
### Opciones
- [x] A) $\lim_{x \to a} f(x) = f(a)$.
  <!-- feedback: Correcto. La continuidad equivale a que el límite coincida con el valor de la función en el punto. -->
- [ ] B) Que $f(a) = 0$.
  <!-- feedback: Incorrecto. El valor puntual puede ser cualquier número, no necesariamente $0$. -->
- [ ] C) Que $f$ sea derivable en $a$.
  <!-- feedback: Incorrecto. La derivabilidad implica continuidad, pero no es la definición. -->
- [ ] D) Que $f(a)$ exista.
  <!-- feedback: Incorrecto. Falta la condición sobre el límite. -->
### Explicacion Pedagogica
Continuidad en $a$ requiere que $f(a)$ exista, que $\lim_{x \to a} f(x)$ exista y que ambos coincidan; la forma compacta es $\lim_{x \to a} f(x) = f(a)$.

## Question 2 [D3-D4]
**ID:** CO-MAT-10-2026-W25-continuidad-funciones-001-MASTERY-bundle-v2
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.88
**Contexto:** En Medellín, Valentina revisa una función polinómica de segundo grado.
### Enunciado
¿En dónde es continua la función $f(x) = x^2 - 3x + 2$?
### Opciones
- [ ] A) Solo para $x > 0$.
  <!-- feedback: Incorrecto. Los polinomios no tienen restricciones de signo. -->
- [ ] B) Únicamente en los números enteros.
  <!-- feedback: Incorrecto. Los polinomios están definidos para todo número real. -->
- [x] C) En todos los números reales $\mathbb{R}$.
  <!-- feedback: Correcto. Todo polinomio es continuo en $\mathbb{R}$. -->
- [ ] D) Solo en $x \in [0, \infty)$.
  <!-- feedback: Incorrecto. No hay restricciones de dominio en los polinomios. -->
### Explicacion Pedagogica
Los polinomios son funciones continuas en todo $\mathbb{R}$ porque están formados por sumas y productos de la función identidad $f(x)=x$ y constantes.

## Question 3 [D3-D4]
**ID:** CO-MAT-10-2026-W25-continuidad-funciones-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.86
**Contexto:** En Cali, Santiago analiza una función racional sencilla.
### Enunciado
¿En qué punto la función $f(x) = \frac{1}{x-2}$ NO es continua?
### Opciones
- [ ] A) $x = 0$.
  <!-- feedback: Incorrecto. En $x=0$, $f(0) = -1/2$ y el límite existe. -->
- [x] B) $x = 2$.
  <!-- feedback: Correcto. En $x=2$ el denominador se anula y $f$ no está definida. -->
- [ ] C) $x = 1$.
  <!-- feedback: Incorrecto. En $x=1$, $f(1) = -1$ sin problema. -->
- [ ] D) $x = -2$.
  <!-- feedback: Incorrecto. En $x=-2$, $f(-2) = -1/4$ también está definida. -->
### Explicacion Pedagogica
Las funciones racionales son continuas en todo su dominio; el único punto excluido aquí es donde el denominador vale $0$, es decir $x=2$.

## Question 4 [D5-D6]
**ID:** CO-MAT-10-2026-W25-continuidad-funciones-001-MASTERY-bundle-v4
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.82
**Contexto:** En Cartagena, Mariana compara varias funciones para identificar la que es continua en todos los reales.
### Enunciado
¿Cuál de las siguientes funciones es continua en todo $\mathbb{R}$?
### Opciones
- [ ] A) $f(x) = \frac{1}{x}$.
  <!-- feedback: Incorrecto. Presenta discontinuidad en $x=0$. -->
- [ ] B) $f(x) = \sqrt{x-5}$ en su dominio.
  <!-- feedback: Incorrecto. Solo es continua en $[5, \infty)$, no en todo $\mathbb{R}$. -->
- [ ] C) $f(x) = \tan(x)$.
  <!-- feedback: Incorrecto. Tiene discontinuidades donde $\cos(x) = 0$. -->
- [x] D) $f(x) = |x|$.
  <!-- feedback: Correcto. El valor absoluto es continuo en todos los reales. -->
### Explicacion Pedagogica
La función valor absoluto $|x|$ es continua en $\mathbb{R}$ porque es el resultado de componer funciones continuas: $x \mapsto x^2 \mapsto \sqrt{\cdot}$.

## Question 5 [D5-D6]
**ID:** CO-MAT-10-2026-W25-continuidad-funciones-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.80
**Contexto:** En Barranquilla, la profesora aplica el teorema del valor intermedio con $f(x)=x^2$ en $[2,6]$.
### Enunciado
Si $f$ es continua en $[2,6]$ y $f(2)=3$, $f(6)=11$, ¿qué garantiza el teorema?
### Opciones
- [x] A) Existe $c \in [2,6]$ con $f(c) = 7$.
  <!-- feedback: Correcto. Como $7$ está entre $3$ y $11$, el teorema asegura un $c$ con $f(c)=7$. -->
- [ ] B) Solo existe $c$ si $f$ es lineal.
  <!-- feedback: Incorrecto. La linealidad no es un requisito. -->
- [ ] C) No existe tal $c$.
  <!-- feedback: Incorrecto. El teorema del valor intermedio sí lo garantiza. -->
- [ ] D) El intervalo debe ser abierto.
  <!-- feedback: Incorrecto. El teorema se aplica a intervalos cerrados. -->
### Explicacion Pedagogica
El teorema del valor intermedio exige continuidad en un intervalo cerrado $[a,b]$ y un valor intermedio $k$ entre $f(a)$ y $f(b)$; entonces existe $c$ con $f(c)=k$.

## Question 6 [D5-D6]
**ID:** CO-MAT-10-2026-W25-continuidad-funciones-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.78
**Contexto:** En Bucaramanga, Juan combina dos funciones continuas para deducir propiedades de su suma.
### Enunciado
Si $f$ y $g$ son continuas en $x=a$, ¿qué se puede afirmar de $f+g$ en $a$?
### Opciones
- [ ] A) Que puede no ser continua.
  <!-- feedback: Incorrecto. La suma de continuas siempre es continua. -->
- [ ] B) Que es discontinua.
  <!-- feedback: Incorrecto. La suma de continuas conserva la continuidad. -->
- [x] C) Que es continua en $a$.
  <!-- feedback: Correcto. La suma de funciones continuas es continua. -->
- [ ] D) Que no se puede saber nada.
  <!-- feedback: Incorrecto. Se puede concluir la continuidad. -->
### Explicacion Pedagogica
Las operaciones algebraicas (suma, resta, producto y cociente con denominador no nulo) preservan la continuidad, así que $f+g$ también es continua en $a$.

## Question 7 [D7-D8]
**ID:** CO-MAT-10-2026-W25-continuidad-funciones-001-MASTERY-bundle-v7
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.74
**Contexto:** En Pereira, Valentina analiza el comportamiento de $f(x) = \frac{x^2 - 4}{x-2}$ cerca de $x=2$.
### Enunciado
¿Qué tipo de discontinuidad tiene $f$ en $x=2$?
### Opciones
- [ ] A) Discontinuidad de salto.
  <!-- feedback: Incorrecto. Un salto requeriría que los límites laterales difirieran; aquí coinciden. -->
- [ ] B) Discontinuidad infinita.
  <!-- feedback: Incorrecto. El límite no diverge: existe y vale $4$. -->
- [ ] C) Es continua en $x=2$.
  <!-- feedback: Incorrecto. No está definida en $x=2$. -->
- [x] D) Discontinuidad evitable (removible).
  <!-- feedback: Correcto. El límite existe; basta redefinir $f(2)=4$ para que sea continua. -->
### Explicacion Pedagogica
La discontinuidad evitable se caracteriza porque $\lim_{x \to 2} f(x)$ existe, pero $f(2)$ no está definida o difiere de ese valor; basta asignar el límite para hacerla continua.

## Question 8 [D7-D8]
**ID:** CO-MAT-10-2026-W25-continuidad-funciones-001-MASTERY-bundle-v8
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.72
**Contexto:** En Manizales, Santiago estudia una función definida por tramos.
### Enunciado
La función $f(x) = \begin{cases} x+1 & \text{si } x < 2 \\ x-1 & \text{si } x \ge 2 \end{cases}$ tiene en $x=2$:
### Opciones
- [ ] A) Discontinuidad evitable.
  <!-- feedback: Incorrecto. Los límites laterales difieren, así que no es evitable. -->
- [x] B) Discontinuidad de salto.
  <!-- feedback: Correcto. Los límites laterales son $3$ y $1$, diferentes entre sí. -->
- [ ] C) Es continua.
  <!-- feedback: Incorrecto. La diferencia de laterales descarta la continuidad. -->
- [ ] D) No tiene límite.
  <!-- feedback: Incorrecto. Los límites laterales sí existen, solo no coinciden. -->
### Explicacion Pedagogica
Una discontinuidad de salto aparece cuando los límites laterales existen pero son diferentes; aquí son $3$ (por la izquierda) y $1$ (por la derecha).

## Question 9 [D7-D8]
**ID:** CO-MAT-10-2026-W25-continuidad-funciones-001-MASTERY-bundle-v9
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.70
**Contexto:** En Cúcuta, Mariana revisa cuál NO es condición necesaria para la continuidad en un punto.
### Enunciado
¿Cuál de las siguientes NO es una condición necesaria para que $f$ sea continua en $x=a$?
### Opciones
- [x] A) Que $f(a) \ne 0$.
  <!-- feedback: Correcto. La continuidad no exige que $f(a)$ sea distinto de $0$. -->
- [ ] B) Que $f(a)$ esté definido.
  <!-- feedback: Incorrecto. Que $f(a)$ exista sí es necesario. -->
- [ ] C) Que $\lim_{x \to a} f(x)$ exista.
  <!-- feedback: Incorrecto. La existencia del límite es parte de la definición. -->
- [ ] D) Que $\lim_{x \to a} f(x) = f(a)$.
  <!-- feedback: Incorrecto. Esta igualdad es la definición misma. -->
### Explicacion Pedagogica
La continuidad exige tres condiciones: $f(a)$ definido, existencia del límite, y coincidencia entre ambos. El valor puntual puede ser cualquier número real, incluido $0$.

## Question 10 [D9-D10]
**ID:** CO-MAT-10-2026-W25-continuidad-funciones-001-MASTERY-bundle-v10
**Bloom:** Evaluate
**ICFES:** Variacional
**Expected_Success:** 0.65
**Contexto:** En Pasto, Juan debe elegir el valor de $k$ para que una función definida por tramos sea continua en $x=2$.
### Enunciado
Sea $f(x) = \begin{cases} x^2 & \text{si } x \ne 2 \\ k & \text{si } x = 2 \end{cases}$. ¿Qué valor de $k$ hace continua a $f$ en $x=2$?
### Opciones
- [ ] A) $k = 0$.
  <!-- feedback: Incorrecto. $\lim_{x \to 2} x^2 = 4$, no $0$. -->
- [ ] B) $k = 2$.
  <!-- feedback: Incorrecto. $k = 2$ produciría un salto visible. -->
- [x] C) $k = 4$.
  <!-- feedback: Correcto. Como $\lim_{x \to 2} x^2 = 4$, se requiere $k = 4$ para que $f(2)$ coincida con el límite. -->
- [ ] D) No existe tal $k$.
  <!-- feedback: Incorrecto. Sí existe y es $k=4$. -->
### Explicacion Pedagogica
Para que la función por tramos sea continua en el punto de empalme, el valor asignado $k$ debe coincidir con el límite de la expresión algebraica cuando $x \to 2$.

## Question 11 [D9-D10]
**ID:** CO-MAT-10-2026-W25-continuidad-funciones-001-MASTERY-bundle-v11
**Bloom:** Evaluate
**ICFES:** Variacional
**Expected_Success:** 0.60
**Contexto:** En Ibagué, Valentina clasifica varios tipos de discontinuidades.
### Enunciado
¿Cuál descripción corresponde a una discontinuidad evitable (removible)?
### Opciones
- [ ] A) La función salta de un valor a otro en el punto.
  <!-- feedback: Incorrecto. Eso describe un salto, no una discontinuidad evitable. -->
- [ ] B) La función crece sin límite al acercarse al punto.
  <!-- feedback: Incorrecto. Eso describe una discontinuidad infinita. -->
- [x] C) Existe un hueco que se podría "tapar" redefiniendo el valor en el punto.
  <!-- feedback: Correcto. La discontinuidad evitable tiene límite y se resuelve asignando ese límite en el punto. -->
- [ ] D) La función no está definida en un punto y diverge.
  <!-- feedback: Incorrecto. Eso corresponde a una discontinuidad esencial o infinita. -->
### Explicacion Pedagogica
Una discontinuidad es evitable cuando el límite existe: reasignando $f(a)$ al valor del límite, la función se vuelve continua en $a$.

## Question 12 [D9-D10]
**ID:** CO-MAT-10-2026-W25-continuidad-funciones-001-MASTERY-bundle-v12
**Bloom:** Evaluate
**ICFES:** Variacional
**Expected_Success:** 0.55
**Contexto:** En Villavicencio, Santiago repasa los requisitos del teorema del valor intermedio.
### Enunciado
El teorema del valor intermedio requiere que:
### Opciones
- [ ] A) La función sea constante.
  <!-- feedback: Incorrecto. La constancia no es un requisito. -->
- [x] B) La función sea continua en un intervalo cerrado $[a,b]$.
  <!-- feedback: Correcto. La hipótesis clave del teorema es la continuidad en un intervalo cerrado. -->
- [ ] C) La función sea lineal.
  <!-- feedback: Incorrecto. El teorema aplica a funciones continuas, no solo a las lineales. -->
- [ ] D) El intervalo sea abierto.
  <!-- feedback: Incorrecto. El intervalo debe ser cerrado para garantizar la existencia de los extremos. -->
### Explicacion Pedagogica
El teorema del valor intermedio exige continuidad en un intervalo cerrado $[a,b]$; bajo esa hipótesis, todo valor entre $f(a)$ y $f(b)$ se alcanza en algún punto del intervalo.