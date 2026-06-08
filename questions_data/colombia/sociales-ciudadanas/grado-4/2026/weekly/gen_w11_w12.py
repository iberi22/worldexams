#!/usr/bin/env python3
"""Generate W11-W12 bundles SOCIALES CIUDADANAS Colombia G4."""
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
    L.append(f'id: "{bid}"')
    L.append('country: "colombia"'); L.append('grado: 4')
    L.append('asignatura: "sociales-ciudadanas"')
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

# ===== W11 =====
gen_w("W11", "Capitales de departamento: Caribe y Pac\u00edfico",
    "Capitales de los departamentos de las regiones Caribe y Pac\u00edfico",
    "Este bundle cubre las capitales de las regiones Caribe y Pac\u00edfico colombianas.",
    [
    tc("En la I.E. Madre Laura de Cartagena preguntan sobre capitales del Caribe.","U",3,"La capital del departamento del Atl\u00e1ntico es:",[OP("Barranquilla.",True,"Barranquilla es capital del Atl\u00e1ntico."),OP("Cartagena.",False,"Capital de Bol\u00edvar."),OP("Santa Marta.",False,"Capital del Magdalena."),OP("Sincelejo.",False,"Capital de Sucre.")]),
    tc("La profesora de la I.E. de Quibd\u00f3 explica las capitales del Pac\u00edfico.","U",3,"La capital del departamento del Choc\u00f3 es:",[OP("Quibd\u00f3.",True,"Quibd\u00f3 es la capital del Choc\u00f3."),OP("Cali.",False,"Capital del Valle del Cauca."),OP("Buenaventura.",False,"Es un puerto, no capital."),OP("Tumaco.",False,"Municipio de Nari\u00f1o.")]),
    tc("Comparan capitales Caribe y Pac\u00edfico.","I",4,"\u00bfCu\u00e1l de estas es capital de un departamento del Pac\u00edfico?",[OP("Cali (Valle del Cauca).",True,"Cali est\u00e1 en la regi\u00f3n Pac\u00edfico."),OP("Cartagena (Bol\u00edvar).",False,"Es del Caribe."),OP("Santa Marta (Magdalena).",False,"Es del Caribe."),OP("Valledupar (Cesar).",False,"Es del Caribe.")]),
    tc("Analizan la ubicaci\u00f3n de capitales costeras.","I",4,"La capital de Bol\u00edvar es:",[OP("Cartagena.",True,"Cartagena es capital de Bol\u00edvar."),OP("Barranquilla.",False,"Capital del Atl\u00e1ntico."),OP("Santa Marta.",False,"Capital del Magdalena."),OP("Sincelejo.",False,"Capital de Sucre.")]),
    tc("En Riohacha ubican capitales del Caribe.","U",4,"La Guajira limita al norte con:",[OP("El mar Caribe.",True,"La Guajira limita con el Caribe."),OP("El oc\u00e9ano Pac\u00edfico.",False,"Est\u00e1 en el Caribe."),OP("Antioquia.",False,"No limita."),OP("Santander.",False,"No limita.")]),
    tc("Planean viaje por capitales caribe\u00f1as.","R",4,"De oriente a occidente en la costa Caribe:",[OP("Riohacha, Santa Marta, Barranquilla, Cartagena, Sincelejo.",True,"Orden correcto de oriente a occidente."),OP("Cartagena, Barranquilla, Santa Marta, Riohacha.",False,"Orden inverso."),OP("Sincelejo, Cartagena, Barranquilla.",False,"De occidente a oriente."),OP("Santa Marta, Riohacha, Barranquilla.",False,"Incorrecto.")]),
    tc("Analizan por qu\u00e9 el Pac\u00edfico tiene menos capitales.","I",5,"\u00bfPor qu\u00e9 la regi\u00f3n Pac\u00edfico tiene menos capitales?",[OP("Porque tiene solo 4 departamentos.",True,"Nari\u00f1o, Cauca, Valle y Choc\u00f3."),OP("Porque no existe como regi\u00f3n.",False,"S\u00ed existe."),OP("Porque no hay ciudades.",False,"S\u00ed hay."),OP("Porque no tienen capitales.",False,"Todos tienen.")]),
    tc("Comparan Caribe y Pac\u00edfico.","R",5,"Diferencia geogr\u00e1fica clave entre Caribe y Pac\u00edfico:",[OP("Son dos oc\u00e9anos diferentes separados por los Andes.",True,"Caribe es Atl\u00e1ntico, Pac\u00edfico es Pac\u00edfico."),OP("Caribe est\u00e1 en monta\u00f1as.",False,"En costas."),OP("No hay diferencia.",False,"S\u00ed la hay."),OP("Pac\u00edfico son islas.",False,"No son islas.")]),
    tc("Eval\u00faan importancia de capitales caribe\u00f1as.","I",5,"Barranquilla, Cartagena y Santa Marta son importantes porque:",[OP("Son puertos clave para el comercio y el turismo.",True,"Su condici\u00f3n portuaria es clave."),OP("Son las \u00fanicas con aeropuerto.",False,"Muchas tienen."),OP("No tienen relaci\u00f3n con el mar.",False,"S\u00ed tienen."),OP("Son las m\u00e1s peque\u00f1as.",False,"No lo son.")]),
    tc("Proyecto tur\u00edstico para el Pac\u00edfico.","R",6,"\u00bfQu\u00e9 ruta tur\u00edstica propondr\u00edas para las capitales del Pac\u00edfico?",[OP("Ruta ecotur\u00edstica Cali-Popay\u00e1n-Quibd\u00f3-Pasto.",True,"Destaca biodiversidad y cultura del Pac\u00edfico."),OP("Promover solo playas del Caribe.",False,"No es del Pac\u00edfico."),OP("Hoteles grandes sin planificaci\u00f3n.",False,"Se necesita sostenibilidad."),OP("Decir que no hay atractivos.",False,"S\u00ed hay.")]),
    ])

# ===== W12 =====
gen_w("W12", "Repaso P2",
    "Repaso del segundo per\u00edodo: organizaci\u00f3n territorial, departamentos y capitales",
    "Este bundle repasa los temas del segundo per\u00edodo: veredas, corregimientos, municipios, departamentos y capitales de Colombia.",
    [
    tc("En Pasto repasan conceptos de organizaci\u00f3n territorial.","U",3,"La unidad territorial m\u00e1s peque\u00f1a del \u00e1rea rural es:",[OP("La vereda.",True,"La vereda es la divisi\u00f3n rural m\u00e1s peque\u00f1a."),OP("El municipio.",False,"Agrupa veredas."),OP("El departamento.",False,"Agrupa municipios."),OP("El corregimiento.",False,"Tiene centro poblado.")]),
    tc("En Sincelejo repasan los departamentos.","U",3,"\u00bfCu\u00e1ntos departamentos tiene Colombia?",[OP("32 departamentos y Bogot\u00e1 D.C.",True,"32 m\u00e1s Distrito Capital."),OP("30 departamentos.",False,"Son 32."),OP("35 departamentos.",False,"Son 32."),OP("28 departamentos.",False,"Son 32.")]),
    tc("En Neiva repasan diferencias territoriales.","I",4,"\u00bfDiferencia entre corregimiento y vereda?",[OP("El corregimiento tiene centro poblado; la vereda tiene viviendas dispersas.",True,"El corregimiento es centro de servicios rurales."),OP("No hay diferencia.",False,"S\u00ed la hay."),OP("La vereda tiene alcalde.",False,"Ninguno tiene."),OP("Corregimiento solo en costa.",False,"En todo el pa\u00eds.")]),
    tc("En Cali repasan la funci\u00f3n de los departamentos.","I",4,"\u00bfPara qu\u00e9 sirven los departamentos?",[OP("Para descentralizar la administraci\u00f3n y atender mejor las regiones.",True,"Mejor administraci\u00f3n regional."),OP("Para independizarse.",False,"No pueden."),OP("Solo para f\u00fatbol.",False,"Tienen funci\u00f3n administrativa."),OP("Para que el presidente trabaje menos.",False,"No es as\u00ed.")]),
    tc("En Honda aplican jerarqu\u00eda territorial.","U",4,"Si una vereda necesita carretera, acude a:",[OP("Al alcalde municipal.",True,"La vereda pertenece al municipio."),OP("Al gobernador.",False,"Autoridad departamental."),OP("Al presidente.",False,"Autoridad nacional."),OP("Al congresista.",False,"Hacen leyes.")]),
    tc("Viajan de Bogot\u00e1 al oriente.","R",4,"El primer departamento al oriente de Cundinamarca es:",[OP("Meta.",True,"Meta limita al oriente de Cundinamarca."),OP("Antioquia.",False,"Noroccidente."),OP("Valle del Cauca.",False,"Occidente."),OP("Boyac\u00e1.",False,"Norte.")]),
    tc("Analizan organizaci\u00f3n territorial.","I",5,"\u00bfPor qu\u00e9 Colombia se organiza en municipios y departamentos?",[OP("Para descentralizar el poder y administrar mejor.",True,"La descentralizaci\u00f3n mejora la gesti\u00f3n."),OP("Para dar poder a gobernadores.",False,"No es el objetivo."),OP("Para complicar.",False,"Es para simplificar."),OP("Para crear empleos p\u00fablicos.",False,"No es el prop\u00f3sito.")]),
    tc("Comparan estructura de gobierno.","R",5,"\u00bfQu\u00e9 estructura comparten todos los municipios?",[OP("Un alcalde y un concejo municipal.",True,"Estructura b\u00e1sica municipal."),OP("Un gobernador y una asamblea.",False,"Estructura departamental."),OP("Un presidente y un congreso.",False,"Estructura nacional."),OP("Un rey y una corte.",False,"Colombia es rep\u00fablica.")]),
    tc("Eval\u00faan criterios territoriales.","I",5,"\u00bfQu\u00e9 criterio es clave para que una vereda sea corregimiento?",[OP("Tener poblaci\u00f3n concentrada y servicios.",True,"Poblaci\u00f3n concentrada y servicios determinan el cambio."),OP("Nombre bonito.",False,"Irrelevante."),OP("Pagar impuestos.",False,"No es el criterio."),OP("El gobernador decide solo.",False,"Debe consultar a la comunidad.")]),
    tc("Solucionan problema de vereda sin escuela.","R",6,"\u00bfQu\u00e9 propondr\u00edas si los ni\u00f1os de tu vereda caminan dos horas para estudiar?",[OP("Gestionar ante la alcald\u00eda la construcci\u00f3n de una escuela, organizando a la comunidad.",True,"Gesti\u00f3n organizada es la mejor soluci\u00f3n."),OP("Que no estudien.",False,"La educaci\u00f3n es un derecho."),OP("Cerrar la vereda.",False,"No soluciona."),OP("Esperar que el gobierno resuelva solo.",False,"Se necesita participaci\u00f3n.")]),
    ])

print("W11-W12 generated successfully!")
