# Data & Constraints

## Data Storage

All data is stored locally in the user's browser. Nothing is sent to a server.

| Data | Storage location | Accessible by |
|------|-----------------|---------------|
| Experience content (riddles, answers, surprise text) | Encoded in the share link URL | Anyone who receives the link |
| Host's saved experiences | Host's browser local storage | Host only, on that device |
| Host's in-progress form draft | Host's browser local storage | Host only, on that device |
| Guest's riddle progress | Guest's browser local storage | Guest only, on that device |

---

## Privacy

- No account or login is required.
- No personal data is collected or transmitted.
- Because all experience data — including correct answers — is embedded in the share link URL, anyone who has the link can inspect its contents.

---

## Hard Rules

These constraints are enforced by the application and cannot be bypassed:

| Rule | Detail |
|------|--------|
| Minimum 3 riddles | An experience cannot be created or opened with fewer than 3 riddles. |
| Required fields | Title, teaser, scheduled date/time, final surprise text, and all riddle prompts and answers are required. |
| Riddle order | The guest must solve riddles in sequence. Skipping is not allowed. |
| Link invalidation on edit | Any change to the form after generating a link discards that link. A new one must be generated. |
| Answer normalization | Answer comparison ignores case, punctuation, and extra whitespace. Only letters, numbers, and spaces are compared. |
| Draft cleared on reset | Clicking Reset permanently clears the form draft from local storage. |
