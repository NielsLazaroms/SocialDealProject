import type { InputDropdownProps } from '@socialdeal/uikit3-travel';
import type { SelectListProps } from '../types';

export interface FilterbarCategoryProps {
  open: boolean;

  onToggle: () => void;
  onClose: () => void;
  onChange: (value: string | null) => void;

  dropdownProps: InputDropdownProps;
  selectListProps: SelectListProps;
}
