import type { FloatingPlacement } from './floating';

export type PopoverPlacement = FloatingPlacement;

export const popoverRoot = 'relative inline-flex';
export const popoverPanel = [
  'fixed',
  'z-50',
  'w-72',
  'max-w-[calc(100vw-16px)]',
  'border',
  'border-[var(--frasto-border-strong)]',
  'bg-[var(--frasto-surface)]',
  'p-4',
  'text-sm',
  'text-[var(--frasto-ink)]',
].join(' ');
