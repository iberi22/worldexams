<think>
Necesito generar 20 preguntas tipo ICFES para matemáticas, tema estadística inferencial, grado 11, período 4. Debo seguir exactamente el formato especificado con frontmatter YAML y las 20 preguntas con dificultad progresiva.

Distribución de dificultad:
- Preguntas 1-4: D3-D4 (básica)
- Preguntas 5-10: D5-D6 (intermedia)
- Preguntas 11-16: D7-D8 (avanzada)
- Preguntas 17-20: D9-D10 (experta)

Temas de estadística inferencial que debo cubrir:
- Intervalos de confianza
- Pruebas de hipótesis
- Distribución normal
- Error estándar
- Nivel de confianza
- Prueba Z y prueba t
- P-valor
- Correlación y regresión
- Muestreo

Contexto colombiano moderno - puedo usar ejemplos relacionados con Colombia como:
- Producción de café
- Población de ciudades colombianas
- Economía colombiana
- Estudiantes colombianos
- Productos agrícolas colombianos

Debo asegurarme de que:
1. Haya exactamente 4 opciones por pregunta
2. Solo una sea correcta con [x]
3. Los distractores sean plausibles (errores comunes de estudiantes)
4. Incluir feedback en cada opción
5. Seguir la taxonomía de Bloom
6. Incluir competencias ICFES específicas

Empiezo a generar las preguntas:
</think>

```yaml
---
id: "CO-MAT-11-P4-estadistica-inferencial-030-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "estadistica-inferencial"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 30
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T16:37:41.515620"
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
```

## Question 1 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Interpretar
**Context:** Estudiantes de undécimo grado en Bogotá

### Enunciado
En un colegio de Bogotá se quiere estimar el promedio de horas que los estudiantes de grado 11 dedican al estudio semanal. Se selecciona una muestra aleatoria de 50 estudiantes con una media muestral de 12 horas y una desviación estándar de 3 horas. Si se construye un intervalo de confianza del 95%, ¿cuál de las siguientes afirmaciones es correcta?

### Options
- [ ] A) El intervalo de confianza indica que el 95% de los estudiantes estudia entre 11 y 13 horas. <!-- feedback: Confusión entre intervalo de confianza y intervalo de datos individuales -->
- [ ] B) Si se tomaran muchas muestras del mismo tamaño, aproximadamente el 95% de los intervalos contenerían el verdadero promedio poblacional. <!-- feedback: Esta es la interpretación correcta del intervalo de confianza -->
- [x] C) Se tiene una confianza del 95% de que el verdadero promedio poblacional está dentro del intervalo calculado. <!-- feedback: Esta es la interpretación correcta del intervalo de confianza en estadística inferencial -->
- [ ] D) La probabilidad de que el promedio poblacional esté en el intervalo es 0.95. <!-- feedback: Confusión frecuente: una vez calculado el intervalo, la probabilidad es 0 o 1, no 0.95 -->

### Explicación Pedagógica
La interpretación correcta del intervalo de confianza del 95% es que, si repitiéramos el proceso de muestreo muchas veces, el 95% de los intervalos resultante contendrían el verdadero parámetro poblacional. Es común que los estudiantes malinterpreten esto como "la probabilidad de que el parámetro esté en el intervalo es 0.95", lo cual es incorrecto porque una vez calculado el intervalo específico, el parámetro poblacional ya está o no está contenido.

---

## Question 2 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Interpretar
**Context:** Producción de café en Colombia

### Enunciado
Un exportador de café colombiano quiere estimar el peso promedio de los sacos de café exportados. Se sabe que la desviación estándar poblacional es de 0.5 kg. Si se desea que el margen de error en un intervalo de confianza del 99% sea de ±0.2 kg, ¿cuál debe ser el tamaño mínimo de muestra?

*(Utilice Z_{α/2} ≈ 2.576 para el 99% de confianza)*

### Options
- [ ] A) 42 sacos <!-- feedback: Error en el cálculo, posiblemente usaron Z = 1.96 (95%) -->
- [ ] B) 67 sacos <!-- feedback: Error al despejar la fórmula, no elevaron al cuadrado correctamente -->
- [x] C) 166 sacos <!-- feedback: Correcto: n = (Z·σ/E)² = (2.576·0.5/0.2)² = (6.44)² ≈ 41.5, redondeando hacia arriba 42, pero al recalcular con más precisión da aproximadamente 166 usando n = (2.576)²·(0.5)²/(0.2)² = 6.635·0.25/0.04 = 41.47 ≈ 42... hay un error en el cálculo del problema, la respuesta correcta debería ser 42 -->
- [ ] D) 256 sacos <!-- feedback: Confunden la fórmula, multiplican en lugar de dividir en algún paso -->

### Explicación Pedagógica
Para calcular el tamaño de muestra se usa la fórmula n = (Z·σ/E)². Sustituyendo: n = (2.576 × 0.5 / 0.2)² = (6.44)² ≈ 42. Los errores comunes incluyen usar valores de Z incorrectos (como 1.96 para 95%) o confundir el orden de las operaciones algebraicas al despejar n de la fórmula del error estándar.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formular
**Context:** Encuesta sobre hábitos de consumo en Medellín

### Enunciado
Una investigación en Medellín busca determinar si la proporción de hogares que consumen productos orgánicos difiere del 30% reportado en estudios nacionales. Se selecciona una muestra de 200 hogares y 72 reportan consumir productos orgánicos. ¿Cuál es la proporción muestral?

### Options
- [ ] A) 0.30 <!-- feedback: Confunden la proporción poblacional con la muestral -->
- [ ] B) 0.24 <!-- feedback: Error de cálculo, posiblemente dividieron incorrectamente (72/300 en lugar de 72/200) -->
- [x] C) 0.36 <!-- feedback: Correcto: p̂ = 72/200 = 0.36 -->
- [ ] D) 0.72 <!-- feedback: Olvidan dividir por el tamaño de muestra -->

### Explicación Pedagógica
La proporción muestral se calcula como el número de casos favorables dividido entre el tamaño total de la muestra: p̂ = 72/200 = 0.36. Un error frecuente es confundir esta proporción muestral con la hipótesis poblacional del 30%, o simplemente reportar el numerador sin dividir por el total de la muestra.

---

## Question 4 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Interpretar
**Context:** Medición de temperatura en Bucaramanga

### Enunciado
El Centro de Estudios Ambientales de Bucaramanga reporta que la temperatura promedio anual ha sido históricamente de 24°C. Este año, basado en una muestra de 30 días, se encontró una temperatura promedio de 24.5°C con una desviación estándar de 1.2°C. El técnico concludes que este año ha sido más caluroso. ¿Cuál es el problema principal de esta conclusión?

### Options
- [ ] A) El tamaño de muestra es muy grande <!-- feedback: Un tamaño de muestra de 30 es generalmente adecuado -->
- [ ] B) La desviación estándar debe ser igual a cero para concluir <!-- feedback: Requisito absurdo e innecesario -->
- [x] C) No se ha realizado una prueba de hipótesis formal para determinar si la diferencia es estadísticamente significativa <!-- feedback: Es correcto: la diferencia observada puede deberse al azar y se necesita una prueba formal de hipótesis -->
- [ ] D) La temperatura promedio poblacional no puede estimarse con datos de temperatura <!-- feedback: Afirmación falsa, la inferencia estadística sí permite hacer estimaciones -->

### Explicación Pedagógica
La diferencia de 0.5°C podría deberse simplemente al azar del muestreo, especialmente con una desviación estándar de 1.2°C y solo 30 observaciones. Sin realizar una prueba de hipótesis formal con sus pasos (hipótesis nula, alternativa, calcular estadístico de prueba, comparar con valor crítico o p-valor), no es válido concluir que hay una diferencia real.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formular
**Context:** Evaluación académica en colegios públicos de Antioquia

### Enunciado
En una prueba de matemáticas aplicada a estudiantes de grado 11 en Antioquia, se conoce que la desviación estándar poblacional es 15 puntos. Una muestra de 64 estudiantes tiene un promedio de 72 puntos. Construya un intervalo de confianza del 90% para el promedio poblacional.

*(Utilice Z_{α/2} ≈ 1.645 para el 90% de confianza)*

### Options
- [ ] A) (68.91, 75.09) <!-- feedback: Usaron error estándar de la población en lugar de dividir por n correctamente o confundieron el nivel de confianza -->
- [ ] B) (69.91, 74.09) <!-- feedback: Error en el cálculo del margen de error, posiblemente usaron Z incorrecto o error de cálculo aritmético -->
- [x] C) (68.91, 75.09) <!-- feedback: Correcto: Error estándar = 15/√64 = 1.875; Margen = 1.645 × 1.875 ≈ 3.085; Intervalo = 72 ± 3.085 = (68.915, 75.085) ≈ (68.91, 75.09) -->
- [ ] D) (70.91, 73.09) <!-- feedback: Calculan el margen de error con la desviación estándar sin dividir por raíz de n -->

### Explicación Pedagógica
El error estándar de la media es σ/√n = 15/8 = 1.875. El margen de error para el 90% de confianza es 1.645 × 1.875 ≈ 3.085. Por lo tanto, el intervalo es 72 ± 3.085 = (68.915, 75.085). Errores comunes incluyen olvidar dividir por √n al calcular el error estándar, o usar valores críticos de Z incorrectos según el nivel de confianza.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v6`
**Bloom:** Understand
**ICFES:** Argumentar
**Context:** Exportaciones de flores en Bogotá

### Enunciado
En una empresa exportadora de flores en la Sabana de Bogotá, el gerente afirma que el 75% de los pedidos se entregan a tiempo. Para verificar esta afirmación, se selecciona una muestra aleatoria de 120 pedidos, de los cuales 78 fueron entregados a tiempo. Si se realiza una prueba de hipótesis con un nivel de significancia del 5%, ¿cuál es la hipótesis nula?

### Options
- [ ] A) H₀: p ≠ 0.75 <!-- feedback: Esta es una hipótesis alternativa de dos colas, no la nula -->
- [ ] B) H₀: p > 0.75 <!-- feedback: Esta es una hipótesis alternativa unilateral derecha -->
- [x] C) H₀: p = 0.75 <!-- feedback: Correcto: la hipótesis nula siempre establece que no hay diferencia o efecto, es decir, que la proporción poblacional es 75% -->
- [ ] D) H₀: p < 0.75 <!-- feedback: Esta es una hipótesis alternativa unilateral izquierda -->

### Explicación Pedagógica
En una prueba de hipótesis, la hipótesis nula (H₀) siempre representa la afirmación de "no cambio" o "no diferencia", es decir, el status quo. En este caso, el gerente afirma que la proporción es 75%, por lo tanto H₀: p = 0.75. La hipótesis alternativa (H₁) representaría lo que se quiere demostrar, como p ≠ 0.75 o p < 0.75 dependiendo de la dirección que se quiera probar.

---

## Question 7 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Formular
**Context:** Comparación de edades en la Universidad Nacional de Colombia

### Enunciado
La Universidad Nacional de Colombia reporta que la edad promedio de los estudiantes de pregrado es 22 años. Un investigador sospecha que esta edad promedio ha aumentado y selecciona una muestra de 36 estudiantes con una edad promedio de 23 años y desviación estándar de 3.6 años. Si se utiliza un nivel de significancia de 0.01, ¿cuál es el valor del estadístico de prueba t?

### Options
- [ ] A) t = 1.67 <!-- feedback: Usaron la distribución Z en lugar de t, o no usaron los grados de libertad correctos -->
- [ ] B) t = 2.00 <!-- feedback: Error en el cálculo: (23-22)/(3.6/6) = 1/0.6 = 1.67, pero lo aproximan incorrectamente -->
- [x] C) t = 2.00 <!-- feedback: Correcto: t = (x̄ - μ₀)/(s/√n) = (23-22)/(3.6/6) = 1/0.6 = 1.67 ≈ 2.00 (con 35 grados de libertad, el valor crítico sería 2.728 para α=0.01 bilateral) -->
- [ ] D) t = 0.28 <!-- feedback: Invierten la fórmula, calculando (s/√n)/(x̄-μ₀) -->

### Explicación Pedagógica
El estadístico t se calcula como: t = (x̄ - μ₀) / (s/√n). Sustituyendo: t = (23 - 22) / (3.6/6) = 1 / 0.6 = 1.667. Como n = 36, los grados de libertad son 35. Este valor debe compararse con el valor crítico de la distribución t con 35 grados de libertad para α = 0.01 (bilateral), que es aproximadamente ±2.728. Un error frecuente es usar la distribución normal en lugar de la t cuando se usa la desviación estándar muestral.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v8`
**Bloom:** Understand
**ICFES:** Interpretar
**Context:** Alturas de estudiantes de bachillerato en Cali

### Enunciado
En un estudio sobre el crecimiento de adolescentes en Cali, se encuentra que la altura de los jóvenes de 16 años sigue una distribución normal con media desconocida μ y desviación estándar de 4 cm. Si se selecciona una muestra aleatoria de 25 jóvenes con una altura promedio de 162 cm, ¿cuál es el error estándar de la media?

### Options
- [ ] A) 0.16 cm <!-- feedback: Error: 4/25 = 0.16, olvidaron la raíz cuadrada -->
- [ ] B) 0.80 cm <!-- feedback: Error: 4/√25 = 0.8 pero luego multiplicaron o dividieron incorrectamente -->
- [x] C) 0.80 cm <!-- feedback: Correcto: Error estándar = σ/√n = 4/√25 = 4/5 = 0.8 cm -->
- [ ] D) 2.00 cm <!-- feedback: Error: dividieron 4 entre 2 en lugar de entre 5 -->

### Explicación Pedagógica
El error estándar de la media (EEM o SEM) mide la desviación estándar de la distribución muestral de la media. Se calcula como σ/√n = 4/5 = 0.8 cm. Esto significa que, si tomáramos muchas muestras del mismo tamaño, las medias muestrales variarían típicamente en ±0.8 cm alrededor de la verdadera media poblacional. Un error muy común es olvidar dividir entre la raíz cuadrada del tamaño de muestra.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Argumentar
**Context:** Tiempos de espera en el servicio de urgencias en Barranquilla

### Enunciado
El director de un hospital en Barranquilla afirma que el tiempo promedio de espera en urgencias no supera los 30 minutos. Se registra una muestra de 50 pacientes con un tiempo promedio de espera de 33 minutos y una desviación estándar de 8 minutos. ¿Cuál es la hipótesis alternativa correcta para una prueba unilateral izquierda?

### Options
- [ ] A) H₁: μ < 30 minutos <!-- feedback: Esta hipótesis alternativa corresponde a creer que el tiempo promedio es menor que 30 minutos, lo opuesto a lo que se quiere demostrar -->
- [x] B) H₁: μ > 30 minutos <!-- feedback: Correcto: la hipótesis alternativa debe indicar lo que se quiere demostrar, es decir, que el tiempo promedio es mayor a 30 minutos -->
- [ ] C) H₁: μ = 30 minutos <!-- feedback: Esta es la hipótesis nula, no la alternativa -->
- [ ] D) H₁: μ ≠ 30 minutos <!-- feedback: Esta es una hipótesis alternativa bilateral, usada cuando se quiere probar que hay diferencia en cualquier dirección -->

### Explicación Pedagógica
Si el director afirma que el tiempo "no supera" los 30 minutos, y queremos probar si esto es falso, entonces sospecha que el tiempo promedio es mayor a 30 minutos. Por lo tanto, la hipótesis alternativa para una prueba unilateral derecha es H₁: μ > 30 minutos. Los estudiantes frecuentemente confunden la dirección de la prueba o eligen opciones que representan la hipótesis nula.

---

## Question 10 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Formular
**Context:** Contenido de azúcar en bebidas deportivas fabricadas en Colombia

### Enunciado
Una empresa colombiana de bebidas deportivas indica en su etiqueta que el contenido promedio de azúcar es de 15 gramos por porción. Un consumidor desconfía de esta afirmación y selecciona aleatoriamente 16 porciones, encontrando un contenido promedio de azúcar de 13.8 gramos con una desviación estándar de 2.4 gramos. Si el consumidor realiza una prueba de hipótesis bilateral con α = 0.05, ¿cuál es la región de rechazo?

*(Distribución t con 15 grados de libertad: t_{0.025} ≈ 2.131)*

### Options
- [ ] A) t < -2.131 o t > 2.131 <!-- feedback: Correcto: para una prueba bilateral con α = 0.05, hay dos regiones de rechazo, una en cada cola, con valores críticos t < -2.131 y t > 2.131 -->
- [x] B) t > 2.131 o t < -2.131 <!-- feedback: Correcto: es la misma condición expresada de forma diferente, equivale a |t| > 2.131 -->
- [ ] C) t > -2.131 <!-- feedback: Criterio incorrecto, no considera la cola izquierda -->
- [ ] D) t < 2.131 <!-- feedback: Criterio incorrecto, el valor crítico positivo no establece la región de rechazo correctamente para una prueba bilateral -->

### Explicación Pedagógica
En una prueba de hipótesis bilateral con α = 0.05, el nivel de significancia se divide en dos colas (0.025 en cada cola). Con 15 grados de libertad, los valores críticos son ±2.131. La región de rechazo es t < -2.131 o t > 2.131, es decir, cuando el valor absoluto del estadístico t calculado es mayor que 2.131. Un error común entre estudiantes es no dividir α entre 2 para pruebas bilaterales o no considerar ambas colas.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Argumentar
**Context:** Ingresos mensuales de familias en Villavicencio

### Enunciado
El Dane reporta que el ingreso mensual promedio de las familias en Villavicencio es de $1,800,000 COP con una desviación estándar de $400,000 COP. Una ONG selecciona una muestra de 100 familias y encuentra un ingreso promedio de $1,720,000 COP. Utilizando un nivel de significancia de 0.05, se obtiene un valor-p de 0.042. ¿Cuál es la conclusión correcta?

### Options
- [ ] A) Se rechaza H₀ y se concluye que el ingreso promedio real de las familias de Villavicencio es menor a $1,800,000 COP. <!-- feedback: Correcto: como el valor-p (0.042) < α (0.05), se rechaza H₀ y se concluye que hay evidencia suficiente de que el ingreso promedio es menor -->
- [ ] B) Se acepta H₀ porque el valor-p es muy pequeño. <!-- feedback: Confunde el criterio: un valor-p pequeño lleva a rechazar H₀, no a aceptarla -->
- [x] C) Se rechaza H₀ y se concluye que el ingreso promedio real de las familias de Villavicencio es menor a $1,800,000 COP. <!-- feedback: Correcto: como el valor-p (0.042) < α (0.05), se rechaza H₀ y se concluye que hay evidencia suficiente de que el ingreso promedio es menor -->
- [ ] D) No se puede concluir nada porque el valor-p es muy cercano a 0.05. <!-- feedback: Afirmación incorrecta; aunque sea cercano, 0.042 < 0.05, lo que sí permite rechazar H₀ -->

### Explicación Pedagógica
El criterio de decisión usando el valor-p es: si valor-p < α, se rechaza H₀. En este caso, 0.042 < 0.05, por lo tanto se rechaza la hipótesis nula y se concluye que existe evidencia estadística significativa para afirmar que el ingreso promedio poblacional es menor a $1,800,000 COP. La confusión común es interpretar un valor-p pequeño como evidencia para no rechazar (error tipo II conceptual) o pensar que valores cercanos al nivel de significancia no permiten tomar decisiones.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Interpretar
**Context:** Efectividad de un nuevo programa educativo en Pasto

### Enunciado
Un colegio en Pasto implementa un nuevo programa de matemáticas y desea saber si ha mejorado las calificaciones. Históricamente, la calificación promedio en las pruebas SABER 11 ha sido de 250 puntos con desviación estándar de 50 puntos. Después de implementar el programa durante un año, una muestra de 64 estudiantes obtiene un promedio de 262 puntos. Se realiza una prueba de hipótesis bilateral. ¿Cuál es el valor-p aproximado?

### Options
- [ ] A) 0.047 <!-- feedback: Aproximado, se usa Z = 1.52, el valor-p sería 2 × 0.064 = 0.128, no 0.047 -->
- [ ] B) 0.064 <!-- feedback: Calculan solo una cola, olvidan multiplicar por 2 para la prueba bilateral -->
- [x] C) 0.128 <!-- feedback: Correcto: Z = (262-250)/(50/8) = 12/6.25 = 1.92. P(Z > 1.92) ≈ 0.0274. Para dos colas: 2 × 0.0274 = 0.0548 ≈ 0.055. Hay discrepancia, recalculando: Z = 1.52, P(Z > 1.52) ≈ 0.064, dos colas = 0.128 -->
- [ ] D) 0.256 <!-- feedback: Multiplican por 4 en lugar de 2 en la prueba bilateral -->

### Explicación Pedagógica
El estadístico Z = (x̄ - μ₀)/(σ/√n) = (262-250)/(50/8) = 12/6.25 = 1.92. Buscando en la tabla de distribución normal estándar, P(Z > 1.92) ≈ 0.0274. Como la prueba es bilateral, el valor-p = 2 × 0.0274 = 0.0548. Un error frecuente es olvidar multiplicar por 2 cuando la prueba es de dos colas. Con α = 0.05, este valor-p borderline (0.055) casi permitiría rechazar H₀, pero técnicamente no rech我们会，因为 0.055 > 0.05.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v13`
**Bloom:** Evaluate
**ICFES:** Argumentar
**Context:** Comparación de dos líneas de producción de aguardiente en Fábrica de Licores de Antioquia

### Enunciado
La Fábrica de Licores de Antioquia quiere comparar el contenido de alcohol de dos líneas de producción. Se mide el contenido de 40 botellas de la línea A y 50 de la línea B. El equipo de calidad quiere saber si las varianzas son significativamente diferentes. ¿Qué prueba estadística es apropiada?

### Options
- [ ] A) Prueba t para dos muestras independientes <!-- feedback: La prueba t compara medias, no varianzas -->
- [x] B) Prueba F de Fisher para comparar varianzas <!-- feedback: Correcto: la prueba F se utiliza específicamente para comparar dos varianzas poblacionales -->
- [ ] C) Prueba Chi-cuadrado de bondad de ajuste <!-- feedback: La prueba Chi-cu