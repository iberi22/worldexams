---
# === METADATA GLOBAL ===
id: "CO-MAT-11-funciones-001"
country: "CO"
grado: 11
asignatura: "Matemáticas"
tema: "Funciones - Análisis y Representación"
dificultad: 3
estado: "draft"
creador: "Copilot"
source_lang: "es-CO"
llm_model: "Copilot"
agent: "Cascade"
ide: "VS Code"
bundle_version: "2.1"
total_questions: 7
difficulty_distribution: "1 original (3) + 2 fácil (1-2) + 2 media (3) + 2 difícil (4-5)"
generation_date: "2025-12-04"

# === SOURCE ATTRIBUTION ===
source: "ICFES-Curriculum"
source_url: "https://www.icfes.gov.co"
source_license: "Educational Use - Colombian Curriculum"
source_id: "ICFES-MAT-011-001"
original_concept: "Análisis de funciones lineales y cuadráticas - interpretación gráfica"
competencia_icfes: "Interpretación y Representación - Formulación y Ejecución"
componente: "Numérico-variacional"

# === UNIVERSAL SHARING ===
universal_question: true
applicable_exams: ["CO-Saber11", "MX-ENLACE", "ES-Selectividad", "SAT-Math"]
---

# Bundle: Análisis de Funciones

> **Fuente:** Currículo ICFES Saber 11° - Matemáticas
> **Componente:** Numérico-variacional
> **Competencias:** Interpretación, Formulación, Validación
> **Contexto:** Colombia - Situaciones económicas y de negocios

---

## Pregunta 1 (Original - Dificultad 3)

**ID:** `CO-MAT-11-funciones-001-v1`

### Enunciado

Una empresa de transporte en una ciudad cobra una tarifa que depende de la distancia recorrida. La tarifa se puede modelar con la función:

$$T(d) = 3500 + 450d$$

donde $T$ es la tarifa en pesos y $d$ es la distancia en kilómetros.

¿Cuál es la interpretación correcta del valor 3500 en esta función?

### Opciones

- [x] A) Es el costo fijo que se cobra independientemente de la distancia
- [ ] B) Es el costo por cada kilómetro recorrido
- [ ] C) Es la distancia mínima que debe recorrer un pasajero
- [ ] D) Es la tarifa máxima que puede cobrar la empresa

### Explicación Pedagógica

**¿Por qué A es correcta?**
En la función $T(d) = 3500 + 450d$:
- El término **3500** es el intercepto con el eje y (cuando $d=0$)
- Representa el costo fijo o "banderazo" que se cobra solo por abordar el vehículo
- Incluso si la distancia es 0 km, el costo es $3500

**¿Por qué las otras son incorrectas?**
- **B)** El costo por km es 450 (la pendiente), no 3500.
- **C)** El modelo no establece una distancia mínima.
- **D)** La tarifa no tiene máximo en este modelo lineal.

**Competencia evaluada:** Interpretación - significado de parámetros en funciones lineales

---

## Pregunta 2 (Fácil A - Dificultad 1)

**ID:** `CO-MAT-11-funciones-001-v2`

### Enunciado

Si la función que describe el precio de un producto es $P(x) = 2x + 10$, ¿cuál es el precio cuando se compran 5 unidades?

### Opciones

- [ ] A) $15
- [x] B) $20
- [ ] C) $25
- [ ] D) $10

### Explicación Pedagógica

Sustituimos $x = 5$ en la función:
$P(5) = 2(5) + 10 = 10 + 10 = 20$

**Competencia evaluada:** Ejecución - evaluación de funciones

---

## Pregunta 3 (Fácil B - Dificultad 2)

**ID:** `CO-MAT-11-funciones-001-v3`

### Enunciado

La siguiente gráfica muestra la ganancia mensual (en millones de pesos) de una tienda de café durante sus primeros 6 meses:

```
Ganancia (millones)
│
4├─────────────●
│             ╱
3├──────────●╱
│          ╱
2├────────●
│       ╱
1├─────●
│    ╱
0├───●─────────────────
 0  1  2  3  4  5  Mes
```

Según la gráfica, ¿cuál fue la ganancia en el mes 3?

### Opciones

- [ ] A) 1 millón de pesos
- [x] B) 2 millones de pesos
- [ ] C) 3 millones de pesos
- [ ] D) 4 millones de pesos

### Explicación Pedagógica

En la gráfica, el punto correspondiente al mes 3 tiene un valor de 2 en el eje vertical (ganancia).

**Competencia evaluada:** Comunicación - lectura de gráficas

---

## Pregunta 4 (Media A - Dificultad 3)

**ID:** `CO-MAT-11-funciones-001-v4`

### Enunciado

Un emprendedor produce y vende camisetas. Sus costos totales están dados por $C(x) = 15000x + 500000$ pesos, donde $x$ es el número de camisetas producidas. Si vende cada camiseta a $25000$ pesos, ¿cuántas camisetas debe vender para no tener pérdidas ni ganancias (punto de equilibrio)?

### Opciones

- [ ] A) 20 camisetas
- [ ] B) 33 camisetas
- [x] C) 50 camisetas
- [ ] D) 100 camisetas

### Explicación Pedagógica

**Punto de equilibrio:** Ingresos = Costos

**Ingresos:** $I(x) = 25000x$
**Costos:** $C(x) = 15000x + 500000$

Igualamos:
$25000x = 15000x + 500000$
$25000x - 15000x = 500000$
$10000x = 500000$
$x = 50$ camisetas

**Verificación:**
- Ingresos: $25000 × 50 = 1,250,000
- Costos: $15000 × 50 + 500000 = 750,000 + 500,000 = 1,250,000 ✓

**Competencia evaluada:** Formulación - modelamiento con ecuaciones lineales

---

## Pregunta 5 (Media B - Dificultad 3)

**ID:** `CO-MAT-11-funciones-001-v5`

### Enunciado

La altura $h$ (en metros) de un balón de fútbol lanzado desde el suelo en un estadio está dada por la función:

$$h(t) = -5t^2 + 20t$$

donde $t$ es el tiempo en segundos. ¿En qué momento(s) el balón está a nivel del suelo?

### Opciones

- [ ] A) Solo en $t = 0$
- [ ] B) Solo en $t = 4$
- [x] C) En $t = 0$ y $t = 4$
- [ ] D) En $t = 2$

### Explicación Pedagógica

El balón está a nivel del suelo cuando $h(t) = 0$:

$-5t^2 + 20t = 0$
$-5t(t - 4) = 0$
$t = 0$ o $t = 4$

**Interpretación:**
- $t = 0$: momento del lanzamiento (inicia en el suelo)
- $t = 4$: momento en que el balón regresa al suelo

**Competencia evaluada:** Resolución - encontrar ceros de funciones cuadráticas

---

## Pregunta 6 (Difícil A - Dificultad 4)

**ID:** `CO-MAT-11-funciones-001-v6`

### Enunciado

Un agricultor tiene la siguiente función de ganancias por hectárea de café:

$$G(p) = -2p^2 + 200p - 3000$$

donde $p$ es el precio de venta por kilo (en miles de pesos) y $G$ es la ganancia (en miles de pesos).

¿A qué precio debe vender el kilo de café para maximizar su ganancia?

### Opciones

- [ ] A) $30.000 pesos por kilo
- [x] B) $50.000 pesos por kilo
- [ ] C) $70.000 pesos por kilo
- [ ] D) $100.000 pesos por kilo

### Explicación Pedagógica

**Método 1: Fórmula del vértice**
Para $f(x) = ax^2 + bx + c$, el vértice está en $x = -\frac{b}{2a}$

Aquí: $a = -2$, $b = 200$
$p = -\frac{200}{2(-2)} = -\frac{200}{-4} = 50$

**Método 2: Derivada (cálculo)**
$G'(p) = -4p + 200 = 0$
$p = 50$

El precio óptimo es **50 miles de pesos = $50.000 por kilo**.

**Verificación:** Como $a = -2 < 0$, la parábola abre hacia abajo, entonces $p = 50$ es un máximo.

**Competencia evaluada:** Validación - optimización de funciones cuadráticas

---

## Pregunta 7 (Difícil B - Dificultad 5)

**ID:** `CO-MAT-11-funciones-001-v7`

### Enunciado

Una empresa de tecnología modela sus ingresos $I(x)$ y costos $C(x)$ con las siguientes funciones (en millones de pesos):

$$I(x) = -0.5x^2 + 80x$$
$$C(x) = 20x + 800$$

donde $x$ es el número de unidades vendidas (en miles).

¿Cuál es la máxima ganancia que puede obtener la empresa?

### Opciones

- [ ] A) 400 millones de pesos
- [ ] B) 600 millones de pesos
- [ ] C) 800 millones de pesos
- [x] D) 1000 millones de pesos

### Explicación Pedagógica

**Paso 1:** Definir la función de ganancia
$G(x) = I(x) - C(x)$
$G(x) = (-0.5x^2 + 80x) - (20x + 800)$
$G(x) = -0.5x^2 + 80x - 20x - 800$
$G(x) = -0.5x^2 + 60x - 800$

**Paso 2:** Encontrar el máximo (vértice)
$x = -\frac{b}{2a} = -\frac{60}{2(-0.5)} = -\frac{60}{-1} = 60$

**Paso 3:** Calcular la ganancia máxima
$G(60) = -0.5(60)^2 + 60(60) - 800$
$G(60) = -0.5(3600) + 3600 - 800$
$G(60) = -1800 + 3600 - 800$
$G(60) = 1000$ millones de pesos

**Respuesta final:** La máxima ganancia es **1000 millones de pesos**.

**Competencia evaluada:** Formulación y Validación - análisis completo de modelo económico

---

## 📊 Metadata de Validación

| Pregunta | ID | Dificultad | Competencia ICFES | Componente | Validado |
|----------|-----|------------|-------------------|------------|----------|
| 1 | CO-MAT-11-funciones-001-v1 | 3 | Interpretación | Numérico-var. | ⬜ |
| 2 | CO-MAT-11-funciones-001-v2 | 1 | Ejecución | Numérico-var. | ⬜ |
| 3 | CO-MAT-11-funciones-001-v3 | 2 | Comunicación | Numérico-var. | ⬜ |
| 4 | CO-MAT-11-funciones-001-v4 | 3 | Formulación | Numérico-var. | ⬜ |
| 5 | CO-MAT-11-funciones-001-v5 | 3 | Resolución | Numérico-var. | ⬜ |
| 6 | CO-MAT-11-funciones-001-v6 | 4 | Validación | Numérico-var. | ⬜ |
| 7 | CO-MAT-11-funciones-001-v7 | 5 | Formulación + Validación | Numérico-var. | ⬜ |
