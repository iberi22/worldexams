<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for English, specifically for the "reading-inferential" topic, grade 11, period 2. Let me carefully follow all the requirements:

1. I need to output a YAML frontmatter block followed by 20 questions
2. Each question must follow the exact structure provided
3. Difficulty progression: D3-D4 (questions 1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
4. The correct answer should be marked with [x]
5. Need plausible distractors based on common errors Colombian students make
6. Modern Colombian context
7. 4 options per question, no "all of the above" or "none of the above"
8. Topic is reading-inferential - this means questions where students need to infer meaning, identify tone, purpose, draw conclusions, make predictions, etc.

For reading-inferential questions in ICFES style, the texts typically:
- Are short passages (sometimes a single paragraph)
- Test ability to make inferences
- Identify implied meanings
- Determine tone, purpose, attitude
- Draw conclusions
- Make predictions
- Understand figurative language

Let me create 20 questions with progressive difficulty:

Questions 1-4: D3-D4 (basic inference)
Questions 5-10: D5-D6 (intermediate inference)
Questions 11-16: D7-D8 (advanced inference)
Questions 17-20: D9-D10 (complex/high-level inference)

I need to make sure:
- Each question has a unique ID (v1, v2, v3... v20)
- Bloom taxonomy level matches the difficulty
- ICFES competency is appropriate
- Options are plausible distractors
- Correct answer is marked with [x]
- Feedback comments explain why distractors are wrong


- I'll create a Colombian context for each passage, incorporating scenarios relevant to Colombian students' experiences and cultural background.

For reading-inferential questions, I'll design scenarios that test students' ability to:
- Infer meaning from context clues
- Identify author's tone and purpose
- Make predictions based on textual evidence
- Draw conclusions from implicit information
- Understand implied relationships between ideas

I'll use Colombian contexts like:
- Urban life in Bogotá or Medellín
- Environmental issues in Colombia
- Cultural traditions and festivals
- Social and economic challenges
- Educational experiences
- Technology and modernization
- Indigenous and Afro-Colombian perspectives
- Regional diversity and traditions

</think>

```yaml
---
id: "CO-ING-11-P2-reading-inferential-124-MASTERY"
country: "colombia"
grado: 11
asignatura: "ingles"
tema: "reading-inferential"
periodo: 2
protocol_version: "5.1"
bundle_size: 20
bundle_index: 124
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T22:20:53.948772"
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

**ID:** `CO-ING-11-P2-reading-inferential-124-MASTERY-v1`
**Bloom:** Understand
**ICFES:** Lee e interpreta diferentes significados en textos de mediana extensión.
**Context:** Vida cotidiana en Medellín

### Enunciado

**Read the following text:**

"My grandmother still lives in El Poblado. She refuses to move to our new apartment in Estadio, even though it's safer and closer to us. She says the mountains remind her of her childhood in Santa Fe de Antioquia."

**What can be inferred about the grandmother?**

- [ ] A) She is afraid of living in modern neighborhoods
- [ ] B) She is not close to her family <!-- feedback: The text shows the family wants her nearby, but nothing indicates distance -->
- [x] C) She has strong emotional ties to the landscape of her youth <!-- feedback: Correct. The text implies her connection to the mountains relates to happy childhood memories -->
- [ ] D) She prefers living alone in dangerous areas <!-- feedback: While she refuses to move, this oversimplifies the text's meaning -->

### Explicación Pedagógica
La inferencia correcta requiere identificar que la abuela tiene vínculos emocionales profundos con el paisaje montañoso vinculado a su infancia. Las otras opciones son distractores que o bien exageran la información (D), o sacan conclusiones no apoyadas por el texto (A, B).

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-ING-11-P2-reading-inferential-124-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Lee e interpreta diferentes significados en textos de mediana extensión.
**Context:** Tecnología y educación en Bogotá

### Enunciado

**Read the following text:**

"María checked her phone for the third time in an hour. No notification from the university. "If I don't hear by Friday, I'll assume I didn't get the scholarship," she told her roommate, sighing."

**What does María's behavior suggest about her situation?**

- [ ] A) She is confident about her admission
- [x] B) She is anxious and uncertain about her results <!-- feedback: Correct. Checking repeatedly and preparing for rejection reveals anxiety -->
- [ ] C) She no longer wants to study
- [ ] D) She has already received bad news <!-- feedback: The text clearly states she hasn't heard yet -->

### Explicación Pedagógica
La inferencia se basa en las pistas textuales: verificar el teléfono repetidamente indica ansiedad, y la frase condicional sobre no recibir noticias sugiere incertidumbre. Los distractores (A, C, D) contradicen directamente la información del texto.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-ING-11-P2-reading-inferential-124-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Infiere información implícita en textos leídos.
**Context:** Medio ambiente en Colombia

### Enunciado

**Read the following text:**

"The fishermen near the Ciénaga Grande de Santa Marta have noticed something strange. The crabs they used to catch in minutes now take hours. "My father caught a hundred in one morning," says José, showing me his empty bucket. "Now I'm lucky to get ten.""

**What can be inferred from this passage?**

- [ ] A) José is a lazy fisherman compared to his father
- [x] B) The ecosystem of the Ciénaga Grande has been damaged over time <!-- feedback: Correct. The contrast between father's success and José's failure implies environmental degradation -->
- [ ] C) Crabs have migrated to another area completely
- [ ] D) José is exaggerating to get sympathy <!-- feedback: The text presents this as an observation from fishermen, not as manipulation -->

### Explicación Pedagógica
La inferencia lógica se construye a partir de la comparación generacional: si las capturas disminuyeron drásticamente entre el padre y el hijo, algo cambió en el ecosistema. Las otras opciones o culpan al individuo (A), o son demasiado definitivas sin base textual (C), o ignoran el contexto de observación testigo (D).

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-ING-11-P2-reading-inferential-124-MASTERY-v4`
**Bloom:** Analyze
**ICFES:** Infiere información implícita en textos leídos.
**Context:** Vida universitaria en Cartagena

### Enunciado

**Read the following text:**

"At the Universidad de Cartagena orientation, the dean asked all new students where they were from. When Andrés said "Bogotá," two students next to him immediately started speaking English to each other and laughing. Andrés felt his face turn red."

**What is the main purpose of mentioning Andrés turning red?**

- [ ] A) To show he was feeling hot from the tropical weather
- [ ] B) To indicate he was sick or having a medical issue
- [x] C) To imply he felt embarrassed or excluded <!-- feedback: Correct. "Face turning red" is an idiom suggesting embarrassment when someone is mocked -->
- [ ] D) To describe a physical reaction to the humidity <!-- feedback: The text places this reaction right after the mocking, connecting it to the social situation -->

### Explicación Pedagógica
La frase "felt his face turn red" es una expresión común que indica vergüenza o sentirse incomodo. El contexto previo (los compañeros riendo mientras hablan inglés) establece la causa social. Los distractores ignoran el contexto interpersonal y literalizan una expresión figurativa.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-ING-11-P2-reading-inferential-124-MASTERY-v5`
**Bloom:** Understand
**ICFES:** Infiere información implícita en textos leídos.
**Context:** Problemas sociales en Cali

### Enunciado

**Read the following text:**

"The street vendors along Calle 5ta have a love-hate relationship with tourists. They need the sales to survive, but they hate when visitors take photos instead of buying. "¡No es un zoológico!" they shout when cameras appear."

**What does the vendors' reaction to cameras reveal?**

- [ ] A) They want to become famous on social media
- [x] B) They feel reduced to an attraction rather than respected as workers <!-- feedback: Correct. The phrase compares them to animals in a zoo, showing they feel dehumanized -->
- [ ] C) They don't like any tourists at all
- [ ] D) Photography is illegal in that area <!-- feedback: The text shows their objection is about being photographed while not selling, not about photography itself -->

### Explicación Pedagógica
La expresión "¡No es un zoológico!" es irónica y sarcástica. Los vendedores no objetan la fotografía en sí, sino el hecho de ser tratados como spectacle en lugar de como trabajadores con dignidad. Los distractores simplifican o distorsionan el mensaje implícito.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-ING-11-P2-reading-inferential-124-MASTERY-v6`
**Bloom:** Understand
**ICFES:** Lee e interpreta diferentes significados en textos de mediana extensión.
**Context:** Gastronomía colombiana en Bucaramanga

### Enunciado

**Read the following text:**

"Doña Clara has been making arepas in the same corner market for forty years. Lately, her children tell her to retire. "What would I do?" she asks. "These hands don't know any other work." Her customers, however, show up earlier every day."

**What does Doña Clara's final sentence reveal about her situation?**

- [ ] A) The customers are getting younger
- [x] B) She may be more essential to her community than she realizes <!-- feedback: Correct. The increasing daily customers suggest her role is valued, contrasting with her feeling of uselessness -->
- [ ] C) She should raise her prices due to demand
- [ ] D) Her children will force her to retire soon <!-- feedback: The text shows the opposite trend - her importance seems to be growing, not diminishing -->

### Explicación Pedagógica
La ironía del texto está en que Doña Clara duda de su utilidad ("What would I do?") mientras sus clientes demuestran lo contrario aumentando sus visitas. Los distractores capturan detalles superficiales (A, C) o ignoran la pista textual que contradice la inferencia (D).

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-ING-11-P2-reading-inferential-124-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Infiere información implícita en textos leídos.
**Context:** Inmigración y diversidad en Barranquilla

### Enunciado

**Read the following text:**

"During the carnival preparations, I noticed Alejandro Practicing his dance moves alone near the Estadio Metropolitano. He was not with any of the troupes. "You're not practicing with your group?" I asked. "I'm preparing something different this year," he said, without looking up."

**What does Alejandro's behavior suggest about his character?**

- [ ] A) He is lazy and doesn't want to participate
- [ ] B) He is sick and cannot dance with others
- [x] C) He is independent and confident in his own vision <!-- feedback: Correct. He deliberately separates himself to develop something individual, suggesting artistic confidence -->
- [ ] D) He was kicked out of his carnival group <!-- feedback: Nothing in the text suggests rejection; he explicitly chooses to do something different -->

### Explicación Pedagógica
La inferencia requiere combinar comportamiento ("alone," "without looking up") con diálogo explícito ("I'm preparing something different"). Los estudiantes frecuentemente asumen drama (D) o problemas físicos (B) cuando el texto indica elección personal. El distractor (A) ignora el contexto de preparación seria.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-ING-11-P2-reading-inferential-124-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Infiere información implícita en textos leídos.
**Context:** Educación rural en Nariño

### Enunciado

**Read the following text:**

"Rodrigo walks two hours each way to his school in Pasto. His parents wanted him to work in the farm, but the teacher convinced them. "A good mind needs feeding too," she told them. Rodrigo is now in third place in his class, but sometimes he falls asleep at his desk."

**What does the contrast between Rodrigo's achievement and his tiredness reveal?**

- [ ] A) He is not intelligent enough for the academic demands
- [x] B) He is making great sacrifices for his education <!-- feedback: Correct. High class ranking despite exhaustion shows the effort required; the contrast highlights dedication -->
- [ ] C) The teacher should not have intervened in family decisions
- [ ] D) He should drop out to help his family <!-- feedback: The text shows success from the teacher's decision, not that it was wrong -->

### Explicación Pedagógica
El texto establece claramente que Rodrigo está teniendo éxito académico (tercer lugar) pero a un costo personal significativo. Esta contradicción señala sacrificio. Los distractores moralistas (C) o fatalistas (D) ignoran la interpretación equilibrada que ofrece el texto.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-ING-11-P2-reading-inferential-124-MASTERY-v9`
**Bloom:** Understand
**ICFES:** Lee e interpreta diferentes significados en textos de mediana extensión.
**Context:** Música y cultura en Villa de Leyva

### Enunciado

**Read the following text:**

"The local tiple player watched the young tourists photographing the colonial church. He started playing quietly at first, then louder. One tourist whispered to her friend, "This place must be special if they have traditional music." The player smiled without stopping."

**What does the tiple player's smile indicate?**

- [ ] A) He was paid by the tourist guide
- [ ] B) He recognized the tourist from a previous visit
- [x] C) He was pleased that the music added cultural context for the visitor <!-- feedback: Correct. The smile comes after the tourist's comment about the music making the place "special," showing appreciation -->
- [ ] D) He was mocking the tourists' lack of knowledge <!-- feedback: Nothing in the text suggests mockery; the timing links the smile to the positive comment -->

### Explicación Pedagógica
La ubicación del sorriso (justo después del comentario de la turista) crea la conexión inferencial. El jugador toca para enriquecer la experiencia, no por obligación o burla. Los distractoresintroducen elementos externos al texto o asumen motivaciones negativas sin evidencia.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-ING-11-P2-reading-inferential-124-MASTERY-v10`
**Bloom:** Analyze
**ICFES:** Infiere información implícita en textos leídos.
**Context:** Transporte público en Bogotá

### Enunciado

**Read the following text:**

"The TransMilenio driver slowed down at the Portal del Norte stop. A woman with a heavy load struggled with the doors. The driver waited—something I've never seen in morning rush hour—then helped her fold the stroller. The other passengers waited without complaint."

**What is the author trying to convey about this situation?**

- [ ] A) Morning rush hour is always stressful in Bogotá
- [ ] B) The woman should have planned her trip better
- [x] C) Small acts of kindness can create unexpected solidarity among strangers <!-- feedback: Correct. The driver breaks routine, others accept the delay, suggesting common humanity transcending efficiency -->
- [ ] D) Public transportation in Bogotá is inefficient <!-- feedback: The text actually shows efficiency being overridden by compassion, not that the system is broken -->

### Explicación Pedagógica
La palabra clave es "unexpected"—el autor destaca que este comportamiento fue inusual. Los pasajeros sin quejas y el conductor superando la rutina transmiten un mensaje sobre lo que es posible cuando las personas priorizan la humanidad sobre la eficiencia. Los distractores capturan solo detalles superficiales.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-ING-11-P2-reading-inferential-124-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Infiere información implícita en textos leídos.
**Context:** Cambio climático en los Andes colombianos

### Enunciado

**Read the following text:**

"Don José remembers when the snow-capped peaks of the Cocuy were visible from his village year-round. Now, he says, "You only see them in December." The páramos specialists confirm his observation: the frozen areas have retreated three kilometers in thirty years. Tourism has increased as the "unique scenery" draws visitors."

**What is the most critical contradiction presented in this passage?**

- [x] A) The phenomenon that attracts tourists is simultaneously being destroyed by the same visitation <!-- feedback: Correct. The irony lies in tourists coming to see something that disappears because of factors including increased human activity -->
- [ ] B) Don José's memory is unreliable due to his age
- [ ] C) The specialists are not doing their jobs correctly
- [ ] D) Tourism should be banned immediately in the Sierra Nevada del Cocuy <!-- feedback: The text doesn't make this claim; it presents a complex situation, not a direct policy recommendation -->

### Explicación Pedagógica
Esta pregunta evalúa la capacidad de identificar ironía sistémica. El texto presenta un ciclo destructivo sin decirlo explícitamente. Los distractores (B, C) atribuyen blame simple, mientras (D) impone una conclusión moral que el autor no hace. La respuesta correcta requiere evaluar la estructura completa del argumento.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-ING-11-P2-reading-inferential-124-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Evalúa textos inferiendo significados culturales y contextuales.
**Context:** Desigualdad social en Pereira

### Enunciado

**Read the following text:**

"Two girls—one in a private school uniform, one in worn sandals—stood at the same bus stop. The first scrolled on a smartphone while the second watched the chickens on the sidewalk. When the bus came, they sat together and immediately started laughing at the same joke on the driver's radio."

**What critical observation about Colombian society does this moment suggest?**

- [ ] A) Public transportation is unsafe for children
- [x] B) Childhood connections can transcend class divisions, even if temporarily <!-- feedback: Correct. The contrast establishes difference, but the shared laughter shows children's natural ability to connect beyond economic labels -->
- [ ] C) The girl with the smartphone should give it to the other girl
- [ ] D) Private schools are superior to public education <!-- feedback: The text doesn't make this claim; the joke's effect is identical regardless of school type -->

### Explicación Pedagógica
El texto construye un contraste inicial para luego resolverlo en un momento de igualdad absoluta (misma risa). Esto presenta una crítica sutil de cómo la sociedad adulta etiqueta a los niños por su origen económico. Los distractores ofrecen soluciones moralistas (C) o declaraciones definitivas (D) que el texto no hace.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-ING-11-P2-reading-inferential-124-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Infiere información implícita en textos leídos.
**Context:** Violencia y paz en Medellín

### Enunciado

**Read the following text:**

"The murals on the Comuna 13 walls show two different versions of the neighborhood's past. One series depicts armed groups. Another shows children playing soccer on the same streets where violence once ruled. "We paint both," the community artist explained, "because if we forget, we might repeat.""

**What does the artist's statement imply about collective memory?**

- [ ] A) Remembering causes only pain and should be avoided
- [x] B) Honest remembrance of suffering is necessary to prevent its return <!-- feedback: Correct. The artist specifically links remembering to prevention; this is a nuanced position beyond simple trauma or nostalgia -->
- [ ] C) Art should only show positive images of difficult neighborhoods
- [ ] D) Violence in Comuna 13 has completely disappeared <!-- feedback: The text uses "once" as a conditional marker, not a definitive claim about the present -->

### Explicación Pedagógica
La frase "if we forget, we might repeat" es la clave inferencial. El artista aboga por una memoria activa que funcione como advertencia, no por una memoria que cause parálisis ni por una que idealice. Los distractores representan posiciones extremas que el texto no apoya.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-ING-11-P2-reading-inferential-124-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Evalúa textos inferiendo significados culturales y contextuales.
**Context:** Identidad indígena en la Sierra Nevada de Santa Marta

### Enunciado

**Read the following text:**

"When the young Wiwa man was offered a scholarship to study engineering in Bogotá, his grandmother brought him to the lagoon. "We don't leave," she told him, placing earth from the sacred place in his palm. He went to the city. He called every week for three months. Then the calls stopped."

**What do the stopped calls most likely indicate?**

- [ ] A) He failed his courses and was ashamed
- [ ] B) He got a better phone plan
- [x] C) He is being pulled back into the cultural world he was raised in <!-- feedback: Correct. The text establishes the grandmother's ritual and his initial dutiful contact, suggesting his return to traditional values as he disconnects -->
- [ ] D) He died or had a serious accident <!-- feedback: This is an extreme assumption not supported by the text's gentle, gradual tone -->

### Explicación Pedagógica
El patrón de llamadas decrecientes, combinado con el símbolo de la tierra sagrada, sugiere una reintegración gradual en la vida tradicional. El texto ofrece closure sin tragedia, enfatizando elección cultural. Los distractores (A, B, D) introducen drama o tecnología que ignoran el contexto cultural del texto.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-ING-11-P2-reading-inferential-124-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Evalúa textos inferiendo significados culturales y contextuales.
**Context:** Tecnología en zonas rurales de Huila

### Enunciado

**Read the following text:**

"The internet signal arrived in Pitalito last year. Now three women in their sixties sit outside the communal hall every afternoon, video-calling grandchildren in Spain and the United States. "It's like they're here," says one, tilting her phone to catch the afternoon light. The young operator who installed the antenna watches from across the plaza."

**What does the young operator's silent observation most likely reveal?**

- [ ] A) He is bored and has nothing else to do
- [x] B) He feels satisfaction seeing his work create human connection <!-- feedback: Correct. The placement "across the plaza" suggests he wants to observe but not intrude; his silence is contemplative, not indifferent -->
- [ ] C) He is worried the women will have problems with the technology
- [ ] D) He is waiting for them to pay for the installation <!-- feedback: Nothing in the text suggests a financial transaction; the installation seems completed -->

### Explicación Pedagógica
La escena presenta al operador como testigo silencioso de un impacto humano que trasciende lo técnico. Su distancia física ("across the plaza") sugiere que respeta el momento privado. Los distractores ignoran la intención narrativa del autor de mostrar satisfacción profesional por impacto social.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-ING-11-P2-reading-inferential-124-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Infiere información implícita en textos leídos.
**Context:** Economía informal en Santa Marta

### Enunciado

**Read the following text:**

"The man selling agua de panela on the beach lowered his prices when he noticed the foreign tourists photographing his pot instead of ordering. "Maybe they like the old way," he thought. He started displaying the copper pot more prominently, adding flowers around it. Business improved slightly. His neighbor, who used a plastic container, shook his head."

**What does the neighbor's reaction most likely symbolize?**

- [x] A) Resistance to change and skepticism toward innovation based on cultural identity <!-- feedback: Correct. The neighbor's "old way" (plastic container) is implicitly rejected by the successful man, making the neighbor a symbol of those who refuse to evolve -->
- [ ] B) The neighbor is jealous and wants the same customers
- [ ] C) The neighbor disagrees with the flowers for religious reasons
- [ ] D) Traditional methods will always be more profitable than modern ones <!-- feedback: The text shows only "slight improvement," not that tradition is more profitable -->

### Explicación Pedagógica
El contraste entre ambos vendedores representa un comentario social más amplio sobre la modernización. El vecino shake su cabeza porque el éxito del protagonista desafía su worldview. Los distractores personalizan un conflicto que el texto presenta como simbólico (A aborda el conflicto cultural sistémico).

---

## Question 17 (Variant Basic - Difficulty D9)

**ID:** `CO-ING-11-P2-reading-inferential-124-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Evalúa textos inferyendo significados culturales y contextuales.
**Context:** Conflicto armado en el Catatumbo

### Enunciado

**Read the following text:**

"After the peace agreement, Carmen returned to her farm in Tibú. The land had been abandoned for eight years. "The coffee plants grew wild, but they still produced," she said. She hired her former neighbors, now without work after the guerrilla group disbanded. Together, they rebuilt the processing station. In the first year, they produced half of what the farm once did. In the second year, they matched it."

**What does the narrative arc suggest about post-conflict recovery?**

- [ ] A) Economic recovery is immediate after peace agreements
- [x] B) Community-based recovery requires time but builds resilience through shared effort <!-- feedback: Correct. The text shows gradual improvement tied to collective labor, not individual success; the narrative spans years -->
- [ ] C) Farms abandoned during conflict are permanently damaged
- [ ] D) Former combatants cannot be productive members of society <!-- feedback: The text explicitly shows the opposite - former guerrillas become productive workers -->

### Explicación Pedagógica
El arco narrativo de dos años con mejora gradual destaca que la recuperación genuina toma tiempo.
