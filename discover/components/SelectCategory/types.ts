import type { SectionTitleProps } from '@socialdeal/uikit3-travel';
import type { HexagonProps } from '../HexagonRow/Tile/types';
import type { CardProps } from '../DealCard/types';

export interface SelectCategoryProps {
  tiles: HexagonProps[];
  title: SectionTitleProps;
  dealList?: CardProps[];
}

export interface SelectCategoryEmits {
  (e: 'view-all'): void;
}
