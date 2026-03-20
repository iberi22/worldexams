
const fs = require('fs');
const path = require('path');

const packsDir = 'e:/scripts-python/worldexams/saberparatodos/public/api/packs';
const files = fs.readdirSync(packsDir).filter(f => f.endsWith('.json'));

for (const file of files) {
  const content = fs.readFileSync(path.join(packsDir, file), 'utf8');
  try {
    const data = JSON.parse(content);
    if (data.questions) {
      for (const q of data.questions) {
        const str = JSON.stringify(q);
        if (str.includes('1/T')) {
          console.log(`FOUND in ${file}:`);
          console.log(`ID: ${q.id}`);
          console.log(`BundleID: ${q.bundleId || q.bundle_id}`);
          console.log(`Statement: ${q.statement}`);
          console.log('---');
        }
      }
    }
  } catch (e) {
  }
}
