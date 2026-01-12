export interface UseDealFilterInstancesReturn {
  /**
   * All discovered filter instances. Each instance owns its own SSR-safe state ref
   */
  instances: Readonly<FilterProps[]>;
}

type FilterModule = {
  default: {
    key: string;
    buildFilter: (defaultValue?: unknown) => FilterProps;
  };
};

const modules = import.meta.glob<FilterModule>('~~/layers/discover/utils/filter/filters/*.ts', {
  eager: true,
});

export function useDealFilterInstances(defaults?: Record<string, unknown>) {
  const instances = Object.values(modules).map((m) => {
    const mod = m.default;
    return mod.buildFilter(defaults?.[mod.key]);
  });

  return { instances };
}
