import type { HexagonTileVariants } from './variants';

export interface HexagonProps {
  category: CategoryProps;
  state?: HexagonTileVariants['state'];
  size?: HexagonTileVariants['size'];
}

export interface HexagonTileEmits {
  (e: 'select', id: number): void;
}
