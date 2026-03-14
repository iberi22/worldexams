import katex from 'katex';

const INLINE_MATH_REGEX = /\$([^\s\$\n](?:[^\$\n]*?[^\s\$\n])?)\$/g;

function renderMath(text) {
  if (!text) return '';
  let result = text.trim();

  result = result.replace(INLINE_MATH_REGEX, (match, latex) => {
    try {
      return katex.renderToString(latex.trim(), {
        displayMode: false,
        throwOnError: false,
        errorColor: '#ef4444',
        strict: false,
        trust: true
      });
    } catch (e) {
      console.warn('KaTeX inline error:', e);
      return `<span class="text-red-400 font-mono text-sm">${match}</span>`;
    }
  });
  return result;
}

const testText = "Laura quiere comprar un cuaderno de $3.500. Tiene un billete de $2.000 y otro de $1.000. ¿Le alcanza?";
console.log("Original Currency Test:", testText);
console.log("Rendered (Expected NO CHANGES):", renderMath(testText));

const mathText = "Si $x = 2$, entonces $x + x$ es igual a 4.";
console.log("\nOriginal Math Test:", mathText);
const renderedMath = renderMath(mathText);
console.log("Rendered (Expected KaTeX tags):", renderedMath.includes('katex') ? "SUCCESS (KaTeX found)" : "FAILURE (No KaTeX)");
console.log("Plain text output:", renderedMath.replace(/<[^>]*>?/gm, ''));

