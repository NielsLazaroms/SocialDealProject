import type { GoogleMapsMarker } from '../../components/GoogleMapsSection/types';
import type { CardProps } from '../../components/DealCard/types';

export type dealCardsWithMarkers = {
  deals: CardProps[];
  markers: GoogleMapsMarker[];
};

export const dealCardsWithMarkerMapper = (
  response: DealCardDTO[],
  categoriesById: Record<number, CategoryProps>,
): dealCardsWithMarkers => {
  return {
    deals: response.map((d) => dealMapper(d, categoriesById)),
    markers: response.map((d) => {
      return {
        lat: d.lat,
        lng: d.lng,
        id: d.id,
        color: categoriesById[d.categoryId]?.color ?? '',
        icon: categoriesById[d.categoryId]?.icon ?? 'alle_deals',
      };
    }),
  };
};
