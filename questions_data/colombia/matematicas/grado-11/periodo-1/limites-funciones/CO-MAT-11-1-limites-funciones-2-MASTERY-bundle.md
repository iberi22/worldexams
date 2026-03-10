---
id: "CO-MAT-11-1-limites-funciones-2-MASTERY"
protocol_version: "5.0"
periodo: 1
bundle_index: 2
total_questions: 20
calibration:
  expected_success_rate: 0.65
  discrimination_index_target: ">= 0.2"
---

# Bundle: Límites de Funciones (Mastery Edition - Bundle 2)

## Question 1 (Límite por Tabulación - Dificultad 4)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v1`
**Bloom:** Analyze
**ICFES:** Interpretación y Representación

### Enunciado
Un estudiante de Grado 11 en Cali quiere estimar $\lim_{x \to 0} \frac{\sin x}{x}$ usando su calculadora. Crea la siguiente tabla:

| $x$ | $f(x)$ |
|-----|--------|
| -0.1| 0.99833|
| -0.01| 0.99998|
| 0.01| 0.99998|
| 0.1 | 0.99833|

Basado únicamente en estos datos, ¿cuál es la mejor estimación para el límite?

### Opciones
- [ ] A) 0 <!-- feedback: Incorrecto. Los valores se acercan a 1, no a 0. -->
- [x] B) 1 <!-- feedback: Correcto. La tendencia tanto por izquierda como por derecha apunta claramente hacia el valor 1. -->
- [ ] C) No existe. <!-- feedback: Incorrecto. Los valores laterales coinciden en su tendencia. -->
- [ ] D) Indefinido. <!-- feedback: Incorrecto. El límite existe aunque f(0) sea indefinido. -->

**Rubrica:** Estima límites a partir de datos numéricos.
**Justificación:** La tabulación es una herramienta intuitiva para visualizar la convergencia de una función cerca de un punto crítico.

---

## Question 2 (Propiedades de los Límites - Dificultad 4)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Formulación y Ejecución

### Enunciado
Si sabemos que $\lim_{x \to a} f(x) = 5$ y $\lim_{x \to a} g(x) = -2$, calcule el valor de $\lim_{x \to a} [3f(x) - g(x)^2]$.

### Opciones
- [x] A) 11 <!-- feedback: Correcto. 3(5) - (-2)^2 = 15 - 4 = 11. -->
- [ ] B) 19 <!-- feedback: Incorrecto. Error en el signo del cuadrado o la resta. -->
- [ ] C) 13 <!-- feedback: Incorrecto. Error en el cálculo aritmético. -->
- [ ] D) 7 <!-- feedback: Incorrecto. Error en la aplicación de las constantes. -->

**Rubrica:** Aplica propiedades aritméticas de los límites.
**Justificación:** Los límites se comportan linealmente con respecto a la suma, resta y potencia (bajo condiciones de existencia).

---

## Question 3 (Indeterminación 0/0 Trinomios - Dificultad 6)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Calcule:
$$\lim_{x \to -3} \frac{x^2 + x - 6}{x + 3}$$

### Opciones
- [ ] A) 0
- [ ] B) -3
- [x] C) -5 <!-- feedback: Correcto. Factorizando el numerador: (x+3)(x-2). Cancelando (x+3) queda x-2. Evaluando en -3: -3 - 2 = -5. -->
- [ ] D) 5

**Rubrica:** Simplifica expresiones racionales para resolver límites indeterminados.
**Justificación:** La cancelación del factor nulo en el denominador revela el comportamiento continuo subyacente.

---

## Question 4 (Límite al Infinito: Grados Diferentes - Dificultad 5)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v4`
**Bloom:** Analyze
**ICFES:** Interpretación y Representación

### Enunciado
¿Cuál es el valor del límite $\lim_{x \to \infty} \frac{100x + 5000}{x^2 - 1}$?

### Opciones
- [x] A) 0 <!-- feedback: Correcto. Como el grado del denominador (2) es mayor que el del numerador (1), la función tiende a cero. -->
- [ ] B) 100 <!-- feedback: Incorrecto. Esto sucedería si el grado del denominador fuera 1. -->
- [ ] C) Infinito <!-- feedback: Incorrecto. La parte de abajo crece más rápido que la de arriba. -->
- [ ] D) 5000 <!-- feedback: Incorrecto. Las constantes no dominan al infinito. -->

**Rubrica:** Analiza el dominio de funciones racionales cuando el denominador domina.
**Justificación:** En el infinito, las potencias más altas determinan la jerarquía de crecimiento; si el denominador gana, la fracción se desvanece.

---

## Question 5 (Indeterminación con Raíces y Sumas - Dificultad 7)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Halle el valor de $\lim_{x \to 4} \frac{2 - \sqrt{x}}{x - 4}$.

### Opciones
- [ ] A) 1/4
- [x] B) -1/4 <!-- feedback: Correcto. Racionalizando: (2-sqrt(x))(2+sqrt(x)) / ((x-4)(2+sqrt(x))) = (4-x) / ((x-4)(2+sqrt(x))) = -1 / (2+sqrt(x)). Evaluando en 4: -1 / (2+2) = -1/4. -->
- [ ] C) 0
- [ ] D) -1/2

**Rubrica:** Aplica racionalización con atención al cambio de signo en factores comunes.
**Justificación:** El factor $(4-x)$ es el opuesto de $(x-4)$, lo que introduce un $-1$ tras la simplificación.

---

## Question 6 (Límites y Asíntotas Horizontales - Dificultad 6)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Interpretación y Representación

### Enunciado
Un satélite de comunicaciones describe una trayectoria donde su desviación de la órbita ideal $d(t)$ sigue la función $d(t) = \frac{4t^2 - 1}{2t^2 + 7t}$ para $t > 0$ años. ¿Cuál es la desviación máxima a largo plazo?

### Opciones
- [ ] A) 4
- [x] B) 2 <!-- feedback: Correcto. El límite al infinito de una función racional de igual grado es el cociente de los coeficientes líderes: 4/2 = 2. -->
- [ ] C) 0
- [ ] D) No tiene límite.

**Rubrica:** Conecta el concepto de límite al infinito con la existencia de asíntotas horizontales en ingeniería.
**Justificación:** La estabilidad de un sistema a largo plazo se modela mediante el comportamiento asintótico de su función de error.

---

## Question 7 (Discontinuidad de Salto - Dificultad 6)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Interpretación y Representación

### Enunciado
Sea $f(x) = \frac{x}{|x|}$. ¿Qué se puede afirmar sobre $\lim_{x \to 0} f(x)$?

### Opciones
- [ ] A) El límite es 1. <!-- feedback: Incorrecto. Este es solo el límite por la derecha. -->
- [ ] B) El límite es -1. <!-- feedback: Incorrecto. Este es solo el límite por la izquierda. -->
- [x] C) El límite no existe porque los laterales son 1 y -1. <!-- feedback: Correcto. La función salta de -1 a 1 en el origen. -->
- [ ] D) El límite es 0. <!-- feedback: Incorrecto. La función nunca toma el valor 0 cerca del origen. -->

**Rubrica:** Identifica discontinuidades de salto mediante el análisis de límites laterales.
**Justificación:** Si no hay consenso en la aproximación desde ambas direcciones, el punto de acumulación no define un límite.

---

## Question 8 (Indeterminación 0/0: Diferencia de Cubos - Dificultad 8)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Calcule:
$$\lim_{x \to 1} \frac{x^3 - 1}{x^2 - 1}$$

### Opciones
- [ ] A) 1
- [x] B) 3/2 <!-- feedback: Correcto. Factorizando: [(x-1)(x^2+x+1)] / [(x-1)(x+1)] = (x^2+x+1)/(x+1). Evaluando en 1: (1+1+1)/(1+1) = 3/2. -->
- [ ] C) 2/3
- [ ] D) 0

**Rubrica:** Aplica productos notables avanzados para la resolución de límites.
**Justificación:** La factorización simultánea de numerador y denominador permite eliminar la causa de la indeterminación.

---

## Question 9 (Límite Trigonométrico con Argumento Compuesto - Dificultad 7)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Halle el valor de $\lim_{x \to 0} \frac{\tan(3x)}{x}$. (Ayuda: $\tan \theta = \frac{\sin \theta}{\cos \theta}$).

### Opciones
- [ ] A) 1
- [ ] B) 0
- [x] C) 3 <!-- feedback: Correcto. Tan(3x)/x = [sin(3x)/cos(3x)] / x = [sin(3x)/(3x)] * [3 / cos(3x)]. El primer término tiende a 1 y el segundo a 3/cos(0) = 3. -->
- [ ] D) 1/3

**Rubrica:** Utiliza identidades trigonométricas para reducir límites a formas fundamentales.
**Justificación:** La tangente hereda el comportamiento del seno cerca del origen, escalado por el coeficiente del argumento.

---

## Question 10 (Continuidad en un Intervalo - Dificultad 5)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Interpretación y Representación

### Enunciado
¿En qué valor de $x$ presenta una discontinuidad la función $f(x) = \frac{x+2}{x^2 - 9}$?

### Opciones
- [ ] A) Solo en $x = -2$. <!-- feedback: Incorrecto. Aquí la función vale 0, lo cual es perfectamente válido. -->
- [x] B) En $x = 3$ y $x = -3$. <!-- feedback: Correcto. Estos valores hacen que el denominador sea cero, anulando la definición de la función. -->
- [ ] C) Solo en $x = 9$.
- [ ] D) En ningún punto, es continua en todos los reales.

**Rubrica:** Localiza puntos de discontinuidad basados en el dominio de la función.
**Justificación:** Las funciones racionales son discontinuas donde sus denominadores se anulan.

---

## Question 11 (Límites Infinitos de Funciones Exponenciales - Dificultad 7)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Interpretación y Representación

### Enunciado
¿Cuál es el valor de $\lim_{x \to \infty} \frac{e^x}{x^{100}}$?

### Opciones
- [ ] A) 0
- [x] B) Infinito <!-- feedback: Correcto. Las funciones exponenciales crecen mucho más rápido que cualquier función polinómica en el infinito. -->
- [ ] C) 1
- [ ] D) No se puede determinar.

**Rubrica:** Compara órdenes de magnitud de diferentes familias de funciones.
**Justificación:** La jerarquía de crecimiento coloca a la exponencial por encima de cualquier potencia de $x$, sin importar cuán grande sea el exponente.

---

## Question 12 (Interpretación de Derivada como Límite - Dificultad 8)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v12`
**Bloom:** Understand
**ICFES:** Argumentación

### Enunciado
La expresión $\lim_{h \to 0} \frac{\sin(x+h) - \sin x}{h}$ representa la definición de la derivada de $\sin x$. Según sus conocimientos de límites y derivadas, ¿a qué función es equivalente este límite?

### Opciones
- [ ] A) $\sin x$
- [x] B) $\cos x$ <!-- feedback: Correcto. La derivada de la función seno es la función coseno. -->
- [ ] C) $-\cos x$
- [ ] D) 1

**Rubrica:** Reconoce la estructura del límite de Fermat-Newton para derivadas comunes.
**Justificación:** La derivada es, por definición, el límite de la razón de cambio promedio cuando el intervalo de tiempo tiende a cero.

---

## Question 13 (Límite con Radicales y Sumas Infinitas - Dificultad 9)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v13`
**Bloom:** Evaluate
**ICFES:** Argumentación

### Enunciado
Halle el valor de $\lim_{x \to \infty} \frac{\sqrt{x^2 + x}}{x}$.

### Opciones
- [ ] A) 0
- [x] B) 1 <!-- feedback: Correcto. Factorizando x^2 dentro de la raíz: sqrt(x^2(1+1/x))/x = |x|sqrt(1+1/x)/x. Para x positivo grande, x/x=1. El límite es sqrt(1+0) = 1. -->
- [ ] C) Infinito
- [ ] D) 1/2

**Rubrica:** Simplifica expresiones radicales en el infinito mediante factorización de potencias líderes.
**Justificación:** En el infinito, $x^2 + x$ se comporta esencialmente como $x^2$, por lo que su raíz se comporta como $x$.

---

## Question 14 (Teorema del Valor Intermedio: Aplicación - Dificultad 7)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v14`
**Bloom:** Evaluate
**ICFES:** Argumentación

### Enunciado
Suponga que la temperatura en Manizales es una función continua del tiempo. Si a las 6:00 AM es de 12°C y a las 12:00 PM es de 22°C, ¿qué podemos afirmar con certeza sobre la temperatura a las 9:00 AM?

### Opciones
- [ ] A) La temperatura es exactamente 17°C. <!-- feedback: Incorrecto. Podría serlo, pero la continuidad no garantiza linealidad. -->
- [ ] B) La temperatura debe ser mayor a 22°C. <!-- feedback: Incorrecto. Es improbable y no garantizado. -->
- [x] C) Hubo algún momento entre las 6:00 AM y las 12:00 PM en que la temperatura fue exactamente de 18°C. <!-- feedback: Correcto. Por el Teorema del Valor Intermedio, la función pasa por todos los valores entre 12 y 22. -->
- [ ] D) La temperatura nunca bajó de 12°C. <!-- feedback: Incorrecto. El teorema no impide que la función baje y vuelva a subir. -->

**Rubrica:** Traduce el Teorema del Valor Intermedio a situaciones de la vida real.
**Justificación:** Los fenómenos físicos continuos no pueden "saltarse" valores intermedios durante su evolución.

---

## Question 15 (Límite Especial: Definición de 'e' - Dificultad 8)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v15`
**Bloom:** Remember
**ICFES:** Interpretación y Representación

### Enunciado
¿Cuál es el valor del límite fundamental $\lim_{n \to \infty} \left(1 + \frac{1}{n}\right)^n$?

### Opciones
- [ ] A) 1
- [ ] B) Infinito
- [x] C) $e$ <!-- feedback: Correcto. Esta es una de las definiciones clásicas de la constante de Euler (aprox. 2.718). -->
- [ ] D) 0

**Rubrica:** Identifica límites especiales que definen constantes matemáticas trascendentales.
**Justificación:** Este límite modela el interés compuesto de forma continua y es la base del crecimiento exponencial.

---

## Question 16 (Límites por la Izquierda en Asíntotas - Dificultad 6)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Interpretación y Representación

### Enunciado
Dada $f(x) = \frac{1}{x^2}$. ¿Cuál es el valor de $\lim_{x \to 0^-} f(x)$?

### Opciones
- [x] A) $+\infty$ <!-- feedback: Correcto. Como x está al cuadrado, cualquier valor negativo pequeño se vuelve positivo al elevarse, resultando en 1 / (positivo muy pequeño). -->
- [ ] B) $-\infty$ <!-- feedback: Incorrecto. El cuadrado impide que el resultado sea negativo. -->
- [ ] C) 0
- [ ] D) No existe.

**Rubrica:** Evalúa el signo de límites infinitos considerando la paridad de las potencias en el denominador.
**Justificación:** La potencia par en el denominador fuerza a la función a tener el mismo comportamiento (positivo) por ambos lados del cero.

---

## Question 17 (Límite con Función Parte Entera - Dificultad 8)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v17`
**Bloom:** Analyze
**ICFES:** Interpretación y Representación

### Enunciado
Sea $f(x) = \lfloor x \rfloor$ (la función máximo entero). Calcule $\lim_{x \to 2^-} f(x)$.

### Opciones
- [x] A) 1 <!-- feedback: Correcto. Para valores como 1.99, el máximo entero menor o igual es 1. -->
- [ ] B) 2 <!-- feedback: Incorrecto. Este es el valor de f(2) y el límite por la derecha. -->
- [ ] C) No existe. <!-- feedback: Incorrecto. El límite lateral sí existe y es un valor finito. -->
- [ ] D) 1.5

**Rubrica:** Determina límites laterales en funciones escalonadas.
**Justificación:** Las funciones con saltos enteros requieren un análisis cuidadoso de la vecindad del punto por el lado indicado.

---

## Question 18 (Indeterminación 0/0 con Identidades - Dificultad 8)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v18`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Halle el valor de $\lim_{x \to 0} \frac{1 - \cos x}{x^2}$.

### Opciones
- [ ] A) 0
- [ ] B) 1
- [x] C) 1/2 <!-- feedback: Correcto. Multiplicando por (1+cos x): (1-cos^2 x) / (x^2(1+cos x)) = sin^2 x / (x^2(1+cos x)). En x->0, (sin x/x)^2 -> 1, y 1/(1+cos 0) -> 1/2. -->
- [ ] D) 2

**Rubrica:** Resuelve límites trigonométricos avanzados mediante racionalización de identidades.
**Justificación:** El uso de identidades pitagóricas permite convertir una diferencia de cosenos en un producto de senos resoluble.

---

## Question 19 (Continuidad y Parámetros en una Función - Dificultad 7)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Argumentación

### Enunciado
Determine el valor de $a$ para que $f(x)$ sea continua en todo su dominio:
$f(x) = \begin{cases} a x^2 & \text{si } x \le 2 \\ x + 6 & \text{si } x > 2 \end{cases}$

### Opciones
- [x] A) $a = 2$ <!-- feedback: Correcto. Igualamos en x=2: a(2)^2 = 2 + 6 => 4a = 8 => a = 2. -->
- [ ] B) $a = 8$
- [ ] C) $a = 4$
- [ ] D) $a = 1$

**Rubrica:** Garantiza la continuidad de funciones compuestas mediante el ajuste de coeficientes.
**Justificación:** El punto de unión debe tener la misma imagen desde ambas ramas para que no exista un salto.

---

## Question 20 (Mastery Integration: El Péndulo de Foucault en el Planetario - Dificultad 10)
**ID:** `CO-MAT-11-1-limites-funciones-2-MASTERY-v20`
**Bloom:** Transfer
**ICFES:** Argumentación + Transferencia

### Enunciado
**MASTER CHALLENGE:** En el Planetario de Bogotá, un péndulo de Foucault oscila con una amplitud que decrece por la fricción según $A(t) = A_0 e^{-\gamma t} \cos(\omega t)$. Un joven científico afirma que el límite de la amplitud cuando el tiempo tiende a infinito es 0.

Sin embargo, su compañero dice que debido a la función coseno, el límite no existe porque la función oscila para siempre. ¿Quién tiene la razón matemática y por qué?

### Opciones
- [ ] A) El compañero, porque $\cos(\infty)$ no está definido. <!-- feedback: Incorrecto. Aunque el coseno oscila, su amplitud está siendo aplastada. -->
- [x] B) El joven científico, por el Teorema del Emparedado, ya que $-e^{-\gamma t} \le e^{-\gamma t} \cos(\omega t) \le e^{-\gamma t}$ y ambas funciones laterales tienden a 0. <!-- feedback: Correcto. La exponencial decreciente "domina" y obliga a las oscilaciones a converger a cero. -->
- [ ] C) Ninguno, el límite es $A_0$ debido a la conservación de la energía. <!-- feedback: Incorrecto. La fricción disipa la energía en este modelo. -->
- [ ] D) Depende de si se usa una aplicación de Nequi para medir el tiempo. <!-- feedback: Incorrecto. La física es independiente de la plataforma de pago. -->

**Rubrica:** Aplica teoremas de límites a modelos físicos de oscilación amortiguada.
**Justificación:** La convergencia de un producto de una función acotada por una que tiende a cero es siempre cero.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Bloom | ICFES | Tema | Validado |
|----|-----|------|-------|-------|------|----------|
| 1 | ...-v1 | 4 | Analyze | Interpretación | Tabulación | ✅ |
| 2 | ...-v2 | 4 | Remember | Formulación | Propiedades | ✅ |
| 3 | ...-v3 | 6 | Apply | Formulación | 0/0 Factorización | ✅ |
| 4 | ...-v4 | 5 | Analyze | Interpretación | Infinito (Denom. mayor) | ✅ |
| 5 | ...-v5 | 7 | Apply | Formulación | 0/0 Racionalización | ✅ |
| 6 | ...-v6 | 6 | Analyze | Interpretación | Asíntotas Horizontales | ✅ |
| 7 | ...-v7 | 6 | Analyze | Interpretación | Salto (Valor Absoluto) | ✅ |
| 8 | ...-v8 | 8 | Apply | Formulación | Cubos | ✅ |
| 9 | ...-v9 | 7 | Apply | Formulación | Tan(x)/x | ✅ |
| 10 | ...-v10 | 5 | Understand | Interpretación | Puntos Discontinuidad | ✅ |
| 11 | ...-v11 | 7 | Analyze | Interpretación | Exp vs Polinómica | ✅ |
| 12 | ...-v12 | 8 | Understand | Argumentación | Derivada como Límite | ✅ |
| 13 | ...-v13 | 9 | Evaluate | Argumentación | Raíces al Infinito | ✅ |
| 14 | ...-v14 | 7 | Evaluate | Argumentación | Valor Intermedio | ✅ |
| 15 | ...-v15 | 8 | Remember | Interpretación | Límite de 'e' | ✅ |
| 16 | ...-v16 | 6 | Analyze | Interpretación | Límite Infinito Par | ✅ |
| 17 | ...-v17 | 8 | Analyze | Interpretación | Parte Entera | ✅ |
| 18 | ...-v18 | 8 | Apply | Formulación | Trigonométrico Avanzado | ✅ |
| 19 | ...-v19 | 7 | Evaluate | Argumentación | Parámetros Continuidad | ✅ |
| 20 | ...-v20 | 10 | Transfer | Argumentación | Oscilación Amortiguada | ✅ |
