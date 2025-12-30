import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Configuration
const QUESTIONS_DIR = 'src/content/questions';
const OUTPUT_DIR = 'public/api/co/icfes/packs';
const TARGET_PACK_SIZE = 150; // Increased to 150 to support 10 exams of 15 questions
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

          // --- 🆕 Extract shared context from bundle head ---
          let sharedContext = null;
          const head = sections[0];
          const contextMatch = head.match(/>\s*\*\*Contexto:\*\*\s*([\s\S]+?)(?=\n\s*\n|\n\s*---|---|$)/i);
          if (contextMatch) {
            // Clean up blockquote markers from multi-line context
            sharedContext = contextMatch[1].replace(/^>\s*/gm, '').trim();
          }

          sections.forEach((section, index) => {
             if (index === 0) return;

             const idMatch = section.match(/\*\*ID:\*\*\s*`([^`]+)`/);
             const id = idMatch ? idMatch[1] : `${data.id || 'unknown'}-v${index}`;

             // 🆕 Extract per-question context if it exists (overrides shared)
             let questionContext = sharedContext;
             const localContextMatch = section.match(/### Contexto\s+([\s\S]+?)(?=### Enunciado|$)/i);
             if (localContextMatch) {
               questionContext = localContextMatch[1].replace(/^>\s*/gm, '').trim();
             }

             // Simple markdown parsing to extract statement/options
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

             const explanationMatch = section.match(/### (?:Explicación Pedagógica|Explicación|Explanation|Info-Tarjeta|📊 Info-Tarjeta)\s+([\s\S]+?)(?=---|##|$)/i);
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
               category: data.asignatura, // mapping for client
               context: questionContext // 🆕 Include context
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

  // 🆕 Generate current-pack.json for the ACTUAL current week
  // This helps local development and provides a static fallback
  const now = new Date();
  const currentYear = now.getFullYear();

  // Calculate current week number
  const startDate = new Date(currentYear, 0, 1);
  const days = Math.floor((now - startDate) / (24 * 60 * 60 * 1000));
  const currentWeek = Math.ceil(days / 7);
  const currentWeekStr = currentWeek.toString().padStart(2, '0');
  const currentPackId = `PACK-${currentYear}-W${currentWeekStr}`;

  const currentPackPath = path.join('public/api/co/icfes', 'current-pack.json');
  const currentPackData = {
    pack_id: currentPackId,
    generated_at: now.toISOString(),
    next_rotation: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    rotation_days: 7,
    grades: [3, 5, 6, 7, 8, 9, 10, 11],
    country: 'co',
    exam: 'icfes'
  };

  fs.writeFileSync(currentPackPath, JSON.stringify(currentPackData, null, 2));
  console.log(`✅ Generated current-pack metadata at ${currentPackPath}`);
}

generatePacks();
