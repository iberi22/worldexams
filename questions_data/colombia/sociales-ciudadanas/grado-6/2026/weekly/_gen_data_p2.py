# Generator Part 2: W09-W19 (Grecia, Roma, Edad Media)
import os, sys, json
sys.path.insert(0, os.path.dirname(__file__))
from _gen_all import W, make_q
C = "Pensamiento Social"

def save_qs(w, qs):
    W[w]["qs"] = qs
    d = os.path.join(os.path.dirname(__file__), "_gen_data")
    os.makedirs(d, exist_ok=True)
    with open(os.path.join(d, f"qs_w{w:02d}.json"), "w", encoding="utf-8") as f:
        json.dump(qs, f, ensure_ascii=False)
    print(f"W{w:02d}: {len(qs)} qs")

# W09: Grecia - Organización Política
save_qs(9, [
    make_q("Remember", C, "Cómo se llamaban las ciudades-estado griegas?",["Polis","Satrapías","Provincias","Reinos"],0,"Las polis eran ciudades-estado independientes con su propio gobierno."),
    make_q("Remember", C, "Qué forma de gobierno surgió en Atenas?",["Monarquía","Democracia","Aristocracia","Tiranía"],1,"Atenas desarrolló la democracia (~508 a.C.)."),
    make_q("Understand", C, "En qué se diferenciaban Atenas y Esparta?",["Ambas democráticas","Atenas: democracia y cultura. Esparta: militarismo","Ambas militares","No diferían"],1,"Atenas valoraba las artes; Esparta la disciplina militar."),
    make_q("Apply", C, "Si vivieras en la Atenas de Pericles, qué derecho tendrías como ciudadano?",["Votar en la Asamblea","Ser faraón","Construir pirámides","Ser emperador"],0,"Los ciudadanos atenienses votaban en la Asamblea."),
    make_q("Understand", C, "Quién fue Pericles?",["Un filósofo","Un líder que fortaleció la democracia ateniense","Un rey persa","Un faraón egipcio"],1,"Pericles impulsó la democracia y el esplendor cultural de Atenas."),
    make_q("Analyze", C, "Por qué la democracia ateniense era limitada?",["Todos podían votar","Solo ciudadanos varones atenienses; excluía mujeres, esclavos y extranjeros","No había límites","Era perfecta"],1,"Excluía a mujeres, esclavos y metecos."),
    make_q("Remember", C, "Qué eran las Guerras Médicas?",["Guerras entre griegos","Conflictos entre griegos y persas","Guerras de Roma","Batallas en Egipto"],1,"Enfrentaron a las polis griegas contra el Imperio Persa (490-479 a.C.)."),
    make_q("Apply", C, "Quién conquistó Grecia desde Macedonia?",["Julio César","Alejandro Magno","Pericles","Leonidas"],1,"Alejandro Magno, rey de Macedonia, creó un vasto imperio."),
    make_q("Evaluate", C, "Comparando la polis griega con un municipio colombiano:",["Son idénticos","Polis: independientes y soberanas. Municipios: dependen del Estado","Ambos sin gobierno","Municipios más antiguos"],1,"Las polis eran Estados independientes."),
    make_q("Understand", C, "Qué institución representaba al pueblo en Atenas?",["El Senado","La Ekklesía (Asamblea Popular)","El Rey","El Tribunal"],1,"La Ekklesía era la asamblea donde los ciudadanos votaban."),
])

# W10: Grecia - Cultura y Arte
save_qs(10, [
    make_q("Remember", C, "Quién fue Sócrates?",["Un rey persa","Filósofo que cuestionaba mediante el diálogo (mayéutica)","Un faraón","Un general espartano"],1,"Sócrates enseñaba mediante preguntas. Fue condenado a muerte."),
    make_q("Remember", C, "Qué filósofo escribió La República?",["Sócrates","Platón","Aristóteles","Pericles"],1,"Platón escribió sobre la justicia y el Estado ideal."),
    make_q("Understand", C, "Qué caracteriza al arte griego?",["Caótico","Búsqueda de perfección, proporción y belleza ideal","Solo guerreros","Abstracto"],1,"Buscaba armonía y canon de belleza."),
    make_q("Apply", C, "Si ves una estatua griega de un atleta en un museo, qué estilo predomina?",["Barroco","Clásico: equilibrio y naturalismo","Gótico","Moderno"],1,"El período Clásico buscaba naturalismo idealizado."),
    make_q("Understand", C, "Para qué servía el teatro griego?",["Solo entretenimiento","Educación religiosa y cívica (tragedias y comedias)","Entrenamiento militar","Debates políticos"],1,"Educaba sobre mitos, valores y problemas sociales."),
    make_q("Analyze", C, "Por qué eran importantes los Juegos Olímpicos en Grecia?",["Solo deporte","Unían a las polis en tregua sagrada en honor a Zeus","Competencias militares","Seleccionaban reyes"],1,"Desde 776 a.C., unían a los griegos."),
    make_q("Remember", C, "Qué orden arquitectónico griego tiene columnas sencillas sin base?",["Dórico","Jónico","Corintio","Barroco"],0,"El dórico es el más simple y robusto."),
    make_q("Apply", C, "Por qué estudiamos filosofía griega hoy?",["No es relevante","Sentó bases del pensamiento occidental: ciencia, ética y política","Solo historia antigua","No pensaban"],1,"Estableció las bases de la ciencia y política occidental."),
    make_q("Evaluate", C, "Qué legado griego sigue vigente en Colombia?",["Monarquía","Democracia, teatro y Juegos Olímpicos","Cuneiforme","Pirámides"],1,"Grecia legó democracia, teatro y filosofía."),
    make_q("Understand", C, "Qué enseñaba Aristóteles?",["Un solo dios","Lógica, ética y observación de la naturaleza","La guerra","Construcción de pirámides"],1,"Fundó la lógica y estudió ciencias naturales."),
])

# W11: Grecia - Guerras y Conquistas
save_qs(11, [
    make_q("Remember", C, "Batalla donde 300 espartanos enfrentaron a los persas:",["Maratón","Termópilas","Salamina","Platea"],1,"Leónidas y 300 espartanos resistieron en Termópilas (480 a.C.)."),
    make_q("Remember", C, "Qué guerra enfrentó a Atenas y Esparta?",["Guerras Médicas","Guerra del Peloponeso","Guerras Púnicas","Guerra de Troya"],1,"La Guerra del Peloponeso (431-404 a.C.)."),
    make_q("Understand", C, "Por qué se formó la Liga de Delos?",["Atacar Egipto","Defensa contra persas, liderada por Atenas","Conquistar Roma","Comerciar"],1,"Unió a las polis contra futuros ataques persas."),
    make_q("Apply", C, "Qué ventaja tuvieron los griegos en Salamina?",["Más soldados","Mejores barcos y conocimiento del mar","Caballería","Armas de fuego"],1,"Derrotaron a la flota persa usando trirremes en aguas estrechas."),
    make_q("Understand", C, "Consecuencia de la Guerra del Peloponeso:",["Unificación de Grecia","Debilitamiento de polis facilitó conquista macedonia","Paz duradera","Colonización América"],1,"El agotamiento de las polis permitió la conquista macedonia."),
    make_q("Analyze", C, "Por qué Alejandro Magno conquistó un imperio vasto?",["Solo suerte","Estrategia militar y ejército macedonio entrenado","Era persa","Armas modernas"],1,"Combinó estrategia, liderazgo y un ejército disciplinado."),
    make_q("Remember", C, "Hasta dónde llegó Alejandro Magno?",["Roma","India","China","Egipto"],1,"Desde Grecia hasta el valle del Indo."),
    make_q("Apply", C, "Qué significa Helenismo?",["Guerra entre griegos","Difusión de cultura griega por Asia y Egipto","Arquitectura romana","Religión egipcia"],1,"Mezcla de cultura griega con culturas orientales."),
    make_q("Evaluate", C, "Estrategia persa vs griega en Guerras Médicas:",["Persas: número. Griegos: disciplina y terreno","Iguales","Griegos: número. Persas: estrategia","Ninguno ganó"],0,"Persas confiaban en número; griegos en hoplitas disciplinados."),
    make_q("Understand", C, "Qué pasó con el imperio de Alejandro tras su muerte?",["Siguió unido","Se dividió entre sus generales (diádocos)","Volvió a Persia","Desapareció"],1,"Se dividió entre sus generales en el 323 a.C."),
])

# W12: Roma - Monarquía y República
save_qs(12, [
    make_q("Remember", C, "Cómo comenzó Roma?",["Como imperio","Pequeña aldea en el Lacio (Italia central)","Colonia griega","Reino persa"],1,"Roma comenzó como aldea en el Lacio en el siglo VIII a.C."),
    make_q("Remember", C, "Qué fue la República Romana?",["Democracia directa","Sistema con senado, magistrados y asambleas, sin rey","Imperio","Monarquía absoluta"],1,"La República (509-27 a.C.) tenía senado, cónsules y asambleas."),
    make_q("Understand", C, "Quiénes eran patricios y plebeyos?",["Patricios: nobleza. Plebeyos: pueblo común","Ambos iguales","Plebeyos: nobleza. Patricios: pueblo","Eran esclavos"],0,"Patricios: aristocracia. Plebeyos: pueblo sin derechos políticos."),
    make_q("Apply", C, "Un tribuno de la plebe podía:",["Vetar leyes que perjudicaran a los plebeyos","Ser rey","Comandar ejércitos","Declarar guerras"],0,"Los tribunos tenían poder de veto."),
    make_q("Understand", C, "Qué eran las Guerras Púnicas?",["Guerras civiles romanas","Conflictos entre Roma y Cartago","Roma vs Grecia","Roma vs Egipto"],1,"Roma vs Cartago (264-146 a.C.) por el Mediterráneo."),
    make_q("Analyze", C, "Por qué Roma conquistó el Mediterráneo?",["Por azar","Ejército eficiente, diplomacia y organización","Religión","Arte"],1,"Legiones romanas y capacidad de integrar pueblos."),
    make_q("Remember", C, "Qué era el Senado Romano?",["Asamblea del pueblo","Consejo de ancianos nobles con gran poder","Rey","Tribunal"],1,"Era el consejo de la aristocracia romana."),
    make_q("Apply", C, "Para qué servían las calzadas romanas?",["Decoración","Movimiento rápido de ejércitos y comercio","Ferrocarriles","Aviones"],1,"Permitían desplazar ejércitos y mercancías rápidamente."),
    make_q("Evaluate", C, "Comparando República Romana con democracia colombiana:",["Idénticas","Roma: república con senado y cónsules. Colombia: democracia representativa","Roma: monarquía","Colombia: imperio"],1,"Ambas separan poderes pero Roma era oligárquica."),
    make_q("Understand", C, "Qué derecho importante desarrollaron los romanos?",["Penal solo","Derecho romano (base del derecho civil occidental)","Divino","Marítimo"],1,"Base del derecho civil con la Ley de las XII Tablas."),
])

# W13: Roma - El Imperio
save_qs(13, [
    make_q("Remember", C, "Quién fue el primer emperador romano?",["Julio César","Augusto (Octavio)","Nerón","Constantino"],1,"Augusto (27 a.C.) inició el Imperio Romano."),
    make_q("Remember", C, "Qué fue la Pax Romana?",["Guerra constante","Periodo de paz y estabilidad (s. I-II d.C.)","Revolución","Caída del imperio"],1,"~200 años de paz, comercio y prosperidad."),
    make_q("Understand", C, "Cómo se difundió el cristianismo en el Imperio?",["Por conquista","Predicadores, caminos romanos y paz","Guerras","Esclavos"],1,"Difundido por misioneros usando las vías romanas."),
    make_q("Apply", C, "Emperador que legalizó el cristianismo:",["Augusto","Constantino","Nerón","Calígula"],1,"Constantino (Edicto de Milán, 313 d.C.)."),
    make_q("Understand", C, "Por qué se dividió el Imperio Romano?",["Guerras externas","Demasiado grande; Diocleciano lo dividió","Terremotos","Enfermedades"],1,"Diocleciano dividió en Oriental y Occidental."),
    make_q("Analyze", C, "Causas de la caída del Imperio Occidental (476):",["Una causa","Invasiones bárbaras, crisis económica, corrupción","Terremoto","Extraterrestres"],1,"Múltiples causas: invasiones germánicas y crisis interna."),
    make_q("Remember", C, "Qué era la ciudadanía romana?",["Solo votar","Derechos y deberes: votar, legiones, protección legal","Ser esclavo","Ser extranjero"],1,"Otorgaba derechos legales y políticos."),
    make_q("Apply", C, "Ventaja de ser ciudadano en la Roma imperial:",["Protección legal y servicios públicos","Ninguna","Ser esclavo","Vivir en guerra"],0,"Acceso a protección legal e infraestructura pública."),
    make_q("Evaluate", C, "Legado más importante del Imperio Romano:",["Ruinas","Derecho romano, latín, arquitectura y cristianismo","Esclavitud","Guerras"],1,"Legó derecho, latín, ingeniería y cristianismo."),
    make_q("Understand", C, "Qué pueblos invadieron el Imperio Occidental?",["Persas","Germanos (visigodos, ostrogodos, vándalos)","Chinos","Egipcios"],1,"Pueblos germánicos invadieron."),
])

# W14: Roma - Cultura y Derecho
save_qs(14, [
    make_q("Remember", C, "Qué era la Ley de las XII Tablas?",["Poema épico","Primer código legal romano escrito (~450 a.C.)","Tratado de guerra","Libro de historia"],1,"Primera compilación escrita del derecho romano."),
    make_q("Remember", C, "Qué idioma hablaban los romanos?",["Griego","Latín","Español","Italiano"],1,"El latín. De él derivan lenguas romances."),
    make_q("Understand", C, "Innovación arquitectónica romana:",["Columnas griegas","Arco, bóveda y hormigón","Madera","Piedra tallada"],1,"Usaron arcos, bóvedas y hormigón para edificios monumentales."),
    make_q("Apply", C, "Cómo funcionaban los acueductos romanos?",["Bombas eléctricas","Gravedad con pendiente suave","Tuberías plástico","Caballos"],1,"Usaban gravedad con pendiente constante."),
    make_q("Understand", C, "Qué eran las Termas Romanas?",["Templos","Baños públicos con calefacción y gimnasio","Mercados","Fortalezas"],1,"Complejos con hipocausto (calefacción subterránea)."),
    make_q("Analyze", C, "Por qué el derecho romano sigue siendo importante?",["Solo en Italia","Base del sistema jurídico de muchos países, incluido Colombia","Nadie lo usa","Solo en China"],1,"Influyó en códigos civiles de Europa y América Latina."),
    make_q("Remember", C, "Poeta romano autor de la Eneida:",["Homero","Virgilio","Sófocles","Cicerón"],1,"Virgilio escribió la Eneida sobre los orígenes de Roma."),
    make_q("Apply", C, "Qué defendía Cicerón?",["Monarquía","La república y el imperio de la ley","Esclavitud","Guerra"],1,"Defendió la República y el estado de derecho."),
    make_q("Evaluate", C, "Comparando derecho romano con colombiano:",["Sin relación","Ambos basados en códigos escritos y división público/privado","Romano era oral","Colombiano es inglés"],1,"Colombia heredó la tradición del derecho civil romano."),
    make_q("Understand", C, "Qué principio jurídico crearon los romanos?",["Ojo por ojo","Presunción de inocencia y debido proceso","Ley divina","No había leyes"],1,"Desarrollaron presunción de inocencia y debido proceso."),
])

# W15: Repaso P2
save_qs(15, [
    make_q("Remember", C, "Forma de gobierno de Roma antes del Imperio:",["Monarquía","República","Democracia directa","Tiranía"],1,"Roma fue república (509-27 a.C.)."),
    make_q("Understand", C, "Guerras Púnicas: Roma vs:",["Grecia","Cartago","Egipto","Persia"],1,"Roma vs Cartago por el Mediterráneo."),
    make_q("Apply", C, "Primer emperador romano:",["Julio César","Augusto","Nerón","Constantino"],1,"Augusto (Octavio), 27 a.C."),
    make_q("Remember", C, "Periodo de paz en el Imperio Romano:",["Pax Romana","Edad de Oro","Renacimiento","Belle Époque"],0,"~200 años de paz y estabilidad."),
    make_q("Understand", C, "Primer código legal romano escrito:",["Código Hammurabi","Ley de las XII Tablas","Digesto","Codex"],1,"~450 a.C."),
    make_q("Analyze", C, "Causa de la caída del Imperio Occidental:",["Una causa","Invasiones bárbaras, crisis económica y división","Terremoto","Cambio climático"],1,"Múltiples factores."),
    make_q("Remember", C, "Idioma de los romanos:",["Griego","Latín","Español","Inglés"],1,"El latín."),
    make_q("Apply", C, "Innovación arquitectónica romana:",["Dóricas","Arco, bóveda y hormigón","Pirámides","Pagodas"],1,"Arcos y hormigón."),
    make_q("Evaluate", C, "Legado romano más duradero:",["Guerras","Derecho romano, latín y cristianismo","Esclavitud","Gladiadores"],1,"Derecho, latín y cristianismo."),
    make_q("Understand", C, "Emperador que legalizó el cristianismo:",["Augusto","Constantino","Nerón","Trajano"],1,"Edicto de Milán, 313 d.C."),
])

# W16: Edad Media - Caída del Imperio Romano
save_qs(16, [
    make_q("Remember", C, "En qué año cayó el Imperio Romano de Occidente?",["313 d.C.","476 d.C.","1492","27 a.C."],1,"Último emperador depuesto en 476 d.C."),
    make_q("Remember", C, "Qué pueblos invadieron el Imperio Romano?",["Persas","Germanos (visigodos, ostrogodos, vándalos)","Chinos","Egipcios"],1,"Pueblos germánicos buscaban tierras."),
    make_q("Understand", C, "Qué fue el Imperio Bizantino?",["Imperio en América","Continuación del Imperio Romano en Oriente, capital Constantinopla","Reino germánico","Egipto"],1,"Sobrevivió hasta 1453, preservó cultura grecorromana."),
    make_q("Apply", C, "Qué hizo Justiniano?",["Conquistó América","Compiló derecho romano (Corpus Iuris Civilis)","Pirámides","Pólvora"],1,"Recopiló las leyes romanas."),
    make_q("Understand", C, "Qué religión surgió en Arabia en el s. VII?",["Cristianismo","Islam","Budismo","Judaísmo"],1,"Islam, fundado por Mahoma."),
    make_q("Analyze", C, "Por qué Bizancio conservó cultura grecorromana?",["No lo hizo","Ubicación y continuidad institucional mientras Occidente colapsaba","Religión","Ejército"],1,"Preservó textos mientras Europa occidental decaía."),
    make_q("Remember", C, "Rey franco que unificó Europa Occidental:",["Justiniano","Carlomagno","Ciro","Alejandro"],1,"Carlomagno (742-814), coronado emperador."),
    make_q("Apply", C, "Las invasiones germánicas cambiaron Europa porque:",["No cambiaron nada","Fragmentaron el poder y surgió el feudalismo","Unificaron","Crearon democracias"],1,"Fragmentaron el poder central."),
    make_q("Evaluate", C, "Qué evento marca el inicio de la Edad Media?",["Nacimiento de Cristo","Caída del Imperio Romano de Occidente (476)","1492","Revolución Francesa"],1,"Convencionalmente la caída de Roma (476)."),
    make_q("Understand", C, "Por qué se desplazaron los pueblos germánicos?",["Turismo","Presión de los hunos y búsqueda de tierras","Guerra","Comercio"],1,"Los hunos empujaron a los germanos."),
])

# W17: Edad Media - Feudalismo
save_qs(17, [
    make_q("Remember", C, "Qué es el feudalismo?",["Sistema democrático","Organización social, política y económica basada en feudos y vasallaje","Imperio centralizado","República"],1,"Relaciones de dependencia entre señores y vasallos."),
    make_q("Remember", C, "Qué era el vasallaje?",["Esclavitud","Juramento de fidelidad a cambio de protección y tierras","Amistad","Matrimonio"],1,"Contrato: vasallo servía militarmente, señor protegía."),
    make_q("Understand", C, "Cómo era la sociedad feudal?",["Igualitaria","Tres estamentos: nobleza, clero y pueblo","Solo reyes","Democrática"],1,"Sociedad estamental cerrada."),
    make_q("Apply", C, "Función de un castillo feudal:",["Centro comercial","Protección y control del feudo","Escuela","Hospital"],1,"Defensa y centro administrativo."),
    make_q("Understand", C, "Qué era un siervo en el feudalismo?",["Esclavo","Campesino ligado a la tierra, no propiedad del señor","Noble","Rey"],1,"No podía abandonar la tierra pero no era propiedad."),
    make_q("Analyze", C, "Por qué surgió el feudalismo en Europa?",["Decisión real","Falta de poder central fuerte; seguridad local contra invasiones","Revolución","Comercio"],1,"Tras la caída de Roma, el poder se atomizó."),
    make_q("Remember", C, "Qué era un feudo?",["País independiente","Tierra concedida por un señor a un vasallo","Ciudad","Reino"],1,"Extensión de tierra con campesinos."),
    make_q("Apply", C, "Si eras noble medieval, qué debías a tu rey?",["Impuestos solo","Servicio militar y consejo","Nada","Productos agrícolas"],1,"El vasallo debía lealtad y servicio militar."),
    make_q("Evaluate", C, "Comparando feudalismo con sistema actual colombiano:",["Igual","Feudalismo: estamental/hereditario. Colombia: movilidad social posible","Colombia es feudal","No hay diferencias"],1,"El feudalismo era estamental; hoy hay movilidad social."),
    make_q("Understand", C, "Qué papel tenían las mujeres nobles medievales?",["Sin derechos","Administraban el feudo cuando el señor estaba en guerra","Odiadas","Guerreras"],1,"Administraban propiedades en ausencia del señor."),
])

# W18: Edad Media - Iglesia y Cultura
save_qs(18, [
    make_q("Remember", C, "Qué papel tenía la Iglesia en la Edad Media?",["Solo religión","Unificadora, educadora y con gran poder político y económico","Militar","Comercial"],1,"La Iglesia era la institución más poderosa y estable."),
    make_q("Remember", C, "Qué eran los monasterios medievales?",["Prisiones","Centros de oración, copia de manuscritos y educación","Mercados","Fortalezas"],1,"Preservaron el conocimiento clásico."),
    make_q("Understand", C, "Qué estilo arquitectónico medieval se caracteriza por arcos ojivales?",["Románico","Gótico","Barroco","Clásico"],1,"El gótico (s. XII-XV) con arcos apuntados y vitrales."),
    make_q("Apply", C, "Si visitas una catedral con arcos de medio punto y muros gruesos, qué estilo es?",["Románico","Gótico","Renacentista","Moderno"],0,"Románico: arcos de medio punto, muros gruesos, pocas ventanas."),
    make_q("Understand", C, "Qué eran las Cruzadas?",["Peregrinaciones","Expediciones militares cristianas para recuperar Tierra Santa","Ferias","Concilios"],1,"Ocho cruzadas principales (1095-1270)."),
    make_q("Analyze", C, "Por qué surgieron las universidades medievales?",["El rey las creó","Creciente urbanización y necesidad de profesionales (médicos, abogados, clérigos)","La Iglesia","Los campesinos"],1,"Surgieron en las ciudades para formar profesionales."),
    make_q("Remember", C, "Qué idioma se usaba en la educación medieval?",["Español","Latín","Griego","Alemán"],1,"El latín era la lengua culta y educativa."),
    make_q("Apply", C, "Tomás de Aquino enseñaba que:",["Solo fe","Razón y fe son compatibles","Solo razón","Nada"],1,"Tomás de Aquino (escolástica) armonizó fe y razón."),
    make_q("Evaluate", C, "Importancia de la Iglesia medieval en la cultura:",["Ninguna","Preservó manuscritos, fundó universidades y promovió el arte","Negativa","Comercial"],1,"Preservó el conocimiento y fomentó la educación."),
    make_q("Understand", C, "Qué arte decoraba las catedrales góticas?",["Mosaicos solo","Vitrales que contaban historias bíblicas a los analfabetos","Frescos","Esculturas"],1,"Vitrales como Biblia para los iletrados."),
])

# W19: Edad Media - Comercio y Resurgimiento Urbano
save_qs(19, [
    make_q("Remember", C, "Qué grupo social surgió con el renacimiento urbano medieval?",["Nobleza","Burguesía","Clero","Campesinos"],1,"Burguesía: comerciantes y artesanos que vivían en los burgos."),
    make_q("Remember", C, "Qué eran los gremios medievales?",["Sindicatos","Asociaciones de artesanos de un mismo oficio","Ejércitos","Cofradías religiosas"],1,"Regulaban la producción, precios y calidad."),
    make_q("Understand", C, "Por qué resurgieron las ciudades en la Baja Edad Media?",["Guerras","Aumento del comercio, excedentes agrícolas y rutas comerciales","Peste","Invasiones"],1,"El comercio reactivó las rutas y creó centros urbanos."),
    make_q("Apply", C, "La Liga Hanseática era:",["Tratado de paz","Alianza de ciudades comerciales del norte de Europa","Imperio","Ejército"],1,"Alianza de ciudades para proteger el comercio."),
    make_q("Understand", C, "Cómo se organizaba el trabajo en las ciudades medievales?",["Libre competencia","Maestro, oficial, aprendiz (jerarquía gremial)","Esclavitud","Fábricas"],1,"Sistema de aprendizaje escalonado."),
    make_q("Analyze", C, "Por qué la burguesía desafió el orden feudal?",["Querían guerra","Su riqueza no correspondía a su estatus social (no noble)","Eran nobles","No tenían poder"],1,"Los burgueses acumulaban riqueza pero sin privilegios nobiliarios."),
    make_q("Remember", C, "Principal ruta comercial medieval entre Europa y Asia:",["Ruta de la Seda","Ruta del Oro","Ruta de la Sal","Ruta del Ámbar"],0,"Conectaba Europa con China a través de Asia Central."),
    make_q("Apply", C, "Ferias medievales como la de Champaña servían para:",["Solo diversión","Intercambio comercial entre regiones europeas","Religión","Política"],1,"Centros de comercio internacional."),
    make_q("Evaluate", C, "Cambio más importante del renacimiento urbano:",["Desapareció la nobleza","Surgimiento de la burguesía y nuevas formas de poder económico","Volvió la esclavitud","Más guerras"],1,"La burguesía transformó la economía y la política."),
    make_q("Understand", C, "Qué innovación comercial surgió en la Edad Media?",["Tarjetas crédito","Letras de cambio y bancos","Acciones","Criptomonedas"],1,"Letras de cambio permitían comercio seguro a distancia."),
])

print("Part 2 complete: W09-W19")
