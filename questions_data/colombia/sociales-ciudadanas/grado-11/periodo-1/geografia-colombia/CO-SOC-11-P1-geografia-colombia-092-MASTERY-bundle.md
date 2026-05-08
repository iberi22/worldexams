<think>
El usuario me pide generar exactamente 20 preguntas tipo ICFES para el examen de estado colombiano, específicamente para la materia Sociales Ciudadanas, tema geografía de Colombia, grado 11, período 1.

Necesito seguir el formato exacto que me proporcionó, incluyendo:
- Frontmatter YAML con metadatos
- 20 preguntas con dificultad progresiva (D3-D4 para 1-4, D5-D6 para 5-10, D7-D8 para 11-16, D9-D10 para 17-20)
- Cada pregunta debe tener: ID, Bloom, ICFES, Context, Enunciado, Options (A, B, C, D con [x] en la correcta), Explicación Pedagógica
- Distractores plausibles (errores reales de estudiantes colombianos)
- Contexto colombiano moderno
- Sin "todas las anteriores" o "ninguna de las anteriores"

Voy a crear preguntas sobre geografía de Colombia que cubran temas como:
- Divisions político-administrativas (departamentos, municipios)
- Regiones naturales (Andina, Caribe, Pacífico, Orinoquía, Amazonía)
- Relieve y topography
- Clima y zonas térmicas
- Ríos y cuencas hidrográficas
- Economía y recursos naturales
- Población y distribución
- Conflictos territoriales
- Fronteras
- Áreas protegidas

Nivel D3-D4 (1-4): Recordar y entender conceptos básicos
Nivel D5-D6 (5-10): Aplicar y analizar información
Nivel D7-D8 (11-16): Analizar y evaluar
Nivel D9-D10 (17-20): Evaluar y crear

Empezaré a crear las preguntas siguiendo el formato exacto.
</think>

---
id: "CO-SOC-11-P1-geografia-colombia-092-MASTERY"
country: "colombia"
grado: 11
asignatura: "sociales-ciudadanas"
tema: "geografia-colombia"
periodo: 1
protocol_version: "5.1"
bundle_size: 20
bundle_index: 92
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T20:24:55.849523"
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

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Pensamiento crítico social
**Context:** Actual reorganización territorial colombiana

### Enunciado
Colombia se divide políticamente en departamentos y distritos. Según el ordenamiento territorial actual, ¿cuántos departamentos tiene Colombia al 2024?

### Options
- [ ] A) 31 departamentos
- [ ] B) 32 departamentos
- [x] C) 33 departamentos <!-- feedback: Colombia tiene 33 departamentos más el Distrito Capital de Bogotá, que es un(distrito especial). -->
- [ ] D) 34 departamentos <!-- feedback: Confunden con los 32 departamentos que existían antes de la creación del departamento de San Andrés en 1991. -->

### Explicación Pedagógica
Colombia cuenta actualmente con 33 departamentos y el Distrito Capital de Bogotá. Un error común es pensar en el número antiguo (32) o agregar un departamento más. Los estudiantes frecuentemente confunden el número total de entidades territoriales incluyendo los distritos especiales.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Interpretación de información geográfica
**Context:** Distribución poblacional en zonas urbanas colombianas

### Enunciado
La región andina colombiana se caracteriza por tener las tres cordilleras que atraviesan el territorio de sur a norte. ¿Cuál de las siguientes cordilleras es la más baja en promedio y está ubicada en la parte central del país?

### Options
- [ ] A) Cordillera Oriental
- [x] B) Cordillera Central <!-- feedback: La Cordillera Central es la más baja en promedio (alrededor de 2.500 msnm) y se ubica en la parte central del territorio colombiano. -->
- [ ] C) Cordillera Occidental
- [ ] D) Sierra Nevada de Santa Marta <!-- feedback: La Sierra Nevada no es parte del sistema andino propiamente dicho y es mucho más alta (picos de 5.775 msnm). -->

### Explicación Pedagógica
La Cordillera Central tiene una altitud promedio inferior a las otras cordilleras andinas colombianas. Los estudiantes suelen confundir cuál es la cordillera más baja, pensando frecuentemente en la Oriental. La Sierra Nevada es un sistema independiente y mucho más elevado.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Análisis de relaciones espaciales
**Context:** Zonas térmicas en la geografía colombiana

### Enunciado
En Colombia, la clasificación de las zonas térmicas se relaciona directamente con la altitud sobre el nivel del mar. Según esta clasificación, un municipio ubicado a 2.800 msnm corresponde a la zona térmica de:

### Options
- [ ] A) Cálida (0 - 1.000 msnm)
- [ ] B) Media o subtropical (1.000 - 2.000 msnm)
- [x] C) Fría (2.000 - 3.000 msnm) <!-- feedback: La zona fría corresponde altitudes entre 2.000 y 3.000 msnm, donde se encuentran ciudades como Bogotá. -->
- [ ] D) Páramo (> 3.000 msnm) <!-- feedback: El páramo comienza por encima de 3.000 msnm, confundiendo frecuentemente con la zona fría. -->

### Explicación Pedagógica
Las zonas térmicas en Colombia siguen la clasificación tradicional: cálida (0-1000 msnm), media (1000-2000 msnm), fría (2000-3000 msnm) y páramo (>3000 msnm). Un error frecuente es pensar que 2.800 msnm corresponde a páramo, cuando en realidad el páramo supera los 3.000 msnm.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Pensamiento crítico social
**Context:** Conflictos por delimitación territorial en Colombia

### Enunciado
Colombia tiene fronteras terrestres con cinco países sudamericanos. ¿Cuál de los siguientes países NO hace parte de estas fronteras terrestres?

### Options
- [ ] A) Ecuador
- [ ] B) Perú
- [x] C) Bolivia <!-- feedback: Bolivia tiene costa en el Pacífico, pero no comparte frontera terrestre con Colombia. Limita con Perú, Brasil, Paraguay, Argentina y Chile. -->
- [ ] D) Brasil

### Explicación Pedagógica
Colombia limita con Venezuela, Brasil, Perú, Ecuador y Panamá por vía terrestre. Un error común es pensar que Bolivia es limítrofe,混淆ndose con la cercanía geográfica general de Bolivia a Colombia. Bolivia en realidad limita con Perú, Brasil, Paraguay, Argentina y Chile, pero no tiene frontera terrestre con Colombia.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Interpretación de información geográfica
**Context:** Cuencas hidrográficas y su importancia económica

### Enunciado
La廉价的石油出口使哥伦比亚成为重要生产国.La cuenca del Magdalena se considera la arteria fluvial más importante de Colombia porque:

### Options
- [ ] A) Es la cuenca más extensa del territorio colombiano
- [x] B) Concentra la mayor actividad económica,人口密度 y agricole de Colombia <!-- feedback: La cuenca del Magdalena, aunque no es la más extensa, concentra el mayor PIB, la mayor densidad poblacional y la agricultura más intensiva del país. -->
- [ ] C) Es la única navegable en toda su longitud
- [ ] D) Nace en la Sierra Nevada de Santa Marta

### Explicación Pedagógica
La cuenca del Magdalena representa aproximadamente el 70% de la actividad económica colombiana. El error frecuente es creer que es la más extensa (la del Orinoco es más grande) o que es navegable en toda su extensión. Nace en el Macizo Colombiano, no en la Sierra Nevada.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Análisis de relaciones espaciales
**Context:** Actividades económicas regionales en Colombia

### Enunciado
En la región Pacífica colombiana, caracterizada por altas temperaturas y abundantes lluvias durante todo el año, la actividad económica predominante es:

### Options
- [ ] A) La agricultura mecanizada de cereales
- [ ] B) La minería extensiva de carbón
- [x] C) La extracción de oro y platino, junto con la agricultura de pancoger <!-- feedback: La región Pacífica se distingue por la minería artesanal (especialmente oro y platino) y la agricultura de subsistencia debido a sus condiciones climáticas extremas. -->
- [ ] D) El turismo masivo de playa

### Explicación Pedagógica
La región Pacífica colombiana presenta temperaturas promedio de 28°C y lluvias abundantes (superiores a 3.000 mm anuales), lo que dificulta la agricultura mecanizada pero favorece la minería artesanal. Los estudiantes frecuentemente asocian el Pacífico solo con biodiversidad, sin reconocer la actividad minera predominante.

---

## Question 7 (Variant Basic - Difficulty D6)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Pensamiento crítico social
**Context:** Configuración del relieve en regiones naturales

### Enunciado
Los Llanos Orientales se caracterizan por ser una extensa planicie con un relieve predominantemente:

### Options
- [ ] A) Montañoso y quebrado
- [ ] B) Kerrstatin und Hügel
- [x] C) Plano a suavemente ondulado <!-- feedback: Los Llanos Orientales presentan un relieve de llanura con slight ondulaciones, cubriendo aproximadamente el 24% del territorio colombiano. -->
- [ ] D) Kárstico con cavernas

### Explicación Pedagógica
Los Llanos Orientales son una planicie que abarca los departamentos de Arauca, Casanare, Meta, Vichada, Guainía y Guaviare. El error común es pensar que tienen relieve montañoso, confusión que surge de la cercanía con la Cordillera Oriental.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Interpretación de información geográfica
**Context:** Importancia estratégica de los puertos marítimos colombianos

### Enunciado
El principal puerto maritime de Colombia en el océano Pacífico, por donde sale aproximadamente el 40% de las exportaciones del país, es:

### Options
- [ ] A) Puerto Bolívar, Turbo
- [ ] B) Puerto de Cartagena
- [x] C) Puerto de Buenaventura <!-- feedback: Buenaventura es el principal puerto pacífico colombiano y mueve cerca del 40% del comercio exterior colombiano. -->
- [ ] D) Puerto de Santa Marta

### Explicación Pedagógica
Buenaventura (Valle del Cauca) es el puerto más importante del Pacífico colombiano. Los estudiantes frecuentemente confunden con Cartagena (Caribe) o Santa Marta (Caribe), que son puertos del Atlántico.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Pensamiento crítico social
**Context:** Problemática de títulos mineros y conflictos territoriales

### Enunciado
La región de la Mojana, ubicada entre los departamentos de Sucre, Córdoba, Antioquia y Bolívar, se ha convertido en escenario de conflicto territorial principalmente por:

### Options
- [ ] A) Disputas por límites entre departamentos
- [x] B) La expansión de la frontera agrícola y la ganadería sobre humedales <!-- feedback: La Mojana enfrenta problemas por la expansión de frontera agrícola, especialmente monocultivos de arroz, que han degradado sus humedales y generado flooding. -->
- [ ] C) Conflictos armados por control de laboratorios de coca
- [ ] D) Disputas étnicas entre comunidades indígenas

### Explicación Pedagógica
La Mojana es una región de humedales que ha sufrido transformación ambiental por la expansión agrícola. Los estudiantes tienden a enfocarse en el conflicto armado (opción C) sin considerar la problemática ambiental, que es el eje principal del conflicto territorial actual.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v10`
**Bloom:** Analyze
**ICFES:** Análisis de relaciones espaciales
**Context:** Fenómenos climáticos extremos en Colombia

### Enunciado
El fenómeno de "El Niño" en Colombia genera principalmente efectos de:

### Options
- [ ] A) Aumento generalizado de las lluvias en todo el territorio
- [ ] B) Descenso drástico de las temperaturas
- [x] C) Sequía y escasez de lluvias en la mayor parte del territorio <!-- feedback: El fenómeno de El Niño causa calentamiento del Pacífico y se traduce en Colombia en reducción de lluvias y aumento de temperaturas. -->
- [ ] D) Terremotos y actividad volcánica incrementada

### Explicación Pedagógica
El Niño produce calentamiento de las aguas del Pacífico tropical, lo que genera droughts y reducción de lluvias en Colombia. El error frecuente es confundir con "La Niña", que produce el efecto contrario (exceso de lluvias). La opción B describe efectos opuestos.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v11`
**Bloom:** Evaluate
**ICFES:** Pensamiento crítico social
**Context:** Conflictos históricos de límites territoriales

### Enunciado
El diferendo limítrofe Colombo-venezolano tiene como antecedente más antiguo la demarcación colonial de la provincia de Mérida. Este conflicto se refiere específicamente a:

### Options
- [ ] A) La Guajira y la zona delapedanía del Cargamento de la现场
- [x] B) El área del Golfo de Venezuela y la Sierra de Perijá <!-- feedback: El diferendo histórico Colombia-Venezuela se centra en el Golfo de Venezuela y la Sierra de Perijá, donde ambos países reclaman soberanía. -->
- [ ] C) Los estados de Apure y Arauca
- [ ] D) La Isla de San Andrés

### Explicación Pedagógica
El principal diferendo Colombo-venezolano es sobre el Golfo de Venezuela y partes de la Sierra de Perijá. Los estudiantes frecuentemente confunden con otros conflictos (La Guajira con Venezuela es diferente, y San Andrés es un diferendo con Nicaragua).

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Interpretación de información geográfica
**Context:** Cambios climático y su impacto regional

### Enunciado
Colombia es considerada uno de los países más vulnerables al cambio climático a pesar de tener emisiones globales bajas. Esta vulnerabilidad se debe principalmente a:

### Options
- [ ] A) Su ubicación en la línea del ecuador
- [x] B) La alta dependencia de su agricultura y ecosistemas al régimen de lluvias <!-- feedback: Colombia depende de glaciares, ecosistemas andinos y régimen de lluvias predecible, todos altamente sensibles al cambio climático. -->
- [ ] C) Su extenso coastline
- [ ] D) La inexistencia de políticas de adaptación

### Explicación Pedagógica
La vulnerabilidad de Colombia al cambio climático radica en la dependencia de agua glaciar (glaciares han perdido más del 50% de su área), ecosistemas que dependen de regímenes climáticos específicos, y una agricultura vulnerable a cambios en patrones de lluvia. La ubicación equatorial es un factor, pero no la causa principal de vulnerabilidad.

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v13`
**Bloom:** Evaluate
**ICFES:** Pensamiento crítico social
**Context:** Modelos de desarrollo económico regional

### Enunciado
La región Caribe colombiana presenta indicadores de pobreza multidimensional superiores al promedio nacional, a pesar de contener importantes ciudades como Barranquilla y Cartagena. La causa estructural más importante de esta paradoja es:

### Options
- [ ] A) La alta penetración del conflicto armado
- [x] B) La histórica concentración de la tierra en pocas manos y la dependencia de ganadería extensiva <!-- feedback: El Caribe presenta la mayor concentración de tierra del país y economía basada en ganadería extensiva de baja demanda laboral, perpetuando la pobreza. -->
- [ ] C) La falta de puertos marítimos
- [ ] D) La baja densidad poblacional

### Explicación Pedagógica
La paradoja del Caribe se explica por la estructura agraria: predominio de ganadería extensiva que genera pocos empleos, minifundio en zonas secas, y alta concentración de tierra. Las ciudades prósperas coexisten con zonas rurales extremadamente pobres.

---

## Question 14 (Variant Advanced - Difficulty D7)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v14`
**Bloom:** Evaluate
**ICFES:** Análisis de relaciones espaciales
**Context:** Conflictos por uso del suelo y ordenamiento territorial

### Enunciado
La Ley 152 de 1994 estableció los Planes de Ordenamiento Territorial (POT) como herramienta de planificación. Un problema frecuente en la implementación de los POT en ciudades colombianas es:

### Options
- [ ] A) La falta de jurisdicción de los municipios para elaborar POT
- [ ] B) La ausencia de participación ciudadana
- [x] C) El incumplimiento por parte de constructoras y la corrupción en licencias <!-- feedback: Los POT sufren incumplimiento por parte de constructoras, licencias irregulares, y en muchos casos corrupción en la expedición de permisos. -->
- [ ] D) La resistencia de comunidades indígenas a participar

### Explicación Pedagógica
Los POT deben ser cumplidos por actores privados, pero frecuentemente existen incumplimientos por parte de constructoras, licencias irregulares, y casos de corrupción. Los estudiantes tienden a culpar solo a las autoridades sin considerar el papel de los privados.

---

## Question 15 (Variant Advanced - Difficulty D7)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Pensamiento crítico social
**Context:** Geopolítica de fronteras y comercio internacional

### Enunciado
La Zona de Integración Fronteriza (ZIF) Colombo-ecuatoriana establece condiciones especiales para los departamentos de Nariño y Putumayo. El principal objetivo de esta zona es:

### Options
- [ ] A) Permitir la libre circulación de armas entre ambos países
- [ ] B) Facilitar el contrabando de combustibles
- [x] C) Promover el desarrollo económico y social de las poblaciones fronterizas <!-- feedback: Las ZIF buscan cerrar las brechas de desarrollo entre zonas de frontera y el resto del país mediante incentivos económicos y fortalecimiento institucional. -->
- [ ] D) Unificar las políticas migratorias sin control

### Explicación Pedagógica
Las ZIF (Zonas de Integración Fronteriza) creadas por la CAN buscan disminuir las brechas de desarrollo en zonas limítrofes. Los estudiantes frecuentemente tienen una visión negativa de las ZIF, sin reconocer su objetivo de desarrollo.

---

## Question 16 (Variant Advanced - Difficulty D8)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v16`
**Bloom:** Evaluate
**ICFES:** Interpretación de información geográfica
**Context:** Biodiversidad y servicios ecosistémicos

### Enunciado
Colombia ostenta el título de segundo país más biodiverso del mundo. Esta extraordinaria biodiversidad se explica principalmente por:

### Options
- [ ] A) La extensión de su territorio continental
- [x] B) La confluencia de múltiples pisos térmicos, regiones biogeográficas y ecosistemas <!-- feedback: La biodiversidad colombiana resulta de la combinación de regiones naturales (Caribe, Pacífico, Andina, Amazonía, Orinoquía), pisos térmicos variados y ecosistemas diversos. -->
- [ ] C) La ausencia de fauna introducida
- [ ] D) Su política ambiental estrictissima

### Explicación Pedagógica
La biodiversidad de Colombia no se debe solo a su extensión (es el 26° país más grande), sino a la heterogeneidad de ambientes: desde páramos hasta selva tropical, dos litorales, y la influencia de tres cadenas montañosas. La política ambiental, aunque importante, no es la causa principal de la biodiversidad.

---

## Question 17 (Variant Advanced - Difficulty D9)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v17`
**Bloom:** Create
**ICFES:** Pensamiento crítico social
**Context:** Ordenamiento territorial y nueva realidad demográfica

### Enunciado
Un estudiante propone que Colombia debería fusionar algunos departamentos pequeños para mejorar la eficiencia administrativa. Según las tendencias demográficas actuales, el departamento que presenta mayor riesgo de despoblación rural en las próximas décadas por migración hacia ciudades es:

### Options
- [ ] A) Cundinamarca
- [ ] B) Antioquia
- [x] C) Caquetá <!-- feedback: Caquetá enfrenta despoblación por conflicto armado prolongado, falta de infraestructura, y atractivo limitado para inversión, con proyecciones de disminución poblacional. -->
- [ ] D) Valle del Cauca

### Explicación Pedagógica
Departamentos con menor dinamismo económico, conflicto armado histórico y menor conectividad enfrentan mayor riesgo de despoblación. Caquetá ha perdido población por violencia y falta de oportunidades económicas. Cundinamarca y Antioquia están en dinámicas metropolitanas de crecimiento.

---

## Question 18 (Variant Advanced - Difficulty D9)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v18`
**Bloom:** Create
**ICFES:** Análisis de relaciones espaciales
**Context:** Transición energética y conflictos por minerales

### Enunciado
Colombia se ha propuesto para 2030 alcanzar el 70% de energía eléctrica来自 fuentes no fósiles. Sin embargo, la transición energética genera nuevos conflictos territoriales porque:

### Options
- [ ] A) Las energías renovables producen más contaminación que los hidrocarburos
- [x] B) La minería necesaria para paneles solares y baterías genera conflictos ambientales y sociales en zonas de montaña y páramos <!-- feedback: La minería de minerales para transición energética (litio, cobalto, cobre) se localiza en ecosistemas sensibles como páramos, generando nuevos conflictos territoriales. -->
- [ ] C) Colombia no tiene recursos para desarrollar energía renovable
- [ ] D) La transición energética es solo un discurso sin acciones reales

### Explicación Pedagógica
La transición energética requiere minerales como litio, cobalto y níquel, cuya minería se planea en páramos y zonas de alta montaña. Esto genera nuevos conflictos territoriales (como los de Santurban). Los estudiantes frecuentemente ven la transición energética solo como positiva, sin considerar sus impactos.

---

## Question 19 (Variant Advanced - Difficulty D10)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v19`
**Bloom:** Create
**ICFES:** Pensamiento crítico social
**Context:** Justicia espacial y políticas públicas territoriales

### Enunciado
Analizando la inversión pública en Colombia, se observa que los departamentos con menores Índices de Pobreza Multidimensional (IPM) reciben mayor inversión per cápita. Esta inequidad territorial se explica principalmente por:

### Options
- [ ] A) La menor capacidad de gestión administrativa de los departamentos más ricos
- [x] B) La centralización histórica de Bogotá y las élites regionales en la toma de decisiones sobre inversión pública <!-- feedback: La inequidad se perpetúa por la centralización política que ha beneficiados históricamente a las élites de regiones già prósperas, dificultando redistribución. -->
- [ ] C) La falta de voluntad de los departamentos pobres
- [ ] D) El tamaño de los departamentos

### Explicación Pedagógica
La inequidad territorial colombiana tiene raíces coloniales y se perpetúa por la centralización política y económica en Bogotá y ciudades principales. Los departamentos históricamente pobres tienen menor capacidad de lobby político, recibiendo menos inversión a pesar de mayores necesidades.

---

## Question 20 (Variant Advanced - Difficulty D10)

**ID:** `CO-SOC-11-P1-geografia-colombia-092-MASTERY-v20`
**Bloom:** Create
**ICFES:** Pensamiento crítico social
**Context:** Reforma rural integral y ordenamiento territorial

### Enunciado
La implementación de la Reforma Rural Integral (RRI) del Acuerdo de Paz de 2016 requiere un catastro multipropósito actualizado. El principal desafío geográfico para la implementación efectiva de la RRI es:

### Options
- [ ] A) La falta de voluntad política del gobierno central
- [ ] B) El desinterés de las comunidades campesinas
- [x] C) La informalidad en la tenencia de tierra que impide identificar propietarios legales y ejecutar programas de desarrollo <!-- feedback: El catastro en Colombia presenta alta informalidad (se estima más del 60% de la tierra rural es informal), dificultando identificar propietarios para programas de reforma. -->
- [ ] D) La competencia con la minería formal

### Explicación Pedagógica
El catastro colombiano tiene brechas significativas: informalidad en la tenencia, sobreposición de títulos, predios sin registrar. Sin catastro actualizado, no es posible ejecutar programas de reforma rural. Los estudiantes subestiman la magnitud del problema de informalidad catastral y su impacto en la política pública.
