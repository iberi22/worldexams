<think>
Voy a generar 20 preguntas tipo ICFES para matemáticas, tema estadística inferencial, grado 11, período 4. Debo seguir las reglas de dificultad progresiva y crear distractores plausibles basados en errores comunes de estudiantes colombianos.

Estructura de dificultad:
- Preguntas 1-4: D3-D4 (básicas)
- Preguntas 5-10: D5-D6 (intermedias)
- Preguntas 11-16: D7-D8 (avanzadas)
- Preguntas 17-20: D9-D10 (maestría)

Temas de estadística inferencial que puedo cubrir:
-Intervalos de confianza
-Pruebas de hipótesis
-Distribución normal
-Error estándar
-Nivel de confianza
-Margen de error
-Tamaño de muestra
-Correlation vs causación
-Principio de muestreo
-Tests de significancia
-Z-scores
-Distribución muestral

Voy a crear preguntas con contexto colombiano moderno.
</think>

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
  timestamp: "2026-04-15T09:26:17.886277"
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
**Bloom:** [Remember]
**ICFES:** [Identificar conceptos básicos de inferencia estadística]
**Context:** Encuesta de satisfacción en empresa colombiana

### Enunciado
En una empresa de call center en Bogotá, se selecciona aleatoriamente a 50 empleados de un total de 500 para conocer su nivel de satisfacción laboral. El porcentaje de empleados satisfechos en la muestra es del 72%. ¿Qué representa este 72% en términos de inferencia estadística?

### Options
- [ ] A) Es un parámetro porque se calculó con toda la población
- [ ] B) Es una estimación del parámetro poblacional porque se usó una muestra
- [x] C) Es un estadístico que sirve como estimador del porcentaje poblacional <!-- feedback: El valor calculado de la muestra (72%) es un estadístico que se usa para estimar el parámetro poblacional desconocido -->
- [ ] D) Es un error de muestreo porque no se estudió toda la población <!-- feedback: El 72% no representa el error de muestreo, sino el valor del estadístico muestral -->

### Explicación Pedagógica
El 72% calculado de la muestra es un estadístico (valor calculado a partir de datos muéstrales) que se utiliza como estimador puntual del parámetro poblacional desconocido. Un error común es confundir estadística descriptiva con inferencial, o pensar que cualquier valor de una muestra es automáticamente un error.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v2`
**Bloom:** [Understand]
**ICFES:** [Comprender el concepto de nivel de confianza]
**Context:** Estudio sobre consumo de café en Colombia

### Enunciado
Un investigador afirma con un nivel de confianza del 95% que el consumo promedio mensual de café en hogares colombianos está entre 2.8 y 3.5 kg. ¿Cuál es la interpretación correcta de esta afirmación?

### Options
- [ ] A) El 95% de los hogares colombianos consume entre 2.8 y 3.5 kg de café mensual
- [x] B) Si se tomaran muchas muestras y se construyeran intervalos iguales, aproximadamente el 95% de ellos contendría el promedio real <!-- feedback: Esta es la interpretación correcta del nivel de confianza: se refiere a la proporción de intervalos que contendrían el parámetro verdadero si repetimos el proceso de muestreo muchas veces -->
- [ ] C) Existe una probabilidad del 95% de que el consumo real esté en ese rango
- [ ] D) El intervalo tiene un error del 5% porque no se estudió toda la población <!-- feedback: El nivel de confianza no es un porcentaje de error, sino la probabilidad de que el método construya un intervalo que capture el parámetro -->

### Explicación Pedagógica
El nivel de confianza del 95% significa que si repetimos el proceso de muestreo infinitas veces, el 95% de los intervalos construidos contendrían el parámetro poblacional verdadero. Es un atributo del método, no una probabilidad sobre un intervalo específico ya construido. Error común: pensar que hay 95% de probabilidad de que el parámetro esté en el intervalo ya calculado.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v3`
**Bloom:** [Understand]
**ICFES:** [Distinguir entre población y muestra]
**Context:** Encuesta electoral en elecciones locales colombianas

### Enunciado
Antes de las elecciones locales en Medellín, un periódico publica que "según una encuesta, el candidato X tiene el 45% de intención de voto con un margen de error de ±3%". Si la encuesta usó un nivel de confianza del 95%, ¿qué significa en la práctica que el margen de error sea del 3%?

### Options
- [ ] A) El resultado exacto de la elección diferirá máximo 3% del 45%
- [ ] B) El candidato X obtendrá entre 42% y 48% de los votos
- [x] C) Si se realizaran muchas encuestas con la misma metodología, en el 95% de ellas el porcentaje real estaría entre 42% y 48% <!-- feedback: El margen de error indica qué tan lejos podría estar el estimador del valor verdadero, con un nivel de confianza del 95%. No garantiza que el resultado de una sola encuesta esté en ese rango -->
- [ ] D) Solo el 3% de los votantes cambió de opinión desde la encuesta <!-- feedback: El margen de error no se relaciona con cambios de opinión, sino con la variabilidad del estimador muestral -->

### Explicación Pedagógica
El margen de error de ±3% con un nivel de confianza del 95% significa que si repetimos el muestreo muchas veces, en el 95% de los casos el intervalo (resultado ± 3%) contendría el verdadero valor poblacional. No es una garantía para una encuesta particular ni tiene relación con cambios de opinión.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v4`
**Bloom:** [Apply]
**ICFES:** [Aplicar conceptos de distribución muestral]
**Context:** Producción de café en Fincas cafeteras del Huila

### Enunciado
Las fincas cafeteras del Huila producen en promedio 850 kg de café por hectárea al año, con una desviación estándar de 120 kg. Si se selecciona una muestra aleatoria de 36 fincas, ¿cuál es la desviación estándar de la distribución muestral de la media?

### Options
- [ ] A) 120 kg
- [ ] B) 120/√36 = 20 kg <!-- feedback: Cálculo correcto del error estándar de la media: σ/√n = 120/6 = 20 kg -->
- [x] C) 20 kg
- [ ] D) 850/√36 = 141.67 kg <!-- feedback: Este es un error común: confundir el promedio poblacional con el error estándar y dividir por √n incorrectamente -->

### Explicación Pedagógica
El error estándar de la media se calcula como σ/√n, donde σ es la desviación estándar poblacional y n es el tamaño de muestra. Error común: no dividir entre √n (error estándar) o dividir el promedio entre √n. El valor 20 kg representa la desviación estándar de la distribución muestral de las medias.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v5`
**Bloom:** [Apply]
**ICFES:** [Calcular intervalos de confianza para la media]
**Context:** Tiempo de espera en EPS de Bogotá

### Enunciado
El tiempo promedio de espera en la EPS "Salud Bogotá" es de 45 minutos con una desviación estándar de 12 minutos. Se tomó una muestra de 64 usuarios. Construya un intervalo de confianza del 95% para el tiempo promedio real de espera.

### Options
- [ ] A) [43.06; 46.94] minutos
- [x] B) [42.06; 47.94] minutos <!-- feedback: El intervalo es: μ ± z(α/2) × (σ/√n) = 45 ± 1.96 × (12/8) = 45 ± 2.94 = [42.06; 47.94] -->
- [ ] C) [44.06; 45.94] minutos
- [ ] D) [40.05; 49.95] minutos <!-- feedback: Usó z = 2 en lugar de 1.96, lo cual produce un intervalo más amplio -->

### Explicación Pedagógica
Para el intervalo de confianza del 95%, se usa z = 1.96 (valor crítico para 95% de confianza). El error estándar es σ/√n = 12/√64 = 12/8 = 1.5. Margen de error = 1.96 × 1.5 = 2.94. Error común: usar z = 2 en lugar de 1.96, o no dividir la desviación estándar por √n.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v6`
**Bloom:** [Apply]
**ICFES:** [Determinar tamaño de muestra necesario]
**Context:** Encuesta sobre rendimiento académico en universidades colombianas

### Enunciado
Una исследователь desea estimar el promedio de notas de estudiantes universitarios colombianos con un margen de error de 0.5 puntos y un nivel de confianza del 95%. Si la desviación estándar poblacional es de 2.3 puntos, ¿cuál es el tamaño mínimo de muestra necesario?

### Options
- [ ] A) n = (2.3/0.5)² = 21.16 ≈ 22 estudiantes
- [x] B) n = (1.96 × 2.3/0.5)² ≈ 82 estudiantes <!-- feedback: n = (z × σ/E)² = (1.96 × 2.3/0.5)² = (9.016/0.5)² = (18.032)² ≈ 82 estudiantes. El valor z del 95% es necesario -->
- [ ] C) n = (2.3/0.5) × 1.96 ≈ 9 estudiantes
- [ ] D) n = (0.5/2.3)² × 1.96 ≈ 0.04 estudiantes <!-- feedback: Error conceptual: se debe multiplicar z y σ, no dividir E entre σ -->

### Explicación Pedagógica
La fórmula para el tamaño de muestra es n = (z × σ/E)². Con z = 1.96 para 95% de confianza, σ = 2.3 y E = 0.5, se obtiene n ≈ 82. Error común: omitir el valor z de la fórmula (olvidar que el margen de error se relaciona con z), o invertir la fórmula.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v7`
**Bloom:** [Understand]
**ICFES:** [Comprender pruebas de hipótesis]
**Context:** Control de calidad en empresa textil de Medellín

### Enunciado
Una empresa textil de Medellín afirma que sus camisetas tienen una vida útil promedio de al menos 50 lavadas. Se realiza una prueba de hipótesis y se rechaza esta afirmación. ¿Cuál de las siguientes es la interpretación correcta de este resultado?

### Options
- [ ] A) La afirmación es falsa porque los datos lo demuestran
- [x] B) Existe suficiente evidencia muestral para rejectar la afirmación de que la vida útil es ≥50 lavadas <!-- feedback: En una prueba de hipótesis, rechazar H₀ significa que hay suficiente evidencia muestral para concluir que la afirmación poblacional es falsa, pero no se "prueba" certeza absoluta -->
- [ ] C) Definitivamente la vida útil promedio de las camisetas es menor a 50 lavadas
- [ ] D) El error de tipo I es del 5% por lo tanto el resultado es poco confiable <!-- feedback: Rechazar H₀ a α=0.05 significa que hay 5% de probabilidad de error tipo I, pero el resultado sigue siendo estadísticamente válido -->

### Explicación Pedagógica
En una prueba de hipótesis, "rechazar H₀" significa que la evidencia muestral es suficientemente fuerte para concluir que la afirmación poblacional probablemente es falsa. No se prueba la certeza absoluta de la falsedad. Error común: interpretar "rechazar" como "definitivamente falso" o como "poco confiable".

---

## Question 8 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v8`
**Bloom:** [Apply]
**ICFES:** [Calcular errores tipo I y tipo II]
**Context:** Diagnóstico de dengue en clínicas de Cali

### Enunciado
En una clínica de Cali, se implementa una nueva prueba rápida para detectar dengue. Si la hipótesis nula es "el paciente tiene dengue" y se conclude que el paciente tiene dengue cuando en realidad está sano, ¿qué tipo de error se está cometiendo?

### Options
- [ ] A) Error tipo I (falso positivo) <!-- feedback: Error tipo I: rechazar H₀ cuando H₀ es verdadera. Aquí H₀ dice que "tiene dengue" y se rechaza diciendo que no tiene dengue, pero la interpretación correcta considera que se concluyó algo incorrecto -->
- [x] B) Error tipo I (falso positivo) o error tipo II según la estructura de la prueba <!-- feedback: Error tipo I: rechazar H₀ (tiene dengue) cuando H₀ es verdadera. Se concluye que tiene dengue (rechazar H₀) cuando en realidad no tiene (H₀ era verdadera). Esto es un falso positivo -->
- [ ] C) Error tipo II (falso negativo)
- [ ] D) Error estándar de la estimación <!-- feedback: El error estándar no tiene relación con la clasificación correcta o incorrecta de pacientes -->

### Explicación Pedagógica
Error tipo I (α): rechazar H₀ cuando H₀ es verdadera. Error tipo II (β): no rechazar H₀ cuando H₀ es falsa. En el contexto, H₀: "tiene dengue". Si se concluye que tiene dengue (se rechaza H₀) cuando en realidad no tiene, se comete error tipo I (falso positivo). Error común: confundir falso positivo con falso negativo.

---

## Question 9 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v9`
**Bloom:** [Apply]
**ICFES:** [Aplicar el teorema del límite central]
**Context:** Peso de paquetes en empresa de envíos de Colombia

### Enunciado
Una empresa de envíos en Colombia sabe que el peso de sus paquetes tiene una distribución con media de 3.2 kg y desviación estándar de 0.8 kg. Según el Teorema del Límite Central, si se seleccionan muestras de 100 paquetes, ¿cuál es la distribución de la media muestral?

### Options
- [ ] A) Distribución uniforme con media 3.2 kg
- [ ] B) Distribución normal con media 3.2 kg y desviación estándar 0.8 kg
- [x] C) Distribución aproximadamente normal con media 3.2 kg y desviación estándar 0.08 kg <!-- feedback: Por el TLC, X̄ ~ N(μ, σ/√n). Con n=100: media = 3.2 kg, error estándar = 0.8/√100 = 0.08 kg -->
- [ ] D) Distribución exponencial con media 0.32 kg <!-- feedback: El TLC indica que la distribución de X̄ se aproxima a la normal, no a otras distribuciones, y la media se mantiene igual a la poblacional -->

### Explicación Pedagógica
El Teorema del Límite Central establece que para muestras grandes (n≥30), la distribución muestral de X̄ es aproximadamente normal con media μ y desviación estándar σ/√n. Error común: no dividir entre √n al calcular la desviación estándar de la distribución muestral.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v10`
**Bloom:** [Analyze]
**ICFES:** [Analizar la relación entre tamaño de muestra y precisión]
**Context:** Encuesta sobre hábitos de lectura en Bogotá

### Enunciado
Una encuesta sobre hábitos de lectura en Bogotá quiere reducir el margen de error a la mitad. ¿Qué sucede con el tamaño de muestra si se mantiene el mismo nivel de confianza?

### Options
- [ ] A) El tamaño de muestra se reduce a la mitad
- [ ] B) El tamaño de muestra se mantiene igual porque solo cambió el margen de error
- [x] C) El tamaño de muestra se cuadruplica porque n es inversamente proporcional al cuadrado del margen de error <!-- feedback: Como n = (z×σ/E)², si E se reduce a la mitad, n se incrementa por un factor de (1/0.5)² = 4 -->
- [ ] D) El tamaño de muestra se duplica porque es inversamente proporcional al margen de error <!-- feedback: Error común: pensar que la relación es lineal, cuando en realidad es cuadrática con el margen de error -->

### Explicación Pedagógica
La fórmula n = (z×σ/E)² muestra que n es inversamente proporcional al cuadrado del margen de error. Si el margen se reduce a la mitad, n se incrementa por un factor de 4. Error común: asumir incorrectamente una relación lineal entre n y el margen de error.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v11`
**Bloom:** [Analyze]
**ICFES:** [Evaluar condiciones para pruebas estadísticas]
**Context:** Estudio sobre ingresos en empresas de.tech en Medellín

### Enunciado
Un investigador quiere estimar el ingreso promedio mensual de desarrolladores de software en empresas startups de Medellín. La desviación estándar poblacional es desconocida. ¿Cuál es la distribución de referencia apropiada para construir el intervalo de confianza?

### Options
- [ ] A) Distribución normal estándar (z)
- [x] B) Distribución t de Student con n-1 grados de libertad <!-- feedback: Cuando la desviación estándar poblacional (σ) es desconocida y se reemplaza por la desviación estándar muestral (s), se debe usar la distribución t de Student en lugar de la normal -->
- [ ] C) Distribución ji-cuadrado
- [ ] D) Distribución binomial <!-- feedback: La distribución t se usa cuando se estima la desviación estándar con datos muestrales. La ji-cuadrado se usa para varianzas y la binomial para proporciones -->

### Explicación Pedagógica
Cuando σ es desconocido y se estima con s (desviación estándar muestral), el estadístico (X̄ - μ)/(s/√n) sigue una distribución t de Student con n-1 grados de libertad. Error común: usar z cuando se debería usar t por no conocer σ poblacional.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v12`
**Bloom:** [Apply]
**ICFES:** [Realizar pruebas de hipótesis para la media]
**Context:** Producción de palma africana en plantas de biodiesel de Tumaco

### Enunciado
Una planta de biodiesel en Tumaco afirma que el rendimiento de la extracción de aceite de palma es de 220 kg por hectárea. Se muestrea 25 hectáreas con un promedio de 210 kg y una desviación estándar de 25 kg. Con α = 0.05, ¿cuál es la conclusión de la prueba de hipótesis?

### Options
- [ ] A) Se rechaza H₀: el rendimiento promedio es diferente a 220 kg
- [x] B) No se rechaza H₀: no hay suficiente evidencia para afirmar que el rendimiento es diferente a 220 kg <!-- feedback: t = (210-220)/(25/√25) = -10/5 = -2. t crítico a dos colas con α=0.05 y gl=24: ±2.064. |-2| < 2.064, entonces no se rechaza H₀ -->
- [ ] C) Se acepta H₁: el rendimiento promedio es menor a 220 kg
- [ ] D) Se acepta H₀: el rendimiento promedio es exactamente 220 kg <!-- feedback: En pruebas de hipótesis no se "acepta" H₀ como verdad absoluta, sino que no se rechaza por falta de evidencia suficiente -->

### Explicación Pedagógica
Para la prueba t con n=25, gl=24, t calculado = (210-220)/(25/5) = -2. El valor crítico t(α/2, gl=24) = ±2.064. Como |t| < t_critico, no se rechaza H₀. Error común: decir "aceptar H₀" cuando debería decirse "no rechazar H₀" y creer que esto prueba que H₀ es verdadera.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v13`
**Bloom:** [Apply]
**ICFES:** [Calcular e interpretar el valor p]
**Context:** Evaluación de programa de becas en universidades públicas colombianas

### Enunciado
En un estudio sobre la efectividad de un programa de becas universitarias en Colombia, se obtiene un valor p de 0.008 al probar si el programa aumenta el promedio académico de los estudiantes beneficiarios. Con un nivel de significancia α = 0.05, ¿cuál es la interpretación correcta?

### Options
- [ ] A) Existe un 0.8% de probabilidad de que el programa sea efectivo
- [ ] B) El programa definitivamente es efectivo porque el valor p es menor que α
- [x] C) Si H₀ fuera verdadera (el programa no tiene efecto), la probabilidad de observar un resultado como el obtenido o más extremo es 0.008 <!-- feedback: El valor p representa la probabilidad de obtener un resultado al menos tan extremo como el observado, asumiendo que H₀ es verdadera. No es la probabilidad de que H₀ sea verdadera -->
- [ ] D) El error de tipo II es del 0.8% <!-- feedback: El valor p no es el error tipo II. El error tipo II (β) es la probabilidad de no rechazar H₀ cuando H₀ es falsa -->

### Explicación Pedagógica
El valor p es la probabilidad, asumiendo H₀ verdadera, de obtener un resultado al menos tan extremo como el observado. Un valor p de 0.008 indica que, si el programa no tuviera efecto, solo el 0.8% de las muestras mostrarían un efecto tan fuerte como el observado. Error común: interpretar el valor p como la probabilidad de que H₀ sea verdadera.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v14`
**Bloom:** [Analyze]
**ICFES:** [Comparar pruebas de una y dos colas]
**Context:** Estudio sobre emisiones de CO2 de vehículos en Bogotá

### Enunciado
La norma ambiental colombiana establece que los vehículos no deben emitir más de 120 g/km de CO2 en condiciones normales. Un investigador quiere determinar si un nuevo modelo de vehículo cumple la norma. ¿Qué tipo de prueba de hipótesis es apropiada?

### Options
- [ ] A) Prueba bilateral porque interesa saber si el vehículo cumple o no la norma
- [x] B) Prueba unilateral (cola izquierda) porque interesa saber si las emisiones son menores que el límite máximo <!-- feedback: Si interesa saber si las emisiones son MENORES (no superan) el límite de 120 g/km, la dirección del rechazo está en una sola cola (izquierda). H₀: μ ≥ 120, H₁: μ < 120 -->
- [ ] C) Prueba unilateral (cola derecha) porque las emisiones siempre pueden ser mayores
- [ ] D) Cualquiera de las anteriores porque el tipo de prueba no afecta el resultado <!-- feedback: El tipo de prueba sí afecta el resultado: cambia el valor crítico y puede cambiar la conclusión -->

### Explicación Pedagógica
Si el interés es determinar si las emisiones son MENORES que el límite máximo permitido (lo cual sería favorable), la prueba es unilateral izquierda: H₀: μ ≥ 120, H₁: μ < 120. Error común: usar prueba bilateral cuando la dirección de la hipótesis alternativa es clara y específica.

---

## Question 15 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-estadistica-inferencial-029-MASTERY-v15`
**Bloom:** [Understand]
**ICFES:** [Comprender el concepto de potencia de una prueba]
**Context:** Detección de enfermedades cardíacas en clínicas de Cartagena

### Enunciado
Un cardiólogo está evaluando dos pruebas diagnósticas para detectar una enfermedad cardíaca. La Prueba A tiene una potencia del 90% mientras que la Prueba B tiene una potencia del 60%. Si ambas pruebas tienen el mismo nivel de significancia, ¿cuál es la interpretación correcta de estas diferencias en potencia?

### Options
- [ ] A) La Prueba A tiene mayor probabilidad de diagnosticar correctamente a una persona enferma
- [x] B) La Prueba A tiene mayor capacidad para detectar el efecto cuando realmente existe (mayor potencia = menor error tipo II) <!-- feedback: La potencia de una prueba (1-β) es la probabilidad de rechazar correctamente H₀ cuando H₀ es falsa. Mayor potencia significa menor probabilidad de cometer error tipo II (no detectar un efecto que existe) -->
- [ ] C) La Prueba B es más confiable porque tiene menor potencia
- [ ] D) La potencia no tiene relación con la capacidad de detección de la enfermedad <!-- feedback: La potencia directamente mide la capacidad de una prueba para detectar un efecto real cuando existe -->

### Explicación Pedagógica
La potencia de una prueba (1 - β) es la probabilidad de rechazar correctamente H₀ cuando H₀ es falsa. Una prueba con 90% de potencia detectará el efecto real el 90% de las veces, mientras que una con 60% solo lo detectará el 60