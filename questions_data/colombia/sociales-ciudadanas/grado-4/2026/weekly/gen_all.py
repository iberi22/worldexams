#!/usr/bin/env python3
"""
Generate all 33 bundles SOCIALES CIUDADANAS Colombia G4 W08-W40.
"""

import os, re, random

OUT = os.path.dirname(os.path.abspath(__file__))

def slug(s):
    s = s.lower().strip().replace(" ","-")
    return re.sub(r'[^a-z0-9\-]', '', s)

def label(n):
    return chr(65+n)  # A, B, C, D

WEEKS_DATA = """\
W08|Organización territorial: veredas, corregimientos, municipios|Organización territorial colombiana: veredas, corregimientos y municipios como entidades básicas de la división político-administrativa
W09|Departamentos de Colombia|Los departamentos como unidades territoriales de Colombia, su concepto, cuántos son y cómo se organizan
W10|Capitales de departamento (región Andina)|Capitales de los departamentos de la región Andina de Colombia: identificación y ubicación
W11|Capitales de departamento (región Caribe, Pacífico)|Capitales de los departamentos de las regiones Caribe y Pacífico de Colombia
W12|Repaso P2|Repaso del segundo período: organización territorial, departamentos y capitales de Colombia
W13|El Gobierno Nacional (presidente, ministros)|El Gobierno Nacional de Colombia: el presidente de la República, los ministros y sus funciones
W14|Autoridades municipales (alcalde y concejo)|Autoridades del municipio colombiano: el alcalde y el concejo municipal, sus roles y funciones
W15|Autoridades departamentales (gobernador y asamblea)|Autoridades del departamento colombiano: el gobernador y la asamblea departamental
W16|La descentralización en Colombia|La descentralización administrativa en Colombia: cómo se distribuye el poder entre nación, departamento y municipio
W17|Repaso P3|Repaso del tercer período: gobierno nacional, autoridades municipales y departamentales, descentralización
W18|Mecanismos de participación (voto, plebiscito, referendo)|Mecanismos de participación ciudadana en Colombia: el voto, el plebiscito y el referendo
W19|El sufragio y la democracia|El sufragio como derecho y deber ciudadano, y su relación con la democracia en Colombia
W20|Repaso general|Repaso general del año escolar: conceptos fundamentales de sociales y ciudadanas
W21|Patrimonio cultural material de Colombia|El patrimonio cultural material colombiano: monumentos, sitios históricos, museos y arquitectura
W22|Patrimonio cultural inmaterial (carnavales, fiestas)|El patrimonio cultural inmaterial de Colombia: carnavales, fiestas tradicionales, música y danzas
W23|Grupos étnicos: indígenas colombianos|Los pueblos indígenas de Colombia: diversidad cultural, territorios y costumbres
W24|Grupos étnicos: afrocolombianos y ROM|Comunidades afrocolombianas y del pueblo ROM (gitano) en Colombia: cultura y aportes
W25|Repaso P4|Repaso del cuarto período: patrimonio cultural, grupos étnicos y diversidad colombiana
W26|La Constitución Política de 1991 (derechos)|La Constitución Política de Colombia de 1991: los derechos fundamentales, sociales y colectivos
W27|La Constitución: deberes y mecanismos de protección|La Constitución colombiana: deberes ciudadanos y mecanismos de protección de derechos (tutela, acción popular)
W28|Las ramas del poder público|Las ramas del poder público en Colombia: ejecutiva, legislativa y judicial, sus funciones y sedes
W29|Repaso P5|Repaso del quinto período: Constitución Política de 1991, derechos, deberes y ramas del poder
W30|Fechas patrias (20 de julio, independencia)|El 20 de julio como fecha patria: el grito de Independencia de Colombia de 1810
W31|Fechas patrias (7 de agosto, Batalla de Boyacá)|El 7 de agosto como fecha patria: la Batalla de Boyacá de 1819 y la Independencia definitiva
W32|Diversidad cultural de Colombia|La diversidad cultural colombiana: mestizaje, regiones, tradiciones y expresiones culturales
W33|Repaso P6|Repaso del sexto período: fechas patrias y diversidad cultural colombiana
W34|Geografía: océanos y fronteras de Colombia|Geografía de Colombia: océanos que bañan sus costas y fronteras terrestres con países vecinos
W35|Relieve colombiano (montañas, llanuras, costas)|El relieve colombiano: las tres cordilleras de los Andes, llanuras orientales, costas Caribe y Pacífico
W36|Climas y pisos térmicos|Los pisos térmicos en Colombia: relación entre altitud y clima, diversidad climática del país
W37|Símbolos patrios (bandera, escudo, himno)|Los símbolos patrios de Colombia: bandera, escudo nacional e himno nacional: historia y significado
W38|El himno nacional: historia y significado|El himno nacional de Colombia: su historia, letra compuesta por Rafael Núñez y música de Oreste Síndici
W39|Regiones naturales de Colombia (básico)|Las regiones naturales de Colombia: Andina, Caribe, Pacífico, Orinoquía y Amazonía
W40|Repaso integral anual|Repaso integral de todos los temas vistos durante el año escolar de Sociales y Ciudadanas"""

WEEKS = []
for line in WEEKS_DATA.strip().split("\n"):
    parts = line.split("|")
    WEEKS.append((parts[0], parts[1], parts[2]))

INTROS = {
    "W08": "Este bundle aborda la organización territorial colombiana desde sus unidades más pequeñas. Se exploran las veredas en el área rural, los corregimientos como centros poblados rurales y los municipios como entidad fundamental de la división político-administrativa del país.",
    "W09": "Este bundle explora el concepto de departamento como unidad territorial intermedia entre la nación y el municipio. Se analizan cuántos departamentos conforman Colombia, su organización, su importancia administrativa y cómo se relacionan con los municipios.",
    "W10": "Este bundle se centra en las capitales de los departamentos de la región Andina colombiana, la región más poblada del país. Se identifican las capitales más importantes como Bogotá, Medellín, Cali, Bucaramanga, Manizales, Pereira y otras capitales andinas.",
    "W11": "Este bundle aborda las capitales de los departamentos de las regiones Caribe y Pacífico de Colombia. Se incluyen Barranquilla, Cartagena, Santa Marta, Sincelejo, Riohacha, Valledupar en el Caribe, y Cali, Popayán, Pasto y Quibdó en el Pacífico.",
    "W12": "Este bundle de repaso integra los temas vistos en el segundo período: la organización territorial de Colombia (veredas, corregimientos, municipios), los departamentos y las capitales departamentales del país.",
    "W13": "Este bundle examina el Gobierno Nacional de Colombia, encabezado por el Presidente de la República y conformado por los ministros del gabinete. Se exploran sus funciones, su elección popular y la sede del gobierno en la Casa de Nariño en Bogotá.",
    "W14": "Este bundle se enfoca en las autoridades del municipio colombiano: el alcalde como jefe de la administración local elegido por voto popular y el concejo municipal como corporación administrativa de elección popular que expide acuerdos.",
    "W15": "Este bundle analiza las autoridades del departamento colombiano: el gobernador como representante del ejecutivo departamental elegido por voto popular y la asamblea departamental como corporación legislativa regional que expide ordenanzas.",
    "W16": "Este bundle explica el concepto de descentralización en Colombia, es decir, cómo el poder y las funciones se distribuyen entre la nación, los departamentos y los municipios para una gestión más cercana al ciudadano y más eficiente.",
    "W17": "Este bundle de repaso integra los temas del tercer período: el Gobierno Nacional, las autoridades municipales (alcalde y concejo), las autoridades departamentales (gobernador y asamblea) y el principio de descentralización administrativa.",
    "W18": "Este bundle aborda los mecanismos de participación ciudadana establecidos en la Constitución colombiana de 1991: el voto, el plebiscito, el referendo, la consulta popular, el cabildo abierto y la iniciativa legislativa.",
    "W19": "Este bundle explora el sufragio como derecho fundamental y deber ciudadano en Colombia. Se analiza su relación con la democracia representativa y participativa, y la importancia del voto libre y responsable.",
    "W20": "Este bundle de repaso general integra los conceptos clave vistos hasta ahora: organización territorial, departamentos y capitales, gobierno nacional, autoridades locales y mecanismos de participación ciudadana.",
    "W21": "Este bundle aborda el patrimonio cultural material de Colombia: los monumentos históricos, sitios arqueológicos, museos, edificaciones coloniales, obras de arte y ciudades Patrimonio de la Humanidad que forman parte de la herencia tangible.",
    "W22": "Este bundle explora el patrimonio cultural inmaterial colombiano: carnavales como el de Barranquilla y Negros y Blancos de Pasto, fiestas patronales, música tradicional como el vallenato y la cumbia, y las danzas folclóricas.",
    "W23": "Este bundle se centra en los pueblos indígenas de Colombia, su diversidad cultural, territorios ancestrales (resguardos), cosmovisión, lenguas nativas y formas de organización social como los cabildos indígenas.",
    "W24": "Este bundle aborda las comunidades afrocolombianas y el pueblo ROM (gitano) en Colombia, sus aportes culturales, historia, tradiciones, territorios colectivos y su reconocimiento en la Constitución de 1991.",
    "W25": "Este bundle de repaso integra los temas del cuarto período: el patrimonio cultural material e inmaterial de Colombia y los grupos étnicos del país (indígenas, afrocolombianos y ROM).",
    "W26": "Este bundle examina la Constitución Política de Colombia de 1991. Se enfoca en los derechos fundamentales (vida, igualdad, libertad), derechos sociales (salud, educación), derechos económicos y culturales, y derechos colectivos.",
    "W27": "Este bundle aborda los deberes ciudadanos establecidos en la Constitución colombiana y los mecanismos de protección de derechos: la acción de tutela, las acciones populares, las acciones de grupo y el derecho de petición.",
    "W28": "Este bundle analiza las tres ramas del poder público en Colombia: la rama ejecutiva (Presidente y ministros), la rama legislativa (Congreso: Senado y Cámara) y la rama judicial (Corte Suprema, Corte Constitucional, Consejo de Estado).",
    "W29": "Este bundle de repaso integra los temas del quinto período: la Constitución de 1991, los derechos fundamentales, los deberes ciudadanos, los mecanismos de protección de derechos y las ramas del poder público.",
    "W30": "Este bundle se centra en la celebración del 20 de julio como fecha patria, conmemorando el Grito de Independencia de 1810 en Santa Fe de Bogotá y el inicio del proceso de independencia de la Nueva Granada.",
    "W31": "Este bundle aborda el 7 de agosto como fecha patria, conmemorando la Batalla de Boyacá de 1819, liderada por Simón Bolívar, que selló definitivamente la Independencia de Colombia del dominio español.",
    "W32": "Este bundle explora la diversidad cultural de Colombia como resultado del mestizaje entre indígenas, europeos y africanos. Se analizan las expresiones culturales propias de cada región del país.",
    "W33": "Este bundle de repaso integra los temas del sexto período: las fechas patrias del 20 de julio y 7 de agosto, y la diversidad cultural de Colombia como nación pluricultural.",
    "W34": "Este bundle aborda la geografía de Colombia: los océanos Atlántico (Caribe) y Pacífico que bañan sus costas, y las fronteras terrestres con los cinco países vecinos Venezuela, Brasil, Perú, Ecuador y Panamá.",
    "W35": "Este bundle examina el relieve colombiano: las tres cordilleras de los Andes (Occidental, Central y Oriental), las llanuras de la Orinoquía y la Amazonía, y las llanuras costeras del Caribe y el Pacífico.",
    "W36": "Este bundle explora los pisos térmicos en Colombia, es decir, cómo cambia el clima con la altitud. Se estudian el piso cálido, templado, frío, páramo y nieves perpetuas, y su relación con la biodiversidad.",
    "W37": "Este bundle se centra en los símbolos patrios de Colombia: la bandera tricolor (amarillo, azul y rojo), el escudo nacional y el himno nacional. Se explora su historia, significado y el respeto que merecen.",
    "W38": "Este bundle aborda en profundidad el himno nacional de Colombia: su letra escrita por el presidente Rafael Núñez, la música compuesta por el italiano Oreste Síndici, su historia y el significado patriótico de sus estrofas.",
    "W39": "Este bundle explora las cinco regiones naturales de Colombia: Andina, Caribe, Pacífica, Orinoquía y Amazonía. Se presentan sus características básicas de relieve, clima, hidrografía y cultura.",
    "W40": "Este bundle de repaso integral anual sintetiza todos los temas vistos durante el año escolar: organización territorial, gobierno, autoridades, participación, patrimonio, constitución, fechas patrias, geografía, relieve y regiones naturales.",
}


def make_bundle(week, tema_title, desc, questions):
    """Generate a complete bundle markdown file."""
    tema_slug = slug(tema_title)
    bundle_id = f"COL-SOC-CIU-4-2026-{week}-{tema_slug}-001-MASTERY"
    lines = []
    lines.append("---")
    lines.append(f'id: "{bundle_id}"')
    lines.append('country: "colombia"')
    lines.append('grado: 4')
    lines.append('asignatura: "sociales-ciudadanas"')
    lines.append(f'tema: "{tema_slug}"')
    lines.append(f'periodo: "{week}"')
    lines.append('protocol_version: "5.2"')
    lines.append('bundle_index: 1')
    lines.append('bundle_size: 10')
    lines.append('alignment: "DBA MEN + Estándares Básicos"')
    lines.append('modern_context: true')
    lines.append('distractor_profile: "plausible_peer_set"')
    lines.append('calibration:')
    lines.append('  expected_success_rate: 0.75')
    lines.append('  discrimination_index_target: ">= 0.22"')
    lines.append('  simulated_responses: 100')
    lines.append(f'rubric_baseline: "{desc}"')
    lines.append("---")
    lines.append("")
    lines.append(f"# Bundle Mastery: {tema_title}")
    lines.append("")
    intro = INTROS.get(week, f"Este bundle cubre el tema de {tema_title} en el contexto colombiano. Corresponde a la {week} del plan de estudios de grado 4 de Sociales y Ciudadanas.")
    lines.append(intro)
    lines.append("")

    for i, q in enumerate(questions):
        lines.append("---")
        lines.append("")
        lines.append(f"## Question {i+1} [D{q['d']}]")
        lines.append("")
        lines.append(f"**ID:** `{bundle_id}-v{i+1}`")
        lines.append(f"**Bloom:** [{q['bloom']}]")
        lines.append(f"**ICFES:** [{q['icfes']}]")
        lines.append(f"**Context:** {q['ctx']}")
        lines.append("")
        lines.append("### Enunciado")
        lines.append(q['stem'])
        lines.append("")
        lines.append("### Options")
        lines.append("")

        opts = list(q['opts'])
        # Put correct answer at a specific position based on question index
        correct_pos = i % 4
        if opts[correct_pos][1] != True:
            # Find the correct answer and swap
            for idx, (_, is_c) in enumerate(opts):
                if is_c:
                    opts[correct_pos], opts[idx] = opts[idx], opts[correct_pos]
                    break

        for idx, (opt_text, is_correct, feedback) in enumerate(opts):
            prefix = '[x]' if is_correct else '[ ]'
            lines.append(f"- {prefix} {label(idx)}) {opt_text} <!-- feedback: {feedback} -->")

        lines.append("")
        lines.append("### Explicación Pedagógica")
        lines.append(q['exp'])
        lines.append("")

    # Final pedagogical explanation
    lines.append("---")
    lines.append("")
    lines.append("### Explicación Pedagógica Final")
    lines.append(f"Este bundle de Ciencias Sociales y Ciudadanas para grado cuarto, {week}, aborda el tema de {tema_title} desde una perspectiva colombiana. Evalúa la comprensión del concepto, las características principales, la aplicación en contextos cotidianos, el análisis de situaciones, la evaluación crítica y la capacidad creativa para proponer soluciones. El objetivo es que los estudiantes reconozcan la importancia de estos temas en su vida diaria como ciudadanos colombianos y fortalezcan su pensamiento social y reflexivo.")
    lines.append("")

    return "\n".join(lines)


def make_q(ctx, bloom, icfes, d, stem, opts, exp):
    return {
        "ctx": ctx, "bloom": bloom, "icfes": icfes, "d": d,
        "stem": stem, "opts": opts, "exp": exp
    }

print("Generator will produce 33 bundle files...")
