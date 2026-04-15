<think>
Generate 20 ICFES-style questions about real numbers for grade 11, period 1, with progressive difficulty.
</think>

---
id: "CO-MAT-11-P1-numeros-reales-002-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "numeros-reales"
periodo: 1
protocol_version: "5.1"
bundle_size: 20
bundle_index: 2
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T08:03:17.317176"
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

## Question 1 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P1-numeros-reales-002-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Razonamiento y argumentación
**Context:** En una clase de matemáticas en un colegio de Bogotá, la profesora pide a los estudiantes clasificar los siguientes números en su conjunto correspondiente.

### Enunciado
¿A cuál de los siguientes conjuntos pertenece el número −7?

### Options
- [ ] A) Solo a los números naturales (ℕ)
- [ ] B) Solo a los números enteros positivos (ℤ⁺)
- [x] C) A los números enteros (ℤ) y a los números racionales (ℚ) <!-- feedback: −7 es un entero negativo, y todo entero es también racional pues puede escribirse como −7/1 -->
- [ ] D) Solo a los números irracionales (𝕀) <!-- feedback: un número irracional no puede expresarse como fracción de enteros; −7 sí puede -->

### Explicación Pedagógica
El número −7 pertenece a ℤ porque es un entero negativo. Como todo número entero puede escribirse como fracción (−7 = −7/1), también pertenece a ℚ. No pertenece a ℕ (que solo incluye positivos o no negativos) ni a 𝕀 (irracionales). El error más frecuente es confundir "negativo" con "irracional".

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P1-numeros-reales-002-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Comunicación, representación y modelación
**Context:** Durante el Festival de Matemáticas del ICFES, un estudiante de Medellín debe ordenar números en la recta numérica.

### Enunciado
¿Cuál de las siguientes opciones presenta los números 1/2, −3/4, 0 y 2 ordenados de menor a mayor?

### Options
- [ ] A) 2, 1/2, 0, −3/4
- [ ] B) −3/4, 1/2, 0, 2
- [x] C) −3/4, 0, 1/2, 2 <!-- feedback: de izquierda a derecha en la recta numérica: −0.75 < 0 < 0.5 < 2 -->
- [ ] D) 0, −3/4, 1/2, 2 <!-- feedback: el cero es mayor que −3/4, por lo que no puede ir primero en orden ascendente -->

### Explicación Pedagógica
Al convertir a decimales: −3/4 = −0.75, 0 = 0, 1/2 = 0.5, 2 = 2. El orden correcto de menor a mayor es −0.75 < 0 < 0.5 < 2. Un error típico es no saber ubicar fracciones negativas respecto al cero.

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P1-numeros-reales-002-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Razonamiento y argumentación
**Context:** Un estudiante del SENA en Cali estudia propiedades numéricas para su formación técnica en contabilidad.

### Enunciado
¿Cuál de las siguientes afirmaciones sobre los números reales es VERDADERA?

### Options
- [ ] A) Todo número irracional es también un número entero
- [ ] B) El conjunto de los números naturales contiene números negativos
- [ ] C) Los números racionales e irracionales son conjuntos disjuntos, es decir, no comparten elementos
- [x] D) Todo número racional es un número real, pero no todo número real es racional <!-- feedback: ℚ ⊂ ℝ y además existe 𝕀 ⊂ ℝ con 𝕀 ∩ ℚ = ∅, por lo que hay reales que no son racionales -->

### Explicación Pedagógica
La jerarquía es ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ. Los irracionales (𝕀) también son reales pero no racionales. La opción C es verdadera en sí misma pero no responde a la pregunta sobre reales en general. La opción D recoge correctamente la relación de subconjunto estricto.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P1-numeros-reales-002-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Planteamiento y resolución de problemas
**Context:** Una aplicación de pagos en Colombia muestra el saldo de una cuenta: −$45.500. El usuario quiere saber el valor absoluto de su deuda.

### Enunciado
Si el saldo de una cuenta bancaria es −45.500 pesos, ¿cuál es el valor absoluto de dicha cantidad?

### Options
- [ ] A) −45.500
- [x] B) 45.500 <!-- feedback: el valor absoluto de un número negativo es su opuesto positivo: |−45.500| = 45.500 -->
- [ ] C) 0
- [ ] D) −1/45.500 <!-- feedback: ese resultado correspondería al inverso multiplicativo, no al valor absoluto -->

### Explicación Pedagógica
El valor absoluto |x| representa la distancia del número al cero en la recta numérica, siempre es no negativo. |−45.500| = 45.500. Los estudiantes suelen confundir valor absoluto con inverso o con el negativo del número.

---

## Question 5 (Variant Basic - Difficulty 5)

**ID:** `CO-MAT-11-P1-numeros-reales-002-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Planteamiento y resolución de problemas
**Context:** En una feria de ciencias en Barranquilla, estudiantes calculan expresiones con radicales para un proyecto de ingeniería solar.

### Enunciado
¿Cuál es el resultado de simplificar √72?

### Options
- [ ] A) 6√3
- [x] B) 6√2 <!-- feedback: 72 = 36 × 2, entonces √72 = √36 × √2 = 6√2 -->
- [ ] C) 8√3
- [ ] D) 9√2 <!-- feedback: 9² = 81 ≠ 72; el factor cuadrado perfecto de 72 es 36, no 81 -->

### Explicación Pedagógica
Se factoriza 72 buscando el mayor cuadrado perfecto: 72 = 36 × 2. Entonces √72 = √36 · √2 = 6√2. Error frecuente: usar 4 × 18 en vez de 36 × 2, obteniendo 2√18 sin simplificar completamente, o confundir los factores.

---

## Question 6 (Variant Basic - Difficulty 5)

**ID:** `CO-MAT-11-P1-numeros-reales-002-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Comunicación, representación y modelación
**Context:** Un docente de matemáticas en Bucaramanga explica la representación decimal de fracciones para preparar el Saber 11.

### Enunciado
¿Cuál de las siguientes fracciones genera un decimal periódico (repetición infinita de cifras)?

### Options
- [ ] A) 1/4
- [ ] B) 3/8
- [x] C) 5/6 <!-- feedback: 5/6 = 0.8333… con el 3 repitiéndose indefinidamente, pues 6 = 2 × 3 y el factor 3 no es potencia de 2 ni de 5 -->
- [ ] D) 7/25 <!-- feedback: 25 = 5², cuyo único factor primo es 5; la fracción da decimal exacto: 0.28 -->

### Explicación Pedagógica
Una fracción irreducible p/q tiene decimal exacto (terminante) solo si q tiene únicamente factores primos 2 y/o 5. 1/4 = 0.25, 3/8 = 0.375, 7/25 = 0.28 (todos exactos). En cambio 5/6 = 0.8333… es periódico porque 6 = 2 × 3.

---

## Question 7 (Variant Basic - Difficulty 6)

**ID:** `CO-MAT-11-P1-numeros-reales-002-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Planteamiento y resolución de problemas
**Context:** Un ingeniero en Manizales calcula la longitud de la diagonal de una pantalla rectangular de 9 cm por 12 cm para un prototipo tecnológico.

### Enunciado
Usando el teorema de Pitágoras, la diagonal d de un rectángulo de lados 9 cm y 12 cm se calcula como d = √(9² + 12²). ¿Cuánto mide d?

### Options
- [ ] A) √261 cm
- [ ] B) 10,5 cm
- [x] C) 15 cm <!-- feedback: 9² + 12² = 81 + 144 = 225, y √225 = 15 -->
- [ ] D) 21 cm <!-- feedback: 21 sería 9 + 12, no la diagonal; la suma de lados no es la hipotenusa -->

### Explicación Pedagógica
d = √(81 + 144) = √225 = 15 cm. La terna pitagórica 9-12-15 es múltiplo de 3-4-5. Error típico: sumar los lados (9 + 12 = 21) o calcular √81 + √144 = 9 + 12 = 21, confundiendo √(a+b) con √a + √b.

---

## Question 8 (Variant Basic - Difficulty 6)

**ID:** `CO-MAT-11-P1-numeros-reales-002-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Razonamiento y argumentación
**Context:** En el programa Pequeños Científicos de una universidad colombiana, estudiantes debaten cuáles números son irracionales.

### Enunciado
¿Cuál de los siguientes números es IRRACIONAL?

### Options
- [ ] A) √49
- [ ] B) 0,121212… (donde 12 se repite indefinidamente)
- [ ] C) −5/3
- [x] D) √11 <!-- feedback: 11 no es un cuadrado perfecto, por lo que su raíz no puede expresarse como fracción de enteros -->

### Explicación Pedagógica
√49 = 7 ∈ ℤ; 0.121212… = 12/99 = 4/33 ∈ ℚ; −5/3 ∈ ℚ. Solo √11 es irracional porque 11 es primo y no tiene raíz exacta. El error clásico es creer que toda raíz cuadrada es irracional, sin verificar si el radicando es cuadrado perfecto.

---

## Question 9 (Variant Basic - Difficulty 6)

**ID:** `CO-MAT-11-P1-numeros-reales-002-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Planteamiento y resolución de problemas
**Context:** Una estudiante de Pereira usa propiedades de los reales para simplificar expresiones en su simulacro ICFES.

### Enunciado
¿Cuál es el resultado de (√3 + √3)?

### Options
- [ ] A) √6
- [x] B) 2√3 <!-- feedback: √3 + √3 = 1·√3 + 1·√3 = 2√3, igual que sumar términos semejantes -->
- [ ] C) √9 = 3
- [ ] D) 6 <!-- feedback: 6 sería el resultado de (√3)·(√3)·2 = 2·3, no de la suma -->

### Explicación Pedagógica
Los radicales semejantes se suman como variables: √3 + √3 = 2√3. Error frecuente: creer que √a + √a = √(2a) = √6, confundiendo la suma con la multiplicación de radicales. Otro error: elevar al cuadrado prematuramente.

---

## Question 10 (Variant Basic - Difficulty 6)

**ID:** `CO-MAT-11-P1-numeros-reales-002-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Comunicación, representación y modelación
**Context:** En una olimpiada matemática departamental en Nariño, un problema pide convertir una fracción decimal periódica a fracción común.

### Enunciado
La expresión decimal 0,777… (donde el 7 se repite indefinidamente) equivale a la fracción:

### Options
- [ ] A) 7/100
- [ ] B) 77/100
- [x] C) 7/9 <!-- feedback: si x = 0.777…, entonces 10x = 7.777…; restando: 9x = 7, luego x = 7/9 -->
- [ ] D) 7/10 <!-- feedback: 7/10 = 0.7 exacto, no 0.777… -->

### Explicación Pedagógica
Método algebraico: sea x = 0.777…; entonces 10x = 7.777…. Restando: 10x − x = 7, es decir 9x = 7, por lo que x = 7/9. El error más frecuente es escribir 7/10 (decimal exacto) o 7/99 (error de procedimiento).

---

## Question 11 (Variant Basic - Difficulty 7)

**ID:** `CO-MAT-11-P1-numeros-reales-002-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Razonamiento y argumentación
**Context:** En una prueba diagnóstica del MEN aplicada en colegios de Cundinamarca, se evalúan propiedades de los números reales.

### Enunciado
Si a y b son números irracionales, ¿cuál de las siguientes afirmaciones es SIEMPRE verdadera?

### Options
- [ ] A) a + b es irracional
- [ ] B) a · b es irracional
- [x] C) a + b puede ser racional o irracional, dependiendo de los valores de a y b <!-- feedback: por ejemplo, √2 + (−√2) = 0 ∈ ℚ, pero √2 + √3 ∉ ℚ; por tanto no siempre es irracional -->
- [ ] D) a · b siempre es racional <!-- feedback: √2 · √3 = √6, que es irracional; la multiplicación no garantiza racionalidad -->

### Explicación Pedagógica
Los irracionales no son cerrados bajo suma ni producto. Contraejemplo para suma: √2 + (−√2) = 0 ∈ ℚ. Contraejemplo para producto irracional: √2 · √3 = √6 ∉ ℚ. Pero también √2 · √2 = 2 ∈ ℚ. Por eso la única afirmación correcta reconoce la posibilidad de ambos resultados.

---

## Question 12 (Variant Basic - Difficulty 7)

**ID:** `CO-MAT-11-P1-numeros-reales-002-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Planteamiento y resolución de problemas
**Context:** Un arquitecto en Cartagena calcula áreas de terrenos para un proyecto de vivienda de interés social, usando expresiones con radicales.

### Enunciado
Si el área de un cuadrado es (5 + √3)² m², ¿cuál es el valor exacto de dicha área?

### Options
- [ ] A) 25 + 3 = 28 m²
- [ ] B) 25 + √9 = 28 m²
- [x] C) 28 + 10√3 m² <!-- feedback: (5 + √3)² = 25 + 2·5·√3 + 3 = 28 + 10√3 -->
- [ ] D) 25 + 6√3 m² <!-- feedback: el término medio es 2·5·√3 = 10√3, no 6√3 -->

### Explicación Pedagógica
Usando el binomio al cuadrado: (a + b)² = a² + 2ab + b². Aquí a = 5, b = √3: (5)² + 2(5)(√3) + (√3)² = 25 + 10√3 + 3 = 28 + 10√3. El error más común es olvidar el término 2ab o calcular (√3)² = √3 en vez de 3.

---

## Question 13 (Variant Basic - Difficulty 7)

**ID:** `CO-MAT-11-P1-numeros-reales-002-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Razonamiento y argumentación
**Context:** En el laboratorio de física de un colegio en Armenia, los estudiantes trabajan con notación científica para medir distancias astronómicas.

### Enunciado
La distancia de la Tierra al Sol es aproximadamente 1,496 × 10¹¹ m y la de la Tierra a la Luna es aproximadamente 3,844 × 10⁸ m. ¿Cuántas veces más lejos está el Sol que la Luna, aproximadamente?

### Options
- [ ] A) Aproximadamente 4 veces
- [ ] B) Aproximadamente 40 veces
- [x] C) Aproximadamente 389 veces <!-- feedback: (1,496 × 10¹¹) / (3,844 × 10⁸) = (1,496/3,844) × 10³ ≈ 0,389 × 10³ = 389 -->
- [ ] D) Aproximadamente 3.890 veces <!-- feedback: el exponente correcto al dividir es 10¹¹⁻⁸ = 10³, no 10⁴ -->

### Explicación Pedagógica
Al dividir en notación científica: (1,496/3,844) × 10^(11−8) = 0,3892 × 10³ ≈ 389. Error típico: restar mal los exponentes (11 + 8 en vez de 11 − 8) o no restar correctamente obteniendo 10⁴.

---

## Question 14 (Variant Basic - Difficulty 7)

**ID:** `CO-MAT-11-P1-numeros-reales-002-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Planteamiento y resolución de problemas
**Context:** Un estudiante de grado 11 en Ibagué resuelve inecuaciones con valor absoluto para preparar el Saber 11.

### Enunciado
¿Cuál es el conjunto solución de la inecuación |x − 3| ≤ 4?

### Options
- [ ] A) x ≤ 7
- [ ] B) −4 ≤ x ≤ 4
- [x] C) −1 ≤ x ≤ 7 <!-- feedback: |x − 3| ≤ 4 equivale a −4 ≤ x − 3 ≤ 4, sumando 3: −1 ≤ x ≤ 7 -->
- [ ] D) x ≥ −1 <!-- feedback: solo recoge la cota inferior; la solución es un intervalo acotado -->

### Explicación Pedagógica
|x − 3| ≤ 4 se reescribe como −4 ≤ x − 3 ≤ 4. Sumando 3 en toda la expresión: −4 + 3 ≤ x ≤ 4 + 3, es decir −1 ≤ x ≤ 7. El error más frecuente es olvidar sumar 3 en el extremo izquierdo, obteniendo −4 ≤ x ≤ 7.

---

## Question 15 (Variant Basic - Difficulty 8)

**ID:** `CO-MAT-11-P1-numeros-reales-002-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Razonamiento y argumentación
**Context:** Un grupo de investigación de la Universidad Nacional analiza propiedades de densidad de los números reales para un curso de análisis.

### Enunciado
Entre los números reales 1/3 y 1/2, ¿cuál de las siguientes opciones corresponde a un número racional ubicado estrictamente entre ellos?

### Options
- [ ] A) √(1/6)
- [x] B) 5/12 <!-- feedback: 1/3 = 4/12 < 5/12 < 6/12 = 1/2, y 5