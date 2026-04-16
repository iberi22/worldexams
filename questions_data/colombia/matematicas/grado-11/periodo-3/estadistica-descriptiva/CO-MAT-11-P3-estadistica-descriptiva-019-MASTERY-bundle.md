<think>
Generating 20 ICFES-style questions for Colombian 11th grade Math, focusing on descriptive statistics, period 3. Need to follow strict format, progressive difficulty (D3-D10), Colombian context, and proper markdown structure.

Let me create these questions covering:
- Mean, median, mode
- Standard deviation, variance
- Quartiles, percentiles
- Box plots
- Histograms
- Data representation
- Correlation
- Probability basics
- Surveys and sampling

With difficulty progression:
- Questions 1-4: D3-D4 (basic)
- Questions 5-10: D5-D6 (intermediate)
- Questions 11-16: D7-D8 (advanced)
- Questions 17-20: D9-D10 (mastery)

</think>

---
id: "CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "estadistica-descriptiva"
periodo: 3
protocol_version: "5.1"
bundle_size: 20
bundle_index: 19
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-16T00:12:54.660485"
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

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Identificar características de medidas de tendencia central
**Context:** Encuesta nutricional en colegios de Bogotá

### Enunciado
En una encuesta sobre alimentación saludable realizada en 5 colegios de Bogotá, se registraron los siguientes valores de IMC (índice de masa corporal) de estudiantes de grado 11: 22, 21, 23, 21, 22. ¿Cuál es la mediana de estos datos?

### Options
- [ ] A) 21
- [ ] B) 21.8
- [x] C) 22 <!-- feedback: Al ordenar los datos: 21, 21, 22, 22, 23, el valor central (tercero) es 22. -->
- [ ] D) 23 <!-- feedback: 23 es el valor máximo, no la mediana. La mediana es el valor central cuando los datos están ordenados. -->

### Explicación Pedagógica
La mediana es el valor que ocupa la posición central cuando los datos se ordenan de menor a mayor. Con 5 datos ordenados (21, 21, 22, 22, 23), el tercer valor es 22. El error común es confundir la mediana con la moda (21) o con el promedio (21.8).

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Interpretar información presenteda en tablas de frecuencia
**Context:** Ventas de artesanías en el mercado de Paloquemao

### Enunciado
En una feriad de emprendedores en Medellín, se registraron las ventas diarias de artesanías durante una semana: $120.000, $85.000, $150.000, $120.000, $200.000, $120.000, $95.000. ¿Cuál es la moda de estos valores?

### Options
- [ ] A) $120.000
- [x] B) $120.000 <!-- feedback: La moda es el valor que más se repite. $120.000 aparece 3 veces, más que cualquier otro valor. -->
- [ ] C) $120.000 <!-- feedback: ¡Correcto! La moda es $120.000 porque se repite 3 veces. -->
- [ ] D) $95.000 <!-- feedback: Este es el valor mínimo, no la moda. La moda es el valor con mayor frecuencia. -->

### Explicación Pedagógica
La moda representa el valor que más se repite en un conjunto de datos. El error frecuente es pensar que la moda es el promedio ($127.143) o confundirla con el valor máximo. En este caso, $120.000 se repite 3 veces, siendo claramente la moda.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Calcular medidas de tendencia central en contextos prácticos
**Context:** Tiempos de desplazamiento en TransMilenio

### Enunciado
Los tiempos de desplazamiento (en minutos) de 7 estudiantes desde su casa hasta el colegio usando TransMilenio fueron: 45, 52, 48, 55, 50, 47, 53. ¿Cuál es el promedio (media aritmética) de estos tiempos?

### Options
- [ ] A) 49 minutos
- [ ] B) 50 minutos
- [x] C) 50 minutos <!-- feedback: Media = (45+52+48+55+50+47+53)/7 = 350/7 = 50 minutos. -->
- [ ] D) 55 minutos <!-- feedback: 55 es el valor máximo, no el promedio. El promedio se calcula sumando todos los valores y dividiendo por la cantidad. -->

### Explicación Pedagógica
La media aritmética se calcula sumando todos los valores y dividiendo por el número total de datos. Un error común es sumar incorrectamente o dividir por un número equivocado. La suma es 350 y al dividir entre 7 obtenemos exactamente 50.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Comparar medidas de tendencia central
**Context:** Comparación de salarios mínimos en ciudades colombianas

### Enunciado
En una tabla se presentan los salarios mínimos regionales en millones de pesos: 1.2, 1.5, 1.3, 1.5, 1.4. Al calcular la media, la mediana y la moda, ¿cuál de las siguientes afirmaciones es correcta?

### Options
- [ ] A) La media es mayor que la moda
- [x] B) La mediana y la moda son iguales <!-- feedback: Datos ordenados: 1.2, 1.3, 1.4, 1.5, 1.5. Mediana = 1.4, Moda = 1.5. ¡Son diferentes! -->
- [ ] C) La mediana y la moda son iguales <!-- feedback: Al ordenar: 1.2, 1.3, 1.4, 1.5, 1.5, la mediana (valor central) es 1.4 y la moda (más frecuente) es 1.5. Son diferentes. -->
- [ ] D) Las tres medidas son diferentes <!-- feedback: Necesitas calcular cada una para comparar correctamente. -->

### Explicación Pedagógica
Es importante calcular cada medida correctamente. Ordenando los datos: 1.2, 1.3, 1.4, 1.5, 1.5. Media = 7.9/5 = 1.58, Mediana = 1.4 (tercer valor), Moda = 1.5 (más frecuente). El error común es no ordenar los datos antes de encontrar la mediana.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Calcular e interpretar medidas de dispersión
**Context:** Temperaturas máximas en Cali durante una semana

### Enunciado
Las temperaturas máximas registradas en Cali durante una semana fueron: 32°C, 34°C, 33°C, 35°C, 33°C, 34°C, 33°C. Si la temperatura promedio fue 33.4°C, ¿cuál es la desviación media absoluta?

### Options
- [ ] A) 0.6°C
- [x] B) 0.86°C <!-- feedback: Desviaciones: |32-33.4|=1.4, |34-33.4|=0.6, |33-33.4|=0.4, |35-33.4|=1.6, |33-33.4|=0.4, |34-33.4|=0.6, |33-33.4|=0.4. Suma=6.0, DM=6.0/7≈0.86°C -->
- [ ] C) 1.4°C <!-- feedback: Este es solo el valor máximo de desviación, no el promedio de todas las desviaciones. -->
- [ ] D) 6.0°C <!-- feedback: Esta es la suma de las desviaciones absolutas, falta dividir por el número de datos. -->

### Explicación Pedagógica
La desviación media absoluta es el promedio de las diferencias absolutas entre cada dato y la media. Muchos estudiantes olvidan dividir la suma total por el número de datos (n=7). También confunden el resultado con la suma total de desviaciones.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v6`
**Bloom:** Understand
**ICFES:** Interpretar diagramas de caja en contextos reales
**Context:** Distribución de edades en el Festival de Teatro de Bogotá

### Enunciado
El diagrama de caja (boxplot) muestra la distribución de edades de los asistentes al Festival Iberoamericano de Teatro de Bogotá. El bigote inferior está en 18 años, Q1 en 25 años, la mediana en 32 años, Q3 en 40 años y el bigote superior en 55 años. ¿Qué porcentaje aproximado de asistentes tiene edades entre 25 y 40 años?

### Options
- [ ] A) 25%
- [ ] B) 40%
- [x] C) 50% <!-- feedback: El rango intercuartílico (Q1 a Q3) contiene aproximadamente el 50% de los datos. Esto es una propiedad fundamental del boxplot. -->
- [ ] D) 75% <!-- feedback: Este sería el porcentaje de datos entre los bigotes (18 a 55), no entre Q1 y Q3. -->

### Explicación Pedagógica
En un diagrama de caja, el rango intercuartílico (espacio entre Q1 y Q3) contiene aproximadamente el 50% central de los datos. Esta es una propiedad fundamental de los cuartiles. El error común es creer que cada cuartil representa el 25% desde el mínimo hasta Q1 o desde Q3 hasta el máximo.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Calcular varianza y desviación estándar
**Context:** Resultados de pruebas Saber 11 en un colegio de Bucaramanga

### Enunciado
Las puntuaciones obtenidas por 5 estudiantes en una prueba piloto de matemáticas fueron: 75, 80, 85, 90, 70. ¿Cuál es la varianza de estas puntuaciones?

### Options
- [ ] A) 50 puntos²
- [x] B) 50 puntos² <!-- feedback: Media = 400/5 = 80. Cuadrados de desviaciones: 25, 0, 25, 100, 100. Suma = 250. Varianza = 250/5 = 50. -->
- [ ] C) 10 puntos² <!-- feedback: Este es el valor de la desviación estándar, no de la varianza. La varianza es la desviación estándar al cuadrado. -->
- [ ] D) 250 puntos² <!-- feedback: Este es el numerador (suma de cuadrados), falta dividir por n para obtener la varianza. -->

### Explicación Pedagógica
La varianza se calcula como la suma de los cuadrados de las desviaciones dividida por n. Un error frecuente es no elevar al cuadrado las desviaciones o no dividir por n. Además, confundir varianza (50) con desviación estándar (~7.07) es común.

---

## Question 8 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v8`
**Bloom:** Understand
**ICFES:** Interpretar tablas de frecuencia con datos agrupados
**Context:** Alturas de estudiantes de Educación Física en la Universidad del Valle

### Enunciado
En una tabla de frecuencias con intervalos de clase para las alturas (en cm) de estudiantes de Educación Física, el intervalo 165-170 tiene una frecuencia de 12 estudiantes y el siguiente intervalo 170-175 tiene 18 estudiantes. Si el punto medio del primer intervalo es 167.5 cm, ¿cuál es el punto medio del segundo intervalo?

### Options
- [ ] A) 167.5 cm
- [ ] B) 170.0 cm
- [x] C) 172.5 cm <!-- feedback: El punto medio se calcula como (límite inferior + límite superior)/2. Para 170-175: (170+175)/2 = 172.5 cm. -->
- [ ] D) 175.0 cm <!-- feedback: 175 es el límite superior del intervalo, no el punto medio. El punto medio es el promedio de los límites. -->

### Explicación Pedagógica
El punto medio (marca de clase) de un intervalo se calcula sumando los límites inferior y superior y dividiendo por 2. El error frecuente es confundir el punto medio con uno de los límites o no saber cómo calcularlo correctamente.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Calcular percentiles en distribuciones de datos
**Context:** Distribución de ingresos en una empresa de tecnología en Medellín

### Enunciado
Los salarios mensuales (en millones de pesos) de 20 empleados de una empresa de tecnología en Medellín son: 2.5, 2.8, 3.0, 3.2, 3.5, 3.8, 4.0, 4.2, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 8.0, 9.0, 10.0, 12.0, 15.0, 20.0. ¿En qué percentil se encuentra un salario de 6.5 millones?

### Options
- [ ] A) Percentil 50
- [ ] B) Percentil 65
- [x] C) Percentil 70 <!-- feedback: P = (número de valores menores o iguales / n) × 100. Hay 14 valores ≤ 6.5, entonces (14/20)×100 = 70. Es el percentil 70. -->
- [ ] D) Percentil 75 <!-- feedback: Faltaría contar cuántos valores son menores o iguales a 6.5 para calcular correctamente el percentil. -->

### Explicación Pedagógica
El percentil se calcula contando cuántos valores son menores o iguales al dato en cuestión, dividiendo por n y multiplicando por 100. Un error común es no ordenar los datos o no contar correctamente la posición.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v10`
**Bloom:** Analyze
**ICFES:** Comparar dispersiones usando el coeficiente de variación
**Context:** Comparación de precios en mercados de Bogotá y Cúcuta

### Enunciado
En dos tiendas de abarrotes en ciudades diferentes, los precios de la misma canasta básica (en miles de pesos) tienen: Tienda A: promedio 85, desviación estándar 10; Tienda B: promedio 75, desviación estándar 9. ¿Cuál tienda tiene mayor variación relativa en sus precios?

### Options
- [ ] A) Tienda A porque tiene mayor desviación estándar
- [ ] B) Tienda B porque tiene menor promedio
- [x] C) Tienda A porque su coeficiente de variación es 11.76% vs 12% de B <!-- feedback: CV(A) = (10/85)×100 ≈ 11.76%; CV(B) = (9/75)×100 = 12%. Tienda B tiene mayor CV. -->
- [ ] D) Tienda B porque su coeficiente de variación es 12% <!-- feedback: Para determinar cuál es mayor, debes comparar ambos coeficientes. Tienda A tiene 11.76%, Tienda B tiene 12%, por lo tanto Tienda B tiene mayor variación relativa. -->

### Explicación Pedagógica
El coeficiente de variación (CV) permite comparar la dispersión de dos conjuntos de datos con diferentes promedios. Se calcula como (desviación estándar/promedio)×100. Un error frecuente es comparar las desviaciones estándar directamente sin considerar los promedios.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Analizar relaciones entre variables usando correlación
**Context:** Relación entre horas de estudio y resultados en ICFES en Santander

### Enunciado
Un investigador quiere determinar si existe una relación lineal entre las horas semanales de estudio y el puntaje obtained en la prueba Saber 11 para estudiantes de Santander. ¿Cuál gráfico sería más adecuado para visualizar esta relación?

### Options
- [ ] A) Un histograma de frecuencias
- [ ] B) Un diagrama de torta
- [x] C) Un diagrama de dispersión (nube de puntos) <!-- feedback: El diagrama de dispersión permite visualizar la relación entre dos variables cuantitativas, ideal para identificar patrones lineales o no lineales. -->
- [ ] D) Un diagrama de caja <!-- feedback: El diagrama de caja es útil para comparar distribuciones de una variable, no para relacionar dos variables. -->

### Explicación Pedagógica
El diagrama de dispersión muestra pares de valores (x, y) como puntos en el plano, permitiendo identificar tendencias, relaciones lineales o patrones entre dos variables cuantitativas. Los otros gráficos son inadecuados para mostrar relaciones entre variables.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Interpretar medidas de asimetría
**Context:** Distribución de tierras en zonas rurales del Valle del Cauca

### Enunciado
En un estudio sobre la distribución de hectáreas de tierra entre campesinos de una vereda del Valle del Cauca, la media es 25 hectáreas, la mediana es 15 hectáreas y la moda es 10 hectáreas. ¿Qué tipo de asimetría presenta esta distribución?

### Options
- [ ] A) Simétrica
- [x] B) Assimetría positiva (a la derecha) <!-- feedback: Cuando la media > mediana > moda, hay asimetría positiva. Aquí: media (25) > mediana (15) > moda (10). Esto indica valores extremos altos que arrastran la media. -->
- [ ] C) Assimetría negativa (a la izquierda)
- [ ] D) No se puede determinar sin más información

### Explicación Pedagógica
En distribuciones con asimetría positiva, la media se ubica a la derecha de la mediana y la moda, porque valores extremadamente altos arrastran el promedio. El error común es invertir la relación o no conocer el criterio de comparación.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Interpretar el coeficiente de correlación de Pearson
**Context:** Relación entre consumo de energía y factura mensual en Cartagena

### Enunciado
En un estudio sobre el consumo de energía eléctrica en hogares de Cartagena, se calculó un coeficiente de correlación de Pearson r = -0.92 entre el número de electrodomésticos y el consumo mensual. ¿Cómo se interpreta este resultado?

### Options
- [ ] A) A mayor número de electrodomésticos, mayor consumo
- [ ] B) No hay correlación entre las variables
- [x] C) Hay una correlación lineal negativa muy fuerte, es decir, a mayor electrodomésticos, menor consumo (lo cual es extraño e indica un error en los datos o la presencia de outlier <!-- feedback: Un r = -0.92 indica correlación lineal negativa muy fuerte. Sin embargo, una correlación negativa entre electrodomésticos y consumo sería ilógica, sugiriendo problemas en los datos. -->
- [ ] D) El coeficiente indica que el consumo causa más electrodomésticos

### Explicación Pedagógica
El coeficiente de Pearson (r) varía de -1 a 1. Valores cercanos a -1 indican correlación negativa fuerte, cercanos a 1 correlación positiva fuerte, y cercanos a 0 ausencia de correlación lineal. Un error conceptual común es confundir correlación con causalidad.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v14`
**Bloom:** Understand
**ICFES:** Construir e interpretar histogramas
**Context:** Distribución de edades en el Carnaval de Barranquilla

### Enunciado
Al representar en un histograma las edades de los asistentes al Carnaval de Barranquilla 2024, se observa que las barras tienen alturas proporcionales a las frecuencias y anchos de clase iguales. ¿Qué representa el área de cada barra?

### Options
- [ ] A) La frecuencia absoluta de la clase
- [ ] B) La frecuencia relativa de la clase
- [x] C) La frecuencia absoluta de la clase (cuando anchos son iguales) <!-- feedback: En un histograma con anchos de clase iguales, el área = altura × ancho = frecuencia × 1 = frecuencia. Cuando los anchos son diferentes, se usa área para representar frecuencias. -->
- [ ] D) La moda de los datos

### Explicación Pedagógica
En histogramas con intervalos de clase de igual ancho, el área de cada barra es proporcional a la frecuencia. Cuando los anchos de clase son diferentes, es crucial usar el área para representar frecuencias, no solo la altura. El error común es confundir altura con frecuencia.

---

## Question 15 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Evaluar la pertinencia de medidas estadísticas según el contexto
**Context:** Salarios en empresa con pocos empleados de altos ingresos en Medellín

### Enunciado
En una empresa de 10 empleados en Medellín, 9 ganan $2.000.000 mensuales y 1 gana $20.000.000. El gerente quiere contratar un nuevo empleado y necesita una medida de tendencia central representativa de lo que ganan los empleados. ¿Cuál medida le recomendaría?

### Options
- [ ] A) La media, porque incluye todos los valores
- [x] B) La mediana, porque no es afectada por el valor extremo <!-- feedback: La mediana (2.000.000) es más representativa del grupo típico, mientras que la media (3.800.000) está distorsionada por el valor extremo de $20.000.000. -->
- [ ] C) La moda, porque es el valor más frecuente
- [ ] D) El rango, porque muestra la dispersión

### Explicación Pedagógica
Cuando hay valores extremos (outliers), la mediana es más representativa que la media porque no se distorsiona por valores atípicos. En este caso, 9 de 10 empleados ganan $2.000.000, por lo que la mediana refleja mejor la realidad del grupo típico.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Analizar el efecto de valores atípicos en estadísticas
**Context:** Ventas mensuales en almacén de ropa en Bucaramanga

### Enunciado
Las ventas mensuales (en millones) de un almacén de ropa en Bucaramanga durante 6 meses fueron: 15, 16, 17, 15, 14, 85. El dueño afirma que sus ventas promedio son de $15.6 millones. ¿Cuál análisis es correcto?

### Options
- [ ] A) El promedio es correcto y representativo
- [ ] B) El promedio es correcto pero no representativo por el valor atípico
- [x] C) El promedio es mathematically correcto (15.6) pero no representativo de la tendencia central debido al outlier de 85 millones <!-- feedback: La media = 162/6 = 27, no 15.6. La afirmación del dueño es incorrecta. Sin embargo, el punto clave es que el valor 85 distorsiona la media, por lo que la mediana sería más adecuada. -->
- [ ] D) El promedio no es correcto porque los datos están mal collected

### Explicación Pedagógica
La media real es 27 (162/6), no 15.6. Sin embargo, el valor de 85 es claramente un outlier que distorsiona la media. Este tipo de error muestra la importancia de verificar cálculos y considerar medidas robustas cuando hay valores extremos.

---

## Question 17 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Evaluar la representatividad de una muestra
**Context:** Encuesta de intención de voto para elecciones estudiantiles en Pasto

### Enunciado
Para conocer la intención de voto de los 2000 estudiantes de un colegio en Pasto para la personería estudiantil, un grupo de estudiantes encuesta solo a los compañeros que asisten a un torneo de fútbol. ¿Qué problema fundamental tiene esta muestra?

### Options
- [ ] A) El tamaño de la muestra es muy pequeño
- [x] B) La muestra es sesgada porque solo incluye estudiantes interesados en fútbol <!-- feedback: Al muestrear solo asistentes al torneo de fútbol, se excluye sistemáticamente a estudiantes que no asisten a estos eventos, generando un sesgo de selección. -->
- [ ] C) Falta aleatoriedad en la selección de participantes
- [ ] D) Todas las anteriores

### Explicación Pedagógica
Este es un ejemplo clásico de sesgo de selección. La muestra no representa a toda la población porque solo incluye un subgrupo específico (interesados en fútbol). Una muestra aleatoria simple o estratificada sería más apropiada para obtener conclusiones válidas.

---

## Question 18 (Variant Basic - Difficulty D9)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-