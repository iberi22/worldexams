#!/usr/bin/env python3
"""Generate W31-W35 bundles for Lectura Critica G4."""
import sys
sys.path.insert(0, r"E:\scripts-python\worldexams\questions_data\colombia\lectura-critica\grado-4\2026\weekly")
from gen_all_v2 import make, opt

make(31, "textos-discontinuos-mapas-diagramas", "Textos discontinuos: mapas y diagramas",
"mapas, diagramas, lectura visual, organizaci\u00f3n espacial", 0.72, [
("R","L","Mapa.","*\"\u00bfQu\u00e9 muestra un mapa?\"*",opt(("A","Una receta.",False),("B","Lugares y c\u00f3mo llegar.",True,"Correcto."),("C","Un cuento.",False),("D","Una canci\u00f3n.",False)),"Mapa."),
("R","L","Rosa vientos.","*\"La rosa de los vientos en un mapa indica...\"*",opt(("A","La hora.",False),("B","Los puntos cardinales.",True,"Correcto."),("C","Los nombres.",False),("D","Las monta\u00f1as.",False)),"Puntos cardinales."),
("U","G","Leer mapa.","*\"En un mapa de Colombia, Bogot\u00e1 est\u00e1 en el centro. \u00bfQu\u00e9 informaci\u00f3n da?\"*",opt(("A","La poblaci\u00f3n.",False),("B","La ubicaci\u00f3n de Bogot\u00e1.",True,"Correcto."),("C","El clima.",False),("D","La comida.",False)),"Leer mapa."),
("U","G","Diagrama.","*\"\u00bfQu\u00e9 es un diagrama?\"*",opt(("A","Un texto largo.",False),("B","Un dibujo que explica un proceso.",True,"Correcto."),("C","Una tabla.",False),("D","Un poema.",False)),"Diagrama."),
("U","G","S\u00edmbolos.","*\"Los s\u00edmbolos en un mapa representan...\"*",opt(("A","Nada.",False),("B","Lugares o caracter\u00edsticas (ej: iglesia, hospital).",True,"Correcto."),("C","N\u00fameros.",False),("D","Letras.",False)),"S\u00edmbolos."),
("Ap","I","Interpretar diagrama.","*\"Diagrama del ciclo del agua: evaporaci\u00f3n, condensaci\u00f3n, precipitaci\u00f3n. \u00bfQu\u00e9 sigue a evaporaci\u00f3n?\"*",opt(("A","Precipitaci\u00f3n.",False),("B","Condensaci\u00f3n.",True,"Correcto."),("C","Nada.",False),("D","Evaporaci\u00f3n otra vez.",False)),"Interpretar."),
("Ap","I","Ubicar en mapa.","*\"En un mapa, el parque est\u00e1 al norte de la escuela. \u00bfD\u00f3nde buscar?\"*",opt(("A","Al sur.",False),("B","Al norte.",True,"Correcto."),("C","Al este.",False),("D","Al oeste.",False)),"Ubicar."),
("An","I","Comparar mapa de 1600 vs hoy.","*\"Mapa antiguo de Colombia vs actual. \u00bfQu\u00e9 cambia?\"*",opt(("A","Nada.",False),("B","L\u00edmites, nombres y geograf\u00eda.",True,"Correcto."),("C","Solo el color.",False),("D","Los oc\u00e9anos.",False)),"Analizar."),
("An","R","Utilidad.","*\"\u00bfPara qu\u00e9 sirven los mapas y diagramas?\"*",opt(("A","Solo decorar.",False),("B","Organizar y entender informaci\u00f3n visual.",True,"Correcto."),("C","Para jugar.",False),("D","No sirven.",False)),"Utilidad."),
("An","R","Crear.","*\"\u00bfQu\u00e9 necesitas para hacer un diagrama simple?\"*",opt(("A","Palabras, flechas y cajas.",True,"Correcto."),("B","Solo dibujos.",False),("C","Solo colores.",False),("D","Solo texto.",False)),"Crear."),
], "Bundle mapas-diagramas.")

make(32, "repaso-p6", "Repaso P6",
"repaso: textos discontinuos, tablas, gr\u00e1ficas, mapas", 0.70, [
("R","L","Tabla.","*\"\u00bfQu\u00e9 organiza una tabla?\"*",opt(("A","Datos en filas y columnas.",True,"Correcto."),("B","Solo texto.",False),("C","Dibujos.",False),("D","Sonidos.",False)),"Repaso tabla."),
("R","L","Gr\u00e1fica.","*\"\u00bfQu\u00e9 muestra una gr\u00e1fica de barras?\"*",opt(("A","Cantidades comparadas.",True,"Correcto."),("B","Palabras.",False),("C","Recetas.",False),("D","Cuentos.",False)),"Repaso gr\u00e1fica."),
("U","G","Mapa.","*\"Los puntos cardinales son: Norte, Sur, Este y...\"*",opt(("A","Oeste.",True,"Correcto."),("B","Arriba.",False),("C","Centro.",False),("D","Abajo.",False)),"Repaso mapa."),
("U","G","Interpretar tabla.","*\"Tabla: manzana $500, pera $600. \u00bfCu\u00e1l es m\u00e1s cara?\"*",opt(("A","Manzana.",False),("B","Pera.",True,"Correcto."),("C","Igual.",False),("D","Ninguna.",False)),"Repaso interpretar."),
("U","G","Barra m\u00e1s alta.","*\"En una gr\u00e1fica, la barra m\u00e1s alta indica...\"*",opt(("A","El valor menor.",False),("B","El valor mayor.",True,"Correcto."),("C","Nada.",False),("D","El promedio.",False)),"Repaso gr\u00e1fica."),
("Ap","I","Diagrama.","*\"Diagrama: c\u00edrculo, flecha a cuadrado. \u00bfQu\u00e9 muestra?\"*",opt(("A","Un proceso con pasos.",True,"Correcto."),("B","Un cuento.",False),("C","Un paisaje.",False),("D","Un mapa.",False)),"Repaso diagrama."),
("An","I","Diferencia.","*\"\u00bfDiferencia entre tabla y gr\u00e1fica?\"*",opt(("A","Son iguales.",False),("B","Tabla usa n\u00fameros, gr\u00e1fica usa barras visuales.",True,"Correcto."),("C","Tabla es visual, gr\u00e1fica es texto.",False),("D","No hay.",False)),"Repaso diferencias."),
("An","R","Cu\u00e1l usar.","*\"Para comparar cantidades r\u00e1pido, \u00bfcu\u00e1l es mejor?\"*",opt(("A","Un cuento.",False),("B","Una gr\u00e1fica de barras.",True,"Correcto."),("C","Un poema.",False),("D","Una receta.",False)),"Repaso mejor herramienta."),
("An","R","Evaluar.","*\"\u00bfSon los textos discontinuos \u00fatiles en la vida diaria?\"*",opt(("A","No, solo en la escuela.",False),("B","S\u00ed, horarios, mapas, gr\u00e1ficas.",True,"Correcto."),("C","No, confunden.",False),("D","Solo para adultos.",False)),"Repaso utilidad."),
("Ap","I","Aplicar.","*\"Necesitas mostrar cu\u00e1ntos libros leyeron 4 cursos. \u00bfQu\u00e9 usas?\"*",opt(("A","Un cuento.",False),("B","Una gr\u00e1fica de barras.",True,"Correcto."),("C","Un poema.",False),("D","Un mapa.",False)),"Repaso aplicar."),
], "Bundle repaso P6.")

make(33, "inferencias-imagenes", "Inferencias a partir de im\u00e1genes",
"inferencia, im\u00e1genes, interpretaci\u00f3n visual, lectura de imagen", 0.74, [
("R","L","Imagen.","*\"\u00bfQu\u00e9 informaci\u00f3n puede dar una imagen?\"*",opt(("A","Ninguna.",False),("B","Lugares, acciones, emociones.",True,"Correcto."),("C","Solo colores.",False),("D","Solo formas.",False)),"Info imagen."),
("R","L","Detalle.","*\"Imagen: un ni\u00f1o con paraguas. \u00bfQu\u00e9 ves?\"*",opt(("A","Un ni\u00f1o con paraguas.",True,"Correcto."),("B","Que est\u00e1 en la playa.",False,"No se ve."),("C","Que es de noche.",False),("D","Que est\u00e1 comiendo.",False)),"Observar."),
("U","G","Inferir clima.","*\"Imagen: personas con paraguas y chaquetas. \u00bfQu\u00e9 clima es?\"*",opt(("A","Soleado.",False),("B","Lluvioso.",True,"Correcto."),("C","Caluroso.",False),("D","Nevado.",False)),"Inferir clima."),
("U","G","Inferir emoci\u00f3n.","*\"Imagen: persona sonriendo con trofeo. \u00bfC\u00f3mo se siente?\"*",opt(("A","Triste.",False),("B","Feliz y orgullosa.",True,"Correcto."),("C","Enojada.",False),("D","Aburrida.",False)),"Inferir emoci\u00f3n."),
("U","G","Inferir lugar.","*\"Imagen: agua, arena, palmeras, sol. \u00bfD\u00f3nde es?\"*",opt(("A","Monta\u00f1a.",False),("B","Playa.",True,"Correcto."),("C","Ciudad.",False),("D","Desierto fr\u00edo.",False)),"Inferir lugar."),
("Ap","I","Acci\u00f3n.","*\"Imagen: persona sosteniendo un libro y se\u00f1alando una palabra. \u00bfQu\u00e9 hace?\"*",opt(("A","Cocina.",False),("B","Lee y se\u00f1ala.",True,"Correcto."),("C","Duerme.",False),("D","Corre.",False)),"Inferir acci\u00f3n."),
("Ap","I","Relaci\u00f3n.","*\"Imagen: ni\u00f1o abrazando a una abuela. \u00bfQu\u00e9 relaci\u00f3n hay?\"*",opt(("A","Son extra\u00f1os.",False),("B","Son familia, se quieren.",True,"Correcto."),("C","Est\u00e1n peleando.",False),("D","Son amigos.",False)),"Inferir relaci\u00f3n."),
("An","I","Deducir hora.","*\"Imagen: cielo anaranjado, personas saliendo de trabajar. \u00bfQu\u00e9 hora es?\"*",opt(("A","Mediod\u00eda.",False),("B","Atardecer/tarde.",True,"Correcto."),("C","Madrugada.",False),("D","Medianoche.",False)),"Deducir hora."),
("An","R","Evaluar.","*\"\u00bfPuede una imagen contar una historia completa?\"*",opt(("A","No, solo texto.",False),("B","S\u00ed, puede narrar con elementos visuales.",True,"Correcto."),("C","No, es solo decoraci\u00f3n.",False),("D","Solo si tiene palabras.",False)),"Narrativa visual."),
("An","R","Relacionar.","*\"\u00bfEs m\u00e1s f\u00e1cil entender algo con imagen y texto?\"*",opt(("A","Solo texto es mejor.",False),("B","S\u00ed, la imagen complementa.",True,"Correcto."),("C","No, distrae.",False),("D","Da igual.",False)),"Complemento."),
], "Bundle inferencias-im\u00e1genes.")

make(34, "relaciones-texto-imagen", "Relaciones entre texto e imagen",
"relaci\u00f3n texto-imagen, complementariedad, anclaje, redundancia", 0.73, [
("R","L","Texto e imagen.","*\"\u00bfQu\u00e9 relaci\u00f3n puede haber entre texto e imagen?\"*",opt(("A","Ninguna.",False),("B","Pueden complementarse o repetir informaci\u00f3n.",True,"Correcto."),("C","Siempre dicen lo mismo.",False),("D","Son independientes.",False)),"Relaci\u00f3n."),
("R","L","Complemento.","*\"Texto: \u2018El gato es negro\u2019. Imagen: gato negro. \u00bfQu\u00e9 relaci\u00f3n hay?\"*",opt(("A","Repiten.",True,"Correcto. Redundancia."),("B","Se contradicen.",False),("C","No se relacionan.",False),("D","Son opuestas.",False)),"Redundancia."),
("U","G","Anclaje.","*\"Texto: \u2018Este es un tuc\u00e1n\u2019. Imagen: ave. \u00bfQu\u00e9 hace el texto?\"*",opt(("A","Crea confusi\u00f3n.",False),("B","Identifica lo que se ve.",True,"Correcto. Ancla el significado."),("C","Contradice.",False),("D","Ignora.",False)),"Anclaje."),
("U","G","Contradicci\u00f3n.","*\"Texto: \u2018Hace fr\u00edo\u2019. Imagen: sol brillante, personas en traje de ba\u00f1o. \u00bfQu\u00e9 pasa?\"*",opt(("A","Coinciden.",False),("B","Se contradicen.",True,"Correcto."),("C","No se relacionan.",False),("D","Se complementan.",False)),"Contradicci\u00f3n."),
("U","G","Complemento.","*\"Texto: \u2018El caf\u00e9 colombiano\u2019. Imagen: monta\u00f1as y cafetales. \u00bfQu\u00e9 hace la imagen?\"*",opt(("A","Contradecir.",False),("B","Complementar mostrando el paisaje.",True,"Correcto."),("C","Ignorar.",False),("D","Repetir exactamente.",False)),"Complemento."),
("Ap","I","Inferir informaci\u00f3n.","*\"Texto: \u2018La ciudad tiene 10 parques\u2019. Imagen: mapa con puntos verdes. \u00bfQu\u00e9 informaci\u00f3n adicional da la imagen?\"*",opt(("A","La ubicaci\u00f3n de los parques.",True,"Correcto."),("B","Los nombres.",False),("C","Los precios.",False),("D","La historia.",False)),"Info adicional."),
("Ap","I","Elegir imagen.","*\"Texto sobre el oso de anteojos. \u00bfQu\u00e9 imagen elegir?\"*",opt(("A","Un \u00e1rbol.",False),("B","Un oso de anteojos en su h\u00e1bitat.",True,"Correcto."),("C","Un carro.",False),("D","Un libro.",False)),"Elegir."),
("An","I","Analizar.","*\"Texto dice \u201810 juguetes\u2019, imagen muestra 3. \u00bfQu\u00e9 problema hay?\"*",opt(("A","Ninguno.",False),("B","La imagen no coincide con el texto.",True,"Correcto."),("C","Es mejor.",False),("D","La imagen aclara.",False)),"Analizar discrepancia."),
("An","R","Evaluar.","*\"\u00bfPor qu\u00e9 los libros infantiles tienen muchas im\u00e1genes?\"*",opt(("A","Para que sean m\u00e1s caros.",False),("B","Ayudan a entender el texto.",True,"Correcto."),("C","Por moda.",False),("D","No son necesarias.",False)),"Evaluar."),
("An","R","Crear.","*\"\u00bfQu\u00e9 imagen pondr\u00edas junto al texto \u2018La ballena jorobada\u2019?\"*",opt(("A","Un carro.",False),("B","Una ballena saltando.",True,"Correcto."),("C","Un \u00e1rbol.",False),("D","Una casa.",False)),"Crear relaci\u00f3n."),
], "Bundle relaci\u00f3n texto-imagen.")

make(35, "secuencias-logicas-textos", "Secuencias l\u00f3gicas en textos",
"secuencia l\u00f3gica, orden, coherencia, conectores, causa-efecto", 0.74, [
("R","L","Secuencia l\u00f3gica.","*\"\u00bfQu\u00e9 es una secuencia l\u00f3gica?\"*",opt(("A","Un orden sin sentido.",False),("B","Un orden que tiene coherencia.",True,"Correcto."),("C","Poner palabras al azar.",False),("D","Saltarse pasos.",False)),"Definici\u00f3n."),
("R","L","Orden.","*\"\u00bfQu\u00e9 conector se usa para ordenar?\"*",opt(("A","sin embargo.",False),("B","primero.",True,"Correcto."),("C","porque.",False),("D","pero.",False)),"Conector orden."),
("U","G","Causa-efecto.","*\"Si llueve, el piso se moja. \u00bfQu\u00e9 relaci\u00f3n hay?\"*",opt(("A","Secuencia temporal.",False),("B","Causa-efecto.",True,"Correcto."),("C","Contraste.",False),("D","Opini\u00f3n.",False)),"Causa-efecto."),
("U","G","Orden incorrecto.","*\"Me vest\u00ed, me ba\u00f1\u00e9. \u00bfEs l\u00f3gico?\"*",opt(("A","S\u00ed, perfecto.",False),("B","No, primero ba\u00f1arse, luego vestirse.",True,"Correcto."),("C","Da igual.",False),("D","Solo si est\u00e1s limpio.",False)),"Orden il\u00f3gico."),
("U","G","Completar secuencia.","*\"1. Comprar ingredientes. 2. _________. 3. Servir.\"* \u00bfQu\u00e9 falta?\"*",opt(("A","Jugar.",False),("B","Cocinar.",True,"Correcto."),("C","Dormir.",False),("D","Caminar.",False)),"Completar."),
("Ap","I","Reordenar.","*\"A) Salir B) Despertar C) Desayunar. \u00bfOrden l\u00f3gico?\"*",opt(("A","A,B,C.",False),("B","B,C,A.",True,"Correcto."),("C","C,B,A.",False),("D","A,C,B.",False)),"Reordenar."),
("Ap","I","Secuencia il\u00f3gica.","*\"Texto: \u2018Fue a la playa. Se puso los zapatos. Se meti\u00f3 al agua con abrigo.\u2019 \u00bfQu\u00e9 falla?\"*",opt(("A","Nada, todo bien.",False),("B","La secuencia no es l\u00f3gica.",True,"Correcto."),("C","Bien escrito.",False),("D","Es poes\u00eda.",False)),"Detectar il\u00f3gico."),
("An","I","Analizar coherencia.","*\"Texto: Juan naci\u00f3, camin\u00f3, gate\u00f3. \u00bfProblema?\"*",opt(("A","Ninguno.",False),("B","Primero gatea, luego camina.",True,"Correcto."),("C","Est\u00e1 bien.",False),("D","Da igual.",False)),"Analizar orden."),
("An","R","Evaluar importancia.","*\"\u00bfPor qu\u00e9 es importante la secuencia l\u00f3gica en un instructivo?\"*",opt(("A","No lo es.",False),("B","Para que funcione el resultado.",True,"Correcto."),("C","Para que sea bonito.",False),("D","Es opcional.",False)),"Importancia."),
("An","R","Crear.","*\"Ordena: preparar maleta, comprar tiquete, viajar. \u00bfCu\u00e1l es correcto?\"*",opt(("A","Comprar, preparar, viajar.",True,"Correcto."),("B","Preparar, viajar, comprar.",False),("C","Viajar, comprar, preparar.",False),("D","Preparar, comprar, viajar.",False)),"Crear secuencia."),
], "Bundle secuencias l\u00f3gicas.")
