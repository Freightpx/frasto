---
title: ActivityFeed
description: Planned chronological events with actors, timestamps, changes, and optional actions.
---

**Status: Planned**

`ActivityFeed` presents a readable history of meaningful domain events.

## Event examples

- comment created
- status changed
- customer created
- invoice sent
- user invited
- payment received
- field updated

## Data contract

An event needs a stable identity, actor or system source, action summary, timestamp, and optional structured details. The application formats domain-specific changes and controls pagination.

## Semantics

Use a chronological list. Timestamps use machine-readable `datetime` values and human-readable labels. Expanded change details remain connected to the parent event.

## Content

Prefer “Maya changed status from Trial to Active” over generic “Record updated.” Preserve enough context to understand the event without opening an audit database.

## States

Loading, empty history, partial pages, failed page load, and live insertion all require explicit behavior. New events should not unexpectedly move keyboard or reading position.

## Responsive behavior

Metadata stacks beneath the event summary; long field values wrap or disclose without breaking the timeline.
