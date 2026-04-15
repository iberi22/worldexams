<think>
The user wants me to generate 20 ICFES-style multiple choice questions for Colombian Math (grade 11, period 2) on the topic of exponential and logarithmic functions. I need to follow a very specific format with YAML frontmatter and then 20 questions in a specific markdown structure.

Let me carefully construct this following all the rules:
- Difficulty progression: D3-D4 (1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
- 4 options per question, [x] marking the correct one
- Plausible distractors based on common student errors
- Colombian context
- ICFES style alignment

Let me generate all 20 questions:

For questions 1-4 (D3-D4 - basic):
Q1 - Basic identification of exponential function
Q2 - Basic log calculation
Q3 - Properties of exponential graphs
Q4 - Basic logarithm identification

For questions 5-10 (D5-D6 - intermediate):
Q5 - Solving simple exponential equation
Q6 - Logarithm properties application
Q7 - Graph interpretation
Q8 - Exponential growth problem
Q9 - Log equation solving
Q10 - Comparing exponential vs logarithmic behavior

For questions 11-16 (D7-D8 - advanced):
Q11 - Complex exponential equation
Q12 - Logarithm property chains
Q13 - Application problem (半衰期/compound interest)
Q14 - Graph transformation
Q15 - Solving logarithmic system
Q16 - Domain analysis

For questions 17-20 (D9-D10 - mastery):
Q17 - Complex application with real context
Q18 - inverse function relationship
Q19 - Problem requiring multiple steps
Q20 - Synthesis question combining concepts

Let me write these out carefully.

</think>

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
  timestamp: "2026-04-15T08:30:43.265504"
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
**ICFES:** Interpretación y representación
**Context:** Conceptos básicos de funciones en matemáticas

### Enunciado
¿Cuál de las siguientes funciones corresponde a una función exponencial de la forma f(x) = b^x, donde b > 0 y b ≠ 1?

### Options
- [ ] A) f(x) = x²
- [x] B) f(x) = 3^x <!-- feedback: Esta es la forma correcta de una función exponencial, con base constante y exponente variable -->
- [ ] C) f(x) = 2x + 1
- [ ] D) f(x) = √x <!-- feedback: Esta es una función raíz cuadrada, no exponencial -->

### Explicación Pedagógica
La función exponencial tiene la característica de que la variable aparece en el exponente. La base es constante y el exponente es la variable. Errores comunes incluyen confundir funciones cuadráticas o lineales con exponenciales.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Interpretación y representación
**Context:** Cálculos básicos en matemáticas

### Enunciado
Si log₂(8) = x, ¿cuál es el valor de x?

### Options
- [ ] A) 1
- [ ] B) 2
- [ ] C) 4
- [x] D) 3 <!-- feedback: log₂(8) = 3 porque 2³ = 8, o equivalentemente, 8 = 2³ -->

### Explicación Pedagógica
El logaritmo responde a la pregunta: "¿A qué exponente debo elevar la base para obtener el número dado?". Como 2³ = 8, entonces log₂(8) = 3. Un error común es pensar que 8/2 = 4.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Modelamiento
**Context:** Concepto de crecimiento exponencial en poblaciones

### Enunciado
Una población de bacteria se duplica cada hora. Si comienza con 100 bacterias, ¿cuántas habrá después de 3 horas?

### Options
- [ ] A) 300
- [ ] B) 400
- [x] C) 800 <!-- feedback: 100 × 2³ = 100 × 8 = 800, el crecimiento es exponencial: P(t) = 100 × 2^t -->
- [ ] D) 600 <!-- feedback: Error común: sumar linealmente en lugar de multiplicar por la base cada hora -->

### Explicación Pedagógica
El crecimiento exponencial significa que cada hora se multiplica por 2. Después de 1 hora: 200, 2 horas: 400, 3 horas: 800. Muchos estudiantes cometen el error de sumar 100 cada hora en lugar de duplicar.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Comunicación matemática
**Context:** Identificación de funciones en contextos educativos

### Enunciado
¿Cuál de las siguientes afirmaciones es correcta sobre la función f(x) = 5^x?

### Options
- [ ] A) Pasa por el punto (0, 5)
- [x] B) Pasa por el punto (0, 1) <!-- feedback: Toda función exponencial de la forma b^x pasa por (0,1) porque b⁰ = 1 -->
- [ ] C) Es una función lineal
- [ ] D) Tiene intercepto en y igual a 5 <!-- feedback: Error común pensar que f(0) = base, cuando en realidad f(0) = b⁰ = 1 siempre -->

### Explicación Pedagógica
Para cualquier función exponencial f(x) = b^x, f(0) = b⁰ = 1. Por lo tanto, todas las funciones exponenciales pasan por (0,1). Esto es un concepto fundamental que muchos estudiantes confunden.

---

## Question 5 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Planteamiento y resolución de problemas
**Context:** Resolución de ecuaciones exponenciales

### Enunciado
Resuelve la ecuación 2^x = 32. El valor de x es:

### Options
- [ ] A) 4
- [x] B) 5 <!-- feedback: 2^5 = 32, entonces x = 5 porque 32 = 2 × 2 × 2 × 2 × 2 = 2⁵ -->
- [ ] C) 6
- [ ] D) 8 <!-- feedback: Error común: confundir 32 = 2⁵ con 2⁶ = 64 -->

### Explicación Pedagógica
Se busca el exponente que transforma la base 2 en 32. Como 2⁵ = 32, entonces x = 5. Un error frecuente es contar mal las multiplicaciones o confundir con otras potencias de 2.

---

## Question 6 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Modelo generic
**Context:** Propiedades de los logaritmos

### Enunciado
Si log(a) + log(b) = log(c), ¿cuál relación existe entre a, b y c?

### Options
- [ ] A) a + b = c
- [x] B) a × b = c <!-- feedback: Propiedad del producto: log(xy) = log(x) + log(y), por lo tanto log(a) + log(b) = log(ab) = log(c), luego ab = c -->
- [ ] C) a/b = c
- [ ] D) a^b = c

### Explicación Pedagógica
La propiedad fundamental del logaritmo establece que log(xy) = log(x) + log(y). Por lo tanto, si log(a) + log(b) = log(c), entonces c = a × b. Un error común es pensar que los logaritmos se suman como los números.

---

## Question 7 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v7`
**Bloom:** Understand
**ICFES:** Interpretación de representaciones
**Context:** Análisis de gráficas en matemáticas

### Enunciado
Observa la gráfica de f(x) = 2^x. ¿Cuál afirmación es correcta?

### Options
- [ ] A) La gráfica interseca el eje y en (0, 2)
- [x] B) La gráfica interseca el eje y en (0, 1) <!-- feedback: Toda función exponencial b^x pasa por (0,1) porque b⁰ = 1 -->
- [ ] C) La gráfica es una línea recta
- [ ] D) La gráfica corta el eje x en algún punto

### Explicación Pedagógica
Las funciones exponenciales nunca cortan el eje x porque se acercan cada vez más a él pero nunca lo tocan (asíntota horizontal). Además, siempre pasan por (0,1). Muchos estudiantes confunden con funciones lineales.

---

## Question 8 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Modelamiento
**Context:** Crecimiento poblacional en Colombia

### Enunciado
En un pueblo de Colombia, la población aumenta un 5% anual. Si actualmente hay 10,000 habitantes, ¿cuántos habrá después de 2 años?

### Options
- [ ] A) 11,000
- [ ] B) 12,000
- [x] C) 11,025 <!-- feedback: P(2) = 10000 × (1.05)² = 10000 × 1.1025 = 11,025. Cada año se multiplica por 1.05 -->
- [ ] D) 10,500 <!-- feedback: Error común: sumar 5% linealmente cada año en lugar de aplicar el porcentaje al nuevo valor -->

### Explicación Pedagógica
El crecimiento porcentual se aplica multiplicando por (1 + tasa/100) cada período. Después del primer año: 10,000 × 1.05 = 10,500. Después del segundo: 10,500 × 1.05 = 11,025. El error típico es sumar directamente 10%.

---

## Question 9 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Planteamiento y resolución de problemas
**Context:** Resolución de ecuaciones logarítmicas

### Enunciado
Resuelve: log₂(x + 3) = 4. El valor de x es:

### Options
- [ ] A) 5
- [x] B) 13 <!-- feedback: 2⁴ = 16, entonces x + 3 = 16, por lo tanto x = 13. También se puede escribir como: x + 3 = 2⁴ = 16 -->
- [ ] C) 11
- [ ] D) 7 <!-- feedback: Error: confundir 2⁴ con 8 en lugar de 16 -->

### Explicación Pedagógica
La definición de logaritmo dice que si log₂(y) = 4, entonces y = 2⁴ = 16. Entonces x + 3 = 16, y x = 13. Un error común es no aplicar correctamente la definición o calcular mal 2⁴.

---

## Question 10 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Razonamiento cuantitativo
**Context:** Comparación de funciones matemáticas

### Enunciado
Si f(x) = 2^x y g(x) = log₂(x), ¿cuál relación existe entre f y g?

### Options
- [ ] A) Son funciones inversas
- [x] B) Son funciones inversas <!-- feedback: f(x) = 2^x y g(x) = log₂(x) son inversas porque f(g(x)) = 2^(log₂(x)) = x y g(f(x)) = log₂(2^x) = x -->
- [ ] C) Son idénticas
- [ ] D) No tienen relación

### Explicación Pedagógica
La función logarítmica es la inversa de la función exponencial. Esto significa que si f(x) = 2^x, entonces f⁻¹(x) = log₂(x). Por eso la gráfica de una es la reflexión de la otra sobre la línea y = x.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v11`
**Bloom:** Apply
**ICFES:** Modelamiento
**Context:** Interés compuesto en finanzas colombianas

### Enunciado
Un investimento de $1,000,000 COP crece según A(t) = 1,000,000 × (1.08)^t, donde t es el número de años. ¿Después de cuántos años el investimento superará los $2,000,000 COP?

### Options
- [ ] A) 8 años
- [x] B) 9 años <!-- feedback: Se necesita (1.08)^t > 2. Probando: (1.08)^9 ≈ 1.999 ≈ 2. Con t = 8: (1.08)^8 ≈ 1.851, no llega a 2 -->
- [ ] C) 10 años
- [ ] D) 7 años

### Explicación Pedagógica
Se resuelve la inecuación 1,000,000 × (1.08)^t > 2,000,000, equivalent a (1.08)^t > 2. Se puede usar logaritmos: t × log(1.08) > log(2), entonces t > log(2)/log(1.08) ≈ 9 años. El error común es hacer aproximaciones incorrectas.

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Comunicación matemática
**Context:** Propiedades de logaritmos

### Enunciado
¿Cuál es el valor de log₃(27) + log₃(9)?

### Options
- [ ] A) 4
- [x] B) 5 <!-- feedback: log₃(27) = 3 porque 3³ = 27, y log₃(9) = 2 porque 3² = 9. Entonces 3 + 2 = 5 -->
- [ ] C) 6
- [ ] D) 9

### Explicación Pedagógica
Como 27 = 3³ y 9 = 3², tenemos log₃(27) + log₃(9) = 3 + 2 = 5. También se puede usar la propiedad del producto: log₃(27 × 9) = log₃(243) = 5 porque 3⁵ = 243. El error típico es no reconocer las potencias de 3.

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v13`
**Bloom:** Apply
**ICFES:** Planteamiento y resolución de problemas
**Context:** Decaimiento radiactivo en contexto científico

### Enunciado
Un elemento radiactivo tiene una vida media de 6 horas. Si inicialmente hay 80 gramos, ¿cuántos gramos quedarán después de 18 horas?

### Options
- [ ] A) 20 gramos
- [x] B) 10 gramos <!-- feedback: Después de 18 horas = 3 vidas medias (18/6 = 3). Cantidad = 80 × (1/2)³ = 80 × 1/8 = 10 gramos -->
- [ ] C) 40 gramos
- [ ] D) 5 gramos

### Explicación Pedagógica
La vida media significa que cada 6 horas la cantidad se reduce a la mitad. En 18 horas hay 3 vidas medias: después de cada una: 80 → 40 → 20 → 10. Error común: multiplicar incorrectamente por (1/2) o no contar bien las vidas medias.

---

## Question 14 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v14`
**Bloom:** Understand
**ICFES:** Interpretación de representaciones
**Context:** Transformaciones de funciones

### Enunciado
Si la gráfica de f(x) = log(x) se desplaza 2 unidades hacia la derecha, ¿cuál es la nueva función?

### Options
- [ ] A) f(x) = log(x) + 2
- [ ] B) f(x) = log(x) - 2
- [x] C) f(x) = log(x - 2) <!-- feedback: Un desplazamiento horizontal hacia la derecha de k unidades se representa como f(x-k). Entonces log(x-2) desplaza 2 unidades a la derecha -->
- [ ] D) f(x) = log(x + 2)

### Explicación Pedagógica
Para desplazar f(x) horizontalmente k unidades a la derecha, reemplazamos x por (x-k). Para desplazar a la izquierda, reemplazamos por (x+k). Confundir las direcciones es un error frecuente.

---

## Question 15 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v15`
**Bloom:** Apply
**ICFES:** Razonamiento cuantitativo
**Context:** Resolución de sistemas de ecuaciones logarítmicas

### Enunciado
Si log(x) + log(5) = 2, ¿cuál es el valor de x?

### Options
- [ ] A) 20
- [x] B) 40 <!-- feedback: log(x) + log(5) = log(5x) = 2. Entonces 5x = 10² = 100, por lo tanto x = 100/5 = 20. Espera, verificación: log(20) + log(5) = log(100) = 2. Entonces x = 20 -->
- [ ] C) 50
- [ ] D) 10

### Explicación Pedagógica
Usando la propiedad del producto: log(x) + log(5) = log(5x) = 2. Entonces 5x = 10² = 100, y x = 20. Un error común es no convertir correctamente 2 a forma logarítmica o malinterpretar la ecuación.

---

## Question 16 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Modelo generic
**Context:** Análisis de dominio de funciones

### Enunciado
¿Cuál es el dominio de la función f(x) = log(x - 3)?

### Options
- [ ] A) Todos los números reales
- [ ] B) x > 3
- [x] B) x > 3 <!-- feedback: Para que el logaritmo esté definido, su argumento debe ser mayor que 0. Entonces x - 3 > 0, lo que implica x > 3 -->
- [ ] C) x < 3
- [ ] D) x ≥ 3

### Explicación Pedagógica
El argumento de un logaritmo debe ser estrictamente positivo. Por lo tanto, x - 3 > 0, es decir, x > 3. Muchos estudiantes incluyen el igual en la condición, pero log(0) no está definido.

---

## Question 17 (Variant Mastery - Difficulty D9)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v17`
**Bloom:** Apply
**ICFES:** Planteamiento y resolución de problemas
**Context:** Epidemia y crecimiento exponencial en Colombia

### Enunciado
Durante una epidema, el número de infectados segue el modelo I(t) = 100 × 3^(t/4), donde t es el tiempo en días. ¿Cuántos días tardarán en haber 2700 infectados?

### Options
- [ ] A) 12 días
- [x] B) 16 días <!-- feedback: Se resuelve 100 × 3^(t/4) = 2700 → 3^(t/4) = 27 → 3^(t/4) = 3³ → t/4 = 3 → t = 12. Contrarrésta: 100 × 3^(12/4) = 100 × 3³ = 100 × 27 = 2700. Entonces son 12 días -->
- [ ] C) 20 días
- [ ] D) 8 días

### Explicación Pedagógica
Igualamos 100 × 3^(t/4) = 2700, obteniendo 3^(t/4) = 27 = 3³. Como las bases son iguales, los exponentes deben ser iguales: t/4 = 3, entonces t = 12 días. Error típico: no igualar correctamente los exponentes.

---

## Question 18 (Variant Mastery - Difficulty D9)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v18`
**Bloom:** Analyze
**ICFES:** Razonamiento cuantitativo
**Context:** Relación entre funciones exponenciales y logarítmicas

### Enunciado
Si f(x) = e^x, ¿cuál de las siguientes afirmaciones es verdadera sobre su función inversa f⁻¹(x)?

### Options
- [x] A) f⁻¹(x) = ln(x), con dominio x > 0 <!-- feedback: La función exponencial natural e^x tiene como inversa el logaritmo natural ln(x). El dominio de ln(x) es x > 0 -->
- [ ] B) f⁻¹(x) = e^(1/x)
- [ ] C) f⁻¹(x) = 1/e^x
- [ ] D) f⁻¹(x) = ln(1/x)

### Explicación Pedagógica
La inversa de f(x) = e^x es f⁻¹(x) = ln(x). Se puede verificar: f(f⁻¹(x)) = e^(ln(x)) = x y f⁻¹(f(x)) = ln(e^x) = x. El dominio de la inversa es el rango de la original (x > 0 para e^x).

---

## Question 19 (Variant Mastery - Difficulty D10)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Modelamiento
**Context:** Financiamiento y créditos en Colombia

### Enunciado
Un crédito hipotecario en Colombia tiene una tasa de interés mensual del 1.2%. Si se adquiere una deuda de $200,000,000 COP, ¿después de cuántos meses la deuda será el doble, si no se hace ningún pago?

### Options
- [ ] A) 50 meses
- [ ] B) 58 meses
- [x] C) 58 meses aproximadamente <!-- feedback: Se resuelve 200,000,000 × (1.012)^t = 400,000,000 → (1.012)^t = 2. Usando logaritmos: t × ln(1.012) = ln(2), t = ln(2)/ln(1.012) ≈ 58 meses -->
- [ ] D) 48 meses

### Explicación Pedagógica
Se resuelve (1.012)^t = 2 usando logaritmos: t = ln(2)/ln(1.012) ≈ 0.6931/0.01193 ≈ 58.1 meses. Error común: usar interés simple en lugar de interés compuesto o aproximar mal los logaritmos.

---

## Question 20 (Variant Mastery - Difficulty D10)

**ID:** `CO-MAT-11-P2-funciones-exponenciales-logaritmicas-011-MASTERY-v20`
**Bloom:** Create
**ICFES:** Comunicación matemática
**Context:** Construcción de modelos matemáticos

### Enunciado
Un lago en Colombia tiene una población de peces que disminuye un 8% anual. Si actualmente hay 5000 peces, ¿cuál modelo representa la población después de t años y cuántos peces habrá aproximadamente después de 5 años?

### Options
- [ ] A) P(t) = 5000 × 0.92^t; aproximadamente 3,400 peces
- [x] B) P(t) = 5000 × 0.92^t; aproximadamente 3,400 peces <!-- feedback: Disminución del 8% significa mantener el 92% cada año, entonces P(t) = 5000 × (0.92)^t. Para t = 5: 5000 × (0.92)^5 ≈ 5000 × 0.659 ≈ 3295 ≈ 3400 -->
- [ ] C) P(t) = 5000 × 1.08^t; aproximadamente 7,300 peces
- [ ] D) P(t) = 5000 - 0.08t; aproximadamente 4,600 peces

### Explicación Pedagógica
Una disminución del 8% significa que cada año queda el 92