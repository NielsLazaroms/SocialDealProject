import type { CategoryProps } from '~~/layers/discover/types/categoryTypes';

export interface CardHeaderProps {
  image: string;
  discount: number;
  tag?: string;
  tagColor?: string;
  category: CategoryProps;
}
