import { dealsListHotel } from './hotelDeals.mock';

export const favoriteDealsList: DealCardDTO[] = dealsListHotel.filter(
  (deal) => deal.favourite === true,
);
