export type SelectSize = 'sm' | 'md' | 'lg';

export const selectRootBase = [
  'relative',
  'inline-flex',
  'items-center',
  'border',
  'border-[var(--frasto-control-border)]',
  'bg-[var(--frasto-control-bg)]',
  'text-[var(--frasto-control-fg)]',
  'shadow-none',
  'transition-colors',
  'duration-[var(--frasto-duration-fast)]',
  'ease-[var(--frasto-ease-standard)]',
  'focus-within:border-[var(--frasto-focus)]',
].join(' ');

export const selectRootSizes: Record<SelectSize, string> = {
  sm: 'h-8 text-xs',
  md: 'h-[var(--frasto-control-height)] text-sm',
  lg: 'h-10 text-sm',
};

export const selectPaddings: Record<SelectSize, string> = {
  sm: 'pl-2.5 pr-8',
  md: 'pl-3 pr-9',
  lg: 'pl-3 pr-10',
};

export const selectIconSizes: Record<SelectSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
};
