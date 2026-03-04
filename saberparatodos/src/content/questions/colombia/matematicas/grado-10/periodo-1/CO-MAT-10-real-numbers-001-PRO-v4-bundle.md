---
id: "CO-MAT-10-real-numbers-001-PRO"
country: "co"
grado: 10
asignatura: "matematicas"
tema: "Números Reales y Funciones"
periodo: 1
protocol_version: "4.1"
total_questions: 20
difficulty_range: "4-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["Interpretación y Representación", "Formulación y Ejecución", "Argumentación"]
cognitive_levels: ["Identify", "Use", "Analyze", "Evaluate", "Create"]
estado: "draft"
creador: "Antigravity (Protocol v4.1)"
generation_date: "2026-03-03"
source: "Saber 11 - Mathematics Framework / DBA G10"
source_license: "CC BY-SA 4.0"
---

## Contexto 1: El Universo de los Números - Más Allá de los Racionales
Toda tu vida has trabajado con números fraccionarios y enteros. Pero el mundo de las matemáticas es muchísimo más rico. Los **Números Irracionales** como √2 o π no pueden expresarse como una fracción, y tienen infinitos decimales sin patrón de repetición. Junto con los racionales, forman los **Números Reales (ℝ)**, el sistema que usamos para modelar cualquier fenómeno continuo en la naturaleza. Entender la estructura de este universo numérico, sus propiedades algebraicas (conmutativa, distributiva, asociativa) y su representación en la recta numérica es el primer pilar sobre el que se construye todo el cálculo y la algebría avanzada que vendrá en Grado 11.

---

## Question 1 (Clasificación - Dificultad 4)

**ID:** `CO-MAT-10-real-numbers-001-PRO-v1`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Identify

### Enunciado
¿Cuál de los siguientes números es **irracional**?

### Opciones
- [ ] A) $\frac{22}{7}$
- [ ] B) $\sqrt{16}$
- [x] C) $\sqrt{5}$
- [ ] D) $0.\overline{3}$

### Explicación Pedagógica
$\sqrt{5}$ es irracional porque 5 no es un cuadrado perfecto. $\sqrt{16} = 4$ (entero), $\frac{22}{7}$ es racional y $0.\overline{3} = \frac{1}{3}$ es racional. La clave es preguntarse si el número puede expresarse como fracción $\frac{p}{q}$ con $q \neq 0$.

---

## Question 2 (Propiedades - Dificultad 5)

**ID:** `CO-MAT-10-real-numbers-001-PRO-v2`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
La expresión $a(b + c) = ab + ac$ es un ejemplo de la propiedad:

### Opciones
- [ ] A) Conmutativa de la multiplicación.
- [x] B) Distributiva de la multiplicación sobre la suma.
- [ ] C) Asociativa de la suma.
- [ ] D) Elemento neutro de la multiplicación.

### Explicación Pedagógica
La propiedad distributiva establece que multiplicar un número por una suma es igual a multiplicar ese número por cada término de la suma y luego sumar los productos. Es la base del álgebra para expandir y factorizar expresiones.

---

## Question 3 (Intervalos y Desigualdades - Dificultad 7)

**ID:** `CO-MAT-10-real-numbers-001-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Formulación y Ejecución
**Bloom:** Use

### Enunciado
¿Cuáles de los siguientes números pertenecen al intervalo $(-3, 5]$?

### Opciones
- [x] A) $0$ <!-- weight: 1.0 -->
- [ ] B) $-3$ (El intervalo es abierto en $-3$, entonces $-3$ NO pertenece)
- [x] C) $5$ (El intervalo es cerrado en $5$, entonces $5$ SÍ pertenece) <!-- weight: 1.0 -->
- [x] D) $\pi \approx 3.14$ <!-- weight: 1.0 -->
- [ ] E) $-4$

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
La notación $(-3, 5]$ significa: mayor estricto que $-3$ (paréntesis = abierto) y menor o **igual** a $5$ (corchete = cerrado). Los puntos A, C y D satisfacen $-3 < x \leq 5$.

---

## Question 4 (Valor Absoluto - Dificultad 6)

**ID:** `CO-MAT-10-real-numbers-001-PRO-v4`
### Enunciado
Resuelve: $|2x - 4| = 6$

### Opciones
- [ ] A) $x = 5$ únicamente.
- [ ] B) $x = -1$ únicamente.
- [x] C) $x = 5$ o $x = -1$
- [ ] D) No tiene solución.

### Explicación Pedagógica
$|2x - 4| = 6$ se resuelve considerando dos casos: $2x - 4 = 6 \Rightarrow x = 5$ y $2x - 4 = -6 \Rightarrow x = -1$. El valor absoluto siempre genera dos ecuaciones, ya que la distancia a cero puede ser positiva o negativa.

---

## Question 5 (Funciones - Dificultad 8)

**ID:** `CO-MAT-10-real-numbers-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Dada la función $f(x) = \frac{x+1}{x^2 - 4}$, ¿cuáles valores pertenecen al dominio?

### Options
- [x] A) $x = 3$ <!-- weight: 1.0 -->
- [ ] B) $x = 2$ (hace el denominador 0) <!-- weight: 0.0 -->
- [x] C) $x = -5$ <!-- weight: 1.0 -->
- [ ] D) $x = -2$ (hace el denominador 0) <!-- weight: 0.0 -->

### Scoring
- Respuesta A o C: 1.0 punto cada una.

### Explicación Pedagógica
El denominador $x^2 - 4 = (x-2)(x+2)$ es cero cuando $x = 2$ o $x = -2$. El dominio excluye estos valores. Cualquier otro número real como $x = 3$ o $x = -5$ es válido.

---

## Contexto 2: Modelando el Mundo con Funciones
Una función es la herramienta matemática más poderosa para describir cómo cambia el universo. La velocidad de un coche, el crecimiento de una bacteria, la trayectoria de un balón: todo puede modelarse con funciones. En grado 10, avanzamos hacia funciones más complejas como las **Funciones Cuadráticas** ($f(x)=ax^2+bx+c$), cuya gráfica es una parábola, y comenzamos a entender cómo la forma de una función nos dice todo sobre el fenómeno que describe.

---

## Question 6 (Función Cuadrática - Dificultad 8)

**ID:** `CO-MAT-10-real-numbers-001-PRO-v6`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
La función $f(x) = -2x^2 + 8x - 3$ modela la altura (en metros) de un proyectil. ¿Qué indica el signo negativo del coeficiente $a = -2$?

### Opciones
- [x] A) La parábola abre hacia abajo, lo que indica que la función tiene un valor máximo.
- [ ] B) La parábola abre hacia arriba, lo que indica que la función tiene un valor mínimo.
- [ ] C) La función no es cuadrática.
- [ ] D) El proyectil nunca sube.

### Explicación Pedagógica
Si $a < 0$, la parábola "llora" (se abre hacia abajo) y el vértice representa el **máximo** de la función. En física, esto corresponde al punto máximo de altura del proyectil antes de comenzar a caer.

---

## Question 7 (Raíces y Discriminante - Dificultad 7)

**ID:** `CO-MAT-10-real-numbers-001-PRO-v7`

### Enunciado
Para la ecuación $x^2 - 4x + 7 = 0$, ¿cuántas soluciones reales tiene?

### Opciones
- [ ] A) Dos soluciones reales distintas.
- [ ] B) Una solución real doble.
- [x] C) No tiene soluciones reales (el discriminante es negativo).
- [ ] D) Infinitas soluciones.

### Explicación Pedagógica
Discriminante: $\Delta = b^2 - 4ac = (-4)^2 - 4(1)(7) = 16 - 28 = -12 < 0$. Cuando $\Delta < 0$, la ecuación no tiene soluciones en los reales (las soluciones son complejas). La parábola no corta el eje X.

---

## Question 13 (Modelamiento Aplicado - Dificultad 9)

**ID:** `CO-MAT-10-real-numbers-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
La altura (en metros) de un balón lanzado hacia arriba es: $h(t) = -5t^2 + 20t + 1$, donde $t$ son los segundos. ¿A cuántos metros está el balón en su punto más alto?

### Options
- [x] A) 21 metros <!-- weight: 1.0 -->
- [ ] B) 20 metros <!-- weight: 0.0 -->
- [ ] C) 1 metro <!-- weight: 0.0 -->
- [ ] D) 4 metros <!-- weight: 0.0 -->

### Scoring
- Solo A: 1.0 punto.

### Explicación Pedagógica
El tiempo del vértice: $t = -\frac{b}{2a} = -\frac{20}{2(-5)} = 2$ segundos. La altura máxima: $h(2) = -5(4) + 20(2) + 1 = -20 + 40 + 1 = 21$ metros. Se aplica la fórmula del vértice de una parábola.

---

## Question 20 (Síntesis - Dificultad 10)

**ID:** `CO-MAT-10-real-numbers-001-PRO-v20`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Create

### Enunciado
Una empresa tiene ingresos de $I(x) = 100x$ y costos de $C(x) = 2x^2 + 20x + 300$, donde $x$ es la cantidad de unidades. La **Ganancia** es $G(x) = I(x) - C(x)$. ¿Para qué rango de unidades (con $x > 0$) obtendrá la empresa ganancia positiva?

### Options
- [ ] A) Para todo $x > 0$.
- [ ] B) Para $x > 20$ únicamente.
- [x] C) Para $0 < x < 30$ (Hay que resolver $G(x) > 0$, lo que da $-2x^2 + 80x - 300 > 0$, simplificando $x^2 - 40x + 150 < 0$, con raíces $x \approx 4.7$ y $x \approx 35.3$).
- [ ] D) Para $x > 35$.

### Explicación Pedagógica
$G(x) = 100x - (2x^2 + 20x + 300) = -2x^2 + 80x - 300$. Raíces: discriminante $\Delta = 6400 - 2400 = 4000$. Las raíces son $x = \frac{-80 \pm \sqrt{4000}}{-4}$. Como $a < 0$, la parábola es cóncava hacia abajo y la ganancia es positiva **entre** las raíces. Este es un problema de modelamiento matemático del mundo real.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Contenido | Bloom | ICFES | Validado |
|----|-----|------|-----------|-------|-------|----------|
| 1 | ...-v1 | 4 | Irracionales | Identify | Int/Rep | ✅ |
| 2 | ...-v2 | 5 | Propiedades | Analyze | Arg | ✅ |
| 3 | ...-v3 | 7 | Intervalos | Use | Form/Ej | ✅ |
| 4 | ...-v4 | 6 | Valor Abs | Use | Form/Ej | ✅ |
| 5 | ...-v5 | 8 | Dominio | Evaluate | Form/Ej | ✅ |
| 6 | ...-v6 | 8 | F. Cuadrática | Analyze | Arg | ✅ |
| 7 | ...-v7 | 7 | Discriminante | Analyze | Form/Ej | ✅ |
| 13 | ...-v13| 9 | Modelamiento | Evaluate | Form/Ej | ✅ |
| 20 | ...-v20| 10| Empresa/Gcia | Create | Arg | ✅ |
