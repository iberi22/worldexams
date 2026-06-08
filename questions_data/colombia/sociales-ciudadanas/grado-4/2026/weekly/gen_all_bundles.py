#!/usr/bin/env python3
"""Generate all SOCIALES CIUDADANAS Colombia G4 W08-W40 bundles."""

import os, re, sys

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
                if ok: opts[correct_pos], opts[idx] = opts[idx], opts[correct_pos]; break
        for idx, (ot, ok, fb) in enumerate(opts):
            L.append(f"- {'[x]' if ok else '[ ]'} {label(idx)}) {ot} <!-- feedback: {fb} -->")
        L.append("")
        L.append("### Explicaci\u00f3n Pedag\u00f3gica")
        L.append(q['exp'])
        L.append("")
    L.append("---\n")
    L.append("### Explicaci\u00f3n Pedag\u00f3gica Final")
    L.append(f"Este bundle de Ciencias Sociales y Ciudadanas para grado cuarto, {week}, aborda el tema de {tema} desde una perspectiva colombiana. Eval\u00faa la comprensi\u00f3n del concepto, las caracter\u00edsticas principales, la aplicaci\u00f3n en contextos cotidianos, el an\u00e1lisis de situaciones, la evaluaci\u00f3n cr\u00edtica y la capacidad creativa para proponer soluciones. El objetivo es que los estudiantes reconozcan la importancia de estos temas en su vida diaria como ciudadanos colombianos y fortalezcan su pensamiento social y reflexivo.")
    with open(fp, "w", encoding="utf-8") as fh: fh.write("\n".join(L))
    print(f"  OK {fname}")
    return True

def Q(ctx,b,d,stem,opts,exp): return make_q(ctx,b,"Uso comprensivo del conocimiento social",d,stem,opts,exp)
def QI(ctx,b,d,stem,opts,exp): return make_q(ctx,b,"Interpretaci\u00f3n y an\u00e1lisis de perspectivas",d,stem,opts,exp)
def QR(ctx,b,d,stem,opts,exp): return make_q(ctx,b,"Pensamiento reflexivo y sist\u00e9mico",d,stem,opts,exp)
def OP(t,ok,fb): return (t,ok,fb)
R="Remember";U="Understand";A="Apply";AN="Analyze";E="Evaluate";C="Create"

BLOOMS = [R,R,U,U,A,A,AN,AN,E,C]

def beam(ctx, bloom, icfes, d, stem, *opts):
    """Build a question from compact params."""
    return make_q(ctx, bloom, icfes, d, stem, [OP(*o) for o in opts], "")

def w05(qs):
    """Assign blooms from cycle to 5 pairs."""
    out = []
    for i, (ctx, icfes, d, stem, *opts) in enumerate(qs):
        bloom = BLOOMS[i]
        exp_auto = f"Se eval\u00faa [{bloom}] con contexto {ctx[:30]}..."
        out.append(make_q(ctx, bloom, icfes, d, stem, [OP(*o) for o in opts], exp_auto))
    return out

def w10(qs):
    return w05(qs)

# === WEEKS ===
# Each entry: (week, tema, desc, intro, [[ctx, icfes_code, d, stem, op1, op2, op3, op4], ...])
# where op = (text, is_correct, feedback)

W = []

# Helper to build a week
def wk(week, tema, desc, intro, qdata):
    qs = w10(qdata)
    build(week, tema, desc, qs, intro)

# Map icfes code -> full name
ICFES = {
    "U": "Uso comprensivo del conocimiento social",
    "I": "Interpretaci\u00f3n y an\u00e1lisis de perspectivas",
    "R": "Pensamiento reflexivo y sist\u00e9mico"
}

def t(icfes_code, d, stem, *opts):
    return ("", icfes_code, d, stem, *opts)

def tc(ctx, icfes_code, d, stem, *opts):
    return (ctx, icfes_code, d, stem, *opts)

# Convert compact data into make_q
def qdata_to_qs(qdata):
    qs = []
    for i, (ctx, icode, d, stem, *opts) in enumerate(qdata):
        bloom = BLOOMS[i]
        icfes = ICFES[icode]
        qs.append(make_q(ctx, bloom, icfes, d, stem, [OP(*o) for o in opts],
            f"Se eval\u00faa [{bloom}] con el tema de la pregunta."))
    return qs

def build_week(week, tema, desc, intro, qdata):
    return build(week, tema, desc, qdata_to_qs(qdata), intro)

# ==============================
# W08: Organizaci\u00f3n territorial
# ==============================
build_week("W08", "Organizaci\u00f3n territorial: veredas, corregimientos, municipios",
    "Organizaci\u00f3n territorial colombiana: veredas, corregimientos, municipios",
    "Este bundle cubre las unidades de organizaci\u00f3n territorial en Colombia. Desde la vereda como unidad rural m\u00e1s peque\u00f1a hasta los corregimientos y municipios.",
    [
    tc("En la I.E. San Luis Gonzaga de Caldas explican la vereda.", "U",3,"\u00bfQu\u00e9 es una vereda?",
        ("La divisi\u00f3n territorial m\u00e1s peque\u00f1a del \u00e1rea rural.",True,"La vereda agrupa predios rurales."),
        ("Un barrio de la ciudad.",False,"El barrio es \u00e1rea urbana."),
        ("Un municipio peque\u00f1o.",False,"El municipio contiene veredas."),
        ("Un departamento rural.",False,"El departamento contiene municipios.")),
    tc("La profesora pregunta sobre el corregimiento.","U",3,"\u00bfQu\u00e9 caracteriza a un corregimiento?",
        ("Tiene un centro poblado con servicios.",True,"El corregimiento es un centro de servicios rural."),
        ("Es igual a una vereda.",False,"Tiene un centro poblado, la vereda no."),
        ("Tiene alcalde propio.",False,"No tiene alcalde propio."),
        ("Es la capital del departamento.",False,"Las capitales son ciudades.")),
    tc("En la I.E. de Une, Cundinamarca, explican la jerarqu\u00eda territorial.","I",4,"\u00bfC\u00f3mo se organizan las unidades territoriales de menor a mayor?",
        ("Vereda, corregimiento, municipio, departamento.",True,"De menor a mayor: vereda, corregimiento, municipio, departamento."),
        ("Municipio, vereda, departamento.",False,"La vereda es la m\u00e1s peque\u00f1a."),
        ("Departamento, municipio, vereda.",False,"Es al rev\u00e9s."),
        ("Corregimiento, vereda, municipio.",False,"La vereda es menor que el corregimiento.")),
    tc("Analizan por qu\u00e9 existen diferentes divisiones territoriales.","I",4,"\u00bfPara qu\u00e9 sirve dividir el territorio en veredas, corregimientos y municipios?",
        ("Para administrar mejor cada zona seg\u00fan sus caracter\u00edsticas.",True,"La divisi\u00f3n facilita la administraci\u00f3n."),
        ("Para confundir a las personas.",False,"Es para organizar, no para confundir."),
        ("Para que los ni\u00f1os aprendan geograf\u00eda.",False,"No es el prop\u00f3sito principal."),
        ("Para cobrar m\u00e1s impuestos.",False,"No es el prop\u00f3sito.")),
    tc("Un estudiante de la I.E. La Merced de Cali ubica su vereda.","U",4,"Si vives en una vereda y necesitas un servicio, \u00bfa qu\u00e9 municipio perteneces?",
        ("Al municipio que tiene jurisdicci\u00f3n sobre esa vereda.",True,"Cada vereda pertenece a un municipio."),
        ("A cualquier municipio que quieras.",False,"Tiene un municipio asignado."),
        ("A ninguno, las veredas son independientes.",False,"Pertenecen a un municipio."),
        ("Al departamento directamente.",False,"El departamento no administra veredas directamente.")),
    tc("Los estudiantes de la I.E. T\u00e9cnica de Chaparral aplican el concepto de unidad territorial.","R",4,"\u00bfCu\u00e1ntas veredas puede tener un municipio?",
        ("Puede tener muchas, depende de su extensi\u00f3n y poblaci\u00f3n rural.",True,"Cada municipio tiene diferentes n\u00fameros de veredas."),
        ("Solo 5 veredas.",False,"No hay un n\u00famero fijo."),
        ("Ninguna, las veredas son de los departamentos.",False,"Las veredas son parte del municipio."),
        ("100 veredas exactamente.",False,"No hay un n\u00famero exacto.")),
    tc("Analizan la organizaci\u00f3n territorial de Colombia.","I",5,"\u00bfQu\u00e9 tienen en com\u00fan todas las veredas de Colombia?",
        ("Son \u00e1reas rurales que pertenecen a un municipio.",True,"Todas las veredas son \u00e1reas rurales municipales."),
        ("Todas tienen m\u00e1s de 1000 habitantes.",False,"Pueden tener pocos habitantes."),
        ("Todas tienen escuela y hospital.",False,"No todas tienen servicios."),
        ("Todas son capitales de municipio.",False,"Las veredas no son capitales.")),
    tc("Comparan la organizaci\u00f3n de un municipio grande y uno peque\u00f1o.","R",5,"\u00bfQu\u00e9 determina si un municipio tiene corregimientos o solo veredas?",
        ("El tama\u00f1o de su poblaci\u00f3n rural concentrada y la necesidad de servicios.",True,"Los corregimientos surgen donde hay poblaci\u00f3n concentrada."),
        ("El color de su bandera.",False,"Eso no tiene relaci\u00f3n."),
        ("La altura sobre el nivel del mar.",False,"No determina la organizaci\u00f3n territorial."),
        ("El n\u00famero de r\u00edos que tiene.",False,"No es el factor determinante.")),
    tc("Eval\u00faan la importancia de la organizaci\u00f3n territorial.","I",5,"\u00bfPor qu\u00e9 es \u00fatil que Colombia se divida en municipios?",
        ("Porque permite un gobierno local m\u00e1s cercano a las comunidades.",True,"El municipio es el nivel de gobierno m\u00e1s cercano al ciudadano."),
        ("Para que cada pueblo tenga su propio presidente.",False,"Los presidentes son solo uno nacional."),
        ("Para que sea m\u00e1s f\u00e1cil contar a la poblaci\u00f3n.",False,"No es el principal prop\u00f3sito."),
        ("Para que los gobernadores tengan trabajo.",False,"Los gobernadores son departamentales.")),
    tc("Proponen una soluci\u00f3n para una vereda sin acceso a servicios.","R",6,"\u00bfC\u00f3mo podr\u00edan los habitantes de una vereda conseguir un puesto de salud?",
        ("Organizarse y solicitarlo al alcalde municipal.",True,"La gesti\u00f3n organizada ante la alcald\u00eda es el camino correcto."),
        ("Declarar la vereda independiente.",False,"No es posible."),
        ("Esperar a que el presidente venga.",False,"El presidente no gestiona servicios locales."),
        ("Ped\u00edrselo al gobernador de otro departamento.",False,"Deben acudir a su propio municipio.")),
    ])

# ==============================
# W09: Departamentos de Colombia
# ==============================
build_week("W09", "Departamentos de Colombia",
    "Los departamentos colombianos, su concepto y cu\u00e1ntos son",
    "Este bundle explica los departamentos en que se divide Colombia, su concepto como entidades territoriales y su n\u00famero actual.",
    [
    tc("En la I.E. INEM de Pasto preguntan sobre los departamentos.", "U",3,"\u00bfCu\u00e1ntos departamentos tiene Colombia?",
        ("32 departamentos m\u00e1s Bogot\u00e1 D.C.",True,"Colombia tiene 32 departamentos y el Distrito Capital."),
        ("30 departamentos.",False,"Son 32."),
        ("35 departamentos.",False,"Son 32."),
        ("28 departamentos.",False,"Son 32.")),
    tc("Preguntan qu\u00e9 es un departamento.","U",3,"\u00bfQu\u00e9 es un departamento en Colombia?",
        ("Una entidad territorial con autonom\u00eda pol\u00edtica y administrativa.",True,"Los departamentos tienen gobierno propio."),
        ("Una ciudad importante.",False,"Las ciudades son parte de los departamentos."),
        ("Un pa\u00eds dentro de Colombia.",False,"No son pa\u00edses independientes."),
        ("Un barrio grande.",False,"El barrio es parte de un municipio.")),
    tc("Analizan la funci\u00f3n de los departamentos.","I",4,"\u00bfPara qu\u00e9 sirven los departamentos?",
        ("Para administrar las regiones entre la naci\u00f3n y los municipios.",True,"Los departamentos son el nivel intermedio de gobierno."),
        ("Para hacer monedas diferentes.",False,"La moneda es nacional."),
        ("Para tener ej\u00e9rcitos propios.",False,"Las fuerzas militares son nacionales."),
        ("Para organizar fiestas regionales.",False,"Su funci\u00f3n es administrativa.")),
    tc("Comparan los departamentos con los municipios.","I",4,"\u00bfQu\u00e9 contiene un departamento?",
        ("Municipios.",True,"El departamento agrupa municipios."),
        ("Veredas directamente.",False,"Las veredas pertenecen a los municipios."),
        ("Pa\u00edses vecinos.",False,"Los departamentos no contienen pa\u00edses."),
        ("Continentes.",False,"Son divisiones internas de Colombia.")),
    tc("Un estudiante ubica los departamentos en el mapa.","U",4,"\u00bfCu\u00e1l es el departamento m\u00e1s extenso de Colombia?",
        ("Amazonas.",True,"Amazonas es el m\u00e1s extenso con m\u00e1s de 100.000 km\u00b2."),
        ("Antioquia.",False,"Antioquia es grande pero no el m\u00e1s extenso."),
        ("Cundinamarca.",False,"No es el m\u00e1s extenso."),
        ("Santander.",False,"No es el m\u00e1s extenso.")),
    tc("Los estudiantes de la I.E. de Leticia hablan sobre su departamento.","R",4,"\u00bfQu\u00e9 departamento tiene capital Leticia?",
        ("Amazonas.",True,"Leticia es la capital del Amazonas."),
        ("Putumayo.",False,"Mocoa es capital de Putumayo."),
        ("Caquet\u00e1.",False,"Florencia es capital de Caquet\u00e1."),
        ("Vaup\u00e9s.",False,"Mit\u00fa es capital del Vaup\u00e9s.")),
    tc("Analizan la diversidad de los departamentos.","I",5,"\u00bfEn qu\u00e9 se diferencian los departamentos colombianos?",
        ("En tama\u00f1o, poblaci\u00f3n, clima y actividad econ\u00f3mica.",True,"Los departamentos son diversos en muchos aspectos."),
        ("En todos tienen el mismo clima.",False,"Tienen climas diferentes."),
        ("Todos tienen la misma cantidad de personas.",False,"Tienen poblaciones muy diversas."),
        ("No se diferencian en nada.",False,"S\u00ed se diferencian.")),
    tc("Comparan los departamentos de la regi\u00f3n Andina con los de la Amazon\u00eda.","R",5,"\u00bfQu\u00e9 regi\u00f3n tiene m\u00e1s departamentos?",
        ("La regi\u00f3n Andina.",True,"La regi\u00f3n Andina tiene la mayor\u00eda de los departamentos de Colombia."),
        ("La regi\u00f3n Amaz\u00f3nica.",False,"Tiene pocos departamentos."),
        ("La regi\u00f3n Caribe.",False,"Tiene menos que la Andina."),
        ("La regi\u00f3n Pac\u00edfico.",False,"Tiene solo 4 departamentos.")),
    tc("Eval\u00faan la importancia de la divisi\u00f3n departamental.","I",5,"\u00bfPor qu\u00e9 es \u00fatil dividir Colombia en 32 departamentos?",
        ("Porque facilita la administraci\u00f3n y atenci\u00f3n de las necesidades regionales.",True,"Cada departamento tiene gobierno y administraci\u00f3n propios."),
        ("Para tener 32 presidentes.",False,"Solo hay un presidente."),
        ("Para que cada departamento tenga su propio idioma.",False,"El idioma oficial es el espa\u00f1ol."),
        ("Para competir entre ellos.",False,"Deben colaborar, no competir.")),
    tc("Proponen crear un nuevo departamento.","R",6,"Si pudieras crear un departamento nuevo, \u00bfqu\u00e9 nombre le pondr\u00edas?",
        ("Crear\u00eda 'Nueva Granada' con municipios de la regi\u00f3n cafetera.",True,"Un nuevo departamento requerir\u00eda una ley del Congreso."),
        ("Lo llamar\u00eda 'Narnia' sin importar la ubicaci\u00f3n.",False,"Los nombre deben tener significado geogr\u00e1fico o hist\u00f3rico."),
        ("Har\u00eda uno por cada ciudad.",False,"No es viable."),
        ("Cambiar\u00eda el nombre de todos los departamentos.",False,"No es necesario.")),
    ])

# ==============================
# W10: Capitales de departamento (Andina)
# ==============================
build_week("W10", "Capitales de departamento: regi\u00f3n Andina",
    "Capitales de los departamentos de la regi\u00f3n Andina de Colombia",
    "Este bundle ense\u00f1a las capitales de los departamentos que conforman la regi\u00f3n Andina colombiana.",
    [
    tc("En la I.E. San Luis de Manizales preguntan sobre capitales andinas.", "U",3,"\u00bfCu\u00e1l es la capital de Antioquia?",
        ("Medell\u00edn.",True,"Medell\u00edn es la capital de Antioquia."),
        ("Bogot\u00e1.",False,"Bogot\u00e1 es capital de Cundinamarca."),
        ("Cali.",False,"Cali es capital del Valle del Cauca."),
        ("Bucaramanga.",False,"Bucaramanga es capital de Santander.")),
    tc("La profesora pregunta sobre capitales.","U",3,"\u00bfCu\u00e1l es la capital de Cundinamarca?",
        ("Bogot\u00e1 D.C.",True,"Bogot\u00e1 es la capital de Cundinamarca."),
        ("Medell\u00edn.",False,"Capital de Antioquia."),
        ("Tunja.",False,"Capital de Boyac\u00e1."),
        ("Manizales.",False,"Capital de Caldas.")),
    tc("Analizan las capitales andinas.","I",4,"\u00bfCu\u00e1l de estas NO es capital de un departamento andino?",
        ("Barranquilla.",True,"Barranquilla es capital del Atl\u00e1ntico, regi\u00f3n Caribe."),
        ("Manizales.",False,"Es capital de Caldas, regi\u00f3n Andina."),
        ("Ibagu\u00e9.",False,"Es capital del Tolima, regi\u00f3n Andina."),
        ("Bogot\u00e1.",False,"Es capital de Cundinamarca, regi\u00f3n Andina.")),
    tc("Ubican las capitales en el mapa.","I",4,"\u00bfQu\u00e9 departamento tiene como capital a Bucaramanga?",
        ("Santander.",True,"Bucaramanga es la capital de Santander."),
        ("Norte de Santander.",False,"C\u00facuta es la capital."),
        ("Boyac\u00e1.",False,"Tunja es la capital."),
        ("Cesar.",False,"Valledupar es la capital.")),
    tc("Planean un viaje por las capitales andinas.","U",4,"Si viajas de Bogot\u00e1 a Medell\u00edn, \u00bfen qu\u00e9 direcci\u00f3n te diriges?",
        ("Hacia el noroccidente.",True,"Medell\u00edn est\u00e1 al noroccidente de Bogot\u00e1."),
        ("Hacia el sur.",False,"Medell\u00edn est\u00e1 al norte."),
        ("Hacia el oriente.",False,"Est\u00e1 al occidente."),
        ("Hacia el suroriente.",False,"Est\u00e1 en direcci\u00f3n opuesta.")),
    tc("Los estudiantes de Pereira se ubican en el mapa.","R",4,"\u00bfCu\u00e1l es la capital de Risaralda?",
        ("Pereira.",True,"Pereira es la capital de Risaralda."),
        ("Manizales.",False,"Capital de Caldas."),
        ("Armenia.",False,"Capital del Quind\u00edo."),
        ("Ibagu\u00e9.",False,"Capital del Tolima.")),
    tc("Analizan la concentraci\u00f3n de capitales en los Andes.","I",5,"\u00bfPor qu\u00e9 la mayor\u00eda de capitales est\u00e1n en la regi\u00f3n Andina?",
        ("Porque all\u00ed se concentra la mayor\u00eda de la poblaci\u00f3n y los departamentos.",True,"La regi\u00f3n Andina tiene 18 de los 32 departamentos."),
        ("Por casualidad.",False,"Hay razones hist\u00f3ricas y geogr\u00e1ficas."),
        ("Porque las otras regiones no tienen ciudades.",False,"S\u00ed tienen ciudades importantes."),
        ("Por disposici\u00f3n constitucional.",False,"No lo dice la Constituci\u00f3n.")),
    tc("Comparan las capitales andinas con las de otras regiones.","R",5,"\u00bfCu\u00e1ntos departamentos tiene la regi\u00f3n Andina aproximadamente?",
        ("18 departamentos.",True,"La regi\u00f3n Andina tiene la mayor\u00eda de los departamentos."),
        ("5 departamentos.",False,"Tiene muchos m\u00e1s."),
        ("32 departamentos.",False,"Ese es el total del pa\u00eds."),
        ("10 departamentos.",False,"Tiene m\u00e1s.")),
    tc("Eval\u00faan la importancia de las capitales andinas.","I",5,"\u00bfPor qu\u00e9 ciudades como Bogot\u00e1, Medell\u00edn y Cali son importantes?",
        ("Son centros econ\u00f3micos, pol\u00edticos y culturales del pa\u00eds.",True,"Son las principales capitales del pa\u00eds."),
        ("Porque tienen los mismos nombre.",False,"No todas se llaman igual."),
        ("Porque est\u00e1n en el mar.",False,"Ninguna tiene mar."),
        ("Porque no tienen municipios alrededor.",False,"S\u00ed tienen \u00e1rea metropolitana.")),
    tc("Proponen una ruta educativa por capitales andinas.","R",6,"Si dise\u00f1as una ruta educativa por capitales andinas, \u00bfcu\u00e1l escoger\u00edas?",
        ("Bogot\u00e1 - Tunja - Bucaramanga por su historia.",True,"Recorrido por la historia andina."),
        ("Bogot\u00e1 - Leticia.",False,"Leticia no es andina."),
        ("Cartagena - Barranquilla.",False,"Son del Caribe."),
        ("San Andr\u00e9s - Providencia.",False,"Son islas del Caribe.")),
    ])

print("W08-W10 done.")
