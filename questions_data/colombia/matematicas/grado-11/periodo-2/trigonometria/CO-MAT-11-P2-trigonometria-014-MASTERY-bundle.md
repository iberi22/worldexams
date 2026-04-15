<think>
Necesito generar 20 preguntas tipo ICFES Saber 11 para matemáticas, específicamente trigonometría, grado 11, periodo 2.

Las preguntas deben seguir una dificultad progresiva:
- Preguntas 1-4: D3-D4 (básicas)
- Preguntas 5-10: D5-D6 (intermedio)
- Preguntas 11-16: D7-D8 (avanzado)
- Preguntas 17-20: D9-D10 (experto)

Debo incluir:
- Frontmatter YAML con los metadatos
- 20 preguntas con estructura específica
- Contexto colombiano moderno
- Distractores plausibles
- Alineación ICFES

Voy a crear preguntas sobre trigonometría que cubran diferentes aspectos:
- Funciones trigonométricas
- Identidades trigonométricas
- Ecuaciones trigonométricas
- Resolución de triángulos
- Ángulos y sus medidas
- Ley de senos y cosenos
- Problemas aplicados

Todas las preguntas deben tener formato markdown con:
- ID único
- Taxonomía de Bloom
- Competencia ICFES
- Contexto colombiano
- Enunciado
- 4 opciones (A, B, C, D)
- Respuesta correcta marcada con [x]
- Explicación pedagógica

Empiezo a generar las preguntas:
</think>

```yaml
---
id: "CO-MAT-11-P2-trigonometria-014-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "trigonometria"
periodo: 2
protocol_version: "5.1"
bundle_size: 20
bundle_index: 14
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T08:39:56.676395"
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

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Identifier (identificar operaciones matemáticas)
**Context:** Monumentos históricos de Colombia

### Enunciado
En un recorrido turístico por la ciudad de Cartagena, un guía explica que desde un punto de observación se puede ver el fortín San Felipe bajo un ángulo de elevación de 30°. Si el turista está a 50 metros de la base del fortín, ¿cuál es la altura aproximada del fortín?

### Options
- [ ] A) 25 metros
- [ ] B) 28,87 metros
- [x] C) 28,87 metros <!-- feedback: Usando tan(30°) = altura/50, entonces altura = 50 × tan(30°) = 50 × 0,577 ≈ 28,87 metros -->
- [ ] D) 50 metros

### Explicación Pedagógica
La respuesta correcta es B (28,87 metros). Aplicando la definición de tangente en un triángulo rectángulo: tan(θ) = lado opuesto/lado adyacente. Como tan(30°) ≈ 0,577, la altura es 50 × 0,577 ≈ 28,87 m. El distractor A (25 m) resulta de dividir 50 entre 2 incorrectamente. El distractor C parece correcto pero tiene error de cálculo. El distractor D confunde la base con la altura.

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Formulator (comprender conceptos trigonométricos)
**Context:** Construcción de edificaciones en Bogotá

### Enunciado
Un arquitecto bogotano diseña una rampa para discapacitados con una inclinación de 15° respecto al suelo. Si la rampa tiene una longitud de 12 metros, ¿a qué altura vertical asciende la rampa?

### Options
- [ ] A) 2,5 metros
- [ ] B) 3,1 metros
- [x] C) 3,1 metros <!-- feedback: Usando sen(15°) = altura/12, altura = 12 × sen(15°) ≈ 12 × 0,259 ≈ 3,11 metros -->
- [ ] D) 11,6 metros

### Explicación Pedagógica
La respuesta correcta es B (3,1 metros). El seno del ángulo de inclinación relaciona la altura con la longitud de la rampa: sen(15°) ≈ 0,259. Error común: confundir seno con tangente (opción A resulta de usar tan) o con coseno (opción D resulta de calcular 12 × cos(15°)).

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulator (aplicar procedimientos)
**Context:** Teleféricos en Medellín

### Enunciado
El teleférico de Medellín tiene un cable que forma un ángulo de 25° con la horizontal. Si la distancia horizontal entre las torres es de 800 metros, ¿cuál es la longitud del cable?

### Options
- [ ] A) 320 metros
- [ ] B) 725,5 metros
- [x] C) 882,8 metros <!-- feedback: cos(25°) = 800/longitud, longitud = 800/cos(25°) ≈ 800/0,906 ≈ 882,8 metros -->
- [ ] D) 885,5 metros

### Explicación Pedagógica
La respuesta correcta es C (882,8 metros). Usando cos(θ) = lado adyacente/hipotenusa: cos(25°) ≈ 0,906, por lo tanto longitud = 800/0,906 ≈ 882,8 m. El distractor A confunde coseno con seno. El distractor B resulta de multiplicar 800 × 0,906 en lugar de dividir. El distractor D es un error de aproximación.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Formulator (aplicar razones trigonométricas)
**Context:** Arquitectura colonial en Popayán

### Enunciado
Una torre colonial en Popayán proyecta una sombra de 15 metros cuando el sol forma un ángulo de 40° con el horizonte. ¿Cuál es la altura de la torre?

### Options
- [ ] A) 9,64 metros
- [ ] B) 12,58 metros
- [x] C) 12,58 metros <!-- feedback: tan(40°) = altura/15, altura = 15 × tan(40°) ≈ 15 × 0,839 ≈ 12,58 metros -->
- [ ] D) 17,89 metros

### Explicación Pedagógica
La respuesta correcta es B (12,58 metros). Aplicando tangente: tan(40°) ≈ 0,839, entonces altura = 15 × 0,839 ≈ 12,58 m. El distractor A resulta de usar sen(40°) en lugar de tan. El distractor C es el resultado correcto con otro método de cálculo. El distractor D usa cotangente.

---

## Question 5 (Variant Medium - Difficulty 5)

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v5`
**Bloom:** Understand
**ICFES:** Interpretator (interpretar identidades)
**Context:** Fútbol profesional colombiano

### Enunciado
En un partido de fútbol en el Estadio Metropolitano de Barranquilla, un jugador remata el balón formando un ángulo de 30° con el suelo. Si la velocidad inicial es de 25 m/s, ¿cuál es la componente horizontal de la velocidad?

### Options
- [ ] A) 12,5 m/s
- [ ] B) 21,65 m/s
- [x] C) 21,65 m/s <!-- feedback: vx = v · cos(30°) = 25 × 0,866 ≈ 21,65 m/s -->
- [ ] D) 25 m/s

### Explicación Pedagógica
La respuesta correcta es C (21,65 m/s). La componente horizontal se calcula con coseno del ángulo: vx = 25 × cos(30°) = 25 × 0,866 = 21,65 m/s. El distractor A resulta de dividir entre 2. El distractor B usa sen(30°). El distractor D confunde las componentes de la velocidad.

---

## Question 6 (Variant Medium - Difficulty 5)

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v6`
**Bloom:** Understand
**ICFES:** Evaluator (evaluar expresiones trigonométricas)
**Context:** Agricultura en el Eje Cafetero

### Enunciado
Un agricultor del Eje Cafetero observa la copa de un árbol de café desde el suelo con un ángulo de elevación de 55°. Si la distancia horizontal es de 8 metros, ¿cuál es la altura aproximada del árbol?

### Options
- [ ] A) 5,6 metros
- [ ] B) 6,54 metros
- [x] C) 11,42 metros <!-- feedback: tan(55°) = altura/8, altura = 8 × tan(55°) ≈ 8 × 1,428 ≈ 11,42 metros -->
- [ ] D) 9,76 metros

### Explicación Pedagógica
La respuesta correcta es C (11,42 metros). Usando tangente: tan(55°) ≈ 1,428, entonces altura = 8 × 1,428 ≈ 11,42 m. El distractor A resulta de multiplicar por coseno. El distractor B usa sen(55°). El distractor D es el resultado de dividir entre coseno.

---

## Question 7 (Variant Medium - Difficulty 5)

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Formulator (aplicar identidades trigonométricas)
**Context:** Navegación en el Río Magdalena

### Enunciado
Si sen(θ) = 3/5 y θ está en el primer cuadrante, ¿cuál es el valor de cos(θ)?

### Options
- [ ] A) 4/5
- [ ] B) 2/5
- [x] C) 4/5 <!-- feedback: Usando sen²(θ) + cos²(θ) = 1, cos²(θ) = 1 - (3/5)² = 1 - 9/25 = 16/25, cos(θ) = 4/5 (primer cuadrante) -->
- [ ] D) 3/4

### Explicación Pedagógica
La respuesta correcta es A (4/5). Por la identidad pitagórica: cos²(θ) = 1 - sen²(θ) = 1 - 9/25 = 16/25, entonces cos(θ) = 4/5. El distractor B confunde con tangente. El distractor C es el resultado correcto. El distractor D es la razón sen/cos.

---

## Question 8 (Variant Medium - Difficulty 6)

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Formulator (resolver triángulos)
**Context:** Topografía en los Andes colombianos

### Enunciado
Un topógrafo en los Andes requiere medir la distancia entre dos puntos A y B separados por una ladera. Desde un punto C, forma un triángulo donde ∠A = 48°, ∠B = 62° y AC = 120 metros. ¿Cuál es la longitud de AB?

### Options
- [ ] A) 94,3 metros
- [ ] B) 108,6 metros
- [x] C) 152,6 metros <!-- feedback: ∠C = 180° - 48° - 62° = 70°. Usando ley de senos: AB/sen(62°) = 120/sen(70°), AB = 120 × sen(62°)/sen(70°) ≈ 152,6 m -->
- [ ] D) 145,8 metros

### Explicación Pedagógica
La respuesta correcta es C (152,6 metros). Primero se calcula el tercer ángulo: 70°. Luego se aplica la ley de senos. El distractor A usa 48° como referencia en lugar de 62°. El distractor B resulta de invertir la fracción en la ley de senos. El distractor D confunde 48° con 62°.

---

## Question 9 (Variant Medium - Difficulty 6)

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Interpretator (analizar identidades)
**Context:** Ingeniería civil en Colombia

### Enunciado
¿Cuál de las siguientes identidades es correcta para todo ángulo θ?

### Options
- [ ] A) sen(2θ) = 2sen(θ)
- [ ] B) cos(2θ) = 2cos²(θ) - 1
- [x] C) cos(2θ) = 2cos²(θ) - 1 <!-- feedback: Es una de las tres formas de la identidad del coseno del ángulo doble: cos(2θ) = cos²(θ) - sen²(θ) = 2cos²(θ) - 1 = 1 - 2sen²(θ) -->
- [ ] D) tan(θ) = sen(θ)/cos(θ) solo para θ ≠ 90°

### Explicación Pedagógica
La respuesta correcta es C. La identidad del coseno del ángulo doble tiene tres formas equivalentes. El distractor A olvida el factor 2 en el segundo término. El distractor B es correcto. El distractor D es verdadero pero incompleto (falta la condición θ ≠ 90° + kπ).

---

## Question 10 (Variant Medium - Difficulty 6)

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Formulator (aplicar ley de cosenos)
**Context:** Diseño de puentes en Colombia

### Enunciado
Un ingeniero diseña un puente con tres soportes que forman un triángulo. Dos lados miden 45 metros y 62 metros, y el ángulo entre ellos es de 75°. ¿Cuál es la longitud del tercer lado?

### Options
- [ ] A) 58,2 metros
- [ ] B) 71,4 metros
- [x] C) 71,4 metros <!-- feedback: c² = a² + b² - 2ab·cos(C), c² = 45² + 62² - 2(45)(62)cos(75°) ≈ 5097, c ≈ 71,4 m -->
- [ ] D) 82,1 metros

### Explicación Pedagógica
La respuesta correcta es B (71,4 metros). Aplicando la ley de cosenos: c² = 2025 + 3844 - 5580 × 0,259 ≈ 5097, c ≈ 71,4 m. El distractor A usa sen(75°). El distractor C es el resultado correcto. El distractor D usa cos(30°).

---

## Question 11 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Evaluator (evaluar ecuaciones trigonométricas)
**Context:** Señales de tráfico en vías colombianas

### Enunciado
Un vehículo recorre una pendiente con ángulo de inclinación de 12°. Si el recorrido vertical es de 25 metros, ¿cuál es la distancia recorrida por el vehículo sobre la pendiente?

### Options
- [ ] A) 120,8 metros
- [ ] B) 144,2 metros
- [x] C) 144,2 metros <!-- feedback: sen(12°) = 25/distancia, distancia = 25/sen(12°) ≈ 25/0,208 ≈ 120,8 metros. Error común: confundir sen con coseno -->
- [ ] D) 143,6 metros

### Explicación Pedagógica
La respuesta correcta es A (120,8 metros). sen(12°) = 25/distancia, distancia = 25/0,208 ≈ 120,8 m. El distractor B (144,2 m) resulta de usar cos(12°) = 25/distancia. El distractor C es el resultado correcto. El distractor D es otro error de cálculo.

---

## Question 12 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v12`
**Bloom:** Apply
**ICFES:** Formulator (resolver problemas trigonométricos)
**Context:** Astronomía desde los páramos de Colombia

### Enunciado
Un astrónomo desde el Paramo de Chingaza observa una estrella con un ángulo de elevación de 70°. Si la distancia directa a la estrella es de 500 km, ¿a qué altura vertical sobre el observador se encuentra la estrella?

### Options
- [ ] A) 171,5 km
- [ ] B) 469,8 km
- [x] C) 469,8 km <!-- feedback: sen(70°) = altura/500, altura = 500 × sen(70°) ≈ 500 × 0,94 ≈ 469,8 km -->
- [ ] D) 500 km

### Explicación Pedagógica
La respuesta correcta es C (469,8 km). sen(70°) ≈ 0,94, entonces altura = 500 × 0,94 = 469,8 km. El distractor A usa sen(20°). El distractor B es la respuesta correcta. El distractor D confunde distancia con altura.

---

## Question 13 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v13`
**Bloom:** Understand
**ICFES:** Interpretator (interpretar ángulos de elevación)
**Context:** Estaciones de policía en zonas rurales

### Enunciado
Un radar de la Policía de Carreteras detecta un vehículo a una distancia de 200 metros y a una altura de 30 metros sobre el nivel del radar. ¿Cuál es el ángulo de elevación en grados?

### Options
- [ ] A) 7,5°
- [ ] B) 8,6°
- [x] C) 8,6° <!-- feedback: tan(θ) = 30/200 = 0,15, θ = arctan(0,15) ≈ 8,6° -->
- [ ] D) 15°

### Explicación Pedagógica
La respuesta correcta es B (8,6°). tan(θ) = 30/200 = 0,15, entonces θ = arctan(0,15) ≈ 8,6°. El distractor A usa sen inverso. El distractor B es la respuesta correcta. El distractor D confunde 30/200 con 0,15 y calcula arctan(0,15) como 15°.

---

## Question 14 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Evaluator (analizar identidades)
**Context:** Sistemas de riego en agricultura de precisión

### Enunciado
Si sen(α) = 5/13 y α está en el segundo cuadrante, ¿cuál es el valor de tan(α)?

### Options
- [ ] A) 5/12
- [ ] B) -5/12
- [x] C) -5/12 <!-- feedback: cos²(α) = 1 - sen²(α) = 1 - 25/169 = 144/169, cos(α) = -12/13 (segundo cuadrante). tan(α) = sen/cos = (5/13)/(-12/13) = -5/12 -->
- [ ] D) 12/5

### Explicación Pedagógica
La respuesta correcta es B (-5/12). En el segundo cuadrante, el seno es positivo y el coseno negativo, por lo tanto la tangente es negativa. El distractor A no considera el signo del coseno. El distractor C es la respuesta correcta. El distractor D es la cotangente.

---

## Question 15 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v15`
**Bloom:** Apply
**ICFES:** Formulator (resolver ecuaciones trigonométricas)
**Context:** Torres de comunicación en Colombia

### Enunciado
Una torre de telecomunicaciones de 80 metros de altura se observa desde un punto en el suelo con un ángulo de elevación de 35°. ¿A qué distancia está el observador de la base de la torre?

### Options
- [ ] A) 45,8 metros
- [ ] B) 65,5 metros
- [x] C) 114,3 metros <!-- feedback: tan(35°) = 80/distancia, distancia = 80/tan(35°) ≈ 80/0,7 ≈ 114,3 metros -->
- [ ] D) 97,8 metros

### Explicación Pedagógica
La respuesta correcta es C (114,3 metros). tan(35°) ≈ 0,7, entonces distancia = 80/0,7 ≈ 114,3 m. El distractor A resulta de usar sen(35°). El distractor B usa cos(35°). El distractor D es otro error de cálculo.

---

## Question 16 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Interpretator (analizar funciones trigonométricas)
**Context:** Ciclo de mareas en la costa Caribe colombiana

### Enunciado
El nivel del agua en la bahía de Santa Marta sigue la función h(t) = 3sen(πt/6) + 5, donde h está en metros y t en horas. ¿Cuál es la amplitud del movimiento?

### Options
- [ ] A) 3 metros
- [ ] B) 5 metros
- [x] C) 3 metros <!-- feedback: La amplitud de una función seno de la forma A·sen(Bt) + C es |A|, en este caso |3| = 3 metros -->
- [ ] D) 8 metros

### Explicación Pedagógica
La respuesta correcta es A (3 metros). La amplitud de una función trigonométrica es el valor absoluto del coeficiente de la función seno o coseno. El distractor B confunde la amplitud con el valor medio (desplazamiento vertical). El distractor C es la respuesta correcta. El distractor D suma amplitud más desplazamiento.

---

## Question 17 (Variant Expert - Difficulty 9)

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Evaluator (evaluar expresiones trigonométricas complejas)
**Context:** Ingeniería estructural en skyscrapers de Bogotá

### Enunciado
Si sen(θ) + cos(θ) = 3/5, ¿cuál es el valor de sen(θ)·cos(θ)?

### Options
- [ ] A) -8/25
- [ ] B) -8/50
- [x] C) -8/25 <!-- feedback: Elevando al cuadrado: (sen + cos)² = sen² + cos² + 2sen·cos = 9/25. Como sen² + cos² = 1, entonces 2sen·cos = 9/25 - 1 = -16/25, sen·cos = -8/25 -->
- [ ] D) 8/25

### Explicación Pedagógica
La respuesta correcta es A (-8/25). Elevando al cuadrado: 1 + 2sen·cos = 9/25, entonces 2sen·cos = 9/25 - 25/25 = -16/25, por lo tanto sen·cos = -8/25. El distractor B divide entre 2 incorrectamente. El distractor C es la respuesta correcta. El distractor D olvida el signo negativo.

---

## Question 18 (Variant Expert - Difficulty 9)

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v18`
**Bloom:** Create
**ICFES:** Formulator (crear y resolver problemas)
**Context:** Construcción de tunnels en los Andes

### Enunciado
Para construir un túnel en la Cordillera Central, dos equipos trabajan desde puntos opuestos. Desde el punto A, el ángulo de depresión al otro extremo es de 42°. Desde el punto B, el ángulo de depresión es de 48°. Si los puntos están a 500 metros de distancia horizontal, ¿cuál es la longitud del túnel?

### Options
- [ ] A) 342,1 metros
- [ ] B) 368,4 metros
- [x] C) 368,4 metros <!-- feedback: Sea x la distancia desde A al extremo. Entonces 500-x desde B. tan(42°) = h/x, tan(48°) = h/(500-x). Resolviendo: h = x·tan(42°), h = (500-x)·tan(48°). x ≈ 131,6 m, h ≈ 118,5 m. Longitud = √(500² + h²) ≈ 515,2 m -->
- [ ] D) 412,7 metros

### Explicación Pedagógica
La respuesta correcta es C. Este problema requiere establecer dos ecuaciones con dos incógnitas usando tangentes de los ángulos de depresión. El distractor A solo usa un ángulo. El distractor B es el resultado correcto. El distractor D usa un promedio incorrecto.

---

## Question 19 (Variant Expert - Difficulty 10)

**ID:** `CO-MAT-11-P2-trigonometria-014-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Evaluator (evaluar identidades trigonométricas complejas)
**Context:** Análisis de señales en telecomunicaciones

### Enunciado
¿Cuál es el valor simplificado de (1 - cos²(θ))/(1 - sen²(θ))?

### Options
- [ ] A) tan²(θ)
- [ ] B) cot²(θ)
- [x] C) tan²(θ) <!-- feedback: 