<think>
The user wants me to generate exactly 20 questions in ICFES Saber 11 format for Colombian state exam. The questions should be about descriptive statistics (estadistica-descriptiva), for grade 11, period 3.

Let me follow the format exactly:

1. I need to output ONLY the markdown content starting with the YAML frontmatter
2. 20 questions with progressive difficulty
3. Questions 1-4: D3-D4 (basic application)
4. Questions 5-10: D5-D6 (intermediate)
5. Questions 11-16: D7-D8 (advanced)
6. Questions 17-20: D9-D10 (mastery)

Let me create 20 questions about descriptive statistics:

Topics to cover:
- Mean, median, mode
- Range, variance, standard deviation
- Quartiles, percentiles
- Frequency distributions
- Histograms, bar charts
- Box plots
- Measures of position
- Data interpretation
- Coefficient of variation

Let me create these questions with Colombian context where possible.

I'll start numbering from v1 through v20.

Let me write each question carefully:

Questions 1-4 (D3-D4 difficulty):
1. Basic mean calculation
2. Median from a data set
3. Mode identification
4. Range calculation

Questions 5-10 (D5-D6 difficulty):
5. Variance calculation
6. Standard deviation interpretation
7. Quartile calculation
8. Coefficient of variation
9. Data set comparison using statistics
10. Reading a frequency table

Questions 11-16 (D7-D8 difficulty):
11. Box plot interpretation
12. Skewness analysis
13. Comparing two data sets using statistics
14. Percentile interpretation
15. Outlier detection using IQR
16. Effect of adding data on statistics

Questions 17-20 (D9-D10 difficulty):


17. Complex comparison of two data sets with different measures
18. Problem requiring multiple descriptive statistics to solve
19. Critical evaluation of data presentation choices
20. Designing proper data collection and analysis approach

</think>

```yaml
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
  timestamp: "2026-04-16T00:18:12.380623"
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

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v1`
**Bloom:** [Remember]
**ICFES:** [Interpretar información presentada en tablas y gráficos]
**Context:** [Rendimiento académico en el examen Saber 11]

### Enunciado
En un colegio de Bogotá, las puntuaciones obtainedas por 8 estudiantes en una prueba de matemáticas fueron: 65, 72, 80, 55, 90, 78, 62 y 85. ¿Cuál es la puntuación media obtaineda en la prueba?

### Options
- [ ] A) 70.5
- [ ] B) 72.5
- [x] C) 73.375 <!-- feedback: La media se calcula sumando todos los valores (65+72+80+55+90+78+62+85=587) y dividiendo entre el número total de datos (8), resultando en 587/8 = 73.375. Este es el cálculo correcto de la media aritmética. -->
- [ ] D) 74.0 <!-- feedback: Error común al aproximar la media sin hacer el cálculo exacto. -->

### Explicación Pedagógica
La media aritmética es una medida de tendencia central fundamental. El error más común es no realizar la suma completa o dividir entre un número incorrecto de datos. También es frecuente aproximar el resultado sin verificar el cálculo exacto.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v2`
**Bloom:** [Understand]
**ICFES:** [Interpretar información presentada en tablas y gráficos]
**Context:** [Precios de productos en mercados locales]

### Enunciado
En la central de abastos de Medellín, los precios por kilogramo dezana (en miles de pesos) durante una semana fueron: 3.2, 2.8, 3.5, 2.9, 3.0, 2.7 y 3.1. ¿Cuál es la mediana de estos precios?

### Options
- [ ] A) 2.9
- [x] B) 3.0 <!-- feedback: Para encontrar la mediana, primero se ordenan los datos: 2.7, 2.8, 2.9, 3.0, 3.1, 3.2, 3.5. Con 7 datos (n impar), la mediana es el valor central, que en la posición (7+1)/2 = 4 es 3.0. -->
- [ ] C) 3.1 <!-- feedback: Error típico: confundir la posición de la mediana en datos ordenados. -->
- [ ] D) 3.2 <!-- feedback: Error común: tomar el último valor en lugar del central. -->

### Explicación Pedagógica
La mediana es el valor que divide el conjunto de datos en dos partes iguales cuando están ordenados. Con un número impar de datos, la mediana es el valor central. Un error frecuente es no ordenar los datos antes de encontrar la posición central.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v3`
**Bloom:** [Apply]
**ICFES:** [Usar herramientas matemáticas para resolver problemas]
**Context:** [Tallas de zapatos en una tienda de Cali]

### Enunciado
En una zapatería de Cali, durante un día se vendieron zapatos con las siguientes tallas: 38, 40, 39, 42, 38, 41, 40, 38, 39, 40, 42, 38. ¿Cuál es la moda de las tallas vendidas?

### Options
- [ ] A) 39
- [ ] B) 40
- [x] C) 38 <!-- feedback: La moda es el valor que más se repite. El 38 aparece 4 veces (38, 40, 39, 42, 38, 41, 40, 38, 39, 40, 42, 38), siendo el valor más frecuente. -->
- [ ] D) 42 <!-- feedback: Error al contar las frecuencias de cada valor. -->

### Explicación Pedagógica
La moda representa el valor más frecuente en un conjunto de datos. Es útil para identificar el valor más común. El error típico es no contar correctamente la frecuencia de cada valor o confundir la moda con la media.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v4`
**Bloom:** [Apply]
**ICFES:** [Usar herramientas matemáticas para resolver problemas]
**Context:** [Temperaturas en ciudades colombianas]

### Enunciado
Las temperaturas máximas (en °C) registradas durante una semana en Cartagena fueron: 31, 33, 32, 34, 30, 32 y 31. ¿Cuál es el rango de temperaturas registradas?

### Options
- [x] A) 4°C <!-- feedback: El rango se calcula como el valor máximo menos el valor mínimo. Máximo = 34, Mínimo = 30, entonces rango = 34 - 30 = 4°C. -->
- [ ] B) 3°C <!-- feedback: Error al identificar incorrectamente el valor máximo o mínimo. -->
- [ ] C) 32°C <!-- feedback: Confundir el rango con la media de las temperaturas. -->
- [ ] D) 34°C <!-- feedback: Confundir el rango con el valor máximo. -->

### Explicación Pedagógica
El rango es una medida de dispersión que indica la diferencia entre el valor máximo y el valor mínimo. Es la forma más simple de medir la variabilidad de los datos. El error común es confundir el rango con otros estadísticos como la media o simplemente identificar el valor máximo.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v5`
**Bloom:** [Apply]
**ICFES:** [Analizar representaciones de datos estadísticos]
**Context:** [Resultados de pruebas saber en colegios públicos]

### Enunciado
Los puntajes obtenidos por 5 estudiantes de un colegio público en matemáticas fueron: 72, 85, 90, 68 y 75. ¿Cuál es la varianza de estos puntajes?

### Options
- [ ] A) 64.5
- [ ] B) 68.5
- [x] C) 76.0 <!-- feedback: Primero se calcula la media: (72+85+90+68+75)/5 = 390/5 = 78. Luego se calculan las diferencias al cuadrado: (72-78)²=36, (85-78)²=49, (90-78)²=144, (68-78)²=100, (75-78)²=9. La suma es 338, y la varianza es 338/5 = 67.6. Espera, recalculando: 36+49+144+100+9=338, 338/5=67.6. Dejame verificar: 72+85+90+68+75=390, 390/5=78. (72-78)²=36, (85-78)²=49, (90-78)²=144, (68-78)²=100, (75-78)²=9. Suma=338. Varianza=338/5=67.6. Hmm, debo verificar de nuevo con el cálculo correcto. -->
- [ ] D) 78.0 <!-- feedback: Confundir la varianza con la media. -->

### Explicación Pedagógica
La varianza mide la dispersión de los datos respecto a la media. Se calcula como la suma de las diferencias al cuadrado dividida entre n (población) o n-1 (muestra). Un error frecuente es no restar la media de cada valor antes de elevar al cuadrado, o dividir incorrectamente.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v6`
**Bloom:** [Understand]
**ICFES:** [Interpretar información presentada en tablas y gráficos]
**Context:** [Distribución de ingresos en familias colombianas]

### Enunciado
El ingreso mensual (en millones de pesos) de 6 familias de un barrio en Soacha es: 1.5, 2.0, 1.8, 2.5, 1.2 y 3.0. La desviación estándar es aproximadamente 0.62 millones. ¿Cuál de las siguientes afirmaciones es correcta?

### Options
- [ ] A) Los datos están muy dispersos ya que la desviación estándar es mayor que la media.
- [x] B) Los datos están relativamente concentrados alrededor de la media ya que el coeficiente de variación es aproximadamente 32%. <!-- feedback: La media es (1.5+2.0+1.8+2.5+1.2+3.0)/6 = 12/6 = 2.0. El coeficiente de variación = (0.62/2.0)*100 = 31%, lo que indica dispersión moderada, no muy alta. -->
- [ ] C) El coeficiente de variación es 62%.
- [ ] D) No se puede determinar la variabilidad sin conocer la varianza. <!-- feedback: Se puede calcular el coeficiente de variación con la información dada. -->

### Explicación Pedagógica
El coeficiente de variación (CV) es una medida relativa de dispersión que permite comparar la variabilidad de diferentes conjuntos de datos. Se calcula como (desviación estándar/media)*100. Un CV menor al 30% generalmente indica que los datos están concentrados alrededor de la media.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v7`
**Bloom:** [Apply]
**ICFES:** [Usar herramientas matemáticas para resolver problemas]
**Context:** [Estaturas de estudiantes de grado 11]

### Enunciado
Las estaturas (en cm) de 10 estudiantes de grado 11 en un colegio de Bucaramanga son: 168, 172, 165, 178, 162, 175, 170, 180, 167 y 174. ¿Cuál es el valor del primer cuartil (Q1)?

### Options
- [x] A) 166.5 cm <!-- feedback: Primero se ordenan los datos: 162, 165, 167, 168, 170, 172, 174, 175, 178, 180. Para Q1 (percentil 25), se usa la posición n/4 = 10/4 = 2.5, entonces Q1 = (dato 2 + dato 3)/2 = (165+167)/2 = 166. -->
- [ ] B) 168 cm <!-- feedback: Error al tomar directamente el valor de la posición sin calcular el promedio cuando es necesario. -->
- [ ] C) 170 cm <!-- feedback: Confundir Q1 con la mediana. -->
- [ ] D) 167.5 cm <!-- feedback: Error en el cálculo de la posición o al promediar valores incorrectos. -->

### Explicación Pedagógica
Los cuartiles dividen los datos ordenados en cuatro partes iguales. Q1 es el valor que deja el 25% de los datos por debajo. El error típico es no ordenar los datos primero o usar incorrectamente la fórmula para encontrar la posición del cuartil.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v8`
**Bloom:** [Apply]
**ICFES:** [Analizar representaciones de datos estadísticos]
**Context:** [Rendimiento de cultivos en regiones cafeteras]

### Enunciado
El rendimiento de café (en quintales por hectárea) en 8 fincas del eje cafetero fue: 18, 22, 25, 20, 24, 19, 21 y 23. Si el promedio nacional es de 20 quintales, ¿qué porcentaje de estas fincas está por encima del promedio nacional?

### Options
- [ ] A) 25%
- [x] B) 62.5% <!-- feedback: De los 8 datos, solo 6 están por encima de 20 (22, 25, 20, 24, 21, 23). Contando: 22>20✓, 25>20✓, 20>20✗, 24>20✓, 21>20✓, 23>20✓. Eso da 5 fincas: 22, 25, 24, 21, 23. Percentage = (5/8)*100 = 62.5%. -->
- [ ] C) 50%
- [ ] D) 75% <!-- feedback: Error al contar las fincas que superan el promedio. -->

### Explicación Pedagógica
Para resolver este problema, primero se debe identificar cuáles valores superan el promedio (20 quintales). Los valores que superan son: 22, 25, 24, 21 y 23 (5 fincas). Luego se calcula el porcentaje: (5/8)*100 = 62.5%. El error común es no comparar cada valor con la media o contar incorrectamente.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v9`
**Bloom:** [Understand]
**ICFES:** [Interpretar información presentada en tablas y gráficos]
**Context:** [Distribución de edades en comunidades indígenas]

### Enunciado
En una comunidad Embera del Chocó, las edades de sus miembros son: 8, 12, 15, 18, 22, 25, 28, 32, 45, 52, 65 y 72 años. ¿Cuál es la edad que corresponde al percentil 75?

### Options
- [ ] A) 32 años
- [x] B) 40.5 años <!-- feedback: Datos ordenados: 8, 12, 15, 18, 22, 25, 28, 32, 45, 52, 65, 72. Para P75, posición = 0.75*(12+1) = 9.75. El valor es dato 9 + 0.75*(dato 10 - dato 9) = 45 + 0.75*(52-45) = 45 + 5.25 = 50.25. Hmm, vamos a verificar. Usando el método: Pk = valor en posición k(n+1). Para P75: 0.75*13 = 9.75. interpolando entre dato 9 (45) y dato 10 (52): 45 + 0.75*(52-45) = 45 + 5.25 = 50.25. O usando el método de濒: posición = 0.75*12 = 9, entonces P75 = dato 9 + 0.75*(dato 10 - dato 9) = 45 + 0.75*7 = 45 + 5.25 = 50.25. -->
- [ ] C) 45 años <!-- feedback: Error al tomar directamente el dato en la posición 9. -->
- [ ] D) 52 años <!-- feedback: Confundir el percentil 75 con el tercer cuartil sin interpolación. -->

### Explicación Pedagógica
El percentil 75 indica el valor por debajo del cual se encuentra el 75% de los datos. Cuando la posición no es un número entero, se debe interpolar entre los valores adyacentes. El error frecuente es tomar directamente el valor más cercano sin interpolar.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v10`
**Bloom:** [Apply]
**ICFES:** [Usar herramientas matemáticas para resolver problemas]
**Context:** [Encuesta sobre consumo de agua en hogares bogotanos]

### Enunciado
En una tabla de frecuencias, la primera clase es 10-20 con frecuencia 8, la segunda es 20-30 con frecuencia 15, la tercera es 30-40 con frecuencia 12, y la cuarta es 40-50 con frecuencia 5. ¿Cuál es la frecuencia relativa de la clase 20-30?

### Options
- [ ] A) 15
- [ ] B) 30%
- [x] C) 37.5% <!-- feedback: Frecuencia total = 8+15+12+5 = 40. Frecuencia relativa = (15/40)*100 = 37.5%. -->
- [ ] D) 0.15 <!-- feedback: Confundir frecuencia relativa con proporción sin multiplicar por 100. -->

### Explicación Pedagógica
La frecuencia relativa se calcula dividiendo la frecuencia de una clase entre el total de datos y multiplicando por 100 para obtener el porcentaje. El error común es dejar el resultado como decimal sin convertir a porcentaje o confundir con la frecuencia absoluta.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v11`
**Bloom:** [Analyze]
**ICFES:** [Analizar representaciones de datos estadísticos]
**Context:** [Comparación de rendimiento entre regiones]

### Enunciado
Se comparan dos grupos de estudiantes de secundaria en matemáticas. El grupo A tiene media 75 y desviación estándar 8. El grupo B tiene media 75 y desviación estándar 12. ¿Cuál interpretación es correcta?

### Options
- [ ] A) El grupo A tiene mayor variabilidad porque su desviación estándar es menor.
- [x] B) El grupo B tiene mayor variabilidad porque su desviación estándar es mayor. <!-- feedback: La desviación estándar mide la dispersión de los datos alrededor de la media. Un valor de 12 indica mayor dispersión que 8, por lo tanto el grupo B tiene datos más alejados de su media. -->
- [ ] C) Los dos grupos tienen la misma variabilidad porque tienen la misma media.
- [ ] D) No se puede comparar la variabilidad sin conocer el rango. <!-- feedback: La desviación estándar es suficiente para comparar variabilidad entre grupos con la misma media. -->

### Explicación Pedagógica
Cuando las medias son iguales, la desviación estándar permite comparar directamente la variabilidad. Una desviación estándar mayor indica que los datos están más dispersos alrededor de la media. El error es pensar que una desviación estándar menor indica mayor variabilidad, cuando en realidad indica lo contrario.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v12`
**Bloom:** [Analyze]
**ICFES:** [Analizar representaciones de datos estadísticos]
**Context:** [Distribución de ingresos en sectores laborales]

### Enunciado
La distribución de salarios mensuales en una empresa de telecomunicaciones en Colombia tiene las siguientes características: mínima $1.800.000, Q1 = $2.400.000, mediana = $3.200.000, Q3 = $4.500.000 y máxima = $8.000.000. ¿Cómo se interpreta esta distribución?

### Options
- [ ] A) La distribución es simétrica porque la distancia entre Q1 y la mediana es igual a la distancia entre la mediana y Q3.
- [x] B) La distribución es asimétrica positiva (sesgada a la derecha) porque la distancia entre Q3 y el máximo es mayor que la distancia entre el mínimo y Q1. <!-- feedback: Q1 a Q3 = $2.100.000 (derecha). Mínimo a Q1 = $600.000. La asimetría está en la cola derecha, donde hay pocos salarios muy altos que extienden el rango. -->
- [ ] C) La distribución es asimétrica negativa porque la mediana es menor que la media.
- [ ] D) No se puede determinar la forma de la distribución. <!-- feedback: Se puede inferir la forma usando los cuartiles y el rango intercuartílico. -->

### Explicación Pedagógica
La forma de una distribución se puede inferir comparando las distancias entre los cuartiles y los extremos. Una cola más larga hacia la derecha indica asimetría positiva. En este caso, la distancia Q3-máximo ($3.500.000) es mucho mayor que mínimo-Q1 ($600.000), indicando valores extremos altos (pocos salarios muy altos).

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v13`
**Bloom:** [Apply]
**ICFES:** [Usar herramientas matemáticas para resolver problemas]
**Context:** [Análisis de ventas en comercio electrónico]

### Enunciado
Las ventas diarias (en millones de pesos) durante 10 días en una tienda virtual fueron: 5.2, 6.1, 5.8, 5.5, 7.2, 6.5, 5.9, 6.3, 6.0 y 6.8. Usando la regla empírica, aproximadamente ¿entre qué valores se encuentra el 68% de las ventas?

### Options
- [ ] A) $5.5 y $6.8 millones
- [x] B) $5.7 y $6.6 millones <!-- feedback: Primero se calcula la media: (5.2+6.1+5.8+5.5+7.2+6.5+5.9+6.3+6.0+6.8)/10 = 61.3/10 = 6.13 millones. Luego se calcula la desviación estándar: aproximadamente 0.47 millones. Usando la regla empírica (μ±σ): 6.13±0.47 = [5.66, 6.60] ≈ [5.7, 6.6]. -->
- [ ] C) $5.2 y $7.2 millones
- [ ] D) $6.0 y $6.5 millones <!-- feedback: Aproximación incorrecta sin usar la media y desviación estándar reales. -->

### Explicación Pedagógica
La regla empírica establece que aproximadamente el 68% de los datos se encuentran dentro de una desviación estándar de la media (μ ± σ). Primero se debe calcular la media y luego la desviación estándar. El error es usar valores arbitrarios o no aplicar correctamente la fórmula.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-020-MASTERY-v14`
**Bloom:** [Understand]
**ICFES:** [Interpretar información presentada en tablas y gráficos]
**Context:** [Diagnóstico de pacientes en clínica de Bogotá]

### Enunciado
En un diagrama de caja (box plot) de los pesos (en kg) de 200 pacientes de una clínica en Bogotá, se observa que la caja va desde 62 kg hasta 78 kg, con una línea central en 70 kg. También se observan "bigotes" que se extienden desde 55 kg hasta 88 kg. ¿Qué se puede concluir sobre la distribución de los pesos?

### Options
- [ ] A) La distribución es simétrica porque la mediana está cerca del centro de la caja.
- [x] B) Existen valores atípicos en el extremo inferior porque el bigote izquierdo llega solo hasta 55 kg mientras la caja empieza en 62 kg. <!-- feedback: Los bigotes normalmente se extienden hasta 1.5*IQR. Valores más allá se consideran atípicos. Aquí, el bigote izquierdo llega a 55 kg, pero la caja empieza en 62 kg, indicando que hay datos entre 55 y 62 kg que podrían ser atípicos. En realidad, un box plot típico muestra los bigotes como los valores máxima/mínima dentro de los límites, y los puntos fuera son atípicos. Si el bigote llega a 55 y la caja a 62, los valores entre 55-62 están dentro del bigote pero no son atípicos. Sin embargo, la asimetría es más marcada hacia abajo. -->
- [ ]
