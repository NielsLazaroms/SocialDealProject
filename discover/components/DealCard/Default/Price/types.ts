import type { PriceTextStyling, TouristTaxTextColor } from '../variants';

interface TouristTax {
  text?: string;
  color?: TouristTaxTextColor['color'];
}

export interface PricesProps {
  price: PriceProps;
  oldPrice?: PriceProps;
  touristTax?: TouristTax;
}

export interface PriceProps {
  amount: number;
  currency?: string;
  locale?: string;
  size?: PriceTextStyling['size'];
  color?: PriceTextStyling['color'];
  roundedAmount?: boolean;
  strikethrough?: boolean;
}
