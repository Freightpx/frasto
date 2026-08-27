import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://frasto.freightpx.com',
  base: '/docs',
  integrations: [
    starlight({
      title: 'Frasto UI',
      description: 'Astro-first SaaS UI design system by Freightpx.',
      customCss: ['./src/styles/custom.css'],
      social: [
        {
          icon: 'github',
          label: 'GitHub',
          href: 'https://github.com/Freightpx/frasto',
        },
      ],
      sidebar: [
        {
          label: 'Start Here',
          items: [
            { label: 'Introduction', slug: 'getting-started/introduction' },
            { label: 'Project status', slug: 'getting-started/status' },
          ],
        },
        {
          label: 'Foundations',
          items: [
            { label: 'Design principles', slug: 'foundations/design-principles' },
            { label: 'Color', slug: 'foundations/color' },
            { label: 'Typography', slug: 'foundations/typography' },
            { label: 'Spacing & layout', slug: 'foundations/spacing-layout' },
            { label: 'Shape & depth', slug: 'foundations/shape-depth' },
            { label: 'Motion', slug: 'foundations/motion' },
            { label: 'Accessibility', slug: 'foundations/accessibility' },
          ],
        },
        {
          label: 'Architecture',
          items: [
            { label: 'Server-first', slug: 'architecture/server-first' },
            { label: 'Component philosophy', slug: 'architecture/component-philosophy' },
            { label: 'Theming', slug: 'architecture/theming' },
          ],
        },
        {
          label: 'Components',
          items: [
            { label: 'Component roadmap', slug: 'components/roadmap' },
          ],
        },
        {
          label: 'Patterns',
          items: [
            { label: 'SaaS patterns', slug: 'patterns/overview' },
          ],
        },
        {
          label: 'Project',
          items: [
            { label: 'Contributing', slug: 'contributing/overview' },
          ],
        },
      ],
    }),
  ],
});
