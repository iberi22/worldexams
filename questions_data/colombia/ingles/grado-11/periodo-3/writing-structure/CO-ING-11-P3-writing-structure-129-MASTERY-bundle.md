<think>
The user wants me to generate exactly 20 multiple choice questions in ICFES Saber 11 format for English (writing-structure), grade 11, period 3. The output must be a complete markdown file with YAML frontmatter and 20 questions following the specified format.

Let me create this carefully:

1. I need to follow the exact format with the YAML frontmatter
2. Questions must be progressive difficulty: D3-D4 (1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
3. Each question needs: ID, Bloom level, ICFES competencia, Context, Enunciado, 4 options (A-D), one correct marked with [x], Explanations
4. Distractors must be plausible Colombian student errors
5. No "all of the above" or "none of the above"
6. Context should be modern Colombian relevant

Let me generate 20 questions covering writing-structure topics like:
- Paragraph structure
- Topic sentences
- Supporting details
- Cohesion and coherence
- Transitions
- Essay structure (introduction, body, conclusion)
- Subject-verb agreement
- Word order
- Punctuation
- Sentence types
- Verb tenses consistency
- Pronoun reference
- Conjunctions usage
- Parallel structure
- Modifier placement

I'll create varied contexts relevant to Colombian students:
- Academic situations
- Social issues in Colombia
- Environmental topics
- Technology
- Cultural topics

Let me generate the questions now.

</think>

```yaml
---
id: "CO-ING-11-P3-writing-structure-129-MASTERY"
country: "colombia"
grado: 11
asignatura: "ingles"
tema: "writing-structure"
periodo: 3
protocol_version: "5.1"
bundle_size: 20
bundle_index: 129
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T22:36:53.100111"
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

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comprensión básica de estructuras textuales
**Context:** Academic writing basics

### Enunciado
Which of the following is the BEST way to begin a paragraph about the importance of English in Colombian higher education?

### Options
- [ ] A) "English is very important and everybody knows it."
- [ ] B) "In recent years, the demand for English proficiency in Colombian universities has increased significantly."
- [x] C) "English plays a crucial role in shaping the academic opportunities available to Colombian students in the global marketplace." <!-- feedback: This is a strong topic sentence that introduces a clear main idea with specific context about Colombia. -->
- [ ] D) "Many people think English is important for different reasons." <!-- feedback: This is too vague and lacks specificity. -->

### Explicación Pedagógica
The correct answer is C because a good topic sentence should present a clear, specific main idea that the paragraph will develop. Option A is too informal, Option B could work but is less developed, and Option D is vague and doesn't provide a clear direction for the paragraph. Colombian students often struggle with writing specific topic sentences that give clear direction to their paragraphs.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Identificación de ideas principales y de apoyo
**Context:** Environmental issues in Colombia

### Enunciado
Read the following paragraph and identify the topic sentence.

"Deforestation in the Amazon has reached alarming rates. According to recent reports, Colombia lost over 100,000 hectares of forest in 2024. The consequences include loss of biodiversity and increased carbon emissions. Local communities are also affected as their livelihoods depend on forest resources."

### Options
- [ ] A) "According to recent reports, Colombia lost over 100,000 hectares of forest in 2024."
- [ ] B) "Local communities are also affected as their livelihoods depend on forest resources."
- [x] C) "Deforestation in the Amazon has reached alarming rates." <!-- feedback: This is the topic sentence because it states the main idea that all other sentences support with specific details. -->
- [ ] D) "The consequences include loss of biodiversity and increased carbon emissions." <!-- feedback: This is a supporting detail, not the main idea of the paragraph. -->

### Explicación Pedagógica
The topic sentence presents the main idea that the entire paragraph discusses. Option C introduces the main topic (deforestation in the Amazon) and the other sentences provide supporting details like statistics, consequences, and community impact. Colombian students often confuse supporting details with topic sentences.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Comprensión de coherence y cohesion en textos
**Context:** Technology in Colombian schools

### Enunciado
Which sentence would be the BEST transition to connect these two ideas?

Sentence 1: "Many Colombian schools have implemented technology in classrooms."
Sentence 2: "Student engagement has noticeably improved."

### Options
- [ ] A) "Technology is important."
- [x] B) "As a result of this integration, student engagement has noticeably improved." <!-- feedback: This transition clearly shows a cause-and-effect relationship between the two sentences. -->
- [ ] C) "Students use computers."
- [ ] D) "Schools are different now." <!-- feedback: These options are too vague and don't logically connect the two ideas. -->

### Explicación Pedagógica
Transitions help readers understand how ideas are connected. Option B uses "As a result of this integration" to clearly show the logical relationship between implementing technology and improved student engagement. Students often struggle with using appropriate transitional words that accurately reflect the relationship between ideas.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Aplicación de estructuras gramaticales en contexto
**Context:** University application essay

### Enunciado
Choose the CORRECT sentence structure to complete the following paragraph:

"Getting into university in Colombia requires careful preparation. __________, students must research their options thoroughly."

### Options
- [ ] A) "In the other hand"
- [x] B) "First of all" <!-- feedback: "First of all" is the correct transition to begin a sequence of steps or ideas. -->
- [ ] C) "However" <!-- feedback: "However" shows contrast, not sequence, so it doesn't fit here. -->
- [ ] D) "In conclusion" <!-- feedback: "In conclusion" is used at the end of a text, not to begin a sequence. -->

### Explicación Pedagógica
Sequence transitions like "First of all" help organize ideas in chronological or logical order. This is a common area of confusion for Colombian students who often mix up transition types. "However" is a contrast transition, and "In conclusion" is a concluding transition.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Producción de textos con coherencia y cohesion
**Context:** Social media influence

### Enunciado
Which option BEST maintains parallel structure in the following sentence?

"Studying at a Colombian university requires discipline, time management, and __________."

### Options
- [ ] A) "to be organized"
- [x] B) "organizational skills" <!-- feedback: Parallel structure requires matching grammatical forms; "discipline, time management, and organizational skills" are all nouns. -->
- [ ] C) "you need to be organized"
- [ ] D) "being organized"

### Explicación Pedagógica
Parallel structure requires using the same grammatical form for all items in a series. The sentence lists three nouns: discipline, time management, and organizational skills. Students often make the mistake of mixing verb forms (option A and C) or different grammatical structures, breaking the parallel structure.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Estructuración de párrafos con coherencia
**Context:** Tourism in Colombia

### Enunciado
Which sentence contains a modifier error (dangling or misplaced modifier)?

### Options
- [ ] A) "Walking through the market, the colors of the fresh fruits were stunning."
- [x] B) "Having studied English for years, the TOEFL exam was easy to pass." <!-- feedback: The modifier "Having studied English for years" logically should modify the person, not the TOEFL exam. This is a dangling modifier. -->
- [ ] C) "The Colombian coffee is famous worldwide for its excellent quality."
- [ ] D) "Students who study hard often achieve better results on the ICFES test."

### Explicación Pedagógica
Dangling modifiers occur when the subject of the modifier is not clearly stated in the main clause. In option B, "Having studied English for years" should modify the student, not the TOEFL exam. Colombian students often struggle with recognizing this error because the grammatical structure sounds natural but the logic is flawed.

---

## Question 7 (Variant Basic - Difficulty D6)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Análisis de errores comunes en escritura
**Context:** Academic writing

### Enunciado
Which paragraph is BEST organized according to the general-to-specific pattern?

### Options
- [ ] A) "Bogotá has many museums. The Gold Museum is one of them. Museums are important for education."
- [x] B) "Cultural tourism has grown significantly in Colombia. Bogotá alone has over 70 museums, including the famous Museo del Oro, which attracts thousands of visitors annually. This growth reflects a broader trend in Latin America." <!-- feedback: This starts with a general statement and provides increasingly specific details, then ends with a broader context. -->
- [ ] C) "Bogotá has over 70 museums. Cultural tourism is growing. This is important."
- [ ] D) "This is important because cultural tourism is growing in Colombia and Bogotá has many museums."

### Explicación Pedagógica
The general-to-specific pattern starts with a broad statement and narrows down to specific details and examples. Option B clearly demonstrates this pattern: general claim → specific city and numbers → specific museum → broader regional trend. Students often reverse this pattern or mix up the organization.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Evaluación de coherencia textual
**Context:** Public transportation in Colombian cities

### Enunciado
Which transition BEST indicates a cause-and-effect relationship?

### Options
- [ ] A) "Furthermore"
- [ ] B) "Similarly"
- [x] C) "Consequently" <!-- feedback: "Consequently" indicates that something is a result or consequence of a previous action or situation. -->
- [ ] D) "Meanwhile"

### Explicación Pedagógica
Different transitions serve different purposes: "Furthermore" adds information, "Similarly" compares, "Consequently" shows cause and effect, and "Meanwhile" indicates time relation. Colombian students often confuse these functions, using additive transitions when causal ones are needed, or vice versa.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Análisis de estructuras textuales
**Context:** Climate change effects

### Enunciado
Identify the sentence that uses pronouns correctly to avoid ambiguity.

### Options
- [ ] A) "When Maria talked to her professor, she gave her extra time to complete the assignment."
- [x] B) "When Maria talked to her professor, the professor gave her extra time to complete the assignment." <!-- feedback: This sentence uses noun references instead of pronouns to eliminate ambiguity about who gave whom extra time. -->
- [ ] C) "When Maria talked to her professor, she gave her extra time and the assignment."
- [ ] D) "She gave her extra time when Maria talked to her professor about the assignment."

### Explicación Pedagógica
Pronoun reference ambiguity occurs when it's unclear what a pronoun refers to. In option A and C, it's unclear whether "she" refers to Maria or the professor. Option B replaces ambiguous pronouns with clear noun references. This is a common writing issue that affects clarity in student essays.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v10`
**Bloom:** Evaluate
**ICFES:** Evaluación de calidad textual
**Context:** Remote work trends

### Enunciado
Which option contains a run-on sentence that needs to be corrected?

### Options
- [ ] A) "Remote work has become popular in Colombia; many companies now offer flexible schedules."
- [x] B) "Many professionals enjoy remote work they can work from home and save commute time." <!-- feedback: This is a run-on sentence (comma splice) that joins two complete sentences with just a comma. -->
- [ ] C) "Remote work has both advantages and disadvantages."
- [ ] D) "Working from home allows Colombian professionals to save time and money."

### Explicación Pedagógica
A run-on sentence occurs when two independent clauses are joined without proper punctuation or conjunction. Option B is a comma splice error where two complete sentences are joined only by a comma. This is one of the most common writing errors among Colombian students, who often don't recognize when they have created two complete sentences.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Análisis critico de estructuras textuales
**Context:** Biodiversity conservation

### Enunciado
Which sentence BEST demonstrates the use of subordination to show the relationship between ideas?

### Options
- [ ] A) "Colombia has many species; the jaguar is one of them."
- [ ] B) "Colombia has many species, and the jaguar is one of them."
- [x] C) "Although Colombia has over 10% of the world's biodiversity, many species remain unprotected." <!-- feedback: This uses a subordinating conjunction to show a contrast/ concession relationship between two ideas. -->
- [ ] D) "The jaguar is a species, and Colombia has many species."

### Explicación Pedagógica
Subordination uses conjunctions like "although," "because," "when" to show that one idea is less important than another. Option C uses "although" to create a complex sentence that shows a contrast between biodiversity abundance and protection gaps. Students often overuse coordination (and, but) and underuse subordination.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Evaluación de organización textual
**Context:** Higher education access

### Enunciado
In an essay arguing that university should be free in Colombia, which counterargument would be MOST effective to address?

### Options
- [ ] A) "Free university is a bad idea."
- [x] B) "While free education would increase access, opponents argue that the quality could decline due to budget constraints, which the government must address through strategic investment." <!-- feedback: This addresses the strongest counterargument about quality, showing understanding of multiple perspectives while maintaining the writer's position. -->
- [ ] C) "Some people disagree."
- [ ] D) "Not everyone wants free university."

### Explicación Pedagógica
Effective arguments acknowledge opposing views and address them. Option B presents a nuanced counterargument about quality concerns and suggests a solution, demonstrating critical thinking. Students often either ignore counterarguments or present weak versions that don't truly address the opposition's concerns.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v13`
**Bloom:** Create
**ICFES:** Producción de textos argumentativos
**Context:** Water pollution in Colombian rivers

### Enunciado
Which is the BEST thesis statement for a cause-and-effect essay about water pollution in the Magdalena River?

### Options
- [ ] A) "Water pollution is bad."
- [x] B) "Industrial waste from textile factories in Bogotá has contaminated the Magdalena River, causing a decline in fish populations that affects both local fishermen and the broader Colombian food supply." <!-- feedback: This thesis clearly states a cause (industrial waste), effects (declining fish populations), and significance (impact on fishermen and food supply). -->
- [ ] C) "The Magdalena River is polluted because of many reasons and affects people."
- [ ] D) "What happened to the fish in the Magdalena River?"

### Explicación Pedagógica
A strong thesis statement for a cause-and-effect essay must clearly identify the specific cause and its specific effects. Option B provides a focused, specific thesis with concrete details about the cause (textile factories), effects (fish population decline), and significance (fishermen, food supply). Students often write vague or overly broad thesis statements.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v14`
**Bloom:** Apply
**ICFES:** Aplicación de estructuras en textos extensos
**Context:** Immigration essay

### Enunciado
Which transition is MOST APPROPRIATE for introducing an example in the following sentence?

"Learning a second language has many cognitive benefits. __________, studies show that bilingual individuals have better memory and problem-solving skills."

### Options
- [ ] A) "In conclusion"
- [x] B) "For instance" <!-- feedback: "For instance" is used to introduce specific examples that support a general statement. -->
- [ ] C) "On the other hand"
- [ ] D) "Therefore"

### Explicación Pedagógica
"For instance" and "for example" are used to introduce specific examples that support a general claim. Option B correctly introduces the studies as evidence. "On the other hand" shows contrast, "Therefore" indicates conclusion, and "In conclusion" is for endings. Students confuse these functions frequently.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v15`
**Bloom:** Analyze
**ICFES:** Análisis de errores en textos extensos
**Context:** Youth employment

### Enunciado
Identify the sentence that contains a subject-verb agreement error.

### Options
- [ ] A) "The number of unemployed young people in Colombia have increased recently."
- [x] B) "Either the government or the employers is responsible for creating new job opportunities." <!-- feedback: When using "either...or," the verb agrees with the noun closest to it. "Employers" is plural, so the verb should be "are." -->
- [ ] C) "Many young professionals are seeking better opportunities abroad."
- [ ] D) "Education and experience are key factors in landing a good job."

### Explicación Pedagógica
Subject-verb agreement with "either...or" or "neither...nor" follows the proximity rule: the verb agrees with the noun closest to it. In option B, "employers" is plural and closer to the verb, so "are" would be correct, not "is." This is a sophisticated grammar point that many students find challenging.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v16`
**Bloom:** Evaluate
**ICFES:** Evaluación de cohesion textual
**Context:** Mental health awareness

### Enunciado
Which paragraph maintains the BEST internal coherence?

### Options
- [ ] A) "Mental health is important. Many people struggle with anxiety. Coffee is popular in Colombia. Students should seek help if they have mental health issues."
- [x] B) "Mental health awareness has grown significantly in Colombian society. Schools are now implementing counseling programs to support students. Additionally, companies are offering mental health days to employees. This cultural shift demonstrates that Colombians are beginning to prioritize psychological well-being." <!-- feedback: All sentences logically connect and support the main idea about mental health awareness, using transitions appropriately. -->
- [ ] C) "Mental health is important but so is physical health. Many Colombians exercise. The weather is nice. Stress affects people."
- [ ] D) "Mental health matters. Mental health matters. Mental health matters."

### Explicación Pedagógica
Internal coherence requires that all sentences logically support and develop the main idea, with appropriate transitions and logical progression. Option B demonstrates excellent coherence with all sentences supporting the topic, using transitions ("Additionally"), and ending with a synthesizing sentence. Option A and C have unrelated information that breaks coherence.

---

## Question 17 (Variant Basic - Difficulty D9)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v17`
**Bloom:** Create
**ICFES:** Producción de textos complejos
**Context:** Sustainable transportation

### Enunciado
Which sentence uses the conditional form MOST APPROPRIATELY to express a hypothetical situation related to Bogota's TransMilenio system?

### Options
- [ ] A) "If Bogota expands the TransMilenio routes, people will use public transportation more."
- [ ] B) "If Bogota expanded the TransMilenio routes, people would use public transportation more." <!-- feedback: This is second conditional (hypothetical), which is appropriate for discussing imaginary or unlikely scenarios about the future. -->
- [ ] C) "If Bogota has expanded the TransMilenio routes, people used public transportation more."
- [ ] D) "If Bogota expands the TransMilenio routes, people used public transportation more."

### Explicación Pedagógica
The second conditional (If + past simple, would + base verb) is used for hypothetical situations that are unlikely or imaginary. Option B correctly uses "expanded" and "would use" to express a hypothetical improvement. Option A uses first conditional for a likely situation, which may or may not be appropriate. Options C and D mix tenses incorrectly.

---

## Question 18 (Variant Basic - Difficulty D9)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v18`
**Bloom:** Evaluate
**ICFES:** Evaluación de textos argumentativos
**Context:** Drug policy debate

### Enunciado
In an argumentative essay about Colombia's drug policy, which sentence presents the MOST balanced perspective?

### Options
- [ ] A) "The war on drugs has completely failed in Colombia."
- [ ] B) "The war on drugs has been completely successful in Colombia."
- [x] C) "While the war on drugs has led to significant violence and displacement, some argue that it has also disrupted major drug trafficking networks, suggesting that a nuanced approach may be more effective." <!-- feedback: This sentence acknowledges multiple perspectives and complexity without taking an extreme position. -->
- [ ] D) "Drug policy is a controversial topic with different opinions."

### Explicación Pedagógica
A balanced argument acknowledges complexity and multiple perspectives while maintaining a clear position. Option C does this by presenting evidence on both sides (violence/displacement vs. disruption of trafficking networks) before suggesting a nuanced approach. Students often take extreme positions that weaken their credibility.

---

## Question 19 (Variant Basic - Difficulty D10)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v19`
**Bloom:** Create
**ICFES:** Producción de textos académicos complejos
**Context:** Digital transformation

### Enunciado
Which option BEST combines these two sentences using relative clauses to create a complex sentence?

Sentence 1: "Colombia is implementing digital transformation policies."
Sentence 2: "These policies aim to close the digital divide in rural areas."

### Options
- [ ] A) "Colombia is implementing digital transformation policies and these policies aim to close the digital divide in rural areas."
- [ ] B) "Colombia is implementing digital transformation policies that aim to close the digital divide in rural areas." <!-- feedback: This correctly uses a defining relative clause ("that aim to...") to combine the two sentences into one complex sentence. -->
- [ ] C) "Digital transformation policies are what Colombia is implementing."
- [ ] D) "Colombia implementing policies; the policies close the digital divide."

### Explicación Pedagógica
Relative clauses allow us to combine ideas and create more sophisticated sentences. Option B uses "that" as a defining relative clause to specify which policies are being discussed. Defining relative clauses (without commas) provide essential information to identify the noun. Students often struggle with when to use defining vs. non-defining relative clauses.

---

## Question 20 (Variant Basic - Difficulty D10)

**ID:** `CO-ING-11-P3-writing-structure-129-MASTERY-v20`
**Bloom:** Create
**ICFES:** Producción de textos argumentativos complejos
**Context:** Education reform

### Enunciado
Which is the MOST effective conclusion for an essay arguing that Colombian universities should require English proficiency for graduation?

### Options
- [ ] A) "So, in conclusion, English is important for graduation because it's useful and universities should require it."
- [x] B) "Therefore, requiring English proficiency for graduation would better prepare Colombian graduates for the global job market while aligning Colombia with international educational standards, ultimately strengthening the country's economic competitiveness in the long term." <!-- feedback: This conclusion effectively summarizes the main arguments, explains the significance, and looks to the future by connecting English proficiency to broader economic benefits. -->
- [ ] C) "English is important and universities should require it. That's my opinion."
- [ ] D) "In conclusion, English is required for graduation in many countries, so Colombia should do the same."

### Explicación Pedagógica
A strong conclusion should summarize main points, reinforce the thesis, and explain the broader significance without introducing new information. Option B does this effectively by restating the main claim, connecting it to future benefits (global job market, economic competitiveness), and showing how this aligns with international standards. Students often write weak conclusions that merely restate without explaining significance.
```
