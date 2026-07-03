---
description: "Use when building, reviewing, remediating, testing, or reporting web accessibility in React, TypeScript, HTML, and CSS. Applies WCAG 2.2 AA by default, combines automated and manual checks, and requires severity-ranked findings with reproducible remediation."
name: "Web Accessibility"
applyTo: "src/**, index.html"
---
# Web Accessibility

Auto-apply scope: This instruction auto-attaches for frontend development and testing. It does not auto-attach for backend code or CI/pipeline configuration unless explicitly requested.

Build accessibility into the interface, evaluate it in realistic states, and verify fixes with more than automated tooling.

## Baseline and Claims

- Default to WCAG 2.2 Level AA unless the user or project specifies another target.
- Treat WCAG conformance, legal compliance, and general usability as related but distinct claims.
- Never promise legal compliance.

## Implementation Principles

- Prefer native HTML elements and browser behavior.
- Add ARIA only when native semantics cannot express the interaction.
- Treat WAI-ARIA APG as informative guidance, not a substitute for testing.
- Preserve existing visual intent and product behavior when they remain accessible.
- Explain any behavior change that is necessary for accessibility.

## Scope First

For accessibility work, establish scope first:

- Requested action: build, review, remediate, test, or report.
- Conformance target and any organizational or jurisdictional requirements.
- Critical routes, tasks, components, states, breakpoints, browsers, and assistive technologies.
- Availability of authenticated, error, loading, empty, validation, modal, and dynamic states.

If no target is given, state that WCAG 2.2 AA is the working baseline.
Do not block a focused code change on obtaining a full-site audit.

## Investigation Workflow

When a runnable target is available:

- Inspect both source code and rendered interface.
- Identify component libraries, routing, focus management, validation, state updates, responsive behavior, and existing accessibility tooling.
- Read `references/checklist.md` for relevant audit areas.
- For custom widgets, consult the current W3C APG pattern and implement APG semantics and keyboard behavior only after confirming native controls are unsuitable.

## Verification Requirements

- Use automated checks for deterministic issues.
- Perform manual checks for behavior, meaning, and usability.
- Never claim conformance based only on automated scans.

At minimum, evaluate:

- Semantic structure and accessible names.
- Keyboard-only operation, focus order, focus visibility, and focus restoration.
- Form labeling, instructions, validation, errors, and status updates.
- Zoom, reflow, responsive states, text spacing, contrast, and non-color cues.
- Dynamic content, dialogs, menus, disclosures, tabs, and other custom interactions.
- Images, icons, media, tables, and document language.
- A representative screen-reader path when environment permits.

Record any environment or assistive-technology coverage that could not be tested.

## Findings Format

For each confirmed finding, report:

- Location and reproducible steps.
- Affected users and practical impact.
- Observed behavior and expected behavior.
- Relevant WCAG success criterion and level, when applicable.
- Concrete remediation.
- Verification method.

Classify severity consistently:

- Blocker: prevents completion of a critical task.
- High: major barrier without a reasonable workaround.
- Medium: substantial friction or loss of information.
- Low: limited impact, edge case, or robustness improvement.

Label inclusive-design advice that is not normative as best practice.
Do not assign a WCAG criterion unless evidence supports it.

## Fix Implementation Rules

When implementing fixes:

- Use semantic HTML before ARIA.
- Keep DOM order aligned with reading and focus order.
- Provide programmatic names, descriptions, relationships, errors, and states.
- Implement complete keyboard behavior and deliberate focus movement for composite or modal interactions.
- Announce meaningful asynchronous changes without noisy live regions.
- Keep accessible behavior inside reusable components.
- Avoid positive tabindex, redundant roles, invalid ARIA, hidden focusable content, and incomplete keyboard reimplementations of native controls.
- Preserve accessible names and focus behavior across loading, rerendering, and route changes.
- Add regression tests at the lowest useful layer.
- Do not replace manual interaction checks with snapshots or lint rules.

## Post-Fix Validation

After changes:

- Re-run relevant automated checks.
- Repeat affected manual journeys.
- Test normal, error, disabled, loading, empty, and responsive states.
- Confirm no keyboard traps, unexpected announcements, clipped content, pointer-only actions, or regressions elsewhere.

## Task-Type Output Rules

- For implementation tasks: make requested code changes and summarize verification.
- For audits: lead with findings ordered by severity, then provide scope and limitations.
- For design or planning tasks: convert requirements into testable acceptance criteria.
- Avoid vague goals like "screen-reader friendly" without measurable checks.
