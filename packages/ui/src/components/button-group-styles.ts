export type ButtonGroupOrientation = 'horizontal' | 'vertical';

export const buttonGroupRoot = 'inline-flex min-w-0 items-stretch';
export const buttonGroupOrientations: Record<ButtonGroupOrientation, string> = {
  horizontal: 'flex-row',
  vertical: 'flex-col',
};
export const buttonGroupText = [
  'inline-flex',
  'min-h-9',
  'min-w-0',
  'items-center',
  'border',
  'border-[var(--frasto-border-strong)]',
  'bg-[var(--frasto-surface-subtle)]',
  'px-3',
  'text-sm',
  'text-[var(--frasto-ink-muted)]',
].join(' ');
export const buttonGroupSeparator = 'block shrink-0 bg-[var(--frasto-border-strong)]';
