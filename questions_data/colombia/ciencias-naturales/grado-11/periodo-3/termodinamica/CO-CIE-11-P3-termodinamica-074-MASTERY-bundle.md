<think>
The user wants me to generate exactly 20 ICFES-style multiple choice questions for Colombian Saber 11 exam in Natural Sciences, specifically on Thermodynamics for grade 11, period 3.

Let me follow all the requirements:
1. 20 questions
2. Progressive difficulty: D3-D4 (1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
3. 4 options per question, [x] marking the correct one
4. Colombian context
5. Plausible distractors based on common student errors
6. Include YAML frontmatter
7. Follow the exact format for each question
8. No "all of the above" or "none of the above"

Let me generate questions covering thermodynamic topics:
- Heat and temperature
- Heat transfer (conduction, convection, radiation)
- Laws of thermodynamics
- Thermal engines
- Entropy
- Specific heat
- Phase changes
- Thermal expansion
- Ideal gas law applications

Let me create these 20 questions with progressive difficulty.

Questions 1-4 (Basic - D3-D4): Basic concepts
Questions 5-10 (Intermediate - D5-D6): Application of concepts
Questions 11-16 (Advanced - D7-D8): Analysis and problem solving
Questions 17-20 (Expert - D9-D10): Evaluation and complex analysis

</think>

```yaml
id: "CO-CIE-11-P3-termodinamica-074-MASTERY"
country: "colombia"
grado: 11
asignatura: "ciencias-naturales"
tema: "termodinamica"
periodo: 3
protocol_version: "5.1"
bundle_size: 20
bundle_index: 74
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T19:22:20.527215"
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

**ID:** `CO-CIE-11-P3-termodinamica-074-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Identifier les concepts et principes de base de la thermodynamique
**Context:** Proceso de calentamiento de agua en una caldera industrial en Barranquilla

### Enunciado
Una caldera industrial en Barranquilla eleva la temperatura de 2 kg de agua desde 25°C hasta 85°C. Si el calor específico del agua es 4.186 J/(g·°C), ¿cuál es la cantidad de calor absorbido por el agua?

### Options
- [ ] A) 125.580 J
- [x] B) 502.320 J <!-- feedback: Q = m × c × ΔT = 2000 g × 4.186 J/(g·°C) × 60°C = 502.320 J, conversión correcta de unidades -->
- [ ] C) 50.232 J <!-- feedback: Error común: no convertir kg a g correctamente o usar 2 g en lugar de 2000 g -->
- [ ] D) 5.023.200 J <!-- feedback: Error al calcular el cambio de temperatura: ΔT = 85 - 25 = 60°C, no multiplicar por 100 -->

### Explicación Pedagógica
La respuesta correcta es B. Para calcular el calor absorbido se usa la fórmula Q = m × c × ΔT. Es fundamental que los estudiantes conviertan correctamente las unidades: 2 kg = 2000 g. El error más común es no realizar esta conversión, lo que lleva a resultados muy pequeños (C) o muy grandes (D). El cambio de temperatura es ΔT = 85°C - 25°C = 60°C.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-CIE-11-P3-termodinamica-074-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Reconocer los mecanismos de transferencia de calor
**Context:** Selección de materiales para construir cocinas solares en la Guajira

### Enunciado
En la Guajira, se diseña una cocina solar que debe mantener el calor de los alimentos cocidos. ¿Cuál de los siguientes materiales es el más adecuado para aislar el interior de la cocina y por qué?

### Options
- [ ] A) Aluminum metal, porque conduce muy bien el calor
- [ ] B) Plástico espumado (poliuretano), porque atrapa aire en sus celdas y reduce la conducción
- [x] C) Lana de fibra de vidrio, porque tiene baja conductividad térmica y atrapa aire <!-- feedback: La lana de fibra de vidrio es un aislante térmico efectivo porque las fibras de aire atrapado reducen significativamente la conducción de calor -->
- [ ] D) Cobre metálico, porque dispersa el calor rápidamente de manera uniforme

### Explicación Pedagógica
La respuesta correcta es C. Los aislantes térmicos funcionan atrapando aire en espacios pequeños, lo que reduce la conducción de calor. El error común A y D es confundir "buen conductor" con "buen aislante". Los metales como aluminio y cobre son excelentes conductores, lo contrario de lo que se necesita. La opción B también es parcialmente correcta, pero la lana de fibra de vidrio es el ejemplo clásico de aislante con aire atrapado entre fibras.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P3-termodinamica-074-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Explicar la diferencia entre calor y temperatura
**Context:** Comparación del calentamiento en la zona cálida tropical de Colombia versus zonas andinas

### Enunciado
En Cartagena (zona costera a nivel del mar) y en Bogotá (a 2.600 m.s.n.m.), se calientan cantidades iguales de agua con la misma fuente de calor durante el mismo tiempo. Un estudiante afirma que "el agua en Cartagena alcanza mayor temperatura porque recibe más calor del sol". ¿Por qué esta afirmación es incorrecta?

### Options
- [ ] A) Porque el sol no es fuente de calor, sino de luz
- [x] B) Porque calor y temperatura son conceptos diferentes; igual cantidad de calor transferido produce el mismo ΔT en masas iguales de la misma sustancia <!-- feedback: Para la misma sustancia y la misma masa, la misma cantidad de calor produce el mismo cambio de temperatura, independiente de la ubicación geográfica -->
- [ ] C) Porque en Bogotá hace más frío por la altura y el agua no puede calentarse
- [ ] D) Porque en Cartagena el agua se evapora más rápido y por eso parece más caliente

### Explicación Pedagógica
La respuesta correcta es B. Este es un concepto fundamental donde los estudiantes confunden "calor" (energía transferida) con "temperatura" (medida de la energía cinética promedio de las partículas). Si la misma masa de agua recibe la misma cantidad de calor durante el mismo tiempo, el cambio de temperatura será igual. Las opciones C y D son distractores que mezclan conceptos de presión atmosférica y evaporación sin fundamento.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P3-termodinamica-074-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Comprender el concepto de equilibrio térmico
**Context:** Proceso de mezcla de agua caliente y fría en un sistema de calentamiento solar doméstico en Antioquia

### Enunciado
En un sistema de calentamiento solar en Antioquia, 500 g de agua a 80°C se mezclan con 500 g de agua a 20°C en un recipiente aislado. Después de un tiempo, el sistema alcanza el equilibrio térmico. ¿Cuál es la temperatura final de la mezcla?

### Options
- [ ] A) 100°C
- [ ] B) 60°C
- [x] C) 50°C <!-- feedback: En mezclas de igual masa a diferente temperatura, T_f = (T1 + T2)/2 = (80 + 20)/2 = 50°C, cuando no hay pérdidas al ambiente -->
- [ ] D) 30°C

### Explicación Pedagógica
La respuesta correcta es C. Cuando dos masas iguales de la misma sustancia se mezclan sin intercambio de calor con el ambiente, la temperatura final es el promedio arithmetic. El error común es pensar que las temperaturas se suman (A) o restan directamente (D). La opción B (60°C) podría resultar de una confusión con valores intermedios no relacionados con promedios.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P3-termodinamica-074-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Aplicar la primera ley de la termodinámica a situaciones cotidianas
**Context:** Funcionamiento de una olla a presión en la cocina colombiana

### Enunciado
En una olla a presión, los alimentos se cocinan más rápido porque la presión interna elevada aumenta la temperatura de ebullición del agua. Si el sistema recibe 800 J de calor del quemador y realiza un trabajo de 200 J sobre el émbolo, ¿cuál es el cambio en la energía interna del sistema?

### Options
- [ ] A) 1000 J
- [x] B) 600 J <!-- feedback: ΔU = Q - W, entonces ΔU = 800 J - 200 J = 600 J, donde Q es calor absorbido y W es trabajo realizado POR el sistema -->
- [ ] C) 400 J
- [ ] D) 200 J

### Explicación Pedagógica
La respuesta correcta es B. La primera ley de la termodinámica establece que ΔU = Q - W. El calor recibido (Q = +800 J) aumenta la energía interna, mientras que el trabajo realizado por el sistema (W = +200 J) la disminuye. El error común A surge de sumar Q + W, y el D de restar incorrectamente. Este concepto es fundamental para entender sistemas térmicos cerrados.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P3-termodinamica-074-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Aplicar conceptos de transferencia de calor en contextos prácticos
**Context:** Elaboración de desserts tradicionales colombianos que requieren control de temperatura

### Enunciado
Una abuela en Pasto prepara dulce de brea (postre tradicional de Nariño) y utiliza un baño de María. El agua del baño de María hierve a 100°C mientras el recipiente interno alcanza 85°C. Si la olla externa tiene 1.5 kg de agua y se necesitan 60.000 J para evaporar parte del agua, ¿cuánta agua se evaporó? (Lv = 2.260.000 J/kg)

### Options
- [ ] A) 0.015 kg
- [ ] B) 0.026 kg
- [x] C) 0.0265 kg (aproximadamente 26.5 g) <!-- feedback: m = Q/Lv = 60.000 J / 2.260.000 J/kg = 0.0265 kg, usando la fórmula del calor latente Q = m × Lv -->
- [ ] D) 0.053 kg

### Explicación Pedagógica
La respuesta correcta es C. Para procesos con cambio de fase a temperatura constante, se usa Q = m × Lv. Despejando m = Q/Lv. El error común D es olvidar dividir y multiplicar por 2, mientras que B podría ser el resultado de redondeo apresurado. El baño de María es un ejemplo clásico de transferencia de calor por convección en líquidos.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P3-termodinamica-074-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Analizar procesos termodinámicos mediante diagramas PV
**Context:** Estudio del funcionamiento de un compresor de aire en una estación de servicio en Bogotá

### Enunciado
Un compresor de aire en una estación de servicio de Bogotá comprime isotérmicamente 0.1 m³ de aire a 1 atm hasta 0.02 m³. Si la temperatura se mantiene constante a 300 K, ¿qué presión final tiene el aire? (Considere el aire como gas ideal)

### Options
- [x] A) 5 atm <!-- feedback: Para proceso isotérmico: P1V1 = P2V2, entonces P2 = P1V1/V2 = 1 atm × 0.1/0.02 = 5 atm, ley de Boyle -->
- [ ] B) 0.2 atm
- [ ] C) 0.5 atm
- [ ] D) 1 atm

### Explicación Pedagógica
La respuesta correcta es A. Para un proceso isotérmico de un gas ideal, P1V1 = P2V2 (Ley de Boyle). Al reducir el volumen a la quinta parte, la presión aumenta cinco veces. El error B es invertir la relación (V1/V2 en lugar de V2/V1), el C es calcular P2 = P1 × (V2/V1) = 0.2 atm y luego confundirlo, y D indica que no hay cambio de presión.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P3-termodinamica-074-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Comprender el concepto de entropía en procesos naturales
**Context:** Degradación de energía en un ecosistema de páramo por pérdida de calor

### Enunciado
En los páramos de Chingaza, el calor del sol evapora agua de los frailejones. Este vapor sube, se condensa en las nubes y eventualmente regresa como lluvia. ¿Por qué este ciclo natural demuestra que la entropía total del universo aumenta?

### Options
- [ ] A) Porque la temperatura de los páramos aumenta con la evaporación
- [x] B) Porque la energía se dispersa desde una forma concentrada (sol) hasta distribuida en todo el ambiente, y el desorden total aumenta <!-- feedback: La entropía aumenta cuando la energía se transfiere y dispersa; el calor del sol (alta T) se convierte en vapor (más disperso) y la radiación térmica del sistema aumenta la entropía total -->
- [ ] C) Porque los páramos son fríos y la entropía siempre aumenta en ambientes fríos
- [ ] D) Porque la evaporación crea más desorden en el agua sólida del páramo

### Explicación Pedagógica
La respuesta correcta es B. La entropía es una medida del desorden o dispersión de energía. El sol concentra energía en un punto de alta temperatura; al transferirse a la Tierra y evaporar agua, la energía se dispersa en un mayor volumen, aumentando la entropía total. La opción C es un error conceptual: los ambientes fríos pueden tener baja entropía local pero la dispersión de energía sigue aumentando la entropía universal.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P3-termodinamica-074-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Analizar máquinas térmicas y su eficiencia
**Context:** Funcionamiento de una planta termoeléctrica en Barranquilla que usa gas natural

### Enunciado
Una planta termoeléctrica en Barranquilla funciona como una máquina térmica con una eficiencia del 35%. Si absorbe 10.000 J de calor de la fuente caliente (combustión de gas natural) en cada ciclo, ¿cuánto calor disipa hacia la fuente fría?

### Options
- [ ] A) 6.500 J
- [x] B) 6.500 J
- [ ] C) 3.500 J
- [ ] D) 9.650 J

### Explicación Pedagógica
La respuesta correcta es B. La eficiencia de una máquina térmica es η = W/Q₁ = 1 - Q₂/Q₁. Despejando: Q₂ = Q₁(1 - η) = 10.000 J × (1 - 0.35) = 6.500 J. El trabajo realizado es W = Q₁ - Q₂ = 3.500 J. El error común es confundir Q₂ con η directamente. La opción C (3.500 J) corresponde al trabajo, no al calor rechazado.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P3-termodinamica-074-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Evaluar procesos adiabáticos en la atmósfera
**Context:** Enfriamiento de masas de aire al ascender por las montañas de los Andes colombianos

### Enunciado
Una masa de aire húmedo asciende por la cordillera de los Andes. A medida que asciende, se expande adiabaticamente y su temperatura disminuye. Si el aire se expande realizando trabajo contra la presión atmosférica sin intercambio de calor con el entorno, ¿cómo cambia su energía interna?

### Options
- [ ] A) Aumenta, porque el trabajo realizado genera más energía interna
- [x] B) Disminuye, porque la energía interna se usa para realizar el trabajo de expansión <!-- feedback: En un proceso adiabático de expansión, ΔU = -W (negativo), ya que el sistema usa su energía interna para realizar trabajo sobre el ambiente -->
- [ ] C) Permanece constante, porque no hay transferencia de calor
- [ ] D) No se puede determinar sin conocer la presión inicial

### Explicación Pedagógica
La respuesta correcta es B. En un proceso adiabático (Q = 0), según la primera ley: ΔU = Q - W = -W. Cuando el gas se expande, realiza trabajo positivo sobre el ambiente, por lo tanto W > 0 y ΔU < 0. El error común C surge de confundir "sin intercambio de calor" con "energía interna constante". Sin embargo, el trabajo de expansión consume energía interna.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P3-termodinamica-074-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Analizar la segunda ley de la termodinámica y sus implicaciones
**Context:** Intentos de construir máquinas de movimiento perpetuo en Colombia

### Enunciado
Un inventor claims haber diseñado una máquina térmica que convierte el 100% del calor absorbido en trabajo, sin rechazar calor a una fuente fría. ¿Por qué este diseño viola la segunda ley de la termodinámica?

### Options
- [ ] A) Porque viola la conservación de la energía (primera ley)
- [x] B) Porque es imposible que todo el calor absorbido se convierta en trabajo; alguna energía siempre debe dispersarse como calor residual de baja temperatura <!-- feedback: La segunda ley establece que ninguna máquina térmica puede tener eficiencia del 100%; siempre se requiere una fuente fría donde rejectar parte del calor absorbido -->
- [ ] C) Porque la máquina debe rechazar exactamente el 50% del calor
- [ ] D) Porque los metales no son suficientemente resistentes para soportar tales máquinas

### Explicación Pedagógica
La respuesta correcta es B. La segunda ley de la termodinámica establece que es imposible construir una máquina térmica con eficiencia del 100% (formulación de Kelvin-Planck). Siempre debe existir una fuente fría donde se disipe parte del calor. La opción A es incorrecta porque la conservación de energía no prohíbe convertir todo el calor en trabajo, es justamente la segunda ley quien lo prohíbe.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P3-termodinamica-074-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Comparar procesos reversibles e irreversibles en contextos reales
**Context:** Degradación de la energía en un ecosistema de manglar en la Ciénaga de Mallorquín

### Enunciado
Un ecosistema de manglar en la Ciénaga de Mallorquín transforma la energía solar en energía química mediante fotosíntesis, pero no puede revertir este proceso para recapturar toda la energía solar incidente. ¿Cuál de las siguientes opciones explica mejor por qué este proceso es irreversible desde el punto de vista termodinámico?

### Options
- [ ] A) Porque la fotosíntesis ocurre solo durante el día
- [ ] B) Porque los manglares son organismos vivos
- [x] C) Porque parte de la energía se degrada a calor de baja temperatura que se dispersa en el ambiente, aumentando la entropía total y haciendo imposible la recuperación completa <!-- feedback: Los procesos irreversibles aumentan la entropía del universo; en toda transformación energética real, parte de la energía se convierte en calor de baja temperatura que no puede reutilizarse completamente, aumentando el desorden total -->
- [ ] D) Porque el manglar solo puede usar la luz visible del espectro

### Explicación Pedagógica
La respuesta correcta es C. Los procesos irreversibles son aquellos en los que la entropía del universo aumenta. En toda transformación energética real (como la fotosíntesis), parte de la energía se convierte en calor de baja temperatura que se dispersa en el ambiente. Este calor disperso no puede recolectarse completamente para realizar trabajo, haciendo que el proceso sea irreversible. Las opciones A y B son distractores irrelevantes.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P3-termodinamica-074-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Interpretar ciclos termodinámicos mediante diagramas
**Context:** Análisis del ciclo de refrigeración en neveras usadas en elTrópico colombiano

### Enunciado
En una nevera doméstica en Cali, el refrigerante absorbe 500 J de calor del interior (a 5°C) y rechaza 650 J de calor al ambiente exterior (a 35°C). ¿Cuál es el coeficiente de desempeño (COP) de este refrigerador?

### Options
- [ ] A) 0.77
- [x] B) 3.33 <!-- feedback: COP = Q_fria / W_neto = Q_fria / (Q_caliente - Q_fria) = 500 J / (650 J - 500 J) = 500/150 = 3.33, indicando que por cada joule de trabajo se extraen 3.33 J de calor del interior frío -->
- [ ] C) 1.3
- [ ] D) 6.5

### Explicación Pedagógica
La respuesta correcta es B. El coeficiente de desempeño de un refrigerador es COP = Q_L / W = Q_L / (Q_H - Q_L), donde Q_L es el calor extraído del espacio frío y W es el trabajo neto. El error común A es dividir Q_H/Q_L = 650/500 = 1.3 (inverso incorrecto). El COP indica la eficiencia energética del refrigerador; valores más altos son mejores.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P3-termodinamica-074-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Evaluar propiedades térmicas de materiales en aplicaciones de ingeniería
**Context:** Selección de materiales para construir hornos artesanales de ladrillo en la producción de arepas en Antioquia

### Enunciado
Un artesano en Antioquia construye un horno de ladrillo para tostar arepas. El calor específico del ladrillo es aproximadamente 0.84 J/(g·°C) y el del hierro fundido es 0.46 J/(g·°C). Si se tiene la misma masa de ambos materiales a temperatura ambiente (25°C) y se les entrega la misma cantidad de calor (10.000 J), ¿Cuál alcanzará mayor temperatura final?

### Options
- [x] A) El hierro fundido, porque con menor calor específico, el mismo calor produce un mayor aumento de temperatura ΔT = Q/(m·c) <!-- feedback: ΔT = Q/(m·c); con menor c, para la misma Q y m, ΔT es mayor. Esto significa que el hierro fundido se calienta más rápido y alcanza mayor temperatura con la misma energía -->
- [ ] B) El ladrillo, porque tiene mayor calor específico y almacena más energía
- [ ] C) Ambos alcanzarán la misma temperatura, porque reciben el mismo calor
- [ ] D) El ladrillo, porque es más denso y transfiere mejor el calor

### Explicación Pedagógica
La respuesta correcta es A. El calor específico indica la cantidad de calor necesaria para elevar 1°C la temperatura de 1 g de sustancia. Un menor calor específico significa que se necesita menos calor para cambiar la temperatura. ΔT = Q/(m·c). El error B confunde "almacenar más energía" con "alcanzar mayor temperatura". Almacenar más energía a igual masa no implica mayor temperatura final si parte de esa energía se queda almacenada.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-CIE-11-P3-termodinamica-074-MASTERY-v15`
**Bloom:** Analyze
**ICFES:** Resolver problemas que involucren múltiples principios termodinámicos
**Context:** Cálculo de eficiencia energética en un restaurante tradicional colombiano en Villa de Leyva

### Enunciado
Un restaurante tradicional en Villa de Leyva usa una olla de barro de 2 kg (calor específico 0.9 J/g·°C) para hervir 3 kg de agua desde 25°C hasta 100°C. El calor de vaporización del agua es 2.260.000 J/kg. ¿Cuánto calor total se necesita si al final se evaporan 100 g de agua?

### Options
- [ ] A) 1.016.000 J
- [ ] B) 941.400 J
- [x] C) 1.266.600 J <!-- feedback: Q_total = Q_olla + Q_agua + Q_evaporación = m_olla·c_olla·ΔT + m_agua·c_agua·ΔT + m_vapor·Lv = 2000·0.9·75 + 3000·4.186·75 + 0.1·2.260.000 = 135.000 + 940.350 + 226.000 = 1.266.600 J aproximadamente -->
- [ ] D) 1.575.000 J

### Explicación Pedagógica
La respuesta correcta es C. Se deben considerar tres contribuciones: (1) calentar la olla: Q₁ = 2000 g × 0.9 J/(g·°C) × 75°C = 135.000 J; (2) calentar el agua: Q₂ = 3000 g × 4.186 J/(g·°C) × 75°C ≈ 940.350 J; (3) evaporar 100 g: Q₃ = 0.1 kg × 2.260.000 J/kg = 226.000 J. Total ≈ 1.266.600 J. El error A ignora el calor del agua, y D sobreestima los valores.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-CIE-11-P3-termodinamica-074-MASTERY-v16`
**Bloom:** Analyze