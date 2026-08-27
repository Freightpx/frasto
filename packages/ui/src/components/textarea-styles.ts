import type { InputSize } from './input-styles';

export type TextareaResize = 'none' | 'vertical' | 'horizontal' | 'both';

export const textareaBase = [
  'block',
  'border',
  'border-[var(--frasto-border-strong)]',
  'bg-[var(--frasto-surface)]',
  'text-[var(--frasto-ink)]',
  'shadow-none',
  'outline-none',
  'transition-colors',
  'duration-[var(--frasto-duration-fast)]',
  'ease-[var(--frasto-ease-standard)]',
  'placeholder:text-[var(--frasto-ink-soft)]',
  'focus-visible:border-[var(--frasto-ink)]',
  'focus-visible:outline',
  'focus-visible:outline-2',
  'focus-visible:outline-offset-2',
  'focus-visible:outline-[var(--frasto-focus)]',
  'disabled:cursor-not-allowed',
  'disabled:opacity-40',
].join(' ');

export const textareaSizes: Record<InputSize, string> = {
  sm: 'min-h-20 px-2.5 py-2 text-xs leading-5',
  md: 'min-h-24 px-3 py-2.5 text-sm leading-5',
  lg: 'min-h-28 px-3 py-3 text-sm leading-6',
};

export const textareaResize: Record<TextareaResize, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};
