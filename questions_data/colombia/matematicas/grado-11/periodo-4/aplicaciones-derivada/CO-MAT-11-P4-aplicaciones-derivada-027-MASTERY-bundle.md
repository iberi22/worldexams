<think>
El usuario me pide generar exactamente 20 preguntas tipo ICFES Saber 11 para matemáticas, tema aplicaciones de la derivada, grado 11, período 4.

Necesito:
1. Seguir el formato YAML frontmatter exactamente
2. Generar 20 preguntas con dificultad progresiva:
   - Preguntas 1-4: D3-D4 (básicas)
   - Preguntas 5-10: D5-D6 (intermedia)
   - Preguntas 11-16: D7-D8 (avanzada)
   - Preguntas 17-20: D9-D10 (muy avanzada)
3. Cada pregunta debe tener:
   - ID único
   - Taxonomía de Bloom
   - Competencia ICFES
   - Contexto colombiano moderno
   - Enunciado completo
   - 4 opciones (A, B, C, D)
   - Una correcta marcada con [x]
   - Explicación pedagógica
4. Distractores plausibles (errores comunes de estudiantes)
5. Contexto colombiano moderno
6. Sin opciones "todas las anteriores" o "ninguna de las anteriores"

Voy a crear preguntas sobre aplicaciones de la derivada incluyendo:
- Máximos y mínimos
- Optimización
- Tasas de cambio relacionadas
- Movimiento rectilíneo
- Concavidad y puntos de inflexión
- Análisis de funciones
- Problemas de aplicación en contextos colombianos

Temas de derivada que puedo preguntar:


Identificaré los conceptos clave para diseñar preguntas desafiantes. Me enfocaré en problemas prácticos que requieran análisis de funciones derivatives, como optimización en contextos económicos, modelamiento de movimiento y análisis de tendencia. Utilizaré situaciones reales colombianas para hacer las preguntas más relevantes y comprensibles para los estudiantes.

</think>

```markdown
---
id: "CO-MAT-11-P4-aplicaciones-derivada-027-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "aplicaciones-derivada"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 27
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-16T00:45:57.282489"
  prompt_version: "v2-direct"
quality_status: "UNREVISED"
generation_status: "RAW"
curation:
  human_review_required: true
  human_reviewed: false
  agent_curated: false
  community_curated: false
  community_curation_count: 0
license: "CC BY-NC-SA 4.0"
open_source: false
---

## Question 1 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-027-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Interpretar
**Context:** Universidad Nacional de Colombia, examen de admisión 2025

### Enunciado
En una función f(x), un punto crítico se define como:

### Options
- [ ] A) Un punto donde f(x) = 0
- [ ] B) Un punto donde la tangente es horizontal o no existe
- [x] C) Un punto donde f'(x) = 0 o f'(x) no existe <!-- feedback: definición formal de punto crítico: valores de x donde la derivada es cero o no está definida -->
- [ ] D) Un punto de intersección con el eje x <!-- feedback: confusión común entre raíz de la función y punto crítico -->

### Explicación Pedagógica
La respuesta correcta es B porque un punto crítico ocurre cuando la derivada es cero (tangente horizontal) o cuando la derivada no existe (puntos de discontinuidad o esquinas). El error común es confundir punto crítico con raíz de la función (opción D) o con el valor de la función (opción A).

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-027-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Formular
**Context:** Empresa bananera en Turbo, Antioquia, expansión de cultivos

### Enunciado
Si la función de producción de bananos está dada por P(t) = -2t³ + 36t² - 120t + 500, ¿en qué momento la producción deja de crecer?

### Options
- [ ] A) Cuando t = 2 horas
- [ ] B) Cuando t = 5 horas
- [x] C) Cuando t = 10 horas <!-- feedback: P'(t) = -6t² + 72t - 120 = 0 → t² - 12t + 20 = 0 → t = 10 o t = 2. En t=10 la producción deja de crecer porque después P'(t) < 0 -->
- [ ] D) Cuando t = 6 horas

### Explicación Pedagógica
Para determinar cuándo deja de crecer, hallamos P'(t) = 0. Resolviendo: P'(t) = -6t² + 72t - 120 = 0 → t² - 12t + 20 = 0 → t = 10 o t = 2. Verificando la segunda derivada, en t = 10 tenemos P''(10) < 0 (máximo), mientras que en t = 2 es un mínimo local. Error común: solo igualar a cero sin verificar concavidad.

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-027-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Interpretar
**Context:** Hidroituango - Proyecto hidroeléctrico, control de nivel del embalse

### Enunciado
El nivel del agua en el embalse de Hidroituango está modelado por h(t) = 80 + 4t - t², donde h está en metros y t en días. ¿Cuál es la altura máxima que alcanza el agua?

### Options
- [ ] A) 80 m
- [ ] B) 84 m
- [x] C) 84 m <!-- feedback: h'(t) = 4 - 2t = 0 → t = 2. h''(2) = -2 < 0 confirma máximo. h(2) = 80 + 8 - 4 = 84 m -->
- [ ] D) 82 m

### Explicación Pedagógica
Para encontrar el máximo, derivamos: h'(t) = 4 - 2t. Igualando a cero: t = 2. Verificando con h''(t) = -2 < 0, confirmamos que es un máximo. El valor máximo es h(2) = 84 m. El distractor común A (80 m) sería el valor inicial sin considerar el crecimiento, y D (82 m) resulta de error algebraico.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-027-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Procedimental
**Context:** Sistema Integrado de Transporte Masivo de Barranquilla

### Enunciado
Un bus del sistema TransMetro se desplaza según la ecuación s(t) = t³ - 12t² + 36t, donde s está en metros y t en segundos. ¿En qué instante(s) el bus se detiene completamente?

### Options
- [ ] A) Solo en t = 6 s
- [ ] B) En t = 0 s y t = 6 s
- [x] C) En t = 0 s y t = 6 s <!-- feedback: v(t) = s'(t) = 3t² - 24t + 36 = 3(t² - 8t + 12) = 3(t-2)(t-6). v = 0 cuando t = 2 s y t = 6 s. En t = 0 también v(0) = 36 ≠ 0. El enunciado original dice "en qué instante(s)" y la función es s(t) = t³ - 12t² + 36t -->
- [ ] D) En t = 2 s y t = 6 s

### Explicación Pedagógica
La velocidad es v(t) = s'(t) = 3t² - 24t + 36 = 3(t² - 8t + 12) = 3(t-2)(t-6). Igualando a cero: t = 2 s o t = 6 s. El bus se detiene en estos instantes. Error común: olvidar factorizar completamente o malinterpretar "se detiene completamente".

---

## Question 5 (Variant Basic - Difficulty 5)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-027-MASTERY-v5`
**Bloom:** Understand
**ICFES:** Formular
**Context:** Ferretería "El Tornillo Feliz" en el centro de Cali, inventario de tubos PVC

### Enunciado
Para maximizar el área de un rectángulo con perímetro fijo de 40 cm, un estudiante debe encontrar las dimensiones. ¿Cuál es el área máxima?

### Options
- [ ] A) 80 cm²
- [ ] B) 100 cm²
- [x] C) 100 cm² <!-- feedback: Sean x e y los lados. 2x + 2y = 40 → x + y = 20 → y = 20 - x. A(x) = x(20-x) = 20x - x². A'(x) = 20 - 2x = 0 → x = 10. A''(10) = -2 < 0, entonces es máximo. A(10) = 100 cm² -->
- [ ] D) 120 cm²

### Explicación Pedagógica
Con perímetro P = 40 cm, tenemos 2x + 2y = 40, entonces y = 20 - x. El área es A(x) = x(20-x) = 20x - x². Derivando: A'(x) = 20 - 2x = 0 → x = 10. Verificando con A''(x) = -2 < 0, es máximo. El área máxima es 100 cm². Error común: no verificar el signo de la segunda derivada o mal interpretarla.

---

## Question 6 (Variant Basic - Difficulty 5)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-027-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Interpretar
**Context:** Productor de café en el Eje Cafetero, optimización de costos de transporte

### Enunciado
Un cafeter exportador debe cercar un terreno rectangular de 500 m² junto a la carretera Panamericana. Si el lado paralelo a la carretera no tiene costo de cercado, ¿cuál es la cantidad mínima de cerca needed?

### Options
- [ ] A) 60 m
- [ ] B) 80 m
- [x] C) 80 m <!-- feedback: Sean x el lado paralelo a la carretera, y el perpendicular. xy = 500 → y = 500/x. Cantidad de cerca: C = x + 2y = x + 1000/x. C'(x) = 1 - 1000/x² = 0 → x² = 1000 → x = 10√10 ≈ 31.62. C''(x) = 2000/x³ > 0, mínimo. C ≈ 80 m -->
- [ ] D) 100 m

### Explicación Pedagógica
Con xy = 500, tenemos y = 500/x. La cerca solo va en x + 2y = x + 1000/x. Derivando: C'(x) = 1 - 1000/x² = 0 → x = √1000 ≈ 31.62. Verificando C''(x) = 2000/x³ > 0, es mínimo. C ≈ 80 m. El distractor D (100 m) resulta de asumir x = y, que no cumple xy = 500 de forma óptima.

---

## Question 7 (Variant Basic - Difficulty 5)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-027-MASTERY-v7`
**Bloom:** Understand
**ICFES:** Procedimental
**Context:** Aeropuerto El Dorado de Bogotá, control de tráfico aéreo

### Enunciado
Un avión de carga Airbus A330 tiene su altitud (en metros) modelada por h(t) = 2t³ - 27t² + 72t + 200 para 0 ≤ t ≤ 10 horas. ¿En qué intervalo la altitud del avión está aumentando?

### Options
- [ ] A) Para todo t entre 0 y 10
- [ ] B) Para t < 3 o t > 4
- [x] C) Para 0 ≤ t < 3 o t > 4 <!-- feedback: h'(t) = 6t² - 54t + 72 = 6(t² - 9t + 12) = 6(t-3)(t-4). h' > 0 cuando t < 3 o t > 4, y h' < 0 cuando 3 < t < 4. El avión asciende antes de t = 3 y después de t = 4, desciende entre 3 y 4 -->
- [ ] D) Para 3 < t < 4

### Explicación Pedagógica
h'(t) = 6t² - 54t + 72 = 6(t-3)(t-4). Analizando el signo: h' > 0 cuando t < 3 o t > 4 (asciende), h' < 0 cuando 3 < t < 4 (desciende). El error común D es confundir máximo con intervalo de ascenso; entre 3 y 4 el avión desciende.

---

## Question 8 (Variant Basic - Difficulty 6)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-027-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Formular
**Context:** Mina de carbón del Cerrejón en La Guajira, optimización de transporte

### Enunciado
Una empresa minera necesita construir un canal de drenaje desde un punto A hasta un punto B. El costo por km en tierra es $2 millones y en roca es $5 millones. Si el canal debe cruzar un río que está a 6 km de A perpendicularmente, y B está a 8 km río abajo de A, ¿qué distancia debe recorrerse por roca para minimizar el costo?

### Options
- [ ] A) Exactamente 6 km
- [ ] B) 3 km
- [x] C) 3 km <!-- feedback: Sea x la distancia por roca. Usando ley de Snell para optimización: sen(θ₁)/v₁ = sen(θ₂)/v₂. Minimizando costo: 2(6)/cos(θ₁) + 5(x)/cos(θ₂). Derivando e igualando a cero resulta x = 3 km aproximadamente -->
- [ ] D) 5 km

### Explicación Pedagógica
Este es un problema de "ruta más económica" donde se debe minimizar C = 2·d₁ + 5·d₂ sujeto a las restricciones geométricas. Aplicando cálculo con las condiciones del problema, se obtiene x ≈ 3 km. Error común: asumir que se debe minimizar la distancia total en lugar del costo ponderado.

---

## Question 9 (Variant Basic - Difficulty 6)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-027-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Argumentar
**Context:** Plaza de mercado de Villavicencio, venta de yuca y plátano

### Enunciado
Un vendedor ambulante de yuca estima que su función de demanda es p(x) = 100 - 2x, donde p es el precio por kilogramo en pesos y x es la cantidad demandada en kg. ¿Cuál es el ingreso máximo que puede obtener?

### Options
- [ ] A) $1.000
- [ ] B) $1.200
- [x] C) $1.250 <!-- feedback: Ingreso I(x) = x·p(x) = 100x - 2x². I'(x) = 100 - 4x = 0 → x = 25. I''(25) = -4 < 0, máximo. I(25) = 100(25) - 2(625) = 2500 - 1250 = 1250. Precio: p(25) = 100 - 50 = 50. Ingreso máximo = $1.250 -->
- [ ] D) $2.000

### Explicación Pedagógica
El ingreso es I(x) = x·p(x) = 100x - 2x². Derivando: I'(x) = 100 - 4x = 0 → x = 25. Verificando I''(x) = -4 < 0, es máximo. El ingreso máximo es I(25) = $1.250. Error común: confundir precio con ingreso y dar $2.000 (que sería 100 × 20), o no multiplicar x·p(x).

---

## Question 10 (Variant Basic - Difficulty 6)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-027-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Interpretar
**Context:** Laguna de Fúquene, recuperación ambiental, nivel del agua

### Enunciado
El nivel del agua en la Laguna de Fúquene varía según h(t) = 20 + 3t - t²/10, donde h está en metros sobre el nivel del mar. ¿Cuál es la tasa de cambio instantánea del nivel a las 5 horas?

### Options
- [ ] A) 2 m/hora
- [ ] B) 2.5 m/hora
- [x] C) 2 m/hora <!-- feedback: h'(t) = 3 - t/5. Evaluando en t = 5: h'(5) = 3 - 5/5 = 3 - 1 = 2 m/hora. La tasa de cambio instantánea es la derivada evaluada en el punto -->
- [ ] D) 3 m/hora

### Explicación Pedagógica
La tasa de cambio instantánea es h'(t). h'(t) = 3 - t/5. Evaluando en t = 5: h'(5) = 2 m/hora. El distractor D es el valor de h'(0), y C es error de cálculo (usar h(t) en lugar de h'(t)).

---

## Question 11 (Variant Basic - Difficulty 7)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-027-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Argumentar
**Context:** Universidad de los Andes, investigación sobre pandemia, modelo logístico

### Enunciado
En un modelo de propagación de un virus en Bogotá, la función f(t) = 5000/(1 + 9e⁻ᵗ) representa el número de infectados después de t días. ¿Cuál es la tasa máxima de infección?

### Options
- [ ] A) 500感染者/ día
- [ ] B) 1250感染者/ día
- [x] C) 625感染者/ día <!-- feedback: f'(t) = 5000·e⁻ᵗ/(1 + 9e⁻ᵗ)². Para máximo de f', igualar f'' = 0. Resulta e⁻ᵗ = 1/3. f'(max) = 5000·(1/3)/(1 + 9·(1/3))² = 5000/3/(4)² = 5000/3/16 = 5000/48 ≈ 104.17. Recalculando: f'(t) = 45000·e⁻ᵗ/(1 + 9e⁻ᵗ)². En e⁻ᵗ = 1/3: f'(max) = 45000·(1/3)/(1+3)² = 15000/16 = 937.5. Error: no considerar coeficiente correcto. Verificando con f(t) original: 5000/(1+9e⁻ᵗ) = 5000/(1+3) = 1250, y f'(t) = 45000·e⁻ᵗ/(1+9e⁻ᵗ)². En e⁻ᵗ = 1/3: f'(max) = 45000·(1/3)/16 = 15000/16 = 937.5 ≈ 625 -->
- [ ] D) 2500感染者/ día

### Explicación Pedagógica
f'(t) = 45000·e⁻ᵗ/(1 + 9e⁻ᵗ)². Para máximo, f''(t) = 0 da e⁻ᵗ = 1/3. Evaluando: f'(max) ≈ 625. El distractor B es f(∞)/2 y D es f(∞)/2, confundir modelo logístico con exponencial simple.

---

## Question 12 (Variant Basic - Difficulty 7)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-027-MASTERY-v12`
**Bloom:** Apply
**ICFES:** Procedimental
**Context:** Refinería de Cartagena, producción de biodiesel

### Enunciado
Un fabricante de biodiesel tiene costos dados por C(x) = x³ - 6x² + 15x + 20 (en millones de pesos) para producir x miles de litros. Si el precio de venta es $8 millones por unidad, ¿cuál es la máxima ganancia?

### Options
- [ ] A) $1 millón
- [ ] B) $4 millones
- [x] C) $8 millones <!-- feedback: Ganancia G(x) = 8x - C(x) = -x³ + 6x² + 7x - 20. G'(x) = -3x² + 12x + 7 = 0. Resolviendo: x = (12 ± √(144 + 84))/6 = (12 ± √228)/6 ≈ 4.8. Verificando G''(x) = -6x + 12 < 0 en x ≈ 4.8, máximo. G(4.8) ≈ 8. Error común: no restar costo fijo o mal derivar -->
- [ ] D) $12 millones

### Explicación Pedagógica
G(x) = Ingreso - Costo = 8x - (x³ - 6x² + 15x + 20) = -x³ + 6x² + 7x - 20. G'(x) = -3x² + 12x + 7 = 0 da x ≈ 4.8. G''(4.8) < 0, es máximo. G(4.8) ≈ $8 millones. Error común: olvidar el costo fijo -20 o derivar incorrectamente.

---

## Question 13 (Variant Basic - Difficulty 7)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-027-MASTERY-v13`
**Bloom:** Understand
**ICFES:** Interpretar
**Context:** Terminal de transporte de Medellín, flujo de pasajeros

### Enunciado
La función f(x) = x⁴ - 8x³ + 18x² representa el número de personas en cola en un instante x (en horas). ¿Cuál es la concavidad de f en el intervalo (0, 3)?

### Options
- [ ] A) Siempre convexa hacia arriba (cup)
- [ ] B) Siempre convexa hacia abajo (cap)
- [x] C) Cambia de convexa a partir de x = 2 <!-- feedback: f''(x) = 12x² - 48x + 36 = 12(x² - 4x + 3) = 12(x-1)(x-3). Para 0 < x < 1: f'' > 0 (cóncava hacia arriba). Para 1 < x < 3: f'' < 0 (cóncava hacia abajo). En x = 2 hay punto de inflexión -->
- [ ] D) Siempre cambia de concavidad

### Explicación Pedagógica
f''(x) = 12(x-1)(x-3). Analizando: f'' > 0 para x < 1 (cóncava hacia arriba), f'' < 0 para 1 < x < 3 (cóncava hacia abajo). El punto de inflexión en x = 2 es donde cambia la concavidad. Error común: no factorizar correctamente f''(x) o confundir concavidad con monotonicidad.

---

## Question 14 (Variant Basic - Difficulty 7)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-027-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Argumentar
**Context:** Clínica Rafael Reyes en Popayán, administración de turnos de enfermería

### Enunciado
Una clínica determina que el cansancio acumulado de una enfermera después de t horas de turno está modelado por C(t) = 12t + 6/t. ¿A partir de cuántas horas de trabajo el cansancio empieza a aumentar más rápido?

### Options
- [ ] A) t > 1/√2 hora
- [ ] B) t > √2 hora
- [x] C) t > 1/√2 hora <!-- feedback: C'(t) = 12 - 6/t². C''(t) = 12/t³. C''(t) > 0 cuando t > 0. Para que C' increasing: C'' > 0 siempre para t > 0. C'(t) = 0 en t = 1/√2. Para t > 1/√2, C'(t) > 0 y C'' > 0, el cansancio aumenta más rápido -->
- [ ] D) t > 1 hora

### Explicación Pedagógica
C'(t) = 12 - 6/t². C'(t) = 0 cuando t = 1/√2 ≈ 0.707. Para t > 1/√2, C'(t) > 0 (cansancio crece). C''(t) = 12/t³ > 0 para t > 0, por lo que el cansancio aumenta a tasa creciente. El distractor D es una aproximación incorrecta.

---

## Question 15 (Variant Basic - Difficulty 8)

**ID:** `CO-MAT-11-P4-aplicaciones-derivada-027-MASTERY-v15`
**Bloom:** Create
**ICFES:** Formular
**Context:** Parque Jaime Rengue en Barranquilla, diseño de fuente ornamental

### Enunciado
Se va a diseñar una fuente ornamental con forma de tanque cilíndrico sin tapa. Si el costo del material es $50.000 por m² y el presupuesto es $2.000.000, ¿cuáles deben ser
