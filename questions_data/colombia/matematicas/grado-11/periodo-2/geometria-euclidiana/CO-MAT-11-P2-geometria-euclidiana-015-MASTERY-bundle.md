<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for Mathematics, specifically Euclidean Geometry, Grade 11, Period 2. Let me follow all the specifications carefully:

1. Need to create a markdown file with YAML frontmatter
2. 20 questions with progressive difficulty:
   - Questions 1-4: D3-D4 (basic)
   - Questions 5-10: D5-D6 (intermediate)
   - Questions 11-16: D7-D8 (advanced)
   - Questions 17-20: D9-D10 (mastery)
3. Each question needs:
   - Question number with variant and difficulty
   - ID in specific format
   - Bloom level
   - ICFES competency
   - Context (modern Colombian relevance)
   - Enunciado (clear question)
   - 4 options (A, B, C, D) with [x] marking the correct one
   - Explicación Pedagógica
4. Plausible distractors based on common Colombian student errors
5. ICFES-aligned style
6. Colombian contexts
7. No "all of the above" or "none of the above" options

Let me create 20 questions on Euclidean Geometry covering topics typically taught in Grade 11, Period 2 in Colombia:
- Congruence and similarity
- Area and perimeter calculations
- Euclidean geometry theorems
- Pythagorean theorem applications
- Circles and their properties
- Polygons
- Triangle properties
- Geometric constructions
- Angle relationships

Let me craft these carefully with authentic Colombian contexts and plausible distractors.

</think>

```markdown
---
id: "CO-MAT-11-P2-geometria-euclidiana-015-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "geometria-euclidiana"
periodo: 2
protocol_version: "5.1"
bundle_size: 20
bundle_index: 15
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T16:31:45.931561"
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

**ID:** `CO-MAT-11-P2-geometria-euclidiana-015-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Pensamiento métrico y numérico
**Context:** En el marco de la ley de fútbol colombiano, el Estadio Metropolitano de Barranquilla tiene forma geométrica notable

### Enunciado
En un triángulo rectángulo, si los catetos miden 3 cm y 4 cm respectivamente, ¿cuánto mide la hipotenusa?

### Options
- [ ] A) 5 cm <!-- feedback: Error común: confundir el teorema y sumar en lugar de usar Pitágoras -->
- [x] B) 5 cm <!-- feedback: Correcto: por el teorema de Pitágoras, √(3²+4²) = √(9+16) = √25 = 5 -->
- [ ] C) 7 cm <!-- feedback: Error frecuente: simplemente sumar las medidas de los catetos -->
- [ ] D) 12 cm <!-- feedback: Error: multiplicar en lugar de aplicar la fórmula correcta -->

### Explicación Pedagógica
La respuesta correcta es B. Según el Teorema de Pitágoras, en todo triángulo rectángulo el cuadrado de la hipotenusa es igual a la suma de los cuadrados de los catetos: h² = a² + b². Sustituyendo: h² = 3² + 4² = 9 + 16 = 25, por lo tanto h = √25 = 5. El distractor A es plausible porque estudiantes con dificultades en el teorema pueden olvidar que debe extraerse la raíz cuadrada. El distractor C es el error aritmético más común de simplemente sumar. El distractor D resulta de una confusión entre las operaciones.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-015-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Razonamiento abstracto
**Context:** En el diseño de la nueva sede de una biblioteca pública en Medellín, se usa un vitral triangular

### Enunciado
Dos triángulos tienen sus tres lados respectivamente iguales. ¿Cuál de las siguientes afirmaciones es verdadera?

### Options
- [ ] A) Los triángulos son necesariamente equiláteros <!-- feedback: Error: la congruencia de lados no implica ángulos de 60° -->
- [x] B) Los triángulos son congruentes <!-- feedback: Correcto: por el criterio LLL (lado-lado-lado), triángulos con los tres lados iguales son congruentes -->
- [ ] C) Los triángulos tienen igual área pero diferente forma <!-- feedback: Error: si los lados son iguales, los ángulos también lo son, donc la forma es idéntica -->
- [ ] D) Los triángulos son necesariamente isósceles <!-- feedback: Error: pueden ser escalenos si los tres lados son distintos pero correspondientes -->

### Explicación Pedagógica
La respuesta correcta es B. El criterio de congruencia LLL (lado-lado-lado) establece que si dos triángulos tienen sus tres lados respectivamente iguales, entonces son congruentes, es decir, tienen exactamente la misma forma y tamaño. Un distractor común es pensar que si los lados son iguales, los triángulos deben ser equiláteros (opción A), pero pueden ser escalenos con lados distintos siempre que sean correspondientes. La opción D confunde isósceles con escaleno.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-015-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Pensamiento espacial
**Context:** En la construcción del nuevo Tranvía de Medellín, los ingenieros calculan áreas de secciones transversales

### Enunciado
Un rectángulo tiene un perímetro de 24 cm y su ancho es la mitad de su largo. ¿Cuál es el área del rectángulo?

### Options
- [ ] A) 28 cm² <!-- feedback: Error: confundir perímetro con área en el cálculo -->
- [ ] B) 32 cm² <!-- feedback: Error: resolver correctamente el sistema pero invertir largo y ancho -->
- [x] C) 32 cm² <!-- feedback: Correcto: largo = 8cm, ancho = 4cm, área = 8×4 = 32cm² -->
- [ ] D) 48 cm² <!-- feedback: Error: multiplicar las medidas sin considerar el perímetro -->

### Explicación Pedagógica
La respuesta correcta es C. Si el ancho es la mitad del largo, sea largo = 2x y ancho = x. El perímetro es 2(2x + x) = 6x = 24, entonces x = 4. Así, largo = 8 cm y ancho = 4 cm. El área es 8 × 4 = 32 cm². El distractor A refleja errores al confundir perímetro con área. El distractor D es típico de quien calcula 24 × 2 sin analizar las condiciones.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-015-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Comunicación matemática
**Context:** En la clase de arte del Colegio Nacional de Bachilleres, los estudiantes estudian la geometría de los patrones Wayúu

### Enunciado
En un paralelogramo, dos lados adyacentes miden 6 cm y 8 cm, y el ángulo entre ellos es de 90°. ¿Cuál es el área del paralelogramo?

### Options
- [ ] A) 14 cm² <!-- feedback: Error: sumar las medidas en lugar de multiplicar -->
- [ ] B) 24 cm² <!-- feedback: Error: multiplicar solo las medidas sin considerar el ángulo -->
- [x] C) 48 cm² <!-- feedback: Correcto: como el ángulo es 90°, el área es base×altura = 6×8 = 48cm² -->
- [ ] D) 96 cm² <!-- feedback: Error: duplicar la respuesta correcta sin justificación -->

### Explicación Pedagógica
La respuesta correcta es C. Cuando dos lados de un paralelogramo son perpendiculares (ángulo de 90°), este es en realidad un rectángulo. El área se calcula como base × altura, que en este caso corresponde a 6 cm × 8 cm = 48 cm². El distractor B es común entre estudiantes que olvidan que deben considerar el ángulo cuando este no es recto. El distractor A refleja errores aritméticos básicos.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-015-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Pensamiento espacial
**Context:** En la planificación del Parque Lineal del Río Medellín, se diseña una zona con césped triangular

### Enunciado
Un triángulo isósceles tiene un perímetro de 34 cm. La base mide 14 cm y los lados iguales son congruentes. ¿Cuál es la longitud de cada lado igual?

### Options
- [ ] A) 10 cm <!-- feedback: Error: dividir 34 entre 2 en lugar de restar la base primero -->
- [x] B) 10 cm <!-- feedback: Correcto: perímetro = base + 2(lado), entonces 34 = 14 + 2l, 2l = 20, l = 10cm -->
- [ ] C) 20 cm <!-- feedback: Error: olvidar dividir entre 2 después de restar la base -->
- [ ] D) 24 cm <!-- feedback: Error: confundir el perímetro y pensar que solo los lados iguales suman 34 -->

### Explicación Pedagógica
La respuesta correcta es B. En un triángulo isósceles con perímetro 34 cm y base 14 cm, la suma de los dos lados iguales es 34 - 14 = 20 cm. Como los lados son congruentes, cada uno mide 20/2 = 10 cm. El distractor C es muy común: estudiantes restan la base pero olvidan dividir entre 2. El distractor A resulta de confundir cómo funciona el perímetro.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-015-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Razonamiento lógico
**Context:** En el Centro de Convenciones de Cartagena, se diseña un piso con mosaicos geométricos basados en teselados coloniales

### Enunciado
La diagonal de un cuadrado mide 12√2 cm. ¿Cuál es el perímetro del cuadrado?

### Options
- [ ] A) 24 cm <!-- feedback: Error: confundir diagonal con lado -->
- [x] B) 48 cm <!-- feedback: Correcto: si la diagonal es 12√2, el lado es 12cm, perímetro = 4×12 = 48cm -->
- [ ] C) 48√2 cm <!-- feedback: Error: no simplificar correctamente la diagonal para obtener el lado -->
- [ ] D) 96 cm <!-- feedback: Error: duplicar el resultado correcto -->

### Explicación Pedagógica
La respuesta correcta es B. En un cuadrado, la diagonal d = l√2, donde l es el lado. Si d = 12√2, entonces l = 12 cm. El perímetro es 4 × 12 = 48 cm. El distractor C es frecuente entre quienes trabajan con radicales sin simplificar correctamente. El distractor A refleja confusión entre diagonal y lado.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-015-MASTERY-v7`
**Bloom:** Understand
**ICFES:** Pensamiento métrico
**Context:** En una empresa de empaques de Riopaila Castilla, se calcula el área superficial de cajas con bases rectangulares

### Enunciado
Un cilindro tiene un radio de la base de 5 cm y una altura de 10 cm. ¿Cuál es el área total del cilindro (incluyendo las dos bases)?

### Options
- [x] A) 150π cm² <!-- feedback: Correcto: At = 2πr(h+r) = 2π(5)(10+5) = 2π(5)(15) = 150π cm² -->
- [ ] B) 100π cm² <!-- feedback: Error: calcular solo el área lateral, omitiendo las bases -->
- [ ] C) 250π cm² <!-- feedback: Error: incluir el radio al cuadrado incorrectamente -->
- [ ] D) 300π cm² <!-- feedback: Error: malinterpretar la fórmula y usar h×2r en lugar de h+r -->

### Explicación Pedagógica
La respuesta correcta es A. El área total de un cilindro es: At = 2πr(h + r). Sustituyendo: At = 2π(5)(10 + 5) = 2π(5)(15) = 150π cm². El distractor B es muy común: estudiantes que olvidan incluir el área de las dos bases circulares. El distractor C refleja errores en la aplicación de la fórmula con operaciones incorrectas.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-015-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Modelación matemática
**Context:** En el proyecto de vivienda de interés social "Ciudadela Valle" en Cali, se instalan tanques de agua cilíndricos

### Enunciado
Se necesita construir un cono con volumen de 126π cm³ y radio de la base de 7 cm. ¿Cuál es la altura del cono?

### Options
- [ ] A) 6 cm <!-- feedback: Error: despejar incorrectamente la fórmula del volumen -->
- [x] B) 6 cm <!-- feedback: Correcto: V = (1/3)πr²h, entonces 126π = (1/3)π(7²)h, h = 6cm -->
- [ ] C) 18 cm <!-- feedback: Error: despejar h como r²V/3π en lugar de 3V/πr² -->
- [ ] D) 54 cm <!-- feedback: Error: invertir la fórmula y multiplicar por π incorrectamente -->

### Explicación Pedagógica
La respuesta correcta es B. Usando la fórmula del volumen del cono V = (1/3)πr²h, sustituimos: 126π = (1/3)π(7²)h. Simplificando: 126 = (1/3)(49)h, 126 = 49h/3, h = (126×3)/49 = 378/49 = 6 cm. El distractor C es muy frecuente, indicando estudiantes que confunden cómo despejar la variable en una ecuación con fracción.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-015-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Razonamiento abstracto
**Context:** En la restauración del Museo del Oro en Bogotá, arqueólogos clasifican fragmentos de piezas circulares prehispánicas

### Enunciado
En una circunferencia, un ángulo central mide 72° y la longitud del radio es 10 cm. ¿Cuál es la longitud del arco correspondiente a ese ángulo?

### Options
- [ ] A) 4π cm <!-- feedback: Error: calcular solo la fracción del ángulo sin usar el radio -->
- [ ] B) 2π cm <!-- feedback: Error: olvidar multiplicar por el radio -->
- [x] C) 4π cm <!-- feedback: Correcto: L = (θ/360°)×2πr = (72°/360°)×2π(10) = (1/5)×20π = 4π cm -->
- [ ] D) 8π cm <!-- feedback: Error: no dividir entre 360° y usar solo la proporción del ángulo -->

### Explicación Pedagógica
La respuesta correcta es C. La longitud del arco se calcula con L = (θ/360°) × 2πr. Sustituyendo: L = (72°/360°) × 2π(10) = (1/5) × 20π = 4π cm. El distractor B refleja errores de estudiantes que calculan (θ/360°) × 2π sin incluir el radio. El distractor D resulta de saltarse la división por 360°.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-015-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Pensamiento espacial
**Context:** En el programa de bilingüismo de Pasto, estudiantes diseñan maquetas de monumentos arquitectónicos de la ciudad

### Enunciado
Un triángulo tiene lados que miden 5 cm, 12 cm y 13 cm. ¿Cuál es el área del triángulo?

### Options
- [ ] A) 30 cm² <!-- feedback: Error: identificarlo como triángulo rectángulo pero calcular base×altura incorrectamente -->
- [x] B) 30 cm² <!-- feedback: Correcto: cumple con 5²+12²=13², es rectángulo, área = (5×12)/2 = 30cm² -->
- [ ] C) 65 cm² <!-- feedback: Error: usar la fórmula de Herón sin verificar las medidas correctamente -->
- [ ] D) 78 cm² <!-- feedback: Error: multiplicar los tres lados sin considerar la altura -->

### Explicación Pedagógica
La respuesta correcta es B. Verificamos que 5² + 12² = 25 + 144 = 169 = 13², por lo tanto el triángulo es rectángulo con catetos de 5 cm y 12 cm. El área es (base × altura)/2 = (5 × 12)/2 = 30 cm². El distractor C es plausible para quienes aplican la fórmula de Herón correctamente pero cometen errores aritméticos. El distractor D refleja confusión al no identificar la naturaleza del triángulo.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-015-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Razonamiento lógico
**Context:** En el Laboratorio de Física de la Universidad Nacional de Colombia en Medellín, se analiza la trayectoria de partículas

### Enunciado
En un triángulo ABC, el ángulo A mide 45°, el ángulo B mide 75° y el lado AB (opuesto al ángulo C) mide 20 cm. ¿Cuál es la longitud del lado BC (opuesto al ángulo A)?

### Options
- [ ] A) 10√2 cm <!-- feedback: Error: aplicar incorrectamente la ley de senos con ángulos invertidos -->
- [x] B) 10√6 cm <!-- feedback: Correcto: por ley de senos, BC/sen45° = 20/sen60°, BC = 20×(√2/2)/(√3/2) = 10√6 cm -->
- [ ] C) 20√2 cm <!-- feedback: Error: usar sen45° directamente sin dividir entre sen60° -->
- [ ] D) 20√3 cm <!-- feedback: Error: confundir tangente con seno en la aplicación -->

### Explicación Pedagógica
La respuesta correcta es B. Usando la Ley de Senos: BC/sen45° = AB/sen75°. Primero calculamos sen75° = sen(45°+30°) = sen45°cos30° + cos45°sen30° = (√2/2)(√3/2) + (√2/2)(1/2) = √6/4 + √2/4 = (√6+√2)/4. Luego BC = 20×(√2/2)/[(√6+√2)/4] = 20√2×4/(2(√6+√2)) = 40√2/(√6+√2). Racionalizando se obtiene 10√6 cm. El distractor A resulta de errores algebraicos comunes en el despeje. El distractor C refleja usar sen45° directamente sin la debida proporción.

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-015-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Modelación matemática
**Context:** En el diseño del nuevo Estadio Arena Bogotá, ingenieros calculan las dimensiones de una sección con forma de trapecio

### Enunciado
Las bases de un trapecio miden 8 cm y 14 cm, y los lados no paralelos miden 5 cm cada uno. ¿Cuál es el área del trapecio?

### Options
- [ ] A) 55 cm² <!-- feedback: Error: aplicar fórmula correcta pero con altura incorrecta -->
- [ ] B) 44 cm² <!-- feedback: Error: calcular altura usando solo una diferencia de bases sin considerar los lados -->
- [x] C) 44 cm² <!-- feedback: Correcto: altura = √(5²-(3)²) = 4cm, área = (8+14)/2×4 = 44cm² -->
- [ ] D) 33 cm² <!-- feedback: Error: confundir la diferencia de bases al calcular la altura -->

### Explicación Pedagógica
La respuesta correcta es C. Primero calculamos la altura usando que la diferencia de las bases es 14 - 8 = 6 cm, y cada segmento en la base mayor es 3 cm. Por Pitágoras: altura = √(5² - 3²) = √(25-9) = √16 = 4 cm. El área del trapecio es [(B+b)/2] × h = [(14+8)/2] × 4 = 44 cm². El distractor A es frecuente entre quienes calculan la altura usando incorrectamente la suma de las bases. El distractor B refleja errores en la identificación del triángulo rectángulo formado.

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-015-MASTERY-v13`
**Bloom:** Evaluate
**ICFES:** Comunicación matemática
**Context:** En el festival de cometas de Villa de Leyva, competidores diseñan cometas con formas geométricas regulares

### Enunciado
Un polígono regular tiene 9 lados y cada ángulo exterior mide 40°. ¿Cuál es la suma de los ángulos interiores del polígono?

### Options
- [ ] A) 1260° <!-- feedback: Error: usar n×ángulo exterior en lugar de la fórmula correcta -->
- [ ] B) 1400° <!-- feedback: Error: calcular (n-2)×180° pero con n equivocado -->
- [x] C) 1260° <!-- feedback: Correcto: ángulo interior = 180°-40° = 140°, suma = 9×140° = 1260° -->
- [ ] D) 1620° <!-- feedback: Error: confundir ángulo interior con exterior y multiplicar por n equivocado -->

### Explicación Pedagógica
La respuesta correcta es C. En un polígono regular, la suma de un ángulo interior y su ángulo exterior adyacente es 180°. Si cada ángulo exterior mide 40°, entonces cada ángulo interior mide 180° - 40° = 140°. La suma de todos los ángulos interiores es 9 × 140° = 1260°. También se puede verificar con la fórmula (n-2)×180° = (9-2)×180° = 7×180° = 1260°. El distractor D es común entre quienes confunden la relación entre ángulos interiores y exteriores.

---

## Question 14 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-015-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Pensamiento espacial
**Context:** En el Planetario de Medellín, astrónomos calculan la superficie visible de la Luna desde diferentes posiciones

### Enunciado
Una esfera tiene un radio de 6 cm. ¿Cuál es el área de la superficie esférica?

### Options
- [ ] A) 36π cm² <!-- feedback: Error: confundir área esférica con volumen de esfera -->
- [ ] B) 48π cm² <!-- feedback: Error: aplicar fórmula del volumen en lugar del área -->
- [x] C) 144π cm² <!-- feedback: Correcto: A = 4πr² = 4π(6²) = 4π(36) = 144π cm² -->
- [ ] D) 288π cm² <!-- feedback: Error: olvidar la raíz cuadrada al despejar o duplicar el radio -->

### Explicación Pedagógica
La respuesta correcta es C. El área de la superficie de una esfera se calcula con la fórmula A = 4πr². Sustituyendo r = 6 cm: A = 4π(6²) = 4π(36) = 144π cm². El distractor A es frecuente porque 36π corresponde al área de un círculo (πr²) con radio 6. El distractor B refleja confusión entre el área superficial y el volumen (4/3πr³).

---

## Question 15 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-015-MASTERY-v15`
**Bloom:** Analyze
**ICFES:** Razonamiento lógico
**Context:** En la empresa textilera Fabricato en Medellín, diseñadores trabajan con patrones geométricos tradicionales

### Enunciado
En un hexágono regular, la distancia entre dos lados paralelos opuestos (apótema a altura) es 12√3 cm. ¿Cuál es el perímetro del hexágono?

### Options
- [ ] A) 36 cm <!-- feedback: Error: identificar incorrectamente el apótema con el lado -->
- [ ] B) 48 cm <!-- feedback: Error: confundir apótema con radio de la circunferencia circunscrita -->
- [x] C) 72 cm <!-- feedback: Correcto: apótema = (√3/2)l, 12√3 = (√3/2)l, l = 24cm, perímetro = 6×24 = 144cm, espera... l = 24... -->
- [ ] D) 144 cm <!-- feedback: Error: calcular el lado correctamente pero olvidar dividir por el factor del apótema -->

### Explicación Pedagógica
La respuesta correcta es D. En un hexágono regular, el apót