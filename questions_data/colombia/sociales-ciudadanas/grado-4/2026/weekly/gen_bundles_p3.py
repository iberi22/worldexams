#!/usr/bin/env python3
# Generator part 3: W13-W24 questions + run command
import os, re

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
R="Remember";U="Understand";A="Apply";AN="Analyze";E="Evaluate";C="Create"

# WEEKS METADATA
WEEKS = [
    ("W13","El Gobierno Nacional (presidente, ministros)","El Gobierno Nacional de Colombia: el presidente de la Rep\u00fablica, los ministros y sus funciones",
     "Este bundle examina el Gobierno Nacional de Colombia, encabezado por el Presidente de la Rep\u00fablica y conformado por los ministros del gabinete. Se exploran sus funciones, su elecci\u00f3n popular y la sede del gobierno en la Casa de Nari\u00f1o en Bogot\u00e1."),
    ("W14","Autoridades municipales (alcalde y concejo)","Autoridades del municipio colombiano: el alcalde y el concejo municipal, sus roles y funciones",
     "Este bundle se enfoca en las autoridades del municipio colombiano: el alcalde como jefe de la administraci\u00f3n local elegido por voto popular y el concejo municipal como corporaci\u00f3n administrativa de elecci\u00f3n popular."),
    ("W15","Autoridades departamentales (gobernador y asamblea)","Autoridades del departamento colombiano: el gobernador y la asamblea departamental",
     "Este bundle analiza las autoridades del departamento colombiano: el gobernador como representante del ejecutivo departamental elegido por voto popular y la asamblea departamental que expide ordenanzas."),
    ("W16","La descentralizaci\u00f3n en Colombia","La descentralizaci\u00f3n administrativa en Colombia: c\u00f3mo se distribuye el poder entre naci\u00f3n, departamento y municipio",
     "Este bundle explica el concepto de descentralizaci\u00f3n en Colombia, es decir, c\u00f3mo el poder y las funciones se distribuyen entre la naci\u00f3n, los departamentos y los municipios para una gesti\u00f3n m\u00e1s cercana al ciudadano."),
    ("W17","Repaso P3","Repaso del tercer per\u00edodo: gobierno nacional, autoridades municipales y departamentales, descentralizaci\u00f3n",
     "Este bundle de repaso integra los temas del tercer per\u00edodo: el Gobierno Nacional, las autoridades municipales y departamentales, y el principio de descentralizaci\u00f3n administrativa."),
    ("W18","Mecanismos de participaci\u00f3n (voto, plebiscito, referendo)","Mecanismos de participaci\u00f3n ciudadana en Colombia: el voto, el plebiscito y el referendo",
     "Este bundle aborda los mecanismos de participaci\u00f3n ciudadana establecidos en la Constituci\u00f3n colombiana de 1991: el voto, el plebiscito, el referendo, la consulta popular, el cabildo abierto y la iniciativa legislativa."),
    ("W19","El sufragio y la democracia","El sufragio como derecho y deber ciudadano, y su relaci\u00f3n con la democracia en Colombia",
     "Este bundle explora el sufragio como derecho fundamental y deber ciudadano en Colombia. Se analiza su relaci\u00f3n con la democracia representativa y participativa, y la importancia del voto libre y responsable."),
    ("W20","Repaso general","Repaso general del a\u00f1o escolar: conceptos fundamentales de sociales y ciudadanas",
     "Este bundle de repaso general integra los conceptos clave vistos hasta ahora: organizaci\u00f3n territorial, departamentos y capitales, gobierno nacional, autoridades locales y mecanismos de participaci\u00f3n ciudadana."),
    ("W21","Patrimonio cultural material de Colombia","El patrimonio cultural material colombiano: monumentos, sitios hist\u00f3ricos, museos y arquitectura",
     "Este bundle aborda el patrimonio cultural material de Colombia: los monumentos hist\u00f3ricos, sitios arqueol\u00f3gicos, museos, edificaciones coloniales, obras de arte y ciudades Patrimonio de la Humanidad que forman parte de la herencia tangible."),
    ("W22","Patrimonio cultural inmaterial (carnavales, fiestas)","El patrimonio cultural inmaterial de Colombia: carnavales, fiestas tradicionales, m\u00fasica y danzas",
     "Este bundle explora el patrimonio cultural inmaterial colombiano: carnavales como el de Barranquilla y Negros y Blancos de Pasto, fiestas patronales, m\u00fasica tradicional como el vallenato y la cumbia, y las danzas folcl\u00f3ricas."),
    ("W23","Grupos \u00e9tnicos: ind\u00edgenas colombianos","Los pueblos ind\u00edgenas de Colombia: diversidad cultural, territorios y costumbres",
     "Este bundle se centra en los pueblos ind\u00edgenas de Colombia, su diversidad cultural, territorios ancestrales (resguardos), cosmovisi\u00f3n, lenguas nativas y formas de organizaci\u00f3n social como los cabildos ind\u00edgenas."),
    ("W24","Grupos \u00e9tnicos: afrocolombianos y ROM","Comunidades afrocolombianas y del pueblo ROM (gitano) en Colombia: cultura y aportes",
     "Este bundle aborda las comunidades afrocolombianas y el pueblo ROM (gitano) en Colombia, sus aportes culturales, historia, tradiciones, territorios colectivos y su reconocimiento en la Constituci\u00f3n de 1991."),
]

# W13: Gobierno Nacional
W13 = [
    Q("En la I.E. INEM de Pasto explican el Gobierno Nacional.","Remember",R,3,
     "\u00bfQui\u00e9n es la m\u00e1xima autoridad del Gobierno Nacional en Colombia?",
     [OP("El Presidente de la Rep\u00fablica.",True,"El Presidente es el jefe del Gobierno Nacional."),OP("El alcalde.",False,"El alcalde es autoridad municipal."),OP("El gobernador.",False,"El gobernador es autoridad departamental."),OP("El senador.",False,"Los senadores son legisladores.")],
     "Concepto: el Presidente es la m\u00e1xima autoridad del Gobierno Nacional."),
    Q("La profesora explica qui\u00e9nes conforman el gabinete ministerial.","Remember",R,3,
     "Los ministros en Colombia son:",
     [OP("Los colaboradores del Presidente que dirigen cada ministerio.",True,"Los ministros son los jefes de cada cartera ministerial."),OP("Los alcaldes de las grandes ciudades.",False,"Los alcaldes son autoridades locales."),OP("Los representantes a la C\u00e1mara.",False,"Son legisladores."),OP("Los jueces de la Corte Suprema.",False,"Son parte de la rama judicial.")],
     "Concepto: los ministros dirigen los ministerios y colaboran con el Presidente."),
    QI("Los estudiantes analizan las funciones del Presidente.",U,4,
     "\u00bfCu\u00e1l de las siguientes es una funci\u00f3n del Presidente de Colombia?",
     [OP("Sancionar las leyes y dirigir las relaciones internacionales del pa\u00eds.",True,"El Presidente sanciona leyes y dirige la pol\u00edtica exterior."),OP("Juzgar a los delincuentes.",False,"Esa funci\u00f3n es de la rama judicial."),OP("Elegir a los alcaldes.",False,"Los alcaldes son elegidos por voto popular."),OP("Hacer las leyes.",False,"Hacer leyes es funci\u00f3n del Congreso.")],
     "Comprensi\u00f3n de las funciones del Presidente."),
    QI("Reflexionan sobre la importancia del gabinete ministerial.",U,4,
     "\u00bfPor qu\u00e9 el Presidente necesita ministros?",
     [OP("Porque cada ministro se especializa en un \u00e1rea como educaci\u00f3n, salud o defensa.",True,"Los ministros asesoran al Presidente en sus \u00e1reas espec\u00edficas."),OP("Porque el presidente no puede tomar decisiones solo.",False,"S\u00ed puede, pero los ministros lo asesoran."),OP("Porque los ministros son elegidos por el Congreso.",False,"Los nombra el Presidente."),OP("Porque los ministros son m\u00e1s importantes que el Presidente.",False,"El Presidente es la m\u00e1xima autoridad.")],
     "Comprensi\u00f3n del rol de los ministros en el gabinete."),
    Q("En un juego de roles, los estudiantes simulan ser ministros.","Apply",A,4,
     "Si fueras el Ministro de Educaci\u00f3n, \u00bfcu\u00e1l ser\u00eda tu principal responsabilidad?",
     [OP("Dise\u00f1ar pol\u00edticas educativas, supervisar la calidad y el acceso a la educaci\u00f3n.",True,"El Ministerio de Educaci\u00f3n se encarga de la pol\u00edtica educativa nacional."),OP("Construir carreteras y puentes.",False,"Eso es del Ministerio de Transporte."),OP("Administrar los hospitales.",False,"Es funci\u00f3n del Ministerio de Salud."),OP("Defender el pa\u00eds de amenazas externas.",False,"Eso es del Ministerio de Defensa.")],
     "Aplicaci\u00f3n del conocimiento de funciones ministeriales."),
    QR("Los estudiantes analizan el proceso de elecci\u00f3n presidencial.",A,4,
     "\u00bfC\u00f3mo se elige al Presidente de Colombia?",
     [OP("Por voto popular cada cuatro a\u00f1os.",True,"El Presidente se elige por votaci\u00f3n popular cada 4 a\u00f1os."),OP("Lo nombra el Congreso.",False,"El Congreso no nombra al Presidente."),OP("Lo elige la Corte Suprema.",False,"La Corte no elige al Presidente."),OP("Es heredado de padre a hijo.",False,"Colombia no es una monarqu\u00eda.")],
     "Aplicaci\u00f3n del conocimiento sobre elecci\u00f3n presidencial."),
    QI("Analizan la sede del Gobierno Nacional.",AN,5,
     "\u00bfD\u00f3nde se re\u00fane el Gobierno Nacional?",
     [OP("En la Casa de Nari\u00f1o, en Bogot\u00e1.",True,"La Casa de Nari\u00f1o es la sede del Gobierno Nacional."),OP("En el Palacio de Justicia.",False,"Esa es sede de la rama judicial."),OP("En el Capitolio Nacional.",False,"Esa es sede del Congreso."),OP("En cada capital departamental.",False,"La sede principal est\u00e1 en Bogot\u00e1.")],
     "An\u00e1lisis de las sedes del poder p\u00fablico en Colombia."),
    QR("Comparan los niveles de gobierno: nacional, departamental y municipal.",AN,5,
     "El Presidente y sus ministros conforman el gobierno de qu\u00e9 nivel?",
     [OP("Del nivel nacional.",True,"El Gobierno Nacional es del orden nacional."),OP("Del nivel departamental.",False,"Ese es el gobernador."),OP("Del nivel municipal.",False,"Ese es el alcalde."),OP("Del nivel regional.",False,"No existe ese nivel en Colombia.")],
     "An\u00e1lisis de los niveles de gobierno en Colombia."),
    QR("Eval\u00faan la importancia de tener un gobierno nacional centralizado.",E,5,
     "\u00bfPor qu\u00e9 es importante que el pa\u00eds tenga un Presidente y un gabinete nacional?",
     [OP("Para unificar las pol\u00edticas del pa\u00eds y representar a Colombia ante el mundo.",True,"El gobierno nacional unifica y representa al pa\u00eds."),OP("Porque sin presidente no habr\u00eda leyes.",False,"El Congreso tambi\u00e9n hace leyes."),OP("Porque los departamentos no pueden gobernarse solos.",False,"S\u00ed tienen autonom\u00eda limitada."),OP("Por tradici\u00f3n, pero no es necesario.",False,"Es necesario para la organizaci\u00f3n del Estado.")],
     "Evaluaci\u00f3n de la importancia del Gobierno Nacional."),
    QR("Proponen una nueva pol\u00edtica para el Ministerio de Ambiente.",C,6,
     "Si fueras Ministro de Ambiente, \u00bfqu\u00e9 medida propondr\u00edas para cuidar los r\u00edos de Colombia?",
     [OP("Crear un programa nacional de descontaminaci\u00f3n de r\u00edos con participaci\u00f3n de comunidades.",True,"Un programa participativo de descontaminaci\u00f3n es una soluci\u00f3n integral."),OP("Cerrar todas las f\u00e1bricas del pa\u00eds.",False,"Eso afectar\u00eda la econom\u00eda."),OP("Multar a todas las personas que tiren basura.",False,"No ataca el problema de fondo."),OP("No hacer nada, que los alcaldes resuelvan.",False,"El Ministerio de Ambiente tiene responsabilidad nacional.")],
     "Creatividad en pol\u00edticas p\u00fablicas ambientales."),
]

print("W13 loaded. Continuing...")

# W14: Autoridades municipales
W14 = [
    Q("En la I.E. San Jos\u00e9 de Sincelejo explican las autoridades del municipio.","Remember",R,3,
     "\u00bfQui\u00e9n es la m\u00e1xima autoridad del municipio colombiano?",
     [OP("El alcalde.",True,"El alcalde es la m\u00e1xima autoridad municipal."),OP("El gobernador.",False,"El gobernador es autoridad departamental."),OP("El presidente.",False,"El presidente es autoridad nacional."),OP("El concejal.",False,"Los concejales integran el concejo municipal.")],
     "Concepto: el alcalde es la m\u00e1xima autoridad del municipio."),
    Q("Preguntan sobre el concejo municipal.","Remember",R,3,
     "\u00bfQu\u00e9 es el concejo municipal?",
     [OP("Una corporaci\u00f3n de elecci\u00f3n popular que expide acuerdos y controla al alcalde.",True,"El concejo es el \u00f3rgano legislativo del municipio."),OP("Un grupo de amigos del alcalde.",False,"Es un organismo oficial elegido por el pueblo."),OP("Una oficina del gobierno nacional en el municipio.",False,"Es una autoridad municipal."),OP("Un tribunal de justicia.",False,"La justicia es otra rama.")],
     "Concepto: el concejo municipal expide acuerdos y controla al alcalde."),
    QI("Analizan las funciones del alcalde.",U,4,
     "\u00bfCu\u00e1l de las siguientes es funci\u00f3n del alcalde?",
     [OP("Administrar los recursos del municipio y garantizar los servicios p\u00fablicos.",True,"El alcalde es el administrador del municipio."),OP("Hacer las leyes nacionales.",False,"Eso es funci\u00f3n del Congreso."),OP("Juzgar a los infractores.",False,"Eso es funci\u00f3n de los jueces."),OP("Declarar la guerra.",False,"Eso es funci\u00f3n del Presidente.")],
     "Comprensi\u00f3n de las funciones del alcalde."),
    QI("Reflexionan sobre la funci\u00f3n del concejo.",U,4,
     "Para qu\u00e9 sirve el concejo municipal?",
     [OP("Para expedir acuerdos municipales y hacer control pol\u00edtico al alcalde.",True,"El concejo legisla a nivel local y controla al ejecutivo municipal."),OP("Para elegir al Presidente.",False,"El Presidente se elige por voto popular."),OP("Para administrar los hospitales.",False,"Eso es funci\u00f3n del alcalde."),OP("Para juzgar delitos menores.",False,"Eso es funci\u00f3n de los jueces.")],
     "Comprensi\u00f3n de la funci\u00f3n legislativa y de control del concejo."),
    Q("Simulan una reuni\u00f3n del concejo municipal.","Apply",A,4,
     "Si el concejo municipal quiere mejorar el alumbrado p\u00fablico, \u00bfqu\u00e9 debe hacer?",
     [OP("Expedir un acuerdo municipal que autorice el gasto y el alcalde lo ejecuta.",True,"El concejo expide acuerdos y el alcalde ejecuta."),OP("Pedirle al Presidente que env\u00ede dinero.",False,"Eso es asunto local."),OP("Que los vecinos paguen directamente.",False,"Debe haber un proceso legal."),OP("Cobrar una multa a todos.",False,"No es correcto.")],
     "Aplicaci\u00f3n del proceso legislativo municipal."),
    QR("Analizan c\u00f3mo se elige al alcalde.",A,4,
     "\u00bfC\u00f3mo se elige al alcalde de un municipio colombiano?",
     [OP("Por voto popular cada cuatro a\u00f1os.",True,"El alcalde se elige por votaci\u00f3n popular."),OP("Lo nombra el gobernador.",False,"El gobernador no nombra alcaldes."),OP("Lo elige el concejo municipal.",False,"Lo elige el pueblo."),OP("Lo nombra el Presidente.",False,"El Presidente no nombra alcaldes.")],
     "Aplicaci\u00f3n del conocimiento sobre elecci\u00f3n de alcaldes."),
    QI("Analizan la relaci\u00f3n entre alcalde y concejo.",AN,5,
     "\u00bfQu\u00e9 relaci\u00f3n existe entre el alcalde y el concejo municipal?",
     [OP("El alcalde ejecuta y el concejo controla y expide normas; ambos se necesitan.",True,"Hay una relaci\u00f3n de colaboraci\u00f3n y control mutuo."),OP("El alcalde le obedece al concejo.",False,"El alcalde tiene autonom\u00eda en sus funciones ejecutivas."),OP("El concejo le obedece al alcalde.",False,"El concejo es independiente."),OP("No tienen ninguna relaci\u00f3n.",False,"S\u00ed tienen relaci\u00f3n institucional.")],
     "An\u00e1lisis de la relaci\u00f3n entre ejecutivo y legislativo municipal."),
    QR("Comparan autoridades municipales con las departamentales.",AN,5,
     "El alcalde es al municipio lo que el gobernador es al departamento. \u00bfEn qu\u00e9 se parecen?",
     [OP("Ambos son jefes del ejecutivo en su territorio y son elegidos por voto popular.",True,"Ambos son autoridades ejecutivas elegidas popularmente."),OP("Ambos hacen leyes nacionales.",False,"No hacen leyes nacionales."),OP("Ambos son jueces.",False,"No son jueces."),OP("Ambos son elegidos por el Presidente.",False,"Ninguno es elegido por el Presidente.")],
     "An\u00e1lisis comparativo de autoridades locales."),
    QR("Eval\u00faan la importancia del concejo municipal.",E,5,
     "\u00bfPor qu\u00e9 es importante que exista un concejo municipal adem\u00e1s del alcalde?",
     [OP("Para que haya equilibrio de poderes y control sobre las decisiones del alcalde.",True,"El concejo equilibra el poder del alcalde."),OP("Porque el alcalde no puede trabajar solo.",False,"S\u00ed puede, pero el control es importante."),OP("Para que haya m\u00e1s empleados municipales.",False,"No es el prop\u00f3sito."),OP("Por tradici\u00f3n, pero no es necesario.",False,"Es necesario para la democracia local.")],
     "Evaluaci\u00f3n de la importancia del equilibrio de poderes local."),
    QR("Proponen una soluci\u00f3n para un problema del municipio.",C,6,
     "Si fueras concejal y el parque principal est\u00e1 abandonado, \u00bfqu\u00e9 propondr\u00edas?",
     [OP("Presentar un proyecto de acuerdo para recuperar el parque con presupuesto municipal.",True,"El concejal puede proponer proyectos de acuerdo."),OP("Cerrar el parque para siempre.",False,"Eso no soluciona el problema."),OP("Pedir que los vecinos pagan la reparaci\u00f3n.",False,"El presupuesto municipal debe cubrirlo."),OP("No hacer nada, no es mi problema.",False,"El concejal debe representar a la comunidad.")],
     "Creatividad en la gesti\u00f3n de problemas municipales."),
]

# W15: Autoridades departamentales
W15 = [
    Q("Explican las autoridades del departamento en la I.E. La Milagrosa de Ibagu\u00e9.","Remember",R,3,
     "\u00bfQui\u00e9n es la m\u00e1xima autoridad del departamento colombiano?",
     [OP("El gobernador.",True,"El gobernador es la m\u00e1xima autoridad departamental."),OP("El alcalde.",False,"El alcalde es autoridad municipal."),OP("El presidente.",False,"El presidente es autoridad nacional."),OP("El diputado.",False,"Los diputados integran la asamblea departamental.")],
     "Concepto: el gobernador es la m\u00e1xima autoridad del departamento."),
    Q("Preguntan sobre la asamblea departamental.","Remember",R,3,
     "\u00bfQu\u00e9 es la asamblea departamental?",
     [OP("Una corporaci\u00f3n de elecci\u00f3n popular que expide ordenanzas para el departamento.",True,"La asamblea es el \u00f3rgano legislativo departamental."),OP("Un grupo de alcaldes del departamento.",False,"No, son diputados elegidos por el pueblo."),OP("Una oficina del gobierno nacional.",False,"Es una autoridad departamental."),OP("Un tribunal de justicia regional.",False,"Es un \u00f3rgano administrativo.")],
     "Concepto: la asamblea departamental expide ordenanzas."),
    QI("Analizan las funciones del gobernador.",U,4,
     "\u00bfCu\u00e1l es funci\u00f3n del gobernador?",
     [OP("Administrar el departamento, ejecutar pol\u00edticas y representar al departamento.",True,"El gobernador es el administrador departamental."),OP("Hacer las leyes nacionales.",False,"Eso es funci\u00f3n del Congreso."),OP("Administrar el municipio.",False,"Eso es funci\u00f3n del alcalde."),OP("Elegir a los alcaldes.",False,"Los alcaldes son elegidos por el pueblo.")],
     "Comprensi\u00f3n de las funciones del gobernador."),
    QI("Reflexionan sobre la asamblea departamental.",U,4,
     "\u00bfPara qu\u00e9 sirve la asamblea departamental?",
     [OP("Para expedir ordenanzas departamentales y hacer control pol\u00edtico al gobernador.",True,"La asamblea legisla y controla al ejecutivo departamental."),OP("Para elegir al Presidente.",False,"El Presidente se elige por voto popular."),OP("Para juzgar delitos graves.",False,"Eso es de la rama judicial."),OP("Para administrar las escuelas del municipio.",False,"Eso es municipal.")],
     "Comprensi\u00f3n de las funciones de la asamblea departamental."),
    Q("Simulan una sesi\u00f3n de la asamblea departamental.","Apply",A,4,
     "Si la asamblea quiere mejorar las v\u00edas departamentales, \u00bfqu\u00e9 debe hacer?",
     [OP("Expedir una ordenanza que asigne presupuesto para el mantenimiento vial.",True,"La asamblea expide ordenanzas de presupuesto."),OP("Pedirle al alcalde que lo haga.",False,"El alcalde es municipal."),OP("Que el Presidente env\u00ede dinero directamente.",False,"Debe haber un proceso legal."),OP("Cobrar un peaje a los conductores.",False,"No es tan simple.")],
     "Aplicaci\u00f3n del proceso legislativo departamental."),
    QR("Analizan c\u00f3mo se elige al gobernador.",A,4,
     "\u00bfC\u00f3mo se elige al gobernador en Colombia?",
     [OP("Por voto popular cada cuatro a\u00f1os.",True,"El gobernador se elige por votaci\u00f3n popular."),OP("Lo nombra el Presidente.",False,"El Presidente no nombra gobernadores."),OP("Lo elige la asamblea departamental.",False,"Lo elige el pueblo."),OP("Lo nombra el alcalde de la capital.",False,"Eso no es correcto.")],
     "Aplicaci\u00f3n del conocimiento sobre elecci\u00f3n de gobernadores."),
    QI("Analizan la relaci\u00f3n entre gobernador y asamblea.",AN,5,
     "\u00bfQu\u00e9 relaci\u00f3n existe entre el gobernador y la asamblea departamental?",
     [OP("El gobernador ejecuta y la asamblea controla y expide ordenanzas.",True,"Hay equilibrio de poderes a nivel departamental."),OP("El gobernador le obedece a la asamblea.",False,"Cada uno tiene sus funciones."),OP("La asamblea le obedece al gobernador.",False,"La asamblea es independiente."),OP("No tienen ninguna relaci\u00f3n.",False,"Tienen relaci\u00f3n institucional.")],
     "An\u00e1lisis del equilibrio de poderes departamental."),
    QR("Comparan autoridades departamentales con las nacionales.",AN,5,
     "\u00bfEn qu\u00e9 se parece la relaci\u00f3n gobernador-asamblea a la relaci\u00f3n presidente-congreso?",
     [OP("Ambos son relaciones entre ejecutivo y legislativo, pero en diferentes niveles.",True,"La estructura es similar pero a diferente escala."),OP("Son exactamente iguales.",False,"Tienen diferencias de alcance."),OP("No se parecen en nada.",False,"S\u00ed se parecen en su estructura."),OP("El gobernador tiene m\u00e1s poder que el presidente.",False,"El presidente tiene m\u00e1s poder.")],
     "An\u00e1lisis comparativo de niveles de gobierno."),
    QR("Eval\u00faan la importancia de la asamblea departamental.",E,5,
     "\u00bfPor qu\u00e9 es importante la asamblea departamental?",
     [OP("Porque representa a los ciudadanos del departamento y controla al gobernador.",True,"La asamblea es el contrapeso del gobernador."),OP("Porque es la \u00fanica autoridad del departamento.",False,"El gobernador tambi\u00e9n es autoridad."),OP("Porque puede destituir al Presidente.",False,"No tiene esa facultad."),OP("Porque administra los municipios.",False,"Cada municipio tiene su alcalde.")],
     "Evaluaci\u00f3n de la importancia de la asamblea departamental."),
    QR("Proponen una ordenanza para el departamento.",C,6,
     "Si fueras diputado de la asamblea, \u00bfqu\u00e9 ordenanza pro