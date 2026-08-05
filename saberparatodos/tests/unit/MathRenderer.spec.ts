import { describe, it, expect } from 'vitest';
import * as fs from 'fs';

describe('MathRenderer (logic)', () => {
    // Read the svelte file to extract the renderMath logic for testing
    // Since we don't have @testing-library/svelte
    const svelteCode = fs.readFileSync('src/components/MathRenderer.svelte', 'utf8');
    const escapeHtmlMatches = svelteCode.match(/function escapeHtml[\s\S]*?return result;\n  \}/);
    const codeStr = escapeHtmlMatches ? escapeHtmlMatches[0] : '';
    
    // Evaluate the code to create the function
    const evaluateRenderMath = (text: string) => {
        const katex = { renderToString: (str: string) => 'KATEX(' + str + ')' };
        const renderCache = new Map();
        const BLOCK_MATH_REGEX = /\$\$([\s\S]*?)\$\$/g;
        const INLINE_MATH_REGEX = /(?<![\d\w])\$([^\$\n]+?)\$(?![\d\w])/g;
        const MAX_CACHE_SIZE = 500;
        
        // Remove typescript types for eval
        const jsCode = codeStr.replace(/: string\[\]/g, '').replace(/: string/g, '').replace(/!;/g, ';');
        
        const fn = new Function('katex', 'renderCache', 'BLOCK_MATH_REGEX', 'INLINE_MATH_REGEX', 'MAX_CACHE_SIZE', `
            ${jsCode}
            return renderMath(\`${text.replace(/`/g, '\\`')}\`);
        `);
        
        return fn(katex, renderCache, BLOCK_MATH_REGEX, INLINE_MATH_REGEX, MAX_CACHE_SIZE);
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
        expect(result).toContain('KATEX(x < y)');
    });
    
    it('preserves inline math inequalities', () => {
        const result = evaluateRenderMath('$a < b$');
        expect(result).toContain('KATEX(a < b)');
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
        // The original string is not parsed as audio URL since it contains quotes and spaces.
        // It should simply be escaped as normal text.
        // Since quotes are escaped to &quot;, "onerror=" becomes part of the raw text and is safe.
        expect(result).toContain('onerror=');
        expect(result).toContain('{{audio:https://x.com/a&quot; onerror=&quot;alert(1)}}');
    });
});
