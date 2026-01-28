
const fs = require('fs');
const path = require('path');

function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

const QUESTIONS = [
  // Bundle 1: Human Rights History
  {
    meta: {
      id: "CO-CS-10-hr-history-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "historia-ddhh",
      periodo: 4,
      dba_id: "DBA-CS-10-4",
      title: "Historia de los DDHH"
    },
    base: { question: "Origen DDHH.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Declaración Universal de los Derechos Humanos (1948):", options: [{text: "Documento de la ONU que establece derechos para todos los seres humanos",correct:true},{text: "Documento militar",correct:false},{text: "Solo para Europa",correct:false},{text: "Creado en 1810",correct:false}], explanation: "Post SGM." },
      { id_suffix: "v2", difficulty: 1, question: "Derechos de Primera Generación (Civiles y Políticos):", options: [{text: "Vida, Libertad, Voto, Propiedad (Revolución Francesa)",correct:true},{text: "Trabajo y Salud",correct:false},{text: "Ambiente",correct:false},{text: "Internet",correct:false}], explanation: "Libertad individual." },
      { id_suffix: "v3", difficulty: 2, question: "Derechos de Segunda Generación (DESC):", options: [{text: "Económicos, Sociales y Culturales (Salud, Educación, Trabajo)",correct:true},{text: "Voto",correct:false},{text: "Paz",correct:false},{text: "Libertad de culto",correct:false}], explanation: "Igualdad." },
      { id_suffix: "v4", difficulty: 2, question: "Características de los DDHH:", options: [{text: "Universales, Inalienables, Irrenunciables e Indivisibles",correct:true},{text: "Se pueden vender",correct:false},{text: "Solo para ricos",correct:false},{text: "Se vencen",correct:false}], explanation: "Dignidad." },
      { id_suffix: "v5", difficulty: 3, question: "Cilindro de Ciro (539 a.C.):", options: [{text: "Considerado el primer documento de derechos humanos (Persia)",correct:true},{text: "Un arma",correct:false},{text: "Una estatua",correct:false},{text: "Un libro de cocina",correct:false}], explanation: "Antigüedad." },
      { id_suffix: "v6", difficulty: 3, question: "Revolución Francesa (1789) aporte:", options: [{text: "Declaración de los Derechos del Hombre y del Ciudadano",correct:true},{text: "Rey Sol",correct:false},{text: "Guillotina solamente",correct:false},{text: "Comunismo",correct:false}], explanation: "Libertad, Igualdad, Fraternidad." },
      { id_suffix: "v7", difficulty: 4, question: "Derechos de Tercera Generación (Solidaridad):", options: [{text: "Paz, Medio Ambiente Sano, Patrimonio Común",correct:true},{text: "Salud",correct:false},{text: "Voto",correct:false},{text: "Vida",correct:false}], explanation: "Colectivos." },
      { id_suffix: "v8", difficulty: 4, question: "Olympe de Gouges:", options: [{text: "Redactó la Declaración de los Derechos de la Mujer y la Ciudadana (1791)",correct:true},{text: "Reina de Francia",correct:false},{text: "Cocinera",correct:false},{text: "General",correct:false}], explanation: "Feminismo pionero." },
      { id_suffix: "v9", difficulty: 5, question: "Derecho Internacional de los DDHH:", options: [{text: "Obligaciones de los Estados para respetar, proteger y garantizar DDHH",correct:true},{text: "Leyes de la guerra",correct:false},{text: "Leyes de comercio",correct:false},{text: "No existe",correct:false}], explanation: "Tratados." },
      { id_suffix: "v10", difficulty: 5, question: "Sistema Interamericano de DDHH:", options: [{text: "CIDH y Corte IDH (OEA) protegen DDHH en América",correct:true},{text: "ONU",correct:false},{text: "Unión Europea",correct:false},{text: "OTAN",correct:false}], explanation: "Regional." }
    ]
  },

  // Bundle 2: International Humanitarian Law (IHL)
  {
    meta: {
      id: "CO-CS-10-ihl-basics-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "dih-basico",
      periodo: 4,
      dba_id: "DBA-CS-10-4",
      title: "Derecho Internacional Humanitario (DIH)"
    },
    base: { question: "Conceptos DIH.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Objetivo del DIH (Leyes de la Guerra):", options: [{text: "Limitar el sufrimiento en conflictos armados y proteger a quienes no combaten",correct:true},{text: "Prohibir la guerra",correct:false},{text: "Ganar la guerra",correct:false},{text: "Vender armas",correct:false}], explanation: "Humanizar conflicto." },
      { id_suffix: "v2", difficulty: 1, question: "Diferencia DDHH vs DIH:", options: [{text: "DDHH aplica siempre; DIH aplica solo en conflicto armado",correct:true},{text: "Son iguales",correct:false},{text: "DDHH solo en guerra",correct:false},{text: "DIH aplica en paz",correct:false}], explanation: "Ámbito aplicación." },
      { id_suffix: "v3", difficulty: 2, question: "Principios del DIH:", options: [{text: "Distinción, Proporcionalidad, Precaución, Humanidad",correct:true},{text: "Ganar a toda costa",correct:false},{text: "Destrucción total",correct:false},{text: "Venganza",correct:false}], explanation: "Reglas combate." },
      { id_suffix: "v4", difficulty: 2, question: "Principio de Distinción:", options: [{text: "Diferenciar siempre entre combatientes y población civil",correct:true},{text: "Matar a todos",correct:false},{text: "Diferenciar uniformes",correct:false},{text: "Usar armas grandes",correct:false}], explanation: "No atacar civiles." },
      { id_suffix: "v5", difficulty: 3, question: "Convenios de Ginebra (1949):", options: [{text: "Cuatro tratados que forman la base del DIH",correct:true},{text: "Tratados de comercio",correct:false},{text: "Tratados de límites",correct:false},{text: "Paz mundial",correct:false}], explanation: "Normas clave." },
      { id_suffix: "v6", difficulty: 3, question: "Personas protegidas por el DIH:", options: [{text: "Civiles, heridos, enfermos, náufragos, prisioneros de guerra",correct:true},{text: "Soldados combatiendo",correct:false},{text: "Generales en batalla",correct:false},{text: "Espías",correct:false}], explanation: "Fuera de combate." },
      { id_suffix: "v7", difficulty: 4, question: "Delito de Perfidia:", options: [{text: "Simular ser civil o protegido para atacar al enemigo (traición a la buena fe)",correct:true},{text: "Mentir",correct:false},{text: "Huir",correct:false},{text: "Spyware",correct:false}], explanation: "Prohibido." },
      { id_suffix: "v8", difficulty: 4, question: "Bienes protegidos:", options: [{text: "Hospitales, escuelas, bienes culturales, ambulancias",correct:true},{text: "Tanques",correct:false},{text: "Bases militares",correct:false},{text: "Trincheras",correct:false}], explanation: "No son objetivo." },
      { id_suffix: "v9", difficulty: 5, question: "Conflicto Armado No Internacional (CANI):", options: [{text: "Guerra civil interna (Ej: Colombia)",correct:true},{text: "Guerra entre países",correct:false},{text: "Pelea callejera",correct:false},{text: "Protesta",correct:false}], explanation: "Protocolo II." },
      { id_suffix: "v10", difficulty: 5, question: "Cruz Roja Internacional (CICR):", options: [{text: "Organismo neutral que vela por el cumplimiento del DIH",correct:true},{text: "Ejército de paz",correct:false},{text: "Hospital privado",correct:false},{text: "Banco",correct:false}], explanation: "Guardián DIH." }
    ]
  },

  // Bundle 3: Victims Law & Restitution
  {
    meta: {
      id: "CO-CS-10-victims-law-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "ley-victimas",
      periodo: 4,
      dba_id: "DBA-CS-10-4",
      title: "Ley de Víctimas y Restitución"
    },
    base: { question: "Ley 1448.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Ley 1448 de 2011 (Ley de Víctimas):", options: [{text: "Reconoce y repara a las víctimas del conflicto armado",correct:true},{text: "Castiga a los pobres",correct:false},{text: "Crea impuestos",correct:false},{text: "Ley de fútbol",correct:false}], explanation: "Reparación integral." },
      { id_suffix: "v2", difficulty: 1, question: "Restitución de Tierras:", options: [{text: "Devolver la tierra a quienes fueron despojados o desplazados",correct:true},{text: "Regalar tierra a ricos",correct:false},{text: "Sembrar árboles",correct:false},{text: "Vender el país",correct:false}], explanation: "Derecho fundamental." },
      { id_suffix: "v3", difficulty: 2, question: "Víctima según la ley:", options: [{text: "Persona que ha sufrido daño por hechos del conflicto armado (desde 1985)",correct:true},{text: "Cualquier persona triste",correct:false},{text: "Solo soldados",correct:false},{text: "Extranjeros",correct:false}], explanation: "Definición legal." },
      { id_suffix: "v4", difficulty: 2, question: "Reparación Simbólica:", options: [{text: "Actos para dignificar a las víctimas (monumentos, perdones públicos)",correct:true},{text: "Dar dinero",correct:false},{text: "Dar casa",correct:false},{text: "Dar trabajo",correct:false}], explanation: "Memoria." },
      { id_suffix: "v5", difficulty: 3, question: "Derecho a la Verdad:", options: [{text: "Saber qué pasó, quién lo hizo y por qué",correct:true},{text: "Saber el futuro",correct:false},{text: "Leer el periódico",correct:false},{text: "Mentir",correct:false}], explanation: "No repetición." },
      { id_suffix: "v6", difficulty: 3, question: "Centro Nacional de Memoria Histórica:", options: [{text: "Entidad que recupera y preserva la memoria del conflicto",correct:true},{text: "Museo de arte",correct:false},{text: "Biblioteca escolar",correct:false},{text: "Cementerio",correct:false}], explanation: "Deber de memoria." },
      { id_suffix: "v7", difficulty: 4, question: "Despojo vs Abandono forzado:", options: [{text: "Despojo es quitar ilegalmente; Abandono es huir por miedo",correct:true},{text: "Son iguales",correct:false},{text: "Despojo es vender",correct:false},{text: "Abandono es irse de viaje",correct:false}], explanation: "Jurídico." },
      { id_suffix: "v8", difficulty: 4, question: "Medidas de no repetición:", options: [{text: "Acciones para evitar que vuelvan a ocurrir violaciones de DDHH",correct:true},{text: "Repetir el año escolar",correct:false},{text: "Venganza",correct:false},{text: "Armarse",correct:false}], explanation: "Garantía." },
      { id_suffix: "v9", difficulty: 5, question: "Enfoque Diferencial:", options: [{text: "Atención especial a grupos vulnerables (mujeres, niños, etnias)",correct:true},{text: "Tratar a todos igual",correct:false},{text: "Discriminar",correct:false},{text: "Ignorar",correct:false}], explanation: "Equidad." },
      { id_suffix: "v10", difficulty: 5, question: "Unidad de Víctimas:", options: [{text: "Entidad encargada de coordinar la atención y reparación",correct:true},{text: "Hospital",correct:false},{text: "Policía",correct:false},{text: "Juzgado",correct:false}], explanation: "Institución." }
    ]
  },

  // Bundle 4: Transitional Justice
  {
    meta: {
      id: "CO-CS-10-trans-justice-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "justicia-transicional",
      periodo: 4,
      dba_id: "DBA-CS-10-4",
      title: "Justicia Transicional"
    },
    base: { question: "Concepto JT.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Justicia Transicional:", options: [{text: "Mecanismos judiciales y no judiciales para pasar de guerra a paz",correct:true},{text: "Justicia ordinaria",correct:false},{text: "Venganza",correct:false},{text: "Olvido total",correct:false}], explanation: "Transición." },
      { id_suffix: "v2", difficulty: 1, question: "Pilares de la JT:", options: [{text: "Verdad, Justicia, Reparación y No Repetición",correct:true},{text: "Cárcel y muerte",correct:false},{text: "Dinero y olvido",correct:false},{text: "Perdón y olvido",correct:false}], explanation: "Integralidad." },
      { id_suffix: "v3", difficulty: 2, question: "Comisión de la Verdad:", options: [{text: "Órgano extrajudicial para esclarecer lo ocurrido (Informe Final)",correct:true},{text: "Juzgado",correct:false},{text: "Cárcel",correct:false},{text: "Iglesia",correct:false}], explanation: "Esclarecimiento." },
      { id_suffix: "v4", difficulty: 2, question: "JEP (Jurisdicción Especial para la Paz):", options: [{text: "Tribunal para juzgar crímenes graves del conflicto (sanciones propias)",correct:true},{text: "Corte Suprema",correct:false},{text: "Fiscalía",correct:false},{text: "Corte Internacional",correct:false}], explanation: "Componente Justicia." },
      { id_suffix: "v5", difficulty: 3, question: "UBPD (Unidad de Búsqueda de Personas dadas por Desaparecidas):", options: [{text: "Entidad humanitaria para buscar desaparecidos",correct:true},{text: "Policía",correct:false},{text: "Funeraria",correct:false},{text: "Hospital",correct:false}], explanation: "Humanitario." },
      { id_suffix: "v6", difficulty: 3, question: "Sanciones Propias (JEP):", options: [{text: "Trabajos, obras y reparación (restaurativas) si se aporta verdad plena",correct:true},{text: "Cárcel ordinaria",correct:false},{text: "Pena de muerte",correct:false},{text: "Multas",correct:false}], explanation: "Restauración." },
      { id_suffix: "v7", difficulty: 4, question: "Dilema de la Paz vs Justicia:", options: [{text: "Tensión entre castigar todo o perdonar para lograr la paz",correct:true},{text: "Es fácil decidir",correct:false},{text: "No hay dilema",correct:false},{text: "Paz es guerra",correct:false}], explanation: "Equilibrio." },
      { id_suffix: "v8", difficulty: 4, question: "Amnistía:", options: [{text: "Perdón jurídico por delitos políticos (rebelión), no por crímenes de guerra",correct:true},{text: "Perdón por todo",correct:false},{text: "Olvido",correct:false},{text: "Indulto",correct:false}], explanation: "Delito político." },
      { id_suffix: "v9", difficulty: 5, question: "Falsos Positivos (Ejecuciones extrajudiciales):", options: [{text: "Civiles asesinados por militares presentados como bajas en combate",correct:true},{text: "Errores matemáticos",correct:false},{text: "Pruebas de COVID",correct:false},{text: "Mentiras piadosas",correct:false}], explanation: "Crimen lesa humanidad." },
      { id_suffix: "v10", difficulty: 5, question: "Responsabilidad de Mando:", options: [{text: "Jefes responden por crímenes de subordinados si sabían o no evitaron",correct:true},{text: "Solo responde el que dispara",correct:false},{text: "Nadie responde",correct:false},{text: "Culpa del enemigo",correct:false}], explanation: "Cadena de mando." }
    ]
  },

  // Bundle 5: Discrimination & Exclusion
  {
    meta: {
      id: "CO-CS-10-discrimination-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "discriminacion-exclusion",
      periodo: 4,
      dba_id: "DBA-CS-10-4",
      title: "Discriminación y Exclusión"
    },
    base: { question: "Tipos discriminación.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Racismo:", options: [{text: "Discriminación basada en la raza o etnia",correct:true},{text: "Discriminación por edad",correct:false},{text: "Amor a todos",correct:false},{text: "Miedo",correct:false}], explanation: "Estructural." },
      { id_suffix: "v2", difficulty: 1, question: "Machismo:", options: [{text: "Creencia de superioridad del hombre sobre la mujer",correct:true},{text: "Igualdad",correct:false},{text: "Feminismo",correct:false},{text: "Amistad",correct:false}], explanation: "Género." },
      { id_suffix: "v3", difficulty: 2, question: "Aporofobia:", options: [{text: "Miedo o rechazo a los pobres",correct:true},{text: "Miedo a las arañas",correct:false},{text: "Miedo a los ricos",correct:false},{text: "Miedo a volar",correct:false}], explanation: "Exclusión social." },
      { id_suffix: "v4", difficulty: 2, question: "Homofobia:", options: [{text: "Rechazo a personas homosexuales",correct:true},{text: "Rechazo a hombres",correct:false},{text: "Miedo a la sangre",correct:false},{text: "Miedo a salir",correct:false}], explanation: "Diversidad sexual." },
      { id_suffix: "v5", difficulty: 3, question: "Segregación:", options: [{text: "Separación física de grupos (barrios, escuelas) por raza/clase",correct:true},{text: "Integración",correct:false},{text: "Mezcla",correct:false},{text: "Unión",correct:false}], explanation: "Apartheid." },
      { id_suffix: "v6", difficulty: 3, question: "Exclusión Social:", options: [{text: "Falta de participación y acceso a derechos/oportunidades",correct:true},{text: "Tener muchos amigos",correct:false},{text: "Ser popular",correct:false},{text: "Vivir solo",correct:false}], explanation: "Marginalidad." },
      { id_suffix: "v7", difficulty: 4, question: "Estereotipo:", options: [{text: "Imagen o idea aceptada comúnmente con carácter inmutable (prejuicio)",correct:true},{text: "Verdad científica",correct:false},{text: "Foto",correct:false},{text: "Música",correct:false}], explanation: "Generalización." },
      { id_suffix: "v8", difficulty: 4, question: "Violencia de Género:", options: [{text: "Violencia contra una persona por su género (Feminicidio)",correct:true},{text: "Pelea de boxeo",correct:false},{text: "Guerra",correct:false},{text: "Insulto general",correct:false}], explanation: "Derechos mujer." },
      { id_suffix: "v9", difficulty: 5, question: "Techo de Cristal:", options: [{text: "Barrera invisible que impide a mujeres ascender a altos cargos",correct:true},{text: "Techo transparente",correct:false},{text: "Ventana",correct:false},{text: "Piso pegajoso",correct:false}], explanation: "Laboral." },
      { id_suffix: "v10", difficulty: 5, question: "Bullying (Acoso Escolar):", options: [{text: "Agresión repetida y con desequilibrio de poder en la escuela",correct:true},{text: "Juego brusco",correct:false},{text: "Pelea única",correct:false},{text: "Estudiar mucho",correct:false}], explanation: "Convivencia." }
    ]
  },

  // Bundle 6: Peace Mechanisms
  {
    meta: {
      id: "CO-CS-10-peace-mechanisms-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "mecanismos-paz",
      periodo: 4,
      dba_id: "DBA-CS-10-4",
      title: "Mecanismos de Resolución de Conflictos"
    },
    base: { question: "Resolver conflictos.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Diálogo:", options: [{text: "Herramienta básica para resolver conflictos hablando",correct:true},{text: "Gritar",correct:false},{text: "Pegar",correct:false},{text: "Ignorar",correct:false}], explanation: "Comunicación." },
      { id_suffix: "v2", difficulty: 1, question: "Mediación:", options: [{text: "Un tercero ayuda a las partes a encontrar solución",correct:true},{text: "Un juez decide",correct:false},{text: "Pelea",correct:false},{text: "Sorteo",correct:false}], explanation: "Tercero neutral." },
      { id_suffix: "v3", difficulty: 2, question: "Conciliación:", options: [{text: "Acuerdo formal entre partes con ayuda de un conciliador",correct:true},{text: "Juicio",correct:false},{text: "Guerra",correct:false},{text: "Demanda",correct:false}], explanation: "Alternativo." },
      { id_suffix: "v4", difficulty: 2, question: "Arbitraje:", options: [{text: "Un tercero (árbitro) toma la decisión final obligatoria",correct:true},{text: "Fútbol",correct:false},{text: "Consejo",correct:false},{text: "Sugerencia",correct:false}], explanation: "Laudo." },
      { id_suffix: "v5", difficulty: 3, question: "Jueces de Paz:", options: [{text: "Particulares elegidos para resolver conflictos comunitarios en equidad",correct:true},{text: "Jueces penales",correct:false},{text: "Policías",correct:false},{text: "Alcaldes",correct:false}], explanation: "Equidad." },
      { id_suffix: "v6", difficulty: 3, question: "Noviolencia (Gandhi):", options: [{text: "Lucha política sin uso de violencia física (Desobediencia civil)",correct:true},{text: "Pasividad",correct:false},{text: "Cobardía",correct:false},{text: "Guerra santa",correct:false}], explanation: "Ahimsa." },
      { id_suffix: "v7", difficulty: 4, question: "Cultura de Paz:", options: [{text: "Valores y comportamientos que rechazan la violencia y previenen conflictos",correct:true},{text: "Cultura de guerra",correct:false},{text: "Arte",correct:false},{text: "Música",correct:false}], explanation: "UNESCO." },
      { id_suffix: "v8", difficulty: 4, question: "Resiliencia:", options: [{text: "Capacidad de recuperarse frente a la adversidad",correct:true},{text: "Fuerza física",correct:false},{text: "Inteligencia",correct:false},{text: "Riqueza",correct:false}], explanation: "Sobrevivir." },
      { id_suffix: "v9", difficulty: 5, question: "Justicia Restaurativa:", options: [{text: "Enfocada en reparar el daño y restaurar relaciones, no solo castigar",correct:true},{text: "Justicia retributiva (ojo por ojo)",correct:false},{text: "Venganza",correct:false},{text: "Impudad",correct:false}], explanation: "Sana tejido social." },
      { id_suffix: "v10", difficulty: 5, question: "Polarización política:", options: [{text: "División extrema de la sociedad en dos bandos opuestos",correct:true},{text: "Unidad",correct:false},{text: "Consenso",correct:false},{text: "Frío extremo",correct:false}], explanation: "Obstáculo paz." }
    ]
  },

  // Bundle 7: Social Movements
  {
    meta: {
      id: "CO-CS-10-social-movements-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "movimientos-sociales",
      periodo: 4,
      dba_id: "DBA-CS-10-4",
      title: "Movimientos Sociales"
    },
    base: { question: "Acción colectiva.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Movimiento Social:", options: [{text: "Acción colectiva organizada para promover o resistir cambios",correct:true},{text: "Fiesta",correct:false},{text: "Empresa",correct:false},{text: "Desfile",correct:false}], explanation: "Ciudadanía." },
      { id_suffix: "v2", difficulty: 1, question: "Movimiento Estudiantil (MESA/MANE):", options: [{text: "Lucha por el derecho a la educación pública de calidad",correct:true},{text: "Lucha por vacaciones",correct:false},{text: "Club de lectura",correct:false},{text: "Equipo fútbol",correct:false}], explanation: "Defensa lo público." },
      { id_suffix: "v3", difficulty: 2, question: "Movimiento Feminista:", options: [{text: "Busca la igualdad de derechos entre hombres y mujeres",correct:true},{text: "Odia a los hombres",correct:false},{text: "Quiere ser superior",correct:false},{text: "Moda",correct:false}], explanation: "Igualdad género." },
      { id_suffix: "v4", difficulty: 2, question: "Movimiento Ambientalista:", options: [{text: "Defensa del medio ambiente y recursos naturales",correct:true},{text: "Jardinería",correct:false},{text: "Zoológico",correct:false},{text: "Camping",correct:false}], explanation: "Ecología." },
      { id_suffix: "v5", difficulty: 3, question: "Paro Nacional:", options: [{text: "Huelga generalizada y protesta masiva contra políticas del gobierno",correct:true},{text: "Día festivo",correct:false},{text: "Desempleo",correct:false},{text: "Falla de motor",correct:false}], explanation: "Protesta social." },
      { id_suffix: "v6", difficulty: 3, question: "Minga Indígena:", options: [{text: "Trabajo colectivo y movilización de pueblos indígenas",correct:true},{text: "Fiesta",correct:false},{text: "Mercado",correct:false},{text: "Baile",correct:false}], explanation: "Resistencia." },
      { id_suffix: "v7", difficulty: 4, question: "Desobediencia Civil:", options: [{text: "Incumplimiento pacífico de una ley considerada injusta",correct:true},{text: "Delincuencia",correct:false},{text: "Terrorismo",correct:false},{text: "Pereza",correct:false}], explanation: "Gandhi/Luther King." },
      { id_suffix: "v8", difficulty: 4, question: "Sindicatos:", options: [{text: "Organizaciones de trabajadores para defender derechos laborales",correct:true},{text: "Club social",correct:false},{text: "Partido político",correct:false},{text: "Empresa",correct:false}], explanation: "CUT, Fecode." },
      { id_suffix: "v9", difficulty: 5, question: "Vandalismo vs Protesta:", options: [{text: "Protesta es derecho constitucional; vandalismo es delito (daño bien ajeno)",correct:true},{text: "Son lo mismo",correct:false},{text: "Todo es vandalismo",correct:false},{text: "Todo es protesta",correct:false}], explanation: "Límite legal." },
      { id_suffix: "v10", difficulty: 5, question: "Primera Línea (Estallido Social):", options: [{text: "Grupo de jóvenes que enfrentaba al ESMAD en protestas",correct:true},{text: "Fila del banco",correct:false},{text: "Ejército",correct:false},{text: "Policía",correct:false}], explanation: "Fenómeno 2021." }
    ]
  },

  // Bundle 8: Contemporary World Problems
  {
    meta: {
      id: "CO-CS-10-world-problems-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "problemas-globales",
      periodo: 4,
      dba_id: "DBA-CS-10-4",
      title: "Problemas Globales Contemporáneos"
    },
    base: { question: "Mundo actual.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Cambio Climático:", options: [{text: "Alteración del clima global por acción humana (GEI)",correct:true},{text: "Ciclo natural solo",correct:false},{text: "Mentira",correct:false},{text: "Calor de verano",correct:false}], explanation: "Crisis ambiental." },
      { id_suffix: "v2", difficulty: 1, question: "Terrorismo Internacional:", options: [{text: "Uso de violencia indiscriminada para causar terror político",correct:true},{text: "Guerra legal",correct:false},{text: "Delincuencia común",correct:false},{text: "Protesta",correct:false}], explanation: "Ej: ISIS." },
      { id_suffix: "v3", difficulty: 2, question: "Crisis de Refugiados:", options: [{text: "Desplazamiento masivo de personas huyendo de guerras/persecución",correct:true},{text: "Turismo masivo",correct:false},{text: "Migración laboral",correct:false},{text: "Excursión",correct:false}], explanation: "Siria, Venezuela." },
      { id_suffix: "v4", difficulty: 2, question: "Pandemias (COVID-19):", options: [{text: "Enfermedades globales que afectan salud y economía",correct:true},{text: "Gripa local",correct:false},{text: "Mentira",correct:false},{text: "Virus informático",correct:false}], explanation: "Salud pública." },
      { id_suffix: "v5", difficulty: 3, question: "Ciberseguridad:", options: [{text: "Protección de datos y sistemas ante ataques digitales",correct:true},{text: "Policía real",correct:false},{text: "Antivirus",correct:false},{text: "Cerrar puerta",correct:false}], explanation: "Guerra híbrida." },
      { id_suffix: "v6", difficulty: 3, question: "Desigualdad Económica (Coeficiente Gini):", options: [{text: "Brecha creciente entre ricos y pobres",correct:true},{text: "Igualdad total",correct:false},{text: "Todos ricos",correct:false},{text: "Todos pobres",correct:false}], explanation: "Concentración riqueza." },
      { id_suffix: "v7", difficulty: 4, question: "Populismo de derecha/izquierda:", options: [{text: "Líderes que ofrecen soluciones simples y polarizan la sociedad",correct:true},{text: "Democracia perfecta",correct:false},{text: "Monarquía",correct:false},{text: "Ciencia",correct:false}], explanation: "Crisis democracia." },
      { id_suffix: "v8", difficulty: 4, question: "Inteligencia Artificial ética:", options: [{text: "Debate sobre el impacto y control de la IA en la sociedad",correct:true},{text: "Robots asesinos",correct:false},{text: "Juguetes",correct:false},{text: "Película",correct:false}], explanation: "Futuro trabajo." },
      { id_suffix: "v9", difficulty: 5, question: "Multilateralismo:", options: [{text: "Cooperación entre múltiples países (ONU) para resolver problemas",correct:true},{text: "Unilateralismo (uno manda)",correct:false},{text: "Aislamiento",correct:false},{text: "Guerra",correct:false}], explanation: "Diplomacia." },
      { id_suffix: "v10", difficulty: 5, question: "Guerra en Ucrania/Gaza:", options: [{text: "Conflictos geopolíticos actuales con impacto global",correct:true},{text: "Historia antigua",correct:false},{text: "Películas",correct:false},{text: "Juegos",correct:false}], explanation: "Inestabilidad." }
    ]
  },

  // Bundle 9: Schools of Thought
  {
    meta: {
      id: "CO-CS-10-social-thought-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "pensamiento-social",
      periodo: 4,
      dba_id: "DBA-CS-10-4",
      title: "Escuelas de Pensamiento Social"
    },
    base: { question: "Teoría social.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "Capitalismo:", options: [{text: "Propiedad privada medios producción y libre mercado",correct:true},{text: "Propiedad estatal",correct:false},{text: "Sin dinero",correct:false},{text: "Trueque",correct:false}], explanation: "Adam Smith." },
      { id_suffix: "v2", difficulty: 1, question: "Socialismo:", options: [{text: "Propiedad social/estatal medios producción y planificación",correct:true},{text: "Libre mercado total",correct:false},{text: "Monarquía",correct:false},{text: "Feudalismo",correct:false}], explanation: "Marx." },
      { id_suffix: "v3", difficulty: 2, question: "Marxismo (Lucha de clases):", options: [{text: "Motor de la historia es conflicto entre opresores y oprimidos",correct:true},{text: "Paz y amor",correct:false},{text: "Religión",correct:false},{text: "Cooperación",correct:false}], explanation: "Materialismo histórico." },
      { id_suffix: "v4", difficulty: 2, question: "Liberalismo Clásico:", options: [{text: "Libertad individual, Estado limitado, Laissez-faire",correct:true},{text: "Estado fuerte",correct:false},{text: "Control total",correct:false},{text: "Dictadura",correct:false}], explanation: "Derechos individuales." },
      { id_suffix: "v5", difficulty: 3, question: "Keynesianismo:", options: [{text: "Estado debe intervenir en economía (gasto público) en crisis",correct:true},{text: "Estado no hace nada",correct:false},{text: "Comunismo puro",correct:false},{text: "Anarquía",correct:false}], explanation: "Estado Bienestar." },
      { id_suffix: "v6", difficulty: 3, question: "Posmodernismo:", options: [{text: "Cuestionamiento de grandes verdades/relatos y objetividad",correct:true},{text: "Verdad absoluta",correct:false},{text: "Ciencia exacta",correct:false},{text: "Religión",correct:false}], explanation: "Relativismo." },
      { id_suffix: "v7", difficulty: 4, question: "Feminismo (Teoría):", options: [{text: "Analiza el patriarcado y relaciones de poder de género",correct:true},{text: "Odio hombres",correct:false},{text: "Moda",correct:false},{text: "Biología",correct:false}], explanation: "Género constructo." },
      { id_suffix: "v8", difficulty: 4, question: "Decolonialidad:", options: [{text: "Pensamiento crítico desde el Sur Global contra eurocentrismo",correct:true},{text: "Colonialismo",correct:false},{text: "Amor a Europa",correct:false},{text: "Viajar",correct:false}], explanation: "Quijano/Dussel." },
      { id_suffix: "v9", difficulty: 5, question: "Utilitarismo:", options: [{text: "La mejor acción es la que produce mayor felicidad al mayor número",correct:true},{text: "Egoísmo",correct:false},{text: "Deber por deber",correct:false},{text: "Ley divina",correct:false}], explanation: "Bentham/Mill." },
      { id_suffix: "v10", difficulty: 5, question: "Contrato Social (Rousseau/Hobbes):", options: [{text: "Acuerdo implícito donde individuos ceden libertad al Estado por seguridad/orden",correct:true},{text: "Contrato laboral",correct:false},{text: "Firma papel",correct:false},{text: "Matrimonio",correct:false}], explanation: "Origen Estado." }
    ]
  },

  // Bundle 10: Taller Review P4
    {
    meta: {
      id: "CO-CS-10-taller-p4-001",
      country: "co",
      grade: 10,
      subject: "sociales",
      topic: "review",
      periodo: 4,
      dba_id: "DBA-CS-10-4",
      title: "Taller Repaso P4"
    },
    base: { question: "Repaso general.", answer: "True", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, question: "DDHH Universales (1948):", options: [{text: "Para todos los seres humanos",correct:true},{text: "Para ricos",correct:false},{text: "Para hombres",correct:false},{text: "Para Europa",correct:false}], explanation: "ONU." },
      { id_suffix: "v2", difficulty: 1, question: "DIH aplica en:", options: [{text: "Conflicto Armado",correct:true},{text: "Paz",correct:false},{text: "Colegio",correct:false},{text: "Casa",correct:false}], explanation: "Guerra." },
      { id_suffix: "v3", difficulty: 2, question: "Víctima Ley 1448:", options: [{text: "Persona dañada por el conflicto",correct:true},{text: "Cualquiera",correct:false},{text: "Soldado",correct:false},{text: "Extranjero",correct:false}], explanation: "1985." },
      { id_suffix: "v4", difficulty: 2, question: "Principio Distinción DIH:", options: [{text: "Civil vs Combatiente",correct:true},{text: "Bueno vs Malo",correct:false},{text: "Alto vs Bajo",correct:false},{text: "Rico vs Pobre",correct:false}], explanation: "Proteger civil." },
      { id_suffix: "v5", difficulty: 3, question: "Justicia Transicional:", options: [{text: "Verdad, Justicia, Reparación, No Repetición",correct:true},{text: "Cárcel perpetua",correct:false},{text: "Olvido",correct:false},{text: "Venganza",correct:false}], explanation: "Paz." },
      { id_suffix: "v6", difficulty: 3, question: "JEP:", options: [{text: "Jurisdicción Especial para la Paz",correct:true},{text: "Juez Penal",correct:false},{text: "Policía",correct:false},{text: "Fiscalía",correct:false}], explanation: "Tribunal paz." },
      { id_suffix: "v7", difficulty: 4, question: "Discriminación:", options: [{text: "Trato desigual por raza, género, etc.",correct:true},{text: "Trato igual",correct:false},{text: "Amistad",correct:false},{text: "Selección natural",correct:false}], explanation: "Exclusión." },
      { id_suffix: "v8", difficulty: 4, question: "Cambio Climático:", options: [{text: "Problema global ambiental",correct:true},{text: "Problema local",correct:false},{text: "Mentira",correct:false},{text: "Clima rico",correct:false}], explanation: "GEI." },
      { id_suffix: "v9", difficulty: 5, question: "Mecanismo autocomposición:", options: [{text: "Conciliación (partes deciden)",correct:true},{text: "Juez decide",correct:false},{text: "Pelea",correct:false},{text: "Guerra",correct:false}], explanation: "Acuerdo." },
      { id_suffix: "v10", difficulty: 5, question: "Derechos 2da Generación:", options: [{text: "Económicos, Sociales, Culturales",correct:true},{text: "Civiles",correct:false},{text: "Políticos",correct:false},{text: "Ambientales",correct:false}], explanation: "DESC." }
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
search_query: "human rights questions grade ${meta.grade} ${meta.periodo} ${meta.topic}"
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

**Competencia:** Pensamiento Social y Sistémico (DBA: ${meta.dba_id})

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
    console.log(`✅ Created Period 4 Bundle v3.0: ${fullPath}`);
});
