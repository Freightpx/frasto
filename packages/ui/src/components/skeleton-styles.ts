export type SkeletonAnimation = 'none' | 'pulse';
export type SkeletonVariant = 'text' | 'control' | 'block';

export const skeletonBase = [
  'block',
  'w-full',
  'bg-[var(--frasto-surface-subtle)]',
  'shadow-none',
].join(' ');

export const skeletonVariants: Record<SkeletonVariant, string> = {
  text: 'h-4',
  control: 'h-[var(--frasto-control-height)]',
  block: 'min-h-24',
};
