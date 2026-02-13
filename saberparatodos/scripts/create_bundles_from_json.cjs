const fs = require('fs');
const path = require('path');

const ARGS = process.argv.slice(2);
if (ARGS.length < 1) {
  console.error("Usage: node scripts/create_bundles_from_json.js <data_file.json>");
  process.exit(1);
}

const DATA_FILE = ARGS[0];
const BASE_DIR = path.join(__dirname, '..', 'src', 'content', 'questions');

// Mapping for subject folder names
const SUBJECT_MAP = {
  'matematicas': 'matematicas',
  'ciencias': 'ciencias-naturales',
  'sociales': 'sociales-ciudadanas',
  'ingles': 'ingles'
};

const SUBJECT_CODE = {
  'matematicas': 'MAT',
  'ciencias': 'CN',
  'sociales': 'SOC',
  'ingles': 'ING'
};

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function createBundleMarkdown(bundle) {
  const { country, grade, subject, period, topic, topicSlug, questions } = bundle;
  const subjFolder = SUBJECT_MAP[subject] || subject;
  const subjCode = SUBJECT_CODE[subject] || subject.substring(0, 3).toUpperCase();
  const countryCode = 'CO'; // Hardcoded for now based on task

  // ID format: CO-MAT-3-sumas-001
  const bundleId = `${countryCode}-${subjCode}-${grade}-${topicSlug}-001`;

  const frontmatter = `---
id: "${bundleId}"
country: "co"
grado: ${grade}
asignatura: "${subject}"
tema: "${topic}"
periodo: ${period}
protocol_version: "3.0"
total_questions: 10
estado: "approved"
creador: "Antigravity-Agent"
generation_date: "${new Date().toISOString().split('T')[0]}"
licenses:
  v1: "CC BY-SA 4.0"
  v2-v10: "CC BY-NC-SA 4.0"
source: "Mineducacion Colombia - DBA"
source_url: "https://www.mineducacion.gov.co/portal/men/Publicaciones/Guias/340021:Derechos-Basicos-de-Aprendizaje-DBA"
source_license: "CC BY-SA 4.0"
search_query: "DBA ${subject} grado ${grade} colombia"
---

# Pregunta Base: ${questions[0].statement.substring(0, 50)}...

> **Fuente:** Derechos Básicos de Aprendizaje (DBA) Colombia
> **Tema:** ${topic}

---
`;

  let content = frontmatter;

  questions.forEach((q, idx) => {
    // Difficulty map: 0,1 -> 1; 2,3 -> 2; 4,5 -> 3; 6,7 -> 4; 8,9 -> 5
    const diffMap = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5];
    const difficulty = diffMap[idx];
    const version = `v${idx + 1}`;
    const qId = `${bundleId}-${version}`;

    // Difficulty Label
    const diffLabels = [
      "Muy Fácil A", "Muy Fácil B",
      "Fácil A", "Fácil B",
      "Media A", "Media B",
      "Difícil A", "Difícil B",
      "Muy Difícil A", "Muy Difícil B"
    ];

    content += `
## Pregunta ${idx + 1} (${diffLabels[idx]} - Dificultad ${difficulty})

**ID:** \`${qId}\`

### Enunciado

${q.statement}

### Opciones

${q.options.map(o => `- [${o.correct ? 'x' : ' '}] ${o.letter}) ${o.text}`).join('\n')}

### Explicación Pedagógica

${q.explanation}

---
`;
  });

  return {
    path: path.join(BASE_DIR, 'colombia', subjFolder, `grado-${grade}`, topicSlug),
    filename: `${bundleId}-v3-bundle.md`,
    content: content
  };
}

// Main execution
try {
  const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
  console.log(`Processing ${data.length} bundles...`);

  data.forEach(bundle => {
    const result = createBundleMarkdown(bundle);
    ensureDir(result.path);
    const fullPath = path.join(result.path, result.filename);
    fs.writeFileSync(fullPath, result.content);
    console.log(`✅ Created: ${path.relative(BASE_DIR, fullPath)}`);
  });

} catch (e) {
  console.error("Error:", e.message);
  process.exit(1);
}
