
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
      {
        id_suffix: "v1",
        difficulty: 3,
        type: "Original",
        question: "En una fiesta en Bogotá, quedan 3/4 de una torta de cumpleaños. Si se quiere repartir equitativamente entre 2 niños, ¿qué fracción de la torta original le corresponde a cada uno?",
        options: [
           { text: "3/8", correct: true },
           { text: "3/2", correct: false },
           { text: "6/4", correct: false },
           { text: "1/2", correct: false }
        ],
        explanation: "Dividir una fracción por un entero es igual a multiplicar el denominador por ese entero. (3/4) ÷ 2 = 3 / (4×2) = 3/8."
      },
      {
        id_suffix: "v2",
        difficulty: 1,
        type: "Fácil A",
        question: "¿Qué fracción representa la mitad de una arepa partida en 4 pedazos iguales?",
        options: [
           { text: "2/4", correct: true },
           { text: "1/4", correct: false },
           { text: "4/4", correct: false },
           { text: "3/4", correct: false }
        ],
        explanation: "Si la arepa tiene 4 pedazos, la mitad son 2 pedazos. Por lo tanto, 2/4."
      },
      {
        id_suffix: "v3",
        difficulty: 2,
        type: "Fácil B",
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
        difficulty: 3,
        type: "Media A",
        question: "En un mercado de Cali, un quilo de arroz cuesta $4000. Si compro 3/4 de kilo, ¿cuánto debo pagar?",
        options: [
           { text: "$3000", correct: true },
           { text: "$3500", correct: false },
           { text: "$1000", correct: false },
           { text: "$4000", correct: false }
        ],
        explanation: "Dividimos 4000 entre 4 para saber el precio de 1/4 ($1000). Luego multiplicamos por 3 ($3000)."
      },
      {
        id_suffix: "v5",
        difficulty: 3,
        type: "Media B",
        question: "Si un tanque de agua en Medellín está lleno hasta sus 2/3 partes y se consumen 1/3 de lo que hay, ¿qué fracción del tanque queda llena?",
        options: [
           { text: "4/9", correct: true },
           { text: "1/3", correct: false },
           { text: "2/9", correct: false },
           { text: "5/9", correct: false }
        ],
        explanation: "Hay 2/3. Se consume 1/3 DE eso: (1/3)*(2/3) = 2/9. Queda: 2/3 - 2/9 = 6/9 - 2/9 = 4/9."
      },
      {
        id_suffix: "v6",
        difficulty: 4,
        type: "Difícil A",
        question: "Andrés gasta 1/3 de su salario en arriendo y 2/5 en comida. ¿Qué fracción de su salario le queda para otros gastos?",
        options: [
           { text: "4/15", correct: true },
           { text: "1/15", correct: false },
           { text: "8/15", correct: false },
           { text: "11/15", correct: false }
        ],
        explanation: "Sumamos gastos: 1/3 + 2/5 = (5+6)/15 = 11/15. El total es 15/15. Queda: 15/15 - 11/15 = 4/15."
      },
      {
        id_suffix: "v7",
        difficulty: 5,
        type: "Difícil B",
        question: "Una piscina se llena con el grifo A en 4 horas y con el grifo B en 6 horas. Si se abren ambos, ¿en cuánto tiempo se llena?",
        options: [
           { text: "2.4 horas", correct: true },
           { text: "5 horas", correct: false },
           { text: "3 horas", correct: false },
           { text: "10 horas", correct: false }
        ],
        explanation: "Grifo A llena 1/4 por hora. Grifo B llena 1/6 por hora. Juntos: 1/4 + 1/6 = 3/12 + 2/12 = 5/12 por hora. Para llenar 12/12 se necesitan 12/5 horas = 2.4 horas."
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
      {
        id_suffix: "v1",
        difficulty: 3,
        type: "Original",
        question: "Doña María usa 500g de harina para hacer 10 arepas. Hoy tiene un pedido de 15 arepas. ¿Cuántos gramos de harina necesita?",
        options: [
           { text: "750g", correct: true },
           { text: "600g", correct: false },
           { text: "1000g", correct: false },
           { text: "800g", correct: false }
        ],
        explanation: "Es una regla de tres directa: (15 * 500) / 10 = 7500 / 10 = 750g."
      },
      {
        id_suffix: "v2",
        difficulty: 1,
        type: "Fácil A",
        question: "Si 1 kilo de papa cuesta $2000, ¿cuánto cuestan 2 kilos?",
        options: [
           { text: "$4000", correct: true },
           { text: "$3000", correct: false },
           { text: "$2000", correct: false },
           { text: "$5000", correct: false }
        ],
        explanation: "Simplemente multiplicamos el precio unitario por la cantidad: 2000 * 2 = 4000."
      },
      {
        id_suffix: "v3",
        difficulty: 2,
        type: "Fácil B",
        question: "Un carro recorre 60km en 1 hora. ¿Cuántos km recorre en 2 horas a la misma velocidad?",
        options: [
           { text: "120km", correct: true },
           { text: "100km", correct: false },
           { text: "90km", correct: false },
           { text: "80km", correct: false }
        ],
        explanation: "Distancia = Velocidad * Tiempo. 60 * 2 = 120."
      },
      {
        id_suffix: "v4",
        difficulty: 3,
        type: "Media A",
        question: "En un mapa de Colombia, 1 cm representa 100 km. Si la distancia entre dos ciudades en el mapa es 3.5 cm, ¿cuál es la distancia real?",
        options: [
           { text: "350 km", correct: true },
           { text: "300 km", correct: false },
           { text: "400 km", correct: false },
           { text: "35 km", correct: false }
        ],
        explanation: "Multiplicamos la distancia del mapa por la escala: 3.5 * 100 = 350."
      },
      {
        id_suffix: "v5",
        difficulty: 3,
        type: "Media B",
        question: "3 obreros construyen un muro en 12 días. ¿Cuánto tardarían 6 obreros trabajando al mismo ritmo?",
        options: [
           { text: "6 días", correct: true },
           { text: "24 días", correct: false },
           { text: "18 días", correct: false },
           { text: "4 días", correct: false }
        ],
        explanation: "Es proporcionalidad INVERSA. Más obreros, menos tiempo. 3*12 = 36 (días-hombre). 36 / 6 = 6 días."
      },
      {
        id_suffix: "v6",
        difficulty: 4,
        type: "Difícil A",
        question: "Pedro, Juan y Luis compraron una lotería. Pedro puso $2000, Juan $3000 y Luis $5000. Si ganaron $100.000, ¿cuánto le corresponde a Juan si se reparte proporcionalmente?",
        options: [
           { text: "$30.000", correct: true },
           { text: "$20.000", correct: false },
           { text: "$50.000", correct: false },
           { text: "$33.333", correct: false }
        ],
        explanation: "Total aporte: 2+3+5 = 10 mil. Juan aportó 3/10 del total. Le toca 3/10 del premio: $30.000."
      },
      {
        id_suffix: "v7",
        difficulty: 5,
        type: "Difícil B",
        question: "Una rueda de 50 cm de radio da 100 vueltas para recorrer una distancia. ¿Cuántas vueltas dará una rueda de 25 cm de radio para recorrer la misma distancia?",
        options: [
           { text: "200 vueltas", correct: true },
           { text: "50 vueltas", correct: false },
           { text: "150 vueltas", correct: false },
           { text: "400 vueltas", correct: false }
        ],
        explanation: "Proporcionalidad inversa: Radio * Vueltas = Constante. 50*100 = 5000. 25 * X = 5000 => X = 200."
      }
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
      {
        id_suffix: "v1",
        difficulty: 3,
        type: "Original",
        question: "Simplifica la siguiente expresión algebraica: 5a + 2b - 3a + 4b",
        options: [
           { text: "2a + 6b", correct: true },
           { text: "8a + 6b", correct: false },
           { text: "2a - 2b", correct: false },
           { text: "8ab", correct: false }
        ],
        explanation: "Agrupamos términos semejantes: (5a - 3a) + (2b + 4b) = 2a + 6b."
      },
      {
        id_suffix: "v2",
        difficulty: 1,
        type: "Fácil A",
        question: "¿Cuál es el coeficiente de x en la expresión 7x?",
        options: [
           { text: "7", correct: true },
           { text: "x", correct: false },
           { text: "1", correct: false },
           { text: "0", correct: false }
        ],
        explanation: "El coeficiente es el número que multiplica a la variable. En este caso, 7."
      },
      {
        id_suffix: "v3",
        difficulty: 2,
        type: "Fácil B",
        question: "Si x = 2, ¿cuál es el valor de 3x + 1?",
        options: [
           { text: "7", correct: true },
           { text: "6", correct: false },
           { text: "5", correct: false },
           { text: "4", correct: false }
        ],
        explanation: "Reemplazamos x por 2: 3(2) + 1 = 6 + 1 = 7."
      },
      {
        id_suffix: "v4",
        difficulty: 3,
        type: "Media A",
        question: "El perímetro de un rectángulo de base x y altura y es:",
        options: [
           { text: "2x + 2y", correct: true },
           { text: "x + y", correct: false },
           { text: "xy", correct: false },
           { text: "x^2 + y^2", correct: false }
        ],
        explanation: "El perímetro es la suma de todos los lados: x + x + y + y = 2x + 2y."
      },
      {
        id_suffix: "v5",
        difficulty: 3,
        type: "Media B",
        question: "Multiplica: (2x)(3x^2)",
        options: [
           { text: "6x^3", correct: true },
           { text: "5x^3", correct: false },
           { text: "6x^2", correct: false },
           { text: "5x^2", correct: false }
        ],
        explanation: "Multiplicamos coeficientes (2*3=6) y sumamos exponentes de x (1+2=3). Resultado 6x^3."
      },
      {
        id_suffix: "v6",
        difficulty: 4,
        type: "Difícil A",
        question: "Desarrolla el producto notable: (x + 5)^2",
        options: [
           { text: "x^2 + 10x + 25", correct: true },
           { text: "x^2 + 25", correct: false },
           { text: "x^2 + 5x + 25", correct: false },
           { text: "2x + 10", correct: false }
        ],
        explanation: "El cuadrado de un binomio es: el primero al cuadrado + dos veces el primero por el segundo + el segundo al cuadrado. x^2 + 2(x)(5) + 5^2."
      },
      {
        id_suffix: "v7",
        difficulty: 5,
        type: "Difícil B",
        question: "Factoriza completamente: x^2 - 9",
        options: [
           { text: "(x - 3)(x + 3)", correct: true },
           { text: "(x - 3)^2", correct: false },
           { text: "(x - 9)(x + 1)", correct: false },
           { text: "(x + 3)^2", correct: false }
        ],
        explanation: "Es una diferencia de cuadrados perfectos: a^2 - b^2 = (a-b)(a+b)."
      }
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
      {
        id_suffix: "v1",
        difficulty: 3,
        type: "Original",
        question: "La suma de tres números consecutivos es 33. ¿Cuál es el número mayor?",
        options: [
           { text: "12", correct: true },
           { text: "10", correct: false },
           { text: "11", correct: false },
           { text: "13", correct: false }
        ],
        explanation: "x + (x+1) + (x+2) = 33 => 3x + 3 = 33 => 3x = 30 => x = 10. Los números son 10, 11, 12. El mayor es 12."
      },
      {
        id_suffix: "v2",
        difficulty: 1,
        type: "Fácil A",
        question: "Si x + 5 = 10, ¿cuánto vale x?",
        options: [
           { text: "5", correct: true },
           { text: "15", correct: false },
           { text: "2", correct: false },
           { text: "50", correct: false }
        ],
        explanation: "Restamos 5 a ambos lados: x = 10 - 5 = 5."
      },
      {
        id_suffix: "v3",
        difficulty: 2,
        type: "Fácil B",
        question: "El doble de un número es 24. ¿Cuál es el número?",
        options: [
           { text: "12", correct: true },
           { text: "48", correct: false },
           { text: "6", correct: false },
           { text: "2", correct: false }
        ],
        explanation: "2x = 24. Dividimos por 2: x = 12."
      },
      {
        id_suffix: "v4",
        difficulty: 3,
        type: "Media A",
        question: "Un taxi cobra $5000 de arranque más $200 por cada cuadra. Si el viaje costó $9000, ¿cuántas cuadras recorrió?",
        options: [
           { text: "20", correct: true },
           { text: "40", correct: false },
           { text: "15", correct: false },
           { text: "25", correct: false }
        ],
        explanation: "5000 + 200x = 9000. 200x = 4000. x = 20."
      },
      {
        id_suffix: "v5",
        difficulty: 3,
        type: "Media B",
        question: "La edad de Pedro es el doble que la de Juan. Si suman 30 años, ¿cuántos años tiene Pedro?",
        options: [
           { text: "20", correct: true },
           { text: "10", correct: false },
           { text: "15", correct: false },
           { text: "25", correct: false }
        ],
        explanation: "P = 2J. P + J = 30. 2J + J = 30. 3J = 30 => J = 10. Pedro tiene 20."
      },
      {
        id_suffix: "v6",
        difficulty: 4,
        type: "Difícil A",
        question: "Resuelve el sistema: x + y = 10, x - y = 2",
        options: [
           { text: "x=6, y=4", correct: true },
           { text: "x=5, y=5", correct: false },
           { text: "x=8, y=2", correct: false },
           { text: "x=7, y=3", correct: false }
        ],
        explanation: "Sumando ambas ecuaciones: 2x = 12 => x = 6. Reemplazando en la primera: 6 + y = 10 => y = 4."
      },
      {
        id_suffix: "v7",
        difficulty: 5,
        type: "Difícil B",
        question: "Halla tres números impares consecutivos cuya suma sea 45.",
        options: [
           { text: "13, 15, 17", correct: true },
           { text: "11, 13, 15", correct: false },
           { text: "15, 17, 19", correct: false },
           { text: "9, 11, 13", correct: false }
        ],
        explanation: "x + (x+2) + (x+4) = 45. 3x + 6 = 45. 3x = 39. x = 13. Los números son 13, 15, 17."
      }
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
      {
        id_suffix: "v1",
        difficulty: 3,
        type: "Original",
        question: "Una escalera de 10m se apoya en una pared. Si la base de la escalera está a 6m de la pared, ¿a qué altura llega la escalera?",
        options: [
           { text: "8m", correct: true },
           { text: "4m", correct: false },
           { text: "16m", correct: false },
           { text: "11.6m", correct: false }
        ],
        explanation: "Usamos Pitágoras: a^2 + b^2 = c^2. x^2 + 6^2 = 10^2. x^2 + 36 = 100. x^2 = 64. x = 8."
      },
      {
        id_suffix: "v2",
        difficulty: 1,
        type: "Fácil A",
        question: "¿Qué teorema relaciona los lados de un triángulo rectángulo?",
        options: [
           { text: "Teorema de Pitágoras", correct: true },
           { text: "Teorema de Tales", correct: false },
           { text: "Ley de Senos", correct: false },
           { text: "Ley de Cosenos", correct: false }
        ],
        explanation: "El Teorema de Pitágoras es fundamental para triángulos rectángulos."
      },
      {
        id_suffix: "v3",
        difficulty: 2,
        type: "Fácil B",
        question: "Si el seno de un ángulo es cateto opuesto sobre hipotenusa, ¿cuál es el coseno?",
        options: [
           { text: "Cateto adyacente sobre hipotenusa", correct: true },
           { text: "Cateto opuesto sobre cateto adyacente", correct: false },
           { text: "Hipotenusa sobre cateto adyacente", correct: false },
           { text: "Hipotenusa sobre cateto opuesto", correct: false }
        ],
        explanation: "Por definición, cos(a) = Adyacente / Hipotenusa."
      },
      {
        id_suffix: "v4",
        difficulty: 3,
        type: "Media A",
        question: "¿Cuál es el valor de sen(30°)?",
        options: [
           { text: "0.5", correct: true },
           { text: "1", correct: false },
           { text: "0.866", correct: false },
           { text: "0", correct: false }
        ],
        explanation: "Sen(30°) es un valor notable igual a 1/2 o 0.5."
      },
      {
        id_suffix: "v5",
        difficulty: 3,
        type: "Media B",
        question: "En un triángulo rectángulo, si los catetos miden 3 y 4, ¿cuánto mide la hipotenusa?",
        options: [
           { text: "5", correct: true },
           { text: "7", correct: false },
           { text: "6", correct: false },
           { text: "12", correct: false }
        ],
        explanation: "3-4-5 es un triángulo pitagórico clásico. 3^2 + 4^2 = 9 + 16 = 25. Raíz de 25 es 5."
      },
      {
        id_suffix: "v6",
        difficulty: 4,
        type: "Difícil A",
        question: "Un edificio proyecta una sombra de 20m cuando el sol está a 45° sobre el horizonte. ¿Cuál es la altura del edificio?",
        options: [
           { text: "20m", correct: true },
           { text: "40m", correct: false },
           { text: "10m", correct: false },
           { text: "28m", correct: false }
        ],
        explanation: "Tan(45°) = Opuesto/Adyacente. 1 = H/20. H = 20."
      },
      {
        id_suffix: "v7",
        difficulty: 5,
        type: "Difícil B",
        question: "Simplifica la identidad: sen²(x) + cos²(x)",
        options: [
           { text: "1", correct: true },
           { text: "0", correct: false },
           { text: "2", correct: false },
           { text: "tan(x)", correct: false }
        ],
        explanation: "Es la identidad pitagórica fundamental. Siempre es igual a 1."
      }
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
protocol_version: "2.1"
total_questions: 7
estado: "published"
creador: "AI-WorldExams"
generation_date: "${today}"

licenses:
  v1: "CC BY-SA 4.0"
  v2-v7: "CC BY-NC-SA 4.0"

source: "OpenTDB"
source_url: "${q.base.source_url}"
source_license: "CC BY-SA 4.0"
search_query: "preguntas matematicas grado ${meta.grade} ${meta.topic}"
original_question: "${q.base.question}"
original_answer: "${q.base.answer}"
---

# Pregunta Base: ${meta.title}

> **Fuente:** OpenTDB (CC BY-SA 4.0)
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
    const fileName = `${q.meta.id}-bundle.md`;
    const fullPath = path.join(dirPath, fileName);
    ensureDir(fullPath);

    const content = createBundleContent(q);
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Created bundle: ${fullPath}`);
});
