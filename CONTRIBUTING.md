# Contributing

Thanks for helping improve Frasto UI. The project is documentation-first while the component API is being established.

## Before proposing a component

A new component should solve a repeatable application problem. Before implementation, define:

1. the use case
2. why native HTML is or is not enough
3. expected states
4. keyboard behavior
5. responsive behavior
6. theming needs
7. whether an existing component can be extended instead

## Design constraints

Contributions should follow [`DESIGN.md`](./DESIGN.md). In particular:

- no generic bright-blue default theme
- no gratuitous gradients/glass effects
- avoid nested card-heavy layouts
- color must have semantic purpose
- motion must have a job
- accessibility is part of the component definition

## Code principles

- Astro-first
- TypeScript
- semantic HTML
- minimal runtime JavaScript
- backend agnostic
- small dependency surface
- public APIs should describe intent, not CSS implementation

## Pull requests

A component PR should eventually include:

- implementation
- documentation
- examples
- tests where behavior exists
- accessibility notes
- changelog entry once release automation is enabled
