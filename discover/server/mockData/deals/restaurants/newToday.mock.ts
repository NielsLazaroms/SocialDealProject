import { dealsListRestaurant } from './restaurantDeals.mock';

export const newTodayDealsList: DealCardDTO[] = dealsListRestaurant.slice(0, 20).map((deal) => ({
  ...deal,
  tag: 'New today',
}));
