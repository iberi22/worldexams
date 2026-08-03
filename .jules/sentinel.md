## 2025-07-27 - [Fix KaTeX XSS Vulnerability]
**Vulnerability:** KaTeX configuration was set to `trust: true`, allowing potentially malicious LaTeX commands to render raw HTML/execute JS (XSS vulnerability).
**Learning:** In Svelte components rendering LaTeX via KaTeX, using `trust: true` alongside `{@html ...}` bindings opens a direct XSS vector because KaTeX will trust arbitrary user-provided HTML commands in the LaTeX string, and Svelte will render it unescaped.
**Prevention:** Always set `trust: false` (the default) in KaTeX configurations when dealing with user-generated or external content. Avoid DOM sanitization libraries (like `isomorphic-dompurify`) to clean KaTeX output unless absolutely necessary, as it can break complex SVG/MathML outputs and add bundle bloat; KaTeX is designed to be secure with `trust: false`.

## 2026-07-31 - Cross-Site Scripting (XSS) in MathRenderer
**Vulnerability:** The MathRenderer component (`saberparatodos/src/components/MathRenderer.svelte`) rendered raw user input via Svelte's `{@html}` tag without escaping HTML outside of code blocks. This allowed XSS payloads like `<script>alert(1)</script>` to be executed.
**Learning:** When using custom regex-based markdown/math parsers, HTML escaping must occur globally at the start of the parsing pipeline. Math renderers like KaTeX that fail on escaped entities (`&lt;`) must selectively unescape them within their specific regex replacements.
**Prevention:** Always escape `<` and `>` at the beginning of any custom parser that feeds into an `{@html}` tag, and selectively unescape inside trusted blocks that are known to be safe (like `trust: false` configured KaTeX blocks).
