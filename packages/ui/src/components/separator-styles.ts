export type SeparatorOrientation = 'horizontal' | 'vertical';
export type SeparatorTone = 'default' | 'strong';

export const separatorBase = [
  'm-0',
  'shrink-0',
  'border-0',
  'shadow-none',
].join(' ');

export const separatorOrientations: Record<SeparatorOrientation, string> = {
  horizontal: 'h-px w-full',
  vertical: 'h-auto min-h-full w-px self-stretch',
};

export const separatorTones: Record<SeparatorTone, string> = {
  default: 'bg-[var(--frasto-border)]',
  strong: 'bg-[var(--frasto-border-strong)]',
};
