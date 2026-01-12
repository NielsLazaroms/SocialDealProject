import type { FilterbarCategoryProps } from '../Forms/Category/types';
import type { FilterbarLocationProps } from '../Forms/Location/types';
import type { FilterbarRatingProps } from '../Forms/Rating/types';
import type { FilterbarBaseProps } from '../types';

export interface FilterbarDefaultProps {
  filterbar?: FilterbarBaseProps;

  locationSection: FilterbarLocationProps;
  categorySection: FilterbarCategoryProps;
  ratingSection: FilterbarRatingProps;
}
