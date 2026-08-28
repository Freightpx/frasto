# Contributing to Frasto UI

Thanks for helping improve Frasto. The project welcomes focused contributions to documentation, accessibility, browser behavior, tests, component quality, and broadly reusable interface components.

By participating, you agree to follow the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Before starting

- Search existing issues and pull requests.
- Use the relevant issue form for bugs, improvements, or component proposals.
- Discuss substantial API changes before implementation.
- Keep one contribution focused on one clear problem.
- Do not implement an item merely because it appears in the idea list or specifications.

## Development setup

Requirements:

- Node.js 22 or later
- pnpm 11

```bash
pnpm install
pnpm dev
```

Before opening a pull request, run:

```bash
pnpm check
pnpm build
git diff --check
```

## Documentation boundaries

- Consumer installation, usage, and implemented component APIs belong in `apps/web/src/content/docs/docs`.
- Product direction and roadmap work belong in `docs/project`.
- Architecture, design, testing, and release guidance belong in `docs/development`.
- Unreleased contracts and pattern research belong in `docs/specifications`.
- Superseded handoffs belong in `docs/archive`.

Never present planned functionality as an available public API.

## Component proposals

A new component should solve a broadly repeatable interface problem. Define:

1. the use case and evidence across more than one interface
2. why native HTML or an existing component is insufficient
3. anatomy and composition boundaries
4. expected states
5. keyboard and focus behavior
6. accessibility relationships and announcements
7. responsive and long-content behavior
8. theming and runtime impact

Review the [component standards](./docs/development/component-standards.md) before implementation.

## Design and code principles

Contributions must follow the [design system direction](./docs/development/design-system.md) and [development architecture](./docs/development/architecture.md).

- Astro-first and server-first
- TypeScript-safe
- semantic HTML
- minimal progressive JavaScript
- backend agnostic
- accessible states and keyboard behavior
- square geometry and semantic color
- small dependency surface
- public APIs describe intent rather than CSS implementation

## Pull requests

A component change should include, where applicable:

- implementation and public exports
- consumer documentation and realistic examples
- accessibility and responsive notes
- tests or explicit manual verification scenarios
- changelog entry for user-visible behavior
- screenshots for rendered visual changes

Maintainers may ask for a proposal to return to specification work when its behavior or ownership boundary is unresolved.
