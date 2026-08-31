---
name: frasto-ui
description: Build or revise Astro interfaces with the published Frasto UI package. Use when selecting Frasto components, composing their APIs, applying Frasto tokens, or checking generated Frasto markup; do not use for unrelated UI libraries.
---

# Frasto UI

Build against the installed `@freightpx/frasto` version and the public documentation. Treat planned specifications as unavailable until the package exports them.

## Workflow

1. Inspect the consumer's Frasto and Astro versions before choosing APIs.
2. Confirm component names, props, slots, events, and exported types from the installed package or <https://frasto.freightpx.com/docs/>. Do not invent convenient APIs.
3. Import components from the flat `@freightpx/frasto` entrypoint. Let that entrypoint load the compiled stylesheet.
4. Prefer useful server-rendered Astro, native HTML semantics, and ordinary form submission. Add client behavior only when the selected component owns an interaction.
5. Keep application data, validation, requests, routing, and persistence outside Frasto components.
6. Customize documented semantic tokens instead of depending on generated classes or internal selectors.
7. Check default, focus-visible, disabled, loading, selected, and invalid states where applicable. Check narrow layout, long content, light/dark themes, and reduced motion for meaningful changes.

## Frasto boundaries

- Use square geometry, structural dividers, compact 36px controls, restrained surfaces, and semantic color.
- Keep default components shadow-free except genuine overlays.
- Use built-in Lucide defaults or documented icon slots; icon-only controls need accessible names.
- Preserve component-provided keyboard, focus, labelling, and dismissal behavior.
- Do not replace native structure with generic `div` markup merely to match a visual.
- If the required component is not exported, compose existing Frasto primitives and semantic HTML or explain the gap; do not claim a planned family exists.

When an alpha API is ambiguous, show the assumption and keep the result easy to revise.
