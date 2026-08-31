---
title: Pagination
description: Designing server-first result navigation with authored links and current-page context.
---

**Status: Experimental — implemented in Phase 4 Gate 3**

`Pagination` moves through a known result sequence with ordinary URLs and communicates the current position. The initial API is compositional so numbered, cursor-based, and abbreviated sequences share one semantic foundation.

## Ownership boundary

- The application owns URLs, page or cursor state, result totals, query parameters, and navigation enhancement.
- Pagination owns the labelled navigation landmark, summary placement, item layout, and narrow visibility rules.
- PaginationItem owns one page, previous, next, disabled, current, or gap presentation.
- Neither component constructs queries, fetches results, preserves scroll, or mutates browser history.

## Pagination API

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `label` | `string` | `"Pagination"` | accessible navigation-landmark name |
| `class` | `string` | — | styles the root navigation element |
| `listClass` | `string` | — | styles the ordered item list |

Native navigation attributes pass through. The default slot accepts authored PaginationItem children. A named `summary` slot accepts visible result context such as “1–25 of 128”.

## PaginationItem API

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `kind` | `"page" \| "previous" \| "next" \| "gap"` | `"page"` | identifies presentation and narrow behavior |
| `href` | `string` | — | renders an ordinary destination link |
| `current` | `boolean` | `false` | renders non-linked `aria-current="page"` semantics |
| `disabled` | `boolean` | `false` | renders an unavailable non-link item |
| `label` | `string` | — | accessible name when visible text is insufficient |
| `class` | `string` | — | styles the list item |
| `linkClass` | `string` | — | styles the link or non-link content |
| `linkAttributes` | native anchor attributes | `{}` | passes `rel`, `target`, and other attributes to linked items |

The default slot supplies visible content. Native anchor attributes such as `rel` may be passed through a `linkAttributes` object, matching BreadcrumbItem's link boundary.

## Rendering rules

- `current` takes precedence over `href` and renders `aria-current="page"` without a link.
- `disabled` previous and next items render as unavailable non-links with `aria-disabled="true"`.
- A gap renders non-interactive ellipsis content hidden from assistive technology.
- A non-current page item should provide `href`.
- Exactly one numbered item should be current when numbered pages are shown.
- Cursor pagination may omit numbered page items and use the summary slot for position context.

## Composition contract

```astro
<Pagination label="Customer results">
  <span slot="summary">26–50 of 128 customers</span>
  <PaginationItem kind="previous" href="?page=1">Previous</PaginationItem>
  <PaginationItem href="?page=1" label="Go to page 1">1</PaginationItem>
  <PaginationItem current label="Current page, page 2">2</PaginationItem>
  <PaginationItem href="?page=3" label="Go to page 3">3</PaginationItem>
  <PaginationItem kind="gap">…</PaginationItem>
  <PaginationItem href="?page=6" label="Go to page 6">6</PaginationItem>
  <PaginationItem kind="next" href="?page=3">Next</PaginationItem>
</Pagination>
```

The application preserves active search and filter parameters in every authored URL. Client-side interception is optional and must preserve native-link behavior.

## Accessibility and keyboard behavior

The root is a named `nav` landmark containing an ordered list. Current-page and unavailable states are semantic and never rely only on styling. Links use the browser's ordinary keyboard and navigation behavior; disabled items do not enter the tab order.

## Responsive behavior

At narrow widths, previous, current, next, and the summary remain visible while non-current numbered pages and gaps may be hidden. The result still communicates position without compressing controls below the 36px control target.

## States to verify

- first, middle, and last numbered page
- single-page result
- abbreviated page sequence with gaps
- cursor-style previous/next navigation without page numbers
- long result summary and localized labels
- URLs preserving active query parameters
- narrow compact mode
- focus-visible, light theme, and dark theme
