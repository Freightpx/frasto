# Frasto UI

> An Astro-first design system for SaaS dashboards, admin panels, CRM, CMS, ERP-style interfaces, and internal tools.

Built by Freightpx around one principle: **Clarity first. Craft throughout.**

## Status

The project is in documentation-first foundation work. APIs are not stable and the package is not ready for production use yet.

## Why this exists

Astro already makes it easy to build fast websites. Application UI is different: dashboards repeatedly need the same shell, resource lists, filters, detail views, settings layouts, data states, and accessible interactions. Frasto UI aims to make those patterns reusable without requiring React, Vue, or Svelte as the foundation.

## Product direction

- Astro-first and server-first
- Minimal client JavaScript
- Backend agnostic
- Accessible by default
- Designed for repeated daily use
- SaaS patterns are first-class, not an afterthought
- Themeable through semantic design tokens
- Freightpx-inspired editorial clarity rather than generic blue dashboard styling

## Workspace

```text
apps/
  docs/          Starlight documentation
packages/
  ui/            Astro UI package (foundation only for now)
```

## Local development

```bash
pnpm install
pnpm docs:dev
```

## Documentation source of truth

Start with:

- [`DESIGN.md`](./DESIGN.md)
- [`ARCHITECTURE.md`](./ARCHITECTURE.md)
- [`ROADMAP.md`](./ROADMAP.md)
- [`CONTRIBUTING.md`](./CONTRIBUTING.md)

## License

MIT.
