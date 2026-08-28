export type StatusTone = 'neutral' | 'positive' | 'warning' | 'danger' | 'info';

export const statusBase = [
  'inline-flex',
  'min-w-0',
  'items-center',
  'gap-2',
  'text-xs',
  'font-medium',
  'leading-5',
].join(' ');

export const statusTones: Record<StatusTone, string> = {
  neutral: 'text-[var(--frasto-ink-muted)]',
  positive: 'text-[var(--frasto-positive)]',
  warning: 'text-[var(--frasto-warning)]',
  danger: 'text-[var(--frasto-danger)]',
  info: 'text-[var(--frasto-info)]',
};

export const statusMarker = 'size-1.5 shrink-0 bg-current';

