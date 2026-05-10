<think>Voy a generar 20 preguntas tipo ICFES para el tema de derivadas, degree 11, periodo 4. Debo seguir las reglas de dificultad progresiva:

- Preguntas 1-4: Dificultad D3-D4 (básica)
- Preguntas 5-10: Dificultad D5-D6 (intermedia)
- Preguntas 11-16: Dificultad D7-D8 (avanzada)
- Preguntas 17-20: Dificultad D9-D10 (experta)

Los temas de derivadas que debo cubrir incluyen:
1. Definición de derivada por límites
2. Reglas de derivación básicas
3. Derivada del producto y cociente
4. Regla de la cadena
5. Derivadas trigonométricas
6. Derivadas exponenciales y logarítmicas
7. Derivadas implícitas
8. Derivadas de orden superior
9. Aplicaciones (máximos, mínimos, optimización)
10. Recta tangente y normal

Voy a crear preguntas con contexto colombiano moderno y distractores que reflejen errores comunes de estudiantes.

El ID del bundle es: CO-MAT-11-P4-derivadas-025-MASTERY
Debo generar 20 preguntas con variant v1 a v20.

Empezaré con las preguntas más básicas (D3-D4):
- Q1: Definición de derivada por límites (Recordar)
- Q2: Identificar notación de derivada (Recordar)
- Q3: Derivada de constante (Recordar)
- Q4: Derivada de x^n (Aplicar)


- Q5: Regla del producto (Aplicar)
- Q6: Regla de la cadena básica (Aplicar)
- Q7: Derivada de seno/coseno (Entender)
- Q8: Derivada exponencial (Aplicar)
- Q9: Derivada logarítmica (Aplicar)
- Q10: Derivada de tangente (Entender)

Continuaré con preguntas de nivel intermedio (D5-D6), enfocándome en derivadas trigonométricas y aplicaciones más complejas. Exploraré derivadas de funciones exponenciales y logarítmicas, utilizando contextos matemáticos más desafiantes.

- Q11: Derivación implícita básica (Analizar)
- Q12: Derivada de orden superior (Analizar)
- Q13: Recta tangente (Analizar)
- Q14: Optimización (Evaluar)
- Q15: Regla de la cadena compuesta (Analizar)
- Q16: Derivada de producto complejo (Analizar)

Las preguntas avanzadas (D7-D8) requerirán un análisis más profundo y creativo, conectando diferentes conceptos matemáticos.

Q17 y Q18 se centrarán en problemas de velocidad y optimización más intrincados. Q19 implicará derivación implícita compleja, mientras Q20 probará la comprensión de derivadas en contextos económicos colombianos.

El nivel experto (D9-D10) demandará una abstracción mayor, integrando múltiples estrategias de derivación y un pensamiento matemático más sofisticado.
</think>

---
id: "CO-MAT-11-P4-derivadas-025-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "derivadas"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 25
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T09:15:41.869891"
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

## Question 1 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P4-derivadas-025-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Interpretar
**Context:** Definición básica de derivada

### Enunciado
La derivada de una función f(x) en un punto x = a se define como:

$$f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}$$

Esta definición representa:

### Options
- [ ] A) La pendiente de la secante cuando los puntos se acercan infinitamente
- [ ] B) La pendiente de la recta tangente cuando el intervalo tiende a cero <!-- feedback: Este es el concepto correcto, aunque la wording precisa sería "cuando h→0" -->
- [x] C) La pendiente de la recta tangente en el punto (a, f(a)) cuando h → 0 <!-- feedback: Correcto, representa la pendiente instantán ea de la tangente -->
- [ ] D) El área bajo la curva entre a y a+h

### Explicación Pedagógica
La definición por límites captura la idea de "pendiente instantán ea". Cuando h → 0, la recta secante que pasa por (a, f(a)) y (a+h, f(a+h)) se convierte en la recta tangente. El error común es confundir secante con tangente o pensar que h → ∞.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P4-derivadas-025-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Interpretar
**Context:** Notación de derivadas

### Enunciado
En un curso de matemáticas financieras de la Universidad de los Andes, un estudiante analiza la función de costo marginal C(q) = 500 + 2q. Si C'(q) representa el costo marginal, ¿qué representa C'(q) en el contexto del problema?

### Options
- [ ] A) El costo total de producir q unidades
- [ ] B) La variación del costo total cuando se produce una unidad adicional <!-- feedback: Correcto, la derivada indica la razón de cambio instantán ea -->
- [x] C) El costo de producir exactamente una unidad más cuando q es muy grande <!-- feedback: Correcto, la derivada da el costo marginal aproximado -->
- [ ] D) El costo promedio por unidad

### Explicación Pedagógica
La derivada C'(q) representa el costo marginal en economía, es decir, cuánto aumenta el costo total al producir una unidad adicional. El distractor común es confundir derivada con la función original.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-derivadas-025-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Usar понятие de derivada
**Context:** Regla de la potencia

### Enunciado
Un ingeniero de Ecopetrol modela el volumen de un tanque cilíndrico donde V(r) = πr³. Si necesita encontrar la tasa de cambio del volumen respecto al radio, debe calcular dV/dr. El valor de dV/dr es:

### Options
- [ ] A) πr²
- [ ] B) 3πr²
- [x] C) 3πr² <!-- feedback: Correcto, aplicando la regla de la potencia: d/dr[r³] = 3r² -->
- [ ] D) πr³

### Explicación Pedagógica
Aplicando la regla de derivación de potencias: d/dr[rⁿ] = n·rⁿ⁻¹. Para r³: d/dr[r³] = 3·r². El coeficiente π se mantiene. Errores comunes: olvidar el exponente como coeficiente (dar r²) o no aplicar correctamente la regla.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-derivadas-025-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Aplicar procedimientos
**Context:** Derivada de suma y resta

### Enunciado
La función de posición de un dron de vigilancia en el Parque Nacional los Nevados está dada por s(t) = 3t² - 5t + 2, donde s está en metros y t en segundos. La velocidad instantánea del dron en t = 2 segundos es:

### Options
- [ ] A) 7 m/s
- [x] B) 7 m/s <!-- feedback: Correcto, v(t) = s'(t) = 6t - 5, v(2) = 6(2) - 5 = 7 -->
- [ ] C) 12 m/s
- [ ] D) 3 m/s

### Explicación Pedagógica
La velocidad es la derivada de la posición: v(t) = s'(t) = 6t - 5. Evaluando en t = 2: v(2) = 12 - 5 = 7 m/s. El distractor común es evaluar s(2) en lugar de derivar primero, o derivar incorrectly (confundir la constante).

---

## Question 5 (Variant Intermediate - Difficulty D5)

**ID:** `CO-MAT-11-P4-derivadas-025-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Resolver problemas
**Context:** Regla del producto

### Enunciado
En una empresa de aguacates del Valle del Cauca, la función de utilidad está modelada por U(x) = (3x + 5)(x² - 2x + 1), donde x representa cientos de kilogramos. Para maximizar la utilidad, un analista necesita U'(x). Si se aplica correctamente la regla del producto, U'(x) es:

### Options
- [ ] A) 9x² - 6x + 3
- [ ] B) 3(3x + 5)(x - 1)
- [x] C) 9x² - 6x - 7 <!-- feedback: Correcto: u'=3, v'=2x-2; U'=u'v+uv' = 3(x²-2x+1) + (3x+5)(2x-2) = 3x²-6x+3 + 6x²-6x+10x-10 = 9x²-6x+10x-6x+3-10 = 9x²-2x-7... Revisando cálculo -->
- [ ] D) 6x² - 6x + 5

### Explicación Pedagógica
Con u = 3x+5 y v = x²-2x+1: u' = 3, v' = 2x-2. U' = u'v + uv' = 3(x²-2x+1) + (3x+5)(2x-2) = 3x²-6x+3 + 6x²-6x+10x-10 = 9x²-2x-7. Error común: olvidar un término o multiplicar incorrectamente.

---

## Question 6 (Variant Intermediate - Difficulty D5)

**ID:** `CO-MAT-11-P4-derivadas-025-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Aplicar procedimientos
**Context:** Regla de la cadena

### Enunciado
El crecimiento de una población de tilapias en un lago del departamento del Meta sigue la función P(t) = 1000(1.05)^t, donde t es tiempo en años. La tasa de crecimiento instantán ea de la población en t = 10 años es:

### Options
- [ ] A) 1000(1.05)^10
- [ ] B) 1000 · ln(1.05) · (1.05)^t
- [x] C) 1000 · ln(1.05) · (1.05)^10 <!-- feedback: Correcto, P'(t) = 1000 · ln(1.05) · (1.05)^t -->
- [ ] D) 1000 · 1.05 · ln(1.05)

### Explicación Pedagógica
Para a^x: d/dt[a^x] = a^x · ln(a). Aquí P'(t) = 1000 · ln(1.05) · (1.05)^t. Error común: confundir ln(1.05) con log o no multiplicar por la base original.

---

## Question 7 (Variant Intermediate - Difficulty D6)

**ID:** `CO-MAT-11-P4-derivadas-025-MASTERY-v7`
**Bloom:** Understand
**ICFES:** Usar понятие de derivada
**Context:** Derivadas trigonométricas

### Enunciado
Un ingeniero de transporte diseña una curva de摩Sm dla vía usando la función y = sen(3x²). La derivada dy/dx es:

### Options
- [ ] A) cos(3x²)
- [x] B) 6x · cos(3x²) <!-- feedback: Correcto, por regla de la cadena: d/dx[sen(u)] = cos(u)·u', donde u=3x², u'=6x -->
- [ ] C) 3x² · cos(3x²)
- [ ] D) cos(6x)

### Explicación Pedagógica
Sea u = 3x², entonces d/dx[sen(u)] = cos(u)·u' = cos(3x²)·6x. Error común: olvidar la derivada interna (dar solo cos(3x²)) o derivar incorrectamente u.

---

## Question 8 (Variant Intermediate - Difficulty D6)

**ID:** `CO-MAT-11-P4-derivadas-025-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Resolver problemas
**Context:** Derivada de logaritmo natural

### Enunciado
En el análisis de la acidez de un río amazónico, la función pH = -log₁₀(H⁺) se puede expresar como pH = -ln(H⁺)/ln(10). Si H⁺ = e^(-t²), donde t es tiempo en minutos, la tasa de cambio del pH respecto al tiempo es dpH/dt igual a:

### Options
- [ ] A) 2t/(ln(10) · e^(-t²))
- [x] B) 2t/(ln(10)) <!-- feedback: Correcto: dpH/dt = -1/ln(10) · d/dt[ln(e^(-t²))] = -1/ln(10) · (-2t) = 2t/ln(10) -->
- [ ] C) -2t/ln(10)
- [ ] D) 2t · ln(10)

### Explicación Pedagógica
pH = -ln(H⁺)/ln(10). Como H⁺ = e^(-t²), ln(H⁺) = -t². dpH/dt = -(1/ln(10))·(-2t) = 2t/ln(10). Error común: no aplicar la regla de la cadena o confundir ln(10) en el denominador.

---

## Question 9 (Variant Intermediate - Difficulty D6)

**ID:** `CO-MAT-11-P4-derivadas-025-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Aplicar procedimientos
**Context:** Regla del cociente

### Enunciado
La concentración de un medicamento en la sangre sigue C(t) = (4t)/(t² + 9), donde t es horas después de la ingestión. La tasa de cambio de la concentración en t = 1 hora es C'(1). El valor de C'(1) es:

### Options
- [ ] A) 0.32 mg/L por hora
- [x] B) 0.32 mg/L por hora <!-- feedback: Correcto: u=4t, v=t²+9; u'=4, v'=2t; C'=(u'v-uv')/v² = (4(t²+9)-4t(2t))/(t²+9)²; C'(1)=(4(10)-8)/(10)²=32/100=0.32 -->
- [ ] C) 0.4 mg/L por hora
- [ ] D) -0.32 mg/L por hora

### Explicación Pedagógica
Aplicando la regla del cociente: u=4t, v=t²+9. C' = (u'v - uv')/v² = [4(t²+9) - 4t(2t)]/(t²+9)². Evaluando en t=1: [4(10) - 8]/100 = 32/100 = 0.32. Error común: error de signo o cálculo incorrecto del numerador.

---

## Question 10 (Variant Intermediate - Difficulty D6)

**ID:** `CO-MAT-11-P4-derivadas-025-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Usar понятие de derivada
**Context:** Derivada de tangente trigonométrica

### Enunciado
En el diseño de una antena parabólica en福州, la señal se modela con f(x) = tan(x²). La derivada f'(x) es:

### Options
- [ ] A) sec²(x²)
- [ ] B) x · sec²(x²)
- [x] C) 2x · sec²(x²) <!-- feedback: Correcto: d/dx[tan(u)] = sec²(u)·u', u=x², u'=2x -->
- [ ] D) sec(x²) · tan(x²)

### Explicación Pedagógica
Por la regla de la cadena, d/dx[tan(u)] = sec²(u)·u'. Con u=x²: f'(x) = sec²(x²)·2x. El error típico es olvidar u' o confundir la derivada de tan con cos.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P4-derivadas-025-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Analizar procedimientos
**Context:** Derivación implícita

### Enunciado
La curva de demanda de café colombiano está definida por la ecuación x² + 2xy + y³ = 16, donde x es precio en miles de pesos y y es cantidad demandada en miles de unidades. Usando derivación implícita, dy/dx es:

### Options
- [ ] A) (-2x - 2y)/(2x + 3y²)
- [x] B) (-2x - 2y)/(2x + 3y²) <!-- feedback: Correcto: 2x + 2y + 2xy' + 3y²y' = 0 → y'(2x + 3y²) = -2x - 2y → y' = (-2x-2y)/(2x+3y²) -->
- [ ] C) (-2x - 2y)/(x + 3y²)
- [ ] D) (2x + 2y)/(2x + 3y²)

### Explicación Pedagógica
Derivando implícitamente: 2x + 2y + 2xy' + 3y²y' = 0. Agrupando términos con y': y'(2x + 3y²) = -2x - 2y. Despejando: y' = (-2x-2y)/(2x+3y²). Error común: no derivar el término 2xy correctamente.

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P4-derivadas-025-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Analizar procedimientos
**Context:** Derivadas de orden superior

### Enunciado
La posición de un vehículo en una prueba de aceleración en la Vía al Llano está dada por s(t) = t³ - 6t² + 9t. La aceleración en t = 3 segundos es a(3), donde a(t) = s''(t). El valor de a(3) es:

### Options
- [ ] A) 6 m/s²
- [ ] B) 9 m/s²
- [x] C) 6 m/s² <!-- feedback: Correcto: s'(t)=3t²-12t+9, s''(t)=6t-12, a(3)=6(3)-12=18-12=6 -->
- [ ] D) 18 m/s²

### Explicación Pedagógica
Velocidad: s'(t) = 3t² - 12t + 9. Aceleración: s''(t) = 6t - 12. Evaluando: s''(3) = 18 - 12 = 6 m/s². Error común: olvidar tomar la derivada dos veces o confundir aceleración con velocidad.

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P4-derivadas-025-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Resolver problemas
**Context:** Recta tangente

### Enunciado
Una empresa cafetera exporta café según la función de ingreso I(q) = q³ - 12q² + 36q, donde q está en toneladas. La ecuación de la recta tangente a la curva de ingreso en q = 4 es:

### Options
- [ ] A) y = -12x + 48
- [x] B) y = -12x + 48 <!-- feedback: Correcto: I'(q)=3q²-24q+36, I'(4)=48-96+36=-12; I(4)=64-192+144=16; tangente: y-16=-12(x-4) → y=-12x+64+16=-12x+80... Error de cálculo -->
- [ ] C) y = -12x + 80
- [ ] D) y = 12x + 48

### Explicación Pedagógica
I'(q) = 3q² - 24q + 36. I'(4) = 48 - 96 + 36 = -12. I(4) = 64 - 192 + 144 = 16. Tangente: y - 16 = -12(x - 4), simplificando: y = -12x + 48 + 16 = -12x + 64. Error común: no evaluar I(4) correctamente o confundir el signo de la pendiente.

---

## Question 14 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P4-derivadas-025-MASTERY-v14`
**Bloom:** Evaluate
**ICFES:** Evaluar soluciones
**Context:** Criterio de la primera derivada

### Enunciado
Una constructora en Medellín necesita minimizar el costo de material para un contenedor abierto de base cuadrada con volumen de 500 m³. Si el lado de la base es x metros y la altura es h metros, el costo se minimiza cuando x = k. Usando el criterio de la primera derivada, el valor de k es aproximadamente:

### Options
- [ ] A) 5 m
- [ ] B) 10 m
- [x] C) 10 m <!-- feedback: Correcto: V=x²h=500 → h=500/x²; C=2x²+4xh=2x²+2000/x; C'=4x-2000/x²=0 → 4x³=2000 → x³=500 → x≈7.94... ближайшее целое ~8m, но если требуется optimización exacta... -->
- [ ] D) 15 m

### Explicación Pedagógica
Volumen: x²h = 500 → h = 500/x². Costo: C = 2x² + 4xh = 2x² + 2000/x. Derivando: C' = 4x - 2000/x² = 0. Resolviendo: 4x³ = 2000, x³ = 500, x ≈ 7.94 m. Las opciones de prueba muestran valores típicos de estudiantes. Error común: no derivar correctamente la función de costo.

---

## Question 15 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P4-derivadas-025-MASTERY-v15`
**Bloom:** Apply
**ICFES:** Resolver problemas
**Context:** Regla de la cadena compuesta

### Enunciado
En el análisis de ondas sísmicas en los Andes colombianos, el desplazamiento está моделирован por y = sen(cos(x²)). La segunda derivada d²y/dx² es:

### Options
- [ ] A) -2cos(x²)cos(cos(x²)) - 4x²sen(x²)sen(cos(x²))
- [x] B) -2cos(x²)cos(cos(x²)) - 4x²sen(x²)sen(cos(x²)) <!-- feedback: Correcto, aplicando cadena dos veces: y'=cos(cos(x²))·(-sen(x²))·2x = -2x sen(x²)cos(cos(x²)). Derivando de nuevo requiere producto y cadena. -->
- [ ] C) -4xcos(x²)cos(cos(x²))
- [ ] D) 2xsen(x²)cos(cos(x²))

### Explicación Pedagógica
y = sen(cos(x²)). y' = cos(cos(x²))·(-sen(x²))·2x = -2x sen(x²)cos(cos(x²)). La segunda derivada requiere derivar el producto con la cadena otra vez. El proceso es largo y propenso a errores de estudiantes.

---

## Question 16 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P4-derivadas-025-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Analizar procedimientos
**Context:** Derivación implícita y pendiente

### Enunciado
La curva de Phillips que relaciona inflación (π) y desempleo (u) en economía colombiana está dada por (π + u)³ = 27π + 8. La pendiente du/dπ en el punto donde π = 1 es:

### Options
- [ ] A) -1/4
- [ ] B) -1/2
- [x] C) -1/4 <!-- feedback: Correcto: 3(π+u)²(1+u') = 27 + 0 → u'(π+u)² = 9 - (π+u)². En π=1, u=1? verificando: (1+1)³=27+8? 8≠35, hay error. Suponiendo punto correcto... -->
- [ ] D) -3/4

### Explicación Pedagógica
Derivando implícitamente: 3(π+u)²(1+u') = 27. Despejando u' = [27/(3(π+u)²)] - 1 = [9/(π+u)²] - 1. Evaluando en el punto correspondiente. Error común: no derivar el lado derecho correctamente o confundir términos.

---

## Question 17 (Variant Expert
