# Upstream Sources

External projects may inform Frasto when their licenses, architecture, and quality evidence are compatible with Frasto's goals. An upstream reference does not become Frasto's source of truth.

## Bejamas UI

- **Reference:** <https://github.com/bejamas/ui>
- **Legacy URL present in the supplied README:** <https://github.com/nicholascostadev/bejamas-ui>
- **License:** MIT
- **Copyright:** 2025 Bejamas Group sp. z o. o.
- **Local snapshot:** supplied in `bejamas/` on 2026-08-29 without Git metadata
- **Repository policy:** local reference only; never committed or published with Frasto

### Permitted use

- Compare component semantics, composition, and interaction responsibilities.
- Adapt a focused implementation when it is simpler and safer than rebuilding from scratch.
- Retain the complete license notice in `THIRD_PARTY_NOTICES.md` and add a concise source-path comment to directly derived files.

### Excluded use

- Bejamas branding, assets, presets, generated registry payloads, documentation prose, templates, CLI, or Bun workspace structure
- `cn-*` classes, theme presets, and visual styling
- automatic adoption of `@data-slot` behavior packages without Frasto-specific evaluation

### Component mapping

| Classification | Families |
| --- | --- |
| Phase 4 adaptation | Accordion, Collapsible, Alert, ButtonGroup |
| Phase 7 Wave A | Label, InputGroup, Slider, Toggle, ToggleGroup |
| Phase 7 Wave B | Card, Item, Kbd, Date, LinkGroup, StickySurface |
| Phase 7 Wave C | Combobox, HoverCard, NavigationMenu, Command, Carousel, Marquee |
| Existing Frasto family; reference only | Avatar, Badge, Breadcrumb, Button, Checkbox, Dialog, Dropdown, FormField, Input, Popover, Radio, Select, Separator, Skeleton, Spinner, Switch, Table, Tabs, Textarea, Tooltip |

Each adaptation receives its own contract, tests, documentation, public exports, and package-consumer evidence. Existing Frasto APIs are not replaced by their Bejamas counterparts.
