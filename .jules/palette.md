## 2026-08-08 - Accessible Disclosure Widgets
**Learning:** Using `div` with `on:click` for expandable sections (like organization lists) completely breaks keyboard navigation for screen readers and power users. It lacks focus states, keyboard event handling (Enter/Space), and semantic meaning.
**Action:** Always replace clickable `div`s used for expansion with native `<button>` elements. Ensure they include `aria-expanded` and `aria-controls` to properly communicate state to assistive technologies, and use native focus styling (e.g., `focus-visible:ring-2`).
