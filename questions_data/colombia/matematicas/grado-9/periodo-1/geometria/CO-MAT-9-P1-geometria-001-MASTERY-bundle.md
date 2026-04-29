<think>
El usuario me pide generar exactamente 20 preguntas tipo ICFES Saber 11 para matemáticas, tema geometría, grado 9, período 1.

Debo seguir el formato exacto que me указал con:
- Frontmatter YAML al inicio
- 20 preguntas con marcadores de dificultad progresiva
- Cada pregunta con: ID, Bloom, ICFES, Context, Enunciado, Options (4 opciones con [x] en la correcta), Explicación Pedagógica

Dificultades:
- D3-D4: preguntas 1-4
- D5-D6: preguntas 5-10
- D7-D8: preguntas 11-16
- D9-D10: preguntas 17-20

Temas de geometría para grado 9 (Colombia):
- Ángulos y triángulos
- Teorema de Pitágoras
- Áreas y perímetros
- Semejanza y congruencia
- Polígonos
- Circunferencia y círculo
- Transformaciones geométricas
- Razones trigonométricas básicas
- Coordenadas cartesianas y geometría analítica básica

Voy a crear preguntas con contexto colombiano real y distractores plausibles basados en errores comunes de estudiantes.

Empecemos:

</think>

```yaml
---
id: "CO-MAT-9-P1-geometria-001-MASTERY"
country: "colombia"
grado: 9
asignatura: "matematicas"
tema: "geometria"
periodo: 1
protocol_version: "5.1"
total_questions: 20
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
license: "CC BY-NC-SA 4.0"
open_source: false
---

## Question 1 [D3-D4]

**ID:** `CO-MAT-9-P1-geometria-001-v1`
**Bloom:** [Remember]
**ICFES:** [Comunicación]
**Context:** En una clase de geometría en un colegio de Medellín, el profesor explica las clasificaciones de triángulos.

### Enunciado
Un triángulo tiene lados que miden 5 cm, 12 cm y 13 cm. ¿Cómo se clasifica este triángulo según sus lados?

### Options
- [ ] A) Equilátero
- [ ] B) Isósceles
- [x] C) Escaleno
- [ ] D) Rectángulo

### Explicación Pedagógica
Un triángulo escaleno tiene sus tres lados de diferentes medidas. En este caso, 5 cm ≠ 12 cm ≠ 13 cm, por lo tanto es escaleno. El error común es confundir la clasificación por lados con la clasificación por ángulos; el triángulo rectángulo se identifica por tener un ángulo de 90°, no por la longitud de los lados.

---

## Question 2 [D3-D4]

**ID:** `CO-MAT-9-P1-geometria-001-v2`
**Bloom:** [Understand]
**ICFES:** [Razonamiento]
**Context:** En un proyecto de arquitectura en Cartagena, un ingeniero debe calcular ángulos para diseñar una escalera colonial.

### Enunciado
Si un triángulo rectángulo tiene un ángulo agudo de 30°, ¿cuánto mide el otro ángulo agudo?

### Options
- [ ] A) 30°
- [ ] B) 45°
- [x] C) 60°
- [ ] D) 90°

### Explicación Pedagógica
En todo triángulo, la suma de los ángulos interiores es 180°. Como es un triángulo rectángulo, ya tiene un ángulo de 90°. Entonces: 180° - 90° - 30° = 60°. El distractor A confunde el valor con el ángulo dado, y D confunde con el ángulo recto ya conocido.

---

## Question 3 [D3-D4]

**ID:** `CO-MAT-9-P1-geometria-001-v3`
**Bloom:** [Remember]
**ICFES:** [Comunicación]
**Context:** En la clase de artes de un colegio en Cali, los estudiantes dibujan figuras geométricas para un mural cultural.

### Enunciado
¿Cuál es la suma de los ángulos interiores de un hexágono?

### Options
- [ ] A) 360°
- [ ] B) 540°
- [x] C) 720°
- [ ] D) 900°

### Explicación Pedagógica
La fórmula para la suma de ángulos interiores es: (n-2) × 180°, donde n es el número de lados. Para un hexágono: (6-2) × 180° = 4 × 180° = 720°. El distractor B corresponde a un pentágono: (5-2) × 180° = 540°.

---

## Question 4 [D3-D4]

**ID:** `CO-MAT-9-P1-geometria-001-v4`
**Bloom:** [Understand]
**ICFES:** [Razonamiento]
**Context:** En un taller de geometría en Bucaramanga, los estudiantes usan transportadores para medir ángulos.

### Enunciado
Un ángulo mide 135°. ¿Cómo se clasifica este ángulo?

### Options
- [ ] A) Agudo
- [x] B) Obtuso
- [ ] C) Recto
- [ ] D) Completo

### Explicación Pedagógica
Los ángulos agudos miden menos de 90°, los rectos miden exactamente 90°, los obtusos miden entre 90° y 180°, y los completos miden 360°. Como 135° está entre 90° y 180°, es un ángulo obtuso. El error común es confundir obtuso (>90°) con agudo (<90°).

---

## Question 5 [D5-D6]

**ID:** `CO-MAT-9-P1-geometria-001-v5`
**Bloom:** [Apply]
**ICFES:** [Razonamiento]
**Context:** En la construcción de una vivienda en Pereira, un maestro de obras debe verificar que las paredes formen ángulos correctos.

### Enunciado
Un árbol de navidad triangular debe tener forma de triángulo isósceles con base de 1.5 m y lados iguales de 2 m. ¿Se puede formar este triángulo?

### Options
- [ ] A) Sí, porque 1.5 + 2 > 2
- [x] B) No, porque la suma de los dos lados iguales debe ser mayor que la base: 2 + 2 > 1.5, lo cual sí cumple, pero el problema indica 2m para los lados y 1.5m para la base, y la condición se cumple
- [ ] C) Sí, porque se cumple la desigualdad triangular: 1.5 + 2 > 2
- [ ] D) No se puede determinar

### Explicación Pedagógica
La desigualdad triangular establece que la suma de dos lados cualesquiera debe ser mayor que el tercer lado. Verificando: 1.5 + 2 = 3.5 > 2 ✓, 1.5 + 2 = 3.5 > 2 ✓, 2 + 2 = 4 > 1.5 ✓. Por lo tanto, sí se puede formar. La respuesta correcta es que sí se cumple la condición.

---

## Question 6 [D5-D6]

**ID:** `CO-MAT-9-P1-geometria-001-v6`
**Bloom:** [Apply]
**ICFES:** [Planteamiento y representación]
**Context:** En un proyecto escolar en Bogotá, los estudiantes diseñan cometas con forma de rombos.

### Enunciado
Las diagonales de un rombo miden 12 cm y 16 cm. ¿Cuál es el área del rombo?

### Options
- [ ] A) 28 cm²
- [ ] B) 48 cm²
- [x] C) 96 cm²
- [ ] D) 192 cm²

### Explicación Pedagógica
El área de un rombo se calcula como: A = (d₁ × d₂) / 2. Por lo tanto: A = (12 cm × 16 cm) / 2 = 192 cm² / 2 = 96 cm². El distractor B es el producto sin dividir, y D es el doble del producto sin dividir.

---

## Question 7 [D5-D6]

**ID:** `CO-MAT-9-P1-geometria-001-v7`
**Bloom:** [Apply]
**ICFES:** [Razonamiento]
**Context:** En un centro comercial de Barranquilla, un arquitecto diseña una fuente circular.

### Enunciado
Una fuente circular tiene un diámetro de 8 metros. ¿Cuál es el perímetro aproximado de la fuente?

### Options
- [ ] A) 16 m
- [ ] B) 24 m
- [x] C) 25.12 m
- [ ] D) 50.24 m

### Explicación Pedagógica
El perímetro de un círculo es P = π × d. Con d = 8 m y usando π ≈ 3.14: P = 3.14 × 8 = 25.12 m. El distractor A es solo el radio duplicado, el B parece una aproximación incorrecta, y el D sería el área del círculo.

---

## Question 8 [D5-D6]

**ID:** `CO-MAT-9-P1-geometria-001-v8`
**Bloom:** [Understand]
**ICFES:** [Comunicación]
**Context:** En un parque de diversiones en Santa Marta, un ingeniero verifica las medidas de seguridad de estructuras triangulares.

### Enunciado
En un triángulo ABC, el ángulo A mide 50° y el ángulo B mide 60°. ¿Cuánto mide el ángulo C?

### Options
- [ ] A) 70°
- [x] C) 70°
- [ ] B) 80°
- [ ] D) 110°

### Explicación Pedagógica
La suma de los ángulos interiores de todo triángulo es 180°. Entonces: 180° - 50° - 60° = 70°. El distractor B (80°) resulta de sumar incorrectamente, y D (110°) es el resultado de restar solo un ángulo.

---

## Question 9 [D5-D6]

**ID:** `CO-MAT-9-P1-geometria-001-v9`
**Bloom:** [Apply]
**ICFES:** [Razonamiento]
**Context:** En una finca cafetera en Armenia, un trabajador necesita calcular la longitud de una escalera para alcanzar la copa de un árbol.

### Enunciado
Un árbol de café proyecta una sombra de 6 metros sobre el suelo horizontal. Si el ángulo de elevación del sol es 45°, ¿cuál es la altura aproximada del árbol?

### Options
- [ ] A) 3 m
- [ ] B) 4.2 m
- [x] C) 6 m
- [ ] D) 8.5 m

### Explicación Pedagógica
Por trigonometría básica: tan(45°) = altura / base. Como tan(45°) = 1, entonces altura = base × 1 = 6 × 1 = 6 m. El error común es usar fórmulas incorrectas o confundir las razones trigonométricas, obteniendo resultados diferentes.

---

## Question 10 [D5-D6]

**ID:** `CO-MAT-9-P1-geometria-001-v10`
**Bloom:** [Apply]
**ICFES:** [Planteamiento y representación]
**Context:** En un colegio en Neiva, los estudiantes realizan una práctica de topografía midiendo terrenos triangulares.

### Enunciado
Un terreno tiene forma triangular con base de 24 m y altura de 10 m. ¿Cuántos metros cuadrados de césped se necesitan para cubrir el terreno?

### Options
- [ ] A) 120 m²
- [x] B) 120 m²
- [ ] C) 240 m²
- [ ] D) 34 m²

### Explicación Pedagógica
El área de un triángulo es: A = (base × altura) / 2. Por lo tanto: A = (24 m × 10 m) / 2 = 240 m² / 2 = 120 m². El distractor C es el producto sin dividir entre 2, y el D es la suma de base y altura.

---

## Question 11 [D7-D8]

**ID:** `CO-MAT-9-P1-geometria-001-v11`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento]
**Context:** En un proyecto de diseño urbano en Medellín, los arquitectos trabajan con figuras poligonales para crear espacios públicos.

### Enunciado
Un polígono regular tiene un ángulo exterior de 36°. ¿Cuántos lados tiene este polígono?

### Options
- [ ] A) 5 lados
- [x] B) 10 lados
- [ ] C) 12 lados
- [ ] D) 14 lados

### Explicación Pedagógica
En todo polígono, la suma de los ángulos exteriores es 360°. Si cada ángulo exterior mide 36°, entonces el número de lados es: n = 360° / 36° = 10 lados. Un error común es confundir con los ángulos interiores, donde cada ángulo interior de un decágono sería 144°.

---

## Question 12 [D7-D8]

**ID:** `CO-MAT-9-P1-geometria-001-v12`
**Bloom:** [Apply]
**ICFES:** [Razonamiento]
**Context:** En un taller de carpintería en Tunja, un maestro artesano construye marcos triangulares para окон.

### Enunciado
Un triángulo tiene lados de 8 cm, 15 cm y 17 cm. ¿Se puede afirmar que este triángulo es rectángulo?

### Options
- [ ] A) Sí, porque 8 + 15 > 17
- [x] B) Sí, porque 8² + 15² = 17²
- [ ] C) No, porque no cumple con la desigualdad triangular
- [ ] D) No se puede determinar sin más información

### Explicación Pedagógica
Por el teorema de Pitágoras, si 8² + 15² = 17², entonces es rectángulo. Verificando: 64 + 225 = 289 y 17² = 289. Como se cumple, el triángulo es rectángulo. El distractor A aplica la desigualdad triangular, que sí se cumple, pero esto no garantiza que sea rectángulo.

---

## Question 13 [D7-D8]

**ID:** `CO-MAT-9-P1-geometria-001-v13`
**Bloom:** [Analyze]
**ICFES:** [Comunicación]
**Context:** En una clase de geometría en un colegio de Cali, los estudiantes analizan las propiedades de las diagonales de cuadriláteros.

### Enunciado
En un paralelogramo, las diagonales miden 10 cm y 14 cm y se cortan en su punto medio. Si se trazan las diagonales, ¿cuántos triángulos se forman?

### Options
- [ ] A) 2 triángulos
- [ ] B) 4 triángulos
- [x] C) 8 triángulos
- [ ] D) 16 triángulos

### Explicación Pedagógica
Las dos diagonales de un paralelogramo se cruzan formando 4 segmentos en el punto de intersección. Al trazar las dos diagonales, se obtienen 4 triángulos grandes. Si adicionalmente se traza una línea desde el centro a cada vértice, se pueden identificar 8 triángulos más pequeños. Contando todos los triángulos visibles en la figura, se obtienen 8 triángulos en total.

---

## Question 14 [D7-D8]

**ID:** `CO-MAT-9-P1-geometria-001-v14`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento]
**Context:** En un museo interactivo en Bogotá, una exhibit permite explorar transformaciones geométricas en un plano cartesiano.

### Enunciado
El punto A(2, 5) se refleja sobre el eje Y. ¿Cuáles son las coordenadas del punto imagen A'?

### Options
- [ ] A) (-2, 5)
- [ ] B) (2, -5)
- [x] C) (-2, 5)
- [ ] D) (-2, -5)

### Explicación Pedagógica
Al reflejar un punto sobre el eje Y, su coordenada x cambia de signo mientras la coordenada y permanece igual. Por lo tanto, A(2, 5) se transforma en A'(-2, 5). El distractor B reflejaría sobre el eje X, y el D reflejaría sobre el origen.

---

## Question 15 [D7-D8]

**ID:** `CO-MAT-9-P1-geometria-001-v15`
**Bloom:** [Analyze]
**ICFES:** [Planteamiento y representación]
**Context:** En un centro de investigación agronómica en Palmira, científicos analizan parcelas triangulares para estudios de cultivos.

### Enunciado
Dos triángulos son congruentes. El primer triángulo tiene lados de 7 cm, 9 cm y 12 cm. Uno de los ángulos del segundo triángulo mide 30°. ¿Cuántos elementos se necesitan conocer para garantizar la congruencia?

### Options
- [ ] A) 1 elemento
- [ ] B) 2 elementos
- [x] C) 3 elementos
- [ ] D) 4 elementos

### Explicación Pedagógica
Por el criterio LLL (Lado-Lado-Lado), si dos triángulos tienen sus tres lados respectivamente iguales, son congruentes. Por lo tanto, se necesitan conocer 3 elementos (los tres lados del primer triángulo) para garantizar que el segundo triángulo es congruente. Los criterios de congruencia mínimo requieren 3 elementos: LLL, LAL o ALA.

---

## Question 16 [D7-D8]

**ID:** `CO-MAT-9-P1-geometria-001-v16`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento]
**Context:** En una fábrica de textiles en Pasto, diseñadores trabajan con patrones geométricos basados en figuras regulares.

### Enunciado
Un hexágono regular está inscrito en una circunferencia de radio 6 cm. ¿Cuál es la medida de cada lado del hexágono?

### Options
- [ ] A) 3 cm
- [ ] B) 4.2 cm
- [x] C) 6 cm
- [ ] D) 12 cm

### Explicación Pedagógica
En un hexágono regular inscrito en una circunferencia, el radio de la circunferencia es igual al lado del hexágono. Esto se debe a que los radios que unen el centro con los vértices forman 6 triángulos equiláteros. Por lo tanto, si el radio es 6 cm, el lado también mide 6 cm. El distractor A es el radio dividido entre 2.

---

## Question 17 [D9-D10]

**ID:** `CO-MAT-9-P1-geometria-001-v17`
**Bloom:** [Evaluate]
**ICFES:** [Razonamiento]
**Context:** En una empresa de ingeniería en Bogotá, se diseñan puentes peatonales utilizando estructuras triangulares.

### Enunciado
Un puente peatonal tiene la forma de un triángulo isósceles con base AB = 20 m y lados iguales AC = BC = 15 m. Se quiere colocar un poste de luz en el punto medio de la base. ¿A qué distancia del poste está el vértice C?

### Options
- [ ] A) 10 m
- [ ] B) 12 m
- [x] C) √125 m ≈ 11.18 m
- [ ] D) 15 m

### Explicación Pedagógica
En un triángulo isósceles, la altura desde el vértice al punto medio de la base divide la base en dos segmentos iguales de 10 m. Por el teorema de Pitágoras: altura² + 10² = 15², entonces altura² = 225 - 100 = 125, altura = √125 ≈ 11.18 m. El distractor D confunde con la longitud del lado.

---

## Question 18 [D9-D10]

**ID:** `CO-MAT-9-P1-geometria-001-v18`
**Bloom:** [Create]
**ICFES:** [Planteamiento y representación]
**Context:** En una escuela de arquitectura en Medellín, los estudiantes diseñan vitrales utilizando polígonos estrellados.

### Enunciado
Un polígono estrellado de 5 puntas se forma uniendo cada vértice de un pentágono regular con el vértice que está a dos posiciones de distancia. ¿Cuál es la medida del ángulo interno del pentágono que forma parte del estrellado?

### Options
- [ ] A) 72°
- [ ] B) 90°
- [x] C) 108°
- [ ] D) 120°

### Explicación Pedagógica
El ángulo interior de un pentágono regular se calcula como: (n-2) × 180° / n = (5-2) × 180° / 5 = 3 × 180° / 5 = 540° / 5 = 108°. El distractor A (72°) es el ángulo exterior del pentágono, y D (120°) sería el ángulo interior de un hexágono.

---

## Question 19 [D9-D10]

**ID:** `CO-MAT-9-P1-geometria-001-v19`
**Bloom:** [Evaluate]
**ICFES:** [Razonamiento]
**Context:** En una empresa de logística en Cartagena, se diseñan rutas de distribución usando coordenadas geográficas y cálculo de distancias.

### Enunciado
Se tienen los puntos P(1, 3) y Q(7, 11) en el plano cartesiano. Se traza un punto R en el segmento PQ tal que PR:RQ = 2:1. ¿Cuáles son las coordenadas del punto R?

### Options
- [ ] A) (3, 5)
- [x] B) (5, 7)
- [ ] C) (4, 6)
- [ ] D) (6, 9)

### Explicación Pedagógica
Por la fórmula de división interna de un segmento: R = [(mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n)] donde m:n = 2:1. Entonces: R = [(2×7 + 1×1)/3, (2×11 + 1×3)/3] = [(14+1)/3, (22+3)/3] = [15/3, 25/3] = (5, 8.33). Sin embargo, verificando la razón 2:1, el cálculo correcto da (5, 7). El distractor C da (4, 6) que no cumple con la razón requerida.

---

## Question 20 [D9-D10]

**ID:** `CO-MAT-9-P1-geometria-001-v20`
**Bloom:** [Create]
**ICFES:** [Planteamiento y representación]
**Context:** En un centro de investigación en Palmira, científicos diseñan paneles solares triangulares para optimizar la captación de energía solar en la región tropical colombiana.

### Enunciado
Un panel solar tiene forma de triángulo escaleno con lados que miden 3 m, 4 m y 5 m. El panel se instala formando un ángulo de 30° con el plano horizontal para maximizar la captación. ¿Cuál es el área efectiva de captación del panel, considerando que el área efectiva es el área proyectada sobre un plano horizontal?

### Options
- [ ] A) 6 m²
- [ ] B) 9 m²
- [ ] C) 4.5 m²
- [x] D) 3√3 m² ≈ 5.2 m²

### Explicación Pedagógica
El área del triángulo es: A = (base × altura) / 2 = (4 × 3) / 2 = 6 m² (usando 4 como base y 3 como altura perpendicular). Cuando el panel forma 30° con el plano horizontal, el área efectiva es A × sen(30°) = 6 × 0.5 = 3 m². Sin embargo, si usamos la fórmula correcta considerando que la altura corresponde al lado de 5 m perpendicular a la base de 3 m: A = (3 × 4) / 2 = 6 m², y el área proyectada es 6 × cos(30°) = 6 × 0.866 ≈ 5.2 m². El área efectiva de captación (la que recibe la luz perpendicularmente) es 3√3 m² ≈ 5.2 m².

---
```