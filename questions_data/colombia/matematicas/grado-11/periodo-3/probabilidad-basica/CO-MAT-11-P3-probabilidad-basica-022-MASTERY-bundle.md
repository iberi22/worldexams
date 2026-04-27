<think>
The user wants me to generate exactly 20 multiple-choice questions in the ICFES Saber 11 style for Mathematics, specifically on basic probability, for grade 11, period 3. I need to follow the exact format specified, including the YAML frontmatter and the structured question format.

Let me generate 20 questions with progressive difficulty:
- Questions 1-4: D3-D4 (basic understanding)
- Questions 5-10: D5-D6 (intermediate)
- Questions 11-16: D7-D8 (advanced)
- Questions 17-20: D9-D10 (complex)

Each question needs:
- ID with the specified format
- Bloom taxonomy level
- ICFES competency
- Context relevant to Colombia
- Clear statement
- 4 options (A, B, C, D) with exactly one marked as correct with [x]
- Explanation pedagogical section

Let me create these questions:

1-4: D3-D4 (Remember, Understand)
5-10: D5-D6 (Apply, Analyze)
11-16: D7-D8 (Analyze, Evaluate)
17-20: D9-D10 (Evaluate, Create)

Topics to cover:
- Basic probability concepts
- Complementary events
- Independent events
- Dependent events
- Conditional probability
- Addition rule
- Multiplication rule
- Counting principles (combinations, permutations)
- Probability distributions (basic)
- Venn diagrams

Let me write these questions:

</think>

```yaml
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
  timestamp: "2026-04-16T00:25:43.037279"
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

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Interpretación y representación
**Context:** Encuesta sobre hábitos de lectura en bibliotecas públicas de Medellín

### Enunciado
En una biblioteca de Medellín, el 60% de los usuarios son estudiantes. Si se selecciona aleatoriamente un usuario, ¿cuál es la probabilidad de que NO sea estudiante?

### Options
- [ ] A) 0,40
- [ ] B) 0,60
- [x] C) 0,40 <!-- feedback: Por el axioma de complementariedad, P(no A) = 1 - P(A). Si P(estudiante) = 0,60, entonces P(no estudiante) = 1 - 0,60 = 0,40. -->
- [ ] D) 0,16 <!-- feedback: Error común: multiplicar 0,60 × 0,60 en lugar de restar. Recuerde que el complemento es 1 menos la probabilidad del evento. -->

### Explicación Pedagógica
La probabilidad del complemento de un evento A se calcula como P(A') = 1 - P(A). Este es un axioma fundamental de la teoría de probabilidades. El error más común es confundir la probabilidad del complemento con el producto de probabilidades o con la misma probabilidad del evento.

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Formulación y ejecución
**Context:** Sorteo de becas universitarias en Bogotá

### Enunciado
En un sorteo escolar en Bogotá, se tienen 3 esferas rojas, 5 esferas azules y 2 esferas verdes en una urna. Si se extrae una esfera al azar, ¿cuál es la probabilidad de obtener una esfera azul?

### Options
- [ ] A) 3/10
- [ ] B) 5/10
- [x] C) 1/2 <!-- feedback: P(azul) = casos favorables / casos totales = 5 / (3+5+2) = 5/10 = 1/2. La fracción 5/10 es equivalente a 1/2. -->
- [ ] D) 3/5 <!-- feedback: Error típico: usar solo los casos desfavorables (3+2=5) sobre el total, obteniendo 5/10 = 1/2, pero interpretándolo incorrectamente. -->

### Explicación Pedagógica
La probabilidad clásica se calcula como el cociente entre el número de casos favorables y el número total de casos posibles. En este problema hay 5 esferas azules favorables de un total de 10 esferas. La fracción 5/10 se puede simplificar a 1/2.

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Interpretación y representación
**Context:** Control de calidad en fábrica de textiles en Pereira

### Enunciado
En una fábrica textil de Pereira, 2 de cada 10 rollos de tela presentan imperfecciones. Si se seleccionan 2 rollos al azar (con reposición), ¿cuál es la probabilidad de que ambos rollos estén en buen estado?

### Options
- [ ] A) 0,04
- [ ] B) 0,20
- [x] C) 0,64 <!-- feedback: P(ambos buenos) = P(bueno) × P(bueno) = 0,8 × 0,8 = 0,64. Como hay reposición, los eventos son independientes. -->
- [ ] D) 0,96 <!-- feedback: Confusión: calcular P(al menos uno defectuoso) = 1 - 0,04 = 0,96, en lugar de la probabilidad de ambos buenos. -->

### Explicación Pedagógica
Cuando hay reposición, cada extracción es independiente de la anterior. La probabilidad de que ambos rollos estén en buen estado es el producto de sus probabilidades individuales: 0,8 × 0,8 = 0,64. Sin reposición, los eventos serían dependientes y el cálculo sería diferente.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Formulación y ejecución
**Context:** Juegos tradicionales en festival de Cartagena

### Enunciado
En un festival cultural en Cartagena, se lanza un dado公平 (no cargado) y una moneda. ¿Cuál es la probabilidad de obtener un número par en el dado Y sello en la moneda?

### Options
- [ ] A) 1/4
- [ ] B) 1/3
- [x] C) 1/4 <!-- feedback: Eventos independientes: P(par) = 3/6 = 1/2, P(sello) = 1/2. Por la regla de la multiplicación: P(par y sello) = 1/2 × 1/2 = 1/4. -->
- [ ] D) 2/3 <!-- feedback: Error frecuente: sumar las probabilidades en lugar de multiplicarlas. 1/2 + 1/2 = 1, o considerar incorrectamente los pares como 4/6. -->

### Explicación Pedagógica
Para eventos independientes, la probabilidad de que ocurran ambos es el producto de sus probabilidades individuales. Los números pares en un dado son 2, 4, 6 (3 de 6 = 1/2). En una moneda, sello tiene probabilidad 1/2. Multiplicando: 1/2 × 1/2 = 1/4.

---

## Question 5 (Variant Basic - Difficulty 5)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y ejecución
**Context:** Restaurante de comida rápida en Bucaramanga

### Enunciado
En un restaurante de Bucaramanga, el 70% de los clientes piden menú del día y el 40% piden bebida. Si el 25% piden tanto menú como bebida, ¿cuál es la probabilidad de que un cliente pida menú del día O bebida?

### Options
- [ ] A) 0,28
- [ ] B) 0,65
- [x] C) 0,85 <!-- feedback: Por la regla de adición: P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = 0,70 + 0,40 - 0,25 = 0,85. Se resta la intersección para no contar dos veces. -->
- [ ] D) 1,10 <!-- feedback: Error común: sumar directamente 0,70 + 0,40 = 1,10 sin restar la intersección, excediendo el valor máximo de probabilidad. -->

### Explicación Pedagógica
La regla general de adición aplica cuando los eventos no son mutuamente excluyentes: P(A ∪ B) = P(A) + P(B) - P(A ∩ B). En este caso, hay un 25% de clientes que pidió ambos productos, y al sumar directamente se duplicaría esa cantidad.

---

## Question 6 (Variant Basic - Difficulty 5)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Formulación y ejecución
**Context:** Sistema de transporte masivo de Cali

### Enunciado
En el sistema de transporte masivo de Cali, un autobús llega tarde con probabilidad 0,15. ¿Cuál es la probabilidad de que llegue a tiempo al menos una vez en 3 viajes independientes?

### Options
- [ ] A) 0,15
- [ ] B) 0,45
- [x] C) 0,385375 <!-- feedback: P(al menos una vez a tiempo) = 1 - P(todas tarde) = 1 - 0,15³ = 1 - 0,003375 = 0,996625. Es más fácil calcular el complemento: ninguno a tiempo tiene probabilidad 0,15 en cada viaje. -->
- [ ] D) 0,996625 <!-- feedback: Correcto si es al menos una vez a tiempo. Pero si la pregunta fuera "al menos una vez tarde", sería 1 - 0,85³. Verifique el complemento. -->

### Explicación Pedagógica
Para calcular "al menos una vez", es más eficiente usar el complemento. P(al menos una vez a tiempo) = 1 - P(ninguna vez a tiempo) = 1 - (0,15)³ = 1 - 0,003375 = 0,996625. El error común es intentar calcular directamente múltiples casos mutuamente excluyentes.

---

## Question 7 (Variant Basic - Difficulty 6)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Pensamiento aleatorio
**Context:** Programa de conditionally免费 educación en la Universidad Nacional

### Enunciado
En la Universidad Nacional, el 80% de los estudiantes aprovação el examen de admisión. De los que aprueban, el 90% ingresan. ¿Cuál es la probabilidad de que un estudiante ingrese a la universidad?

### Options
- [ ] A) 0,72
- [x] B) 0,72 <!-- feedback: P(ingrese) = P(apruebe) × P(ingrese | apruebe) = 0,80 × 0,90 = 0,72. Esto corresponde a la regla de multiplicación para eventos dependientes. -->
- [ ] C) 0,90
- [ ] D) 1,70 <!-- feedback: Error: sumar las probabilidades en lugar de multiplicar. Además, el resultado no puede exceder 1. -->

### Explicación Pedagógica
Este problema involucra probabilidad condicional. P(A y B) = P(A) × P(B|A). Primero se debe aprobar el examen (probabilidad 0,80), y dado que se aprueba, la probabilidad de ingresar es 0,90. El producto 0,80 × 0,90 = 0,72 representa la probabilidad conjunta.

---

## Question 8 (Variant Basic - Difficulty 6)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Pensamiento aleatorio
**Context:** Clínica de salud en Villavicencio

### Enunciado
En una clínica de Villavicencio, el 60% de los pacientes tienen gripe. Si un paciente tiene gripe, la probabilidad de que presente fiebre es 0,85. Si no tiene gripe, la probabilidad de fiebre es 0,20. Un paciente llega con fiebre. ¿Cuál es la probabilidad de que tenga gripe?

### Options
- [ ] A) 0,51
- [ ] B) 0,60
- [x] C) 0,771428... <!-- feedback: Por teorema de Bayes: P(gripe|fiebre) = [0,60 × 0,85] / [0,60 × 0,85 + 0,40 × 0,20] = 0,51 / 0,66 = 0,773. Aproximadamente 0,77. -->
- [ ] D) 0,85 <!-- feedback: Confusión: tomar directamente la probabilidad condicional P(fiebre|gripe) = 0,85 sin considerar los que tienen fiebre sin gripe. -->

### Explicación Pedagógica
Se aplica el Teorema de Bayes: P(Gripe|Fiebre) = [P(Gripe) × P(Fiebre|Gripe)] / [P(Gripe) × P(Fiebre|Gripe) + P(No Gripe) × P(Fiebre|No Gripe)]. El numerador es 0,51 y el denominador es 0,51 + 0,08 = 0,59. El resultado es aproximadamente 0,86.

---

## Question 9 (Variant Basic - Difficulty 6)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Formulación y ejecución
**Context:** Agencia de viajes en Santa Marta

### Enunciado
Una agencia de viajes en Santa Marta ofrece 3 destinos diferentes (Bogotá, Quito, Lima). Un cliente quiere visitar 2 destinos en un mismo viaje, sin importar el orden. ¿De cuántas formas puede elegir los 2 destinos?

### Options
- [ ] A) 6
- [ ] B) 5
- [x] C) 3 <!-- feedback: Como el orden no importa, se usa combinación: C(3,2) = 3! / (2! × 1!) = 3. Los pares son: {Bogotá, Quito}, {Bogotá, Lima}, {Quito, Lima}. -->
- [ ] D) 9 <!-- feedback: Error: multiplicar 3 × 3 (como si fuera permutación con orden) o sumar 3 + 3. En combinaciones el orden no importa. -->

### Explicación Pedagógica
Cuando el orden no importa, se usa combinación: C(n,r) = n! / (r! × (n-r)!). Con n=3 y r=2: C(3,2) = 3!/(2!1!) = 6/2 = 3. El error común es confundir con permutación (donde el orden sí importa) o con el principio de multiplicación.

---

## Question 10 (Variant Basic - Difficulty 6)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Formulación y ejecución
**Context:** Competencia de programación en universities de Medellín

### Enunciado
En una competencia de programación en Medellín, 5 equipos competirán por los puestos de primer, segundo y tercer lugar. ¿De cuántas formas diferentes se pueden awarding los tres primeros lugares?

### Options
- [ ] A) 10
- [ ] B) 15
- [x] C) 60 <!-- feedback: Como el orden importa (1°, 2°, 3° son diferentes), se usa permutación: P(5,3) = 5! / (5-3)! = 5! / 2! = 120/2 = 60. -->
- [ ] D) 125 <!-- feedback: Error: calcular 5³ = 125, confundiendo con el número de posibles ternas ordenadas si hubiera reposición. Sin reposición y con orden, es permutación. -->

### Explicación Pedagógica
Como los puestos son distintivos (orden importa) y sin reposición, se usa permutación: P(n,r) = n!/(n-r)!. Con 5 equipos y 3 lugares: P(5,3) = 5!/2! = 60. El error común es usar combinación (sin orden) o cálculo con reposición.

---

## Question 11 (Variant Basic - Difficulty 7)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Pensamiento aleatorio
**Context:** Producción de café orgánico en Huila

### Enunciado
En una finca cafetera del Huila, el 5% de los granos de café son defectuosos. Si se seleccionan 4 granos al azar SIN reposición, ¿cuál es la probabilidad de que exactamente 1 sea defectuoso?

### Options
- [ ] A) 0,171475
- [ ] B) 0,185625
- [x] C) 0,171475 <!-- feedback: P = C(4,1) × (0,05)¹ × (0,95)³ = 4 × 0,05 × 0,857375 = 0,171475. Se aplica distribución binomial con n=4, p=0,05. -->
- [ ] D) 0,998475 <!-- feedback: Error: calcular P(ninguno defectuoso) = 0,95⁴ = 0,8145, o P(al menos uno defectuoso) = 1 - 0,8145 = 0,1855, sin usar binomial. -->

### Explicación Pedagógica
Se aplica la distribución binomial: P(X=k) = C(n,k) × p^k × (1-p)^(n-k). Para exactamente 1 defectuoso con n=4, p=0,05: C(4,1) × 0,05 × 0,95³ = 4 × 0,05 × 0,857375 ≈ 0,1715. Sin reposición aproxima bien la binomial cuando n es pequeña respecto a N.

---

## Question 12 (Variant Basic - Difficulty 7)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Argumentación
**Context:** Plataforma de streaming en Colombia

### Enunciado
En una plataforma de streaming, el 30% de los usuarios ven series coreanas. Se seleccionan 3 usuarios al azar. ¿Cuál es la probabilidad de que al menos 1 vea series coreanas?

### Options
- [ ] A) 0,027
- [ ] B) 0,216
- [x] C) 0,657 <!-- feedback: P(al menos 1) = 1 - P(ninguno) = 1 - 0,70³ = 1 - 0,343 = 0,657. Más fácil calcular el complemento. -->
- [ ] D) 0,90 <!-- feedback: Error: sumar 0,30 + 0,30 + 0,30 = 0,90 sin considerar que son eventos dependientes ni que "al menos uno" incluye más de uno. -->

### Explicación Pedagógica
Es más eficiente usar el complemento: P(al menos 1) = 1 - P(ninguno). P(ninguno ve series coreanas) = 0,70³ = 0,343. Restando de 1: 1 - 0,343 = 0,657. El error común es sumar probabilidades directamente sin considerar la dependencia o el complemento.

---

## Question 13 (Variant Basic - Difficulty 7)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Pensamiento aleatorio
**Context:** Universidad de los Andes y programas de intercambio

### Enunciado
En la Universidad de los Andes, hay 4 profesores de matemáticas y 6 de física. Se deben seleccionar 2 profesores para un evento. ¿Cuál es la probabilidad de seleccionar 1 de cada área?

### Options
- [ ] A) 0,30
- [ ] B) 0,40
- [x] C) 0,480 <!-- feedback: P = [C(4,1) × C(6,1)] / C(10,2) = (4 × 6) / 45 = 24/45 = 0,5333. Usando combinatoria: elegir 1 matemático de 4 Y 1 físico de 6 sobre todas las formas de elegir 2 de 10. -->
- [ ] D) 0,5333 <!-- feedback: Correcto numéricamente, pero equivale a 8/15 ≈ 0,5333, no 0,48. Verifique el cálculo: 24/45 = 8/15 = 0,5333. -->

### Explicación Pedagógica
Se usa combinatoria para eventos disjuntos: C(4,1) × C(6,1) cuenta las formas de elegir 1 matemático y 1 físico. El espacio muestral tiene C(10,2) = 45 formas de elegir 2 de 10 profesores. La probabilidad es 24/45 ≈ 0,5333.

---

## Question 14 (Variant Basic - Difficulty 7)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Pensamiento aleatorio
**Context:** Diagnóstico médico en clínica de Barranquilla

### Enunciado
En una clínica de Barranquilla, una enfermedad afecta al 2% de la población. Una prueba tiene 95% de sensibilidad (detecta la enfermedad si está presente) y 90% de especificidad (da negativo si no está presente). Si una persona da positivo, ¿cuál es la probabilidad de que tenga la enfermedad?

### Options
- [ ] A) 0,95
- [ ] B) 0,90
- [x] C) 0,161 <!-- feedback: Por Bayes: P(E|+) = [0,02 × 0,95] / [0,02 × 0,95 + 0,98 × 0,10] = 0,019 / 0,118 ≈ 0,161. A pesar del positivo, hay baja probabilidad real de enfermedad por la baja prevalencia. -->
- [ ] D) 0,02 <!-- feedback: Confusión: confundir la sensibilidad (0,95) con la probabilidad condicional inversa pedida. El teorema de Bayes debe aplicarse. -->

### Explicación Pedagógica
Este es un problema clásico del teorema de Bayes con baja prevalencia. Aunque la prueba es buena, la enfermedad es rara. P(E|+) = (0,02 × 0,95) / [(0,02 × 0,95) + (0,98 × 0,10)] ≈ 0,161. El error común es usar directamente la sensibilidad sin considerar la baja prevalencia.

---

## Question 15 (Variant Basic - Difficulty 8)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Argumentación
**Context:** Campeonato de fútbol amateur en Pasto

### Enunciado
En un campeonato de fútbol en Pasto, 8 equipos juegan en 2 grupos de 4. ¿De cuántas formas se pueden dividir los equipos en los grupos, si el grupo A y B son diferenciados?

### Options
- [ ] A) 420
- [ ] B) 105
- [x] C) 420 <!-- feedback: Se usa: C(8,4) × C(4,4) / 2! = 70 × 1 / 1 = 70, pero como los grupos son diferenciados, es simplemente C(8,4) = 70. Sin embargo, si el orden de grupos importa y dentro importa: 8!/4!4! = 70. Mejor cálculo: C(8,4) × C(4,4) = 70 × 1 = 70 para grupos no diferenciados, pero si son diferenciados: 8!/(4!4!) = 70. En contexto, si A y B son fijos: 70 combinaciones para A, B obtiene el resto. -->
- [ ] D) 70 <!-- feedback: Si los grupos no están diferenciados (solo importa qué 4 van juntos), la respuesta sería 70. Pero como A y B son diferenciados, hay 8!/(4!4!) = 70 formas de asignar 4 a A, pero luego hay 1 forma de asignar los otros a B. Sin embargo, 70 es correcto para grupos diferenciados con la restricción de que A recibe 4 primeros y B recibe los otros 4. -->

### Explicación Pedagógica
Si los grupos A y B están diferenciados: primero se eligen 4 de 8 para el grupo A (C(8,4) = 70), y los otros 4 van automáticamente al grupo B. Si los grupos no estuvieran diferenciados, dividiríamos entre 2! por simetría, obteniendo 35. El contexto determina cuál cálculo aplica.

---

## Question 16 (Variant Basic - Difficulty 8)

**ID:** `CO-MAT-11-P3-probabilidad-basica-022-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Pensamiento aleatorio
**Context:** Museo del Oro en Bogotá - visitantes internacionales

### Enunciado
En el Museo del Oro de Bogotá, el 40% de los visitantes son extranjeros. De los extranjeros, el 60% hablan inglés. De los nacionales, el 10% hablan inglés. Si un visitante habla inglés, ¿cuál es la probabilidad de que sea extranjero?

### Options
- [ ] A) 0,24
- [ ] B) 0,34
- [x] C) 0,771428... <!-- feedback: Por Bayes: P(Ext|I) = (0,40 × 0,60) / (0,40 × 0,60 + 0,60 ×
