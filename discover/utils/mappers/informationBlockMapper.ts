import type { InformationBlockProps } from '../../components/InformationBlock/types';
import type { TextAlignVariants } from '../../components/InformationBlock/variants';
import type {
  SectionTitleTextVariants,
  SectionTitleVariants,
} from '../../components/SectionTitle/variants';
import type { InformationBlockDTO } from '../../types/informationBlockType_DTO';

export function informationBlockMapper(item: InformationBlockDTO): InformationBlockProps {
  return {
    textProps: {
      leadingHeader: item.leadingHeader,
      description: item.description,
      title: {
        text: item.title.text,
        color: item.title.color,
        position: item.title.position as SectionTitleVariants['position'],
        size: item.title.size as SectionTitleTextVariants['size'],
        textShadow: item.title.textShadow as SectionTitleTextVariants['textShadow'],
        showLines: item.title.showLines,
        moreDealsTextButton: item.title.moreDealsTextButton,
      },
      position: item.textPosition as TextAlignVariants['position'],
      buttonText: item.buttonText,
    },
    images: item.images,
  };
}

export const hotelItemMapper = (item: InformationBlockDTO) => ({
  ...informationBlockMapper(item),
  images: normalizeImages(item.images, 2),
});

export const restaurantItemMapper = (item: InformationBlockDTO) => ({
  ...informationBlockMapper(item),
  images: normalizeImages(item.images, 4),
});

export const singleInformationItemMapper = (item: InformationBlockDTO) => ({
  ...informationBlockMapper(item),
  images: normalizeImages(item.images, 1),
});
export const multipleInformationMapper = (items: InformationBlockDTO[]) =>
  multipleInformationBlocksMapper(items);
