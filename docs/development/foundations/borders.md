---
title: Borders
description: Quiet structural lines that preserve hierarchy without visual noise.
---

Borders are a primary structural tool in Frasto. They separate rows, define controls, and clarify selected or contained states without making every region float.

## Roles

| Role | Default | Use |
| --- | --- | --- |
| default border | `1px solid var(--frasto-border)` | rows, inputs, surfaces, separators |
| strong border | `1px solid var(--frasto-border-strong)` | selected or emphasized boundaries |
| focus outline | `2px solid var(--frasto-focus)` | keyboard focus, offset from the control |

## Rules

- Prefer a single shared divider to borders around every child.
- Use stronger borders sparingly and pair selection with another cue.
- Do not remove a control boundary when the surface behind it makes the edge unclear.
- Focus treatment is not a decorative border and must remain visible at all themes.

## Dense data

Tables and lists usually need horizontal dividers more than individually boxed rows. Preserve scan continuity by avoiding gaps and rounded containers between every record.
