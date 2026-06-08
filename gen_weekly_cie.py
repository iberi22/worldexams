#!/usr/bin/env python3
"""
Generator for Ciencias Naturales Weekly Packs G3, G4, G5 W01-W40.
Generates full bundles with 10 questions each, aligned to DBA MEN.
"""

import os
import sys

sys.stdout.reconfigure(encoding='utf-8')

BASE = "E:/scripts-python/worldexams/questions_data/colombia/ciencias-naturales"

# ═══════════════════════════════════════════════════════════════════
# TOPIC MAPS
# ═══════════════════════════════════════════════════════════════════

# Each week: (segment, rubric_baseline)
# segment = URL-friendly topic name, rubric_baseline = description

G3_MAP = {
    "W01": ("seres-vivos", "Seres vivos: características, funciones vitales, diferencia con objetos inertes"),
    "W02": ("seres-vivos", "Seres vivos: clasificación básica, necesidades, relaciones con el entorno"),
    "W03": ("seres-vivos", "Seres vivos: adaptaciones básicas, hábitats, interacciones simples"),
    "W04": ("seres-vivos", "Seres vivos: repaso — características, clasificación y hábitats"),
    "W05": ("plantas", "Plantas: partes — raíz, tallo, hojas, flores, frutos y sus funciones"),
    "W06": ("plantas", "Plantas: fotosíntesis básica, las plantas producen su alimento"),
    "W07": ("plantas", "Plantas: germinación de semillas, condiciones para el crecimiento"),
    "W08": ("plantas", "Plantas: importancia de las plantas para los seres vivos, usos cotidianos"),
    "W09": ("animales", "Animales: clasificación — vertebrados e invertebrados, mamíferos, aves, reptiles, anfibios, peces"),
    "W10": ("animales", "Animales: hábitats — terrestres, acuáticos y aéreos"),
    "W11": ("animales", "Animales: alimentación — herbívoros, carnívoros y omnívoros"),
    "W12": ("animales", "Animales: reproducción — ovíparos y vivíparos, ciclos de vida"),
    "W13": ("repaso-p1", "Repaso P1: seres vivos, plantas y animales — repaso integral"),
    "W14": ("repaso-p1", "Repaso P1: refuerzo de conceptos clave sobre seres vivos"),
    "W15": ("repaso-p2", "Repaso P2: plantas, animales, clasificación y hábitats"),
    "W16": ("repaso-p2", "Repaso P2: evaluación formativa del primer semestre"),
    "W17": ("agua", "Agua: propiedades, estados sólido, líquido y gaseoso"),
    "W18": ("agua", "Agua: ciclo del agua — evaporación, condensación, precipitación"),
    "W19": ("agua", "Agua: importancia para la vida, usos del agua en Colombia"),
    "W20": ("agua", "Agua: cuidado del agua, fuentes de agua en Colombia"),
    "W21": ("aire-clima", "Aire y clima: composición del aire, propiedades, viento"),
    "W22": ("aire-clima", "Aire y clima: clima — temperatura, precipitación. Climas de Colombia"),
    "W23": ("aire-clima", "Aire y clima: fenómenos atmosféricos — nubes, lluvia, tormentas"),
    "W24": ("aire-clima", "Aire y clima: importancia del aire, contaminación atmosférica"),
    "W25": ("suelo-recursos", "Suelo: componentes del suelo, tipos de suelo"),
    "W26": ("suelo-recursos", "Suelo: formación del suelo, capas del suelo"),
    "W27": ("suelo-recursos", "Suelo: recursos naturales renovables y no renovables"),
    "W28": ("suelo-recursos", "Suelo: conservación del suelo, agricultura en Colombia"),
    "W29": ("luz-sonido", "Luz: fuentes de luz, propagación, sombras"),
    "W30": ("luz-sonido", "Luz: propiedades — reflexión, refracción básica"),
    "W31": ("luz-sonido", "Sonido: fuentes de sonido, propagación, tono e intensidad"),
    "W32": ("luz-sonido", "Luz y sonido: el oído y la audición, la vista y la luz"),
    "W33": ("sistema-solar", "Sistema solar: el Sol, planetas del sistema solar"),
    "W34": ("sistema-solar", "Sistema solar: planetas interiores (Mercurio, Venus, Tierra, Marte)"),
    "W35": ("sistema-solar", "Sistema solar: planetas exteriores (Júpiter, Saturno, Urano, Neptuno)"),
    "W36": ("sistema-solar", "Sistema solar: la Luna, rotación y traslación, día y noche"),
    "W37": ("repaso-integral", "Repaso integral: agua, aire, suelo, clima — segundo semestre"),
    "W38": ("repaso-integral", "Repaso integral: luz, sonido, sistema solar — tercer periodo"),
    "W39": ("repaso-integral", "Repaso integral: todos los temas del año — preparación final"),
    "W40": ("repaso-integral", "Repaso integral: evaluación formativa final del año escolar"),
}

G4_MAP = {
    "W01": ("celula", "Célula: concepto básico, unidad fundamental de los seres vivos"),
    "W02": ("celula", "Célula: partes — membrana, citoplasma, núcleo. Célula animal y vegetal"),
    "W03": ("celula", "Célula: organismos unicelulares y pluricelulares. Ejemplos colombianos"),
    "W04": ("celula", "Célula: repaso de conceptos básicos sobre la célula"),
    "W05": ("tejidos-sistemas", "Tejidos y sistemas: concepto de tejido, tipos básicos de tejidos"),
    "W06": ("tejidos-sistemas", "Sistemas: esquelético y muscular del cuerpo humano"),
    "W07": ("tejidos-sistemas", "Sistema nervioso: cerebro, médula espinal, nervios"),
    "W08": ("tejidos-sistemas", "Tejidos y sistemas: repaso de tejidos y sistemas del cuerpo"),
    "W09": ("digestivo-nutricion", "Sistema digestivo: órganos del sistema digestivo, proceso de digestión"),
    "W10": ("digestivo-nutricion", "Nutrición: grupos alimenticios, la pirámide alimenticia"),
    "W11": ("digestivo-nutricion", "Nutrición: alimentos típicos colombianos y su valor nutricional"),
    "W12": ("digestivo-nutricion", "Nutrición: hábitos alimenticios saludables, prevención de enfermedades"),
    "W13": ("repaso-p1", "Repaso P1: la célula — repaso integral de conceptos celulares"),
    "W14": ("repaso-p1", "Repaso P1: tejidos y sistemas del cuerpo humano"),
    "W15": ("repaso-p2", "Repaso P2: sistema digestivo y nutrición"),
    "W16": ("repaso-p2", "Repaso P2: evaluación formativa del primer semestre"),
    "W17": ("ecosistemas-colombia", "Ecosistemas colombianos: selvas, páramos, manglares"),
    "W18": ("ecosistemas-colombia", "Ecosistemas colombianos: el páramo, flora y fauna"),
    "W19": ("ecosistemas-colombia", "Ecosistemas colombianos: bosques tropicales, Chocó biogeográfico"),
    "W20": ("ecosistemas-colombia", "Ecosistemas acuáticos: ríos, lagos, océanos de Colombia"),
    "W21": ("cadenas-alimenticias", "Cadenas alimenticias: productores, consumidores, descomponedores"),
    "W22": ("cadenas-alimenticias", "Cadenas alimenticias: redes tróficas, flujo de energía"),
    "W23": ("cadenas-alimenticias", "Cadenas alimenticias: ejemplos en ecosistemas colombianos"),
    "W24": ("cadenas-alimenticias", "Cadenas alimenticias: equilibrio ecológico, impacto humano"),
    "W25": ("materia-propiedades", "Materia: propiedades generales — masa, volumen, temperatura"),
    "W26": ("materia-propiedades", "Materia: estados de la materia — sólido, líquido, gaseoso"),
    "W27": ("materia-propiedades", "Materia: mezclas homogéneas y heterogéneas"),
    "W28": ("materia-propiedades", "Materia: cambios físicos y cambios químicos"),
    "W29": ("cambios-estado", "Cambios de estado: fusión, solidificación, evaporación, condensación"),
    "W30": ("cambios-estado", "Cambios de estado: factores — temperatura, presión"),
    "W31": ("cambios-estado", "Cambios de estado: ciclo del agua en la naturaleza"),
    "W32": ("cambios-estado", "Cambios de estado: aplicaciones cotidianas"),
    "W33": ("maquinas-simples", "Máquinas simples: concepto, la palanca"),
    "W34": ("maquinas-simples", "Máquinas simples: la rueda, el plano inclinado, la polea"),
    "W35": ("maquinas-simples", "Máquinas simples: el tornillo, la cuña"),
    "W36": ("maquinas-simples", "Máquinas simples: combinación, máquinas compuestas"),
    "W37": ("repaso-integral", "Repaso integral: ecosistemas colombianos, cadenas alimenticias"),
    "W38": ("repaso-integral", "Repaso integral: materia, propiedades, cambios de estado"),
    "W39": ("repaso-integral", "Repaso integral: máquinas simples"),
    "W40": ("repaso-integral", "Repaso integral: evaluación formativa final del año escolar"),
}

G5_MAP = {
    "W01": ("clasificacion-reinos", "Clasificación seres vivos: los cinco reinos — Monera, Protista, Fungi, Plantae, Animalia"),
    "W02": ("clasificacion-reinos", "Clasificación: reino Animalia y Plantae, ejemplos colombianos"),
    "W03": ("clasificacion-reinos", "Clasificación: reino Fungi y Protista, ejemplos en Colombia"),
    "W04": ("clasificacion-reinos", "Clasificación: reino Monera, bacterias, virus como no vivos"),
    "W05": ("respiratorio-circulatorio", "Sistema respiratorio: órganos, proceso de respiración"),
    "W06": ("respiratorio-circulatorio", "Sistema circulatorio: corazón, vasos sanguíneos, sangre"),
    "W07": ("respiratorio-circulatorio", "Relación respiración-circulación, intercambio de gases"),
    "W08": ("respiratorio-circulatorio", "Enfermedades respiratorias y cardiovasculares en Colombia"),
    "W09": ("nervioso-locomotor", "Sistema nervioso: central y periférico, neuronas"),
    "W10": ("nervioso-locomotor", "Sistema locomotor: huesos, músculos, articulaciones"),
    "W11": ("nervioso-locomotor", "Coordinación nerviosa y muscular, movimientos voluntarios e involuntarios"),
    "W12": ("nervioso-locomotor", "Salud del sistema nervioso y locomotor: postura, ejercicio"),
    "W13": ("repaso-p1", "Repaso P1: clasificación de los seres vivos por reinos"),
    "W14": ("repaso-p1", "Repaso P1: sistema respiratorio y circulatorio"),
    "W15": ("repaso-p2", "Repaso P2: sistema nervioso y locomotor"),
    "W16": ("repaso-p2", "Repaso P2: evaluación formativa del primer semestre"),
    "W17": ("ecosistemas-relaciones", "Ecosistemas: relaciones interespecíficas — mutualismo, comensalismo, parasitismo, depredación"),
    "W18": ("ecosistemas-relaciones", "Ecosistemas: relaciones en ecosistemas colombianos — Chocó, Amazonía"),
    "W19": ("ecosistemas-relaciones", "Ecosistemas: sucesión ecológica, cambios en el tiempo"),
    "W20": ("ecosistemas-relaciones", "Ecosistemas: impacto humano — deforestación, contaminación en Colombia"),
    "W21": ("ciclos-agua-carbono", "Ciclo del agua: evaporación, condensación, precipitación, infiltración"),
    "W22": ("ciclos-agua-carbono", "Ciclo del agua: cuencas hidrográficas colombianas"),
    "W23": ("ciclos-agua-carbono", "Ciclo del carbono: fotosíntesis, respiración, combustión"),
    "W24": ("ciclos-agua-carbono", "Ciclo del carbono: efecto invernadero, cambio climático, Colombia"),
    "W25": ("energia", "Energía: fuentes renovables y no renovables, tipos de energía"),
    "W26": ("energia", "Energía renovable: solar, eólica, hidroeléctrica. Potencial en Colombia"),
    "W27": ("energia", "Energía no renovable: carbón, petróleo, gas natural. Impacto ambiental"),
    "W28": ("energia", "Energía: transformación, conservación, eficiencia energética"),
    "W29": ("electricidad", "Electricidad: carga eléctrica, corriente, circuitos simples"),
    "W30": ("electricidad", "Electricidad: conductores y aislantes, cobre colombiano"),
    "W31": ("electricidad", "Electricidad: pilas, baterías, energía eléctrica en hogares colombianos"),
    "W32": ("electricidad", "Electricidad: seguridad eléctrica, ahorro de energía"),
    "W33": ("magnetismo", "Magnetismo: imanes naturales y artificiales, polos magnéticos"),
    "W34": ("magnetismo", "Magnetismo: campo magnético terrestre, brújula"),
    "W35": ("magnetismo", "Electroimanes: construcción y aplicaciones"),
    "W36": ("magnetismo", "Electricidad y magnetismo: relación, aplicaciones tecnológicas"),
    "W37": ("repaso-integral", "Repaso integral: ecosistemas, relaciones, ciclo del agua"),
    "W38": ("repaso-integral", "Repaso integral: ciclo del carbono, energía renovable y no renovable"),
    "W39": ("repaso-integral", "Repaso integral: electricidad y magnetismo"),
    "W40": ("repaso-integral", "Repaso integral: evaluación formativa final del año escolar"),
}

# ═══════════════════════════════════════════════════════════════════
# QUESTION BANK — G3
# ═══════════════════════════════════════════════════════════════════

# I'll generate 10 questions <bloom><icfes><success> for each week by topic generator functions

import random
random.seed(2026)

CITIES = [
    ("Bogotá", "Colegio La Salle en Bogotá"),
    ("Medellín", "IE San José de Medellín"),
    ("Cali", "Colegio Santa Cecilia de Cali"),
    ("Barranquilla", "Escuela Normal Superior de Barranquilla"),
    ("Bucaramanga", "Colegio San Pedro de Bucaramanga"),
    ("Cartagena", "IE San Felipe de Cartagena"),
    ("Pereira", "Colegio SURAMERICANA de Pereira"),
    ("Manizales", "Escuela Normal Superior de Manizales"),
    ("Ibagué", "Colegio San Simón de Ibagué"),
    ("Neiva", "IE Santa Teresa de Neiva"),
    ("Sincelejo", "Colegio Francisco de Paula Santander"),
    ("Valledupar", "IE Alfonso López de Valledupar"),
    ("Riohacha", "Colegio Nacional José María Córdoba"),
    ("Pasto", "Colegio San Francisco Javier de Pasto"),
    ("Tunja", "Escuela Normal Santiago de Tunja"),
    ("Cúcuta", "Colegio San José de Cúcuta"),
    ("Leticia", "Escuela Rural La Esperanza en Leticia"),
    ("Quibdó", "IE Técnica de Quibdó, Chocó"),
    ("Mocoa", "Escuela Ecológica de Mocoa, Putumayo"),
    ("San Andrés", "Colegio Sagrado Corazón de San Andrés"),
]

def c():
    return random.choice(CITIES)

# ═══════════════════════════════════════════════════════════════════
# BUNDLE WRITER
# ═══════════════════════════════════════════════════════════════════

def write_bundle(grado, semana, segment, rubric, questions, year=2026):
    """Write a complete bundle markdown file."""
    n = semana[1:]
    id_str = f"CO-CIE-{grado}-2026-W{n}-{segment}-001-MASTERY"
    filename = f"{id_str}-bundle.md"
    
    title_map = {
        "seres-vivos":"Seres Vivos",
        "plantas":"Las Plantas", "animales":"Los Animales",
        "repaso-p1":"Repaso Periodo 1", "repaso-p2":"Repaso Periodo 2",
        "agua":"El Agua", "aire-clima":"El Aire y el Clima",
        "suelo-recursos":"El Suelo y los Recursos Naturales",
        "luz-sonido":"La Luz y el Sonido", "sistema-solar":"El Sistema Solar",
        "repaso-integral":"Repaso Integral",
        "celula":"La Célula", "tejidos-sistemas":"Tejidos y Sistemas",
        "digestivo-nutricion":"Sistema Digestivo y Nutrición",
        "ecosistemas-colombia":"Ecosistemas Colombianos",
        "cadenas-alimenticias":"Cadenas Alimenticias",
        "materia-propiedades":"Materia y sus Propiedades",
        "cambios-estado":"Cambios de Estado",
        "maquinas-simples":"Máquinas Simples",
        "clasificacion-reinos":"Clasificación de los Seres Vivos",
        "respiratorio-circulatorio":"Sistema Respiratorio y Circulatorio",
        "nervioso-locomotor":"Sistema Nervioso y Locomotor",
        "ecosistemas-relaciones":"Relaciones en los Ecosistemas",
        "ciclos-agua-carbono":"Ciclos del Agua y del Carbono",
        "energia":"Energía: Fuentes Renovables y No Renovables",
        "electricidad":"Electricidad Básica",
        "magnetismo":"Magnetismo y Electroimanes",
    }
    title = title_map.get(segment, segment.replace("-"," ").title())
    
    bundle_title = f"Bundle Mastery: {title} — Semana {n} (Grado {grado})"
    
    dir_path = os.path.join(BASE, f"grado-{grado}", str(year), "weekly")
    os.makedirs(dir_path, exist_ok=True)
    filepath = os.path.join(dir_path, filename)
    
    frontmatter = f"""---
id: "{id_str}"
country: "colombia"
grado: {grado}
asignatura: "ciencias-naturales"
tema: "{segment}"
semana: "W{n}"
protocol_version: "5.2"
year: {year}
bundle_index: 1
bundle_size: 10
alignment: "DBA MEN + Estándares Básicos de Ciencias Naturales"
modern_context: true
distractor_profile: "plausible_peer_set"
rubric_baseline: "{rubric}"
---

# {bundle_title}

Este bundle cubre los temas de {rubric.lower()}. Alineado con los DBA del MEN para grado {grado} en Colombia.

---

"""
    body = "\n---\n\n".join(questions)
    content = frontmatter + body + "\n"
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  ✓ {filename}")
    return filepath


# ═══════════════════════════════════════════════════════════════════
# BUILD FUNCTIONS — one per grade+topic
# ═══════════════════════════════════════════════════════════════════

def q(id_str, v, bloom, icfes, success, ctx, stem, opts, expl):
    """Build a question block."""
    lines = [f"""## Pregunta {v} [D{min(v,5)}]

**ID:** `{id_str}-v{v}`
**Bloom:** {bloom}
**ICFES:** {icfes}
**Expected_Success:** {success:.2f}
**Context:** {ctx}

### Enunciado

{stem}

### Opciones"""]
    for letter, text, feedback in opts:
        checked = "[x]" if letter[0] == "A" else "[ ]"
        lines.append(f"- {checked} {letter[0]}) {text} <!-- feedback: {feedback} -->")
    lines.append(f"""
### Explicación Pedagógica

{expl}""")
    return "\n".join(lines)

# ═══════════════════════════════════════════════════════════════════
# G3 QUESTIONS
# ═══════════════════════════════════════════════════════════════════

def g3_questions(semana, segment):
    n = int(semana[1:])
    id_base = f"CO-CIE-3-2026-{semana}-{segment}-001-MASTERY"
    qs = []
    
    if segment == "seres-vivos":
        # W01-W04: 10 questions each across seres-vivos
        if semana == "W01":
            qs = [
                q(id_base,1,"Remember","Uso comprensivo del conocimiento científico",0.85,
                  f"En {c()[0]}, los estudiantes observan diferentes elementos en el salón de clase.",
                  "¿Cuál de los siguientes es un SER VIVO?",
                  [("A)","Un lápiz","Incorrecto. El lápiz es un objeto inerte."),
                   ("B)","Un gato","¡Correcto! El gato es un ser vivo porque nace, crece, se reproduce y muere."),
                   ("C)","Una mesa","Incorrecto. La mesa es un objeto inerte."),
                   ("D)","Una botella","Incorrecto. La botella no tiene vida.")],
                  "Un gato es un ser vivo del reino animal. Los seres vivos se caracterizan porque nacen, crecen, se alimentan, se reproducen y mueren. Los objetos como lápices, mesas y botellas son inertes."),
                q(id_base,2,"Remember","Indagación y Comprensión",0.80,
                  f"Los estudiantes de {c()[0]} observan cómo los árboles cambian durante el año.",
                  "¿Qué característica de los seres vivos se observa cuando un árbol crece y produce flores?",
                  [("A)","Crece y se reproduce","¡Correcto! El árbol crece en tamaño y produce flores para reproducirse."),
                   ("B)","Habla","Incorrecto. Los árboles no hablan."),
                   ("C)","Juega","Incorrecto. Los árboles no juegan."),
                   ("D)","Construye casas","Incorrecto. Los árboles no construyen.")],
                  "Los árboles crecen aumentando su tamaño y se reproducen a través de flores y semillas. Estas son dos funciones vitales de los seres vivos."),
                q(id_base,3,"Understand","Explicación de fenómenos",0.75,
                  f"En el zoológico de {c()[0]}, los niños observan diferentes animales.",
                  "Un pez nada en el agua, un pájaro vuela y un perro camina. ¿Qué característica común tienen estos seres vivos?",
                  [("A)","Todos pueden volar","Incorrecto. Solo el pájaro vuela."),
                   ("B)","Todos se pueden mover","¡Correcto! Los tres animales tienen la capacidad de moverse."),
                   ("C)","Todos viven en el agua","Incorrecto. Solo el pez vive en el agua."),
                   ("D)","Todos tienen plumas","Incorrecto. Solo el pájaro tiene plumas.")],
                  "El movimiento es una característica de los seres vivos. Aunque se mueven de diferentes maneras, todos los animales tienen la capacidad de desplazarse."),
                q(id_base,4,"Understand","Uso comprensivo del conocimiento científico",0.70,
                  f"{c()[1]} estudia las funciones vitales de los seres vivos.",
                  "¿Cuál de las siguientes es una función vital de los seres vivos?",
                  [("A)","Dibujar","Incorrecto. Dibujar no es una función vital."),
                   ("B)","Cantar","Incorrecto. Cantar no es necesario para vivir."),
                   ("C)","Nutrición","¡Correcto! La nutrición es una función vital."),
                   ("D)","Vender","Incorrecto. Vender no es una función vital.")],
                  "Las funciones vitales de los seres vivos son: nutrición (obtener alimento), relación (responder a estímulos) y reproducción (crear descendencia)."),
                q(id_base,5,"Understand","Indagación y Comprensión",0.65,
                  f"En {c()[0]}, la profesora pregunta qué necesitan los seres vivos para vivir.",
                  "¿Qué necesitan las plantas para fabricar su alimento?",
                  [("A)","Agua y luz solar","¡Correcto! Las plantas usan agua, luz solar y dióxido de carbono."),
                   ("B)","Solo tierra","Incorrecto. Necesitan más que tierra."),
                   ("C)","Leche y pan","Incorrecto. Las plantas no comen leche ni pan."),
                   ("D)","Solo oscuridad","Incorrecto. Las plantas necesitan luz.")],
                  "Las plantas realizan fotosíntesis usando agua, luz solar y dióxido de carbono para producir su alimento (azúcares)."),
                q(id_base,6,"Apply","Formulación y Ejecución",0.60,
                  f"Los niños de {c()[0]} hacen un experimento con lombrices.",
                  "Si pones lombrices de tierra en un frasco con tierra húmeda y las dejas en un lugar oscuro, ¿qué crees que pasará?",
                  [("A)","Las lombrices morirán inmediatamente","Incorrecto. Las lombrices viven en tierra húmeda y oscura."),
                   ("B)","Las lombrices vivirán y se moverán en la tierra","¡Correcto! Las lombrices necesitan humedad y oscuridad."),
                   ("C)","Las lombrices se convertirán en mariposas","Incorrecto. Las lombrices no se transforman."),
                   ("D)","Las lombrices se comerán entre ellas","Incorrecto. Las lombrices comen materia orgánica.")],
                  "Las lombrices de tierra son seres vivos que necesitan condiciones específicas: tierra húmeda, oscuridad y materia orgánica para alimentarse."),
                q(id_base,7,"Apply","Formulación y Ejecución",0.55,
                  f"En el jardín de {c()[0]}, los estudiantes observan una planta que gira hacia el sol.",
                  "¿Por qué las plantas giran sus hojas hacia la luz del sol?",
                  [("A)","Porque quieren ver","Incorrecto. Las plantas no ven."),
                   ("B)","Porque necesitan luz para fabricar alimento","¡Correcto! Las plantas necesitan luz para la fotosíntesis."),
                   ("C)","Porque tienen miedo a la oscuridad","Incorrecto. Las plantas no tienen emociones."),
                   ("D)","Porque les gusta bailar","Incorrecto. Las plantas no bailan.")],
                  "Las plantas son seres vivos que responden a estímulos. Giran hacia la luz (fototropismo) para captar la mayor cantidad posible de luz solar y así realizar la fotosíntesis."),
                q(id_base,8,"Analyze","Razonamiento y Argumentación",0.50,
                  f"Los estudiantes de {c()[1]} comparan dos situaciones: una piedra en el patio y un árbol en el mismo lugar.",
                  "Después de un año, la piedra sigue igual pero el árbol es más alto y tiene más ramas. ¿Por qué?",
                  [("A)","Porque la piedra es más fuerte","Incorrecto. La fortaleza no determina si algo crece."),
                   ("B)","Porque el árbol es un ser vivo que crece y la piedra es un objeto inerte","¡Correcto! Los seres vivos crecen; los objetos inertes no cambian."),
                   ("C)","Porque la piedra está dormida","Incorrecto. Las piedras no duermen."),
                   ("D)","Porque al árbol le echan agua","Incorrecto. Aunque el agua ayuda, la diferencia fundamental es que el árbol está vivo.")],
                  "El crecimiento es una característica exclusiva de los seres vivos. El árbol crece porque realiza funciones vitales. La piedra, al ser un objeto inerte, permanece igual."),
                q(id_base,9,"Analyze","Explicación de fenómenos",0.50,
                  f"En {c()[0]}, los niños encuentran un caracol que se esconde dentro de su concha cuando lo tocan.",
                  "¿Qué función vital está demostrando el caracol al esconderse?",
                  [("A)","Nutrición","Incorrecto. No se está alimentando."),
                   ("B)","Reproducción","Incorrecto. No se está reproduciendo."),
                   ("C)","Irritabilidad o relación con el medio","¡Correcto! Responde al estímulo del tacto."),
                   ("D)","Crecimiento","Incorrecto. No está creciendo en ese momento.")],
                  "La irritabilidad es la capacidad de los seres vivos para detectar cambios en el ambiente y responder a ellos. El caracol detecta el tacto como señal de peligro y se protege."),
                q(id_base,10,"Evaluate","Razonamiento y Argumentación",0.45,
                  f"{c()[1]} realiza un debate: ¿una semilla de frijol es un ser vivo?",
                  "¿Cuál es la mejor razón para decir que una semilla SÍ es un ser vivo?",
                  [("A)","Porque se puede comer","Incorrecto. Comerse algo no lo hace ser vivo."),
                   ("B)","Porque contiene un embrión que puede germinar y dar una nueva planta","¡Correcto! La semilla tiene vida en estado latente."),
                   ("C)","Porque es de color café","Incorrecto. El color no determina si algo está vivo."),
                   ("D)","Porque es pequeña","Incorrecto. El tamaño no define la vida.")],
                  "Una semilla contiene un embrión vegetal vivo en estado de latencia. Cuando recibe agua, oxígeno y temperatura adecuada, germina y da origen a una nueva planta. Por eso es un ser vivo."),
            ]
        elif semana == "W02":
            qs = [
                q(id_base,1,"Remember","Uso comprensivo del conocimiento científico",0.85,
                  f"En {c()[1]}, los estudiantes aprenden sobre las necesidades de los seres vivos.",
                  "¿Cuál de los siguientes NO es una necesidad básica de los seres vivos?",
                  [("A)","Agua","Incorrecto. Todos necesitan agua."),
                   ("B)","Alimento","Incorrecto. Todos necesitan alimento o nutrientes."),
                   ("C)","Un teléfono celular","¡Correcto! El teléfono no es necesario para la vida."),
                   ("D)","Aire","Incorrecto. Todos necesitan aire o gases para respirar.")],
                  "Las necesidades básicas de los seres vivos son: agua, alimento (nutrientes), aire (oxígeno o CO₂) y un hábitat adecuado. Los objetos tecnológicos no son necesarios."),
                q(id_base,2,"Remember","Indagación y Comprensión",0.80,
                  f"Los estudiantes de {c()[0]} observan una planta marchita que dejaron sin agua.",
                  "¿Qué necesita una planta para mantenerse saludable?",
                  [("A)","Solo tierra","Incorrecto. Necesita más que tierra."),
                   ("B)","Agua, luz solar y nutrientes","¡Correcto! Las plantas necesitan agua, luz y minerales."),
                   ("C)","Un televisor","Incorrecto. No necesita aparatos electrónicos."),
                   ("D)","Un sombrero","Incorrecto. Las plantas no usan ropa.")],
                  "Las plantas requieren agua para transportar nutrientes, luz solar para la fotosíntesis y minerales del suelo para crecer. Sin estos elementos no pueden sobrevivir."),
                q(id_base,3,"Understand","Uso comprensivo del conocimiento científico",0.75,
                  f"En el parque de {c()[0]}, los niños ven diferentes seres vivos.",
                  "¿Cómo se llama el lugar donde vive naturalmente un ser vivo?",
                  [("A)","Casa","Incorrecto. Casa es donde viven los humanos."),
                   ("B)","Hábitat","¡Correcto! El hábitat es el lugar natural donde vive un ser vivo."),
                   ("C)","Escuela","Incorrecto. La escuela no es el hábitat natural."),
                   ("D)","Ciudad","Incorrecto. La ciudad no es el hábitat natural de la mayoría de seres vivos.")],
                  "El hábitat es el lugar donde un ser vivo encuentra todo lo que necesita para vivir: alimento, agua, refug