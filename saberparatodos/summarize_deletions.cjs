const fs = require('fs');

const data = fs.readFileSync('anomaly_log.csv', 'utf8');
const lines = data.split('\n').filter(l => l.trim());
lines.shift();

const summary = {}; // { Grade: { Subject: count } }

lines.forEach(line => {
    // Basic CSV parse (handles simple quoted strings)
    const parts = line.split(',');
    if (parts.length < 4) return;
    const grade = parts[0];
    const subject = parts[1];
    const errors = line.split('"')[1] || '';

    // Only count fatal ones (Missing Options, Missing Grado, Major mismatch)
    const isFatal = errors.includes('Missing ID') ||
                    errors.includes('Missing Grado') ||
                    errors.includes('Missing Options') ||
                    errors.includes('Major count mismatch');

    if (isFatal) {
        if (!summary[grade]) summary[grade] = {};
        if (!summary[grade][subject]) summary[grade][subject] = 0;
        summary[grade][subject]++;
    }
});

console.log('### Deletion Summary (Fatal Anomalies)');
for (const grade in summary) {
    console.log(`- **Grade ${grade}:**`);
    for (const subject in summary[grade]) {
        console.log(`  - ${subject}: ${summary[grade][subject]} bundles removed`);
    }
}
