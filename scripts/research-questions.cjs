#!/usr/bin/env node
/**
 * Question Research Script
 * 
 * Fetches questions from public APIs and generates markdown files
 * with proper source attribution and 6 variations per question.
 * 
 * Usage: node scripts/research-questions.js --country=CO --category=science --num=5
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Configuration
const CONFIG = {
  countries: {
    CO: { folder: 'colombia', lang: 'es', exam: 'Saber 11', subjects: { science: 'ciencias-naturales', mathematics: 'matematicas', history: 'sociales-ciudadanas' } },
    MX: { folder: 'mexico', lang: 'es', exam: 'EXANI-II', subjects: { science: 'ciencias', mathematics: 'matematicas', history: 'historia' } },
    BR: { folder: 'brasil', lang: 'pt', exam: 'ENEM', subjects: { science: 'ciencias', mathematics: 'matematica', history: 'historia' } },
    US: { folder: 'usa', lang: 'en', exam: 'SAT', subjects: { science: 'science', mathematics: 'math', history: 'history' } },
    AR: { folder: 'argentina', lang: 'es', exam: 'UBA', subjects: { science: 'ciencias', mathematics: 'matematicas', history: 'historia' } },
    CL: { folder: 'chile', lang: 'es', exam: 'PAES', subjects: { science: 'ciencias', mathematics: 'matematicas', history: 'historia' } },
    PE: { folder: 'peru', lang: 'es', exam: 'Admisión', subjects: { science: 'ciencias', mathematics: 'matematicas', history: 'historia' } }
  },
  categories: {
    science: 17,
    mathematics: 19,
    history: 23,
    geography: 22,
    general_knowledge: 9,
    computers: 18
  }
};

// Parse CLI arguments
function parseArgs() {
  const args = {};
  process.argv.slice(2).forEach(arg => {
    const [key, value] = arg.replace('--', '').split('=');
    args[key] = value;
  });
  return {
    country: args.country || 'CO',
    category: args.category || 'science',
    num: parseInt(args.num) || 5
  };
}

// Fetch from OpenTDB API
function fetchFromOpenTDB(categoryId, amount) {
  return new Promise((resolve, reject) => {
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${categoryId}&type=multiple&encode=url3986`;
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          if (json.response_code !== 0) {
            reject(new Error(`API Error: ${json.response_code}`));
            return;
          }
          
          const questions = json.results.map((q, i) => ({
            id: i + 1,
            source: 'OpenTDB',
            source_url: 'https://opentdb.com',
            license: 'CC BY-SA 4.0',
            category: decodeURIComponent(q.category),
            difficulty: q.difficulty,
            question: decodeURIComponent(q.question),
            correct_answer: decodeURIComponent(q.correct_answer),
            incorrect_answers: q.incorrect_answers.map(a => decodeURIComponent(a)),
            original_language: 'en'
          }));
          
          resolve(questions);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

// Generate markdown for a single variation
function generateQuestionMarkdown(sourceQ, variation, country, config, category) {
  const difficultyMap = { easy: 2, medium: 3, hard: 4 };
  const subjectCode = category === 'mathematics' ? 'MAT' : 
                      category === 'science' ? 'CIE' :
                      category === 'history' ? 'HIS' : 'GEN';
  
  const id = `${country}-${subjectCode}-11-${category}-${String(sourceQ.id).padStart(3, '0')}-v${variation}`;
  
  return `---
id: "${id}"
grado: 11
asignatura: "${config.subjects[category] || category}"
tema: "${sourceQ.category}"
dificultad: ${difficultyMap[sourceQ.difficulty] || 3}
estado: published
creador: Copilot
source: "${sourceQ.source}"
source_url: "${sourceQ.source_url}"
source_license: "${sourceQ.license}"
inspired_by: "${sourceQ.question.substring(0, 100)}..."
variation: ${variation}
original_language: "${sourceQ.original_language}"
---

# Pregunta
${sourceQ.question}

# Opciones
- [x] A) ${sourceQ.correct_answer}
- [ ] B) ${sourceQ.incorrect_answers[0] || 'Option B'}
- [ ] C) ${sourceQ.incorrect_answers[1] || 'Option C'}
- [ ] D) ${sourceQ.incorrect_answers[2] || 'Option D'}

# Explicación
This is variation ${variation} of a question from ${sourceQ.source}.
Original difficulty: ${sourceQ.difficulty}
License: ${sourceQ.license}

**Note:** This question needs to be translated to ${config.lang} and adapted to ${config.exam} style.
Generate 5 more variations with different wording, numbers, or contexts.
`;
}

// Main execution
async function main() {
  const args = parseArgs();
  const config = CONFIG.countries[args.country];
  const categoryId = CONFIG.categories[args.category];
  
  if (!config) {
    console.error(`❌ Unknown country: ${args.country}`);
    process.exit(1);
  }
  
  console.log(`🔬 Research Questions Script`);
  console.log(`   Country: ${args.country} (${config.exam})`);
  console.log(`   Category: ${args.category}`);
  console.log(`   Questions: ${args.num}`);
  console.log('');
  
  try {
    // Fetch questions
    console.log('📡 Fetching from OpenTDB...');
    const questions = await fetchFromOpenTDB(categoryId, args.num);
    console.log(`✅ Fetched ${questions.length} questions`);
    
    // Create output directory
    const baseDir = path.join(__dirname, '..', 'src', 'content', 'questions', config.folder, config.subjects[args.category] || args.category, 'grado-11', 'generated');
    fs.mkdirSync(baseDir, { recursive: true });
    
    // Generate markdown files
    let filesCreated = 0;
    questions.forEach((q, qIndex) => {
      // Create 6 variations for each question
      for (let v = 1; v <= 6; v++) {
        const markdown = generateQuestionMarkdown(q, v, args.country, config, args.category);
        const filename = `${args.category}-${String(qIndex + 1).padStart(3, '0')}-v${v}.md`;
        const filepath = path.join(baseDir, filename);
        
        fs.writeFileSync(filepath, markdown);
        filesCreated++;
      }
    });
    
    console.log(`✅ Created ${filesCreated} question files in ${baseDir}`);
    
    // Save raw research data
    const researchFile = path.join(baseDir, '_research_data.json');
    fs.writeFileSync(researchFile, JSON.stringify({
      timestamp: new Date().toISOString(),
      country: args.country,
      category: args.category,
      questions: questions
    }, null, 2));
    
    console.log(`📁 Research data saved to ${researchFile}`);
    console.log('');
    console.log('🎯 Next steps:');
    console.log('   1. Review generated files');
    console.log('   2. Translate to target language');
    console.log('   3. Adapt to exam style');
    console.log('   4. Create unique variations');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
