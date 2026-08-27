export type DialogSize = 'sm' | 'md' | 'lg';

export const dialogRoot = 'contents';
export const dialogElement = [
  'm-auto',
  'max-h-[calc(100dvh-32px)]',
  'max-w-[calc(100vw-32px)]',
  'overflow-visible',
  'border-0',
  'bg-transparent',
  'p-0',
  'text-[var(--frasto-ink)]',
].join(' ');

export const dialogPanel = [
  'flex',
  'max-h-[calc(100dvh-32px)]',
  'flex-col',
  'border',
  'border-[var(--frasto-border-strong)]',
  'bg-[var(--frasto-surface)]',
].join(' ');

export const dialogSizes: Record<DialogSize, string> = {
  sm: 'w-[min(24rem,calc(100vw-32px))]',
  md: 'w-[min(32rem,calc(100vw-32px))]',
  lg: 'w-[min(44rem,calc(100vw-32px))]',
};
