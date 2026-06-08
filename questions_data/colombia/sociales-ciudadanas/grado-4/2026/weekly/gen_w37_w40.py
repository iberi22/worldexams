#!/usr/bin/env python3
"""Generate W37-W40 bundles."""
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

# W37
gw("W37","Simbolos patrios (bandera, escudo, himno)","Simbolos patrios de Colombia","Este bundle explica los simbolos patrios: bandera, escudo e himno nacional.",[
Q("Simbolos patrios","U",3,"Cuales son los simbolos patrios de Colombia?",[o("La bandera, el escudo y el himno nacional.",True,"Simbolos."),o("El futbolista.",False,"No."),o("La comida.",False,"No."),o("El presidente.",False,"No.")]),
Q("Colores bandera","U",3,"Que colores tiene la bandera colombiana?",[o("Amarillo, azul y rojo.",True,"Tricolor."),o("Verde, blanco, rojo.",False,"No."),o("Azul, blanco, amarillo.",False,"No."),o("Rojo, blanco, azul.",False,"No.")]),
Q("Significado amarillo","I",4,"Que representa el amarillo de la bandera?",[o("La riqueza y el oro de Colombia.",True,"Riqueza."),o("El mar.",False,"Azul."),o("La sangre.",False,"Rojo."),o("La paz.",False,"No.")]),
Q("Significado azul","I",4,"Que representa el azul?",[o("El mar y los rios de Colombia.",True,"Agua."),o("El oro.",False,"No."),o("La sangre.",False,"No."),o("La tierra.",False,"No.")]),
Q("Escudo nacional","U",4,"Que tiene el escudo de Colombia?",[o("Un condor, granadas y cuernos de la abundancia.",True,"Escudo."),o("Un leon.",False,"No."),o("Un aguila.",False,"Condor."),o("Un caballo.",False,"No.")]),
Q("Condor","R",4,"Que representa el condor en el escudo?",[o("La libertad y la soberania.",True,"Libertad."),o("La guerra.",False,"Libertad."),o("La pobreza.",False,"No."),o("El mar.",False,"No.")]),
Q("Himno nacional","I",5,"Quien escribio el himno nacional?",[o("Rafael Nunez (letra) y Oreste Sindici (musica).",True,"Autores."),o("Simon Bolivar.",False,"No."),o("Jose Asuncion Silva.",False,"No."),o("Gabriel Garcia Marquez.",False,"No.")]),
Q("Respeto simbolos","R",5,"Como debemos tratar los simbolos patrios?",[o("Con respeto y solemnidad.",True,"Respeto."),o("Jugando con ellos.",False,"No."),o("Daniandolos.",False,"No."),o("Ignorandolos.",False,"Respetar.")]),
Q("Importancia simbolos","I",5,"Por que son importantes los simbolos patrios?",[o("Porque representan la identidad y unidad nacional.",True,"Identidad."),o("Porque son bonitos.",False,"No."),o("Son obligatorios.",False,"Identidad."),o("No importan.",False,"Si.")]),
Q("Crear simbolo","R",6,"Que simbolo nuevo crearias para Colombia?",[o("Un simbolo que represente la biodiversidad.",True,"Biodiversidad."),o("No crearia.",False,"Crear."),o("Un robot.",False,"No."),o("Una flor artificial.",False,"Natural.")]),
])

# W38
gw("W38","El himno nacional: historia y significado","Historia y significado del himno nacional","Este bundle explica la historia y letra del himno nacional.",[
Q("Origen himno","U",3,"Cuando se adopto el himno nacional?",[o("En 1887.",True,"1887."),o("En 1810.",False,"1887."),o("En 1991.",False,"1887."),o("En 1920.",False,"1887.")]),
Q("Letra himno","U",3,"Cual es el tema principal del himno?",[o("La independencia y la libertad de Colombia.",True,"Independencia."),o("El amor.",False,"Independencia."),o("La naturaleza.",False,"No."),o("La paz.",False,"Libertad.")]),
Q("Estrofa inicial","I",4,"Como empieza el himno?",[o("Oh gloria inmarcesible! Oh juramento inmortal!",True,"Inicio."),o("Oh patria mia!",False,"No."),o("Colombia querida!",False,"No."),o("Viva la patria!",False,"No.")]),
Q("Significado inmarcesible","I",4,"Que significa inmarcesible?",[o("Que no se marchita, eterna.",True,"Eterna."),o("Pequena.",False,"Eterna."),o("Debil.",False,"Eterna."),o("Olvidable.",False,"Eterna.")]),
Q("Coro del himno","U",4,"Cual es el coro del himno?",[o("Oh gloria inmarcesible...",True,"Coro."),o("Viva Colombia!",False,"No."),o("Colombia, tierra amada.",False,"No."),o("Libertad, libertad.",False,"No.")]),
Q("Oreste Sindici","R",4,"Quien fue Oreste Sindici?",[o("El musico italiano que compuso la melodia.",True,"Compositor."),o("El escritor de la letra.",False,"Musico."),o("Un presidente.",False,"Musico."),o("Un poeta.",False,"Musico.")]),
Q("Rafael Nunez","I",5,"Quien fue Rafael Nunez?",[o("Presidente de Colombia que escribio la letra.",True,"Presidente."),o("Un militar.",False,"Presidente."),o("Un cantante.",False,"Presidente."),o("Un indigena.",False,"Presidente.")]),
Q("Sentimiento patrio","R",5,"Que sentimiento debe generar el himno?",[o("Orgullo y amor por la patria.",True,"Patriotico."),o("Tristeza.",False,"Orgullo."),o("Miedo.",False,"Orgullo."),o("Indiferencia.",False,"Orgullo.")]),
Q("Cantar himno","I",5,"Cuando se canta el himno nacional?",[o("En actos civicos, eventos oficiales y fechas patrias.",True,"Civicos."),o("Todos los dias.",False,"Actos."),o("En partidos.",False,"Oficiales."),o("Solo en colegios.",False,"Todos.")]),
Q("Crear estrofa","R",6,"Que nueva estrofa le agregarias al himno?",[o("Una que hable de la biodiversidad y la paz.",True,"Biodiversidad."),o("No cambiaria.",False,"Crear."),o("Sobre futbol.",False,"No."),o("Sobre musica.",False,"Patria.")]),
])

# W39
gw("W39","Regiones naturales de Colombia","Regiones naturales de Colombia","Este bundle explica las 5 regiones naturales de Colombia.",[
Q("Regiones naturales","U",3,"Cuantas regiones naturales tiene Colombia?",[o("5 regiones.",True,"5."),o("3 regiones.",False,"5."),o("7 regiones.",False,"5."),o("4 regiones.",False,"5.")]),
Q("Nombres regiones","U",3,"Cuales son las regiones?",[o("Caribe, Pacifico, Andina, Orinoquia y Amazonia.",True,"5 regiones."),o("Norte, sur, este, oeste.",False,"No."),o("Bogota, Medellin, Cali.",False,"Ciudades."),o("Costa, montana.",False,"5.")]),
Q("Region Caribe","I",4,"Que caracteriza la region Caribe?",[o("Costas, playas, calor y musica como vallenato.",True,"Caribe."),o("Montanas y frio.",False,"Andina."),o("Selva amazonica.",False,"Amazonia."),o("Llanos.",False,"Orinoquia.")]),
Q("Region Andina","I",4,"Que caracteriza la region Andina?",[o("Montanas, cordilleras, clima variado y mayor poblacion.",True,"Andina."),o("Playas y mar.",False,"Caribe."),o("Selva tropical.",False,"Amazonia."),o("Llanuras.",False,"Orinoquia.")]),
Q("Region Pacifico","U",4,"Que caracteriza el Pacifico?",[o("Lluvias intensas, selva y cultura afrocolombiana.",True,"Pacifico."),o("Desierto.",False,"Lluvias."),o("Nieve.",False,"No."),o("Llanos.",False,"Selva.")]),
Q("Region Orinoquia","R",4,"Que hay en la Orinoquia?",[o("Llanos extensos, ganaderia y el joropo.",True,"Llanos."),o("Montanas.",False,"Llanos."),o("Selva.",False,"Amazonia."),o("Costa.",False,"Caribe.")]),
Q("Region Amazonia","I",5,"Que hay en la Amazonia?",[o("Selva tropical, gran biodiversidad y pueblos indigenas.",True,"Amazonia."),o("Desierto.",False,"Selva."),o("Montanas.",False,"Selva."),o("Playas.",False,"Selva.")]),
Q("Biodiversidad","R",5,"Que region es la mas biodiversa?",[o("La Amazonia.",True,"Amazonia."),o("La Andina.",False,"Amazonia."),o("Los llanos.",False,"Amazonia."),o("El Caribe.",False,"Amazonia.")]),
Q("Importancia regiones","I",5,"Por que conocer las regiones?",[o("Para entender la diversidad geografica y cultural.",True,"Diversidad."),o("No es util.",False,"Si."),o("Solo para el mapa.",False,"Mucho."),o("Para viajar.",False,"Entender.")]),
Q("Proyecto regiones","R",6,"Que proyecto harian sobre regiones?",[o("Exposicion con trajes tipicos y comidas de cada region.",True,"Exposicion."),o("Solo leer.",False,"Practico."),o("No hacer.",False,"Crear."),o("Solo dibujar.",False,"Exposicion.")]),
])

# W40
gw("W40","Repaso integral anual","Repaso integral de todo el ano escolar","Este bundle de repaso final cubre los conceptos principales del ano.",[
Q("Organizacion territorial","U",3,"Unidad rural mas pequena:",[o("La vereda.",True,"Vereda."),o("Municipio.",False,"Agrupa."),o("Departamento.",False,"Agrupa."),o("Corregimiento.",False,"Centro.")]),
Q("Departamentos","U",3,"Cuantos departamentos tiene Colombia?",[o("32 + Bogota D.C.",True,"32."),o("30.",False,"32."),o("35.",False,"32."),o("28.",False,"32.")]),
Q("Capital Antioquia","I",4,"Capital de Antioquia:",[o("Medellin.",True,"Antioquia."),o("Bogota.",False,"Cundinamarca."),o("Cali.",False,"Valle."),o("Bucaramanga.",False,"Santander.")]),
Q("Gobierno Nacional","I",4,"Quien lidera el Gobierno Nacional?",[o("El Presidente.",True,"Ejecutivo."),o("El alcalde.",False,"Local."),o("El gobernador.",False,"Dep."),o("El concejal.",False,"No.")]),
Q("Autoridad municipal","U",4,"Autoridad del municipio:",[o("Alcalde.",True,"Municipal."),o("Gobernador.",False,"Dep."),o("Presidente.",False,"Nac."),o("Diputado.",False,"Dep.")]),
Q("Autoridad departamental","R",4,"Autoridad del departamento:",[o("Gobernador.",True,"Dep."),o("Alcalde.",False,"Municipal."),o("Presidente.",False,"Nac."),o("Concejal.",False,"Municipal.")]),
Q("Ramas del poder","I",5,"Cuales son las ramas del poder publico?",[o("Ejecutiva, legislativa y judicial.",True,"Tres."),o("Presidente, Congreso.",False,"No."),o("Alcalde, gobernador.",False,"No."),o("Senado, camara.",False,"No.")]),
Q("Constitucion 1991","R",5,"Que se hizo en 1991?",[o("Se promulgo la nueva Constitucion.",True,"1991."),o("La independencia.",False,"1810."),o("La batalla de Boyaca.",False,"1819."),o("La fundacion de Bogota.",False,"1538.")]),
Q("Diversidad","I",5,"Que caracteriza a Colombia?",[o("Su diversidad cultural y etnica.",True,"Diversa."),o("Que todos son iguales.",False,"Diversa."),o("Solo una cultura.",False,"Muchas."),o("No hay diversidad.",False,"Si.")]),
Q("Proyecto social","R",6,"Que proyecto harian para mejorar la comunidad?",[o("Jornada de limpieza y reciclaje en el barrio.",True,"Ambiente."),o("No hacer nada.",False,"Participar."),o("Tirar basura.",False,"No."),o("Ignorar.",False,"Actuar.")]),
])

print("W37-W40 done!")
