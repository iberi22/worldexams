#!/usr/bin/env python3
"""
Generate MASTERY bundles for Colombia Grade 3, 5, 6.
Generates period-specific bundles (P1-P4) for each subject.
"""

import os

BASE = r"E:\scripts-python\worldexams\questions_data\colombia"

# ─── GRADE 3 ───
GRADE3 = {
    "lengua": {
        "subject_id": "LEN",
        "name": "Lengua Castellana",
        "periods": {
            "P1": {
                "tema": "lectoescritura-basica",
                "topic": "Lectoescritura Básica",
                "rubric": "lectoescritura, conciencia fonológica, sílabas, oraciones simples",
                "desc": "Este bundle cubre los fundamentos de lectoescritura para grado 3: reconocimiento de sílabas, construcción de oraciones simples y comprensión de textos cortos."
            },
            "P2": {
                "tema": "comprension-cuentos",
                "topic": "Comprensión de Cuentos",
                "rubric": "comprensión lectora, cuentos, personajes, secuencia narrativa",
                "desc": "Este bundle evalúa la comprensión de cuentos infantiles: identificación de personajes, secuencia de eventos y mensaje del texto."
            },
            "P3": {
                "tema": "gramatica-fundamental",
                "topic": "Gramática Fundamental",
                "rubric": "gramática, sustantivos, adjetivos, verbos, concordancia",
                "desc": "Este bundle evalúa los conceptos gramaticales fundamentales: sustantivos, adjetivos, verbos y concordancia básica."
            },
            "P4": {
                "tema": "produccion-textual",
                "topic": "Producción Textual",
                "rubric": "producción textual, párrafos, estructura de texto, conectores básicos",
                "desc": "Este bundle cubre la producción textual: estructura de párrafos, uso de conectores y organización de ideas."
            }
        }
    },
    "matematicas": {
        "subject_id": "MAT",
        "name": "Matemáticas",
        "periods": {
            "P1": {
                "tema": "numeros-hasta-1000",
                "topic": "Números hasta 1000",
                "rubric": "numeración, valor posicional, comparación, orden hasta 1000",
                "desc": "Este bundle cubre los números hasta 1000: lectura, escritura, valor posicional, comparación y orden."
            },
            "P2": {
                "tema": "suma-y-resta",
                "topic": "Suma y Resta",
                "rubric": "suma, resta, llevadas, préstamos, problemas verbales",
                "desc": "Este bundle evalúa las operaciones de suma y resta con números de hasta 3 cifras, incluyendo llevadas y problemas contextualizados."
            },
            "P3": {
                "tema": "figuras-geometricas",
                "topic": "Figuras Geométricas",
                "rubric": "geometría, figuras 2D, figuras 3D, clasificación, elementos",
                "desc": "Este bundle cubre las figuras geométricas básicas: clasificación de figuras 2D y 3D, sus elementos y propiedades."
            },
            "P4": {
                "tema": "medicion-basica",
                "topic": "Medición Básica",
                "rubric": "medición, longitud, masa, capacidad, tiempo, unidades no convencionales",
                "desc": "Este bundle evalúa conceptos básicos de medición: longitud, masa, capacidad y tiempo con unidades convencionales y no convencionales."
            }
        }
    },
    "ciencias-naturales": {
        "subject_id": "CN",
        "name": "Ciencias Naturales",
        "periods": {
            "P1": {
                "tema": "los-sentidos",
                "topic": "Los Sentidos",
                "rubric": "sentidos, vista, oído, tacto, gusto, olfato, órganos sensoriales",
                "desc": "Este bundle cubre los cinco sentidos: órganos asociados, funciones y su importancia en la percepción del entorno."
            },
            "P2": {
                "tema": "plantas-y-animales",
                "topic": "Plantas y Animales",
                "rubric": "seres vivos, plantas, animales, clasificación, partes, hábitats",
                "desc": "Este bundle evalúa el conocimiento sobre plantas y animales: sus partes, clasificación básica y hábitats naturales."
            },
            "P3": {
                "tema": "el-agua",
                "topic": "El Agua",
                "rubric": "agua, estados, ciclo del agua, importancia, usos",
                "desc": "Este bundle cubre el agua: sus estados (sólido, líquido, gaseoso), el ciclo del agua y su importancia para la vida."
            },
            "P4": {
                "tema": "el-clima",
                "topic": "El Clima",
                "rubric": "clima, tiempo atmosférico, temperatura, lluvia, viento, estaciones",
                "desc": "Este bundle evalúa conceptos básicos sobre el clima: tiempo atmosférico, temperatura, precipitaciones y fenómenos climáticos."
            }
        }
    }
}

# ─── GRADE 5 ───
GRADE5 = {
    "lectura-critica": {
        "subject_id": "LC",
        "name": "Lectura Crítica",
        "periods": {
            "P1": {
                "tema": "textos-narrativos",
                "topic": "Textos Narrativos",
                "rubric": "textos narrativos, cuento, fábula, estructura narrativa, personajes, escenario",
                "desc": "Este bundle cubre la comprensión de textos narrativos: identificación de estructura (inicio-nudo-desenlace), personajes y escenarios en cuentos y fábulas."
            },
            "P2": {
                "tema": "textos-informativos",
                "topic": "Textos Informativos",
                "rubric": "textos informativos, noticia, artículo, idea principal, datos clave",
                "desc": "Este bundle evalúa la comprensión de textos informativos: identificación de idea principal, datos relevantes y estructura de noticias y artículos."
            },
            "P3": {
                "tema": "comprension-inferencial",
                "topic": "Comprensión Inferencial",
                "rubric": "inferencia, deducción, causa-efecto, conclusión implícita",
                "desc": "Este bundle evalúa la comprensión inferencial: deducir información implícita, relaciones causa-efecto y conclusiones a partir del texto."
            },
            "P4": {
                "tema": "poesia",
                "topic": "Poesía",
                "rubric": "poesía, rima, verso, estrofa, figuras literarias, metáfora, símil",
                "desc": "Este bundle cubre la poesía: identificación de rima, verso y estrofa, así como figuras literarias básicas como metáfora y símil."
            }
        }
    },
    "matematicas": {
        "subject_id": "MAT",
        "name": "Matemáticas",
        "periods": {
            "P1": {
                "tema": "fracciones",
                "topic": "Fracciones",
                "rubric": "fracciones, representación, comparación, equivalencia, operaciones básicas",
                "desc": "Este bundle cubre fracciones: representación gráfica, comparación, fracciones equivalentes y operaciones básicas de suma y resta con igual denominador."
            },
            "P2": {
                "tema": "decimales",
                "topic": "Decimales",
                "rubric": "decimales, décimas, centésimas, milésimas, comparación, operaciones",
                "desc": "Este bundle evalúa números decimales: lectura, escritura, comparación, orden y operaciones básicas de suma y resta con decimales."
            },
            "P3": {
                "tema": "geometria",
                "topic": "Geometría",
                "rubric": "geometría, polígonos, ángulos, perímetro, área",
                "desc": "Este bundle cubre geometría: clasificación de polígonos, medición de ángulos, cálculo de perímetro y área de figuras planas."
            },
            "P4": {
                "tema": "estadistica",
                "topic": "Estadística",
                "rubric": "estadística, datos, frecuencia, gráfica de barras, moda, promedio",
                "desc": "Este bundle evalúa estadística básica: recolección y organización de datos, gráficas de barras, moda y promedio."
            }
        }
    },
    "ciencias-naturales": {
        "subject_id": "CN",
        "name": "Ciencias Naturales",
        "periods": {
            "P1": {
                "tema": "sistema-digestivo",
                "topic": "Sistema Digestivo",
                "rubric": "sistema digestivo, órganos, digestión, nutrientes, boca, estómago, intestinos",
                "desc": "Este bundle cubre el sistema digestivo humano: órganos que lo componen, proceso de digestión y función de cada parte."
            },
            "P2": {
                "tema": "ecosistemas",
                "topic": "Ecosistemas",
                "rubric": "ecosistemas, hábitat, comunidades, cadenas alimenticias, productores, consumidores",
                "desc": "Este bundle evalúa ecosistemas: componentes bióticos y abióticos, cadenas alimenticias y relaciones entre organismos."
            },
            "P3": {
                "tema": "electricidad-basica",
                "topic": "Electricidad Básica",
                "rubric": "electricidad, circuitos simples, conductores, aislantes, pilas, bombillos",
                "desc": "Este bundle cubre electricidad básica: circuitos simples, materiales conductores y aislantes, y funcionamiento de aparatos eléctricos."
            },
            "P4": {
                "tema": "sistema-solar",
                "topic": "El Sistema Solar",
                "rubric": "sistema solar, planetas, Sol, Luna, rotación, traslación, fases lunares",
                "desc": "Este bundle evalúa el sistema solar: planetas, movimientos de rotación y traslación, fases de la Luna y características del Sol."
            }
        }
    },
    "sociales-ciudadanas": {
        "subject_id": "SOC",
        "name": "Sociales y Ciudadanas",
        "periods": {
            "P1": {
                "tema": "colombia-precolombina",
                "topic": "Colombia Precolombina",
                "rubric": "culturas precolombinas, Muisca, Tairona, Quimbaya, organización social, legado",
                "desc": "Este bundle cubre las culturas precolombinas en Colombia: Muisca, Tairona y Quimbaya, su organización social, economía y legado cultural."
            },
            "P2": {
                "tema": "independencia",
                "topic": "Independencia de Colombia",
                "rubric": "independencia, 1810, 1819, Simón Bolívar, Campaña Libertadora, Batalla de Boyacá",
                "desc": "Este bundle evalúa el proceso de Independencia de Colombia: causas, personajes principales, fechas clave y la Campaña Libertadora."
            },
            "P3": {
                "tema": "geografia-colombia",
                "topic": "Geografía de Colombia",
                "rubric": "geografía, regiones naturales, relieve, hidrografía, Andes, Amazonía, Caribe, Pacífico",
                "desc": "Este bundle cubre la geografía de Colombia: regiones naturales, relieve, ríos principales y características de cada región."
            },
            "P4": {
                "tema": "derechos-ciudadanos",
                "topic": "Derechos Ciudadanos",
                "rubric": "derechos, deberes, Constitución, ciudadanía, participación, democracia",
                "desc": "Este bundle evalúa los derechos y deberes ciudadanos: principios de la Constitución, mecanismos de participación y valores democráticos."
            }
        }
    },
    "ingles": {
        "subject_id": "ING",
        "name": "Inglés",
        "periods": {
            "P1": {
                "tema": "descriptions",
                "topic": "Descriptions",
                "rubric": "descriptions, adjectives, appearance, personality, verb to be, have/has",
                "desc": "This bundle covers basic descriptions: physical appearance, personality traits, using verb to be and have/has."
            },
            "P2": {
                "tema": "daily-routines",
                "topic": "Daily Routines",
                "rubric": "daily routines, present simple, frequency adverbs, time expressions",
                "desc": "This bundle evaluates daily routines vocabulary, present simple tense, frequency adverbs and time expressions."
            },
            "P3": {
                "tema": "food-drink",
                "topic": "Food and Drink",
                "rubric": "food, drinks, countable, uncountable, likes/dislikes, restaurant vocabulary",
                "desc": "This bundle covers food and drink vocabulary: countable/uncountable nouns, expressing likes/dislikes and restaurant language."
            },
            "P4": {
                "tema": "hobbies",
                "topic": "Hobbies",
                "rubric": "hobbies, sports, free time activities, present continuous, can/can't",
                "desc": "This bundle evaluates hobbies and free time activities: vocabulary, present continuous, abilities with can/can't."
            }
        }
    }
}

# ─── GRADE 6 ───
GRADE6 = {
    "lectura-critica": {
        "subject_id": "LC",
        "name": "Lectura Crítica",
        "periods": {
            "P1": {
                "tema": "narrative-texts",
                "topic": "Narrative Texts",
                "rubric": "narrative texts, story elements, plot, characters, setting, narrator",
                "desc": "This bundle covers narrative text comprehension: elements of stories, plot structure, characterization and narrator types."
            },
            "P2": {
                "tema": "informative-texts",
                "topic": "Informative Texts",
                "rubric": "informative texts, expository, main idea, supporting details, text structure",
                "desc": "This bundle evaluates informative text comprehension: identifying main ideas, supporting details and organizational structures."
            },
            "P3": {
                "tema": "literal-inferential-comprehension",
                "topic": "Literal and Inferential Comprehension",
                "rubric": "literal comprehension, inferential comprehension, implicit information, conclusions",
                "desc": "This bundle covers literal and inferential reading comprehension: extracting explicit information and drawing inferences from texts."
            },
            "P4": {
                "tema": "introduction-argumentation",
                "topic": "Introduction to Argumentation",
                "rubric": "argumentation, opinion, claim, evidence, persuasive language, counterargument",
                "desc": "This bundle introduces argumentation: identifying claims, evidence and persuasive language in argumentative texts."
            }
        }
    },
    "matematicas": {
        "subject_id": "MAT",
        "name": "Matemáticas",
        "periods": {
            "P1": {
                "tema": "number-systems",
                "topic": "Number Systems",
                "rubric": "number systems, natural numbers, integers, number line, absolute value, operations",
                "desc": "This bundle covers number systems: natural numbers, integers, number line representation, absolute value and basic operations."
            },
            "P2": {
                "tema": "fractions-decimals",
                "topic": "Fractions and Decimals",
                "rubric": "fractions, decimals, equivalence, operations, percentages, rational numbers",
                "desc": "This bundle covers fractions and decimals: equivalence, operations, conversion between fractions and decimals, and percentages."
            },
            "P3": {
                "tema": "plane-geometry",
                "topic": "Plane Geometry",
                "rubric": "plane geometry, triangles, quadrilaterals, angles, perimeter, area, Pythagorean theorem",
                "desc": "This bundle covers plane geometry: triangles, quadrilaterals, angle measurement, perimeter, area and introduction to Pythagorean theorem."
            },
            "P4": {
                "tema": "basic-statistics",
                "topic": "Basic Statistics",
                "rubric": "statistics, data collection, frequency tables, bar graphs, mean, median, mode",
                "desc": "This bundle covers basic statistics: data collection, frequency tables, bar graphs and measures of central tendency (mean, median, mode)."
            }
        }
    },
    "ciencias-naturales": {
        "subject_id": "CN",
        "name": "Ciencias Naturales",
        "periods": {
            "P1": {
                "tema": "the-cell",
                "topic": "The Cell",
                "rubric": "cell, cell theory, organelles, plant cell, animal cell, unicellular, multicellular",
                "desc": "This bundle covers the cell: cell theory, types of cells (plant/animal), basic organelles and levels of organization."
            },
            "P2": {
                "tema": "ecosystems",
                "topic": "Ecosystems",
                "rubric": "ecosystems, biomes, food webs, trophic levels, energy flow, nutrient cycles",
                "desc": "This bundle covers ecosystems: biomes, food webs, trophic levels, energy flow and introduction to nutrient cycles."
            },
            "P3": {
                "tema": "matter",
                "topic": "Matter",
                "rubric": "matter, states, properties, mixtures, solutions, physical/chemical changes",
                "desc": "This bundle covers matter: states of matter, physical and chemical properties, mixtures, solutions and changes in matter."
            },
            "P4": {
                "tema": "energy",
                "topic": "Energy",
                "rubric": "energy, forms, sources, renewable, non-renewable, transformation, conservation",
                "desc": "This bundle covers energy: forms of energy, renewable and non-renewable sources, energy transformation and conservation."
            }
        }
    },
    "sociales-ciudadanas": {
        "subject_id": "SOC",
        "name": "Sociales y Ciudadanas",
        "periods": {
            "P1": {
                "tema": "river-civilizations",
                "topic": "River Civilizations",
                "rubric": "river civilizations, Mesopotamia, Egypt, Indus, China, agriculture, writing, social organization",
                "desc": "This bundle covers ancient river civilizations: Mesopotamia, Egypt, Indus Valley and Ancient China, their contributions and social organization."
            },
            "P2": {
                "tema": "colombian-geography",
                "topic": "Colombian Geography",
                "rubric": "Colombian geography, regions, departments, capitals, climate zones, biodiversity",
                "desc": "This bundle covers Colombian geography: political divisions, departments and capitals, climate zones and biodiversity."
            },
            "P3": {
                "tema": "constitution-1991",
                "topic": "Constitution 1991",
                "rubric": "Colombian Constitution 1991, rights, duties, branches of power, democratic principles",
                "desc": "This bundle covers the Colombian Constitution of 1991: fundamental rights and duties, branches of public power and democratic principles."
            },
            "P4": {
                "tema": "conflict-resolution",
                "topic": "Conflict Resolution",
                "rubric": "conflict resolution, dialogue, mediation, tolerance, coexistence, peace culture",
                "desc": "This bundle covers conflict resolution: dialogue, mediation, tolerance, peaceful coexistence and building a culture of peace."
            }
        }
    },
    "ingles": {
        "subject_id": "ING",
        "name": "Inglés",
        "periods": {
            "P1": {
                "tema": "personal-information",
                "topic": "Personal Information",
                "rubric": "personal information, introductions, verb to be, wh-questions, possessive adjectives",
                "desc": "This bundle covers personal information: introductions, verb to be, WH-questions and possessive adjectives."
            },
            "P2": {
                "tema": "school-life",
                "topic": "School Life",
                "rubric": "school life, subjects, timetable, facilities, present simple, there is/are, prepositions",
                "desc": "This bundle covers school life: subjects, timetable, school facilities, present simple, there is/are and prepositions of place."
            },
            "P3": {
                "tema": "daily-routines",
                "topic": "Daily Routines",
                "rubric": "daily routines, present simple, time, frequency, adverbs of frequency",
                "desc": "This bundle covers daily routines: present simple tense, telling time, frequency adverbs and daily activities vocabulary."
            },
            "P4": {
                "tema": "free-time-activities",
                "topic": "Free Time Activities",
                "rubric": "free time activities, hobbies, sports, like/don't like, can/can't, present continuous",
                "desc": "This bundle covers free time activities: hobbies, sports, expressing preferences, abilities with can/can't and present continuous."
            }
        }
    }
}


# ─── DIFFICULTY PROGRESSION (MASTERY v5.1) ───
# Q1-2: D1-D2 (Remember), Q3-5: D3-D4 (Understand),
# Q6-8: D5-D6 (Apply), Q9-10: D7-D8 (Analyze)

DIFFICULTY_MAP = {
    1: {"diff": "D1", "bloom": "Remember"},
    2: {"diff": "D2", "bloom": "Remember"},
    3: {"diff": "D3", "bloom": "Understand"},
    4: {"diff": "D4", "bloom": "Understand"},
    5: {"diff": "D4", "bloom": "Understand"},
    6: {"diff": "D5", "bloom": "Apply"},
    7: {"diff": "D6", "bloom": "Apply"},
    8: {"diff": "D6", "bloom": "Apply"},
    9: {"diff": "D7", "bloom": "Analyze"},
    10: {"diff": "D8", "bloom": "Analyze"},
}

def get_icfes_competencia(bloom, subject_id):
    """Return ICFES competencia based on bloom level and subject."""
    if bloom in ("Remember", "Understand"):
        return "Comunicación y Representación"
    elif bloom == "Apply":
        return "Formulación y Ejecución"
    elif bloom == "Analyze":
        return "Razonamiento y Argumentación"
    elif bloom in ("Evaluate", "Create"):
        return "Pensamiento Reflexivo y Sistémico"
    return "Comunicación y Representación"


# ═══════════════════════════════════════════════════════
# GRADE 3 QUESTIONS
# ═══════════════════════════════════════════════════════

G3_LEN = {
    "P1": [  # Lectoescritura Básica
        {  # Q1
            "context": "En la clase de lengua del Colegio Simón Bolívar en Bogotá, la profesora Carolina escribe en el tablero la palabra 'MARIPOSA'.",
            "enunciado": "¿Cuántas sílabas tiene la palabra MARIPOSA?",
            "options": [
                ("A", "2", "Incorrecto. MARIPOSA no tiene solo dos sílabas, necesita más golpes de voz para pronunciarse."),
                ("B", "3", "Incorrecto. Aunque algunas palabras tienen tres sílabas, MARIPOSA necesita cuatro movimientos de voz."),
                ("C", "4", "Correcto. MA-RI-PO-SA tiene cuatro sílabas porque necesita cuatro golpes de voz para pronunciarse."),
                ("D", "5", "Incorrecto. MARIPOSA no tiene cinco sílabas; se excede en la separación de sonidos."),
            ],
            "answer": "C",
            "feedback": "La palabra MARIPOSA tiene cuatro sílabas (MA-RI-PO-SA) porque cada golpe de voz al pronunciarla forma una sílaba completa.",
        },
        {  # Q2
            "context": "En una clase en Medellín, la maestra pide a los niños escribir oraciones con la palabra 'sol'.",
            "enunciado": "¿Cuál de las siguientes es una ORACIÓN completa?",
            "options": [
                ("A", "El sol", "Incorrecto. 'El sol' es un sintagma nominal, no una oración completa porque no tiene verbo."),
                ("B", "Sol brilla", "Incorrecto. Falta el artículo y la oración no está completa gramaticalmente."),
                ("C", "El sol brilla fuerte.", "Correcto. Esta oración tiene sujeto (El sol), verbo (brilla) y complemento (fuerte), formando una idea completa."),
                ("D", "Brilla", "Incorrecto. 'Brilla' es solo un verbo, no constituye una oración completa con sentido por sí sola."),
            ],
            "answer": "C",
            "feedback": "Una oración completa debe tener al menos un sujeto y un verbo, y expresar una idea con sentido completo.",
        },
        {  # Q3
            "context": "En un salón de clase en Cali, los estudiantes leen el cuento 'La tortuga y la liebre'.",
            "enunciado": "¿Qué enseñanza nos deja el cuento de la tortuga y la liebre?",
            "options": [
                ("A", "Que las liebres son más rápidas que las tortugas.", "Incorrecto. Aunque es cierto que las liebres son más rápidas, esa no es la enseñanza principal del cuento."),
                ("B", "Que las tortugas son más inteligentes que las liebres.", "Incorrecto. La enseñanza no es sobre quién es más inteligente, sino sobre la constancia."),
                ("C", "Que la constancia y la perseverancia son más importantes que la velocidad.", "Correcto. La enseñanza principal es que no hay que confiarse y que con esfuerzo constante se pueden lograr las metas."),
                ("D", "Que las carreras son divertidas.", "Incorrecto. El cuento no habla de la diversión de las carreras, sino del valor del esfuerzo constante."),
            ],
            "answer": "C",
            "feedback": "La moraleja de la fábula es que la perseverancia y el esfuerzo constante pueden superar la velocidad y la confianza excesiva.",
        },
        {  # Q4
            "context": "En la clase de lengua en Barranquilla, los niños están aprendiendo los sustantivos (nombres).",
            "enunciado": "¿Cuál de las siguientes palabras es un SUSTANTIVO?",
            "options": [
                ("A", "Correr", "Incorrecto. 'Correr' es un verbo porque indica una acción."),
                ("B", "Hermoso", "Incorrecto. 'Hermoso' es un adjetivo porque describe una cualidad."),
                ("C", "Escuela", "Correcto. 'Escuela' es un sustantivo porque nombra un lugar o cosa."),
                ("D", "Rápidamente", "Incorrecto. 'Rápidamente' es un adverbio porque modifica al verbo."),
            ],
            "answer": "C",
            "feedback": "Los sustantivos son palabras que nombran personas, animales, lugares, cosas o ideas. 'Escuela' nombra un lugar.",
        },
        {  # Q5
            "context": "En la biblioteca escolar de un colegio en Bucaramanga, los niños leen un cuento corto.",
            "enunciado": "Lee el siguiente texto: 'Había una vez un perro llamado Toby que vivía en una casa grande. Un día, Toby encontró un hueso en el jardín y lo enterró debajo de un árbol.' ¿Dónde enterró Toby el hueso?",
            "options": [
                ("A", "En la casa", "Incorrecto. Toby no enterró el hueso dentro de la casa."),
                ("B", "En el jardín", "Incorrecto. El texto dice que encontró el hueso en el jardín, pero lo enterró debajo de un árbol."),
                ("C", "Debajo de un árbol", "Correcto. El texto dice claramente que 'lo enterró debajo de un árbol'."),
                ("D", "En su cama", "Incorrecto. El texto no menciona que Toby haya enterrado el hueso en su cama."),
            ],
            "answer": "C",
            "feedback": "La comprensión literal implica recordar información explícita del texto: Toby enterró el hueso debajo de un árbol.",
        },
        {  # Q6
            "context": "En un colegio de Cartagena, los estudiantes tienen que ordenar las palabras para formar una oración.",
            "enunciado": "Ordena las siguientes palabras para formar una oración con sentido: 'juega - parque - en - el - María'",
            "options": [
                ("A", "María juega en el parque.", "Correcto. Esta es la forma correcta de ordenar las palabras para que la oración tenga sentido completo."),
                ("B", "El parque juega María en.", "Incorrecto. El orden de las palabras no forma una oración coherente en español."),
                ("C", "Juega María parque el en.", "Incorrecto. Las palabras están desordenadas y la oración no tiene sentido gramatical."),
                ("D", "En juega María el parque.", "Incorrecto. El orden no es correcto gramaticalmente en español."),
            ],
            "answer": "A",
            "feedback": "En español, el orden básico de la oración es sujeto + verbo + complementos: María (sujeto) juega (verbo) en el parque (complemento).",
        },
        {  # Q7
            "context": "En una clase de lengua en Pereira, la profesora explica los antónimos (palabras con significado opuesto).",
            "enunciado": "¿Cuál es el ANTÓNIMO de la palabra 'grande'?",
            "options": [
                ("A", "Enorme", "Incorrecto. 'Enorme' es un sinónimo de grande, no su antónimo."),
                ("B", "Gigante", "Incorrecto. 'Gigante' también es un sinónimo, significa muy grande."),
                ("C", "Pequeño", "Correcto. 'Pequeño' es el antónimo de 'grande' porque tienen significados opuestos."),
                ("D", "Mediano", "Incorrecto. 'Mediano' está entre grande y pequeño, no es su antónimo directo."),
            ],
            "answer": "C",
            "feedback": "Los antónimos son palabras que tienen significados opuestos. 'Grande' y 'pequeño' expresan ideas contrarias de tamaño.",
        },
        {  # Q8
            "context": "En un colegio de Manizales se realiza un concurso de escritura de cuentos cortos.",
            "enunciado": "¿Cuál es la forma correcta de escribir el plural de la palabra 'lápiz'?",
            "options": [
                ("A", "Lápizes", "Incorrecto. Las palabras terminadas en Z cambian la Z por C antes de agregar -es."),
                ("B", "Lápices", "Correcto. 'Lápiz' termina en Z, por lo que su plural es 'lápices' (Z → C + es)."),
                ("C", "Lápis", "Incorrecto. Esta forma no existe en español; el plural requiere el cambio de Z a C."),
                ("D", "Lápi", "Incorrecto. Esta forma no existe y no sigue las reglas de formación del plural."),
            ],
            "answer": "B",
            "feedback": "Las palabras terminadas en Z forman el plural cambiando la Z por C y agregando -es: lápiz → lápices.",
        },
        {  # Q9
            "context": "Los estudiantes de un colegio en Cúcuta leen un poema corto sobre la naturaleza.",
            "enunciado": "Lee: 'El viento baila con las hojas / mientras el río canta canciones.' ¿Qué figura literaria se usa en estas frases?",
            "options": [
                ("A", "Comparación", "Incorrecto. No se usan palabras como 'como' o 'parece' para comparar."),
                ("B", "Personificación", "Correcto. Se atribuyen acciones humanas (bailar, cantar) a elementos de la naturaleza (viento, río)."),
                ("C", "Rima", "Incorrecto. Las palabras hojas y canciones no riman entre sí."),
                ("D", "Exageración", "Incorrecto. No se está exagerando ninguna característica, sino dando cualidades humanas."),
            ],
            "answer": "B",
            "feedback": "La personificación es una figura literaria que atribuye cualidades o acciones humanas a objetos o seres no humanos.",
        },
        {  # Q10
            "context": "En la clase de lengua de un colegio en Ibagué, la maestra pide identificar el sujeto de una oración.",
            "enunciado": "En la oración 'Los niños alegres juegan en el patio', ¿cuál es el SUJETO?",
            "options": [
                ("A", "juegan", "Incorrecto. 'Juegan' es el verbo o predicado, no el sujeto de la oración."),
                ("B", "en el patio", "Incorrecto. 'En el patio' es un complemento de lugar que indica dónde ocurre la acción."),
                ("C", "Los niños alegres", "Correcto. 'Los niños alegres' es el sujeto porque indica quiénes realizan la acción de jugar."),
                ("D", "Los niños", "Incorrecto. Aunque es parte del sujeto, 'alegres' también lo modifica y es parte del núcleo del sujeto."),
            ],
            "answer": "C",
            "feedback": "El sujeto es la parte de la oración que indica quién realiza la acción o de quién se habla. Para encontrarlo, preguntamos ¿quién juega? → Los niños alegres.",
        },
    ],
}

def write_bundle(grado, subject_folder, subject_id, subject_name, config, periodo_key, periodo_data, difficulty_map):
    """Generate a bundle markdown file."""
    p_num = periodo_key[1]  # "