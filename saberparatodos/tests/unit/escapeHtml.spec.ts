import { describe, it, expect } from 'vitest';
import { escapeHtml } from '../../src/utils/escapeHtml';

describe('escapeHtml', () => {
  it('escapes basic HTML characters correctly', () => {
    expect(escapeHtml('<div>Hello & "Welcome" \'World\'</div>'))
      .toBe('&lt;div&gt;Hello &amp; &quot;Welcome&quot; &#039;World&#039;&lt;/div&gt;');
  });

  it('handles empty inputs', () => {
    expect(escapeHtml('')).toBe('');
    expect(escapeHtml(null)).toBe('');
    expect(escapeHtml(undefined)).toBe('');
  });

  it('handles non-string inputs', () => {
    expect(escapeHtml(123)).toBe('123');
    expect(escapeHtml(true)).toBe('true');
  });

  it('leaves safe strings unmodified', () => {
    expect(escapeHtml('Safe string 123 !@#%^*()')).toBe('Safe string 123 !@#%^*()');
  });

  it('escapes multiple occurrences of unsafe characters', () => {
    expect(escapeHtml('<<>>&&""\'\'')).toBe('&lt;&lt;&gt;&gt;&amp;&amp;&quot;&quot;&#039;&#039;');
  });
});
