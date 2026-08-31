---
title: Forms inventory
description: Planned field primitives and composition rules for accessible data entry.
---

**Status: In progress**

Forms should work with ordinary HTML submission, Astro Actions, or any application-controlled mutation layer.

## Initial inventory

| Component | Purpose |
| --- | --- |
| [FormField family](/docs/components/form-field/) | associates label, description, control, and error — Experimental |
| [Input](/docs/components/input/) | single-line text and native input types — Experimental |
| [Textarea](/docs/components/textarea/) | multi-line text — Experimental |
| [Select](/docs/components/select/) | native option selection — Experimental |
| [Checkbox](/docs/components/checkbox/) | independent boolean choice — Experimental |
| [Radio](/docs/components/radio/) | one choice from a visible group — Experimental |
| [Switch](/docs/components/switch/) | immediate binary setting — Experimental |
| [SearchInput](/docs/application-components/search-input/) | search intent with clear behavior — Experimental |
| Label | standalone native control label — Phase 7 |
| InputGroup | control with addons, text, or actions — Phase 7 |
| Fieldset / FieldGroup | related controls and group-level description — Planned |
| Combobox | searchable option selection — Phase 7 |
| Date and time controls | typed temporal input with locale-aware guidance — Planned |
| Slider / Range | bounded numeric selection — Phase 7 |
| FileInput | file selection, constraints, and selected-file feedback — Planned |

## Contract

Field components preserve `name`, `value`, `required`, `disabled`, `autocomplete`, and other relevant native attributes. They do not own validation libraries or mutation requests.

## Required states

- default and focus-visible
- disabled and read-only where native semantics allow
- required
- invalid with associated message
- loading/submitting at the form or action boundary

## Errors

An error message identifies the field, describes the problem, and remains associated through `aria-describedby` or the native equivalent. Placeholder text is not a label.

## Enhanced controls

Combobox, date and range controls, tag input, file input, and other advanced fields arrive only after their keyboard, focus, parsing, validation, and responsive contracts are complete. SearchInput remains Experimental and needs dedicated keyboard/focus validation before Beta.
