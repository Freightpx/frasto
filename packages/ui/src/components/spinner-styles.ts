export type SpinnerSize = 'sm' | 'md' | 'lg';

export const spinnerBase = [
  'inline-block',
  'shrink-0',
  'border-[1.25px]',
  'border-current',
  'align-middle',
].join(' ');

export const spinnerSizes: Record<SpinnerSize, string> = {
  sm: 'size-3',
  md: 'size-4',
  lg: 'size-5',
};
