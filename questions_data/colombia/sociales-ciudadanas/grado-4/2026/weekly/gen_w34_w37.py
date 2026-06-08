#!/usr/bin/env python3
"""Generate W34-W37 bundles."""
import os, re
OUT=r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-4\2026\weekly"
def slug(s):
    s=s.lower().strip().replace(" ","-")
    for k,v in {"\u00e1":"a","\u00e9":"e","\u00ed":"i","\u00f3":"o","\u00fa":"u","\u00fc":"u","\u00f1":"n"}.items(): s=s.replace(k,v)
    return re.sub(r'[^a-z0-9\-]','',s)
def label(n): return chr(65+n)
def mq(ctx,bloom,icfes,d,stem,opts,exp):
    return{"ctx":ctx,"bloom":bloom,"icfes":icfes,"d":d,"stem":stem,"opts":opts,"exp":exp}
def build(week,tema,desc,qlist,intro):
    ts=slug(tema);bid=f"COL-SOC-CIU-4-2026-{week}-{ts}-001-MASTERY"
    fn=f"{bid}-bundle.md";fp=os.path.join(OUT,fn)
    L=["---"]
    L.append(f'id: "{bid}"');L.append('country: "colombia"');L.append('grado: 4');L.append('asignatura: "sociales-ciudadanas"')
    L.append(f'tema: "{ts}"');L.append(f'periodo: "{week}"');L.append('protocol_version: "5.2"');L.append('bundle_index: 1')
    L.append('bundle_size: 10');L.append('alignment: "DBA MEN + Est\u00e1ndares B\u00e1sicos"');L.append('modern_context: true')
    L.append('distractor_profile: "plausible_peer_set"');L.append('calibration:');L.append('  expected_success_rate: 0.75')
    L.append('  discrimination_index_target: ">= 0.22"');L.append('  simulated_responses: 100')
    L.append(f'rubric_baseline: "{desc}"')
    L.append("---\n");L.append(f"# Bundle Mastery: {tema}\n");L.append(intro);L.append("")
    for i,q in enumerate(qlist):
        L.append("---\n");L.append(f"## Question {i+1} [D{q['d']}]\n")
        L.append(f"**ID:** `{bid}-v{i+1}`");L.append(f"**Bloom:** [{q['bloom']}]");L.append(f"**ICFES:** [{q['icfes']}]")
        L.append(f"**Context:** {q['ctx']}\n");L.append("### Enunciado");L.append(q['stem']);L.append("")
        L.append("### Options\n")
        opts=list(q['opts']);cp=i%4
        if opts[cp][1]!=True:
            for ix,(_,ok,_) in enumerate(opts):
                if ok:opts[cp],opts[ix]=opts[ix],opts[cp];break
        for ix,(ot,ok,fb) in enumerate(opts):
            L.append(f"- {'[x]' if ok else '[ ]'} {label(ix)}) {ot} <!-- feedback: {fb} -->")
        L.append("");L.append("### Explicaci\u00f3n Pedag\u00f3gica");L.append(q['exp']);L.append("")
    L.append("---\n");L.append("### Explicaci\u00f3n Pedag\u00f3gica Final")
    L.append(f"Este bundle de Ciencias Sociales y Ciudadanas para grado cuarto, {week}, aborda el tema de {tema} desde una perspectiva colombiana.")
    with open(fp,"w",encoding="utf-8") as fh:fh.write("\n".join(L))
    print(f"  OK {fn}")
R="Remember";U="Understand";A="Apply";AN="Analyze";E="Evaluate";C="Create"
B=[R,R,U,U,A,A,AN,AN,E,C]
Ic={"U":"Uso comprensivo del conocimiento social","I":"Interpretaci\u00f3n y an\u00e1lisis de perspectivas","R":"Pensamiento reflexivo y sist\u00e9mico"}
def o(t,ok,fb):return(t,ok,fb)
def Q(ctx,ic,d,stem,opts): return(ctx,ic,d,stem,opts)
def gw(week,tema,desc,intro,qd):
    qs=[]
    for i,(ctx,ic,d,stem,opts)in enumerate(qd):
        qs.append(mq(ctx,B[i],Ic[ic],d,stem,opts,f"[{B[i]}]"))
    build(week,tema,desc,qs,intro)

# W34
gw("W34","Geograf\u00eda: oc\u00e9anos y fronteras de Colombia","Oc\u00e9anos y fronteras de Colombia","Este bundle explica las fronteras terrestres y mar\u00edtimas de Colombia.",[
Q("Fronteras Colombia","U",3,"\u00bfCon cu\u00e1ntos pa\u00edses limita Colombia?",[o("5 pa\u00edses.",True,"5."),o("3 pa\u00edses.",False,"5."),o("7 pa\u00edses.",False,"5."),o("2 pa\u00edses.",False,"5.")]),
Q("Pa\u00edses fronterizos","U",3,"\u00bfQu\u00e9 pa\u00edses limitan con Colombia?",[o("Venezuela, Brasil, Per\u00fa, Ecuador y Panam\u00e1.",True,"5 pa\u00edses."),o("Chile, Argentina, Uruguay.",False,"No."),o("M\u00e9xico, Guatemala.",False,"Centroam\u00e9rica."),o("Espa\u00f1a, Francia.",False,"Europa.")]),
Q("Oc\u00e9anos","I",4,"\u00bfCon qu\u00e9 oc\u00e9anos limita Colombia?",[o("Oc\u00e9ano Atl\u00e1ntico (Caribe) y Pac\u00edfico.",True,"Dos oc\u00e9anos."),o("Solo Atl\u00e1ntico.",False,"Tambi\u00e9n Pac\u00edfico."),o("Solo Pac\u00edfico.",False,"Tambi\u00e9n Atl\u00e1ntico."),o("Con ninguno.",False,"Dos.")]),
Q("Mar Caribe","I",4,"\u00bfEn qu\u00e9 direcci\u00f3n est\u00e1 el mar Caribe?",[o("Al norte de Colombia.",True,"Norte."),o("Al sur.",False,"Norte."),o("Al oriente.",False,"Norte."),o("Al occidente.",False,"Norte.")]),
Q("Oc\u00e9ano Pac\u00edfico","U",4,"\u00bfEn qu\u00e9 direcci\u00f3n est\u00e1 el Pac\u00edfico?",[o("Al occidente de Colombia.",True,"Occidente."),o("Al norte.",False,"Occidente."),o("Al sur.",False,"Occidente."),o("Al oriente.",False,"Occidente.")]),
Q("L\u00edmite con Brasil","R",4,"\u00bfPor qu\u00e9 regi\u00f3n limita Colombia con Brasil?",[o("Por la Amazon\u00eda.",True,"Amazon\u00eda."),o("Por la costa Caribe.",False,"Amazon\u00eda."),o("Por la cordillera.",False,"Amazon\u00eda."),o("Por el Pac\u00edfico.",False,"Amazon\u00eda.")]),
Q("Frontera con Panam\u00e1","I",5,"\u00bfD\u00f3nde est\u00e1 la frontera con Panam\u00e1?",[o("En el Dari\u00e9n, en el noroccidente.",True,"Dari\u00e9n."),o("En Leticia.",False,"Dari\u00e9n."),o("En la Guajira.",False,"Dari\u00e9n."),o("En Tumaco.",False,"Dari\u00e9n.")]),
Q("Frontera mar\u00edtima","R",5,"\u00bfColombia tiene frontera mar\u00edtima?",[o("S\u00ed, con varios pa\u00edses del Caribe.",True,"S\u00ed."),o("No, solo terrestre.",False,"S\u00ed."),o("Solo con Jamaica.",False,"Varios."),o("No existe.",False,"S\u00ed.")]),
Q("Importancia fronteras","I",5,"\u00bfPor qu\u00e9 importan las fronteras?",[o("Porque delimitan el territorio y la soberan\u00eda nacional.",True,"Soberan\u00eda."),o("No son importantes.",False,"S\u00ed."),o("Para viajar.",False,"Soberan\u00eda."),o("Solo comercio.",False,"Tambi\u00e9n.")]),
Q("Cuidar fronteras","R",6,"\u00bfC\u00f3mo cuidamos las fronteras?",[o("Protegiendo recursos naturales y la soberan\u00eda.",True,"Soberan\u00eda."),o("Cerr\u00e1ndolas.",False,"No."),o("Ignor\u00e1ndolas.",False,"Cuidar."),o("No hacer nada.",False,"Proteger.")]),
])

# W35
gw("W35","Relieve colombiano (monta\u00f1as, llanuras, costas)","Relieve de Colombia: monta\u00f1as, llanuras y costas","Este bundle explica las formas del relieve colombiano.",[
Q("Relieve","U",3,"\u00bfQu\u00e9 es el relieve?",[o("Las formas de la superficie terrestre.",True,"Formas."),o("El clima.",False,"No."),o("Los r\u00edos.",False,"No."),o("La vegetaci\u00f3n.",False,"Formas.")]),
Q("Cordilleras","U",3,"\u00bfCu\u00e1ntas cordilleras tiene Colombia?",[o("Tres: Occidental, Central y Oriental.",True,"3 cordilleras."),o("Una sola.",False,"3."),o("Dos.",False,"3."),o("Cinco.",False,"3.")]),
Q("Llanuras","I",4,"\u00bfD\u00f3nde est\u00e1n los Llanos Orientales?",[o("Al oriente, en la Orinoqu\u00eda.",True,"Oriente."),o("Al occidente.",False,"Oriente."),o("Al norte.",False,"Oriente."),o("Al sur.",False,"Oriente.")]),
Q("Costas","I",4,"\u00bfQu\u00e9 tipo de costa tiene Colombia?",[o("Costas sobre Caribe y Pac\u00edfico.",True,"Dos costas."),o("Solo Caribe.",False,"Dos."),o("Solo Pac\u00edfico.",False,"Dos."),o("Ninguna.",False,"Dos.")]),
Q("Monta\u00f1as","U",4,"\u00bfD\u00f3nde est\u00e1n las principales monta\u00f1as?",[o("En la regi\u00f3n Andina.",True,"Andina."),o("En la Amazon\u00eda.",False,"Andina."),o("En la costa.",False,"Andina."),o("En los llanos.",False,"Andina.")]),
Q("Valle del Magdalena","R",4,"\u00bfQu\u00e9 r\u00edo recorre el valle interandino?",[o("El r\u00edo Magdalena.",True,"Magdalena."),o("El r\u00edo Amazonas.",False,"Magdalena."),o("El r\u00edo Orinoco.",False,"Magdalena."),o("El r\u00edo Cauca.",False,"Magdalena.")]),
Q("Altura cordilleras","I",5,"\u00bfQu\u00e9 determina el clima en monta\u00f1as?",[o("La altura sobre el nivel del mar.",True,"Altura."),o("La latitud.",False,"Altura."),o("Los vientos.",False,"Altura."),o("La vegetaci\u00f3n.",False,"Altura.")]),
Q("Llanura amaz\u00f3nica","R",5,"\u00bfQu\u00e9 regi\u00f3n tiene relieve plano?",[o("La Amazon\u00eda y los Llanos.",True,"Plano."),o("La Andina.",False,"Monta\u00f1osa."),o("La costa Pac\u00edfico.",False,"Variado."),o("La Sierra Nevada.",False,"Monta\u00f1osa.")]),
Q("Sierra Nevada","I",5,"\u00bfD\u00f3nde est\u00e1 la Sierra Nevada de Santa Marta?",[o("En la costa Caribe.",True,"Caribe."),o("En la Andina.",False,"Caribe."),o("En el Pac\u00edfico.",False,"Caribe."),o("En los llanos.",False,"Caribe.")]),
Q("Crear mapa relieve","R",6,"\u00bfC\u00f3mo representar el relieve colombiano?",[o("Mapa f\u00edsico con colores para monta\u00f1as, llanuras, costas.",True,"Mapa f\u00edsico."),o("Dibujos libres.",False,"Mapa."),o("Solo texto.",False,"Visual."),o("No lo har\u00eda.",False,"Crear.")]),
])

# W36
gw("W36","Climas y pisos t\u00e9rmicos","Climas y pisos t\u00e9rmicos de Colombia","Este bundle explica los diferentes climas y pisos t\u00e9rmicos.",[
Q("Clima Colombia","U",3,"\u00bfQu\u00e9 caracteriza el clima colombiano?",[o("Es diverso por su ubicaci\u00f3n ecuatorial y relieve.",True,"Diverso."),o("Es igual en todo el pa\u00eds.",False,"Diverso."),o("Solo fr\u00edo.",False,"Variado."),o("Solo c\u00e1lido.",False,"Variado.")]),
Q("Pisos t\u00e9rmicos","U",3,"\u00bfQu\u00e9 son los pisos t\u00e9rmicos?",[o("Zonas clim\u00e1ticas seg\u00fan altura.",True,"Altura."),o("Tipos de suelo.",False,"Clima."),o("Capas de la tierra.",False,"Clima."),o("Corrientes marinas.",False,"Altura.")]),
Q("Piso c\u00e1lido","I",4,"\u00bfD\u00f3nde hay piso c\u00e1lido?",[o("En la costa Caribe, 0-1000 msnm.",True,"C\u00e1lido."),o("En el piso fr\u00edo.",False,"C\u00e1lido."),o("En el piso templado.",False,"C\u00e1lido."),o("En el glacial.",False,"C\u00e1lido.")]),
Q("Piso fr\u00edo","I",4,"\u00bfD\u00f3nde hay piso fr\u00edo?",[o("Entre 2000 y 3000 msnm.",True,"Fr\u00edo."),o("En la costa.",False,"Altura."),o("A nivel del mar.",False,"Altura."),o("En los llanos.",False,"Altura.")]),
Q("P\u00e1ramo","U",4,"\u00bfQu\u00e9 es un p\u00e1ramo?",[o("Ecosistema de alta monta\u00f1a que provee agua.",True,"P\u00e1ramo."),o("Un desierto.",False,"Monta\u00f1a."),o("Una playa.",False,"No."),o("Un bosque tropical.",False,"Alta monta\u00f1a.")]),
Q("Piso Bogot\u00e1","R",4,"\u00bfEn qu\u00e9 piso est\u00e1 Bogot\u00e1?",[o("Piso fr\u00edo (2600 msnm).",True,"Fr\u00edo."),o("Piso c\u00e1lido.",False,"Fr\u00edo."),o("Piso templado.",False,"Fr\u00edo."),o("Piso glacial.",False,"Fr\u00edo.")]),
Q("Piso glacial","I",5,"\u00bfD\u00f3nde hay piso glacial?",[o("Cumbres m\u00e1s altas de la Sierra Nevada.",True,"Glacial."),o("En la costa.",False,"Altura."),o("En los llanos.",False,"No."),o("En el mar.",False,"No.")]),
Q("Clima y agricultura","R",5,"\u00bfQu\u00e9 se cultiva en piso templado?",[o("Caf\u00e9.",True,"Caf\u00e9."),o("Coco.",False,"C\u00e1lido."),o("Papa.",False,"Fr\u00edo."),o("Palma.",False,"C\u00e1lido.")]),
Q("Importancia pisos","I",5,"\u00bfPor qu\u00e9 conocer los pisos t\u00e9rmicos?",[o("Para saber qu\u00e9 cultivar y c\u00f3mo vestir.",True,"Agricultura."),o("No es importante.",False,"S\u00ed."),o("Solo turismo.",False,"Tambi\u00e9n."),o("Decoraci\u00f3n.",False,"Pr\u00e1ctico.")]),
Q("Proyecto climas","R",6,"\u00bfQu\u00e9 proyecto har\u00edas sobre climas?",[o("Maqueta de los pisos t\u00e9rmicos con sus cultivos.",True,"Maqueta."),o("Solo leer.",False,"Pr\u00e1ctico."),o("No hacer nada.",False,"Crear."),o("Solo dibujar.",False,"Maqueta.")]),
])

print("W34-W36 done!")
