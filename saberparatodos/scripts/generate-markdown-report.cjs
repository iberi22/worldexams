
const fs = require('fs');
const path = require('path');

const report = fs.readFileSync('validation_report.txt', 'utf8');
const lines = report.split('\n');

const findings = {};

let currentFile = '';

lines.forEach(line => {
  if (line.startsWith('❌')) {
    currentFile = line.replace('❌ ', '').trim();
    if (!findings[currentFile]) {
        findings[currentFile] = [];
    }
  } else if (line.trim().startsWith('⚠️')) {
    if (currentFile) {
        // Extract error type [TYPE]
        const match = line.match(/\[([A-Z_]+)\]/);
        if (match) {
            findings[currentFile].push(match[1]);
        }
    }
  }
});

// Group by Course
const byCourse = {};

Object.keys(findings).forEach(filePath => {
    // E:\...\src\content\questions\colombia\sociales-ciudadanas\grado-11\file
    const parts = filePath.split(path.sep);
    let subject = 'Unknown';
    let grade = 'Unknown';

    // Find 'colombia' (or country) index
    let countryIdx = -1;
    parts.forEach((p, i) => {
        if (['colombia', 'mexico', 'brasil'].includes(p)) countryIdx = i;
    });

    if (countryIdx > -1) {
        subject = parts[countryIdx + 1] || 'Unknown';
        grade = parts[countryIdx + 2] || 'Unknown';
    }

    const key = `${subject} (${grade})`;
    if (!byCourse[key]) byCourse[key] = [];

    // Unique error types
    const uniqueErrors = [...new Set(findings[filePath])];
    byCourse[key].push({
        file: path.basename(filePath),
        errors: uniqueErrors
    });
});

// Generate Markdown
let md = '# 🚨 Reporte de Anomalías y Errores de Contenido\n\n';
md += `> **Total Archivos Afectados:** ${Object.keys(findings).length}\n\n`;

Object.keys(byCourse).sort().forEach(course => {
    md += `## 📚 ${course.toUpperCase()}\n\n`;
    md += `| Archivo | Errores Detectados |\n`;
    md += `|---|---|\n`;

    byCourse[course].forEach(item => {
        // Format errors nicely
        const errorBadges = item.errors.map(e => {
            if (e.includes('TODO')) return '`🚧 Incompleto`';
            if (e.includes('MISSING')) return '`❓ Falta Datos`';
            if (e.includes('RENDER')) return '`🔥 Render Fallido`';
            if (e.includes('ENCODING')) return '`🔣 Caracteres Raros`';
            return `\`${e}\``;
        }).join(' ');

        md += `| ${item.file} | ${errorBadges} |\n`;
    });
    md += '\n';
});

fs.writeFileSync('VALIDATION_FINDINGS.md', md);
console.log('Report generated: VALIDATION_FINDINGS.md');
