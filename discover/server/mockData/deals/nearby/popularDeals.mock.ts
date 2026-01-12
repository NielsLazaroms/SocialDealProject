import { dealsList } from './nearbyDeals.mock';

const bySoldDesc = (a: DealCardDTO, b: DealCardDTO) => (b.amountSold ?? 0) - (a.amountSold ?? 0);

export const popularDealsList: DealCardDTO[] = dealsList.slice().sort(bySoldDesc).slice(0, 550);
