import { dealsListHotel } from './hotelDeals.mock';

const bySoldDesc = (a: DealCardDTO, b: DealCardDTO) => (b.amountSold ?? 0) - (a.amountSold ?? 0);

export const popularDealsList: DealCardDTO[] = dealsListHotel.slice().sort(bySoldDesc).slice(0, 15);
