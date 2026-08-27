## 2024-05-24 - Accessibility on Search Modals
**Learning:** When adding ARIA expanded states to disclosure toggles (like search modals), it's important to link them with `aria-controls` to the modal `id` to ensure screen readers can announce the state and target of the interaction properly.
**Action:** Always include `aria-expanded` and `aria-controls` on the trigger, and a matching `id` on the container.

## 2024-11-20 - Forms without properly associated labels
**Learning:** For a form to be accessible and to have correctly clickable labels for inputs, the `for` attribute in the `<label>` tag must map accurately to the `id` of the matching `<input>` field. When a form input has no visual label by design (e.g., a simple email input modal), add a `<label class="sr-only" for="input-id">` to inform screen reader users of the input's purpose.
**Action:** Ensure all form inputs have associated labels, either visible or `sr-only`, connected using `for`/`id` mapping.
## 2026-08-24 - [Add aria labels and aria-pressed states to voting buttons]
**Learning:** Svelte seamlessly binds boolean values to aria-pressed attributes, making toggle buttons highly accessible with minimal code.
**Action:** Always add aria-pressed along with aria-label on icon-only toggle buttons to properly announce state to screen readers.

## 2024-12-06 - [Missing type=button on Search Modals]
**Learning:** When creating a custom modal close button (like the ESC button), omitting `type="button"` can cause accidental form submissions or unexpected behaviors if the modal is ever placed inside a form. Additionally, adding `aria-label` makes the close button accessible to screen readers.
**Action:** Always include `type="button"` and `aria-label` on custom icon-only close buttons.
