#!/usr/bin/env python3
"""Append W21-W30 questions"""
import os
DIR = 'E:/scripts-python/worldexams/questions_data/colombia/sociales-ciudadanas/grado-3/2026/weekly'
with open(os.path.join(DIR, 'gen_all.py'), 'r', encoding='utf-8') as f:
    old = f.read()
marker = "def main():"
parts = old.split(marker)
chunk = '''
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
'''
with open(os.path.join(DIR, 'gen_all.py'), 'w', encoding='utf-8') as f:
    f.write(parts[0] + chunk + '\n' + marker + parts[1])
print("Appended W21-W25 successfully")
