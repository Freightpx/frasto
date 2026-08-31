---
title: Display inventory
description: Planned primitives for identity, state, progress, and compact supporting information.
---

**Status: In progress**

Display components communicate information without owning application data.

## Inventory

| Component | Purpose | Key states |
| --- | --- | --- |
| [Badge](/docs/components/badge/) | compact category or metadata — Experimental | neutral and semantic tones |
| [Avatar](/docs/components/avatar/) | person or organization identity — Experimental | image and explicit fallback |
| AvatarGroup | compact group identity | overflow count, accessible list |
| [Status](/docs/components/status/) | current operational state — Experimental | text cue beyond color |
| [Separator](/docs/components/separator/) | semantic or decorative division — Experimental | orientation and structural tone |
| [Skeleton](/docs/components/skeleton/) | reserved loading shape — Experimental | pulse, static, reduced motion |
| Progress | known completion | determinate/indeterminate semantics |
| [Spinner](/docs/components/spinner/) | short indeterminate wait — Experimental | contextual or component-owned label |
| [Stat](/docs/components/stat/) | quantitative summary — Experimental | value, context, trend meaning |
| DescriptionList | structured term/value information | semantic grouping, long content |
| Kbd / Code | compact technical notation — Kbd committed for Phase 7 | contrast and readable overflow |
| Date | deterministic localized date/time output — Phase 7 | valid datetime, locale, timezone, explicit fallback |
| Card | restrained compound content region — Phase 7 | hierarchy, long content, no default elevation |
| Item | reusable resource/list content — Phase 7 | semantic composition, actions, long content |
| Carousel | user-controlled slide collection — Phase 7 | native scroll, controls, announcements, no autoplay |
| Marquee | optional moving presentation — Phase 7 | pause, reduced motion, hidden duplicates |

## Data integrity

Display primitives do not infer domain meaning. The application decides whether `pending` is warning, neutral, or positive in its workflow.

## Accessible status

Color is supplemental. Text, shape, icon, or accessible naming must preserve meaning. Animated loading indicators respect reduced motion and avoid announcing continuously.
