---
id: "CO-MAT-11-regla-cadena-trascendentes-001"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Regla de la Cadena y Funciones Trascendentes"
periodo: 3
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
search_query: "DBA matematicas grado 11 colombia regla de la cadena derivada funcion compuesta exponencial logaritmo"
---

# Pregunta Base: Capas de Cebolla: La Regla de la Cadena

> **Fuente:** Derechos Básicos de Aprendizaje (DBA) Colombia
> **Tema:** Pensamiento Variacional (Derivación Avanzada)

---

## Pregunta 1 (Muy Fácil A - Dificultad 1)

**ID:** `CO-MAT-11-regla-cadena-trascendentes-001-v1`

### Enunciado

¿Cuándo se debe usar la **Regla de la Cadena**?

### Opciones

- [x] A) Cuando tenemos una **función compuesta** $f(g(x))$, es decir, una función dentro de otra
- [ ] B) Cuando sumamos funciones
- [ ] C) Cuando multiplicamos funciones
- [ ] D) Nunca

### Explicación Pedagógica

Es el método para derivar funciones "anidadas" como $(3x+1)^5$ o $\sin(x^2)$.

---

## Pregunta 2 (Muy Fácil B - Dificultad 1)

**ID:** `CO-MAT-11-regla-cadena-trascendentes-001-v2`

### Enunciado

¿Cuál es la fórmula básica de la Regla de la Cadena para derivar $y = f(g(x))$?

### Opciones

- [x] A) $y' = f'(g(x)) \cdot g'(x)$ ("Derivada de la externa evaluada en la interna, multiplicada por derivada de la interna")
- [ ] B) $y' = f'(x) \cdot g'(x)$
- [ ] C) $y' = f'(g'(x))$
- [ ] D) $y' = f(g(x)) + g(x)$

### Explicación Pedagógica

Siempre debemos multiplicar por la "derivada de lo de adentro".

---

## Pregunta 3 (Fácil A - Dificultad 2)

**ID:** `CO-MAT-11-regla-cadena-trascendentes-001-v3`

### Enunciado

Deriva la función $h(x) = (2x + 3)^4$.

### Opciones

- [x] A) $h'(x) = 4(2x+3)^3 \cdot 2 = 8(2x+3)^3$
- [ ] B) $h'(x) = 4(2x+3)^3$
- [ ] C) $h'(x) = 4(2)^3$
- [ ] D) $h'(x) = 12x^3$

### Explicación Pedagógica

1) Bajar el 4 y restar uno al exponente. 2) Multiplicar por la derivada interna ($d(2x+3)=2$).

---

## Pregunta 4 (Fácil B - Dificultad 2)

**ID:** `CO-MAT-11-regla-cadena-trascendentes-001-v4`

### Enunciado

Calcula la derivada de $y = \sin(5x)$.

### Opciones

- [x] A) $y' = 5 \cos(5x)$
- [ ] B) $y' = \cos(5x)$
- [ ] C) $y' = -5 \sin(5x)$
- [ ] D) $y' = 5 \sin x$

### Explicación Pedagógica

Derivada de seno es coseno (de lo mismo), multiplicado por derivada de $5x$ que es 5.

---

## Pregunta 5 (Media A - Dificultad 3)

**ID:** `CO-MAT-11-regla-cadena-trascendentes-001-v5`

### Enunciado

¿Cuál es la derivada de la función exponencial natural $f(x) = e^x$?

### Opciones

- [x] A) $f'(x) = e^x$ (Ella misma)
- [ ] B) $f'(x) = x e^{x-1}$
- [ ] C) $f'(x) = \ln x$
- [ ] D) $f'(x) = 0$

### Explicación Pedagógica

Es la única función (salvo la nula) cuya tasa de cambio es igual a su valor en cada punto.

---

## Pregunta 6 (Media B - Dificultad 3)

**ID:** `CO-MAT-11-regla-cadena-trascendentes-001-v6`

### Enunciado

Usa la regla de la cadena para derivar $y = e^{3x^2}$.

### Opciones

- [x] A) $y' = e^{3x^2} \cdot 6x = 6x e^{3x^2}$
- [ ] B) $y' = e^{6x}$
- [ ] C) $y' = 6x$
- [ ] D) $y' = 3x^2 e^{3x^2-1}$

### Explicación Pedagógica

Derivada de $e^u$ es $e^u \cdot u'$. Aquí $u = 3x^2$, $u' = 6x$.

---

## Pregunta 7 (Difícil A - Dificultad 4)

**ID:** `CO-MAT-11-regla-cadena-trascendentes-001-v7`

### Enunciado

¿Cuál es la derivada del logaritmo natural $f(x) = \ln(x)$?

### Opciones

- [x] A) $f'(x) = \frac{1}{x}$
- [ ] B) $f'(x) = e^x$
- [ ] C) $f'(x) = \frac{1}{\ln x}$
- [ ] D) $f'(x) = 1$

### Explicación Pedagógica

Es fundamental recordar que la derivada del logaritmo es el recíproco del argumento.

---

## Pregunta 8 (Difícil B - Dificultad 4)

**ID:** `CO-MAT-11-regla-cadena-trascendentes-001-v8`

### Enunciado

Deriva $y = \ln(x^2 + 1)$.

### Opciones

- [x] A) $y' = \frac{2x}{x^2 + 1}$
- [ ] B) $y' = \frac{1}{x^2 + 1}$
- [ ] C) $y' = \frac{1}{2x}$
- [ ] D) $y' = 2x \ln(x^2+1)$

### Explicación Pedagógica

Regla: $d(\ln u) = \frac{u'}{u}$. Arriba derivada interna ($2x$), abajo la función original ($x^2+1$).

---

## Pregunta 9 (Muy Difícil A - Dificultad 5)

**ID:** `CO-MAT-11-regla-cadena-trascendentes-001-v9`

### Enunciado

Calcula la derivada de $y = \cos^3(x)$. (Ojo: esto es $(\cos x)^3$).

### Opciones

- [x] A) $y' = 3 \cos^2(x) \cdot (-\sin x) = -3 \sin x \cos^2 x$
- [ ] B) $y' = 3 \cos^2(x)$
- [ ] C) $y' = -3 \sin^3(x)$
- [ ] D) $y' = 3 \cos(x) \sin(x)$

### Explicación Pedagógica

Doble composición: potencia externa (bajamos el 3) y función interna coseno (derivada es $-\sin x$).

---

## Pregunta 10 (Muy Difícil B - Dificultad 5)

**ID:** `CO-MAT-11-regla-cadena-trascendentes-001-v10`

### Enunciado

Deriva la función exponencial general $y = 2^x$.

### Opciones

- [x] A) $y' = 2^x \cdot \ln(2)$
- [ ] B) $y' = x 2^{x-1}$
- [ ] C) $y' = 2^x$
- [ ] D) $y' = \ln(2)$

### Explicación Pedagógica

Cuando la base no es $e$, "pagamos un precio" multiplicando por el logaritmo natural de la base.
