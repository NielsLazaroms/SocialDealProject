import { dealsList } from './nearbyDeals.mock';

export const favoriteDealsList: DealCardDTO[] = dealsList.filter((deal) => deal.favourite === true);
