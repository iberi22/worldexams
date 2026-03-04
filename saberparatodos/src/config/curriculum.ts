
export interface PeriodTheme {
  id: number;
  name: string;
  topics: string[];
}

export interface GradeCurriculum {
  [subject: string]: {
    periods: PeriodTheme[];
  };
}

export interface CountryCurriculum {
  [grade: number]: GradeCurriculum;
}

export function normalizeTopic(topic: string): string {
  if (!topic) return "";
  return topic.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "").trim();
}

// --- GRADE 3 ---
// --- GRADE 3 ---
const G3_MATH = [
    { id: 1, name: "Periodo 1: Números y Operaciones", topics: ["sumas", "restas", "numeros hasta 1000", "dinero", "conteo"] },
    { id: 2, name: "Periodo 2: Patrones y Multiplicación", topics: ["tablas de multiplicar", "patrones", "secuencias", "doble", "triple"] },
    { id: 3, name: "Periodo 3: Geometría y Medición", topics: ["tiempo", "medidas", "longitud", "figuras", "cuerpos geometricos"] },
    { id: 4, name: "Periodo 4: Resolución de Problemas", topics: ["resolucion de problemas", "datos", "graficas", "azar"] }
];
const G3_SCI = [
    { id: 1, name: "Periodo 1: Los Seres Vivos", topics: ["seres vivos", "animales", "plantas", "necesidades"] },
    { id: 2, name: "Periodo 2: Cuerpo Humano", topics: ["cuerpo humano", "los sentidos", "sentidos", "cuidado"] },
    { id: 3, name: "Periodo 3: Entorno Físico", topics: ["el agua", "el aire", "el suelo", "materia", "estados"] },
    { id: 4, name: "Periodo 4: Tierra y Universo", topics: ["el clima", "dia y noche", "sol", "luna", "entorno fisico"] }
];
const G3_SOC = [
    { id: 1, name: "Periodo 1: Familia y Colegio", topics: ["la familia", "normas y reglas", "convivencia", "colegio"] },
    { id: 2, name: "Periodo 2: Mi Comunidad", topics: ["el barrio", "la comunidad", "oficios y profesiones", "servicios publicos"] },
    { id: 3, name: "Periodo 3: Paisaje y Geografía", topics: ["mapas", "orientacion", "paisaje", "relieve", "clima"] },
    { id: 4, name: "Periodo 4: Historia y Cultura", topics: ["tradiciones", "cultura", "fiestas", "historia", "simbolos"] }
];
const G3_ENG = [
    { id: 1, name: "Periodo 1: Saludos y Comandos", topics: ["saludos", "comandos", "presentacion", "verbo to be", "greetings", "commands"] },
    { id: 2, name: "Periodo 2: Familia y Escuela", topics: ["familia", "escuela", "numeros", "colores", "family", "school", "numbers", "colors"] },
    { id: 3, name: "Periodo 3: Animales y Cuerpo", topics: ["animales", "cuerpo", "ropa", "comida", "animals", "body", "clothes", "food"] },
    { id: 4, name: "Periodo 4: Tiempo y Clima", topics: ["dias", "meses", "clima", "hora", "days", "months", "weather", "time"] }
];

// --- GRADE 5 ---
const G5_MATH = [
    { id: 1, name: "Periodo 1: Números Naturales y Decimales", topics: ["numeros decimales", "operaciones", "multiplicacion", "division"] },
    { id: 2, name: "Periodo 2: Fracciones", topics: ["fracciones basicas", "operaciones con fracciones", "mixtos", "equivalentes"] },
    { id: 3, name: "Periodo 3: Geometría y Medición", topics: ["figuras geometricas", "poligonos", "perimetro", "area", "volumen", "capacidad"] },
    { id: 4, name: "Periodo 4: Estadística y Probabilidad", topics: ["estadistica", "moda", "media", "mediana", "probabilidad basica", "graficos"] }
];
const G5_SCI = [
    { id: 1, name: "Periodo 1: Célula y Sistemas", topics: ["la celula", "sistema digestivo", "sistemas respiratorio", "circulatorio", "organizacion interna"] },
    { id: 2, name: "Periodo 2: Ecosistemas", topics: ["ecosistemas", "cadenas alimentarias", "relaciones", "ecosistemas colombianos", "adaptaciones"] },
    { id: 3, name: "Periodo 3: La Materia", topics: ["propiedades de la materia", "mezclas y soluciones", "cambios de estado", "atomo"] },
    { id: 4, name: "Periodo 4: Energía y Fuerzas", topics: ["electricidad", "magnetismo", "circuitos", "energia", "movimiento"] }
];

// --- GRADE 7 ---
const G7_MATH = [
    { id: 1, name: "Periodo 1: Números Enteros y Racionales", topics: ["numeros enteros", "numeros racionales", "operaciones con fracciones", "potenciacion"] },
    { id: 2, name: "Periodo 2: Proporcionalidad", topics: ["proporciones", "porcentajes", "regla de tres", "magnitudes"] },
    { id: 3, name: "Periodo 3: Álgebra Básica", topics: ["ecuaciones lineales", "variable", "expresiones", "polinomios"] },
    { id: 4, name: "Periodo 4: Geometría y Estadística", topics: ["transformaciones geometricas", "planos", "estadistica", "probabilidad"] }
];
const G7_SCI = [
    { id: 1, name: "Periodo 1: Célula y Microorganismos", topics: ["la celula", "organelos", "estructura celular", "funcion celular", "microscopio"] },
    { id: 2, name: "Periodo 2: Sistemas del Cuerpo", topics: ["cuerpo humano", "sistema oseo", "muscular", "excretor", "tejidos"] },
    { id: 3, name: "Periodo 3: Materia y Energía", topics: ["propiedades de la materia", "tabla periodica basica", "atomos", "elementos"] },
    { id: 4, name: "Periodo 4: Ecología", topics: ["ecosistemas", "relaciones", "ciclos", "medio ambiente"] }
];

// --- GRADE 9 ---
const G9_MATH = [
    { id: 1, name: "Periodo 1: Sistemas de Ecuaciones", topics: ["ecuaciones lineales", "sistema de ecuaciones", "metodos de solucion", "algebra"] },
    { id: 2, name: "Periodo 2: Funciones", topics: ["funciones lineales", "funciones cuadraticas", "exponenciales", "graficas"] },
    { id: 3, name: "Periodo 3: Geometría Avanzada", topics: ["geometria del espacio", "volumen", "pitagoras", "semejanza", "teorema", "figuras planas"] },
    { id: 4, name: "Periodo 4: Estadística Inferencial", topics: ["estadistica", "medidas de tendencia central", "medidas de dispersion", "probabilidad"] }
];
const G9_SCI = [
    { id: 1, name: "Periodo 1: Genética y Evolución", topics: ["genetica", "herencia", "adn", "leyes de mendel", "evolucion", "origen de la vida", "taxonomia"] },
    { id: 2, name: "Periodo 2: Sistemas Biológicos", topics: ["sistema nervioso", "endocrino", "sentidos", "inmune"] },
    { id: 3, name: "Periodo 3: Química Inorgánica", topics: ["tabla periodica", "enlaces", "ph", "acidez", "reacciones", "soluciones"] },
    { id: 4, name: "Periodo 4: Física y Ecología", topics: ["movimiento", "fuerzas", "ondas", "ecosistemas", "ciclos biogeoquimicos"] }
];
const G9_SOC = [
    { id: 1, name: "Periodo 1: Historia Universal Siglo XX", topics: ["primera guerra mundial", "segunda guerra mundial", "revolucion rusa", "guerra fria", "periodo de entreguerras"] },
    { id: 2, name: "Periodo 2: Geopolítica y Economía", topics: ["geografia politica", "imperialismo", "colonialismo", "globalizacion", "economia", "sectores economicos"] },
    { id: 3, name: "Periodo 3: Colombia Contemporánea", topics: ["colombia siglo xx", "violencia", "conflicto armado", "dictaduras", "demografia"] },
    { id: 4, name: "Periodo 4: Ciudadanía y DDHH", topics: ["derechos humanos", "participacion ciudadana", "medio ambiente", "organismos internacionales"] }
];
const G9_ENG = [
    { id: 1, name: "Periodo 1: Personal Life & Routines (ICFES P1 & P2)", topics: ["present simple", "past simple review", "adverbs of frequency", "vocabulary: routines, places", "pragmatic matching", "lexical knowledge"] },
    { id: 2, name: "Periodo 2: Future Plans & Ambitions (ICFES P3)", topics: ["future with will", "future with going to", "vocabulary: professions, dreams", "short conversations", "communicative intent"] },
    { id: 3, name: "Periodo 3: Environment & Society (ICFES P4 & P5)", topics: ["prepositional phrases", "adverbial phrases of place and time", "vocabulary: environment, society", "literal reading comprehension", "grammatical cloze"] },
    { id: 4, name: "Periodo 4: History & Culture (ICFES P6 & P7)", topics: ["past continuous", "comparatives and superlatives", "vocabulary: ancient history, landmarks", "inferential reading", "lexico-grammatical texts"] }
];

// --- GRADE 11 ---
const G11_MATH = [
    { id: 1, name: "Periodo 1: Fundamentos y Funciones", topics: ["inecuaciones", "funciones", "limites", "continuidad", "numerosreales", "logaritmos", "exponenciales", "algebrabasica"] },
    { id: 2, name: "Periodo 2: Cálculo Diferencial", topics: ["derivadas", "reglasdederivacion", "aplicacionesdeladerivada", "maximosyminimos", "tangentes", "variacional"] },
    { id: 3, name: "Periodo 3: Cálculo Integral y Geometría", topics: ["integrales", "areabajo", "solidos", "geometria", "seccionesconicas", "volumen", "transformaciones"] },
    { id: 4, name: "Periodo 4: Probabilidad y Preparación Saber 11", topics: ["estadistica", "probabilidad", "conteo", "preicfes", "azar", "combinatoria", "patrones"] }
];
const G11_SCI = [
    { id: 1, name: "Periodo 1: Química Orgánica y Mecánica", topics: ["hidrocarburos", "cinematica", "dinamica", "carbono", "fuerzas", "movimiento", "mecanica", "leyes de newton"] },
    { id: 2, name: "Periodo 2: Biomoléculas y Energía", topics: ["alcoholes", "proteinas", "energia", "trabajo", "potencia", "carbohidratos", "enlaces"] },
    { id: 3, name: "Periodo 3: Bioquímica y Termodinámica", topics: ["metabolismo", "termodinamica", "calor", "gases", "enzimas", "quimica", "estequiometria"] },
    { id: 4, name: "Periodo 4: Física Moderna y Ecología", topics: ["fisica moderna", "ondas", "electricidad", "magnetismo", "ecosistemas", "cambio climatico", "celula", "evolucion", "genetica"] }
];
const G11_HUM = [
    { id: 1, name: "Periodo 1: Literatura y Narrativa", topics: ["argumentativo", "narrativo", "informativo", "literatura", "cuento", "novela", "boom", "vanguardias"] },
    { id: 2, name: "Periodo 2: Tipología Textual", topics: ["infografia", "comic", "tabla", "publicidad", "caricatura", "medios", "texto", "tipologia", "expositivo"] },
    { id: 3, name: "Periodo 3: Filosofía y Lenguaje", topics: ["filosofia", "ensayo", "critica", "intertextualidad", "epistemologia", "semantica", "ortografia", "gramatica"] },
    { id: 4, name: "Periodo 4: Preparación Saber 11", topics: ["simulacro", "prueba", "comprension", "icfes", "tipologia"] }
];
const G11_SOC = [
    { id: 1, name: "Periodo 1: Historia y Conflicto", topics: ["historia", "conflicto", "violencia", "guerra", "paz", "revolucion", "bananeras", "frente nacional"] },
    { id: 2, name: "Periodo 2: Geografía y Economía", topics: ["geografia", "economia", "globalizacion", "desarrollo", "poblacion", "demografia", "apertura economica"] },
    { id: 3, name: "Periodo 3: Constitución y Ciudadanía", topics: ["constitucion", "derechos", "deberes", "participacion", "democracia", "mecanismos", "tutela"] },
    { id: 4, name: "Periodo 4: Problemáticas Contemporáneas", topics: ["ambiente", "genero", "discriminacion", "cultura", "actualidad", "diversidad"] }
];
const G11_ENG = [
    { id: 1, name: "Periodo 1: Advanced Lexical & Pragmatic (ICFES P1, P2 & P3)", topics: ["phrasal verbs", "collocations", "idioms", "advanced pragmatic matching", "complex conversations", "register and tone"] },
    { id: 2, name: "Periodo 2: Complex Grammar (ICFES P4 & P7)", topics: ["passive voice", "reported speech", "conditionals (1,2,3,mixed)", "relative clauses", "advanced grammatical cloze"] },
    { id: 3, name: "Periodo 3: Academic Reading (ICFES P5 & P6)", topics: ["argumentative texts", "scientific texts", "literal comprehension", "inferring meaning from context", "identifying author's purpose"] },
    { id: 4, name: "Periodo 4: Full Saber 11 Integración", topics: ["saber 11 mock test", "time management", "parts 1 to 7 integration", "test-taking strategies"] }
];

const G10_ENG = [
    { id: 1, name: "Periodo 1: Experiences & Achievements (ICFES P1-P3)", topics: ["present perfect", "past perfect", "vocabulary: travel, achievements", "lexical matching", "pragmatic signs"] },
    { id: 2, name: "Periodo 2: Hypothetical Situations (ICFES P4)", topics: ["first and second conditional", "modal verbs of probability", "vocabulary: global issues", "grammatical cloze"] },
    { id: 3, name: "Periodo 3: Opinions & Debates (ICFES P5-P6)", topics: ["connectors of contrast and addition", "expressing opinion", "reading comprehension literal", "reading comprehension inferential"] },
    { id: 4, name: "Periodo 4: Media & Technology (ICFES P7)", topics: ["passive voice (present/past)", "vocabulary: technology, media", "lexico-grammatical paragraphs", "identifying main ideas"] }
];

// --- MAPPING ---
// Map similar subjects using same arrays
function makeMap(math: any, sci: any, soc: any, lang: any, eng: any, tech: any) {
    const map: any = {};
    if (math) map.matematicas = { periods: math };
    if (sci) {
        map.cienciasnaturales = { periods: sci };
        map["ciencias-naturales"] = { periods: sci };
        map.cienciasnaturalesyeducacionambiental = { periods: sci };
        // Physics/Chem aliases for 10/11
        map.fisica = { periods: sci };
        map.quimica = { periods: sci };
        map.cienciasnaturalesfisica = { periods: sci };
        map.cienciasnaturalesquimica = { periods: sci };
    }
    if (soc) {
        map.sociales = { periods: soc };
        map.socialesciudadanas = { periods: soc };
        map["sociales-ciudadanas"] = { periods: soc };
        map.socialesyciudadanas = { periods: soc };
    }
    if (lang) {
        map.lecturacritica = { periods: lang };
        map["lectura-critica"] = { periods: lang };
        map.lenguaje = { periods: lang };
        map.lenguacastellana = { periods: lang };
    }
    if (eng) {
        map.ingles = { periods: eng };
        map.english = { periods: eng };
    }
    if (tech) {
         // Generic Tech if needed
         map.tecnologia = { periods: tech };
    }
    return map;
}

export const CURRICULUM_CO: CountryCurriculum = {
    3: makeMap(G3_MATH, G3_SCI, G3_SOC, [{id:1,name:"P1",topics:["comprension"]},{id:2,name:"P2",topics:["gramatica"]},{id:3,name:"P3",topics:["cuento"]},{id:4,name:"P4",topics:["vocabulario"]}], G3_ENG, null),
    5: makeMap(G5_MATH, G5_SCI, [{id:1,name:"P1",topics:["estado"]},{id:2,name:"P2",topics:["democracia"]},{id:3,name:"P3",topics:["colombia"]},{id:4,name:"P4",topics:["ciudadania"]}], [{id:1,name:"P1",topics:["narrativo"]},{id:2,name:"P2",topics:["gramatica"]},{id:3,name:"P3",topics:["ortografia"]},{id:4,name:"P4",topics:["comprension"]}], null, null),
    7: makeMap(G7_MATH, G7_SCI, null, [{id:1,name:"P1",topics:["narrativo"]},{id:2,name:"P2",topics:["argumentativo"]},{id:3,name:"P3",topics:["ortografia"]},{id:4,name:"P4",topics:["comprension"]}], null, null),
    9: makeMap(G9_MATH, G9_SCI, G9_SOC, [{id:1,name:"P1",topics:["argumentacion"]},{id:2,name:"P2",topics:["opinion"]},{id:3,name:"P3",topics:["literatura"]},{id:4,name:"P4",topics:["critica"]}], G9_ENG, null),
    10: makeMap(
        [{id:1,name:"P1: Trigonometría",topics:["trigonometria","seno","coseno"]},{id:2,name:"P2: Funciones",topics:["funciones","conicas"]},{id:3,name:"P3: Introducción Cálculo",topics:["limites"]},{id:4,name:"P4: Estadística",topics:["estadistica"]}],
        [{id:1,name:"P1: Física Mécánica",topics:["fisica","cinematica","dinamica","newton"]},{id:2,name:"P2: Química Inorgánica",topics:["quimica","reacciones","balanceo","nomenclatura"]},{id:3,name:"P3: Biología/Ecología",topics:["ecosistemas","metabolismo"]},{id:4,name:"P4: Investigación",topics:["proyecto"]}],
        [{id:1,name:"P1: Política",topics:["poder","gobierno"]},{id:2,name:"P2: Economía",topics:["economia","desarrollo"]},{id:3,name:"P3: Conflicto",topics:["conflicto armado","ddhh"]},{id:4,name:"P4: Globalización",topics:["internacional","geopolitica"]}],
        G11_HUM, // Reuse grade 11 Reading for 10
        G10_ENG, null
    ),
    11: makeMap(G11_MATH, G11_SCI, G11_SOC, G11_HUM, G11_ENG, null)
};
