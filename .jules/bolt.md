## 2026-07-24 - Module-level Caching for Synchronous Operations in Svelte
**Learning:** Svelte's `<script context="module">` block provides a convenient mechanism to share state across all instances of a component. This is particularly useful for caching the results of computationally expensive synchronous operations like parsing LaTeX with KaTeX, avoiding redundant processing and main thread blocking.
**Action:** Use module-level caching with bounded Map size for memoizing deterministic expensive rendering operations in Svelte components.
