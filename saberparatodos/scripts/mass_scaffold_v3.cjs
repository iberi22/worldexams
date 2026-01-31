const fs = require('fs');
const path = require('path');

const CURRICULUM = {
    3: {
        'matematicas': [{ id: 1, topics: ["sumas", "restas"] }, { id: 2, topics: ["multiplicacion", "tablas"] }, { id: 3, topics: ["geometria", "medidas"] }, { id: 4, topics: ["problemas", "datos"] }],
        'ciencias-naturales': [{ id: 1, topics: ["seres-vivos"] }, { id: 2, topics: ["cuerpo-humano"] }, { id: 3, topics: ["entorno-fisico"] }, { id: 4, topics: ["tierra-universo"] }],
        'sociales-ciudadanas': [{ id: 1, topics: ["familia"] }, { id: 2, topics: ["comunidad"] }, { id: 3, topics: ["paisaje"] }, { id: 4, topics: ["historia"] }],
        'lenguaje': [{ id: 1, topics: ["comprension"] }, { id: 2, topics: ["gramatica"] }, { id: 3, topics: ["cuento"] }, { id: 4, topics: ["vocabulario"] }],
        'ingles': [{ id: 1, topics: ["alphabet"] }, { id: 2, topics: ["colors", "numbers"] }, { id: 3, topics: ["animals"] }, { id: 4, topics: ["family"] }],
        'tecnologia-informatica': [{ id: 1, topics: ["computador"] }, { id: 2, topics: ["mouse-teclado"] }, { id: 3, topics: ["internet"] }, { id: 4, topics: ["seguridad"] }]
    },
    5: {
        'matematicas': [{ id: 1, topics: ["decimales"] }, { id: 2, topics: ["fracciones"] }, { id: 3, topics: ["geometria"] }, { id: 4, topics: ["estadistica"] }],
        'ciencias-naturales': [{ id: 1, topics: ["celula"] }, { id: 2, topics: ["ecosistemas"] }, { id: 3, topics: ["materia"] }, { id: 4, topics: ["energia"] }],
        'sociales-ciudadanas': [{ id: 1, topics: ["constitucion"] }, { id: 2, topics: ["democracia"] }, { id: 3, topics: ["colombia"] }, { id: 4, topics: ["ciudadania"] }],
        'lenguaje': [{ id: 1, topics: ["narrativo"] }, { id: 2, topics: ["gramatica"] }, { id: 3, topics: ["ortografia"] }, { id: 4, topics: ["comprension"] }],
        'ingles': [{ id: 1, topics: ["routines"] }, { id: 2, topics: ["descriptions"] }, { id: 3, topics: ["places"] }, { id: 4, topics: ["weather"] }],
        'tecnologia-informatica': [{ id: 1, topics: ["ofimatica"] }, { id: 2, topics: ["busqueda"] }, { id: 3, topics: ["ciudadania-digital"] }, { id: 4, topics: ["programacion-bloques"] }]
    },
    7: {
        'matematicas': [{ id: 1, topics: ["enteros"] }, { id: 2, topics: ["proporciones"] }, { id: 3, topics: ["algebra"] }, { id: 4, topics: ["geometria"] }],
        'ciencias-naturales': [{ id: 1, topics: ["microorganismos"] }, { id: 2, topics: ["sistemas-cuerpo"] }, { id: 3, topics: ["materia-energia"] }, { id: 4, topics: ["ecologia"] }],
        'sociales-ciudadanas': [{ id: 1, topics: ["geografia"] }, { id: 2, topics: ["historia-media"] }, { id: 3, topics: ["renacimiento"] }, { id: 4, topics: ["demografia"] }],
        'lenguaje': [{ id: 1, topics: ["literatura-juvenil"] }, { id: 2, topics: ["argumentacion"] }, { id: 3, topics: ["puntuacion"] }, { id: 4, topics: ["medios"] }],
        'ingles': [{ id: 1, topics: ["past-simple"] }, { id: 2, topics: ["future"] }, { id: 3, topics: ["comparatives"] }, { id: 4, topics: ["superlatives"] }],
        'tecnologia-informatica': [{ id: 1, topics: ["scratch"] }, { id: 2, topics: ["redes"] }, { id: 3, topics: ["ciberseguridad"] }, { id: 4, topics: ["ia"] }]
    },
    9: {
        'matematicas': [{ id: 1, topics: ["ecuaciones"] }, { id: 2, topics: ["funciones"] }, { id: 3, topics: ["geometria-espacio"] }, { id: 4, topics: ["probabilidad"] }],
        'ciencias-naturales': [{ id: 1, topics: ["genetica"] }, { id: 2, topics: ["sistema-nervioso"] }, { id: 3, topics: ["reacciones"] }, { id: 4, topics: ["fisica-ecologia"] }],
        'sociales-ciudadanas': [{ id: 1, topics: ["historia-xx"] }, { id: 2, topics: ["geopolitica"] }, { id: 3, topics: ["colombia-contemporanea"] }, { id: 4, topics: ["ddhh"] }],
        'lectura-critica': [{ id: 1, topics: ["argumentacion"] }, { id: 2, topics: ["opinion"] }, { id: 3, topics: ["literatura"] }, { id: 4, topics: ["critica"] }],
        'ingles': [{ id: 1, topics: ["present-perfect"] }, { id: 2, topics: ["conditionals"] }, { id: 3, topics: ["passive-voice"] }, { id: 4, topics: ["modals"] }]
    },
    10: {
        'matematicas': [{ id: 1, topics: ["trigonometria"] }, { id: 2, topics: ["conicas"] }, { id: 3, topics: ["limites"] }, { id: 4, topics: ["estadistica"] }],
        'ciencias-naturales': [{ id: 1, topics: ["cinematica"] }, { id: 2, topics: ["quimica-inorganica"] }, { id: 3, topics: ["metabolismo"] }, { id: 4, topics: ["investigacion"] }],
        'sociales-ciudadanas': [{ id: 1, topics: ["politica"] }, { id: 2, topics: ["economia"] }, { id: 3, topics: ["conflicto"] }, { id: 4, topics: ["globalizacion"] }],
        'lectura-critica': [{ id: 1, topics: ["infografia"] }, { id: 2, topics: ["texto-argumentativo"] }, { id: 3, topics: ["filosofia"] }, { id: 4, topics: ["simulacro"] }]
    },
    11: {
        'matematicas': [{ id: 1, topics: ["limites"] }, { id: 2, topics: ["derivadas"] }, { id: 3, topics: ["integrales"] }, { id: 4, topics: ["probabilidad"] }],
        'ciencias-naturales': [{ id: 1, topics: ["quimica-organica"] }, { id: 2, topics: ["biomoleculas"] }, { id: 3, topics: ["termodinamica"] }, { id: 4, topics: ["fisica-moderna"] }],
        'sociales-ciudadanas': [{ id: 1, topics: ["conflicto"] }, { id: 2, topics: ["globalizacion"] }, { id: 3, topics: ["constitucion"] }, { id: 4, topics: ["ambiente"] }],
        'lectura-critica': [{ id: 1, topics: ["literatura"] }, { id: 2, topics: ["tipologia"] }, { id: 3, topics: ["filosofia"] }, { id: 4, topics: ["icfes"] }],
        'ingles': [{ id: 1, topics: ["academic-texts"] }, { id: 2, topics: ["opinion-essays"] }, { id: 3, topics: ["reports"] }, { id: 4, topics: ["global-culture"] }]
    }
};

const BASE_DIR = "src/content/questions";

function normalizeTopic(str) {
    if (!str) return "general";
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "-").replace(/-+/g, '-').trim();
}

function ensureDir(filePath) {
    const dirname = path.dirname(filePath);
    if (!fs.existsSync(dirname)) {
        fs.mkdirSync(dirname, { recursive: true });
    }
}

function generateV3Template(config) {
    const { country, grade, subject, topic, period, index } = config;
    const today = new Date().toISOString().split('T')[0];
    const subjectPrefixMap = {
        'matematicas': 'MAT',
        'ciencias-naturales': 'NAT',
        'sociales-ciudadanas': 'SOC',
        'lectura-critica': 'LEC',
        'ingles': 'ING',
        'filosofia': 'FIL',
        'lenguaje': 'LEN',
        'tecnologia-informatica': 'TEC'
    };
    const subPrefix = subjectPrefixMap[subject] || 'GEN';
    const bundleId = `CO-${subPrefix}-${grade}-${normalizeTopic(topic)}-${index.toString().padStart(3, '0')}`;

    let content = `---
id: "${bundleId}"
country: "${country}"
grado: ${grade}
asignatura: "${subject}"
tema: "${topic}"
periodo: ${period}
protocol_version: "3.0"
total_questions: 10
estado: "draft"
creador: "AI-WorldExams"
creation_date: "${today}"

licenses:
  v1: "CC BY-SA 4.0"
  v2-v10: "CC BY-NC-SA 4.0"

source: "Placeholder"
source_url: "https://example.com"
source_license: "CC BY-SA 4.0"
search_query: "preguntas ${subject} grado ${grade} ${topic}"
---

# Pregunta Base: ${topic} - Bundle ${index}

> **Fuente:** Placeholder
> **Tema:** ${topic} (Periodo ${period})

---

`;

    for (let i = 1; i <= 10; i++) {
        const difficulty = Math.ceil(i / 2);
        const types = ["Muy Fácil A", "Muy Fácil B", "Fácil A", "Fácil B", "Media A", "Media B", "Difícil A", "Difícil B", "Muy Difícil A", "Muy Difícil B"];
        const type = types[i-1];

        content += `## Pregunta ${i} (${type} - Dificultad ${difficulty})

**ID:** \`${bundleId}-v${i}\`

### Enunciado

[Placeholder para pregunta de ${type} sobre ${topic}]

### Opciones

- [x] A) [Opción Correcta]
- [ ] B) [Distractor 1]
- [ ] C) [Distractor 2]
- [ ] D) [Distractor 3]

### Explicación Pedagógica

[Explicación para el nivel de dificultad ${difficulty}]

---

`;
    }

    content += `## 📊 Metadata de Validación

| Pregunta | ID | Dificultad | Validado |
|----------|-----|------------|----------|
`;
    for (let i = 1; i <= 10; i++) {
        content += `| ${i} | ${bundleId}-v${i} | ${Math.ceil(i/2)} | ⬜ |\n`;
    }

    return { content, bundleId };
}

async function runScaffold() {
    console.log("🚀 Starting mass scaffolding V3.0 (COMPREHENSIVE)...");
    let totalFiles = 0;

    for (const [grade, subjects] of Object.entries(CURRICULUM)) {
        for (const [subject, periods] of Object.entries(subjects)) {
            for (const periodObj of periods) {
                const period = periodObj.id;
                const topics = periodObj.topics;

                console.log(`\n📂 Grading G${grade} ${subject} P${period}...`);

                for (let i = 1; i <= 10; i++) {
                    const topic = topics[(i - 1) % topics.length];

                    const { content, bundleId } = generateV3Template({
                        country: 'co',
                        grade: grade,
                        subject: subject,
                        topic: topic,
                        period: period,
                        index: i
                    });

                    const dirPath = path.join(BASE_DIR, 'colombia', subject, `grado-${grade}`, normalizeTopic(topic));
                    const fileName = `${bundleId}-v3-bundle.md`;
                    const fullPath = path.join(dirPath, fileName);

                    if (!fs.existsSync(fullPath)) {
                        ensureDir(fullPath);
                        fs.writeFileSync(fullPath, content);
                        totalFiles++;
                    }
                }
            }
        }
    }

    console.log(`\n✨ Finished! Total files created: ${totalFiles}`);
}

runScaffold().catch(console.error);
