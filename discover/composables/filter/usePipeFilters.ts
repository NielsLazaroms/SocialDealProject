export function usePipeFilters<T>(...filters: ArrayFilter<T>[]) {
  return (items: Readonly<Ref<T[]>>) =>
    computed(() => {
      let output: readonly T[] = items.value;
      for (const filter of filters) output = filter(output);
      return output as T[];
    });
}
