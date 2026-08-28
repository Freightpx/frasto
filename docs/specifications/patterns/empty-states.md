---
title: Empty states
description: Distinguish first use, no results, permissions, and unavailable content.
---

Empty is a domain state, not a single reusable sentence.

## Decision table

| Cause | Preserve | Next action |
| --- | --- | --- |
| no records yet | page context | create, import, or learn |
| active filters | search and filters | adjust or clear |
| no access | requested destination | request access or return |
| archived/hidden scope | active view context | change view |
| dependent setup missing | prerequisite explanation | configure prerequisite |

## Composition

Use a concise heading, one explanation, and at most one dominant action. Illustration is optional and restrained; it should not make an operational tool feel like a marketing page.

## Dynamic change

When deletion or filtering creates the empty state, preserve focus logically and announce the result if it would otherwise be unclear.

## Avoid

- “Nothing here” without cause
- create actions a person cannot access
- the same copy for first use and no search results
- hiding filters when they caused the empty result
