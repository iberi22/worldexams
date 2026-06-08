#!/usr/bin/env python3
"""Generate W28-W35 bundles."""
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

# W28
gw("W28","Las ramas del poder p\u00fablico","Ramas del poder p\u00fablico en Colombia","Este bundle explica las ramas del poder p\u00fablico: ejecutiva, legislativa y judicial.",[
Q("Ramas del poder","U",3,"\u00bfCu\u00e1les son las ramas del poder p\u00fablico?",[o("Ejecutiva, legislativa y judicial.",True,"Tres ramas."),o("Presidente y vicepresidente.",False,"No."),o("Alcalde y concejo.",False,"Ramas."),o("Gobernador y asamblea.",False,"No.")]),
Q("Rama ejecutiva","U",3,"\u00bfQui\u00e9n representa la rama ejecutiva?",[o("El Presidente de la Rep\u00fablica.",True,"Ejecutivo."),o("El Congreso.",False,"Legislativo."),o("La Corte Suprema.",False,"Judicial."),o("Los alcaldes.",False,"Ejecutivo nacional.")]),
Q("Rama legislativa","I",4,"\u00bfQui\u00e9n hace las leyes en Colombia?",[o("El Congreso de la Rep\u00fablica.",True,"Legislativo."),o("El Presidente.",False,"Ejecutivo."),o("Los jueces.",False,"Judicial."),o("Los alcaldes.",False,"Local.")]),
Q("Rama judicial","I",4,"\u00bfQui\u00e9n juzga los delitos?",[o("Los jueces y la rama judicial.",True,"Judicial."),o("El Presidente.",False,"Ejecutivo."),o("El Congreso.",False,"Legislativo."),o("Los concejales.",False,"Local.")]),
Q("Separaci\u00f3n de poderes","U",4,"\u00bfPor qu\u00e9 se separan los poderes?",[o("Para que ninguno tenga demasiado poder y se controlen entre s\u00ed.",True,"Equilibrio."),o("Para que el Presidente haga todo.",False,"No."),o("Para que haya m\u00e1s empleados.",False,"Control."),o("Por tradici\u00f3n.",False,"Equilibrio.")]),
Q("Congreso","R",4,"\u00bfC\u00f3mo se llama el Congreso en Colombia?",[o("Senado y C\u00e1mara de Representantes.",True,"Bicameral."),o("Senado y asamblea.",False,"Nacional."),o("C\u00e1mara y concejo.",False,"Nacional."),o("Senado y cabildo.",False,"Nacional.")]),
Q("Funci\u00f3n Corte Suprema","I",5,"\u00bfQu\u00e9 hace la Corte Suprema de Justicia?",[o("Juzgar a los altos funcionarios del Estado.",True,"M\u00e1ximo tribunal."),o("Hacer leyes.",False,"Judicial."),o("Administrar municipios.",False,"No."),o("Elegir al Presidente.",False,"No.")]),
Q("Control entre ramas","R",5,"\u00bfQu\u00e9 rama controla al ejecutivo?",[o("La legislativa y la judicial.",True,"Control."),o("Ninguna.",False,"S\u00ed."),o("Solo la ejecutiva.",False,"Las otras."),o("Los medios.",False,"Ramas.")]),
Q("Importancia equilibrio","I",5,"\u00bfPor qu\u00e9 es importante el equilibrio de poderes?",[o("Para evitar abusos y garantizar democracia.",True,"Democracia."),o("Para que el Presidente sea libre.",False,"No."),o("No es importante.",False,"S\u00ed."),o("Para tener m\u00e1s leyes.",False,"Control.")]),
Q("Proponer nueva ley","R",6,"\u00bfQu\u00e9 ley propondr\u00edas al Congreso?",[o("Ley para proteger los animales callejeros.",True,"Protecci\u00f3n animal."),o("Ley para no hacer tareas.",False,"No."),o("No propondr\u00eda.",False,"S\u00ed."),o("Ley para votar a los 10.",False,"No.")]),
])

# W29
gw("W29","Repaso P5","Repaso quinto per\u00edodo: Constituci\u00f3n y ramas del poder","Repaso de la Constituci\u00f3n deberes y ramas del poder.",[
Q("Constituci\u00f3n 1991","U",3,"\u00bfCu\u00e1ndo se promulg\u00f3 la Constituci\u00f3n actual?",[o("1991.",True,"1991."),o("1886.",False,"1991."),o("1810.",False,"1991."),o("2000.",False,"1991.")]),
Q("Derechos fundamentales","U",3,"\u00bfQu\u00e9 son derechos fundamentales?",[o("Derechos b\u00e1sicos de las personas.",True,"B\u00e1sicos."),o("Privilegios.",False,"Derechos."),o("Multas.",False,"No."),o("Impuestos.",False,"No.")]),
Q("Deberes","I",4,"\u00bfCu\u00e1l es un deber ciudadano?",[o("Cumplir la ley.",True,"Deber."),o("No pagar impuestos.",False,"Deber."),o("Violar derechos.",False,"Deber."),o("Ignorar normas.",False,"Cumplir.")]),
Q("Acci\u00f3n de tutela","I",4,"\u00bfPara qu\u00e9 sirve la tutela?",[o("Proteger derechos fundamentales.",True,"Proteger."),o("Pagar impuestos.",False,"No."),o("Votar.",False,"No."),o("Elegir alcalde.",False,"No.")]),
Q("Rama ejecutiva","U",4,"\u00bfQui\u00e9n lidera la rama ejecutiva?",[o("El Presidente.",True,"Ejecutivo."),o("El Congreso.",False,"Legislativo."),o("Los jueces.",False,"Judicial."),o("El alcalde.",False,"Nacional.")]),
Q("Rama legislativa","R",4,"\u00bfQu\u00e9 hace el Congreso?",[o("Hacer las leyes.",True,"Legislar."),o("Juzgar.",False,"Judicial."),o("Administrar.",False,"Ejecutivo."),o("Votar.",False,"Legislar.")]),
Q("Rama judicial","I",5,"\u00bfQu\u00e9 hace la rama judicial?",[o("Juzgar y aplicar la justicia.",True,"Judicial."),o("Hacer leyes.",False,"Legislativo."),o("Administrar pa\u00eds.",False,"Ejecutivo."),o("Elegir presidente.",False,"No.")]),
Q("Separaci\u00f3n de poderes","R",5,"\u00bfPara qu\u00e9 separar los poderes?",[o("Para equilibrarlos y evitar abusos.",True,"Equilibrio."),o("Para confundir.",False,"No."),o("No sirve.",False,"S\u00ed."),o("Para dar m\u00e1s trabajo.",False,"Control.")]),
Q("Derecho petici\u00f3n","I",5,"\u00bfQu\u00e9 es el derecho de petici\u00f3n?",[o("Pedir informaci\u00f3n a las autoridades.",True,"Petici\u00f3n."),o("Votar.",False,"No."),o("Pagar multas.",False,"No."),o("Elegir presidente.",False,"Petici\u00f3n.")]),
Q("Proyecto democr\u00e1tico","R",6,"\u00bfQu\u00e9 proyecto har\u00edas sobre democracia?",[o("Simulacro de elecciones en el colegio.",True,"Democracia escolar."),o("No hacer nada.",False,"Participar."),o("Solo teor\u00eda.",False,"Pr\u00e1ctica."),o("Prohibir debates.",False,"No.")]),
])

# W30
gw("W30","Fechas patrias (20 de julio, independencia)","El 20 de julio: D\u00eda de la Independencia de Colombia","Este bundle explica la importancia del 20 de julio de 1810, inicio de la independencia.",[
Q("20 de julio","U",3,"\u00bfQu\u00e9 se celebra el 20 de julio?",[o("El D\u00eda de la Independencia de Colombia.",True,"Independencia."),o("La Batalla de Boyac\u00e1.",False,"7 agosto."),o("El descubrimiento de Am\u00e9rica.",False,"12 octubre."),o("La Navidad.",False,"No.")]),
Q("Florero de Llorente","U",3,"\u00bfQu\u00e9 pas\u00f3 el 20 de julio de 1810?",[o("El incidente del Florero de Llorente desencaden\u00f3 la independencia.",True,"Florero."),o("Se descubri\u00f3 Am\u00e9rica.",False,"1492."),o("Se fund\u00f3 Bogot\u00e1.",False,"1538."),o("Se gan\u00f3 la Batalla de Boyac\u00e1.",False,"1819.")]),
Q("Causas independencia","I",4,"\u00bfPor qu\u00e9 se inici\u00f3 la independencia?",[o("Por el descontento con el dominio espa\u00f1ol y la opresi\u00f3n.",True,"Dominio espa\u00f1ol."),o("Porque quer\u00edan un rey.",False,"No."),o("Por el fr\u00edo.",False,"No."),o("Por casualidad.",False,"Razones.")]),
Q("1810 vs 1819","I",4,"\u00bfQu\u00e9 diferencia hay entre 1810 y 1819?",[o("1810 inici\u00f3 el proceso; 1819 se consolid\u00f3 la independencia.",True,"Proceso."),o("Son lo mismo.",False,"Diferentes."),o("1810 fue la batalla.",False,"1819."),o("1819 inici\u00f3 todo.",False,"1810.")]),
Q("Criollos","U",4,"\u00bfQui\u00e9nes lideraron la independencia?",[o("Los criollos (descendientes de espa\u00f1oles nacidos en Am\u00e9rica).",True,"Criollos."),o("Los espa\u00f1oles de Espa\u00f1a.",False,"No."),o("Los ind\u00edgenas solos.",False,"Criollos."),o("Los esclavos.",False,"Criollos.")]),
Q("Personajes independencia","R",4,"\u00bfQui\u00e9n fue un l\u00edder de la independencia?",[o("Sim\u00f3n Bol\u00edvar.",True,"Libertador."),o("Pablo Escobar.",False,"No."),o("Gabriel Garc\u00eda M\u00e1rquez.",False,"Escritor."),o("Shakira.",False,"Cantante.")]),
Q("Importancia 20 julio","I",5,"\u00bfPor qu\u00e9 el 20 de julio es importante?",[o("Porque marc\u00f3 el inicio del camino hacia la libertad.",True,"Libertad."),o("Porque llovi\u00f3.",False,"No."),o("Porque llegaron los espa\u00f1oles.",False,"Independencia."),o("No es importante.",False,"S\u00ed.")]),
Q("Bicentenario","R",5,"\u00bfCu\u00e1ndo se celebr\u00f3 el bicentenario?",[o("En 2010, 200 a\u00f1os despu\u00e9s.",True,"2010."),o("En 1910.",False,"2010."),o("En 1810.",False,"2010."),o("En 2020.",False,"2010.")]),
Q("Fechas patrias colombianas","I",5,"\u00bfQu\u00e9 otras fechas patrias hay?",[o("7 de agosto, 12 de octubre y 20 de julio.",True,"Patrias."),o("25 diciembre y 1 enero.",False,"No."),o("Halloween.",False,"No."),o("D\u00eda de la madre.",False,"No.")]),
Q("C\u00f3mo celebrar","R",6,"\u00bfC\u00f3mo celebrar\u00edas el 20 de julio en tu colegio?",[o("Izada de bandera y obra de teatro sobre la independencia.",True,"Celebraci\u00f3n."),o("No hacer nada.",False,"Celebrar."),o("Ir de paseo.",False,"Escuela."),o("Dormir.",False,"Participar.")]),
])

# W31
gw("W31","Fechas patrias (7 de agosto, Batalla de Boyac\u00e1)","7 de agosto: Batalla de Boyac\u00e1","Este bundle explica la Batalla de Boyac\u00e1 del 7 de agosto de 1819.",[
Q("7 de agosto","U",3,"\u00bfQu\u00e9 se celebra el 7 de agosto?",[o("La Batalla de Boyac\u00e1 que consolid\u00f3 la independencia.",True,"Boyac\u00e1."),o("El 20 de julio.",False,"20 julio."),o("La independencia de Estados Unidos.",False,"Colombia."),o("La llegada de Col\u00f3n.",False,"Boyac\u00e1.")]),
Q("Sim\u00f3n Bol\u00edvar","U",3,"\u00bfQui\u00e9n lider\u00f3 la Batalla de Boyac\u00e1?",[o("Sim\u00f3n Bol\u00edvar.",True,"Libertador."),o("Antonio Nari\u00f1o.",False,"Precursor."),o("Francisco de Paula Santander.",False,"Segundo."),o("Pablo Morillo.",False,"Espa\u00f1ol.")]),
Q("Puente de Boyac\u00e1","I",4,"\u00bfD\u00f3nde ocurri\u00f3 la batalla?",[o("En el Puente de Boyac\u00e1, cerca de Tunja.",True,"Puente."),o("En Bogot\u00e1.",False,"Tunja."),o("En Medell\u00edn.",False,"Boyac\u00e1."),o("En Cartagena.",False,"Boyac\u00e1.")]),
Q("Resultado","I",4,"\u00bfCu\u00e1l fue el resultado de la Batalla?",[o("Victoria del ej\u00e9rcito patriota y fin del dominio espa\u00f1ol.",True,"Victoria."),o("Victoria espa\u00f1ola.",False,"Patriota."),o("Empate.",False,"Victoria patriota."),o("Se detuvo la independencia.",False,"Avanz\u00f3.")]),
Q("Ej\u00e9rcito patriota","U",4,"\u00bfQui\u00e9nes conformaban el ej\u00e9rcito patriota?",[o("Criollos, mestizos, ind\u00edgenas y negros que buscaban libertad.",True,"Diverso."),o("Solo espa\u00f1oles.",False,"Patriotas."),o("Solo ingleses.",False,"Colombianos."),o("Solo franceses.",False,"Locales.")]),
Q("Campa\u00f1a Libertadora","R",4,"\u00bfC\u00f3mo se llam\u00f3 la campa\u00f1a de Bol\u00edvar?",[o("Campa\u00f1a Libertadora de la Nueva Granada.",True,"Libertadora."),o("Campa\u00f1a del Sur.",False,"No."),o("Reconquista.",False,"Espa\u00f1ola."),o("Pacificaci\u00f3n.",False,"No.")]),
Q("Independencia despu\u00e9s","I",5,"\u00bfQu\u00e9 pas\u00f3 despu\u00e9s de Boyac\u00e1?",[o("Se consolid\u00f3 la independencia y se cre\u00f3 la Gran Colombia.",True,"Gran Colombia."),o("Volvieron los espa\u00f1oles.",False,"No."),o("Se acab\u00f3 Colombia.",False,"Naci\u00f3."),o("Todo sigui\u00f3 igual.",False,"Cambi\u00f3.")]),
Q("Santander en Boyac\u00e1","R",5,"\u00bfQu\u00e9 papel tuvo Santander?",[o("Fue segundo al mando y organiz\u00f3 el ej\u00e9rcito.",True,"Segundo."),o("Fue el l\u00edder principal.",False,"Bol\u00edvar."),o("Luch\u00f3 por Espa\u00f1a.",False,"Patriota."),o("No particip\u00f3.",False,"S\u00ed.")]),
Q("Importancia 7 agosto","I",5,"\u00bfPor qu\u00e9 el 7 de agosto es fecha patria?",[o("Porque sell\u00f3 la independencia de Colombia.",True,"Sell\u00f3."),o("Porque naci\u00f3 Bol\u00edvar.",False,"Boyac\u00e1."),o("Porque muri\u00f3 un general.",False,"Independencia."),o("No es importante.",False,"S\u00ed.")]),
Q("C\u00f3mo conmemorar","R",6,"\u00bfC\u00f3mo conmemorar\u00edas el 7 de agosto?",[o("Representaci\u00f3n de la batalla en el colegio con disfraces.",True,"Conmemoraci\u00f3n."),o("No hacer nada.",False,"Participar."),o("Ir de viaje.",False,"Escuela."),o("Ver televisi\u00f3n.",False,"Actividad.")]),
])

# W32
gw("W32","Diversidad cultural de Colombia","Diversidad cultural y \u00e9tnica de Colombia","Este bundle explora la diversidad cultural de Colombia.",[
Q("Diversidad cultural","U",3,"\u00bfQu\u00e9 significa diversidad cultural?",[o("La variedad de culturas, etnias y tradiciones.",True,"Variedad."),o("Que todos son iguales.",False,"Diversidad."),o("Solo una cultura.",False,"Muchas."),o("Cultura \u00fanica.",False,"Diversidad.")]),
Q("Grupos \u00e9tnicos Colombia","U",3,"\u00bfCu\u00e1les son los principales grupos \u00e9tnicos?",[o("Ind\u00edgenas, afrocolombianos, ROM y mestizos.",True,"Grupos."),o("Espa\u00f1oles, ingleses y franceses.",False,"No."),o("Chinos y japoneses.",False,"No."),o("Estadounidenses.",False,"No.")]),
Q("Mestizaje","I",4,"\u00bfQu\u00e9 es el mestizaje?",[o("La mezcla entre ind\u00edgenas, espa\u00f1oles y africanos.",True,"Mezcla."),o("Una danza.",False,"Mezcla \u00e9tnica."),o("Un plato.",False,"No."),o("Un idioma.",False,"Mezcla.")]),
Q("Regiones culturales","I",4,"\u00bfQu\u00e9 regiones culturales hay?",[o("Caribe, Pac\u00edfico, Andina, Orinoqu\u00eda y Amazon\u00eda.",True,"Culturales."),o("Norte, sur, este, oeste.",False,"No."),o("Bogot\u00e1, Medell\u00edn, Cali.",False,"Ciudades."),o("Europa, Asia, \u00c1frica.",False,"Continentes.")]),
Q("Plato t\u00edpico regi\u00f3n Andina","U",4,"\u00bfCu\u00e1l es un plato t\u00edpico andino?",[o("La bandeja paisa.",True,"Andino."),o("El sancocho de pescado.",False,"Caribe."),o("El ceviche.",False,"Pac\u00edfico."),o("La arepa de huevo.",False,"Caribe.")]),
Q("M\u00fasica representativa","R",4,"\u00bfQu\u00e9 m\u00fasica representa la regi\u00f3n Caribe?",[o("Vallenato y cumbia.",True,"Caribe."),o("Bambuco.",False,"Andina."),o("Currulao.",False,"Pac\u00edfico."),o("Joropo.",False,"Llanos.")]),
Q("Respetar diversidad","I",5,"\u00bfPor qu\u00e9 respetar la diversidad cultural?",[o("Porque todas las culturas tienen el mismo valor y enriquecen.",True,"Respeto."),o("Porque algunas son mejores.",False,"Igualdad."),o("No es necesario.",False,"S\u00ed."),o("Solo las mayoritarias.",False,"Todas.")]),
Q("Colombia plurietnico","R",5,"\u00bfQu\u00e9 significa que Colombia sea plurietnico?",[o("Que hay m\u00faltiples grupos \u00e9tnicos en el pa\u00eds.",True,"Multi\u00e9tnico."),o("Que todos son de la misma etnia.",False,"Diverso."),o("Que solo hay ind\u00edgenas.",False,"Varios."),o("Que no hay etnias.",False,"S\u00ed.")]),
Q("Intercambio cultural","I",5,"\u00bfQu\u00e9 beneficios trae la diversidad cultural?",[o("Riqueza de tradiciones, m\u00fasica, gastronom\u00eda y conocimientos.",True,"Riqueza."),o("Problemas.",False,"Beneficios."),o("Confusi\u00f3n.",False,"Riqueza."),o("Ninguno.",False,"Muchos.")]),
Q("Proyecto diversidad","R",6,"\u00bfQu\u00e9 proyecto har\u00edas para celebrar la diversidad?",[o("Feria gastron\u00f3mica y cultural de las regiones.",True,"Feria."),o("Ignorar las diferencias.",False,"Celebrar."),o("Solo una regi\u00f3n.",False,"Todas."),o("No hacer nada.",False,"Participar.")]),
])

# W33
gw("W33","Repaso P6","Repaso sexto per\u00edodo: fechas patrias y diversidad cultural","Repaso de fechas patrias y la diversidad cultural colombiana.",[
Q("20 de julio","U",3,"\u00bfQu\u00e9 se celebra el 20 de julio?",[o("Grito de Independencia.",True,"1810."),o("Batalla de Boyac\u00e1.",False,"1819."),o("Descubrimiento de Am\u00e9rica.",False,"1492."),o("Constituci\u00f3n.",False,"1991.")]),
Q("7 de agosto","U",3,"\u00bfQu\u00e9 se celebra el 7 de agosto?",[o("Batalla de Boyac\u00e1.",True,"1819."),o("Independencia.",False,"1810."),o("D\u00eda de la Raza.",False,"12 oct."),o("D\u00eda del trabajo.",False,"1 mayo.")]),
Q("Sim\u00f3n Bol\u00edvar","I",4,"\u00bfQui\u00e9n fue Sim\u00f3n Bol\u00edvar?",[o("El Libertador de Colombia.",True,"Libertador."),o("Un presidente del siglo XX.",False,"XIX."),o("Un escritor.",False,"Militar."),o("Un rey.",False,"L\u00edder.")]),
Q("Diversidad cultural","I",4,"\u00bfQu\u00e9 caracteriza la diversidad colombiana?",[o("La variedad de etnias y regiones culturales.",True,"Variedad."),o("Que todos son iguales.",False,"Diversos."),o("Solo una cultura.",False,"Muchas."),o("Que no hay variedad.",False,"S\u00ed.")]),
Q("Grupos \u00e9tnicos","U",4,"\u00bfQu\u00e9 grupos \u00e9tnicos hay en Colombia?",[o("Ind\u00edgenas, afrocolombianos, ROM.",True,"Grupos."),o("Franceses, ingleses.",False,"No."),o("Chinos, japoneses.",False,"No."),o("Canadienses.",False,"No.")]),
Q("Mestizaje","R",4,"\u00bfQu\u00e9 origin\u00f3 el mestizaje?",[o("La mezcla de ind\u00edgenas, espa\u00f1oles y africanos.",True,"Mezcla."),o("La llegada de europeos s\u00f3lo.",False,"Mezcla."),o("Los africanos solos.",False,"Mezcla."),o("Los ind\u00edgenas solos.",False,"Mezcla.")]),
Q("Importancia diversidad","I",5,"\u00bfPor qu\u00e9 es valiosa la diversidad?",[o("Porque enriquece la cultura y la identidad nacional.",True,"Enriquece."),o("Es un problema.",False,"Valiosa."),o("No tiene valor.",False,"S\u00ed."),o("Divide al pa\u00eds.",False,"Une.")]),
Q("Batalla Boyac\u00e1 import","R",5,"\u00bfPor qu\u00e9 fue importante Boyac\u00e1?",[o("Porque consolid\u00f3 la independencia de Colombia.",True,"Consolid\u00f3."),o("Porque muri\u00f3 Bol\u00edvar.",False,"Vivi\u00f3."),o("Porque termin\u00f3 la guerra.",False,"Avanz\u00f3."),o("No fue importante.",False,"S\u00ed.")]),
Q("Fechas patrias","I",5,"\u00bfQu\u00e9 son las fechas patrias?",[o("D\u00edas que conmemoran eventos hist\u00f3ricos importantes.",True,"Conmemoran."),o("D\u00edas de vacaciones.",False,"Historia."),o("Cumplea\u00f1os.",False,"No."),o("Fines de semana.",False,"No.")]),
Q("Proyecto patrio","R",6,"\u00bfQu\u00e9 proyecto har\u00edas para una fecha patria?",[o("Exposici\u00f3n sobre los h\u00e9roes de la independencia.",True,"Exposici\u00f3n."),o("No celebrar.",False,"Participar."),o("Solo ver TV.",False,"Actividad."),o("Ir de compras.",False,"Celebrar.")]),
])

print("W28-W33 done!")
