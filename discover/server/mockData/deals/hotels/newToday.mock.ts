import { dealsListHotel } from './hotelDeals.mock';

export const newTodayDealsList: DealCardDTO[] = dealsListHotel.slice(0, 20).map((deal) => ({
  ...deal,
  tag: 'New today',
}));
