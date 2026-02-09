
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { normalizeTopic } from '../saberparatodos/src/config/curriculum';

// Mock Config from curriculum.ts for G3 Math
const G3_MATH = [
    { id: 1, name: "Periodo 1: Números y Operaciones", topics: ["sumas", "restas", "numeros hasta 1000", "dinero", "conteo", "numeros", "numeros-operaciones", "suma-llevando", "resta-prestando"] },
    { id: 2, name: "Periodo 2: Patrones y Multiplicación", topics: ["tablas de multiplicar", "patrones", "secuencias", "doble", "triple", "multiplicacion", "multiplicacion-basica", "tablas"] },
    { id: 3, name: "Periodo 3: Geometría y Medición", topics: ["tiempo", "medidas", "longitud", "figuras", "cuerpos geometricos", "geometria", "medicion-longitud", "geometria-solidos"] },
    { id: 4, name: "Periodo 4: Resolución de Problemas", topics: ["resolucion de problemas", "datos", "graficas", "azar", "problemas", "estadistica-pictogramas", "medicion-datos"] }
];

const BASE_DIR = path.join(process.cwd(), 'saberparatodos/src/content/questions/colombia/matematicas/grado-3');

function countQuestions() {
    console.log('🔍 Analyzing Grade 3 Math Content for Periods...');

    // Find all bundles (recursive)
    const files = findFiles(BASE_DIR);
    console.log(`📂 Found ${files.length} bundle files.`);

    const questionsByPeriod = { 1: 0, 2: 0, 3: 0, 4: 0, unknown: 0 };
    const bundlesByPeriod = { 1: [], 2: [], 3: [], 4: [], unknown: [] };

    files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        const parsed = matter(content);

        // Extract topic from frontmatter or filename
        let topic = parsed.data.tema || '';
        if (!topic) {
             // Fallback to folder name
             const parts = file.split(path.sep);
             topic = parts[parts.length - 2];
        }

        const normTopic = normalizeTopic(topic);
        const tags = (parsed.data.tags || []).map(t => normalizeTopic(t));

        // Check which period it matches
        let matchedPeriod = null;
        for (const p of G3_MATH) {
            const pTopics = p.topics.map(t => normalizeTopic(t));
            if (pTopics.includes(normTopic) || tags.some(t => pTopics.includes(t))) {
                matchedPeriod = p.id;
                break;
            }
        }

        // Count questions (v1-v7 = 7 questions usually)
        // Or specific count logic
        const qCount = 7; // Assuming 7 per bundle for now

        if (matchedPeriod) {
            questionsByPeriod[matchedPeriod] += qCount;
            bundlesByPeriod[matchedPeriod].push(path.basename(file));
        } else {
            questionsByPeriod.unknown += qCount;
            bundlesByPeriod.unknown.push(path.basename(file) + ` (${topic})`);
        }
    });

    console.log('\n📊 Results per Period:');
    for (let p = 1; p <= 4; p++) {
        console.log(`Period ${p}: ${questionsByPeriod[p]} questions (${Math.ceil(questionsByPeriod[p]/7)} bundles)`);
        console.log(`   Topics found: ${G3_MATH[p-1].topics.join(', ')}`);
    }
    console.log(`\nUnknown/Unmatched: ${questionsByPeriod.unknown} questions`);
    // console.log('Unmatched files:', bundlesByPeriod.unknown);
}

function findFiles(dir) {
    let results = [];
    if (!fs.existsSync(dir)) return results;

    const list = fs.readdirSync(dir);
    list.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat && stat.isDirectory()) {
            results = results.concat(findFiles(filePath));
        } else {
            if (file.endsWith('bundle.md') || file.endsWith('.md')) {
                results.push(filePath);
            }
        }
    });
    return results;
}

countQuestions();
