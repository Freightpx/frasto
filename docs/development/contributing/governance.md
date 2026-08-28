---
title: Governance
description: How Frasto balances consistency, contribution, stability, and open-source growth.
---

Frasto is MIT-licensed and welcomes fixes, documentation, components, tests, accessibility improvements, recipes, and browser compatibility work.

## Decision priorities

When tradeoffs conflict, prefer:

1. accessibility and semantic correctness
2. clear repeatable interface use
3. Astro-first and server-first architecture
4. consistency with documented foundations
5. small runtime and dependency surface
6. API stability

## Maintainer review

New components require use-case, design, API, accessibility, documentation, and testing review. Component count is not a success metric.

## Versioning

Frasto uses Semantic Versioning. Early `0.x` releases may refine APIs, but changes should still be deliberate and documented. Stable components receive migration paths for breaking changes.

## Deprecation

Deprecated APIs remain documented with a replacement and removal target. Silent removal or ambiguous aliases create long-term cost.

## Ecosystem boundary

The open-source UI core must remain independently useful. Future Icons, Blocks, Pages, SaaS, commercial starters, or design assets may add value, but none may weaken, artificially limit, or become a requirement for the component and pattern system.
