# Architecture

## Goal

Build an Astro-first UI system that works as server-rendered HTML by default and adds client-side behavior only where interaction requires it.

## Layer model

```text
Design tokens
    ↓
Primitives
    ↓
Application components
    ↓
Patterns
    ↓
Recipes / complete SaaS screens
```

## Rendering model

Preferred order:

1. Native HTML
2. Astro component
3. CSS
4. Small vanilla TypeScript enhancement
5. Web Component for reusable interactive behavior
6. Focused third-party dependency when browser APIs are insufficient

React, Vue, and Svelte are consumers/companions, not requirements of the core package.

## Backend boundary

The library renders data supplied by the application. It does not own persistence, authentication, querying, billing, or application state.

Good:

```astro
<ResourceTable rows={customers} columns={columns} />
```

Avoid:

```astro
<ResourceTable endpoint="/api/customers" />
```

## Package boundary

V1 starts with one UI package. Split packages only after real usage demonstrates a need.

```text
@freightpx/frasto
  components
  patterns
  styles
  small interaction helpers
```

## Styling

- Semantic CSS custom properties are public theming API.
- Components should not expose utility-class implementation details as their main API.
- Consumers should not be required to install or configure Tailwind.
- Internal build tooling may change without becoming a consumer requirement.

## JavaScript budget

Static components ship no runtime JavaScript. Interactive components should load only their own behavior and avoid a global application runtime.

## Dependency rule

A dependency must save meaningful implementation or accessibility complexity. Do not add a dependency for styling convenience alone.

## Data contracts

Use simple TypeScript contracts for common component inputs. Data contracts describe display requirements, not database schemas.

## Documentation as implementation

A component is incomplete until its documentation covers:

- purpose
- anatomy
- API
- variants
- states
- accessibility
- examples
- responsive behavior
- do/don't guidance
