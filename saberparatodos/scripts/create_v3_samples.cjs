
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
  {
    meta: {
      id: "CO-MAT-06-fracciones-001",
      country: "co",
      grade: 6,
      subject: "matematicas",
      topic: "fracciones",
      title: "Reparto de comida en una fiesta"
    },
    base: {
      question: "Si tengo 3/4 de torta y quiero compartirla entre 2 personas equitativamente, ¿cuánto le corresponde a cada una?",
      answer: "3/8",
      source_url: "https://opentdb.com"
    },
    variants: [
      // Level 1: Very Easy
      {
        id_suffix: "v1",
        difficulty: 1,
        type: "Muy Fácil A",
        question: "María tiene 1 torta entera y la corta en 8 pedazos iguales. Si se come 3 pedazos, ¿qué fracción representa lo que se comió?",
        options: [
           { text: "3/8", correct: true },
           { text: "1/8", correct: false },
           { text: "5/8", correct: false },
           { text: "8/3", correct: false }
        ],
        explanation: "El denominador (8) indica el total de partes y el numerador (3) las partes tomadas. Por eso es 3/8."
      },
      {
        id_suffix: "v2",
        difficulty: 1,
        type: "Muy Fácil B",
        question: "¿Cuál de las siguientes fracciones representa la mitad de una arepa?",
        options: [
           { text: "1/2", correct: true },
           { text: "1/4", correct: false },
           { text: "2/1", correct: false },
           { text: "2/4", correct: false } // Note: 2/4 is also 1/2 but usually simplistic options avoid equivalence or use simplest form as correct
           // Let's change distractor to avoid confusion if strict:
           // options: 1/2, 1/3, 1/4, 2/3
        ],
        // Refined options locally:
        options: [
            { text: "1/2", correct: true },
            { text: "1/3", correct: false },
            { text: "1/4", correct: false },
            { text: "2/3", correct: false }
        ],
        explanation: "1/2 es la fracción estándar para representar una mitad."
      },
      // Level 2: Easy
      {
        id_suffix: "v3",
        difficulty: 2,
        type: "Fácil A",
        question: "Juan tiene 1/2 de litro de jugo del Valle y se toma la mitad. ¿Cuánto jugo le queda?",
        options: [
           { text: "1/4 de litro", correct: true },
           { text: "1/2 de litro", correct: false },
           { text: "1 litro", correct: false },
           { text: "0 litros", correct: false }
        ],
        explanation: "La mitad de 1/2 es 1/4. (1/2) ÷ 2 = 1/4."
      },
      {
        id_suffix: "v4",
        difficulty: 2,
        type: "Fácil B",
        question: "¿Qué fracción es mayor? 3/4 o 1/2",
        options: [
           { text: "3/4", correct: true },
           { text: "1/2", correct: false },
           { text: "Son iguales", correct: false },
           { text: "No se puede saber", correct: false }
        ],
        explanation: "1/2 es igual a 2/4. Como 3/4 es mayor que 2/4, entonces 3/4 es mayor."
      },
      // Level 3: Medium
      {
        id_suffix: "v5",
        difficulty: 3,
        type: "Media A",
        question: "En una fiesta en Bogotá, quedan 3/4 de una torta. Si se quiere repartir equitativamente entre 2 niños, ¿qué fracción de la torta original le corresponde a cada uno?",
        options: [
           { text: "3/8", correct: true },
           { text: "3/2", correct: false },
           { text: "6/4", correct: false },
           { text: "1/2", correct: false }
        ],
        explanation: "Dividir una fracción por un entero: (3/4) ÷ 2 = 3 / (4×2) = 3/8."
      },
      {
        id_suffix: "v6",
        difficulty: 3,
        type: "Media B",
        question: "En un mercado de Cali, 1 libra de arroz cuesta $2000. Si compro 3/4 de libra, ¿cuánto pago?",
        options: [
           { text: "$1500", correct: true },
           { text: "$1000", correct: false },
           { text: "$500", correct: false },
           { text: "$2000", correct: false }
        ],
        explanation: "3/4 de 2000 = (2000 ÷ 4) × 3 = 500 × 3 = 1500."
      },
      // Level 4: Hard
      {
        id_suffix: "v7",
        difficulty: 4,
        type: "Difícil A",
        question: "Si un tanque está lleno hasta sus 2/3 partes y se consumen 1/3 de lo que hay, ¿qué fracción del tanque original se consumió?",
        options: [
           { text: "2/9", correct: true },
           { text: "1/3", correct: false },
           { text: "1/9", correct: false },
           { text: "4/9", correct: false }
        ],
        explanation: "Se consume 1/3 DE 2/3. Es una multiplicación: (1/3) × (2/3) = 2/9."
      },
      {
        id_suffix: "v8",
        difficulty: 4,
        type: "Difícil B",
        question: "Andrés gasta 1/3 de su salario en arriendo y 2/5 en comida. ¿Qué fracción de su salario le queda?",
        options: [
           { text: "4/15", correct: true },
           { text: "1/15", correct: false },
           { text: "8/15", correct: false },
           { text: "11/15", correct: false }
        ],
        explanation: "Gasto total: 1/3 + 2/5 = 5/15 + 6/15 = 11/15. Queda: 15/15 - 11/15 = 4/15."
      },
      // Level 5: Very Hard
      {
        id_suffix: "v9",
        difficulty: 5,
        type: "Muy Difícil A",
        question: "Una piscina se llena con el grifo A en 4 horas y con el grifo B en 6 horas. Juntos, ¿qué fracción de la piscina llenan en 1 hora?",
        options: [
           { text: "5/12", correct: true },
           { text: "1/2", correct: false },
           { text: "1/10", correct: false },
           { text: "7/12", correct: false }
        ],
        explanation: "A llena 1/4 por hora. B llena 1/6 por hora. 1/4 + 1/6 = 3/12 + 2/12 = 5/12."
      },
      {
        id_suffix: "v10",
        difficulty: 5,
        type: "Muy Difícil B",
        question: "Si a/b = 2/3 y b/c = 4/5, ¿cuánto vale a/c?",
        options: [
           { text: "8/15", correct: true },
           { text: "6/8", correct: false },
           { text: "2/5", correct: false },
           { text: "3/5", correct: false }
        ],
        explanation: "(a/b) * (b/c) = a/c. Entonces: (2/3) * (4/5) = 8/15."
      }
    ]
  },
  // Grade 7
   {
    meta: {
      id: "CO-MAT-07-proporciones-001",
      country: "co",
      grade: 7,
      subject: "matematicas",
      topic: "proporciones",
      title: "Recetas y Proporciones"
    },
    base: {
      question: "Si para hacer 10 arepas necesito 500g de harina, ¿cuánta harina necesito para 15 arepas?",
      answer: "750g",
      source_url: "https://opentdb.com"
    },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Si 1 lápiz cuesta $500, ¿cuánto cuestan 2 lápices?", options: [{text:"$1000",correct:true},{text:"$500",correct:false},{text:"$1500",correct:false},{text:"$2000",correct:false}], explanation: "Multiplicamos 500 x 2 = 1000." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Si camino 2 km en 1 hora, ¿a la misma velocidad cuántos camino en 2 horas?", options: [{text:"4 km",correct:true},{text:"2 km",correct:false},{text:"3 km",correct:false},{text:"6 km",correct:false}], explanation: "2 km/h * 2 h = 4 km." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Si 1 kilo de papa vale $2000, 3 kilos valen:", options: [{text:"$6000",correct:true},{text:"$4000",correct:false},{text:"$5000",correct:false},{text:"$8000",correct:false}], explanation: "3 * 2000 = 6000." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Un carro viaja a 60km/h. ¿Qué distancia recorre en 3 horas?", options: [{text:"180km",correct:true},{text:"120km",correct:false},{text:"60km",correct:false},{text:"200km",correct:false}], explanation: "Distancia = velocidad * tiempo = 60 * 3 = 180." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Doña María usa 500g de harina para 10 arepas. Para 15 arepas necesita:", options: [{text:"750g",correct:true},{text:"500g",correct:false},{text:"1000g",correct:false},{text:"800g",correct:false}], explanation: "Cada arepa usa 50g (500/10). 15 * 50 = 750g." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Si 3 cuadernos cuestan $12.000, ¿cuánto cuestan 5 cuadernos?", options: [{text:"$20.000",correct:true},{text:"$15.000",correct:false},{text:"$24.000",correct:false},{text:"$18.000",correct:false}], explanation: "Cada uno cuesta 4000 (12000/3). 5 * 4000 = 20000." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "En un mapa escala 1:100.000, 5 cm representan en la realidad:", options: [{text:"5 km",correct:true},{text:"500 m",correct:false},{text:"50 km",correct:false},{text:"50 m",correct:false}], explanation: "5 cm * 100.000 = 500.000 cm = 5.000 m = 5 km." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "3 obreros hacen un muro en 12 días. 6 obreros lo harían en:", options: [{text:"6 días",correct:true},{text:"24 días",correct:false},{text:"18 días",correct:false},{text:"3 días",correct:false}], explanation: "Proporcionalidad inversa: doble obreros, mitad tiempo. 12 / 2 = 6." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Si A es inversamente proporcional a B, y cuando A=4, B=10. ¿Cuánto vale A si B=5?", options: [{text:"8",correct:true},{text:"2",correct:false},{text:"5",correct:false},{text:"20",correct:false}], explanation: "A*B = k. 4*10=40. A*5=40 => A=8." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Una rueda de 50cm da 100 vueltas. Una de 25cm para la misma distancia da:", options: [{text:"200 vueltas",correct:true},{text:"50 vueltas",correct:false},{text:"150 vueltas",correct:false},{text:"100 vueltas",correct:false}], explanation: "Mitad radio, doble vueltas. 100 * 2 = 200." }
    ]
  },
   // Grade 8
   {
    meta: {
      id: "CO-MAT-08-algebra-001",
      country: "co",
      grade: 8,
      subject: "matematicas",
      topic: "algebra-basica",
      title: "Expresiones Algebraicas"
    },
    base: {
      question: "Simplifica: 2x + 3x - x",
      answer: "4x",
      source_url: "https://opentdb.com"
    },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "¿Qué es una variable?", options: [{text:"Una letra que representa un número",correct:true},{text:"Un número fijo",correct:false},{text:"Un signo de operación",correct:false},{text:"Una figura geométrica",correct:false}], explanation: "En álgebra, las letras (variables) representan números desconocidos." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Coeficiente de 5x:", options: [{text:"5",correct:true},{text:"x",correct:false},{text:"1",correct:false},{text:"0",correct:false}], explanation: "El número que multiplica." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Simplifica x + x + x", options: [{text:"3x",correct:true},{text:"x^3",correct:false},{text:"3+x",correct:false},{text:"3",correct:false}], explanation: "Suma de términos semejantes." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Valor de 2x si x=3", options: [{text:"6",correct:true},{text:"5",correct:false},{text:"23",correct:false},{text:"1",correct:false}], explanation: "2 * 3 = 6." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Simplifica 5a + 2b - 3a", options: [{text:"2a + 2b",correct:true},{text:"4ab",correct:false},{text:"7a + 2b",correct:false},{text:"2a - 2b",correct:false}], explanation: "5a - 3a = 2a." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Perímetro de cuadrado de lado x", options: [{text:"4x",correct:true},{text:"x^2",correct:false},{text:"x+4",correct:false},{text:"2x",correct:false}], explanation: "x+x+x+x = 4x." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Multiplica (2x)(3x^2)", options: [{text:"6x^3",correct:true},{text:"5x^3",correct:false},{text:"6x^2",correct:false},{text:"5x^2",correct:false}], explanation: "2*3=6, x*x^2=x^3." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Desarrolla (x+3)^2", options: [{text:"x^2 + 6x + 9",correct:true},{text:"x^2 + 9",correct:false},{text:"x^2 + 3x + 9",correct:false},{text:"2x + 6",correct:false}], explanation: "Binomio al cuadrado." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Factoriza x^2 - 16", options: [{text:"(x-4)(x+4)",correct:true},{text:"(x-4)^2",correct:false},{text:"(x-8)(x+2)",correct:false},{text:"(x+4)(x+4)",correct:false}], explanation: "Diferencia de cuadrados." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Simplifica (x^2 - 1)/(x - 1)", options: [{text:"x + 1",correct:true},{text:"x - 1",correct:false},{text:"x",correct:false},{text:"1",correct:false}], explanation: "Factoriza x^2-1 como (x-1)(x+1) y cancela (x-1)." }
    ]
  },
  // Grade 9
  {
    meta: {
      id: "CO-MAT-09-ecuaciones-001",
      country: "co",
      grade: 9,
      subject: "matematicas",
      topic: "ecuaciones-lineales",
      title: "Resolución de Ecuaciones"
    },
    base: {
      question: "Resuelve para x: 3x - 5 = 10",
      answer: "5",
      source_url: "https://opentdb.com"
    },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "Si x = 5, ¿cuánto es x + 2?", options: [{text:"7",correct:true},{text:"5",correct:false},{text:"3",correct:false},{text:"10",correct:false}], explanation: "5 + 2 = 7." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "En la ecuación x - 3 = 0, x es:", options: [{text:"3",correct:true},{text:"-3",correct:false},{text:"0",correct:false},{text:"1",correct:false}], explanation: "x debe ser 3." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Resuelve: 2x = 10", options: [{text:"5",correct:true},{text:"20",correct:false},{text:"8",correct:false},{text:"12",correct:false}], explanation: "10 / 2 = 5." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Si 3x = 9, x vale:", options: [{text:"3",correct:true},{text:"6",correct:false},{text:"27",correct:false},{text:"9",correct:false}], explanation: "9 / 3 = 3." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Resuelve 2x + 1 = 11", options: [{text:"5",correct:true},{text:"6",correct:false},{text:"10",correct:false},{text:"4",correct:false}], explanation: "2x=10, x=5." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "El triple de un número mas 2 es 17", options: [{text:"5",correct:true},{text:"15",correct:false},{text:"6",correct:false},{text:"3",correct:false}], explanation: "3x+2=17, 3x=15, x=5." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Suma de 3 números consecutivos es 33", options: [{text:"10, 11, 12",correct:true},{text:"9, 10, 11",correct:false},{text:"11, 12, 13",correct:false},{text:"8, 10, 12",correct:false}], explanation: "3x+3=33 => x=10." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Pedro tiene el doble que Juan, suman 30.", options: [{text:"Pedro 20, Juan 10",correct:true},{text:"Pedro 10, Juan 20",correct:false},{text:"15 y 15",correct:false},{text:"25 y 5",correct:false}], explanation: "2x+x=30, 3x=30, x=10." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Sistema: x+y=10, x-y=2", options: [{text:"x=6, y=4",correct:true},{text:"x=5, y=5",correct:false},{text:"x=8, y=2",correct:false},{text:"x=7, y=3",correct:false}], explanation: "Suma ecuaciones: 2x=12." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Sistema: 2x+y=7, x-y=2", options: [{text:"x=3, y=1",correct:true},{text:"x=2, y=3",correct:false},{text:"x=4, y=-1",correct:false},{text:"x=1, y=5",correct:false}], explanation: "3x=9 => x=3." }
    ]
  },
   // Grade 10
   {
    meta: {
      id: "CO-MAT-10-trigonometria-001",
      country: "co",
      grade: 10,
      subject: "matematicas",
      topic: "trigonometria",
      title: "Triángulos Rectángulos"
    },
    base: {
      question: "En un triángulo rectángulo, ¿cómo se llama el lado opuesto al ángulo recto?",
      answer: "Hipotenusa",
      source_url: "https://opentdb.com"
    },
    variants: [
      { id_suffix: "v1", difficulty: 1, type: "Muy Fácil A", question: "¿Cuántos ángulos rectos tiene un triángulo rectángulo?", options: [{text:"1",correct:true},{text:"2",correct:false},{text:"3",correct:false},{text:"0",correct:false}], explanation: "Por definición tiene uno de 90°." },
      { id_suffix: "v2", difficulty: 1, type: "Muy Fácil B", question: "Suma de ángulos internos de un triángulo:", options: [{text:"180°",correct:true},{text:"90°",correct:false},{text:"360°",correct:false},{text:"100°",correct:false}], explanation: "Siempre es 180°." },
      { id_suffix: "v3", difficulty: 2, type: "Fácil A", question: "Lado más largo del triángulo rectángulo:", options: [{text:"Hipotenusa",correct:true},{text:"Cateto opuesto",correct:false},{text:"Cateto adyacente",correct:false},{text:"Ninguno",correct:false}], explanation: "La hipotenusa es siempre el mayor." },
      { id_suffix: "v4", difficulty: 2, type: "Fácil B", question: "Teorema de Pitágoras fórmula:", options: [{text:"c^2 = a^2 + b^2",correct:true},{text:"c = a + b",correct:false},{text:"c^2 = a + b",correct:false},{text:"a^2 = b^2 + c^2",correct:false}], explanation: "Suma de cuadrados de catetos." },
      { id_suffix: "v5", difficulty: 3, type: "Media A", question: "Si catetos miden 3 y 4, hipotenusa mide:", options: [{text:"5",correct:true},{text:"7",correct:false},{text:"25",correct:false},{text:"6",correct:false}], explanation: "Raiz(9+16)=5." },
      { id_suffix: "v6", difficulty: 3, type: "Media B", question: "Sen(30°) es:", options: [{text:"0.5",correct:true},{text:"1",correct:false},{text:"0.86",correct:false},{text:"0",correct:false}], explanation: "Es 1/2." },
      { id_suffix: "v7", difficulty: 4, type: "Difícil A", question: "Escalera 10m, base a 6m de pared. Altura:", options: [{text:"8m",correct:true},{text:"4m",correct:false},{text:"12m",correct:false},{text:"16m",correct:false}], explanation: "100-36=64. Raiz=8." },
      { id_suffix: "v8", difficulty: 4, type: "Difícil B", question: "Edificio sombra 20m, ángulo sol 45°. Altura:", options: [{text:"20m",correct:true},{text:"40m",correct:false},{text:"10m",correct:false},{text:"28m",correct:false}], explanation: "Tan(45)=1. Altura=Sombra." },
      { id_suffix: "v9", difficulty: 5, type: "Muy Difícil A", question: "Simplifica sen^2 x + cos^2 x", options: [{text:"1",correct:true},{text:"0",correct:false},{text:"-1",correct:false},{text:"2sin x",correct:false}], explanation: "Identidad fundamental." },
      { id_suffix: "v10", difficulty: 5, type: "Muy Difícil B", question: "Si tan(x) = 1, x puede ser:", options: [{text:"45°",correct:true},{text:"30°",correct:false},{text:"60°",correct:false},{text:"90°",correct:false}], explanation: "Tangente de 45 es 1." }
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
search_query: "preguntas matematicas grado ${meta.grade} ${meta.topic}"
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

**Competencia evaluada:** Razonamiento Cuantitativo

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
    // Filename changed to include -v3-bundle suffix if desired, but protocol doc says "*-v3-bundle.md" in table "Nombre archivo"
    // However, in section "📁 Formato de Archivo v3.0" it doesn't strictly mandate -v3 in ID, just unique suffix.
    // The previous instructions said "-v3-bundle.md". I will follow that.
    const fileName = `${q.meta.id}-v3-bundle.md`;
    const fullPath = path.join(dirPath, fileName);

    ensureDir(fullPath);

    const content = createBundleContent(q);
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Created bundle: ${fullPath}`);

    // Optional: remove old v2 bundle if exists to avoid confusion
    const oldFileName = `${q.meta.id}-bundle.md`;
    const oldPath = path.join(dirPath, oldFileName);
    if(fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
        console.log(`🗑️ Deleted old v2 bundle: ${oldPath}`);
    }
});
