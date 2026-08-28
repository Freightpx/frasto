---
title: Component status and roadmap
description: The shared maturity language and current expansion direction for Frasto components.
---

## Status model

| Status | Entry criteria |
| --- | --- |
| Planned | repeatable use case and intended scope documented |
| Designing | API, anatomy, states, accessibility, and responsive behavior under review |
| Experimental | implementation available; change expected |
| Beta | documented and testable; feedback requested |
| Stable | API reviewed, accessible, responsive, tested, and versioned |
| Deprecated | replacement and migration path documented |

## Experimental components

- Actions: Button and IconButton
- Forms: Input, Textarea, Checkbox, Radio, Switch, Select, FormField, and [SearchInput](/docs/application-components/search-input/)
- Display: Badge, Avatar, Status, Skeleton, and Spinner
- Feedback: [EmptyState](/docs/application-components/empty-state/)
- Navigation: Breadcrumb and Tabs
- Overlays: Tooltip, Dropdown, Dialog, Drawer, and Popover
- Data: [Table](/docs/application-components/table/)
- Layout: Separator, Surface, and [PageHeader](/docs/application-components/page-header/)

SearchInput requires a dedicated keyboard and focus validation pass before it can advance to Beta.

The [component quality inventory](./component-inventory.md) records the current evidence and remaining Beta blockers for all 27 public component families. Successful diagnostics and builds establish a repository baseline, but do not replace automated behavioral, accessibility, responsive, or package-consumer tests.

## Designing

- [Pagination](../specifications/planned-components/pagination.md)
- [Stat](../specifications/planned-components/stat.md)

Their contracts are documented, but implementation is intentionally outside the current product-direction update.

## Planned coverage

Phase 4 inventory work will prioritize repeated, general-purpose needs across:

- disclosure, including Accordion and Collapsible
- advanced forms, validation, field grouping, and selection controls
- alerts, toasts, banners, progress, and richer feedback states
- navigation menus, steppers, and responsive navigation structures
- descriptions, lists, and broader data-display patterns
- stack, inline, section, divider, and responsive layout helpers
- API consistency and category-level gaps revealed by real interfaces

High-level application systems such as AppShell, ResourceTable, FilterBar, DetailLayout, SettingsLayout, and ActivityFeed remain documented for future evaluation. They do not block broad component-library maturity.

## Definition of done

A component is not complete when it only renders. Stable components require documented purpose, complete states, responsive behavior, accessibility, API review, examples, tests, and real-world evidence.

Use the [Phase 4 execution plan](./phase4-plan.md) for the ordered work that follows this inventory.
