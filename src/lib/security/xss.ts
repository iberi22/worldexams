/**
 * Cross-Site Scripting (XSS) Detection & Sanitization Utility
 * Helps identify and clean potential XSS injection payloads in inputs.
 */

const XSS_PATTERNS = [
  // Script tags
  /<script[\s\S]*?>[\s\S]*?<\/script>/i,
  /<script[\s\S]*?>/i,

  // HTML tags of concern
  /<iframe[\s\S]*?>/i,
  /<object[\s\S]*?>/i,
  /<embed[\s\S]*?>/i,
  /<svg[\s\S]*?>/i,

  // Javascript URI Scheme
  /javascript:/i,

  // Inline Event Handlers
  /\bon(?:click|load|error|mouseover|unload|change|submit|keydown|keypress|keyup|focus|blur)\s*=/i,

  // Expression or source-based vectors
  /expression\s*\(/i,
  /url\s*\(\\?\s*['"]?javascript:/i,
];

/**
 * Detect if a string input contains potential XSS vectors.
 */
export function detectXss(input: string): boolean {
  if (typeof input !== 'string' || !input) {
    return false;
  }

  let decoded = input;
  try {
    decoded = decodeURIComponent(input);
  } catch {
    // ignore decoding failures and scan raw input
  }

  for (const pattern of XSS_PATTERNS) {
    if (pattern.test(decoded)) {
      return true;
    }
  }

  return false;
}

/**
 * Sanitize an input string to strip out XSS vectors and escape basic HTML tags.
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string' || !input) {
    return '';
  }

  // 1. Remove script tags and event handlers recursively
  let clean = input;

  // HTML tag stripping for basic protection
  clean = clean.replace(/<[^>]*>/g, '');

  // Escape special characters to HTML entities
  clean = clean
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');

  return clean.trim();
}
