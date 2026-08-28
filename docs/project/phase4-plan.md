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

Implement as separate vertical slices:

1. Pagination
2. Stat

Each slice includes API confirmation, Astro implementation, public exports and types, rendered and browser tests as applicable, public component documentation, a realistic example, light/dark verification, narrow-layout verification, and successful package-consumer validation.

## Gate 4 — Category-gap slice

Revalidate scope after Gate 3, then prefer the smallest broadly reusable gaps:

1. Accordion and Collapsible
2. Alert
3. ButtonGroup

Do not begin all three as one batch. Each requires its own reviewed contract and evidence. Later candidates such as Combobox, Date Picker, Toast, Navigation Menu, and layout helpers remain behind a new inventory review because they carry larger API, runtime, or accessibility costs.

## Work deliberately deferred

- marketing homepage expansion
- Frasto Icons, Blocks, Pages, or SaaS implementation
- Theme builder, AI skills integration, and donation infrastructure
- future application systems such as AppShell, ResourceTable, and FilterBar
- promotion of any component to Beta based only on successful compilation or manual inspection

## Next executable task

Begin Gate 2 by selecting the test harness and implementing the SearchInput quality slice. Do not begin Pagination until the harness proves keyboard, focus, responsive, and package-consumer coverage on existing components.
