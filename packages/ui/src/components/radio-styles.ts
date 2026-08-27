export type RadioSize = 'sm' | 'md';

export const radioRootBase = [
  'inline-flex',
  'w-fit',
  'select-none',
  'items-start',
  'gap-2',
  'text-[var(--frasto-ink)]',
].join(' ');

export const radioInputBase = [
  'peer',
  'm-0',
  'shrink-0',
  'appearance-none',
  'border',
  'border-[var(--frasto-border-strong)]',
  'bg-[var(--frasto-surface)]',
  'shadow-none',
  'transition-colors',
  'duration-[var(--frasto-duration-fast)]',
  'ease-[var(--frasto-ease-standard)]',
  'hover:border-[var(--frasto-ink)]',
  'checked:border-[var(--frasto-ink)]',
  'focus-visible:outline',
  'focus-visible:outline-2',
  'focus-visible:outline-offset-2',
  'focus-visible:outline-[var(--frasto-focus)]',
  'disabled:cursor-not-allowed',
].join(' ');

export const radioSizes: Record<RadioSize, { box: string; indicator: string; label: string }> = {
  sm: { box: 'size-4', indicator: 'size-1.5', label: 'text-xs leading-4' },
  md: { box: 'size-[18px]', indicator: 'size-2', label: 'text-sm leading-[18px]' },
};
