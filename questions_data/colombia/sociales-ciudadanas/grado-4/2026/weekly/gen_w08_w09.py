#!/usr/bin/env python3
# Part 1: W08-W09 questions data

import os, re, sys

OUT = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-4\2026\weekly"

def slug(s):
    s = s.lower().strip()
    s = s.replace(" ","-")
    # Normalize Spanish accented vowels to plain ASCII
    replacements = {"á":"a","é":"e","í":"i","ó":"o","ú":"u","ü":"u","ñ":"n"}
    for k,v in replacements.items():
        s = s.replace(k,v)
    return re.sub(r'[^a-z0-9\-]', '', s)

def label(n):
    return chr(65+n)

def make_q(ctx, bloom, icfes, d, stem, opts, exp):
    return {"ctx":ctx,"bloom":bloom,"icfes":icfes,"d":d,"stem":stem,"opts":opts,"exp":exp}

def build_bundle(week, tema, desc, qlist, intro):
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
    L.append("---")
    L.append("")
    L.append(f"# Bundle Mastery: {tema}")
    L.append("")
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
            px = '[x]' if ok else '[ ]'
            L.append(f"- {px} {label(idx)}) {ot} <!-- feedback: {fb} -->")
        L.append("")
        L.append("### Explicaci\u00f3n Pedag\u00f3gica")
        L.append(q['exp'])
        L.append("")

    L.append("---\n")
    L.append("### Explicaci\u00f3n Pedag\u00f3gica Final")
    L.append(f"Este bundle de Ciencias Sociales y Ciudadanas para grado cuarto, {week}, aborda el tema de {tema} desde una perspectiva colombiana. Eval\u00faa la comprensi\u00f3n del concepto, las caracter\u00edsticas principales, la aplicaci\u00f3n en contextos cotidianos, el an\u00e1lisis de situaciones, la evaluaci\u00f3n cr\u00edtica y la capacidad creativa para proponer soluciones. El objetivo es que los estudiantes reconozcan la importancia de estos temas en su vida diaria como ciudadanos colombianos y fortalezcan su pensamiento social y reflexivo.")
    L.append("")
    c = "\n".join(L)
    with open(fp, "w", encoding="utf-8") as fh:
        fh.write(c)
    print(f"Generated: {fname}")


# ======== WEEKS DATA ========
WEEKS = [
    ("W08","Organizaci\u00f3n territorial: veredas, corregimientos, municipios","Organizaci\u00f3n territorial colombiana: veredas, corregimientos y municipios como entidades b\u00e1sicas de la divisi\u00f3n pol\u00edtico-administrativa",
     "Este bundle aborda la organizaci\u00f3n territorial colombiana desde sus unidades m\u00e1s peque\u00f1as. Se exploran las veredas en el \u00e1rea rural, los corregimientos como centros poblados rurales y los municipios como entidad fundamental de la divisi\u00f3n pol\u00edtico-administrativa del pa\u00eds."),
    ("W09","Departamentos de Colombia","Los departamentos como unidades territoriales de Colombia, su concepto, cu\u00e1ntos son y c\u00f3mo se organizan",
     "Este bundle explora el concepto de departamento como unidad territorial intermedia entre la naci\u00f3n y el municipio. Se analizan cu\u00e1ntos departamentos conforman Colombia, su organizaci\u00f3n, su importancia administrativa y c\u00f3mo se relacionan con los municipios."),
]


# ======== QUESTIONS ========

def get_w08():
    return [
        make_q("En la clase de Sociales de la I.E. Gabriel Garc\u00eda M\u00e1rquez de Medell\u00edn, la profesora explica las formas de organizaci\u00f3n territorial.",
            "Remember","Uso comprensivo del conocimiento social",3,
            "Una vereda en Colombia es:",
            [("Una divisi\u00f3n del \u00e1rea rural de un municipio, compuesta por terrenos y viviendas dispersas.",True,"La vereda es la divisi\u00f3n m\u00e1s peque\u00f1a del \u00e1rea rural del municipio colombiano."),
             ("Una ciudad peque\u00f1a con alcalde propio.",False,"Las ciudades peque\u00f1as tienen alcalde, las veredas no."),
             ("Un barrio de una gran ciudad.",False,"Los barrios son urbanos, las veredas son rurales."),
             ("Un departamento con gobierno propio.",False,"Los departamentos agrupan municipios, son mucho m\u00e1s grandes.")],
            "Se eval\u00faa el concepto de vereda como unidad rural b\u00e1sica. Es la divisi\u00f3n m\u00e1s peque\u00f1a del \u00e1rea rural municipal. El error com\u00fan es confundirla con un barrio urbano o una entidad territorial mayor."),
        make_q("En la I.E. San Jos\u00e9 de Sincelejo, los estudiantes observan un mapa de la organizaci\u00f3n territorial colombiana.",
            "Remember","Uso comprensivo del conocimiento social",3,
            "Un municipio en Colombia es:",
            [("La entidad territorial fundamental de la divisi\u00f3n pol\u00edtico-administrativa, gobernada por un alcalde.",True,"Cada municipio tiene un alcalde como jefe de la administraci\u00f3n local."),
             ("Un pa\u00eds independiente dentro de Colombia.",False,"Colombia es un solo pa\u00eds, no est\u00e1 formado por pa\u00edses independientes."),
             ("Una vereda grande con escuela.",False,"El municipio es mucho m\u00e1s grande que una vereda y agrupa varias veredas."),
             ("Una regi\u00f3n natural como la Amazon\u00eda.",False,"Las regiones naturales son divisiones geogr\u00e1ficas, no pol\u00edtico-administrativas.")],
            "Se eval\u00faa el concepto de municipio. Es la entidad territorial fundamental con alcalde y concejo. El error com\u00fan es confundirlo con una regi\u00f3n natural."),
        make_q("En la I.E. La Merced de Cali, los estudiantes analizan las diferencias entre las formas de organizaci\u00f3n territorial.",
            "Understand","Interpretaci\u00f3n y an\u00e1lisis de perspectivas",4,
            "\u00bfCu\u00e1l es la diferencia principal entre un corregimiento y una vereda?",
            [("El corregimiento tiene un centro poblado con escuela, iglesia y tiendas, mientras que la vereda es un conjunto de predios rurales dispersos.",True,"El corregimiento funciona como un peque\u00f1o centro de servicios para las veredas cercanas."),
             ("La vereda tiene alcalde y el corregimiento no.",False,"Ninguno tiene alcalde propio; ambos dependen del alcalde municipal."),
             ("El corregimiento solo existe en la costa Caribe.",False,"Los corregimientos existen en todo el territorio colombiano."),
             ("Son exactamente lo mismo, solo cambia el nombre.",False,"El corregimiento tiene un centro poblado, la vereda no.")],
            "Se eval\u00faa la comprensi\u00f3n de la diferencia entre vereda y corregimiento. El corregimiento tiene un centro poblado. El error com\u00fan es pensar que son equivalentes."),
        make_q("En la clase de la I.E. Jos\u00e9 Antonio Gal\u00e1n de Bucaramanga, los estudiantes conversan sobre la importancia del municipio.",
            "Understand","Interpretaci\u00f3n y an\u00e1lisis de perspectivas",4,
            "\u00bfPor qu\u00e9 el municipio es importante para los colombianos?",
            [("Porque en el municipio se gestionan servicios esenciales como agua, educaci\u00f3n y salud, los m\u00e1s cercanos a la comunidad.",True,"El municipio es la entidad m\u00e1s cercana al ciudadano."),
             ("Porque solo en los municipios grandes se puede votar.",False,"Se puede votar en todos los municipios."),
             ("Porque los municipios pueden declararse independientes.",False,"Los municipios no pueden independizarse."),
             ("Porque todos los municipios son iguales sin importar su tama\u00f1o.",False,"Aunque tienen la misma estructura, su presupuesto var\u00eda.")],
            "Se eval\u00faa la comprensi\u00f3n de la funci\u00f3n del municipio. Gestiona servicios b\u00e1sicos locales. El error com\u00fan es subestimar su importancia."),
        make_q("En el municipio de Sop\u00f3, Cundinamarca, la alcaldesa debe clasificar un nuevo asentamiento rural que ha crecido alrededor de una escuela y una tienda.",
            "Apply","Uso comprensivo del conocimiento social",4,
            "Este asentamiento rural con centro poblado deber\u00eda clasificarse como:",
            [("Corregimiento, porque tiene un centro poblado con escuela y comercio.",True,"Un centro poblado rural con servicios define al corregimiento."),
             ("Vereda, porque est\u00e1 en el \u00e1rea rural.",False,"Tiene un centro poblado que lo diferencia de una vereda."),
             ("Municipio, porque tiene escuela.",False,"El municipio requiere m\u00e1s poblaci\u00f3n y autoridades."),
             ("Departamento, porque tiene varias viviendas.",False,"El departamento agrupa muchos municipios.")],
            "Se eval\u00faa la aplicaci\u00f3n del concepto de corregimiento. El error com\u00fan es confundirlo con vereda."),
        make_q("En la I.E. T\u00e9cnica de Aguachica, Cesar, los habitantes de una vereda quieren solicitar la construcci\u00f3n de un acueducto.",
            "Apply","Pensamiento reflexivo y sist\u00e9mico",4,
            "\u00bfAnte qu\u00e9 autoridad deben presentar la solicitud los habitantes de la vereda?",
            [("Ante el alcalde del municipio, porque la vereda pertenece al municipio.",True,"La vereda es parte del municipio, se acude al alcalde."),
             ("Ante el gobernador del departamento directamente.",False,"El gobernador maneja asuntos departamentales."),
             ("Ante el Presidente de la Rep\u00fablica.",False,"El Presidente maneja asuntos nacionales."),
             ("Ante el congresista de su regi\u00f3n.",False,"Los congresistas hacen leyes.")],
            "Se eval\u00faa la aplicaci\u00f3n de la jerarqu\u00eda territorial. La vereda depende del municipio. El error com\u00fan es saltar a instancias superiores."),
        make_q("En clase de sociales, los estudiantes analizan un mapa de Colombia con sus divisiones territoriales.",
            "Analyze","Interpretaci\u00f3n y an\u00e1lisis de perspectivas",5,
            "\u00bfPor qu\u00e9 Colombia se organiza en departamentos y municipios en lugar de tener un solo gobierno central?",
            [("Porque la descentralizaci\u00f3n permite administrar mejor el pa\u00eds al acercar el gobierno a las necesidades de cada regi\u00f3n.",True,"La descentralizaci\u00f3n hace m\u00e1s eficiente la administraci\u00f3n."),
             ("Porque los departamentos son independientes y no obedecen al gobierno nacional.",False,"Los departamentos no son independientes."),
             ("Porque los municipios solo existen para cobrar impuestos.",False,"Los municipios tienen muchas funciones."),
             ("Porque es m\u00e1s f\u00e1cil controlar a la poblaci\u00f3n dividi\u00e9ndola.",False,"Busca eficiencia administrativa, no control.")],
            "Se eval\u00faa el an\u00e1lisis de las razones de la organizaci\u00f3n territorial. La descentralizaci\u00f3n mejora la administraci\u00f3n."),
        make_q("La profesora de sociales de la I.E. Francisco de Paula Santander de C\u00facuta compara un municipio grande (Cali) con uno peque\u00f1o (Mongu\u00ed, Boyac\u00e1).",
            "Analyze","Pensamiento reflexivo y sist\u00e9mico",5,
            "\u00bfCu\u00e1l afirmaci\u00f3n es correcta sobre ambos municipios?",
            [("Ambos tienen alcalde y concejo municipal, aunque el presupuesto y la poblaci\u00f3n sean diferentes.",True,"Todos los municipios tienen la misma estructura b\u00e1sica de gobierno."),
             ("Los municipios peque\u00f1os no tienen alcalde.",False,"Todos los municipios tienen alcalde."),
             ("Los municipios grandes no tienen concejo municipal.",False,"Todos los municipios tienen concejo."),
             ("Los municipios peque\u00f1os son en realidad corregimientos.",False,"Siguen siendo municipios con plenas facultades.")],
            "Se eval\u00faa el an\u00e1lisis comparativo. Todos los municipios comparten la misma estructura. El error es pensar que el tama\u00f1o modifica la estructura."),
        make_q("En la I.E. Jorge Eli\u00e9cer Gait\u00e1n de Villavicencio, los estudiantes eval\u00faan si una vereda debe convertirse en corregimiento.",
            "Evaluate","Pensamiento reflexivo y sist\u00e9mico",5,
            "\u00bfCu\u00e1l deber\u00eda ser el criterio m\u00e1s importante para decidir si una vereda se convierte en corregimiento?",
            [("Que la vereda tenga suficiente poblaci\u00f3n concentrada y servicios para formar un centro poblado organizado.",True,"La concentraci\u00f3n de poblaci\u00f3n y servicios es el criterio fundamental."),
             ("Que sea m\u00e1s f\u00e1cil cobrar impuestos.",False,"El bienestar de la comunidad debe primar."),
             ("Que el nombre del lugar suene mejor.",False,"El nombre es irrelevante."),
             ("Que el gobernador lo decida sin consultar a la gente.",False,"Debe consultarse a la comunidad.")],
            "Se eval\u00faa la capacidad de evaluar criterios para decisiones territoriales. Los criterios poblacionales son determinantes."),
        make_q("La profesora de la I.E. Normal Superior de Ubat\u00e9 pide a los estudiantes proponer una mejora para su vereda.",
            "Create","Pensamiento reflexivo y sist\u00e9mico",6,
            "Imagina que en tu vereda no hay escuela y los ni\u00f1os caminan dos horas para estudiar. \u00bfQu\u00e9 propondr\u00edas?",
            [("Organizar a la comunidad para gestionar ante la alcald\u00eda la construcci\u00f3n de una escuela veredal.",True,"La gesti\u00f3n comunitaria organizada es la mejor forma de lograr mejoras."),
             ("Pedir que los ni\u00f1os no estudien.",False,"La educaci\u00f3n es un derecho fundamental."),
             ("Cerrar la vereda y que todos se muden.",False,"Abandonar no resuelve el problema."),
             ("Esperar a que el gobierno nacional resuelva sin hacer nada.",False,"Se necesita participaci\u00f3n activa de la comunidad.")],
            "Se eval\u00faa la capacidad creativa para proponer soluciones comunitarias. La respuesta promueve la gesti\u00f3n organizada."),
    ]

def get_w09():
    return [
        make_q("En la clase de Sociales de la I.E. INEM de Pasto, la profesora explica el concepto de departamento.",
            "Remember","Uso comprensivo del conocimiento social",3,
            "Un departamento en Colombia es:",
            [("Una divisi\u00f3n territorial intermedia entre la naci\u00f3n y los municipios, con autoridades propias.",True,"El departamento tiene gobernador y asamblea departamental."),
             ("Un pa\u00eds independiente que forma parte de Colombia.",False,"Colombia es un solo pa\u00eds."),
             ("Una ciudad muy grande como Medell\u00edn.",False,"Una ciudad es una cabecera municipal."),
             ("Un tipo de municipio especial con m\u00e1s presupuesto.",False,"El departamento agrupa municipios.")],
            "Se eval\u00faa el concepto de departamento como unidad territorial intermedia. Tiene gobernador y asamblea."),
        make_q("La profesora de la I.E. San Pedro Claver de Popay\u00e1n pregunta cu\u00e1ntos departamentos conforman Colombia.",
            "Remember","Uso comprensivo del conocimiento social",3,
            "Colombia est\u00e1 conformada por:",
            [("32 departamentos y el Distrito Capital de Bogot\u00e1.",True,"Colombia tiene 32 departamentos m\u00e1s Bogot\u00e1 D.C."),
             ("25 departamentos y 10 distritos especiales.",False,"Esa cantidad es incorrecta."),
             ("30 departamentos y 3 territorios nacionales.",False,"No existen territorios nacionales."),
             ("35 departamentos iguales sin distrito capital.",False,"Bogot\u00e1 tiene estatus especial.")],
            "Se eval\u00faa el n\u00famero de departamentos. Colombia tiene 32 m\u00e1s Bogot\u00e1 D.C. El error es confundir la cantidad."),
        make_q("En la I.E. La Milagrosa de Ibagu\u00e9, los estudiantes reflexionan sobre la utilidad de los departamentos.",
            "Understand","Interpretaci\u00f3n y an\u00e1lisis de perspectivas",4,
            "\u00bfPara qu\u00e9 sirve dividir Colombia en departamentos?",
            [("Para organizar mejor la administraci\u00f3n del pa\u00eds, descentralizando funciones y acercando el gobierno a las regiones.",True,"La descentralizaci\u00f3n permite atender mejor las necesidades regionales."),
             ("Para que cada departamento pueda independizarse.",False,"Los departamentos no pueden independizarse."),
             ("Solo para facilitar los campeonatos de f\u00fatbol.",False,"Su funci\u00f3n va mucho m\u00e1s all\u00e1 del deporte."),
             ("Para que el presidente tenga menos trabajo.",False,"Busca eficiencia, no reducir trabajo.")],
            "Se eval\u00faa la comprensi\u00f3n de la funci\u00f3n de los departamentos. Organizan la administraci\u00f3n regional."),
        make_q("Los estudiantes de la I.E. Gabriela Mistral de Neiva investigan la estructura de su departamento.",
            "Understand","Interpretaci\u00f3n y an\u00e1lisis de perspectivas",4,
            "Cada departamento de Colombia cuenta con:",
            [("Un gobernador, una asamblea departamental y una capital.",True,"El gobernador ejecuta, la asamblea legisla."),
             ("Un alcalde y un concejo municipal.",False,"Esa es la estructura del municipio."),
             ("Un presidente y un congreso propios.",False,"El presidente y el Congreso son nacionales."),
             ("Un rey y una corte real.",False,"Colombia es una rep\u00fablica.")],
            "Se eval\u00faa la comprensi\u00f3n de las autoridades departamentales. El gobernador es la m\u00e1xima autoridad."),
        make_q("En la I.E. T\u00e9cnica de Honda, Tolima, los estudiantes ubican departamentos en el mapa de Colombia.",
            "Apply","Uso comprensivo del conocimiento social",4,
            "Si viajas desde Bogot\u00e1 (Cundinamarca) hacia el oriente, el primer departamento al que llegar\u00edas es:",
            [("Meta.",True,"El Meta limita al occidente con Cundinamarca."),
             ("Antioquia.",False,"Antioquia est\u00e1 al noroccidente."),
             ("Valle del Cauca.",False,"Est\u00e1 al suroccidente."),
             ("Atl\u00e1ntico.",False,"Est\u00e1 en la costa norte.")],
            "Se eval\u00faa la aplicaci\u00f3n del conocimiento geogr\u00e1fico. Al oriente de Cundinamarca est\u00e1 el Meta."),
        make_q("En la I.E. Alfonso L\u00f3pez Pumarejo de Valledupar, los estudiantes comparan la extensi\u00f3n de los departamentos.",
            "Apply","Pensamiento reflexivo y sist\u00e9mico",4,
            "\u00bfCu\u00e1l de estos departamentos es uno de los m\u00e1s extensos de Colombia?",
            [("Amazonas.",True,"Amazonas es uno de los departamentos m\u00e1s grandes."),
             ("Quind\u00edo.",False,"Quind\u00edo es uno de los m\u00e1s peque\u00f1os."),
             ("Caldas.",False,"Caldas es de tama\u00f1o mediano."),
             ("Atl\u00e1ntico.",False,"Atl\u00e1ntico es relativamente peque\u00f1o.")],
            "Se eval\u00faa el conocimiento sobre extensi\u00f3n territorial. Amazonas es de los m\u00e1s grandes."),
        make_q("En clase, los estudiantes analizan por qu\u00e9 San Andr\u00e9s y Providencia tiene un estatus especial.",
            "Analyze","Interpretaci\u00f3n y an\u00e1lisis de perspectivas",5,
            "San Andr\u00e9s y Providencia es un departamento especial porque:",
            [("Es el \u00fanico departamento insular de Colombia, con cultura raizal y ecosistemas marinos \u00fanicos.",True,"Es el \u00fanico departamento conformado por islas."),
             ("No tiene gobernador, solo un alcalde mayor.",False,"S\u00ed tiene gobernador."),
             ("Sus habitantes no son colombianos.",False,"Son colombianos de la comunidad raizal."),
             ("Es el departamento m\u00e1s grande del pa\u00eds.",False,"Es de los m\u00e1s peque\u00f1os.")],
            "Se eval\u00faa el an\u00e1lisis de las caracter\u00edsticas de los departamentos insulares."),
        make_q("La profesora de la I.E. Santa Luisa de Marillac de Tunja pregunta por qu\u00e9 algunos departamentos tienen m\u00e1s poblaci\u00f3n.",
            "Analyze","Pensamiento reflexivo y sist\u00e9mico",5,
            "\u00bfPor qu\u00e9 departamentos como Antioquia y Cundinamarca tienen m\u00e1s poblaci\u00f3n que Amazonas o Guain\u00eda?",
            [("Porque est\u00e1n en la regi\u00f3n Andina, con mejor clima, infraestructura y desarrollo econ\u00f3mico.",True,"La regi\u00f3n Andina concentra la mayor\u00eda de la poblaci\u00f3n."),
             ("Porque son los departamentos m\u00e1s antiguos.",False,"La antig\u00fcedad no es el factor principal."),
             ("Porque tienen las playas m\u00e1s hermosas.",False,"No tienen playa."),
             ("Porque el gobierno decidi\u00f3 que fueran m\u00e1s importantes.",False,"No fue una decisi\u00f3n arbitraria.")],
            "Se eval\u00faa el an\u00e1lisis de la distribuci\u00f3n poblacional. El desarrollo de la regi\u00f3n Andina explica la concentraci\u00f3n."),
        make_q("En la I.E. San Bartolom\u00e9 de Bogot\u00e1, los estudiantes eval\u00faan la posibilidad de crear un nuevo departamento.",
            "Evaluate","Pensamiento reflexivo y sist\u00e9mico",5,
            "\u00bfQu\u00e9 factores deber\u00edan considerarse antes de crear un nuevo departamento en Colombia?",
            [("La poblaci\u00f3n, la extensi\u00f3n territorial, la capacidad econ\u00f3mica y la voluntad de los habitantes.",True,"Se necesitan criterios objetivos y voluntad popular."),
             ("Solo el nombre que se le quiera poner.",False,"El nombre no es el factor principal."),
             ("Que tenga salida al mar obligatoriamente.",False,"No todos los departamentos tienen costa."),
             ("Que el gobernador sea amigo del presidente.",False,"Deben primar criterios objetivos.")],
            "Se eval\u00faa la capacidad de evaluar requisitos para crear un departamento."),
        make_q("La profesora de la I.E. Jos\u00e9 Mar\u00eda C\u00f3rdoba de Rionegro pide a los estudiantes proponer una mejora para la organizaci\u00f3n departamental.",
            "Create","Pensamiento reflexivo y sist\u00e9mico",6,
            "Imagina que eres gobernador de un departamento con municipios apartados sin buenas carreteras. \u00bfQu\u00e9 propondr\u00edas?",
            [("Dise\u00f1ar un plan de inversi\u00f3n en v\u00edas terciarias con recursos departamentales y apoyo de la naci\u00f3n.",True,"La inversi\u00f3n planificada en infraestructura vial es la soluci\u00f3n."),
             ("Ordenar que todos se muden a la capital departamental.",False,"No es viable ni deseable."),
             ("No hacer nada porque es problema del alcalde.",False,"El gobernador tiene responsabilidad."),
             ("Cerrar esos municipios.",False,"No se pueden cerrar municipios.")],
            "Se eval\u00faa la capacidad creativa para proponer soluciones de gobierno departamental."),
    ]


# ======== RUN ========
all_q = {"W08": get_w08(), "W09": get_w09()}

for week, tema, desc, intro in WEEKS:
    qs = all_q.get(week)
    if qs:
        build_bundle(week, tema, desc, qs, intro)
    else:
        print(f"Missing questions for {week}")

print("\nDone with W08-W09.")
