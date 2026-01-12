export const grid_size = 4;
export const tile_count = 8;

export const patterns: Patterns = [
  [
    [0, 0, 2, null],
    [0, 0, 3, 6],
    [null, 1, 4, 7],
    [null, null, 5, null],
  ],
  [
    [null, 0, 2, null],
    [1, 1, 3, 6],
    [1, 1, 4, 7],
    [null, null, 5, null],
  ],
  [
    [0, 2, 2, null],
    [1, 2, 2, 6],
    [null, 3, 4, 7],
    [null, null, 5, null],
  ],
  [
    [0, 2, null, null],
    [1, 3, 3, 6],
    [null, 3, 3, 7],
    [null, 4, 5, null],
  ],
  [
    [0, 2, 3, null],
    [1, 4, 4, 6],
    [null, 4, 4, 7],
    [null, null, 5, null],
  ],
  [
    [0, 2, null, null],
    [1, 3, 4, 6],
    [null, 5, 5, 7],
    [null, 5, 5, null],
  ],
  [
    [0, 2, null, null],
    [1, 3, 6, 6],
    [null, 4, 6, 6],
    [null, 5, 7, null],
  ],
  [
    [0, 2, 6, null],
    [1, 3, 7, 7],
    [null, 4, 7, 7],
    [null, 5, null, null],
  ],
];
