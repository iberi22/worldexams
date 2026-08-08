## 2026-03-10 - MathRenderer.svelte XSS Vulnerability
**Vulnerability:** The MathRenderer component injected raw `content` directly into the DOM using `{@html renderedHTML}`. While KaTeX handled math blocks, regular text containing `<script>` or `<img src=x onerror=...>` was not escaped, allowing stored XSS from user comments and generated questions.
**Learning:** Svelte's `{@html}` bypasses all sanitization. Memory dictated NOT to use `DOMPurify` as it can break KaTeX/SVG rendering. We must be very careful when rendering rich text with custom parsers.
**Prevention:** Always manually escape HTML tags like `result.replace(/<\s*([a-zA-Z\/!?][^>]*?)>/gi, "&lt;$1&gt;")` when custom rendering blocks without an established library like DOMPurify or marked.

## 2025-07-27 - [Fix KaTeX XSS Vulnerability]
**Vulnerability:** KaTeX configuration was set to `trust: true`, allowing potentially malicious LaTeX commands to render raw HTML/execute JS (XSS vulnerability).
**Learning:** In Svelte components rendering LaTeX via KaTeX, using `trust: true` alongside `{@html ...}` bindings opens a direct XSS vector because KaTeX will trust arbitrary user-provided HTML commands in the LaTeX string, and Svelte will render it unescaped.
**Prevention:** Always set `trust: false` (the default) in KaTeX configurations when dealing with user-generated or external content. Avoid DOM sanitization libraries (like `isomorphic-dompurify`) to clean KaTeX output unless absolutely necessary, as it can break complex SVG/MathML outputs and add bundle bloat; KaTeX is designed to be secure with `trust: false`.

## 2026-08-02 - [Fix Hardcoded CAPTCHA_SECRET Vulnerability]
**Vulnerability:** A hardcoded secret ('spt-captcha-2026-worldexams-secret-key') was used as a fallback for the CAPTCHA verification token signing in `verify-captcha.ts`.
**Learning:** Hardcoded fallback values for secrets undermine security since any attacker with access to the source code can use them to bypass protections (e.g. generating valid verification tokens).
**Prevention:** Fail securely if a secret is missing from environment configuration instead of falling back to a hardcoded string. Check for configuration at runtime and return an appropriate error code if missing.

## 2026-08-05 - [Fix Supabase SSR Client State Leakage]
**Vulnerability:** A global singleton Supabase client (`import { supabase } from '../../../lib/supabase'`) was being imported and used to check auth and insert rows within a server-side route (`generate-link-token.ts`).
**Learning:** In Astro or other SSR environments, global singleton database clients can leak state across concurrent user requests, potentially allowing one request to execute queries using the authenticated session of another request.
**Prevention:** Always create a request-scoped Supabase client per API invocation (e.g. `createServerSupabaseClient` utilizing the user's specific access token or using an admin client exclusively for server-to-server operations).
## 2024-05-18 - Insecure HTML Escaping Regex in MathRenderer
**Vulnerability:** The application used an insecure regular expression `result.replace(/<\s*([a-zA-Z\/!?][^>]*?)>/gi, "&lt;$1&gt;");` to escape HTML tags in `MathRenderer.svelte`. This regex failed to escape attributes correctly and did not encode elements like `&`, `"`, and `'`. This allowed injection via vectors like `{{audio:https://x.com/a" onerror="alert(1)}}` inserting quotes inside `src="..."` due to missing `"` encoding, which led to a Cross-Site Scripting (XSS) vulnerability.
**Learning:** Regular expressions are notoriously bad at parsing and sanitizing HTML. To preserve complex structures like LaTeX mathematical blocks (`$$...$$` and `$...$`) while ensuring safe HTML text escaping without using libraries like DOMPurify (which cause KaTeX issues), one should extract the math expressions to temporary placeholders, run a global HTML entity replacement for all 5 characters (`&`, `<`, `>`, `"`, `'`), and then restore the placeholders.
**Prevention:** Avoid custom regex-based HTML tag detection for sanitization. Use full entity escape replacements: `.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;")`, combined with `trust: false` on render libraries, and strict validation of parsed data like multimedia URLs.
