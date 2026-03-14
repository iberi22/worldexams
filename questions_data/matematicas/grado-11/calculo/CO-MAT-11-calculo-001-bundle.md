---
id: CO-MAT-11-CALCULO-001
country: CO
grado: 11
asignatura: matematicas
tema: Cálculo - Límites
dificultad: 3
estado: published
creador: AI-WorldExams
source_lang: es-CO
llm_model: claude-sonnet-4-20250514
agent: Cascade
ide: VS Code
bundle_version: '3.0'
total_questions: 10
difficulty_distribution: 2 por nivel (1-5)
creation_date: '2026-01-26'
periodo: 1
dba_id: DBA-MAT-11-2
source: ICFES-Curriculum
source_url: >-
  https://www.icfes.gov.co/documents/20143/2268305/Guia+de+orientacion+Saber+11+2024-1.pdf
source_license: Educational Use - Colombian Curriculum
source_id: ICFES-MAT-11-CALCULO-001
original_concept: Concepto intuitivo de límite y continuidad en funciones reales.
competencia_icfes: Interpretación y Representación
componente: Numérico-variacional
universal_question: false
applicable_exams:
  - CO-Saber11
---

# Bundle: Cálculo - Límites

> **Fuente:** Currículo ICFES Saber 11° - Matemáticas
> **Componente:** Numérico-variacional
> **Competencias:** Interpretación y Representación, Formulación y Ejecución
> **Contexto:** Colombia - Análisis de crecimiento poblacional y costos.

---

## Pregunta 1 (Muy Fácil A - Dificultad 1)

**ID:** `CO-MAT-11-CALCULO-001-v1`

### Enunciado

Dada la función $f(x) = x + 3$, ¿cuál es el valor del límite cuando $x$ tiende a 2?

$$ \lim_{x \to 2} (x + 3) $$

### Opciones

- [x] A) 5
- [ ] B) 2
- [ ] C) 3
- [ ] D) 6

### Explicación Pedagógica

Como $f(x) = x + 3$ es una función polinómica (y por tanto continua), podemos evaluar el límite por sustitución directa:
$2 + 3 = 5$.

**Competencia evaluada:** Formulación y Ejecución

---

## Pregunta 2 (Muy Fácil B - Dificultad 1)

**ID:** `CO-MAT-11-CALCULO-001-v2`

### Enunciado

Si $\lim_{x \to 5} f(x) = 10$, ¿cuál es el valor aproximado de la función cuando $x$ está muy cerca de 5?

### Opciones

- [x] A) 10
- [ ] B) 5
- [ ] C) 0
- [ ] D) Infinito

### Explicación Pedagógica

La definición intuitiva de límite nos dice que a medida que $x$ se acerca a 5, los valores de $f(x)$ se acercan a 10. Por tanto, el valor aproximado sería 10.

**Competencia evaluada:** Interpretación y Representación

---

## Pregunta 3 (Fácil A - Dificultad 2)

**ID:** `CO-MAT-11-CALCULO-001-v3`

### Enunciado

Observando la gráfica de una función $g(x)$, vemos que a medida que $x$ se acerca a 3 por la izquierda y por la derecha, los valores de $y$ se acercan a 4. Sin embargo, en $x=3$ hay un "hueco" y $g(3)$ no está definido. ¿Cuánto vale $\lim_{x \to 3} g(x)$?

### Opciones

- [x] A) 4
- [ ] B) No existe
- [ ] C) 3
- [ ] D) 0

### Explicación Pedagógica

El límite describe el comportamiento *cerca* del punto, no *en* el punto. Si por ambos lados se acerca a 4, el límite es 4, independientemente de si la función está definida o no en ese punto exacto.

**Competencia evaluada:** Interpretación y Representación

---

## Pregunta 4 (Fácil B - Dificultad 2)

**ID:** `CO-MAT-11-CALCULO-001-v4`

### Enunciado

Calcula el siguiente límite: $\lim_{x \to \infty} \frac{1}{x}$

### Opciones

- [x] A) 0
- [ ] B) 1
- [ ] C) Infinito
- [ ] D) Indeterminado

### Explicación Pedagógica

Cuando $x$ crece hacia el infinito (se hace muy, muy grande), la fracción $1/x$ se hace cada vez más pequeña, acercándose a cero. Por ejemplo, $1/100 = 0.01$, $1/1000 = 0.001$, etc.

**Competencia evaluada:** Formulación y Ejecución

---

## Pregunta 5 (Media A - Original Adaptada - Dificultad 3)

**ID:** `CO-MAT-11-CALCULO-001-v5`

### Enunciado

Un biólogo estudia el crecimiento de una población de bacterias en un laboratorio de Bogotá. La función que modela la población $P(t)$ en miles de bacterias, donde $t$ es el tiempo en horas, está dada por:

$$P(t) = \frac{50t}{t + 5}$$

El biólogo quiere saber qué sucederá con la población de bacterias a largo plazo, es decir, cuando el tiempo $t$ crece indefinidamente. ¿Hacia qué valor tiende la población?

### Opciones

- [x] A) 50 mil bacterias
- [ ] B) 0 bacterias
- [ ] C) 5 mil bacterias
- [ ] D) Crece infinitamente

### Explicación Pedagógica

**¿Por qué A es correcta?**
Para saber el comportamiento a "largo plazo", calculamos el límite de la función cuando $t$ tiende a infinito ($\lim_{t \to \infty} P(t)$).
Dividimos numerador y denominador por la potencia mayor de $t$ (que es $t$):
$$ \lim_{t \to \infty} \frac{50t/t}{(t/t) + (5/t)} = \lim_{t \to \infty} \frac{50}{1 + 0} = 50 $$
La población se estabiliza en 50 mil bacterias.

**Competencia evaluada:** Formulación y Ejecución

---

## Pregunta 6 (Media B - Dificultad 3)

**ID:** `CO-MAT-11-CALCULO-001-v6`

### Enunciado

Calcula el siguiente límite indeterminado de la forma $0/0$:

$$ \lim_{x \to 4} \frac{x^2 - 16}{x - 4} $$

### Opciones

- [x] A) 8
- [ ] B) 0
- [ ] C) 4
- [ ] D) Indeterminado

### Explicación Pedagógica

Al evaluar directamente da $0/0$. Debemos factorizar el numerador (diferencia de cuadrados):
$$ x^2 - 16 = (x-4)(x+4) $$
La expresión queda:
$$ \lim_{x \to 4} \frac{(x-4)(x+4)}{x-4} = \lim_{x \to 4} (x+4) $$
Evaluando: $4 + 4 = 8$.

**Competencia evaluada:** Formulación y Ejecución

---

## Pregunta 7 (Difícil A - Dificultad 4)

**ID:** `CO-MAT-11-CALCULO-001-v7`

### Enunciado

Considere la función por partes que describe el precio de la tarifa de un taxi en función de la distancia $x$:

$$ f(x) = \begin{cases} 5000 & \text{si } 0 < x < 5 \\ 1000x & \text{si } x \geq 5 \end{cases} $$

¿Existe el límite de $f(x)$ cuando $x \to 5$?

### Opciones

- [x] A) Sí, y vale 5000
- [ ] B) No, porque los límites laterales son distintos
- [ ] C) Sí, y vale 1000
- [ ] D) No, porque la función no es continua

### Explicación Pedagógica

Calculamos límites laterales:
- $\lim_{x \to 5^-} 5000 = 5000$
- $\lim_{x \to 5^+} 1000(5) = 5000$

Como Lat. Izquierdo = Lat. Derecho = 5000, el límite SÍ existe y es 5000. (Nota: La función también es continua en ese punto).

**Competencia evaluada:** Argumentación

---

## Pregunta 8 (Difícil B - Dificultad 4)

**ID:** `CO-MAT-11-CALCULO-001-v8`

### Enunciado

El costo promedio $C(x)$ en pesos de producir $x$ unidades es $C(x) = 1500 + \frac{20000}{x}$. Halla $\lim_{x \to \infty} C(x)$.

### Opciones

- [x] A) 1500
- [ ] B) 20000
- [ ] C) Infinito
- [ ] D) 0

### Explicación Pedagógica

Cuando $x$ tiende a infinito, el término $20000/x$ tiende a 0. Por lo tanto, el límite es $1500 + 0 = 1500$. El costo fijo promedio desaparece.

**Competencia evaluada:** Interpretación y Representación

---

## Pregunta 9 (Muy Difícil A - Dificultad 5)

**ID:** `CO-MAT-11-CALCULO-001-v9`

### Enunciado

Analice el siguiente límite trigonométrico especial:

$$ \lim_{x \to 0} \frac{\sin(3x)}{2x} $$

### Opciones

- [x] A) 3/2
- [ ] B) 0
- [ ] C) 1
- [ ] D) 2/3

### Explicación Pedagógica

Usamos la propiedad $\lim_{u \to 0} \frac{\sin(u)}{u} = 1$. Multiplicamos numerador y denominador por 3/2:
$$ \frac{3}{2} \cdot \lim_{x \to 0} \frac{\sin(3x)}{\frac{3}{2} \cdot 2x} $$ No, más simple:
$$ \lim_{x \to 0} \frac{\sin(3x)}{2x} = \frac{3}{2} \lim_{3x \to 0} \frac{\sin(3x)}{3x} = \frac{3}{2} (1) = \frac{3}{2} $$

**Competencia evaluada:** Formulación y Ejecución

---

## Pregunta 10 (Muy Difícil B - Dificultad 5)

**ID:** `CO-MAT-11-CALCULO-001-v10`

### Enunciado

¿Cuál es la asíntota horizontal de la función $f(x) = \frac{3x^2 - 5}{2x^2 + x + 1}$?

### Opciones

- [x] A) y = 1.5
- [ ] B) y = 3
- [ ] C) y = 2
- [ ] D) x = 1.5

### Explicación Pedagógica

Para hallar asíntotas horizontales de funciones racionales con el mismo grado en numerador y denominador, dividimos los coeficientes principales: $3/2 = 1.5$. Por tanto, la asíntota es $y=1.5$. Esto es equivalente a calcular el límite al infinito.

**Competencia evaluada:** Interpretación y Representación

---

## 📊 Metadata de Validación

| Pregunta | ID | Dificultad | Competencia ICFES | Componente | Validado |
|----------|-----|------------|-------------------|------------|----------|
| 1 | CO-MAT-11-CALCULO-001-v1 | 1 | Formulación y Ejecución | Numérico-variacional | ✅ |
| 2 | CO-MAT-11-CALCULO-001-v2 | 1 | Interpretación y Representación | Numérico-variacional | ✅ |
| 3 | CO-MAT-11-CALCULO-001-v3 | 2 | Interpretación y Representación | Numérico-variacional | ✅ |
| 4 | CO-MAT-11-CALCULO-001-v4 | 2 | Formulación y Ejecución | Numérico-variacional | ✅ |
| 5 | CO-MAT-11-CALCULO-001-v5 | 3 | Formulación y Ejecución | Numérico-variacional | ✅ |
| 6 | CO-MAT-11-CALCULO-001-v6 | 3 | Formulación y Ejecución | Numérico-variacional | ✅ |
| 7 | CO-MAT-11-CALCULO-001-v7 | 4 | Argumentación | Numérico-variacional | ✅ |
| 8 | CO-MAT-11-CALCULO-001-v8 | 4 | Interpretación y Representación | Numérico-variacional | ✅ |
| 9 | CO-MAT-11-CALCULO-001-v9 | 5 | Formulación y Ejecución | Numérico-variacional | ✅ |
| 10 | CO-MAT-11-CALCULO-001-v10 | 5 | Interpretación y Representación | Numérico-variacional | ✅ |
