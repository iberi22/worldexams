<think>
The user wants me to generate exactly 20 multiple choice questions in ICFES Saber 11 format for Colombian state exam. The topic is "geometria-euclidiana" (Euclidean geometry), grade 11, period 2.

Let me follow the format strictly with the YAML frontmatter and 20 questions.

I need to:
- 4 difficulty levels (D3-D4 for 1-4, D5-D6 for 5-10, D7-D8 for 11-16, D9-D10 for 17-20)
- 4 options per question (A, B, C, D) with [x] marking the correct one
- Colombian context
- ICFES alignment
- No "all of the above" or "none of the above"
- Plausible distractors (real student errors)
- Progressive difficulty

Let me generate 20 questions on Euclidean geometry for grade 11.

Questions 1-4 (D3-D4):
- Basic geometry concepts, properties of triangles, angles, basic proofs

Questions 5-10 (D5-D6):
- More complex geometry, circles, congruence, similarity, area calculations

Questions 11-16 (D7-D8):
- Advanced proofs, geometric constructions, trigonometry integration, complex area/volume

Questions 17-20 (D9-D10):
- Complex problem solving, proofs, combining multiple concepts

Let me write them:

1. (D3) Triangle angle sum
2. (D3) Parallel lines and transversal
3. (D4) Properties of quadrilaterals
4. (D4) Circle basic concepts

5. (D5) Triangle congruence criteria
6. (D5) Similar triangles
7. (D5) Angle bisector theorem
8. (D6) Area of composite figures
9. (D6) Pythagorean theorem application
10. (D6) Properties of angles in circles


11. (D7) Geometric proof with congruence
12. (D7) Complex similarity problems
13. (D7) Inscribed angles theorem
14. (D8) Area optimization
15. (D8) Perimeter and area relationships
16. (D8) Circle theorems application
17. (D9) Complex proof synthesis
18. (D9) Trigonometry with geometry
19. (D10) Multi-step geometry problem
20. (D10) Advanced geometric construction problem

I'll write the questions with proper formatting and plausible distractors.

</think>

---
id: "CO-MAT-11-P2-geometria-euclidiana-016-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "geometria-euclidiana"
periodo: 2
protocol_version: "5.1"
bundle_size: 20
bundle_index: 16
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T16:33:56.559469"
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

**ID:** `CO-MAT-11-P2-geometria-euclidiana-016-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comprensión y uso de conceptos geométricos
**Context:** En un colegio público de Bogotá, los estudiantes de grado 11 aprenden geometría euclidiana.

### Enunciado
En un triángulo ABC, los ángulos internos miden: ∠A = 35°, ∠B = 72°. ¿Cuánto mide el ángulo ∠C?

### Options
- [ ] A) 73° <!-- feedback: Error al restar incorrectamente de 180° -->
- [x] C) 73° <!-- feedback: 180° - (35° + 72°) = 180° - 107° = 73° es correcto. -->
- [ ] B) 107° <!-- feedback: Confunden la suma con el valor del ángulo restante -->
- [ ] D) 108° <!-- feedback: Error al realizar la suma de ángulos -->

### Explicación Pedagógica
La suma de los ángulos internos de todo triángulo es 180°. Por lo tanto, ∠C = 180° - (35° + 72°) = 73°. Un error común es confundir la suma con el ángulo restante, o realizar operaciones aritméticas incorrectas.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-016-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Identificación de relaciones entre figuras geométricas
**Context:** En la clase de geometría del Colegio Nacional de Florencia, Caquetá, el profesor explica las rectas parallelas cortadas por una transversal.

### Enunciado
Si dos rectas parallelas son cortadas por una transversal, ¿cuál de las siguientes relaciones entre ángulos es siempre verdadera?

### Options
- [ ] A) Los ángulos alternos internos son suplementarios <!-- feedback: Confunden con ángulos conjugados internos -->
- [ ] B) Los ángulos correspondientes son desiguales <!-- feedback: Incorrecto: los ángulos correspondientes son iguales -->
- [x] C) Los ángulos alternos internos son congruentes <!-- feedback: Correcto: ángulos alternos internos между параллельными линиями всегда равны -->
- [ ] D) Los ángulos adyacentes son complementarios <!-- feedback: No hay garantía de que sean complementarios -->

### Explicación Pedagógica
Cuando dos rectas parallelas son cortadas por una transversal, los ángulos alternos internos siempre son congruentes (iguales). Esta es una propiedad fundamental de la geometría euclidiana. Los errores comunes incluyen confundir las relaciones de ángulos alternos internos con los suplementarios.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-016-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Análisis de propiedades de figuras planas
**Context:** En un proyecto de arquitectura escolar en Medellín, los estudiantes diseán un parque con figuras geométricas.

### Enunciado
En un paralelogramo, si un ángulo mide 60°, ¿cuánto miden los otros tres ángulos?

### Options
- [ ] A) 60°, 120°, 120° <!-- feedback: Error al no reconocer que los ángulos opuestos son iguales -->
- [ ] B) 60°, 60°, 120° <!-- feedback: Confunden la propiedad de ángulos consecutivos -->
- [x] C) 120°, 60°, 120° <!-- feedback: Correcto: ángulos opuestos iguales (60° y 120°) y consecutivos suplementarios (180° - 60° = 120°) -->
- [ ] D) 60°, 60°, 60° <!-- feedback: Confunden con un triángulo equilátero -->

### Explicación Pedagógica
En un paralelogramo, los ángulos opuestos son iguales y los ángulos consecutivos son suplementarios (suman 180°). Si un ángulo es 60°, el opuesto también es 60°, y cada uno de los otros dos mide 180° - 60° = 120°.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-016-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Aplicación de propiedades del círculo
**Context:** Un ingeniero civil de Tunja diseña una rotonda y necesita calcular propiedades de círculos.

### Enunciado
Si un círculo tiene un radio de 7 cm, ¿cuál es la longitud de su circunferencia? (Use π ≈ 3.14)

### Options
- [ ] A) 21.98 cm <!-- feedback: Error al usar el diámetro en lugar del radio en la fórmula -->
- [ ] B) 43.96 cm <!-- feedback: Correcto: C = 2πr = 2 × 3.14 × 7 = 43.96 cm -->
- [ ] C) 14 cm <!-- feedback: Confunden la fórmula de la circunferencia con el área -->
- [ ] D) 153.86 cm <!-- feedback: Calcula el área en lugar de la circunferencia -->

### Explicación Pedagógica
La longitud de la circunferencia se calcula con la fórmula C = 2πr. Sustituyendo: C = 2 × 3.14 × 7 = 43.96 cm. Errores comunes incluyen usar el diámetro en lugar del radio, o confundir la fórmula con la del área del círculo.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-016-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Resolución de problemas con criterios de congruencia
**Context:** En la construcción de estructuras metálicas en Bucaramanga, los ingenieros verifican la congruencia de secciones triangulares.

### Enunciado
Para demostrar que dos triángulos son congruentes usando el criterio LLL (Lado-Lado-Lado), ¿cuántos lados deben ser iguales y cómo deben ser esos lados?

### Options
- [ ] A) Los tres lados deben ser respectivamente perpendiculares <!-- feedback: No es requisito que sean perpendiculares -->
- [ ] B) Al menos dos lados deben ser iguales y el ángulo entre ellos de 90° <!-- feedback: Confunden con el criterio LAL -->
- [x] C) Los tres lados de un triángulo deben ser respectivamente iguales a los tres lados del otro triángulo <!-- feedback: Correcto: el criterio LLL establece que tres lados respectivamente iguales garantiza congruencia -->
- [ ] D) Los tres lados deben sumar 180° <!-- feedback: Confunden lados con ángulos -->

### Explicación Pedagógica
El criterio LLL (Lado-Lado-Lado) establece que si los tres lados de un triángulo son respectivamente iguales a los tres lados de otro triángulo, entonces los triángulos son congruentes. No se requiere que los lados sean perpendiculares ni ninguna condición adicional.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-016-MASTERY-v6`
**Bloom:** Understand
**ICFES:** Relación entre criterios de congruencia y similitud
**Context:** En un estudio de Fotogrametría en cartografía, se utilizan triángulos similares para calcular distancias.

### Enunciado
¿Cuál es la diferencia fundamental entre triángulos congruentes y triángulos similares?

### Options
- [ ] A) Los triángulos congruentes tienen lados iguales y los similares tienen ángulos iguales <!-- feedback: Los triángulos similares también tienen ángulos iguales, pero no necesariamente lados iguales -->
- [x] B) Los triángulos congruentes tienen lados y ángulos respectivamente iguales; los similares tienen ángulos respectivamente iguales pero lados proporcionales, no necesariamente iguales <!-- feedback: Correcto: la diferencia clave es que congruencia implica igualdad de tamaño, mientras que similitud implica proporcionalidad -->
- [ ] C) Los triángulos congruentes son más grandes que los similares <!-- feedback: El tamaño no define la congruencia o similitud -->
- [ ] D) No hay diferencia; son sinónimos <!-- feedback: Son conceptos distintos en geometría -->

### Explicación Pedagógica
La congruencia implica igualdad tanto en ángulos como en lados (mismo tamaño), mientras que la similitud implica ángulos respectivamente iguales y lados proporcionales (mismo forma, diferente tamaño). Esta es una distinción fundamental en geometría euclidiana.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-016-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Aplicación del teorema de la bisectriz del ángulo
**Context:** En un proyecto de diseño urbano en Cali, architects trazan bisectrices para dividir regiones triangulares.

### Enunciado
En un triángulo ABC, la bisectriz del ángulo A divide el lado BC en dos segmentos. Si BD = 6 cm y DC = 4 cm, y el perímetro del triángulo es 30 cm, ¿cuál es la longitud de AB + AC?

### Options
- [ ] A) 10 cm <!-- feedback: Error alsumar directamente los segmentos sin considerar la proporcionalidad -->
- [ ] B) 14 cm <!-- feedback: Calculan solo la diferencia, no la suma correcta -->
- [x] C) 20 cm <!-- feedback: Correcto: por el teorema de la bisectriz, AB/AC = BD/DC = 6/4 = 3/2. Con perímetro 30 y BC = 10, entonces AB + AC = 30 - 10 = 20 cm -->
- [ ] D) 16 cm <!-- feedback: Confunden con el semiperímetro -->

### Explicación Pedagógica
Por el teorema de la bisectriz del ángulo, AB/AC = BD/DC = 6/4 = 3/2. El lado BC = BD + DC = 10 cm. Como el perímetro es 30 cm, entonces AB + AC = 30 - 10 = 20 cm. Un error común es no utilizar el perímetro correctamente.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-016-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Cálculo de áreas de figuras compuestas
**Context:** En un proyecto de jardinería en Pereira, se diseña un parque con zonas formadas por figuras geométricas combinadas.

### Enunciado
Un jardín tiene forma de figura compuesta: un rectángulo de 12 m de largo por 8 m de ancho, con un semicírculo de radio 4 m pegado a uno de los lados menores. ¿Cuál es el área total del jardín? (Use π = 3.14)

### Options
- [ ] A) 122.88 m² <!-- feedback: Calcula correctamente el rectángulo (96 m²) más el semicírculo (25.12 m²) = 121.12 m², pero confunde radio -->
- [ ] B) 96 m² <!-- feedback: Solo calcula el área del rectángulo, olvida el semicírculo -->
- [x] C) 121.12 m² <!-- feedback: Correcto: Área rectángulo = 12 × 8 = 96 m². Área semicírculo = (π × r²)/2 = (3.14 × 16)/2 = 25.12 m². Total = 96 + 25.12 = 121.12 m² -->
- [ ] D) 144 m² <!-- feedback: Calcula el área del rectángulo más el círculo completo, no el semicírculo -->

### Explicación Pedagógica
El área total es la suma del área del rectángulo (12 × 8 = 96 m²) más el área del semicírculo (π × 4² / 2 = 25.12 m²), resultando en 121.12 m². Errores comunes incluyen olvidar el semicírculo o calcular el círculo completo en lugar del semicírculo.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-016-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Aplicación del teorema de Pitágoras en contextos reales
**Context:** En una comunidad rural de Nariño, se instala una antena de telecomunicaciones y se calcula la longitud del cable de soporte.

### Enunciado
Una antena de telecomunicación está sostenida por un cable que va desde el punto más alto de la antena hasta el suelo, formando un triángulo rectángulo. Si la antena tiene una altura de 24 m y la distancia desde la base de la antena hasta el punto donde el cable toca el suelo es de 10 m, ¿cuál es la longitud del cable?

### Options
- [ ] A) 26 m <!-- feedback: Correcto: √(24² + 10²) = √(576 + 100) = √676 = 26 m -->
- [ ] B) 34 m <!-- feedback: Confunden y suman 24 + 10 directamente -->
- [ ] C) 22 m <!-- feedback: Calculan la diferencia de cuadrados sin raíz -->
- [ ] D) 14 m <!-- feedback: Restan los valores en lugar de sumarlos -->

### Explicación Pedagógica
Por el teorema de Pitágoras: cable² = 24² + 10² = 576 + 100 = 676, entonces cable = √676 = 26 m. Errores comunes incluyen sumar directamente los catetos o restarlos en lugar de aplicarel teorema correctamente.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-016-MASTERY-v10`
**Bloom:** Analyze
**ICFES:** Análisis de propiedades angulares en círculos
**Context:** En una cyclovía dominical en Bogotá, se traza una pista circular y se estudian los ángulos formados.

### Enunciado
En una circunferencia, un ángulo centralsubtiende un arco de 120°. ¿Cuánto mide dicho ángulo central?

### Options
- [ ] A) 120° <!-- feedback: Correcto: el ángulo central es igual al arco que subtiende, 120° -->
- [ ] B) 60° <!-- feedback: Confunden con la mitad del arco -->
- [ ] C) 240° <!-- feedback: Suman el arco al ángulo en lugar de igualarlo -->
- [ ] D) 90° <!-- feedback: Confunden con un ángulo noteworthy -->

### Explicación Pedagógica
El ángulo central de una circunferencia es congruente al arco que subtiende. Por lo tanto, si el arco mide 120°, el ángulo central también mide 120°. Un error común es confundir con la medida del ángulo inscrito que subtiende el mismo arco.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-016-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Demostración de propiedades geométricas
**Context:** En la preparación para las pruebas Saber 11, estudiantes del Colegio Andino de Bogotá practican demostraciones geométricas.

### Enunciado
En un triángulo isósceles ABC con AB = AC, se traza la altura desde el vértice A al lado BC, encontrando el punto D. ¿Cuál de las siguientes afirmaciones es siempre verdadera?

### Options
- [ ] A) BD > DC <!-- feedback: Incorrecto: la altura divide la base en dos segmentos iguales en un triángulo isósceles -->
- [ ] B) AD < AB <!-- feedback: No se puede determinar sin conocer las medidas específicas -->
- [x] C) BD = DC <!-- feedback: Correcto: en un triángulo isósceles, la altura desde el vértice al base divide la base en dos segmentos iguales -->
- [ ] D) ∠BAD = ∠DAC <!-- feedback: Esto sería cierto para la bisectriz, no necesariamente para la altura (a menos que el triángulo también sea equilátero) -->

### Explicación Pedagógica
En un triángulo isósceles, la altura desde el vértice (donde convergen los lados iguales) al base (lado desigual) divide la base en dos segmentos iguales. Esta es una propiedad fundamental que se usa frecuentemente en demostraciones. No debe confundirse con la bisectriz del ángulo, aunque en un triángulo isósceles la altura, la mediana y la bisectriz coinciden.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-016-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Resolución de problemas de similitud
**Context:** En un proyecto de topografía en los Llanos Orientales, se usa la similitud de triángulos para medir distancias inaccesibles.

### Enunciado
Un poste de 4.5 m de altura proyecta una sombra de 6 m. A la misma hora, un árbol cercano proyecta una sombra de 14 m. ¿Cuál es la altura del árbol?

### Options
- [ ] A) 7.5 m <!-- feedback: Calcula la proporción sin considerar que los rayos solares son paralelos -->
- [x] B) 10.5 m <!-- feedback: Correcto: por similitud de triángulos, 4.5/6 = h/14, entonces h = 4.5 × 14 / 6 = 10.5 m -->
- [ ] C) 9.5 m <!-- feedback: Error en el cálculo de la proporción -->
- [ ] D) 8 m <!-- feedback: Confunden la sombra del poste con la del árbol -->

### Explicación Pedagógica
Por el principio de rayos solares paralelos, los triángulos formados por el poste y su sombra, y por el árbol y su sombra, son similares. Por lo tanto: 4.5/6 = h/14, despejando h = 10.5 m. Un error común es no establecer correctamente la proporción entre las alturas y las sombras.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-016-MASTERY-v13`
**Bloom:** Understand
**ICFES:** Relación entre ángulo inscrito y ángulo central
**Context:** En una завод de manufactura en Barranquilla, se trazan arcos circulares para diseñar piezas metálicas.

### Enunciado
Si un ángulo inscrito en una circunferenciasubtiende el mismo arco que un ángulo central de 80°, ¿cuánto mide el ángulo inscrito?

### Options
- [ ] A) 80° <!-- feedback: Confunden el ángulo inscrito con el central -->
- [ ] B) 160° <!-- feedback: Duplican el ángulo central en lugar de将它减半 -->
- [x] C) 40° <!-- feedback: Correcto: el ángulo inscrito mide la mitad del ángulo central que subtiende el mismo arco -->
- [ ] D) 40° <!-- feedback: Este es el valor correcto, pero se selecciona por razones incorrectas -->
- [ ] D) 100° <!-- feedback: Suman el ángulo central con 20° arbitrariamente -->

### Explicación Pedagógica
El teorema del ángulo inscrito establece que un ángulo inscrito en una circunferencia mide la mitad del ángulo central que subtiende el mismo arco. Por lo tanto, el ángulo inscrito mide 80°/2 = 40°. Un error común es creer que el ángulo inscrito es igual al central.

---

## Question 14 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-016-MASTERY-v14`
**Bloom:** Evaluate
**ICFES:** Optimización en contextos geométricos
**Context:** En un proyecto de diseño de empaques en la industria de alimentos de Antioquía, se busca optimizar el uso de material.

### Enunciado
De todos los rectángulos con perímetro fijo de 40 cm, ¿cuál tiene el área máxima?

### Options
- [ ] A) 8 cm × 12 cm <!-- feedback: El perímetro sería 40 cm pero el área es 96 cm² -->
- [ ] B) 10 cm × 10 cm <!-- feedback: Correcto: para perímetro fijo, el cuadrado tiene área máxima. Perímetro = 2(10+10) = 40 cm, Área = 100 cm² -->
- [ ] C) 6 cm × 14 cm <!-- feedback: El perímetro es 40 cm pero el área es 84 cm² -->
- [ ] D) 9 cm × 11 cm <!-- feedback: El perímetro es 40 cm pero el área es 99 cm² -->

### Explicación Pedagógica
Para un perímetro fijo, el cuadrado (lado = perímetro/4 = 10 cm) tiene el área máxima. Esto se puede demostrar usando derivadas o completando el cuadrado en la función de área. Los rectángulos con lados más desiguales tienen áreas menores para el mismo perímetro.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-016-MASTERY-v15`
**Bloom:** Apply
**ICFES:** Relación entre perímetro y área en figuras compuestas
**Context:** Un arquitecto paisajista en Villa de Leyva diseña un jardín con senderos empedrados y áreas verdes.

### Enunciado
Un jardín circular tiene un área de 154 m². Se construye un sendero de ancho uniforme 2 m alrededor del jardín (excluyendo el jardín). ¿Cuál es el área del sendero? (Use π = 22/7)

### Options
- [ ] A) 44 m² <!-- feedback: Calcula solo la diferencia de radios sin considerar el área completa del círculo mayor -->
- [x] B) 44 m² <!-- feedback: Correcto: radio interior = √(154 × 7/22) = 7 m. Radio exterior = 7 + 2 = 9 m. Área sendero = π(9² - 7²) = 22/7 × 32 = 44 m² aproximadamente -->
- [ ] C) 616 m² <!-- feedback: Calcula el área total del círculo mayor, no el sendero -->
- [ ] D) 88 m² <!-- feedback: Duplica el área correcta -->

### Explicación Pedagógica
El radio interior es √(154 × 7/22) = √49 = 7 m. El radio exterior es 7 + 2 = 9 m. El área del sendero es π(R² - r²) = (22/7)(81 - 49) = 44 m². Un error común es calcular solo la diferencia de radios sin considerar la fórmula correcta del área de la corona circular.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P2-geometria-euclidiana-016-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Aplicación de teoremas de círculo en demostración
**Context:** En uncurso de geometría avanzada en la Universidad Nacional de Colombia, se demuestran teoremas de圆圆as.

### Enunciado
En una circunferencia, dos cuerdas AB y CD se intersectan en el punto E dentro del círculo. Si AE = 8, EB = 4, y CE = 6, ¿cuánto mide ED?

### Options
- [ ] A) 12 <!-- feedback: Suma los segmentos en lugar de aplicar el teorema del intersecto de cuerdas -->
- [x] B) 12 <!-- feedback: Correcto: por el teorema del intersecto de cuerdas, AE × EB = CE × ED. Entonces 8 × 4 = 6 × ED, ED = 32/6 = 16/3 ≈ 5.33. Este resultado no coincide, revisemos: 8 × 4 = 6 × x, x = 32/6 = 16/3 ≈ 5.33. La opción correcta debería ser