---
id: "EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle"
country: "ecuador"
grado: 11
asignatura: "matematicas"
tema: "analisis-de-funciones-monotonia"
periodo: "weekly"
week: "W14"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "Bases Curriculares Ecuador + BGU"
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# MASTERY Bundle — Análisis de Funciones: Monotonía y Curvatura (W14)

## Bloque A — Nivel D3–D4: Puntos Críticos e Intervalos de Crecimiento

---

## Question 1 [D3]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.90
**Contexto:** Un analista de datos en Guayaquil estudia la tendencia de ventas de una aplicación móvil.

### Enunciado
¿Cómo se define un punto crítico de una función $f(x)$?

### Opciones
- [ ] A) Es cualquier punto donde la función cruza el eje de las abscisas ($x$).
  <!-- feedback: Incorrecto. Eso es una raíz o cero de la función. -->
- [x] B) Es un punto en el dominio de $f$ donde $f'(x) = 0$ o $f'(x)$ no existe.
  <!-- feedback: Correcto. Los puntos críticos son los candidatos a ser extremos locales (máximos o mínimos). -->
- [ ] C) Es el punto más alto de toda la gráfica de la función.
  <!-- feedback: Incorrecto. Ese sería el máximo absoluto, que es un tipo de punto crítico, pero no la definición general. -->
- [ ] D) Es el punto donde la función cambia de signo.
  <!-- feedback: Incorrecto. Eso se relaciona con el Teorema del Valor Intermedio. -->

### Explicacion Pedagogica
La identificación de puntos críticos es el primer paso para analizar el comportamiento local de una función utilizando herramientas del cálculo diferencial.

---

## Question 2 [D3]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v2
**Bloom:** Understand
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.85
**Contexto:** Criterio de la primera derivada para el crecimiento.

### Enunciado
Si para todo $x$ en un intervalo $(a, b)$ se cumple que $f'(x) > 0$, ¿qué se puede afirmar sobre la función $f$ en ese intervalo?

### Opciones
- [x] A) La función es estrictamente creciente.
  <!-- feedback: Correcto. Una derivada positiva indica que la pendiente es positiva, por lo que los valores de $y$ aumentan conforme aumenta $x$. -->
- [ ] B) La función es estrictamente decreciente.
  <!-- feedback: Incorrecto. Esto ocurriría si la derivada fuera negativa. -->
- [ ] C) La función tiene un valor máximo en ese intervalo.
  <!-- feedback: Incorrecto. Una derivada estrictamente positiva impide la existencia de un extremo local dentro del intervalo abierto. -->
- [ ] D) La función es constante.
  <!-- feedback: Incorrecto. Para que sea constante, la derivada debe ser cero en todo el intervalo. -->

### Explicacion Pedagogica
Relación directa entre el signo de la primera derivada y la monotonía (crecimiento/decrecimiento) de una función continua.

---

## Question 3 [D4]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v3
**Bloom:** Apply
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.80
**Contexto:** Cálculo de puntos críticos en un polinomio simple.

### Enunciado
Determine los puntos críticos de la función $f(x) = x^2 - 6x + 5$.

### Opciones
- [ ] A) $x = 0$
  <!-- feedback: Incorrecto. En $x=0$, $f'(0) = -6 \neq 0$. -->
- [x] B) $x = 3$
  <!-- feedback: Correcto. $f'(x) = 2x - 6$. Igualando a cero: $2x - 6 = 0 \Rightarrow x = 3$. -->
- [ ] C) $x = 1$ y $x = 5$
  <!-- feedback: Incorrecto. Estos son los ceros de la función, no los puntos críticos. -->
- [ ] D) No tiene puntos críticos.
  <!-- feedback: Incorrecto. Al ser una parábola, tiene un vértice que es un punto crítico. -->

### Explicacion Pedagogica
Aplicación del concepto de punto crítico igualando la primera derivada a cero para funciones polinómicas de segundo grado.

---

## Question 4 [D4]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v4
**Bloom:** Apply
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.75
**Contexto:** Una microempresa en Cuenca modela su costo promedio mediante la función $C(x) = x + \frac{4}{x}$ para $x > 0$.

### Enunciado
¿En qué valor de producción $x$ el costo marginal (derivada del costo) es igual a cero?

### Opciones
- [ ] A) $x = 4$
  <!-- feedback: Incorrecto. Error al resolver la ecuación de la derivada. -->
- [x] B) $x = 2$
  <!-- feedback: Correcto. $C'(x) = 1 - 4/x^2$. Igualando a cero: $4/x^2 = 1 \Rightarrow x^2 = 4 \Rightarrow x = 2$ (ya que $x > 0$). -->
- [ ] C) $x = 1$
  <!-- feedback: Incorrecto. El costo marginal en $x=1$ es $-3$. -->
- [ ] D) $x = 0$
  <!-- feedback: Incorrecto. La función no está definida en $x=0$. -->

### Explicacion Pedagogica
Identificación de niveles de actividad económica óptimos mediante la búsqueda de puntos donde la tasa de cambio es nula.

---

## Bloque B — Nivel D5–D6: Máximos, Mínimos y Criterios de Clasificación

---

## Question 5 [D5]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.70
**Contexto:** Clasificación de extremos usando el criterio de la segunda derivada.

### Enunciado
Si $x = c$ es un punto crítico tal que $f'(c) = 0$ y $f''(c) > 0$, ¿qué tipo de extremo tiene la función en $c$?

### Opciones
- [ ] A) Un máximo local.
  <!-- feedback: Incorrecto. Una segunda derivada positiva indica que la curva es cóncava hacia arriba, lo que corresponde a un "valle". -->
- [x] B) Un mínimo local.
  <!-- feedback: Correcto. Concavidad hacia arriba en un punto horizontal implica un mínimo. -->
- [ ] C) Un punto de inflexión.
  <!-- feedback: Incorrecto. Para que sea de inflexión, la segunda derivada suele ser cero o no existir, y debe haber cambio de signo. -->
- [ ] D) No se puede determinar.
  <!-- feedback: Incorrecto. El criterio de la segunda derivada es concluyente cuando el valor es distinto de cero. -->

### Explicacion Pedagogica
Uso de la información de la curvatura (segunda derivada) para clasificar la naturaleza de los puntos críticos horizontales.

---

## Question 6 [D5]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.65
**Contexto:** Hallar el valor máximo de una función en un intervalo cerrado (Teorema del Valor Extremo).

### Enunciado
Determine el valor máximo absoluto de $f(x) = -x^2 + 4x + 1$ en el intervalo $[0, 3]$.

### Opciones
- [ ] A) 1
  <!-- feedback: Incorrecto. Este es el valor en el extremo $x=0$. -->
- [ ] B) 4
  <!-- feedback: Incorrecto. Este es el valor en el extremo $x=3$. -->
- [x] C) 5
  <!-- feedback: Correcto. Punto crítico: $f'(x)=-2x+4=0 \Rightarrow x=2$. $f(2)=-4+8+1=5$. Como 5 es mayor que $f(0)=1$ y $f(3)=4$, es el máximo absoluto. -->
- [ ] D) 2
  <!-- feedback: Incorrecto. Este es el valor de $x$ donde ocurre el máximo, no el valor máximo de la función. -->

### Explicacion Pedagogica
Evaluación de candidatos a extremos absolutos comparando los valores de la función en los puntos críticos y en los extremos del intervalo.

---

## Question 7 [D6]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v7
**Bloom:** Understand
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.60
**Contexto:** Definición de concavidad y puntos de inflexión.

### Enunciado
¿Qué ocurre en un punto de inflexión de una función continua?

### Opciones
- [ ] A) La función alcanza su valor más alto.
  <!-- feedback: Incorrecto. Eso es un máximo. -->
- [ ] B) La pendiente de la tangente es igual a cero.
  <!-- feedback: Incorrecto. Eso define un punto crítico horizontal. -->
- [x] C) La función cambia su sentido de concavidad.
  <!-- feedback: Correcto. Es el punto donde la gráfica pasa de ser cóncava hacia arriba a cóncava hacia abajo, o viceversa. -->
- [ ] D) La función deja de ser continua.
  <!-- feedback: Incorrecto. Los puntos de inflexión se analizan generalmente en funciones continuas y derivables. -->

### Explicacion Pedagogica
Comprensión del significado geométrico del cambio de signo en la segunda derivada como transición entre diferentes estados de curvatura.

---

## Question 8 [D6]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.60
**Contexto:** Un ingeniero en Quito analiza la trayectoria de un proyectil cuya altura es $y(t) = -5t^2 + 20t + 2$.

### Enunciado
¿En qué tiempo $t$ el proyectil alcanza su altura máxima?

### Opciones
- [ ] A) $t = 4$ s
  <!-- feedback: Incorrecto. En este tiempo el proyectil ya está descendiendo. -->
- [x] B) $t = 2$ s
  <!-- feedback: Correcto. $y'(t) = -10t + 20$. Igualando a cero: $-10t = -20 \Rightarrow t = 2$. -->
- [ ] C) $t = 0$ s
  <!-- feedback: Incorrecto. Es el momento del lanzamiento. -->
- [ ] D) $t = 22$ s
  <!-- feedback: Incorrecto. Confundió la altura máxima con el tiempo. -->

### Explicacion Pedagogica
Aplicación del cálculo diferencial para resolver problemas de cinemática básica en una dimensión.

---

## Question 9 [D6]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v9
**Bloom:** Analyze
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.55
**Contexto:** Determinar intervalos de concavidad para un polinomio de tercer grado.

### Enunciado
Halle el intervalo donde la función $f(x) = x^3 - 3x^2 + 4$ es cóncava hacia arriba.

### Opciones
- [ ] A) $(-\infty, 1)$
  <!-- feedback: Incorrecto. En este intervalo la función es cóncava hacia abajo. -->
- [x] B) $(1, \infty)$
  <!-- feedback: Correcto. $f'(x) = 3x^2 - 6x$; $f''(x) = 6x - 6$. $f''(x) > 0 \Rightarrow 6x > 6 \Rightarrow x > 1$. -->
- [ ] C) $(0, 2)$
  <!-- feedback: Incorrecto. Estos son los puntos críticos de la primera derivada. -->
- [ ] D) $(-\infty, \infty)$
  <!-- feedback: Incorrecto. La concavidad de una función cúbica siempre cambia en su punto de inflexión. -->

### Explicacion Pedagogica
Análisis de la segunda derivada para determinar la curvatura de la gráfica de una función.

---

## Question 10 [D6]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v10
**Bloom:** Analyze
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.55
**Contexto:** Clasificación de un punto crítico donde el criterio de la segunda derivada falla.

### Enunciado
Considere $f(x) = x^4$. En $x = 0$ se tiene $f'(0) = 0$ y $f''(0) = 0$. ¿Qué se puede concluir sobre el punto $(0,0)$ analizando la primera derivada a los lados?

### Opciones
- [ ] A) Es un punto de inflexión.
  <!-- feedback: Incorrecto. La función no cambia de concavidad, siempre es positiva o cero. -->
- [ ] B) Es un máximo local.
  <!-- feedback: Incorrecto. Los valores de la función aumentan a ambos lados de 0. -->
- [x] C) Es un mínimo local.
  <!-- feedback: Correcto. Para $x < 0$, $f'(x) = 4x^3 < 0$ (decrece). Para $x > 0$, $f'(x) > 0$ (crece). Por tanto, es un mínimo. -->
- [ ] D) Es una discontinuidad esencial.
  <!-- feedback: Incorrecto. La función es continua y suave en todo su dominio. -->

### Explicacion Pedagogica
Importancia del criterio de la primera derivada cuando la segunda derivada es nula en un punto crítico.

---

## Bloque C — Nivel D7–D8: Teoremas del Valor Medio y Análisis Gráfico Completo

---

## Question 11 [D7]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v11
**Bloom:** Understand
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.50
**Contexto:** El Teorema de Rolle en la planificación de rutas de transporte entre Quito y Ambato.

### Enunciado
¿Cuál de las siguientes condiciones NO es necesaria para aplicar el Teorema de Rolle en el intervalo $[a, b]$?

### Opciones
- [ ] A) $f(x)$ es continua en $[a, b]$.
  <!-- feedback: Incorrecto. Es un requisito fundamental. -->
- [ ] B) $f(x)$ es derivable en $(a, b)$.
  <!-- feedback: Incorrecto. Es un requisito fundamental. -->
- [ ] C) $f(a) = f(b)$.
  <!-- feedback: Incorrecto. Es la condición específica que distingue a Rolle del Teorema del Valor Medio general. -->
- [x] D) $f(a) = 0$.
  <!-- feedback: Correcto. Los valores en los extremos deben ser iguales entre sí, pero no necesariamente iguales a cero. -->

### Explicacion Pedagogica
Distinción de las hipótesis necesarias para garantizar la existencia de un punto con derivada nula según el Teorema de Rolle.

---

## Question 12 [D7]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v12
**Bloom:** Apply
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.50
**Contexto:** Aplicación del Teorema del Valor Medio de la derivada.

### Enunciado
Para $f(x) = x^2$ en el intervalo $[1, 3]$, encuentre el valor de $c$ que garantiza el Teorema del Valor Medio.

### Opciones
- [ ] A) $c = 1.5$
  <!-- feedback: Incorrecto. Valor obtenido por una estimación errónea. -->
- [x] B) $c = 2$
  <!-- feedback: Correcto. Pendiente promedio: $\frac{f(3)-f(1)}{3-1} = \frac{9-1}{2} = 4$. Derivada $f'(c) = 2c$. Igualando: $2c = 4 \Rightarrow c = 2$. -->
- [ ] C) $c = 2.5$
  <!-- feedback: Incorrecto. Satisface el intervalo pero no la igualdad de pendientes. -->
- [ ] D) $c = 4$
  <!-- feedback: Incorrecto. El valor de $c$ debe estar dentro del intervalo abierto $(1, 3)$. -->

### Explicacion Pedagogica
Cálculo del punto donde la tasa de cambio instantánea iguala a la tasa de cambio promedio en un intervalo dado.

---

## Question 13 [D7]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.45
**Contexto:** Análisis de una función racional $f(x) = \frac{x^2 - 1}{x^2 + 1}$.

### Enunciado
¿Cuántos puntos críticos tiene esta función y qué tipo son?

### Opciones
- [ ] A) No tiene puntos críticos.
  <!-- feedback: Incorrecto. La función cambia de dirección en el eje y. -->
- [x] B) Un solo punto crítico en $x=0$, que es un mínimo.
  <!-- feedback: Correcto. $f'(x) = \frac{4x}{(x^2+1)^2}$. Solo se anula en $x=0$. Para $x<0, f'<0$; para $x>0, f'>0$. -->
- [ ] C) Dos puntos críticos en $x=1$ y $x=-1$.
  <!-- feedback: Incorrecto. Estos son los ceros de la función. -->
- [ ] D) Un punto crítico en $x=0$, que es un máximo.
  <!-- feedback: Incorrecto. Al evaluar cerca de 0, los valores de la función aumentan. -->

### Explicacion Pedagogica
Estudio de la primera derivada en funciones racionales suaves para identificar extremos relativos.

---

## Question 14 [D8]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.45
**Contexto:** Identificación de asíntotas y comportamiento final en un modelo logístico de población en la Amazonía.

### Enunciado
Dada $f(x) = \frac{2x^2}{x^2 - 4}$, determine los intervalos de decrecimiento.

### Opciones
- [ ] A) $(-\infty, \infty)$
  <!-- feedback: Incorrecto. La función crece en algunas regiones. -->
- [x] B) $(0, 2)$ y $(2, \infty)$
  <!-- feedback: Correcto. $f'(x) = \frac{-16x}{(x^2-4)^2}$. La derivada es negativa cuando $x > 0$ (excluyendo la asíntota en $x=2$). -->
- [ ] C) $(-\infty, -2)$ y $(-2, 0)$
  <!-- feedback: Incorrecto. En estos intervalos la derivada es positiva, por lo que la función crece. -->
- [ ] D) $(-2, 2)$ solamente.
  <!-- feedback: Incorrecto. Olvidó analizar el comportamiento más allá de las asíntotas. -->

### Explicacion Pedagogica
Determinación de la monotonía en funciones con discontinuidades infinitas (asíntotas verticales).

---

## Question 15 [D8]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v15
**Bloom:** Evaluate
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.40
**Contexto:** Relación entre las gráficas de $f$ y $f'$.

### Enunciado
Si la gráfica de la derivada $f'(x)$ es una recta horizontal $y = 3$, ¿qué se puede decir de la función original $f(x)$?

### Opciones
- [ ] A) $f(x)$ es una función constante.
  <!-- feedback: Incorrecto. Si $f$ fuera constante, su derivada sería 0, no 3. -->
- [x] B) $f(x)$ es una función lineal con pendiente 3.
  <!-- feedback: Correcto. La única función cuya derivada es una constante no nula es una función lineal. -->
- [ ] C) $f(x)$ es una parábola que se abre hacia arriba.
  <!-- feedback: Incorrecto. La derivada de una parábola es una recta inclinada. -->
- [ ] D) $f(x)$ tiene un valor máximo en $x=3$.
  <!-- feedback: Incorrecto. Como $f'(x)$ nunca es cero, no hay puntos críticos. -->

### Explicacion Pedagogica
Capacidad de inferir la forma y propiedades de una función a partir del comportamiento de su tasa de cambio.

---

## Question 16 [D8]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.40
**Contexto:** Puntos de inflexión en funciones trascendentes.

### Enunciado
Halle el punto de inflexión de la función $f(x) = e^{-x^2}$ (Campana de Gauss).

### Opciones
- [ ] A) $x = 0$
  <!-- feedback: Incorrecto. En $x=0$ hay un máximo absoluto, no un cambio de concavidad. -->
- [x] B) $x = \pm \frac{1}{\sqrt{2}}$
  <!-- feedback: Correcto. $f'(x) = -2xe^{-x^2}$; $f''(x) = (4x^2 - 2)e^{-x^2}$. Igualando a cero: $4x^2 = 2 \Rightarrow x^2 = 1/2$. -->
- [ ] C) No tiene puntos de inflexión.
  <!-- feedback: Incorrecto. La curva cambia de cóncava hacia abajo (centro) a cóncava hacia arriba (colas). -->
- [ ] D) $x = \pm 1$
  <!-- feedback: Incorrecto. Error en la resolución de la ecuación cuadrática resultante de la segunda derivada. -->

### Explicacion Pedagogica
Localización de cambios de curvatura en funciones exponenciales compuestas de gran importancia en estadística.

---

## Bloque D — Nivel D9–D10: Interpretación Avanzada y Modelado

---

## Question 17 [D9]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.35
**Contexto:** Un sensor sísmico en el volcán Cotopaxi registra una señal modelada por $f(t) = t \ln(t)$ para $t > 0$.

### Enunciado
Determine el valor mínimo absoluto de esta función en su dominio.

### Opciones
- [ ] A) 0
  <!-- feedback: Incorrecto. Es el límite cuando $t \to 0$, pero no el mínimo. -->
- [ ] B) 1
  <!-- feedback: Incorrecto. En $t=1, f(1)=0$, pero hay valores negativos antes. -->
- [x] C) $-1/e$
  <!-- feedback: Correcto. $f'(t) = \ln(t) + 1 = 0 \Rightarrow \ln(t) = -1 \Rightarrow t = e^{-1} = 1/e$. El valor es $f(1/e) = (1/e)(-1) = -1/e$. -->
- [ ] D) $-e$
  <!-- feedback: Incorrecto. Error al evaluar la función en el punto crítico. -->

### Explicacion Pedagogica
Resolución de problemas de optimización en funciones no polinómicas integrando propiedades de logaritmos.

---

## Question 18 [D9]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v18
**Bloom:** Analyze
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.30
**Contexto:** Análisis cualitativo de la tercera derivada.

### Enunciado
Si en un punto $x=c$ se tiene $f''(c) = 0$ y $f'''(c) \neq 0$, ¿qué garantiza generalmente esta condición?

### Opciones
- [x] A) La existencia de un punto de inflexión en $c$.
  <!-- feedback: Correcto. Si la tercera derivada es distinta de cero, la segunda derivada cambia de signo al cruzar por cero, asegurando el cambio de concavidad. -->
- [ ] B) Un máximo relativo en $c$.
  <!-- feedback: Incorrecto. Requiere $f'(c)=0$ y $f''(c)<0$. -->
- [ ] C) Que la función es una recta en ese punto.
  <!-- feedback: Incorrecto. Una recta tiene todas las derivadas superiores iguales a cero. -->
- [ ] D) Una discontinuidad de salto.
  <!-- feedback: Incorrecto. Se asume que la función es suficientemente derivable. -->

### Explicacion Pedagogica
Uso de derivadas de orden superior para confirmar la naturaleza de los puntos donde fallan los criterios básicos.

---

## Question 19 [D10]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.25
**Contexto:** Modelado de una montaña rusa en un parque de diversiones en Quito con la función $y(x) = ax^3 + bx^2 + cx + d$. Se desea que pase por $(0,0)$ con pendiente 0 y que tenga un máximo en $(2,4)$.

### Enunciado
Determine los coeficientes $a$ y $b$ de la función.

### Opciones
- [ ] A) $a=1, b=3$
  <!-- feedback: Incorrecto. No satisfacen las condiciones de derivada. -->
- [x] B) $a=-1, b=3$
  <!-- feedback: Correcto. $y(0)=0 \Rightarrow d=0$. $y'(0)=0 \Rightarrow c=0$. $y(2)=8a+4b=4 \Rightarrow 2a+b=1$. $y'(2)=12a+4b=0 \Rightarrow 3a+b=0$. Resolviendo: $a=-1, b=3$. -->
- [ ] C) $a=-2, b=6$
  <!-- feedback: Incorrecto. Satisface la pendiente pero no el punto de altura 4. -->
- [ ] D) $a=1, b=-3$
  <!-- feedback: Incorrecto. Resultaría en un mínimo, no un máximo en $x=2$. -->

### Explicacion Pedagogica
Uso de sistemas de ecuaciones lineales derivados de condiciones de contorno y extremos para determinar modelos polinómicos.

---

## Question 20 [D10]
**ID:** EC-MAT-11-2026-W14-analisis-de-funciones-monotonia-001-MASTERY-bundle-v20
**Bloom:** Analyze
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.20
**Contexto:** Un problema de geometría diferencial sobre la curvatura de una vía de tren en los Andes.

### Enunciado
Si $f(x)$ tiene una asíntota oblicua $y = 2x + 5$ cuando $x \to \infty$, ¿cuál es el valor de $\lim_{x \to \infty} f'(x)$ (asumiendo que el límite de la derivada existe)?

### Opciones
- [ ] A) 0
  <!-- feedback: Incorrecto. Esto ocurriría con una asíntota horizontal. -->
- [ ] B) 5
  <!-- feedback: Incorrecto. Este es el término independiente de la asíntota. -->
- [x] C) 2
  <!-- feedback: Correcto. Si la función se aproxima a una recta, su pendiente debe aproximarse a la pendiente de dicha recta. -->
- [ ] D) $\infty$
  <!-- feedback: Incorrecto. La pendiente se estabiliza, no crece sin límite. -->

### Explicacion Pedagogica
Conexión entre el comportamiento asintótico de una función y el valor límite de su tasa de cambio instantánea.
