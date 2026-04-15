<think>
The user wants me to generate exactly 20 questions in the ICFES Saber 11 style for Reading Comprehension (Lectura Crítica) on the topic of "relaciones-intertextuales" (intertextual relationships), for grade 11, period 3.

Let me follow the format exactly as specified:

1. Start with the YAML frontmatter
2. Then 20 questions with the structure:
   - Question number with variant and difficulty level
   - ID
   - Bloom level
   - ICFES competency
   - Context
   - Enunciado (question)
   - Options with [x] on correct one
   - Explicación Pedagógica

Let me make sure:
- Difficulty is progressive: D3-D4 (questions 1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
- All in Spanish
- Colombian context
- ICFES style
- 4 options, no "all of the above" or "none of the above"
- Correct answer marked with [x]
- Plausible distractors based on real student errors

Let me create the questions now:

Questions 1-4 (D3-D4):
1. Basic recognition of intertextual reference
2. Basic understanding of types of intertextuality
3. Simple application of intertextual concept
4. Basic analysis of reference

Questions 5-10 (D5-D6):
5. Understanding different types of intertextuality
6. Analysis of allusion
7. Apply knowledge to identify reference
8. Analyze effect of intertextual reference
9. Evaluate purpose of reference
10. Understand parody vs. homage

Questions 11-16 (D7-D8):
11. Complex analysis of multiple references
12. Evaluate transformation of original text
13. Analyze cultural context of reference


14. Evaluate author's purpose in using reference
15. Analyze citation vs. allusion
16. Complex evaluation of adaptation

Questions 17-20 (D9-D10):
17. Advanced synthesis of multiple intertextual layers
18. Evaluate credibility through intertextual reference
19. Complex analysis of hypertext/hypotext relationship
20. Create evaluation of original work transformation

I'll maintain consistency across all 20 questions to ensure coherence and proper progression of difficulty.

</think>

```yaml
---
id: "CO-LEC-11-P3-relaciones-intertextuales-049-MASTERY"
country: "colombia"
grado: 11
asignatura: "lectura-critica"
tema: "relaciones-intertextuales"
periodo: 3
protocol_version: "5.1"
bundle_size: 20
bundle_index: 49
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T17:46:41.368098"
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

**ID:** `CO-LEC-11-P3-relaciones-intertextuales-049-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Interpretar y relacionar textos
**Context:** Cultura popular colombiana

### Enunciado
Cuando en una canción de Karol G se hace referencia a una diosa mitológica para describir la belleza de una persona, ¿qué tipo de relación intertextual se está estableciendo?

### Options
- [ ] A) Parodia, porque se burla del mito original <!-- feedback: la parodia implica humor y ridiculización, no糙美化 -->
- [ ] B) Hipertextualidad, porque se crea un texto completamente nuevo sin relación con el original <!-- feedback: la hipertextualidad implica transformación, no ausencia de relación -->
- [x] C) Alusión, porque se evoca indirectamente un texto o personaje conocido <!-- feedback: correctamente se identifica la mención indirecta que evoca la mitología griega -->
- [ ] D) Intertextualidad explícita, porque se menciona el nombre completo del mito <!-- feedback: en la allusion no se menciona explícitamente, sino que se evoca -->

### Explicación Pedagógica
La respuesta correcta es C porque la allusion es una referencia indirecta a un texto, personaje o evento conocido sin citarlos explícitamente. En el caso de Karol G, menciona "diosa" sin decir explícitamente Afrodita o Venus, creando una conexión con la mitología griega que enriquece la letra. Los distractores confunden los tipos de relación: la parodia requiere burla, la hipertextualidad implica transformación activa, y la intertextualidad explícita requiere cita directa.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-LEC-11-P3-relaciones-intertextuales-049-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Identificar información implícita
**Context:** Literatura colombiana

### Enunciado
En la novela *Cien años de soledad* de Gabriel García Márquez, el personaje José Arcadio Buendía se obsesiona con el alquimia y los científicos. Esta característica del personaje refleja la influencia que el autor recibió de la literatura europea del siglo XIX. ¿Qué tipo de relación intertextual se evidencia en este caso?

### Options
- [ ] A) Imitación directa, porque García Márquez copia personajes europeos <!-- feedback: la intertextualidad no es copia, sino diálogo creativo -->
- [ ] B) Parodia, porque se burla de la ciencia europea de la época <!-- feedback: no hay intención de burla en la caracterización -->
- [x] C) Intertextualidad cultural, porque se incorporan conocimientos y tradiciones de otras obras al contexto latinoamericano <!-- feedback: los temas de alquimia y obsesión científica provienen de la tradición literaria europea y se incorporan al contexto de Macondo -->
- [ ] D) Citación textual, porque se copian fragmentos de obras europeas <!-- feedback: no hay copia textual, sino transformación de temas -->

### Explicación Pedagógica
La respuesta correcta es C. La intertextualidad cultural ocurre cuando un autor incorpora temas, ideas o tendencias de una tradición literaria foránea y las reelabora en su propio contexto. García Márquez transforma la obsesión científica europea del siglo XIX, filtrándola a través de la realidad mágica de Macondo. Los distractores confunden formas específicas: la imitación y citación son más directas, y la parodia requiere intención humorística que no existe aquí.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-LEC-11-P3-relaciones-intertextuales-049-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Analizar relaciones entre textos
**Context:** Redes sociales y memes

### Enunciado
Un influenciador colombiano publica en su cuenta de Instagram: "Mi situación económica está peor que la de Macbeth después de asesinar al rey". Esta frase establece una relación intertextual con la obra de Shakespeare. ¿Cuál es el texto fuente (hipotexto) en esta relación?

### Options
- [ ] A) La publicación del influenciador, porque es el texto que se creó a partir de la referencia <!-- feedback: el texto que se crea a partir de otro se llama hipertexto, no hipotexto -->
- [ ] B) La obra *Macbeth* de Shakespeare, porque es la obra original a la que se hace referencia <!-- feedback: técnicamente correcto sobre la fuente, pero la pregunta pide específicamente el hipotexto en esta relación -->
- [ ] C) Las finanzas del influenciador, porque es el tema central de la publicación <!-- feedback: el hipotexto siempre se refiere a otro texto, no a situaciones reales -->
- [ ] D) Los memes económicos de Instagram, porque son el contexto donde surge la frase <!-- feedback: el hipotexto es siempre una obra textual específica, no un formato o género -->

### Explicación Pedagógica
La respuesta correcta es B. Genette define el hipotexto como el texto fuente del cual parte una relación intertextual. En este caso, Macbeth de Shakespeare es el hipotexto, y la publicación del influenciador es el hipertexto. El lector debe conocer la tragedia de Macbeth para entender la referencia a la ambición desmedida y sus consecuencias catastróficas. Los estudiantes frecuentemente confunden los términos, thinking que el texto nuevo es el hypotexto cuando en realidad es el hipertexto.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-LEC-11-P3-relaciones-intertextuales-049-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Interpretar elementos culturales
**Context:** Medios de comunicación colombianos

### Enunciado
En el noticieroRCN, el presentador comienza su editorial con la frase: "Estamos viviendo tiempos que harían sangrar el corazón de García Márquez". Esta expresión utiliza una referencia intertextual con la novela *El corazón del silencio*. ¿Qué función cumple esta referencia en el contexto del noticiero?

### Options
- [ ] A) Crear confusión en el televidente que no conoce la obra <!-- feedback: la función no es confundir, sino comunicar -->
- [ ] B) Establecer una conexión emocional entre el contexto actual y la narrativa literaria de la obra referenciada <!-- feedback: efectivamente se apela a la emotividad que transmite la literatura de García Márquez -->
- [ ] C) Demostrar que el presentador tiene formación literaria superior <!-- feedback: la función no es exhibirse, sino comunicar eficazmente -->
- [ ] D) Reemplazar la información factual con metáforas literarias <!-- feedback: no se busca reemplazar, sino enriquecer la información -->

### Explicación Pedagógica
La respuesta correcta es B. La función de la intertextualidad en el discurso mediático es frecuentemente apelar a conocimiento compartido para crear resonancia emocional. Al mencionar a García Márquez, el presentador evoca la riqueza emocional de su narrativa, conectando el momento actual (problemático o dramático) con esa tradición literaria. Los distractores A y C muestran comprensión incompleta de la función comunicativa, mientras que D confunde el propósito retórico con una supuesta sustitución de contenido.

---

## Question 5 (Variant Medium - Difficulty D5)

**ID:** `CO-LEC-11-P3-relaciones-intertextuales-049-MASTERY-v5`
**Bloom:** Understand
**ICFES:** Evaluar estrategias discursivas
**Context:** Cine colombiano

### Enunciado
El director colombiano Carlos Moreno filma *La sociedad del semisólo*, una película que reescribe completamente la historia del Quijote de la Mancha situándola en las calles de Medellín con un protagonista desplazado. ¿Qué tipo de relación intertextual predomina en esta adaptación?

### Options
- [ ] A) Alusión simple, porque solo se menciona el nombre del Quijote <!-- feedback: es una reescritura completa, no una mera mención -->
- [ ] B) Parodia, porque se ridiculiza la obra original <!-- feedback: no se busca ridiculizar, sino resignificar -->
- [ ] C) Adaptación transformativa, porque se reescribe la obra en un nuevo contexto cultural manteniendo la esencia del texto original <!-- feedback: la adaptación transformativa busca actualizar el texto manteniendo su esencia -->
- [ ] D) Pastiche, porque se copian elementos formales sin intención crítica <!-- feedback: el pastiche copia sin transformación crítica -->

### Explicación Pedagógica
La respuesta correcta es C. La adaptación transformativa mantiene la estructura profunda del texto fuente (el Quijote) pero lo reubica en un contexto cultural完全不同 (Medellín, desplazamiento forzado). El protagonista mantiene características del hidalgo manchego: la idealism que choca con la realidad, pero este idealism se transforma en sobrevivencia urbana. Los estudiantes tienden a confundir adaptación con parodia (que requiere ridiculización) o pastiche (que es copia sin propósito crítico).

---

## Question 6 (Variant Medium - Difficulty D5)

**ID:** `CO-LEC-11-P3-relaciones-intertextuales-049-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Interpretar elementos implícitos
**Context:** Música urbana colombiana

### Enunciado
El rapero bogotano Krakop graba una canción cuyo estribillo dice: "Yo no pido limosna, pido lo que es mío, como el Cid con su espada". La referencia a El Cid implica que el narrador se considera un guerrero honorable cuyo territorio le ha sido arrebatado injustamente. ¿Qué tipo de relación intertextual permite esta comprensión?

### Options
- [ ] A) Trama compartida, porque la historia de ambos personajes es idéntica <!-- feedback: las tramas son diferentes, lo que se comparte es el tema del honor perdido -->
- [ ] B) Tema común, porque tanto el texto fuente como el nuevo utilizan el tema del honor guerrero para expresar su mensaje <!-- feedback: se identifican correctamente los temas compartidos que permiten la comparación -->
- [ ] C) Personaje paralelo, porque el narrador se convierte en El Cid <!-- feedback: no se identifica con el personaje, sino con su situación temática -->
- [ ] D) Citación directa, porque se menciona explícitamente El Cid <!-- feedback: se menciona el nombre, pero la relación es temática, no literal -->

### Explicación Pedagógica
La respuesta correcta es B. El concepto de tema común permite que textos aparentemente desconectados puedan establecerse en diálogo a través de ideas compartidas. El tema del guerrero honorable cuya honra ha sido mancillada conecta el Cantar del Mio Cid con el contexto urbano del rap. El oyente debe tener el conocimiento del texto fuente para activar esta conexión temática. Los distractores representan errores comunes: confundir tema con trama (A), personaje con situación (C), o citación explícita con la referencia más sutil al tema (D).

---

## Question 7 (Variant Medium - Difficulty D6)

**ID:** `CO-LEC-11-P3-relaciones-intertextuales-049-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Evaluar información textual
**Context:** Literatura latinoamericana

### Enunciado
En el prólogo de su novela *La casa de los espíritus*, Isabel Allende escribe: "Escritores como Gabriel García Márquez han demostrado que la realidad latinoamericana necesita de la magia para ser contada". ¿Qué tipo de relación intertextual explícita se establece en este fragmento?

### Options
- [ ] A) Parodia del realismo mágico, porque se burla del estilo de García Márquez <!-- feedback: no hay intención burlesca en la frase -->
- [ ] B) Discurso de referencia, porque se menciona directamente a otro autor para contextualizar el propio trabajo <!-- feedback: efectivamente se usa el nombre de otro autor para posicionar el propio -->
- [ ] C) Plagio literario, porque se copian las ideas de García Márquez sin atribución <!-- feedback: se atribuye correctamente, no hay plagio -->
- [ ] D) Intertextualidad implícita, porque se habla de magia sin mencionar la literatura <!-- feedback: se menciona explícitamente a García Márquez -->

### Explicación Pedagógica
La respuesta correcta es B. El discurso de referencia o metalepsia ocurre cuando un autor menciona explícitamente a otros autores o textos para crear un marco de referencia para su propia obra. Allende utiliza el nombre de García Márquez como emblema del realismo mágico para posicionar su propia novela dentro de esa tradición. Los distractores exponen errores conceptuales: parodia requiere burla, plagio implica apropiación indebida (aquí se attribution correctamente), y la intertextualidad implícita no requiere mención directa de otros autores.

---

## Question 8 (Variant Medium - Difficulty D6)

**ID:** `CO-LEC-11-P3-relaciones-intertextuales-049-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Analizar propósito comunicativo
**Context:** Teatro colombiano

### Enunciado
El dramaturgo antioqueño Juan Gustavo Cobo inicia su obra *Macondo: El juicio final* con una escena donde los personajes de *Cien años de soledad* comparecen ante un tribunal. La obra transforma a los Melquíades en jueces y a los Buendía en procesados. ¿Qué efecto comunicativo logra esta transformación intertextual?

### Options
- [ ] A) Mostrar que la obra original tiene errores históricos que deben ser corregidos <!-- feedback: el propósito no es corregir, sino explorar -->
- [ ] B) Plantear una reflexión sobre la inevitabilidad del destino familiar y la tragedia heredada que ya estaba presente en la obra original <!-- feedback: el tribunal como metáfora de destino permite explorar la fatalidad que García Márquez ya desarrollaba -->
- [ ] C) Ridiculizar a los personajes de García Márquez para hacer humor teatral <!-- feedback: no hay intención burlesca en la metáfora del tribunal -->
- [ ] D) Demostrar que Macondo realmente existió y sus habitantes pueden ser llevados a juicio <!-- feedback: no se busca un efecto de realidad, sino filosófico -->

### Explicación Pedagógica
La respuesta correcta es B. Al transformar los personajes en procesados ante un tribunal, Cobo utiliza la estructura del juicio como metáfora para explorar el tema del destino inevitable y la tragedia familiar que ya estaba presente en la obra de García Márquez. El juicio representa la imposibilidad de escapar a la condición heredada. Esta es una hipertextualidad transformativa que reinterpreta el hipotexto sin ridiculizarlo (descartando C) ni claim su literalidad (descartando D).

---

## Question 9 (Variant Medium - Difficulty D6)

**ID:** `CO-LEC-11-P3-relaciones-intertextuales-049-MASTERY-v9`
**Bloom:** Evaluate
**ICFES:** Evaluar argumentos del texto
**Context:** Publicidad en medios colombianos

### Enunciado
Una publicidad de la marca colombiana ¡¡MÁQUIMA!! muestra a un hombre disfrazado de Superman volando sobre Bogotá, mientras la voz en off dice: "Vuela más alto que las tarifas de energía". El anuncio utiliza la imagen del superhéroe para comunicar su mensaje. ¿Cuál es la intención comunicativa principal de esta relación intertextual?

### Options
- [ ] A) Establecer una conexión irónica entre la fantasía del vuelo y la realidad de los precios elevados en Colombia <!-- feedback: la conexión es irónica, pero no es la intención principal -->
- [ ] B) Apelar a la universalidad de Superman como símbolo de capacidades sobrehumanas para exagerar la promesa del producto <!-- feedback: efectivamente se usa a Superman como símbolo universal para amplificar la promesa -->
- [ ] C) Criticar que los superhéroes son假的 e irreales en contraste con los problemas reales del país <!-- feedback: no hay crítica, hay celebración del producto -->
- [ ] D) Informar que la marca ha obtenido los poderes de Superman <!-- feedback: es una metáfora, no una claim literal -->

### Explicación Pedagógica
La respuesta correcta es B. La publicidad utiliza la intertextualidad con Superman para apelar al reconocimiento universal del símbolo: Superman representa capacidades sobrehumanas. Al conectar esto con el producto, la marca promete que el consumidor podrá "volar" (superarse) más allá de sus limitaciones (las tarifas). Los estudiantes frecuentemente interpretan el humor irónico como la intención principal (A), cuando en realidad es un vehículo para la promesa de marca. C y D muestran comprensión literalista de la metáfora publicitaria.

---

## Question 10 (Variant Medium - Difficulty D6)

**ID:** `CO-LEC-11-P3-relaciones-intertextuales-049-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Identificar procedimientos discursivos
**Context:** Sátira política colombiana

### Enunciado
En una columna de opinión del periódico bogotano *El Espectador*, el columnist escreve: "Los indicadores económicos del país están en caída libre, y lo único que sube es la deuda pública. Bien dice el dicho: 'Agua que no has de beber, déjalo correr'". El uso del refrán establece una relación intertextual con la tradición oral. ¿Cuál es la función específica de este procedimiento en el texto?

### Options
- [ ] A) Confundir al lector que no conoce los refranes colombianos <!-- feedback: la función es aclarar, no confundir -->
- [ ] B) Usar la autoridad de la tradición oral para validar el argumento crítico del columnist <!-- feedback: el refrán funciona como herramienta retórica que otorga peso tradicional al argumento crítico -->
- [ ] C) Insultar directamente al gobierno sin consecuencias legales <!-- feedback: no hay intención de insulto, sino de ilustración -->
- [ ] D) Demostrar que el columnist domina la literatura oral colombiana <!-- feedback: el propósito no es exhibir conocimiento -->

### Explicación Pedagógica
La respuesta correcta es B. Los refranes y frases proverbiales pertenecen al dominio de la intertextualidad con la tradición oral. Al incorporar el refrán, el columnist Apela a la sabiduría tradicional collective y la utiliza como herramienta retórica para dar peso a su argumento sobre la economía. El refrán tiene autoridad cultural que el columnista aprovecha. Los distractores reflejan interpretaciones reducidas: A sees la función como confusión, C reduces a insulto, y D ve la función como exhibicionismo intelectual.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P3-relaciones-intertextuales-049-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Analizar procedimientos literarios
**Context:** Teatro universitario colombiano

### Enunciado
Un grupo de teatro universitario de Medellín presenta una adaptación de *Romeo y Juliet* ambientada en las pandillas del Bronx de la ciudad. La función cambia el conflicto de familias nobles a un conflicto entre pandillas por el control del microtráfico, manteniendo la estructura de los amantes de familias rivales. La relación entre el texto de Shakespeare (hipotexto) y la adaptación (hipertexto) demuestra que:

### Options
- [ ] A) Los textos clásicos solo pueden adaptarse si el contexto social es idéntico al original <!-- feedback: la adaptación justru proves lo contrario -->
- [ ] B) La estructura profunda de las tramas tragedias es transferible a contextos sociales radicalmente diferentes porque abordan conflictos universales del ser humano <!-- feedback: la permanencia de los arquetipos narrativos permite que temas universales sobrevivan al cambio de contexto -->
- [ ] C) Shakespeare debe actualizarse para ser relevante para las nuevas generaciones <!-- feedback: la respuesta toca algo verdadero pero no aborda la relación intertextual específicamente -->
- [ ] D) Las pandillas del Bronx pueden entenderse mejor a través de la literatura del siglo XVI <!-- feedback: la relación funciona en ambas direcciones, pero la pregunta se centra en el proceso de adaptación -->

### Explicación Pedagógica
La respuesta correcta es B. La adaptación de Shakespeare al contexto de pandillas de Medellín demuestra que la estructura profunda de la tragedia (amor imposible entre miembros de grupos enemigos debido a un conflicto ancestral) es un arquetipo transferible. Genette denomina a esto hipertextualidad transformativa: el hipotexto (Shakespeare) proporciona la estructura que se adapta al nuevo contexto. El conflicto universal de групповой enemistad que impide el amor se manifiesta tanto en Verona como en el Bronx. Los distractores A, C y D ofrecen observaciones parciales o superficiales sobre el fenómeno.

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P3-relaciones-intertextuales-049-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Evaluar intención discursiva
**Context:** Humor gráfico colombiano

### Enunciado
En una viñeta cómica delkartoonist colombiano Perryidh, se muestra al presidente de la República vestido de Super Mario, saltando sobre bloques mientras persigue monedas. La relación intertextual con el videojuego establece que el presidente:

### Options
- [ ] A) Está jugando videojuegos durante horas de trabajo <!-- feedback: la viñeta no hace una claim literal sobre las acciones del presidente -->
- [ ] B) Persigue ilusoriamente la riqueza económica sin resolver los problemas estructurales del país, usando la metáfora del juego que nunca termina <!-- feedback: la crítica sugiere que las acciones del presidente son tan infructuosas como el juego infinito de Mario -->
- [ ] C) Admira los videojuegos como forma de entretenimiento superior <!-- feedback: no hay admiración, sino crítica -->
- [ ] D) Debería regulate mejor los videojuegos en Colombia <!-- feedback: la metáfora no se refiere a política de videojuegos -->

### Explicación Pedagógica
La respuesta correcta es B. La hipertextualidad en la viñeta es transformativa y crítica: Super Mario representa la búsqueda infinita de monedas (riqueza) sin un objetivo final claro, en contraste con la realidad del trabajo presidential que también puede percibirse como infinito y sin resolution clara de problemas fundamentales. El kartoonist utiliza la reconocibilidad del videojuego para crear una metáfora visual de crítica política. Los distractores A, C y D misinterpretan la naturaleza figurativa de la metáfora gráfica.

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-LEC-11-P3-relaciones-intertextuales-049-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Interpretar elementos culturales
**Context:** Novela histórica colombiana

### Enunciado
En la novela *El general en su laberinto* de Gabriel García Márquez, el autor reescribe la vida de Simón Bolívar en sus últimos días, presentándolo como un hombre derrotado, sufriente y vulnerable. Esta reescritura establece una relación intertextual con los textos históricos tradicionales sobre el Libertador. ¿Qué efecto produce esta transformación?

### Options
- [ ] A) Desmerece la figura histórica de Bolívar al mostrarlo vulnerable <!-- feedback: la intención no es demerecer, sino humanizar -->
- [ ] B) Humaniza al personaje histórico al mostrar sus dimensiones vulnerables, transformando la narrativa épica tradicional en una exploración psicológica del poder y la derrota <!-- feedback: la transformación permite explorar dimensiones humanas que la narrativa épica tradicionales obvia -->
- [ ] C)Replica los errores históricos de biografías anteriores <!-- feedback: no hay replica de errores, sino transformación consciente -->
- [ ] D) Busca que los lectores odien a Bolívar <!-- feedback: no hay intención de generar odio -->

### Explicación Pedagógica
La respuesta correcta es B. La hipertextualidad transformativa en la novela de García Márquez funciona como defamiliarización: al mostrar a Bolívar vulnerable, el texto rompe con la representación épica tradicional y permite al lector ver al personaje desde una perspectiva humana y psicológica. El contraste entre el Bolívar épico de la tradición y el Bolívar vulnerable de García Márquez genera una reflexión sobre el poder, la vejez y la derrota. Los distractores atribuyen intenciones moralizantes simplistas al texto (A, D) o confunden la transformación consciente con error (C).

---

## Question 14 (Variant Advanced - Difficulty D8)

**ID:** `CO-LEC-11-P3-relaciones-intertextuales-049-MASTERY-v14`
**Bloom:** Evaluate
**ICFES:** Evaluar argumentos del texto
**Context:** Crítica literaria colombiana

### Enunciado
Un crítico literario de la revista *Semana* escribe: "La nouvelle *La喃喃细语* de Juan Pablo Reales necesita constantemente del eco de García Márquez para sostenerse, lo cual revela una debilidad creativa del autor". Esta afirmación valora la relación intertextual como:

### Options
- [ ] A) Un diálogo positivo que enriquece la tradición literaria colombiana <!-- feedback: el crítico hace una valoración negativa, no positiva -->
- [ ] B) Una dependencia que impide que la nouvelle se sostenga por sí misma <!-- feedback: el crítico precisamente señala que la obra necesita del eco de García Márquez, lo que evidencia dependencia -->
- [ ] C) Una estrategia comercial para vender más