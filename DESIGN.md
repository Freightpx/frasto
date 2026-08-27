# Design System

## 1. Direction

Frasto UI translates the Freightpx visual language into a compact application design system. It should feel **clear, editorial, practical, modern, lightweight, precise, and confident**.

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
- restrained radius
- direct interface copy

### Avoid

- generic bright-blue dashboard styling
- gradients as a default visual treatment
- glassmorphism
- oversized pill-shaped containers everywhere
- large floating shadows
- decorative dashboard charts
- cards nested inside cards
- motion on every hover state
- color-only selection or status indicators

## 4. Color

The initial theme uses Freightpx's warm-neutral fallback palette. These values may be refined when exact production brand tokens are available.

```css
:root {
  --ui-bg: #f4f1ea;
  --ui-surface: #ffffff;
  --ui-surface-subtle: #ece9e2;

  --ui-ink: #111111;
  --ui-ink-muted: #66645f;
  --ui-ink-soft: #8a8882;

  --ui-border: #d7d3ca;
  --ui-border-strong: #b9b5ac;

  --ui-positive: #166534;
  --ui-warning: #92400e;
  --ui-danger: #991b1b;
  --ui-focus: #111111;
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
  --ui-bg: #11110f;
  --ui-surface: #181816;
  --ui-surface-subtle: #22221f;

  --ui-ink: #f4f1ea;
  --ui-ink-muted: #b8b4aa;
  --ui-ink-soft: #8f8b83;

  --ui-border: #34332f;
  --ui-border-strong: #504e48;

  --ui-positive: #86b991;
  --ui-warning: #d2a46f;
  --ui-danger: #d98a86;
  --ui-focus: #f4f1ea;
}
```

## 6. Typography

Use the exact Freightpx typeface when its licensed web implementation is available to the project. Until then, use a refined system sans stack rather than bundling an arbitrary new font.

```css
--ui-font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
--ui-font-mono: "SFMono-Regular", Consolas, "Liberation Mono", monospace;

--ui-text-label: 0.6875rem;
--ui-text-caption: 0.75rem;
--ui-text-body-sm: 0.875rem;
--ui-text-body: 1rem;
--ui-text-title-sm: 1.125rem;
--ui-text-title: 1.5rem;
--ui-text-page-title: clamp(2rem, 4vw, 3.5rem);
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
--ui-space-1: 4px;
--ui-space-2: 8px;
--ui-space-3: 12px;
--ui-space-4: 16px;
--ui-space-5: 24px;
--ui-space-6: 32px;
--ui-space-7: 48px;
--ui-space-8: 64px;
```

Major page sections can breathe. Repeated rows, form groups, tables, filters, and toolbars should stay compact.

## 8. Radius, borders, shadows

```css
--ui-radius-sm: 4px;
--ui-radius-md: 8px;
--ui-radius-lg: 12px;
```

- Thin borders define structure.
- Radius is subtle.
- Shadows are reserved for overlays, floating menus, dialogs, and sticky surfaces that genuinely need separation.
- Default sections should not look like floating cards.

## 9. Motion

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

## 10. Application density

A SaaS product is a workspace. The system should support long sessions and high-information screens.

- Controls should be comfortable, but not marketing-page oversized.
- Desktop tables favor scanning and alignment.
- Mobile layouts may transform rather than simply shrink.
- Related information should group through hierarchy before adding containers.

## 11. Component states

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

## 12. Accessibility baseline

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

## 13. Design review question

Before adding a visual treatment, ask:

> Does this make the interface clearer, faster to scan, or easier to operate?

If not, it probably does not belong in the default system.
