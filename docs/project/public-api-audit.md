# Public API Audit — `0.1.0-alpha.1`

This record captures the source-level public boundary reviewed for the first Frasto alpha. It is development evidence, not public component documentation.

## Package boundary

- [x] One flat component and type entry point remains available from `@freightpx/frasto`.
- [x] Styles continue to load automatically from the package entry point, with explicit `styles.css` and `tokens.css` exports retained.
- [x] The package and exported `version` value both report `0.1.0-alpha.1`.
- [x] Supported runtimes are Astro `>=7 <8` and Node.js `>=22`.
- [x] The package audit requires the README, license, notices, source entry point, tokens, and built stylesheet while rejecting tests, fixtures, development plans, Bejamas, and workspace dependencies.

## Props and native attributes

- Primitive elements extend the appropriate Astro HTML attribute type and forward remaining native attributes.
- Composite roots expose only the attributes that belong on their rendered root; part components own trigger, panel, list, and item attributes.
- Explicit prop omissions prevent collisions between native attributes and Frasto state props.
- No alpha audit change renamed an existing component, prop, slot, or event.

## Events

| Family | Public state signal |
| --- | --- |
| Dialog, Drawer, Dropdown, Popover | `frasto:open` and `frasto:close` |
| Accordion | `frasto:accordion-change` with the expanded values |
| Collapsible | `frasto:collapsible-change` with the open state |
| Tabs | `frasto:tab-change` with the selected value |
| SearchInput | native input events plus `frasto:search-clear` |
| Native form controls | native form, input, and change behavior |

Events remain additive progressive-enhancement hooks. Applications retain data fetching, persistence, validation, and routing ownership.

## Hooks, IDs, and composition

- Documented behavior hooks such as `data-frasto-dialog-close`, `data-frasto-drawer-close`, and Dropdown's keep-open hook remain supported.
- Other `data-frasto-*` markers expose state for styling and testing; generated class names are not a public API.
- Generated IDs are scoped per rendered component. Consumers should still provide explicit stable IDs when server/client code needs to address the same relationship.
- Dialog and Drawer now share nested-safe document scroll locking. Dialog's native backdrop covers the viewport, so outside dismissal works independently of panel dimensions.
- Tooltip-wrapped triggers and representative nested overlay composition are covered by browser tests.

## Evidence boundary

Automated render, browser, accessibility, package, and packed-consumer evidence is complete for the alpha boundary. Manual Windows NVDA, full keyboard review, and optional physical-phone confirmation remain launch tasks. VoiceOver and a broader device matrix are explicitly post-alpha evidence.

