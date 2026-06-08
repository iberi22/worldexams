#!/usr/bin/env python3
"""Append W16-W25 questions to gen_all.py"""
import os

DIR = 'E:/scripts-python/worldexams/questions_data/colombia/sociales-ciudadanas/grado-3/2026/weekly'

with open(os.path.join(DIR, 'gen_all.py'), 'r', encoding='utf-8') as f:
    old = f.read()

marker = "def main():"
parts = old.split(marker)

chunk = '''
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
'''

with open(os.path.join(DIR, 'gen_all.py'), 'w', encoding='utf-8') as f:
    f.write(parts[0] + chunk + '\n' + marker + parts[1])
print("Appended W16-W20 successfully")
