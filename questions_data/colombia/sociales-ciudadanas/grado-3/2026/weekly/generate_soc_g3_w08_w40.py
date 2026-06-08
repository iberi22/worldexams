#!/usr/bin/env python3
"""
Generate weekly bundles SOC G3 W08-W40 (33 bundles).
Template-based generation matching existing format exactly.
"""

import os

OUT_DIR = os.path.dirname(os.path.abspath(__file__))

# Week: (tema_slug, tema_title, rubric_baseline, intro_paragraph)
WEEKS = {
    "W08": ("el-campo-y-la-ciudad", "El Campo y la Ciudad",
            "campo_ciudad, diferencias_urbano_rural, vida_campesina, vida_urbana, actividades_campo_ciudad",
            "Este bundle cubre las diferencias entre el campo y la ciudad en Colombia. Reconoce las características de la vida rural y urbana, las actividades que se realizan en cada espacio y las ventajas de ambos entornos."),
    "W09": ("actividades-economicas-campo", "Actividades Económicas del Campo",
            "actividades_economicas, campo, agricultura, ganaderia, pesca, mineria, economia_rural",
            "Este bundle cubre las actividades económicas que se realizan en el campo colombiano. Reconoce la agricultura, la ganadería, la pesca y la minería como fuentes de trabajo y sustento en las zonas rurales."),
    "W10": ("servicios-publicos-comunidad", "Servicios Públicos en Mi Comunidad",
            "servicios_publicos, agua, energia_electrica, gas, acueducto, alcantarillado, comunidad",
            "Este bundle cubre los servicios públicos en la comunidad colombiana. Reconoce la importancia del agua potable, la energía eléctrica, el gas natural y el alcantarillado para la calidad de vida de las personas."),
    "W11": ("deberes-ciudadanos-basicos", "Deberes Ciudadanos Básicos",
            "deberes_ciudadanos, constitucion, respeto_leyes, pago_impuestos, participacion_ciudadana, civismo",
            "Este bundle cubre los deberes ciudadanos básicos en Colombia. Reconoce las responsabilidades que tienen los ciudadanos con su comunidad y su país según la Constitución."),
    "W12": ("repaso-p2", "Repaso Periodo 2 (W08–W11)",
            "repaso_p2, campo_ciudad, actividades_economicas, servicios_publicos, deberes_ciudadanos",
            "Este bundle es un repaso del segundo periodo que integra los temas del campo y la ciudad, las actividades económicas rurales, los servicios públicos y los deberes ciudadanos básicos."),
    "W13": ("derechos-del-nino-alimentacion-salud-educacion", "Derechos del Niño: Alimentación, Salud y Educación",
            "derechos_nino, alimentacion, salud, educacion, derechos_fundamentales, codigo_infancia",
            "Este bundle cubre los derechos fundamentales de los niños a la alimentación, la salud y la educación en Colombia. Reconoce la importancia de estos derechos para el desarrollo integral de la infancia."),
    "W14": ("derechos-del-nino-proteccion-identidad-recreacion", "Derechos del Niño: Protección, Identidad y Recreación",
            "derechos_nino, proteccion, identidad, recreacion, derecho_juego, familia, codigo_infancia",
            "Este bundle cubre los derechos de los niños a la protección, la identidad y la recreación en Colombia. Reconoce la importancia del juego, la familia y el registro civil para el desarrollo infantil."),
    "W15": ("normas-convivencia-aula", "Normas de Convivencia en el Aula",
            "normas_convivencia, aula, respeto, orden_clase, participacion, convivencia_escolar, manual_convivencia",
            "Este bundle cubre las normas de convivencia dentro del aula de clase colombiana. Reconoce la importancia del respeto, el orden y la participación para crear un ambiente propicio para el aprendizaje."),
    "W16": ("normas-convivencia-comunidad", "Normas de Convivencia en la Comunidad",
            "normas_convivencia, comunidad, barrio, vecinos, espacios_publicos, civismo, convivencia_ciudadana",
            "Este bundle cubre las normas de convivencia en la comunidad colombiana. Reconoce la importancia del respeto por los espacios públicos, las normas de tránsito y la convivencia con los vecinos."),
    "W17": ("repaso-p3", "Repaso Periodo 3 (W13–W16)",
            "repaso_p3, derechos_nino, normas_aula, normas_comunidad, convivencia",
            "Este bundle es un repaso del tercer periodo que integra los derechos del niño y las normas de convivencia en el aula y la comunidad."),
    "W18": ("colombia-ubicacion-sudamerica", "Colombia: Nombre y Ubicación en Sudamérica",
            "colombia, ubicacion_sudamerica, mapa, fronteras, continente_americano, geografia_colombia",
            "Este bundle cubre la identidad y ubicación de Colombia en Sudamérica. Reconoce el nombre oficial del país, su ubicación en el continente y sus límites geográficos."),
    "W19": ("simbolos-patrios", "Símbolos Patrios: Bandera, Escudo e Himno",
            "simbolos_patrios, bandera_colombia, escudo_colombia, himno_nacional, identidad_nacional, patriota",
            "Este bundle cubre los símbolos patrios de Colombia. Reconoce la bandera, el escudo y el himno nacional como representaciones de la identidad y la soberanía del país."),
    "W20": ("repaso-general-p1-p3", "Repaso General Periodos 1, 2 y 3",
            "repaso_general, p1_p3, colegio, familia, barrio, campo_ciudad, derechos_nino, normas_convivencia, simbolos_patrios",
            "Este bundle es un repaso integral de los tres primeros periodos del año escolar. Integra los temas del colegio, la familia, el barrio, el campo y la ciudad, los derechos del niño, las normas de convivencia y los símbolos patrios."),
    "W21": ("trabajo-oficios-comunidad", "El Trabajo y los Oficios en Mi Comunidad",
            "trabajo, oficios, comunidad, ocupaciones, trabajo_digno, economia_local, oficios_comunes",
            "Este bundle cubre los oficios y trabajos que se realizan en la comunidad colombiana. Reconoce la importancia del trabajo digno y las diferentes ocupaciones que contribuyen al bienestar de todos."),
    "W22": ("profesiones-aporte-sociedad", "Profesiones y su Aporte a la Sociedad",
            "profesiones, aporte_social, medico, docente, ingeniero, abogado, enfermero, bomberos, policia",
            "Este bundle cubre las profesiones y su aporte a la sociedad colombiana. Reconoce cómo diferentes profesionales contribuyen al bienestar, la salud, la educación y la seguridad de la comunidad."),
    "W23": ("medios-transporte-terrestre", "Medios de Transporte Terrestre",
            "medios_transporte, terrestre, automovil, bus, bicicleta, moto, tren, metrobus, TransMilenio",
            "Este bundle cubre los medios de transporte terrestre en Colombia. Reconoce los diferentes tipos de transporte que se desplazan por tierra y su importancia para la movilidad de las personas y las mercancías."),
    "W24": ("medios-transporte-aereo-acuatico", "Medios de Transporte Aéreo y Acuático",
            "medios_transporte, aereo, avion, helicoptero, acuatico, barco, lancha, rio, mar, transporte_fluvial",
            "Este bundle cubre los medios de transporte aéreo y acuático en Colombia. Reconoce la importancia de los aviones, helicópteros, barcos y lanchas para conectar las regiones del país."),
    "W25": ("repaso-p4", "Repaso Periodo 4 (W21–W24)",
            "repaso_p4, oficios, profesiones, transporte_terrestre, transporte_aereo, transporte_acuatico",
            "Este bundle es un repaso del cuarto periodo que integra los oficios, las profesiones y los medios de transporte terrestre, aéreo y acuático."),
    "W26": ("medios-comunicacion-radio-tv-internet", "Medios de Comunicación: Radio, TV e Internet",
            "medios_comunicacion, radio, television, internet, comunicacion_masiva, informacion, tecnologia",
            "Este bundle cubre los medios de comunicación masiva en Colombia. Reconoce la radio, la televisión y el internet como herramientas para informarse, comunicarse y entretenerse."),
    "W27": ("periodico-y-noticia", "El Periódico y la Noticia",
            "periodico, noticia, prensa_escrita, periodismo, informacion, lectura_critica, medios_impresos",
            "Este bundle cubre el periódico y la noticia en Colombia. Reconoce la importancia de la prensa escrita para informar a la comunidad y las partes que componen una noticia."),
    "W28": ("carta-y-correo-tradicional", "La Carta y el Correo Tradicional",
            "carta, correo_tradicional, comunicacion_escrita, postal, servicio_postal, 4-72, mensajeria",
            "Este bundle cubre la carta y el correo tradicional en Colombia. Reconoce el servicio postal como medio de comunicación escrita y las partes de una carta."),
    "W29": ("repaso-p5", "Repaso Periodo 5 (W26–W28)",
            "repaso_p5, radio, tv, internet, periodico, noticia, carta, correo",
            "Este bundle es un repaso del quinto periodo que integra los medios de comunicación, el periódico, la noticia y el correo tradicional."),
    "W30": ("regiones-naturales-colombia", "Las Regiones Naturales de Colombia",
            "regiones_naturales, region_andina, region_caribe, region_pacifica, region_orinoquia, region_amazonia, region_insular, geografia_colombia",
            "Este bundle cubre las regiones naturales de Colombia. Reconoce las seis regiones naturales del país y sus características principales."),
    "W31": ("climas-de-colombia", "Climas de Colombia: Cálido, Templado y Frío",
            "climas_colombia, clima_calido, clima_templado, clima_frio, pisos_termicos, geografia, altitudes",
            "Este bundle cubre los climas de Colombia según los pisos térmicos. Reconoce las características del clima cálido, templado y frío y cómo la altura influye en la temperatura."),
    "W32": ("fauna-y-flora-representativa", "Fauna y Flora Representativa de Colombia",
            "fauna_colombia, flora_colombia, biodiversidad, especies_representativas, orquidea, condor, palma_cera, jaguares, patrimonio_natural",
            "Este bundle cubre la fauna y flora representativa de Colombia. Reconoce la increíble biodiversidad del país y sus especies más emblemáticas."),
    "W33": ("repaso-p6", "Repaso Periodo 6 (W30–W32)",
            "repaso_p6, regiones_naturales, climas, fauna, flora, geografia_colombia",
            "Este bundle es un repaso del sexto periodo que integra las regiones naturales, los climas y la fauna y flora de Colombia."),
    "W34": ("fechas-civicas-20-julio-7-agosto", "Fechas Cívicas: 20 de Julio y 7 de Agosto",
            "fechas_civicas, 20_julio, independencia, 7_agosto, batalla_boyaca, historia_colombia, conmemoraciones",
            "Este bundle cubre las fechas cívicas del 20 de julio (Día de la Independencia) y el 7 de agosto (Batalla de Boyacá). Reconoce la importancia de estas fechas en la historia de Colombia."),
    "W35": ("fechas-civicas-12-octubre-independencias", "Fechas Cívicas: 12 de Octubre e Independencias",
            "fechas_civicas, 12_octubre, descubrimiento_america, diversidad_cultural, independencias_latinoamericanas, conmemoraciones",
            "Este bundle cubre la fecha cívica del 12 de octubre y el proceso de independencias latinoamericanas. Reconoce el significado de esta fecha y su relación con la diversidad cultural."),
    "W36": ("la-familia-tipos-funciones", "La Familia: Tipos y Funciones",
            "familia, tipos_familia, funciones_familiares, nucleo_familiar, familia_extensa, monoparental, valores_familiares",
            "Este bundle cubre la familia como núcleo fundamental de la sociedad colombiana. Reconoce los diferentes tipos de familia y las funciones que cumple en la formación de los niños."),
    "W37": ("municipio-autoridades-alcalde", "El Municipio y sus Autoridades: El Alcalde",
            "municipio, alcalde, autoridades_locales, gobierno_municipal, administracion_local, alcaldia",
            "Este bundle cubre el municipio y sus autoridades en Colombia. Reconoce la figura del alcalde como máxima autoridad municipal y las funciones del gobierno local."),
    "W38": ("departamento-autoridades-gobernador", "El Departamento y sus Autoridades: El Gobernador",
            "departamento, gobernador, autoridades_departamentales, gobierno_regional, asamblea_departamental, organizacion_territorial",
            "Este bundle cubre el departamento y sus autoridades en Colombia. Reconoce la figura del gobernador como máxima autoridad departamental y la organización del gobierno regional."),
    "W39": ("colombia-paises-vecinos", "Colombia y sus Países Vecinos",
            "paises_vecinos, fronteras, venezuela, brasil, ecuador, peru, panama, relaciones_internacionales",
            "Este bundle cubre los países vecinos de Colombia. Reconoce cuáles son los países que comparten frontera con Colombia y la importancia de las relaciones de amistad con ellos."),
    "W40": ("repaso-integral-anual", "Repaso Integral Anual",
            "repaso_integral, anual, todos_temas, ciudadania, geografia, historia, derechos, deberes, convivencia",
            "Este bundle es un repaso integral de todo el año escolar en Sociales y Ciudadanas para grado 3. Integra todos los temas vistos durante el año para reforzar los aprendizajes más importantes."),
}

QUESTIONS = {}
QUESTIONS["W08"] = [
    {
        "difficulty": 1, "bloom": "Remember", "icfes": "Uso comprensivo del conocimiento social",
        "exp_success": 0.82,
        "context": "En la clase de Sociales de la I.E. San Bartolomé de Bogotá, la profesora muestra fotos del campo y la ciudad y pregunta las diferencias.",
        "q": "¿Cuál de las siguientes es una característica del campo colombiano?",
        "correct": "Hay muchas plantas, animales y cultivos, y las casas están más separadas entre sí.",
        "choices": [
            "B) Hay edificios muy altos, avenidas grandes y muchas tiendas. <!-- feedback: Incorrecto. Esa es una característica típica de la ciudad. -->",
            "C) Hay muchos semáforos, buses y trancones de tráfico. <!-- feedback: Incorrecto. Esas son características de la vida en la ciudad. -->",
            "D) Hay centros comerciales, cines y muchas personas caminando por las calles. <!-- feedback: Incorrecto. Esa descripción corresponde a la ciudad. -->",
        ],
        "explicacion": "El campo colombiano se caracteriza por grandes extensiones de tierra dedicadas a la agricultura y la ganadería. Las viviendas están más dispersas, hay abundante vegetación y animales, y el aire es más limpio. Es el lugar donde se producen muchos de los alimentos que consumimos en las ciudades."
    },
    {
        "difficulty": 1, "bloom": "Remember", "icfes": "Uso comprensivo del conocimiento social",
        "exp_success": 0.80,
        "context": "En la I.E. La Candelaria de Medellín, los estudiantes de grado 3 hablan sobre las características de la ciudad.",
        "q": "¿Qué encontramos principalmente en las ciudades colombianas?",
        "correct": "Calles pavimentadas, edificios, hospitales, colegios y centros comerciales.",
        "choices": [
            "B) Fincas, cultivos de café y potreros para ganado. <!-- feedback: Incorrecto. Esas son características del campo, no de la ciudad. -->",
            "C) Ríos navegables y selvas espesas. <!-- feedback: Incorrecto. Esas son características de regiones naturales, no necesariamente de la ciudad. -->",
            "D) Sembrados de papa y crías de animales de granja. <!-- feedback: Incorrecto. Esas son actividades típicas del campo. -->",
        ],
        "explicacion": "Las ciudades colombianas se caracterizan por tener una alta concentración de personas, edificios, calles pavimentadas, servicios públicos completos y una gran oferta de servicios como hospitales, colegios, centros comerciales y lugares de entretenimiento."
    },
    {
        "difficulty": 2, "bloom": "Understand", "icfes": "Interpretación y análisis de perspectivas",
        "exp_success": 0.75,
        "context": "La profesora de la I.E. Sagrado Corazón de Cali explica las actividades que se realizan en el campo.",
        "q": "¿Por qué es importante el campo para las personas que viven en la ciudad?",
        "correct": "Porque en el campo se producen los alimentos como frutas, verduras, leche y carne que se consumen en la ciudad.",
        "choices": [
            "B) Porque en el campo hay más centros comerciales para comprar. <!-- feedback: Incorrecto. Los centros comerciales están principalmente en las ciudades. -->",
            "C) Porque en el campo hay más hospitales y clínicas. <!-- feedback: Incorrecto. Los hospitales y clínicas se concentran más en las ciudades. -->",
            "D) Porque en el campo hay mejor internet y televisión. <!-- feedback: Incorrecto. La conectividad suele ser mejor en las ciudades. -->",
        ],
        "explicacion": "El campo es fundamental para la vida en la ciudad porque es el lugar donde se producen los alimentos. Los campesinos cultivan frutas, verduras, granos y crían animales que luego se transportan a las ciudades para que todas las personas puedan alimentarse."
    },
    {
        "difficulty": 2, "bloom": "Understand", "icfes": "Interpretación y análisis de perspectivas",
        "exp_success": 0.72,
        "context": "En la I.E. Antonio José de Sucre de Bucaramanga, los estudiantes comparan las viviendas del campo y la ciudad.",
        "q": "¿Cómo son generalmente las casas en el campo colombiano?",
        "correct": "Son más amplias, tienen patio, huerta o jardín grande y están rodeadas de naturaleza.",
        "choices": [
            "B) Son apartamentos en edificios altos con ascensor. <!-- feedback: Incorrecto. Esa es una característica de las viviendas en la ciudad. -->",
            "C) Son todas iguales, pintadas del mismo color y pegadas unas a otras. <!-- feedback: Incorrecto. Las viviendas en el campo suelen ser diferentes entre sí. -->",
            "D) Están hechas solo de vidrio y concreto como los rascacielos. <!-- feedback: Incorrecto. Eso describe construcciones urbanas, no rurales. -->",
        ],
        "explicacion": "Las viviendas en el campo colombiano suelen ser casas amplias con terrenos alrededor donde las familias pueden tener huertas, animales de granja y espacios al aire libre. Están construidas con materiales como bahareque, ladrillo o madera, adaptándose al entorno natural."
    },
    {
        "difficulty": 3, "bloom": "Apply", "icfes": "Pensamiento reflexivo y sistémico",
        "exp_success": 0.65,
        "context": "En la I.E. Simón Bolívar de Ibagué, los estudiantes de grado 3 deben identificar a qué lugar pertenece cada situación.",
        "q": "Carlos vive en una vereda cerca de un río. Todas las mañanas ayuda a su papá a ordeñar las vacas y recoger huevos de las gallinas. ¿Dónde vive Carlos?",
        "correct": "En el campo, porque realiza actividades propias de la vida rural como ordeñar y cuidar animales de granja.",
        "choices": [
            "B) En la ciudad, porque tiene muchas actividades que hacer. <!-- feedback: Incorrecto. Ordeñar vacas y recoger huevos son actividades del campo, no de la ciudad. -->",
            "C) En un centro comercial, porque hay animales. <!-- feedback: Incorrecto. En los centros comerciales no hay vacas ni gallinas. -->",
            "D) En un edificio, porque tiene un río cerca. <!-- feedback: Incorrecto. Tener un río cerca no es exclusivo de la ciudad ni de un edificio. -->",
        ],
        "explicacion": "La descripción de la vida de Carlos corresponde claramente a una zona rural o campo. Las actividades de ordeñar vacas, recoger huevos y vivir en una vereda son típicas de las zonas campesinas colombianas."
    },
    {
        "difficulty": 3, "bloom": "Apply", "icfes": "Pensamiento reflexivo y sistémico",
        "exp_success": 0.62,
        "context": "En la I.E. José María Córdova de Rionegro, la profesora pregunta cómo viajan los alimentos del campo a la ciudad.",
        "q": "Las frutas que se cultivan en el campo de Colombia llegan a la ciudad principalmente a través de:",
        "correct": "Camiones y vehículos de carga que transportan los alimentos desde las fincas hasta los mercados.",
        "choices": [
            "B) Aviones que recogen las frutas directamente de los árboles. <!-- feedback: Incorrecto. Aunque algunos alimentos viajan en avión, la mayoría usa transporte terrestre. -->",
            "C) Tuberías subterráneas que conectan el campo con la ciudad. <!-- feedback: Incorrecto. No existen tuberías para transportar frutas y verduras. -->",
            "D) Personas que caminan desde el campo hasta la ciudad cargando las frutas. <!-- feedback: Incorrecto. Aunque hay comerciantes que viajan, la mayor parte del transporte es en vehículos. -->",
        ],
        "explicacion": "En Colombia, los alimentos del campo llegan a las ciudades principalmente en camiones y vehículos de carga. Estos transportan las cosechas desde las veredas y fincas hasta las centrales de abastos y mercados donde las personas pueden comprarlos."
    },
    {
        "difficulty": 4, "bloom": "Analyze", "icfes": "Razonamiento y Argumentación",
        "exp_success": 0.50,
        "context": "En la I.E. Manuelita Sáenz de Neiva, el profesor pregunta si es mejor vivir en el campo o en la ciudad.",
        "q": "¿Cuál de las siguientes afirmaciones es correcta sobre la vida en el campo y en la ciudad?",
        "correct": "Tanto el campo como la ciudad tienen ventajas y desventajas. En el campo hay más naturaleza y tranquilidad; en la ciudad hay más servicios y oportunidades.",
        "choices": [
            "B) Es mejor vivir en la ciudad porque allá no hay animales. <!-- feedback: Incorrecto. En las ciudades también hay animales, y tener animales no es algo malo. -->",
            "C) Es mejor vivir en el campo porque allá hay más centros comerciales. <!-- feedback: Incorrecto. Los centros comerciales son más comunes en las ciudades. -->",
            "D) El campo es mejor porque no hay que trabajar. <!-- feedback: Incorrecto. En el campo también se trabaja, a veces incluso más duro que en la ciudad. -->",
        ],
        "explicacion": "No se puede decir que un lugar sea mejor que otro, ya que tanto el campo como la ciudad tienen sus ventajas. El campo ofrece naturaleza, aire limpio, tranquilidad y producción de alimentos. La ciudad ofrece más servicios educativos, de salud, entretenimiento y oportunidades laborales. Ambos son importantes y se complementan."
    },
    {
        "difficulty": 5, "bloom": "Evaluate", "icfes": "Pensamiento reflexivo y sistémico",
        "exp_success": 0.42,
        "context": "En la I.E. Técnica de Duitama, los estudiantes debaten sobre cómo mejorar la relación entre el campo y la ciudad.",
        "q": "Un estudiante propone: 'Los niños de la ciudad deberían visitar el campo para aprender de dónde vienen los alimentos'. ¿Por qué es buena esta propuesta?",
        "correct": "Porque ayuda a valorar el trabajo de los campesinos, conocer el origen de los alimentos y entender la importancia del campo para la vida de todos.",
        "choices": [
            "B) Porque en el campo hay menos tareas escolares que en la ciudad. <!-- feedback: Incorrecto. No se trata de tener menos tareas, sino de aprender algo valioso. -->",
            "C) Porque los niños del campo necesitan que los visiten para sentirse importantes. <!-- feedback: Incorrecto. El objetivo no es hacer sentir importantes a otros, sino aprender. -->",
            "D) Porque en la ciudad ya no hay alimentos y hay que buscarlos en el campo. <!-- feedback: Incorrecto. En la ciudad sí hay alimentos, pero estos vienen del campo. -->",
        ],
        "explicacion": "Esta propuesta es valiosa porque permite a los niños de la ciudad conocer y valorar el trabajo de los campesinos colombianos. Al visitar el campo, los niños aprenden que los alimentos no 'aparecen' en los supermercados, sino que son el resultado del trabajo de muchas personas en las zonas rurales. Esto fomenta el respeto por el campo y sus trabajadores."
    },
]

# For brevity, I'll generate all weeks via the write function with full content
# Let me create the script that generates ALL 33 files

def make_q(week, i, qdata):
    """Generate a single question block."""
    lines = []
    lines.append(f"## Pregunta {i+1} [D{qdata['difficulty']}]\n")
    lines.append(f"**ID:** `COL-SOC-CIU-3-2026-{week}-{WEEKS[week][0]}-001-MASTERY-v{i+1}`")
    lines.append(f"**Bloom:** {qdata['bloom']}")
    lines.append(f"**ICFES category:** {qdata['icfes']}")
    lines.append(f"**Expected_Success:** {qdata['exp_success']:.2f}")
    lines.append(f"**Context:** {qdata['context']}\n")
    lines.append("### Enunciado")
    lines.append(qdata['q'] + "\n")
    lines.append("### Opciones")
    # Shuffle: correct is always A, then add distractors
    correct_text = qdata['correct']
    distractor_texts = qdata['choices']
    lines.append(f"- [x] A) {correct_text}")
    for j, dist in enumerate(distractor_texts):
        letter = chr(66 + j)  # B, C, D
        lines.append(f"- [ ] {letter}) {dist}")
    lines.append("")
    lines.append("### Explicación Pedagógica")
    lines.append(qdata['explicacion'])
    lines.append("")
    return "\n".join(lines)


ALL_QUESTIONS = {}

ALL_QUESTIONS["W08"] = [
    {"difficulty": 1, "bloom": "Remember", "icfes": "Uso comprensivo del conocimiento social", "exp_success": 0.82,
     "context": "En la clase de Sociales de la I.E. San Bartolomé de Bogotá, la profesora muestra fotos del campo y la ciudad y pregunta las diferencias.",
     "q": "¿Cuál de las siguientes es una característica del campo colombiano?",
     "correct": "Hay muchas plantas, animales y cultivos, y las casas están más separadas entre sí.",
     "choices": ["B) Hay edificios muy altos, avenidas grandes y muchas tiendas. <!-- feedback: Incorrecto. Esa es una característica típica de la ciudad. -->",
                 "C) Hay muchos semáforos, buses y trancones de tráfico. <!-- feedback: Incorrecto. Esas son características de la vida en la ciudad. -->",
                 "D) Hay centros comerciales, cines y muchas personas caminando por las calles. <!-- feedback: Incorrecto. Esa descripción corresponde a la ciudad. -->"],
     "explicacion": "El campo colombiano se caracteriza por grandes extensiones de tierra dedicadas a la agricultura y la ganadería. Las viviendas están más dispersas, hay abundante vegetación y animales, y el aire es más limpio. Es el lugar donde se producen muchos de los alimentos que consumimos en las ciudades."},
    {"difficulty": 1, "bloom": "Remember", "icfes": "Uso comprensivo del conocimiento social", "exp_success": 0.80,
     "context": "En la I.E. La Candelaria de Medellín, los estudiantes de grado 3 hablan sobre las características de la ciudad.",
     "q": "¿Qué encontramos principalmente en las ciudades colombianas?",
     "correct": "Calles pavimentadas, edificios, hospitales, colegios y centros comerciales.",
     "choices": ["B) Fincas, cultivos de café y potreros para ganado. <!-- feedback: Incorrecto. Esas son características del campo, no de la ciudad. -->",
                 "C) Ríos navegables y selvas espesas. <!-- feedback: Incorrecto. Esas son características de regiones naturales, no necesariamente de la ciudad. -->",
                 "D) Sembrados de papa y crías de animales de granja. <!-- feedback: Incorrecto. Esas son actividades típicas del campo. -->"],
     "explicacion": "Las ciudades colombianas se caracterizan por tener una alta concentración de personas, edificios, calles pavimentadas, servicios públicos completos y una gran oferta de servicios como hospitales, colegios, centros comerciales y lugares de entretenimiento."},
    {"difficulty": 2, "bloom": "Understand", "icfes": "Interpretación y análisis de perspectivas", "exp_success": 0.75,
     "context": "La profesora de la I.E. Sagrado Corazón de Cali explica las actividades que se realizan en el campo.",
     "q": "¿Por qué es importante el campo para las personas que viven en la ciudad?",
     "correct": "Porque en el campo se producen los alimentos como frutas, verduras, leche y carne que se consumen en la ciudad.",
     "choices": ["B) Porque en el campo hay más centros comerciales para comprar. <!-- feedback: Incorrecto. Los centros comerciales están principalmente en las ciudades. -->",
                 "C) Porque en el campo hay más hospitales y clínicas. <!-- feedback: Incorrecto. Los hospitales y clínicas se concentran más en las ciudades. -->",
                 "D) Porque en el campo hay mejor internet y televisión. <!-- feedback: Incorrecto. La conectividad suele ser mejor en las ciudades. -->"],
     "explicacion": "El campo es fundamental para la vida en la ciudad porque es el lugar donde se producen los alimentos. Los campesinos cultivan frutas, verduras, granos y crían animales que luego se transportan a las ciudades para que todas las personas puedan alimentarse."},
    {"difficulty": 2, "bloom": "Understand", "icfes": "Interpretación y análisis de perspectivas", "exp_success": 0.72,
     "context": "En la I.E. Antonio José de Sucre de Bucaramanga, los estudiantes comparan las viviendas del campo y la ciudad.",
     "q": "¿Cómo son generalmente las casas en el campo colombiano?",
     "correct": "Son más amplias, tienen patio, huerta o jardín grande y están rodeadas de naturaleza.",
     "choices": ["B) Son apartamentos en edificios altos con ascensor. <!-- feedback: Incorrecto. Esa es una característica de las viviendas en la ciudad. -->",
                 "C) Son todas iguales, pintadas del mismo color y pegadas unas a otras. <!-- feedback: Incorrecto. Las viviendas en el campo suelen ser diferentes entre sí. -->",
                 "D) Están hechas solo de vidrio y concreto como los rascacielos. <!-- feedback: Incorrecto. Eso describe construcciones urbanas, no rurales. -->"],
     "explicacion": "Las viviendas en el campo colombiano suelen ser casas amplias con terrenos alrededor donde las familias pueden tener huertas, animales de granja y espacios al aire libre. Están construidas con materiales como bahareque, ladrillo o madera, adaptándose al entorno natural."},
    {"difficulty": 3, "bloom": "Apply", "icfes": "Pensamiento reflexivo y sistémico", "exp_success": 0.65,
     "context": "En la I.E. Simón Bolívar de Ibagué, los estudiantes de grado 3 deben identificar a qué lugar pertenece cada situación.",
     "q": "Carlos vive en una vereda cerca de un río. Todas las mañanas ayuda a su papá a ordeñar las vacas y recoger huevos de las gallinas. ¿Dónde vive Carlos?",
     "correct": "En el campo, porque realiza actividades propias de la vida rural como ordeñar y cuidar animales de granja.",
     "choices": ["B) En la ciudad, porque tiene muchas actividades que hacer. <!-- feedback: Incorrecto. Or