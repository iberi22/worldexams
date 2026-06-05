const section = "- [x] A\n- [ ] B";
const optionsRegex = /^\s*-\s*\[(x|X| )\]\s*(?:\*\*)?[A-Z](?:\*\*)?(?:\s*[\)\.\-:]\s*.*)?/gm;
console.log('Options count:', (section.match(optionsRegex) || []).length);
