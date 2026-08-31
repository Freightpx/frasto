export type AlertTone = 'neutral' | 'info' | 'positive' | 'warning' | 'danger';

export const alertRoot = [
  'grid',
  'min-w-0',
  'grid-cols-[auto_minmax(0,1fr)]',
  'gap-x-3',
  'border',
  'border-l-2',
  'bg-[var(--frasto-surface)]',
  'p-4',
  'text-sm',
  'leading-5',
  'shadow-none',
].join(' ');
export const alertWithoutIcon = 'grid-cols-1';
export const alertIcon = 'row-span-2 mt-0.5 inline-flex size-5 items-center justify-center text-current';
export const alertBody = 'min-w-0';
export const alertTitle = 'm-0 font-semibold text-[var(--frasto-ink)]';
export const alertContent = 'min-w-0 text-[var(--frasto-ink-muted)] [&_a]:text-inherit [&_a]:underline [&_a]:underline-offset-4';
export const alertContentWithTitle = 'mt-1';

export const alertTones: Record<AlertTone, string> = {
  neutral: 'border-[var(--frasto-border)] border-l-[var(--frasto-border-strong)]',
  info: 'border-[var(--frasto-border)] border-l-[var(--frasto-info)]',
  positive: 'border-[var(--frasto-border)] border-l-[var(--frasto-positive)]',
  warning: 'border-[var(--frasto-border)] border-l-[var(--frasto-warning)]',
  danger: 'border-[var(--frasto-border)] border-l-[var(--frasto-danger)]',
};
