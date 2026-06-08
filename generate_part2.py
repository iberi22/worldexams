#!/usr/bin/env python3
"""Generate ALL weekly bundles W09-W40 (skipping W11,W12) for Ciencias Naturales Grado 6."""

import os

BASE = r"E:\scripts-python\worldexams\questions_data\colombia\ciencias-naturales\grado-6\2026\weekly"
EXISTING = {"W11", "W12"}

def make_bundle(week, tema, periodo, titulo, content):
    if week in EXISTING:
        print(f"Skipping {week} (exists)")
        return
    wnum = week.replace('W', '')
    fn = f"CO-CIE-6-2026-{week}-{tema}-001-MASTERY-bundle.md"
    header = f"""\
---
id: "CO-CIE-6-2026-{week}-{tema}-001-MASTERY"
country: "colombia"
grado: 6
asignatura: "ciencias-naturales"
tema: "{tema}"
periodo: {periodo}
week: {wnum}
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 10
bundle_size: 10
alignment: "DBA MEN + Estándares Básicos Grado 6"
---

# Weekly Pack {week} — {titulo}

**Grado:** 6° | **Periodo:** {periodo} | **Semana:** {wnum} | **Año:** 2026

---

"""
    full = header + content.strip()
    path = os.path.join(BASE, fn)
    with open(path, 'w', encoding='utf-8') as f:
        f.write(full)
    print(f"Created: {fn}")

# ================================================================
# Now define all content inline - each as a raw triple-quoted string
# ================================================================

W09_CONTENT = r"""
## Question 1 [D1]

**ID:** `CO-CIE-6-2026-W09-ecosistemas-colombianos-001-v1`
**Bloom:** Remember
**ICFES:** Comunicación y Representación
**Context:** En Bogotá, los estudiantes inician el estudio de los ecosistemas colombianos.

### Enunciado
¿Qué es un bioma?

### Options
- [ ] A) Un tipo de clima específico <!-- feedback: Incorrecto. El clima es parte del bioma, pero no es el bioma en sí. -->
- [ ] B) Un conjunto de poblaciones de una sola especie <!-- feedback: Incorrecto. Eso es una población. -->
- [x] C) Un conjunto de ecosistemas con características climáticas y biológicas similares en una región extensa <!-- feedback: Correcto. Un bioma es una gran comunidad ecológica. -->
- [ ] D) El lugar físico donde vive un organismo <!-- feedback: Incorrecto. Eso es el hábitat. -->

### Explicación Pedagógica
Un **bioma** es una gran área geográfica que comparte clima, flora y fauna característicos. Los principales biomas de Colombia incluyen: (1) selva tropical (Amazonía y Chocó), (2) bosque seco tropical (Costa Caribe), (3) páramo (alta montaña andina), (4) sabana (Llanos Orientales), (5) manglar (costas Pacífica y Caribe), (6) bosque andino (cordilleras), (7) desierto (La Guajira), (8) arrecifes de coral (Caribe). Colombia es uno de los países con mayor diversidad de biomas en el mundo, debido a su ubicación ecuatorial y su compleja topografía.

---

## Question 2 [D1]

**ID:** `CO-CIE-6-2026-W09-ecosistemas-colombianos-002-v1`
**Bloom:** Remember
**ICFES:** Comunicación y Representación
**Context:** En Medellín, identifican los biomas colombianos en un mapa interactivo.

### Enunciado
¿Cuál es el bioma más extenso de Colombia?

### Options
- [ ] A) El páramo <!-- feedback: Incorrecto. Aunque importantes, los páramos cubren menos del 3% del territorio. -->
- [ ] B) El desierto de La Guajira <!-- feedback: Incorrecto. El desierto es una pequeña porción del territorio. -->
- [x] C) La selva amazónica <!-- feedback: Correcto. La Amazonía cubre aproximadamente el 35% del territorio colombiano. -->
- [ ] D) Los Llanos Orientales <!-- feedback: Incorrecto. Los Llanos cubren alrededor del 20%. -->

### Explicación Pedagógica
La **selva amazónica** es el bioma más extenso de Colombia, ocupando aproximadamente 400,000 km² (35% del territorio nacional). Se encuentra en los departamentos de Amazonas, Caquetá, Guainía, Guaviare, Putumayo, Vaupés y Vichada. Es la selva tropical más grande del mundo (compartida con Perú, Brasil, Ecuador, Venezuela, Bolivia, Guyana, Surinam y Guyana Francesa) y alberga la mayor biodiversidad del planeta. En Colombia, la Amazonía está habitada por más de 50 pueblos indígenas que hablan 22 familias lingüísticas diferentes.

---

## Question 3 [D2]

**ID:** `CO-CIE-6-2026-W09-ecosistemas-colombianos-003-v1`
**Bloom:** Understand
**ICFES:** Comunicación y Representación
**Context:** En Cali, comparan características del bosque seco tropical y la selva húmeda.

### Enunciado
¿Qué diferencia al bosque seco tropical de la selva húmeda tropical?

### Options
- [ ] A) El bosque seco tiene árboles más altos <!-- feedback: Incorrecto. La selva húmeda tiene árboles más altos. -->
- [ ] B) El bosque seco tiene más lluvia <!-- feedback: Incorrecto. El bosque seco tiene menos lluvia. -->
- [x] C) El bosque seco tiene una temporada seca pronunciada donde los árboles pierden las hojas; la selva húmeda tiene lluvias todo el año <!-- feedback: Correcto. La estacionalidad define la diferencia. -->
- [ ] D) El bosque seco tiene mayor biodiversidad <!-- feedback: Incorrecto. La selva húmeda tiene mayor biodiversidad. -->

### Explicación Pedagógica
El **bosque seco tropical** (BST) es un ecosistema que recibe entre 700 y 1,500 mm de lluvia al año, con una temporada seca de 4-6 meses donde los árboles pierden sus hojas (caducifolios) para conservar agua. En Colombia, el BST se encuentra principalmente en la Costa Caribe (Tolima, Huila, Bolívar, Cesar, La Guajira) y los valles interandinos. Está críticamente amenazado: solo queda el 8% de su cobertura original en Colombia, siendo uno de los ecosistemas más degradados del país. En contraste, la selva húmeda recibe más de 2,000 mm anuales con vegetación siempre verde.

---

## Question 4 [D2]

**ID:** `CO-CIE-6-2026-W09-ecosistemas-colombianos-004-v1`
**Bloom:** Understand
**ICFES:** Comunicación y Representación
**Context:** En Barranquilla, estudian los manglares del Caribe colombiano.

### Enunciado
¿Por qué los manglares son importantes para las comunidades costeras?

### Options
- [ ] A) Porque producen madera para construir casas <!-- feedback: Incorrecto. Su madera no es de buena calidad y talarlos los destruye. -->
- [ ] B) Porque son buenos para hacer paseos en lancha <!-- feedback: Incorrecto. El turismo es secundario a su función ecológica. -->
- [x] C) Porque protegen la costa de la erosión, son criaderos de peces y crustáceos, y filtran contaminantes <!-- feedback: Correcto. Los manglares proveen múltiples servicios ecosistémicos. -->
- [ ] D) Porque producen agua dulce <!-- feedback: Incorrecto. Los manglares viven en agua salada. -->

### Explicación Pedagógica
Los **manglares** son ecosistemas de transición entre tierra y mar, dominados por árboles adaptados al agua salada (halófitos). En Colombia se encuentran en ambas costas (Pacífico y Caribe) y sus funciones son vitales:
- **Protección costera**: las raíces retienen sedimentos y reducen la erosión por oleaje
- **Criadero natural**: el 90% de las especies marinas comerciales pasan parte de su ciclo en manglares
- **Secuestro de carbono**: los manglares almacenan 3-5 veces más carbono que los bosques terrestres
- **Filtración**: atrapan contaminantes antes de que lleguen al mar
- **Biodiversidad**: albergan especies como el cangrejo azul, la garza, el manatí y el cocodrilo

Colombia tiene aproximadamente 380,000 hectáreas de manglar, principalmente en el Pacífico (Chocó, Nariño, Cauca, Valle). Están amenazados por la deforestación para agricultura y acuicultura (camarones).

---

## Question 5 [D3]

**ID:** `CO-CIE-6-2026-W09-ecosistemas-colombianos-005-v1`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Context:** En Bucaramanga, identifican ecosistemas por sus características.

### Enunciado
Un estudiante visita un lugar con pastizales extensos, árboles dispersos, clima cálido con estación seca y lluviosa, y ve ganado y venados. ¿En qué ecosistema está?

### Options
- [ ] A) Selva amazónica <!-- feedback: Incorrecto. En la selva hay árboles densos y altos, no pastizales. -->
- [ ] B) Páramo <!-- feedback: Incorrecto. En el páramo hace frío y hay frailejones. -->
- [x] C) Llanos Orientales (sabana) <!-- feedback: Correcto. La descripción corresponde a los Llanos Orientales. -->
- [ ] D) Manglar <!-- feedback: Incorrecto. Los manglares están en la costa. -->

### Explicación Pedagógica
Los **Llanos Orientales** son una extensa sabana (aproximadamente 250,000 km²) que cubre los departamentos de Arauca, Casanare, Meta y Vichada. Características: (1) clima cálido (27°C promedio), (2) lluvias estacionales (mayo-octubre), (3) vegetación de pastizales con morichales y matas de monte (bosques de galería a lo largo de ríos), (4) fauna: venado cola blanca, chigüiro (capibara), babilla, oso hormiguero, aves como el garzón soldado. Los Llanos son el corazón de la ganadería extensiva colombiana y también tienen ricos yacimientos de petróleo.

---

## Question 6 [D3]

**ID:** `CO-CIE-6-2026-W09-ecosistemas-colombianos-006-v1`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Context:** En Cartagena, relacionan animales con sus ecosistemas.

### Enunciado
¿Cuál de estos animales es característico de la selva amazónica colombiana?

### Options
- [ ] A) El flamenco del Caribe <!-- feedback: Incorrecto. El flamenco vive en la costa Caribe. -->
- [ ] B) El frailejón <!-- feedback: Incorrecto. El frailejón es una planta, no un animal, y vive en páramos. -->
- [x] C) El delfín rosado (inia geoffrensis) <!-- feedback: Correcto. El delfín rosado es un símbolo de la Amazonía. -->
- [ ] D) El cóndor de los Andes <!-- feedback: Incorrecto. El cóndor vive en páramos y altas montañas. -->

### Explicación Pedagógica
El **delfín rosado del Amazonas** (Inia geoffrensis) es un cetáceo de agua dulce que habita en los ríos de la cuenca amazónica. Es el delfín de río más grande del mundo (hasta 2.5 m y 150 kg). Es de color rosado (los machos más que las hembras, por capilares cercanos a la piel). Su cuello flexible le permite girar la cabeza 180° para navegar entre árboles inundados. Está amenazado por la contaminación (mercurio de la minería ilegal), la construcción de represas y la pesca incidental. Es un símbolo de la Amazonía colombiana y atrae turismo a Leticia y Puerto Nariño.

---

## Question 7 [D4]

**ID:** `CO-CIE-6-2026-W09-ecosistemas-colombianos-007-v1`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Context:** En Pereira, analizan la deforestación en la Amazonía colombiana.

### Enunciado
¿Cuál es la principal causa de deforestación en la Amazonía colombiana?

### Options
- [ ] A) La construcción de ciudades <!-- feedback: Incorrecto. Las ciudades ocupan un área pequeña en la Amazonía. -->
- [ ] B) El turismo <!-- feedback: Incorrecto. El turismo no es una causa significativa de deforestación. -->
- [x] C) La ganadería extensiva, la minería ilegal y los cultivos ilícitos <!-- feedback: Correcto. Estas actividades son los principales motores de deforestación. -->
- [ ] D) Los incendios forestales naturales <!-- feedback: Incorrecto. La mayoría de incendios en la Amazonía son provocados por humanos. -->

### Explicación Pedagógica
La deforestación en la Amazonía colombiana es un grave problema ambiental. Según el IDEAM, en 2023 se deforestaron más de 70,000 hectáreas. Las causas principales son:
1. **Ganadería extensiva**: tala del bosque para crear pastizales. Es la causa principal (40-50% de la deforestación).
2. **Minería ilegal**: especialmente minería de oro que usa mercurio, contaminando ríos y bosques. Afecta principalmente a los departamentos de Guainía, Vaupés y Caquetá.
3. **Cultivos ilícitos** (coca): la expansión de cultivos de coca implica tala del bosque, y el procesamiento de cocaína contamina ríos con químicos.
4. **Infraestructura**: carreteras que fragmentan el bosque y facilitan la colonización.

La deforestación libera CO₂, destruye hábitats, amenaza pueblos indígenas y altera los patrones de lluvia.

---

## Question 8 [D4]

**ID:** `CO-CIE-6-2026-W09-ecosistemas-colombianos-008-v1`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Context:** En Manizales, analizan la importancia de los corredores biológicos.

### Enunciado
¿Qué es un corredor biológico y por qué es importante?

### Options
- [ ] A) Un camino para que los turistas caminen en el bosque <!-- feedback: Incorrecto. No es un sendero turístico. -->
- [ ] B) Una carretera que conecta parques naturales <!-- feedback: Incorrecto. Las carreteras fragmentan, no conectan. -->
- [x] C) Una franja de vegetación que conecta dos áreas naturales protegidas, permitiendo el movimiento de animales y el flujo genético entre poblaciones <!-- feedback: Correcto. Los corredores mantienen la diversidad genética. -->
- [ ] D) Un río que atraviesa un bosque <!-- feedback: Incorrecto. Los ríos pueden ser barreras, no necesariamente corredores. -->

### Explicación Pedagógica
Los **corredores biológicos** son áreas de hábitat natural que conectan dos o más áreas protegidas, permitiendo que los organismos se desplacen entre ellas. Son importantes porque:
- Contrarrestan la **fragmentación** del hábitat (carreteras, cultivos, ciudades dividen los ecosistemas)
- Permiten el **flujo genético** entre poblaciones aisladas, evitando la endogamia
- Facilitan la **migración** de especies (importante con el cambio climático)
- Permiten la recolonización tras extinciones locales

Ejemplo en Colombia: el Corredor del Oso de Anteojos en los Andes conecta poblaciones de esta especie amenazada. También hay iniciativas para conectar la Amazonía con la Cordillera Oriental.

---

## Question 9 [D5]

**ID:** `CO-CIE-6-2026-W09-ecosistemas-colombianos-009-v1`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación
**Context:** En Cúcuta, evalúan proyectos de conservación.

### Enunciado
Un proyecto propone reforestar 100 hectáreas de bosque seco tropical en el Caribe colombiano. ¿Cuál es la mejor razón para apoyar este proyecto?

### Options
- [ ] A) Para tener más árboles que den sombra <!-- feedback: Incorrecto. La sombra es un beneficio menor. -->
- [ ] B) Para que los turistas tengan un lago para nadar <!-- feedback: Incorrecto. Los lagos no son el objetivo de la reforestación. -->
- [x] C) Porque el bosque seco tropical es uno de los ecosistemas más amenazados de Colombia (solo queda el 8%), y su restauración recupera biodiversidad, protege el suelo y regula el agua <!-- feedback: Correcto. La restauración ecológica tiene múltiples beneficios. -->
- [ ] D) Para talar los árboles y vender la madera <!-- feedback: Incorrecto. Talar los árboles va en contra del propósito de reforestar. -->

### Explicación Pedagógica
La restauración del **bosque seco tropical** es una prioridad de conservación en Colombia porque:
1. Es el ecosistema más amenazado del país: solo queda el 8% de su cobertura original
2. Alberga especies endémicas (que solo viven allí) como el tití cabeciblanco (Saguinus oedipus)
3. Es crítico para la regulación hídrica en regiones con sequía estacional
4. Protege el suelo de la erosión en zonas de ladera
5. Captura carbono y mitiga el cambio climático
6. Provee recursos para comunidades locales (madera, frutos, medicina)

Ejemplos: la restauración del bosque seco en el Parque Nacional Natural Tayrona y en el Jardín Botánico de Barranquilla son modelos exitosos. En el marco de la restauración ecológica participan comunidades, ONG y el gobierno.

---

## Question 10 [D5]

**ID:** `CO-CIE-6-2026-W09-ecosistemas-colombianos-010-v1`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación
**Context:** En Ibagué, evalúan la minería ilegal en ecosistemas colombianos.

### Enunciado
¿Por qué la minería ilegal de oro con mercurio es especialmente dañina para los ecosistemas colombianos?

### Options
- [ ] A) Porque el mercurio es caro de producir <!-- feedback: Incorrecto. El costo no es el problema principal. -->
- [ ] B) Porque contamina el aire con un mal olor <!-- feedback: Incorrecto. El olor no es el principal impacto. -->
- [x] C) Porque el mercurio se acumula en los organismos (bioacumulación) y contamina ríos, peces y suelos, afectando la salud humana y la biodiversidad por décadas <!-- feedback: Correcto. El mercurio es un contaminante persistente. -->
- [ ] D) Porque la minería ilegal usa mucha electricidad <!-- feedback: Incorrecto. La electricidad no es el recurso principal usado. -->

### Explicación Pedagógica
La minería ilegal de oro con mercurio es una de las mayores amenazas ambientales en Colombia:
1. **Contaminación por mercurio**: el mercurio se usa para separar el oro del sedimento. Se libera a ríos y la atmósfera.
2. **Bioacumulación**: el mercurio se convierte en metilmercurio (altamente tóxico) y se acumula en los tejidos de los organismos. Los peces lo concentran, y los humanos que los consumen (especialmente comunidades indígenas en la Amazonía) sufren intoxicación.
3. **Deforestación**: se talan bosques para acceder a los depósitos de oro.
4. **Sedimentación**: el lavado de grandes cantidades de tierra enturbia los ríos.
5. **Conflictos sociales**: la minería ilegal está asociada a grupos armados, explotación laboral y trata de personas.

Se estima que Colombia libera 50-100 toneladas de mercurio al año, siendo el mayor contaminador per cápita del mundo. El Convenio de Minamata (2013) busca reducir el uso de mercurio en la minería.

---
"""

for name, content in [("W09", W09_CONTENT)]:
    if name == "W09":
        make_bundle("W09", "ecosistemas-colombianos", 3, "Ecosistemas Colombianos - Selvas y Bosques", content)
print("W09 done")
