#!/usr/bin/env python3
"""Generate W18-W30 bundles."""
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

# W18
gw("W18","Mecanismos de participaci\u00f3n (voto, plebiscito, referendo)","Participaci\u00f3n ciudadana en Colombia","Este bundle aborda los mecanismos de participaci\u00f3n ciudadana.",[
Q("En Sincelejo explican participaci\u00f3n","U",3,"\u00bfQu\u00e9 es el voto?",[o("Derecho y deber para elegir gobernantes.",True,"Principal."),o("Un impuesto.",False,"No."),o("Una multa.",False,"Derecho."),o("Un deporte.",False,"Pol\u00edtico.")]),
Q("Plebiscito","U",3,"\u00bfQu\u00e9 es un plebiscito?",[o("Consulta al pueblo sobre decisi\u00f3n importante.",True,"Consulta."),o("Elecci\u00f3n de alcalde.",False,"Elecci\u00f3n."),o("Partido de f\u00fatbol.",False,"Pol\u00edtico."),o("Un impuesto.",False,"No.")]),
Q("Referendo","I",4,"Diferencia plebiscito y referendo:",[o("Referendo: ley. Plebiscito: decisi\u00f3n.",True,"Diferencian."),o("No hay diferencia.",False,"S\u00ed."),o("Plebiscito personas.",False,"Temas."),o("Lo hace el Presidente solo.",False,"Popular.")]),
Q("Cabildo abierto","I",4,"\u00bfQu\u00e9 es un cabildo abierto?",[o("Ciudadanos hablan con el concejo.",True,"Participaci\u00f3n."),o("Fiesta del barrio.",False,"Pol\u00edtica."),o("Partido de f\u00fatbol.",False,"No."),o("Mercado popular.",False,"No.")]),
Q("Iniciativa popular","U",4,"\u00bfQu\u00e9 es iniciativa legislativa popular?",[o("Facultad de proponer leyes.",True,"Proponer."),o("Presidente veta leyes.",False,"Presidencial."),o("Obligaci\u00f3n de votar.",False,"No."),o("Prohibir participar.",False,"Proponer.")]),
Q("Qui\u00e9nes votan","R",4,"\u00bfQui\u00e9nes votan en Colombia?",[o("Ciudadanos mayores de 18.",True,"18 a\u00f1os."),o("Solo mayores 30.",False,"18."),o("Solo hombres.",False,"Todos."),o("Solo ricos.",False,"Todos.")]),
Q("Importancia voto","I",5,"\u00bfPor qu\u00e9 es importante votar?",[o("Elegir gobernantes representativos.",True,"Voluntad popular."),o("Evitar multas.",False,"No obligatorio."),o("Ganar premios.",False,"No."),o("Obligaci\u00f3n.",False,"No.")]),
Q("Revocar alcalde","R",5,"Mecanismo para revocar alcalde:",[o("Revocatoria del mandato.",True,"Quitar funcionario."),o("Referendo.",False,"Sobre leyes."),o("Plebiscito.",False,"Decisiones."),o("Voto normal.",False,"Elige, no revoca.")]),
Q("Alcalde no cumple","I",5,"\u00bfQu\u00e9 si alcalde no cumple?",[o("Cabildo abierto o revocatoria.",True,"Exigir."),o("Nada.",False,"S\u00ed hay."),o("Irse del pa\u00eds.",False,"No."),o("Esperar.",False,"Acciones.")]),
Q("Parque en barrio","R",6,"\u00bfQu\u00e9 mecanismo para parque?",[o("Iniciativa popular o cabildo abierto.",True,"Proponer."),o("Esperar Presidente.",False,"Ineficiente."),o("Cerrar calle.",False,"No legal."),o("No hacer nada.",False,"Participar.")]),
])

# W19
gw("W19","El sufragio y la democracia","El sufragio como derecho y deber ciudadano","Este bundle explora el sufragio y la democracia.",[
Q("Sufragio","U",3,"\u00bfQu\u00e9 es el sufragio?",[o("Derecho a votar.",True,"Voto."),o("Impuesto.",False,"No."),o("Multa.",False,"No."),o("Examen.",False,"No.")]),
Q("Democracia","U",3,"\u00bfQu\u00e9 es la democracia?",[o("El pueblo elige gobernantes.",True,"Pueblo."),o("Gobierna un rey.",False,"Monarqu\u00eda."),o("Gobiernan militares.",False,"Dictadura."),o("Sin gobierno.",False,"No.")]),
Q("Voto y democracia","I",4,"\u00bfPor qu\u00e9 el voto es importante?",[o("Elegir representantes.",True,"Base democracia."),o("Obligatorio.",False,"No."),o("Divertido.",False,"Serio."),o("Solo ricos.",False,"Todos.")]),
Q("Voto libre","I",4,"\u00bfQu\u00e9 significa voto libre?",[o("Votar sin presiones.",True,"Derecho."),o("Gratuito.",False,"Gratis, no libre."),o("Varias veces.",False,"Fraude."),o("Solo adultos.",False,"Todos.")]),
Q("Democracia participativa","U",4,"Diferencia representativa vs participativa:",[o("Rep: elegimos. Part: decidimos.",True,"M\u00e1s all\u00e1."),o("Son iguales.",False,"No."),o("Part es votar.",False,"Rep."),o("Rep es cabildos.",False,"Part.")]),
Q("Edad para votar","R",4,"Edad para votar en Colombia:",[o("18 a\u00f1os.",True,"18."),o("15.",False,"18."),o("21.",False,"18."),o("25.",False,"18.")]),
Q("Voto como deber","I",5,"\u00bfPor qu\u00e9 votar es deber ciudadano?",[o("Participar en democracia.",True,"Contribuir."),o("Ir a c\u00e1rcel.",False,"No."),o("Pagan.",False,"No."),o("Tradici\u00f3n.",False,"C\u00edvico.")]),
Q("Democracia vs dictadura","R",5,"Diferencia democracia y dictadura:",[o("Democracia: pueblo elige. Dictadura: uno.",True,"Participaci\u00f3n."),o("Iguales.",False,"Opuestos."),o("Dictadura vota.",False,"No libre."),o("Democracia sin leyes.",False,"S\u00ed.")]),
Q("Todos deben votar","I",5,"\u00bfPor qu\u00e9 todos deben votar?",[o("Gobierno represente voluntad popular.",True,"Representaci\u00f3n."),o("Obligatorio.",False,"No."),o("Ganen los mismos.",False,"Democr\u00e1tico."),o("No pagar.",False,"No.")]),
Q("Motivar j\u00f3venes","R",6,"\u00bfC\u00f3mo motivar j\u00f3venes a votar?",[o("Campa\u00f1as educativas en colegios.",True,"Educaci\u00f3n."),o("Obligarlos.",False,"No democr\u00e1tico."),o("Dar dinero.",False,"Corrupci\u00f3n."),o("Que no importa.",False,"S\u00ed.")]),
])

# W20
gw("W20","Repaso general","Repaso general del a\u00f1o escolar","Repaso de conceptos clave.",[
Q("Unidad rural","U",3,"Unidad rural m\u00e1s peque\u00f1a:",[o("La vereda.",True,"Rural."),o("Municipio.",False,"Agrupa."),o("Departamento.",False,"Agrupa."),o("Corregimiento.",False,"Poblado.")]),
Q("Departamentos","U",3,"\u00bfCu\u00e1ntos departamentos?",[o("32 y Bogot\u00e1 D.C.",True,"32."),o("30.",False,"32."),o("35.",False,"32."),o("28.",False,"32.")]),
Q("Capital Antioquia","I",4,"Capital de Antioquia:",[o("Medell\u00edn.",True,"Antioquia."),o("Bogot\u00e1.",False,"Cundinamarca."),o("Cali.",False,"Valle."),o("Bucaramanga.",False,"Santander.")]),
Q("Capital Atl\u00e1ntico","I",4,"Capital del Atl\u00e1ntico:",[o("Barranquilla.",True,"Atl\u00e1ntico."),o("Cartagena.",False,"Bol\u00edvar."),o("Santa Marta.",False,"Magdalena."),o("Sincelejo.",False,"Sucre.")]),
Q("Autoridad nacional","U",4,"M\u00e1xima autoridad nacional:",[o("El Presidente.",True,"Nacional."),o("Alcalde.",False,"Municipal."),o("Gobernador.",False,"Departamental."),o("Senador.",False,"Legislador.")]),
Q("Autoridad municipal","R",4,"\u00bfQui\u00e9n gobierna municipio?",[o("El alcalde.",True,"Municipal."),o("Gobernador.",False,"Departamental."),o("Presidente.",False,"Nacional."),o("Concejal.",False,"Parte.")]),
Q("Autoridad departamental","I",5,"\u00bfQui\u00e9n gobierna departamento?",[o("El gobernador.",True,"Departamental."),o("Alcalde.",False,"Municipal."),o("Presidente.",False,"Nacional."),o("Diputado.",False,"Parte.")]),
Q("Mecanismo participaci\u00f3n","R",5,"Mecanismo de participaci\u00f3n:",[o("El voto.",True,"Principal."),o("Multa.",False,"No."),o("Impuesto.",False,"No."),o("Examen.",False,"No.")]),
Q("Importancia participar","I",5,"\u00bfPor qu\u00e9 participar?",[o("Construir democracia.",True,"Democracia."),o("Evitar problemas.",False,"Construir."),o("Divertido.",False,"Serio."),o("No importante.",False,"S\u00ed.")]),
Q("Proyecto comunitario","R",6,"Proyecto para mejorar comunidad:",[o("Jornada de limpieza con apoyo alcald\u00eda.",True,"Comunitario."),o("Esperar gobierno.",False,"Participar."),o("Mudarse.",False,"No."),o("No hacer nada.",False,"No.")]),
])

# W21
gw("W21","Patrimonio cultural material de Colombia","Monumentos, sitios hist\u00f3ricos, museos","Este bundle aborda el patrimonio cultural material de Colombia.",[
Q("Patrimonio material","U",3,"\u00bfQu\u00e9 es patrimonio material?",[o("Bienes tangibles como monumentos.",True,"F\u00edsicos."),o("Canciones.",False,"Inmaterial."),o("Bailes.",False,"Inmaterial."),o("Leyendas.",False,"Inmaterial.")]),
Q("Ciudades patrimonio","U",3,"Ciudad colombiana Patrimonio de la Humanidad:",[o("Cartagena.",True,"UNESCO."),o("Bogot\u00e1.",False,"No."),o("Medell\u00edn.",False,"No."),o("Barranquilla.",False,"No.")]),
Q("Museos","I",4,"\u00bfPara qu\u00e9 sirven los museos?",[o("Preservar y exhibir objetos hist\u00f3ricos.",True,"Conservan."),o("Vender comida.",False,"No."),o("Jugar f\u00fatbol.",False,"No."),o("Solo conciertos.",False,"Preservan.")]),
Q("Importancia patrimonio","I",4,"\u00bfPor qu\u00e9 conservar patrimonio material?",[o("Preserva historia e identidad.",True,"Identidad."),o("Vender boletos.",False,"No."),o("Por bonito.",False,"Hist\u00f3rico."),o("No importante.",False,"S\u00ed.")]),
Q("Monumentos","U",4,"\u00bfQu\u00e9 representan los monumentos?",[o("Personajes o eventos hist\u00f3ricos.",True,"Memoria."),o("Decoraci\u00f3n.",False,"Significado."),o("Publicidad.",False,"No."),o("Solo arte.",False,"Historia.")]),
Q("Santuario Las Lajas","R",4,"\u00bfD\u00f3nde est\u00e1 el Santuario de Las Lajas?",[o("En Nari\u00f1o.",True,"Nari\u00f1o."),o("Bogot\u00e1.",False,"Nari\u00f1o."),o("Medell\u00edn.",False,"No."),o("Cartagena.",False,"No.")]),
Q("Ciudad Perdida","I",5,"\u00bfQu\u00e9 es Ciudad Perdida?",[o("Sitio arqueol\u00f3gico Tayrona.",True,"Tayrona."),o("Ciudad moderna.",False,"Arqueol\u00f3gico."),o("Museo en Bogot\u00e1.",False,"Sierra Nevada."),o("Castillo colonial.",False,"Ind\u00edgena.")]),
Q("Arquitectura colonial","R",5,"\u00bfQu\u00e9 caracteriza la arquitectura colonial?",[o("Iglesias y casas de \u00e9poca espa\u00f1ola.",True,"Colonial."),o("Rascacielos.",False,"Moderno."),o("Casas ind\u00edgenas.",False,"Precolombino."),o("F\u00e1bricas.",False,"Industrial.")]),
Q("Cuidar patrimonio","I",5,"\u00bfC\u00f3mo cuidar el patrimonio?",[o("No da\u00f1ando monumentos.",True,"Responsable."),o("Pintando grafiti.",False,"Da\u00f1a."),o("Robando piezas.",False,"Ilegal."),o("Ignorando.",False,"Conservar.")]),
Q("Crear museo","R",6,"\u00bfQu\u00e9 museo crear\u00edas?",[o("Museo de historia local.",True,"Local."),o("Museo de tel\u00e9fonos.",False,"No."),o("No creo nada.",False,"Crear."),o("Solo virtual.",False,"Tambi\u00e9n f\u00edsico.")]),
])

# W22
gw("W22","Patrimonio cultural inmaterial (carnavales, fiestas)","Carnavales, fiestas, m\u00fasica, danzas","Este bundle explora patrimonio cultural inmaterial colombiano.",[
Q("Patrimonio inmaterial","U",3,"\u00bfQu\u00e9 es patrimonio inmaterial?",[o("Tradiciones, m\u00fasica y danzas.",True,"No tangible."),o("Monumentos.",False,"Material."),o("Edificios.",False,"Material."),o("Museos.",False,"Material.")]),
Q("Carnaval Barranquilla","U",3,"\u00bfQu\u00e9 es el Carnaval de Barranquilla?",[o("Fiesta popular m\u00e1s importante, declarada patrimonio.",True,"Patrimonio."),o("Desfile militar.",False,"Popular."),o("Feria de libros.",False,"Carnaval."),o("Concierto.",False,"Carnaval.")]),
Q("Feria de Cali","I",4,"\u00bfQu\u00e9 se celebra en la Feria de Cali?",[o("Salsa y eventos culturales en diciembre.",True,"Salsa."),o("Carnaval en febrero.",False,"Diciembre."),o("Independencia.",False,"Cultural."),o("Semana Santa.",False,"Cali.")]),
Q("Negros y Blancos","I",4,"\u00bfD\u00f3nde se celebra Negros y Blancos?",[o("En Pasto.",True,"Pasto."),o("Barranquilla.",False,"Pasto."),o("Cali.",False,"Pasto."),o("Bogot\u00e1.",False,"Pasto.")]),
Q("Vallenato","U",4,"\u00bfQu\u00e9 es el vallenato?",[o("G\u00e9nero musical del Caribe.",True,"Caribe."),o("Danza del Pac\u00edfico.",False,"Caribe."),o("Plato t\u00edpico.",False,"M\u00fasica."),o("Fiesta religiosa.",False,"M\u00fasica.")]),
Q("Cumbia","R",4,"\u00bfQu\u00e9 representa la cumbia?",[o("Danza tradicional con influencias africanas.",True,"Danza."),o("Edificio colonial.",False,"Danza."),o("Comida.",False,"M\u00fasica."),o("Deporte.",False,"Tradici\u00f3n.")]),
Q("Importancia patrimonio inmaterial","I",5,"\u00bfPor qu\u00e9 es importante el patrimonio inmaterial?",[o("Porque preserva identidad y tradiciones.",True,"Identidad."),o("Genera dinero.",False,"Cultural."),o("Es tur\u00edstico.",False,"Tambi\u00e9n."),o("No importante.",False,"S\u00ed.")]),
Q("Fiestas patronales","R",5,"\u00bfQu\u00e9 son fiestas patronales?",[o("Fiestas en honor a un santo patrono del pueblo.",True,"Tradici\u00f3n."),o("Fiestas nacionales.",False,"Locales."),o("Carnavales.",False,"Religiosas."),o("Conciertos.",False,"Fiesta.")]),
Q("Preservar tradiciones","I",5,"\u00bfC\u00f3mo preservar tradiciones inmateriales?",[o("Ense\u00f1\u00e1ndolas a ni\u00f1os y participando.",True,"Ense\u00f1ar."),o("Olvid\u00e1ndolas.",False,"No."),o("Prohibirlas.",False,"Preservar."),o("Solo grabarlas.",False,"Vivenciar.")]),
Q("Crear una fiesta","R",6,"\u00bfQu\u00e9 fiesta tradicional crear\u00edas?",[o("Fiesta de la cosecha local con m\u00fasica y danzas de la regi\u00f3n.",True,"Tradicional."),o("Fiesta de halloween.",False,"No local."),o("No crear\u00eda.",False,"S\u00ed."),o("Fiesta tecnol\u00f3gica.",False,"Tradicional.")]),
])

print("W18-W22 done!")
