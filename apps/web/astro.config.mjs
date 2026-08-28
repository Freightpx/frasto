import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://frasto.freightpx.com',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    starlight({
      title: 'Frasto UI',
      description: 'An Astro-first open-source UI component library and design system.',
      favicon: '/favicon.ico',
      logo: {
        dark: '../../logo/frastro_logo_white_nobg.png',
        light: '../../logo/frastro_logo_black_nobg.png',
        alt: '',
        replacesTitle: false,
      },
      customCss: ['./src/styles/custom.css'],
      lastUpdated: true,
      editLink: {
        baseUrl: 'https://github.com/Freightpx/frasto/edit/main/apps/web/',
      },
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Freightpx/frasto',
        },
      ],
      sidebar: [
        {
          label: 'Introduction',
          items: [
            { label: 'Overview', slug: 'docs/getting-started/introduction' },
            { label: 'Why Frasto', slug: 'docs/getting-started/why-frasto' },
            { label: 'Principles', slug: 'docs/getting-started/principles' },
            { label: 'Project status', slug: 'docs/getting-started/status' },
          ],
        },
        {
          label: 'Getting Started',
          items: [
            { label: 'Installation', slug: 'docs/getting-started/installation' },
            { label: 'Quick start', slug: 'docs/getting-started/quick-start' },
            { label: 'Project setup', slug: 'docs/getting-started/project-setup' },
            { label: 'Styles', slug: 'docs/getting-started/styles' },
            { label: 'Themes', slug: 'docs/getting-started/themes' },
            { label: 'Icons', slug: 'docs/getting-started/icons' },
            { label: 'TypeScript', slug: 'docs/getting-started/typescript' },
          ],
        },
        {
          label: 'Foundations',
          collapsed: true,
          items: [
            { label: 'Design principles', slug: 'docs/foundations/design-principles' },
            { label: 'Color', slug: 'docs/foundations/color' },
            { label: 'Typography', slug: 'docs/foundations/typography' },
            { label: 'Spacing & layout', slug: 'docs/foundations/spacing-layout' },
            { label: 'Responsive design', slug: 'docs/foundations/responsive-design' },
            { label: 'Motion', slug: 'docs/foundations/motion' },
            { label: 'Accessibility', slug: 'docs/foundations/accessibility' },
            { label: 'Theme tokens', slug: 'docs/foundations/themes' },
            { label: 'Iconography', slug: 'docs/foundations/iconography' },
            { label: 'Content & copy', slug: 'docs/foundations/content-copy' },
          ],
        },
        {
          label: 'How Frasto Works',
          collapsed: true,
          items: [
            { label: 'Astro first', slug: 'docs/architecture/astro-first' },
            { label: 'Server-first', slug: 'docs/architecture/server-first' },
            { label: 'Progressive interactivity', slug: 'docs/architecture/progressive-interactivity' },
            { label: 'Backend independence', slug: 'docs/architecture/backend-agnostic' },
            { label: 'Theming contract', slug: 'docs/architecture/theming' },
          ],
        },
        {
          label: 'Components',
          items: [
            { label: 'Overview', slug: 'docs/components/overview' },
            {
              label: 'Actions',
              items: [
                { label: 'Button', slug: 'docs/components/button' },
                { label: 'IconButton', slug: 'docs/components/icon-button' },
              ],
            },
            {
              label: 'Forms',
              items: [
                { label: 'Input', slug: 'docs/components/input' },
                { label: 'Textarea', slug: 'docs/components/textarea' },
                { label: 'Select', slug: 'docs/components/select' },
                { label: 'Checkbox', slug: 'docs/components/checkbox' },
                { label: 'Radio', slug: 'docs/components/radio' },
                { label: 'Switch', slug: 'docs/components/switch' },
                { label: 'FormField', slug: 'docs/components/form-field' },
                { label: 'SearchInput', slug: 'docs/application-components/search-input' },
              ],
            },
            {
              label: 'Display',
              items: [
                { label: 'Badge', slug: 'docs/components/badge' },
                { label: 'Avatar', slug: 'docs/components/avatar' },
                { label: 'Status', slug: 'docs/components/status' },
                { label: 'Skeleton', slug: 'docs/components/skeleton' },
                { label: 'Spinner', slug: 'docs/components/spinner' },
              ],
            },
            {
              label: 'Feedback',
              items: [
                { label: 'EmptyState', slug: 'docs/application-components/empty-state' },
              ],
            },
            {
              label: 'Navigation',
              items: [
                { label: 'Breadcrumb', slug: 'docs/components/breadcrumb' },
                { label: 'Tabs', slug: 'docs/components/tabs' },
              ],
            },
            {
              label: 'Overlays',
              items: [
                { label: 'Tooltip', slug: 'docs/components/tooltip' },
                { label: 'Dropdown', slug: 'docs/components/dropdown' },
                { label: 'Dialog', slug: 'docs/components/dialog' },
                { label: 'Drawer', slug: 'docs/components/drawer' },
                { label: 'Popover', slug: 'docs/components/popover' },
              ],
            },
            {
              label: 'Data',
              items: [
                { label: 'Table', slug: 'docs/application-components/table' },
              ],
            },
            {
              label: 'Layout',
              items: [
                { label: 'Surface', slug: 'docs/components/surface' },
                { label: 'Separator', slug: 'docs/components/separator' },
                { label: 'PageHeader', slug: 'docs/application-components/page-header' },
              ],
            },
          ],
        },
        {
          label: 'Guides',
          collapsed: true,
          items: [
            { label: 'Forms', slug: 'docs/guides/forms' },
            { label: 'Tables & data states', slug: 'docs/guides/tables' },
            { label: 'Responsive layouts', slug: 'docs/guides/responsive-layouts' },
            { label: 'Backend integrations', slug: 'docs/guides/backend-integrations' },
          ],
        },
      ],
    }),
  ],
});
