---
title: Accordion
description: Contract for coordinated, progressively enhanced disclosure regions.
---

**Status: Experimental — implemented in Phase 4 Gate 4**

`Accordion` coordinates related disclosure items while preserving readable server-rendered content before enhancement.

## Family API

### Accordion

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `type` | `"single" \| "multiple"` | `"single"` | controls whether one or many items may be open |
| `collapsible` | `boolean` | `false` | allows the open item in single mode to close |
| `defaultValue` | `string \| string[]` | — | values open when enhancement begins |
| `class` | `string` | — | styles the root |

Native div attributes pass through. The default slot accepts `AccordionItem` children.

### AccordionItem

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `value` | `string` | required | stable item identity used by root state and events |
| `disabled` | `boolean` | `false` | prevents user changes and focus on its trigger |
| `class` | `string` | — | styles the item |

The default slot accepts one `AccordionTrigger` and one `AccordionContent`.

### AccordionTrigger and AccordionContent

Both accept `class` and their corresponding native button or div attributes. Trigger is always `type="button"`; Content supplies the disclosed region.

## Behavior

- Server output leaves content readable if JavaScript is unavailable.
- Enhancement assigns trigger/content relationships and applies `defaultValue`.
- Trigger activation toggles its item according to the root type and collapsible policy.
- Disabled item triggers do not enter the tab order.
- Arrow Down/Up moves among enabled triggers; Home/End moves to the first/last enabled trigger.
- User changes emit bubbling `frasto:accordion-change` with `{ value, open, values }`.
- Programmatic changes may update the same DOM attributes without assuming application state ownership.

Trigger buttons expose `aria-expanded` and `aria-controls`; content regions expose `role="region"` and `aria-labelledby` after enhancement. Heading hierarchy remains application-owned around the component.

## Acceptance states

Single, multiple, non-collapsible, collapsible, disabled, no-script content, long trigger/content, narrow, light/dark, zoom, keyboard focus, and reduced motion.
