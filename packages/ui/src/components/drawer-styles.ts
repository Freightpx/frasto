export type DrawerSide = 'left' | 'right';
export type DrawerSize = 'sm' | 'md' | 'lg';

export const drawerRoot = 'contents';
export const drawerElement = [
  'fixed',
  'inset-0',
  'm-0',
  'h-[100dvh]',
  'max-h-none',
  'w-screen',
  'max-w-none',
  'overflow-hidden',
  'border-0',
  'bg-transparent',
  'p-0',
  'text-[var(--frasto-ink)]',
].join(' ');

export const drawerPanel = [
  'flex',
  'h-full',
  'max-w-[calc(100vw-24px)]',
  'flex-col',
  'border-[var(--frasto-border-strong)]',
  'bg-[var(--frasto-surface)]',
].join(' ');

export const drawerSides: Record<DrawerSide, string> = {
  left: 'mr-auto border-r',
  right: 'ml-auto border-l',
};

export const drawerSizes: Record<DrawerSize, string> = {
  sm: 'w-96',
  md: 'w-[32rem]',
  lg: 'w-[40rem]',
};
