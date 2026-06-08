#!/usr/bin/env python3
"""Append W26-W35 questions"""
import os
DIR = 'E:/scripts-python/worldexams/questions_data/colombia/sociales-ciudadanas/grado-3/2026/weekly'
with open(os.path.join(DIR, 'gen_all.py'), 'r', encoding='utf-8') as f:
    old = f.read()
marker = "def main():"
parts = old.split(marker)
chunk = '''
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
'''
with open(os.path.join(DIR, 'gen_all.py'), 'w', encoding='utf-8') as f:
    f.write(parts[0] + chunk + '\n' + marker + parts[1])
print("Appended W26-W30 successfully")
