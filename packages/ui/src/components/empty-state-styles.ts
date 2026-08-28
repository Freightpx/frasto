export type EmptyStateAlign = 'center' | 'start';
export type EmptyStateElement = 'div' | 'section';
export type EmptyStateHeadingLevel = 2 | 3 | 4 | 5 | 6;

export const emptyStateRoot = [
  'grid',
  'min-w-0',
  'gap-6',
  'py-12',
].join(' ');

export const emptyStateAlignments: Record<EmptyStateAlign, string> = {
  start: 'justify-items-start text-left',
  center: 'justify-items-center text-center',
};

export const emptyStateIcon = [
  'flex',
  'size-10',
  'items-center',
  'justify-center',
  'border',
  'border-[var(--frasto-border)]',
  'text-[var(--frasto-ink-muted)]',
].join(' ');

export const emptyStateContent = 'grid min-w-0 max-w-2xl gap-3';

export const emptyStateTitle = [
  'm-0',
  'font-[var(--frasto-font-display)]',
  'text-2xl',
  'font-semibold',
  'leading-tight',
  'tracking-[-0.03em]',
  'text-[var(--frasto-ink)]',
].join(' ');

export const emptyStateDescription = [
  'm-0',
  'text-sm',
  'leading-6',
  'text-[var(--frasto-ink-muted)]',
].join(' ');

export const emptyStateActions = [
  'flex',
  'w-full',
  'max-w-md',
  'flex-col',
  'gap-2',
  'sm:w-auto',
  'sm:max-w-none',
  'sm:flex-row',
  'sm:flex-wrap',
].join(' ');

export const emptyStateActionAlignments: Record<EmptyStateAlign, string> = {
  start: 'sm:justify-start',
  center: 'sm:justify-center',
};

export const emptyStateFooter = [
  'max-w-2xl',
  'text-xs',
  'leading-5',
  'text-[var(--frasto-ink-muted)]',
].join(' ');
