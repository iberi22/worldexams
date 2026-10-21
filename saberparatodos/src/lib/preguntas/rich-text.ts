/**
 * Render server-side del texto de preguntas (enunciado, opciones, feedback,
 * explicación) para las páginas públicas /preguntas/.
 *
 * Sintaxis = la de `MathRenderer.svelte`: `$$..$$` (bloque), `$..$` (inline,
 * sin colisionar con montos tipo `$5.000`), `**negrita**`, `*cursiva*`, `` `código` ``.
 * Seguridad: la LaTeX se extrae antes de escapar y la renderiza KaTeX
 * (`trust: false`); todo lo demás se escapa ANTES del markdown-lite, así que
 * el contenido nunca inyecta HTML.
 */
import katex from 'katex';
import { escapeHtml } from '../../utils/escapeHtml';

const BLOCK_MATH_REGEX = /\$\$([\s\S]*?)\$\$/g;
const INLINE_MATH_REGEX = /(?<![\d\w])\$([^$\n]+?)\$(?![\d\w])/g;
const PLACEHOLDER = /\u0000(\d+)\u0000/g;

function renderLatex(latex: string, displayMode: boolean): string {
  let source = latex.trim();
  let suffix = '';
  if (!displayMode) {
    const trailing = /[.,;:]+$/.exec(source);
    if (trailing) {
      suffix = trailing[0];
      source = source.slice(0, -suffix.length).trim();
    }
  }
  try {
    return (
      katex.renderToString(source, {
        displayMode,
        throwOnError: false,
        errorColor: '#ef4444',
        strict: false,
        trust: false,
      }) + suffix
    );
  } catch {
    return `<code>${escapeHtml(latex)}</code>${suffix}`;
  }
}

/** HTML seguro con KaTeX y markdown-lite. */
export function renderRichText(text: string | null | undefined): string {
  const source = String(text ?? '').trim();
  if (!source) return '';

  const math: string[] = [];
  const stash = (html: string) => `\u0000${math.push(html) - 1}\u0000`;

  let out = source
    .replace(/\u0000/g, '')
    .replace(BLOCK_MATH_REGEX, (_m, latex: string) => stash(renderLatex(latex, true)))
    .replace(INLINE_MATH_REGEX, (_m, latex: string) => stash(renderLatex(latex, false)));

  out = escapeHtml(out)
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*\n]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<![*\w])\*([^*\n]+)\*(?![*\w])/g, '<em>$1</em>')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/\n/g, '<br>');

  return out.replace(PLACEHOLDER, (_m, i: string) => math[Number(i)] ?? '');
}

/** Texto plano para JSON-LD/meta: sin markdown; la LaTeX queda como fuente. */
export function plainText(text: string | null | undefined): string {
  return String(text ?? '')
    .replace(/\$\$([\s\S]*?)\$\$/g, '$1')
    .replace(INLINE_MATH_REGEX, '$1')
    .replace(/\*\*([^*\n]+)\*\*/g, '$1')
    .replace(/(?<![*\w])\*([^*\n]+)\*(?![*\w])/g, '$1')
    .replace(/`([^`\n]+)`/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}
