## 2025-07-27 - [Fix KaTeX XSS Vulnerability]
**Vulnerability:** KaTeX configuration was set to `trust: true`, allowing potentially malicious LaTeX commands to render raw HTML/execute JS (XSS vulnerability).
**Learning:** In Svelte components rendering LaTeX via KaTeX, using `trust: true` alongside `{@html ...}` bindings opens a direct XSS vector because KaTeX will trust arbitrary user-provided HTML commands in the LaTeX string, and Svelte will render it unescaped.
**Prevention:** Always set `trust: false` (the default) in KaTeX configurations when dealing with user-generated or external content. Avoid DOM sanitization libraries (like `isomorphic-dompurify`) to clean KaTeX output unless absolutely necessary, as it can break complex SVG/MathML outputs and add bundle bloat; KaTeX is designed to be secure with `trust: false`.

## 2026-08-02 - [Fix Hardcoded CAPTCHA_SECRET Vulnerability]
**Vulnerability:** A hardcoded secret ('spt-captcha-2026-worldexams-secret-key') was used as a fallback for the CAPTCHA verification token signing in `verify-captcha.ts`.
**Learning:** Hardcoded fallback values for secrets undermine security since any attacker with access to the source code can use them to bypass protections (e.g. generating valid verification tokens).
**Prevention:** Fail securely if a secret is missing from environment configuration instead of falling back to a hardcoded string. Check for configuration at runtime and return an appropriate error code if missing.
