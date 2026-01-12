import type { SelectCategoryProps } from '../components/SelectCategory/types';

export interface UseActiveCategoryReturn {
  /**
   * Active category ID, synced with the route query.
   * Falls back to the "all categories" tile when the query is missing or invalid.
   */

  activeIdModel: Ref<number>;

  /**
   * Currently active category tile, if any.
   */
  activeTile: Ref<SelectCategoryProps['tiles'][number]>;

  /**
   * Label of the active category.
   */
  activeCategoryLabel: Ref<string>;

  /**
   * Formatted category title for direct UI usage.
   */
  formattedCategoryTitle: Ref<string>;
}

export function useActiveCategory(props: SelectCategoryProps): UseActiveCategoryReturn {
  const route = useRoute();

  const activeIdModel = computed<number>({
    get() {
      const key = route.query.category as string;

      return (
        props.tiles.find((t) => t.category.key === key)?.category.id ??
        props.tiles.find((t) => t.category.key === 'alle_deals')!.category.id
      );
    },
    set(id) {
      const q = { ...route.query };

      const key = props.tiles.find((t) => t.category.id === id)?.category.key;

      if (!key || key === 'alle_deals') delete q.category;
      else q.category = key;

      navigateTo({ path: route.path, query: q, replace: true });
    },
  });

  const activeTile = computed(
    () => props.tiles.find((tile) => tile.category.id === activeIdModel.value)!,
  );

  const isAllCategory = computed(() => activeTile.value.category.key === 'alle_deals');

  const activeCategoryLabel = computed(() => activeTile.value.category.label);

  const formattedCategoryTitle = computed(() =>
    formatActiveCategoryTitle(activeCategoryLabel.value, isAllCategory.value),
  );

  return {
    activeIdModel,
    activeTile,
    activeCategoryLabel,
    formattedCategoryTitle,
  };
}
