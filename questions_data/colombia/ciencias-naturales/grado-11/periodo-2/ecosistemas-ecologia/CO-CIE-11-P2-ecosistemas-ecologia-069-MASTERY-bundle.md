<think>
The user wants me to generate exactly 20 multiple-choice questions in ICFES Saber 11 format for Colombian state exams. The subject is Natural Sciences (Ciencias Naturales), topic ecosystems-ecology, grade 11, period 2.

I need to:
1. Follow the exact format with frontmatter YAML
2. Generate 20 questions with progressive difficulty
3. Use Colombian context
4. Follow ICFES style
5. Mark the correct answer with [x]
6. Provide explanations for why correct and incorrect options

Let me structure this properly with the frontmatter and 20 questions.

Difficulty progression:
- Questions 1-4: D3-D4 (basic)
- Questions 5-10: D5-D6 (intermediate)
- Questions 11-16: D7-D8 (advanced)
- Questions 17-20: D9-D10 (complex)

I need to create questions about ecosystems and ecology relevant to Colombia.

</think>

```markdown
---
id: "CO-CIE-11-P2-ecosistemas-ecologia-069-MASTERY"
country: "colombia"
grado: 11
asignatura: "ciencias-naturales"
tema: "ecosistemas-ecologia"
periodo: 2
protocol_version: "5.1"
bundle_size: 20
bundle_index: 69
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T19:07:30.178117"
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

**ID:** `CO-CIE-11-P2-ecosistemas-ecologia-069-MASTERY-v1`
**Bloom:** [Understand]
**ICFES:** [Nivel de comprensión de conceptos ecológicos básicos]
**Context:** [Ecosistemas colombianos - Páramo]

### Enunciado
El páramo es un ecosistema tropical de alta montaña único en el mundo, ubicado principalmente en Colombia. ¿Cuál de las siguientes afirmaciones describe correctamente una característica de este ecosistema?

### Options
- [ ] A) Presenta temperaturas medias anuales superiores a 25°C con alta biodiversidad de especies tropicales. <!-- feedback: Los páramos tienen temperaturas bajas (0-10°C), no superiores a 25°C. -->
- [ ] B) Es hogar del oso de anteojos (Tremarctos ornatus), especie endémica en peligro de extinción. <!-- feedback: Aunque el oso de anteojos habita los páramos, la afirmación no describe la característica ecológica principal del ecosistema. -->
- [x] C) Posee vegetación adaptada a condiciones de alta radiación UV, bajas temperaturas y suelos ácidos. <!-- feedback: Esta es la característica definitoria de la flora paramuna, adaptada a condiciones extremas de alta montaña. -->
- [ ] D) Se encuentra exclusivamente en la zona de transición entre la.amazonía y los Andes. <!-- feedback: Los páramos se extienden desde Venezuela hasta el norte del Perú, no solo en esa zona de transición. -->

### Explicación Pedagógica
La respuesta correcta es C porque los páramos presentan vegetación característica de frailejones, pajonales y bosque de围攻, adaptadas fisiológicamente (xeromorfismo) a la alta radiación UV, bajas temperaturas (hasta -5°C nocturnas) y suelos con pH ácido (3.5-5). Las opciones A, B y D contienen errores conceptuales sobre las condiciones abióticas y distribución del páramo.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-CIE-11-P2-ecosistemas-ecologia-069-MASTERY-v2`
**Bloom:** [Remember]
**ICFES:** [Identificación de niveles de organización ecológica]
**Context:** [Biología de conservación en Colombia]

### Enunciado
En el Parque Nacional Natural Los Nevados, un estudiante observa las siguientes relaciones. ¿Cuál corresponde a una población?

### Options
- [ ] A) Todos los seres vivos del páramo, incluyendo frailejones,aves, insectos y microorganismos. <!-- feedback: Esto describe una comunidad, no una población. -->
- [x] B) El conjunto de osos de anteojos que habitan permanentemente en el parque. <!-- feedback: Una población es el conjunto de individuos de la misma especie que interactúan en un área y tiempo determinados. -->
- [ ] C) Los frailejones y los insectos polinizadores que se relacionan para la polinización. <!-- feedback: Esto describe una interacción entre especies (mutualismo), no una población. -->
- [ ] D) El conjunto de seres vivos junto con los factores físicos como agua, suelo y clima del páramo. <!-- feedback: Esto describe un ecosistema, no una población. -->

### Explicación Pedagógica
La respuesta correcta es B. Una población biológica se define como el conjunto de individuos de la misma especie que coexisten en un mismo lugar y tiempo, con posibilidad de reproducirse entre sí. En contraste, A describe una comunidad (todas las especies), C describe una interacción ecológica (mutualismo) y D describe un ecosistema completo (comunidad + factores abióticos).

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P2-ecosistemas-ecologia-069-MASTERY-v3`
**Bloom:** [Understand]
**ICFES:** [Comprensión de cadenas y redes tróficas]
**Context:** [Ecosistema marino del Pacífico colombiano]

### Enunciado
En el ecosistema de manglar del Pacífico colombiano, las gaviotas se alimentan de cangrejos que viven entre las raíces de los mangles. Si los cangrejos también se alimentan de larvas de insectos acuáticos, ¿cuál afirmación es correcta sobre este fragmento de la red trófica?

### Options
- [ ] A) Las gaviotas son productores y los cangrejos son consumidores primarios. <!-- feedback: Las gaviotas son consumidores secundarios (se alimentan de cangrejos), no productores. Los productores serían las plantas de mangle. -->
- [ ] B) Los cangrejos actúan como consumidores secundarios porque se alimentan de larvas. <!-- feedback: Un consumidor que se alimenta de productores sería primario; los que se alimentan de herbívoros serían secundarios. Los cangrejos que consumen larvas (¿herbívoras?) podrían ser secundarios o terciarios según el nivel trófico de las larvas. -->
- [x] C) Las larvas de insectos son productores porque sintetizan materia orgánica. <!-- feedback: Las larvas de insectos no son productores; carecen de capacidad fotosintética. Los productores en este ecosistema serían el fitoplancton y las plantas de mangle. -->
- [ ] D) Si se eliminan los cangrejos, las gaviotas perderían una fuente de alimento directo. <!-- feedback: La eliminación de cangrejos sí afectaría a las gaviotas que dependen de ellos como alimento directo, pero la estructura de la opción C es incorrecta. -->

### Explicación Pedagógica
La respuesta correcta es D. Según el principio de transferencia de energía en las cadenas tróficas, un organismo que sirve de alimento directo a otro ocupa el nivel trófico inmediatamente inferior. Si los cangrejos son alimento de las gaviotas, su desaparición afectaría directamente a esta población de aves. Las opciones A y B presentan errores en la clasificación de niveles tróficos, y C confunde a las larvas (consumidores) con productores.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P2-ecosistemas-ecologia-069-MASTERY-v4`
**Bloom:** [Understand]
**ICFES:** [Relación entre cambio climático y ecosistemas]
**Context:** [Glaciares tropicales colombia]

### Enunciado
El derretimiento acelerado de los glaciares colombianos por el cambio climático amenaza los páramos que se encuentran en transición con estos ecosistemas. ¿Cuál de las siguientes opciones describe correctamente este fenómeno?

### Options
- [ ] A) El derretimiento de glaciares incrementa la humedad atmosférica, lo que favorecería el crecimiento de la vegetación paramuna. <!-- feedback: Aunque haya más agua disponible, el cambio climático implicaAlteraciones en los regímenes de precipitación y aumento de temperatura que dañan el ecosistema paramuno. -->
- [x] B) La pérdida de glaciares reduce la regulación hídrica, causando tanto sequías prolongadas como inundaciones en las cuencas hidrográficas de los páramos. <!-- feedback: Los glaciares actúan como reservas de agua dulce que se liberan gradualmente; su pérdida desbalancea el ciclo hidrológico, causando irregularidad en el flujo de agua. -->
- [ ] C) Los páramos se beneficiarán de temperaturas más altas al eliminar las heladas que limitan el desarrollo de algunas especies. <!-- feedback: Los páramos están adaptados a temperaturas frías y las heladas son parte de su régimen climático normal. Temperaturas más altas causan estrés térmico en la flora y fauna endémica. -->
- [ ] D) El calentamiento global permite que especies animales de tierr Baja colonicen los páramos sin consecuencias ecological negativas. <!-- feedback: La migración de especies会导致 competition con especies endémicas y podría introducir patógenos, desplazando fauna adaptada al frío. -->

### Explicación Pedagógica
La respuesta correcta es B. Los glaciares tropicales funcionan como "refrigeradores naturales" que regulan el ciclo hidrológico en los Andes. Su derretimiento genera两种极端情况: mayor disponibilidad hídrica inicial seguida de agotamiento de reservas, causando tanto sequías como events extrémes de flooding. Los páramos dependen de esta regulación para mantener su biodiversidad única, incluyendo especies endémicas adaptadas a condiciones templadas-frías.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P2-ecosistemas-ecologia-069-MASTERY-v5`
**Bloom:** [Apply]
**ICFES:** [Análisis de relaciones simbióticas]
**Context:** [Bosque húmedo tropical del Chocó biogeográfico]

### Enunciado
El Chocó biogeográfico, considerado uno de los hotspots de biodiversidad mundial, presenta una relación mutualista entre ciertas especies de árboles y hongos micorrízicos. Los hongos facilitan la absorción de nutrientes del suelo para los árboles, mientras que los árboles proporcionan carbohidratos producto de la fotosíntesis a los hongos. ¿Qué tipo de relación ecológica representa esta interacción?

### Options
- [ ] A) Parasitismo, porque los hongos se benefician a.expensas del árbol. <!-- feedback: En el parasitismo, uno se beneficia y el otro se perjudica. Aquí ambos se benefician, por lo tanto no es parasitismo. -->
- [ ] B) Comensalismo, porque solo los hongos se benefician sin afectar al árbol. <!-- feedback: El comensalismo implica que uno se beneficia y el otro no se ve afectado. En este caso, el árbol sí se beneficia (mejora absorción de nutrientes), por lo tanto no es comensalismo. -->
- [x] C) Mutualismo, porque ambos organismos obtienen beneficios recíprocos. <!-- feedback: El mutualismo se caracteriza por la interacción entre dos especies donde ambas obtienen beneficios, como ocurre con las micorrizas. -->
- [ ] D) Amensalismo, porque los hongos inhiben el crecimiento de otros microorganismos del suelo. <!-- feedback: El amensalismo implica que uno se perjudica y el otro no se afecta. Esta opción no describe la relación árbol-hongo. -->

### Explicación Pedagógica
La respuesta correcta es C. El mutualismo es una interacción ecológica donde ambos participantes obtienen beneficios netos. Las micorrizas son el ejemplo clássico de mutualismo en ecosistemas terrestres: los hongos extienden su red de hifas aumentando el área de absorción radical, y los árboles получают mayor acceso a nutrientes como fósforo y nitrógeno. Este tipo de simbiosis es crucial para la productividad del bosque húmedo tropical del Chocó, permitiendo la coexistencia de alta diversidad vegetal.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P2-ecosistemas-ecologia-069-MASTERY-v6`
**Bloom:** [Apply]
**ICFES:** [Interpretación de pirámides ecológicas]
**Context:** [Ecosistema lacustre de la SNSM]

### Enunciado
En la Sierra Nevada de Santa Marta, un lago de alta montaña presenta la siguiente estructura trófica: fitoplancton (1000 unidades de biomasa), zooplancton (100 unidades de biomasa), peces pequeños (10 unidades de biomasa) y aves acuáticas (1 unidad de biomasa). ¿Qué representa esta distribución?

### Options
- [ ] A) Una pirámide de energía donde cada nivel superior tiene más energía disponible. <!-- feedback: Las pirámides de energía siempre muestran disminución de energía disponible en los niveles superiores debido a las pérdidas por respiración y transferencia ineficiente. -->
- [x] B) Una pirámide de biomasa que muestra transferencia decreciente de materia orgánica hacia los niveles tróficos superiores. <!-- feedback: Los valores de biomasa (1000, 100, 10, 1) disminuyen hacia los niveles superiores, lo cual es característico de una pirámide de biomasa típica en ecosistemas acuáticos. -->
- [ ] C) Una pirámide de números donde la cantidad de organismos aumenta en cada nivel trófico superior. <!-- feedback: Los datos muestran números decrecientes (1000 a 1), no crecientes, por lo tanto no es una pirámide de números en ese sentido. -->
- [ ] D) Un ciclo de materia donde los productores son más abundantes que los consumidores. <!-- feedback: Aunque los productores son más abundantes, la pregunta pide identificar el tipo de pirámide, no un ciclo. -->

### Explicación Pedagógica
La respuesta correcta es B. La pirámide de biomasa representa la cantidad de materia orgánica (biomasa) presente en cada nivel trófico, expresada usualmente en gramos por metro cuadrado o en unidades de peso seco. En este ecosistema léntico de alta montaña, la biomasa decrece desde los productores (fitoplancton: 1000) hacia los consumidores terciarios (aves acuáticas: 1). Esto refleja la segunda ley de la termodinámica aplicada a ecosystems: cada transferencia de energía implica pérdida por respiración, lo que resulta en menor biomasa en niveles superiores.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P2-ecosistemas-ecologia-069-MASTERY-v7`
**Bloom:** [Analyze]
**ICFES:** [Análisis de sucesiones ecológicas]
**Context:** [Reconversión de áreas degradadas en la Orinoquía]

### Enunciado
Después de un incendio forestаль en la Orinoquía colombiana, la vegetación inicial que se establece está compuesta principalmente por gramíneas y arbustos de rápido crecimiento. Con el tiempo, estos son reemplazados por bosque denso. ¿Cómo se clasifica este proceso ecológico?

### Options
- [ ] A) Simbiosis, porque las nuevas plantas se asocian para competir por recursos. <!-- feedback: La simbiosis es una relación entre especies diferentes, no un proceso de cambio en la composición de comunidades. -->
- [ ] B) Eutrofización, porque los nutrientes liberados por el incendio fertilizan el suelo. <!-- feedback: La eutrofización es el enriquecimiento excesivo de nutrientes en cuerpos de agua, no aplica a la sucesión terrestre. -->
- [x] C) Sucesión ecológica secundaria, porque ocurre después de una perturbación que dejó suelo intacto. <!-- feedback: La sucesión secundaria comienza en áreas donde ya existe suelo previamente formado, a diferencia de la sucesión primaria que inicia sobre roca desnuda. -->
- [ ] D) Climax, porque la comunidad inicial representa el estado final de estabilidad. <!-- feedback: Las gramíneas y arbustos iniciales son precisamente la etapas tempranas, no la comunidad clímax que sería el bosque denso. -->

### Explicación Pedagógica
La respuesta correcta es C. La sucesión ecológica secundaria ocurre cuando un ecosistema establecido es perturbado o destruido parcialmente, pero el suelo y algunos organismos sobrevivientes permanecen. En la Orinoquía, los incendios forestales de origen natural o humano generan perturbaciones que permiten la recolonización por especies pioneras (gramíneas, arbustos) seguidas eventualmente por especies climácicas (árboles de gran porte). La opción D confunde la etapa inicial con la comunidad clímax final.

---

## Question 8 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P2-ecosistemas-ecologia-069-MASTERY-v8`
**Bloom:** [Understand]
**ICFES:** [Comprensión del concepto de nicho ecológico]
**Context:** [Biodiversidad en la Amazonía colombiana]

### Enunciado
En la Amazonía colombiana, el jaguar (Panthera onca) habita principalmente en el suelo del bosque, es актив охотник que consume tapires, pecaríes y capibaras. Simultáneamente, el ocelote (Leopardus pardalis) ocupa el estrato inferior del bosque, cazando roedores, aves y reptiles pequeños. ¿Qué concepto ecológico explica la coexistencia de ambos felinos?

### Options
- [ ] A) La cooperación, porque ambas especies colaboran para cazar presas más grandes. <!-- feedback: Los jaguares y ocelotes no cooperan entre sí; son competidores potenciales por recursos similares. -->
- [x] B) La diferenciación de nicho, porque cada especie utiliza recursos diferentes del bosque. <!-- feedback: La diferenciación de nicho permite que especies similares coexistan mediante la partitioning de recursos, ocupando diferentes estratos y consumiendo diferentes presas. -->
- [ ] C) La neutralidad, porque ambas especies no interactúan entre sí directamente. <!-- feedback: Aunque no compitan directamente, la exclusión competitiva ocurre cuando los nichos se sobreponen excesivamente. -->
- [ ] D) La facilitación, porque los ocelotes se benefician de la presencia del jaguar. <!-- feedback: No existe evidencia de facilitación entre estas especies; su coexistencia se explica por la diferenciación de nichos. -->

### Explicación Pedagógica
La respuesta correcta es B. El principio de diferenciación de nicho (o partición de recursos) establece que especies que compiten por recursos similares pueden coexistir cuando cada una utiliza una porción diferente del ambiente o recursos diferentes. El jaguar ocupa el estrato suelo con presas grandes (tapir, pecarí), mientras el ocelote utiliza el estrato inferior cazando presas pequeñas (roedores). Esta separación reduce la competencia directa y permite la convivencia de ambas espécies similiares en el mismo ecosistema amazónico.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P2-ecosistemas-ecologia-069-MASTERY-v9`
**Bloom:** [Analyze]
**ICFES:** [Análisis de ciclos biogeoquímicos]
**Context:** [Suelos de la Serranía de la Macarena]

### Enunciado
En la Serranía de la Macarena, la deforestación para ganadería ha acelerado la degradación del suelo. Un técnico agrícola observa que los niveles de nitrógeno disponible en el suelo han disminuido drásticamente. ¿Cuál proceso ecológico se ha visto interrumpido por esta perturbación?

### Options
- [x] A) La fijación de nitrógeno atmosférico por bacteria.del género Rhizobium en leguminosas. <!-- feedback: Las bacterias Rhizobium establecen relaciones simbióticas con raíces de leguminosas, convirtiendo el N₂ atmosférico en amonio (NH₄⁺) asimilable por las plantas. Sin vegetación, este proceso se interrumpe. -->
- [ ] B) La evaporación del agua del suelo por acción directa de la luz solar. <!-- feedback: La evaporación es un proceso físico del ciclo hidrológico, no relacionado directamente con la disminución de nitrógeno. -->
- [ ] C) La respiración aeróbica de los descomponedores del suelo. <!-- feedback: Aunque la respiración ocurre, no es el proceso principal para explicar la disminución de nitrógeno biodisponible. -->
- [ ] D) La fotosíntesis de las plantas acuáticas en cuerpos de agua cercanos. <!-- feedback: La fotosíntesis incorpora nitrógeno solo indirectamente a través de la cadena trófica, pero no es el proceso de entrada principal de nitrógeno al suelo. -->

### Explicación Pedagógica
La respuesta correcta es A. El ciclo del nitrógeno requiere la transformación del nitrógeno atmosférico (N₂, no disponible directamente para la mayoría de organismos) en formas asimilables como amonio o nitratos. Este proceso de fijación biológica es realizado principalmente por bacterias symbiotically asociadas a leguminosas (Rhizobium, Bradyrhizobium) y también por bacteria de vida libre (Azotobacter, Cyanobacteria). La Removal de la vegetación leguminosa por deforestación interrumpe esta entrada principal de nitrógeno al ecosistema, causando impoverimiento del suelo.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P2-ecosistemas-ecologia-069-MASTERY-v10`
**Bloom:** [Apply]
**ICFES:** [Aplicación de conceptos de productividad primaria]
**Context:** [Cultivos de palma de aceite en los Llanos Orientales]

### Enunciado
Un ingeniero agrónomo compara la productividad primaria neta (PPN) de un monocultivo de palma de aceite con la de un bosque nativo adyacente en los Llanos Orientales. Encuentra que el monocultivo presenta valores significativamente menores. ¿Cuál explicación es más consistente con este hallazgo?

### Options
- [ ] A) Los monocultivos tienen mayor diversidad de especies, lo que aumenta la productividad. <!-- feedback: Los monocultivos tienen baja diversidad (una sola especie), no mayor. La diversidad generally se correlaciona positively con productividad. -->
- [ ] B) El monocultivo requiere menos nutrientes del suelo, permitiendo mayor crecimiento vegetal. <!-- feedback: Los monocultivos de palma de aceite son extremadamente demandantes de nutrientes, causando agotamiento del suelo. -->
- [x] C) La eficiencia en el uso de recursos (luz, agua, nutrientes) es menor en ecosistemas con baja complejidad estructural. <!-- feedback: Los bosques nativos tienen multiple estratos (dosel, subdosel, suelo) que capturan luz de manera más eficiente, mientras el monocultivo tiene un solo estrato con mayor pérdida de luz. -->
- [ ] D) Los monocultivos tienen mayor tasa de respiración celular, lo que incrementa la productividad. <!-- feedback: Mayor respiración celular significa mayor consumo de fotosintatos, lo que снижает la productividad neta, no aumenta. -->

### Explicación Pedagógica
La respuesta correcta es C. La productividad primaria neta (PPN) resulta de la fotosíntesis menos la respiración autotrófica. Los ecosistemas con alta complejidad estructural (bosques multiestratificados) capturan energía luminosa de manera más eficiente a través de múltiples capas de follaje. El monocultivo de palma de aceite, con su dosel uniforme y separado del suelo, pierde energía luminosa por reflexión y transmisión sin aprovechar. Adicionalmente, la baja diversidad funcional reduce la eficiencia en el uso de recursos hídricos y nutricionales del suelo.

---

## Question 11 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P2-ecosistemas-ecologia-069-MASTERY-v11`
**Bloom:** [Analyze]
**ICFES:** [Análisis de flujo de energía en ecosistemas]
**Context:** [Reserva natural La Paya, Amazonía]

### Enunciado
En la Reserva Natural La Paya, un estudio de flujo de energía reveló que los productores capturan 50,000 kJ/m²/año, los consumidores primarios asimilan 5,000 kJ/m²/año y los consumidores secundarios asimilan 500 kJ/m²/año. ¿Cuál es la eficiencia de transferencia entre niveles tróficos consecutivos?

### Options
- [ ] A) 10% entre productores y primarios, y 10% entre primarios y secundarios. <!-- feedback: 5,000/50,000 = 10%, y 500/5,000 = 10%, por lo tanto sería 10% en ambos casos. -->
- [x] B) 10% entre productores y primarios, y 10% entre primarios y secundarios. <!-- feedback: El cálculo es: (5,000/50,000) × 100 = 10% para el primer salto, y (500/5,000) × 100 = 10% para el segundo salto. Esto refleja la ley del 10% en cadenas tróficas. -->
- [ ] C) 90% entre productores y primarios, y 90% entre primarios y secundarios. <!-- feedback: 90% representaría la energía perdida, no la transferida. La eficiencia de transferencia es el porcentaje de energía que se transfiere al siguiente nivel. -->
- [ ] D) 5% entre productores y primarios, y 5% entre primarios y secundarios. <!-- feedback: El cálculo real da 10%, no 5%. 5% implicaría solo 2,500 kJ transferidos a primarios. -->

### Explicación Pedagógica
La respuesta correcta es B. La eficiencia de transferencia trófica se calcula como la proporción de energía o biomasa del nivel inferior que es assimilada por el nivel superior. Los datos muestran: Productores → Consumidores primarios: 5,000/50,000 = 0.10 = 10%; Consumidores primarios → Secundarios: 500/5,000 = 0.10 = 10%. Este resultado es consistente con la generalización ecológica de que típicamente solo se transfiere entre 5-20% de energía entre niveles tróficos (principalmente como consecuencia de la segunda ley de la termodinámica y las pérdidas por respiración).

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P2-ecosistemas-ecologia-069-MASTERY-v12`
**Bloom:** [Analyze]
**ICFES:** [Evaluación de estrategias de conservación]
**Context:** [Conectividad ecológica en corredores biológicos]

### Enunciado
El Ministerio de Ambiente propone conectar los Parques Nacionales Naturales Sierra Nevada de Santa Marta, El Cocuy y Los Farallones mediante corredores biológicos para proteger el oso de anteojos. Un biólogo argumenta que esta estrategia es insuficiente porque忽略了 factores bióticos importantes. ¿Cuál afirmación sería el argumento más fuerte del biólogo?

### Options
- [x] A) La fragmentación del hábitat ha reducido la diversidad genética de las poblaciones de oso de anteojos, por lo que corredores solos no resolverán el problema de endogamia. <!-- feedback: La fragmentación causa aislamiento de poblaciones, reduciendo el flujo genético y aumentando la endogamia. Los corredores biológicos facilitan la conexión, pero no resuelven problemas genéticos preexistentes si las poblaciones son muy reducidas. -->
- [ ] B) Los osos de anteojos pueden nadar entre los parques sin necesidad de corredores terrestres. <!-- feedback: Esta especie no tiene capacidad de nadar entre estas áreas geográficas separadas, y además la conectividade física del hábitat es necesaria para el movimiento y reproducción. -->
- [ ] C) La legislación actual es suficiente para proteger la especie sin necesidad de corredores adicionales. <!-- feedback: La legislación por sí sola no resuelve la fragmentación física del hábitat que impide el flujo genético y el movimiento natural de las poblaciones. -->
- [ ] D) El cambio climático eliminará los páramos de todos modos, haciendo inútil cualquier estrategia de conservación. <!-- feedback: Aunque el cambio climático es una amenaza real, esta visión derrotista ignora que la conectividad puede ayudar a las especies a adaptarse y migrar
