/**
 * Creates an inline Grid style object for a tile.
 *
 * The style positions the tile using its calculated grid row/column placement
 * and visually elevates the active tile by increasing its z-index.
 *
 * @param tile The tile placement data containing grid start and span values.
 * @param activeTileIndex The index of the currently active tile.
 * @returns A readonly style object suitable for binding to a Vue component.
 */

export const makeTileStyle = (tile: TilePlacement, activeTileIndex: number) =>
  ({
    gridRow: `${tile.rowStart} / span ${tile.rowSpan}`,
    gridColumn: `${tile.colStart} / span ${tile.colSpan}`,
    zIndex: tile.index === activeTileIndex ? 2 : 1,
  }) as const;
