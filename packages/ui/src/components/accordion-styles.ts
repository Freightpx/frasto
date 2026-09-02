export type AccordionType = 'single' | 'multiple';

export const accordionRoot = 'block min-w-0 border-t border-[var(--frasto-border)]';
export const accordionItem = 'block min-w-0 border-b border-[var(--frasto-border)]';
export const accordionTrigger = [
  'flex',
  'min-h-9',
  'w-full',
  'items-center',
  'justify-between',
  'gap-4',
  'border-0',
  'bg-transparent',
  'px-0',
  'py-3',
  'text-left',
  'font-inherit',
  'text-sm',
  'font-medium',
  'leading-5',
  'text-[var(--frasto-control-fg)]',
  'transition-colors',
  'duration-[var(--frasto-duration-fast)]',
  'ease-[var(--frasto-ease-standard)]',
  'hover:text-[var(--frasto-control-fg-muted)]',
  'disabled:cursor-not-allowed',
  'disabled:opacity-40',
].join(' ');
export const accordionIndicator = [
  'inline-flex',
  'size-5',
  'shrink-0',
  'items-center',
  'justify-center',
  'text-lg',
  'font-light',
  'leading-none',
].join(' ');
export const accordionContent = 'grid min-w-0 text-sm leading-6 text-[var(--frasto-control-fg-muted)]';
export const accordionContentInner = 'min-h-0 overflow-clip';
export const accordionContentBody = 'pb-4';
