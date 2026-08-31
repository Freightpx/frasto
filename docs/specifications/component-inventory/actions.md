---
title: Actions inventory
description: Available action primitives and the planned grouped-action contract.
---

**Status: Experimental.**

Actions initiate a user-controlled operation or navigation. Labels should be verbs that describe the outcome.

## Inventory

| Component | Purpose | Initial obligations |
| --- | --- | --- |
| [Button](/docs/components/button/) | text action or link treatment | Experimental |
| [IconButton](/docs/components/icon-button/) | compact familiar action | Experimental |
| [ButtonGroup](/docs/components/button-group/) | related actions | spacing, adjacency, focus order |
| SplitButton | primary action with related alternatives | explicit default, menu relationship |
| ToggleButton | persistent pressed state | `aria-pressed`, visible selected state |
| Toggle | one persistent pressed action — Phase 7 | `aria-pressed`, disabled state, visible selected state |
| ToggleGroup | coordinated pressed actions — Phase 7 | single/multiple selection, roving focus, orientation |

## Shared API language

Actions may use `variant`, `tone`, and `size`. A destructive tone communicates risk; it does not imply that confirmation is handled by the button.

## Semantics

Render `<button>` for an action and `<a>` for navigation. Visual consistency does not justify changing the native role.

## States

Define default, hover, active, focus-visible, disabled, and loading. Loading must prevent duplicate activation without making the control lose its accessible name or dimensions.

## Composition

Icons are optional support. The label remains the primary communication unless the action is universally understood and has a strong accessible name.
