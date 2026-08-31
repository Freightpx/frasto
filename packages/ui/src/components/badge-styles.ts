export type BadgeSize = 'sm' | 'md';
export type BadgeTone = 'neutral' | 'positive' | 'warning' | 'danger' | 'info';
export type BadgeVariant = 'subtle' | 'outline' | 'solid';

export const badgeBase = [
  'frasto-badge',
  'inline-flex',
  'w-fit',
  'max-w-full',
  'min-w-0',
  'shrink',
  'items-center',
  'justify-center',
  'break-words',
  'text-center',
  'whitespace-normal',
  'border',
  'font-medium',
  'leading-none',
  'shadow-none',
].join(' ');

export const badgeSizes: Record<BadgeSize, string> = {
  sm: 'min-h-5 gap-1 px-1.5 py-1 text-[11px]',
  md: 'min-h-6 gap-1.5 px-2 py-1 text-xs',
};
