#!/usr/bin/env python3
"""Generate W16-W17 bundles for SOC-CIU G4."""
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
    L.append("---\n");L.append(f"# Bundle Mastery: {tema}\n");L.append(intro)
    for i,q in enumerate(qlist):
        L.append("---\n");L.append(f"## Question {i+1} [D{q['d']}]\n")
        L.append(f"**ID:** `{bid}-v{i+1}`");L.append(f"**Bloom:** [{q['bloom']}]");L.append(f"**ICFES:** [{q['icfes']}]")
        L.append(f"**Context:** {q['ctx']}\n");L.append("### Enunciado");L.append(q['stem'])
        L.append("### Options\n")
        opts=list(q['opts']);cp=i%4
        if opts[cp][1]!=True:
            for ix,(_,ok,_) in enumerate(opts):
                if ok:opts[cp],opts[ix]=opts[ix],opts[cp];break
        for ix,(ot,ok,fb) in enumerate(opts):
            L.append(f"- {'[x]' if ok else '[ ]'} {label(ix)}) {ot} <!-- feedback: {fb} -->")
        L.append("");L.append("### Explicaci\u00f3n Pedag\u00f3gica");L.append(q['exp'])
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

# W16 - La descentralizacion
gw("W16","La descentralizacion en Colombia","Descentralizacion territorial en Colombia","Este bundle explica la descentralizacion y la autonomia de las entidades territoriales.",[
Q("Descentralizacion","U",3,"Que es la descentralizacion?",
[o("Transferir funciones del gobierno central a entidades locales.",True,"Descentralizar."),o("Concentrar todo el poder en el presidente.",False,"Centralizar."),o("Eliminar los municipios.",False,"No."),o("Unificar todas las leyes.",False,"No.")]),
Q("Entidades territoriales","U",3,"Cuales son entidades territoriales?",
[o("Departamentos, municipios y distritos.",True,"Entidades."),o("Solo la nacion.",False,"Mas."),o("Empresas privadas.",False,"Publicas."),o("Colegios.",False,"No.")]),
Q("Autonomia municipal","I",4,"Que pueden hacer los municipios autonomamente?",
[o("Administrar sus recursos y elegir su alcalde.",True,"Autonomia."),o("Declarar la guerra.",False,"No."),o("Crear leyes nacionales.",False,"No."),o("Elegir presidente.",False,"No.")]),
Q("Transferencias","I",4,"Que son las transferencias del gobierno central?",
[o("Recursos enviados a regiones para educacion y salud.",True,"Transferencias."),o("Impuestos locales.",False,"Nacionales."),o("Prestamos bancarios.",False,"No."),o("Donaciones.",False,"Recursos.")]),
Q("Sistema General Regalias","U",4,"Que financia el Sistema General de Regalias?",
[o("Proyectos de desarrollo regional.",True,"Regalias."),o("Sueldos del presidente.",False,"No."),o("Gastos militares.",False,"No."),o("Compra de armas.",False,"No.")]),
Q("Descentralizacion fiscal","R",4,"Que implica la descentralizacion fiscal?",
[o("Que las regiones recauden y administren parte de los impuestos.",True,"Fiscal."),o("Que todo lo maneje el gobierno central.",False,"No."),o("Que no haya impuestos.",False,"No."),o("Solo el presidente decide.",False,"No.")]),
Q("Ley de Ordenamiento Territorial","I",5,"Que busca la Ley de Ordenamiento Territorial?",
[o("Organizar el uso del suelo y el desarrollo regional.",True,"LOT."),o("Centralizar el poder.",False,"No."),o("Eliminar departamentos.",False,"No."),o("Crear impuestos.",False,"No.")]),
Q("Eficiencia descentralizacion","R",5,"Por que la descentralizacion mejora la eficiencia?",
[o("Porque las autoridades locales conocen mejor sus necesidades.",True,"Eficiencia."),o("Porque el presidente puede decidir todo.",False,"No."),o("Porque elimina gobernadores.",False,"No."),o("No mejora nada.",False,"Si.")]),
Q("Desafios descentralizacion","I",5,"Cual es un desafio de la descentralizacion?",
[o("Que algunas regiones no tengan suficientes recursos.",True,"Desafio."),o("Que el presidente pierda poder.",False,"No."),o("Que desaparezcan los departamentos.",False,"No."),o("Que todos se vuelvan independientes.",False,"No.")]),
Q("Proyecto descentralizacion","R",6,"Que proyecto harian para mejorar su municipio?",
[o("Proponer un proyecto de reciclaje con recursos locales.",True,"Proyecto local."),o("Esperar que el gobierno central haga todo.",False,"No."),o("No hacer nada.",False,"Participar."),o("Quejarse solamente.",False,"Actuar.")]),
])

# W17 - Repaso P3
gw("W17","Repaso P3","Repaso del tercer periodo: gobierno y autoridades","Repaso de gobierno nacional, municipal, departamental y descentralizacion.",[
Q("Gobierno Nacional","U",3,"Quien lidera el gobierno nacional?",
[o("El Presidente de la Republica.",True,"Presidente."),o("El alcalde.",False,"Local."),o("El gobernador.",False,"Dep."),o("El concejal.",False,"No.")]),
Q("Ministros","U",3,"Quienes ayudan al presidente?",
[o("Los ministros.",True,"Ministros."),o("Los concejales.",False,"No."),o("Los alcaldes.",False,"No."),o("Los ediles.",False,"No.")]),
Q("Alcalde","I",4,"Que hace el alcalde?",
[o("Administrar el municipio y ejecutar proyectos locales.",True,"Municipal."),o("Gobernar el departamento.",False,"Dep."),o("Hacer leyes nacionales.",False,"No."),o("Elegir presidente.",False,"No.")]),
Q("Concejo municipal","I",4,"Que hace el concejo municipal?",
[o("Vigilar al alcalde y aprobar proyectos locales.",True,"Concejo."),o("Gobernar el pais.",False,"No."),o("Elegir gobernador.",False,"No."),o("Juzgar delitos.",False,"No.")]),
Q("Gobernador","U",4,"Quien gobierna el departamento?",
[o("El gobernador.",True,"Dep."),o("El alcalde.",False,"Municipal."),o("El presidente.",False,"Nacional."),o("El concejal.",False,"Municipal.")]),
Q("Asamblea departamental","R",4,"Que hace la asamblea departamental?",
[o("Aprobar ordenanzas y controlar al gobernador.",True,"Asamblea."),o("Hacer leyes nacionales.",False,"Congreso."),o("Juzgar delitos.",False,"Judicial."),o("Administrar el municipio.",False,"Municipal.")]),
Q("Descentralizacion","I",5,"Que permite la descentralizacion?",
[o("Que las regiones tengan autonomia para administrarse.",True,"Autonomia."),o("Que el presidente lo decida todo.",False,"No."),o("Eliminar los municipios.",False,"No."),o("Centralizar el poder.",False,"No.")]),
Q("Autoridad corregimiento","R",5,"Quien es la autoridad en un corregimiento?",
[o("El corregidor.",True,"Corregimiento."),o("El alcalde.",False,"Municipal."),o("El gobernador.",False,"Dep."),o("El presidente.",False,"Nacional.")]),
Q("Importancia autoridades","I",5,"Por que son importantes las autoridades locales?",
[o("Porque atienden las necesidades cercanas de la comunidad.",True,"Cercanas."),o("No son importantes.",False,"Si."),o("Solo el presidente importa.",False,"No."),o("Son decorativas.",False,"No.")]),
Q("Proyecto civico","R",6,"Que proyecto harian para conocer mejor a sus autoridades?",
[o("Invitar al alcalde al colegio para que explique su trabajo.",True,"Participacion."),o("Ignorar a las autoridades.",False,"No."),o("Quejarse sin proponer.",False,"No."),o("No hacer nada.",False,"Participar.")]),
])

print("W16-W17 done!")
