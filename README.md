# Frasto UI

[![CI](https://github.com/Freightpx/frasto/actions/workflows/docs.yml/badge.svg)](https://github.com/Freightpx/frasto/actions/workflows/docs.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-111111.svg)](./LICENSE)

An Astro-first open-source UI component library and design system for modern websites and applications.

Frasto combines reusable Astro components with warm neutral surfaces, near-black typography, thin structural lines, square geometry, compact controls, accessible states, and purposeful interaction.

> **Public alpha:** `0.1.0-alpha.1` was published on September 3, 2026 and is available for public evaluation. Every component remains Experimental, breaking changes are possible, and production use is not yet recommended.

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

## Install the alpha

Install the public alpha from npm's `next` channel:

```bash
pnpm add @freight-px/frasto@next
```

## Repository

```text
apps/
  web/                 Public website, consumer documentation, and demo
packages/
  ui/                  @freight-px/frasto package source
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

## Documentation

The [public documentation](https://frasto.freightpx.com/docs) explains how to install, evaluate, and use implemented Frasto components. Internal planning, draft specifications, and maintainer notes are kept outside the public repository.

## Get help

- Start with the [public documentation](https://frasto.freightpx.com/docs/).
- Use the repository's issue forms for bugs, accessibility barriers, support questions, feature requests, and component proposals.
- Read [SUPPORT.md](./SUPPORT.md) for scope and the information needed for an answerable report.
- Report vulnerabilities privately using the process in [SECURITY.md](./SECURITY.md).

## Contributing

Contributions to documentation, accessibility, browser behavior, tests, component quality, and broadly reusable component proposals are welcome.

Read [CONTRIBUTING.md](./CONTRIBUTING.md) and the [Code of Conduct](./CODE_OF_CONDUCT.md) before starting substantial work.

## Project links

- Website: [frasto.freightpx.com](https://frasto.freightpx.com)
- Documentation: [frasto.freightpx.com/docs](https://frasto.freightpx.com/docs)
- Repository: [github.com/Freightpx/frasto](https://github.com/Freightpx/frasto)
- Package name: `@freight-px/frasto`
- Organization: Freightpx

## License

Frasto UI is available under the [MIT License](./LICENSE).
