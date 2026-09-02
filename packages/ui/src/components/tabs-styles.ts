export type TabsVariant = 'underline' | 'segmented';

export const tabsRoot = 'block min-w-0';

export const tabListBase = [
  'relative',
  'inline-flex',
  'w-fit',
  'max-w-full',
  'min-w-0',
  'overflow-x-auto',
  'overflow-y-hidden',
].join(' ');

export const tabListVariants: Record<TabsVariant, string> = {
  underline: 'gap-6 border-b border-[var(--frasto-border)]',
  segmented: 'gap-0 border border-[var(--frasto-border)] bg-[var(--frasto-surface-subtle)] p-1',
};

export const tabIndicator = [
  'pointer-events-none',
  'absolute',
  'inset-y-1',
  'left-0',
  'z-0',
  'bg-[var(--frasto-control-selected-bg)]',
  'shadow-none',
].join(' ');

export const tabBase = [
  'relative',
  'inline-flex',
  'h-[var(--frasto-control-height)]',
  'shrink-0',
  'items-center',
  'justify-center',
  'border-0',
  'bg-transparent',
  'px-0',
  'py-0',
  'text-sm',
  'font-medium',
  'text-[var(--frasto-control-fg-muted)]',
  'shadow-none',
  'transition-colors',
  'duration-[var(--frasto-duration-fast)]',
  'ease-[var(--frasto-ease-standard)]',
  'hover:text-[var(--frasto-control-fg)]',
  'focus-visible:outline',
  'focus-visible:outline-2',
  'focus-visible:outline-offset-2',
  'focus-visible:outline-[var(--frasto-focus)]',
  'disabled:cursor-not-allowed',
  'disabled:opacity-40',
].join(' ');

export const tabPanelBase = 'min-w-0 pt-4';
