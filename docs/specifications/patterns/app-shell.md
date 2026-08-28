---
title: App shell pattern
description: Compose identity, navigation, utilities, and route content into one stable application frame.
---

## Use when

A product has repeated authenticated or operational routes that share primary navigation and identity.

## Structure

```text
AppShell
├── Skip link
├── Product identity
├── Sidebar / primary navigation
├── Optional utility navigation
└── Main route content
```

## State ownership

The application resolves routes, active destinations, authentication, and account actions. The pattern coordinates landmark structure, responsive navigation state, and content offset.

## Responsive behavior

Persistent navigation becomes a drawer or compact mode. Opening it moves focus into a labeled region; closing returns focus to the trigger. Main content should not become unreachable or visually jump under the overlay.

## Avoid

- nesting several competing navigation systems
- placing route content outside the main landmark
- requiring client hydration for static shell markup
- treating mobile as a collapsed desktop sidebar without a usable open/close flow
