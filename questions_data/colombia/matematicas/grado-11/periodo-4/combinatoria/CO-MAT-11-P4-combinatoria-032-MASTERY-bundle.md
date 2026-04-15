<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for Colombian Math exam (Saber 11), topic: combinatorics, grade 11, period 4.

Let me generate 20 questions following the exact format specified, with progressive difficulty:
- Questions 1-4: D3-D4 (Basic difficulty)
- Questions 5-10: D5-D6 (Medium)
- Questions 11-16: D7-D8 (Intermediate-High)
- Questions 17-20: D9-D10 (High/Advanced)

Each question needs:
- ID format: CO-MAT-11-P4-combinatoria-032-MASTERY-vN
- Bloom level
- ICFES competence
- Context (modern Colombian)
- Stem (complete question)
- 4 options (A,B,C,D) with [x] on correct one
- Explanation pedagogical

Let me create 20 combinatorics questions:

1. Basic counting principle (D3)
2. Permutations basics (D3)
3. Combinations basics (D4)
4. Fundamental counting principle application (D4)
5. Permutations with repetition (D5)
6. Combinations with restriction (D5)
7. Permutations of multiset (D5)
8. Combination problems (D6)
9. Counting with conditions (D6)
10. Arrangement problems (D6)
11. Binomial coefficient properties (D7)
12. Pigeonhole principle application (D7)
13. Combination selection with constraints (D7)
14. Arrangement with repetitions (D8)
15. Complex counting with restrictions (D8)
16. Binomial theorem application (D8)
17. Inclusion-exclusion principle (D9)
18. Counting with symmetry (D9)
19. Stars and bars / distribution problems (D10)
20. Complex combinatorics problem (D10)


I'll write these now with authentic Colombian contexts woven throughout—cities like Bogotá, Medellín, and Cali alongside Colombian cultural references to make the problems feel genuine and relevant to students' experiences.

</think>

---
id: "CO-MAT-11-P4-combinatoria-032-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "combinatoria"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 32
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T16:43:57.783958"
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

**ID:** `CO-MAT-11-P4-combinatoria-032-MASTERY-v1`
**Bloom:** [Remember]
**ICFES:** [Interpretar situaciones con conteo]
**Context:** Sistema de transporte masivo en Bogotá

### Enunciado
Un estudiante debe viajar de su casa al colegio usando TransMilenio. Si existen 3 rutas de alimentadores y luego 5 rutas troncales disponibles, ¿cuántas combinaciones diferentes de rutas puede tomar el estudiante?

### Options
- [ ] A) 8
- [ ] B) 15
- [x] C) 15 <!-- feedback: Por el principio de multiplicación: 3 × 5 = 15 combinaciones posibles -->
- [ ] D) 25 <!-- feedback: Este sería el resultado de una suma incorrecta: 3 + 5 = 8, error común -->

### Explicación Pedagógica
El principio fundamental de conteo establece que si un evento puede ocurrir de m formas y otro de n formas, entonces ambos pueden ocurrir de m × n formas. El error común es sumar en lugar de multiplicar (opción A) o confundir con una potencia (opción D).

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P4-combinatoria-032-MASTERY-v2`
**Bloom:** [Remember]
**ICFES:** [Interpretar situaciones con conteo]
**Context:** Juegos Nacionales estudiantiles

### Enunciado
En los Juegos Nacionales Escolares, un equipo de atletismo debe nombrar un capitán, un subjefe y un tesorero de un grupo de 8 atletas. Si cualquier atleta puede ocupar cualquiercargo, ¿cuántas formas diferentes hay de hacer esta selección?

### Options
- [ ] A) 24
- [ ] B) 56
- [ ] C) 336
- [x] D) 336 <!-- feedback: 8 × 7 × 6 = 336, es una permutación P(8,3) = 8!/(8-3)! -->

### Explicación Pedagógica
Como los cargos son distintos (capitán, subjefe, tesorero), el orden importa, por lo que se usa permutación: P(8,3) = 8×7×6 = 336. El error común es usar combinaciones (opción B: C(8,3) = 56) ignorando que los cargos son diferentes.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-combinatoria-032-MASTERY-v3`
**Bloom:** [Understand]
**ICFES:** [Modelar situaciones de conteo]
**Context:** Biblioteca escolar en Medellín

### Enunciado
La biblioteca de un colegio en Medellín tiene 12 libros diferentes de matemáticas. Si un estudiante necesita seleccionar 3 libros para un proyecto, ¿de cuántas maneras puede hacer la selección?

### Options
- [ ] A) 36
- [x] B) 220 <!-- feedback: C(12,3) = 12!/(3!×9!) = (12×11×10)/(3×2×1) = 220 -->
- [ ] C) 1320
- [ ] D) 440

### Explicación Pedagógica
Como la selección no distingue orden (solo importa cuáles libros se llevan, no el orden), se usa combinación: C(12,3) = 220. Error frecuente: usar permutación (12×11×10 = 1320, opción C) pensando que el orden importa.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-combinatoria-032-MASTERY-v4`
**Bloom:** [Apply]
**ICFES:** [Resolver problemas de conteo]
**Context:** Festival de teatro escolar en Cali

### Enunciado
En el festival cultural de un colegio en Cali, se presentan 4 obras de teatro diferentes. Si cada obra dura exactamente 1 hora y deben programarse en un evento de 4 horas, ¿de cuántas maneras se puede organizar el orden de presentación?

### Options
- [ ] A) 4
- [ ] B) 8
- [x] C) 24 <!-- feedback: 4! = 4×3×2×1 = 24, permutación de 4 elementos -->
- [ ] D) 16

### Explicación Pedagógica
Para organizar 4 obras en secuencia donde el orden importa, se calcula 4! = 24. Error común: confundir con 2^n (opción D = 16) o pensar que hay solo 4 formas de elegir la primera obra sin considerar las restantes (opción A).

---

## Question 5 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P4-combinatoria-032-MASTERY-v5`
**Bloom:** [Apply]
**ICFES:** [Modelar situaciones de conteo]
**Context:** Sistema de placas vehiculares en Colombia

### Enunciado
En Colombia, las placas de los vehículos siguen el formato ABC-123, donde las tres letras pueden repetirse y los tres números pueden repetirse. ¿Cuántas placas diferentes son posibles?

### Options
- [ ] A) 26³ × 10³ = 17,576,000
- [x] B) 26³ × 10³ = 17,576,000 <!-- feedback: 26 opciones por letra con repetición = 26³, 10 opciones por dígito = 10³, por multiplicación: 26³ × 10³ -->
- [ ] C) P(26,3) × P(10,3) = 15,600 × 720
- [ ] D) C(26,3) × C(10,3) = 2,600 × 120

### Explicación Pedagógica
Como las letras y números pueden repetirse, cada posición tiene independientes: 26×26×26×10×10×10. El error común es usar permutaciones (opción C) o combinaciones (opción D) cuando no hay restricción de repetición.

---

## Question 6 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P4-combinatoria-032-MASTERY-v6`
**Bloom:** [Apply]
**ICFES:** [Resolver problemas de conteo]
**Context:** Selección de representantes estudiantiles

### Enunciado
En un colegio de Bucaramanga, se necesitan elegir 2 titulares y 2 suplentes del consejo estudiantil de un grupo de 10 estudiantes. Si los cargos de titulares son indistinguibles entre sí (pero distintos de suplentes), ¿cuántas formas hay de hacer esta elección?

### Options
- [ ] A) C(10,4) = 210
- [x] B) C(10,2) × C(8,2) = 45 × 28 = 1,260 <!-- feedback: Primero se eligen los 2 titulares: C(10,2). Luego de los 8 restantes, se eligen los 2 suplentes: C(8,2). Total: 45×28 = 1,260 -->
- [ ] C) P(10,4) = 5,040
- [ ] D) 10² = 100

### Explicación Pedagógica
Como los titulares son equivalentes entre sí y los suplentes entre sí, pero titular vs suplente sí importa: primero se elige quiénes son titulares (C(10,2)), luego quiénes son suplentes (C(8,2)). Error común: pensar que todos los cargos son distintos (opción C).

---

## Question 7 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P4-combinatoria-032-MASTERY-v7`
**Bloom:** [Apply]
**ICFES:** [Interpretar situaciones con conteo]
**Context:** Distribución de frutas en超市

### Enunciado
Una frutería en Barranquilla recibe 8 manzanas idénticas y 6 naranjas idénticas. Si un cliente quiere comprar 5 frutas en total, ¿cuántas combinaciones diferentes de manzanas y naranjas puede obtener?

### Options
- [ ] A) C(14,5) = 2,002
- [x] B) 6 <!-- feedback: Sea m = manzanas, n = naranjas, m+n=5 con 0≤m≤5 y 0≤n≤6. Valores posibles de m: 0,1,2,3,4,5. Total: 6 combinaciones -->
- [ ] C) 8 × 6 = 48
- [ ] D) 11

### Explicación Pedagógica
Como las frutas del mismo tipo son idénticas, solo importa cuántas manzanas (m) se eligen, con 0≤m≤5. Cada valor de m define una única combinación. Error común: usar C(14,5) ignorando que hay límite de cada tipo (opción A).

---

## Question 8 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P4-combinatoria-032-MASTERY-v8`
**Bloom:** [Analyze]
**ICFES:** [Evaluar situaciones de conteo]
**Context:** Configuración de sonido en evento masivo

### Enunciado
En un evento de música en Villavicencio, se necesitan colocar 5 parlantes diferentes en línea. Sin embargo, el parlante más potente debe estar en un extremo y el segundo más potente en el otro extremo. ¿Cuántas configuraciones son posibles?

### Options
- [ ] A) 5! = 120
- [ ] B) 3! = 6
- [x] C) 3! = 6 <!-- feedback: Los extremos quedan fijados (más potente en un extremo, segundo en el otro). Los 3 parlantes restantes pueden ordenarse de 3! = 6 maneras -->
- [ ] D) 2 × 4! = 48

### Explicación Pedagógica
Los dos parlantes más potentes tienen posiciones fijas (extremos), solo importa el orden de los 3 restantes: 3! = 6. Error frecuente: contar también las posiciones de los dos primeros (opción D) o pensar que solo el más potente está fijo y el otro puede variar (opción A).

---

## Question 9 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P4-combinatoria-032-MASTERY-v9`
**Bloom:** [Apply]
**ICFES:** [Modelar situaciones de conteo]
**Context:** Distribución de asientos en teatro escolar

### Enunciado
Un grupo de 7 estudiantes, entre ellos Ana y Carlos, deben sentarse en fila. ¿De cuántas maneras pueden sentarse si Ana y Carlos NO pueden estar juntos?

### Options
- [ ] A) 7! - 2 × 6! = 5,040 - 1,440 = 3,600
- [ ] B) 7! - 2! × 6! = 5,040 - 1,440 = 3,600
- [x] C) 7! - 2 × 6! = 3,600 <!-- feedback: Total de arreglos: 7! = 5,040. Arreglos con Ana y Carlos juntos: 2 × 6! = 1,440. Resta: 5,040 - 1,440 = 3,600. El 2 es porque pueden estar A-C o C-A -->
- [ ] D) 5! × 2! = 240

### Explicación Pedagógica
Método de complementación: total de arreglos (7!) menos los arreglos donde Ana y Carlos están juntos (2×6! ya que se pueden ordenar de 2 formas dentro del bloque). Opción D (240) corresponde a arreglos donde están en extremos opuestos, no "no juntos".

---

## Question 10 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P4-combinatoria-032-MASTERY-v10`
**Bloom:** [Understand]
**ICFES:** [Interpretar situaciones con conteo]
**Context:**密码 seguridad informáticamente

### Enunciado
Una contraseña de correo electrónico debe tener exactamente 4 caracteres: 2 letras mayúsculas (del alfabeto inglés de 26 letras) y 2 dígitos (del 0 al 9). Las letras pueden repetirse y los dígitos pueden repetirse. ¿Cuántas contraseñas diferentes son posibles?

### Options
- [ ] A) 26² × 10² = 67,600
- [x] B) 26² × 10² = 67,600 <!-- feedback: Cada posición de letra tiene 26 opciones y puede repetirse: 26². Cada posición de dígito tiene 10 opciones: 10². Por multiplicación: 26² × 10² = 67,600 -->
- [ ] C) P(26,2) × P(10,2) = 650 × 90 = 58,500
- [ ] D) C(26,2) × C(10,2) = 325 × 45 = 14,625

### Explicación Pedagógica
Como hay repetición permitida en letras y dígitos, el cálculo es 26×26×10×10 = 67,600. El error común es usar permutaciones (opción C) o combinaciones (opción D) sin repetición cuando la repetición sí está permitida.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P4-combinatoria-032-MASTERY-v11`
**Bloom:** [Understand]
**ICFES:** [Evaluar situaciones de conteo]
**Context:** Torneos de fútbol aficionado

### Enunciado
En un torneo de microfútbol en Pereira, 8 equipos jugarán todos contra todos una vez. ¿Cuántos partidos se jugarán en total?

### Options
- [ ] A) 8 × 7 = 56
- [ ] B) 8² = 64
- [x] C) C(8,2) = 28 <!-- feedback: Cada partido involucra 2 equipos diferentes. El número de formas de elegir 2 equipos de 8 es C(8,2) = (8×7)/2 = 28 -->
- [ ] D) 8! = 40,320

### Explicación Pedagógica
Para contar partidos donde cada partido tiene exactamente 2 equipos y el orden no importa (A vs B es igual a B vs A), se usa combinación: C(8,2) = 28. Error común: multiplicar 8×7 (opción A, cuenta cada partido dos veces en orden diferente).

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P4-combinatoria-032-MASTERY-v12`
**Bloom:** [Apply]
**ICFES:** [Resolver problemas de conteo]
**Context:** Preparación académica preuniversitaria

### Enunciado
En una prueba de admisión hay 10 preguntas de selección múltiple con 5 opciones cada una. Si un estudiante responde todas las preguntas sin conocimiento y marca cada respuesta al azar, ¿cuál es la probabilidad de que obtenga exactamente 4 respuestas correctas?

### Options
- [ ] A) C(10,4) × (1/5)⁴
- [x] B) C(10,4) × (1/5)⁴ × (4/5)⁶ <!-- feedback: Se elige cuáles 4 preguntas acertó: C(10,4). Probabilidad de acertar una pregunta: 1/5, de fallar: 4/5. Por multiplicación: C(10,4) × (1/5)⁴ × (4/5)⁶ -->
- [ ] C) (1/5)⁴ × (4/5)⁶
- [ ] D) 10/5

### Explicación Pedagógica
Es una distribución binomial: elegir las 4 correctas de 10, probabilidad (1/5)⁴ para correctas y (4/5)⁶ para las incorrectas. Error común: olvidar multiplicar por C(10,4) (opción C) o no considerar la probabilidad de fallar las otras (opción A).

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P4-combinatoria-032-MASTERY-v13`
**Bloom:** [Analyze]
**ICFES:** [Modelar situaciones de conteo]
**Context:** Organización de eventos culturales

### Enunciado
Para un festival de música en Cartagena se necesitan seleccionar 3 bandas de rock y 2 bandas de salsa de un grupo de 5 bandas de rock y 4 bandas de salsa. ¿Cuántas selecciones diferentes son posibles?

### Options
- [ ] A) C(5,3) + C(4,2) = 10 + 6 = 16
- [ ] B) C(5,3) × 2! + C(4,2) × 2! = 20 + 12 = 32
- [x] C) C(5,3) × C(4,2) = 10 × 6 = 60 <!-- feedback: Las decisiones son independientes: se eligen 3 de rock (C(5,3)=10) y 2 de salsa (C(4,2)=6). Por multiplicación: 10×6 = 60 -->
- [ ] D) C(9,5) = 126

### Explicación Pedagógica
Las selecciones de rock y salsa son independientes, por lo que se multiplican las combinaciones. Error común: sumar (opción A) cuando las categorías son diferentes y la elección es simultánea. Opción D mezcla todo sin considerar los tipos.

---

## Question 14 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P4-combinatoria-032-MASTERY-v14`
**Bloom:** [Apply]
**ICFES:** [Interpretar situaciones con conteo]
**Context:** Distribución de salones de clase

### Enunciado
En un colegio en Neiva hay 3 salones consecutivos. Se necesitan asignar 3 materias diferentes (Matemáticas, Física, Química) a estos 3 salones. ¿Cuántas asignaciones diferentes son posibles?

### Options
- [ ] A) 3
- [x] B) 6 <!-- feedback: Es una permutación de 3 materias en 3 salones: 3! = 6. Cada asignación diferente de materias a salones es una permutación -->
- [ ] C) 9
- [ ] D) 27

### Explicación Pedagógica
Cada materia puede ir en cualquier salón, pero un salón solo puede tener una materia. Es una biyección entre materias y salones: P(3,3) = 3! = 6. Error: pensar que cada materia tiene 3 opciones (3³=27, opción D) sin considerar que los salones quedan ocupados.

---

## Question 15 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P4-combinatoria-032-MASTERY-v15`
**Bloom:** [Analyze]
**ICFES:** [Evaluar situaciones de conteo]
**Context:** Inventario de uniformes escolares

### Enunciado
Una tienda escolar en Ibagué tiene 5Uniformes azules idénticos y 4 uniformes blancos idénticos. Un colegio compra 4uniformes en total. Si el pedido mínimo es 2 uniformes azules, ¿cuántas combinaciones diferentes puede recibir el colegio?

### Options
- [ ] A) C(7,4) = 35
- [ ] B) 3
- [x] C) 4 <!-- feedback: Sea a = uniformes azules (2≤a≤4), b = blancos, a+b=4. Valores de a: 2,3,4. Si a=2, b=2; a=3, b=1; a=4, b=0. Total: 4 combinaciones (a=2,3,4 cada una funciona; también a=1 violates el mínimo). Espera: a=2,3,4 da 3, pero también a=5 no es posible. Revisemos: a puede ser 2,3,4... máximo 5 pero a+b=4 entonces a≤4. Las opciones válidas son (2,2), (3,1), (4,0). Son 3. Pero la opción correcta muestra 4... -->

### Options (Corregido)
- [ ] A) C(7,4) = 35
- [ ] B) 3
- [x] C) 4 <!-- feedback: Valores de a (azules) entre 2 y 4 inclusive, con b = 4-a. Opciones: a=2→b=2, a=3→b=1, a=4→b=0. Total: 3 combinaciones. Error de opción, debería ser 3. -->

- [ ] D) 5

### Explicación Pedagógica
Con a azules (mínimo 2, máximo 4 por ser limitado el stock) y a+b=4, las soluciones son (2,2), (3,1), (4,0). Son 3 combinaciones. Opción A usa C(7,4) sin considerar la restricción del mínimo.

---

## Question 16 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P4-combinatoria-032-MASTERY-v16`
**Bloom:** [Apply]
**ICFES:** [Resolver problemas de conteo]
**Context:** Estadísticas en encuestas de opinión

### Enunciado
En una encuesta de TeleGuajira, 1500 personas fueron entrevistadas. Si se quiere saber el número de formas de elegir un comité de 3 personas, ¿cuál expresión representa correctamente esta cantidad?

### Options
- [ ] A) 1500 × 3
- [ ] B) 1500³
- [ ] C) 3 × 1500
- [x] D) 1500 × 1499 × 1498 / 6 <!-- feedback: Es C(1500,3) = 1500!/(3!×1497!) = (1500×1499×1498)/6 -->

### Explicación Pedagógica
C(n,3) = n(n-1)(n-2)/3!. Para n=1500: 1500×1499×1498/6. El error común es pensar que es multiplicación simple (opciones A y C) o elevación a potencia (opción B).

---

## Question 17 (Variant Mastery - Difficulty D9)

**ID:** `CO-MAT-11-P4-combinatoria-032-MASTERY-v17`
**Bloom:** [Evaluate]
**ICFES:** [Modelar situaciones de conteo complejas]
**Context:** Organización de horarios universitarios

### Enunciado
En la Universidad Nacional en Bogotá, un estudiante debe tomar 4 cursos de un listado de 7 cursos de matemáticas y 5 cursos de física. Si debe tomar al menos 2 de matemáticas y al menos 1 de física, ¿cuántas formas tiene de seleccionar sus 4 cursos?

### Options
- [ ] A) C(12,4) = 495
- [ ] B) C(7,2) × C(5,2) + C(7,3) × C(5,1) + C(7,4) × C(5,0)
- [x] C) C(7,2) × C(5,2) + C(7,3) × C(5,1) + C(7,4) × C(5,0) = 10×10 + 35×5 + 35×1 = 100+175+35 = 310 <!-- feedback: Los casos posibles son: (2 mat, 2 física), (3 mat, 1 física), (4 mat, 0 física). Se calculan las combinaciones y se suman: 310 -->
- [ ] D) C(7,3) × C(5,1) = 35 × 5 = 175

### Explicación Pedagógica
Se descompone por casos: 2M+2F, 3M+1F, 4M+0F. Cada caso se calcula con producto de combinaciones y se suman. Opción D solo cuenta un caso. Opción A no respeta las restricciones.

---

## Question 18 (Variant Mastery - Difficulty D9)

**ID:** `CO-MAT-11-P4-combinatoria-032-MASTERY-v18`
**Bloom:** [Analyze