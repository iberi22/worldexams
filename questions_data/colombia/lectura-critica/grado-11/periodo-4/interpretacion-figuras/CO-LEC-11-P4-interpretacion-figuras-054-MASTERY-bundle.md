<think>
The user wants me to generate exactly 20 multiple-choice questions in ICFES Saber 11 format for Critical Reading (Lectura Crítica), topic "interpretacion-figuras" (interpretation of figures/visual elements), grade 11, period 4.

Let me follow the exact format specified:

1. First, the YAML frontmatter block
2. Then 20 questions with the specified structure
3. Each question has a variant and difficulty level
4. Progressive difficulty: D3-D4 (questions 1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
5. Each question has 4 options with [x] on the correct one
6. Context must be modern and relevant to Colombia
7. Distractors should be plausible errors Colombian students make

Let me generate 20 questions about interpreting figures (charts, graphs, infographics, diagrams, etc.) in critical reading contexts.

Topics for "interpretacion-figuras" could include:
- Interpreting bar charts, line graphs, pie charts
- Reading infographics
- Analyzing diagrams
- Understanding statistical figures
- Interpreting maps
- Analyzing visual data representations

Let me create 20 questions with progressive difficulty.

</think>

```yaml
---
id: "CO-LEC-11-P4-interpretacion-figuras-054-MASTERY"
country: "colombia"
grado: 11
asignatura: "lectura-critica"
tema: "interpretacion-figuras"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 54
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-16T02:26:49.123957"
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

**ID:** `CO-LEC-11-P4-interpretacion-figuras-054-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Identificación de información explícita en textos y gráficos
**Context:** Encuesta sobre consumo de medios digitales en jóvenes colombianos

### Enunciado
Según el gráfico de barras que muestra el porcentaje de jóvenes colombianos entre 15 y 24 años que usan diferentes redes sociales, ¿cuál es la red social con mayor porcentaje de uso?

(Gráfico想象: Instagram 78%, Facebook 65%, TikTok 82%, Twitter 34%)

### Options
- [ ] A) Facebook <!-- feedback: Esta es la segunda red con mayor uso, con 65% -->
- [ ] B) Twitter <!-- feedback: Tiene el menor porcentaje con 34% -->
- [x] C) TikTok <!-- feedback: Correcto. TikTok tiene el mayor porcentaje con 82% según los datos del gráfico -->
- [ ] D) Instagram <!-- feedback:Tiene 78%, que es alto pero no es el mayor -->

### Explicación Pedagógica
La respuesta correcta es C. Para interpretar un gráfico de barras se debe identificar cuál barra tiene la mayor altura o extensión. TikTok con 82% supera a Instagram (78%), Facebook (65%) y Twitter (34%). Un error común es confundir el orden cuando las diferencias son cercanas.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-054-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Interpretación de relaciones causa-efecto en textos y gráficos
**Context:** Estadísticas de exportación de café colombiano

### Enunciado
En un gráfico de líneas que muestra las exportaciones de café colombiano entre 2018 y 2023, ¿qué tendencia general observa?

(想象折线图: 2018-2019上升, 2019-2020下降, 2020-2023持续上升至新高)

### Options
- [ ] A) Decreciente durante todo el período <!-- feedback: No corresponde con los datos, hubo recuperación después de 2020 -->
- [ ] B) Estable con variaciones mínimas <!-- feedback: Los datos muestran cambios significativos -->
- [x] C) Creciente con una caída temporal en 2020 <!-- feedback: Correcto. Hay crecimiento general con caída en 2020 debido a la pandemia y posterior recuperación -->
- [ ] D) cíclica sin tendencia clara <!-- feedback: Los datos muestran una tendencia clara al alza -->

### Explicación Pedagógica
La respuesta correcta es C. Al interpretar gráficos de líneas se debe identificar tanto la tendencia general como los puntos de cambio. La pandemia de 2020 causó una caída temporal, seguida de recuperación y crecimiento hasta superar los niveles previos.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-054-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Análisis de información cuantitativa en gráficos
**Context:** Encuesta sobre hábitos de estudio de estudiantes colombianos

### Enunciado
Según el diagrama de torta que muestra cómo los estudiantes de grado 11 distribuyen su tiempo de estudio, ¿qué porcentaje aproximado corresponde a matemáticas?

(想象饼图: Matemáticas 30%, Ciencias 25%, Lengua 20%, Sociales 15%, Otros 10%)

### Options
- [ ] A) 15% <!-- feedback: Ese porcentaje corresponde a Ciencias Sociales -->
- [x] B) 30% <!-- feedback: Correcto. El sector de matemáticas ocupa aproximadamente 30% del diagrama -->
- [ ] C) 20% <!-- feedback: Ese porcentaje corresponde a Lengua -->
- [ ] D) 25% <!-- feedback: Ese porcentaje corresponde a Ciencias -->

### Explicación Pedagógica
La respuesta correcta es B. En un diagrama de torta, cada sector representa una proporción del total. El sector de matemáticas es el más grande con 30%, seguido por Ciencias (25%), Lengua (20%), Sociales (15%) y Otros (10%). Un error frecuente es confundir sectores cercanos en tamaño.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-054-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Extrapolación de información de gráficos a nuevos contextos
**Context:** Comparación de rendimiento académico entre regiones colombianas

### Enunciado
Si en un gráfico de barras comparativo, Bogotá supera a Medellín en lectura crítica y matemáticas, pero Medellín supera a Bogotá en ciencias naturales, ¿cuál afirmación es correcta?

### Options
- [ ] A) Bogotá tiene mejor rendimiento en todas las áreas <!-- feedback: Contradice los datos del gráfico -->
- [ ] B) Medellín tiene mejor rendimiento en todas las áreas <!-- feedback: Contradice los datos del gráfico -->
- [x] C) El rendimiento depende del área evaluada <!-- feedback: Correcto. Los datos muestran fortalezas diferentes en cada ciudad -->
- [ ] D) Las dos ciudades tienen rendimiento idéntico <!-- feedback: Contradice explícitamente los datos -->

### Explicación Pedagógica
La respuesta correcta es C. Cuando un gráfico muestra resultados comparativos por categorías, se debe reconocer que los resultados varían según el área. Bogotá es mejor en algunas áreas y Medellín en otras, sin que una ciudad domine completamente.

---

## Question 5 (Variant Medium - Difficulty D5)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-054-MASTERY-v5`
**Bloom:** Analyze
**ICFES:** Análisis crítico de fuentes de información gráfica
**Context:** Informe del DANE sobre niveles de pobreza en Colombia

### Enunciado
Un gráfico de barras apiladas muestra la composición del ingreso familiar por deciles en Colombia. Si el decil 1 (más pobre) muestra que el 60% de su ingreso proviene de transferencias del gobierno, mientras el decil 10 (más rico) muestra que solo el 5% proviene de transferencias, ¿qué inferencia es más válida?

### Options
- [ ] A) Los ricos pagan más impuestos que los pobres <!-- feedback: Este dato no permite inferir eso directamente -->
- [ ] B) El sistema de transferencias es regressivo <!-- feedback: El hecho de que los pobres reciban más transferencias indica lo contrario -->
- [x] C) Las transferencias del gobierno representan una fuente crucial de ingreso para los hogares más pobres <!-- feedback: Correcto. El dato muestra que las transferencias son fundamentales para el decil inferior -->
- [ ] D) Los ricos ahorran más que los pobres <!-- feedback: Este dato no se relaciona con patrones de ahorro -->

### Explicación Pedagógica
La respuesta correcta es C. Al analizar gráficos de barras apiladas se debe identificar qué representa cada segmento y comparar entre categorías. El 60% vs 5% muestra claramente la importancia relativa de las transferencias para cada grupo.

---

## Question 6 (Variant Medium - Difficulty D5)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-054-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Evaluación de sesgos en presentación de datos gráficos
**Context:** Comparación de tarifas de servicios públicos entre ciudades colombianas

### Enunciado
Un periódico bogotano publica un gráfico de barras que compara tarifas de agua entre ciudades, mostrando a Bogotá con la tarifa más alta. Sin embargo, el gráfico no menciona que Bogotá tiene el menor consumo per cápita del país. ¿Cuál es la intención más probable de esta presentación?

### Options
- [ ] A) Informar objetivamente sobre tarifas de agua <!-- feedback: La omisión de información relevante sugiere otra intención -->
- [x] B) Presentar una imagen desfavorable de la tarifa bogotana sin contexto <!-- feedback: Correcto. Omitir el contexto del menor consumo manipular la percepción -->
- [ ] C) Celebrar la eficiencia del consumo en Bogotá <!-- feedback: No hay evidencia de esa intención en la presentación -->
- [ ] D) Comparar la calidad del servicio entre ciudades <!-- feedback: El gráfico solo muestra tarifas, no calidad -->

### Explicación Pedagógica
La respuesta correcta es B. La omisión de información crucial (menor consumo per cápita, que justificaría tarifa más alta) indica una presentación sesgada. En lectura crítica, se debe evaluar no solo lo que muestra el gráfico, sino lo que oculta.

---

## Question 7 (Variant Medium - Difficulty D5)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-054-MASTERY-v7`
**Bloom:** Understand
**ICFES:** Relación entre texto explicativo y datos gráficos
**Context:** Estudio sobre contaminación del río Magdalena

### Enunciado
Un informe sobre contaminación del río Magdalena incluye un gráfico que muestra el nivel de COLI (coliformes) en diferentes puntos del río, seguido de un párrafo que afirma: "Los niveles de contaminación han mejorado significativamente en los últimos cinco años." Si el gráfico muestra niveles que siguen siendo 20 veces superiores al máximo permitido, ¿qué relación existe entre el texto y el gráfico?

### Options
- [ ] A) El gráfico contradice la afirmación del texto <!-- feedback: Contradice no, pero si matiza significativamente -->
- [ ] B) El gráfico respalda completamente la afirmación <!-- feedback: El gráfico no muestra mejora "significativa" si sigue muy alto -->
- [x] C) El gráfico contradice la interpretación excesiva del texto <!-- feedback: Correcto. Los datos muestran que sigue超标, el texto califica de "significativa" una mejora que no alcanza estándares -->
- [ ] D) No hay relación entre el texto y el gráfico <!-- feedback: Hay una relación, el texto describe lo que muestra el gráfico -->

### Explicación Pedagógica
La respuesta correcta es C. El gráfico muestra mejora (niveles más bajos que antes) pero aún超标20倍. La palabra "significativamente" es exagerada. El gráfico matiza la afirmación del texto, mostrando que la interpretación es demasiado positiva.

---

## Question 8 (Variant Medium - Difficulty D6)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-054-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Cálculo e interpretación de tendencias a partir de gráficos
**Context:** Economía colombiana y producción de flores

### Enunciado
Según un gráfico de líneas que muestra las exportaciones de flores colombianas en millones de dólares desde 2015 hasta 2023, donde 2015 = 100, 2018 = 115, 2020 = 108, 2023 = 130, ¿cuál fue el crecimiento promedio anual aproximado?

### Options
- [ ] A) 1.5% anual <!-- feedback: Este cálculo subestima el crecimiento total -->
- [ ] B) 2.5% anual <!-- feedback: Cerca, pero no exactamente el crecimiento total del 30% en 8 años -->
- [x] C) 3.3% anual <!-- feedback: Correcto. (130-100)/100 = 30% en 8 años ≈ 3.3% anual acumulativo -->
- [ ] D) 5% anual <!-- feedback: Sobreestimaría el crecimiento -->

### Explicación Pedagógica
La respuesta correcta es C. Para calcular crecimiento promedio anual se debe considerar el crecimiento total (de 100 a 130 = 30%) en el período de 8 años. Usando la fórmula de tasa compuesta: (130/100)^(1/8) - 1 ≈ 3.3%. Errores comunes incluyen dividir simplemente 30/8.

---

## Question 9 (Variant Medium - Difficulty D6)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-054-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Identificación de factores que afectan la interpretación de gráficos
**Context:** Comparación de resultados Saber 11 entre departamentos

### Enunciado
Un gráfico de barras muestra la puntuación promedio en Lectura Crítica por departamento, donde Vaupés tiene 42 puntos y Bogotá 52 puntos. Sin embargo, Vaupés tiene solo 120 estudiantes presentando el examen mientras Bogotá tiene 85,000. ¿Qué factor debe considerarse al interpretar este gráfico?

### Options
- [ ] A) La puntuación de Vaupés es más confiable por tener menos estudiantes <!-- feedback: Menor muestra = menos confiabilidad, no más -->
- [x] B) Las diferencias en tamaño de muestra afectan la representatividad de los datos <!-- feedback: Correcto. Muestras muy diferentes tienen poderes estadísticos distintos -->
- [ ] C) Los datos de Bogotá son incorrectos por la cantidad de estudiantes <!-- feedback: No hay razón para pensar que los datos son incorrectos -->
- [ ] D) El gráfico debe mostrar solo departamentos con más de 10,000 estudiantes <!-- feedback: No hay norma que excluya departamentos pequeños -->

### Explicación Pedagógica
La respuesta correcta es B. En interpretación de figuras estadísticas, el tamaño de la muestra es crucial. Con 120 estudiantes, la puntuación de Vaupés puede variar significativamente con cambios mínimos en el desempeño de unos pocos estudiantes.

---

## Question 10 (Variant Medium - Difficulty D6)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-054-MASTERY-v10`
**Bloom:** Evaluate
**ICFES:** Evaluación de conclusiones basadas en evidencia gráfica
**Context:** Estudios sobre cambio climático en la zona Andina colombiana

### Enunciado
Un gráfico muestra que la extensión del glaciar Cone Sur en Colombia se redujo de 100 km² en 1990 a 45 km² en 2023. Un investigador concluye que "en 30 años el glaciar perderá la mitad de su extensión". ¿Cuál evaluación es más crítica?

### Options
- [ ] A) La conclusión es correcta porque los datos lo muestran <!-- feedback: La proyección lineal no considera factores que pueden cambiar la tendencia -->
- [x] B) La proyección lineal no considera posibles aceleraciones o deceleraciones en la pérdida <!-- feedback: Correcto. Extrapolar tendencias linealmente sin considerar factores complejos es cuestionable -->
- [ ] C) El gráfico debería mostrar datos de más años atrás <!-- feedback: El período 1990-2023 es adecuado para tendencias -->
- [ ] D) Los datos son falsos porque el glaciar no desapareció completamente <!-- feedback: No hay evidencia de falsificación -->

### Explicación Pedagógica
La respuesta correcta es B. En lectura crítica, se debe evaluar si las conclusiones están justificadas por los datos. Una reducción del 55% no garantiza que el siguiente 55% ocurra en el mismo período. Factores como políticas ambientales o cambios económicos pueden alterar la tendencia.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-054-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Análisis comparativo de múltiples fuentes gráficas
**Context:** Comparación del IDEI (Índice de Desigualdad de Género) entre países latinoamericanos

### Enunciado
Se presentan dos gráficos: uno de barras con el puntaje IDEI de cinco países sudamericanos y otro de líneas mostrando la evolución del IDEI de Colombia entre 2010-2023. Colombia tiene el tercer puntaje más alto del grupo, pero su tendencia es ligeramente decreciente. ¿Cuál análisis integra correctamente ambos gráficos?

### Options
- [ ] A) Colombia tiene el peor desempeño en igualdad de género de la región <!-- feedback: No corresponde con ser tercero de cinco -->
- [x] B) Colombia mantiene una posición intermedia en la región, con avances graduales hacia mayor igualdad <!-- feedback: Correcto. Tercer lugar = posición intermedia; tendencia decreciente del IDEI indica más igualdad -->
- [ ] C) Colombia debería copiar las políticas de los países con mejor puntaje <!-- feedback: No se puede inferir políticas específicas de los gráficos -->
- [ ] D) La tendencia decreciente de Colombia indica que pronto será el país con mejor puntaje <!-- feedback: Extrapolación no justificada de una tendencia leve -->

### Explicación Pedagógica
La respuesta correcta es B. La lectura crítica de múltiples gráficos requiere integrar información sin sobreinterpretar. "Tercer lugar de cinco" significa posición intermedia (no peor, no mejor). La tendencia decreciente del IDEI (donde menor = mejor) indica avances graduale.

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-054-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Evaluación de la validez de información en gráficos
**Context:** Campaña publicitaria sobre productos agotados en tiendas colombianas

### Enunciado
Un anuncio publicitario afirma "9 de cada 10 colombianos prefieren nuestra marca" y muestra una "encuesta" sin fuente, método ni tamaño de muestra. El gráfico asociado solo muestra un icono de carrito de compras concheck verde. ¿Cuál es la evaluación correcta de esta evidencia?

### Options
- [ ] A) La afirmación es creíble porque muchos anuncios la usan <!-- feedback: Popularidad no equivale a validez -->
- [ ] B) La afirmación es falsos porque los anuncios siempre mienten <!-- feedback: No toda información en anuncios es falsa, pero esta care de rigor -->
- [x] C) La evidencia gráfica es insuficiente para verificar la afirmación <!-- feedback: Correcto. Ausencia de metodología, fuente y tamaño de muestra impide verificar la confiabilidad -->
- [ ] D) El gráfico es confiable porque es visualmente atractivo <!-- feedback: Atractivo visual no equivale a confiabilidad estadística -->

### Explicación Pedagógica
La respuesta correcta es C. En lectura crítica, se debe evaluar la calidad de la evidencia. Una afirmación sin fuente, sin método de recolección de datos y sin tamaño de muestra es estadísticamente inválida. El gráfico iconográfico no representa datos reales.

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-054-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Identificación de falacias en representaciones gráficas
**Context:** Debate sobre légalización de vehículos eléctricos en Colombia

### Enunciado
Un político muestra un gráfico donde la ventas de vehículos eléctricos en Colombia subió de 500 unidades en 2019 a 2,500 en 2023, y argumenta: "Las ventas se quintuplicaron,证明 nuestro plan de incentivo funcionó." Sin embargo, no menciona que los vehículos eléctricos siguen representando solo el 0.5% del total de ventas de vehículos en el país. ¿Cuál es la falacia en su argumento?

### Options
- [ ] A) No hay falacia, los datos demuestran su punto <!-- feedback: Los datos muestran crecimiento pero no el contexto del mercado total -->
- [ ] B) Confundir crecimiento absoluto con relevancia en el mercado total <!-- feedback: No hay confundiendo, hay omisión deliberada -->
- [x] C) Usar crecimiento porcentual impresionante sin considerar la proporción real en el mercado total <!-- feedback: Correcto. 500% de crecimiento sobre base muy pequeña sigue siendo insignificante -->
- [ ] D) Inventar datos sobre las ventas de vehículos eléctricos <!-- feedback: Los datos pueden ser ciertos, el problema es la interpretación -->

### Explicación Pedagógica
La respuesta correcta es C. El político usa un dato técnicamente correcto (quintuplicación) para sugerir éxito rotundo, pero omite que el punto de partida era mínimo y la proporción sigue siendo insignificante (0.5%). Esto es una falacia de escala.

---

## Question 14 (Variant Advanced - Difficulty D8)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-054-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Análisis crítico de metodologías de encuestas presentadas en gráficos
**Context:** Encuesta sobre percepción de seguridad ciudadana en Medellín

### Enunciado
Una firma de investigación presenta los resultados de su "Encuesta de Seguridad" en Medellín con el siguiente gráfico: una barra muestra que "78% de los ciudadanos se sienten seguros". En letra muy pequeña se lee: "Encuesta realizada vía WhatsApp a contactos de la firma". ¿Cuál es la principal debilidad metodológica?

### Options
- [x] A) La muestra por WhatsApp no representa la población general de Medellín <!-- feedback: Correcto. Contactos de una firma tienen sesgo de selección enorme -->
- [ ] B) El número 78% es demasiado alto para ser creíble <!-- feedback: No se puede evaluar por su valor, sino por cómo se obtuvo -->
- [ ] C) La firma de investigación no tiene legitimidad para hacer encuestas <!-- feedback: No hay evidencia de falta de legitimidad -->
- [ ] D) WhatsApp no es una plataforma confiable para encuestas <!-- feedback: La plataforma es neutral, el método de selección de contactos es el problema -->

### Explicación Pedagógica
La respuesta correcta es A. En lectura crítica, se debe cuestionar cómo se obtuvo la muestra. Contactos de una firma de investigación constituyen un grupo muy sesgado (personas con acceso a tecnología, posiblemente con perfil específico). Una muestra representativa requiere selección aleatoria de la población.

---

## Question 15 (Variant Advanced - Difficulty D8)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-054-MASTERY-v15`
**Bloom:** Create
**ICFES:** Síntesis de información de múltiples figuras para construir argumentos
**Context:** Informe del PNUD sobre desarrollo humano y pobreza multidimensional en Colombia

### Enunciado
Un informe del PNUD presenta: 1) un mapa de Colombia con色调 que muestra el Índice de Pobreza Multidimensional (IPM) por departamentos, donde los colores más oscuros indican mayor pobreza; 2) una gráfica que muestra la correlación positiva entre IPM y tasa de deserción escolar por departamento. Según estos datos, ¿qué política sería más consistente?

### Options
- [ ] A) Reducir el número de liceales en departamentos con alto IPM para bajar la deserción <!-- feedback: Esto empeoraría la situación -->
- [x] B) Implementar programas de retención escolar focalizados en departamentos con alto IPM <!-- feedback: Correcto. La correlación indica que combatir la deserción ayudaría a reducir la pobreza multidimensional -->
- [ ] C) Mover estudiantes de departamentos con alto IPM a instituciones con bajo IPM <!-- feedback: Esto no aborda la causa -->
- [ ] D) Eliminar los programas de apoyo alimentario en escuelas con bajo IPM <!-- feedback: Esto afectaría a quienes menos lo necesitan -->

### Explicación Pedagógica
La respuesta correcta es B. La información mostrada indica que donde hay mayor pobreza multidimensional, hay mayor deserción escolar. Una intervención coherente sería atacar la causa (pobreza) y el efecto (deserción) mediante programas focalizados de retención.

---

## Question 16 (Variant Advanced - Difficulty D8)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-054-MASTERY-v16`
**Bloom:** Evaluate
**ICFES:** Evaluación de la calidad de fuentes y datos presentados en gráficos
**Context:** Comparación de ingresos de profesores en países de la OCDE vs Colombia

### Enunciado
Un politician colombiano muestra un gráfico comparativo que indica que el salario promedio de un profesor en Colombia es 40% del salario promedio de un profesor en la OCDE. El gráfico no especifica: el año de los datos, cómo se calcularon los promedios (pueden incluir salarios diferentes), ni qué países de la OCDE se incluyeron. ¿Cuál es la interpretación más cautelosa?

### Options
- [ ] A) Colombia paga mucho menos que los países desarrollados a sus profesores <!-- feedback: Sin más contexto, no se puede afirmar eso -->
- [ ] B) Los datos demuestran inequívocamente que los profesores colombianos están peorpagados <!-- feedback: Las omisiones metodológicas impiden certeza -->
- [x] C) Los datos sugieren una brecha significativa, pero requieren verificación metodológica más detallada <!-- feedback: Correcto. Se puede reconocer un problema señaladdo sin confirmar la exactitud de los números -->
- [ ] D) Los datos son falsos porque omiten información importante <!-- feedback: No hay evidencia de falsificación, solo de incompletitud -->

### Explicación Pedagógica
La respuesta correcta es C. En lectura crítica, se debe evaluar tanto el contenido como la presentación. Una brecha del 40% vs 100% puede ser significativa, pero sin metodología clara (año, países incluidos, tipo de profesor, horas laboradas) no se puede confirmar la exactitud.

---

## Question 17 (Variant Expert - Difficulty D9)

**ID:** `CO-LEC-11-P4-interpretacion-figuras-054-MASTERY-v17`
**Bloom:** Analyze
**ICFES:** Análisis de gráficos múltiples para identificar tendencias contradictorias
**Context:** Economía colombiana: Sector de tecnologías y empleo informal

### Enunciado
Se presentan dos gráficos: 1) Gráfico de líneas mostrando cómo el sector de tecnologías de la información en Colombia creció un 200% en exportaciones entre 2015 y 2023; 2) Gráfico de barras mostrando cómo la tasa de empleo informal en Colombia aumentó del 47% al 49% en el mismo período. ¿Cuál análisis integra mejor ambos gráficos?

### Options
- [ ] A) El crecimiento tecnológico creó más empleo informal, lo causando aumento en ambas métricas <!-- feedback: No hay información de causalidad en los gráficos -->
- [ ] B) Los gráficos se contradicen y por lo tanto uno de los dos debe estar错误 <!-- feedback: Métricas diferentes no se contradicen, pueden coexistir -->
- [x] C) El crecimiento de un sector no implica necesariamente reducción del empleo informal en otros sectores <!-- feedback: Correcto. Son métricas independientes que no tienen relación causal directa sin más información -->
- [ ] D) El sector tecnológico está inflando las cifras de empleo informal <!-- feedback: No hay evidencia de eso -->

### Explicación Pedagógica
La respuesta correcta es C
