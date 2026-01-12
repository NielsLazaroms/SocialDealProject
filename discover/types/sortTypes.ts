import type { CardProps } from '../components/DealCard/types';

export type SortKey =
  | 'price_asc'
  | 'price_desc'
  | 'discount_asc'
  | 'discount_desc'
  | 'rating_asc'
  | 'rating_desc';

export type SortDefinition = {
  key: SortKey;
  label: string;
  compare: (a: CardProps, b: CardProps) => number;
};
