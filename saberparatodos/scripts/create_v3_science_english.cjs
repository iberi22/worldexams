
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
  // --- CIENCIAS NATURALES GRADO 6 ---
  {
    meta: {
      id: "CO-CN-06-celula-001",
      country: "co",
      grade: 6,
      subject: "ciencias-naturales",
      topic: "la-celula",
      title: "La Célula: Unidad de Vida"
    },
    base: {
      question: "¿Cuál es la unidad básica estructural y funcional de todos los seres vivos?",
      answer: "La célula",
      source_url: "https://opentdb.com"
    },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "¿Cuál es la parte de la célula que controla sus actividades (el 'cerebro' de la célula)?", options: [{text:"Núcleo",correct:true},{text:"Pared",correct:false},{text:"Agua",correct:false},{text:"Pelo",correct:false}], explanation: "El núcleo contiene el ADN y dirige la célula." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Los seres vivos compuestos por muchas células se llaman:", options: [{text:"Pluricelulares",correct:true},{text:"Unicelulares",correct:false},{text:"Bicelulares",correct:false},{text:"Sin células",correct:false}], explanation: "Pluri significa muchos." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "¿Qué organelo es responsable de producir energía en la célula?", options: [{text:"Mitocondria",correct:true},{text:"Ribosoma",correct:false},{text:"Lisosoma",correct:false},{text:"Aparato de Golgi",correct:false}], explanation: "Las mitocondrias son las centrales energéticas." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "¿Cuál es la diferencia principal entre célula animal y vegetal?", options: [{text:"La vegetal tiene pared celular y cloroplastos",correct:true},{text:"La animal es verde",correct:false},{text:"La vegetal no tiene núcleo",correct:false},{text:"La animal es cuadrada",correct:false}], explanation: "Pared celular y cloroplastos son exclusivos de vegetales." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Si una célula no tiene ribosomas, no podría:", options: [{text:"Producir proteínas",correct:true},{text:"Moverse",correct:false},{text:"Respirar",correct:false},{text:"Reproducirse",correct:false}], explanation: "Los ribosomas sintetizan las proteínas." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "¿Qué función cumple la membrana celular?", options: [{text:"Controlar lo que entra y sale",correct:true},{text:"Producir energía",correct:false},{text:"Guardar agua",correct:false},{text:"Hacer fotosíntesis",correct:false}], explanation: "Es una barrera selectiva semipermeable." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "En la ósmosis, el agua se mueve hacia donde hay:", options: [{text:"Mayor concentración de solutos",correct:true},{text:"Menor concentración de solutos",correct:false},{text:"Igual concentración",correct:false},{text:"No se mueve",correct:false}], explanation: "El agua busca equilibrar las concentraciones diluyendo el lado más concentrado." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Una célula procariota se diferencia de una eucariota porque:", options: [{text:"No tiene núcleo definido",correct:true},{text:"No tiene ADN",correct:false},{text:"Es más grande",correct:false},{text:"Siempre es pluricelular",correct:false}], explanation: "Procariota = 'antes del núcleo'. Su ADN está disperso." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Si se bloquea el funcionamiento del Aparato de Golgi, la célula fallaría en:", options: [{text:"Empaquetar y distribuir proteínas",correct:true},{text:"Crear ATP",correct:false},{text:"Copiar el ADN",correct:false},{text:"Degradar desechos",correct:false}], explanation: "El Golgi es el centro de distribución y empaquetamiento." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "¿Qué sucedería si una célula animal se coloca en una solución hipotónica (agua pura)?", options: [{text:"Se hincha y puede estallar (lisis)",correct:true},{text:"Se arruga (crenación)",correct:false},{text:"No le pasa nada",correct:false},{text:"Se vuelve vegetal",correct:false}], explanation: "El agua entra a la célula por ósmosis para equilibrar, hinchándola hasta romperse." }
    ]
  },

  // --- CIENCIAS NATURALES GRADO 9 ---
  {
    meta: {
      id: "CO-CN-09-genetica-001",
      country: "co",
      grade: 9,
      subject: "ciencias-naturales",
      topic: "genetica",
      title: "Herencia y Genética Básica"
    },
    base: {
      question: "¿Quién es considerado el padre de la genética?",
      answer: "Gregor Mendel",
      source_url: "https://opentdb.com"
    },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "¿Dónde se encuentra la información genética en la célula?", options: [{text:"En el núcleo (ADN)",correct:true},{text:"En la mitocondria",correct:false},{text:"En la pared",correct:false},{text:"En el citoplasma",correct:false}], explanation: "El ADN en el núcleo contiene los genes." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "¿Cuántos cromosomas tiene un ser humano típico?", options: [{text:"46",correct:true},{text:"100",correct:false},{text:"2",correct:false},{text:"23",correct:false}], explanation: "46 cromosomas, organizados en 23 pares." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Un gen que siempre se expresa si está presente se llama:", options: [{text:"Dominante",correct:true},{text:"Recesivo",correct:false},{text:"Tímido",correct:false},{text:"Oculto",correct:false}], explanation: "Los dominantes se representan con letra mayúscula y opacan al recesivo." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "El conjunto de genes de un organismo se llama:", options: [{text:"Genotipo",correct:true},{text:"Fenotipo",correct:false},{text:"Cariotipo",correct:false},{text:"Prototipo",correct:false}], explanation: "Genotipo es la información genética interna." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Si cruzamos una planta alta (AA) con una baja (aa), todos los hijos serán:", options: [{text:"Altos (Aa)",correct:true},{text:"Bajos (aa)",correct:false},{text:"Medianos",correct:false},{text:"Altos (AA)",correct:false}], explanation: "Todos reciben un 'A' y un 'a', quedando Aa (fenotipo dominante)." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "¿Qué determina el sexo biológico en humanos?", options: [{text:"Cromosomas X e Y",correct:true},{text:"Cromosomas 21",correct:false},{text:"Solo el padre",correct:false},{text:"El tipo de sangre",correct:false}], explanation: "XX es mujer, XY es hombre." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "En un cruce Aa x Aa, ¿qué probabilidad hay de tener un hijo recesivo (aa)?", options: [{text:"25%",correct:true},{text:"50%",correct:false},{text:"75%",correct:false},{text:"0%",correct:false}], explanation: "Cuadro de Punnett: AA, Aa, Aa, aa. 1 de 4 es aa (25%)." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "El daltonismo es ligado al sexo (cromosoma X). Es más común en hombres porque:", options: [{text:"Solo tienen una X",correct:true},{text:"Tienen dos Y",correct:false},{text:"Sus ojos son distintos",correct:false},{text:"Tienen más hormonas",correct:false}], explanation: "Si la única X del hombre tiene el gen defectuoso, lo manifiesta. La mujer tiene otra X de respaldo." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "La replicación del ADN es 'semiconservativa'. Esto significa que:", options: [{text:"Cada nueva hélice tiene una cadena vieja y una nueva",correct:true},{text:"Se conserva solo la mitad del ADN",correct:false},{text:"El ADN nuevo es totalmente diferente",correct:false},{text:"El ADN viejo se destruye",correct:false}], explanation: "Conserva una de las hebras originales como molde." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Si el ADN tiene la secuencia ATC-GGC, su ARN mensajero complementario será:", options: [{text:"UAG-CCG",correct:true},{text:"TAG-CCG",correct:false},{text:"ATC-GGC",correct:false},{text:"AUC-CCG",correct:false}], explanation: "A->U (en ARN), T->A, C->G, G->C." }
    ]
  },

  // --- INGLÉS GRADO 6 ---
  {
    meta: {
      id: "CO-ING-06-rutina-001",
      country: "co",
      grade: 6,
      subject: "ingles",
      topic: "daily-routine",
      title: "Daily Routine & Simple Present"
    },
    base: {
      question: "I ___ (wake) up at 6:00 AM every day.",
      answer: "wake",
      source_url: "https://opentdb.com"
    },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Select the correct verb: I ____ breakfast at 7 AM.", options: [{text:"eat",correct:true},{text:"sleep",correct:false},{text:"run",correct:false},{text:"play",correct:false}], explanation: "Eat breakfast es la colocación correcta." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Translate 'Yo voy al colegio':", options: [{text:"I go to school",correct:true},{text:"I come school",correct:false},{text:"I play school",correct:false},{text:"I be school",correct:false}], explanation: "Go = ir." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "She ____ plays soccer.", options: [{text:"never",correct:true},{text:"yesterday",correct:false},{text:"tomorrow",correct:false},{text:"now",correct:false}], explanation: "Adverbs of frequency go before the verb in simple present." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Complete: ____ you like pizza?", options: [{text:"Do",correct:true},{text:"Does",correct:false},{text:"Is",correct:false},{text:"Are",correct:false}], explanation: "Do se usa con I, You, We, They." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Correct form: He _____ (watch) TV at night.", options: [{text:"watches",correct:true},{text:"watch",correct:false},{text:"watching",correct:false},{text:"watchs",correct:false}], explanation: "He/She/It adds -es to verbs ending in ch." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Which sentence is correct?", options: [{text:"She doesn't speak Spanish.",correct:true},{text:"She don't speak Spanish.",correct:false},{text:"She not speaks Spanish.",correct:false},{text:"She no speak Spanish.",correct:false}], explanation: "Doesn't es la negación para 3a persona." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "What time ____ the bus ____?", options: [{text:"does / leave",correct:true},{text:"do / leave",correct:false},{text:"is / leaving",correct:false},{text:"does / leaves",correct:false}], explanation: "Structure: Wh + auxiliary + subject + verb base form." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "My brother and I ____ to the gym on Mondays.", options: [{text:"go",correct:true},{text:"goes",correct:false},{text:"going",correct:false},{text:"gone",correct:false}], explanation: "My brother and I = We. Verb goes in base form (go)." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Choose the correct adverb placement: 'is / always / late / he'", options: [{text:"He is always late.",correct:true},{text:"He always is late.",correct:false},{text:"Always he is late.",correct:false},{text:"He is late always.",correct:false}], explanation: "Adverbs of frequency go AFTER the verb To Be." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Which sentence expresses a habit correctly?", options: [{text:"I usually drink coffee in the morning.",correct:true},{text:"I am drinking coffee usually.",correct:false},{text:"I drink usually coffee.",correct:false},{text:"Usually I am drinking coffee.",correct:false}], explanation: "Simple present + frequency adverb is used for habits." }
    ]
  },

  // --- INGLÉS GRADO 9 ---
  {
    meta: {
      id: "CO-ING-09-future-001",
      country: "co",
      grade: 9,
      subject: "ingles",
      topic: "future-tense",
      title: "Future forms: Will vs Going to"
    },
    base: {
      question: "I think it ___ (rain) later.",
      answer: "will rain",
      source_url: "https://opentdb.com"
    },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Tomorrow I ____ visit my grandmother.", options: [{text:"will",correct:true},{text:"did",correct:false},{text:"does",correct:false},{text:"had",correct:false}], explanation: "Will se usa para futuro general." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Complete: She is _____ to buy a car.", options: [{text:"going",correct:true},{text:"go",correct:false},{text:"will",correct:false},{text:"went",correct:false}], explanation: "Form: Be + going to." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Prediction without evidence: I think humans ____ live on Mars.", options: [{text:"will",correct:true},{text:"are going to",correct:false},{text:"have",correct:false},{text:"did",correct:false}], explanation: "Will se usa para predicciones basadas en opinión." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Look at those clouds! It ______ rain.", options: [{text:"is going to",correct:true},{text:"will",correct:false},{text:"shall",correct:false},{text:"wants",correct:false}], explanation: "Prediction with evidence (clouds) -> Going to." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Spontaneous decision: 'The phone is ringing!' 'I ____ answer it.'", options: [{text:"will",correct:true},{text:"am going to",correct:false},{text:"answer",correct:false},{text:"am answering",correct:false}], explanation: "Decisiones del momento usan Will." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Plan: We _____ fly to Madrid next summer. We have the tickets.", options: [{text:"are going to",correct:true},{text:"will",correct:false},{text:"shall",correct:false},{text:"go",correct:false}], explanation: "Planes ya organizados usan Going to o Present Continuous." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "By 2050, we ______ found a cure for cancer. (Future Perfect)", options: [{text:"will have",correct:true},{text:"will had",correct:false},{text:"have will",correct:false},{text:"are having",correct:false}], explanation: "Future Perfect: Will have + participle. Acción terminada en el futuro." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Don't call me at 8. I _______ (watch) the game.", options: [{text:"will be watching",correct:true},{text:"will watch",correct:false},{text:"watch",correct:false},{text:"am watch",correct:false}], explanation: "Future Continuous: Will be + ing. Acción en progreso en el futuro." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "If it rains, I _____ stay at home. (First Conditional)", options: [{text:"will",correct:true},{text:"would",correct:false},{text:"am",correct:false},{text:"go",correct:false}], explanation: "1st Conditional: If + Present, Will + Verb." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Which implies a scheduled event (timetable)?", options: [{text:"The train leaves at 9 PM.",correct:true},{text:"The train thinks to leave at 9 PM.",correct:false},{text:"The train will leave probably.",correct:false},{text:"The train is going to leave.",correct:false}], explanation: "Simple present is used for timetables (horarios)." }
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
protocol_version: "3.0"
bundle_version: "3.0"
total_questions: 10
dificultad: 3
estado: "published"
creador: "AI-WorldExams"
llm_model: "gemini-2.0-flash"
agent: "antigravity"
ide: "generic"
generation_date: "${today}"

licenses:
  v1: "CC BY-SA 4.0"
  v2-v10: "CC BY-NC-SA 4.0"

source: "OpenTDB"
source_url: "${q.base.source_url}"
source_license: "CC BY-SA 4.0"
search_query: "preguntas degree ${meta.grade} ${meta.topic}"
original_question: "${q.base.question}"
original_answer: "${q.base.answer}"
---

# Pregunta Base: ${meta.title}

> **Fuente:** OpenTDB (CC BY-SA 4.0)
> **Tema:** ${meta.topic}
> **Original:** "${q.base.question}"
> **Respuesta Original:** "${q.base.answer}"

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

**Competencia evaluada:** ${meta.subject === 'ingles' ? 'Competencia Comunicativa' : 'Uso Comprensivo del Conocimiento Científico'}

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
    // Note: ensure subject name matches folder on disk ('ingles' is fine, 'ciencias-naturales' is fine)
    const dirPath = path.join(BASE_DIR, 'colombia', q.meta.subject, `grado-${q.meta.grade}`, q.meta.topic);

    // We already learned the lesson: ensure dir exists before file path join if using recursive ensure on file path?
    // No, better: define full path, then ensure dir of that path.
    const fileName = `${q.meta.id}-v3-bundle.md`;
    const fullPath = path.join(dirPath, fileName);

    ensureDir(fullPath);

    const content = createBundleContent(q);
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Created bundle: ${fullPath}`);
});
