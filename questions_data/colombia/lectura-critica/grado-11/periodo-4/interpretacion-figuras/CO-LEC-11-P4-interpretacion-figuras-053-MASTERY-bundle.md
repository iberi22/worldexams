<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for Colombian Saber 11 exam, specifically for "Lectura Crítica" (Critical Reading) with the topic "interpretacion-figuras" (interpretation of figures/images), grade 11, period 4.

Let me create this bundle following all the specifications:

- 20 questions (numbered 1-20)
- Progressive difficulty: D3-D4 (1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
- 4 options per question, [x] marking the correct one
- Colombian modern context
- ICFES Saber 11 style
- Proper metadata YAML at the top
- No additional text before/after

Let me generate these questions focusing on "interpretacion-figuras" which relates to interpreting visual elements like graphs, charts, infographics, diagrams, etc. in critical reading contexts.

I'll create questions that test students' ability to:
- Interpret data from graphs/charts
- Analyze visual information
- Evaluate infographics
- Understand diagrams and their relationships
- Critical reading of visual data

Let me structure each question properly with the format specified.

</think>

```yaml
---
id: "CO-LEC-11-P4-interpretacion-figuras-053-MASTERY"
country: "colombia"
grado: 11
asignatura: "lectura-critica"
tema: "interpretacion-figuras"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 53
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-16T02:24:45.484005"
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

**ID:** `CO-LEC-11-P4-interpretacion-figuras-053-MASTERY-v1`
**Bloom:** [Understand]
**ICFES:** [Relacionar información visual con propósitos comunicativos]
**Context:** Tendencias de consumo cultural en jóvenes colombianos

### Enunciado
En una gráfica de barras se presenta el porcentaje de jóvenes colombianos entre 15 y 24 años que consumen diferentes plataformas de streaming musical. La barra más alta corresponde a Spotify con 73%, seguida de YouTube Music con 45% y Apple Music con 22%. ¿Cuál es el propósito principal de esta representación gráfica?

### Options
- [ ] A) Mostrar la evolución histórica del consumo de streaming en Colombia desde 2010 <!-- feedback: La gráfica presenta datos de un momento específico, no una serie temporal -->
- [ ] B) Comparar preferencias de consumo musical entre diferentes plataformas digitales <!-- feedback: Correcto. La gráfica permite visualizar y comparar los porcentajes de uso de cada plataforma -->
- [ ] C) Demostrar que Spotify es la mejor plataforma de streaming musical <!-- feedback: La gráfica solo muestra datos de consumo, no evalúa calidad -->
- [ ] D) Explicar las razones por las cuales los jóvenes eligen streaming sobre radio <!-- feedback: No presenta información sobre motivaciones o razones de elección -->

### Explicación Pedagógica
La correcta es B porque las gráficas de barras son herramientas visuales diseñadas para facilitar la comparación de datos categóricos. El propósito comunicativo es permitir al lector identificar rápidamente las diferencias proporcionales entre categorías. El distractor A es común porque los estudiantes asumen que toda gráfica implica tiempo; el C confunde dato con valoración; el D adiciona información que no está en la gráfica.

---

## Question 2 (Variant Basic - Difficulty D4)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-053-MASTERY-v2`
**Bloom:** [Understand]
**ICFES:** [Identificar relaciones de causa-efecto en información visual]
**Context:** Datos económicos de departamentos colombianos

### Enunciado
Un mapa de Colombia muestra las tasas de desempleo departamental con tonalidades de color: los departamentos más oscuros (rojo) tienen tasas superiores al 15%, los medianos (naranja) entre 10% y 15%, y los más claros (amarillo) por debajo del 10%. El territorio que presenta tonalidades más oscuras incluye a La Guajira, Chocó y Córdoba. Según esta representación, ¿qué relación se puede inferir?

### Options
- [ ] A) Los departamentos con mayor tasa de desempleo son siempre los más extensos territorialmente <!-- feedback: El tamaño del departamento no tiene relación con el unemployment rate mostrado -->
- [ ] B) Existe una correlación geográfica en las zonas con mayor dificultad laboral <!-- feedback: Correcto. Los departamentos con colores oscuros están ubicados principalmente en regiones costeras y fronterizas con mayores índices de pobreza -->
- [ ] C) Los departamentos en zona andina tienen menor desempleo que los costeros <!-- feedback: Aunque puede ser inferencia plausible, no se puede afirmar categóricamente sin datos específicos de departamentos andinos -->
- [ ] D) El color rojo indica que estos departamentos tienen más habitantes en pobreza <!-- feedback: El mapa solo muestra tasa de desempleo, no índice de pobreza específico -->

### Explicación Pedagógica
La respuesta correcta es B. Los mapas coropléticos permiten visualizar patrones geográficos espaciales. Al observar que los colores oscuros (mayor desempleo) se concentran en ciertas regiones, se puede inferir una correlación geográfica. Los distractores ilustran errores comunes: confundir correlación con causalidad directa (A), hacer inferencias no sustentadas en los datos específicos (C), o cambiar la variable representada (D).

---

## Question 3 (Variant Basic - Difficulty D3)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-053-MASTERY-v3`
**Bloom:** [Understand]
**ICFES:** [Interpretar datos apresentados em formatos visuais]
**Context:** Encuesta sobre hábitos de lectura en biblioteca pública

### Enunciado
Una infografía presenta los resultados de una encuesta aplicada a 500 usuarios de bibliotecas públicas en Medellín. Incluye un diagrama circular donde el 58% corresponde a usuarios que asisten para estudiar, el 25% para investigar y el 17% para actividades de ocio. Debajo, una nota dice: "Datos recopilados en diciembre de 2024". ¿Cuál afirmación es correcta respecto a esta infografía?

### Options
- [ ] A) La mitad de los usuarios asiste a la biblioteca exclusivamente para leer novelas <!-- feedback: El 58% corresponde a estudio, no específicamente a lectura de ficción -->
- [ ] B) Los datos representan el comportamiento anual de los usuarios de todas las bibliotecas de Colombia <!-- feedback: El estudio se limitó a Medellín y a usuarios de bibliotecas públicas en diciembre -->
- [ ] C) El diagrama permite visualizar la proporción de cada tipo de usuario respecto al total <!-- feedback: Correcto. Los diagramas circulares muestran la distribución proporcional de partes respecto al todo -->
- [ ] D) El 25% de usuarios que investiga equivale a 125 personas <!-- feedback: El 25% de 500 sería 125 personas, pero sin conocer el tamaño real de la muestra la inferencia numérica es incorrecta -->

### Explicación Pedagógica
La respuesta correcta es C porque los diagramas circulares son diseñados específicamente para representar proporciones de un todo. El distractor A confunde categoría (estudiar) con actividad específica (leer novelas). El B limita incorrectamente la generalización. El D, aunque numéricamente correcto (25% de 500 = 125), asume un tamaño de muestra no verificado.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-053-MASTERY-v4`
**Bloom:** [Analyze]
**ICFES:** [Evaluar la suficiencia de la información visual para responder una pregunta]
**Context:** Estadísticas deportivas del fútbol colombiano

### Enunciado
Un gráfico de líneas muestra la cantidad de goles anotados por equipos colombianos en Liga BetPlay durante cinco temporadas (2020-2024). La línea de Atlético Nacional alcanza 120 goles en 2023, la más alta del período, mientras que los otros equipos oscilan entre 60 y 95 goles. ¿Es suficiente esta gráfica para determinar qué equipo tiene mejor delantera?

### Options
- [ ] A) Sí, porque el equipo con más goles es claramente el de mejor delantera <!-- feedback: Cantidad de goles no considera partidos jugados ni calidad de oponentes -->
- [ ] B) No, porque faltaría saber cuántos partidos jugó cada equipo para contextualizar los datos <!-- feedback: Correcto. La eficiencia de una delantera se mide mejor con promedio de goles por partido, no total absoluto -->
- [ ] C) No, porque debería compararse con la cantidad de goles en Copa Libertadores <!-- feedback: La Champions local sí permite evaluar delantera en contexto nacional -->
- [ ] D) Sí, porque los datos son de cinco temporadas, lo cual es representativo <!-- feedback: Más temporadas no compensan la ausencia de datos contextualizadores como partidos jugados -->

### Explicación Pedagógica
La respuesta correcta es B. En análisis de datos deportivos, la cantidad total de goles debe ponderarse por partidos disputados para hacer comparaciones válidas. El promedio de goles por partido permite evaluar la eficiencia real de una delantera independientemente del número de partidos jugados. Los distractores A y D ilustran el error de no contextualizar; el C adiciona un criterio no solicitado.

---

## Question 5 (Variant Medium - Difficulty D5)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-053-MASTERY-v5`
**Bloom:** [Understand]
**ICFES:** [Interpretar información visual para inferir tendencias]
**Context:** Encuesta del Dane sobre uso de tecnología en hogares colombianos

### Enunciado
La siguiente tabla muestra el porcentaje de hogares colombianos con acceso a internet fijo por región en 2023:

| Región | Porcentaje |
|--------|------------|
| Bogotá | 87% |
| Valle del Cauca | 71% |
| Antioquia | 68% |
| Caribe | 42% |
| Pacífico | 31% |
| Amazonas | 18% |

Según esta información, ¿qué tendencia nacional se puede inferir?

### Options
- [ ] A) Los departamentos amazónicos tienen la mejor conectividad de Colombia <!-- feedback: Amazonas tiene el porcentaje más bajo (18%), no el más alto -->
- [ ] B) El acceso a internet está relacionado con el nivel de industrialización de la región <!-- feedback: Correcto. Las regiones más industrializadas (Bogotá, Valle, Antioquia) presentan mayores porcentajes, mientras las menos desarrolladas económicamente muestran los menores -->
- [ ] C) Todos los hogares colombianos tienen acceso a internet en algún formato <!-- feedback: La tabla muestra que ninguna región alcanza el 100%, además el porcentaje más bajo indica que menos de una quinta parte de hogares amazónicos tienen acceso fijo -->
- [ ] D) El Caribe es la región más desarrollada después de Bogotá <!-- feedback: Con 42%, el Caribe está por debajo de Valle (71%) y Antioquia (68%), además la Industrialización no es directamente igual a desarrollo general -->

### Explicación Pedagógica
La respuesta correcta es B. Al ordenar los datos, se observa claramente que las regiones con mayor desarrollo industrial y económico (Bogotá, Valle del Cauca, Antioquia) presentan los mayores porcentajes de conectividad. Esta correlación permite inferir una relación entre desarrollo económico regional y acceso a infraestructura tecnológica. Los distractores evidencian errores en lectura de datos y generalización indebida.

---

## Question 6 (Variant Medium - Difficulty D5)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-053-MASTERY-v6`
**Bloom:** [Apply]
**ICFES:** [Aplicar estrategias de lectura crítica a información visual]
**Context:** Comparación de indicadores ambientales en ciudades colombianas

### Enunciado
Un diagrama de barras apiladas presenta la composición de fuentes de energía eléctrica en cuatro ciudades colombianas. Medellín muestra 45% hidroeléctrica, 30% gas, 20% solar y 5% térmica. Bogotá presenta 60% hidroeléctrica, 25% gas, 10% solar y 5% térmica. Cali muestra 35% hidroeléctrica, 40% gas, 15% solar y 10% térmica. Barranquilla presenta 20% hidroeléctrica, 50% gas, 10% solar y 20% térmica. ¿En qué ciudad la matriz energética depende menos de fuentes hidroeléctricas?

### Options
- [ ] A) Medellín, porque tiene el mayor porcentaje en energía solar después de Bogotá <!-- feedback: Aunque tiene el segundo porcentaje solar más alto, la pregunta es específicamente sobre hidroeléctrica, donde Medellín no es la menor -->
- [ ] B) Barranquilla, porque tiene el menor porcentaje de energía hidroeléctrica (20%) <!-- feedback: Correcto. Comparando los porcentajes: Medellín 45%, Bogotá 60%, Cali 35%, Barranquilla 20%. Barranquilla tiene la menor proporción de energía hidroeléctrica -->
- [ ] C) Cali, porque diversifica más sus fuentes energéticas <!-- feedback: La diversificación no es el criterio de la pregunta, que pide específicamente cuál depende menos de hidroeléctrica -->
- [ ] D) Bogotá, porque tiene el mayor porcentaje de energía renovable (60% hidroeléctrica) <!-- feedback: Mayor porcentaje de hidroeléctrica implica mayor dependencia, no menor -->

### Explicación Pedagógica
La respuesta correcta es B. Para responder la pregunta, es necesario identificar y comparar los valores específicos de la variable "hidroeléctrica" en cada ciudad. Barranquilla con 20% tiene la menor proporción, lo que significa menor dependencia de esta fuente. El distractor A confunde el criterio pedindo (hidroeléctrica vs. solar). El C adiciona el concepto de diversificación que no es el pedido. El D confunde mayor participación con mayor dependencia.

---

## Question 7 (Variant Medium - Difficulty D6)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-053-MASTERY-v7`
**Bloom:** [Apply]
**ICFES:** [Sintetizar información visual para identificar patrones]
**Context:** Encuesta sobre violencia de género en zona urbana colombiana

### Enunciado
Una gráfica de líneas presenta los casos reportados de violencia intrafamiliar en Colombia durante cinco años. La línea comienza en 85.000 casos en 2020, sube a 112.000 en 2021, desciende a 95.000 en 2022, baja a 88.000 en 2023 y alcanza 90.000 en 2024. Una nota indica: "Datos del Instituto Nacional de Medicina Legal". ¿Cuál análisis crítico es más pertinente?

### Options
- [ ] A) La violencia intrafamiliar disminuyó continuamente durante el período <!-- feedback: Los datos muestran un pico en 2021 seguido de descenso, pero no una disminución continua desde el inicio -->
- [ ] B) El pico de 2021 podría explicarse por el contexto de aislamiento durante la pandemia de COVID-19 <!-- feedback: Correcto. La interpretación contextual de picos de datos requiere considerar circunstancias especiales; el aislamiento pandémico es un factor conocido que aumentó la violencia doméstica -->
- [ ] C) Los datos de 2024 demuestran que la violencia intrafamiliar está controlada <!-- feedback: Un número de 90.000 casos sigue siendo alto; controlar implica analizar también tendencias y contexto -->
- [ ] D) Medicina Legal reportará menos casos en 2025 porque hay menos violencia <!-- feedback: No se puede predecir el futuro basándose solo en datos históricos -->

### Explicación Pedagógica
La respuesta correcta es B. El pico de 2021 es consistente con los efectos documentados del aislamiento pandémico sobre la violencia intrafamiliar, tanto a nivel nacional como internacional. Los estudiantes frecuentemente cometen el error de interpretar fluctuaciones como tendencias definitivas (A) o de asumir que números "menores" implican "controlado" (C). El distractor D muestra el error de predicción sin evidencia suficiente.

---

## Question 8 (Variant Medium - Difficulty D6)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-053-MASTERY-v8`
**Bloom:** [Understand]
**ICFES:** [Identificar sesgos potenciales en presentación de datos visuales]
**Context:** Reporte de ventas de vehículos híbridos en Colombia

### Enunciado
Un fabricante de vehículos híbridos publica una infografía que muestra el crecimiento de ventas de vehículos híbridos en Colombia desde 2019. Las barras crecen progresivamente: 15.000 unidades en 2019, 22.000 en 2020, 45.000 en 2021, 78.000 en 2022 y 95.000 en 2023. Sin embargo, la escala del eje vertical comienza en 10.000 y llega hasta 100.000. ¿Qué sesgo presenta esta representación?

### Options
- [ ] A) Sesgo de selección, porque solo incluye vehículos híbridos y no eléctricos puros <!-- feedback: El reporte es de híbridos específicamente, no de vehículos eléctricos en general -->
- [ ] B) Sesgo de escala, porque el truncamiento del eje vertical exagera visualmente el crecimiento <!-- feedback: Correcto. Al iniciar el eje en 10.000 en lugar de 0, las diferencias entre barras se magnifican visualmente, haciendo que el crecimiento parezca más dramático de lo que realmente es en términos proporcionales -->
- [ ] C) Sesgo de fuente, porque solo presenta datos del fabricante, no de todo el mercado <!-- feedback: Aunque podría ser una limitación, el sesgo señalado en la infografía es específicamente visual, no de fuente -->
- [ ] D) Sesgo de omisión, porque no incluye datos de 2024 <!-- feedback: No presentar datos de 2024 no constituye un sesgo, ya que el período puede tener justificación válida -->

### Explicación Pedagógica
La respuesta correcta es B. El truncamiento de escalas es una técnica conocida que altera la percepción visual de los datos. Cuando el eje vertical no comienza en cero, las diferencias entre valores se exageran proporcionalmente. Este es uno de los sesgos visuales más comunes en representaciones gráficas. En este caso, si el eje comenzara en 0, las barras mostrarían diferencias menos dramáticas. Los distractores identifican problemas reales pero no aplicables al sesgo específico de la infografía.

---

## Question 9 (Variant Medium - Difficulty D5)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-053-MASTERY-v9`
**Bloom:** [Analyze]
**ICFES:** [Evaluar argumentos sustentados en datos visuales]
**Context:** Comparación de emisiones de CO2 per cápita

### Enunciado
Un artículo sobre cambio climático incluye una gráfica donde se comparan las emisiones de CO2 per cápita de Colombia, Brasil y México durante 30 años (1994-2024). Colombia pasa de 1.5 a 2.0 toneladas, Brasil de 2.0 a 2.4 toneladas y México de 3.5 a 4.5 toneladas. El autor concluiye: "México tiene el modelo de desarrollo más contaminante". ¿La conclusión es válida?

### Options
- [ ] A) Sí, porque sus emisiones son las más altas en todos los años representados <!-- feedback: La comparación de emisiones totales no considera el tamaño poblacional, que ya está controlado al ser per cápita, pero podría haber más variables -->
- [ ] B) Sí, porque es el único país donde las emisiones aumentan mientras los otros se estabilizan <!-- feedback: Los datos muestran aumento en los tres países, no estabilización en ninguno -->
- [ ] C) No, porque hacen falta datos del Producto Interno Bruto de cada país para contextualizar <!-- feedback: Correcto. Las emisiones per cápita por sí solas no permiten evaluar si el desarrollo es más o menos contaminante; se necesita relacionar emisiones con producción económica -->
- [ ] D) No, porque la conclusión debería ser opuesta dado que Colombia redujo sus emisiones <!-- feedback: Colombia pasó de 1.5 a 2.0, lo cual es un aumento, no una reducción -->

### Explicación Pedagógica
La respuesta correcta es C. Para evaluar si un modelo de desarrollo es más o menos contaminante, es necesario relacionar las emisiones con el producto económico generado (intensidad碳). Un país con emisiones altas pero alto PIB per cápita puede tener un modelo más eficiente que uno con emisiones menores pero bajo desarrollo económico. Los estudiantes frecuentemente confían en promedios simples sin considerar factores de contextualización. El distractor D muestra un error de lectura de datos.

---

## Question 10 (Variant Medium - Difficulty D6)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-053-MASTERY-v10`
**Bloom:** [Analyze]
**ICFES:** [Evaluar la calidad de la evidencia visual proporcionada]
**Context:** Datos de nutrición infantil del ICBF

### Enunciado
Una pirámide alimentaria adaptada para Colombia muestra en la base los cereales y tubérculos (40% de la dieta sugerida), en el segundo nivel frutas y verduras (30%), en el tercer nivel proteínas entre las que incluye legumbres, huevo, pescado y carnes (20%), y en la cúspide grasas y azúcares (10%). Un artículo引用 estos datos para argumentar que los colombianos comemos demasiados carbohidratos. ¿La evidencia sustenta la conclusión?

### Options
- [ ] A) Sí, porque la pirámide muestra que los cereales y tubérculos ocupan la base más amplia <!-- feedback: La ubicación en la base indica que son el fundamento de la alimentación saludable, no que sean excesivos -->
- [ ] B) No, porque una pirámide alimentaria representa una dieta ideal, no la dieta real de los colombianos <!-- feedback: Correcto. La pirámide muestra cómo debería ser una alimentación balanceada; para concluir que los colombianos comen demasiados carbohidratos, haría falta comparar con datos de consumo real -->
- [ ] C) No, porque la pirámide debería incluir agua como base en lugar de cereales <!-- feedback: Los modelos de pirámide varían, pero esta es una representación válida; no es una falencia de la evidencia para la conclusión específica -->
- [ ] D) Sí, porque el 40% es un porcentaje muy alto para un solo grupo alimenticio <!-- feedback: El 40% es una recomendación de proporción para una dieta balanceada, no evidencia de consumo excesivo -->

### Explicación Pedagógica
La respuesta correcta es B. Este es un error conceptual frecuente en lectura crítica: confundir lo prescriptivo (cómo debería ser) con lo descriptivo (cómo es). La pirámide alimentaria indica proporciones recomendadas para una dieta saludable, no el consumo real de la población colombiana. Para afirmar que los colombianos comen demasiados carbohidratos, sería necesario comparar con datos del consumo real. Los distractores A y D interpretan incorrectamente los valores de la pirámide como evidencia de excesos.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-053-MASTERY-v11`
**Bloom:** [Analyze]
**ICFES:** [Identificar inconsistencias entre diferentes representaciones visuales de un mismo fenómeno]
**Context:** Estadísticas de mortalidad materna en Colombia

### Enunciado
Se presentan dos gráficas sobre mortalidad materna en Colombia. La Gráfica 1 es un mapa coroplético donde los departamentos del Pacífico (Chocó, Valle, Cauca, Nariño) aparecen en color oscuro indicando alta mortalidad. La Gráfica 2 es un diagrama de barras que muestra las principales causas de muerte materna: hemorragia (35%), hipertensión (28%), infections (18%) y otras (19%). Un analista conclude que las causas de mortalidad materna son las mismas en todos los departamentos. ¿Es válido?

### Options
- [ ] A) Sí, porque las causas son un problema nacional que afecta por igual a todas las regiones <!-- feedback: La distribución geográfica variable sugiere que los contextos locales pueden influir en las proporciones de las causas -->
- [ ] B) No, porque las gráficas muestran aspectos diferentes y complémentaires, no idénticos <!-- feedback: Correcto. La Gráfica 1 muestra la distribución geográfica de la mortalidad, mientras la Gráfica 2 muestra las causas. Juntas proporcionan información diferente; no se puede asumir que las proporciones de causas sean idénticas en todas las regiones con alta mortalidad -->
- [ ] C) Sí, porque la hemorragia es la principal causa en todos los estudios nacionales <!-- feedback: Datos nacionales aggregate no garantizan que la distribución local de causas sea uniforme -->
- [ ] D) No, porque la Gráfica 2 debería mostrar solo datos del departamento con mayor mortalidad <!-- feedback: Las causas nacionales son relevantes para el análisis; el error está en asumir uniformidad sin evidencia -->

### Explicación Pedagógica
La respuesta correcta es B. Las dos gráficas proporcionan información complementaria pero no idéntica. Una aborda el dónde (geografía de la mortalidad) y la otra el qué (causas). Concluir uniformidad en las causas sin datos específicos por departamento es una falacia de generalización. Los estudiantes tienden a asumir que datos presentados juntos en un mismo texto son necesariamente conectados de forma directa. El distractor C muestra el error de confiar en estadísticas agregadas sin considerar variación regional.

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-053-MASTERY-v12`
**Bloom:** [Apply]
**ICFES:** [Aplicar conocimiento contextual para interpretar datos visuales]
**Context:** Indicadores de paz y reconciliación en el posacuerdo

### Enunciado
Un informe de la Defensoría del Pueblo incluye una gráfica de líneas con el número de desplazamientos forzados reportados en Colombia por año desde 2016 hasta 2023. La línea muestra un pico en 2017 (164.000 personas), una disminución progresiva hasta 2021 (68.000) y un leve aumento en 2022-2023 (76.000 y 82.000 respectivamente). El informe attribute esta tendencia a los efectos del Acuerdo de Paz. ¿Es esta interpretación válida?

### Options
- [ ] A) Sí, porque el número de desplazados disminuyó significativamente después de la firma del acuerdo <!-- feedback: La correlación temporal no prueba causalidad; múltiples factores influyen en desplazamiento -->
- [ ] B) No, porque hacen falta datos de contexto (conflicto armado residual, economías ilegales, acción de grupos armados) para atribuir la tendencia solo al Acuerdo de Paz <!-- feedback: Correcto. La interpretación causallineal de datos sociales es problemática; el desplazamiento forzado tiene múltiples causas interconectadas que no pueden reducirse a un solo factor -->
- [ ] C) Sí, porque los datos corresponden a una fuente oficial y por tanto son confiables para hacer attribuciones causales <!-- feedback: La confiabilidad de los datos no valida la conclusión causal; incluso fuentes oficiales requieren análisis contextual adecuado -->
- [ ] D) No, porque los datos deberían ser cero después del Acuerdo de Paz para demostrar su efectividad <!-- feedback: Expectativa irreal; los acuerdos de paz no eliminan inmediatamente todas las causas de desplazamiento -->

### Explicación Pedagógica
La respuesta correcta es B. La atribución de causation requiere más que correlación temporal. Fenómenos sociales como el desplazamiento forzado tienen causas múltiples y complejas. Los estudiantes frecuentemente cometen el error de inferir因果 directa de correlaciones temporales. El distractor C confunde la calidad de la fuente con la validez del argumento. El D establece una expectativa irreal como estándar de evaluación.

---

## Question 13 (Variant Advanced - Difficulty D8)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-053-MASTERY-v13`
**Bloom:** [Evaluate]
**ICFES:** [Evaluar la validez de conclusiones basadas en evidencia visual incompleta]
**Context:** Informe sobre logros educativos del programa "Colegio 10"

### Enunciado
Un informe del Ministerio de Educación muestra una gráfica donde el puntaje promedio de estudiantes de colegios
