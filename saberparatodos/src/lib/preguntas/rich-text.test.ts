import { describe, expect, it } from 'vitest';
import { plainText, renderRichText } from './rich-text';

describe('renderRichText', () => {
  it('renders inline and block LaTeX with KaTeX', () => {
    const html = renderRichText('Si $x^2 = 4$, entonces $$\\frac{a}{b}$$');
    expect(html).toContain('class="katex"');
    expect(html).toContain('katex-display');
    expect(html).not.toContain('$');
  });

  it('does not treat currency amounts as math', () => {
    const html = renderRichText('Cuesta $5.000 y luego $3.000 COP');
    expect(html).not.toContain('katex');
    expect(html).toContain('$5.000');
  });

  it('escapes HTML before applying markdown-lite', () => {
    const html = renderRichText('<img src=x onerror=alert(1)> **negrita** *cursiva* `a<b`');
    expect(html).not.toContain('<img');
    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;');
    expect(html).toContain('<strong>negrita</strong>');
    expect(html).toContain('<em>cursiva</em>');
    expect(html).toContain('<code>a&lt;b</code>');
  });

  it('keeps comparisons and line breaks readable', () => {
    expect(renderRichText('3 < 5\n5 > 3')).toBe('3 &lt; 5<br>5 &gt; 3');
  });

  it('does not let KaTeX input execute HTML (trust: false)', () => {
    const html = renderRichText('$\\href{javascript:alert(1)}{x}$');
    // La fuente queda solo como texto en <annotation>; nunca como enlace.
    expect(html).not.toMatch(/href=/i);
    expect(html).not.toContain('<a ');
  });

  it('returns empty string for empty input', () => {
    expect(renderRichText('')).toBe('');
    expect(renderRichText(undefined)).toBe('');
  });
});

describe('plainText', () => {
  it('strips markdown and math delimiters', () => {
    expect(plainText('**Hola** $x+1$ y `c`\n  fin')).toBe('Hola x+1 y c fin');
  });
});
