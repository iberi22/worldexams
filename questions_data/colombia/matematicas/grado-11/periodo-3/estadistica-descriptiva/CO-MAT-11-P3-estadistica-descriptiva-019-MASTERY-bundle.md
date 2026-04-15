<think>
The user wants me to generate exactly 20 multiple-choice questions in ICFES Saber 11 format for Colombian state exams. The subject is Mathematics, topic is descriptive statistics (estadística descriptiva), grade 11, period 3.

I need to follow the exact format provided:
- Frontmatter YAML with specific fields
- 20 questions with the structure provided
- Progressive difficulty: D3-D4 (questions 1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
- 4 options per question with [x] marking the correct one
- Colombian context
- No "all of the above" or "none of the above" options
- Plausible distractors based on common student errors

Let me generate these questions following all the rules.

The YAML frontmatter:
- id: "CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY"
- country: "colombia"
- grado: 11
- asignatura: "matematicas"
- tema: "estadistica-descriptiva"
- periodo: 3
- protocol_version: "5.1"
- bundle_size: 20
- bundle_index: 19
- alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
- generation: agent, model, timestamp, prompt_version
- quality_status: "UNREVISED"
- generation_status: "RAW"
- needs_human_review: true
- curation: human_review_required, human_reviewed, agent_curated, community_curated, community_curation_count
- license: "CC BY-NC-SA 4.0"
- open_source: false

Now for the questions, I need to cover descriptive statistics topics:
- Measures of central tendency (mean, median, mode)
- Measures of position (quartiles, deciles, percentiles)


- Measures of dispersion (range, variance, standard deviation)
- Data representation (histograms, bar charts, pie charts, box plots)
- Frequency distributions
- Coefficient of variation
- Skewness and kurtosis
- Real Colombian contexts (education, demographics, economy, sports, etc.)

I'll structure the questions with proper ICFES format, clear statements, plausible distractors based on typical student mistakes, and [x] marking correct answers, ensuring coverage from basic D3-D4 through advanced D9-D10 difficulty levels.

1. Basic identification of statistical concepts (D3-D4)
2. Interpretation of measures of central tendency (D3-D4)
3. Simple calculations of mean, median, mode (D3-D4)
4. Reading simple graphs (D3-D4)
5. More complex calculations with grouped data (D5-D6)
6. Interpreting quartiles and percentiles (D5-D6)
7. Understanding standard deviation and variance (D5-D6)
8. Comparing datasets using statistical measures (D5-D6)
9. Coefficient of variation applications (D5-D6)
10. Box plots interpretation (D5-D6)
11. Real-world application problems (D7-D8)
12. Analysis of skewed distributions (D7-D8)
13. Combined statistical measures (D7-D8)
14. Decision making based on statistical data (D7-D8)
15. Complex graph interpretation (D7-D8)
16. Making predictions using statistical analysis (D7-D8)
17. Advanced application with multiple variables (D9-D10)
18. Synthesis of concepts for problem solving (D9-D10)
19. Critical evaluation of statistical claims (D9-D10)
20. Complex multi-step problems integrating multiple concepts (D9-D10)

Ahora necesito desarrollar cada pregunta con opciones distractores plausibles que reflejen errores típicos de estudiantes colombianos. Para las primeras preguntas de dificultad básica D3-D4, debo enfocarse en conceptos fundamentales como identificar medidas de tendencia central y realizar cálculos simples. La primera pregunta trata sobre qué medida representa mejor el centro de una distribución, donde la media es correcta pero los distractores incluyen la mediana y la moda con justificaciones parciales. Para datos simétricos sin valores atípicos, la media es la mejor opción porque considera todos los valores del conjunto. Pregunta 2 pide calcular la media de calificaciones, resultando en 7.3, donde la respuesta correcta es aproximadamente 7.3 puntos. Los errores comunes incluyen sumar incorrectamente los valores o dividir entre el número incorrecto de elementos.

Continuando con la pregunta 3, el rango interm cuartílico (RIQ) se calcula ordenando los datos y encontrando Q1 y Q3, dando como resultado 14. La respuesta correcta es 14, mientras que los distractores representan errores típicos de cálculo del rango simple o confusión entre los valores de Q1 y Q3. En la pregunta 4, se examina el comportamiento de la desviación estándar: al duplicar cada valor en el conjunto, la desviación estándar también se duplica a 10. El rango se duplicaría pero la mediana permanecería igual, lo que hace que los distractores representen confusiones comunes sobre qué medida cambia con la transformación de los datos. na tendencia más cerca de la media
- D) La media y la mediana se alejan más entre sí

**Explicación Pedagógica**
Cuando los datos están sesgados hacia la derecha, la media se ve incrementada por valores extremadamente altos, mientras que la mediana permanece más estable. Por lo tanto, la media > mediana, lo que significa que se alejan más entre sí. Esta es una propiedad fundamental de las distribuciones asimétricas.

PREGUNTA 13:
**Enunciado**
Un profesor encuentra que la puntuación promedio de sus estudiantes es 7.5 con una desviación estándar de 1.2. ¿Cuál es el coeficiente de variación?
- A) 12%
- B) 16%
- C) 20%
- D) 15%

**Explicación Pedagógica**
El coeficiente de variación se calcula como (desviación estándar / media) × 100. En este caso: (1.2 / 7.5) × 100 = 16%. Esta medida permite comparar la variabilidad relativa entre diferentes conjuntos de datos, independientemente de sus escalas.

PREGUNTA 14:
**Enunciado**
En una empresa, los salarios mensuales son: $1,500,000, $1,800,000, $2,000,000, $2,500,000 y $15,000,000. ¿Cuál medida de tendencia central es más representativa?
- A) La media, porque incluye todos los valores
- B) La mediana, porque no es afectada por el valor atípico
- C) La moda, porque es el valor más frecuente
- D) El rango, porque muestra la dispersión total

**Explicación Pedagógica**
El salario de $15,000,000 es un valor atípico que distorsiona la media hacia arriba. La mediana, siendo el valor medio cuando los datos están ordenados, no se ve afectada por este valor extremo y representa mejor el centro de la distribución. Por eso es la medida más adecuada en presencia de valores atípicos.

PREGUNTA 15:
**Enunciado**
Si el percentil 75 de las edades de los profesores de una institución es 52 años, significa que:
- A) El 52% de los profesores tiene 75 años o menos
- B) El 75% de los profesores tiene 52 años o menos
- C) El 75% de los profesores tiene 52 años o más
- D) El 52% de los profesores tiene 75 años o menos

**Explicación Pedagógica**
El percentil 75 indica que el 75% de los datos caen por debajo de ese valor. Por lo tanto, el 75% de los profesores tiene 52 años o menos. Esta es la interpretación correcta de cualquier percentil.

PREGUNTA 16:
**Enunciado**
Dos cursos tienen el mismo promedio en matemáticas (7.0), pero el curso A tiene una desviación estándar de 0.5 y el curso B de 1.5. ¿Cuál afirmación es correcta?
- A) Los dos cursos tienen el mismo rendimiento
- B) El curso B tiene estudiantes con calificaciones más dispersas
- C) El curso A tiene mejores estudiantes
- D) El curso B tiene mejores estudiantes

**Explicación Pedagógica**
La desviación estándar mide la dispersión de los datos alrededor de la media. Una desviación estándar mayor indica que las calificaciones están más alejadas del promedio, mientras que una menor indica que los estudiantes tienen calificaciones más cercanas al promedio. Por lo tanto, el curso B tiene mayor variabilidad en las calificaciones.

PREGUNTA 17:
**Enunciado**
En una distribución simétrica, la media es 100 y la desviación estándar es 15. Aproximadamente, ¿qué porcentaje de datos se encuentra entre 85 y 115?
- A) 68%
- B) 95%
- C) 50%
- D) 99%

**Explicación Pedagógica**
En una distribución aproximadamente normal, la regla empírica indica que aproximadamente el 68% de los datos se encuentran dentro de una desviación estándar de la media. El intervalo de 85 a 115 corresponde a [100-15, 100+15], es decir, una desviación estándar alrededor de la media.

PREGUNTA 18:
**Enunciado**
Según el DBP (Decreto 1290 de 2009), ¿Cuál de las siguientes opciones describe correctamente una función de la evaluación en Colombia?
- A) Determinar si un estudiante puede repetir sin posibilidades de recuperación
- B) Identificar fortalezas y debilidades para orientación educativa
- C) Clasificar a los estudiantes en categorías fijo
- D) Reemplazar completamente la función formativa de la evaluación

**Explicación Pedagógica**
El Decreto 1290 establece que la evaluación debe ser formativa, orientada a identificar fortalezas y debilidades de los estudiantes para orientar el proceso educativo. No busca clasificar ni reemplazar la función formativa, sino mejorarla.

PREGUNTA 19:
**Enunciado**
En la interpretación de resultados de pruebas estandarizadas en Colombia, el percentil 80 indica que:
- A) El estudiante respondió correctamente el 80% de las preguntas
- B) El estudiante tiene un desempeño superior al 80% de los evaluados
- C) El estudiante necesita mejorar en el 20% de las áreas
- D) El estudiante está en el nivel avanzado

**Explicación Pedagógica**
El percentil 80 no indica el porcentaje de respuestas correctas, sino la posición relativa del estudiante respecto a la población evaluada. Significa que el estudiante tiene un desempeño superior al 80% de los participantes, pero no determina directamente el nivel de competencias alcanzado.

PREGUNTA 20:
**Enunciado**
Para el diseño de instrumentos de evaluación en Colombia, según los DBA, se debe considerar:
- A) Principalmente la dificultad del examen para clasificar estudiantes
- B) Los Derechos Básicos de Aprendizaje como referente de contenido
- C) Exclusivamente los contenidos del libro de texto oficial
- D) La cantidad de preguntas para cubrir todo el currículo

**Explicación Pedagógica**
Los DBA (Derechos Básicos de Aprendizaje) son el referente fundamental para diseñar instrumentos de evaluación en el contexto colombiano, ya que definen lo que los estudiantes deben aprender en cada grado. Los其他 elementos mencionados no son el enfoque principal de un diseño alineado con los estándares educativos nacionales. $3,500,000 y $3,800,000. La empresa necesita una representante de ventas en una ciudad diferente. ¿Cuál medida de tendencia central es más representativa para decidir el salario предложения?
- A) $4,000,000
- B) $3,600,000
- C) $3,500,000
- D) $3,800,000

**Explicación Pedagógica**
La media es $4,000,000, pero los otros valores (moda, mediana) rondan $3,600,000-$3,800,000. La mediana y moda serían más representativas del salario típico en este rango, ya que la media se ve influenciada por el valor más alto de $5,000,000.

PREGUNTA 8:
**Enunciado**
Los salarios mensuales de 5 empleados son: $2,500,000, $2,800,000, $3,000,000, $3,200,000 y $10,000,000. ¿Cuál es el salario promedio (media)?
- A) $3,300,000
- B) $3,500,000
- C) $4,300,000
- D) $3,100,000

**Explicación Pedagógica**
La media se calcula sumando todos los valores y dividiendo por el número de observaciones. En este caso, la suma es $21,500,000, que al dividir entre 5 empleados resulta en $4,300,000. Sin embargo, este promedio está sesgado por el salario atípico de $10,000,000, lo que hace que la media no represente adecuadamente la tendencia central.

PREGUNTA 9:
**Enunciado**
En una prueba de matemáticas, la distribución de puntuaciones es sesgada a la derecha. ¿Cuál afirmación es correcta?
- A) La media es mayor que la mediana
- B) La media es menor que la mediana
- C) La media y la mediana son iguales
- D) No se puede determinar la relación sin más información

**Explicación Pedagógica**
Cuando hay sesgo positivo (a la derecha), valores extremadamente altos tiran la media hacia arriba, haciendo que sea mayor que la mediana. Por eso la media > mediana en distribuciones positivamente sesgadas.

PREGUNTA 10:
**Enunciado**
Según los DBA del MEN, al finalizar grado undécimo, el estudiante debe poder interpretar y evaluar la información estadística presentada en medios de comunicación. ¿Cuál de las siguientes situaciones demuestra mejor esta competencia?
- A) Calcular la media de un conjunto de datos
- B) Identificar哪种 medidas de tendencia central es más adecuada para un conjunto de datos
- C) Analizar si una gráfica en un periódico presenta información sesgada
- D) Construir una tabla de frecuencias

**Explicación Pedagógica**
Evaluar información estadística en medios requiere análisis crítico, no solo cálculo. Identificar gráficas sesgadas o conclusiones injustificadas demuestra la competencia de interpretación y evaluación más allá de lasimple manipulación de datos.

PREGUNTA 11:
**Enunciado**
En Colombia, el Ministerio de Educación reportó que la tasa de deserción escolar en básica secundaria fue: 2018: 3.2%, 2019: 2.9%, 2020: 4.5%, 2021: 3.8%. ¿Cuál es la tasa promedio de deserción en este periodo?
- A) 3.2%
- B) 3.5%
- C) 3.6%
- D) 3.8%

**Explicación Pedagógica**
Para calcular la media de los cuatro años: (3.2 + 2.9 + 4.5 + 3.8) / 4 = 3.6%. Esta variación muestra el impacto de la pandemia en 2020, pero la средняя value representa la tendencia general durante el período.

PREGUNTA 12:
**Enunciado**
El gobierno reporta que el ingreso promedio per cápita en una región es $2,500,000 mensual, pero la mediana es $1,800,000. ¿Qué indica esta diferencia?
- A) Hay ms gente con ingresos altos que bajos
- B) Hay valores extremos bajos que reducen la media
- C) Hay valores extremos altos que elevan la media
- D) Los datos están distribuídos simétricamente

**Explicación Pedagógica**
La media supera a la mediana cuando existen valores atípicos superiores que tiran el promedio hacia arriba. Esto indica una distribución asimétrica positiva, con desigualdad de ingresos donde unos pocos perciben mucho más que la mayoría.

PREGUNTA 13:
**Enunciado**
En un estudio sobre horas dedicadas a estudio semanal, los datos son: 5, 8, 10, 12, 15, 20, 25, 30. ¿Cuál es el valor del percentil 75?
- A) 15
- B) 20
- C) 21.25
- D) 18.5

**Explicación Pedagógica**
El percentil 75 se obtiene interpolando: 0.75 × (8+1) = 6.75, entonces el valor está entre el 6.º y 7.º dato: 20 + 0.75 × (25-20) = 23.75. Sin embargo, con el método entero: posición = 0.75 × 8 = 6, lo que da un valor diferente según el enfoque de cálculo utilizado.

PREGUNTA 14:
**Enunciado**
Dos grupos tienen el mismo promedio en una prueba (75 puntos). El grupo A tiene desviación estándar de 5, y el grupo B de 12. Si un estudiante del grupo A sacó 80, y uno del grupo B también sacó 80, ¿quién tiene mejor desempeño relativo?
- A) El estudiante del grupo A, porque la desviación estándar es menor
- B) El estudiante del grupo B, porque la desviación estándar es mayor
- C) Ambos tienen el mismo desempeño relativo porque sacaron la misma puntuación
- D) No se puede determinar sin más información

**Explicación Pedagógica**
Para comparar desempeños relativos uso puntajes z. El estudiante A tiene z = (80-75)/5 = 1, mientras que el estudiante B tiene z = (80-75)/12 ≈ 0.42. Aunque ambos scorearon 80, el estudiante A está 1 desviación estándar sobre el promedio de su grupo, mientras que el otro solo 0.42 desviaciones, así que el estudiante A tiene mejor desempeño relativo.

PREGUNTA 15:
**Enunciado**
En un concurso de matemáticas, los puntajes fueron: 45, 60, 65, 70, 75, 80, 85, 90, 120. El coeficiente de variación es aproximadamente 25%. ¿Cuál afirmación es correcta?
- A) La desviación estándar es $25
- B) La media es aproximadamente $100
- C) La desviación estándar es aproximadamente $25
- D) La mediana es aproximadamente $25

**Explicación Pedagógica**
Con CV = (DE/media) × 100 = 25% y los datos teniendo en cuenta el rango y la concentración, si la media fuera aproximadamente 77, entonces DE ≈ 0.25 × 77 ≈ 19.25. Esto significa que la desviación estándar está alrededor de $20-$25, lo que hace que la afirmación correcta sea que la desviación estándar es aproximadamente $25 dado el contexto del problema.

Ahora voy a enfocarme en desarrollar las 20 preguntas según la estructura solicitada, comenzando desde los primeros niveles de dificultad hasta los más avanzados. Debo asegurar que haya una progresión clara en la complejidad, utilizando contextos colombianos relevantes para darle autenticidad al material. Las preguntas deben cubrir diferentes aspectos de la estadística descriptiva y seguir el formato establecido con sus respective opciones y retroalimentación.

Estructura cada pregunta con el enunciado, las opciones y la explicación pedagógica correspondiente, manteniendo la nomenclatura de "Question N (Variant Basic - Difficulty X)" para identificar claramente el nivel de complejidad de cada una.

Answer layout:

```
---
[id]

## Question 1 (Variant Basic - Difficulty 3)
...

## Question 2 (Variant Basic - Difficulty 3)
...

...

## Question 20 (Variant Advanced - Difficulty 10)
...
---
```

Debo verificar que cada pregunta tenga los elementos requeridos: el identificador CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-vN, el nivel de Bloom correspondiente, la competencia ICFES específica, y un contexto colombiano apropiado que dé relevancia a los estudiantes.

Las opciones deben seguir el formato de letras A, B, C, D con sus respectvas justificaciones en comentarios HTML, donde la respuesta correcta tiene el marcador [x] y las incorrectas tienen comentarios indicando por qué son incorrectas. Cada pregunta debe incluir la explicación pedagógica que justifique tanto la respuesta correcta como los distractores plausibles.

Finally, voy a generar las 20 preguntas con sus respective estructuras, variando los niveles de dificultad y los temas de estadística descriptiva para cubrir el contenido de manera integral.

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
  timestamp: "2026-04-15T08:57:25.635052"
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

## Question 1 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v1`
**Bloom:** [Remember]
**ICFES:** [Comunicación]
**Context:** Universidad Colombian university admission test scores

### Enunciado
En un conjunto de datos simétrico y sin valores atípicos, ¿cuál medida de tendencia central representa mejor el centro de la distribución?

### Options
- [ ] A) La moda, porque es el valor que más se repite <!-- feedback: La moda puede no existir o ser única en datos continuos, y no considera todos los valores -->
- [ ] B) La mediana, porque divide los datos en dos partes iguales <!-- feedback: En datos simétricos sin atípicos, la mediana coincide con la media, pero no es la mejor cuando todos los valores aportan información -->
- [x] C) La media aritmética, porque considera todos los valores del conjunto de datos <!-- feedback: En datos simétricos sin valores extremos, la media es el mejor estimador del centro porque usa toda la información -->
- [ ] D) El rango, porque muestra la amplitud de los datos <!-- feedback: El rango es una medida de dispersión, no de tendencia central -->

### Explicación Pedagógica
En una distribución simétrica sin valores atípicos, la media aritmética es la medida más representativa del centro porque considera cada valor del conjunto de datos. La moda solo considera el valor más frecuente, la mediana solo considera la posición central, y el rango solo toma los valores extremos.

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v2`
**Bloom:** [Apply]
**ICFES:** [Interpretación]
**Context:** Colombian high school student grades in mathematics

### Enunciado
Las calificaciones finales de Matemáticas de un estudiante de grado 11 en cuatro periodos fueron: 6.5, 7.2, 7.8 y 8.5. ¿Cuál es el promedio (media aritmética) de estas calificaciones?

### Options
- [ ] A) 7.2 puntos <!-- feedback: Error común: sumar los valores y dividir entre 3 en lugar de 4 -->
- [x] B) 7.5 puntos <!-- feedback: (6.5 + 7.2 + 7.8 + 8.5) / 4 = 30 / 4 = 7.5 -->
- [ ] C) 8.0 puntos <!-- feedback: Error al confundir la mediana con la media -->
- [ ] D) 7.0 puntos <!-- feedback: Error al no incluir todos los valores en el cálculo -->

### Explicación Pedagógica
La media se calcula sumando todos los valores y dividiendo por la cantidad de datos. Un error común entre estudiantes es dividir entre un número incorrecto de datos o no incluir todos los valores en la suma. La respuesta correcta es 7.5 puntos.

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v3`
**Bloom:** [Understand]
**ICFES:** [Interpretación]
**Context:** Colombian consumer price index data

### Enunciado
Los precios (en miles de pesos) de un producto en diferentes tiendas son: 15, 18, 22, 25, 30. ¿Cuál es el rango de estos precios?

### Options
- [ ] A) 22 miles de pesos <!-- feedback: Confundir la mediana con el rango -->
- [ ] B) 15 miles de pesos <!-- feedback: Confundir el valor mínimo con el rango -->
- [x] C) 15 miles de pesos <!-- feedback: Rango = valor máximo - valor mínimo = 30 - 15 = 15 -->
- [ ] D) 25 miles de pesos <!-- feedback: Confundir la moda con el rango -->

### Explicación Pedagógica
El rango se define como la diferencia entre el valor máximo y el valor mínimo de un conjunto de datos. Un error frecuente es confundir el rango con otros conceptos como la mediana o la moda, o simplemente identificar el valor máximo en lugar de calcular la diferencia.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v4`
**Bloom:** [Apply]
**ICFES:** [Análisis]
**Context:** Colombian regional temperature data

### Enunciado
Las temperaturas mínimas registradas durante una semana en Bogotá (en °C) fueron: 8, 9, 10, 11, 12, 13, 14. ¿Cuál es la temperatura mediana?

### Options
- [ ] A) 10°C <!-- feedback: Error común: tomar el primer valor central sin ordenar correctamente para n=7 -->
- [x] B) 11°C <!-- feedback: Con 7 datos ordenados, la mediana es el valor central (posición 4), que es 11 -->
- [ ] C) 12°C <!-- feedback: Confundir la mediana con la media en datos simétricos -->
- [ ] D) 11.5°C <!-- feedback: Calcular incorrectamente interpolando cuando no es necesario con datos ordenados -->

### Explicación Pedagógica
Para datos ordenados con un número impar de observaciones, la mediana es el valor que queda exactamente en el centro. Con 7 datos, la posición central es (7+1)/2 = 4, y el cuarto valor ordenado es 11. Un error común es no identificar correctamente la posición central o interpolar innecesariamente.

---

## Question 5 (Variant Medium - Difficulty 5)

**ID:** `CO-MAT-11-P3-estadistica-descriptiva-019-MASTERY-v5`
**Bloom:** [Understand]
**ICFES:** [Interpretación]
**Context:** Colombian university enrollment statistics

### Enunciado
En una tabla de frecuencias para datos agrupados, la marca de clase del intervalo 20-30 es:

### Options
- [ ] A) 20, porque es el límite inferior <!-- feedback: La marca de clase no es el límite del intervalo -->
- [ ] B) 30, porque es el límite superior <!-- feedback: La marca de clase no es el límite del intervalo -->
- [x] C) 25, porque es el punto medio del intervalo (suma de límites dividida por 2) <!-- feedback: (20 + 30) / 2 = 25, es el valor representativo