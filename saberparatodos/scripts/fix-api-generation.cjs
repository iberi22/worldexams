const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../src/content/questions/colombia');
const OUTPUT_DIR = path.join(__dirname, '../public/api/co/icfes');

const SUBJECT_MAPPING = {
    "matematicas": "matematicas",
    "ciencias-naturales": "ciencias_naturales",
    "sociales-ciudadanas": "sociales_y_ciudadanas",
    "lectura-critica": "lectura_critica",
    "ingles": "ingles",
    "filosofia": "filosofia",
    "tecnologia-informatica": "tecnologia_informatica",
    "lenguaje": "lenguaje"
};

function parseMarkdown(content, id) {
    const questions = [];
    const sections = content.split(/^##\s+Pregunta/gm);

    sections.forEach((section, index) => {
        if (index === 0) return; // Skip header

        // Extract ID
        const idMatch = section.match(/\*\*ID:\*\*\s*`([^`]+)`/);
        const questionId = idMatch ? idMatch[1] : `${id}-v${index}`;

        // Extract Statement
        const statementMatch = section.match(/### Enunciado\s+([\s\S]+?)(?=### Opciones)/);
        const statement = statementMatch ? statementMatch[1].trim() : "";

        // Extract Options
        const options = [];
        const optionsRegex = /-\s+\[([ xX])\]\s+(?:([A-D])\)\s+)?(.*)/g;
        let m;
        let correctOptionId = null;

        while ((m = optionsRegex.exec(section)) !== null) {
            const isCorrect = m[1].toLowerCase() === 'x';
            const letter = m[2] || String.fromCharCode(65 + options.length);
            const text = m[3].trim();

            options.push({
                letter: letter,
                text: text,
                is_correct: isCorrect
            });

            if (isCorrect) correctOptionId = letter;
        }

        // Extract Explanation
        const explanationMatch = section.match(/### (?:Explicación Pedagógica|Explicación)\s+([\s\S]+?)(?=---|##|$)/i);
        const explanation = explanationMatch ? explanationMatch[1].trim() : "";

        if (statement && options.length >= 2) {
            questions.push({
                id: questionId,
                statement: statement,
                options: options,
                correct_answer: correctOptionId,
                explanation: explanation,
                difficulty: 3 // Default
            });
        }
    });

    return questions;
}

function process() {
    console.log('🚀 Starting API regeneration...');

    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    const subjects = fs.readdirSync(CONTENT_DIR);

    subjects.forEach(subjectFolder => {
        const subjectPath = path.join(CONTENT_DIR, subjectFolder);
        if (!fs.statSync(subjectPath).isDirectory() || subjectFolder.startsWith('_')) return;

        const apiSubject = SUBJECT_MAPPING[subjectFolder] || subjectFolder.replace(/-/g, '_');
        console.log(`Processing ${subjectFolder} -> ${apiSubject}`);

        const grades = fs.readdirSync(subjectPath);

        grades.forEach(gradeFolder => {
            if (!gradeFolder.startsWith('grado-')) return;
            const grade = parseInt(gradeFolder.replace('grado-', ''));
            const gradePath = path.join(subjectPath, gradeFolder);

            const files = fs.readdirSync(gradePath).filter(f => f.endsWith('.md'));
            let allQuestions = [];

            files.forEach(file => {
                const content = fs.readFileSync(path.join(gradePath, file), 'utf-8');
                const questions = parseMarkdown(content, file.replace('.md', ''));
                allQuestions = [...allQuestions, ...questions];
            });

            if (allQuestions.length > 0) {
                // Paginate
                const pageSize = 10;
                const totalPages = Math.ceil(allQuestions.length / pageSize);

                const outputGradeDir = path.join(OUTPUT_DIR, String(grade), apiSubject);
                if (!fs.existsSync(outputGradeDir)) {
                    fs.mkdirSync(outputGradeDir, { recursive: true });
                }

                for (let i = 0; i < totalPages; i++) {
                    const pageQuestions = allQuestions.slice(i * pageSize, (i + 1) * pageSize);
                    const output = {
                        page: i + 1,
                        total_pages: totalPages,
                        total_questions: allQuestions.length,
                        questions: pageQuestions
                    };
                    fs.writeFileSync(path.join(outputGradeDir, `${i + 1}.json`), JSON.stringify(output, null, 2));
                }

                // Write index
                fs.writeFileSync(path.join(outputGradeDir, 'index.json'), JSON.stringify({
                    total_questions: allQuestions.length,
                    pages: totalPages
                }, null, 2));

                console.log(`  ✅ Grade ${grade}: ${allQuestions.length} questions generated.`);
            }
        });
    });

    console.log('✨ API regeneration complete!');
}

process();
