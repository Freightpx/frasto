---
title: Master / detail pattern
description: Keep a resource list and active detail context visible for rapid repeated work.
---

## Use when

People move through many adjacent records: CRM contacts, tickets, messages, inventory, approvals, or documents.

## Structure

```text
Master list              Detail panel
├── search/filter        ├── identity and status
├── records              ├── primary content
└── pagination           └── actions/activity
```

## Selection

The active record uses a clear selected state and programmatic indication. URL or history integration should preserve deep linking and browser navigation where the product requires it.

## Keyboard

List navigation and detail interaction must not trap focus or reset reading position unexpectedly. Opening a detail panel should have an explicit focus policy.

## Responsive behavior

On narrow screens, the detail usually becomes a full route or a full-height panel with a clear return to the previous list state. Preserve filters, scroll position, and selection when returning.

## Avoid

Do not use master/detail when records require wide, independent workflows that cannot fit a secondary panel.
