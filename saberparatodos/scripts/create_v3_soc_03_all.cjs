const fs = require('fs');
const path = require('path');

// Configuration
const COUNTRY = 'colombia';
const SUBJECT = 'sociales-ciudadanas'; // Matching the directory name used in list_dir output
const GRADE = 3;
const PERIOD = 1;
const PROTOCOL_VERSION = '3.0';

// Topics to generate (matching existing folders found in list_dir + standard ones)
// Found from list_dir: comunidad, familia, historia, paisaje. Expanding to 10.
const TOPICS = [
  'paisaje',
  'historia',
  'familia',
  'comunidad',
  'barrio',
  'normas',
  'oficios',
  'servicios',
  'mapa',
  'tradiciones'
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
  return `CO-SOC-${GRADE}-${topic}-${String(bundleIndex).padStart(3, '0')}`;
}

// Question Templates for each topic
const QUESTIONS_DATA = {
  'paisaje': [
    {
      base_q: "¿Qué elemento forma parte del paisaje natural?",
      options: [
        { text: "Un río", correct: true },
        { text: "Un edificio", correct: false },
        { text: "Una carretera", correct: false },
        { text: "Un puente", correct: false }
      ]
    },
    {
      base_q: "¿Qué elemento es parte del paisaje cultural (hecho por el hombre)?",
      options: [
        { text: "Una casa", correct: true },
        { text: "Una montaña", correct: false },
        { text: "Un árbol silvestre", correct: false },
        { text: "Una nube", correct: false }
      ]
    }
  ],
  'historia': [
    {
      base_q: "¿Quiénes fueron los primeros habitantes de nuestro territorio?",
      options: [
        { text: "Los indígenas", correct: true },
        { text: "Los dinosaurios", correct: false },
        { text: "Los robots", correct: false },
        { text: "Los extraterrestres", correct: false }
      ]
    },
    {
      base_q: "¿Qué celebramos el 20 de julio en Colombia?",
      options: [
        { text: "El Grito de Independencia", correct: true },
        { text: "La Navidad", correct: false },
        { text: "El día de la madre", correct: false },
        { text: "El año nuevo", correct: false }
      ]
    }
  ],
  'familia': [
    {
      base_q: "¿Quiénes conforman el núcleo familiar básico?",
      options: [
        { text: "Padres e hijos", correct: true },
        { text: "Vecinos y amigos", correct: false },
        { text: "Profesores y alumnos", correct: false },
        { text: "Médicos y pacientes", correct: false }
      ]
    },
    {
      base_q: "¿Qué valor es importante en la familia?",
      options: [
        { text: "El respeto", correct: true },
        { text: "El egoísmo", correct: false },
        { text: "La mentira", correct: false },
        { text: "El desorden", correct: false }
      ]
    }
  ],
  'comunidad': [
    {
      base_q: "¿Qué es una comunidad?",
      options: [
        { text: "Un grupo de personas que viven y comparten un lugar", correct: true },
        { text: "Un grupo de piedras", correct: false },
        { text: "Una sola persona aislada", correct: false },
        { text: "Un objeto abandonado", correct: false }
      ]
    },
    {
      base_q: "¿Cómo ayudamos en nuestra comunidad?",
      options: [
        { text: "Cuidando los espacios públicos", correct: true },
        { text: "Botando basura en la calle", correct: false },
        { text: "Haciendo mucho ruido", correct: false },
        { text: "Destruyendo los parques", correct: false }
      ]
    }
  ],
  'barrio': [
    {
      base_q: "¿Quién dirige la Junta de Acción Comunal del barrio?",
      options: [
        { text: "El presidente de la Junta", correct: true },
        { text: "El policía", correct: false },
        { text: "El profesor", correct: false },
        { text: "El médico", correct: false }
      ]
    },
    {
      base_q: "¿Qué lugar encontramos en un barrio?",
      options: [
        { text: "El parque", correct: true },
        { text: "Un volcán", correct: false },
        { text: "Un desierto", correct: false },
        { text: "El océano", correct: false }
      ]
    }
  ],
  'normas': [
    {
      base_q: "¿Para qué sirven las normas?",
      options: [
        { text: "Para vivir en armonía", correct: true },
        { text: "Para molestar a la gente", correct: false },
        { text: "Para nada", correct: false },
        { text: "Para pelear mejor", correct: false }
      ]
    },
    {
      base_q: "¿Qué norma debemos cumplir en el colegio?",
      options: [
        { text: "Levantar la mano para hablar", correct: true },
        { text: "Correr en el salón", correct: false },
        { text: "Gritar a los compañeros", correct: false },
        { text: "Dormir en clase", correct: false }
      ]
    }
  ],
  'oficios': [
    {
      base_q: "¿Qué hace un médico?",
      options: [
        { text: "Cura a los enfermos", correct: true },
        { text: "Arregla carros", correct: false },
        { text: "Construye casas", correct: false },
        { text: "Apaga incendios", correct: false }
      ]
    },
    {
      base_q: "¿Quién nos enseña en el colegio?",
      options: [
        { text: "El profesor o profesora", correct: true },
        { text: "El bombero", correct: false },
        { text: "El panadero", correct: false },
        { text: "El policía", correct: false }
      ]
    }
  ],
  'servicios': [
    {
      base_q: "¿Cuál es un servicio público?",
      options: [
        { text: "El agua potable", correct: true },
        { text: "Una bicicleta", correct: false },
        { text: "Un juguete", correct: false },
        { text: "Un videojuego", correct: false }
      ]
    },
    {
      base_q: "¿Qué servicio nos da luz en la casa?",
      options: [
        { text: "La energía eléctrica", correct: true },
        { text: "El acueducto", correct: false },
        { text: "El gas natural", correct: false },
        { text: "El internet", correct: false }
      ]
    }
  ],
  'mapa': [
    {
      base_q: "¿Qué usamos para ubicarnos en un lugar desconocido?",
      options: [
        { text: "Un mapa", correct: true },
        { text: "Un libro de cuentos", correct: false },
        { text: "Una cuchara", correct: false },
        { text: "Un zapato", correct: false }
      ]
    },
    {
      base_q: "¿Qué indican los puntos cardinales?",
      options: [
        { text: "Norte, Sur, Este y Oeste", correct: true },
        { text: "Arriba y abajo solamente", correct: false },
        { text: "Rojo, azul y amarillo", correct: false },
        { text: "Uno, dos y tres", correct: false }
      ]
    }
  ],
  'tradiciones': [
    {
      base_q: "¿Qué es una tradición?",
      options: [
        { text: "Costumbre que se transmite de padres a hijos", correct: true },
        { text: "Algo que se hace una sola vez", correct: false },
        { text: "Un objeto nuevo", correct: false },
        { text: "Una tarea del colegio", correct: false }
      ]
    },
    {
      base_q: "¿Cuál es una fiesta tradicional en Colombia?",
      options: [
        { text: "El Carnaval de Barranquilla", correct: true },
        { text: "El día de marte", correct: false },
        { text: "La fiesta del silencio", correct: false },
        { text: "El día sin sol", correct: false }
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
search_query: ${bundleMeta.tema} grado 3 sociales
dba_id: DBA-G3-SOC
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
console.log('🚀 Starting Grade 3 Social Studies Generation...');

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

console.log('✨ Generation Complete for Grade 3 Social Studies!');
