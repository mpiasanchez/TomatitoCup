# Host: Creating an Experience

**Route:** `/create`

The host creates a mystery date by filling in a form with date details, a final surprise, and at least three riddles.

---

## Form Sections

### Section 1 — Date Details

| Field | Required | Constraints | Description |
|-------|----------|-------------|-------------|
| Date title | Yes | Max 80 characters | The headline the guest sees at the top of their experience. |
| Date teaser | Yes | Max 180 characters | A short message shown to the guest before they start solving clues. |
| Scheduled date and time | Yes | Must be a valid datetime | The actual date and time of the planned event. Displayed to the guest. |
| Starting location | No | Max 140 characters | Where the experience begins. Shown to the guest only if provided. |

### Section 2 — The Final Reveal

| Field | Required | Description |
|-------|----------|-------------|
| Final surprise text | Yes | The actual reveal shown after all riddles are solved (e.g., "Rooftop dinner for two"). |
| Final location | No | Where the surprise takes place. Shown on the reveal card if provided. |

### Section 3 — Riddles

Each riddle has three fields:

| Field | Required | Description |
|-------|----------|-------------|
| Riddle prompt | Yes | The clue or question shown to the guest. |
| Correct answer | Yes | The answer the guest must submit to solve the clue. |
| Success message | No | Shown to the guest after solving this clue. Falls back to a generic confirmation message if left blank. |

---

## Riddle Rules

- The form starts with **3 riddles** (the minimum allowed).
- The host can **add** additional riddles beyond 3.
- The host can **remove** riddles, but the total cannot drop below 3.
- Riddles are presented to the guest in the **order they appear in the form**.

---

## Live Summary Sidebar

On large screens, a sidebar shows a live summary of the experience as the host fills in the form:

- Scheduled date and time (formatted for readability).
- Starting location (or a placeholder if not yet set).
- Count of completed required fields out of the total.
- The generated share link once it has been produced.

---

## Draft Auto-Save

The in-progress form is automatically saved to the browser's local storage as the host types. If the host navigates away and returns to `/create`, the draft is restored exactly as left.

The draft is **cleared** when:
- The host explicitly resets the form using the **Reset** button.
- All fields are manually emptied.

---

## Form Reset

Clicking the **Reset** button clears all form fields, removes the draft from local storage, clears any generated link, and returns the form to its initial empty state.

---

## Preview

The host can click **Preview experience** at any time to see a read-only simulation of the guest's view. The preview:

- Uses the same interface the guest will see, with the current form data.
- Validates required fields before opening, using the same rules as link generation.
- Does **not** save any guest progress to local storage.
- Provides a **Back to edit** button to return to the form.

---

## Validation

Required fields are validated when the host attempts to generate the share link or preview the experience. If any required field is missing or invalid:

- An error summary is shown at the top of the form.
- Each invalid field is individually highlighted with its specific error.
- Focus moves to the error summary so the host is aware of what needs fixing.
