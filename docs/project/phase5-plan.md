# Phase 5 Maturity and Hardening Plan

Phase 5 raises the quality evidence of the alpha component set without expanding the component inventory. Components remain Experimental until the complete Beta advancement gate is satisfied.

## Gate 0 — High-risk interaction baseline

**Status: Complete**

- [x] Drawer modal focus, Escape, explicit completion, and focus return
- [x] Dropdown trigger arrows, item navigation, disabled skipping, Escape, and focus return
- [x] Popover logical tab order, Escape, outside dismissal, and focus policy
- [x] Tooltip hover/focus parity, delayed-open cancellation, and Escape dismissal
- [x] Tabs relationships, roving focus, disabled skipping, state changes, and events
- [x] Switch native keyboard, state, change event, and accessible semantics
- [x] Representative automated accessibility scans
- [x] Narrow dark and reduced-motion containment

The Gate 0 audit fixed Tooltip state arbitration and added consistent root data hooks to Dropdown, Popover, Tooltip, and Tabs. It did not change public props or events.

## Gate 1 — Native controls and field composition

**Status: Complete**

Harden Button, IconButton, Input, Textarea, Select, Checkbox, Radio, Switch, and the FormField family across form participation, labels, invalid/required states, disabled behavior, long content, zoom, and native keyboard operation.

- [x] Rendered native-element, attribute, state, and relationship contracts
- [x] Browser keyboard, value, checked, selected, disabled, read-only, and invalid evidence
- [x] Representative automated accessibility scans
- [x] Narrow reflow and 200% zoom containment
- [x] Loading Button exposes one progress label while preserving its visual width

## Gate 2 — Static semantics and responsive evidence

**Status: Complete**

Harden Avatar, Badge, Status, Skeleton, Spinner, Alert, EmptyState, Breadcrumb, Pagination, Table, Stat, Surface, Separator, PageHeader, and ButtonGroup across rendered semantics, long/localized content, light/dark, narrow, zoom, and reduced motion where applicable.

- [x] Server-rendered semantic contracts for every static family
- [x] Representative automated accessibility scans
- [x] Light/dark, reduced-motion, long-content, and 320 CSS-pixel reflow evidence
- [x] Badge long-label wrapping fixed for constrained and zoomed layouts

## Gate 3 — Overlay and disclosure completion

**Status: Automated matrix complete; manual review pending**

Extend Dialog, Drawer, Dropdown, Popover, Tooltip, Accordion, Collapsible, and Tabs evidence to Firefox and WebKit. Complete manual screen-reader and keyboard review, focus containment/return checks, collision behavior, scroll behavior, and nested-composition checks.

- [x] Chromium, Firefox, and WebKit projects in the required Playwright matrix
- [x] Automated keyboard, focus, dismissal, state, accessibility, theme, and responsive paths
- [x] WebKit-safe Dialog and Drawer focus restoration
- [x] Floating-overlay viewport boundaries and nested trigger composition
- [x] Dialog and Drawer scroll locking and backdrop dismissal
- [x] Touch-oriented narrow viewport interaction paths
- [ ] Manual screen-reader review
- [ ] Optional physical-phone confirmation when a device is available

## Gate 4 — API, package, and release hardening

**Status: Automated and source audit complete; manual evidence pending**

Audit naming, native attribute pass-through, event detail, data hooks, composition boundaries, generated IDs, package contents, supported Astro/Node ranges, documentation accuracy, and migration risk. Record real-project evidence before promoting any family to Beta.

- [x] Packed-package Astro fixture renders every public family and compiles representative exported types
- [x] Package contents, root exports, style exports, Astro peer range, and Node engine are exercised by repeatable checks
- [x] Complete API/event/data-hook and generated-ID review
- [x] Synchronize prerelease version, package documentation, license, notices, and publish boundary
- [ ] Record manual assistive-technology and real-project evidence
- [ ] Decide Beta advancement family by family

## Phase 5 exit criteria

- every public family has risk-appropriate automated evidence;
- all high-risk families have cross-browser and manual assistive-technology evidence;
- public documentation matches exports and observed behavior;
- packed-package consumption and release checks are repeatable;
- unresolved limitations are explicit; and
- Beta promotion is decided family by family, never for the inventory as a batch.
