#!/usr/bin/env python3
"""Generate W21-W25 bundles for Lectura Critica G4."""
import sys
sys.path.insert(0, r"E:\scripts-python\worldexams\questions_data\colombia\lectura-critica\grado-4\2026\weekly")
from gen_all_v2 import make, opt

make(21, "diccionario-significado-palabras", "El diccionario y el significado de palabras",
"diccionario, significado, definici\u00f3n, consulta, orden alfab\u00e9tico", 0.76, [
("R","L","Orden alfab\u00e9tico.","*\"\u00bfQu\u00e9 palabra va primero en el diccionario?\"* A) casa B) \u00e1rbol C) burro",opt(("A","casa.",False),("B","\u00e1rbol.",True,"Correcto. \u00e1 va antes que b y c."),("C","burro.",False),("D","No se sabe.",False)),"Orden alfab\u00e9tico."),
("R","L","Definici\u00f3n.","*\"\u00bfQu\u00e9 informa el diccionario sobre las palabras?\"*",opt(("A","C\u00f3mo se dibujan.",False),("B","Su significado y uso.",True,"Correcto."),("C","Su historia.",False),("D","Qui\u00e9n la invent\u00f3.",False)),"Prop\u00f3sito."),
("U","G","Buscar significado.","*\"\u00bfD\u00f3nde buscar\u00edas el significado de \u2018biodiversidad\u2019?\"*",opt(("A","Peri\u00f3dico.",False),("B","Diccionario.",True,"Correcto."),("C","Receta.",False),("D","Poema.",False)),"D\u00f3nde buscar."),
("U","G","Palabra gu\u00eda.","*\"\u00bfQu\u00e9 son las palabras gu\u00eda en el diccionario?\"*",opt(("A","Las m\u00e1s largas.",False),("B","Indican la primera y \u00faltima palabra de la p\u00e1gina.",True,"Correcto."),("C","Las m\u00e1s bonitas.",False),("D","Sin\u00f3nimos.",False)),"Palabras gu\u00eda."),
("U","G","Uso en contexto.","*\"\u00bfPor qu\u00e9 a veces una palabra tiene varios significados?\"*",opt(("A","Por error del diccionario.",False),("B","Porque puede usarse en diferentes contextos.",True,"Correcto."),("C","Porque es dif\u00edcil.",False),("D","No tiene.",False)),"Acepciones."),
("Ap","I","Ordenar palabras.","*\"Ordena: manzana, mango, mel\u00f3n, mandarina.\"* \u00bfCu\u00e1l va primera?",opt(("A","mandarina.",True,"Correcto. ma..."),("B","mango.",False),("C","manzana.",False),("D","mel\u00f3n.",False)),"Ordenar."),
("Ap","I","Encontrar significado.","*\"\u00bfQu\u00e9 p\u00e1gina abrir para buscar \u2018colibr\u00ed\u2019 si la gu\u00eda dice col-cos?\"*",opt(("A","La p\u00e1gina de palabras col-cos.",True,"Correcto."),("B","La primera del diccionario.",False),("C","La \u00faltima.",False),("D","Cualquiera.",False)),"Palabra gu\u00eda."),
("An","I","Comparar diccionario y glosario.","*\"\u00bfDiferencia entre diccionario y glosario?\"*",opt(("A","Ninguna.",False),("B","Glosario es solo t\u00e9rminos de un tema.",True,"Correcto."),("C","Diccionario es m\u00e1s peque\u00f1o.",False),("D","Glosario tiene im\u00e1genes.",False)),"Diferencias."),
("An","R","Evaluar definici\u00f3n.","*\"Definici\u00f3n: \u2018El agua es un l\u00edquido que moja\u2019. \u00bfEs correcta?\"*",opt(("A","S\u00ed.",False,"Incompleta."),("B","Parcial, falta que es incolora, ins\u00edpida, H2O.",True,"Correcto."),("C","No, es s\u00f3lido.",False),("D","Muy larga.",False)),"Evaluar definici\u00f3n."),
("An","R","Multiplicidad.","*\"\u2018Banco\u2019: lugar para sentarse, entidad financiera, de peces. \u00bfQu\u00e9 son?\"*",opt(("A","Palabras diferentes.",False),("B","Acepciones de una misma palabra.",True,"Correcto."),("C","Sin\u00f3nimos.",False),("D","Ant\u00f3nimos.",False)),"M\u00faltiples significados."),
], "Bundle diccionario.")

make(22, "sinonimos-antonimos-contexto", "Sin\u00f3nimos y ant\u00f3nimos en contexto",
"sin\u00f3nimos, ant\u00f3nimos, vocabulario, contexto, palabras parecidas", 0.75, [
("R","L","Sin\u00f3nimo.","*\"\u2018Grande\u2019 es sin\u00f3nimo de...\"*",opt(("A","Peque\u00f1o.",False),("B","Enorme.",True,"Correcto."),("C","Lento.",False),("D","R\u00e1pido.",False)),"Sin\u00f3nimo."),
("R","L","Ant\u00f3nimo.","*\"\u2018Feliz\u2019 es ant\u00f3nimo de...\"*",opt(("A","Contento.",False),("B","Alegre.",False),("C","Triste.",True,"Correcto."),("D","Juguet\u00f3n.",False)),"Ant\u00f3nimo."),
("U","G","Sin\u00f3nimo en contexto.","*\"El bus es veloz. \u00bfQu\u00e9 palabra significa lo mismo que veloz?\"*",opt(("A","Lento.",False),("B","R\u00e1pido.",True,"Correcto."),("C","Pesado.",False),("D","Grande.",False)),"Sin\u00f3nimo en contexto."),
("U","G","Ant\u00f3nimo en contexto.","*\"El d\u00eda estaba claro, pero la noche es...\"*",opt(("A","Brillante.",False),("B","Oscura.",True,"Correcto."),("C","Luminosa.",False),("D","C\u00e1lida.",False)),"Ant\u00f3nimo."),
("U","G","Relaci\u00f3n.","*\"\u00bfCaliente y fr\u00edo son?\"*",opt(("A","Sin\u00f3nimos.",False),("B","Ant\u00f3nimos.",True,"Correcto."),("C","Iguales.",False),("D","No relacionados.",False)),"Relaci\u00f3n."),
("Ap","I","Sin\u00f3nimo complejo.","*\"El ni\u00f1o es inteligente. \u00bfQu\u00e9 palabra puede reemplazar inteligente?\"*",opt(("A","Tonto.",False),("B","Listo.",True,"Correcto."),("C","Lento.",False),("D","Perezoso.",False)),"Sin\u00f3nimo."),
("Ap","I","Ant\u00f3nimo complejo.","*\"La subida era empinada, la bajada era...\"*",opt(("A","Plana.",True,"Correcto."),("B","Empinada.",False),("C","Larga.",False),("D","Angosta.",False)),"Ant\u00f3nimo."),
("An","I","Sustituir sin\u00f3nimo.","*\"Reemplaza \u2018bello\u2019 en: \u2018El paisaje es bello\u2019.\"*",opt(("A","Feo.",False),("B","Hermoso.",True,"Correcto."),("C","Aburrido.",False),("D","Simple.",False)),"Sustituir."),
("An","R","Diferenciar.","*\"\u00bfQu\u00e9 diferencia hay entre sin\u00f3nimos y ant\u00f3nimos?\"*",opt(("A","Sin\u00f3nimos similares, ant\u00f3nimos opuestos.",True,"Correcto."),("B","Son lo mismo.",False),("C","Sin\u00f3nimos opuestos.",False),("D","Ant\u00f3nimos similares.",False)),"Diferenciar."),
("An","R","Evaluar uso.","*\"\u2018El agua est\u00e1 helada\u2019. \u00bfSirve \u2018congelada\u2019 como sin\u00f3nimo?\"*",opt(("A","No.",False),("B","S\u00ed, son sin\u00f3nimos.",True,"Correcto."),("C","Solo a veces.",False),("D","Son ant\u00f3nimos.",False)),"Evaluar sin\u00f3nimo."),
], "Bundle sin\u00f3nimos-ant\u00f3nimos.")

make(23, "significado-contextual-claves", "Significado contextual (claves de contexto)",
"claves de contexto, significado, inferencia l\u00e9xica, contexto", 0.74, [
("R","L","Definici\u00f3n.","*\"\u00bfQu\u00e9 son las claves de contexto?\"*",opt(("A","Palabras que ayudan a entender el significado.",True,"Correcto."),("B","Palabras sin sentido.",False),("C","Im\u00e1genes.",False),("D","Sonidos.",False)),"Claves de contexto."),
("R","L","Palabra clave.","*\"El texto dice \u2018el animal es herb\u00edvoro, come plantas.\"* \u00bfQu\u00e9 palabra ayuda a entender herb\u00edvoro?\"*",opt(("A","animal.",False),("B","come plantas.",True,"Correcto."),("C","es.",False),("D","el.",False)),"Palabra clave."),
("U","G","Inferir significado.","*\"Mar\u00eda estaba \u00e1lgida; temblaba de fr\u00edo.\"* \u00bfQu\u00e9 significa \u00e1lgida?",opt(("A","Caliente.",False),("B","Muy fr\u00eda.",True,"Correcto. Temblar de fr\u00edo."),("C","Cansada.",False),("D","Enferma.",False)),"Inferir por contexto."),
("U","G","Clave de sin\u00f3nimo.","*\"El vocablo \u2018fastuoso\u2019 significa lujoso, como un palacio.\"* \u00bfQu\u00e9 significa fastuoso?",opt(("A","Feo.",False),("B","Lujoso.",True,"Correcto."),("C","Peque\u00f1o.",False),("D","R\u00e1pido.",False)),"Clave sin\u00f3nimo."),
("U","G","Clave ant\u00f3nimo.","*\"A diferencia de su hermano que es hura\u00f1o, ella es sociable.\"* \u00bfQu\u00e9 es hura\u00f1o?",opt(("A","Sociable.",False,"Es lo opuesto."),("B","Poco sociable, arisco.",True,"Correcto."),("C","Alegre.",False),("D","Trabajador.",False)),"Clave ant\u00f3nimo."),
("Ap","I","Inferir por ejemplos.","*\"Animales dom\u00e9sticos: perro, gato, caballo.\"* \u00bfQu\u00e9 significa dom\u00e9stico?",opt(("A","Salvaje.",False),("B","Que vive con humanos.",True,"Correcto."),("C","Peligroso.",False),("D","Grande.",False)),"Inferir por ejemplos."),
("Ap","I","Inferir por descripci\u00f3n.","*\"El \u00e1rido desierto no tiene agua ni vegetaci\u00f3n.\"* \u00bfQu\u00e9 es \u00e1rido?",opt(("A","Verde.",False),("B","Seco, sin agua.",True,"Correcto."),("C","H\u00famedo.",False),("D","Fresco.",False)),"Inferir por descripci\u00f3n."),
("An","I","Usar m\u00faltiples claves.","*\"El ni\u00f1o era \u00edntegro: siempre dec\u00eda la verdad y cumpl\u00eda.\"* \u00bfSignifica \u00edntegro?",opt(("A","Mentiroso.",False),("B","Honesto, recto.",True,"Correcto."),("C","Travieso.",False),("D","Perezoso.",False)),"M\u00faltiples claves."),
("An","R","Evaluar estrategia.","*\"\u00bfEs \u00fatil usar el contexto para entender palabras nuevas?\"*",opt(("A","No, mejor no leer.",False),("B","S\u00ed, ayuda a comprender sin diccionario.",True,"Correcto."),("C","Solo a veces.",False),("D","Da igual.",False)),"Utilidad."),
("An","R","Aplicar.","*\"Si lees \u2018noct\u00e1mbulo\u2019 en un texto sobre dormir, \u00bfqu\u00e9 crees que significa?\"*",opt(("A","Que camina durmiendo.",True,"Correcto."),("B","Que duerme mucho.",False),("C","Que no duerme.",False),("D","Que ronca.",False)),"Aplicar estrategia."),
], "Bundle claves de contexto.")

make(24, "repaso-p4", "Repaso P4",
"repaso: diccionario, sin\u00f3nimos, ant\u00f3nimos, claves de contexto", 0.70, [
("R","L","Diccionario.","*\"\u00bfQu\u00e9 encontramos en el diccionario?\"*",opt(("A","Cuentos.",False),("B","Significado de palabras.",True,"Correcto."),("C","Recetas.",False),("D","Noticias.",False)),"Repaso diccionario."),
("R","L","Sin\u00f3nimo.","*\"Alegre es sin\u00f3nimo de...\"*",opt(("A","Triste.",False),("B","Feliz.",True,"Correcto."),("C","Enojado.",False),("D","Aburrido.",False)),"Repaso sin\u00f3nimo."),
("U","G","Ant\u00f3nimo.","*\"R\u00e1pido es ant\u00f3nimo de...\"*",opt(("A","Veloz.",False),("B","Lento.",True,"Correcto."),("C","R\u00e1pido.",False),("D","Correr.",False)),"Repaso ant\u00f3nimo."),
("U","G","Clave contexto.","*\"El animal es om\u00edvoro: come de todo.\"* \u00bfQu\u00e9 es om\u00edvoro?",opt(("A","Solo carne.",False),("B","Come de todo.",True,"Correcto."),("C","Solo plantas.",False),("D","No come.",False)),"Repaso clave contexto."),
("U","G","Orden alfab\u00e9tico.","*\"\u00bfQu\u00e9 palabra va antes: gato, foca, elefante?\"*",opt(("A","gato.",False),("B","foca.",False),("C","elefante.",True,"Correcto."),("D","No se sabe.",False)),"Repaso orden."),
("Ap","I","Usar diccionario.","*\"\u00bfD\u00f3nde buscas \u2018ballena\u2019 si est\u00e1s en p\u00e1gina baa-baz?\"*",opt(("A","Misma p\u00e1gina.",True,"Correcto."),("B","P\u00e1gina siguiente.",False),("C","P\u00e1gina anterior.",False),("D","Final.",False)),"Buscar palabra."),
("Ap","I","Sin\u00f3nimo en oraci\u00f3n.","*\"Reemplaza \u2018bonito\u2019 en: \u2018El paisaje es bonito\u2019.\"*",opt(("A","Feo.",False),("B","Hermoso.",True,"Correcto."),("C","Aburrido.",False),("D","Simple.",False)),"Repaso sustituir."),
("An","R","Evaluar si son sin\u00f3nimos.","*\"\u00bfSon sin\u00f3nimos \u2018alegre\u2019 y \u2018saltar\u2019?\"*",opt(("A","S\u00ed.",False),("B","No, no significan lo mismo.",True,"Correcto."),("C","Tal vez.",False),("D","Son ant\u00f3nimos.",False)),"Evaluar sin\u00f3nimos."),
("An","R","Diferenciar.","*\"\u00bfCu\u00e1l es la diferencia entre diccionario y glosario?\"*",opt(("A","Ninguna.",False),("B","Glosario es por temas.",True,"Correcto."),("C","Diccionario es m\u00e1s corto.",False),("D","Glosario no tiene palabras.",False)),"Diferenciar."),
("An","R","Aplicar.","*\"\u00bfCu\u00e1l es la mejor manera de entender una palabra desconocida?\"*",opt(("A","Ignorarla.",False),("B","Usar claves de contexto o diccionario.",True,"Correcto."),("C","Adivinar al azar.",False),("D","Preguntar siempre.",False)),"Estrategia."),
], "Bundle repaso P4.")

make(25, "hechos-opiniones", "Diferenciar hechos de opiniones",
"hechos, opiniones, objetividad, subjetividad, verificar", 0.73, [
("R","L","Hecho.","*\"\u00bfQu\u00e9 es un hecho?\"*",opt(("A","Algo que se puede comprobar.",True,"Correcto."),("B","Una opini\u00f3n personal.",False),("C","Un deseo.",False),("D","Un sentimiento.",False)),"Definici\u00f3n hecho."),
("R","L","Opini\u00f3n.","*\"\u00bfQu\u00e9 es una opini\u00f3n?\"*",opt(("A","Algo comprobable.",False),("B","Un pensamiento personal.",True,"Correcto."),("C","Un dato exacto.",False),("D","Una fecha.",False)),"Definici\u00f3n opini\u00f3n."),
("U","G","Identificar hecho.","*\"\u2018Colombia tiene 51 millones de habitantes.\u2019\"* \u00bfHecho u opini\u00f3n?",opt(("A","Hecho.",True,"Correcto."),("B","Opini\u00f3n.",False),("C","Ambos.",False),("D","Ninguno.",False)),"Identificar hecho."),
("U","G","Identificar opini\u00f3n.","*\"\u2018Colombia es el pa\u00eds m\u00e1s hermoso del mundo.\u2019\"* \u00bfHecho u opini\u00f3n?",opt(("A","Hecho.",False),("B","Opini\u00f3n.",True,"Correcto."),("C","Cient\u00edfico.",False),("D","Ambos.",False)),"Identificar opini\u00f3n."),
("U","G","Palabras de opini\u00f3n.","*\"\u00bfQu\u00e9 palabras indican opini\u00f3n?\"*",opt(("A","Es, tiene, mide.",False,"Hechos."),("B","Creo, pienso, me parece.",True,"Correcto."),("C","Ayer, hoy, ma\u00f1ana.",False),("D","Uno, dos, tres.",False)),"Indicadores."),
("Ap","I","Hecho en noticias.","*\"\u2018El terremoto fue de 6.2 grados.\u2019\"* \u00bfHecho u opini\u00f3n?",opt(("A","Hecho.",True,"Correcto. Dato medible."),("B","Opini\u00f3n.",False),("C","Ambos.",False),("D","No se sabe.",False)),"Hecho en noticia."),
("Ap","I","Opini\u00f3n disfrazada.","*\"\u2018Es obvio que esta es la mejor pel\u00edcula.\u2019\"* \u00bfQu\u00e9 es?",opt(("A","Hecho.",False),("B","Opini\u00f3n.",True,"Correcto. \u2018Mejor\u2019 es subjetivo."),("C","Dato.",False),("D","Ciencia.",False)),"Opini\u00f3n disfrazada."),
("An","I","Separar hecho y opini\u00f3n.","*\"El r\u00edo mide 5 km. Es muy bonito.\"* \u00bfHecho y opini\u00f3n?",opt(("A","Hecho: mide 5km. Opini\u00f3n: muy bonito.",True,"Correcto."),("B","Ambos hechos.",False),("C","Ambos opiniones.",False),("D","No se puede separar.",False)),"Separar."),
("An","R","Evaluar.","*\"\u2018El caf\u00e9 colombiano es el mejor\u2019 \u00bfEs esto comprobable?\"*",opt(("A","S\u00ed, es un hecho.",False),("B","No, es una opini\u00f3n, \u2018mejor\u2019 es subjetivo.",True,"Correcto."),("C","S\u00ed, porque colombiano.",False),("D","Depende.",False)),"Evaluar."),
("An","R","Importancia.","*\"\u00bfPor qu\u00e9 es importante diferenciar hechos de opiniones?\"*",opt(("A","No es importante.",False),("B","Para no confundir informaci\u00f3n real con creencias.",True,"Correcto."),("C","Porque lo dice el profe.",False),("D","Da igual.",False)),"Importancia."),
], "Bundle hechos-opiniones.")
