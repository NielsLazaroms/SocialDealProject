import { useDealFilterInstances } from './useDealFilterInstances';
import { useDealFilterQuery } from './useDealFilterQuery';
import { useDealFilterState } from './useDealFilterState';
import { usePipeFilters } from './usePipeFilters';

export interface UseDealsFiltersReturn {
  /**
   * Map of filter keys to their raw, SSR-safe state refs.
   */
  state: Readonly<Record<string, Ref<unknown>>>;

  /**
   * v-model friendly refs that proxy to the same underlying state.
   */
  models: Record<string, Ref<unknown>>;

  /**
   * Build a clean query object reflecting the current filters, omitting inactive ones.
   * Useful for CTA navigation or manual URL sync.
   */
  asQueryObject: () => Record<string, string>;

  /**
   * Replace current URL with the query built from active filters (no history entry).
   */
  syncUrl: () => void;

  /** Clear a single filter by key (also syncs the URL). */
  clear: (key: string) => void;

  /** Clear all filters to defaults (also syncs the URL). */
  clearAll: () => void;

  /**
   * Apply all active filters to a reactive list of items.
   *
   * Returns a derived reactive ref that automatically updates
   * when filters or source items change.
   */
  applyTo: <T>(items: Readonly<Ref<T[]>>) => Readonly<Ref<T[]>>;

  /**
   * Computed labels for active filters (non-empty), for chips/summary UIs.
   */
  activeLabels: Readonly<Ref<readonly string[]>>;

  /**
   * Low-level access to the underlying filter instances.
   * Mostly useful for advanced or internal use cases.
   */
  instances: Readonly<FilterProps[]>;
}

export function useDealsFilters(defaults?: Record<string, unknown>): UseDealsFiltersReturn {
  const route = useRoute();

  const { instances } = useDealFilterInstances({
    ...route.query,
    ...defaults,
  });

  const { state, models } = useDealFilterState(instances);

  const { asQueryObject, syncUrl } = useDealFilterQuery(instances);

  const activeLabels = computed<string[]>(() =>
    instances
      .map((f) => f.getLabel?.())
      .filter((s): s is string => typeof s === 'string' && s.length > 0),
  );

  function applyTo<T>(items: Readonly<Ref<T[]>>) {
    const filters = instances.map((filter) => filter.arrayFilter as ArrayFilter<T>);

    return usePipeFilters<T>(...filters)(items);
  }

  function clear(key: string) {
    instances.find((f) => f.key === key)?.clear();
    syncUrl();
  }

  function clearAll() {
    for (const f of instances) f.clear();
    syncUrl();
  }

  return {
    state: readonly(state),
    models,
    asQueryObject,
    syncUrl,
    clear,
    clearAll,
    applyTo,
    activeLabels: readonly(activeLabels),
    instances,
  };
}
