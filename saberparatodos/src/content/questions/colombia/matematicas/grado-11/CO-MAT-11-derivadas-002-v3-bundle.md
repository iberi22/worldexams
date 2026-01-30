---
id: CO-MAT-11-derivadas-002
country: co
grado: 11
asignatura: Matemáticas
tema: reglasdederivacion
protocol_version: '3.0'
total_questions: 10
estado: approved
creador: AI-WorldExams
generation_date: '2025-12-27'
licenses:
  v1: CC BY-SA 4.0
  v2-v10: CC BY-NC-SA 4.0
source: Currículo MEN Colombia - Estándares Básicos de Matemáticas
source_url: 'https://www.mineducacion.gov.co'
source_license: CC BY-SA 4.0
---

# Pregunta Base: Regla del Producto y Cociente

> **Contexto:** Las reglas del producto y cociente permiten calcular derivadas de funciones compuestas por multiplicación o división.

---

## Pregunta 1 (Muy Fácil A - Dificultad 1)
**ID:** "CO-MAT-11-derivadas-002-v1"

### Enunciado
Si $f(x) = 2x$ y $g(x) = 3$, ¿cuál es la derivada del producto $f(x) \cdot g(x) = 6x$?

### Opciones
- [ ] A) 0
- [ ] B) 3
- [x] C) 6
- [ ] D) 6x

### Explicación Pedagógica
$(6x)' = 6$. También podemos verificar: $(f \cdot g)' = f' \cdot g + f \cdot g' = 2 \cdot 3 + 2x \cdot 0 = 6$.

---

## Pregunta 2 (Muy Fácil B - Dificultad 1)
**ID:** "CO-MAT-11-derivadas-002-v2"

### Enunciado
La regla del producto establece que $(fg)' = $

### Opciones
- [ ] A) $f' \cdot g'$
- [x] B) $f' \cdot g + f \cdot g'$
- [ ] C) $f' + g'$
- [ ] D) $f \cdot g'$

### Explicación Pedagógica
La regla del producto dice que la derivada de un producto es: "la derivada del primero por el segundo, más el primero por la derivada del segundo".

---

## Pregunta 3 (Fácil A - Dificultad 2)
**ID:** "CO-MAT-11-derivadas-002-v3"

### Enunciado
Calcula $(x \cdot x^2)'$ usando la regla del producto.

### Opciones
- [ ] A) 2x
- [x] B) 3x²
- [ ] C) x³
- [ ] D) 2x²

### Explicación Pedagógica
$(x \cdot x^2)' = 1 \cdot x^2 + x \cdot 2x = x^2 + 2x^2 = 3x^2$. Verificación: $x \cdot x^2 = x^3$, y $(x^3)' = 3x^2$ ✓.

---

## Pregunta 4 (Fácil B - Dificultad 2)
**ID:** "CO-MAT-11-derivadas-002-v4"

### Enunciado
Encuentra la derivada de $h(x) = (x+1)(x-1)$.

### Opciones
- [x] A) 2x
- [ ] B) 2
- [ ] C) x² - 1
- [ ] D) 1

### Explicación Pedagógica
Por regla del producto: $h'(x) = 1 \cdot (x-1) + (x+1) \cdot 1 = x - 1 + x + 1 = 2x$. Verificación: $(x+1)(x-1) = x^2 - 1$, y $(x^2 - 1)' = 2x$ ✓.

---

## Pregunta 5 (Media A - Dificultad 3)
**ID:** "CO-MAT-11-derivadas-002-v5"

### Enunciado
El área de un terreno rectangular en la sabana de Bogotá está dada por $A(x) = x(20-x)$ metros², donde $x$ es el ancho. ¿Para qué valor de $x$ el área es máxima?

### Opciones
- [ ] A) 5 m
- [x] B) 10 m
- [ ] C) 15 m
- [ ] D) 20 m

### Explicación Pedagógica
$A(x) = 20x - x^2$. $A'(x) = 20 - 2x = 0$, entonces $x = 10$. Verificamos: $A''(x) = -2 < 0$ (máximo).

---

## Pregunta 6 (Media B - Dificultad 3)
**ID:** "CO-MAT-11-derivadas-002-v6"

### Enunciado
Si $f(x) = x^2 \cdot e^x$, ¿cuál de las siguientes es $f'(x)$?

### Opciones
- [ ] A) $2x \cdot e^x$
- [x] B) $2x \cdot e^x + x^2 \cdot e^x$
- [ ] C) $x^2 \cdot e^x$
- [ ] D) $2e^x$

### Explicación Pedagógica
Por regla del producto: $f'(x) = (x^2)' \cdot e^x + x^2 \cdot (e^x)' = 2x \cdot e^x + x^2 \cdot e^x = e^x(2x + x^2)$.

---

## Pregunta 7 (Difícil A - Dificultad 4)
**ID:** "CO-MAT-11-derivadas-002-v7"

### Enunciado
Calcula $\left(\frac{x}{x+1}\right)'$ usando la regla del cociente.

### Opciones
- [x] A) $\frac{1}{(x+1)^2}$
- [ ] B) $\frac{-1}{(x+1)^2}$
- [ ] C) $\frac{x}{(x+1)^2}$
- [ ] D) $\frac{1}{x+1}$

### Explicación Pedagógica
Regla del cociente: $\left(\frac{u}{v}\right)' = \frac{u'v - uv'}{v^2}$. Aquí $u = x$, $v = x+1$: $\frac{1 \cdot (x+1) - x \cdot 1}{(x+1)^2} = \frac{x + 1 - x}{(x+1)^2} = \frac{1}{(x+1)^2}$.

---

## Pregunta 8 (Difícil B - Dificultad 4)
**ID:** "CO-MAT-11-derivadas-002-v8"

### Enunciado
Si $y = \frac{x^2 - 1}{x^2 + 1}$, encuentra $y'$ evaluada en $x = 0$.

### Opciones
- [x] A) 0
- [ ] B) 1
- [ ] C) -1
- [ ] D) 2

### Explicación Pedagógica
$y' = \frac{2x(x^2+1) - (x^2-1)(2x)}{(x^2+1)^2} = \frac{2x(x^2+1-x^2+1)}{(x^2+1)^2} = \frac{4x}{(x^2+1)^2}$. En $x = 0$: $y'(0) = \frac{0}{1} = 0$.

---

## Pregunta 9 (Muy Difícil A - Dificultad 5)
**ID:** "CO-MAT-11-derivadas-002-v9"

### Enunciado
La velocidad de un vehículo en la autopista Norte de Bogotá está dada por $v(t) = \frac{100t}{t+5}$ km/h. ¿Cuál es la aceleración (derivada de la velocidad) en $t = 5$ horas?

### Opciones
- [x] A) 5 km/h²
- [ ] B) 10 km/h²
- [ ] C) 2.5 km/h²
- [ ] D) 50 km/h²

### Explicación Pedagógica
$a(t) = v'(t) = \frac{100(t+5) - 100t \cdot 1}{(t+5)^2} = \frac{500}{(t+5)^2}$. En $t = 5$: $a(5) = \frac{500}{100} = 5$ km/h².

---

## Pregunta 10 (Muy Difícil B - Dificultad 5)
**ID:** "CO-MAT-11-derivadas-002-v10"

### Enunciado
Si $f(x) = (x^2 + 1)^3$, ¿cuál es $f'(x)$ usando la regla de la cadena?

### Opciones
- [ ] A) $3(x^2 + 1)^2$
- [x] B) $6x(x^2 + 1)^2$
- [ ] C) $3x(x^2 + 1)^2$
- [ ] D) $6x^2(x^2 + 1)^2$

### Explicación Pedagógica
Por regla de la cadena: si $u = x^2 + 1$, entonces $f = u^3$. $f'(x) = 3u^2 \cdot u' = 3(x^2+1)^2 \cdot 2x = 6x(x^2+1)^2$.

---

## 📊 Metadata de Validación

| Pregunta | ID | Dificultad | Validado |
|----------|-----|------------|----------|
| 1 | CO-MAT-11-derivadas-002-v1 | 1 | ⬜ |
| 2 | CO-MAT-11-derivadas-002-v2 | 1 | ⬜ |
| 3 | CO-MAT-11-derivadas-002-v3 | 2 | ⬜ |
| 4 | CO-MAT-11-derivadas-002-v4 | 2 | ⬜ |
| 5 | CO-MAT-11-derivadas-002-v5 | 3 | ⬜ |
| 6 | CO-MAT-11-derivadas-002-v6 | 3 | ⬜ |
| 7 | CO-MAT-11-derivadas-002-v7 | 4 | ⬜ |
| 8 | CO-MAT-11-derivadas-002-v8 | 4 | ⬜ |
| 9 | CO-MAT-11-derivadas-002-v9 | 5 | ⬜ |
| 10 | CO-MAT-11-derivadas-002-v10 | 5 | ⬜ |
