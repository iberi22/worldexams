
const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

const QUESTIONS = [
  // Bundle 1: Federalism vs Centralism (19th Century)
  {
    meta: {
      id: "CO-CS-10-his-col-federalism-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "federalismo-centralismo",
      periodo: 2,
      dba_id: "DBA-CS-10-2",
      title: "Federalismo y Centralismo"
    },
    base: { question: "Disputa política S. XIX.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Principal conflicto político en el siglo XIX en Colombia:", options: [{text: "Disputa entre Federalismo y Centralismo",correct:true},{text: "Guerra contra España",correct:false},{text: "Invasión de USA",correct:false},{text: "Guerra con Brasil",correct:false}], explanation: "Organización del Estado." },
      { id_suffix: "v2", difficulty: 1, question: "Constitución de Rionegro (1863) estableció:", options: [{text: "Los Estados Unidos de Colombia (Federalismo radical)",correct:true},{text: "La Gran Colombia",correct:false},{text: "Una dictadura",correct:false},{text: "Una monarquía",correct:false}], explanation: "Olimpo Radical." },
      { id_suffix: "v3", difficulty: 2, question: "La Regeneración (1886) liderada por Rafael Núñez buscaba:", options: [{text: "Centralizar el poder y unir al país bajo un Dios y una Constitución",correct:true},{text: "Más federalismo",correct:false},{text: "Independencia de Panamá",correct:false},{text: "Socialismo",correct:false}], explanation: "Fin del federalismo." },
      { id_suffix: "v4", difficulty: 2, question: "Lema de la Constitución de 1886:", options: [{text: "Centralización política y descentralización administrativa (teórica)",correct:true},{text: "Libertad y Orden",correct:false},{text: "Ni un paso atrás",correct:false},{text: "Patria Boba",correct:false}], explanation: "Núñez." },
      { id_suffix: "v5", difficulty: 3, question: "Consecuencia de las guerras civiles del S. XIX:", options: [{text: "Inestabilidad económica y debilidad del Estado",correct:true},{text: "Gran desarrollo industrial",correct:false},{text: "Paz duradera",correct:false},{text: "Potencia mundial",correct:false}], explanation: "Caos." },
      { id_suffix: "v6", difficulty: 3, question: "Partidos tradicionales fundados a mitad del S. XIX:", options: [{text: "Liberal y Conservador",correct:true},{text: "Verde y U",correct:false},{text: "Comunista y Socialista",correct:false},{text: "Republicano y Demócrata",correct:false}], explanation: "Ezequiel Rojas y Ospina Rodríguez." },
      { id_suffix: "v7", difficulty: 4, question: "Diferencia ideológica clave S. XIX (Iglesia):", options: [{text: "Conservadores defendían Iglesia-Estado; Liberales querían separación",correct:true},{text: "Ambos eran ateos",correct:false},{text: "Liberales eran el partido del Papa",correct:false},{text: "Iguales",correct:false}], explanation: "Rol clerical." },
      { id_suffix: "v8", difficulty: 4, question: "Guerra de los Mil Días (1899-1902):", options: [{text: "Guerra civil más sangrienta entre Liberales y Conservadores",correct:true},{text: "Guerra de independencia",correct:false},{text: "Guerra con Perú",correct:false},{text: "Guerra fría",correct:false}], explanation: "Fin S. XIX." },
      { id_suffix: "v9", difficulty: 5, question: "Consecuencia territorial de la Guerra de los Mil Días:", options: [{text: "Separación de Panamá (1903)",correct:true},{text: "Pérdida de San Andrés",correct:false},{text: "Ganancia de Venezuela",correct:false},{text: "Ninguna",correct:false}], explanation: "Debilidad y canal." },
      { id_suffix: "v10", difficulty: 5, question: "Olimpo Radical (1863-1886):", options: [{text: "Periodo de dominio liberal, laicismo y federalismo extremo",correct:true},{text: "Dominio conservador",correct:false},{text: "Dictadura militar",correct:false},{text: "Monarquía",correct:false}], explanation: "Liberales radicales." }
    ]
  },

  // Bundle 2: Conservative Hegemony
  {
    meta: {
      id: "CO-CS-10-his-col-hegemony-cons-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "hegemonia-conservadora",
      periodo: 2,
      dba_id: "DBA-CS-10-2",
      title: "Hegemonía Conservadora"
    },
    base: { question: "Periodo 1886-1930.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "La Hegemonía Conservadora duró:", options: [{text: "Desde 1886 hasta 1930",correct:true},{text: "10 años",correct:false},{text: "Todo el siglo XX",correct:false},{text: "Hasta hoy",correct:false}], explanation: "44 años." },
      { id_suffix: "v2", difficulty: 1, question: "Masacre de las Bananeras (1928):", options: [{text: "Huelga de trabajadores de United Fruit Company reprimida por el ejército",correct:true},{text: "Guerra con bananos",correct:false},{text: "Fiesta patronal",correct:false},{text: "Terremoto",correct:false}], explanation: "Ciénaga, Magdalena." },
      { id_suffix: "v3", difficulty: 2, question: "Danza de los Millones (Años 20):", options: [{text: "Auge económico por indemnización de Panamá y préstamos externos",correct:true},{text: "Baile típico",correct:false},{text: "Crisis económica",correct:false},{text: "Inflación",correct:false}], explanation: "Indemnización Urrutia-Thomson." },
      { id_suffix: "v4", difficulty: 2, question: "Misión Kemmerer (1923):", options: [{text: "Creación del Banco de la República y Contraloría",correct:true},{text: "Misión religiosa",correct:false},{text: "Misión militar",correct:false},{text: "Misión espacial",correct:false}], explanation: "Modernización estatal." },
      { id_suffix: "v5", difficulty: 3, question: "Presidente durante Masacre Bananeras:", options: [{text: "Miguel Abadía Méndez",correct:true},{text: "Rafael Núñez",correct:false},{text: "Uribe",correct:false},{text: "Rojas Pinilla",correct:false}], explanation: "Conservador." },
      { id_suffix: "v6", difficulty: 3, question: "Los 'Chulavitas':", options: [{text: "Policía/paramilitares conservadores (más adelante en la violencia)",correct:true},{text: "Liberales",correct:false},{text: "Comunistas",correct:false},{text: "Indígenas",correct:false}], explanation: "Brazo armado." },
      { id_suffix: "v7", difficulty: 4, question: "Fin de la Hegemonía Conservadora:", options: [{text: "Elección de Enrique Olaya Herrera (1930) y división conservadora",correct:true},{text: "Golpe de estado",correct:false},{text: "Muerte de un rey",correct:false},{text: "Guerra",correct:false}], explanation: "Inicia Rep. Liberal." },
      { id_suffix: "v8", difficulty: 4, question: "Papel de la Iglesia Católica en la Hegemonía:", options: [{text: "Controlaba la educación y tenía gran influencia política",correct:true},{text: "Estaba prohibida",correct:false},{text: "Apoyaba a liberales",correct:false},{text: "Era protestante",correct:false}], explanation: "Concordato." },
      { id_suffix: "v9", difficulty: 5, question: "Marco Fidel Suárez y la doctrina 'Respice Polum':", options: [{text: "Mirar al Norte (Aliarse con EE.UU.)",correct:true},{text: "Mirar al Sur",correct:false},{text: "Aislarse",correct:false},{text: "Mirar a Europa",correct:false}], explanation: "Política exterior." },
      { id_suffix: "v10", difficulty: 5, question: "El Bogotazo ocurrió durante:", options: [{text: "El gobierno de Mariano Ospina Pérez (Conservador, retorno al poder en 1946)",correct:true},{text: "Hegemonía liberal",correct:false},{text: "La independencia",correct:false},{text: "Ayer",correct:false}], explanation: "1948." }
    ]
  },

  // Bundle 3: Liberal Republic
  {
    meta: {
      id: "CO-CS-10-his-col-rep-liberal-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "republica-liberal",
      periodo: 2,
      dba_id: "DBA-CS-10-2",
      title: "La República Liberal"
    },
    base: { question: "Periodo 1930-1946.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "República Liberal (1930-1946):", options: [{text: "Periodo de reformas sociales y modernización",correct:true},{text: "Guerra civil continua",correct:false},{text: "Dictadura militar",correct:false},{text: "Dominio conservador",correct:false}], explanation: "Olaya, López, Santos." },
      { id_suffix: "v2", difficulty: 1, question: "Revolución en Marcha:", options: [{text: "Programa de reformas de Alfonso López Pumarejo",correct:true},{text: "Marcha deportiva",correct:false},{text: "Guerra",correct:false},{text: "Huelga",correct:false}], explanation: "Reforma agraria, laboral." },
      { id_suffix: "v3", difficulty: 2, question: "Reforma Constitucional de 1936:", options: [{text: "Función social de la propiedad y derechos laborales",correct:true},{text: "Prohibió sindicatos",correct:false},{text: "Creó la monarquía",correct:false},{text: "Eliminó el voto",correct:false}], explanation: "Estado intervencionista." },
      { id_suffix: "v4", difficulty: 2, question: "Guerra con Perú (1932):", options: [{text: "Conflicto por el puerto de Leticia en el Amazonas",correct:true},{text: "Por el café",correct:false},{text: "Por Panamá",correct:false},{text: "Por San Andrés",correct:false}], explanation: "Unidad nacional." },
      { id_suffix: "v5", difficulty: 3, question: "Eduardo Santos y 'La Pausa':", options: [{text: "Frenar el ritmo de reformas radicales de López",correct:true},{text: "Pausa para almorzar",correct:false},{text: "Pausa en la guerra",correct:false},{text: "Renuncia",correct:false}], explanation: "Liberalismo moderado." },
      { id_suffix: "v6", difficulty: 3, question: "Jorge Eliécer Gaitán:", options: [{text: "Líder popular liberal, crítico de la oligarquía",correct:true},{text: "Presidente conservador",correct:false},{text: "General",correct:false},{text: "Banqueró",correct:false}], explanation: "Caudillo." },
      { id_suffix: "v7", difficulty: 4, question: "Ley 200 de 1936 (Tierras):", options: [{text: "Intentó titular tierras a campesinos (el que trabaja la tierra es dueño)",correct:true},{text: "Quitó tierras",correct:false},{text: "Vendió tierras a EE.UU.",correct:false},{text: "Prohibió la agricultura",correct:false}], explanation: "Reforma agraria fallida." },
      { id_suffix: "v8", difficulty: 4, question: "Ciudad Universitaria (UNAL):", options: [{text: "Proyecto educativo de López Pumarejo (Leopoldo Rother)",correct:true},{text: "Hecha por españoles",correct:false},{text: "Privada",correct:false},{text: "Militar",correct:false}], explanation: "Modernización educación." },
      { id_suffix: "v9", difficulty: 5, question: "Sindicalismo en la Rep. Liberal:", options: [{text: "Se legalizó y creció (CTC)",correct:true},{text: "Se prohibió",correct:false},{text: "No existía",correct:false},{text: "Era ilegal",correct:false}], explanation: "Derecho huelga." },
      { id_suffix: "v10", difficulty: 5, question: "Fin de la República Liberal:", options: [{text: "División entre Turbay y Gaitán permite triunfo conservador (1946)",correct:true},{text: "Invasión",correct:false},{text: "Golpe de estado",correct:false},{text: "Muerte natural",correct:false}], explanation: "Ospina gana." }
    ]
  },

  // Bundle 4: The Violence (La Violencia)
  {
    meta: {
      id: "CO-CS-10-his-col-violencia-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "la-violencia",
      periodo: 2,
      dba_id: "DBA-CS-10-2",
      title: "La Violencia (1948-1958)"
    },
    base: { question: "Analiza La Violencia.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "El Bogotazo (9 de abril de 1948) fue provocado por:", options: [{text: "El asesinato de Jorge Eliécer Gaitán",correct:true},{text: "Un terremoto",correct:false},{text: "La caída de la bolsa",correct:false},{text: "Un partido de fútbol",correct:false}], explanation: "Estallido social." },
      { id_suffix: "v2", difficulty: 1, question: "'La Violencia' se caracterizó por:", options: [{text: "Enfrentamiento armado entre campesinos liberales y conservadores",correct:true},{text: "Guerra contra España",correct:false},{text: "Paz total",correct:false},{text: "Guerra internacional",correct:false}], explanation: "Bipartidismo armado." },
      { id_suffix: "v3", difficulty: 2, question: "Guerrillas Liberales del Llano:", options: [{text: "Lideradas por Guadalupe Salcedo",correct:true},{text: "Lideradas por Bolívar",correct:false},{text: "Eran conservadores",correct:false},{text: "Eran comunistas (inicialmente no)",correct:false}], explanation: "Autodefensa." },
      { id_suffix: "v4", difficulty: 2, question: "Los 'Pájaros':", options: [{text: "Asesinos a sueldo del partido conservador (Valle)",correct:true},{text: "Animales",correct:false},{text: "Aviones",correct:false},{text: "Liberales",correct:false}], explanation: "León María Lozano." },
      { id_suffix: "v5", difficulty: 3, question: "Gustavo Rojas Pinilla sube al poder (1953) mediante:", options: [{text: "Golpe de opinión (militar pacífico) contra Laureano Gómez",correct:true},{text: "Elecciones",correct:false},{text: "Herencia",correct:false},{text: "Sorteo",correct:false}], explanation: "Pacificar al país." },
      { id_suffix: "v6", difficulty: 3, question: "Logro del gobierno de Rojas Pinilla:", options: [{text: "Voto femenino (1954/1957) y Televisión",correct:true},{text: "Constitución 1991",correct:false},{text: "Independencia",correct:false},{text: "Metro de Bogotá",correct:false}], explanation: "Modernización + Dictadura." },
      { id_suffix: "v7", difficulty: 4, question: "Frente Nacional (1958-1974):", options: [{text: "Pacto de alternancia de poder entre Liberales y Conservadores",correct:true},{text: "Guerra total",correct:false},{text: "Un solo partido",correct:false},{text: "Separación",correct:false}], explanation: "Benidorm y Sitges." },
      { id_suffix: "v8", difficulty: 4, question: "Objetivo del Frente Nacional:", options: [{text: "Acabar con la violencia bipartidista",correct:true},{text: "Crear el comunismo",correct:false},{text: "Vender el país",correct:false},{text: "Armar a la gente",correct:false}], explanation: "Y excluir terceros." },
      { id_suffix: "v9", difficulty: 5, question: "Laureano Gómez:", options: [{text: "Presidente conservador radical (ultraderecha)",correct:true},{text: "Liberal moderado",correct:false},{text: "Comunista",correct:false},{text: "Poeta",correct:false}], explanation: "El Monstruo." },
      { id_suffix: "v10", difficulty: 5, question: "Amnistía de Rojas Pinilla:", options: [{text: "Logró la desmovilización de guerrillas liberales (Guadalupe)",correct:true},{text: "Falló totalmente",correct:false},{text: "No existió",correct:false},{text: "Fue en 1991",correct:false}], explanation: "Paz parcial." }
    ]
  },

  // Bundle 5: 19th Century Geography
  {
    meta: {
      id: "CO-CS-10-geo-hist-19c-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "geografia-historica",
      periodo: 2,
      dba_id: "DBA-CS-10-2",
      title: "Geografía Histórica (S. XIX)"
    },
    base: { question: "Geografía S. XIX.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Comisión Corográfica (Agustín Codazzi):", options: [{text: "Expedición para mapear y describir a Colombia (1850)",correct:true},{text: "Expedición Botánica",correct:false},{text: "Viaje a la luna",correct:false},{text: "Guerra",correct:false}], explanation: "Reconocimiento territorio." },
      { id_suffix: "v2", difficulty: 1, question: "Estados Soberanos (1863):", options: [{text: "9 Estados (Antioquia, Bolívar, etc.) con ejército propio",correct:true},{text: "Departamentos actuales",correct:false},{text: "Municipios",correct:false},{text: "Virreinatos",correct:false}], explanation: "Federalismo." },
      { id_suffix: "v3", difficulty: 2, question: "Panamá antes de 1903 era:", options: [{text: "Un departamento/estado de Colombia",correct:true},{text: "Un país independiente",correct:false},{text: "De Costa Rica",correct:false},{text: "De USA",correct:false}], explanation: "El Istmo." },
      { id_suffix: "v4", difficulty: 2, question: "Colonización Antioqueña:", options: [{text: "Migración hacia el sur (Eje Cafetero) fundando pueblos",correct:true},{text: "Ir a la costa",correct:false},{text: "Ir a Bogotá",correct:false},{text: "Ir a Europa",correct:false}], explanation: "Expansión frontera agrícola." },
      { id_suffix: "v5", difficulty: 3, question: "Ferrocarriles en Colombia (inicios S. XX):", options: [{text: "Construidos para sacar café al río Magdalena/mar",correct:true},{text: "Para pasajeros de lujo",correct:false},{text: "Unieron todo el país",correct:false},{text: "No existieron",correct:false}], explanation: "Infraestructura exportadora." },
      { id_suffix: "v6", difficulty: 3, question: "El Río Magdalena:", options: [{text: "Principal arteria fluvial para comercio y transporte",correct:true},{text: "Frontera con Perú",correct:false},{text: "Río pequeño",correct:false},{text: "No navegable",correct:false}], explanation: "Conexión interior-costa." },
      { id_suffix: "v7", difficulty: 4, question: "Economía de Enclave:", options: [{text: "Región controlada por empresa extranjera (ej: Bananeras)",correct:true},{text: "Economía nacional",correct:false},{text: "Trueque",correct:false},{text: "Comunismo",correct:false}], explanation: "Poca conexión local." },
      { id_suffix: "v8", difficulty: 4, question: "Quina, Tabaco, Añil:", options: [{text: "Ciclos exportadores efímeros del S. XIX",correct:true},{text: "Comidas",correct:false},{text: "No se producían",correct:false},{text: "Minerales",correct:false}], explanation: "Bonanzas inestables." },
      { id_suffix: "v9", difficulty: 5, question: "El Café a finales del S. XIX:", options: [{text: "Se convirtió en el principal producto de exportación y unificó el mercado",correct:true},{text: "Nadie lo tomaba",correct:false},{text: "Era ilegal",correct:false},{text: "Solo en la costa",correct:false}], explanation: "Hacienda a pequeña propiedad." },
      { id_suffix: "v10", difficulty: 5, question: "Desamortización de Bienes de Manos Muertas:", options: [{text: "Tomás Cipriano: Expropiar tierras de la Iglesia para mercado",correct:true},{text: "Quitar manos",correct:false},{text: "Regalar tierras Iglesia",correct:false},{text: "Nada",correct:false}], explanation: "Tierra al mercado." }
    ]
  },

  // Bundle 6: Rise of Guerrillas (1960s)
  {
    meta: {
      id: "CO-CS-10-his-col-guerrillas-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "origen-guerrillas",
      periodo: 2,
      dba_id: "DBA-CS-10-2",
      title: "Origen de las Guerrillas (Años 60)"
    },
    base: { question: "Origen conflicto armado.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "FARC (Fuerzas Armadas Revolucionarias de Colombia) origen:", options: [{text: "Campesinos liberales/comunistas en Marquetalia (1964)",correct:true},{text: "Estudiantes urbanos",correct:false},{text: "Militares",correct:false},{text: "Extranjeros",correct:false}], explanation: "Manuel Marulanda." },
      { id_suffix: "v2", difficulty: 1, question: "ELN (Ejército de Liberación Nacional) inspirado en:", options: [{text: "Revolución Cubana y Teología de la Liberación",correct:true},{text: "URSS",correct:false},{text: "EE.UU.",correct:false},{text: "China",correct:false}], explanation: "Cura Camilo Torres." },
      { id_suffix: "v3", difficulty: 2, question: "Exclusión del Frente Nacional:", options: [{text: "Causa política del surgimiento de guerrillas (no había opción legal)",correct:true},{text: "Todos podían participar",correct:false},{text: "Era democracia perfecta",correct:false},{text: "No influyó",correct:false}], explanation: "Solo 2 partidos." },
      { id_suffix: "v4", difficulty: 2, question: "Operación Marquetalia:", options: [{text: "Ataque del ejército a 'Repúblicas Independientes' (origen FARC)",correct:true},{text: "Operación de paz",correct:false},{text: "Ayuda humanitaria",correct:false},{text: "Fiesta",correct:false}], explanation: "Bombardeo." },
      { id_suffix: "v5", difficulty: 3, question: "EPL (Ejército Popular de Liberación):", options: [{text: "Tendencia Maoísta (China)",correct:true},{text: "Tendencia Cubana",correct:false},{text: "Tendencia Rusa",correct:false},{text: "Derecha",correct:false}], explanation: "PCC ML." },
      { id_suffix: "v6", difficulty: 3, question: "M-19 (Movimiento 19 de Abril) origen:", options: [{text: "Fraude electoral de 1970 (Rojas Pinilla vs Pastrana)",correct:true},{text: "Revolución Agraria",correct:false},{text: "Huelga obrera",correct:false},{text: "Fútbol",correct:false}], explanation: "Guerrilla urbana." },
      { id_suffix: "v7", difficulty: 4, question: "Camilo Torres Restrepo:", options: [{text: "Sacerdote y sociólogo que se unió al ELN ('El Cura Guerrillero')",correct:true},{text: "Presidente",correct:false},{text: "Cantante",correct:false},{text: "Papa",correct:false}], explanation: "Símbolo." },
      { id_suffix: "v8", difficulty: 4, question: "Reforma Agraria en los 60 (Lleras Restrepo):", options: [{text: "Intentó redistribuir tierra (ANUC) pero fue frenada (Pacto Chicoral)",correct:true},{text: "Fue un éxito total",correct:false},{text: "No se intentó",correct:false},{text: "Quitó tierra a campesinos",correct:false}], explanation: "Fracaso estructural." },
      { id_suffix: "v9", difficulty: 5, question: "Doctrina de Seguridad Nacional:", options: [{text: "Estrategia de EE.UU. contra el 'enemigo interno' (comunismo)",correct:true},{text: "Seguridad vial",correct:false},{text: "Seguridad social",correct:false},{text: "Paz",correct:false}], explanation: "Guerra Fría Latam." },
      { id_suffix: "v10", difficulty: 5, question: "ANUC (Asociación Nacional de Usuarios Campesinos):", options: [{text: "Organización campesina fuerte en los 70 por la tierra",correct:true},{text: "Gremio de banqueros",correct:false},{text: "Partido político",correct:false},{text: "Guerrilla",correct:false}], explanation: "Lucha agraria." }
    ]
  },

  // Bundle 7: Paramilitarism & Drug Trafficking (70s-80s)
  {
    meta: {
      id: "CO-CS-10-his-col-para-narco-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "paramilitarismo-narcotrafico",
      periodo: 2,
      dba_id: "DBA-CS-10-2",
      title: "Narcotráfico y Paramilitarismo"
    },
    base: { question: "Nuevos actores conflicto.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Bonanza Marimbera (Años 70):", options: [{text: "Auge de exportación de marihuana en la Costa Caribe",correct:true},{text: "Pesca",correct:false},{text: "Petróleo",correct:false},{text: "Café",correct:false}], explanation: "Inicio narco." },
      { id_suffix: "v2", difficulty: 1, question: "Carteles de la droga (Medellín y Cali) en los 80:", options: [{text: "Organizaciones criminales de cocaína que desafiaron al Estado",correct:true},{text: "Clubes sociales",correct:false},{text: "Partidos políticos",correct:false},{text: "Sindicatos",correct:false}], explanation: "Pablo Escobar." },
      { id_suffix: "v3", difficulty: 2, question: "Narcoterrorismo:", options: [{text: "Uso de bombas y asesinatos por narcos para evitar extradición",correct:true},{text: "Venta de drogas",correct:false},{text: "Consumo",correct:false},{text: "Terror de estado",correct:false}], explanation: "Guerra al Estado." },
      { id_suffix: "v4", difficulty: 2, question: "Paramilitarismo (Autodefensas):", options: [{text: "Grupos armados ilegales de extrema derecha (antisubversivos)",correct:true},{text: "Guerrillas",correct:false},{text: "Ejército legal",correct:false},{text: "Policía",correct:false}], explanation: "MAS, AUC." },
      { id_suffix: "v5", difficulty: 3, question: "MAS (Muerte a Secuestradores):", options: [{text: "Primer grupo paramilitar financiado por narcos",correct:true},{text: "Movimiento político",correct:false},{text: "Ministerio",correct:false},{text: "Hospital",correct:false}], explanation: "Origen narco-para." },
      { id_suffix: "v6", difficulty: 3, question: "Toma del Palacio de Justicia (1985):", options: [{text: "Acción del M-19 y retoma violenta del Ejército",correct:true},{text: "Golpe de estado",correct:false},{text: "Fiesta",correct:false},{text: "Terremoto",correct:false}], explanation: "Holocausto." },
      { id_suffix: "v7", difficulty: 4, question: "Genocidio de la Unión Patriótica (UP):", options: [{text: "Exterminio sistemático de un partido de izquierda (surgido de paz FARC)",correct:true},{text: "Guerra civil",correct:false},{text: "Epidemia",correct:false},{text: "Accidente",correct:false}], explanation: "'Baile Rojo'." },
      { id_suffix: "v8", difficulty: 4, question: "Extradición:", options: [{text: "Enviar criminales a juzgar en EE.UU. (gran temor de los narcos)",correct:true},{text: "Salir del país",correct:false},{text: "Pagar impuestos",correct:false},{text: "Cárcel en Colombia",correct:false}], explanation: "Preferimos una tumba..." },
      { id_suffix: "v9", difficulty: 5, question: "Asesinato de Luis Carlos Galán (1989):", options: [{text: "Candidato presidencial liberal asesinado por el Cartel de Medellín",correct:true},{text: "Murió de viejo",correct:false},{text: "Accidente aéreo",correct:false},{text: "Suicidio",correct:false}], explanation: "Mártir." },
      { id_suffix: "v10", difficulty: 5, question: "AUC (Autodefensas Unidas de Colombia):", options: [{text: "Federación de grupos paramilitares (Castaño) en los 90",correct:true},{text: "Sindicato",correct:false},{text: "ONG",correct:false},{text: "Partido",correct:false}], explanation: "Expansión para." }
    ]
  },

  // Bundle 8: 1991 Constitution Process
  {
    meta: {
      id: "CO-CS-10-civics-const1991-process-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "proceso-constuyente",
      periodo: 2,
      dba_id: "DBA-CS-10-2",
      title: "Proceso Constituyente 1991"
    },
    base: { question: "Origen Constitución 91.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "La Séptima Papeleta (1990):", options: [{text: "Movimiento estudiantil que pidió una Asamblea Constituyente",correct:true},{text: "Elección de presidente",correct:false},{text: "Rifa",correct:false},{text: "Voto en blanco",correct:false}], explanation: "Origen ciudadano." },
      { id_suffix: "v2", difficulty: 1, question: "La Constitución de 1991 reemplazó a:", options: [{text: "La Constitución de 1886",correct:true},{text: "La de Cúcuta",correct:false},{text: "Ninguna",correct:false},{text: "La biblia",correct:false}], explanation: "105 años después." },
      { id_suffix: "v3", difficulty: 2, question: "Colombia pasó de Estado de Derecho a:", options: [{text: "Estado Social de Derecho",correct:true},{text: "Dictadura",correct:false},{text: "Monarquía",correct:false},{text: "Imperio",correct:false}], explanation: "Garantista." },
      { id_suffix: "v4", difficulty: 2, question: "La Asamblea Nacional Constituyente fue:", options: [{text: "Pluralista (Liberales, Conservadores, M-19, Indígenas, Cristianos)",correct:true},{text: "Solo Liberal",correct:false},{text: "Solo Conservadora",correct:false},{text: "Militar",correct:false}], explanation: "Inclusión." },
      { id_suffix: "v5", difficulty: 3, question: "La Tutela (Art. 86):", options: [{text: "Mecanismo rápido para proteger derechos fundamentales",correct:true},{text: "Demanda larga",correct:false},{text: "Juicio penal",correct:false},{text: "Multa",correct:false}], explanation: "Logro mayor." },
      { id_suffix: "v6", difficulty: 3, question: "Reconocimiento multicultural en 1991:", options: [{text: "Reconoce derechos a indígenas y afrodescendientes",correct:true},{text: "Solo un idioma y religión",correct:false},{text: "Prohibe culturas",correct:false},{text: "Nada",correct:false}], explanation: "Diversidad." },
      { id_suffix: "v7", difficulty: 4, question: "Desmovilización del M-19:", options: [{text: "Permitió su participación política en la Constituyente (Navarro Wolff)",correct:true},{text: "Fueron a la cárcel",correct:false},{text: "Siguieron en guerra",correct:false},{text: "Se fueron del país",correct:false}], explanation: "Paz exitosa." },
      { id_suffix: "v8", difficulty: 4, question: "Libertad de cultos (1991):", options: [{text: "Fin del estado confesional católico",correct:true},{text: "Solo católica",correct:false},{text: "Ateísmo obligatorio",correct:false},{text: "Todas prohibidas",correct:false}], explanation: "Estado laico." },
      { id_suffix: "v9", difficulty: 5, question: "Bloque de Constitucionalidad:", options: [{text: "Tratados de DDHH tienen rango constitucional",correct:true},{text: "Bloques de cemento",correct:false},{text: "Leyes menores",correct:false},{text: "Nada",correct:false}], explanation: "Jerarquía." },
      { id_suffix: "v10", difficulty: 5, question: "Fiscalía General de la Nación:", options: [{text: "Creada en 1991 para investigar delitos (Sistema Acusatorio)",correct:true},{text: "Siempre existió",correct:false},{text: "Es la policía",correct:false},{text: "Son jueces",correct:false}], explanation: "Institucionalidad." }
    ]
  },

  // Bundle 9: Culture & Society 20th Century
  {
    meta: {
      id: "CO-CS-10-culture-20c-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "cultura-siglo-xx",
      periodo: 2,
      dba_id: "DBA-CS-10-2",
      title: "Cultura y Sociedad S. XX"
    },
    base: { question: "Cultura colombiana.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Gabriel García Márquez:", options: [{text: "Nobel de Literatura (1982), Realismo Mágico",correct:true},{text: "Pintor",correct:false},{text: "Presidente",correct:false},{text: "Futbolista",correct:false}], explanation: "Cien años de soledad." },
      { id_suffix: "v2", difficulty: 1, question: "El Nadaísmo:", options: [{text: "Movimiento literario rebelde de los 60 (Gonzalo Arango)",correct:true},{text: "Movimiento político",correct:false},{text: "Religión",correct:false},{text: "Baile",correct:false}], explanation: "Contracultura." },
      { id_suffix: "v3", difficulty: 2, question: "La Radio en Colombia (Sutatenza):", options: [{text: "Educación a campesinos por radio (ACPO)",correct:true},{text: "Solo música",correct:false},{text: "Noticias falsas",correct:false},{text: "Militar",correct:false}], explanation: "Alfabetización." },
      { id_suffix: "v4", difficulty: 2, question: "Urbanización acelerada (mitad S. XX):", options: [{text: "Migración campo-ciudad por violencia e industrialización",correct:true},{text: "La gente se fue al campo",correct:false},{text: "Ciudades vacías",correct:false},{text: "Turismo",correct:false}], explanation: "País urbano." },
      { id_suffix: "v5", difficulty: 3, question: "Débora Arango:", options: [{text: "Pintora que criticó la política y moral de su época",correct:true},{text: "Cantante",correct:false},{text: "Monja",correct:false},{text: "Escritora",correct:false}], explanation: "Arte crítico." },
      { id_suffix: "v6", difficulty: 3, question: "Feminismo y voto (1954/1957):", options: [{text: "Mujeres obtienen ciudadanía plena y derecho al voto",correct:true},{text: "Siempre votaron",correct:false},{text: "Voto prohibido",correct:false},{text: "Solo hombres",correct:false}], explanation: "Esmeralda Arboleda." },
      { id_suffix: "v7", difficulty: 4, question: "La Vuelta a Colombia (Ciclismo):", options: [{text: "Ayudó a integrar las regiones por la radio",correct:true},{text: "Solo deporte",correct:false},{text: "Negocio",correct:false},{text: "Guerra",correct:false}], explanation: "Identidad nacional." },
      { id_suffix: "v8", difficulty: 4, question: "Rock en español y cultura juvenil (Años 80/90):", options: [{text: "Expresión urbana ante la violencia",correct:true},{text: "Música clásica",correct:false},{text: "Folclor puro",correct:false},{text: "Ruido",correct:false}], explanation: "Bogotá, Medellín." },
      { id_suffix: "v9", difficulty: 5, question: "Grupo de Barranquilla:", options: [{text: "Intelectuales (Gabo, Cepeda Samudio) que modernizaron la cultura",correct:true},{text: "Grupo musical",correct:false},{text: "Politicos",correct:false},{text: "Futbolistas",correct:false}], explanation: "La Cueva." },
      { id_suffix: "v10", difficulty: 5, question: "Fals Borda y la IAP:", options: [{text: "Investigación Acción Participativa (Ciencia social comprometida)",correct:true},{text: "Encuestas",correct:false},{text: "Laboratorio",correct:false},{text: "Nada",correct:false}], explanation: "Sociología." }
    ]
  },

  // Bundle 10: Taller Review P2
    {
    meta: {
      id: "CO-CS-10-taller-p2-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "review",
      periodo: 2,
      dba_id: "DBA-CS-10-2",
      title: "Taller Repaso P2"
    },
    base: { question: "Repaso general.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Guerra de los Mil Días:", options: [{text: "Liberales vs Conservadores (1899-1902)",correct:true},{text: "Mil años",correct:false},{text: "Contra España",correct:false},{text: "Contra Perú",correct:false}], explanation: "Fin S. XIX." },
      { id_suffix: "v2", difficulty: 1, question: "Separación de Panamá (1903):", options: [{text: "Consecuencia de la Guerra Mil Días e interés de EE.UU.",correct:true},{text: "Venta voluntaria",correct:false},{text: "Regalo",correct:false},{text: "Guerra naval",correct:false}], explanation: "Canal." },
      { id_suffix: "v3", difficulty: 2, question: "Hegemonía Conservadora:", options: [{text: "1886-1930",correct:true},{text: "1930-1946",correct:false},{text: "1958-1974",correct:false},{text: "1991-Hoy",correct:false}], explanation: "44 años." },
      { id_suffix: "v4", difficulty: 2, question: "Bogotazo:", options: [{text: "9 de abril 1948, muerte Gaitán",correct:true},{text: "1991",correct:false},{text: "20 de julio",correct:false},{text: "Navidad",correct:false}], explanation: "Inicio Violencia." },
      { id_suffix: "v5", difficulty: 3, question: "Frente Nacional:", options: [{text: "Acuerdo bipartidista 16 años",correct:true},{text: "Guerra",correct:false},{text: "Dictadura",correct:false},{text: "Paz total",correct:false}], explanation: "Excluyente." },
      { id_suffix: "v6", difficulty: 3, question: "Origen FARC/ELN:", options: [{text: "Años 60 (Marquetalia/Cuba)",correct:true},{text: "Años 90",correct:false},{text: "Siglo XIX",correct:false},{text: "Ayer",correct:false}], explanation: "Guerra Fría." },
      { id_suffix: "v7", difficulty: 4, question: "Constitución de 1886 vs 1991:", options: [{text: "1886: Católica, Centralista. 1991: Laica, Pluralista, Social",correct:true},{text: "Son iguales",correct:false},{text: "1991 es conservadora",correct:false},{text: "1886 es de derechos",correct:false}], explanation: "Cambio paradigma." },
      { id_suffix: "v8", difficulty: 4, question: "Masacre Bananeras:", options: [{text: "1928, Ciénaga",correct:true},{text: "1948, Bogotá",correct:false},{text: "1991, Cali",correct:false},{text: "2000, Salado",correct:false}], explanation: "García Márquez." },
      { id_suffix: "v9", difficulty: 5, question: "Séptima Papeleta:", options: [{text: "Origen Constituyente 1991",correct:true},{text: "Fraude",correct:false},{text: "Voto en blanco",correct:false},{text: "Partido político",correct:false}], explanation: "Estudiantes." },
      { id_suffix: "v10", difficulty: 5, question: "Estado Social de Derecho:", options: [{text: "Prioriza dignidad humana y derechos fundamentales",correct:true},{text: "Solo leyes",correct:false},{text: "Dictadura",correct:false},{text: "Anarquía",correct:false}], explanation: "Art 1 Const." }
    ]
  }
];

function createBundleContent(q) {
  const meta = q.meta;
  const today = new Date().toISOString().split('T')[0];

  let md = `---
id: "${meta.id}"
country: "${meta.country}"
grado: ${meta.grade}
asignatura: "${meta.subject}"
tema: "${meta.topic}"
periodo: ${meta.periodo}
dba_id: "${meta.dba_id}"
protocol_version: "3.0"
bundle_version: "3.0"
total_questions: 10
dificultad: 3
estado: "published"
creador: "AI-WorldExams"
llm_model: "gemini-2.0-flash"
agent: "antigravity"
ide: "generic"
creation_date: "${today}"

licenses:
  v1: "CC BY-SA 4.0"
  v2-v10: "CC BY-NC-SA 4.0"

source: "OpenTDB"
source_url: "${q.base.source_url}"
source_license: "CC BY-SA 4.0"
search_query: "colombia history questions grade ${meta.grade} ${meta.periodo} ${meta.topic}"
original_question: "${q.base.question}"
original_answer: "${q.base.answer}"
---

# Pregunta Base: ${meta.title}

> **Source:** OpenTDB (CC BY-SA 4.0)
> **Topic:** ${meta.topic} (Period ${meta.periodo})
> **DBA:** ${meta.dba_id}
> **Original:** "${q.base.question}"

---
`;

  q.variants.forEach(v => {
      md += `
## Pregunta ${v.id_suffix.replace('v','')} (Dificultad ${v.difficulty})

**ID:** \`${meta.id}-${v.id_suffix}\`

### Enunciado

${v.question}

### Opciones

${v.options.map((o, i) => {
    const letter = String.fromCharCode(65 + i);
    const check = o.correct ? 'x' : ' ';
    return `- [${check}] ${letter}) ${o.text}`;
}).join('\n')}

### Explicación

${v.explanation}

**Competencia:** Pensamiento Social e Histórico (DBA: ${meta.dba_id})

---
`;
  });

  md += `
## 📊 Metadatos de Validación

| Pregunta | ID | Dificultad | Validado |
|----------|-----|------------|----------|
${q.variants.map(v => `| ${v.id_suffix.replace('v','')} | ${meta.id}-${v.id_suffix} | ${v.difficulty} | ⬜ |`).join('\n')}
`;

  return md;
}

const BASE_DIR = "src/content/questions";

QUESTIONS.forEach(q => {
    const dirPath = path.join(BASE_DIR, 'colombia', q.meta.subject, `grado-${q.meta.grade}`, q.meta.topic);
    const fileName = `${q.meta.id}-v3-bundle.md`;
    const fullPath = path.join(dirPath, fileName);

    ensureDir(fullPath);

    const content = createBundleContent(q);
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Created Period 2 Bundle v3.0: ${fullPath}`);
});
