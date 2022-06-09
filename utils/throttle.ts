import { Throttler, ThrottleOptions } from "types/index";

export function throttle<T extends unknown[]>(
  callback: (...args: T) => unknown,
  wait = 0,
  { start = true, middle = true, once = false }: ThrottleOptions = {}
): Throttler<T> {
  let last = 0;
  let timer: ReturnType<typeof setTimeout>;
  let cancelled = false;

  function fn(this: unknown, ...args: T) {
    if (cancelled) return;
    const delta = Date.now() - last;
    last = Date.now();
    if (start) {
      start = false;
      callback.apply(this, args);
      if (once) fn.cancel();
    } else if ((middle && delta < wait) || !middle) {
      clearTimeout(timer);
      timer = setTimeout(
        () => {
          last = Date.now();
          callback.apply(this, args);
          if (once) fn.cancel();
        },
        !middle ? wait : wait - delta
      );
    }
  }

  fn.cancel = () => {
    clearTimeout(timer);
    cancelled = true;
  };

  return fn;
}
