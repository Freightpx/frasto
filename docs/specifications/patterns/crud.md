---
title: CRUD pattern
description: Coordinate create, read, update, and delete flows without turning Frasto into a backend framework.
---

CRUD is an application flow composed from resource and form patterns.

## Create

Provide clear entry from the resource list, validate near fields, preserve input on failure, and define the post-success destination.

## Read

Use the resource detail hierarchy and distinguish not-found, access-denied, loading, and temporary-error states.

## Update

Choose full-page, inline, or focused-overlay editing based on task complexity. Communicate saved state and resolve concurrent or stale data at the application layer.

## Delete

Separate destructive actions from routine edits. Confirm when the effect is difficult to reverse, name the resource and consequence, and define the post-delete destination.

## Ownership boundary

Frasto supplies layout, controls, semantics, and feedback structures. The application owns validation rules, authorization, persistence, concurrency, audit history, and recovery.

## Responsive behavior

Editing remains touch-safe, keyboard reachable, and free of horizontally clipped fields or overlay actions.
