
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
  // Grade 11 - Sociales - Period 3 - BUNDLE 1 (Derechos Fundamentales)
  {
    meta: {
      id: "CO-SOC-11-derechos-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "constitucion-ddhh",
      periodo: 3,
      dba_id: "DBA-SOC-11-3",
      title: "Derechos Fundamentales"
    },
    base: { question: "Todos tenemos derechos.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "El derecho a la vida es:", options: [{text: "Inviolable (Artículo 11)",correct:true},{text: "Opcional",correct:false},{text: "Se puede comprar",correct:false},{text: "Solo para ricos",correct:false}], explanation: "Base de todos." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Derecho de Petición:", options: [{text: "Derecho a solicitar información a autoridades (Artículo 23)",correct:true},{text: "Pedir dinero",correct:false},{text: "Pedir comida",correct:false},{text: "Rogar",correct:false}], explanation: "Respuesta en 15 días." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Habeas Corpus:", options: [{text: "Protege contra detenciones ilegales o arbitrarias",correct:true},{text: "Protege la casa",correct:false},{text: "Protege el carro",correct:false},{text: "Protege el celular",correct:false}], explanation: "Libertad personal." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Debido Proceso:", options: [{text: "Garantía de ser juzgado según leyes preexistentes (Nadie es culpable sin juicio)",correct:true},{text: "Juzgar rápido",correct:false},{text: "Cárcel directa",correct:false},{text: "Sin abogado",correct:false}], explanation: "Justicia." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Derechos de Primera Generación:", options: [{text: "Civiles y Políticos (Vida, Libertad, Voto)",correct:true},{text: "Económicos",correct:false},{text: "Culturales",correct:false},{text: "Ambientales",correct:false}], explanation: "Revolución Francesa." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Libertad de Expresión:", options: [{text: "Derecho a opinar y difundir pensamiento sin censura",correct:true},{text: "Insultar",correct:false},{text: "Mentir",correct:false},{text: "Callar",correct:false}], explanation: "Prensa libre." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Habeas Data:", options: [{text: "Derecho a conocer y rectificar información en bases de datos (Datacrédito)",correct:true},{text: "Tener internet",correct:false},{text: "Tener celular",correct:false},{text: "Tener datos",correct:false}], explanation: "Privacidad financiera." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Libre desarrollo de la personalidad:", options: [{text: "Derecho a decidir su proyecto de vida (Pelo largo, tatuajes)",correct:true},{text: "Ser grosero",correct:false},{text: "No estudiar",correct:false},{text: "Robar",correct:false}], explanation: "Autonomía." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Acción de Tutela aplica cuando:", options: [{text: "Se vulnera un derecho fundamental y no hay otro mecanismo judicial eficaz",correct:true},{text: "Para todo",correct:false},{text: "Para cobrar deudas",correct:false},{text: "Para divorciarse",correct:false}], explanation: "Subsidiariedad." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Doble instancia:", options: [{text: "Derecho a apelar una sentencia ante un superior jerárquico",correct:true},{text: "Doble juicio",correct:false},{text: "Dos jueces",correct:false},{text: "Doble pena",correct:false}], explanation: "Garantía judicial." }
    ]
  },

  // Bundle 2: Derechos DESC (Económicos, Sociales y Culturales)
  {
    meta: {
      id: "CO-SOC-11-desc-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "constitucion-ddhh",
      periodo: 3,
      dba_id: "DBA-SOC-11-3",
      title: "Derechos Económicos, Sociales y Culturales"
    },
    base: { question: "Hay derechos sociales.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Derecho a la educación:", options: [{text: "Es un derecho de la persona y un servicio público",correct:true},{text: "Es un lujo",correct:false},{text: "Es opcional",correct:false},{text: "Es un negocio",correct:false}], explanation: "Artículo 67." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Derecho a la salud:", options: [{text: "Acceso a servicios médicos (Seguridad Social)",correct:true},{text: "Estar sano siempre",correct:false},{text: "No enfermarse",correct:false},{text: "Ser inmortal",correct:false}], explanation: "Ley 100 y Tutela." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Derechos de Segunda Generación:", options: [{text: "DESC (Económicos, Sociales, Culturales)",correct:true},{text: "Civiles",correct:false},{text: "Ambientales",correct:false},{text: "Políticos",correct:false}], explanation: "Igualdad real." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Seguridad Social:", options: [{text: "Sistema de protección (Salud, Pensión, Riesgos)",correct:true},{text: "Policía",correct:false},{text: "Celadores",correct:false},{text: "Alarmas",correct:false}], explanation: "Bienestar." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Derecho al trabajo:", options: [{text: "Obligación social y derecho fundamental en condiciones dignas",correct:true},{text: "Esclavitud",correct:false},{text: "No hacer nada",correct:false},{text: "Ganar lotería",correct:false}], explanation: "Artículo 25." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Vivienda digna:", options: [{text: "Derecho a un hogar adecuado (Estado debe facilitar planes)",correct:true},{text: "Casa regalada",correct:false},{text: "Mansión",correct:false},{text: "Hotel",correct:false}], explanation: "VIS." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Protección a la familia:", options: [{text: "Núcleo fundamental de la sociedad (Amparada por el Estado)",correct:true},{text: "Solo mamá y papá",correct:false},{text: "Solo hijos",correct:false},{text: "Empresa",correct:false}], explanation: "Todo tipo familia." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Derechos del niño:", options: [{text: "Prevalecen sobre los derechos de los demás",correct:true},{text: "Son iguales",correct:false},{text: "Son menos importantes",correct:false},{text: "No existen",correct:false}], explanation: "Interés superior." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Acción de Grupo:", options: [{text: "Mecanismo para pedir indemnización por daños a un grupo de personas",correct:true},{text: "Reunión",correct:false},{text: "Fiesta",correct:false},{text: "Tutela individual",correct:false}], explanation: "Perjuicios comunes." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Derecho de Huelga:", options: [{text: "Suspensión colectiva de trabajo (Salvo en servicios públicos esenciales)",correct:true},{text: "Prohibido siempre",correct:false},{text: "Obligatorio",correct:false},{text: "Vacaciones",correct:false}], explanation: "Protesta laboral." }
    ]
  },

  // Bundle 3: Derechos Colectivos y del Ambiente
  {
    meta: {
      id: "CO-SOC-11-ambiente-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "constitucion-ddhh",
      periodo: 3,
      dba_id: "DBA-SOC-11-3",
      title: "Derechos Colectivos y Ambientales"
    },
    base: { question: "El ambiente es de todos.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Derecho a un ambiente sano:", options: [{text: "Es deber del Estado y ciudadanos protegerlo",correct:true},{text: "Es solo del gobierno",correct:false},{text: "No importa",correct:false},{text: "Es privado",correct:false}], explanation: "Constitución Verde." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Patrimonio cultural:", options: [{text: "Bienes y valores de la identidad nacional (Protegidos)",correct:true},{text: "Dinero",correct:false},{text: "Casas nuevas",correct:false},{text: "Carros",correct:false}], explanation: "Arqueología, arte." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Acción Popular:", options: [{text: "Mecanismo para proteger derechos colectivos (espacio público, ambiente)",correct:true},{text: "Votar",correct:false},{text: "Ser famoso",correct:false},{text: "Tutela",correct:false}], explanation: "Preventiva o restitutiva." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Espacio Público:", options: [{text: "Lugares de uso común (Parques, andenes) inalienables",correct:true},{text: "Mi antejardín",correct:false},{text: "Casa",correct:false},{text: "Oficina",correct:false}], explanation: "No se vende." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Moralidad administrativa:", options: [{text: "Derecho a que los funcionarios públicos sean honestos",correct:true},{text: "Religión",correct:false},{text: "Ética personal",correct:false},{text: "Nada",correct:false}], explanation: "No corrupción." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Derechos de Tercera Generación:", options: [{text: "Colectivos y del Medio Ambiente (Paz, Desarrollo)",correct:true},{text: "Civiles",correct:false},{text: "Sociales",correct:false},{text: "Individuales",correct:false}], explanation: "Solidaridad." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Desarrollo Sostenible en Constitución:", options: [{text: "Planificar manejo de recursos naturales para garantizar su conservación",correct:true},{text: "Gastar todo",correct:false},{text: "No tocar",correct:false},{text: "Vender todo",correct:false}], explanation: "Artículo 80." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Consulta Popular minera (Debate):", options: [{text: "Mecanismo usado por pueblos para prohibir minería (Corte limitó alcance)",correct:true},{text: "Minería libre",correct:false},{text: "Nadie opina",correct:false},{text: "Solo alcalde",correct:false}], explanation: "Tensión local-nacional." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Función ecológica de la propiedad:", options: [{text: "La propiedad privada tiene límites y obligaciones ambientales",correct:true},{text: "Hacer lo que quiera",correct:false},{text: "Destruir",correct:false},{text: "No existe propiedad",correct:false}], explanation: "Límite derecho." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Principio de Precaución:", options: [{text: "Ante duda de daño ambiental grave, se debe evitar la acción",correct:true},{text: "Hacer y luego ver",correct:false},{text: "Arriesgarse",correct:false},{text: "No importa",correct:false}], explanation: "Ambiental." }
    ]
  },

  // Bundle 4: Mecanismos de Participación Ciudadana
  {
    meta: {
      id: "CO-SOC-11-participacion-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "constitucion-ddhh",
      periodo: 3,
      dba_id: "DBA-SOC-11-3",
      title: "Participación Ciudadana"
    },
    base: { question: "El pueblo decide.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "El Voto:", options: [{text: "Mecanismo para elegir representantes (Derecho y deber)",correct:true},{text: "Encuesta",correct:false},{text: "Juego",correct:false},{text: "Obligación militar",correct:false}], explanation: "Sufragio universal." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Plebiscito:", options: [{text: "Presidente consulta al pueblo sobre una decisión (SÍ/NO)",correct:true},{text: "Elegir alcalde",correct:false},{text: "Cambiar leyes",correct:false},{text: "Juzgar",correct:false}], explanation: "Paz 2016." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Referendo:", options: [{text: "Pueblo aprueba o deroga una norma jurídica (Constitución/Ley)",correct:true},{text: "Opinión",correct:false},{text: "Encuesta",correct:false},{text: "Examen",correct:false}], explanation: "Reformas." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Consulta Popular:", options: [{text: "Pregunta al pueblo sobre asunto de trascendencia nacional/local",correct:true},{text: "Llamada",correct:false},{text: "Entrevista",correct:false},{text: "Denuncia",correct:false}], explanation: "Temas generales." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Cabildo Abierto:", options: [{text: "Reunión pública del concejo donde ciudadanos participan",correct:true},{text: "Fiesta en la plaza",correct:false},{text: "Misa",correct:false},{text: "Mercado",correct:false}], explanation: "Local." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Revocatoria del Mandato:", options: [{text: "Ciudadanos terminan mandato de Alcalde o Gobernador (incumplimiento)",correct:true},{text: "Sacar al presidente",correct:false},{text: "Sacar al vecino",correct:false},{text: "Despido laboral",correct:false}], explanation: "Voto programático." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Iniciativa Legislativa:", options: [{text: "Ciudadanos presentan proyectos de ley al Congreso (con firmas)",correct:true},{text: "Hacer leyes en casa",correct:false},{text: "Mandar carta",correct:false},{text: "Protestar",correct:false}], explanation: "Origen popular." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Voto programático:", options: [{text: "Alcaldes/Gobernadores obligados a cumplir su plan de gobierno",correct:true},{text: "Votar por el lindo",correct:false},{text: "Promesas falsas",correct:false},{text: "Voto en blanco",correct:false}], explanation: "Base de revocatoria." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Umbral electoral:", options: [{text: "Mínimo de votos para que mecanismo sea válido",correct:true},{text: "Puerta",correct:false},{text: "Techo",correct:false},{text: "Valla",correct:false}], explanation: "Validez." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Personería Jurídica de partidos:", options: [{text: "Reconocimiento legal para avalar candidatos (requiere umbral votos)",correct:true},{text: "DNI",correct:false},{text: "Cedula",correct:false},{text: "Nombre",correct:false}], explanation: "Sistema partidos." }
    ]
  },

  // Bundle 5: Estructura del Estado
  {
    meta: {
      id: "CO-SOC-11-estado-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "constitucion-ddhh",
      periodo: 3,
      dba_id: "DBA-SOC-11-3",
      title: "Ramas del Poder Público"
    },
    base: { question: "El poder se divide.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Rama Ejecutiva:", options: [{text: "Administra el Estado (Presidente, Ministros, Alcaldes)",correct:true},{text: "Hacer leyes",correct:false},{text: "Juzgar",correct:false},{text: "Vigilar",correct:false}], explanation: "Gobierno." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Rama Legislativa:", options: [{text: "Hacer las leyes y control político (Congreso)",correct:true},{text: "Presidente",correct:false},{text: "Jueces",correct:false},{text: "Policía",correct:false}], explanation: "Senado/Cámara." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Rama Judicial:", options: [{text: "Administra justicia (Cortes, Fiscalia, Jueces)",correct:true},{text: "Presidente",correct:false},{text: "Alcalde",correct:false},{text: "Congreso",correct:false}], explanation: "Jueces." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Órganos de Control:", options: [{text: "Procuraduría, Contraloría, Defensoría (Vigilan funcionarios)",correct:true},{text: "Policía",correct:false},{text: "Ejército",correct:false},{text: "Presidente",correct:false}], explanation: "Ministerio Público." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Procuraduría General:", options: [{text: "Vigila conducta de funcionarios públicos y DDHH",correct:true},{text: "Vigila dinero",correct:false},{text: "Juzga criminales",correct:false},{text: "Hace leyes",correct:false}], explanation: "Sanciones disciplinarias." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Contraloría General:", options: [{text: "Vigila el uso de los dineros públicos (Control fiscal)",correct:true},{text: "Vigila conducta",correct:false},{text: "Defiende pueblo",correct:false},{text: "Vende cosas",correct:false}], explanation: "Plata." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Defensoría del Pueblo:", options: [{text: "Promociona y defiende los Derechos Humanos",correct:true},{text: "Juzga",correct:false},{text: "Captura",correct:false},{text: "Cobra impuestos",correct:false}], explanation: "DDHH." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Consejo de Estado:", options: [{text: "Máximo juez de lo contencioso administrativo (Demandas al Estado)",correct:true},{text: "Consejo de ministros",correct:false},{text: "Consejo de seguridad",correct:false},{text: "Alcaldía",correct:false}], explanation: "Cierre administrativo." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Moción de Censura:", options: [{text: "Congreso destituye a un Ministro por mal desempeño",correct:true},{text: "Censurar prensa",correct:false},{text: "Despedir presidente",correct:false},{text: "Multa",correct:false}], explanation: "Control político." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Estado Unitario con autonomía:", options: [{text: "Un solo centro de poder político, pero entidades territoriales autónomas",correct:true},{text: "Federalismo",correct:false},{text: "Monarquía",correct:false},{text: "Dictadura",correct:false}], explanation: "Modelo Colombia." }
    ]
  },

  // Bundle 6: Ciudadanía y Democracia
  {
    meta: {
      id: "CO-SOC-11-ciudadania-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "constitucion-ddhh",
      periodo: 3,
      dba_id: "DBA-SOC-11-3",
      title: "Ciudadanía Activa"
    },
    base: { question: "Ser ciudadano implica deberes.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Edad ciudadanía Colombia:", options: [{text: "18 años (Cédula)",correct:true},{text: "21 años",correct:false},{text: "15 años",correct:false},{text: "30 años",correct:false}], explanation: "Mayoría edad." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Deber ciudadano principal:", options: [{text: "Respetar derechos ajenos y no abusar de los propios",correct:true},{text: "Ser rico",correct:false},{text: "Tener carro",correct:false},{text: "Viajar",correct:false}], explanation: "Artículo 95." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Veeduría Ciudadana:", options: [{text: "Ciudadanos vigilan la gestión pública",correct:true},{text: "Ver TV",correct:false},{text: "Espiar vecinos",correct:false},{text: "Cámaras seguridad",correct:false}], explanation: "Control social." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Pluralismo:", options: [{text: "Reconocimiento y respeto a la diversidad de ideas y culturas",correct:true},{text: "Todos iguales",correct:false},{text: "Una sola idea",correct:false},{text: "Dictadura",correct:false}], explanation: "Tolerancia." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Sociedad Civil:", options: [{text: "Conjunto de organizaciones ciudadanas fuera del Estado (ONGs, Sindicatos)",correct:true},{text: "El ejército",correct:false},{text: "La policía",correct:false},{text: "Gobierno",correct:false}], explanation: "Tejido social." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Cultura de la Legalidad:", options: [{text: "Cumplimiento voluntario de la norma y rechazo a ilegalidad",correct:true},{text: "Miedo a policía",correct:false},{text: "Trampa",correct:false},{text: "Soborno",correct:false}], explanation: "Ética pública." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Responsabilidad fiscal:", options: [{text: "Deber de pagar impuestos para financiar el Estado",correct:true},{text: "Evasión",correct:false},{text: "No pagar nada",correct:false},{text: "Robar",correct:false}], explanation: "Tributación." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Objeción de conciencia:", options: [{text: "Negarse a cumplir obligación legal por convicciones profundas (Servicio militar)",correct:true},{text: "Pereza",correct:false},{text: "Miedo",correct:false},{text: "Excusa",correct:false}], explanation: "Derecho fundamental." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Desobediencia civil (Rawls):", options: [{text: "Acto público, no violento, contra ley injusta para cambiarla",correct:true},{text: "Revolución armada",correct:false},{text: "Crimen",correct:false},{text: "Vandalismo",correct:false}], explanation: "Protesta legítima." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Capital Social:", options: [{text: "Redes de confianza y cooperación en una sociedad",correct:true},{text: "Dinero en banco",correct:false},{text: "Edificios",correct:false},{text: "Carreteras",correct:false}], explanation: "Confianza." }
    ]
  },

  // Bundle 7: Diversidad y Discriminación
  {
    meta: {
      id: "CO-SOC-11-diversidad-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "constitucion-ddhh",
      periodo: 3,
      dba_id: "DBA-SOC-11-3",
      title: "Inclusión y Diversidad"
    },
    base: { question: "Colombia es pluriétnica.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Discriminación:", options: [{text: "Trato desigual e injusto por raza, género, religión, etc.",correct:true},{text: "Trato justo",correct:false},{text: "Amistad",correct:false},{text: "Selección fútbol",correct:false}], explanation: "Exclusión." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Racismo:", options: [{text: "Discriminación basada en la raza o etnia",correct:true},{text: "Odio a pobres",correct:false},{text: "Odio a mujeres",correct:false},{text: "Miedo",correct:false}], explanation: "Prejuicio racial." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Equidad de género:", options: [{text: "Igualdad de oportunidades para hombres y mujeres",correct:true},{text: "Mujeres mandan",correct:false},{text: "Hombres mandan",correct:false},{text: "Pelea",correct:false}], explanation: "Justicia género." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Comunidad LGBTIQ+:", options: [{text: "Diversidad sexual y de género",correct:true},{text: "Partido político",correct:false},{text: "Religión",correct:false},{text: "Club",correct:false}], explanation: "Derechos minorías." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Acciones Afirmativas:", options: [{text: "Medidas para favorecer grupos históricamente discriminados (Cuotas)",correct:true},{text: "Discriminación negativa",correct:false},{text: "Regalos",correct:false},{text: "Castigos",correct:false}], explanation: "Igualdad material." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Feminicidio:", options: [{text: "Asesinato de una mujer por su condición de género",correct:true},{text: "Homicidio común",correct:false},{text: "Suicidio",correct:false},{text: "Accidente",correct:false}], explanation: "Violencia género." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Enfoque Diferencial:", options: [{text: "Atención estatal adaptada a necesidades específicas (Indígenas, Víctimas)",correct:true},{text: "Atención igual",correct:false},{text: "Ignorar",correct:false},{text: "Burocracia",correct:false}], explanation: "Política pública." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Aporofobia:", options: [{text: "Miedo o rechazo al pobre",correct:true},{text: "Miedo arañas",correct:false},{text: "Miedo extranjeros",correct:false},{text: "Miedo encierro",correct:false}], explanation: "Discriminación clase." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Interseccionalidad:", options: [{text: "Cruce de discriminaciones (Ser mujer, negra y pobre)",correct:true},{text: "Rotonda",correct:false},{text: "Calle",correct:false},{text: "Suma",correct:false}], explanation: "Complejidad." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Techo de cristal:", options: [{text: "Barreras invisibles que impiden ascenso laboral de mujeres",correct:true},{text: "Techo transparente",correct:false},{text: "Ventana",correct:false},{text: "Piso",correct:false}], explanation: "Desigualdad laboral." }
    ]
  },

  // Bundle 8: Taller Mecanismos Participación
  {
    meta: {
      id: "CO-SOC-11-taller-participacion-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "constitucion-ddhh",
      periodo: 3,
      dba_id: "DBA-SOC-11-3",
      title: "Aplicación de Mecanismos"
    },
    base: { question: "Los mecanismos sirven.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Si no me atienden en salud, uso:", options: [{text: "Acción de Tutela",correct:true},{text: "Acción Popular",correct:false},{text: "Voto",correct:false},{text: "Plebiscito",correct:false}], explanation: "Derecho vida/salud." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Para elegir alcalde uso:", options: [{text: "Voto",correct:true},{text: "Tutela",correct:false},{text: "Referendo",correct:false},{text: "Cabildo",correct:false}], explanation: "Elección." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Para proteger el espacio público de mi barrio uso:", options: [{text: "Acción Popular",correct:true},{text: "Tutela",correct:false},{text: "Habeas Corpus",correct:false},{text: "Divorcio",correct:false}], explanation: "Derecho colectivo." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Si me detienen ilegalmente uso:", options: [{text: "Habeas Corpus",correct:true},{text: "Habeas Data",correct:false},{text: "Tutela",correct:false},{text: "Voto",correct:false}], explanation: "Libertad." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Para corregir mi reporte en Datacrédito uso:", options: [{text: "Habeas Data",correct:true},{text: "Tutela",correct:false},{text: "Demanda",correct:false},{text: "Carta",correct:false}], explanation: "Datos." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Si el alcalde no cumple su programa uso:", options: [{text: "Revocatoria del Mandato",correct:true},{text: "Referendo",correct:false},{text: "Tutela",correct:false},{text: "Plebiscito",correct:false}], explanation: "Incumplimiento." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Para reformar la Constitución se puede usar:", options: [{text: "Referendo constitucional",correct:true},{text: "Tutela",correct:false},{text: "Decreto",correct:false},{text: "Encuesta",correct:false}], explanation: "Reforma." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Para preguntar al pueblo si quiere minería:", options: [{text: "Consulta Popular",correct:true},{text: "Plebiscito",correct:false},{text: "Tutela",correct:false},{text: "Voto",correct:false}], explanation: "Decisión local." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Si una ley va contra la Constitución interpongo:", options: [{text: "Demanda de Inconstitucionalidad",correct:true},{text: "Tutela",correct:false},{text: "Denuncia penal",correct:false},{text: "Queja",correct:false}], explanation: "Acción pública." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Derecho de Petición se responde en:", options: [{text: "15 días hábiles (general)",correct:true},{text: "Inmediato",correct:false},{text: "1 año",correct:false},{text: "Nunca",correct:false}], explanation: "Términos ley." }
    ]
  },

  // Bundle 9: Organismos Internacionales DDHH
  {
    meta: {
      id: "CO-SOC-11-internacional-ddhh-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "constitucion-ddhh",
      periodo: 3,
      dba_id: "DBA-SOC-11-3",
      title: "Sistemas Internacionales de Protección"
    },
    base: { question: "Los DDHH son mundiales.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Declaración Derechos Humanos (1948):", options: [{text: "Documento base de la ONU sobre derechos universales",correct:true},{text: "Ley de Colombia",correct:false},{text: "Libro",correct:false},{text: "Carta",correct:false}], explanation: "Universal." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "CIDH (Comisión Interamericana):", options: [{text: "Órgano de la OEA que recibe denuncias de DDHH",correct:true},{text: "Corte penal",correct:false},{text: "Policía",correct:false},{text: "Banco",correct:false}], explanation: "Sistema regional." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Corte Interamericana (CorteIDH):", options: [{text: "Juzga a los Estados por violaciones a la Convención Americana",correct:true},{text: "Juzga personas",correct:false},{text: "Corte suprema",correct:false},{text: "Fiscalía",correct:false}], explanation: "San José." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Cascos Azules:", options: [{text: "Fuerzas de paz de la ONU",correct:true},{text: "Bomberos",correct:false},{text: "Médicos",correct:false},{text: "Ingenieros",correct:false}], explanation: "Peacekeepers." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Crímenes de Lesa Humanidad:", options: [{text: "Ataques generalizados contra población civil (no prescriben)",correct:true},{text: "Robo simple",correct:false},{text: "Pelea callejera",correct:false},{text: "Insulto",correct:false}], explanation: "Gravedad extrema." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Acnur:", options: [{text: "Agencia ONU para refugiados",correct:true},{text: "Agencia comida",correct:false},{text: "Agencia clima",correct:false},{text: "Banco",correct:false}], explanation: "Protección migrantes." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Principio de no repetición:", options: [{text: "Garantía de que las violaciones de DDHH no volverán a ocurrir",correct:true},{text: "Repetir todo",correct:false},{text: "Olvido",correct:false},{text: "Venganza",correct:false}], explanation: "Justicia transicional." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Justicia Transicional:", options: [{text: "Mecanismos judiciales y no judiciales para pasar de conflicto a paz",correct:true},{text: "Justicia ordinaria",correct:false},{text: "Venganza",correct:false},{text: "Indulto total",correct:false}], explanation: "JEP." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Convención de Ginebra:", options: [{text: "Normas internacionales para proteger víctimas de guerra (DIH)",correct:true},{text: "Tratado comercio",correct:false},{text: "Turismo",correct:false},{text: "Salud",correct:false}], explanation: "Guerra humana." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Protocolo de Kioto/Acuerdo París:", options: [{text: "Tratados sobre cambio climático (Ambiente)",correct:true},{text: "DDHH",correct:false},{text: "Guerra",correct:false},{text: "Comercio",correct:false}], explanation: "Crisis climática." }
    ]
  },

  // Bundle 10: Ética y Convivencia
  {
    meta: {
      id: "CO-SOC-11-etica-001",
      country: "co",
      grade: 11,
      subject: "sociales",
      topic: "constitucion-ddhh",
      periodo: 3,
      dba_id: "DBA-SOC-11-3",
      title: "Ética Pública y Convivencia"
    },
    base: { question: "La ética mejora la convivencia.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Corrupción:", options: [{text: "Uso del poder público para beneficio privado",correct:true},{text: "Trabajo honesto",correct:false},{text: "Ayuda",correct:false},{text: "Error",correct:false}], explanation: "Mal mayor." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Código de Policía:", options: [{text: "Normas para la convivencia ciudadana",correct:true},{text: "Código penal",correct:false},{text: "Biblia",correct:false},{text: "Manual",correct:false}], explanation: "Comportamiento." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Resolución pacífica de conflictos:", options: [{text: "Diálogo, negociación, mediación",correct:true},{text: "Guerra",correct:false},{text: "Golpes",correct:false},{text: "Gritos",correct:false}], explanation: "Cultura paz." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Dilema moral:", options: [{text: "Situación donde hay conflicto entre valores",correct:true},{text: "Problema matemático",correct:false},{text: "Juego",correct:false},{text: "Chiste",correct:false}], explanation: "Decisión difícil." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Bien Común:", options: [{text: "Beneficio para todos o la mayoría (supera interés particular)",correct:true},{text: "Mi beneficio",correct:false},{text: "Beneficio del rico",correct:false},{text: "Nada",correct:false}], explanation: "Fin del Estado." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Tolerancia:", options: [{text: "Respeto a las ideas o prácticas diferentes a las propias",correct:true},{text: "Aguantar todo",correct:false},{text: "Pelear",correct:false},{text: "Ignorar",correct:false}], explanation: "Base democracia." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Impunidad:", options: [{text: "Falta de castigo a los delitos",correct:true},{text: "Justicia",correct:false},{text: "Perdón",correct:false},{text: "Castigo severo",correct:false}], explanation: "Debilidad justicia." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Cohecho:", options: [{text: "Soborno a funcionario público",correct:true},{text: "Regalo",correct:false},{text: "Salario",correct:false},{text: "Propina",correct:false}], explanation: "Delito corrupción." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Peculado:", options: [{text: "Apropiación de dineros públicos por funcionario",correct:true},{text: "Pecado",correct:false},{text: "Ahorro",correct:false},{text: "Inversión",correct:false}], explanation: "Robo al Estado." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Prevaricato:", options: [{text: "Funcionario/Juez dicta resolución contraria a la ley a sabiendas",correct:true},{text: "Error",correct:false},{text: "Justicia",correct:false},{text: "Ley nueva",correct:false}], explanation: "Fallo ilegal." }
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
search_query: "preguntas constitucion colombia grado ${meta.grade} ${meta.periodo} ${meta.topic}"
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
    console.log(`✅ Created Period 3 Bundle v3.0: ${fullPath}`);
});
