# Part 4: W32-W40 (Economía, Población, Democracia, Repaso)
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

# W32: Economía - Procesos de Producción
save_qs(32, [
    make_q("Remember", C, "Qué son los sectores económicos?",["Divisiones políticas","Clasificación de actividades económicas: primario, secundario, terciario","Regiones","Empresas"],1,"Organizan la economía."),
    make_q("Remember", C, "Sector primario incluye:",["Industria","Agricultura, ganadería, pesca, minería","Servicios","Tecnología"],1,"Extracción de recursos."),
    make_q("Understand", C, "Qué produce el sector secundario?",["Materia prima","Transformación de materias primas en productos (industria)","Servicios","Comercio"],1,"Manufactura y construcción."),
    make_q("Apply", C, "Un agricultor colombiano cultiva café. Pertenece al:",["Sector primario","Sector secundario","Sector terciario","Sector cuaternario"],0,"Agricultura = primario."),
    make_q("Understand", C, "Qué actividades están en el sector terciario?",["Agricultura","Comercio, transporte, educación, salud","Minería","Industria"],1,"Servicios."),
    make_q("Analyze", C, "Por qué Colombia tiene fuerte sector primario?",["Es país desarrollado","Riqueza natural: café, petróleo, carbón, flores","No tiene industria","Solo servicios"],1,"Recursos naturales abundantes."),
    make_q("Remember", C, "Factores de producción:",["Oferta y demanda","Tierra, trabajo, capital y tecnología","Importar y exportar","Ganancia y pérdida"],1,"Recursos para producir."),
    make_q("Apply", C, "Un inversionista compra maquinaria para una fábrica. Aporta:",["Tierra","Capital","Trabajo","Tecnología"],1,"Capital = maquinaria."),
    make_q("Evaluate", C, "Por qué la economía es importante para la sociedad?",["No es importante","Organiza cómo producir, distribuir y consumir bienes","Solo para ricos","Solo empresas"],1,"Satisface necesidades."),
    make_q("Understand", C, "Qué es la producción?",["Consumir","Creación de bienes y servicios usando factores productivos","Vender","Ahorrar"],1,"Transformación de recursos."),
])

# W33: Economía - Distribución y Consumo
save_qs(33, [
    make_q("Remember", C, "Qué es la distribución en economía?",["Producir","Llevar los productos del productor al consumidor","Consumir","Ahorrar"],1,"Canales de distribución."),
    make_q("Remember", C, "Qué es el consumo?",["Producir","Uso de bienes y servicios para satisfacer necesidades","Distribuir","Ahorrar"],1,"Consumo final."),
    make_q("Understand", C, "Ley de oferta y demanda:",["El gobierno fija precios","A más demanda y menos oferta, suben precios","Precios siempre iguales","No hay ley"],1,"Mecanismo de mercado."),
    make_q("Apply", C, "Si hay sequía y escasea café, qué pasa?",["Baja el precio","Sube el precio (menos oferta)","No cambia","Desaparece"],1,"Oferta baja, precio sube."),
    make_q("Understand", C, "Qué es un mercado?",["Supermercado","Lugar (físico o virtual) donde oferentes y demandantes intercambian","País","Tienda"],1,"Intercambio voluntario."),
    make_q("Analyze", C, "Por qué unos países exportan y otros importan?",["Capricho","Especialización: cada país produce lo que mejor sabe hacer","Sin razón","Todos igual"],1,"Ventajas comparativas."),
    make_q("Remember", C, "Qué son las importaciones?",["Ventas al exterior","Compras de bienes del exterior","Productos locales","Exportaciones"],1,"Productos extranjeros."),
    make_q("Apply", C, "Colombia exporta café e importa celulares. Por qué?",["Le gusta","Tiene ventaja en café, no en celulares","No puede producir","Obligación"],1,"Ventajas comparativas."),
    make_q("Evaluate", C, "Qué papel tiene el consumidor en la economía?",["Ninguno","Decide qué comprar, influye en producción","Solo gasta","No importa"],1,"El consumidor guía el mercado."),
    make_q("Understand", C, "Qué es el consumo responsable?",["Gastar mucho","Comprar considerando impacto ambiental, social y ético","No consumir","Solo marcas"],1,"Decisiones conscientes."),
])

# W34: Publicidad y Consumo Responsable
save_qs(34, [
    make_q("Remember", C, "Qué es la publicidad?",["Información científica","Comunicación persuasiva para promover productos o ideas","Educación","Noticias"],1,"Persuasión comercial."),
    make_q("Remember", C, "Cuál es el objetivo principal de la publicidad?",["Informar objetivamente","Persuadir al consumidor para comprar","Educar","Entretener"],1,"Influir en decisiones."),
    make_q("Understand", C, "Qué son los derechos del consumidor?",["No existen","Protecciones legales: información, calidad, reclamo, salud","Privilegios","Obligaciones"],1,"Ley 1480 de 2011 (Estatuto del Consumidor)."),
    make_q("Apply", C, "Un anuncio dice: este producto te hará feliz. Qué estrategia usa?",["Informativa","Apelación emocional","Racional","Educativa"],1,"Publicidad emocional."),
    make_q("Understand", C, "Qué es el consumo responsable?",["Gastar sin límite","Considerar impacto ambiental y social al comprar","Comprar barato","Seguir tendencias"],1,"Decisiones conscientes."),
    make_q("Analyze", C, "Por qué la publicidad usa influencers?",["Son buenos","Influyen en decisiones de sus seguidores","Son baratos","No hay otra"],1,"Credibilidad e influencia."),
    make_q("Remember", C, "Entidad que protege al consumidor en Colombia:",["Ministerio de Salud","Superintendencia de Industria y Comercio (SIC)","DIAN","Banco de la República"],1,"Superintendencia."),
    make_q("Apply", C, "Si compras un producto defectuoso, qué haces?",["Botarlo","Reclamar ante el vendedor o SIC","Nada","Quejarse en redes"],1,"Derecho de garantía."),
    make_q("Evaluate", C, "Publicidad engañosa: qué debería pasar?",["Nada","Sanciones legales, derechos del consumidor vulnerados","Es aceptable","Buena estrategia"],1,"Protegido por la ley."),
    make_q("Understand", C, "Qué puedes hacer para consumir responsablemente?",["Comprar todo","Investigar, reciclar, reducir, reutilizar","Gastar rápido","Ignorar etiquetas"],1,"Decisiones informadas."),
])

# W35: Repaso P7 (Economía y Consumo)
save_qs(35, [
    make_q("Remember", C, "Sectores económicos:",["Público y privado","Primario, secundario, terciario","Urbano y rural","Nacional y local"],1,"Clasificación de actividades."),
    make_q("Understand", C, "Agricultura y minería pertenecen al:",["Sector primario","Sector secundario","Sector terciario","Sector cuaternario"],0,"Extracción de recursos."),
    make_q("Apply", C, "Ley de oferta y demanda:",["Gobierno fija precios","Mucha demanda poca oferta = precio sube","Precios siempre iguales","No aplica"],1,"Mecanismo de mercado."),
    make_q("Remember", C, "Qué es la publicidad?",["Información","Comunicación persuasiva para promover productos","Educación","Noticias"],1,"Persuasión."),
    make_q("Understand", C, "Derechos del consumidor:",["Solo a comprar","Información, calidad, reclamo, salud","A deber","No existen"],1,"Ley 1480 de 2011."),
    make_q("Analyze", C, "Naranjas colombianas vs noruegas. Quién produce mejor?",["Noruega","Colombia por clima tropical favorable","Iguales","Ninguno"],1,"Ventaja comparativa."),
    make_q("Remember", C, "Factores de producción:",["Oferta/demanda","Tierra, trabajo, capital, tecnología","Importar/exportar","Ganancia/pérdida"],1,"Recursos para producir."),
    make_q("Apply", C, "Consumo responsable implica:",["Gastar sin límite","Considerar impacto ambiental y social","Comprar barato","Seguir tendencias"],1,"Decisiones conscientes."),
    make_q("Evaluate", C, "Importancia del consumo responsable:",["Ninguna","Reduce impacto ambiental y promueve justicia social","Solo rico","Solo pobre"],1,"Sostenibilidad."),
    make_q("Understand", C, "Qué es importación?",["Vender afuera","Comprar productos del exterior","Producir","Exportar"],1,"Bienes extranjeros."),
])

# W36: Población Mundial - Distribución
save_qs(36, [
    make_q("Remember", C, "Qué estudia la demografía?",["Mapas","Población: tamaño, distribución, composición","Clima","Economía"],1,"Ciencia de la población."),
    make_q("Remember", C, "Qué es la densidad de población?",["Número total","Personas por km²","Edad promedio","Crecimiento"],1,"Relación población/área."),
    make_q("Understand", C, "Por qué unas zonas están densamente pobladas?",["Clima extremo","Suelos fértiles, clima templado, recursos y costas","Montañas altas","Desiertos"],1,"Condiciones favorables."),
    make_q("Apply", C, "Zona más densamente poblada de Colombia:",["Amazonas","Región Andina (Bogotá, Medellín)","Llanos","Guajira"],1,"Andes: clima y recursos."),
    make_q("Understand", C, "Qué es la población urbana?",["Personas en el campo","Personas que viven en ciudades","Niños","Ancianos"],1,"Urbana vs rural."),
    make_q("Analyze", C, "Por qué la población mundial creció tanto en el s. XX?",["Nacen más","Avances médicos, alimentos, saneamiento","Menos muertes solo","Migraciones"],1,"Revolución industrial y medicina."),
    make_q("Remember", C, "País más poblado del mundo:",["Estados Unidos","India","China","Indonesia"],1,"India superó a China en 2023."),
    make_q("Apply", C, "Un censo de población sirve para:",["Imponer impuestos","Planificar políticas públicas (salud, educación)","Solo estadística","Elegir presidente"],1,"Planificación."),
    make_q("Evaluate", C, "Problemas del crecimiento poblacional:",["Ninguno","Presión sobre recursos, contaminación, urbanización","Beneficios","Desarrollo"],1,"Sostenibilidad."),
    make_q("Understand", C, "Qué es la esperanza de vida?",["Años que vive un rico","Promedio de años que vive una población","Máxima edad","Edad de jubilación"],1,"Indicador de salud."),
])

# W37: Migraciones y Multiculturalidad
save_qs(37, [
    make_q("Remember", C, "Qué es una migración?",["Viaje de vacaciones","Desplazamiento de población de un lugar a otro","Nacer","Morir"],1,"Cambio de residencia."),
    make_q("Remember", C, "Quiénes son los emigrantes?",["Los que llegan","Los que salen de su país","Los turistas","Los nacidos"],1,"Salen de su lugar."),
    make_q("Understand", C, "Diferencia entre emigrante e inmigrante:",["Son lo mismo","Emigrante: sale. Inmigrante: llega","Emigrante: ilegal. Inmigrante: legal","Inverso"],1,"Perspectiva distinta."),
    make_q("Apply", C, "Muchos venezolanos llegan a Colombia. Son:",["Emigrantes venezolanos, inmigrantes en Colombia","Turistas","Ciudadanos colombianos","Exiliados"],0,"Inmigrantes en Colombia."),
    make_q("Understand", C, "Qué es la multiculturalidad?",["Un solo grupo","Convivencia de diversas culturas en un mismo espacio","Segregación","Racismo"],1,"Diversidad cultural."),
    make_q("Analyze", C, "Por qué la gente migra?",["Por gusto","Económicas, violencia, clima, reunificación familiar","Solo por guerra","Solo por estudios"],1,"Factores push y pull."),
    make_q("Remember", C, "Principal causa de migración en Colombia en el s. XX:",["Turismo","Conflicto armado interno","Clima","Educación"],1,"Desplazamiento forzado."),
    make_q("Apply", C, "La migración beneficia a un país receptor como Colombia?",["Nunca","Aporta mano de obra y diversidad cultural","Solo problemas","No cambia nada"],1,"Aportes económicos y culturales."),
    make_q("Evaluate", C, "Cómo promover la multiculturalidad?",["Ignorar diferencias","Respetar, integrar y valorar la diversidad cultural","Separar grupos","Asimilar culturas"],1,"Inclusión y respeto."),
    make_q("Understand", C, "Qué es xenofobia?",["Amor a extranjeros","Rechazo u odio a extranjeros","Igualdad","Turismo"],1,"Discriminación."),
])

# W38: La Democracia como Sistema Político
save_qs(38, [
    make_q("Remember", C, "Qué es la democracia?",["Gobierno de un rey","Sistema donde el pueblo elige a sus gobernantes","Gobierno militar","Anarquía"],1,"Poder del pueblo."),
    make_q("Remember", C, "Año de la Constitución Política de Colombia:",["1886","1991","1810","1957"],1,"Constitución de 1991."),
    make_q("Understand", C, "Qué son los poderes públicos en Colombia?",["Uno solo","Ejecutivo, Legislativo y Judicial (separación de poderes)","Dos poderes","Sin poderes"],1,"División de poderes."),
    make_q("Apply", C, "Quién es el jefe del poder ejecutivo en Colombia?",["Congreso","Presidente de la República","Corte Suprema","Fiscalía"],1,"Presidente."),
    make_q("Understand", C, "Función del Congreso (poder legislativo):",["Ejecutar leyes","Hacer las leyes","Juzgar","Administrar justicia"],1,"Legislar."),
    make_q("Analyze", C, "Por qué es importante la separación de poderes?",["Eficiencia","Evitar concentración de poder y abusos","Velocidad","Menos trabajo"],1,"Controles y equilibrios."),
    make_q("Remember", C, "El voto en Colombia es:",["Opcional","Un derecho y un deber ciudadano","Solo para ricos","Solo para hombres"],1,"Sufragio universal."),
    make_q("Apply", C, "Para ser presidente de Colombia se requiere:",["Ser colombiano de nacimiento, mayor de 30 años","Ser mayor de 18","Tener dinero","Saber inglés"],0,"Requisitos constitucionales."),
    make_q("Evaluate", C, "Participación ciudadana en democracia:",["Solo votar","Votar, controlar, proponer, protestar pacíficamente","No es necesaria","Solo políticos"],1,"Democracia participativa."),
    make_q("Understand", C, "Qué es un partido político?",["Empresa","Organización que agrupa personas con ideas comunes para acceder al poder","Club deportivo","ONG"],1,"Mediación política."),
])

# W39: Derechos Humanos Fundamentales
save_qs(39, [
    make_q("Remember", C, "Qué son los derechos humanos?",["Privilegios","Derechos inherentes a toda persona por su dignidad humana","Leyes solo para algunos","Opciones"],1,"Universales e inalienables."),
    make_q("Remember", C, "Documento internacional que los proclamó en 1948:",["Constitución colombiana","Declaración Universal de Derechos Humanos (DUDH)","Carta Magna","Tratado de Versalles"],1,"DUDH, ONU."),
    make_q("Understand", C, "Derechos humanos son:",["Solo para adultos","Universales, indivisibles e irrenunciables","Solo colombianos","Solo hombres"],1,"Todas las personas."),
    make_q("Apply", C, "Derecho a la educación está en:",["Solo en leyes colombianas","DUDH y Constitución colombiana","No existe","Solo en países ricos"],1,"Derecho fundamental."),
    make_q("Understand", C, "Qué es la dignidad humana?",["Valor económico","Valor inherente de toda persona que fundamenta los derechos","Apariencia","Título"],1,"Base de los DDHH."),
    make_q("Analyze", C, "Por qué los derechos humanos son importantes?",["No lo son","Protegen la libertad, igualdad y dignidad de todas las personas","Solo en teoría","Solo en guerras"],1,"Fundamento de la justicia."),
    make_q("Remember", C, "Derechos de primera generación son:",["Económicos","Civiles y políticos (vida, libertad, voto)","Sociales","Culturales"],1,"Derechos individuales."),
    make_q("Apply", C, "Derecho a la salud en Colombia está garantizado por:",["Constitución de 1991 y sistema de salud","No existe","Solo para ricos","Solo hospitales"],0,"Derecho fundamental."),
    make_q("Evaluate", C, "Por qué deben protegerse los DDHH incluso en conflictos?",["No deben","La dignidad humana no se pierde en guerra","Solo en paz","Solo civiles"],1,"Derecho Internacional Humanitario."),
    make_q("Understand", C, "Qué organismo protege los DDHH en Colombia?",["Ejército","Defensoría del Pueblo","Fiscalía","Contraloría"],1,"Defensoría del Pueblo."),
])

# W40: Repaso Integral Anual
save_qs(40, [
    make_q("Remember", C, "Tres etapas de la Prehistoria:",["Antigua, Media, Moderna","Paleolítico, Neolítico, Edad de los Metales","Piedra, Bronce, Hierro","1, 2, 3"],1,"Paleolítico, Neolítico y Edad de los Metales."),
    make_q("Understand", C, "Primeras civilizaciones surgieron cerca de:",["Montañas","Grandes ríos (Nilo, Tigris, Indo)","Desiertos","Mares"],1,"Valles fluviales fértiles."),
    make_q("Apply", C, "Forma de gobierno creada en Grecia:",["Monarquía","Democracia","Teocracia","Imperio"],1,"Democracia ateniense."),
    make_q("Remember", C, "Primer emperador romano:",["Julio César","Augusto","Nerón","Constantino"],1,"Augusto, 27 a.C."),
    make_q("Understand", C, "Sistema medieval basado en feudos:",["Feudalismo","Capitalismo","Socialismo","Esclavismo"],0,"Feudalismo."),
    make_q("Analyze", C, "Evento que dividió la Edad Media de la Moderna:",["Revolución Francesa","Descubrimiento de América (1492) / Caída de Constantinopla (1453)","Primera Guerra Mundial","Reforma"],1,"Transición a la Edad Moderna."),
    make_q("Remember", C, "Año del Descubrimiento de América:",["1492","1500","1519","1521"],0,"12 de octubre de 1492."),
    make_q("Apply", C, "Elementos de un mapa: escala, leyenda, rosa vientos. Para qué sirven?",["Decorar","Interpretar y orientarse en el mapa","Navegar","Calcular tiempo"],1,"Lectura cartográfica."),
    make_q("Evaluate", C, "Diferencia entre coordenadas y husos horarios:",["Son iguales","Coordenadas: ubicación. Husos: hora.","Coordenadas: hora. Husos: ubicación","No se relacionan"],1,"Ambos sistemas geográficos."),
    make_q("Understand", C, "Sectores económicos en Colombia:",["Solo uno","Primario (agricultura), secundario (industria), terciario (servicios)","Solo terciario","Solo primario"],1,"Economía diversificada."),
])

print("Part 4 complete: W32-W40")
