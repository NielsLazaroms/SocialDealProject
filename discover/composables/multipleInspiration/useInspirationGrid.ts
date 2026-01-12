import { patterns, tile_count } from '../../components/InformationBlock/MultipleInspiration/layout';
import type { InformationBlockProps } from '../../components/InformationBlock/types';
import { useInspirationCountDown } from './useInspirationCountDown';

export interface UseInspirationGridReturn {
  /** Index of the active layout pattern derived from the active tile */
  activePatternIndex: Ref<number>;

  /** Metadata of the currently active tile (image + block reference) */
  activeTileItem: Ref<TileItem | undefined>;

  /** The content block associated with the active tile */
  activeBlock: Ref<InformationBlockProps | undefined>;

  /** Image sources mapped per tile index */
  imagesForTiles: Ref<string[]>;

  /** Calculated grid placement data for all tiles */
  tiles: Ref<TilePlacement[]>;

  /**
   * Returns the inline CSS Grid style for a tile.
   * The active tile is visually elevated using z-index.
   */
  tileStyle: (tile: TilePlacement) => Readonly<Record<string, string | number>>;

  /** Sets the active tile by index */
  setActiveByTile: (index: number) => void;

  /** Starts automatic tile rotation */
  startCountdown: () => void;

  /** Stops automatic tile rotation */
  stopCountdown: () => void;
}

export function useInspirationGrid(
  blocks: Ref<InformationBlockProps[]>,
  durationMs: number,
): UseInspirationGridReturn {
  const activeTileIndex = ref(0);

  const tileItems = computed(() => buildTileItems(blocks.value, tile_count));
  const imagesForTiles = computed(() => tileItems.value.map((t) => t.src));

  const activeTileItem = computed(() => tileItems.value[activeTileIndex.value]);
  const activeBlock = computed(() => {
    const first = blocks.value[0];
    if (!first) return undefined;

    const idx = activeTileItem.value?.blockIndex ?? 0;
    return blocks.value[idx] ?? first;
  });

  const activePatternIndex = computed(() => activeTileIndex.value % patterns.length);

  const tiles = computed(() => computeTilesFromPattern(patterns[activePatternIndex.value]!));
  const tileStyle = (tile: TilePlacement) => makeTileStyle(tile, activeTileIndex.value);

  const { startCountdown, stopCountdown, restartCountdown } = useInspirationCountDown(
    activeTileIndex,
    tile_count,
    durationMs,
  );

  const setActiveByTile = (i: number) => {
    if (i < 0 || i >= tile_count) return;
    restartCountdown();
    activeTileIndex.value = i;
  };

  return {
    startCountdown,
    stopCountdown,
    activePatternIndex,
    activeTileItem,
    activeBlock,
    imagesForTiles,
    tiles,
    tileStyle,
    setActiveByTile,
  };
}
