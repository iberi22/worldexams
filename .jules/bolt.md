
## 2024-05-18 - [KaTeX Rendering Performance Bottleneck]
**Learning:** KaTeX `renderToString` is synchronous and can be incredibly slow when rendering hundreds of math equations simultaneously in large lists (like `ExamView` or `ResultsView`). The repeated evaluation of unchanged math snippets wastes significant main thread time and blocks UI rendering.
**Action:** Introduced a module-level (`<script context="module">`) bounded `Map` in `MathRenderer.svelte` to memoize the final rendered HTML for a given input string. This resulted in a >100x performance increase (4000ms+ down to ~27ms) when rendering identical repetitive markdown/math blocks. Always check if complex parsed content can be cached globally across component instances.
