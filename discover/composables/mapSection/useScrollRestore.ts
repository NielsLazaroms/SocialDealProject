export function useScrollRestore(isOpen: Ref<boolean>, element: Ref<HTMLElement | null>) {
  const savedScrollTop = ref(0);

  function save() {
    if (element.value) savedScrollTop.value = element.value.scrollTop;
  }

  async function restore() {
    await nextTick();
    if (element.value) element.value.scrollTop = savedScrollTop.value;
  }

  watch(isOpen, (open) => {
    if (open) restore();
    else save();
  });

  return { savedScrollTop, save, restore };
}
