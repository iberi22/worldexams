const fs = require('fs');
let c = fs.readFileSync('E:/scripts-python/worldexams/saberparatodos/src/lib/questions/orchestrator.ts', 'utf8');

const searchStr = "import { filterGrade11PreicfesReady } from './policy';";
const idx = c.indexOf(searchStr);
console.log('Found at index:', idx);
if (idx >= 0) {
  console.log(JSON.stringify(c.substring(idx, idx + 300)));
}
