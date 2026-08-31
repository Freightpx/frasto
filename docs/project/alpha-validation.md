# Public Alpha Validation Record

**Candidate:** `@freightpx/frasto@0.1.0-alpha.1`  
**Validation date:** 2026-08-31  
**Outcome:** Local automated and visual validation passed. Manual assistive-technology and external publication evidence remain incomplete.

## Environment

| Tool | Version |
| --- | --- |
| Operating system | Microsoft Windows 11 Pro, build 26200 |
| Node.js | 22.14.0 |
| pnpm | 11.7.0 |
| Astro consumer | 7.2.7 |
| Playwright | 1.62.1 |
| Chromium | 151.0.7922.34 |
| Firefox | 153.0 |
| WebKit | 26.5 |

## Automated release evidence

- `pnpm test`: 27 rendered-contract tests and 123 browser tests passed.
- Chromium, Firefox, and WebKit passed the keyboard, focus, state, dismissal, theme, responsive, touch-oriented, zoom, reduced-motion, and representative accessibility paths.
- The package audit passed with 91 public files and no tests, fixtures, development plans, Bejamas checkout, or workspace dependencies.
- The packed Astro 7 consumer rendered every public family and a separate named-import route.
- The named-import consumer proves that importing `Button` from the flat package entry emits Frasto tokens and component styles automatically.
- `pnpm check`, `pnpm build`, and `git diff --check` pass.

## Direct visual review

The following built routes were inspected with representative desktop/narrow and light/dark states:

- public homepage: 1440×1000 light and 390×844 dark;
- documentation homepage: 1440×1000 light;
- project status: 390×844 dark;
- AI tools guide: 1440×1000 light; and
- Dialog documentation: 1440×900 dark with the Dialog open.

The reviewed pages returned HTTP 200, contained no broken images, and had no document-level horizontal overflow. Dialog keyboard opening moved focus to its close control; Escape closed it and restored the trigger.

## Defects found and corrected

1. Named imports could allow the package entry and automatic stylesheet import to be tree-shaken. The package now marks `src/index.ts` and CSS files as side effects, with package-audit, homepage, and packed-consumer regressions.
2. The public-alpha status banner compressed into unreadable columns at a narrow viewport. Status banners now use wrap-safe block layout, covered in all three browser engines.

No known critical keyboard, focus, form, responsive, or automated-accessibility defect remains after these corrections.

## Keyboard and assistive-technology boundary

Keyboard-only automated evidence covers native controls, SearchInput, Pagination, Accordion, Collapsible, ButtonGroup, Dropdown, Popover, Tooltip, Tabs, Dialog, Drawer, and Switch. An independent human keyboard review remains advisable immediately before publication.

NVDA was not installed or discoverable on the validation machine, so the required Windows NVDA smoke review was **not performed**. Install NVDA, then review forms, SearchInput, Tabs, Accordion, Dropdown, Dialog, and Drawer before publication.

No physical phone was available for this record. Playwright touch/mobile emulation passed, but it is not represented as physical-device evidence. VoiceOver and a broader physical-device matrix remain disclosed post-alpha work.

## External release boundary

The following remain unperformed and require separate authorization:

- npm publication using the `next` tag;
- installation from the real npm registry;
- production deployment, DNS, and HTTPS;
- production route/link/asset verification; and
- GitHub prerelease, changelog finalization, tag, and commit.

