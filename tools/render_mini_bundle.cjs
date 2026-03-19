const fs = require('fs');
const path = require('path');

function yaml(value) {
  if (typeof value === 'string') return `"${value.replace(/"/g, '\\"')}"`;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return value;
}

function render(spec) {
  const out = ['---'];
  for (const [key, value] of Object.entries(spec.frontmatter)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      out.push(`${key}:`);
      for (const [childKey, childValue] of Object.entries(value)) {
        out.push(`  ${childKey}: ${yaml(childValue)}`);
      }
    } else {
      out.push(`${key}: ${yaml(value)}`);
    }
  }
  out.push('---', '', `# ${spec.title}`, '', spec.summary, '', '---', '');

  spec.questions.forEach((question, index) => {
    out.push(`## Question ${index + 1} (${question.level} - Difficulty ${question.difficulty})`);
    out.push(`**ID:** \`${spec.frontmatter.id}-v${index + 1}\``);
    out.push(`**Bloom:** ${question.bloom}`);
    out.push(`**ICFES:** ${question.icfes}`);
    out.push(`**Expected_Success:** ${question.success}`);
    if (question.context) out.push('', '### Contexto', question.context);
    out.push('', '### Enunciado', question.stem, '', '### Options');
    question.options.forEach((option, optionIndex) => {
      const letter = ['A', 'B', 'C', 'D'][optionIndex];
      const mark = optionIndex === question.correct ? 'x' : ' ';
      out.push(`- [${mark}] ${letter}) ${option.text} <!-- feedback: ${option.feedback} -->`);
    });
    out.push('', '### Explicación Pedagógica', question.explanation, '', '---', '');
  });

  return `${out.join('\n').trim()}\n`;
}

function main() {
  const [specPath, targetPath] = process.argv.slice(2);
  if (!specPath || !targetPath) {
    console.error('Usage: node tools/render_mini_bundle.js <spec.json> <target.md>');
    process.exit(1);
  }
  const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
  fs.mkdirSync(path.dirname(targetPath), { recursive: true });
  fs.writeFileSync(targetPath, render(spec));
}

main();
