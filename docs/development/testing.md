# Testing

Testing depth follows component risk. Static layout primitives need rendered-output and responsive evidence. Interactive components additionally need keyboard, focus, dismissal, announcement, and state-transition coverage.

## Current baseline

The repository currently enforces:

```bash
pnpm check
pnpm build
git diff --check
```

These commands verify TypeScript and Astro diagnostics, generated package styles, public documentation compilation, and the production site build. They do not prove browser behavior, accessibility, visual stability, or package installation in an external consumer.

## Required test layers

### 1. Static contract

- TypeScript and Astro diagnostics
- package exports and public type exports
- production stylesheet generation
- no unnecessary client runtime for static components
- representative server-rendered markup

### 2. Component behavior

- native form and link behavior
- default and relevant interactive states
- keyboard operation and focus-visible behavior
- focus entry, containment, return, and dismissal for overlays
- accessible names, roles, relationships, and announcements
- progressive enhancement with useful pre-enhancement HTML

### 3. Visual and responsive behavior

- light and dark themes
- desktop, narrow, and zoomed layouts
- long, empty, partial, loading, invalid, and error content where applicable
- reduced motion for behavior-sensitive components
- no unexpected page-level horizontal overflow

### 4. Consumer package contract

- install from the packed package artifact into a minimal Astro fixture
- import package styles without Tailwind configuration in the consumer
- import every documented public component and public type
- build the fixture with the supported Astro and Node ranges
- verify that package contents match the declared `files` and `exports`

## Planned file ownership

Add tests with the implementation they protect; do not create empty directories merely to reserve structure.

| Test area | Intended location | Responsibility |
| --- | --- | --- |
| rendered component contracts | `packages/ui/tests/render/` | semantic output, attributes, slots, exported contracts |
| browser behavior and accessibility | `apps/web/tests/components/` | keyboard, focus, dismissal, state, accessible relationships |
| responsive and theme regression | `apps/web/tests/visual/` | wide, narrow, light, dark, zoom, reduced motion |
| packed-package consumption | `fixtures/consumer-astro/` | installation, exports, stylesheet, external build |

The test runner and accessibility tooling must be selected and pinned when the Gate 2 harness is implemented. Tooling is not added during inventory planning.

## Risk-based minimums

| Risk | Examples | Minimum automated evidence before Beta |
| --- | --- | --- |
| Low | Separator, Surface, Badge | rendered contract plus theme and responsive regression |
| Medium | Button, native form controls, Table, PageHeader | rendered contract, state coverage, keyboard or native-behavior assertions, responsive regression |
| High | Tabs, SearchInput enhancement, Dropdown, Popover, Dialog, Drawer, Tooltip | rendered contract, full keyboard and focus paths, dismissal, accessibility scan, responsive regression |

## Beta advancement gate

A component may move from Experimental to Beta only when:

1. its public API and composition boundary have been reviewed;
2. public documentation matches the exported implementation;
3. applicable static, behavioral, accessibility, theme, and responsive tests pass;
4. known limitations are documented and no unresolved critical accessibility issue remains;
5. the packed-package consumer fixture imports and builds it successfully; and
6. the component has at least one realistic usage example.

Manual verification remains required for behavior that automation cannot judge well, but manual-only evidence is not sufficient for Beta.
