import type { CardProps } from '~~/layers/discover/components/DealCard/types';
import type {
  PriceTextStyling,
  TouristTaxTextColor,
} from '../../components/DealCard/Default/variants';

export function dealMapper(
  apiDeal: DealCardDTO,
  categoriesById: Record<number, CategoryProps>,
): CardProps {
  return {
    id: apiDeal.id,
    categoryId: apiDeal.categoryId,
    companyInformation: {
      business: apiDeal.business,
      location: apiDeal.location,
    },
    title: apiDeal.title,
    detailRow: {
      rating:
        apiDeal.ratingNumber !== undefined && apiDeal.ratingAmount !== undefined
          ? {
              ratingNumber: apiDeal.ratingNumber,
              ratingAmount: apiDeal.ratingAmount,
            }
          : undefined,
      duration: apiDeal.duration,
      amountSold: apiDeal.amountSold,
    },
    favourite: apiDeal.favourite,
    prices: {
      price: {
        amount: apiDeal.priceAmount,
        color: apiDeal.priceColor as PriceTextStyling['color'],
        size: apiDeal.priceSize as PriceTextStyling['size'],
      },
      oldPrice: {
        amount: apiDeal.oldPriceAmount,
        strikethrough: apiDeal.oldPriceStrikethrough,
        color: apiDeal.oldPriceColor as PriceTextStyling['color'],
      },
      touristTax: apiDeal.touristTaxText
        ? {
            text: apiDeal.touristTaxText,
            color: (apiDeal.touristTaxColor as TouristTaxTextColor['color']) ?? 'gray',
          }
        : undefined,
    },

    header: {
      image: apiDeal.image,
      discount: apiDeal.discount,
      tag: apiDeal.tag,
      tagColor: apiDeal.tagColor,
      category: categoriesById[apiDeal.categoryId]!,
    },
    markerPos: {
      lat: apiDeal.lat,
      lng: apiDeal.lng,
    },
    availability: apiDeal.availability,
  };
}
