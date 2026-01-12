import type { CardCompanyInformationProps } from './Default/CompanyInformation/types';
import type { CardDetailRowProps } from './Default/DetailsRow/types';
import type { CardHeaderProps } from './Default/Header/types';
import type { PricesProps } from './Default/Price/types';

interface MarkerPos {
  lat: number;
  lng: number;
}

export interface CardProps {
  id: number;
  companyInformation: CardCompanyInformationProps;
  categoryId: number;
  title: string;
  detailRow: CardDetailRowProps;
  availability?: WeekdayKey[];
  favourite: boolean;
  prices: PricesProps;
  header: CardHeaderProps;
  markerPos: MarkerPos;
}

export interface DealCardEmits {
  (e: 'toggle-favorite'): void;
}
