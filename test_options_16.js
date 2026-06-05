const section = "## Question 2 [D3-D4]\n**ID:** `test-q2`\n- [x] A\n- [ ] B";
const optionsRegex = /^\s*-\s*\[(x|X| )\]\s*[A-Z]/gm;
console.log('Options count:', (section.match(optionsRegex) || []).length);
