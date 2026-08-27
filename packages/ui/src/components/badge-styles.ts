export type BadgeSize = 'sm' | 'md';
export type BadgeTone = 'neutral' | 'positive' | 'warning' | 'danger' | 'info';
export type BadgeVariant = 'subtle' | 'outline' | 'solid';

export const badgeBase = [
  'frasto-badge',
  'inline-flex',
  'w-fit',
  'shrink-0',
  'items-center',
  'justify-center',
  'whitespace-nowrap',
  'border',
  'font-medium',
  'leading-none',
  'shadow-none',
].join(' ');

export const badgeSizes: Record<BadgeSize, string> = {
  sm: 'h-5 gap-1 px-1.5 text-[11px]',
  md: 'h-6 gap-1.5 px-2 text-xs',
};
