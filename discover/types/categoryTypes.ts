import type { CategoryIconName } from '../assets/icons';

export interface CategoryProps {
  id: number;
  key: string;
  label: string;
  color: string;
  icon: CategoryIconName;
}
