export type TableDensity = 'compact' | 'default';
export type TableLayout = 'auto' | 'fixed';

export const tableContainer = [
  'min-w-0',
  'overflow-x-auto',
  'overscroll-x-contain',
  'border-y',
  'border-[var(--frasto-border)]',
].join(' ');

export const tableBase = [
  'w-full',
  'border-collapse',
  'text-left',
  'text-sm',
  'leading-5',
  'text-[var(--frasto-ink)]',
].join(' ');

export const tableLayouts: Record<TableLayout, string> = {
  auto: 'table-auto',
  fixed: 'table-fixed',
};

export const tableCaption = [
  'pb-3',
  'text-left',
  'text-sm',
  'font-semibold',
  'text-[var(--frasto-ink)]',
].join(' ');
