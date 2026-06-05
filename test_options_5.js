const section = "## Question 2 [D3-D4]\n**ID:** `test-q2`\n- [x] A\n- [ ] B";
const optionsRegex = /^\s*-\s*\[[xX ]\]\s+[A-Z]/gm;
const match = section.match(optionsRegex);
console.log('Match:', match);
