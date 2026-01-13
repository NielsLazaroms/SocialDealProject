import type { CardProps } from '../components/DealCard/types';

export function withFavourite(list: CardProps[], isFavorite: (id: number) => boolean) {
  return list.map((deal) => ({
    ...deal,
    favourite: isFavorite(deal.id),
  }));
}
