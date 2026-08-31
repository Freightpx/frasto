---
title: Collapsible
description: Contract for one independently controlled disclosure region.
---

**Status: Experimental — implemented in Phase 4 Gate 4**

`Collapsible` controls one optional content region without coordinating sibling disclosures.

## Family API

### Collapsible

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `defaultOpen` | `boolean` | `false` | opens the region when enhancement begins |
| `disabled` | `boolean` | `false` | prevents user changes and trigger focus |
| `class` | `string` | — | styles the root |

Native div attributes pass through. The default slot accepts one `CollapsibleTrigger` and one `CollapsibleContent`.

Trigger and Content accept `class` and corresponding native attributes. Trigger renders a `type="button"` button. Server output leaves content readable before enhancement. Enhancement assigns `aria-expanded`, `aria-controls`, `role="region"`, and `aria-labelledby`, then applies `defaultOpen`.

User changes emit bubbling `frasto:collapsible-change` with `{ open }`. Native button Enter and Space operation is retained. Disabled triggers do not enter the tab order.

## Acceptance states

Closed, default-open, disabled, no-script content, long content, narrow, light/dark, focus-visible, zoom, and reduced motion.
