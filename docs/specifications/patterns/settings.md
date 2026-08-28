---
title: Settings pattern
description: Organize product configuration into navigable sections with predictable form states.
---

## Structure

```text
SettingsLayout
├── settings navigation
└── active settings page
    ├── section heading
    ├── description
    ├── form groups
    └── save actions
```

## Information architecture

Group settings by user task: Profile, Team, Security, Notifications, Billing, API. Avoid exposing internal service boundaries as navigation labels.

## Save behavior

Choose one model per form region: explicit save or immediate update. Communicate submitting, saved, and failed states; preserve input after failure. Warn before navigation only when unsaved changes would genuinely be lost.

## Permissions

Unavailable settings should be hidden or clearly disabled according to product policy. Access failures must not masquerade as empty data.

## Responsive behavior

Navigation transforms to a compact control while the current section remains clear. Sticky save actions must avoid covering fields and mobile browser controls.
