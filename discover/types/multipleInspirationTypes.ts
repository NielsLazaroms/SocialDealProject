type CellValue = number | null;

export type TileBounds = { minRow: number; maxRow: number; minCol: number; maxCol: number };
export type Pattern = ReadonlyArray<ReadonlyArray<CellValue>>;
export type Patterns = ReadonlyArray<Pattern>;

export interface TileItem {
  src: string;
  blockIndex: number;
  imageIndex: number;
}
export type TilePlacement = {
  index: number;
  rowStart: number;
  colStart: number;
  rowSpan: number;
  colSpan: number;
};
