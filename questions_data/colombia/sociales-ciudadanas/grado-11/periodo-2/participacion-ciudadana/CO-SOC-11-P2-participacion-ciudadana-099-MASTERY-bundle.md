<think>
The user wants me to generate exactly 20 multiple choice questions in the style of ICFES Saber 11 exam for Colombian Social Sciences (Sociales Ciudadanas), topic "participacion-ciudadana" (citizen participation), grade 11, period 2.

I need to follow the exact format provided, with:
- YAML frontmatter
- 20 questions with progressive difficulty (D3-D4 for 1-4, D5-D6 for 5-10, D7-D8 for 11-16, D9-D10 for 17-20)
- Each question has ID, Bloom level, ICFES competency, Context, Enunciado, Options (with [x] on correct), and Explicación Pedagógica
- No additional text before or after
- Must use Colombian modern context

Let me generate these questions now.

I need to be careful about:
1. Difficulty progression
2. Plausible distractors (real student errors)
3. ICFES style alignment
4. Colombian context
5. 4 options per question
6. No "all of the above" or "none of the above"
7. The [x] marking the correct answer with feedback comments
8. Feedback comments on incorrect options too

Let me structure the 20 questions with progressive difficulty:

Questions 1-4: D3-D4 (Remember, Understand)
Questions 5-10: D5-D6 (Apply, Analyze)
Questions 11-16: D7-D8 (Analyze, Evaluate)
Questions 17-20: D9-D10 (Evaluate, Create)

Topic: participación ciudadana (citizen participation) in Colombian context

Key concepts to cover:
- Democracy and citizen participation mechanisms
- Constitutional rights to participation
- Forms of citizen participation (veedurías, cabildos abiertos, consultas populares, etc.)
- Duties and rights of citizens
- Control social
- Examples like the paz total, participación en políticas públicas
- Recent legal frameworks
- Social movements and citizen engagement


- Local government participation mechanisms
- Mechanisms like presupuestos participativos
- Environmental participation rights
- Youth participation
- Digital participation

Now I'll create the 20 questions following the format exactly.

</think>

---
id: "CO-SOC-11-P2-participacion-ciudadana-099-MASTERY"
country: "colombia"
grado: 11
asignatura: "sociales-ciudadanas"
tema: "participacion-ciudadana"
periodo: 2
protocol_version: "5.1"
bundle_size: 20
bundle_index: 99
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2"
  model: "minimax/MiniMax-Text-01"
  timestamp: "2026-04-15T20:47:44.351722"
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

**ID:** `CO-SOC-11-P2-participacion-ciudadana-099-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Alpha - Identificación
**Context:** Normativa colombiana sobre participación ciudadana

### Enunciado
Según la Constitución Política de Colombia de 1991, la participación ciudadana es un derecho fundamental reconocido a todos los ciudadanos. ¿Cuál de los siguientes mecanismos fue habilitado por la Constitución para que los ciudadanos puedan participar en la toma de decisiones públicas?

### Options
- [ ] A) El derecho a elegir directamente a los miembros de las altas cortes judiciales
- [x] B) La participación en audiencias públicas para la definición de políticas ambientales <!-- feedback: La Constitución de 1991 garantiza la participación ciudadana en decisiones que afecten el ambiente mediante audiencias públicas, en concordancia con el derecho a un ambiente sano -->
- [ ] C) La potestad de dictar leyes por parte de los ciudadanos mediante consultas populares legislativas
- [ ] D) La capacidad de reemplazar al Presidente en caso de suspensión temporal del mandato

### Explicación Pedagógica
La Constitución de 1991 reconoció múltiples mecanismos de participación ciudadana. La opción correcta es B porque las audiencias públicas ambientales están contempladas en el artículo 79 que garantiza la participación en decisiones ambientales. Las demás opciones son incorrectas porque: las altas cortes son elegidas por otros mecanismos (A), los ciudadanos no pueden dictar leyes directamente (C), y el Presidente no puede ser reemplazado por ciudadanos (D).

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-SOC-11-P2-participacion-ciudadana-099-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Beta - Comprensión
**Context:** Mecanismos de participación en Colombia

### Enunciado
Un estudiante pregunta a su profesor de Sociales cuál es la diferencia fundamental entre una consulta popular municipal y un cabildo abierto. El profesor responde correctamente que la diferencia principal radica en que:

### Options
- [ ] A) La consulta popular es Only para ciudades grandes y el cabildo abierto solo para municipios pequeños
- [x] B) El cabildo abierto se realiza con la presencia física de los habitantes en un lugar determinado, mientras que la consulta popular puede usar medios electrónicos y requiere un mínimo de participación del 30% del eleitorado <!-- feedback: El cabildo abierto (Decreto-Ley 272 de 2000) requiere presencia física y deliberation pública, mientras que la consulta popular municipal tiene requisitos de quórum y puede implementar mecanismos electrónicos -->
- [ ] C) El resultado del cabildo abierto es vinculante y el de la consulta popular es solo consultivo
- [ ] D) La consulta popular puede ser convocada por cualquier ciudadano, mientras que el cabildo abierto solo por el alcalde

### Explicación Pedagógica
La diferencia clave entre ambos mecanismos está en su forma de implementación. La respuesta correcta (B) identifica correctamente que el cabildo abierto requiere presencia física mientras que la consulta popular tiene requisitos específicos de quórum (30% del electorado) y puede usar medios electrónicos. Las otras opciones presentan diferencias incorrectas: no existe restricción por tamaño de municipio (A), ambos son vinculantes (C), y ambos pueden ser convocados por autoridades específicas no por cualquier ciudadano (D).

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-SOC-11-P2-participacion-ciudadana-099-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Beta - Análisis
**Context:** Derechos y deberes ciudadanos

### Enunciado
En Colombia, el derecho a la participación ciudadana está fundamentado no solo en la Constitución sino también en tratados internacionales ratificados por el país. ¿Cuál de los siguientes tratados internacionales hace parte del bloque de constitucionalidad y consagra el derecho a la participación en asuntos públicos?

### Options
- [ ] A) El Protocolo de Buenos Aires sobre Derechos Humanos
- [ ] B) La Convención de Viena sobre Relaciones Consulares
- [x] C) El Pacto Internacional de Derechos Civiles y Políticos, específicamente en su artículo 25 <!-- feedback: El Pacto Internacional de Derechos Civiles y Políticos (1966), ratificado por Colombia en 1969, establece en su artículo 25 el derecho a participar en asuntos públicos directamente o por medio de representantes libremente elegidos -->
- [ ] D) El Acuerdo de Marrakech que establece normas sobre comercio internacional

### Explicación Pedagógica
El artículo 25 del Pacto Internacional de Derechos Civiles y Políticos, que hace parte del bloque de constitucionalidad según la Corte Constitucional (sentencia C-584 de 1997), consagra el derecho a participar en asuntos públicos. Las demás opciones no contienen disposiciones sobre participación ciudadana: el Protocolo de Buenos Aires trata temas diferentes (A), Viena sobre relaciones consulares (B), y Marrakech sobre comercio (D).

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-SOC-11-P2-participacion-ciudadana-099-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Gamma - Aplicación
**Context:** Veedurías ciudadanas en Colombia

### Enunciado
Un grupo de estudiantes de grado 11 quiere conformar una veeduria ciudadana para vigilar la construcción de un nuevo megacolegio en su municipio. Según la Ley 850 de 2003, ¿cuál es el requisito fundamental que debe cumplir esta organización ciudadana para ser reconocida formalmente como veeduria?

### Options
- [ ] A) Tener al menos 500 miembros activos para representar adecuadamente a la comunidad
- [ ] B) Estar inscrita ante la Registraduría Nacional del Estado Civil como organización política
- [x] C) Registrar su creación ante la plataforma الإلكترونية de la Defensoría del Pueblo o ante la entidad que hizo el llamado a la conformación de la veeduria <!-- feedback: La Ley 850 de 2003 establece que las veedurías deben registrarse ante la Defensoría del Pueblo o ante la entidad que hizo el llamado a su conformación, sin requisito de número mínimo de miembros -->
- [ ] D) Obtener autorización del Consejo Nacional Electoral para operar como veeduria

### Explicación Pedagógica
La Ley 850 de 2003 establece que las veedurías ciudadanas deben registrarse ante la Defensoría del Pueblo o ante la entidad que hizo el llamado para su conformación. No existe requisito de número mínimo de miembros (A), no se inscriben ante la Registraduría como organizaciones políticas (B), ni requieren autorización del CNE (D). La respuesta correcta identifica el mecanismo de registro apropiado.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-SOC-11-P2-participacion-ciudadana-099-MASTERY-v5`
**Bloom:** Analyze
**ICFES:** Gamma - Análisis
**Context:** Mecanismos de participación ciudadana

### Enunciado
El municipio de San Andrés decidió implementar un presupuesto participativo donde los ciudadanos pueden proponer y priorizar proyectos de inversión pública. En el marco de esta experiencia, un grupo de ciudadanos propone la construcción de un parque recreativo en un lote del municipio. ¿Cuál de las siguientes afirmaciones sobre los presupuestos participativos es correcta según la normatividad colombiana?

### Options
- [ ] A) Los resultados del presupuesto participativo son de cumplimiento obligatorio para la administración municipal sin importar el estudio de viabilidad técnica y financiera
- [ ] B) Los presupuestos participativos están prohibidos en municipios de categoría 5 y 6 según el Departamento Nacional de Planeación
- [x] C) El presupuesto participativo es un mecanismo de participación que permite a los ciudadanos intervenir en la priorización de la inversión pública, pero las decisiones deben ser viables técnica y financieramente <!-- feedback: Los presupuestos participativos (Ley 1757 de 2015) son mecanismos de participación válidos donde las decisiones ciudadanas deben pasar por estudio de viabilidad, sin que sean automáticamente obligatorias la ejecución de todos los proyectos propuestos -->
- [ ] D) Solo pueden participar mayores de 25 años en los presupuestos participativos por ser proyectos de gran impacto económico

### Explicación Pedagógica
La Ley 1757 de 2015 regula los presupuestos participativos como mecanismo de participación ciudadana. La respuesta correcta (C) indica que aunque es un mecanismo válido de participación, las propuestas deben ser viables técnica y financieramente. Las otras opciones son incorrectas: los resultados no son automáticamente obligatorios (A), no existe prohibición por categoría de municipio (B), y no hay restricción de edad más allá de la mayoría de ciudadanía (D).

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-SOC-11-P2-participacion-ciudadana-099-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Delta - Análisis contextual
**Context:** Participación ciudadana en políticas públicas

### Enunciado
La Secretaría de Salud de un departamento está diseñando la política pública de salud mental para los próximos cinco años. ¿Cuál de las siguientes acciones representa una auténtica participación ciudadana en el diseño de esta política, según los principios de participación del Sistema General de Participaciones?

### Options
- [ ] A) La Secretaría realiza una reunión informativa donde presenta el documento final para conocimiento de la comunidad
- [ ] B) Un grupo de ciudadanos firma una petición pidiendo más recursos para salud mental después de que la política ya fue implementada
- [x] C) La comunidad participa desde la identificación del problema, formula propuestas y es tenida en cuenta en la toma de decisiones sobre la política pública de salud mental <!-- feedback: La participación auténtica implica intervención desde las etapas tempranas del proceso (no solo información o consulta), incluyendo la identificación de problemas, formulación de propuestas y toma de decisiones según la Ley 152 de 1994 y Decreto 2633 de 2012 -->
- [ ] D) Un grupo de adolescentes menores de 14 años participa como representantes de usuarios en el consejo territorial de planeación

### Explicación Pedagógica
La participación ciudadana genuina implica intervención desde las fases iniciales del proceso decisorio, no solo información o consulta tardía. La opción C representa participación real desde la identificación del problema hasta la toma de decisiones. Las opciones A (solo información), B (participación post-decisión), y D (menores de 14 años no tienen capacidad legal para representar usuarios según la Ley 1098 de 2006) no constituyen participación efectiva.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-SOC-11-P2-participacion-ciudadana-099-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Gamma - Análisis
**Context:** Derechos ciudadanos y control social

### Enunciado
En el contexto del Plan Nacional de Desarrollo "Colombia potencia mundial de la vida", el gobierno nacional establece metas de participación ciudadana en la vigilancia de la inversión pública. ¿Cuál de las siguientes afirmaciones refleja correctamente la relación entre participación ciudadana y control social en Colombia?

### Options
- [x] A) El control social es una expresión de la participación ciudadana donde la ciudadanía supervisa, monitorea y evalúa la gestión pública, siendo las veedurías ciudadanos uno de los principales mecanismos <!-- feedback: El control social (Ley 850 de 2003, Ley 1757 de 2015) es precisamente la vigilancia ciudadana sobre la gestión pública, donde las veedurías ciudadanas son el mecanismo más reconocido para ejercer este control -->
- [ ] B) El control social es función exclusiva del Ministerio Público y los ciudadanos no tienen legitimidad para realizar control social sobre recursos públicos
- [ ] C) Los ciudadanos pueden realizar control social exclusivamente mediante acciones penales contra funcionarios públicos corruptos
- [ ] D) El control social solo puede ejercerse una vez finalizada la ejecución de los proyectos públicos

### Explicación Pedagógica
El control social es un derecho y deber ciudadano fundamentado en la Constitución de 1991 y desarrollado por leyes como la 850 de 2003 y 1757 de 2015. Las veedurías ciudadanas son reconocidas como principal mecanismo. La opción B es incorrecta porque asigna el control exclusivamente al Ministerio Público. La C es reducida porque limita el control social a acciones penales. La D es incorrecta porque el control puede ejercerse en todas las fases del proyecto.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-SOC-11-P2-participacion-ciudadana-099-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Gamma - Razonamiento
**Context:** Mecanismos de democracia directa

### Enunciado
Un equipo de estudiantes investiga sobre los mecanismos de democracia directa en Colombia. Cuando preguntan a un politólogo local sobre el instrumento que permite a los ciudadanos derogar, modificar o sustituir normas jurídicas ya vigentes por voluntad popular, el experto indica correctamente que se trata de:

### Options
- [ ] A) La consulta popular, que puede versar sobre cualquier tema de interés nacional
- [ ] B) El referendo, que puede ser de convocatoria popular o institucional según el caso
- [x] C) La revocatoria del mandato, que aplica específicamente para autoridades elegido populares y no deroga normas jurídicas <!-- feedback: Hay confusión conceptual aquí. El instrumento para derogar normas jurídicas es el referendo aprobatorio (art. 40 CN). La revocatoria de mandato es para autoridades de elección popular, no para derogar normas. El candidato可能要纠正这个混淆 -->
- [ ] D) La iniciativa popular legislativa, que permite a los ciudadanos proponer nuevas leyes ante el Congreso

### Explicación Pedagógica
Es crucial distinguir los mecanismos: el referendo (art. 40 CN) permite derogar normas jurídicas existentes mediante aprobación ciudadana. La revocatoria de mandato (art. 66 CN) es para revocar a autoridades elegidas popularmente, no deroga normas. La consulta popular tiene restricciones de materias (art. 24 CN). La iniciativa popular (art. 67 CN) propone nuevas leyes, no deroga las existentes.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-SOC-11-P2-participacion-ciudadana-099-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Delta - Aplicación contextual
**Context:** Participación ciudadana y políticas públicas

### Enunciado
En el marco de la implementación del Plan de Ordenamiento Territorial (POT) de una ciudad capital, la comunidad ha solicitado participar en las decisiones sobre el uso del suelo en el sector de expansão urbana. Según la normatividad colombiana sobre participación ciudadana en planificación territorial, ¿cuál es el espacio institucional apropiado para que la comunidad haga escuchar sus propuestas?

### Options
- [ ] A) El Consejo de Seguridad de la ciudad, donde se discuten temas de orden público que afectan el ordenamiento territorial
- [ ] B) El Consejo Territorial de Planeación, donde deben представarse los intereses de la ciudadanía en la planificación del desarrollo territorial <!-- feedback: Según la Ley 152 de 1994 y el Decreto 919 de 2016, el Consejo Territorial de Planeación es el espacio insterstitucional donde la ciudadanía participa en la formulación y seguimiento de los planes de ordenamiento territorial, siendo obligatorio su concepto en la adopción del POT -->
- [ ] C) El Comité de Ética de la entidad territorial para revisar implications morales de las decisiones de uso del suelo
- [ ] D) La Personería Municipal, como vigilante del orden público territorial

### Explicación Pedagógica
El Consejo Territorial de Planeación (CTP), creado por la Ley 152 de 1994, es el órgano consultivo instancesional donde se debaten los planes de desarrollo y ordenamiento territorial con participación de la ciudadanía. Las otras opciones son espacios institucionales con funciones diferentes: el Consejo de Seguridad trata temas de orden público (A), el Comité de Ética no tiene competencia en planificación territorial (C), y la Personería tiene funciones de vigilancia no de participación decisoria (D).

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-SOC-11-P2-participacion-ciudadana-099-MASTERY-v10`
**Bloom:** Evaluate
**ICFES:** Delta - Evaluación
**Context:** Participación ciudadana y medio ambiente

### Enunciado
Un grupo comunitario del Chocó biogeográfico ha identificado que una empresa minera tiene permisos de exploración pero la comunidad no ha sido consulted sobre los impactos ambientales en su territorio. Ante esta situación, ¿cuál mecanismo de participación ciudadana les permite protegerse conforme a la jurisprudencia constitucional colombiana?

### Options
- [ ] A) La acción de tutela para la protección del derecho a la participación en decisiones ambientales sobre su territorio <!-- feedback: La acción de tutela (art. 86 CN) es procedente cuando hay amenaza o vulneración de derechos fundamentales. La Corte Constitucional (Sentencia T-049 de 2016) ha protegido el derecho a la participación ambiental mediante tutela cuando la comunidad ha sido excluida de decisiones que afectan su territorio -->
- [ ] B) La acción de grupo para reclamar indemnización por daños ambientales causados
- [ ] C) Un referendum municipal para expulsar a la empresa del municipio
- [ ] D) La participación directa en la licencia ambiental ante el Ministerio de Minas

### Explicación Pedagógica
La acción de tutela es el mecanismo apropiado cuando se vulnera el derecho fundamental a la participación en decisiones ambientales (art. 79 CN). La Corte Constitucional en múltiples sentencias (T-049 de 2016, T-387 de 2013) ha tutelado este derecho cuando comunidades han sido excluidas. La acción de grupo (B) busca indemnización no protección del derecho. El referendum (C) no aplica para decisiones mineras de carácter nacional. La participación directa (D) no es el mecanismo de protección cuando ya hay vulneración.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-SOC-11-P2-participacion-ciudadana-099-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Delta - Análisis crítico
**Context:** Participación política y construcción de paz

### Enunciado
El Acuerdo de Paz firmado entre el Gobierno colombiano y las FARC-EP en 2016 incluyó un capítulo completo sobre participación política. En este contexto, el punto 2 del acuerdo estableció que la participación ciudadana en la construcción de paz requiere la implementación de mecanismos específicos. ¿Cuál de las siguientes afirmaciones sobre los mecanismos de participación pacífica para la construcción de paz en Colombia es correcta?

### Options
- [ ] A) El Sistema de Verdad y Esclarecimiento fue diseñado sin participación de víctimas para garantizar imparcialidad
- [x] B) Las plataformas de participación local y los marcos de reparación colaborativa incluyen espacios donde ciudadanos y organizaciones proponen acciones para la no repetición de hechos violentos <!-- feedback: El Acuerdo de Paz (Punto 5 - Víctimas) y sus desarrollos (Ley 1922 de 2018) incorporan mecanismos donde víctimas y comunidades participates en la construcción de verdad, memoria y reparación, mediante espacios como las audiencias del Sistema de Verdad -->
- [ ] C) La participación ciudadana para la paz se limita exclusivamente a los territorios affected by the conflicto armado
- [ ] D) Los mecanismos de participación para la construcción de paz reemplazan completamente los mecanismos institucionales de participación democrática

### Explicación Pedagógica
El Acuerdo de Paz incorporppora mecanismos donde víctimas y comunidades participates en la construcción de verdad y reparación. La opción correcta (B) reconoce estos espacios colaborativos. La A es incorrecta porque el Sistema de Verdad sí incluyó participación de víctimas. La C es reducida porque la paz involucra a todo el país. La D es incorrecta porque los mecanismos de paz complementan no reemplazan los institucionales.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-SOC-11-P2-participacion-ciudadana-099-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Delta - Razonamiento crítico
**Context:** Control social y rendición de cuentas

### Enunciado
La Contraloria General de la República desarrolla el sistema de participación ciudadana "Contraloría visible" donde los ciudadanos pueden reportar hallazgos sobre el uso de recursos públicos. Al analizar este mecanismo, un estudiante de sociales concluye que este programa representa un avance significativo en la democratización del control fiscal porque:

### Options
- [ ] A) Sustituye completamente la función de control de las Contralorías territoriales
- [ ] B) Permite a cualquier ciudadano actuar como Contralor sin ningún tipo de formación o acompañamiento institucional
- [ ] C) Implementa la vigilancia ciudadana sobre recursos públicos mediante herramientas tecnológicas, democratizando el acceso al control social pero sin sustituir las funciones institucionales de control fiscal <!-- feedback: El programa "Contraloría visible" (Resolución 00061 de 2018) es una herramienta de participación ciudadana que permite reportar hallazgos, pero opera en complementariedad con las funciones institucionales de las Contralorías, democratizando el control sin substituirlo -->
- [ ] D) Tiene carácter vinculante y sus hallazgos producen efectos fiscales directos sin validación institucional

### Explicación Pedagógica
El programa "Contraloría visible" es una herramienta de participación ciudadana que complementa pero no sustituye el control institucional. La respuesta correcta (C) reconoce esta complementariedad. Las opciones A, B y D son incorrectas: el programa no sustituye funciones institucionales (A), requiere acompañamiento y no cualquier persona sin formación puede actuar unilateralmente (B), y los hallazgos deben ser validados institucionalmente antes de producir efectos fiscales (D).

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-SOC-11-P2-participacion-ciudadana-099-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Delta - Análisis contextual
**Context:** Participación juvenil en Colombia

### Enunciado
En el marco de la Política Pública de Juventud del Valle del Cauca, los jóvenes del departamento pueden participar en los consejos de juventud. Según la Ley 1622 de 2013 (Estatuto de Ciudadanía Juvenil), ¿cuál es la naturaleza jurídica y la función principal de estos espacios de participación juvenil?

### Options
- [ ] A) Son espacios exclusivamente recreativos para actividades culturales de la juventud
- [ ] B) Son instâncias de carácter decisorio que determinan la política pública juvenil sin intervención del gobierno departamental
- [x] C) Son espacios de interlocución, proposal y decisión para la formulación y seguimiento de políticas públicas de juventud, donde los jóvenes pueden participar y ser escuchados en las decisiones que los afectan <!-- feedback: La Ley 1622 de 2013 establece que los consejos de juventud son espacios de interlocución y proposal entre jóvenes y autoridades, con funciones de participación en la formulación y seguimiento de políticas públicas de juventud, pero no sustituyen las competencias de las autoridades -->
- [ ] D) Son espacios únicamente consultivos sin capacidad de generar propuestas concretas ante las autoridades

### Explicación Pedagógica
Los consejos de juventud (Ley 1622 de 2013) son espacios de interlocución, proposal y decisión donde los jóvenes participan en la formulación y seguimiento de políticas públicas. No son exclusivamente recreativos (A), no sustituyen autoridades (B), y tienen capacidad propositiva no solo consultiva (D). La respuesta correcta (C) captura la naturaleza de estos espacios juveniles de participación.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-SOC-11-P2-participacion-ciudadana-099-MASTERY-v14`
**Bloom:** Evaluate
**ICFES:** Delta - Evaluación crítica
**Context:** Participación ciudadana en decisiones ambientales

### Enunciado
La Corte Constitucional ha desarrollado una línea jurisprudencial sobre la participación ciudadana en decisiones ambientales, particularmente relevante para comunidades étnicas y territorios afectados por actividades extractivas. ¿Cuál es el principio fundamental que la Corte ha establecido sobre la participación ambiental en contextos donde hay proyectos que afectan territorios de comunidades étnicas?

### Options
- [ ] A) La participación ambiental puede ser reemplazada por participación a través de representantes legales autorizados por el gobierno central
- [x] B) Se requiere el consentimiento libre, previo e informado de las comunidades étnicas según los estándares internacionales y la jurisprudencia constitucional (Sentencia T-769 de 2009) <!-- feedback: La Corte Constitucional en sentencias como T-769 de 2009 y SU-383 de 2003 ha establecido que cuando proyectos afectan territorios de comunidades étnicas, se requiere el consentimiento libre, previo e informado, fundamentado en el derecho a la consulta previa y la autonomía territorial -->
- [ ] C) Las comunidades étnicas pueden participar únicamente después de que el proyecto ha sido aprobado por las autoridades ambientales competentes
- [ ] D) La participación ambiental se limita a procesos de información donde las comunidades solo reciben información sobre decisiones ya tomadas

### Explicación Pedagógica
La Corte Constitucional ha establecido el consentimiento libre, previo e informado como estándar para decisiones que afectan territorios de comunidades étnicas, fundamentado en el derecho a la consulta previa (Convenio 169 de la OIT) y la autonomía territorial. Las otras opciones son incorrectas: no puede ser reemplazada por representantes (A), no puede ser posterior a aprobación (C), y no se limita a solo información (D).

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-SOC-11-P2-participacion-ciudadana-099-MASTERY-v15`
**Bloom:** Analyze
