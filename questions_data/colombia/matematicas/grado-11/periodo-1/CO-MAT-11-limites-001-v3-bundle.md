---
id: "CO-MAT-11-limites-001"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Límites: Concepto, Propiedades e Indeterminaciones"
periodo: 1
protocol_version: "3.0"
total_questions: 10
estado: "approved"
creador: "Antigravity-Agent"
generation_date: "2026-03-11"
licenses:
  v1: "CC BY-SA 4.0"
  v2-v10: "CC BY-NC-SA 4.0"
source: "Examen de Admisión Universidad Nacional / Simulacro Icfes"
source_url: "https://admisiones.unal.edu.co/"
source_license: "CC BY-SA 4.0"
search_query: "preguntas limites indeterminados 0/0 grado 11 icfes"
---

# Pregunta Base: El infinito y más allá

> **Fuente:** Problemas de preparación Cálculo 11
> **Tema:** Límites

---

## Pregunta 1 (Muy Fácil A - Dificultad 1)

**ID:** `CO-MAT-11-limites-001-v1`

### Enunciado

Intuitivamente, ¿qué representa el **Límite** de una función $f(x)$ cuando $x$ se acerca a un valor $a$?

### Opciones

- [x] A) El valor al que se **aproxima** $f(x)$ tanto como queramos al acercar $x$ a $a$
- [ ] B) El valor exacto de la función en $f(a)$
- [ ] C) La derivada de la función
- [ ] D) El área bajo la curva

### Explicación Pedagógica

El límite estudia la tendencia de la función "cerca de", no necesariamente "en el punto".

---

## Pregunta 2 (Muy Fácil B - Dificultad 1)

**ID:** `CO-MAT-11-limites-001-v2`

### Enunciado

¿Cuál es el resultado de evaluar $\lim_{x \to 3} (2x + 1)$?

### Opciones

- [x] A) 7
- [ ] B) 6
- [ ] C) 3
- [ ] D) Indefinido

### Explicación Pedagógica

En funciones continuas (como los polinomios), el límite se halla simplemente sustituyendo el valor: $2(3) + 1 = 7$.

---

## Pregunta 3 (Fácil A - Dificultad 2)

**ID:** `CO-MAT-11-limites-001-v3`

### Enunciado

¿Qué ocurre si los **límites laterales** (por la izquierda y por la derecha) de una función en un punto $a$ son diferentes?

### Opciones

- [x] A) Se dice que el límite **no existe** en ese punto
- [ ] B) El límite es el promedio de ambos
- [ ] C) El límite es el de la derecha
- [ ] D) El límite es infinito

### Explicación Pedagógica

Para que un límite exista, la función debe tender al mismo valor sin importar desde qué lado te acerques al punto.

---

## Pregunta 4 (Fácil B - Dificultad 2)

**ID:** `CO-MAT-11-limites-001-v4`

### Enunciado

¿A qué valor tiende $\lim_{x \to \infty} \frac{1}{x}$?

### Opciones

- [x] A) 0
- [ ] B) 1
- [ ] C) Infinito
- [ ] D) -1

### Explicación Pedagógica

Si divides una unidad entre números cada vez más grandes ($1/10, 1/100, 1/1,000,000$), la fracción se vuelve casi nula.

---

## Pregunta 5 (Media A - Dificultad 3)

**ID:** `CO-MAT-11-limites-001-v5`

### Enunciado

Calcula el límite indeterminado $\lim_{x \to 2} \frac{x^2 - 4}{x - 2}$.

### Opciones

- [x] A) 4
- [ ] B) 0
- [ ] C) 2
- [ ] D) Infinito

### Explicación Pedagógica

Al sustituir da $0/0$. Debemos "romper" la indeterminación factorizando el numerador: $\frac{(x-2)(x+2)}{x-2} = x+2$. Al evaluar en 2, da $2+2=4$.

---

## Pregunta 6 (Media B - Dificultad 3)

**ID:** `CO-MAT-11-limites-001-v6`

### Enunciado

¿Cuál es el resultado de $\lim_{x \to 0} \frac{\sin(x)}{x}$? (Considerando $x$ en radianes)

### Opciones

- [x] A) 1
- [ ] B) 0
- [ ] C) Infinito
- [ ] D) No existe

### Explicación Pedagógica

Este es un límite trigonométrico especial. Aunque da $0/0$ al sustituir, geométrica y analíticamente se demuestra que tiende a 1.

---

## Pregunta 7 (Difícil A - Dificultad 4)

**ID:** `CO-MAT-11-limites-001-v7`

### Enunciado

Halla el límite al infinito: $\lim_{x \to \infty} \frac{3x^2 + 5x}{x^2 - 10}$.

### Opciones

- [x] A) 3
- [ ] B) 0
- [ ] C) Infinito
- [ ] D) 5

### Explicación Pedagógica

Cuando el grado del numerador y denominador es igual, el límite al infinito es el cociente de los coeficientes principales: $3/1 = 3$.

---

## Pregunta 8 (Difícil B - Dificultad 4)

**ID:** `CO-MAT-11-limites-001-v8`

### Enunciado

Resuelve el límite $\lim_{x \to 1} \frac{\sqrt{x} - 1}{x - 1}$.

### Opciones

- [x] A) $1/2$
- [ ] B) 1
- [ ] C) 0
- [ ] D) 2

### Explicación Pedagógica

Multiplicamos por el conjugado $(\sqrt{x}+1)$ o factorizamos el denominador como diferencia de cuadrados: $(\sqrt{x}-1)(\sqrt{x}+1)$. Simplificando queda $1/(\sqrt{x}+1)$. Al evaluar en 1, da $1/2$.

---

## Pregunta 9 (Muy Difícil A - Dificultad 5)

**ID:** `CO-MAT-11-limites-001-v9`

### Enunciado

¿Qué condición debe cumplirse para que una función $f(x)$ sea **continua** en un punto $x = a$?

### Opciones

- [x] A) Que exista $f(a)$, que exista el $\lim_{x \to a} f(x)$ y que ambos valores sean **identicos**
- [ ] B) Solo que el límite exista
- [ ] C) Solo que la función esté definida en ese punto
- [ ] D) Que la función sea siempre positiva

### Explicación Pedagógica

La continuidad significa "no levantar el lápiz". Para ello, el hueco que podría dejar un límite debe estar exactamente relleno por el valor de la función.

---

## Pregunta 10 (Muy Difícil B - Dificultad 5)

**ID:** `CO-MAT-11-limites-001-v10`

### Enunciado

Calcula $\lim_{x \to \infty} (1 + \frac{1}{x})^x$.

### Opciones

- [x] A) El número $e$ ($\approx 2.718$)
- [ ] B) 1
- [ ] C) Infinito
- [ ] D) 0

### Explicación Pedagógica

Esta es la definición fundamental del número de Euler. Representa el límite del crecimiento compuesto continuo.
