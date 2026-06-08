#!/usr/bin/env python3
"""Complete generator for SOC G3 W08-W40. Run with: python gen_all.py"""

import os

OUTDIR = os.path.dirname(os.path.abspath(__file__))

# ============================================================
# METADATA
# ============================================================
M = {}
M['W08'] = ('el-campo-y-la-ciudad','El Campo y la Ciudad','campo_ciudad, diferencias_urbano_rural, vida_campesina, vida_urbana, actividades_campo_ciudad','Este bundle cubre las diferencias entre el campo y la ciudad en Colombia.')
M['W09'] = ('actividades-economicas-campo','Actividades Economicas del Campo','actividades_economicas, campo, agricultura, ganaderia, pesca, economia_rural','Este bundle cubre las actividades economicas que se realizan en el campo colombiano.')
M['W10'] = ('servicios-publicos-comunidad','Servicios Publicos en Mi Comunidad','servicios_publicos, agua, energia_electrica, gas, acueducto, alcantarillado, comunidad','Este bundle cubre los servicios publicos en la comunidad colombiana.')
M['W11'] = ('deberes-ciudadanos-basicos','Deberes Ciudadanos Basicos','deberes_ciudadanos, constitucion, respeto_leyes, participacion_ciudadana, civismo','Este bundle cubre los deberes ciudadanos basicos en Colombia.')
M['W12'] = ('repaso-p2','Repaso Periodo 2','repaso_p2, campo_ciudad, actividades_economicas, servicios_publicos, deberes_ciudadanos','Repaso del segundo periodo que integra campo y ciudad, actividades economicas, servicios publicos y deberes ciudadanos.')
M['W13'] = ('derechos-del-nino-alimentacion-salud-educacion','Derechos del Nino: Alimentacion, Salud y Educacion','derechos_nino, alimentacion, salud, educacion, codigo_infancia','Este bundle cubre los derechos fundamentales de los ninos a la alimentacion, la salud y la educacion.')
M['W14'] = ('derechos-del-nino-proteccion-identidad-recreacion','Derechos del Nino: Proteccion, Identidad y Recreacion','derechos_nino, proteccion, identidad, recreacion, derecho_juego, familia','Este bundle cubre los derechos de proteccion, identidad y recreacion de los ninos.')
M['W15'] = ('normas-convivencia-aula','Normas de Convivencia en el Aula','normas_convivencia, aula, respeto, orden_clase, participacion, manual_convivencia','Este bundle cubre las normas de convivencia dentro del aula de clase colombiana.')
M['W16'] = ('normas-convivencia-comunidad','Normas de Convivencia en la Comunidad','normas_convivencia, comunidad, barrio, vecinos, espacios_publicos, civismo','Este bundle cubre las normas de convivencia en la comunidad colombiana.')
M['W17'] = ('repaso-p3','Repaso Periodo 3','repaso_p3, derechos_nino, normas_aula, normas_comunidad, convivencia','Repaso del tercer periodo que integra derechos del nino y normas de convivencia.')
M['W18'] = ('colombia-ubicacion-sudamerica','Colombia: Nombre y Ubicacion en Sudamerica','colombia, ubicacion_sudamerica, mapa, fronteras, geografia_colombia','Este bundle cubre la ubicacion de Colombia en Sudamerica y sus limites.')
M['W19'] = ('simbolos-patrios','Simbolos Patrios: Bandera, Escudo e Himno','simbolos_patrios, bandera_colombia, escudo_colombia, himno_nacional, identidad_nacional','Este bundle cubre los simbolos patrios de Colombia.')
M['W20'] = ('repaso-general-p1-p3','Repaso General Periodos 1-3','repaso_general, colegio, familia, barrio, campo_ciudad, derechos_nino, normas, simbolos_patrios','Repaso integral de los tres primeros periodos del ano escolar.')
M['W21'] = ('trabajo-oficios-comunidad','El Trabajo y los Oficios en Mi Comunidad','trabajo, oficios, comunidad, ocupaciones, trabajo_digno, economia_local','Este bundle cubre los oficios y trabajos en la comunidad colombiana.')
M['W22'] = ('profesiones-aporte-sociedad','Profesiones y su Aporte a la Sociedad','profesiones, aporte_social, medico, docente, ingeniero, enfermero, bomberos, policia','Este bundle cubre las profesiones y su aporte a la sociedad colombiana.')
M['W23'] = ('medios-transporte-terrestre','Medios de Transporte Terrestre','medios_transporte, terrestre, automovil, bus, bicicleta, moto, TransMilenio','Este bundle cubre los medios de transporte terrestre en Colombia.')
M['W24'] = ('medios-transporte-aereo-acuatico','Medios de Transporte Aereo y Acuatico','medios_transporte, aereo, avion, helicoptero, acuatico, barco, lancha, transporte_fluvial','Este bundle cubre los medios de transporte aereo y acuatico.')
M['W25'] = ('repaso-p4','Repaso Periodo 4','repaso_p4, oficios, profesiones, transporte_terrestre, transporte_aereo, transporte_acuatico','Repaso del cuarto periodo: oficios, profesiones y transportes.')
M['W26'] = ('medios-comunicacion-radio-tv-internet','Medios de Comunicacion: Radio, TV e Internet','medios_comunicacion, radio, television, internet, comunicacion_masiva, informacion','Este bundle cubre los medios de comunicacion masiva en Colombia.')
M['W27'] = ('periodico-y-noticia','El Periodico y la Noticia','periodico, noticia, prensa_escrita, periodismo, lectura_critica, medios_impresos','Este bundle cubre el periodico y la noticia en Colombia.')
M['W28'] = ('carta-y-correo-tradicional','La Carta y el Correo Tradicional','carta, correo_tradicional, comunicacion_escrita, postal, 4-72, mensajeria','Este bundle cubre la carta y el correo tradicional en Colombia.')
M['W29'] = ('repaso-p5','Repaso Periodo 5','repaso_p5, radio, tv, internet, periodico, noticia, carta, correo','Repaso del quinto periodo: medios de comunicacion.')
M['W30'] = ('regiones-naturales-colombia','Las Regiones Naturales de Colombia','regiones_naturales, andina, caribe, pacifica, orinoquia, amazonia, insular','Este bundle cubre las regiones naturales de Colombia.')
M['W31'] = ('climas-de-colombia','Climas de Colombia: Calido, Templado y Frio','climas_colombia, clima_calido, clima_templado, clima_frio, pisos_termicos','Este bundle cubre los climas de Colombia segun pisos termicos.')
M['W32'] = ('fauna-y-flora-representativa','Fauna y Flora Representativa de Colombia','fauna_colombia, flora_colombia, biodiversidad, orquidea, condor, palma_cera','Este bundle cubre la fauna y flora representativa de Colombia.')
M['W33'] = ('repaso-p6','Repaso Periodo 6','repaso_p6, regiones_naturales, climas, fauna, flora, geografia','Repaso del sexto periodo: regiones, climas, fauna y flora.')
M['W34'] = ('fechas-civicas-20-julio-7-agosto','Fechas Civicas: 20 de Julio y 7 de Agosto','fechas_civicas, 20_julio, independencia, 7_agosto, batalla_boyaca, historia_colombia','Este bundle cubre las fechas civicas del 20 de julio y 7 de agosto.')
M['W35'] = ('fechas-civicas-12-octubre-independencias','Fechas Civicas: 12 de Octubre e Independencias','fechas_civicas, 12_octubre, descubrimiento_america, diversidad_cultural, independencias','Este bundle cubre el 12 de octubre y las independencias latinoamericanas.')
M['W36'] = ('la-familia-tipos-funciones','La Familia: Tipos y Funciones','familia, tipos_familia, funciones_familiares, nucleo_familiar, monoparental, valores','Este bundle cubre la familia como nucleo de la sociedad colombiana.')
M['W37'] = ('municipio-autoridades-alcalde','El Municipio y sus Autoridades: El Alcalde','municipio, alcalde, gobierno_municipal, administracion_local','Este bundle cubre el municipio y sus autoridades en Colombia.')
M['W38'] = ('departamento-autoridades-gobernador','El Departamento y sus Autoridades: El Gobernador','departamento, gobernador, gobierno_regional, asamblea_departamental','Este bundle cubre el departamento y sus autoridades en Colombia.')
M['W39'] = ('colombia-paises-vecinos','Colombia y sus Paises Vecinos','paises_vecinos, fronteras, venezuela, brasil, ecuador, peru, panama','Este bundle cubre los paises vecinos de Colombia.')
M['W40'] = ('repaso-integral-anual','Repaso Integral Anual','repaso_integral, anual, todos_temas, ciudadania, geografia, historia, derechos, deberes','Repaso integral anual de Sociales y Ciudadanas para grado 3.')

# ============================================================
# QUESTIONS - encoded compactly
# ============================================================
# Each question: [diff, bloom, icfes, exp_success, context, question, correct_answer, [distractor1, distractor2, distractor3], explanation]
# bloom: 1=Bloom, icfes: category

BLOOM = {1:'Remember',2:'Understand',3:'Apply',4:'Analyze',5:'Evaluate'}
ICFES = {1:'Uso comprensivo del conocimiento social',2:'Interpretacion y analisis de perspectivas',3:'Pensamiento reflexivo y sistemico',4:'Razonamiento y Argumentacion',5:'Pensamiento reflexivo y sistemico'}

# compact: (d, b, i, e, ctx, q, c, [w1,w2,w3], exp)
# where b=bloom (1-5), i=icfes (1-5, but Evaluate=5 uses ICFES 5)

Q = {}

Q['W08'] = [
    (1,1,1,0.82,'I.E. San Bartolome, Bogota. Profesora muestra fotos del campo y la ciudad.','?Cual es una caracteristica del campo colombiano?','Hay muchas plantas, animales y cultivos; las casas estan mas separadas.',
     ['B) Edificios muy altos, avenidas y muchas tiendas. <!-- feedback: Caracteristica de ciudad. -->','C) Semafotos, buses y trancones. <!-- feedback: Caracteristicas de la ciudad. -->','D) Centros comerciales y cines. <!-- feedback: Descripcion de la ciudad. -->'],
     'El campo colombiano tiene grandes extensiones de tierra para agricultura y ganaderia, viviendas dispersas, abundante vegetacion y animales.'),
    (1,1,1,0.80,'I.E. La Candelaria, Medellin. Estudiantes hablan de la ciudad.','?Que encontramos principalmente en las ciudades colombianas?','Calles pavimentadas, edificios, hospitales, colegios y centros comerciales.',
     ['B) Fincas, cultivos de cafe y potreros. <!-- feedback: Caracteristicas del campo. -->','C) Rios navegables y selvas. <!-- feedback: De regiones naturales. -->','D) Sembrados de papa y animales. <!-- feedback: Actividades del campo. -->'],
     'Las ciudades tienen alta concentracion de personas, edificios, calles pavimentadas y servicios como hospitales y colegios.'),
    (2,2,2,0.75,'I.E. Sagrado Corazon, Cali. Actividades del campo.','?Por que es importante el campo para la ciudad?','Porque produce los alimentos (frutas, verduras, leche, carne) que se consumen en la ciudad.',
     ['B) Porque tiene mas centros comerciales. <!-- feedback: Los centros comerciales estan en ciudades. -->','C) Porque tiene mas hospitales. <!-- feedback: Los hospitales estan en ciudades. -->','D) Porque tiene mejor internet. <!-- feedback: La conectividad es mejor en ciudades. -->'],
     'El campo produce los alimentos que consumimos. Los campesinos cultivan y crian animales que se transportan a las ciudades.'),
    (2,2,2,0.72,'I.E. Antonio Jose de Sucre, Bucaramanga. Comparan viviendas.','?Como son las casas en el campo?','Mas amplias, con patio, huerta o jardin grande, rodeadas de naturaleza.',
     ['B) Apartamentos en edificios altos. <!-- feedback: Caracteristica de ciudad. -->','C) Todas iguales y pegadas. <!-- feedback: En el campo son diferentes. -->','D) De vidrio y concreto. <!-- feedback: Describe construcciones urbanas. -->'],
     'Las casas campestres son amplias con terrenos para huertas y animales. Se construyen con bahareque, ladrillo o madera.'),
    (3,3,3,0.65,'I.E. Simon Bolivar, Ibague. Identifican lugares.','Carlos vive en una vereda, ordeña vacas y recoge huevos. ?Donde vive?','En el campo, porque ordeñar y cuidar animales son actividades rurales.',
     ['B) En la ciudad. <!-- feedback: Ordeñar no es actividad urbana. -->','C) En un centro comercial. <!-- feedback: Alli no hay vacas. -->','D) En un edificio. <!-- feedback: No es exclusivo de ciudad. -->'],
     'Carlos vive en zona rural. Ordeñar y recoger huevos son actividades tipicas campesinas.'),
    (3,3,3,0.62,'I.E. Jose Maria Cordova, Rionegro. Transporte de alimentos.','Las frutas del campo llegan a la ciudad principalmente en:','Caminnes y vehiculos de carga desde las fincas hasta los mercados.',
     ['B) Aviones que recogen frutas de arboles. <!-- feedback: La mayoria usa transporte terrestre. -->','C) Tuberias subterraneas. <!-- feedback: No existen. -->','D) Personas caminando cargando frutas. <!-- feedback: El transporte principal es vehicular. -->'],
     'Los alimentos viajan en caminnes desde veredas hasta centrales de abastos y mercados.'),
    (4,4,4,0.50,'I.E. Manuelita Saenz, Neiva. Campo vs ciudad.','?Cual afirmacion es correcta sobre campo y ciudad?','Ambos tienen ventajas: en el campo hay naturaleza; en la ciudad, mas servicios.',
     ['B) La ciudad es mejor porque no hay animales. <!-- feedback: En ciudades tambien hay animales. -->','C) El campo es mejor por los centros comerciales. <!-- feedback: Son mas comunes en ciudades. -->','D) El campo es mejor porque no se trabaja. <!-- feedback: En el campo se trabaja duro. -->'],
     'Ambos espacios son importantes. El campo ofrece naturaleza y alimentos; la ciudad, servicios educativos y de salud.'),
    (5,5,5,0.42,'I.E. Tecnica, Duitama. Debate campo-ciudad.','"Los ninos de la ciudad deberian visitar el campo". ?Por que es buena propuesta?','Porque valora el trabajo campesino, conoce el origen de alimentos y entiende la importancia del campo.',
     ['B) Porque en el campo hay menos tareas. <!-- feedback: No se trata de tareas. -->','C) Porque los ninos del campo necesitan visitas. <!-- feedback: El objetivo es aprender. -->','D) Porque en la ciudad ya no hay alimentos. <!-- feedback: Si hay, pero vienen del campo. -->'],
     'Visitar el campo permite valorar el trabajo campesino y entender que los alimentos son resultado del trabajo rural.'),
]

Q['W09'] = [
    (1,1,1,0.84,'I.E. San Jose, Sincelejo. Actividades economicas del campo.','?Cual actividad economica se realiza en el campo?','La agricultura: cultivar tierra para producir alimentos como cafe, arroz y frutas.',
     ['B) Trabajar en un banco. <!-- feedback: Actividad urbana. -->','C) Conducir un taxi. <!-- feedback: Actividad urbana. -->','D) Atender una tienda en centro comercial. <!-- feedback: Actividad urbana. -->'],
     'La agricultura es la principal actividad del campo. Colombia produce cafe, arroz, maiz, papa, flores y frutas.'),
    (1,1,1,0.82,'I.E. Los Andes, Pasto. Ganaderia.','?Que actividad cria vacas, ovejas y cerdos?','La ganaderia, en potreros y fincas del campo colombiano.',
     ['B) Mineria. <!-- feedback: Extrae minerales, no cria animales. -->','C) Pesca. <!-- feedback: Captura peces. -->','D) Albanileria. <!-- feedback: Construye casas. -->'],
     'La ganaderia es fundamental. En la Costa Caribe y Llanos Orientales se crian vacas, ovejas, cerdos y cabras.'),
    (2,2,2,0.76,'I.E. La Salle, Cucuta. Importancia agricola.','?Por que la agricultura es importante para Colombia?','Produce alimentos, genera trabajo y sus productos se venden a otros paises.',
     ['B) Solo para que turistas tomen fotos. <!-- feedback: Tiene proposito productivo. -->','C) Porque las plantas decoran. <!-- feedback: La agricultura alimenta. -->','D) Porque los agricultores no trabajan. <!-- feedback: Trabajan duro. -->'],
     'El cafe colombiano es mundialmente reconocido. Colombia exporta flores, banano y aguacate. Genera millones de empleos rurales.'),
    (2,2,2,0.73,'I.E. Clemente Zabala, Barranquilla. Pesca.','?Donde se realiza la pesca en Colombia?','En las costas del Caribe y Pacifico, rios y lagunas de todo el pais.',
     ['B) En centros comerciales. <!-- feedback: No se pesca ahi. -->','C) En parques de diversiones. <!-- feedback: No se pesca ahi. -->','D) En estacionamientos. <!-- feedback: No se pesca ahi. -->'],
     'Colombia tiene costas en dos oceanos y muchos rios y lagunas donde comunidades costeras practican la pesca.'),
    (3,3,3,0.64,'I.E. La Presentacion, Pereira. Origen de alimentos.','Desayuno con cafe, pan y leche. ?De que actividades vienen?','Cafe y trigo de agricultura; leche de ganaderia.',
     ['B) Todos de mineria. <!-- feedback: No. -->','C) Cafe y leche de pesca; pan de agricultura. <!-- feedback: No. -->','D) Todos de construccion. <!-- feedback: No. -->'],
     'El cafe es del Eje Cafetero, el pan del trigo agricola, la leche de ganaderia del Altiplano Cundiboyacense.'),
    (3,3,3,0.61,'I.E. Tecnico Agropecuario, Sincelejo. Oficios del campo.','Don Jose ordeña, ara y siembra maiz. ?Cual es su oficio?','Es campesino o agricultor: trabaja la tierra y cuida animales.',
     ['B) Profesor. <!-- feedback: No ensena en aula. -->','C) Medico. <!-- feedback: Su labor es agricola. -->','D) Bombero. <!-- feedback: No apaga incendios. -->'],
     'Los campesinos trabajan la tierra, cuidan animales y producen los alimentos que llegan a la mesa.'),
    (4,4,4,0.48,'I.E. San Carlos, Yopal. Desafios del campo.','?Que dificultad enfrentan los campesinos para vender?','Caminos en mal estado desde veredas hasta mercados.',
     ['B) Tienen demasiados compradores. <!-- feedback: El problema es encontrar compradores. -->','C) Les sobra dinero. <!-- feedback: No es real. -->','D) Frutas crecen muy rapido. <!-- feedback: Crecen a ritmo natural. -->'],
     'Las vias terciarias en mal estado dificultan sacar productos al mercado, causando perdidas.'),
    (5,5,5,0.40,'I.E. Agricola, Granada Meta. Soluciones.','?Que ayudaria mas a los campesinos?','Mejorar vias de acceso y dar herramientas y capacitacion.',
     ['B) Cerrar carreteras al campo. <!-- feedback: Los aislaria. -->','C) Quitarles la tierra. <!-- feedback: Destruiria la produccion. -->','D) Obligarlos a mudarse a la ciudad. <!-- feedback: Dejaria al pais sin alimentos. -->'],
     'Mejorar vias terciarias y dar capacitacion permite a campesinos transportar productos a mejores precios.'),
]

Q['W10'] = [
    (1,1,1,0.84,'I.E. Rafael Nuñez, Cartagena. Servicios publicos.','?Cual es un servicio publico en Colombia?','El servicio de agua potable que llega por el acueducto.',
     ['B) Lavado de autos particular. <!-- feedback: No es publico. -->','C) Comida a domicilio. <!-- feedback: Es privado. -->','D) Jardineria. <!-- feedback: Es particular. -->'],
     'Los servicios publicos satisfacen necesidades basicas: agua, energia, gas y alcantarillado.'),
    (1,1,1,0.82,'I.E. Eduardo Santos, Neiva. Energia electrica.','?Para que sirve la energia electrica?','Para tener luz, usar electrodomesticos y funcionamiento de semaforos.',
     ['B) Solo para ver TV. <!-- feedback: Tiene muchos usos. -->','C) Solo para el telefono. <!-- feedback: Tiene muchos usos. -->','D) Para regar plantas. <!-- feedback: No requiere electricidad. -->'],
     'La energia permite iluminacion, refrigeracion, funcionamiento de hospitales y escuelas.'),
    (2,2,2,0.76,'I.E. La Milagrosa, Medellin. Agua potable.','?Por que es importante que el agua sea potable?','Porque esta limpia, sin microbios, y evita enfermedades.',
     ['B) Sabe mas dulce. <!-- feedback: El sabor no es lo importante. -->','C) Tiene color azul. <!-- feedback: Es transparente. -->','D) Es mas cara. <!-- feedback: El precio no es la razon. -->'],
     'El agua potable es tratada para eliminar microbios. Las plantas de tratamiento limpian el agua de rios y embalses.'),
    (2,2,2,0.73,'I.E. Humberto Nigrinis, Bucaramanga. Gas.','?Para que usamos gas natural en casa?','Para cocinar y calentar agua para la ducha.',
     ['B) Para iluminar. <!-- feedback: Usamos electricidad. -->','C) Para cargar el celular. <!-- feedback: Usamos electricidad. -->','D) Para regar plantas. <!-- feedback: No se usa para eso. -->'],
     'El gas natural llega por tuberias y se usa en estufas para cocinar y calentadores de agua.'),
    (3,3,3,0.65,'I.E. Los Fundadores, Manizales. Ahorrar agua.','?Que ayuda a ahorrar agua?','Cerrar la llave al cepillarse y no dejar la ducha mucho tiempo.',
     ['B) Dejar la llave abierta toda la noche. <!-- feedback: Desperdicia. -->','C) Lavar el carro con manguera todo el dia. <!-- feedback: Desperdicia. -->','D) Tirar basura al inodoro. <!-- feedback: Contamina. -->'],
     'Ahorrar agua es responsabilidad de todos. Cerrar llaves y ducharse rapido ayudan al medio ambiente.'),
    (3,3,3,0.62,'I.E. INEM, Popayan. Ahorrar energia.','?Que ayuda a ahorrar energia?','Apagar luces de habitaciones que no usamos.',
     ['B) Dejar TV prendida toda la noche. <!-- feedback: Desperdicia. -->','C) Tener todas las luces encendidas. <!-- feedback: Gasta innecesariamente. -->','D) Conectar muchos aparatos en un enchufe. <!-- feedback: Peligroso y gasta mas. -->'],
     'Apagar luces no usadas, desconectar aparatos y aprovechar luz natural ahorran energia.'),
    (4,4,4,0.48,'I.E. San Jorge, Sincelejo. Alcantarillado.','?Que pasaria si se daña el alcantarillado?','Aguas sucias no saldrian, habria malos olores y enfermedades.',
     ['B) Mas luz en casas. <!-- feedback: No tiene relacion. -->','C) Agua mas limpia. <!-- feedback: Saca aguas sucias. -->','D) Llegaria mas gas. <!-- feedback: No tiene relacion. -->'],
     'El alcantarillado saca las aguas residuales. Si falla, se acumulan aguas negras que causan enfermedades.'),
    (5,5,5,0.40,'I.E. Fe y Alegria, Bogota. Reflexion.','Un nino dice: "Yo pago el recibo, puedo gastar el agua que quiera". ?Que opinas?','No es correcto: el agua es un recurso limitado que debemos cuidar entre todos.',
     ['B) Tiene razon, si paga puede gastar. <!-- feedback: El agua es de todos, no solo de quien paga. -->','C) Los ninos no deben opinar de servicios. <!-- feedback: Si pueden y deben opinar. -->','D) El agua nunca se acaba. <!-- feedback: Es un recurso limitado. -->'],
     'El agua es un recurso natural limitado. Debemos cuidarla aunque paguemos por ella, porque es responsabilidad de todos.'),
]

# ============================================================
# GENERATE
# ============================================================

def fmt_q(week, slug, i, q):
    """Format one question."""
    d, b, ic, e, ctx, ques, corr, wrongs, exp = q
    parts = []
    parts.append(f"## Pregunta {i+1} [D{d}]\n")
    vid = f"COL-SOC-CIU-3-2026-{week}-{slug}-001-MASTERY-v{i+1}"
    parts.append(f"**ID:** `{vid}`")
    parts.append(f"**Bloom:** {BLOOM[b]}")
    parts.append(f"**ICFES category:** {ICFES[ic]}")
    parts.append(f"**Expected_Success:** {e:.2f}")
    parts.append(f"**Context:** {ctx}\n")
    parts.append("### Enunciado")
    parts.append(ques + "\n")
    parts.append("### Opciones")
    parts.append(f"- [x] A) {corr}")
    for j, w in enumerate(wrongs):
        parts.append(f"- [ ] {chr(66+j)}) {w}")
    parts.append("")
    parts.append("### Explicacion Pedagogica")
    parts.append(exp)
    parts.append("")
    return "\n".join(parts)

def generate_bundle(week):
    """Generate complete markdown for one week."""
    slug, title, rubric, intro = M[week]
    
    lines = []
    # Frontmatter
    lines.append("---")
    lines.append(f'id: "COL-SOC-CIU-3-2026-{week}-{slug}-001-MASTERY"')
    lines.append('country: "colombia"')
    lines.append("grado: 3")
    lines.append('asignatura: "sociales-ciudadanas"')
    lines.append(f'tema: "{slug}"')
    lines.append(f'semana: "{week}"')
    lines.append('protocol_version: "5.2"')
    lines.append("bundle_index: 1")
    lines.append("bundle_size: 8")
    lines.append('alignment: "DBA MEN + Estandares Basicos de Competencias en Ciencias Sociales - Grado 3"')
    lines.append("modern_context: true")
    lines.append('distractor_profile: "plausible_peer_set"')
    lines.append("calibration:")
    lines.append("  expected_success_rate: 0.68")
    lines.append('  discrimination_index_target: ">= 0.22"')
    lines.append("  simulated_responses: 100")
    lines.append(f'rubric_baseline: "{rubric}"')
    lines.append("---")
    lines.append("")
    lines.append(f"# Bundle Mastery: {title}")
    lines.append("")
    lines.append(intro)
    lines.append("")
    
    questions = Q[week]
    for i, q in enumerate(questions):
        lines.append(fmt_q(week, slug, i, q))
    
    return "\n".join(lines)


Q['W11'] = [
    (1,1,1,0.84,'I.E. Jorge Eliecer Gaitan, Bogota. Deberes ciudadanos.','Cual es un deber de los ciudadanos colombianos?','Respetar las leyes y la Constitucion de Colombia.',
     ['B) No pagar impuestos. <!-- feedback: Pagar impuestos es un deber. -->','C) Tirar basura en la calle. <!-- feedback: Es una falta. -->','D) No participar en elecciones. <!-- feedback: Votar es un derecho y deber. -->'],
     'La Constitucion colombiana establece que todos los ciudadanos deben respetar las leyes, pagar impuestos y participar en la vida democratica.'),
    (1,1,1,0.82,'I.E. Leon de Greiff, Medellin. Deberes con la comunidad.','Que deben hacer los ciudadanos por su comunidad?','Cuidar los espacios publicos como parques, calles y colegios.',
     ['B) Rayar las paredes. <!-- feedback: Danar es una falta. -->','C) Dejar la basura en la calle. <!-- feedback: Debe botarse en canecas. -->','D) Romper los semaforos. <!-- feedback: Danar es ilegal. -->'],
     'Cuidar los espacios publicos es deber de todos. Mantener parques, calles y escuelas en buen estado beneficia a la comunidad.'),
    (2,2,2,0.76,'I.E. Marco Fidel Suarez, Bello. Importancia de deberes.','Por que existen deberes ciudadanos?','Para que todos podamos convivir en armonia y respeto, garantizando los derechos de los demas.',
     ['B) Para que el gobierno nos controle. <!-- feedback: No es solo control, es convivencia. -->','C) Para que los ninos obedezcan. <!-- feedback: Aplica a todos. -->','D) Para castigar a quienes no cumplen. <!-- feedback: Es organizar la sociedad. -->'],
     'Los deberes ciudadanos permiten la convivencia pacifica. Al cumplirlos, respetamos los derechos de los demas.'),
    (2,2,2,0.73,'I.E. Normal Superior, Manizales. Impuestos.','Por que los ciudadanos deben pagar impuestos?','Para que el gobierno tenga recursos y pueda construir colegios, hospitales y carreteras.',
     ['B) Para que los politicos se enriquezcan. <!-- feedback: Los impuestos son para obras publicas. -->','C) Porque si no pagan, van a la carcel. <!-- feedback: Hay sanciones, pero el fin es financiar servicios. -->','D) Para comprar juguetes. <!-- feedback: Son para servicios publicos. -->'],
     'Los impuestos financian servicios publicos como educacion, salud, infraestructura y seguridad. Todos debemos contribuir.'),
    (3,3,3,0.65,'I.E. Juan XXIII, Cali. Cumplir deberes.','Si un ciudadano ve que alguien esta danando un parque, que debe hacer?','Avisar a las autoridades (policia o inspector) y explicarles lo que vio.',
     ['B) Unirse a danarlo. <!-- feedback: Danar no es correcto. -->','C) Ignorarlo. <!-- feedback: Como ciudadano debe actuar. -->','D) Grabar y no hacer nada mas. <!-- feedback: Debe reportarlo. -->'],
     'Los ciudadanos deben denunciar conductas que danen los bienes publicos.'),
    (3,3,3,0.62,'I.E. INEM, Villavicencio. Participacion.','Como pueden participar los ciudadanos en su comunidad?','Participando en las juntas de accion comunal y en las elecciones.',
     ['B) No opinando nunca. <!-- feedback: Participar es un derecho. -->','C) Solo protestando. <!-- feedback: Hay muchas formas. -->','D) Dejando que otros decidan. <!-- feedback: Todos deben participar. -->'],
     'La participacion ciudadana se ejerce en juntas de accion comunal, elecciones y espacios de decision local.'),
    (4,4,4,0.48,'I.E. Tecnico Industrial, Piedecuesta. Constitucion.','Por que la Constitucion es importante para los deberes?','Porque alli estan escritos todos los deberes de los ciudadanos colombianos.',
     ['B) Solo los adultos deben conocerla. <!-- feedback: Todos deben conocerla. -->','C) Cambia cada semana. <!-- feedback: Es estable. -->','D) Solo aplica en Bogota. <!-- feedback: Aplica en todo el pais. -->'],
     'La Constitucion Politica es la norma de normas de Colombia y establece derechos y deberes.'),
    (5,5,5,0.40,'I.E. El Rosario, Tunja. Reflexion.','Un ciudadano dice: "Yo no vote, para que sirve votar?" Que le respondes?','Votar es importante porque elegimos a quienes nos representan y toman decisiones.',
     ['B) No sirve para nada. <!-- feedback: Si sirve. -->','C) Solo los ricos deben votar. <!-- feedback: Todos tienen derecho. -->','D) Votar no cambia nada. <!-- feedback: Votar si cambia las cosas. -->'],
     'El voto es el mecanismo fundamental de la democracia. Al votar, los ciudadanos eligen a sus gobernantes.'),
]

Q['W12'] = [
    (1,1,1,0.80,'I.E. La Salle, Bogota. Repaso campo-ciudad.','Que diferencia hay entre campo y ciudad?','En el campo hay naturaleza y casas separadas; en la ciudad hay edificios y servicios.',
     ['B) En el campo hay centros comerciales. <!-- feedback: Eso es en ciudad. -->','C) En la ciudad hay cultivos. <!-- feedback: Eso es en campo. -->','D) No hay diferencias. <!-- feedback: Si hay diferencias. -->'],
     'El campo y la ciudad tienen caracteristicas distintas y se complementan.'),
    (1,1,1,0.78,'I.E. San Jose, Sincelejo. Actividades campo.','Que actividad economica se realiza en el campo?','Agricultura y ganaderia, produciendo alimentos para Colombia.',
     ['B) Trabajar en un banco. <!-- feedback: Urbana. -->','C) Conducir bus urbano. <!-- feedback: Urbana. -->','D) Atender tienda. <!-- feedback: Urbana. -->'],
     'Agricultura y ganaderia son las principales actividades del campo.'),
    (2,2,2,0.74,'I.E. Inem, Barranquilla. Servicios publicos.','Por que son importantes los servicios publicos?','Satisfacen necesidades basicas como agua, luz y gas para vivir bien.',
     ['B) Son gratis. <!-- feedback: Se pagan. -->','C) Solo ricos los necesitan. <!-- feedback: Todos. -->','D) No son importantes. <!-- feedback: Son fundamentales. -->'],
     'Agua, energia y gas son esenciales para la vida digna.'),
    (2,2,2,0.72,'I.E. Fe y Alegria, Medellin. Deberes.','Cual es un deber basico de los ciudadanos?','Respetar las leyes y cuidar los espacios publicos.',
     ['B) No votar nunca. <!-- feedback: Votar es derecho y deber. -->','C) Danar mobiliario. <!-- feedback: Es falta. -->','D) No pagar servicios. <!-- feedback: Pagar es deber. -->'],
     'Los deberes incluyen respetar leyes, pagar impuestos y cuidar bienes publicos.'),
    (3,3,3,0.64,'I.E. INEM, Ibague. Repaso aplicacion.','Maria compra frutas en la plaza. De donde vienen?','Del campo, donde campesinos las cultivan y transportan a la ciudad.',
     ['B) De la fabrica. <!-- feedback: No se fabrican. -->','C) Del supermercado. <!-- feedback: Alli se venden. -->','D) De la nevera. <!-- feedback: Alli se guardan. -->'],
     'Las frutas son cultivadas por campesinos y transportadas a la ciudad para su venta.'),
    (3,3,3,0.60,'I.E. Tecnico, Duitama. Aplicacion.','Pedro ve una llave de agua goteando en el parque. Que hacer?','Avisar a un adulto o a la alcaldia para que la reparen.',
     ['B) Dejarla goteando. <!-- feedback: Desperdicia. -->','C) Romper la llave. <!-- feedback: Empeora. -->','D) Taparla con tierra. <!-- feedback: No soluciona. -->'],
     'Reportar fugas de agua ayuda a conservar este recurso.'),
    (4,4,4,0.48,'I.E. Los Alpes, Soacha. Repaso.','Que pasaria si nadie pagara impuestos?','El gobierno no tendria dinero para colegios, hospitales y carreteras.',
     ['B) El pais seria mas rico. <!-- feedback: Sin impuestos no hay servicios. -->','C) Todos tendrian mas dinero. <!-- feedback: Sin servicios. -->','D) No pasaria nada. <!-- feedback: Colapsarian servicios. -->'],
     'Los impuestos financian servicios publicos e infraestructura.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','"No importa si botan basura en la calle, para eso estan los barredores." Es correcto?','No, mantener limpia la ciudad es responsabilidad de todos.',
     ['B) Si, para eso les pagan. <!-- feedback: Todos debemos colaborar. -->','C) Solo adultos deben cuidar. <!-- feedback: Todos. -->','D) La basura en calle no afecta. <!-- feedback: Si afecta salud. -->'],
     'Mantener la ciudad limpia es responsabilidad de todos los ciudadanos.'),
]

Q['W13'] = [
    (1,1,1,0.86,'I.E. Los Libertadores, Cali. Derechos del nino.','Cual es un derecho fundamental de los ninos?','Derecho a alimentacion: recibir comida nutritiva para crecer sanos.',
     ['B) Derecho a trabajar. <!-- feedback: Trabajo infantil no es derecho. -->','C) Derecho a no estudiar. <!-- feedback: Educacion es obligatoria. -->','D) Derecho a decidir leyes. <!-- feedback: Tienen otros derechos. -->'],
     'Segun la Constitucion y el Codigo de Infancia, los ninos tienen derecho a alimentacion, salud y educacion.'),
    (1,1,1,0.84,'I.E. INEM, Pasto. Derecho a salud.','Que significa derecho a la salud para los ninos?','Recibir atencion medica cuando esten enfermos y controles regulares.',
     ['B) Comer dulces todo el dia. <!-- feedback: No es saludable. -->','C) No necesitan vacunas. <!-- feedback: Las vacunas son parte de la salud. -->','D) Deciden solos su tratamiento. <!-- feedback: Padres y medicos deciden. -->'],
     'El derecho a la salud incluye acceso a medicos, hospitales, vacunas y medicamentos.'),
    (2,2,2,0.76,'I.E. Concejo de Soacha. Educacion.','Por que es importante la educacion?','Permite aprender, desarrollarse y tener mejores oportunidades en el futuro.',
     ['B) Solo para tener un titulo. <!-- feedback: Es formacion integral. -->','C) Para que padres no cuiden. <!-- feedback: Es para desarrollo. -->','D) No es importante. <!-- feedback: Es fundamental. -->'],
     'La educacion prepara a los ninos para la vida, dandoles conocimientos, habilidades y valores.'),
    (2,2,2,0.73,'I.E. Normal, Ibague. Alimentacion escolar.','Como se garantiza alimentacion en escuelas?','A traves del PAE (Programa de Alimentacion Escolar) que da desayuno y almuerzo.',
     ['B) Los ninos llevan su comida. <!-- feedback: El PAE complementa. -->','C) Profesores compran comida. <!-- feedback: Estado financia. -->','D) No se garantiza. <!-- feedback: Si, a traves del PAE. -->'],
     'El PAE es un programa del gobierno colombiano que garantiza alimentacion a los estudiantes.'),
    (3,3,3,0.65,'I.E. Tecnico, Sogamoso. Aplicacion.','Un nino no va al medico por falta de dinero. Que derecho se viola?','Derecho a la salud, porque todos deben recibir atencion sin importar su situacion.',
     ['B) Derecho a recreacion. <!-- feedback: Es salud. -->','C) Derecho al voto. <!-- feedback: Los ninos no votan. -->','D) Derecho a trabajar. <!-- feedback: No es derecho. -->'],
     'El derecho a la salud es universal. Los ninos deben recibir atencion gratuita.'),
    (3,3,3,0.62,'I.E. San Felipe, Cali. Derecho educacion.','Andrea de 9 anos no va a la escuela. Que derecho se viola?','Derecho a la educacion. Todos los ninos deben asistir a la escuela.',
     ['B) Derecho a recreacion. <!-- feedback: Es educacion. -->','C) Derecho a identidad. <!-- feedback: Es educacion. -->','D) Derecho a libertad. <!-- feedback: Es educacion. -->'],
     'La educacion basica en Colombia es obligatoria. Los padres deben matricular a sus hijos.'),
    (4,4,4,0.48,'I.E. El Porvenir, Bosa. Analisis.','Por que el Estado debe garantizar salud infantil?','Porque los ninos son el futuro y necesitan crecer sanos.',
     ['B) Solo porque la ley lo dice. <!-- feedback: Es por bienestar. -->','C) Para que hospitales tengan pacientes. <!-- feedback: No. -->','D) Solo padres deben hacerlo. <!-- feedback: Estado y familia comparten. -->'],
     'El Estado debe proteger la salud de los ninos segun la Constitucion y la Convencion de los Derechos del Nino.'),
    (5,5,5,0.40,'I.E. La Giralda, Medellin. Evaluacion.','"Los ninos no necesitan ir al medico si no estan enfermos." Es correcto?','No, necesitan controles regulares y vacunas aunque no esten enfermos.',
     ['B) Si, solo cuando enfermos. <!-- feedback: Prevencion es clave. -->','C) Solo debiles necesitan controles. <!-- feedback: Todos. -->','D) Controles no sirven. <!-- feedback: Si sirven. -->'],
     'Los controles regulares y vacunas previenen enfermedades graves.'),
]

Q['W14'] = [
    (1,1,1,0.86,'I.E. San Miguel, Fusagasuga. Derecho a proteccion.','Que significa derecho a proteccion de los ninos?','Estar protegidos contra maltrato, abuso y violencia.',
     ['B) Pueden hacer lo que quieran. <!-- feedback: No es permiso. -->','C) Solo padres pueden castigarlos. <!-- feedback: Ningun castigo violento. -->','D) No necesitan supervision. <!-- feedback: Si necesitan. -->'],
     'Ningun nino debe sufrir maltrato fisico ni psicologico. Estado, familia y sociedad deben protegerlos.'),
    (1,1,1,0.84,'I.E. Rafael Pardo, Sincelejo. Identidad.','Como se garantiza derecho a identidad?','Registrandolo en la Registraduria, dandole nombre, apellido y nacionalidad.',
     ['B) Solo con nombre de padres. <!-- feedback: Debe ser registrado. -->','C) No es necesario registrarlos. <!-- feedback: Es obligatorio. -->','D) Con carnet del colegio. <!-- feedback: No garantiza identidad legal. -->'],
     'El registro civil de nacimiento es el documento que da identidad legal al nino.'),
    (2,2,2,0.76,'I.E. Nueva Esperanza, Cali. Derecho recreacion.','Por que es importante el derecho a recreacion?','Porque jugar, hacer deporte y divertirse es parte del desarrollo saludable.',
     ['B) Solo para no molestar adultos. <!-- feedback: Es para desarrollo. -->','C) Perdida de tiempo. <!-- feedback: Jugar es importante. -->','D) Solo para competencias. <!-- feedback: Es para disfrutar. -->'],
     'El juego y la recreacion son derechos fundamentales para el desarrollo infantil.'),
    (2,2,2,0.73,'I.E. Juan de la Cruz, Pasto. Proteccion.','Quienes deben proteger a los ninos?','La familia, la escuela, el Estado y toda la sociedad.',
     ['B) Solo la policia. <!-- feedback: Todos. -->','C) Solo los padres. <!-- feedback: Escuela y Estado tambien. -->','D) Solo los maestros. <!-- feedback: Todos. -->'],
     'La proteccion de los ninos es responsabilidad de toda la sociedad.'),
    (3,3,3,0.65,'I.E. Gabriel Garcia Marquez, Uraba. Identidad.','Un nino sin registro civil. Que problemas tendria?','No podria estudiar, ni recibir atencion medica, ni acceder a programas del Estado.',
     ['B) Ningun problema. <!-- feedback: Si tendria. -->','C) Podria votar. <!-- feedback: Sin registro no. -->','D) Solo problemas si viaja. <!-- feedback: Muchos problemas. -->'],
     'El registro civil es la puerta de entrada a todos los derechos.'),
    (3,3,3,0.62,'I.E. San Fernando, Ibague. Nombre.','Por que los ninos tienen derecho a un nombre?','Porque el nombre es parte de su identidad y les da reconocimiento legal.',
     ['B) Para distinguirlos de mascotas. <!-- feedback: Es identidad legal. -->','C) Solo por tradicion. <!-- feedback: Es un derecho. -->','D) No es importante. <!-- feedback: Es fundamental. -->'],
     'El nombre y la nacionalidad son parte esencial de la identidad.'),
    (4,4,4,0.48,'I.E. Humberto Gomez, Bucaramanga. Analisis.','Por que los ninos tienen derecho a jugar?','El juego ayuda a aprender, socializar y expresarse.',
     ['B) Si no juegan se enferman. <!-- feedback: No es por enfermedad. -->','C) Adultos no quieren jugar. <!-- feedback: No es la razon. -->','D) Solo pobres necesitan jugar. <!-- feedback: Todos necesitan. -->'],
     'El juego desarrolla creatividad, habilidades sociales y motricidad.'),
    (5,5,5,0.40,'I.E. Pablo Neruda, Bogota. Evaluacion.','"Los ninos no deben jugar, solo estudiar." Es correcto?','No, jugar es un derecho y parte del desarrollo integral.',
     ['B) Si, solo estudiar. <!-- feedback: Jugar tambien es necesario. -->','C) Solo fines de semana. <!-- feedback: Tiempo diario. -->','D) Jugar es perdida de tiempo. <!-- feedback: Jugar es aprender. -->'],
     'El derecho a la recreacion no es un lujo, es una necesidad infantil.'),
]

Q['W15'] = [
    (1,1,1,0.86,'I.E. La Presentation, Tunja. Normas aula.','Cual es una norma basica en el aula?','Levantar la mano antes de hablar y esperar el turno.',
     ['B) Gritar para hablar. <!-- feedback: No permite escuchar. -->','C) Hablar al tiempo que profesor. <!-- feedback: No deja aprender. -->','D) Interrumpir companeros. <!-- feedback: Falta de respeto. -->'],
     'Levantar la mano permite participacion ordenada y que todos sean escuchados.'),
    (1,1,1,0.84,'I.E. Jose Maria Cordoba, Rionegro. Respeto.','Como debemos tratar a los companeros?','Con respeto, sin burlas, sin golpes y ayudandonos.',
     ['B) Ignorandolos. <!-- feedback: No es convivencia. -->','C) Solo saludar amigos. <!-- feedback: Todos merecen respeto. -->','D) Pegar si se equivocan. <!-- feedback: Violencia no es aceptable. -->'],
     'El respeto mutuo es la base de la convivencia escolar.'),
    (2,2,2,0.76,'I.E. Simon Bolivar, Valledupar. Importancia normas.','Por que existen normas en el aula?','Para que todos aprendamos en ambiente ordenado y respetuoso.',
     ['B) Para control del profesor. <!-- feedback: Es bien comun. -->','C) Para prohibir diversion. <!-- feedback: Organizan. -->','D) Para castigar. <!-- feedback: No son castigos. -->'],
     'Las normas crean ambiente donde todos pueden concentrarse y aprender.'),
    (2,2,2,0.73,'I.E. Fe y Alegria, Barranquilla. Compartir.','Por que es importante compartir materiales?','Ayuda a companeros y fomenta solidaridad.',
     ['B) Para que profesores nos quieran. <!-- feedback: Es solidaridad. -->','C) Para ganar puntos. <!-- feedback: Es un valor. -->','D) No es importante. <!-- feedback: Si lo es. -->'],
     'Compartir fortalece la comunidad educativa y desarrolla solidaridad.'),
    (3,3,3,0.65,'I.E. Tecnico, Sabaneta. Aplicacion.','Un companero tira papel al piso. Que hacer?','Recordarle que bote la basura en la caneca.',
     ['B) Hacer lo mismo. <!-- feedback: Imitar no es correcto. -->','C) Ignorarlo. <!-- feedback: Puedes ayudar. -->','D) Gritarle. <!-- feedback: Gritar no resuelve. -->'],
     'Mantener el salon limpio es responsabilidad de todos.'),
    (3,3,3,0.62,'I.E. INEM, Pereira. Aplicacion.','Dos estudiantes quieren hablar al tiempo. Como resolver?','Uno cede la palabra y espera su turno.',
     ['B) Los dos hablan al tiempo. <!-- feedback: No se escuchan. -->','C) El que grite mas fuerte habla. <!-- feedback: Gritar no es solucion. -->','D) Profesor decide, pero pueden acordar turnos. <!-- feedback: Correcto. -->'],
     'Saber esperar turnos y ceder la palabra son habilidades importantes.'),
    (4,4,4,0.48,'I.E. Sagrada Familia, Cali. Analisis.','Por que no es correcto burlarse de quien se equivoca?','Todos tenemos derecho a equivocarnos y aprender sin miedo.',
     ['B) Profesor se enoja. <!-- feedback: Es por respeto. -->','C) Luego se vengan. <!-- feedback: Es empatia. -->','D) Pierden puntos. <!-- feedback: Es respeto. -->'],
     'El error es parte del aprendizaje. Burlarse crea un ambiente de temor.'),
    (5,5,5,0.40,'I.E. La Asuncion, Medellin. Evaluacion.','Un estudiante propone eliminar todas las normas del salon. Funcionaria?','No, sin normas habria desorden, no se podria aprender.',
     ['B) Si, harian lo que quieren. <!-- feedback: Desorden impide aprender. -->','C) Si, normas sobran. <!-- feedback: Organizan convivencia. -->','D) Tal vez si todos son amigos. <!-- feedback: Amigos tambien necesitan normas. -->'],
     'Las normas no limitan la libertad, la organizan.'),
]

print('W11-W15 data: ready')


Q['W16'] = [
    (1,1,1,0.86,'I.E. La Salle, Bosa. Normas comunidad.','Cual es una norma de convivencia en la comunidad?','Respetar las filas y turnos en tiendas, bancos y buses.',
     ['B) Colarse en las filas. <!-- feedback: Es falta de respeto. -->','C) Gritar en la calle. <!-- feedback: Molesta a los demas. -->','D) Botar basura en la calle. <!-- feedback: Contamina. -->'],
     'Hacer filas ordenadamente y respetar turnos es una norma basica de convivencia ciudadana que permite la organizacion social.'),
    (1,1,1,0.84,'I.E. San Carlos, Medellin. Espacios publicos.','Como debemos cuidar los parques y plazas?','Manteniendolos limpios, no rayando bancas y cuidando las plantas.',
     ['B) Rayando los juegos. <!-- feedback: Danar no es correcto. -->','C) Arrancando plantas. <!-- feedback: Las plantas son de todos. -->','D) Dejando basura. <!-- feedback: Debemos botarla en canecas. -->'],
     'Los parques y plazas son espacios de todos. Cuidarlos es responsabilidad compartida.'),
    (2,2,2,0.76,'I.E. Concejo de Bello. Vecinos.','Por que es importante saludar a los vecinos?','Porque saludar es una muestra de respeto y crea un ambiente amigable en el barrio.',
     ['B) Para que nos presten cosas. <!-- feedback: Es por respeto. -->','C) No es importante. <!-- feedback: Si es importante. -->','D) Solo si son familia. <!-- feedback: Todos merecen saludo. -->'],
     'Saludar a los vecinos fortalece los lazos comunitarios y crea un ambiente de confianza.'),
    (2,2,2,0.73,'I.E. Normal, Sincelejo. Ruido.','Por que no debemos hacer ruido excesivo en la casa?','Porque molesta a los vecinos y afecta la convivencia en el barrio.',
     ['B) Porque los padres se enojan. <!-- feedback: Es por respeto a vecinos. -->','C) Porque es divertido. <!-- feedback: Molesta a otros. -->','D) No hay problema con el ruido. <!-- feedback: Si hay problema. -->'],
     'El ruido excesivo altera la tranquilidad de los vecinos. Todos debemos respetar el derecho al descanso.'),
    (3,3,3,0.65,'I.E. INEM, Popayan. Aplicacion.','Un vecino pone musica muy fuerte a las 11 pm. Que hacer?','Pedirle amablemente que baje el volumen y si no, hablar con el presidente de la junta.',
     ['B) Poner musica mas fuerte. <!-- feedback: Empeora el problema. -->','C) Llamar a la policia sin hablar primero. <!-- feedback: Primero dialogar. -->','D) Rayar su puerta. <!-- feedback: Danar no es solucion. -->'],
     'El dialogo es la primera herramienta para resolver conflictos vecinales.'),
    (3,3,3,0.62,'I.E. Tecnico, Fusagasuga. Aplicacion.','Ves a un nino rayando la pared del parque. Que hacer?','Decirle amablemente que no debe rayar porque las paredes son de todos y debemos cuidarlas.',
     ['B) Rayar tambien. <!-- feedback: Imitar no es correcto. -->','C) Ignorarlo. <!-- feedback: Puedes ayudar. -->','D) Gritarle. <!-- feedback: Dialogo es mejor. -->'],
     'Cuidar los espacios publicos es deber de todos. Recordar amablemente las normas ayuda.'),
    (4,4,4,0.48,'I.E. Los Pinos, Cali. Analisis.','Por que existen normas de transito para peatones?','Para evitar accidentes y organizar el movimiento de personas y vehiculos.',
     ['B) Para que los policias tengan trabajo. <!-- feedback: Es por seguridad. -->','C) Solo para carros. <!-- feedback: Peatones tambien. -->','D) No son necesarias. <!-- feedback: Si son necesarias. -->'],
     'Las normas de transito protegen la vida de peatones y conductores. Cruzar por la cebra y respetar semaforos salva vidas.'),
    (5,5,5,0.40,'I.E. La Merced, Neiva. Evaluacion.','"Como es mi barrio, puedo botar basura donde quiera." Es correcto?','No, nadie es dueno del barrio, es de todos. Debemos mantenerlo limpio entre todos.',
     ['B) Si, porque vivo ahi. <!-- feedback: Es espacio compartido. -->','C) Si, para eso estan los barredores. <!-- feedback: Todos debemos colaborar. -->','D) La basura no afecta. <!-- feedback: Si afecta. -->'],
     'El barrio es de todos sus habitantes. Mantenerlo limpio es responsabilidad compartida.'),
]

Q['W17'] = [
    (1,1,1,0.80,'I.E. Simon Bolivar, Sincelejo. Repaso derechos nino.','Cual es un derecho fundamental de los ninos?','Derecho a alimentacion, salud y educacion.',
     ['B) Derecho a trabajar. <!-- feedback: No es derecho. -->','C) Derecho a votar. <!-- feedback: No. -->','D) Derecho a decidir leyes. <!-- feedback: No. -->'],
     'Los derechos fundamentales de los ninos incluyen alimentacion, salud y educacion segun el Codigo de Infancia.'),
    (1,1,1,0.78,'I.E. San Jose, Pasto. Repaso identidad.','Que derecho garantiza el registro civil?','El derecho a la identidad del nino.',
     ['B) Derecho a recreacion. <!-- feedback: Es identidad. -->','C) Derecho a salud. <!-- feedback: Es identidad. -->','D) Derecho a proteccion. <!-- feedback: Es identidad. -->'],
     'El registro civil da identidad legal al nino.'),
    (2,2,2,0.74,'I.E. Inem, Valledupar. Repaso normas aula.','Por que son importantes las normas en el aula?','Crean ambiente ordenado para aprender.',
     ['B) Para controlar estudiantes. <!-- feedback: Es para bien comun. -->','C) Para prohibir diversion. <!-- feedback: Organizan. -->','D) Solo para castigar. <!-- feedback: No. -->'],
     'Las normas de aula permiten un ambiente de aprendizaje.'),
    (2,2,2,0.72,'I.E. Fe y Alegria, Medellin. Repaso comunidad.','Por que debemos cuidar los parques?','Porque son espacios de todos y debemos mantenerlos limpios.',
     ['B) Porque la policia obliga. <!-- feedback: Es responsabilidad. -->','C) Solo los adultos deben. <!-- feedback: Todos. -->','D) No es necesario. <!-- feedback: Si. -->'],
     'Los parques son bienes comunes que todos debemos cuidar.'),
    (3,3,3,0.64,'I.E. Gabriel Garcia, Bogota. Aplicacion.','Un nino no tiene registro civil. Que derecho se vulnera?','Derecho a la identidad, no existe legalmente.',
     ['B) Derecho a recreacion. <!-- feedback: Es identidad. -->','C) Derecho a educacion. <!-- feedback: Es identidad. -->','D) Todos. <!-- feedback: Sin identidad muchos derechos se afectan. -->'],
     'Sin identidad, los ninos no pueden acceder a servicios.'),
    (3,3,3,0.60,'I.E. Tecnico, Ibague. Aplicacion.','En el salon, un nino se burla de otro. Que norma se viola?','La norma de respeto mutuo en el aula.',
     ['B) Norma de puntualidad. <!-- feedback: Es respeto. -->','C) Norma de uniforme. <!-- feedback: Es respeto. -->','D) Norma de tareas. <!-- feedback: Es respeto. -->'],
     'Burlarse viola el derecho al respeto de los companeros.'),
    (4,4,4,0.48,'I.E. Los Libertadores, Cali. Analisis.','Relacion entre derechos y deberes.','A cada derecho le corresponde un deber. Ej: derecho a educacion implica deber de estudiar.',
     ['B) Derechos son mas importantes. <!-- feedback: Van juntos. -->','C) Deberes no importan. <!-- feedback: Si importan. -->','D) No hay relacion. <!-- feedback: Si la hay. -->'],
     'Derechos y deberes son complementarios.'),
    (5,5,5,0.40,'I.E. San Felipe, Cali. Evaluacion.','"Solo tengo derechos, no deberes." Es correcto?','No, todos tenemos derechos y deberes por igual.',
     ['B) Si, los deberes son para adultos. <!-- feedback: Todos tienen deberes. -->','C) Si, porque soy nino. <!-- feedback: Ninos tambien tienen deberes. -->','D) Los deberes son opcionales. <!-- feedback: Son obligatorios. -->'],
     'Todos, incluso los ninos, tienen derechos y deberes.'),
]

Q['W18'] = [
    (1,1,1,0.86,'I.E. San Bartolome, Bogota. Colombia ubicacion.','Como se llama oficialmente nuestro pais?','Republica de Colombia.',
     ['B) Estado Colombiano. <!-- feedback: El nombre oficial es Republica de Colombia. -->','C) Confederacion Colombiana. <!-- feedback: No es correcto. -->','D) Union Colombiana. <!-- feedback: No es correcto. -->'],
     'El nombre oficial de nuestro pais es Republica de Colombia, segun la Constitucion de 1991.'),
    (1,1,1,0.84,'I.E. La Candelaria, Medellin. Continente.','En que continente esta ubicada Colombia?','En America del Sur (Sudamerica).',
     ['B) America del Norte. <!-- feedback: Colombia esta en Sur. -->','C) Europa. <!-- feedback: No. -->','D) Asia. <!-- feedback: No. -->'],
     'Colombia esta ubicada en el continente americano, especificamente en America del Sur.'),
    (2,2,2,0.76,'I.E. Sagrado Corazon, Cali. Limites.','Que oceanos rodean a Colombia?','El oceano Atlantico (Mar Caribe) al norte y el oceano Pacifico al oeste.',
     ['B) Solo el Atlantico. <!-- feedback: Tambien el Pacifico. -->','C) Solo el Pacifico. <!-- feedback: Tambien el Atlantico. -->','D) Ningun oceano. <!-- feedback: Si tiene dos oceanos. -->'],
     'Colombia es privilegiada: tiene costas en el oceano Atlantico (Mar Caribe) y en el oceano Pacifico.'),
    (2,2,2,0.73,'I.E. Antonio Sucre, Bucaramanga. Mapa.','Colombia comparte frontera con:','Venezuela, Brasil, Ecuador, Peru y Panama.',
     ['B) Solo con Venezuela. <!-- feedback: Tiene 5 paises vecinos. -->','C) Mexico. <!-- feedback: No comparte frontera. -->','D) Argentina. <!-- feedback: No. -->'],
     'Colombia limita con 5 paises: Venezuela, Brasil, Ecuador, Peru y Panama.'),
    (3,3,3,0.65,'I.E. Simon Bolivar, Ibague. Aplicacion mapa.','Si miras un mapa de Sudamerica, Colombia esta en:','El extremo noroccidental, cerca de America Central.',
     ['B) El centro del continente. <!-- feedback: No. -->','C) El extremo sur. <!-- feedback: No. -->','D) El este. <!-- feedback: No. -->'],
     'Colombia esta ubicada al noroccidente de Sudamerica, siendo la puerta de entrada a America del Sur.'),
    (3,3,3,0.62,'I.E. Jose Cordova, Rionegro. Aplicacion.','Cual es la capital de Colombia?','Bogota.',
     ['B) Medellin. <!-- feedback: Es capital de Antioquia. -->','C) Cali. <!-- feedback: Es capital del Valle. -->','D) Barranquilla. <!-- feedback: Es capital del Atlantico. -->'],
     'Bogota es la capital de Colombia y se encuentra en el centro del pais.'),
    (4,4,4,0.48,'I.E. Manuelita Saenz, Neiva. Analisis.','Por que Colombia se llama asi?','En honor a Cristobal Colon, navegante que llego a America.',
     ['B) Por un rio. <!-- feedback: No. -->','C) Por un animal. <!-- feedback: No. -->','D) Por una flor. <!-- feedback: No. -->'],
     'El nombre Colombia proviene de Cristobal Colon, en reconocimiento a su llegada al continente americano.'),
    (5,5,5,0.40,'I.E. Tecnica, Duitama. Evaluacion.','Por que es importante conocer la ubicacion de Colombia?','Para saber donde estamos en el mundo, entender nuestra geografia y relacionarnos con otros paises.',
     ['B) No es importante. <!-- feedback: Si es importante. -->','C) Solo para viajar. <!-- feedback: Es para entender el pais. -->','D) Solo para los geografos. <!-- feedback: Todos deben saberlo. -->'],
     'Conocer la ubicacion de Colombia ayuda a entender nuestra identidad y relacion con el mundo.'),
]

Q['W19'] = [
    (1,1,1,0.88,'I.E. San Felipe, Bogota. Bandera.','Que colores tiene la bandera de Colombia?','Amarillo, azul y rojo.',
     ['B) Verde, blanco y rojo. <!-- feedback: Esa es la bandera de Mexico. -->','C) Rojo, blanco y azul. <!-- feedback: Esa es la de Francia. -->','D) Azul, blanco y amarillo. <!-- feedback: No es correcto. -->'],
     'La bandera de Colombia tiene tres franjas: amarilla (arriba, ocupa la mitad), azul y roja.'),
    (1,1,1,0.86,'I.E. Los Andes, Pasto. Escudo.','Que simbolo patrio tiene un condor en la parte superior?','El escudo de Colombia.',
     ['B) La bandera. <!-- feedback: La bandera no tiene condor. -->','C) El himno. <!-- feedback: El himno es musical. -->','D) La escarapela. <!-- feedback: No. -->'],
     'El escudo de Colombia tiene un condor de los Andes posado sobre el, simbolo de libertad.'),
    (2,2,2,0.78,'I.E. INEM, Barranquilla. Significado colores.','Que representa el color amarillo de la bandera?','La riqueza del suelo colombiano, especialmente el oro.',
     ['B) El cielo. <!-- feedback: El azul representa eso. -->','C) La sangre de los heroes. <!-- feedback: El rojo representa eso. -->','D) La paz. <!-- feedback: No. -->'],
     'El amarillo simboliza las riquezas del suelo colombiano. El azul los dos oceanos. El rojo la sangre de los heroes.'),
    (2,2,2,0.75,'I.E. Fe y Alegria, Cali. Himno.','Quien canta el himno nacional de Colombia?','Todos los colombianos en actos civicos y eventos especiales.',
     ['B) Solo el presidente. <!-- feedback: Todos lo cantan. -->','C) Solo los soldados. <!-- feedback: Todos. -->','D) Solo los ninos. <!-- feedback: Todos. -->'],
     'El himno nacional lo cantan todos los colombianos en ceremonias, actos civicos y eventos deportivos.'),
    (3,3,3,0.65,'I.E. Tecnico, Pasto. Aplicacion.','En el colegio, izar la bandera y cantar el himno es:','Un acto civico que demuestra respeto por los simbolos patrios.',
     ['B) Una perdida de tiempo. <!-- feedback: Es importante. -->','C) Solo una tradicion sin sentido. <!-- feedback: Tiene significado patriotico. -->','D) Opcional. <!-- feedback: Es obligatorio en colegios. -->'],
     'Los actos civicos en los colegios fomentan el respeto por los simbolos patrios.'),
    (3,3,3,0.62,'I.E. Gabriel Garcia, Bogota. Aplicacion.','Como debemos comportarnos al escuchar el himno?','En posicion firme, en silencio, con respeto y la mano derecha en el corazon.',
     ['B) Sentados y comiendo. <!-- feedback: Falta de respeto. -->','C) Hablando por celular. <!-- feedback: Falta de respeto. -->','D) Corriendo. <!-- feedback: Falta de respeto. -->'],
     'Escuchar el himno en posicion firme y en silencio demuestra respeto por el pais.'),
    (4,4,4,0.48,'I.E. San Carlos, Medellin. Analisis.','Por que los simbolos patrios son importantes?','Porque representan la identidad, historia y soberania de Colombia.',
     ['B) Solo decoran edificios. <!-- feedback: Tienen significado profundo. -->','C) Son solo para fechas especiales. <!-- feedback: Nos representan siempre. -->','D) No tienen importancia. <!-- feedback: Si tienen. -->'],
     'Los simbolos patrios unen a los colombianos y representan la historia y valores del pais.'),
    (5,5,5,0.40,'I.E. La Presentacion, Tunja. Evaluacion.','Un estudiante dice: "Los simbolos patrios no significan nada". Que opinas?','No es correcto. Los simbolos patrios representan nuestra historia, cultura y soberania.',
     ['B) Tiene razon. <!-- feedback: Si significan. -->','C) Solo importan deportistas. <!-- feedback: Importan a todos. -->','D) Son solo dibujos. <!-- feedback: Son mucho mas. -->'],
     'Los simbolos patrios tienen un profundo significado historico y cultural para todos los colombianos.'),
]

Q['W20'] = [
    (1,1,1,0.78,'I.E. San Bartolome, Bogota. Repaso general.','Cuales son los simbolos patrios de Colombia?','Bandera, escudo e himno nacional.',
     ['B) Solo la bandera. <!-- feedback: Tambien escudo e himno. -->','C) La moneda y el escudo. <!-- feedback: Moneda no es simbolo patrio. -->','D) El condor y la orquidea. <!-- feedback: Son simbolos nacionales pero no patrios. -->'],
     'Los simbolos patrios oficiales de Colombia son la bandera, el escudo y el himno nacional.'),
    (1,1,1,0.76,'I.E. La Candelaria, Medellin. Repaso.','En que continente esta Colombia?','En America del Sur (Sudamerica).',
     ['B) America del Norte. <!-- feedback: No. -->','C) Europa. <!-- feedback: No. -->','D) Africa. <!-- feedback: No. -->'],
     'Colombia esta ubicada en el norte de America del Sur.'),
    (2,2,2,0.74,'I.E. Sagrado Corazon, Cali. Repaso deberes.','Cual es un deber de los ninos en la escuela?','Asistir a clase, prestar atencion y respetar a los companeros.',
     ['B) No hacer tareas. <!-- feedback: Hacer tareas es deber. -->','C) Llegar tarde. <!-- feedback: Puntualidad es deber. -->','D) Interrumpir clases. <!-- feedback: Respetar clases es deber. -->'],
     'Los deberes escolares incluyen asistencia, puntualidad, atencion y respeto.'),
    (2,2,2,0.72,'I.E. Simon Bolivar, Ibague. Repaso derechos.','Cuales son derechos de los ninos?','Alimentacion, salud, educacion, proteccion y recreacion.',
     ['B) Solo educacion. <!-- feedback: Tiene mas derechos. -->','C) Solo salud. <!-- feedback: Tiene mas derechos. -->','D) Trabajar desde pequenos. <!-- feedback: No es derecho. -->'],
     'Los ninos tienen multiples derechos reconocidos en la ley colombiana.'),
    (3,3,3,0.64,'I.E. INEM, Pasto. Aplicacion.','Ana sabe que en el campo cultivan alimentos que llegan a la ciudad. Esto es importante porque:','Muestra la relacion entre campo y ciudad y la importancia de los campesinos.',
     ['B) Solo es un dato curioso. <!-- feedback: Es una relacion fundamental. -->','C) El campo no es importante. <!-- feedback: Si es importante. -->','D) Los alimentos crecen solos. <!-- feedback: Requieren trabajo. -->'],
     'La relacion campo-ciudad es fundamental para entender de donde vienen los alimentos.'),
    (3,3,3,0.60,'I.E. Tecnico, Rionegro. Aplicacion.','Que accion demuestra respeto por los simbolos patrios?','Cantar el himno con respeto y izar la bandera en fechas civicas.',
     ['B) Usar la bandera como mantel. <!-- feedback: Falta de respeto. -->','C) Rayar el escudo. <!-- feedback: Falta de respeto. -->','D) Silbar el himno. <!-- feedback: Falta de respeto. -->'],
     'Demostrar respeto por los simbolos patrios es parte de la formacion ciudadana.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis.','Por que es importante conocer nuestros derechos y deberes?','Para ejercerlos correctamente y convivir en sociedad.',
     ['B) No es importante. <!-- feedback: Si es importante. -->','C) Solo para los adultos. <!-- feedback: Para todos. -->','D) Solo para los abogados. <!-- feedback: Para todos. -->'],
     'Conocer derechos y deberes permite ser un ciudadano responsable.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','Que aprendizaje has tenido en este periodo sobre Colombia?','Que Colombia tiene una ubicacion unica, simbolos patrios, y que todos tenemos derechos y deberes.',
     ['B) Nada importante. <!-- feedback: Si hay aprendizajes valiosos. -->','C) Solo geografia. <!-- feedback: Hay mas temas. -->','D) Solo derechos. <!-- feedback: Hay mas. -->'],
     'El periodo integro geografia, civismo, derechos y deberes para formar ciudadanos conscientes.'),
]

print("W16-W20 added")


Q['W21'] = [
    (1,1,1,0.86,'I.E. San Felipe, Bogota. Oficios comunidad.','Que es un oficio?','Un trabajo que las personas realizan para ganar dinero y aportar a la comunidad.',
     ['B) Un juego. <!-- feedback: No, es un trabajo. -->','C) Una materia del colegio. <!-- feedback: No. -->','D) Un deporte. <!-- feedback: No. -->'],
     'Un oficio es una ocupacion laboral que las personas aprenden y realizan para sostenerse y contribuir a la sociedad.'),
    (1,1,1,0.84,'I.E. Los Libertadores, Cali. Oficios comunes.','Cual de estos es un oficio comun en Colombia?','Panadero, carpintero, zapatero y campesino.',
     ['B) Astronauta. <!-- feedback: No es comun. -->','C) Presidente. <!-- feedback: No es comun. -->','D) Piloto espacial. <!-- feedback: No es comun. -->'],
     'Panadero, carpintero, zapatero y campesino son oficios comunes que encontramos en nuestras comunidades.'),
    (2,2,2,0.76,'I.E. INEM, Medellin. Importancia oficios.','Por que son importantes los oficios en la comunidad?','Porque satisfacen necesidades basicas como alimentacion, vestido y vivienda.',
     ['B) No son importantes. <!-- feedback: Si lo son. -->','C) Solo algunos. <!-- feedback: Todos son importantes. -->','D) Solo los de la ciudad. <!-- feedback: Tambien los del campo. -->'],
     'Cada oficio cumple una funcion necesaria. El panadero hace pan, el carpintero fabrica muebles.'),
    (2,2,2,0.73,'I.E. Fe y Alegria, Barranquilla. Trabajo digno.','Que significa tener un trabajo digno?','Un trabajo donde la persona es tratada con respeto y recibe un pago justo.',
     ['B) Trabajar sin descanso. <!-- feedback: No es digno. -->','C) Trabajar sin pago. <!-- feedback: No es digno. -->','D) Trabajar solo cuando quiera. <!-- feedback: No. -->'],
     'El trabajo digno implica condiciones justas, respeto y remuneracion adecuada.'),
    (3,3,3,0.65,'I.E. Tecnico, Ibague. Aplicacion.','Don Pedro arregla zapatos en su taller. Cual es su oficio?','Zapatero.',
     ['B) Panadero. <!-- feedback: Hace pan, no arregla zapatos. -->','C) Sastre. <!-- feedback: Hace ropa. -->','D) Albañil. <!-- feedback: Construye. -->'],
     'El zapatero arregla y fabrica zapatos, un oficio tradicional en las comunidades colombianas.'),
    (3,3,3,0.62,'I.E. Simon Bolivar, Sincelejo. Aplicacion.','La senora Maria vende arepas en la esquina. Que oficio tiene?','Vendedora ambulante o arepera.',
     ['B) Medica. <!-- feedback: No atiende pacientes. -->','C) Profesora. <!-- feedback: No ensena. -->','D) Abogada. <!-- feedback: No. -->'],
     'La venta de alimentos es un oficio comun en las calles colombianas.'),
    (4,4,4,0.48,'I.E. San Carlos, Pasto. Analisis.','Por que todos los oficios son importantes?','Porque cada uno satisface una necesidad diferente y todos se complementan.',
     ['B) Algunos no sirven. <!-- feedback: Todos sirven. -->','C) Solo los profesionales importan. <!-- feedback: Todos importan. -->','D) Depende del dinero que ganen. <!-- feedback: No importa el dinero. -->'],
     'Todos los oficios son valiosos. Sin panaderos no hay pan, sin carpinteros no hay muebles.'),
    (5,5,5,0.40,'I.E. Gabriel Garcia, Bogota. Evaluacion.','"Los oficios manuales son menos importantes que las profesiones." Es correcto?','No, todos los trabajos son dignos e importantes para la sociedad.',
     ['B) Si, las profesiones son mejores. <!-- feedback: Todos son valiosos. -->','C) Depende del salario. <!-- feedback: No. -->','D) Si, porque requieren menos estudio. <!-- feedback: La importancia no es por estudio. -->'],
     'Todos los trabajos merecen respeto. Un carpintero es tan valioso como un medico.'),
]

Q['W22'] = [
    (1,1,1,0.86,'I.E. San Bartolome, Bogota. Profesiones.','Que es una profesion?','Una ocupacion que requiere estudios universitarios o formacion especializada.',
     ['B) Un oficio cualquiera. <!-- feedback: Requiere estudios especializados. -->','C) Un pasatiempo. <!-- feedback: No. -->','D) Un deporte. <!-- feedback: No. -->'],
     'Las profesiones requieren formacion academica en universidades o instituciones de educacion superior.'),
    (1,1,1,0.84,'I.E. La Candelaria, Medellin. Medicos.','Que hace un medico por la sociedad?','Cuida la salud de las personas, diagnostica enfermedades y receta tratamientos.',
     ['B) Ensena matematicas. <!-- feedback: Eso es el profesor. -->','C) Construye edificios. <!-- feedback: Eso es el ingeniero. -->','D) Defiende en juicios. <!-- feedback: Eso es el abogado. -->'],
     'El medico es un profesional que protege la salud y salva vidas.'),
    (2,2,2,0.76,'I.E. INEM, Cali. Profesores.','Por que los profesores son importantes?','Porque educan y forman a las personas, transmitiendo conocimientos y valores.',
     ['B) Solo dan tareas. <!-- feedback: Educan integralmente. -->','C) No son importantes. <!-- feedback: Si son fundamentales. -->','D) Solo cuidan ninos. <!-- feedback: Educan y forman. -->'],
     'Los profesores forman a las nuevas generaciones, transmitiendo conocimientos y valores.'),
    (2,2,2,0.73,'I.E. Fe y Alegria, Bogota. Bomberos.','Que hacen los bomberos por la comunidad?','Apagan incendios, rescatan personas en emergencias y previenen accidentes.',
     ['B) Cobran impuestos. <!-- feedback: Eso es el gobierno. -->','C) Juzgan delincuentes. <!-- feedback: Eso son los jueces. -->','D) Construyen carreteras. <!-- feedback: Ingenieros civiles. -->'],
     'Los bomberos son heroes que arriesgan su vida para proteger a la comunidad en emergencias.'),
    (3,3,3,0.65,'I.E. Tecnico, Pasto. Aplicacion.','Un nino se enferma y necesita atencion. A que profesional deben llevar?','A un medico o pediatra.',
     ['B) A un abogado. <!-- feedback: No atiende enfermos. -->','C) A un contador. <!-- feedback: No. -->','D) A un arquitecto. <!-- feedback: No. -->'],
     'Cuando alguien se enferma, debe acudir al medico, que es el profesional de la salud.'),
    (3,3,3,0.62,'I.E. Simon Bolivar, Ibague. Aplicacion.','La profesora de grado 3 ensena a leer y escribir. Que aporte hace a la sociedad?','Forma personas educadas que podran tener un mejor futuro.',
     ['B) Construye edificios. <!-- feedback: No. -->','C) Hace pan. <!-- feedback: No. -->','D) Disena ropa. <!-- feedback: No. -->'],
     'Los profesores forman ciudadanos preparados para contribuir a la sociedad.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis.','Por que necesitamos policias en Colombia?','Para proteger a los ciudadanos, hacer cumplir las leyes y mantener el orden.',
     ['B) Para multar a todos. <!-- feedback: Protegen y orientan. -->','C) Solo para atrapar criminales. <!-- feedback: Tambien previenen. -->','D) No los necesitamos. <!-- feedback: Si los necesitamos. -->'],
     'La policia es una institucion fundamental para la seguridad y convivencia ciudadana.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','Que pasaria si no hubiera medicos en una ciudad?','Las personas enfermarian gravemente y muchas moririan sin atencion.',
     ['B) No pasaria nada. <!-- feedback: Si pasaria. -->','C) Los maestros los reemplazarian. <!-- feedback: No tienen formacion medica. -->','D) Las enfermedades desaparecerian. <!-- feedback: No desaparecen. -->'],
     'Los medicos son esenciales para la salud y supervivencia de la poblacion.'),
]

Q['W23'] = [
    (1,1,1,0.86,'I.E. San Felipe, Bogota. Transporte terrestre.','Cual es un medio de transporte terrestre?','Automovil, bus, bicicleta, moto y tren.',
     ['B) Avion. <!-- feedback: Es aereo. -->','C) Barco. <!-- feedback: Es acuatico. -->','D) Helicoptero. <!-- feedback: Es aereo. -->'],
     'Los medios de transporte terrestre se desplazan por tierra: calles, carreteras y vias ferreas.'),
    (1,1,1,0.84,'I.E. Los Andes, Pasto. Bicicleta.','Por que la bicicleta es un buen medio de transporte?','Porque no contamina, es economica y hace ejercicio.',
     ['B) Es la mas rapida. <!-- feedback: No es la mas rapida. -->','C) Cuesta mucho. <!-- feedback: Es economica. -->','D) Solo para ninos. <!-- feedback: Todos la usan. -->'],
     'La bicicleta es un medio de transporte sostenible que no contamina el ambiente.'),
    (2,2,2,0.76,'I.E. INEM, Medellin. TransMilenio.','Que es TransMilenio?','Un sistema de transporte publico de buses rapidos en Bogota.',
     ['B) Un tren de pasajeros. <!-- feedback: Es un sistema de buses. -->','C) Un avion. <!-- feedback: No. -->','D) Un barco. <!-- feedback: No. -->'],
     'TransMilenio es el sistema de transporte masivo de Bogota, con carriles exclusivos para buses.'),
    (2,2,2,0.73,'I.E. Fe y Alegria, Cali. Motos.','Por que las motos son populares en Colombia?','Porque son economicas, faciles de estacionar y rapidas para moverse en la ciudad.',
     ['B) Son las mas seguras. <!-- feedback: No son las mas seguras. -->','C) No necesitan gasolina. <!-- feedback: Si necesitan. -->','D) Llevan muchas personas. <!-- feedback: Llevan 1 o 2 personas. -->'],
     'Las motos son un medio de transporte muy usado en Colombia por su economia y agilidad.'),
    (3,3,3,0.65,'I.E. Tecnico, Sabaneta. Aplicacion.','Para ir al colegio, Carlos usa el bus escolar. Que tipo de transporte es?','Transporte terrestre publico escolar.',
     ['B) Transporte aereo. <!-- feedback: El bus no vuela. -->','C) Transporte acuatico. <!-- feedback: No navega. -->','D) Transporte espacial. <!-- feedback: No. -->'],
     'El bus escolar es un medio de transporte terrestre que lleva estudiantes a la escuela.'),
    (3,3,3,0.62,'I.E. Simon Bolivar, Sincelejo. Aplicacion.','La familia de Lucia viaja en carro por la carretera. Por donde circulan?','Por carreteras y autopistas terrestres.',
     ['B) Por el rio. <!-- feedback: Carretera es terrestre. -->','C) Por el aire. <!-- feedback: No. -->','D) Por el mar. <!-- feedback: No. -->'],
     'Los carros circulan por carreteras y calles, que son vias terrestres.'),
    (4,4,4,0.48,'I.E. San Carlos, Valledupar. Analisis.','Por que es importante usar el cinturon de seguridad en el carro?','Para protegerse en caso de accidente y salvar la vida.',
     ['B) Para no pagar multa. <!-- feedback: Es por seguridad. -->','C) Es comodo. <!-- feedback: Es por seguridad. -->','D) No es importante. <!-- feedback: Si es importante. -->'],
     'El cinturon de seguridad salva vidas. Es obligatorio usarlo siempre.'),
    (5,5,5,0.40,'I.E. Gabriel Garcia, Bogota. Evaluacion.','"Usar bicicleta ayuda al medio ambiente." Es correcto?','Si, porque no contamina, no usa gasolina y reduce el trafico.',
     ['B) No, contamina mas. <!-- feedback: No contamina. -->','C) Solo ayuda al que la usa. <!-- feedback: Ayuda a todos. -->','D) No es cierto. <!-- feedback: Si es cierto. -->'],
     'La bicicleta es un medio de transporte ecologico que beneficia a toda la comunidad.'),
]

Q['W24'] = [
    (1,1,1,0.86,'I.E. San Bartolome, Bogota. Transporte aereo.','Cual es un medio de transporte aereo?','Avion y helicoptero.',
     ['B) Barco. <!-- feedback: Es acuatico. -->','C) Tren. <!-- feedback: Es terrestre. -->','D) Bus. <!-- feedback: Es terrestre. -->'],
     'Los medios de transporte aereo se desplazan por el aire, como aviones y helicopteros.'),
    (1,1,1,0.84,'I.E. La Candelaria, Cartagena. Transporte acuatico.','Cual es un medio de transporte acuatico?','Barco, lancha y balsa.',
     ['B) Avion. <!-- feedback: Es aereo. -->','C) Moto. <!-- feedback: Es terrestre. -->','D) Bicicleta. <!-- feedback: Es terrestre. -->'],
     'Los medios de transporte acuatico navegan por rios, lagos, mares y oceanos.'),
    (2,2,2,0.76,'I.E. Sagrado Corazon, Cali. Importancia aviones.','Por que son importantes los aviones en Colombia?','Conectan ciudades lejanas y permiten viajar rapido entre regiones.',
     ['B) Son lentos. <!-- feedback: Son rapidos. -->','C) No son utiles. <!-- feedback: Si son utiles. -->','D) Solo para turistas. <!-- feedback: Para todos. -->'],
     'Los aviones conectan regiones separadas por montañas y selvas, ahorrando tiempo.'),
    (2,2,2,0.73,'I.E. INEM, Barranquilla. Barcos.','Por que los barcos son importantes para Colombia?','Porque Colombia tiene costas en dos oceanos y los barcos transportan mercancias al exterior.',
     ['B) No tienen importancia. <!-- feedback: Si son importantes. -->','C) Solo pasean turistas. <!-- feedback: Transportan mercancias. -->','D) Solo van a islas. <!-- feedback: Van a muchos lugares. -->'],
     'Los barcos son fundamentales para el comercio internacional de Colombia.'),
    (3,3,3,0.65,'I.E. Tecnico, Ibague. Aplicacion.','La familia Perez viaja de Bogota a Leticia en avion. Por que no van en carro?','Porque no hay carretera directa y el avion es la unica via practica.',
     ['B) Porque el carro es mas rapido. <!-- feedback: El avion es mas rapido. -->','C) Porque es mas barato. <!-- feedback: En este caso no. -->','D) No hay razon. <!-- feedback: Si la hay. -->'],
     'Leticia (Amazonas) solo se conecta por via aerea o fluvial, no hay carretera desde Bogota.'),
    (3,3,3,0.62,'I.E. Simon Bolivar, Santa Marta. Aplicacion.','Los pescadores salen al mar en sus embarcaciones. Que transporte usan?','Transporte acuatico (lanchas o botes de pesca).',
     ['B) Aereo. <!-- feedback: En el mar no vuelan. -->','C) Terrestre. <!-- feedback: En el mar no hay tierra. -->','D) Subterraneo. <!-- feedback: No. -->'],
     'Los pescadores usan lanchas y botes, que son medios de transporte acuatico.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis.','Por que no todos los colombianos viajan en avion?','Porque es mas costoso que el bus y no todos tienen acceso a aeropuertos.',
     ['B) Porque no les gusta. <!-- feedback: Es por costo y acceso. -->','C) Porque es peligroso. <!-- feedback: Es seguro. -->','D) Porque es lento. <!-- feedback: Es rapido. -->'],
     'El costo y la disponibilidad de aeropuertos limitan el acceso al transporte aereo.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','Que pasaria si Colombia no tuviera transporte aereo ni acuatico?','Las regiones alejadas estarian incomunicadas y no podria haber comercio con otros paises.',
     ['B) No pasaria nada. <!-- feedback: Si pasaria. -->','C) Todos usarian bicicleta. <!-- feedback: No es viable. -->','D) Mejoraria la economia. <!-- feedback: Empeoraria. -->'],
     'El transporte aereo y acuatico es vital para conectar las regiones de Colombia y para el comercio.'),
]

Q['W25'] = [
    (1,1,1,0.78,'I.E. San Felipe, Bogota. Repaso oficios.','Cual es un oficio comun en Colombia?','Panadero, carpintero o zapatero.',
     ['B) Astronauta. <!-- feedback: No es comun. -->','C) Presidente. <!-- feedback: No es comun. -->','D) Actor de cine. <!-- feedback: No es comun. -->'],
     'Los oficios comunes en Colombia incluyen panadero, carpintero, zapatero y campesino.'),
    (1,1,1,0.76,'I.E. La Candelaria, Medellin. Repaso profesiones.','Que hace un medico?','Cuida la salud de las personas.',
     ['B) Construye puentes. <!-- feedback: Ingeniero civil. -->','C) Ensea matematicas. <!-- feedback: Profesor. -->','D) Defiende en juicios. <!-- feedback: Abogado. -->'],
     'El medico es el profesional encargado de la salud.'),
    (2,2,2,0.74,'I.E. INEM, Cali. Repaso transporte terrestre.','Cual es un medio de transporte terrestre?','Bus, carro, bicicleta y moto.',
     ['B) Avion. <!-- feedback: Aereo. -->','C) Barco. <!-- feedback: Acuatico. -->','D) Helicoptero. <!-- feedback: Aereo. -->'],
     'Los transportes terrestres se desplazan sobre tierra.'),
    (2,2,2,0.72,'I.E. Fe y Alegria, Barranquilla. Repaso aereo-acuatico.','Cual es un medio de transporte acuatico?','Barco y lancha.',
     ['B) Avion. <!-- feedback: Aereo. -->','C) Moto. <!-- feedback: Terrestre. -->','D) Tren. <!-- feedback: Terrestre. -->'],
     'Barcos y lanchas navegan por el agua.'),
    (3,3,3,0.64,'I.E. Tecnico, Pasto. Aplicacion.','Donde trabaja un panadero?','En una panaderia, haciendo pan para la comunidad.',
     ['B) En un hospital. <!-- feedback: Ahi trabajan medicos. -->','C) En una escuela. <!-- feedback: Profesores. -->','D) En un juzgado. <!-- feedback: Abogados. -->'],
     'La panaderia es el lugar de trabajo del panadero.'),
    (3,3,3,0.60,'I.E. Simon Bolivar, Ibague. Aplicacion.','Para ir del campo a la ciudad, las frutas viajan en camion. Que tipo de transporte es?','Transporte terrestre de carga.',
     ['B) Aereo. <!-- feedback: Es terrestre. -->','C) Acuatico. <!-- feedback: No navega. -->','D) Espacial. <!-- feedback: No. -->'],
     'Los camiones son transporte terrestre que lleva alimentos del campo a la ciudad.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis.','Relacion: oficios vs profesiones.','Los oficios se aprenden con la practica; las profesiones requieren estudios universitarios.',
     ['B) Son lo mismo. <!-- feedback: Son diferentes. -->','C) Las profesiones no requieren estudio. <!-- feedback: Si requieren. -->','D) Los oficios requieren universidad. <!-- feedback: Se aprenden en la practica. -->'],
     'Oficios y profesiones se diferencian principalmente en el tipo de formacion requerida.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','Que hemos aprendido sobre el trabajo en la sociedad?','Todos los trabajos son importantes y dignos, cada uno aporta algo valioso.',
     ['B) Solo algunos trabajos importan. <!-- feedback: Todos importan. -->','C) Los trabajos manuales no valen. <!-- feedback: Todos valen. -->','D) Solo importan los que ganan mas. <!-- feedback: No importa el dinero. -->'],
     'Cada trabajo, oficio o profesion, aporta algo esencial a la comunidad.'),
]

print("W21-W25 added")


Q['W26'] = [
    (1,1,1,0.86,'I.E. San Felipe, Bogota. Medios comunicacion.','Cual es un medio de comunicacion masiva?','Radio, television e internet.',
     ['B) El telefono fijo. <!-- feedback: Es comunicacion interpersonal. -->','C) El carro. <!-- feedback: Es transporte. -->','D) La bicicleta. <!-- feedback: Es transporte. -->'],
     'Los medios de comunicacion masiva transmiten informacion a muchas personas al mismo tiempo.'),
    (1,1,1,0.84,'I.E. Los Andes, Pasto. Radio.','Que transmite la radio?','Musica, noticias, programas educativos y entretenimiento.',
     ['B) Solo musica. <!-- feedback: Tambien noticias y educacion. -->','C) Solo publicidad. <!-- feedback: Mucho mas. -->','D) Solo deportes. <!-- feedback: Variedad de contenido. -->'],
     'La radio ofrece musica, noticias, programas educativos, culturales y de entretenimiento.'),
    (2,2,2,0.76,'I.E. INEM, Medellin. Television.','Por que la television es importante?','Porque informa, entretiene y educa a traves de imagenes y sonido.',
     ['B) Solo entretiene. <!-- feedback: Tambien informa y educa. -->','C) No es importante. <!-- feedback: Si es importante. -->','D) Solo para adultos. <!-- feedback: Para todos. -->'],
     'La television combina imagen y sonido para informar, entretener y educar.'),
    (2,2,2,0.73,'I.E. Fe y Alegria, Cali. Internet.','Que permite hacer el internet?','Buscar informacion, comunicarse con personas lejanas y ver videos educativos.',
     ['B) Solo jugar. <!-- feedback: Tiene muchos usos. -->','C) Solo ver redes sociales. <!-- feedback: Mas usos. -->','D) Solo para adultos. <!-- feedback: Todos lo usan. -->'],
     'El internet es una herramienta que permite aprender, comunicarse y entretenerse.'),
    (3,3,3,0.65,'I.E. Tecnico, Ibague. Aplicacion.','Andrea escucha las noticias en la radio mientras desayuna. Que medio usa?','La radio como medio de comunicacion.',
     ['B) Television. <!-- feedback: No esta viendo, escucha. -->','C) Internet. <!-- feedback: No menciona internet. -->','D) Periodico. <!-- feedback: No esta leyendo. -->'],
     'La radio es un medio auditivo que permite informarse mientras se realizan otras actividades.'),
    (3,3,3,0.62,'I.E. Simon Bolivar, Sincelejo. Aplicacion.','Para hacer una tarea escolar, Juan busca informacion en su computador. Que medio usa?','Internet, para buscar informacion educativa.',
     ['B) Radio. <!-- feedback: No es lo mas practico. -->','C) Television. <!-- feedback: No es interactiva. -->','D) Carta. <!-- feedback: Es muy lento. -->'],
     'Internet permite acceder rapidamente a informacion para tareas escolares.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis.','Por que los medios de comunicacion son importantes?','Porque mantienen informada a la sociedad y permiten la comunicacion masiva.',
     ['B) No son importantes. <!-- feedback: Si lo son. -->','C) Solo para entretenerse. <!-- feedback: Tambien informan y educan. -->','D) Solo para los periodistas. <!-- feedback: Para todos. -->'],
     'Los medios de comunicacion son esenciales para una sociedad informada.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','"El internet es solo para jugar y perder el tiempo." Es correcto?','No, el internet es una herramienta educativa y de comunicacion muy valiosa.',
     ['B) Si, solo para eso sirve. <!-- feedback: Tiene muchos usos educativos. -->','C) Solo los adultos lo usan bien. <!-- feedback: Todos pueden usarlo bien. -->','D) No sirve para estudiar. <!-- feedback: Si sirve. -->'],
     'El internet es una herramienta poderosa para aprender, investigar y comunicarse.'),
]

Q['W27'] = [
    (1,1,1,0.86,'I.E. San Bartolome, Bogota. Periodico.','Que es un periodico?','Un medio impreso que publica noticias e informacion de actualidad.',
     ['B) Un libro de cuentos. <!-- feedback: No, son noticias. -->','C) Una revista de moda. <!-- feedback: No es solo moda. -->','D) Un programa de TV. <!-- feedback: Es impreso. -->'],
     'El periodico es un medio de comunicacion escrito que informa sobre eventos actuales.'),
    (1,1,1,0.84,'I.E. La Candelaria, Medellin. Partes noticia.','Que partes tiene una noticia?','Titulo, lead (inicio), cuerpo y fotografia.',
     ['B) Solo el titulo. <!-- feedback: Tiene mas partes. -->','C) Introduccion, desarrollo y final sin titulo. <!-- feedback: El titulo es clave. -->','D) Solo fotos. <!-- feedback: Tiene texto tambien. -->'],
     'Toda noticia tiene titulo (llamativo), lead (resumen), cuerpo (detalles) y a veces fotos.'),
    (2,2,2,0.76,'I.E. INEM, Cali. Importancia noticia.','Por que son importantes las noticias?','Porque mantienen informada a la comunidad sobre lo que sucede en el mundo.',
     ['B) No son importantes. <!-- feedback: Si son importantes. -->','C) Solo para adultos. <!-- feedback: Para todos. -->','D) Solo para periodistas. <!-- feedback: Para toda la sociedad. -->'],
     'Las noticias permiten a las personas estar informadas y tomar decisiones.'),
    (2,2,2,0.73,'I.E. Fe y Alegria, Barranquilla. Tipos noticias.','Donde se pueden leer noticias?','En periodicos impresos, sitios web de noticias y redes sociales.',
     ['B) Solo en periodicos de papel. <!-- feedback: Tambien digital. -->','C) Solo en TV. <!-- feedback: Tambien escritas. -->','D) Solo en la radio. <!-- feedback: Tambien escritas. -->'],
     'Las noticias se pueden leer en periodicos, sitios web y aplicaciones.'),
    (3,3,3,0.65,'I.E. Tecnico, Pasto. Aplicacion.','En el periodico del colegio, los estudiantes publican noticias. Que deben incluir?','Titulo llamativo, informacion clara y datos verificados.',
     ['B) Solo fotos. <!-- feedback: Debe tener texto. -->','C) Solo opiniones. <!-- feedback: Debe tener hechos. -->','D) Historias inventadas. <!-- feedback: Las noticias son reales. -->'],
     'Las noticias deben ser reales, claras y con informacion verificada.'),
    (3,3,3,0.62,'I.E. Simon Bolivar, Ibague. Aplicacion.','Maria lee que llovera toda la semana. Donde pudo leerlo?','En el periodico o en un sitio web del clima.',
     ['B) Solo en la radio. <!-- feedback: Tambien escrito. -->','C) Solo en TV. <!-- feedback: Tambien escrito. -->','D) En un libro de historia. <!-- feedback: No es noticia actual. -->'],
     'La informacion del clima se publica en periodicos y sitios web.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis.','Por que los periodicos son confiables?','Porque los periodistas verifican la informacion antes de publicarla.',
     ['B) Porque todo lo que publican es cierto. <!-- feedback: Deben verificar. -->','C) No son confiables. <!-- feedback: Los serios si. -->','D) Solo porque tienen fotos. <!-- feedback: Verifican fuentes. -->'],
     'El periodismo serio verifica datos y fuentes antes de publicar.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','"Todo lo que sale en internet es verdad." Es correcto?','No, en internet hay informacion falsa. Debemos verificar las fuentes.',
     ['B) Si, todo es verdad. <!-- feedback: Hay mucha desinformacion. -->','C) Solo lo que dicen los periodicos. <!-- feedback: Tambien hay que verificar. -->','D) Las redes siempre dicen verdad. <!-- feedback: No siempre. -->'],
     'Es importante verificar la informacion en fuentes confiables antes de creerla.'),
]

Q['W28'] = [
    (1,1,1,0.86,'I.E. San Felipe, Bogota. Carta.','Cual es la funcion de una carta?','Comunicar un mensaje escrito a una persona que esta lejos.',
     ['B) Hacer dibujos. <!-- feedback: Su funcion es comunicar. -->','C) Guardar dinero. <!-- feedback: No. -->','D) Decorar paredes. <!-- feedback: No. -->'],
     'La carta es un medio de comunicacion escrita que permite enviar mensajes a distancia.'),
    (1,1,1,0.84,'I.E. Los Andes, Pasto. Partes carta.','Que partes tiene una carta formal?','Fecha, saludo, cuerpo, despedida y firma.',
     ['B) Solo el mensaje. <!-- feedback: Tiene estructura completa. -->','C) Titulo y foto. <!-- feedback: No tiene foto. -->','D) Solo la firma. <!-- feedback: Tiene mas. -->'],
     'Toda carta tiene una estructura: fecha, destinatario, saludo, cuerpo, despedida y firma.'),
    (2,2,2,0.76,'I.E. INEM, Medellin. Correo tradicional.','Como funciona el correo tradicional en Colombia?','Se escribe la carta, se pone en un sobre con estampilla y se envia por 4-72.',
     ['B) Por internet. <!-- feedback: Es tradicional, no digital. -->','C) Se la lleva un amigo. <!-- feedback: Usa servicio postal. -->','D) Se publica en periodico. <!-- feedback: No. -->'],
     '4-72 es la empresa de correos de Colombia que entrega cartas y paquetes.'),
    (2,2,2,0.73,'I.E. Fe y Alegria, Cali. Estampilla.','Para que sirve la estampilla en una carta?','Para pagar el envio de la carta a traves del servicio postal.',
     ['B) Para decorar la carta. <!-- feedback: Sirve para pagar el envio. -->','C) Para identificar al remitente. <!-- feedback: Es para el franqueo. -->','D) No sirve para nada. <!-- feedback: Si sirve. -->'],
     'La estampilla es el comprobante de pago del servicio postal.'),
    (3,3,3,0.65,'I.E. Tecnico, Ibague. Aplicacion.','La abuela de Pedro vive en otra ciudad y quiere enviarle una carta de cumpleanos. Que necesita?','Sobre, estampilla, direccion del destinatario y la carta escrita.',
     ['B) Solo la carta. <!-- feedback: Necesita sobre y estampilla. -->','C) Un correo electronico. <!-- feedback: Es tradicional. -->','D) Telefono. <!-- feedback: No. -->'],
     'Para enviar una carta tradicional se necesita sobre, estampilla y direccion.'),
    (3,3,3,0.62,'I.E. Simon Bolivar, Sincelejo. Aplicacion.','Que diferencia hay entre carta y correo electronico?','La carta es en papel, el correo electronico es digital y llega al instante.',
     ['B) Son iguales. <!-- feedback: Son diferentes formatos. -->','C) La carta llega mas rapido. <!-- feedback: El email es instantaneo. -->','D) El email necesita estampilla. <!-- feedback: No necesita. -->'],
     'La carta tradicional usa papel y demora dias; el email es digital y llega al instante.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis.','Por que hoy se usan menos las cartas tradicionales?','Porque el correo electronico y el celular son mas rapidos y comodos.',
     ['B) Porque son caras. <!-- feedback: Son economicas. -->','C) Porque no sirven. <!-- feedback: Si sirven, son mas lentas. -->','D) Porque nadie sabe escribir. <!-- feedback: Si saben. -->'],
     'La tecnologia ha hecho que la comunicacion escrita sea mas rapida a traves de email y mensajes.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','"Las cartas tradicionales ya no tienen ninguna utilidad." Es correcto?','No, aun se usan para ocasiones especiales, documentos oficiales y personas sin internet.',
     ['B) Si, no sirven para nada. <!-- feedback: Aun tienen usos. -->','C) Solo para coleccionistas. <!-- feedback: Mas usos. -->','D) Son solo decoracion. <!-- feedback: Son funcionales. -->'],
     'Las cartas tradicionales aun tienen valor en contextos formales y en comunidades sin acceso digital.'),
]

Q['W29'] = [
    (1,1,1,0.78,'I.E. San Felipe, Bogota. Repaso medios.','Cuales son medios de comunicacion masiva?','Radio, television, internet y periodico.',
     ['B) Telefono fijo. <!-- feedback: Es interpersonal. -->','C) Carta. <!-- feedback: Es personal. -->','D) Carro. <!-- feedback: Es transporte. -->'],
     'Los medios masivos llegan a muchas personas simultaneamente.'),
    (1,1,1,0.76,'I.E. La Candelaria, Medellin. Repaso noticia.','Que es una noticia?','Informacion sobre un hecho actual de interes para la comunidad.',
     ['B) Un cuento inventado. <!-- feedback: Es un hecho real. -->','C) Una receta de cocina. <!-- feedback: No es noticia. -->','D) Un anuncio publicitario. <!-- feedback: No es noticia. -->'],
     'La noticia informa sobre hechos reales y actuales.'),
    (2,2,2,0.74,'I.E. INEM, Cali. Repaso carta.','Que necesita una carta para ser enviada?','Sobre, estampilla y direccion del destinatario.',
     ['B) Solo el mensaje. <!-- feedback: Necesita sobre y estampilla. -->','C) Foto del remitente. <!-- feedback: No es necesario. -->','D) Aprobacion del gobierno. <!-- feedback: No. -->'],
     'Toda carta requiere sobre con estampilla y direccion para ser enviada.'),
    (2,2,2,0.72,'I.E. Fe y Alegria, Barranquilla. Repaso preguntas.','Que informacion debe tener una noticia?','Que paso, cuando, donde, quienes participaron y por que fue importante.',
     ['B) Solo la opinion del periodista. <!-- feedback: Debe tener datos. -->','C) Solo fotos. <!-- feedback: Debe tener texto informativo. -->','D) Nada, solo el titulo. <!-- feedback: Debe tener mas. -->'],
     'Las preguntas basicas de la noticia son: que, cuando, donde, quien, como y por que.'),
    (3,3,3,0.64,'I.E. Tecnico, Pasto. Aplicacion.','Como se puede saber que paso en la ciudad hoy?','Leyendo el periodico, viendo noticias en TV o escuchando la radio.',
     ['B) Solo preguntando a vecinos. <!-- feedback: Tambien medios. -->','C) No hay forma. <!-- feedback: Si hay. -->','D) Solo por internet. <!-- feedback: Tambien otros medios. -->'],
     'Los medios de comunicacion informan sobre los hechos del dia.'),
    (3,3,3,0.60,'I.E. Simon Bolivar, Ibague. Aplicacion.','Si quieres enviar un saludo a tu abuela en otra ciudad sin internet, que usas?','Una carta tradicional por correo.',
     ['B) Un mensaje de texto. <!-- feedback: Sin internet no funciona. -->','C) Un email. <!-- feedback: Sin internet no. -->','D) Una llamada. <!-- feedback: Si hay problemas de conexion. -->'],
     'La carta tradicional no necesita internet y llega a traves del servicio postal.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis.','Relacion entre radio y periodico.','La radio se escucha, el periodico se lee. Ambos informan noticias.',
     ['B) Son iguales. <!-- feedback: Diferentes formatos. -->','C) La radio no informa. <!-- feedback: Si informa. -->','D) El periodico no es confiable. <!-- feedback: Si es confiable. -->'],
     'Cada medio tiene su formato: auditivo (radio) o escrito (periodico).'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','Que hemos aprendido sobre comunicacion?','Que hay muchos medios para comunicarnos y cada uno tiene sus ventajas.',
     ['B) Solo sirve el internet. <!-- feedback: Muchos medios. -->','C) Los medios no son utiles. <!-- feedback: Si son utiles. -->','D) Solo la carta sirve. <!-- feedback: Varios medios. -->'],
     'La variedad de medios permite elegir el mas adecuado segun la situacion.'),
]

Q['W30'] = [
    (1,1,1,0.86,'I.E. San Bartolome, Bogota. Regiones.','Cuantas regiones naturales tiene Colombia?','Seis: Andina, Caribe, Pacifica, Orinoquia, Amazonia e Insular.',
     ['B) Tres. <!-- feedback: Son seis. -->','C) Cinco. <!-- feedback: Son seis. -->','D) Siete. <!-- feedback: Son seis. -->'],
     'Colombia se divide en seis regiones naturales con caracteristicas geograficas y culturales distintas.'),
    (1,1,1,0.84,'I.E. Los Andes, Pasto. Region Andina.','Donde estan las montanas mas importantes de Colombia?','En la region Andina, donde se encuentran las tres cordilleras.',
     ['B) Region Caribe. <!-- feedback: Es costera y plana. -->','C) Region Pacifica. <!-- feedback: Es costera. -->','D) Region Amazonia. <!-- feedback: Es selva plana. -->'],
     'La region Andina esta formada por las tres cordilleras que cruzan Colombia de sur a norte.'),
    (2,2,2,0.76,'I.E. INEM, Medellin. Region Caribe.','Que caracteriza a la region Caribe de Colombia?','Sus playas, el mar Caribe, clima calido y cultura costena.',
     ['B) Montanas nevadas. <!-- feedback: Eso es Andina. -->','C) Selva amazonica. <!-- feedback: Es Amazonia. -->','D) Llanos extensos. <!-- feedback: Es Orinoquia. -->'],
     'La region Caribe tiene costas en el mar Caribe, clima calido y ciudades como Barranquilla y Cartagena.'),
    (2,2,2,0.73,'I.E. Fe y Alegria, Cali. Region Pacifica.','Que oceanos baña la region Pacifica?','El oceano Pacifico, con costas en los departamentos del Choco, Cauca, Narino y Valle.',
     ['B) Oceano Atlantico. <!-- feedback: Es Caribe. -->','C) Oceano Indico. <!-- feedback: No. -->','D) Oceano Artico. <!-- feedback: No. -->'],
     'La region Pacifica colombiana tiene costas sobre el oceano Pacifico.'),
    (3,3,3,0.65,'I.E. Tecnico, Ibague. Aplicacion.','Donde estan los Llanos Orientales?','En la region Orinoquia, al oriente de Colombia.',
     ['B) Region Amazonia. <!-- feedback: Es selva. -->','C) Region Andina. <!-- feedback: Son montanas. -->','D) Region Caribe. <!-- feedback: Es costa. -->'],
     'Los Llanos Orientales forman la region Orinoquia, con extensas llanuras ganaderas.'),
    (3,3,3,0.62,'I.E. Simon Bolivar, Leticia. Aplicacion.','Leticia, capital del Amazonas, esta en que region?','En la region Amazonia, al sur de Colombia.',
     ['B) Orinoquia. <!-- feedback: Es al oriente. -->','C) Andina. <!-- feedback: Es centro. -->','D) Caribe. <!-- feedback: Es norte. -->'],
     'Leticia esta en la region Amazonia, en la triple frontera con Brasil y Peru.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis.','Por que Colombia tiene regiones tan diferentes?','Por su geografia variada: montanas, costas, llanuras y selvas que crean climas diversos.',
     ['B) Porque son inventadas. <!-- feedback: Son reales. -->','C) Porque los gobiernos las crearon. <!-- feedback: Son naturales. -->','D) Solo por el clima. <!-- feedback: Geografia y clima. -->'],
     'La diversidad geografica de Colombia (relieve, clima, ubicacion) crea regiones naturales distintas.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','Por que es importante conocer las regiones de Colombia?','Para valorar la diversidad del pais y entender las diferencias culturales y geograficas.',
     ['B) No es importante. <!-- feedback: Si es importante. -->','C) Solo para viajar. <!-- feedback: Para entender el pais. -->','D) Solo para geografos. <!-- feedback: Para todos. -->'],
     'Conocer las regiones ayuda a comprender la riqueza natural y cultural de Colombia.'),
]

print("W26-W30 added")


Q['W31'] = [
    (1,1,1,0.86,'I.E. San Felipe, Bogota. Pisos termicos.','Que determina el clima en las diferentes zonas de Colombia?','La altura sobre el nivel del mar (pisos termicos).',
     ['B) La hora del dia. <!-- feedback: Es la altura. -->','C) El mes del ano. <!-- feedback: Es la altura. -->','D) La cantidad de arboles. <!-- feedback: Es la altura. -->'],
     'Los pisos termicos son zonas determinadas por la altura: calido (0-1000m), templado (1000-2000m) y frio (2000-3000m).'),
    (1,1,1,0.84,'I.E. Los Andes, Pasto. Clima calido.','Donde encontramos clima calido en Colombia?','En las costas del Caribe y Pacifico, y en los llanos orientales.',
     ['B) En Bogota. <!-- feedback: Bogota tiene clima frio. -->','C) En el Nevado del Ruiz. <!-- feedback: Es clima frio. -->','D) En Tunja. <!-- feedback: Es clima frio. -->'],
     'El clima calido predomina en zonas bajas como costas, llanos y valles interandinos.'),
    (2,2,2,0.76,'I.E. INEM, Medellin. Clima templado.','Que caracteriza al clima templado?','Temperatura agradable, entre 18 y 24 grados, en zonas de altura media.',
     ['B) Mucho calor todo el ano. <!-- feedback: Eso es calido. -->','C) Frio intenso y nieve. <!-- feedback: Eso es frio. -->','D) Lluvia todo el dia. <!-- feedback: No es exclusivo. -->'],
     'El clima templado se encuentra entre 1000 y 2000 metros de altura. Ciudades como Medellin y Cali tienen clima templado.'),
    (2,2,2,0.73,'I.E. Fe y Alegria, Cali. Clima frio.','Donde encontramos clima frio en Colombia?','En ciudades de alta montana como Bogota, Tunja y Pasto.',
     ['B) En la costa Caribe. <!-- feedback: Es calido. -->','C) En Leticia. <!-- feedback: Es calido. -->','D) En Barranquilla. <!-- feedback: Es calido. -->'],
     'El clima frio predomina en ciudades ubicadas a mas de 2000 metros sobre el nivel del mar.'),
    (3,3,3,0.65,'I.E. Tecnico, Ibague. Aplicacion.','La familia Perez vive en Bogota. Que tipo de ropa debe usar normalmente?','Ropa abrigada: chaqueta, buzo y pantalon largo, porque el clima es frio.',
     ['B) Ropa de bano. <!-- feedback: Bogota no es caliente. -->','C) Solo camiseta. <!-- feedback: Hace frio. -->','D) Traje de bano. <!-- feedback: No. -->'],
     'Bogota tiene clima frio (aproximadamente 14 grados promedio), por lo que se necesita ropa abrigada.'),
    (3,3,3,0.62,'I.E. Simon Bolivar, Santa Marta. Aplicacion.','En Santa Marta hace calor casi todo el ano. Que clima tiene?','Clima calido, porque esta a nivel del mar en la costa Caribe.',
     ['B) Clima frio. <!-- feedback: Costa Caribe es calida. -->','C) Clima templado. <!-- feedback: Es calido. -->','D) Clima polar. <!-- feedback: No. -->'],
     'Santa Marta esta a nivel del mar, por lo que tiene clima calido todo el ano.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis.','Por que Colombia tiene variedad de climas?','Porque tiene diferentes altitudes: desde el nivel del mar hasta nevados de mas de 5000 metros.',
     ['B) Porque cambia el clima cada dia. <!-- feedback: Por las altitudes. -->','C) Porque esta cerca del sol. <!-- feedback: No. -->','D) Porque llueve mucho. <!-- feedback: Es por altura. -->'],
     'La variedad de altitudes en Colombia crea diferentes pisos termicos y por tanto climas diversos.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','Como influye el clima en las actividades de las personas?','Determina el tipo de ropa, cultivos, vivienda y actividades economicas de cada region.',
     ['B) No influye. <!-- feedback: Si influye mucho. -->','C) Solo en la ropa. <!-- feedback: Tambien en cultivos y economia. -->','D) Solo en vacaciones. <!-- feedback: En todo. -->'],
     'El clima influye en casi todos los aspectos de la vida: agricultura, vestimenta, vivienda y economia.'),
]

Q['W32'] = [
    (1,1,1,0.86,'I.E. San Bartolome, Bogota. Fauna.','Cual es el ave nacional de Colombia?','El condor de los Andes.',
     ['B) La guacamaya. <!-- feedback: No es el ave nacional. -->','C) El colibri. <!-- feedback: No. -->','D) El gallo. <!-- feedback: No. -->'],
     'El condor de los Andes es el ave nacional de Colombia, simbolo de libertad en el escudo nacional.'),
    (1,1,1,0.84,'I.E. Los Andes, Pasto. Flora.','Cual es la flor nacional de Colombia?','La orquidea (Cattleya trianae).',
     ['B) La rosa. <!-- feedback: No es la flor nacional. -->','C) El girasol. <!-- feedback: No. -->','D) El clavel. <!-- feedback: No. -->'],
     'La orquidea Cattleya trianae es la flor nacional de Colombia, con colores de la bandera.'),
    (2,2,2,0.76,'I.E. INEM, Medellin. Palma de cera.','Que arbol es el arbol nacional de Colombia?','La palma de cera del Quindio.',
     ['B) El eucalipto. <!-- feedback: No. -->','C) El pino. <!-- feedback: No. -->','D) El roble. <!-- feedback: No. -->'],
     'La palma de cera del Quindio es el arbol nacional de Colombia. Puede alcanzar hasta 60 metros de altura.'),
    (2,2,2,0.73,'I.E. Fe y Alegria, Cali. Biodiversidad.','Por que Colombia es considerada un pais mega diverso?','Porque tiene una enorme cantidad de especies de plantas y animales en todo su territorio.',
     ['B) Porque es grande. <!-- feedback: No solo por tamanio. -->','C) Porque tiene petroleo. <!-- feedback: Es por biodiversidad. -->','D) Porque tiene muchos rios. <!-- feedback: Es por especies. -->'],
     'Colombia es el segundo pais mas biodiverso del mundo, con miles de especies de fauna y flora.'),
    (3,3,3,0.65,'I.E. Tecnico, Ibague. Aplicacion.','En el zoologico, los ninos ven jaguares, osos hormigueros y delfines. Son animales de:','La fauna representativa de Colombia, que habita en diferentes regiones.',
     ['B) Otro pais. <!-- feedback: Son colombianos. -->','C) Solo la Amazonia. <!-- feedback: De varias regiones. -->','D) Solo los llanos. <!-- feedback: De varias regiones. -->'],
     'El jaguar, el oso hormiguero y el delfin rosado son especies representativas de Colombia.'),
    (3,3,3,0.62,'I.E. Simon Bolivar, Leticia. Aplicacion.','En el Amazonas colombiano, que tipo de animales encontramos?','Delfines rosados, jaguares, monos, anacondas y guacamayas.',
     ['B) Solo peces. <!-- feedback: Hay muchos mas. -->','C) Solo aves. <!-- feedback: Hay mamiferos y reptiles. -->','D) Pingueinos. <!-- feedback: No hay en Amazonas. -->'],
     'La Amazonia colombiana alberga una gran diversidad de fauna.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis.','Por que debemos cuidar la fauna y flora de Colombia?','Porque son patrimonio natural del pais y muchas especies estan en peligro de extincion.',
     ['B) No es necesario. <!-- feedback: Si es necesario. -->','C) Solo las flores necesitan cuidado. <!-- feedback: Todos los seres vivos. -->','D) Los animales no necesitan proteccion. <!-- feedback: Si necesitan. -->'],
     'La biodiversidad colombiana es un tesoro que debemos proteger para las futuras generaciones.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','Que pasaria si desapareciera el condor de los Andes?','Perderiamos un simbolo nacional y se afectaria el equilibrio ecologico de las altas montanas.',
     ['B) No pasaria nada. <!-- feedback: Si afectaria. -->','C) Otro ave lo reemplazaria. <!-- feedback: No es igual. -->','D) Seria mejor. <!-- feedback: No, es una perdida. -->'],
     'Cada especie cumple una funcion en el ecosistema. Proteger la biodiversidad es proteger la vida.'),
]

Q['W33'] = [
    (1,1,1,0.78,'I.E. San Felipe, Bogota. Repaso regiones.','Cuantas regiones tiene Colombia?','Seis: Andina, Caribe, Pacifica, Orinoquia, Amazonia e Insular.',
     ['B) Cuatro. <!-- feedback: Son seis. -->','C) Cinco. <!-- feedback: Son seis. -->','D) Siete. <!-- feedback: Son seis. -->'],
     'Colombia tiene seis regiones naturales.'),
    (1,1,1,0.76,'I.E. Los Andes, Pasto. Repaso climas.','Que pisos termicos existen en Colombia?','Calido, templado y frio.',
     ['B) Solo calido. <!-- feedback: Tambien templado y frio. -->','C) Tropical, polar, desertico. <!-- feedback: Son pisos termicos colombianos. -->','D) Oceantico y continental. <!-- feedback: No. -->'],
     'Los pisos termicos en Colombia son calido, templado y frio.'),
    (2,2,2,0.74,'I.E. INEM, Medellin. Repaso fauna.','Cual es el ave nacional de Colombia?','El condor de los Andes.',
     ['B) La orquidea. <!-- feedback: Es la flor nacional. -->','C) La palma de cera. <!-- feedback: Es el arbol nacional. -->','D) El colibri. <!-- feedback: No. -->'],
     'El condor de los Andes es el ave nacional.'),
    (2,2,2,0.72,'I.E. Fe y Alegria, Cali. Repaso flora.','Cual es la flor nacional?','La orquidea Cattleya trianae.',
     ['B) El girasol. <!-- feedback: No. -->','C) La rosa. <!-- feedback: No. -->','D) El clavel. <!-- feedback: No. -->'],
     'La orquidea Cattleya trianae es la flor nacional.'),
    (3,3,3,0.64,'I.E. Tecnico, Pasto. Aplicacion.','Por que en la costa Caribe la gente usa ropa fresca?','Porque el clima es calido, las temperaturas son altas todo el ano.',
     ['B) Por moda. <!-- feedback: Es por el clima. -->','C) Porque no hay otra ropa. <!-- feedback: Es por el clima calido. -->','D) Porque les gusta el color blanco. <!-- feedback: Es por temperatura. -->'],
     'El clima calido de la costa determina el tipo de vestimenta.'),
    (3,3,3,0.60,'I.E. Simon Bolivar, Ibague. Aplicacion.','En que region estan las montanas mas altas de Colombia?','En la region Andina, donde estan las tres cordilleras y los nevados.',
     ['B) Region Caribe. <!-- feedback: Es plana. -->','C) Region Amazonia. <!-- feedback: Es selva plana. -->','D) Region Orinoquia. <!-- feedback: Llanuras. -->'],
     'Las cordilleras colombianas estan en la region Andina.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis.','Relacion entre regiones y clima.','Cada region tiene un clima predominante segun su altura: Andina variado, Caribe calido, etc.',
     ['B) Todas tienen el mismo clima. <!-- feedback: Son diferentes. -->','C) El clima no depende de la region. <!-- feedback: Si depende. -->','D) Solo la altura importa. <!-- feedback: Altura y ubicacion. -->'],
     'Las regiones tienen climas diferentes segun su altura y ubicacion geografica.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','Que riqueza natural hemos aprendido que tiene Colombia?','Una gran biodiversidad con miles de especies de flora y fauna, y variedad de climas y regiones.',
     ['B) Ninguna. <!-- feedback: Si tiene. -->','C) Solo petroleo. <!-- feedback: Mucho mas. -->','D) Solo cafe. <!-- feedback: Mucha biodiversidad. -->'],
     'Colombia es uno de los paises mas biodiversos del mundo.'),
]

Q['W34'] = [
    (1,1,1,0.86,'I.E. San Felipe, Bogota. 20 de julio.','Que se celebra el 20 de julio en Colombia?','El Dia de la Independencia de Colombia.',
     ['B) El dia de la raza. <!-- feedback: Eso es 12 de octubre. -->','C) La Batalla de Boyaca. <!-- feedback: Eso es 7 de agosto. -->','D) El dia del trabajo. <!-- feedback: Es 1 de mayo. -->'],
     'El 20 de julio de 1810 se conmemora el grito de independencia de Colombia.'),
    (1,1,1,0.84,'I.E. Los Andes, Pasto. 7 de agosto.','Que se celebra el 7 de agosto en Colombia?','La Batalla de Boyaca, que sello la independencia.',
     ['B) El descubrimiento de America. <!-- feedback: 12 de octubre. -->','C) La independencia de Cartagena. <!-- feedback: 11 de noviembre. -->','D) El dia del idioma. <!-- feedback: 23 de abril. -->'],
     'El 7 de agosto de 1819, el ejercito patriota vencio al espanol en el Puente de Boyaca.'),
    (2,2,2,0.76,'I.E. INEM, Medellin. Importancia 20 julio.','Por que el 20 de julio es una fecha importante?','Porque marco el inicio del proceso de independencia de Colombia.',
     ['B) Porque se fundo Bogota. <!-- feedback: No. -->','C) Porque nacio Simon Bolivar. <!-- feedback: 24 de julio. -->','D) Porque termino la independencia. <!-- feedback: Inicio. -->'],
     'El 20 de julio de 1810 fue el primer paso hacia la libertad de Colombia.'),
    (2,2,2,0.73,'I.E. Fe y Alegria, Cali. Batalla Boyaca.','Quien lidero la Batalla de Boyaca?','Simon Bolivar, el Libertador.',
     ['B) Cristobal Colon. <!-- feedback: No. -->','C) Francisco de Paula Santander. <!-- feedback: Fue su general. -->','D) Antonio Narino. <!-- feedback: Precursor. -->'],
     'Simon Bolivar lidero el ejercito patriota en la Batalla de Boyaca, ayudado por Santander.'),
    (3,3,3,0.65,'I.E. Tecnico, Ibague. Aplicacion.','En el colegio, el 20 de julio se iza la bandera y se canta el himno. Esto es:','Un acto civico para conmemorar la independencia de Colombia.',
     ['B) Una celebracion cualquiera. <!-- feedback: Es un acto patriotico. -->','C) Una actividad deportiva. <!-- feedback: No. -->','D) Un dia de vacaciones. <!-- feedback: Es conmemorativo. -->'],
     'Los actos civicos del 20 de julio honran la memoria de los heroes de la independencia.'),
    (3,3,3,0.62,'I.E. Simon Bolivar, Tunja. Aplicacion.','Donde se libro la Batalla de Boyaca?','En el Puente de Boyaca, cerca de Tunja.',
     ['B) En Bogota. <!-- feedback: No. -->','C) En Cartagena. <!-- feedback: No. -->','D) En Medellin. <!-- feedback: No. -->'],
     'El Puente de Boyaca, en el departamento de Boyaca, es el lugar de la batalla decisiva.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis.','Por que la independencia fue importante para Colombia?','Porque nos liberamos del dominio espanol y comenzamos a ser un pais libre.',
     ['B) Porque cambio el nombre del pais. <!-- feedback: Fue por la libertad. -->','C) Porque se fueron todos los espanoles. <!-- feedback: Proceso gradual. -->','D) Porque llego la tecnologia. <!-- feedback: Fue por libertad. -->'],
     'La independencia permitio a Colombia gobernarse a si misma.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','Que significa ser un pais independiente?','Que podemos tomar nuestras propias decisiones sin que otro pais nos gobierne.',
     ['B) Que no necesitamos a nadie. <!-- feedback: No es aislamiento. -->','C) Que somos los mejores. <!-- feedback: Es autogobierno. -->','D) Que no hay gobierno. <!-- feedback: Tenemos gobierno propio. -->'],
     'La independencia significa autodeterminacion y soberania.'),
]

Q['W35'] = [
    (1,1,1,0.86,'I.E. San Felipe, Bogota. 12 octubre.','Que se conmemora el 12 de octubre?','La llegada de Cristobal Colon a America en 1492.',
     ['B) La independencia de Colombia. <!-- feedback: 20 de julio. -->','C) La Batalla de Boyaca. <!-- feedback: 7 de agosto. -->','D) El descubrimiento del fuego. <!-- feedback: No. -->'],
     'El 12 de octubre de 1492, Colon llego a America, iniciando el encuentro entre dos mundos.'),
    (1,1,1,0.84,'I.E. Los Andes, Pasto. Diversidad cultural.','Que representa el 12 de octubre hoy en dia?','El encuentro de culturas: europea, indigena y africana.',
     ['B) Solo la cultura espanola. <!-- feedback: Es encuentro de varias. -->','C) Solo la cultura indigena. <!-- feedback: Varias culturas. -->','D) Una derrota. <!-- feedback: Es encuentro cultural. -->'],
     'Actualmente el 12 de octubre se reconoce como el Dia de la Diversidad Cultural.'),
    (2,2,2,0.76,'I.E. INEM, Medellin. Independencias.','Que paises se independizaron de Espana en America?','Colombia, Venezuela, Ecuador, Peru, Bolivia, Argentina, entre otros.',
     ['B) Solo Colombia. <!-- feedback: Muchos paises. -->','C) Estados Unidos. <!-- feedback: Se independizo de Inglaterra. -->','D) Brasil. <!-- feedback: Se independizo de Portugal. -->'],
     'Varios paises sudamericanos se independizaron de Espana entre 1810 y 1825.'),
    (2,2,2,0.73,'I.E. Fe y Alegria, Cali. Simon Bolivar.','Que papel tuvo Simon Bolivar en las independencias?','Liberto a Colombia, Venezuela, Ecuador, Peru y Bolivia del dominio espanol.',
     ['B) Solo liberto Colombia. <!-- feedback: Liberto varios paises. -->','C) No participo. <!-- feedback: Fue protagonista. -->','D) Ayudo a los espanoles. <!-- feedback: No. -->'],
     'Simon Bolivar es conocido como el Libertador de cinco naciones sudamericanas.'),
    (3,3,3,0.65,'I.E. Tecnico, Ibague. Aplicacion.','En muchos paises, el 12 de octubre es feriado. Por que?','Para recordar el encuentro de culturas y reflexionar sobre nuestra historia.',
     ['B) Para descansar nomas. <!-- feedback: Tiene significado historico. -->','C) Para celebrar la conquista. <!-- feedback: Es encuentro cultural. -->','D) Porque no hay clases. <!-- feedback: Tiene proposito conmemorativo. -->'],
     'El 12 de octubre es una fecha para reflexionar sobre la diversidad cultural de America.'),
    (3,3,3,0.62,'I.E. Simon Bolivar, Cucuta. Aplicacion.','Por que Cucuta es importante en la historia de independencia?','Porque ahi se creo la Gran Colombia y nacio Simon Bolivar (en Caracas, pero Cucuta fue clave).',
     ['B) No tiene importancia. <!-- feedback: Si tiene. -->','C) Solo comercio. <!-- feedback: Historia independentista. -->','D) Solo hoy. <!-- feedback: Historia. -->'],
     'Cucuta fue sede del Congreso de Cucuta en 1821 que creo la Gran Colombia.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis.','Por que el 12 de octubre es una fecha controversial?','Porque unos lo ven como descubrimiento y otros como invasion y sufrimiento indigena.',
     ['B) No es controversial. <!-- feedback: Si es debatido. -->','C) Todos lo celebran igual. <!-- feedback: Diferentes perspectivas. -->','D) Solo los indigenas se quejan. <!-- feedback: Varias posturas. -->'],
     'El 12 de octubre genera debate: unos celebran el encuentro, otros recuerdan la violencia colonial.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','Que podemos aprender del 12 de octubre hoy?','A valorar la diversidad cultural y respetar a los pueblos indigenas y afrodescendientes.',
     ['B) Que los europeos eran superiores. <!-- feedback: No. -->','C) Que la conquista fue buena. <!-- feedback: Perspectiva compleja. -->','D) Que los indigenas no importan. <!-- feedback: Si importan. -->'],
     'El 12 de octubre nos invita a celebrar la diversidad cultural de America.'),
]

Q['W36'] = [
    (1,1,1,0.88,'I.E. San Felipe, Bogota. Tipos de familia.','Cuales son algunos tipos de familia?','Nuclear (papa, mama e hijos), extensa (abuelos, tios) y monoparental (un solo padre).',
     ['B) Solo la familia nuclear. <!-- feedback: Hay varios tipos. -->','C) Familia de dos personas. <!-- feedback: Hay mas. -->','D) Solo padres y abuelos. <!-- feedback: Varios tipos. -->'],
     'Existen diferentes tipos de familia: nuclear, extensa, monoparental, ensamblada, entre otras.'),
    (1,1,1,0.86,'I.E. Los Andes, Pasto. Funcion familia.','Cual es la funcion principal de la familia?','Proteger, educar y dar amor a sus miembros, especialmente a los ninos.',
     ['B) Solo dar dinero. <!-- feedback: Es mas que eso. -->','C) Solo alimentar. <!-- feedback: Educa y protege. -->','D) Solo castigar. <!-- feedback: No. -->'],
     'La familia es el primer nucleo de socializacion, donde se aprenden valores y se recibe proteccion.'),
    (2,2,2,0.76,'I.E. INEM, Medellin. Valores familiares.','Que valores se aprenden en la familia?','Respeto, responsabilidad, solidaridad, honestidad y amor.',
     ['B) Solo a trabajar. <!-- feedback: Valores humanos. -->','C) Solo a estudiar. <!-- feedback: Valores eticos. -->','D) Solo a cocinar. <!-- feedback: Valores fundamentales. -->'],
     'En la familia se aprenden los valores fundamentales para la convivencia en sociedad.'),
    (2,2,2,0.73,'I.E. Fe y Alegria, Cali. Familia extensa.','Que es una familia extensa?','La que incluye padres, hijos, abuelos, tios y primos viviendo juntos o cerca.',
     ['B) Solo padres e hijos. <!-- feedback: Esa es nuclear. -->','C) Solo abuelos. <!-- feedback: Incluye mas. -->','D) Una sola persona. <!-- feedback: No. -->'],
     'La familia extensa incluye a varios parientes que conviven o colaboran estrechamente.'),
    (3,3,3,0.65,'I.E. Tecnico, Ibague. Aplicacion.','Maria vive con su mama y su abuela. Su papa vive en otra ciudad. Que tipo de familia tiene?','Familia monoparental (vive solo con la mama) con apoyo de la abuela.',
     ['B) Nuclear. <!-- feedback: Le falta el papa en casa. -->','C) Extensa sin nucleo. <!-- feedback: Es monoparental con abuela. -->','D) No es familia. <!-- feedback: Si es familia. -->'],
     'Las familias monoparentales son aquellas donde los hijos viven con un solo progenitor.'),
    (3,3,3,0.62,'I.E. Simon Bolivar, Sincelejo. Aplicacion.','Los abuelos de Pedro viven con su familia. Todos se ayudan. Que tipo es?','Familia extensa, donde varias generaciones conviven.',
     ['B) Nuclear. <!-- feedback: Incluye abuelos. -->','C) Monoparental. <!-- feedback: Ambos padres presentes. -->','D) No es familia. <!-- feedback: Si es. -->'],
     'Cuando abuelos, padres e hijos viven juntos, se forma una familia extensa.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis.','Por que la familia es importante para la sociedad?','Porque forma a las personas en valores y prepara a los ciudadanos del futuro.',
     ['B) No es importante. <!-- feedback: Si es fundamental. -->','C) Solo es importante para los ninos. <!-- feedback: Para toda la sociedad. -->','D) Es solo un grupo de personas. <!-- feedback: Es el nucleo social. -->'],
     'La familia es la base de la sociedad. De ella surgen ciudadanos responsables.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','Todas las familias son iguales?','No, hay diferentes tipos de familia, pero todas cumplen la funcion de cuidar y educar.',
     ['B) Si, todas son iguales. <!-- feedback: Hay diversidad. -->','C) Solo las nucleares son familia. <!-- feedback: Todos los tipos. -->','D) No importa. <!-- feedback: Si importa. -->'],
     'La diversidad familiar es normal. Lo importante es que haya amor y respeto.'),
]

print("W31-W36 added")


Q['W37'] = [
    (1,1,1,0.86,'I.E. San Felipe, Bogota. Municipio.','Que es un municipio en Colombia?','Una division territorial administrada por un alcalde, con su propio gobierno local.',
     ['B) Un pais. <!-- feedback: No, es parte de un departamento. -->','C) Una casa grande. <!-- feedback: No. -->','D) Una escuela. <!-- feedback: No. -->'],
     'Colombia esta dividida en municipios, cada uno con su propio gobierno local.'),
    (1,1,1,0.84,'I.E. Los Andes, Pasto. Alcalde.','Quien es la maxima autoridad de un municipio?','El alcalde, elegido por los ciudadanos del municipio.',
     ['B) El gobernador. <!-- feedback: Eso es del departamento. -->','C) El presidente. <!-- feedback: Es del pais. -->','D) El rector. <!-- feedback: Es de la escuela. -->'],
     'El alcalde es la autoridad administrativa del municipio, elegido democraticamente cada 4 anos.'),
    (2,2,2,0.76,'I.E. INEM, Medellin. Funciones alcalde.','Que funciones tiene el alcalde?','Administrar el municipio, mantener calles, alumbrado, aseo y servicios publicos.',
     ['B) Declarar la guerra. <!-- feedback: Eso es del presidente. -->','C) Hacer leyes nacionales. <!-- feedback: Eso es el Congreso. -->','D) Dirigir el ejercito. <!-- feedback: Presidente. -->'],
     'El alcalde gestiona los servicios publicos locales y el desarrollo del municipio.'),
    (2,2,2,0.73,'I.E. Fe y Alegria, Cali. Consejo municipal.','Quienes ayudan al alcalde a gobernar?','El concejo municipal, formado por concejales elegidos por la comunidad.',
     ['B) El presidente. <!-- feedback: No. -->','C) Los gobernadores. <!-- feedback: Son departamentales. -->','D) Los ministros. <!-- feedback: Son nacionales. -->'],
     'El concejo municipal es una corporacion administrativa que apoya al alcalde.'),
    (3,3,3,0.65,'I.E. Tecnico, Ibague. Aplicacion.','En el pueblo de Juan, el alcalde arreglo la via principal. Que funcion cumplio?','Administrar los recursos del municipio para mejorar la infraestructura.',
     ['B) Hacer leyes nacionales. <!-- feedback: Local. -->','C) Declarar independencia. <!-- feedback: No. -->','D) Cobrar impuestos nacionales. <!-- feedback: Municipales. -->'],
     'El alcalde gestiona el presupuesto municipal para obras publicas.'),
    (3,3,3,0.62,'I.E. Simon Bolivar, Sincelejo. Aplicacion.','Si hay un problema con el acueducto del barrio, a quien debemos acudir?','A la alcaldia municipal, porque es responsable de los servicios publicos.',
     ['B) Al presidente. <!-- feedback: Es local. -->','C) Al gobernador. <!-- feedback: Es municipal. -->','D) Al rector. <!-- feedback: No. -->'],
     'Los servicios publicos locales son gestionados por la alcaldia municipal.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis.','Por que es importante elegir al alcalde?','Porque el alcalde decide como se usan los recursos del municipio para el bienestar de todos.',
     ['B) No es importante. <!-- feedback: Si es fundamental. -->','C) El presidente lo elige. <!-- feedback: Lo elige el pueblo. -->','D) El alcalde no hace nada. <!-- feedback: Si hace. -->'],
     'Elegir al alcalde es participar en la democracia local.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','Que pasaria en un municipio sin alcalde?','No habria quien administrara los servicios publicos, recogiera la basura ni arreglara las calles.',
     ['B) Funcionaria mejor. <!-- feedback: No habria administracion. -->','C) No pasaria nada. <!-- feedback: Si pasaria, colapsarian servicios. -->','D) El gobernador lo haria. <!-- feedback: No reemplaza al alcalde. -->'],
     'El alcalde es esencial para el funcionamiento del municipio.'),
]

Q['W38'] = [
    (1,1,1,0.86,'I.E. San Felipe, Bogota. Departamento.','Que es un departamento en Colombia?','Una division territorial que agrupa varios municipios, con un gobernador como autoridad.',
     ['B) Un barrio. <!-- feedback: Agrupa municipios. -->','C) Una ciudad. <!-- feedback: Es mas grande. -->','D) Una vereda. <!-- feedback: No. -->'],
     'Colombia tiene 32 departamentos, cada uno con varios municipios.'),
    (1,1,1,0.84,'I.E. Los Andes, Pasto. Gobernador.','Quien es la maxima autoridad de un departamento?','El gobernador, elegido por los ciudadanos del departamento.',
     ['B) El alcalde. <!-- feedback: Es municipal. -->','C) El presidente. <!-- feedback: Es nacional. -->','D) El senador. <!-- feedback: Legislador nacional. -->'],
     'El gobernador es la maxima autoridad administrativa del departamento.'),
    (2,2,2,0.76,'I.E. INEM, Medellin. Funciones gobernador.','Que funciones tiene el gobernador?','Administrar el departamento, coordinar la educacion, salud y vias departamentales.',
     ['B) Hacer leyes nacionales. <!-- feedback: Congreso. -->','C) Declarar guerra. <!-- feedback: Presidente. -->','D) Firmar tratados internacionales. <!-- feedback: Presidente. -->'],
     'El gobernador gestiona los asuntos del departamento y ejecuta politicas regionales.'),
    (2,2,2,0.73,'I.E. Fe y Alegria, Cali. Asamblea.','Quienes ayudan al gobernador a gobernar?','La Asamblea Departamental, formada por diputados elegidos.',
     ['B) El concejo municipal. <!-- feedback: Es local. -->','C) El Congreso nacional. <!-- feedback: Es nacional. -->','D) Los alcaldes. <!-- feedback: Son municipales. -->'],
     'La Asamblea Departamental es la corporacion que apoya al gobernador.'),
    (3,3,3,0.65,'I.E. Tecnico, Ibague. Aplicacion.','La carretera que conecta varios municipios esta danada. Quien debe arreglarla?','El gobernador del departamento, porque las vias departamentales son su responsabilidad.',
     ['B) El alcalde. <!-- feedback: Vias intermunicipales son departamentales. -->','C) El presidente. <!-- feedback: Vias nacionales. -->','D) El rector. <!-- feedback: No. -->'],
     'Las vias que conectan municipios son responsabilidad del gobierno departamental.'),
    (3,3,3,0.62,'I.E. Simon Bolivar, Tunja. Aplicacion.','Cuantos departamentos tiene Colombia?','32 departamentos y un Distrito Capital (Bogota).',
     ['B) 20. <!-- feedback: Son 32. -->','C) 40. <!-- feedback: Son 32. -->','D) 10. <!-- feedback: Son 32. -->'],
     'Colombia esta dividida en 32 departamentos mas Bogota como Distrito Capital.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis.','Diferencia entre alcalde y gobernador.','El alcalde gobierna el municipio; el gobernador gobierna el departamento que agrupa municipios.',
     ['B) Son iguales. <!-- feedback: Diferentes niveles. -->','C) El gobernador es municipal. <!-- feedback: Es departamental. -->','D) El alcalde es nacional. <!-- feedback: Es local. -->'],
     'Alcalde y gobernador operan en diferentes niveles de gobierno: local y regional.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','Por que Colombia esta organizada en departamentos y municipios?','Para administrar mejor el territorio y que las decisiones se tomen cerca de la gente.',
     ['B) Para confundir. <!-- feedback: Es para organizar. -->','C) Es solo por tradicion. <!-- feedback: Es funcional. -->','D) No hay razon. <!-- feedback: Si hay razones administrativas. -->'],
     'La organizacion territorial permite una administracion mas eficiente y cercana a los ciudadanos.'),
]

Q['W39'] = [
    (1,1,1,0.88,'I.E. San Felipe, Bogota. Paises vecinos.','Cuales son los paises que comparten frontera con Colombia?','Venezuela, Brasil, Ecuador, Peru y Panama.',
     ['B) Mexico y Argentina. <!-- feedback: No comparten frontera. -->','C) Chile y Uruguay. <!-- feedback: No. -->','D) Espana y Francia. <!-- feedback: Estan en Europa. -->'],
     'Colombia limita con 5 paises: Venezuela, Brasil, Ecuador, Peru y Panama.'),
    (1,1,1,0.86,'I.E. Los Andes, Pasto. Frontera Ecuador.','Con que pais limita Colombia al sur?','Con Ecuador y Peru.',
     ['B) Venezuela. <!-- feedback: Al este. -->','C) Panama. <!-- feedback: Al noroeste. -->','D) Brasil. <!-- feedback: Al sureste. -->'],
     'Al sur, Colombia comparte frontera con Ecuador y Peru.'),
    (2,2,2,0.76,'I.E. INEM, Medellin. Frontera Venezuela.','Con que pais limita Colombia al este?','Con Venezuela, en una frontera larga que abarca varios departamentos.',
     ['B) Ecuador. <!-- feedback: Es al sur. -->','C) Panama. <!-- feedback: Noroeste. -->','D) Brasil. <!-- feedback: Al sureste. -->'],
     'La frontera con Venezuela es la mas extensa de Colombia, desde La Guajira hasta el Amazonas.'),
    (2,2,2,0.73,'I.E. Fe y Alegria, Cali. Frontera Brasil.','Con que pais limita Colombia al suroriente?','Con Brasil, en la region amazonica.',
     ['B) Peru. <!-- feedback: Al sur. -->','C) Panama. <!-- feedback: Noroeste. -->','D) Ecuador. <!-- feedback: Sur. -->'],
     'La frontera con Brasil esta en la region del Amazonas y Orinoquia.'),
    (3,3,3,0.65,'I.E. Tecnico, Ibague. Aplicacion.','Si viajas de Bogota a Caracas, a que pais vas?','A Venezuela.',
     ['B) Ecuador. <!-- feedback: Caracas es la capital de Venezuela. -->','C) Peru. <!-- feedback: No. -->','D) Brasil. <!-- feedback: Brasilia es la capital. -->'],
     'Caracas es la capital de Venezuela, pais vecino de Colombia.'),
    (3,3,3,0.62,'I.E. Simon Bolivar, Leticia. Aplicacion.','En Leticia, puedes cruzar a Brasil y Peru. Esto es posible porque:','Leticia esta en la triple frontera entre Colombia, Brasil y Peru.',
     ['B) Solo con Brasil. <!-- feedback: Triple frontera. -->','C) No hay fronteras. <!-- feedback: Si hay. -->','D) Solo con Peru. <!-- feedback: Con ambos. -->'],
     'Leticia es la unica ciudad colombiana en triple frontera.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis.','Por que es importante mantener buenas relaciones con los paises vecinos?','Para tener comercio, paz y cooperacion en temas de medio ambiente y seguridad.',
     ['B) No es importante. <!-- feedback: Si es importante. -->','C) Solo para viajar. <!-- feedback: Comercio y paz tambien. -->','D) Para hacer la guerra. <!-- feedback: Para vivir en paz. -->'],
     'Las relaciones con los vecinos son fundamentales para la paz y el desarrollo regional.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion.','Que significa ser un pais fronterizo?','Compartir limites territoriales con otros paises, lo que implica intercambio cultural y economico.',
     ['B) Estar aislado. <!-- feedback: Es contacto con otros. -->','C) Solo problemas. <!-- feedback: Oportunidades tambien. -->','D) No tener vecinos. <!-- feedback: Si tiene vecinos. -->'],
     'Ser fronterizo implica relacionarse con los paises vecinos en muchos aspectos.'),
]

Q['W40'] = [
    (1,1,1,0.78,'I.E. San Bartolome, Bogota. Repaso final.','Como se llama nuestro pais?','Republica de Colombia.',
     ['B) Estado de Colombia. <!-- feedback: Republica de Colombia. -->','C) Confederacion Colombiana. <!-- feedback: No. -->','D) Imperio Colombiano. <!-- feedback: No. -->'],
     'El nombre oficial de nuestro pais es Republica de Colombia.'),
    (1,1,1,0.76,'I.E. La Candelaria, Medellin. Repaso final.','Cuales son los simbolos patrios?','Bandera, escudo e himno nacional.',
     ['B) Bandera y moneda. <!-- feedback: Moneda no es simbolo patrio. -->','C) Escudo y flor. <!-- feedback: Flor nacional no es simbolo patrio. -->','D) Solo himno. <!-- feedback: Mas. -->'],
     'Los simbolos patrios son bandera, escudo e himno nacional.'),
    (2,2,2,0.74,'I.E. INEM, Cali. Repaso derechos y deberes.','Los ninos tienen derecho a:','Alimentacion, salud, educacion, proteccion, identidad y recreacion.',
     ['B) Solo educacion. <!-- feedback: Tiene mas derechos. -->','C) Solo alimentacion. <!-- feedback: Mas derechos. -->','D) Solo recreacion. <!-- feedback: Mas derechos. -->'],
     'Los derechos de los ninos son multiples e integrales.'),
    (2,2,2,0.72,'I.E. Fe y Alegria, Barranquilla. Repaso regiones.','Cuantas regiones naturales tiene Colombia?','Seis: Andina, Caribe, Pacifica, Orinoquia, Amazonia e Insular.',
     ['B) Cuatro. <!-- feedback: Seis. -->','C) Ocho. <!-- feedback: Seis. -->','D) Diez. <!-- feedback: Seis. -->'],
     'Colombia tiene seis regiones naturales.'),
    (3,3,3,0.64,'I.E. Tecnico, Pasto. Aplicacion final.','Doña Maria vende empanadas en la esquina. Su oficio es importante porque:','Alimenta a las personas y sostiene a su familia con su trabajo digno.',
     ['B) No es importante. <!-- feedback: Todo trabajo es digno. -->','C) Solo gana dinero. <!-- feedback: Tambien alimenta. -->','D) No contribuye a la sociedad. <!-- feedback: Si contribuye. -->'],
     'Todos los oficios y trabajos son dignos y aportan a la sociedad.'),
    (3,3,3,0.60,'I.E. Simon Bolivar, Ibague. Aplicacion final.','Para participar en la democracia, los ciudadanos deben:','Votar en elecciones, participar en juntas de accion comunal y respetar las leyes.',
     ['B) Solo votar. <!-- feedback: Tambien participar activamente. -->','C) No opinar. <!-- feedback: Participar es un derecho. -->','D) Solo los adultos participan. <!-- feedback: Ninos tambien en su comunidad. -->'],
     'La participacion ciudadana tiene muchas formas.'),
    (4,4,4,0.48,'I.E. Manuelita, Neiva. Analisis final.','Relacion entre deberes y derechos.','A cada derecho corresponde un deber. Ej: derecho a educacion implica deber de estudiar.',
     ['B) Derechos y deberes no se relacionan. <!-- feedback: Si se relacionan. -->','C) Los deberes son opcionales. <!-- feedback: Son obligatorios. -->','D) Solo hay derechos. <!-- feedback: Tambien hay deberes. -->'],
     'Derechos y deberes son dos caras de la misma moneda.'),
    (5,5,5,0.40,'I.E. San Jose, Palmira. Evaluacion final.','Que has aprendido este ano en Sociales y Ciudadanas?','Que Colombia es un pais diverso con una rica historia, cultura y geografia, y que todos tenemos derechos y deberes.',
     ['B) Nada importante. <!-- feedback: Muchos aprendizajes. -->','C) Solo geografia. <!-- feedback: Ciudadania tambien. -->','D) Solo historia. <!-- feedback: Geografia y ciudadania. -->'],
     'Este ano aprendimos sobre geografia, historia, derechos, deberes y convivencia en Colombia.'),
]

print("W37-W40 added")

def main():
    weeks = [f"W{w:02d}" for w in range(8, 41)]
    for week in weeks:
        content = generate_bundle(week)
        slug = M[week][0]
        fname = f"COL-SOC-CIU-3-2026-{week}-{slug}-001-MASTERY-bundle.md"
        fpath = os.path.join(OUTDIR, fname)
        with open(fpath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Generated {fname}")

if __name__ == "__main__":
    main()
