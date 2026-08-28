---
title: Bulk actions pattern
description: Apply operations to selected records with explicit scope, risk, and progress.
---

## Entry

Bulk actions appear after at least one selectable record is selected. The interface communicates the count and whether selection applies to visible rows, the current page, or all matching results.

## Structure

```text
Selection controls
    ↓
Selection summary
    ↓
Available bulk actions
    ↓
Confirmation when risk requires it
    ↓
Progress and per-item outcome
```

## Semantics

Select-all labels state their scope. Row checkboxes include the record identity in their accessible names. Focus should not jump unpredictably when the bulk toolbar appears.

## Results

Partial success is a first-class state. Explain how many operations succeeded, which failed, and whether retry is available. Preserve enough selection context to recover.

## Destructive operations

Name the action, count, scope, and consequence. Do not rely on a red button as the warning.

## Responsive behavior

Actions may collapse into a menu, but selection count and a way to clear selection remain visible.
