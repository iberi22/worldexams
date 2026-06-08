import os

BASE = "E:/scripts-python/worldexams/questions_data/colombia/sociales-ciudadanas/grado-5/2026/weekly"

topics = {
    "W01": "continentes-oceanos",
    "W02": "mapas-planos",
    "W03": "puntos-cardinales",
    "W04": "representaciones-tierra",
    "W05": "repaso-p1",
    "W06": "relieve-colombia",
    "W07": "hidrografia-colombia",
    "W08": "climas-pisos-termicos",
    "W09": "regiones-naturales-p1",
    "W10": "repaso-p2",
    "W11": "regiones-naturales-p2",
    "W12": "poblamiento-america",
    "W13": "culturas-precolombinas-taironas",
    "W14": "culturas-precolombinas-muiscas",
    "W15": "repaso-p3",
    "W16": "llegada-espanoles",
    "W17": "colonia-virreinato",
    "W18": "sociedad-colonial",
    "W19": "economia-colonial",
    "W20": "repaso-general-p1-p3",
    "W21": "independencia-colombia",
    "W22": "campana-libertadora",
    "W23": "gran-colombia",
    "W24": "republica-siglo-xix",
    "W25": "repaso-p4",
    "W26": "hegemonia-conservadora",
    "W27": "republica-liberal",
    "W28": "frente-nacional",
    "W29": "colombia-contemporanea",
    "W30": "repaso-p5",
    "W31": "constitucion-1991",
    "W32": "organizacion-estado",
    "W33": "democracia-participacion",
    "W34": "repaso-p6",
    "W35": "relaciones-internacionales",
    "W36": "organismos-internacionales",
    "W37": "derechos-humanos",
    "W38": "convivencia-paz",
    "W39": "economia-colombia",
    "W40": "repaso-integral-anual",
}

rubrics = {
    "W01": "Ubicación básica de continentes y océanos en el mapamundi",
    "W02": "Lectura básica de mapas, planos y coordenadas geográficas",
    "W03": "Puntos cardinales: norte, sur, este, oeste. Orientación en mapas y el terreno",
    "W04": "Representaciones de la Tierra: globo terráqueo, mapamundi, proyecciones cartográficas",
    "W05": "Repaso general conceptos geográficos básicos: continentes, océanos, mapas, orientación",
    "W06": "Relieve colombiano: cordilleras, valles, llanuras y montañas",
    "W07": "Hidrografía de Colombia: principales ríos y cuencas hidrográficas",
    "W08": "Climas y pisos térmicos en Colombia: relaciones clima-altitud",
    "W09": "Regiones naturales de Colombia: Andina, Caribe, Pacífica",
    "W10": "Repaso relieve, hidrografía, clima y regiones naturales",
    "W11": "Regiones naturales: Orinoquía, Amazonía, Insular",
    "W12": "Teorías del poblamiento de América: estrecho de Bering, rutas migratorias",
    "W13": "Cultura precolombina Tairona: organización social, economía, vivienda",
    "W14": "Culturas Muisca y Quimbaya: organización política, economía, orfebrería",
    "W15": "Repaso culturas precolombinas y poblamiento",
    "W16": "La conquista española: llegada, fundaciones, resistencia indígena",
    "W17": "La Colonia: Virreinato de Nueva Granada, instituciones coloniales",
    "W18": "Sociedad colonial: castas, clases sociales y oficios",
    "W19": "Economía colonial: minería, agricultura, comercio y mita",
    "W20": "Repaso general conquista, colonia y sociedad colonial",
    "W21": "Independencia de Colombia: 1810, El Florero de Llorente, primeras juntas",
    "W22": "Campaña Libertadora: Simón Bolívar, Batalla de Boyacá, independencia definitiva",
    "W23": "La Gran Colombia: creación, territorio, disolución",
    "W24": "La República en el siglo XIX: guerras civiles, federalismo vs centralismo, Constitución 1886",
    "W25": "Repaso independencia, Gran Colombia y siglo XIX",
    "W26": "Colombia siglo XX: Hegemonía conservadora (1886-1930)",
    "W27": "Colombia siglo XX: República Liberal (1930-1946), reformas sociales",
    "W28": "Frente Nacional (1958-1974): alternación política, acuerdos",
    "W29": "Colombia contemporánea: conflicto armado, proceso de paz, siglo XXI",
    "W30": "Repaso Colombia siglo XX y contemporánea",
    "W31": "Constitución de 1991: derechos fundamentales, mecanismos de participación",
    "W32": "Organización del Estado colombiano: ramas del poder público, organismos de control",
    "W33": "Democracia y participación ciudadana: voto, mecanismos, deberes ciudadanos",
    "W34": "Repaso Constitución, Estado y democracia",
    "W35": "Colombia y sus relaciones internacionales: fronteras, tratados, integración",
    "W36": "Organismos internacionales: ONU, OEA, UNICEF, derechos humanos",
    "W37": "Derechos humanos y derechos del niño: declaraciones, protección",
    "W38": "Convivencia y paz: resolución de conflictos, valores ciudadanos, cultura de paz",
    "W39": "Economía colombiana: sectores económicos primario, secundario, terciario",
    "W40": "Repaso integral anual: conceptos fundamentales de sociales y ciudadanas",
}

tema_titles = {
    "W01": "Continentes y Océanos",
    "W02": "Mapas y Planos",
    "W03": "Puntos Cardinales y Orientación",
    "W04": "Representaciones de la Tierra",
    "W05": "Repaso P1",
    "W06": "Relieve de Colombia",
    "W07": "Hidrografía de Colombia",
    "W08": "Climas y Pisos Térmicos",
    "W09": "Regiones Naturales (Andina, Caribe, Pacífica)",
    "W10": "Repaso P2",
    "W11": "Regiones Naturales (Orinoquía, Amazonía, Insular)",
    "W12": "Poblamiento de América",
    "W13": "Culturas Precolombinas: Taironas",
    "W14": "Culturas Precolombinas: Muiscas y Quimbayas",
    "W15": "Repaso P3",
    "W16": "La Llegada de los Españoles",
    "W17": "La Colonia: Virreinato",
    "W18": "Sociedad Colonial",
    "W19": "Economía Colonial",
    "W20": "Repaso General P1-P3",
    "W21": "Independencia de Colombia",
    "W22": "Campaña Libertadora",
    "W23": "La Gran Colombia",
    "W24": "La República en el Siglo XIX",
    "W25": "Repaso P4",
    "W26": "Hegemonía Conservadora",
    "W27": "República Liberal",
    "W28": "Frente Nacional",
    "W29": "Colombia Contemporánea",
    "W30": "Repaso P5",
    "W31": "La Constitución de 1991",
    "W32": "Organización del Estado",
    "W33": "Democracia y Participación Ciudadana",
    "W34": "Repaso P6",
    "W35": "Relaciones Internacionales",
    "W36": "Organismos Internacionales",
    "W37": "Derechos Humanos",
    "W38": "Convivencia y Paz",
    "W39": "Economía de Colombia",
    "W40": "Repaso Integral Anual",
}


def generate_questions(week, tema_slug):
    """Generate 10 questions for the given week."""
    theme = tema_titles[week]
    rubric = rubrics[week]
    
    qq = [
        # Q1: Basic fact/remember
        {
            "id": f"CO-SOC-5-2026-{week}-{tema_slug}-001-MASTERY-v1",
            "bloom": "Remember",
            "d": "D1",
            "diff": "fácil"
        },
        # Q2: Remember
        {
            "id": f"CO-SOC-5-2026-{week}-{tema_slug}-001-MASTERY-v2",
            "bloom": "Remember",
            "d": "D1",
            "diff": "fácil"
        },
        # Q3: Understand
        {
            "id": f"CO-SOC-5-2026-{week}-{tema_slug}-001-MASTERY-v3",
            "bloom": "Understand",
            "d": "D2",
            "diff": "fácil"
        },
        # Q4: Understand
        {
            "id": f"CO-SOC-5-2026-{week}-{tema_slug}-001-MASTERY-v4",
            "bloom": "Understand",
            "d": "D2",
            "diff": "fácil"
        },
        # Q5: Remember
        {
            "id": f"CO-SOC-5-2026-{week}-{tema_slug}-001-MASTERY-v5",
            "bloom": "Remember",
            "d": "D2",
            "diff": "fácil"
        },
        # Q6: Apply
        {
            "id": f"CO-SOC-5-2026-{week}-{tema_slug}-001-MASTERY-v6",
            "bloom": "Apply",
            "d": "D3",
            "diff": "media"
        },
        # Q7: Understand
        {
            "id": f"CO-SOC-5-2026-{week}-{tema_slug}-001-MASTERY-v7",
            "bloom": "Understand",
            "d": "D3",
            "diff": "media"
        },
        # Q8: Apply
        {
            "id": f"CO-SOC-5-2026-{week}-{tema_slug}-001-MASTERY-v8",
            "bloom": "Apply",
            "d": "D3",
            "diff": "media"
        },
        # Q9: Analyze
        {
            "id": f"CO-SOC-5-2026-{week}-{tema_slug}-001-MASTERY-v9",
            "bloom": "Analyze",
            "d": "D4",
            "diff": "difícil"
        },
        # Q10: Analyze/Evaluate
        {
            "id": f"CO-SOC-5-2026-{week}-{tema_slug}-001-MASTERY-v10",
            "bloom": "Evaluate",
            "d": "D4",
            "diff": "difícil"
        },
    ]
    return qq


question_pool = {}
question_pool["W01"] = [
    {
        "text": "¿Cuántos continentes hay reconocidos tradicionalmente en el mundo?",
        "correct": "C) 6. Tradicionalmente se reconocen 6 continentes: América, Europa, Asia, África, Oceanía y Antártida.",
        "options": [
            ("A) 5", "Incorrecto. Tradicionalmente se reconocen más de 5 continentes."),
            ("B) 6", "Correcto. Tradicionalmente se reconocen 6 continentes."),
            ("C) 7", "Incorrecto. Algunos modelos consideran 7 al separar América en Norte y Sur, pero el modelo tradicional reconoce 6."),
            ("D) 4", "Incorrecto. Hay más de 4 continentes en el planeta."),
        ],
        "explanation": "Tradicionalmente se reconocen 6 continentes: América, Europa, Asia, África, Oceanía y Antártida. Colombia pertenece al continente americano.",
        "context": "Contexto colombiano",
    },
    {
        "text": "¿En qué continente se encuentra ubicada Colombia?",
        "correct": "C) América",
        "options": [
            ("A) Europa", "Incorrecto. Colombia no está en Europa."),
            ("B) África", "Incorrecto. Colombia está en América."),
            ("C) América", "Correcto. Colombia está en el continente americano, en América del Sur."),
            ("D) Asia", "Incorrecto. Colombia no está en Asia."),
        ],
        "explanation": "Colombia se encuentra en el continente americano, en la región noroccidental de América del Sur.",
        "context": "Contexto colombiano",
    },
    {
        "text": "¿Cuál es el océano más grande del mundo?",
        "correct": "C) Océano Pacífico",
        "options": [
            ("A) Océano Atlántico", "Incorrecto. El Atlántico es el segundo océano más grande."),
            ("B) Océano Índico", "Incorrecto. El Índico es el tercero."),
            ("C) Océano Pacífico", "Correcto. El Pacífico es el océano más grande y profundo."),
            ("D) Océano Antártico", "Incorrecto. Es uno de los más pequeños."),
        ],
        "explanation": "El océano Pacífico es el más grande, cubriendo un tercio de la superficie terrestre. Colombia tiene costas sobre este océano.",
        "context": "Contexto colombiano",
    },
    {
        "text": "Observa el mapamundi. ¿Qué continente se encuentra al otro lado del océano Atlántico, al oriente de Colombia?",
        "correct": "B) África",
        "options": [
            ("A) Asia", "Incorrecto. Asia está más lejos."),
            ("B) África", "Correcto. Cruzando el Atlántico hacia el este desde Colombia se llega a África."),
            ("C) Oceanía", "Incorrecto. Oceanía está en el Pacífico sur."),
            ("D) Europa", "Incorrecto. Europa está al norte de África."),
        ],
        "explanation": "Desde Colombia, cruzando el océano Atlántico al oriente, se llega al continente africano.",
        "context": "Contexto colombiano",
    },
    {
        "text": "Colombia tiene costas sobre dos océanos. ¿Cuáles son?",
        "correct": "C) Pacífico y Atlántico",
        "options": [
            ("A) Atlántico e Índico", "Incorrecto. Colombia no tiene costas en el Índico."),
            ("B) Pacífico e Índico", "Incorrecto. No toca el Índico."),
            ("C) Pacífico y Atlántico", "Correcto. Colombia tiene costas en el Pacífico y el mar Caribe (Atlántico)."),
            ("D) Atlántico y Antártico", "Incorrecto. No toca el Antártico."),
        ],
        "explanation": "Colombia tiene costas sobre el océano Pacífico al occidente y el mar Caribe (cuenca del Atlántico) al norte.",
        "context": "Contexto colombiano",
    },
    {
        "text": "¿Cuál de los siguientes NO es un continente?",
        "correct": "D) Caribe",
        "options": [
            ("A) Oceanía", "Incorrecto. Oceanía sí es un continente."),
            ("B) Antártida", "Incorrecto. La Antártida sí es un continente."),
            ("C) América", "Incorrecto. América sí es un continente."),
            ("D) Caribe", "Correcto. El Caribe es una región, no un continente."),
        ],
        "explanation": "El Caribe es una región geográfica, no un continente. Colombia tiene territorio insular en el Caribe (San Andrés).",
        "context": "Contexto colombiano",
    },
    {
        "text": "¿Qué continente es el más poblado del mundo?",
        "correct": "B) Asia",
        "options": [
            ("A) América", "Incorrecto. América tiene mucha población pero no es el más poblado."),
            ("B) Asia", "Correcto. Asia es el continente más poblado, con China e India."),
            ("C) Europa", "Incorrecto. Europa no es el más poblado."),
            ("D) África", "Incorrecto. África crece rápido pero no supera a Asia."),
        ],
        "explanation": "Asia es el continente más poblado con aproximadamente el 60% de la población mundial.",
        "context": "Contexto colombiano",
    },
    {
        "text": "¿Qué océano baña la costa occidental de Colombia?",
        "correct": "B) Océano Pacífico",
        "options": [
            ("A) Océano Atlántico", "Incorrecto. El Atlántico baña la costa norte (mar Caribe)."),
            ("B) Océano Pacífico", "Correcto. El Pacífico baña la costa occidental de Colombia."),
            ("C) Océano Índico", "Incorrecto. Está entre África, Asia y Oceanía."),
            ("D) Océano Antártico", "Incorrecto. Rodea la Antártida."),
        ],
        "explanation": "La costa occidental de Colombia está bañada por el océano Pacífico en la región Pacífica colombiana.",
        "context": "Contexto colombiano",
    },
    {
        "text": "María quiere señalar Colombia en el mapamundi. Su maestra dice que busque cerca de la línea del Ecuador y al occidente de Greenwich. ¿En qué continente debe buscar?",
        "correct": "C) América",
        "options": [
            ("A) Europa", "Incorrecto. Europa está al norte del Ecuador."),
            ("B) África", "Incorrecto. África está al este de Colombia."),
            ("C) América", "Correcto. Colombia está en América del Sur, cerca del Ecuador, al occidente de Greenwich."),
            ("D) Asia", "Incorrecto. Asia está al este de Greenwich."),
        ],
        "explanation": "Colombia está en América del Sur, cerca de la línea del Ecuador, al occidente del meridiano de Greenwich.",
        "context": "Contexto colombiano",
    },
    {
        "text": "¿Cuál afirmación sobre los continentes es CORRECTA?",
        "correct": "D) América es el segundo continente más grande del mundo",
        "options": [
            ("A) La Antártida es el continente más poblado", "Incorrecto. La Antártida no tiene población permanente."),
            ("B) Oceanía está formada solo por Australia", "Incorrecto. Incluye muchas islas del Pacífico."),
            ("C) Europa es el continente más grande", "Incorrecto. Europa es pequeño en extensión."),
            ("D) América es el segundo continente más grande del mundo", "Correcto. América es el segundo después de Asia."),
        ],
        "explanation": "América es el segundo continente más grande después de Asia. Se divide en Norte, Centro y Sur América.",
        "context": "Contexto colombiano",
    },
]

if __name__ == "__main__":
    os.makedirs(BASE, exist_ok=True)
    print(f"Generating {len(topics)} weekly bundles...")
    for week, tema in topics.items():
        fname = f"CO-SOC-5-2026-{week}-{tema}-001-MASTERY.md"
        fpath = os.path.join(BASE, fname)
        if os.path.exists(fpath):
            print(f"  EXISTS {fname}")
        else:
            print(f"  MISSING {fname}")
    print("Done checking.")
