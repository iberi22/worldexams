#!/usr/bin/env python3
"""SOC G6 W13-W18 question data - all q() calls have 5 positional args."""
def q(b,s,o,t,e):
    return {"bloom":b,"icfes":"Pensamiento Social","stem":s,"options":[[chr(65+i),t2,f2] for i,(t2,f2) in enumerate(o)],"correct":t,"explanation":e}

ALL={}

ALL[13]=[
q("Remember","Que es una polis griega?",[("Un templo","Incorrecto."),("Ciudad-estado independiente","Correcto."),("Un ejercito","Incorrecto."),("Un rio","Incorrecto.")],"B","Las polis eran ciudades-estado con gobierno propio como Atenas y Esparta."),
q("Remember","Donde nacio la democracia?",[("Esparta","Incorrecto."),("Atenas","Correcto."),("Roma","Incorrecto."),("Persia","Incorrecto.")],"B","Atenas desarrollo la democracia directa en el s. V a.C."),
q("Understand","Diferencia Atenas vs Esparta?",[("No habia","Incorrecto."),("Atenas democracia; Esparta oligarquia militar","Correcto."),("Atenas monarquia; Esparta democracia","Incorrecto."),("Eran iguales","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Apply","Quienes participaban en la democracia ateniense?",[("Todos los habitantes","Incorrecto."),("Ciudadanos varones atenienses libres","Correcto."),("Mujeres y extranjeros","Incorrecto."),("Esclavos","Incorrecto.")],"B","Excluidos: mujeres, esclavos y metecos (extranjeros)."),
q("Understand","Que fueron las Guerras Medicas?",[("Guerras entre Atenas y Esparta","Incorrecto."),("Conflictos griegos contra el Imperio Persa","Correcto."),("Guerras de Alejandro","Incorrecto."),("Guerras civiles","Incorrecto.")],"B","Griegos unidos contra Persia: Maraton (490 a.C.) y Salamina (480 a.C.)."),
q("Analyze","Importancia de Alejandro Magno?",[("Fue filosofo","Incorrecto."),("Conquisto vasto imperio difundiendo cultura griega","Correcto."),("Invento la democracia","Incorrecto."),("Construyo el Coliseo","Incorrecto.")],"B","Alejandro difundio el helenismo desde Grecia hasta la India."),
q("Remember","Que formaba la Helade?",[("El Imperio Romano","Incorrecto."),("Region cultural griega","Correcto."),("Egipto","Incorrecto."),("Persia","Incorrecto.")],"B","Helade: Grecia continental, islas del Egeo y Asia Menor."),
q("Apply","Asamblea ateniense similar a que organismo colombiano?",[("Presidencia","Incorrecto."),("Concejo municipal","Correcto."),("Ejercito","Incorrecto."),("Cortes","Incorrecto.")],"B","La Ekklesia era la asamblea de ciudadanos, similar a concejos actuales."),
q("Evaluate","Legado politico griego usado hoy?",[("Monarquia","Incorrecto."),("Democracia","Correcto."),("Feudalismo","Incorrecto."),("Teocracia","Incorrecto.")],"B","La democracia griega es base de los sistemas democraticos modernos."),
q("Remember","Que hizo Pericles?",[("Fue rey espartano","Incorrecto."),("Lidero la democracia ateniense","Correcto."),("Fue filosofo","Incorrecto."),("Conquisto Persia","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
]

ALL[14]=[
q("Remember","Filosofo que uso la mayeutica?",[("Aristoteles","Incorrecto."),("Platon","Incorrecto."),("Socrates","Correcto."),("Homero","Incorrecto.")],"C","Socrates: preguntas para guiar al alumno a la verdad."),
q("Remember","Obra famosa de Platon?",[("La Republica","Correcto."),("La Iliada","Incorrecto."),("La Politica","Incorrecto."),("La Odisea","Incorrecto.")],"A","Explicacion complementaria: la respuesta correcta es A."),
q("Understand","Juegos Olimpicos antiguos?",[("Evento artistico","Incorrecto."),("Competencias atleticas en honor a Zeus","Correcto."),("Reunion politica","Incorrecto."),("Festival cristiano","Incorrecto.")],"B","Se realizaban cada 4 anos en Olimpia."),
q("Apply","El teatro griego servia para:",[("Solo entretenimiento","Incorrecto."),("Reflexionar sobre la vida y criticar la sociedad","Correcto."),("Adorar al faraon","Incorrecto."),("Entrenar soldados","Incorrecto.")],"B","Tragedia y comedia griegas combinaban arte con critica social."),
q("Remember","Columnas del Partenon:",[("Orden dorico","Correcto."),("Orden jonio","Incorrecto."),("Orden corintio","Incorrecto."),("Ninguna","Incorrecto.")],"A","Partenon es dorico: sobrio y simple."),
q("Analyze","Importancia de la filosofia griega?",[("No es importante","Incorrecto."),("Bases del pensamiento cientifico y etico occidental","Correcto."),("Solo mitos","Incorrecto."),("Copia egipcia","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Understand","Arquitectura griega se caracteriza por:",[("Arcos y cupulas","Incorrecto."),("Columnas, frontones y proporcion armonica","Correcto."),("Torres escalonadas","Incorrecto."),("Piramides","Incorrecto.")],"B","Ordenes: dorico, jonio, corintio."),
q("Apply","Escultura griega busca:",[("Monstruos","Incorrecto."),("La belleza ideal del cuerpo humano","Correcto."),("Animales","Incorrecto."),("Abstracto","Incorrecto.")],"B","Canon de belleza: proporcion y armonia."),
q("Evaluate","Legado cultural griego en Colombia?",[("Ninguno","Incorrecto."),("Democracia, filosofia, teatro, arquitectura, olimpiadas","Correcto."),("Solo idioma","Incorrecto."),("Solo columnas","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Remember","Quien escribio la Iliada y la Odisea?",[("Socrates","Incorrecto."),("Platon","Incorrecto."),("Homero","Correcto."),("Aristoteles","Incorrecto.")],"C","Poemas epicos sobre la guerra de Troya."),
]

ALL[15]=[
q("Remember","Que era el Senado romano?",[("Un templo","Incorrecto."),("Consejo de patricios con poder politico","Correcto."),("Un mercado","Incorrecto."),("Un ejercito","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Remember","Tribunos de la plebe protegian a:",[("Patricios","Incorrecto."),("Plebeyos","Correcto."),("Esclavos","Incorrecto."),("Reyes","Incorrecto.")],"B","Tribunos podian vetar decisiones del Senado."),
q("Understand","Guerras Punicas fueron entre:",[("Atenas y Esparta","Incorrecto."),("Roma y Cartago","Correcto."),("Roma y Grecia","Incorrecto."),("Roma y Persia","Incorrecto.")],"B","Roma vencio a Cartago y domino el Mediterraneo."),
q("Apply","Consules romanos vs presidente colombiano?",[("Ambos vitalicios","Incorrecto."),("Consules anuales y dos; presidente 4 anos y uno","Correcto."),("Iguales","Incorrecto."),("Presidente anual","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Understand","Legado del derecho romano?",[("Ninguno","Incorrecto."),("Base del derecho civil actual","Correcto."),("Solo Europa","Incorrecto."),("Solo Italia","Incorrecto.")],"B","Leyes, propiedad, juicios: base juridica."),
q("Analyze","Por que Roma conquisto el Mediterraneo?",[("Suerte","Incorrecto."),("Ejercito disciplinado, diplomacia, calzadas, adaptacion","Correcto."),("Mas inteligentes","Incorrecto."),("Sin oposicion","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Remember","Patricios eran:",[("Esclavos","Incorrecto."),("Nobleza romana","Correcto."),("Comerciantes","Incorrecto."),("Soldados","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Apply","Calzadas romanas vs carreteras colombianas:",[("Sin relacion","Incorrecto."),("Ambos conectan el territorio","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Evaluate","Republica Romana vs Colombia:",[("Identicas","Incorrecto."),("Ambas tienen separacion de poderes, senado, elecciones","Correcto."),("Colombia sin senado","Incorrecto."),("Roma sin asambleas","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Remember","Hermanos Graco propusieron:",[("Construir Coliseo","Incorrecto."),("Reformas agrarias para plebeyos","Correcto."),("Conquistar Grecia","Incorrecto."),("Fundar Imperio","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
]

ALL[16]=[
q("Remember","Primer emperador romano?",[("Julio Cesar","Incorrecto."),("Augusto","Correcto."),("Neron","Incorrecto."),("Constantino","Incorrecto.")],"B","Octavio Augusto, desde 27 a.C."),
q("Remember","Pax Romana:",[("Un tratado","Incorrecto."),("Periodo de paz y estabilidad (s. I-II d.C.)","Correcto."),("Una guerra","Incorrecto."),("Un dios","Incorrecto.")],"B","200 anos de relativa paz."),
q("Understand","Difusion del cristianismo en Roma:",[("Fue impuesto","Incorrecto."),("Predicacion de apostoles y calzadas romanas","Correcto."),("Nunca se difundio","Incorrecto."),("Religion oficial desde inicio","Incorrecto.")],"B","Legalizado por Constantino (313 d.C.)."),
q("Apply","Coliseo vs estadio El Campin:",[("Mercados","Incorrecto."),("Ambos son escenarios de espectaculos masivos","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Understand","Por que se dividio el Imperio?",[("Era muy grande","Correcto."),("Peleas de emperadores","Incorrecto."),("Invasiones totales","Incorrecto."),("Terremoto","Incorrecto.")],"A","Diocleciano dividio el imperio en Oriente y Occidente."),
q("Analyze","Causas caida Imperio Occidental?",[("Solo invasiones","Incorrecto."),("Crisis economica, corrupcion, invasiones, division","Correcto."),("Terremoto","Incorrecto."),("Derrota griega","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Remember","Capital de Bizancio:",[("Roma","Incorrecto."),("Constantinopla","Correcto."),("Atenas","Incorrecto."),("Alejandria","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Apply","Ciudadania romana vs colombiana:",[("Iguales","Incorrecto."),("Romana daba derechos politicos; colombiana derechos constitucionales","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Evaluate","Leccion caida de Roma?",[("Imperios no caen","Incorrecto."),("Crisis economica, corrupcion y presion externa pueden derrumbar cualquier poder","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Remember","Constantino legalizo:",[("El paganismo","Incorrecto."),("El cristianismo","Correcto.")],"B","Edicto de Milan (313 d.C.)."),
]

ALL[17]=[
q("Remember","Polis griegas:",[("Templos","Incorrecto."),("Ciudades-estado independientes","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Understand","Diferencia Atenas-Esparta:",[("Ninguna","Incorrecto."),("Atenas democracia; Esparta militar","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Apply","Filosofo mayeutica:",[("Aristoteles","Incorrecto."),("Platon","Incorrecto."),("Socrates","Correcto.")],"C","Explicacion complementaria: la respuesta correcta es C."),
q("Understand","Republica Romana tenia:",[("Rey","Incorrecto."),("Senado, magistrados, asambleas","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Analyze","Influencia griega en Roma:",[("Grecia conquisto Roma","Incorrecto."),("Roma conquisto Grecia y adopto su cultura","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Remember","No es legado grecorromano:",[("Democracia","Incorrecto."),("Derecho","Incorrecto."),("Escritura cuneiforme","Correcto.")],"C","Explicacion complementaria: la respuesta correcta es C."),
q("Evaluate","Similitud Alejandro y Roma:",[("Conquistaron America","Incorrecto."),("Difundieron su cultura","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Apply","Similar al Congreso colombiano:",[("Coliseo","Incorrecto."),("Senado","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Remember","Caida Roma Occidente:",[("1492","Incorrecto."),("476 d.C.","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Understand","Causa caida Roma:",[("Solo invasiones","Incorrecto."),("Multiples causas combinadas","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
]

ALL[18]=[
q("Remember","Inicio Edad Media:",[("1492","Incorrecto."),("476 d.C. caida Roma","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Remember","Pueblos que invadieron Roma:",[("Chinos","Incorrecto."),("Germanicos","Correcto."),("Vikingos","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Understand","Imperio Bizantino:",[("Germanico","Incorrecto."),("Continuacion del Imperio Romano de Oriente","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Apply","Justiniano era emperador:",[("Carolingio","Incorrecto."),("Bizantino","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Understand","Religion surgida en Arabia s.VII:",[("Cristianismo","Incorrecto."),("Budismo","Incorrecto."),("Islam","Correcto.")],"C","Explicacion complementaria: la respuesta correcta es C."),
q("Analyze","Iglesia unificadora en EM:",[("Construyo piramides","Incorrecto."),("Mantuvo unidad cultural y religiosa","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Remember","Carlomagno:",[("Bizantino","Incorrecto."),("Rey franco coronado emperador en 800","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Apply","Cambio politico tras caida Roma:",[("Democracia","Incorrecto."),("Fragmentacion en reinos germanicos","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Evaluate","Leccion caida Roma:",[("Imperios no caen","Incorrecto."),("Crisis combinada derrumba poderes","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
q("Understand","No caracteriza inicio EM:",[("Fragmentacion","Incorrecto."),("Democracia y comercio global","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
]

print("W13-W18 loaded")
