
import fs from 'fs';
import path from 'path';

const auditDirectory = 'src/content/questions/colombia/';
const filesToFix = [];

const auditFile = (filePath) => {
  const content = fs.readFileSync(filePath, 'utf-8');
  const questions = content.split('---').slice(1); // Split by ---, ignoring frontmatter
  const frontmatter = questions[0];

  const hasPlaceholders = /\[Pendiente\]|TODO: Explicación pendiente|\[Pregunta pendiente\]/.test(content);
  const questionCount = questions.length -1;
  const isLegacyProtocol = !/protocol_version: "3.0"/.test(frontmatter);

  if (hasPlaceholders || questionCount < 11 || isLegacyProtocol) {
    filesToFix.push(filePath);
    console.log(`- ${filePath}`);
    if (hasPlaceholders) console.log(`  - Reason: Contains placeholders`);
    if (questionCount < 11) console.log(`  - Reason: Has ${questionCount} questions (expected 11)`);
    if (isLegacyProtocol) console.log(`  - Reason: Not on Protocol v3.0`);
  }
};

const walkDir = (dir) => {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (path.extname(fullPath) === '.md') {
      auditFile(fullPath);
    }
  });
};

console.log(`Starting audit of ${auditDirectory}...`);
walkDir(auditDirectory);

if (filesToFix.length > 0) {
  console.log(`\nFound ${filesToFix.length} files to fix.`);
} else {
  console.log('\nAudit complete. All files are up to date.');
}
