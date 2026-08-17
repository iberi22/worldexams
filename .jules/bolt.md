## 2024-05-14 - Optimize derived state calculations for arrays in Svelte 5
**Learning:** Computing multiple derived state metrics (like counters or filtered arrays) using separate reactive statements with methods like `.filter()` and `.every()` leads to multiple O(N) array iterations and temporary array allocations during each reactive cycle.
**Action:** When deriving multiple metrics from the same array, combine them into a single pass block using `$derived.by()` and a loop (or `.reduce()`). This significantly reduces iterations and allocations on high-volume render paths.

## 2024-05-20 - Eliminate `.filter().reduce()` chaining in reactive statements
**Learning:** Chaining array methods like `.filter().reduce()` or `.map().filter()` inside reactive statements (like `$:` or `$derived`) causes redundant O(N) iterations and unnecessary intermediate array allocations, slowing down updates on large datasets.
**Action:** Combine filtering and grouping/mapping logic into a single O(N) loop or `.reduce()` pass.
