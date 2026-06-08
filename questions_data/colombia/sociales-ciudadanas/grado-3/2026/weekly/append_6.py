#!/usr/bin/env python3
"""Append W37-W40 questions"""
import os
DIR = 'E:/scripts-python/worldexams/questions_data/colombia/sociales-ciudadanas/grado-3/2026/weekly'
with open(os.path.join(DIR, 'gen_all.py'), 'r', encoding='utf-8') as f:
    old = f.read()
marker = "def main():"
parts = old.split(marker)
chunk = '''
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
'''
with open(os.path.join(DIR, 'gen_all.py'), 'w', encoding='utf-8') as f:
    f.write(parts[0] + chunk + '\n' + marker + parts[1])
print("Appended W37-W40 successfully")
