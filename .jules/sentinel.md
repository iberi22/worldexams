## 2025-07-27 - [Fix KaTeX XSS Vulnerability]
**Vulnerability:** KaTeX configuration was set to `trust: true`, allowing potentially malicious LaTeX commands to render raw HTML/execute JS (XSS vulnerability).
**Learning:** In Svelte components rendering LaTeX via KaTeX, using `trust: true` alongside `{@html ...}` bindings opens a direct XSS vector because KaTeX will trust arbitrary user-provided HTML commands in the LaTeX string, and Svelte will render it unescaped.
**Prevention:** Always set `trust: false` (the default) in KaTeX configurations when dealing with user-generated or external content. Avoid DOM sanitization libraries (like `isomorphic-dompurify`) to clean KaTeX output unless absolutely necessary, as it can break complex SVG/MathML outputs and add bundle bloat; KaTeX is designed to be secure with `trust: false`.

## 2025-07-27 - [Fix Hardcoded Secret Fallback]
**Vulnerability:** A hardcoded fallback string was used for `CAPTCHA_SECRET` during HMAC signing.
**Learning:** Providing a fallback hardcoded secret string is a dangerous practice, as it means attackers can forge valid HMAC signatures and bypass security measures (in this case, CAPTCHA verification) if the environment variable happens to be unset in production.
**Prevention:** Remove hardcoded fallback strings for secrets. Instead, fail securely by explicitly checking for the environment variable and returning a 500 server error if the configuration is incomplete.
