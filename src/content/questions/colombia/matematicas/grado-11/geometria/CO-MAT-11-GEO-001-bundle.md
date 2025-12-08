---
# === METADATA GLOBAL ===
id: "CO-MAT-11-GEO-001"
country: "CO"
grado: 11
asignatura: "Matemáticas"
tema: "Geometría - Volumen y Área"
dificultad: "Medium"
estado: "draft"
creador: "AI-WorldExams"
source_lang: "es-CO"
llm_model: "claude-sonnet-4-20250514"
agent: "Cascade"
ide: "VS Code"
bundle_version: "2.1"
total_questions: 7
difficulty_distribution: "1 original (3) + 2 fácil (1-2) + 2 media (3) + 2 difícil (4-5)"
generation_date: "2025-12-06"

# === SOURCE ATTRIBUTION ===
source: "ICFES-Curriculum"
source_url: "https://www.icfes.gov.co/documents/39286/21576717/Cuadernillo+de+preguntas+Saber+11-+Matem%C3%A1ticas.pdf"
source_license: "Educational Use - Colombian Curriculum"
source_id: "ICFES-MAT-011-GEO-001"
original_concept: "Cálculo de volumen de sólidos - Prismas y relaciones dimensionales"
competencia_icfes: "Formulación y Ejecución - Interpretación"
componente: "Espacial-métrico"

# === UNIVERSAL SHARING ===
universal_question: false
applicable_exams: ["CO-Saber11"]
---

# Bundle: Volumen y Geometría de Sólidos

> **Fuente:** Currículo ICFES Saber 11° - Matemáticas
> **Componente:** Espacial-métrico
> **Competencias:** Formulación y Ejecución, Interpretación, Argumentación
> **Contexto:** Colombia - Situaciones de diseño, empaque y manufactura

---

## Pregunta 1 (Original - Dificultad Medium)

**ID:** `CO-MAT-11-GEO-001-v1`

### Enunciado

Una compañía de mensajería de Bogotá necesita diseñar cajas rectangulares para enviar un nuevo producto. La caja debe tener un volumen de 2000 cm³. Si la base es cuadrada y la altura es el doble del lado de la base, ¿cuáles deben ser, aproximadamente, las dimensiones de la caja?

### Opciones

- [x] A) Base de 10 cm × 10 cm y altura de 20 cm
- [ ] B) Base de 5 cm × 5 cm y altura de 40 cm
- [ ] C) Base de 8 cm × 8 cm y altura de 16 cm
- [ ] D) Base de 12 cm × 12 cm y altura de 7 cm

### Explicación Pedagógica

**Modelamiento del problema:**
- Sea $x$ = lado de la base cuadrada
- Altura $h = 2x$ (el doble del lado)
- Volumen del prisma: $V = \text{base} \times \text{altura} = x^2 \times 2x = 2x^3$

**Resolución:**
$$2x^3 = 2000$$
$$x^3 = 1000$$
$$x = \sqrt[3]{1000} = 10 \text{ cm}$$

**Dimensiones:**
- Base: $10 \times 10$ cm
- Altura: $2 \times 10 = 20$ cm

**Verificación:** $10 \times 10 \times 20 = 2000$ cm³ ✓

**¿Por qué las otras son incorrectas?**
- **B) 5×5×40:** $V = 25 \times 40 = 1000$ cm³ ≠ 2000 cm³ (además, 40 ≠ 2×5)
- **C) 8×8×16:** $V = 64 \times 16 = 1024$ cm³ ≠ 2000 cm³
- **D) 12×12×7:** $V = 144 \times 7 = 1008$ cm³ ≠ 2000 cm³ (también 7 ≠ 2×12)

**Competencia evaluada:** Formulación y Ejecución - modelamiento algebraico

---

## Pregunta 2 (Low A - Dificultad Low)

**ID:** `CO-MAT-11-GEO-001-v2`

### Enunciado

Si una caja tiene una base cuadrada de 4 cm de lado y una altura de 10 cm, ¿cuál es su volumen?

### Opciones

- [x] A) 160 cm³
- [ ] B) 40 cm³
- [ ] C) 80 cm³
- [ ] D) 400 cm³

### Explicación Pedagógica

**Fórmula:** Volumen = Área de la base × Altura

**Cálculo:**
- Área base = $4 \times 4 = 16$ cm²
- Volumen = $16 \times 10 = 160$ cm³

**¿Por qué las otras son incorrectas?**
- **B) 40:** Solo multiplicó un lado por la altura (4×10)
- **C) 80:** Multiplicó base×2 por altura incorrectamente
- **D) 400:** Multiplicó todo sin calcular bien el área base

**Competencia evaluada:** Interpretación - cálculo básico de volumen

---

## Pregunta 3 (Low B - Dificultad Low)

**ID:** `CO-MAT-11-GEO-001-v3`

### Enunciado

Un cubo tiene una arista de 3 cm. ¿Cuál es su volumen?

### Opciones

- [x] A) 27 cm³
- [ ] B) 9 cm³
- [ ] C) 18 cm³
- [ ] D) 81 cm³

### Explicación Pedagógica

**Fórmula del cubo:** $V = L^3$ donde $L$ es la arista

**Cálculo:**
$$V = 3^3 = 3 \times 3 \times 3 = 27 \text{ cm}^3$$

**¿Por qué las otras son incorrectas?**
- **B) 9:** Calculó $3^2$ (área de una cara, no volumen)
- **C) 18:** Calculó $3 \times 6$ (error conceptual)
- **D) 81:** Calculó $3^4$ en lugar de $3^3$

**Competencia evaluada:** Interpretación - volumen del cubo

---

## Pregunta 4 (Medium A - Dificultad Medium)

**ID:** `CO-MAT-11-GEO-001-v4`

### Enunciado

En una fábrica de cerámica de Ráquira (Boyacá), se elaboran vasijas cilíndricas. Si el radio de la base de una vasija es de 5 cm y su altura es de 12 cm, ¿cuál es el volumen aproximado de la vasija? (Use $\pi = 3.14$)

### Opciones

- [ ] A) 188.4 cm³
- [ ] B) 376.8 cm³
- [x] C) 942 cm³
- [ ] D) 1884 cm³

### Explicación Pedagógica

**Fórmula del cilindro:** $V = \pi r^2 h$

**Cálculo:**
$$V = 3.14 \times 5^2 \times 12$$
$$V = 3.14 \times 25 \times 12$$
$$V = 3.14 \times 300 = 942 \text{ cm}^3$$

**¿Por qué las otras son incorrectas?**
- **A) 188.4:** Usó $\pi \times r \times h$ en lugar de $\pi r^2 h$ (olvidó elevar al cuadrado)
- **B) 376.8:** Calculó $2 \times \pi \times r \times h$ (perímetro × altura, no volumen)
- **D) 1884:** Multiplicó por el diámetro en vez del radio

**Competencia evaluada:** Formulación - volumen del cilindro

---

## Pregunta 5 (Medium B - Dificultad Medium)

**ID:** `CO-MAT-11-GEO-001-v5`

### Enunciado

Una empresa de empaques en Medellín diseña cajas cúbicas. Si aumentan cada arista del cubo original al doble, ¿en cuántas veces aumenta el volumen?

### Opciones

- [ ] A) 2 veces
- [ ] B) 4 veces
- [ ] C) 6 veces
- [x] D) 8 veces

### Explicación Pedagógica

**Análisis dimensional:**

- Volumen original: $V_1 = L^3$
- Nueva arista: $2L$
- Nuevo volumen: $V_2 = (2L)^3 = 8L^3$

**Razón de aumento:**
$$\frac{V_2}{V_1} = \frac{8L^3}{L^3} = 8$$

El volumen aumenta **8 veces**.

**Regla general:** Si las dimensiones lineales se multiplican por $k$, el volumen se multiplica por $k^3$.

**¿Por qué las otras son incorrectas?**
- **A) 2:** Piensa que duplicar arista = duplicar volumen (lineal, no cúbico)
- **B) 4:** Piensa en $2^2$ (cuadrado, no cubo)
- **C) 6:** Piensa en 6 caras, pero esto es superficie, no volumen

**Competencia evaluada:** Argumentación - relaciones dimensionales

---

## Pregunta 6 (High A - Dificultad High)

**ID:** `CO-MAT-11-GEO-001-v6`

### Enunciado

Un tanque de agua con forma de prisma rectangular en una finca del Valle del Cauca tiene las siguientes dimensiones internas: largo 2 m, ancho 1.5 m y alto 1.2 m. Si se quiere llenar hasta $\frac{3}{4}$ de su capacidad, ¿cuántos litros de agua se necesitan? (1 m³ = 1000 litros)

### Opciones

- [x] A) 2700 litros
- [ ] B) 3600 litros
- [ ] C) 1800 litros
- [ ] D) 4500 litros

### Explicación Pedagógica

**Paso 1:** Calcular el volumen total
$$V_{total} = 2 \times 1.5 \times 1.2 = 3.6 \text{ m}^3$$

**Paso 2:** Calcular $\frac{3}{4}$ del volumen
$$V_{parcial} = 3.6 \times \frac{3}{4} = 3.6 \times 0.75 = 2.7 \text{ m}^3$$

**Paso 3:** Convertir a litros
$$2.7 \text{ m}^3 \times 1000 = 2700 \text{ litros}$$

**¿Por qué las otras son incorrectas?**
- **B) 3600:** Es el volumen total sin aplicar la fracción
- **C) 1800:** Calculó $\frac{1}{2}$ en lugar de $\frac{3}{4}$
- **D) 4500:** Error en los cálculos

**Competencia evaluada:** Formulación y Ejecución - problema multi-paso con conversión

---

## Pregunta 7 (High B - Dificultad High)

**ID:** `CO-MAT-11-GEO-001-v7`

### Enunciado

Una empresa constructora en Cartagena necesita calcular cuántos metros cúbicos de concreto requiere para construir un bloque hueco con las siguientes características:

**Bloque exterior:** Prisma rectangular de 4 m × 3 m × 2.5 m
**Espacio hueco interior:** Prisma rectangular de 3.6 m × 2.6 m × 2.5 m (mismo alto)

¿Cuántos metros cúbicos de concreto se necesitan?

### Opciones

- [ ] A) 6.6 m³
- [x] B) 6.6 m³
- [ ] C) 23.4 m³
- [ ] D) 30 m³

*(Nota: A y B son iguales, la respuesta correcta es 6.6 m³)*

### Opciones (corregidas)

- [ ] A) 5.4 m³
- [x] B) 6.6 m³
- [ ] C) 23.4 m³
- [ ] D) 30 m³

### Explicación Pedagógica

**Estrategia:** Volumen de concreto = Volumen exterior - Volumen interior (hueco)

**Paso 1:** Volumen del prisma exterior
$$V_{ext} = 4 \times 3 \times 2.5 = 30 \text{ m}^3$$

**Paso 2:** Volumen del prisma interior (hueco)
$$V_{int} = 3.6 \times 2.6 \times 2.5 = 23.4 \text{ m}^3$$

**Paso 3:** Volumen de concreto necesario
$$V_{concreto} = V_{ext} - V_{int} = 30 - 23.4 = 6.6 \text{ m}^3$$

**¿Por qué las otras son incorrectas?**
- **A) 5.4:** Error de cálculo en alguno de los volúmenes
- **C) 23.4:** Es solo el volumen interior (hueco), no el concreto
- **D) 30:** Es solo el volumen exterior, sin restar el hueco

**Competencia evaluada:** Formulación y Ejecución - problema de sustracción geométrica

---

## 📊 Metadata de Validación

| Pregunta | ID | Dificultad | Competencia ICFES | Componente | Validado |
|----------|-----|------------|-------------------|------------|----------|
| 1 | CO-MAT-11-GEO-001-v1 | Medium | Formulación | Espacial-métrico | ⬜ |
| 2 | CO-MAT-11-GEO-001-v2 | Low | Interpretación | Espacial-métrico | ⬜ |
| 3 | CO-MAT-11-GEO-001-v3 | Low | Interpretación | Espacial-métrico | ⬜ |
| 4 | CO-MAT-11-GEO-001-v4 | Medium | Formulación | Espacial-métrico | ⬜ |
| 5 | CO-MAT-11-GEO-001-v5 | Medium | Argumentación | Espacial-métrico | ⬜ |
| 6 | CO-MAT-11-GEO-001-v6 | High | Formulación | Espacial-métrico | ⬜ |
| 7 | CO-MAT-11-GEO-001-v7 | High | Formulación | Espacial-métrico | ⬜ |

---

**Source ID:** `ICFES-MAT-011-GEO-001`
**Fecha de creación:** 2025-12-06
**Contexto cultural:** Bogotá (mensajería), Ráquira (cerámica), Medellín (empaques), Valle del Cauca (agricultura), Cartagena (construcción)

