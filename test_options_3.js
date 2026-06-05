const section = "## Question 2 [D3-D4]\n**ID:** `test-q2`\n- [x] A\n- [ ] B";
const optionsRegex = /^\s*-\s*\[[xX ]\]\s*/gm;
console.log('Match count:', (section.match(optionsRegex) || []).length);
