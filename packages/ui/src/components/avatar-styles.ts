export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg';

export const avatarBase = [
  'relative',
  'inline-flex',
  'shrink-0',
  'items-center',
  'justify-center',
  'overflow-hidden',
  'border',
  'border-[var(--frasto-border-strong)]',
  'bg-[var(--frasto-surface-subtle)]',
  'text-[var(--frasto-ink)]',
  'font-medium',
  'uppercase',
  'leading-none',
  'shadow-none',
].join(' ');

export const avatarSizes: Record<AvatarSize, string> = {
  xs: 'size-6 text-[9px]',
  sm: 'size-8 text-[10px]',
  md: 'size-10 text-xs',
  lg: 'size-12 text-sm',
};
