const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
    reset: "\x1b[0m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
};

const questionsDir = path.join(__dirname, '../src/content/questions');

// 🔄 Auto-fix mode flag
const FIX_MODE = process.argv.includes('--fix');

console.log(`${colors.cyan}🔍 Starting Smart Verification of Questions...${colors.reset}`);
if (FIX_MODE) {
    console.log(`${colors.magenta}🔧 FIX MODE ENABLED${colors.reset}`);
}

// Function to validate UTF-8 and detect mojibake
function checkEncoding(content, filePath) {
    const mojibakePatterns = [
        { pattern: /ÃƒÂ³|Ã‚Â/g, replacement: '' }, // Common double-encoded utf-8
        { pattern: /Ã³|Ã³/g, replacement: 'ó' },
        { pattern: /Ã¡|Ã¡/g, replacement: 'á' },
        { pattern: /Ã©|Ã©/g, replacement: 'é' },
        { pattern: /Ã|Ã/g, replacement: 'í' }, // risky, be careful
        { pattern: /Ãº|Ãº/g, replacement: 'ú' },
        { pattern: /Ã±|Ã±/g, replacement: 'ñ' },
        { pattern: /â€œ|â€/g, replacement: '"' },
        { pattern: /â€“/g, replacement: '-' },
    ];

    let stats = { hasError: false, fixedContent: content };
    let issuesFound = false;

    for (const p of mojibakePatterns) {
        if (content.match(p.pattern)) {
             issuesFound = true;
             if (FIX_MODE) {
                 stats.fixedContent = stats.fixedContent.replace(new RegExp(p.pattern, 'g'), p.replacement);
             }
        }
    }

    stats.hasError = issuesFound;
    return stats;
}

// Check for duplicate headers
function checkDuplicateHeaders(content) {
    // Regex matches instances where '### Enunciado' appears, followed immediately by another '### Enunciado'
    // possibly separated by whitespace/newlines, which was the specific bug.
    // Or just count them per section if we can identify sections.

    // The specific bug reported was:
    // ### Enunciado
    //
    // ### Enunciado

    const duplicatePattern = /(### (?:Enunciado|Opciones|Explicación))\s+\n\s*\1/g;
    let stats = { hasError: false, fixedContent: content };

    if (content.match(duplicatePattern)) {
        console.log("Found duplicate headers!");
        stats.hasError = true;
        if (FIX_MODE) {
             // Replace double header with single header
             stats.fixedContent = stats.fixedContent.replace(duplicatePattern, '$1');
        }
    }

    return stats;
}

function verifyFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;
    let modified = false;
    const errors = [];

    // Duplicate headers
    const headerCheck = checkDuplicateHeaders(newContent);
    if (headerCheck.hasError) {
        errors.push({ type: 'DUPLICATE_HEADER', message: 'Repeated headers detected' });
        if (FIX_MODE) {
            newContent = headerCheck.fixedContent;
            modified = true;
        }
    }

    // Encoding
    const encodingCheck = checkEncoding(newContent, filePath);
    if (encodingCheck.hasError) {
        errors.push({ type: 'ENCODING_ERROR', message: 'Mojibake characters detected' });
        if (FIX_MODE) {
            newContent = encodingCheck.fixedContent;
            modified = true;
        }
    }

    if (modified && FIX_MODE) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`${colors.green}✅ Fixed: ${path.relative(process.cwd(), filePath)}${colors.reset}`);
    }

    return errors;
}

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if (file.endsWith('.md')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });

  return arrayOfFiles;
}

function main() {

  if (!fs.existsSync(questionsDir)) {
      console.error(`${colors.red}❌ Questions directory not found: ${questionsDir}${colors.reset}`);
      process.exit(1);
  }

  console.log(`📂 Scanning: ${questionsDir}`);

  const files = getAllFiles(questionsDir);
  console.log(`📝 Found ${files.length} markdown files.`);

  let errorCount = 0;
  let fileErrorCount = 0;

  files.forEach(file => {
    const errors = verifyFile(file);
    if (errors.length > 0) {
        // Only log if NOT fixed, or just log always?
        // If fixed, we already logged "Fixed".
        if (!FIX_MODE) {
             fileErrorCount++;
             console.log(`\n❌ Issues in: ${path.relative(process.cwd(), file)}`);
             errors.forEach(err => {
                console.log(`   ${colors.yellow}[${err.type}]${colors.reset} ${err.message}`);
                errorCount++;
             });
        }
    }
  });

  if (!FIX_MODE && fileErrorCount > 0) {
    console.log('\n=============================================');
    console.log(`SUMMARY: ${fileErrorCount} files with issues. Total ${errorCount} errors.`);
    console.log('Run with --fix to automatically repair duplicate headers.');
    console.log('=============================================');
  } else if (fileErrorCount === 0) {
      console.log(`\n${colors.green}✅ All files passed content verification.${colors.reset}`);
  }
}

main();
