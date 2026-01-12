import type { CardProps } from '../DealCard/types';
import type { SectionTitleProps } from '../SectionTitle/types';

export interface DealListProps {
  deals: CardProps[];
  hasInfinteScroll?: boolean;
  canLoadMore: boolean;
  title: SectionTitleProps;
}

export interface DealListEmits {
  (e: 'load-more'): void;
  (e: 'toggle-favorite', id: number): void;
}
