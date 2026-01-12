export function useScrollToChild(el: Ref<HTMLElement | null>) {
  function scrollToDataId(id: number, offset = 12) {
    const container = el.value;
    if (!container) return;

    const target = container.querySelector(`[data-deal-id="${id}"]`);
    if (!(target instanceof HTMLElement)) return;

    const canScrollX = container.scrollWidth > container.clientWidth;
    const canScrollY = container.scrollHeight > container.clientHeight;

    const cRect = container.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();

    if (canScrollX && !canScrollY) {
      const x = Math.max(0, tRect.left - cRect.left + container.scrollLeft - offset);
      container.scrollTo({ left: x, behavior: 'smooth' });
      return;
    }

    const y = Math.max(0, tRect.top - cRect.top + container.scrollTop - offset);
    container.scrollTo({ top: y, behavior: 'smooth' });
  }

  return { scrollToDataId };
}
