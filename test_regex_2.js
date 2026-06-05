const section = "## Question 1 [D3-D4]\n**ID:** `test-q1`\n**Bloom:** Remember\n**ICFES:** Razonamiento\n**Expected_Success:** 0.8\n**Enunciado:** Pregunta de prueba\n- [x] A <!-- feedback: Correct. -->\n- [ ] B <!-- feedback: Incorrect. -->\n- [ ] C <!-- feedback: Incorrect. -->\n- [ ] D <!-- feedback: Incorrect. -->";
const optionsRegex = /^\s*-\s*\[(x|X| )\]\s*(?:\*\*)?[A-Z](?:\*\*)?(?:\s*[\)\.\-:]\s*.*)?$/gm;

let match;
while ((match = optionsRegex.exec(section)) !== null) {
  console.log('Match:', match[0]);
}
