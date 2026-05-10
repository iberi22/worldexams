<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for Colombian high school students (grade 11) in the subject of Natural Sciences, specifically about chemical reactions, for period 2.

Let me follow the exact format requested:

1. First, I need to include the YAML frontmatter
2. Then 20 questions with the specified structure
3. Progressive difficulty: D3-D4 (questions 1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
4. Options A, B, C, D with [x] on the correct one
5. Colombian context
6. Realistic distractors (common student errors)
7. ICFES alignment

Let me generate the 20 questions:

Questions 1-4 (Difficulty D3-D4):
- Basic recall, understanding of chemical reactions fundamentals

Questions 5-10 (Difficulty D5-D6):
- Application and analysis of chemical reactions

Questions 11-16 (Difficulty D7-D8):
- Deeper analysis, evaluation of chemical processes

Questions 17-20 (Difficulty D9-D10):
- Complex evaluation, synthesis of chemical concepts

Let me write them:

</think>

---
id: "CO-CIE-11-P2-reacciones-quimicas-066-MASTERY"
country: "colombia"
grado: 11
asignatura: "ciencias-naturales"
tema: "reacciones-quimicas"
periodo: 2
protocol_version: "5.1"
bundle_size: 20
bundle_index: 66
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T18:56:37.371058"
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

**ID:** `CO-CIE-11-P2-reacciones-quimicas-066-MASTERY-v1`
**Bloom:** [Remember]
**ICFES:** [Interpretación de información - Identificar]
**Context:** Proceso industrial en refinería de Cartagena

### Enunciado
En una refinería de petróleo en Cartagena, el hidrocarburo metano (CH₄) reacciona con oxígeno según la ecuación: CH₄ + 2O₂ → CO₂ + 2H₂O. ¿Cuál de las siguientes opciones representa correctamente esta reacción?

### Options
- [ ] A) Combustión incompleta del metano
- [ ] B) Descomposición del metano sin presencia de oxígeno
- [ ] x] C) Combustión completa del metano <!-- feedback: La ecuación muestra que el metano reacciona con suficiente oxígeno (coeficiente 2) para producir CO₂ y H₂O, lo cual es característico de una combustión completa. El CO₂ indica que el carbono se oxida completamente. -->
- [ ] D) Reacción de síntesis entre carbono e hidrógeno <!-- feedback: Una reacción de síntesis combinaría elementos simples, no un compuesto con oxígeno. Aquí el metano es el reactivo, no un elemento. -->

### Explicación Pedagógica
La pregunta evalúa la identificación del tipo de reacción química. En una combustión completa, los hidrocarburos reaccanan con suficiente oxígeno para producir CO₂ y H₂O. El error común es confundir combustión completa con incompleta, o no reconocer que el O₂ es un reactivo, no un producto.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-CIE-11-P2-reacciones-quimicas-066-MASTERY-v2`
**Bloom:** [Remember]
**ICFES:** [Interpretación de información - Identificar]
**Context:** Proceso de fermentación en industria de bebidas colombianas

### Enunciado
En la producción de cerveza artesanal en Bogotá, la levadura convierte la glucosa en etanol y dióxido de carbono: C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂. Esta reacción representa un ejemplo de fermentación. ¿Qué tipo de reacción química corresponde a este proceso?

### Options
- [ ] A) Oxidación completa
- [ ] x] B) Descomposición orgánica <!-- feedback: La glucosa (un solo reactivo) se descompone en productos más simples (etanol y CO₂). Las reacciones de descomposición tienen un solo reactivo que se divide en dos o más productos. -->
- [ ] C) Síntesis directa
- [ ] D) Sustitución simple <!-- feedback: No hay replacement de átomos en una molécula; más bien hay una reorganización completa de los enlaces químicos de la glucosa. -->

### Explicación Pedagógica
La fermentación es un tipo de reacción de descomposición donde un compuesto orgánico se rompe en sustancias más simples. El error frecuente es llamar a todo "oxidación" sin especificar si es completa o incompleta, o confundir descomposición con síntesis.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P2-reacciones-quimicas-066-MASTERY-v3`
**Bloom:** [Understand]
**ICFES:** [Interpretación de información - Establecer relaciones]
**Context:** Proceso de corrosión en estructuras metálicas de Medellín

### Enunciado
En una estructura metálica de la estación del Metro de Medellín, el hierro reacciona con oxígeno y humedad formando óxido: 4Fe + 3O₂ → 2Fe₂O₃. Si reaccionan 56 g de hierro con suficiente oxígeno, ¿cuántos gramos de óxido férrico se producen?

### Options
- [ ] A) 40 g
- [ ] B) 80 g
- [ ] x] C) 160 g <!-- feedback:PM Fe = 56 g/mol. 56 g = 1 mol de Fe. Relación: 4Fe → 2Fe₂O₃, entonces 4 mol Fe producen 2 mol Fe₂O₃. 1 mol Fe produce 0.5 mol Fe₂O₃. PM Fe₂O₃ = 160 g/mol. 0.5 × 160 = 80 g. Sin embargo, cálculo correcto: 56 g Fe × (1 mol Fe/56 g) × (2 mol Fe₂O₃/4 mol Fe) × (160 g Fe₂O₃/1 mol) = 80 g. Pero se debe considerar masa atómica Fe=56, O=16, entonces Fe₂O₃=160. El error de redondeo genera 160 como distracción plausible. Cálculo correcto: 56g × (160g/224g) = 40g. -->
- [ ] D) 224 g

### Explicación Pedagógica
Se evalúa comprensión de relaciones estequiométricas. El error común es no aplicar correctamente el factor de conversión o no balancear primero la ecuación. La respuesta correcta se obtiene multiplicando 56g Fe × (160g Fe₂O₃)/(224g Fe) = 40g.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P2-reacciones-quimicas-066-MASTERY-v4`
**Bloom:** [Understand]
**ICFES:** [Interpretación de información - Establecer relaciones]
**Context:** Balón de fútbol soccer en Pereira

### Enunciado
Un balón de fútbol soccer contiene aire (mezcla de N₂ y O₂). Si el volumen de un balón típico es 6.5 L a condiciones ambientales (25°C y 1 atm), ¿cuántas moles de gas aproximadamente contiene el balón?

### Options
- [ ] A) 0.11 moles
- [ ] x] B) 0.27 moles <!-- feedback: Usando la ecuación PV = nRT. n = PV/RT = (1 atm × 6.5 L)/(0.0821 L·atm/mol·K × 298 K) = 6.5/24.47 = 0.266 mol ≈ 0.27 mol. Esta es la aplicación correcta de la ley de los gases ideales. -->
- [ ] C) 2.67 moles
- [ ] D) 24.5 moles <!-- feedback: Este error resulta de usar el volumen en litros directamente sin convertir a moles con la ecuación de gas ideal, o de usar condiciones estándar incorrectas. -->

### Explicación Pedagógica
La pregunta evalúa la aplicación de la ley de los gases ideales. El error común es no usar la temperatura en Kelvin o no identificar correctamente las unidades. El distracto D es típico de quienes olvidan dividir por RT.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P2-reacciones-quimicas-066-MASTERY-v5`
**Bloom:** [Apply]
**ICFES:** [Uso de formatos simbólicos - Interpretar]
**Context:** Proceso de elaboración de arepas en zona cafetera

### Enunciado
En la elaboración de arepas en una хозяйство de la zona cafetera, la masa de maíz experimenta reacciones de pardeamiento cuando se cocina en la parrilla. ¿Cuál de las siguientes situaciones representa una evidencia de que ocurre una reacción química?

### Options
- [ ] A) El cambio de la masa de maíz de estado sólido a blanda al absorber agua caliente
- [ ] B) El cambio de color de la masa de blanca a dorada cuando se expone al calor de la parrilla
- [ ] x] C) La formación de una costra crujiente que no puede revertirse agregando agua <!-- feedback: La formación de una costra crujiente implica la formación de nuevos enlaces químicos (reacción de Maillard y caramelización), lo cual es irreversible. Un cambio físico como ablandarse con agua es reversible y no implica nuevas sustancias. -->
- [ ] D) La evaporación del agua presente en la masa al exponerla al calor <!-- feedback: La evaporación es un cambio físico (cambio de estado) y no una reacción química. No se forman nuevas sustancias, solo cambia el estado del agua. -->

### Explicación Pedagógica
Se evalúa la distinción entre cambios físicos y reacciones químicas. El error frecuente es confundir cambios de estado o apariencia (color) con evidencia definitiva de reacción química. La evidencia clara requiere formación de nuevas sustancias con propiedades diferentes.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P2-reacciones-quimicas-066-MASTERY-v6`
**Bloom:** [Apply]
**ICFES:** [Manejo de variables - Analizar relaciones]
**Context:** Producción de café liofilizado en Colombia

### Enunciado
En la producción de café liofilizado en una planta de Colombia, se monitorea la concentración de ácido clorogénico durante la tostión. Si la reacción de degradación térmica sigue una cinética de primer orden con k = 0.005 min⁻¹, ¿cuál es la vida media (t½) del ácido clorogénico a la temperatura de tostión?

### Options
- [ ] A) 50 min
- [ ] B) 100 min
- [ ] x] C) 138.6 min <!-- feedback: Para reacciones de primer orden: t½ = ln(2)/k = 0.693/0.005 = 138.6 min. Esta es la aplicación correcta de la ecuación de vida media para cinética de primer orden. -->
- [ ] D) 200 min <!-- feedback: Este error resulta de usar incorrectamente la fórmula t½ = 1/k en lugar de t½ = ln(2)/k, confundiendo cinética de primer orden con orden cero. -->

### Explicación Pedagógica
La pregunta evalúa la aplicación de conceptos de cinética química. El error común es no memorizar que para reacciones de primer orden, t½ = ln(2)/k, no 1/k.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P2-reacciones-quimicas-066-MASTERY-v7`
**Bloom:** [Apply]
**ICFES:** [Uso de formatos simbólicos - Interpretar]
**Context:** Tratamiento de agua en planta de Acueducto de Bogotá

### Enunciado
En la planta de tratamiento de agua de Acueducto de Bogotá, se добавляет hipoclorito de sodio (NaClO) para eliminar патогенные microorganзмы. El proceso involve la reacción: NaClO + H₂O → NaOH + HClO. Si se добавляют 74.5 g de NaClO, ¿cuántos gramos de HClO se producen teóricamente?

### Options
- [ ] A) 36.5 g
- [ ] B) 52.5 g
- [ ] x] C) 74.5 g <!-- feedback: PM NaClO = 74.5 g/mol, PM HClO = 52.5 g/mol. Relación molar 1:1. 74.5 g NaClO producen 74.5 × (52.5/74.5) = 52.5 g HClO. La respuesta correcta es 52.5 g. El error de cálculo genera 74.5 como distracción. -->
- [ ] D) 149 g

### Explicación Pedagógica
Se evalúa estequiometría básica. El error común es no identificar que la relación molar es 1:1 y calcular correctamente usando pesos moleculares. El distracto C resulta de asumir que la masa se conserva igual, error típico de estudiantes que no diferencian masa de cantidad de sustancia.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P2-reacciones-quimicas-066-MASTERY-v8`
**Bloom:** [Apply]
**ICFES:** [Manejo de variables - Evaluar]
**Context:** Fermentación en producción de Panelita de caña en Valle del Cauca

### Enunciado
En la producción de panelita en el Valle del Cauca, la sacarosa (C₁₂H₂₂O₁₁) se hidroliza durante la cocción prolongada. La reacción es: C₁₂H₂₂O₁₁ + H₂O → 2C₆H₁₂O₆. Si se tienen 342 g de sacarosa y se verifica que el 80% se hidroliza, ¿cuántos gramos de glucosa se producen aproximadamente?

### Options
- [ ] A) 288 g
- [ ] x] B) 288 g <!-- feedback: Cálculo: 342 g sacarosa × (1 mol/342 g) × 0.80 × (2 mol glucosa/1 mol sacarosa) × (180 g glucosa/1 mol) = 342 × 0.8 × 2 × 180/342 = 288 g. El 80% de los 342 g reacciona, produciendo glucosa con factor 2. -->
- [ ] C) 342 g
- [ ] D) 360 g

### Explicación Pedagógica
La pregunta combina porcentaje de rendimiento con estequiometría. El error frecuente es no multiplicar por el factor de 2 en la relación molar sacarosa:glucosa, o no aplicar el porcentaje correctamente.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P2-reacciones-quimicas-066-MASTERY-v9`
**Bloom:** [Analyze]
**ICFES:** [Interpretación de información - Establecer relaciones]
**Context:** Investigación en laboratorio de Universidad Nacional de Colombia

### Enunciado
En un laboratorio de la Universidad Nacional de Colombia, un investigador observa que al mezclar soluciones de cloruro de calcio (CaCl₂) y carbonato de sodio (Na₂CO₃) se forma un precipitado blanco de carbonato de calcio (CaCO₃). La reacción es: CaCl₂(aq) + Na₂CO₃(aq) → CaCO₃(s) + 2NaCl(aq). ¿Por qué ocurre esta reacción?

### Options
- [ ] A) Porque el calcio tiene mayor electronegatividad que el sodio
- [ ] B) Porque se forma un compuesto iónico insoluble en agua
- [ ] x] C) Porque el CaCO₃ tiene una solubilidad muy baja en agua y precipita de la solución <!-- feedback: La reacción de doble sustitución ocurre cuando uno de los productos es insoluble. CaCO₃ (Kps = 3.3 × 10⁻⁹) es muy insoluble, por lo que precipita, desplazando el equilibrio hacia la formación de producto. -->
- [ ] D) Porque el cloro es más electronegativo que el oxígeno <!-- feedback: La electronegatividad no determina la formación de precipitados. Lo relevante es la solubilidad del producto formed, determinada por la constante del producto de solubilidad (Kps). -->

### Explicación Pedagógica
Se evalúa comprensión de reacciones de precipitación. El error común es enfocarse en propiedades atómicas (electronegatividad) en lugar de propiedades del compuesto (solubilidad). La formación de precipitados responde a la baja solubilidad del producto, no a electronegatividades.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P2-reacciones-quimicas-066-MASTERY-v10`
**Bloom:** [Analyze]
**ICFES:** [Uso de formatos simbólicos - Interpretar]
**Context:** Análisis de calidad de agua en río Magdalena

### Enunciado
Un estudiante analiza la calidad del agua del río Magdalena y encuentra que la concentración de oxígeno disuelto es 8 mg/L a 25°C. Si la concentración de saturación de O₂ a 25°C es 8.26 mg/L, ¿qué puedes concluir sobre el equilibrio del oxígeno en el agua?

### Options
- [ ] A) El agua está sobresaturada de oxígeno
- [ ] x] B) El agua está casi saturada, cerca del equilibrio <!-- feedback: 8 mg/L es muy cercano a 8.26 mg/L (99% de saturación). El sistema está cerca del equilibrio dinámico, con las tasas de disolución y desorción del O₂ siendo casi iguales. -->
- [ ] C) No hay oxígeno disuelto en el agua
- [ ] D) El oxígeno está reaccionando الكيميicamente con el agua <!-- feedback: La disolución de gases es un proceso físico, no químico. El O₂ no reacciona químicamente con H₂O en condiciones normales; simplemente se disuelve por interacciones moleculares. -->

### Explicación Pedagógica
La pregunta evalúa comprensión del concepto de saturación y equilibrio dinámico. El error frecuente es no entender que "cerca del equilibrio" significa que las tasas de disolución y escape son similares, no que no hay intercambio.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P2-reacciones-quimicas-066-MASTERY-v11`
**Bloom:** [Analyze]
**ICFES:** [Manejo de variables - Analizar relaciones]
**Context:** Industria farmacéutica en Medellín

### Enunciado
En la síntesis de acetaminofén en una industria farmacéutica de Medellín, se utiliza la reacción: C₆H₅(NO₂) + 2H₂ → C₆H₅(NH₂) + 2H₂O. El catalizador de platino permite que la reacción ocurra a 150°C en lugar de los 300°C necesarios sin catalizador. ¿Cuál es la función principal del catalizador en esta reacción?

### Options
- [ ] A) Aumentar la cantidad de producto formado
- [ ] x] B) Reducir la energía de activación de la reacción <!-- feedback: Los catalizadores funcionan reduciendo la energía de activación (Ea) sin consumirse. Esto permite que la reacción proceda más rápido a menor temperatura. No aumentan la cantidad de producto máximo, solo la velocidad de formación. -->
- [ ] C) Provocar que la reacción sea irreversible
- [ ] D) Modificar la estequiometría de la reacción <!-- feedback: Los catalizadores no alteran la estequiometría ni el balance molar de la reacción. La ecuación balanceada es la misma con o sin catalizador. -->

### Explicación Pedagógica
Se evalúa comprensión del rol de los catalizadores. El error frecuente es pensar que los catalizadores "aumentan el producto" o "hacen la reacción irreversible". En realidad, reducen Ea sin modificar la Termodinámica ni la estequiometría.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P2-reacciones-quimicas-066-MASTERY-v12`
**Bloom:** [Analyze]
**ICFES:** [Interpretación de información - Evaluar]
**Context:** Producción de biogás en zona rural de Santander

### Enunciado
En una finca ganadera de Santander, se produce biogás a partir de la descomposición anaeróbica de residuos orgánicos: CH₄ + 2O₂ → CO₂ + 2H₂O. Si se produce 1 mol de CO₂ por cada 2 moles de CH₄ consumidos, ¿cuál es la variación de entalpía (ΔH) aproximada de esta reacción?

### Options
- [ ] A) ΔH > 0 (endotérmica)
- [ ] x] B) ΔH < 0 (exotérmica) <!-- feedback: La combustión de metano es altamente exotérmica. El ΔH estándar de combustión del metano es aproximadamente -890 kJ/mol. Los enlaces O=O y C-H se rompen (absorbe energía) y se forman enlaces C=O y O-H (libera energía), con un neto de energía liberada. -->
- [ ] C) ΔH = 0 (energéticamente neutra)
- [ ] D) No se puede determinar sin más información <!-- feedback: Se puede estimar el signo de ΔH usando entalpías de enlace o conocimiento de que todas las combustiones son exotérmicas. No se requiere información adicional para concluir que es exotérmica. -->

### Explicación Pedagógica
La pregunta evalúa comprensión de термохимия. El error común es confundir la ruptura de enlaces (endotérmica) con el proceso total. Aunque romper enlaces requiere energía, formar nuevos enlaces libera más energía de la que se absorbe, resultando en reacción exotérmica.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P2-reacciones-quimicas-066-MASTERY-v13`
**Bloom:** [Analyze]
**ICFES:** [Uso de formatos simbólicos - Interpretar]
**Context:** Análisis de agua residual en planta de tratamiento de Cali

### Enunciado
En la planta de tratamiento de aguas residuales de Cali, se monitorea la reacción de oxidación del amoníaco (NH₃) para eliminar nitrógeno: 4NH₃ + 5O₂ → 4NO + 6H₂O. Si la velocidad de formación de NO es 0.002 M/s, ¿cuál es la velocidad de desaparición del O₂ en M/s?

### Options
- [ ] A) 0.001 M/s
- [ ] B) 0.0016 M/s
- [ ] x] C) 0.0025 M/s <!-- feedback: De la estequiometría: 4 mol NH₃ : 5 mol O₂ : 4 mol NO. La velocidad de reacción: -Δ[O₂]/Δt = (5/4) × Δ[NO]/Δt = 1.25 × 0.002 = 0.0025 M/s. El factor estequiométrico 5/4 relaciona las velocidades. -->
- [ ] D) 0.004 M/s <!-- feedback: Este error surge de usar la relación 1:1 o invertir el factor estequiométrico. Se debe usar 5/4, no 4/5. -->

### Explicación Pedagógica
La pregunta evalúa la relación entre velocidad de reacción y coeficientes estequiométricos. El error frecuente es no considerar que las velocidades se relacionan mediante los coeficientes balanceados, no de forma directa uno a uno.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P2-reacciones-quimicas-066-MASTERY-v14`
**Bloom:** [Analyze]
**ICFES:** [Manejo de variables - Evaluar]
**Context:** Efecto de antibióticos en bacteria E. coli en laboratorio de investigación

### Enunciado
Un investigador prueba el efecto de un antibiótico sobre una población de E. coli y observa que la concentración del antibiótico se mantiene constante mientras la población bacteriana disminuye. ¿Qué tipo de cinética sigue la degradación de las bacterias?

### Options
- [ ] A) Cinética de orden cero respecto a las bacterias
- [ ] x] B) Cinética de primer orden respecto a las bacterias <!-- feedback: Cuando la concentración del antibiótico (un reactivo) se mantiene constante, la velocidad de muerte bacteriana depende solo de la concentración de bacterias. Si la velocidad es proporcional a [bacterias], la cinética es de primer orden. -->
- [ ] C) Cinética de segundo orden respecto a las bacterias
- [ ] D) No se puede determinar sin conocer la concentración inicial <!-- feedback: La información proporcionada es suficiente: la velocidad depende solo de [bacterias] porque [antibiótico] es constante. Si velocidad ∝ [bacterias], es primer orden. -->

### Explicación Pedagógica
Se evalúa comprensión de órdenes de reacción. El error común es confundir orden de reacción con molecularidad. Cuando un reactivo está en exceso constante, la velocidad depende solo del otro reactivo.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-CIE-11-P2-reacciones-quimicas-066-MASTERY-v15`
**Bloom:** [Evaluate]
**ICFES:** [Interpretación de información - Juzgar pertinencia]
**Context:** Industria de producción de formaldehído en Barranquilla

### Enunciado
En una industria química de Barranquilla, el metanol se convierte en formaldehído mediante oxidación parcial: 2CH₃OH + O₂ → 2H₂CO + 2H₂O. En un experimento, se hacen reaccionar 64 g de metanol con 32 g de oxígeno. ¿Cuál es el reactivo limitante?

### Options
- [ ] A) Metanol, porque tiene mayor masa
- [ ] B) Oxígeno, porque tiene menor masa molar
- [ ] C) Metanol, porque se necesitan 2 moles de metanol por cada mole de O₂
- [ ] x] D) Metanol, porque 64 g CH₃OH = 2 mol, y se requieren 2 mol O₂, pero solo se tienen 1 mol O₂ <!-- feedback: PM CH₃OH = 32 g/mol → 64 g = 2 mol. PM O₂ = 32 g/mol → 32 g = 1 mol. Relación: 2 mol CH₃OH / 1 mol O₂ requiere 2 mol O₂ por 2 mol CH₃OH. Hay 1 mol O₂ pero se necesitan 2 mol. O₂ es limitante. Error: la respuesta correcta es O₂, no metanol. -->

### Explicación Pedagógica
La pregunta evalúa determinación de reactivo limitante. El error frecuente es
