import type { CardProps } from '../../components/DealCard/types';

export function useDealSearch(args: { list: Ref<CardProps[]>; query: Ref<string> }) {
  const searchedDeals = computed<CardProps[]>(() => {
    const list = args.list.value ?? [];
    const query = String(args.query.value ?? '')
      .trim()
      .toLowerCase();
    if (!query) return list;

    const normalizedList = list.map((deal) => ({
      deal,
      searchableTitle: String(deal.title ?? '').toLowerCase(),
      searchableLocation: String(deal.companyInformation?.location ?? '').toLowerCase(),
    }));

    return normalizedList
      .filter(
        (item) => item.searchableTitle.includes(query) || item.searchableLocation.includes(query),
      )
      .map((item) => item.deal);
  });

  return { searchedDeals };
}
