<think>
The user wants me to generate exactly 20 multiple-choice questions in ICFES Saber 11 format for Colombian high school students. The subject is "Sociales Ciudadanas" (Citizenship Social Studies), topic "derechos-humanos" (human rights), grade 11, period 2.

Let me follow the strict format requirements:

1. Need a YAML frontmatter block at the beginning
2. Then 20 questions with progressive difficulty (D3-D4 for 1-4, D5-D6 for 5-10, D7-D8 for 11-16, D9-D10 for 17-20)
3. Each question needs:
   - Question number with variant and difficulty
   - ID in specific format
   - Bloom level
   - ICFES competency
   - Context
   - Enunciado (question)
   - 4 options (A, B, C, D) with [x] on correct answer
   - Feedback in comments
   - Explicación Pedagógica

4. Topics related to human rights should include:
   - Universal Declaration of Human Rights
   - Constitutional rights in Colombia
   - Human rights violations
   - Mechanisms for protecting human rights
   - DIH (Derecho Internacional Humanitario)
   - Children's rights
   - Women's rights
   - Minority rights
   - Social rights
   - Civil and political rights

Let me create 20 questions with Colombian context and progressive difficulty.

Questions 1-4: D3-D4 (Remember, Understand)
Questions 5-10: D5-D6 (Apply, Analyze)
Questions 11-16: D7-D8 (Analyze, Evaluate)
Questions 17-20: D9-D10 (Evaluate, Create)

I need to make sure:
- Correct answer has [x]
- Include feedback comments
- Distractors are plausible Colombian student errors


- Each question has a clear Colombian modern context
- Align with ICFES Saber 11 style
- Progressive difficulty
- 4 mandatory options
- No "all of the above" or "none of the above"

Now I'll draft the questions, starting with the YAML header and then building the 20 questions systematically with increasing complexity.

</think>

```yaml
---
id: "CO-SOC-11-P2-derechos-humanos-098-MASTERY"
country: "colombia"
grado: 11
asignatura: "sociales-ciudadanas"
tema: "derechos-humanos"
periodo: 2
protocol_version: "5.1"
bundle_size: 20
bundle_index: 98
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T20:45:47.296340"
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
```

## Question 1 (Variant Basic - Difficulty 3)

**ID:** `CO-SOC-11-P2-derechos-humanos-098-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Interpretativa
**Context:** Conmemoración del Día de los Derechos Humanos en Colombia

### Enunciado
La Declaración Universal de los Derechos Humanos, adoptada por la Asamblea General de las Naciones Unidas en 1948, establece en su artículo 1 que todos los seres humanos nacen libres e iguales en dignidad y derechos. ¿Cuál es el principio fundamental que fundamenta este artículo?

### Options
- [ ] A) La jerarquía entre ciudadanos según su origen étnico <!-- Los derechos humanos no establecen jerarquías basadas en etnia -->
- [x] B) La dignidad inherente a toda persona sin excepción <!-- La dignidad es intrínseca a cada ser humano independientemente de sus características -->
- [ ] C) La supremacía de los derechos colectivos sobre los individuales <!-- Los derechos humanos reconocen tanto derechos individuales como colectivos -->
- [ ] D) El cumplimiento obligatorio solo para los países firmantes <!-- Los derechos humanos son universales e inaplicables solo a firmantes -->

### Explicación Pedagógica
La respuesta correcta es B porque la dignidad inherente es el principio base de los derechos humanos. El artículo 1 establece que la dignidad es un atributo de todo ser humano sin distinción. Los distractores presentan errores comunes: confundir igualdad con jerarquía (A), pensar que hay conflicto entre derechos individuales y colectivos (C), y creer que los derechos humanos son pactados y no universales (D).

---

## Question 2 (Variant Basic - Difficulty 3)

**ID:** `CO-SOC-11-P2-derechos-humanos-098-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Interpretativa
**Context:** Jurisprudencia colombiana sobre derechos fundamentales

### Enunciado
En la Constitución Política de Colombia de 1991, los derechos fundamentales están consagrados en el Título II, Capítulo 1. ¿Cuál de los siguientes derechos NO está clasificado como derecho fundamental según la Carta Magna colombiana?

### Options
- [x] A) El derecho a la educación básica gratuita <!-- Este es un derecho social, no fundamental según la estructura constitucional colombiana -->
- [ ] B) El derecho a la vida <!-- Es un derecho fundamental primordial -->
- [ ] C) El derecho a la integridad personal <!-- Está dentro de los derechos fundamentales -->
- [ ] D) El derecho a no ser detenido arbitrariamente <!-- Es un derecho fundamental de procedure -->

### Explicación Pedagógica
La respuesta correcta es A. En Colombia, el derecho a la educación básica gratuita (artículo 67) se clasifica como derecho social, económico y cultural, no como derecho fundamental. Los derechos fundamentales (artículos 12-35) incluyen vida, integridad, libertad, debido proceso, entre otros. Error común: confundir la educación como derecho fundamental cuando es un derecho social en la Constitución colombiana.

---

## Question 3 (Variant Basic - Difficulty 4)

**ID:** `CO-SOC-11-P2-derechos-humanos-098-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Interpretativa
**Context:** Situación de desplazamiento forzado en Colombia

### Enunciado
Según el Derecho Internacional Humanitario (DIH), los conflictos armados internos tienen protección especial para la población civil. Cuando grupos armados irregulares reclutan menores de edad, ¿qué tipo de violación del DIH se configura?

### Options
- [ ] A) Violación del principio de distinción entre combatientes y civiles <!-- Ese principio se refiere a atacar únicamente objetivos militares -->
- [ ] B) Violación del principio de proporcionalidad en el uso de la fuerza <!-- La proporcionalidad se refiere al equilibrio entre ventaja militar y daño civil -->
- [x] C) Violación de las normas que prohíben el reclutamiento de menores de 15 años <!-- El Protocolo Facultativo prohíbe reclutar menores de 18, y el DIH prohíbe menores de 15 -->
- [ ] D) Violación del principio de neutralidad en conflictos armados <!-- La neutralidad aplica a Estados no involucrados -->

### Explicación Pedagógica
La respuesta correcta es C. El reclutamiento de menores de 15 años está prohibido bajo el artículo 77 del Protocolo Adicional a los Convenios de Ginebra. El Protocolo Facultativo sobre niños en conflictos armados eleva la prohibición a menores de 18 años. El distractor A confunde con el principio de distinción; el B con proporcionalidad; el D no aplica a conflictos internos.

---

## Question 4 (Variant Basic - Difficulty 4)

**ID:** `CO-SOC-11-P2-derechos-humanos-098-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Argumentativa
**Context:** Debate sobre libertad de expresión en redes sociales

### Enunciado
Un estudiante publica información falsa sobre un compañero de clase en redes sociales, causando sufriración. Desde la perspectiva de los derechos humanos, ¿cuál principio está en conflicto con la libertad de expresión del estudiante?

### Options
- [ ] A) Principio de dignidad humana <!-- La dignidad no entra en conflicto con la libre expresión -->
- [x] B) Derecho a la honra y buen nombre del compañero afectado <!-- La honra es un derecho que limita la libre expresión cuando causa daño -->
- [ ] C) Principio de igualdad ante la ley <!-- No tiene relación directa con el caso -->
- [ ] D) Derecho a la educación del publikador <!-- No se afecta el derecho a la educación del publikador -->

### Explicación Pedagógica
La respuesta correcta es B. La libertad de expresión tiene límites cuando afecta derechos de terceros, como la honra (artículo 21 de la Constitución colombiana). Los derechos no son absolutos; el ejercicio de uno puede restringir otro cuando causa daño injustificado. Los estudiantes suelen pensar que la libre expresión es ilimitada, confundiendo el derecho con la ausencia de consecuencias legales.

---

## Question 5 (Variant Basic - Difficulty 5)

**ID:** `CO-SOC-11-P2-derechos-humanos-098-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Interpretativa
**Context:** Política pública de atención a víctimas del conflicto armado

### Enunciado
La Ley 1448 de 2011 (Ley de Víctimas y Restitución de Tierras) establece un conjunto de medidas reparación integral para las víctimas del conflicto armado colombiano. ¿Cuál de las siguientes medidas corresponde a una acción de satisfacción según esta ley?

### Options
- [ ] A) La indemnización económica por daños sufridos <!-- La indemnización corresponde a medidas compensatorias -->
- [x] B) La implementación de actos de reconocimiento público de responsabilidad <!-- Las medidas de satisfacción incluyen disculpas públicas, memoriales y reconocimiento histórico -->
- [ ] C) La devolución de bienes inmuebles abandonados <!-- La restitución de tierras es una medida diferente a la satisfacción -->
- [ ] D) La atención psicosocial permanente <!-- La atención psicosocial es parte de la rehabilitación -->

### Explicación Pedagógica
La respuesta correcta es B. Las medidas de satisfacción incluyen actos de reconocimiento de responsabilidad, memorials, nunca más, y garantías de no repetición. Los estudiantes confunden frecuentemente las categorías: compensación (indemnización económica), restitución (devolver bienes), rehabilitación (atención psicosocial), y satisfacción (reconocimiento simbólico).

---

## Question 6 (Variant Basic - Difficulty 5)

**ID:** `CO-SOC-11-P2-derechos-humanos-098-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Argumentativa
**Context:** Aplicación del bloque de constitucionalidad en Colombia

### Enunciado
La Corte Constitucional colombiana ha desarrollado el concepto de "bloque de constitucionalidad" mediante la sentencia C-574 de 2012. ¿Cuál es la fuente principal que integra este bloque además de la Constitución?

### Options
- [ ] A) Los tratados de libre comercio firmados por Colombia <!-- Los TLC no son parte del bloque de constitucionalidad -->
- [ ] B) Las leyes ordinarias aprobadas por el Congreso <!-- Las leyes no integran el bloque de constitucionalidad -->
- [x] C) Los tratados internacionales de derechos humanos ratificados por Colombia <!-- El bloque incluye tratados de DDHH que respetan la dignidad humana -->
- [ ] D) Los decreto ley expedidos durante estados de excepción <!-- Los decreto ley no hacen parte del bloque -->

### Explicación Pedagógica
La respuesta correcta es C. El bloque de constitucionalidad (artículo 93 CN) integra tratados internacionales de derechos humanos ratificados por Colombia que respeten la dignidad humana, especialmente aquellos que no pueden ser suspendidos en estados de excepción. Los estudiantes confunden frecuentemente incluyendo leyes ordinarias o tratados comerciales, que no tienen jerarquía constitucional.

---

## Question 7 (Variant Basic - Difficulty 5)

**ID:** `CO-SOC-11-P2-derechos-humanos-098-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Interpretativa
**Context:** Educación en derechos humanos en instituciones educativas

### Enunciado
El artículo 13 del Protocolo de San Salvador señala que la educación debe orientarse hacia el pleno desarrollo de la personalidad humana. En Colombia, la Cátedra de la Paz (Ley 1732 de 2014) incorpora la enseñanza para la paz. ¿Cuál es el principio de derechos humanos que debe transverse toda la educación según este protocolo?

### Options
- [ ] A) El principio de jerarquía normativa <!-- No aplica a la educación -->
- [x] B) El principio de no discriminación e igualdad <!-- El Protocolo establece que la educación debe promover la igualdad y no discriminación -->
- [ ] C) El principio de soberanía nacional <!-- No es un principio educativo del Protocolo -->
- [ ] D) El principio de libre desarrollo de la personalidad <!-- Ese principio está en la Constitución colombiana pero no es el central del Protocolo -->

### Explicación Pedagógica
La respuesta correcta es B. El artículo 13 del Protocolo de San Salvador establece que la educación debe orientarse hacia el respeto de los derechos humanos sin discriminación. Este principio de no discriminación e igualdad debe permeate toda la práctica educativa. Los estudiantes confunden el libre desarrollo (artículo 16 CN) con el principio del Protocolo.

---

## Question 8 (Variant Basic - Difficulty 6)

**ID:** `CO-SOC-11-P2-derechos-humanos-098-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Argumentativa
**Context:** Conflictos entre derechos en redes sociales digitales

### Enunciado
Una organización de derechos humanos publica en sus redes sociales información sobre presuntas extrajudiciales ejecutadas por agentes del Estado. El gobierno pide que se retire el contenido por afectar la seguridad nacional. Desde el marco de derechos humanos, ¿cuál análisis es correcto?

### Options
- [ ] A) El derecho a la seguridad nacional siempre prevalece sobre el derecho a la información <!-- Los derechos no son jerárquicos; deben balancearse -->
- [x] B) Ambos derechos deben analizarse bajo el principio de proporcionalidad para determinar cuál prevalece en el caso concreto <!-- El juicio de proporcionalidad evalúa medidas que restringen derechos -->
- [ ] C) El derecho a la información nunca puede ser restringido por seguridad nacional <!-- Hay casos legítimos de restricción -->
- [ ] D) La organización debe siempre obedecer al gobierno en temas de seguridad nacional <!-- Obedecer no es un principio de derechos humanos -->

### Explicación Pedagógica
La respuesta correcta es B. El principio de proporcionalidad (test de proporcionalidad) establece que las restricciones a derechos deben ser necesarias, proporcionales y con fines legítimos. Ningún derecho es absoluto; deben analizarse en contexto. Los estudiantes frecuentemente imaginan jerarquías rígidas (A y C) o creen que la autoridad siempre prevalece (D).

---

## Question 9 (Variant Basic - Difficulty 6)

**ID:** `CO-SOC-11-P2-derechos-humanos-098-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Interpretativa
**Context:** Derechos de los pueblos indígenas en Colombia

### Enunciado
El Convenio 169 de la OIT, ratificado por Colombia mediante Ley 21 de 1991, establece el derecho de los pueblos indígenas a mantener sus instituciones y tradiciones. ¿Qué principio de derechos humanos fundamenta el derecho a la consulta previa antes de decisiones que afecten territorios indígenas?

### Options
- [ ] A) Principio de autodeterminación de los pueblos <!-- Aplica a pueblos en general, no específicamente al fundamento de la consulta previa -->
- [x] B) Principio de participación y consentimiento libre, previo e informado <!-- La consulta previa se fundamenta en el consentimiento libre, previo e informado -->
- [ ] C) Principio de no intervención en asuntos internos <!-- No tiene relación con la consulta previa -->
- [ ] D) Principio de reciprocidad entre Estados <!-- No aplica -->

### Explicación Pedagógica
La respuesta correcta es B. El consentimiento libre, previo e informado es el principio que fundamenta la consulta previa. Se requiere: Libre (sin coacción), Previo (antes de la decisión), Informado (con información completa). Los estudiantes confunden frecuentemente con autodeterminación (derecho más amplio de pueblos) o con principios que no aplican.

---

## Question 10 (Variant Basic - Difficulty 6)

**ID:** `CO-SOC-11-P2-derechos-humanos-098-MASTERY-v10`
**Bloom:** Analyze
**ICFES:** Interpretativa
**Context:** Mecanismos de protección de derechos humanos en Colombia

### Enunciado
La Defensoría del Pueblo y la Personería cumplen roles diferentes en la protección de derechos humanos. ¿Cuál es la función distintiva de la Defensoría del Pueblo según la Constitución de 1991?

### Options
- [ ] A) Ejercer control disciplinario sobre funcionarios públicos <!-- Función de la Personería -->
- [ ] B) Representar judicialmente a las víctimas de violaciones de derechos humanos <!-- Función de la víctima o su abogado -->
- [x] C) Promover y divulgar los derechos humanos y facilitar su ejercicio <!-- Función esencial de la Defensoría como defensora del pueblo -->
- [ ] D) Investigar y sancionar violaciones de derechos humanos cometidas por el Estado <!-- Función de la Fiscalía o la Corte Constitucional -->

### Explicación Pedagógica
La respuesta correcta es C. La Defensoría del Pueblo (artículo 282 CN) tiene como función promover y divulgar los derechos humanos y facilitar su ejercicio. Se diferencia de la Personería (control disciplinario), la Fiscalía (investigación penal) y los abogados (representación judicial). Los estudiantes confunden funciones entre instituciones.

---

## Question 11 (Variant Advanced - Difficulty 7)

**ID:** `CO-SOC-11-P2-derechos-humanos-098-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Argumentativa
**Context:** Debate sobre eutanasia y derechos fundamentales en Colombia

### Enunciado
La Corte Constitucional mediante sentencia T-970 de 2014 reconoció el derecho a la eutanasia en Colombia. Esta decisión generó debate entre quienes defienden el derecho a la autonomía y quienes argumentan desde el derecho a la vida. ¿Qué principio constitucional permite resolver este conflicto aparente entre derechos fundamentales?

### Options
- [ ] A) El principio de jerarquía donde la vida prima sobre la autonomía <!-- No existe jerarquía rígida entre derechos fundamentales -->
- [ ] B) El principio de solidaridad como valor supreme de la Constitución <!-- La solidaridad no es el principio para resolver conflictos entre derechos -->
- [x] C) El principio de dignidad humana como principio integrador que orienta la interpretación de derechos en conflicto <!-- La dignidad humana es el fundamento último de los derechos fundamentales -->
- [ ] D) El principio de mayoría como forma de dirimir conflictos entre derechos <!-- Los derechos no se definen por mayoría -->

### Explicación Pedagógica
La respuesta correcta es C. La dignidad humana actúa como principio integrador cuando existen conflictos entre derechos fundamentales. En la sentencia T-970, la Corte protegió tanto la vida digna como la autonomía, mostrando que la dignidad humana permite armonizar derechos aparentemente en tensión. Los estudiantes frecuentemente asumen jerarquías rígidas (A) o mecanismos democráticos (D) que no existen en el constitucionalismo colombiano.

---

## Question 12 (Variant Advanced - Difficulty 7)

**ID:** `CO-SOC-11-P2-derechos-humanos-098-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Argumentativa
**Context:** Situación de defensores de derechos humanos en zonas rurales

### Enunciado
Organizaciones internacionales reportan que defensores de derechos humanos en Colombia enfrentan amenazas por su labor. ¿Qué obligación tiene el Estado colombiano frente a esta situación según el derecho internacional de los derechos humanos?

### Options
- [ ] A) Ninguna, ya que las amenazas son responsabilidad de grupos armados no estatales <!-- El Estado tiene obligaciones con su población -->
- [ ] B) Investigar las amenazas y garantizar condiciones para que los defensores puedan trabajar <!-- Obligación de garantía del Estado -->
- [ ] C) Prohibir que las organizaciones de derechos humanos operen en zonas de conflicto <!-- Esto vulneraría el derecho de asociación -->
- [ ] D) Entregar seguridad física a los defensores en todo momento <!-- La obligación es de medios, no de resultado -->

### Options
- [ ] A) Ninguna, ya que las amenazas son responsabilidad de grupos armados no estatales
- [ ] B) Investigar las amenazas y garantizar condiciones para que los defensores puedan trabajar
- [ ] C) Prohibir que las organizaciones de derechos humanos operen en zonas de conflicto
- [x] D) Adoptar medidas de protección para defensores de derechos humanos y crear condiciones seguras para su labor <!-- El Estado debe adoptar medidas razonables de protección -->

### Explicación Pedagógica
La respuesta correcta es D. El Estado tiene obligación de adoptar medidas de protección para defensores de derechos humanos según la Declaración sobre Defensores de DDHH de la ONU (1998). Esta obligación es de medios, no de resultado. Los estudiantes pueden pensar que el Estado no tiene responsabilidad (A) o que debe garantizar seguridad absoluta (D incorrecto). La respuesta correcta reconoce la obligación con sus limitaciones.

---

## Question 13 (Variant Advanced - Difficulty 7)

**ID:** `CO-SOC-11-P2-derechos-humanos-098-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Interpretativa
**Context:** Políticas públicas de inclusión para población marginada

### Enunciado
El Estado colombiano ha implementado políticas de acción afirmativa para promover la igualdad real. ¿Cuál situación representa correctamente una acción afirmativa según los estándares de derechos humanos?

### Options
- [ ] A) Establecer cuotas de empleo público para personas con discapacidad sin considerar competencias <!-- Las acciones afirmativas deben ser razonables y respetar derechos de terceros -->
- [ ] B) Otorgar puntos adicionales en exámenes de Estado a egresados de colegios públicos para acceso a educación superior <!-- Las acciones afirmativas deben ser proporcionales y tener duración limitada -->
- [x] C) Reservar sièges en concejos municipales para mujeres como mecanismo de participación política equilibrada <!-- Las cuotas de género son acciones afirmativas válidas reconocidas internacionalmente -->
- [ ] D) Eximir de impuestos a todas las empresas que contraten jóvenes de estratos bajos <!-- Los beneficios fiscales no son acciones afirmativas válidas porque no reparan brechas históricas -->

### Explicación Pedagógica
La respuesta correcta es C. Las cuotas de participación política para mujeres son acciones afirmativas reconocidas que buscan equilibrar la subrepresentación histórica. Las acciones afirmativas deben ser proporcionales, tener objetivo válido (reparar desigualdad histórica), y no afectar derechos de terceros. Los estudiantes confunden frecuentemente acciones afirmativas legítimas con medidas discriminatorias inversas (A) o políticas populistas sin justificación de derechos (D).

---

## Question 14 (Variant Advanced - Difficulty 7)

**ID:** `CO-SOC-11-P2-derechos-humanos-098-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Argumentativa
**Context:** Debate sobre restricciones a derechos en estados de excepción

### Enunciado
Durante el Estado de Conmoción Interior declarado en Colombia, el gobierno emite decreto que restringe la libre locomoción de ciudadanos en determinadas zonas. Según la Constitución colombiana y el derecho internacional, ¿qué requisito debe cumplir esta restricción para ser constitucional?

### Options
- [ ] A) Debe serapproved por el Congreso de la República antes de su implementación <!-- El gobierno puede declarar estados de excepción y dictar decretos de urgencia -->
- [x] B) Debe ser proporcional, necesaria y temporal, sin afectar derechos irrenunciables <!-- Las restricciones en estados de excepción tienen límites constitucional -->
- [ ] C) Puede suspender todos los derechos fundamentales sin límite temporal <!-- Los derechos no derrogables no pueden suspenderse nunca -->
- [ ] D) Solo requiere autorización del Ministerio de Defensa <!-- No corresponde al Ministerio definir restricciones de derechos -->

### Explicación Pedagógica
La respuesta correcta es B. Las restricciones a derechos en estados de excepción deben cumplir: proporcionalidad (adecuarse al fin), necesidad (no haber otro medio menos gravoso), temporalidad (duración limitada). Además, existen derechos no derrogables (art. 4 PIDCP) que nunca pueden suspenderse. Los estudiantes creen que en estados de excepción se suspenden todos los derechos (C) o que solo requiere autorización militar (D).

---

## Question 15 (Variant Advanced - Difficulty 8)

**ID:** `CO-SOC-11-P2-derechos-humanos-098-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Argumentativa
**Context:** Análisis de políticas públicas de reparación a víctimas

### Enunciado
La Universidad Nacional de Colombia publicó un estudio mostrando que muchas víctimas del conflicto armado no acceden efectivamente a las medidas de reparación de la Ley 1448 de 2011. ¿Qué principio de derechos humanos se ve comprometido cuando las víctimas tienen derecho formal pero no acceso real a la reparación?

### Options
- [ ] A) Principio de irretroactividad de la ley <!-- No tiene relación con acceso efectivo -->
- [x] B) Principio de efectividad de los derechos (protección internacional) <!-- La efectividad requiere acceso real, no solo reconocimiento formal -->
- [ ] C) Principio de reserva legal en materia de derechos <!-- La reserva legal no garantiza efectividad -->
- [ ] D) Principio de jerarquía de tratados <!-- No aplica -->

### Explicación Pedagógica
La respuesta correcta es B. El principio de efectividad de los derechos exige que estos no sean solo nominales sino accesibles y utilizables. Según la Corte IDH, los derechos deben tener aplicación práctica efectiva. El tener derechos formales pero no acceso real constituye una violación del principio de efectividad. Los estudiantes confunden con otros principios abstractos que no abordan el problema de acceso real.

---

## Question 16 (Variant Advanced - Difficulty 8)

**ID:** `CO-SOC-11-P2-derechos-humanos-098-MASTERY-v16`
**Bloom:** Evaluate
**ICFES:** Argumentativa
**Context:** Análisis de casos de violencia de género en contextos de conflicto

### Enunciado
La Fiscalía General de la Nación ha condenado a miembros de grupos armados por violencia sexual como método de guerra. En el Sistema Interamericano de Derechos Humanos, ¿qué tipo de obligación internacional se configura cuando el Estado no previene ni investiga estos hechos?

### Options
- [ ] A) Obligación de no hacer que prohíbe al Estado realizar actos violentos <!-- El Estado también tiene obligaciones positivas de actuar -->
- [x] B) Obligación de hacer que requiere prevenir, investigar y sanción a responsables <!-- Las obligaciones de hacer incluyen prevenir violaciones y sancionar -->
- [ ] C) Obligación de resultado que garantiza que no habrá más violencia <!-- Las obligaciones de derechos humanos son de medios, no de resultado -->
- [ ] D) Obligación moral sin consecuencias jurídicas <!-- Las obligaciones internacionales de derechos humanos son jurídicas -->

### Explicación Pedagógica
La respuesta correcta es B. El Estado tiene obligaciones de hacer (obligaciones positivas): prevenir violaciones de derechos, investigar cuando ocurran, y sancionar a los responsables. Las obligaciones de derechos humanos son de medios, no de resultado (C es incorrecta). El Estado no es responsable solo por sus propios actos (obligación negativa), sino también por no cumplir su deber de debida diligencia.

---

## Question 17 (Variant Advanced - Difficulty 9)

**ID:** `CO-SOC-11-P2-derechos-humanos-098-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Argumentativa
**Context:** Debate sobre inteligencia artificial y derechos humanos

### Enunciado
Una empresa colombiana implementa un sistema de reconocimiento facial para vigilancia en espacios públicos. Organizaciones de derechos humanos warnan sobre posibles violaciones. Desde el marco de derechos humanos, ¿qué análisis es pertinente sobre el uso de esta tecnología?

### Options
- [ ] A) Toda vigilancia viola el derecho a la privacidad siempre <!-- No toda vigilancia es violatoria; debe analizarse proporcionalidad -->
- [x] B) El uso debe analizarse bajo principio de proporcionalidad evaluando finalidad legítima, necesidad y proporcionalidad estricta <!-- Todo límite a derechos requiere análisis de proporcionalidad -->
- [ ] C) La empresa puede usar la tecnología
