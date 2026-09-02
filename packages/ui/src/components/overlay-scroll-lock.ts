let lockCount = 0;
let previousOverflow = '';
let previousPaddingInlineEnd = '';
let appliedPaddingCompensation = false;

export function lockDocumentScroll() {
  const root = document.documentElement;
  if (lockCount === 0) {
    const computed = getComputedStyle(root);
    const scrollbarWidth = Math.max(0, window.innerWidth - root.clientWidth);
    const reservesStableGutter = computed.scrollbarGutter
      .split(/\s+/)
      .includes('stable');

    previousOverflow = root.style.overflow;
    previousPaddingInlineEnd = root.style.paddingInlineEnd;
    appliedPaddingCompensation = scrollbarWidth > 0 && !reservesStableGutter;

    if (appliedPaddingCompensation) {
      const authoredPadding = Number.parseFloat(computed.paddingInlineEnd) || 0;
      root.style.paddingInlineEnd = String(authoredPadding + scrollbarWidth) + 'px';
    }

    root.style.overflow = 'hidden';
  }
  lockCount += 1;
}

export function unlockDocumentScroll() {
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount === 0) {
    const root = document.documentElement;
    root.style.overflow = previousOverflow;
    if (appliedPaddingCompensation) {
      root.style.paddingInlineEnd = previousPaddingInlineEnd;
    }
    previousOverflow = '';
    previousPaddingInlineEnd = '';
    appliedPaddingCompensation = false;
  }
}
