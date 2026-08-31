# Development Roadmap

## Phase 0 — Foundation

**Status: Complete**

- [x] Product identity and Freightpx principles
- [x] Public repository, package name, domain, and MIT license
- [x] Monorepo workspace for package, website, documentation, and demo
- [x] Tailwind CSS package build pipeline and automatic stylesheet import
- [x] Self-hosted Inter and Inter Tight fonts
- [x] Lucide icon foundation
- [x] CI runs workspace diagnostics and production builds on pull requests and main

## Phase 1 — Design system and documentation foundation

**Status: Complete**

- [x] Color, typography, spacing, shape, border, and shadow foundations
- [x] Motion, responsive, accessibility, content, and iconography principles
- [x] Astro-first, server-first, backend-agnostic architecture policies
- [x] Component API, TypeScript, dependency, and theming conventions
- [x] Documentation application, navigation, status model, and contribution guidance
- [x] Application patterns, recipes, and higher-level planning retained for later layers
- [x] Documentation taxonomy aligned with broad component-library positioning

## Phase 2 — Core primitives

**Status: Complete at Experimental maturity**

- [x] Button and IconButton
- [x] Input and Textarea
- [x] Checkbox, Radio, Switch, and Select
- [x] Badge and Avatar
- [x] Separator and Surface
- [x] Skeleton and Spinner

## Phase 3 — Interaction and composition primitives

**Status: Complete at Experimental maturity**

- [x] Tooltip, Dropdown, Popover, Dialog, and Drawer
- [x] Tabs
- [x] Breadcrumb
- [x] Status
- [x] FormField family

The former Phase 3.5 bridge milestone is retained here as completed composition work. These components now belong to the broad library rather than a SaaS-specific bridge.

## Phase 4 — Component library expansion

**Current phase**

The ordered execution gates, inventory findings, and advancement rules are maintained in the [Phase 4 execution plan](./phase4-plan.md). The [component quality inventory](./component-inventory.md) records the evidence currently available for every public family.

### Existing application-ready components

- [x] PageHeader — Experimental
- [x] Table — Experimental
- [x] EmptyState — Experimental
- [x] SearchInput — Experimental; keyboard and focus behavior must be revalidated before Beta
- [x] Pagination — Experimental
- [x] Stat — Experimental

### Coverage priorities

- [x] Actions: ButtonGroup — Experimental
- Forms: Combobox, Date Picker, Date Range Picker, Tag Input, File Upload, Slider
- Display: AvatarGroup, Progress, Kbd, Code, Aspect Ratio
- [x] Feedback: Alert — Experimental
- [ ] Feedback: Toast, complete loading and error-state guidance
- Navigation: Navigation Menu, sidebar primitives, Stepper, command interface
- [x] Disclosure: Accordion and Collapsible — Experimental
- Overlays: Context Menu and Hover Card
- Data: Table hardening and focused data-display utilities
- Layout: Stack, Inline, Section, Divider, and other justified layout primitives

Inventory order is guided by repeated usefulness, accessibility complexity, category gaps, and maintainability. Higher-level systems such as ResourceTable, FilterBar, ActivityFeed, DetailLayout, SettingsLayout, AppShell, and complete product workflows remain planned, but no longer block the core library.

## Phase 5 — Component maturity and hardening

**Status: In progress.** Follow the ordered [Phase 5 maturity and hardening plan](./phase5-plan.md).

- [ ] Audit public API consistency and composition boundaries
- [ ] Complete accessibility and keyboard test coverage
- [ ] Add browser and responsive regression coverage
- [ ] Verify light, dark, zoomed, reduced-motion, long-content, and narrow states
- [ ] Complete mature component documentation and examples
- [ ] Harden installation, package output, versioning, and release automation

## Phase 6 — Public alpha

- [ ] Publish `@freightpx/frasto`
- [ ] Publish the documentation site
- [ ] Invite real project testing, issues, and feature requests
- [ ] Publish clear alpha limitations and contribution guidance
- [ ] Establish feedback and compatibility triage

Target: `0.1.0-alpha` when the foundation and a meaningful component set are usable; the full planned inventory is not a prerequisite.

## Phase 7 — Battle testing and ecosystem growth

- [ ] Track real project usage, API friction, accessibility findings, and browser issues
- [ ] Refine APIs through evidence and documented migration paths
- [ ] Wave A — Label, InputGroup, Slider, Toggle, and ToggleGroup
- [ ] Wave B — Card, Item, Kbd, Date, LinkGroup, and StickySurface
- [ ] Wave C — Combobox, HoverCard, NavigationMenu, Command, Carousel, and Marquee
- [ ] Expand further coverage only where repeated user needs justify it
- [ ] Encourage contributors, community examples, and integration guides
- [ ] Monitor npm adoption, GitHub activity, and external projects as product-health signals

Every Phase 7 family is a complete Experimental vertical slice with a written contract, structural Frasto styling, public documentation, rendered and browser evidence as applicable, accessibility review, and packed-package validation. The waves are roadmap commitments but do not delay the Phase 6 public alpha.

## Phase 8 — Frasto Icons

Develop a distinctive geometric, restrained icon language after the component visual system is stable. Optimize for 16px, 20px, and 24px interface use. Lucide remains supported during development and migration planning.

## Phase 9 — Frasto Blocks

Build reusable compositions from patterns proven through real Frasto usage, such as authentication sections, navigation shells, filters, team management, settings, and data-management views.

## Phase 10 — Frasto Pages

Build complete application screens from Frasto UI and Frasto Blocks. Candidate areas include dashboards, customers, analytics, inventory, billing, settings, profiles, authentication, and administration.

## Phase 11 — Frasto SaaS

Explore separate starters and higher-level product foundations for authentication, organizations, teams, roles, permissions, billing, email, notifications, and application setup. Frasto UI remains backend agnostic and independently valuable.
