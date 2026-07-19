## 2026-07-19 - [Accessible Icon-Only Buttons]
**Learning:** Svelte components like `QuestionFeedback` and `Search` need explicit `aria-label` attributes on icon-only buttons (like vote, report, and close buttons) for proper screen-reader support.
**Action:** Always add descriptive `aria-label` attributes (in Spanish, matching the app's primary language) to buttons containing only SVGs or ambiguous abbreviations like 'ESC'.
