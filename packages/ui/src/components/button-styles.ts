export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonTone = 'neutral' | 'danger';
export type ButtonVariant = 'solid' | 'outline' | 'ghost';

export const buttonBase = [
  'relative',
  'isolate',
  'inline-flex',
  'select-none',
  'items-center',
  'justify-center',
  'whitespace-nowrap',
  'border',
  'font-medium',
  'leading-none',
  'no-underline',
  'shadow-none',
  'transition-colors',
  'duration-[var(--frasto-duration-fast)]',
  'ease-[var(--frasto-ease-standard)]',
  'focus-visible:outline',
  'focus-visible:outline-2',
  'focus-visible:outline-offset-2',
  'focus-visible:outline-[var(--frasto-focus)]',
  'disabled:cursor-not-allowed',
  'disabled:opacity-40',
  'aria-disabled:cursor-not-allowed',
  'aria-disabled:opacity-40',
  'aria-busy:cursor-progress',
].join(' ');

export const buttonSizes: Record<ButtonSize, string> = {
  sm: 'h-8 gap-1.5 px-3 text-xs',
  md: 'h-[var(--frasto-control-height)] gap-2 px-4 text-sm',
  lg: 'h-10 gap-2 px-5 text-sm',
};

export const iconButtonSizes: Record<ButtonSize, string> = {
  sm: 'size-8 text-xs',
  md: 'size-[var(--frasto-control-height)] text-sm',
  lg: 'size-10 text-sm',
};

export const iconSizes: Record<ButtonSize, number> = {
  sm: 14,
  md: 16,
  lg: 18,
};

export const buttonTreatments: Record<ButtonTone, Record<ButtonVariant, string>> = {
  neutral: {
    solid:
      'border-[var(--frasto-control-selected-bg)] bg-[var(--frasto-control-selected-bg)] text-[color:var(--frasto-control-selected-fg)] hover:border-[var(--frasto-control-fg-muted)] hover:bg-[var(--frasto-control-fg-muted)]',
    outline:
      'border-[var(--frasto-control-border)] bg-transparent text-[color:var(--frasto-control-fg)] hover:border-[var(--frasto-control-hover-border)] hover:bg-[var(--frasto-control-hover-bg)]',
    ghost:
      'border-transparent bg-transparent text-[color:var(--frasto-control-fg)] hover:bg-[var(--frasto-control-hover-bg)]',
  },
  danger: {
    solid:
      'border-[var(--frasto-danger)] bg-[var(--frasto-danger)] text-[color:var(--frasto-bg)] hover:brightness-90',
    outline:
      'border-[var(--frasto-danger)] bg-transparent text-[color:var(--frasto-danger)] hover:bg-[var(--frasto-control-hover-bg)]',
    ghost:
      'border-transparent bg-transparent text-[color:var(--frasto-danger)] hover:bg-[var(--frasto-control-hover-bg)]',
  },
};
