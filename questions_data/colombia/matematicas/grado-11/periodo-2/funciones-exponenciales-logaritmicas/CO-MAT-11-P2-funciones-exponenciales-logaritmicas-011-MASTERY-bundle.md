<think>
The user wants me to generate exactly 20 ICFES-style questions for Colombian Math exam (Saber 11) on the topic of exponential and logarithmic functions, grade 11, period 2.

Let me follow the exact format requested:

1. First must include the YAML frontmatter block
2. Then 20 questions in the exact format specified
3. Difficulty progression: D3-D4 (questions 1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
4. Each question needs:
   - Question number with variant and difficulty
   - ID following the pattern
   - Bloom level
   - ICFES competency
   - Colombian context
   - Clear statement
   - 4 options (A, B, C, D) with [x] on correct answer
   - Feedback comments
   - Pedagogical explanation

Let me generate 20 questions following all these rules and the specific format.

The topic is "funciones-exponenciales-logaritmicas" (exponential and logarithmic functions).

I need to make sure:
- Questions are progressively harder
- Distractors are plausible errors Colombian students make
- Context is modern and Colombian
- Each has 4 options with [x] on correct one
- No "todas" or "ninguna" options
- Follow the exact structure

Let me create the questions:

Questions 1-4 (D3-D4 difficulty):
1. Basic identification of exponential functions
2. Basic logarithmic evaluation
3. Simple exponential equation
4. Basic log properties

Questions 5-10 (D5-D6 difficulty):
5. Graph interpretation of exponential
6. Logarithmic identity application
7. Exponential growth problem
8. Log equation solving
9. Property of logarithms
10. Change of base application

Questions 11-16 (D7-D8 difficulty):
11. Complex exponential equation


12. Logarithmic inequality
13. Compound interest/continuous growth
14. Inverse function relationship
15. Logarithmic/exponential transformation
16. Domain and range analysis

Questions 17-20 (D9-D10 difficulty):
17. Complex log equation with different bases
18. Application problem involving both functions
19. Graph analysis comparing both
20. Problem requiring multiple properties

Now I'll format this as the exact markdown output requested.

</think>

```yaml
---
id: "CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "funciones-exponenciales-logaritmicas"
periodo: 2
protocol_version: "5.1"
bundle_size: 20
bundle_index: 11
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T23:46:11.141977"
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

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comprensión y análisis de representaciones matemáticas
**Context:** El Instituto Humboldt estudia la población de una especie de ave nativa que se reproduce en los Andes colombianos.

### Enunciado
¿Cuál de las siguientes funciones representa un comportamiento exponencial decreciente?

### Options
- [ ] A) f(x) = 3^x
- [ ] B) f(x) = (1/3)^x
- [x] C) f(x) = 5 · (0.7)^x <!-- feedback: La base 0.7 está entre 0 y 1, por lo que la función decrece. Además, el coeficiente 5 es positivo, lo cual mantiene la forma exponencial decreciente típica. -->
- [ ] D) f(x) = x² + 1 <!-- feedback: Esta es una función cuadrática, no exponencial. El variable está en el exponente en las opciones A, B y C. -->

### Explicación Pedagógica
La respuesta correcta es C porque las funciones exponenciales decrecientes tienen base entre 0 y 1. Los estudiantes frecuentemente confunden el coeficiente con la base o confunden funciones cuadráticas con exponenciales. La clave está en identificar que en f(x) = 5 · (0.7)^x, el 0.7 (base) es menor que 1, garantizando el decrecimiento.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Interpretación de expresiones matemáticas
**Context:** El cultivo de café colombiano representa una actividad económica importante en la economía nacional.

### Enunciado
Si log₂(8) = x, ¿cuál es el valor de x?

### Options
- [ ] A) 1
- [ ] B) 2
- [x] C) 3 <!-- feedback: Como 2³ = 8, entonces log₂(8) = 3. El logaritmo pregunta: "¿a qué exponente debe elevarse 2 para obtener 8?" La respuesta es 3. -->
- [ ] D) 4 <!-- feedback: 2⁴ = 16, no 8. Este error ocurre cuando el estudiante confunde el resultado con el exponente de una potencia cercana. -->

### Explicación Pedagógica
La respuesta correcta es C. Para resolver log₂(8), se debe encontrar el exponente que satisface 2^x = 8. Este concepto fundamental de logaritmos como función inversa de la exponenciación es clave. El error común es confundir la base con el resultado o no reconocer que 8 = 2³.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Resolución de problemas matriciales
**Context:** En una empresa textil de Medellín, la producción de jeans sigue un modelo exponencial de acuerdo con la demanda del mercado.

### Enunciado
Si 2^x = 32, el valor de x es:

### Options
- [ ] A) 4
- [x] B) 5 <!-- feedback: 2⁵ = 2 × 2 × 2 × 2 × 2 = 32. Para resolver ecuaciones exponenciales, se debe expresar ambos lados como potencias de la misma base: 32 = 2⁵. -->
- [ ] C) 6 <!-- feedback: 2⁶ = 64, valor mayor que 32. Este error ocurre cuando se multiplica en lugar de identificar correctamente el exponente. -->
- [ ] D) 8 <!-- feedback: 2⁸ = 256. Error común es multiplicar el exponente sin verificar el resultado real. -->

### Explicación Pedagógica
La respuesta correcta es B. Cuando la base de la izquierda es la misma que la base de la potencia en la derecha (ambos son 2), el exponente debe ser igual: x = 5. Los estudiantes frecuentemente cometen errores al no expresar 32 como potencia de 2 o al confundir las propiedades de los exponentes.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Análisis de propiedades de funciones
**Context:** En el parque nacional Los Nevados, la temperatura desciende exponencialmente con la altitud sobre el nivel del mar.

### Enunciado
La función f(x) = 2^x tiene dominio y rango respectivamente iguales a:

### Options
- [ ] A) ℝ y (0, ∞)
- [x] B) ℝ y (0, ∞) <!-- feedback: Para f(x) = 2^x, el dominio es todos los reales porque cualquier número real puede ser exponente. El rango es (0, ∞) porque 2^x > 0 para todo x, y la función se acerca a 0 pero nunca lo alcanza. -->
- [ ] C) (0, ∞) y ℝ <!-- feedback: Esta es la descripción del dominio y rango del logaritmo, no de la exponencial. El estudiante puede estar confundiendo las propiedades de la función inversa. -->
- [ ] D) ℝ y ℝ <!-- feedback: El rango no puede ser todos los reales porque 2^x nunca produce valores negativos ni cero. Este error indica falta de comprensión del comportamiento de la exponencial. -->

### Explicación Pedagógica
La respuesta correcta es B. La función exponencial f(x) = 2^x está definida para todo x real (dominio = ℝ) y produce únicamente valores positivos (rango = (0, ∞)). Es crucial comprender que la exponencial es siempre positiva y tiende a cero cuando x → -∞, pero nunca lo alcanza.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Interpretación de gráficas y relaciones funcionales
**Context:** El Fondo Adaptado estudia cómo el cambio climático afecta el nivel del agua en el río Magdalena mediante modelos exponenciales.

### Enunciado
La gráfica de f(x) = 3^x interseca al eje y en el punto:

### Options
- [ ] A) (0, 3)
- [x] B) (0, 1) <!-- feedback: Toda función exponencial de la forma f(x) = a^x (con a > 0, a ≠ 1) interseca el eje y en (0, 1) porque a⁰ = 1 para cualquier base a. Esto es una propiedad fundamental de las exponenciales. -->
- [ ] C) (1, 3) <!-- feedback: El punto (1, 3) corresponde a f(1) = 3, no a la intersección con el eje y. Este error surge de confundir la evaluación en x = 1 con la intersección en el eje y. -->
- [ ] D) (3, 0) <!-- feedback: Este punto corresponde a f(0) = 3, que es incorrecto. La intersección con el eje y ocurre cuando x = 0, no cuando y = 0. -->

### Explicación Pedagógica
La respuesta correcta es B. La intersección con el eje y ocurre cuando x = 0. Evaluando f(0) = 3⁰ = 1, se obtiene el punto (0, 1). Este resultado es independiente de la base: cualquier exponencial a^x pasa por (0, 1). Los estudiantes frecuentemente confunden esta propiedad con la evaluación en x = 1.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Resolución de problemas con propiedades de operaciones
**Context:** La producción de aguacate Hass en el Valle del Cauca ha crecido siguiendo un patrón matemático particular.

### Enunciado
Si log(a · b) = log a + log b, esta propiedad se conoce como:

### Options
- [ ] A) Propiedad de cambio de base
- [ ] B) Propiedad de potencia del logaritmo
- [x] C) Propiedad del producto <!-- feedback: log(a · b) = log a + log b es la propiedad del logaritmo de un producto. Se usa para convertir multiplicación en suma, simplificando cálculos. -->
- [ ] D) Propiedad de cociente <!-- feedback: La propiedad del cociente es log(a/b) = log a - log b, que es diferente a la propiedad del producto presentada. -->

### Explicación Pedagógica
La respuesta correcta es C. La propiedad log(a · b) = log a + log b se denomina propiedad del producto del logaritmo. Es fundamental para resolver ecuaciones y expresiones logarítmicas. Los estudiantes deben identificar que el producto dentro del logaritmo se transforma en suma fuera de él.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Modelamiento de situaciones mediante funciones
**Context:** Un cultivo de flores en Chia duplica su producción cada año desde que implementó nuevas técnicas de cultivo en 2020.

### Enunciado
Si el cultivo producía 1000 cajas de flores en 2020, ¿cuántas produjo en 2025?

### Options
- [ ] A) 10,000 cajas
- [ ] B) 16,000 cajas
- [ ] C) 20,000 cajas
- [x] D) 32,000 cajas <!-- feedback: De 2020 a 2025 hay 5 años. Si duplica cada año: 1000 × 2⁵ = 1000 × 32 = 32,000 cajas. El crecimiento es exponencial: P(t) = 1000 · 2^t. -->

### Explicación Pedagógica
La respuesta correcta es D. En 5 años (2020 a 2025), con duplicación anual, el factor es 2⁵ = 32. Por lo tanto, 1000 × 32 = 32,000 cajas. Este problema modela crecimiento exponencial donde la población inicial se multiplica por la base elevada al número de períodos. El error común es no aplicar correctamente el exponente o confundir períodos.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Resolución de ecuaciones logarítmicas
**Context:** En la Sierra Nevada de Santa Marta, el registro de la biodiversidad permite estudiar patrones matemáticos en la cantidad de especies descubiertas.

### Enunciado
La solución de la ecuación log₂(x) = 4 es:

### Options
- [ ] A) x = 8
- [x] B) x = 16 <!-- feedback: Por definición, si log₂(x) = 4, entonces 2⁴ = x, por lo tanto x = 16. Se aplica la definición de logaritmo como función inversa de la exponenciación. -->
- [ ] C) x = 6 <!-- feedback: Error común al sumar la base y el exponente: 2 + 4 = 6. Esto indica confusión entre las operaciones y sus propiedades. -->
- [ ] D) x = 24 <!-- feedback: Error al multiplicar la base por el exponente: 2 × 4 = 8, sin relación con el procedimiento correcto. Esto muestra falta de comprensión de la definición de logaritmo. -->

### Explicación Pedagógica
La respuesta correcta es B. Para resolver log₂(x) = 4, se convierte a forma exponencial: x = 2⁴ = 16. Esta conversión entre forma logarítmica y exponencial es fundamental. Los estudiantes deben comprender que log_b(x) = y es equivalente a b^y = x.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v9`
**Bloom:** Understand
**ICFES:** Aplicación de propiedades de operaciones algebraicas
**Context:** El turismo en Cartagena de Indias ha mostrado tendencias de crecimiento que pueden modelarse matemáticamente.

### Enunciado
El valor de log₅(125) es:

### Options
- [ ] A) 2
- [ ] B) 3
- [x] C) 3 <!-- feedback: 125 = 5³, por lo tanto log₅(125) = 3. Se debe encontrar qué exponente de 5 produce 125. -->
- [ ] D) 5 <!-- feedback: 5⁵ = 3125, valor muy superior a 125. Error de cálculo del exponente sin verificar el resultado. -->

### Explicación Pedagógica
La respuesta correcta es C. Para calcular log₅(125), se busca el exponente tal que 5^x = 125. Como 5³ = 125, el resultado es 3. Este tipo de ejercicios refuerza la relación entre logaritmos y potenciación. El error frecuente es confundir la base con el resultado.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Resolución de problemas con cambio de base
**Context:** El análisis de datos económicos del Banco de la República requiere cálculos logarítmicos para modelar el crecimiento del PIB.

### Enunciado
Usando la fórmula de cambio de base, log₃(81) equivale a:

### Options
- [x] A) log(81)/log(3) <!-- feedback: Por la fórmula de cambio de base: log_b(a) = log(a)/log(b). Entonces log₃(81) = log(81)/log(3), lo cual es correcto. -->
- [ ] B) log(3)/log(81) <!-- feedback: Esta es la inversa de la respuesta correcta. Error al invertir numerador y denominador sin considerar la fórmula de cambio de base. -->
- [ ] C) log(81) × log(3) <!-- feedback: No existe propiedad de logaritmo que transforme división en multiplicación de esta manera. Error conceptual sobre operaciones con logaritmos. -->
- [ ] D) log(81) + log(3) <!-- feedback: La propiedad de suma corresponde al logaritmo de un producto, no al cambio de base. Error de confusión entre propiedades. -->

### Explicación Pedagógica
La respuesta correcta es A. La fórmula de cambio de base establece que log_b(a) = log(a)/log(b) (cualquier base). Para log₃(81), se puede escribir como log(81)/log(3). Esto permite calcular usando logaritmos comunes o naturales cuando no se tiene calculadora con base 3.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v11`
**Bloom:** Apply
**ICFES:** Resolución de ecuaciones exponenciales
**Context:** La diffusion de información en redes sociales en Bogotá sigue patrones de crecimiento exponencial durante eventos importantes.

### Enunciado
La solución de la ecuación 3^(2x-1) = 27 es:

### Options
- [ ] A) x = 2
- [x] B) x = 2 <!-- feedback: Como 27 = 3³, entonces 3^(2x-1) = 3³. Por igualdad de bases: 2x - 1 = 3, lo que implica 2x = 4, x = 2. -->
- [ ] C) x = 1.5 <!-- feedback: Error al resolver incorrectamente: 2x - 1 = 3 → 2x = 4 → x = 2, no 1.5. El valor 1.5 surge de dividir 3 entre 2 sin considerar el -1. -->
- [ ] D) x = 3.5 <!-- feedback: Error al sumar incorrectamente: 2x - 1 = 3 → 2x = 4, x = 2. Confusión entre suma y resta de términos. -->

### Explicación Pedagógica
La respuesta correcta es B. Primero se expresa 27 como 3³. Luego, con bases iguales, los exponentes deben ser iguales: 2x - 1 = 3. Resolviendo: 2x = 4, x = 2. Los errores comunes incluyen no igualar correctamente los exponentes o resolver incorrectamente la ecuación lineal resultante.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Interpretación de desigualdades
**Context:** El análisis de datos del Instituto Nacional de Salud sobre la propagación de enfermedades utiliza modelos logarítmicos para interpretar resultados.

### Enunciado
Si log(x) > 2, entonces x > 100. Esta afirmación es:

### Options
- [ ] A) Siempre verdadera
- [x] B) Verdadera solo si x > 0 (dominio del logaritmo) <!-- feedback: log(x) > 2 implica x > 100 por las propiedades de la función logarítmica (base 10). Sin embargo, debe cumplirse que x > 0 para que el logaritmo esté definido. -->
- [ ] C) Siempre falsa
- [ ] D) No se puede determinar

### Explicación Pedagógica
La respuesta correcta es B. log(x) > 2 implica x > 100, pero es necesario que x > 0 para que el logaritmo tenga sentido. La afirmación es verdadera cuando x > 100 (que implica x > 0), pero el dominio del logaritmo es x > 0. Por lo tanto, la afirmación es verdadera en su contexto, considerando el dominio.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v13`
**Bloom:** Apply
**ICFES:** Modelamiento de situaciones con funciones exponenciales
**Context:** Una startup fintech colombiana invierte en un fondo que ofrece un rendimiento continuo del 5% anual.

### Enunciado
Después de 3 años, ¿cuál es el valor de un capital inicial de $10,000,000 COP invertido con interés continuo?

### Options
- [ ] A) $10,000,000 · e^(0.05)
- [ ] B) $10,000,000 · e^(0.15)
- [x] C) $10,000,000 · e^(0.15) <!-- feedback: Para interés continuo, C(t) = C₀ · e^(rt). Con C₀ = 10,000,000, r = 0.05, t = 3: C(3) = 10,000,000 · e^(0.05·3) = 10,000,000 · e^0.15. -->
- [ ] D) $10,000,000 · e^3

### Explicación Pedagógica
La respuesta correcta es C. El modelo de crecimiento continuo usa la fórmula C(t) = C₀ · e^(rt). Con r = 5% = 0.05 y t = 3 años, el exponent es 0.05 × 3 = 0.15. Por lo tanto, el capital final es 10,000,000 · e^0.15. Los errores comunes incluyen no multiplicar r por t o usar incorrectamente la tasa.

---

## Question 14 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v14`
**Bloom:** Understand
**ICFES:** Análisis de funciones inversas
**Context:** El estudio de funciones biológicas en la Universidad Nacional de Colombia incluye el análisis de funciones inversas entre crecimiento exponencial y logarítmico.

### Enunciado
Si f(x) = e^x, entonces f⁻¹(x) es igual a:

### Options
- [ ] A) f⁻¹(x) = 1/e^x
- [x] B) f⁻¹(x) = ln(x) <!-- feedback: La función inversa de f(x) = e^x es f⁻¹(x) = ln(x) (logaritmo natural). Esto se verifica porque f(f⁻¹(x)) = e^(ln(x)) = x y f⁻¹(f(x)) = ln(e^x) = x. -->
- [ ] C) f⁻¹(x) = e^(1/x)
- [ ] D) f⁻¹(x) = x^e

### Explicación Pedagógica
La respuesta correcta es B. La función exponencial f(x) = e^x y la función logarítmica natural ln(x) son inversas entre sí. Esto significa que ln(e^x) = x y e^(ln(x)) = x. Los estudiantes frecuentemente confunden la forma de la inversa o confunden inversión (recíproco) con inversa de función.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v15`
**Bloom:** Apply
**ICFES:** Transformación de expresiones logarítmicas
**Context:** El análisis de señales en telecomunicaciones requiere manipular expresiones logarítmicas para optimizar la transmisión de datos en Colombia.

### Enunciado
La expresión 2 · ln(√e) es igual a:

### Options
- [ ] A) 1
- [x] B) 1 <!-- feedback: Como √e = e^(1/2), entonces ln(√e) = ln(e^(1/2)) = 1/2. Por lo tanto, 2 · ln(√e) = 2 · (1/2) = 1. -->
- [ ] C) e/2
- [ ] D) 2

### Explicación Pedagógica
La respuesta correcta es B. Primero, √e = e^(1/2). Luego, ln(e^(1/2)) = 1/2 por la propiedad del logaritmo de una potencia: ln(e^a) = a. Finalmente, 2 · (1/2) = 1. Este ejercicio demuestra cómo combinar propiedades de logaritmos y potencias. El error común es no reconocer que ln(e) = 1.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Análisis de dominio y rango
**Context:** El diseño de funciones para modelar fenómenos físicos en ingeniería civil requiere determinar el dominio de funciones logarítmicas.

### Enunciado
El dominio de la función f(x) = log₃(x - 2) es:

### Options
- [ ] A) Todos los reales
- [x] B) (2, ∞) <!-- feedback: Para que log₃(x - 2) exista, el argumento debe ser mayor que 0: x - 2 > 0, por lo tanto x > 2, es decir (2, ∞). El logaritmo solo está definido para argumentos positivos. -->
- [ ] C) (0, ∞)
- [ ] D) [2, ∞)

### Explicación Pedagógica
La respuesta correcta es B. La condición para que un logaritmo esté definido es que su argumento sea estrictamente positivo: x - 2 > 0, entonces x > 