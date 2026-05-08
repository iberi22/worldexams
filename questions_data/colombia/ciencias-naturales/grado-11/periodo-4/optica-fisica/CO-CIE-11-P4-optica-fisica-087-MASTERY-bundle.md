<think>
The user wants me to generate exactly 20 questions in ICFES Saber 11 format for Colombian state exam, subject: Natural Sciences, topic: Physical Optics, grade 11, period 4.

Let me create the questions following the exact format requested, with progressive difficulty:
- Questions 1-4: D3-D4 difficulty
- Questions 5-10: D5-D6 difficulty
- Questions 11-16: D7-D8 difficulty
- Questions 17-20: D9-D10 difficulty

The format must include YAML frontmatter and then 20 questions with the structure specified.

Let me generate these questions about physical optics (optica-fisica) which would include topics like:
- Wave nature of light
- Reflection and refraction
- Snell's law
- Interference and diffraction
- Polarization
- Electromagnetic spectrum
- Lenses and mirrors
- Optical instruments
- Double slit experiment
- Single slit diffraction
- Huygens principle
- Total internal reflection
- Dispersion

I'll create contextually relevant questions for Colombian students, with modern contexts.

</think>

```markdown
---
id: "CO-CIE-11-P4-optica-fisica-087-MASTERY"
country: "colombia"
grado: 11
asignatura: "ciencias-naturales"
tema: "optica-fisica"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 87
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T20:06:50.275837"
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

**ID:** `CO-CIE-11-P4-optica-fisica-087-MASTERY-v1`
**Bloom:** [Remember]
**ICFES:** [Identificación de conceptos]
**Context:** Fenómenos ópticos cotidianos en Colombia

### Enunciado
Cuando la luz blanca passa a través de un prisma de cristal y se descompone en los colores del arcoíris, este fenómeno se denomina:

### Options
- [ ] A) Reflexión de la luz
- [ ] B) Dispersión cromática
- [x] C) Descomposición de la luz por refracción <!-- feedback: La luz blanca está formada por múltiples longitudes de onda que al pasar por el prisma sufren diferentes ángulos de refracción, separándose en sus colores componentes -->
- [ ] D) Interferencia constructiva <!-- feedback: La interferencia requiere superposición de ondas, no es el mecanismo de separación de colores en un prisma -->

### Explicación Pedagógica
La dispersión cromática ocurre porque el índice de refracción del vidrio depende de la longitud de onda. Los colores violeta y azul tienen mayor refracción que los rojos, separándose al salir del prisma. Este concepto es fundamental para entender cómo funcionan los espectroscopios utilizados en astronomía.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-CIE-11-P4-optica-fisica-087-MASTERY-v2`
**Bloom:** [Remember]
**ICFES:** [Reconocimiento de principios]
**Context:** Aplicaciones tecnológicas colombianas

### Enunciado
La ley de Snell relaciona los ángulos de incidencia y refracción con los índices de refracción de dos medios. Si la luz pasa del aire (n≈1) al agua (n≈1.33), y el ángulo de incidencia es de 30°, el ángulo de refracción será:

### Options
- [ ] A) Mayor a 30°
- [ ] B) Igual a 30°
- [x] C) Menor a 30° <!-- feedback: Como el agua tiene mayor índice de refracción que el aire, la luz se acerca a la normal según la Ley de Snell: n₁ sin θ₁ = n₂ sin θ₂ -->
- [ ] D) 90° <!-- feedback: Para llegar a 90° se necesitaría un ángulo de incidencia cercano al ángulo crítico, que es aproximadamente 49° para esta interfaz -->

### Explicación Pedagógica
Por la Ley de Snell: n₁ sin θ₁ = n₂ sin θ₂. Con n₁=1, θ₁=30°, n₂=1.33: sin θ₂ = (1 × sin 30°)/1.33 ≈ 0.376, por lo tanto θ₂ ≈ 22°. El error común es pensar que mayor índice significa mayor ángulo.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P4-optica-fisica-087-MASTERY-v3`
**Bloom:** [Understand]
**ICFES:** [Comprensión de fenómenos]
**Context:** Fenómeno natural observado en Colombia

### Enunciado
Un estudiante observa que cuando mira hacia el agua cristalina de un lago en los Llanos Orientales, puede ver el fondo. Pero cuando el agua está agitada, la imagen del fondo se distorsiona. Esto ocurre principalmente porque:

### Options
- [ ] A) La velocidad de la luz cambia en agua agitada
- [x] B) Las superficies de refracción irregulares dispersan la luz en múltiples direcciones <!-- feedback: Las ondas en la superficie crean múltiples normales locales, causando refracciones en diferentes direcciones que destruyen la imagen nítida -->
- [ ] C) El índice de refracción aumenta con el movimiento
- [ ] D) La luz se absorbe más cuando hay movimiento <!-- feedback: No hay absorción significativa por el movimiento del agua -->

### Explicación Pedagógica
Cuando la superficie del agua tiene ondas, cada punto funciona como un pequeño prisma con diferente ángulo de inclinación. Esto causa que los rayos luminosos se desvíen en múltiples direcciones, destruyendo la formación de una imagen coherente. Es el mismo principio por el cual vemos a través de superficies curvas distorsionadas.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P4-optica-fisica-087-MASTERY-v4`
**Bloom:** [Apply]
**ICFES:** [Aplicación de conceptos]
**Context:** Tecnología de comunicación en Colombia

### Enunciado
Los cables de fibra óptica utiliza el principio de reflexión interna total para transmitir señales lumínicas. ¿Qué condición debe cumplirse para que ocurra este fenómeno?

### Options
- [ ] A) La luz debe ir de un medio de mayor índice a uno de menor índice con ángulo mayor al ángulo crítico
- [x] B) La luz debe ir de un medio de mayor índice a uno de menor índice con ángulo mayor al ángulo crítico <!-- feedback: Correcto: cuando el ángulo de incidencia supera el ángulo crítico, toda la luz se refleja sin transmitirse al segundo medio -->
- [ ] C) La luz debe ir de un medio de menor índice a uno de mayor índice
- [ ] D) El ángulo debe ser exactamente 45° independentede los índices <!-- feedback: El ángulo crítico depende de los índices de refracción de los materiales, no es un valor fijo -->

### Explicación Pedagógica
La reflexión interna total requiere: (1) luz pasando de medio ópticamente más denso a menos denso, (2) ángulo de incidencia mayor al ángulo crítico. El ángulo crítico se calcula como θc = arcsen(n₂/n₁). En fibras ópticas, el núcleo tiene índice mayor que la cubierta, permitiendo guiar la luz por reflexiones totales sucesivas.

---

## Question 5 (Variant Medium - Difficulty D5)

**ID:** `CO-CIE-11-P4-optica-fisica-087-MASTERY-v5`
**Bloom:** [Apply]
**ICFES:** [Resolución de problemas]
**Context:** Ingeniería óptica colombiana

### Enunciado
Un láser de helio-neón (λ = 633 nm) incide perpendicularmente sobre una rendija doble. En una pantalla ubicada a 2 metros se observan franjas de interferencia con separación de 1.2 mm. La distancia entre las rendijas es aproximadamente:

### Options
- [ ] A) 0.05 mm
- [x] B) 1.05 mm <!-- feedback: Usando d = λL/Δy = (633×10⁻⁹ × 2)/(1.2×10⁻³) ≈ 1.055×10⁻³ m = 1.05 mm -->
- [ ] C) 2.1 mm
- [ ] D) 0.53 mm <!-- feedback: Este valor resultaría de usar mal la fórmula, quizás dividiendo entre 2 -->

### Explicación Pedagógica
En interferencia de doble rendija, la separación entre máximos consecutivos es Δy = λL/d. Despejando d = λL/Δy. El error común es olvidar convertir nanómetros a metros o confundir la fórmula con la de difracción.

---

## Question 6 (Variant Medium - Difficulty D5)

**ID:** `CO-CIE-11-P4-optica-fisica-087-MASTERY-v6`
**Bloom:** [Understand]
**ICFES:** [Análisis de principios]
**Context:** Astronomía en Colombia

### Enunciado
El telescopio espacial James Webb utiliza espejos segmentados con Coating de oro para reflejar luz infrarroja. Respecto a un espejo común de plata, el espejo dorado tiene mayor reflectividad en el infrarrojo porque:

### Options
- [x] A) El oro tiene electrones libres que oscilan favorablemente a frecuencias infrarrojas, causando mínima absorción <!-- feedback: Los metales tienen plasmas frecuencias; el oro refleja mejor en infrarrojo porque sus electrones libres responden mejor a esas frecuencias -->
- [ ] B) El oro absorbe toda la luz visible y refleja solo infrarrojo
- [ ] C) El oro tiene menor índice de refracción para infrarrojo
- [ ] D) El oro es más denso físicamente y por eso refleja más <!-- feedback: La reflectividad depende de las propiedades electrónicas, no de la densidad -->

### Explicación Pedagógica
Los metales tienen plasma frecuencias que determinan qué longitudes de onda reflejan mejor. El oro tiene electrones libres que responden óptimamente a frecuencias infrarrojas, minimizando la absorción. El aluminio es mejor para UV-visible, el oro para IR. La选的 común es pensar que "refleja todo" sin considerar la dependencia de frecuencia.

---

## Question 7 (Variant Medium - Difficulty D5)

**ID:** `CO-CIE-11-P4-optica-fisica-087-MASTERY-v7`
**Bloom:** [Apply]
**ICFES:** [Uso de modelos]
**Context:** Instrumentos ópticos en laboratorios colombianos

### Enunciado
Un estudiante usa un microscopio simple con lente convergente de distancia focal 5 cm. Si observa un objeto ubicado a 8 cm de la lente, la imagen se forma aproximadamente a:

### Options
- [ ] A) 3.2 cm, derecha y mayor
- [ ] B) 3.2 cm, invertida y mayor
- [x] C) 13.3 cm, invertida y mayor <!-- feedback: Por la ecuación de lentes: 1/f = 1/do + 1/di, entonces 1/5 = 1/8 + 1/di, di ≈ 13.3 cm. Imagen real, invertida y amplificada -->
- [ ] D) 13.3 cm, derecha y mayor <!-- feedback: Lentes convergentes producen imágenes reales invertidas cuando el objeto está entre f y 2f, no imágenes virtuales derechas -->

### Explicación Pedagógica
Usando la ecuación de lentes delgadas: 1/f = 1/do + 1/di. Con f=5 cm y do=8 cm (>f pero <2f), se obtiene di positivo de 13.3 cm. La imagen es real, invertida y amplificada. El error frecuente es no identificar correctamente el signo de di para objetos entre f y 2f.

---

## Question 8 (Variant Medium - Difficulty D6)

**ID:** `CO-CIE-11-P4-optica-fisica-087-MASTERY-v8`
**Bloom:** [Apply]
**ICFES:** [Modelamiento]
**Context:** Producción de energía solar en Colombia

### Enunciado
Un panel solar colombiano utiliza celdas de silicio con eficiencia del 20%. Si la irradiancia solar es de 800 W/m² y el panel tiene 1.5 m² de área, ¿cuánta potencia eléctrica máxima puede generar?

### Options
- [ ] A) 120 W
- [x] B) 240 W <!-- feedback: P = Irradiancia × Área × Eficiencia = 800 × 1.5 × 0.20 = 240 W -->
- [ ] C) 1200 W
- [ ] D) 160 W <!-- feedback: Error común: multiplicar solo irradiancia por área (1200 W) sin aplicar la eficiencia -->

### Explicación Pedagógica
La potencia maxima teórica se calcula multiplicando la irradiancia incidente por el área y por la eficiencia de conversión. El distractor más plausible es olvidar la eficiencia y pensar que toda la energía incidente se convierte, o confundir el factor de eficiencia (dividir en lugar de multiplicar).

---

## Question 9 (Variant Medium - Difficulty D6)

**ID:** `CO-CIE-11-P4-optica-fisica-087-MASTERY-v9`
**Bloom:** [Analyze]
**ICFES:** [Análisis de evidencias]
**Context:** Diagnóstico médico en hospitales colombianos

### Enunciado
En una endoscopia, la luz viaja a través de una fibra óptica con índice de refracción 1.5. Si el ángulo crítico para la interfaz núcleo-cubierta es 41.8°, el índice de refracción de la cubierta debe ser aproximadamente:

### Options
- [ ] A) 1.00
- [ ] B) 1.20
- [x] C) 1.12 <!-- feedback: n₂ = n₁ sin θc = 1.5 × sin(41.8°) ≈ 1.5 × 0.666 ≈ 1.00. Como el ángulo crítico depende de la relación entre núcleos, se calcula: n₂ = n₁ × sin(θc). Para θc=41.8°, n₂ ≈ 1.12 -->
- [ ] D) 2.25 <!-- feedback: Esto sería mayor que n₁, imposible para ángulo crítico real -->

### Explicación Pedagógica
El ángulo crítico cumple: sin θc = n₂/n₁. Por lo tanto n₂ = n₁ × sin θc. Sustituyendo: n₂ = 1.5 × sin(41.8°) ≈ 1.5 × 0.667 ≈ 1.00. El distractor 2.25 resulta de malinterpretar la fórmula del ángulo crítico aplicándola invertida.

---

## Question 10 (Variant Medium - Difficulty D6)

**ID:** `CO-CIE-11-P4-optica-fisica-087-MASTERY-v10`
**Bloom:** [Understand]
**ICFES:** [Interpretación de principios]
**Context:** Fenómeno atmosférico colombiano

### Enunciado
El fenómeno del " arcoíris doble" que occasionally se observa en los cielos colombianos después de una tormenta se explica por:

### Options
- [ ] A) Refracción simple en gotas de agua
- [ ] B) Reflexión externa única en superficies esféricas
- [x] C) Doble reflexión interna dentro de las gotas de agua <!-- feedback: El segundo arcoíris se forma por dos reflexiones internas dentro de cada gota, lo que invierte el orden de colores respecto al arcoíris primario -->
- [ ] D) Interferencia de la luz con partículas de polvo <!-- feedback: El polvo causaría dispersión Rayleigh, no arcoíris definidos -->

### Explicación Pedagógica
El arcoíris primario resulta de una reflexión interna y una refracción. El arcoíris secundario requiere dos reflexiones internas antes de salir de la gota, lo que invierte el orden de colores (rojo afuera, violeta adentro) y hace que sea menos intenso. La ángulo del arco secundario es aproximadamente 50° respecto al primario.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-CIE-11-P4-optica-fisica-087-MASTERY-v11`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento crítico]
**Context:** Proyecto de investigación universitario en Colombia

### Enunciado
En un experimento de Young de doble rendija, se observa el patrón de franjas. Si se incrementa la longitud de onda del láser y se mantiene constante la distancia entre rendijas y la distancia a la pantalla, entonces:

### Options
- [ ] A) La separación entre franjas disminuye
- [x] B) La separación entre franjas aumenta proporcionalmente a la longitud de onda <!-- feedback: Δy = λL/d, si λ aumenta, Δy aumenta linealmente. Este es un resultado directo de la ecuación de interferencia -->
- [ ] C) La separación permanece constante porque depende solo de d
- [ ] D) El patrón desaparece completamente <!-- feedback: Patrón permanece visible, solo cambia el espaciamiento -->

### Explicación Pedagógica
La ecuación Δy = λL/d muestra claramente que para L y d constantes, Δy es directamente proporcional a λ. Error común: pensar que mayor longitud de onda significa menor separación (confundiendo con difracción de rendija única donde a mayor λ, mayor difracción).

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-CIE-11-P4-optica-fisica-087-MASTERY-v12`
**Bloom:** [Analyze]
**ICFES:** [Comparación de conceptos]
**Context:** Seguridad vial en Colombia

### Enunciado
Los espejos retrovisores laterales de los vehículos suelen tener la advertencia "objetos más cercanos de lo que aparecen". Esto se debe a que estos espejos son:

### Options
- [ ] A) Planos, y la advertencia es por el ángulo de visión
- [x] B) Convexos, dando campo más amplio pero imágenes menores <!-- feedback: Los espejos convexos divergen los rayos, dando campo de visión más amplio pero imágenes reducidas, lo que hace que las distancias parezcan mayores -->
- [ ] C) Cóncavos, formando imágenes virtuales derechas
- [ ] D) Esféricos, con aberración cromática excesiva

### Explicación Pedagógica
Los espejos convexos proporcionan un campo visual más amplio (ángulo de visión mayor) pero las imágenes resultan más pequeñas y más alejadas de lo que realmente están. Esto permite ver más tráfico en los laterales pero puede engañar sobre la distancia real de un vehículo. Por seguridad, los espejos de pasajero incluyen advertencia.

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-CIE-11-P4-optica-fisica-087-MASTERY-v13`
**Bloom:** [Evaluate]
**ICFES:** [Evaluación de explicaciones]
**Context:** Sostenibilidad ambiental en Colombia

### Enunciado
Un ingeniero diseña un sistema de concentración solar usando espejos parabólicos. Él afirma que los rayos paralelos al eje se concentran en el foco sin importar dónde incidan en el espejo. Respecto a esta afirmación, ¿qué análisis es correcto?

### Options
- [x] A) Es correcta porque la parábola tiene la propiedad de enfocar rayos paralelos al eje en un punto único <!-- feedback: La propiedad definitoria de la parábola es que cualquier rayo paralelo al eje se refleja hacia el foco, independiente del punto de incidencia -->
- [ ] B) Es incorrecta porque solo los rayos que inciden en el vértice se enfocan
- [ ] C) Es incorrecta porque los espejos parabólicos no existen físicamente
- [ ] D) Es parcialmente correcta, funciona solo para rayos cercanos al eje

### Explicación Pedagógica
La parábola tiene la propiedad óptica de que cualquier rayo paralelo a su eje de simetría se refleja pasando por el foco, sin importar el punto de incidencia. Esta es una propiedad geométrica exacta, no una aproximación. Los espejos parabólicos para telescopios y sistemas solares aprovechan esta propiedad.

---

## Question 14 (Variant Advanced - Difficulty D7)

**ID:** `CO-CIE-11-P4-optica-fisica-087-MASTERY-v14`
**Bloom:** [Apply]
**ICFES:** [Aplicación a nuevas situaciones]
**Context:** Industria cinematográfica colombiana

### Enunciado
Una película en Blu-ray usa un láser azul (λ = 405 nm) para leer información. Comparado con un DVD que usa láser rojo (λ = 650 nm), el Blu-ray puede almacenar más información porque:

### Options
- [ ] A) El láser azul tiene mayor energía y por eso graba más profundo
- [x] B) El haz azul permite resolver detalles más pequeños, por lo tanto los pits pueden ser más pequeños y juntos <!-- feedback: El criterio de Rayleigh indica que la difracción limita la resolución: θ ≈ 1.22λ/D. Con λ menor, el spot es más pequeño, permitiendo pits más pequeños -->
- [ ] C) El láser azul tiene mayor velocidad en el aire
- [ ] D) El Blu-ray usa más capas, no por el color del láser

### Explicación Pedagógica
El criterio de difracción establece que la resolución mínima es proporcional a la longitud de onda. Láseres de menor λ producen spots más pequeños, permitiendo pits más pequeños en el disco y mayor densidad de datos. La física del láser (su color o energía) no afecta la velocidad de la luz en el aire.

---

## Question 15 (Variant Advanced - Difficulty D8)

**ID:** `CO-CIE-11-P4-optica-fisica-087-MASTERY-v15`
**Bloom:** [Analyze]
**ICFES:** [Análisis cuantitativo]
**Context:** Investigación óptica en universidades colombianas

### Enunciado
En un experimento de difracción por una rendija simple, la posición del primer mínimo está dada por a sin θ = λ. Si se triplica el ancho de la rendija (a), y se reduce la longitud de onda a la mitad (λ/2), el ángulo del primer mínimo:

### Options
- [ ] A) Se triplica
- [ ] B) Se reduce a la tercera parte
- [x] C) Se reduce a la sexta parte <!-- feedback: Nuevo ángulo: a' sin θ' = λ', donde a' = 3a y λ' = λ/2. Entonces 3a sin θ' = λ/2, comparando con a sin θ = λ: sin θ' = (λ/2)/(3a) = (λ)/(6a) = (1/6) sin θ, por lo tanto θ' ≈ θ/6 -->
- [ ] D) Permanece igual

### Explicación Pedagógica
Original: a sin θ = λ. Nuevo: 3a sin θ' = λ/2. Dividiendo la nueva entre la original: (3a sin θ')/(a sin θ) = (λ/2)/λ = 1/2, entonces 3 sin θ'/sin θ = 1/2, sin θ' = sin θ/6. Para ángulos pequeños, θ' ≈ θ/6. La confusión común es pensar que triplicar a y reducir λ a la mitad produce efectos opuestos que se cancelan.

---

## Question 16 (Variant Advanced - Difficulty D8)

**ID:** `CO-CIE-11-P4-optica-fisica-087-MASTERY-v16`
**Bloom:** [Understand]
**ICFES:** [Síntesis conceptual]
**Context:** Diagnóstico oftalmológico en Colombia

### Enunciado
Un paciente con miopía usa lentes con distancia focal -0.5 m. Si la imagen de un objeto lejano debe formarse exactamente en la retina, y la distancia del cristalino a la retina es 2 cm, el sistema óptico del ojo sin lente debe tener una longitud axial de:

### Options
- [ ] A) 2 cm, porque la retina está a 2 cm
- [ ] B) Mayor a 2 cm, por eso necesita lente divergente
- [x] C) Mayor a 2 cm, exactamente 2.5 cm <!-- feedback: Ojo miope tiene longitud axial > distancia focal perfecta. Con lente de -2 dioptrías (f=-0.5m), el punto remoto está en el infinito que se forma a 0.5m del cristalino. Como la imagen debe formarse en retina a 2cm, el globo ocular es más largo de lo normal -->
- [ ] D) No se puede determinar sin más información

### Explicación Pedagógica
En ojo miope, el globo ocular es demasiado largo o la cornea tiene demasiada potencia. La lente divergente corrige reduciendo la potencia total del sistema. La potencia de la lente es -2D, lo que indica que el ojo tiene aproximadamente 50D de potencia y necesita ser reducido. El error común es ignorar el signo de la distancia focal para lentes divergentes.

---

## Question 17 (Variant Expert - Difficulty D9)

**ID:** `CO-CIE-11-P4-optica-fisica-087-MASTERY-v17`
**Bloom:** [Evaluate]
**ICFES:** [Pensamiento crítico]
**Context:** Desarrollo de tecnología espacial colombiana

### Enunciado
Un satélite de observación terrestre usa un sistema de radar de apertura sintética (SAR). El radar emite pulsos y recibe ecos para formar imágenes. Si la longitud de onda del radar es 5 cm y se desea una resolución espacial de 1 metro, ¿cuál afirmación sobre los principios físicos involucrados es correcta?

### Options
- [ ] A) Se necesita una antena física de al menos 5 metros para lograr esta resolución
- [x] B) La apertura sintética permite lograr alta resolución sin antena física enorme, mediante procesamiento de múltiples posiciones del satélite <!-- feedback: La SAR usa el movimiento del satélite para simular una antena grande. La resolución azimuthal es aproximadamente λ/(2×L) donde L es la longitud de la antena sintética, no la física -->
- [ ] C) La resolución depende únicamente de la potencia del transmisor
- [ ] D) Los sistemas SAR no pueden lograr resoluciones de 1 metro porque la difracción lo impide

### Explicación Pedagógica
En SAR, el movimiento del satélite genera múltiples posiciones de antena que, procesadas apropiadamente, simulan una antena del tamaño de la trayectoria recorrida. Esto supera la limitación de difracción de antenas físicas. La física es el procesamiento interferométrico de múltipleslooks, no una limitación difractiva.

---

## Question 18 (Variant Expert - Difficulty D9)

**ID:** `CO-CIE-11-P4-optica-fisica-087-MASTERY-v18`
**Bloom:** [Apply]
**ICFES:** [Modelamiento complejo]
**Context:** Nanotecnología óptica en Colombia

### Enunciado
Un investigador diseña un metamaterial con índice de refracción negativo para aplicaciones de invisibilidad. El material tiene n = -1.5 para luz visible. Respecto al comportamiento de la luz en este material, ¿cuál afirmación es físicamente correcta?

### Options
- [ ] A) La luz viaja más rápido que en el vacío en este material
- [x] B) El vector de Poynting apunta en dirección opuesta al vector
