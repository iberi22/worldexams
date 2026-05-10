<think>
Voy a generar 20 preguntas tipo ICFES para matemáticas, tema estadística inferencial, grado 11, período 4.

Debo seguir las reglas:
1. Dificultad progresiva: D3-D4 (1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
2. Distractores plausibles basados en errores reales de estudiantes colombianos
3. Alineación con estilo ICFES Saber 11
4. Contexto colombiano moderno
5. 4 opciones obligatorias con [x] en la correcta
6. Sin "todas las anteriores" o "ninguna de las anteriores"

Estadística inferencial en grado 11 incluye:
- Pruebas de hipótesis
- Intervalos de confianza
- Distribuciones de muestreo
- Error estándar
- Nivel de significancia
- Tipos de errores (Tipo I y II)
- Correlación y regresión lineal
- Pruebas de chi-cuadrado
- Distribuciones de probabilidad

Voy a crear preguntas con contexto colombiano moderno.
</think>

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
  timestamp: "2026-04-16T00:55:27.703620"
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

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v1`
**Bloom:** [Remember]
**ICFES:** [Identificación de conceptos básicos de estadística inferencial]
**Context:** Encuesta de satisfacción ciudadana en Bogotá

### Enunciado
En un estudio sobre la satisfacción de los ciudadanos bogotanos con el servicio de TransMilenio, se selecciona una muestra aleatoria de 500 personas de los 2 millones de usuarios diarios. El promedio de satisfacción obtenido en la muestra es 7.2 sobre 10. ¿Cuál de las siguientes afirmaciones es correcta respecto a este resultado?

### Options
- [ ] A) El valor 7.2 es un parámetro porque se calculó a partir de toda la población
- [ ] B) El valor 7.2 es una estimación puntual del promedio de satisfacción de todos los usuarios
- [x] C) El valor 7.2 es un estadístico porque se calculó a partir de una muestra <!-- feedback: Se denomina estadístico cuando se calcula a partir de una muestra, mientras que parámetro es cuando se usa toda la población -->
- [ ] D) El valor 7.2 es un dato cualitativo porque representa una escala de satisfacción

### Explicación Pedagógica
La estadística inferencial permite hacer conclusiones sobre una población a partir de muestras. Cuando se calcula una medida (como el promedio) usando solo una parte de la población (muestra), este valor se denomina **estadístico**. Si se usara toda la población, se llamaría **parámetro**. El error común es confundir estos términos o creer que siempre se trabaja con toda la población.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v2`
**Bloom:** [Understand]
**ICFES:** [Comprensión del concepto de distribuciones de muestreo]
**Context:** Producción de café en Colombia

### Enunciado
Una cooperativa de caficultores en Huila quiere estimar el peso promedio de los granos de café en sus lotes. Si se toman múltiples muestras de 50 granos cada una y se calcula el peso promedio de cada muestra, ¿qué comportamiento se espera en la distribución de estos promedios según el Teorema del Límite Central?

### Options
- [ ] A) Los promedios tendrán una distribución uniforme con forma rectangular
- [x] B) Los promedios se distribuirán aproximadamente de forma normal, sin importar la distribución original <!-- feedback: El Teorema del Límite Central establece que la distribución muestral de las medias se aproxima a una normal cuando el tamaño de muestra es suficientemente grande (n≥30) -->
- [ ] C) Los promedios tendrán exactamente la misma distribución que los pesos individuales de los granos
- [ ] D) Los promedios tenderán a ser todos iguales debido a la homogeneidad del café

### Explicación Pedagógica
El Teorema del Límite Central es fundamental en estadística inferencial. Aunque los pesos individuales de los granos podrían tener cualquier distribución, la distribución de las medias muestrales se aproxima a una normal conforme aumenta el tamaño de muestra. Esto permite hacer inferencias aunque no conozcamos la distribución original de la población.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v3`
**Bloom:** [Apply]
**ICFES:** [Aplicación del concepto de error estándar]
**Context:** Ventas en tiendas de comercio electrónico en Medellín

### Enunciado
Una plataforma de comercio electrónico en Medellín registra que el ingreso promedio por transacción es de $85,000 con una desviación estándar de $15,000. Si se toma una muestra de 100 transacciones, ¿cuál es el error estándar de la media?

### Options
- [ ] A) $150,000
- [x] B) $1,500 <!-- feedback: El error estándar se calcula como σ/√n = 15000/√100 = 15000/10 = 1500 -->
- [ ] C) $85,000
- [ ] D) $15,000

### Explicación Pedagógica
El error estándar (EE) mide la dispersión de las medias muestrales y se calcula dividiendo la desviación estándar poblacional (σ) entre la raíz cuadrada del tamaño de muestra (n). Un error estándar más pequeño indica mayor precisión en la estimación. El error común es olvidar la raíz cuadrada o dividir incorrectamente.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v4`
**Bloom:** [Understand]
**ICFES:** [Comprensión de niveles de confianza]
**Context:** Encuesta electoral en elecciones departamentales

### Enunciado
Una firma encuestas afirma con un nivel de confianza del 95% que un candidato gubernativo en Antioquia tiene entre 52% y 58% de intención de voto. ¿Cuál es la interpretación correcta de este intervalo?

### Options
- [ ] A) Exactamente el 95% de todos los votantes de Antioquia apoyan al candidato
- [ ] B) Si se repitiera muchas veces la encuesta con muestras similares, en el 95% de los casos el verdadero porcentaje estaría en ese rango
- [x] C) Hay una probabilidad del 95% de que el porcentaje real de apoyo esté entre 52% y 58% <!-- feedback: En el enfoque frecuentista clásico, si replicamos el muestreo infinitamente, aproximadamente el 95% de los intervalos contendrían el verdadero parámetro poblacional -->
- [ ] D) El candidato tiene una probabilidad de 0.95 de ganar las elecciones

### Explicación Pedagógica
El intervalo de confianza no significa que exista una probabilidad del 95% de que el parámetro esté en un intervalo específico (esto es una interpretación bayesiana). En el enfoque clásico, el 95% se refiere a la proporción de intervalos que contendrían el verdadero valor si repitéramos el muestreo muchas veces. Error frecuente: creer que el parámetro tiene probabilidad del 95% de estar en ese rango particular.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v5`
**Bloom:** [Apply]
**ICFES:** [Cálculo de intervalos de confianza para la media]
**Context:** Temperaturas en la zona urbana de Cali

### Enunciado
El promedio de temperatura máxima diaria en Cali durante el último año fue de 31.2°C con una desviación estándar de 2.8°C. Un investigador quiere construir un intervalo de confianza del 95% para la temperatura promedio real usando una muestra de 49 días. Teniendo en cuenta que Z=1.96 para el 95%, ¿cuál es el intervalo de confianza?

### Options
- [ ] A) (30.42, 31.98)
- [ ] B) (29.42, 32.98)
- [x] C) (30.42, 31.98) <!-- feedback: IC = x̄ ± Z·(σ/√n) = 31.2 ± 1.96·(2.8/7) = 31.2 ± 1.96·0.4 = 31.2 ± 0.784 ≈ (30.42, 31.98) -->
- [ ] D) (30.78, 31.62)

### Explicación Pedagógica
Para construir un intervalo de confianza se usa la fórmula: x̄ ± Z·(σ/√n). Con x̄=31.2, Z=1.96, σ=2.8 y n=49, el margen de error es 1.96×(2.8/7) = 1.96×0.4 = 0.784. Errores comunes: no dividir correctamente entre √n o usar el valor crítico incorrecto para el nivel de confianza dado.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v6`
**Bloom:** [Apply]
**ICFES:** [Aplicación de pruebas de hipótesis]
**Context:** Rendimiento académico en universidades colombianas

### Enunciado
La Universidad Nacional de Colombia establece que el promedio de notas de sus estudiantes es 3.8 sobre 5.0. Un investigador sospecha que el promedio real es diferente y selecciona una muestra de 100 estudiantes encontrando un promedio de 3.6. Si la desviación estándar poblacional es 0.5, ¿cuál es el valor del estadístico de prueba Z?

### Options
- [ ] A) -4.0
- [ ] B) -0.04
- [x] C) -4.0 <!-- feedback: Z = (x̄ - μ)/(σ/√n) = (3.6 - 3.8)/(0.5/√100) = -0.2/(0.5/10) = -0.2/0.05 = -4.0 -->
- [ ] D) -0.2

### Explicación Pedagógica
El estadístico Z para pruebas de hipótesis sobre la media se calcula como Z = (x̄ - μ)/(σ/√n). El valor de -4.0 indica que el promedio muestral está 4 desviaciones estándar por debajo del valor hipotetizado, sugiriendo fuerte evidencia contra la hipótesis nula. Errores comunes: no dividir la desviación estándar entre √n o no restar correctamente.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v7`
**Bloom:** [Understand]
**ICFES:** [Identificación de errores tipo I y tipo II]
**Context:** Control de calidad en la industria textil en Bello, Antioquia

### Enunciado
En una empresa textil de Bello, se realiza una prueba de hipótesis para determinar si un lote de telas cumple con los estándares de calidad. La hipótesis nula (H₀) establece que el lote es conforme y la alternativa (H₁) que no lo es. Si la empresa rechaza incorrectamente un lote que realmente cumple los estándares, ¿qué tipo de error se está cometiendo?

### Options
- [ ] A) Error tipo II, también conocido como error del consumidor
- [x] B) Error tipo I, también conocido como error del productor <!-- feedback: El error tipo I ocurre cuando se rechaza H₀ siendo verdadera. Es el riesgo de falsely rechazar un lote bueno, es decir, rechazar incorrectamente lo que es verdadero -->
- [ ] C) Error tipo I, también conocido como error del consumidor
- [ ] D) Error tipo II, también conocido como error del productor

### Explicación Pedagógica
El **error tipo I** ocurre cuando rechazamos H₀ siendo verdadera (falso positivo). El **error tipo II** ocurre cuando aceptamos H₀ siendo falsa (falso negativo). Un error común es confundir los nombres o las consecuencias. Recordar: Tipo I = Incorrectamente rechazar algo bueno; Tipo II = Incorrectamente aceptar algo malo.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v8`
**Bloom:** [Analyze]
**ICFES:** [Análisis de la relación entre tamaño de muestra y poder estadístico]
**Context:** Estudios clínicos en hospitales de Bogotá

### Enunciado
En un ensayo clínico para probar la efectividad de un nuevo medicamento para la diabetes en hospitales de Bogotá, los investigadores están diseñando la prueba de hipótesis. ¿Qué efecto tiene aumentar el tamaño de muestra de 50 a 200 pacientes sobre la prueba de hipótesis?

### Options
- [x] A) Aumenta el poder estadístico de la prueba y reduce el error tipo II <!-- feedback: Un mayor tamaño de muestra reduce el error estándar, lo que aumenta el poder de la prueba (capacidad de detectar un efecto real cuando existe) y disminuye la probabilidad de error tipo II -->
- [ ] B) Aumenta el nivel de significancia α de la prueba
- [ ] C) Siempre garantiza que se rechazará la hipótesis nula
- [ ] D) Reduce el tamaño del efecto detectado por la prueba

### Explicación Pedagógica
Aumentar el tamaño de muestra tiene tres efectos principales: 1) reduce el error estándar, 2) aumenta el poder estadístico (capacidad de detectar efectos reales), y 3) reduce β (error tipo II). No aumenta automáticamente α ni garantiza rechazar H₀. Error frecuente: creer que样本 más grande siempre significa rechazar H₀, lo cual es incorrecto.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v9`
**Bloom:** [Apply]
**ICFES:** [Aplicación de la distribución t de Student]
**Context:** Medición de glucosa en pacientes diabéticos en Cali

### Enunciado
Un médico en Cali quiere estimar el nivel promedio de glucosa en ayunas de sus pacientes diabéticos. Con una muestra de 25 pacientes, encuentra una media de 145 mg/dL y una desviación estándar de 30 mg/dL. Para construir un intervalo de confianza del 95%, ¿qué distribución debe usar si la desviación estándar poblacional es desconocida?

### Options
- [ ] A) Distribución normal estándar (Z)
- [x] B) Distribución t de Student con 24 grados de libertad <!-- feedback: Cuando la desviación estándar poblacional (σ) es desconocida y se estima con la desviación estándar muestral (s), se debe usar la distribución t de Student con n-1 grados de libertad -->
- [ ] C) Distribución chi-cuadrado
- [ ] D) Distribución t de Student con 25 grados de libertad

### Explicación Pedagógica
La distribución t de Student se usa cuando: 1) la muestra es pequeña (n<30), 2) la desviación estándar poblacional es desconocida. Los grados de libertad son n-1 = 24. Error común: usar Z cuando σ es desconocida o confundir los grados de libertad.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v10`
**Bloom:** [Understand]
**ICFES:** [Comprensión del concepto de correlación]
**Context:** Relación entre horas de estudio y rendimiento en pruebas Saber 11

### Enunciado
En un colegio de Barranquilla, un investigador analiza la relación entre las horas semanales de estudio y las puntuaciones obtenidas en simulacros del Saber 11. Encuentra un coeficiente de correlación de r = 0.85. ¿Cuál es la interpretación correcta de este resultado?

### Options
- [ ] A) El 85% de los estudiantes que estudian más obtienen mejores puntuaciones
- [ ] B) Por cada hora adicional de estudio, la puntuación aumenta en 0.85 puntos
- [x] C) Existe una correlación positiva fuerte entre las horas de estudio y la puntuación del examen <!-- feedback: r = 0.85 indica una correlación lineal positiva fuerte (cercana a 1). Sin embargo, el coeficiente de correlación no implica causalidad ni representa porcentajes de variación -->
- [ ] D) Las horas de estudio causan directamente mejores puntuaciones

### Explicación Pedagógica
El coeficiente de correlación r mide la fuerza y dirección de la relación lineal, no la causalidad. Valores cercanos a 1 indican correlación positiva fuerte. Error frecuente: interpretar r² sin calcularlo o creer que correlación implica causalidad. r = 0.85 no significa "85% de los estudiantes", sino que hay una asociación lineal fuerte positiva.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v11`
**Bloom:** [Analyze]
**ICFES:** [Análisis de regresión lineal simple]
**Context:** Relación entre temperatura y producción de flores en la Sabana de Bogotá

### Enunciado
Una empresa de flores en la Sabana de Bogotá quiere modelar la relación entre la temperatura promedio (°C) y la producción diaria de claveles (miles de unidades). El análisis de regresión lineal arroja la ecuación: ŷ = -150 + 8.5x, donde x es la temperatura. Si la temperatura promedio es 22°C, ¿cuál es la producción estimada de claveles?

### Options
- [ ] A) 37 miles de unidades
- [ ] B) 8.5 miles de unidades
- [x] C) 37 miles de unidades <!-- feedback: ŷ = -150 + 8.5(22) = -150 + 187 = 37. La producción estimada es 37 miles de unidades -->
- [ ] D) 192 miles de unidades

### Explicación Pedagógica
En la ecuación de regresión ŷ = a + bx, el intercepto (a=-150) indica el valor de ŷ cuando x=0, y la pendiente (b=8.5) indica el cambio en ŷ por cada unidad de x. Error común: confundir qué variable es x o y, o no sustituir correctamente el valor de x.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v12`
**Bloom:** [Analyze]
**ICFES:** [Análisis de residuos en regresión]
**Context:** Predicción de demanda de agua en apartamentos en Medellín

### Enunciado
Un ingeniero ambiental en Medellín ajusta un modelo de regresión lineal para predecir el consumo mensual de agua (en m³) basado en el número de habitantes por apartamento. Al examinar los residuos, observa que tienen un patrón curvilíneo. ¿Qué problema presenta el modelo actual?

### Options
- [ ] A) Los residuos son demasiado pequeños
- [x] B) El modelo lineal no captura adecuadamente la relación entre las variables <!-- feedback: Si los residuos muestran un patrón (no son aleatorios), indica que el modelo lineal no es apropiado. Un patrón curvilíneo sugiere que se necesita un modelo cuadrático o de mayor orden -->
- [ ] C) Existe multicolinealidad entre las variables
- [ ] D) El tamaño de muestra es insuficiente

### Explicación Pedagógica
Los residuos deben distribuirse aleatoriamente alrededor de cero. Un patrón en los residuos indica que el modelo no es adecuado. Errores comunes: no revisar los residuos o creer que cualquier modelo es suficiente si R² es alto.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v13`
**Bloom:** [Evaluate]
**ICFES:** [Evaluación de la significancia estadística]
**Context:** Efecto de un programa de nutrición escolar en Pasto

### Enunciado
Un programa de nutrición escolar en Pasto reporta que los niños que participen tienen un peso promedio al nacer de 3.2 kg, significativamente diferente de la media nacional de 3.0 kg (p-valor = 0.001). Un crítico señala que la diferencia de 0.2 kg podría no ser clínicamente importante. ¿Cuál es la evaluación correcta?

### Options
- [x] A) La diferencia es estadísticamente significativa pero puede no ser práctica o clínicamente relevante <!-- feedback: Significancia estadística (p-valor bajo) no equivale a significancia práctica. Con muestras grandes, incluso diferencias pequeñas pueden ser estadísticamente significativas. Es necesario evaluar el tamaño del efecto -->
- [ ] B) La diferencia no es estadísticamente significativa porque es pequeña
- [ ] C) El p-valor de 0.001 prueba que el programa causa mejores resultados
- [ ] D) Los resultados son definitivos y aplicables a toda la población

### Explicación Pedagógica
Existe una diferencia entre **significancia estadística** (¿es poco probable que el efecto sea debido al azar?) y **significancia práctica/clínica** (¿el efecto es suficientemente grande para ser importante?). Error común: confundir p-valor con tamaño del efecto o interpretar correlación como causalidad.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v14`
**Bloom:** [Apply]
**ICFES:** [Aplicación de la prueba Chi-cuadrado]
**Context:** Preferencia de medios de transporte en estudiantes universitarios en Cartagena

### Enunciado
Un estudio en Cartagena quiere determinar si la preferencia de medio de transporte (público, taxi, bicicleta, a pie) es independiente del género del estudiante. Se aplicó una encuesta y se tabuló una tabla de contingencia 2x4. ¿Cuál es el número mínimo de frecuencia esperada para que la aproximación Chi-cuadrado sea válida?

### Options
- [ ] A) Todas las frecuencias esperadas deben ser mayores o iguales a 1
- [ ] B) Todas las frecuencias esperadas deben ser mayores o iguales a 10
- [x] C) Ninguna frecuencia esperada debe ser menor que 5 <!-- feedback: La regla general para la aproximación Chi-cuadrado es que ninguna frecuencia esperada sea menor que 5. Si se viola esta regla, se debe usar la prueba exacta de Fisher o combinar categorías -->
- [ ] D) El 80% de las frecuencias esperadas deben ser mayores o iguales a 5

### Explicación Pedagógica
La prueba Chi-cuadrado requiere que las frecuencias esperadas sean suficientemente grandes para que la aproximación a la distribución Chi-cuadrado sea válida. La regla tradicional es que ninguna frecuencia esperada sea menor que 5. Error frecuente: no verificar este supuesto antes de realizar la prueba.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v15`
**Bloom:** [Apply]
**ICFES:** [Cálculo del coeficiente de determinación]
**Context:** Relación entre ingresos familiares y gastos en educación en Ibagué

### Enunciado
Un investigador en Ibagué ajusta un modelo de regresión lineal para predecir los gastos mensuales en educación (en miles de pesos) basados en los ingresos familiares mensuales (en miles de pesos). Obtiene un coeficiente de determinación R² = 0.72. ¿Cuál es la interpretación correcta?

### Options
- [ ] A) El 72% de los gastos en educación son causados por los ingresos familiares
- [x] B) El 72% de la variabilidad en los gastos en educación se explica por los ingresos familiares mediante el modelo lineal <!-- feedback: R² = 0.72 significa que el 72% de la variabilidad en la variable dependiente (gastos) es explicada por la variable independiente (ingresos) a través del modelo de regresión. No implica causalidad -->
- [ ] C) Los ingresos explican el 72% de los gastos en educación
- [ ] D) El modelo predice con un error del 28%

### Explicación Pedagógica
R² representa la proporción de variabilidad de Y explicada por X en el modelo. Error común: creer que R² = 72% significa que X causa el 72% de Y (causalidad) o que el error es 28% (confusión con R, no R²).

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v16`
**Bloom:** [Analyze]
**ICFES:** [Análisis de intervalos de confianza y predicción]
**Context:** Predicción de ventas de helados en Santa Marta

### Enunciado
Un helado artesanal en Santa Marta quiere predecir las ventas mensuales basándose en la temperatura promedio. El intervalo de confianza del 95% para la venta promedio cuando la temperatura es 35°C es (850, 950) miles de pesos. Un cliente pregunta cuánto venderá específicamente en marzo cuando la temperatura sea 35°C. ¿Cuál es la mejor respuesta?

### Options
- [ ] A) Exactamente entre 850 y 950 miles de pesos
- [ ] B) Aproximadamente 900 miles de pesos, sin incertidumbre
- [x] C) El intervalo (850, 950) es para la venta promedio, no para una observación individual <!-- feedback: El intervalo de confianza es para el promedio de Y dado X. Para una predicción individual se requiere un intervalo de predicción, que es más amplio porque incluye la variabilidad del individuo además de la del promedio -->
- [ ] D) Hay una probabilidad del 95% de que las ventas sean exactamente 900 mil pesos

### Explicación Pedagógica
Existen dos tipos de intervalos: **intervalo de confianza** (para la media de Y dado X) y **intervalo de predicción** (para una observación individual). El intervalo de predicción es más amplio porque incluye variabilidad adicional. Error frecuente: usar un intervalo de confianza para predecir valores individuales.

---

## Question 17 (Variant Basic - Difficulty D9)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-030-MASTERY-v17`
**Bloom:** [Evaluate]
**ICFES:** [Evaluación crítica de estudios estadísticos]
**Context:** Estudio sobre efectividad de tratamiento contra dengue en Villavicencio

### Enunciado
Un investigador en Villavicencio reporta que un nuevo tratamiento reduce significativamente los días de fiebre en pacientes con dengue (p-valor = 0.03). Sin embargo, al revisar el estudio
