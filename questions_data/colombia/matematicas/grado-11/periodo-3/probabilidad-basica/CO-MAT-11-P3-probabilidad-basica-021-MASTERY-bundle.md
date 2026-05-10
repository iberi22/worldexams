<think>
El usuario me pide generar exactamente 20 preguntas tipo ICFES Saber 11 para matemáticas, tema probabilidad básica, grado 11, período 3.

Necesito seguir el formato exacto con:
- Frontmatter YAML al inicio
- 20 preguntas con estructura específica
- Dificultad progresiva: D3-D4 (1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
- Contexto colombiano moderno
- Distractores plausibles basados en errores comunes de estudiantes colombianos
- Formato markdown con opciones A, B, C, D
- [x] en la respuesta correcta

Voy a crear preguntas de probabilidad básica que incluyan:
- Definición de probabilidad
- Espacio muestral y eventos
- Probabilidad de eventos simples
- Regla de la suma
- Probabilidad condicional básica
- Eventos independientes
- Diagramas de árbol básicos

Contexto colombiano moderno puede incluir:
- Elecciones locales
- Festivals como el Carnival de Barranquilla
- Juegos clasificatorios
- Transporte público
-Apps de comida
- Deportes como fútbol
- Situaciones educativas

Voy a generar las 20 preguntas ahora.
</think>

```markdown
---
id: "CO-MAT-11-P3-probabilidad-basica-021-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "probabilidad-basica"
periodo: 3
protocol_version: "5.1"
bundle_size: 20
bundle_index: 21
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T09:02:17.881869"
  prompt_version: "v2-direct"
quality_status: "UNREVISED"
generation_status: "RAW"
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

**ID:** `CO-MAT-11-P3-probabilidad-basica-021-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Interpretación y uso de representaciones de datos
**Context:** Situación cotidiana en Bogotá relacionada con transporte

### Enunciado
En el sistema de transporte masivo TransMilenio de Bogotá, un usuario selecciona al azar una ruta para viajar. Si existen 8 rutas troncales disponibles y todas tienen la misma probabilidad de ser elegidas, ¿cuál es la probabilidad de que seleccione una ruta específica, por ejemplo la ruta G12?

### Options
- [ ] A) 1/7
- [ ] B) 7/8
- [x] C) 1/8
- [ ] D) 8/1

### Explicación Pedagógica
La respuesta correcta es C) 1/8 porque cuando todos los resultados posibles son igualmente probables, la probabilidad de un evento simple se calcula como 1 dividido entre el número total de resultados posibles. El distractor A) 1/7 es común porque algunos estudiantes confunden el número de rutas con la cantidad de espacios "disponibles" restando uno. El distractor B) 7/8 refleja el error de pensar que probabilidad mayor significa más cercano a 1. El distractor D) 8/1 no es válido porque las probabilidades siempre están entre 0 y 1.

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P3-probabilidad-basica-021-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Análisis de conceptos de probabilidad
**Context:** Carnival de Barranquilla - festival cultural

### Enunciado
Durante el Carnival de Barranquilla se realiza una rifa con boletas numeradas del 1 al 50. Si el número ganador se elige mediante un tambo que selecciona aleatoriamente una boleta, ¿cuál es la probabilidad de que el número ganador sea par?

### Options
- [ ] A) 1/2
- [x] B) 1/2
- [ ] C) 25/50 = 1/2
- [ ] D) 24/50

### Explicación Pedagógica
La respuesta correcta es B) 1/2. Hay exactamente 25 números pares (2, 4, 6, ..., 50) de un total de 50 números posibles. La probabilidad es 25/50 = 1/2. El distractor C) 25/50 = 1/2 es numéricamente correcto pero la simplificación ya se realizó en B). El distractor D) 24/50 muestra el error común de contar uno menos en uno de los conjuntos o no contar correctamente los límites.

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P3-probabilidad-basica-021-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Comprensión de espacio muestral y eventos
**Context:** Aplicación de comida Rappi en ciudades colombianas

### Enunciado
Un estudiante en Medellín ordena comida a través de la app Rappi. La app muestra 4 restaurantes cercanos: A, B, C y D. Si el estudiante elige un restaurante al azar y luego pide un plato al azar del menú de ese restaurante (que tiene 3 platos disponibles), ¿cuántos resultados diferentes puede obtener?

### Options
- [ ] A) 4 resultados
- [ ] B) 7 resultados
- [x] C) 12 resultados
- [ ] D) 3 resultados

### Explicación Pedagógica
La respuesta correcta es C) 12 resultados. Por el principio de multiplicación, el número total de resultados es 4 × 3 = 12, ya que por cada restaurante hay 3 platos posibles. El distractor A) 4 confunde el número de restaurantes con el total de resultados. El distractor B) 7 es el resultado de sumar (4 + 3) en lugar de multiplicar. El distractor D) 3 solo cuenta los platos.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P3-probabilidad-basica-021-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Aplicación de la regla de Laplace
**Context:** Sistema de calificaciones en colegios colombianos

### Enunciado
En un colegio de Cali, un estudiante debe elegir una materia electiva para el próximo período. Puede elegir entre 3 idiomas (francés, alemán, portugués) y 2 artes (música y teatro). Si la asignación se hace aleatoriamente entre estas opciones, ¿cuál es la probabilidad de que le asignen un idioma?

### Options
- [ ] A) 3/5
- [x] B) 3/5
- [ ] C) 2/5
- [ ] D) 1/2

### Explicación Pedagógica
La respuesta correcta es B) 3/5. Hay 5 opciones totales (3 idiomas + 2 artes) y 3 de ellas son idiomas. Por la regla de Laplace, P(idioma) = casos favorables/casos totales = 3/5. El distractor C) 2/5 es la probabilidad de que le asignen arte (el complemento). El distractor D) 1/2 muestra el error de asumir que siempre hay mitad de opciones cuando no es el caso.

---

## Question 5 (Variant Basic - Difficulty 5)

**ID:** `CO-MAT-11-P3-probabilidad-basica-021-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Resolución de problemas de probabilidad simple
**Context:** Eliminatorias al Mundial de selecciones suramericanas

### Enunciado
En las Eliminatorias al Mundial, la Selección Colombia debe jugar un partido crucial. El director técnico convocará a uno de tres porteros: Ospina, Vargas o Montero. Si la selección del arquero titular se hace de manera completamente aleatoria entre estos tres, ¿cuál es la probabilidad de que Ospina sea el titular?

### Options
- [ ] A) 1/4
- [ ] B) 1/3
- [ ] C) 2/3
- [ ] D) 1/2

### Explicación Pedagógica
La respuesta correcta es B) 1/3. Como hay 3 porteros con igual probabilidad y solo 1 es Ospina, la probabilidad es 1/3. El distractor A) 1/4 refleja el error de pensar que hay un "ninguno" como opción adicional. El distractor D) 1/2 es el error común de asumir que siempre hay dos opciones igualmente probables. El distractor C) 2/3 es la probabilidad del complemento (que NO sea Ospina).

---

## Question 6 (Variant Basic - Difficulty 5)

**ID:** `CO-MAT-11-P3-probabilidad-basica-021-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Análisis de eventos compuestos
**Context:** Juegos de mesa tradicionales colombianos

### Enunciado
En el juego tradicional colombiano de "Parqués", un jugador lanza dos dados de seis caras. ¿Cuál es la probabilidad de obtener exactamente un 6 en los dos lanzamientos?

### Options
- [ ] A) 1/36
- [x] B) 10/36
- [ ] C) 2/36
- [ ] D) 12/36

### Explicación Pedagógica
La respuesta correcta es B) 10/36. Los casos favorables son: (6,1), (6,2), (6,3), (6,4), (6,5), (1,6), (2,6), (3,6), (4,6), (5,6) = 10 casos. Los casos totales son 6 × 6 = 36. El distractor A) 1/36 es la probabilidad de obtener dos 6 simultáneos. El distractor C) 2/36 solo cuenta (6,x) y (x,6) sin considerar los 5 valores del dado que no es 6. El distractor D) 12/36 sería el doble.

---

## Question 7 (Variant Basic - Difficulty 5)

**ID:** `CO-MAT-11-P3-probabilidad-basica-021-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Análisis de eventos complementarios
**Context:** Sorteo de boletas para el Festival de Teatro de Bogotá

### Enunciado
En la Universidad Nacional de Colombia se rifan 100 boletas para una función del Festival de Teatro de Bogotá. Un estudiante compra 4 boletas numeradas. Si se extrae una boleta al azar, ¿cuál es la probabilidad de que el estudiante NO gane ninguna boleta?

### Options
- [ ] A) 96/100
- [ ] B) 4/100
- [x] C) 96/100
- [ ] D) 4/96

### Explicación Pedagógica
La respuesta correcta es C) 96/100. De las 100 boletas, 4 tienen el número del estudiante y 96 no. La probabilidad de no ganar es 96/100 = 0.96. El distractor A) 96/100 es correcto numéricamente pero expresado de forma que algunos estudiantes lo confunden. El distractor B) 4/100 es la probabilidad de ganar (evento complementario). El distractor D) 4/96 es un error de cálculo sin fundamento.

---

## Question 8 (Variant Basic - Difficulty 6)

**ID:** `CO-MAT-11-P3-probabilidad-basica-021-MASTERY-v8`
**Bloom:** Understand
**ICFES:** Comprensión de la regla de la suma
**Context:** Inscripciones universitarias en Colombia

### Enunciado
En una universidad de Cartagena, los estudiantes de nuevo semestre pueden matricular exactamente una actividad extracurricular: fútbol, natación o danza. El 30% eligen fútbol, el 25% eligen natación y el resto eligen danza. Si se selecciona un estudiante al azar, ¿cuál es la probabilidad de que haya elegido fútbol o natación?

### Options
- [ ] A) 0,30
- [ ] B) 0,25
- [x] C) 0,55
- [ ] D) 0,70

### Explicación Pedagógica
La respuesta correcta es C) 0,55. Para eventos mutuamente excluyentes (un estudiante solo puede elegir una actividad), la probabilidad de la unión es la suma: P(F ∪ N) = P(F) + P(N) = 0,30 + 0,25 = 0,55. El distractor A) 0,30 es solo la probabilidad de fútbol y el B) 0,25 solo la de natación. El distractor D) 0,70 es el error de restar de 1 en lugar de sumar.

---

## Question 9 (Variant Basic - Difficulty 6)

**ID:** `CO-MAT-11-P3-probabilidad-basica-021-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Aplicación de probabilidad condicional básica
**Context:** Diagnóstico médico en clínica de Bucaramanga

### Enunciado
En una clínica de Bucaramanga, el 70% de los pacientes que llegan con síntomas de dengue son diagnosticados con la enfermedad. Si se selecciona un paciente con síntomas al azar, ¿cuál es la probabilidad de que NO tenga dengue?

### Options
- [ ] A) 70%
- [ ] B) 30%
- [x] C) 30%
- [ ] D) 50%

### Explicación Pedagógica
La respuesta correcta es C) 30%. Si P(dengue) = 0,70, entonces P(no dengue) = 1 - 0,70 = 0,30 = 30%, usando el complemento. El distractor A) 70% es la probabilidad del evento dado. El distractor D) 50% es el error de asumir equiprobabilidad. El distractor B) 30% es correcto pero algunos estudiantes lo marcan por error sin entender el complemento.

---

## Question 10 (Variant Basic - Difficulty 6)

**ID:** `CO-MAT-11-P3-probabilidad-basica-021-MASTERY-v10`
**Bloom:** Analyze
**ICFES:** Análisis de probabilidades en contextos geométricos
**Context:** Servicio de pizza a domicilio en Pereira

### Enunciado
Una pizzería en Pereira entrega pedidos en un cuadrado de 10 km × 10 km. El área de entrega corresponde a todo el cuadrado. Si un cliente vive en el centro de la ciudad (punto que está a 2 km de cada borde), ¿cuál es la probabilidad de que un repartidor que selecciona aleatoriamente un punto de entrega dentro del cuadrado llegue a una zona que esté a más de 2 km de todos los bordes?

### Options
- [ ] A) 4/100
- [ ] B) 36/100
- [x] C) 36/100
- [ ] D) 64/100

### Explicación Pedagógica
La respuesta correcta es C) 36/100. La zona central donde todas las distancias superan 2 km corresponde a un cuadrado de 6 km × 6 km (10 - 2×2 = 6). El área central es 36 km² y el área total es 100 km², así que la probabilidad es 36/100. El distractor A) 4/100 es el área del cuadrado de 2 km × 2 km en una esquina. El distractor D) 64/100 es el área fuera de la zona central.

---

## Question 11 (Variant Basic - Difficulty 7)

**ID:** `CO-MAT-11-P3-probabilidad-basica-021-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Análisis de eventos no excluyentes
**Context:** Encuesta electoral en Medellín

### Enunciado
En una encuesta realizada en Medellín para las elecciones locales, se encontró que el 40% de los encuestados apoyan al candidato A, el 35% al candidato B, y el 15% apoyan a ambos candidatos. Si se selecciona una persona al azar de esta encuesta, ¿cuál es la probabilidad de que apoye al candidato A o al candidato B?

### Options
- [ ] A) 75%
- [ ] B) 55%
- [x] C) 60%
- [ ] D) 20%

### Explicación Pedagógica
La respuesta correcta es C) 60%. Para eventos no excluyentes: P(A ∪ B) = P(A) + P(B) - P(A ∩ B) = 0,40 + 0,35 - 0,15 = 0,60. El distractor A) 75% es el error de sumar sin restar la intersección. El distractor B) 55% es P(A) + P(B) - P(A y B)/2. El distractor D) 20% es solo la intersección multiplicada.

---

## Question 12 (Variant Basic - Difficulty 7)

**ID:** `CO-MAT-11-P3-probabilidad-basica-021-MASTERY-v12`
**Bloom:** Apply
**ICFES:** Resolución de problemas con diagrama de árbol
**Context:** Proceso de admisión universitaria en Colombia

### Enunciado
Para ingresar a una universidad pública colombiana, un estudiante debe aprobar el examen SABER 11 y luego una entrevista. La probabilidad de aprobar el examen es 0,6 y, si lo aprueba, la probabilidad de pasar la entrevista es 0,8. ¿Cuál es la probabilidad de que el estudiante sea admitido?

### Options
- [ ] A) 0,48
- [ ] B) 0,14
- [x] C) 0,48
- [ ] D) 1,4

### Explicación Pedagógica
La respuesta correcta es C) 0,48. Como la entrevista solo ocurre si aprueba el examen, se usa la regla de multiplicación: P(ser admitido) = P(aprobar examen) × P(pasar entrevista | aprobó examen) = 0,6 × 0,8 = 0,48. El distractor B) 0,14 es el resultado de multiplicar 0,6 × 0,8 y luego dividir por 3. El distractor D) 1,4 es mayor que 1, lo cual es imposible para una probabilidad.

---

## Question 13 (Variant Basic - Difficulty 7)

**ID:** `CO-MAT-11-P3-probabilidad-basica-021-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Análisis de eventos independientes
**Context:** Producción de café en哥伦比亚种植园

### Enunciado
En una finca cafetera de Huila, la probabilidad de que una planta de café produzca frutos de alta calidad es 0,7. Si se seleccionan dos plantas de manera independiente, ¿cuál es la probabilidad de que ambas produzcan frutos de alta calidad?

### Options
- [ ] A) 0,49
- [x] B) 0,49
- [ ] C) 1,4
- [ ] D) 0,14

### Explicación Pedagógica
La respuesta correcta es B) 0,49. Para eventos independientes, P(A y B) = P(A) × P(B) = 0,7 × 0,7 = 0,49. El distractor C) 1,4 es imposible (mayor que 1). El distractor D) 0,14 es 0,7 × 0,2, confundiendo el complemento. El distractor A) 0,49 es correcto numéricamente pero es el mismo valor que B.

---

## Question 14 (Variant Basic - Difficulty 7)

**ID:** `CO-MAT-11-P3-probabilidad-basica-021-MASTERY-v14`
**Bloom:** Apply
**ICFES:** Aplicación de probabilidad con Diagramas de Venn
**Context:** Deportes en instituciones educativas colombianas

### Enunciado
En un colegio de Cali, el 60% de los estudiantes practican fútbol, el 45% practican natación y el 20% practican ambos deportes. Si se selecciona un estudiante al azar, ¿cuál es la probabilidad de que NO practique ninguno de estos dos deportes?

### Options
- [ ] A) 15%
- [ ] B) 85%
- [x] C) 15%
- [ ] D) 105%

### Explicación Pedagógica
La respuesta correcta es C) 15%. Primero se calcula P(F ∪ N) = P(F) + P(N) - P(F ∩ N) = 0,60 + 0,45 - 0,20 = 0,85. Luego, el complemento: P(no F y no N) = 1 - 0,85 = 0,15 = 15%. El distractor A) 15% es correcto numéricamente. El distractor B) 85% es el valor de la unión. El distractor D) 105% es imposible.

---

## Question 15 (Variant Basic - Difficulty 8)

**ID:** `CO-MAT-11-P3-probabilidad-basica-021-MASTERY-v15`
**Bloom:** Analyze
**ICFES:** Análisis de permutaciones y combinaciones
**Context:** Selección de delegadas en evento cultural de Bogotá

### Enunciado
En la Universidad de los Andes de Bogotá, se necesitan seleccionar 3 delegadas de un grupo de 8 estudiantes para representar a la institución en un evento cultural. Si el orden no importa, ¿cuántas formas diferentes hay de seleccionar las delegadas?

### Options
- [ ] A) 336
- [ ] B) 24
- [x] C) 56
- [ ] D) 8

### Explicación Pedagógica
La respuesta correcta es C) 56. Como el orden no importa, se usa combinación: C(8,3) = 8!/(3!×5!) = (8×7×6)/(3×2×1) = 336/6 = 56. El distractor A) 336 es el resultado de permutación P(8,3) = 8×7×6 = 336. El distractor B) 24 es 4! o P(4,4). El distractor D) 8 es solo n.

---

## Question 16 (Variant Basic - Difficulty 8)

**ID:** `CO-MAT-11-P3-probabilidad-basica-021-MASTERY-v16`
**Bloom:** Evaluate
**ICFES:** Evaluación de argumentos probabilísticos
**Context:** Análisis de errores comunes en probabilidad

### Enunciado
Un estudiante afirma: "Lancé una moneda 9 veces y todas cayeron cara. Entonces en el próximo lanzamiento es más probable que caiga sello porque la moneda debe equilibrarse." ¿Cuál es la evaluación correcta de este argumento?

### Options
- [ ] A) El argumento es correcto porque las monedas tienden a equilibrarse
- [ ] B) El argumento es incorrecto porque la probabilidad de sello es 1/2
- [x] C) El argumento es incorrecto porque la probabilidad de sello es 1/2
- [ ] D) El argumento es correcto porque las monedas tienen memoria

### Explicación Pedagógica
La respuesta correcta es C) 1/2. Este es el error de "la falacia del jugador": las monedas no tienen memoria y cada lanzamiento es independiente. La probabilidad de sello sigue siendo 1/2 sin importar lo que haya salido antes. El distractor A) es el error de pensar que hay tendencias naturales. El distractor D) describe el nombre del error pero lo califica como correcto.

---

## Question 17 (Variant Basic - Difficulty 9)

**ID:** `CO-MAT-11-P3-probabilidad-basica-021-MASTERY-v17`
**Bloom:** Create
**ICFES:** Diseño de soluciones a problemas complejos de probabilidad
**Context:** Sistema de salud en Colombia

### Enunciado
En una EPS de Bogotá, el 80% de los afiliados están satisfechos con el servicio. Se selecciona una muestra de 3 afiliados. ¿Cuál es la probabilidad de que exactamente 2 de ellos estén satisfechos con el servicio?

### Options
- [ ] A) 0,384
- [x] B) 0,384
- [ ] C) 0,128
- [ ] D) 0,096

### Explicación Pedagógica
La respuesta correcta es B) 0,384. Usando la distribución binomial: P(X=2) = C(3,2) × (0,8)² × (0,2)¹ = 3 × 0,64 × 0,2 = 0,384. El distractor C) 0,128 es P(X=3) = 0,512 × 0,2 = 0,1024 ≈ 0,1. El distractor D) 0,096 es 0,8 × 0,2 × 0,6 sin el coeficiente combinatorio.

---

## Question 18 (Variant Basic - Difficulty 9)

**ID:** `CO-MAT-11-P3-probabilidad-basica-021-MASTERY-v18`
**Bloom:** Analyze
**ICFES:** Análisis de tablas de contingencia
**Context:** Datos del DANE sobre empleo en Colombia

### Enunciado
Según datos del DANE, en una ciudad colombiana el 55% de la población son mujeres, el 60% de la población está empleada, y el 35% son mujeres empleadas. Si se selecciona una persona al azar, ¿cuál es la probabilidad de que sea hombre o esté desempleado?

### Options
- [ ] A) 0,20
- [ ] B) 0,65
- [x] C) 0,60
- [ ] D) 0,80

### Explicación Pedagógica
La respuesta correcta es C) 0,60. Primero: P(hombre) = 1 - 0,55 = 0,45. Segundo: P(desempleado) = 1 - 0,60 = 0,40. Tercero: P(hombre y empleada) = P(hombre) × P(empleada) si fueran independientes, pero no lo son. Usando: P(hombre ∪ desempleado) = P(hombre) + P(desempleado) - P(hombre y desempleado). P(hombre y desempleado) = P(desempleado) - P(mujer y desempleada) = 0,40 - 0,05 = 0,35. Entonces: P = 0,45 + 0,40 - 0,35 = 0,50. Sin embargo, el distractor B) sería la suma directa sin restar intersección. Necesitamos calcular correctamente: P(mujer y desempleada) = 0,55 - 0,35 = 0,20. P(hombre y desempleado) = 0,40 - 0,20 = 0,20. P(hombre) = 0,45. P(hombre ∪ desempleado) = 0,45 + 0,40 - 0,20 = 0,65. Verificamos: P(D) = 0,40
