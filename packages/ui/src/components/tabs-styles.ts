export const tabsRoot = 'block min-w-0';

export const tabListBase = [
  'flex',
  'min-w-0',
  'gap-6',
  'overflow-x-auto',
  'overflow-y-hidden',
  'border-b',
  'border-[var(--frasto-border)]',
].join(' ');

export const tabBase = [
  'relative',
  'inline-flex',
  'h-[var(--frasto-control-height)]',
  'shrink-0',
  'items-center',
  'border-0',
  'bg-transparent',
  'px-0',
  'py-0',
  'text-sm',
  'text-[var(--frasto-ink-muted)]',
  'shadow-none',
  'hover:text-[var(--frasto-ink)]',
  'focus-visible:outline',
  'focus-visible:outline-2',
  'focus-visible:outline-offset-2',
  'focus-visible:outline-[var(--frasto-focus)]',
  'disabled:cursor-not-allowed',
  'disabled:opacity-40',
].join(' ');

export const tabPanelBase = 'min-w-0 pt-4';
