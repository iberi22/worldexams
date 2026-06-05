const section = "- [x] A\n- [ ] B";
const optionsRegex = /-\s*\[(x|X| )\]\s*[A-Z]/g;
console.log('Match:', section.match(optionsRegex));
