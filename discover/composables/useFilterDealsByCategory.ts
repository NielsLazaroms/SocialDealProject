import type { CardProps } from '../components/DealCard/types';

/**
 * Filters deals based on the active category.
 *
 * When `activeCategoryId` is `0`, all deals are returned.
 *
 * Both arguments are expected to be reactive.
 */
export function useFilterDealsByCategory(
  deals: Ref<CardProps[]>,
  activeCategoryId: Ref<number>,
  allCategoryId: Ref<number>,
) {
  const filteredDeals = computed(() => {
    const id = activeCategoryId.value;
    const list = deals.value;

    if (id === allCategoryId.value) return list;
    return list.filter((deal) => deal.categoryId === id);
  });

  return { filteredDeals };
}
