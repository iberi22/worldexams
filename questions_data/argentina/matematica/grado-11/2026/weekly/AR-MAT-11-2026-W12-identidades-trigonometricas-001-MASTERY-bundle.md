---
id: "AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle"
country: "argentina"
grado: 11
asignatura: "matematica"
tema: "identidades-trigonometricas"
periodo: "weekly"
week: "W12"
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

# Bundle MASTERY: Identidades y Ecuaciones Trigonométricas - Grado 11

Bundle de identidades recíprocas, de cociente y pitagóricas, ángulo doble, demostraciones y ecuaciones trigonométricas en $[0, 2\pi)$, con situaciones de distintas ciudades argentinas.

## Question 1 [D3-D4]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v1
**Bloom:** Remember
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.85
**Contexto:** En una rampa de acceso de una escuela de Rosario, el ángulo de inclinación $\theta$ cumple $\cos\theta = \frac{2}{5}$ según el plano del arquitecto.

### Enunciado
Si $\cos\theta = \frac{2}{5}$, ¿cuál es el valor de $\sec\theta$?

### Opciones
- [ ] A) $\frac{2}{5}$
  <!-- feedback: Incorrecto. Ese es el propio $\cos\theta$; la secante es su recíproco, no el mismo valor. -->
- [ ] B) $-\frac{5}{2}$
  <!-- feedback: Incorrecto. Invertir no cambia el signo: si $\cos\theta > 0$, entonces $\sec\theta = \frac{1}{\cos\theta}$ también es positiva. -->
- [ ] C) $\frac{\sqrt{21}}{5}$
  <!-- feedback: Incorrecto. Ese valor es $\sin\theta = \sqrt{1 - \frac{4}{25}}$; confundiste la secante con el seno. -->
- [x] D) $\frac{5}{2}$
  <!-- feedback: Correcto. La secante es la recíproca del coseno: $\sec\theta = \frac{1}{\cos\theta} = \frac{1}{2/5} = \frac{5}{2}$. -->

### Explicacion Pedagogica
Las razones recíprocas se definen como $\sec\theta = \frac{1}{\cos\theta}$, $\csc\theta = \frac{1}{\sin\theta}$ y $\cot\theta = \frac{1}{\tan\theta}$. Con $\cos\theta = \frac{2}{5}$ basta invertir la fracción: $\sec\theta = \frac{5}{2} = 2{,}5$.

## Question 2 [D3-D4]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v2
**Bloom:** Understand
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.83
**Contexto:** Un estudiante de Mendoza simplifica expresiones para calcular la pendiente de una ladera en el Cerro Arco.

### Enunciado
¿A qué expresión es equivalente $\tan x \cdot \cos x$, para los $x$ con $\cos x \ne 0$?

### Opciones
- [ ] A) $\frac{\sin x}{\cos^2 x}$
  <!-- feedback: Incorrecto. Ese resultado sale de dividir por $\cos x$ en lugar de multiplicar; $\frac{\sin x}{\cos x}\cdot\cos x$ cancela el coseno. -->
- [ ] B) $1$
  <!-- feedback: Incorrecto. Se confundió con la identidad pitagórica; el producto $\tan x\cos x$ no es constante, por ejemplo en $x=0$ vale $0$. -->
- [x] C) $\sin x$
  <!-- feedback: Correcto. Por la identidad de cociente, $\tan x \cdot \cos x = \frac{\sin x}{\cos x}\cdot\cos x = \sin x$. -->
- [ ] D) $\sec x$
  <!-- feedback: Incorrecto. La secante es $\frac{1}{\cos x}$; al multiplicar la tangente por el coseno el coseno desaparece y queda el seno. -->

### Explicacion Pedagogica
Escribimos la tangente como cociente: $\tan x = \frac{\sin x}{\cos x}$. Entonces $\tan x\cos x = \frac{\sin x}{\cos x}\cdot\cos x$, y como $\cos x \ne 0$ se simplifica a $\sin x$. Por ejemplo, en $x = \frac{\pi}{6}$: $\frac{\sqrt{3}}{3}\cdot\frac{\sqrt{3}}{2} = \frac{1}{2}$.

## Question 3 [D3-D4]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v3
**Bloom:** Remember
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.81
**Contexto:** En la guía de repaso de un colegio de Salta aparecen varias fórmulas trigonométricas y hay que reconocer cuál es una identidad.

### Enunciado
¿Cuál de las siguientes igualdades es una identidad válida para todo $x$ con $\cos x \ne 0$?

### Opciones
- [ ] A) $1 + \sec^2 x = \tan^2 x$
  <!-- feedback: Incorrecto. Los términos están intercambiados: en $x=0$ queda $1 + 1 = 0$, que es falso. -->
- [ ] B) $\sin x + \cos x = 1$
  <!-- feedback: Incorrecto. La identidad pitagórica usa cuadrados; en $x = \frac{\pi}{4}$ la suma vale $\sqrt{2} \ne 1$. -->
- [x] C) $1 + \tan^2 x = \sec^2 x$
  <!-- feedback: Correcto. Dividiendo $\sin^2 x + \cos^2 x = 1$ por $\cos^2 x$ se obtiene $\tan^2 x + 1 = \sec^2 x$. -->
- [ ] D) $1 + \cot^2 x = \sec^2 x$
  <!-- feedback: Incorrecto. Con la cotangente la identidad correcta es $1 + \cot^2 x = \csc^2 x$; se mezcló la cosecante con la secante. -->

### Explicacion Pedagogica
Las tres identidades pitagóricas son $\sin^2 x + \cos^2 x = 1$, $1 + \tan^2 x = \sec^2 x$ y $1 + \cot^2 x = \csc^2 x$. La segunda se obtiene dividiendo la primera por $\cos^2 x$, y por eso exige $\cos x \ne 0$.

## Question 4 [D3-D4]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v4
**Bloom:** Understand
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.79
**Contexto:** Un topógrafo en Bariloche mide un ángulo $\theta$ obtuso (segundo cuadrante) entre dos senderos y registra $\sin\theta = \frac{3}{5}$.

### Enunciado
Si $\sin\theta = \frac{3}{5}$ y $\theta$ está en el segundo cuadrante, ¿cuánto vale $\cos\theta$?

### Opciones
- [ ] A) $\frac{4}{5}$
  <!-- feedback: Incorrecto. El módulo es correcto, pero se ignoró que en el segundo cuadrante el coseno es negativo. -->
- [x] B) $-\frac{4}{5}$
  <!-- feedback: Correcto. De $\cos^2\theta = 1 - \frac{9}{25} = \frac{16}{25}$ sale $|\cos\theta| = \frac{4}{5}$, y en el segundo cuadrante el coseno es negativo. -->
- [ ] C) $-\frac{3}{4}$
  <!-- feedback: Incorrecto. Ese es el valor de $\tan\theta = \frac{3/5}{-4/5}$, no el del coseno. -->
- [ ] D) $\frac{2}{5}$
  <!-- feedback: Incorrecto. Se restó $1 - \frac{3}{5}$ sin elevar al cuadrado; la identidad es $\sin^2\theta + \cos^2\theta = 1$. -->

### Explicacion Pedagogica
Usamos $\sin^2\theta + \cos^2\theta = 1$: $\cos^2\theta = 1 - \left(\frac{3}{5}\right)^2 = \frac{16}{25}$, de modo que $\cos\theta = \pm\frac{4}{5}$. El signo lo decide el cuadrante: en el segundo, $x < 0$, así que $\cos\theta = -\frac{4}{5}$.

## Question 5 [D5-D6]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v5
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.76
**Contexto:** En un taller de programación de Córdoba se quiere reducir una fórmula para que la calculadora haga menos operaciones.

### Enunciado
Simplificá $\frac{1 - \cos^2 x}{\sin x}$ para $\sin x \ne 0$.

### Opciones
- [ ] A) $\cos x$
  <!-- feedback: Incorrecto. Se reemplazó $1-\cos^2 x$ por $\sin x\cos x$; la identidad correcta da $\sin^2 x$. -->
- [ ] B) $1$
  <!-- feedback: Incorrecto. Se simplificó como si $1-\cos^2 x = \sin x$; falta el cuadrado, porque $1 - \cos^2 x = \sin^2 x$. -->
- [x] C) $\sin x$
  <!-- feedback: Correcto. Como $1 - \cos^2 x = \sin^2 x$, queda $\frac{\sin^2 x}{\sin x} = \sin x$. -->
- [ ] D) $\frac{1}{\sin x} - \cos x$
  <!-- feedback: Incorrecto. Se separó mal la fracción: $\frac{\cos^2 x}{\sin x}$ no es $\cos x$, porque el denominador es $\sin x$. -->

### Explicacion Pedagogica
Aplicamos la identidad pitagórica en el numerador: $1 - \cos^2 x = \sin^2 x$. Luego $\frac{\sin^2 x}{\sin x} = \sin x$, válido siempre que $\sin x \ne 0$, es decir, $x \ne k\pi$.

## Question 6 [D5-D6]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v6
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.74
**Contexto:** Una ingeniera de una cooperativa eléctrica de Santa Fe suma dos señales $\sin x$ y $\cos x$ y estudia el cuadrado de la suma para calcular potencia.

### Enunciado
¿A qué expresión es equivalente $(\sin x + \cos x)^2$?

### Opciones
- [x] A) $1 + \sin 2x$
  <!-- feedback: Correcto. Desarrollando: $\sin^2 x + 2\sin x\cos x + \cos^2 x = 1 + 2\sin x\cos x = 1 + \sin 2x$. -->
- [ ] B) $1$
  <!-- feedback: Incorrecto. Se olvidó el doble producto del binomio: $(p+q)^2 = p^2 + 2pq + q^2$, y $2\sin x\cos x$ no se anula. -->
- [ ] C) $1 + \cos 2x$
  <!-- feedback: Incorrecto. El doble producto $2\sin x\cos x$ es $\sin 2x$; $\cos 2x = \cos^2 x - \sin^2 x$ es otra fórmula. -->
- [ ] D) $2 + \sin 2x$
  <!-- feedback: Incorrecto. Se tomó $\sin^2 x + \cos^2 x = 2$; la identidad pitagórica dice que esa suma es $1$. -->

### Explicacion Pedagogica
Desarrollamos el cuadrado del binomio: $(\sin x + \cos x)^2 = \sin^2 x + \cos^2 x + 2\sin x\cos x$. Por la identidad pitagórica la suma de cuadrados es $1$, y por ángulo doble $2\sin x\cos x = \sin 2x$. Resultado: $1 + \sin 2x$.

## Question 7 [D5-D6]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v7
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.72
**Contexto:** En un entrenamiento en La Bombonera se patea una pelota con ángulo $\theta$ agudo; el alcance horizontal es proporcional a $\sin 2\theta$, y se sabe que $\sin\theta = 0{,}6$.

### Enunciado
Si $\theta$ es agudo y $\sin\theta = 0{,}6$, ¿cuánto vale $\sin 2\theta$?

### Opciones
- [ ] A) $1{,}2$
  <!-- feedback: Incorrecto. Se calculó $2\sin\theta$; el ángulo doble no duplica el seno, y además un seno nunca supera $1$. -->
- [ ] B) $0{,}48$
  <!-- feedback: Incorrecto. Se calculó $\sin\theta\cos\theta = 0{,}6\cdot 0{,}8$ y faltó el factor $2$ de $\sin 2\theta = 2\sin\theta\cos\theta$. -->
- [ ] C) $0{,}28$
  <!-- feedback: Incorrecto. Ese es $\cos 2\theta = 1 - 2\cdot 0{,}36$; se usó la fórmula del coseno del ángulo doble en lugar de la del seno. -->
- [x] D) $0{,}96$
  <!-- feedback: Correcto. Con $\cos\theta = \sqrt{1 - 0{,}36} = 0{,}8$: $\sin 2\theta = 2\cdot 0{,}6\cdot 0{,}8 = 0{,}96$. -->

### Explicacion Pedagogica
Primero hallamos el coseno, positivo por ser $\theta$ agudo: $\cos\theta = \sqrt{1 - 0{,}6^2} = 0{,}8$. Luego $\sin 2\theta = 2\sin\theta\cos\theta = 2\cdot 0{,}6\cdot 0{,}8 = 0{,}96$. Un ángulo con $\sin 2\theta$ cerca de $1$ da un alcance cercano al máximo.

## Question 8 [D5-D6]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v8
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.70
**Contexto:** Un estudiante de La Plata modela la luz que atraviesa dos filtros polarizados y necesita $\cos 2x$ sabiendo que $\cos x = \frac{1}{3}$.

### Enunciado
Si $\cos x = \frac{1}{3}$, ¿cuánto vale $\cos 2x$?

### Opciones
- [x] A) $-\frac{7}{9}$
  <!-- feedback: Correcto. Con $\cos 2x = 2\cos^2 x - 1 = 2\cdot\frac{1}{9} - 1 = -\frac{7}{9}$. -->
- [ ] B) $\frac{2}{3}$
  <!-- feedback: Incorrecto. Se calculó $2\cos x$; el coseno del ángulo doble no es el doble del coseno. -->
- [ ] C) $\frac{7}{9}$
  <!-- feedback: Incorrecto. Se usó $1 - 2\cos^2 x$, que tiene el signo invertido; la fórmula es $2\cos^2 x - 1$ (o $1 - 2\sin^2 x$). -->
- [ ] D) $\frac{1}{9}$
  <!-- feedback: Incorrecto. Ese es $\cos^2 x$; faltó multiplicar por $2$ y restar $1$ en $\cos 2x = 2\cos^2 x - 1$. -->

### Explicacion Pedagogica
La fórmula del ángulo doble admite tres formas: $\cos 2x = \cos^2 x - \sin^2 x = 2\cos^2 x - 1 = 1 - 2\sin^2 x$. Como conocemos el coseno, conviene la segunda: $2\left(\frac{1}{3}\right)^2 - 1 = \frac{2}{9} - \frac{9}{9} = -\frac{7}{9}$.

## Question 9 [D5-D6]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v9
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.68
**Contexto:** Un generador de la represa de El Chocón produce una señal y se buscan los instantes, en un ciclo $[0, 2\pi)$, en que $2\sin x - 1 = 0$.

### Enunciado
¿Cuál es el conjunto de soluciones de $2\sin x - 1 = 0$ en $[0, 2\pi)$?

### Opciones
- [ ] A) $\left\{\frac{\pi}{6}\right\}$
  <!-- feedback: Incorrecto. Falta la solución del segundo cuadrante: $\sin\left(\frac{5\pi}{6}\right) = \frac{1}{2}$ también cumple la ecuación. -->
- [ ] B) $\left\{\frac{\pi}{3}, \frac{2\pi}{3}\right\}$
  <!-- feedback: Incorrecto. Se confundió el seno con el coseno: $\sin\left(\frac{\pi}{3}\right) = \frac{\sqrt{3}}{2}$, no $\frac{1}{2}$. -->
- [ ] C) $\left\{\frac{\pi}{6}, \frac{11\pi}{6}\right\}$
  <!-- feedback: Incorrecto. En $\frac{11\pi}{6}$ (cuarto cuadrante) el seno vale $-\frac{1}{2}$; esa simetría corresponde al coseno. -->
- [x] D) $\left\{\frac{\pi}{6}, \frac{5\pi}{6}\right\}$
  <!-- feedback: Correcto. De $\sin x = \frac{1}{2}$, el seno es positivo en el primer y segundo cuadrante: $x = \frac{\pi}{6}$ y $x = \pi - \frac{\pi}{6} = \frac{5\pi}{6}$. -->

### Explicacion Pedagogica
Despejamos: $\sin x = \frac{1}{2}$. El ángulo de referencia es $\frac{\pi}{6}$. Como el seno es positivo en los cuadrantes I y II, las soluciones en $[0, 2\pi)$ son $\frac{\pi}{6}$ y $\pi - \frac{\pi}{6} = \frac{5\pi}{6}$.

## Question 10 [D5-D6]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v10
**Bloom:** Apply
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.66
**Contexto:** Al estudiar la sombra de un mástil en la Plaza de Mayo, una alumna llega a la ecuación $2\cos^2 x - \cos x - 1 = 0$.

### Enunciado
¿Cuál es el conjunto de soluciones de $2\cos^2 x - \cos x - 1 = 0$ en $[0, 2\pi)$?

### Opciones
- [ ] A) $\left\{\frac{2\pi}{3}, \frac{4\pi}{3}\right\}$
  <!-- feedback: Incorrecto. Se olvidó el factor $\cos x - 1 = 0$, que aporta la solución $x = 0$. -->
- [ ] B) $\left\{0, \frac{\pi}{3}, \frac{5\pi}{3}\right\}$
  <!-- feedback: Incorrecto. Se tomó $\cos x = \frac{1}{2}$ por un error de signo; la raíz de $2u^2 - u - 1 = 0$ es $u = -\frac{1}{2}$. -->
- [x] C) $\left\{0, \frac{2\pi}{3}, \frac{4\pi}{3}\right\}$
  <!-- feedback: Correcto. Factorizando $(2\cos x + 1)(\cos x - 1) = 0$: $\cos x = 1$ da $x = 0$, y $\cos x = -\frac{1}{2}$ da $\frac{2\pi}{3}$ y $\frac{4\pi}{3}$. -->
- [ ] D) $\left\{\pi, \frac{\pi}{3}, \frac{5\pi}{3}\right\}$
  <!-- feedback: Incorrecto. Se factorizó como $(2\cos x - 1)(\cos x + 1)$, que da $2\cos^2 x + \cos x - 1$; los dos signos quedaron invertidos. -->

### Explicacion Pedagogica
Con $u = \cos x$ la ecuación es $2u^2 - u - 1 = 0$, cuyas raíces son $u = 1$ y $u = -\frac{1}{2}$. Luego $\cos x = 1$ da $x = 0$, y $\cos x = -\frac{1}{2}$ da $x = \frac{2\pi}{3}$ y $x = \frac{4\pi}{3}$ (cuadrantes II y III). Total: tres soluciones.

## Question 11 [D7-D8]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v11
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.63
**Contexto:** En un examen de ingreso en Tucumán se pide demostrar $\frac{\sin x}{1 - \cos x} = \frac{1 + \cos x}{\sin x}$ y hay que elegir una estrategia.

### Enunciado
¿Cuál de estas estrategias demuestra correctamente la identidad $\frac{\sin x}{1 - \cos x} = \frac{1 + \cos x}{\sin x}$ (donde ambos lados están definidos)?

### Opciones
- [ ] A) Elevar al cuadrado ambos lados y comprobar que los cuadrados coinciden
  <!-- feedback: Incorrecto. Que los cuadrados sean iguales no prueba la igualdad: $p^2 = q^2$ también se cumple si $p = -q$. -->
- [x] B) Multiplicar numerador y denominador del lado izquierdo por $1 + \cos x$ y usar $1 - \cos^2 x = \sin^2 x$
  <!-- feedback: Correcto. Queda $\frac{\sin x(1+\cos x)}{1 - \cos^2 x} = \frac{\sin x(1+\cos x)}{\sin^2 x} = \frac{1+\cos x}{\sin x}$, que es el lado derecho. -->
- [ ] C) Reemplazar $\cos x$ por $1 - \sin x$ en ambos lados
  <!-- feedback: Incorrecto. La relación $\cos x = 1 - \sin x$ es falsa; la identidad pitagórica relaciona los cuadrados, no las razones. -->
- [ ] D) Verificar la igualdad en $x = \frac{\pi}{2}$ y concluir que vale siempre
  <!-- feedback: Incorrecto. Un solo valor que cumple la igualdad no la demuestra para todos los $x$; se necesita un argumento general. -->

### Explicacion Pedagogica
Una identidad se demuestra transformando un lado en el otro con pasos reversibles. Multiplicando por el conjugado: $\frac{\sin x}{1-\cos x}\cdot\frac{1+\cos x}{1+\cos x} = \frac{\sin x(1+\cos x)}{\sin^2 x} = \frac{1+\cos x}{\sin x}$. Verificar casos o elevar al cuadrado no constituye una demostración.

## Question 12 [D7-D8]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v12
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.61
**Contexto:** Un alumno de Neuquén resuelve $\sin x\cos x = \sin x$ en $[0, 2\pi)$: divide ambos lados por $\sin x$, obtiene $\cos x = 1$ y responde solo $x = 0$.

### Enunciado
¿Qué error cometió el alumno y cuál es el conjunto de soluciones correcto?

### Opciones
- [ ] A) No hay error; la única solución es $x = 0$
  <!-- feedback: Incorrecto. En $x = \pi$: $\sin\pi\cos\pi = 0 = \sin\pi$, así que $\pi$ también es solución y se perdió al dividir. -->
- [ ] B) Dividió por $\sin x$; la respuesta es $\left\{0, \frac{\pi}{2}, \pi, \frac{3\pi}{2}\right\}$
  <!-- feedback: Incorrecto. En $x = \frac{\pi}{2}$ queda $1\cdot 0 = 0 \ne 1$; esos valores anulan el coseno, no el seno. -->
- [ ] C) Debía dividir por $\cos x$; la respuesta es $\{0, 2\pi\}$
  <!-- feedback: Incorrecto. Dividir por $\cos x$ no resuelve nada y $2\pi$ no pertenece a $[0, 2\pi)$ porque el intervalo es abierto a la derecha. -->
- [x] D) Dividió por $\sin x$, que puede ser $0$; perdió $x = \pi$ y la respuesta es $\{0, \pi\}$
  <!-- feedback: Correcto. Al factorizar $\sin x(\cos x - 1) = 0$ aparece $\sin x = 0$, que da $x = 0$ y $x = \pi$; $\cos x = 1$ solo repite $x = 0$. -->

### Explicacion Pedagogica
Dividir por una expresión que puede valer $0$ hace perder soluciones. Lo correcto es pasar todo a un miembro y factorizar: $\sin x\cos x - \sin x = \sin x(\cos x - 1) = 0$. Entonces $\sin x = 0$ ($x = 0$ o $x = \pi$) o $\cos x = 1$ ($x = 0$). Soluciones: $\{0, \pi\}$.

## Question 13 [D7-D8]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v13
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.59
**Contexto:** Dos poleas de un ascensor de un edificio en Puerto Madero se sincronizan cuando $\sin 2x = \cos x$, con $x$ en $[0, 2\pi)$.

### Enunciado
¿Cuántas soluciones tiene $\sin 2x = \cos x$ en el intervalo $[0, 2\pi)$?

### Opciones
- [ ] A) $2$
  <!-- feedback: Incorrecto. Se dividió por $\cos x$ y quedaron solo $\frac{\pi}{6}$ y $\frac{5\pi}{6}$; se perdieron los ceros de $\cos x$. -->
- [ ] B) $3$
  <!-- feedback: Incorrecto. Del factor $\cos x = 0$ salen dos soluciones en $[0, 2\pi)$, $\frac{\pi}{2}$ y $\frac{3\pi}{2}$, no una. -->
- [x] C) $4$
  <!-- feedback: Correcto. Con $2\sin x\cos x - \cos x = \cos x(2\sin x - 1) = 0$: $\cos x = 0$ da $\frac{\pi}{2}, \frac{3\pi}{2}$ y $\sin x = \frac{1}{2}$ da $\frac{\pi}{6}, \frac{5\pi}{6}$. -->
- [ ] D) $6$
  <!-- feedback: Incorrecto. Se contaron también $\frac{7\pi}{6}$ y $\frac{11\pi}{6}$, donde $\sin x = -\frac{1}{2}$, que no cumplen $2\sin x - 1 = 0$. -->

### Explicacion Pedagogica
Reescribimos con ángulo doble: $2\sin x\cos x = \cos x$, es decir, $\cos x(2\sin x - 1) = 0$. El primer factor da $x = \frac{\pi}{2}$ y $x = \frac{3\pi}{2}$; el segundo, $\sin x = \frac{1}{2}$, da $x = \frac{\pi}{6}$ y $x = \frac{5\pi}{6}$. En total hay $4$ soluciones.

## Question 14 [D7-D8]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v14
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.57
**Contexto:** En una planilla de cálculo de una escuela técnica de Avellaneda se grafica $f(x) = \sec^2 x - \tan^2 x$ y la curva parece la recta $y = 1$.

### Enunciado
¿Para qué valores de $x$ se cumple que $f(x) = \sec^2 x - \tan^2 x$ es igual a $1$?

### Opciones
- [x] A) Para todo real salvo $x = \frac{\pi}{2} + k\pi$, con $k$ entero
  <!-- feedback: Correcto. La identidad $1 + \tan^2 x = \sec^2 x$ da $f(x) = 1$, pero solo donde $\cos x \ne 0$, porque en $\frac{\pi}{2} + k\pi$ ni la secante ni la tangente existen. -->
- [ ] B) Para todo número real $x$
  <!-- feedback: Incorrecto. En $x = \frac{\pi}{2}$ el coseno vale $0$ y $\sec x$ no está definida, así que $f$ no existe allí. -->
- [ ] C) Solo para $x$ en $\left[0, \frac{\pi}{2}\right)$
  <!-- feedback: Incorrecto. La identidad vale en cualquier $x$ con $\cos x \ne 0$, por ejemplo en $x = \pi$: $1 - 0 = 1$. -->
- [ ] D) Para ningún $x$, porque $\sec^2 x - \tan^2 x = -1$
  <!-- feedback: Incorrecto. Se restó en el orden contrario: $\tan^2 x - \sec^2 x = -1$, pero $\sec^2 x - \tan^2 x = 1$. -->

### Explicacion Pedagogica
De $\sin^2 x + \cos^2 x = 1$ dividiendo por $\cos^2 x$ resulta $\tan^2 x + 1 = \sec^2 x$, o sea $\sec^2 x - \tan^2 x = 1$. Pero toda identidad vale solo en el dominio de sus expresiones: aquí se excluyen los $x = \frac{\pi}{2} + k\pi$, donde $\cos x = 0$. El gráfico es la recta $y = 1$ con huecos.

## Question 15 [D7-D8]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v15
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.55
**Contexto:** Desde el Cerro de la Gloria, en Mendoza, se observan dos antenas: las visuales forman con el suelo ángulos agudos $\alpha$ y $\beta$ con $\tan\alpha = \frac{1}{2}$ y $\tan\beta = \frac{1}{3}$.

### Enunciado
¿Cuánto mide el ángulo $\alpha + \beta$?

### Opciones
- [x] A) $45^\circ$
  <!-- feedback: Correcto. Con $\tan(\alpha+\beta) = \frac{\frac{1}{2} + \frac{1}{3}}{1 - \frac{1}{2}\cdot\frac{1}{3}} = \frac{5/6}{5/6} = 1$, y siendo $\alpha+\beta$ agudo, vale $45^\circ$. -->
- [ ] B) $\arctan\left(\frac{5}{6}\right)$
  <!-- feedback: Incorrecto. Se sumaron las tangentes sin dividir por $1 - \tan\alpha\tan\beta$; la tangente no es aditiva. -->
- [ ] C) $\arctan\left(\frac{1}{6}\right)$
  <!-- feedback: Incorrecto. Se multiplicaron las tangentes; la fórmula de la suma usa $\tan\alpha + \tan\beta$ en el numerador. -->
- [ ] D) $\arctan\left(\frac{5}{7}\right)$
  <!-- feedback: Incorrecto. Se puso $1 + \tan\alpha\tan\beta = \frac{7}{6}$ en el denominador; para la suma corresponde el signo menos. -->

### Explicacion Pedagogica
La fórmula es $\tan(\alpha + \beta) = \frac{\tan\alpha + \tan\beta}{1 - \tan\alpha\tan\beta}$. Numerador: $\frac{5}{6}$; denominador: $1 - \frac{1}{6} = \frac{5}{6}$. Entonces $\tan(\alpha+\beta) = 1$. Como cada ángulo es menor que $45^\circ$, la suma está entre $0^\circ$ y $90^\circ$, y el único ángulo así con tangente $1$ es $45^\circ$.

## Question 16 [D7-D8]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v16
**Bloom:** Analyze
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.53
**Contexto:** En un problema de olimpíada para colegios de Corrientes se pide reducir $\cos^4 x - \sin^4 x$ a una sola razón trigonométrica.

### Enunciado
¿A qué expresión es equivalente $\cos^4 x - \sin^4 x$?

### Opciones
- [ ] A) $1$
  <!-- feedback: Incorrecto. Se confundió con $(\cos^2 x + \sin^2 x)^2 = 1$; aquí hay una resta, y en $x = \frac{\pi}{2}$ la expresión vale $-1$. -->
- [x] B) $\cos 2x$
  <!-- feedback: Correcto. Por diferencia de cuadrados: $(\cos^2 x - \sin^2 x)(\cos^2 x + \sin^2 x) = (\cos 2x)\cdot 1 = \cos 2x$. -->
- [ ] C) $\cos^2 2x$
  <!-- feedback: Incorrecto. El factor $\cos^2 x + \sin^2 x$ vale $1$, no $\cos 2x$; por eso no aparece un cuadrado de $\cos 2x$. -->
- [ ] D) $1 - 2\sin^2 x\cos^2 x$
  <!-- feedback: Incorrecto. Esa expresión es igual a $\cos^4 x + \sin^4 x$ (con suma); en $x = \frac{\pi}{2}$ vale $1$ y la original vale $-1$. -->

### Explicacion Pedagogica
Vemos $\cos^4 x - \sin^4 x$ como diferencia de cuadrados $p^2 - q^2 = (p-q)(p+q)$ con $p = \cos^2 x$ y $q = \sin^2 x$. El factor $p + q = 1$ y el factor $p - q = \cos^2 x - \sin^2 x = \cos 2x$. Resultado: $\cos 2x$.

## Question 17 [D9-D10]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.50
**Contexto:** Cuatro estudiantes de Paraná resuelven $\cos^2 x = \frac{1}{4}$ en $[0, 2\pi)$ para hallar en qué posiciones una biela forma cierto ángulo.

### Enunciado
¿Qué estudiante obtuvo el conjunto de soluciones correcto de $\cos^2 x = \frac{1}{4}$ en $[0, 2\pi)$?

### Opciones
- [ ] A) Ana: $\left\{\frac{\pi}{3}, \frac{5\pi}{3}\right\}$
  <!-- feedback: Incorrecto. Ana tomó solo la raíz positiva $\cos x = \frac{1}{2}$ y olvidó $\cos x = -\frac{1}{2}$. -->
- [x] B) Bruno: $\left\{\frac{\pi}{3}, \frac{2\pi}{3}, \frac{4\pi}{3}, \frac{5\pi}{3}\right\}$
  <!-- feedback: Correcto. De $\cos x = \pm\frac{1}{2}$: el valor $\frac{1}{2}$ da $\frac{\pi}{3}, \frac{5\pi}{3}$ y el valor $-\frac{1}{2}$ da $\frac{2\pi}{3}, \frac{4\pi}{3}$. -->
- [ ] C) Carla: $\left\{\frac{\pi}{3}\right\}$
  <!-- feedback: Incorrecto. Carla dio solo el ángulo de referencia; en $[0, 2\pi)$ el coseno toma cada valor dos veces. -->
- [ ] D) Diego: $\left\{\frac{\pi}{6}, \frac{5\pi}{6}, \frac{7\pi}{6}, \frac{11\pi}{6}\right\}$
  <!-- feedback: Incorrecto. Diego resolvió $\sin^2 x = \frac{1}{4}$; en $\frac{\pi}{6}$ el coseno vale $\frac{\sqrt{3}}{2}$, cuyo cuadrado es $\frac{3}{4}$. -->

### Explicacion Pedagogica
Al sacar raíz cuadrada aparecen dos casos: $\cos x = \frac{1}{2}$ o $\cos x = -\frac{1}{2}$. El primero da $\frac{\pi}{3}$ y $\frac{5\pi}{3}$; el segundo, $\frac{2\pi}{3}$ y $\frac{4\pi}{3}$. Las cuatro soluciones de Bruno son correctas; las otras respuestas omiten casos o resuelven otra ecuación.

## Question 18 [D9-D10]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.48
**Contexto:** En un foro de estudiantes de Mar del Plata alguien afirma que $\sin(a + b) = \sin a + \sin b$ para todos los ángulos $a$ y $b$.

### Enunciado
¿Cuál es la evaluación correcta de esa afirmación?

### Opciones
- [ ] A) Es verdadera, porque el seno es una función lineal
  <!-- feedback: Incorrecto. El seno no es lineal: está acotado entre $-1$ y $1$, y $\sin(2a) = 2\sin a\cos a$, no $2\sin a$. -->
- [ ] B) Es verdadera, porque con $a = b = 0$ se obtiene $0 = 0$
  <!-- feedback: Incorrecto. Un caso que cumple la igualdad no prueba que valga para todos los ángulos; con $a = b = \frac{\pi}{2}$ falla. -->
- [ ] C) Es falsa, porque $\sin(a+b) = \sin a\cos b - \cos a\sin b$
  <!-- feedback: Incorrecto. La conclusión es correcta pero el argumento no: esa fórmula con signo menos corresponde a $\sin(a - b)$. -->
- [x] D) Es falsa: con $a = b = \frac{\pi}{2}$ queda $\sin\pi = 0$, pero $\sin a + \sin b = 2$
  <!-- feedback: Correcto. Un contraejemplo alcanza para refutar una afirmación universal; la fórmula correcta es $\sin(a+b) = \sin a\cos b + \cos a\sin b$. -->

### Explicacion Pedagogica
Para refutar una afirmación del tipo para todo basta un contraejemplo: con $a = b = \frac{\pi}{2}$, $\sin(\pi) = 0$ mientras $\sin\frac{\pi}{2} + \sin\frac{\pi}{2} = 2$. La fórmula válida es $\sin(a+b) = \sin a\cos b + \cos a\sin b$; la versión con resta es $\sin(a-b)$.

## Question 19 [D9-D10]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.47
**Contexto:** En la carpeta de una alumna de San Juan aparece este intento de verificar $\frac{1}{1+\sin x} + \frac{1}{1-\sin x} = 2\sec^2 x$: Paso 1: $\frac{(1-\sin x) + (1+\sin x)}{(1+\sin x)(1-\sin x)}$; Paso 2: $\frac{2}{1 - \sin^2 x}$; Paso 3: $\frac{2}{1} - \frac{2}{\sin^2 x}$; conclusión: la identidad es falsa.

### Enunciado
¿Cuál es la evaluación correcta del trabajo de la alumna?

### Opciones
- [ ] A) La identidad es falsa, como lo muestra el paso 3
  <!-- feedback: Incorrecto. El paso 3 es inválido, así que no prueba nada; con $x = 0$ ambos lados valen $2$, y en general coinciden. -->
- [x] B) La identidad es verdadera; el error está en el paso 3, porque una fracción no se separa según los términos del denominador
  <!-- feedback: Correcto. Desde el paso 2, $1 - \sin^2 x = \cos^2 x$, así que $\frac{2}{\cos^2 x} = 2\sec^2 x$; el paso 3 aplica una regla inexistente $\frac{c}{p - q} = \frac{c}{p} - \frac{c}{q}$. -->
- [ ] C) El error está en el paso 1: el denominador común debía ser $(1+\sin x) + (1-\sin x)$
  <!-- feedback: Incorrecto. Para sumar fracciones el denominador común es el producto de los denominadores, no su suma; el paso 1 está bien. -->
- [ ] D) El error está en el paso 2: $(1+\sin x)(1-\sin x) = 1 + \sin^2 x$
  <!-- feedback: Incorrecto. El producto es una diferencia de cuadrados: $(1+s)(1-s) = 1 - s^2$; el paso 2 está bien. -->

### Explicacion Pedagogica
Pasos 1 y 2 son correctos: denominador común y diferencia de cuadrados $(1+\sin x)(1-\sin x) = 1 - \sin^2 x$. Luego $1 - \sin^2 x = \cos^2 x$ y $\frac{2}{\cos^2 x} = 2\sec^2 x$, que demuestra la identidad. El paso 3 inventa una propiedad: el denominador de una fracción no se reparte sobre una resta.

## Question 20 [D9-D10]
**ID:** AR-MAT-11-2026-W12-identidades-trigonometricas-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**EJE:** Álgebra y Funciones
**Expected_Success:** 0.45
**Contexto:** Para ubicar un panel solar en Jujuy se resuelve $\sin x = \sqrt{3}\cos x$ en $[0, 2\pi)$; un técnico divide por $\cos x$ y obtiene $\tan x = \sqrt{3}$.

### Enunciado
¿Es válido el paso de dividir por $\cos x$ y cuáles son las soluciones?

### Opciones
- [x] A) Es válido: si $\cos x = 0$, entonces $\sin x = \pm 1$ y la ecuación no se cumple; las soluciones son $\frac{\pi}{3}$ y $\frac{4\pi}{3}$
  <!-- feedback: Correcto. Ningún cero de $\cos x$ es solución (quedaría $\pm 1 = 0$), así que no se pierde nada; $\tan x = \sqrt{3}$ da $\frac{\pi}{3}$ y $\frac{\pi}{3} + \pi$. -->
- [ ] B) No es válido: se pierden las soluciones $\frac{\pi}{2}$ y $\frac{3\pi}{2}$
  <!-- feedback: Incorrecto. En $x = \frac{\pi}{2}$ queda $1 = \sqrt{3}\cdot 0$, que es falso; esos valores no son soluciones. -->
- [ ] C) Es válido, pero la única solución es $\frac{\pi}{3}$
  <!-- feedback: Incorrecto. La tangente tiene período $\pi$, así que $\frac{4\pi}{3}$ también cumple $\tan x = \sqrt{3}$ y la ecuación original. -->
- [ ] D) Es válido; las soluciones son $\frac{\pi}{3}$ y $\frac{2\pi}{3}$
  <!-- feedback: Incorrecto. En $\frac{2\pi}{3}$ la tangente vale $-\sqrt{3}$; la tangente es positiva en los cuadrantes I y III, no en el II. -->

### Explicacion Pedagogica
Dividir por $\cos x$ es seguro solo si ningún $x$ con $\cos x = 0$ es solución. Si $\cos x = 0$, $\sin x = \pm 1$ y la ecuación diría $\pm 1 = 0$: imposible. Entonces $\tan x = \sqrt{3}$, con soluciones $\frac{\pi}{3}$ y $\frac{4\pi}{3}$ en $[0, 2\pi)$.
