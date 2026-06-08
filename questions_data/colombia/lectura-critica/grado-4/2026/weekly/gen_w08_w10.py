#!/usr/bin/env python3
"""Generate W08-W10 bundles for Lectura Critica G4."""
import sys
sys.path.insert(0, r"E:\scripts-python\worldexams\questions_data\colombia\lectura-critica\grado-4\2026\weekly")
from gen_all_v2 import make, opt

make(8, "comparar-contrastar", "Comparar y contrastar informaci\u00f3n",
"comparar, contrastar, semejanzas, diferencias", 0.73, [
("R","L","Semejanza expl\u00edcita.","*\"Bogot\u00e1 y Medell\u00edn son ciudades grandes de Colombia.\"* \u00bfSemejanza?",opt(("A","Son peque\u00f1as.",False),("B","Son ciudades grandes.",True,"Correcto."),("C","Tienen mar.",False),("D","Capitales de pa\u00eds.",False)),"Semejanza."),
("R","L","Diferencia expl\u00edcita.","*\"Bogot\u00e1: capital de Colombia. Medell\u00edn: capital de Antioquia.\"* \u00bfDiferencia?",opt(("A","Bogot\u00e1 m\u00e1s peque\u00f1a.",False),("B","Capital del pa\u00eds vs capital de depto.",True,"Correcto."),("C","Medell\u00edn es capital del pa\u00eds.",False),("D","Son iguales.",False)),"Diferencia."),
("U","G","Comparar animales.","*\"C\u00f3ndor: alas grandes. Colibr\u00ed: alas peque\u00f1as.\"* \u00bfDiferencia?",opt(("A","Ambos aves.",False,"Semejanza."),("B","Alas grandes vs peque\u00f1as.",True,"Correcto."),("C","Ambos vuelan.",False,"Semejanza."),("D","Ambos Colombia.",False,"Semejanza.")),"Contrastar."),
("U","G","Comparar climas.","*\"Costa Caribe: calor. Bogot\u00e1: fr\u00edo nocturno.\"* \u00bfSemejanza?",opt(("A","Ambos fr\u00edos.",False),("B","Ambos tienen clima definido.",True,"Correcto."),("C","Ambos calurosos.",False),("D","Ambos costa.",False)),"Semejanza."),
("U","G","Conector contraste.","*\"A diferencia del caf\u00e9, el arroz se cultiva en zonas planas.\"* \u00bfConector?",opt(("A","caf\u00e9",False),("B","a diferencia de",True,"Correcto."),("C","arroz",False),("D","cultiva",False)),"Conector contraste."),
("Ap","I","Comparar datos.","*\"Colombia: 32 deptos. Ecuador: 24 provincias.\"* \u00bfQu\u00e9 pa\u00eds tiene m\u00e1s?",opt(("A","Ecuador.",False),("B","Colombia.",True,"Correcto."),("C","Iguales.",False),("D","No se sabe.",False)),"Comparar n\u00fameros."),
("Ap","I","Comparar personas.","*\"Ana: alta, tranquila, lee. Luis: bajo, activo, deporte.\"* \u00bfQu\u00e9 comparten?",opt(("A","La altura.",False,"Diferentes."),("B","Tienen gustos y caract. definidas.",True,"Correcto."),("C","Ambos tranquilos.",False),("D","Ambos activos.",False)),"Categor\u00eda com\u00fan."),
("An","I","Organizar comparaci\u00f3n.","*\"Guan\u00e1bana: dulce. Lim\u00f3n: \u00e1cido.\"* \u00bfClasificaci\u00f3n correcta?",opt(("A","Semejanza: ambos \u00e1cidos.",False),("B","Semejanza: frutas. Diferencia: sabor.",True,"Correcto."),("C","Diferencia: ambos dulces.",False),("D","Semejanza: ambos tropicales.",False)),"Organizar comparaci\u00f3n."),
("An","R","Evaluar comparaci\u00f3n.","*\"Comparar tuc\u00e1n (pico grande) con guacamaya (plumas coloridas).\"* \u00bfBuena?",opt(("A","S\u00ed, compara dos aves.",True,"Correcto."),("B","No, diferentes.",False,"V\u00e1lido comparar diferencias."),("C","Solo si iguales.",False),("D","No se comparan aves.",False)),"Evaluar comparaci\u00f3n."),
("An","R","Concluir comparaci\u00f3n.","*\"Colombia tiene r\u00edos. Per\u00fa tambi\u00e9n.\"* \u00bfConclusi\u00f3n?",opt(("A","Solo Colombia.",False),("B","Ambos tienen r\u00edos importantes.",True,"Correcto."),("C","Per\u00fa tiene m\u00e1s.",False),("D","Ninguno.",False)),"Concluir."),
], "Bundle comparar y contrastar.")

make(9, "problema-solucion", "Identificar el problema y la soluci\u00f3n",
"problema, soluci\u00f3n, conflicto, resoluci\u00f3n", 0.73, [
("R","L","Problema expl\u00edcito.","*\"En la escuela no hay suficiente agua potable.\"* \u00bfProblema?",opt(("A","Mucha agua.",False),("B","No hay suficiente agua.",True,"Correcto."),("C","No estudian.",False),("D","Escuela grande.",False)),"Identificar problema."),
("R","L","Soluci\u00f3n expl\u00edcita.","*\"Instalaron tanque de agua lluvia. Ahora hay agua.\"* \u00bfSoluci\u00f3n?",opt(("A","Cerrar escuela.",False),("B","Tanque de agua lluvia.",True,"Correcto."),("C","Comprar agua.",False),("D","Mudarse.",False)),"Soluci\u00f3n."),
("U","G","Problema texto.","*\"Cultivos se secaban por falta de lluvia. Construyeron riego.\"* \u00bfProblema?",opt(("A","Campesinos no trabajaban.",False),("B","Cultivos se secaban.",True,"Correcto."),("C","R\u00edo se desbord\u00f3.",False),("D","Llov\u00eda mucho.",False)),"Problema."),
("U","G","Soluci\u00f3n pedag\u00f3gica.","*\"No entend\u00edan mates. Profe us\u00f3 juegos. Ahora entienden.\"* \u00bfSoluci\u00f3n?",opt(("A","Cambiar profe.",False),("B","Usar juegos did\u00e1cticos.",True,"Correcto."),("C","Cancelar mates.",False),("D","Repetir a\u00f1o.",False)),"Soluci\u00f3n."),
("U","G","Relaci\u00f3n P-S.","*\"Basura acumulada. Jornada de reciclaje.\"* \u00bfRelaci\u00f3n?",opt(("A","Sin relaci\u00f3n.",False),("B","Reciclaje solucion\u00f3 basura.",True,"Correcto."),("C","Basura fue soluci\u00f3n.",False),("D","Colegio cerr\u00f3.",False)),"Relacionar P-S."),
("Ap","I","Proponer soluci\u00f3n.","*\"Parque sin bancas para mayores.\"* \u00bfSoluci\u00f3n?",opt(("A","Cerrar parque.",False),("B","Instalar bancas.",True,"Correcto."),("C","Poner m\u00fasica.",False),("D","Sembrar \u00e1rboles.",False)),"Proponer soluci\u00f3n."),
("Ap","I","Inferir problema.","*\"Ni\u00f1os caminan 2 horas a la escuela.\"* \u00bfProblema?",opt(("A","Buen transporte.",False),("B","Caminan demasiado.",True,"Correcto."),("C","Escuela grande.",False),("D","Juegan en camino.",False)),"Inferir problema."),
("An","I","Evaluar soluciones.","*\"Estudiantes sin libros.\"* \u00bfMejor soluci\u00f3n?",opt(("A","No leer.",False),("B","Biblioteca con donaciones.",True,"Correcto."),("C","Cancelar lectura.",False),("D","Comprar libros caros.",False)),"Mejor soluci\u00f3n."),
("An","R","Estructura textual.","*\"Problema: perros callejeros. Soluci\u00f3n: refugio.\"* \u00bfTipo?",opt(("A","Descriptivo.",False),("B","Problema-soluci\u00f3n.",True,"Correcto."),("C","Po\u00e9tico.",False),("D","Instructivo.",False)),"Identificar estructura."),
("An","R","Texto incompleto.","*\"M\u00e1s carros, m\u00e1s contaminaci\u00f3n.\"* \u00bfQu\u00e9 falta?",opt(("A","Nada.",False),("B","Propuesta de soluci\u00f3n.",True,"Correcto."),("C","Describir carros.",False),("D","Opini\u00f3n del autor.",False)),"Estructura incompleta."),
], "Bundle problema-soluci\u00f3n.")

make(10, "repaso-p2", "Repaso P2",
"repaso: inferencias, comparar, problema-soluci\u00f3n", 0.70, [
("U","G","Repaso inferir causa.","*\"Mar\u00eda se resfri\u00f3 porque jug\u00f3 bajo la lluvia.\"* \u00bfCausa?",opt(("A","Jugar bajo la lluvia.",True,"Correcto."),("B","Comer helado.",False),("C","Dormir poco.",False),("D","Leer mucho.",False)),"Repaso causa."),
("U","G","Repaso consecuencia.","*\"Sol derriti\u00f3 hielo, se form\u00f3 charco.\"* \u00bfConsecuencia?",opt(("A","M\u00e1s hielo.",False),("B","Charco de agua.",True,"Correcto."),("C","Llovi\u00f3.",False),("D","Fr\u00edo.",False)),"Repaso consecuencia."),
("U","G","Repaso contrastar.","*\"Perro ladra. Gato ma\u00faa.\"* \u00bfDiferencia?",opt(("A","Ambos mascotas.",False,"Semejanza."),("B","Ladra vs ma\u00faa.",True,"Correcto."),("C","Ambos 4 patas.",False,"Semejanza."),("D","Ambos animales.",False,"Semejanza.")),"Repaso contrastar."),
("R","L","Repaso problema.","*\"No hab\u00eda l\u00e1pices en el sal\u00f3n.\"* \u00bfProblema?",opt(("A","Muchos l\u00e1pices.",False),("B","No hay l\u00e1pices.",True,"Correcto."),("C","Muchas sillas.",False),("D","Pupitres nuevos.",False)),"Repaso problema."),
("R","L","Repaso soluci\u00f3n.","*\"Profe consigui\u00f3 l\u00e1pices para todos.\"* \u00bfSoluci\u00f3n?",opt(("A","Comprar l\u00e1pices.",True,"Correcto."),("B","Cancelar clase.",False),("C","Enviar a casa.",False),("D","No escribir.",False)),"Repaso soluci\u00f3n."),
("Ap","I","Repaso causa-efecto.","*\"\u00c1rbol no creci\u00f3 porque no le llegaba sol.\"* \u00bfCausa?",opt(("A","No le llegaba sol.",True,"Correcto."),("B","No creci\u00f3.",False,"Efecto."),("C","\u00c1rbol peque\u00f1o.",False),("D","Llov\u00eda mucho.",False)),"Repaso causa."),
("An","I","Repaso tipo comparaci\u00f3n.","*\"Tortuga lenta. Conejo r\u00e1pido.\"* \u00bfTipo?",opt(("A","Semejanza.",False),("B","Contraste.",True,"Correcto."),("C","Igualdad.",False),("D","Identidad.",False)),"Repaso tipo."),
("An","R","Repaso evaluar soluci\u00f3n.","*\"Estudiantes tienen sed en clase.\"* \u00bfMejor soluci\u00f3n?",opt(("A","No tomar agua.",False),("B","Poner dispensador de agua.",True,"Correcto."),("C","Cancelar clase.",False),("D","Enviarlos a casa.",False)),"Repaso evaluar."),
("An","R","Repaso relaci\u00f3n.","*\"No estudi\u00f3, por lo tanto reprob\u00f3.\"* \u00bfRelaci\u00f3n?",opt(("A","Comparaci\u00f3n.",False),("B","Causa-consecuencia.",True,"Correcto."),("C","Problema-soluci\u00f3n.",False),("D","Secuencia.",False)),"Repaso tipo relaci\u00f3n."),
("An","R","Repaso estructura.","*\"La biblioteca no tiene libros nuevos.\"* \u00bfQu\u00e9 falta?",opt(("A","Describir biblioteca.",False),("B","Proponer soluci\u00f3n.",True,"Correcto."),("C","Poner fotos.",False),("D","Nada.",False)),"Repaso estructura."),
], "Bundle repaso P2.")
