import { buildQueryObject, syncUrlWithInstances } from '../../utils/filter/query';

/**
 * Return contract for `useDealFilterQuery`.
 * Provides helpers to build a query object from filter instances and sync the URL.
 */
export interface UseDealFilterQueryReturn {
  /**
   * Build a clean query object reflecting current filters.
   */
  asQueryObject: () => Record<string, string>;
  /**
   * Replace the current URL with the built query (no history entry).
   */
  syncUrl: () => void;
}

/**
 * Build `asQueryObject()` and `syncUrl()` helpers from filter instances.
 * Keeps router operations out of other concerns (state/models/labels).
 */
export function useDealFilterQuery(instances: readonly FilterProps[]) {
  const route = useRoute();

  const asQueryObject = () => buildQueryObject(instances);
  const syncUrl = () => syncUrlWithInstances(instances, route);

  return { asQueryObject, syncUrl };
}
