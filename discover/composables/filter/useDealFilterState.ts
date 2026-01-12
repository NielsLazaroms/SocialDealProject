export interface UseDealFilterStateReturn {
  /**
   * Map of filter keys to their raw, SSR-safe state refs.
   */
  state: Record<string, Ref<unknown>>;

  /**
   * v-model friendly refs for template bindings.
   * Each model forwards get/set to the underlying state ref.
   */
  models: Record<string, Ref<unknown>>;
}

export function useDealFilterState(instances: readonly FilterProps[]): UseDealFilterStateReturn {
  const state = Object.fromEntries(instances.map((filter) => [filter.key, filter.state])) as Record<
    string,
    Ref<unknown>
  >;

  const models = Object.fromEntries(
    instances.map((filter) => [
      filter.key,
      computed({
        get: () => filter.state.value,
        set: (value: unknown) => {
          filter.state.value = value;
        },
      }),
    ]),
  ) as Record<string, Ref<unknown>>;

  return { state, models };
}
