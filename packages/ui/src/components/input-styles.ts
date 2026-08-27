export type InputSize = 'sm' | 'md' | 'lg';

export const inputRootBase = [
  'relative',
  'inline-flex',
  'items-center',
  'border',
  'border-[var(--frasto-border-strong)]',
  'bg-[var(--frasto-surface)]',
  'text-[var(--frasto-ink)]',
  'shadow-none',
  'transition-colors',
  'duration-[var(--frasto-duration-fast)]',
  'ease-[var(--frasto-ease-standard)]',
  'focus-within:border-[var(--frasto-ink)]',
  'focus-within:outline',
  'focus-within:outline-2',
  'focus-within:outline-offset-2',
  'focus-within:outline-[var(--frasto-focus)]',
].join(' ');

export const inputRootSizes: Record<InputSize, string> = {
  sm: 'h-8 text-xs',
  md: 'h-[var(--frasto-control-height)] text-sm',
  lg: 'h-10 text-sm',
};

export const inputStartIconPadding: Record<InputSize, string> = {
  sm: 'pl-2.5',
  md: 'pl-3',
  lg: 'pl-3',
};

export const inputEndIconPadding: Record<InputSize, string> = {
  sm: 'pr-2.5',
  md: 'pr-3',
  lg: 'pr-3',
};

export const inputStartPadding: Record<InputSize, { default: string; withIcon: string }> = {
  sm: { default: 'pl-2.5', withIcon: 'pl-2' },
  md: { default: 'pl-3', withIcon: 'pl-2' },
  lg: { default: 'pl-3', withIcon: 'pl-2' },
};

export const inputEndPadding: Record<InputSize, { default: string; withIcon: string }> = {
  sm: { default: 'pr-2.5', withIcon: 'pr-2' },
  md: { default: 'pr-3', withIcon: 'pr-2' },
  lg: { default: 'pr-3', withIcon: 'pr-2' },
};
