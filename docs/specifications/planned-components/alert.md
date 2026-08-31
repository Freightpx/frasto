---
title: Alert
description: Contract for persistent contextual feedback.
---

**Status: Experimental — implemented in Phase 4 Gate 4**

`Alert` presents persistent contextual feedback. It does not assume the message appeared dynamically and therefore does not force a live-region role.

## API

| Prop | Type | Default | Purpose |
| --- | --- | --- | --- |
| `tone` | `"neutral" \| "info" \| "positive" \| "warning" \| "danger"` | `"neutral"` | semantic visual treatment |
| `title` | `string` | — | concise visible message heading |
| `class` | `string` | — | styles the root |

Native div attributes, including an application-selected `role`, pass through. The `icon` slot accepts a decorative or meaningfully labelled visual. The default slot supplies the message.

Alert uses a structural border, flat surface, square geometry, visible text beyond color, and no dismiss behavior. Applications add `role="alert"` or a live region only when the timing of a dynamic update requires it.

## Acceptance states

All tones, title/no title, icon/no icon, long content, links/actions in content, light/dark, narrow, and zoom.
