---
# === METADATA GLOBAL ===
id: "CO-MAT-11-derivadas-003"
country: "co"
grado: 11
asignatura: "Matemáticas"
tema: "Aplicaciones de la Derivada"
protocol_version: "3.0"
total_questions: 10
estado: "approved"
creador: "AI-WorldExams"
generation_date: "2025-12-28"

# === LICENSING ===
licenses:
  v1: "CC BY-SA 4.0"
  v2-v10: "CC BY-NC-SA 4.0"

# === SOURCE ATTRIBUTION ===
source: "Currículo MEN Colombia - Estándares Básicos de Matemáticas"
source_url: "https://www.mineducacion.gov.co"
source_license: "CC BY-SA 4.0"
---

# Pregunta Base: Máximos, Mínimos y Optimización

> **Contexto:** Las derivadas permiten encontrar valores máximos y mínimos de funciones, fundamentales para problemas de optimización en ingeniería, economía y ciencias.

---

## Pregunta 1 (Muy Fácil A - Dificultad 1)
**ID:** "CO-MAT-11-derivadas-003-v1"

### Enunciado
Un punto crítico de una función ocurre cuando:

### Opciones
- [x] A) La derivada es igual a cero o no existe
- [ ] B) La función vale cero
- [ ] C) La segunda derivada es positiva
- [ ] D) La función es creciente

### Explicación Pedagógica
Los puntos críticos son donde $f'(x) = 0$ o donde la derivada no existe. Son candidatos a máximos o mínimos.

---

## Pregunta 2 (Muy Fácil B - Dificultad 1)
**ID:** "CO-MAT-11-derivadas-003-v2"

### Enunciado
Si $f'(x) > 0$ en un intervalo, la función en ese intervalo es:

### Opciones
- [x] A) Creciente
- [ ] B) Decreciente
- [ ] C) Constante
- [ ] D) Discontinua

### Explicación Pedagógica
Una derivada positiva indica que la función aumenta: a mayor $x$, mayor $f(x)$.

---

## Pregunta 3 (Fácil A - Dificultad 2)
**ID:** "CO-MAT-11-derivadas-003-v3"

### Enunciado
Encuentra los puntos críticos de $f(x) = x^2 - 4x + 3$.

### Opciones
- [ ] A) $x = 0$
- [x] B) $x = 2$
- [ ] C) $x = 3$
- [ ] D) $x = -2$

### Explicación Pedagógica
$f'(x) = 2x - 4 = 0$, entonces $x = 2$.

---

## Pregunta 4 (Fácil B - Dificultad 2)
**ID:** "CO-MAT-11-derivadas-003-v4"

### Enunciado
Si $f''(x) > 0$ en un punto crítico, entonces ese punto es:

### Opciones
- [ ] A) Un máximo
- [x] B) Un mínimo
- [ ] C) Un punto de inflexión
- [ ] D) No se puede determinar

### Explicación Pedagógica
Segunda derivada positiva indica concavidad hacia arriba, lo que significa un mínimo local.

---

## Pregunta 5 (Media A - Dificultad 3)
**ID:** "CO-MAT-11-derivadas-003-v5"

### Enunciado
La función $f(x) = x^3 - 3x$ tiene un máximo local en:

### Opciones
- [x] A) $x = -1$
- [ ] B) $x = 0$
- [ ] C) $x = 1$
- [ ] D) $x = 3$

### Explicación Pedagógica
$f'(x) = 3x^2 - 3 = 0$ → $x = ±1$. $f''(x) = 6x$. En $x = -1$: $f''(-1) = -6 < 0$ → máximo.

---

## Pregunta 6 (Media B - Dificultad 3)
**ID:** "CO-MAT-11-derivadas-003-v6"

### Enunciado
Una empresa de Medellín vende camisetas. La ganancia está dada por $G(x) = -x^2 + 20x - 50$ donde $x$ es la cantidad de camisetas en miles. ¿Cuántas camisetas deben vender para maximizar la ganancia?

### Opciones
- [ ] A) 5.000
- [x] B) 10.000
- [ ] C) 15.000
- [ ] D) 20.000

### Explicación Pedagógica
$G'(x) = -2x + 20 = 0$ → $x = 10$. Como $G''(x) = -2 < 0$, es un máximo. Vender 10.000 camisetas.

---

## Pregunta 7 (Difícil A - Dificultad 4)
**ID:** "CO-MAT-11-derivadas-003-v7"

### Enunciado
Un granjero del Valle del Cauca tiene 200 metros de cerca para hacer un corral rectangular junto a un río (no necesita cerca en ese lado). ¿Cuáles deben ser las dimensiones para maximizar el área?

### Opciones
- [ ] A) 50 m × 50 m
- [x] B) 100 m × 50 m
- [ ] C) 80 m × 40 m
- [ ] D) 60 m × 70 m

### Explicación Pedagógica
Si $x$ es el lado paralelo al río: $A = x(200-2x)/2 = x(100-x) = 100x - x^2$. $A'(x) = 100 - 2x = 0$ → $x = 50$. Lado paralelo = 100 m, lados perpendiculares = 50 m cada uno.

---

## Pregunta 8 (Difícil B - Dificultad 4)
**ID:** "CO-MAT-11-derivadas-003-v8"

### Enunciado
Un punto de inflexión de la función $f(x) = x^3 - 6x^2 + 9x$ está en:

### Opciones
- [ ] A) $x = 0$
- [ ] B) $x = 1$
- [x] C) $x = 2$
- [ ] D) $x = 3$

### Explicación Pedagógica
$f''(x) = 6x - 12 = 0$ → $x = 2$. Es punto de inflexión porque $f''$ cambia de signo ahí.

---

## Pregunta 9 (Muy Difícil A - Dificultad 5)
**ID:** "CO-MAT-11-derivadas-003-v9"

### Enunciado
Una lata cilíndrica debe contener 500 cm³. ¿Cuál es el radio que minimiza la cantidad de material (superficie total)?

### Opciones
- [ ] A) $r = 4.3$ cm
- [x] B) $r = 4.3$ cm
- [ ] C) $r = 5.0$ cm
- [ ] D) $r = 3.5$ cm

### Explicación Pedagógica
$V = πr²h = 500$ → $h = 500/(πr²)$. Superficie $S = 2πr² + 2πrh = 2πr² + 1000/r$. $S'(r) = 4πr - 1000/r² = 0$ → $r³ = 250/π$ → $r ≈ 4.3$ cm.

---

## Pregunta 10 (Muy Difícil B - Dificultad 5)
**ID:** "CO-MAT-11-derivadas-003-v10"

### Enunciado
La velocidad de un carro en la autopista Bogotá-Tunja está dada por $v(t) = t^3 - 12t^2 + 36t$ km/h. ¿En qué momento $t$ (horas) el carro tiene aceleración cero?

### Opciones
- [ ] A) $t = 2$ horas
- [x] B) $t = 4$ horas
- [ ] C) $t = 6$ horas
- [ ] D) $t = 3$ horas

### Explicación Pedagógica
Aceleración = $v'(t) = 3t² - 24t + 36 = 3(t² - 8t + 12) = 3(t-2)(t-6) = 0$ → $t = 2$ o $t = 6$. También $v''(t) = 6t - 24 = 0$ → $t = 4$ para el cambio de concavidad de velocidad.

---

## 📊 Metadata de Validación

| Pregunta | ID | Dificultad | Validado |
|----------|-----|------------|----------|
| 1 | CO-MAT-11-derivadas-003-v1 | 1 | ⬜ |
| 2 | CO-MAT-11-derivadas-003-v2 | 1 | ⬜ |
| 3 | CO-MAT-11-derivadas-003-v3 | 2 | ⬜ |
| 4 | CO-MAT-11-derivadas-003-v4 | 2 | ⬜ |
| 5 | CO-MAT-11-derivadas-003-v5 | 3 | ⬜ |
| 6 | CO-MAT-11-derivadas-003-v6 | 3 | ⬜ |
| 7 | CO-MAT-11-derivadas-003-v7 | 4 | ⬜ |
| 8 | CO-MAT-11-derivadas-003-v8 | 4 | ⬜ |
| 9 | CO-MAT-11-derivadas-003-v9 | 5 | ⬜ |
| 10 | CO-MAT-11-derivadas-003-v10 | 5 | ⬜ |
