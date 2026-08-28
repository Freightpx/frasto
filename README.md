# Frasto UI

[![CI](https://github.com/Freightpx/frasto/actions/workflows/docs.yml/badge.svg)](https://github.com/Freightpx/frasto/actions/workflows/docs.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-111111.svg)](./LICENSE)

An Astro-first open-source UI component library and design system for modern websites and applications.

Frasto combines reusable Astro components with warm neutral surfaces, near-black typography, thin structural lines, square geometry, compact controls, accessible states, and purposeful interaction.

> **Pre-alpha:** Frasto is under active development, is not yet published for production use, and may make breaking API changes.

## Why Frasto

- Astro-first and server-rendered by default
- useful without client-side JavaScript unless interaction requires it
- semantic HTML and accessible interaction contracts
- TypeScript-safe, composable component APIs
- backend and data-layer independent
- semantic design tokens with light and dark themes
- no React, Vue, Svelte, or Tailwind requirement for consumers

## Current component coverage

Experimental components currently cover actions, forms, display, feedback, navigation, overlays, data presentation, and layout. See the [public component documentation](https://frasto.freightpx.com/docs/components/overview/) for the available inventory.

Planned APIs and future application-layer research are intentionally kept out of the consumer documentation.

## Repository

```text
apps/
  web/                 Public website, consumer documentation, and demo
packages/
  ui/                  @freightpx/frasto package source
docs/
  project/             Product direction and roadmap
  development/         Architecture, design, testing, and release guidance
  specifications/      Unreleased component and pattern research
  archive/             Superseded historical documents
```

## Local development

Requirements:

- Node.js 22 or later
- pnpm 11

```bash
pnpm install
pnpm dev
```

Useful checks:

```bash
pnpm check
pnpm build
```

## Documentation boundaries

- [Public documentation](https://frasto.freightpx.com/docs) explains how to evaluate and use implemented Frasto components.
- [Development documentation](./docs/README.md) explains how Frasto itself is designed and maintained.
- [Implementation ideas](./IMPLEMENTATION_IDEAS.md) is a lightweight parking lot, not a roadmap commitment.
- [Development roadmap](./docs/project/roadmap.md) contains accepted project milestones.

## Contributing

Contributions to documentation, accessibility, browser behavior, tests, component quality, and broadly reusable component proposals are welcome.

Read [CONTRIBUTING.md](./CONTRIBUTING.md), the [Code of Conduct](./CODE_OF_CONDUCT.md), and the [component standards](./docs/development/component-standards.md) before starting substantial work.

For help and reporting guidance, see [SUPPORT.md](./SUPPORT.md) and [SECURITY.md](./SECURITY.md).

## Project links

- Website: [frasto.freightpx.com](https://frasto.freightpx.com)
- Documentation: [frasto.freightpx.com/docs](https://frasto.freightpx.com/docs)
- Repository: [github.com/Freightpx/frasto](https://github.com/Freightpx/frasto)
- Package name: `@freightpx/frasto`
- Organization: Freightpx

## License

Frasto UI is available under the [MIT License](./LICENSE).
