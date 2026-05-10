<think>
The user wants me to generate exactly 20 multiple choice questions in the ICFES Saber 11 style for the Colombian state exam. The topic is "Lectura Crítica" (Critical Reading), specifically "comprensión literal" (literal comprehension), grade 11, period 1.

I need to output a markdown file with YAML frontmatter and exactly 20 questions following the strict format provided.

Let me create the content:

1. First, I need to create the frontmatter YAML block
2. Then 20 questions with progressive difficulty:
   - Questions 1-4: Difficulty D3-D4
   - Questions 5-10: Difficulty D5-D6
   - Questions 11-16: Difficulty D7-D8
   - Questions 17-20: Difficulty D9-D10

Each question must have:
- ID format: CO-LEC-11-P1-comprension-literal-033-MASTERY-vN
- Bloom level
- ICFES competence
- Context (modern Colombian context)
- Enunciado
- 4 options with correct one marked with [x] and feedback
- Explicación Pedagógica

Let me create 20 questions covering literal comprehension skills - these are questions about explicitly stated information in texts.

I'll create texts about various modern Colombian topics and contexts to make it relevant.

Note: The user specifies:
- bundle_index: 33
- The questions should be about literal comprehension (comprensión literal) which means understanding explicitly stated information in texts.
- Period 1, Grade 11
- Progressive difficulty

Let me generate the 20 questions now.

For literal comprehension, the questions should be about:
- Identifying main ideas
- Finding specific details
- Understanding explicitly stated information
- Recognizing sequences
- Finding definitions
- Understanding cause-effect stated explicitly
- Identifying time and place references
- Recognizing comparisons explicitly made

Let me start creating the questions:

</think>

```markdown
---
id: "CO-LEC-11-P1-comprension-literal-033-MASTERY"
country: "colombia"
grado: 11
asignatura: "lectura-critica"
tema: "comprension-literal"
periodo: 1
protocol_version: "5.1"
bundle_size: 20
bundle_index: 33
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-16T01:10:10.155168"
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

**ID:** `CO-LEC-11-P1-comprension-literal-033-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comprensión global del texto
**Context:** Economía urbana colombiana

### Enunciado
En un artículo sobre el crecimiento del comercio electrónico en Bogotá, se lee: "Durante el año 2024, las ventas por plataformas digitales en la capital aumentaron un 45%, representando el 30% del total de ventas del departamento." Según el texto, ¿qué porcentaje del total de ventas del departamento representó el comercio digital?

### Options
- [ ] A) 45% <!-- feedback: Este es el porcentaje de crecimiento, no el porcentaje del total de ventas -->
- [ ] B) 15% <!-- feedback: No corresponde a ningún dato mencionado en el texto -->
- [x] C) 30% <!-- feedback: Es el valor explícitamente mencionado como porcentaje del total de ventas -->
- [ ] D) 50% <!-- feedback: No aparece en el texto -->

### Explicación Pedagógica
La respuesta correcta es C porque el texto dice explícitamente "representando el 30% del total de ventas". Este es un caso típico donde los estudiantes confunden el porcentaje de crecimiento (45%) con el porcentaje del total. El distractor A es el error más común porque muchos读到 "aumentaron un 45%" y seleccionan ese número sin verificar qué representa realmente.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-LEC-11-P1-comprension-literal-033-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Identificación de información explícita
**Context:** Biodiversidad colombiana

### Enunciado
El siguiente texto aparece en un artículo sobre los páramos colombianos: "Los páramos son ecosistemas de alta montaña ubicados entre 2.800 y 4.500 metros sobre el nivel del mar. Colombia alberga aproximadamente el 50% de los páramos del mundo. Estas zonas son consideradas fábricas de agua debido a su capacidad de regulación hídrica." ¿Cuál de las siguientes afirmaciones está directamente respaldada por el texto?

### Options
- [ ] A) Los páramos se encuentran únicamente en Colombia <!-- feedback: El texto menciona que Colombia tiene el 50%, no que sean exclusivos del país -->
- [ ] B) Todos los páramos del mundo están en América del Sur <!-- feedback: Esta información no se menciona en el texto -->
- [x] C) Colombia tiene aproximadamente la mitad de los páramos del mundo <!-- feedback: El texto indica explícitamente "el 50% de los páramos del mundo" -->
- [ ] D) Los páramos se encuentran entre 2.800 y 4.500 metros solo en Colombia <!-- feedback: El texto no limita esa altitud solo a Colombia -->

### Explicación Pedagógica
La respuesta correcta es C porque el texto establece explícitamente que Colombia alberga "aproximadamente el 50% de los páramos del mundo". El distractor A es común porque los estudiantes infieren incorrectamente a partir de la información de porcentaje. La comprensión literal requiere identificar exactamente lo que el texto dice sin añadir información adicional.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-LEC-11-P1-comprension-literal-033-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Relación entre fragmentos del texto
**Context:** Política educativa colombiana

### Enunciado
En una noticia sobre la implementación del programa "Matrícula Cero" en universidades públicas del Valle del Cauca, se lee: "La medida aplicará para estudiantes con ingresos familiares menores a dos salarios mínimos mensuales legales vigentes. El beneficio comenzará a partir del segundo semestre de 2025 y cubrirá tanto matrícula como derechos de grado." Según el texto, ¿para quién aplica la medida?

### Options
- [ ] A) Para todos los estudiantes del Valle del Cauca <!-- feedback: El texto especifica un límite de ingresos -->
- [ ] B) Para estudiantes con ingresos menores a tres salarios mínimos <!-- feedback: El texto menciona dos salarios mínimos, no tres -->
- [x] C) Para estudiantes con ingresos familiares menores a dos salarios mínimos <!-- feedback: Es la condición explícitamente stated en el texto -->
- [ ] D) Para estudiantes que vivan en Cali exclusivamente <!-- feedback: El texto habla del Valle del Cauca, no solo de Cali -->

### Explicación Pedagógica
La respuesta correcta es C porque el texto indica específicamente que la medida aplica "para estudiantes con ingresos familiares menores a dos salarios mínimos mensuales". El distractor B es un error común donde estudiantes alteran un número del texto. El distractor A es frecuente porque muchos asumen que un programa público es universal. La lectura literal exige reproducir exactamente la condición mencionada.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-LEC-11-P1-comprension-literal-033-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Identificación de información explícita
**Context:** Infraestructura de transporte en Colombia

### Enunciado
Un comunicado del Ministerio de Transporte informa: "La construcción de la nueva vía de cuarto generación entre Medellín y el Puerto de Turbo tendrá una duración estimada de 36 meses y una inversión de 2.3 billones de pesos. Los trabajos iniciarán en marzo de 2026 con la construcción de tres túneles en el sector de San Carlos." Según el texto, ¿cuándo iniciarán los trabajos?

### Options
- [ ] A) En el año 2025 <!-- feedback: El texto indica que iniziaron en 2026, específicamente en marzo -->
- [x] B) En marzo de 2026 <!-- feedback: El texto menciona explícitamente "inicarán en marzo de 2026" -->
- [ ] C) En el segundo semestre de 2026 <!-- feedback: No se menciona el segundo semestre -->
- [ ] D) Después de construir los tres túneles <!-- feedback: El texto indica que los túneles se construirán durante la obra, no antes del inicio -->

### Explicación Pedagógica
La respuesta correcta es B porque el texto es explícito: "los trabajos iniciarán en marzo de 2026". El distractor D es especialmente engañoso porque sugiere una relación temporal que el texto no establece. Los estudiantes frecuentemente interpretan que la mención de los túneles implica una secuencia, pero el texto no indica que estos se construyan antes del inicio general de la obra.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-LEC-11-P1-comprension-literal-033-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Interpretación de información contextualizada
**Context:** Historia del arte en Colombia

### Enunciado
En una entrevista publicada en El Tiempo, la directora del Museo Nacional de Colombia afirma: "Para nosotros es fundamental que los jóvenes se sientan interesados en conocer su patrimonio. Por eso, hemos implementado visitas guiadas especialmente diseñadas para grupos escolares y tarifas preferenciales para menores de 18 años. El año pasado recibimos más de 15.000 estudiantes de educación básica y media." De la información proporcionada, ¿qué se puede afirmar sobre la política del museo?

### Options
- [ ] A) El museo tiene entradas gratuitas para todos los visitantes <!-- feedback: El texto menciona tarifas preferenciales, no entrada gratuita -->
- [ ] B) Los jóvenes menores de 18 años pagan lo mismo que los adultos <!-- feedback: El texto indica tarifas preferenciales, implicando que pagan menos -->
- [x] C) El museo ofrece tarifas reducidas para menores de 18 años <!-- feedback: La información explícita es "tarifas preferenciales para menores de 18 años" -->
- [ ] D) Solo los estudiantes de Bogotá pueden acceder al museo <!-- feedback: No se menciona ninguna restricción por ciudad -->

### Explicación Pedagógica
La respuesta correcta es C porque la directora indica explícitamente que hay "tarifas preferenciales para menores de 18 años". La palabra "preferenciales" implica reducción de precio. El distractor A es común porque los estudiantes infieren "gratis" a partir de "preferenciales". El distractor B es el error inverso: asumir que "preferenciales" significa precio completo. La comprensión literal requiere interpretar correctamente el significado de los términos utilizados.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-LEC-11-P1-comprension-literal-033-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Comprensión global del texto
**Context:** Economía cafetera colombiana

### Enunciado
La siguiente información aparece en el portal de la Federación Nacional de Cafeteros: "La producción de café en Colombia durante el año 2024 alcanzó los 11.4 millones de sacos, superando en un 8% la cosecha de 2023. Las exportaciones generaron ingresos por 3.500 millones de dólares. El consumo interno también creció, reaching los 2.1 millones de sacos." Según la información, ¿cuál fue el incremento en la producción entre 2023 y 2024?

### Options
- [ ] A) 8% de 11.4 millones de sacos <!-- feedback: Este cálculo requiere inferencia, no es dato directo del texto -->
- [ ] B) 2.1 millones de sacos <!-- feedback: Este es el consumo interno, no el incremento de producción -->
- [ ] C) La diferencia entre la producción de 2023 y los 11.4 millones <!-- feedback: Necesitaríamos el dato de 2023 que no se proporciona directamente -->
- [x] D) Un 8% respecto al año anterior <!-- feedback: El texto dice explícitamente "superando en un 8% la cosecha de 2023" -->

### Explicación Pedagógica
La respuesta correcta es D porque el texto explicitly states que la producción "superando en un 8% la cosecha de 2023". El distractor C es complicado porque para calcular el número exacto de sacos necesitaríamos saber cuánto se produjo en 2023, dato que no se da directamente. El distractor B confunde consumo interno con datos de producción. La comprensión literal pide identificar qué dice el texto directamente sin realizar cálculos adicionales.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-LEC-11-P1-comprension-literal-033-MASTERY-v7`
**Bloom:** Understand
**ICFES:** Identificación de información explícita
**Context:** Problemática ambiental urbana

### Enunciado
El Instituto de Hidrología, Meteorología y Estudios Ambientales (IDEAM) reportó: "Durante la temporada de menos lluvias de 2025, la calidad del aire en Bogotá alcanzó niveles históricamente buenos gracias a las medidas de restricción vehicular implementadas. Se registró una reducción del 35% en las concentraciones de material particulado. Sin embargo, las autoridades提醒aron que estos resultados pueden variar si no se mantiene la política de restricción los próximos años." ¿Qué medida contribuyó directamente a la mejora de la calidad del aire según el texto?

### Options
- [ ] A) El aumento de transporte público <!-- feedback: El texto no menciona cambios en transporte público -->
- [ ] B) La construcción de ciclo-rutas <!-- feedback: No se menciona construcción de infraestructura -->
- [x] C) Las restricciones vehiculares implementadas <!-- feedback: El texto indica que las medidas de "restricción vehicular" fueron las causantes de la mejora -->
- [ ] D) La reforestación urbana <!-- feedback: No se menciona ninguna acción de reforestación -->

### Explicación Pedagógica
La respuesta correcta es C porque el texto establece explícitamente que esto ocurrió "gracias a las medidas de restricción vehicular implementadas". El distractor A es común porque los estudiantes asumen que mejora del aire implica aumento de transporte público, pero esto no se menciona. La lectura literal exige identificar la causa mencionada en el texto, no inferir posibles causas adicionales.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-LEC-11-P1-comprension-literal-033-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Relación entre fragmentos del texto
**Context:** Salud pública en Colombia

### Enunciado
La Secretaría de Salud de Medellín publicó el siguiente comunicado: "El programa de vacunación contra el VPH ha logrado cobertura del 85% en adolescentes de 9 a 17 años durante el 2024. Esta cifra representa un incremento del 15% respecto al año anterior. El objetivo del programa es prevenir el cáncer de cuello uterino, que afecta a más de 5.000 mujeres anualmente en Colombia." Según el texto, ¿qué afirmación es correcta?

### Options
- [ ] A) En 2023, la cobertura fue del 100% <!-- feedback: El texto dice que hubo un incremento del 15%, si en 2024 fue 85%, entonces en 2023 fue 70%, no 100% -->
- [ ] B) La cobertura de 2024 aumentó 15 puntos porcentuales respecto a 2023 <!-- feedback: El texto dice "incremento del 15%", lo cual usualmente significa relativo, no necesariamente puntos porcentuales -->
- [x] C) El programa busca prevenir el cáncer de cuello uterino <!-- feedback: Es la declaración explícita del texto: "El objetivo del programa es prevenir el cáncer de cuello uterino" -->
- [ ] D) 5.000 mujeres fueron vacunadas en 2024 <!-- feedback: Las 5.000 mujeres se refieren a las afectadas por el cáncer, no a vacunas aplicadas -->

### Explicación Pedagógica
La respuesta correcta es C porque el texto clearly states que "el objetivo del programa es prevenir el cáncer de cuello uterino". El distractor D es un error frecuente donde los estudiantes confunden el número de mujeres afectadas por la enfermedad con el número de vacunas aplicadas. El distractor B requiere analizar la diferencia entre "15%" como porcentaje relativo versus puntos porcentuales, lo cual necesita información adicional que el texto no provee directamente.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-LEC-11-P1-comprension-literal-033-MASTERY-v9`
**Bloom:** Understand
**ICFES:** Identificación de información explícita
**Context:** Industria tecnológica colombiana

### Enunciado
En un artículo sobre startups tecnológicas colombianas se lee: "La empresa medellinense 'Tecnología con Alma' desarrolló una aplicación que traduce lengua de señas colombiana a texto en tiempo real. La herramienta, que utiliza inteligencia artificial, tiene actualmente 50.000 usuarios activos mensuales. Los fundadores recibieron una inversión inicial de 500 millones de pesos y buscan expandir su mercado a otros países de Latinoamérica." Según el texto, ¿cuál es el origen de la empresa?

### Options
- [ ] A) Bogotá <!-- feedback: El texto específicamente indica que es medellinense -->
- [x] B) Medellín <!-- feedback: El texto indica explícitamente que es una "empresa medellinense" -->
- [ ] C) Cali <!-- feedback: No se menciona Cali en el texto -->
- [ ] D) Barranquilla <!-- feedback: No se menciona Barranquilla en el texto -->

### Explicación Pedagógica
La respuesta correcta es B porque el texto identify the company as "medellinense", which means from Medellín. The student must know that "medellinense" is the demonym for people and things from Medellín. Option A is the trap where students confuse the capital with other cities. Literal comprehension requires recognizing adjectives and descriptors that identify people, places, or things explicitly mentioned in the text.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-LEC-11-P1-comprension-literal-033-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Interpretación de información contextualizada
**Context:** Economía cultural en Colombia

### Enunciado
El Ministerio de Cultura informó: "El programa 'Arte para la Paz' ha realizado actividades en los 32 departamentos del país durante el año 2024. Se ejecutaron 1.250 proyectos culturales con una inversión total de 85.000 millones de pesos. Entre las actividades destacadas se encuentran talleres de música, teatro comunitario y formación en oficios artísticos para jóvenes en situación de vulnerabilidad." ¿Cuántos proyectos se ejecutaron según el texto?

### Options
- [ ] A) 32 proyectos (uno por departamento) <!-- feedback: El texto menciona actividades en 32 departamentos pero los proyectos son más numerosos -->
- [ ] B) 1.250 только en ciertos departamentos <!-- feedback: El texto indica que se ejecutaron en todos los departamentos -->
- [x] C) 1.250 proyectos en total <!-- feedback: El texto explicitly states "Se ejecutaron 1.250 proyectos culturales" -->
- [ ] D) 85.000 millones de pesos en proyectos <!-- feedback: Este es el monto de la inversión, no la cantidad de proyectos -->

### Explicación Pedagógica
La respuesta correcta es C porque el texto explicitly states "Se ejecutaron 1.250 proyectos culturales". El distractor D es un error clásico donde los estudiantes confunden el valor monetario con la cantidad de proyectos. El distractor A surge de sobreinterpretar la mención de los 32 departamentos como si implicara un proyecto por departamento. La comprensión literal pide separar claramente los diferentes datos numéricos mencionados.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-LEC-11-P1-comprension-literal-033-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Evaluación de relaciones textuales
**Context:** Desarrollo sostenible en Colombia

### Enunciado
En un informe del Banco de la República sobre economía verde se lee: "Colombia ha logrado posicionarse como el tercer país con mayor capacidad de generación de energía solar en América Latina, con una potencia instalada de 1.800 megavatios. Este desarrollo ha sido posible gracias a las políticas de incentivos tributarios implementadas desde 2022 y a la inversión de más de 2.5 billones de pesos por parte del sector privado. Sin embargo, expertos señalan que la expansión del sector aún enfrenta desafíos en materia de transmisión eléctrica." ¿Cuál es la posición de Colombia en generación de energía solar según el texto?

### Options
- [ ] A) El primer lugar en América Latina <!-- feedback: El texto indica tercer lugar, no primer lugar -->
- [ ] B) Entre los cinco primeros pero sin especificar <!-- feedback: El texto дает una posición exacta: tercer lugar -->
- [x] C) Tercer lugar en América Latina <!-- feedback: El texto indica explícitamente "tercer país con mayor capacidad" -->
- [ ] D) Tercer lugar en el mundo <!-- feedback: El texto especifica "en América Latina", no en el mundo -->

### Explicación Pedagógica
La respuesta correcta es C porque el texto explicitly states "tercer país con mayor capacidad de generación de energía solar en América Latina". El distractor D es común donde los estudiantes omiten la limitación geográfica que el texto establece explícitamente. Este tipo de pregunta evalúa si el estudiante puede identificar no solo el dato principal, sino también su alcance o contexto específico.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-LEC-11-P1-comprension-literal-033-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Relación entre fragmentos del texto
**Context:** Educación superior en Colombia

### Enunciado
Un artículo sobre las pruebas Saber Pro reporta: "Los resultados del examen presentación en 2024 muestran que el 62% de los estudiantes universitarios de último año obtuvo resultados insuficientes en competencias genéricas. Esta cifra representa un aumento de 7 puntos porcentuales respecto a 2023. Las áreas con mayor Deficiencia fueron comunicación escrita y razonamiento cuantitativo." Según el texto, ¿cómo evolucionó el desempeño comparado con el año anterior?

### Options
- [ ] A) Mejoró porque el porcentaje aumentó <!-- feedback: Un aumento en resultados insuficientes indica empeoramiento, no mejora -->
- [ ] B) Permaneció igual ya que solo cambió 7% <!-- feedback: El texto indica que hubo un cambio de 7 puntos porcentuales, no que permaneció igual -->
- [ ] C) Empeoró porque hubo más estudiantes con resultados insuficientes <!-- feedback: El texto indica que el porcentaje de insufficiency aumentó, lo cual significa peor desempeño -->
- [ ] D) Mejoró en las áreas de comunicación escrita y razonamiento cuantitativo <!-- feedback: El texto indica Deficiencia en esas áreas, no mejora -->

### Explicación Pedagógica
La respuesta correcta es C porque el texto indica un "aumento" en el porcentaje de estudiantes con resultados insuficientes, lo cual representa un empeoramiento. El distractor A es un error lógico frecuente donde los estudiantes confunden "aumento" con "mejora" sin considerar qué se está aumentando. El distractor D confunde "deficiencia" (problema) con "mejora". La comprensión literal requiere interpretar correctamente el significado de los datos en su contexto.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-LEC-11-P1-comprension-literal-033-MASTERY-v13`
**Bloom:** Apply
**ICFES:** Interpretación de información contextualizada
**Context:** Política social en Colombia

### Enunciado
La directora del ICBF declaró en rueda de prensa: "Durante el 2024, atendimos a 1.3 millones de niños y niñas a través de nuestros programas de atención integral. De estos, el 40% corresponded a la primera infancia (0-5 años). Nuestros Hogares Infantiles cubrieron el 60% de esa población. Además, contamos con 8.500 profesionales capacitados para la atención." ¿Qué porcentaje de los atendidos corresponded a primera infancia según la directora?

### Options
- [ ] A) 40% de 1.3 millones fueron atendidos en Hogares Infantiles <!-- feedback: El texto indica que los Hogares Infantiles cubrieron el 60% de los de primera infancia, no el 40% del total -->
- [x] B) 40% del total de atendidos <!-- feedback: El texto indica explícitamente que "el 40% correspondió a la primera infancia" -->
- [ ] C) 60% de los atendidos <!-- feedback: El 60% se refiere a cuánto cubrieron los Hogares Infantiles de los de primera infancia, no al total -->
- [ ] D) 1.3 millones menos el 40% <!-- feedback: Esta no es una forma válida de interpretar el dato -->

### Explicación Pedagógica
La respuesta correcta es B porque el texto clearly states "el 40% correspondió a la primera infancia (0-5 años)". El distractor C es un error frecuente donde los estudiantes confunden el 60% de cobertura de los Hogares Infantiles con el porcentaje de la población total. La lectura literal exige identificar correctamente qué porcentaje corresponde a cada grupo mencionado en el texto.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-LEC-11-P1-comprension-literal-033-MASTERY-v14`
**Bloom:** Apply
**ICFES:** Comprensión global del texto
**Context:** Conflicto armado y paz en Colombia

### Enunciado
En un informe de la Fiscalía General de la Nación se lee: "Durante el 2024, la Fiscalía reportó un aumento del 23% en las denuncias por violencia intrafamiliar comparado con el 2023. Las cifras muestran que el 65% de las víctimas fueron mujeres. Del total de casos reportados, solo el 35% avanzó a etapa de investigación formal. Las autoridades atribuyen este fenómeno en parte al subregistro y al miedo de las víctimas a denunciar." Según el texto, ¿qué porcentaje de las denuncias avanzaron a investigación formal?

### Options
- [ ] A) 23% <!-- feedback: Este es el porcentaje de aumento de denuncias, no el de avance a investigación -->
- [ ] B) 65% <!-- feedback: Este es el porcentaje de víctimas mujeres, no el de casos que avanzaron -->
- [x] C) 35% <!-- feedback: El texto indica explícitamente que "solo el 35% avanzó a etapa de investigación formal" -->
- [ ] D) No se puede determinar con la información dada <!-- feedback: La información sí está dada: 35% -->

### Explicación Pedagógica
La respuesta correcta es C porque el texto clearly states "solo el 35% avanzó a etapa de investigación formal". El distractor A confunde el porcentaje de crecimiento con otro dato. El distractor B confunde un porcentaje de víctimas con otro de casos procesados. El distractor D niega la información que está explícitamente en el texto. Este tipo de pregunta evalúa si el estudiante puede extraer el dato correcto sin confundirlo con datos vecinos en el texto.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-LEC-11-P1-comprension-literal-033-MASTERY-v15`
**Bloom:** Analyze
**ICFES:** Evaluación de relaciones textuales
**Context:** Infraestructura vial en Colombia

### Enunciado
El Instituto Nacional de Vías (INVÍAS) publicó: "La construcción de la segunda calzada en el corredor Tumaco-Pasto tiene un avance del 45% y una inversión de 620.000 millones de pesos. Se espera
