---
title: Component philosophy
description: Design component APIs around intent and broadly repeatable interface problems.
---

## Do not wrap HTML without adding a system

A component should provide meaningful consistency, behavior, semantics, composition, or interface vocabulary. A component that only renames one HTML element is usually unnecessary.

## Prefer semantic APIs

Good:

```astro
<Button variant="solid" tone="danger" size="sm">
  Delete
</Button>
```

Avoid APIs that expose visual implementation as a bag of utility values.

## Separate presentation and meaning

A useful vocabulary is:

- `variant` → presentation treatment
- `tone` → semantic meaning
- `size` → physical scale
- `state` → interaction/data condition

## Coverage and composition both matter

The library should cover general-purpose needs across actions, forms, display, feedback, navigation, overlays, data, layout, and disclosure. Useful components include both focused primitives and composed structures such as:

- PageHeader
- Table
- SearchInput
- EmptyState
- Pagination
- Stat

They follow the same tokens, API conventions, accessibility standard, and interaction rules. High-level application systems may be explored later, but they do not define or block the core inventory.

## Composition before configuration

Prefer slots and small cooperating components when a single prop-heavy component would need to anticipate every interface. Configuration is appropriate for structured data such as columns and options; authored content often composes more clearly.

## State is public behavior

Loading, empty, invalid, disabled, selected, and error states belong in the specification. A component API is incomplete if consumers must inspect source to understand those states.

## Do not own the application

Components may express interaction intent, but the consuming project controls routing, persistence, authorization, fetching, and business rules.
