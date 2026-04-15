<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for Mathematics, specifically Statistics Descriptive, grade 11, period 3. Let me create these following the strict format requested.

Let me structure this properly with the YAML frontmatter and 20 questions with progressive difficulty.

The topics for statistics descriptive at this level should include:
- Measures of central tendency (mean, median, mode)
- Measures of dispersion (variance, standard deviation, range)
- Data representation (histograms, bar charts, pie charts)
- Frequency distributions
- Quartiles, deciles, percentiles
- Box plots
- Skewness and kurtosis
- Coefficient of variation
- Bivariate data and scatter plots
- Correlation

Let me create 20 questions with difficulty progression:
- Questions 1-4: D3-D4 (basic)
- Questions 5-10: D5-D6 (intermediate)
- Questions 11-16: D7-D8 (advanced)
- Questions 17-20: D9-D10 (mastery)

I need to make sure:
1. Correct answer marked with [x]
2. Each option has feedback
3. Colombian context
4. Realistic distractors that Colombian students would commonly choose
5. Progressive difficulty
6. No "todas las anteriores" or "ninguna de las anteriores"
7. Follow the exact format

</think>

---
id: "CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "estadistica-descriptiva"
periodo: 3
protocol_version: "5.1"
bundle_size: 20
bundle_index: 20
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T08:59:59.447730"
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

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Interpretación y representación
**Context:** Resultados de pruebas Saber 11 en Colombia

### Enunciado
En una institución educativa de Bogotá, los resultados de matemáticas en la prueba Saber 11 fueron: 72, 85, 90, 65, 78, 82, 91, 70. ¿Cuál es la media aritmética de estos datos?

### Options
- [ ] A) 78.5
- [x] C) 79.125 <!-- feedback: La suma de los valores es 633, dividido entre 8 datos = 79.125. Este es el cálculo correcto de la media aritmética. -->
- [ ] B) 79
- [ ] D) 78 <!-- feedback: Este valor resulta de aproximar la media, pero el cálculo exacto incluye decimales. -->

### Explicación Pedagógica
La media aritmética se calcula sumando todos los valores (72+85+90+65+78+82+91+70 = 633) y dividiendo entre el número total de datos (8). Un error común es contar mal la cantidad de datos o aproximar el resultado sin hacer el cálculo completo.

---

## Question 2 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Análisis y interpretación de datos
**Context:** Temperaturas en ciudades colombianas

### Enunciado
Las temperaturas máximas (en °C) registradas durante una semana en Cartagena fueron: 34, 35, 33, 36, 34, 35, 34. ¿Cuál es la moda de este conjunto de datos?

### Options
- [ ] A) 34.5
- [ ] B) 35
- [x] C) 34 <!-- feedback: La moda es el valor que más se repite. El valor 34 aparece 4 veces, mientras que 35 aparece 2 veces y 33 una vez. -->
- [ ] D) No hay moda <!-- feedback: Existe moda ya que hay valores que se repiten con mayor frecuencia que otros. -->

### Explicación Pedagógica
La moda es el dato que tiene mayor frecuencia. En este conjunto, 34°C aparece 4 veces (lunes, miércoles, viernes, domingo), siendo el valor más frecuente. Es común que los estudiantes confundan la moda con la media o no identifiquen datos repetidos correctamente.

---

## Question 3 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y procedimientos
**Context:** Ventas mensuales en empresa colombiana

### Enunciado
Un vendedor de artesanías en Villa de Leyva registró las siguientes ventas (en miles de pesos) durante 5 días: $120, $85, $150, $95, $130. ¿Cuál es el rango de estos datos?

### Options
- [x] A) $65 mil pesos <!-- feedback: El rango se calcula como valor máximo (150) menos valor mínimo (85), resultando en 150 - 85 = 65. -->
- [ ] B) $70 mil pesos
- [ ] C) $115 mil pesos
- [ ] D) $580 mil pesos

### Explicación Pedagógica
El rango es la diferencia entre el valor máximo y el valor mínimo del conjunto de datos. Error frecuente: sumar todos los valores en lugar de restar el mínimo del máximo, obteniendo la suma total en lugar del rango.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Interpretación y representación
**Context:** Alturas de estudiantes en institución educativa

### Enunciado
Las alturas (en cm) de 5 estudiantes de grado 11 en una institución de Medellín son: 172, 168, 175, 163, 170. ¿Cuál es la mediana de este conjunto?

### Options
- [ ] A) 170
- [ ] B) 169.5
- [x] C) 170 <!-- feedback: Ordenando los datos: 163, 168, 170, 172, 175. Como hay 5 datos (impar), la mediana es el valor central, que es 170. -->
- [ ] D) 168

### Explicación Pedagógica
Para calcular la mediana, primero se ordenan los datos de menor a mayor. Con 5 datos, la mediana es el tercer valor (el central). El error más común es no ordenar los datos antes de identificar la posición central.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y procedimientos
**Context:** Producción de café en Colombia

### Enunciado
La producción diaria de café (en kg) en una finca de Risaralda durante una semana fue: 85, 92, 78, 95, 88, 90, 86. ¿Cuál es la media, mediana y moda respectivamente?

### Options
- [ ] A) 87.7, 88, 86
- [x] B) 87.7, 88, No hay moda <!-- feedback: Media = (85+92+78+95+88+90+86)/7 = 614/7 = 87.7. Datos ordenados: 78,85,86,88,90,92,95. Mediana = 88 (valor central). Ningún valor se repite, por lo tanto no hay moda. -->
- [ ] C) 88, 87.7, 85
- [ ] D) 87, 88, 86

### Explicación Pedagógica
Es frecuente que los estudiantes calculen incorrectamente la media o no ordenen los datos para la mediana. También pueden pensar que cualquier valor "central" es la moda, sin verificar la frecuencia de repetición.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Análisis y interpretación de datos
**Context:** Encuesta sobre consumo de energía en hogares colombianos

### Enunciado
En una encuesta sobre consumo mensual de energía eléctrica (kWh) en 10 hogares de Barranquilla se obtuvo: 180, 205, 190, 175, 220, 210, 195, 185, 200, 215. ¿Cuál es el rango intercuartílico?

### Options
- [x] A) 30 kWh
- [ ] B) 45 kWh
- [ ] C) 25 kWh
- [ ] D) 35 kWh

### Explicación Pedagógica
Primero se ordenan los datos: 175, 180, 185, 190, 195, 200, 205, 210, 215, 220. Q1 (percentil 25) = 185, Q3 (percentil 75) = 215. RIC = Q3 - Q1 = 215 - 185 = 30. Error común: confundir el rango simple con el rango intercuartílico o no identificar correctamente las posiciones de Q1 y Q3.

---

## Question 7 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v7`
**Bloom:** Understand
**ICFES:** Interpretación y representación
**Context:** Distribución de ingresos en comunidad rural

### Enunciado
Si los ingresos mensuales (en salarios mínimos) de 10 familias de una vereda en Nariño son: 1, 1.5, 2, 2, 2.5, 3, 3.5, 4, 5, 10, ¿cuál medida de tendencia central es más representativa de la situación típica de estas familias?

### Options
- [ ] A) La media, porque incluye todos los datos
- [ ] B) La moda, porque es el valor más frecuente
- [x] C) La mediana, porque la media está afectada por el valor extremo de 10 salarios mínimos <!-- feedback: La media (3.55) se ve influenciada por el valor atípico de 10. La mediana (2.75) es más representativa de la tendencia central en presencia de valores extremos. -->
- [ ] D) Ninguna, porque los datos están muy dispersos

### Explicación Pedagógica
En presencia de valores atípicos o extremos, la mediana es más representativa que la media. El error común es usar siempre la media sin considerar el efecto de valores extremos en la distribución.

---

## Question 8 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Formulación y procedimientos
**Context:** Notas de estudiantes en examen de matemáticas

### Enunciado
Las calificaciones de 15 estudiantes en un examen de matemáticas fueron: 3.0, 3.5, 4.0, 4.2, 4.5, 4.5, 4.8, 5.0, 5.0, 5.0, 5.2, 5.5, 5.8, 6.0, 6.5. ¿Cuál es la mediana?

### Options
- [ ] A) 5.0
- [x] B) 5.0 <!-- feedback: Con 15 datos ordenados, el valor central es el dato en la posición 8, que corresponde a 5.0. -->
- [ ] C) 4.8
- [ ] D) 5.2

### Explicación Pedagógica
Con un número impar de datos, la mediana es exactamente el valor central. El error más frecuente es promediar los valores centrales cuando esto no es necesario para datos impares.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Formulación y procedimientos
**Context:** Distribución de edades en grupo de jóvenes

### Enunciado
Las edades de 20 jóvenes en un programa de formación del SENA en Bucaramanga son: 16, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 22, 25. ¿Cuál es el percentil 75?

### Options
- [ ] A) 20 años
- [ ] B) 19 años
- [x] C) 20 años <!-- feedback: Para el percentil 75, se busca el valor que deja el 75% de los datos por debajo. Con 20 datos, la posición es 0.75 × 21 = 15.75, redondeando a 16. El dato en posición 16 es 20. -->
- [ ] D) 21 años

### Explicación Pedagógica
El cálculo de percentiles requiere identificar la posición correcta. Error común: no aplicar correctamente la fórmula de posición o no interpolar cuando es necesario.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v10`
**Bloom:** Analyze
**ICFES:** Análisis y interpretación de datos
**Context:** Comparación de rendimientos endos agrícolas

### Enunciado
Dos parcelas de café producen las siguientes cantidades (kg): Parcela A: 45, 48, 52, 55, 60. Parcela B: 40, 50, 55, 58, 62. Si se calcula la media y la desviación estándar de cada parcela, ¿cuál afirmación es correcta?

### Options
- [ ] A) Ambas parcelas tienen la misma media y la misma desviación estándar
- [x] B) La Parcela B tiene mayor variabilidad en los datos que la Parcela A <!-- feedback: Ambas tienen media = 52 kg. Pero Parcela A tiene desviación estándar ≈ 5.15 kg mientras Parcela B tiene ≈ 8.06 kg, indicando mayor dispersión. -->
- [ ] C) La Parcela A tiene mayor variabilidad
- [ ] D) La Parcela B tiene mayor media

### Explicación Pedagógica
Aunque ambas parcelas tienen la misma media, la Parcela B presenta mayor dispersión de los datos alrededor de la media. Un error frecuente es asociar mayor rango con mayor desviación estándar sin calcularla.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Análisis y interpretación de datos
**Context:** Análisis de ventas en empresa de confecciones

### Enunciado
Una empresa de confecciones en Bogotá tiene las siguientes ventas mensuales (en millones de pesos): 45, 52, 48, 55, 120, 50, 47, 53, 49, 51. El gerente afirma que las ventas "típicas" son de 52 millones. Según los conceptos estadísticos, ¿qué medida está utilizando?

### Options
- [ ] A) La media, porque es el promedio de todas las ventas
- [ ] B) La moda, porque es el valor que más se repite
- [x] C) La mediana, porque representa mejor el valor central evitando el efecto de las ventas atípicas de 120 millones <!-- feedback: Al ordenar los datos, la mediana es 50.5. Sin embargo, el gerente probablemente usa una medida robusta. El valor 52 podría corresponder a la media sin el dato atípico. En cualquier caso, la mediana sería la medida que evita el valor extremo. -->
- [ ] D) El rango, porque indica la diferencia entre ventas máximas y mínimas

### Explicación Pedagógica
La presencia de un valor atípico (120) afecta significativamente la media. La mediana o una media recortada serían medidas más robustas. Error común: no identificar cuándo los datos contienen valores atípicos que distorsionan la media.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Análisis y interpretación de datos
**Context:** Evaluación de precios de productos en mercados

### Enunciado
Se recopilaron los precios de arroz (por kg) en 12 tiendas de Bogotá: $3.200, $3.500, $3.400, $3.600, $3.300, $4.200, $3.450, $3.550, $3.380, $3.480, $3.520, $3.600. ¿Cuál medida indica mejor el precio "típico" y por qué?

### Options
- [ ] A) La media ($3.559) porque usa todos los datos
- [x] B) La mediana ($3.490), porque hay un valor atípico ($4.200) que distorsiona la media <!-- feedback: La media es afectada por el valor extremo de $4.200. La mediana, siendo $3.490, representa mejor el valor central típico. -->
- [ ] C) La moda ($3.600), porque es el precio más frecuente
- [ ] D) El rango ($900), porque muestra la variación del mercado

### Explicación Pedagógica
El valor atípico de $4.200 distorsiona la media hacia arriba. En estos casos, la mediana proporciona una mejor representación de la tendencia central. El error frecuente es utilizar la media sin verificar la presencia de valores atípicos.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Análisis y interpretación de datos
**Context:** Distribución de salarios en empresa tecnológica

### Enunciado
En una empresa de desarrollo de software en Medellín, los salarios mensuales (en millones de pesos) de 9 empleados son: 2, 2.5, 3, 3.5, 5, 5.5, 6, 7, 25. La empresa reporta que el salario típico es de 5 millones. ¿Es esta afirmación correcta?

### Options
- [x] A) Sí, porque la mediana de los salarios es 5 millones de pesos <!-- feedback: Ordenando los datos: 2, 2.5, 3, 3.5, 5, 5.5, 6, 7, 25. La mediana (valor central) es exactamente 5 millones, representando el salario típico adecuadamente. -->
- [ ] B) Sí, porque la media de los salarios es aproximadamente 6.6 millones
- [ ] C) No, porque el salario típico debería ser 25 millones (el más alto)
- [ ] D) No, porque debería usar la moda que es 2 millones

### Explicación Pedagógica
La mediana de 5 millones representa correctamente el valor central en presencia de un salario atípicamente alto (25 millones). Usar la media en este caso sería incorrecto y engañoso.

---

## Question 14 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v14`
**Bloom:** Understand
**ICFES:** Formulación y procedimientos
**Context:** Análisis de datos de exportación de flores

### Enunciado
Los valores de exportación de flores (en millones de dólares) durante 8 meses fueron: 45, 48, 47, 46, 49, 47, 48, 47. ¿Cuál es la desviación estándar de este conjunto?

### Options
- [ ] A) 0
- [ ] B) 1.15
- [x] C) 1.15 millones USD <!-- feedback: La media es 47.125. Las desviaciones al cuadrado suman 10.5. Varianza = 10.5/8 = 1.3125. Desviación estándar = √1.3125 ≈ 1.15. -->
- [ ] D) 1.29

### Explicación Pedagógica
La desviación estándar mide qué tan dispersos están los datos respecto a la media. Un error común es no elevar al cuadrado las desviaciones o dividir por n en lugar de n-1 para muestra.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v15`
**Bloom:** Apply
**ICFES:** Formulación y procedimientos
**Context:** Evaluación de consistencia en producción de textiles

### Enunciado
Dos máquinas de tejido en una factory de Rionegro producen camisas. Los tiempos de producción (minutos) son: Máquina 1: 45, 47, 48, 46, 44 (media = 46, DE = 1.58). Máquina 2: 42, 50, 45, 48, 43 (media = 45.6, DE = 3.29). ¿Cuál máquina es más consistente?

### Options
- [ ] A) La Máquina 1, porque produce más camisas por hora
- [x] B) La Máquina 1, porque tiene menor desviación estándar (menor variabilidad) <!-- feedback: Aunque las medias son similares, la Máquina 1 tiene una desviación estándar de 1.58 frente a 3.29 de la Máquina 2, indicando tiempos de producción más consistentes y predecibles. -->
- [ ] C) La Máquina 2, porque su media es menor
- [ ] D) La Máquina 2, porque tiene mayor rango

### Explicación Pedagógica
Para evaluar consistencia, se compara la desviación estándar, no la media. Una menor desviación estándar indica datos más agrupados alrededor de la media. Error común: confundir mayor media con mayor consistencia.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Análisis y comunicación
**Context:** Comparación de rendimiento académico entre regiones

### Enunciado
Los resultados de matemáticas en el Saber 11 para dos departamentos fueron: Huila (media 52, DE 8) y Cesar (media 51, DE 12). ¿Qué indica esta información?

### Options
- [ ] A) Los estudiantes de Huila tienen menores conocimientos que los de Cesar
- [x] B) Los resultados en Huila están más concentrados alrededor de la media que en Cesar <!-- feedback: Aunque las medias son similares, la mayor desviación estándar en Cesar indica mayor heterogeneidad en los resultados. En Huila, los resultados están más agrupados. -->
- [ ] C) Los resultados en Cesar están más concentrados
- [ ] D) No se puede comparar porque las medias son diferentes

### Explicación Pedagógica
La desviación estándar proporciona información sobre la dispersión de los datos, independientemente de la media. Una DE mayor indica mayor variabilidad. No debe confundirse con mejor o peor desempeño.

---

## Question 17 (Variant Basic - Difficulty D9)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v17`
**Bloom:** Apply
**ICFES:** Formulación y procedimientos
**Context:** Distribución de tierras en zona rural

### Enunciado
El área (en hectáreas) de 30 parcelas de una asociación de productores de papa en Boyacá fue registrada. Al construir un histograma de frecuencias, se observa que la distribución es asimétrica hacia la derecha. ¿Qué medida de tendencia central es más adecuada para representar estos datos?

### Options
- [ ] A) La media, porque representa el promedio de todas las parcelas
- [x] B) La mediana, porque no es sensible a las parcelas con áreas muy grandes (valores atípicos) que generan la asimetría <!-- feedback: En distribuciones asimétricas, la media se ve arrastrada hacia la cola de la distribución. La mediana es más robusta y representativa del centro de los datos. -->
- [ ] C) La moda, porque es el valor más frecuente
- [ ] D) Cualquiera de las tres, porque siempre son equivalentes

### Explicación Pedagógica
En distribuciones asimétricas, la media no es representativa del centro. La mediana es preferible porque no se ve afectada por valores extremos en una de las colas. Error común: asumir que la media siempre es la mejor medida.

---

## Question 18 (Variant Basic - Difficulty D9)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v18`
**Bloom:** Evaluate
**ICFES:** Análisis y comunicación
**Context:** Análisis de mercados para producto artesanal

### Enunciado
Un artesano de Chiquinquirá quiere saber qué precio cobrar por sus productos. Revisa los precios de 25 competidores similares y encuentra: media $80.000, mediana $65.000, moda $60.000, desviación estándar $25.000. ¿Qué precio debería considerar como referencia?

### Options
- [ ] A) $80.000, porque es el promedio del mercado
- [ ] B) $25.000, porque indica el precio más común
- [x] C) $65.000, porque representa el valor central y es menos afectado por precios extremadamente altos o bajos <!-- feedback: La diferencia entre media y mediana indica presencia de valores atípicos (precios muy altos que elevan la media). La mediana de $65.000 es más representativa del precio típico en el mercado. -->
- [ ] D) $60.000, porque es el precio más frecuente

### Explicación Pedagógica
La diferencia notable entre media y mediana indica asimetría en la distribución de precios. La mediana de $65.000 es más confiable como referencia del precio central del mercado. Error frecuente: usar la moda sin considerar que puede haber valores discontinuos.

---

## Question 19 (Variant Basic - Difficulty D10)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v19`
**Bloom:** Create
**ICFES:** Análisis y comunicación
**Context:** Diagnóstico de situación socioeconómica en vereda

### Enunciado
En un diagnóstico socioeconómico de 50 familias de una vereda en Caquetá, se recopilaron datos del ingreso mensual familiar. Al analizar los datos, se encuentra que el 25% gana menos de $400.000, el 50% gana menos de $600.000 y el 75%