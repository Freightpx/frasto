# Component Standards

Every Frasto component should solve a broadly reusable interface need and remain Astro-first, server-first, TypeScript-safe, backend-agnostic, and useful without client-side JavaScript unless interaction requires it.

## Before implementation

Define:

1. purpose and repeated use case
2. anatomy and composition boundary
3. semantic API and native attributes
4. default, hover, active, focus-visible, selected, disabled, loading, and invalid states where applicable
5. keyboard and focus behavior
6. accessible names, relationships, and announcements
7. wide, narrow, zoomed, and long-content behavior
8. theme and token requirements
9. runtime and dependency impact
10. evidence that an existing component or native element is insufficient

## Implementation expectations

- Preserve semantic HTML and normal form or link behavior.
- Prefer slots and native attributes over configuration-heavy APIs.
- Keep client enhancements local and progressively enhanced.
- Do not fetch data, own persistence, or require a backend library.
- Use existing semantic tokens and square geometry.
- Use Lucide at a `1.25px` stroke for built-in icons.
- Preserve consumer classes and supported native attributes.

## Documentation expectations

An implemented component page should include its maturity, purpose, preview, import, usage, API, slots or events, accessibility, responsive behavior, states, and practical guidance. Do not publish planned code examples as if they are available.

## Maturity

| Status | Meaning |
| --- | --- |
| Planned | accepted problem or specification; no implementation |
| Designing | API and behavior under active review |
| Experimental | implementation available; breaking change expected |
| Beta | documented and testable; public feedback requested |
| Stable | reviewed, accessible, responsive, tested, and versioned |
