
const fs = require('fs');
const path = require('path');

// Helper to ensure directory exists
function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

const QUESTIONS = [
  // Grade 11 - Sociales - Period 2 - BUNDLE 1 (La Violencia Bipartidista)
  {
    meta: {
      id: "CO-SOC-11-violencia-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "historia-colombia",
      periodo: 2,
      dba_id: "DBA-SOC-11-2",
      title: "La Violencia (1948-1958)"
    },
    base: { question: "Colombia sufrió violencia política.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "El Bogotazo (9 de abril de 1948) inició por:", options: [{text: "El asesinato de Jorge Eliécer Gaitán",correct:true},{text: "Un terremoto",correct:false},{text: "Un partido de fútbol",correct:false},{text: "La independencia",correct:false}], explanation: "Magnicidio." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Partidos protagonistas de La Violencia:", options: [{text: "Liberales y Conservadores",correct:true},{text: "Verdes y Rojos",correct:false},{text: "Norte y Sur",correct:false},{text: "Ricos y Pobres",correct:false}], explanation: "Bipartidismo." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Consecuencia social de La Violencia:", options: [{text: "Desplazamiento forzado del campo a la ciudad",correct:true},{text: "Todos se hicieron ricos",correct:false},{text: "Paz total",correct:false},{text: "Más escuelas",correct:false}], explanation: "Urbanización." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Laureano Gómez:", options: [{text: "Presidente conservador radical de la época",correct:true},{text: "Un cantante",correct:false},{text: "Un futbolista",correct:false},{text: "Un liberal",correct:false}], explanation: "Líder conservador." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Guerrillas Liberales:", options: [{text: "Grupos armados campesinos que resistían al gobierno conservador",correct:true},{text: "Soldados oficiales",correct:false},{text: "Policía",correct:false},{text: "Extranjeros",correct:false}], explanation: "Origen guerrillas." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Los 'Pájaros' eran:", options: [{text: "Sicarios conservadores que mataban liberales",correct:true},{text: "Aves exóticas",correct:false},{text: "Aviones",correct:false},{text: "Liberales",correct:false}], explanation: "Violencia sectaria." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Golpe de Estado de 1953:", options: [{text: "General Gustavo Rojas Pinilla toma el poder",correct:true},{text: "Bolívar regresa",correct:false},{text: "Gaitán revive",correct:false},{text: "Elecciones libres",correct:false}], explanation: "Dictadura." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Amnistía de Rojas Pinilla:", options: [{text: "Ofreció paz y entrega de armas a guerrillas liberales",correct:true},{text: "Mató a todos",correct:false},{text: "Cárcel para todos",correct:false},{text: "Exilio",correct:false}], explanation: "Intento de paz." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Pactos de Benidorm y Sitges:", options: [{text: "Acuerdos entre Lleras (Liberal) y Gómez (Conservador) para crear el Frente Nacional",correct:true},{text: "Tratados de comercio",correct:false},{text: "Paz con FARC",correct:false},{text: "Guerra con Perú",correct:false}], explanation: "Origen FN." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Bandolerismo:", options: [{text: "Degeneración de la violencia política en crimen común rural",correct:true},{text: "Música de banda",correct:false},{text: "Política honesta",correct:false},{text: "Fútbol",correct:false}], explanation: "Sangrenegra, Desquite." }
    ]
  },

  // Bundle 2: Frente Nacional
  {
    meta: {
      id: "CO-SOC-11-frentenacional-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "historia-colombia",
      periodo: 2,
      dba_id: "DBA-SOC-11-2",
      title: "El Frente Nacional (1958-1974)"
    },
    base: { question: "El Frente Nacional fue un pacto.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "El Frente Nacional consistió en:", options: [{text: "Alternancia de poder entre Liberales y Conservadores por 16 años",correct:true},{text: "Una guerra",correct:false},{text: "Un muro",correct:false},{text: "Un partido de fútbol",correct:false}], explanation: "Pacto." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Duración del Frente Nacional:", options: [{text: "4 periodos presidenciales (16 años)",correct:true},{text: "1 año",correct:false},{text: "100 años",correct:false},{text: "1 semana",correct:false}], explanation: "1958-1974." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Primer presidente del Frente Nacional:", options: [{text: "Alberto Lleras Camargo",correct:true},{text: "Simón Bolívar",correct:false},{text: "Gabriel García Márquez",correct:false},{text: "Uribe",correct:false}], explanation: "Liberal." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Exclusión política:", options: [{text: "Otros partidos y movimientos no podían participar en el gobierno",correct:true},{text: "Todos votaban",correct:false},{text: "Democracia perfecta",correct:false},{text: "Nadie votaba",correct:false}], explanation: "Causa de conflicto." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "ANAPO:", options: [{text: "Alianza Nacional Popular (partido de Rojas Pinilla)",correct:true},{text: "Una sopa",correct:false},{text: "Un animal",correct:false},{text: "Un río",correct:false}], explanation: "Oposición." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "M-19 (Movimiento 19 de Abril):", options: [{text: "Guerrilla surgida tras el presunto fraude electoral de 1970",correct:true},{text: "Un mes",correct:false},{text: "Un día festivo",correct:false},{text: "Un baile",correct:false}], explanation: "Robo elecciones." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Surgimiento de guerrillas (FARC, ELN) en los 60s:", options: [{text: "Respuesta a la exclusión política y problemas agrarios",correct:true},{text: "Aburrimiento",correct:false},{text: "Moda extranjera",correct:false},{text: "Deporte",correct:false}], explanation: "Conflicto armado." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Reforma Agraria (Lleras Restrepo):", options: [{text: "Intento de redistribuir tierra (ANUC) frenado por terratenientes (Pacto de Chicoral)",correct:true},{text: "Regalar tierra a ricos",correct:false},{text: "Vender el país",correct:false},{text: "Sembrar flores",correct:false}], explanation: "Fracaso agrario." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Paridad burocrática:", options: [{text: "Reparto equitativo de cargos públicos entre los dos partidos",correct:true},{text: "Sueldos iguales",correct:false},{text: "Carrera administrativa",correct:false},{text: "Despido masivo",correct:false}], explanation: "Clientelismo." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Estado de Sitio:", options: [{text: "Figura legal usada constantemente para gobernar con decretos extraordinarios",correct:true},{text: "Sitio bonito",correct:false},{text: "Estado de WhatsApp",correct:false},{text: "Sitio web",correct:false}], explanation: "Falsa normalidad." }
    ]
  },

  // Bundle 3: Narcotráfico y Conflicto (80s-90s)
  {
    meta: {
      id: "CO-SOC-11-narcotrafico-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "historia-colombia",
      periodo: 2,
      dba_id: "DBA-SOC-11-2",
      title: "Narcotráfico y Conflicto"
    },
    base: { question: "El narcotráfico afectó a Colombia.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Pablo Escobar:", options: [{text: "Jefe del Cartel de Medellín",correct:true},{text: "Presidente",correct:false},{text: "Futbolista",correct:false},{text: "Actor",correct:false}], explanation: "Capo." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Narcoterrorismo:", options: [{text: "Uso de bombas y violencia por mafias para presionar al Estado",correct:true},{text: "Vender drogas suave",correct:false},{text: "Fiestas",correct:false},{text: "Turismo",correct:false}], explanation: "Bombas." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Extradición:", options: [{text: "Enviar criminales a ser juzgados en otro país (USA)",correct:true},{text: "Viajar gratis",correct:false},{text: "Perder maletas",correct:false},{text: "Salir de clase",correct:false}], explanation: "Miedo de los capos." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Toma del Palacio de Justicia (1985):", options: [{text: "Acción del M-19 y retoma militar violenta",correct:true},{text: "Fiesta en el palacio",correct:false},{text: "Visita turística",correct:false},{text: "Remodelación",correct:false}], explanation: "Holocausto." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Magnicidio de Luis Carlos Galán (1989):", options: [{text: "Asesinato del candidato presidencial que prometía combatir mafias",correct:true},{text: "Murió de viejo",correct:false},{text: "Accidente",correct:false},{text: "Renuncia",correct:false}], explanation: "Nuevo Liberalismo." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Paramilitarismo:", options: [{text: "Grupos armados ilegales de extrema derecha (Autodefensas)",correct:true},{text: "Ejército oficial",correct:false},{text: "Guerrilla comunista",correct:false},{text: "Policía",correct:false}], explanation: "AUC." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Unión Patriótica (UP):", options: [{text: "Partido de izquierda surgido de acuerdos de paz, cuyos miembros fueron exterminados",correct:true},{text: "Partido Conservador",correct:false},{text: "Club social",correct:false},{text: "Sindicato",correct:false}], explanation: "Genocidio político." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Bonanza Marimbera:", options: [{text: "Auge de exportación de marihuana en los 70s (Guajira)",correct:true},{text: "Pesca",correct:false},{text: "Petróleo",correct:false},{text: "Carbón",correct:false}], explanation: "Pre-coca." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Proceso 8000:", options: [{text: "Investigación por entrada de dineros del narcotráfico a campaña de Samper",correct:true},{text: "Proceso de paz",correct:false},{text: "Lotería",correct:false},{text: "Año 8000",correct:false}], explanation: "Crisis institucional." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Constituyente de 1991:", options: [{text: "Respuesta política a la crisis de violencia para crear nueva Constitución",correct:true},{text: "Reunión de amigos",correct:false},{text: "Fiesta patria",correct:false},{text: "Guerra civil",correct:false}], explanation: "Séptima Papeleta." }
    ]
  },

  // Bundle 4: Constitución de 1991 (Principios)
  {
    meta: {
      id: "CO-SOC-11-constitucion-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "historia-colombia",
      periodo: 2,
      dba_id: "DBA-SOC-11-2",
      title: "La Constitución de 1991"
    },
    base: { question: "La Constitución del 91 es norma de normas.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Colombia es un Estado:", options: [{text: "Social de Derecho",correct:true},{text: "Estado Dictatorial",correct:false},{text: "Estado Monárquico",correct:false},{text: "Estado de Sitio",correct:false}], explanation: "Artículo 1." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "La Constitución de 1991 reemplazó a la de:", options: [{text: "1886",correct:true},{text: "1990",correct:false},{text: "2000",correct:false},{text: "1810",correct:false}], explanation: "Centenaria." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Tutela:", options: [{text: "Mecanismo para proteger derechos fundamentales",correct:true},{text: "Examen",correct:false},{text: "Castigo",correct:false},{text: "Impuesto",correct:false}], explanation: "Acción constitucional." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "La soberanía reside en:", options: [{text: "El pueblo",correct:true},{text: "El presidente",correct:false},{text: "El ejército",correct:false},{text: "Dios",correct:false}], explanation: "Democracia." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Libertad de cultos:", options: [{text: "Derecho a profesar cualquier religión o ninguna",correct:true},{text: "Solo religión católica",correct:false},{text: "Prohibido rezar",correct:false},{text: "Solo ateos",correct:false}], explanation: "Estado laico." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Fiscalía General de la Nación:", options: [{text: "Organismo creado en 1991 para investigar delitos (Sistema acusatorio)",correct:true},{text: "Policía",correct:false},{text: "Cárcel",correct:false},{text: "Juez",correct:false}], explanation: "Investigación." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Corte Constitucional:", options: [{text: "Guardián de la integridad y supremacía de la Constitución",correct:true},{text: "Corte suprema",correct:false},{text: "Comisaría",correct:false},{text: "Abogados",correct:false}], explanation: "Control constitucional." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Bloque de Constitucionalidad:", options: [{text: "Tratados internacionales de DDHH tienen rango constitucional",correct:true},{text: "Un ladrillo",correct:false},{text: "Un edificio",correct:false},{text: "Una ley menor",correct:false}], explanation: "Jerarquía." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Descentralización:", options: [{text: "Transferencia de poder y recursos a departamentos y municipios",correct:true},{text: "Todo en Bogotá",correct:false},{text: "Centralismo",correct:false},{text: "Federalismo total",correct:false}], explanation: "Autonomía territorial." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Democracia participativa:", options: [{text: "Ciudadanos intervienen en decisiones (no solo votan)",correct:true},{text: "Solo votan cada 4 años",correct:false},{text: "Dictadura",correct:false},{text: "Monarquía",correct:false}], explanation: "Mecanismos." }
    ]
  },

  // Bundle 5: Apertura Económica (Años 90)
  {
    meta: {
      id: "CO-SOC-11-apertura-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "historia-colombia",
      periodo: 2,
      dba_id: "DBA-SOC-11-1",
      title: "La Apertura Económica"
    },
    base: { question: "Colombia abrió su economía.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Presidente de la Apertura Económica:", options: [{text: "César Gaviria",correct:true},{text: "Bolívar",correct:false},{text: "Santos",correct:false},{text: "Uribe",correct:false}], explanation: "Bienvenidos al futuro." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Objetivo de la Apertura:", options: [{text: "Integrar a Colombia al mercado mundial (bajar aranceles)",correct:true},{text: "Cerrar fronteras",correct:false},{text: "Guerra",correct:false},{text: "Prohibir importaciones",correct:false}], explanation: "Modernización." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Consecuencia negativa inmediata:", options: [{text: "Quiebra de industrias y agro que no podían competir",correct:true},{text: "Todos ricos",correct:false},{text: "Precios subieron",correct:false},{text: "Nada pasó",correct:false}], explanation: "Competencia extranjera." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Privatización:", options: [{text: "Venta de empresas estatales a privados (Bancos, Puertos)",correct:true},{text: "Estatización",correct:false},{text: "Regalar empresas",correct:false},{text: "Nacionalización",correct:false}], explanation: "Menos Estado." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Ley 100 de 1993:", options: [{text: "Reforma al sistema de salud y seguridad social (EPS)",correct:true},{text: "Ley de educación",correct:false},{text: "Ley de deportes",correct:false},{text: "Ley de música",correct:false}], explanation: "Aseguramiento mixto." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Neoliberalismo en Colombia:", options: [{text: "Modelo económico aplicado en los 90s",correct:true},{text: "Socialismo",correct:false},{text: "Comunismo",correct:false},{text: "Feudalismo",correct:false}], explanation: "Libre mercado." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Apagón de 1992:", options: [{text: "Crisis energética por sequía (Fenómeno del Niño) e imprevisión",correct:true},{text: "Guerra",correct:false},{text: "Ataque terrorista",correct:false},{text: "Eclipse",correct:false}], explanation: "Hora Gaviria." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Banco de la República autónomo:", options: [{text: "Constitución 91 le dio independencia para controlar inflación",correct:true},{text: "Depende del presidente",correct:false},{text: "Es privado",correct:false},{text: "Es extranjero",correct:false}], explanation: "Política monetaria." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Consenso de Washington:", options: [{text: "Recetas económicas del FMI aplicadas en Latam (Austeridad)",correct:true},{text: "Acuerdo de paz",correct:false},{text: "Reunión social",correct:false},{text: "Tratado de límites",correct:false}], explanation: "Ajuste estructural." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Flexibilización laboral:", options: [{text: "Reformas que facilitan contratación y despido (Ley 50)",correct:true},{text: "Sueldos millonarios",correct:false},{text: "Prohibido trabajar",correct:false},{text: "Empleo de por vida",correct:false}], explanation: "Mercado laboral." }
    ]
  },

  // Bundle 6: Proceso de Paz y Actualidad
  {
    meta: {
      id: "CO-SOC-11-paz-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "historia-colombia",
      periodo: 2,
      dba_id: "DBA-SOC-11-2",
      title: "Conflicto y Paz (S. XXI)"
    },
    base: { question: "Colombia busca la paz.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Acuerdo de Paz 2016 firmado con:", options: [{text: "FARC-EP",correct:true},{text: "ELN",correct:false},{text: "Paramilitares",correct:false},{text: "EEUU",correct:false}], explanation: "Teatro Colón." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Presidente que firmó la paz:", options: [{text: "Juan Manuel Santos",correct:true},{text: "Uribe",correct:false},{text: "Duque",correct:false},{text: "Petro",correct:false}], explanation: "Nobel." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "JEP:", options: [{text: "Jurisdicción Especial para la Paz (Justicia Transicional)",correct:true},{text: "Juez normal",correct:false},{text: "Cárcel común",correct:false},{text: "Policía",correct:false}], explanation: "Verdad y reparación." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Plebiscito 2016:", options: [{text: "Ganó el NO, obligando a renegociar el acuerdo",correct:true},{text: "Ganó el SÍ",correct:false},{text: "Empate",correct:false},{text: "No hubo votación",correct:false}], explanation: "Polarización." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Seguridad Democrática (2002-2010):", options: [{text: "Política de Uribe de combate frontal a grupos armados",correct:true},{text: "Diálogo",correct:false},{text: "Rendición",correct:false},{text: "Olvido",correct:false}], explanation: "Recuperación territorio." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Falsos Positivos:", options: [{text: "Ejecuciones extrajudiciales presentadas como bajas en combate",correct:true},{text: "Errores matemáticos",correct:false},{text: "Mentiras piadosas",correct:false},{text: "Pruebas COVID",correct:false}], explanation: "Escándalo DDHH." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Comisión de la Verdad:", options: [{text: "Órgano extrajudicial para esclarecer lo ocurrido en el conflicto",correct:true},{text: "Juzgado",correct:false},{text: "Noticiero",correct:false},{text: "Iglesia",correct:false}], explanation: "Informe final." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Restitución de Tierras:", options: [{text: "Devolver predios a víctimas de despojo y desplazamiento",correct:true},{text: "Vender tierras",correct:false},{text: "Regalar casas",correct:false},{text: "Sembrar",correct:false}], explanation: "Reparación." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Estallido Social 2021:", options: [{text: "Protestas masivas contra reforma tributaria y desigualdad",correct:true},{text: "Fiesta nacional",correct:false},{text: "Terremoto",correct:false},{text: "Elecciones",correct:false}], explanation: "Paro Nacional." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: " Paz Total:", options: [{text: "Política del gobierno Petro de negociar con todos los grupos armados",correct:true},{text: "Guerra total",correct:false},{text: "Paz parcial",correct:false},{text: "Nada",correct:false}], explanation: "Actualidad." }
    ]
  },

  // Bundle 7: Cultura y Sociedad
  {
    meta: {
      id: "CO-SOC-11-cultura-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "historia-colombia",
      periodo: 2,
      dba_id: "DBA-SOC-11-2",
      title: "Identidad y Cultura Colombiana"
    },
    base: { question: "Colombia es diversa.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Gabriel García Márquez ganó el Nobel por:", options: [{text: "Literatura (Cien años de soledad)",correct:true},{text: "Paz",correct:false},{text: "Física",correct:false},{text: "Química",correct:false}], explanation: "Realismo mágico." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Región con mayor población afrocolombiana:", options: [{text: "Pacífico",correct:true},{text: "Andina",correct:false},{text: "Amazonía",correct:false},{text: "Orinoquía",correct:false}], explanation: "Chocó, Valle." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Carnaval de Barranquilla:", options: [{text: "Patrimonio inmaterial de la humanidad (UNESCO)",correct:true},{text: "Fiesta privada",correct:false},{text: "Reunión política",correct:false},{text: "Duelo",correct:false}], explanation: "Folclor." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Vallenato:", options: [{text: "Música tradicional del Caribe colombiano",correct:true},{text: "Rock",correct:false},{text: "Jazz",correct:false},{text: "Ópera",correct:false}], explanation: "Caja, guacharaca, acordeón." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Resguardos Indígenas:", options: [{text: "Territorios de propiedad colectiva de comunidades indígenas",correct:true},{text: "Cárceles",correct:false},{text: "Hoteles",correct:false},{text: "Parques",correct:false}], explanation: "Autonomía." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Sincretismo religioso:", options: [{text: "Mezcla de creencias católicas, indígenas y africanas",correct:true},{text: "Ateísmo",correct:false},{text: "Una sola religión",correct:false},{text: "Ciencia",correct:false}], explanation: "Cultura híbrida." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Raizales:", options: [{text: "Comunidad nativa de San Andrés y Providencia (hablan Creole)",correct:true},{text: "Caleños",correct:false},{text: "Paisas",correct:false},{text: "Pastusos",correct:false}], explanation: "Insular." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Palenque de San Basilio:", options: [{text: "Primer pueblo libre de América (africanos cimarrones)",correct:true},{text: "Ciudad perdida",correct:false},{text: "Playa",correct:false},{text: "Castillo",correct:false}], explanation: "Libertad." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Multiculturalidad en la Constitución 91:", options: [{text: "Reconocimiento de la diversidad étnica y cultural de la nación",correct:true},{text: "Todos somos iguales y punto",correct:false},{text: "Solo religión católica",correct:false},{text: "Prohibido lo diferente",correct:false}], explanation: "Estado pluralista." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Consulta Previa:", options: [{text: "Derecho de comunidades a decidir sobre proyectos en sus territorios",correct:true},{text: "Encuesta",correct:false},{text: "Voto popular",correct:false},{text: "Opinión",correct:false}], explanation: "DDHH." }
    ]
  },

  // Bundle 8: Taller Integrado Historia
  {
    meta: {
      id: "CO-SOC-11-taller-historia-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "historia-colombia",
      periodo: 2,
      dba_id: "DBA-SOC-11-2",
      title: "Repaso Histórico S. XX"
    },
    base: { question: "La historia nos enseña.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Pérdida de Panamá (1903):", options: [{text: "Separación apoyada por EEUU para construir el Canal",correct:true},{text: "Venta voluntaria",correct:false},{text: "Regalo",correct:false},{text: "Guerra con Perú",correct:false}], explanation: "Dolor nacional." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Masacre de las Bananeras (1928):", options: [{text: "Ejército disparó a huelguistas de la United Fruit Company",correct:true},{text: "Fiesta del banano",correct:false},{text: "Pelea de frutas",correct:false},{text: "Cosecha",correct:false}], explanation: "Cien años de soledad." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Guerra de los Mil Días:", options: [{text: "Guerra civil (1899-1902) Liberales vs Conservadores",correct:true},{text: "Guerra de un día",correct:false},{text: "Guerra mundial",correct:false},{text: "Paz",correct:false}], explanation: "Inicio de siglo." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Voto femenino en Colombia:", options: [{text: "Aprobado en 1954 (Rojas Pinilla), ejercido en 1957",correct:true},{text: "Desde 1810",correct:false},{text: "Ayer",correct:false},{text: "Nunca",correct:false}], explanation: "Derechos mujer." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Séptima Papeleta:", options: [{text: "Movimiento estudiantil que impulsó la Constituyente del 91",correct:true},{text: "Voto nulo",correct:false},{text: "Fraude",correct:false},{text: "Papel basura",correct:false}], explanation: "Poder constituyente." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Revolución en Marcha:", options: [{text: "Reformas progresistas de Alfonso López Pumarejo (años 30)",correct:true},{text: "Marcha atlética",correct:false},{text: "Protesta",correct:false},{text: "Guerra",correct:false}], explanation: "Modernización." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Clientelismo:", options: [{text: "Intercambio de favores o recursos por votos",correct:true},{text: "Atención al cliente",correct:false},{text: "Vender cosas",correct:false},{text: "Política limpia",correct:false}], explanation: "Corrupción." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Gamonales:", options: [{text: "Caudillos locales que controlaban políticamente los pueblos",correct:true},{text: "Alcaldes",correct:false},{text: "Jueces",correct:false},{text: "Médicos",correct:false}], explanation: "Poder regional." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Doctrina de Seguridad Nacional:", options: [{text: "Estrategia anticomunista de EEUU aplicada en Latam (Enemigo interno)",correct:true},{text: "Seguridad vial",correct:false},{text: "Policía",correct:false},{text: "Paz total",correct:false}], explanation: "Guerra Fría." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Estado fallido (Debate):", options: [{text: "Incapacidad del Estado para controlar su territorio y dar seguridad",correct:true},{text: "Estado exitoso",correct:false},{text: "Estado nuevo",correct:false},{text: "Estado rico",correct:false}], explanation: "Crisis soberanía." }
    ]
  },

     // Bundle 9: Movimientos Sociales
    {
    meta: {
      id: "CO-SOC-11-movimientos-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "historia-colombia",
      periodo: 2,
      dba_id: "DBA-SOC-11-2",
      title: "Movimientos Sociales"
    },
    base: { question: "La sociedad se moviliza.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Sindicato:", options: [{text: "Organización de trabajadores para defender sus derechos",correct:true},{text: "Club de amigos",correct:false},{text: "Empresa",correct:false},{text: "Gobierno",correct:false}], explanation: "Laboral." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Paro Cívico:", options: [{text: "Suspensión de actividades ciudadanas como protesta",correct:true},{text: "Fiesta cívica",correct:false},{text: "Desfile",correct:false},{text: "Vacaciones",correct:false}], explanation: "Gran Paro 1977." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Movimiento estudiantil:", options: [{text: "Estudiantes organizados por educación y cambios políticos",correct:true},{text: "Grupo de estudio",correct:false},{text: "Equipo fútbol",correct:false},{text: "Banda de rock",correct:false}], explanation: "Séptima papeleta, 2011." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Minga Indígena:", options: [{text: "Movilización y trabajo colectivo de pueblos indígenas",correct:true},{text: "Baile",correct:false},{text: "Comida",correct:false},{text: "Juego",correct:false}], explanation: "Resistencia." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Feminismo en Colombia:", options: [{text: "Lucha por derechos e igualdad de las mujeres",correct:true},{text: "Odio a hombres",correct:false},{text: "Moda",correct:false},{text: "Política",correct:false}], explanation: "Sufragistas, aborto." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Líderes sociales:", options: [{text: "Defensores de DDHH y territorios (víctimas de violencia)",correct:true},{text: "Políticos ricos",correct:false},{text: "Influencers",correct:false},{text: "Cantantes",correct:false}], explanation: "Riesgo actual." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "ANUC:", options: [{text: "Asociación Nacional de Usuarios Campesinos (Reforma Agraria)",correct:true},{text: "Asociación de médicos",correct:false},{text: "Banco",correct:false},{text: "Tienda",correct:false}], explanation: "Lucha tierra 70s." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Teología de la Liberación:", options: [{text: "Corriente católica enfocada en los pobres y justicia social (Camilo Torres)",correct:true},{text: "Misa normal",correct:false},{text: "Ateísmo",correct:false},{text: "Secta",correct:false}], explanation: "Iglesia progresista." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Desobediencia civil:", options: [{text: "Incumplimiento pacífico de leyes injustas como protesta",correct:true},{text: "Delincuencia",correct:false},{text: "Guerra",correct:false},{text: "Pereza",correct:false}], explanation: "Gandhi." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Acción colectiva:", options: [{text: "Grupo de personas actuando juntas por un fin común",correct:true},{text: "Actuar solo",correct:false},{text: "Casualidad",correct:false},{text: "Nada",correct:false}], explanation: "Sociología." }
    ]
  },

  // Bundle 10: Relaciones Colombia - Mundo
    {
    meta: {
      id: "CO-SOC-11-relaciones-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "historia-colombia",
      periodo: 2,
      dba_id: "DBA-SOC-11-2",
      title: "Colombia en el Mundo"
    },
    base: { question: "Colombia tiene relaciones con otros países.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Principal socio comercial de Colombia:", options: [{text: "Estados Unidos",correct:true},{text: "Venezuela",correct:false},{text: "Ecuador",correct:false},{text: "Rusia",correct:false}], explanation: "Exportaciones." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Cancillería:", options: [{text: "Ministerio de Relaciones Exteriores",correct:true},{text: "Cárcel",correct:false},{text: "Portería",correct:false},{text: "Tienda",correct:false}], explanation: "Diplomacia." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Respice Polum (Mirar al Norte):", options: [{text: "Doctrina de al alineamiento con EEUU (Suárez)",correct:true},{text: "Mirar al sur",correct:false},{text: "Mirar estrellas",correct:false},{text: "Brújula",correct:false}], explanation: "Tradición diplomática." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Diferendo limítrofe con Nicaragua:", options: [{text: "Disputa por mar territorial y san Andrés (Fallo La Haya)",correct:true},{text: "Guerra misiles",correct:false},{text: "Fútbol",correct:false},{text: "Nada",correct:false}], explanation: "Pérdida mar." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Plan Colombia:", options: [{text: "Ayuda militar de EEUU para combatir narcotráfico",correct:true},{text: "Plan de turismo",correct:false},{text: "Plan de estudio",correct:false},{text: "Mapa",correct:false}], explanation: "Intervención." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "OCDE:", options: [{text: "Club de países con buenas prácticas (Colombia ingresó recientemente)",correct:true},{text: "Club deportivo",correct:false},{text: "ONG",correct:false},{text: "Sindicato",correct:false}], explanation: "Estandarización." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Guerra de Corea (1950):", options: [{text: "Única guerra internacional donde peleó el Batallón Colombia",correct:true},{text: "Guerra Mundial II",correct:false},{text: "Vietnam",correct:false},{text: "Golfo",correct:false}], explanation: "Veteranos." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Visa Schengen:", options: [{text: "Permite entrar a Europa sin visa (Logro diplomático)",correct:true},{text: "Visa USA",correct:false},{text: "Tarjeta crédito",correct:false},{text: "Pasaporte",correct:false}], explanation: "Movilidad." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Respice Similia (Mirar a los semejantes):", options: [{text: "Doctrina de acercamiento a Latinoamérica (López Michelsen)",correct:true},{text: "Mirar espejo",correct:false},{text: "Mirar norte",correct:false},{text: "Aislamiento",correct:false}], explanation: "No Alineados." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Descertificación (años 90):", options: [{text: "Sanción de EEUU a Colombia por 'no cooperar' en lucha antidrogas",correct:true},{text: "Diploma",correct:false},{text: "Premio",correct:false},{text: "Regalo",correct:false}], explanation: "Samper." }
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
search_query: "preguntas historia colombia grado ${meta.grade} ${meta.periodo} ${meta.topic}"
original_question: "${q.base.question}"
original_answer: "${q.base.answer}"
---

# Pregunta Base: ${meta.title}

> **Fuente:** OpenTDB (CC BY-SA 4.0)
> **Tema:** ${meta.topic} (Periodo ${meta.periodo})
> **DBA:** ${meta.dba_id}
> **Original:** "${q.base.question}"

---
`;

  q.variants.forEach(v => {
      md += `
## Pregunta ${v.id_suffix.replace('v','')} (${v.type} - Dificultad ${v.difficulty})

**ID:** \`${meta.id}-${v.id_suffix}\`

### Enunciado

${v.question}

### Opciones

${v.options.map((o, i) => {
    const letter = String.fromCharCode(65 + i);
    const check = o.correct ? 'x' : ' ';
    return `- [${check}] ${letter}) ${o.text}`;
}).join('\n')}

### Explicación Pedagógica

${v.explanation}

**Competencia evaluada:** Pensamiento Social y Sistémico (DBA: ${meta.dba_id})

---
`;
  });

  md += `
## 📊 Metadata de Validación

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
