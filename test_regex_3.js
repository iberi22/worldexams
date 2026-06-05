const section = "- [x] A\n- [ ] B";
const optionsRegex = /^\s*-\s*\[(x|X| )\]\s*(?:\*\*)?[A-Z](?:\*\*)?(?:\s*[\)\.\-:]\s*.*)?$/gm;
console.log('Match:', section.match(optionsRegex));
