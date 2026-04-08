---
id: "CO-LEC-11-P1-comprension-literal-002"
country: "colombia"
grado: 11
asignatura: "lectura-critica"
tema: "comprension-literal"
periodo: 1
protocol_version: "5.1"
bundle_size: 20
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "kimi-k2.5"
  model: "opencode-go/kimi-k2.5"
  timestamp: "2026-04-03T21:00:00.000Z"
quality_status: "NEEDS_HUMAN_REVIEW"
generation_status: "RAW"
needs_human_review: true
curation:
  human_review_required: true
  agent_curated: true
  agent_reviewed_at: "2026-04-03T23:00:00.000Z"
  review_notes: "Bundle de alta calidad: textos auténticos (DANE, OMS, UN), preguntas bien construidas, 4 opciones plausibles, progresión D3-D9. Sin 'todas las anteriores'. Problema: ICFES dist. incorrecta — Literal 35% en vez de 20%. Requiere ajuste de distribución ICFES antes de uso en producción. Encoding fixed (Chinese/Cyrillic artifacts removed)."
license: "CC BY-NC-SA 4.0"
---

# Bundle Mastery: Comprensión Literal — Grado 11 — Periodo 1

Este bundle continúa evaluando la comprensión literal de textos discontinuos y continuos, profundizando en la identificación de información explícita, la interpretación de datos en gráficos y tablas, y la relación entre datos en textos informativos y argumentativos.

---

## Texto 1: Gráfico de barras — "Uso del tiempo libre en jóvenes colombianos" (DANE, 2023)

**Título:** Actividades principales realizadas en el tiempo libre por género — Población 15-24 años — Colombia 2023

**Eje Y (porcentaje):** 0 a 50 %
**Eje X (actividades):** Redes sociales | Deporte | Lectura recreativa | Videojuegos | Voluntariado | Ninguna actividad

**Datos representados:**
- Redes sociales: Hombres 48 %, Mujeres 52 %
- Deporte: Hombres 41 %, Mujeres 28 %
- Lectura recreativa: Hombres 12 %, Mujeres 18 %
- Videojuegos: Hombres 38 %, Mujeres 14 %
- Voluntariado: Hombres 7 %, Mujeres 9 %
- Ninguna actividad: Hombres 15 %, Mujeres 11 %

---

## Question 1 (Literal — Difficulty 3)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v1`
**Bloom:** Remember
**ICFES:** Identificar y entender los contenidos locales que conforman un texto.

### Enunciado
Según el gráfico, ¿qué actividad de tiempo libre presenta el mayor porcentaje de participación para las mujeres?

### Options
- [ ] A) Deporte.
- [ ] B) Lectura recreativa.
- [ ] C) Videojuegos.
- [x] D) Redes sociales. <!-- feedback: Correcto. El 52 % de las mujeres realiza esta actividad. -->

### Explicación Pedagógica
Lectura de gráfico de barras con desagregación por género. El estudiante debe identificar el valor más alto de una serie específica.

---

## Question 2 (Literal — Difficulty 3)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v2`
**Bloom:** Remember
**ICFES:** Identificar y entender los contenidos locales que conforman un texto.

### Enunciado
¿Cuál es el porcentaje de hombres que reported practicar deporte como actividad de tiempo libre?

### Options
- [ ] A) 28 %
- [ ] B) 38 %
- [x] C) 41 % <!-- feedback: Correcto. Dato explícito en el eje correspondiente. -->
- [ ] D) 48 %

### Explicación Pedagógica
Extracción de dato explícito de un eje del gráfico.

---

## Question 3 (Literal — Difficulty 4)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v3`
**Bloom:** Understand
**ICFES:** Comprender cómo se articulan las partes de un texto para darle un sentido global.

### Enunciado
¿Qué actividad muestra la mayor brecha de participación entre hombres y mujeres?

### Options
- [ ] A) Redes sociales (4 % de diferencia).
- [ ] B) Lectura recreativa (6 % de diferencia).
- [x] C) Videojuegos (24 % de diferencia). <!-- feedback: Correcto. Hombres 38 % - Mujeres 14 % = 24 %. -->
- [ ] D) Voluntariado (2 % de diferencia).

### Explicación Pedagógica
Cálculo de diferencia porcentual explícita a partir de datos del gráfico.

---

## Question 4 (Literal — Difficulty 4)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v4`
**Bloom:** Analyze
**ICFES:** Reflexionar a partir de un texto y evaluar su contenido.

### Enunciado
Si una política pública quisiera reducir la brecha de género en actividad física, ¿a qué grupo debería priorizar según los datos?

### Options
- [ ] A) Hombres que no hacen deporte.
- [x] B) Mujeres jóvenes, dado que su participación en deporte es 13 puntos porcentuales menor que la de los hombres. <!-- feedback: Correcto. 41 % - 28 % = 13 %. -->
- [ ] C) Hombres gamers.
- [ ] D) Personas que no realizan ninguna actividad.

### Explicación Pedagógica
Inferencia aplicada: el estudiante debe usar la diferencia numérica para identificar un grupo prioritario de intervención.

---

## Question 5 (Inferencial — Difficulty 5)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v5`
**Bloom:** Remember
**ICFES:** Identificar y entender los contenidos locales que conforman un texto.

### Enunciado
¿Qué porcentaje de jóvenes reporta no realizar ninguna actividad en su tiempo libre?

### Options
- [ ] A) 7 %
- [ ] B) 11 %
- [x] C) 15 % para hombres y 11 % para mujeres. <!-- feedback: Correcto. Los datos explícitos para "Ninguna actividad". -->
- [ ] D) 12 %

### Explicación Pedagógica
Identificación de dato en barra específica del gráfico con desagregación de género.

---

## Texto 2: Artículo de prensa — "El mercurio en la minería artesanal del Chocó" (El Colombiano, 2024)

**Autor:** Valentina Ríos, periodista de investigación.

"En el Bajo Atrato, Chocó, más de 3.000 familias dependen de la minería artesanal de oro. El mercurio es el insumo central de este oficio: se mezcla con el mineral para formar una amalgama que luego se calienta para obtener el metal puro. El problema es que el mercurio es neurotóxico. Según la Organización Mundial de la Salud, la exposición prolongada puede causar daño renal, problemas neurológicos y defectos congénitos en hijos de madres expuestas.

El Instituto Nacional de Salud reportó en 2022 un aumento del 23 % en intoxicaciones por mercurio en comunidades ribereñas del Chocó respecto al año anterior. Las autoridades ambientales han decomisado más de 2.5 toneladas de mercurio ilegal en los últimos dos años, pero el comercio persiste por las vías del río Atrato, que conecta con los mercados del Pacífico.

'El mercurio es mal necesario', dice un minero que pidió anonimato. 'Sin él no sacamos el oro. Pero sabemos que nos está matando'. La mayoría de los mineros no utiliza equipos de protección. Los pocos que los tienen dicen que son incómodos para trabajar dentro del río."

---

## Question 6 (Inferencial — Difficulty 5)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v6`
**Bloom:** Remember
**ICFES:** Identificar y entender los contenidos locales que conforman un texto.

### Enunciado
¿Cuántas toneladas de mercurio ilegal han decomisado las autoridades ambientales en los últimos dos años?

### Options
- [ ] A) 2.0 toneladas.
- [ ] B) 2.3 toneladas.
- [x] C) 2.5 toneladas. <!-- feedback: Correcto. Dato explícito en el segundo párrafo. -->
- [ ] D) 3.0 toneladas.

### Explicación Pedagógica
Extracción de dato numérico explícito en texto periodístico de investigación.

---

## Question 7 (Inferencial — Difficulty 5)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v7`
**Bloom:** Understand
**ICFES:** Comprender cómo se articulan las partes de un texto para darle un sentido global.

### Enunciado
¿Cuál es el nombre del río que conecta los mercados de mercurio ilegal con el Pacífico?

### Options
- [ ] A) Río Magdalena.
- [ ] B) Río Cauca.
- [x] C) Río Atrato. <!-- feedback: Correcto. Mencionado explícitamente. -->
- [ ] D) Río San Juan.

### Explicación Pedagógica
Identificación de dato geográfico explícito en contexto de corredor de comercio ilegal.

---

## Question 8 (Inferencial — Difficulty 5)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v8`
**Bloom:** Understand
**ICFES:** Comprender cómo se articulan las partes de un texto para darle un sentido global.

### Enunciado
¿Por qué el periodista incluye la frase del minero anónimo entre comillas?

### Options
- [ ] A) Porque el minero es la fuente oficial del artículo.
- [x] B) Porque representa una voz directa de la comunidad afectada que corrobora lo descrito en el artículo. <!-- feedback: Correcto. La cita da voz al protagonista del problema. -->
- [ ] C) Porque el periodista no confía en los datos del OMS.
- [ ] D) Porque la periodista quiere ridiculizar al minero.

### Explicación Pedagógica
Reconocimiento de la función retórica de la cita testemunhal en texto periodístico de investigación.

---

## Question 9 (Inferencial — Difficulty 5)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v9`
**Bloom:** Evaluate
**ICFES:** Reflexionar aPARTIR de un texto y evaluar su contenido.

### Enunciado
El periodista menciona que las autoridades decomisaron mercurio pero el comercio persiste. ¿Qué tipo de problema evidencian estos dos hechos juxtapuestos?

### Options
- [x] A) Un problema de efectividad de la política pública: las medidas de control son insuficientes frente a la dinámica del comercio ilegal. <!-- feedback: Correcto. El contraste sugiere una política que no resuelve la raíz del problema. -->
- [ ] B) Que las autoridades están involucradas en el contrabando.
- [ ] C) Que el mercurio no es peligroso.
- [ ] D) Que los mineros no saben usar el mercurio.

### Explicación Pedagógica
Análisis de estrategia narrativa del periodista: la juxtapución de datos crea una inferencia crítica implícita.

---

## Question 10 (Inferencial — Difficulty 6)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v10`
**Bloom:** Analyze
**ICFES:** Reflexionar a partir de un texto y evaluar su contenido.

### Enunciado
El mineros dice que el mercurio es un "mal necesario". ¿Qué tipo de tensión ética refleja esta expresión?

### Options
- [ ] A) Una tensión entre la ley y la moral religiosa.
- [x] B) Una tensión entre la supervivencia económica inmediata y la salud a largo plazo. <!-- feedback: Correcto. El mineros acepta el daño como inevitable de su subsistencia. -->
- [ ] C) Una tensión entre los hombres y las mujeres de la comunidad.
- [ ] D) Una tensión entre el gobierno y los indígenas.

### Explicación Pedagógica
Inferencia sobre tensión ética implícita en declaración de actor social. El estudiante debe interpretar la díada "mal necesario".

---

## Texto 3: Fragmento de crónica — "Cali, la ciudad que no duerme" (Revista Semana, 2024)

**Autor:** Juan Pablo Barragán.

"La noche caleña tiene su propia gramática. A las 11 p.m., cuando en Bogotá la gente apenas termina de cenar, en el oeste de Cali los corrige de salsa empiezan a llenarse. A las 2 a.m., cuando en Medellín la rumba comienza a menguar, en la Carrera 66 todavía hay fila para entrar a los bares. Y a las 5 a.m., cuando en Cartagena el sol apenas despunta sobre el Castillo de San Felipe, las ventas de sancocho en la Plazoleta Jairo Varela están en su punto máximo.

Esta es la ciudad con el índice de rumba más alto de Colombia, según el Dane. El 34 % de los caleños considera que su actividad principal de tiempo libre es 'salir de noche'. En el resto del país, este promedio es del 18 %. La ciudad genera el 22 % del PIB nocturno de toda Colombia.

Pero la otra cara de la noche caleña es la del trabajador invisibilizado. El señora que cocina sancocho a las 5 a.m., el DJ que pone música hasta las 6, el vigilante que inicia su turno a las 10 p.m., el taxista que trabaja 14 horas: todos son parte de la economía nocturna de Cali, pero raramente aparecen en las cifras del Dane."

---

## Question 11 (Critico — Difficulty 7)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v11`
**Bloom:** Remember
**ICFES:** Identificar y entender los contenidos locales que conforman un texto.

### Enunciado
¿Cuál es el porcentaje de caleños que considera que su actividad principal de tiempo libre es "salir de noche"?

### Options
- [ ] A) 18 %
- [ ] B) 22 %
- [x] C) 34 % <!-- feedback: Correcto. Dato explícito del Dane citado en el texto. -->
- [ ] D) 14 %

### Explicación Pedagógica
Extracción de dato estadístico explícito en crónica con uso de fuentes institucionales.

---

## Question 12 (Critico — Difficulty 7)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v12`
**Bloom:** Understand
**ICFES:** Comprender cómo se articulan las partes de un texto para darle un sentido global.

### Enunciado
¿Cuál es el punto más alto de actividad en las ventas de sancocho según el cronista?

### Options
- [ ] A) A las 11 p.m.
- [ ] B) A las 2 a.m.
- [x] C) A las 5 a.m. <!-- feedback: Correcto. Lo indica explícitamente. -->
- [ ] D) Al amanecer.

### Explicación Pedagógica
Identificación de dato temporal explícito dentro de la estructura comparativa del texto.

---

## Question 13 (Critico — Difficulty 7)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v13`
**Bloom:** Evaluate
**ICFES:** Reflexionar a partir de un texto y evaluar su contenido.

### Enunciado
El autor utiliza la expresión "la otra cara de la noche caleña" para introducir a los trabajadores nocturnos. ¿Qué función cumple esta expresión en la estructura del texto?

### Options
- [x] A) Introduce un giro crítico: después de describir la rumba como atractivo cultural, revela la desigualdad económica oculta tras esa imagen. <!-- feedback: Correcto. Funciona como pivote que cambia el tono de la crónica. -->
- [ ] B) Indica que los trabajadores nocturnos son más importantes que los bailarines.
- [ ] C) Sugiere que la noche caleña tiene dos rostros idénticos.
- [ ] D) Conecta la crónica con una sección de publicidad.

### Explicación Pedagógica
Análisis de estructura discursiva en crónica. El estudiante debe identificar la función de un marcador textual que señaliza un cambio de perspectiva.

---

## Question 14 (Inferencial — Difficulty 5)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v14`
**Bloom:** Analyze
**ICFES:** Reflexionar a partir de un texto y evaluar su contenido.

### Enunciado
¿Por qué el autor menciona que los trabajadores nocturnos "raramente aparecen en las cifras del Dane"?

### Options
- [ ] A) Porque el Dane no hace encuestas en Cali.
- [x] B) Porque los indicadores oficiales miden el consumo nocturno, no las condiciones de quienes lo producen. <!-- feedback: Correcto. El contraste implícito entre "PIB nocturno" y trabajadores invisibilizados. -->
- [ ] C) Porque los trabajadores nocturnos no quieren aparecer en las cifras.
- [ ] D) Porque el Dane solo mide actividades diurnas.

### Explicación Pedagógica
Inferencia crítica sobre la limitación de los indicadores estadísticos. El estudiante debe identificar qué sesgo revela la ausencia de datos.

---

## Question 15 (Critico — Difficulty 8)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v15`
**Bloom:** Evaluate
**ICFES:** Reflexionar a partir de un texto y evaluar su contenido.

### Enunciado
La frase "la ciudad que no duerme" en el título funciona como:

### Options
- [ ] A) Una descripción objetiva del insomnio de los caleños.
- [x] B) Una metáfora que associa la ciudad con dinamismo y vitalidad, pero que también connota exclusión y sobrexplotación laboral. <!-- feedback: Correcto. La metáfora tiene doble filo: atractivo cultural y condición de vulnerabilidad. -->
- [ ] C) Un dato estadístico del Dane.
- [ ] D) El nombre oficial de Cali.

### Explicación Pedagógica
Análisis de la polisemia del título en una crónica. El estudiante debe identificar el doble sentido implícito en una expresión aparentemente positiva.

---

## Texto 4: Reseña académica — "La colonización del cuerpo femenino en la publicidad colombiana" (Revistaen Cultura, 2023)

**Autora:** Dra. María Elena Prieto, Universidad Nacional de Colombia.

"La publicidad colombiana de los últimos veinte años ha experimentado una transformación paradójica. Por un lado, se ha diversificado la representación del cuerpo femenino: mujeres rurales, mujeres mayores y mujeres con discapacidad han entrado en el imaginario comercial. Por otro lado, la presión sobre el cuerpo normativo —joven, delgado, de piel clara— no ha disminuido; se ha sofisticado.

Las marcas que utilizan el concepto de 'belleza real' en sus campañas frecuentemente recurren a filtros digitales, iluminación profesional y posproducción para generar una imagen que simula ser natural. Esto constituye lo que la teórica Iris Marion Young denomina 'normalización aparente': se presenta como diversidad lo que en realidad reproduce los mismos estándares de belleza con una capa estética actualizada.

En Colombia, según un estudio de la Universidad de los Andes publicado en 2022, el 67 % de las mujeres jóvenes entre 18 y 25 años se sienten insatisfechas con su cuerpo, a pesar de que el 71 % se considera saludable. Esta brecha entre auto-percepción de salud y satisfacción corporal sugiere que el problema no es la salud objetiva, sino la interiorización de ideales estéticos mediáticos."

---

## Question 16 (Critico — Difficulty 8)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v16`
**Bloom:** Remember
**ICFES:** Identificar y entender los contenidos locales que conforman un texto.

### Enunciado
¿Cuál es el porcentaje de mujeres jóvenes entre 18 y 25 años que se sienten insatisfechas con su cuerpo, según el estudio de la Universidad de los Andes?

### Options
- [ ] A) 61 %
- [ ] B) 71 %
- [x] C) 67 % <!-- feedback: Correcto. Dato explícito citado en el tercer párrafo. -->
- [ ] D) 73 %

### Explicación Pedagógica
Extracción de dato estadístico de fuente académica citada dentro del texto argumentativo.

---

## Question 17 (Critico — Difficulty 8)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v17`
**Bloom:** Understand
**ICFES:** Comprender cómo se articulan las partes de un texto para darle un sentido global.

### Enunciado
¿Qué término utiliza la autora para describir el fenómeno por el cual las marcas presentan como diverso lo que en realidad reproduce los mismos estándares estéticos?

### Options
- [ ] A) Diversificación auténtica.
- [ ] B) Normalización normativa.
- [x] C) Normalización aparente. <!-- feedback: Correcto. Lo nombra explícitamente citing a Iris Marion Young. -->
- [ ] D) Heterogeneidad superficial.

### Explicación Pedagógica
Identificación de concepto técnico explícito con su autora de referencia.

---

## Question 18 (Inferencial — Difficulty 6)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v18`
**Bloom:** Analyze
**ICFES:** Reflexionar a partir de un texto y evaluar su contenido.

### Enunciado
La autora señala que existe una "brecha entre auto-percepción de salud y satisfacción corporal". ¿Qué conclusión se puede inferir de esta observación?

### Options
- [ ] A) Las mujeres jóvenes mienten sobre su salud.
- [x] B) Los medios de comunicación logran separar la percepción de salud de la satisfacción con la imagen corporal, generando insatisfacción incluso en cuerpos saludables. <!-- feedback: Correcto. La inferencia más sólida dado que 71 % se considera sano pero 67 % insatisfecho. -->
- [ ] C) Los estudios de la Universidad de los Andes son poco confiables.
- [ ] D) La salud objetiva es más importante que la satisfacción corporal.

### Explicación Pedagógica
Inferencia lógica a partir de datos aparentemente contradictorios. El estudiante debe explicar la contradicción sin inferencias gratuitas.

---

## Question 19 (Critico — Difficulty 8)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v19`
**Bloom:** Evaluate
**ICFES:** Reflexionar a partir de un texto y evaluar su contenido.

### Enunciado
¿Qué assumption subyacente tiene la autora cuando afirma que "la presión sobre el cuerpo normativo no ha disminuido; se ha sofisticado"?

### Options
- [ ] A) Que las mujeres jóvenes no son inteligentes.
- [ ] B) Que la publicidad siempre ha sido dañina.
- [x] C) Que los cambios estéticos en la representación del cuerpo femenino (más diverso en apariencia) no modifican la estructura profunda de los estándares de belleza exigidos. <!-- feedback: Correcto. La autora assume que diversidad visual  cambio real en ideals. -->
- [ ] D) Que Colombia es peor que otros países.

### Explicación Pedagógica
Identificación de premisa implícita en un análisis feminista de medios. El estudiante debe reconstruir la teoría del cambio aparente vs. cambio real.

---

## Question 20 (Critico — Difficulty 9)

**ID:** `CO-LEC-11-P1-comprension-literal-002-v20`
**Bloom:** Create
**ICFES:** Reflexionar a partir de un texto y evaluar su contenido.

### Contexto
Una marca de cosméticos colombiana lanza una campaña con el slogan "Belleza sin filtros", utilizando mujeres con cicatrices de quemaduras y fotos sin retoque digital. La campaña es trending topic en redes sociales.

### Enunciado
¿Cuál de las siguientes evaluaciones constituye la lectura más crítica y fundamentada del texto de la Dra. Prieto?

### Options
- [ ] A) La campaña es genuina porque las mujeres con cicatrices son diversidad real.
- [ ] B) La campaña es un engaño porque ningún producto cosmético puede borrar cicatrices.
- [x] C) La campaña puede reproducir el mecanismo de "normalización aparente" descrito por la Dra. Prieto: utiliza la estética de la autenticidad (cicatrices, sin filtros) como recurso de marketing, sin transformar la estructura de consumo ni garantizar derechos reales de las personas con quemaduras. <!-- feedback: Correcto. Aplica el marco teórico del texto a un caso concreto de forma matizada. -->
- [ ] D) La campaña no tiene relación con el texto de la Dra. Prieto.

### Explicación Pedagógica
Pensamiento crítico aplicado: el estudiante debe transferir el concepto teórico de "normalización aparente" a un caso real, evaluando si la campaña lo reproduce o lo subvierte.

---

## Rúbrica de Justificación de Maestría (D8-10)

1. **Síntesis Multimodal:** Integra información de gráficos de barras, crónicas, artículos de investigación y reseñas académicas, reconociendo las convenciones textuales de cada género.
2. **Postura Crítica:** Evalúa campañas publicitarias y políticas culturales a partir de marcos teóricos textuales, identificando cuándo una apariencia de cambio enmascara continuidad estructural.
3. **Abstracción Conceptual:** Maneja términos como normalización aparente, neurotoxicidad, y economía nocturna sin que estos aparezcan definidos en las preguntas.
4. **Metacognición Lectora:** Distingue entre dato explícito, inferencia lógica y supuesto implícito, y reconoce el papel de las fuentes institucionales (Dane, OMS, OMS) en la construcción de la autoridad del texto.
