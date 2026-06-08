#!/usr/bin/env python3
"""Generate W16-W20 bundles for Lectura Critica G4."""
import sys
sys.path.insert(0, r"E:\scripts-python\worldexams\questions_data\colombia\lectura-critica\grado-4\2026\weekly")
from gen_all_v2 import make, opt

make(16, "textos-descriptivos-personas-animales", "Textos descriptivos: personas, animales",
"descripci\u00f3n, personas, animales, adjetivos", 0.74, [
("R","L","Caract. f\u00edsica.","*\"El loro tiene plumas verdes y amarillas.\"* \u00bfDe qu\u00e9 color?",opt(("A","Azules.",False),("B","Verdes y amarillas.",True,"Correcto."),("C","Rojas.",False),("D","Negras.",False)),"Color."),
("R","L","Animal.","*\"El tigrillo es un felino peque\u00f1o que vive en la selva colombiana.\"* \u00bfQu\u00e9 animal?",opt(("A","Le\u00f3n.",False),("B","Tigrillo.",True,"Correcto."),("C","Perro.",False),("D","Oso.",False)),"Animal."),
("U","G","Describir persona.","*\"La se\u00f1ora Luc\u00eda es alta, de cabello largo y siempre sonr\u00ede.\"* \u00bfC\u00f3mo es?",opt(("A","Baja.",False),("B","Alta y sonriente.",True,"Correcto."),("C","Triste.",False),("D","Joven.",False)),"Descripci\u00f3n."),
("U","G","Adjetivo.","*\"El perro de la finca es peludo y juguet\u00f3n.\"* \u00bfQu\u00e9 adjetivos describen al perro?",opt(("A","Flaco y serio.",False),("B","Peludo y juguet\u00f3n.",True,"Correcto."),("C","Grande y bravo.",False),("D","R\u00e1pido y silencioso.",False)),"Adjetivos."),
("U","G","Opuestos.","*\"La jirafa es alta. El rat\u00f3n es...\"*",opt(("A","Alto.",False),("B","Peque\u00f1o.",True,"Correcto."),("C","Mediano.",False),("D","Grande.",False)),"Opuestos."),
("Ap","I","Inferir adjetivo.","*\"La abuela prepara arepas deliciosas y abraza fuerte.\"* \u00bfC\u00f3mo es?",opt(("A","Floja.",False),("B","Cari\u00f1osa y buena cocinera.",True,"Correcto."),("C","Enojada.",False),("D","Silenciosa.",False)),"Inferir adjetivo."),
("Ap","I","Orden descripci\u00f3n.","*\"Primero dice el color, luego el tama\u00f1o, luego la textura.\"* \u00bfOrden?",opt(("A","Color, tama\u00f1o, textura.",True,"Correcto."),("B","Textura, color, tama\u00f1o.",False),("C","Tama\u00f1o, textura, color.",False),("D","Tama\u00f1o, color, textura.",False)),"Orden descriptivo."),
("An","I","Comparar descripciones.","*\"Perro: peludo. Gato: suave.\"* \u00bfQu\u00e9 hacen?",opt(("A","Describir textura de ambos.",True,"Correcto."),("B","Describir color.",False),("C","Describir tama\u00f1o.",False),("D","Describir sonido.",False)),"Comparar descripci\u00f3n."),
("An","R","Evaluar descripci\u00f3n.","*\"Describe a tu mejor amigo: \u2018Es alto y juega f\u00fatbol\u2019.\"* \u00bfEs buena descripci\u00f3n?",opt(("A","S\u00ed, da caracter\u00edsticas.",True,"Correcto."),("B","No, muy corta.",False,"No importa extensi\u00f3n."),("C","Solo juega f\u00fatbol.",False),("D","Mala.",False)),"Evaluar descripci\u00f3n."),
("An","R","Adjetivos apropiados.","*\"\u00bfQu\u00e9 adjetivos usar\u00edas para describir un d\u00eda soleado?\"*",opt(("A","Caluroso, brillante.",True,"Correcto."),("B","Fr\u00edo, oscuro.",False),("C","Lluvioso, nublado.",False),("D","Ventoso, helado.",False)),"Seleccionar adjetivos."),
], "Bundle descriptivo personas-animales.")

make(17, "textos-descriptivos-lugares-objetos", "Textos descriptivos: lugares, objetos",
"descripci\u00f3n, lugares, objetos, adjetivos", 0.73, [
("R","L","Lugar.","*\"El Parque del Caf\u00e9 est\u00e1 en Montenegro, Quind\u00edo.\"* \u00bfD\u00f3nde est\u00e1?",opt(("A","Bogot\u00e1.",False),("B","Montenegro, Quind\u00edo.",True,"Correcto."),("C","Medell\u00edn.",False),("D","Cali.",False)),"Ubicaci\u00f3n."),
("R","L","Objeto.","*\"La mochila way\u00fau es colorida y est\u00e1 tejida a mano.\"* \u00bfQu\u00e9 objeto es?",opt(("A","Sombrero.",False),("B","Mochila way\u00fau.",True,"Correcto."),("C","Bolso.",False),("D","Hamaca.",False)),"Objeto."),
("U","G","Describir lugar.","*\"El Jard\u00edn Bot\u00e1nico de Medell\u00edn tiene muchas flores y mariposas.\"* \u00bfC\u00f3mo es?",opt(("A","Aburrido.",False),("B","Colorido, con flores y mariposas.",True,"Correcto."),("C","Oscuro.",False),("D","Ruidoso.",False)),"Descripci\u00f3n lugar."),
("U","G","Material.","*\"La olla de barro es resistente al calor.\"* \u00bfDe qu\u00e9 material es?",opt(("A","Pl\u00e1stico.",False),("B","Barro.",True,"Correcto."),("C","Vidrio.",False),("D","Metal.",False)),"Material."),
("U","G","Tama\u00f1o.","*\"La piedra del Guatapur\u00ed es enorme y pesa toneladas.\"* \u00bfC\u00f3mo es?",opt(("A","Peque\u00f1a.",False),("B","Enorme.",True,"Correcto."),("C","Mediana.",False),("D","Liviana.",False)),"Tama\u00f1o."),
("Ap","I","Inferir lugar.","*\"Tiene libros, silencio y mesas para estudiar.\"* \u00bfQu\u00e9 lugar es?",opt(("A","Biblioteca.",True,"Correcto."),("B","Estadio.",False),("C","Restaurante.",False),("D","Parque.",False)),"Inferir lugar."),
("Ap","I","Ordenar descripci\u00f3n.","*\"1. Color 2. Forma 3. Tama\u00f1o 4. Textura\"* \u00bfOrden l\u00f3gico?",opt(("A","1,2,3,4.",True,"Correcto."),("B","4,3,2,1.",False),("C","3,1,2,4.",False),("D","2,4,1,3.",False)),"Orden descriptivo."),
("An","I","Comparar objetos.","*\"Hamaca: suave, tejida. Silla: dura, de madera.\"* \u00bfDiferencia?",opt(("A","Ambos para sentarse.",False,"Semejanza."),("B","Suave/tejida vs dura/madera.",True,"Correcto."),("C","Ambos en casa.",False,"Semejanza."),("D","Ambos c\u00f3modos.",False,"Semejanza.")),"Contrastar objetos."),
("An","R","Evaluar descripci\u00f3n.","*\"\u2018Mi cuarto tiene una cama.\u2019\"* \u00bfEs buena descripci\u00f3n?",opt(("A","S\u00ed.",False),("B","Faltan detalles (color, tama\u00f1o, objetos).",True,"Correcto."),("C","Demasiado larga.",False),("D","No, aburrida.",False)),"Evaluar suficiencia."),
("An","R","Crear descripci\u00f3n.","*\"Describe el Parque del Caf\u00e9.\"* \u00bfQu\u00e9 incluir?",opt(("A","Solo el nombre.",False),("B","Vegetaci\u00f3n, juegos, clima, ubicaci\u00f3n.",True,"Correcto."),("C","Solo el clima.",False),("D","Solo la entrada.",False)),"Elementos descriptivos."),
], "Bundle descriptivo lugares-objetos.")

make(18, "textos-instructivos-recetas-manuales", "Textos instructivos: recetas, manuales",
"instrucciones, pasos, recetas, manuales, orden", 0.74, [
("R","L","Primer paso.","*\"Para hacer limonada: 1. Lavar limones. 2. Exprimirlos. 3. Agregar agua y az\u00facar.\"* \u00bfPrimero?",opt(("A","Exprimirlos.",False),("B","Lavar limones.",True,"Correcto."),("C","Agregar az\u00facar.",False),("D","Servir.",False)),"Primer paso."),
("R","L","Ingredientes.","*\"Para arepas: 2 tazas harina de ma\u00edz, 1 taza agua, sal.\"* \u00bfQu\u00e9 ingrediente NO es necesario?",opt(("A","Harina de ma\u00edz.",False,"S\u00ed."),("B","Agua.",False,"S\u00ed."),("C","Az\u00facar.",True,"No se menciona."),("D","Sal.",False,"S\u00ed.")),"Identificar ingrediente."),
("U","G","Prop\u00f3sito instructivo.","*\"Texto que dice c\u00f3mo armar un rompecabezas.\"* \u00bfTipo?",opt(("A","Descriptivo.",False),("B","Instructivo.",True,"Correcto."),("C","Po\u00e9tico.",False),("D","Informativo.",False)),"Tipo de texto."),
("U","G","Orden correcto.","*\"1. Encender el horno. 2. _________. 3. Hornear 30 min.\"* \u00bfQu\u00e9 falta?",opt(("A","Apagar horno.",False,"Tarde."),("B","Poner mezcla en molde.",True,"Correcto."),("C","Comer.",False),("D","Lavar platos.",False)),"Paso faltante."),
("U","G","Verbos instructivos.","*\"Lave, corte, mezcle, hornee.\"* \u00bfQu\u00e9 tipo de palabras son?",opt(("A","Sustantivos.",False),("B","Verbos en imperativo.",True,"Correcto."),("C","Adjetivos.",False),("D","Art\u00edculos.",False)),"Verbos instructivos."),
("Ap","I","Seguir instrucciones.","*\"Dobla el papel por la mitad. Luego, dobla las esquinas al centro.\"* \u00bfQu\u00e9 haces?",opt(("A","Origami.",True,"Correcto."),("B","Pintar.",False),("C","Escribir.",False),("D","Recortar.",False)),"Seguir instrucciones."),
("Ap","I","Inferir resultado.","*\"Si mezclas harina, huevos y leche y horneas, \u00bfobtienes?\"*",opt(("A","Un pastel.",True,"Correcto."),("B","Una sopa.",False),("C","Ensalada.",False),("D","Jugo.",False)),"Inferir resultado."),
("An","I","Orden incorrecto.","*\"Receta: 1. Hornear. 2. Mezclar. 3. Servir.\"* \u00bfProblema?",opt(("A","Est\u00e1 bien.",False),("B","Primero mezclar, despu\u00e9s hornear.",True,"Correcto."),("C","Servir va al inicio.",False),("D","No hay problema.",False)),"Evaluar orden."),
("An","R","Instrucciones claras.","*\"Instrucci\u00f3n: \u2018agregue un poco\u2019.\"* \u00bfEs clara?",opt(("A","S\u00ed.",False),("B","No, debe ser precisa (cantidad exacta).",True,"Correcto."),("C","Depende.",False),("D","Da igual.",False)),"Evaluar claridad."),
("An","R","Crear instructivo.","*\"Para ense\u00f1ar a hacer una cometa, \u00bfqu\u00e9 necesitas?\"*",opt(("A","Pasos claros y materiales.",True,"Correcto."),("B","Solo dibujo.",False),("C","Solo texto.",False),("D","Solo materiales.",False)),"Elementos de instructivo."),
], "Bundle instructivos.")

make(19, "textos-poeticos-poemas", "Textos po\u00e9ticos: poemas cortos",
"poes\u00eda, poemas, rima, verso, estrofa, lenguaje figurado", 0.72, [
("R","L","Rima.","*\"La luna brilla en el cielo / como un faro de consuelo.\"* \u00bfQu\u00e9 palabras riman?",opt(("A","luna, faro.",False),("B","cielo, consuelo.",True,"Correcto."),("C","brilla, luna.",False),("D","faro, luna.",False)),"Identificar rima."),
("R","L","Versos.","*\"Cada l\u00ednea del poema es un...\"*",opt(("A","Verso.",True,"Correcto."),("B","Estrofa.",False),("C","P\u00e1rrafo.",False),("D","Poema.",False)),"Verso."),
("U","G","Sentimiento en poema.","*\"Triste est\u00e1 el \u00e1rbol / que perdi\u00f3 sus hojas.\"* \u00bfQu\u00e9 sentimiento transmite?",opt(("A","Alegr\u00eda.",False),("B","Tristeza.",True,"Correcto."),("C","Enojo.",False),("D","Miedo.",False)),"Sentimiento po\u00e9tico."),
("U","G","Lenguaje figurado.","*\"Tus ojos son dos luceros.\"* \u00bfQu\u00e9 significa?",opt(("A","Sus ojos son estrellas.",False,"Figurado."),("B","Sus ojos son brillantes y bonitos.",True,"Correcto."),("C","Tiene dos soles.",False),("D","No se entiende.",False)),"Lenguaje figurado."),
("U","G","Tema del poema.","*\"Alza tu vuelo, mariposa / sobre el jard\u00edn de colores.\"* \u00bfTema?",opt(("A","Una mariposa volando.",True,"Correcto."),("B","Un carro.",False),("C","La lluvia.",False),("D","La comida.",False)),"Tema po\u00e9tico."),
("Ap","I","Inferir met\u00e1fora.","*\"El r\u00edo es una cinta de plata.\"* \u00bfQu\u00e9 significa?",opt(("A","El r\u00edo es de plata.",False),("B","El r\u00edo brilla como la plata.",True,"Correcto."),("C","El r\u00edo es una cinta.",False),("D","El r\u00edo es un metal.",False)),"Met\u00e1fora."),
("Ap","I","Estructura po\u00e9tica.","*\"Una estrofa de 4 versos se llama...\"*",opt(("A","Cuarteto.",True,"Correcto."),("B","Pareado.",False,"2 versos."),("C","Terceto.",False,"3 versos."),("D","Soneto.",False)),"Estrofa."),
("An","I","Comparar poema y cuento.","*\"Poema: usa rima. Cuento: usa p\u00e1rrafos.\"* \u00bfDiferencia?",opt(("A","Ambos narrativos.",False),("B","Poema tiene rima, cuento no necesariamente.",True,"Correcto."),("C","Ambos riman.",False),("D","Cuento es m\u00e1s corto.",False)),"Comparar."),
("An","R","Evaluar poema.","*\"Un poema sin rima \u00bfsigue siendo poema?\"*",opt(("A","No, debe rimar.",False),("B","S\u00ed, poes\u00eda no siempre rima.",True,"Correcto."),("C","No.",False),("D","Solo poemas infantiles.",False)),"Poema sin rima."),
("An","R","Crear verso.","*\"Completa: \u2018El sol brilla en la...\u2019 para que rime con \u2018ventana\u2019.",opt(("A","cama.",False),("B","ma\u00f1ana.",True,"Correcto. Rima con ventana."),("C","silla.",False),("D","mesa.",False)),"Crear rima."),
], "Bundle poemas.")

make(20, "repaso-general-p1-p3", "Repaso general P1-P3",
"repaso general: todos los tipos de texto, primer semestre", 0.68, [
("U","G","Idea principal.","*\"Colombia tiene costas, monta\u00f1as y selvas.\"* \u00bfIdea?",opt(("A","Colombia es un pa\u00eds diverso.",True,"Correcto."),("B","Colombia es peque\u00f1o.",False),("C","Solo monta\u00f1as.",False),("D","Sin diversidad.",False)),"Repaso general."),
("R","L","Detalle.","*\"El Atrato es uno de los r\u00edos m\u00e1s caudalosos.\"* \u00bfQu\u00e9 r\u00edo?",opt(("A","Magdalena.",False),("B","Atrato.",True,"Correcto."),("C","Cauca.",False),("D","Amazonas.",False)),"Detalle."),
("U","G","Causa.","*\"Se inund\u00f3 la plaza por la fuerte lluvia.\"* \u00bfCausa?",opt(("A","Fuerte lluvia.",True,"Correcto."),("B","Plaza vac\u00eda.",False),("C","Gente.",False),("D","Noche.",False)),"Causa."),
("U","G","Noticia.","*\"\u00bfCu\u00e1l es el prop\u00f3sito de una noticia?\"*",opt(("A","Informar.",True,"Correcto."),("B","Entretener.",False),("C","Vender.",False),("D","Opinar.",False)),"Prop\u00f3sito noticia."),
("U","G","Poema.","*\"\u00bfQu\u00e9 es un verso?\"*",opt(("A","Un p\u00e1rrafo.",False),("B","Cada l\u00ednea del poema.",True,"Correcto."),("C","Un cuento largo.",False),("D","Una canci\u00f3n.",False)),"Verso."),
("Ap","I","Instrucciones.","*\"Si no sigues el orden de la receta, \u00bfqu\u00e9 pasa?\"*",opt(("A","Funciona igual.",False),("B","Puede no funcionar.",True,"Correcto."),("C","Es mejor.",False),("D","Da igual.",False)),"Orden instructivo."),
("An","I","Comparar textos.","*\"Noticia: real. Poema: figurado. Instructivo: pasos. Cuento: ficci\u00f3n.\"* \u00bfCu\u00e1l es ficci\u00f3n?",opt(("A","Noticia.",False),("B","Cuento.",True,"Correcto."),("C","Instructivo.",False),("D","Divulgaci\u00f3n.",False)),"Comparar textos."),
("An","R","Evaluar tipo.","*\"Texto para ense\u00f1ar a hacer una manualidad.\"* \u00bfTipo?",opt(("A","Narrativo.",False),("B","Instructivo.",True,"Correcto."),("C","Po\u00e9tico.",False),("D","Noticia.",False)),"Tipo texto."),
("An","R","Evaluar estructura.","*\"Cuento sin nudo.\"* \u00bfProblema?",opt(("A","Ninguno.",False),("B","Falta conflicto, es incompleto.",True,"Correcto."),("C","Es m\u00e1s corto.",False),("D","Mejor.",False)),"Estructura."),
("Ap","I","Inferir.","*\"Todos llevan paraguas y impermeable. \u00bfQu\u00e9 clima hace?\"*",opt(("A","Soleado.",False),("B","Lluvioso.",True,"Correcto."),("C","Nevado.",False),("D","Ventoso.",False)),"Inferencia."),
], "Bundle repaso general P1-P3.")
