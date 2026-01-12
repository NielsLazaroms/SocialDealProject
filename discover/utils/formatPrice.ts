import type { PriceProps } from '../components/DealCard/Default/Price/types';

export const formatDealPrice = (props: PriceProps) => {
  const nf = new Intl.NumberFormat(props.locale, {
    style: 'currency',
    currency: props.currency,
    maximumFractionDigits: 2,
  });

  return nf.formatToParts(props.amount).filter((p) => p.type !== 'literal');
};
