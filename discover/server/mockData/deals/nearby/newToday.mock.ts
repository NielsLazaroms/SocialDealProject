import { dealsList } from './nearbyDeals.mock';

export const newTodayDealsList: DealCardDTO[] = dealsList.slice(0, 20).map((deal) => ({
  ...deal,
  tag: 'New today',
}));
