---
title: Component proposals
description: Define a repeatable use case and complete behavior contract before implementation.
---

New components begin as design proposals, not source files.

## Proposal checklist

1. repeatable interface use case
2. evidence an existing component or native element is insufficient
3. anatomy and composition boundary
4. semantic API vocabulary
5. default, interactive, and data states
6. keyboard and focus behavior
7. announcements and accessible names
8. responsive transformation
9. theme and density needs
10. dependency and runtime impact

## Review questions

- Does this solve a broadly reusable interface need?
- Does it create reusable component language rather than a one-off screen?
- Is there evidence across more than one product type or composition?
- Is the API describing intent?
- Can static parts remain server-rendered?
- Does the component own only UI concerns?
- Can the behavior be documented clearly enough to test?

## Advancement

A proposal moves from Planned to Designing after its scope is accepted. Implementation begins only when unresolved behavior will not force speculative APIs.
