$baseDir = "E:\scripts-python\worldexams\questions_data\colombia\ciencias-naturales\grado-6\2026\weekly"
$exists = @("W11","W12")

# Helper function to create a bundle
function New-Bundle {
    param($Week, $Tema, $Periodo, $Titulo, $Preguntas)

    $id = "CO-CIE-6-2026-$Week-$Tema-001-MASTERY"
    $file = "$baseDir\$id-bundle.md"

    $header = @"---
id: "$id"
country: "colombia"
grado: 6
asignatura: "ciencias-naturales"
tema: "$Tema"
periodo: $Periodo
week: $Week
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 10
bundle_size: 10
alignment: "DBA MEN + Estándares Básicos Grado 6"
---

# Weekly Pack W$Week — $Titulo

**Grado:** 6° | **Periodo:** $Periodo | **Semana:** $Week | **Año:** 2026

---

$Preguntas
"@
    $header | Out-File -FilePath $file -Encoding utf8
    Write-Host "Created: $file"
}

# W06 - Reproducción Asexual en Organismos
$w06 = @'
## Question 1 [D1]

**ID:** `CO-CIE-6-2026-W06-reproduccion-asexual-001-v1`
**Bloom:** Remember
**ICFES:** Comunicación y Representación
**Context:** En Bogotá, los estudiantes estudian diferentes formas de reproducción asexual en la naturaleza.

### Enunciado
¿Qué es la reproducción asexual?

### Options
- [ ] A) La unión de un óvulo y un espermatozoide <!-- feedback: Incorrecto. Eso es reproducción sexual. -->
- [ ] B) La formación de nuevos individuos a partir de dos progenitores <!-- feedback: Incorrecto. La reproducción asexual tiene un solo progenitor. -->
- [x] C) La formación de nuevos individuos a partir de un solo progenitor, sin fusión de gametos <!-- feedback: Correcto. Un organismo produce descendencia genéticamente idéntica. -->
- [ ] D) La división del núcleo en dos partes iguales <!-- feedback: Incorrecto. Esa es la mitosis, que es parte de la reproducción pero no la definición completa. -->

### Explicación Pedagógica
La reproducción asexual es una estrategia reproductiva donde un solo organismo progenitor produce descendencia sin participación de otro individuo ni fusión de gametos. Las características principales son: (1) los descendientes son genéticamente idénticos al progenitor (clones), (2) es rápida y eficiente, (3) no requiere buscar pareja, (4) produce poca variabilidad genética. Ejemplos: bacterias (fisión binaria), levaduras (gemación), plantas (esquejes, estolones), estrellas de mar (regeneración), hidras (gemación).

---

## Question 2 [D1]

**ID:** `CO-CIE-6-2026-W06-reproduccion-asexual-002-v1`
**Bloom:** Remember
**ICFES:** Comunicación y Representación
**Context:** En Medellín, los estudiantes identifican los tipos de reproducción asexual.

### Enunciado
¿Qué tipo de reproducción asexual ocurre cuando una bacteria se divide en dos?

### Options
- [ ] A) Gemación <!-- feedback: Incorrecto. La gemación forma una yema que crece y se separa. -->
- [x] B) Fisión binaria <!-- feedback: Correcto. La bacteria se divide en dos células hijas del mismo tamaño. -->
- [ ] C) Fragmentación <!-- feedback: Incorrecto. La fragmentación ocurre cuando un organismo se rompe en fragmentos. -->
- [ ] D) Esporulación <!-- feedback: Incorrecto. La esporulación forma esporas que germinan. -->

### Explicación Pedagógica
La **fisión binaria** es el tipo de reproducción asexual más simple, típica de organismos procariotas (bacterias y arqueas): (1) el ADN circular se replica, (2) la célula se alarga, (3) se forma un septo (división) en el centro, (4) dos células hijas idénticas se separan. Las bacterias como E. coli pueden dividirse cada 20 minutos en condiciones óptimas. A diferencia de la mitosis (que ocurre en eucariotas), la fisión binaria es más simple porque no hay huso mitótico ni orgánulos que repartir.

---

## Question 3 [D2]

**ID:** `CO-CIE-6-2026-W06-reproduccion-asexual-003-v1`
**Bloom:** Understand
**ICFES:** Comunicación y Representación
**Context:** En Cali, los estudiantes comparan gemación en levaduras con otros tipos de reproducción.

### Enunciado
La levadura del pan se reproduce por gemación. ¿En qué consiste este proceso?

### Options
- [ ] A) La levadura se rompe en varios fragmentos que regeneran individuos <!-- feedback: Incorrecto. Eso es fragmentación. -->
- [x] B) Se forma una protuberancia (yema) en la célula madre que crece y finalmente se separa <!-- feedback: Correcto. La yema se desarrolla y se desprende como un nuevo individuo. -->
- [ ] C) La levadura produce esporas que germinan en nuevos individuos <!-- feedback: Incorrecto. Eso es esporulación. -->
- [ ] D) La levadura se divide en dos células iguales <!-- feedback: Incorrecto. Eso es fisión binaria. -->

### Explicación Pedagógica
En la **gemación** (o brotación), la célula madre forma una protuberancia llamada yema que contiene una copia del núcleo. La yema crece y cuando alcanza el tamaño de la célula madre, se separa. La célula hija es más pequeña inicialmente pero crece hasta el tamaño normal. Este proceso es común en:
- Levaduras (Saccharomyces cerevisiae) — se usa para hacer pan, cerveza y vino
- Hidras (animales de agua dulce)
- Algunas esponjas y corales

La gemación se diferencia de la fisión binaria en que las células hijas no son iguales en tamaño al dividirse.

---

## Question 4 [D2]

**ID:** `CO-CIE-6-2026-W06-reproduccion-asexual-004-v1`
**Bloom:** Understand
**ICFES:** Comunicación y Representación
**Context:** En Barranquilla, estudiantes ven un documental sobre estrellas de mar.

### Enunciado
Si una estrella de mar pierde un brazo, puede regenerarlo. Si ese brazo se separa y regenera un cuerpo completo, ¿cómo se llama este tipo de reproducción?

### Options
- [ ] A) Gemación <!-- feedback: Incorrecto. La gemación forma una yema, no a partir de un fragmento. -->
- [x] B) Fragmentación <!-- feedback: Correcto. Un fragmento del organismo regenera un individuo completo. -->
- [ ] C) Fisión binaria <!-- feedback: Incorrecto. La fisión binaria es típica de procariotas. -->
- [ ] D) Esporulación <!-- feedback: Incorrecto. La esporulación forma esporas. -->

### Explicación Pedagógica
La **fragmentación** es un tipo de reproducción asexual donde un organismo se divide en dos o más fragmentos, y cada fragmento regenera las partes faltantes para formar un individuo completo. Es común en:
- Estrellas de mar (Asteroidea): un brazo con parte del disco central puede regenerar una estrella completa
- Planarias (gusanos planos): si se cortan en varios pedazos, cada uno regenera un gusano completo
- Algunas plantas: esquejes, estolones (fresas), rizomas (pasto, jengibre)
- Esponjas: fragmentos pequeños pueden formar nuevas esponjas

En horticultura, los agricultores usan esquejes (fragmentos de tallo) para reproducir plantas como rosas, claveles y café. En Colombia, la reproducción por esquejes es común en cultivos de café y caña de azúcar.

---

## Question 5 [D3]

**ID:** `CO-CIE-6-2026-W06-reproduccion-asexual-005-v1`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Context:** En Bucaramanga, los estudiantes diseñan un experimento con papas.

### Enunciado
Un agricultor en Boyacá corta una papa en varios pedazos, cada uno con un "ojo", y los siembra por separado. ¿Qué tipo de reproducción está usando?

### Options
- [ ] A) Sexual por semillas <!-- feedback: Incorrecto. No está plantando semillas. -->
- [x] B) Asexual por fragmentación (yemas vegetativas o tubérculos) <!-- feedback: Correcto. Cada "ojo" de la papa es una yema que puede desarrollar una nueva planta. -->
- [ ] C) Gemación <!-- feedback: Incorrecto. No se forman yemas en el sentido de la gemación celular. -->
- [ ] D) Esporulación <!-- feedback: Incorrecto. No se están formando esporas. -->

### Explicación Pedagógica
La papa (Solanum tuberosum) se reproduce asexualmente mediante **tubérculos** — tallos subterráneos modificados que almacenan almidón. Los "ojos" de la papa son yemas (brotes) que contienen tejido meristemático capaz de desarrollarse. Cuando se siembra un trozo de papa con un ojo, la yema crece formando tallos, hojas y raíces, produciendo una nueva planta genéticamente idéntica a la original.

Ventajas para el agricultor:
- Rapidez: las papas producen tubérculos en 3-4 meses, las semillas toman más
- Uniformidad: todas las plantas son clones con las mismas características
- Confiabilidad: se sabe exactamente qué tipo de papa se obtendrá

Colombia produce más de 2.8 millones de toneladas de papa al año, principalmente en Boyacá, Cundinamarca y Nariño.

---

## Question 6 [D3]

**ID:** `CO-CIE-6-2026-W06-reproduccion-asexual-006-v1`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Context:** En Cartagena, los estudiantes aprenden sobre la multiplicación de corales.

### Enunciado
Los corales forman colonias a partir de un solo pólipo que se divide repetidamente sin separarse. ¿Qué tipo de reproducción asexual es?

### Options
- [ ] A) Fisión binaria <!-- feedback: Incorrecto. En la fisión las células hijas se separan. -->
- [x] B) Gemación (los nuevos pólipos quedan unidos formando una colonia) <!-- feedback: Correcto. Los corales forman colonias por gemación. -->
- [ ] C) Fragmentación <!-- feedback: Incorrecto. No hay fragmentación, hay crecimiento continuo. -->
- [ ] D) Esporulación <!-- feedback: Incorrecto. No hay esporas. -->

### Explicación Pedagógica
Los corales son animales (cnidarios) que forman colonias por **gemación** asexual: un pólipo inicial produce yemas que se desarrollan en nuevos pólipos que permanecen conectados. Con el tiempo, la colonia puede tener miles de pólipos que secretan un esqueleto calcáreo común, formando los arrecifes de coral.

Los arrecifes son ecosistemas marinos de enorme biodiversidad (el "bosque tropical del mar"). En Colombia, tenemos arrecifes en el Caribe (Archipiélago de San Andrés, Providencia y Santa Catalina, Parque Nacional Natural Tayrona) y en el Pacífico (Malpelo, Gorgona). Los arrecifes están amenazados por el calentamiento global (blanqueamiento), la contaminación y la pesca destructiva.

---

## Question 7 [D4]

**ID:** `CO-CIE-6-2026-W06-reproduccion-asexual-007-v1`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Context:** En Pereira, analizan ventajas y desventajas de la reproducción asexual.

### Enunciado
¿Cuál es la principal desventaja de la reproducción asexual?

### Options
- [ ] A) Es un proceso muy lento <!-- feedback: Incorrecto. La reproducción asexual es más rápida que la sexual. -->
- [ ] B) Requiere mucha energía <!-- feedback: Incorrecto. La reproducción asexual gasta menos energía que buscar pareja. -->
- [x] C) No hay variabilidad genética, por lo que si el ambiente cambia desfavorablemente, toda la población puede morir <!-- feedback: Correcto. La falta de diversidad genética hace vulnerable a la población. -->
- [ ] D) Produce descendencia muy diferente a los padres <!-- feedback: Incorrecto. La descendencia es genéticamente idéntica (clones). -->

### Explicación Pedagógica
La principal desventaja de la reproducción asexual es la **falta de variabilidad genética**. Como todos los descendientes son clones (genéticamente idénticos al progenitor), si ocurre un cambio ambiental adverso que afecta a uno, afecta a todos. Ejemplos:
- Una enfermedad que ataca un clon de bananas (Cavendish) puede acabar con la producción mundial
- Una plaga que afecta a un clon de papa puede destruir cosechas enteras

En cambio, en la reproducción sexual, la recombinación genética produce variabilidad, y algunos individuos pueden tener características que los hagan resistentes a nuevos desafíos. Por eso muchos organismos pueden alternar entre reproducción asexual (cuando las condiciones son estables y favorables) y sexual (cuando el ambiente cambia).

---

## Question 8 [D4]

**ID:** `CO-CIE-6-2026-W06-reproduccion-asexual-008-v1`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Context:** En Manizales, analizan por qué los agricultores usan esquejes en lugar de semillas.

### Enunciado
¿Por qué un agricultor de café en Antioquia prefiere reproducir sus plantas por esquejes (asexual) en lugar de semillas (sexual)?

### Options
- [ ] A) Porque los esquejes son más baratos <!-- feedback: Incorrecto. El costo no es la razón principal. -->
- [ ] B) Porque las semillas no germinan en Colombia <!-- feedback: Incorrecto. Las semillas de café germinan bien. -->
- [x] C) Porque los esquejes garantizan que la nueva planta tenga exactamente las mismas características que la planta madre (rendimiento, sabor, resistencia) <!-- feedback: Correcto. La uniformidad genética es clave en agricultura comercial. -->
- [ ] D) Porque los esquejes crecen más lento y eso es mejor <!-- feedback: Incorrecto. Los esquejes pueden acelerar la producción. -->

### Explicación Pedagógica
En la agricultura comercial, la reproducción asexual (esquejes, injertos, tubérculos) ofrece ventajas importantes:
- **Uniformidad genética**: todas las plantas son clones, por lo que maduran al mismo tiempo, tienen el mismo rendimiento y calidad
- **Características fijas**: se preservan exactamente las cualidades deseadas (sabor, resistencia a plagas, tamaño del fruto)
- **Rapidez**: las plantas maduran más rápido que a partir de semillas
- **Productividad**: las plantas clonadas suelen producir más rápido

Ejemplos: café (esquejes y injertos en Colombia), banano (clones Cavendish), uvas (esquejes), manzanas (injertos), aguacates (injertos). La desventaja es que todas las plantas son vulnerables a las mismas enfermedades.

---

## Question 9 [D5]

**ID:** `CO-CIE-6-2026-W06-reproduccion-asexual-009-v1`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación
**Context:** En Cúcuta, evalúan el uso de la clonación en agricultura.

### Enunciado
¿Cuál de los siguientes es un argumento VÁLIDO en contra de la clonación de plantas?

### Options
- [ ] A) Las plantas clonadas no hacen fotosíntesis <!-- feedback: Incorrecto. Las plantas clonadas son normales y hacen fotosíntesis. -->
- [ ] B) Las plantas clonadas no producen frutos <!-- feedback: Incorrecto. Sí producen frutos. -->
- [x] C) La falta de variabilidad genética hace que toda la plantación sea vulnerable a una sola plaga o enfermedad <!-- feedback: Correcto. La uniformidad genética es un riesgo. -->
- [ ] D) Las plantas clonadas crecen al revés <!-- feedback: Incorrecto. No hay tal efecto. -->

### Explicación Pedagógica
El riesgo principal de la monocultura clonal se ha visto en la historia:
- La **Gran Hambruna Irlandesa** (1845-1852): las papas en Irlanda eran clones de una variedad (Lumper). Un hongo (Phytophthora infestans) que afectaba a una planta afectó a todas, causando la muerte de un millón de personas.
- El **banano Cavendish**: actualmente la mayoría del banano comercial es un solo clon. Un hongo (Fusarium oxysporum TR4) está amenazando su producción mundial.
- En Colombia, la **roya del café** (Hemileia vastatrix) ha afectado variedades susceptibles, impulsando el desarrollo de variedades resistentes como la Castillo.

Por eso los bancos de germoplasma (colecciones de variedades genéticas) son importantes para preservar diversidad y poder desarrollar nuevas variedades resistentes.

---

## Question 10 [D5]

**ID:** `CO-CIE-6-2026-W06-reproduccion-asexual-010-v1`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación
**Context:** En Ibagué, evalúan un caso de una bacteria resistente a antibióticos.

### Enunciado
Una bacteria resistente a antibióticos se reproduce por fisión binaria. ¿Por qué es preocupante para la salud pública?

### Options
- [ ] A) Porque las bacterias aprenden a evitar los antibióticos <!-- feedback: Incorrecto. No es aprendizaje consciente. -->
- [ ] B) Porque los antibióticos fortalecen a las bacterias <!-- feedback: Incorrecto. Los antibióticos matan la mayoría, pero las resistentes sobreviven. -->
- [x] C) Porque la fisión binaria produce clones idénticos rápidamente, por lo que una sola bacteria resistente puede generar millones de copias resistentes en pocas horas <!-- feedback: Correcto. La reproducción rápida propaga la resistencia. -->
- [ ] D) Porque las bacterias se vuelven inmortales <!-- feedback: Incorrecto. Siguen teniendo ciclo de vida. -->

### Explicación Pedagógica
La combinación de reproducción asexual rápida (fisión binaria) y resistencia a antibióticos crea un grave problema de salud:
- Una bacteria resistente puede dividirse cada 20-30 minutos
- En 12 horas, una bacteria genera más de 68 mil millones de descendientes (2³⁶), todos resistentes
- Si el paciente no completa el tratamiento, las bacterias resistentes sobreviven y se multiplican
- La próxima infección será resistente al antibiótico usado inicialmente

Para combatir esto: (1) completar siempre los tratamientos con antibióticos, (2) no automedicarse, (3) usar antibióticos solo cuando un médico los recete (las infecciones virales no se tratan con antibióticos), (4) desarrollar nuevos antibióticos.

En Colombia, la resistencia bacteriana es una prioridad de salud pública. El Ministerio de Salud tiene programas de vigilancia y control del uso de antibióticos.

---
'@

New-Bundle -Week "06" -Tema "reproduccion-asexual" -Periodo 2 -Titulo "Reproducción Asexual en Organismos" -Preguntas $w06

Write-Host "W06 created successfully"
