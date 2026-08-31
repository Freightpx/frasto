# Frasto UI

Astro-first open-source components and design foundations for modern websites and applications.

> Public alpha: every component is Experimental and may change before a stable release.

## Install

```bash
pnpm add @freightpx/frasto@next
```

```astro
---
import { Button, PageHeader } from '@freightpx/frasto';
---

<PageHeader title="Customers">
  <Button slot="actions">Add customer</Button>
</PageHeader>
```

The package entry includes Frasto's compiled stylesheet. Consumers do not need React, Vue, Svelte, Tailwind, or a separate client runtime for static components.

## Compatibility and maturity

- Astro `>=7 <8`
- Node.js 22 or later
- current Chromium, Firefox, and WebKit engines are covered by the alpha test matrix
- all component families remain Experimental

Use the [Frasto documentation](https://frasto.freightpx.com/docs/) for component APIs, accessibility notes, theming, limitations, and examples.

Issues and support requests belong in the [GitHub repository](https://github.com/Freightpx/frasto). Security reports must follow the repository's private reporting process.

Frasto UI is available under the MIT License.
