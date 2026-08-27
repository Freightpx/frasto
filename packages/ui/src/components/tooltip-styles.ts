import type { FloatingPlacement } from './floating';

export type TooltipPlacement = Extract<FloatingPlacement, 'top' | 'bottom'>;

export const tooltipRoot = 'relative inline-flex';
export const tooltipContent = [
  'fixed',
  'z-50',
  'max-w-72',
  'border',
  'border-[var(--frasto-border-strong)]',
  'bg-[var(--frasto-ink)]',
  'px-2.5',
  'py-2',
  'text-xs',
  'leading-4',
  'text-[var(--frasto-bg)]',
  'shadow-none',
].join(' ');
