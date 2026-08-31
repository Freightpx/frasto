export type PaginationItemKind = 'page' | 'previous' | 'next' | 'gap';

export const paginationRoot = [
  'flex',
  'min-w-0',
  'flex-wrap',
  'items-center',
  'justify-between',
  'gap-3',
].join(' ');

export const paginationSummary = [
  'min-w-0',
  'text-sm',
  'leading-5',
  'text-[var(--frasto-ink-muted)]',
].join(' ');

export const paginationList = [
  'm-0',
  'flex',
  'min-w-0',
  'list-none',
  'items-center',
  'gap-1',
  'p-0',
].join(' ');

export const paginationItem = 'inline-flex shrink-0 items-center';

export const paginationControl = [
  'inline-flex',
  'h-9',
  'min-w-9',
  'items-center',
  'justify-center',
  'border',
  'border-[var(--frasto-border)]',
  'bg-[var(--frasto-surface)]',
  'px-3',
  'text-sm',
  'font-medium',
  'text-[var(--frasto-ink)]',
  'no-underline',
].join(' ');

export const paginationLink = [
  paginationControl,
  'transition-colors',
  'duration-[var(--frasto-duration-fast)]',
  'ease-[var(--frasto-ease-standard)]',
  'hover:border-[var(--frasto-ink)]',
  'hover:bg-[var(--frasto-surface-subtle)]',
  'active:bg-[var(--frasto-border)]',
].join(' ');

export const paginationCurrent = [
  paginationControl,
  'border-[var(--frasto-ink)]',
  'bg-[var(--frasto-ink)]',
  'text-[var(--frasto-bg)]',
].join(' ');

export const paginationDisabled = [
  paginationControl,
  'cursor-not-allowed',
  'text-[var(--frasto-ink-soft)]',
  'opacity-60',
].join(' ');

export const paginationGap = [
  'inline-flex',
  'h-9',
  'min-w-9',
  'items-center',
  'justify-center',
  'px-2',
  'text-sm',
  'text-[var(--frasto-ink-muted)]',
].join(' ');
