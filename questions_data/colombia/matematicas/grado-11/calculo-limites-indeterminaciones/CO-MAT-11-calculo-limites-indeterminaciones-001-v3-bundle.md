---
id: "CO-MAT-11-calculo-limites-indeterminaciones-001"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Cálculo de Límites e Indeterminaciones"
periodo: 2
protocol_version: "3.0"
total_questions: 10
estado: "approved"
creador: "Antigravity-Agent"
generation_date: "2026-02-13"
licenses:
  v1: "CC BY-SA 4.0"
  v2-v10: "CC BY-NC-SA 4.0"
source: "Mineducacion Colombia - DBA"
source_url: "https://www.mineducacion.gov.co/portal/men/Publicaciones/Guias/340021:Derechos-Basicos-de-Aprendizaje-DBA"
source_license: "CC BY-SA 4.0"
search_query: "DBA matematicas grado 11 colombia calculo limites factorizacion racionalizacion infinito sobre infinito"
---

# Pregunta Base: Rompiendo el Cero: Cálculo de Límites

> **Fuente:** Derechos Básicos de Aprendizaje (DBA) Colombia
> **Tema:** Pensamiento Variacional (Técnicas de Límites)

---

## Pregunta 1 (Muy Fácil A - Dificultad 1)

**ID:** `CO-MAT-11-calculo-limites-indeterminaciones-001-v1`

### Enunciado

¿Cuál es el primer paso siempre al intentar calcular un límite como $\lim_{x \to 2} (x^2 + 3)$?

### Opciones

- [x] A) **Sustitución Directa**: reemplazar la $x$ por el valor al que tiende (2) para ver si da un número real
- [ ] B) Factorizar inmediatamente
- [ ] C) Dividir por cero
- [ ] D) Graficar la función

### Explicación Pedagógica

La mayoría de las funciones elementales son continuas, así que el límite coincide con la evaluación: $2^2 + 3 = 7$.

---

## Pregunta 2 (Muy Fácil B - Dificultad 1)

**ID:** `CO-MAT-11-calculo-limites-indeterminaciones-001-v2`

### Enunciado

Si al evaluar un límite obtienes como resultado $\frac{5}{0}$, ¿qué indica esto generalmente?

### Opciones

- [x] A) Que el límite es **infinito** ($+\infty$ o $-\infty$) o no existe; hay una asíntota vertical
- [ ] B) Que el límite es 5
- [ ] C) Que el límite es 0
- [ ] D) Que es una indeterminación que se puede salvar

### Explicación Pedagógica

Un número dividido por algo que tiende a cero "explota" hacia el infinito.

---

## Pregunta 3 (Fácil A - Dificultad 2)

**ID:** `CO-MAT-11-calculo-limites-indeterminaciones-001-v3`

### Enunciado

Calcula el límite: $\lim_{x \to 3} \frac{x^2 - 9}{x - 3}$.

### Opciones

- [x] A) **6**
- [ ] B) 0
- [ ] C) Indeterminado
- [ ] D) 9

### Explicación Pedagógica

Da $0/0$. Factorizamos el numerador (diferencia de cuadrados): $(x-3)(x+3)$. Cancelamos $(x-3)$ y queda $\lim(x+3) = 6$.

---

## Pregunta 4 (Fácil B - Dificultad 2)

**ID:** `CO-MAT-11-calculo-limites-indeterminaciones-001-v4`

### Enunciado

¿Qué técnica se usa para resolver una indeterminación $0/0$ con **raíces cuadradas**, como $\lim_{x \to 4} \frac{\sqrt{x}-2}{x-4}$?

### Opciones

- [x] A) **Racionalización**: multiplicar numerador y denominador por el conjugado ($\sqrt{x}+2$)
- [ ] B) Elevar todo al cuadrado
- [ ] C) Derivar
- [ ] D) Dividir por $x$

### Explicación Pedagógica

El conjugado permite eliminar la raíz del término problemático usando $(a-b)(a+b) = a^2 - b^2$.

---

## Pregunta 5 (Media A - Dificultad 3)

**ID:** `CO-MAT-11-calculo-limites-indeterminaciones-001-v5`

### Enunciado

Calcula $\lim_{x \to \infty} \frac{3x^2 + 5x}{2x^2 - 1}$.

### Opciones

- [x] A) $\frac{3}{2} = 1.5$
- [ ] B) $\infty$
- [ ] C) 0
- [ ] D) 3

### Explicación Pedagógica

Indeterminación $\infty/\infty$. Dividimos todo por la mayor potencia de $x$ ($x^2$). Sobreviven los coeficientes principales $3/2$.

---

## Pregunta 6 (Media B - Dificultad 3)

**ID:** `CO-MAT-11-calculo-limites-indeterminaciones-001-v6`

### Enunciado

Si el grado del numerador es **menor** que el grado del denominador (ej: $\frac{x}{x^2}$), ¿cuál es el límite cuando $x \to \infty$?

### Opciones

- [x] A) **0**
- [ ] B) $\infty$
- [ ] C) 1
- [ ] D) -1

### Explicación Pedagógica

El denominador crece mucho más rápido que el numerador, aplastando la fracción hacia cero.

---

## Pregunta 7 (Difícil A - Dificultad 4)

**ID:** `CO-MAT-11-calculo-limites-indeterminaciones-001-v7`

### Enunciado

Calcula $\lim_{x \to 1} \frac{x^3 - 1}{x - 1}$.

### Opciones

- [x] A) 3
- [ ] B) 1
- [ ] C) 0
- [ ] D) Indefinido

### Explicación Pedagógica

Factorización de diferencia de cubos: $a^3 - b^3 = (a-b)(a^2 + ab + b^2)$. $(x-1)(x^2 + x + 1)/(x-1) \rightarrow 1+1+1 = 3$.

---

## Pregunta 8 (Difícil B - Dificultad 4)

**ID:** `CO-MAT-11-calculo-limites-indeterminaciones-001-v8`

### Enunciado

Al calcular límites trigonométricos, ¿cuál es el valor de $\lim_{x \to 0} \frac{1 - \cos x}{x}$?

### Opciones

- [x] A) **0**
- [ ] B) 1
- [ ] C) Infinito
- [ ] D) -1

### Explicación Pedagógica

Es otro límite notable que se deduce racionalizando por el conjugado $(1 + \cos x)$ y usando $\sin^2 x$.

---

## Pregunta 9 (Muy Difícil A - Dificultad 5)

**ID:** `CO-MAT-11-calculo-limites-indeterminaciones-001-v9`

### Enunciado

Calcula el límite: $\lim_{x \to \infty} (\sqrt{x^2 + 3x} - x)$.

### Opciones

- [x] A) $\frac{3}{2}$
- [ ] B) 0
- [ ] C) $\infty$
- [ ] D) 3

### Explicación Pedagógica

Indeterminación $\infty - \infty$. Se multiplica por el conjugado $(\sqrt{...} + x)/(\sqrt{...} + x)$ para convertirla en fracción y resolver.

---

## Pregunta 10 (Muy Difícil B - Dificultad 5)

**ID:** `CO-MAT-11-calculo-limites-indeterminaciones-001-v10`

### Enunciado

Si $\lim_{x \to c} f(x) = 4$ y $\lim_{x \to c} g(x) = 0$, ¿qué podemos decir de $\lim_{x \to c} \frac{f(x)}{g(x)}$?

### Opciones

- [x] A) El límite **no existe** (tiende a $+\infty$ o $-\infty$)
- [ ] B) El límite es 4
- [ ] C) El límite es 0
- [ ] D) El límite es indeterminado tipo $0/0$

### Explicación Pedagógica

No es una indeterminación ($4/0$), sino una divergencia. Indeterminación sería $0/0$ o $\infty/\infty$.
