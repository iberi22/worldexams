<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for Colombian Math (Mathematics) specifically about derivatives (derivadas), grade 11, period 4. I need to output a specific markdown format with YAML frontmatter and 20 questions in the specified structure.

Let me create 20 questions about derivatives with progressive difficulty:
- Questions 1-4: D3-D4 difficulty
- Questions 5-10: D5-D6 difficulty
- Questions 11-16: D7-D8 difficulty
- Questions 17-20: D9-D10 difficulty

The questions should be in Spanish, about derivatives, with Colombian context, plausible distractors based on common student errors, and follow the ICFES style.

Let me generate them:

1. Basic derivative rules (power rule, etc.)
2. Product/quotient rules
3. Chain rule
4. Trigonometric derivatives
5. Exponential/logarithmic derivatives
6. Implicit differentiation
7. Higher order derivatives
8. Applications (motion, optimization, related rates)
9. Etc.

Let me create each question with proper formatting:

For the YAML frontmatter:
- id: "CO-MAT-11-P4-derivadas-026-MASTERY"
- country: "colombia"
- grado: 11
- asignatura: "matematicas"
- tema: "derivadas"
- periodo: 4
- protocol_version: "5.1"
- bundle_size: 20
- bundle_index: 26
- alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
- generation: agent, model, timestamp, prompt_version
- quality_status: "UNREVISED"
- generation_status: "RAW"
- needs_human_review: true
- curation fields
- license: "CC BY-NC-SA 4.0"
- open_source: false

Now for questions:
- Each question needs a variant basic difficulty level


- Enumerate from v1 through v20 across all difficulty tiers. I'll structure them as: v1-v4 (D3-D4), v5-v10 (D5-D6), v11-v16 (D7-D8), v17-v20 (D9-D10).

Now I'll write the 20 questions covering derivative concepts, rules, and applications with Colombian contexts and plausible distractors based on typical student errors.

</think>

```markdown
---
id: "CO-MAT-11-P4-derivadas-026-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "derivadas"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 26
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T09:18:54.240944"
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

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v1`
**Bloom:** [Remember]
**ICFES:** [Reproducir una regla de derivación]
**Context:** Un estudiante de grado 11 practica derivadas básicas en su cuaderno

### Enunciado
Si f(x) = x⁵, entonces la derivada f'(x) es igual a:

### Options
- [ ] A) 5x⁶ <!-- feedback: Error al aplicar el exponente como coeficiente sumándole 1 -->
- [ ] B) 5x⁴ <!-- feedback: Error al restar 1 al exponente pero no multiplicar por el exponente original -->
- [x] C) 5x⁴ <!-- feedback: Correcto: por la regla de la potencia, d/dx[xⁿ] = nxⁿ⁻¹ -->
- [ ] D) x⁴ <!-- feedback: Error: no se aplicó el coeficiente del exponente -->

### Explicación Pedagógica
La regla de la potencia es fundamental en derivación. Para f(x) = xⁿ, f'(x) = n·xⁿ⁻¹. En este caso: f'(x) = 5·x⁵⁻¹ = 5x⁴. El distractor A es común en estudiantes que confunden la operación (elevar a 6 en lugar de mantener el exponente y multiplicar). El distractor D muestra estudiantes que olvidan el coeficiente numérico.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v2`
**Bloom:** [Remember]
**ICFES:** [Identificar la derivada de una función trigonométrica]
**Context:** En una clase de matemáticas del Colegio San José, el profesor pregunta sobre derivadas trigonométricas

### Enunciado
La derivada de f(x) = sen(x) es:

### Options
- [ ] A) cos(x) + C
- [x] B) cos(x) <!-- feedback: Correcto: la derivada de sen(x) es cos(x) -->
- [ ] C) -cos(x) <!-- feedback: Confusión con la derivada de cos(x) -->
- [ ] D) sen(x) · cos(x) <!-- feedback: Confusión con la regla del producto aplicada incorrectamente -->

### Explicación Pedagógica
La derivada de sen(x) es cos(x). Esta es una de las derivadas inmediatas que todo estudiante debe memorizar. El distractor C es común porque confunden con la derivada de cos(x) que es -sen(x). El distractor D parece derivar de una aplicación incorrecta de alguna identidad trigonométrica.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v3`
**Bloom:** [Understand]
**ICFES:** [Interpretar la regla de derivación de una suma]
**Context:** Un estudiante analiza una función polinómica para su tarea del periodo 4

### Enunciado
Si f(x) = 3x² + 7x - 5, entonces f'(x) es igual a:

### Options
- [ ] A) 3x² + 7 <!-- feedback: Error: se derivó solo el segundo término correctamente -->
- [ ] B) 6x² + 7x - 5 <!-- feedback: Error al multiplicar incorrectamente el exponente por el coeficiente -->
- [x] C) 6x + 7 <!-- feedback: Correcto: la derivada de 3x² es 6x, de 7x es 7, y -5 es 0 -->
- [ ] D) 6x + 7x <!-- feedback: Error al no derivar correctamente el término constante negativo -->

### Explicación Pedagógica
La derivada de una suma es la suma de las derivadas. Cada término se deriva separately: d/dx[3x²] = 6x, d/dx[7x] = 7, d/dx[-5] = 0. El distractor B muestra el error de no restar 1 del exponente sino multiplicarlo incorrectamente. El distractor A muestra derivación incompleta.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v4`
**Bloom:** [Apply]
**ICFES:** [Aplicar la regla del producto]
**Context:** En la preparación para las pruebas Saber 11, un estudiante practica con funciones que requieren la regla del producto

### Enunciado
Si f(x) = x² · ln(x), entonces f'(x) es igual a:

### Options
- [ ] A) 2x · 1/x <!-- feedback: Error: se derivó cada factor como si fuera independiente -->
- [ ] B) 2x · ln(x) + x² · 1/x <!-- feedback: Correcto: por la regla del producto (u'v + uv') -->
- [ ] C) 2x · ln(x) <!-- feedback: Error: se omitió el segundo término de la regla del producto -->
- [ ] D) x² · 1/x <!-- feedback: Error: solo se derivó el segundo factor -->

### Explicación Pedagógica
Por la regla del producto: si f(x) = u·v, entonces f'(x) = u'v + uv'. Aquí u = x², v = ln(x), entonces u' = 2x, v' = 1/x. Por tanto: f'(x) = 2x·ln(x) + x²·(1/x) = 2x·ln(x) + x. El distractor C es muy común: estudiantes que olvidan uno de los términos de la regla.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v5`
**Bloom:** [Understand]
**ICFES:** [Comprender la regla del cociente]
**Context:** En el desarrollo del periodo 4, un estudiante del Gimnasio Los Álamos trabaja con funciones racionales

### Enunciado
La derivada de f(x) = (2x + 3)/(x - 1) es:

### Options
- [ ] A) (2(x-1) - (2x+3))/(x-1)² <!-- feedback: Error de signo en el numerador de la regla del cociente -->
- [ ] B) (2(x-1) + (2x+3))/(x-1)² <!-- feedback: Error: se usó + en lugar de - en la regla del cociente -->
- [x] C) (2(x-1) - (2x+3))/(x-1)² <!-- feedback: Correcto: u=2x+3, v=x-1, u'=2, v'=1, entonces (u'v - uv')/v² -->
- [ ] D) (2(x-1))/(x-1)² <!-- feedback: Error: se omitió el término -uv' en el numerador -->

### Explicación Pedagógica
Por la regla del cociente: si f(x) = u/v, entonces f'(x) = (u'v - uv')/v². Con u = 2x+3, u' = 2, v = x-1, v' = 1: f'(x) = (2(x-1) - (2x+3)·1)/(x-1)² = (-5)/(x-1)². El error más común es confundir el signo en la fórmula.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v6`
**Bloom:** [Apply]
**ICFES:** [Aplicar la regla de la cadena]
**Context:** Un estudiante del Colegio Rochester analiza funciones compuestas para la prueba del periodo

### Enunciado
Si f(x) = (3x² + 5)⁴, entonces f'(x) es:

### Options
- [ ] A) 4(3x² + 5)³ <!-- feedback: Error: falta multiplicar por la derivada del interior -->
- [ ] B) 12x(3x² + 5)³ <!-- feedback: Correcto: por la regla de la cadena, f'(x) = 4(3x²+5)³ · 6x = 12x(3x²+5)³ -->
- [ ] C) 12x(3x² + 5)⁴ <!-- feedback: Error: se usó exponente 4 en lugar de 3 -->
- [ ] D) 4(3x² + 5)³ · 6x² <!-- feedback: Error: se derivó incorrectamente el interior como 6x² -->

### Explicación Pedagógica
La regla de la cadena establece que si f(x) = g(h(x)), entonces f'(x) = g'(h(x))·h'(x). Aquí g(u) = u⁴, h(x) = 3x² + 5. Entonces g'(u) = 4u³ y h'(x) = 6x. Por tanto: f'(x) = 4(3x²+5)³ · 6x = 24x(3x²+5)³. Error común: olvidar h'(x) o derivar incorrectamente h(x).

---

## Question 7 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v7`
**Bloom:** [Apply]
**ICFES:** [Derivar funciones exponenciales y logarítmicas]
**Context:** En el estudio de funciones de crecimiento poblacional en Colombia, un estudiante deriva funciones exponenciales

### Enunciado
La derivada de f(x) = e^(2x+1) es:

### Options
- [ ] A) e^(2x+1) <!-- feedback: Error: no se aplicó la regla de la cadena -->
- [ ] B) 2e^(2x+1) <!-- feedback: Correcto: por la regla de la cadena, derivada del exponente es 2 -->
- [ ] C) (2x+1)e^(2x+1) <!-- feedback: Error: confusión con la derivada de a^x -->
- [ ] D) e^(2x) <!-- feedback: Error: se evaluó incorrectamente el exponente -->

### Explicación Pedagógica
Para f(x) = e^(g(x)), f'(x) = e^(g(x))·g'(x). Aquí g(x) = 2x+1, entonces g'(x) = 2. Por tanto: f'(x) = e^(2x+1)·2 = 2e^(2x+1). Este tipo de derivadas es fundamental en modelos de crecimiento exponencial que se aplican en biología y economía colombiana.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v8`
**Bloom:** [Apply]
**ICFES:** [Aplicar la derivación implícita]
**Context:** Un estudiante del Colegio Anglo Colombiano aprende técnicas de derivación implícita para resolver problemas de geometría

### Enunciado
Si x² + y² = 25, entonces dy/dx es igual a:

### Options
- [ ] A) -x/y² <!-- feedback: Error al cuadrado el denominador -->
- [ ] B) x/y <!-- feedback: Error de signo y de procedimiento -->
- [ ] C) -y/x <!-- feedback: Error: debería ser -x/y, no -y/x -->
- [x] D) -x/y <!-- feedback: Correcto: derivando implícitamente: 2x + 2y(dy/dx) = 0 → dy/dx = -x/y -->

### Explicación Pedagógica
Derivando implícitamente: d/dx[x²] + d/dx[y²] = d/dx[25]. Obtenemos 2x + 2y(dy/dx) = 0. Despejando: dy/dx = -2x/(2y) = -x/y. El distractor más común es invertir la fracción o cambiar el signo incorrectamente.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v9`
**Bloom:** [Apply]
**ICFES:** [Calcular derivadas de orden superior]
**Context:** En el estudio del movimiento en física, un estudiante analiza la aceleración como segunda derivada

### Enunciado
Si s(t) = 4t³ - 2t² + 7t - 1 representa la posición de un objeto, la aceleración es:

### Options
- [ ] A) 12t² - 4t + 7 <!-- feedback: Este es el valor de la primera derivada (velocidad) -->
- [ ] B) 24t - 4 <!-- feedback: Correcto: la aceleración es la segunda derivada de la posición -->
- [ ] C) 24t² - 4t <!-- feedback: Error: se multiplicó incorrectamente por t al derivar por segunda vez -->
- [ ] D) 12t - 4 <!-- feedback: Error: se usó el exponente original en lugar del nuevo -->

### Explicación Pedagógica
La aceleración es a(t) = d²s/dt². Primero: v(t) = s'(t) = 12t² - 4t + 7. Segundo: a(t) = v'(t) = 24t - 4. Este concepto es esencial en física para comprender el movimiento de objetos en el contexto de problemas colombianos como el análisis de tráfico.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v10`
**Bloom:** [Apply]
**ICFES:** [Derivar funciones logarítmicas compuestas]
**Context:** Un estudiante deriva funciones logarítmicas para analizar escalas de intensidad sísmica

### Enunciado
La derivada de f(x) = ln(5x³) es:

### Options
- [ ] A) 1/(5x³) <!-- feedback: Error: se aplicó incorrectamente la derivada de ln(u) -->
- [ ] B) 1/(x³) <!-- feedback: Error: no se multiplicó por la derivada del interior -->
- [ ] C) 3/x + 1/5 <!-- feedback: Error: se separó incorrectamente el logaritmo -->
- [x] D) 3/x <!-- feedback: Correcto: f'(x) = (1/(5x³)) · 15x² = 3/x -->

### Explicación Pedagógica
Por la regla de la cadena: f'(x) = (1/(5x³)) · 15x² = 15x²/(5x³) = 3/x. Alternativamente, usando la propiedad del logaritmo: ln(5x³) = ln(5) + 3ln(x), entonces f'(x) = 3/x. El distractor C muestra el error común de derivar ln(5) como 1/5.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v11`
**Bloom:** [Analyze]
**ICFES:** [Analizar la continuidad y derivabilidad]
**Context:** En el estudio de funciones en matemáticas avanzadas, un estudiante del Gimnasio Moderno analiza funciones definidas por tramos

### Enunciado
La función f(x) = { x² si x < 2, 4x - 4 si x ≥ 2 } es derivable en x = 2 cuando:

### Options
- [ ] A) Solo si es continua en x = 2
- [ ] B) Cuando el límite de la derivada por la izquierda y por la derecha son iguales
- [x] C) Cuando es continua Y las derivadas laterales son iguales <!-- feedback: Correcto: para que exista la derivada, la función debe ser continua Y las derivadas laterales deben coincidir -->
- [ ] D) Siempre que las derivadas existan en todo el dominio

### Explicación Pedagógica
Para que una función sea derivable en un punto, debe ser continua en ese punto Y tener derivadas laterales iguales. El distractor A es incompleto (la continuidad no es suficiente). El distractor B omite la continuidad. El distractor D es incorrecto porque la existencia de derivadas en todo el dominio no garantiza derivabilidad en un punto específico.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v12`
**Bloom:** [Analyze]
**ICFES:** [Analizar errores en la aplicación de reglas de derivación]
**Context:** Un estudiante del Colegio Santa María encuentra dificultades al derivar funciones complejas

### Enunciado
Al derivar f(x) = sen(3x²) · cos(2x), un estudiante obtiene f'(x) = 6x cos(3x²) · (-2sen(2x)). El error principal está en:

### Options
- [ ] A) La derivada de sen(3x²) es incorrecta
- [x] B) La derivada de cos(2x) es incorrecta, debe ser -2sen(2x) pero falta aplicarla al otro factor <!-- feedback: Correcto: la derivada de cos(2x) es -2sen(2x), pero en la regla del producto falta el término u·v' completo -->
- [ ] C) La derivada de sen(3x²) debe ser cos(3x²)
- [ ] D) No hay error, el resultado es correcto

### Explicación Pedagógica
El estudiante aplicó parcialmente la regla del producto. f'(x) = u'v + uv'. Con u = sen(3x²), v = cos(2x): u' = 6x cos(3x²), v' = -2sen(2x). El resultado correcto es: f'(x) = 6x cos(3x²)·cos(2x) + sen(3x²)·(-2sen(2x)). El estudiante solo calculó u'v, olvidando uv'.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v13`
**Bloom:** [Apply]
**ICFES:** [Resolver problemas de optimización]
**Context:** Una empresa colombiana de/empaques necesita minimizar el material utilizado en la fabricación de cajas sin tapa

### Enunciado
Se quiere construir una caja sin tapa con base cuadrada y volumen de 500 cm³. Si x es el lado de la base y h la altura, el valor de x que minimiza el material necesario es:

### Options
- [ ] A) 5 cm
- [x] B) 10 cm <!-- feedback: Correcto: x²h = 500 → h = 500/x². Área = x² + 4xh = x² + 2000/x. dA/dx = 2x - 2000/x² = 0 → 2x³ = 2000 → x = 10 cm -->
- [ ] C) 15 cm
- [ ] D) 20 cm

### Explicación Pedagógica
Volumen: x²h = 500 → h = 500/x². Superficie (sin tapa): A = x² + 4xh = x² + 2000/x. Derivando e igualando a cero: dA/dx = 2x - 2000/x² = 0. Resolviendo: 2x³ = 2000, x³ = 1000, x = 10. Este tipo de problema es típico en aplicaciones industriales colombianas.

---

## Question 14 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v14`
**Bloom:** [Analyze]
**ICFES:** [Analizar razones de cambio relacionadas]
**Context:** En una planta de tratamiento de agua de Bogotá, un tanque cónico se llena con agua a una tasa determinada

### Enunciado
Un tanque cónico tiene radio R = 3 m y altura H = 5 m. Si el agua se llena a razón de 2 m³/min, ¿a qué rapidez sube el nivel del agua cuando la profundidad es 2 m?

### Options
- [ ] A) 2/(π) m/min
- [ ] B) 5/(4π) m/min
- [x] C) 25/(12π) m/min <!-- feedback: Correcto: V = (1/3)πr²h. Con r/h = 3/5 → r = 3h/5. V = (3π/25)h³. dV/dt = (9π/25)h²(dh/dt). Con h=2, dV/dt=2: 2 = (9π/25)(4)(dh/dt) → dh/dt = 25/(12π) -->
- [ ] D) 12/(5π) m/min

### Explicación Pedagógica
Este es un problema clásico de tasas relacionadas. La relación entre radio y altura es r/h = 3/5. Sustituyendo r = 3h/5 en V = (1/3)πr²h, obtenemos V = (3π/25)h³. Derivando: dV/dt = (9π/25)h²(dh/dt). Evaluando en h=2: dh/dt = 25/(12π).

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v15`
**Bloom:** [Apply]
**ICFES:** [Aplicar la aproximación lineal (diferencial)]
**Context:** Un ingeniero civil colombiano estima el error en el cálculo del volumen de agua en una represa

### Enunciado
Se quiere estimar el cambio en el volumen de una esfera si el radio aumenta de 5 cm a 5.1 cm. La aproximación por diferenciales indica que el cambio es aproximadamente:

### Options
- [ ] A) 3π cm³
- [ ] B) 10π cm³
- [ ] C) 30π cm³
- [x] D) 31.4π cm³ <!-- feedback: Correcto: dV = 4πr²dr. Con r=5, dr=0.1: dV = 4π(25)(0.1) = 10π ≈ 31.4 cm³ -->

### Explicación Pedagógica
La aproximación lineal usa diferenciales: dV = 4πr²dr. Con r = 5 cm y dr = 0.1 cm: dV = 4π(5)²(0.1) = 4π(25)(0.1) = 10π ≈ 31.4 cm³. Este método es esencial en ingeniería para hacer estimaciones rápidas sin cálculos extensos.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v16`
**Bloom:** [Evaluate]
**ICFES:** [Evaluar la validez de procedimientos de derivación]
**Context:** Un estudiante de la Universidad Nacional de Colombia verifica el trabajo de un compañero sobre derivación implícita

### Enunciado
Al derivar la ecuación e^(xy) + x = y², un compañero obtiene dy/dx = (e^(xy) + 1)/(2y). Al verificar, el estudiante concluye que:

### Options
- [ ] A) El procedimiento es completamente correcto
- [ ] B) Falta multiplicar por la derivada de xy en el numerador de e^(xy)
- [x] C) Debe multiplicarse por (x·dy/dx + y) en el numerador, no solo por e^(xy) <!-- feedback: Correcto: al derivar e^(xy) se obtiene e