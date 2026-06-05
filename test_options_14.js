const section = "## Question 2 [D3-D4]\n**ID:** `test-q2`\n- [x] A\n- [ ] B\n";
const optionsRegex = /^\s*-\s*\[(x|X| )\]\s*(?:\*\*)?[A-Z](?:\*\*)?(?:\s*[\)\.\-:]\s*.*)?/gm;
console.log('Options count:', (section.match(optionsRegex) || []).length);
