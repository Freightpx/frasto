---
title: Acme Cloud
description: A preserved planned SaaS recipe for validating Frasto under realistic product conditions.
---

**Status: Planned and deferred**

Acme Cloud remains a valid application recipe, but it is not the current product milestone. Its route map and validation scenarios are preserved as research for future recipes, Pages, or SaaS work after the open-source UI library matures.

## Route map

```text
Dashboard

Customers
├── Customer list
├── Customer detail
└── Add customer

Companies
Invoices

Team
├── Members
├── Roles
└── Invitations

Billing

Settings
├── General
├── Profile
├── Security
├── Notifications
└── API keys
```

## Validation scenarios

- long customer and company names
- varied statuses and currencies
- large and empty result sets
- selected rows and bulk actions
- partial failures in detail views
- unsaved and invalid settings forms
- mobile navigation and transformed tables
- light, dark, zoomed, reduced-motion, and keyboard-only use

## Data

Mock TypeScript fixtures keep the recipe deterministic and backend independent. Integration guides may later show how the same contracts receive real data.

## Exit criteria

The recipe becomes useful when its dependent components are mature enough to reveal missing system decisions without pulling the core library toward one application type.
