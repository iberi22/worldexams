---
id: "CO-MAT-11-continuidad-funciones-001"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Continuidad y Discontinuidades"
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
search_query: "DBA matematicas grado 11 colombia continuidad funciones discontinuidad evitable salto infinito"
---

# Pregunta Base: El Trazo sin Levantar el Lápiz: Continuidad

> **Fuente:** Derechos Básicos de Aprendizaje (DBA) Colombia
> **Tema:** Pensamiento Variacional (Continuidad)

---

## Pregunta 1 (Muy Fácil A - Dificultad 1)

**ID:** `CO-MAT-11-continuidad-funciones-001-v1`

### Enunciado

Intuitivamente, ¿cuándo decimos que una función es **Continua** en un intervalo?

### Opciones

- [x] A) Cuando su gráfica se puede dibujar de un solo trazo, sin levantar el lápiz del papel (sin huecos ni saltos)
- [ ] B) Cuando es una línea recta
- [ ] C) Cuando siempre crece
- [ ] D) Cuando pasa por el origen

### Explicación Pedagógica

La continuidad significa que no hay interrupciones en el camino de la función.

---

## Pregunta 2 (Muy Fácil B - Dificultad 1)

**ID:** `CO-MAT-11-continuidad-funciones-001-v2`

### Enunciado

Matemáticamente, para que una función $f(x)$ sea continua en un punto $c$, deben cumplirse tres condiciones. ¿Cuáles son?

### Opciones

- [x] A) 1) $f(c)$ existe, 2) $\lim_{x \to c} f(x)$ existe, y 3) **El límite es igual al valor de la función**
- [ ] B) Solo que el límite exista
- [ ] C) Solo que la función esté definida
- [ ] D) Que la función sea positiva

### Explicación Pedagógica

Si falla alguna de las tres, hay una discontinuidad.

---

## Pregunta 3 (Fácil A - Dificultad 2)

**ID:** `CO-MAT-11-continuidad-funciones-001-v3`

### Enunciado

Calcula los límites laterales de $f(x) = \begin{cases} 2x & \text{si } x < 1 \\ 3 & \text{si } x \geq 1 \end{cases}$ en $x=1$. ¿Es continua?

### Opciones

- [x] A) Límite izq: $2(1)=2$; Límite der: 3. **No es continua** porque los límites son distintos (salto)
- [ ] B) Sí es continua porque $f(1)=3$
- [ ] C) Es continua porque ambos números son positivos
- [ ] D) No se puede saber

### Explicación Pedagógica

Hay un "salto" en la gráfica de altura 2 a altura 3.

---

## Pregunta 4 (Fácil B - Dificultad 2)

**ID:** `CO-MAT-11-continuidad-funciones-001-v4`

### Enunciado

¿Qué tipo de discontinuidad presenta la función $f(x) = \frac{x^2-4}{x-2}$ en $x=2$?

### Opciones

- [x] A) **Discontinuidad Evitable** (o Removible), porque el límite existe (es 4) aunque la función no esté definida en ese punto
- [ ] B) Salto infinito
- [ ] C) Salto finito
- [ ] D) Es continua

### Explicación Pedagógica

Es como un pequeño agujero en la línea que se podría "tapar" definiendo $f(2) = 4$.

---

## Pregunta 5 (Media A - Dificultad 3)

**ID:** `CO-MAT-11-continuidad-funciones-001-v5`

### Enunciado

¿Qué tipo de discontinuidad tiene $f(x) = \frac{1}{x}$ en $x=0$?

### Opciones

- [x] A) **Discontinuidad Infinita** (o Asintótica), porque los valores crecen o decrecen sin límite al acercarse a 0
- [ ] B) Evitable
- [ ] C) De salto finito
- [ ] D) Ninguna

### Explicación Pedagógica

La función se rompe violentamente hacia el infinito; no se puede "reparar" con un simple punto.

---

## Pregunta 6 (Media B - Dificultad 3)

**ID:** `CO-MAT-11-continuidad-funciones-001-v6`

### Enunciado

¿Es continua la función valor absoluto $f(x) = |x|$ en $x=0$?

### Opciones

- [x] A) **Sí**, porque el límite por izquierda (0) y derecha (0) coinciden con el valor de la función ($|0|=0$)
- [ ] B) No, porque tiene una punta
- [ ] C) No, porque cambia de dirección
- [ ] D) No existe en 0

### Explicación Pedagógica

Es continua (no se rompe), aunque no sea "suave" (derivable) en ese punto.

---

## Pregunta 7 (Difícil A - Dificultad 4)

**ID:** `CO-MAT-11-continuidad-funciones-001-v7`

### Enunciado

Halla el valor de $k$ para que la función sea continua en todo su dominio:
$f(x) = \begin{cases} x + 1 & \text{si } x \leq 2 \\ kx & \text{si } x > 2 \end{cases}$

### Opciones

- [x] A) $k = \frac{3}{2} = 1.5$
- [ ] B) $k = 1$
- [ ] C) $k = 2$
- [ ] D) $k = 3$

### Explicación Pedagógica

Igualamos los límites laterales en $x=2$: $2+1 = k(2) \rightarrow 3 = 2k \rightarrow k=1.5$.

---

## Pregunta 8 (Difícil B - Dificultad 4)

**ID:** `CO-MAT-11-continuidad-funciones-001-v8`

### Enunciado

¿Qué dice el **Teorema del Valor Intermedio** (Bolzano) sobre una función continua en $[a, b]$?

### Opciones

- [x] A) Si $f(a)$ y $f(b)$ tienen signos opuestos, entonces existe al menos un punto $c$ en el intervalo donde **f(c) = 0** (corta al eje x)
- [ ] B) La función siempre es positiva
- [ ] C) La función es una recta
- [ ] D) El límite es infinito

### Explicación Pedagógica

Si vas de un punto negativo a uno positivo sin levantar el lápiz, obligatoriamente tienes que cruzar el cero en algún momento.

---

## Pregunta 9 (Muy Difícil A - Dificultad 5)

**ID:** `CO-MAT-11-continuidad-funciones-001-v9`

### Enunciado

La función "parte entera" o "suelo" $\lfloor x \rfloor$ presenta discontinuidades. ¿De qué tipo y dónde?

### Opciones

- [x] A) Discontinuidades de **Salto Finito** en todos los números **enteros**
- [ ] B) Evitables en los enteros
- [ ] C) Infinitas en los enteros
- [ ] D) Es continua siempre

### Explicación Pedagógica

La gráfica parece una escalera. En cada entero, salta repentinamente al siguiente escalón.

---

## Pregunta 10 (Muy Difícil B - Dificultad 5)

**ID:** `CO-MAT-11-continuidad-funciones-001-v10`

### Enunciado

Para la función $f(x) = \frac{x^2 - 1}{x^2 - 3x + 2}$, clasifica sus discontinuidades.

### Opciones

- [x] A) Factorizando: $(x-1)(x+1) / (x-1)(x-2)$. En $x=1$ es **Evitable** (hueco); en $x=2$ es **Infinita** (asíntota)
- [ ] B) Ambas son infinitas
- [ ] C) Ambas son evitables
- [ ] D) Es continua

### Explicación Pedagógica

El factor $(x-1)$ se cancela (evitable), pero el $(x-2)$ permanece en el denominador (asíntota).
