type ArrayFilterFn<T> = (items: readonly T[], value: any) => readonly T[];

type CreateFilterOptions<TItem, TValue> = {
  /** Unique key for the filter (also used for state). */
  key: string;

  /** Optional custom state key (defaults to `filter:${key}`). */
  stateKey?: string;

  /** Default filter value when no initial value is provided. */
  defaultValue?: TValue | null;

  /** Optional initializer to normalize or parse the initial value. */
  init?: (defaultValue?: unknown) => TValue | null;

  /** Core filtering logic applied to a list of items. */
  arrayFilter: ArrayFilterFn<TItem>;

  /** Optional formatter for serializing the filter value (e.g. for URLs). */
  format?: (value: TValue | null) => string | undefined;

  /** Custom clear behavior for the filter state. */
  clear?: (state: ReturnType<typeof useState<TValue | null>>) => void;

  /** Format the current value into a display label. */
  getLabel?: (value: TValue | null) => string;
};

function isEmptyValue(value: unknown): boolean {
  return value == null || value === '';
}

export function createFilter<TItem, TValue = string>(options: CreateFilterOptions<TItem, TValue>) {
  const key = options.key;
  const stateKey = options.stateKey ?? `filter:${key}`;

  function buildFilter(defaultValue?: unknown): FilterProps {
    const state = useState<TValue | null>(stateKey, () => {
      if (options.init) return options.init(defaultValue);
      return (defaultValue as TValue | null) ?? options.defaultValue ?? null;
    });

    function arrayFilter(items: readonly TItem[]) {
      const value = state.value;
      if (isEmptyValue(value)) return items as TItem[];
      return options.arrayFilter(items, value as TValue) as TItem[];
    }

    function format(): string | undefined {
      if (options.format) return options.format(state.value);
      const value = state.value;
      return value == null ? undefined : String(value);
    }

    function clear() {
      if (options.clear) return options.clear(state);
      state.value = null;
    }

    function getLabel() {
      if (options.getLabel) return options.getLabel(state.value);
      return state.value ? `${key}: ${String(state.value)}` : '';
    }

    return { key, state, arrayFilter, format, clear, getLabel };
  }

  return { key, buildFilter };
}
