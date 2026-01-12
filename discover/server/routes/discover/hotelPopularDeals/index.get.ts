import { popularDealsList } from '../../../mockData/deals/hotels/popularDeals.mock';

/**
 * Mock data used to simulate API endpoints for the proof of concept.
 */
export default defineSafeEventHandler(async () => {
  return popularDealsList;
});
