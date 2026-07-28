"""
MASTERY Bundle Generator v5.2
Generates high-quality educational bundles for all grades (8-11) and subjects
for Colombian ICFES Saber 11 preparation.

Protocol v5.2 - Direct generation without external API calls.
"""

import os
import json
from typing import Dict, List, Tuple

# ============================================================
# CONFIGURATION
# ============================================================

QUESTIONS_DATA = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'questions_data', 'colombia')

SUBJECT_CODES = {
    'matematicas': 'MAT',
    'ciencias-naturales': 'CIE',
    'lengua': 'LEN',
    'lectura-critica': 'LEC',
    'sociales-ciudadanas': 'SOC',
    'ingles': 'ING'
}

BUNDLE_SIZES = {8: 12, 9: 12, 10: 15, 11: 20}

# TOPIC DISTRIBUTION BY GRADE AND PERIOD
# Each grade has 4 periods (P1-P4) and each period spans 10 weeks (W01-W40)
# We define weekly topics for W01-W05 per period

TOPICS = {
    'matematicas': {
        8: {
            1: {  # P1: expresiones-algebraicas
                'tema': 'expresiones-algebraicas',
                'weekly': {
                    1: 'lenguaje-algebraico',
                    2: 'terminos-semejantes',
                    3: 'valor-numerico',
                    4: 'reduccion-expresiones',
                    5: 'repaso-p1'
                }
            },
            2: {
                'tema': 'productos-notables',
                'weekly': {11: 'binomio-cuadrado', 12: 'binomio-conjugado', 13: 'binomio-al-cubo', 14: 'productos-notables-mixtos', 15: 'repaso-p2'}
            },
            3: {
                'tema': 'factorizacion-pitagoras',
                'weekly': {21: 'factor-comun', 22: 'diferencia-cuadrados', 23: 'trinomio-cuadrado-perfecto', 24: 'teorema-pitagoras', 25: 'repaso-p3'}
            },
            4: {
                'tema': 'estadistica-probabilidad',
                'weekly': {31: 'medidas-tendencia-central', 32: 'graficos-estadisticos', 33: 'probabilidad-basica', 34: 'eventos-mutuamente-excluyentes', 35: 'repaso-p4'}
            }
        },
        9: {
            1: {'tema': 'sistemas-ecuaciones', 'weekly': {1: 'ecuaciones-lineales', 2: 'metodo-sustitucion', 3: 'metodo-igualacion', 4: 'metodo-reduccion', 5: 'repaso-p1'}},
            2: {'tema': 'funciones-lineales', 'weekly': {11: 'definicion-funcion', 12: 'pendiente-intercepto', 13: 'grafica-funcion-lineal', 14: 'aplicaciones-lineales', 15: 'repaso-p2'}},
            3: {'tema': 'funciones-cuadraticas', 'weekly': {21: 'funcion-cuadratica', 22: 'vertice-ejes', 23: 'solucion-ecuaciones', 24: 'aplicaciones-cuadraticas', 25: 'repaso-p3'}},
            4: {'tema': 'radicales-trigonometria', 'weekly': {31: 'radicales-basicos', 32: 'operaciones-radicales', 33: 'razones-trigonometricas', 34: 'triangulos-rectangulos', 35: 'repaso-p4'}}
        },
        10: {
            1: {'tema': 'trigonometria', 'weekly': {1: 'circulo-unitario', 2: 'funciones-trigonometricas', 3: 'identidades-basicas', 4: 'ley-seno-coseno', 5: 'repaso-p1'}},
            2: {'tema': 'vectores-matrices', 'weekly': {11: 'vectores-2d', 12: 'operaciones-vectoriales', 13: 'matrices-basicas', 14: 'determinantes', 15: 'repaso-p2'}},
            3: {'tema': 'secciones-conicas', 'weekly': {21: 'circunferencia', 22: 'parabola', 23: 'elipse', 24: 'hiperbola', 25: 'repaso-p3'}},
            4: {'tema': 'limites-intro', 'weekly': {31: 'limites-basicos', 32: 'propiedades-limites', 33: 'limites-indeterminados', 34: 'continuidad', 35: 'repaso-p4'}}
        },
        11: {
            1: {'tema': 'limites-continuidad', 'weekly': {1: 'limites-al-infinito', 2: 'limites-laterales', 3: 'continuidad-funciones', 4: 'teorema-valor-medio', 5: 'repaso-p1'}},
            2: {'tema': 'derivadas', 'weekly': {11: 'derivada-definicion', 12: 'reglas-derivacion', 13: 'derivada-compuesta', 14: 'aplicaciones-derivadas', 15: 'repaso-p2'}},
            3: {'tema': 'integrales', 'weekly': {21: 'integral-indefinida', 22: 'integral-definida', 23: 'teorema-fundamental', 24: 'aplicaciones-integrales', 25: 'repaso-p3'}},
            4: {'tema': 'probabilidad-estadistica', 'weekly': {31: 'probabilidad-avanzada', 32: 'distribuciones', 33: 'inferencia-estadistica', 34: 'correlacion', 35: 'repaso-p4'}}
        }
    },
    'ciencias-naturales': {
        8: {
            1: {'tema': 'biologia-celular', 'weekly': {1: 'celula-unidad-vida', 2: 'organelos-celulares', 3: 'membrana-transporte', 4: 'reproduccion-celular', 5: 'repaso-p1'}},
            2: {'tema': 'sistemas-humanos', 'weekly': {11: 'sistema-digestivo', 12: 'sistema-respiratorio', 13: 'sistema-circulatorio', 14: 'sistema-nervioso', 15: 'repaso-p2'}},
            3: {'tema': 'tabla-periodica', 'weekly': {21: 'elementos-compuestos', 22: 'tabla-periodica', 23: 'enlaces-quimicos', 24: 'reacciones-quimicas', 25: 'repaso-p3'}},
            4: {'tema': 'fisica-newton', 'weekly': {31: 'movimiento-rectilineo', 32: 'leyes-newton', 33: 'fuerza-masa', 34: 'energia-trabajo', 35: 'repaso-p4'}}
        },
        9: {
            1: {'tema': 'genetica-evolucion', 'weekly': {1: 'adn-arn', 2: 'leyes-mendel', 3: 'herencia-genetica', 4: 'evolucion-seleccion', 5: 'repaso-p1'}},
            2: {'tema': 'sistemas-biologicos', 'weekly': {11: 'ecosistemas', 12: 'cadenas-alimenticias', 13: 'ciclos-biogeoquimicos', 14: 'biodiversidad', 15: 'repaso-p2'}},
            3: {'tema': 'quimica-inorganica', 'weekly': {21: 'nomenclatura', 22: 'oxidos-bases', 23: 'acidos-sales', 24: 'reacciones-inorganicas', 25: 'repaso-p3'}},
            4: {'tema': 'cinematica-estequiometria', 'weekly': {31: 'cinematica-mru', 32: 'mruv-caida-libre', 33: 'estequiometria-basica', 34: 'mol-masa-molar', 35: 'repaso-p4'}}
        },
        10: {
            1: {'tema': 'fisica-mecanica', 'weekly': {1: 'dinamica-rotacion', 2: 'trabajo-energia', 3: 'potencia-rendimiento', 4: 'cantidad-movimiento', 5: 'repaso-p1'}},
            2: {'tema': 'quimica-inorganica-avanzada', 'weekly': {11: 'enlace-covalente', 12: 'enlace-ionico', 13: 'fuerzas-intermoleculares', 14: 'estados-materia', 15: 'repaso-p2'}},
            3: {'tema': 'biologia-ecologia', 'weekly': {21: 'poblaciones', 22: 'comunidades-ecologicas', 23: 'flujo-energia', 24: 'sucesion-ecologica', 25: 'repaso-p3'}},
            4: {'tema': 'quimica-organica', 'weekly': {31: 'hidrocarburos', 32: 'grupos-funcionales', 33: 'isomeria', 34: 'polimeros', 35: 'repaso-p4'}}
        },
        11: {
            1: {'tema': 'quimica-organica', 'weekly': {1: 'compuestos-organicos', 2: 'reacciones-organicas', 3: 'biomoleculas', 4: 'metabolismo-celular', 5: 'repaso-p1'}},
            2: {'tema': 'biomoleculas-energia', 'weekly': {11: 'carbohidratos', 12: 'lipidos-proteinas', 13: 'enzimas', 14: 'respiracion-celular', 15: 'repaso-p2'}},
            3: {'tema': 'bioquimica', 'weekly': {21: 'fotosintesis', 22: 'sintesis-proteinas', 23: 'regulacion-genica', 24: 'biotecnologia-basica', 25: 'repaso-p3'}},
            4: {'tema': 'fisica-moderna', 'weekly': {31: 'relatividad', 32: 'fisica-cuantica', 33: 'ondas-electromagneticas', 34: 'fisica-nuclear', 35: 'repaso-p4'}}
        }
    },
    'lengua': {
        8: {
            1: {'tema': 'literatura-precolombina', 'weekly': {1: 'mitos-leyendas', 2: 'popol-vuh', 3: 'poesia-precolombina', 4: 'narrativa-indigena', 5: 'repaso-p1'}},
            2: {'tema': 'literatura-colonial', 'weekly': {11: 'cronistas-indias', 12: 'poesia-colonial', 13: 'teatro-colonial', 14: 'sor-juana', 15: 'repaso-p2'}},
            3: {'tema': 'vanguardias', 'weekly': {21: 'modernismo', 22: 'creacionismo', 23: 'surrealismo', 24: 'poesia-vanguardista', 25: 'repaso-p3'}},
            4: {'tema': 'el-ensayo', 'weekly': {31: 'estructura-ensayo', 32: 'ensayo-literario', 33: 'ensayo-cientifico', 34: 'ensayo-politico', 35: 'repaso-p4'}}
        },
        9: {
            1: {'tema': 'literatura-colombiana-sXX', 'weekly': {1: 'narrativa-colombiana', 2: 'garcia-marquez', 3: 'poesia-colombiana', 4: 'teatro-colombiano', 5: 'repaso-p1'}},
            2: {'tema': 'modernismo', 'weekly': {11: 'modernismo-hispanoamericano', 12: 'ruben-dario', 13: 'posmodernismo', 14: 'narrativa-moderna', 15: 'repaso-p2'}},
            3: {'tema': 'argumentacion', 'weekly': {21: 'tipos-argumentos', 22: 'estructura-argumentativa', 23: 'recursos-retoricos', 24: 'contraargumentacion', 25: 'repaso-p3'}},
            4: {'tema': 'critica-literaria', 'weekly': {31: 'corrientes-criticas', 32: 'analisis-obra', 33: 'critica-contextual', 34: 'reseña-critica', 35: 'repaso-p4'}}
        },
        10: {
            1: {'tema': 'literatura-universal', 'weekly': {1: 'literatura-griega', 2: 'literatura-medieval', 3: 'renacimiento', 4: 'barroco', 5: 'repaso-p1'}},
            2: {'tema': 'filosofia-politica', 'weekly': {11: 'platon-aristoteles', 12: 'maquiavelo', 13: 'rousseau', 14: 'marx-pensamiento', 15: 'repaso-p2'}},
            3: {'tema': 'derechos-humanos', 'weekly': {21: 'declaracion-universal', 22: 'derechos-civiles', 23: 'derechos-sociales', 24: 'derechos-colectivos', 25: 'repaso-p3'}},
            4: {'tema': 'globalizacion', 'weekly': {31: 'cultura-global', 32: 'identidad-cultural', 33: 'medios-comunicacion', 34: 'diversidad-cultural', 35: 'repaso-p4'}}
        },
        11: {
            1: {'tema': 'competencias-ciudadanas', 'weekly': {1: 'convivencia-paz', 2: 'participacion', 3: 'pluralidad', 4: 'identidad-colombiana', 5: 'repaso-p1'}},
            2: {'tema': 'bioetica', 'weekly': {11: 'etica-medica', 12: 'biotecnologia-etica', 13: 'medioambiente-etica', 14: 'dilemas-bioeticos', 15: 'repaso-p2'}},
            3: {'tema': 'biotecnologia', 'weekly': {21: 'adn-recombinante', 22: 'clonacion', 23: 'terapia-genica', 24: 'bioetica-avanzada', 25: 'repaso-p3'}},
            4: {'tema': 'prep-saber11', 'weekly': {31: 'comprension-lectora', 32: 'analisis-textual', 33: 'argumentacion-icfes', 34: 'simulacro-lengua', 35: 'repaso-p4'}}
        }
    },
    'lectura-critica': {
        8: {
            1: {'tema': 'textos-expositivos', 'weekly': {1: 'estructura-texto-expositivo', 2: 'ideas-principales', 3: 'inferencias-basicas', 4: 'vocabulario-contexto', 5: 'repaso-p1'}},
            2: {'tema': 'tesis-argumentos', 'weekly': {11: 'tesis-afirmaciones', 12: 'tipos-argumentos', 13: 'evidencias-ejemplos', 14: 'conclusiones', 15: 'repaso-p2'}},
            3: {'tema': 'falacias-argumentativas', 'weekly': {21: 'falacias-logicas', 22: 'generalizacion-inductiva', 23: 'identificacion-falacias', 24: 'construccion-argumentos', 25: 'repaso-p3'}},
            4: {'tema': 'analisis-discursos', 'weekly': {31: 'discurso-politico', 32: 'discurso-publicitario', 33: 'discurso-academico', 34: 'intencion-autor', 35: 'repaso-p4'}}
        },
        9: {
            1: {'tema': 'inferencia-textual', 'weekly': {1: 'inferencia-local', 2: 'inferencia-global', 3: 'inferencia-critica', 4: 'comprension-profunda', 5: 'repaso-p1'}},
            2: {'tema': 'intencion-autoral', 'weekly': {11: 'proposito-autor', 12: 'tono-actitud', 13: 'audiencia-objetivo', 14: 'recursos-persuasivos', 15: 'repaso-p2'}},
            3: {'tema': 'vocabulario-contexto', 'weekly': {21: 'significado-contextual', 22: 'sinonimos-antonimos', 23: 'campos-semanticos', 24: 'polisemia-homonimia', 25: 'repaso-p3'}},
            4: {'tema': 'relaciones-intertextuales', 'weekly': {31: 'comparacion-textos', 32: 'intertextualidad', 33: 'adaptaciones', 34: 'analisis-multimodal', 35: 'repaso-p4'}}
        },
        10: {
            1: {'tema': 'textos-continuos', 'weekly': {1: 'textos-narrativos', 2: 'textos-argumentativos', 3: 'textos-expositivos-avanzados', 4: 'textos-literarios', 5: 'repaso-p1'}},
            2: {'tema': 'textos-discontinuos', 'weekly': {11: 'graficas-tablas', 12: 'infografias-diagramas', 13: 'mapas-planos', 14: 'historietas-carteles', 15: 'repaso-p2'}},
            3: {'tema': 'pensamiento-critico', 'weekly': {21: 'analisis-critico', 22: 'evaluacion-fuentes', 23: 'sesgos-cognitivos', 24: 'toma-decisiones', 25: 'repaso-p3'}},
            4: {'tema': 'evaluacion-argumentos', 'weekly': {31: 'validez-argumentos', 32: 'fortaleza-evidencias', 33: 'contraargumentacion', 34: 'sintesis-evaluacion', 35: 'repaso-p4'}}
        },
        11: {
            1: {'tema': 'textos-argumentativos', 'weekly': {1: 'estructura-argumentativa', 2: 'tipologias-textuales', 3: 'secuencias-argumentativas', 4: 'textos-academicos', 5: 'repaso-p1'}},
            2: {'tema': 'tipologia-textual', 'weekly': {11: 'textos-cientificos', 12: 'textos-periodisticos', 13: 'textos-juridicos', 14: 'textos-literarios', 15: 'repaso-p2'}},
            3: {'tema': 'filosofia-lenguaje', 'weekly': {21: 'lenguaje-significado', 22: 'semiotica-basica', 23: 'actos-habla', 24: 'pragmatica', 25: 'repaso-p3'}},
            4: {'tema': 'prep-integral-icfes', 'weekly': {31: 'simulacro-icfes-1', 32: 'simulacro-icfes-2', 33: 'tecnicas-lectura', 34: 'repaso-final', 35: 'repaso-p4'}}
        }
    },
    'sociales-ciudadanas': {
        8: {
            1: {'tema': 'ilustracion-rev-francesa', 'weekly': {1: 'ilustracion', 2: 'revolucion-francesa', 3: 'independencia-eeuu', 4: 'repercusiones-america', 5: 'repaso-p1'}},
            2: {'tema': 'independencia-rev-industrial', 'weekly': {11: 'independencia-colombia', 12: 'revolucion-industrial', 13: 'cambios-sociales', 14: 'liberalismo-nacionalismo', 15: 'repaso-p2'}},
            3: {'tema': 'historia-colombia-sXIX', 'weekly': {21: 'gran-colombia', 22: 'regeneracion', 23: 'guerra-mil-dias', 24: 'separacion-panama', 25: 'repaso-p3'}},
            4: {'tema': 'etica-sociedad', 'weekly': {31: 'etica-moral', 32: 'normas-sociales', 33: 'convivencia-ciudadana', 34: 'resolucion-conflictos', 35: 'repaso-p4'}}
        },
        9: {
            1: {'tema': 'guerra-mundial', 'weekly': {1: 'primera-guerra-mundial', 2: 'periodo-entreguerras', 3: 'segunda-guerra-mundial', 4: 'consecuencias-genocidio', 5: 'repaso-p1'}},
            2: {'tema': 'guerra-fria-geopolitica', 'weekly': {11: 'guerra-fria', 12: 'descolonizacion', 13: 'muro-berlin', 14: 'caida-urss', 15: 'repaso-p2'}},
            3: {'tema': 'colombia-sXX-conflicto', 'weekly': {21: 'violencia-partidista', 22: 'frente-nacional', 23: 'conflicto-armado', 24: 'proceso-paz', 25: 'repaso-p3'}},
            4: {'tema': 'ciudadania-ddhh', 'weekly': {31: 'derechos-humanos', 32: 'mecanismos-participacion', 33: 'constitucion-1991', 34: 'ddhh-colombia', 35: 'repaso-p4'}}
        },
        10: {
            1: {'tema': 'politica-poder', 'weekly': {1: 'estado-gobierno', 2: 'regimenes-politicos', 3: 'democracia', 4: 'partidos-politicos-colombia', 5: 'repaso-p1'}},
            2: {'tema': 'economia-desarrollo', 'weekly': {11: 'sistemas-economicos', 12: 'desarrollo-sostenible', 13: 'economia-colombiana', 14: 'comercio-internacional', 15: 'repaso-p2'}},
            3: {'tema': 'conflicto-ddhh', 'weekly': {21: 'justicia-transicional', 22: 'corte-penal', 23: 'derecho-internacional', 24: 'memoria-historica', 25: 'repaso-p3'}},
            4: {'tema': 'geopolitica', 'weekly': {31: 'orden-mundial', 32: 'onu-organismos', 33: 'latinoamerica-geopolitica', 34: 'seguridad-internacional', 35: 'repaso-p4'}}
        },
        11: {
            1: {'tema': 'historia-conflicto', 'weekly': {1: 'conflicto-colombiano', 2: 'actores-conflicto', 3: 'acuerdo-paz-2016', 4: 'posconflicto', 5: 'repaso-p1'}},
            2: {'tema': 'geografia-economia', 'weekly': {11: 'geografia-colombiana', 12: 'region-andina', 13: 'region-caribe-pacifico', 14: 'region-orinoquia-amazonia', 15: 'repaso-p2'}},
            3: {'tema': 'constitucion-ciudadania', 'weekly': {21: 'constitucion-1991', 22: 'ramas-poder-publico', 23: 'organismos-control', 24: 'participacion-ciudadana', 25: 'repaso-p3'}},
            4: {'tema': 'problemas-contemporaneos', 'weekly': {31: 'cambio-climatico', 32: 'migracion-global', 33: 'desigualdad-pobreza', 34: 'tecnologia-sociedad', 35: 'repaso-p4'}}
        }
    },
    'ingles': {
        8: {
            1: {'tema': 'conditional-type-3', 'weekly': {1: 'conditional-type3-basics', 2: 'third-conditional-form', 3: 'mixed-conditionals', 4: 'wishes-regrets', 5: 'repaso-p1'}},
            2: {'tema': 'passive-voice', 'weekly': {11: 'passive-simple-present', 12: 'passive-simple-past', 13: 'passive-perfect-tenses', 14: 'passive-modals', 15: 'repaso-p2'}},
            3: {'tema': 'environment', 'weekly': {21: 'environment-vocabulary', 22: 'reading-environment', 23: 'sustainability', 24: 'compare-environment', 25: 'repaso-p3'}},
            4: {'tema': 'review', 'weekly': {31: 'grammar-review', 32: 'vocabulary-review', 33: 'reading-comprehension', 34: 'mock-test', 35: 'repaso-p4'}}
        },
        9: {
            1: {'tema': 'personal-life', 'weekly': {1: 'describing-people', 2: 'daily-routines', 3: 'hobbies-interests', 4: 'future-plans', 5: 'repaso-p1'}},
            2: {'tema': 'future-plans', 'weekly': {11: 'going-to-vs-will', 12: 'present-continuous-future', 13: 'future-perfect', 14: 'future-conditional', 15: 'repaso-p2'}},
            3: {'tema': 'environment', 'weekly': {21: 'modal-verbs', 22: 'relative-clauses', 23: 'reading-environment', 24: 'discussion-opinions', 25: 'repaso-p3'}},
            4: {'tema': 'mock-test', 'weekly': {31: 'grammar-practice', 32: 'vocabulary-practice', 33: 'reading-practice', 34: 'writing-practice', 35: 'repaso-p4'}}
        },
        10: {
            1: {'tema': 'experiences', 'weekly': {1: 'present-perfect', 2: 'life-experiences', 3: 'travel-stories', 4: 'achievements', 5: 'repaso-p1'}},
            2: {'tema': 'hypothetical', 'weekly': {11: 'second-conditional', 12: 'third-conditional', 13: 'wish-sentences', 14: 'i-would-rather', 15: 'repaso-p2'}},
            3: {'tema': 'opinions', 'weekly': {21: 'expressing-opinions', 22: 'agree-disagree', 23: 'debate-language', 24: 'persuasive-speaking', 25: 'repaso-p3'}},
            4: {'tema': 'media-tech', 'weekly': {31: 'social-media', 32: 'technology-vocabulary', 33: 'digital-citizenship', 34: 'future-technology', 35: 'repaso-p4'}}
        },
        11: {
            1: {'tema': 'advanced-lexical', 'weekly': {1: 'advanced-vocabulary', 2: 'phrasal-verbs', 3: 'collocations', 4: 'academic-word-list', 5: 'repaso-p1'}},
            2: {'tema': 'complex-grammar', 'weekly': {11: 'inversion-subject', 12: 'causative-verbs', 13: 'conditional-advanced', 14: 'reported-speech', 15: 'repaso-p2'}},
            3: {'tema': 'academic-reading', 'weekly': {21: 'academic-texts', 22: 'critical-analysis', 23: 'argument-structure', 24: 'synthesis-writing', 25: 'repaso-p3'}},
            4: {'tema': 'full-saber11', 'weekly': {31: 'reading-part1', 32: 'reading-part2', 33: 'vocabulary-grammar', 34: 'full-mock', 35: 'repaso-p4'}}
        }
    }
}

# ============================================================
# QUESTION DATABASES - Colombian-context questions per subject
# ============================================================

# We'll generate questions dynamically based on topic
# Each question follows protocol v5.2 format


def generate_questions_matematicas(grade: int, week_num: int, topic: str, size: int) -> List[Dict]:
    """Generate math questions for a specific grade/week/topic."""
    questions = []
    
    if grade == 8:
        if week_num == 1:  # lenguaje-algebraico (W01 already exists, skip)
            return []
        elif week_num == 2:  # terminos-semejantes
            questions = [
                {
                    'bloom': 'Remember', 'icfes': 'Razonamiento cuantitativo',
                    'enunciado': '¿Cuál es la definición correcta de términos semejantes?',
                    'opciones': [
                        {'text': 'Términos que tienen el mismo coeficiente numérico.', 'correct': False, 'feedback': 'Los coeficientes pueden ser diferentes, lo que importa son las variables.'},
                        {'text': 'Términos que tienen exactamente las mismas variables con los mismos exponentes.', 'correct': True, 'feedback': 'Correcto. Los términos semejantes comparten la misma parte literal (variables y exponentes).'},
                        {'text': 'Términos que están en la misma posición dentro de la expresión.', 'correct': False, 'feedback': 'La posición en la expresión no determina si son semejantes.'},
                        {'text': 'Términos que tienen el mismo signo (positivo o negativo).', 'correct': False, 'feedback': 'Los signos pueden ser diferentes y aún así ser términos semejantes.'}
                    ],
                    'explicacion': 'Los términos semejantes son aquellos que comparten la misma parte literal: las mismas variables elevadas a los mismos exponentes. Por ejemplo, 3x² y -5x² son semejantes porque ambos tienen x², pero 3x² y 3x no lo son porque los exponentes son diferentes.',
                    'expected_success': 0.85
                },
                {
                    'bloom': 'Understand', 'icfes': 'Razonamiento cuantitativo',
                    'enunciado': 'Identifique cuáles de los siguientes pares de términos son semejantes: I) 3xy y 5xy  II) 2x² y 2x  III) -4ab y 7ba',
                    'opciones': [
                        {'text': 'Solo I', 'correct': False, 'feedback': 'Falta considerar que III también son semejantes (ab = ba).'},
                        {'text': 'I y II', 'correct': False, 'feedback': 'II no son semejantes porque los exponentes de x son diferentes (2 vs 1).'},
                        {'text': 'I y III', 'correct': True, 'feedback': 'Correcto. I tiene xy y III tiene ab/ba, que conmutan.'},
                        {'text': 'Todas', 'correct': False, 'feedback': 'II no son semejantes porque x² y x tienen diferentes exponentes.'}
                    ],
                    'explicacion': 'La conmutatividad de la multiplicación hace que ab = ba, por lo que -4ab y 7ba sí son semejantes. En cambio, 2x² y 2x tienen diferente exponente en la variable x, por lo tanto no son semejantes.',
                    'expected_success': 0.80
                },
                {
                    'bloom': 'Apply', 'icfes': 'Razonamiento cuantitativo',
                    'enunciado': 'Simplifique la expresión: 7m + 3n - 2m + 5n - m',
                    'opciones': [
                        {'text': '4m + 8n', 'correct': True, 'feedback': 'Correcto. Agrupando: (7m - 2m - m) = 4m y (3n + 5n) = 8n.'},
                        {'text': '10m + 8n', 'correct': False, 'feedback': 'Sumaste todos los coeficientes de m sin considerar restas.'},
                        {'text': '4m + 2n', 'correct': False, 'feedback': 'Error al sumar los términos en n.'},
                        {'text': '8m + 4n', 'correct': False, 'feedback': 'Confundiste los coeficientes de m y n.'}
                    ],
                    'explicacion': 'Para simplificar, agrupamos los términos semejantes: términos con m: 7m - 2m - m = 4m; términos con n: 3n + 5n = 8n. El resultado simplificado es 4m + 8n.',
                    'expected_success': 0.75
                },
                {
                    'bloom