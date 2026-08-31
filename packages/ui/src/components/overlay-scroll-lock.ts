let lockCount = 0;
let previousOverflow = '';

export function lockDocumentScroll() {
  const root = document.documentElement;
  if (lockCount === 0) {
    previousOverflow = root.style.overflow;
    root.style.overflow = 'hidden';
  }
  lockCount += 1;
}

export function unlockDocumentScroll() {
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount === 0) {
    document.documentElement.style.overflow = previousOverflow;
    previousOverflow = '';
  }
}
