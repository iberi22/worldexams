#!/usr/bin/env python3
"""
Generador de 40 weekly packs para Lectura Critica Grado 4 Colombia.
Cada archivo se escribe individualmente.
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
alignment: "DBA MEN + Estándares Básicos de Competencias en Lenguaje"
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
        if len(opt) == 4:
            l,t,c,fb = opt
        else:
            l,t,c = opt
            fb = ""
        m = "[x]" if c else "[ ]"
        lines.append(f"- {m} {l}) {t} <!-- feedback: {fb} -->")
    lines.extend(["","### Explicación Pedagógica",expl + "\n","---\n"])
    return "\n".join(lines)

def make_bundle(week, tema, title, rubric, rate, header_md, questions, footer_md):
    c = front(week, tema, title, rubric, rate)
    c += f"# Lectura Crítica G4 — {week}: {title}\n\n"
    c += header_md + "\n---\n\n"
    for i, (bloom, icfes, ctx, stem, opts_fb, expl) in enumerate(questions, 1):
        c += q(i, f"CO-LEC-4-2026-{week}-{tema}-001-MASTERY-v{i}", bloom, icfes, ctx, stem, opts_fb, expl)
    c += "\n### Explicación Pedagógica Final\n" + footer_md + "\n"
    return c

# ── CONTENT DEFINITIONS ──────────────────────────────────

weeks = {}

weeks[1] = {
    "tema":"comprension-literal-idea-principal","title":"Comprensión literal: idea principal",
    "rubric":"idea principal, comprensión literal, textos cortos, información explícita","rate":0.76,
    "header":"*Esta semana aprenderemos a encontrar la idea principal en textos cortos. La idea principal es la información más importante que el autor quiere comunicar.*",
    "footer":"Bundle que desarrolla identificación de la idea principal en textos cortos. Contextos colombianos variados.",
    "q":[
 ("Remember","Identificación de contenidos locales","Oración simple.",'Lee la oración: *"El río Amazonas atraviesa el sur de Colombia."* ¿Qué río se menciona?',
  [("A","El río Magdalena.",False,"No se menciona."),("B","El río Cauca.",False,"No aparece."),("C","El río Amazonas.",True,"Correcto."),("D","El río Orinoco.",False,"No se menciona.")],
  "Identificación de información explícita en oración simple."),
 ("Remember","Identificación de contenidos locales","Clima en Colombia.",'*"En la costa Caribe colombiana hace calor casi todo el año."* ¿Qué clima tiene?',
  [("A","Frío.",False),("B","Templado.",False),("C","Caluroso.",True,"Correcto."),("D","Lluvioso todo el año.",False)],
  "Identificar característica climática explícita."),
 ("Understand","Comprensión del sentido global","Campesinos de Nariño.",'*"Cada mañana los campesinos de Nariño recogen papas, las lavan y las empacan para el mercado."* ¿Idea principal?',
  [("A","Lavan papas en el río.",False,"Es detalle."),("B","Las papas se venden en Pasto.",False,"Detalle."),("C","Los campesinos trabajan en la cosecha y preparación.",True,"Correcto."),("D","Nariño tiene ríos limpios.",False,"No aparece.")],
  "Identificar idea principal vs detalles."),
 ("Understand","Identificación de contenidos locales","Hábitat del tucán.",'*"El tucán vive en las selvas de Colombia."* ¿Dónde vive?',
  [("A","Montañas.",False),("B","Desiertos.",False),("C","Selvas de Colombia.",True,"Correcto."),("D","Ciudades.",False)],
  "Identificar hábitat explícito."),
 ("Understand","Comprensión del sentido global","La arepa.",'*"La arepa es un alimento tradicional colombiano hecho de harina de maíz."* ¿Tema central?',
  [("A","Tipos de queso.",False),("B","La arepa como alimento tradicional.",True,"Correcto."),("C","Cómo cocinar carne.",False),("D","Desayunos colombianos.",False)],
  "Identificar tema central."),
 ("Apply","Dimensión inferencial","Significado por contexto.",'*"Don Manuel aró la tierra con bueyes en Tuta, Boyacá."* ¿Qué significa "aró"?',
  [("A","Regar.",False),("B","Cortar plantas.",False),("C","Preparar la tierra haciendo surcos.",True,"Correcto."),("D","Cosechar.",False)],
  "Inferir significado por contexto."),
 ("Understand","Identificación de contenidos locales","Secuencia de cocina.",'*"Primero peló plátanos, luego los friendó, finalmente los sirvió con hogao."* ¿Después de pelar?',
  [("A","Servirlos.",False,"Último paso."),("B","Freírlos.",True,"Correcto."),("C","Comprarlos.",False),("D","Cortarlos.",False)],
  "Seguir secuencia temporal."),
 ("Understand","Comprensión del sentido global","Café colombiano.",'*"El café colombiano es conocido mundialmente por su sabor suave."* ¿Idea principal?',
  [("A","Se cultiva en el Eje Cafetero.",False,"Detalle."),("B","Es reconocido mundialmente.",True,"Correcto."),("C","Se exporta.",False,"Detalle."),("D","Es suave.",False,"Parcial.")],
  "Integrar información en idea principal."),
 ("Analyze","Dimensión inferencial","Idea implícita.",'*"Doña Elena vende jugos en la plaza. Se levanta a las 4 a.m. Sus clientes la esperan."* ¿Qué infieres?',
  [("A","Vende jugos.",False,"Explícito."),("B","Se levanta a las 4.",False,"Explícito."),("C","Es trabajadora y dedicada.",True,"Correcto."),("D","La plaza abre temprano.",False)],
  "Inferir idea no dicha."),
 ("Analyze","Reflexión sobre el contenido","Título representativo.",'*"Los frailejones protegen las fuentes de agua en los páramos."* ¿Mejor título?',
  [("A","Hojas peludas.",False,"Detalle."),("B","Plantas del páramo.",False,"Parcial."),("C","Importancia de los frailejones para el agua.",True,"Correcto."),("D","Cómo crecen plantas.",False,"General.")],
  "Sintetizar en título.")]
}

# W06-W40 will be defined in continuation script
# For now, write W01-W05

for n, data in sorted(weeks.items()):
    w = f"W{n:02d}"
    tema = data["tema"]
    content = make_bundle(w, tema, data["title"], data["rubric"], data["rate"],
                           data["header"], data["q"], data["footer"])
    fname = f"CO-LEC-4-2026-{w}-{tema}-001-MASTERY-bundle.md"
    fpath = os.path.join(OUT, fname)
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK {fname}")

print(f"\nGenerated {len(weeks)} bundles so far.")
