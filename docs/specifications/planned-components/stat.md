---
title: Stat
description: Designing compact quantitative summaries with explicit context and meaning.
---

**Status: Designing**

`Stat` presents one formatted value, its label, and optional change or context without turning every metric into a decorative card.

## Ownership boundary

- The application formats values, dates, units, and changes.
- The application decides whether a change is positive, warning, dangerous, informational, or neutral in its domain.
- Stat owns text hierarchy, tabular numerals, compact spacing, and optional visual composition.
- Stat does not calculate trends, format raw numbers, fetch metrics, or infer whether an increase is good.

## API

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `label` | `string` | required | identifies the metric |
| `value` | `string` | required | application-formatted primary value |
| `change` | `string` | — | explicit visible change or trend text |
| `changeTone` | `"neutral" \| "positive" \| "warning" \| "danger" \| "info"` | `"neutral"` | semantic treatment chosen by the application |
| `description` | `string` | — | period, comparison, or supporting context |
| `class` | `string` | — | styles the root |
| `valueClass` | `string` | — | styles the primary value |

All values are strings by design. Consumers format currency, percentages, compact notation, and localization before rendering.

## Slots

| Slot | Purpose |
| --- | --- |
| `visual` | optional small supplementary visualization |

Visual content must be hidden from assistive technology when decorative. If it communicates information not present in `change` or `description`, the consumer supplies an accessible summary.

## Composition contract

```astro
<Stat
  label="Active customers"
  value="112"
  change="Up 8 this month"
  changeTone="positive"
  description="From 128 total records"
/>
```

Stat uses description-list semantics. Groups use an application-owned grid with shared structural dividers rather than separate elevated cards.

## Accessibility

Trend direction and meaning are visible in `change`; color is supplemental. Avoid arrows without explanatory text. Values use tabular numerals, but accessible text remains the application-formatted string.

## Responsive behavior

An individual Stat wraps without clipping its label or context. Application-owned groups reduce columns while preserving DOM order. Long values may reduce group density, but must not overlap adjacent metrics.

## States to verify

- label and value only
- change in all semantic tones
- description without change
- optional visual
- long currency, percentage, and localized values
- two-, three-, and four-column groups collapsing to one column
- light and dark themes
