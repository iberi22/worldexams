<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for Colombian high school exit exam (Saber 11) in Natural Sciences, specifically about movement/physics, grade 11, period 2.

I need to follow the exact format with frontmatter YAML metadata and then 20 questions in the specific format requested. Let me generate these questions with progressive difficulty:

- Questions 1-4: Difficulty D3-D4 (basic)
- Questions 5-10: Difficulty D5-D6 (intermediate)
- Questions 11-16: Difficulty D7-D8 (advanced)
- Questions 17-20: Difficulty D9-D10 (complex)

The topics should cover movement in physics including:
- Kinematics (displacement, velocity, acceleration)
- Equations of motion
- Graphs of motion
- Projectile motion
- Relative motion
- Newton's laws related to motion

Let me create 20 high-quality questions with Colombian contexts and plausible distractors that represent common student errors.

</think>

---
id: "CO-CIE-11-P2-movimiento-fisica-067-MASTERY"
country: "colombia"
grado: 11
asignatura: "ciencias-naturales"
tema: "movimiento-fisica"
periodo: 2
protocol_version: "5.1"
bundle_size: 20
bundle_index: 67
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T19:01:47.546917"
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

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Indagación
**Context:** Sistema de transporte masivo de Bogotá

### Enunciado
El Transmilenio avanza por la troncal de la Avenida Caracas a una velocidad constante de 36 km/h. ¿Cuál es la velocidad expresada en metros por segundo (m/s)?

### Options
- [ ] A) 1 m/s
- [ ] B) 5 m/s
- [x] C) 10 m/s <!-- feedback: 36 km/h × (1000 m/1 km) × (1 h/3600 s) = 10 m/s. Conversión básica de unidades. -->
- [ ] D) 36 m/s <!-- feedback: Error común de no convertir las unidades y mantener km/h como si fueran m/s. -->

### Explicación Pedagógica
La conversión correcta requiere multiplicar 36 por 1000/3600. Un error frecuente es no realizar la conversión de horas a segundos o dividir incorrectamente. Otra equivocación típica es considerar que 36 km/h equivale directamente a 36 m/s.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Uso de conceptos
**Context:** Competencia de atletismo en los Juegos Bolivarianos

### Enunciado
Un atleta de 100 metros planos recorre la distancia en 10 segundos. ¿Cuál fue su velocidad media durante la carrera?

### Options
- [ ] A) 0.1 m/s
- [ ] B) 1 m/s
- [ ] C) 10 m/s
- [x] D) 10 m/s <!-- feedback: v = Δx/Δt = 100 m/10 s = 10 m/s. La velocidad media se calcula dividiendo el desplazamiento total entre el tiempo total. -->
- [ ] A) 1000 m/s <!-- feedback: Confusión entre desplazamiento y tiempo; se multiplican en lugar de dividirse. -->

### Explicación Pedagógica
La velocidad media es el cociente entre desplazamiento y tiempo. Error frecuente: multiplicar distancia por tiempo o realizar operaciones incorrectas con los valores. Algunos estudiantes confunden unidades o aplican fórmulas de aceleración.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Interpretación
**Context:** Sistema de alerta sísmica en Colombia

### Enunciado
Un cuerpo se mueve en línea recta y su velocidad cambia de 20 m/s a 30 m/s en 5 segundos. ¿Cuál es la aceleración media del cuerpo en este intervalo?

### Options
- [ ] A) 2 m/s²
- [x] B) 2 m/s² <!-- feedback: a = (vf - vi)/t = (30 - 20)/5 = 10/5 = 2 m/s². La aceleración es el cambio de velocidad entre el tiempo. -->
- [ ] C) 10 m/s² <!-- feedback: Error de sumar velocidades en lugar de restarlas, obteniendo 50/5 = 10 m/s². -->
- [ ] D) 50 m/s² <!-- feedback: Se multiplican los valores en lugar de aplicar la fórmula correcta. -->

### Explicación Pedagógica
La aceleración media se define como el cambio en la velocidad dividido entre el intervalo de tiempo. Error común: no restar correctamente (vf - vi) o confundir el orden de la operación. También es frecuente olvidar que se debe dividir entre el tiempo.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Explicación
**Context:** Teleférico de Matecaña en Pereira

### Enunciado
Una cabina del teleférico asciende verticalmente con velocidad constante de 5 m/s durante 8 segundos. ¿Cuál es el desplazamiento total de la cabina?

### Options
- [ ] A) 1.6 m
- [x] B) 40 m <!-- feedback: Δx = v × t = 5 m/s × 8 s = 40 m. Para movimiento uniforme, el desplazamiento es velocidad por tiempo. -->
- [ ] C) 13 m <!-- feedback: Error de sumar velocidad y tiempo en lugar de multiplicarlos. -->
- [ ] D) 0.625 m/s <!-- feedback: Se confunde desplazamiento con velocidad, dividiendo 5/8. -->

### Explicación Pedagógica
En el movimiento rectilíneo uniforme (MRU), el desplazamiento se calcula multiplicando la velocidad constante por el tiempo. Errores típicos: confundir cuándo se multiplica y cuándo se divide, o expresar la respuesta en unidades incorrectas.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Argumentación
**Context:** Rally de autos en Cartagena

### Enunciado
Un automóvil parte del reposo y acelera uniformemente a 4 m/s² durante 6 segundos. ¿Qué distancia recorre en ese tiempo?

### Options
- [ ] A) 24 m
- [ ] B) 48 m
- [x] C) 72 m <!-- feedback: x = ½ × a × t² = ½ × 4 × 6² = ½ × 4 × 36 = 72 m. Se usa la ecuación de MRUA para distancia con posición inicial cero. -->
- [ ] D) 144 m <!-- feedback: Se olvida el factor ½ en la fórmula, usando x = a × t² = 4 × 36 = 144 m. -->

### Explicación Pedagógica
La ecuación correcta para el movimiento uniformemente acelerado partiendo del reposo es x = ½at². Error frecuente: omitir el factor ½ o confundir esta ecuación con otras del movimiento uniformly acelerado.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Uso de conceptos
**Context:** Sistema de transporte férreo en Medellín

### Enunciado
Un tren que viaja a 72 km/h debe detenerse ante una señal. Si su aceleración de frenado es -5 m/s², ¿qué distancia necesita para detenerse completamente?

### Options
- [ ] A) 20 m
- [x] B) 40 m <!-- feedback: Primero convertir 72 km/h = 20 m/s. Luego d = v²/(2a) = 400/(2×5) = 400/10 = 40 m. -->
- [ ] C) 144 m <!-- feedback: No se convierte la velocidad a m/s, dejando 72 km/h y calculando 72²/10. -->
- [ ] D) 400 m <!-- feedback: Se calcula v² = 400 sin dividir por 2a, obteniendo una distancia irreal. -->

### Explicación Pedagógica
Primero se debe convertir la velocidad a unidades del SI (m/s). Luego se aplica la ecuación de frenado d = v²/(2|a|). Error común: no convertir unidades o aplicar incorrectamente la fórmula de cinemática.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Indagación
**Context:** Proyecto de cicloruta en Cali

### Enunciado
Un ciclistas baja por una pendiente de la Calle 5 con velocidad inicial de 5 m/s y acelera a 2 m/s² durante 4 segundos. ¿Cuál es su velocidad final?

### Options
- [ ] A) 13 m/s
- [x] B) 13 m/s <!-- feedback: vf = vi + a×t = 5 + 2×4 = 5 + 8 = 13 m/s. Se aplica la ecuación cinemática básica. -->
- [ ] C) 9 m/s <!-- feedback: Error de restar en lugar de sumar, o confundir el signo de la aceleración. -->
- [ ] D) 22 m/s <!-- feedback: Se multiplican todos los valores: 5×2×4 = 40, no es correcto. -->

### Explicación Pedagógica
La ecuación cinemática vf = vi + at permite calcular la velocidad final. Errores comunes: invertir la fórmula, confundir signos o realizar operaciones matemáticas incorrectas. La aceleración aumenta la velocidad en la dirección del movimiento.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Interpretación
**Context:** Grúa de construcción en Barranquilla

### Enunciado
La siguiente gráfica muestra la posición (x) versus tiempo (t) de un objeto en movimiento rectilíneo:

[Gráfica: línea recta inclinada hacia arriba]

Según la gráfica, el objeto se mueve con:

### Options
- [ ] A) Aceleración positiva
- [x] B) Velocidad constante positiva <!-- feedback: Una línea recta inclinada en posición vs tiempo indica velocidad constante (pendiente = velocidad). -->
- [ ] C) Aceleración negativa
- [ ] D) Reposo <!-- feedback: Error de confundir el tipo de gráfica; la pendiente indica velocidad, no aceleración. -->

### Explicación Pedagógica
En una gráfica x vs t, la pendiente representa la velocidad instantânea. Si la línea es recta, la velocidad es constante. Error típico: interpretar una gráfica de posición vs tiempo como si fuera de velocidad vs tiempo o aceleración vs tiempo.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Argumentación
**Context:** Parque de diversiones en Villa de Leyva

### Enunciado
Una esfera se lanza verticalmente hacia arriba con una velocidad inicial de 30 m/s desde la azotea de un edificio. Ignore la resistencia del aire. ¿Cuál es la altura máxima que alcanza?

### Options
- [ ] A) 30 m
- [ ] B) 45 m
- [x] C) 45 m <!-- feedback: hmax = vi²/(2g) = 30²/(2×9.8) ≈ 900/19.6 ≈ 45.9 m ≈ 45 m. En el punto más alto, vf = 0. -->
- [ ] D) 90 m <!-- feedback: Se usa g = 10 incorrectly o se olvida dividir entre 2, obteniendo 900/10 = 90 m. -->

### Explicación Pedagógica
En el lanzamiento vertical hacia arriba, la velocidad final en el punto más alto es cero. Se usa h = vi²/(2g). Error frecuente: usar g = 10 inconsistentemente o no dividir entre 2g.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v10`
**Bloom:** Analyze
**ICFES:** Explicación
**Context:** Navegación fluvial en el Magdalena

### Enunciado
Un bote cruza un río de 60 metros de ancho, con una corriente de 4 m/s perpendicular a la dirección del bote. Si el bote mantiene una velocidad de 3 m/s perpendicular a la orilla, ¿cuál es el tiempo que tarda en cruzar?

### Options
- [ ] A) 5 s
- [x] B) 20 s <!-- feedback: El tiempo depende solo del componente perpendicular a la orilla: t = ancho del río / velocidad perpendicular = 60/3 = 20 s. La corriente no afecta el tiempo de cruce. -->
- [ ] C) 15 s <!-- feedback: Error de sumar vectores o promediar velocidades incorrectamente. -->
- [ ] D) 60 s <!-- feedback: Se confunde el ancho del río con el tiempo o se usa solo la velocidad de la corriente. -->

### Explicación Pedagógica
El tiempo de cruce depende exclusivamente de la componente de velocidad perpendicular a la orilla. La corriente solo desvía la trayectoria pero no afecta el tiempo. Error común: intentar sumar velocidades vectorialmente para calcular el tiempo.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v11`
**Bloom:** Apply
**ICFES:** Uso de conceptos
**Context:** Lanzamiento de cohete artesanal en Boyacá

### Enunciado
Un cohete de modelos se lanza verticalmente hacia arriba con velocidad inicial de 49 m/s. ¿Cuánto tiempo tarda en volver al punto de lanzamiento? (g = 9.8 m/s²)

### Options
- [ ] A) 2.5 s
- [ ] B) 5 s
- [ ] C) 10 s
- [x] D) 10 s <!-- feedback: El tiempo total es 2×(vi/g) = 2×(49/9.8) = 2×5 = 10 s. El tiempo de subida es igual al tiempo de bajada desde la altura máxima. -->
- [ ] D) 20 s <!-- feedback: Se confunde el tiempo de subida con el total, multiplicando por 2 incorrectamente o usando valores incorrectos. -->

### Explicación Pedagógica
El tiempo hasta el punto más alto es vi/g. El tiempo total de vuelo es el doble porque el movimiento es simétrico en ausencia de resistencia del aire. Error frecuente: no multiplicar por 2 o confundir el tiempo de subida con el total.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Indagación
**Context:** Práctica de tiro parólico en los Llanos Orientales

### Enunciado
Se lanza un proyectil con una velocidad inicial de 40 m/s formando un ángulo de 30° con la horizontal. ¿Cuál es el alcance horizontal máximo del proyectil?

### Options
- [ ] A) 40 m
- [ ] B) 80 m
- [ ] C) 120 m
- [x] D) 141.4 m <!-- feedback: R = (v²×sin2θ)/g = (40²×sin60°)/9.8 = (1600×0.866)/9.8 ≈ 1385.6/9.8 ≈ 141.4 m. Se aplica la fórmula del alcance máximo. -->
- [ ] A) 80 m <!-- feedback: Se usa sin30° en lugar de sin60° (2×30°), error en la fórmula del alcance horizontal. -->

### Explicación Pedagógica
El alcance máximo horizontal se calcula con R = (v²·sin2θ)/g. Error frecuente: usar senθ en lugar de sen2θ, o confundir el ángulo en la fórmula. El ángulo de 30° produce sin60° = 0.866.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v13`
**Bloom:** Apply
**ICFES:** Interpretación
**Context:** Movimiento de montañas russ en el Eje Cafetero

### Enunciado
Dos móviles A y B se mueven en la misma dirección por una carretera recta. El móvil A tiene velocidad de 20 m/s y el móvil B de 15 m/s. Si inicialmente están separados por 100 metros (A detrás de B), ¿cuánto tiempo tarda A en alcanzar a B?

### Options
- [ ] A) 5 s
- [x] B) 20 s <!-- feedback: La velocidad relativa es vr = 20 - 15 = 5 m/s. El tiempo es t = distancia/vr = 100/5 = 20 s. -->
- [ ] C) 6.7 s <!-- feedback: Se suman las velocidades en lugar de restarlas, t = 100/(20+15) ≈ 2.86 s, valor irreal. -->
- [ ] D) 100 s <!-- feedback: Se divide incorrectamente: 100/20 = 5 s o se usan las unidades sin conversión. -->

### Explicación Pedagógica
En problemas de alcance, se usa la velocidad relativa: vr = vA - vB cuando A va más rápido que B. El tiempo se calcula dividiendo la distancia inicial entre la velocidad relativa. Error común: sumar velocidades en lugar de restarlas.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Argumentación
**Context:** Gráfica de velocidad vs tiempo en el metro de Medellín

### Enunciado
La siguiente gráfica muestra la velocidad (v) versus tiempo (t) de un objeto:

[Gráfica: línea con pendiente positiva desde el origen]

Según la gráfica, la aceleración del objeto es:

### Options
- [ ] A) Creciente
- [x] B) Constante y positiva <!-- feedback: La pendiente de v vs t es constante (línea recta), lo que indica aceleración constante. El signo positivo indica dirección del movimiento. -->
- [ ] C) Decreciente
- [ ] D) Nula <!-- feedback: Error de confundir pendiente con valor de la función; una línea con pendiente nonzero indica aceleración. -->

### Explicación Pedagógica
En una gráfica v vs t, la pendiente representa la aceleración. Una línea recta indica aceleración constante. Si la pendiente es positiva, la aceleración es positiva. Error común: interpretar el valor de la función como la aceleración en lugar de la pendiente.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Explicación
**Context:** Caída libre en la Sierra Nevada de Santa Marta

### Enunciado
Se deja caer una piedra desde un precipicio de 80 metros de altura. ¿Con qué velocidad impacta en el suelo? (g = 10 m/s²)

### Options
- [ ] A) 10 m/s
- [ ] B) 20 m/s
- [x] C) 40 m/s <!-- feedback: vf² = 2×g×h = 2×10×80 = 1600, entonces vf = √1600 = 40 m/s. Se usa la ecuación de caída libre. -->
- [ ] D) 800 m/s <!-- feedback: Se olvida la raíz cuadrada, reportando vf² directamente como 1600. -->

### Explicación Pedagógica
La ecuación vf² = 2gh permite calcular la velocidad final en caída libre. Error frecuente: no extraer la raíz cuadrada o confundir las fórmulas de cinemática. La velocidad no depende de la masa del objeto.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v16`
**Bloom:** Evaluate
**ICFES:** Indagación
**Context:** Trayectoria de un dron en Bogotá

### Enunciado
Un dron vuela con velocidad constante de 10 m/s en dirección norte durante 30 segundos, luego cambia su trayectoria a 60° al este del norte con la misma velocidad durante 30 segundos más. ¿Cuál es el desplazamiento total del dron?

### Options
- [ ] A) 300 m en dirección norte
- [ ] B) 600 m en dirección este
- [x] C) 519.6 m a 30° al este del norte <!-- feedback: Los dos desplazamientos son vectores de 300 m. El ángulo entre ellos es 60°. Por ley de cosenos: d = √(300² + 300² + 2×300×300×cos60°) = √(90000 + 90000 + 90000) = √270000 ≈ 519.6 m. La dirección es 30° porque el triángulo es isósceles. -->
- [ ] D) 300√2 m = 424.2 m al noreste <!-- feedback: Se aplica incorrectamente el teorema de Pitágoras como si los vectores fueran perpendiculares (90°), pero el ángulo es 60°. -->

### Explicación Pedagógica
Se deben sumar vectores usando trigonometría. Con dos vectores de igual magnitud formando 60° entre sí, se aplica la ley de cosenos. Error común: aplicar incorrectamente el teorema de Pitágoras sin considerar el ángulo real entre los vectores.

---

## Question 17 (Variant Basic - Difficulty D9)

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v17`
**Bloom:** Create
**ICFES:** Uso de conceptos
**Context:** Lanzamiento de balón en partido de fútbol en Medellín

### Enunciado
Un jugador de fútbol patea un balón con velocidad inicial de 25 m/s formando un ángulo de 37° con la horizontal. ¿A qué altura se encuentra el balón cuando su velocidad forme un ángulo de 0° con la horizontal (momento justo antes de tocar el suelo)?

### Options
- [ ] A) 0 m
- [x] B) 11.25 m <!-- feedback: h = (vi²×sen²θ)/(2g) = (25²×sen²37°)/(2×9.8) = (625×0.36)/(19.6) ≈ 11.25 m. Esta es la altura máxima, donde la velocidad es horizontal. -->
- [ ] C) 25 m <!-- feedback: Se confunde la velocidad inicial con la altura, o se usa incorrectamente la ecuación sin el factor de seno cuadrado. -->
- [ ] D) 31.25 m <!-- feedback: Se calcula el alcance horizontal en lugar de la altura máxima. -->

### Explicación Pedagógica
Cuando la velocidad es completamente horizontal (ángulo 0°), el balón está en su altura máxima. La fórmula h = (vi²×sen²θ)/(2g)da la altura máxima. Error frecuente: confundir altura máxima con alcance horizontal o con otras variables cinemáticas.

---

## Question 18 (Variant Basic - Difficulty D9)

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v18`
**Bloom:** Analyze
**ICFES:** Interpretación
**Context:** Gráfica de posición en el Estadio Metropolitano de Córdoba

### Enunciado
La siguiente gráfica muestra la posición x (m) versus tiempo t (s) de un objeto:

[Gráfica: curva parabólica opening hacia arriba]

Según la gráfica, la aceleración del objeto es:

### Options
- [ ] A) Negativa
- [ ] B) Nula
- [x] C) Positiva y constante <!-- feedback: Una parábola que abre hacia arriba en x vs t indica que la velocidad está aumentando (primer derivada creciente), lo que significa aceleración constante positiva (segunda derivada constante positiva). -->
- [ ] D) Variable y decreciente <!-- feedback: La forma parabólica indica aceleración constante, no variable. Se confunde curvatura con cambio en la aceleración. -->

### Explicación Pedagógica
En x vs t, una parábola indica movimiento uniformemente acelerado. La concavidad de la parábola indica el signo de la aceleración. Si abre hacia arriba, la aceleración es positiva. Error común: interpretar la curvatura como indicativo de aceleración variable.

---

## Question 19 (Variant Basic - Difficulty D9)

**ID:** `CO-CIE-11-P2-movimiento-fisica-067-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Argumentación
**Context:** Competencia de robótica en Bucaramanga

### Enunciado
Un robot parte del punto A con velocidad inicial de 2 m/s y acelera a 1 m/s² durante 4 segundos. Luego mantiene velocidad constante durante 3 segundos. Finalmente, frena con aceleración de -2 m/s² hasta detenerse. ¿Cuál es la distancia total recorrida por el robot?

### Options
- [ ] A) 22 m
- [ ] B) 26 m
- [ ] C) 32 m
- [x] D) 36 m <!-- feedback: Etapa 1: x₁ = vi×t + ½×a×t² = 2×4 + ½×1×16 = 8 + 8 = 16 m. Etapa 2: x₂ = v×t = (2+1×4)×3 = 6×3 = 18 m. Etapa 3: vf = 6 m/s, vr = 0, a = -2 m/s². Distancia de frenado: d = vf²/(2|a|) = 36/4 = 9 m. Total: 16 + 18 + 9 = 43 m. Corregido: Verificar Etapa 1: vf = 2 + 1×4 = 6 m/s. x₁ = (vi+vf)/2 × t =