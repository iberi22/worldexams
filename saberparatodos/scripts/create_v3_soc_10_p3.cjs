
const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

const QUESTIONS = [
  // Bundle 1: State vs Government vs Nation
  {
    meta: {
      id: "CO-CS-10-civics-state-gov-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "estado-gobierno-nacion",
      periodo: 3,
      dba_id: "DBA-CS-10-3",
      title: "Estado, Gobierno y Nación"
    },
    base: { question: "Diferencia conceptos.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Estado:", options: [{text: "Conjunto de instituciones que poseen autoridad y potestad sobre un territorio",correct:true},{text: "Grupo de amigos",correct:false},{text: "Un edificio",correct:false},{text: "La policía",correct:false}], explanation: "Institución permanente." },
      { id_suffix: "v2", difficulty: 1, question: "Gobierno:", options: [{text: "Grupo de personas que administran el Estado temporalmente",correct:true},{text: "El Estado mismo",correct:false},{text: "La tierra",correct:false},{text: "La constitución",correct:false}], explanation: "Gestión temporal." },
      { id_suffix: "v3", difficulty: 2, question: "Nación:", options: [{text: "Comunidad humana con historia, cultura y lengua común",correct:true},{text: "País con fronteras",correct:false},{text: "Ejército",correct:false},{text: "Ley",correct:false}], explanation: "Identidad cultural." },
      { id_suffix: "v4", difficulty: 2, question: "Colombia es un Estado Social de Derecho porque:", options: [{text: "Garantiza derechos sociales (salud, educación) y dignidad humana",correct:true},{text: "Solo aplica la ley",correct:false},{text: "Es socialista",correct:false},{text: "Es comunista",correct:false}], explanation: "Art 1 Constitución." },
      { id_suffix: "v5", difficulty: 3, question: "Soberanía Popular:", options: [{text: "El poder reside en el pueblo",correct:true},{text: "El poder es del Rey",correct:false},{text: "El poder es del ejército",correct:false},{text: "El poder es de Dios",correct:false}], explanation: "Base democracia." },
      { id_suffix: "v6", difficulty: 3, question: "Territorio:", options: [{text: "Espacio físico (suelo, subsuelo, aire, mar) donde el Estado ejerce soberanía",correct:true},{text: "Solo la tierra firme",correct:false},{text: "Las casas",correct:false},{text: "El planeta",correct:false}], explanation: "Elemento Estado." },
      { id_suffix: "v7", difficulty: 4, question: "Legitimidad:", options: [{text: "Aceptación y reconocimiento del poder por parte de los ciudadanos",correct:true},{text: "Fuerza bruta",correct:false},{text: "Dinero",correct:false},{text: "Miedo",correct:false}], explanation: "Poder válido." },
      { id_suffix: "v8", difficulty: 4, question: "Plurinacionalidad (ej: Bolivia):", options: [{text: "Reconocimiento de múltiples naciones/culturas dentro de un Estado",correct:true},{text: "Muchos países",correct:false},{text: "Sin gobierno",correct:false},{text: "Una sola raza",correct:false}], explanation: "Diversidad." },
      { id_suffix: "v9", difficulty: 5, question: "Estado Fallido:", options: [{text: "Cuando el Estado pierde el monopolio de la fuerza y no garantiza servicios básicos",correct:true},{text: "País pobre",correct:false},{text: "País pequeño",correct:false},{text: "Sin presidente",correct:false}], explanation: "Pérdida control." },
      { id_suffix: "v10", difficulty: 5, question: "Gobernanza:", options: [{text: "Colaboración entre gobierno y sociedad civil para tomar decisiones",correct:true},{text: "Mandar solo",correct:false},{text: "Dictadura",correct:false},{text: "Anarquía",correct:false}], explanation: "Gestión pública." }
    ]
  },

  // Bundle 2: Executive Branch
  {
    meta: {
      id: "CO-CS-10-civics-exec-branch-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "rama-ejecutiva",
      periodo: 3,
      dba_id: "DBA-CS-10-3",
      title: "Rama Ejecutiva"
    },
    base: { question: "Funciones Ejecutivo.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Máxima autoridad de la Rama Ejecutiva:", options: [{text: "Presidente de la República",correct:true},{text: "Senador",correct:false},{text: "Juez",correct:false},{text: "Alcalde local",correct:false}], explanation: "Jefe de Estado." },
      { id_suffix: "v2", difficulty: 1, question: "El Presidente es:", options: [{text: "Jefe de Estado, Jefe de Gobierno y Suprema Autoridad Administrativa",correct:true},{text: "Solo jefe de gobierno",correct:false},{text: "Jefe de los jueces",correct:false},{text: "Dueño del país",correct:false}], explanation: "Triple función." },
      { id_suffix: "v3", difficulty: 2, question: "Función principal Rama Ejecutiva:", options: [{text: "Administrar el Estado y hacer cumplir las leyes",correct:true},{text: "Hacer las leyes",correct:false},{text: "Juzgar delitos",correct:false},{text: "Vigilar",correct:false}], explanation: "Ejecutar." },
      { id_suffix: "v4", difficulty: 2, question: "Nivel departamental ejecutivo liderado por:", options: [{text: "Gobernador",correct:true},{text: "Alcalde",correct:false},{text: "Presidente",correct:false},{text: "Concejal",correct:false}], explanation: "Departamento." },
      { id_suffix: "v5", difficulty: 3, question: "Nivel municipal ejecutivo liderado por:", options: [{text: "Alcalde",correct:true},{text: "Gobernador",correct:false},{text: "Diputado",correct:false},{text: "Edil",correct:false}], explanation: "Municipio." },
      { id_suffix: "v6", difficulty: 3, question: "Ministerios:", options: [{text: "Entidades encargadas de temas específicos (Salud, Educación) bajo el Presidente",correct:true},{text: "Empresas privadas",correct:false},{text: "Juzgados",correct:false},{text: "Iglesias",correct:false}], explanation: "Gabinete." },
      { id_suffix: "v7", difficulty: 4, question: "Superintendencias:", options: [{text: "Vigilan y controlan actividades económicas (Bancos, Industria)",correct:true},{text: "Hacen leyes",correct:false},{text: "Son jueces",correct:false},{text: "Son militares",correct:false}], explanation: "Inspección." },
      { id_suffix: "v8", difficulty: 4, question: "Fuerza Pública (Ejército y Policía):", options: [{text: "Pertenecen a la Rama Ejecutiva (MinDefensa)",correct:true},{text: "Rama Judicial",correct:false},{text: "Rama Legislativa",correct:false},{text: "Son independientes",correct:false}], explanation: "Mando presidencial." },
      { id_suffix: "v9", difficulty: 5, question: "Decretos con fuerza de ley:", options: [{text: "Normas expedidas por el Presidente en estados de excepción",correct:true},{text: "Leyes del congreso",correct:false},{text: "Sentencias",correct:false},{text: "Cartas",correct:false}], explanation: "Poder legislativo temporal." },
      { id_suffix: "v10", difficulty: 5, question: "Vicepresidente funciones:", options: [{text: "Reemplazar al Presidente y cumplir tareas asignadas",correct:true},{text: "Mandar en el Congreso",correct:false},{text: "Ser juez",correct:false},{text: "Nada",correct:false}], explanation: "Sucesión." }
    ]
  },

  // Bundle 3: Legislative Branch
  {
    meta: {
      id: "CO-CS-10-civics-legis-branch-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "rama-legislativa",
      periodo: 3,
      dba_id: "DBA-CS-10-3",
      title: "Rama Legislativa"
    },
    base: { question: "Funciones Congreso.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Rama Legislativa está conformada por:", options: [{text: "Congreso de la República",correct:true},{text: "Presidente",correct:false},{text: "Cortes",correct:false},{text: "Fiscalía",correct:false}], explanation: "Hacer leyes." },
      { id_suffix: "v2", difficulty: 1, question: "El Congreso es bicameral, tiene:", options: [{text: "Senado y Cámara de Representantes",correct:true},{text: "Senado y Presidente",correct:false},{text: "Cámara Alta y Baja",correct:false},{text: "Dos presidentes",correct:false}], explanation: "Estructura." },
      { id_suffix: "v3", difficulty: 2, question: "Función principal del Congreso:", options: [{text: "Hacer las leyes y reformar la Constitución",correct:true},{text: "Juzgar ladrones",correct:false},{text: "Capturar delincuentes",correct:false},{text: "Gastar dinero",correct:false}], explanation: "Legislar." },
      { id_suffix: "v4", difficulty: 2, question: "Control Político:", options: [{text: "Vigilar las acciones del Gobierno (Ejecutivo)",correct:true},{text: "Vigilar a los ciudadanos",correct:false},{text: "Hacer política",correct:false},{text: "Votar",correct:false}], explanation: "Moción de censura." },
      { id_suffix: "v5", difficulty: 3, question: "Senado de la República:", options: [{text: "Circunscripción nacional (lo eligen en todo el país)",correct:true},{text: "Regional",correct:false},{text: "Local",correct:false},{text: "Internacional",correct:false}], explanation: "Representación nacional." },
      { id_suffix: "v6", difficulty: 3, question: "Cámara de Representantes:", options: [{text: "Circunscripción territorial (por departamentos)",correct:true},{text: "Nacional",correct:false},{text: "Mundial",correct:false},{text: "Barrial",correct:false}], explanation: "Representación regional." },
      { id_suffix: "v7", difficulty: 4, question: "Moción de Censura:", options: [{text: "El Congreso puede destituir a Ministros por mala gestión",correct:true},{text: "Destituir al Presidente",correct:false},{text: "Criticar",correct:false},{text: "Censurar prensa",correct:false}], explanation: "Sanción política." },
      { id_suffix: "v8", difficulty: 4, question: "Asamblea Departamental:", options: [{text: "Corporación legislativa/administrativa del departamento (Diputados)",correct:true},{text: "Congreso chiquito",correct:false},{text: "Concejo",correct:false},{text: "Junta",correct:false}], explanation: "Ordenanzas." },
      { id_suffix: "v9", difficulty: 5, question: "Concejo Municipal:", options: [{text: "Corporación del municipio (Concejales) - expide Acuerdos",correct:true},{text: "Leyes",correct:false},{text: "Decretos",correct:false},{text: "Fallos",correct:false}], explanation: "Nivel local." },
      { id_suffix: "v10", difficulty: 5, question: "Ley Estatutaria:", options: [{text: "Regula derechos fundamentales, requiere mayoría absoluta y revisión previa Corte",correct:true},{text: "Ley ordinaria",correct:false},{text: "Decreto",correct:false},{text: "Resolución",correct:false}], explanation: "Mayor jerarquía." }
    ]
  },

  // Bundle 4: Judicial Branch
  {
    meta: {
      id: "CO-CS-10-civics-jud-branch-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "rama-judicial",
      periodo: 3,
      dba_id: "DBA-CS-10-3",
      title: "Rama Judicial"
    },
    base: { question: "Funciones Justicia.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Función Rama Judicial:", options: [{text: "Administrar justicia y resolver conflictos",correct:true},{text: "Hacer leyes",correct:false},{text: "Construir carreteras",correct:false},{text: "Cobrar impuestos",correct:false}], explanation: "Jueces." },
      { id_suffix: "v2", difficulty: 1, question: "Corte Constitucional:", options: [{text: "Guarda la integridad de la Constitución (revisa tutelas y leyes)",correct:true},{text: "Juzga criminales",correct:false},{text: "Investiga",correct:false},{text: "Hace leyes",correct:false}], explanation: "Guardián Carta." },
      { id_suffix: "v3", difficulty: 2, question: "Corte Suprema de Justicia:", options: [{text: "Máximo tribunal de la jurisdicción ordinaria (juzga congresistas)",correct:true},{text: "Corte de tutelas",correct:false},{text: "Corte administrativa",correct:false},{text: "Policía",correct:false}], explanation: "Casación." },
      { id_suffix: "v4", difficulty: 2, question: "Consejo de Estado:", options: [{text: "Máximo tribunal de lo contencioso administrativo (conflictos Estado-ciudadanos)",correct:true},{text: "Consejo del Presidente",correct:false},{text: "Jueces de paz",correct:false},{text: "Senado",correct:false}], explanation: "Juez del Estado." },
      { id_suffix: "v5", difficulty: 3, question: "Fiscalía General de la Nación:", options: [{text: "Investiga delitos y acusa a presuntos infractores",correct:true},{text: "Juzga y condena",correct:false},{text: "Defiende al acusado",correct:false},{text: "Policía de tránsito",correct:false}], explanation: "Ente acusador (Rama Judicial)." },
      { id_suffix: "v6", difficulty: 3, question: "Consejo Superior de la Judicatura:", options: [{text: "Administra la Rama Judicial y vigila abogados/jueces",correct:true},{text: "Juzga presidentes",correct:false},{text: "Hace leyes",correct:false},{text: "Cobra multas",correct:false}], explanation: "Administración." },
      { id_suffix: "v7", difficulty: 4, question: "JEP (Jurisdicción Especial para la Paz):", options: [{text: "Justicia transicional para conflicto armado (2016)",correct:true},{text: "Justicia ordinaria",correct:false},{text: "Corte suprema",correct:false},{text: "Fiscalía",correct:false}], explanation: "Acuerdo paz." },
      { id_suffix: "v8", difficulty: 4, question: "Acción de Tutela:", options: [{text: "Protege derechos fundamentales vulnerados (fallo en 10 días)",correct:true},{text: "Protege derechos colectivos",correct:false},{text: "Protege animales",correct:false},{text: "Demora años",correct:false}], explanation: "Art 86." },
      { id_suffix: "v9", difficulty: 5, question: "Acción Popular:", options: [{text: "Protege derechos e intereses colectivos (espacio público, ambiente)",correct:true},{text: "Derechos fundamentales",correct:false},{text: "Derechos privados",correct:false},{text: "Voto popular",correct:false}], explanation: "Comunidad." },
      { id_suffix: "v10", difficulty: 5, question: "Independencia de poderes:", options: [{text: "Las ramas son autónomas pero colaboran armónicamente",correct:true},{text: "Son enemigas",correct:false},{text: "El presidente manda a la corte",correct:false},{text: "La corte manda al congreso",correct:false}], explanation: "Pesos y contrapesos." }
    ]
  },

  // Bundle 5: Control Organizations bodies
  {
    meta: {
      id: "CO-CS-10-civics-control-orgs-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "organismos-control",
      periodo: 3,
      dba_id: "DBA-CS-10-3",
      title: "Organismos de Control"
    },
    base: { question: "Funciones control.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Organismos de Control:", options: [{text: "No pertenecen a ninguna rama (Procuraduría, Contraloría, Defensoría)",correct:true},{text: "Son del gobierno",correct:false},{text: "Son jueces",correct:false},{text: "Son ONGs",correct:false}], explanation: "Autonomía." },
      { id_suffix: "v2", difficulty: 1, question: "Procuraduría General de la Nación:", options: [{text: "Vigila la conducta de los funcionarios públicos (Disciplinario)",correct:true},{text: "Vigila el dinero",correct:false},{text: "Defiende al pueblo",correct:false},{text: "Juzga criminales",correct:false}], explanation: "Sanciona funcionarios." },
      { id_suffix: "v3", difficulty: 2, question: "Contraloría General de la República:", options: [{text: "Vigila la gestión fiscal (dineros públicos)",correct:true},{text: "Vigila funcionarios",correct:false},{text: "Hace leyes",correct:false},{text: "Cobra impuestos",correct:false}], explanation: "Control fiscal." },
      { id_suffix: "v4", difficulty: 2, question: "Defensoría del Pueblo:", options: [{text: "Promueve y protege los Derechos Humanos",correct:true},{text: "Juzga delitos",correct:false},{text: "Maneja dinero",correct:false},{text: "Vigila alcaldes",correct:false}], explanation: "DDHH." },
      { id_suffix: "v5", difficulty: 3, question: "Ministerio Público está formado por:", options: [{text: "Procuraduría y Defensoría del Pueblo",correct:true},{text: "Fiscalía y Jueces",correct:false},{text: "Contraloría y Bancos",correct:false},{text: "Ejército y Policía",correct:false}], explanation: "Ente." },
      { id_suffix: "v6", difficulty: 3, question: "Personería Municipal:", options: [{text: "Representante del Ministerio Público en el municipio (DDHH, vigilancia)",correct:true},{text: "Alcalde",correct:false},{text: "Juez local",correct:false},{text: "Policía",correct:false}], explanation: "Nivel local." },
      { id_suffix: "v7", difficulty: 4, question: "Control Disciplinario:", options: [{text: "Sanciona faltas de funcionarios (destitución, inhabilidad)",correct:true},{text: "Cárcel",correct:false},{text: "Multa de tráfico",correct:false},{text: "Regaño",correct:false}], explanation: "Procuraduría." },
      { id_suffix: "v8", difficulty: 4, question: "Control Fiscal:", options: [{text: "Verifica que el dinero público se gaste bien",correct:true},{text: "Cobra IVA",correct:false},{text: "Paga sueldos",correct:false},{text: "Hace presupuesto",correct:false}], explanation: "Contraloría." },
      { id_suffix: "v9", difficulty: 5, question: "Veeduría Ciudadana:", options: [{text: "Mecanismo para que ciudadanos vigilen la gestión pública",correct:true},{text: "Espionaje",correct:false},{text: "Policía secreta",correct:false},{text: "Sindicato",correct:false}], explanation: "Participación." },
      { id_suffix: "v10", difficulty: 5, question: "¿La Fiscalía es organismo de control?", options: [{text: "No, pertenece a la Rama Judicial",correct:true},{text: "Sí, es de control",correct:false},{text: "Es del gobierno",correct:false},{text: "Es legislativo",correct:false}], explanation: "Confusión común." }
    ]
  },

  // Bundle 6: Electoral Organization
  {
    meta: {
      id: "CO-CS-10-civics-electoral-org-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "organizacion-electoral",
      periodo: 3,
      dba_id: "DBA-CS-10-3",
      title: "Organización Electoral"
    },
    base: { question: "Sistema electoral.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Organización Electoral:", options: [{text: "Registraduría y Consejo Nacional Electoral (CNE)",correct:true},{text: "Presidencia",correct:false},{text: "Congreso",correct:false},{text: "Cortes",correct:false}], explanation: "Elecciones." },
      { id_suffix: "v2", difficulty: 1, question: "Registraduría Nacional del Estado Civil:", options: [{text: "Organiza elecciones e identifica a ciudadanos (cédulas)",correct:true},{text: "Vigila partidos",correct:false},{text: "Hace leyes",correct:false},{text: "Juzga",correct:false}], explanation: "Logística e identidad." },
      { id_suffix: "v3", difficulty: 2, question: "CNE (Consejo Nacional Electoral):", options: [{text: "Vigila y regula la actividad de los partidos y elecciones",correct:true},{text: "Cuenta votos",correct:false},{text: "Hace cédulas",correct:false},{text: "Nombra alcaldes",correct:false}], explanation: "Autoridad." },
      { id_suffix: "v4", difficulty: 2, question: "Cédula de Ciudadanía:", options: [{text: "Documento de identidad para mayores de 18 (votar)",correct:true},{text: "Tarjeta de crédito",correct:false},{text: "Pasaporte",correct:false},{text: "Licencia conducción",correct:false}], explanation: "Identidad." },
      { id_suffix: "v5", difficulty: 3, question: "Censo Electoral:", options: [{text: "Lista de ciudadanos habilitados para votar",correct:true},{text: "Censo de población",correct:false},{text: "Lista de candidatos",correct:false},{text: "Lista de jurados",correct:false}], explanation: "Votantes." },
      { id_suffix: "v6", difficulty: 3, question: "Jurado de Votación:", options: [{text: "Ciudadano seleccionado para atender mesa y contar votos",correct:true},{text: "Juez de la república",correct:false},{text: "Policía",correct:false},{text: "Político",correct:false}], explanation: "Deber." },
      { id_suffix: "v7", difficulty: 4, question: "Voto en Blanco:", options: [{text: "Expresión política de disenso (si gana, se repite elección)",correct:true},{text: "Voto nulo",correct:false},{text: "Voto perdido",correct:false},{text: "No cuenta",correct:false}], explanation: "Efecto político." },
      { id_suffix: "v8", difficulty: 4, question: "Umbral electoral:", options: [{text: "Mínimo de votos para que un partido tenga curules/personería",correct:true},{text: "Techo de votos",correct:false},{text: "Puerta de entrada",correct:false},{text: "Voto nulo",correct:false}], explanation: "Supervivencia partido." },
      { id_suffix: "v9", difficulty: 5, question: "Cifra Repartidora:", options: [{text: "Método matemático para asignar curules (D'Hondt)",correct:true},{text: "Repartir dinero",correct:false},{text: "Sorteo",correct:false},{text: "Dedo",correct:false}], explanation: "Asignación escasos." },
      { id_suffix: "v10", difficulty: 5, question: "Voto preferente vs Lista cerrada:", options: [{text: "Preferente: Votas por candidato. Cerrada: Votas por partido",correct:true},{text: "Son iguales",correct:false},{text: "Cerrada no se vota",correct:false},{text: "Preferente es secreto",correct:false}], explanation: "Sistemas lista." }
    ]
  },

  // Bundle 7: Citizen Participation
  {
    meta: {
      id: "CO-CS-10-civics-participation-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "participacion-ciudadana",
      periodo: 3,
      dba_id: "DBA-CS-10-3",
      title: "Mecanismos de Participación"
    },
    base: { question: "Mecanismo participación.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Voto:", options: [{text: "Derecho y deber ciudadano para elegir representantes",correct:true},{text: "Obligación militar",correct:false},{text: "Pago impuesto",correct:false},{text: "Encuesta",correct:false}], explanation: "Democracia." },
      { id_suffix: "v2", difficulty: 1, question: "Referendo:", options: [{text: "Pueblo aprueba o rechaza una norma jurídica",correct:true},{text: "Elige alcalde",correct:false},{text: "Pide un favor",correct:false},{text: "Queja",correct:false}], explanation: "Si/No norma." },
      { id_suffix: "v3", difficulty: 2, question: "Plebiscito:", options: [{text: "Presidente consulta al pueblo sobre una decisión política (Si/No)",correct:true},{text: "Norma jurídica",correct:false},{text: "Elección",correct:false},{text: "Juicio",correct:false}], explanation: "Ej: Paz 2016." },
      { id_suffix: "v4", difficulty: 2, question: "Consulta Popular:", options: [{text: "Pregunta al pueblo sobre asunto de trascendencia nacional/local",correct:true},{text: "Examen médico",correct:false},{text: "Pregunta al vecino",correct:false},{text: "Chat",correct:false}], explanation: "Ej: Minería." },
      { id_suffix: "v5", difficulty: 3, question: "Cabildo Abierto:", options: [{text: "Reunión pública de concejos/juntas donde ciudadanos participan",correct:true},{text: "Fiesta en la plaza",correct:false},{text: "Cerrado",correct:false},{text: "Misa",correct:false}], explanation: "Discusión local." },
      { id_suffix: "v6", difficulty: 3, question: "Iniciativa Legislativa:", options: [{text: "Ciudadanos presentan proyectos de ley (firmas)",correct:true},{text: "Protesta",correct:false},{text: "Demanda",correct:false},{text: "Carta",correct:false}], explanation: "Crear ley." },
      { id_suffix: "v7", difficulty: 4, question: "Revocatoria del Mandato:", options: [{text: "Ciudadanos terminan mandato de Alcalde/Gobernador por incumplimiento",correct:true},{text: "Sacan al Presidente",correct:false},{text: "Sacan a un Senador",correct:false},{text: "Despido laboral",correct:false}], explanation: "Solo alcaldes/gobernadores." },
      { id_suffix: "v8", difficulty: 4, question: "Voto Programático:", options: [{text: "Al elegir alcalde/gobernador, se impone cumplir su programa de gobierno",correct:true},{text: "Votar por el más guapo",correct:false},{text: "Voto electrónico",correct:false},{text: "Voto comprado",correct:false}], explanation: "Base revocatoria." },
      { id_suffix: "v9", difficulty: 5, question: "Derecho de Petición (Art 23):", options: [{text: "Facultad de pedir información/respuesta a autoridades (15 días)",correct:true},{text: "Pedir dinero",correct:false},{text: "Pedir perdón",correct:false},{text: "Demanda penal",correct:false}], explanation: "Fundamental." },
      { id_suffix: "v10", difficulty: 5, question: "Diferencia Plebiscito vs Referendo:", options: [{text: "Plebiscito: Decisión política del Ejecutivo. Referendo: Norma jurídica.",correct:true},{text: "Son iguales",correct:false},{text: "Referendo es para elegir presidente",correct:false},{text: "Plebiscito es una ley",correct:false}], explanation: "Clave." }
    ]
  },

  // Bundle 8: Public Finance Basics
  {
    meta: {
      id: "CO-CS-10-econ-public-finance-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "finanzas-publicas",
      periodo: 3,
      dba_id: "DBA-CS-10-3",
      title: "Hacienda Pública y Presupuesto"
    },
    base: { question: "Economía estatal.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Impuestos:", options: [{text: "Dinero que ciudadanos pagan al Estado para financiar gasto público",correct:true},{text: "Multas",correct:false},{text: "Regalos",correct:false},{text: "Robo",correct:false}], explanation: "Tributación." },
      { id_suffix: "v2", difficulty: 1, question: "IVA (Impuesto al Valor Agregado):", options: [{text: "Impuesto indirecto al consumo",correct:true},{text: "Impuesto a la renta",correct:false},{text: "Impuesto a la riqueza",correct:false},{text: "Impuesto predial",correct:false}], explanation: "Consumo." },
      { id_suffix: "v3", difficulty: 2, question: "Presupuesto General de la Nación:", options: [{text: "Plan de ingresos y gastos del Estado para un año",correct:true},{text: "Cuenta de ahorros",correct:false},{text: "Deuda externa",correct:false},{text: "Bolsa de valores",correct:false}], explanation: "Ley anual." },
      { id_suffix: "v4", difficulty: 2, question: "Regalías:", options: [{text: "Pago por explotación de recursos naturales no renovables",correct:true},{text: "Regalos del rey",correct:false},{text: "Impuesto a la renta",correct:false},{text: "Propina",correct:false}], explanation: "Petróleo/Minería." },
      { id_suffix: "v5", difficulty: 3, question: "Déficit Fiscal:", options: [{text: "Cuando el Estado gasta más de lo que recibe",correct:true},{text: "Cuando sobra dinero",correct:false},{text: "Ahorro",correct:false},{text: "Ganancia",correct:false}], explanation: "Gasto > Ingreso." },
      { id_suffix: "v6", difficulty: 3, question: "Inflación:", options: [{text: "Aumento generalizado de precios (pérdida poder adquisitivo)",correct:true},{text: "Bajada de precios",correct:false},{text: "Más empleo",correct:false},{text: "Más producción",correct:false}], explanation: "IPC." },
      { id_suffix: "v7", difficulty: 4, question: "Banco de la República:", options: [{text: "Banco central, controla inflación y emite moneda",correct:true},{text: "Banco comercial",correct:false},{text: "Presta dinero a gente",correct:false},{text: "Cobra impuestos",correct:false}], explanation: "Política monetaria." },
      { id_suffix: "v8", difficulty: 4, question: "Política Fiscal:", options: [{text: "Manejo de impuestos y gasto público (Gobierno)",correct:true},{text: "Manejo de tasas de interés (Banco)",correct:false},{text: "Manejo de policía",correct:false},{text: "Leyes penales",correct:false}], explanation: "Hacienda." },
      { id_suffix: "v9", difficulty: 5, question: "Evasión vs Elusión:", options: [{text: "Evasión es delito (no pagar ilegalmente), Elusión es uso de vacíos legales",correct:true},{text: "Son iguales",correct:false},{text: "Elusión es delito",correct:false},{text: "Evasión es legal",correct:false}], explanation: "Tributaria." },
      { id_suffix: "v10", difficulty: 5, question: "SGP (Sistema General de Participaciones):", options: [{text: "Transferencias de la Nación a regiones para salud/educación",correct:true},{text: "Impuesto",correct:false},{text: "Banco",correct:false},{text: "ONG",correct:false}], explanation: "Descentralización." }
    ]
  },

  // Bundle 9: Cultural Diversity & Constitution
  {
    meta: {
      id: "CO-CS-10-civics-diversity-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "diversidad-etnica",
      periodo: 3,
      dba_id: "DBA-CS-10-3",
      title: "Diversidad Étnica y Cultural"
    },
    base: { question: "Derechos minorías.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Colombia es un país:", options: [{text: "Pluriétnico y multicultural (según Constitución)",correct:true},{text: "Solo blanco",correct:false},{text: "Solo mestizo",correct:false},{text: "Sin etnias",correct:false}], explanation: "Reconocimiento." },
      { id_suffix: "v2", difficulty: 1, question: "Pueblos Indígenas:", options: [{text: "Tienen jurisdicción especial y autonomía en resguardos",correct:true},{text: "No tienen derechos",correct:false},{text: "Se rigen solo por ley ordinaria",correct:false},{text: "Son extranjeros",correct:false}], explanation: "Autonomía." },
      { id_suffix: "v3", difficulty: 2, question: "Comunidades Afrocolombianas (Ley 70):", options: [{text: "Reconocimiento de tierras colectivas y cultura",correct:true},{text: "Esclavitud",correct:false},{text: "Sin derechos",correct:false},{text: "Solo en ciudades",correct:false}], explanation: "Negritudes." },
      { id_suffix: "v4", difficulty: 2, question: "Raizales:", options: [{text: "Comunidad étnica de San Andrés y Providencia (hablan Creole)",correct:true},{text: "Indígenas del Amazonas",correct:false},{text: "Campesinos",correct:false},{text: "Extranjeros",correct:false}], explanation: "Insulares." },
      { id_suffix: "v5", difficulty: 3, question: "Consulta Previa:", options: [{text: "Derecho a ser consultados sobre proyectos en sus territorios",correct:true},{text: "Votar en elecciones",correct:false},{text: "Ir al médico",correct:false},{text: "Tener cédula",correct:false}], explanation: "Fundamental grupos étnicos." },
      { id_suffix: "v6", difficulty: 3, question: "Resguardo Indígena:", options: [{text: "Territorio colectivo e inalienable",correct:true},{text: "Finca privada",correct:false},{text: "Parque",correct:false},{text: "Ciudad",correct:false}], explanation: "Propiedad colectiva." },
      { id_suffix: "v7", difficulty: 4, question: "Jurisdicción Especial Indígena:", options: [{text: "Autoridades indígenas pueden juzgar según sus normas (límites DDHH)",correct:true},{text: "Justicia ordinaria",correct:false},{text: "No existe justicia",correct:false},{text: "Pena de muerte",correct:false}], explanation: "Justicia propia." },
      { id_suffix: "v8", difficulty: 4, question: "ROM (Gitanos):", options: [{text: "Pueblo étnico reconocido con tradición nómada",correct:true},{text: "Extranjeros ilegales",correct:false},{text: "No existen en Colombia",correct:false},{text: "Son turistas",correct:false}], explanation: "Kumpanyas." },
      { id_suffix: "v9", difficulty: 5, question: "Discriminación positiva (Acciones afirmativas):", options: [{text: "Medidas para favorecer grupos históricamente discriminados (cupos, subsidios)",correct:true},{text: "Discriminar legalmente",correct:false},{text: "Racismo inverso",correct:false},{text: "Odio",correct:false}], explanation: "Equidad." },
      { id_suffix: "v10", difficulty: 5, question: "Curules especiales Congreso:", options: [{text: "Asientos reservados para Indígenas y Afrodescendientes",correct:true},{text: "Para ricos",correct:false},{text: "Para militares",correct:false},{text: "Para extranjeros",correct:false}], explanation: "Representación." }
    ]
  },

  // Bundle 10: Taller Review P3
    {
    meta: {
      id: "CO-CS-10-taller-p3-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "review",
      periodo: 3,
      dba_id: "DBA-CS-10-3",
      title: "Taller Repaso P3"
    },
    base: { question: "Repaso general.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Ramas del Poder:", options: [{text: "Ejecutiva, Legislativa, Judicial",correct:true},{text: "Norte, Sur, Este",correct:false},{text: "Militar, Policial, Civil",correct:false},{text: "Rico, Pobre, Medio",correct:false}], explanation: "Tridivisión." },
      { id_suffix: "v2", difficulty: 1, question: "Quien hace las leyes:", options: [{text: "Congreso (Rama Legislativa)",correct:true},{text: "Presidente",correct:false},{text: "Jueces",correct:false},{text: "Policía",correct:false}], explanation: "Legislar." },
      { id_suffix: "v3", difficulty: 2, question: "Tutela protege:", options: [{text: "Derechos Fundamentales",correct:true},{text: "Derechos colectivos",correct:false},{text: "Animales",correct:false},{text: "Carreteras",correct:false}], explanation: "Art 86." },
      { id_suffix: "v4", difficulty: 2, question: "Fiscalía:", options: [{text: "Investiga delitos (Rama Judicial)",correct:true},{text: "Vigila funcionarios",correct:false},{text: "Maneja plata",correct:false},{text: "Hace leyes",correct:false}], explanation: "Acusador." },
      { id_suffix: "v5", difficulty: 3, question: "Procuraduría:", options: [{text: "Vigila funcionarios (Disciplinario)",correct:true},{text: "Vigila plata (Fiscal)",correct:false},{text: "Protege pueblo",correct:false},{text: "Juzga",correct:false}], explanation: "Ministerio Público." },
      { id_suffix: "v6", difficulty: 3, question: "Contraloría:", options: [{text: "Vigila dinero público (Fiscal)",correct:true},{text: "Vigila funcionarios",correct:false},{text: "Cobra impuestos",correct:false},{text: "Hace billetes",correct:false}], explanation: "Plata." },
      { id_suffix: "v7", difficulty: 4, question: "Estado Social de Derecho implica:", options: [{text: "Estado debe garantizar bienestar y derechos",correct:true},{text: "Solo ley",correct:false},{text: "Caridad",correct:false},{text: "Comunismo",correct:false}], explanation: "Social." },
      { id_suffix: "v8", difficulty: 4, question: "Consulta Previa es derecho de:", options: [{text: "Comunidades Étnicas",correct:true},{text: "Todos",correct:false},{text: "Empresas",correct:false},{text: "Presidente",correct:false}], explanation: "Territorio." },
      { id_suffix: "v9", difficulty: 5, question: "Bloque de Constitucionalidad:", options: [{text: "Tratados DDHH = Constitución",correct:true},{text: "Leyes menores",correct:false},{text: "Bloque ladrillo",correct:false},{text: "Nada",correct:false}], explanation: "Supremacía." },
      { id_suffix: "v10", difficulty: 5, question: "Banco de la República función:", options: [{text: "Controlar inflación",correct:true},{text: "Prestar plata a gente",correct:false},{text: "Construir casas",correct:false},{text: "Vigilar bancos",correct:false}], explanation: "Emisor." }
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
search_query: "colombia civics questions grade ${meta.grade} ${meta.periodo} ${meta.topic}"
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

**Competencia:** Pensamiento Sistémico y Reflexión Ciudadana (DBA: ${meta.dba_id})

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
    console.log(`✅ Created Period 3 Bundle v3.0: ${fullPath}`);
});
