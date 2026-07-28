#!/usr/bin/env node
/**
 * generate-jules-issues.mjs
 *
 * HISTORICAL / NON-DEFAULT (2026-07-28):
 * Still wired to PROTOCOL_v7.md and validate-bundles-v7.mjs.
 * New generation authority is AGENTS.md Bundle Protocol v5.2 +
 * `npm run validate` (scripts/validate-bundles-v52.mjs).
 * Do not use this script for new Jules waves until rewired (Hermes method pending).
 * See docs/specs/ACTIVE_PROTOCOLS.md.
 *
 * Genera issues para Jules para regenerar bundles que no pasan Protocol v7.
 *
 * Uso:
 *   node scripts/generate-jules-issues.mjs --dry-run   (solo muestra)
 *   node scripts/generate-jules-issues.mjs --execute   (crea issues via gh CLI)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const QUESTIONS_ROOT = path.resolve(__dirname, '..', 'questions_data');
const PROTOCOL_PATH = 'PROTOCOL_v7.md';

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run') || !args.includes('--execute');
const LABEL = 'jules';

function getBundles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) files.push(...getBundles(full));
    else if (e.isFile() && e.name.endsWith('MASTERY-bundle.md')) files.push(full);
  }
  return files;
}

function categorize(filePath) {
  const rel = path.relative(QUESTIONS_ROOT, filePath);
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.startsWith('---')) return null;
  
  const questions = (content.match(/^##\s+(?:Question|Pregunta)\s+\d+/gm) || []);
  if (questions.length === 0) return null;

  const hasPlaceholder = /Opci[oó]n [A-D]|Option [A-D]/.test(content);
  const isEnglishSubject = rel.includes('ingles') && !rel.includes('/lengua') && !rel.includes('/lectura');
  const hasEnglish = !isEnglishSubject && /This is correct|Common mistake|Try applying the formula|Well done/.test(content);

  if (hasPlaceholder || hasEnglish) return { rel, reason: hasPlaceholder ? 'placeholder' : 'english_feedback' };
  return null;
}

function buildIssueBody(country, subject, grade, bundles) {
  const weekRanges = [];
  const bundleDetails = bundles.map(b => {
    const parts = b.rel.split(/[/\\]/);
    const filename = parts.pop();
    const weekMatch = filename.match(/W(\d{2})/);
    if (weekMatch) {
      const w = parseInt(weekMatch[1], 10);
      const topicMatch = filename.match(/\d{4}-W\d{2}-(.+?)-001-MASTERY/);
      const topic = topicMatch ? topicMatch[1].replace(/-/g, ' ') : topicMatch;
      if (topic) weekRanges.push(`W${weekMatch[1]}: ${topic}`);
    }
    return `- \`${filename}\` (${b.reason})`;
  }).join('\n');

  const readmePath = `questions_data/${country}/README.md`;
  const countryName = country.charAt(0).toUpperCase() + country.slice(1);

  return `
## Generar bundles ${countryName} - ${subject} - Grado ${grade}

### 📋 Resumen
- **País:** ${countryName} (\`${country}\`)
- **Materia:** ${subject}
- **Grado:** ${grade}
- **Bundles a regenerar:** ${bundles.length}
- **Preguntas totales:** ${bundles.length * 20}

### ❌ Error detectado
${bundles[0].reason === 'placeholder' 
  ? 'Los bundles existentes tienen opciones placeholder (Opción A/B/C/D sin contenido real). Deben ser reemplazados por bundles con contenido pedagógico real.'
  : 'Los bundles existentes tienen feedback en inglés. Deben ser reemplazados por bundles con feedback y contenido en el idioma local del país.'}

### 📖 Instrucciones para Jules

1. **Leer protocolo:** \`PROTOCOL_v7.md\` — seguirlo estrictamente.
2. **Leer reglas del país:** \`${readmePath}\`
3. **Formato:** \`protocol_version: "7.0"\`, \`tier: "mastery"\`, \`bundle_type: "weekly"\`
4. **Cantidad de preguntas:** 20 por bundle (grado 11)
5. **Calidad:** Contenido real en cada opción, feedback en idioma local, contexto local, sin placeholders, sin inglés.
6. **Distribución semanal sugerida:**

${weekRanges.join('\n')}

### 🗑️ Bundles a reemplazar
Bundles actuales (serán eliminados tras la regeneración):

${bundleDetails}

### ✅ Validación
Después de generar, ejecutar:
\`\`\`bash
node scripts/validate-bundles-v7.mjs questions_data/${country}/${subject}/grado-${grade}/2026/weekly/*.md
\`\`\`

### 📎 Formato de salida
Cada bundle debe ir en:
\`\`\`text
questions_data/${country}/${subject}/grado-${grade}/2026/weekly/{CODE}-${subject.toUpperCase()}-${grade}-2026-W{NN}-{topic}-001-MASTERY-bundle.md
\`\`\`
`;
}

function main() {
  const files = getBundles(QUESTIONS_ROOT);
  const toRegenerate = files.map(categorize).filter(Boolean);

  // Group by country/subject/grade
  const groups = {};
  for (const item of toRegenerate) {
    const parts = item.rel.split(/[/\\]/);
    const country = parts[0];
    // Find subject in path
    const subjectCandidates = ['matematica','matematicas','lengua','lenguaje','lectura-critica','ciencias-naturales','ingles','sociales-ciudadanas','lengua-espanola','portugues','comunicacion','ciencia','espanol','estudios-sociales','lengua-literatura','lengua-castellana-literatura','english-home-language','life-sciences','mathematics','geography','physical-sciences'];
    let subject = parts.find(p => subjectCandidates.includes(p)) || 'unknown';
    // Find grade
    const gradeMatch = parts.find(p => p.match(/^grado-(\d+)$/) || p.match(/^3o-/));
    const grade = gradeMatch || 'unknown';

    const key = `${country}|${subject}|${grade}`;
    if (!groups[key]) groups[key] = [];
    groups[key].push(item);
  }

  console.log('='.repeat(60));
  console.log('JULES ISSUE GENERATOR - Protocol v7');
  console.log('='.repeat(60));
  console.log(`Bundles to regenerate: ${toRegenerate.length}`);
  console.log(`Issues to create: ${Object.keys(groups).length}`);
  console.log('');

  let count = 0;
  for (const [key, bundles] of Object.entries(groups).sort()) {
    count++;
    const [country, subject, grade] = key.split('|');
    const gradeNum = grade.replace('grado-', '');
    const body = buildIssueBody(country, subject, gradeNum, bundles);
    const title = `[Jules] Regenerar bundles ${country}/${subject} G${gradeNum} (${bundles.length} bundles)`;

    if (DRY_RUN) {
      console.log(`[${count}/${Object.keys(groups).length}] ${title}`);
      console.log(body.slice(0, 200) + '...\n');
    } else {
      try {
        const result = execSync(
          `gh issue create --repo iberi22/worldexams --label "${LABEL}" --title "${title.replace(/"/g, '\\"')}" --body "${body.replace(/"/g, '\\"').replace(/`/g, '\\`')}"`,
          { encoding: 'utf8', timeout: 30000 }
        );
        console.log(`✅ Created: ${result.trim()}`);
      } catch (err) {
        console.error(`❌ Error creating issue: ${err.message}`);
      }
    }
  }

  console.log('');
  console.log(`Done. ${DRY_RUN ? '(dry run) run with --execute to create issues' : 'issues created'}`);
}

main();
