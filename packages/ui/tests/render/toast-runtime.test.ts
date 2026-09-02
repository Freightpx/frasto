import { afterEach, describe, expect, test, vi } from 'vitest';
import type {
  ToastRegionController,
  ToastRequest,
} from '../../src/components/toast';

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

async function loadBrowserRuntime() {
  vi.resetModules();
  vi.stubGlobal('document', {});
  return import('../../src/components/toast');
}

describe('Toast browser runtime', () => {
  test('queues normalized requests before the single region connects', async () => {
    const runtime = await loadBrowserRuntime();
    const shown: ToastRequest[] = [];
    const controller: ToastRegionController = {
      dismiss: vi.fn(),
      dismissAll: vi.fn(),
      show: (request) => shown.push(request),
    };

    const handle = runtime.toast({ title: 'Queued notification' });
    expect(shown).toHaveLength(0);
    expect(runtime.connectToastRegion(controller)).toBe(true);
    expect(shown).toHaveLength(1);
    expect(shown[0]).toMatchObject({
      id: handle.id,
      title: 'Queued notification',
      tone: 'neutral',
      priority: 'polite',
      duration: 5000,
    });

    handle.dismiss();
    expect(controller.dismiss).toHaveBeenCalledWith(handle.id, 'programmatic');
  });

  test('removes queued requests and supports one active region', async () => {
    const runtime = await loadBrowserRuntime();
    const first: ToastRegionController = {
      dismiss: vi.fn(),
      dismissAll: vi.fn(),
      show: vi.fn(),
    };
    const second: ToastRegionController = {
      dismiss: vi.fn(),
      dismissAll: vi.fn(),
      show: vi.fn(),
    };

    const handle = runtime.toast({ id: 'queued', title: 'Queued', duration: 0 });
    runtime.dismissToast(handle.id);
    expect(runtime.connectToastRegion(first)).toBe(true);
    expect(first.show).not.toHaveBeenCalled();
    expect(runtime.connectToastRegion(second)).toBe(false);

    runtime.dismissAllToasts();
    expect(first.dismissAll).toHaveBeenCalledWith('dismiss-all');
    runtime.disconnectToastRegion(first);
    expect(runtime.connectToastRegion(second)).toBe(true);
  });

  test('rejects invocation during Astro server rendering', async () => {
    const runtime = await loadBrowserRuntime();
    vi.unstubAllGlobals();
    expect(() => runtime.toast({ title: 'Server notification' })).toThrow(
      'toast() is a browser interaction API',
    );
  });
});
