export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'orbit' | 'breathe' | 'cascade' | 'counter' | 'typewriter' | 'refresh';

export const spinnerBase = [
  'relative',
  'inline-grid',
  'shrink-0',
  'align-middle',
  'border-0',
  'p-0',
].join(' ');

export const spinnerSizes: Record<SpinnerSize, string> = {
  sm: 'size-3',
  md: 'size-4',
  lg: 'size-5',
};
