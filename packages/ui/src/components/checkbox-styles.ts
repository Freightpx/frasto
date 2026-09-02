export type CheckboxSize = 'sm' | 'md';

export const checkboxRootBase = [
  'inline-flex',
  'w-fit',
  'select-none',
  'items-start',
  'gap-2',
  'text-[var(--frasto-ink)]',
].join(' ');

export const checkboxInputBase = [
  'peer',
  'col-start-1',
  'row-start-1',
  'm-0',
  'shrink-0',
  'appearance-none',
  'border',
  'border-[var(--frasto-control-border)]',
  'bg-[var(--frasto-control-bg)]',
  'shadow-none',
  'transition-colors',
  'duration-[var(--frasto-duration-fast)]',
  'ease-[var(--frasto-ease-standard)]',
  'hover:border-[var(--frasto-control-hover-border)]',
  'checked:border-[var(--frasto-control-selected-bg)]',
  'checked:bg-[var(--frasto-control-selected-bg)]',
  'focus-visible:outline',
  'focus-visible:outline-2',
  'focus-visible:outline-offset-2',
  'focus-visible:outline-[var(--frasto-focus)]',
  'disabled:bg-[var(--frasto-control-disabled-bg)]',
  'disabled:cursor-not-allowed',
].join(' ');

export const checkboxSizes: Record<CheckboxSize, { box: string; icon: number; label: string }> = {
  sm: { box: 'size-4', icon: 12, label: 'text-xs leading-4' },
  md: { box: 'size-[18px]', icon: 14, label: 'text-sm leading-[18px]' },
};
