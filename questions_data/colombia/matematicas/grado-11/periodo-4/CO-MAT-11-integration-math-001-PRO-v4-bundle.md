---
id: "CO-MAT-11-integration-math-001-PRO"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Simulacro Completo e Integración Final"
periodo: 4
protocol_version: "4.1"
total_questions: 20
difficulty_range: "5-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["Interpretación", "Formulación", "Argumentación"]
cognitive_levels: ["Analyze", "Evaluate", "Synthesis", "Transfer"]
estado: "draft"
creador: "Antigravity (Protocol v4.1)"
generation_date: "2026-03-03"
source: "Saber 11 - Mathematics Framework"
source_license: "CC BY-SA 4.0"
---

## Contexto 1: El Desafío Final - Rumbo al Saber 11
Felicidades. Has recorrido el camino completo: desde los fundamentos de las funciones y límites, pasando por la potencia del cálculo diferencial e integral, explorando la elegancia de las cónicas y terminando con el rigor de la estadística y la probabilidad. Sin embargo, el examen Saber 11 no te preguntará por temas aislados; te pedirá que integres tus conocimientos para resolver problemas complejos de la vida real. Este simulacro final mezcla todas las áreas para poner a prueba tu agilidad mental, tu capacidad de análisis y tu resistencia. Estás listo para demostrar que las matemáticas son el lenguaje con el que interpretas el mundo.

---

## Question 1 (Algebra - Dificultad 5)

**ID:** `CO-MAT-11-integration-math-001-PRO-v1`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Represente el dominio de la función $f(x) = \frac{\sqrt{x-2}}{x-5}$.

### Opciones
- [ ] A) $[2, \infty)$
- [x] B) $[2, 5) \cup (5, \infty)$ (Debe cumplirse $x \geq 2$ y $x \neq 5$)
- [ ] C) $(5, \infty)$
- [ ] D) Todos los reales excepto 5.

### Explicación Pedagógica
1. El radicando debe ser no negativo: $x-2 \geq 0 \rightarrow x \geq 2$.
2. El denominador no puede ser cero: $x-5 \neq 0 \rightarrow x \neq 5$.
Uniendo ambas condiciones, el dominio comienza en 2 e incluye todos los números hacia adelante, pero saltándose el hueco en 5.

---

## Question 2 (Límites - Dificultad 6)

**ID:** `CO-MAT-11-integration-math-001-PRO-v2`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Calcule el $\lim_{x \to 3} \frac{x^2 - 9}{x - 3}$.

### Opciones
- [ ] A) 0
- [ ] B) Inexistente.
- [x] C) 6 (Factorizando: $(x-3)(x+3)/(x-3)$)
- [ ] D) 3

### Explicación Pedagógica
Aunque la sustitución directa da $0/0$ (indeterminado), al factorizar la diferencia de cuadrados obtenemos $\lim_{x \to 3} (x+3) = 6$. La función tiene un "hueco" en 3, pero se dirige claramente hacia el valor 6.

---

## Question 3 (Derivadas - Dificultad 7)

**ID:** `CO-MAT-11-integration-math-001-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre la función $f(x) = x^3 - 3x^2 + 2$. Seleccione TODAS las afirmaciones correctas sobre sus puntos críticos.

### Opciones
- [x] A) Tiene un máximo relativo en $x = 0$. <!-- weight: 1.0 -->
- [x] B) Tiene un mínimo relativo en $x = 2$. <!-- weight: 1.0 -->
- [ ] C) La función siempre es creciente.
- [x] D) Posee un punto de inflexión en $x = 1$. <!-- weight: 1.0 -->
- [ ] E) No tiene raíces reales.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
$f'(x) = 3x^2 - 6x = 3x(x-2)$. Puntos críticos en 0 y 2.
$f''(x) = 6x - 6$.
$f''(0) = -6$ (Máximo). $f''(2) = 6$ (Mínimo). $f''(1) = 0$ (Inflexión).

---

## Question 4 (Integrales - Dificultad 8)

**ID:** `CO-MAT-11-integration-math-001-PRO-v4`
### Enunciado
Halle el área bajo la curva $y = x^2$ desde $x=0$ hasta $x=3$.

### Opciones
- [ ] A) 3
- [ ] B) 27
- [x] C) 9 ($\int_0^3 x^2 dx = [x^3/3]_0^3 = 27/3$)
- [ ] D) 4.5

### Explicación Pedagógica
La integral definida calcula el área exacta. La primitiva de $x^2$ es $x^3/3$. Aplicando los límites: $3^3/3 - 0 = 9$.

---

## Question 5 (Cónicas - Dificultad 8)

**ID:** `CO-MAT-11-integration-math-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Identifique la figura representada por $x^2 + 4y^2 = 16$.

### Opciones
- [x] A) Una elipse horizontal con semieje mayor 4. <!-- weight: 1.0 -->
- [x] B) $\frac{x^2}{16} + \frac{y^2}{4} = 1$. <!-- weight: 1.0 -->
- [ ] C) Una circunferencia de radio 4. <!-- weight: 0.0 -->
- [ ] D) Una hipérbola. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto.

### Explicación Pedagógica
Al dividir todo por 16, obtenemos la forma estándar de la elipse. Como el número bajo $x^2$ (16) es mayor que el bajo $y^2$ (4), la elipse es más ancha que alta, con $a=4$ y $b=2$.

---

## Question 6 (Estadística - Dificultad 5)

**ID:** `CO-MAT-11-integration-math-001-PRO-v6`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
En un grupo de 100 personas, el promedio de peso es 70 kg y la desviación estándar es 0. ¿Qué significa esto?

### Opciones
- [ ] A) Todos pesan 0 kg.
- [ ] B) La mitad pesa 70 y la otra mitad 0.
- [x] C) Todas las 100 personas pesan exactamente 70 kg.
- [ ] D) Los datos están mal tomados.

### Explicación Pedagógica
La desviación estándar mide la dispersión. Si es cero, no hay ninguna diferencia entre los datos y el promedio. Todos los elementos son idénticos.

---

## Question 7 (Probabilidad - Dificultad 9)

**ID:** `CO-MAT-11-integration-math-001-PRO-v7`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Un examen tiene 5 preguntas de selección múltiple con 4 opciones cada una. Si respondes todo al azar, ¿cuál es la probabilidad de sacar las 5 correctas?

### Opciones
- [ ] A) $5/4$
- [ ] B) $1/20$
- [x] C) $1/1024$ (Operación: $(1/4)^5$)
- [ ] D) $1/5$

### Explicación Pedagógica
Los eventos son independientes. En cada pregunta tienes $1/4$ de probabilidad. Multiplicamos las probabilidades de los 5 éxitos requeridos: $1/4 \cdot 1/4 \cdot 1/4 \cdot 1/4 \cdot 1/4 = 1/1024$. La probabilidad de un "acierto total" por suerte es casi nula.

---

## Question 8 (Geometría Analítica - Dificultad 7)

**ID:** `CO-MAT-11-integration-math-001-PRO-v8`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
Halle la ecuación de la recta que pasa por $(0, -2)$ y es paralela a $y = 3x + 10$.

### Opciones
- [ ] A) $y = -3x - 2$
- [ ] B) $y = 1/3 x - 2$
- [x] C) $y = 3x - 2$ (Misma pendiente, nuevo intercepto)
- [ ] D) $y = 3x + 2$

### Explicación Pedagógica
Paralela significa misma pendiente ($m=3$). El punto $(0, -2)$ nos da directamente el intercepto $b=-2$. Por tanto, $y = 3x - 2$.

---

## Question 9 (Transferencia Total - Dificultad 10)

**ID:** `CO-MAT-11-integration-math-001-PRO-v9`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** synthesis

### Enunciado
**MASTER INTEGRATION (Física y Cálculo):**
La posición de una partícula está dada por $s(t) = t^3 - 6t^2 + 9t$. ¿En qué momento la partícula se detiene por completo instantáneamente?

### Opciones
- [x] A) En $t = 1$ y $t = 3$. <!-- weight: 1.0 -->
- [x] B) Cuando la derivada $v(t) = 3t^2 - 12t + 9 = 0$. <!-- weight: 1.0 -->
- [ ] C) Solo en $t = 0$. <!-- weight: 0.0 -->
- [ ] D) Nunca se detiene. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Aplica la relación entre derivada y velocidad).

### Explicación Pedagógica
La velocidad es la derivada de la posición: $v(t) = 3t^2 - 12t + 9$.
Igualamos a cero: $3(t^2 - 4t + 3) = 0 \rightarrow 3(t-1)(t-3) = 0$.
La partícula está quieta en el segundo 1 y en el segundo 3.

---

## Question 10 (Funciones - Dificultad 6)

**ID:** `CO-MAT-11-integration-math-001-PRO-v10`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál es la asíntota vertical de la función $f(x) = \frac{2}{x + 4}$?

### Opciones
- [ ] A) $y = 0$
- [ ] B) $x = 4$
- [x] C) $x = -4$ (Valores que anulan el denominador)
- [ ] D) No tiene.

### Explicación Pedagógica
La asíntota vertical ocurre donde la función tiende al infinito, lo que sucede cuando el denominador se acerca a cero. $x+4=0 \rightarrow x=-4$.

---

## Question 11 (Geometría Espacial - Dificultad 7)

**ID:** `CO-MAT-11-integration-math-001-PRO-v11`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
Halle el volumen de una esfera con radio $r = 3$. (Use $V = \frac{4}{3} \pi r^3$).

### Opciones
- [ ] A) $12\pi$
- [ ] B) $9\pi$
- [x] C) $36\pi$ ($\frac{4}{3} \cdot \pi \cdot 27 = 4 \cdot 9\pi$)
- [ ] D) $27\pi$

### Explicación Pedagógica
$V = \frac{4}{3} \cdot \pi \cdot 3^3 = \frac{4}{3} \cdot 27\pi = 4 \cdot 9\pi = 36\pi$.

---

## Question 12 (Trigonometría - Dificultad 8)

**ID:** `CO-MAT-11-integration-math-001-PRO-v12`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Si $\sin(\theta) = 3/5$ y $\theta$ está en el segundo cuadrante, ¿cuál es el valor de $\cos(\theta)$?

### Opciones
- [ ] A) 4/5
- [x] B) -4/5 (Pitágoras: $\sqrt{1 - (3/5)^2}$, signo negativo en QII)
- [ ] C) 3/4
- [ ] D) -3/5

### Explicación Pedagógica
Identidad fundamental: $\sin^2 + \cos^2 = 1 \rightarrow \cos^2 = 1 - 9/25 = 16/25$.
$\cos = \pm 4/5$. Como en el cuadrante II el eje X es negativo, elegimos $-4/5$.

---

## Question 13 (Cálculo Integral - Dificultad 9)

**ID:** `CO-MAT-11-integration-math-001-PRO-v13`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Calcule la integral indefinida $\int e^{2x} dx$.

### Opciones
- [ ] A) $e^{2x} + C$
- [x] B) $\frac{1}{2} e^{2x} + C$ (Regla de la cadena inversa)
- [ ] C) $2e^{2x} + C$
- [ ] D) $e^x + C$

### Explicación Pedagógica
Al derivar $e^{2x}$, el 2 baja multiplicando. Por tanto, al integrar (operación inversa), debemos dividir por ese 2 para compensar.

---

## Question 14 (Conteo - Dificultad 5)

**ID:** `CO-MAT-11-integration-math-001-PRO-v14`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿De cuántas formas se pueden elegir 2 frutas de un canasto con 5 frutas diferentes si el orden no importa?

### Opciones
- [ ] A) 20
- [x] B) 10 (Combinación $C(5, 2) = \frac{5 \cdot 4}{2 \cdot 1}$)
- [ ] C) 5
- [ ] D) 120

### Explicación Pedagógica
Es una combinación: $\binom{5}{2} = \frac{5 \cdot 4}{2} = 10$.

---

## Question 15 (Series y Sucesiones - Dificultad 7)

**ID:** `CO-MAT-11-integration-math-001-PRO-v15`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Halle el término número 10 de la sucesión aritmética: $2, 5, 8, 11...$

### Opciones
- [ ] A) 32
- [x] B) 29 (Fórmula $a_n = a_1 + (n-1)d \rightarrow 2 + 9 \cdot 3$)
- [ ] C) 30
- [ ] D) 27

### Explicación Pedagógica
La diferencia común es $d=3$. El primer término es $a_1=2$.
$a_{10} = 2 + (10-1)3 = 2 + 27 = 29$.

---

## Question 16 (Lógica de Conjuntos - Dificultad 6)

**ID:** `CO-MAT-11-integration-math-001-PRO-v16`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
En un grupo de 20 estudiantes, 15 hablan inglés, 10 hablan francés y 5 hablan ambos. ¿Cuántos estudiantes **no hablan ninguno** de los dos idiomas?

### Opciones
- [x] A) 0 (Unión: $15 + 10 - 5 = 20$. Todos hablan algo).
- [ ] B) 5
- [ ] C) 10
- [ ] D) 20

### Explicación Pedagógica
Usamos el principio de inclusión-exclusión para hallar los que hablan al menos uno: $15 + 10 - 5 = 20$. Como el total del grupo es 20, todos están incluidos en el conjunto.

---

## Question 17 (Cálculo de Pendiente en Curva - Dificultad 9)

**ID:** `CO-MAT-11-integration-math-001-PRO-v17`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
¿Cuál es la pendiente de la recta tangente a la curva $y = x^2$ en el punto $(5, 25)$?

### Opciones
- [ ] A) 5
- [ ] B) 25
- [x] C) 10 (Derivada $y' = 2x$, evaluada en $x=5$)
- [ ] D) 2

### Explicación Pedagógica
La derivada representa la pendiente instantánea. $f'(x) = 2x$. Evaluando en el punto donde $x=5$, obtenemos $2(5) = 10$.

---

## Question 18 (Análisis de Histogramas - Dificultad 5)

**ID:** `CO-MAT-11-integration-math-001-PRO-v18`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si en un histograma la barra más alta corresponde al intervalo $[10, 20]$. ¿Cuál es la **clase modal**?

### Opciones
- [ ] A) 10
- [ ] B) 20
- [x] C) $[10, 20]$ (El intervalo con mayor frecuencia)
- [ ] D) El promedio de todos los datos.

### Explicación Pedagógica
La clase modal es el rango de valores donde se concentra la mayor cantidad de la población. Se identifica visualmente como la "cima" de la montaña estadística.

---

## Question 19 (Probabilidad Condicional - Dificultad 8)

**ID:** `CO-MAT-11-integration-math-001-PRO-v19`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
En una baraja, se saca una carta y se sabe que es **Negra** (Pica o Trébol). ¿Cuál es la probabilidad de que sea un **As**?

### Opciones
- [ ] A) $1/52$
- [ ] B) $1/13$
- [x] C) $2/26$ (O $1/13$, hay 2 ases negros en 26 cartas negras)
- [ ] D) $4/52$

### Explicación Pedagógica
Espacio reducido: solo miramos las 26 cartas negras. En ese subgrupo hay exactamente 2 ases (As de picas y As de tréboles). $2/26 = 1/13$.

---

## Question 20 (Genio de Síntesis Total - Dificultad 10)

**ID:** `CO-MAT-11-integration-math-001-PRO-v20`
**Type:** `multi-correct`
**ICFES:** Argumentación + Transferencia
**Bloom:** Synthesis

### Enunciado
**MASTER FINAL:** Un proyectil es lanzado con una función de altura $h(t) = -5t^2 + 20t + 25$. Seleccione TODAS las conclusiones correctas que un matemático de grado 11 puede extraer.

### Opciones
- [x] A) El proyectil fue lanzado desde una altura inicial de 25 metros ($h(0)$). <!-- weight: 1.0 -->
- [x] B) La altura máxima se alcanza en $t = 2$ segundos ($v(t)=0$). <!-- weight: 1.0 -->
- [x] C) La trayectoria es una parábola abierta hacia abajo. <!-- weight: 1.0 -->
- [x] D) El proyectil toca el suelo en $t = 5$ segundos ($h(t)=0$, descartando el tiempo negativo). <!-- weight: 1.0 -->
- [ ] E) El proyectil nunca baja.

### Scoring
- 4 correctas, 0 incorrectas: 4.0/4.0
- 3 correctas, 0 incorrectas: 3.0/4.0
- Penalización por incorrecta: -1.0

### Explicación Pedagógica
A) Término independiente es la altura inicial. B) Derivada $-10t + 20 = 0 \rightarrow t = 2$. C) Coeficiente $t^2$ es negativo. D) Resolviendo la cuadrática: $-5(t^2 - 4t - 5) = 0 \rightarrow (t-5)(t+1) = 0$. La solución física es 5 segundos. Este problema integra álgebra, funciones, derivadas y física en un solo modelo.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Area | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 5 | Algebra | Analyze | Interpretación | ✅ |
| 2 | ...-v2 | 6 | Límites | Evaluate | Formulación | ✅ |
| 3 | ...-v3 | 7 | Derivadas | Synthesis | Argumentación | ✅ |
| 4 | ...-v4 | 8 | Integrales | Evaluate | Formulación | ✅ |
| 5 | ...-v5 | 8 | Cónicas | Evaluate | Formulación | ✅ |
| 6 | ...-v6 | 5 | Estadística | Analyze | Interpretación | ✅ |
| 7 | ...-v7 | 9 | Probabilidad | Evaluate | Argumentación | ✅ |
| 8 | ...-v8 | 7 | G. Analítica | Apply | Formulación | ✅ |
| 9 | ...-v9 | 10| Aplicación | Synthesis | Argumentación | ✅ |
| 10 | ...-v10| 6 | Funciones | Analyze | Interpretación | ✅ |
| 11 | ...-v11| 7 | G. Espacial | Apply | Formulación | ✅ |
| 12 | ...-v12| 8 | Trigonometría | Synthesis | Argumentación | ✅ |
| 13 | ...-v13| 9 | Cálculo | Evaluate | Formulación | ✅ |
| 14 | ...-v14| 5 | Conteo | Analyze | Interpretación | ✅ |
| 15 | ...-v15| 7 | Sucesiones | Analyze | Interpretación | ✅ |
| 16 | ...-v16| 6 | Lógica | Analyze | Argumentación | ✅ |
| 17 | ...-v17| 9 | Cálculo | Evaluate | Formulación | ✅ |
| 18 | ...-v18| 5 | Estadística | Analyze | Interpretación | ✅ |
| 19 | ...-v19| 8 | Probabilidad | Analyze | Interpretación | ✅ |
| 20 | ...-v20| 10| Integración | Synthesis | Argumentación | ✅ |
