/**
 * SQL Injection Detection Utility
 * Scans inputs for potential SQL injection attack vectors and signatures.
 */

const SQLI_PATTERNS = [
  // Tautologies
  /\bOR\s+['"]?\d+['"]?\s*=\s*['"]?\d+['"]?/i,
  /\bOR\s+['"]?[a-zA-Z]+['"]?\s*=\s*['"]?[a-zA-Z]+['"]?/i,
  /\bAND\s+['"]?\d+['"]?\s*=\s*['"]?\d+['"]?/i,

  // Comment signatures
  /--/,
  /\/\*/,
  /;\s*DROP\s+TABLE/i,
  /;\s*DELETE\s+FROM/i,
  /;\s*INSERT\s+INTO/i,
  /;\s*UPDATE\s+.*SET/i,

  // Union / Select injections
  /\bUNION\s+(?:ALL\s+)?SELECT\b/i,
  /\bSELECT\s+.*\s+FROM\b/i,
  /\bINSERT\s+INTO\s+/i,
  /\bUPDATE\s+.*\s+SET\b/i,
  /\bDELETE\s+FROM\s+/i,
  /\bDROP\s+TABLE\b/i,
  /\bTRUNCATE\s+TABLE\b/i,
  /\bALTER\s+TABLE\b/i,
  /\bEXEC(?:UTE)?\s*\(/i,
  /\bGRANT\s+.*\s+TO\b/i,
];

/**
 * Scan a string input for potential SQL injection vectors.
 */
export function detectSqlInjection(input: string): boolean {
  if (typeof input !== 'string' || !input) {
    return false;
  }

  // Decode URI component first to catch encoded payloads
  let decoded = input;
  try {
    decoded = decodeURIComponent(input);
  } catch {
    // ignore decoding failures and scan raw input
  }

  for (const pattern of SQLI_PATTERNS) {
    if (pattern.test(decoded)) {
      return true;
    }
  }

  return false;
}
