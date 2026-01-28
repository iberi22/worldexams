
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
  // Grade 11 - Lectura Crítica - Period 2 - BUNDLE 1 (Texto Argumentativo)
  {
    meta: {
      id: "CO-LEC-11-texto-argumentativo-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "argumentacion",
      periodo: 2,
      dba_id: "DBA-LEC-11-3",
      title: "Estructura del Texto Argumentativo"
    },
    base: { question: "El texto argumentativo busca convencer.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "La idea principal que se defiende se llama:", options: [{text:"Tesis",correct:true},{text:"Argumento",correct:false},{text:"Conclusión",correct:false},{text:"Título",correct:false}], explanation: "Postura del autor." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "El propósito de argumentar es:", options: [{text:"Persuadir o convencer",correct:true},{text:"Contar un chiste",correct:false},{text:"Describir un lugar",correct:false},{text:"Cantar",correct:false}], explanation: "Función apelativa." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Un argumento de ejemplificación usa:", options: [{text:"Casos concretos para ilustrar",correct:true},{text:"Mentiras",correct:false},{text:"Datos falsos",correct:false},{text:"Insultos",correct:false}], explanation: "Ejemplos." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "El ensayo es un tipo de texto:", options: [{text:"Argumentativo",correct:true},{text:"Narrativo puro",correct:false},{text:"Lírico",correct:false},{text:"Dramático",correct:false}], explanation: "Reflexión subjetiva." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "La columna de opinión refleja:", options: [{text:"El punto de vista del autor",correct:true},{text:"La verdad absoluta",correct:false},{text:"Solo noticias",correct:false},{text:"Ficción",correct:false}], explanation: "Subjetividad periodística." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Contraargumento sirve para:", options: [{text:"Anticipar objeciones y refutarlas",correct:true},{text:"Dar la razón al otro",correct:false},{text:"Terminar el texto rápido",correct:false},{text:"Confundir",correct:false}], explanation: "Debate interno." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Argumento de autoridad cita a:", options: [{text:"Expertos o instituciones reconocidas",correct:true},{text:"A mí mismo",correct:false},{text:"A un amigo",correct:false},{text:"A nadie",correct:false}], explanation: "Respaldo externo." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Argumento ad hominem (falacia) ataca a:", options: [{text:"La persona y no al argumento",correct:true},{text:"La idea",correct:false},{text:"La sociedad",correct:false},{text:"El libro",correct:false}], explanation: "Error lógico." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Diferencia entre Editorial y Columna:", options: [{text:"Editorial es la voz del medio (anónimo), Columna es personal",correct:true},{text:"Son lo mismo",correct:false},{text:"Editorial lleva firma",correct:false},{text:"Columna es objetiva",correct:false}], explanation: "Institucional vs Personal." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Silogismo lógico:", options: [{text:"Dos premisas y una conclusión",correct:true},{text:"Una tesis sola",correct:false},{text:"Un refrán",correct:false},{text:"Una metáfora",correct:false}], explanation: "Deducción." }
    ]
  },

  // Bundle 2: Ensayo
  {
    meta: {
      id: "CO-LEC-11-ensayo-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "argumentacion",
      periodo: 2,
      dba_id: "DBA-LEC-11-3",
      title: "El Ensayo Crítico"
    },
    base: { question: "El ensayo es flexible y argumentativo.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Padre del ensayo:", options: [{text:"Michel de Montaigne",correct:true},{text:"Cervantes",correct:false},{text:"Shakespeare",correct:false},{text:"Homero",correct:false}], explanation: "Essais (intentos)." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Introducción del ensayo contiene:", options: [{text:"Contexto y tesis",correct:true},{text:"El final de la historia",correct:false},{text:"Agradecimientos",correct:false},{text:"Bibliografía",correct:false}], explanation: "Apertura." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Conclusión del ensayo:", options: [{text:"Sintetiza y reafirma la tesis",correct:true},{text:"Introduce tema nuevo",correct:false},{text:"No es necesaria",correct:false},{text:"Cuenta un chiste",correct:false}], explanation: "Cierre." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Lenguaje del ensayo crítico:", options: [{text:"Formal pero personal",correct:true},{text:"Vulgar",correct:false},{text:"Poético puro",correct:false},{text:"Matemático",correct:false}], explanation: "Estilo académico." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Ensayo literario analiza:", options: [{text:"Obras literarias",correct:true},{text:"Experimentos químicos",correct:false},{text:"Leyes de física",correct:false},{text:"Deportes",correct:false}], explanation: "Crítica de arte." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Cita textual requiere:", options: [{text:"Comillas y referencia",correct:true},{text:"Nada",correct:false},{text:"Solo mayúsculas",correct:false},{text:"Negrita",correct:false}], explanation: "Honestidad académica." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Plagio es:", options: [{text:"Usar ideas ajenas sin citar",correct:true},{text:"Citar correctamente",correct:false},{text:"Inventar ideas",correct:false},{text:"Traducir",correct:false}], explanation: "Delito intelectual." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Tesis explícita vs implícita:", options: [{text:"Escrita vs deducida",correct:true},{text:"Larga vs corta",correct:false},{text:"Buena vs mala",correct:false},{text:"Verdadera vs falsa",correct:false}], explanation: "Presencia en texto." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Ensayo filosófico busca:", options: [{text:"Reflexionar sobre problemas existenciales",correct:true},{text:"Entretener",correct:false},{text:"Vender algo",correct:false},{text:"Informar noticias",correct:false}], explanation: "Profundidad." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "La 'Ceguera' de Saramago (ensayo novelado):", options: [{text:"Crítica a la sociedad deshumanizada",correct:true},{text:"Historia de oftalmólogos",correct:false},{text:"Ciencia pura",correct:false},{text:"Romance",correct:false}], explanation: "Alegoría." }
    ]
  },

  // Bundle 3: Falacias Argumentativas
  {
    meta: {
      id: "CO-LEC-11-falacias-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "argumentacion",
      periodo: 2,
      dba_id: "DBA-LEC-11-3",
      title: "Falacias Argumentativas"
    },
    base: { question: "Una falacia es un error de razonamiento.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Falacia Ad Populum apela a:", options: [{text:"La mayoría (todos lo hacen)",correct:true},{text:"La fuerza",correct:false},{text:"La lástima",correct:false},{text:"La lógica",correct:false}], explanation: "Popularidad no es verdad." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Si digo 'Tú no sabes cocinar porque eres feo', es:", options: [{text:"Ad Hominem (ataque personal)",correct:true},{text:"Verdad",correct:false},{text:"Lógico",correct:false},{text:"Científico",correct:false}], explanation: "Irrelevante." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Falacia de autoridad falsa:", options: [{text:"Citar a alguien que no sabe del tema",correct:true},{text:"Citar a un experto",correct:false},{text:"No citar",correct:false},{text:"Citar un libro",correct:false}], explanation: "Messi hablando de medicina." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Generalización apresurada:", options: [{text:"Juzgar todo por un caso",correct:true},{text:"Analizar muchos casos",correct:false},{text:"Usar estadísticas",correct:false},{text:"Ser lento",correct:false}], explanation: "Todos los x son y." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Hombre de Paja:", options: [{text:"Distorsionar el argumento del oponente para atacarlo fácil",correct:true},{text:"Hablar de agricultura",correct:false},{text:"Usar muñecos",correct:false},{text:"Ser valiente",correct:false}], explanation: "Caricaturizar." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Ad Baculum apela a:", options: [{text:"La fuerza o miedo",correct:true},{text:"La razón",correct:false},{text:"Dios",correct:false},{text:"El dinero",correct:false}], explanation: "Bastón." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Pendiente resbaladiza:", options: [{text:"Decir que A llevará inevitablemente a Z (catástrofe)",correct:true},{text:"Caerse",correct:false},{text:"Ser precavido",correct:false},{text:"Planear",correct:false}], explanation: "Exageración de consecuencias." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Petición de principio (Círculo vicioso):", options: [{text:"La conclusión está en la premisa",correct:true},{text:"Pedir perdón",correct:false},{text:"Empezar bien",correct:false},{text:"Ser amable",correct:false}], explanation: "Dios existe porque lo dice la Biblia, que es palabra de Dios." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Falacia 'Post hoc ergo propter hoc':", options: [{text:"Confundir correlación con causalidad",correct:true},{text:"Hablar latín",correct:false},{text:"Ser médico",correct:false},{text:"Ser historiador",correct:false}], explanation: "Sucedió después, por lo tanto a causa de." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Falso dilema:", options: [{text:"Dar solo dos opciones cuando hay más",correct:true},{text:"No dar opciones",correct:false},{text:"Ser indeciso",correct:false},{text:"Mentir",correct:false}], explanation: "Blanco o negro." }
    ]
  },

  // Bundle 4: Columna de Opinión
  {
    meta: {
      id: "CO-LEC-11-columna-opinion-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "argumentacion",
      periodo: 2,
      dba_id: "DBA-LEC-11-3",
      title: "La Columna de Opinión"
    },
    base: { question: "El columnista firma su texto.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "La columna aparece en:", options: [{text:"Periódicos o revistas",correct:true},{text:"Libros de texto",correct:false},{text:"Diccionarios",correct:false},{text:"Recetas",correct:false}], explanation: "Género periodístico." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "La subjetividad implica:", options: [{text:"Opinión personal del autor",correct:true},{text:"Hechos puros",correct:false},{text:"Objetividad científica",correct:false},{text:"Mentira",correct:false}], explanation: "El Yo." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Un buen título de columna debe ser:", options: [{text:"Llamativo y sugestivo",correct:true},{text:"Aburrido",correct:false},{text:"Muy largo",correct:false},{text:"Invisible",correct:false}], explanation: "Gancho." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Daniel Samper Pizano escribe columnas de:", options: [{text:"Humor y sátira política",correct:true},{text:"Deportes",correct:false},{text:"Ciencia",correct:false},{text:"Moda",correct:false}], explanation: "Los Danieles." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "La ironía en la columna sirve para:", options: [{text:"Criticar con humor o inteligencia",correct:true},{text:"Insultar vulgarmente",correct:false},{text:"No decir nada",correct:false},{text:"Adular",correct:false}], explanation: "Recurso retórico." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Libertad de expresión:", options: [{text:"Derecho a opinar sin censura previa",correct:true},{text:"Derecho a insultar",correct:false},{text:"Derecho a mentir",correct:false},{text:"Silencio",correct:false}], explanation: "Base democrática." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Columna vs Noticia:", options: [{text:"Opinión vs Hecho",correct:true},{text:"Largo vs Corto",correct:false},{text:"Verdad vs Mentira",correct:false},{text:"Ayer vs Hoy",correct:false}], explanation: "Géneros distintos." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Responsabilidad del columnista:", options: [{text:"Ética y argumentos",correct:true},{text:"Ganar likes",correct:false},{text:"Vender publicidad",correct:false},{text:"Ninguna",correct:false}], explanation: "Influencia social." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Argumento analógico en columna:", options: [{text:"Compara situación actual con otra similar",correct:true},{text:"Usa datos",correct:false},{text:"Usa leyes",correct:false},{text:"Cita al presidente",correct:false}], explanation: "Comparación." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Sesgo de confirmación:", options: [{text:"Leer solo lo que apoya mi opinión",correct:true},{text:"Leer todo",correct:false},{text:"Ser crítico",correct:false},{text:"Ser objetivo",correct:false}], explanation: "Psicología cognitiva." }
    ]
  },

  // Bundle 5: Lectura Crítica de Noticias
  {
    meta: {
      id: "CO-LEC-11-noticias-critica-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "argumentacion",
      periodo: 2,
      dba_id: "DBA-LEC-11-1",
      title: "Análisis Crítico de Medios"
    },
    base: { question: "Los medios pueden tener sesgos.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Fake News significa:", options: [{text:"Noticias falsas",correct:true},{text:"Noticias buenas",correct:false},{text:"Noticias viejas",correct:false},{text:"Noticias rápidas",correct:false}], explanation: "Desinformación." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Fuente de la noticia:", options: [{text:"Origen de la información",correct:true},{text:"Tipo de letra",correct:false},{text:"El papel",correct:false},{text:"El vendedor",correct:false}], explanation: "Credibilidad." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Titular sensacionalista busca:", options: [{text:"Generar impacto emocional o morbo",correct:true},{text:"Informar verdad",correct:false},{text:"Educar",correct:false},{text:"Aburrir",correct:false}], explanation: "Clickbait." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Verificar la fecha de la noticia es:", options: [{text:"Importante para no caer en error",correct:true},{text:"Inútil",correct:false},{text:"Difícil",correct:false},{text:"Opcional",correct:false}], explanation: "Contexto temporal." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Línea editorial:", options: [{text:"Postura ideológica del medio",correct:true},{text:"Una raya en el papel",correct:false},{text:"El dueño",correct:false},{text:"La impresión",correct:false}], explanation: "Sesgo institucional." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Verificación de hechos (Fact-checking):", options: [{text:"Comprobar veracidad de datos",correct:true},{text:"Creer todo",correct:false},{text:"Compartir rápido",correct:false},{text:"Ignorar",correct:false}], explanation: "Periodismo de datos." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Manipulación mediática mediante omisión:", options: [{text:"No contar una parte de la historia",correct:true},{text:"Mentir directo",correct:false},{text:"Inventar",correct:false},{text:"Exagerar",correct:false}], explanation: "Silenciar hechos." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Cámara de eco:", options: [{text:"Escuchar solo opiniones iguales a la propia",correct:true},{text:"Un cuarto vacío",correct:false},{text:"Gritar fuerte",correct:false},{text:"Televisión",correct:false}], explanation: "Algoritmos RRSS." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Framing (Encuadre):", options: [{text:"Cómo se presenta una noticia para influir",correct:true},{text:"Poner un marco",correct:false},{text:"Tomar foto",correct:false},{text:"Filmar",correct:false}], explanation: "Perspectiva forzada." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Posverdad:", options: [{text:"Emociones importan más que hechos",correct:true},{text:"Verdad absoluta",correct:false},{text:"Mentira simple",correct:false},{text:"Filosofía",correct:false}], explanation: "Era actual." }
    ]
  },

  // Bundle 6: Discurso Político
  {
    meta: {
      id: "CO-LEC-11-discurso-politico-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "argumentacion",
      periodo: 2,
      dba_id: "DBA-LEC-11-1",
      title: "Análisis del Discurso Político"
    },
    base: { question: "El discurso político busca poder.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Demagogia:", options: [{text:"Halagar al pueblo falsamente",correct:true},{text:"Democracia real",correct:false},{text:"Hacer encuestas",correct:false},{text:"Votar",correct:false}], explanation: "Manipulación masas." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Propaganda:", options: [{text:"Difusión de ideología",correct:true},{text:"Venta de jabón",correct:false},{text:"Noticias neutras",correct:false},{text:"Educación",correct:false}], explanation: "Adoctrinamiento." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Retórica:", options: [{text:"Arte de convencer con palabras",correct:true},{text:"Mentir",correct:false},{text:"Hablar mucho",correct:false},{text:"Gritar",correct:false}], explanation: "Elocuencia." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Populismo:", options: [{text:"Apelar a 'el pueblo' contra 'la élite'",correct:true},{text:"Ser popular",correct:false},{text:"Música pop",correct:false},{text:"Ser rico",correct:false}], explanation: "Estrategia política." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Eufemismos en política (ej. 'Daños colaterales'):", options: [{text:"Suavizar la realidad (muertes civiles)",correct:true},{text:"Ser precisos",correct:false},{text:"Ahorrar palabras",correct:false},{text:"Ser amables",correct:false}], explanation: "Ocultar gravedad." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Polarización:", options: [{text:"Dividir sociedad en dos extremos opuestos",correct:true},{text:"Unir a todos",correct:false},{text:"Hacer frío",correct:false},{text:"Usar imanes",correct:false}], explanation: "Ellos vs Nosotros." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Discurso de Martin Luther King (I have a dream):", options: [{text:"Apelaba a la justicia e igualdad",correct:true},{text:"Incitaba al odio",correct:false},{text:"Era económico",correct:false},{text:"Era aburrido",correct:false}], explanation: "Retórica inspiradora." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Dogmatismo:", options: [{text:"Creer tener la verdad incuestionable",correct:true},{text:"Dudar de todo",correct:false},{text:"Ser flexible",correct:false},{text:"Tener perros",correct:false}], explanation: "Cierre mental." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Ventana de Overton:", options: [{text:"Rango de ideas aceptables políticamente",correct:true},{text:"Una ventana real",correct:false},{text:"Un software",correct:false},{text:"Una ley",correct:false}], explanation: "Lo que se puede decir." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Orwell '1984' y neolengua:", options: [{text:"Reducir lenguaje para reducir pensamiento",correct:true},{text:"Inventar palabras cool",correct:false},{text:"Mejorar comunicación",correct:false},{text:"Aprender inglés",correct:false}], explanation: "Control mental." }
    ]
  },

  // Bundle 7: Debates y Foros
  {
    meta: {
      id: "CO-LEC-11-debate-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "argumentacion",
      periodo: 2,
      dba_id: "DBA-LEC-11-3",
      title: "El Debate y la Oralidad Argumentativa"
    },
    base: { question: "El debate requiere escucha activa.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Moderador en debate:", options: [{text:"Regula tiempos y turnos",correct:true},{text:"Debate también",correct:false},{text:"Es el público",correct:false},{text:"Vende entradas",correct:false}], explanation: "Árbitro." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Respeto en el debate:", options: [{text:"Atacar ideas, no personas",correct:true},{text:"Gritar más fuerte",correct:false},{text:"Insultar",correct:false},{text:"Ignorar al otro",correct:false}], explanation: "Civismo." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Réplica:", options: [{text:"Respuesta o contraargumento",correct:true},{text:"Copia",correct:false},{text:"Terremoto",correct:false},{text:"Silencio",correct:false}], explanation: "Contestación." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Moción del debate:", options: [{text:"Tema o proposición a discutir",correct:true},{text:"Emoción",correct:false},{text:"Movimiento",correct:false},{text:"El final",correct:false}], explanation: "Tesis central." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Carga de la prueba:", options: [{text:"Quien afirma debe probar",correct:true},{text:"Quien niega debe probar",correct:false},{text:"Nadie prueba nada",correct:false},{text:"El juez prueba",correct:false}], explanation: "Onus probandi." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Lenguaje no verbal en oralidad:", options: [{text:"Gestos, postura, tono",correct:true},{text:"Solo palabras",correct:false},{text:"Escrito",correct:false},{text:"Silencio",correct:false}], explanation: "Comunicación corporal." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Sesgo de anclaje:", options: [{text:"Quedarse con la primera información",correct:true},{text:"Ser marinero",correct:false},{text:"Ser firme",correct:false},{text:"Analizar todo",correct:false}], explanation: "Error cognitivo." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Mayéutica socrática:", options: [{text:"Preguntar para llegar a la verdad",correct:true},{text:"Dar discursos largos",correct:false},{text:"Escribir libros",correct:false},{text:"Pelear",correct:false}], explanation: "Diálogo filosófico." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Consenso:", options: [{text:"Acuerdo general aceptado por todos",correct:true},{text:"Votación 50+1",correct:false},{text:"Imposición",correct:false},{text:"Empate",correct:false}], explanation: "Acuerdo total." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Disonancia cognitiva:", options: [{text:"Tensión por tener ideas contradictorias",correct:true},{text:"Música fea",correct:false},{text:"Ser tonto",correct:false},{text:"Tener razón",correct:false}], explanation: "Conflicto mental." }
    ]
  },

  // Bundle 8: Ética de la Comunicación
  {
    meta: {
      id: "CO-LEC-11-etica-comunicacion-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "argumentacion",
      periodo: 2,
      dba_id: "DBA-LEC-11-1",
      title: "Ética en la Comunicación"
    },
    base: { question: "La verdad es un valor ético.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Difamar es:", options: [{text:"Dañar la reputación con mentiras",correct:true},{text:"Famar a alguien",correct:false},{text:"Hacer famoso",correct:false},{text:"Ayudar",correct:false}], explanation: "Delito contra honor." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Derecho de autor:", options: [{text:"Proteger obras intelectuales",correct:true},{text:"Proteger carros",correct:false},{text:"Cobrar impuestos",correct:false},{text:"Prohibir leer",correct:false}], explanation: "Copyright." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Ciberacoso (Cyberbullying):", options: [{text:"Intimidación por medios digitales",correct:true},{text:"Jugar en línea",correct:false},{text:"Hacer amigos",correct:false},{text:"Programar",correct:false}], explanation: "Violencia digital." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Privacidad en redes:", options: [{text:"Controlar quién ve mi info",correct:true},{text:"Publicar todo",correct:false},{text:"No tener redes",correct:false},{text:"Vender datos",correct:false}], explanation: "Seguridad digital." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Libertad de prensa:", options: [{text:"Medios pueden informar sin censura",correct:true},{text:"Medios gratis",correct:false},{text:"Prensa de ropa",correct:false},{text:"Solo internet",correct:false}], explanation: "Pilar democracia." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Discurso de odio:", options: [{text:"Ataca a grupos por raza, religión, etc.",correct:true},{text:"Crítica política válida",correct:false},{text:"No me gusta algo",correct:false},{text:"Pelea de parejas",correct:false}], explanation: "Límite libertad expresión." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Anonimato en redes:", options: [{text:"Puede usarse para protegerse o para atacar impunemente",correct:true},{text:"Es ilegal",correct:false},{text:"Siempre es bueno",correct:false},{text:"Siempre es malo",correct:false}], explanation: "Doble filo." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Huella digital:", options: [{text:"Rastro de actividad en internet",correct:true},{text:"Dedo en pantalla",correct:false},{text:"Suciedad",correct:false},{text:"Clave",correct:false}], explanation: "Datos persistentes." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Astroturfing:", options: [{text:"Falsos movimientos de base pagados",correct:true},{text:"Jardinería",correct:false},{text:"Turismo espacial",correct:false},{text:"Deporte",correct:false}], explanation: "Simular apoyo popular." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Deepfake:", options: [{text:"Video falso hiperrealista con IA",correct:true},{text:"Mentira profunda",correct:false},{text:"Buceo",correct:false},{text:"Maquillaje",correct:false}], explanation: "Manipulación video." }
    ]
  },

  // Bundle 9: Conectores Lógicos Argumentativos
  {
    meta: {
      id: "CO-LEC-11-conectores-argumentativos-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "argumentacion",
      periodo: 2,
      dba_id: "DBA-LEC-11-3",
      title: "Conectores Lógicos en la Argumentación"
    },
    base: { question: "Los conectores unen ideas lógicamente.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Conector causal:", options: [{text:"Porque, ya que, debido a",correct:true},{text:"Pero, aunque",correct:false},{text:"Y, e, ni",correct:false},{text:"O, u",correct:false}], explanation: "Indica razón." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Conector de conclusión:", options: [{text:"En conclusión, por tanto",correct:true},{text:"Además",correct:false},{text:"Sin embargo",correct:false},{text:"Primero",correct:false}], explanation: "Cierre lógico." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Uso de 'No obstante':", options: [{text:"Oposición formal (pero)",correct:true},{text:"Afirmación",correct:false},{text:"Negación doble",correct:false},{text:"Duda",correct:false}], explanation: "Contraste." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Uso de 'Es decir':", options: [{text:"Explicar o aclarar",correct:true},{text:"Contradecir",correct:false},{text:"Terminar",correct:false},{text:"Agregar",correct:false}], explanation: "Reformulación." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Conector 'Aun así':", options: [{text:"Concesivo (a pesar de)",correct:true},{text:"Tiempo",correct:false},{text:"Lugar",correct:false},{text:"Adición",correct:false}], explanation: "Oposición parcial." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Marcador 'En primer lugar':", options: [{text:"Ordenador textual",correct:true},{text:"Ganador carrera",correct:false},{text:"Importancia",correct:false},{text:"Nada",correct:false}], explanation: "Estructura." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Diferencia 'Por qué' vs 'Porqué':", options: [{text:"Pregunta vs Sustantivo (razón)",correct:true},{text:"Iguales",correct:false},{text:"Sustantivo vs Pregunta",correct:false},{text:"Verbos",correct:false}], explanation: "El porqué de las cosas." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Conector 'Premisa de lo anterior':", options: [{text:"Incorrecto (mejor 'Derivado de')",correct:true},{text:"Correcto",correct:false},{text:"Muy usado",correct:false},{text:"Elegante",correct:false}], explanation: "Coherencia." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Polisíndeton:", options: [{text:"Repetición excesiva de conjunciones (y... y... y)",correct:true},{text:"Falta de conectores",correct:false},{text:"Muchas sílabas",correct:false},{text:"Policía",correct:false}], explanation: "Figura retórica énfasis." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Asíndeton:", options: [{text:"Ausencia de conjunciones (omisión)",correct:true},{text:"Muchos nexos",correct:false},{text:"Sin acentos",correct:false},{text:"Sin ideas",correct:false}], explanation: "Rapidez (Veni, vidi, vici)." }
    ]
  },

  // Bundle 10: Taller de Escritura Argumentativa
  {
    meta: {
      id: "CO-LEC-11-escritura-argumentativa-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "argumentacion",
      periodo: 2,
      dba_id: "DBA-LEC-11-3",
      title: "Producción de Textos Argumentativos"
    },
    base: { question: "Escribir requiere planear.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Primer paso para escribir un ensayo:", options: [{text:"Elegir tema y tesis",correct:true},{text:"Escribir el final",correct:false},{text:"Imprimir",correct:false},{text:"Poner título",correct:false}], explanation: "Planeación." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Lluvia de ideas:", options: [{text:"Generar muchas ideas sin juzgar",correct:true},{text:"Mojarse",correct:false},{text:"Borrar todo",correct:false},{text:"Copiar",correct:false}], explanation: "Brainstorming." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Borrador:", options: [{text:"Primera versión del texto",correct:true},{text:"Goma de borrar",correct:false},{text:"Versión final",correct:false},{text:"Basura",correct:false}], explanation: "Draft." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Revisión del texto:", options: [{text:"Corregir errores y mejorar estilo",correct:true},{text:"Solo leer",correct:false},{text:"Entregar sin mirar",correct:false},{text:"Botar",correct:false}], explanation: "Edición." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Párrafo de introducción debe tener:", options: [{text:"Gancho y Tesis",correct:true},{text:"Conclusión",correct:false},{text:"Bibliografía",correct:false},{text:"Firma",correct:false}], explanation: "Estructura párrafo." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Cada párrafo de desarrollo debe tener:", options: [{text:"Una idea principal (argumento)",correct:true},{text:"Muchas ideas mezcladas",correct:false},{text:"Solo chistes",correct:false},{text:"Nada",correct:false}], explanation: "Unidad temática." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Adecuación textual:", options: [{text:"Adaptar texto al destinatario y situación",correct:true},{text:"Escribir bonito",correct:false},{text:"Usar tildes",correct:false},{text:"Ser largo",correct:false}], explanation: "Propiedad sociolingüística." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Cita parafraseada:", options: [{text:"Idea del autor con mis palabras (referenciada)",correct:true},{text:"Copia exacta",correct:false},{text:"Invento mío",correct:false},{text:"Plagio",correct:false}], explanation: "Integración fuentes." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Estilo nominal:", options: [{text:"Preferir sustantivos a verbos (académico)",correct:true},{text:"Usar muchos verbos",correct:false},{text:"Usar nombres propios",correct:false},{text:"Ser simple",correct:false}], explanation: "Densidad léxica." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Voz pasiva se usa para:", options: [{text:"Resaltar la acción o el objeto, no el sujeto",correct:true},{text:"Ser perezoso",correct:false},{text:"Hablar bajo",correct:false},{text:"Ocultar todo",correct:false}], explanation: "El informe fue escrito por..." }
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
search_query: "preguntas lectura critica grado ${meta.grade} ${meta.periodo} ${meta.topic}"
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

**Competencia evaluada:** Lectura Crítica (DBA: ${meta.dba_id})

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
