import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Configuration
const QUESTIONS_DIR = 'src/content/questions';
const OUTPUT_DIR = 'public/api/co/icfes/packs';
const TARGET_PACK_SIZE = 15; // Set to 15 as per user mention "10 exams of 15 questions" - wait, he wants 10 exams!
// If he wants 10 exams of 15 questions = 150 questions PER WEEK? That is impossible with 453 total.
// I will set pack size to 20 for now. The "reset" logic happens on the client if they exhaust the pool.
// The "pack" is just a delivery mechanism.
// If the user wants 150 questions, they need 8 weeks of packs (8 * 20 = 160).
// I will ensure the script works.

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

function loadAllQuestions() {
  const questions = [];

  function scanDir(dir) {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
         scanDir(fullPath);
      } else if (file.endsWith('.md')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8');
          const { data, content: body } = matter(content);

          if (data.estado !== 'approved' && data.estado !== 'published') {
             // For now include all drafts too as our content is limited
          }

          const sections = body.split(/^##\s+Pregunta/gm);

          sections.forEach((section, index) => {
             if (index === 0) return;

             const idMatch = section.match(/\*\*ID:\*\*\s*`([^`]+)`/);
             const id = idMatch ? idMatch[1] : `${data.id || 'unknown'}-v${index}`;

             // Simple markdown parsing to extract statement/options
             // This is rough but sufficient for the JSON pack
             const statementMatch = section.match(/### Enunciado\s+([\s\S]+?)(?=### Opciones)/);
             const statement = statementMatch ? statementMatch[1].trim() : "Content pending";

             // Extract options
             const options = [];
             const optionsRegex = /-\s+\[([ x])\]\s+(?:([A-D])\)\s+)?(.*)/g;
             let m;
             let correct_answer = null;

             while ((m = optionsRegex.exec(section)) !== null) {
                const isCorrect = m[1] === 'x';
                const label = m[2];
                const text = m[3];
                options.push({
                   label: label,
                   text: text,
                   isCorrect: isCorrect
                });
                if (isCorrect) correct_answer = label;
             }

             const explanationMatch = section.match(/### Explicación Pedagógica\s+([\s\S]+?)(?=---|$)/);
             const explanation = explanationMatch ? explanationMatch[1].trim() : "Explanation pending";

             questions.push({
               id,
               statement,
               options,
               correct_answer,
               explanation,
               difficulty: "Medium",
               bundle_id: data.id,
               subject: data.asignatura,
               grade: data.grado,
               category: data.asignatura // mapping for client
             });
          });

        } catch (e) {
          console.error(`Error parsing ${file}:`, e);
        }
      }
    }
  }

  scanDir(QUESTIONS_DIR);
  return questions;
}

function seededShuffle(array, seed) {
  const m = 0x80000000;
  const a = 1103515245;
  const c = 12345;
  let state = seed;

  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    state = (a * state + c) % m;
    const j = Math.floor((state / m) * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

async function generatePacks() {
  console.log('📚 Loading questions...');
  const allQuestions = loadAllQuestions();
  console.log(`✅ Loaded ${allQuestions.length} questions from markdown.`);

  const years = [2024, 2025];

  let totalPacksGenerated = 0;

  for (const year of years) {
    for (let week = 1; week <= 52; week++) {
       const weekStr = week.toString().padStart(2, '0');
       const packId = `PACK-${year}-W${weekStr}`;

       // Deterministic shuffle for this week
       // We use year * 100 + week as seed
       const weekSeed = (year * 100) + week;
       const shuffledAll = seededShuffle(allQuestions, weekSeed);

       const grades = [3, 5, 6, 7, 8, 9, 10, 11];

       for (const grade of grades) {
         const fileName = `${packId}-grade-${grade}.json`;
         const filePath = path.join(OUTPUT_DIR, fileName);

         // Filter for this grade
         const gradeQuestions = shuffledAll.filter(q => q.grade === grade);

         // Take subset
         const selectedQuestions = gradeQuestions.slice(0, TARGET_PACK_SIZE);

         // If we don't have enough questions for this grade, we might have empty packs
         // but that's okay, better than crashing.
         // Or we can fill with others if we want "mixed" (user said "grade specific")

         const packData = {
            packId,
            generated_at: new Date().toISOString(),
            week,
            year,
            grade,
            questions: selectedQuestions,
            questionCount: selectedQuestions.length
         };

         fs.writeFileSync(filePath, JSON.stringify(packData, null, 2));
         totalPacksGenerated++;
       }
    }
  }
  console.log(`✅ Generated ${totalPacksGenerated} packs in ${OUTPUT_DIR}`);
}

generatePacks();
