#!/usr/bin/env python3
"""Generate W23-W30 bundles."""
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

# W23
gw("W23","Grupos \u00e9tnicos: ind\u00edgenas colombianos","Pueblos ind\u00edgenas de Colombia","Este bundle se centra en los pueblos ind\u00edgenas de Colombia.",[
Q("Pueblos ind\u00edgenas","U",3,"\u00bfQu\u00e9 son los pueblos ind\u00edgenas?",[o("Comunidades originarias con culturas y territorios ancestrales.",True,"Originarios."),o("Personas de otros pa\u00edses.",False,"Inmigrantes."),o("Grupos urbanos.",False,"No."),o("Turistas.",False,"No.")]),
Q("Resguardos","U",3,"\u00bfQu\u00e9 es un resguardo?",[o("Territorio colectivo de propiedad ind\u00edgena.",True,"Colectivo."),o("Edificio del gobierno.",False,"Territorio."),o("Escuela rural.",False,"No."),o("Parque nacional.",False,"Resguardo.")]),
Q("Lenguas ind\u00edgenas","I",4,"\u00bfCu\u00e1ntas lenguas ind\u00edgenas hay en Colombia?",[o("M\u00e1s de 60.",True,"60+."),o("Una sola.",False,"Muchas."),o("Ninguna.",False,"S\u00ed."),o("3.",False,"60+.")]),
Q("Cabildo ind\u00edgena","I",4,"\u00bfQu\u00e9 es un cabildo ind\u00edgena?",[o("Autoridad de gobierno de la comunidad.",True,"Autoridad."),o("Edificio colonial.",False,"No."),o("Fiesta.",False,"Gobierno."),o("Vivienda.",False,"Autoridad.")]),
Q("Minga","U",4,"\u00bfQu\u00e9 es la minga?",[o("Trabajo comunitario voluntario.",True,"Colectivo."),o("Una danza.",False,"Trabajo."),o("Comida.",False,"Trabajo."),o("Instrumento.",False,"No.")]),
Q("Ubicaci\u00f3n ind\u00edgenas","R",4,"\u00bfD\u00f3nde viven los ind\u00edgenas?",[o("En resguardos en Amazon\u00eda y Sierra Nevada.",True,"Resguardos."),o("Centro de Bogot\u00e1.",False,"Ancestrales."),o("Solo Caribe.",False,"Varias."),o("Fuera de Colombia.",False,"En Colombia.")]),
Q("Constituci\u00f3n ind\u00edgenas","I",5,"\u00bfQu\u00e9 reconoce la Constituci\u00f3n de 1991?",[o("Diversidad \u00e9tnica y territorios.",True,"Reconocimiento."),o("Que desaparezcan.",False,"Protege."),o("Sin derechos.",False,"Tienen."),o("Vivir en ciudades.",False,"Territorio.")]),
Q("Pueblos ind\u00edgenas importantes","R",5,"\u00bfQu\u00e9 pueblos ind\u00edgenas son importantes?",[o("Way\u00fau, Nasa, Ember\u00e1, Arhuaco.",True,"Importantes."),o("Espa\u00f1oles, franceses.",False,"No."),o("Afrocolombianos.",False,"Diferente."),o("ROM.",False,"Diferente.")]),
Q("Preservar cultura ind\u00edgena","I",5,"\u00bfPor qu\u00e9 preservar culturas ind\u00edgenas?",[o("Son parte de la identidad y diversidad colombiana.",True,"Riqueza."),o("Hablan ingl\u00e9s.",False,"No."),o("Modernas.",False,"Tradicionales."),o("No importante.",False,"S\u00ed.")]),
Q("Proyecto con ind\u00edgenas","R",6,"\u00bfQu\u00e9 proyecto har\u00edas con comunidad ind\u00edgena?",[o("Intercambio cultural para aprender.",True,"Intercambio."),o("Cambiar su cultura.",False,"Respeto."),o("Ignorarlos.",False,"Valorar."),o("Quitarles tierras.",False,"Ilegal.")]),
])

# W24
gw("W24","Grupos \u00e9tnicos: afrocolombianos y ROM","Afrocolombianos y ROM en Colombia","Este bundle aborda comunidades afrocolombianas y ROM.",[
Q("Afrocolombianos","U",3,"\u00bfQui\u00e9nes son los afrocolombianos?",[o("Descendientes de africanos de la colonia.",True,"Afro."),o("Personas de EE.UU.",False,"No."),o("Europeos del s.XX.",False,"Africanos."),o("Ind\u00edgenas.",False,"Diferente.")]),
Q("Territorios colectivos","U",3,"\u00bfQu\u00e9 son territorios colectivos afro?",[o("Tierras en propiedad de comunidades negras.",True,"Colectivo."),o("Parques nacionales.",False,"No."),o("Edificios.",False,"No."),o("Zonas urbanas.",False,"Rurales.")]),
Q("Pueblo ROM","I",4,"\u00bfQui\u00e9nes son los ROM?",[o("Comunidad gitana con tradiciones n\u00f3madas.",True,"Gitanos."),o("Tribu ind\u00edgena.",False,"Gitanos."),o("Asi\u00e1ticos.",False,"No."),o("Afrocolombianos.",False,"No.")]),
Q("Aportes afro","I",4,"\u00bfCu\u00e1l es aporte cultural afrocolombiano?",[o("Cumbia, currulao y marimba.",True,"M\u00fasica."),o("Solo vallenato.",False,"M\u00e1s."),o("Arquitectura colonial.",False,"Espa\u00f1ola."),o("Rascacielos.",False,"Moderno.")]),
Q("San Basilio de Palenque","U",4,"\u00bfQu\u00e9 es San Basilio de Palenque?",[o("Comunidad que conserva lengua y tradiciones africanas.",True,"Patrimonio."),o("Ciudad moderna.",False,"Hist\u00f3rica."),o("Un r\u00edo.",False,"Poblado."),o("Un museo.",False,"Comunidad.")]),
Q("D\u00eda Afrocolombianidad","R",4,"\u00bfCu\u00e1ndo se celebra el D\u00eda Afrocolombianidad?",[o("21 de mayo.",True,"Mayo 21."),o("20 de julio.",False,"Independencia."),o("7 de agosto.",False,"Boyac\u00e1."),o("25 diciembre.",False,"Navidad.")]),
Q("Ley 70 de 1993","I",5,"\u00bfQu\u00e9 reconoce la Ley 70?",[o("Derechos territoriales de comunidades negras.",True,"Comunidades."),o("Derechos ind\u00edgenas.",False,"Afro."),o("Educaci\u00f3n gratuita.",False,"Ley 70."),o("Voto femenino.",False,"No.")]),
Q("Organizaci\u00f3n ROM","R",5,"\u00bfC\u00f3mo se organizan los ROM?",[o("Grupos familiares con 'patrimonios'.",True,"ROM."),o("Resguardos.",False,"Ind\u00edgena."),o("Concejos.",False,"No."),o("Asambleas.",False,"No.")]),
Q("Valorar diversidad","I",5,"\u00bfPor qu\u00e9 valorar afrocolombianos y ROM?",[o("Enriquecen la diversidad cultural colombiana.",True,"Diversidad."),o("Son minor\u00eda.",False,"Valor cultural."),o("M\u00e1s derechos.",False,"Igualdad."),o("No importante.",False,"S\u00ed.")]),
Q("Proyecto contra discriminaci\u00f3n","R",6,"\u00bfQu\u00e9 proyecto contra discriminaci\u00f3n har\u00edas?",[o("Campa\u00f1a escolar sobre respeto a toda etnia.",True,"Inclusi\u00f3n."),o("Ignorar.",False,"Actuar."),o("Separar grupos.",False,"Integrar."),o("Prohibir tradiciones.",False,"Respetar.")]),
])

# W25
gw("W25","Repaso P4","Repaso del cuarto per\u00edodo","Repaso de patrimonio cultural y grupos \u00e9tnicos.",[
Q("Patrimonio material","U",3,"Ejemplo de patrimonio material:",[o("El Santuario de Las Lajas.",True,"Material."),o("El Carnaval.",False,"Inmaterial."),o("El vallenato.",False,"Inmaterial."),o("La cumbia.",False,"Inmaterial.")]),
Q("Patrimonio inmaterial","U",3,"Ejemplo de patrimonio inmaterial:",[o("El Carnaval de Barranquilla.",True,"Inmaterial."),o("La Catedral de Sal.",False,"Material."),o("Ciudad Perdida.",False,"Material."),o("El Museo del Oro.",False,"Material.")]),
Q("Ciudad Patrimonio","I",4,"Ciudad colombiana Patrimonio de la Humanidad:",[o("Cartagena.",True,"UNESCO."),o("Bogot\u00e1.",False,"No."),o("Medell\u00edn.",False,"No."),o("Cali.",False,"No.")]),
Q("Resguardos","I",4,"\u00bfQu\u00e9 son los resguardos?",[o("Territorios ind\u00edgenas colectivos.",True,"Colectivos."),o("Museos.",False,"No."),o("Parques.",False,"No."),o("Colegios.",False,"No.")]),
Q("Afrocolombianos","U",4,"\u00bfQui\u00e9nes son descendientes de africanos?",[o("Los afrocolombianos.",True,"Afro."),o("Los espa\u00f1oles.",False,"Europeos."),o("Los ind\u00edgenas.",False,"Originarios."),o("Los ROM.",False,"Gitanos.")]),
Q("Pueblo ROM","R",4,"\u00bfQui\u00e9nes son los gitanos en Colombia?",[o("El pueblo ROM.",True,"Gitanos."),o("Los afrocolombianos.",False,"No."),o("Los ind\u00edgenas.",False,"No."),o("Los mestizos.",False,"No.")]),
Q("Preservar patrimonio","I",5,"\u00bfPor qu\u00e9 preservar el patrimonio?",[o("Porque conserva la historia e identidad.",True,"Identidad."),o("Para ganar dinero.",False,"No solo."),o("Es moda.",False,"Historia."),o("No es necesario.",False,"S\u00ed.")]),
Q("Diversidad \u00e9tnica","R",5,"\u00bfQu\u00e9 caracteriza a Colombia \u00e9tnicamente?",[o("Es un pa\u00eds plurietnico y multicultural.",True,"Plural."),o("Todos son iguales.",False,"Diverso."),o("Solo ind\u00edgenas.",False,"Diverso."),o("Solo afro.",False,"Diverso.")]),
Q("Derechos \u00e9tnicos","I",5,"\u00bfQu\u00e9 reconoce la Constituci\u00f3n sobre \u00e9tnias?",[o("La diversidad \u00e9tnica y cultural.",True,"Reconocimiento."),o("Que no existen.",False,"S\u00ed."),o("Que deben desaparecer.",False,"Proteger."),o("Que son extranjeras.",False,"No.")]),
Q("Proyecto cultural","R",6,"\u00bfQu\u00e9 proyecto cultural har\u00edas?",[o("Feria de culturas ind\u00edgenas, afro y ROM en el colegio.",True,"Multicultural."),o("Solo una cultura.",False,"Todas."),o("No hacer nada.",False,"Participar."),o("Prohibir bailes.",False,"No.")]),
])

# W26
gw("W26","La Constituci\u00f3n Pol\u00edtica de 1991 (derechos)","La Constituci\u00f3n de 1991 y los derechos fundamentales","Este bundle explica la Constituci\u00f3n de 1991 y los derechos que establece.",[
Q("Constituci\u00f3n 1991","U",3,"\u00bfQu\u00e9 es la Constituci\u00f3n Pol\u00edtica?",[o("La ley de leyes que organiza el Estado colombiano.",True,"Ley fundamental."),o("Un libro de historia.",False,"No."),o("Una novela.",False,"Ley."),o("Un decreto del alcalde.",False,"Ley suprema.")]),
Q("Derechos fundamentales","U",3,"\u00bfQu\u00e9 son los derechos fundamentales?",[o("Derechos b\u00e1sicos de toda persona.",True,"B\u00e1sicos."),o("Privilegios del presidente.",False,"De todos."),o("Impuestos.",False,"No."),o("Multas.",False,"No.")]),
Q("Derecho a la vida","I",4,"\u00bfQu\u00e9 derecho es el m\u00e1s importante?",[o("El derecho a la vida.",True,"Fundamental."),o("Derecho a la televisi\u00f3n.",False,"No fundamental."),o("Derecho a no estudiar.",False,"No."),o("Derecho a votar a los 10.",False,"No.")]),
Q("Derecho a educaci\u00f3n","I",4,"\u00bfQu\u00e9 dice la Constituci\u00f3n sobre educaci\u00f3n?",[o("Es un derecho de todos los colombianos.",True,"Derecho."),o("Solo para ricos.",False,"Para todos."),o("No es obligatorio.",False,"Es derecho."),o("Solo en ciudades.",False,"Todos.")]),
Q("Derecho a salud","U",4,"\u00bfLa salud en Colombia es:",[o("Un derecho fundamental.",True,"Fundamental."),o("Un servicio opcional.",False,"Derecho."),o("Solo para adultos.",False,"Todos."),o("Un privilegio.",False,"Derecho.")]),
Q("Derechos ni\u00f1os","R",4,"\u00bfQu\u00e9 derechos especiales tienen los ni\u00f1os?",[o("A la vida, educaci\u00f3n, salud y protecci\u00f3n.",True,"Ni\u00f1os."),o("A trabajar desde los 5.",False,"Protecci\u00f3n."),o("A no estudiar.",False,"Educaci\u00f3n."),o("A votar.",False,"Adultos.")]),
Q("Derecho igualdad","I",5,"\u00bfQu\u00e9 significa igualdad ante la ley?",[o("Todos tenemos los mismos derechos sin discriminaci\u00f3n.",True,"Iguales."),o("Unos tienen m\u00e1s derechos.",False,"Igualdad."),o("Solo hombres tienen derechos.",False,"Todos."),o("Los ricos tienen m\u00e1s.",False,"Igualdad.")]),
Q("Derecho libre expresi\u00f3n","R",5,"\u00bfQu\u00e9 es la libertad de expresi\u00f3n?",[o("Derecho a expresar ideas libremente.",True,"Expresar."),o("Obligaci\u00f3n de callar.",False,"Expresar."),o("Solo escribir.",False,"Hablar y escribir."),o("Solo el presidente.",False,"Todos.")]),
Q("Proteger derechos","I",5,"\u00bfQu\u00e9 hacer si violan tus derechos?",[o("Acudir a un juez o a la Defensor\u00eda del Pueblo.",True,"Defensa."),o("Nada.",False,"Actuar."),o("Tomar justicia por mano propia.",False,"Legal."),o("Irse del pa\u00eds.",False,"Defensa.")]),
Q("Crear un derecho","R",6,"\u00bfQu\u00e9 nuevo derecho propondr\u00edas?",[o("Derecho a un ambiente sano y libre de contaminaci\u00f3n.",True,"Ambiente."),o("Derecho a no hacer tareas.",False,"No."),o("Derecho a comer dulces.",False,"Serio."),o("No crear\u00eda.",False,"Crear.")]),
])

# W27
gw("W27","La Constituci\u00f3n: deberes y mecanismos de protecci\u00f3n","Deberes ciudadanos y mecanismos de protecci\u00f3n de derechos","Este bundle aborda los deberes constitucionales y mecanismos como la tutela.",[
Q("Deberes ciudadanos","U",3,"\u00bfQu\u00e9 son los deberes ciudadanos?",[o("Obligaciones que tenemos como ciudadanos.",True,"Obligaciones."),o("Multas.",False,"Obligaciones."),o("Privilegios.",False,"Deberes."),o("Derechos.",False,"Deberes.")]),
Q("Cumplir la ley","U",3,"\u00bfCu\u00e1l es un deber b\u00e1sico?",[o("Cumplir la Constituci\u00f3n y las leyes.",True,"Cumplir."),o("No pagar impuestos.",False,"Obligaci\u00f3n."),o("Desobedecer.",False,"Cumplir."),o("Ignorar las normas.",False,"Obedecer.")]),
Q("Respetar derechos ajenos","I",4,"\u00bfQu\u00e9 deber tenemos con los derechos de otros?",[o("Respetarlos y no violarlos.",True,"Respetar."),o("Ignorarlos.",False,"No."),o("Violarlos.",False,"No."),o("Solo los nuestros.",False,"Todos.")]),
Q("Acci\u00f3n de tutela","I",4,"\u00bfQu\u00e9 es la acci\u00f3n de tutela?",[o("Mecanismo para proteger derechos fundamentales r\u00e1pidamente.",True,"Protecci\u00f3n."),o("Un impuesto.",False,"Mecanismo."),o("Una multa.",False,"No."),o("Un partido.",False,"Legal.")]),
Q("Pagar impuestos","U",4,"\u00bfPor qu\u00e9 pagar impuestos es un deber?",[o("Porque financian servicios p\u00fablicos y obras.",True,"Financian."),o("Porque es voluntario.",False,"Obligatorio."),o("Para enriquecer al presidente.",False,"Bienestar."),o("No es deber.",False,"S\u00ed.")]),
Q("Defender la patria","R",4,"\u00bfQu\u00e9 deber tenemos con Colombia?",[o("Defenderla en caso de necesidad.",True,"Patria."),o("No hacer nada.",False,"Defender."),o("Irse.",False,"Quedarse."),o("Cambiarla.",False,"Defender.")]),
Q("Proteger recursos","I",5,"\u00bfDeber con el medio ambiente?",[o("Proteger los recursos naturales.",True,"Ambiente."),o("Contaminar.",False,"No."),o("Talarlo todo.",False,"Proteger."),o("Ignorar.",False,"Actuar.")]),
Q("Mecanismos protecci\u00f3n","R",5,"\u00bfQu\u00e9 otro mecanismo protege derechos?",[o("El derecho de petici\u00f3n.",True,"Petici\u00f3n."),o("La multa.",False,"No."),o("El impuesto.",False,"No."),o("La c\u00e1rcel.",False,"Petici\u00f3n.")]),
Q("Deber solidaridad","I",5,"\u00bfQu\u00e9 significa ser solidario?",[o("Ayudar a quienes lo necesitan.",True,"Solidaridad."),o("Ser indiferente.",False,"No."),o("Pensar solo en uno.",False,"Solidaridad."),o("Competir.",False,"Ayudar.")]),
Q("Crear deber escolar","R",6,"\u00bfQu\u00e9 deber propondr\u00edas en tu colegio?",[o("Cuidar las instalaciones y no tirar basura.",True,"Cuidado."),o("No hacer caso.",False,"Cuidar."),o("Da\u00f1ar todo.",False,"No."),o("No propondr\u00eda.",False,"S\u00ed.")]),
])

print("W23-W27 done!")
