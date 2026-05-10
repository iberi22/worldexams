<think>
The user wants me to generate exactly 20 multiple-choice questions in ICFES Saber 11 style for Reading Critical (Lectura Crítica), topic: critical thinking (pensamiento-critico), grade 11, period 3.

I need to output ONLY the markdown file with the YAML frontmatter and 20 questions.

Let me follow the structure:
- Progressive difficulty: D3-D4 (questions 1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
- 4 options per question
- [x] marking the correct answer
- Colombian context
- ICFES style

Let me create the questions:

Questions 1-4 (Difficulty 3-4):
1. Basic identification of assumptions
2. Basic evaluation of arguments
3. Basic inference recognition
4. Basic distinction between facts and opinions

Questions 5-10 (Difficulty 5-6):
5. Analyzing simple logical structures
6. Identifying bias
7. Evaluating evidence quality
8. Recognizing fallacies
9. Distinguishing relevant from irrelevant information
10. Basic cause-effect reasoning

Questions 11-16 (Difficulty 7-8):
11. Complex argument analysis
12. Evaluating multiple perspectives
13. Identifying implicit assumptions
14. Analyzing rhetorical strategies
15. Evaluating source credibility
16. Distinguishing strong vs weak arguments

Questions 17-20 (Difficulty 9-10):
17. Complex synthesis and evaluation
18. Multi-layered argument deconstruction
19. Advanced critical analysis
20. Integrated critical thinking application

Let me write these with Colombian contexts.

Context for questions:
- Youth and technology
- Environmental issues in Colombia
- Social media impact
- Education system in Colombia
- Economic challenges
- Peace process
- Indigenous communities
- Migration
- Urban planning
- Healthcare


I'll now develop the actual questions using these thematic areas and difficulty progression, ensuring each question tests different aspects of critical thinking while maintaining authentic ICFES styling.

</think>

```yaml
---
id: "CO-LEC-11-P3-pensamiento-critico-048-MASTERY"
country: "colombia"
grado: 11
asignatura: "lectura-critica"
tema: "pensamiento-critico"
periodo: 3
protocol_version: "5.1"
bundle_size: 20
bundle_index: 48
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-16T02:10:43.602245"
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

**ID:** `CO-LEC-11-P3-pensamiento-critico-048-MASTERY-v1`
**Bloom:** Understand
**ICFES:** Identificación de supuestos implícitos
**Context:** Redes sociales y consumo informativo en jóvenes colombianos

### Enunciado
En un editorial de un diario bogotano se lee: "Los jóvenes colombianos prefieren las redes sociales antes que leer newspapers tradicionales, lo cual evidencia una clara decadencia cultural." El supuesto implícito en este argumento es que:

### Options
- [ ] A) Los jóvenes están informados sobre temas culturales <!-- feedback: Es una observación sobre su comportamiento, no un supuesto -->
- [ ] B) Los diarios tradicionales ofrecen contenido de mayor calidad informativa <!-- feedback: Este es un hecho observable, no un supuesto oculto -->
- [x] C) La lectura de medios tradicionales es superior a las nuevas formas de consumo informativo <!-- feedback: Correcto. Se asume sin论证 que lo tradicional es mejor, siendo esto un juicio de valor implícito -->
- [ ] D) Las redes sociales contienen información poco confiable <!-- feedback: Aunque podría estar presente, no es el supuesto central del argumento -->

### Explicación Pedagógica
El argumento presenta una preferencia juvenil como evidencia de "decadencia cultural", lo cual implica que lo tradicional es intrínsecamente superior. Este supuesto oculto es el motor real del argumento.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-LEC-11-P3-pensamiento-critico-048-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Diferenciación entre hecho y opinión
**Context:** Debate sobre educación pública en Colombia

### Enunciado
En un debate sobre la educación pública colombiana, un político afirma: "La educación pública en Colombia tiene déficits históricos que llevan décadas sin resolverse." Esta afirmación representa:

### Options
- [ ] A) Un hecho verificable mediante datos históricos <!-- feedback: Se necesitarían datos específicos para verificar los déficits y su duración -->
- [ ] B) Una opinión que puede ser respaldada o refutada con evidencia <!-- feedback: Correcto. El concepto de "déficit histórico" implica una valoración que requiere interpretación -->
- [ ] C) Un dato estadístico oficial del Ministerio de Educación <!-- feedback: No se presenta como dato oficial ni fuente citada -->
- [ ] D) Una ley o decreto del sistema educativo colombiano <!-- feedback: No hace referencia a normativa legal alguna -->

### Explicación Pedagógica
La palabra "déficits" implica una evaluación negativa que depende de criterios valorativos y no de hechos brutos. Lo que uno considera déficit puede ser interpretado de manera diferente según la perspectiva.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-LEC-11-P3-pensamiento-critico-048-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Evaluación de estructura argumentativa básica
**Context:** Discusión sobre tecnología en el aula colombiana

### Enunciado
Un rector de colegio en Medellín presenta: "Hemos implementado tablets para todos los estudiantes. Las calificaciones promedio mejoraron 0.5 puntos este año. Por lo tanto, la tecnología en el aula fue la causa de la mejora." El error lógico en este argumento es:

### Options
- [ ] A) Usar datos falsos sobre las calificaciones <!-- feedback: El argumento no disputa la veracidad de los datos -->
- [ ] B) No considerar que otros factores hayan podido contribuir a la mejora <!-- feedback: Correcto. Se establece causalidad directa sin eliminar otras variables -->
- [ ] C) Criticar el uso de tecnología en educación <!-- feedback: No es una crítica, es una falacia causal -->
- [ ] D) Comparar estudiantes con y sin tablets <!-- feedback: No se menciona esta comparación -->

### Explicación Pedagógica
El argumento presenta correlación temporal como prueba de causalidad directa. other factors like teaching method changes, student motivation, or curriculum updates could explain the improvement. This is a classic post hoc ergo propter hoc fallacy.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-LEC-11-P3-pensamiento-critico-048-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Identificación de sesgo en fuente informativa
**Context:** Cobertura mediática de industria petrolera en Colombia

### Enunciado
Un artículo de investigación sobre los efectos ambientales de la extracción petrolera en el Casanare fue financiado completamente por empresas del sector hydrocarbono. Según el contexto de este estudio, ¿cuál debería ser la lectura crítica más apropiada?

### Options
- [ ] A) Aceptar completamente los hallazgos como objetivos y verificables <!-- feedback: Ignora completamente el conflicto de interés -->
- [ ] B) Considerar los hallazgos pero verificarlos con fuentes independientes <!-- feedback: Correcto. Es la respuesta más crítica y apropiada -->
- [ ] C) Descartar automáticamente cualquier conclusión del estudio <!-- feedback: Puede haber información útil que requiere verificación -->
- [ ] D) Solo considerar las conclusiones que favorecen a las empresas <!-- feedback: Esto sería acrítico y sesgado -->

### Explicación Pedagógica
La financiación completa por parte de las empresas relacionadas directamente con los resultados genera un conflicto de interés que debe hacer que el lector adopte una postura de verificación independiente sin descartar automáticamente el contenido.

---

## Question 5 (Variant Intermediate - Difficulty D5)

**ID:** `CO-LEC-11-P3-pensamiento-critico-048-MASTERY-v5`
**Bloom:** Analyze
**ICFES:** Análisis de estrategias retóricas
**Context:** Discursos políticos en campaña electoral colombiana

### Enunciado
En un discurso de campaña, un candidato a la gobernación del Valle del Cauca dice: "Mis oponentes quieren destruir todo lo que hemos construido durante años. Pero yo, soy la única persona que puede salvar nuestra región del colapso total." La estrategia retórica predominante es:

### Options
- [ ] A) Uso de datos estadísticos sobre la región <!-- feedback: No se presentan cifras ni datos -->
- [ ] B)generalización sobre todos los candidatos <!-- feedback: Puede ser parte, pero no es la estrategia principal -->
- [x] C) Creación de un escenario binario: nosotros contra ellos sin matices <!-- feedback: Correcto. Se presenta una dicotomía simplista donde el candidato es la única opción viable -->
- [ ] D) Citación de expertos internacionales en governanza <!-- feedback: No hay mención de expertos -->

### Explicación Pedagógica
El discurso crea una falsa dicotomía donde cualquier alternativa al candidato significa "destrucción" o "colapso". Esta estrategia deshumaniza a los oponentes y impide al electorado considerar matices o alternativas intermedias.

---

## Question 6 (Variant Intermediate - Difficulty D5)

**ID:** `CO-LEC-11-P3-pensamiento-critico-048-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Evaluación de fuerza argumentativa
**Context:** Debate sobre uso medicinal del cannabis en Colombia

### Enunciado
En un debate sobre la regulación del cannabis medicinal en Colombia, un médico argumenta: "El cannabis tiene compuestos que pueden aliviar el dolor crónico. Los pacientes merecen acceso a tratamientos que mejoren su calidad de vida. Por lo tanto, debemos legalizar el cannabis medicinal." La fuerza de este argumento depende principalmente de:

### Options
- [ ] A) La cantidad de pacientes que han usado cannabis medicinal <!-- feedback: Importante, pero no aborda la estructura del razonamiento -->
- [ ] B) La demostración de que otros tratamientos son inferiores <!-- feedback: No se hace esta comparación -->
- [x] C) La verdad de las premisas sobre los efectos del cannabis y el valor de la calidad de vida <!-- feedback: Correcto. Si las premisas son verdaderas y el razonamiento válido, el argumento es fuerte -->
- [ ] D) La autoridad institucional del médico que presenta el argumento <!-- feedback: La autoridad puede dar credibilidad, pero no hace lógico el argumento -->

### Explicación Pedagógica
En un argumento deductivo, la fuerza depende de dos factores: la verdad de las premisas y la validez de la inferencia. Aquí se debe evaluar si efectivamente el cannabis tiene propiedades terapéuticas y si mejorar la calidad de vida es un objetivo valioso.

---

## Question 7 (Variant Intermediate - Difficulty D5)

**ID:** `CO-LEC-11-P3-pensamiento-critico-048-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Identificación de falacias argumentativas
**Context:** Discusión sobre impuestos en Colombia

### Enunciado
Un empresario escribe en su专栏 de opinión: "El gobierno quiere aumentar los impuestos a los ricos porque envidia nuestro éxito. Si permitimos este atropello, pronto no quedará nadie que cree empleo en este país." La falacia principal presente es:

### Options
- [x] A) Ad hominem: atacar las motivaciones del gobierno en lugar de sus argumentos <!-- feedback: Correcto. Se atribuye envidia como motivo sin evidencia -->
- [ ] B) Falsa dicotomía: solo dos opciones posibles sin matices <!-- feedback: También presente, pero no es la falacia principal -->
- [ ] C) Apelación a la tradición: se basa en lo que siempre ha existido <!-- feedback: No hay mención de tradición -->
- [ ] D) Generalización apresurada: todos los ricos crearían empleo <!-- feedback: No se hace esta conexión lógica -->

### Explicación Pedagógica
El argumento ataca las motivaciones personales del gobierno ("envidia") en lugar de abordar los méritos reales de la propuesta fiscal. Esto es un ataque ad hominem circumstantial que desvía la atención del argumento de fondo.

---

## Question 8 (Variant Intermediate - Difficulty D6)

**ID:** `CO-LEC-11-P3-pensamiento-critico-048-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Evaluación de evidencia y relevancia
**Context:** Discusión sobre seguridad alimentaria en Bogotá

### Enunciado
Un informe del Distrito de Bogotá afirma que "el 70% de los estudiantes de instituciones públicas consumieron frutas al menos una vez al día durante la última semana, lo cual demuestra el éxito del programa 'Frutas para el Aprendizaje' implementado hace dos años." Para evaluar críticamente esta conclusión, ¿cuál evidencia adicional sería más relevante?

### Options
- [ ] A) Cuántos estudiantes participen en programas similares en otras ciudades <!-- feedback: Relevante pero no directamente para evaluar el programa -->
- [ ] B) Comparar el consumo de frutas entre estudiantes antes y después del programa <!-- feedback: Correcto. Esto permitiría aislar el efecto del programa de otros factores -->
- [ ] C) La opinión de los profesores sobre los cambios en alimentación de estudiantes <!-- feedback: Sujeto a sesgos y percepciones subjetivas -->
- [ ] D) Cuántos recursos económicos se destinaron al programa <!-- feedback: Importante para contexto presupuestal, no para evaluar impacto -->

### Explicación Pedagógica
Sin una medición previa al programa, no se puede establecer la causalidad. La comparación antes-después permitiría determinar si hubo un cambio atribuible al programa o simplemente variaciones normales.

---

## Question 9 (Variant Intermediate - Difficulty D6)

**ID:** `CO-LEC-11-P3-pensamiento-critico-048-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Análisis de inferencias implícitas
**Context:** Discusión sobre migración venezolana en Cúcuta

### Enunciado
Un artículo periodístico afirma: "La ola migratoria venezolana ha saturado los servicios de salud en Cúcuta, donde los hospitales reportan tiempos de espera tres veces mayores que hace dos años." Una inferencia que el lector NO debe hacer sin evidencia adicional es:

### Options
- [ ] A) Los tiempos de espera más largos son consecuencia de la migración <!-- feedback: Es precisamente lo que el titular sugiere, pero requiere verificación -->
- [ ] B) Los servicios de salud en Cúcuta enfrentan desafíos de capacidad <!-- feedback: Correcto. Esta es una inferencia legítima del dato -->
- [ ] C) La migración venezolana es la ÚNICA causa del aumento en tiempos de espera <!-- feedback: Esta es la inferencia injustificada. Otros factores como recortes presupuestales o enfermedades estacionales podrían contribuir -->
- [ ] D) Los hospitales en Cúcuta están bajo presión operativa significativa <!-- feedback: Se puede inferirlegítimamente de los datos presentados -->

### Explicación Pedagógica
La correlación temporal entre la migración y el aumento en tiempos de espera no establece causalidad única. Excluir otras explicaciones potenciales (subfinanciamiento, epidemias locales, migración interna de colombianos) es un error lógico.

---

## Question 10 (Variant Intermediate - Difficulty D6)

**ID:** `CO-LEC-11-P3-pensamiento-critico-048-MASTERY-v10`
**Bloom:** Evaluate
**ICFES:** Evaluación de argumentos múltiples y contradictorios
**Context:** Discusión sobre transporte público en Medellín

### Enunciado
Un estudiode la Universidad Nacional conclude que "el Metro de Medellín reduce significativamente las emisiones de carbono en la ciudad." Sin embargo, un informe de una organización ambiental local afirma que "los beneficios ambientales del Metro se ven compensados por el incremento en el uso de energía fósil para su mantenimiento." Ante estos argumentos contradictorios, ¿cuál es la aproximación más crítica e informada?

### Options
- [ ] A) Aceptar el estudio de la universidad porque es de una institución acreditada <!-- feedback: La acreditación no garantiza la metodología ni la ausencia de sesgos -->
- [ ] B) Descartar ambos por ser contradictorios e imposibles de verificar <!-- feedback: No es una aproximación crítica constructiva -->
- [x] C) Analizar la metodología, las fuentes de datos y los conflictos de interés de ambos estudios <!-- feedback: Correcto. La evaluación crítica requiere revisar los fundamentos, no solo la autoridad de la fuente -->
- [ ] D) Promediar las conclusiones de ambos para obtener una posición neutral <!-- feedback: Combinar conclusiones sin evaluar la calidad de la evidencia es伪crítico -->

### Explicación Pedagógica
La aproximación críticainforma requiere evaluar la solidez metodológica, los datos utilizados y los potenciales sesgos de financiadores o instituciones, sin importar si la fuente es académica o no.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P3-pensamiento-critico-048-MASTERY-v11`
**Bloom:** Evaluate
**ICFES:** Evaluación crítica de argumentos con múltiples premisas
**Context:** Debate sobre fracking en Colombia

### Enunciado
Un político que se opone al fracking en el Magdalena Medio argumenta: "El fracking contamina las aguas subterráneas, afecta la salud de las comunidades rurales y genera sismicidad. Por lo tanto, debemos prohibirmás exploration de hidrocarburos mediante esta técnica." Al evaluar este argumento, un lector crítico debería concluir que:

### Options
- [ ] A) El argumento es lógicamente válido porque presenta múltiples razones para la conclusión <!-- feedback: La validez lógica no garantiza que las premisas sean verdaderas -->
- [x] B) Las premisas deben ser verificadas independientemente antes de aceptars la conclusión <!-- feedback: Correcto. Cada premisa requiere evidencia separada: ¿hay estudios que confirmen la contaminación, los problemas de salud y la sismicidad? -->
- [ ] C) El político es automáticamente confiable por su posición contra el fracking <!-- feedback: La motivación política no hace más válido el argumento -->
- [ ] D) La conclusión es correcta porque otras técnicas también generan problemas <!-- feedback: Esto es una falacia whataboutism, no aborda el mérito del argumento -->

### Explicación Pedagógica
Un argumento puede ser válido en su estructura pero tener premisas falsas. El lector crítico debe verificar cada afirmación antes de aceptar la conclusión, sin importar si está de acuerdo o no con ella.

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P3-pensamiento-critico-048-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Evaluación de perspectiva e intereses en тексте
**Context:** Cobertura mediática de proceso de paz en Colombia

### Enunciado
Un editorial de un medio de comunicación colombiano afirma: "El proceso de paz con el ELN es la única vía para alcanzar la estabilidad en el campo colombiano. Sin embargo, dado el historial de este grupo, cualquier acuerdo será frágil e insuficiente." Respecto a la perspectiva del editorial, ¿cuál afirmación es más precisa?

### Options
- [ ] A) El editorial favorece inequívocamente la paz sin condiciones <!-- feedback: La segunda oración contradice esta lectura -->
- [x] B) El editorial expresa ambivalencia: hay apertura a la paz pero escepticismo sobre su efectividad <!-- feedback: Correcto. Se presentan dos posiciones que no se resuelven: únicas vía vs. fragilidad inherente -->
- [ ] C) El editorial simplemente reporta hechos sin tomar posición <!-- feedback: La palabra "única vía" revela valoración, no objetividad -->
- [ ] D) El editorial apoya completamente al ELN en el proceso <!-- feedback: No hay indicación de apoyo al grupo armado -->

### Explicación Pedagógica
La tensión entre "única vía" y "frágil e insuficiente" revela una ambivalencia que el lector crítico debe identificar. El editorial no ofrece una posición clara, sino un conflicto interno que puede reflejar indecisión o un intento de agradar a múltiples audiencias.

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P3-pensamiento-critico-048-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Descomposición de argumento complejo
**Context:** Discusión sobre inteligencia artificial en educación colombiana

### Enunciado
Un artículo académico afirma: "La inteligencia artificial revolucionará la educación en Colombia. Un estudio en Singapur mostró que estudiantes que usaron tutores basados en IA mejoraron 30% en matemáticas. Además, los estudiantes colombian@s son nativos digitales. Por lo tanto, el gobierno debe invertir masivamente en IA educativa." Los supuestos implícitos en este argumento incluyen:

### Options
- [ ] A) Solo que los estudiantes colombianos saben usar tecnología <!-- feedback: Muy limitado, no captura la complejidad -->
- [ ] B) Que Singapore es comparable a Colombia en contexto educativo y que la IA en educación funciona universalmente <!-- feedback: Correcto. Hay dos saltos: de contexto diferente y de resultado específico a conclusión general -->
- [ ] C) Que el gobierno tiene presupuesto ilimitado para educación <!-- feedback: Posible, pero no es el supuesto central del argumento -->
- [ ] D) Que todos los estudiantes prefieren IA sobre maestros humanos <!-- feedback: No se menciona preferencia estudiantil -->

### Explicación Pedagógica
El argumento comete dos generalizaciones:transferir resultados de un contexto cultural y económico radicalmente diferente (Singapur) a Colombia, y asumir que porque los jóvenes usan tecnología, la aplicarán productivamente en educación formal. Son saltos lógicos no justificados.

---

## Question 14 (Variant Advanced - Difficulty D8)

**ID:** `CO-LEC-11-P3-pensamiento-critico-048-MASTERY-v14`
**Bloom:** Evaluate
**ICFES:** Evaluación de sesgo y perspectiva ideológica
**Context:** Cobertura de problemática minera en Antioquia

### Enunciado
En una conversación radial, un líder minerotradicional de Antioquia afirma: "Los que se oponen a la minería artesanal en el nordeste antioqueño son ambientalistas radicales de Bogotá que nunca han visitado la región y no entienden nuestra realidad." Una lectora crítica identificaría que esta afirmación:

### Options
- [ ] A) Presenta datos sobre la actividad minera que pueden ser verificados <!-- feedback: No hay datos, solo caracterizaciones -->
- [x] B) Descalifica a los críticos mediante su origen geográfico y su supuesto conocimiento <!-- feedback: Correcto. Es una falacia ad hominem que evita el debate de ideas mediante la demonización del oponente -->
- [ ] C) Ofrece una solución alternativa al conflicto por la minería <!-- feedback: No hay propuesta concreta -->
- [ ] D) Reconoce la complejidad del problema ambiental y social <!-- feedback: Todo lo contrario: simplifica y deshumaniza -->

### Explicación Pedagógica
La estrategia retórica de vincular oposición con "radicalismo bogotano" busca descreditar sin refutar argumentos. La fuente geográfica del crítico es irrelevante para evaluar la validez de sus argumentos sobre el impacto ambiental.

---

## Question 15 (Variant Advanced - Difficulty D8)

**ID:** `CO-LEC-11-P3-pensamiento-critico-048-MASTERY-v15`
**Bloom:** Analyze
**ICFES:** Análisis de estructura argumentativa y elementos faltantes
**Context:** Debate sobre economía naranja en Colombia

### Enunciado
El Ministerio de Cultura promociona: "La economía naranja (industrias creativas y culturales) genera 600,000 empleos directos en Colombia y crece al 5% anual. Por cada peso invertido en cultura, se generan $4.50 en la economía. Therefore, debemos aumentar el presupuesto para cultura en un 50%." Para evaluar la conclusićum, falta analizar:

### Options
- [ ] A) Cuántos empleos genera la minería o la agricultura en el mismo período <!-- feedback: No es el elemento faltante en la estructura del argumento -->
- [ ] B) La metodología del estudio que calculó el multiplicador ($4.50 por peso invertido) y la definición precisa de "empleos directos" <!-- feedback: Correcto. Estos son elementos fundamentales no justificados en el argumento -->
- [ ] C) Las opiniones de artistas sobre el presupuesto cultural <!-- feedback: No constituye evidencia técnica sobre el impacto económico -->
- [ ] D) Cuántos países tienen programas de economía naranja exitosos <!-- feedback: Relevante para contextualizar, pero no para evaluar la estructura del argumento -->

### Explicación Pedagógica
El multiplicador de 4.5 y la cifra de empleos son los pilares del argumento. Sin conocer la metodología que los generó, no se puede evaluar la fortaleza real del argumento. Es un dato no verificado que sostiene toda la conclusion.

---

## Question 16 (Variant Advanced - Difficulty D8)

**ID:** `CO-LEC-11-P3-pensamiento-critico-048-MASTERY-v16`
**Bloom:** Evaluate
**ICFES:** Evaluación de consistencia argumentativa
**Context:** Discusión sobre privacidad digital en Colombia

### Enunciado
Una activistas digital claim: "Las empresas de telecomunicaciones no deberían almacenar datos de navegación de los usuarios porque eso viola el derecho a la privacidad. Sin embargo, para capturar pedófilos, el gobierno debería tener acceso irrestricto a todos los datos de comunicación sin orden judicial." Al evaluar la consistencia de esta posición, se encuentra:

### Options
- [x] A) Una inconsistencia: acepta vigilancia sin restricciones para algunos casos pero rechaza la recopilación de datos por empresas <!-- feedback: Correcto. Si la privacidad es un derecho inviolable, debe aplicarse consistentemente. Hacer excepciones para el gobierno pero no para empresas contradice el principio -->
- [ ] B) Una posición coherente que prioriza la seguridad sobre la privacidad <!-- feedback: No hay priorización explícita, sino una contradicción -->
- [ ] C) Un argumento que favorece solo los derechos individuales sobre los colectivos <!-- feedback: Ni siquiera es coherente en esto -->
- [ ] D) Una lógica impecable porque distingue entre actores públicos y privados <!-- feedback: La distinción entre actores no justifica la violación del mismo derecho -->

### Explicación Pedagógica
Si la privacidad es un derecho fundamental, no puede justificarse su violación selectiva según quién la solicite. La condición adicional de "sin orden judicial" hace la inconsistencia aún más clara, pues acepta remover garantías judiciales.

---

## Question 17 (Variant Mastery - Difficulty D9)

**ID:** `CO-LEC-11-P3-pensamiento-critico-048-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Síntesis y evaluación crítica de argumentos múltiples
**Context:** Debate constitucional sobre educación como derecho en Colombia

### Enunciado
Tres fuentes presentan arguments sobre si la educación universitaria pública gratuita es constitucional: 1) Un académico argumenta que el derecho a la educación está consagrado en la Constitución y debe interpretarse expansivamente. 2) Un economistade gobierno afirma que garantizar educación gratuita para todos es fiscalmente insostenible. 3) Un tribunal constitucional de otro país memutuskan que la educación gratuita hasta pregrado es un derecho fundamental. La conclusión más críticamente fundamentada sería:

### Options
- [ ] A) La educación universitaria gratuita es constitucional porque así lo decidió otro tribunal <!-- feedback: Otros países no determinan la interpretación constitucional colombiana -->
- [ ] B) La educación universitaria gratuita no es constitucional porque es insostenible fiscalmente <!-- feedback: La sostenibilidad fiscal no es el único criterio para interpretar derechos constitucionales -->
- [ ] C) Se requiere un análisis más profundo sobre qué significa "educación" en el contexto del derecho y qué limitaciones presupuestarias son razonables para el Estado <!-- feedback: Correcto. Esta respuesta reconoce la complejidad y evita tanto el maximalismo de derechos como el minimalismo fiscal -->
- [ ] D) El tema no puede resolverse porque hay opiniones contradictorias <!-- feedback:
