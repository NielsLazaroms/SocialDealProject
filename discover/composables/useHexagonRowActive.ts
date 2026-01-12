export interface UseHexagonRowActiveReturn {
  /**
   * The id of the currently active hexagon tile.
   * Readonly to ensure centralized state control.
   */
  activeId: Readonly<Ref<number>>;

  /**
   * Sets a new active tile and triggers
   * any side effects via `onSelect`.
   */
  setActiveTile: (tileId: number) => void;
}

export function useHexagonRowActive(
  activeId: Ref<number>,
  onSelect: (id: number) => void,
): UseHexagonRowActiveReturn {
  const setActiveTile = (tileId: number) => {
    activeId.value = tileId;
    onSelect(tileId);
  };

  return {
    activeId: readonly(activeId),
    setActiveTile,
  };
}
