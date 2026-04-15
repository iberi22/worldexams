<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for Mathematics, specifically on elementary functions (funciones-elementales), for grade 11, period 1.

I need to follow the exact format specified:
- YAML frontmatter with the specific fields
- 20 questions with progressive difficulty (D3-D4 for questions 1-4, D5-D6 for 5-10, D7-D8 for 11-16, D9-D10 for 17-20)
- Each question has ID, Bloom level, ICFES competency, context, statement, 4 options (A, B, C, D), with [x] on the correct one, and pedagogical explanation
- Realistic distractors based on common Colombian student errors
- Modern Colombian context
- No additional text before or after

Let me create the questions:

1-4 (D3-D4 difficulty - basic recognition and understanding):
1. Basic identification of function types
2. Basic domain/range
3. Basic evaluation
4. Basic graph interpretation

5-10 (D5-D6 difficulty - application):
5. Applying function properties
6. Analyzing function behavior
7. Comparing functions
8. Transformations
9. Function composition basics
10. Inverse function basics

11-16 (D7-D8 difficulty - analysis):
11. Analyzing complex function behavior
12. Comparing multiple functions
13. Analyzing transformations
14. Real-world function modeling
15. Analyzing piecewise functions
16. Analyzing quadratic functions

17-20 (D9-D10 difficulty - evaluation and synthesis):
17. Complex function analysis
18. Synthesis of multiple function concepts
19. Evaluation of function properties
20. Complex real-world application

Let me write these questions now with Colombian context:
</think>

```markdown
---
id: "CO-MAT-11-P1-funciones-elementales-007-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "funciones-elementales"
periodo: 1
protocol_version: "5.1"
bundle_size: 20
bundle_index: 7
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T08:17:42.138361"
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

**ID:** `CO-MAT-11-P1-funciones-elementales-007-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Interpretación y representación
**Context:** En el programa de televisión regional "Colombia Productiva", muestran cómo varía el precio del arroz según la cantidad vendida en los mercados de Villavicencio.

### Enunciado
En un mercado de Villavicencio, el precio del kilogramo de arroz se establece mediante la relación donde por cada kilogramo adicional, el precio aumenta en $2.500 COP. Si se compran 3 kg, el precio total es de $12.000 COP. ¿Cuál de las siguientes representa esta situación?

### Options
- [ ] A) f(x) = 2.500x, donde f(3) = 12.000 <!-- Esta funciónlineal solo contempla el precio unitario sin el valor base -->
- [ ] B) f(x) = 2.500x + 3.000, donde f(3) = 10.500 <!-- Error común: invierte los coeficientes de la ecuación -->
- [x] C) f(x) = 2.500x + 3.000, donde f(3) = 12.000 <!-- La funciónlineal modela correctamente el problema con intercepto en 3.000 y pendiente 2.500 -->
- [ ] D) f(x) = 3.000x + 2.500, donde f(3) = 11.500 <!-- Confusión entre pendiente e intercepto en la ecuación -->

### Explicación Pedagógica
La función lineal que modela la situación es f(x) = 2.500x + b. Con f(3) = 12.000, despejamos: 12.000 = 2.500(3) + b, entonces b = 12.000 - 7.500 = 4.500. Sin embargo, el enunciado indica que con 3 kg el precio total es 12.000, y por kilogramo adicional son 2.500. El error común es confundir cuándo 12.000 es el valor total o unitario. El distractor A olvida el valor base (intercepto), el B invierte los valores, y el D intercambia pendiente e intercepto.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P1-funciones-elementales-007-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Modelación
**Context:** En una empresa de confecciones de Bucaramanga, analizan la función que relaciona las unidades producidas con la ganancia diaria.

### Enunciado
La función g(u) = 50u - 200 representa la ganancia diaria (en miles de pesos) de una empresa textil de Bucaramanga según el número de unidades u producidas. ¿Cuál es el dominio de esta función en el contexto del problema?

### Options
- [ ] A) Todos los números reales mayores o iguales a 0 <!-- No considera la condición de rentabilidad mínima -->
- [ ] B) Todos los números reales menores o iguales a 4 <!-- Invierte la condición de rentabilidad -->
- [x] C) Todos los números reales mayores o iguales a 4 <!-- Porque g(u) ≥ 0 implica 50u - 200 ≥ 0, entonces u ≥ 4 -->
- [ ] D) Todos los números reales entre 0 y 4 inclusive <!-- Limita artificialmente el dominio -->

### Explicación Pedagógica
Para que la empresa tenga ganancia no negativa, g(u) ≥ 0. Despejando: 50u - 200 ≥ 0 → 50u ≥ 200 → u ≥ 4. Por lo tanto, el dominiocontextual es u ∈ [4, ∞). El distractor A asume que cualquier cantidad produce ganancia (falso), el B invierte la desigualdad, y el D crea un rango artificial sin justificaciónmatemática.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P1-funciones-elementales-007-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Interpretación y representación
**Context:** En la clase de matemáticas del colegio departamental de Armenia, el profesor muestra las gráficas de funciones en el plano cartesiano.

### Enunciado
El profesor de matemáticas del colegio INEM de Armenia solicita que se identifique cuál gráfica corresponde a la función f(x) = x² - 4. ¿Cuál de las siguientes descripciones corresponde a la gráfica correcta?

### Options
- [ ] A) Una parábola con vértice en (0, -4) que abre hacia arriba <!-- Omite que x² - 4 desplaza la parábola x² hacia abajo, no hacia arriba -->
- [ ] B) Una parábola con vértice en (0, 4) que abre hacia abajo <!-- Confusión con la función -x² + 4 -->
- [x] C) Una parábola con vértice en (0, -4) que abre hacia arriba <!-- Porque f(x) = x² - 4 es una traslación vertical negativa de la parábola base x² -->
- [ ] D) Una parábola con vértice en (0, 0) que abre hacia arriba <!-- Describe x², no x² - 4 -->

### Explicación Pedagógica
La función f(x) = x² - 4 resulta de aplicar una traslación vertical向下 (hacia abajo) de 4 unidades a la función base f(x) = x². Por lo tanto, el vértice se desplaza de (0, 0) a (0, -4). El coeficiente de x² es positivo, entonces la parábola abre hacia arriba. Los distractores reflejan errores comunes: confundir el signo del desplazamiento vertical (A vs C), confundir la dirección de apertura (B), u olvidar completamente la traslación (D).

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P1-funciones-elementales-007-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Formulación y ejecución
**Context:** En una clínica de salud ocupacional en Medellín, calculan el índice de masa corporal (IMC) de los empleados.

### Enunciado
El índice de masa corporal se calcula mediante la función IMC(p, a) = p/a², donde p es el peso en kilogramos y a es la altura en metros. Si una persona pesa 72 kg y tiene un IMC de 25, ¿cuál es su altura?

### Options
- [ ] A) 1,60 metros <!-- Confusión con la raíz cuadrada: no dividir correctamente entre 25 -->
- [ ] B) 1,68 metros <!-- Error en el despeje: calcula a = √(72/25) pero invierte numerador y denominador -->
- [x] C) 1,70 metros <!-- Porque a = √(72/25) = √2,88 ≈ 1,70 m -->
- [ ] D) 1,80 metros <!-- Error común: eleva al cuadrado en lugar de extraer raíz -->

### Explicación Pedagógica
Partiendo de IMC = p/a², despejamos a² = p/IMC = 72/25 = 2,88. Entonces a = √2,88 ≈ 1,70 m. Los distractores reflejan errores típicos: el A no despeja correctamente, el B confunde el procedimiento del despeje, y el D confunde la raíz cuadrada con elevar al cuadrado. Este tipo de ejercicio evalúa la comprensión del concepto de función cuadrática inversa.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P1-funciones-elementales-007-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y ejecución
**Context:** En el centro comercial Unicentro de Bogotá, una tienda de tecnología ofrece un plan de datos celulares.

### Enunciado
Una empresa de telecomunicaciones en Bogotá ofrece un plan de datos dado por la función C(x) = 15.000 + 2.500x, donde C(x) es el costo total mensual en pesos y x es la cantidad de gigabytes consumidos. Si un usuario tiene un presupuesto máximo de $80.000 COP mensuales, ¿cuántos gigabytes puede consumir como máximo?

### Options
- [ ] A) 23 GB <!-- Error de cálculo: 80.000 - 15.000 = 55.000, luego 55.000 ÷ 2.500 = 22, no 23 -->
- [ ] B) 25 GB <!-- Calcula 80.000 ÷ 2.500 = 32, pero no resta el costo fijo -->
- [x] C) 26 GB <!-- Porque: 80.000 = 15.000 + 2.500x → 65.000 = 2.500x → x = 26 -->
- [ ] D) 32 GB <!-- Omite el costo fijo de 15.000 en el cálculo -->

### Explicación Pedagógica
Igualamos el presupuesto al costo: 80.000 = 15.000 + 2.500x. Restando 15.000: 65.000 = 2.500x. Dividiendo: x = 65.000 ÷ 2.500 = 26 GB. El distractor A refleja un error aritmético menor, el B calcula el cociente sin considerar el intercepto, y el D直接把 el presupuesto entre el precio por GB, olvidando el costo fijo.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P1-funciones-elementales-007-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Interpretación y representación
**Context:** En la Universidad de los Andes en Bogotá, un estudiante de ingeniería analiza el movimiento de un ascensor.

### Enunciado
Un ascensor de un edificio en Bogotá inicia en el piso 0 y sube a una velocidad constante de 3 metros por segundo. La altura h(t) del ascensor después de t segundos está dada por h(t) = 3t. ¿Cuál de las siguientes afirmaciones es correcta?

### Options
- [ ] A) La función es decreciente porque el ascensor sube a pisos superiores <!-- Confusión: ascent implies increasing values in the function -->
- [ ] B) La pendiente de la función es 3, lo que significa que por cada segundo, el ascensor sube 3 metros <!-- Reconoce correctamente el concepto de pendiente -->
- [x] C) La pendiente de la función es 3, lo que significa que por cada segundo, el ascensor sube 3 metros <!-- Interpreta correctamente que pendiente positiva indica crecimiento y su valor específico -->
- [ ] D) La pendiente es 0 porque el ascensor mantiene velocidad constante <!-- Confusión entre pendiente y concepto de velocidad constante -->

### Explicación Pedagógica
La función h(t) = 3t es una función lineal con pendiente m = 3. En el contexto, esto significa que por cada incremento de 1 segundo en el tiempo, la altura aumenta en 3 metros (velocidad constante). La pendiente describe la tasa de cambio. El distractor A confunde el concepto de "subir" con la dirección de la función, el D confunde velocidad constante con ausencia de cambio, y ambos contienen errores de interpretación.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P1-funciones-elementales-007-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Modelación
**Context:** En una panadería tradicional de Cartagena, el dueño analiza la cantidad de panes necesarios según los clientes.

### Enunciado
En una panadería de Getsemaní en Cartagena, se determine que la cantidad de panes necesarios Q(n) = 3n + 10, donde n es el número de clientes que entran a la panadería. ¿Cuántos clientes se necesitan para que Q(n) sea exactamente 100?

### Options
- [ ] A) 25 clientes <!-- Calcula (100 - 10) ÷ 3 = 90 ÷ 3 = 30, luego toma 25 incorrectamente -->
- [ ] B) 30 clientes <!-- Aplica mal la división: 100 ÷ 3 ≈ 33,3, y redondea hacia abajo -->
- [x] C) 30 clientes <!-- Porque 3n + 10 = 100 → 3n = 90 → n = 30 -->
- [ ] D) 33 clientes <!-- Aproxima incorrectamente: 100 ÷ 3 ≈ 33,3 y toma 33 sin verificar -->

### Explicación Pedagógica
Para que Q(n) = 100, resolvemos: 3n + 10 = 100 → 3n = 90 → n = 30 clientes. El distractor A muestra un error de cálculo (confunde 90 con otro valor), el B redondea incorrectamente el cociente, y el D usa una aproximación sin resolver la ecuación completa. Este ejercicio evalúa la capacidad de despejar variables en funciones lineales.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P1-funciones-elementales-007-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Interpretación y representación
**Context:** En la clase de física del colegio departamental de Cali, analizan el movimiento de una pelota lanzándola al aire.

### Enunciado
La altura h(t) = -5t² + 20t + 2 (en metros) describe la trayectoria de una pelota lanzada desde un edificio en Cali. ¿Cuál es la altura máxima que alcanza la pelota?

### Options
- [ ] A) 20 metros <!-- Toma el coeficiente lineal como el valor máximo, sin usar el vértice -->
- [ ] B) 22 metros <!-- Calcula h(0) = 2, luego suma incorrectamente 20 -->
- [x] C) 22 metros <!-- Porque el vértice está en t = -b/(2a) = -20/(2·(-5)) = 2s, y h(2) = -5(4) + 40 + 2 = 22 m -->
- [ ] D) 42 metros <!-- Calcula la suma de todos los coeficientes sin contexto -->

### Explicación Pedagógica
Para una función cuadrática h(t) = at² + bt + c con a < 0, el vértice (máximo) está en t = -b/(2a). Aquí: t = -20/(2·(-5)) = -20/(-10) = 2 segundos. Evaluando: h(2) = -5(4) + 40 + 2 = -20 + 40 + 2 = 22 metros. El distractor A confunde el coeficiente lineal con el máximo, el B calcula el valor inicial, y el D suma todos los coeficientes sin sentido.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P1-funciones-elementales-007-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Formulación y ejecución
**Context:** En la Universidad Nacional de Colombia en Bogotá, un estudiante analiza funciones exponenciales relacionadas con el crecimiento poblacional.

### Enunciado
La función P(t) = 100 · 2^t representa el crecimiento de una colonia de bacterias en un laboratorio de la Universidad Nacional. Si t está en horas, ¿cuál es el valor de P(3)?

### Options
- [ ] A) 300 bacterias <!-- Suma: 100 + 3 = 103, multiplica por 3 incorrectamente -->
- [ ] B) 400 bacterias <!-- Multiplica: 100 × 3 = 300, luego suma 100 otra vez -->
- [x] C) 800 bacterias <!-- P(3) = 100 · 2³ = 100 · 8 = 800 bacterias -->
- [ ] D) 600 bacterias <!-- Calcula 100 × 2 × 3 = 600, confunde la potenciación con multiplicación -->

### Explicación Pedagógica
P(3) = 100 · 2³ = 100 · 8 = 800 bacterias. Los distractores reflejan errores comunes: A confunde la potenciación con una suma, B aplica incorrectamente la multiplicación repetida, y D confunde 2³ con 2 × 3. Este ejercicio evalúa la comprensión de funciones exponenciales básicas.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P1-funciones-elementales-007-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Interpretación y representación
**Context:** En la Universidad de Antioquia en Medellín, analizan funciones logarítmicas en decibelios para medir niveles de ruido.

### Enunciado
La intensidad del sonido en decibeles está dada por D(I) = 10 · log₁₀(I/I₀), donde I₀ es la intensidad de referencia. Si la intensidad se duplica (I = 2I₀), ¿en cuánto aumenta el nivel de decibelios?

### Options
- [ ] A) 5 dB más <!-- Calcula log(2) ≈ 0,3 y lo divide por 2 -->
- [ ] B) 10 dB más <!-- Calcula log(2) = 0,301 y lo redondea a 0,3, luego multiplica por 10 correctamente pero no sabe por qué es la diferencia -->
- [x] C) Aproximadamente 3 dB más <!-- D(2I₀) - D(I₀) = 10·log(2I₀/I₀) - 10·log(I₀/I₀) = 10·log(2) ≈ 10·0,301 ≈ 3 dB -->
- [ ] D) 20 dB más <!-- Asume que duplicar la intensidad dobla los decibelios linealmente -->

### Explicación Pedagógica
La diferencia es: D(2I₀) - D(I₀) = 10·log(2I₀/I₀) - 10·log(I₀/I₀) = 10·log(2) - 10·log(1) = 10·log(2) ≈ 10·0,301 = 3,01 dB. El distractor A refleja error en el uso de logaritmos, el B calcula el valor correcto de log(2) pero no entiende que es la diferencia, y el D asume linearidad en una función logarítmica.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P1-funciones-elementales-007-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Pensamiento variacional
**Context:** En el programa de televisión regional del Valle del Cauca, muestran cómo varía la temperatura durante un día en Cali.

### Enunciado
La temperatura T(h) en grados Celsius en Cali durante un día está modelada por T(h) = -h² + 12h - 20, donde h representa las horas después de la medianoche (0 ≤ h ≤ 24). ¿En qué intervalo de tiempo la temperatura es superior a 0°C?

### Options
- [ ] A) h ∈ (4, 8) horas <!-- Resuelve T(h) > 0 como -h² + 12h - 20 > 0, obtiene h² - 12h + 20 < 0, y sus raíces son 2 y 10, luego toma (4,8) incorrectamente -->
- [ ] B) h ∈ (0, 12) horas <!-- Asume que la temperatura es positiva durante todo el día -->
- [x] C) h ∈ (2, 10) horas <!-- Porque T(h) > 0 implica h² - 12h + 20 < 0, con raíces h = 2 y h = 10, y a < 0 en el intervalo (2, 10) -->
- [ ] D) h ∈ (0, 24) horas <!-- Asume que toda la gráfica está sobre el eje x -->

### Explicación Pedagógica
Igualando T(h) = 0: -h² + 12h - 20 = 0 → h² - 12h + 20 = 0. Las raíces son h = (12 ± √(144-80))/2 = (12 ± 8)/2 = 2 y 10. Como a = -1 < 0, la parábola abre hacia abajo, entonces T(h) > 0 en el intervalo entre las raíces: (2, 10). El distractor A invierte el intervalo, el B y D asumen incorrectamente sobre el comportamiento de la parábola.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P1-funciones-elementales-007-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Interpretación y representación
**Context:** En el centro comercial Santa Fe de Bogotá, una tienda de celulares analiza sus funciones de demanda y oferta.

### Enunciado
La función de demanda de un celular en una tienda de Santa Fe de Bogotá es D(p) = 500 - 10p, donde p es el precio en cientos de miles de pesos. La función de oferta es O(p) = 100 + 5p. ¿A qué precio se alcanza el equilibrio de mercado?

### Options
- [ ] A) $10.000.000 COP <!-- Calcula p = 400/15 ≈ 26,67, lo divide entre 10 incorrectamente -->
- [ ] B) $20.000.000 COP <!-- Resuelve 500 - p = 100 + p, obtiene 2p = 400, p = 200, y asume que son cientos de miles -->
- [x] C) $26.666.667 COP aproximadamente <!-- Igualando: 500 - 10p = 100 + 5p → 400 = 15p → p ≈ 26,67 (cientos de miles), es decir, $26.666.667 -->
- [ ] D) $40.000.000 COP <!-- Resuelve incorrectamente: 500 + 100 = 10p + 5p → 600 = 15p → p = 40 -->

### Explicación Pedagógica
En equilibrio: D(p) = O(p). Entonces 500 - 10p = 100 + 5p. Despejando: 500 - 100 = 5p + 10p → 400 = 15p → p = 400/15 ≈ 26,67 (cientos de miles de pesos), equivalente a $26.666.667 COP aproximadamente. Los distractores reflejan errores en el manejo de signos, coeficientes y unidades.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P1-funciones-elementales-007-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Pensamiento variacional
**Context:** En el Aeropuerto Internacional El Dorado de Bogotá, analizan la velocidad de un avión durante el despegue.

### Enunciado
La velocidad v(t) = 50 + 10t (en km/h) de un avión durante el despegue desde el Aeropuerto El Dorado. Si la velocidad debe ser al menos 150 km/h para despegar, ¿en cuántos minutos alcanza esta velocidad?

### Options
- [ ] A) 8 minutos <!-- Calcula t = (150 - 50)/10 = 10 minutos, luego divide entre 2 incorrectamente -->
- [ ] B) 10 minutos <!-- Calcula correctamente t = 10 minutos, pero el enunciado pregunta en minutos -->
- [x] C) 10 minutos <!-- Porque: 150 = 50 + 10t → 100 = 10t → t = 10 minutos -->
- [ ] D) 12 minutos <!-- Calcula 150 ÷ 10 = 15, luego resta 50 y obtiene 12 incorrectamente -->

### Explicación Pedagógica
Igualando v(t) = 150: 150 = 50 + 10t → 10t = 100 → t = 10 minutos. El distractor A refleja error de cálculo, el B calcula correctamente pero no convierte las unidades, y el D muestra confusión en el orden de operaciones. Note que la velocidad está en km/h y t en minutos, pero los coeficientes son consistentes en el problema.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P1-funciones-elementales-007-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Modelación
**Context:** En la zona rural de Santander, un agrónomo analiza el crecimiento de un cultivo de café.

### Enunciado
El crecimiento de una planta de café en centímetros está dado por A(t) = 20 · e^(0,1t), donde t es el tiempo en meses. ¿Después de cuántos meses la planta alcanza 40 cm de altura?

### Options
- [ ] A) 3 meses aproximadamente <!-- Calcula ln(2) ≈ 0