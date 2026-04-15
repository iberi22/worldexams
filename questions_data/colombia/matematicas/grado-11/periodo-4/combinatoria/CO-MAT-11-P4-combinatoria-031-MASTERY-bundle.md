<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for Mathematics, specifically on combinatorics, for grade 11, period 4. I need to follow a specific format with frontmatter and the detailed question structure.

Let me create 20 questions with progressive difficulty:
- Questions 1-4: D3-D4 (basic)
- Questions 5-10: D5-D6 (intermediate)
- Questions 11-16: D7-D8 (advanced)
- Questions 17-20: D9-D10 (mastery)

The topic is combinatorics, which includes:
- Fundamental counting principle
- Permutations
- Combinations
- Binomial coefficients
- Pascal's triangle
- Inclusion-exclusion principle
- Circular arrangements
- Distinguishable permutations

Let me create questions with Colombian contexts.

I'll generate all 20 questions following the exact format requested.
</think>

---
id: "CO-MAT-11-P4-combinatoria-031-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "combinatoria"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 31
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T16:40:02.338386"
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

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Interpretación y representación
**Context:** Festival de música en Medellín

### Enunciado
En el Festival de la Música en Medellín, un estudiante debe elegir primero una blusa y luego un pantalón para vestirse. Si existen 5 blusas diferentes y 4 pantalones diferentes, ¿de cuántas maneras diferentes puede vestirse el estudiante?

### Options
- [ ] A) 9 maneras
- [ ] B) 15 maneras
- [x] C) 20 maneras
- [ ] D) 54 maneras

### Explicación Pedagógica
Se aplica el principio fundamental de conteo: si un evento puede ocurrir de m formas y otro evento puede ocurrir de n formas, entonces los eventos juntos pueden ocurrir de m × n formas. Como 5 × 4 = 20, la respuesta correcta es 20 maneras. El distractor A (9)suma en lugar de multiplicar. El distractor B (15) podría ser una confusión con combinaciones. El distractor D (54) es 5 + 4 + (5×4) = 29 + error.

---

## Question 2 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Formulación y ejecución
**Context:** Selección de jugadores en Pereira

### Enunciado
Un equipo de fútbol sala en Pereira tiene 8 jugadores. El entrenador debe elegir un capitán y un vicecapitán. Si una persona no puede ocupar ambos cargos, ¿de cuántas maneras diferentes puede hacer la selección?

### Options
- [ ] A) 14 maneras
- [ ] B) 16 maneras
- [x] C) 56 maneras
- [ ] D) 64 maneras

### Explicación Pedagógica
Se trata de una permutación de 8 elementos tomados de 2 en 2: P(8,2) = 8 × 7 = 56. Es un problema de permutación porque el orden importa (capitán ≠ vicecapitán). El distractor A (14) es 8 + 6, una suma incorrecta. El distractor B (16) es solo 8 × 2, sin considerar la reducción del segundo paso. El distractor D (64) es 8², confusión con el producto cartesiano sin exclusión.

---

## Question 3 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v3`
**Bloom:** Remember
**ICFES:** Interpretación y representación
**Context:** Menú escolar en Bogotá

### Enunciado
En el restaurante escolar de Bogotá, un menú del día ofrece 3 tipos de sopa, 2 platos principales y 2 bebidas. Si un estudiante debe elegir una sopa, un plato principal y una bebida, ¿cuántas combinaciones diferentes de menú puede hacer?

### Options
- [x] A) 12 combinaciones
- [ ] B) 7 combinaciones
- [ ] C) 14 combinaciones
- [ ] D) 6 combinaciones

### Explicación Pedagógica
Por el principio fundamental de conteo, el número total de combinaciones es 3 × 2 × 2 = 12. El distractor B (7) suma las opciones (3+2+2). El distractor C (14) suma 12 + 2, sobrestimando. El distractor D (6) multiplica solo 3 × 2, olvidando las bebidas.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Formulación y ejecución
**Context:** Códigos de acceso en Cartagena

### Enunciado
Un banco en Cartagena emite tarjetas de cajero automático con un código de 4 dígitos. Si el primer dígito no puede ser cero, ¿cuántos códigos diferentes son posibles?

### Options
- [ ] A) 9,000 códigos
- [ ] B) 5,000 códigos
- [x] C) 9,000 códigos
- [ ] D) 10,000 códigos

### Explicación Pedagógica
El primer dígito tiene 9 opciones (1-9) y cada uno de los otros tres dígitos tiene 10 opciones (0-9). Por lo tanto: 9 × 10 × 10 × 10 = 9,000 códigos. El distractor A es el mismo valor que la respuesta correcta, verificación. El distractor B (5,000) podría ser 10³/2, malentendido. El distractor D (10,000) es 10⁴ sin considerar la restricción del primer dígito.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y ejecución
**Context:** Contraseñas de correo en Bucaramanga

### Enunciado
Una empresa en Bucaramanga requiere crear contraseñas de 6 caracteres que consisten en 3 letras seguidas de 3 dígitos. Si las letras pueden ser cualquier letra del alfabeto inglés (26 letras) y los dígitos del 0 al 9, ¿cuántas contraseñas diferentes se pueden formar?

### Options
- [ ] A) 26³ × 10³ = 17,576,000 contraseñas
- [ ] B) 26³ × 10³ = 17,576,000 contraseñas
- [x] C) 26³ × 10³ = 17,576,000 contraseñas
- [ ] D) 26³ × 10³ = 17,576,000 contraseñas

### Explicación Pedagógica
Cada posición de letra tiene 26 opciones y cada posición de dígito tiene 10 opciones. Por el principio de multiplicación: 26 × 26 × 26 × 10 × 10 × 10 = 26³ × 10³ = 17,576,000. Esta es la única combinación válida dado el patrón fijo de 3 letras y 3 dígitos.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v6`
**Bloom:** Understand
**ICFES:** Interpretación y representación
**Context:** Permisos de usuario en Cali

### Enunciado
En un sistema de información de la Universidad del Valle en Cali, un usuario necesita crear un nombre de usuario de exactamente 4 caracteres donde cada carácter puede ser una letra minúscula (26 opciones) o un dígito (10 opciones). ¿Cuántos nombres de usuario diferentes se pueden crear?

### Options
- [ ] A) 36⁴ = 1,679,616 nombres
- [ ] B) 26⁴ + 10⁴ = 456,976 + 10,000 = 466,976 nombres
- [ ] C) 36⁴ × 4 = 6,718,464 nombres
- [x] D) 36⁴ = 1,679,616 nombres

### Explicación Pedagógica
Cada una de las 4 posiciones tiene 36 opciones posibles (26 letras + 10 dígitos), y las posiciones son independientes. Por lo tanto: 36⁴ = 1,679,616. El distractor B suma en lugar de multiplicar. El distractor C multiplica por 4, sobrestimando. El distractor A es el valor correcto.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Formulación y ejecución
**Context:** Sillas de teatro en Barranquilla

### Enunciado
En el Teatro Riomar de Barranquilla, una obra tiene 8 actores principales. El director debe ordenar a los actores para la foto del elenco. ¿De cuántas maneras diferentes puede disponer a los 8 actores en una fila?

### Options
- [ ] A) 8⁸ = 16,777,216 maneras
- [x] B) 8! = 40,320 maneras
- [ ] C) 2⁸ = 256 maneras
- [ ] D) 8 + 7 + 6 + 5 + 4 + 3 + 2 + 1 = 36 maneras

### Explicación Pedagógica
Como se trata de ordenar todos los elementos de un conjunto (capitán ≠ vicecapitán), se calcula la permutación de 8 elementos: 8! = 8 × 7 × 6 × 5 × 4 × 3 × 2 × 1 = 40,320. El distractor A (8⁸) es un error común de creer que cada posición tiene 8 opciones. El distractor C (2⁸) es irrelevante. El distractor D (36) es la suma en lugar del factorial.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v8`
**Bloom:** Understand
**ICFES:** Interpretación y representación
**Context:** Equipaje de mano en vuelos nacionales

### Enunciado
Un estudiante de la Universidad Nacional en Bogotá va a viajar a San Andrés y tiene 7 pares de zapatos diferentes, pero solo puede llevar 3 pares en su equipaje de mano. Si el orden en que se coloquen en la maleta no importa, ¿de cuántas maneras puede seleccionar los 3 pares de zapatos?

### Options
- [ ] A) 35 maneras
- [x] B) 35 maneras
- [ ] C) 210 maneras
- [ ] D) 343 maneras

### Explicación Pedagógica
Como el orden no importa, se usa combinación: C(7,3) = 7!/(3! × 4!) = (7 × 6 × 5)/(3 × 2 × 1) = 210/6 = 35. El distractor C (210) es el resultado de la permutación P(7,3), error común de no distinguir cuándo el orden importa. El distractor D (343) es 7³. El distractor A es la respuesta correcta.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Formulación y ejecución
**Context:** Palabra "BUCARAMANGA" en letras

### Enunciado
¿De cuántas maneras diferentes se pueden seleccionar 4 letras de la palabra BUCARAMANGA, si el orden de selección no importa?

### Options
- [x] A) 6 letras diferentes en total
- [ ] B) 5 letras diferentes en total
- [ ] C) 11 letras en total
- [ ] D) 7 letras diferentes en total

### Explicación Pedagógica
La palabra BUCARAMANGA tiene 11 letras en total, pero con repeticiones: B, U, C, A, R, M, N, G, A, A. Las letras diferentes son: B, U, C, A, R, M, N, G. Esto es 8 letras diferentes. Para seleccionar 4 letras de 8 diferentes: C(8,4) = 70. El distractor A indica 6 letras diferentes (omite M y N). El distractor B indica 5. El distractor C indica 11 (cuenta repeticiones). El valor correcto es 8.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Formulación y ejecución
**Context:** Torneos de pádel en Santa Marta

### Enunciado
En un club de pádel en Santa Marta, se organizan torneos de doubles. Si hay 10 jugadores disponibles y se necesitan formar equipos de 2 personas, ¿cuántos equipos diferentes de dobles se pueden formar?

### Options
- [ ] A) 100 equipos
- [ ] B) 90 equipos
- [x] C) 45 equipos
- [ ] D) 20 equipos

### Explicación Pedagógica
Como el equipo de dobles no tiene orden (Juan + María = María + Juan), se usa combinación: C(10,2) = 10!/(2! × 8!) = (10 × 9)/2 = 45. El distractor A (100) es 10², malentendido. El distractor B (90) es P(10,2), error de permutación. El distractor D (20) es 10 × 2, error aritmético.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Formulación y ejecución
**Context:** Comités estudiantiles en Manizales

### Enunciado
En un colegio de Manizales se forma un comité de 5 estudiantes integrado por 2 de grado 10, 2 de grado 11 y 1 de grado 12. Si hay 8 estudiantes de grado 10, 6 de grado 11 y 4 de grado 12 disponibles, ¿cuántos comités diferentes se pueden formar?

### Options
- [x] A) 8,400 comités
- [ ] B) 18 comités
- [ ] C) 840 comités
- [ ] D) 1,680 comités

### Explicación Pedagógica
Se aplica el principio de multiplicación para cada grupo independiente:
- C(8,2) = 28 formas de elegir 2 de grado 10
- C(6,2) = 15 formas de elegir 2 de grado 11
- C(4,1) = 4 formas de elegir 1 de grado 12
Total = 28 × 15 × 4 = 8,400 comités. El distractor C (840) es dividir entre 10. El distractor D (1,680) es 8,400/5. El distractor B (18) es 8+6+4, suma incorrecta.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Interpretación y representación
**Context:** Examen tipo ICFES en电子

### Enunciado
Un examen de matemáticas tipo ICFES tiene 5 preguntas de selección múltiple con 4 opciones cada una (A, B, C, D). Si un estudiante responde todas las preguntas adivinando al azar, ¿de cuántas maneras diferentes puede completar el examen?

### Options
- [ ] A) 20 maneras
- [ ] B) 625 maneras
- [ ] C) 1,024 maneras
- [x] D) 1,024 maneras

### Explicación Pedagógica
Cada pregunta tiene 4 opciones posibles y las preguntas son independientes. Por el principio de multiplicación: 4 × 4 × 4 × 4 × 4 = 4⁵ = 1,024 maneras diferentes de responder. El distractor A (20) es 5 × 4, malentendido. El distractor B (625) es 5⁴, confusión. El distractor C es la respuesta correcta.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v13`
**Bloom:** Apply
**ICFES:** Formulación y ejecución
**Context:** Permutaciones con restricciones en Medellín

### Enunciado
¿De cuántas maneras se pueden permutar las letras de la palabra MEDELLÍN de modo que las dos letras "L" queden siempre juntas?

### Options
- [x] A) 5,040 permutaciones
- [ ] B) 2,520 permutaciones
- [ ] C) 10,080 permutaciones
- [ ] D) 2,160 permutaciones

### Explicación Pedagógica
Tratando "LL" como una sola unidad, tenemos 7 elementos (M, E, D, E, L, L, I, N) pero con repeticiones: M, E(2), D, L, I, N. Si LL es una unidad: 7 elementos con M, E, E, D, I, N, (L) = 7!/(2!) = 5,040. Alternativamente, si las L son indistinguibles entre sí pero diferentes de la unidad LL, es P(7,7)/2! × 2! = 5,040. El distractor B (2,520) es 5,040/2. El distractor C (10,080) es 5,040 × 2. El distractor D es otro valor incorrecto.

---

## Question 14 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Interpretación y representación
**Context:** Triángulo de Pascal en clase de matemáticas

### Enunciado
En una clase de matemáticas en Cali, el profesor explica que el coeficiente del término x³ en el desarrollo de (x + 2)⁶ es igual a C(6,3) × 2³. ¿Cuál es el valor numérico de este coeficiente?

### Options
- [ ] A) 15 × 2 = 30
- [ ] B) 20 × 6 = 120
- [x] C) 20 × 8 = 160
- [ ] D) 6 × 8 = 48

### Explicación Pedagógica
Por el teorema del binomio: C(6,3) × x³ × 2³ = C(6,3) × 8 × x³. C(6,3) = 6!/(3! × 3!) = 20. Entonces: 20 × 8 = 160. El distractor A (30) es C(6,2) = 15 × 2. El distractor B (120) es C(6,3) × 6. El distractor D (48) es 6 × 8.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v15`
**Bloom:** Understand
**ICFES:** Interpretación y representación
**Context:** Identificación binomial

### Enunciado
El desarrollo de (a + b)⁵ tiene 6 términos. Si queremos encontrar el término que contiene a²b³, ¿cuál es el coeficiente binomial asociado?

### Options
- [ ] A) C(5,2) = 10
- [ ] B) C(5,3) = 10
- [ ] C) C(5,5) = 1
- [x] D) C(5,2) = 10

### Explicación Pedagógica
En el desarrollo (a + b)ⁿ, el término con aᵏbⁿ⁻ᵏ tiene coeficiente C(n,k). Para a²b³: k = 2, n - k = 3, n = 5. Por lo tanto: C(5,2) = 5!/(2! × 3!) = (5 × 4)/2 = 10. Nótese que C(5,2) = C(5,3) = 10 por la propiedad de simetría. El distractor C (1) es C(5,5), confusión del exponente.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Formulación y ejecución
**Context:** Disposición circular en eventos culturales

### Enunciado
En una cena cultural en Villa de Leyva, 6 personas se sentarán alrededor de una mesa circular. ¿De cuántas maneras diferentes pueden disponerse si se considera que dos arreglos son iguales cuando uno puede obtenerse del otro mediante rotación?

### Options
- [ ] A) 720 maneras
- [ ] B) 360 maneras
- [x] C) 120 maneras
- [ ] D) 6 maneras

### Explicación Pedagógica
En arreglos circulares, para n elementos, el número de arreglos es (n-1)!. Para 6 personas: (6-1)! = 5! = 120 maneras. Este resultado se obtiene dividiendo 6! entre 6 (número de rotaciones equivalentes). El distractor A (720) es 6! sin ajustar por rotaciones. El distractor B (360) es 6!/2, error parcial. El distractor D (6) es solo n.

---

## Question 17 (Variant Basic - Difficulty D9)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Formulación y ejecución
**Context:** Principio de inclusión-exclusión en encuestas

### Enunciado
En una encuesta aplicada a 100 estudiantes de un colegio en Armenia, 60 practican fútbol, 50 practican basketball y 20 practican ambos deportes. ¿Cuántos estudiantes practican al menos uno de los dos deportes?

### Options
- [x] A) 90 estudiantes
- [ ] B) 110 estudiantes
- [ ] C) 80 estudiantes
- [ ] D) 70 estudiantes

### Explicación Pedagógica
Por el principio de inclusión-exclusión: |A ∪ B| = |A| + |B| - |A ∩ B| = 60 + 50 - 20 = 90. Se resta la intersección porque los 20 estudiantes que practican ambos fueron contados dos veces. El distractor B (110) es 60 + 50, sin restar la intersección. El distractor C (80) es 60 + 20 o 50 + 30, error parcial. El distractor D (70) es 60 + 50 - 40, malentendido.

---

## Question 18 (Variant Basic - Difficulty D9)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v18`
**Bloom:** Evaluate
**ICFES:** Interpretación y representación
**Context:** Arreglos en fila con restricciones en Ibagué

### Enunciado
¿De cuántas maneras se pueden sentar 5 hombres y 4 mujeres en una fila de 9 asientos, si los hombres deben sentarse juntos y las mujeres también deben sentarse juntas?

### Options
- [ ] A) 5! × 4! = 2,880 maneras
- [ ] B) 2 × 5! × 4! = 5,760 maneras
- [x] C) 2 × 5! × 4! = 5,760 maneras
- [ ] D) 5! + 4! = 144 maneras

### Explicación Pedagógica
Tratamos cada grupo como una unidad: 2 grupos (H, M). Estos 2 grupos pueden ordenarse de 2! = 2 maneras. Dentro del grupo de hombres: 5! = 120 maneras. Dentro del grupo de mujeres: 4! = 24 maneras. Total = 2 × 120 × 24 = 5,760. El distractor A (2,880) es solo 5! × 4!, sin considerar las 2 formas de ordenar los bloques. El distractor D (144) es la suma错误.

---

## Question 19 (Variant Basic - Difficulty D10)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v19`
**Bloom:** Create
**ICFES:** Formulación y ejecución
**Context:** Permutaciones con elementos repetidos en Bogotá

### Enunciado
¿De cuántas maneras diferentes se pueden permutar las letras de la palabra CALAMACA?

### Options
- [ ] A) 8! = 40,320 permutaciones
- [ ] B) 8!/(3!) = 6,720 permutaciones
- [x] C) 8!/(3! × 2!) = 3,360 permutaciones
- [ ] D) 8!/(3!) × 2! = 13,440 permutaciones

### Explicación Pedagógica
La palabra CALAMACA tiene 8 letras: C, A, L, A, M, A, C, A. Las repeticiones son: A aparece 4 veces, C aparece 2 veces. Por permutaciones con repetición: 8!/(4! × 2!) = 3,360. El distractor A (40,320) es 8! sin ajustar por repeticiones. El distractor B (6,720) es 8!/3!, considera solo las A (3) en lugar de 4. El distractor D (13,440) es una fórmula incorrecta.

---

## Question 20 (Variant Basic - Difficulty D10)

**ID:** `CO-MAT-11-P4-combinatoria-031-MASTERY-v20`
**Bloom:** Create
**ICFES:** Formulación y ejecución
**