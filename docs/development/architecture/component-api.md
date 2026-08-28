---
title: Component API conventions
description: Public props should describe user intent, semantics, and composition—not CSS implementation.
---

Frasto APIs use a small shared vocabulary across component layers.

## Naming model

| Prop | Meaning | Example |
| --- | --- | --- |
| `variant` | presentation treatment | `solid`, `outline`, `ghost` |
| `tone` | semantic intent | `neutral`, `positive`, `danger` |
| `size` | component scale | `sm`, `md`, `lg` |
| `state` | interaction or data condition | `loading`, `invalid` |
| `density` | repeated-content rhythm | `comfortable`, `compact` |

Not every component needs every prop.

## Defaults

Defaults should cover the most common accessible use without configuration. Boolean props use positive names where possible. Avoid combinations that create impossible or contradictory states.

## Native attributes

Forward relevant HTML attributes, especially accessible names, IDs, form attributes, `data-*`, and `aria-*`. Do not accept arbitrary props if they cannot be applied predictably.

## Slots

Use named slots for meaningful composition such as icon, description, actions, and metadata. A slot contract should say where content appears and what semantics the caller remains responsible for.

## Events

Browser behavior emits standard events where possible. Custom events use documented names, payloads, bubbling, and cancellation behavior.

## Breaking changes

Changing a default, narrowing a union, renaming a slot, or changing rendered semantics can be breaking even when TypeScript still compiles.
