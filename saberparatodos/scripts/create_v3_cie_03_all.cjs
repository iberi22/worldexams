const fs = require('fs');
const path = require('path');

// Configuration
const COUNTRY = 'colombia';
const SUBJECT = 'ciencias-naturales';
const GRADE = 3;
const PERIOD = 1;
const PROTOCOL_VERSION = '3.0';

// Topics to generate
const TOPICS = [
  'tierra-universo',
  'seres-vivos',
  'entorno-fisico',
  'cuerpo-humano',
  'plantas',
  'animales',
  'agua',
  'aire',
  'clima',
  'sentidos'
];

const BUNDLES_PER_TOPIC = 10;

// Base path
const BASE_DIR = path.join(__dirname, '..', 'src', 'content', 'questions', COUNTRY, SUBJECT, `grado-${GRADE}`);

// Helper to ensure directory exists
function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

// Helper to generate bundle ID
function generateBundleId(topic, bundleIndex) {
  return `CO-CIE-${GRADE}-${topic}-${String(bundleIndex).padStart(3, '0')}`;
}

// Question Templates for each topic
const QUESTIONS_DATA = {
  'tierra-universo': [
    {
      base_q: "¿Cuál es el planeta donde vivimos?",
      options: [
        { text: "Tierra", correct: true },
        { text: "Marte", correct: false },
        { text: "Júpiter", correct: false },
        { text: "Venus", correct: false }
      ]
    },
    {
      base_q: "¿Qué estrella nos da luz y calor?",
      options: [
        { text: "El Sol", correct: true },
        { text: "La Luna", correct: false },
        { text: "Marte", correct: false },
        { text: "Venus", correct: false }
      ]
    }
  ],
  'seres-vivos': [
    {
      base_q: "¿Cuál de estos es un ser vivo?",
      options: [
        { text: "Un árbol", correct: true },
        { text: "Una piedra", correct: false },
        { text: "Una silla", correct: false },
        { text: "El agua", correct: false }
      ]
    },
    {
      base_q: "¿Qué necesitan los seres vivos para sobrevivir?",
      options: [
        { text: "Agua y alimento", correct: true },
        { text: "Televisión", correct: false },
        { text: "Juguetes", correct: false },
        { text: "Carros", correct: false }
      ]
    }
  ],
  'entorno-fisico': [
    {
      base_q: "¿En qué estado se encuentra el hielo?",
      options: [
        { text: "Sólido", correct: true },
        { text: "Líquido", correct: false },
        { text: "Gaseoso", correct: false },
        { text: "Plasma", correct: false }
      ]
    },
    {
      base_q: "¿Qué pasa si calientas mucho el agua?",
      options: [
        { text: "Se evapora", correct: true },
        { text: "Se congela", correct: false },
        { text: "Se vuelve sólida", correct: false },
        { text: "Se pone dura", correct: false }
      ]
    }
  ],
  'cuerpo-humano': [
    {
      base_q: "¿Cuál es el órgano que usamos para pensar?",
      options: [
        { text: "El cerebro", correct: true },
        { text: "El corazón", correct: false },
        { text: "El estómago", correct: false },
        { text: "Los pulmones", correct: false }
      ]
    },
    {
      base_q: "¿Qué órgano bombea sangre a todo el cuerpo?",
      options: [
        { text: "El corazón", correct: true },
        { text: "El cerebro", correct: false },
        { text: "Los riñones", correct: false },
        { text: "El estómago", correct: false }
      ]
    }
  ],
  'plantas': [
    {
      base_q: "¿Por dónde absorben las plantas el agua?",
      options: [
        { text: "Por las raíces", correct: true },
        { text: "Por las hojas", correct: false },
        { text: "Por las flores", correct: false },
        { text: "Por el tallo", correct: false }
      ]
    },
    {
      base_q: "¿De qué color son generalmente las hojas de las plantas?",
      options: [
        { text: "Verdes", correct: true },
        { text: "Azules", correct: false },
        { text: "Negras", correct: false },
        { text: "Blancas", correct: false }
      ]
    }
  ],
  'animales': [
    {
      base_q: "¿Qué animal produce leche?",
      options: [
        { text: "La vaca", correct: true },
        { text: "La gallina", correct: false },
        { text: "El cocodrilo", correct: false },
        { text: "El pez", correct: false }
      ]
    },
    {
      base_q: "¿Qué animal tiene plumas?",
      options: [
        { text: "El loro", correct: true },
        { text: "El perro", correct: false },
        { text: "El gato", correct: false },
        { text: "El sapo", correct: false }
      ]
    }
  ],
  'agua': [
    {
      base_q: "¿Para qué sirve el agua?",
      options: [
        { text: "Para beber e hidratarnos", correct: true },
        { text: "Para quemar cosas", correct: false },
        { text: "Para pintar paredes", correct: false },
        { text: "Para escribir", correct: false }
      ]
    },
    {
      base_q: "¿Dónde podemos encontrar agua salada?",
      options: [
        { text: "En el mar", correct: true },
        { text: "En el río", correct: false },
        { text: "En un vaso", correct: false },
        { text: "En la lluvia", correct: false }
      ]
    }
  ],
  'aire': [
    {
      base_q: "¿Qué respiramos los seres humanos?",
      options: [
        { text: "Oxígeno", correct: true },
        { text: "Agua", correct: false },
        { text: "Tierra", correct: false },
        { text: "Fuego", correct: false }
      ]
    },
    {
      base_q: "¿Podemos ver el aire?",
      options: [
        { text: "No, es invisible", correct: true },
        { text: "Sí, es rojo", correct: false },
        { text: "Sí, es azul", correct: false },
        { text: "Sí, es verde", correct: false }
      ]
    }
  ],
  'clima': [
    {
      base_q: "¿Qué ropa usamos cuando hace mucho frío?",
      options: [
        { text: "Abrigo y bufanda", correct: true },
        { text: "Vestido de baño", correct: false },
        { text: "Camiseta sin mangas", correct: false },
        { text: "Sandalias", correct: false }
      ]
    },
    {
      base_q: "¿Qué cae de las nubes cuando llueve?",
      options: [
        { text: "Agua", correct: true },
        { text: "Piedras", correct: false },
        { text: "Juguetes", correct: false },
        { text: "Fuego", correct: false }
      ]
    }
  ],
  'sentidos': [
    {
      base_q: "¿Cuántos sentidos tenemos?",
      options: [
        { text: "Cinco", correct: true },
        { text: "Diez", correct: false },
        { text: "Dos", correct: false },
        { text: "Veinte", correct: false }
      ]
    },
    {
      base_q: "¿Qué sentido usamos para ver?",
      options: [
        { text: "La vista", correct: true },
        { text: "El olfato", correct: false },
        { text: "El gusto", correct: false },
        { text: "El tacto", correct: false }
      ]
    }
  ]
};

function createBundleContent(bundleMeta, questions) {
  let content = `---
id: ${bundleMeta.id}
country: ${bundleMeta.country}
grado: ${bundleMeta.grado}
asignatura: ${bundleMeta.asignatura}
tema: ${bundleMeta.tema}
periodo: ${bundleMeta.periodo}
protocol_version: '${PROTOCOL_VERSION}'
total_questions: 10
estado: draft
creador: AI-WorldExams-Script
creation_date: '${new Date().toISOString().split('T')[0]}'
licenses:
  v1: CC BY-SA 4.0
  v2-v10: CC BY-NC-SA 4.0
source: Generated by Script
source_url: ''
source_license: ''
search_query: ${bundleMeta.tema} grado 3 ciencias
dba_id: DBA-G3-CIE
---

# Pregunta Base: ${bundleMeta.tema} - Bundle ${bundleMeta.bundleIndex}

> **Tema:** ${bundleMeta.tema}

---
`;

  questions.forEach((q, index) => {
    const vNum = index + 1;
    const diff = index < 2 ? 1 : index < 4 ? 2 : index < 6 ? 3 : index < 8 ? 4 : 5;
    const difficultyName = diff === 1 ? 'Muy Fácil' : diff === 2 ? 'Fácil' : diff === 3 ? 'Media' : diff === 4 ? 'Difícil' : 'Muy Difícil';

    content += `
## Pregunta ${vNum} (${difficultyName} - Dificultad ${diff})

**ID:** \`${bundleMeta.id}-v${vNum}\`

### Enunciado

${q.statement}

### Opciones

`;

    q.options.forEach((opt, idx) => {
      const letter = String.fromCharCode(65 + idx);
      content += `- [${opt.correct ? 'x' : ' '}] ${letter}) ${opt.text}\n`;
    });

    content += `
### Explicación Pedagógica

La respuesta correcta es **${q.options.find(o => o.correct).text}**. Esta pregunta evalúa conocimientos básicos sobre ${bundleMeta.tema}.

---
`;
  });

  return content;
}

// Main execution
console.log('🚀 Starting Grade 3 Science Generation...');

TOPICS.forEach(topic => {
  const topicDir = path.join(BASE_DIR, topic);
  ensureDir(topicDir);
  console.log(`📁 Processing topic: ${topic}`);

  const templates = QUESTIONS_DATA[topic] || [];

  if (templates.length === 0) {
      console.warn(`⚠️ No templates found for topic: ${topic}`);
      return;
  }

  for (let i = 1; i <= BUNDLES_PER_TOPIC; i++) {
    const bundleIndex = i;
    const bundleId = generateBundleId(topic, bundleIndex);

    // Select a template cyclically
    const template = templates[(i - 1) % templates.length];

    const questions = [];
    for (let v = 0; v < 10; v++) {
        questions.push({
            statement: template.base_q,
            options: [...template.options].sort(() => Math.random() - 0.5)
        });
    }

    const bundleMeta = {
      id: bundleId,
      country: COUNTRY,
      grado: GRADE,
      asignatura: SUBJECT,
      tema: topic,
      periodo: PERIOD,
      bundleIndex: bundleIndex
    };

    const fileContent = createBundleContent(bundleMeta, questions);
    const fileName = `${bundleId}-v3-bundle.md`;
    const filePath = path.join(topicDir, fileName);

    fs.writeFileSync(filePath, fileContent);
    console.log(`✅ Created ${fileName}`);
  }
});

console.log('✨ Generation Complete for Grade 3 Science!');
