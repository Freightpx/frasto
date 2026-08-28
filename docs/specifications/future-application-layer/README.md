---
title: Future application layer
description: Higher-level application systems retained for future evaluation after the core library matures.
---

This section preserves specifications for higher-level application systems such as shells, resource workflows, settings layouts, and activity views. They remain useful research, but they are not the current implementation milestone or Frasto UI's product identity.

:::note[Reclassified without route churn]
PageHeader, Table, EmptyState, SearchInput, Pagination, and Stat are general-purpose components and now appear in the main Components navigation. Their existing documentation routes are intentionally preserved. The higher-level systems below remain Planned.
:::

## Inventory

| Component | Primary responsibility |
| --- | --- |
| AppShell | application frame and regions |
| Sidebar | sectioned application navigation |
| ResourceTable | real business data and row operations |
| FilterBar | search, filters, active criteria, clear action |
| DetailLayout | resource information, relations, activity, actions |
| SettingsLayout | settings navigation and content |
| ActivityFeed | chronological domain events |

Detailed research:

- [AppShell](./app-shell.md)
- [Sidebar](./sidebar.md)
- [ResourceTable](./resource-table.md)
- [FilterBar](./filter-bar.md)
- [DetailLayout](./detail-layout.md)
- [SettingsLayout](./settings-layout.md)
- [ActivityFeed](./activity-feed.md)

## Design rule

Future application systems must compose with ordinary HTML and general-purpose Frasto components. They must not fetch their own records or require a product to adopt a Frasto backend architecture.

For example, `Table` owns native table structure, density, alignment, and overflow presentation. A future `ResourceTable` may own a typed row-and-column abstraction and compose `Table`; neither component should fetch, sort, paginate, or mutate application data.

## Definition before build

Each component must define meaningful composition slots, data states, narrow-layout transformation, keyboard behavior, accessible structure, and ownership boundaries before implementation begins.

## Roadmap boundary

AppShell, Sidebar, ResourceTable, FilterBar, DetailLayout, SettingsLayout, and ActivityFeed are not part of the active Phase 4 expansion target. They may return after the general-purpose library has broader coverage, stronger maturity, and evidence from real applications.
