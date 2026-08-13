## 2026-08-09 - Optimize Multiple Derived Sorting Passes
**Learning:** Svelte 5 `$derived` blocks that map or sort the exact same underlying arrays can lead to duplicate, redundant reactive cycles and N log N execution overhead in performance-critical views.
**Action:** Use `$derived.by()` to combine multiple interdependent metrics into a single reactive calculation, calculating intermediate arrays and sorting them only once, then slicing out the specific reactive views (like strengths and weaknesses).

## 2024-05-15 - Prevent derived array mutations and duplicate sorts in Svelte templates
**Learning:** Using \`.sort()\` directly inside a Svelte template on a derived state array (e.g. \`{competencyStats.sort(...)}\`) mutates the derived array in-place. This triggers side effects that re-evaluate reactive bindings, resulting in degraded render performance, multiple O(N log N) sorts per render, and broken UI components (like charts relying on order).
**Action:** Always extract sorting logic out of Svelte templates into a single, pre-computed \`$derived.by()\` block that runs exactly once and produces stable, immutable outputs for the template to reference.
