export type StatTone = 'neutral' | 'positive' | 'warning' | 'danger' | 'info';

export const statRoot = [
  'm-0',
  'min-w-0',
  'border-t',
  'border-[var(--frasto-border)]',
  'py-4',
].join(' ');

export const statBody = 'grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1';
export const statLabel = 'col-start-1 row-start-1 m-0 text-xs font-medium leading-5 text-[var(--frasto-ink-muted)]';
export const statValue = [
  'm-0',
  'mt-1',
  'col-start-1',
  'row-start-2',
  'break-words',
  'font-[var(--frasto-font-display)]',
  'text-3xl',
  'font-semibold',
  'leading-none',
  'tracking-[-0.035em]',
  'text-[var(--frasto-ink)]',
  'tabular-nums',
].join(' ');
export const statContext = 'col-start-1 row-start-3 m-0 mt-2 flex min-w-0 flex-wrap items-baseline gap-x-3 gap-y-1';
export const statChange = 'm-0 text-xs font-medium leading-5';
export const statDescription = 'm-0 text-xs leading-5 text-[var(--frasto-ink-muted)]';
export const statVisual = 'm-0 row-span-3 col-start-2 row-start-1 min-w-0 self-center';

export const statTones: Record<StatTone, string> = {
  neutral: 'text-[var(--frasto-ink-muted)]',
  positive: 'text-[var(--frasto-positive)]',
  warning: 'text-[var(--frasto-warning)]',
  danger: 'text-[var(--frasto-danger)]',
  info: 'text-[var(--frasto-info)]',
};
