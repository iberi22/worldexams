#!/usr/bin/env python3
"""Generate W26-W30 bundles for Lectura Critica G4."""
import sys
sys.path.insert(0, r"E:\scripts-python\worldexams\questions_data\colombia\lectura-critica\grado-4\2026\weekly")
from gen_all_v2 import make, opt

make(26, "proposito-autor", "Identificar prop\u00f3sito del autor",
"prop\u00f3sito del autor, intenci\u00f3n, informar, persuadir, entretener", 0.72, [
("R","L","Prop\u00f3sito.","*\"\u00bfQu\u00e9 es el prop\u00f3sito de un texto?\"*",opt(("A","El t\u00edtulo.",False),("B","La intenci\u00f3n del autor al escribirlo.",True,"Correcto."),("C","La cantidad de p\u00e1ginas.",False),("D","El autor.",False)),"Definici\u00f3n."),
("R","L","Informar.","*\"Un texto que solo da datos y hechos. Su prop\u00f3sito es...\"*",opt(("A","Entretener.",False),("B","Informar.",True,"Correcto."),("C","Persuadir.",False),("D","Describir.",False)),"Informar."),
("U","G","Entretener.","*\"Un cuento de hadas. \u00bfProp\u00f3sito?\"*",opt(("A","Informar.",False),("B","Entretener.",True,"Correcto."),("C","Vender.",False),("D","Ense\u00f1ar.",False)),"Entretener."),
("U","G","Persuadir.","*\"Un anuncio que dice \u2018Compra este producto\u2019. \u00bfProp\u00f3sito?\"*",opt(("A","Informar.",False),("B","Persuadir.",True,"Correcto."),("C","Entretener.",False),("D","Narrar.",False)),"Persuadir."),
("U","G","Identificar prop\u00f3sito.","*\"Texto que explica c\u00f3mo reciclar. \u00bfProp\u00f3sito?\"*",opt(("A","Entretener.",False),("B","Informar y ense\u00f1ar.",True,"Correcto."),("C","Vender.",False),("D","Asustar.",False)),"Prop\u00f3sito."),
("Ap","I","Diferenciar.","*\"Noticia: \u2018Aument\u00f3 el precio del caf\u00e9\u2019 vs Aviso: \u2018Compra nuestro caf\u00e9\u2019.\"* \u00bfDiferencias?",opt(("A","Ambos informan.",False),("B","Noticia informa, aviso persuade.",True,"Correcto."),("C","Ambos venden.",False),("D","Noticia entretiene.",False)),"Diferenciar prop\u00f3sitos."),
("Ap","I","Inferir prop\u00f3sito.","*\"Texto que dice \u2018\u00danete a la campa\u00f1a de limpieza\u2019.\"* \u00bfProp\u00f3sito?",opt(("A","Informar solo.",False),("B","Persuadir a participar.",True,"Correcto."),("C","Entretener.",False),("D","Describir.",False)),"Inferir."),
("An","I","Comparar textos.","*\"Poema vs noticia. \u00bfDiferencia de prop\u00f3sito?\"*",opt(("A","Ambos informan.",False),("B","Poema entretiene, noticia informa.",True,"Correcto."),("C","Ambos entretienen.",False),("D","Poema informa.",False)),"Comparar."),
("An","R","Evaluar.","*\"\u00bfPor qu\u00e9 es importante saber el prop\u00f3sito del autor?\"*",opt(("A","No es importante.",False),("B","Para entender mejor el texto y no ser enga\u00f1ado.",True,"Correcto."),("C","Para saber cu\u00e1nto leer.",False),("D","Para memorizar.",False)),"Importancia."),
("An","R","Aplicar.","*\"Un art\u00edculo de revista sobre un nuevo tel\u00e9fono. \u00bfPodr\u00eda tener m\u00e1s de un prop\u00f3sito?\"*",opt(("A","No, solo uno.",False),("B","S\u00ed, informar y persuadir.",True,"Correcto."),("C","Solo entretener.",False),("D","Ninguno.",False)),"M\u00faltiples prop\u00f3sitos."),
], "Bundle prop\u00f3sito del autor.")

make(27, "destinatario-texto", "Identificar destinatario del texto",
"destinatario, audiencia, lector ideal, p\u00fablico objetivo", 0.73, [
("R","L","Definici\u00f3n.","*\"\u00bfQui\u00e9n es el destinatario de un texto?\"*",opt(("A","El autor.",False),("B","La persona a quien va dirigido.",True,"Correcto."),("C","El editor.",False),("D","El profesor.",False)),"Definir."),
("R","L","Destinatario.","*\"Un cuento infantil. \u00bfSu destinatario?\"*",opt(("A","Adultos.",False),("B","Ni\u00f1os.",True,"Correcto."),("C","M\u00e9dicos.",False),("D","Ingenieros.",False)),"Identificar."),
("U","G","P\u00fablico.","*\"Un manual de instrucciones para armar un juguete. \u00bfDestinatario?\"*",opt(("A","Beb\u00e9s.",False),("B","Padres o adultos.",True,"Correcto."),("C","Mascotas.",False),("D","Animales.",False)),"Audiencia."),
("U","G","Lenguaje.","*\"Un texto para ni\u00f1os usa un lenguaje...\"*",opt(("A","Complejo.",False),("B","Sencillo y claro.",True,"Correcto."),("C","T\u00e9cnico.",False),("D","Cient\u00edfico.",False)),"Lenguaje."),
("U","G","Adaptaci\u00f3n.","*\"\u00bfPor qu\u00e9 un libro de ciencias para grado 4 es diferente a uno para universitarios?\"*",opt(("A","Por el destinatario, su edad y conocimientos.",True,"Correcto."),("B","Por el autor.",False),("C","Por el precio.",False),("D","Por el color.",False)),"Adaptar."),
("Ap","I","Inferir destinatario.","*\"\u2018Lleva tu carro al taller m\u00e1s cercano\u2019.\"* \u00bfDestinatario?",opt(("A","Ni\u00f1os.",False),("B","Due\u00f1os de carros.",True,"Correcto."),("C","Mascotas.",False),("D","M\u00e9dicos.",False)),"Inferir."),
("Ap","I","Destinatario y contenido.","*\"Texto con muchas im\u00e1genes y poco texto. \u00bfPara qui\u00e9n?\"*",opt(("A","Adultos.",False),("B","Ni\u00f1os peque\u00f1os.",True,"Correcto."),("C","Cient\u00edficos.",False),("D","Arquitectos.",False)),"Audiencia visual."),
("An","I","Comparar destinatarios.","*\"Texto A: \u2018\u00c9rase una vez...\u2019. Texto B: \u2018Seg\u00fan el art\u00edculo 15...\u2019.\"* \u00bfDiferencia?",opt(("A","Mismo destinatario.",False),("B","Texto A para ni\u00f1os, Texto B para adultos.",True,"Correcto."),("C","Ambos para ni\u00f1os.",False),("D","Ambos para abogados.",False)),"Comparar."),
("An","R","Evaluar.","*\"Un texto de medicina para ni\u00f1os de 8 a\u00f1os. \u00bfEs adecuado?\"*",opt(("A","S\u00ed, cualquier texto sirve.",False),("B","No, usa lenguaje muy t\u00e9cnico.",True,"Correcto."),("C","S\u00ed, es bueno.",False),("D","No importa.",False)),"Evaluar adecuaci\u00f3n."),
("An","R","Importancia.","*\"\u00bfPor qu\u00e9 un autor debe pensar en su destinatario?\"*",opt(("A","No es necesario.",False),("B","Para que el texto sea comprensible y \u00fatil.",True,"Correcto."),("C","Por obligaci\u00f3n.",False),("D","Para vender m\u00e1s.",False)),"Importancia."),
], "Bundle destinatario.")

make(28, "repaso-p5", "Repaso P5",
"repaso: hechos-opiniones, prop\u00f3sito, destinatario", 0.70, [
("U","G","Hecho.","*\"\u2018La Tierra gira alrededor del Sol\u2019. \u00bfHecho u opini\u00f3n?\"*",opt(("A","Hecho.",True,"Correcto."),("B","Opini\u00f3n.",False),("C","Ambos.",False),("D","Ninguno.",False)),"Repaso hecho."),
("U","G","Opini\u00f3n.","*\"\u2018El helado de chocolate es el mejor\u2019. \u00bfHecho u opini\u00f3n?\"*",opt(("A","Hecho.",False),("B","Opini\u00f3n.",True,"Correcto."),("C","Ambos.",False),("D","Dato.",False)),"Repaso opini\u00f3n."),
("U","G","Prop\u00f3sito.","*\"Un texto que te invita a donar. \u00bfProp\u00f3sito?\"*",opt(("A","Informar.",False),("B","Persuadir.",True,"Correcto."),("C","Entretener.",False),("D","Describir.",False)),"Repaso prop\u00f3sito."),
("R","L","Destinatario.","*\"Un cuento de terror. \u00bfDestinatario probable?\"*",opt(("A","Beb\u00e9s.",False),("B","J\u00f3venes y adultos.",True,"Correcto."),("C","Mascotas.",False),("D","Plantas.",False)),"Repaso destinatario."),
("U","G","Lenguaje para ni\u00f1os.","*\"\u00bfC\u00f3mo debe ser el lenguaje para ni\u00f1os peque\u00f1os?\"*",opt(("A","Complejo y t\u00e9cnico.",False),("B","Sencillo con im\u00e1genes.",True,"Correcto."),("C","Solo palabras largas.",False),("D","Sin im\u00e1genes.",False)),"Repaso lenguaje."),
("Ap","I","Identificar prop\u00f3sito.","*\"Receta de cocina. \u00bfProp\u00f3sito principal?\"*",opt(("A","Entretener.",False),("B","Ense\u00f1ar a preparar algo.",True,"Correcto."),("C","Vender.",False),("D","Opinar.",False)),"Repaso."),
("An","I","Hecho vs opini\u00f3n en texto.","*\"El perro es el mejor amigo del hombre (opini\u00f3n). Los perros tienen 42 dientes (hecho).\"* \u00bfSeparaci\u00f3n?",opt(("A","Ambos hechos.",False),("B","1ra opini\u00f3n, 2do hecho.",True,"Correcto."),("C","Ambos opiniones.",False),("D","1ro hecho, 2do opini\u00f3n.",False)),"Repaso separar."),
("An","R","Destinatario inadecuado.","*\"Texto de f\u00edsica cu\u00e1ntica para grado 4. \u00bfAdecuado?\"*",opt(("A","S\u00ed, es bueno.",False),("B","No, es muy avanzado para su edad.",True,"Correcto."),("C","S\u00ed, los ni\u00f1os pueden.",False),("D","Da igual.",False)),"Repaso evaluar."),
("An","R","Prop\u00f3sito m\u00faltiple.","*\"Un peri\u00f3dico escolar. \u00bfCu\u00e1ntos prop\u00f3sitos puede tener?\"*",opt(("A","Solo informar.",False),("B","Informar y entretener.",True,"Correcto."),("C","Solo entretener.",False),("D","Solo vender.",False)),"Repaso m\u00faltiple."),
("Ap","I","Relacionar.","*\"Texto sobre reciclaje para ni\u00f1os. \u00bfQu\u00e9 debe tener?\"*",opt(("A","Lenguaje t\u00e9cnico.",False),("B","Lenguaje simple, im\u00e1genes, ejemplos.",True,"Correcto."),("C","Solo n\u00fameros.",False),("D","Solo texto.",False)),"Repaso relacionar."),
], "Bundle repaso P5.")

make(29, "textos-discontinuos-tablas-horarios", "Textos discontinuos: tablas y horarios",
"tablas, horarios, lectura de datos, texto discontinuo", 0.74, [
("R","L","Leer tabla.","*\"Tabla: Lunes: mates, martes: ciencias. \u00bfQu\u00e9 hay el lunes?\"*",opt(("A","Ciencias.",False),("B","Mates.",True,"Correcto."),("C","Nada.",False),("D","Recreo.",False)),"Leer tabla."),
("R","L","Hora.","*\"Horario: 8-9 am: Matem\u00e1ticas. \u00bfA qu\u00e9 hora son mates?\"*",opt(("A","7-8 am.",False),("B","8-9 am.",True,"Correcto."),("C","9-10 am.",False),("D","10-11 am.",False)),"Leer hora."),
("U","G","Interpretar.","*\"Tabla de comidas: lunes: arroz, martes: pasta, mi\u00e9rcoles: sopa. \u00bfQu\u00e9 d\u00eda hay sopa?\"*",opt(("A","Lunes.",False),("B","Martes.",False),("C","Mi\u00e9rcoles.",True,"Correcto."),("D","Jueves.",False)),"Interpretar."),
("U","G","Comparar datos.","*\"Tabla: Juan: 10 a\u00f1os. Ana: 9 a\u00f1os. \u00bfQui\u00e9n es mayor?\"*",opt(("A","Ana.",False),("B","Juan.",True,"Correcto."),("C","Iguales.",False),("D","No se puede.",False)),"Comparar."),
("U","G","Columnas.","*\"\u00bfQu\u00e9 informaci\u00f3n dan los encabezados de las columnas?\"*",opt(("A","El t\u00edtulo de la tabla.",False),("B","Qu\u00e9 tipo de dato hay en cada columna.",True,"Correcto."),("C","Los n\u00fameros.",False),("D","Las filas.",False)),"Encabezados."),
("Ap","I","Localizar dato.","*\"Tabla de precios: manzana $500, pera $600. \u00bfCu\u00e1nto cuesta la pera?\"*",opt(("A","$500.",False),("B","$600.",True,"Correcto."),("C","$700.",False),("D","$400.",False)),"Localizar."),
("Ap","I","Ordenar por tabla.","*\"Tabla: lunes-viernes horario escolar. \u00bfQu\u00e9 d\u00eda hay m\u00e1s materias?\"*",opt(("A","Lunes.",True,"Correcto."),("B","No se puede.",False),("C","Todos igual.",False),("D","Mi\u00e9rcoles.",False)),"Ordenar."),
("An","I","Analizar tabla.","*\"Tabla con temperaturas: lunes 30\u00b0, martes 32\u00b0, mi\u00e9rcoles 28\u00b0. \u00bfD\u00eda m\u00e1s caliente?\"*",opt(("A","Lunes.",False),("B","Martes.",True,"Correcto. 32\u00b0 es mayor."),("C","Mi\u00e9rcoles.",False),("D","Todos igual.",False)),"Analizar."),
("An","R","Utilidad.","*\"\u00bfPara qu\u00e9 sirven las tablas?\"*",opt(("A","Solo decorar.",False),("B","Organizar informaci\u00f3n para leerla f\u00e1cilmente.",True,"Correcto."),("C","Para confundir.",False),("D","No sirven.",False)),"Utilidad."),
("An","R","Crear.","*\"\u00bfQu\u00e9 necesitas para hacer una tabla?\"*",opt(("A","Palabras y n\u00fameros ordenados en filas y columnas.",True,"Correcto."),("B","Solo dibujos.",False),("C","Solo n\u00fameros.",False),("D","Solo texto.",False)),"Crear tabla."),
], "Bundle tablas-horarios.")

make(30, "textos-discontinuos-graficas", "Textos discontinuos: gr\u00e1ficas sencillas",
"gr\u00e1ficas, barras, pictogramas, interpretaci\u00f3n visual", 0.73, [
("R","L","Gr\u00e1fica.","*\"\u00bfQu\u00e9 muestra una gr\u00e1fica de barras?\"*",opt(("A","Solo texto.",False),("B","Datos visualmente en barras.",True,"Correcto."),("C","Sonidos.",False),("D","Im\u00e1genes.",False)),"Qu\u00e9 es."),
("R","L","Eje.","*\"El eje vertical de una gr\u00e1fica muestra...\"*",opt(("A","Las categor\u00edas.",False),("B","Las cantidades.",True,"Correcto."),("C","Los colores.",False),("D","Los t\u00edtulos.",False)),"Eje."),
("U","G","Leer gr\u00e1fica.","*\"Barra m\u00e1s alta: 50, barra m\u00e1s baja: 10. \u00bfCu\u00e1l es el valor mayor?\"*",opt(("A","10.",False),("B","50.",True,"Correcto."),("C","40.",False),("D","60.",False)),"Leer."),
("U","G","Comparar.","*\"Barra A: 30, Barra B: 45. \u00bfCu\u00e1l es mayor?\"*",opt(("A","A.",False),("B","B.",True,"Correcto."),("C","Iguales.",False),("D","No se ve.",False)),"Comparar."),
("U","G","Pictograma.","*\"Un pictograma usa...\"*",opt(("A","N\u00fameros solo.",False),("B","Dibujos para representar cantidades.",True,"Correcto."),("C","Letras.",False),("D","Sonidos.",False)),"Pictograma."),
("Ap","I","Interpretar.","*\"Gr\u00e1fica: lunes: 5 libros, martes: 8, mi\u00e9rcoles: 3. \u00bfD\u00eda con m\u00e1s libros?\"*",opt(("A","Lunes.",False),("B","Martes.",True,"Correcto."),("C","Mi\u00e9rcoles.",False),("D","Todos.",False)),"Interpretar."),
("Ap","I","Total.","*\"Suma: 5+8+3 de la gr\u00e1fica. \u00bfTotal de libros?\"*",opt(("A","15.",False),("B","16.",True,"Correcto."),("C","17.",False),("D","18.",False)),"Calcular total."),
("An","I","Analizar tendencia.","*\"Gr\u00e1fica: lunes 10, martes 15, mi\u00e9rcoles 20. \u00bfQu\u00e9 tendencia hay?\"*",opt(("A","Baja.",False),("B","Sube.",True,"Correcto."),("C","Constante.",False),("D","No hay.",False)),"Tendencia."),
("An","R","\u00bfQu\u00e9 preguntas responde?","*\"\u00bfQu\u00e9 tipo de preguntas responde una gr\u00e1fica?\"*",opt(("A","\u00bfCu\u00e1nto?, \u00bfCu\u00e1l es mayor?.",True,"Correcto."),("B","\u00bfPor qu\u00e9? (causas).",False,"Eso no se ve en gr\u00e1fica simple."),("C","\u00bfC\u00f3mo se siente?.",False),("D","\u00bfQui\u00e9n lo hizo?.",False)),"Tipo preguntas."),
("An","R","Evaluar.","*\"\u00bfSon \u00fatiles las gr\u00e1ficas para entender datos r\u00e1pido?\"*",opt(("A","No, confunden.",False),("B","S\u00ed, resumen mucha informaci\u00f3n visualmente.",True,"Correcto."),("C","Son decorativas.",False),("D","Solo para ni\u00f1os.",False)),"Utilidad."),
], "Bundle gr\u00e1ficas.")
