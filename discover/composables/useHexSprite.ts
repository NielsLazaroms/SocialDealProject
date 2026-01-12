export interface UseHexSpriteReturn {
  /**
   * Total width of the sprite sheet in pixels.
   *
   * Calculated based on the number of columns and the horizontal overlap
   * between hex tiles (75% of the tile width).
   */
  sheetWidth: number;

  /**
   * Total height of the sprite sheet in pixels.
   *
   * Calculated based on the number of rows and the vertical tile size.
   */
  sheetHeight: number;

  /**
   * Calculate the background offset for a single hex tile within the sprite sheet.
   *
   */
  calculatePosition: (
    col: number,
    row: number,
    rowOffset: number,
  ) => {
    horizontal: number;
    vertical: number;
  };
}

export function useHexSprite(tile: number, row: number, col: number): UseHexSpriteReturn {
  const horizontal_step = tile * 0.75;
  const vertical_step = tile;

  const sheetWidth = tile + (col - 1) * horizontal_step;
  const sheetHeight = tile + (row - 1) * vertical_step;

  const calculatePosition = (col: number, row: number, rowOffset: number) => ({
    horizontal: -col * horizontal_step + rowOffset,
    vertical: -(row * vertical_step + rowOffset * vertical_step) + rowOffset,
  });

  return { sheetWidth, sheetHeight, calculatePosition };
}
