export type SurfaceElement = 'article' | 'aside' | 'div' | 'section';
export type SurfacePadding = 'none' | 'sm' | 'md' | 'lg';
export type SurfaceVariant = 'plain' | 'subtle' | 'outlined';

export const surfaceBase = [
  'block',
  'min-w-0',
  'shadow-none',
].join(' ');

export const surfaceVariants: Record<SurfaceVariant, string> = {
  plain: 'border-0 bg-[var(--frasto-surface)]',
  subtle: 'border-0 bg-[var(--frasto-surface-subtle)]',
  outlined: 'border border-[var(--frasto-border)] bg-[var(--frasto-surface)]',
};

export const surfacePaddings: Record<SurfacePadding, string> = {
  none: 'p-0',
  sm: 'p-[var(--frasto-space-3)]',
  md: 'p-[var(--frasto-space-4)]',
  lg: 'p-[var(--frasto-space-5)]',
};
