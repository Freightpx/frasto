import type { InputSize } from './input-styles';

export const searchInputRoot = 'inline-grid min-w-0 gap-2';

export const searchInputLabel = [
  'text-sm',
  'font-medium',
  'leading-5',
  'text-[var(--frasto-ink)]',
].join(' ');

export const searchInputControl = 'relative min-w-0';

export const searchInputEndControls = [
  'pointer-events-none',
  'absolute',
  'inset-y-0',
  'right-1',
  'flex',
  'items-center',
  'gap-1',
  'text-[var(--frasto-ink-muted)]',
].join(' ');

export const searchInputClear = 'pointer-events-auto';

export const searchInputPadding: Record<InputSize, { one: string; two: string }> = {
  sm: { one: '!pr-10', two: '!pr-14' },
  md: { one: '!pr-11', two: '!pr-16' },
  lg: { one: '!pr-12', two: '!pr-16' },
};
