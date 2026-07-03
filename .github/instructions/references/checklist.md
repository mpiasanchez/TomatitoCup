# Accessibility Audit Checklist

Use this checklist during implementation reviews and audits. Validate with both automated checks and manual interaction.

## 1) Structure and Semantics

- Page has one clear `h1` and logical heading hierarchy.
- Landmarks are present and meaningful (`header`, `nav`, `main`, `footer`).
- Lists, tables, and form structures use semantic HTML.
- Document language is defined.

## 2) Names, Roles, Values

- Interactive controls have accurate accessible names.
- Icon-only buttons include programmatic labels.
- Form controls have associated labels and descriptions.
- Custom components expose correct role, state, and value.

## 3) Keyboard and Focus

- All functionality works with keyboard-only input.
- Focus order follows visual and reading order.
- Focus indicator is visible at all times.
- No keyboard trap exists.
- Dialogs move focus in on open and restore focus on close.

## 4) Forms and Validation

- Required fields are indicated programmatically and visually.
- Instructions are available before input is required.
- Errors are announced and tied to specific fields.
- Error text is specific and actionable.
- Success and status messages are announced when relevant.

## 5) Visual Accessibility

- Text and UI controls meet contrast requirements.
- Information is not conveyed by color alone.
- Content remains usable at 200% zoom and reflow.
- Text spacing overrides do not break content.
- Responsive layouts preserve function and readability.

## 6) Dynamic and Composite UI

- Disclosures, tabs, menus, and accordions support expected keyboard interaction.
- Modals are correctly labeled and focus-managed.
- Live regions announce meaningful async updates without noise.
- Route changes update title and preserve predictable focus behavior.

## 7) Media and Non-Text Content

- Informative images have useful alternative text.
- Decorative images are ignored by assistive technology.
- Audio/video include captions/transcripts as appropriate.
- Data visualizations have equivalent textual interpretation.

## 8) Tables and Data Presentation

- Data tables use headers and correct associations.
- Complex tables expose relationships clearly.
- Sort/filter state is communicated programmatically.

## 9) Testing Coverage Notes

Record what was tested and what was not tested:

- Browsers and versions.
- Screen readers and versions (if used).
- States covered: normal, error, disabled, loading, empty, modal, responsive.
- Known environment constraints and untested risk areas.
