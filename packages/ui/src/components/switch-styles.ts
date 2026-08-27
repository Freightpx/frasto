export type SwitchSize = 'sm' | 'md';

export const switchRootBase = [
  'inline-flex',
  'w-fit',
  'select-none',
  'items-start',
  'gap-2',
  'text-[var(--frasto-ink)]',
].join(' ');

export const switchSizes: Record<SwitchSize, { label: string; track: string; thumb: string }> = {
  sm: {
    label: 'text-xs leading-4',
    track: 'h-4 w-7 p-0.5',
    thumb: 'size-2.5',
  },
  md: {
    label: 'text-sm leading-5',
    track: 'h-5 w-9 p-[3px]',
    thumb: 'size-3',
  },
};
