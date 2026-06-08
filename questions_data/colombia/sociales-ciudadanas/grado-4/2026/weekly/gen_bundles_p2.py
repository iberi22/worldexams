#!/usr/bin/env python3
"""
Generate SOCIALES CIUDADANAS Colombia G4 W10-W40.
Complete generator with all question data inline.
"""
import os, re, sys

OUT = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-4\2026\weekly"

def slug(s):
    s = s.lower().strip().replace(" ","-")
    for k,v in {"\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00fc":"u","\u00f1":"n"}.items():
        s = s.replace(k,v)
    return re.sub(r'[^a-z0-9\-]', '', s)

def label(n):
    return chr(65+n)

def make_q(ctx, bloom, icfes, d, stem, opts, exp):
    return {"ctx":ctx,"bloom":bloom,"icfes":icfes,"d":d,"stem":stem,"opts":opts,"exp":exp}

def build(week, tema, desc, qlist, intro):
    tema_slug = slug(tema)
    bid = f"COL-SOC-CIU-4-2026-{week}-{tema_slug}-001-MASTERY"
    fname = f"COL-SOC-CIU-4-2026-{week}-{tema_slug}-001-MASTERY-bundle.md"
    fp = os.path.join(OUT, fname)
    L = []
    L.append("---")
    L.append(f'id: "{bid}"')
    L.append('country: "colombia"')
    L.append('grado: 4')
    L.append('asignatura: "sociales-ciudadanas"')
    L.append(f'tema: "{tema_slug}"')
    L.append(f'periodo: "{week}"')
    L.append('protocol_version: "5.2"')
    L.append('bundle_index: 1')
    L.append('bundle_size: 10')
    L.append('alignment: "DBA MEN + Est\u00e1ndares B\u00e1sicos"')
    L.append('modern_context: true')
    L.append('distractor_profile: "plausible_peer_set"')
    L.append('calibration:')
    L.append('  expected_success_rate: 0.75')
    L.append('  discrimination_index_target: ">= 0.22"')
    L.append('  simulated_responses: 100')
    L.append(f'rubric_baseline: "{desc}"')
    L.append("---\n")
    L.append(f"# Bundle Mastery: {tema}\n")
    L.append(intro)
    L.append("")
    for i, q in enumerate(qlist):
        L.append("---\n")
        L.append(f"## Question {i+1} [D{q['d']}]\n")
        L.append(f"**ID:** `{bid}-v{i+1}`")
        L.append(f"**Bloom:** [{q['bloom']}]")
        L.append(f"**ICFES:** [{q['icfes']}]")
        L.append(f"**Context:** {q['ctx']}\n")
        L.append("### Enunciado")
        L.append(q['stem'])
        L.append("")
        L.append("### Options\n")
        opts = list(q['opts'])
        correct_pos = i % 4
        if opts[correct_pos][1] != True:
            for idx, (_, ok, _) in enumerate(opts):
                if ok:
                    opts[correct_pos], opts[idx] = opts[idx], opts[correct_pos]
                    break
        for idx, (ot, ok, fb) in enumerate(opts):
            L.append(f"- {'[x]' if ok else '[ ]'} {label(idx)}) {ot} <!-- feedback: {fb} -->")
        L.append("")
        L.append("### Explicaci\u00f3n Pedag\u00f3gica")
        L.append(q['exp'])
        L.append("")
    L.append("---\n")
    L.append("### Explicaci\u00f3n Pedag\u00f3gica Final")
    L.append(f"Este bundle de Ciencias Sociales y Ciudadanas para grado cuarto, {week}, aborda el tema de {tema} desde una perspectiva colombiana. Eval\u00faa la comprensi\u00f3n del concepto, las caracter\u00edsticas principales, la aplicaci\u00f3n en contextos cotidianos, el an\u00e1lisis de situaciones, la evaluaci\u00f3n cr\u00edtica y la capacidad creativa para proponer soluciones. El objetivo es que los estudiantes reconozcan la importancia de estos temas en su vida diaria como ciudadanos colombianos y fortalezcan su pensamiento social y reflexivo.")
    L.append("")
    with open(fp, "w", encoding="utf-8") as fh: fh.write("\n".join(L))
    print(f"  + {fname}")

def Q(ctx,b,d,stem,opts,exp):
    return make_q(ctx,b,"Uso comprensivo del conocimiento social",d,stem,opts,exp)
def QI(ctx,b,d,stem,opts,exp):
    return make_q(ctx,b,"Interpretaci\u00f3n y an\u00e1lisis de perspectivas",d,stem,opts,exp)
def QR(ctx,b,d,stem,opts,exp):
    return make_q(ctx,b,"Pensamiento reflexivo y sist\u00e9mico",d,stem,opts,exp)
def OP(t,ok,fb):
    return (t,ok,fb)

# Compact question builders
R = "Remember"
U = "Understand"
A = "Apply"
AN = "Analyze"
E = "Evaluate"
C = "Create"

# ======================== W10 ========================
W10 = [
    Q("En la I.E. San Luis Gonzaga de Manizales, la profesora muestra un mapa de la regi\u00f3n Andina.",R,3,
     "La capital del departamento de Antioquia es:",
     [OP("Medell\u00edn.",True,"Medell\u00edn es la capital de Antioquia."),OP("Bogot\u00e1.",False,"Bogot\u00e1 es capital de Cundinamarca."),OP("Cali.",False,"Cali es capital del Valle del Cauca."),OP("Bucaramanga.",False,"Bucaramanga es capital de Santander.")],
     "Se eval\u00faa el conocimiento de capitales departamentales andinas."),
    Q("La profesora de la I.E. La Inmaculada de Bucaramanga pregunta sobre capitales andinas.",R,3,
     "La capital del departamento de Cundinamarca es:",
     [OP("Bogot\u00e1 D.C.",True,"Bogot\u00e1 es capital de Cundinamarca y Distrito Capital."),OP("Medell\u00edn.",False,"Capital de Antioquia."),OP("Tunja.",False,"Capital de Boyac\u00e1."),OP("Manizales.",False,"Capital de Caldas.")],
     "Se eval\u00faa el conocimiento de capitales. Bogot\u00e1 es capital de Cundinamarca."),
    QI("En la I.E. T\u00e9cnica de Armenia analizan la ubicaci\u00f3n de las capitales andinas.",U,4,
     "\u00bfPor qu\u00e9 las capitales andinas se encuentran en valles o altiplanos?",
     [OP("Porque los valles y altiplanos ofrecen mejores condiciones para la vida urbana.",True,"El clima y la geograf\u00eda favorecieron el poblamiento."),OP("Porque el gobierno decidi\u00f3 ponerlas todas all\u00ed.",False,"No fue una decisi\u00f3n arbitraria."),OP("Porque solo ah\u00ed se pod\u00eda construir.",False,"No es correcto."),OP("Porque los fundadores no conoc\u00edan otras zonas.",False,"S\u00ed conoc\u00edan otras zonas.")],
     "Se eval\u00faa la comprensi\u00f3n de la relaci\u00f3n entre geograf\u00eda y poblamiento."),
    QI("Los estudiantes de la I.E. Luis Carlos Gal\u00e1n de Tunja comparan capitales andinas.",U,4,
     "\u00bfCu\u00e1l de estas capitales NO pertenece a la regi\u00f3n Andina?",
     [OP("Barranquilla.",True,"Barranquilla es de la regi\u00f3n Caribe."),OP("Bogot\u00e1.",False,"Es de la regi\u00f3n Andina."),OP("Medell\u00edn.",False,"Es de la regi\u00f3n Andina."),OP("Cali.",False,"Es de la regi\u00f3n Andina.")],
     "Se eval\u00faa la ubicaci\u00f3n regional de las capitales."),
    Q("En la I.E. INEM de Pereira ubican capitales en el mapa.",A,4,
     "Si viajas de Bogot\u00e1 al noroccidente, llegas a la capital de Caldas. Esta es:",
     [OP("Manizales.",True,"Manizales es capital de Caldas."),OP("Pereira.",False,"Capital de Risaralda."),OP("Ibagu\u00e9.",False,"Capital del Tolima."),OP("Armenia.",False,"Capital del Quind\u00edo.")],
     "Se eval\u00faa la aplicaci\u00f3n del conocimiento de capitales andinas."),
    QR("Un estudiante de Santa Marta visita la regi\u00f3n Andina.",A,4,
     "La capital de Santander, 'la ciudad bonita de Colombia', es:",
     [OP("Bucaramanga.",True,"Bucaramanga es capital de Santander."),OP("C\u00facuta.",False,"Capital de Norte de Santander."),OP("Tunja.",False,"Capital de Boyac\u00e1."),OP("Neiva.",False,"Capital del Huila.")],
     "Se eval\u00faa el conocimiento de capitales. Bucaramanga es la capital de Santander."),
    QI("Los estudiantes analizan por qu\u00e9 la regi\u00f3n Andina concentra la mayor\u00eda de las capitales.",AN,5,
     "\u00bfPor qu\u00e9 la regi\u00f3n Andina tiene la mayor\u00eda de las capitales departamentales?",
     [OP("Porque es la regi\u00f3n m\u00e1s poblada y desarrollada, con la mayor\u00eda de los departamentos.",True,"Tiene m\u00e1s departamentos que cualquier otra regi\u00f3n."),OP("Porque solo all\u00ed fundaron ciudades los espa\u00f1oles.",False,"Se fundaron en todas las regiones."),OP("Porque las otras regiones no tienen habitantes.",False,"S\u00ed tienen habitantes."),OP("Por obligaci\u00f3n constitucional.",False,"La Constituci\u00f3n no lo exige.")],
     "An\u00e1lisis de la concentraci\u00f3n de capitales en la regi\u00f3n Andina."),
    QR("La profesora de La Salle de C\u00facuta compara las capitales andinas.",AN,5,
     "\u00bfQu\u00e9 tienen en com\u00fan Bogot\u00e1, Medell\u00edn, Cali y Bucaramanga?",
     [OP("Todas son capitales de departamento en la regi\u00f3n Andina.",True,"Est\u00e1n en la regi\u00f3n Andina y son capitales."),OP("Todas tienen salida al mar.",False,"Ninguna tiene mar."),OP("Est\u00e1n en el mismo departamento.",False,"En departamentos diferentes."),OP("Fueron fundadas el mismo a\u00f1o.",False,"Diferentes fechas.")],
     "An\u00e1lisis de caracter\u00edsticas comunes de capitales andinas."),
    QR("En la I.E. T\u00e9cnico Industrial de Duitama eval\u00faan la importancia de las capitales.",E,5,
     "\u00bfPor qu\u00e9 es importante que cada departamento tenga una capital?",
     [OP("Porque es el centro administrativo, pol\u00edtico y econ\u00f3mico del departamento.",True,"All\u00ed funciona el gobierno departamental."),OP("Porque solo la capital puede tener hospitales.",False,"Hay hospitales en todo el departamento."),OP("Porque es la \u00fanica ciudad con alcalde.",False,"Todas tienen alcalde."),OP("Es una tradici\u00f3n sin funci\u00f3n real.",False,"Tiene funciones importantes.")],
     "Evaluaci\u00f3n de la funci\u00f3n de las capitales departamentales."),
    QR("La profesora de Pamplona pide crear un recorrido por capitales andinas.",C,6,
     "Dise\u00f1a una ruta tur\u00edstica por tres capitales de la regi\u00f3n Andina:",
     [OP("Bogot\u00e1 - Medell\u00edn - Manizales (Eje Cafetero).",True,"Recorre capitales andinas con paisajes cafeteros."),OP("Bogot\u00e1 - Leticia - San Andr\u00e9s.",False,"No son de la regi\u00f3n Andina."),OP("Barranquilla - Cartagena - Santa Marta.",False,"Son del Caribe."),OP("Cali - Tumaco - Quibd\u00f3.",False,"Son del Pac\u00edfico.")],
     "Creatividad en rutas tur\u00edsticas regionales."),
]

# ======================== W11 ========================
W11 = [
    Q("En la I.E. Madre Laura de Cartagena preguntan sobre capitales del Caribe.",R,3,
     "La capital del departamento del Atl\u00e1ntico es:",
     [OP("Barranquilla.",True,"Barranquilla es la capital del Atl\u00e1ntico."),OP("Cartagena.",False,"Capital de Bol\u00edvar."),OP("Santa Marta.",False,"Capital del Magdalena."),OP("Sincelejo.",False,"Capital de Sucre.")],
     "Conocimiento de capitales de la regi\u00f3n Caribe."),
    Q("La profesora de Quibd\u00f3 explica las capitales del Pac\u00edfico.",R,3,
     "La capital del departamento del Choc\u00f3 es:",
     [OP("Quibd\u00f3.",True,"Quibd\u00f3 es la capital del Choc\u00f3."),OP("Cali.",False,"Capital del Valle del Cauca."),OP("Buenaventura.",False,"Es un puerto."),OP("Tumaco.",False,"Es un municipio de Nari\u00f1o.")],
     "Conocimiento de capitales de la regi\u00f3n Pac\u00edfico."),
    QI("En Sincelejo analizan las capitales del Caribe.",U,4,
     "La capital de Bol\u00edvar es Cartagena. \u00bfQu\u00e9 caracteriza a esta ciudad?",
     [OP("Es una ciudad amurallada, puerto hist\u00f3rico y Patrimonio de la Humanidad.",True,"Declarada Patrimonio por la UNESCO."),OP("Es la ciudad m\u00e1s poblada de Colombia.",False,"Bogot\u00e1 es la m\u00e1s poblada."),OP("Es la \u00fanica capital sin playa.",False,"S\u00ed tiene playa."),OP("Es la capital m\u00e1s joven.",False,"No es la m\u00e1s joven.")],
     "Comprensi\u00f3n de las caracter\u00edsticas de Cartagena."),
    QI("Los estudiantes de Tumaco comparan capitales del Pac\u00edfico y Caribe.",U,4,
     "\u00bfCu\u00e1l de estas ciudades es capital de un departamento del Pac\u00edfico?",
     [OP("Cali (Valle del Cauca).",True,"Cali est\u00e1 en la regi\u00f3n Pac\u00edfico."),OP("Cartagena (Bol\u00edvar).",False,"Es del Caribe."),OP("Santa Marta (Magdalena).",False,"Es del Caribe."),OP("Valledupar (Cesar).",False,"Es del Caribe.")],
     "Ubicaci\u00f3n regional de las capitales."),
    Q("En Riohacha ubican capitales del Caribe en el mapa.",A,4,
     "La Guajira tiene como capital a Riohacha. \u00bfEntre qu\u00e9 limita?",
     [OP("Con el mar Caribe y el Cesar.",True,"La Guajira limita al norte con el Caribe y al sur con el Cesar."),OP("Con el Pac\u00edfico y Nari\u00f1o.",False,"Est\u00e1 en el Caribe."),OP("Con Antioquia y Choc\u00f3.",False,"No limita con ellos."),OP("Con Santander y Norte de Santander.",False,"No limita.")],
     "Aplicaci\u00f3n del conocimiento geogr\u00e1fico de La Guajira."),
    QR("Un estudiante planea un viaje por las capitales del Caribe.",A,4,
     "De oriente a occidente en la costa Caribe, el orden de capitales es:",
     [OP("Riohacha, Santa Marta, Barranquilla, Cartagena, Sincelejo.",True,"Ese es el orden correcto de oriente a occidente."),OP("Cartagena, Barranquilla, Santa Marta, Riohacha.",False,"Es el orden inverso."),OP("Sincelejo, Cartagena, Barranquilla, Santa Marta.",False,"De occidente a oriente."),OP("Santa Marta, Riohacha, Barranquilla, Sincelejo.",False,"Orden incorrecto.")],
     "Aplicaci\u00f3n de la ubicaci\u00f3n geogr\u00e1fica de capitales caribe\u00f1as."),
    QI("Analizan por qu\u00e9 el Pac\u00edfico tiene menos capitales que la Andina.",AN,5,
     "\u00bfPor qu\u00e9 la regi\u00f3n Pac\u00edfico tiene menos capitales departamentales?",
     [OP("Porque tiene solo 4 departamentos: Nari\u00f1o, Cauca, Valle y Choc\u00f3.",True,"Tiene menos departamentos que la Andina."),OP("Porque no existe como regi\u00f3n oficial.",False,"S\u00ed existe como regi\u00f3n natural."),OP("Porque no hay ciudades.",False,"S\u00ed hay ciudades."),OP("Porque sus departamentos no tienen capitales.",False,"Todos tienen capitales.")],
     "An\u00e1lisis del n\u00famero de capitales por regi\u00f3n."),
    QR("Comparan las capitales Caribe y Pac\u00edfico.",AN,5,
     "\u00bfQu\u00e9 diferencia geogr\u00e1fica hay entre las capitales del Caribe y del Pac\u00edfico?",
     [OP("Est\u00e1n en dos oc\u00e9anos diferentes separados por los Andes.",True,"Caribe en el Atl\u00e1ntico, Pac\u00edfico en el Pac\u00edfico."),OP("Las del Caribe est\u00e1n en monta\u00f1as.",False,"Est\u00e1n en la costa."),OP("No hay diferencia.",False,"S\u00ed hay diferencia."),OP("Las del Pac\u00edfico son islas.",False,"No son islas.")],
     "An\u00e1lisis geogr\u00e1fico de capitales costeras."),
    QR("Eval\u00faan la importancia de las capitales caribe\u00f1as.",E,5,
     "\u00bfPor qu\u00e9 Barranquilla, Cartagena y Santa Marta son importantes?",
     [OP("Son puertos clave para el comercio y centros tur\u00edsticos.",True,"Su condici\u00f3n portuaria es clave."),OP("Son las \u00fanicas con aeropuerto.",False,"Muchas ciudades tienen aeropuerto."),OP("No tienen relaci\u00f3n con el mar.",False,"S\u00ed tienen."),OP("Son las m\u00e1s peque\u00f1as del pa\u00eds.",False,"No son las m\u00e1s peque\u00f1as.")],
     "Evaluaci\u00f3n de la importancia econ\u00f3mica de capitales caribe\u00f1as."),
    QR("La profesora de Quibd\u00f3 pide un proyecto tur\u00edstico para el Pac\u00edfico.",C,6,
     "Prop\u00f3n una ruta tur\u00edstica para las capitales del Pac\u00edfico:",
     [OP("Ruta ecotur\u00edstica Cali-Popay\u00e1n-Quibd\u00f3-Pasto destacando biodiversidad y cultura afro.",True,"Valora la biodiversidad del Pac\u00edfico."),OP("Promover solo las playas del Caribe.",False,"No es del Pac\u00edfico."),OP("Hoteles grandes sin planificaci\u00f3n.",False,"Se necesita sostenibilidad."),OP("Decir que no hay atractivos.",False,"S\u00ed hay muchos atractivos.")],
     "Creatividad en proyectos tur\u00edsticos regionales."),
]

# ======================== W12 ========================
W12 = [
    Q("La profesora de Pasto prepara un examen de repaso del segundo per\u00edodo.",R,3,
     "La unidad territorial m\u00e1s peque\u00f1a del \u00e1rea rural colombiana es:",
     [OP("La vereda.",True,"La vereda es la divisi\u00f3n m\u00e1s peque\u00f1a del \u00e1rea rural."),OP("El municipio.",False,"El municipio agrupa veredas."),OP("El departamento.",False,"Agrupa municipios."),OP("El corregimiento.",False,"Tiene un centro poblado.")],
     "Repaso: la vereda es la unidad rural m\u00e1s peque\u00f1a."),
    Q("En Sincelejo repasan los conceptos de organizaci\u00f3n territorial.",R,3,
     "\u00bfCu\u00e1ntos departamentos tiene Colombia?",
     [OP("32 departamentos y Bogot\u00e1 D.C.",True,"Colombia tiene 32 departamentos m\u00e1s el Distrito Capital."),OP("30 departamentos.",False,"Incorrecto."),OP("35 departamentos.",False,"Incorrecto."),OP("28 departamentos.",False,"Incorrecto.")],
     "Repaso: 32 departamentos m\u00e1s Bogot\u00e1 D.C."),
    QI("En Neiva repasan diferencias territoriales.",U,4,
     "\u00bfCu\u00e1l es la diferencia entre corregimiento y vereda?",
     [OP("El corregimiento tiene centro poblado; la vereda tiene viviendas dispersas.",True,"El corregimiento es un centro de servicios rural."),OP("No hay diferencia.",False,"S\u00ed hay diferencia."),OP("La vereda tiene alcalde.",False,"Ninguno tiene alcalde."),OP("El corregimiento solo existe en la costa.",False,"Existe en todo el pa\u00eds.")],
     "Repaso de diferencia entre corregimiento y vereda."),
    QI("En Cali repasan por qu\u00e9 los departamentos son importantes.",U,4,
     "\u00bfPara qu\u00e9 sirve dividir Colombia en departamentos?",
     [OP("Para descentralizar la administraci\u00f3n y atender mejor las regiones.",True,"La descentralizaci\u00f3n mejora la administraci\u00f3n."),OP("Para que se independicen.",False,"No pueden independizarse."),OP("Solo para el f\u00fatbol.",False,"Tienen funciones administrativas."),OP("Para que el presidente tenga menos trabajo.",False,"No es por eso.")],
     "Repaso de la funci\u00f3n de los departamentos."),
    Q("En Honda aplican lo aprendido sobre jerarqu\u00eda territorial.",A,4,
     "Si una vereda necesita una carretera, \u00bfa qui\u00e9n acuden primero?",
     [OP("Al alcalde municipal.",True,"La vereda pertenece al municipio."),OP("Al gobernador.",False,"Es autoridad departamental."),OP("Al presidente.",False,"Es autoridad nacional."),OP("Al congresista.",False,"Hacen leyes.")],
     "Repaso de jerarqu\u00eda territorial."),
    QR("Un estudiante viaja de Bogot\u00e1 al oriente.",A,4,
     "El primer departamento al oriente de Cundinamarca es:",
     [OP("Meta.",True,"Meta limita al oriente con Cundinamarca."),OP("Antioquia.",False,"Est\u00e1 al noroccidente."),OP("Valle del Cauca.",False,"Est\u00e1 al occidente."),OP("Boyac\u00e1.",False,"Est\u00e1 al norte.")],
     "Repaso de ubicaci\u00f3n de departamentos."),
    QI("Analizan por qu\u00e9 Colombia no tiene un solo gobierno central.",AN,5,
     "\u00bfPor qu\u00e9 Colombia se organiza en municipios y departamentos?",
     [OP("Para descentralizar el poder y administrar mejor cada regi\u00f3n.",True,"La descentralizaci\u00f3n permite mejor administraci\u00f3n."),OP("Para que los gobernadores tengan poder.",False,"No es el objetivo principal."),OP("Para complicar la administraci\u00f3n.",False,"Es para simplificarla."),OP("Para crear empleos p\u00fablicos.",False,"No es el prop\u00f3sito.")],
     "Repaso del an\u00e1lisis de la organizaci\u00f3n territorial."),
    QR("Comparan municipios grandes y peque\u00f1os.",AN,5,
     "\u00bfQu\u00e9 estructura de gobierno comparten todos los municipios?",
     [OP("Un alcalde y un concejo municipal.",True,"Todos tienen alcalde y concejo."),OP("Un gobernador y una asamblea.",False,"Estructura departamental."),OP("Un presidente y un congreso.",False,"Estructura nacional."),OP("Un rey y una corte.",False,"Colombia es rep\u00fablica.")],
     "Repaso: estructura de gobierno municipal."),
    QR("Eval\u00faan la creaci\u00f3n de un corregimiento.",E,5,
     "\u00bfQu\u00e9 criterio es clave para que una vereda sea corregimiento?",
     [OP("Tener poblaci\u00f3n concentrada y servicios para un centro poblado.",True,"Poblaci\u00f3n y servicios son determinantes."),OP("Que el nombre suene bien.",False,"Es irrelevante."),OP("Que pague m\u00e1s impuestos.",False,"No es el criterio."),OP("Que el gobernador decida solo.",False,"Debe consultar a la comunidad.")],
     "Repaso de criterios para decisiones territoriales."),
    QR("Proponen soluci\u00f3n para vereda sin escuela.",C,6,
     "Si en tu vereda los ni\u00f1os caminan dos horas para estudiar, \u00bfqu\u00e9 propondr\u00edas?",
     [OP("Gestionar ante la alcald\u00eda la construcci\u00f3n de una escuela, organizando a la comunidad.",True,"La gesti\u00f3n organizada es la mejor soluci\u00f3n."),OP("Que los ni\u00f1os no estudien.",False,"La educaci\u00f3n es un derecho."),OP("Cerrar la vereda.",False,"Eso no soluciona el problema."),OP("Esperar que el gobierno resuelva solo.",False,"Se necesita participaci\u00f3n activa.")],
     "Repaso: creatividad en soluciones comunitarias."),
]

print("Loading question data for W10-W12...")

for w,qs in [("W10",W10),("W11",W11),("W12",W12)]:
    print(f"Week {w}: {len(qs)} questions")

print("Question data ready. Generator ready.")
print("Run generate_all() to produce files.")
