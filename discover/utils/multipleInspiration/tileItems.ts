import type { InformationBlockProps } from '../../components/InformationBlock/types';

interface TileItem {
  src: string;
  blockIndex: number;
  imageIndex: number;
}

/**
 * Builds a list of tile items by distributing images across blocks in a round-robin fashion.
 *
 * The function takes all images from the provided blocks and fills a fixed number of tiles
 * by first selecting one image per block, then repeating the process until the tile count
 * is reached. This ensures a fair distribution of images across blocks.
 *
 * - Blocks without images are skipped.
 * - If no images are available at all, empty tile items are returned.
 *
 * @param blocks A list of information blocks containing image arrays.
 * @param tileCount The total number of tiles to generate.
 * @returns An array of TileItem objects representing images assigned to tiles.
 */
export const buildTileItems = (blocks: InformationBlockProps[], tileCount: number): TileItem[] => {
  if (tileCount <= 0) return [];

  const perBlockImages = blocks.map((b) => b.images ?? []);
  const empty = Array.from({ length: tileCount }, () => ({
    src: '',
    blockIndex: 0,
    imageIndex: 0,
  }));

  if (!perBlockImages.some((imgs) => imgs.length)) return empty;

  const out: TileItem[] = [];

  for (let round = 0; out.length < tileCount; round++) {
    const before = out.length;

    for (
      let blockIndex = 0;
      blockIndex < perBlockImages.length && out.length < tileCount;
      blockIndex++
    ) {
      const imgs = perBlockImages[blockIndex] ?? [];
      if (!imgs.length) continue;

      const imageIndex = round % imgs.length;
      out.push({ src: imgs[imageIndex]!, blockIndex, imageIndex });
    }

    if (out.length === before) break;
  }

  return out;
};
