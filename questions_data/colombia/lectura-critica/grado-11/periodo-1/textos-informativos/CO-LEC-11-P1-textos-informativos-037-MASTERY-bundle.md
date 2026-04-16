<think>
The user wants me to generate exactly 20 multiple-choice questions in ICFES Saber 11 style for Critical Reading (Lectura Crítica) on the topic of informative texts (textos-informativos), for grade 11, period 1.

I need to follow the exact format with:
- YAML frontmatter
- 20 questions
- Progressive difficulty: D3-D4 (1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
- Colombian context
- 4 options per question with [x] on correct answer
- Bloom taxonomy, ICFES competencies
- Pedagogical explanation for each question

Let me generate these questions following the exact structure requested.

</think>

```yaml
---
id: "CO-LEC-11-P1-textos-informativos-037-MASTERY"
country: "colombia"
grado: 11
asignatura: "lectura-critica"
tema: "textos-informativos"
periodo: 1
protocol_version: "5.1"
bundle_size: 20
bundle_index: 37
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-16T01:31:20.082065"
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

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v1`
**Bloom:** [Remember]
**ICFES:** [Identificar información explícita]
**Context:** Situación cotidiana en biblioteca escolar

### Enunciado
En un periódico local aparece la siguiente información:

"Durante el año 2024, la economía colombiana creció un 2,1%, según el informe del Dane publicado el pasado 15 de marzo."

¿Cuál es el dato explícito que se puede extraer directamente del texto?

### Options
- [ ] A) El Dane manipula los datos económicos del país
- [ ] B) La economía colombiana creció un 2,1% en 2024
- [x] C) El informe fue publicado el 15 de marzo según el Dane <!-- feedback: Esta es la información literalmente presente en el texto -->
- [ ] D) Colombia tiene la mejor economía de Latinoamérica

### Explicación Pedagógica
La respuesta correcta es C porque presenta literalmente lo que dice el texto: "publicado el pasado 15 de marzo". La opción B, aunque relacionada con el contenido, requiere conectar el porcentaje con el año 2024, lo cual también está explícito pero la opción C es más precisa en la información literal. Las opciones A y D son inferencias no sustentadas en el texto.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v2`
**Bloom:** [Understand]
**ICFES:** [Comprender el propósito de un texto informativo]
**Context:** Artículo sobre medio ambiente en Colombia

### Enunciado
"Un estudio del Instituto de Investigación de la Universidad Nacional reveló que el 78% de los ríos de la zona andina presentan algún nivel de contaminación por microplásticos. Los investigadores recomiendan implementar políticas públicas más estrictas."

¿Cuál es la intención comunicativa principal de este fragmento?

### Options
- [ ] A) Persuadir al lector para que deixe de usar plástico
- [ ] B) Narrar una historia sobre la contaminación del agua
- [x] C) Informar sobre los resultados de una investigación científica <!-- feedback: El texto presenta datos de un estudio con propósito informativo -->
- [ ] D) Promover los servicios del Instituto de la Universidad Nacional

### Explicación Pedagógica
La respuesta correcta es C porque el texto presenta datos de una investigación de manera objetiva. El fragmento no busca convencer (A), ni narrar una historia (B), ni hacer publicidad institucional (D). El lenguaje es neutral y presenta hallazgos científicos con el propósito de informar al lector.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v3`
**Bloom:** [Apply]
**ICFES:** [Aplicar estrategias de lectura a textos informativos]
**Context:** Noticia sobre educación en medios colombianos

### Enunciado
En una noticia del periódico El Tiempo aparece:

"De acuerdo con el informe del Ministerio de Educación, los resultados de las pruebas Saber 11 del año 2024 mostraron que solo el 45% de los estudiantes de grado 11 alcanzó un nivel satisfactorio en matemáticas."

¿Cuál es el propósito de incluir la fuente "Ministerio de Educación" en la noticia?

### Options
- [ ] A) Hacer publicidad al gobierno de turno
- [x] B) Dar credibilidad a la información presentada <!-- feedback: Citar fuentes oficiales aumenta la fiabilidad del dato informativo -->
- [ ] C) Llenar espacio en el artículo periodístico
- [ ] D) Confundir al lector con datos adicionales

### Explicación Pedagógica
La respuesta correcta es B. En un texto informativo, citar fuentes oficiales como el Ministerio de Educación le da validez y confiabilidad a los datos presentados. Los lectores pueden verificar la información consultando la fuente original. Las otras opciones no corresponden a prácticas periodísticas profesionales.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v4`
**Bloom:** [Understand]
**ICFES:** [Distinguir información principal de detalles]
**Context:** Reportaje sobre transporte público en Bogotá

### Enunciado
En un reportaje sobre TransMilenio se lee:

"Bogotá cuenta con el sistema de buses articulados más grande del mundo, con más de 140 kilómetros de rutas exclusivas. Durante las horas pico, el sistema moviliza aproximadamente 2,5 millones de usuarios diarios. Sin embargo, los expertos señalan que la infraestructura requiere inversiones por más de 5 billones de pesos."

¿Cuál es la información principal de este fragmento?

### Options
- [ ] A) La infraestructura requiere inversiones por más de 5 billones de pesos
- [x] B) Bogotá tiene el sistema de buses articulados más grande del mundo con 140 km de rutas y moviliza 2,5 millones de usuarios diarios <!-- feedback: Resume la información cuantitativa más relevante del reportaje -->
- [ ] C) Los expertos señalan problemas en TransMilenio
- [ ] D) TransMilenio es el mejor sistema de transporte del mundo

### Explicación Pedagógica
La respuesta correcta es B porque presenta los datos cuantitativos principales del reportaje: extensión del sistema, kilómetros de rutas y número de usuarios. La opción A es un detalle que complement la información. La opción C es una interpretación parcial, y la D es una valoración no sustentada en el texto.

---

## Question 5 (Variant Medium - Difficulty D5)

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v5`
**Bloom:** [Analyze]
**ICFES:** [Analizar la estructura de un texto informativo]
**Context:** Artículo de divulgación científica

### Enunciado
Un artículo científico sobre el calentamiento global presenta la siguiente estructura: 1) Introducción con datos estadísticos, 2) Método de investigación, 3) Resultados obtenidos, 4) Discusión de los hallazgos, 5) Conclusiones.

¿Qué tipo de estructura presenta este texto y cuál es su función comunicativa?

### Options
- [ ] A) Estructura narrativa - Su función es entretener al lector
- [x] B) Estructura científica - Su función es comunicar resultados de investigación de manera rigurosa <!-- feedback: La estructura con método, resultados y conclusiones corresponde a un texto científico -->
- [ ] C) Estructura literaria - Su función es generar belleza estética
- [ ] D) Estructura publicitaria - Su función es convencer para comprar un producto

### Explicación Pedagógica
La respuesta correcta es B. Los textos informativos de carácter científico siguen estructuras formales que incluyen método, resultados y conclusiones. Esto permite que otros investigadores puedan verificar y replicar el estudio. Los estudiantes suelen confundir esta estructura con otros tipos de textos.

---

## Question 6 (Variant Medium - Difficulty D5)

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v6`
**Bloom:** [Apply]
**ICFES:** [Interpretar información implícita en textos informativos]
**Context:** Reporte de noticias sobre economía colombiana

### Enunciado
En un artículo del portafolio se lee:

"El Banco de la República decidió mantener la tasa de interés de intervención en 12,25%, considerando que la inflación acumulada del último año llegó al 9,5%."

¿Qué información implícita se puede inferir de este párrafo?

### Options
- [ ] A) El Banco de la República quiere que la inflación suba más
- [x] B) Las tasas de interés altas buscan controlar la inflación elevada <!-- feedback: Tasa de intervención alta indica política monetaria restrictiva para controlar inflación -->
- [ ] C) Los bancos comerciales están arruinados
- [ ] D) Los colombianos no tienen acceso a créditos

### Explicación Pedagógica
La respuesta correcta es B. Cuando el Banco de la República sube o mantiene altas las tasas de interés, busca desalentar el consumo y la inversión para reducir la inflación. Este es un concepto económico básico que los estudiantes deben poder inferir. Las opciones A, C y D no se derivan lógicamente del texto.

---

## Question 7 (Variant Medium - Difficulty D5)

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v7`
**Bloom:** [Understand]
**ICFES:** [Evaluar la confiabilidad de fuentes]
**Context:** Artículo sobre salud pública en Colombia

### Enunciado
Un estudiante encuentra dos fuentes sobre el número de casos de dengue en Colombia:

Fuente 1: "El Ministerio de Salud reportó 85.000 casos de dengue en 2023, según el boletín oficial del 15 de enero de 2024."

Fuente 2: "Blog 'La verdad oculta': 'Colombia tiene más de 200.000 casos de dengue según estimaciones propias'."

¿Cuál fuente es más confiable para un trabajo académico y por qué?

### Options
- [ ] A) Fuente 2, porque usa un blog alternativo
- [x] B) Fuente 1, porque proviene de una entidad oficial con datos verificables <!-- feedback: Fuentes oficiales con fecha y publicación formal son más confiables académicamente -->
- [ ] C) Fuente 1, porque es más antigua
- [ ] D) Fuente 2, porque presenta números más grandes

### Explicación Pedagógica
La respuesta correcta es B. Para trabajos académicos, las fuentes oficiales como ministerios con boletines fechados son más confiables porque sus datos pueden verificarse. Los blogs personales o "estimaciones propias" carecen de rigor metodológico. La fecha más reciente no hace más confiable una fuente informal. El número mayor tampoco garantiza veracidad.

---

## Question 8 (Variant Medium - Difficulty D6)

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v8`
**Bloom:** [Analyze]
**ICFES:** [Identificar el propósito del autor en textos informativos]
**Context:** Entrevista en revista colombiana

### Enunciado
En una entrevista de Semana.com, un experto en tecnología afirma:

"No cabe duda de que la inteligencia artificial transformará todos los sectores económicos en los próximos diez años. Sin embargo, también debemos prepararnos para los desafíos éticos que esto implica."

¿Cuál es el propósito predominante del experto al realizar estas afirmaciones?

### Options
- [ ] A) Vender productos de tecnología
- [ ] B) Asustar a la población sobre el futuro
- [x] C) Informar sobre una tendencia tecnológica y generar reflexión ética <!-- feedback: El propósito es informar (transformación económica) y a la vez reflexionar (desafíos éticos) -->
- [ ] D) Atañkar a los empresarios colombianos

### Explicación Pedagógica
La respuesta correcta es C. El experto presenta información sobre una tendencia (transformación por IA) y simultáneamente invita a reflexionar sobre aspectos éticos. No hay intención comercial (A), ni busca generar pánico irracional (B), ni es un ataque específico (D). El lenguaje usado es balanced y objetivo.

---

## Question 9 (Variant Medium - Difficulty D6)

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v9`
**Bloom:** [Apply]
**ICFES:** [Sintetizar información de múltiples fuentes]
**Context:** Informe sobre educación en Colombia

### Enunciado
Un estudiante debe sintetizar información de tres artículos sobre la tasa de analfabetismo en Colombia:

Artículo 1: "El Dane reportó que el 5,3% de la población colombiana es analfabeta."
Artículo 2: "Según la UNESCO, Colombia redujo su tasa de analfabetismo del 7,2% al 5,3% en diez años."
Artículo 3: "El analfabetismo afecta principalmente a comunidades rurales y población indígena."

¿Cuál sintesis es correcta?

### Options
- [ ] A) Colombia tiene la tasa de analfabetismo más alta del mundo
- [x] B) Colombia pasó del 7,2% al 5,3% de analfabetismo según Dane y UNESCO, afectando principalmente zonas rurales <!-- feedback: Resume correctamente los datos de las tres fuentes sin añadir información -->
- [ ] C) La UNESCO inventó las cifras del Dane
- [ ] D) El analfabetismo no existe en Colombia actualmente

### Explicación Pedagógica
La respuesta correcta es B. Sintetiza correctamente los datos de las tres fuentes:百分比 (Dane/UNESCO), tendencia (reducción), y población afectada (Artículo 3). Las otras opciones contradicen los datos presentados o añaden información no sustentada. La síntesis debe integrar las fuentes sin distorsionar.

---

## Question 10 (Variant Medium - Difficulty D6)

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v10`
**Bloom:** [Evaluate]
**ICFES:** [Evaluar argumentos en textos informativos]
**Context:** Artículo de opinión sobre infraestructura vial

### Enunciado
En un artículo sobre los problemas de la infraestructura vial colombiana, el autor afirma:

"Es urgente que el gobierno invierta en dobles calzadas, porque los trancones causan pérdidas de 3.000 millones de pesos diarios a la economía. Además, el estrés vial afecta la salud mental de los conductores."

¿Qué tipo de falacia o debilidad argumentativa presenta este texto?

### Options
- [x] A) Mezcla datos económicos con argumentos de salud sin establecer relación causal clara <!-- feedback: Confunde dos argumentos diferentes sin demostrar conexión entre ellos -->
- [ ] B) Usa datos falsos sobre pérdidas económicas
- [ ] C) Defiende al gobierno más que analizar el problema
- [ ] D) No presenta ninguna debilidad, es un argumento sólido

### Explicación Pedagógica
La respuesta correcta es A. El texto presenta dos argumentos separados (pérdidas económicas Y estrés vial) sin explicar cómo se relacionan causalmente. Podríaargumentar que el estrés causa enfermedades que elevan costos, pero no lo hace. Las opciones B y C no pueden verificarse con el texto, y la D ignora la debilidad evidente del argumento.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v11`
**Bloom:** [Analyze]
**ICFES:** [Analizar la intención y postura del autor en textos informativos]
**Context:** Reportaje sobre conflicto armado en Colombia

### Enunciado
Un reportaje sobre el conflicto armado en Colombia incluye testimonios de víctimas, datos de la Fiscalía sobre combatants eliminados, y entrevistas con expertos que critican la política de paz.

¿Qué postura editorial se puede inferir del reportaje?

### Options
- [ ] A) Totalmente a favor del gobierno actual
- [ ] B) Exclusivamente del lado de las víctimas
- [x] C) Crítica hacia la política de paz, aunque presenta múltiples perspectivas <!-- feedback: La inclusión de expertos críticos junto con datos oficiales sugiere una postura analítica-crítica -->
- [ ] D) A favor de los grupos armados ilegales

### Explicación Pedagógica
La respuesta correcta es C. Un reportaje balanced presenta múltiples perspectivas, pero al incluir expertos que critican la política de paz mientras muestra testimonios de víctimas y datos oficiales, sugiere una postura que cuestiona los resultados de dicha política. Ninguna postura es completamente parcial porque incluye diversas voces.

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v12`
**Bloom:** [Analyze]
**ICFES:** [Evaluar la objetividad en textos informativos]
**Context:** Comparación de medios de comunicación colombianos

### Enunciado
El noticiero 'NCN' presenta una noticia sobre la reforma a la salud:

"El proyecto de reforma a la salud presentado por el Gobierno fue rechazado por los trabajadores del sector, quienes aseguran que pone en riesgo la atención de millones de pacientes."

La reportera María José añade al final: "El Gobierno sostiene que el proyecto sí garantiza la atención y mejorará la eficiencia del sistema."

¿Cuál es la función de la última frase en el reportaje?

### Options
- [x] A) Brindar equilibrio informativo al incluir la versión del gobierno <!-- feedback: La reportera incluye la otra cara de la noticia para no favorecer una sola postura -->
- [ ] B) Desmentir lo dicho por los trabajadores
- [ ] C) Confundir al televidente con información innecesaria
- [ ] D) Promover la reforma del gobierno

### Explicación Pedagógica
La respuesta correcta es A. En periodismo informativo balanced, se debe presentar las diferentes versiones del conflicto para que el espectador forme su propia opinión. Incluir la voz del gobierno equilibra la noticia. Las opciones B, C y D no corresponden al principio de objetividad periodística.

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v13`
**Bloom:** [Understand]
**ICFES:** [Comprender el uso del lenguaje técnico en textos informativos]
**Context:** Artículo sobre tecnología en medio colombiano

### Enunciado
Un artículo de prensa sobre tecnología incluye el siguiente párrafo:

"El machine learning o aprendizaje automático es una rama de la inteligencia artificial que permite a los sistemas aprender de datos sin ser programados explícitamente."

¿Cuál es la función de explicar "machine learning" entre paréntesis?

### Options
- [ ] A) Rellenar espacio en el artículo
- [x] B) Definir el término técnico para que el lector común lo comprenda <!-- feedback: Explicar términos técnicos es una estrategia para hacer accesible un texto especializado -->
- [ ] C) Demostrar que el periodista sabe más que el lector
- [ ] D) Confundir al lector con información innecesaria

### Explicación Pedagógica
La respuesta correcta es B. En textos informativos dirigidos al público general, es común definir términos técnicos para garantizar la comprensión. Esto hace el texto accesible sin perder precisión. Las otras opciones no corresponden a las buenas prácticas del periodismo informativo.

---

## Question 14 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v14`
**Bloom:** [Evaluate]
**ICFES:** [Evaluar la validez de los argumentos en textos informativos]
**Context:** Artículo sobre minería en la Sierra Nevada

### Enunciado
Un artículo informativo sobre minería ilegal en la Sierra Nevada de Santa Marta presenta los siguientes datos:

- 15.000 hectáreas de bosque destruidas por minería ilegal
- 8 comunidades indígenas afectadas
- Estudio de la Universidad de los Andes sobre impacto ambiental

¿Qué tipo de evidencia presenta el texto para respaldar sus afirmaciones?

### Options
- [x] A) Evidencia cuantitativa y cualitativa con fuentes académicas verificables <!-- feedback: Combina datos numéricos, témoignages y estudio universitario -->
- [ ] B) Solo opiniones de ambientalistas
- [ ] C) Solo datos sin contexto ni fuentes
- [ ] D) Información basada en rumores de la comunidad

### Explicación Pedagógica
La respuesta correcta es A. El texto combina datos numéricos (hectáreas), informações cualitativas (comunidades afectadas), y una fuente académica (Universidad de los Andes). Esta triangulación de fuentes fortalece la credibilidad del artículo. Las opciones B, C y D describen textos con evidencia incompleta.

---

## Question 15 (Variant Advanced - Difficulty D8)

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v15`
**Bloom:** [Create]
**ICFES:** [Producir inferencias a partir de información implícita]
**Context:** Reporte económico sobre industria bananera

### Enunciado
El following texto aparece en un informe económico:

"Aunque las exportaciones de banano colombiano crecieron un 8% respecto al año anterior, el ingreso per cápita de los trabajadores del sector permaneció estancado. Esto se explica parcialmente por el aumento del 15% en los costos de producción y la fluctuación del tipo de cambio."

Si el ingreso per cápita no creció a pesar de mayores exportaciones, ¿qué se puede inferir?

### Options
- [ ] A) Los trabajadores bananeros ganan más que el presidente
- [x] B) Las ganancias del crecimiento exportador se concentraron en los empresarios y no en los trabajadores <!-- feedback: Si las exportaciones crecen pero el ingreso de los trabajadores no mejora, el profit aumentó para empleadores -->
- [ ] C) El banano colombiano ya no se exporta
- [ ] D) Los trabajadores prefieren no trabajar más

### Explicación Pedagógica
La respuesta correcta es B. Cuando las exportaciones crecen pero los salarios reales no mejoran, indica que la productividad benefició principalmente a los empleadores (mayores beneficios netos). El texto menciona costos crecientes que explican parcialmente esta inequidad. Las opciones A, C y D son conclusiones ilógicas no sostenidas por los datos.

---

## Question 16 (Variant Advanced - Difficulty D8)

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v16`
**Bloom:** [Analyze]
**ICFES:** [Comparar información de diferentes textos informativos]
**Context:** Dos artículos sobre el mismo tema - migración venezolana

### Enunciado
Artículo 1: "Colombia es el país que más receive venezolanos en el mundo, con más de 2,9 millones de migrantes."
Artículo 2: "La integración de los venezolanos en Colombia ha mejorado significativamente, con 450.000 empleos formales registrados."

¿Cuál es la relación entre ambas informações según su función informativa?

### Options
- [ ] A) Son contradictorias porque hablan de temas diferentes
- [x] B) Son complementarias porque presentan diferentes aspectos del mismo fenómeno migratorio <!-- feedback: Uno presenta la magnitude, el otro las consecuencias positivas de la migración -->
- [ ] C) El segundo artículo contradice al primero
- [ ] D) No tienen relación porque son de medios diferentes

### Explicación Pedagógica
La respuesta correcta es B. El primer artículo informa sobre la escala del fenómeno migratorio, mientras el segundo informa sobre la integración. Juntas ofrecen una visión más completa. No son contradictorias porque hablan de aspectos diferentes (magnitud vs. integración). La fuente no determina la relación entre artículos.

---

## Question 17 (Variant Mastery - Difficulty D9)

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v17`
**Bloom:** [Evaluate]
**ICFES:** [Evaluar la coherencia y cohesión en textos informativos]
**Context:** Editorial sobre política educativa

### Enunciado
Un editorial sobre educación en Colombia presenta las siguientes oraciones:

1. "Los resultados de las pruebas PISA muestran a Colombia por debajo del promedio latinoamericano."
2. "Por isso, el gobierno anunció una inversión de 2 billones de pesos en educación."
3. "Los estudiantes colombianos aprenden más que los finlandeses según expertos."
4. "Esta inversión busca mejorar la calidad educativa en los próximos 5 años."

¿Cuál oración rompe la coherencia lógica del texto?

### Options
- [ ] A) Oración 1, porque no menciona las pruebas PISA
- [ ] B) Oración 2, porque no tiene relación con la inversión anunciada
- [x] C) Oración 3, porque contradice directamente lo expuesto en la oración 1 <!-- feedback: Si Colombia está por debajo del promedio, no puede aprender más que Finlandia, país top en PISA -->
- [ ] D) Oración 4, porque no menciona el plazo de 5 años

### Explicación Pedagógica
La respuesta correcta es C. La oración 3 contradice la oración 1: si Colombia está por debajo del promedio, no puede superar a Finlandia, que es uno de los mejores en PISA. Esta inconsistencia rompe la coherencia lógica del argumento. Las otras oraciones mantienen una relación causal y lógica entre sí.

---

## Question 18 (Variant Mastery - Difficulty D9)

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v18`
**Bloom:** [Analyze]
**ICFES:** [Interpretar datos estadísticos en textos informativos]
**Context:** Infografía sobre género y educación en Colombia

### Enunciado
Una infografía del Dane presenta los siguientes datos sobre educación superior:

- 58% de las mujeres entre 18 y 24 años acceden a educación superior
- 42% de los hombres entre 18 y 24 años acceden a educación superior
- La brecha salarial entre géneros es del 18%

¿Cuál interpretación incorrecta se puede hacer de estos datos?

### Options
- [ ] A) Más mujeres que hombres acceden a educación superior en ese rango de edad
- [x] B) La diferencia del 16% en acceso explica completamente la brecha salarial del 18% <!-- feedback: La diferencia de acceso no necesariamente causa directamente la brecha salarial, hay otros factores -->
- [ ] C) Los datos muestran una inequidad de género en acceso a la educación
- [ ] D) Hay más mujeres en educación superior que hombres en este grupo etario

### Explicación Pedagógica
La respuesta correcta es B. Aunque existe correlación entre acceso a educación superior y salarios, la diferencia del 16% en acceso no explica automáticamente la brecha salarial del 18%. Pueden existir otros factores como segregación ocupacional, discriminación directa, o diferencias en fields de estudio. Una interpretación reduccionista sería incorrecta.

---

## Question 19 (Variant Mastery - Difficulty D9)

**ID:** `CO-LEC-11-P1-textos-informativos-037-MASTERY-v19`
**Bloom:** [Create]
**ICFES:** [Desarrollar argumentos basados en múltiples textos informativos]
**Context:** Artículo de análisis sobre cambio climático

### Enunciado
Basándose en la siguiente información extraída de diferentes textos:

Texto 1: "Los glaciares tropicales de Colombia han perdido el 50% de su volumen en 30 años."
Texto 2: "La comunidad de Paramo dependía del derretimiento de glaciares para obtener agua."
Texto 3: "El gobierno implementó un sistema de acueductos alternativos para 15 comunidades."

¿Cuál sería una conclusão válida que integre las tres fuentes?

### Options
- [x] A) La pérdida de glaciares afecta comunidades que dependían de ellos, pero existen soluciones alternativas implementadas por el gobierno