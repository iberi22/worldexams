---
id: "CO-MAT-11-P3-sucesiones- series-023-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "sucesiones- series"
periodo: 3
protocol_version: "5.1"
bundle_size: 20
bundle_index: 23
alignment: "ICFES Saber 11 2026 + DBA (Derechos Básicos de Aprendizaje) MEN 2026"

# METADATA DE GENERACIÓN
generation:
  agent: "kimi-k2.5"
  model: "opencode-go/kimi-k2.5"
  timestamp: "2026-04-15T07:01:17.577Z"
  prompt_version: "v1"
  context_used: true
  research_summary: "Based on ICFES 2025 framework + MEN DBA"

# ESTADO DE CALIDAD
quality_status: "UNREVISED"
generation_status: "RAW"
needs_human_review: true

# CURACIÓN
curation:
  human_review_required: true
  human_reviewed: false
  agent_curated: false
  community_curated: false
  community_curation_count: 0

# LICENCIA
license: "CC BY-NC-SA 4.0"
open_source: false
---

## Question 1 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v1`
**Bloom:** Understand
**ICFES:** Formulación - Plantear modelos matemáticos
**Context:** Crecimiento poblacional de Medellín 2025

### Enunciado
En un programa de reforestación en Antioquia, el equipo planta 50 árboles en la primera semana y cada semana subsequent weeks plant increases by 15 trees more than the previous week. How many trees will be planted in week 7?

### Options
- [ ] A) 120 trees
- [x] B) 140 trees <!-- feedback: Correct because it's an arithmetic sequence with a1=50, d=15. Week 7: a7 = 50 + (7-1)×15 = 50 + 90 = 140. -->
- [ ] C) 145 trees
- [ ] D) 150 trees <!-- feedback: Incorrect because it miscalculates the number of terms (uses 7×15 instead of 6×15) -->

### Explicación Pedagógica
Esta es una sucesión aritmética donde el primer término a₁ = 50 y la diferencia común d = 15. Para encontrar el término n-ésimo usamos aₙ = a₁ + (n-1)×d. En la semana 7: a₇ = 50 + 6×15 = 140. El error común es no restar 1 al número de términos.

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Interpretación - Leer y comprender información matemática
**Context:** Festival de Flores en Medellín

### Enunciado
Una floristería de Bogotá decorará 300 exposiciones para las fiestas de fin de año. Si colocan 2 flores en la primera exposición, 4 en la segunda, 8 en la tercera, y así sucesivamente, ¿cuántas flores necesitarán para la exposición número 8?

### Options
- [ ] A) 128 flores
- [x] B) 256 flores <!-- feedback: Correct because it's a geometric sequence with a1=2, r=2. a8 = 2×2^(8-1) = 2×2^7 = 2×128 = 256. -->
- [ ] C) 512 flores
- [ ] D) 1024 flores <!-- feedback: Incorrect because it uses exponent 10 instead of 7 -->

### Explicación Pedagógica
Esta es una sucesión geométrica donde cada término se multiplica por 2. Con a₁ = 2 y razón r = 2, el término n-ésimo es aₙ = a₁×r^(n-1). Para n=8: a₈ = 2×2⁷ = 2×128 = 256. El error común es usar el exponente n en lugar de n-1.

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Validación - Verificar procedimientos y resultados
**Context:** Estadio El Campín Bogotá

### Enunciado
En un estadio de fútbol en Bogotá, la primera fila tiene 20 asientos, la segunda 25, la tercera 30, y así sucesivamente. Si el estadio tiene 30 filas, ¿cuántos asientos hay en la última fila?

### Options
- [ ] A) 150 asientos
- [ ] B) 165 asientos
- [ ] C) 170 asientos
- [x] D) 165 asientos <!-- feedback: Correct: a30 = 20 + (30-1)×5 = 20 + 145 = 165 -->

### Explicación Pedagógica
Sucesión aritmética con a₁ = 20 y d = 5. La fila n tiene aₙ = 20 + (n-1)×5. Para la fila 30: a₃₀ = 20 + 29×5 = 20 + 145 = 165. El error común es sumar 5×30 directamente sin restar 1.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Interpretación - Leer y comprender información matemática
**Context:** Crecimiento de usuarios de TransMilenio

### Enunciado
Una aplicación de transporte en Cali registra 1 usuario el primer día, 1 el segundo, 2 el tercero, 3 el cuarto, 5 el quinto, 8 el sexto. Siguiendo este patrón, ¿cuántos usuarios se esperan el día 10?

### Options
- [ ] A) 34 usuarios
- [ ] B) 45 usuarios
- [x] C) 55 usuarios
- [ ] D) 89 usuarios

### Explicación Pedagógica
Esta es la sucesión de Fibonacci donde cada término es la suma de los dos anteriores. Continuando: día 7=13, día 8=21, día 9=34, día 10=55. El error común es confundir qué términos se suman o perder la secuencia.

---

## Question 5 (Variant Medium - Difficulty 5)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación - Plantear modelos matemáticos
**Context:** Aeropuerto El Dorado Bogotá

### Enunciado
El Aeropuerto El Dorado recibe 100 vuelos en enero, 105 en febrero, y el número de vuelos aumenta en 5 cada mes. ¿Cuál es el número total de vuelos después de 12 meses?

### Options
- [ ] A) 1,260 vuelos
- [ ] B) 1,320 vuelos
- [ ] C) 1,460 vuelos
- [x] D) 1,530 vuelos

### Explicación Pedagógica
Para la suma de una sucesión aritmética finita usamos Sₙ = n/2 × (a₁ + aₙ) o Sₙ = n/2 × (2a₁ + (n-1)d). Con a₁=100, d=5, n=12: a₁₂ = 100 + 11×5 = 155. S₁₂ = 12/2 × (100 + 155) = 6 × 255 = 1,530 vuelos. El error común es no incluir todos los meses o usar el mes incorrecto como aₙ.

---

## Question 6 (Variant Medium - Difficulty 5)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Validación - Verificar procedimientos y resultados
**Context:** Producción de café en Huila

### Enunciado
Una finca cafetera produce 2,000 kg de café en el primer año y la producción aumenta un 10% cada año. ¿Cuál es la producción total después de 5 años?

### Options
- [ ] A) 11,000 kg
- [x] B) 12,210.2 kg
- [ ] C) 13,000 kg
- [ ] D) 10,000 kg

### Explicación Pedagógica
Es una serie geométrica con a₁ = 2000 y r = 1.1. La suma de n términos es Sₙ = a₁×(rⁿ - 1)/(r - 1). Para 5 años: S₅ = 2000×(1.1⁵ - 1)/(0.1) ≈ 12,210.2 kg. El error común es no usar la fórmula correcta o confundir crecimiento lineal con exponencial.

---

## Question 7 (Variant Medium - Difficulty 6)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Formulación - Plantear modelos matemáticos
**Context:** Metro de Medellín

### Enunciado
Un tren del Metro de Medellín parte con 50 pasajeros. En cada estación suben 12 pasajeros y bajan 8. Después de 15 estaciones, ¿cuántos pasajeros hay en el tren?

### Options
- [ ] A) 106 pasajeros
- [ ] B) 130 pasajeros
- [x] C) 110 pasajeros
- [ ] D) 120 pasajeros

### Explicación Pedagógica
La ganancia neta por estación es 12 - 8 = 4 pasajeros. Después de 15 estaciones: 50 + 15×4 = 110 pasajeros. El error común es no incluir los pasajeros iniciales o restar 1 de las estaciones incorrectamente.

---

## Question 8 (Variant Medium - Difficulty 6)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v8`
**Bloom:** Understand
**ICFES:** Interpretación - Leer y comprender información matemática
**Context:** Laguna de Fúquene Cundinamarca

### Enunciado
El nivel de agua de la Laguna de Fúquene baja 3 cm por semana durante la temporada seca. Si el nivel inicial es de 15 metros, ¿cuántas semanas faltan para que el nivel llegue a 0 metros?

### Options
- [ ] A) 400 semanas
- [ ] B) 450 semanas
- [x] C) 500 semanas <!-- feedback: Correct: 15m = 1500 cm. 1500 ÷ 3 = 500 semanas -->
- [ ] D) 250 semanas

### Explicación Pedagógica
Convertimos 15 metros a 1500 cm. Cada semana bajan 3 cm. El número de semanas es 1500 ÷ 3 = 500. El error común es no convertir unidades o confundir metros con centímetros.

---

## Question 9 (Variant Medium - Difficulty 6)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Validación - Verificar procedimientos y resultados
**Context:** Festival Vallenato en Valledupar

### Enunciado
Los premios de un torneo de canción Vallenata forman una sucesión geométrica: el primer premio es de $2,000,000 COP y cada premio siguiente es el doble del anterior. ¿Cuál es el premio del 7mo lugar?

### Options
- [ ] A) $64,000,000 COP
- [ ] B) $128,000,000 COP
- [x] C) $128,000,000 COP <!-- feedback: Correct: a7 = 2,000,000 × 2^(7-1) = 2,000,000 × 64 = $128,000,000 -->
- [ ] D) $256,000,000 COP

### Explicación Pedagógica
Sucesión geométrica con a₁ = 2,000,000 y r = 2. El término n-ésimo es aₙ = a₁×r^(n-1). Para n=7: a₇ = 2,000,000×2⁶ = 2,000,000×64 = 128,000,000. El error común es usar r^n en lugar de r^(n-1).

---

## Question 10 (Variant Medium - Difficulty 6)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Formulación - Plantear modelos matemáticos
**Context:** exportacion de flores de Colombia

### Enunciado
Una empresa exportadora de flores de Colombia envía 5,000 cajas en el primer mes y aumenta sus envíos en un 8% mensual. ¿Cuántas cajas enviará en el mes 10?

### Options
- [ ] A) 9,000 cajas
- [x] B) 10,794.62 cajas
- [ ] C) 9,500 cajas
- [ ] D) 8,500 cajas

### Explicación Pedagógica
Sucesión geométrica con a₁ = 5000 y r = 1.08. El mes n: aₙ = 5000×1.08^(n-1). Para n=10: a₁₀ = 5000×1.08⁹ ≈ 5000×2.1589 ≈ 10,794.62. El error común es usar crecimiento lineal (5000 + 0.08×5000×9) en lugar de exponencial.

---

## Question 11 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Validación - Verificar procedimientos y resultados
**Context:** Estadio El Campín Bogotá

### Enunciado
Un estadio de fútbol en Bogotá tiene 100 asientos en la primera fila, 105 en la segunda, 110 en la tercera, y así sucesivamente. ¿Cuántos asientos hay en las primeras 20 filas?

### Options
- [ ] A) 1,900 asientos
- [ ] B) 2,000 asientos
- [x] C) 2,950 asientos
- [ ] D) 3,050 asientos

### Explicación Pedagógica
Sucesión aritmética con a₁ = 100 y d = 5. El término 20: a₂₀ = 100 + 19×5 = 195. Suma: S₂₀ = 20/2 × (100 + 195) = 10 × 295 = 2,950 asientos. El error común es no usar el exponente n-1 o confundir la fórmula de la suma.

---

## Question 12 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Formulación - Plantear modelos matemáticos
**Context:** Refinería de Cartagena

### Enunciado
Una refinería en Cartagena produce 1,000 barriles de petróleo el primer día, 1,100 el segundo, 1,210 el tercero, y así duplicando el incremento cada día. Si el patrón continúa, ¿cuál es la producción del día 6?

### Options
- [ ] A) 1,610.51 barriles
- [ ] B) 2,100 barriles
- [ ] C) 1,771.56 barriles
- [x] D) 1,500.51 barriles

### Explicación Pedagógica
El incremento inicial es 100 y crece un 10% cada día (serie geométrica). El incremento acumulado hasta el día 6 es 100×(1.1⁵ - 1)/(1.1 - 1) ≈ 610.51. Producción día 6 = 1000 + 610.51 = 1610.51. El error común es confundir el incremento con la producción total o no usar la fórmula correcta de serie geométrica.

---

## Question 13 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Interpretación - Leer y comprender información matemática
**Context:** Parque Tayrona Santa Marta

### Enunciado
Los senderos del Parque Nacional Tayrona tienen 1 camino en la primera sección, 3 en la segunda, 6 en la tercera, 10 en la cuarta, y así sucesivamente. ¿Cuántos caminos habrá en la sección 15?

### Options
- [ ] A) 105 caminos
- [x] B) 120 caminos <!-- feedback: Correct: This is triangular numbers: T_n = n(n+1)/2. T_15 = 15×16/2 = 120 -->
- [ ] C) 150 caminos
- [ ] D) 225 caminos

### Explicación Pedagógica
Esta es una sucesión de números triangulares donde Tₙ = n(n+1)/2. Para n=15: T₁₅ = 15×16/2 = 120. El error común es confundir con otros patrones numéricos o no reconocer los números triangulares.

---

## Question 14 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v14`
**Bloom:** Evaluate
**ICFES:** Validación - Verificar procedimientos y resultados
**Context:** Cerrejón Guajira

### Enunciado
Una mina de carbón en La Guajira extrae 500 toneladas el primer día, 480 el segundo, 460 el tercer día, y continúa restando 20 toneladas cada día. ¿Cuántos días tardará en extraer 15,000 toneladas en total?

### Options
- [ ] A) 20 días
- [ ] B) 25 días
- [x] C) 21 días
- [ ] D) 30 días

### Explicación Pedagógica
La suma de términos es Sₙ = n/2 × (2a₁ + (n-1)d) = 15000. Resolviendo n² - 51n + 1500 = 0, obtenemos n = 30 o n = 21. Descartamos n=30 porque el término 30 sería negativo (500 - 29×20 = -80). Respuesta: 21 días.

---

## Question 15 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v15`
**Bloom:** Apply
**ICFES:** Formulación - Plantear modelos matemáticos
**Context:** Universidad Nacional de Colombia

### Enunciado
Un modelo de propagación de virus en el campus de la Universidad Nacional de Colombia indica que en el tercer salón hay 2 personas infectadas, en el cuarto hay 6, en el quinto hay 18, y en el sexto hay 54. Si este patrón continúa, ¿cuántas personas habrá infectadas en el séptimo salón?

### Options
- [ ] A) 108 personas
- [ ] B) 162 personas
- [x] C) 162 personas
- [ ] D) 216 personas

### Explicación Pedagógica
Sucesión geométrica con a₃ = 2, r = 3. El término 7: a₇ = a₃×r^(7-3) = 2×3⁴ = 2×81 = 162. El error común es calcular a₇ como 2×3⁶ = 729 o no ajustar correctamente el exponente restando 3 en lugar de 4.

---

## Question 16 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Validación - Verificar procedimientos y resultados
**Context:** Ahorro familiar en Bogotá

### Enunciado
Un padre da a su hija $10,000 COP de mesada. Cada mes, la hija decide guardar $200 más que el mes anterior. Si continúa este patrón por 12 meses, ¿cuánto habrá ahorrado en total?

### Options
- [ ] A) $27,600 COP
- [ ] B) $28,800 COP
- [x] C) $133,200 COP
- [ ] D) $145,200 COP

### Explicación Pedagógica
Cada mes ahorra: 10000, 10200, 10400, ... (sucesión aritmética con d=200). La suma es S = 12/2 × (2×10000 + 11×200) = 133,200 COP. El error común es no incluir todos los meses o sumar incorrectamente la diferencia.

---

## Question 17 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Interpretación - Leer y comprender información matemática
**Context:** Árbol de guanábana en el Valle del Cauca

### Enunciado
Un árbol de guanábana en el Valle del Cauca tiene 2 hojas en la primera rama, 4 en la segunda, 8 en la tercera, 16 en la cuarta, y así sucesivamente. ¿Cuántas hojas tendrá en la séptima rama?

### Options
- [ ] A) 64 hojas
- [ ] B) 96 hojas
- [x] C) 128 hojas
- [ ] D) 256 hojas

### Explicación Pedagógica
Sucesión geométrica con a₁ = 2 y r = 2. El término 7: a₇ = 2×2⁶ = 128. El error común es usar 2⁷ = 128 en lugar de 2⁶ o confundir con progresión aritmética.

---

## Question 18 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v18`
**Bloom:** Create
**ICFES:** Formulación - Plantear modelos matemáticos
**Context:** Inversión en finca raíz en Bogotá

### Enunciado
Un apartamento en Bogotá valued at $100,000 USD increase su valor 5% cada año. ¿Cuál será el valor aproximado después de 10 años?

### Options
- [ ] A) $150,000 USD
- [ ] B) $155,000 USD
- [x] C) $162,889 USD
- [ ] D) $175,000 USD

### Explicación Pedagógica
Sucesión geométrica con a₁ = 100,000 y r = 1.05. El valor después de n años es aₙ = a₁×rⁿ. Para n=10: a₁₀ = 100,000×1.05¹⁰ ≈ 162,889 USD. El error común es usar crecimiento lineal (100,000 + 0.05×100,000×10 = 150,000) en lugar de exponencial.

---

## Question 19 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Validación - Verificar procedimientos y resultados
**Context:** Inversión en fiducia en Colombia

### Enunciado
Una inversión en fiducia ofrece pagar $1 el primer año, $2 el segundo, $4 el tercero, y así duplicando cada año. ¿Cuántos años se necesitan para que el pago total supere los $100?

### Options
- [ ] A) 6 años
- [x] B) 7 años
- [ ] C) 8 años
- [ ] D) 9 años

### Explicación Pedagógica
La suma de n términos de una serie geométrica con a₁=1, r=2 es Sₙ = 2ⁿ - 1. Necesitamos 2ⁿ - 1 > 100, entonces 2ⁿ > 101. Como 2⁶ = 64 < 101 y 2⁷ = 128 > 101, la respuesta es 7 años (S₇ = 127 > 100). El error común es confundir n con Sₙ.

---

## Question 20 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v20`
**Bloom:** Create
**ICFES:** Formulación - Plantear modelos matemáticos
**Context:** Cría de trucha en Huila

### Enunciado
Un criadero de truchas en Huila comienza con 100 alevines. La población crece un 5% cada mes, pero 3 truchas mueren por enfermedad cada mes. ¿Cuántas truchas habrá aproximadamente después de 12 meses?

### Options
- [ ] A) 100 truchas
- [ ] B) 150 truchas
- [x] C) 162 truchas
- [ ] D) 180 truchas

### Explicación Pedagógica
El modelo correcto es mixto: crecimiento exponencial (100×1.05¹²) menos pérdida lineal (3×12). Después de 12 meses: P ≈ 100×1.7958 - 36 ≈ 179.58 - 36 ≈ 144 truchas. El error común es usar solo exponencial (179) o solo lineal (100 - 36 = 64) sin combinar los efectos correctamente.
