---
title: CSS and token architecture
description: Public semantic variables, low-specificity component CSS, and no required utility framework.
---

CSS and CSS custom properties are Frasto's styling foundation.

## Layers

```text
Semantic tokens
    ↓
Shared foundations
    ↓
Component styles
    ↓
Consumer theme overrides
```

## Public contract

Tokens describe intent:

```css
.surface {
  color: var(--frasto-ink);
  background: var(--frasto-surface);
  border: 1px solid var(--frasto-border);
  border-radius: var(--frasto-radius);
}
```

Hard-coded values belong in token definitions, not scattered component rules.

## Specificity

Component CSS should use predictable, low-specificity selectors. Avoid `!important` except for tightly scoped accessibility safeguards such as reduced-motion overrides.

## Distribution

Consumers import one base stylesheet. Components should not require Tailwind configuration, a CSS-in-JS runtime, or a build-time plugin.

## Token evolution

Adding a token requires a reusable semantic role. Renaming or removing a public token is an API change and follows versioning policy.
