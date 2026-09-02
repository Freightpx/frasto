import type { HTMLAttributes } from 'astro/types';

export type Theme = 'light' | 'dark';
export type ThemeSwitchVariant =
  | 'segmented'
  | 'segmented-icons'
  | 'animated-icon'
  | 'animated-icon-label';

export type ThemeSwitchProps = Omit<HTMLAttributes<'div'>, 'class' | 'role'> & {
  class?: string;
  darkLabel?: string;
  defaultTheme?: Theme;
  label?: string;
  lightLabel?: string;
  storageKey?: string;
  variant?: ThemeSwitchVariant;
};

export const themeSwitchRoot = 'inline-flex min-w-0';

export const themeSwitchGroup = [
  'relative',
  'inline-grid',
  'min-w-0',
  'grid-cols-2',
  'gap-0',
  'border',
  'border-[var(--frasto-border)]',
  'bg-[var(--frasto-surface-subtle)]',
  'p-1',
  'shadow-none',
].join(' ');

export const themeSwitchIndicator = [
  'pointer-events-none',
  'absolute',
  'inset-y-1',
  'left-1',
  'z-0',
  'bg-[var(--frasto-control-selected-bg)]',
  'shadow-none',
].join(' ');

export const themeSwitchButton = [
  'relative',
  'z-10',
  'm-0',
  'inline-flex',
  'h-[var(--frasto-control-height)]',
  'min-w-0',
  'items-center',
  'justify-center',
  'gap-1.5',
  'border-0',
  'bg-transparent',
  'px-3',
  'py-0',
  'text-sm',
  'font-medium',
  'text-[var(--frasto-control-fg-muted)]',
  'shadow-none',
  'transition-colors',
  'duration-[var(--frasto-duration-fast)]',
  'ease-[var(--frasto-ease-standard)]',
  'hover:text-[var(--frasto-control-fg)]',
  'focus-visible:outline',
  'focus-visible:outline-2',
  'focus-visible:outline-offset-2',
  'focus-visible:outline-[var(--frasto-focus)]',
].join(' ');

export const themeSwitchIconButton = 'w-[var(--frasto-control-height)] px-0';

export const themeSwitchToggle = [
  'm-0',
  'inline-flex',
  'h-[var(--frasto-control-height)]',
  'min-w-0',
  'items-center',
  'justify-center',
  'gap-2',
  'border',
  'border-[var(--frasto-border)]',
  'bg-[var(--frasto-surface-subtle)]',
  'py-0',
  'text-sm',
  'font-medium',
  'text-[var(--frasto-control-fg)]',
  'shadow-none',
  'hover:border-[var(--frasto-control-border-hover)]',
  'focus-visible:outline',
  'focus-visible:outline-2',
  'focus-visible:outline-offset-2',
  'focus-visible:outline-[var(--frasto-focus)]',
].join(' ');

export const themeSwitchToggleIconOnly = 'w-[var(--frasto-control-height)] px-0';
export const themeSwitchToggleWithLabel = 'px-3';
export const themeSwitchAnimatedIcon = 'relative inline-grid size-4 shrink-0 place-items-center';
export const themeSwitchAnimatedLabel = 'relative inline-grid min-w-0';
