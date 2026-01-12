import type { HexagonTileVariants } from '../../components/HexagonRow/Tile/variants';
import type { HexagonProps } from '../../components/HexagonRow/Tile/types';

export function categoryToHexagonTileMapper(category: CategoryProps): HexagonProps {
  return { category, state: HexagonTileVariants['state'] };
}
