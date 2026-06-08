#!/usr/bin/env python3
"""Generate W13-W16 bundles SOCIALES CIUDADANAS Colombia G4."""
import os, re
OUT = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-4\2026\weekly"
def slug(s):
    s = s.lower().strip().replace(" ","-")
    for k,v in {"\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00fc":"u","\u00f1":"n"}.items(): s = s.replace(k,v)
    return re.sub(r'[^a-z0-9\-]', '', s)
def label(n): return chr(65+n)
def make_q(ctx, bloom, icfes, d, stem, opts, exp):
    return {"ctx":ctx,"bloom":bloom,"icfes":icfes,"d":d,"stem":stem,"opts":opts,"exp":exp}
def build(week, tema, desc, qlist, intro):
    tema_slug = slug(tema)
    bid = f"COL-SOC-CIU-4-2026-{week}-{tema_slug}-001-MASTERY"
    fname = f"{bid}-bundle.md"
    fp = os.path.join(OUT, fname)
    L = ["---"]
    L.append(f'id: "{bid}"'); L.append('country: "colombia"')
    L.append('grado: 4'); L.append('asignatura: "sociales-ciudadanas"')
    L.append(f'tema: "{tema_slug}"'); L.append(f'periodo: "{week}"')
    L.append('protocol_version: "5.2"'); L.append('bundle_index: 1')
    L.append('bundle_size: 10')
    L.append('alignment: "DBA MEN + Est\u00e1ndares B\u00e1sicos"')
    L.append('modern_context: true'); L.append('distractor_profile: "plausible_peer_set"')
    L.append('calibration:')
    L.append('  expected_success_rate: 0.75')
    L.append('  discrimination_index_target: ">= 0.22"')
    L.append('  simulated_responses: 100')
    L.append(f'rubric_baseline: "{desc}"')
    L.append("---\n"); L.append(f"# Bundle Mastery: {tema}\n")
    L.append(intro); L.append("")
    for i, q in enumerate(qlist):
        L.append("---\n"); L.append(f"## Question {i+1} [D{q['d']}]\n")
        L.append(f"**ID:** `{bid}-v{i+1}`"); L.append(f"**Bloom:** [{q['bloom']}]"); L.append(f"**ICFES:** [{q['icfes']}]")
        L.append(f"**Context:** {q['ctx']}\n"); L.append("### Enunciado"); L.append(q['stem']); L.append("")
        L.append("### Options\n")
        opts = list(q['opts']); cp = i % 4
        if opts[cp][1] != True:
            for ix, (_, ok, _) in enumerate(opts):
                if ok: opts[cp], opts[ix] = opts[ix], opts[cp]; break
        for ix, (ot, ok, fb) in enumerate(opts):
            L.append(f"- {'[x]' if ok else '[ ]'} {label(ix)}) {ot} <!-- feedback: {fb} -->")
        L.append(""); L.append("### Explicaci\u00f3n Pedag\u00f3gica"); L.append(q['exp']); L.append("")
    L.append("---\n"); L.append("### Explicaci\u00f3n Pedag\u00f3gica Final")
    L.append(f"Este bundle de Ciencias Sociales y Ciudadanas para grado cuarto, {week}, aborda el tema de {tema} desde una perspectiva colombiana.")
    with open(fp, "w", encoding="utf-8") as fh: fh.write("\n".join(L))
    print(f"  OK {fname}")

R="Remember";U="Understand";A="Apply";AN="Analyze";E="Evaluate";C="Create"
BLOOMS = [R,R,U,U,A,A,AN,AN,E,C]
ICFES = {"U":"Uso comprensivo del conocimiento social","I":"Interpretaci\u00f3n y an\u00e1lisis de perspectivas","R":"Pensamiento reflexivo y sist\u00e9mico"}
def OP(t,ok,fb): return (t,ok,fb)
def tc(ctx, icode, d, stem, opts):
    return (ctx, icode, d, stem, opts)

def gen_w(week, tema, desc, intro, qdata):
    qs = []
    for i, (ctx, icode, d, stem, opts) in enumerate(qdata):
        bloom = BLOOMS[i]
        qs.append(make_q(ctx, bloom, ICFES[icode], d, stem, opts, f"Se eval\u00faa [{bloom}]."))
    build(week, tema, desc, qs, intro)

# ===== W13: Gobierno Nacional =====
gen_w("W13", "El Gobierno Nacional (presidente, ministros)",
    "El Gobierno Nacional colombiano: presidente y ministros",
    "Este bundle explica el Gobierno Nacional de Colombia, encabezado por el Presidente de la Rep\u00fablica y conformado por los ministros del gabinete.",
    [
    tc("En la I.E. INEM de Pasto explican el Gobierno Nacional.","U",3,"\u00bfQui\u00e9n es la m\u00e1xima autoridad del Gobierno Nacional?",[OP("El Presidente de la Rep\u00fablica.",True,"El Presidente es el jefe de Estado y de Gobierno."),OP("El alcalde.",False,"Autoridad municipal."),OP("El gobernador.",False,"Autoridad departamental."),OP("El senador.",False,"Los senadores son legisladores.")]),
    tc("Explican el gabinete ministerial.","U",3,"Los ministros en Colombia son:",[OP("Los colaboradores del Presidente que dirigen cada ministerio.",True,"Los ministros son jefes de cada cartera."),OP("Los alcaldes de las grandes ciudades.",False,"Autoridades locales."),OP("Los representantes a la C\u00e1mara.",False,"Son legisladores."),OP("Los jueces de la Corte Suprema.",False,"Son de la rama judicial.")]),
    tc("Analizan las funciones del Presidente.","I",4,"\u00bfCu\u00e1l es una funci\u00f3n del Presidente de Colombia?",[OP("Sancionar las leyes y dirigir las relaciones internacionales.",True,"El Presidente sanciona leyes y dirige pol\u00edtica exterior."),OP("Juzgar a los delincuentes.",False,"Funci\u00f3n de la rama judicial."),OP("Elegir a los alcaldes.",False,"Los alcaldes son elegidos por voto popular."),OP("Hacer las leyes.",False,"Funci\u00f3n del Congreso.")]),
    tc("Reflexionan sobre el gabinete.","I",4,"\u00bfPor qu\u00e9 el Presidente necesita ministros?",[OP("Porque cada ministro se especializa en un \u00e1rea como educaci\u00f3n, salud o defensa.",True,"Los ministros asesoran en \u00e1reas espec\u00edficas."),OP("Porque no puede decidir solo.",False,"S\u00ed puede, pero los ministros lo asesoran."),OP("Porque son elegidos por el Congreso.",False,"Los nombra el Presidente."),OP("Porque son m\u00e1s importantes.",False,"El Presidente es la m\u00e1xima autoridad.")]),
    tc("Simulan roles de ministros.","U",4,"Si fueras Ministro de Educaci\u00f3n, \u00bfcu\u00e1l ser\u00eda tu responsabilidad?",[OP("Dise\u00f1ar pol\u00edticas educativas y supervisar la calidad de la educaci\u00f3n.",True,"El Ministerio de Educaci\u00f3n maneja la pol\u00edtica educativa."),OP("Construir carreteras.",False,"Eso es del Ministerio de Transporte."),OP("Administrar hospitales.",False,"Del Ministerio de Salud."),OP("Defender el pa\u00eds.",False,"Del Ministerio de Defensa.")]),
    tc("Analizan elecci\u00f3n presidencial.","R",4,"\u00bfC\u00f3mo se elige al Presidente de Colombia?",[OP("Por voto popular cada cuatro a\u00f1os.",True,"El Presidente se elige por votaci\u00f3n popular."),OP("Lo nombra el Congreso.",False,"El Congreso no nombra al Presidente."),OP("Lo elige la Corte Suprema.",False,"No."),OP("Es heredado.",False,"Colombia no es monarqu\u00eda.")]),
    tc("Analizan sede del Gobierno.","I",5,"\u00bfD\u00f3nde se re\u00fane el Gobierno Nacional?",[OP("En la Casa de Nari\u00f1o, en Bogot\u00e1.",True,"La Casa de Nari\u00f1o es la sede del Ejecutivo."),OP("En el Palacio de Justicia.",False,"Sede de la rama judicial."),OP("En el Capitolio Nacional.",False,"Sede del Congreso."),OP("En cada capital departamental.",False,"La sede principal est\u00e1 en Bogot\u00e1.")]),
    tc("Comparan niveles de gobierno.","R",5,"El Presidente es del nivel:",[OP("Nacional.",True,"El Presidente es la m\u00e1xima autoridad nacional."),OP("Departamental.",False,"Ese es el gobernador."),OP("Municipal.",False,"Ese es el alcalde."),OP("Regional.",False,"No existe ese nivel.")]),
    tc("Eval\u00faan la importancia del gobierno nacional.","I",5,"\u00bfPor qu\u00e9 es importante tener un gobierno nacional?",[OP("Para unificar pol\u00edticas y representar a Colombia en el mundo.",True,"Unifica y representa al pa\u00eds."),OP("Sin \u00e9l no habr\u00eda leyes.",False,"El Congreso tambi\u00e9n hace leyes."),OP("Los departamentos no pueden gobernarse.",False,"Tienen autonom\u00eda."),OP("Es tradici\u00f3n pero no necesario.",False,"Es necesario.")]),
    tc("Proponen pol\u00edtica ambiental.","R",6,"Si fueras Ministro de Ambiente, \u00bfqu\u00e9 propondr\u00edas para los r\u00edos?",[OP("Programa nacional de descontaminaci\u00f3n con participaci\u00f3n comunitaria.",True,"Un programa participativo es soluci\u00f3n integral."),OP("Cerrar todas las f\u00e1bricas.",False,"Afecta la econom\u00eda."),OP("Multar a todos.",False,"No ataca el fondo."),OP("No hacer nada.",False,"El Ministerio tiene responsabilidad.")]),
    ])

# ===== W14: Autoridades municipales =====
gen_w("W14", "Autoridades municipales (alcalde y concejo)",
    "Autoridades del municipio colombiano: el alcalde y el concejo municipal",
    "Este bundle se enfoca en las autoridades del municipio colombiano: el alcalde como jefe de la administraci\u00f3n local y el concejo municipal como corporaci\u00f3n administrativa.",
    [
    tc("En Sincelejo explican autoridades municipales.","U",3,"\u00bfQui\u00e9n es la m\u00e1xima autoridad del municipio?",[OP("El alcalde.",True,"El alcalde es la m\u00e1xima autoridad municipal."),OP("El gobernador.",False,"Autoridad departamental."),OP("El presidente.",False,"Autoridad nacional."),OP("El concejal.",False,"Los concejales integran el concejo.")]),
    tc("Preguntan sobre el concejo municipal.","U",3,"\u00bfQu\u00e9 es el concejo municipal?",[OP("Corporaci\u00f3n de elecci\u00f3n popular que expide acuerdos.",True,"El concejo legisla y controla al alcalde."),OP("Un grupo de amigos del alcalde.",False,"Es oficial."),OP("Oficina del gobierno nacional.",False,"Es municipal."),OP("Tribunal de justicia.",False,"Rama judicial.")]),
    tc("Analizan funciones del alcalde.","I",4,"\u00bfCu\u00e1l es funci\u00f3n del alcalde?",[OP("Administrar recursos y garantizar servicios p\u00fablicos.",True,"El alcalde es administrador del municipio."),OP("Hacer leyes nacionales.",False,"Funci\u00f3n del Congreso."),OP("Juzgar infractores.",False,"Funci\u00f3n de jueces."),OP("Declarar la guerra.",False,"Funci\u00f3n del Presidente.")]),
    tc("Reflexionan sobre el concejo.","I",4,"\u00bfPara qu\u00e9 sirve el concejo municipal?",[OP("Expedir acuerdos y hacer control pol\u00edtico al alcalde.",True,"El concejo legisla y controla localmente."),OP("Elegir al Presidente.",False,"Es nacional."),OP("Administrar hospitales.",False,"Funci\u00f3n del alcalde."),OP("Juzgar delitos.",False,"Funci\u00f3n judicial.")]),
    tc("Simulan reuni\u00f3n del concejo.","U",4,"Si el concejo quiere mejorar alumbrado p\u00fablico:",[OP("Expedir acuerdo que autorice gasto y el alcalde lo ejecuta.",True,"El concejo expide acuerdos, el alcalde ejecuta."),OP("Pedirle al Presidente.",False,"Asunto local."),OP("Que vecinos paguen.",False,"Debe haber proceso legal."),OP("Cobrar multa.",False,"No.")]),
    tc("Analizan elecci\u00f3n del alcalde.","R",4,"\u00bfC\u00f3mo se elige al alcalde?",[OP("Por voto popular cada cuatro a\u00f1os.",True,"El alcalde se elige por votaci\u00f3n popular."),OP("Lo nombra el gobernador.",False,"El gobernador no nombra alcaldes."),OP("Lo elige el concejo.",False,"Lo elige el pueblo."),OP("Lo nombra el Presidente.",False,"No.")]),
    tc("Analizan relaci\u00f3n alcalde-concejo.","I",5,"\u00bfQu\u00e9 relaci\u00f3n existe entre alcalde y concejo?",[OP("El alcalde ejecuta y el concejo controla y expide normas.",True,"Hay equilibrio de poderes local."),OP("El alcalde obedece al concejo.",False,"Cada uno tiene sus funciones."),OP("El concejo obedece al alcalde.",False,"Es independiente."),OP("No tienen relaci\u00f3n.",False,"S\u00ed tienen.")]),
    tc("Comparan autoridades locales.","R",5,"\u00bfEn qu\u00e9 se parecen alcalde y gobernador?",[OP("Ambos son jefes del ejecutivo elegidos por voto popular.",True,"Ambos son autoridades ejecutivas electas."),OP("Ambos hacen leyes nacionales.",False,"No."),OP("Ambos son jueces.",False,"No."),OP("Ambos los nombra el Presidente.",False,"No.")]),
    tc("Eval\u00faan importancia del concejo.","I",5,"\u00bfPor qu\u00e9 es importante el concejo municipal?",[OP("Para equilibrar el poder del alcalde y representar a la comunidad.",True,"El concejo es contrapeso del alcalde."),OP("El alcalde no puede solo.",False,"S\u00ed puede, pero el control es importante."),OP("Para m\u00e1s empleados.",False,"No es el prop\u00f3sito."),OP("Tradici\u00f3n innecesaria.",False,"Es necesario.")]),
    tc("Proponen soluci\u00f3n municipal.","R",6,"Si fueras concejal y el parque est\u00e1 abandonado, \u00bfqu\u00e9 haces?",[OP("Presentar proyecto de acuerdo para recuperarlo con presupuesto.",True,"Propuesta legislativa es la v\u00eda correcta."),OP("Cerrar el parque.",False,"No soluciona."),OP("Que los vecinos paguen.",False,"Presupuesto debe cubrirlo."),OP("No hacer nada.",False,"Debe representar a la comunidad.")]),
    ])

# ===== W15: Autoridades departamentales =====
gen_w("W15", "Autoridades departamentales (gobernador y asamblea)",
    "Autoridades del departamento colombiano: el gobernador y la asamblea departamental",
    "Este bundle analiza las autoridades del departamento colombiano: el gobernador como jefe del ejecutivo departamental y la asamblea departamental que expide ordenanzas.",
    [
    tc("En Ibagu\u00e9 explican autoridades departamentales.","U",3,"\u00bfQui\u00e9n es la m\u00e1xima autoridad del departamento?",[OP("El gobernador.",True,"El gobernador es la m\u00e1xima autoridad departamental."),OP("El alcalde.",False,"Autoridad municipal."),OP("El presidente.",False,"Autoridad nacional."),OP("El diputado.",False,"Integra la asamblea departamental.")]),
    tc("Preguntan sobre la asamblea departamental.","U",3,"\u00bfQu\u00e9 es la asamblea departamental?",[OP("Corporaci\u00f3n de elecci\u00f3n popular que expide ordenanzas.",True,"La asamblea es el legislativo departamental."),OP("Grupo de alcaldes.",False,"Son diputados."),OP("Oficina del gobierno nacional.",False,"Es departamental."),OP("Tribunal regional.",False,"Es administrativa.")]),
    tc("Analizan funciones del gobernador.","I",4,"\u00bfCu\u00e1l es funci\u00f3n del gobernador?",[OP("Administrar el departamento y ejecutar pol\u00edticas.",True,"El gobernador administra el departamento."),OP("Hacer leyes nacionales.",False,"Funci\u00f3n del Congreso."),OP("Administrar el municipio.",False,"Funci\u00f3n del alcalde."),OP("Elegir alcaldes.",False,"Los alcaldes son elegidos por el pueblo.")]),
    tc("Reflexionan sobre asamblea.","I",4,"\u00bfPara qu\u00e9 sirve la asamblea departamental?",[OP("Expedir ordenanzas y controlar al gobernador.",True,"La asamblea legisla y controla el ejecutivo departamental."),OP("Elegir al Presidente.",False,"Es nacional."),OP("Juzgar delitos.",False,"Rama judicial."),OP("Administrar escuelas municipales.",False,"Eso es municipal.")]),
    tc("Simulan sesi\u00f3n de asamblea.","U",4,"Si la asamblea quiere mejorar v\u00edas departamentales:",[OP("Expedir ordenanza que asigne presupuesto.",True,"La asamblea expide ordenanzas de presupuesto."),OP("Pedir al alcalde.",False,"Alcalde es municipal."),OP("Que el Presidente env\u00ede dinero.",False,"Debe haber proceso legal."),OP("Cobrar peaje.",False,"No es tan simple.")]),
    tc("Analizan elecci\u00f3n del gobernador.","R",4,"\u00bfC\u00f3mo se elige al gobernador?",[OP("Por voto popular cada cuatro a\u00f1os.",True,"El gobernador se elige por voto popular."),OP("Lo nombra el Presidente.",False,"El Presidente no nombra gobernadores."),OP("Lo elige la asamblea.",False,"Lo elige el pueblo."),OP("Lo nombra el alcalde.",False,"No.")]),
    tc("Analizan relaci\u00f3n gobernador-asamblea.","I",5,"Relaci\u00f3n entre gobernador y asamblea:",[OP("El gobernador ejecuta y la asamblea controla.",True,"Hay equilibrio de poderes departamental."),OP("El gobernador obedece a la asamblea.",False,"Cada uno tiene sus funciones."),OP("La asamblea obedece al gobernador.",False,"Es independiente."),OP("Sin relaci\u00f3n.",False,"Tienen relaci\u00f3n institucional.")]),
    tc("Comparan niveles de gobierno.","R",5,"\u00bfEn qu\u00e9 se parece gobernador-asamblea a presidente-congreso?",[OP("Ambos son relaci\u00f3n ejecutivo-legislativo a diferente escala.",True,"La estructura es similar en diferentes niveles."),OP("Son exactamente iguales.",False,"Diferencias de alcance."),OP("No se parecen.",False,"S\u00ed."),OP("Gobernador tiene m\u00e1s poder.",False,"Presidente tiene m\u00e1s poder.")]),
    tc("Eval\u00faan importancia asamblea.","I",5,"\u00bfPor qu\u00e9 es importante la asamblea departamental?",[OP("Representa a los ciudadanos del departamento y controla al gobernador.",True,"Es el contrapeso del gobernador."),OP("\u00danica autoridad del departamento.",False,"Tambi\u00e9n lo es el gobernador."),OP("Puede destituir al Presidente.",False,"No tiene esa facultad."),OP("Administra municipios.",False,"Cada municipio tiene alcalde.")]),
    tc("Proponen ordenanza departamental.","R",6,"Si fueras diputado, \u00bfqu\u00e9 ordenanza propondr\u00edas?",[OP("Educaci\u00f3n ambiental: crear programa de reciclaje en todo el departamento.",True,"Una ordenanza de educaci\u00f3n ambiental beneficia al departamento."),OP("Eliminar todos los impuestos.",False,"No es viable."),OP("Cambiar la bandera del departamento.",False,"No es prioritario."),OP("No propondr\u00eda nada.",False,"Los diputados deben proponer.")]),
    ])
