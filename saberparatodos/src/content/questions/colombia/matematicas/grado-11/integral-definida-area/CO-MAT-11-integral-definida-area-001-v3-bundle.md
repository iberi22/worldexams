---
id: "CO-MAT-11-integral-definida-area-001"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Integral Definida y Área bajo la Curva"
periodo: 4
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
search_query: "DBA matematicas grado 11 colombia integral definida area bajo la curva teorema fundamental calculo"
---

# Pregunta Base: Midiendo lo Irregular: Integral Definida

> **Fuente:** Derechos Básicos de Aprendizaje (DBA) Colombia
> **Tema:** Pensamiento Variacional (Cálculo Integral)

---

## Pregunta 1 (Muy Fácil A - Dificultad 1)

**ID:** `CO-MAT-11-integral-definida-area-001-v1`

### Enunciado

¿Qué representa geométricamente la **Integral Definida** $\int_{a}^{b} f(x) dx$ de una función positiva?

### Opciones

- [x] A) El **Área** bajo la curva de $f(x)$ entre los límites $a$ y $b$ sobre el eje x
- [ ] B) La longitud de la curva
- [ ] C) El perímetro del rectángulo
- [ ] D) La pendiente de la recta secante

### Explicación Pedagógica

Es la suma de infinitos rectángulos infinitesimalmente delgados que cubren esa región.

---

## Pregunta 2 (Muy Fácil B - Dificultad 1)

**ID:** `CO-MAT-11-integral-definida-area-001-v2`

### Enunciado

¿Qué establece el **Teorema Fundamental del Cálculo** (Parte 2, regla de Barrow) para evaluar $\int_{a}^{b} f(x) dx$?

### Opciones

- [x] A) $\int_{a}^{b} f(x) dx = F(b) - F(a)$, donde $F$ es cualquier antiderivada de $f$
- [ ] B) $\int_{a}^{b} f(x) dx = f(b) - f(a)$
- [ ] C) $\int_{a}^{b} f(x) dx = F(b) + F(a)$
- [ ] D) $\int_{a}^{b} f(x) dx = 0$

### Explicación Pedagógica

Conecta la integral con la antiderivada. Evaluamos la primitiva en el límite superior y restamos la evaluación en el inferior.

---

## Pregunta 3 (Fácil A - Dificultad 2)

**ID:** `CO-MAT-11-integral-definida-area-001-v3`

### Enunciado

Calcula el valor de $\int_{0}^{2} 3x^2 dx$.

### Opciones

- [x] A) $F(x) = x^3 \rightarrow F(2) - F(0) = 8 - 0 = \mathbf{8}$
- [ ] B) 6
- [ ] C) 4
- [ ] D) 12

### Explicación Pedagógica

Primero hallamos la primitiva ($x^3$) y luego sustituimos los límites.

---

## Pregunta 4 (Fácil B - Dificultad 2)

**ID:** `CO-MAT-11-integral-definida-area-001-v4`

### Enunciado

¿Cuánto vale la integral $\int_{1}^{3} 4 dx$? (Geométricamente es un rectángulo).

### Opciones

- [x] A) Base $\times$ Altura = $(3-1) \times 4 = 2 \times 4 = \mathbf{8}$
- [ ] B) 4
- [ ] C) 12
- [ ] D) 3

### Explicación Pedagógica

También por cálculo: $4x$ evaluado en 3 y 1 $\rightarrow 12 - 4 = 8$.

---

## Pregunta 5 (Media A - Dificultad 3)

**ID:** `CO-MAT-11-integral-definida-area-001-v5`

### Enunciado

Si $\int_{0}^{5} f(x) dx = 10$ y $\int_{0}^{3} f(x) dx = 4$, ¿cuánto vale $\int_{3}^{5} f(x) dx$?

### Opciones

- [x] A) $10 - 4 = 6$
- [ ] B) $10 + 4 = 14$
- [ ] C) $4 - 10 = -6$
- [ ] D) 2

### Explicación Pedagógica

Propiedad de aditividad del intervalo: El área total es la suma de las partes. Área[0-5] = Área[0-3] + Área[3-5].

---

## Pregunta 6 (Media B - Dificultad 3)

**ID:** `CO-MAT-11-integral-definida-area-001-v6`

### Enunciado

Calcula $\int_{1}^{e} \frac{1}{x} dx$.

### Opciones

- [x] A) $\ln(e) - \ln(1) = 1 - 0 = \mathbf{1}$
- [ ] B) $e - 1$
- [ ] C) 0
- [ ] D) $e$

### Explicación Pedagógica

La primitiva de $1/x$ es $\ln x$.

---

## Pregunta 7 (Difícil A - Dificultad 4)

**ID:** `CO-MAT-11-integral-definida-area-001-v7`

### Enunciado

¿Qué ocurre si la integral definida da un resultado **negativo**, por ejemplo $\int_{0}^{\pi} \cos x dx = 0$? (Espera, corrijamos: de 0 a $\pi$ da 0). Cambiemos: $\int_{\pi}^{2\pi} \sin x dx$.

### Opciones

- [x] A) Significa que el área neta está **por debajo** del eje x y se considera negativa en el cálculo integral
- [ ] B) Que el cálculo está mal
- [ ] C) Que no hay área
- [ ] D) Que el tiempo retrocede

### Explicación Pedagógica

La integral suma áreas con signo: lo que está arriba del eje es positivo, lo que está abajo es negativo.

---

## Pregunta 8 (Difícil B - Dificultad 4)

**ID:** `CO-MAT-11-integral-definida-area-001-v8`

### Enunciado

Halla el área encerrada entre las curvas $y = x^2$ y la recta $y = x$ en el primer cuadrante.

### Opciones

- [x] A) Puntos de corte en $x=0$ y $x=1$. $\int_{0}^{1} (x - x^2) dx = [x^2/2 - x^3/3]_0^1 = 1/2 - 1/3 = \mathbf{1/6}$
- [ ] B) $1/2$
- [ ] C) $1/3$
- [ ] D) 1

### Explicación Pedagógica

Se resta la función "de arriba" menos la "de abajo" y se integra en el intervalo de intersección.

---

## Pregunta 9 (Muy Difícil A - Dificultad 5)

**ID:** `CO-MAT-11-integral-definida-area-001-v9`

### Enunciado

Calcula el valor promedio de la función $f(x) = x^2$ en el intervalo $[0, 3]$.

### Opciones

- [x] A) $\frac{1}{3-0} \int_{0}^{3} x^2 dx = \frac{1}{3} [9] = \mathbf{3}$
- [ ] B) 9
- [ ] C) 4.5
- [ ] D) 1

### Explicación Pedagógica

El Teorema del Valor Medio para integrales dice que existe una altura promedio tal que Altura $\times$ Base = Área total.

---

## Pregunta 10 (Muy Difícil B - Dificultad 5)

**ID:** `CO-MAT-11-integral-definida-area-001-v10`

### Enunciado

¿Cuál es el volumen de un sólido de revolución generado al girar $y = \sqrt{x}$ alrededor del eje x entre $x=0$ y $x=4$?

### Opciones

- [x] A) Método de discos: $\pi \int_{0}^{4} (\sqrt{x})^2 dx = \pi \int_{0}^{4} x dx = \pi [x^2/2]_0^4 = \pi(8) = \mathbf{8\pi}$
- [ ] B) $4\pi$
- [ ] C) $16\pi$
- [ ] D) $2\pi$

### Explicación Pedagógica

Cada rebanada es un círculo de área $\pi r^2$, donde el radio es la función $f(x)$.
