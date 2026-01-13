import type { SortDropdownOption } from '@socialdeal/uikit3-travel';
import type { CardProps } from '~~/layers/discover/components/DealCard/types';

export interface UseDealSortDropdownReturn {
  /**
   * Options to render in the sort dropdown.
   */
  sortOptions: Readonly<Ref<readonly SortDropdownOption[]>>;

  /**
   * Currently selected sort option (value + label).
   */
  selectedSort: Ref<SortDropdownOption>;

  /**
   * Updates the selected sort based on dropdown selection.
   */
  onSortSelect: (option: SortDropdownOption) => void;

  /**
   * Deals sorted according to the selected sort option.
   */
  sortedDeals: Readonly<Ref<readonly CardProps[]>>;
}

export function useDealSortDropdown(deals: Readonly<Ref<CardProps[]>>): UseDealSortDropdownReturn {
  const defaultDefinition = sort_defs[0];

  if (!defaultDefinition) {
    throw new Error('useDealSortDropdown: sort_defs must contain at least one item');
  }

  const selectedKey = ref<SortKey>(defaultDefinition.key);

  const sortOptions = computed<SortDropdownOption[]>(() =>
    sort_defs.map(({ key, label }) => ({ value: key, label })),
  );

  const selectedDefinition = computed(
    () => sort_defs.find((def) => def.key === selectedKey.value) ?? defaultDefinition,
  );

  const selectedSort = computed<SortDropdownOption>(() => {
    const def = selectedDefinition.value;
    return { value: def.key, label: def.label };
  });

  function onSortSelect(option: SortDropdownOption) {
    selectedKey.value = option.value as SortKey;
  }

  const sortedDeals = computed<CardProps[]>(() => {
    const compare = selectedDefinition.value.compare;
    return [...deals.value].sort(compare);
  });

  return {
    sortOptions: readonly(sortOptions),
    selectedSort,
    onSortSelect,
    sortedDeals,
  };
}
