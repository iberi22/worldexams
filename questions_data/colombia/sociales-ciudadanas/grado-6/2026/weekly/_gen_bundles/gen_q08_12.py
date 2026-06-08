#!/usr/bin/env python3
"""Generate SOC G6 weekly bundles W08-W40 (33 packs, 330 questions)."""
import os, json

OUT = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly"
os.makedirs(OUT, exist_ok=True)

def q(bloom, stem, opts, correct, expl):
    return {
        "bloom": bloom, "icfes": "Pensamiento Social", "stem": stem,
        "options": [[chr(65+i), t, f] for i,(t,f) in enumerate(opts)],
        "correct": correct, "explanation": expl
    }

# ===== ALL QUESTIONS BY WEEK =====
ALL = {}

# W08: Mesopotamia
ALL[8] = [
    q("Remember","Entre que dos rios se desarrollo la civilizacion de Mesopotamia?",
      [("Rio Nilo y Rio Jordan","Incorrecto. El Nilo esta en Egipto."),("Rio Tigris y Rio Eufrates","Correcto. Mesopotamia significa 'tierra entre rios'."),("Rio Danubio y Rio Rin","Incorrecto. Estan en Europa."),("Rio Indo y Rio Ganges","Incorrecto. Estan en la India.")],"B",
      "Mesopotamia se desarrollo entre los rios Tigris y Eufrates, en el actual Irak."),
    q("Remember","Que invento se atribuye a los sumerios?",
      [("El papel","Incorrecto. Fue inventado en China."),("Los jeroglificos","Incorrecto. Son egipcios."),("La escritura cuneiforme","Correcto. Hacia el 3500 a.C."),("El alfabeto fonetico","Incorrecto. Es fenicio.")],"C",
      "Los sumerios crearon la escritura cuneiforme, signos en forma de cuna grabados en tablillas."),
    q("Understand","Por que es importante el Codigo de Hammurabi?",
      [("Es el primer libro de poemas conocido","Incorrecto. No es literario."),("Describe como construir piramides","Incorrecto. No trata de construccion."),("Uno de los primeros conjuntos de leyes escritas","Correcto. 282 leyes basadas en 'ojo por ojo'."),("Narra la creacion del mundo","Incorrecto. Es el Poema de Gilgamesh.")],"C",
      "El Codigo de Hammurabi (1754 a.C.) es uno de los primeros codigos legales escritos."),
    q("Apply","Un estudiante en Bogota ve una maqueta de un zigurat. Cual era su funcion?",
      [("Tumbas para faraones","Incorrecto. Las piramides egipcias."),("Templos religiosos en forma de torre escalonada","Correcto. Cada ciudad tenia uno."),("Mercados comerciales","Incorrecto. Eran templos."),("Fortalezas militares","Incorrecto. Las murallas defendian las ciudades.")],"B",
      "Los zigurats eran torres escalonadas que servian como templos para el dios protector."),
    q("Understand","Como se organizaba la sociedad en Mesopotamia?",
      [("Era una sociedad sin clases","Incorrecto. Era jerarquica."),("Rey, sacerdotes, escribas, comerciantes, campesinos y esclavos","Correcto. Piramide jerarquica."),("Solo dos clases: libres y esclavos","Incorrecto. Habia varios niveles."),("El pueblo elegia a los gobernantes","Incorrecto. Era monarquia.")],"B",
      "Sociedad jerarquica: rey, sacerdotes, escribas, comerciantes, campesinos, esclavos."),
    q("Analyze","Por que Mesopotamia es 'cuna de la civilizacion'?",
      [("Alli aparecio el primer ser humano","Incorrecto. Fue en Africa."),("Alli surgieron las primeras ciudades, escritura y Estado","Correcto."),("Se construyeron las primeras piramides","Incorrecto. Son egipcias."),("Alli se domesticaron los primeros animales","Incorrecto. Ocurrio en el Neolitico.")],"B",
      "Mesopotamia fue cuna de la ciudad, la escritura, las leyes y la agricultura de regadio."),
    q("Remember","Cual era el dios principal de los babilonios?",
      [("Zeus","Incorrecto. Griego."),("Ra","Incorrecto. Egipcio."),("Marduk","Correcto. Patrono de Babilonia."),("Odin","Incorrecto. Nordico.")],"C",
      "Marduk era el dios principal. Segun el mito vencio al caos (Tiamat)."),
    q("Apply","Para que servian los canales de riego en Mesopotamia?",
      [("Para navegar entre ciudades","Incorrecto. No era su fin principal."),("Para regar los cultivos","Correcto. Llevaban agua del Tigris y Eufrates."),("Para proveer agua potable","Incorrecto. Eran para agricultura."),("Para defender ciudades","Incorrecto. La defensa era con murallas.")],"B",
      "Los canales permitian la agricultura productiva al controlar inundaciones."),
    q("Evaluate","Comparando la escritura cuneiforme con la comunicacion digital actual:",
      [("La cuneiforme era mas rapida","Incorrecto. Escribir en arcilla era muy lento."),("La cuneiforme era fisica; la digital es instantanea y global","Correcto."),("Ambas usan el mismo alfabeto","Incorrecto. La cuneiforme usaba pictogramas."),("Los mesopotamicos no tenian escritura","Incorrecto. Inventaron la primera.")],"B",
      "La comunicacion evoluciono de tablillas fisicas a mensajes globales instantaneos."),
    q("Understand","Que unifico a los imperios acadio, babilonico y asirio?",
      [("Eran imperios maritimos","Incorrecto. Mesopotamia no tiene costa."),("Gobernaron toda Europa","Incorrecto. Solo controlaron Mesopotamia."),("Unificaron territorios entre el Tigris y Eufrates","Correcto."),("Fueron derrotados por Egipto","Incorrecto. Cayeron ante los persas.")],"C",
      "Acadios, babilonios y asirios controlaron la region mesopotamica en distintos periodos."),
]

# W09: Egipto
ALL[9] = [
    q("Remember","Que rio fue esencial para Egipto?",[("Tigris","Incorrecto. Mespotamico."),("Nilo","Correcto. Herodoto: 'Egipto es un don del Nilo'."),("Jordan","Incorrecto. Palestina."),("Indo","Incorrecto. India.")],"B","El Nilo depositaba limo fertil en sus inundaciones anuales."),
    q("Remember","Gobernante egipcio considerado un dios?",[("Emperador","Incorrecto. Romano."),("Faraon","Correcto. Autoridad absoluta, hijo de Ra."),("Rey-sacerdote","Incorrecto. Su titulo era faraon."),("Satrapa","Incorrecto. Gobernador persa.")],"B","El faraon era monarca absoluto politico, religioso y militar."),
    q("Understand","Proposito de las piramides?",[("Observatorios","Incorrecto."),("Templos","Incorrecto. Aparte."),("Tumbas monumentales de faraones","Correcto."),("Almacenes","Incorrecto.")],"C","Preservaban el cuerpo del faraon para la vida eterna."),
    q("Apply","Por que momificaban?",[("Conservar el cuerpo para el alma","Correcto."),("Curar enfermedades","Incorrecto."),("Arte","Incorrecto."),("Alimentar animales","Incorrecto.")],"A","Creian que el ka y el ba necesitaban el cuerpo."),
    q("Understand","Cima social egipcia?",[("Campesinos","Incorrecto."),("Faraon, familia real, altos sacerdotes","Correcto."),("Soldados","Incorrecto."),("Esclavos","Incorrecto.")],"B","Faraon, nobles, sacerdotes, escribas, comerciantes, artesanos, campesinos, esclavos."),
    q("Analyze","Calendario egipcio 365 dias?",[("Copiado de romanos","Incorrecto. Anterior."),("Predecir inundaciones del Nilo","Correcto."),("Cumpleanos del faraon","Incorrecto."),("Fases lunares","Incorrecto. Solar.")],"B","Uno de los primeros calendarios solares."),
    q("Remember","Escritura egipcia?",[("Cuneiforme","Incorrecto. Mesopotamica."),("Jeroglifico","Correcto."),("Alfabeto fenicio","Incorrecto."),("Sanscrito","Incorrecto. India.")],"B","Jeroglificos: logogramas y signos foneticos."),
    q("Apply","Por que adoraban a Ra?",[("Dios guerra","Incorrecto. Sol."),("Dios sol, fuente de vida","Correcto."),("Dios Nilo","Incorrecto. Hapy."),("Protegia piramides","Incorrecto. Anubis.")],"B","Ra era la deidad mas importante."),
    q("Evaluate","Diferencia gobierno Egipto vs Colombia:",[("Ambos eligen","Incorrecto."),("Teocracia faraonica vs democracia separacion poderes","Correcto."),("Ambos Congreso","Incorrecto."),("Presidente dios","Incorrecto. Laica.")],"B","Egipto concentraba poder; Colombia divide ejecutivo, legislativo, judicial."),
    q("Understand","Papel escribas?",[("Esclavos","Incorrecto. Prestigio."),("Funcionarios registraban cosechas e impuestos","Correcto."),("Guerreros","Incorrecto."),("Sacerdotes","Incorrecto.")],"B","Sabian leer y escribir, administraban el Estado."),
]

# W10: India y China
ALL[10] = [
    q("Remember","Rio de la primera civilizacion india?",
      [("Ganges","Incorrecto. La mas antigua fue en el Indo."),("Indo","Correcto. Civilizacion del Valle del Indo (Harappa)."),("Brahmaputra","Incorrecto."),("Nilo","Incorrecto. Africa.")],"B",
      "La civilizacion del Valle del Indo tenia avanzada planificacion urbana."),
    q("Remember","Escritura mas antigua de China?",
      [("Jeroglifico","Incorrecto. Egipcio."),("Cuneiforme","Incorrecto. Mesopotamico."),("Caracteres en huesos oraculares","Correcto. Dinastia Shang."),("Sanscrito","Incorrecto. India.")],"C",
      "Huesos oraculares de la dinastia Shang, usados para adivinacion."),
    q("Understand","Sistema de castas indio?",
      [("Gobierno","Incorrecto."),("Jerarquia social hereditaria en grupos cerrados","Correcto. Brahmanes, chatrias, vaisias, sudras."),("Escritura","Incorrecto."),("Templo","Incorrecto.")],"B",
      "Las castas (varnas) eran hereditarias."),
    q("Apply","Buda ensenaba sobre:",[("Muchos dioses","Incorrecto."),("El camino para superar el sufrimiento","Correcto. Camino Octuple."),("Guerra santa","Incorrecto. Paz."),("Piramides","Incorrecto.")],"B","Buda propuso el Camino Octuple hacia el Nirvana."),
    q("Understand","Confucio ensenaba:",[("Vida despues muerte","Incorrecto. Terrenal."),("Armonia social, respeto, rectitud moral","Correcto."),("Conquista militar","Incorrecto. Paz."),("Un solo dios","Incorrecto. No teista.")],"B","Confucio (551-479 a.C.): respeto, lealtad, educacion."),
    q("Analyze","Importancia Gran Muralla?",[("Templo","Incorrecto."),("Proteger de invasiones del norte","Correcto. Contra mongoles."),("Mercado","Incorrecto."),("Canal","Incorrecto.")],"B","La Gran Muralla protegia China del norte."),
    q("Remember","Invento chino que revoluciono la navegacion?",[("Astrolabio","Incorrecto. Griego."),("Brujula","Correcto. Dinastia Han."),("Telescopio","Incorrecto. S. XVII."),("Barco vapor","Incorrecto. S. XIX.")],"B","La brujula magnetica china se uso para navegacion."),
    q("Apply","El hinduismo se caracteriza por:",[("Un solo dios","Incorrecto. Politeista."),("Muchos dioses y reencarnacion","Correcto."),("Rechazar dioses","Incorrecto."),("Adorar al faraon","Incorrecto.")],"B","Religion viva mas antigua, politeista, con karma y samsara."),
    q("Evaluate","Similitud India y China antiguas?",[("Democracias","Incorrecto. Monarquias."),("Civilizaciones fluviales","Correcto."),("Mismo alfabeto","Incorrecto."),("Rechazaban comercio","Incorrecto. Comerciaban.")],"B","Surgieron alrededor de grandes rios."),
    q("Understand","Que aislo geograficamente a China?",[("Mar por todos lados","Incorrecto."),("Himalaya, desiertos y oceano","Correcto."),("Sin fronteras naturales","Incorrecto."),("Muros construidos","Incorrecto.")],"B","El Himalaya, desierto de Gobi y Pacifico aislaron a China."),
]

# W11: Fenicios, Hebreos, Persas
ALL[11] = [
    q("Remember","Por que son conocidos los fenicios?",
      [("Piramides","Incorrecto. Egipcios."),("Navegantes, comerciantes y alfabeto","Correcto."),("Imperio mas grande","Incorrecto. Comerciantes."),("Democracia","Incorrecto. Griegos.")],"B",
      "Fenicios (actual Libano): crearon el primer alfabeto fonetico."),
    q("Remember","Contribucion fenicia a la escritura?",
      [("Cuneiforme","Incorrecto. Mesopotamia."),("Jeroglifico","Incorrecto. Egipto."),("Alfabeto fonetico de 22 signos","Correcto."),("Papel","Incorrecto. China.")],"C",
      "Alfabeto fenicio: 22 signos consonanticos, base de alfabetos occidentales."),
    q("Understand","Que distingue a los hebreos?",
      [("Politeistas","Incorrecto."),("Primer pueblo monoteista organizado","Correcto. Yahve."),("Ciudades-estado","Incorrecto. Tribus y reino."),("Piramides","Incorrecto.")],"B",
      "Hebreos: monoteismo. Su religion (judaismo) es base del cristianismo e islam."),
    q("Apply","Colonias fenicias en Mediterraneo:",[("Conquistar","Incorrecto."),("Puestos comerciales","Correcto. Cartago era puerto."),("Monoteismo","Incorrecto. Politeistas."),("Refugio","Incorrecto. Comercio.")],"B","Puertos estrategicos para intercambio."),
    q("Understand","Quien fue Ciro el Grande?",[("Faraon egipcio","Incorrecto."),("Rey persa que unifico Mesopotamia","Correcto."),("Profeta hebreo","Incorrecto."),("Filosofo griego","Incorrecto.")],"B","Ciro fundo el Imperio Persa Aquemenida con tolerancia cultural."),
    q("Remember","Religion de los persas?",[("Cristianismo","Incorrecto."),("Islam","Incorrecto."),("Zoroastrismo","Correcto. Ahura Mazda."),("Budismo","Incorrecto.")],"C","Zoroastrismo: dios del bien Ahura Mazda contra el mal."),
    q("Analyze","Por que el alfabeto fenicio fue revolucionario?",[("Tenia miles de signos","Incorrecto. Solo 22."),("Era simple, facil de aprender y difundir","Correcto."),("Solo lo usaban fenicios","Incorrecto."),("Era pictografico","Incorrecto. Era fonetico.")],"B","Alfabeto simple de 22 signos, facil de aprender y adaptar."),
    q("Apply","Los hebreos creian en la libertad guiados por:",[("Un faraon","Incorrecto."),("Moises","Correcto. Libero a los hebreos de Egipto."),("Alejandro Magno","Incorrecto."),("Ciro el Persa","Incorrecto.")],"B","Moises lidero el Exodo de Egipto segun el relato biblico."),
    q("Evaluate","Legado de fenicios, hebreos y persas:",[("Sus imperios duran hoy","Incorrecto."),("Alfabeto, monoteismo y administracion imperial","Correcto."),("No dejaron legado","Incorrecto."),("Construyeron las piramides","Incorrecto.")],"B","Alfabeto (fenicios), monoteismo (hebreos), imperio organizado (persas)."),
    q("Understand","Los persas dividieron su imperio en:",[("Ciudades-estado","Incorrecto."),("Satrapias","Correcto. Provincias gobernadas por satrapas."),("Reinos feudales","Incorrecto."),("Polis","Incorrecto. Griegas.")],"B","Satrapias: provincias con gobernador (satrapa) y cierto autogobierno."),
]

# W12: Repaso P2
ALL[12] = [
    q("Remember","Cual fue la primera civilizacion en desarrollar escritura?",
      [("Egipto","Incorrecto. Jeroglificos pero despues."),("Mesopotamia (sumerios)","Correcto. Cuneiforme hacia 3500 a.C."),("China","Incorrecto."),("India","Incorrecto.")],"B",
      "Los sumerios en Mesopotamia crearon la escritura cuneiforme."),
    q("Understand","Que rio fue vital para Egipto?",
      [("Tigris","Incorrecto."),("Eufrates","Incorrecto."),("Nilo","Correcto."),("Indo","Incorrecto.")],"C",
      "El Nilo con sus inundaciones anuales fertilizaba las tierras."),
    q("Apply","Comparando faraon egipcio con presidente colombiano:",[("Ambos son elegidos","Incorrecto."),("Ambos son vitalicios","Incorrecto."),("El faraon era dios, el presidente es elegido por voto popular","Correcto."),("No hay diferencia","Incorrecto.")],"C","Egipto: teocracia. Colombia: democracia."),
    q("Remember","Donde se desarrollo el budismo?",
      [("China","Incorrecto. Buda era principe indio."),("India","Correcto. Siddhartha Gautama."),("Egipto","Incorrecto."),("Persia","Incorrecto.")],"B",
      "El budismo surgio en la India en el siglo VI a.C."),
    q("Understand","Cual era la principal actividad fenicia?",
      [("Agricultura","Incorrecto."),("Comercio maritimo","Correcto."),("Guerra","Incorrecto."),("Mineria","Incorrecto.")],"B",
      "Los fenicios eran comerciantes y navegantes."),
    q("Analyze","Por que los hebreos fueron importantes?",
      [("Su imperio duro siglos","Incorrecto."),("Introdujeron el monoteismo","Correcto."),("Inventaron el alfabeto","Incorrecto. Fenicios."),("Construyeron piramides","Incorrecto.")],"B",
      "El monoteismo hebreo influyo en cristianismo e islam."),
    q("Apply","Maqueta de zigurat en museo de Bogota: funcion?",
      [("Tumba faraonica","Incorrecto."),("Templo religioso escalonado","Correcto."),("Mercado","Incorrecto."),("Palacio","Incorrecto.")],"B",
      "Zigurats: templos mesopotamicos en forma de torre escalonada."),
    q("Evaluate","Que legado persa influye hoy?",
      [("La democracia","Incorrecto."),("La administracion de provincias (satrapias)","Correcto. Modelo de gobierno descentralizado."),("El alfabeto","Incorrecto."),("Las piramides","Incorrecto.")],"B",
      "Las satrapias persas son antecedente de la administracion provincial."),
    q("Remember","Escritura egipcia?",
      [("Cuneiforme","Incorrecto."),("Jeroglifico","Correcto."),("Alfabeto","Incorrecto."),("Sanscrito","Incorrecto.")],"B",
      "Jeroglificos: escritura sagrada egipcia."),
    q("Understand","Sociedad india se organizaba en:",
      [("Clases sociales moviles","Incorrecto."),("Castas hereditarias","Correcto."),("Tribus igualitarias","Incorrecto."),("Ciudades-estado","Incorrecto.")],"B",
      "Sistema de castas (varnas): sacerdotes, guerreros, comerciantes, sirvientes."),
]
print("W08-W12 loaded")
