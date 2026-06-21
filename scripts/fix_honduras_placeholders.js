import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

const BASE_DIR = 'questions_data/honduras';
const TARGET_PATTERN = 'grado-11/2026/weekly';

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (dirPath.includes(TARGET_PATTERN) && file.endsWith('.md')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

async function fixBundle(filepath) {
  const content = fs.readFileSync(filepath, 'utf8');
  if (!content.includes('Opcion B')) {
    console.log(`Skipping ${filepath} (no placeholders found)`);
    return;
  }

  console.log(`Fixing ${filepath}...`);

  const asignaturaMatch = content.match(/asignatura: "(.*)"/);
  const asignatura = asignaturaMatch ? asignaturaMatch[1] : 'unknown';
  const language = asignatura === 'ingles' ? 'English' : 'Spanish';

  const prompt = `
You are an expert educator. I have a question bundle for Honduras Grade 11 ${asignatura} that has placeholder distractors (Opcion B, Opcion C, Opcion D).
Your task is to replace these placeholders with plausible, high-quality distractors and personalized feedback.
Also, provide a 3-5 line "Explicacion Pedagogica" for each question.

RULES:
1. Keep the Frontmatter, Question IDs, Bloom levels, and Competencies exactly as they are.
2. Keep Option A (the correct answer) exactly as it is.
3. Replace "- [ ] B) Opcion B", "- [ ] C) Opcion C", and "- [ ] D) Opcion D" with real distractors.
4. Each distractor MUST have a unique feedback in HTML comment: <!-- feedback: ... --> explaining why it is incorrect.
5. The language of the content must be ${language}.
6. Return the FULL markdown file.

Original Content:
${content}
`;

  const promptFile = `.tmp_prompt_${path.basename(filepath)}.txt`;
  fs.writeFileSync(promptFile, prompt);

  try {
    // Added --pure to avoid agent overhead
    const { stdout } = await execAsync(`opencode run "Follow instructions in ${promptFile}. Return ONLY the fixed markdown starting with ---." -m opencode/big-pickle --pure`);

    if (stdout) {
      let fixedContent = stdout.trim();
      const startIndex = fixedContent.indexOf('---');
      if (startIndex !== -1) {
        fixedContent = fixedContent.substring(startIndex);
      }

      // Basic validation: check if Opcion B is still there
      if (fixedContent.includes('Opcion B')) {
        console.warn(`Warning: LLM returned content with 'Opcion B' still present in ${filepath}`);
      } else {
        fs.writeFileSync(filepath, fixedContent);
        console.log(`Successfully fixed ${filepath}`);
      }
    }
  } catch (error) {
    console.error(`Error fixing ${filepath}:`, error);
  } finally {
    if (fs.existsSync(promptFile)) fs.unlinkSync(promptFile);
  }
}

async function main() {
  const allFiles = getAllFiles(BASE_DIR);
  const filesToFix = allFiles.filter(f => fs.readFileSync(f, 'utf8').includes('Opcion B'));

  console.log(`Found ${filesToFix.length} files to fix.`);

  const testMode = process.argv.includes('--test');
  if (testMode) {
    console.log("Running in TEST mode (1 file)");
    if (filesToFix.length > 0) {
      await fixBundle(filesToFix[0]);
    }
    return;
  }

  for (const file of filesToFix) {
    await fixBundle(file);
  }
}

main().catch(console.error);
