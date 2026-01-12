import type { RouteLocationNormalizedLoaded } from 'vue-router';

/**
 * Build a clean query object from filter instances, omitting undefined values.
 */
export function buildQueryObject(instances: readonly FilterProps[]) {
  const q: Record<string, string> = {};
  for (const f of instances) {
    const v = f.format();
    if (v !== undefined) q[f.key] = v;
  }
  return q;
}

/**
 * Replace the current URL with the query that reflects current filters.
 * Keeps history clean (replace vs push). No watchers required.
 */

export function syncUrlWithInstances(
  instances: readonly FilterProps[],
  route: RouteLocationNormalizedLoaded,
) {
  const next = buildQueryObject(instances);
  const merged: Record<string, any> = { ...route.query };

  for (const f of instances) delete merged[f.key];

  Object.assign(merged, next);

  navigateTo(
    {
      path: route.path,
      query: merged,
    },
    { replace: true },
  );
}
