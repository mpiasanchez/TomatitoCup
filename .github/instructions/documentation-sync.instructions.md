---
name: "Documentation Sync"
description: "Use after any code change that adds, removes, or modifies application behavior to keep docs/functional/ aligned with the actual implementation. Applies to all src/ changes."
applyTo: "src/**"
---

# Documentation Sync

Auto-apply scope: This instruction auto-attaches whenever source code under `src/` is modified. It does not apply to documentation-only changes, configuration files, or test files unless those directly reveal a behavioral change.

Keep `docs/functional/` as the source of truth for expected application behaviors. After any code change, verify that the documentation still accurately describes what the code does, and update it if it does not.

## Activation Conditions

Trigger a documentation review when a change to `src/` does any of the following:

- Adds a new user-facing feature, flow, or screen.
- Removes or changes the behavior of an existing feature.
- Changes a field (its name, type, required status, character limit, or optionality).
- Changes how the application validates, stores, or processes data.
- Changes the rules governing answer matching, riddle ordering, progress persistence, link encoding, or language selection.
- Changes what is shown to the host or guest under any condition (including error states, empty states, and success states).
- Changes a hard constraint (e.g. minimum riddle count, required fields, link invalidation rules).

Do not update documentation for:
- Internal refactors with no user-visible effect.
- Style, layout, or animation changes.
- Test additions or changes.
- Dependency updates that do not change behavior.

## Documentation Map

The documentation lives in `docs/functional/`. Each file covers a specific feature area. Use the table below to decide which files to review for a given source change.

| Changed source area | Files to review |
|---------------------|-----------------|
| `src/pages/HomePage.tsx` | `home-page.md` |
| `src/pages/HostDashboard.tsx` | `host-creating-experience.md`, `host-generating-sharing-link.md` |
| `src/pages/GuestView.tsx`, `src/components/GuestExperience.tsx` | `guest-experience.md` |
| `src/pages/PreviewView.tsx` | `host-creating-experience.md` (Preview section) |
| `src/components/RiddleCard.tsx` | `guest-experience.md` (Riddle Card States, Answering a Riddle) |
| `src/components/LockedSurpriseCard.tsx` | `guest-experience.md` (Unlocking the Final Surprise) |
| `src/components/ProgressSteps.tsx` | `guest-experience.md` (Progress Tracker) |
| `src/lib/gameEngine.ts` | `guest-experience.md` (Submitting an Answer, Answer matching rules) |
| `src/lib/encoding.ts` | `host-generating-sharing-link.md` (What the Link Contains) |
| `src/lib/storage.ts` | `data-and-constraints.md` (Data Storage), `host-creating-experience.md` (Draft Auto-Save) |
| `src/lib/validation.ts` | `host-creating-experience.md` (Validation, Form Sections), `data-and-constraints.md` (Hard Rules) |
| `src/lib/routes.ts` | `overview.md` (Application Routes) |
| `src/lib/i18n.ts` | `language-support.md` |
| `src/types/dateExperience.ts` | Any file whose described behavior depends on the changed type |
| `src/App.tsx` | `overview.md` |

When in doubt, also check `README.md` in `docs/functional/` — update it only if a new document is added or an existing one is renamed or removed.

## Review Workflow

1. **Identify changed files.** List every `src/` file that was added, modified, or deleted.
2. **Identify affected behaviors.** For each changed file, determine what user-facing behavior changed, was added, or was removed. Read the code to confirm; do not infer from variable or function names alone.
3. **Map to documentation.** Use the table above to find the documentation sections that describe those behaviors.
4. **Read and compare.** Read each affected section and compare the written description to the actual code behavior. Check field names, required vs. optional status, constraints, state transitions, error messages, and flow steps.
5. **Update where divergent.** Rewrite only the sections that are inaccurate or incomplete. Preserve accurate content.
6. **Verify consistency.** After updating, check that cross-references between documents remain accurate (for example, if a field becomes optional, ensure that both the form-fields table and the constraints table are updated).

## Update Rules

- Write in the same style as the existing documentation: concise declarative sentences, present tense, no implementation details.
- Describe what happens, not how it is implemented. Do not reference function names, component names, TypeScript types, or localStorage keys unless they are part of the user-visible interface.
- Use tables for structured data (fields, states, outcomes). Use prose for flows and conditions.
- Do not add sections for things that are unchanged.
- Do not remove accurate content.
- Do not add speculative content about future features.
- Keep the `docs/functional/README.md` index current: add a row if a new doc file is created.

## Output

After reviewing, report:

- Which source changes were reviewed.
- Which documentation files were affected and why.
- What was updated (with a brief description of each change).
- Whether any behavioral change could not be fully described (and why).

If no documentation update is needed, state that explicitly with the reason (e.g., "this change is a style refactor with no user-facing behavioral effect").
