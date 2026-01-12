import type { PriceProps } from '../components/DealCard/Default/Price/types';
import type { PriceTextStyling } from '../components/DealCard/Default/variants';

export const getPriceTextVariants = (props: PriceProps): PriceTextStyling => ({
  size: props.size ?? 'small',
  color: props.color ?? (props.strikethrough ? 'gray' : 'green'),
  fractionPosition: props.strikethrough ? 'noFraction' : 'withFraction',
});
