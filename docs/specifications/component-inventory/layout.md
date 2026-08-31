---
title: Layout inventory
description: Layout primitives that reinforce structure without creating card-heavy interfaces.
---

**Status: In progress**

Layout components provide repeated spacing, alignment, surface, and section behavior.

## Inventory

| Component | Purpose |
| --- | --- |
| [Surface](/docs/components/surface/) | semantic background and optional boundary · Experimental |
| [Separator](/docs/components/separator/) | structural or decorative division · Experimental |
| [PageHeader](/docs/application-components/page-header/) | page context, heading, metadata, and actions · Experimental |
| Section | page region with heading relationship |
| Stack | vertical rhythm |
| Inline | horizontal or wrapping rhythm |
| Cluster | wrapping related controls or metadata |
| Grid | responsive repeated-column layout |
| Center / Container | readable width and page alignment |
| StickySurface | stable sticky region with optional stuck-state enhancement — Phase 7 |

## Restraint

Do not use a card as the default wrapper for every page region. Prefer `Section`, spacing, and separators when content already has a clear relationship.

## Semantics

Layout primitives should avoid inventing roles. A `Section` may render a semantic `<section>` when it has an accessible heading; a spacing wrapper may remain a `<div>`.

## Responsive behavior

Stack and Inline need clear wrap, alignment, and gap behavior. They should not become a substitute for product-specific layout decisions or expose every CSS property as a prop.
