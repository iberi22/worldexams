# Part 3b: W26-W31 (Geografía, Repaso P5, Repaso P6)
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

# W26: Repaso P5 (Edad Moderna)
save_qs(26, [
    make_q("Remember", C, "Año del Descubrimiento de América:",["1492","1500","1519","1521"],0,"12 de octubre de 1492."),
    make_q("Understand", C, "Qué fue el Humanismo?",["Arte","Movimiento intelectual centrado en el ser humano","Religión","Política"],1,"Valoraba la razón."),
    make_q("Apply", C, "Invento que revolucionó el conocimiento:",["Imprenta","Teléfono","Radio","Internet"],0,"Gutenberg, 1440."),
    make_q("Remember", C, "Quién inició la Reforma?",["Calvino","Lutero","Enrique VIII","Zwinglio"],1,"95 tesis, 1517."),
    make_q("Understand", C, "La Contrarreforma proponía:",["Nueva religión","Reforma interna católica (Concilio de Trento)","Guerra","División"],1,"Respuesta católica."),
    make_q("Analyze", C, "Por qué conquistaron América?",["Número superior","Armas, caballos, alianzas, enfermedades","Magia","Dioses"],1,"Ventajas tecnológicas y biológicas."),
    make_q("Remember", C, "Conquistador del Imperio Azteca:",["Pizarro","Cortés","Quesada","Balboa"],1,"Cortés, 1521."),
    make_q("Apply", C, "Consecuencia del intercambio colombino:",["Aislamiento","Intercambio global de cultivos y animales","Sin cambios","Solo guerras"],1,"Transformó agricultura mundial."),
    make_q("Evaluate", C, "Legado del Renacimiento:",["Religión","Método científico, arte clásico y racionalismo","Feudalismo","Monarquía"],1,"Bases de la ciencia moderna."),
    make_q("Understand", C, "Tratado de Tordesillas:",["Tratado de paz","División del mundo España/Portugal (1494)","Acuerdo comercial","Religioso"],1,"Repartió rutas de exploración."),
])

# W27: La Tierra en el Sistema Solar
save_qs(27, [
    make_q("Remember", C, "Planetas del Sistema Solar:",["7","8","9","10"],1,"Mercurio a Neptuno (8 planetas)."),
    make_q("Remember", C, "Movimiento que causa día/noche:",["Traslación","Rotación","Precesión","Nutación"],1,"Rotación (~24h)."),
    make_q("Understand", C, "Movimiento que causa estaciones:",["Rotación","Traslación e inclinación del eje (23.5°)","Precesión","Levitación"],1,"Traslación 365 días."),
    make_q("Apply", C, "Por qué Colombia no tiene estaciones marcadas?",["Hemisferio norte","Cerca del ecuador, poca variación solar","País pequeño","Sin montañas"],1,"Ubicación ecuatorial."),
    make_q("Understand", C, "Qué es el Sol?",["Planeta","Estrella G2V que da energía a la Tierra","Satélite","Asteroide"],1,"Estrella."),
    make_q("Analyze", C, "Por qué la Tierra es habitable?",["Tamaño","Atmósfera, agua líquida, distancia adecuada al Sol","Color","Velocidad"],1,"Zona habitable."),
    make_q("Remember", C, "Satélite natural de la Tierra:",["Luna","Marte","Venus","Sol"],0,"~384,000 km."),
    make_q("Apply", C, "Cómo afecta la Luna a la Tierra?",["Clima","Mareas por gravedad lunar","Temperatura","Viento"],1,"Atracción gravitacional."),
    make_q("Evaluate", C, "Importancia de estudiar el Sistema Solar:",["Solo astronomía","Entender origen de la Tierra y buscar vida","Turismo","Comercio"],1,"Comprender nuestro lugar."),
    make_q("Understand", C, "Qué son los eclipses?",["Meteorológico","Ocultación de un astro por otro","Terremoto","Aurora"],1,"Solar: Luna entre Sol y Tierra."),
])

# W28: Mapas - Tipos y Elementos
save_qs(28, [
    make_q("Remember", C, "Qué es un mapa?",["Foto satelital","Representación reducida de la superficie terrestre","Dibujo","Texto"],1,"Representación a escala."),
    make_q("Remember", C, "Elementos esenciales de un mapa:",["Colores","Título, escala, leyenda, rosa vientos, coordenadas","Decoración","Fotos"],1,"Elementos cartográficos."),
    make_q("Understand", C, "Qué es la escala de un mapa?",["El tamaño","Relación distancia mapa / distancia real","El color","La forma"],1,"Numérica (1:100,000) o gráfica."),
    make_q("Apply", C, "Escala 1:100,000: 1 cm en mapa = ?",["1 m","1 km","100 m","10 km"],1,"1 cm = 100,000 cm = 1 km."),
    make_q("Understand", C, "Tipos de mapa según contenido:",["Grandes/pequeños","Físicos, políticos, temáticos","Bonitos/feos","Modernos/antiguos"],1,"Cada tipo muestra info."),
    make_q("Analyze", C, "Para qué sirve la rosa de los vientos?",["Decoración","Indicar puntos cardinales","Calcular distancias","Medir altura"],1,"Orientación del mapa."),
    make_q("Remember", C, "Qué es la leyenda del mapa?",["Historia","Explicación de símbolos y colores","Título","Cartógrafo"],1,"Interpretar información."),
    make_q("Apply", C, "Para buscar montañas, qué mapa usas?",["Político","Físico o de relieve","Temático","Urbano"],1,"Mapas físicos."),
    make_q("Evaluate", C, "Mapa de 1500 vs satelital actual:",["Iguales","Impreciso a mano vs preciso digital","Antiguo mejor","Actual peor"],1,"Cartografía evolucionó."),
    make_q("Understand", C, "Proyección cartográfica:",["Dibujo","Representar esfera en plano (Mercator, Peters)","Escala","Leyenda"],1,"Toda distorsiona algo."),
])

# W29: Coordenadas Geográficas
save_qs(29, [
    make_q("Remember", C, "Qué son coordenadas geográficas?",["Números","Líneas imaginarias (latitud y longitud) para ubicar puntos","Direcciones","Alturas"],1,"Localización absoluta."),
    make_q("Remember", C, "Qué es la latitud?",["Distancia este","Distancia angular desde ecuador (N o S)","Altura","Tiempo"],1,"0° en Ecuador."),
    make_q("Understand", C, "Qué es la longitud?",["Distancia norte","Distancia angular desde Greenwich (E u O)","Altura","Radio"],1,"0° en Greenwich."),
    make_q("Apply", C, "Bogotá a 4° N significa que está:",["Hemisferio sur","Norte del ecuador","En ecuador","En polo"],1,"4° latitud norte."),
    make_q("Understand", C, "Para qué sirven los paralelos?",["Medir longitud","Líneas de latitud paralelas al Ecuador","Medir tiempo","Orientación"],1,"Ecuador, trópicos, polares."),
    make_q("Analyze", C, "Por qué Colombia tiene pisos térmicos?",["País pequeño","Latitud ecuatorial + altitud diversa","Mar","Vientos"],1,"Variedad climática."),
    make_q("Remember", C, "Meridiano principal:",["Bogotá","Greenwich (0°)","Ecuador","Trópico"],1,"Greenwich, Londres."),
    make_q("Apply", C, "Bogotá (74° O) vs Londres (0°): quién está más al oeste?",["Londres","Bogotá","Iguales","Ambos"],1,"74° al oeste de Greenwich."),
    make_q("Evaluate", C, "Importancia de coordenadas:",["Ninguna","Ubicar cualquier punto con precisión","Solo navegación","Anticuado"],1,"GPS y cartografía."),
    make_q("Understand", C, "Líneas que dividen hemisferios:",["Paralelos","Ecuador (N/S) y Greenwich (E/O)","Meridianos","Trópicos"],1,"Ecuador y Greenwich."),
])

# W30: Husos Horarios
save_qs(30, [
    make_q("Remember", C, "Qué son husos horarios?",["Zonas climáticas","Franjas de 15° para misma hora","Países","Continentes"],1,"24 husos."),
    make_q("Remember", C, "Cuántos husos horarios hay?",["12","24","36","48"],1,"24 husos, uno por hora."),
    make_q("Understand", C, "Por qué se crearon?",["Capricho","Estandarizar hora para ferrocarriles (1884)","Religión","Astronomía"],1,"Cada ciudad tenía su hora."),
    make_q("Apply", C, "Colombia UTC-5. Si 12:00 en Bogotá, hora en Greenwich?",["7 a.m.","5 p.m.","12 p.m.","5 a.m."],1,"Londres = 17:00."),
    make_q("Understand", C, "Línea Internacional de Cambio de Fecha:",["Frontera","Línea en Pacífico (180°), cambia fecha","Ecuador","Trópico"],1,"Al este, resta un día."),
    make_q("Analyze", C, "Por qué Colombia no cambia hora estacional?",["No quiere","Cerca del ecuador, duración día constante","Por ley","Por Estados Unidos"],1,"Variación solar mínima."),
    make_q("Remember", C, "Siglas UTC significan:",["Universal Time Central","Tiempo Universal Coordinado","United Time Code","Universal Clock"],1,"Base del tiempo mundial."),
    make_q("Apply", C, "Si en Greenwich son 0:00, qué hora es en Colombia?",["5 a.m.","7 p.m.","7 a.m.","5 p.m."],1,"UTC-5 = 19:00 del día anterior."),
    make_q("Evaluate", C, "Importancia de los husos horarios:",["Ninguna","Coordinación global de viajes y comunicaciones","Solo barcos","Solo aviones"],1,"Organizan el tiempo mundial."),
    make_q("Understand", C, "Qué relación hay entre huso y longitud?",["Ninguna","15° de longitud = 1 hora de diferencia","30° = 1 hora","90° = 1 hora"],1,"360°/24h = 15°/hora."),
])

# W31: Repaso P6 (Geografía Física)
save_qs(31, [
    make_q("Remember", C, "Planetas del Sistema Solar:",["7","8","9","10"],1,"Mercurio a Neptuno."),
    make_q("Understand", C, "Elementos de un mapa:",["Colores","Escala, leyenda, rosa vientos, coordenadas","Dibujo","Nombres"],1,"Elementos cartográficos."),
    make_q("Apply", C, "Para qué sirve la latitud?",["Medir altura","Distancia N/S del Ecuador","Medir este/oeste","Medir tiempo"],1,"Localización N/S."),
    make_q("Remember", C, "Meridiano 0°:",["Ecuador","Greenwich","Trópico","Círculo polar"],1,"Greenwich, Londres."),
    make_q("Understand", C, "Cuántos husos horarios hay?",["12","24","36","48"],1,"24 husos."),
    make_q("Analyze", C, "Por qué la Tierra tiene estaciones?",["Rotación","Traslación e inclinación del eje","Luna","Sol"],1,"Eje inclinado 23.5°."),
    make_q("Remember", C, "Qué movimiento causa día/noche?",["Traslación","Rotación","Precesión","Nutación"],1,"Rotación 24h."),
    make_q("Apply", C, "Si Colombia está en UTC-5, qué significa?",["5 horas antes que Greenwich","5 horas después","Misma hora","No aplica"],0,"UTC-5 = 5 horas detrás de UTC."),
    make_q("Evaluate", C, "Importancia de coordenadas geográficas:",["Ninguna","GPS, navegación, cartografía","Solo historia","Solo escuelas"],1,"Localización precisa."),
    make_q("Understand", C, "Qué son los paralelos?",["Líneas N-S","Líneas E-W paralelas al Ecuador","Meridianos","Husos"],1,"Ecuador, trópicos, polares."),
])

print("Part 3b complete: W26-W31")
