# Frasto Repository Guidance

## Product structure

- Treat this repository as the Frasto monorepo: the publishable UI package and the public website, documentation, and demo live together.
- Keep components Astro-first, server-first, TypeScript-safe, backend-agnostic, and useful without client-side JavaScript unless interaction requires it.
- Prefer semantic HTML, CSS, and small progressive enhancements over framework-heavy abstractions.

## Visual direction

- Use a warm off-white canvas, near-black typography, strong editorial hierarchy, thin structural lines, restrained flat surfaces, and compact application density.
- Prefer typography, spacing, dividers, and grid alignment over nested cards.
- Use concise headings with small contextual or indexed labels such as `01 / CUSTOMERS` where the information architecture benefits from them.
- Use semantic colors only for status, feedback, risk, and information.
- Keep default components shadow-free. Reserve elevation for overlays or genuinely overlapping surfaces.
- Use square geometry throughout the product UI. Do not round controls, surfaces, badges, checkboxes, slider parts, icon buttons, menus, or dialogs.
- Avoid generic blue application styling, glassmorphism, gradients, decorative animation, and card-like table rows.

## Styling anchors

- UI/body font: Inter.
- Display/heading font: Inter Tight.
- Default control height: 36px.
- Global component radius: 0px.
- Borders and structural dividers: 1px.
- Primary actions: near-black background with light text.
- Secondary actions: light surface with a dark border.
- Spacing scale: 4, 8, 12, 16, 24, 32, 48, and 64px.
- Motion must communicate state or navigation and respect `prefers-reduced-motion`.
- Tabs have no enclosing box, individual border, or background. Use one quiet baseline across the tab list and a short active bottom rule beneath the selected tab.

## Icons

- Use Lucide for the built-in Frasto icon set.
- Render Lucide icons with a consistent `1.25px` stroke width, `currentColor`, and sizing appropriate to the control.
- Keep consumer-facing icon slots open so applications can supply their own compatible SVG or component when needed.
- Hide decorative icons from assistive technology. Give every icon-only control an accessible name.

## Component review

- Cover default, hover, active, focus-visible, selected, disabled, loading, and invalid states where applicable.
- Cover loading, empty, partial, error, long-content, and narrow-viewport states for data-display patterns.
- Prefer structural row dividers in tables and resource lists.
- Keep public APIs composable and avoid coupling components to a backend or data-fetching library.

## Brand assets

- Use the approved Frasto logo assets in `/logo`; choose the transparent black or white version to preserve contrast.
- Do not redraw, reinterpret, or generate substitute Frasto marks.
