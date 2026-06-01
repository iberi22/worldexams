import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.join(__dirname, '..');

const DIRECTORIES = [
  path.join(ROOT, 'questions_data'),
  path.join(ROOT, 'saberparatodos', 'src', 'content', 'questions')
];

// Helper to recursively find markdown files
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (file.endsWith('.md')) {
      results.push(fullPath);
    }
  });
  return results;
}

// Map grade to CEFR level
function inferCefr(grado, filePath, yamlContent) {
  const normalizedPath = filePath.toLowerCase();
  const normalizedYaml = yamlContent.toLowerCase();

  // Explicit checks in path/content
  if (normalizedPath.includes('b2') || normalizedYaml.includes('cefr: b2') || normalizedYaml.includes('level: b2')) return 'B2';
  if (normalizedPath.includes('b1') || normalizedYaml.includes('cefr: b1') || normalizedYaml.includes('level: b1')) return 'B1';
  if (normalizedPath.includes('a2') || normalizedYaml.includes('cefr: a2') || normalizedYaml.includes('level: a2')) return 'A2';
  if (normalizedPath.includes('a1') || normalizedYaml.includes('cefr: a1') || normalizedYaml.includes('level: a1')) return 'A1';
  if (normalizedPath.includes('c1') || normalizedYaml.includes('cefr: c1') || normalizedYaml.includes('level: c1')) return 'C1';

  const g = parseInt(grado, 10);
  if (isNaN(g)) return 'B1'; // default safe middle-ground

  if (g >= 3 && g <= 5) return 'A1';
  if (g >= 6 && g <= 8) return 'A2';
  if (g >= 9 && g <= 10) return 'B1';
  if (g === 11) {
    if (normalizedPath.includes('avanzado') || normalizedPath.includes('advanced') || normalizedPath.includes('idioms') || normalizedPath.includes('collocations')) {
      return 'B2';
    }
    return 'B1';
  }
  return 'B1';
}

function migrateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');

  // Detect if frontmatter starts with ---
  let yamlStr = '';
  let restOfContent = '';
  let hasThinkBlock = false;
  let thinkContent = '';

  const trimmed = content.trim();

  if (trimmed.startsWith('---')) {
    // Normal file starting with frontmatter
    const parts = content.split('---');
    if (parts.length >= 3) {
      yamlStr = parts[1];
      restOfContent = parts.slice(2).join('---');
    } else {
      console.warn(`[WARN] File has malformed frontmatter: ${filePath}`);
      return false;
    }
  } else {
    // Structural issues (e.g. starting with <think> or ```yaml)
    console.log(`[STRUCT] Fixing malformed start in: ${filePath}`);

    // Check if it starts directly with frontmatter keys but lacks --- boundaries
    if (trimmed.startsWith('layout:') || trimmed.startsWith('subject:') || trimmed.startsWith('id:') || trimmed.startsWith('grade:')) {
      console.log(`  -> Detected frontmatter without delimiters`);
      const lines = content.split('\n');
      let emptyLineIdx = -1;
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === '') {
          emptyLineIdx = i;
          break;
        }
      }
      if (emptyLineIdx !== -1) {
        yamlStr = lines.slice(0, emptyLineIdx).join('\n');
        restOfContent = lines.slice(emptyLineIdx).join('\n');
      }
    } else {
      // Check for think block
      if (content.includes('<think>')) {
        hasThinkBlock = true;
        const thinkStart = content.indexOf('<think>');
        const thinkEnd = content.indexOf('</think>');
        if (thinkStart !== -1 && thinkEnd !== -1) {
          thinkContent = content.substring(thinkStart, thinkEnd + 8);
        }
      }

      // Look for frontmatter bounds ---
      const firstDash = content.indexOf('---');
      if (firstDash !== -1) {
        const secondDash = content.indexOf('---', firstDash + 3);
        if (secondDash !== -1) {
          yamlStr = content.substring(firstDash + 3, secondDash);
          restOfContent = content.substring(secondDash + 3);
        }
      }
    }

    if (!yamlStr) {
      console.warn(`[ERROR] Could not extract frontmatter from: ${filePath}`);
      return false;
    }
  }

  // Parse lines of yamlStr
  const yamlLines = yamlStr.split('\n');
  const metadata = {};
  const extraLines = [];

  yamlLines.forEach(line => {
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.substring(0, colonIdx).trim().replace(/['"]/g, '');
      const val = line.substring(colonIdx + 1).trim().replace(/['"]/g, '');
      metadata[key] = val;
    } else {
      if (line.trim()) extraLines.push(line);
    }
  });

  // Modify or inject metadata
  let modified = false;

  // 1. cefr_level check
  if (!metadata.cefr_level) {
    let inferred = metadata.target_cefr;
    if (!inferred) {
      inferred = inferCefr(metadata.grado, filePath, yamlStr);
    }
    metadata.cefr_level = inferred;
    modified = true;
    console.log(`  -> Injected cefr_level: ${inferred}`);
  }

  // 2. protocol_version check
  if (metadata.protocol_version !== '5.1') {
    metadata.protocol_version = '5.1';
    modified = true;
    console.log(`  -> Updated protocol_version to 5.1`);
  }

  if (modified) {
    // Reconstruct yaml frontmatter
    let newYaml = '---\n';

    // Standard keys first for readability
    const standardKeys = ['id', 'cefr_level', 'country', 'grado', 'asignatura', 'tema', 'periodo', 'protocol_version'];
    standardKeys.forEach(k => {
      if (metadata[k] !== undefined) {
        newYaml += `${k}: "${metadata[k]}"\n`;
      }
    });

    // Other keys
    Object.keys(metadata).forEach(k => {
      if (!standardKeys.includes(k)) {
        newYaml += `${k}: "${metadata[k]}"\n`;
      }
    });

    // Add extra lines
    extraLines.forEach(l => {
      newYaml += `${l}\n`;
    });

    newYaml += '---';

    // Build the final content
    let finalContent = newYaml + '\n';

    // If it had a think block, we add it safely as an HTML comment below the frontmatter
    if (hasThinkBlock && thinkContent) {
      const cleanedThink = thinkContent.replace('<think>', '<!-- think:\n').replace('</think>', '\n-->');
      finalContent += '\n' + cleanedThink + '\n';
    }

    // Clean up code block wrappers in rest of content if they were left over
    let cleanedRest = restOfContent.trim();
    if (cleanedRest.startsWith('```')) {
      // Find the next line
      const lines = cleanedRest.split('\n');
      if (lines[0].startsWith('```')) {
        lines.shift();
      }
      cleanedRest = lines.join('\n').trim();
    }

    finalContent += '\n' + cleanedRest + '\n';

    fs.writeFileSync(filePath, finalContent, 'utf8');
    return true;
  }

  return false;
}

let totalProcessed = 0;
let totalMigrated = 0;

DIRECTORIES.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`Scanning directory: ${dir}`);
    const files = walk(dir).filter(f => f.toLowerCase().includes('ingles') || f.toLowerCase().includes('english'));
    files.forEach(f => {
      totalProcessed++;
      try {
        const success = migrateFile(f);
        if (success) {
          totalMigrated++;
        }
      } catch (err) {
        console.error(`[ERROR] Failed to process ${f}:`, err);
      }
    });
  }
});

console.log(`\nMigration completed:`);
console.log(`Total English files processed: ${totalProcessed}`);
console.log(`Total English files migrated/corrected: ${totalMigrated}`);
