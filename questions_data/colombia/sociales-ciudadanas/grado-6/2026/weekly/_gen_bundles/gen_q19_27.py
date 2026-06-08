#!/usr/bin/env python3
"""Question data for SOC G6 W19-W27 (Edad Media y Edad Moderna)."""
import sys; sys.path.insert(0,"..")
OUT = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly"
def q(b,s,o,t,e): return {"bloom":b,"icfes":"Pensamiento Social","stem":s,"options":[[chr(65+i),t2,f2]for i,(t2,f2)in enumerate(o)],"correct":t,"explanation":e}

ALL={}

# W19: Feudalismo
ALL[19]=[
    q("Remember","En que se basaba el feudalismo?",
      [("Comercio","Incorrecto."),("Relaciones de vasallaje entre senores y siervos","Correcto."),("Democracia","Incorrecto."),("Industria","Incorrecto.")],"B","El feudalismo se basaba en la relacion de dependencia personal: vasallaje."),
    q("Remember","Que era un feudo?",[("Un impuesto","Incorrecto."),("Una tierra otorgada por un senor a un vasallo","Correcto."),("Un ejercito","Incorrecto."),("Una iglesia","Incorrecto.")],"B","El feudo era la unidad territorial del feudalismo."),
    q("Understand","Sociedad estamental medieval:",[("Movil y flexible","Incorrecto."),("Tres estamentos: nobleza, clero y trabajadores","Correcto."),("Sin clases","Incorrecto."),("Solo nobles y esclavos","Incorrecto.")],"B","Nobleza (guerreros), clero (oracion), trabajadores (agricultura)."),
    q("Apply","Si un estudiante en Palmira lee sobre la obligacion de un siervo, que debia hacer?",
      [("Pagar impuestos y trabajar las tierras del senor","Correcto."),("Ser soldado profesional","Incorrecto."),("Estudiar","Incorrecto."),("Comerciar libremente","Incorrecto.")],"A","Los siervos trabajaban la tierra y pagaban tributos al senor."),
    q("Understand","Que era el vasallaje?",[("Un impuesto","Incorrecto."),("Un contrato de fidelidad entre un senor y un vasallo","Correcto."),("Un castillo","Incorrecto."),("Una batalla","Incorrecto.")],"B","Ceremonia de homenaje: el vasallo juraba lealtad al senor."),
    q("Analyze","Por que los castillos eran importantes?",[("Eran iglesias","Incorrecto."),("Residencia del senor y defensa militar","Correcto."),("Mercados","Incorrecto."),("Escuelas","Incorrecto.")],"B","Castillos: funcion residencial y defensiva, simbolo del poder feudal."),
    q("Remember","Que hacia un caballero medieval?",[("Comerciaba","Incorrecto."),("Luchaba a caballo al servicio de un senor","Correcto."),("Agricultura","Incorrecto."),("Estudiaba","Incorrecto.")],"B","Caballeros: guerreros a caballo que servian a su senor."),
    q("Apply","Castillos colombianos vs castillos medievales?",[("Colombia tiene castillos medievales","Incorrecto."),("Colombia tiene fortificaciones coloniales (Cartagena) pero no castillos feudales","Correcto."),("Ninguna fortificacion","Incorrecto."),("Son identicos","Incorrecto.")],"B","Castillos: Europa medieval. Colombia: fortificaciones coloniales espanolas."),
    q("Evaluate","El feudalismo era un sistema justo?",[("Si, todos eran iguales","Incorrecto."),("Era jerarquico y desigual, pero dio estabilidad tras la caida de Roma","Correcto."),("No era un sistema","Incorrecto."),("Era perfecto","Incorrecto.")],"B","El feudalismo ofrecia proteccion a cambio de trabajo, pero con desigualdad."),
    q("Remember","Que hacia la nobleza en la sociedad feudal?",[("Trabajar la tierra","Incorrecto."),("Gobernar, guerrear y administrar justicia","Correcto."),("Rezar","Incorrecto. Clero."),("Comerciar","Incorrecto. Burgueses.")],"B","Explicacion complementaria: la respuesta correcta es B."),
]

# W20: Iglesia y cultura medieval
ALL[20]=[
    q("Remember","Donde se preservo el conocimiento en la Edad Media?",
      [("Universidades solo","Incorrecto."),("Monasterios donde monjes copiaban libros","Correcto."),("Bibliotecas publicas","Incorrecto."),("Palacios reales","Incorrecto.")],"B","Monjes copistas preservaron la cultura clasica en los monasterios."),
    q("Remember","Estilo arquitectonico medieval con arcos apuntados y vitrales?",
      [("Romanico","Incorrecto. Arcos de medio punto."),("Gotico","Correcto. Catedrales con vitrales."),("Clasico","Incorrecto."),("Moderno","Incorrecto.")],"B","Gotico: arcos apuntados, bovedas de cruceria, vitrales coloridos."),
    q("Understand","Que eran las Cruzadas?",
      [("Guerras civiles","Incorrecto."),("Expediciones militares cristianas para recuperar Tierra Santa","Correcto."),("Exploraciones","Incorrecto."),("Viajes comerciales","Incorrecto.")],"B","Ocho cruzadas principales (1096-1270) por el control de Jerusalen."),
    q("Apply","Catedral gotica vs iglesia colonial en Popayan?",
      [("Iguales","Incorrecto."),("Gotica: arcos apuntados, vitrales. Colonial: estilo barroco espanol","Correcto."),("Ninguna comparacion","Incorrecto."),("Las dos son goticas","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Que papel tenia la Iglesia en la Edad Media?",
      [("Solo religioso","Incorrecto."),("Era la institucion mas poderosa: religiosa, politica, educativa y economica","Correcto."),("No tenia poder","Incorrecto."),("Solo en Roma","Incorrecto.")],"B","La Iglesia controlaba la educacion, el arte y gran parte de la economia."),
    q("Analyze","Por que las universidades surgieron en la Edad Media?",
      [("Por orden del rey","Incorrecto."),("Por el auge de las ciudades y la demanda de profesionales (medicos, abogados, teologos)","Correcto."),("De la nada","Incorrecto."),("De Roma","Incorrecto.")],"B","Primeras universidades: Bolonia, Paris, Oxford. Estudiaban derecho, medicina, teologia."),
    q("Remember","Arte romanico se caracteriza por?",
      [("Arcos apuntados","Incorrecto. Gotico."),("Arcos de medio punto, muros gruesos, pocas ventanas","Correcto."),("Columnas clasicas","Incorrecto."),("Modernismo","Incorrecto.")],"B","Romanico: solido, oscuro, funcional. Gotico: luminoso, elevado."),
    q("Apply","En Bogota estudian la escolastica. Que metodo usaba?",
      [("Experimentos","Incorrecto."),("Razon y fe para explicar la verdad cristiana","Correcto."),("Solo fe","Incorrecto."),("Solo razon","Incorrecto.")],"B","Escolastica (Santo Tomas): reconciliar la filosofia clasica con la teologia."),
    q("Evaluate","Como cambio Europa tras las Cruzadas?",
      [("Nada cambio","Incorrecto."),("Abrir rutas comerciales, contacto con Oriente y debilitamiento del feudalismo","Correcto."),("Crearon democracia","Incorrecto."),("Desaparecio la Iglesia","Incorrecto.")],"B","Cruzadas: reactivaron el comercio y el intercambio cultural con Oriente."),
    q("Remember","Que orden religiosa fundo San Francisco?",
      [("Benedictinos","Incorrecto."),("Franciscanos","Correcto. Pobreza y predicacion."),("Dominicos","Incorrecto."),("Jesuitas","Incorrecto.")],"B","San Francisco de Asis fundo la orden franciscana en 1209."),
]

# W21: Comercio y ciudades medievales
ALL[21]=[
    q("Remember","Que grupo social surgio con el renacimiento urbano?",
      [("Nobleza","Incorrecto."),("Burguesia","Correcto. Comerciantes y artesanos urbanos."),("Clero","Incorrecto."),("Siervos","Incorrecto.")],"B","Burguesia: habitantes de los burgos (ciudades) dedicados al comercio."),
    q("Remember","Que eran los gremios?",
      [("Sindicatos modernos","Incorrecto."),("Asociaciones de artesanos del mismo oficio","Correcto."),("Ejercitos","Incorrecto."),("Iglesias","Incorrecto.")],"B","Gremios regulaban la calidad, precios y aprendizaje de los oficios."),
    q("Understand","Por que resurgieron las ciudades en la Baja Edad Media?",
      [("Porque los reyes ordenaron","Incorrecto."),("Por el aumento del comercio, las rutas y la seguridad tras el feudalismo","Correcto."),("Por invasion","Incorrecto."),("Por terremotos","Incorrecto.")],"B","Mejora agricola, aumento de poblacion, reactivacion comercial."),
    q("Apply","Gremio medieval vs Camara de Comercio de Cali?",
      [("Identicos","Incorrecto."),("Ambos regulan la actividad comercial, pero los gremios eran por oficio artesanal","Correcto."),("Ninguna relacion","Incorrecto."),("Cali no tiene Camara","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Rutas comerciales medievales importantes?",
      [("Ruta de la Seda y rutas maritimas mediterraneas","Correcto."),("Ruta del Amazonas","Incorrecto."),("Solo locales","Incorrecto."),("No habia rutas","Incorrecto.")],"A","Ruta de la Seda conectaba Europa con Asia. Mediterraneo conectaba Europa, Africa y Oriente."),
    q("Analyze","Por que la burguesia debilito el feudalismo?",
      [("La burguesia apoyaba a los nobles","Incorrecto."),("La economia urbana (dinero, comercio) reemplazo la economia rural feudal","Correcto."),("No lo debilito","Incorrecto."),("Los burgueses eran nobles","Incorrecto.")],"B","La economia monetaria y las ciudades compitieron con la economia feudal."),
    q("Remember","Que eran las ferias medievales?",
      [("Fiestas religiosas","Incorrecto."),("Mercados periodicos donde comerciantes de distintas regiones intercambiaban productos","Correcto."),("Batallas","Incorrecto."),("Juicios","Incorrecto.")],"B","Ferias de Champana: importante centro de comercio medieval."),
    q("Apply","Mercado campesino de Boyaca vs feria medieval?",
      [("No hay relacion","Incorrecto."),("Ambos son espacios de intercambio, pero las ferias medievales eran internacionales","Correcto."),("Identicos","Incorrecto."),("Solo Boyaca tiene mercado","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Evaluate","Como cambio Europa del feudalismo a las ciudades?",
      [("No cambio","Incorrecto."),("Paso de una economia rural/subsistencia a una economia urbana/comercial","Correcto."),("Se volvio nomada","Incorrecto."),("Desaparecio la poblacion","Incorrecto.")],"B","Transicion de la economia feudal (tierra) a la economia mercantil (dinero)."),
    q("Remember","Que crisis afecto la Baja Edad Media?",
      [("Solo guerras","Incorrecto."),("Peste Negra, hambrunas y guerra de los Cien Anos","Correcto."),("Terremoto","Incorrecto."),("No hubo crisis","Incorrecto.")],"B","Peste Negra (1347-1351) mato a un tercio de la poblacion europea."),
]

# W22: Repaso P4 (Edad Media)
ALL[22]=[
    q("Remember","Que inicia la Edad Media?",[("1492","Incorrecto."),("476 d.C. caida Roma","Correcto."),("27 a.C.","Incorrecto."),("1789","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Que era el feudalismo?",[("Comercio global","Incorrecto."),("Relaciones de vasallaje entre senores y siervos","Correcto."),("Democracia","Incorrecto."),("Imperio centralizado","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Apply","Importancia de Carlomagno?",[("Conquisto America","Incorrecto."),("Unifico Europa occidental y preservo la cultura clasica","Correcto."),("Invento la imprenta","Incorrecto."),("Fundaron el Islam","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Monjes copistas preservaban:",[("Comida","Incorrecto."),("Libros y conocimiento antiguo","Correcto."),("Armas","Incorrecto."),("Monedas","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Que grupo social surgio con las ciudades?",[("Nobleza","Incorrecto."),("Burguesia","Correcto."),("Clero","Incorrecto."),("Esclavos","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Analyze","Como afecto la Peste Negra a Europa?",[("No afecto","Incorrecto."),("Redujo la poblacion drasticamente y cambio la economia","Correcto."),("Aumento la poblacion","Incorrecto."),("Creo el Imperio Romano","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Apply","Castillo medieval vs fortificaciones de Cartagena?",[("Iguales","Incorrecto."),("Castillos: defensa feudal europea. Cartagena: defensa colonial espanola","Correcto."),("Ninguna","Incorrecto."),("Cartagena es mas antigua","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Evaluate","Que legado dejo la Edad Media?",[("Ninguno","Incorrecto."),("Universidades, idiomas romanicos, arte gotico/romanico, sistema feudal","Correcto."),("Solo castillos","Incorrecto."),("Democracia moderna","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Rutas comerciales medievales?",[("Ruta del Amazonas","Incorrecto."),("Ruta de la Seda","Correcto."),("Ruta del Nilo","Incorrecto."),("No habia","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Por que la Iglesia tenia tanto poder?",[("Porque tenia ejercito","Incorrecto."),("Controlaba la educacion, la cultura y la vida espiritual","Correcto."),("Porque no habia reyes","Incorrecto."),("Porque era democratica","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
]

# W23: Renacimiento
ALL[23]=[
    q("Remember","Que fue el Renacimiento?",
      [("Una guerra","Incorrecto."),("Movimiento cultural que redescubrio los valores clasicos (s. XV-XVI)","Correcto."),("Una religion","Incorrecto."),("Un invento","Incorrecto.")],"B","Renacimiento: renovacion del arte, la ciencia y el pensamiento inspirada en Grecia y Roma."),
    q("Remember","Que es el humanismo?",
      [("Doctrina religiosa","Incorrecto."),("Corriente que puso al ser humano como centro del pensamiento","Correcto."),("Sistema politico","Incorrecto."),("Estilo artistico","Incorrecto.")],"B","Humanismo: estudio de las humanidades (literatura, historia, filosofia)."),
    q("Understand","Quien pinto la Mona Lisa?",
      [("Miguel Angel","Incorrecto."),("Leonardo da Vinci","Correcto."),("Rafael","Incorrecto."),("Donatello","Incorrecto.")],"B","Leonardo da Vinci: pintor, escultor, inventor, cientifico."),
    q("Apply","Enseñanza del humanismo en un colegio de Bogota?",
      [("Solo ciencias exactas","Incorrecto."),("Fomenta el pensamiento critico y las artes liberales","Correcto."),("Solo religion","Incorrecto."),("No aplica","Incorrecto.")],"B","Humanismo: base de la educacion integral actual."),
    q("Understand","Que invento revoluciono la difusion del conocimiento?",
      [("La brujula","Incorrecto."),("La imprenta de Gutenberg","Correcto. (1450)"),("El telescopio","Incorrecto."),("La polvora","Incorrecto.")],"B","La imprenta permitio producir libros en masa y difundir el conocimiento."),
    q("Analyze","Por que Italia fue cuna del Renacimiento?",
      [("Por su clima","Incorrecto."),("Riqueza comercial, mecenazgo de familias como los Medici y herencia clasica","Correcto."),("Por su ejercito","Incorrecto."),("Por su religion","Incorrecto.")],"B","Italia: comercio prospero, ciudades ricas, mecenas, ruinas clasicas."),
    q("Remember","Escultor de la obra David?",
      [("Leonardo","Incorrecto."),("Miguel Angel","Correcto."),("Rafael","Incorrecto."),("Botticelli","Incorrecto.")],"B","Miguel Angel esculpio el David (simbolo del Renacimiento)."),
    q("Apply","Mecenas de hoy vs los Medici del Renacimiento?",[("No existen","Incorrecto."),("Empresarios y fundaciones que patrocinan arte y cultura hoy","Correcto."),("Identicos","Incorrecto."),("Solo el Estado","Incorrecto.")],"B","Mecenazgo: financiamiento de artistas por particulares ricos."),
    q("Evaluate","Como cambio el Renacimiento la vision del mundo?",
      [("No cambio nada","Incorrecto."),("Paso de una vision teocentrica a una antropocentrica (el ser humano como centro)","Correcto."),("Se volvio mas religiosa","Incorrecto."),("Se nego la ciencia","Incorrecto.")],"B","Renacimiento: del 'todo por Dios' al 'todo por el ser humano'."),
    q("Remember","Quien pinto la Capilla Sixtina?",[("Leonardo","Incorrecto."),("Miguel Angel","Correcto."),("Rafael","Incorrecto."),("Giotto","Incorrecto.")],"B","Miguel Angel pinto el techo de la Capilla Sixtina (Vaticano)."),
]

# W24: Descubrimiento de America
ALL[24]=[
    q("Remember","Ano del descubrimiento de America?",[("1492","Correcto."),("1453","Incorrecto."),("1500","Incorrecto."),("1519","Incorrecto.")],"A","12 de octubre de 1492: Colon llego a la isla Guanahani (Bahamas)."),
    q("Remember","Quien llego a America en 1492?",[("Vasco de Gama","Incorrecto."),("Cristobal Colon","Correcto."),("Magallanes","Incorrecto."),("Pizarro","Incorrecto.")],"B","Colon, al servicio de los Reyes Catolicos de Espana."),
    q("Understand","Por que Colon navego hacia el oeste?",
      [("Para evitar piratas","Incorrecto."),("Para llegar a Asia (las Indias) por una ruta mas corta","Correcto."),("Para descubrir America","Incorrecto."),("Para pescar","Incorrecto.")],"B","Colon buscaba una ruta a Asia. Encontro America sin saberlo."),
    q("Apply","Carabelas (Nina, Pinta, Santa Maria) vs barcos modernos?",
      [("Identicos","Incorrecto."),("Las carabelas eran pequenas, de vela, sin motor. Los modernos son grandes, motorizados","Correcto."),("Mas pequenos hoy","Incorrecto."),("No habia barcos","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Que fue el Intercambio Colombino?",
      [("Intercambio de cartas","Incorrecto."),("Intercambio de productos, plantas, animales y enfermedades entre America y Europa","Correcto."),("Un tratado de paz","Incorrecto."),("Un viaje","Incorrecto.")],"B","De America: papa, maiz, tomate. A America: trigo, caballo, enfermedades."),
    q("Analyze","Por que se busco una ruta a Asia por el oeste?",
      [("Por turismo","Incorrecto."),("Porque las rutas terrestres estaban controladas por turcos y habia demanda de especias","Correcto."),("Porque era mas rapido","Incorrecto."),("Porque Colon conocia America","Incorrecto.")],"B","Especias, seda y oro de Asia. Constantinopla cayo en 1453."),
    q("Remember","Donde llego Colon primero?",[("Bogota","Incorrecto."),("Islas del Caribe (Bahamas)","Correcto."),("Mexico","Incorrecto."),("Peru","Incorrecto.")],"B","Primer desembarco: Guanahani (San Salvador), en el Caribe."),
    q("Apply","Maiz (alimento basico colombiano) venia de donde?",
      [("Europa","Incorrecto."),("America era originario","Correcto. Los pueblos indigenas lo cultivaban."),("Africa","Incorrecto."),("Asia","Incorrecto.")],"B","El maiz es originario de America, cultivado por pueblos precolombinos."),
    q("Evaluate","Descubrimiento vs encuentro de dos mundos?",
      [("Solo fue descubrimiento","Incorrecto."),("Fue un 'encuentro' que cambio ambas civilizaciones radicalmente","Correcto."),("No fue importante","Incorrecto."),("Solo para Europa","Incorrecto.")],"B","El termino 'encuentro de dos mundos' reconoce la perspectiva indigena."),
    q("Remember","Naves de Colon?",[("Galeones","Incorrecto."),("Fragatas","Incorrecto."),("Carabelas (Nina, Pinta, Santa Maria)","Correcto."),("Veleros","Incorrecto.")],"C","La Nina y la Pinta eran carabelas; la Santa Maria era una nao."),
]

# W25: Conquista de America
ALL[25]=[
    q("Remember","Quien conquisto el Imperio Azteca?",
      [("Pizarro","Incorrecto. Conquisto a los incas."),("Hernan Cortes","Correcto."),("Colon","Incorrecto."),("Magallanes","Incorrecto.")],"B","Cortes conquisto Mexico-Tenochtitlan en 1521."),
    q("Remember","Quien conquisto el Imperio Inca?",[("Cortes","Incorrecto."),("Pizarro","Correcto."),("Balboa","Incorrecto."),("Quesada","Incorrecto.")],"B","Francisco Pizarro conquisto el Imperio Inca (1532-1572)."),
    q("Understand","Que fue la encomienda?",
      [("Un tipo de barco","Incorrecto."),("Sistema por el cual los espanoles recibian indigenas para trabajar a cambio de evangelizacion","Correcto."),("Un impuesto","Incorrecto."),("Una escuela","Incorrecto.")],"B","Encomienda: explotacion laboral indigena justificada por la evangelizacion."),
    q("Apply","En un texto escolar en Medellin leen sobre el mestizaje. Que es?",
      [("Separacion de razas","Incorrecto."),("Mezcla biologica y cultural entre espanoles, indigenas y africanos","Correcto."),("Solo indigenas","Incorrecto."),("Solo espanoles","Incorrecto.")],"B","Mestizaje: base de la poblacion colombiana actual."),
    q("Understand","Causas de la conquista?",
      [("Solo militares","Incorrecto."),("Superioridad militar, alianzas con pueblos indigenas y enfermedades","Correcto."),("Solo enfermedades","Incorrecto."),("Solo dioses","Incorrecto.")],"B","Armas de fuego, caballos, acero, enfermedades (viruela) y alianzas."),
    q("Analyze","Por que los aztecas e incas cayeron tan rapido?",
      [("Eran debiles","Incorrecto."),("Enfermedades, superioridad tecnologica, profecias, descontento de pueblos sometidos","Correcto."),("No tenian ejercito","Incorrecto."),("Rendicion voluntaria","Incorrecto.")],"B","Las enfermedades europeas mataron hasta el 90% de la poblacion indigena."),
    q("Remember","Que eran los virreinatos?",
      [("Iglesias","Incorrecto."),("Divisiones administrativas de la colonia espanola en America","Correcto."),("Escuelas","Incorrecto."),("Puertos","Incorrecto.")],"B","Virreinatos: Nueva Espana, Peru, Nueva Granada, Rio de la Plata."),
    q("Apply","Colombia colonial era parte de que virreinato?",
      [("Virreinato del Peru","Incorrecto."),("Virreinato de Nueva Granada","Correcto."),("Nueva Espana","Incorrecto."),("Rio de la Plata","Incorrecto.")],"B","El Virreinato de Nueva Granada incluia Colombia, Ecuador, Venezuela y Panama."),
    q("Evaluate","Impacto de la conquista en los pueblos indigenas?",
      [("Positivo para todos","Incorrecto."),("Catastrofico: muerte masiva por enfermedades, guerra y explotacion","Correcto."),("Sin impacto","Incorrecto."),("Solo cultural","Incorrecto.")],"B","La conquista fue devastadora demografica y culturalmente."),
    q("Remember","Explorador que cruzo el Istmo de Panama?",
      [("Colon","Incorrecto."),("Balboa","Correcto. Vio el Pacifico en 1513."),("Magallanes","Incorrecto."),("Pizarro","Incorrecto.")],"B","Vasco Nunez de Balboa fue el primer europeo en ver el Oceano Pacifico desde America."),
]

# W26: Reforma y Contrarreforma
ALL[26]=[
    q("Remember","Quien empezo la Reforma Protestante?",
      [("Calvino","Incorrecto."),("Lutero","Correcto. 95 tesis en 1517."),("Enrique VIII","Incorrecto."),("El Papa","Incorrecto.")],"B","Martin Lutero clavo las 95 tesis en Wittenberg, criticando la venta de indulgencias."),
    q("Remember","Que critico Lutero de la Iglesia?",
      [("Las misas","Incorrecto."),("La venta de indulgencias y la autoridad del Papa","Correcto."),("La pobreza","Incorrecto."),("Los sacerdotes","Incorrecto.")],"B","Lutero: salvacion por la fe, no por obras ni indulgencias."),
    q("Understand","Que fue la Contrarreforma?",
      [("La respuesta de la Iglesia catolica ante la Reforma","Correcto."),("Un nuevo movimiento protestante","Incorrecto."),("Una guerra","Incorrecto."),("Un concilio de los protestantes","Incorrecto.")],"A","La Iglesia se reformo internamente mediante el Concilio de Trento (1545-1563)."),
    q("Apply","Colegio jesuita en Bogota? Los jesuitas surgieron durante:",
      [("La Reforma","Incorrecto."),("La Contrarreforma","Correcto."),("El Renacimiento","Incorrecto."),("La Edad Media","Incorrecto.")],"B","Los jesuitas (Compania de Jesus) fundados por Ignacio de Loyola en 1534."),
    q("Understand","Iglesia Anglicana fundada por quien?",
      [("Lutero","Incorrecto."),("Enrique VIII","Correcto. Por conflictos con el Papa."),("Calvino","Incorrecto."),("Isabel I","Incorrecto.")],"B","Enrique VIII creo la Iglesia Anglicana al no obtener el divorcio del Papa."),
    q("Analyze","Por que la Reforma se difundio tan rapido?",
      [("Por la television","Incorrecto."),("La imprenta permitio difundir las ideas de Lutero masivamente","Correcto."),("Por el ejercito","Incorrecto."),("Por el comercio","Incorrecto.")],"B","La imprenta permitio imprimir panfletos y la Biblia en aleman."),
    q("Remember","Predestinacion: asociado a quien?",
      [("Lutero","Incorrecto."),("Calvino","Correcto. Creia que Dios ya elegia quien se salvaba."),("Enrique VIII","Incorrecto."),("El Papa","Incorrecto.")],"B","Calvino: predestinacion (Dios predetermina salvacion o condenacion)."),
    q("Apply","Si en Popayan estudian que la Biblia se tradujo al aleman, responsable:",
      [("Calvino","Incorrecto."),("Lutero","Correcto."),("Enrique VIII","Incorrecto."),("Erasmo","Incorrecto.")],"B","Lutero tradujo la Biblia al aleman, facilitando su lectura."),
    q("Evaluate","Consecuencia de la Reforma para Europa?",
      [("Unidad religiosa total","Incorrecto."),("Division del cristianismo en catolicos y protestantes","Correcto."),("Desaparicion de la religion","Incorrecto."),("Reunificacion inmediata","Incorrecto.")],"B","Europa quedo dividida entre paises catolicos y protestantes."),
    q("Remember","Que fue el Concilio de Trento?",
      [("Asamblea de protestantes","Incorrecto."),("Concilio catolico que reafirmo dogmas y reformo la Iglesia","Correcto."),("Una guerra","Incorrecto."),("Un concilio judio","Incorrecto.")],"B","Concilio de Trento (1545-1563): definio doctrina catolica contra la Reforma."),
]

# W27: Repaso P5
ALL[27]=[
    q("Remember","Movimiento cultural que redescubrio lo clasico?",[("Edad Media","Incorrecto."),("Renacimiento","Correcto."),("Reforma","Incorrecto."),("Descubrimiento","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Que es el humanismo?",[("Adorar dioses clasicos","Incorrecto."),("Poner al ser humano como centro del pensamiento","Correcto."),("Rechazar el arte","Incorrecto."),("Solo literatura","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Apply","Ano del descubrimiento de America?",[("1492","Correcto."),("1500","Incorrecto."),("1453","Incorrecto."),("1517","Incorrecto.")],"A","Explicacion complementaria: la respuesta correcta es A."),
    q("Remember","Quien conquisto a los incas?",[("Cortes","Incorrecto."),("Pizarro","Correcto."),("Colon","Incorrecto."),("Quesada","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Que fue la encomienda?",[("Barco","Incorrecto."),("Sistema de trabajo indigena obligatorio","Correcto."),("Escuela","Incorrecto."),("Moneda","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Analyze","Consecuencia demografica de la conquista?",[("Aumento poblacional","Incorrecto."),("Muerte masiva de indigenas por enfermedades y guerra","Correcto."),("Sin cambios","Incorrecto."),("Migracion a Europa","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Reforma Protestante iniciada por:",[("Calvino","Incorrecto."),("Lutero","Correcto."),("Cortes","Incorrecto."),("Enrique VIII","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Contrarreforma fue:",[("Reforma de protestantes","Incorrecto."),("Respuesta catolica a la Reforma","Correcto."),("Concilio protestante","Incorrecto."),("Guerra","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Apply","Invencion clave para difundir ideas de Lutero?",[("Brujula","Incorrecto."),("Imprenta","Correcto."),("Polvora","Incorrecto."),("Telescopio","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Evaluate","Como cambio Europa tras la Reforma?",[("Unida religiosamente","Incorrecto."),("Division entre catolicos y protestantes","Correcto."),("Fin de la religion","Incorrecto."),("Todos ateos","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
]

print("W19-W27 loaded")
