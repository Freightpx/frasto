---
title: ButtonGroup
description: Contract for labelled groups of closely related actions.
---

**Status: Experimental — implemented in Phase 4 Gate 4**

`ButtonGroup` arranges a small set of closely related controls and exposes their relationship to assistive technology.

## Family API

### ButtonGroup

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `label` | `string` | required | accessible group name |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | visual group direction |
| `class` | `string` | — | styles the root |

Native div attributes pass through except role and `aria-label`; the root always renders `role="group"` with the supplied label. Controls retain ordinary DOM order and keyboard behavior. The component does not impose selection semantics.

### ButtonGroupText

A non-interactive text addon accepting native span attributes and `class`.

### ButtonGroupSeparator

A decorative separator accepting native span attributes and `class`. Its orientation follows the parent group and it is hidden from assistive technology.

## Acceptance states

Horizontal, vertical, mixed Button/IconButton content, text addon, separator, disabled/loading child controls, long labels, narrow wrapping policy, light/dark, and focus-visible.
