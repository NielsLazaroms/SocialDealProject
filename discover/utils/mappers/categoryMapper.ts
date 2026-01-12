import type { CategoryIconName } from '../../assets/icons';
import type { CategoryDTO } from '../../server/mockData/categories.mock';

export function categoryMapper(apiCategory: CategoryDTO): CategoryProps {
  return {
    id: apiCategory.id,
    key: apiCategory.key,
    label: apiCategory.label,
    color: apiCategory.color,
    icon: apiCategory.icon as CategoryIconName,
  };
}
