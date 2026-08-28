---
title: Sidebar
description: Planned sectioned navigation for application destinations and account context.
---

**Status: Planned**

`Sidebar` organizes primary application destinations, nested groups, badges, and account-level context.

## Anatomy

- product or workspace identity
- navigation sections with optional labels
- links with optional icons and badges
- nested items where hierarchy is real
- account or utility region

## States

Define active, hover, focus-visible, expanded, collapsed, disabled/unavailable, and mobile-open states. Active location uses `aria-current` and a visible cue beyond color.

## Keyboard

Navigation links follow normal tab order. Collapsible groups expose expansion state and remain operable without pointer input.

## Responsive behavior

Persistent on wide layouts; drawer on mobile. Collapsed desktop mode must preserve accessible names and should provide labels for icon-only destinations.

## Content rule

Do not use deeply nested navigation to mirror an internal database hierarchy. Sections should reflect tasks and destinations people recognize.
