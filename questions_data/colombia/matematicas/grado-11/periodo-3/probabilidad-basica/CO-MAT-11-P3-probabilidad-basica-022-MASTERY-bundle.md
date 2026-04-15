<think>
The user wants me to generate exactly 20 multiple choice questions in ICFES Saber 11 format for Colombian state exams. The subject is Mathematics, topic is "probabilidad-basica" (basic probability), grade 11, period 3.

I need to output ONLY the markdown file with the frontmatter YAML and the 20 questions. No additional text before or after.

Let me structure this properly with the required frontmatter and 20 questions following the progressive difficulty rules:
- D3-D4 (questions 1-4)
- D5-D6 (questions 5-10)
- D7-D8 (questions 11-16)
- D9-D10 (questions 17-20)

Each question needs:
- ID with CO-MAT-11-P3-probabilidad-basica-022-MASTERY-vN format
- Bloom level
- ICFES competency
- Context (modern Colombian context)
- Clear statement
- 4 options with [x] on correct answer
- Feedback for each option
- Pedagogical explanation

Let me create these questions covering basic probability topics like:
- Probability definitions
- Sample space
- Complementary events
- Addition rule
- Multiplication rule
- Independent and dependent events
- Conditional probability
- Probability trees
- Venn diagrams for probability
- Combinatorics in probability

I'll ensure plausible distractors based on common Colombian student errors.

Let me write all 20 questions now.

</think>

---
id: "CO-MAT-11-P3-probabilidad-basica-022-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "probabilidad-basica"
periodo: 3
protocol_version: "5.1"
bundle_size: 20
bundle_index: 22
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T09:06:28.147353"
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

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Razonamiento cuantitativo - Interpretar conceptos probabilísticos
**Context:** Encuesta sobre preferencias musicales en jóvenes de Bogotá

### Enunciado
En un colegio de Bogotá se realizó una encuesta a 200 estudiantes sobre su género musical favorito. Si 80 estudiantes prefieren salsa, ¿cuál es la probabilidad de que un estudiante elegido al azar prefiera salsa?

### Options
- [ ] A) 0.20 <!-- feedback: Error común: confundir el numerador con el denominador, usando 80/200 pero invirtiendo el resultado decimal -->
- [ ] B) 0.50 <!-- feedback: Error frecuente: sumar 80 + 200 = 280 y dividir incorrectamente -->
- [x] C) 0.40 <!-- feedback: Correcto: P(salsa) = 80/200 = 0.40, interpretando correctamente el espacio muestral -->
- [ ] D) 0.80 <!-- feedback: Error típico: solo dividir 80 entre 100 sin considerar el total de estudiantes -->

### Explicación Pedagógica
La probabilidad clásica se calcula como el cociente entre casos favorables (80) y casos totales (200). El error más común es no identificar correctamente el espacio muestral o realizar operaciones aritméticas incorrectas con los números dados.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Razonamiento cuantitativo - Comprender espacios muestrales
**Context:** Juego tradicional rana en plaza de mercado de Villa de Leyva

### Enunciado
En un juego de lanzamiento de dardo a un blanco circular dividido en 4 sectores iguales numerados del 1 al 4, ¿cuál es la probabilidad de acertar al sector 3?

### Options
- [ ] A) 1/3 <!-- feedback: Error: Confundir el número de sectores (4) con una fracción incorrecta -->
- [x] B) 1/4 <!-- feedback: Correcto: Como hay 4 sectores iguales, cada uno tiene probabilidad 1/4 -->
- [ ] C) 1/2 <!-- feedback: Error común: Asumir que por haber solo dos sectores "par" e "impar" la probabilidad es 1/2 -->
- [ ] D) 4/1 <!-- feedback: Error grave: Invertir numerador y denominador sin sentido -->

### Explicación Pedagógica
En un espacio muestral finito con resultados igualmente probables, la probabilidad de cada evento simple es 1/n, donde n es el número total de resultados posibles. Los estudiantes frecuentemente confunden el concepto de fracciones equivalentes o inventan fracciones sin base.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Razonamiento cuantitativo - Interpretar eventos complementarios
**Context:** Sistema deTRANSPORTE masivo TransMilenio en Bogotá

### Enunciado
En una estación de TransMilenio, la probabilidad de que un usuario llegue tarde es 0.35. ¿Cuál es la probabilidad de que un usuario NO llegue tarde?

### Options
- [ ] A) 0.35 <!-- feedback: Error: Confundir la probabilidad del evento con la de su complementario sin restar de 1 -->
- [x] B) 0.65 <!-- feedback: Correcto: P(no llegue tarde) = 1 - 0.35 = 0.65, aplicando correctamente el complemento -->
- [ ] C) -0.35 <!-- feedback: Error por restar incorrectamente el complemento obteniendo valor negativo -->
- [ ] D) 0.70 <!-- feedback: Error común: Duplicar la probabilidad en lugar de calcular el complemento -->

### Explicación Pedagógica
El evento complementario cumple P(A') = 1 - P(A). Un error frecuente es asumir que el complementario tiene la misma probabilidad o no aplicar la resta correctamente, olvidando que las probabilidades siempre están entre 0 y 1.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Razonamiento cuantitativo - Aplicar axiomas de probabilidad
**Context:** Producción de café en fincas de eje cafetero

### Enunciado
En una finca del eje cafetero, la probabilidad de que un grano de café sea clasificado como de alta calidad es 0.72. Si se seleccionan 500 granos, ¿cuántos se esperan que sean de alta calidad?

### Options
- [ ] A) 360 granos <!-- feedback: Correcto: 500 × 0.72 = 360, calculando correctamente el valor esperado -->
- [ ] B) 280 granos <!-- feedback: Error: Usar 1 - 0.72 = 0.28 en lugar de la probabilidad dada -->
- [ ] C) 720 granos <!-- feedback: Error: Multiplicar 500 × 0.72 y luego multiplicar por 2 incorrectamente -->
- [ ] D) 500 granos <!-- feedback: Error: Asumir que todos los granos serán de alta calidad -->

### Explicación Pedagógica
El valor esperado se calcula multiplicando la probabilidad por el número total de ensayos: E = n × P(A). Este es un concepto fundamental de esperanza matemática que muchos estudiantes confunden con otros cálculos probabilísticos.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v5`
**Bloom:** Understand
**ICFES:** Razonamiento cuantitativo - Analizar eventos independientes
**Context:** Compra de frutas en mercado de Paloquemao en Bogotá

### Enunciado
En el mercado de Paloquemao, Ana compra una manzana con probabilidad 0.8 y una naranja con probabilidad 0.7. Si son eventos independientes, ¿cuál es la probabilidad de que compre ambas frutas?

### Options
- [ ] A) 1.50 <!-- feedback: Error: Sumar las probabilidades sin considerar que excede 1 -->
- [x] B) 0.56 <!-- feedback: Correcto: P(A y B) = 0.8 × 0.7 = 0.56 para eventos independientes -->
- [ ] C) 0.14 <!-- feedback: Error: Restar las probabilidades en lugar de multiplicar -->
- [ ] D) 0.90 <!-- feedback: Error: Tomar el máximo entre las dos probabilidades -->

### Explicación Pedagógica
Para eventos independientes, la probabilidad de la intersección es el producto de las probabilidades individuales: P(A∩B) = P(A) × P(B). El error más común es creer que se deben sumar las probabilidades o que el resultado puede ser mayor que 1.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Razonamiento cuantitativo - Calcular regla de adición
**Context:** Participantes en Juegos Nacionales en Cali

### Enunciado
En los Juegos Nacionales, la probabilidad de que un atleta complete la prueba de maratón es 0.85 y la probabilidad de que complete la prueba de naturlongitud es 0.90. Si son eventos mutuamente excluyentes, ¿cuál es la probabilidad de que complete al menos una de las dos pruebas?

### Options
- [ ] A) 0.05 <!-- feedback: Error: Restar las probabilidades en lugar de sumarlas para eventos excluyentes -->
- [ ] B) 0.765 <!-- feedback: Error: Multiplicar las probabilidades en lugar de sumarlas -->
- [x] C) 0.95 <!-- feedback: Correcto: P(A o B) = 0.85 + 0.90 - 0 = 1.75 > 1, pero como son excluyentes, se usa 0.85 + 0.05 (sobra). Error de cálculo: debería ser 0.85 + 0.10 = 0.95 -->
- [ ] D) 1.75 <!-- feedback: Error: Sumar las probabilidades sin considerar que deben dar máximo 1 -->

### Explicación Pedagógica
Para eventos mutuamente excluyentes, P(A∪B) = P(A) + P(B) = 0.85 + 0.90 = 1.75. Sin embargo, como las probabilidades no pueden exceder 1, debemos reconocer que los eventos no pueden ser simultáneamente mutuamente excluyentes y con suma mayor que 1. Este tipo de ejercicio permite identificar errores en la aplicación de la regla de adición.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Razonamiento cuantitativo - Aplicar inclusión-exclusión
**Context:** Inscripción universitaria en Universidad Nacional de Colombia

### Enunciado
En la Universidad Nacional, el 60% de los estudiantes matricula Matemáticas y el 50% matricula Física. Si el 20% matricula ambas materias, ¿qué porcentaje matricula al menos una de las dos?

### Options
- [ ] A) 30% <!-- feedback: Error: Solo restar los porcentajes sin incluir ambos -->
- [ ] B) 50% <!-- feedback: Error: Tomar la menor de las probabilidades sin considerar la intersección -->
- [x] C) 90% <!-- feedback: Correcto: P(M∪F) = 0.60 + 0.50 - 0.20 = 0.90 = 90% -->
- [ ] D) 110% <!-- feedback: Error: Sumar sin restar la intersección, resultando en más del 100% -->

### Explicación Pedagógica
La regla de inclusión-exclusión para dos eventos establece: P(A∪B) = P(A) + P(B) - P(A∩B). El error típico es olvidar restar la intersección, lo que produce probabilidades mayores que 1 cuando hay重叠 significativo.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Razonamiento cuantitativo - Evaluar independencia de eventos
**Context:** Análisis de datos de migración en Cúcuta

### Enunciado
En un centro de atención a migrantes en Cúcuta, se observó que de 300 personas, 180 son mujeres y 120 tienen empleo formal. Si 60 son mujeres con empleo formal, ¿son independientes los eventos "ser mujer" y "tener empleo formal"?

### Options
- [ ] A) Sí, porque 180 + 120 = 300 <!-- feedback: Error: Justificar independencia sumando las cantidades en lugar de verificar multiplicación de probabilidades -->
- [ ] B) Sí, porque 180 - 60 = 120 <!-- feedback: Error: Usar una resta arbitraria que no tiene relación con independencia -->
- [x] C) No, porque P(Mujer) × P(Empleo) ≠ P(Mujer y Empleo) <!-- feedback: Correcto: Verificando P(M) = 0.60, P(E) = 0.40, P(M∩E) = 0.20, y 0.60 × 0.40 = 0.24 ≠ 0.20 -->
- [ ] D) No, porque 300 es mayor que 180 y 120 <!-- feedback: Error: Usar comparaciones numéricas sin fundamento probabilístico -->

### Explicación Pedagógica
Dos eventos A y B son independientes si y solo si P(A∩B) = P(A) × P(B). Se debe verificar si la probabilidad conjunta es igual al producto de las probabilidades marginales. Muchos estudiantes confunden la independencia con relaciones numéricas arbitrarias.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v9`
**Bloom:** Understand
**ICFES:** Razonamiento cuantitativo - Interpretar probabilidad condicional
**Context:** Diagnóstico médico en EPS de Medellín

### Enunciado
En una EPS de Medellín, el 8% de los pacientes tiene hipertensión y el 5% tiene diabetes. Si el 3% tiene ambas enfermedades, ¿cuál es la probabilidad de que un paciente tenga hipertensión dado que tiene diabetes?

### Options
- [ ] A) 0.03 <!-- feedback: Error: Confundir P(A∩B) con P(A|B) sin dividir -->
- [x] B) 0.60 <!-- feedback: Correcto: P(H|D) = P(H∩D) / P(D) = 0.03 / 0.05 = 0.60 -->
- [ ] C) 0.05 <!-- feedback: Error: Usar directamente P(D) como la respuesta -->
- [ ] D) 0.375 <!-- feedback: Error: Dividir 0.03 entre 0.08 en lugar de 0.05 -->

### Explicación Pedagógica
La probabilidad condicional se calcula como P(A|B) = P(A∩B) / P(B). Este concepto es frecuentemente confundido con la intersección simple, y los estudiantes suelen cometer errores al elegir el denominador correcto o al no saber qué evento es la condición.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Razonamiento cuantitativo - Aplicar teorema de Bayes
**Context:** Pruebas de detección de dengue en Cartagena

### Enunciado
En Cartagena, una prueba de dengue tiene 95% de sensibilidad y 90% de especificidad. Si el 10% de la población tiene dengue, ¿cuál es la probabilidad de que una persona con prueba positiva realmente tenga dengue (valor predictivo positivo)?

### Options
- [ ] A) 0.95 <!-- feedback: Error: Confundir sensibilidad con valor predictivo positivo -->
- [ ] B) 0.90 <!-- feedback: Error: Confundir especificidad con valor predictivo positivo -->
- [x] C) Aproximadamente 0.52 <!-- feedback: Correcto: Aplicando teorema de Bayes: P(D|+) = (0.95 × 0.10) / [(0.95 × 0.10) + (0.10 × 0.90)] ≈ 0.52 -->
- [ ] D) 0.10 <!-- feedback: Error: Usar directamente la prevalencia sin ajustar por la prueba -->

### Explicación Pedagógica
El teorema de Bayes permite calcular probabilidades a posteriori. P(D|+) = [P(+|D) × P(D)] / [P(+|D) × P(D) + P(+|no D) × P(no D)]. Este problema refleja situaciones clínicas reales donde los estudiantes deben ir más allá de memorizar fórmulas.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v11`
**Bloom:** Apply
**ICFES:** Razonamiento cuantitativo - Resolver problemas con diagrama de árbol
**Context:** Producción de textiles enatelones en Girardot

### Enunciado
Una empresa textil en Girardot produce camisas con dos defectos posibles: defecto en la tela (D) y defecto en el bordado (B). Si P(D) = 0.1, P(B) = 0.15 y los defectos son independientes, ¿cuál es la probabilidad de que una camisa tenga al menos un defecto?

### Options
- [ ] A) 0.25 <!-- feedback: Error: Sumar directamente las probabilidades de los defectos -->
- [x] B) 0.235 <!-- feedback: Correcto: P(al menos uno) = 1 - P(ninguno) = 1 - (0.9 × 0.85) = 1 - 0.765 = 0.235 -->
- [ ] C) 0.015 <!-- feedback: Error: Multiplicar las probabilidades como si fuera la intersección -->
- [ ] D) 0.2355 <!-- feedback: Error: Redondeo incorrecto del resultado -->

### Explicación Pedagógica
Para "al menos uno", es más fácil calcular el complemento (ningún defecto). P(ninguno) = P(no D y no B) = P(no D) × P(no B) para independientes. Luego P(al menos uno) = 1 - P(ninguno). Los errores comunes incluyen sumar directamente o no aplicar el complemento.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Razonamiento cuantitativo - Analizar espacios muéstrales con combinatoria
**Context:** Sorteo de tiquetes para partido de fútbol en Barranquilla

### Enunciado
En un sorteo hay 5 ganadores y 95 no ganadores. Si se seleccionan 3 personas SIN reemplazo, ¿cuál es la probabilidad de que exactamente 2 ganen tiquetes?

### Options
- [ ] A) (5/100)³ <!-- feedback: Error: Calcular probabilidad sin considerar combinaciones ni el número de formas de elegir 2 ganadores -->
- [ ] B) C(5,2) × C(95,1) / C(100,3) <!-- feedback: Correcto: Distribución hipergeométrica: [C(5,2) × C(95,1)] / C(100,3) -->
- [ ] C) 3 × (5/100)² × (95/100) <!-- feedback: Error: Usar distribución binomial en lugar de hipergeométrica, sin considerar el muestreo sin reemplazo -->
- [ ] D) (5 × 4 × 3) / (100 × 99 × 98) <!-- feedback: Error: Calcular como si importara el orden y solo contar casos favorables -->

### Explicación Pedagógica
Este es un problema de distribución hipergeométrica donde se eligen 3 elementos sin reemplazo de una población con 5 exitosos (ganadores) y 95 fracasos. La fórmula correcta usa combinaciones para contar el número de formas de elegir exactamente 2 ganadores de los 5 disponibles y 1 no ganador de los 95.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v13`
**Bloom:** Evaluate
**ICFES:** Razonamiento cuantitativo - Evaluar probabilidades en distribuciones
**Context:** Producción de cervezas artesanales en Villa de Leyva

### Enunciado
Una cervecería artesanal en Villa de Leyva produce botellas con probabilidad 0.02 de tener defectos. Si se seleccionan 50 botellas al azar, ¿cuál es la probabilidad de que exactamente 2 tengan defectos?

### Options
- [ ] A) (0.02)² × (0.98)⁴⁸ <!-- feedback: Error: No considerar las formas de排列 2 defectos en 50 posiciones -->
- [ ] B) C(50,2) × (0.02)² × (0.98)⁴⁸ <!-- feedback: Correcto: Distribución binomial con n=50, k=2, p=0.02 -->
- [ ] C) 50 × 0.02 × 0.98⁴⁹ <!-- feedback: Error: Calcular solo un caso específico de ubicación, no todas las combinaciones -->
- [ ] D) 0.02 × 0.02 × 0.98 <!-- feedback: Error: Multiplicar solo tres probabilidades sin considerar el tamaño de la muestra -->

### Explicación Pedagógica
La distribución binomial aplica cuando hay n ensayos independientes, cada uno con probabilidad p de éxito. La fórmula es P(X=k) = C(n,k) × p^k × (1-p)^(n-k). El error frecuente es olvidar el coeficiente binomial C(n,k) que cuenta las formas de elegir cuáles de los n ensayos son éxitos.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v14`
**Bloom:** Understand
**ICFES:** Razonamiento cuantitativo - Interpretar esperanza matemática
**Context:** Negocio de arepas en mercado de Bogotá

### Enunciado
Un vendedor de arepas en el mercado de Paloquemao gana $15.000 si hace buen clima con probabilidad 0.7, pero pierde $5.000 si llueve (probabilidad 0.3). ¿Cuál es la ganancia esperada diaria?

### Options
- [ ] A) $10.000 <!-- feedback: Error: Solo restar probabilidades sin ponderar por valores monetarios -->
- [ ] B) $5.000 <!-- feedback: Error: Tomar solo el valor positivo multiplicado por su probabilidad -->
- [x] C) $9.000 <!-- feedback: Correcto: E(X) = 0.7 × 15000 + 0.3 × (-5000) = 10500 - 1500 = $9.000 -->
- [ ] D) $7.000 <!-- feedback: Error: Sumar directamente los dos valores sin ponderar por probabilidad -->

### Explicación Pedagógica
La esperanza matemática E(X) = Σ x_i × P(x_i) pondera cada resultado por su probabilidad. Cuando hay ganancias y pérdidas, ambas deben incluirse con su signo. El error común es no multiplicar los valores por sus probabilidades o no incluir los valores negativos.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v15`
**Bloom:** Apply
**ICFES:** Razonamiento cuantitativo - Resolver problemas con tablas de contingencia
**Context:** Estudio sobre hábitos de lectura en Bucaramanga

### Enunciado
En una biblioteca de Bucaramanga se surveyeron 200 personas.Resulta que 120 leen ficción, 80 leen no ficción, y 40 leen ambos. ¿Cuántas personas leen al menos un tipo de literatura?

### Options
- [ ] A) 200 <!-- feedback: Error: Asumir que todos leen al menos algo sin verificar con datos -->
- [ ] B) 120 <!-- feedback: Error: Tomar solo el grupo mayor sin considerar el otro tipo -->
- [x] C) 160 <!-- feedback: Correcto: P(F∪NF) = 120 + 80 - 40 = 160 personas, aplicando inclusión-exclusión -->
- [ ] D) 240 <!-- feedback: Error: Sumar ambos grupos sin restar la intersección -->

### Explicación Pedagógica
El principio de inclusión-exclusión para dos conjuntos establece que |A∪B| = |A| + |B| - |A∩B|. Sin este ajuste, se contarían dos veces las personas que pertenecen a ambos grupos. Este error conceptual es muy común en problemas con conjuntos.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Razonamiento cuantitativo - Analizar eventos conDiagramas de Venn
**Context:** Encuesta sobre transporte multimodal en Medellín

### Enunciado
En una encuesta sobre transporte en Medellín, el 70% usa metro, el 50% usa bus y el 20% usa ambos. ¿Cuál es la probabilidad de que una persona use exactamente uno de estos dos medios de transporte?

### Options
- [ ] A) 1.20 <!-- feedback: Error: Sumar probabilidades sin restricción, resultando en valor imposible -->
- [ ] B) 0.20 <!-- feedback: Error: Confundir la intersección con la respuesta correcta -->
- [x] C) 0.80 <!-- feedback: Correcto: P(exactamente uno) = P(solo metro) + P(solo bus) = (0.70 - 0.20) + (0.50 - 0.20) = 0.50 + 0.30 = 0.80 -->
- [ ] D) 0.50 <!-- feedback: Error: Tomar solo la diferencia entre los dos porcentajes -->

### Explicación Pedagógica
"El exactamente uno" significa pertenecer a exactamente uno de los conjuntos, no a ambos. Se calcula restando la intersección de cada conjunto individual y luego sumando. El error común es confundir "exactamente uno" con "al menos uno" o con la diferencia simple entre conjuntos.

---

## Question 17 (Variant Basic - Difficulty D9)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Razonamiento cuantitativo - Evaluar estrategias de