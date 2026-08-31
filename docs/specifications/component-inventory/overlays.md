---
title: Overlays inventory
description: Interaction contracts for dialogs, drawers, menus, popovers, and tooltips.
---

**Status: In progress**

Overlays temporarily place content above the normal page flow. They carry significant focus, keyboard, positioning, and responsive obligations.

## Inventory

| Component | Purpose |
| --- | --- |
| [Dialog](/docs/components/dialog/) | focused decision or task — Experimental |
| [Drawer](/docs/components/drawer/) | edge-attached navigation or task panel — Experimental |
| [Dropdown](/docs/components/dropdown/) | compact menu of actions or choices — Experimental |
| [Popover](/docs/components/popover/) | contextual non-modal content — Experimental |
| [Tooltip](/docs/components/tooltip/) | supplemental label or brief explanation — Experimental |
| ContextMenu | contextual action menu — Planned |
| HoverCard | optional linked-content preview — Phase 7 |

## Shared requirements

- explicit trigger relationship
- Escape behavior where expected
- outside interaction policy
- predictable focus entry and return
- accessible title/label
- viewport collision and overflow handling
- reduced-motion support

## Native foundations

Use `<dialog>` and the Popover API when they meet the required behavior and browser support. A dependency is justified only when it solves meaningful positioning or interaction complexity.

## Mobile

Large dialogs may become near-full-screen sheets. Tooltips cannot carry information required to complete a touch interaction.
