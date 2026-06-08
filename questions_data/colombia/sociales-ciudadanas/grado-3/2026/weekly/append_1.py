#!/usr/bin/env python3
"""Append W11-W25 questions to gen_all.py"""
import os

DIR = 'E:/scripts-python/worldexams/questions_data/colombia/sociales-ciudadanas/grado-3/2026/weekly'

# Read existing content
with open(os.path.join(DIR, 'gen_all.py'), 'r', encoding='utf-8') as f:
    old = f.read()

# Find the point before main() to insert new questions
marker = "def main():"
parts = old.split(marker)
assert len(parts) == 2, "Could not split at main()"

# The questions chunk to insert
chunk = '''
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
'''

with open(os.path.join(DIR, 'gen_all.py'), 'w', encoding='utf-8') as f:
    f.write(parts[0] + chunk + '\n' + marker + parts[1])

print('Appended W11-W15 data successfully')
