# Host: Generating & Sharing a Link

**Route:** `/create`

Once the experience is ready, the host generates a shareable link to send to the guest.

---

## Generating the Link

The host clicks **Generate share link**. The application then:

1. Validates all required fields. If any are missing or invalid, the process stops and the host sees an error summary (see [Host: Creating an Experience](./host-creating-experience.md#validation)).
2. Encodes the entire experience — including all fields, riddle prompts, and correct answers — into a URL-safe Base64 payload.
3. Produces a shareable URL in the format `/play?data=<payload>`.
4. Saves the experience to the host's local device history.
5. Displays the generated link in the sidebar.

---

## Copying the Link

The host can click **Copy link** to copy the generated URL to their clipboard. A status message confirms whether the copy succeeded or failed. If the copy fails, the host is prompted to select and copy the link manually.

---

## Link Invalidation

If the host modifies **any field** after a link has been generated, the existing link is immediately discarded and the link display is cleared. A status message informs the host that details have changed and a new link must be generated.

This ensures the shared link always reflects the current state of the form at the moment it was generated.

---

## Regenerating the Link

To update a previously generated link after making edits, the host simply clicks **Generate share link** again. This creates a new encoded link from the current form state and replaces any previously generated one.

---

## What the Link Contains

All experience data — title, teaser, schedule, locations, riddle prompts, correct answers, surprise text — is encoded directly into the URL. No data is stored on a server. Anyone with the link can access the full experience, including the correct answers.
