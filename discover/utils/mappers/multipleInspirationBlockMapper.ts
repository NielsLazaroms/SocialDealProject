import type { InformationBlockProps } from '../../components/InformationBlock/types';
import { informationBlockMapper } from './informationBlockMapper';

export function multipleInformationBlocksMapper(
  items: InformationBlockDTO[],
): InformationBlockProps[] {
  return items.map(informationBlockMapper);
}
