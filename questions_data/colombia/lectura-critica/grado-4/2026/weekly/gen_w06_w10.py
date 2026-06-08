#!/usr/bin/env python3
"""
Generate W06-W40 for Lectura Critica G4 (35 bundles, 350 questions).
Each file: 10 questions with Bloom taxonomy variety + Colombian context.
"""
import os, json

OUT = r"E:\scripts-python\worldexams\questions_data\colombia\lectura-critica\grado-4\2026\weekly"
ALIGNMENT = "DBA MEN + Est\u00e1ndares B\u00e1sicos de Competencias en Lenguaje"
BLD = {"Remember":"D1","Understand":"D2","Apply":"D3","Analyze":"D4","Evaluate":"D5"}

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
alignment: "{ALIGNMENT}"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: {rate}
  discrimination_index_target: ">= 0.25"
  simulated_responses: 100
rubric_baseline: "{rubric}"
---

"""

def wq(num, qid, bloom, icfes, ctx, stem, ops, expl, dlev=None):
    """ops: list of (letter, text, is_correct, feedback)"""
    dl = dlev or BLD.get(bloom,"D3")
    lines = [f"## Question {num} [{dl}]\n",f"**ID:** `{qid}`",f"**Bloom:** {bloom}",f"**ICFES:** {icfes}",f"**Contexti\u00f3n:** {ctx}\n","### Enunciado"]
    lines.append(stem + ("\n" if not stem.endswith("\n") else ""))
    lines.append("### Options")
    for l,t,c,fb in ops:
        m = "[x]" if c else "[ ]"
        lines.append(f"- {m} {l}) {t} <!-- feedback: {fb} -->")
    lines.extend(["","### Explicaci\u00f3n Pedag\u00f3gica",expl + "\n","---\n"])
    return "\n".join(lines)

def write_bundle(n, tema, title, rubric, rate, questions, footer):
    w = f"W{n:02d}"
    c = f"""---
id: "CO-LEC-4-2026-{w}-{tema}-001-MASTERY"
country: "colombia"
grado: 4
asignatura: "lectura-critica"
tema: "{tema}"
semana: "{w}"
protocol_version: "5.2"
year: 2026
bundle_index: 1
bundle_size: 10
alignment: "{ALIGNMENT}"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: {rate}
  discrimination_index_target: ">= 0.25"
  simulated_responses: 100
rubric_baseline: "{rubric}"
---

# Lectura Cr\u00edtica G4 \u2014 {w}: {title}

"""
    for i,(bloom,icfes,ctx,stem,ops,expl) in enumerate(questions,1):
        c += wq(i,f"CO-LEC-4-2026-{w}-{tema}-001-MASTERY-v{i}",bloom,icfes,ctx,stem,ops,expl)
    c += "\n### Explicaci\u00f3n Pedag\u00f3gica Final\n" + footer + "\n"
    fname = f"CO-LEC-4-2026-{w}-{tema}-001-MASTERY-bundle.md"
    with open(os.path.join(OUT,fname),"w",encoding="utf-8") as f:
        f.write(c)
    print(f"OK {fname}")

# ── W06: Inferir causas ──
write_bundle(6,"comprension-inferencial-causas",
u"Comprensi\u00f3n inferencial: inferir causas",
u"inferencia, causas, relaciones causales",
0.72,[
("Remember","Identifi. de contenidos locales","Causa expl\u00edcita.",
u'*"Los ni\u00f1os no salieron al recreo porque estaba lloviendo muy fuerte."* \u00bfPor qu\u00e9 no salieron?',
[("A","Estaban castigados.",False,"No se dice."),("B","Llov\u00eda muy fuerte.",True,"Correcto."),("C","No quer\u00edan.",False),("D","Era tarde.",False)],
u"Identificar causa expl\u00edcita."),
("Remember","Identifi. de contenidos locales","Causa en la agricultura.",
u'*"El cultivo de caf\u00e9 disminuy\u00f3 en la regi\u00f3n porque hubo una sequ\u00eda larga."* \u00bfCausa?',
[("A","Los campesinos se fueron.",False),("B","La sequ\u00eda.",True,"Correcto."),("C","No hab\u00eda semillas.",False),("D","El caf\u00e9 es dif\u00edcil.",False)],
u"Identificar causa expl\u00edcita."),
("Understand","Comprensi\u00f3n del sentido global","Causa de fen\u00f3meno.",
u'*"El r\u00edo se desbord\u00f3 porque llovi\u00f3 tres d\u00edas seguidos."* \u00bfCausa del desbordamiento?',
[("A","El calor del sol.",False),("B","Tres d\u00edas de lluvia.",True,"Correcto."),("C","La basura.",False),("D","Un terremoto.",False)],
u"Identificar causa de fen\u00f3meno."),
("Understand","Comprensi\u00f3n del sentido global","Causa de emoci\u00f3n.",
u'*"Mar\u00eda se puso feliz al recibir carta de su abuela en Sincelejo."* \u00bfPor qu\u00e9 feliz?',
[("A","Gan\u00f3 un premio.",False),("B","Recibi\u00f3 carta de su abuela.",True,"Correcto."),("C","Sali\u00f3 al parque.",False),("D","Comi\u00f3 helado.",False)],
u"Inferir causa de emoci\u00f3n."),
("Understand","Comprensi\u00f3n del sentido global","Conector causal.",
u'*"El equipo perdi\u00f3, as\u00ed que estaban tristes."* \u00bfQu\u00e9 palabra indica relaci\u00f3n causal?',
[("A","perdi\u00f3",False),("B","as\u00ed que",True,"Correcto."),("C","equipo",False),("D","tristes",False)],
u"Identificar conector causal."),
("Apply","Dimensi\u00f3n inferencial","Inferir causa de acci\u00f3n.",
u'*"Pedro lleg\u00f3 tarde y la profesora lo anot\u00f3 en el observador."* \u00bfCausa de la anotaci\u00f3n?',
[("A","Lleg\u00f3 temprano.",False),("B","Lleg\u00f3 bien.",False),("C","Lleg\u00f3 tarde.",True,"Correcto."),("D","No hizo tareas.",False)],
u"Inferir causa del texto."),
("Apply","Dimensi\u00f3n inferencial","Causa ambiental.",
u'*"En la quebrada ya no hay peces. Don Pedro dice que los jabones y qu\u00edmicos los mataron."* \u00bfCausa?',
[("A","Los pescadores.",False),("B","Jabones y qu\u00edmicos.",True,"Correcto."),("C","El calor.",False),("D","Los patos.",False)],
u"Inferir causa ambiental."),
("Analyze","Dimensi\u00f3n inferencial","Diferenciar causa y efecto.",
u'*"El \u00e1rbol se cay\u00f3 por el viento fuerte. Bloque\u00f3 la carretera."* \u00bfCAUSA?',
[("A","Bloque\u00f3 la carretera.",False,"Eso es consecuencia."),("B","El viento fuerte.",True,"Correcto."),("C","El \u00e1rbol se cay\u00f3.",False,"Eso es el evento."),("D","No hab\u00eda carretera.",False)],
u"Diferenciar causa de consecuencia."),
("Analyze","Reflexi\u00f3n sobre el contenido","Evaluar causa.",
u'*"La planta se marchit\u00f3."* \u00bfEs suficiente decir \u201cno le gustaba\u201d?',
[("A","S\u00ed.",False),("B","No, necesita agua, sol o nutrientes.",True,"Correcto."),("C","S\u00ed, las plantas tienen gustos.",False),("D","No, pero da igual.",False)],
u"Evaluar si la causa es razonable."),
("Analyze","Reflexi\u00f3n sobre el contenido","Causa probable.",
u'*"Juan no pas\u00f3 el examen."* \u00bfCausa m\u00e1s probable?',
[("A","Mala suerte.",False),("B","No estudi\u00f3 suficiente.",True,"Correcto."),("C","Examen muy largo.",False),("D","La profesora es mala.",False)],
u"Seleccionar causa razonable."),
],u"Bundle sobre inferencia de causas. Contextos colombianos.")

# W07: Inferir consecuencias
write_bundle(7,"comprension-inferencial-consecuencias",
u"Comprensi\u00f3n inferencial: inferir consecuencias",
u"inferencia, consecuencias, efectos, resultados",
0.72,[
("Remember","Identifi. de contenidos locales","Consecuencia expl\u00edcita.",
u'*"No estudi\u00f3, por eso sac\u00f3 nota baja."* \u00bfConsecuencia?',
[("A","Nota alta.",False),("B","Nota baja.",True,"Correcto."),("C","Premio.",False),("D","Felicidades.",False)],
u"Identificar consecuencia expl\u00edcita."),
("Remember","Identifi. de contenidos locales","Consecuencia de lluvia.",
u'*"Llovi\u00f3 toda la noche, as\u00ed que el r\u00edo creci\u00f3 y las calles se inundaron."* \u00bfConsecuencia?',
[("A","Hizo sol.",False),("B","R\u00edo creci\u00f3 y calles se inundaron.",True,"Correcto."),("C","Ni\u00f1os jugaron.",False),("D","Paseo.",False)],
u"Identificar consecuencia."),
("Understand","Comprensi\u00f3n del sentido global","Consecuencia de sembrar \u00e1rboles.",
u'*"Sembraron m\u00e1s \u00e1rboles en la ladera, por eso hubo menos deslizamientos."* \u00bfConsecuencia?',
[("A","M\u00e1s deslizamientos.",False),("B","Menos deslizamientos.",True,"Correcto."),("C","Nada.",False),("D","\u00c1rboles se secaron.",False)],
u"Consecuencia de acci\u00f3n ambiental."),
("Understand","Comprensi\u00f3n del sentido global","Consecuencia positiva.",
u'*"Recogieron la basura del patio. Ahora el colegio est\u00e1 limpio."* \u00bfConsecuencia?',
[("A","Colegio sucio.",False),("B","Colegio limpio.",True,"Correcto."),("C","Estudiantes se fueron.",False),("D","Lleg\u00f3 basura.",False)],
u"Consecuencia de acci\u00f3n positiva."),
("Understand","Comprensi\u00f3n del sentido global","Conector de consecuencia.",
u'*"El volc\u00e1n hizo erupci\u00f3n, por lo tanto la ceniza cubri\u00f3 los cultivos."* \u00bfPalabra de consecuencia?',
[("A","volc\u00e1n",False),("B","erupci\u00f3n",False),("C","por lo tanto",True,"Correcto."),("D","cultivos",False)],
u"Identificar conector."),
("Apply","Dimensi\u00f3n inferencial","Inferir consecuencia l\u00f3gica.",
u'*"Los ni\u00f1os jugaron con arena mojada y se ensuciaron."* Si la mam\u00e1 es estricta, \u00bfqu\u00e9 pasa?',
[("A","Felicit\u00f3.",False),("B","Llam\u00f3 la atenci\u00f3n.",True,"Correcto."),("C","No se dio cuenta.",False),("D","Compr\u00f3 m\u00e1s ropa.",False)],
u"Inferir consecuencia l\u00f3gica."),
("Apply","Dimensi\u00f3n inferencial","Predecir consecuencia.",
u'*"Do\u00f1a Marta dej\u00f3 la olla en el fog\u00f3n encendido y sali\u00f3."* \u00bfQu\u00e9 podr\u00eda pasar?',
[("A","Comida se enfri\u00f3.",False),("B","Podr\u00eda quemarse y causar incendio.",True,"Correcto."),("C","Nada.",False),("D","Llegaron visitas.",False)],
u"Predecir consecuencia peligrosa."),
("Analyze","Dimensi\u00f3n inferencial","Diferenciar causa y consecuencia.",
u'*"Talaron \u00e1rboles, por eso el suelo se erosion\u00f3."* \u00bfCONSECUENCIA?',
[("A","Talaron \u00e1rboles.",False,"Causa."),("B","Suelo se erosion\u00f3.",True,"Correcto."),("C","\u00c1rboles crecieron.",False),("D","Suelo mejor\u00f3.",False)],
u"Diferenciar causa y consecuencia."),
("Analyze","Reflexi\u00f3n sobre el contenido","Cadena de consecuencias.",
u'*"Ni\u00f1o no desayun\u00f3 y en educaci\u00f3n f\u00edsica se sinti\u00f3 d\u00e9bil."* \u00bfCadena correcta?',
[("A","No desayunar \u2192 sentirse d\u00e9bil.",True,"Correcto."),("B","Ed. f\u00edsica \u2192 no desayunar.",False,"Invertido."),("C","D\u00e9bil \u2192 no desayunar.",False,"Invertido."),("D","No hay relaci\u00f3n.",False)],
u"Establecer cadena causal."),
("Analyze","Reflexi\u00f3n sobre el contenido","Consecuencia l\u00f3gica.",
u'*"En una regi\u00f3n no ha llovido en seis meses."* \u00bfConsecuencia l\u00f3gica?',
[("A","Cultivos crecieron.",False),("B","Cultivos se secaron, escasez de agua.",True,"Correcto."),("C","R\u00edos crecieron.",False),("D","Hace fr\u00edo.",False)],
u"Inferir consecuencia de sequ\u00eda."),
],u"Bundle sobre inferencia de consecuencias.")

# W08: Comparar y contrastar
write_bundle(8,"comparar-contrastar",
u"Comparar y contrastar informaci\u00f3n",
u"comparar, contrastar, semejanzas, diferencias",
0.73,[
("Remember","Identifi. de contenidos locales","Semejanza expl\u00edcita.",
u'*"Bogot\u00e1 y Medell\u00edn son ciudades grandes de Colombia."* \u00bfSemejanza?',
[("A","Son peque\u00f1as.",False),("B","Son ciudades grandes.",True,"Correcto."),("C","Tienen mar.",False),("D","Son capitales.",False)],
u"Identificar semejanza."),
("Remember","Identifi. de contenidos locales","Diferencia expl\u00edcita.",
u'*"Bogot\u00e1 es capital de Colombia; Medell\u00edn es capital de Antioquia."* \u00bfDiferencia?',
[("A","Bogot\u00e1 es m\u00e1s peque\u00f1a.",False),("B","Capital del pa\u00eds vs capital de Antioquia.",True,"Correcto."),("C","Medell\u00edn es capital del pa\u00eds.",False),("D","Son iguales.",False)],
u"Identificar diferencia."),
("Understand","Comprensi\u00f3n del sentido global","Comparar animales.",
u'*"El c\u00f3ndor tiene alas grandes; el colibr\u00ed alas peque\u00f1as."* \u00bfDiferencia?',
[("A","Ambos son aves.",False,"Semejanza."),("B","Alas grandes vs peque\u00f1as.",True,"Correcto."),("C","Ambos vuelan.",False,"Semejanza."),("D","Ambos son de Colombia.",False,"Semejanza.")],
u"Contrastar animales."),
("Understand","Comprensi\u00f3n del sentido global","Comparar climas.",
u'*"Costa Caribe: calor todo el a\u00f1o. Bogot\u00e1: fr\u00edo nocturno."* \u00bfSemejanza?',
[("A","Ambos fr\u00edos.",False),("B","Ambos tienen clima.",True,"Correcto."),("C","Ambos calurosos.",False),("D","Ambos en la costa.",False)],
u"Identificar semejanza."),
("Understand","Comprensi\u00f3n del sentido global","Conector de contraste.",
u'*"A diferencia del caf\u00e9, el arroz se cultiva en zonas planas."* \u00bfConector?',
[("A","caf\u00e9",False),("B","monta\u00f1as",False),("C","a diferencia de",True,"Correcto."),("D","arroz",False)],
u"Identificar conector de contraste."),
("Apply","Dimensi\u00f3n inferencial","Comparar datos.",
u'*"Colombia: 32 deptos. Ecuador: 24 provincias."* \u00bfDiferencia?',
[("A","Colombia tiene menos.",False),("B","Colombia tiene m\u00e1s.",True,"Correcto."),("C","Son iguales.",False),("D","Ecuador tiene m\u00e1s.",False)],
u"Comparar datos num\u00e9ricos."),
("Apply","Dimensi\u00f3n inferencial","Comparar personas.",
u'*"Ana es alta y tranquila. Luis es bajo y activo."* \u00bfSemejanza?',
[("A","Ambos altos.",False),("B","Ambos tienen caracter\u00edsticas.",True,"Correcto."),("C","Ambos tranquilos.",False),("D","Ambos activos.",False)],
u"Identificar categor\u00eda com\u00fan."),
("Analyze","Dimensi\u00f3n inferencial","Organizar comparaci\u00f3n.",
u'*"Guan\u00e1bana: dulce, en jugos. Lim\u00f3n: \u00e1cido, en limonadas."* \u00bfCorrecto?',
[("A","Semejanza: ambos \u00e1cidos.",False),("B","Semejanza: frutas. Diferencia: dulce vs \u00e1cido.",True,"Correcto."),("C","Diferencia: ambos dulces.",False),("D","Semejanza: ambos \u00e1cidos.",False)],
u"Organizar en semejanzas/diferencias."),
("Analyze","Reflexi\u00f3n sobre el contenido","Evaluar comparaci\u00f3n.",
u'*"Tuc\u00e1n: pico grande. Guacamaya: plumas coloridas."* \u00bfBuena comparaci\u00f3n?',
[("A","S\u00ed, compara dos aves.",True,"Correcto."),("B","No, son diferentes.",False,"Comparar diferente es v\u00e1lido."),("C","S\u00ed, compara pico.",False),("D","No, sin com\u00fan.",False)],
u"Evaluar si es adecuada."),
("Analyze","Reflexi\u00f3n sobre el contenido","Concluir de comparaci\u00f3n.",
u'*"Colombia tiene r\u00edos. Per\u00fa tiene r\u00edos."* \u00bfConclusi\u00f3n?',
[("A","Solo Colombia.",False),("B","Ambos tienen r\u00edos.",True,"Correcto."),("C","Per\u00fa tiene m\u00e1s.",False),("D","Ninguno.",False)],
u"Concluir de comparaci\u00f3n."),
],u"Bundle sobre comparar y contrastar.")

# W09: Problema y solución
write_bundle(9,"problema-solucion",
u"Identificar el problema y la soluci\u00f3n",
u"problema, soluci\u00f3n, conflicto, resoluci\u00f3n",
0.73,[
("Remember","Identifi. de contenidos locales","Problema expl\u00edcito.",
u'*"En la escuela no hab\u00eda suficiente agua potable."* \u00bfProblema?',
[("A","Mucha agua.",False),("B","No hay suficiente agua.",True,"Correcto."),("C","No estudian.",False),("D","Escuela grande.",False)],
u"Identificar problema."),
("Remember","Identifi. de contenidos locales","Soluci\u00f3n expl\u00edcita.",
u'*"Instalaron tanque de agua lluvia. Ahora los ni\u00f1os tienen agua."* \u00bfSoluci\u00f3n?',
[("A","Comprar agua.",False),("B","Tanque de agua lluvia.",True,"Correcto."),("C","Cerrar escuela.",False),("D","Irse.",False)],
u"Identificar soluci\u00f3n."),
("Understand","Comprensi\u00f3n del sentido global","Problema en texto.",
u'*"Los cultivos se secaban por falta de lluvia. Construyeron riego y crecieron."* \u00bfProblema?',
[("A","No trabajaban.",False),("B","Cultivos se secaban.",True,"Correcto."),("C","R\u00edo se desbord\u00f3.",False),("D","Llov\u00eda mucho.",False)],
u"Identificar problema."),
("Understand","Comprensi\u00f3n del sentido global","Soluci\u00f3n pedag\u00f3gica.",
u'*"No entend\u00edan matem\u00e1ticas. Profesora us\u00f3 juegos. Ahora entienden."* \u00bfSoluci\u00f3n?',
[("A","Cambiar profesor.",False),("B","Usar juegos.",True,"Correcto."),("C","Cancelar clase.",False),("D","Repetir a\u00f1o.",False)],
u"Identificar soluci\u00f3n."),
("Understand","Comprensi\u00f3n del sentido global","Relaci\u00f3n problema-soluci\u00f3n.",
u'*"Basura acumulada en colegio. Jornada de reciclaje."* \u00bfRelaci\u00f3n?',
[("A","Sin relaci\u00f3n.",False),("B","Reciclaje resolvi\u00f3 basura.",True,"Correcto."),("C","Basura caus\u00f3 reciclaje.",False),("D","No hay.",False)],
u"Relacionar problema y soluci\u00f3n."),
("Apply","Dimensi\u00f3n inferencial","Proponer soluci\u00f3n.",
u'*"Parque sin bancas para personas mayores."* \u00bfSoluci\u00f3n?',
[("A","Cerrar parque.",False),("B","Instalar bancas.",True,"Correcto."),("C","Poner m\u00fasica.",False),("D","Sembrar \u00e1rboles.",False)],
u"Proponer soluci\u00f3n."),
("Apply","Dimensi\u00f3n inferencial","Inferir problema.",
u'*"Ni\u00f1os caminan 2 horas para ir a la escuela."* \u00bfProblema?',
[("A","Buen transporte.",False),("B","Caminan mucho.",True,"Correcto."),("C","Escuela grande.",False),("D","Juegan camino.",False)],
u"Inferir problema."),
("Analyze","Dimensi\u00f3n inferencial","Evaluar soluciones.",
u'*"Estudiantes sin libros."* \u00bfMejor soluci\u00f3n?',
[("A","No leer.",False),("B","Biblioteca con donaciones.",True,"Correcto."),("C","Cancelar lectura.",False),("D","Comprar caros.",False)],
u"Evaluar mejor soluci\u00f3n."),
("Analyze","Reflexi\u00f3n sobre el contenido","Estructura textual.",
u'*"Problema: perros callejeros. Soluci\u00f3n: refugio."* \u00bfTipo de texto?',
[("A","Descriptivo.",False),("B","Problema-soluci\u00f3n.",True,"Correcto."),("C","Po\u00e9tico.",False),("D","Instructivo.",False)],
u"Identificar estructura."),
("Analyze","Reflexi\u00f3n sobre el contenido","Texto incompleto.",
u'*"M\u00e1s carros, m\u00e1s contaminaci\u00f3n."* Sin soluci\u00f3n, \u00bfqu\u00e9 falta?',
[("A","Nada.",False),("B","Propuesta para resolver.",True,"Correcto."),("C","Describir carros.",False),("D","Opini\u00f3n del autor.",False)],
u"Identificar estructura incompleta."),
],u"Bundle sobre problema y soluci\u00f3n.")

# W10: Repaso P2
write_bundle(10,"repaso-p2","Repaso P2",
u"repaso: inferencias, comparar, problema-soluci\u00f3n",
0.70,[
("Understand","Comprensi\u00f3n del sentido global","Inferir causa.",
u'*"Mar\u00eda se resfri\u00f3 porque jug\u00f3 bajo la lluvia."* \u00bfCausa?',
[("A","Jugar bajo la lluvia.",True,"Correcto."),("B","Comer helado.",False),("C","Dormir poco.",False),("D","Leer mucho.",False)],
u"Repaso inferir causa."),
("Understand","Comprensi\u00f3n del sentido global","Inferir consecuencia.",
u'*"El sol derriti\u00f3 el hielo, as\u00ed que se form\u00f3 un charco."* \u00bfConsecuencia?',
[("A","Se form\u00f3 hielo.",False),("B","Se form\u00f3 charco.",True,"Correcto."),("C","Llovi\u00f3.",False),("D","Hizo fr\u00edo.",False)],
u"Repaso consecuencia."),
("Understand","Comprensi\u00f3n del sentido global","Comparar.",
u'*"Perro: ladra. Gato: ma\u00falla."* \u00bfDiferencia?',
[("A","Ambos son mascotas.",False,"Semejanza."),("B","Perro ladra, gato ma\u00falla.",True,"Correcto."),("C","Ambos tienen cola.",False,"Semejanza."),("D","Ambos son animales.",False,"Semejanza.")],
u"Repaso contrastar."),
("Remember","Identifi. de contenidos locales","Problema.",
u'*"No hab\u00eda l\u00e1pices en el sal\u00f3n."* \u00bfProblema?',
[("A","Muchos l\u00e1pices.",False),("B","No hay l\u00e1pices.",True,"Correcto."),("C","Muchas sillas.",False),("D","Pupitres nuevos.",False)],
u"Repaso problema."),
("Remember","Identifi. de contenidos locales","Soluci\u00f3n.",
u'*"Compraron l\u00e1pices para todos."* \u00bfSoluci\u00f3n?',
[("A","Comprar l\u00e1pices.",True,"Correcto."),("B","Cerrar sal\u00f3n.",False),("C","Irse.",False),("D","No escribir.",False)],
u"Repaso soluci\u00f3n."),
("Apply","Dimensi\u00f3n inferencial","Inferir causa y consecuencia.",
u'*"El \u00e1rbol no creci\u00f3 porque no le llegaba suficiente sol."* \u00bfCu\u00e1l es la causa?',
[("A","No le llegaba sol.",True,"Correcto."),("B","El \u00e1rbol no creci\u00f3.",False,"Eso es el efecto."),("C","El \u00e1rbol era peque\u00f1o.",False),("D","Llov\u00eda mucho.",False)],
u"Repaso causa-efecto."),
("Analyze","Dimensi\u00f3n inferencial","Comparar animales.",
u'*"La tortuga es lenta. El conejo es r\u00e1pido."* \u00bfQu\u00e9 tipo de comparaci\u00f3n es?',
[("A","Semejanza.",False),("B","Contraste.",True,"Correcto."),("C","Igualdad.",False),("D","Identidad.",False)],
u"Repaso tipo de comparaci\u00f3n."),
("Analyze","Reflexi\u00f3n sobre el contenido","Evaluar soluci\u00f3n.",
u'*"Los estudiantes tienen sed en clase."* \u00bfMejor soluci\u00f3n?',
[("A","No tomar agua.",False),("B","Poner dispensador de agua.",True,"Correcto."),("C","Cancelar clase.",False),("D","Enviarlos a casa.",False)],
u"Repaso evaluar soluci\u00f3n."),
("Analyze","Reflexi\u00f3n sobre el contenido","Conector de causa.",
u'*"No estudi\u00f3, por lo tanto reprob\u00f3."* \u00bfTipo de relaci\u00f3n?',
[("A","Comparaci\u00f3n.",False),("B","Causa-consecuencia.",True,"Correcto."),("C","Problema-soluci\u00f3n.",False),("D","Secuencia.",False)],
u"Repaso tipo de relaci\u00f3n."),
("Analyze","Reflexi\u00f3n sobre el contenido","Problema sin soluci\u00f3n.",
u'*"La biblioteca no tiene libros nuevos."* \u00bfQu\u00e9 falta?',
[("A","Describir biblioteca.",False),("B","Proponer soluci\u00f3n.",True,"Correcto."),("C","Poner fotos.",False),("D","Nada.",False)],
u"Repaso estructura completa."),
],u"Bundle de repaso P2 sobre inferencias, comparaci\u00f3n y problema-soluci\u00f3n.")

print("Done W06-W10")
