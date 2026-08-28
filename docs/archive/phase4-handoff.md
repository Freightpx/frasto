# Frasto Phase 4 Handoff — Historical Archive

> **Superseded:** This handoff records the former SaaS-first Phase 4 plan and is retained for its component specifications and implementation history. It is not the current execution plan. Use the current [product direction](../project/product-direction.md) and [development roadmap](../project/roadmap.md); do not continue the “First task for the new chat” instructions below without revalidating them.

**Prepared:** 2026-08-28  
**Repository:** `D:\PixelFreight\frasto`  
**Package:** `@freightpx/frasto`  
**Current branch:** `main`  
**Current HEAD:** `ebf405a feat: establish Frasto UI system and documentation`

This document is the working handoff for a new chat. It records the current repository state, decisions about missing components, and the agreed development workflow for Phase 4.

## 1. Read first

Before changing code, read:

1. `AGENTS.md`
2. the Frasto PRD supplied by the user, if it is available in the new chat
3. `ROADMAP.md`
4. `ARCHITECTURE.md`
5. this handoff

Treat `AGENTS.md` as authoritative for the current visual direction. Some older PRD text mentions small radii, but the current locked direction is square geometry with a global component radius of `0px`.

## 2. Product constraints that are already locked

- Frasto is an Astro-first, server-first SaaS design system.
- Consumers must not be required to configure Tailwind CSS.
- Components should remain backend-agnostic and work without client JavaScript unless behavior genuinely requires it.
- Use Inter for UI text and Inter Tight for display headings.
- Use a warm off-white canvas, near-black text, thin structural lines, flat surfaces, and compact SaaS density.
- All product UI uses square geometry. Do not round buttons, fields, checkboxes, badges, menus, dialogs, tabs, slider parts, or surfaces.
- Default control height is `36px`.
- Tabs use a quiet shared baseline and a short active bottom rule. They do not use enclosing boxes or individual tab borders.
- Built-in icons use Lucide at `1.25px` stroke width and `currentColor`.
- Approved logo files are in `/logo`. Do not redraw the logo.
- User-created SVG avatar artwork is in `/avatars`.
- Default components should be shadow-free. Elevation is reserved for genuinely overlapping surfaces.

## 3. Current project state

The repository roadmap currently records:

- Phase 0: complete except CI hardening
- Phase 1: complete
- Phase 2 primitives: complete as Experimental exports
- Phase 3 interactions: complete as Experimental exports
- Phase 4 SaaS components: not started

Current package exports include:

- Avatar
- Badge
- Button
- Checkbox
- Dialog
- Drawer
- Dropdown and DropdownItem
- Icon and IconButton
- Input
- Popover
- Radio
- Select
- Separator
- Skeleton
- Spinner
- Surface
- Switch
- Tabs, Tab, and TabPanel
- Textarea
- Tooltip

The website, documentation, and demo are served by the same Astro application:

- `/`
- `/docs`
- `/demo`

The development server was last running at `http://localhost:4322`.

## 4. Important uncommitted work

Do not discard or overwrite the existing working tree. At handoff time, these files are modified:

- `apps/web/src/content/docs/docs/components/avatar.mdx`
- `apps/web/src/content/docs/docs/foundations/color.mdx`
- `apps/web/src/content/docs/docs/index.mdx`
- `apps/web/src/pages/demo/index.astro`
- `apps/web/src/styles/custom.css`
- `apps/web/src/styles/site.css`
- `packages/ui/src/components/tabs-styles.ts`

The `/avatars` directory is untracked and contains seven SVG assets that must be included in the next commit.

The uncommitted batch contains:

- fixed Starlight prose margins that misaligned later component examples
- normalized 36px tab height and removed unintended tab-list vertical overflow
- restyled the documentation landing page using Frasto components
- added visible color swatches to the color-token documentation
- corrected mobile documentation search/menu icon alignment
- replaced the rounded mobile table-of-contents control with square Frasto styling
- moved mobile document scrolling below the fixed header
- added square, theme-aware scrollbar styling
- integrated all seven Frasto SVG avatars into Avatar documentation
- integrated three Frasto avatars into the SaaS demo

The full workspace validation passed after these changes:

```text
pnpm check
0 errors, 0 warnings, 0 hints

pnpm build
114 pages built successfully
```

Before beginning new component work, inspect `git diff`, rerun the checks if necessary, and create a clean checkpoint commit when the user authorizes or requests the commit.

## 5. Decision: do not complete every generic component first

Frasto should not pause SaaS development to build an exhaustive generic component catalog. That would increase scope and weaken the product's application-oriented differentiation.

Instead, prepare a small **Phase 3.5 — SaaS bridge components** set, then begin Phase 4. Additional primitives should be added only when a planned SaaS component has a clear dependency on them.

## 6. Required bridge components

These components are required before or at the start of Phase 4.

### 6.1 Breadcrumb

Why it is required:

- `PageHeader` explicitly supports breadcrumb context.
- Resource details and settings routes need semantic location context.
- It should be a server-rendered navigation landmark with ordinary links.

Expected baseline:

- `Breadcrumb`
- authored link/item content rather than router coupling
- configurable accessible label
- current item semantics
- overflow behavior for long and narrow paths
- optional consumer-supplied separator icon

### 6.2 FormField family

Why it is required:

- `SettingsLayout`, dialogs, filters, and forms need consistent label, description, error, and control association.
- The current demo repeats hand-authored field markup.
- Invalid styling alone is insufficient without accessible error relationships.

Treat this as one tightly coupled vertical slice. Define the smallest useful API before implementation. Likely exports:

- `FormField`
- `FormLabel`
- `FormDescription`
- `FormError`

The design must preserve native `for`, `id`, `aria-describedby`, and `aria-invalid` behavior. Do not introduce form state management, validation libraries, or backend assumptions.

### 6.3 Status

Why it is required:

- `ResourceTable`, detail headers, settings, and activity events repeatedly display domain status.
- Status meaning should be readable as text and not depend only on color.
- `Badge` remains available for labels; `Status` should communicate state with restrained semantic treatment.

Expected baseline:

- neutral, positive, warning, danger, and information tones
- visible label
- optional restrained marker
- no pill geometry
- no decorative semantic color usage

### 6.4 Table specification

`Table` is listed in `ROADMAP.md` but currently has no dedicated application-component page or navigation item. Fix the specification gap before implementation.

Lock the boundary:

- `Table` is semantic and presentational.
- `ResourceTable` is the typed application-data abstraction.
- `Table` must not fetch, sort, paginate, or own row data.
- Prefer native table elements and structural row dividers.

## 7. Deferred or intentionally omitted components

Do not implement these before Phase 4 unless a real milestone dependency proves otherwise.

| Component | Decision |
| --- | --- |
| Card | Do not add now. `Surface` covers the structural need, and Frasto avoids card-heavy interfaces. |
| Accordion | Defer. Start with native `details`/`summary` where appropriate and add an abstraction only when repeated behavior requires it. |
| Toast | Defer to mutation feedback in the reference SaaS. It needs deliberate live-region, queue, dismissal, timeout, and client-runtime design. |
| ButtonGroup | Defer until grouped action semantics repeat across real screens. Ordinary flex composition is sufficient now. |
| AvatarGroup | Defer to the Team area in the reference SaaS. |
| Progress | Defer until dashboard or background-operation requirements are concrete. |
| Section, Stack, Inline | Do not introduce layout abstraction prematurely. Prefer semantic HTML and application CSS until repetition justifies components. |
| Navbar | Reassess while building `AppShell`; do not duplicate `Sidebar` or ordinary site navigation. |
| Slider | Defer until a real numeric or range-setting workflow exists. |
| Combobox, DatePicker, DateRangePicker, TagInput | Later form expansion; not a Phase 4 prerequisite. |
| CommandPalette, ContextMenu | Later interaction expansion; not a Phase 4 prerequisite. |

Add deferred items to planning documentation if needed, but do not present them as implemented package exports.

## 8. Development workflow

Plan each milestone as a group, but complete components as vertical slices. Do not implement all code first and postpone documentation until the end.

For every component or tightly coupled family:

1. Confirm purpose, ownership boundary, anatomy, and dependencies.
2. Mark documentation status as `Designing` while the API is under review.
3. Define the public Astro and TypeScript API.
4. Implement the component and shared styles.
5. Export the component and public types from `packages/ui/src/index.ts`.
6. Add real documentation previews and usage examples.
7. Document props, slots, states, accessibility, and responsive behavior.
8. Replace relevant custom demo markup with the new component.
9. Test light/dark themes, desktop/tablet/mobile, keyboard operation, focus-visible, disabled/loading/invalid states where applicable, and long content.
10. Run `pnpm check` and `pnpm build`.
11. Change status to `Experimental` only after implementation, documentation, demo use, and validation agree.
12. Mark the roadmap item complete only when the full slice is done.

Prefer one reviewable commit per component or tightly coupled family, with implementation and documentation in the same commit.

## 9. Phase 3.5 plan

### Milestone 3.5A — Readiness documentation

- Add Phase 3.5 to `ROADMAP.md`.
- Add missing component specifications and navigation entries for Breadcrumb, FormField, and Status.
- Add the missing Table specification and navigation entry.
- Update component inventory/status pages so nothing is described as available before it is exported.
- Confirm APIs and composition boundaries before implementation.

### Milestone 3.5B — Bridge implementation

Implement as complete vertical slices in this order:

1. Breadcrumb
2. Status
3. FormField family

After each slice, update its documentation and demo usage, verify it, and mark it Experimental. Mark Phase 3.5 complete only when all three slices are complete.

## 10. Phase 4 plan

There are thirteen planned SaaS components. Use the current repository phase numbering: the original PRD called this layer Phase 5, but `ROADMAP.md` now calls it **Phase 4 — SaaS components**.

### Milestone 4A — Application essentials

Components:

1. PageHeader
2. Stat
3. SearchInput
4. EmptyState
5. Pagination
6. Table

Goals:

- establish server-first application page vocabulary
- replace corresponding custom demo markup
- validate hierarchy, actions, empty/loading presentation, and narrow behavior
- keep Table purely semantic and presentational

Dependencies:

- PageHeader uses Breadcrumb composition.
- SearchInput composes Input and IconButton and may use a small enhancement only if clear behavior requires it.
- Pagination should support ordinary URLs and native navigation first.

### Milestone 4B — Application shell

Components:

1. Sidebar
2. AppShell

Goals:

- replace the demo-specific application frame
- provide skip-link, navigation, content, utility, identity, and account regions
- keep routing and authentication in the consuming application
- support persistent desktop navigation and an accessible mobile drawer
- return focus correctly after mobile navigation closes

Reuse existing Drawer behavior where composition is sufficient. Do not create a second unrelated overlay system.

### Milestone 4C — Resource workflows

Components:

1. ResourceTable
2. FilterBar

Goals:

- turn the Customers demo into the first realistic application-data reference
- support typed rows and columns
- cover loading, empty, partial, error, long-content, selection, sorting UI, row actions, and narrow layouts
- make selection scope explicit
- keep query execution, URL synchronization, and persistence in the application

Dependencies:

- ResourceTable composes Table, Checkbox, Status/Badge, Dropdown, Skeleton, and EmptyState.
- FilterBar composes SearchInput, Select, Button/IconButton, active criteria, and optional Drawer behavior on narrow layouts.

### Milestone 4D — Product layouts

Components:

1. ActivityFeed
2. DetailLayout
3. SettingsLayout

Goals:

- add customer-detail and settings structures to the demo
- test real metadata, related records, activity, and form density
- preserve logical reading order when secondary columns stack
- keep resource fetching, mutation, permissions, validation, routing, and persistence application-owned

Dependencies:

- ActivityFeed uses Avatar, Status, and semantic `time` elements.
- DetailLayout composes PageHeader, Status, ActivityFeed, and ordinary semantic sections.
- SettingsLayout uses Sidebar/navigation composition and the FormField family.

## 11. Phase 4 completion criteria

Phase 4 is complete only when:

- all thirteen SaaS components are exported
- every component has real documentation rather than a planned placeholder
- every component is used in at least one realistic example or demo screen
- application components do not fetch data or assume a backend
- static components ship no unnecessary client JavaScript
- interactive components use native behavior or small progressive enhancement
- light and dark themes are verified
- desktop, tablet, and mobile behavior is verified
- keyboard and focus behavior is verified
- data components cover loading, empty, partial, error, long-content, and narrow states
- package checks and the production build pass
- `ROADMAP.md` and the documentation roadmap are updated
- Phase 4 is explicitly marked complete

## 12. Phase 5 direction after Phase 4

Build the reference SaaS with mock TypeScript data:

- Dashboard
- Customer list
- Customer detail
- Team
- Billing
- Settings

Use this phase to decide whether deferred components such as Toast, Accordion, AvatarGroup, or Progress have demonstrated real, repeated requirements.

## 13. First task for the new chat

The recommended first prompt/action sequence is:

1. Inspect the current diff and preserve it.
2. Confirm the existing check/build still pass.
3. Create a checkpoint commit when authorized.
4. Update the roadmap with Phase 3.5 and Phase 4A–4D milestones.
5. Prepare the Breadcrumb, FormField, Status, and Table specifications.
6. Implement Breadcrumb as the first complete vertical slice.

Do not start by generating all Phase 4 components in one undifferentiated batch.
