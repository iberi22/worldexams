---
# === METADATA GLOBAL ===
id: "CO-MAT-11-funciones-001"
country: "CO"
grado: 11
asignatura: "Matemáticas"
tema: "Funciones - Análisis y Representación"
dificultad: "Medium"
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

licenses:
  v1: "CC BY-SA 4.0"       # Pregunta original (uso comercial permitido)
  v2-v7: "CC BY-NC-SA 4.0" # Variantes pedagógicas (solo uso no-comercial)
---

# Bundle: Análisis de Funciones

> **Fuente:** Currículo ICFES Saber 11° - Matemáticas
> **Componente:** Numérico-variacional
> **Competencias:** Interpretación, Formulación, Validación
> **Contexto:** Colombia - Situaciones económicas y de negocios

## Pregunta 2 (Fácil - Dificultad 1)
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

## Pregunta 4 (Media - Dificultad 3)
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

## Pregunta 6 (Difícil - Dificultad 5)
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
