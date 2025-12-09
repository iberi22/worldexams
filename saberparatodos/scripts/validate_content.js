import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const QUESTIONS_DIR = path.join(__dirname, '../src/content/questions');

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  cyan: "\x1b[36m",
};

// Recursive function to get all markdown files
function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.md')) {
        arrayOfFiles.push(path.join(dirPath, file));
      }
    }
  });

  return arrayOfFiles;
}

/**
 * Detect if a file is a bundle (multiple questions) or single question
 */
function isBundle(data) {
  return data.bundle_version || data.total_questions || 
         (data.difficulty_distribution && data.id?.includes('-bundle'));
}

/**
 * Validate a single question format (legacy)
 */
function validateSingleQuestion(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: body } = matter(content);
  const errors = [];

  // 1. Validate YAML Frontmatter
  const requiredFields = [
    'id', 'grado', 'asignatura', 'tema', 'dificultad', 'estado', 'creador',
    'llm_model', 'agent', 'ide'
  ];

  requiredFields.forEach(field => {
    if (!data[field]) {
      errors.push(`Missing YAML field: ${field}`);
    }
  });

  // Check for source or source_id
  if (!data.source && !data.source_id) {
    errors.push(`Missing YAML field: source or source_id`);
  }

  if (data.grado && (data.grado < 3 || data.grado > 11)) {
    errors.push(`Invalid 'grado': ${data.grado}. Must be between 3 and 11.`);
  }

  if (data.dificultad && (data.dificultad < 1 || data.dificultad > 5)) {
    errors.push(`Invalid 'dificultad': ${data.dificultad}. Must be between 1 and 5.`);
  }

  // 2. Validate Markdown Sections
  if (!body.includes('# Pregunta')) errors.push("Missing section: '# Pregunta'");
  if (!body.includes('# Opciones')) errors.push("Missing section: '# Opciones'");
  if (!body.includes('# Explicación')) errors.push("Missing section: '# Explicación'");

  // 3. Validate Options
  const optionsMatch = body.match(/# Opciones\s+([\s\S]*?)(?=\n# Explicación|$)/);
  if (optionsMatch) {
    const optionsBlock = optionsMatch[1].trim();
    const optionLines = optionsBlock.split('\n').filter(line => line.trim().length > 0);

    if (optionLines.length < 2) {
      errors.push(`Too few options. Found ${optionLines.length}, expected at least 2.`);
    }

    let correctCount = 0;
    optionLines.forEach(line => {
      if (line.match(/- \[(x|X)\]/)) {
        correctCount++;
      } else if (!line.match(/- \[ \]/)) {
        errors.push(`Invalid option format: "${line}". Expected "- [ ] ..." or "- [x] ..."`);
      }
    });

    if (correctCount === 0) errors.push("No correct option marked (use [x]).");
    if (correctCount > 1) errors.push(`Multiple correct options marked (${correctCount}). Only 1 allowed.`);
  }

  return { errors, type: 'single', questionCount: 1 };
}

/**
 * Validate a bundle file (Protocol v2.0 - multiple questions)
 */
function validateBundle(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: body } = matter(content);
  const errors = [];
  const warnings = [];

  // 1. Validate Bundle YAML Frontmatter
  const requiredBundleFields = [
    'id', 'grado', 'asignatura', 'tema', 'dificultad', 'estado', 'creador',
    'llm_model', 'agent', 'ide', 'bundle_version', 'total_questions'
  ];

  requiredBundleFields.forEach(field => {
    if (data[field] === undefined || data[field] === null || data[field] === '') {
      errors.push(`Missing YAML field: ${field}`);
    }
  });

  // Check for source or source_id
  if (!data.source && !data.source_id) {
    errors.push(`Missing YAML field: source or source_id`);
  }

  if (data.grado && (data.grado < 3 || data.grado > 11)) {
    errors.push(`Invalid 'grado': ${data.grado}. Must be between 3 and 11.`);
  }

  if (data.dificultad && (data.dificultad < 1 || data.dificultad > 5)) {
    errors.push(`Invalid 'dificultad': ${data.dificultad}. Must be between 1 and 5.`);
  }

  // 2. Count questions in bundle (## Pregunta N or ## Question N pattern)
  const questionMatches = body.match(/^## (?:Pregunta|Question) \d+/gm) || [];
  const questionCount = questionMatches.length;

  if (data.total_questions && questionCount !== data.total_questions) {
    warnings.push(`Question count mismatch: YAML says ${data.total_questions}, found ${questionCount}`);
  }

  if (questionCount < 1) {
    errors.push("No questions found. Expected '## Pregunta N' sections.");
  }

  // 3. Validate each question in the bundle
  // Split body into question blocks, starting from "## Pregunta" or "## Question"
  const questionBlocks = body.split(/(?=^## (?:Pregunta|Question) \d+)/m).filter(block => 
    block.trim() && block.match(/^## (?:Pregunta|Question) \d+/)
  );
  
  questionBlocks.forEach((block, index) => {
    const questionNum = index + 1;
    
    // Check for ### Enunciado or ### Question section (bilingual support)
    if (!block.includes('### Enunciado') && !block.includes('### Question')) {
      errors.push(`Pregunta ${questionNum}: Missing '### Enunciado' or '### Question' section`);
    }

    // Check for ### Opciones or ### Options section (bilingual support)
    if (!block.includes('### Opciones') && !block.includes('### Options')) {
      errors.push(`Pregunta ${questionNum}: Missing '### Opciones' or '### Options' section`);
    }

    // Check for ### Explicación or ### Explanation section (bilingual support)
    if (!block.includes('### Explicación') && !block.includes('### Explanation')) {
      errors.push(`Pregunta ${questionNum}: Missing '### Explicación' or '### Explanation' section`);
    }

    // Validate options format (bilingual)
    const optionsMatch = block.match(/### (?:Opciones|Options)\s+([\s\S]*?)(?=\n### (?:Explicación|Explanation)|$)/);
    if (optionsMatch) {
      const optionsBlock = optionsMatch[1].trim();
      const optionLines = optionsBlock.split('\n').filter(line => 
        line.trim().startsWith('- [')
      );

      if (optionLines.length < 2) {
        errors.push(`Pregunta ${questionNum}: Too few options. Found ${optionLines.length}, expected at least 2.`);
      }

      let correctCount = 0;
      optionLines.forEach(line => {
        if (line.match(/- \[(x|X)\]/)) {
          correctCount++;
        }
      });

      if (correctCount === 0) {
        errors.push(`Pregunta ${questionNum}: No correct option marked (use [x]).`);
      }
      if (correctCount > 1) {
        errors.push(`Pregunta ${questionNum}: Multiple correct options marked (${correctCount}). Only 1 allowed.`);
      }
    }
  });

  return { errors, warnings, type: 'bundle', questionCount };
}

/**
 * Main validation function - detects format and validates accordingly
 */
function validateQuestion(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(content);

  if (isBundle(data)) {
    return validateBundle(filePath);
  } else {
    return validateSingleQuestion(filePath);
  }
}

function main() {
  console.log(`${colors.blue}Starting Content Validation...${colors.reset}\n`);

  // Check if specific files were passed as arguments
  const args = process.argv.slice(2);
  let files = [];

  if (args.length > 0) {
    // Validate only specified files
    files = args.filter(file => file.endsWith('.md') && fs.existsSync(file));
    if (files.length === 0) {
      console.log(`${colors.yellow}No valid markdown files provided.${colors.reset}`);
      process.exit(0);
    }
    console.log(`${colors.cyan}Validating ${files.length} specified file(s)...${colors.reset}\n`);
  } else {
    // Validate all files in questions directory
    if (!fs.existsSync(QUESTIONS_DIR)) {
      console.error(`${colors.red}Error: Questions directory not found at ${QUESTIONS_DIR}${colors.reset}`);
      process.exit(1);
    }
    files = getAllFiles(QUESTIONS_DIR);
  }

  let hasErrors = false;
  let passedCount = 0;
  let totalQuestions = 0;
  let bundleCount = 0;
  let singleCount = 0;

  files.forEach(filePath => {
    const result = validateQuestion(filePath);
    const relativePath = path.relative(process.cwd(), filePath);

    if (result.errors && result.errors.length > 0) {
      hasErrors = true;
      console.log(`${colors.red}❌ ${relativePath}${colors.reset} (${result.type})`);
      result.errors.forEach(err => console.log(`   ${colors.red}✗${colors.reset} ${err}`));
    } else {
      passedCount++;
      const icon = result.type === 'bundle' ? '📦' : '📄';
      console.log(`${colors.green}✅ ${relativePath}${colors.reset} ${icon} (${result.questionCount} preguntas)`);
    }

    // Show warnings if any
    if (result.warnings && result.warnings.length > 0) {
      result.warnings.forEach(warn => console.log(`   ${colors.yellow}⚠${colors.reset} ${warn}`));
    }

    totalQuestions += result.questionCount || 0;
    if (result.type === 'bundle') bundleCount++;
    else singleCount++;
  });

  console.log(`\n${colors.blue}═══════════════════════════════════════${colors.reset}`);
  console.log(`${colors.blue}Summary:${colors.reset}`);
  console.log(`${colors.blue}═══════════════════════════════════════${colors.reset}`);
  console.log(`Total Files:      ${files.length}`);
  console.log(`  📦 Bundles:     ${bundleCount}`);
  console.log(`  📄 Single:      ${singleCount}`);
  console.log(`Total Questions:  ${colors.cyan}${totalQuestions}${colors.reset}`);
  console.log(`Passed:           ${colors.green}${passedCount}${colors.reset}`);
  console.log(`Failed:           ${hasErrors ? colors.red : colors.green}${files.length - passedCount}${colors.reset}`);

  if (hasErrors) {
    console.log(`\n${colors.red}❌ Validation Failed. Please fix the errors above.${colors.reset}`);
    process.exit(1);
  } else {
    console.log(`\n${colors.green}✅ All validations passed! 🚀${colors.reset}`);
    process.exit(0);
  }
}

main();
