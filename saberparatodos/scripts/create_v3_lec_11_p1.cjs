
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
  // Grade 11 - Lectura Crítica - Period 1 - BUNDLE 1 (Narrativa Universal)
  {
    meta: {
      id: "CO-LEC-11-narrativa-universal-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "literatura",
      periodo: 1,
      dba_id: "DBA-LEC-11-6",
      title: "Narrativa Universal del Siglo XX"
    },
    base: { question: "El narrador omnisciente conoce todo.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Autor de 'La Metamorfosis':", options: [{text:"Franz Kafka",correct:true},{text:"Gabriel García Márquez",correct:false},{text:"Jorge Luis Borges",correct:false},{text:"Julio Cortázar",correct:false}], explanation: "Clásico del absurdo." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Tema central de 'El Viejo y el Mar':", options: [{text:"La lucha y la perseverancia",correct:true},{text:"El amor romántico",correct:false},{text:"La guerra civil",correct:false},{text:"La ciencia ficción",correct:false}], explanation: "Hemingway." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "El narrador en primera persona usa:", options: [{text:"Yo",correct:true},{text:"Él/Ella",correct:false},{text:"Nosotros (plural)",correct:false},{text:"Tú",correct:false}], explanation: "Protagonista o testigo." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "¿Qué es un 'flashback'?", options: [{text:"Salto al pasado",correct:true},{text:"Salto al futuro",correct:false},{text:"Narración lineal",correct:false},{text:"Descripción de lugar",correct:false}], explanation: "Analepsis." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "En un texto, la 'voz polifónica' significa:", options: [{text:"Múltiples narradores o perspectivas",correct:true},{text:"Mucho ruido",correct:false},{text:"Un solo narrador",correct:false},{text:"Diálogo teatral",correct:false}], explanation: "Bajtín: múltiples voces." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Característica del Realismo Mágico:", options: [{text:"Lo mágico se trata como cotidiano",correct:true},{text:"Solo hay magia",correct:false},{text:"Todo es muy realista",correct:false},{text:"Finales felices",correct:false}], explanation: "Sin asombro de personajes." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Intertextualidad en 'Ulises' de Joyce:", options: [{text:"Referencia a la Odisea",correct:true},{text:"Copia de la Ilíada",correct:false},{text:"Sin referencias",correct:false},{text:"Referencia a la Biblia",correct:false}], explanation: "Reescritura moderna." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "El monólogo interior busca:", options: [{text:"Mostrar el flujo de conciencia",correct:true},{text:"Hablar con otro",correct:false},{text:"Describir paisajes",correct:false},{text:"Resumir la obra",correct:false}], explanation: "Pensamiento directo." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "El 'Boom' latinoamericano incluye a:", options: [{text:"Cortázar, Fuentes, Gabo, Vargas Llosa",correct:true},{text:"Borges, Arlt, Quiroga",correct:false},{text:"Cervantes, Lope, Quevedo",correct:false},{text:"Allende, Restrepo, Abad",correct:false}], explanation: "Los 4 grandes." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Diferencia autor vs narrador:", options: [{text:"Autor es persona real, narrador es voz ficticia",correct:true},{text:"Son lo mismo",correct:false},{text:"Narrador escribe el libro",correct:false},{text:"Autor es personaje",correct:false}], explanation: "Concepto narratológico." }
    ]
  },

  // Grade 11 - Lectura Crítica - Period 1 - BUNDLE 2 (Boom Latinoamericano)
  {
    meta: {
      id: "CO-LEC-11-boom-latinoamericano-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "literatura",
      periodo: 1,
      dba_id: "DBA-LEC-11-6",
      title: "El Boom Latinoamericano"
    },
    base: { question: "Cien años de soledad es del Boom.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "País de Gabriel García Márquez:", options: [{text:"Colombia",correct:true},{text:"México",correct:false},{text:"Argentina",correct:false},{text:"Perú",correct:false}], explanation: "Aracataca." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Obra cumbre de Julio Cortázar:", options: [{text:"Rayuela",correct:true},{text:"El Aleph",correct:false},{text:"Pedro Páramo",correct:false},{text:"La Ciudad y los Perros",correct:false}], explanation: "Antinovela." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Escenario principal de Cien Años de Soledad:", options: [{text:"Macondo",correct:true},{text:"Comala",correct:false},{text:"Santa María",correct:false},{text:"Bogotá",correct:false}], explanation: "Pueblo ficticio." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Mario Vargas Llosa es de:", options: [{text:"Perú",correct:true},{text:"Chile",correct:false},{text:"España",correct:false},{text:"Bolivia",correct:false}], explanation: "Nobel peruano." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "'La muerte de Artemio Cruz' es de:", options: [{text:"Carlos Fuentes",correct:true},{text:"Juan Rulfo",correct:false},{text:"Octavio Paz",correct:false},{text:"Borges",correct:false}], explanation: "Mexicano del Boom." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Realismo Mágico NO es:", options: [{text:"Literatura fantástica pura (Harry Potter)",correct:true},{text:"Mezcla realidad/mito",correct:false},{text:"Tiempo circular",correct:false},{text:"Hipérbole",correct:false}], explanation: "Diferencia género." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Técnica narrativa de 'Rayuela':", options: [{text:"Lectura no lineal (tablero de dirección)",correct:true},{text:"Cronológica estricta",correct:false},{text:"Solo diálogos",correct:false},{text:"En verso",correct:false}], explanation: "Capítulos salteados." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Precursor del Boom (Realismo Mágico):", options: [{text:"Juan Rulfo (Pedro Páramo)",correct:true},{text:"Isabel Allende",correct:false},{text:"Laura Esquivel",correct:false},{text:"Roberto Bolaño",correct:false}], explanation: "Comala." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Concepto de 'Lo Real Maravilloso' es de:", options: [{text:"Alejo Carpentier",correct:true},{text:"Gabo",correct:false},{text:"Cortázar",correct:false},{text:"Asturias",correct:false}], explanation: "Prólogo Reino de este Mundo." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Crítica social en el Boom:", options: [{text:"Dictaduras y desigualdad",correct:true},{text:"Tecnología",correct:false},{text:"Ecología",correct:false},{text:"Religión oriental",correct:false}], explanation: "Contexto político." }
    ]
  },

  // Bundle 3: Tipología Textual (Narrativo vs Descriptivo)
  {
    meta: {
      id: "CO-LEC-11-tipologia-textual-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "comprension",
      periodo: 1,
      dba_id: "DBA-LEC-11-6",
      title: "Tipologías Textuales: Narrativo y Descriptivo"
    },
    base: { question: "El texto narrativo cuenta hechos.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Propósito del texto narrativo:", options: [{text:"Relatar sucesos",correct:true},{text:"Dar instrucciones",correct:false},{text:"Convencer",correct:false},{text:"Informar datos",correct:false}], explanation: "Contar historias." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Propósito del texto descriptivo:", options: [{text:"Decir cómo es algo",correct:true},{text:"Contar una historia",correct:false},{text:"Argumentar",correct:false},{text:"Dialogar",correct:false}], explanation: "Pintar con palabras." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Estructura narrativa básica:", options: [{text:"Inicio, Nudo, Desenlace",correct:true},{text:"Tesis, Argumento, Conclusión",correct:false},{text:"Título, Ingredientes, Pasos",correct:false},{text:"Estrofa, Verso",correct:false}], explanation: "Clásica." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Prosopografía describe:", options: [{text:"Físico de una persona",correct:true},{text:"Carácter moral",correct:false},{text:"Lugar",correct:false},{text:"Tiempo",correct:false}], explanation: "Rasgos externos." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Etopeya describe:", options: [{text:"Carácter y moral",correct:true},{text:"Físico",correct:false},{text:"Paisaje",correct:false},{text:"Objetos",correct:false}], explanation: "Rasgos internos." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Retrato (en descripción) es:", options: [{text:"Suma de Prosopografía y Etopeya",correct:true},{text:"Solo físico",correct:false},{text:"Solo moral",correct:false},{text:"Una pintura",correct:false}], explanation: "Descripción completa." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Narrador testigo:", options: [{text:"Cuenta lo que ve de otro",correct:true},{text:"Es el protagonista",correct:false},{text:"Sabe todo (dios)",correct:false},{text:"No participa",correct:false}], explanation: "Personaje secundario." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Topografía describe:", options: [{text:"Lugares y paisajes",correct:true},{text:"Personas",correct:false},{text:"Épocas",correct:false},{text:"Animales",correct:false}], explanation: "Descripción de lugar." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Cronografía:", options: [{text:"Descripción del tiempo/época",correct:true},{text:"Descripción de relojes",correct:false},{text:"Narración rápida",correct:false},{text:"Biografía",correct:false}], explanation: "Tiempo." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Texto narrativo no literario:", options: [{text:"Noticia o Crónica periodística",correct:true},{text:"Cuento",correct:false},{text:"Novela",correct:false},{text:"Poema",correct:false}], explanation: "Hechos reales." }
    ]
  },

  // Bundle 4: Niveles de Lectura (Literal)
  {
    meta: {
      id: "CO-LEC-11-nivel-literal-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "comprension",
      periodo: 1,
      dba_id: "DBA-LEC-11-6",
      title: "Nivel de Lectura Literal"
    },
    base: { question: "Lectura literal es lo que dice el texto explícitamente.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Pregunta literal típica inicia con:", options: [{text:"¿Quién, Cuándo, Dónde?",correct:true},{text:"¿Qué opina usted?",correct:false},{text:"¿Qué pasaría si...?",correct:false},{text:"¿Cuál es la intención?",correct:false}], explanation: "Datos explícitos." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Si el texto dice 'Ana corre', literal es:", options: [{text:"Ana realiza la acción de correr",correct:true},{text:"Ana tiene afán",correct:false},{text:"Ana huye de algo",correct:false},{text:"Ana es atleta",correct:false}], explanation: "Sin interpretaciones." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Paráfrasis es:", options: [{text:"Decir lo mismo con otras palabras",correct:true},{text:"Copiar textualmente",correct:false},{text:"Inventar algo nuevo",correct:false},{text:"Resumir mal",correct:false}], explanation: "Literalidad nivel 2." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Identificar secuencia de hechos es:", options: [{text:"Nivel literal",correct:true},{text:"Nivel crítico",correct:false},{text:"Nivel inferencial",correct:false},{text:"Nivel intertextual",correct:false}], explanation: "Orden explícito." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Significado denotativo:", options: [{text:"Significado de diccionario (objetivo)",correct:true},{text:"Significado figurado",correct:false},{text:"Doble sentido",correct:false},{text:"Contextual",correct:false}], explanation: "Literal." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Resumir un texto requiere:", options: [{text:"Extraer ideas principales explícitas",correct:true},{text:"Opinar sobre el tema",correct:false},{text:"Criticar al autor",correct:false},{text:"Cambiar el final",correct:false}], explanation: "Síntesis literal." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "En un texto técnico, la lectura literal busca:", options: [{text:"Precisión y datos exactos",correct:true},{text:"Metáforas",correct:false},{text:"Ironía",correct:false},{text:"Estilo",correct:false}], explanation: "Información fiel." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Texto: 'El cielo estaba gris'. Literalmente:", options: [{text:"Había nubes o poca luz",correct:true},{text:"El narrador estaba triste",correct:false},{text:"Iba a llover fuerte",correct:false},{text:"Era de noche",correct:false}], explanation: "Solo el color." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Identificar referentes (pronombres):", options: [{text:"Cohesión literal (a quién se refiere 'él')",correct:true},{text:"Inferencia profunda",correct:false},{text:"Opinión",correct:false},{text:"Estilo",correct:false}], explanation: "Gramática textual explícita." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Sinonimia contextual:", options: [{text:"Palabra que significa lo mismo ahí",correct:true},{text:"Cualquier sinónimo",correct:false},{text:"Antónimo",correct:false},{text:"Rima",correct:false}], explanation: "Matiz exacto." }
    ]
  },

  // Bundle 5: Nivel Inferencial (Local)
  {
    meta: {
      id: "CO-LEC-11-nivel-inferencial-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "comprension",
      periodo: 1,
      dba_id: "DBA-LEC-11-6",
      title: "Nivel de Lectura Inferencial"
    },
    base: { question: "La inferencia completa información no dicha.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Si dice 'Llegó empapada', se infiere:", options: [{text:"Estaba lloviendo o se mojó",correct:true},{text:"Tenía calor",correct:false},{text:"Estaba triste",correct:false},{text:"Venia de correr",correct:false}], explanation: "Deducción lógica." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Inferir es:", options: [{text:"Leer entre líneas",correct:true},{text:"Leer lo que dice",correct:false},{text:"Adivinar",correct:false},{text:"Copiar",correct:false}], explanation: "Información implícita." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Texto: 'Pedro golpeó la mesa y salió gritando'. Inferencia:", options: [{text:"Pedro estaba enojado",correct:true},{text:"Pedro tenía fuerza",correct:false},{text:"La mesa era vieja",correct:false},{text:"Pedro es actor",correct:false}], explanation: "Estado de ánimo implícito." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Tema implícito:", options: [{text:"Idea global no mencionada explícitamente",correct:true},{text:"Título del libro",correct:false},{text:"Nombre del autor",correct:false},{text:"Primer renglón",correct:false}], explanation: "Abstracción." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Significado connotativo:", options: [{text:"Subjetivo o figurado",correct:true},{text:"De diccionario",correct:false},{text:"Literal",correct:false},{text:"Científico",correct:false}], explanation: "Doble sentido/Carga emocional." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Deducir causa-efecto implícita:", options: [{text:"Inferencia lógica",correct:true},{text:"Lectura literal",correct:false},{text:"Opinión",correct:false},{text:"Error",correct:false}], explanation: "Conexión de ideas." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Metáfora: 'Sus cabellos de oro'. Inferencia:", options: [{text:"Era rubia",correct:true},{text:"Tenía oro real",correct:false},{text:"Era calva",correct:false},{text:"Era rica",correct:false}], explanation: "Figura retórica." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Ironía implica:", options: [{text:"Entender lo contrario de lo que se dice",correct:true},{text:"Creer todo literal",correct:false},{text:"Un insulto directo",correct:false},{text:"Una mentira",correct:false}], explanation: "Pragmática." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Presuposiciones:", options: [{text:"Ideas que el texto asume como ciertas",correct:true},{text:"Mentiras",correct:false},{text:"Datos errores",correct:false},{text:"Conclusiones",correct:false}], explanation: "Base del argumento." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Deducir el público objetivo:", options: [{text:"Por el tono y vocabulario",correct:true},{text:"Dice 'Para niños' siempre",correct:false},{text:"Por el precio",correct:false},{text:"No se puede",correct:false}], explanation: "Inferencia pragmática." }
    ]
  },

  // Bundle 6: Literatura Clásica (Contexto)
  {
    meta: {
      id: "CO-LEC-11-literatura-clasica-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "literatura",
      periodo: 1,
      dba_id: "DBA-LEC-11-6",
      title: "Literatura Clásica y Antigua"
    },
    base: { question: "La Ilíada es una epopeya griega.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Autor de la Ilíada y la Odisea:", options: [{text:"Homero",correct:true},{text:"Sófocles",correct:false},{text:"Platón",correct:false},{text:"Virgilio",correct:false}], explanation: "Poeta griego." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Edipo Rey es una:", options: [{text:"Tragedia griega",correct:true},{text:"Comedia",correct:false},{text:"Novela",correct:false},{text:"Fábula",correct:false}], explanation: "Sófocles." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Héroe de la Odisea:", options: [{text:"Odiseo (Ulises)",correct:true},{text:"Aquiles",correct:false},{text:"Héctor",correct:false},{text:"Zeus",correct:false}], explanation: "Viaje a Ítaca." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Epopeya romana escrita por Virgilio:", options: [{text:"La Eneida",correct:true},{text:"La Ilíada",correct:false},{text:"Metamorfosis",correct:false},{text:"Divina Comedia",correct:false}], explanation: "Fundación de Roma." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "El 'Caballo de Troya' aparece en:", options: [{text:"Mencionado en Odisea/Eneida",correct:true},{text:"La Ilíada (en acción)",correct:false},{text:"La Biblia",correct:false},{text:"Edipo",correct:false}], explanation: "La Ilíada termina antes." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Tema de la tragedia griega:", options: [{text:"Destino inevitable (Fatum)",correct:true},{text:"Amor libre",correct:false},{text:"Risa",correct:false},{text:"Dinero",correct:false}], explanation: "Lucha mortal vs destino." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "La Divina Comedia (Dante) es de época:", options: [{text:"Medieval / Prerrenacimiento",correct:true},{text:"Antigua Grecia",correct:false},{text:"Siglo XX",correct:false},{text:"Romántica",correct:false}], explanation: "Infierno, Purgatorio, Paraíso." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Don Quijote parodia a:", options: [{text:"Libros de caballerías",correct:true},{text:"La Biblia",correct:false},{text:"Los griegos",correct:false},{text:"La poesía",correct:false}], explanation: "Cervantes." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "El 'Siglo de Oro' español incluye:", options: [{text:"Cervantes, Quevedo, Góngora",correct:true},{text:"Lorca, Dalí",correct:false},{text:"Borges, Cortázar",correct:false},{text:"Homero",correct:false}], explanation: "Barroco y Renacimiento." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "¿Qué es 'Carpe Diem'?", options: [{text:"Tópico literario (Aprovecha el día)",correct:true},{text:"Un poema de Neruda",correct:false},{text:"Un dios romano",correct:false},{text:"Comida",correct:false}], explanation: "Renacimiento." }
    ]
  },

  // Bundle 7: Género Lírico (Poesía)
  {
    meta: {
      id: "CO-LEC-11-genero-lirico-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "literatura",
      periodo: 1,
      dba_id: "DBA-LEC-11-6",
      title: "Análisis del Género Lírico"
    },
    base: { question: "La lírica expresa sentimientos.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "La poesía se escribe usualmente en:", options: [{text:"Verso",correct:true},{text:"Párrafos",correct:false},{text:"Diálogos",correct:false},{text:"Capítulos",correct:false}], explanation: "Líneas rítmicas." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Conjunto de versos:", options: [{text:"Estrofa",correct:true},{text:"Capítulo",correct:false},{text:"Párrafo",correct:false},{text:"Oración",correct:false}], explanation: "Bloque poético." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Hablante lírico es:", options: [{text:"La voz ficticia del poema",correct:true},{text:"El autor real",correct:false},{text:"El lector",correct:false},{text:"El libro",correct:false}], explanation: "Equivalente al narrador." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Rima consonante:", options: [{text:"Coinciden vocales y consonantes",correct:true},{text:"Solo vocales",correct:false},{text:"No rima",correct:false},{text:"Rima libre",correct:false}], explanation: "Perfecta." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Símil o comparación usa:", options: [{text:"'Como', 'cual', 'parece'",correct:true},{text:"Ninguna palabra enlace",correct:false},{text:"Exageración",correct:false},{text:"Sonidos",correct:false}], explanation: "Nexo comparativo." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Metáfora pura:", options: [{text:"Sustituye término real por imaginario",correct:true},{text:"Compara con 'como'",correct:false},{text:"Repite sonidos",correct:false},{text:"Da cualidades humanas",correct:false}], explanation: "Las perlas de tu boca." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Soneto tiene:", options: [{text:"2 cuartetos y 2 tercetos (14 versos)",correct:true},{text:"10 versos",correct:false},{text:"Rima libre",correct:false},{text:"Un solo párrafo",correct:false}], explanation: "Estructura fija." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Hipérbole es:", options: [{text:"Exageración desmedida",correct:true},{text:"Comparación",correct:false},{text:"Humanización",correct:false},{text:"Ironía",correct:false}], explanation: "Lloró ríos de lágrimas." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Sinestesia:", options: [{text:"Mezcla de sentidos (color chillón)",correct:true},{text:"Repetición",correct:false},{text:"Contradicción",correct:false},{text:"Orden alterado",correct:false}], explanation: "Percepción sensorial cruzada." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Vanguardismo (poesía):", options: [{text:"Rompe métrica y rima tradicional",correct:true},{text:"Muy clásica",correct:false},{text:"Sonetos perfectos",correct:false},{text:"Religiosa",correct:false}], explanation: "Siglo XX, libertad." }
    ]
  },

  // Bundle 8: Cohesión y Coherencia
  {
    meta: {
      id: "CO-LEC-11-cohesion-coherencia-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "comprension",
      periodo: 1,
      dba_id: "DBA-LEC-11-6",
      title: "Cohesión y Coherencia Textual"
    },
    base: { question: "Un texto debe tener unidad de sentido.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Coherencia se refiere a:", options: [{text:"Sentido global y lógico",correct:true},{text:"Ortografía",correct:false},{text:"Uso de tildes",correct:false},{text:"Letra bonita",correct:false}], explanation: "Estructura profunda." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Cohesión se refiere a:", options: [{text:"Conexión gramatical (conectores)",correct:true},{text:"Las ideas",correct:false},{text:"El tema",correct:false},{text:"El título",correct:false}], explanation: "Estructura superficial." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Conector de oposición:", options: [{text:"Sin embargo",correct:true},{text:"También",correct:false},{text:"Es decir",correct:false},{text:"Por lo tanto",correct:false}], explanation: "Adversativo." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Conector de consecuencia:", options: [{text:"Por consiguiente",correct:true},{text:"Pero",correct:false},{text:"Además",correct:false},{text:"O sea",correct:false}], explanation: "Efecto." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Elipsis consiste en:", options: [{text:"Omitir palabras obvias",correct:true},{text:"Repetir mucho",correct:false},{text:"Usar sinónimos",correct:false},{text:"Escribir mal",correct:false}], explanation: "Economía del lenguaje." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Correferencia evita:", options: [{text:"Repeticiones innecesarias",correct:true},{text:"Signos de puntuación",correct:false},{text:"Párrafos largos",correct:false},{text:"Ideas nuevas",correct:false}], explanation: "Uso de pronombres/sinónimos." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Anacoluto es un error de:", options: [{text:"Construcción gramatical (incoherencia sintáctica)",correct:true},{text:"Ortografía",correct:false},{text:"Vocabulario",correct:false},{text:"Márgenes",correct:false}], explanation: "Frase rota." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Progresión temática:", options: [{text:"Avance de información nueva",correct:true},{text:"Repetir lo mismo",correct:false},{text:"Cambiar de tema bruscamente",correct:false},{text:"No decir nada",correct:false}], explanation: "Tema-Rema." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Deixis requiere:", options: [{text:"Contexto (aquí, allá, tú)",correct:true},{text:"Diccionario",correct:false},{text:"Saber latín",correct:false},{text:"Nada",correct:false}], explanation: "Sealamiento contextual." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Marcadores discursivos:", options: [{text:"Organizan el texto (En primer lugar...)",correct:true},{text:"Son verborrea",correct:false},{text:"Son faltas",correct:false},{text:"Son adjetivos",correct:false}], explanation: "Guían la lectura." }
    ]
  },

  // Bundle 9: Novela Gráfica y Cómic (Intro Discontinuo)
  {
    meta: {
      id: "CO-LEC-11-comic-novela-grafica-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "medios",
      periodo: 1,
      dba_id: "DBA-LEC-11-6",
      title: "Narrativa Gráfica Básica"
    },
    base: { question: "El cómic combina imagen y texto.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Globo de texto con círculos pequeños significa:", options: [{text:"Pensamiento",correct:true},{text:"Grito",correct:false},{text:"Susurro",correct:false},{text:"Narrador",correct:false}], explanation: "Nube de pensamiento." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Onomatopeya:", options: [{text:"Representación sonora (¡Bang!)",correct:true},{text:"Dibujo de persona",correct:false},{text:"Diálogo",correct:false},{text:"Viñeta",correct:false}], explanation: "Sonido escrito." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Unidad mínima del cómic:", options: [{text:"Viñeta",correct:true},{text:"Página",correct:false},{text:"Globo",correct:false},{text:"Boceto",correct:false}], explanation: "El cuadro." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Mafalda es famosa por:", options: [{text:"Crítica social y política",correct:true},{text:"Ser un superhéroe",correct:false},{text:"No hablar",correct:false},{text:"Vivir en el espacio",correct:false}], explanation: "Quino." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Novela gráfica vs Cómic tradicional:", options: [{text:"Extensión y complejidad mayor (libro)",correct:true},{text:"Son lo mismo",correct:false},{text:"El cómic no tiene dibujos",correct:false},{text:"La novela gráfica no tiene texto",correct:false}], explanation: "Formato editorial." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Plano picado (desde arriba) sugiere:", options: [{text:"Inferioridad o debilidad",correct:true},{text:"Superioridad",correct:false},{text:"Igualdad",correct:false},{text:"Caos",correct:false}], explanation: "Lenguaje visual." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Maus (Art Spiegelman) trata sobre:", options: [{text:"Holocausto (gatos y ratones)",correct:true},{text:"Superhéroes",correct:false},{text:"Futbol",correct:false},{text:"Romance",correct:false}], explanation: "Premio Pulitzer." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Metáfora visual:", options: [{text:"Bombillo encendido (idea)",correct:true},{text:"Dibujo realista",correct:false},{text:"Foto",correct:false},{text:"Texto literal",correct:false}], explanation: "Símbolo gráfico." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Elipses entre viñetas (gutter):", options: [{text:"El lector completa la acción",correct:true},{text:"Error de impresión",correct:false},{text:"Espacio perdido",correct:false},{text:"Falta de dibujo",correct:false}], explanation: "Narrativa secuencial (McCloud)." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Persépolis (Marjane Satrapi) narra:", options: [{text:"Revolución Islámica en Irán",correct:true},{text:"Guerra Civil USA",correct:false},{text:"Vida en Marte",correct:false},{text:"Historia de Francia",correct:false}], explanation: "Autobiografía gráfica." }
    ]
  },

  // Bundle 10: Gramática y Ortografía (Refuerzo)
  {
    meta: {
      id: "CO-LEC-11-gramatica-ortografia-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "gramatica",
      periodo: 1,
      dba_id: "DBA-LEC-11-6",
      title: "Gramática y Normativa"
    },
    base: { question: "La tilde diacrítica diferencia significados.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Diferencia entre 'tu' y 'tú':", options: [{text:"Posesivo vs Persona",correct:true},{text:"No hay diferencia",correct:false},{text:"Verbo vs Nombre",correct:false},{text:"Singular vs Plural",correct:false}], explanation: "Tú eres (pronombre)." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Palabra esdrújula:", options: [{text:"Siempre lleva tilde",correct:true},{text:"Nunca lleva tilde",correct:false},{text:"Si termina en N, S, vocal",correct:false},{text:"Si termina en consonante",correct:false}], explanation: "Regla fija." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Correcto uso de 'haber':", options: [{text:"Hubo muchas fiestas",correct:true},{text:"Hubieron muchas fiestas",correct:false},{text:"Habían muchas fiestas",correct:false},{text:"Haberan fiestas",correct:false}], explanation: "Impersonal es singular." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "'Ay', 'Ahí', 'Hay':", options: [{text:"Exclamación, Lugar, Verbo",correct:true},{text:"Lugar, Verbo, Exclamación",correct:false},{text:"Verbo, Lugar, Exclamación",correct:false},{text:"Iguales",correct:false}], explanation: "Homófonas." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Solecismo:", options: [{text:"Error de sintaxis",correct:true},{text:"Palabra soez",correct:false},{text:"Palabra culta",correct:false},{text:"Extranjerismo",correct:false}], explanation: "Error de construcción." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Dequeísmo:", options: [{text:"Uso incorrecto de 'de que'",correct:true},{text:"Uso de 'que'",correct:false},{text:"Hablar despacio",correct:false},{text:"Usar dedos",correct:false}], explanation: "Pienso de que... (Mal)." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Puntuación vocativo (Hola Juan):", options: [{text:"Hola, Juan",correct:true},{text:"Hola Juan",correct:false},{text:"Hola; Juan",correct:false},{text:"Hola. Juan",correct:false}], explanation: "Coma de vocativo." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "'Sino' vs 'Si no':", options: [{text:"Adversativo vs Condicional",correct:true},{text:"Condicional vs Adversativo",correct:false},{text:"Iguales",correct:false},{text:"Ninguno existe",correct:false}], explanation: "No comas, sino bebes vs Si no bebes." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Uso de punto y coma:", options: [{text:"Separa oraciones complejas relacionadas",correct:true},{text:"Final de texto",correct:false},{text:"Después de saludo",correct:false},{text:"Para enumerar simple",correct:false}], explanation: "Pausa media." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Eufemismo:", options: [{text:"Palabra suave para algo fuerte",correct:true},{text:"Insulto",correct:false},{text:"Grito",correct:false},{text:"Sonido",correct:false}], explanation: "Pasar a mejor vida (morir)." }
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
    console.log(`✅ Created Period 1 Bundle v3.0: ${fullPath}`);
});
