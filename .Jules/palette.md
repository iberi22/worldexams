## 2024-07-23 - Added ARIA Label to Report Modal Close Button
**Learning:** Found a pattern of missing ARIA labels on icon-only close buttons in modal components, which negatively impacts screen reader accessibility.
**Action:** Ensure all icon-only interactive elements (like SVG buttons) have appropriate `aria-label` attributes.
