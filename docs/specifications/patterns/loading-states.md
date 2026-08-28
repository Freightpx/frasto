---
title: Loading states
description: Preserve structure and context while data or operations are in progress.
---

## Choose the right signal

| Situation | Preferred feedback |
| --- | --- |
| initial structured content | skeleton matching stable layout |
| short local action | inline progress or button state |
| known progress | progress indicator with value |
| unknown longer task | status text with indeterminate indicator |
| background refresh | preserve data and show subtle refresh state |

Use [Skeleton](/docs/components/skeleton/) when initially unavailable structured content needs to reserve its final layout. Use [Spinner](/docs/components/spinner/) for a short local operation whose structure is already present.

## Rules

- Avoid replacing a whole page when one region is loading.
- Preserve layout to reduce disruptive movement.
- Keep the task name or page context visible.
- Prevent duplicate submission without making controls lose meaning.
- Escalate to helpful status text when a wait becomes longer than expected.

## Accessibility

Announce meaningful state changes once. Animated indicators respect reduced motion. `aria-busy` may identify the affected region, but it does not replace visible text when users need an explanation.

## Server first

Render known data immediately. Do not show a client-side skeleton for information already available during Astro rendering.
