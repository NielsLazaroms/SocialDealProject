interface Cell {
  row: number;
  rowOffset: number;
  transparent?: boolean;
}
interface Column {
  col: number;
  shiftDown?: boolean;
  shiftLeft?: boolean;
  cells: Cell[];
}

export function getSingleInspirationLayout(): Column[] {
  return [
    {
      col: 0,
      shiftDown: true,
      cells: [
        { row: 0, rowOffset: 0.5 },
        { row: 1, rowOffset: 0.5 },
        { row: 2, rowOffset: 0.5 },
        { row: 3, rowOffset: 0.5 },
      ],
    },
    {
      col: 1,
      shiftLeft: true,
      cells: [
        { row: 0, rowOffset: 0, transparent: true },
        { row: 1, rowOffset: 0 },
        { row: 2, rowOffset: 0 },
        { row: 3, rowOffset: 0 },
      ],
    },
    {
      col: 2,
      shiftDown: true,
      shiftLeft: true,
      cells: [
        { row: 0, rowOffset: 0.5, transparent: true },
        { row: 1, rowOffset: 0.5 },
        { row: 2, rowOffset: 0.5 },
        { row: 3, rowOffset: 0.5 },
      ],
    },
    {
      col: 3,
      shiftLeft: true,
      cells: [
        { row: 0, rowOffset: 0, transparent: true },
        { row: 1, rowOffset: 0, transparent: true },
        { row: 2, rowOffset: 0 },
        { row: 3, rowOffset: 0 },
      ],
    },
  ];
}
