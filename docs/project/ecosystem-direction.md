---
title: Ecosystem direction
description: How a mature Frasto UI foundation can support Icons, Blocks, Pages, and SaaS.
---

Frasto grows outward from one priority: a dependable open-source UI component library and design system for Astro.

```text
Frasto UI
Components, tokens, APIs, documentation
        ↓
Real-world maturity
Adoption, feedback, accessibility, hardening
        ↓
Frasto Icons
A first-party visual language, when justified
        ↓
Frasto Blocks
Reusable multi-component compositions
        ↓
Frasto Pages
Complete page-level starting points
        ↓
Frasto SaaS
A focused product layer built on proven foundations
```

## UI comes first

The core library must remain broadly useful without any future Frasto product. Its APIs, accessibility, design tokens, documentation, and component coverage are the foundation every later layer depends on.

## Maturity comes from use

Real websites and applications reveal missing states, awkward composition boundaries, accessibility gaps, and maintenance costs that isolated demos cannot. Phase 7 makes that feedback a formal product input.

## Icons

Frasto currently uses Lucide for its built-in icon set and keeps consumer icon slots open. A first-party Frasto Icons library is a future exploration, not a current replacement or dependency.

## Blocks and Pages

Blocks may package proven multi-component compositions. Pages may turn those blocks into complete interface starting points. Both should emerge from repeated real needs, not speculative inventory.

## SaaS

Frasto SaaS remains a possible future ecosystem layer. Existing dashboard, CRM, settings, and Acme Cloud examples continue to pressure-test the library, but SaaS is one use case rather than the identity of Frasto UI.

Each layer must be useful, documented, and maintainable on its own. Later products must not compromise the server-first, backend-agnostic, accessible core.
