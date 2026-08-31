# Component Quality Inventory

**Baseline:** 2026-08-28

**Scope:** all public component families exported by `@freightpx/frasto`

**Current maturity:** Experimental

This inventory records evidence, not aspiration. All 33 families below are exported, have public documentation, and pass the current TypeScript, Astro, stylesheet, and production-build checks. Rendered-contract, Playwright behavior/accessibility, responsive/theme, and packed-consumer suites now enforce the Phase 4 quality boundary. Coverage is risk-ordered rather than complete across all 33 families, so no family advances to Beta from these checks alone.

## Evidence key

- **Static** — useful server-rendered Astro output with no component-owned client behavior.
- **Enhanced** — useful server-rendered output plus a focused browser enhancement.
- **Native** — behavior primarily follows native HTML controls or links.
- **Low / Medium / High** — automation priority based on semantic and interaction risk, not implementation quality.

## Public inventory

| Category | Component family | Rendering model | Risk | Primary evidence still required |
| --- | --- | --- | --- | --- |
| Actions | Button | Native | Medium | automated loading-name, disabled, responsive, keyboard, theme, and packed-consumer evidence; manual AT and real-project evidence remain |
| Actions | IconButton | Native | Medium | automated accessible-name, loading, disabled, responsive, and packed-consumer evidence; manual AT and real-project evidence remain |
| Actions | ButtonGroup family | Native | Medium | labelled group semantics, focus order, orientation, theme and narrow layout |
| Forms | Input | Native | Medium | automated native value, invalid, disabled, read-only, accessibility, and reflow evidence; slot/manual AT review remains |
| Forms | Textarea | Native | Medium | automated native value, invalid, disabled, accessibility, and reflow evidence; resize/manual AT review remains |
| Forms | Select | Native | Medium | automated native selection, accessibility, and reflow evidence; platform appearance/manual AT review remains |
| Forms | Checkbox | Native | Medium | automated label, checked, disabled, keyboard, accessibility, and reflow evidence; manual AT remains |
| Forms | Radio | Native | Medium | automated group selection, keyboard, accessibility, and reflow evidence; disabled-group/manual AT review remains |
| Forms | Switch | Enhanced | High | automated native keyboard, change-state, axe, narrow/dark, and reduced-motion evidence; form persistence and manual AT remain |
| Forms | FormField family | Static | Medium | automated explicit label, description, error, invalid, accessibility, and reflow relationships; grouped-control/manual AT review remains |
| Forms | SearchInput | Enhanced | High | clear-button keyboard path, focus retention, value synchronization, no-script fallback |
| Display | Badge | Static | Low | automated semantic text, long-content reflow, theme, accessibility, and packed-consumer evidence; visual regression remains |
| Display | Avatar | Static | Low | automated image/fallback semantics, accessibility, reflow, and packed-consumer evidence; image-failure review remains |
| Display | Status | Static | Low | automated visible meaning, marker semantics, accessibility, theme, and reflow evidence; visual regression remains |
| Display | Skeleton | Static | Low | automated hidden-state, reduced-motion, accessibility, and reflow evidence; visual regression remains |
| Display | Spinner | Static | Low | automated decorative/labelled policy, reduced-motion, accessibility, and reflow evidence; manual announcement review remains |
| Display | Stat | Static | Low | description-list semantics, long values, tones, theme and narrow layout |
| Feedback | Alert | Static | Low | tone meaning beyond color, role policy, long content, theme and narrow layout |
| Feedback | EmptyState | Static | Medium | heading hierarchy, action composition, alignment, narrow and long content |
| Disclosure | Accordion family | Enhanced | High | single/multiple policy, disabled items, arrow focus, relationships, events, no-script output |
| Disclosure | Collapsible family | Enhanced | High | default/disabled state, relationships, keyboard activation, events, no-script output |
| Navigation | Breadcrumb family | Native | Medium | automated landmark, links, current-page, accessibility, and narrow reflow evidence; deep-path/manual AT review remains |
| Navigation | Pagination family | Native | Medium | landmark/current/disabled semantics, authored URLs, narrow position context |
| Navigation | Tabs family | Enhanced | High | automated arrows, disabled skipping, focus/selection, relationships, event, axe, and narrow evidence; nested/no-script manual review remains |
| Overlays | Tooltip | Enhanced | High | cross-browser hover/focus parity, delayed-open cancellation, Escape, axe, and narrow evidence; touch/manual AT remain |
| Overlays | Dropdown family | Enhanced | High | cross-browser trigger arrows, menu navigation, disabled skipping, Escape/focus return, axe, and narrow evidence; nested/manual AT review remains |
| Overlays | Popover | Enhanced | High | cross-browser tab order, Escape/outside dismissal, focus policy, axe, and narrow evidence; collision/nested/manual AT review remain |
| Overlays | Dialog | Enhanced | High | modal semantics, focus containment and return, Escape, scroll locking |
| Overlays | Drawer | Enhanced | High | cross-browser modal focus, Escape, explicit completion, focus return, axe, and narrow evidence; side/size, scroll, nested, and manual AT review remain |
| Data | Table | Static | Medium | native structure, caption, density, numeric alignment, overflow and long cells |
| Layout | Surface | Static | Low | automated polymorphism, structure, accessibility, theme, reflow, and packed-consumer evidence; nesting visual review remains |
| Layout | Separator | Static | Low | automated decorative/semantic orientation, accessibility, theme, and reflow evidence; visual regression remains |
| Layout | PageHeader | Static | Medium | heading levels, slot order, actions, long title, narrow stacking behavior |

## Repository-wide findings

| Area | Current evidence | Gate 2 requirement |
| --- | --- | --- |
| exports and public types | compile from the package index and representative types build in the packed fixture | expand the fixture when each family is added |
| consumer documentation | every implemented family has a public page; documented examples build | keep examples synchronized with package exports |
| accessibility | contracts and guidance are documented | add automated checks plus manual keyboard and assistive-technology scenarios |
| responsive behavior | examples and prior manual inspection exist | add repeatable narrow, zoom, and overflow regression coverage |
| themes | light and dark tokens compile and render | add repeatable light/dark regression coverage |
| package consumption | a packed-artifact Astro fixture builds representative static and interactive families | retain it as a required gate |
| behavior tests | Vitest Astro Container and Playwright suites cover the Phase 4 quality boundary | extend risk-ordered coverage across the remaining inventory |

## Known priority findings

1. SearchInput now has keyboard, focus-retention, value-synchronization, accessibility, theme, and narrow evidence; manual assistive-technology review remains before Beta consideration.
2. Dialog, Drawer, Dropdown, Popover, Tooltip, Tabs, and Switch now have Chromium, Firefox, and WebKit focus and keyboard baselines. Collision, nested composition, touch, scroll, and manual assistive-technology evidence remain before Beta.
3. Static families now have rendered semantics, representative axe scans, dark/reduced-motion coverage, and 320 CSS-pixel reflow evidence. Badge long-label overflow was fixed during this gate.
4. The packed-package fixture renders every public family and compiles representative public types; it must expand with every new family and public type.

This inventory is updated when evidence changes, not merely when implementation code changes.
