
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONTENT_DIR = path.join(__dirname, '../src/content/questions');
const PUBLIC_PACKS_DIR = path.join(__dirname, '../public/api/packs');

// --- CONFIGURATION ---
const ANCHOR_DATE = new Date('2025-01-01T00:00:00Z'); // Week 1 starts here
const WEEKS_TO_GENERATE = 52;
const QUESTIONS_PER_WEEK = 100; // Legacy target (all subjects merged)
const QUESTIONS_PER_WEEK_SUBJECT = 120; // New target per subject

// Ensure output directory exists
if (!fs.existsSync(PUBLIC_PACKS_DIR)) {
  fs.mkdirSync(PUBLIC_PACKS_DIR, { recursive: true });
}

// Helper: Get Recursively all .md files
function getFiles(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.join(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(getFiles(file));
        } else if (file.endsWith('.md')) {
            results.push(file);
        }
    });
    return results;
}

function normalizeSubject(subject) {
    return String(subject || '')
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[\s-]+/g, '_')
        .replace(/[^a-z0-9_]/g, '')
        .trim();
}

function inferSubjectFromPath(filePath) {
    const normalizedPath = filePath.replace(/\\/g, '/');
    const parts = normalizedPath.split('/');
    const qIndex = parts.findIndex(p => p === 'questions');
    if (qIndex < 0) return '';

    const countries = new Set(['colombia', 'mexico', 'argentina', 'chile', 'peru', 'brasil']);
    const afterQuestions = parts[qIndex + 1] || '';
    if (countries.has(afterQuestions)) {
        return normalizeSubject(parts[qIndex + 2] || '');
    }
    return normalizeSubject(afterQuestions);
}

function getWindowedSelection(items, week, count) {
    if (!Array.isArray(items) || items.length === 0) return [];
    const startIndex = ((week - 1) * count) % items.length;
    if (startIndex + count <= items.length) {
        return items.slice(startIndex, startIndex + count);
    }
    return [
        ...items.slice(startIndex),
        ...items.slice(0, count - (items.length - startIndex))
    ];
}

// Helper: Parse Question Bundle
function parseBundle(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    return parseMarkdownBundle(content, filePath);
}

function parseMarkdownBundle(content, filePath) {
    const { data: frontmatter, content: body } = matter(content);

    // --- Extract GLOBAL CONTEXT (Preamble) ---
    const firstQuestionMatch = body.match(/^## (?:Pregunta|Question)\s+\d+/m);
    const contextEndIndex = firstQuestionMatch ? firstQuestionMatch.index : 0;

    let globalContext = contextEndIndex ? body.substring(0, contextEndIndex).trim() : '';

    if (globalContext) {
        globalContext = globalContext.replace(/===\s*METADATA\s*GLOBAL\s*===[\s\S]*?(?=#|$)/gi, '');
        globalContext = globalContext.replace(/^\|.*\|$/gm, '');
        globalContext = globalContext.replace(/^\|[-:\s|]+\|$/gm, '');
        globalContext = globalContext.replace(/^---+$/gm, '');
        globalContext = globalContext.replace(/^#\s*Bundle:.*$/gm, '');
        globalContext = globalContext.replace(/^>\s*\*\*Fuente:\*\*.*$/gm, '');
        globalContext = globalContext.replace(/^>\s*\*\*Componente:\*\*.*$/gm, '');
        globalContext = globalContext.replace(/^>\s*\*\*Competencias:\*\*.*$/gm, '');
        // Keep Topic
        // globalContext = globalContext.replace(/^#\s*Topic:.*$/gm, '');
        globalContext = globalContext.replace(/\s*\(Grade\s*\d+\)/gi, '');
        globalContext = globalContext.replace(/\n{3,}/g, '\n\n').trim();
    }

    const questions = [];

    // Split by level-2 headers
    const sections = body.split(/^## /m).slice(1); // Skip preamble

    sections.forEach((section, idx) => {
        const titleLine = section.split('\n')[0].trim();

        // Skip metadata sections (e.g. "📊 Metadata de Validación")
        if (titleLine.includes('Metadata') || titleLine.includes('📊')) return;

        // ID extraction: **ID:** `CO-MAT-...`
        const idMatch = section.match(/\*\*ID:\*\*\s*`([^`]+)`/);
        const id = idMatch ? idMatch[1] : `${frontmatter.id}-v${idx+1}`;

        // Difficulty extraction from title: "Pregunta 7 (Difícil - Dificultad 5)"
        const diffMatch = titleLine.match(/Dificultad\s+(\d)/i) || titleLine.match(/Difficulty:\s+(\d)/i);
        const difficulty = diffMatch ? parseInt(diffMatch[1]) : (frontmatter.dificultad || 3);

        const cefrMatch = titleLine.match(/CEFR:\s*([A-C][1-2]\+?)/i);
        const cefrLevel = cefrMatch ? cefrMatch[1].toUpperCase() : (frontmatter.cefr_level || frontmatter.cefrLevel || undefined);

        // --- Extract QUESTION-SPECIFIC CONTEXT ---
        const contextMatch = section.match(/###\s*(?:Contexto|Context)\s*\n([\s\S]*?)(?=###\s*(?:Enunciado|Question|Opciones|Options))/i);
        const specificContext = contextMatch ? contextMatch[1].trim() : '';

        // --- Extract clean STATEMENT between ### Enunciado and ### Opciones ---
        const enunciadoMatch = section.match(/###\s*Enunciado\s*\n([\s\S]*?)(?=###\s*Opciones)/i);
        const statement = enunciadoMatch
            ? enunciadoMatch[1].trim()
            : ''; // fallback empty

        // --- Extract EXPLANATION after ### Explicación ---
        const explanationMatch = section.match(/###\s*Explicaci[oó]n[^\n]*\n([\s\S]*?)(?=---|$)/i);
        const explanation = explanationMatch
            ? explanationMatch[1].trim()
            : undefined;

        // --- Extract OPTIONS ---
        const options = [];
        const optionsRegex = /- \[(x|X| )\]\s*([A-E])\)\s*(.+?)(?:\s*<!--\s*weight:\s*([0-9]*\.?[0-9]+)\s*-->)?\s*$/gm;
        let match;
        while ((match = optionsRegex.exec(section)) !== null) {
            const explicitWeight = match[4] !== undefined ? Number(match[4]) : undefined;
            const isCorrect = String(match[1]).toLowerCase() === 'x';
            options.push({
                id: match[2],
                text: match[3].trim(),
                isCorrect,
                weight: Number.isFinite(explicitWeight)
                    ? explicitWeight
                    : (isCorrect ? 1 : 0)
            });
        }

        // Only valid questions (must have statement + options)
        if (options.length >= 2 && statement) {
             const normalizedSubject = normalizeSubject(frontmatter.asignatura || inferSubjectFromPath(filePath) || 'general');
             const correctOptionIds = options.filter(o => o.isCorrect).map(o => o.id);
             const optionWeights = Object.fromEntries(options.map(o => [o.id, o.weight ?? (o.isCorrect ? 1 : 0)]));
             const scoringMode = Object.values(optionWeights).some((w) => ![0, 1].includes(Number(w)))
                ? 'weighted'
                : (correctOptionIds.length > 1 ? 'multiple' : 'single');

             questions.push({
                id: id,
                statement: statement,        // Clean text only
                subject: normalizedSubject,
                grade: frontmatter.grado,
                difficulty: difficulty,
                topic: frontmatter.tema,
                tema: frontmatter.tema,
                periodo: frontmatter.periodo || undefined,
                competency: frontmatter.competencia || 'General',
                options: options,
                correctOptionId: correctOptionIds[0],
                correctOptionIds,
                optionWeights,
                scoringMode,
                bundleId: frontmatter.id,
                bundle_id: frontmatter.id,
                explanation: explanation,
                context: [globalContext, specificContext].filter(Boolean).join('\n\n') || undefined, // 🆕 Added context field
                cefr_level: cefrLevel,
                protocol_version: frontmatter.protocol_version || '1.0'
             });
        }
    });

    return questions;
}


// --- MAIN EXECUTION ---
console.log('🚀 Starting Static Pack Generation...');

// 1. Load ALL Questions
const allFiles = getFiles(CONTENT_DIR);
console.log(`📂 Found ${allFiles.length} bundle files.`);

let allQuestions = [];
allFiles.forEach(f => {
    try {
        const qs = parseBundle(f);
        allQuestions.push(...qs);
    } catch (e) {
        console.warn(`⚠️ Failed to parse ${f}: ${e.message}`);
    }
});

console.log(`📚 Parsed ${allQuestions.length} total questions.`);

// 2. Group by Grade
const questionsByGrade = {};
[3, 5, 6, 7, 8, 9, 10, 11].forEach(g => questionsByGrade[g] = {});
const gradeQuestionsLegacy = {};
[3, 5, 6, 7, 8, 9, 10, 11].forEach(g => gradeQuestionsLegacy[g] = []);

allQuestions.forEach(q => {
    if (!gradeQuestionsLegacy[q.grade]) return;
    gradeQuestionsLegacy[q.grade].push(q);

    if (!questionsByGrade[q.grade]) return;
    const subject = normalizeSubject(q.subject || 'general');
    if (!questionsByGrade[q.grade][subject]) {
        questionsByGrade[q.grade][subject] = [];
    }
    questionsByGrade[q.grade][subject].push(q);
});

// 3. Generate Weekly Packs (new: grade + subject)
Object.keys(questionsByGrade).forEach(grade => {
    const gradeNumber = parseInt(grade, 10);
    const subjectMap = questionsByGrade[gradeNumber];
    const subjects = Object.keys(subjectMap);
    console.log(`🎓 Grade ${grade}: ${subjects.length} subjects.`);

    if (subjects.length === 0) return;

    // Keep deterministic order for reproducible output names and composition
    subjects.sort();

    const shuffledBySubject = {};
    subjects.forEach(subject => {
        shuffledBySubject[subject] = [...subjectMap[subject]].sort((a, b) => a.id.localeCompare(b.id));
        console.log(`   📘 ${subject}: ${shuffledBySubject[subject].length} questions`);
    });

    for (let week = 1; week <= WEEKS_TO_GENERATE; week++) {
        for (const subject of subjects) {
            const selected = getWindowedSelection(
                shuffledBySubject[subject],
                week,
                QUESTIONS_PER_WEEK_SUBJECT
            );

            const packData = {
                week: week,
                grade: gradeNumber,
                subject: subject,
                questions: selected,
                generated_at: new Date().toISOString()
            };

            const fileName = `week-${week}-grade-${grade}-subject-${subject}.json`;
            fs.writeFileSync(path.join(PUBLIC_PACKS_DIR, fileName), JSON.stringify(packData));
        }
    }
});

// 4. Generate legacy weekly packs (grade only, backward compatibility)
Object.keys(gradeQuestionsLegacy).forEach(grade => {
    const gradeQuestions = gradeQuestionsLegacy[grade];
    console.log(`🎓 Legacy Grade ${grade}: ${gradeQuestions.length} questions.`);

    if (gradeQuestions.length === 0) return;

    const shuffled = [...gradeQuestions].sort((a, b) => a.id.localeCompare(b.id));

    for (let week = 1; week <= WEEKS_TO_GENERATE; week++) {
        const selected = getWindowedSelection(shuffled, week, QUESTIONS_PER_WEEK);

        const packData = {
            week: week,
            grade: parseInt(grade),
            questions: selected,
            generated_at: new Date().toISOString()
        };

        const fileName = `week-${week}-grade-${grade}.json`;
        fs.writeFileSync(path.join(PUBLIC_PACKS_DIR, fileName), JSON.stringify(packData));
    }
});

// 5. Generate Metadata (Anchor Date)
const metadata = {
    anchor_date: ANCHOR_DATE.toISOString(),
    total_weeks: WEEKS_TO_GENERATE,
    per_subject_pattern: "week-{week}-grade-{grade}-subject-{subject}.json",
    legacy_pattern: "week-{week}-grade-{grade}.json",
    generated_at: new Date().toISOString()
};
fs.writeFileSync(path.join(PUBLIC_PACKS_DIR, 'metadata.json'), JSON.stringify(metadata, null, 2));

console.log('✅ Static Packs Generated Successfully!');
