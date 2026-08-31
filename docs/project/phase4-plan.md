# Phase 4 Execution Plan

Phase 4 expands Frasto's general-purpose component coverage while raising the quality floor of the components already shipped as Experimental. Website feature development remains paused; public-site changes are limited to accurate documentation and realistic component examples.

## Gate 0 — Repository checkpoint

- [x] Reposition Frasto as an Astro-first open-source UI component library and design system.
- [x] Separate consumer documentation from project, development, specification, and archive material.
- [x] Add the open-source contribution, support, security, issue, pull-request, CI, and dependency-maintenance foundation.
- [x] Preserve and validate PageHeader, Table, EmptyState, and SearchInput work.
- [x] Run repository diagnostics, production build, link audit, diff validation, and responsive documentation inspection.

## Gate 1 — Inventory and quality contract

- [x] Audit all 27 public component families.
- [x] Record rendering model, interaction risk, and missing evidence.
- [x] Define static, behavioral, accessibility, responsive, and package-consumer test layers.
- [x] Define the Experimental-to-Beta advancement gate.
- [x] Order the next implementation work without adding component APIs.

## Gate 2 — Test harness and existing-component hardening

**Status: Complete**

Implement the smallest maintainable harness that covers the test layers in the [testing strategy](../development/testing.md). Prove the harness with current components before expanding the inventory.

Order:

1. SearchInput keyboard, focus retention, value synchronization, and no-script behavior.
2. Table semantics, captions, density, long cells, and narrow overflow.
3. PageHeader heading hierarchy, slot order, long content, and narrow stacking.
4. EmptyState hierarchy, action composition, alignment, and long content.
5. One high-risk overlay path to prove focus, dismissal, and accessibility coverage.
6. Packed-package Astro consumer fixture and export-contract validation.

Gate 2 is complete when these paths run repeatably in CI and their known findings are resolved or explicitly documented.

## Gate 3 — Locked expansion slice

**Status: Complete at Experimental maturity**

Implement as separate vertical slices:

1. [x] Pagination
2. [x] Stat

Each slice includes API confirmation, Astro implementation, public exports and types, rendered and browser tests as applicable, public component documentation, a realistic example, light/dark verification, narrow-layout verification, and successful package-consumer validation.

## Gate 4 — Category-gap slice

**Status: Complete at Experimental maturity**

Use the reviewed Bejamas snapshot only as an MIT-licensed implementation reference. Preserve Frasto's flat package exports, event namespace, progressive-enhancement policy, and structural styling.

1. [x] Accordion and Collapsible
2. [x] Alert
3. [x] ButtonGroup

Each family has its own reviewed contract and full vertical-slice evidence. Gate 4 establishes the alpha-ready component boundary; the remaining 17 Bejamas-assisted families are committed to Phase 7 so they do not block public alpha.

## Work deliberately deferred

- marketing homepage expansion
- Frasto Icons, Blocks, Pages, or SaaS implementation
- Theme builder, AI skills integration, and donation infrastructure
- future application systems such as AppShell, ResourceTable, and FilterBar
- promotion of any component to Beta based only on successful compilation or manual inspection
- the Phase 7 families recorded in the roadmap

## Next executable task

Begin Phase 5 maturity and hardening on the alpha component set. Prioritize remaining high-risk keyboard/focus evidence, API consistency, cross-browser coverage, and manual assistive-technology review. Do not begin the remaining 17 Phase 7 families before public alpha unless the roadmap is explicitly revised.
