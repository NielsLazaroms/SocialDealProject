import { dealsListRestaurant } from './restaurantDeals.mock';

const bySoldDesc = (a: DealCardDTO, b: DealCardDTO) => (b.amountSold ?? 0) - (a.amountSold ?? 0);

export const popularDealsList: DealCardDTO[] = dealsListRestaurant
  .slice()
  .sort(bySoldDesc)
  .slice(0, 15);
