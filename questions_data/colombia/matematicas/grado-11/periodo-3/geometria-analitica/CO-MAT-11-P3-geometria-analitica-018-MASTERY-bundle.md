<think>
The user wants me to generate exactly 20 multiple-choice questions in the ICFES Saber 11 style for Mathematics, specifically for analytic geometry, grade 11, period 3. Let me create these questions following the strict format requested.

Let me create questions covering analytic geometry topics:
- Lines and their equations
- Circles
- Parabolas
- Ellipses
- Hyperbolas
- Distance between points
- Midpoint
- Slope
- Distance from a point to a line
- Tangent lines
- Intersection of conics

I need to follow the difficulty progression:
- Questions 1-4: D3-D4 (basic)
- Questions 5-10: D5-D6 (intermediate)
- Questions 11-16: D7-D8 (advanced)
- Questions 17-20: D9-D10 (mastery)

Let me create these questions with Colombian context.

</think>

```yaml
---
id: "CO-MAT-11-P3-geometria-analitica-018-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "geometria-analitica"
periodo: 3
protocol_version: "5.1"
bundle_size: 20
bundle_index: 18
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-16T00:07:51.171306"
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

**ID:** `CO-MAT-11-P3-geometria-analitica-018-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Reconocer elementos de una ecuación lineal
**Context:** Sistema de transporte masivo de Bogotá

### Enunciado
En el sistema de transporte masivo TransMilenio, un bus articulado sigue una trayectoria que puede modélizarse mediante la ecuación lineal y = 2x - 3, donde x representa la distancia en kilómetros desde la estación de inicio y y la posición relativa en el corredor vial. ¿Cuál es la pendiente de esta recta?

### Options
- [ ] A) -3
- [ ] B) 2
- [x] C) 2 <!-- feedback: La pendiente es el coeficiente de x en la forma y = mx + b -->
- [ ] D) -2 <!-- feedback: Este sería el valor si la ecuación fuera y = -2x - 3 -->

### Explicación Pedagógica
En la ecuación de la recta en su forma pendiente-intersección y = mx + b, el coeficiente m corresponde a la pendiente. En y = 2x - 3, el valor de m es 2. Un error común es confundir la pendiente con el término independiente b o con el coeficiente completo sin aislar.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P3-geometria-analitica-018-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Identificar las coordenadas del punto medio
**Context:** Distribución de tiendas en un centro comercial de Medellín

### Enunciado
En un centro comercial de Medellín, dos tiendas de artesanías están ubicadas en los puntos A(2, 4) y C(8, 10). El administrador desea ubicar una máquina de pagos central exactamente en el punto medio entre ambas tiendas. ¿Cuáles son las coordenadas del punto medio?

### Options
- [ ] A) (5, 6)
- [x] B) (5, 7) <!-- feedback: M = ((x₁+x₂)/2, (y₁+y₂)/2) = ((2+8)/2, (4+10)/2) = (5, 7) -->
- [ ] C) (6, 5) <!-- feedback: Error común: invertir los valores de x y y en el cálculo -->
- [ ] D) (3, 3) <!-- feedback: Incorrecto: se restaron en lugar de sumar -->

### Explicación Pedagógica
El punto medio M entre dos puntos A(x₁,y₁) y C(x₂,y₂) se calcula como M = ((x₁+x₂)/2, (y₁+y₂)/2). Aplicando: ((2+8)/2, (4+10)/2) = (10/2, 14/2) = (5, 7). Un error frecuente es invertir el orden o restar en lugar de sumar.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P3-geometria-analitica-018-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Comprender la distancia entre dos puntos
**Context:** Rutas de ciclismo en los Andes colombianos

### Enunciado
Un grupo de ciclistas profesionales entrena en una ruta entre los puntos P(1, 2) y Q(4, 6) en las montañas de los Andes. ¿Cuál es la distancia aproximada, en unidades, entre estos dos puntos?

### Options
- [ ] A) 3 unidades
- [ ] B) 4 unidades
- [x] C) 5 unidades <!-- feedback: d = √[(4-1)² + (6-2)²] = √[9 + 16] = √25 = 5 -->
- [ ] D) 7 unidades <!-- feedback: Error: se suman las diferencias sin elevar al cuadrado ni sacar raíz -->

### Explicación Pedagógica
La distancia entre dos puntos P(x₁,y₁) y Q(x₂,y₂) se calcula con d = √[(x₂-x₁)² + (y₂-y₁)²]. Para P(1,2) y Q(4,6): d = √[(4-1)² + (6-2)²] = √[3² + 4²] = √[9 + 16] = √25 = 5. Un error común es no aplicar la raíz cuadrada al final.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P3-geometria-analitica-018-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Aplicar la ecuación de la recta dados dos puntos
**Context:** Construcción de vivienda VIS en Soacha

### Enunciado
Una empresa de construcción de vivienda de interés social en Soacha ha determinado que el costo total de construcción y depende del área x según la tabla: cuando x = 2, y = 12; cuando x = 5, y = 21. Asumiendo un modelo lineal, ¿cuál es la ecuación de la recta que modela esta situación?

### Options
- [ ] A) y = 3x + 6
- [x] B) y = 3x + 6 <!-- feedback: m = (21-12)/(5-2) = 9/3 = 3; b = 12 - 3(2) = 6 → y = 3x + 6 -->
- [ ] C) y = 3x + 12 <!-- feedback: Error al calcular b: se usa solo y₁ sin restar m·x₁ -->
- [ ] D) y = 6x + 3 <!-- feedback: Se confunden los valores de pendiente e intercepto -->

### Explicación Pedagógica
Primero se calcula la pendiente m = (y₂-y₁)/(x₂-x₁) = (21-12)/(5-2) = 9/3 = 3. Luego se usa un punto para encontrar b: 12 = 3(2) + b → b = 6. La ecuación es y = 3x + 6. Errores típicos incluyen invertir los valores al calcular la pendiente o confundir el orden de las variables.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-geometria-analitica-018-MASTERY-v5`
**Bloom:** Understand
**ICFES:** Interpretar ecuación de la recta en forma general
**Context:** Economía cafetera en el Eje Cafetero

### Enunciado
En una región del Eje Cafetero, la producción de café (en toneladas) y el número de beneficiarios x están relacionados por la ecuación general 2x - 4y + 8 = 0. Si se grafíca esta relación en el plano cartesiano, ¿cuál es el valor de la pendiente de la recta?

### Options
- [ ] A) 2
- [x] B) 1/2 <!-- feedback: Despejando y: -4y = -2x + 8 → y = (1/2)x - 2, entonces m = 1/2 -->
- [ ] C) -2
- [ ] D) -1/2 <!-- feedback: Error: se omite el signo negativo al despejar correctamente -->

### Explicación Pedagógica
Para encontrar la pendiente, se debe llevar la ecuación a la forma y = mx + b. De 2x - 4y + 8 = 0: -4y = -2x + 8 → y = (-2x + 8)/-4 → y = (1/2)x - 2. La pendiente es 1/2. Un error común es no dividir todos los términos o confundir el signo.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-geometria-analitica-018-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Calcular la distancia de un punto a una recta
**Context:** Ubicación de antenas de telecomunicación en Colombia

### Enunciado
Una empresa de telecomunicaciones debe ubicar una antena en el punto P(3, 4) y necesita que esté a una distancia exacta de 2 unidades de la línea de transmisión representada por la recta 3x + 4y - 10 = 0. ¿Cuál es la distancia perpendicular del punto a la recta?

### Options
- [ ] A) 1 unidad
- [ ] B) 2 unidades
- [x] C) 3 unidades <!-- feedback: d = |Ax₀ + By₀ + C|/√(A²+B²) = |9+16-10|/5 = |15|/5 = 3 -->
- [ ] D) 5 unidades <!-- feedback: Error: se calcula mal el numerador, se usa 9+4+10 en lugar de 9+16-10 -->

### Explicación Pedagógica
La distancia de un punto P(x₀,y₀) a una recta Ax + By + C = 0 es d = |Ax₀ + By₀ + C|/√(A²+B²). Para P(3,4) y la recta 3x + 4y - 10 = 0: d = |3(3) + 4(4) - 10|/√(9+16) = |9+16-10|/5 = |15|/5 = 3. El error frecuente es no poner el valor absoluto o calcular mal el numerador.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-geometria-analitica-018-MASTERY-v7`
**Bloom:** Understand
**ICFES:** Identificar elementos de una circunferencia
**Context:** Diseño del Estadio Metropolitano de Barranquilla

### Enunciado
El arquitecto que diseñó una plaza circular frente al Estadio Metropolitano de Barranquilla ha determinado que la ecuación de la circunferencia que delimita la zona verde es (x - 2)² + (y + 5)² = 36. ¿Cuáles son las coordenadas del centro y cuál es el radio de esta circunferencia?

### Options
- [ ] A) Centro (2, -5), radio 36
- [ ] B) Centro (-2, 5), radio 6
- [x] C) Centro (2, -5), radio 6 <!-- feedback: De (x-h)² + (y-k)² = r²: h=2, k=-5, r²=36 → r=6 -->
- [ ] D) Centro (-2, 5), radio 36 <!-- feedback: Error: se copian los signos incorrectos y se confunde r con r² -->

### Explicación Pedagógica
La forma canónica de la circunferencia es (x-h)² + (y-k)² = r², donde (h,k) es el centro y r es el radio. Comparando: h = 2, k = -5, r² = 36 → r = 6. Errores típicos incluyen no extraer la raíz cuadrada del radio al cuadrado y confundir los signos del centro.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-geometria-analitica-018-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Determinar si dos rectas son paralelas o perpendiculares
**Context:** Diseño urbano en Bogotá

### Enunciado
En el diseño del sistema de canales de drenaje pluvial en una urbanización de Bogotá, dos canales siguen las ecuaciones L₁: 2x + 3y - 5 = 0 y L₂: 4x + 6y + 1 = 0. Respecto a estas dos rectas, ¿cuál de las siguientes afirmaciones es correcta?

### Options
- [ ] A) Las rectas son perpendiculares
- [x] B) Las rectas son paralelas <!-- feedback: m₁ = -2/3, m₂ = -4/6 = -2/3; como m₁ = m₂, son paralelas -->
- [ ] C) Las rectas son concurrentes
- [ ] D) Las rectas coinciden <!-- feedback: Aunque tienen la misma pendiente, los términos independientes son diferentes -->

### Explicación Pedagógica
Para determinar si son paralelas, se calculan las pendientes: L₁: 2x + 3y - 5 = 0 → m₁ = -2/3; L₂: 4x + 6y + 1 = 0 → m₂ = -4/6 = -2/3. Como m₁ = m₂, las rectas son paralelas. Un error frecuente es no simplificar correctamente la segunda ecuación antes de calcular la pendiente.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-geometria-analitica-018-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Transformar ecuaciones de la recta a diferentes formas
**Context:** Control de calidad en la industria textil de Boyacá

### Enunciado
Una empresa textil en Tunja exporta telas y utiliza una ecuación para modelar la relación entre la calidad x y el precio y: y - 3 = -2(x + 1). El área de mercadeo quiere expresar esta ecuación en la forma general Ax + By + C = 0. ¿Cuál es la ecuación en dicha forma?

### Options
- [ ] A) 2x + y - 1 = 0
- [ ] B) 2x + y + 1 = 0
- [x] C) 2x + y + 1 = 0 <!-- feedback: y - 3 = -2x - 2 → 2x + y + 1 = 0 -->
- [ ] D) -2x + y - 5 = 0 <!-- feedback: Error al aplicar la propiedad distributiva: se deja x con signo incorrecto -->

### Explicación Pedagógica
De y - 3 = -2(x + 1), aplicando distribución: y - 3 = -2x - 2. Reorganizando: 2x + y + 1 = 0. El error más común es no multiplicar correctamente el -2 por cada término dentro del paréntesis, especialmente perder el signo negativo.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-geometria-analitica-018-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Analizar posición relativa de rectas
**Context:** Distribución de cámaras de seguridad en Cali

### Enunciado
En un centro comercial de Cali, dos pasillos forman las rectas L₁: x - 2y + 4 = 0 y L₂: 3x + y - 2 = 0. Estas dos rectas se intersecan en un punto. ¿Cuál es el punto de intersección?

### Options
- [ ] A) (0, 2)
- [ ] B) (2, 0)
- [x] C) (0, 2) <!-- feedback: De L₁: x = 2y - 4; sustituyendo en L₂: 3(2y-4) + y - 2 = 0 → 7y = 14 → y = 2, x = 0 -->
- [ ] D) (-2, 1) <!-- feedback: Error en la sustitución o en la solución del sistema de ecuaciones -->

### Explicación Pedagógica
Se resuelve el sistema: de L₁: x = 2y - 4. Sustituyendo en L₂: 3(2y - 4) + y - 2 = 0 → 6y - 12 + y - 2 = 0 → 7y = 14 → y = 2. Luego x = 2(2) - 4 = 0. El punto de intersección es (0, 2). Errores típicos incluyen errores algebraicos al despejar o al sustituir.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-geometria-analitica-018-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Analizar la ecuación de una parábola
**Context:** Diseño de antena parabólica para zonas rurales de Colombia

### Enunciado
Una empresa de telecomunicaciones instala antenas parabólicas en zonas rurales de la Guajira. El reflector de una antena tiene su vértice en el punto V(0, 0) y su foco está ubicado en F(0, 3). ¿Cuál es la ecuación de la directriz de esta parábola?

### Options
- [ ] A) y = 3
- [ ] B) x = 3
- [x] C) y = -3 <!-- feedback: Parábola vertical abre hacia arriba (p > 0), directriz: y = -p, como p = 3, directriz es y = -3 -->
- [ ] D) y = -6 <!-- feedback: Error: se duplica el valor de p al determinar la directriz -->

### Explicación Pedagógica
Para una parábola con vértice en el origen que abre hacia arriba, la ecuación es x² = 4py, donde p es la distancia del vértice al foco. Como F(0, 3), p = 3. La directriz está a la misma distancia del vértice pero en dirección opuesta: y = -p = -3. Un error frecuente es no entender que la directriz está en dirección opuesta al foco.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-geometria-analitica-018-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Determinar la ecuación de una elipse dados sus elementos
**Context:** Diseño del túnel del Toyo en Antioquia

### Enunciado
Un túnel en forma elíptica se construye en Antioquia, con centro en C(2, 1), semieje mayor a = 5 paralelo al eje x, y semieje menor b = 3. ¿Cuál es la ecuación canónica de esta elipse?

### Options
- [ ] A) (x-2)²/25 + (y-1)²/9 = 1
- [x] A) (x-2)²/25 + (y-1)²/9 = 1 <!-- feedback: De la forma (x-h)²/a² + (y-k)²/b² = 1: (x-2)²/25 + (y-1)²/9 = 1 -->
- [ ] B) (x-2)²/9 + (y-1)²/25 = 1 <!-- feedback: Error: se intercambian los valores de a y b sin considerar la orientación -->
- [ ] C) (x+2)²/25 + (y+1)²/9 = 1 <!-- feedback: Error: se cambian los signos del centro -->
- [ ] D) (x-2)²/5 + (y-1)²/3 = 1 <!-- feedback: Error: se usa a y b directamente sin elevarlos al cuadrado -->

### Explicación Pedagógica
Para una elipse con centro en (h,k) y semieje mayor paralelo al eje x, la ecuación canónica es (x-h)²/a² + (y-k)²/b² = 1. Con centro C(2,1), a = 5 y b = 3: (x-2)²/25 + (y-1)²/9 = 1. Errores comunes incluyen no elevar al cuadrado, invertir semiejes o cometer errores de signo en el centro.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-geometria-analitica-018-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Evaluar la excentricidad de una cónica
**Context:** Órbita de un satélite de comunicaciones sobre Colombia

### Enunciado
Colombia lanzó un satélite de comunicaciones cuya órbita tiene forma elíptica. Si la distancia focal es 10 y la longitud del eje mayor es 26, ¿cuál es la excentricidad de esta órbita?

### Options
- [ ] A) 5/13
- [ ] B) 13/5
- [x] C) 5/13 <!-- feedback: c = 10/2 = 5, 2a = 26 → a = 13; e = c/a = 5/13 -->
- [ ] D) 10/13 <!-- feedback: Error: se usa el valor de 2c en lugar de c, o no se divide 2a entre 2 -->

### Explicación Pedagógica
Para una elipse: 2c es la distancia focal, entonces c = 10/2 = 5. La longitud del eje mayor es 2a = 26, entonces a = 13. La excentricidad e = c/a = 5/13 ≈ 0.38. Errores típicos incluyen usar la distancia focal completa como c o no dividir la longitud del eje mayor entre 2.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-geometria-analitica-018-MASTERY-v14`
**Bloom:** Apply
**ICFES:** Calcular la ecuación de la recta tangente a una circunferencia
**Context:** Fabricación de ruedas para la industria automotriz en Medellín

### Enunciado
Una empresa metalmecánica en Medellín fabrica ruedas donde el borde exterior sigue la circunferencia x² + y² = 25. Un cliente solicita cortar la rueda en un punto P(3, 4) para insertar un eje. ¿Cuál es la ecuación de la recta tangente a la circunferencia en el punto P?

### Options
- [ ] A) 3x + 4y = 25
- [x] C) 3x + 4y = 25 <!-- feedback: Recta que pasa por (3,4) con pendiente m = -3/4: y - 4 = (-3/4)(x - 3) → 3x + 4y = 25 -->
- [ ] B) 4x + 3y = 25
- [ ] D) 3x - 4y = 25

### Explicación Pedagógica
El radio en P es perpendicular a la tangente. El radio tiene pendiente m_rad = 4/3, entonces la tangente tiene pendiente m_tan = -3/4. Usando punto-pendiente: y - 4 = (-3/4)(x - 3) → multiplicando por 4: 4y - 16 = -3x + 9 → 3x + 4y = 25. El error más común es no recordar que la tangente es perpendicular al radio o invertir el signo.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P3-geometria-analitica-018-MASTERY-v15`
**Bloom:** Analyze
**ICFES:** Identificar elementos de una hipérbola
**Context:** Sistema de navegación GPS en las montañas de Santander

### Enunciado
En el sistema de navegación GPS instalado en vehículos de carga en Santander, la señal se modela mediante una hipérbola con ecuación x²/16 - y²/9 = 1. ¿Cuáles son las coordenadas de los vértices y la distancia focal de esta hipérbola?

### Options
- [ ] A) Vértices: (4, 0) y (-4, 0); distancia focal = 10
- [ ] B) Vértices: (0, 3) y (0, -3); distancia focal = 8
- [x] C) Vértices: (4, 0) y (-4, 0); distancia focal = 10 <!-- feedback: a² = 16 → a = 4; c² = a² + b² = 16 + 9 = 25 → c = 5; 2c = 10 -->
- [ ] D) Vértices: (4, 0) y (-4, 0); distancia focal = 8 <!-- feedback: Error: se calcula c = √(a²+b²) pero se usa mal la fórmula de distancia focal -->

### Explicación Pedagógica
Para la hipérbola x²/a² - y²/b² = 1: a² = 16 → a = 4, entonces los vértices están en (±4, 0). La distancia focal es 2c, donde c² = a² + b² = 16 + 9 = 25 → c = 5. La distancia focal es 2c = 10. Errores comunes incluyen no sumar a² y b² para encontrar c, o no duplicar c.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P3-geometria-analitica-018-MASTERY-v16`
**Bloom:** Understand
**ICFES:** Determinar la ecuación de una recta perpendicular a otra
**Context:** Instalación de tuberías de agua en Cartagena

### Enunciado
Un ingeniero civil en Cartagena debe diseñar una tubería de alcantarillado que pase por el punto P(2, 3) y sea perpendicular a la tubería principal dada por la ecuación 2x + y - 