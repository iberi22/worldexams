💡 What: Optimized `LocalReportsView.svelte` and `ResultsView.svelte` to use a precomputed O(1) `$derived.by()` `Map` (optionDictionary) for resolving `getOptionText()` and `getOptionFeedback()` values, replacing native array `.find()` lookups.
🎯 Why: Component functions were executing `.find()` inside `{#each}` rendering loops to extract option details, scaling unpredictably and causing O(N*M) bottlenecks during updates of long lists of historical results.
📊 Impact: Reduced UI thread blocking by guaranteeing fast O(1) dictionary key lookups instead of sequential iterations on every DOM update.
🔬 Measurement: Verify rendering speed via Svelte devtools by profiling re-renders or monitoring long-tasks metric when opening the History tab or completing an exam.
