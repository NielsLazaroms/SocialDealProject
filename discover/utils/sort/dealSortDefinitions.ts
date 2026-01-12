export const sort_defs: SortDefinition[] = [
  {
    key: 'price_asc',
    label: 'Prijs laag - hoog',
    compare: (a, b) => a.prices.price.amount - b.prices.price.amount,
  },
  {
    key: 'price_desc',
    label: 'Prijs hoog - laag',
    compare: (a, b) => b.prices.price.amount - a.prices.price.amount,
  },
  {
    key: 'discount_asc',
    label: 'Korting laag - hoog',
    compare: (a, b) => a.header.discount - b.header.discount,
  },
  {
    key: 'discount_desc',
    label: 'Korting hoog - laag',
    compare: (a, b) => b.header.discount - a.header.discount,
  },
  {
    key: 'rating_asc',
    label: 'Rating laag - hoog',
    compare: (a, b) =>
      (a.detailRow.rating?.ratingNumber ?? Infinity) -
      (b.detailRow.rating?.ratingNumber ?? Infinity),
  },
  {
    key: 'rating_desc',
    label: 'Rating hoog - laag',
    compare: (a, b) =>
      (b.detailRow.rating?.ratingNumber ?? -Infinity) -
      (a.detailRow.rating?.ratingNumber ?? -Infinity),
  },
];
