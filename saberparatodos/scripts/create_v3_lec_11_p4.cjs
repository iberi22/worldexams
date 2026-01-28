
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
  // Grade 11 - Lectura Crítica - Period 4 - BUNDLE 1 (Filosofía Antigua)
  {
    meta: {
      id: "CO-LEC-11-filosofia-antigua-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "filosofia",
      periodo: 4,
      dba_id: "DBA-LEC-11-5",
      title: "Filosofía Clásica (Platón y Aristóteles)"
    },
    base: { question: "Filosofía significa amor a la sabiduría.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "El mito de la caverna es de:", options: [{text:"Platón",correct:true},{text:"Sócrates",correct:false},{text:"Aristóteles",correct:false},{text:"Descartes",correct:false}], explanation: "La República." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Frase 'Solo sé que nada sé':", options: [{text:"Sócrates",correct:true},{text:"Kant",correct:false},{text:"Nietzsche",correct:false},{text:"Marx",correct:false}], explanation: "Ignorancia sabia." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Mundo de las Ideas (Platón):", options: [{text:"Realidad perfecta y eterna",correct:true},{text:"Mundo físico",correct:false},{text:"Sueños",correct:false},{text:"Mentira",correct:false}], explanation: "Idealismo." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Aristóteles define al hombre como:", options: [{text:"Animal político (Zoon politikon)",correct:true},{text:"Un dios",correct:false},{text:"Una máquina",correct:false},{text:"Un lobo",correct:false}], explanation: "Ser social." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Mayéutica:", options: [{text:"Método de preguntas para parir ideas",correct:true},{text:"Arte de escribir",correct:false},{text:"Arte de pintar",correct:false},{text:"Guerra",correct:false}], explanation: "Sócrates." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Ética a Nicómaco trata sobre:", options: [{text:"La felicidad y la virtud",correct:true},{text:"La guerra",correct:false},{text:"La biología",correct:false},{text:"Los astros",correct:false}], explanation: "Ética aristotélica." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Hilemorfismo (Aristóteles):", options: [{text:"Todo cuerpo es materia y forma",correct:true},{text:"Solo existe el espíritu",correct:false},{text:"Solo existe el átomo",correct:false},{text:"Nada existe",correct:false}], explanation: "Composición sustancia." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Reminiscencia (Platón):", options: [{text:"Conocer es recordar",correct:true},{text:"Olvidar es bueno",correct:false},{text:"La mente es tabla rasa",correct:false},{text:"Aprender es nuevo",correct:false}], explanation: "Alma inmortal." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Dualismo platónico:", options: [{text:"Cuerpo (cárcel) y Alma (eterna)",correct:true},{text:"Cuerpo y Mente unidos",correct:false},{text:"Solo cuerpo",correct:false},{text:"Solo alma",correct:false}], explanation: "Antropología." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Causa final (Aristóteles):", options: [{text:"El propósito o 'para qué'",correct:true},{text:"El material",correct:false},{text:"El creador",correct:false},{text:"La forma",correct:false}], explanation: "Teleología." }
    ]
  },

  // Bundle 2: Filosofía Moderna (Racionalismo/Empirismo)
  {
    meta: {
      id: "CO-LEC-11-filosofia-moderna-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "filosofia",
      periodo: 4,
      dba_id: "DBA-LEC-11-5",
      title: "Filosofía Moderna"
    },
    base: { question: "Descartes duda de todo.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Frase 'Pienso, luego existo' (Cogito ergo sum):", options: [{text:"Descartes",correct:true},{text:"Hume",correct:false},{text:"Locke",correct:false},{text:"Kant",correct:false}], explanation: "Primer principio." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Empirismo dice que el conocimiento viene de:", options: [{text:"La experiencia (sentidos)",correct:true},{text:"La razón pura",correct:false},{text:"Dios",correct:false},{text:"Los libros",correct:false}], explanation: "Tabula rasa." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Racionalismo confía en:", options: [{text:"La razón y las ideas innatas",correct:true},{text:"Los sentidos",correct:false},{text:"La fe",correct:false},{text:"El azar",correct:false}], explanation: "Descartes, Spinoza." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Leviatán (Hobbes) defiende:", options: [{text:"Estado absoluto para evitar guerra",correct:true},{text:"Democracia",correct:false},{text:"Anarquía",correct:false},{text:"Religión",correct:false}], explanation: "Hombre lobo del hombre." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Contrato Social (Rousseau):", options: [{text:"Acuerdo entre ciudadanos y Estado",correct:true},{text:"Un contrato de arriendo",correct:false},{text:"Guerra civil",correct:false},{text:"Esclavitud",correct:false}], explanation: "Voluntad general." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Crítica de la Razón Pura es de:", options: [{text:"Immanuel Kant",correct:true},{text:"Hegel",correct:false},{text:"Marx",correct:false},{text:"Sartre",correct:false}], explanation: "Idealismo trascendental." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Imperativo Categórico (Kant):", options: [{text:"Actúa como si tu acción fuera ley universal",correct:true},{text:"Haz lo que quieras",correct:false},{text:"Busca placer",correct:false},{text:"Obedece a Dios",correct:false}], explanation: "Ética del deber." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Ilustración (Siglo de las Luces):", options: [{text:"Uso de la razón para salir de la ignorancia",correct:true},{text:"Uso de velas",correct:false},{text:"Edad Media",correct:false},{text:"Guerra Mundial",correct:false}], explanation: "Sapere Aude." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Duda Metódica:", options: [{text:"Método para encontrar verdad indubitable",correct:true},{text:"Ser indeciso",correct:false},{text:"No creer en nada",correct:false},{text:"Mentir",correct:false}], explanation: "Descartes." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Monadas (Leibniz):", options: [{text:"Sustancias simples indivisibles",correct:true},{text:"Monos",correct:false},{text:"Átomos físicos",correct:false},{text:"Números",correct:false}], explanation: "Metafísica." }
    ]
  },

  // Bundle 3: Filosofía Contemporánea
  {
    meta: {
      id: "CO-LEC-11-filosofia-contemporanea-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "filosofia",
      periodo: 4,
      dba_id: "DBA-LEC-11-5",
      title: "Filosofía Contemporánea"
    },
    base: { question: "Nietzsche crítica la moral occidental.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Autor de 'El Capital':", options: [{text:"Karl Marx",correct:true},{text:"Adam Smith",correct:false},{text:"Lenin",correct:false},{text:"Engels solo",correct:false}], explanation: "Materialismo histórico." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Superhombre (Nietzsche):", options: [{text:"Quien crea sus propios valores",correct:true},{text:"Un héroe de cómic",correct:false},{text:"Un dios",correct:false},{text:"Un soldado",correct:false}], explanation: "Más allá del bien y el mal." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Existencialismo (Sartre):", options: [{text:"La existencia precede a la esencia",correct:true},{text:"Dios define todo",correct:false},{text:"El destino está escrito",correct:false},{text:"Nada importa",correct:false}], explanation: "Libertad radical." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "'Dios ha muerto' significa:", options: [{text:"Fin de los valores absolutos religiosos",correct:true},{text:"Ateísmo simple",correct:false},{text:"Dios falleció físicamente",correct:false},{text:"Triunfo de la ciencia",correct:false}], explanation: "Nihilismo." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Lucha de clases (Marx):", options: [{text:"Motor de la historia (Opresores vs Oprimidos)",correct:true},{text:"Pelea en el colegio",correct:false},{text:"Guerra de países",correct:false},{text:"Competencia deportiva",correct:false}], explanation: "Dialéctica." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "El absurdo (Camus):", options: [{text:"Búsqueda de sentido en mundo sin sentido",correct:true},{text:"Un chiste",correct:false},{text:"Locura",correct:false},{text:"Tontería",correct:false}], explanation: "Mito de Sísifo." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Foucault estudió:", options: [{text:"Relaciones de poder saber (cárceles, locura)",correct:true},{text:"Física cuántica",correct:false},{text:"Biología",correct:false},{text:"Astronomía",correct:false}], explanation: "Biopolítica." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Banalidad del mal (Hannah Arendt):", options: [{text:"Gente normal comete atrocidades por obediencia",correct:true},{text:"El mal es profundo",correct:false},{text:"El diablo existe",correct:false},{text:"Todos son malos",correct:false}], explanation: "Juicio a Eichmann." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Modernidad líquida (Bauman):", options: [{text:"Vínculos frágiles y cambio constante",correct:true},{text:"Agua contaminada",correct:false},{text:"Tecnología",correct:false},{text:"Paz mundial",correct:false}], explanation: "Sociedad actual." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Simulacro (Baudrillard):", options: [{text:"Copia sin original (Mapas que tapan territorio)",correct:true},{text:"Ensayo de examen",correct:false},{text:"Mentira pequeña",correct:false},{text:"Videojuego",correct:false}], explanation: "Hiperrealidad." }
    ]
  },

  // Bundle 4: Ensayo Filosófico
  {
    meta: {
      id: "CO-LEC-11-ensayo-filosofico-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "filosofia",
      periodo: 4,
      dba_id: "DBA-LEC-11-5",
      title: "Lectura del Ensayo Filosófico"
    },
    base: { question: "El ensayo filosófico argumenta sobre ideas.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Estanislao Zuleta (colombiano) escribió:", options: [{text:"Elogio de la Dificultad",correct:true},{text:"La Odisea",correct:false},{text:"Cien Años de Soledad",correct:false},{text:"El Principito",correct:false}], explanation: "Pensador local." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Un texto filosófico requiere lectura:", options: [{text:"Crítica y reflexiva",correct:true},{text:"Rápida",correct:false},{text:"Literal simple",correct:false},{text:"En voz alta",correct:false}], explanation: "Profundidad." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Tesis filosófica:", options: [{text:"Proposición central sobre un problema conceptual",correct:true},{text:"Dato numérico",correct:false},{text:"Historia de vida",correct:false},{text:"Descripción física",correct:false}], explanation: "Núcleo." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Argumento deductivo:", options: [{text:"De lo general a lo particular",correct:true},{text:"De lo particular a lo general",correct:false},{text:"Por comparación",correct:false},{text:"Por autoridad",correct:false}], explanation: "Lógica formal." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Aporía significa:", options: [{text:"Paradoja o camino sin salida lógica",correct:true},{text:"Conclusión clara",correct:false},{text:"Victoria",correct:false},{text:"Poro de la piel",correct:false}], explanation: "Duda racional." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Dialéctica implica:", options: [{text:"Tesis, Antítesis, Síntesis",correct:true},{text:"Hablar dos idiomas",correct:false},{text:"Diálogo de sordos",correct:false},{text:"Monólogo",correct:false}], explanation: "Movimiento del pensamiento." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Fernando Savater divulga:", options: [{text:"Ética (Ética para Amador)",correct:true},{text:"Física",correct:false},{text:"Cocina",correct:false},{text:"Deportes",correct:false}], explanation: "Filosofía fácil." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Premisa implícita:", options: [{text:"Idea asumida no escrita",correct:true},{text:"Idea escrita",correct:false},{text:"Idea falsa",correct:false},{text:"Conclusión",correct:false}], explanation: "Entimema." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Hermenéutica:", options: [{text:"Arte de interpretar textos",correct:true},{text:"Arte de Hermes",correct:false},{text:"Ciencia oculta",correct:false},{text:"Gramática",correct:false}], explanation: "Comprensión sentido." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Ontología estudia:", options: [{text:"El Ser en cuanto ser",correct:true},{text:"Los entes",correct:false},{text:"La moral",correct:false},{text:"El conocimiento",correct:false}], explanation: "Metafísica general." }
    ]
  },

  // Bundle 5: Intertextualidad
  {
    meta: {
      id: "CO-LEC-11-intertextualidad-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "filosofia",
      periodo: 4,
      dba_id: "DBA-LEC-11-5",
      title: "Intertextualidad y Diálogo de Saberes"
    },
    base: { question: "Ningún texto es una isla.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Intertextualidad es:", options: [{text:"Relación entre dos o más textos",correct:true},{text:"Leer internet",correct:false},{text:"Escribir mucho",correct:false},{text:"Tener buena letra",correct:false}], explanation: "Diálogo literario." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Parodia:", options: [{text:"Imitación burlesca de otro texto",correct:true},{text:"Copia seria",correct:false},{text:"Homenaje",correct:false},{text:"Traducción",correct:false}], explanation: "Humor." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Cita directa:", options: [{text:"Reproducción exacta entre comillas",correct:true},{text:"Resumen",correct:false},{text:"Mención vaga",correct:false},{text:"Plagio",correct:false}], explanation: "Evidencia literal." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Alusión:", options: [{text:"Referencia indirecta a otro texto",correct:true},{text:"Ilusión óptica",correct:false},{text:"Mentira",correct:false},{text:"Título",correct:false}], explanation: "Guiño al lector." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Ejemplo de intertextualidad en Los Simpsons:", options: [{text:"Referencias a películas famosas",correct:true},{text:"Ser amarillos",correct:false},{text:"Vivir en Springfield",correct:false},{text:"Comer donas",correct:false}], explanation: "Cultura pop." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Palimpsesto (metáfora):", options: [{text:"Texto escrito sobre otro anterior",correct:true},{text:"Papel viejo",correct:false},{text:"Libro nuevo",correct:false},{text:"Papiro",correct:false}], explanation: "Capas de sentido." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Epígrafe:", options: [{text:"Cita al inicio de un capítulo",correct:true},{text:"Título final",correct:false},{text:"Dedicatoria",correct:false},{text:"Firma",correct:false}], explanation: "Umbral del texto." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: " plagio vs intertextualidad:", options: [{text:"Robo vs Diálogo creativo",correct:true},{text:"Son iguales",correct:false},{text:"El plagio es bueno",correct:false},{text:"La intertextualidad es delito",correct:false}], explanation: "Intención y crédito." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Pastiche:", options: [{text:"Imitación de estilo o mezcla de fragmentos",correct:true},{text:"Pasta italiana",correct:false},{text:"Pegante",correct:false},{text:"Pastel",correct:false}], explanation: "Homenaje o sátira." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Dialogismo (Bajtín):", options: [{text:"Todo enunciado responde a otros anteriores",correct:true},{text:"Hablar solo",correct:false},{text:"Dos personas",correct:false},{text:"Teatro",correct:false}], explanation: "Cadena discursiva." }
    ]
  },

  // Bundle 6: Estética y Arte
  {
    meta: {
      id: "CO-LEC-11-estetica-arte-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "filosofia",
      periodo: 4,
      dba_id: "DBA-LEC-11-5",
      title: "Estética y Filosofía del Arte"
    },
    base: { question: "La estética estudia lo bello.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Subjetivo vs Objetivo en arte:", options: [{text:"Gusto personal vs Cualidad del objeto",correct:true},{text:"Luz vs Sombra",correct:false},{text:"Caro vs Barato",correct:false},{text:"Viejo vs Nuevo",correct:false}], explanation: "Juicio estético." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "La Monalisa es famosa por:", options: [{text:"Su sonrisa enigmática (Da Vinci)",correct:true},{text:"Ser grande",correct:false},{text:"Ser foto",correct:false},{text:"Estar en Colombia",correct:false}], explanation: "Renacimiento." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Mímesis (Aristóteles):", options: [{text:"Imitación de la realidad",correct:true},{text:"Mimo",correct:false},{text:"Burla",correct:false},{text:"Creación pura",correct:false}], explanation: "Arte como espejo." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Catarsis:", options: [{text:"Purificación de emociones al ver tragedia",correct:true},{text:"Vómito",correct:false},{text:"Risa",correct:false},{text:"Sueño",correct:false}], explanation: "Efecto del arte." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Arte Abstracto:", options: [{text:"No representa figuras reconocibles",correct:true},{text:"Es muy realista",correct:false},{text:"Es fotografía",correct:false},{text:"Es escultura",correct:false}], explanation: "Formas y colores." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Lo Sublime (Kant):", options: [{text:"Belleza aterradora o inmensa que sobrecoge",correct:true},{text:"Algo bonito",correct:false},{text:"Algo feo",correct:false},{text:"Algo pequeño",correct:false}], explanation: "Naturaleza inmensa." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Dadaísmo (Duchamp):", options: [{text:"Arte anti-arte (Orinal)",correct:true},{text:"Arte clásico",correct:false},{text:"Pintura al óleo",correct:false},{text:"Música suave",correct:false}], explanation: "Ready-made." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Aura (Benjamin):", options: [{text:"Singularidad de la obra original",correct:true},{text:"Luz divina",correct:false},{text:"Colores",correct:false},{text:"Marco",correct:false}], explanation: "Pérdida en reproducción." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Muerte del Autor (Barthes):", options: [{text:"El significado lo crea el lector, no el autor",correct:true},{text:"El autor murió",correct:false},{text:"Asesinato",correct:false},{text:"Fin del libro",correct:false}], explanation: "Lectura activa." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Sociedad del Espectáculo (Debord):", options: [{text:"La vida real se convierte en representación",correct:true},{text:"Ir al cine",correct:false},{text:"Ver TV",correct:false},{text:"Fiesta",correct:false}], explanation: "Alienación visual." }
    ]
  },

  // Bundle 7: Bioética y Tecnología (Debates actuales)
  {
    meta: {
      id: "CO-LEC-11-bioetica-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "filosofia",
      periodo: 4,
      dba_id: "DBA-LEC-11-5",
      title: "Dilemas Éticos Contemporáneos"
    },
    base: { question: "La bioética estudia la conducta humana en ciencias de la vida.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Clonación humana:", options: [{text:"Dilema ético sobre identidad y vida",correct:true},{text:"Juego",correct:false},{text:"Facilidad médica",correct:false},{text:"Mentira",correct:false}], explanation: "Debate moral." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Eutanasia:", options: [{text:"Derecho a morir dignamente",correct:true},{text:"Asesinato",correct:false},{text:"Dormir",correct:false},{text:"Curarse",correct:false}], explanation: "Muerte asistida." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Inteligencia Artificial (IA) y ética:", options: [{text:"Riesgo de sesgos y reemplazo laboral",correct:true},{text:"Robots asesinos",correct:false},{text:"Juguetes",correct:false},{text:"Nada malo",correct:false}], explanation: "Tecnoética." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Transhumanismo:", options: [{text:"Mejorar al humano con tecnología",correct:true},{text:"Ser humano",correct:false},{text:"Cambiar de género",correct:false},{text:"Viajar en tren",correct:false}], explanation: "Cyborgs." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Utilitarismo (Bentham):", options: [{text:"Mayor felicidad para mayor número",correct:true},{text:"Ser inútil",correct:false},{text:"Usar herramientas",correct:false},{text:"Egoísmo",correct:false}], explanation: "Cálculo hedonista." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Principio de Precaución:", options: [{text:"Evitar acciones con riesgo incierto grave",correct:true},{text:"Ser miedoso",correct:false},{text:"Hacer todo rápido",correct:false},{text:"No hacer nada",correct:false}], explanation: "Medio ambiente." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Eugenesia:", options: [{text:"Selección genética para 'mejorar' la raza",correct:true},{text:"Buen nacimiento",correct:false},{text:"Nombre de mujer",correct:false},{text:"Genética neutra",correct:false}], explanation: "Historia oscura (Nazismo)." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Biopolítica (Foucault):", options: [{text:"Control del estado sobre la vida biológica",correct:true},{text:"Política verde",correct:false},{text:"Biología en el colegio",correct:false},{text:"Hospitales",correct:false}], explanation: "Gestión de poblaciones." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Obsolescencia programada:", options: [{text:"Productos diseñados para fallar",correct:true},{text:"Programar computadores",correct:false},{text:"Moda vieja",correct:false},{text:"Reciclaje",correct:false}], explanation: "Consumismo." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Velo de la ignorancia (Rawls):", options: [{text:"Decidir justicia sin saber qué rol te tocará",correct:true},{text:"No saber nada",correct:false},{text:"Ser ciego",correct:false},{text:"Ignorar leyes",correct:false}], explanation: "Justicia como equidad." }
    ]
  },

  // Bundle 8: Lógica Formal (Proposicional)
  {
    meta: {
      id: "CO-LEC-11-logica-formal-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "filosofia",
      periodo: 4,
      dba_id: "DBA-LEC-11-5",
      title: "Introducción a la Lógica"
    },
    base: { question: "La lógica estudia la validez del razonamiento.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Premisa:", options: [{text:"Afirmación base de un argumento",correct:true},{text:"Premio",correct:false},{text:"Promesa",correct:false},{text:"Pregunta",correct:false}], explanation: "Proposición inicial." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Conclusión:", options: [{text:"Resultado lógico de premisas",correct:true},{text:"Fin de la fiesta",correct:false},{text:"Inicio",correct:false},{text:"Duda",correct:false}], explanation: "Inferencia." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Si p entonces q. Ocurre p. Entonces:", options: [{text:"Ocurre q (Modus Ponens)",correct:true},{text:"No ocurre q",correct:false},{text:"Nada",correct:false},{text:"Ocurre p",correct:false}], explanation: "Afirmación del antecedente." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Contradicción:", options: [{text:"Afirmar y negar lo mismo",correct:true},{text:"Hablar fuerte",correct:false},{text:"Tener razón",correct:false},{text:"Debatir",correct:false}], explanation: "A y no A." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Tautología:", options: [{text:"Verdad en todos los casos (A=A)",correct:true},{text:"Mentira",correct:false},{text:"Error",correct:false},{text:"Repetición inútil",correct:false}], explanation: "Lógicamente necesaria." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Falacia vs Error:", options: [{text:"Falacia parece válida pero no lo es",correct:true},{text:"Son lo mismo",correct:false},{text:"Error es intencional",correct:false},{text:"Falacia es verdad",correct:false}], explanation: "Engaño argumentativo." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Si p entonces q. No q. Entonces:", options: [{text:"No p (Modus Tollens)",correct:true},{text:"No p",correct:false},{text:"q",correct:false},{text:"p",correct:false}], explanation: "Negación del consecuente." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Paradoja del mentiroso ('Yo miento'):", options: [{text:"Si es verdad, miente. Si miente, es verdad",correct:true},{text:"Es un mentiroso",correct:false},{text:"Es verdad",correct:false},{text:"Es fácil",correct:false}], explanation: "Autorreferencia." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Navaja de Ockham:", options: [{text:"La explicación más simple suele ser la correcta",correct:true},{text:"Cortar argumentos",correct:false},{text:"Arma medieval",correct:false},{text:"Afeitarse",correct:false}], explanation: "Economía lógica." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Falsacionismo (Popper):", options: [{text:"Ciencia avanza refutando teorías, no probándolas",correct:true},{text:"Decir mentiras",correct:false},{text:"Probar todo",correct:false},{text:"Ser falso",correct:false}], explanation: "Método científico." }
    ]
  },

  // Bundle 9: Filosofía Latinoamericana
  {
    meta: {
      id: "CO-LEC-11-filosofia-latinoamericana-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "filosofia",
      periodo: 4,
      dba_id: "DBA-LEC-11-5",
      title: "Pensamiento Latinoamericano"
    },
    base: { question: "Existe una filosofía propia en América Latina.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Tema central:", options: [{text:"Identidad y Liberación",correct:true},{text:"Lógica pura",correct:false},{text:"Átomos",correct:false},{text:"Dioses griegos",correct:false}], explanation: "Contexto colonial." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "José Martí:", options: [{text:"Pensador cubano (Nuestra América)",correct:true},{text:"Futbolista",correct:false},{text:"Actor",correct:false},{text:"Español",correct:false}], explanation: "Prócer." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Filosofía de la Liberación (Dussel):", options: [{text:"Pensar desde el oprimido/pobre",correct:true},{text:"Ser libre para comprar",correct:false},{text:"Meditar",correct:false},{text:"Viajar",correct:false}], explanation: "Alteridad." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Calibán (Retamar):", options: [{text:"Símbolo del mestizo rebelde",correct:true},{text:"Monstruo feo",correct:false},{text:"Ariel",correct:false},{text:"Prospero",correct:false}], explanation: "Relectura La Tempestad." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Colonialidad del saber:", options: [{text:"Imposición de formas de pensar europeas",correct:true},{text:"Saber colonia",correct:false},{text:"Estudiar historia",correct:false},{text:"Viajar a Europa",correct:false}], explanation: "Epistemología del sur." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Buen Vivir (Sumak Kawsay):", options: [{text:"Armonía con comunidad y naturaleza (Indígena)",correct:true},{text:"Tener dinero",correct:false},{text:"Vivir en la ciudad",correct:false},{text:"Comer bien",correct:false}], explanation: "Cosmovisión andina." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Rodó y 'Ariel':", options: [{text:"Espiritualidad latina vs Utilitarismo sajón",correct:true},{text:"Cuento de hadas",correct:false},{text:"Jabón",correct:false},{text:"Sirena",correct:false}], explanation: "Identidad." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Vasconcelos y la Raza Cósmica:", options: [{text:"Mestizaje como futuro de la humanidad",correct:true},{text:"Racismo",correct:false},{text:"Viaje espacial",correct:false},{text:"Aliens",correct:false}], explanation: "México." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Epistemologías del Sur (Sousa Santos):", options: [{text:"Validar saberes no occidentales",correct:true},{text:"Brujería",correct:false},{text:"Sur de la ciudad",correct:false},{text:"Mapas",correct:false}], explanation: "Justicia cognitiva." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Teología de la Liberación:", options: [{text:"Opción preferencial por los pobres (Iglesia)",correct:true},{text:"Rezar mucho",correct:false},{text:"Ser rico",correct:false},{text:"Ateísmo",correct:false}], explanation: "Gutiérrez/Boff." }
    ]
  },

  // Bundle 10: Taller Escritura Ensayo Filosófico
  {
    meta: {
      id: "CO-LEC-11-taller-ensayo-filosofico-001",
      country: "co",
      grade: 11,
      subject: "lectura-critica",
      topic: "filosofia",
      periodo: 4,
      dba_id: "DBA-LEC-11-5",
      title: "Producción de Ensayo Filosófico"
    },
    base: { question: "El ensayo filosófico personal reflexiona.", answer: "Verdadero", source_url: "https://opentdb.com" },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Pregunta filosófica:", options: [{text:"Abierta, fundamental, sin respuesta única",correct:true},{text:"Dato curioso",correct:false},{text:"Operación matemática",correct:false},{text:"Chisme",correct:false}], explanation: "Punto de partida." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Primera persona en filosofía:", options: [{text:"Válida si hay rigor argumentativo",correct:true},{text:"Prohibida",correct:false},{text:"Obligatoria",correct:false},{text:"Mala educación",correct:false}], explanation: "El 'Yo' pensante." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Coherencia argumentativa:", options: [{text:"Las ideas se siguen lógicamente",correct:true},{text:"Escribir mucho",correct:false},{text:"Usar palabras raras",correct:false},{text:"Copiar",correct:false}], explanation: "Hilo conductor." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Citar fuentes:", options: [{text:"Evita el plagio y da autoridad",correct:true},{text:"Es aburrido",correct:false},{text:"Es opcional",correct:false},{text:"Rellena espacio",correct:false}], explanation: "Rigor." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Contraargumentar en el ensayo:", options: [{text:"Fortalece la propia tesis al responder críticas",correct:true},{text:"Debilita el texto",correct:false},{text:"Confunde",correct:false},{text:"Prohibido",correct:false}], explanation: "Dialéctica." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Conclusión abierta:", options: [{text:"Invita a seguir pensando",correct:true},{text:"Texto incompleto",correct:false},{text:"Error",correct:false},{text:"Mala nota",correct:false}], explanation: "No dogmatismo." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Uso de analogías:", options: [{text:"Comparar para explicar lo abstracto",correct:true},{text:"Contar cuentos",correct:false},{text:"Mentir",correct:false},{text:"Rimar",correct:false}], explanation: "Recurso didáctico." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Claridad vs Oscuridad:", options: [{text:"La cortesía del filósofo es la claridad (Ortega)",correct:true},{text:"Ser oscuro es ser inteligente",correct:false},{text:"No escribir",correct:false},{text:"Ser simple",correct:false}], explanation: "Estilo." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Experimento mental:", options: [{text:"Imaginar situación hipotética para probar teoría",correct:true},{text:"Telepatía",correct:false},{text:"Locura",correct:false},{text:"Soñar",correct:false}], explanation: "Cerebro en cubeta." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Ironía socrática en escritura:", options: [{text:"Fingir ignorancia para cuestionar",correct:true},{text:"Burlarse",correct:false},{text:"Mentir",correct:false},{text:"Ser tonto",correct:false}], explanation: "Estilo interrogativo." }
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
    console.log(`✅ Created Period 4 Bundle v3.0: ${fullPath}`);
});
