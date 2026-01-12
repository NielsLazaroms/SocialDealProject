import type { InputTextProps } from '@socialdeal/uikit3-shared';
import type { ListItemProps } from '@socialdeal/uikit3-travel';
import type { IconName } from '../../BaseIcon/index.vue';

export type SelectListItemProps = ListItemProps & {
  icons?: IconName[];
  iconsClass?: string;
  disableItemPadding?: boolean;
};

export interface SelectListProps {
  items: SelectListItemProps[];
  activeIndex?: number;
  searchableFilterProps?: InputTextProps;
  onQueryChange?: (value: string) => void;
}
