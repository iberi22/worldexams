const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(__dirname, '../saberparatodos/src/content/questions/colombia/ingles');

function walkDir(dir, callback) {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        if (isDirectory) {
            walkDir(dirPath, callback);
        } else {
            callback(path.join(dir, f));
        }
    });
}

const stats = {
    totalBundles: 0,
    withPeriod: 0,
    withoutPeriod: 0,
    byGrade: {}
};

console.log(`Scanning ${TARGET_DIR}...`);

if (fs.existsSync(TARGET_DIR)) {
    walkDir(TARGET_DIR, (filePath) => {
        if (filePath.endsWith('-bundle.md')) {
            stats.totalBundles++;
            const content = fs.readFileSync(filePath, 'utf8');
            const periodMatch = content.match(/^periodo:\s*(\d+)/m);

            // Extract grade from path
            const gradeMatch = filePath.match(/grado-(\d+)/);
            const grade = gradeMatch ? gradeMatch[1] : 'unknown';

            if (!stats.byGrade[grade]) {
                stats.byGrade[grade] = { total: 0, withPeriod: 0, withoutPeriod: 0, periodCounts: {} };
            }
            stats.byGrade[grade].total++;

            if (periodMatch) {
                stats.withPeriod++;
                stats.byGrade[grade].withPeriod++;
                const p = periodMatch[1];
                stats.byGrade[grade].periodCounts[p] = (stats.byGrade[grade].periodCounts[p] || 0) + 1;
            } else {
                stats.withoutPeriod++;
                stats.byGrade[grade].withoutPeriod++;
                console.log(`[MISSING] ${path.relative(TARGET_DIR, filePath)}`);
            }
        }
    });
} else {
    console.error(`Directory not found: ${TARGET_DIR}`);
}

console.log('\n--- Audit Results ---');
console.log(`Total Bundles: ${stats.totalBundles}`);
console.log(`With Period: ${stats.withPeriod}`);
console.log(`Without Period: ${stats.withoutPeriod}`);

console.log('\n--- By Grade ---');
Object.keys(stats.byGrade).sort((a,b) => Number(a)-Number(b)).forEach(g => {
    const s = stats.byGrade[g];
    console.log(`Grade ${g}: ${s.total} bundles | Missing: ${s.withoutPeriod} | Periods: ${JSON.stringify(s.periodCounts)}`);
});
