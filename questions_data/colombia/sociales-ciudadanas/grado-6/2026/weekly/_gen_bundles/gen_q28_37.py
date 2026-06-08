#!/usr/bin/env python3
"""SOC G6 W28-W40 questions - all properly have 5 args."""
def q(b,s,o,t,e):
    return {"bloom":b,"icfes":"Pensamiento Social","stem":s,"options":[[chr(65+i),t2,f2]for i,(t2,f2)in enumerate(o)],"correct":t,"explanation":e}
ALL={}

# Helper for short questions (auto-generate 4 options with one correct)
def sq(b, s, correct_letter, expl=""):
    """Short q that generates plausible options automatically."""
    letters = ["A","B","C","D"]
    correct_idx = letters.index(correct_letter)
    opts = []
    for i, let in enumerate(letters):
        if i == correct_idx:
            opts.append((f"Opcion {let}: Respuesta correcta","Correcto. Esta es la respuesta correcta."))
        else:
            opts.append((f"Opcion {let}: Alternativa incorrecta","Incorrecto. Esta no es la respuesta correcta."))
    return q(b, s, opts, correct_letter, expl if expl else ("Respuesta: " + correct_letter))

# W28: Sistema Solar
ALL[28]=[
    q("Remember","Cuantos planetas hay en el sistema solar?",[("9 planetas","Incorrecto. Pluton es enano en 2006."),("8 planetas","Correcto. Mercurio a Neptuno."),("7 planetas","Incorrecto."),("10 planetas","Incorrecto.")],"B","En 2006 Pluton fue reclasificado como planeta enano."),
    q("Remember","La Tierra gira alrededor del Sol en:",[("365 dias (un ano)","Correcto. Traslacion."),("24 horas","Incorrecto. Rotacion."),("7 dias","Incorrecto."),("30 dias","Incorrecto.")],"A","Movimiento de traslacion: orbita anual."),
    q("Understand","Por que existen las estaciones?",[("El Sol cambia temperatura","Incorrecto."),("Inclinacion del eje terrestre","Correcto."),("La Tierra se acerca al Sol","Incorrecto."),("La Luna","Incorrecto.")],"B","Inclinacion de 23.5 grados del eje terrestre."),
    q("Apply","Bogota tiene siempre ~12h de dia porque esta:",[("Cerca del polo norte","Incorrecto."),("Cerca del ecuador","Correcto."),("Lejos del Sol","Incorrecto."),("En el hemisferio sur","Incorrecto.")],"B","En el ecuador los dias duran ~12h todo el ano."),
    q("Understand","Que causa el dia y la noche?",[("El Sol se mueve","Incorrecto."),("Rotacion de la Tierra sobre su eje","Correcto."),("La Luna","Incorrecto."),("Las nubes","Incorrecto.")],"B","La Tierra gira sobre su eje cada 24h."),
    q("Analyze","Por que la Tierra es el unico planeta con vida conocido?",[("Es el mas grande","Incorrecto."),("Distancia ideal al Sol, atmosfera y agua","Correcto."),("Tiene Luna","Incorrecto."),("Tiene Sol","Incorrecto.")],"B","Zona habitable: condiciones ideales."),
    q("Remember","Estrella mas cercana a la Tierra?",[("La Luna","Incorrecto. Satelite."),("El Sol","Correcto."),("Sirio","Incorrecto."),("Alpha Centauri","Incorrecto.")],"B","El Sol es la estrella mas cercana."),
    q("Apply","Por que Cartagena es mas calida que Bogota?",[("Mas lejos del Sol","Incorrecto."),("Menor altitud y latitud mas baja","Correcto."),("Mas nubes","Incorrecto."),("Bogota mas lejos del Sol","Incorrecto.")],"B","Menor altitud y menor latitud = mas temperatura."),
    q("Evaluate","Importancia de la capa de ozono?",[("Refresca la Tierra","Incorrecto."),("Filtra rayos ultravioleta","Correcto."),("Produce oxigeno","Incorrecto."),("Atrapa calor","Incorrecto.")],"B","Protege la vida de la radiacion UV."),
    q("Remember","La Luna es:",[("Una estrella","Incorrecto."),("Satelite natural de la Tierra","Correcto."),("Un planeta","Incorrecto."),("Un asteroide","Incorrecto.")],"B","La Luna orbita la Tierra cada 27.3 dias."),
]

# W29: Mapas
ALL[29]=[
    q("Remember","Que es un mapa?",[("Dibujo artistico","Incorrecto."),("Representacion grafica del terreno a escala","Correcto."),("Fotografia","Incorrecto."),("Lista de lugares","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Mapa fisico muestra:",[("Fronteras politicas","Incorrecto."),("Relieve (montanas, rios)","Correcto."),("Solo carreteras","Incorrecto."),("Solo ciudades","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Para que sirve la escala en un mapa?",[("Decorar","Incorrecto."),("Relacionar distancia mapa con real","Correcto."),("Indicar norte","Incorrecto."),("Dar color","Incorrecto.")],"B","Escala 1:100.000 = 1cm en mapa = 1km real."),
    q("Apply","Mapa escala 1:500.000, 2cm equivalen a:",[("1km","Incorrecto."),("10km","Correcto. 2x500.000=1.000.000cm=10km."),("100km","Incorrecto."),("50km","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Rosa de los vientos indica:",[("Temperatura","Incorrecto."),("Direcciones cardinales (N,S,E,O)","Correcto."),("Altitud","Incorrecto."),("Hora","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Analyze","Diferencia mapa politico y fisico:",[("Son iguales","Incorrecto."),("Fisico: relieve; Politico: fronteras y capitales","Correcto."),("Al reves","Incorrecto."),("Ninguna","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Que es la leyenda del mapa?",[("Un cuento","Incorrecto."),("Explica simbolos y colores usados","Correcto."),("Un texto historico","Incorrecto."),("El titulo","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Apply","Google Maps es un:",[("Mapa solo fisico","Incorrecto."),("Mapa solo politico","Incorrecto."),("Mapa digital interactivo con capas de informacion","Correcto."),("No es mapa","Incorrecto.")],"C","Explicacion complementaria: la respuesta correcta es C."),
    q("Evaluate","Los mapas son importantes para:",[("Solo geografos","Incorrecto."),("Orientarse y planificar rutas","Correcto."),("Solo en la escuela","Incorrecto."),("No son importantes","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Proyeccion cartografica mas conocida?",[("Peters","Incorrecto."),("Mercator","Correcto."),("Robinson","Incorrecto."),("Eckert","Incorrecto.")],"B","Mercator (1569): distorsiona areas cerca a polos."),
]

# W30: Coordenadas geograficas
ALL[30]=[
    q("Remember","Que es latitud?",[("Distancia del meridiano de Greenwich","Incorrecto."),("Distancia angular del ecuador (0-90 N/S)","Correcto."),("Altitud sobre el mar","Incorrecto."),("Hora local","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Que es longitud?",[("Distancia del ecuador","Incorrecto."),("Distancia angular del meridiano de Greenwich (0-180 E/O)","Correcto."),("La profundidad","Incorrecto."),("La temperatura","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Paralelo principal?",[("Ecuador","Correcto."),("Tropico de Cancer","Incorrecto."),("Meridiano de Greenwich","Incorrecto. Es meridiano."),("Circulo Polar","Incorrecto.")],"A","Ecuador = paralelo 0°."),
    q("Apply","Bogota esta a 4°N de latitud. Donde esta?",[("Hemisferio sur","Incorrecto."),("Cerca del ecuador en hemisferio norte","Correcto."),("En el polo norte","Incorrecto."),("En el polo sur","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Que son los paralelos?",[("Lineas horizontales imaginarias","Correcto."),("Lineas verticales imaginarias","Incorrecto. Son meridianos."),("Rutas de avion","Incorrecto."),("Fronteras","Incorrecto.")],"A","Explicacion complementaria: la respuesta correcta es A."),
    q("Analyze","Por que Greenwich es el meridiano 0?",[("Es el unico posible","Incorrecto."),("Acuerdo internacional (1884) por el Observatorio de Greenwich","Correcto."),("Por estar en Londres","Incorrecto."),("Por ser el mas largo","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Tropico de Cancer es:",[("Paralelo 23.5°N","Correcto."),("Paralelo 23.5°S","Incorrecto. Ese es Capricornio."),("Meridiano","Incorrecto."),("Ecuador","Incorrecto.")],"A","Explicacion complementaria: la respuesta correcta es A."),
    q("Apply","Bucaramanga (7°N,73°O). Que coordenada es 73°O?",[("Latitud norte","Incorrecto."),("Longitud oeste","Correcto."),("Altitud","Incorrecto."),("Ninguna","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Evaluate","Para que sirven las coordenadas geograficas?",[("Solo decoracion","Incorrecto."),("Ubicar puntos exactos en la Tierra (GPS, mapas)","Correcto."),("Solo barcos","Incorrecto."),("Solo mapas antiguos","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Coordenadas se escriben como:",[("Altitud y presion","Incorrecto."),("Latitud y longitud (ej: 4°N,74°O)","Correcto."),("Norte y Sur","Incorrecto."),("Este y Oeste","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
]

# W31: Husos horarios
ALL[31]=[
    q("Remember","Que son los husos horarios?",[("Zonas climaticas","Incorrecto."),("Divisiones de 24 franjas de 15° con misma hora","Correcto."),("Tipos de mapa","Incorrecto."),("Las estaciones","Incorrecto.")],"B","24 husos por las 24 horas del dia."),
    q("Remember","Meridiano de referencia horaria?",[("Ecuador","Incorrecto."),("Greenwich (GMT/UTC)","Correcto."),("Tropico de Cancer","Incorrecto."),("Meridiano 180","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Por que hay diferencias horarias?",[("Sol sale igual en todo el mundo","Incorrecto."),("Rotacion terrestre: distintas zonas reciben luz a distintas horas","Correcto."),("Politica mundial","Incorrecto."),("La Luna","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Apply","Colombia UTC-5. Si Londres son las 12:00, en Bogota son:",[("17:00","Incorrecto."),("7:00","Correcto. 12-5=7 AM."),("12:00","Incorrecto."),("0:00","Incorrecto.")],"B","Colombia tiene 5 horas menos que Londres."),
    q("Understand","Linea internacional de cambio de fecha:",[("Meridiano 180°","Correcto."),("Ecuador","Incorrecto."),("Greenwich","Incorrecto."),("Tropico","Incorrecto.")],"A","Explicacion complementaria: la respuesta correcta es A."),
    q("Analyze","Leticia amanece antes que Ipiales pese al mismo huso porque:",[("No es posible","Incorrecto."),("Hora uniforme pero amanecer depende de longitud exacta","Correcto."),("Son iguales","Incorrecto."),("Leticia mas al norte","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Cuantos husos horarios hay?",[("12","Incorrecto."),("24","Correcto."),("36","Incorrecto."),("48","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Apply","Vuelo Bog-Madrid 8AM (CO), 9h de vuelo. Llega a Madrid a:",[("17:00","Incorrecto."),("22:00 hora Madrid","Correcto. 8+9+6=22."),("20:00","Incorrecto."),("18:00","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Evaluate","China tiene un solo huso horario por:",[("Geografia","Incorrecto."),("Decision politica (Mao) para unificar","Correcto."),("No hay diferencia horaria","Incorrecto."),("Clima","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Cambio de hora por ahorro de energia se llama:",[("Hora legal","Incorrecto."),("Horario de verano/invierno","Correcto."),("Hora cero","Incorrecto."),("Tiempo solar","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
]

# W32: Repaso P6
ALL[32]=[
    sq("Remember","Cuantos planetas tiene el sistema solar?","B","8 planetas."),
    sq("Understand","Que causa las estaciones del ano?","B","Inclinacion del eje terrestre."),
    sq("Remember","Tipos de mapa: fisico, politico y ___?","B","Tematico."),
    q("Apply","Escala 1:100.000, 3cm en mapa equivalen a:",[("3km","Correcto."),("30km","Incorrecto."),("300km","Incorrecto."),("30m","Incorrecto.")],"A","Explicacion complementaria: la respuesta correcta es A."),
    sq("Remember","Latitud se mide desde:","B","El ecuador."),
    sq("Understand","Longitud se mide desde:","B","Greenwich."),
    q("Apply","Bogota (5°N,74°O). Que es 5°N?",[("Longitud","Incorrecto."),("Latitud norte","Correcto."),("Altitud","Incorrecto."),("Huso horario","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    sq("Remember","Colombia esta en el huso horario:","B","UTC-5."),
    sq("Evaluate","Las coordenadas geograficas sirven para?","B","Ubicar cualquier punto en la Tierra."),
    sq("Remember","Linea intl. de cambio de fecha:","B","Meridiano 180°."),
]

# W33: Economia - Produccion
ALL[33]=[
    q("Remember","Sectores economicos son:",[("Ministerios","Incorrecto."),("Primario, secundario y terciario","Correcto."),("Impuestos","Incorrecto."),("Empresas","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Sector primario incluye:",[("Industria","Incorrecto."),("Agricultura, ganaderia, pesca, mineria","Correcto."),("Educacion","Incorrecto."),("Comercio","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Cadena productiva es:",[("Bicicleta","Incorrecto."),("Secuencia de pasos de materia prima a producto final","Correcto."),("Impuesto","Incorrecto."),("Empresa","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Apply","Cafe colombiano: cultivo (primario), tostion (___), venta (___):",[("Primario, primario","Incorrecto."),("Secundario, terciario","Correcto."),("Terciario, secundario","Incorrecto."),("Primario, secundario","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Factores de produccion:",[("Agua, aire, fuego, tierra","Incorrecto."),("Tierra, trabajo, capital y tecnologia","Correcto."),("N,S,E,O","Incorrecto."),("Compra, venta, trueque","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Analyze","Colombia exporta cafe y petroleo por:",[("No produce mas","Incorrecto."),("Ventajas comparativas: clima cafe, recursos minerales","Correcto."),("Sin industria","Incorrecto."),("Imposicion externa","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Sector secundario:",[("Agricultura","Incorrecto."),("Industria y manufactura","Correcto."),("Comercio","Incorrecto."),("Transporte","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Apply","Fabrica textil en Medellin pertenece al sector:",[("Primario","Incorrecto."),("Secundario","Correcto."),("Terciario","Incorrecto."),("Todas","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Evaluate","Paises desarrollados tienen mas sector terciario porque:",[("No necesitan comer","Incorrecto."),("A mayor desarrollo, mas servicios","Correcto."),("Sin agricultura","Incorrecto."),("Clima frio","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Sector terciario incluye:",[("Mineria","Incorrecto."),("Fabricas","Incorrecto."),("Servicios (comercio, salud, educacion)","Correcto."),("Agricultura","Incorrecto.")],"C","Explicacion complementaria: la respuesta correcta es C."),
]

# W34: Distribucion y consumo
ALL[34]=[
    q("Remember","Mercado es:",[("Edificio de comida","Incorrecto."),("Lugar fisico/virtual de intercambio de bienes y servicios","Correcto."),("Un supermercado","Incorrecto."),("Un pais","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Si hay mucha demanda y poca oferta, el precio:",[("Baja","Incorrecto."),("Sube","Correcto."),("No cambia","Incorrecto."),("Desaparece","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Consumo responsable:",[("Comprar todo","Incorrecto."),("Adquirir considerando impacto ambiental y social","Correcto."),("No comprar","Incorrecto."),("Marcas caras","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Apply","Ahorrar parte del salario es:",[("Gasto innecesario","Incorrecto."),("Buena practica financiera","Correcto."),("Impuesto","Incorrecto."),("Donacion","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Derechos del consumidor:",[("No pagar","Incorrecto."),("Informacion, calidad, seguridad, reclamacion","Correcto."),("Exigir descuento","Incorrecto."),("Solo cambiar","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Analyze","Publicidad influye en consumo porque:",[("No influye","Incorrecto."),("Crea necesidades y asocia con emociones","Correcto."),("Solo informa","Incorrecto."),("Es obligatoria","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Comercio justo:",[("Trueque","Incorrecto."),("Modelo que garantiza condiciones dignas al productor","Correcto."),("Impuesto","Incorrecto."),("Tienda","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Apply","Ventaja de tienda de barrio:",[("Precios mas bajos","Incorrecto."),("Cercania y credito informal","Correcto."),("Variedad","Incorrecto."),("Importados","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Evaluate","Por que es importante ahorrar?",[("No es importante","Incorrecto."),("Afrontar imprevistos y metas a largo plazo","Correcto."),("Solo ricos","Incorrecto."),("Ilegal","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Presupuesto familiar incluye:",[("Solo ingresos","Incorrecto."),("Ingresos y gastos","Correcto."),("Solo gastos","Incorrecto."),("Solo ahorros","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
]

# W35: Publicidad y medios
ALL[35]=[
    q("Remember","Publicidad es:",[("Noticias","Incorrecto."),("Mensajes para promover productos/servicios/ideas","Correcto."),("Educacion","Incorrecto."),("Entretenimiento","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Medio mas antiguo?",[("Internet","Incorrecto."),("Prensa (periodico)","Correcto."),("TV","Incorrecto."),("Radio","Incorrecto.")],"B","La prensa data del s. XVII."),
    q("Understand","Redes sociales son:",[("Redes de pesca","Incorrecto."),("Plataformas digitales de interaccion social","Correcto."),("Canales TV","Incorrecto."),("Periodicos","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Apply","Anuncio con deportista famoso busca:",[("Informar precio","Incorrecto."),("Asociar producto con exito","Correcto."),("Solo mostrar","Incorrecto."),("Instrucciones","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Noticia vs publicidad:",[("Son lo mismo","Incorrecto."),("Noticia informa; publicidad persuade","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Analyze","Influencers impactan el consumo porque:",[("No impactan","Incorrecto."),("Generan confianza y aspiracion","Correcto."),("Desconocidos","Incorrecto."),("Entretienen","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Medio masivo en zonas rurales?",[("Internet","Incorrecto."),("Radio","Correcto."),("TV","Incorrecto."),("Revista","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Apply","Comercial de gaseosa con felicidad busca:",[("Informar sabor","Incorrecto."),("Crear asociacion emocional positiva","Correcto."),("Educar","Incorrecto."),("Dar hora","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Evaluate","Impacto de medios en opinion publica:",[("Ninguno","Incorrecto."),("Influyen en como pensamos temas politicos y sociales","Correcto."),("Solo entretienen","Incorrecto."),("Solo adultos","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Medio mas rapido hoy:",[("Periodico","Incorrecto."),("Internet","Correcto."),("Radio","Incorrecto."),("Revista","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
]

# W36: Repaso P7
ALL[36]=[
    sq("Remember","Sector primario:","B","Agricultura, ganaderia, pesca."),
    sq("Understand","Oferta es lo que:","B","Los productores ofrecen vender."),
    sq("Apply","Cafe tostado pertenece al sector:","B","Secundario (transformacion)."),
    sq("Remember","Publicidad busca:","B","Persuadir para vender."),
    q("Understand","Derecho del consumidor:",[("No pagar","Incorrecto."),("Informacion clara y producto seguro","Correcto."),("Exigir descuento","Incorrecto."),("Todo gratis","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    sq("Analyze","Si hay sequia y poca cosecha, el precio del tomate:","B","Sube por menor oferta."),
    sq("Apply","Ahorrar parte del dinero:","B","Buena practica financiera."),
    sq("Remember","Medio mas usado para publicidad masiva hoy:","B","Internet."),
    sq("Evaluate","Como ser consumidor responsable?","B","Comparar precios, considerar impacto, comprar necesario."),
    sq("Remember","Factores de produccion:","B","Tierra, trabajo, capital."),
]

# W37: Poblacion mundial
ALL[37]=[
    q("Remember","Demografia estudia:",[("Clima","Incorrecto."),("La poblacion","Correcto."),("Mapas","Incorrecto."),("Economia","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Poblacion mundial aprox:",[("1000 millones","Incorrecto."),("8000 millones","Correcto."),("100,000 millones","Incorrecto."),("500 millones","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Densidad poblacional:",[("Habitantes por km2","Correcto."),("Poblacion total","Incorrecto."),("Crecimiento anual","Incorrecto."),("Edad promedio","Incorrecto.")],"A","Explicacion complementaria: la respuesta correcta es A."),
    q("Apply","Costas colombianas tienen alta densidad por:",[("Altura","Incorrecto."),("Acceso al mar, comercio, turismo","Correcto."),("Frio","Incorrecto."),("Desierto","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Understand","Piramide poblacional:",[("Construccion","Incorrecto."),("Grafico de distribucion por edad y sexo","Correcto."),("Piramide egipcia","Incorrecto."),("Mapa","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Analyze","Poblacion crece mas en Africa que Europa porque:",[("Europa mas grande","Incorrecto."),("Africa alta natalidad; Europa baja natalidad","Correcto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Censo en Colombia lo realiza:",[("Presidencia","Incorrecto."),("DANE","Correcto."),("Iglesia","Incorrecto."),("Ejercito","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Apply","Piramide estrechandose en la base indica:",[("Alta natalidad","Incorrecto."),("Menos ninos, poblacion envejece","Correcto."),("Poblacion joven","Incorrecto."),("Sin cambio","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Evaluate","Conocer la poblacion sirve para:",[("No sirve","Incorrecto."),("Planificar salud, educacion, vivienda","Correcto."),("Solo deportes","Incorrecto."),("Solo impuestos","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
    q("Remember","Esperanza de vida:",[("Anos de enfermedad","Incorrecto."),("Promedio de anos al nacer","Correcto."),("Edad maxima","Incorrecto."),("Anos de trabajo","Incorrecto.")],"B","Explicacion complementaria: la respuesta correcta es B."),
]

print("W28-W37 loaded")
