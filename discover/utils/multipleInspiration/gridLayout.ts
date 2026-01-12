import {
  grid_size,
  tile_count,
} from '../../components/InformationBlock/MultipleInspiration/layout';

/**
 * Computes grid placement information for each tile based on a pattern matrix.
 *
 * The pattern grid maps each grid cell to a tile index. For every tile index,
 * this function determines the bounding box (min/max row and column) of all
 * cells belonging to that tile and converts it into Grid placement data.
 *
 * - Rows and columns are converted from 0-based indices to 1-based grid positions.
 * - Tiles that do not appear in the pattern receive a default 1x1 placement.
 *
 * @param patternGrid A matrix where each cell contains a tile index or null.
 * @returns An array of TilePlacement objects usable for Grid layout.
 */
export const computeTilesFromPattern = (patternGrid: Pattern): TilePlacement[] => {
  const boundsByTile = Array<TileBounds | null>(tile_count).fill(null);

  for (let row = 0; row < grid_size; row++) {
    for (let col = 0; col < grid_size; col++) {
      const idx = patternGrid[row]?.[col];
      if (idx == null) continue;

      const bound = boundsByTile[idx];
      if (!bound) {
        boundsByTile[idx] = { minRow: row, maxRow: row, minCol: col, maxCol: col };
      } else {
        bound.minRow = Math.min(bound.minRow, row);
        bound.maxRow = Math.max(bound.maxRow, row);
        bound.minCol = Math.min(bound.minCol, col);
        bound.maxCol = Math.max(bound.maxCol, col);
      }
    }
  }

  return boundsByTile.map((b, index) => {
    const safe = b ?? { minRow: 0, maxRow: 0, minCol: 0, maxCol: 0 };
    const rowStart = safe.minRow + 1;
    const colStart = safe.minCol + 1;
    const rowSpan = safe.maxRow - safe.minRow + 1;
    const colSpan = safe.maxCol - safe.minCol + 1;

    return { index, rowStart, colStart, rowSpan, colSpan };
  });
};
