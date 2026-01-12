import { popularDealsList } from '../../../mockData/deals/restaurants/popularDeals.mock';

/**
 * Mock data used to simulate API endpoints for the proof of concept.
 */
export default defineSafeEventHandler(async () => {
  return popularDealsList;
});
