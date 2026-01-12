import type { CardProps } from '../../DealCard/types';

export interface GoogleMapsOverlayProps {
  title?: string;
  widthClass?: string;
  deals: CardProps[];
  scrollToDealId?: number | null;
}
