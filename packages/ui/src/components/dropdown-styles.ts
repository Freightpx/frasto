import type { FloatingPlacement } from './floating';

export type DropdownPlacement = Extract<FloatingPlacement, 'bottom-start' | 'bottom-end'>;

export const dropdownRoot = 'relative inline-flex';
export const dropdownPanel = [
  'fixed',
  'z-50',
  'min-w-48',
  'border',
  'border-[var(--frasto-border-strong)]',
  'bg-[var(--frasto-surface)]',
  'p-1',
  'text-sm',
  'text-[var(--frasto-ink)]',
].join(' ');

export const dropdownItemBase = [
  'flex',
  'w-full',
  'items-center',
  'gap-2',
  'border-0',
  'bg-transparent',
  'px-3',
  'py-2',
  'text-left',
  'text-sm',
  'text-inherit',
  'no-underline',
  'hover:bg-[var(--frasto-surface-subtle)]',
  'focus-visible:bg-[var(--frasto-surface-subtle)]',
  'focus-visible:outline',
  'focus-visible:outline-2',
  'focus-visible:outline-[var(--frasto-focus)]',
  'disabled:cursor-not-allowed',
  'disabled:opacity-40',
  'aria-disabled:cursor-not-allowed',
  'aria-disabled:opacity-40',
].join(' ');
