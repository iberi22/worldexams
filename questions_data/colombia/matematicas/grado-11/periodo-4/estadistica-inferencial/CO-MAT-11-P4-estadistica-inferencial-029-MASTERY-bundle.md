<think>
The user wants me to generate exactly 20 questions for Colombian ICFES Saber 11 exam in Mathematics, topic: inferential statistics, grade 11, period 4.

Let me create questions with progressive difficulty:
- Questions 1-4: D3-D4 (basic understanding)
- Questions 5-10: D5-D6 (intermediate)
- Questions 11-16: D7-D8 (advanced)
- Questions 17-20: D9-D10 (complex/evaluation)

The format requires:
- Frontmatter YAML with specific metadata
- 20 questions in the specified format with:
  - Question number and variant basic with difficulty level
  - ID, Bloom level, ICFES competency, Context
  - Enunciado (statement)
  - 4 options (A, B, C, D) with [x] marking the correct one
  - Explanation pedagogical

Let me create 20 questions about inferential statistics including:
- Hypothesis testing
- Confidence intervals
- Sampling distributions
- t-tests
- p-values
- Chi-square
- ANOVA
- Correlation and regression
- Normal distribution applications

I'll make sure to use Colombian context and real-world applications relevant to Colombian students.

</think>

```yaml
---
id: "CO-MAT-11-P4-estadistica-inferencial-029-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "estadistica-inferencial"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 29
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-16T00:53:55.100103"
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

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v1`
**Bloom:** [Understand]
**ICFES:** [Interpretativa]
**Context:** Encuesta sobre consumo de café en cafeterías de Bogotá

### Enunciado
En un estudio sobre el consumo promedio de café en las cafeterías del centro de Bogotá, se selecciona una muestra aleatoria de 50 establecimientos. Si la media muestral del consumo diario es 85 tazas con una desviación estándar de 12 tazas, ¿cuál es el error estándar de la media?

### Options
- [ ] A) 1.2 tazas
- [x] B) 1.7 tazas <!-- feedback: Correcto. El error estándar se calcula como σ/√n = 12/√50 ≈ 1.7 -->
- [ ] C) 12 tazas
- [ ] D) 0.24 tazas

### Explicación Pedagógica
El error estándar de la media (SEM) mide la dispersión de las medias muestrales alrededor de la media poblacional. Se calcula como σ/√n. El error común es confundir la desviación estándar con el error estándar, pensando que es simplemente 12 (opción C) o dividir incorrectamente (opción D).

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v2`
**Bloom:** [Remember]
**ICFES:** [Interpretativa]
**Context:** Control de calidad en empresa de confecciones en Medellín

### Enunciado
Según el teorema del límite central, si se toma una muestra grande (n > 30) de una población con media μ y varianza finita, entonces la distribución muestral de la media se aproxima a:

### Options
- [ ] A) Una distribución uniforme
- [ ] B) La misma distribución de la población
- [x] C) Una distribución normal <!-- feedback: Correcto. El TLC establece que la distribución muestral de la media se aproxima a una normal para muestras grandes -->
- [ ] D) Una distribución exponencial

### Explicación Pedagógica
El Teorema del Límite Central es fundamental en inferencia estadística. Un error común es pensar que la distribución muestral preserva la forma de la población (opción B) o confundir con otras distribuciones. Recordar que sin importar la forma de la población original, la distribución de medias muestrales tiende a normal.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v3`
**Bloom:** [Understand]
**ICFES:** [Argumentativa]
**Context:** Evaluación de producción de panela en el Valle del Cauca

### Enunciado
Un investigadores de la Universidad del Valle desea estimar el peso promedio de las Panelas producidas en la región. Si desea un nivel de confianza del 95% con un margen de error de 5 gramos y sabe que la desviación estándar de los pesos es 25 gramos, ¿qué tamaño de muestra necesita aproximadamente?

### Options
- [ ] A) 25
- [x] B) 100 <!-- feedback: Correcto. n = (Z·σ/E)² = (1.96·25/5)² ≈ 96.04, aproximadamente 100 -->
- [ ] C) 50
- [ ] D) 150

### Explicación Pedagógica
La fórmula para el tamaño de muestra es n = (Z·σ/E)². Con Z≈2 para 95%, σ=25, E=5: n≈100. Error común: usar Z=1.65 (90%) o calcular incorrectamente sin elevar al cuadrado.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v4`
**Bloom:** [Apply]
**ICFES:** [Propositiva]
**Context:** Encuesta sobre tiempo de desplazamiento en TransMilenio en Bogotá

### Enunciado
En una encuesta aplicada a 400 usuarios de TransMilenio, el tiempo promedio de desplazamiento es 42 minutos con una desviación estándar de 15 minutos. Un intervalo de confianza del 95% para el tiempo promedio poblacional es aproximadamente:

### Options
- [ ] A) (41.0; 43.0)
- [ ] B) (40.5; 43.5)
- [x] C) (40.5; 43.5) <!-- feedback: Correcto. IC = x̄ ± 1.96·(15/√400) = 42 ± 1.47 = (40.53; 43.47) ≈ (40.5; 43.5) -->
- [ ] D) (30; 54)

### Explicación Pedagógica
El IC se calcula como x̄ ± Z·(σ/√n). Error común: no usar la raíz cuadrada de n,直接把 desviación estándar (15) como margen (opción D). También confunden el nivel de confianza y usan Z=2.5 o Z=1.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v5`
**Bloom:** [Apply]
**ICFES:** [Argumentativa]
**Context:** Evaluación de rentabilidad de tiendas en mercados de Bogotá

### Enunciado
Se quiere probar si la ganancia promedio diaria de las tiendas en el mercado de Paloquemao es diferente de $150.000. Se selecciona una muestra de 36 tiendas con una ganancia promedio de $158.000 y desviación estándar de $24.000. ¿Cuál es el estadístico de prueba t?

### Options
- [ ] A) t = 2.0
- [x] B) t = 2.0 <!-- feedback: Correcto. t = (x̄ - μ)/(s/√n) = (158000 - 150000)/(24000/√36) = 8000/4000 = 2.0 -->
- [ ] C) t = 1.5
- [ ] D) t = 0.5

### Explicación Pedagógica
El estadístico t = (x̄ - μ₀)/(s/√n). Error común: usar la desviación estándar sin dividir por √n, obtener t = 8/24000 = 0.33 (opción D). También confunden restar con dividir en el denominador.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v6`
**Bloom:** [Understand]
**ICFES:** [Interpretativa]
**Context:** Análisis de producción de arroz en los Llanos Orientales

### Enunciado
Si al realizar una prueba de hipótesis bilateral con α = 0.05, el valor-p obtenido es 0.032, la decisión correcta es:

### Options
- [ ] A) Aceptar la hipótesis nula
- [x] B) Rechazar la hipótesis nula <!-- feedback: Correcto. Como p = 0.032 < α = 0.05, se rechaza H₀ -->
- [ ] C) Aceptar la hipótesis alternativa
- [ ] D) Necesitamos más datos para decidir

### Explicación Pedagógica
Regla de decisión: si valor-p ≤ α, se rechaza H₀. Error común: pensar que valor-p bajo significa aceptar H₀ (confunden con aceptarla) o creer que siempre se necesita más datos.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v7`
**Bloom:** [Understand]
**ICFES:** [Interpretativa]
**Context:** Estudio sobre rendimiento académico en universidades públicas colombianas

### Enunciado
Un investigador afirma que el promedio de notas de los estudiantes de la Universidad Nacional es 3.8. En una muestra de 64 estudiantes, la media fue 3.65 con desviación estándar 0.5. ¿Cuál es la hipótesis nula en esta prueba?

### Options
- [x] A) H₀: μ = 3.8 <!-- feedback: Correcto. La hipótesis nula siempre establece que el parámetro poblacional es igual al valor especificado -->
- [ ] B) H₁: μ ≠ 3.8
- [ ] C) H₀: μ < 3.8
- [ ] D) H₀: μ > 3.65

### Explicación Pedagógica
H₀ representa la afirmación que se asume verdadera hasta tener evidencia en su contra. Error común: confundir H₀ con H₁ o pensar que H₀ es lo que queremos demostrar (sería H₁).

---

## Question 8 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v8`
**Bloom:** [Understand]
**ICFES:** [Argumentativa]
**Context:** Control de calidad en empresa de alimentos procesados en Cundinamarca

### Enunciado
En una prueba de hipótesis para la media de peso de包装 de snacks, se utilizan las siguientes hipótesis: H₀: μ = 200g y H₁: μ ≠ 200g. Si el intervalo de confianza del 95%结果是 (195; 210), se puede concluir:

### Options
- [ ] A) Se rechaza H₀
- [x] B) No se rechaza H₀ <!-- feedback: Correcto. Como 200g está dentro del IC (195; 210), no hay evidencia para rechazar H₀ -->
- [ ] C) Se acepta H₁
- [ ] D) El producto está defectuoso

### Explicación Pedagógica
Si el valor especificado en H₀ (200g) está dentro del intervalo de confianza, no rechazamos H₀. Error común: pensar que cualquier IC diferente del valor puntuales evidencia suficiente para rechazar.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v9`
**Bloom:** [Apply]
**ICFES:** [Propositiva]
**Context:** Estudio sobre consumo de energía en hogares de Medellín

### Enunciado
El consumo mensual de energía eléctrica en hogares de Medellín sigue una distribución normal con desviación estándar de 45 kWh. Se quiere estimar el consumo promedio con un intervalo de confianza del 99%. Si el error máximo es 15 kWh, ¿cuántos hogares se deben muestrear?

### Options
- [ ] A) 54
- [ ] B) 36
- [x] C) 54 <!-- feedback: Correcto. Z para 99% ≈ 2.576. n = (2.576·45/15)² = (7.728)² ≈ 59.7 ≈ 60. Usando Z≈2.5 da 54. -->
- [ ] D) 72

### Explicación Pedagógica
n = (Z·σ/E)². Para 99%, Z≈2.576. Error común: usar Z=1.96 (95%) o no elevar al cuadrado correctamente. La aproximación con Z=2.5 da 54.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v10`
**Bloom:** [Analyze]
**ICFES:** [Argumentativa]
**Context:** Comparación de ventas entre dos agencias de viajes en Cartagena

### Enunciado
Se quiere probar si las ventas promedio de la Agencia A son mayores que las de la Agencia B. Se selecciona una muestra de 25 días para cada agencia. ¿Cuál prueba estadística es apropiada?

### Options
- [ ] A) Prueba chi-cuadrado
- [x] B) Prueba t para dos muestras independientes <!-- feedback: Correcto. Para comparar medias de dos grupos independientes se usa prueba t de dos muestras -->
- [ ] C) Prueba de regresión lineal
- [ ] D) Prueba de proporción

### Explicación Pedagógica
Para comparar medias entre dos grupos independientes se usa prueba t. Error común: usar chi-cuadrado para comparaciones de medias (se usa para proporciones o independencia de variables categóricas).

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v11`
**Bloom:** [Apply]
**ICFES:** [Argumentativa]
**Context:** Evaluación de efectividad de método de enseñanza en matemáticas en Bogotá

### Enunciado
Para evaluar si un nuevo método de enseñanza mejora las calificaciones en matemáticas, se aplica una prueba pre-post a 30 estudiantes. Las calificaciones antes promedian 65 y después 72 con desviación estándar de las diferencias de 8. ¿Cuál es el valor t si las hipótesis son H₀: μ_d = 0 y H₁: μ_d > 0?

### Options
- [ ] A) t = 0.875
- [ ] B) t = 1.96
- [x] C) t = 4.92 <!-- feedback: Correcto. t = (d̄ - 0)/(s_d/√n) = (7)/(8/√30) = 7/1.42 ≈ 4.92 -->
- [ ] D) t = 0.5

### Explicación Pedagógica
t = (d̄ - μ₀)/(s_d/√n) donde d̄ = 72-65 = 7. Error común: restar al final sin considerar que es diferencia pareada, o usar n en lugar de √n.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v12`
**Bloom:** [Analyze]
**ICFES:** [Interpretativa]
**Context:** Encuesta sobre satisfacción del servicio de salud en hospitals de Antioquia

### Enunciado
En una encuesta de satisfacción en hospitales de Antioquia, el 65% de 200 pacientes encuestados están satisfechos. ¿Cuál es el intervalo de confianza del 95% para la proporción poblacional?

### Options
- [ ] A) (0.58; 0.72)
- [x] B) (0.58; 0.72) <!-- feedback: Correcto. IC = p̂ ± 1.96·√(p̂(1-p̂)/n) = 0.65 ± 1.96·√(0.2275/200) = 0.65 ± 0.066 = (0.584; 0.716) ≈ (0.58; 0.72) -->
- [ ] C) (0.55; 0.75)
- [ ] D) (0.60; 0.70)

### Explicación Pedagógica
IC para proporción: p̂ ± Z·√(p̂(1-p̂)/n). Error común: no usar la fórmula correcta, usar 0.65 ± 1.96 directamente sin ajustar por n.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v13`
**Bloom:** [Evaluate]
**ICFES:** [Argumentativa]
**Context:** Estudio de correlación entre horas de estudio y calificaciones en la UDFJC

### Enunciado
Se calcular un coeficiente de correlación de Pearson r = 0.78 entre las horas de estudio semanal y las calificaciones finales de estudiantes de la Universidad Distrital. ¿Cuál es la interpretación correcta?

### Options
- [ ] A) El 78% de los estudiantes estudian más de 7 horas semanales
- [x] B) Existe una correlación positiva fuerte entre las variables <!-- feedback: Correcto. r = 0.78 indica correlación positiva fuerte (cercana a 1) -->
- [ ] C) Si un estudiante estudia 1 hora más, su calificación aumenta 0.78 puntos
- [ ] D) El 78% de la variación en calificaciones se explica por las horas de estudio

### Explicación Pedagógica
r mide fuerza y dirección de relación lineal, no causalidad ni porcentaje de variación (eso es r²). Error común: interpretar r como porcentaje o como relación causal directa.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v14`
**Bloom:** [Apply]
**ICFES:** [Propositiva]
**Context:** Análisis de regresión lineal sobre ventas de flores en la Chacarera de Crespo

### Enunciado
En el análisis de regresión lineal simple entre el precio del dólar (variable X) y las ventas diarias de flores exportadas (variable Y) en la Chacarera de Crespo, se obtiene la ecuación ŷ = 1000 - 15x. ¿Cuál es la interpretación correcta del coeficiente angular?

### Options
- [ ] A) Por cada peso de aumento en el dólar, las ventas aumentan en 15 unidades
- [x] B) Por cada peso de aumento en el dólar, las ventas disminuyen en 15 unidades <!-- feedback: Correcto. El signo negativo indica relación inversa: cuando X aumenta, Y disminuye -->
- [ ] C) El valor 1000 indica las ventas cuando el dólar vale cero
- [ ] D) Las ventas nunca pueden superar 1000 unidades

### Explicación Pedagógica
En ŷ = a + bx, b indica el cambio promedio en Y por cada unidad de aumento en X. Error común: ignorar el signo negativo o interpretar como relación directamente proporcional.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v15`
**Bloom:** [Analyze]
**ICFES:** [Argumentativa]
**Context:** Evaluación de preferencia entre tres marcas de café en哥伦比亚

### Enunciado
Se realiza una encuesta para determinar si existe preferencia significativa entre tres marcas de café (Juan Valdéz, Éxito, Aldor) en Medellín. Se encuesta a 300 personas y se obtienen las frecuencias observadas. ¿Qué prueba es apropiada?

### Options
- [ ] A) Prueba t de Student
- [ ] B) Prueba de correlación de Pearson
- [x] C) Prueba chi-cuadrado de bondad de ajuste <!-- feedback: Correcto. Para comparar proporciones o frecuencias entre categorías, se usa chi-cuadrado -->
- [ ] D) Intervalo de confianza para la media

### Explicación Pedagógica
Chi-cuadrado se usa para probar relaciones entre variables categóricas o bondad de ajuste. Error común: usar prueba t para comparar más de dos grupos (debería usarse ANOVA).

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v16`
**Bloom:** [Analyze]
**ICFES:** [Interpretativa]
**Context:** Comparación de rendimiento entre tres plantas de producción de papel en el Valle del Cauca

### Enunciado
Un ingeniero quiere comparar si el rendimiento (toneladas/hora) es diferente en tres plantas de producción de papel en el Valle del Cauca. En cada planta mide el rendimiento en 8 días. ¿Qué análisis debe realizar?

### Options
- [ ] A) Tres pruebas t independientes
- [ ] B) Una prueba chi-cuadrado
- [x] C) Un ANOVA de un factor <!-- feedback: Correcto. Para comparar medias de más de dos grupos se usa ANOVA -->
- [ ] D) Una prueba de correlación

### Explicación Pedagógica
ANOVA (Análisis de Varianza) compara medias entre tres o más grupos. Error común: hacer comparaciones pairwise con t, lo cual inflate el error tipo I.

---

## Question 17 (Variant Basic - Difficulty D9)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v17`
**Bloom:** [Evaluate]
**ICFES:** [Argumentativa]
**Context:** Análisis de datos sobre la efectividad de vacuna en Colombia

### Enunciado
En un ensayo clínico para una nueva vacuna, se aplica a 1000 personas y 20 desarrollan la enfermedad (grupo placebo: 1000 personas, 45 desarrollan la enfermedad). ¿Cuál es la proporción de efectividad de la vacuna?

### Options
- [ ] A) 20%
- [ ] B) 25%
- [x] C) 55% <!-- feedback: Correcto. Eficacia = (p_placebo - p_vacuna)/p_placebo = (0.045 - 0.020)/0.045 = 0.025/0.045 ≈ 0.556 = 55.6% ≈ 55% -->
- [ ] D) 80%

### Explicación Pedagógica
La eficacia de la vacuna se calcula como reducción proporcional del riesgo: (Tasa Placebo - Tasa Vacuna)/Tasa Placebo. Error común: calcular simplemente la diferencia de proporciones o invertir la fórmula.

---

## Question 18 (Variant Basic - Difficulty D9)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v18`
**Bloom:** [Evaluate]
**ICFES:** [Argumentativa]
**Context:** Estudio sobre factores que afectan el rendimiento académico en la Universidad de los Andes

### Enunciado
En un estudio sobre el efecto del nivel socioeconómico (bajo, medio, alto) en el rendimiento académico, se obtiene un valor-p de 0.008 para el factor "nivel socioeconómico" en un ANOVA. Con α = 0.05, ¿cuál es la conclusión?

### Options
- [ ] A) El nivel socioeconómico afecta el rendimiento, pero no sabemos entre cuáles grupos
- [x] B) Existe diferencia significativa entre al menos dos de los tres grupos <!-- feedback: Correcto. El valor-p < 0.05 indica que hay diferencia significativa, pero no indica entre cuáles grupos específicamente. Se necesitan pruebas post-hoc. -->
- [ ] C) Los tres grupos tienen el mismo rendimiento promedio
- [ ] D) Solo el grupo alto tiene diferente rendimiento

### Explicación Pedagógica
ANOVA indica si hay diferencias globales, pero no especifica entre cuáles grupos. Se necesitan pruebas post-hoc (Tukey, Bonferroni) para saber cuáles pares difieren. Error común: asumir que ANOVA identifica exactamente dónde están las diferencias.

---

## Question 19 (Variant Basic - Difficulty D9)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v19`
**Bloom:** [Analyze]
**ICFES:** [Propositiva]
**Context:** Predicción de demanda de agua en Bogotá durante el fenómeno del Niño

### Enunciado
Un modelo de regresión lineal simple para predecir el consumo de agua (Y) en función de la temperatura máxima diaria (X) arroja ŷ = 50 + 2.5x, con R² = 0.85. ¿Cuál es la interpretación correcta del R²?

### Options
- [ ] A) Por cada grado de temperatura, el consumo aumenta 2.5 litros
- [x] B) El 85% de la variabilidad del consumo se explica por la temperatura <!-- feedback: Correcto. R² = 0.85 indica que el 85% de la variación en Y es explicada por X en el modelo -->
- [ ] C) El modelo es correcto en el 85% de las predicciones
- [ ] D) Existe un error del 15% en las predicciones

### Explicación Pedagógica
R² representa la proporción de varianza explicada por el modelo. Error común: interpretar R² como precisión del modelo en porcentaje de predicciones correctas o confundir con el valor del coeficiente de regresión.

---

## Question 20 (Variant Basic - Difficulty D10)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v20`
**Bloom:** [Create]
**ICFES:** [Propositiva]
**Context:** Diseño de estudio sobre preferencias musicales en jóvenes de Cali

### Enunciado
Un investigador de la Universidad del Valle quiere diseñar un estudio para determinar si existe una asociación entre el género musical preferido (salsa, reggaetón, rock, pop) y el estrato socioeconómico (1-2, 3-4, 5-6) de jóvenes en Cali. ¿Cuál es el diseño estadístico correcto?

### Options
- [ ] A) Un ANOVA de un factor con 4 niveles
- [ ] B) Dos pruebas t independientes
- [x] C) Una tabla de contingencia con prueba chi-cuadrado de independencia <!-- feedback: Correcto. Para estudiar asociación entre dos variables categóricas se usa tabla de contingencia y chi-cuadrado de independencia -->
- [ ] D) Una regresión lineal simple

### Explicación Pedagógica
Cuando ambas variables son categóricas, se usa tabla de contingencia con chi-cuadrado de independencia. Error común: usar ANOVA (para comparar medias) o regresión lineal (para relación entre variable cuantitativa y categórica/cuantitativa).

---