# Product Direction — Frasto UI

## Product identity

**Frasto UI** is an Astro-first open-source UI component library and design system by Freightpx for building modern websites and applications.

```text
Product: Frasto UI
Short name: Frasto
Organization: Freightpx
Repository: github.com/Freightpx/frasto
Package: @freightpx/frasto
Website: https://frasto.freightpx.com
Documentation: https://frasto.freightpx.com/docs
License: MIT
```

> **Clarity first. Craft throughout.**

## Positioning

Frasto gives Astro developers a broad, coherent component ecosystem without requiring React, Vue, or Svelte as the foundation of an interface. It combines reusable components with a real design system so the result is more than a collection of unrelated snippets.

Frasto is suitable for general Astro interfaces and especially useful for dashboards, SaaS products, admin tools, CMS, CRM, ERP-style applications, internal tools, portals, documentation, and content-driven products. These are use cases, not framework requirements.

## Strategic goal

Build a mature, broad, polished, accessible, and battle-tested Astro UI component library that developers genuinely choose on its own merit.

The open-source phase prioritizes:

- component reliability and API quality
- accessibility and responsive behavior
- documentation quality
- straightforward installation and theming
- real-world usage and external feedback
- issues, contributions, and community examples
- long-term trust, npm adoption, and GitHub awareness

Monetization is not the primary optimization target for the current phase. The open-source core must remain useful independently of every future ecosystem product.

## Primary users

- Astro developers building websites or applications
- agencies and product teams standardizing interface work
- full-stack developers who prefer server-rendered foundations
- maintainers of dashboards, admin tools, portals, and content-driven products
- open-source contributors improving Astro's component ecosystem

## Core requirements

- Astro-first and server-rendered by default
- minimal, local client JavaScript
- semantic HTML and accessible behavior
- backend agnostic data and state boundaries
- themeable semantic tokens and light/dark modes
- TypeScript-safe, composable public APIs
- broad component coverage guided by usefulness
- reliable narrow, long-content, loading, empty, error, and disabled states
- production-quality documentation and examples
- a small, justified dependency surface

## Component-library direction

Frasto should become complete enough to build most modern Astro interfaces without repeatedly reaching for another UI library. Quality and maintainability take priority over matching another library one-for-one.

The long-term inventory spans:

- actions such as Button, IconButton, and ButtonGroup
- forms ranging from native fields through Combobox, date controls, Tag Input, File Upload, and Slider
- display and feedback such as AvatarGroup, Alert, Progress, Kbd, Code, Toast, and EmptyState
- navigation and disclosure such as Breadcrumb, Pagination, Navigation Menu, Stepper, Accordion, and Collapsible
- overlays such as Dialog, Drawer, Dropdown, Popover, Context Menu, and Hover Card
- semantic data presentation through Table and focused data-display utilities
- restrained layout primitives such as Surface, Stack, Inline, Section, and Divider

Components advance because they solve repeated interface needs with a maintainable semantic contract, not because another ecosystem includes them.

## Architecture promise

Static components remain useful without client JavaScript. Interactive components progressively enhance native HTML with focused TypeScript or Web Components. Consumers bring their own data, persistence, authentication, billing, and application state.

React, Vue, and Svelte may consume or accompany Frasto, but none is required by the core package.

## Design promise

Frasto retains Freightpx's visual direction:

```text
Warm neutral canvas
+ near-black typography
+ strong editorial hierarchy
+ thin structural lines
+ indexed sections
+ restrained surfaces
+ compact application density
+ purposeful interaction
```

The design system defines typography, color, spacing, geometry, states, accessibility, motion, responsive behavior, content conventions, and composition rules. Components implement those principles consistently.

## Open-source maturity model

```text
Useful open-source component library
        ↓
Real users and projects
        ↓
Feedback, issues, and contributions
        ↓
Battle testing and API refinement
        ↓
Community awareness and adoption
        ↓
Proven opportunities for ecosystem products
```

Signals include real projects, npm downloads, GitHub stars and forks, contributors, issue quality, accessibility findings, browser problems, API friction, repeated feature requests, and community examples. Product quality remains the primary growth mechanism.

## Ecosystem layers

1. **Frasto UI** — open-source component library and design system.
2. **Frasto Icons** — a future geometric, restrained icon family created after the component visual language stabilizes. Lucide remains the current foundation.
3. **Frasto Blocks** — reusable compositions derived from proven usage patterns.
4. **Frasto Pages** — complete screens composed from Frasto UI and Blocks.
5. **Frasto SaaS** — later starters and higher-level product foundations, separate from the backend-agnostic UI core.

The commercial model for later layers is intentionally undecided.

## Public alpha criteria

Frasto can enter public alpha when:

- installation and styles work reliably
- the foundation and a meaningful component set are coherent
- APIs are intentional enough for external experimentation
- accessibility fundamentals and responsive behavior are tested
- documentation supports real use without repository archaeology
- users are clearly invited to report issues, request features, and test real projects

The alpha does not require every planned component.

## Non-goals

- a database ORM, authentication framework, billing system, or backend framework
- a React, Vue, or Svelte runtime requirement
- an intentionally restricted open-source core
- a generic Tailwind snippet collection
- literal inventory parity with another component library
- implementing Frasto Icons, Blocks, Pages, or SaaS before the UI foundation is mature

## Current release boundary

V1 begins with one package, `@freightpx/frasto`. Existing primitives, interactions, bridge components, and application-ready components are retained. Higher-level application systems remain useful future planning, but they do not block maturation of the component library.
