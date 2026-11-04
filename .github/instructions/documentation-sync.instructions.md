---
name: "Documentation Sync"
description: "Always triggered when code changes are requested. Review and update docs/ (including functional, technical, and other documentation types) to align with the implementation."
applyTo: "src/**, lib/**, types/**"
---

# Documentation Sync

**How it works:** This instruction activates whenever you are asked to implement code changes. After making or reviewing those changes, you must always review the relevant documentation and either confirm it is accurate or propose updates.

**Documentation scope:** The repository maintains multiple documentation types under `docs/`:
- `docs/functional/` — user-facing behaviors, flows, and features (the source of truth for expected app behavior)
- `docs/technical/` — architecture, internal design, and development guidance (future; scope as needed)
- Other documentation types as they are added

Keep all documentation synchronized with the actual implementation.

## When to Review & Update Documentation

**Always** perform a documentation review after implementing code changes. Review happens in two cases:

1. **Code adds, removes, or changes user-facing behavior** — update `docs/functional/` and any other affected docs
2. **Code is an internal refactor with no behavioral change** — verify that no docs accidentally describe the old behavior, and confirm existing docs remain accurate

**Behavioral changes** include:

- Adding a new user-facing feature, flow, or screen.
- Removing or changing the behavior of an existing feature.
- Changing a field (its name, type, required status, character limit, or optionality).
- Changing how the application validates, stores, or processes data.
- Changing the rules governing answer matching, riddle ordering, progress persistence, link encoding, or language selection.
- Changing what is shown to the host or guest under any condition (including error states, empty states, and success states).
- Changing a hard constraint (e.g. minimum riddle count, required fields, link invalidation rules).

**Cases where documentation review is still required but likely needs no updates:**

- Internal refactors with no user-visible effect (verify docs describe the current behavior correctly).
- Style, layout, or animation changes (review only to confirm docs don't contradict the new visuals).
- Test additions or changes (no doc updates needed unless test reveals an undocumented behavior).
- Dependency updates that don't change behavior (verify docs remain consistent).

## Documentation Map

This map helps you find which documentation to review. Reference the file that was changed and look up which documentation section(s) it affects.

**Note:** Currently only `docs/functional/` exists. As technical and other documentation types are added, this map will expand.

### Functional Documentation

The functional docs live in `docs/functional/` and describe user-facing behaviors, flows, and features.

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

When in doubt, also check `docs/functional/README.md` — update it only if a new document is added or an existing one is renamed or removed.

### Technical Documentation

Technical docs (when added to `docs/technical/`) will describe architecture, internal design patterns, and development guidance. Update these when you make changes that affect how the system is structured or implemented.


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

## Mandatory Output

Your response to any code change request **must always include** a documentation review section. This section must:

1. **Declare whether behavioral change occurred** — state clearly if the code change adds/modifies/removes user-facing behavior, or if it is a refactor/style/test-only change.

2. **Report findings** — for each documentation type that applies (`docs/functional/`, `docs/technical/`, etc.):
   - Which files were checked and why.
   - Whether updates are needed, and if so, what changed.
   - If no updates are needed, briefly explain why the docs remain accurate.

3. **Propose or perform updates** — if behavioral changes require doc updates:
   - If you are generating changes (a code task), propose the documentation updates in a separate section.
   - If you are reviewing a change, report what should be updated and provide the updates.

Example output format:

```
## Documentation Review

**Behavioral change:** Yes — added a new riddle success message field.

**Functional documentation:**
- Checked: `host-creating-experience.md` (Form Sections)
- Status: Needs update
- Change: Add "Success message" to the Riddles section table, mark as optional

**Technical documentation:**
- Not applicable (no architectural changes)

**Proposed updates:**
[markdown content showing exact changes to make]
```

If the change is refactor-only:

```
## Documentation Review

**Behavioral change:** No — internal refactoring of state management.

**Findings:** All existing documentation remains accurate. No updates needed.
```

