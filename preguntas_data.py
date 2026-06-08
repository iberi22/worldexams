#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
preguntas_data.py - Banco de preguntas para Ciencias Naturales G3, G4, G5
Estructura: QDATA[(grado, segmento, semana)] = [(stem, [(letra,texto,fb),...], explicacion),...]
Contiene 10 preguntas por semana para cada segmento y grado.
"""

# ============================================================================
# G3 - Week to Segment mapping
# ============================================================================
G3_WEEKS = {}
_segs_g3 = [
    "seres-vivos","seres-vivos","seres-vivos","seres-vivos",
    "plantas","plantas","plantas","plantas",
    "animales","animales","animales","animales",
    "repaso-p1","repaso-p1","repaso-p2","repaso-p2",
    "agua","agua","agua","agua",
    "aire-clima","aire-clima","aire-clima","aire-clima",
    "suelo-recursos","suelo-recursos","suelo-recursos","suelo-recursos",
    "luz-sonido","luz-sonido","luz-sonido","luz-sonido",
    "sistema-solar","sistema-solar","sistema-solar","sistema-solar",
    "repaso-integral","repaso-integral","repaso-integral","repaso-integral",
]
for i, s in enumerate(_segs_g3):
    G3_WEEKS[f"W{i+1:02d}"] = s

# ============================================================================
# G4 - Week to Segment mapping
# ============================================================================
G4_WEEKS = {}
_segs_g4 = [
    "celula","celula","celula","celula",
    "tejidos-sistemas","tejidos-sistemas","tejidos-sistemas","tejidos-sistemas",
    "digestivo-nutricion","digestivo-nutricion","digestivo-nutricion","digestivo-nutricion",
    "repaso-p1","repaso-p1","repaso-p2","repaso-p2",
    "ecosistemas-colombia","ecosistemas-colombia","ecosistemas-colombia","ecosistemas-colombia",
    "cadenas-alimenticias","cadenas-alimenticias","cadenas-alimenticias","cadenas-alimenticias",
    "materia-propiedades","materia-propiedades","materia-propiedades","materia-propiedades",
    "cambios-estado","cambios-estado","cambios-estado","cambios-estado",
    "maquinas-simples","maquinas-simples","maquinas-simples","maquinas-simples",
    "repaso-integral","repaso-integral","repaso-integral","repaso-integral",
]
for i, s in enumerate(_segs_g4):
    G4_WEEKS[f"W{i+1:02d}"] = s

# ============================================================================
# G5 - Week to Segment mapping
# ============================================================================
G5_WEEKS = {}
_segs_g5 = [
    "clasificacion-reinos","clasificacion-reinos","clasificacion-reinos","clasificacion-reinos",
    "respiratorio-circulatorio","respiratorio-circulatorio","respiratorio-circulatorio","respiratorio-circulatorio",
    "nervioso-locomotor","nervioso-locomotor","nervioso-locomotor","nervioso-locomotor",
    "repaso-p1","repaso-p1","repaso-p2","repaso-p2",
    "ecosistemas-relaciones","ecosistemas-relaciones","ecosistemas-relaciones","ecosistemas-relaciones",
    "ciclos-agua-carbono","ciclos-agua-carbono","ciclos-agua-carbono","ciclos-agua-carbono",
    "energia","energia","energia","energia",
    "electricidad","electricidad","electricidad","electricidad",
    "magnetismo","magnetismo","magnetismo","magnetismo",
    "repaso-integral","repaso-integral","repaso-integral","repaso-integral",
]
for i, s in enumerate(_segs_g5):
    G5_WEEKS[f"W{i+1:02d}"] = s

# ============================================================================
# QDATA: ALL QUESTIONS
# ============================================================================
QDATA = {}

def add_q(grado, segmento, semana, preguntas):
    """Store 10 questions for (grado, segmento, semana)."""
    QDATA[(grado, segmento, semana)] = preguntas

# ---------------------------------------------------------------------------
# G3 - SERES VIVOS (W01-W04 = 40 preguntas)
# ---------------------------------------------------------------------------
# W01
add_q(3, "seres-vivos", "W01", [
    ("¿Cuál de los siguientes es un ser vivo?",
     [("A","Un gato","Los gatos nacen, crecen, se reproducen y mueren"),
      ("B","Una piedra","Las piedras son objetos inertes"),
      ("C","Una mesa","Las mesas son objetos inertes"),
      ("D","Una silla","Las sillas son objetos inertes")],
     "Los gatos son seres vivos porque realizan funciones vitales: nacen, crecen, se alimentan, se reproducen y mueren."),
    
    ("¿Qué necesitan todos los seres vivos para vivir?",
     [("A","Agua y alimento","Todos los seres vivos necesitan agua y alimento"),
      ("B","Solo juguetes","Los juguetes no son necesarios para vivir"),
      ("C","Un teléfono celular","Los celulares no son necesarios"),
      ("D","Solo un televisor","Los televisores no son necesarios")],
     "Todos los seres vivos necesitan agua, alimento (nutrientes) y energía para sobrevivir."),
    
    ("Un árbol crece más alto cada año. ¿Qué característica de los seres vivos se observa?",
     [("A","Crece","El crecimiento es el aumento de tamaño en los seres vivos"),
      ("B","Se reproduce","Crecer no es igual a reproducirse"),
      ("C","Juega","Los árboles no juegan"),
      ("D","Habla","Los árboles no hablan")],
     "El crecimiento es una característica fundamental de los seres vivos. Las plantas aumentan de tamaño con el tiempo."),
    
    ("¿Cómo se llama la capacidad de los seres vivos de reaccionar al ser tocados?",
     [("A","Irritabilidad","Es la capacidad de responder a estímulos del ambiente"),
      ("B","Crecimiento","El crecimiento es aumento de tamaño"),
      ("C","Reproducción","Reproducción es crear nuevos seres"),
      ("D","Digestión","Digestión es procesar alimentos")],
     "La irritabilidad permite a los seres vivos detectar cambios en el ambiente y responder para sobrevivir."),
    
    ("De esta lista: hormiga, libro, rosa, carro, pez. ¿Cuántos son seres vivos?",
     [("A","3","Hormiga, rosa y pez son seres vivos"),
      ("B","2","Revisa bien la lista, hay más"),
      ("C","5","No todos son seres vivos"),
      ("D","1","Hay más de uno")],
     "De la lista, la hormiga (insecto), la rosa (planta) y el pez (animal) son seres vivos. El carro y el libro son objetos inertes."),
    
    ("Si pones una semilla con tierra, agua y sol, ¿qué pasará después de unos días?",
     [("A","Germinará y empezará a crecer","La semilla usa agua y sol para germinar"),
      ("B","Se convertirá en piedra","No se transforma en piedra"),
      ("C","Desaparecerá","No desaparece"),
      ("D","Se volverá de plástico","Eso no ocurre en la naturaleza")],
     "Las semillas son seres vivos en estado de latencia. Con agua, tierra y luz solar germinan."),
    
    ("Una mariposa pone huevos en una hoja. ¿Qué función vital está realizando?",
     [("A","Reproducción","Poner huevos para crear nuevas mariposas es reproducción"),
      ("B","Nutrición","Nutrición es obtener alimento"),
      ("C","Crecimiento","Crecimiento es aumentar de tamaño"),
      ("D","Respiración","Respiración es intercambiar gases")],
     "La reproducción permite a los seres vivos crear descendencia. La mariposa pone huevos para continuar su especie."),
    
    ("¿Por qué una lagartija busca el sol pero una estatua de piedra no se mueve?",
     [("A","La lagartija es un ser vivo que necesita calor; la estatua es un objeto inerte","Los seres vivos responden a estímulos; los objetos inertes no"),
      ("B","La estatua está cansada","Las estatuas no se cansan"),
      ("C","La lagartija quiere jugar","Busca calor, no juego"),
      ("D","La estatua está dormida","Las estatuas no duermen")],
     "Los seres vivos tienen irritabilidad: responden a estímulos como la temperatura. La lagartija necesita sol para calentar su cuerpo."),
    
    ("¿Por qué las plantas necesitan luz solar para vivir?",
     [("A","La luz les da energía para fabricar su alimento mediante fotosíntesis","Con luz producen glucosa"),
      ("B","Porque les gusta el calor","No es cuestión de gusto"),
      ("C","Porque sin luz se aburren","Las plantas no se aburren"),
      ("D","Porque la luz las hace crecer de noche","Las plantas necesitan luz para crecer")],
     "Las plantas realizan fotosíntesis usando luz solar para convertir agua y CO₂ en glucosa y oxígeno."),
    
    ("Un estudiante dice que 'una piedra está viva porque está en la naturaleza'. ¿Estás de acuerdo?",
     [("A","No, porque las piedras no realizan funciones vitales","Las piedras no nacen, crecen ni se reproducen"),
      ("B","Sí, porque está en el suelo","Estar en la naturaleza no es estar vivo"),
      ("C","Sí, porque es dura","La dureza no es signo de vida"),
      ("D","Sí, porque tiene color","El color no determina si algo está vivo")],
     "Para ser considerado ser vivo debe cumplir funciones vitales: nacer, crecer, nutrirse, relacionarse, reproducirse y morir."),
])
# W02
add_q(3, "seres-vivos", "W02", [
    ("¿Cuál de estos NO es un ser vivo?",
     [("A","Una roca","Las rocas son objetos inertes"),
      ("B","Un árbol","Los árboles son seres vivos"),
      ("C","Un perro","Los perros son seres vivos"),
      ("D","Un hongo","Los hongos son seres vivos")],
     "Las rocas son objetos inertes porque no realizan funciones vitales."),
    
    ("¿Dónde vive naturalmente un pez?",
     [("A","En el agua (ríos, lagos, mares)","Allí obtienen oxígeno y alimento"),
      ("B","En una cueva","No es su hábitat natural"),
      ("C","En un árbol","No viven en árboles"),
      ("D","En el desierto","No sobreviven allí")],
     "El hábitat es el lugar donde un ser vivo encuentra todo lo que necesita. Los peces viven en el agua."),
    
    ("¿Cómo se llaman los grandes grupos en que se clasifican los seres vivos?",
     [("A","Reinos","Monera, Protista, Fungi, Plantae, Animalia"),
      ("B","Países","Los países son divisiones geográficas"),
      ("C","Colores","El color no clasifica seres vivos"),
      ("D","Números","Los números no clasifican")],
     "Los seres vivos se clasifican en cinco reinos: Monera, Protista, Fungi, Plantae y Animalia."),
    
    ("¿Qué necesitan los animales para sobrevivir?",
     [("A","Agua, alimento, oxígeno y un hábitat adecuado","Todas son necesidades básicas"),
      ("B","Solo un celular","No necesitan celulares"),
      ("C","Televisor y ropa","No necesitan eso"),
      ("D","Dinero","Los animales no usan dinero")],
     "Todos los animales necesitan agua, alimento, oxígeno y un hábitat adecuado."),
    
    ("¿Por qué los peces tienen branquias y los humanos pulmones?",
     [("A","Los peces viven en el agua; los humanos en la tierra","Cada órgano se adapta al medio"),
      ("B","Los humanos son más grandes","El tamaño no determina el órgano respiratorio"),
      ("C","A los peces no les gusta el aire","También respiran oxígeno, pero del agua"),
      ("D","Los humanos pueden respirar bajo el agua","No podemos respirar bajo el agua")],
     "Las branquias captan oxígeno disuelto en el agua. Los pulmones captan oxígeno del aire."),
    
    ("Un pájaro recoge ramitas para hacer un nido. ¿Por qué lo hace?",
     [("A","Para proteger a sus crías","Los nidos protegen huevos y polluelos"),
      ("B","Porque está jugando","No es juego, es instinto"),
      ("C","Porque quiere decorar","No es decoración"),
      ("D","Porque está aburrido","No es aburrimiento")],
     "Los pájaros construyen nidos para proteger a sus huevos y crías."),
    
    ("¿Qué debes hacer para mantener saludable a tu mascota?",
     [("A","Darle agua, comida y cariño","Agua, alimento y afecto son esenciales"),
      ("B","Ponerla a ver televisión","No necesita televisión"),
      ("C","Dejarla sola todo el día","Necesita atención y cuidados"),
      ("D","No darle agua","Todos los seres vivos necesitan agua")],
     "Las mascotas necesitan agua limpia, alimento balanceado, ejercicio y atención veterinaria."),
    
    ("¿Por qué un cactus puede vivir en el desierto pero un helecho no?",
     [("A","El cactus tiene adaptaciones para almacenar agua y resistir el calor","Los cactus almacenan agua en sus tallos"),
      ("B","El cactus es más fuerte","No es cuestión de fuerza"),
      ("C","El helecho no quiere vivir allí","No es una decisión"),
      ("D","Al cactus le gusta el calor","No es cuestión de gustos")],
     "Los cactus almacenan agua en sus tallos gruesos y tienen espinas para reducir la pérdida de agua."),
    
    ("¿Por qué hay más tipos de plantas y animales en la selva que en el desierto?",
     [("A","En la selva hay más agua, luz y nutrientes","Más recursos permiten más vida"),
      ("B","La selva es más bonita","La belleza no determina la biodiversidad"),
      ("C","En el desierto los animales se esconden","Hay menos especies, no se esconden"),
      ("D","Solo plantas pequeñas viven en la selva","Hay plantas de todos los tamaños")],
     "Las selvas tropicales tienen abundante agua, luz solar y nutrientes, permitiendo que muchas especies vivan allí."),
    
    ("Un amigo te dice: 'Los seres humanos no somos animales'. ¿Qué le responderías?",
     [("A","Los humanos somos animales del reino Animalia, mamíferos","Biológicamente somos animales"),
      ("B","Tiene razón, somos completamente diferentes","También somos animales del reino Animalia"),
      ("C","Somos plantas","No somos plantas"),
      ("D","Somos minerales","No somos minerales")],
     "Los seres humanos pertenecemos al reino Animalia, somos mamíferos del orden de los primates."),
])
# W03
add_q(3, "seres-vivos", "W03", [
    ("¿Cómo se llama la capacidad de los seres vivos para sentir cambios en el ambiente?",
     [("A","Irritabilidad","Detectan estímulos y responden"),
      ("B","Digestión","La digestión procesa alimentos"),
      ("C","Fotosíntesis","La fotosíntesis la hacen las plantas"),
      ("D","Masticación","Masticar es triturar alimentos")],
     "La irritabilidad permite detectar estímulos (luz, temperatura, sonido, tacto) y responder para sobrevivir."),
    
    ("¿Cuál es una adaptación de los animales al frío extremo?",
     [("A","Piel gruesa y capa de grasa","La grasa aísla del frío"),
      ("B","Piel muy delgada","No protege del frío"),
      ("C","Respirar muy rápido","No ayuda contra el frío"),
      ("D","Tener muchas patas","No es adaptación al frío")],
     "Los animales de climas fríos tienen piel gruesa, capas de grasa o pelaje denso para conservar calor."),
    
    ("¿Por qué algunos animales cambian de color según la estación?",
     [("A","Para camuflarse y protegerse de depredadores","El camuflaje ayuda a sobrevivir"),
      ("B","Para verse diferentes","No es una decisión consciente"),
      ("C","Porque se aburren de su color","No es aburrimiento"),
      ("D","Para asustar a otros animales","No es para asustar")],
     "El camuflaje permite confundirse con el ambiente. El conejo ártico se vuelve blanco en invierno."),
    
    ("Un caracol se esconde en su concha cuando lo tocas. ¿Qué función vital demuestra?",
     [("A","Relación o irritabilidad","Responde al estímulo del tacto"),
      ("B","Nutrición","No se está alimentando"),
      ("C","Reproducción","No se está reproduciendo"),
      ("D","Crecimiento","No está creciendo en ese momento")],
     "La función de relación permite detectar cambios en el ambiente. El caracol detecta peligro y se protege."),
    
    ("¿Qué le pasaría a una planta en un cuarto completamente oscuro por un mes?",
     [("A","Se pondría amarilla y se debilitaría","Sin luz no puede hacer fotosíntesis"),
      ("B","Crecería más rápido","Sin luz no crece bien"),
      ("C","Se volvería azul","No cambia de color así"),
      ("D","Le saldrían muchas flores","Sin luz no produce flores")],
     "Las plantas necesitan luz para la fotosíntesis. Sin luz pierden clorofila y se debilitan."),
    
    ("Pusiste una lombriz en una caja: tierra húmeda de un lado, seca del otro. ¿Hacia dónde irá?",
     [("A","Hacia la tierra húmeda","Necesitan humedad para respirar por la piel"),
      ("B","Hacia la tierra seca","Prefieren la húmeda"),
      ("C","Se quedará quieta","Se moverá para buscar humedad"),
      ("D","Saltará fuera de la caja","Las lombrices no saltan")],
     "Las lombrices necesitan humedad para respirar. Buscan tierra húmeda. Esto demuestra irritabilidad."),
    
    ("Las plantas del jardín se inclinan hacia la ventana por donde entra el sol. ¿Por qué?",
     [("A","Buscan la luz para hacer fotosíntesis","Es el fototropismo"),
      ("B","El viento las empuja","No es el viento"),
      ("C","Quieren salir de la casa","Las plantas no tienen deseos"),
      ("D","Están enfermas","Es normal en las plantas")],
     "El fototropismo es el crecimiento de las plantas hacia la luz para obtener energía para la fotosíntesis."),
    
    ("Compara un cactus del desierto con un helecho de la selva. ¿En qué se diferencian sus adaptaciones?",
     [("A","El cactus almacena agua; el helecho necesita mucha agua","Cada uno está adaptado a su hábitat"),
      ("B","Son exactamente iguales","Son muy diferentes en sus adaptaciones"),
      ("C","El cactus no necesita luz","Todas las plantas necesitan luz"),
      ("D","El helecho puede vivir en el desierto","No sobrevive en el desierto")],
     "El cactus almacena agua en tallos gruesos. El helecho tiene hojas grandes para captar luz en la selva."),
    
    ("¿Por qué el frailejón del páramo colombiano acumula agua en sus hojas?",
     [("A","Para almacenar agua en épocas secas y regular el ciclo hídrico","Es clave para los páramos"),
      ("B","Para decorar el paisaje","No es decoración"),
      ("C","Para hacer sombra a otros animales","No es su función principal"),
      ("D","Para que los animales se escondan","No es para eso")],
     "El frailejón almacena agua en sus hojas peludas, regulando el ciclo hídrico de los páramos colombianos."),
    
    ("¿Por qué es importante conservar los diferentes hábitats y ecosistemas?",
     [("A","Cada hábitat alberga seres vivos que dependen de él","Perder hábitats puede extinguir especies"),
      ("B","Son bonitos para tomar fotos","Es más que solo estética"),
      ("C","Para construir más casas","No es la razón para conservarlos"),
      ("D","Los animales pueden vivir en cualquier parte","Cada especie necesita un hábitat específico")],
     "Cada ser vivo está adaptado a su hábitat. Si destruimos hábitats, las especies pierden su hogar y desaparecen."),
])
# W04
add_q(3, "seres-vivos", "W04", [
    ("¿Cuál es una característica de TODOS los seres vivos?",
     [("A","Reproducirse","Todos se reproducen para continuar la especie"),
      ("B","Tener patas","Las plantas no tienen patas"),
      ("C","Volar","Muchos seres vivos no vuelan"),
      ("D","Vivir en el agua","Muchos viven en la tierra")],
     "La reproducción es una función vital común a todos los seres vivos."),
    
    ("Los seres vivos que viven en el agua se llaman...",
     [("A","Acuáticos","Como peces, algas y ballenas"),
      ("B","Terrestres","Viven en la tierra"),
      ("C","Voladores","Vuelan por el aire"),
      ("D","Subterráneos","Viven bajo tierra")],
     "Los organismos acuáticos viven en el agua y están adaptados a ese medio."),
    
    ("¿Qué pasaría si desaparecieran todas las plantas del planeta?",
     [("A","Faltaría oxígeno y alimento para los demás seres vivos","Las plantas producen oxígeno y son la base alimenticia"),
      ("B","Los animales tendrían más espacio","Sería catastrófico"),
      ("C","Nada cambiaría","Habría un gran impacto en la vida"),
      ("D","Habría más agua","No habría más agua")],
     "Las plantas son productores: mediante fotosíntesis producen oxígeno y son base de las cadenas alimenticias."),
    
    ("¿Por qué algunas plantas tienen espinas en lugar de hojas?",
     [("A","Para reducir la pérdida de agua y protegerse","Adaptación a climas secos"),
      ("B","Porque están enojadas","Las plantas no se enojan"),
      ("C","Para decorar","No es decoración"),
      ("D","Para atraer insectos","Las flores atraen insectos, no las espinas")],
     "Las espinas son hojas modificadas que reducen la pérdida de agua por evaporación."),
    
    ("¿Cuál de estas NO es una función vital de los seres vivos?",
     [("A","Jugar","Jugar no es necesario para vivir"),
      ("B","Nutrición","Es una función vital"),
      ("C","Reproducción","Es una función vital"),
      ("D","Relación","Es una función vital")],
     "Las funciones vitales son nutrición, relación y reproducción."),
    
    ("Un gato se acerca al fuego porque tiene frío. ¿Qué función vital demuestra?",
     [("A","Irritabilidad (función de relación)","Responde a la temperatura como estímulo"),
      ("B","Nutrición","No se está alimentando"),
      ("C","Reproducción","No se está reproduciendo"),
      ("D","Crecimiento","No está creciendo")],
     "El gato detecta el frío (estímulo) y busca calor (respuesta). Es la función de relación."),
    
    ("Si una planta no recibe agua por varios días, ¿qué ocurrirá?",
     [("A","Se marchitará","Necesita agua para transportar nutrientes"),
      ("B","Crecerá más rápido","Sin agua no puede crecer"),
      ("C","Producirá más flores","Sin agua no produce flores"),
      ("D","Se pondrá más verde","Sin agua pierde color y se marchita")],
     "El agua es esencial para transportar nutrientes en las plantas. Sin agua, las células se deshidratan."),
    
    ("¿Por qué los organismos de una sola célula se consideran seres vivos?",
     [("A","Porque realizan funciones vitales: se nutren, crecen y se reproducen","Una célula puede hacer todo lo vital"),
      ("B","Porque son muy pequeños","El tamaño no define la vida"),
      ("C","Porque se mueven","No todos los unicelulares se mueven"),
      ("D","Porque tienen colores","El color no define la vida")],
     "Las bacterias y protozoos son unicelulares pero realizan nutrición, relación y reproducción."),
    
    ("Un estudiante dice: 'las nubes crecen, así que son seres vivos'. ¿Qué responderías?",
     [("A","Las nubes no son seres vivos porque no se reproducen ni se nutren","Crecer no es suficiente para ser un ser vivo"),
      ("B","Tiene razón","Las nubes no son seres vivos"),
      ("C","Las nubes son plantas","No son plantas"),
      ("D","Las nubes son animales","No son animales")],
     "Crecer no basta. Las nubes no cumplen funciones vitales como nutrición, reproducción y relación."),
    
    ("¿Por qué es importante aprender sobre los seres vivos y su clasificación?",
     [("A","Para entender y cuidar la naturaleza que nos rodea","Conocer nos ayuda a respetar y proteger"),
      ("B","Solo para tener mejores notas","Es más que una calificación"),
      ("C","No es importante","Sí es importante para la vida"),
      ("D","Solo si quieres ser científico","Es útil para todos los ciudadanos")],
     "Conocer los seres vivos ayuda a entender la biodiversidad y tomar decisiones para proteger el ambiente."),
])

# ---------------------------------------------------------------------------
# G3 - PLANTAS (W05-W08)
# ---------------------------------------------------------------------------
add_q(3, "plantas", "W05", [
    ("¿Cuál de las siguientes es una parte de la planta que está bajo tierra?",
     [("A","La raíz","La raíz crece bajo tierra y absorbe agua"),
      ("B","Las hojas","Las hojas están sobre el tallo"),
      ("C","Las flores","Las flores están en la parte aérea"),
      ("D","Los frutos","Los frutos crecen en la parte aérea")],
     "La raíz es la parte subterránea. Absorbe agua y minerales del suelo."),
    
    ("¿Qué función cumplen las hojas de las plantas?",
     [("A","Realizar la fotosíntesis","Las hojas captan luz solar y fabrican alimento"),
      ("B","Absorber agua del suelo","Esa función es de la raíz"),
      ("C","Fijar la planta al suelo","Esa función es de la raíz"),
      ("D","Producir flores","Las flores se producen en las ramas")],
     "Las hojas son los órganos donde ocurre la fotosíntesis. Captan luz solar y producen alimento."),
    
    ("¿Para qué sirve el tallo de las plantas?",
     [("A","Transportar agua y nutrientes y sostener la planta","Conecta raíces con hojas"),
      ("B","Absorber agua del suelo","Eso lo hace la raíz"),
      ("C","Fabricar el alimento","Eso lo hacen las hojas"),
      ("D","Producir las semillas","Eso lo hacen las flores")],
     "El tallo transporta agua y nutrientes entre raíces y hojas. También sostiene la planta."),
    
    ("¿Qué necesita una planta para realizar la fotosíntesis?",
     [("A","Luz solar, agua y dióxido de carbono","Con estos elementos produce glucosa y oxígeno"),
      ("B","Solo tierra","Necesita más que tierra"),
      ("C","Leche y pan","Las plantas no comen eso"),
      ("D","Solo agua","Necesita luz y CO₂ también")],
     "Para la fotosíntesis, las plantas necesitan luz solar, agua y dióxido de carbono."),
    
    ("¿Qué producen las plantas durante la fotosíntesis?",
     [("A","Alimento (glucosa) y oxígeno","Las plantas producen su alimento y liberan oxígeno"),
      ("B","Solo agua","No producen agua"),
      ("C","Solo dióxido de carbono","Consumen CO₂, no lo producen"),
      ("D","Plástico","Las plantas no producen plástico")],
     "Durante la fotosíntesis, las plantas producen glucosa (su alimento) y liberan oxígeno."),
    
    ("Si plantas una semilla de frijol en un vaso con algodón húmedo, ¿qué observarás primero?",
     [("A","Una pequeña raíz saliendo de la semilla","Primero crece la raíz, luego el tallo"),
      ("B","Una flor","Las flores salen después, cuando la planta madura"),
      ("C","Un fruto","Los frutos aparecen al final"),
      ("D","Nada, la semilla no cambia","La semilla germinará con humedad")],
     "Al germinar, primero emerge una pequeña raíz, luego crece el tallo hacia arriba."),
    
    ("¿Por qué las plantas son importantes para los animales y las personas?",
     [("A","Producen oxígeno y son fuente de alimento","Sin plantas no habría oxígeno ni comida"),
      ("B","Solo sirven para decorar","Su función va más allá de la decoración"),
      ("C","Son peligrosas para la salud","No todas, muchas son beneficiosas"),
      ("D","No tienen ninguna importancia","Son fundamentales para la vida")],
     "Las plantas producen oxígeno mediante fotosíntesis y son la base de las cadenas alimenticias."),
    
    ("¿Qué le pasaría a una planta si le cortas todas las hojas?",
     [("A","No podría fabricar alimento y se debilitaría","Las hojas son donde ocurre la fotosíntesis"),
      ("B","Crecería más rápido","Sin hojas no puede alimentarse"),
      ("C","Produciría más raíces","No es función de las hojas"),
      ("D","Se volvería más verde","Sin hojas pierde clorofila")],
     "Las hojas realizan la fotosíntesis. Sin ellas, la planta no puede fabricar su alimento."),
    
    ("¿Por qué las plantas verdes son importantes para el aire que respiramos?",
     [("A","Porque liberan oxígeno al ambiente","Durante la fotosíntesis producen oxígeno"),
      ("B","Porque consumen todo el oxígeno","Consumen CO₂, no oxígeno"),
      ("C","Porque producen dióxido de carbono","Consumen CO₂, no lo producen"),
      ("D","No tienen relación con el aire","Sí tienen una relación directa")],
     "Las plantas liberan oxígeno como producto de la fotosíntesis. Ese oxígeno es el que respiramos."),
    
    ("¿Por qué los bosques y selvas son llamados 'los pulmones del planeta'?",
     [("A","Porque producen gran cantidad de oxígeno","Los grandes bosques generan oxígeno global"),
      ("B","Porque tienen forma de pulmones","No es por su forma"),
      ("C","Porque respiran como los humanos","No respiran como nosotros"),
      ("D","Porque hacen ruido al respirar","No hacen ruido")],
     "Los bosques, especialmente la Amazonía, producen enormes cantidades de oxígeno y absorben CO₂."),
])

# [...] Continue with remaining segments...

# For now, let's create fallback data for segments that don't have specific data yet
QDATA_FALLBACK = {}

# ============================================================================
# ADD MORE DATA HERE FOR REMAINING SEGMENTS
# ============================================================================

print(f"  preguntas_data loaded: {len(QDATA)} week entries")
