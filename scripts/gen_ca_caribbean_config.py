# Central America + Caribbean - 40 topics per subject
# Format: country_key: { code, exam, agency, grade, grado, alignment, subjects: { subject_name: { code: XYZ, topics: [...] } } }

import os

BASE_DIR = r"E:\scripts-python\worldexams"
QUESTIONS_DATA = os.path.join(BASE_DIR, "questions_data")
BUNDLE_SIZE = 20
YEAR = "2026"
WEEK_DIR = "weekly"
PROTOCOL = "5.2"

CITIES = {}
_cities_raw = [
    # Dominican Republic
    ("do","Santo Domingo","Liceo Unión Panamericana"),
    ("do","Santiago","Liceo Ercilia Pepín"),
    ("do","La Vega","Liceo Manuel de Jesús Grullón"),
    ("do","San Pedro de Macorís","Liceo Gastón Fernando Deligne"),
    ("do","Puerto Plata","Liceo Gregorio Luperón"),
    ("do","San Juan de la Maguana","Liceo Juan Pablo Pina"),
    ("do","La Romana","Liceo Pedro Henríquez Ureña"),
    ("do","San Francisco de Macorís","Liceo José Francisco Bobadilla"),
    ("do","San Cristóbal","Liceo Oscar Cucurullo Jr."),
    ("do","Moca","Liceo José Gabriel Babe"),
    ("do","Bonao","Liceo Aída Cartagena Portalatín"),
    ("do","Higüey","Liceo Sagrado Corazón de Jesús"),
    ("do","Baní","Liceo Máximo Gómez"),
    ("do","Barahona","Liceo Federico Henríquez y Carvajal"),
    ("do","Nagua","Liceo Eugenio María de Hostos"),
    # Costa Rica
    ("cr","San José","Colegio de San Luis Gonzaga"),
    ("cr","Alajuela","Liceo de Alajuela"),
    ("cr","Cartago","Colegio San Luis Gonzaga"),
    ("cr","Heredia","Colegio Marista"),
    ("cr","Liberia","Liceo de Liberia"),
    ("cr","Puntarenas","Liceo de Puntarenas"),
    ("cr","Limón","Liceo de Limón"),
    ("cr","Turrialba","Colegio de Turrialba"),
    ("cr","San Ramón","Liceo de San Ramón"),
    ("cr","Pérez Zeledón","Liceo de Pérez Zeledón"),
    # Guatemala
    ("gt","Ciudad de Guatemala","Instituto Central para Varones"),
    ("gt","Quetzaltenango","Instituto Normal Mixto"),
    ("gt","Escuintla","Instituto de Escuintla"),
    ("gt","Huehuetenango","Instituto de Huehuetenango"),
    ("gt","Antigua","Colegio San José"),
    ("gt","Totonicapán","Instituto Normal Indígena"),
    ("gt","Chimaltenango","Instituto de Chimaltenango"),
    ("gt","Jalapa","Instituto de Jalapa"),
    ("gt","Zacapa","Instituto de Zacapa"),
    ("gt","Santa Rosa","Instituto de Santa Rosa"),
    # El Salvador
    ("sv","San Salvador","Instituto Nacional General Francisco Menéndez"),
    ("sv","Santa Ana","Instituto Nacional de Santa Ana"),
    ("sv","San Miguel","Instituto Nacional de San Miguel"),
    ("sv","Soyapango","Instituto Nacional de Soyapango"),
    ("sv","Mejicanos","Instituto Nacional de Mejicanos"),
    # Honduras
    ("hn","Tegucigalpa","Instituto Central Vicente Cáceres"),
    ("hn","San Pedro Sula","Instituto San José"),
    ("hn","La Ceiba","Instituto Manuel Bonilla"),
    ("hn","Comayagua","Instituto León Alvarado"),
    ("hn","Choluteca","Instituto Jesús Aguilar Paz"),
    # Nicaragua
    ("ni","Managua","Instituto Nacional Ramírez Goyena"),
    ("ni","León","Instituto Nacional de León"),
    ("ni","Granada","Instituto Nacional de Granada"),
    ("ni","Masaya","Instituto Nacional de Masaya"),
    ("ni","Matagalpa","Instituto Nacional de Matagalpa"),
    # Panama
    ("pa","Panamá","Instituto Panamericano"),
    ("pa","Colón","Colegio Abel Bravo"),
    ("pa","David","Instituto David"),
    ("pa","Santiago","Colegio San Agustín"),
    ("pa","Penonomé","Colegio San José"),
]
for cc, city, school in _cities_raw:
    if cc not in CITIES:
        CITIES[cc] = []
    CITIES[cc].append((city, school))

CONFIG = {
    "cr": {
        "code":"CR","exam":"Pruebas Nacionales de Bachillerato (FARO)","agency":"MEP",
        "grade":11,"grado":"grado-11","alignment":"MEP - Pruebas Nacionales FARO",
        "subjects": {
            "matematicas":{"code":"MAT","topics":["numeros-reales","razones-proporciones","potencias-raices","expresiones-algebraicas","ecuaciones-lineales","sistemas-ecuaciones","inecuaciones","funcion-lineal","funcion-cuadratica","funcion-exponencial","geometria-angulos","geometria-triangulos","geometria-circulos","geometria-cuerpos","transformaciones-geometricas","probabilidad-basica","probabilidad-condicional","estadistica-descriptiva","medidas-tendencia-central","medidas-dispersion","diagramas-graficos","muestreo","datos-bivariados","correlacion","secuencias-potencias","fracciones-algebraicas","ecuaciones-racionales","funcion-raiz","funcion-logaritmica","logaritmos-propiedades","trigonometria-basica","trigonometria-triangulos","vectores","geometria-analitica","recta-plano","circunferencia","parabola-elipse","modelamiento-matematico","conjuntos-numericos","revision-integral"]},
            "espanol":{"code":"ESP","topics":["comprension-literal","comprension-inferencial","idea-principal","proposito-comunicativo","tipologia-textual","texto-narrativo","texto-expositivo","texto-argumentativo","estrategias-lectura","vocabulario-contextual","sinonimos-antonimos","campo-semantico","conectores-textuales","coherencia-textual","cohesion-textual","oracion-simple","oracion-compuesta","sujeto-predicado","verbos-tiempos","modos-verbales","concordancia-gramatical","signos-puntuacion","ortografia-acentual","ortografia-puntual","genero-narrativo","genero-lirico","genero-dramatico","figuras-literarias","analisis-literario","literatura-costarricense","literatura-latinoamericana","textos-medios","publicidad-medios","discurso-oral","debate-argumentacion","texto-expositivo-academico","resumen-sintesis","informe-resultados","ensayo-argumentativo","revision-edicion"]},
            "ciencias":{"code":"CIE","topics":["metodo-cientifico","celula-estructura","celula-funcion","reproduccion-celular","genetica-mendeliana","genetica-molecular","evolucion-seleccion","clasificacion-seres-vivos","reinos-biologicos","ecosistemas","cadenas-alimentarias","ciclos-biogeoquimicos","biodiversidad","materia-propiedades","tabla-periodica","enlaces-quimicos","reacciones-quimicas","estequiometria","compuestos-organicos","cinematica","fuerzas-leyes-newton","energia-trabajo","ondas-sonido","luz-optica","electricidad-circuitos","magnetismo","termologia-calor","presion-fluidos","cuerpo-humano-sistemas","sistema-nervioso","sistema-endocrino","sistema-inmune","nutricion-alimentos","salud-enfermedad","recursos-naturales","cambio-climatico","contaminacion-ambiente","ciencia-tecnologia","biodiversidad-cr","desarrollo-sostenible"]},
            "estudios-sociales":{"code":"SOC","topics":["prehistoria","primeras-civilizaciones","grecia-clasica","roma-antigua","edad-media","renacimiento","colonizacion-america","cr-precolombino","conquista-cr","colonia-cr","independencia-cr","republica-cr","democracia-cr","constitucion-cr","reformas-sociales-cr","siglo-xx-cr","historia-contemporanea-cr","revolucion-francesa","revolucion-industrial","imperialismo","primera-guerra-mundial","entreguerras","segunda-guerra-mundial","guerra-fria","descolonizacion","geografia-cr","geografia-mundial","poblacion-migracion","urbanizacion","recursos-naturales-cr","economia-basica","economia-cr","globalizacion","ciudadania-derechos","participacion-ciudadana","estado-cr","diversidad-cultural-cr","paz-derechos-humanos","desafios-contemporaneos","revision-integral"]},
            "ingles":{"code":"ING","topics":["present-simple","present-continuous","past-simple","past-continuous","present-perfect","past-perfect","future-will-going","future-perfect","modal-verbs","conditionals-0-1","conditionals-2-3","passive-voice","reported-speech","relative-clauses","comparatives","countable-uncountable","articles","prepositions-time","prepositions-place","phrasal-verbs","collocations","vocabulary-daily","vocabulary-school","vocabulary-work","vocabulary-travel","vocabulary-environment","vocabulary-health","reading-main-idea","reading-details","reading-inference","reading-vocabulary","reading-purpose","listening-strategies","speaking-dialogues","speaking-opinions","writing-paragraphs","writing-essays","writing-emails","writing-stories","integrated-skills"]},
        }
    },
    "gt": {
        "code":"GT","exam":"Pruebas de Graduandos","agency":"MINEDUC - DIGEDUCA",
        "grade":11,"grado":"grado-11","alignment":"CNB Guatemala - Pruebas de Graduandos",
        "subjects": {
            "matematica":{"code":"MAT","topics":["numeros-reales","razones-proporciones","potenciacion-radicacion","expresiones-algebraicas","ecuaciones-lineales","sistemas-ecuaciones","inecuaciones","funcion-lineal","funcion-cuadratica","funcion-exponencial","geometria-angulos","geometria-triangulos","geometria-circulos","geometria-cuerpos","congruencia-semejanza","probabilidad-basica","probabilidad-condicional","estadistica-descriptiva","medidas-tendencia-central","medidas-dispersion","graficos-estadisticos","muestreo","analisis-datos","series-estadisticas","secuencias","fracciones-algebraicas","ecuaciones-racionales","funcion-raiz","funcion-logaritmica","logaritmos","trigonometria-basica","trigonometria-triangulos","vectores","geometria-analitica","recta-circunferencia","conicas","matematicas-financieras","modelos-matematicos","razonamiento-logico","revision-integral"]},
            "comunicacion-lenguaje":{"code":"LEN","topics":["comprension-literal","comprension-inferencial","idea-principal","proposito-comunicativo","tipologia-textual","texto-narrativo","texto-expositivo","texto-argumentativo","analisis-textual","vocabulario-contextual","sinonimos-antonimos","campo-semantico","conectores-textuales","coherencia-textual","cohesion-textual","oracion-simple","oracion-compuesta","sujeto-predicado","verbos-tiempos","concordancia-gramatical","signos-puntuacion","ortografia-acentual","ortografia-letras","genero-narrativo","genero-lirico","genero-dramatico","figuras-literarias","literatura-guatemalteca","literatura-latinoamericana","textos-medios","publicidad-propaganda","discurso-oral","debate-argumentacion","texto-academico","resumen-sintesis","ensayo-argumentativo","produccion-textual","revision-correccion","comunicacion-oral","revision-integral"]},
            "ciencias-naturales":{"code":"CIE","topics":["metodo-cientifico","celula-estructura","division-celular","genetica-mendeliana","genetica-molecular","biotecnologia","evolucion","clasificacion-seres-vivos","reinos-biologicos","ecosistemas-gt","biodiversidad-gt","ciclos-biogeoquimicos","cadenas-alimentarias","materia-propiedades","tabla-periodica","enlaces-quimicos","reacciones-quimicas","estequiometria","compuestos-organicos","cinematica","dinamica","energia-trabajo","ondas-sonido","luz-optica","electricidad-circuitos","magnetismo","calor-temperatura","presion-fluidos","cuerpo-humano","sistema-nervioso","sistema-endocrino","sistema-inmune","nutricion","salud-prevencion","recursos-naturales-gt","cambio-climatico","geologia-gt","desastres-naturales","desarrollo-sostenible","revision-integral"]},
            "ciencias-sociales":{"code":"SOC","topics":["identidad-cultural-gt","diversidad-cultural","pueblos-mayas","maya-clasica","maya-posclasica","conquista-gt","colonia-gt","independencia-gt","republica-siglo-xix","revolucion-1944","conflicto-armado","paz-reconciliacion","democracia-gt","constitucion-gt","organizacion-estado","participacion-ciudadana","derechos-humanos","prehistoria-mundial","grecia-roma","edad-media","renacimiento","revolucion-francesa","revolucion-industrial","imperialismo","primera-guerra-mundial","segunda-guerra-mundial","guerra-fria","globalizacion","geografia-gt","centroamerica","poblacion-migracion","urbanizacion","recursos-naturales-gt","economia-gt","comercio-exterior","desarrollo-sostenible","cambio-climatico","ciudadania-global","revision-integral"]},
        }
    },
    "do": {
        "code":"DO","exam":"Pruebas Nacionales","agency":"MINERD",
        "grade":11,"grado":"grado-11","alignment":"MINERD - Pruebas Nacionales RD",
        "subjects": {
            "matematica":{"code":"MAT","topics":["conjuntos-numericos","numeros-reales","razones-proporciones","potencias-raices","expresiones-algebraicas","productos-notables","factorizacion","ecuaciones-lineales","sistemas-ecuaciones","inecuaciones","ecuaciones-cuadraticas","funcion-lineal","funcion-cuadratica","funcion-exponencial","funcion-logaritmica","sucesiones","geometria-angulos","geometria-triangulos","geometria-semejanza","geometria-circulos","geometria-cuerpos","trigonometria-basica","razones-trigonometricas","resolucion-triangulos","vectores","estadistica-descriptiva","medidas-tendencia-central","medidas-dispersion","graficos-estadisticos","probabilidad-clasica","probabilidad-compuesta","permutaciones","variable-aleatoria","geometria-analitica","recta-ecuacion","circunferencia","matematicas-financieras","modelos-matematicos","razonamiento-logico","revision-integral"]},
            "lengua-espanola":{"code":"LEN","topics":["comunicacion-proceso","funciones-lenguaje","lengua-lenguaje","comprension-literal","comprension-inferencial","comprension-critica","textos-narrativos","textos-expositivos","textos-argumentativos","textos-descriptivos","idea-principal","proposito-comunicativo","inferencias","vocabulario-contexto","sinonimos-antonimos","conectores-logicos","coherencia-textual","cohesion-textual","oracion-simple","oracion-compuesta","sujeto-predicado","verbos-modos","concordancia","signos-puntuacion","ortografia-acentual","ortografia-letras","genero-narrativo","genero-lirico","genero-dramatico","literatura-dominicana","textos-periodisticos","publicidad-medios","discurso-oral","debate-argumentacion","resumen-sintesis","ensayo-argumentativo","produccion-textual","revision-edicion","comunicacion-virtual","revision-integral"]},
            "ciencias-naturales":{"code":"CIE","topics":["indagacion-cientifica","celula-eucariota","organelos-celulares","membrana-transporte","division-celular-mitosis","division-celular-meiosis","genetica-mendeliana","genetica-molecular","sintesis-proteinas","biotecnologia","evolucion-darwin","seleccion-natural","clasificacion","ecosistemas-rd","biodiversidad-rd","recursos-naturales-rd","ciclos-biogeoquimicos","cadenas-alimentarias","materia-atomos","tabla-periodica","enlaces-quimicos","reacciones-quimicas","estequiometria","compuestos-organicos","cinematica","dinamica-newton","trabajo-energia","ondas","luz-optica","electricidad-circuitos","magnetismo","calor-temperatura","cuerpo-humano","sistema-nervioso","salud-nutricion","cambio-climatico","ciencia-tecnologia","biodiversidad-caribe","revision-integral"]},
            "ciencias-sociales":{"code":"SOC","topics":["identidad-cultural-rd","diversidad-cultural","raices-historicas","pueblos-originarios","conquista-espanola","colonia-rd","esclavitud-azucar","independencia-rd","ocupacion-haitiana","independencia-1844","republica-siglo-xix","restauracion","ocupacion-usa","dictadura-trujillo","democracia-rd","constitucion-rd","organizacion-estado","participacion-ciudadana","derechos-humanos","prehistoria","grecia-roma","edad-media","renacimiento","revolucion-francesa","revolucion-industrial","primera-guerra-mundial","segunda-guerra-mundial","guerra-fria","globalizacion","geografia-rd","caribe","poblacion-migracion","economia-rd","turismo-rd","desarrollo-sostenible","cambio-climatico","ciudadania-global","revision-integral"]},
            "ingles":{"code":"ING","topics":["present-simple","present-continuous","past-simple","past-continuous","present-perfect","past-perfect","future-will-going","future-perfect","modal-verbs","conditionals-0-1","conditionals-2-3","passive-voice","reported-speech","relative-clauses","comparatives","countable-uncountable","articles","prepositions-time","prepositions-place","phrasal-verbs","collocations","vocabulary-daily","vocabulary-school","vocabulary-work","vocabulary-travel","vocabulary-environment","vocabulary-health","reading-main-idea","reading-details","reading-inference","reading-vocabulary","reading-purpose","listening-strategies","speaking-dialogues","speaking-opinions","writing-paragraphs","writing-essays","writing-emails","writing-stories","integrated-skills"]},
        }
    },
    "sv": {
        "code":"SV","exam":"PAES","agency":"MINED",
        "grade":11,"grado":"grado-11","alignment":"MINED - PAES El Salvador",
        "subjects": {
            "matematicas":{"code":"MAT","topics":["conjuntos-numericos","numeros-reales","razones-proporciones","potenciacion-radicacion","expresiones-algebraicas","productos-notables","factorizacion","ecuaciones-lineales","sistemas-ecuaciones","inecuaciones","ecuaciones-cuadraticas","funcion-lineal","funcion-cuadratica","funcion-exponencial","funcion-logaritmica","sucesiones","geometria-angulos","geometria-triangulos","geometria-semejanza","geometria-pitagoras","geometria-circulos","geometria-cuerpos","trigonometria-basica","razones-trigonometricas","resolucion-triangulos","vectores","estadistica-descriptiva","medidas-tendencia-central","medidas-dispersion","graficos","probabilidad-clasica","probabilidad-compuesta","variable-aleatoria","geometria-analitica","recta-circunferencia","conicas","matematicas-financieras","razonamiento-logico","revision-integral"]},
            "lenguaje":{"code":"LEN","topics":["comunicacion-elementos","funciones-lenguaje","lengua-lenguaje","comprension-literal","comprension-inferencial","comprension-critica","textos-narrativos","textos-expositivos","textos-argumentativos","textos-descriptivos","idea-principal","proposito-comunicativo","inferencias","vocabulario-contexto","sinonimos-antonimos","conectores-logicos","coherencia-textual","cohesion-textual","oracion-simple","oracion-compuesta","sujeto-predicado","verbos-modos","concordancia","signos-puntuacion","ortografia-acentual","ortografia-letras","genero-narrativo","genero-lirico","genero-dramatico","figuras-literarias","literatura-salvadorena","literatura-latinoamericana","textos-periodisticos","publicidad","resumen-sintesis","ensayo-argumentativo","produccion-textual","revision-edicion","revision-integral"]},
            "ciencias-naturales":{"code":"CIE","topics":["investigacion-cientifica","celula-estructura","organelos","membrana-transporte","division-celular-mitosis","division-celular-meiosis","genetica-mendeliana","genetica-molecular","sintesis-proteinas","biotecnologia","evolucion","seleccion-natural","clasificacion","ecosistemas-sv","biodiversidad-sv","recursos-naturales-sv","ciclos-biogeoquimicos","cadenas-alimentarias","materia-atomos","tabla-periodica","enlaces-quimicos","reacciones-quimicas","estequiometria","compuestos-organicos","cinematica","dinamica","trabajo-energia","ondas","luz-optica","electricidad-circuitos","magnetismo","calor-temperatura","cuerpo-humano","salud-nutricion","cambio-climatico","desarrollo-sostenible","ciencia-tecnologia","revision-integral"]},
            "estudios-sociales":{"code":"SOC","topics":["identidad-cultural-sv","diversidad-cultural","pueblos-originarios","historia-prehispanica","conquista-espanola","colonia-sv","independencia-ca","federal-ca","siglo-xix-sv","republica-cafetalera","dictadura-martinez","guerra-civil-sv","acuerdos-paz","democracia-sv","constitucion-sv","organizacion-estado","derechos-humanos","participacion-ciudadana","prehistoria","grecia-roma","edad-media","renacimiento","revolucion-francesa","revolucion-industrial","primera-guerra-mundial","segunda-guerra-mundial","guerra-fria","globalizacion","geografia-sv","centroamerica","poblacion-migracion","urbanizacion","economia-sv","comercio-exterior","desarrollo-sostenible","cambio-climatico","ciudadania-global","revision-integral"]},
        }
    },
    "hn": {
        "code":"HN","exam":"Pruebas Nacionales de Bachillerato","agency":"SE",
        "grade":11,"grado":"grado-11","alignment":"SE - Pruebas Nacionales Honduras",
        "subjects": {
            "matematicas":{"code":"MAT","topics":["conjuntos-numericos","numeros-reales","razones-proporciones","potenciacion-radicacion","expresiones-algebraicas","productos-notables","factorizacion","ecuaciones-lineales","sistemas-ecuaciones","inecuaciones","ecuaciones-cuadraticas","funcion-lineal","funcion-cuadratica","funcion-exponencial","funcion-logaritmica","sucesiones","geometria-angulos","geometria-triangulos","geometria-semejanza","geometria-pitagoras","geometria-circulos","geometria-cuerpos","trigonometria-basica","razones-trigonometricas","ley-seno-coseno","vectores","estadistica-descriptiva","medidas-tendencia-central","medidas-dispersion","graficos","probabilidad-clasica","probabilidad-compuesta","variable-aleatoria","geometria-analitica","recta-circunferencia","conicas","matematicas-financieras","razonamiento-logico","revision-integral"]},
            "espanol":{"code":"ESP","topics":["comunicacion-elementos","funciones-lenguaje","lengua-lenguaje","comprension-literal","comprension-inferencial","comprension-critica","textos-narrativos","textos-expositivos","textos-argumentativos","textos-descriptivos","idea-principal","proposito-comunicativo","inferencias","vocabulario-contexto","sinonimos-antonimos","conectores-logicos","coherencia","cohesion","oracion-simple","oracion-compuesta","sujeto-predicado","verbos-conjugacion","concordancia","signos-puntuacion","ortografia-acentual","ortografia-letras","genero-narrativo","genero-lirico","genero-dramatico","figuras-literarias","literatura-hondurena","literatura-latinoamericana","textos-periodisticos","publicidad","discurso-oral","ensayo-argumentativo","produccion-textual","revision-correccion","revision-integral"]},
            "ciencias-naturales":{"code":"CIE","topics":["indagacion-cientifica","celula-eucariota","organelos","membrana-transporte","division-celular","genetica-mendeliana","genetica-molecular","sintesis-proteinas","biotecnologia","evolucion","seleccion-natural","clasificacion","ecosistemas-hn","biodiversidad-hn","recursos-naturales-hn","ciclos-biogeoquimicos","cadenas-alimentarias","materia-atomos","tabla-periodica","enlaces-quimicos","reacciones-quimicas","estequiometria","compuestos-organicos","cinematica","dinamica","trabajo-energia","ondas","luz-optica","electricidad","magnetismo","calor-temperatura","cuerpo-humano","salud-nutricion","cambio-climatico","desarrollo-sostenible","ciencia-tecnologia","revision-integral"]},
            "ciencias-sociales":{"code":"SOC","topics":["identidad-cultural-hn","diversidad-cultural","pueblos-originarios","historia-prehispanica","conquista-espanola","colonia-hn","independencia-ca","federal-ca","siglo-xix-hn","reforma-liberal","siglo-xx-hn","democracia-hn","constitucion-hn","organizacion-estado","participacion-ciudadana","derechos-humanos","prehistoria","grecia-roma","edad-media","renacimiento","revolucion-francesa","revolucion-industrial","primera-guerra-mundial","segunda-guerra-mundial","guerra-fria","globalizacion","geografia-hn","centroamerica","poblacion-migracion","urbanizacion","recursos-naturales-hn","economia-hn","comercio-exterior","desarrollo-sostenible","cambio-climatico","ciudadania-global","revision-integral"]},
        }
    },
    "ni": {
        "code":"NI","exam":"Pruebas Nacionales de Bachillerato","agency":"MINED",
        "grade":11,"grado":"grado-11","alignment":"MINED - Pruebas Nacionales Nicaragua",
        "subjects": {
            "matematicas":{"code":"MAT","topics":["conjuntos-numericos","numeros-reales","razones-proporciones","potenciacion-radicacion","expresiones-algebraicas","productos-notables","factorizacion","ecuaciones-lineales","sistemas-ecuaciones","inecuaciones","ecuaciones-cuadraticas","funcion-lineal","funcion-cuadratica","funcion-exponencial","funcion-logaritmica","sucesiones","geometria-angulos","geometria-triangulos","geometria-semejanza","geometria-circulos","geometria-cuerpos","trigonometria-basica","razones-trigonometricas","resolucion-triangulos","vectores","estadistica-descriptiva","medidas-tendencia-central","medidas-dispersion","graficos","probabilidad-clasica","probabilidad-compuesta","variable-aleatoria","geometria-analitica","recta-circunferencia","conicas","matematicas-financieras","razonamiento-logico","revision-integral"]},
            "lengua-literatura":{"code":"LEN","topics":["comunicacion-elementos","funciones-lenguaje","lengua-lenguaje","comprension-literal","comprension-inferencial","comprension-critica","textos-narrativos","textos-expositivos","textos-argumentativos","textos-descriptivos","idea-principal","proposito-comunicativo","inferencias","vocabulario-contexto","sinonimos-antonimos","conectores-logicos","coherencia","cohesion","oracion-simple","oracion-compuesta","sujeto-predicado","verbos-modos","concordancia","signos-puntuacion","ortografia-acentual","ortografia-letras","genero-narrativo","genero-lirico","genero-dramatico","figuras-literarias","literatura-nicaraguense","literatura-latinoamericana","ruben-dario","textos-periodisticos","publicidad","ensayo-argumentativo","produccion-textual","revision-edicion","revision-integral"]},
            "ciencias-naturales":{"code":"CIE","topics":["indagacion-cientifica","celula-eucariota","organelos","membrana-transporte","division-celular","genetica-mendeliana","genetica-molecular","evolucion","seleccion-natural","ecosistemas-ni","biodiversidad-ni","recursos-naturales-ni","ciclos-biogeoquimicos","cadenas-alimentarias","materia-atomos","tabla-periodica","enlaces-quimicos","reacciones-quimicas","estequiometria","compuestos-organicos","cinematica","dinamica","trabajo-energia","ondas","luz-optica","electricidad","magnetismo","calor-temperatura","cuerpo-humano","salud-nutricion","cambio-climatico","desarrollo-sostenible","ciencia-tecnologia","revision-integral"]},
        }
    },
    "pa": {
        "code":"PA","exam":"Pruebas Nacionales de Bachillerato","agency":"MEDUCA",
        "grade":11,"grado":"grado-11","alignment":"MEDUCA - Pruebas Nacionales Panama",
        "subjects": {
            "matematicas":{"code":"MAT","topics":["conjuntos-numericos","numeros-reales","razones-proporciones","potenciacion-radicacion","expresiones-algebraicas","productos-notables","factorizacion","ecuaciones-lineales","sistemas-ecuaciones","inecuaciones","ecuaciones-cuadraticas","funcion-lineal","funcion-cuadratica","funcion-exponencial","funcion-logaritmica","sucesiones","geometria-angulos","geometria-triangulos","geometria-semejanza","geometria-circulos","geometria-cuerpos","trigonometria-basica","razones-trigonometricas","resolucion-triangulos","vectores","estadistica-descriptiva","medidas-tendencia-central","medidas-dispersion","graficos","probabilidad-clasica","probabilidad-compuesta","variable-aleatoria","geometria-analitica","recta-circunferencia","conicas","matematicas-financieras","razonamiento-logico","revision-integral"]},
            "espanol":{"code":"ESP","topics":["comunicacion-elementos","funciones-lenguaje","lengua-lenguaje","comprension-literal","comprension-inferencial","comprension-critica","textos-narrativos","textos-expositivos","textos-argumentativos","textos-descriptivos","idea-principal","proposito-comunicativo","inferencias","vocabulario-contexto","sinonimos-antonimos","conectores-logicos","coherencia","cohesion","oracion-simple","oracion-compuesta","sujeto-predicado","verbos-modos","concordancia","signos-puntuacion","ortografia-acentual","ortografia-letras","genero-narrativo","genero-lirico","genero-dramatico","figuras-literarias","literatura-panamena","literatura-latinoamericana","textos-periodisticos","publicidad","discurso-oral","ensayo-argumentativo","produccion-textual","revision-correccion","revision-integral"]},
            "ciencias":{"code":"CIE","topics":["indagacion-cientifica","celula-eucariota","organelos","membrana-transporte","division-celular","genetica-mendeliana","genetica-molecular","evolucion","seleccion-natural","ecosistemas-pa","biodiversidad-pa","recursos-naturales-pa","ciclos-biogeoquimicos","cadenas-alimentarias","materia-atomos","tabla-periodica","enlaces-quimicos","reacciones-quimicas","estequiometria","compuestos-organicos","cinematica","dinamica","trabajo-energia","ondas","luz-optica","electricidad","magnetismo","calor-temperatura","cuerpo-humano","salud-nutricion","cambio-climatico","desarrollo-sostenible","ciencia-tecnologia","revision-integral"]},
        }
    },
}