<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for Colombian Sciences Naturales (Natural Sciences), specifically in Organic Chemistry (química orgánica), for grade 11, period 4.

I need to follow the exact format with YAML frontmatter and then 20 questions in the specified structure.

Let me create questions following the difficulty progression:
- Questions 1-4: D3-D4 difficulty
- Questions 5-10: D5-D6 difficulty
- Questions 11-16: D7-D8 difficulty
- Questions 17-20: D9-D10 difficulty

The questions should be about organic chemistry relevant to Colombian context and aligned with ICFES Saber 11 style.

Let me generate these questions:

Topics to cover for organic chemistry grade 11 period 4 in Colombia:
- Functional groups (alcohols, aldehydes, ketones, carboxylic acids, esters, amines, amides)
- Nomenclature
- Properties of organic compounds
- Organic reactions (substitution, addition, elimination, esterification, saponification)
- Polymers
- Biomolecules (carbohydrates, proteins, lipids)
- Environmental chemistry (green chemistry, biodegradable materials)

Let me create 20 questions with proper difficulty distribution.

I'll start numbering from v1 for each question variant.

</think>

```yaml
---
id: "CO-CIE-11-P4-quimica-organica-081-MASTERY"
country: "colombia"
grado: 11
asignatura: "ciencias-naturales"
tema: "quimica-organica"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 81
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T19:47:53.640027"
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

**ID:** `CO-CIE-11-P4-quimica-organica-081-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Identificar
**Context:** Laboratorio escolar en Colombia

### Enunciado
En un experimento de laboratorio, un estudiante debe identificar el grupo funcional presente en una molécula que presenta la estructura CH₃-CH₂-CHO. ¿Cuál es el nombre sistemático de este grupo funcional?

- [ ] A) Alcohol
- [ ] B) Cetona
- [x] C) Aldehído <!-- feedback: La estructura CH₃-CH₂-CHO presenta un grupo -CHO (formilo) unido a un carbono terminal, lo cual corresponde a un aldehído. El sufijo -al indica la presencia de este grupo funcional. -->
- [ ] D) Ácido carboxílico <!-- feedback: Un ácido carboxílico presentaría el grupo -COOH, no solo -CHO como en este caso. -->

### Explicación Pedagógica
El grupo funcional aldehído se caracteriza por tener el grupo carbonilo (-C=O) unido a un carbono con al menos un hidrógeno. En la estructura dada, el carbono del grupo -CHO está enlazado a un hidrógeno y a una cadena碳lica (etilo), lo que confirma que es un aldehído. El error común es confundir aldehídos con cetonas, pero las cetonas tienen el grupo carbonilo en medio de la cadena, no al final.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-CIE-11-P4-quimica-organica-081-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Identificar
**Context:** Industria alimentaria colombiana

### Enunciado
En la producción de Aceite de palma colombiano, los triglicéridos son componentes fundamentales. ¿Cuál es la estructura básica de un triglicérido?

- [ ] A) Tres ácidos grasos unidos a una molécula de glicerol mediante enlaces peptídicos
- [x] B) Tres ácidos grasos unidos a una molécula de glicerol mediante enlaces éster <!-- feedback: Los triglicéridos están formados por glicerol (propanotriol) esterificado con tres ácidos grasos. Los enlaces son de tipo éster, no peptídicos. -->
- [ ] C) Un ácido graso unido a tres moléculas de glicerol mediante enlaces glucosídicos
- [ ] D) Tres moléculas de glicerol unidas entre sí por enlaces de hidrógeno

### Explicación Pedagógica
Los triglicéridos son ésteres de glicerol (1,2,3-propanotriol) con ácidos grasos. Se forman mediante reacción de esterificación entre los tres grupos -OH del glicerol y los grupos -COOH de los ácidos grasos. El error común es confundir los enlaces éster con los peptídicos, estos últimos se encuentran en proteínas y no en lípidos.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P4-quimica-organica-081-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Comprender
**Context:** Biosíntesis en plantas colombianas

### Enunciado
Las plantas de cacao del departamento de Santander producen compuestos orgánicos mediante fotosíntesis. La glucosa sintetizada puede polimerizarse para formar almidón. ¿Qué tipo de reacción interviene en la formación del almidón a partir de glucosa?

- [ ] A) Oxidación
- [x] B) Condensación (formación de enlaces glucosídicos) <!-- feedback: La formación de almidón (un polisacárido) a partir de unidades de glucosa ocurre mediante reacciones de condensación, donde se elimina una molécula de agua por cada enlace formed entre dos monosacáridos. -->
- [ ] C) Electrólisis
- [ ] D) Combustión

### Explicación Pedagógica
Los polisacáridos como el almidón se forman por unión de monosacáridos mediante enlaces glucosídicos. Este proceso es una reacción de condensación (o síntesis por deshidratación), donde se pierde una molécula de agua por cada enlace creado entre dos monosacáridos. La reacción inversa (hidrólisis) es la que permite degradar el almidón. Los estudiantes frecuentemente confunden la dirección de estas reacciones.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P4-quimica-organica-081-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Relacionar
**Context:** Contaminación ambiental en Bogotá

### Enunciado
En el desarrollo de políticas ambientales en Bogotá, se considera la biodegradación de plásticos. Un plástico biodegradable contiene enlaces éster en su estructura. ¿Qué producto se espera obtener durante la biodegradación aeróbica de un polímero que contiene enlaces éster?

- [ ] A) Metano y agua
- [ ] B) Nitrógeno y oxígeno
- [x] C) Dióxido de carbono y agua <!-- feedback: La biodegradación aeróbica de polímeros con enlaces éster (como los poliésteres) produce CO₂ y H₂O mediante oxidación completa de los carbono de la cadena polimérica. -->
- [ ] D) Ozono e hidrógeno

### Explicación Pedagógica
En la biodegradación aeróbica, los materiales orgánicos son oxidados completamente a CO₂ y H₂O por microorganismos que utilizan oxígeno como agente oxidante. En el caso de polímeros sintéticos biodegradables como los poliésteres, los enlaces éster son hidrolizados primero, liberando los monómeros constituyentes que luego son metabolizados a CO₂ y H₂O.

---

## Question 5 (Variant Medium - Difficulty D5)

**ID:** `CO-CIE-11-P4-quimica-organica-081-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Aplicar
**Context:** Synthesis de medicamentos en Colombia

### Enunciado
La aspirina (ácido acetilsalicílico) se sintetiza a partir del ácido salicílico. En el proceso de síntesis, el grupo hidroxilo del ácido salicílico reacciona con un derivado del ácido acético para formar un enlace éster. ¿Cuál es el reactivo utilizadocommonly en el laboratorio para acetilar el grupo -OH del ácido salicílico?

- [ ] A) Ácido acético glacial
- [x] B) Anhídrido acético (CH₃CO)₂O <!-- feedback: El anhídrido acético es el agente acetilante commonly utilizado para reaccionar con grupos -OH y formar ésteres. El ácido acético por sí solo es un agente acetilante débil. -->
- [ ] C) Acetato de sodio
- [ ] D) Cloruro de acetilo (más reactivo pero no el estándar para aspirina)

### Explicación Pedagógica
La síntesis de aspirina utiliza anhídrido acético como agente acetilante para esterificar el grupo fenólico del ácido salicílico. El anhídrido acético es más reactivo que el ácido acético libre porque el grupo saliente (acetato) es mejor leaving group que el hidróxido. El error frecuente es pensar que el ácido acético glacial puede acetilar directamente, cuando en realidad requiere condiciones más energéticas.

---

## Question 6 (Variant Medium - Difficulty D5)

**ID:** `CO-CIE-11-P4-quimica-organica-081-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Aplicar
**Context:** Industria cosmética en Colombia

### Enunciado
Una empresa colombiana de cosméticos utiliza ácido láurico (C₁₂H₂₄O₂) para formular productos de higiene personal. Este ácido es un ácido graso saturado de cadena larga. ¿Cuál es la representación correcta de su grupo funcional principal?

- [ ] A) -OH
- [ ] B) -CHO
- [x] C) -COOH <!-- feedback: Los ácidos grasos contienen el grupo funcional ácido carboxílico (-COOH). El ácido láurico es un ácido graso de 12 carbonos, saturado, con la fórmula general CH₃-(CH₂)₁₀-COOH. -->
- [ ] D) -CO-

### Explicación Pedagógica
Los ácidos grasos son ácidos carboxílicos de cadena larga. El ácido láurico tiene 12 carbonos y es saturado (sin dobles enlaces), por lo que su estructura es CH₃-(CH₂)₁₀-COOH. El grupo funcional definitorio es el ácido carboxílico (-COOH). El error común es confundir la posición del grupo funcional en el nombre "láurico" y pensar que contiene un grupo cetona o aldehído.

---

## Question 7 (Variant Medium - Difficulty D5)

**ID:** `CO-CIE-11-P4-quimica-organica-081-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Interpretar
**Context:** Análisis de alimentos en Colombia

### Enunciado
Un estudiante de laboratorio de alimentos analiza una muestra de aceite de oliva importado y encuentra que contiene ácido oleico (C₁₈H₃₄O₂), un ácido graso monoinsaturado. ¿Cuántos enlaces dobles presenta la cadena hydrocarbonada del ácido oleico?

- [ ] A) 0
- [x] B) 1 <!-- feedback: El ácido oleico es un ácido graso monoinsaturado, lo que significa que tiene exactamente un enlace doble (C=C) en su cadena hydrocarbonada. Su nombre sistemático es ácido cis-9-octadecenoico. -->
- [ ] C) 2
- [ ] D) 3

### Explicación Pedagógica
Los ácidos grasos se clasifican según el grado de insaturación: saturados (sin enlaces dobles), monoinsaturados (un enlace doble) y poliinsaturados (dos o más enlaces dobles). El ácido oleico (C₁₈:1, n-9) tiene 18 carbonos con una insaturación en el carbono 9. El error común es confundir "monoinsaturado" con "saturado" y pensar que no tiene enlaces dobles.

---

## Question 8 (Variant Medium - Difficulty D6)

**ID:** `CO-CIE-11-P4-quimica-organica-081-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Analizar
**Context:** Bioplásticos en Colombia

### Enunciado
Colombia está desarrollando bioplásticos a partir de almidón de yuca. El almidón está composed de dos polisacáridos: amilosa y amilopectina. ¿Cuál de las siguientes afirmaciones describe correctamente una diferencia estructural entre amilosa y amilopectina?

- [ ] A) La amilosa es ramificada y la amilopectina es lineal
- [x] B) La amilosa forma una hélice y la amilopectina tiene ramificaciones α(1→6) <!-- feedback: La amilosa es esencialmente lineal, formada por unidades de glucosa unidas por enlaces α(1→4) que forman una estructura helicoidal. La amilopectina tiene ramificaciones mediante enlaces α(1→6) que se producen aproximadamente cada 24-30 residuos de glucosa. -->
- [ ] C) La amilosa contiene unidades de fructosa y la amilopectina solo glucosa
- [ ] D) La amilopectina es insoluble en agua y la amilosa es soluble

### Explicación Pedagógica
El almidón tiene dos componentes: amilosa (lineal, α(1→4), forma hélices) y amilopectina (ramificada, α(1→4) con ramificaciones α(1→6) cada 24-30 unidades). El error frecuente es invertir las características: algunos estudiantes piensan que la amilosa es ramificada y la amilopectina lineal, lo cual es incorrecto. La amilopectina tiene ramificaciones que le dan una estructura más compacta.

---

## Question 9 (Variant Medium - Difficulty D6)

**ID:** `CO-CIE-11-P4-quimica-organica-081-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Analizar
**Context:** producción de biodiesel en Colombia

### Enunciado
En la producción de biodiesel a partir de aceite de palma colombiano, ocurre una reacción de transesterificación. Si reaccionamos triglicéridos con metanol en presencia de un catalyst básico, se producen ésteres metílicos de ácidos grasos (biodiesel) y glicerol como subproducto. ¿Cuál es la naturaleza química del biodiesel resultante?

- [ ] A) Es un alcohol
- [x] B) Es un éster de ácido graso y metanol <!-- feedback: El biodiesel consiste en ésteres metílicos de ácidos grasos (FAME - Fatty Acid Methyl Esters). Se obtienen por transesterificación de triglicéridos con metanol, donde el metanol reacciona con los ácidos grasos liberando glicerol. -->
- [ ] C) Es un ácido carboxílico
- [ ] D) Es un éter

### Explicación Pedagógica
La transesterificación convierte triglicéridos en ésteres metílicos de ácidos grasos. El metanol reacciona con los enlaces éster del triglicérido, desplazando al glicerol y formando nuevos ésteres con el metanol. El biodiesel es una mezcla de estos ésteres metílicos, no un alcohol ni un ácido carboxílico. El error común es confundir "biodiesel" con "biocombustibles" en general o pensar que contiene glicerol como componente principal.

---

## Question 10 (Variant Medium - Difficulty D6)

**ID:** `CO-CIE-11-P4-quimica-organica-081-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Comprender
**Context:** Compuestos orgánicos en medicina tradicional colombiana

### Enunciado
La quinina, un compuesto natural presente en la corteza del árbol de quina (Cinchona), tiene propiedades antipalúdicas. Este compuesto contiene un grupo amino (-NH₂). Los compuestos que contienen grupos amino se clasifican como:

- [ ] A) Ácidos
- [x] B) Aminas <!-- feedback: Las aminas son compuestos orgánicos derivados del amoníaco (NH₃) donde uno o más hidrógenos son reemplazados por grupos orgánicos. La quinina contiene grupos amino secundarios en su estructura heterocíclica. -->
- [ ] C) Ésteres
- [ ] D) Éteres

### Explicación Pedagógica
Las aminas son derivadas del amoníaco (NH₃) donde átomos de hidrógeno son reemplazados por grupos alquilo o arilo. Se clasifican en primarias, secundarias y terciarias según el número de grupos orgánicos unidos al nitrógeno. El error común es pensar que el grupo amino (-NH₂) confiere propiedades ácidas al compuesto, cuando en realidad las aminas son bases débiles debido al par de electrones no compartido en el nitrógeno.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-CIE-11-P4-quimica-organica-081-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Analizar
**Context:** Síntesis de fármacos en Colombia

### Enunciado
Un químico farmacéutico colombiano sintetiza un nuevo analgénico y obtiene el siguiente producto: CH₃-CH₂-COO-CH₂-CH₃. Al analizar su estructura molecular, el químico determina que este compuesto es un éster. ¿Cuál es el nombre sistemático IUPAC de este compuesto?

- [ ] A) Ácido propanoico de etilo
- [x] B) Propanoato de etilo <!-- feedback: El compuesto CH₃-CH₂-COO-CH₂-CH₃ es el éster del ácido propanoico (ácido propanoico + etanol). Según las reglas IUPAC, el nombre sistemático es propanoato de etilo (nombre de la sal del ácido + de + nombre del grupo alquilo). -->
- [ ] C) Butanoato de metilo
- [ ] D) Etanoato de propilo

### Explicación Pedagógica
Para nombrar ésteres, se identifica el ácido carboxílico (propanoico) y el alcohol (etanol), generando propanoato de etilo. El error común es confundir el orden (alguno estudiantes escriben "ácido propanoico de etilo" que es incorrecto según la nomenclatura IUPAC actual). También puede confundirse con butanoato de metilo, que tendría la fórmula HCOO-CH₂-CH₂-CH₃ (incorrecta para la estructura dada).

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-CIE-11-P4-quimica-organica-081-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Analizar
**Context:** Investigación universitaria sobre proteínas

### Enunciado
Un investigador de la Universidad Nacional de Colombia estudia la estructura de una proteína globular. Él observa que la proteína contiene tanto hélices alfa como láminas beta. ¿Qué tipo de estructura proteica está observando?

- [ ] A) Estructura primaria
- [x] B) Estructura terciaria <!-- feedback: La estructura terciaria de las proteínas incluye la organización tridimensional de la cadena polipeptídica, que puede incluir hélices alfa, láminas beta y regiones sin estructura definida. La combinación de diferentes tipos de estructuras secundarias caracteriza la estructura terciaria. -->
- [ ] C) Estructura cuaternaria
- [ ] D) Enlace peptídico

### Explicación Pedagógica
La estructura de las proteínas se organiza en niveles: primaria (secuencia de aminoácidos), secundaria (hélices alfa y láminas beta, estabilizadas por puentes de hidrógeno), terciaria (plegamiento 3D de la cadena), y cuaternaria (ensamblaje de múltiples cadenas). La presencia simultánea de hélices y láminas indica estructura terciaria, no secundaria (que se refiere a un solo tipo) ni cuaternaria (que involucra múltiples cadenas). El error frecuente es confundir estos niveles jerárquicos.

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-CIE-11-P4-quimica-organica-081-MASTERY-v13`
**Bloom:** Evaluate
**ICFES:** Evaluar
**Context:** Industria química colombiana

### Enunciado
En la síntesis de un polímero para empaques biodegradables, se utiliza ácido poliláctico (PLA).EI PLA se obtiene por polimerización del ácido láctico. El ácido láctico tiene un carbono quiral en su estructura. ¿Cuál es la consecuencia de tener un carbono quiral en el monómero?

- [ ] A) El polímero resultante tendrá mayor rigidez por образования de enlaces cruzados
- [x] B) El polímero puede existir como stereoisómeros con diferentes propiedades físicas <!-- feedback: Un carbono quiral permite la formación de estereoisómeros (enantiómeros o diastereómeros). Cuando el ácido láctico quiral polimeriza, puede generar polímeros con diferentes arquitecturas (isotáctico, sindiotáctico, atáctico) y por lo tanto diferentes propiedades mecánicas y térmicas. -->
- [ ] C) El polímero será ópticamente inactivo debido a la síntesis por condensación
- [ ] D) El polímero presentará cadenas ramificadas inevitablemente

### Explicación Pedagógica
Un carbono quiral tiene cuatro sustituyentes diferentes, lo que genera isomería óptica. En la polimerización, la quiralidad del monómero influye en la tactilidad del polímero (isotáctico, sindiotáctico, atáctico), afectando sus propiedades cristalinas y mecánicas. El PLA puede ser sintetizado en formas D, L o mezclas, cambiando sus propiedades. El error común es pensar que la quiralidad se pierde durante la polimerización, lo cual no es correcto.

---

## Question 14 (Variant Advanced - Difficulty D7)

**ID:** `CO-CIE-11-P4-quimica-organica-081-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Analizar
**Context:** Reacciones en la industria de saponificación colombiana

### Enunciado
Una empresa de jabones en Colombia utiliza el proceso de saponificación para producir jabón a partir de grasas. Este proceso involucra la hidrólisis básica de triglicéridos. Si reaccionamos триглицерид con hidróxido de sodio (NaOH), ¿cuál(es) producto(s) se forma(n)?

- [ ] A) Solo glicerol
- [ ] B) Solo jabones (sal sódica de ácidos grasos)
- [x] C) Glicerol y jabones (sales sódicas de ácidos grasos) <!-- feedback: La saponificación de triglicéridos con NaOH produce glicerol (propanotriol) y las sales sódicas de los ácidos grasos (jabones). Esta es una hidrólisis básica donde los enlaces éster se rompen. -->
- [ ] D) Ácidos grasos libres y agua

### Explicación Pedagógica
La saponificación es la hidrólisis de triglicéridos en medio básico. El NaOH rompe los enlaces éster, produciendo glicerol y sales sódicas de ácidos grasos (jabones). El error común es pensar que se producen ácidos grasos libres, pero en medio básico estos se desprotonan inmediatamente formando las sales (jabones). La respuesta D sería correcta solo si usáramos un ácido o agua en lugar de base.

---

## Question 15 (Variant Advanced - Difficulty D8)

**ID:** `CO-CIE-11-P4-quimica-organica-081-MASTERY-v15`
**Bloom:** Analyze
**ICFES:** Analizar
**Context:** Metabolismo energético en el cuerpo humano

### Enunciado
Un atleta colombiano consume glucosa antes de una competencia. La glucosa es metabolizada en las células a través de la glucólisis y el ciclo de Krebs. ¿Cuál es el objetivo principal de estas vías metabólicas?

- [ ] A) Síntetizar ácidos nucleicos para división celular
- [ ] B) Producir agua como subproducto para hidratación celular
- [x] C) Generar ATP y equivalentes de reducción (NADH, FADH₂) para actividad celular <!-- feedback: La glucólisis y el ciclo de Krebs son vías catabólicas cuyo objetivo principal es extraer energía de los nutrientes en forma de ATP y reducir equivalentes (NADH, FADH₂) que posteriormente se oxidan en la cadena respiratoria para generar más ATP. -->
- [ ] D) Sintetizar proteínas para construir músculo

### Explicación Pedagógica
El metabolismo oxidativo de la glucosa tiene como objetivo principal generar ATP (la "moneda energética" celular) y NADH/FADH₂ que donan electrones a la cadena respiratoria. El ciclo de Krebs también proporciona precursores para biosíntesis, pero su función principal es energético. El error frecuente es confundir el propósito catabólico con el propósito anabolic de generar bloques celulares para construcción de tejidos.

---

## Question 16 (Variant Advanced - Difficulty D8)

**ID:** `CO-CIE-11-P4-quimica-organica-081-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Analizar
**Context:** Biotecnología agrícola colombiana

### Enunciado
Los agricultores colombianos utilizan urea (NH₂-CO-NH₂) como fertilizante nitrogenado. Este compuesto orgánico contiene nitrógeno en un enlace amida. ¿Cuál es el tipo de enlace químico presente entre los átomos de nitrógeno y carbono en la urea?

- [ ] A) Enlace peptídico entre carbonos alpha
- [x] B) Enlace amida (enlace C-N con características parciales de doble enlace) <!-- feedback: La urea contiene enlaces amida (-CO-NH₂-), donde el nitrógeno está unido al carbono del carbonilo. Este enlace tiene características de resonancia que le dan carácter parcial de doble enlace (C=N), pero se clasifica como enlace amida. -->
- [ ] C) Enlace imina (C=N)
- [ ] D) Enlace sales de amonio cuaternario

### Explicación Pedagógica
El enlace amida (-CO-NH-) se encuentra en proteínas (enlaces peptídicos) y en moléculas como urea y poliamidas. En la urea, el par de electrones del nitrógeno puede participar en resonancia con el doble enlace del carbono, dándole carácter parcial de doble enlace y planaridad. El error común es confundir "enlace amida" con "enlace peptídico", aunque estructuralmente son similares, el enlace peptídico específicamente conecta aminoácidos.

---

## Question 17 (Variant Mastery - Difficulty D9)

**ID:** `CO-CIE-11-P4-quimica-organica-081-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Evaluar
**Context:** Gestión de residuos en la industria química colombiana

### Enunciado
Una planta de tratamiento de aguas residuales en Colombia recibe efluentes con высокое contenido de fenoles (compuestos aromáticos con grupo -OH). Para tratar estos efluentes, se propone una oxidación con permanganato de potasio. ¿Cuál es la justificación química de usar un agente oxidante fuerte para eliminar fenoles?

- [x] A) Los fenoles pueden oxidarse a compuestos menos tóxicos como dihidroxibencenos y ácidos carboxílicos, o mineralizarse completamente