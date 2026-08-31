---
title: Disclosure inventory
description: Planned primitives for progressively revealing related content.
---

**Status: Experimental.**

| Component | Purpose | Required behavior |
| --- | --- | --- |
| [Accordion](/docs/components/accordion/) | coordinated set of disclosure regions — Experimental | single or multiple expansion, disabled items, keyboard operation, useful server output |
| [Collapsible](/docs/components/collapsible/) | one independently controlled disclosure region — Experimental | default-open state, trigger relationship, keyboard operation, useful server output |

Both families must expose expansion through native or WAI-ARIA semantics, keep content useful without client enhancement, and emit namespaced Frasto state events after user changes.
