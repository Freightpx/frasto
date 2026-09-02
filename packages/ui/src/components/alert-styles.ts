export type AlertTone = 'neutral' | 'info' | 'positive' | 'warning' | 'danger';

export const alertRoot = [
  'frasto-alert',
  'grid',
  'min-w-0',
  'grid-cols-[auto_minmax(0,1fr)]',
  'gap-x-3',
  'border',
  'bg-[var(--frasto-surface-subtle)]',
  'p-4',
  'text-sm',
  'leading-5',
  'shadow-none',
].join(' ');
export const alertWithoutIcon = 'grid-cols-1';
export const alertWithAction = 'grid-cols-[auto_minmax(0,1fr)_auto]';
export const alertWithoutIconWithAction = 'grid-cols-[minmax(0,1fr)_auto]';
export const alertIcon = 'inline-flex size-5 items-center justify-center text-[var(--frasto-alert-tone)]';
export const alertBody = 'min-w-0';
export const alertTitle = 'm-0 font-semibold text-[var(--frasto-alert-tone)]';
export const alertContent = 'min-w-0 text-[var(--frasto-ink-muted)] [&_a]:text-inherit [&_a]:underline [&_a]:underline-offset-4';
export const alertContentWithTitle = 'mt-1';
export const alertAction = 'min-w-0 self-start';

export const alertTones: Record<AlertTone, string> = {
  neutral: 'border-[var(--frasto-border)]',
  info: 'border-[var(--frasto-border)]',
  positive: 'border-[var(--frasto-border)]',
  warning: 'border-[var(--frasto-border)]',
  danger: 'border-[var(--frasto-border)]',
};
