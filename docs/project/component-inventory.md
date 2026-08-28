# Component Quality Inventory

**Baseline:** 2026-08-28

**Scope:** all public component families exported by `@freightpx/frasto`

**Current maturity:** Experimental

This inventory records evidence, not aspiration. All 27 families below are exported, have public documentation, and pass the current TypeScript, Astro, stylesheet, and production-build checks. The repository does not yet have automated rendered-contract, browser-behavior, accessibility, visual-regression, or packed-consumer test suites, so no family is ready for Beta.

## Evidence key

- **Static** — useful server-rendered Astro output with no component-owned client behavior.
- **Enhanced** — useful server-rendered output plus a focused browser enhancement.
- **Native** — behavior primarily follows native HTML controls or links.
- **Low / Medium / High** — automation priority based on semantic and interaction risk, not implementation quality.

## Public inventory

| Category | Component family | Rendering model | Risk | Primary evidence still required |
| --- | --- | --- | --- | --- |
| Actions | Button | Native | Medium | link/button contracts, loading and disabled states, keyboard and theme regression |
| Actions | IconButton | Native | Medium | accessible-name enforcement, icon sizing, loading and disabled states |
| Forms | Input | Native | Medium | form association, invalid state, slots, long value, narrow layout |
| Forms | Textarea | Native | Medium | resize modes, form association, invalid and long-content behavior |
| Forms | Select | Native | Medium | selected, disabled, invalid, keyboard, and native appearance coverage |
| Forms | Checkbox | Native | Medium | label association, checked, indeterminate, invalid, and keyboard coverage |
| Forms | Radio | Native | Medium | group semantics, checked, disabled, invalid, and keyboard coverage |
| Forms | Switch | Enhanced | High | keyboard toggling, state synchronization, form behavior, accessible state |
| Forms | FormField family | Static | Medium | generated relationships among label, description, error, and control IDs |
| Forms | SearchInput | Enhanced | High | clear-button keyboard path, focus retention, value synchronization, no-script fallback |
| Display | Badge | Static | Low | semantic tone, long content, theme and zoom regression |
| Display | Avatar | Static | Low | image and fallback semantics, loading failure, size and theme regression |
| Display | Status | Static | Low | text-independent meaning, tone mapping, optional marker semantics |
| Display | Skeleton | Static | Low | hidden/announced usage contract, size and reduced-motion regression |
| Display | Spinner | Static | Low | labeling contract, size, color, and reduced-motion regression |
| Feedback | EmptyState | Static | Medium | heading hierarchy, action composition, alignment, narrow and long content |
| Navigation | Breadcrumb family | Native | Medium | landmark label, current-page semantics, overflow and long paths |
| Navigation | Tabs family | Enhanced | High | arrow-key model, focus, selected state, panel association, no-script output |
| Overlays | Tooltip | Enhanced | High | hover/focus parity, Escape dismissal, described-by relationship, timing |
| Overlays | Dropdown family | Enhanced | High | trigger semantics, menu keyboard model, focus return, outside dismissal |
| Overlays | Popover | Enhanced | High | focus ownership, Escape/outside dismissal, placement and narrow behavior |
| Overlays | Dialog | Enhanced | High | modal semantics, focus containment and return, Escape, scroll locking |
| Overlays | Drawer | Enhanced | High | modal semantics, focus containment and return, side/size, narrow viewport |
| Data | Table | Static | Medium | native structure, caption, density, numeric alignment, overflow and long cells |
| Layout | Surface | Static | Low | element polymorphism, variants, spacing, theme and nesting regression |
| Layout | Separator | Static | Low | decorative versus semantic usage, orientation and theme regression |
| Layout | PageHeader | Static | Medium | heading levels, slot order, actions, long title, narrow stacking behavior |

## Repository-wide findings

| Area | Current evidence | Gate 2 requirement |
| --- | --- | --- |
| exports and public types | compile successfully from the package index | add explicit export-contract coverage |
| consumer documentation | every implemented family has a public page | validate documented examples against package exports |
| accessibility | contracts and guidance are documented | add automated checks plus manual keyboard and assistive-technology scenarios |
| responsive behavior | examples and prior manual inspection exist | add repeatable narrow, zoom, and overflow regression coverage |
| themes | light and dark tokens compile and render | add repeatable light/dark regression coverage |
| package consumption | monorepo applications consume the workspace package | add packed-artifact external consumer fixture |
| behavior tests | no dedicated automated suite | implement the risk-ordered browser harness |

## Known priority findings

1. SearchInput needs a dedicated keyboard, focus-retention, value-synchronization, and no-script pass before Beta consideration.
2. Dialog, Drawer, Dropdown, Popover, Tooltip, Tabs, and Switch carry the highest interaction risk and require automated focus and keyboard evidence.
3. Table, PageHeader, and EmptyState need repeatable long-content and narrow-layout coverage because they are the first broadly reusable Phase 4 structures.
4. Every component currently relies on monorepo consumption; a packed-package fixture is required before public alpha.

This inventory is updated when evidence changes, not merely when implementation code changes.
