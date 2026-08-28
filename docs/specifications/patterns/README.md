---
title: Patterns
description: Reusable interface compositions that explain how components cooperate across complete tasks.
---

Patterns combine components into repeatable interface structures for websites and applications.

They define hierarchy, state ownership, responsive transformation, and accessible behavior across multiple components. A pattern is not a screenshot, a rigid template, or a framework requirement.

## Resource list

```text
PageHeader
FilterBar
ResourceTable
Pagination
```

## Resource detail

```text
Detail header
Primary information
Related resources
Activity
Actions
```

## Settings

```text
Settings navigation
Section heading
Form groups
Save state / actions
```

## Dashboard

```text
PageHeader
Stats
Primary analysis
Recent activity
Operational table/list
```

## Master / detail

```text
Resource list  |  Detail panel
```

## Pattern contract

Every pattern should document:

- the task it supports
- required and optional regions
- component composition
- loading, empty, partial, and error states
- wide and narrow layouts
- keyboard and focus movement across regions
- which behavior belongs to the application

Examples may include dashboards, CRM, content systems, commerce, settings, and operational interfaces. These are useful pressure tests and use cases; none defines Frasto's identity.
