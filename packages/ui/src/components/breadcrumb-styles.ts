export const breadcrumbRoot = 'block min-w-0 text-sm';

export const breadcrumbList = [
  'm-0',
  'flex',
  'min-w-0',
  'list-none',
  'items-center',
  'overflow-x-auto',
  'overscroll-x-contain',
  'p-0',
  'whitespace-nowrap',
].join(' ');

export const breadcrumbItem = [
  'inline-flex',
  'min-w-0',
  'shrink-0',
  'items-center',
  'gap-2',
].join(' ');

export const breadcrumbSeparator = [
  'inline-flex',
  'shrink-0',
  'items-center',
  'text-[var(--frasto-ink-soft)]',
].join(' ');

export const breadcrumbLink = [
  'text-[var(--frasto-ink-muted)]',
  'no-underline',
  'transition-colors',
  'duration-[var(--frasto-duration-fast)]',
  'ease-[var(--frasto-ease-standard)]',
  'hover:text-[var(--frasto-ink)]',
  'hover:underline',
  'hover:underline-offset-4',
  'active:text-[var(--frasto-ink)]',
].join(' ');

export const breadcrumbText = 'text-[var(--frasto-ink-muted)]';
export const breadcrumbCurrent = 'font-medium text-[var(--frasto-ink)]';

