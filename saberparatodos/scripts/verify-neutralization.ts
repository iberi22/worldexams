import fs from 'fs';
import path from 'path';

const FORBIDDEN_STRINGS = [
  'ICFES',
  'MEN',
  'Saber 11',
  'Saber Pro',
  'Colombia Aprende',
  '#FCD116', // Yellow CO
  '#003893', // Blue CO
  '#CE1126'  // Red CO (Common, but check context)
];

const IGNORE_FILES = [
  'countries.config.ts',
  'curriculum.ts',
  'MenGuidelinesContent.svelte',
  'verify-neutralization.ts',
  'node_modules',
  '.git',
  'dist'
];

function scanDirectory(dir: string) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (IGNORE_FILES.some(ignore => fullPath.includes(ignore))) continue;

    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      scanDirectory(fullPath);
    } else if (stats.isFile() && /\.(svelte|astro|ts|tsx|css|json)$/.test(file)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      FORBIDDEN_STRINGS.forEach(forbidden => {
        if (content.includes(forbidden)) {
          // Check if it's actually hardcoded or part of a config check
          // e.g. countryCode === 'CO' is allowed
          if (!content.includes(`countryCode === 'CO'`) && !content.includes(`isColombia`)) {
             console.warn(`⚠️ Potential hardcoded string "${forbidden}" found in: ${fullPath}`);
          }
        }
      });
    }
  }
}

console.log('🚀 Starting WorldExams Neutralization Audit...');
scanDirectory(path.resolve('./src'));
console.log('✅ Audit complete.');
