#!/usr/bin/env python3
"""
Generate Lectura Critica Grado 4 weekly packs W02-W40.
W01 already exists. This script generates the remaining 39 bundles.
"""
import os

OUT = r"E:\scripts-python\worldexams\questions_data\colombia\lectura-critica\grado-4\2026\weekly"

def front(week, tema, title, rubric, rate):
    return f"""---
id: "CO-LEC-4-2026-{week}-{tema}-001-MASTERY"
country: "colombia"
grado: 4
asignatura: "lectura-critica"
tema: "{tema}"
semana: "{week}"
protocol_version: "5.2"
year: 2026
bundle_index: 1
bundle_size: 10
alignment: "DBA MEN + Est�ndares B�sicos de Competencias en Lenguaje"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: {rate}
  discrimination_index_target: ">= 0.25"
  simulated_responses: 100
rubric_baseline: "{rubric}"
---

"""

BLD = {"Remember":"D1","Understand":"D2","Apply":"D3","Analyze":"D4","Evaluate":"D5"}

def q(num, qid, bloom, icfes, ctx, stem, opts_fb, expl):
    dl = BLD.get(bloom,"D3")
    lines = [f"## Question {num} [{dl}]\n",f"**ID:** `{qid}`",f"**Bloom:** {bloom}",f"**ICFES:** {icfes}",f"**Context:** {ctx}\n","### Enunciado"]
    lines.append(stem + "\n" if not stem.endswith("\n") else stem)
    lines.append("### Options")
    for opt in opts_fb:
        if len(opt) == 4: l,t,c,fb = opt
        else: l,t,c = opt; fb = ""
        m = "[x]" if c else "[ ]"
        lines.append(f"- {m} {l}) {t} <!-- feedback: {fb} -->")
    lines.extend(["","### Explicaci\u00f3n Pedag\u00f3gica",expl + "\n","---\n"])
    return "\n".join(lines)

def make_bundle(week, tema, title, rubric, rate, header_md, questions, footer_md):
    c = front(week, tema, title, rubric, rate)
    c += f"# Lectura Cr\u00edtica G4 \u2014 {week}: {title}\n\n"
    c += header_md + "\n---\n\n"
    for i, (bloom, icfes, ctx, stem, opts_fb, expl) in enumerate(questions, 1):
        c += q(i, f"CO-LEC-4-2026-{week}-{tema}-001-MASTERY-v{i}", bloom, icfes, ctx, stem, opts_fb, expl)
    c += "\n### Explicaci\u00f3n Pedag\u00f3gica Final\n" + footer_md + "\n"
    return c

def write_week(n, tema, title, rubric, rate, header, qlist, footer):
    w = f"W{n:02d}"
    content = make_bundle(w, tema, title, rubric, rate, header, qlist, footer)
    fname = f"CO-LEC-4-2026-{w}-{tema}-001-MASTERY-bundle.md"
    fpath = os.path.join(OUT, fname)
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK W{n:02d}")

# ── W02: Comprensión literal: detalles explícitos ──
write_week(2, "comprension-literal-detalles", "Comprensión literal: detalles explícitos",
"detalles expl\u00edcitos, informaci\u00f3n literal, datos, n\u00fameros, lugares",
0.78,
"*Los detalles expl\u00edcitos son los datos que el autor nos dice directamente: fechas, cantidades, nombres. Esta semana los buscaremos en textos sobre Colombia.*",
[
 ("Remember","Identificaci\u00f3n de contenidos locales","Horario del mercado.",
  '*"El mercado de Sincelejo abre a las 5 a.m. y cierra al mediod\u00eda."* \u00bfA qu\u00e9 hora cierra?',
  [("A","5 p.m.",False),("B","Al mediod\u00eda.",True,"Correcto."),("C","3 p.m.",False),("D","No cierra.",False)],
  "Identificar detalle expl\u00edcito de horario."),
 ("Remember","Identificaci\u00f3n de contenidos locales","Medida rana dorada.",
  '*"La rana dorada del Choc\u00f3 mide 2 cm."* \u00bfCu\u00e1nto mide?',
  [("A","5 cm.",False),("B","10 cm.",False),("C","2 cm.",True,"Correcto."),("D","1 cm.",False)],
  "Identificar detalle num\u00e9rico."),
 ("Remember","Identificaci\u00f3n de contenidos locales","Lugar de nacimiento.",
  '*"Policarpa Salavarrieta naci\u00f3 en Guaduas, Cundinamarca."* \u00bfD\u00f3nde naci\u00f3?',
  [("A","Bogot\u00e1.",False),("B","Guaduas.",True,"Correcto."),("C","Medell\u00edn.",False),("D","Cartagena.",False)],
  "Identificar lugar expl\u00edcito."),
 ("Understand","Identificaci\u00f3n de contenidos locales","\u00bfQui\u00e9n teje?",
  '*"La mochila way\u00fau es tejida por las mujeres de La Guajira."* \u00bfQui\u00e9nes tejen?',
  [("A","Hombres way\u00fau.",False),("B","Mujeres way\u00fau.",True,"Correcto."),("C","Ni\u00f1os.",False),("D","Artesanos de Bogot\u00e1.",False)],
  "Identificar sujeto."),
 ("Understand","Comprensi\u00f3n del sentido global","Deporte popular.",
  '*"El deporte m\u00e1s popular en Colombia es el f\u00fatbol."* \u00bfCu\u00e1l es el m\u00e1s popular?',
  [("A","Ciclismo.",False),("B","B\u00e9isbol.",False),("C","F\u00fatbol.",True,"Correcto."),("D","Boxeo.",False)],
  "Identificar afirmaci\u00f3n principal."),
 ("Understand","Identificaci\u00f3n de contenidos locales","Duraci\u00f3n carnaval.",
  '*"El Carnaval de Barranquilla dura cuatro d\u00edas."* \u00bfCu\u00e1nto dura?',
  [("A","Siete d\u00edas.",False),("B","Dos d\u00edas.",False),("C","Cuatro d\u00edas.",True,"Correcto."),("D","Una semana.",False)],
  "Detalle num\u00e9rico."),
 ("Apply","Dimensi\u00f3n inferencial","Calcular grupos.",
  '*"35 estudiantes. Grupos de m\u00e1ximo 10."* \u00bfCu\u00e1ntos grupos?',
  [("A","2",False,"Solo 20."),("B","3",False,"Solo 30."),("C","4",True,"Correcto. 4x10=40."),("D","5",False,"Sobra.")],
  "Calcular a partir de datos expl\u00edcitos."),
 ("Understand","Comprensi\u00f3n del sentido global","Palma de cera.",
  '*"La palma de cera vive entre 80 y 100 a\u00f1os."* \u00bfCu\u00e1nto vive?',
  [("A","50-60 a\u00f1os.",False),("B","80-100 a\u00f1os.",True,"Correcto."),("C","150 a\u00f1os.",False),("D","+200 a\u00f1os.",False)],
  "Detalle num\u00e9rico."),
 ("Analyze","Reflexi\u00f3n sobre el contenido","Presente vs ausente.",
  '*"Los manglares est\u00e1n en costas Pac\u00edfico y Caribe. Viven cangrejos, peces, aves."* \u00bfQu\u00e9 NO aparece?',
  [("A","Est\u00e1n en costas Pac\u00edfico y Caribe.",False,"S\u00ed aparece."),("B","Viven cangrejos, peces, aves.",False,"S\u00ed aparece."),("C","El m\u00e1s grande est\u00e1 en el Pac\u00edfico.",True,"No aparece."),("D","Protegen de tormentas.",False,"S\u00ed aparece.")],
  "Distinguir informaci\u00f3n presente vs ausente."),
 ("Analyze","Reflexi\u00f3n sobre el contenido","Apoyar afirmaci\u00f3n.",
  'Afirmaci\u00f3n: *"Los ni\u00f1os tienen derecho a la educaci\u00f3n."* \u00bfQu\u00e9 detalle la apoya mejor?',
  [("A","Juegan f\u00fatbol.",False),("B","Hay escuelas p\u00fablicas y privadas.",True,"Correcto."),("C","Colombia tiene monta\u00f1as.",False),("D","Usan uniforme azul.",False)],
  "Evaluar pertinencia de detalles."),
],
"Bundle enfocado en detalles expl\u00edcitos. Contextos colombianos diversos."
)

# ── W03: Secuencia de eventos ──
write_week(3, "secuencia-eventos", "Secuencia de eventos en un texto",
"secuencia temporal, orden cronol\u00f3gico, conectores, primero-luego-finalmente",
0.74,
"*Reconocer el orden de los eventos es clave para entender textos. Practicaremos con conectores temporales.*",
[
 ("Remember","Identificaci\u00f3n de contenidos locales","Preparaci\u00f3n del caf\u00e9.",
  '*"Primero recogen granos, los lavan y secan, luego los tuestan y empacan."* \u00bfDespu\u00e9s de recoger?',
  [("A","Tuestan.",False,"Despu\u00e9s de secar."),("B","Venden.",False,"\u00daltimo."),("C","Lavan y secan.",True,"Correcto."),("D","Siembran.",False,"Antes.")],
  "Siguiente paso en secuencia."),
 ("Remember","Identificaci\u00f3n de contenidos locales","Rutina escolar.",
  '*"Forman, izan bandera, cantan himno, entran a clases."* \u00bfDespu\u00e9s de izar?',
  [("A","Jugar.",False),("B","Cantar himno.",True,"Correcto."),("C","Descansar.",False),("D","Ir a casa.",False)],
  "Seguir rutina."),
 ("Understand","Comprensi\u00f3n del sentido global","Proceso panela.",
  '*"Cortan ca\u00f1a, extraen jugo, cocinan hasta espesar, vierten en moldes, enfr\u00edan."* \u00bfDespu\u00e9s de extraer jugo?',
  [("A","Cortar ca\u00f1a.",False,"Antes."),("B","Verter en moldes.",False,"Despu\u00e9s de cocinar."),("C","Cocinar hasta espesar.",True,"Correcto."),("D","Empacar.",False,"Al final.")],
  "Seguir proceso productivo."),
 ("Understand","Comprensi\u00f3n del sentido global","Ciclo mariposa.",
  '*"Huevos \u2192 orugas \u2192 capullo \u2192 cris\u00e1lida \u2192 mariposa adulta."* \u00bfDespu\u00e9s del capullo?',
  [("A","Pone huevos.",False,"Inicio."),("B","Sale adulta.",False,"Final."),("C","Cris\u00e1lida.",True,"Correcto."),("D","Come hojas.",False,"Antes.")],
  "Ciclo de vida."),
 ("Understand","Comprensi\u00f3n del sentido global","Conector temporal.",
  '*"Hicieron la tarea. Despu\u00e9s, la profesora la revis\u00f3."* \u00bfQu\u00e9 palabra indica orden?',
  [("A","Estudiantes.",False),("B","Tarea.",False),("C","Despu\u00e9s.",True,"Correcto."),("D","Notas.",False)],
  "Identificar conector temporal."),
 ("Apply","Dimensi\u00f3n inferencial","Orden inverso.",
  '*"Marta se levant\u00f3, se ba\u00f1\u00f3, desayun\u00f3 y sali\u00f3."* \u00bfQu\u00e9 hizo ANTES de ba\u00f1arse?',
  [("A","Desayunar.",False,"Despu\u00e9s."),("B","Salir.",False,"Al final."),("C","Levantarse.",True,"Correcto."),("D","Encontrar amiga.",False,"Despu\u00e9s.")],
  "Inferir orden inverso."),
 ("Understand","Comprensi\u00f3n del sentido global","Evento hist\u00f3rico.",
  '*"En 1819 Bol\u00edvar cruz\u00f3 los Andes. El 7 de agosto fue la Batalla de Boyac\u00e1."* \u00bfQu\u00e9 pas\u00f3 el 7 de agosto?',
  [("A","Cruz\u00f3 los Andes.",False,"Antes."),("B","Batalla de Boyac\u00e1.",True,"Correcto."),("C","Independencia.",False,"Consecuencia."),("D","Muri\u00f3 Bol\u00edvar.",False)],
  "Identificar fecha."),
 ("Analyze","Dimensi\u00f3n inferencial","Cambio de orden.",
  '*"Primero masa, luego arepas, se asan en budare."* \u00bfSi asaran antes de preparar masa?',
  [("A","Mejor sabor.",False),("B","No habr\u00eda masa.",True,"Correcto. Orden necesario."),("C","M\u00e1s r\u00e1pido.",False),("D","Igual.",False)],
  "Analizar por qu\u00e9 el orden importa."),
 ("Analyze","Reflexi\u00f3n sobre el contenido","Instrucciones germinaci\u00f3n.",
  '1. Semilla en frasco. 2. Cerca de ventana. 3. Regar cada 2 d\u00edas. \u00bfSi ponen en ventana antes de semilla?',
  [("A","Funciona.",False,"No."),("B","No, primero va la semilla.",True,"Correcto."),("C","S\u00ed, necesita luz.",False),("D","No, algod\u00f3n se moja.",False)],
  "Evaluar importancia del orden."),
 ("Analyze","Reflexi\u00f3n sobre el contenido","Completar conector.",
  '*"Primero se enciende, luego se busca el contacto, _____ se presiona llamar."* \u00bfQu\u00e9 palabra falta?',
  [("A","pero",False,"Contraste."),("B","despu\u00e9s",True,"Correcto."),("C","aunque",False,"Concesi\u00f3n."),("D","tambi\u00e9n",False,"Adici\u00f3n.")],
  "Completar con conector temporal."),
],
"Bundle sobre secuencia temporal. Contextos: caf\u00e9, panela, mariposa, historia."
)

# ── W04: Personajes y sus características ──
write_week(4, "personajes-caracteristicas", "Personajes y sus caracter\u00edsticas",
"personajes, caracter\u00edsticas f\u00edsicas y de personalidad, descripci\u00f3n, roles",
0.75,
"*Los personajes son quienes act\u00faan en las historias. Reconocer sus caracter\u00edsticas nos ayuda a entenderlos mejor.*",
[
 ("Remember","Identificaci\u00f3n de contenidos locales","Nombre del personaje.",
  '*"Tom\u00e1s es un ni\u00f1o de 10 a\u00f1os que vive en Antioquia."* \u00bfC\u00f3mo se llama?',
  [("A","Pedro.",False),("B","Tom\u00e1s.",True,"Correcto."),("C","Juan.",False),("D","Carlos.",False)],
  "Identificar nombre del personaje."),
 ("Remember","Identificaci\u00f3n de contenidos locales","Caracter\u00edstica f\u00edsica.",
  '*"La abuela Rosa tiene el pelo blanco y usa gafas."* \u00bfQu\u00e9 caracter\u00edstica f\u00edsica tiene?',
  [("A","Es alta.",False),("B","Pelo blanco.",True,"Correcto."),("C","Es joven.",False),("D","Viste de azul.",False)],
  "Identificar caracter\u00edstica f\u00edsica expl\u00edcita."),
 ("Understand","Identificaci\u00f3n de contenidos locales","Rol del personaje.",
  '*"Don Jos\u00e9 es el profesor de matem\u00e1ticas."* \u00bfQu\u00e9 rol cumple?',
  [("A","M\u00e9dico.",False),("B","Profesor.",True,"Correcto."),("C","Carpintero.",False),("D","Conductor.",False)],
  "Identificar el rol."),
 ("Understand","Comprensi\u00f3n del sentido global","Personalidad.",
  '*"Luc\u00eda siempre ayuda a sus compa\u00f1eros y comparte su merienda."* \u00bfC\u00f3mo es?',
  [("A","Ego\u00edsta.",False),("B","Generosa y amable.",True,"Correcto."),("C","Perezosa.",False),("D","Triste.",False)],
  "Inferir personalidad por acciones."),
 ("Understand","Comprensi\u00f3n del sentido global","Sentimientos.",
  '*"Cuando Pedro vio su nota, salt\u00f3 de alegr\u00eda y abraz\u00f3 a su mam\u00e1."* \u00bfC\u00f3mo se sinti\u00f3?',
  [("A","Enojado.",False),("B","Triste.",False),("C","Alegre.",True,"Correcto."),("D","Asustado.",False)],
  "Inferir emoci\u00f3n por reacci\u00f3n."),
 ("Apply","Dimensi\u00f3n inferencial","Comparar personajes.",
  '*"Ana es ordenada y estudiosa. David es desordenado pero creativo."* \u00bfDiferencia?',
  [("A","Ana es mayor.",False),("B","Ana ordenada, David creativo.",True,"Correcto."),("C","David estudia m\u00e1s.",False),("D","Ana es desordenada.",False)],
  "Comparar caracter\u00edsticas."),
 ("Understand","Identificaci\u00f3n de contenidos locales","Edad del personaje.",
  '*"Don Manuel, de 65 a\u00f1os, es el abuelo de Mar\u00eda."* \u00bfEdad?',
  [("A","50.",False),("B","65.",True,"Correcto."),("C","70.",False),("D","80.",False)],
  "Identificar edad expl\u00edcita."),
 ("Analyze","Dimensi\u00f3n inferencial","Prop\u00f3sito del personaje.",
  '*"Max es un perro que busca a su due\u00f1o."* \u00bfCu\u00e1l es su prop\u00f3sito?',
  [("A","Jugar.",False),("B","Encontrar a su due\u00f1o.",True,"Correcto."),("C","Vivir en la calle.",False),("D","Ser adoptado.",False)],
  "Inferir motivaci\u00f3n."),
 ("Analyze","Reflexi\u00f3n sobre el contenido","Evaluar descripci\u00f3n.",
  '*"Tatiana es una ni\u00f1a de Bucaramanga."* \u00bfEs suficiente para conocerla?',
  [("A","S\u00ed.",False),("B","No, falta c\u00f3mo es f\u00edsica y emocionalmente.",True,"Correcto."),("C","S\u00ed, sabemos de d\u00f3nde es.",False),("D","No, pero no importa.",False)],
  "Evaluar suficiencia de descripci\u00f3n."),
 ("Analyze","Reflexi\u00f3n sobre el contenido","Crear personaje.",
  'Para un cuento de aventura, \u00bfqu\u00e9 caracter\u00edstica le dar\u00edas al h\u00e9roe?',
  [("A","T\u00edmido.",False),("B","Audaz y decidido.",True,"Correcto."),("C","Perezoso.",False),("D","Distra\u00eddo.",False)],
  "Seleccionar caracter\u00edsticas coherentes."),
],
"Bundle sobre personajes y sus caracter\u00edsticas. Contextos colombianos."
)

# ── W05: Repaso P1 ──
write_week(5, "repaso-p1", "Repaso P1",
"repaso: idea principal, detalles, secuencia, personajes",
0.70,
"*\u00a1Semana de repaso! Integraremos idea principal, detalles, secuencias y personajes.*",
[
 ("Understand","Comprensi\u00f3n del sentido global","Idea principal.",
  '*"El r\u00edo Magdalena es la principal arteria fluvial de Colombia."* \u00bfIdea principal?',
  [("A","El r\u00edo tiene agua.",False),("B","El Magdalena es la principal v\u00eda fluvial.",True,"Correcto."),("C","Navegan barcos.",False),("D","Est\u00e1 en Colombia.",False)],
  "Repaso idea principal."),
 ("Remember","Identificaci\u00f3n de contenidos locales","Detalle expl\u00edcito.",
  '*"Colombia tiene 32 departamentos."* \u00bfCu\u00e1ntos?',
  [("A","30.",False),("B","32.",True,"Correcto."),("C","35.",False),("D","28.",False)],
  "Repaso detalles."),
 ("Remember","Identificaci\u00f3n de contenidos locales","Personaje.",
  '*"La se\u00f1ora Mar\u00eda es la bibliotecaria."* \u00bfQui\u00e9n es?',
  [("A","Profesora.",False),("B","Bibliotecaria.",True,"Correcto."),("C","M\u00e9dica.",False),("D","Cocinera.",False)],
  "Repaso personajes."),
 ("Understand","Comprensi\u00f3n del sentido global","Secuencia.",
  '*"Primero sembraron, luego regaron, finalmente cosecharon."* \u00bfDespu\u00e9s de sembrar?',
  [("A","Cosechar.",False,"Al final."),("B","Regar.",True,"Correcto."),("C","Podar.",False),("D","Vender.",False)],
  "Repaso secuencia."),
 ("Understand","Identificaci\u00f3n de contenidos locales","Detalle geogr\u00e1fico.",
  '*"El c\u00f3ndor de los Andes vive en las monta\u00f1as de Colombia."* \u00bfD\u00f3nde vive?',
  [("A","Selva.",False),("B","Monta\u00f1as.",True,"Correcto."),("C","Costa.",False),("D","Desierto.",False)],
  "Repaso detalle."),
 ("Apply","Dimensi\u00f3n inferencial","Inferir personalidad.",
  '*"Sara siempre presta sus l\u00e1pices y ayuda con tareas."* \u00bfC\u00f3mo es?',
  [("A","Ego\u00edsta.",False),("B","Solidaria.",True,"Correcto."),("C","Perezosa.",False),("D","Enojada.",False)],
  "Repaso inferir personalidad."),
 ("Understand","Comprensi\u00f3n del sentido global","Idea principal vs detalle.",
  '*"Colombia produce excelente caf\u00e9. Se cultiva en el Eje Cafetero."* \u00bfIdea principal?',
  [("A","Colombia produce excelente caf\u00e9.",True,"Correcto."),("B","Se cultiva en el Eje Cafetero.",False,"Detalle."),("C","El caf\u00e9 es amargo.",False),("D","Tiene cafe\u00edna.",False)],
  "Repaso diferenciar idea principal."),
 ("Analyze","Dimensi\u00f3n inferencial","Orden l\u00f3gico.",
  '*"Mar\u00eda se levant\u00f3, se visti\u00f3 y sali\u00f3. Compr\u00f3 pan en la calle."* \u00bfAntes de salir?',
  [("A","Compr\u00f3 pan.",False,"Despu\u00e9s."),("B","Se visti\u00f3.",True,"Correcto."),("C","Desayun\u00f3.",False),("D","Lleg\u00f3 al colegio.",False)],
  "Repaso orden inverso."),
 ("Analyze","Reflexi\u00f3n sobre el contenido","Personaje adecuado.",
  'Cuento de aventura en la selva: \u00bfqu\u00e9 personaje necesitas?',
  [("A","Un chef.",False),("B","Un explorador.",True,"Correcto."),("C","Un profesor de piano.",False),("D","Una bailarina.",False)],
  "Repaso coherencia personaje-g\u00e9nero."),
 ("Analyze","Reflexi\u00f3n sobre el contenido","Evaluar suficiencia.",
  '*"El agua es importante."* \u00bfSuficiente detalle?',
  [("A","S\u00ed.",False),("B","No, falta por qu\u00e9 y para qu\u00e9.",True,"Correcto."),("C","S\u00ed, es clara.",False),("D","No, pero da igual.",False)],
  "Repaso evaluar suficiencia."),
],
"Bundle de repaso P1 integrando idea principal, detalles, secuencia y personajes."
)

print("Done W02-W05")
