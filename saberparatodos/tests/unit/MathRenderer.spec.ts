import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import katex from 'katex';
import { escapeHtml } from '../../src/utils/escapeHtml';

describe('MathRenderer (logic)', () => {
    // Read the svelte file to extract the renderMath logic for testing
    const svelteCode = fs.readFileSync('src/components/MathRenderer.svelte', 'utf8');
    const renderMathMatch = svelteCode.match(/function renderMath[\s\S]*?\n  \}/);
    const codeStr = renderMathMatch ? renderMathMatch[0] : '';

    // Evaluate the code to create the function using real KaTeX and escapeHtml
    const evaluateRenderMath = (text: string, customKatex = katex) => {
        const renderCache = new Map();
        const BLOCK_MATH_REGEX = /\$\$([\s\S]*?)\$\$/g;
        const INLINE_MATH_REGEX = /(?<![\d\w])\$([^\$\n]+?)\$(?![\d\w])/g;
        const MAX_CACHE_SIZE = 500;

        // Clean TS annotations for eval
        const jsCode = codeStr
            .replace(/: string\[\]/g, '')
            .replace(/: string/g, '')
            .replace(/: boolean/g, '')
            .replace(/!;/g, ';');

        const fn = new Function(
            'katex',
            'escapeHtml',
            'renderCache',
            'BLOCK_MATH_REGEX',
            'INLINE_MATH_REGEX',
            'MAX_CACHE_SIZE',
            `
            ${jsCode}
            return renderMath(\`${text.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`);
        `
        );

        return fn(customKatex, escapeHtml, renderCache, BLOCK_MATH_REGEX, INLINE_MATH_REGEX, MAX_CACHE_SIZE);
    };

    it('escapes html tags properly', () => {
        const result = evaluateRenderMath('<svg/onload=alert(1)>');
        expect(result).not.toContain('<svg');
        expect(result).toContain('&lt;svg/onload=alert(1)&gt;');
    });

    it('escapes image tags properly', () => {
        const result = evaluateRenderMath('< img src=x onerror=alert(1)>');
        expect(result).not.toContain('< img');
        expect(result).toContain('&lt; img src=x onerror=alert(1)&gt;');
    });

    it('preserves block math inequalities', () => {
        const result = evaluateRenderMath('$$x < y$$');
        expect(result).toContain('katex');
        expect(result).toContain('&lt;');
    });

    it('preserves inline math inequalities', () => {
        const result = evaluateRenderMath('$a < b$');
        expect(result).toContain('katex');
        expect(result).toContain('&lt;');
    });

    it('escapes script tags properly', () => {
        const result = evaluateRenderMath('</script><script>alert(1)</script>');
        expect(result).toContain('&lt;/script&gt;&lt;script&gt;alert(1)&lt;/script&gt;');
    });

    it('handles audio parser without escaping inside properly formatted URLs', () => {
        const result = evaluateRenderMath('{{audio:https://example.com/audio.mp3}}');
        expect(result).toContain('<audio controls src="https://example.com/audio.mp3"');
    });

    it('rejects malicious audio URLs', () => {
        const result = evaluateRenderMath('{{audio:https://x.com/a" onerror="alert(1)}}');
        expect(result).not.toContain('<audio controls src="https://x.com/a" onerror="alert(1)"');
        expect(result).toContain('onerror=');
        expect(result).toContain('{{audio:https://x.com/a&quot; onerror=&quot;alert(1)}}');
    });

    it('renders complex multiline equations correctly', () => {
        const multilineMath = '$$\\begin{aligned} a_1 &= 5 \\\\ a_2 &= 10 \\\\ \\sum_{i=1}^n a_i &= 15 \\end{aligned}$$';
        const result = evaluateRenderMath(multilineMath);
        expect(result).toContain('katex-display');
        expect(result).toContain('aligned');
    });

    it('renders matrices and fractions correctly', () => {
        const matrixMath = '$$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} \\times \\frac{\\alpha}{\\beta}$$';
        const result = evaluateRenderMath(matrixMath);
        expect(result).toContain('katex');
        expect(result).toContain('pmatrix');
        expect(result).toContain('mfrac');
    });

    it('renders Greek letters and square roots in inline math correctly', () => {
        const greekMath = 'En el triángulo, $\\alpha + \\beta = \\theta$ y $y = \\sqrt{\\frac{x}{2}}$.';
        const result = evaluateRenderMath(greekMath);
        expect(result).toContain('katex');
        expect(result).toContain('α');
        expect(result).toContain('β');
        expect(result).toContain('θ');
        expect(result).toContain('msqrt');
    });

    it('handles malformed LaTeX input gracefully via error callback without throwing or crashing', () => {
        // Mock KaTeX throwing exception or returning error HTML fallback
        const mockThrowingKatex = {
            renderToString: () => {
                throw new Error('KaTeX parsing error');
            }
        };

        const result = evaluateRenderMath('$$ \\invalidCommand { $$ y $ \\badSyntax $', mockThrowingKatex);
        expect(result).toContain('text-red-400');
        expect(result).toContain('font-mono');
        expect(result).not.toThrow;
    });
});
