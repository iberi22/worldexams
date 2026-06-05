const fs = require('fs');
const content = "## Question 2 [D3-D4]\n**ID:** `test-q2`\n- [x] A\n- [ ] B";
fs.writeFileSync('test_nl.md', content);
const read = fs.readFileSync('test_nl.md', 'utf8');
console.log('JSON:', JSON.stringify(read));
const optionsRegex = /^\s*-\s*\[(x|X| )\]\s*(?:\*\*)?[A-Z](?:\*\*)?(?:\s*[\)\.\-:]\s*.*)?/gm;
console.log('Match:', read.match(optionsRegex));
