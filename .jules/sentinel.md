## 2025-02-18 - Prevent XSS in MathRenderer
**Vulnerability:** XSS via un-sanitized HTML rendering and KaTeX `trust: true` in `MathRenderer.svelte`.
**Learning:** The component manually parsed Markdown and rendered LaTeX with KaTeX, piping it directly to Svelte's `{@html}` directive without sanitization. KaTeX was also set to `trust: true`, allowing arbitrary JS execution via commands like `\href`.
**Prevention:** Use `isomorphic-dompurify` to sanitize any dynamically generated HTML before injecting it with `{@html}`. Configure DOMPurify to allow explicitly required tags/attributes (e.g., `iframe`, `audio`). Explicitly set `trust: false` in KaTeX configuration.
