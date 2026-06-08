#!/usr/bin/env python3
"""
Generate weekly bundles SOCIALES CIUDADANAS Colombia Grado 4 W08-W40 (33 bundles)
Follows exact format of existing W01-W07 bundles.
"""

import json, os

OUT_DIR = os.path.dirname(os.path.abspath(__file__))

def slug(s):
    return s.lower().replace(" ", "-").replace("á","a").replace("é","e").replace("í","i").replace("ó","o").replace("ú","u").replace("ü","u").replace("ñ","n").replace(":","").replace(",","").replace("(","").replace(")","").replace("ú","u")

WEEKS = [
    ("W08", "Organización territorial: veredas, corregimientos, municipios", "Organización territorial colombiana: veredas, corregimientos y municipios como entidades básicas de la división político-administrativa"),
    ("W09", "Departamentos de Colombia", "Los departamentos como unidades territoriales de Colombia, su concepto, cuántos son y cómo se organizan"),
    ("W10", "Capitales de departamento (región Andina)", "Capitales de los departamentos de la región Andina de Colombia: identificación y ubicación"),
    ("W11", "Capitales de departamento (región Caribe, Pacífico)", "Capitales de los departamentos de las regiones Caribe y Pacífico de Colombia"),
    ("W12", "Repaso P2", "Repaso del segundo período: organización territorial, departamentos y capitales de Colombia"),
    ("W13", "El Gobierno Nacional (presidente, ministros)", "El Gobierno Nacional de Colombia: el presidente de la República, los ministros y sus funciones"),
    ("W14", "Autoridades municipales (alcalde y concejo)", "Autoridades del municipio colombiano: el alcalde y el concejo municipal, sus roles y funciones"),
    ("W15", "Autoridades departamentales (gobernador y asamblea)", "Autoridades del departamento colombiano: el gobernador y la asamblea departamental"),
    ("W16", "La descentralización en Colombia", "La descentralización administrativa en Colombia: cómo se distribuye el poder entre nación, departamento y municipio"),
    ("W17", "Repaso P3", "Repaso del tercer período: gobierno nacional, autoridades municipales y departamentales, descentralización"),
    ("W18", "Mecanismos de participación (voto, plebiscito, referendo)", "Mecanismos de participación ciudadana en Colombia: el voto, el plebiscito y el referendo"),
    ("W19", "El sufragio y la democracia", "El sufragio como derecho y deber ciudadano, y su relación con la democracia en Colombia"),
    ("W20", "Repaso general", "Repaso general del año escolar: conceptos fundamentales de sociales y ciudadanas"),
    ("W21", "Patrimonio cultural material de Colombia", "El patrimonio cultural material colombiano: monumentos, sitios históricos, museos y arquitectura"),
    ("W22", "Patrimonio cultural inmaterial (carnavales, fiestas)", "El patrimonio cultural inmaterial de Colombia: carnavales, fiestas tradicionales, música y danzas"),
    ("W23", "Grupos étnicos: indígenas colombianos", "Los pueblos indígenas de Colombia: diversidad cultural, territorios y costumbres"),
    ("W24", "Grupos étnicos: afrocolombianos y ROM", "Comunidades afrocolombianas y del pueblo ROM (gitano) en Colombia: cultura y aportes"),
    ("W25", "Repaso P4", "Repaso del cuarto período: patrimonio cultural, grupos étnicos y diversidad colombiana"),
    ("W26", "La Constitución Política de 1991 (derechos)", "La Constitución Política de Colombia de 1991: los derechos fundamentales, sociales y colectivos"),
    ("W27", "La Constitución: deberes y mecanismos de protección", "La Constitución colombiana: deberes ciudadanos y mecanismos de protección de derechos (tutela, acción popular)"),
    ("W28", "Las ramas del poder público", "Las ramas del poder público en Colombia: ejecutiva, legislativa y judicial, sus funciones y sedes"),
    ("W29", "Repaso P5", "Repaso del quinto período: Constitución Política de 1991, derechos, deberes y ramas del poder"),
    ("W30", "Fechas patrias (20 de julio, independencia)", "El 20 de julio como fecha patria: el grito de Independencia de Colombia de 1810"),
    ("W31", "Fechas patrias (7 de agosto, Batalla de Boyacá)", "El 7 de agosto como fecha patria: la Batalla de Boyacá de 1819 y la Independencia definitiva"),
    ("W32", "Diversidad cultural de Colombia", "La diversidad cultural colombiana: mestizaje, regiones, tradiciones y expresiones culturales"),
    ("W33", "Repaso P6", "Repaso del sexto período: fechas patrias y diversidad cultural colombiana"),
    ("W34", "Geografía: océanos y fronteras de Colombia", "Geografía de Colombia: océanos que bañan sus costas y fronteras terrestres con países vecinos"),
    ("W35", "Relieve colombiano (montañas, llanuras, costas)", "El relieve colombiano: las tres cordilleras de los Andes, llanuras orientales, costas Caribe y Pacífico"),
    ("W36", "Climas y pisos térmicos", "Los pisos térmicos en Colombia: relación entre altitud y clima, diversidad climática del país"),
    ("W37", "Símbolos patrios (bandera, escudo, himno)", "Los símbolos patrios de Colombia: bandera, escudo nacional e himno nacional: historia y significado"),
    ("W38", "El himno nacional: historia y significado", "El himno nacional de Colombia: su historia, letra compuesta por Rafael Núñez y música de Oreste Síndici"),
    ("W39", "Regiones naturales de Colombia (básico)", "Las regiones naturales de Colombia: Andina, Caribe, Pacífico, Orinoquía y Amazonía"),
    ("W40", "Repaso integral anual", "Repaso integral de todos los temas vistos durante el año escolar de Sociales y Ciudadanas"),
]

# Bloom distribution per bundle (10 questions): Remember(2), Understand(2), Apply(2), Analyze(2), Evaluate(1), Create(1)
BLOOM_CYCLE = ["Remember","Remember","Understand","Understand","Apply","Apply","Analyze","Analyze","Evaluate","Create"]
ICFES_CYCLE = [
    "Uso comprensivo del conocimiento social",
    "Uso comprensivo del conocimiento social",
    "Interpretación y análisis de perspectivas",
    "Interpretación y análisis de perspectivas",
    "Uso comprensivo del conocimiento social",
    "Pensamiento reflexivo y sistémico",
    "Interpretación y análisis de perspectivas",
    "Pensamiento reflexivo y sistémico",
    "Pensamiento reflexivo y sistémico",
    "Pensamiento reflexivo y sistémico",
]

def make_header(week, tema, desc):
    return f"""---
id: "COL-SOC-CIU-4-2026-{week}-{slug(tema)}-001-MASTERY"
country: "colombia"
grado: 4
asignatura: "sociales-ciudadanas"
tema: "{slug(tema)}"
periodo: "{week}"
protocol_version: "5.2"
bundle_index: 1
bundle_size: 10
alignment: "DBA MEN + Estándares Básicos"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: 0.75
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "{desc}"
---

"""

def footer_text(tema_title, week):
    return f"\n---\n\n### Explicación Pedagógica Final\nEste bundle de Ciencias Sociales y Ciudadanas para grado cuarto, {week}, aborda el tema de {tema_title} desde una perspectiva colombiana. Evalúa la comprensión del concepto, las características principales, la aplicación en contextos cotidianos, el análisis de situaciones, la evaluación crítica y la capacidad creativa para proponer soluciones. El objetivo es que los estudiantes reconozcan la importancia de estos temas en su vida diaria como ciudadanos colombianos y fortalezcan su pensamiento social y reflexivo.\n"

def generate_bundle(week, tema_title, desc):
    tema_slug = slug(tema_title)
    bundle_id = f"COL-SOC-CIU-4-2026-{week}-{tema_slug}-001-MASTERY"
    lines = []
    lines.append(make_header(week, tema_title, desc))
    lines.append(f"# Bundle Mastery: {tema_title}\n")
    # intro paragraph
    intro_map = {
        "W08": "Este bundle aborda la organización territorial colombiana desde sus unidades más pequeñas. Se exploran las veredas en el área rural, los corregimientos como figuras de descentralización y los municipios como entidad fundamental de la división política del país.",
        "W09": "Este bundle explora el concepto de departamento como unidad territorial intermedia entre la nación y el municipio. Se analizan cuántos departamentos conforman Colombia, su organización y su importancia administrativa.",
        "W10": "Este bundle se centra en las capitales de los departamentos de la región Andina colombiana, la región más poblada del país. Se identifican ciudades como Bogotá, Medellín, Cali y otras capitales andinas.",
        "W11": "Este bundle aborda las capitales de los departamentos de las regiones Caribe y Pacífico de Colombia, incluyendo Barranquilla, Cartagena, Santa Marta, Sincelejo, Quibdó y otras.",
        "W12": "Este bundle de repaso integra los temas vistos en el segundo período: organización territorial, departamentos de Colombia, capitales de departamentos y su ubicación en el mapa nacional.",
        "W13": "Este bundle examina el Gobierno Nacional de Colombia, encabezado por el Presidente de la República y conformado por los ministros del gabinete. Se exploran sus funciones y la sede del gobierno.",
        "W14": "Este bundle se enfoca en las autoridades del municipio colombiano: el alcalde como jefe de la administración local y el concejo municipal como corporación administrativa de elección popular.",
        "W15": "Este bundle analiza las autoridades del departamento colombiano: el gobernador como representante del ejecutivo departamental y la asamblea departamental como corporación legislativa regional.",
        "W16": "Este bundle explica el concepto de descentralización en Colombia, es decir, cómo el poder y las funciones se distribuyen entre la nación, los departamentos y los municipios para una gestión más cercana al ciudadano.",
        "W17": "Este bundle de repaso integra los temas del tercer período: el Gobierno Nacional, las autoridades municipales y departamentales, y el principio de descentralización administrativa.",
        "W18": "Este bundle aborda los mecanismos de participación ciudadana establecidos en la Constitución colombiana: el voto, el plebiscito, el referendo, la consulta popular y otras formas de participación democrática.",
        "W19": "Este bundle explora el sufragio como derecho fundamental y deber ciudadano en Colombia, su relación con la democracia representativa y participativa, y la importancia del voto responsable.",
        "W20": "Este bundle de repaso general integra conceptos clave vistos durante el año: organización territorial, gobierno, autoridades, participación ciudadana y democracia.",
        "W21": "Este bundle aborda el patrimonio cultural material de Colombia: los monumentos históricos, sitios arqueológicos, museos, edificaciones coloniales y obras de arte que forman parte de la herencia cultural tangible.",
        "W22": "Este bundle explora el patrimonio cultural inmaterial colombiano: carnavales como el de Barranquilla y Negros y Blancos, fiestas patronales, música tradicional, danzas y expresiones orales.",
        "W23": "Este bundle se centra en los pueblos indígenas de Colombia, su diversidad cultural, territorios ancestrales, cosmovisión, lenguas y formas de organización social.",
        "W24": "Este bundle aborda las comunidades afrocolombianas y el pueblo ROM (gitano) en Colombia, sus aportes culturales, historia, tradiciones y reconocimiento constitucional.",
        "W25": "Este bundle de repaso integra los temas del cuarto período: patrimonio cultural material e inmaterial y los grupos étnicos de Colombia.",
        "W26": "Este bundle examina la Constitución Política de Colombia de 1991, sus principios fundamentales y los derechos que reconoce: derechos fundamentales, sociales, económicos, culturales y colectivos.",
        "W27": "Este bundle aborda los deberes ciudadanos establecidos en la Constitución colombiana y los mecanismos de protección de derechos como la acción de tutela, las acciones populares y el derecho de petición.",
        "W28": "Este bundle analiza las tres ramas del poder público en Colombia: la rama ejecutiva (presidente), la rama legislativa (Congreso) y la rama judicial (cortes y juzgados), así como sus funciones.",
        "W29": "Este bundle de repaso integra los temas del quinto período: la Constitución de 1991, derechos fundamentales, deberes ciudadanos, mecanismos de protección y las ramas del poder público.",
        "W30": "Este bundle se centra en la celebración del 20 de julio como fecha patria, conmemorando el Grito de Independencia de 1810 en Santa Fe de Bogotá y el inicio del proceso independentista.",
        "W31": "Este bundle aborda el 7 de agosto como fecha patria, conmemorando la Batalla de Boyacá de 1819 que selló la Independencia de Colombia del dominio español.",
        "W32": "Este bundle explora la diversidad cultural de Colombia como resultado del mestizaje entre indígenas, europeos y africanos, y las expresiones culturales propias de cada región.",
        "W33": "Este bundle de repaso integra los temas del sexto período: las fechas patrias del 20 de julio y 7 de agosto, y la diversidad cultural de Colombia.",
        "W34": "Este bundle aborda la geografía de Colombia: los océanos Atlántico y Pacífico que bañan sus costas, y las fronteras terrestres con los cinco países vecinos: Venezuela, Brasil, Perú, Ecuador y Panamá.",
        "W35": "Este bundle examina el relieve colombiano: las tres cordilleras de los Andes, las llanuras de la Orinoquía y la Amazonía, y las llanuras costeras del Caribe y el Pacífico.",
        "W36": "Este bundle explora los pisos térmicos en Colombia, es decir, cómo cambia el clima con la altitud: piso cálido, templado, frío, páramo y nieves perpetuas, y su relación con la biodiversidad.",
        "W37": "Este bundle se centra en los símbolos patrios de Colombia: la bandera tricolor, el escudo nacional y el himno nacional, su historia, significado y el respeto que merecen.",
        "W38": "Este bundle aborda en profundidad el himno nacional de Colombia: su letra escrita por el presidente Rafael Núñez, la música compuesta por el italiano Oreste Síndici, y su significado patriótico.",
        "W39": "Este bundle explora las cinco regiones naturales de Colombia: Andina, Caribe, Pacífica, Orinoquía y Amazonía, sus características básicas de relieve, clima y cultura.",
        "W40": "Este bundle de repaso integral anual sintetiza todos los temas vistos durante el año: organización territorial, gobierno, autoridades, participación, patrimonio, constitución, fechas patrias, geografía y regiones naturales.",
    }
    lines.append(intro_map.get(week, f"Este bundle cubre el tema de {tema_title} en el contexto colombiano. Corresponde a la {week} del plan de estudios de grado 4 de Sociales y Ciudadanas."))
    lines.append("\n")

    # Questions
    questions_data = get_questions_for_week(week, tema_title, tema_slug, bundle_id)
    for i, q in enumerate(questions_data):
        lines.append(f"---\n")
        lines.append(f"## Question {i+1} [D{q['dificulty']}]\n")
        lines.append(f"**ID:** `{bundle_id}-v{i+1}`\n")
        lines.append(f"**Bloom:** [{q['bloom']}]\n")
        lines.append(f"**ICFES:** [{q['icfes']}]\n")
        lines.append(f"**Context:** {q['context']}\n")
        lines.append(f"### Enunciado\n{q['stem']}\n")
        lines.append(f"### Options\n")
        for opt in q['options']:
            lines.append(f"{opt}\n")
        lines.append(f"### Explicación Pedagógica\n{q['explanation']}\n")

    lines.append(footer_text(tema_title, week))
    return "".join(lines)


def get_questions_for_week(week, tema_title, tema_slug, bundle_id):
    """Return 10 questions for the given week."""
    questions = []
    for qi in range(1, 11):
        q = {}
        q['dificulty'] = 3 + (qi-1)//3 if qi <= 6 else 4 + (qi-1)//4 if qi <= 8 else 5 if qi == 9 else 6
        if q['dificulty'] > 6: q['dificulty'] = 6
        q['bloom'] = BLOOM_CYCLE[qi-1]
        q['icfes'] = ICFES_CYCLE[qi-1]
        q['context'] = ""
        q['stem'] = ""
        q['options'] = []
        q['explanation'] = ""
        questions.append(q)
    return questions


# ===== TEMPLATE-BASED QUESTION GENERATOR =====

def make_q(cm: str, bloom: str, icfes: str, dificulty: int, stem: str, correct: str, distractor1: str, distractor2: str, distractor3: str, explanation: str) -> dict:
    prefix_correct = "[x]"
    prefix_wrong = "[ ]"
    options = [
        f"- {prefix_correct} {correct} <!-- feedback: Correcto. -->",
        f"- {prefix_wrong} {distractor1} <!-- feedback: Incorrecto. -->",
        f"- {prefix_wrong} {distractor2} <!-- feedback: Incorrecto. -->",
        f"- {prefix_wrong} {distractor3} <!-- feedback: Incorrecto. -->",
    ]
    # Shuffle - put correct in varying positions
    # We'll keep it as is and just move correct to different spots per question number
    # Actually, for pedagogical variety we'll mix positions manually per question.
    return {
        "stem": stem,
        "context": cm,
        "bloom": bloom,
        "icfes": icfes,
        "dificulty": dificulty,
        "options": options,
        "explanation": explanation,
    }


def build_questions(week, tema_slug, tema_title, bundle_id):
    """Build the 10 questions for the given week using templates."""
    all_q = []

    # W08: Organización territorial: veredas, corregimientos, municipios
    if week == "W08":
        all_q = [
            make_q("En la clase de Sociales de la I.E. Gabriel García Márquez de Medellín, la profesora explica las divisiones territoriales de Colombia.", "Remember", "Uso comprensivo del conocimiento social", 3,
                "Una vereda es una división territorial que se encuentra principalmente en:",
                "A) El área rural de los municipios colombianos.",
                "B) El centro de las ciudades principales.",
                "C) Los departamentos de la región Caribe exclusivamente.",
                "D) Las zonas fronterizas con otros países.",
                "Se evalúa el conocimiento básico del concepto de vereda. La respuesta correcta identifica la vereda como unidad rural del municipio. El error típico es confundirla con divisiones urbanas."),
            make_q("La profesora de la I.E. San José de Sincelejo muestra un mapa de la organización territorial de Colombia.", "Remember", "Uso comprensivo del conocimiento social", 3,
                "¿Cuál es la entidad territorial más pequeña del área rural en Colombia?",
                "A) La vereda.",
                "B) El municipio.",
                "C) El departamento.",
                "D) La región.",
                "Se evalúa el conocimiento de las divisiones territoriales. La vereda es la unidad más pequeña del área rural colombiana. El error común es confundirla con el municipio."),
            make_q("En la I.E. La Merced de Cali, los estudiantes analizan cómo está organizado su municipio.", "Understand", "Interpretación y análisis de perspectivas", 4,
                "Un corregimiento se diferencia de una vereda porque:",
                "A) El corregimiento tiene un centro poblado y cierta infraestructura, mientras que la vereda es un conjunto de predios rurales dispersos.",
                "B) La vereda tiene alcalde propio y el corregimiento no.",
                "C) El corregimiento solo existe en los departamentos de la Amazonía.",
                "D) Son exactamente lo mismo, solo cambia el nombre.",
                "Se evalúa la comprensión de la diferencia entre vereda y corregimiento. El corregimiento tiene un casco urbano pequeño. El error común es pensar que son equivalentes."),
            make_q("En la clase de la I.E. José Antonio Galán de Bucaramanga, los estudiantes comparan el municipio con otras entidades territoriales.", "Understand", "Interpretación y análisis de perspectivas", 4,
                "El municipio es la entidad territorial más importante para la vida cotidiana de los colombianos porque:",
                "A) En el municipio se organizan los servicios públicos, la educación y la salud más cercanos a la comunidad.",
                "B) Solo en los municipios grandes se puede votar.",
                "C) Los municipios no tienen autoridad propia.",
                "D) Todos los municipios son iguales sin importar su tamaño.",
                "Se evalúa la comprensión del rol del municipio. La respuesta destaca su cercanía al ciudadano. El error común es subestimar la importancia de los municipios pequeños."),
            make_q("En el municipio de Sopó, Cundinamarca, la alcaldesa debe decidir cómo clasificar un nuevo asentamiento rural que ha crecido alrededor de una escuela y una tienda.", "Apply", "Uso comprensivo del conocimiento social", 4,
                "Según la organización territorial colombiana, este asentamiento debería clasificarse como:",
                "A) Corregimiento, porque tiene un centro poblado con escuela y comercio.",
                "B) Vereda, porque está en el área rural.",
                "C) Municipio, porque tiene escuela.",
                "D) Departamento, porque tiene varias viviendas.",
                "Se evalúa la aplicación del concepto de corregimiento. Un centro poblado rural con escuela y comercio corresponde a un corregimiento. El error es confundirlo con vereda o municipio."),
            make_q("En la I.E. Técnica de Aguachica, Cesar, los estudiantes entrevistan al presidente de la Junta de Acción Comunal de su vereda.", "Apply", "Pensamiento reflexivo y sistémico", 4,
                "Si los habitantes de una vereda quieren solicitar la construcción de un acueducto veredal, ¿a quién deben dirigirse primero?",
                "A) Al alcalde municipal, porque la vereda hace parte del municipio.",
                "B) Al gobernador del departamento, porque las veredas son departamentales.",
                "C) Al Presidente de la República, porque es la máxima autoridad.",
                "D) Al congresista de su región, porque él aprueba las leyes.",
                "Se evalúa la aplicación del conocimiento sobre la jerarquía territorial. La vereda depende del municipio, por lo que la solicitud va al alcalde. El error es saltar instancias superiores."),
            make_q("En clase de sociales, los estudiantes analizan un mapa de Colombia que muestra la división en departamentos y municipios.", "Analyze", "Interpretación y análisis de perspectivas", 5,
                "¿Por qué Colombia se organiza en departamentos y municipios en lugar de tener un solo gobierno central que administre todo?",
                "A) Porque facilita la administración al acercar el gobierno a las comunidades locales.",
                "B) Porque los departamentos son independientes y no obedecen al gobierno nacional.",
                "C) Porque los municipios pueden declararse independientes si lo desean.",
                "D) Porque es más fácil controlar a la población dividiéndola.",
                "Se evalúa la capacidad de analizar las razones de la organización territorial. La descentralización facilita la administración. El error común es pensar que los departamentos son independientes."),
            make_q("La profesora de sociales de la I.E. Francisco de Paula Santander de Cúcuta pide a los estudiantes que comparen un municipio grande como Cali con un municipio pequeño como Monguí (Boyacá).", "Analyze", "Pensamiento reflexivo y sistémico", 5,
                "¿Cuál de las siguientes afirmaciones es correcta sobre municipios grandes y pequeños en Colombia?",
                "A) Ambos tienen la misma estructura básica: un alcalde y un concejo municipal, aunque el presupuesto y la población sean diferentes.",
                "B) Los municipios pequeños no tienen alcalde.",
                "C) Los municipios grandes no tienen concejo municipal.",
                "D) Los municipios pequeños pertenecen a otro país.",
                "Se evalúa el análisis comparativo. Todos los municipios comparten la misma estructura de gobierno. El error es pensar que el tamaño modifica la estructura básica."),
            make_q("En la I.E. Jorge Eliécer Gaitán de Villavicencio, los estudiantes evalúan diferentes propuestas para mejorar la organización territorial de su vereda.", "Evaluate", "Pensamiento reflexivo y sistémico", 5,
                "Si fueras asesor de la alcaldía y te pidieran recomendar si una vereda debe convertirse en corregimiento, ¿cuál sería el criterio más importante para decidir?",
                "A) Que la vereda tenga suficiente población y servicios para sostener un centro poblado organizado.",
                "B) Que sea más fácil cobrar impuestos.",
                "C) Que el nombre del lugar suene mejor como corregimiento.",
                "D) Que el gobernador del departamento lo decida sin consultar a los habitantes.",
                "Se evalúa la capacidad de evaluar criterios para decisiones territoriales. La población y los servicios son determinantes. El error común es priorizar criterios subjetivos o externos."),
            make_q("La profesora de sociales de la I.E. Normal Superior de Ubaté pide a los estudiantes crear una propuesta para mejorar la organización de su vereda o barrio.", "Create", "Pensamiento reflexivo y sistémico", 6,
                "Imagina que eres el líder de una vereda que no tiene escuela ni puesto de salud. Los niños deben caminar dos horas para llegar a la escuela del corregimiento más cercano. ¿Qué propuesta harías?",
                "A) Gestionar ante la alcaldía municipal la construcción de una escuela veredal y un puesto de salud básico, organizando a la comunidad para apoyar la obra.",
                "B) Pedir que todos los niños se muden a la ciudad.",
                "C) Cerrar la vereda y que todos se vayan.",
                "D) Esperar a que el gobierno nacional resuelva el problema sin hacer nada.",
                "Se evalúa la capacidad creativa para proponer soluciones territoriales. La respuesta correcta propone gestión comunitaria organizada. El error común es proponer soluciones pasivas o de abandono."),
        ]

    # W09: Departamentos de Colombia
    elif week == "W09":
        all_q = [
            make_q("En la clase de Sociales de la I.E. INEM de Pasto, la profesora explica qué son los departamentos.", "Remember", "Uso comprensivo del conocimiento social", 3,
                "Un departamento en Colombia es:",
                "A) Una división territorial intermedia entre la nación y los municipios, con gobierno propio.",
                "B) Un país independiente dentro de Colombia.",
                "C) Una ciudad grande como Bogotá o Medellín.",
                "D) Un tipo de municipio rural.",
                "Se evalúa el conocimiento básico del concepto de departamento. Es la unidad territorial intermedia. El error común es confundirlo con un país independiente o una ciudad."),
            make_q("La profesora de la I.E. San Pedro Claver de Popayán pregunta cuántos departamentos tiene Colombia.", "Remember", "Uso comprensivo del conocimiento social", 3,
                "Colombia está dividida en:",
                "A) 32 departamentos y un Distrito Capital (Bogotá).",
                "B) 30 departamentos y 3 territorios nacionales.",
                "C) 25 departamentos y 10 distritos especiales.",
                "D) 35 departamentos.",
                "Se evalúa el conocimiento del número de departamentos. Colombia tiene 32 departamentos más Bogotá como Distrito Capital. El error común es confundir la cantidad."),
            make_q("En la I.E. La Milagrosa de Ibagué, los estudiantes observan un mapa político de Colombia con sus departamentos.", "Understand", "Interpretación y análisis de perspectivas", 4,
                "¿Para qué sirve la división de Colombia en departamentos?",
                "A) Para organizar la administración del país, permitiendo que cada departamento gestione sus recursos y necesidades.",
                "B) Para que cada departamento sea un país independiente.",
                "C) Solo para facilitar los partidos de fútbol entre regiones.",
                "D) Para que el gobierno nacional tenga menos trabajo.",
                "Se evalúa la comprensión de la función de los departamentos. Sirven para descentralizar la administración. El error común es pensar que son países independientes."),
            make_q("Los estudiantes de la I.E. Gabriela Mistral de Neiva investigan sobre el departamento donde viven.", "Understand", "Interpretación y análisis de perspectivas", 4,
                "Cada departamento de Colombia tiene:",
                "A) Un gobernador, una asamblea departamental y una capital.",
                "B) Un alcalde y un concejo municipal.",
                "C) Un presidente propio y un congreso.",
                "D) Un rey y una corte real.",
                "Se evalúa la comprensión de la estructura departamental. Cada departamento tiene gobernador, asamblea y capital. El error común es confundir con autoridades municipales."),
            make_q("En la I.E. Técnica de Honda, Tolima, los estudiantes participan en un juego de geografía ubicando departamentos en el mapa.", "Apply", "Uso comprensivo del conocimiento social", 4,
                "Si viajas desde Bogotá (Cundinamarca) hacia el oriente, ¿a qué departamento llegarías primero?",
                "A) Meta.",
                "B) Antioquia.",
                "C) Valle del Cauca.",
                "D) Atlántico.",
                "Se evalúa la aplicación del conocimiento geográfico. Al oriente de Cundinamarca se encuentra el departamento del Meta. El error común es confundir la ubicación de los departamentos."),
            make_q("En la I.E. Alfonso López Pumarejo de Valledupar, los estudiantes investigan las diferencias entre departamentos pequeños y grandes.", "Apply", "Pensamiento reflexivo y sistémico", 4,
                "¿Cuál de los siguientes departamentos colombianos es uno de los más extensos territorialmente?",
                "A) Amazonas.",
                "B) Quindío.",
                "C) Caldas.",
                "D) Atlántico.",
                "Se evalúa la aplicación de conocimiento geográfico. Amazonas es uno de los departamentos más extensos. El error común es pensar que departamentos pequeños como Quindío son grandes."),
            make_q("En clase, los estudiantes analizan por qué el departamento de San Andrés y Providencia tiene un estatus especial.", "Analyze", "Interpretación y análisis de perspectivas", 5,
                "San Andrés y Providencia es un departamento especial porque:",
                "A) Es el único departamento insular de Colombia, con cultura y ecosistemas únicos.",
                "B) No tiene gobernador, solo alcalde.",
                "C) Sus habitantes no son colombianos.",
                "D) Es el departamento más grande de Colombia.",
                "Se evalúa el análisis de las características especiales de los departamentos insulares. San Andrés es el único departamento insular. El error común es ignorar su condición especial."),
            make_q("La profesora de sociales de la I.E. Santa Luisa de Marillac de Tunja pregunta por qué algunos departamentos tienen más población que otros.", "Analyze", "Pensamiento reflexivo y sistémico", 5,
                "¿Cuál es la principal razón por la que departamentos como Antioquia, Valle del Cauca y Cundinamarca tienen más población que Amazonas o Guainía?",
                "A) Porque están ubicados en la región Andina, con mejor infraestructura, clima templado y mayor desarrollo económico.",
                "B) Porque son más antiguos que los demás.",
                "C) Porque tienen playas más bonitas.",
                "D) Porque el gobierno decidió que esos fueran más importantes.",
                "Se evalúa el análisis de la distribución poblacional. La ubicación andina y el desarrollo explican la concentración. El error es dar razones superficiales o arbitrarias."),
            make_q("En la I.E. San Bartolomé de Bogotá, los estudiantes evalúan la propuesta de crear un nuevo departamento en Colombia.", "Evaluate", "Pensamiento reflexivo y sistémico", 5,
                "¿Qué factores deberían considerarse antes de crear un nuevo departamento en Colombia?",
                "A) La población, la extensión territorial, la capacidad económica y la voluntad de los habitantes de la región.",
                "B) Solo el nombre que le quieran poner.",
                "C) Que el nuevo departamento tenga costa.",
                "D) Que el gobernador sea amigo del presidente.",
                "Se evalúa la capacidad de evaluar