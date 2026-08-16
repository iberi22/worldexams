## 2025-02-12 - Avoid unnecessary array `.filter()` inside `$derived` when filtering is inactive
**Learning:** In Svelte components, using `.filter(condition ? true : ...)` inside `$derived` or reactive blocks still creates a new array instance and iterates N times, causing unnecessary overhead when the condition isn't active.
**Action:** When conditionally filtering an array in `$derived` based on a reactive variable (e.g., a filter toggle or selected value), early return the original array reference (`condition ? array.filter(...) : array`) to make it an O(1) operation and avoid redundant garbage collection allocations.

## 2025-02-12 - Combine chained filter and length operations in $derived.by()
**Learning:** In Svelte 5, computing derived arrays with `.filter()` and then immediately passing the result to another derived state that computes `.length` or another `.filter()` causes redundant O(N) array allocations.
**Action:** When deriving multiple states that depend on a filtered subset of a large array (e.g. tracking answers and correct answer count), combine them into a single pass using `$derived.by()` instead of individual `$derived(array.filter())` chains.
