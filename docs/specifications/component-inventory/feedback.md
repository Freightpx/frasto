---
title: Feedback inventory
description: Planned feedback primitives for validation, progress, empty data, and operation results.
---

**Status: In progress**

Field-level error structure is **Experimental** as part of the [FormField family](/docs/components/form-field/), and [EmptyState](/docs/application-components/empty-state/) is Experimental. Alerts, banners, toasts, and richer operation feedback remain Planned.

Feedback explains what the system is doing, what changed, and what the person can do next.

## Feedback types

| Type | Examples | Announcement guidance |
| --- | --- | --- |
| field | description, validation error | associated with the control |
| operation | saving, saved, failed | announce meaningful asynchronous results |
| data | loading, empty, partial, error | preserve page context and next action |
| transient | toast, inline notice | use sparingly; do not hide critical actions |

## Planned inventory

- Alert and Banner for persistent contextual feedback
- Toast for brief asynchronous outcomes with an accessible queue policy
- Progress for known-duration work
- ErrorSummary for form- or page-level validation navigation
- Result for terminal success, warning, or error outcomes

## Rules

- State the outcome in direct language.
- Keep errors close to the affected content.
- Do not replace recoverable page content with a generic full-page error.
- Preserve user input when retry is possible.
- Avoid indefinite spinners when progress or a skeleton would communicate more.

## Ownership

Frasto defines visual and semantic feedback structures. The application owns error mapping, retry behavior, persistence, and logging.
