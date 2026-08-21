## 2024-05-24 - Accessibility on Search Modals
**Learning:** When adding ARIA expanded states to disclosure toggles (like search modals), it's important to link them with `aria-controls` to the modal `id` to ensure screen readers can announce the state and target of the interaction properly.
**Action:** Always include `aria-expanded` and `aria-controls` on the trigger, and a matching `id` on the container.

## 2024-11-20 - Forms without properly associated labels
**Learning:** For a form to be accessible and to have correctly clickable labels for inputs, the `for` attribute in the `<label>` tag must map accurately to the `id` of the matching `<input>` field. When a form input has no visual label by design (e.g., a simple email input modal), add a `<label class="sr-only" for="input-id">` to inform screen reader users of the input's purpose.
**Action:** Ensure all form inputs have associated labels, either visible or `sr-only`, connected using `for`/`id` mapping.
