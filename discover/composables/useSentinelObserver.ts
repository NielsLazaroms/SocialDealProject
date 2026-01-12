export interface UseInfiniteSentinelReturn {
  /**
   * DOM element that acts as the sentinel.
   * Bind this to a template ref.
   */
  target: Ref<HTMLElement | null>;

  /**
   * Start observing the sentinel.
   * Call this again after content has grown.
   */
  start: () => void;

  /**
   * Stop observing the sentinel.
   */
  stop: () => void;
}

export function useInfiniteSentinel(
  target: Ref<HTMLElement | null>,
  onIntersect: () => void,
): UseInfiniteSentinelReturn {
  let observer: IntersectionObserver | null = null;

  const stop = () => {
    observer?.disconnect();
    observer = null;
  };

  const start = () => {
    stop();
    const el = target.value;
    if (!el) return;

    observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting) return;

        stop();
        onIntersect();
      },
      { root: null, rootMargin: '150px 0px', threshold: 0 },
    );

    observer.observe(el);
  };

  onMounted(start);
  onBeforeUnmount(stop);

  return { target, start, stop };
}
