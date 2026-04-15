<think>
The user wants me to generate exactly 20 questions in ICFES Saber 11 format for Colombian state exams, specifically for Natural Sciences (Ciencias Naturales) on the topic of "enlaces-quimicos" (chemical bonds), grade 11, period 1.

Let me follow the strict format requirements:

1. Difficulty progression: D3-D4 (questions 1-4), D5-D6 (5-10), D7-D8 (11-16), D9-D10 (17-20)
2. Plausible distractors: real errors Colombian students make
3. ICFES alignment: real Saber 11 exam style
4. Modern Colombian context
5. 4 mandatory options, [x] on the correct one
6. No "all of the above" or "none of the above"

I need to generate:
- Front matter YAML block
- Exactly 20 questions in the specified format

Let me create these questions following all the rules:

Questions 1-4: D3-D4 (basic understanding, remember/understand bloom)
Questions 5-10: D5-D6 (intermediate, apply/analyze)
Questions 11-16: D7-D8 (advanced, analyze/evaluate)
Questions 17-20: D9-D10 (complex, evaluate/create)

Topic: Chemical bonds (enlaces químicos)
- Ionic bonds
- Covalent bonds (polar and nonpolar)
- Metallic bonds
- Electronegativity
- Lewis structures
- VSEPR theory (maybe for higher difficulty)
- Properties of compounds based on bonding

Let me write each question with Colombian context where possible.

</think>

```markdown
---
id: "CO-CIE-11-P1-enlaces-quimicos-063-MASTERY"
country: "colombia"
grado: 11
asignatura: "ciencias-naturales"
tema: "enlaces-quimicos"
periodo: 1
protocol_version: "5.1"
bundle_size: 20
bundle_index: 63
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T18:41:30.756085"
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

**ID:** `CO-CIE-11-P1-enlaces-quimicos-063-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Identifier вещественные relaciones entre conceptos científicos
**Context:** Uso cotidiano de compuestos químicos en Colombia

### Enunciado
En la tabla periódica, los elementos del grupo 1 (metales alcalinos) tienden a perder un electrón para alcanzar estabilidad. ¿Qué tipo de enlace químico se forma cuando un metal alcalino se une a un no metal?

### Options
- [ ] A) Enlace covalente, porque comparten electrones para completar sus capas <-- feedback: Los metales alcalinos no comparten electrones con no metales, los transfieren completamente
- [ ] B) Enlace metálico, porque los metales forman estructuras cristalinas entre sí <-- feedback: El enlace metálico ocurre entre metales, no entre metal y no metal
- [x] C) Enlace iónico, porque hay transferencia de electrones del metal al no metal <-- feedback: El metal pierde electrones (se oxida) y el no metal los gana (se reduce), formando un enlace iónico
- [ ] D) Enlace por puente de hidrógeno, porque se interactúan dipolos de agua <-- feedback: El puente de hidrógeno es intermolecular, no es enlace de transferencia electrónica

### Explicación Pedagógica
Los estudiantes frecuentemente confunden los tipos de enlace según el mecanismo de interacción: en el enlace iónico hay transferencia completa de electrones (metal a no metal), en el covalente hay compartición, y en el metálico los electrones se comparten en un "mar" de electrones deslocalizados. El grupo 1 cede electrones fácilmente porque tiene un solo electrón en su capa de valencia.

---

## Question 2 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P1-enlaces-quimicos-063-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Interpreter relaciones entre conceptos científicos y fenomenologías naturales
**Context:** Productos químicos常见的 en el hogar colombiano

### Enunciado
El cloruro de sodio (NaCl) es la sal de mesa que se extrae de minas en Colombia y de la evaporación de agua de mar en las costas caribeñas. ¿Por qué el NaCl tiene un punto de fusión tan alto (801°C) comparado con las moléculas covalentes simples?

### Options
- [ ] A) Porque los átomos de sodio y cloro tienen masas atómicas muy grandes <-- feedback: La masa atómica no determina directamente el punto de fusión; el HCl tiene baja masa pero bajo punto de fusión
- [ ] B) Porque el enlace iónico es más fuerte que el covalente debido a las fuerzas electrostáticas entre iones <-- feedback: Aunque la magnitud de la energía del enlace iónico es mayor, la justificación correcta es la atracción electrostática intensa en una red cristalina tridimensional
- [x] C) Porque las fuerzas electrostáticas de atracción entre cationes y aniones en la red cristalina son muy intensas y requieren mucha energía para romperse <-- feedback: En un sólido iónico, cada ion interactúa con múltiples iones de carga opuesta, creando fuerzas coulómbicas intensas que necesitan alta energía para superar
- [ ] D) Porque el cloro es un elemento muy electronegativo que atrae fortemente al sodio <-- feedback: La diferencia de electronegatividad explica la polaridad del enlace, pero no la fortaleza del enlace iónico en conjunto

### Explicación Pedagógica
Un error común es pensar que la alta electronegatividad del cloro por sí sola causa el alto punto de fusión. En realidad, la estructura de red tridimensional del NaCl sólido significa que cada ion Na⁺ está rodeado por 6 iones Cl⁻ y cada ion Cl⁻ está rodeado por 6 iones Na⁺, creando fuerzas electrostáticas extensas en todas direcciones.

---

## Question 3 (Variant Basic - Difficulty D3)

**ID:** `CO-CIE-11-P1-enlaces-quimicos-063-MASTERY-v3`
**Bloom:** Remember
**ICFES:** Identifier estructuras químicas y sus relaciones
**Context:** Alimentos procesados en el mercado colombiano

### Enunciado
La sacarosa (C₁₂H₂₂O₁₁), el azúcar común, se encuentra en la panela que se produce en las regiones cafeteras de Colombia. ¿Qué tipo de enlace predomina entre los átomos de carbono, hidrógeno y oxígeno en la molécula de sacarosa?

### Options
- [x] A) Enlace covalente, donde hay compartición de electrones entre átomos no metálicos <-- feedback: Los cuatro elementos (C, H, O) son no metales que comparten electrones para completar sus capas de valencia
- [ ] B) Enlace iónico, porque los grupos OH se ionizan en agua <-- feedback: Aunque los grupos OH pueden formar dipolos, no se ionizan completamente en la sacarosa sólida
- [ ] C) Enlace metálico, porque hay electrones deslocalizados en la estructura <-- feedback: Los compuestos orgánicos como la sacarosa no tienen estructuras metálicas
- [ ] D) Enlace de hidrógeno, porque los átomos de oxígeno atraen a los hidrógeno de otras moléculas <-- feedback: El enlace de hidrógeno es una fuerza intermolecular, no un enlace primario dentro de la molécula

### Explicación Pedagógica
Los estudiantes a veces confunden las fuerzas intermoleculares (como el enlace de hidrógeno) con los enlaces primarios dentro de las moléculas. En la sacarosa, los átomos están unidos por enlaces covalentes dentro de cada molécula, mientras que las moléculas están débilmente conectadas por fuerzas de van der Waals y enlaces de hidrógeno entre ellas.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P1-enlaces-quimicos-063-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Diferenciar entre tipos de enlace y sus propiedades
**Context:** Materiales de construcción en Colombia

### Enunciado
En la fabricación de vidrio para ventanas en Colombia, se utiliza principalmente dióxido de silicio (SiO₂). ¿Por qué el SiO₂ es un sólido con un punto de fusión muy alto (1713°C) a pesar de no ser un compuesto iónico?

### Options
- [ ] A) Porque el silicio es un metaloide con alta masa atómica <-- feedback: El silicio es un metaloide pero su masa no explica el alto punto de fusión; el carbono tiene baja masa pero el diamante también tiene punto muy alto
- [x] B) Porque forma una red covalente tridimensional donde cada átomo de silicio está unido covalentemente a cuatro átomos de oxígeno y viceversa, creando enlaces fuertes en todas direcciones <-- feedback: Esta es la estructura del cuarzo: una red covalent contínua donde romper cualquier enlace requiere superar las fuerzas de todo el cristal
- [ ] C) Porque las fuerzas de van der Waals entre las moléculas de SiO₂ son muy intensas <-- feedback: El SiO₂ no forma moléculas discretas, es una red; no hay fuerzas de van der Waals entre "moléculas" de SiO₂
- [ ] D) Porque el oxígeno es el segundo elemento más electronegativo y atrae fortemente al silicio <-- feedback: La diferencia de electronegatividad no es la razón principal; la estructura de red covalente es la causa del alto punto de fusión

### Explicación Pedagógica
La confusión común es que solo los compuestos iónicos tienen puntos de fusión altos. Los sólidos covalentes reticulares, como el SiO₂ (cuarzo), también tienen puntos de fusión altos porque cada átomo está unidos covalentemente a múltiples vecinos, formando una red que requiere romper muchos enlaces para separar los átomos.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P1-enlaces-quimicos-063-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Usar connaissances para explicar fenomenologías
**Context:** Fertilizantes y agricultura en Colombia

### Enunciado
Los fertilizantes nitrogenados como el amoníaco (NH₃) se utilizan ampliamente en la agricultura colombiana. La estructura del amoníaco tiene un átomo de nitrógeno central unido a tres átomos de hidrógeno. ¿Qué tipo de hibridación presenta el átomo de nitrógeno en el NH₃ y cuál es la geometría molecular?

### Options
- [ ] A) sp³, geometría piramidal trigonal con ángulos de 120° <-- feedback: sp³ tiene geometría tetraédrica, no piramidal trigonal; los ángulos de 120° corresponden a hibridación sp²
- [x] B) sp³, geometría piramidal trigonal con ángulos aproximadamente de 107° <-- feedback: El nitrógeno tiene configuración 1s²2s²2p³; con tres enlaces y un par solitario, usa hibridación sp³ y forma una pirámide trigonal con ángulos menores a 109.5° debido a la repulsión del par solitario
- [ ] C) sp², geometría planar con ángulos de 120° <-- feedback: sp² planar corresponde a tres grupos sin par solitario; el nitrógeno en amoníaco tiene cuatro grupos (tres H + un par)
- [ ] D) sp, geometría lineal con ángulos de 180° <-- feedback: sp corresponde a dos grupos; el nitrógeno tiene cuatro grupos de electrones

### Explicación Pedagógica
El error frecuente es no considerar el par solitario como dominio electrónico. La teoría VSEPR predice que cuatro dominios electrónicos (tres enlaces + un par) dan una geometría tetraédrica, pero el par ocupa más espacio, así que los tres enlaces se推到到一个 plano formando una pirámide trigonal con ángulos menores a 109.5°.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P1-enlaces-quimicos-063-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Analizar relaciones entre estructuras y propiedades
**Context:** Industria química colombiana

### Enunciado
El metano (CH₄) es el principal componente del gas natural que Colombia utiliza para generación eléctrica. Si el carbono tiene configuración electrónica 1s²2s²2p² en su estado fundamental, ¿cómo explica la formación de cuatro enlaces equivalentes en el CH₄?

### Options
- [ ] A) Los electrones del subnivel 2p se excitan al subnivel 3s y luego se comparten con los átomos de hidrógeno <-- feedback: El carbono no tiene electrones en el subnivel 3s en su estado fundamental; la excitación sería al 2p únicamente
- [ ] B) Uno de los electrones del subnivel 2s se excita al subnivel 2p y los cuatro electrones resultantes (uno en 2s y tres en 2p) se hibridan para formar cuatro orbitales sp³ equivalentes <-- feedback: La excitación de un electrón 2s a 2p es correcta, pero luego todos los orbitales 2s y 2p del nivel de valencia se mezclan (hibridan) en cuatro orbitales sp³ equivalentes
- [x] C) El carbono experimenta promoción de un electrón del orbital 2s al orbital 2p vacío, y luego hibridación sp³, creando cuatro orbitales híbridos equivalentes que forman enlaces con los hidrógenos <-- feedback: Para formar cuatro enlaces equivalentes, un electrón 2s debe promocionarse a 2p, y luego los cuatro orbitales (uno 2s + tres 2p) se hibridan formando cuatro orbitales sp³ idénticos
- [ ] D) Los orbitales 2s y 2p del carbono permanecen sin cambio y los electrones de los hidrógenos se comparten con los orbitales del carbono <-- feedback: Si los orbitales no se alteraran, los enlaces no serían equivalentes y el CH₄ no tendría geometría tetraédrica

### Explicación Pedagógica
La confusión principal es entre promoción electrónica y hibridación. La promoción (2s²2p² → 2s¹2p³) ocurre para permitir cuatro electrones desapareados, pero la hibridación sp³ es el proceso que mezcla los orbitales 2s y 2p en cuatro orbitales equivalentes. Sin hibridación, el metano tendría enlaces de diferentes energías, contradiciendo la evidencia experimental.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P1-enlaces-quimicos-063-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Usar modelos teóricos para predecir comportamento
**Context:** Contaminación ambiental en ciudades colombianas

### Enunciado
El ozono troposférico (O₃) es un contaminanteCriteria que se forma en la atmósfera de Bogotá y Medellín. La molécula de O₃ tiene un átomo central de oxígeno conectado a otros dos átomos de oxígeno. ¿Cuál es la geometría molecular del O₃ según la teoría VSEPR?

### Options
- [ ] A) Lineal con ángulos de 180° porque tiene dos regiones de densidad electrónica <-- feedback: El O₃ tiene tres átomos unidos al central pero un par solitario no contabilizado; la presencia del par solitario cambia la geometría
- [x] B) Angular (doblada) con ángulos menores a 120° porque hay tres dominios electrónicos (dos enlaces y un par solitario) <-- feedback: La teoría VSEPR predice tres dominios: dos enlaces simples O-O y un par solitario en el oxígeno central, lo que resulta en geometría angular con ángulos aproximados de 117° debido a la repulsión del par solitario
- [ ] C) Trigonal planar con ángulos de 120° porque los tres átomos de oxígeno están en el mismo plano <-- feedback: Trigonal planar requiere tres dominios sin pares solitarios; el O₃ tiene un par solitario que reduce los ángulos
- [ ] D) Piramidal con ángulos de 109.5° porque hay tres enlaces y un par solitario <-- feedback: Geometría piramidal ocurre cuando el par solitario está en el vértice; en el O₃ el par está en el átomo central con tres ligandos, dando geometría angular, no piramidal

### Explicación Pedagógica
Un error común es tratar "pares solitarios" y "enlaces" como equivalentes en VSEPR. Aunque en el O₃ hay tres enlaces (contando O-O como dos conexiones), el par solitario ocupa más espacio y reduce los ángulos de enlace de 120° (esperados para tres dominios) a aproximadamente 117°. Además, la geometría se nombra por las posiciones de los átomos, no por los pares solitarios.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P1-enlaces-quimicos-063-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Evaluar la adequación de modelos para explicar observaciones
**Context:** Biomedicina en Colombia

### Enunciado
La geometría molecular del agua (H₂O) es fundamental para entender muchas propiedades biológicas. Algunos estudiantes proponen que la geometría del H₂O debería ser lineal como el CO₂. ¿Por qué la geometría del H₂O es angular (aproximadamente 104.5°) y no lineal?

### Options
- [ ] A) Porque el oxígeno tiene mayor electronegatividad que el carbono, lo que hace que los electrones se acerquen más al oxígeno y los enlaces se doblen <-- feedback: La electronegatividad afecta la polaridad del enlace, pero no la geometría molecular en términos de posiciones atómicas
- [x] B) Porque hay dos pares solitarios no compartidos en el oxígeno que ejercen mayor repulsión sobre los pares de electrones de los enlaces O-H, forzando los hidrógenos a acercarse y creando ángulos menores a 109.5° <-- feedback: La teoría VSEPR establece que los pares solitarios ocupan más espacio y repelen más fuertemente los pares enlazantes, reduciendo el ángulo de 109.5° (tetraédrico) a 104.5°
- [ ] C) Porque los hidrógenos se repelen mutuamente y se alejan uno del otro, pero los electrones del oxígeno los mantienen juntos en una configuración angular <-- feedback: La repulsión hidrógeno-hidrógeno no es el factor principal; la repulsión del par solitario sobre los pares de enlace es la causa de los ángulos reducidos
- [ ] D) Porque el oxígeno tiene orbitales sp³ que no están orientados linealmente, sino tetraédricamente, y los enlaces O-H forman parte de esta geometría tetraédrica <-- feedback: Esta explicación es parcialmente correcta sobre sp³ pero no explica por qué los ángulos son menores a 109.5°; se necesita considerar la repulsión de pares solitarios

### Explicación Pedagógica
La comparación entre CO₂ (lineal) y H₂O (angular) es clave aquí. CO₂ tiene dos dominios de electrones (dos enlaces dobles) sin pares solitarios, resultando en geometría lineal. H₂O tiene cuatro dominios (dos enlaces + dos pares solitarios), y aunque la geometría de electrones es tetraédrica, la geometría molecular (posiciones de los átomos) es angular porque los pares solitarios no son átomos.

---

## Question 9 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P1-enlaces-quimicos-063-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Usar connaissances para interpretar datos
**Context:** Nutrición y alimentos en Colombia

### Enunciado
El CO₂ es un gas que exhalamos y también el producto de la respiración celular en los tejidos colombianos. En el CO₂, ¿cuál es la hibridación del carbono y por qué la molécula es lineal?

### Options
- [ ] A) sp³, porque el carbono tiene cuatro orbitales híbridos equivalentes que se orientan tetraédricamente <-- feedback: sp³ tendría ángulos de 109.5°, pero el CO₂ es lineal con ángulos de 180°
- [ ] B) sp², porque el carbono tiene tres orbitales híbridos que forman enlaces simples y un orbital p sin hibridar <-- feedback: sp² tiene geometría trigonal planar con ángulos de 120°, pero el CO₂ es lineal
- [x] C) sp, porque el carbono tiene dos orbitales híbridos sp que forman los enlaces axiales y dos orbitales p sin hibridar que forman los enlaces pi <-- feedback: Los dos orbitales sp del carbono se orientan linealmente (180°) y forman los enlaces σ con los oxígenos; los orbitales p sin hibridar forman los enlaces π de las conexiones dobles
- [ ] D) sp³d, porque el carbono necesita cinco orbitales para formar dos enlaces simples y un enlace doble <-- feedback: sp³d corresponde a geometría trigonal bipiramidal, no lineal; además el carbono no usa orbitales d para enlaces

### Explicación Pedagógica
El error frecuente es pensar que "enlaces dobles" significan automáticamente hibridación sp². En el CO₂, aunque hay enlaces dobles, la repulsión entre los dos grupos de electrones (cada O=C=O cuenta como un dominio) es mínima y se orientan linealmente. La hibridación sp produce dos orbitales lineales, perfectos para la estructura del CO₂.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P1-enlaces-quimicos-063-MASTERY-v10`
**Bloom:** Analyze
**ICFES:** Comparar y contrastar modelos para explicar estructura
**Context:** Productos de limpieza y química doméstica

### Enunciado
El boron trifluoride (BF₃) es un ácido de Lewis utilizado en algunas reacciones químicas industriales en Colombia. ¿Por qué el BF₃ es una molécula trigonal planar con ángulos de 120°, mientras que el amoníaco (NH₃) es piramidal con ángulos de 107°?

### Options
- [ ] A) Porque el boro tiene mayor electronegatividad que el nitrógeno <-- feedback: La electronegatividad no determina la geometría molecular; es la distribución de electrones de valencia lo que importa
- [x] B) Porque en el BF₃ el boro tiene tres dominios de electrones (tres enlaces) sin pares solitarios, resultando en geometría trigonal planar; en el NH₃ hay cuatro dominios (tres enlaces + un par solitario), y el par ocupa espacio haciendo la geometría piramidal <-- feedback: La diferencia clave es la presencia de pares solitarios: tres dominios sin pares solitarios dan planar (120°), cuatro dominios con un par solitario dan piramidal con ángulos menores a 109.5°
- [ ] C) Porque el flúor es más pequeño que el hidrógeno, permitiendo que los enlaces en el BF₃ se separen más <-- feedback: El tamaño atómico afecta ligeramente las longitudes de enlace pero no es la causa de la diferencia geométrica
- [ ] D) Porque el boro tiene orbitales p disponibles mientras que el nitrógeno tiene orbitales sp³ híbridos <-- feedback: Ambos átomos usan hibridización sp³ en sus electrones de valencia, pero la diferencia en pares solitarios causa la diferencia geométrica

### Explicación Pedagógica
La confusión surge de no aplicar consistentemente la teoría VSEPR: el BF₃ tiene tres regiones de densidad electrónica (tres enlaces B-F) y ningún par solitario, así que los tres dominios se separan максимально para minimizar repulsión, alcanzando 120°. El NH₃ tiene cuatro regiones (tres enlaces + un par), y el par ocupa más espacio, empujando los enlaces H-N a ángulos menores que el tetraédrico ideal de 109.5°.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P1-enlaces-quimicos-063-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Interpretar y evaluar información científica para resolver проблемы
**Context:** Calidad del agua en regiones colombianas

### Enunciado
En la formación de enlaces químicos, la electronegatividad juega un papel crucial. ¿Cuál es la diferencia clave entre un enlace covalente polar y un enlace iónico, considerando la escala de electronegatividad de Pauling?

### Options
- [ ] A) Enlace covalente polar tiene diferencia de electronegatividad mayor a 2.0, mientras que enlace iónico tiene diferencia menor a 1.5 <-- feedback: Los valores están invertidos: diferencia mayor a ~1.7-2.0 indica enlace iónico, diferencia menor indica covalente polar o no polar
- [ ] B) Enlace covalente polar implica transferencia completa de electrones, mientras que enlace iónico implica compartición de electrones <-- feedback: Es exactamente lo contrario: covalente polar tiene compartición desigual, iónico tiene transferencia completa
- [x] C) En enlace covalente polar hay compartición desigual de electrones debido a diferencia de electronegatividad (generalmente entre 0.4 y 1.7), mientras que en enlace iónico hay transferencia completa de electrones (diferencia generalmente mayor a 1.7) <-- feedback: Según Pauling, diferencia menor a 0.4 es covalente no polar, 0.4-1.7 es covalente polar, y mayor a 1.7 indica carácter iónico significativo
- [ ] D) Enlace covalente polar se forma solo entre no metales, mientras que enlace iónico se forma entre metales y no metales, sin considerar la diferencia de electronegatividad <-- feedback: Aunque esto es generalmente cierto, no explica por qué algunos metales y no metales forman enlaces covalentes polares; la diferencia de electronegatividad es el factor cuantitativo que distingue los tipos de enlace

### Explicación Pedagógica
Un error común es pensar que todos los enlaces metal-no metal son iónicos. La realidad es que hay un espectro: desde covalente no polar (diferencia < 0.4) hasta covalente polar (0.4-1.7) hasta mayormente iónico (> 1.7). Por ejemplo, el enlace C-H (diferencia 0.4) es covalente no polar, mientras que Na-Cl (diferencia 2.1) es altamente iónico, pero el enlace Fe-O tiene carácter parcialmente covalente.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P1-enlaces-quimicos-063-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Analizar críticamente models and explicaciones
**Context:**