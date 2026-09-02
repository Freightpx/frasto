import type { HTMLAttributes } from 'astro/types';

export type ToastTone = 'neutral' | 'info' | 'positive' | 'warning' | 'danger';
export type ToastPriority = 'polite' | 'assertive';
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';

export type ToastAction = {
  dismissOnSelect?: boolean;
  label: string;
  onSelect: () => void;
};

export type ToastOptions = {
  action?: ToastAction;
  description?: string;
  dismissLabel?: string;
  duration?: number;
  id?: string;
  priority?: ToastPriority;
  title: string;
  tone?: ToastTone;
};

export type ToastHandle = {
  dismiss: () => void;
  id: string;
};

export type ToastRegionProps = Omit<HTMLAttributes<'div'>, 'class' | 'role'> & {
  class?: string;
  dismissLabel?: string;
  label?: string;
  position?: ToastPosition;
};

export type ToastDismissReason =
  | 'action'
  | 'dismiss'
  | 'dismiss-all'
  | 'programmatic'
  | 'replaced'
  | 'timeout';

export type ToastRequest = {
  action?: ToastAction;
  description?: string;
  dismissLabel?: string;
  duration: number;
  id: string;
  priority: ToastPriority;
  title: string;
  tone: ToastTone;
};

export type ToastRegionController = {
  dismiss: (id: string, reason: ToastDismissReason) => void;
  dismissAll: (reason: ToastDismissReason) => void;
  show: (request: ToastRequest) => void;
};

let activeRegion: ToastRegionController | null = null;
let pendingRequests: ToastRequest[] = [];
let toastSequence = 0;

function createToastId() {
  toastSequence += 1;
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return 'frasto-toast-' + crypto.randomUUID();
  }
  return 'frasto-toast-' + Date.now().toString(36) + '-' + toastSequence.toString(36);
}

function normalizeToast(options: ToastOptions): ToastRequest {
  return {
    action: options.action,
    description: options.description,
    dismissLabel: options.dismissLabel,
    duration: Math.max(0, options.duration ?? 5000),
    id: options.id || createToastId(),
    priority: options.priority ?? 'polite',
    title: options.title,
    tone: options.tone ?? 'neutral',
  };
}

function assertBrowser() {
  if (typeof document === 'undefined') {
    throw new Error('toast() is a browser interaction API and cannot run during Astro server rendering.');
  }
}

export function toast(options: ToastOptions): ToastHandle {
  assertBrowser();
  const request = normalizeToast(options);
  if (activeRegion) activeRegion.show(request);
  else pendingRequests.push(request);
  return {
    id: request.id,
    dismiss: () => dismissToast(request.id),
  };
}

export function dismissToast(id: string) {
  if (typeof document === 'undefined') return;
  pendingRequests = pendingRequests.filter((request) => request.id !== id);
  activeRegion?.dismiss(id, 'programmatic');
}

export function dismissAllToasts() {
  if (typeof document === 'undefined') return;
  pendingRequests = [];
  activeRegion?.dismissAll('dismiss-all');
}

export function connectToastRegion(controller: ToastRegionController) {
  if (activeRegion && activeRegion !== controller) return false;
  activeRegion = controller;
  const requests = pendingRequests;
  pendingRequests = [];
  requests.forEach((request) => controller.show(request));
  return true;
}

export function disconnectToastRegion(controller: ToastRegionController) {
  if (activeRegion === controller) activeRegion = null;
}
