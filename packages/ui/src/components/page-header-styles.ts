export type PageHeaderHeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export const pageHeaderRoot = 'grid min-w-0 gap-6';
export const pageHeaderBreadcrumb = 'min-w-0';

export const pageHeaderMain = [
  'grid',
  'min-w-0',
  'gap-6',
  'md:grid-cols-[minmax(0,1fr)_auto]',
  'md:items-start',
].join(' ');
export const pageHeaderContent = 'min-w-0';

export const pageHeaderEyebrow = [
  'm-0',
  'mb-3',
  'text-[11px]',
  'font-semibold',
  'leading-4',
  'tracking-[0.12em]',
  'text-[var(--frasto-ink-muted)]',
  'uppercase',
].join(' ');

export const pageHeaderTitle = [
  'm-0',
  'max-w-[24ch]',
  'font-[var(--frasto-font-display)]',
  'text-[clamp(2rem,4vw,3rem)]',
  'font-semibold',
  'leading-[0.96]',
  'tracking-[-0.045em]',
  'text-[var(--frasto-ink)]',
].join(' ');

export const pageHeaderDescription = [
  'm-0',
  'mt-3',
  'max-w-3xl',
  'text-sm',
  'leading-6',
  'text-[var(--frasto-ink-muted)]',
].join(' ');

export const pageHeaderMetadata = [
  'mt-4',
  'flex',
  'min-w-0',
  'flex-wrap',
  'items-center',
  'gap-x-4',
  'gap-y-2',
  'text-xs',
  'text-[var(--frasto-ink-muted)]',
].join(' ');

export const pageHeaderActions = [
  'flex',
  'min-w-0',
  'flex-wrap',
  'items-center',
  'gap-2',
  'md:justify-end',
].join(' ');
