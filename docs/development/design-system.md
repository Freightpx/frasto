# Design System Direction

## 1. Direction

Frasto UI translates the Freightpx visual language into a component library and design system for modern interfaces. It should feel **clear, editorial, practical, modern, lightweight, precise, and confident**.

The system is not a literal copy of the Freightpx marketing website. Marketing pages can use dramatic scale and generous whitespace; application interfaces must stay efficient during repeated daily use.

> **Clarity first. Craft throughout.**

## 2. Core principles

1. **Content before decoration.** Information hierarchy does more work than ornamental styling.
2. **Structure before cards.** Prefer alignment, whitespace, and separators over nested containers.
3. **Neutral by default.** Brand and product content should own the color; the UI should not impose a bright SaaS-blue identity.
4. **Compact, not cramped.** Dense business interfaces still need readable rhythm and touch-safe controls.
5. **One dominant action.** Primary actions are easy to find without making every control loud.
6. **Color has a job.** Use semantic color for status, feedback, and risk—not decoration.
7. **Motion has a job.** Motion explains state, hierarchy, or navigation and never delays work.
8. **Accessible states are designed states.** Hover, focus, selected, disabled, loading, empty, and error states are part of every component contract.
9. **Server-first is a design constraint.** Static UI should remain useful without client-side JavaScript.
10. **Predictability compounds.** Similar tasks should look and behave similarly across products.

## 3. Visual character

### Use

- strong typographic hierarchy
- concise headings
- small contextual labels
- numbered/indexed sections where useful
- clear grid alignment
- generous spacing between major sections
- tighter spacing inside repeated data rows
- warm, high-contrast neutrals
- thin borders and dividers
- strict square geometry
- direct interface copy

### Avoid

- generic bright-blue dashboard styling
- gradients as a default visual treatment
- glassmorphism
- rounded or pill-shaped controls and containers
- large floating shadows
- decorative dashboard charts
- cards nested inside cards
- motion on every hover state
- color-only selection or status indicators

## 4. Color

The initial theme uses Freightpx's warm-neutral fallback palette. These values may be refined when exact production brand tokens are available.

```css
:root {
  --frasto-bg: #f4f1ea;
  --frasto-surface: #ffffff;
  --frasto-surface-subtle: #ece9e2;

  --frasto-ink: #111111;
  --frasto-ink-muted: #66645f;
  --frasto-ink-soft: #8a8882;

  --frasto-border: #d7d3ca;
  --frasto-border-strong: #b9b5ac;

  --frasto-positive: #166534;
  --frasto-warning: #92400e;
  --frasto-danger: #991b1b;
  --frasto-focus: #111111;
}
```

### Usage

- Page background: warm off-white.
- Main surfaces: white or slightly warm white.
- Primary text: near-black.
- Secondary text: muted warm gray.
- Borders: quiet but visible.
- Primary action: near-black with light text.
- Secondary action: transparent/surface with a dark border.
- Positive, warning, and danger colors: functional only.
- Selected states: combine border, background, typography, and/or indicator—not color alone.

## 5. Dark theme

Dark mode keeps the same neutral hierarchy rather than introducing a new accent identity.

```css
[data-theme='dark'] {
  --frasto-bg: #11110f;
  --frasto-surface: #181816;
  --frasto-surface-subtle: #22221f;

  --frasto-ink: #f4f1ea;
  --frasto-ink-muted: #b8b4aa;
  --frasto-ink-soft: #8f8b83;

  --frasto-border: #34332f;
  --frasto-border-strong: #504e48;

  --frasto-positive: #86b991;
  --frasto-warning: #d2a46f;
  --frasto-danger: #d98a86;
  --frasto-focus: #f4f1ea;
}
```

## 6. Typography

Use **Inter** for interface text and **Inter Tight** for display headings. Keep system fallbacks so the package remains usable while fonts load or when a consumer chooses not to bundle the font files.

```css
--frasto-font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--frasto-font-display: "Inter Tight", Inter, ui-sans-serif, system-ui, sans-serif;
--frasto-font-mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;

--frasto-text-label: 0.6875rem;
--frasto-text-caption: 0.75rem;
--frasto-text-body-sm: 0.875rem;
--frasto-text-body: 1rem;
--frasto-text-title-sm: 1.125rem;
--frasto-text-title: 1.5rem;
--frasto-text-page-title: clamp(2rem, 4vw, 3.5rem);
```

### Behavior

- Page titles are large, direct, and tightly spaced.
- Section titles are concise and medium-to-semi-bold.
- Context labels may use uppercase with increased tracking.
- Body text is readable, never overly light.
- Prices, dates, IDs, quantities, and table numbers use tabular numerals where alignment matters.
- Do not use uppercase for long sentences.

## 7. Spacing

Use one spacing scale everywhere.

```css
--frasto-space-1: 4px;
--frasto-space-2: 8px;
--frasto-space-3: 12px;
--frasto-space-4: 16px;
--frasto-space-5: 24px;
--frasto-space-6: 32px;
--frasto-space-7: 48px;
--frasto-space-8: 64px;
```

Major page sections can breathe. Repeated rows, form groups, tables, filters, and toolbars should stay compact.

## 8. Shape, borders, shadows

```css
--frasto-control-height: 36px;
--frasto-radius: 0px;
--frasto-border-width: 1px;
```

- Thin borders define structure.
- Buttons, inputs, checkboxes, slider parts, badges, icon buttons, menus, surfaces, and dialogs use square corners.
- Rounded and pill treatments are not Frasto variants.
- Shadows are reserved for overlays, floating menus, dialogs, and sticky surfaces that genuinely need separation.
- Default sections should not look like floating cards.

### Tabs

- The tab list uses a single quiet bottom border.
- Individual tabs have no box, background, side border, top border, or radius.
- The active tab uses stronger text and a short bottom rule aligned with the label area.
- Inactive tabs use muted text while preserving sufficient contrast.
- Focus-visible treatment remains distinct from the active indicator.

## 9. Icons

Lucide is the built-in icon source for Frasto. Render its interface icons with a consistent **1.25px stroke width**, `currentColor`, and a size appropriate to the control. Components should still expose icon slots so consumers can provide another compatible icon when required.

Frasto Icons is a future ecosystem layer, not a current replacement task. Its visual language should be designed only after Frasto UI is mature enough to provide stable geometric and optical direction.

- Decorative icons are hidden from assistive technology.
- Icon-only controls always have an accessible name.
- Unfamiliar actions pair an icon with text.
- Icons remain functional and restrained, especially in dense tables.

## 10. Motion

Recommended duration: **120–220ms**.

Good uses:

- tab content transitions
- disclosure expansion
- dialog/dropdown entrance and exit
- selection-state changes
- toast entrance and exit

Avoid:

- decorative parallax
- continuous floating motion
- large page-transition effects
- animation that delays input
- animation on every hover state

Always respect `prefers-reduced-motion`.

## 11. Interface density

Modern interfaces range from content-driven websites to long-session application workspaces. The system should support both without making ordinary Astro projects feel like dashboards.

- Controls should be comfortable, but not marketing-page oversized.
- Desktop tables favor scanning and alignment.
- Mobile layouts may transform rather than simply shrink.
- Related information should group through hierarchy before adding containers.

## 12. Component states

Every interactive component must consider:

- default
- hover
- active/pressed
- focus-visible
- selected
- disabled
- loading
- invalid/error

Every data-display pattern should consider:

- loading
- empty
- partial data
- error
- long content
- narrow viewport

## 13. Accessibility baseline

- semantic HTML first
- keyboard operation
- visible focus
- logical heading order
- labels for all form controls
- sufficient contrast
- status never communicated by color alone
- meaningful accessible names for icon-only controls
- touch targets appropriate for mobile
- reduced-motion support

## 14. Design review question

Before adding a visual treatment, ask:

> Does this make the interface clearer, faster to scan, or easier to operate?

If not, it probably does not belong in the default system.
