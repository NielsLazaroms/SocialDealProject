import { dealsListRestaurant } from './restaurantDeals.mock';

export const favoriteDealsList: DealCardDTO[] = dealsListRestaurant.filter(
  (deal) => deal.favourite === true,
);
