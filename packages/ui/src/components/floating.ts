export type FloatingPlacement = 'top' | 'bottom' | 'bottom-start' | 'bottom-end';

const VIEWPORT_GAP = 8;

export function positionFloating(
  trigger: HTMLElement,
  floating: HTMLElement,
  placement: FloatingPlacement,
  gap = 8,
) {
  const triggerRect = trigger.getBoundingClientRect();
  const floatingRect = floating.getBoundingClientRect();
  let resolvedPlacement = placement;

  if (placement.startsWith('bottom') && triggerRect.bottom + gap + floatingRect.height > window.innerHeight - VIEWPORT_GAP) {
    resolvedPlacement = 'top';
  } else if (placement === 'top' && triggerRect.top - gap - floatingRect.height < VIEWPORT_GAP) {
    resolvedPlacement = 'bottom';
  }

  let top = resolvedPlacement === 'top'
    ? triggerRect.top - floatingRect.height - gap
    : triggerRect.bottom + gap;
  let left = triggerRect.left + (triggerRect.width - floatingRect.width) / 2;

  if (resolvedPlacement === 'bottom-start') left = triggerRect.left;
  if (resolvedPlacement === 'bottom-end') left = triggerRect.right - floatingRect.width;

  top = Math.max(VIEWPORT_GAP, Math.min(top, window.innerHeight - floatingRect.height - VIEWPORT_GAP));
  left = Math.max(VIEWPORT_GAP, Math.min(left, window.innerWidth - floatingRect.width - VIEWPORT_GAP));

  floating.style.top = `${Math.round(top)}px`;
  floating.style.left = `${Math.round(left)}px`;
  floating.dataset.resolvedPlacement = resolvedPlacement;
}
