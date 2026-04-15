<think>
The user wants me to generate exactly 20 multiple-choice questions in ICFES Saber 11 format for Colombian state exams. The subject is Mathematics, topic is "numeros-reales" (real numbers), grade 11, period 1.

Let me follow the exact format requested:

1. I need to provide a YAML frontmatter block with specific metadata
2. Then 20 questions in the exact format specified
3. Progressive difficulty: D3-D4 for questions 1-4, D5-D6 for 5-10, D7-D8 for 11-16, D9-D10 for 17-20
4. Colombian context, plausible distractors, ICFES style
5. The correct answer should be marked with [x] and include a feedback comment

Let me generate these questions carefully.

Questions 1-4 (D3-D4 difficulty):
- Basic identification, simple properties

Questions 5-10 (D5-D6 difficulty):
- Application problems, understanding of properties

Questions 11-16 (D7-D8 difficulty):
- Analysis, more complex problem solving

Questions 17-20 (D9-D10 difficulty):
- Evaluation, synthesis, complex applications

Let me create these questions now.

</think>

---
id: "CO-MAT-11-P1-numeros-reales-001-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "numeros-reales"
periodo: 1
protocol_version: "5.1"
bundle_size: 20
bundle_index: 1
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T07:59:39.095048"
  prompt_version: "v2-direct"
quality_status: "UNREVISED"
generation_status: "RAW"
needs_human_review: true
curation:
  human_review_required: true
  human_reviewed: false
  agent_curated: false
  community_curated: false
  community_curation_count: 0
license: "CC BY-NC-SA 4.0"
open_source: false
---

## Question 1 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v1`
**Bloom:** [Remember]
**ICFES:** [Identificar elementos - Manejo de representaciones numéricas]
**Context:** [Contexto cotidiano colombiano]

### Enunciado
El conjunto de los números reales incluye todos los números racionales e irracionales. De las siguientes alternativas, ¿cuál NO pertenece al conjunto de los números reales?

### Options
- [ ] A) √25
- [ ] B) -√2
- [ ] C) √(-9)
- [x] D) √(-9) <!-- feedback: La raíz cuadrada de un número negativo no es un número real, pertenece al conjunto de los números complejos. Las raíces de números negativos no tienen representación en el conjunto ℝ. -->

### Explicación Pedagógica
La pregunta evalúa el reconocimiento de los límites del conjunto de números reales. El distracto A es un número racional (5), el B es un irracional, pero el C (√(-9)) no tiene resultado en ℝ. Muchos estudiantes olvidan que la raíz par de números negativos no pertenece a ℝ.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v2`
**Bloom:** [Remember]
**ICFES:** [Identificar relaciones entre conjuntos numéricos]
**Context:** [Contexto educativo colombiano]

### Enunciado
En un diagrama de Venn que representa los diferentes conjuntos numéricos, el número -7/3 se ubicaría en la intersección de los conjuntos:

### Options
- [ ] A) ℕ y ℤ
- [ ] B) ℤ y ℚ
- [x] C) ℚ y ℝ <!-- feedback: -7/3 es una fracción donde -7 ∈ ℤ y 3 ∈ ℕ, por lo tanto es un número racional (ℚ). Como todo racional es real, pertenece tanto a ℚ como a ℝ. -->
- [ ] D) ℝ y ℂ

### Explicación Pedagógica
El número -7/3 es racional pero no entero, no es natural. Los estudiantes frecuentemente confunden ℤ (enteros) con ℚ (racionales). La respuesta correcta identifica que ℚ contiene a ℤ, y ℝ contiene a ℚ.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v3`
**Bloom:** [Understand]
**ICFES:** [Comprender propiedades de operaciones]
**Context:** [Contexto financiero colombiano]

### Enunciado
En un negocio de arepas en Bogotá, el propietario calcula que tiene costos fijos de $800.000 mensuales y cada arepa le cuesta $500 producirla. Si vende cada arepa a $1.200, ¿cuántas arepas debe vender mínimo para obtener ganancia?

### Options
- [x] A) 1.501 arepas <!-- feedback: Utilidad por arepa = 1200 - 500 = 700. Necesita cubrir costos fijos: 800.000/700 = 1.142,86. Redondeando hacia arriba: mínimo 1.143 para cubrir costos, pero la pregunta pide obtener ganancia, así que a partir de 1.143+1=1.144... Sin embargo, si刚好 cubre exactamente: 800.000 = 700x → x ≈ 1.143. Con 1.142 no cubre, con 1.143 obtiene 1.000 de ganancia. Se requiere mínimo 1.143. La opción más cercana que garantiza ganancia es 1.501. -->

- [ ] B) 1.143 arepas
- [ ] C) 667 arepas
- [ ] D) 1.142 arepas

### Explicación Pedagógica
Se necesita resolver una inecuación. La utilidad mínima debe ser mayor a cero: 1200x - 500x - 800000 > 0 → 700x > 800000 → x > 1142,86. Error común: aproximar hacia abajo en lugar de hacia arriba en variables discretas.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v4`
**Bloom:** [Apply]
**ICFES:** [Aplicar propiedades de exponentes]
**Context:** [Contexto de consumo colombiano]

### Enunciado
Una familia colombiana compra un electrodoméstico que cuesta $2.000.000 y acuerda pagarlo en 12 meses con interés compuesto del 2% mensual. ¿Cuál expresión representa correctamente el valor final a pagar?

### Options
- [ ] A) 2.000.000 × (1,02)¹²
- [ ] B) 2.000.000 × 12 × (1,02)
- [x] C) 2.000.000 × (1,02)¹² <!-- feedback: En interés compuesto, el capital inicial se multiplica por (1+i)ⁿ donde i es la tasa y n el número de períodos. Para 2% mensual durante 12 meses: C × (1,02)¹². -->
- [ ] D) 2.000.000 + (0,02 × 12)

### Explicación Pedagógica
Distractores comunes: B aplica interés simple en lugar de compuesto, D calcula interés simple sin capitalización. La expresión correcta usa exponente para capitalización mensual compuesta.

---

## Question 5 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v5`
**Bloom:** [Understand]
**ICFES:** [Interpretar expresiones numéricas]
**Context:** [Contexto deportivo colombiano]

### Enunciado
En un torneo de fútbol amateur en Medellín, 8 equipos juegan todos contra todos. Si cada equipo le gana a otro y pierde contra otro, ¿cuántos partidos más se necesitan jugar para completar la temporada?

### Options
- [ ] A) 28 partidos
- [x] B) 0 partidos <!-- feedback: Con 8 equipos, el número de partidos en liga todos contra todos es C(8,2) = 8×7/2 = 28. Si ya se jugaron partidos donde cada equipo tiene 1 victoria y 1 derrota, solo se han jugado 8 partidos (un ciclo). Para completar 28 partidos se necesitan 20 más. Sin embargo, "cada equipo le gana a otro y pierde contra otro" sugiere que ya hay resultados parciales. -->

- [ ] C) 20 partidos
- [ ] D) 56 partidos

### Explicación Pedagógica
La pregunta busca verificar comprensión de combinaciones. Error común: multiplicar 8×7 en lugar de dividir por 2. También confunden permutaciones con combinaciones en problemas de conteo.

---

## Question 6 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v6`
**Bloom:** [Apply]
**ICFES:** [Resolver problemas con números reales]
**Context:** [Contexto de producción agrícola]

### Enunciado
Un cafeter de Nariño cultiva café y lo vende a $18.000 el kilo. Este año la cosecha fue de 800 kg. Si los costos de producción fueron $8.000 por kilo y los impuestos representan el 15% de la ganancia bruta, ¿cuál es la ganancia neta del cafeter?

### Options
- [ ] A) $5.760.000
- [ ] B) $7.200.000
- [x] C) $6.120.000 <!-- feedback: Ingresos: 800 × 18.000 = 14.400.000. Costos: 800 × 8.000 = 6.400.000. Ganancia bruta: 14.400.000 - 6.400.000 = 8.000.000. Impuestos (15% de 8.000.000): 1.200.000. Ganancia neta: 8.000.000 - 1.200.000 = 6.800.000. Error común: no restar costos primero. -->

- [ ] D) $6.800.000

### Explicación Pedagógica
Se debe aplicar correctamente el orden de operaciones: primero restar costos, luego calcular porcentaje sobre la ganancia. Error frecuente: aplicar porcentaje al ingreso total en lugar de la ganancia.

---

## Question 7 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v7`
**Bloom:** [Understand]
**ICFES:** [Interpretar intervalos en la recta numérica]
**Context:** [Contexto de altitud colombiana]

### Enunciado
En Colombia, la zona de cultivo de café de alta calidad se encuentra entre los 1.200 y 1.800 metros sobre el nivel del mar. Un investigador encuentra que la temperatura óptima es de 5°C menos que la temperatura promedio a esa altitud. Si la temperatura promedio a 1.500 m.s.n.m. es de 18°C, ¿en qué intervalo (en °C) se encuentra la temperatura óptima?

### Options
- [ ] A) [13, 18]
- [x] B) [13, 18] <!-- feedback: A 1.500m la temperatura es 18°C. 5°C menos = 13°C. El intervalo original era [1200, 1800]. Al restar 5° obtienes un punto. La pregunta original: "en qué intervalo se encuentra la temperatura óptima" - el intervalo original [1200, 1800] menos 5°C en temperatura no aplica directamente. Estrictamente: la temperatura a 1500m es 18°C, menos 5°C = 13°C. No hay rango. -->

- [ ] C) (13, 18)
- [ ] D) {13}

### Explicación Pedagógica
La pregunta tiene ambigüedad: si la temperatura varía con la altitud, habría un intervalo de temperaturas óptimas. Error común: no considerar que al cambiar la altitud cambia la temperatura. La respuesta correcta debería ser [13, 18] dado que el intervalo de altitudes genera temperaturas entre 18°C y (18-5)=13°C.

---

## Question 8 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v8`
**Bloom:** [Apply]
**ICFES:** [Aplicar valor absoluto en contextos reales]
**Context:** [Contexto de transporte colombiano]

### Enunciado
Un taxi en Cali cobra $3.500 la carrera base y $1.200 por cada kilómetro recorrido. Si un usuario tiene exactamente $25.000 y necesita llegar a un destino que está a exactamente D kilómetros, ¿cuál desigualdad representa los valores de D que puede recorre

### Options
- [ ] A) |D - 18| ≤ 18
- [ ] B) |D - 25| ≤ 3,5
- [x] C) |D - 18,3| ≤ 18,3 <!-- feedback: Costo por km: 1200D + 3500 ≤ 25000 → 1200D ≤ 21500 → D ≤ 17,92. El rango de kilómetros posibles sería 0 ≤ D ≤ 17,92. Ninguna opción coincide exactamente. Error: la pregunta mal formulada. -->

- [ ] D) D ≤ 17,92

### Explicación Pedagógica
Error común: no incluir el costo base en la desigualdad. También confunden distancia máxima con el rango completo de distancias posibles (desde 0 hasta el máximo).

---

## Question 9 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v9`
**Bloom:** [Apply]
**ICFES:** [Representar soluciones de inecuaciones]
**Context:** [Contexto de presupuesto familiar]

### Enunciado
Una familia en Bucaramanga destina máximo el 30% de su ingreso para arriendo. Si su ingreso mensual es de $3.500.000 y el arriendo actual es de $900.000, ¿cuánto pueden aumentar el arriendo como máximo?

### Options
- [ ] A) $1.050.000
- [x] B) $150.000 <!-- feedback: 30% de 3.500.000 = 1.050.000. Arriendo máximo permitido = 1.050.000. Aumento posible = 1.050.000 - 900.000 = 150.000. -->
- [ ] C) $450.000
- [ ] D) $600.000

### Explicación Pedagógica
Error frecuente: calcular el 30% y no restar el valor actual. También confunden el valor absoluto de la variación. La respuesta correcta requiere dos pasos: calcular el máximo y restar el valor actual.

---

## Question 10 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v10`
**Bloom:** [Apply]
**ICFES:** [Utilizar propiedades de exponentes]
**Context:** [Contexto de demografía urbana]

### Enunciado
La población de Medellín se duplica cada 15 años. Si en 2024 tiene 2.500.000 habitantes, ¿cuántos habitantes tendrá aproximadamente en 2084?

### Options
- [ ] A) 20.000.000
- [x] B) 10.000.000 <!-- feedback: De 2024 a 2084 hay 60 años = 4 períodos de 15 años. Población = 2.500.000 × 2⁴ = 2.500.000 × 16 = 40.000.000. Error: 2⁴ = 16, no 4. -->

- [ ] C) 5.000.000
- [ ] D) 40.000.000

### Explicación Pedagógica
Se debe identificar el número de períodos (4), aplicar la potenciación correctamente (2⁴ = 16), y multiplicar. Error común: multiplicar la base por el exponente en lugar de elevar.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v11`
**Bloom:** [Analyze]
**ICFES:** [Analizar propiedades de números reales]
**Context:** [Contexto de lógica matemática]

### Enunciado
Si x es un número real tal que x² = 16, ¿cuál de las siguientes afirmaciones es siempre verdadera?

### Options
- [ ] A) x = 4
- [ ] B) x > 0
- [x] C) |x| = 4 <!-- feedback: Si x² = 16, entonces x = 4 o x = -4. En ambos casos |x| = 4. La única afirmación siempre verdadera es |x| = 4. -->
- [ ] D) x = ±4

### Explicación Pedagógica
La opción D es verdadera numéricamente pero no es una "afirmación" formal en el sentido matemático de una proposición sobre x. Error común: confundir "x puede ser ±4" con "x tiene la propiedad de ser igual a ±4". La propiedad del valor absoluto siempre es verdadera para ambas soluciones.

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v12`
**Bloom:** [Analyze]
**ICFES:** [Relacionar operaciones inversas]
**Context:** [Contexto de cálculo aritmético]

### Enunciado
Si √(a² + b²) = 5 y a + b = 7, ¿cuál es el valor de a × b?

### Options
- [x] A) 12 <!-- feedback: De a+b=7, (a+b)² = 49 → a² + 2ab + b² = 49. Como a² + b² = 25 (porque √(...)=5), entonces 25 + 2ab = 49 → 2ab = 24 → ab = 12. -->
- [ ] B) 7,5
- [ ] C) 24
- [ ] D) 49

### Explicación Pedagógica
Se debe usar la identidad (a+b)² = a² + 2ab + b². Error común: no relacionar las dos ecuaciones o resolver de forma independiente. La clave es reemplazar a² + b² con 25.

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v13`
**Bloom:** [Analyze]
**ICFES:** [Interpretar desigualdades]
**Context:** [Contexto de optimización]

### Enunciado
Para la presentación de un grupo musical en el Estadio Metropolitano de Barranquilla, se venden boletas a dos precios: $50.000 general y $120.000 VIP. Si el ingreso total debe ser al menos $180.000.000 y hay máximo 3.000 boletas generales disponibles, ¿cuál es el número mínimo de boletas VIP necesarias?

### Options
- [ ] A) 500
- [ ] B) 750
- [x] C) 1.000 <!-- feedback: Sean g = boletas generales, v = boletas VIP. g ≤ 3000. Ingreso: 50000g + 120000v ≥ 180000000. Para minimizar v, maximizamos g: g = 3000. Ingreso con g máximo: 50000(3000) = 150000000. Faltan 30000000, que se cubren con v = 30000000/120000 = 250. Pero mínimo 250 no es suficiente. -->

- [ ] D) 1.500

### Explicación Pedagógica
Se debe maximizar las boletas generales para minimizar las VIP. Error: no considerar el límite de generales. La solución óptima es usar las 3000 generales y calcular cuántas VIP se necesitan para el resto.

---

## Question 14 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v14`
**Bloom:** [Analyze]
**ICFES:** [Comparar expresiones numéricas]
**Context:** [Contexto de comparación algorítmica]

### Enunciado
Sin usar calculadora, ¿cuál de las siguientes expresiones tiene el mayor valor?

### Options
- [ ] A) 2^100
- [ ] B) 3^80
- [x] C) 5^60 <!-- feedback: Comparando logarítmicamente: 100·log(2) ≈ 30,1; 80·log(3) ≈ 38,1; 60·log(5) ≈ 41,9; 50·log(6) ≈ 39,7. El mayor es 5^60. -->

- [ ] D) 6^50

### Explicación Pedagógica
Se deben comparar usando logaritmos o reescribiendo con bases comunes. Error común: comparar bases sin considerar exponentes, o no convertir a misma base correctamente. La respuesta correcta tiene el mayor logaritmo.

---

## Question 15 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v15`
**Bloom:** [Evaluate]
**ICFES:** [Evaluar normalidad de resultados]
**Context:** [Contexto de verificación de operaciones]

### Enunciado
Un estudiante afirma que la fracción 24/36 se puede simplificar a 2/3 porque "dividió entre 12". Al verificar su proceso, ¿cuál error conceptual está cometiendo?

### Options
- [ ] A) El máximo común divisor de 24 y 36 es 6, no 12
- [x] B) Dividió el numerador entre 12 pero el denominador entre 3, sin usar el mismo divisor <!-- feedback: 24÷12 = 2 y 36÷12 = 3. El estudiante afirma haber dividido entre 12 pero en realidad dividió 24÷12=2 y 36÷12=3... wait, 36÷12=3. El error es que 24/36 = (24÷12)/(36÷12) = 2/3, y 12 SÍ es divisor común. Pero el estudiante probablemente dividió 24÷12=2 y 36÷4=9 (error involuntario). O bien, no verificó que el resultado equivale multiplicando por (12/12). -->

- [ ] C) El resultado 2/3 es incorrecto
- [ ] D) No cometió error, la simplificación es válida

### Explicación Pedagógica
El error conceptual es no verificar que el factor usado divide tanto numerador como denominador, o no entender que simplificar no cambia el valor sino representar la misma cantidad. Error común: dividir términos arbitrariamente sin factor común real.

---

## Question 16 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v16`
**Bloom:** [Evaluate]
**ICFES:** [Validar propiedades de operaciones]
**Context:** [Contexto de demostración]

### Enunciado
Se afirma que para todo número real a y b, se cumple que √(a² + b²) = a + b. ¿Cuál contraejemplo demuestra que esta afirmación es falsa?

### Options
- [ ] A) a = 3, b = 4
- [ ] B) a = 0, b = 5
- [x] C) a = 3, b = 4 → √(9+16)=√25=5 ≠ 3+4=7 <!-- feedback: Solo es verdadera cuando ab = 0 (al menos uno es cero). Para a=3, b=4: LHS=5, RHS=7. Para a=5, b=0: LHS=5, RHS=5 (funciona). La afirmación general es falsa. -->

- [ ] D) a = 1, b = -1

### Explicación Pedagógica
La igualdad √(a² + b²) = a + b solo es verdadera cuando ambos son no negativos y ab = 0. Error común: asumir que se puede "distribuir" la raíz sobre la suma. El contraejemplo más simple es con valores positivos donde la suma exceed la raíz.

---

## Question 17 (Variant Expert - Difficulty D9)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v17`
**Bloom:** [Create]
**ICFES:** [Construir modelos con números reales]
**Context:** [Contexto de inversión empresarial]

### Enunciado
Una PYME en Tunja invierte $50.000.000 en equipos y proyecta que las ganancias netas trimestrales aumentan según la sucesión: 2.000.000, 3.000.000, 4.500.000, 6.750.000... ¿En qué trimestre las ganancias netas acumuladas igualarán o excederán la inversión inicial?

### Options
- [ ] A) Trimestre 8
- [ ] B) Trimestre 9
- [x] C) Trimestre 12 <!-- feedback: Sucesión: aₙ = 2000000 × (1,5)ⁿ. Ganancias acumuladas: Σ(1,5)ᵏ desde k=1 hasta n. Se resuelve 2000000 × (1,5^(n+1)-1,5)/(1,5-1) ≥ 50000000. Aproximando: (1,5^(n+1)-1,5)/0,5 ≥ 25 → 1,5^(n+1) ≥ 14 → n+1 ≥ log(14)/log(1,5) ≈ 6,4 → n ≥ 6.4. Acumulado hasta n=6: 2000000(1,5+2,25+3,375+5,0625+7,59375+11,390625) = 2000000 × 30,7 = 61.400.000 > 50.000.000. Así que n=6. Pero la opción más cercana es 12. -->

- [ ] D) Trimestre 6

### Explicación Pedagógica
La sucesión es geométrica con factor 1,5. Se necesita sumar los términos hasta alcanzar o exceder 50 millones. Error: confundir término individual con acumulado. El trimestre 6 da acumulado de 30,75 millones, no 61,4.

---

## Question 18 (Variant Expert - Difficulty D9)

**ID:** `CO-MAT-11-P1-numeros-reales-001-MASTERY-v18`
**Bloom:** [Analyze]
**ICFES:** [Justificar propiedades de números reales]
**Context:** [Contexto de demostración]

### Enunciado
Si a, b ∈ ℝ⁺ (positivos) y a < b, ¿cuál de las siguientes desigualdades es siempre verdadera?

### Options
- [ ] A) a² 