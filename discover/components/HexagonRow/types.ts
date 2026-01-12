import type { HexagonProps } from '../HexagonRow/Tile/types';

export interface HexagonRowProps {
  tiles: HexagonProps[];
}

export interface HexagonRowEmits {
  (e: 'select', id: number): void;
}
