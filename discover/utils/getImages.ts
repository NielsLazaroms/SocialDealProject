/**
 * Normalizes a list of image URLs to a fixed length.
 *
 * If the source array contains fewer images than `amountToShow`,
 * images will be repeated in order until the desired length is reached.
 *
 * @param images - Source image URLs. Must contain at least one image.
 * @param amountToShow - Desired number of images in the result.
 * @returns A list of image URLs with an exact length equal to `amountToShow`.
 *
 * @throws Error when the source images array is empty.
 */
export function normalizeImages(images: string[], amountToShow: number): string[] {
  const first = images[0];
  if (!first) {
    throw new Error('normalizeImages: images array is empty');
  }

  const result: string[] = [];

  for (let i = 0; i < amountToShow; i++) {
    result.push(images[i % images.length] ?? first);
  }

  return result as string[];
}
