# Part 3a: W20-W25 (Edad Media comercio, Edad Moderna)
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

# W20: Repaso P3 (Edad Media)
save_qs(20, [
    make_q("Remember", C, "Año de la caída del Imperio Romano de Occidente:",["313","476","1492","27 a.C."],1,"476 d.C. - último emperador depuesto."),
    make_q("Understand", C, "Qué fue el Imperio Bizantino?",["Imperio en América","Continuación del Imperio Romano en Oriente","Reino germánico","Egipto"],1,"Capital Constantinopla, preservó cultura grecorromana."),
    make_q("Apply", C, "En qué consiste el feudalismo?",["Democracia","Relaciones de dependencia: señor da tierra, vasallo servicio","Monarquía absoluta","Esclavitud"],1,"Basado en feudos y vasallaje."),
    make_q("Remember", C, "Estilos arquitectónicos medievales:",["Dórico y jónico","Románico y gótico","Barroco y rococó","Moderno"],1,"Románico (medio punto) y gótico (ojival)."),
    make_q("Understand", C, "Papel de los monasterios medievales:",["Solo oración","Preservación del conocimiento, copia de manuscritos","Guerra","Comercio"],1,"Preservaron textos clásicos."),
    make_q("Analyze", C, "Por qué resurgieron las ciudades en la Baja Edad Media?",["Guerras","Aumento del comercio y rutas comerciales","Peste","Invasiones"],1,"El comercio generó centros urbanos."),
    make_q("Remember", C, "Qué era la burguesía?",["Nobleza","Comerciantes y artesanos urbanos","Clero","Campesinos"],1,"Surgió con el renacimiento urbano."),
    make_q("Apply", C, "Si eras aprendiz en un gremio, quién te enseñaba?",["El rey","Un maestro del oficio","La Iglesia","Nadie"],1,"Sistema: aprendiz, oficial, maestro."),
    make_q("Evaluate", C, "Cambio más significativo de la Baja Edad Media:",["Caída del imperio","Auge comercial, burguesía y crisis del feudalismo","Invención rueda","Pirámides"],1,"El comercio transformó la sociedad medieval."),
    make_q("Understand", C, "Qué religión surgió en Arabia s. VII?",["Cristianismo","Islam","Budismo","Judaísmo"],1,"Fundado por Mahoma en La Meca."),
])

# W21: Repaso P4 (Edad Media continuación)
save_qs(21, [
    make_q("Remember", C, "Qué eran los gremios?",["Sindicatos modernos","Asociaciones de artesanos de un mismo oficio","Ejércitos","Cofradías"],1,"Regulaban producción y calidad."),
    make_q("Understand", C, "Organización del trabajo gremial:",["Todos igual","Maestro, oficial, aprendiz en jerarquía","Esclavitud","Fábricas"],1,"Sistema escalonado de aprendizaje."),
    make_q("Apply", C, "Por qué las Cruzadas afectaron el comercio?",["No lo afectaron","Trajeron productos orientales y reactivaron rutas","Destruyeron comercio","Aislaron Europa"],1,"Conectaron Europa con Oriente."),
    make_q("Remember", C, "Rey franco coronado emperador en el 800:",["Justiniano","Carlomagno","Ciro","Alejandro"],1,"Carlomagno unificó Europa Occidental."),
    make_q("Understand", C, "Qué caracteriza la escultura románica?",["Naturalista","Esquemática y didáctica (enseñaba a iletrados)","Abstracta","Realista"],1,"Arte para enseñanza religiosa."),
    make_q("Analyze", C, "Por qué la Iglesia dominó la cultura medieval?",["Solo religión","Única institución con recursos y educación","Militar","Comercial"],1,"Monopolio educativo y cultural."),
    make_q("Remember", C, "Qué eran las letras de cambio?",["Nueva moneda","Instrumento financiero para comercio seguro","Código legal","Contrato"],1,"Comercio sin transportar monedas."),
    make_q("Apply", C, "El arte gótico se caracteriza por:",["Columnas gruesas","Vitrales, arcos ojivales y bóvedas de crucería","Pocas ventanas","Muros macizos"],1,"Buscaba luz y verticalidad."),
    make_q("Evaluate", C, "Legado cultural de la Edad Media:",["Ninguno","Universidades, vitrales y derecho","Solo guerras","Solo religión"],1,"Creó las primeras universidades."),
    make_q("Understand", C, "Consecuencia de la Peste Negra (1347)?",["Crecimiento","Reducción de población debilitó el feudalismo","Unificación","Industrialización"],1,"Escasez de mano de obra fortaleció a campesinos."),
])

# W22: Edad Moderna - Renacimiento
save_qs(22, [
    make_q("Remember", C, "Movimiento cultural que inició la Edad Moderna:",["Barroco","Renacimiento","Romanticismo","Clasicismo"],1,"Redescubrimiento de la cultura clásica."),
    make_q("Remember", C, "Qué era el Humanismo?",["Arte","Movimiento intelectual que puso al ser humano en el centro","Doctrina religiosa","Sistema político"],1,"Valoraba razón, ciencia y potencial humano."),
    make_q("Understand", C, "Invención que revolucionó el conocimiento:",["Teléfono","Imprenta (Gutenberg, 1440)","Radio","Internet"],1,"Permitió producir libros masivamente."),
    make_q("Apply", C, "Pintor renacentista de La Mona Lisa:",["Miguel Ángel","Leonardo da Vinci","Rafael","Donatello"],1,"Leonardo, polímata del Renacimiento."),
    make_q("Understand", C, "Cambio en las ciencias en el Renacimiento:",["No cambiaron","Observación y experimentación científicas","Solo religión","Magia"],1,"Método científico empezó a desarrollarse."),
    make_q("Analyze", C, "Por qué Italia fue cuna del Renacimiento?",["Invasiones","Riqueza comercial, mecenazgo y vestigios romanos","Revolución","Clima"],1,"Florencia acumuló riqueza para financiar arte."),
    make_q("Remember", C, "Astrónomo del modelo heliocéntrico:",["Aristóteles","Copérnico","Pitágoras","Hipócrates"],1,"Copérnico (1543)."),
    make_q("Apply", C, "La Capilla Sixtina fue pintada por:",["Leonardo","Miguel Ángel","Rafael","Botticelli"],1,"Miguel Ángel pintó el techo."),
    make_q("Evaluate", C, "Visión medieval vs renacentista:",["Medieval: teocéntrica. Renacentista: antropocéntrica","Iguales","Inversa","Ambas científicas"],0,"El Renacimiento puso al humano en el centro."),
    make_q("Understand", C, "Qué significa la palabra Renacimiento?",["Nuevo imperio","Renacer de la cultura clásica","Reinicio de guerras","Nueva religión"],1,"Redescubrimiento de la antigüedad clásica."),
])

# W23: Edad Moderna - Descubrimiento de América
save_qs(23, [
    make_q("Remember", C, "Año de llegada de Colón a América:",["1492","1500","1519","1521"],0,"12 de octubre de 1492."),
    make_q("Remember", C, "Monarcas que financiaron a Colón:",["Carlos V e Isabel","Isabel de Castilla y Fernando de Aragón","Felipe II y María","Enrique VIII y Catalina"],1,"Los Reyes Católicos."),
    make_q("Understand", C, "Por qué Colón buscaba ruta a Asia?",["Curiosidad","Comercio de especias sin pasar por Medio Oriente","Guerra","Turismo"],1,"Buscaba ruta directa a las riquezas de Asia."),
    make_q("Apply", C, "Avances que permitieron navegación oceánica:",["GPS","Brújula, astrolabio, carabelas","Submarinos","Motores"],1,"Carabelas, brújula y astrolabio."),
    make_q("Understand", C, "Qué fue el Tratado de Tordesillas (1494)?",["Tratado de paz","División del mundo entre España y Portugal","Acuerdo comercial","Tratado religioso"],1,"Repartió rutas de exploración."),
    make_q("Analyze", C, "Por qué Colón creyó haber llegado a Asia?",["Mentía","Subestimó la circunferencia terrestre","Era un plan","Por indígenas"],1,"Calculó mal el tamaño de la Tierra."),
    make_q("Remember", C, "Navegante portugués que llegó a la India en 1498:",["Colón","Vasco da Gama","Magallanes","Vespucio"],1,"Doblando el Cabo de Buena Esperanza."),
    make_q("Apply", C, "Las tres carabelas de Colón:",["Santa María, Pinta y Niña","Victoria, Trinidad, Santiago","Mayflower, Endurance, Beagle","San José, San Felipe, Santiago"],0,"La Santa María era la nave capitana."),
    make_q("Evaluate", C, "Impacto del Descubrimiento de América:",["Solo en Europa","Intercambio biológico, cultural y económico global","Solo en América","Sin impacto"],1,"Intercambio Colombino cambió el mundo."),
    make_q("Understand", C, "Qué fue el Intercambio Colombino?",["Solo comercio","Intercambio de cultivos, animales y culturas entre América y Europa","Tratado","Migración"],1,"Transformó agricultura y demografía."),
])

# W24: Edad Moderna - Conquista y Colonización
save_qs(24, [
    make_q("Remember", C, "Quién conquistó el Imperio Azteca?",["Pizarro","Hernán Cortés","Quesada","Magallanes"],1,"Cortés, 1521."),
    make_q("Remember", C, "Quién conquistó el Imperio Inca?",["Cortés","Francisco Pizarro","Balboa","De Soto"],1,"Pizarro capturó Atahualpa (1532)."),
    make_q("Understand", C, "Qué eran los Virreinatos?",["Reinos independientes","Divisiones administrativas del Imperio Español","Colonias inglesas","Ciudades libres"],1,"Nueva España, Perú, Nueva Granada y Río de la Plata."),
    make_q("Apply", C, "Qué era la encomienda?",["Castillo","Sistema: indígenas encomendados a españoles por evangelización","Escuela","Mercado"],1,"Sistema laboral colonial."),
    make_q("Understand", C, "Cómo afectó la conquista a indígenas?",["Crecieron","Reducción drástica por guerras, enfermedades y explotación","Sin cambio","Migraron a Europa"],1,"Pérdida masiva de vidas y culturas."),
    make_q("Analyze", C, "Por qué vencieron los españoles?",["Número superior","Armas de fuego, caballos y alianzas indígenas","Magia","Navegación"],1,"Factores militares, biológicos y diplomáticos."),
    make_q("Remember", C, "Fundación de Bogotá:",["1536","1538","1550","1492"],1,"Gonzalo Jiménez de Quesada, 1538."),
    make_q("Apply", C, "El mestizaje significó:",["Separación","Mezcla biológica y cultural entre españoles, indígenas y africanos","Exterminio","Migración"],1,"Creó identidad latinoamericana."),
    make_q("Evaluate", C, "Legado de la colonización española:",["Solo destrucción","Idioma, religión, instituciones y mestizaje","Nada","Solo explotación"],1,"Legó lengua e instituciones."),
    make_q("Understand", C, "Qué eran las misiones religiosas?",["Fortalezas","Centros de evangelización de indígenas","Escuelas","Mercados"],1,"Franciscanos y jesuitas evangelizaban."),
])

# W25: Edad Moderna - Reforma y Contrarreforma
save_qs(25, [
    make_q("Remember", C, "Quién inició la Reforma Protestante?",["Calvino","Martín Lutero","Enrique VIII","Zwinglio"],1,"95 tesis, 1517."),
    make_q("Remember", C, "Qué fueron las 95 tesis?",["Tratado de paz","Críticas a indulgencias y doctrinas católicas","Nuevas leyes","Código penal"],1,"Lutero cuestionó la autoridad papal."),
    make_q("Understand", C, "Doctrina de Lutero:",["Solo obras","Salvación por fe (sola fide), Biblia como autoridad (sola scriptura)","Muchos dioses","Rey divino"],1,"Rechazó autoridad papal."),
    make_q("Apply", C, "Qué fue la Contrarreforma?",["Guerra","Respuesta católica: Concilio de Trento (1545-1563)","Nueva religión","Revolución"],1,"Reafirmó doctrinas y reformó abusos."),
    make_q("Understand", C, "Orden religiosa de la Contrarreforma:",["Franciscanos","Jesuitas (Compañía de Jesús)","Dominicos","Agustinos"],1,"Ignacio de Loyola, enfocada en educación."),
    make_q("Analyze", C, "Por qué la Reforma dividió a Europa?",["Cultura","Cuestionó autoridad papal, creó iglesias protestantes","Comercio","Idiomas"],1,"Protestantismo en norte de Europa."),
    make_q("Remember", C, "Rey inglés que creó la Iglesia Anglicana:",["Felipe II","Enrique VIII","Carlos I","Eduardo VI"],1,"Por su divorcio."),
    make_q("Apply", C, "Consecuencias de la Reforma en América:",["Ninguna","España impuso catolicismo en colonias","Protestantismo mayoritario","Sin religión"],1,"Catolicismo se arraigó en América Latina."),
    make_q("Evaluate", C, "Cambio más importante de la Reforma:",["Nueva religión","Fractura de unidad religiosa europea y auge del individualismo","Guerras","Comercio"],1,"Rompió mil años de unidad cristiana."),
    make_q("Understand", C, "Qué proponía Calvino?",["Anarquía","Predestinación, trabajo como señal de salvación","Monarquía","Ateísmo"],1,"Influyó en ética del trabajo capitalista."),
])

print("Part 3a complete: W20-W25")
